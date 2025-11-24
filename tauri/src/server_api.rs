use axum::{
  Router,
  extract::{
    State as AxumState,
    ws::{WebSocket, WebSocketUpgrade},
  },
  response::Response,
  routing::{any, get},
};
use tauri::{AppHandle, Manager, State as TauriState};
use tokio::sync::broadcast::Receiver;

use crate::AppState;

async fn handler(ws: WebSocketUpgrade, AxumState(app_handle): AxumState<AppHandle>) -> Response {
  let reciever = app_handle
    .state::<AppState>()
    .lock()
    .expect("Failed to lock mutex")
    .updates_tx
    .subscribe();
  ws.on_upgrade(|socket| handle_socket(socket, reciever))
}

async fn handle_socket(mut socket: WebSocket, mut reciever: Receiver<String>) {
  while let Ok(updates_label) = reciever.recv().await {
    log::info!("Got update {updates_label} through channel");
    if socket
      .send(axum::extract::ws::Message::Text(
        updates_label.clone().into(),
      ))
      .await
      .is_err()
    {
      log::warn!("Websocket closed");
      return;
    }
    log::info!("Update {updates_label} sent through websocket");
  }
  log::warn!("Channel closed");
}

#[tauri::command]
pub async fn send_update(
  state: TauriState<'_, AppState>,
  update_label: String,
) -> Result<(), String> {
  log::info!("Got {update_label} through command");
  state
    .lock()
    .expect("Failed to lock mutex")
    .updates_tx
    .send(update_label)
    .expect("Failed to send update label through channel");
  Ok(())
}

pub async fn start_server(app_handle: AppHandle) -> Result<(), Box<dyn std::error::Error>> {
  let app = Router::new()
    .route("/", get(|| async { "Hello, World!" }))
    .route("/ws", any(handler))
    .with_state(app_handle);

  let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
  axum::serve(listener, app).await?;

  Ok(())
}
