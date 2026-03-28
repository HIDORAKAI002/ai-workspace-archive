use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::domain::validation::validate_resource_name;
use crate::services::file_ops;
use claude_admin_shared::{PlanFile, PlanUpdateRequest};

pub async fn list_plans(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<PlanFile>>, ApiError> {
    let plans_dir = state.claude_home.join("plans");
    if !tokio::fs::try_exists(&plans_dir).await.unwrap_or(false) {
        return Ok(Json(vec![]));
    }

    let mut plans = Vec::new();
    let mut dir = tokio::fs::read_dir(&plans_dir).await?;
    while let Some(entry) = dir.next_entry().await? {
        let path = entry.path();
        if path.extension().is_some_and(|e| e == "md") {
            let content = tokio::fs::read_to_string(&path).await?;
            let metadata = entry.metadata().await?;
            let modified = metadata
                .modified()
                .ok()
                .and_then(|t| {
                    t.duration_since(std::time::UNIX_EPOCH)
                        .ok()
                        .map(|d| d.as_secs())
                })
                .map(|secs| {
                    chrono::DateTime::from_timestamp(secs as i64, 0)
                        .map(|dt| dt.format("%Y-%m-%d %H:%M:%S").to_string())
                        .unwrap_or_default()
                })
                .unwrap_or_default();

            plans.push(PlanFile {
                name: path.file_stem().unwrap().to_string_lossy().to_string(),
                path: path.to_string_lossy().to_string(),
                content,
                modified,
            });
        }
    }

    plans.sort_by(|a, b| b.modified.cmp(&a.modified));
    Ok(Json(plans))
}

pub async fn get_plan(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<PlanFile>, ApiError> {
    validate_resource_name(&name, "Plan")?;
    let plan_path = state.claude_home.join("plans").join(format!("{}.md", name));

    let content = tokio::fs::read_to_string(&plan_path)
        .await
        .map_err(|_| ApiError::NotFound(format!("Plan '{}' not found", name)))?;

    let modified = tokio::fs::metadata(&plan_path)
        .await
        .ok()
        .and_then(|m| m.modified().ok())
        .and_then(|t| {
            t.duration_since(std::time::UNIX_EPOCH)
                .ok()
                .map(|d| d.as_secs())
        })
        .map(|secs| {
            chrono::DateTime::from_timestamp(secs as i64, 0)
                .map(|dt| dt.format("%Y-%m-%d %H:%M:%S").to_string())
                .unwrap_or_default()
        })
        .unwrap_or_default();

    Ok(Json(PlanFile {
        name,
        path: plan_path.to_string_lossy().to_string(),
        content,
        modified,
    }))
}

pub async fn update_plan(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
    AppJson(req): AppJson<PlanUpdateRequest>,
) -> Result<Json<PlanFile>, ApiError> {
    validate_resource_name(&name, "Plan")?;
    let plan_path = state.claude_home.join("plans").join(format!("{}.md", name));

    if !tokio::fs::try_exists(&plan_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!("Plan '{}' not found", name)));
    }

    file_ops::write_with_backup(&state.claude_home, &plan_path, &req.content).await?;

    Ok(Json(PlanFile {
        name,
        path: plan_path.to_string_lossy().to_string(),
        content: req.content,
        modified: chrono::Utc::now().format("%Y-%m-%d %H:%M:%S").to_string(),
    }))
}

pub async fn delete_plan(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    validate_resource_name(&name, "Plan")?;
    let plan_path = state.claude_home.join("plans").join(format!("{}.md", name));

    if !tokio::fs::try_exists(&plan_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!("Plan '{}' not found", name)));
    }

    let content = tokio::fs::read_to_string(&plan_path).await?;
    file_ops::create_backup(&state.claude_home, &plan_path, &content).await?;

    tokio::fs::remove_file(&plan_path).await?;
    Ok(Json(serde_json::json!({"deleted": name})))
}
