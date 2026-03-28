use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::templates;
use claude_admin_shared::{ConfigTemplate, TemplateApplyResult};

pub async fn list_templates() -> Result<Json<Vec<ConfigTemplate>>, ApiError> {
    Ok(Json(templates::list_templates()))
}

pub async fn apply_template(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<TemplateApplyResult>, ApiError> {
    let all_templates = templates::list_templates();
    let template = all_templates
        .iter()
        .find(|t| t.name == name)
        .ok_or_else(|| ApiError::NotFound(format!("Template '{}' not found", name)))?;

    let result = templates::apply_template(&state.claude_home, template).await?;
    Ok(Json(result))
}
