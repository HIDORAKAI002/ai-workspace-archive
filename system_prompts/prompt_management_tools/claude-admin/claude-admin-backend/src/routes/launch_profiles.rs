use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::domain::validation::validate_resource_name;
use crate::services::{audit, file_ops};
use claude_admin_shared::{
    LaunchCommand, LaunchProfile, LaunchProfileCreateRequest, LaunchProfileUpdateRequest,
};

pub async fn list_profiles(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<LaunchProfile>>, ApiError> {
    let profiles_dir = state.claude_home.join("launch-profiles");
    if !tokio::fs::try_exists(&profiles_dir).await.unwrap_or(false) {
        return Ok(Json(vec![]));
    }

    let mut profiles = Vec::new();
    let mut dir = tokio::fs::read_dir(&profiles_dir).await?;
    while let Some(entry) = dir.next_entry().await? {
        let path = entry.path();
        if path.extension().is_some_and(|e| e == "json") {
            let content = tokio::fs::read_to_string(&path).await?;
            if let Ok(profile) = serde_json::from_str::<LaunchProfile>(&content) {
                profiles.push(profile);
            }
        }
    }

    profiles.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(Json(profiles))
}

pub async fn get_profile(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<LaunchProfile>, ApiError> {
    validate_resource_name(&name, "Launch profile")?;
    let profile_path = state
        .claude_home
        .join("launch-profiles")
        .join(format!("{}.json", name));

    let content = tokio::fs::read_to_string(&profile_path)
        .await
        .map_err(|_| ApiError::NotFound(format!("Launch profile '{}' not found", name)))?;

    let profile: LaunchProfile = serde_json::from_str(&content)
        .map_err(|e| ApiError::BadRequest(format!("Invalid profile JSON: {}", e)))?;

    Ok(Json(profile))
}

pub async fn create_profile(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<LaunchProfileCreateRequest>,
) -> Result<Json<LaunchProfile>, ApiError> {
    validate_resource_name(&req.name, "Launch profile")?;

    let profiles_dir = state.claude_home.join("launch-profiles");
    tokio::fs::create_dir_all(&profiles_dir).await?;

    let profile_path = profiles_dir.join(format!("{}.json", req.name));
    if tokio::fs::try_exists(&profile_path).await.unwrap_or(false) {
        return Err(ApiError::BadRequest(format!(
            "Launch profile '{}' already exists",
            req.name
        )));
    }

    let profile = LaunchProfile {
        name: req.name.clone(),
        description: req.description,
        model: req.model,
        effort: req.effort,
        permission_mode: req.permission_mode,
        allowed_tools: req.allowed_tools,
        disallowed_tools: req.disallowed_tools,
        system_prompt: req.system_prompt,
        append_system_prompt: req.append_system_prompt,
        max_budget_usd: req.max_budget_usd,
        fallback_model: req.fallback_model,
        mcp_config: req.mcp_config,
        debug: req.debug,
        add_dirs: req.add_dirs,
    };

    let json = serde_json::to_string_pretty(&profile)
        .map_err(|e| ApiError::Internal(format!("Failed to serialize profile: {}", e)))?;
    file_ops::write_with_backup(&state.claude_home, &profile_path, &json).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "launch_profile.created",
        serde_json::json!({"name": &req.name}),
    );

    audit::log_audit(
        &state.claude_home,
        "create",
        "launch_profile",
        &req.name,
        None,
    )
    .await;

    Ok(Json(profile))
}

pub async fn update_profile(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
    AppJson(req): AppJson<LaunchProfileUpdateRequest>,
) -> Result<Json<LaunchProfile>, ApiError> {
    validate_resource_name(&name, "Launch profile")?;
    let profile_path = state
        .claude_home
        .join("launch-profiles")
        .join(format!("{}.json", name));

    let content = tokio::fs::read_to_string(&profile_path)
        .await
        .map_err(|_| ApiError::NotFound(format!("Launch profile '{}' not found", name)))?;

    let mut profile: LaunchProfile = serde_json::from_str(&content)
        .map_err(|e| ApiError::BadRequest(format!("Invalid profile JSON: {}", e)))?;

    // Merge update fields
    if let Some(description) = req.description {
        profile.description = description;
    }
    if req.model.is_some() {
        profile.model = req.model;
    }
    if req.effort.is_some() {
        profile.effort = req.effort;
    }
    if req.permission_mode.is_some() {
        profile.permission_mode = req.permission_mode;
    }
    if let Some(allowed_tools) = req.allowed_tools {
        profile.allowed_tools = allowed_tools;
    }
    if let Some(disallowed_tools) = req.disallowed_tools {
        profile.disallowed_tools = disallowed_tools;
    }
    if req.system_prompt.is_some() {
        profile.system_prompt = req.system_prompt;
    }
    if req.append_system_prompt.is_some() {
        profile.append_system_prompt = req.append_system_prompt;
    }
    if req.max_budget_usd.is_some() {
        profile.max_budget_usd = req.max_budget_usd;
    }
    if req.fallback_model.is_some() {
        profile.fallback_model = req.fallback_model;
    }
    if req.mcp_config.is_some() {
        profile.mcp_config = req.mcp_config;
    }
    if req.debug.is_some() {
        profile.debug = req.debug;
    }
    if let Some(add_dirs) = req.add_dirs {
        profile.add_dirs = add_dirs;
    }

    let json = serde_json::to_string_pretty(&profile)
        .map_err(|e| ApiError::Internal(format!("Failed to serialize profile: {}", e)))?;
    file_ops::write_with_backup(&state.claude_home, &profile_path, &json).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "launch_profile.updated",
        serde_json::json!({"name": &name}),
    );

    audit::log_audit(&state.claude_home, "update", "launch_profile", &name, None).await;

    Ok(Json(profile))
}

