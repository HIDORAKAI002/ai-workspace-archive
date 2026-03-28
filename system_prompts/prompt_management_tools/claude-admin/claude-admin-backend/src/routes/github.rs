use axum::extract::State;
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::github;
use claude_admin_shared::*;

pub async fn get_github_overview(
    State(state): State<Arc<AppState>>,
) -> Result<Json<GitHubOverview>, ApiError> {
    let overview = github::get_github_overview(&state.claude_json_path)?;
    Ok(Json(overview))
}
