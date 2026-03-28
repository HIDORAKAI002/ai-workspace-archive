use axum::extract::{Path, Query, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::timeline;

#[derive(serde::Deserialize)]
pub struct TimelineQuery {
    #[serde(default = "default_limit")]
    pub limit: usize,
}

fn default_limit() -> usize {
    50
}

/// GET /api/v1/timeline — List recent timeline commits
pub async fn list_timeline(
    State(state): State<Arc<AppState>>,
    Query(query): Query<TimelineQuery>,
) -> Result<Json<Vec<timeline::TimelineEntry>>, ApiError> {
    let entries = timeline::list_timeline(&state.claude_home, query.limit).await?;
    Ok(Json(entries))
}

/// GET /api/v1/timeline/:hash — Get diff for a specific commit
pub async fn get_commit_diff(
    State(state): State<Arc<AppState>>,
    Path(hash): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    let diff = timeline::get_commit_diff(&state.claude_home, &hash).await?;
    Ok(Json(serde_json::json!({ "hash": hash, "diff": diff })))
}

/// POST /api/v1/timeline/:hash/restore — Restore to a specific commit
pub async fn restore_to_commit(
    State(state): State<Arc<AppState>>,
    Path(hash): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    timeline::restore_to_commit(&state.claude_home, &hash).await?;
    crate::services::audit::log_audit(
        &state.claude_home,
        "restore",
        "timeline",
        &hash,
        Some("Restored via timeline"),
    )
    .await;
    Ok(Json(
        serde_json::json!({ "status": "restored", "hash": hash }),
    ))
}