pub async fn delete_profile(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    validate_resource_name(&name, "Launch profile")?;
    let profile_path = state
        .claude_home
        .join("launch-profiles")
        .join(format!("{}.json", name));

    if !tokio::fs::try_exists(&profile_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!(
            "Launch profile '{}' not found",
            name
        )));
    }

    let content = tokio::fs::read_to_string(&profile_path).await?;
    file_ops::create_backup(&state.claude_home, &profile_path, &content).await?;

    tokio::fs::remove_file(&profile_path).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "launch_profile.deleted",
        serde_json::json!({"name": &name}),
    );

    audit::log_audit(&state.claude_home, "delete", "launch_profile", &name, None).await;

    Ok(Json(serde_json::json!({"deleted": name})))
}

pub async fn generate_command(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<LaunchCommand>, ApiError> {
    validate_resource_name(&name, "Launch profile")?;
    let profile_path = state
        .claude_home
        .join("launch-profiles")
        .join(format!("{}.json", name));

    let content = tokio::fs::read_to_string(&profile_path)
        .await
        .map_err(|_| ApiError::NotFound(format!("Launch profile '{}' not found", name)))?;

    let profile: LaunchProfile = serde_json::from_str(&content)
        .map_err(|e| ApiError::BadRequest(format!("Invalid profile JSON: {}", e)))?;

    let command = build_cli_command(&profile);
    Ok(Json(LaunchCommand { command }))
}

fn build_cli_command(profile: &LaunchProfile) -> String {
    let mut parts = vec!["claude".to_string()];

    if let Some(ref model) = profile.model {
        parts.push("--model".to_string());
        parts.push(model.clone());
    }

    if let Some(ref effort) = profile.effort {
        parts.push("--effort".to_string());
        parts.push(effort.clone());
    }

    if let Some(ref permission_mode) = profile.permission_mode {
        parts.push("--permission-mode".to_string());
        parts.push(permission_mode.clone());
    }

    if !profile.allowed_tools.is_empty() {
        parts.push("--allowed-tools".to_string());
        parts.push(format!("\"{}\"", profile.allowed_tools.join(" ")));
    }

    if !profile.disallowed_tools.is_empty() {
        parts.push("--disallowed-tools".to_string());
        parts.push(format!("\"{}\"", profile.disallowed_tools.join(" ")));
    }

    if let Some(ref system_prompt) = profile.system_prompt {
        parts.push("--system-prompt".to_string());
        parts.push(format!("\"{}\"", system_prompt));
    }

    if let Some(ref append) = profile.append_system_prompt {
        parts.push("--append-system-prompt".to_string());
        parts.push(format!("\"{}\"", append));
    }

    if let Some(budget) = profile.max_budget_usd {
        parts.push("--max-budget-usd".to_string());
        parts.push(format!("{}", budget));
    }

    if let Some(ref fallback) = profile.fallback_model {
        parts.push("--fallback-model".to_string());
        parts.push(fallback.clone());
    }

    if let Some(ref mcp_config) = profile.mcp_config {
        parts.push("--mcp-config".to_string());
        parts.push(mcp_config.clone());
    }

    if let Some(ref debug) = profile.debug {
        parts.push("--debug".to_string());
        parts.push(format!("\"{}\"", debug));
    }

    for dir in &profile.add_dirs {
        parts.push("--add-dir".to_string());
        parts.push(dir.clone());
    }

    parts.join(" ")
}
