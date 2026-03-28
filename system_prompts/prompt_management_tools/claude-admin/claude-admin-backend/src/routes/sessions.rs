use axum::extract::{Path, Query, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::sessions;
use claude_admin_shared::*;

#[derive(serde::Deserialize)]
pub struct SessionListQuery {
    pub offset: Option<u64>,
    pub limit: Option<u64>,
    pub project: Option<String>,
}

pub async fn list_sessions(
    State(state): State<Arc<AppState>>,
    Query(params): Query<SessionListQuery>,
) -> Result<Json<SessionListResponse>, ApiError> {
    let offset = params.offset.unwrap_or(0);
    let limit = params.limit.unwrap_or(20);
    let project_filter = params.project.as_deref();

    let result = sessions::list_sessions(&state.claude_home, offset, limit, project_filter)?;
    Ok(Json(result))
}

pub async fn get_session(
    State(state): State<Arc<AppState>>,
    Path(session_id): Path<String>,
) -> Result<Json<SessionDetail>, ApiError> {
    let detail = sessions::get_session(&state.claude_home, &session_id)?;
    Ok(Json(detail))
}

pub async fn get_transcript(
    State(state): State<Arc<AppState>>,
    Path(session_id): Path<String>,
) -> Result<Json<SessionTranscript>, ApiError> {
    let transcript = sessions::get_transcript(&state.claude_home, &session_id)?;
    Ok(Json(transcript))
}

#[derive(serde::Deserialize)]
pub struct SearchQuery {
    pub q: String,
    pub limit: Option<usize>,
}

pub async fn search_history(
    State(state): State<Arc<AppState>>,
    Query(params): Query<SearchQuery>,
) -> Result<Json<Vec<HistoryEntry>>, ApiError> {
    let limit = params.limit.unwrap_or(20);
    let results = sessions::search_history(&state.claude_home, &params.q, limit)?;
    Ok(Json(results))
}
