use axum::extract::{Query, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::search;
use claude_admin_shared::SearchResult;

#[derive(serde::Deserialize)]
pub struct SearchQuery {
    pub q: String,
}

pub async fn search(
    State(state): State<Arc<AppState>>,
    Query(params): Query<SearchQuery>,
) -> Result<Json<Vec<SearchResult>>, ApiError> {
    if params.q.trim().is_empty() {
        return Ok(Json(vec![]));
    }
    let results = search::search(&state.claude_home, &params.q).await?;
    Ok(Json(results))
}
