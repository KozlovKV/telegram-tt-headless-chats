use axum::{
  Router,
  extract::{
    Json, Path, State as AxumState,
    ws::{WebSocket, WebSocketUpgrade},
  },
  response::Response,
  routing::{any, get, post},
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use tauri::{
  AppHandle, Emitter, LogicalPosition, LogicalSize, Manager, PhysicalPosition, PhysicalSize,
  State as TauriState,
};
use tokio::sync::broadcast::Receiver;

use crate::{AppState, UpdatePayload};

async fn handler(ws: WebSocketUpgrade, AxumState(app_handle): AxumState<AppHandle>) -> Response {
  let reciever = app_handle
    .state::<AppState>()
    .lock()
    .expect("Failed to lock mutex")
    .updates_tx
    .subscribe();
  ws.on_upgrade(|socket| handle_socket(socket, reciever))
}

async fn handle_socket(mut socket: WebSocket, mut reciever: Receiver<UpdatePayload>) {
  while let Ok(update) = reciever.recv().await {
    // log::info!("Got update {updates_label} through channel");
    if socket
      .send(axum::extract::ws::Message::Text(
        serde_json::ser::to_string(&update)
          .expect("Failed to serialize in websocket")
          .into(),
      ))
      .await
      .is_err()
    {
      log::warn!("Websocket closed");
      return;
    }
    // log::info!("Update {updates_label} sent through websocket");
  }
  log::warn!("Channel closed");
}

#[tauri::command]
pub async fn send_update(
  state: TauriState<'_, AppState>,
  update: UpdatePayload,
) -> Result<(), String> {
  // log::info!("Got {update_label} through command");
  state
    .lock()
    .expect("Failed to lock mutex")
    .updates_tx
    .send(update)
    .expect("Failed to send update label through channel");
  Ok(())
}

async fn show_window(AxumState(app_handle): AxumState<AppHandle>) -> Result<(), String> {
  log::info!("Show window request");
  let window = app_handle.get_window("main");
  if window.is_none() {
    let message = String::from("Failed to get main window");
    log::error!("{message}");
    return Err(message);
  }
  let window = window.unwrap();
  window.show().map_err(|err| {
    let message = format!("Failed to show window: {err:?}");
    log::error!("{message}");
    message
  })?;
  log::info!("Window shown");
  Ok(())
}

async fn hide_window(AxumState(app_handle): AxumState<AppHandle>) -> Result<(), String> {
  log::info!("Hide window request");
  let window = app_handle.get_window("main");
  if window.is_none() {
    let message = String::from("Failed to get main window");
    log::error!("{message}");
    return Err(message);
  }
  let window = window.unwrap();
  window.hide().map_err(|err| {
    let message = format!("Failed to hide window: {err:?}");
    log::error!("{message}");
    message
  })?;
  log::info!("Window hidden");
  Ok(())
}

async fn open_chat(
  AxumState(app_handle): AxumState<AppHandle>,
  Path(id): Path<String>,
) -> Result<(), String> {
  log::info!("Open chat request for id {id}");
  let window = app_handle.get_webview_window("main");
  if window.is_none() {
    let message = String::from("Failed to get main window");
    log::error!("{message}");
    return Err(message);
  }
  let window = window.unwrap();

  window.emit("external://open-chat", id).map_err(|err| {
    let message = format!("Failed to emit chat change event: {err:?}");
    log::error!("{message}");
    message
  })?;
  log::info!("Sent 'external://open-chat' emit to front");

  Ok(())
}

async fn get_chats(AxumState(app_handle): AxumState<AppHandle>) -> Result<(), String> {
  log::info!("Chats list request");
  let window = app_handle.get_webview_window("main");
  if window.is_none() {
    let message = String::from("Failed to get main window");
    log::error!("{message}");
    return Err(message);
  }
  let window = window.unwrap();

  window.emit("external://chats-request", "").map_err(|err| {
    let message = format!("Failed to emit chat change event: {err:?}");
    log::error!("{message}");
    message
  })?;
  log::info!("Sent 'external://chats-request' emit to front");

  Ok(())
}

#[derive(Serialize, Deserialize, Debug)]
struct WindowLocation {
  x: u32,
  y: u32,
  width: u32,
  height: u32,
}

async fn locate_window(
  AxumState(app_handle): AxumState<AppHandle>,
  Json(location): Json<WindowLocation>,
) -> Result<(), String> {
  log::info!("Locate window request to {location:?}");
  let window = app_handle.get_window("main");
  if window.is_none() {
    let message = String::from("Failed to get main window");
    log::error!("{message}");
    return Err(message);
  }
  let window = window.unwrap();
  window
    .set_position(LogicalPosition::new(location.x, location.y))
    .map_err(|err| {
      let message = format!("Failed to set window position: {err:?}");
      log::error!("{message}");
      message
    })?;
  log::info!("Position set");
  window
    .set_size(LogicalSize::new(location.width, location.height))
    .map_err(|err| {
      let message = format!("Failed to set window size: {err:?}");
      log::error!("{message}");
      message
    })?;
  log::info!("Size set");
  Ok(())
}

pub async fn start_server(app_handle: AppHandle) -> Result<(), Box<dyn std::error::Error>> {
  let app = Router::new()
    .route("/chat", get(get_chats))
    .route("/chat/{id}/open", post(open_chat))
    .route("/window/show", post(show_window))
    .route("/window/hide", post(hide_window))
    .route("/window/locate", post(locate_window))
    .route("/ws", any(handler))
    .with_state(app_handle);

  let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await?;
  axum::serve(listener, app).await?;

  Ok(())
}
