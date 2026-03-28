use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::services::{config_health, permissions, project_resolver};
use claude_admin_shared::*;

pub async fn list_permissions(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<ProjectPermissionSummary>>, ApiError> {
    let summaries =
        permissions::scan_all_permissions(&state.claude_home, &state.claude_json_path).await?;
    Ok(Json(summaries))
}

pub async fn get_project_permissions(
    State(state): State<Arc<AppState>>,
    Path(project_id): Path<String>,
) -> Result<Json<ProjectPermissions>, ApiError> {
    let project_path = project_resolver::decode_project_id(&project_id)?;
    let _ = &state.claude_home; // ensure state is used
    let perms = permissions::scan_project_permissions(&project_path).await?;
    Ok(Json(perms))
}

pub async fn delete_permission_entries(
    State(state): State<Arc<AppState>>,
    Path(project_id): Path<String>,
    AppJson(req): AppJson<PermissionDeleteRequest>,
) -> Result<Json<ProjectPermissions>, ApiError> {
    let project_path = project_resolver::decode_project_id(&project_id)?;
    permissions::remove_permissions(&state.claude_home, &project_path, &req.indices).await?;
    let perms = permissions::scan_project_permissions(&project_path).await?;
    Ok(Json(perms))
}

pub async fn get_health_overview(
    State(state): State<Arc<AppState>>,
) -> Result<Json<HealthOverview>, ApiError> {
    let overview =
        config_health::overall_health(&state.claude_home, &state.claude_json_path).await?;
    Ok(Json(overview))
}

pub async fn get_project_health(
    State(state): State<Arc<AppState>>,
    Path(project_id): Path<String>,
) -> Result<Json<ProjectHealth>, ApiError> {
    let project_path = project_resolver::decode_project_id(&project_id)?;
    let health = config_health::compute_health_score(&state.claude_home, &project_path).await?;
    Ok(Json(health))
}

pub async fn optimize_permissions(
    State(state): State<Arc<AppState>>,
    Path(project_id): Path<String>,
) -> Result<Json<Vec<PermissionOptimization>>, ApiError> {
    let project_path = project_resolver::decode_project_id(&project_id)?;
    let _ = &state.claude_home;
    let perms = permissions::scan_project_permissions(&project_path).await?;
    let optimizations = permissions::optimize_permissions(&perms);
    Ok(Json(optimizations))
}
