use axum::extract::State;
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::services::export;
use claude_admin_shared::{ExportBundle, ImportResult};

pub async fn export_bundle(
    State(state): State<Arc<AppState>>,
) -> Result<Json<ExportBundle>, ApiError> {
    let bundle = export::create_export_bundle(
        &state.claude_home,
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
    )
    .await?;
    Ok(Json(bundle))
}

pub async fn import_bundle(
    State(state): State<Arc<AppState>>,
    AppJson(bundle): AppJson<ExportBundle>,
) -> Result<Json<ImportResult>, ApiError> {
    let result = export::import_bundle(
        &state.claude_home,
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        bundle,
    )
    .await?;
    Ok(Json(result))
}
