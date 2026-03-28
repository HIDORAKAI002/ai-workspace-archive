use axum::extract::State;
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::system_info;
use claude_admin_shared::*;

pub async fn get_system_info(
    State(state): State<Arc<AppState>>,
) -> Result<Json<SystemInfo>, ApiError> {
    let info = system_info::get_system_info(&state.claude_home, &state.claude_json_path)?;
    Ok(Json(info))
}

pub async fn get_storage_info(
    State(state): State<Arc<AppState>>,
) -> Result<Json<StorageInfo>, ApiError> {
    let info = system_info::get_storage_info(&state.claude_home)?;
    Ok(Json(info))
}
