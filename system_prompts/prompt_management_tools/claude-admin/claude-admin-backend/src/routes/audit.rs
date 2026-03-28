use axum::extract::{Query, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::audit;
use claude_admin_shared::AuditLogResponse;

#[derive(serde::Deserialize)]
pub struct AuditQuery {
    #[serde(default = "default_limit")]
    pub limit: usize,
    #[serde(default)]
    pub offset: usize,
}

fn default_limit() -> usize {
    50
}

pub async fn get_audit_log(
    State(state): State<Arc<AppState>>,
    Query(query): Query<AuditQuery>,
) -> Result<Json<AuditLogResponse>, ApiError> {
    let response = audit::get_audit_log(&state.claude_home, query.limit, query.offset).await?;
    Ok(Json(response))
}
