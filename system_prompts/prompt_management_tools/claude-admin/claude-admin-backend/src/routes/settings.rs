use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::services::{audit, claude_api, file_ops, fs_scanner, project_resolver, system_info};
use claude_admin_shared::*;

pub async fn get_global_settings(
    State(state): State<Arc<AppState>>,
) -> Result<Json<SettingsOverview>, ApiError> {
    let overview = fs_scanner::scan_settings(&state.claude_home).await?;
    Ok(Json(overview))
}

pub async fn put_global_settings(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<SettingsUpdateRequest>,
) -> Result<Json<SettingsOverview>, ApiError> {
    let settings_path = state.claude_home.join("settings.json");
    let content = serde_json::to_string_pretty(&req.settings)?;
    file_ops::write_with_backup(&state.claude_home, &settings_path, &content).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(&webhooks, "settings.updated", serde_json::json!({}));

    audit::log_audit(&state.claude_home, "update", "settings", "global", None).await;

    let overview = fs_scanner::scan_settings(&state.claude_home).await?;
    Ok(Json(overview))
}

pub async fn get_claude_json(
    State(state): State<Arc<AppState>>,
) -> Result<Json<ClaudeJsonOverview>, ApiError> {
    let overview = fs_scanner::scan_claude_json(&state.claude_json_path).await?;
    Ok(Json(overview))
}

pub async fn get_settings_hierarchy(
    State(state): State<Arc<AppState>>,
    Path(project_id): Path<String>,
) -> Result<Json<SettingsHierarchy>, ApiError> {
    let project_path = project_resolver::decode_project_id(&project_id)?;
    let hierarchy = fs_scanner::scan_settings_hierarchy(&state.claude_home, &project_path).await?;
    Ok(Json(hierarchy))
}

pub async fn get_hook_templates() -> Result<Json<Vec<HookTemplate>>, ApiError> {
    let templates = vec![
        HookTemplate {
            name: "Auto-Format (Rust)".to_string(),
            description: "Run cargo fmt after file edits".to_string(),
            event: "PostToolUse".to_string(),
            matcher: Some("Edit|Write".to_string()),
            command: "cargo fmt --quiet 2>/dev/null || true".to_string(),
        },
        HookTemplate {
            name: "Auto-Format (JavaScript)".to_string(),
            description: "Run prettier after file edits".to_string(),
            event: "PostToolUse".to_string(),
            matcher: Some("Edit|Write".to_string()),
            command: "npx prettier --write \"$CLAUDE_FILE\" 2>/dev/null || true".to_string(),
        },
        HookTemplate {
            name: "Lint on Save".to_string(),
            description: "Run ESLint after edits".to_string(),
            event: "PostToolUse".to_string(),
            matcher: Some("Edit|Write".to_string()),
            command: "npx eslint --fix \"$CLAUDE_FILE\" 2>/dev/null || true".to_string(),
        },
        HookTemplate {
            name: "Block .env writes".to_string(),
            description: "Prevent writing to .env files".to_string(),
            event: "PreToolUse".to_string(),
            matcher: Some("Edit|Write".to_string()),
            command: "if echo \"$CLAUDE_FILE\" | grep -q '\\.env'; then echo 'BLOCKED: Cannot modify .env files' >&2; exit 1; fi".to_string(),
        },
        HookTemplate {
            name: "Notify on completion".to_string(),
            description: "Desktop notification when Claude finishes".to_string(),
            event: "Stop".to_string(),
            matcher: None,
            command: "osascript -e 'display notification \"Claude Code finished\" with title \"ClaudeAdmin\"' 2>/dev/null || true".to_string(),
        },
    ];
    Ok(Json(templates))
}

pub async fn get_storage(
    State(state): State<Arc<AppState>>,
) -> Result<Json<StorageInfo>, ApiError> {
    let info = system_info::get_storage_info(&state.claude_home)?;
    Ok(Json(info))
}

pub async fn get_api_key_status(
    State(state): State<Arc<AppState>>,
) -> Result<Json<claude_api::AuthStatus>, ApiError> {
    let status = claude_api::get_auth_status(&state.claude_home);
    Ok(Json(status))
}

#[derive(serde::Deserialize)]
pub struct SetApiKeyRequest {
    pub api_key: String,
}

pub async fn set_api_key(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<SetApiKeyRequest>,
) -> Result<Json<claude_api::AuthStatus>, ApiError> {
    // 1. Persist to config file
    claude_api::save_api_key_to_config(&state.claude_home, &req.api_key)?;

    // 2. Update in-memory client
    {
        let mut guard = state
            .anthropic_client
            .write()
            .map_err(|_| ApiError::Internal("Lock poisoned".to_string()))?;

        if req.api_key.is_empty() {
            // Key removed → re-evaluate from other sources
            *guard = claude_api::AnthropicClient::from_env_or_config(&state.claude_home);
        } else {
            *guard = Some(claude_api::AnthropicClient::from_api_key(req.api_key));
        }
    }

    audit::log_audit(&state.claude_home, "update", "settings", "api-key", None).await;

    let status = claude_api::get_auth_status(&state.claude_home);
    Ok(Json(status))
}
