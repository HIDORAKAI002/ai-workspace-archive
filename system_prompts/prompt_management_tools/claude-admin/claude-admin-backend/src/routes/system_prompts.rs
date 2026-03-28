use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::domain::validation::validate_resource_name;
use crate::services::{audit, file_ops};
use claude_admin_shared::{SystemPromptCreateRequest, SystemPromptFile, SystemPromptUpdateRequest};

pub async fn list_system_prompts(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<SystemPromptFile>>, ApiError> {
    let prompts_dir = state.claude_home.join("system-prompts");
    if !tokio::fs::try_exists(&prompts_dir).await.unwrap_or(false) {
        return Ok(Json(vec![]));
    }

    let mut prompts = Vec::new();
    let mut dir = tokio::fs::read_dir(&prompts_dir).await?;
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

            prompts.push(SystemPromptFile {
                name: path.file_stem().unwrap().to_string_lossy().to_string(),
                path: path.to_string_lossy().to_string(),
                content,
                modified,
            });
        }
    }

    prompts.sort_by(|a, b| b.modified.cmp(&a.modified));
    Ok(Json(prompts))
}

pub async fn get_system_prompt(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<SystemPromptFile>, ApiError> {
    validate_resource_name(&name, "System prompt")?;
    let prompt_path = state
        .claude_home
        .join("system-prompts")
        .join(format!("{}.md", name));

    let content = tokio::fs::read_to_string(&prompt_path)
        .await
        .map_err(|_| ApiError::NotFound(format!("System prompt '{}' not found", name)))?;

    let modified = tokio::fs::metadata(&prompt_path)
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

    Ok(Json(SystemPromptFile {
        name,
        path: prompt_path.to_string_lossy().to_string(),
        content,
        modified,
    }))
}

pub async fn create_system_prompt(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<SystemPromptCreateRequest>,
) -> Result<Json<SystemPromptFile>, ApiError> {
    validate_resource_name(&req.name, "System prompt")?;

    let prompts_dir = state.claude_home.join("system-prompts");
    tokio::fs::create_dir_all(&prompts_dir).await?;

    let prompt_path = prompts_dir.join(format!("{}.md", req.name));
    if tokio::fs::try_exists(&prompt_path).await.unwrap_or(false) {
        return Err(ApiError::BadRequest(format!(
            "System prompt '{}' already exists",
            req.name
        )));
    }

    file_ops::write_with_backup(&state.claude_home, &prompt_path, &req.content).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "system_prompt.created",
        serde_json::json!({"name": &req.name}),
    );

    audit::log_audit(
        &state.claude_home,
        "create",
        "system_prompt",
        &req.name,
        None,
    )
    .await;

    Ok(Json(SystemPromptFile {
        name: req.name,
        path: prompt_path.to_string_lossy().to_string(),
        content: req.content,
        modified: chrono::Utc::now().format("%Y-%m-%d %H:%M:%S").to_string(),
    }))
}

pub async fn update_system_prompt(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
    AppJson(req): AppJson<SystemPromptUpdateRequest>,
) -> Result<Json<SystemPromptFile>, ApiError> {
    validate_resource_name(&name, "System prompt")?;
    let prompt_path = state
        .claude_home
        .join("system-prompts")
        .join(format!("{}.md", name));

    if !tokio::fs::try_exists(&prompt_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!(
            "System prompt '{}' not found",
            name
        )));
    }

    file_ops::write_with_backup(&state.claude_home, &prompt_path, &req.content).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "system_prompt.updated",
        serde_json::json!({"name": &name}),
    );

    audit::log_audit(&state.claude_home, "update", "system_prompt", &name, None).await;

    Ok(Json(SystemPromptFile {
        name,
        path: prompt_path.to_string_lossy().to_string(),
        content: req.content,
        modified: chrono::Utc::now().format("%Y-%m-%d %H:%M:%S").to_string(),
    }))
}

pub async fn delete_system_prompt(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    validate_resource_name(&name, "System prompt")?;
    let prompt_path = state
        .claude_home
        .join("system-prompts")
        .join(format!("{}.md", name));

    if !tokio::fs::try_exists(&prompt_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!(
            "System prompt '{}' not found",
            name
        )));
    }

    let content = tokio::fs::read_to_string(&prompt_path).await?;
    file_ops::create_backup(&state.claude_home, &prompt_path, &content).await?;

    tokio::fs::remove_file(&prompt_path).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "system_prompt.deleted",
        serde_json::json!({"name": &name}),
    );

    audit::log_audit(&state.claude_home, "delete", "system_prompt", &name, None).await;

    Ok(Json(serde_json::json!({"deleted": name})))
}
