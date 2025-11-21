use axum::{
    extract::ws::{WebSocketUpgrade, WebSocket},
    routing::{any, get},
    response::{IntoResponse, Response},
    Router,
};

async fn handler(ws: WebSocketUpgrade) -> Response {
    ws.on_upgrade(handle_socket)
}

async fn handle_socket(mut socket: WebSocket) {
    while let Some(msg) = socket.recv().await {
        let msg = if let Ok(msg) = msg {
            msg
        } else {
            // client disconnected
            return;
        };

        if socket.send(msg).await.is_err() {
            // client disconnected
            return;
        }
    }
}

pub async fn start_server() -> Result<(), Box<dyn std::error::Error>> {
    let app = Router::new()
      .route("/", get(|| async { "Hello, World!" }))
      .route("/ws", any(handler));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    axum::serve(listener, app).await?;

    Ok(())
}
