use axum::extract::{Query, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::services::sync;
use claude_admin_shared::{SyncManifest, SyncPullRequest, SyncPushRequest, SyncResult};

pub async fn get_manifest(
    State(state): State<Arc<AppState>>,
) -> Result<Json<SyncManifest>, ApiError> {
    let manifest = sync::generate_manifest(&state.claude_home).await?;
    Ok(Json(manifest))
}

pub async fn push_files(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<SyncPushRequest>,
) -> Result<Json<SyncResult>, ApiError> {
    let result = sync::push_to_remote(&state.claude_home, &req.target_url, &req.files).await?;
    crate::services::audit::log_audit(
        &state.claude_home,
        "sync_push",
        "sync",
        &req.target_url,
        Some(&format!("{} files", req.files.len())),
    )
    .await;
    Ok(Json(result))
}

pub async fn pull_files(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<SyncPullRequest>,
) -> Result<Json<SyncResult>, ApiError> {
    let result = sync::pull_from_remote(&state.claude_home, &req.source_url, &req.files).await?;
    crate::services::audit::log_audit(
        &state.claude_home,
        "sync_pull",
        "sync",
        &req.source_url,
        Some(&format!("{} files", req.files.len())),
    )
    .await;
    Ok(Json(result))
}

#[derive(serde::Deserialize)]
pub struct FileQuery {
    pub path: String,
}

pub async fn get_file(
    State(state): State<Arc<AppState>>,
    Query(query): Query<FileQuery>,
) -> Result<String, ApiError> {
    if query.path.contains("..") || query.path.starts_with('/') {
        return Err(ApiError::BadRequest("Invalid path".to_string()));
    }
    let full_path = state.claude_home.join(&query.path);
    if !tokio::fs::try_exists(&full_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!(
            "File not found: {}",
            query.path
        )));
    }
    let content = tokio::fs::read_to_string(&full_path).await?;
    Ok(content)
}

#[derive(serde::Deserialize)]
pub struct ReceivePayload {
    pub path: String,
    pub content: String,
}

pub async fn receive_file(
    State(state): State<Arc<AppState>>,
    AppJson(payload): AppJson<ReceivePayload>,
) -> Result<Json<serde_json::Value>, ApiError> {
    sync::receive_file(&state.claude_home, &payload.path, &payload.content).await?;
    Ok(Json(
        serde_json::json!({ "status": "received", "path": payload.path }),
    ))
}
