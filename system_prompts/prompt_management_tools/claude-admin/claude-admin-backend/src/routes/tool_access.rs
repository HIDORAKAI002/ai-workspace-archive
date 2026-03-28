use axum::extract::{Query, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::services::{audit, file_ops, project_resolver};
use claude_admin_shared::*;

const BUILT_IN_TOOLS: &[&str] = &[
    "Agent",
    "Bash",
    "Edit",
    "Glob",
    "Grep",
    "Read",
    "Write",
    "NotebookEdit",
    "WebFetch",
    "WebSearch",
    "TodoRead",
    "TodoWrite",
];

#[derive(serde::Deserialize)]
pub struct ToolAccessQuery {
    #[serde(default)]
    pub project_id: Option<String>,
}

pub async fn get_tool_access(
    State(state): State<Arc<AppState>>,
    Query(query): Query<ToolAccessQuery>,
) -> Result<Json<ToolAccessConfig>, ApiError> {
    let (settings, project_id, project_name) = load_settings(&state, &query.project_id).await?;

    let allowed_tools = settings
        .get("allowedTools")
        .and_then(|v| v.as_array())
        .map(|arr| {
            arr.iter()
                .filter_map(|v| v.as_str().map(|s| s.to_string()))
                .collect()
        })
        .unwrap_or_default();

    let disallowed_tools = settings
        .get("disallowedTools")
        .and_then(|v| v.as_array())
        .map(|arr| {
            arr.iter()
                .filter_map(|v| v.as_str().map(|s| s.to_string()))
                .collect()
        })
        .unwrap_or_default();

    let available_tools = BUILT_IN_TOOLS.iter().map(|s| s.to_string()).collect();

    Ok(Json(ToolAccessConfig {
        project_id,
        project_name,
        allowed_tools,
        disallowed_tools,
        available_tools,
    }))
}

pub async fn update_tool_access(
    State(state): State<Arc<AppState>>,
    Query(query): Query<ToolAccessQuery>,
    AppJson(req): AppJson<ToolAccessUpdateRequest>,
) -> Result<Json<ToolAccessConfig>, ApiError> {
    let settings_path = settings_path(&state, &query.project_id).await?;

    // Read existing settings or start with empty object
    let mut settings: serde_json::Value =
        if let Ok(content) = tokio::fs::read_to_string(&settings_path).await {
            serde_json::from_str(&content).unwrap_or_else(|_| serde_json::json!({}))
        } else {
            serde_json::json!({})
        };

    let obj = settings
        .as_object_mut()
        .ok_or_else(|| ApiError::Internal("Settings is not a JSON object".to_string()))?;

    // Update or remove allowedTools
    if req.allowed_tools.is_empty() {
        obj.remove("allowedTools");
    } else {
        obj.insert(
            "allowedTools".to_string(),
            serde_json::json!(req.allowed_tools),
        );
    }

    // Update or remove disallowedTools
    if req.disallowed_tools.is_empty() {
        obj.remove("disallowedTools");
    } else {
        obj.insert(
            "disallowedTools".to_string(),
            serde_json::json!(req.disallowed_tools),
        );
    }

    let content = serde_json::to_string_pretty(&settings)?;

    // Ensure parent directory exists for project-scoped settings
    if let Some(parent) = settings_path.parent() {
        tokio::fs::create_dir_all(parent).await?;
    }

    file_ops::write_with_backup(&state.claude_home, &settings_path, &content).await?;

    let scope_label = if query.project_id.is_some() {
        "project"
    } else {
        "global"
    };

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "tool_access.updated",
        serde_json::json!({"scope": scope_label}),
    );

    audit::log_audit(
        &state.claude_home,
        "update",
        "tool_access",
        scope_label,
        None,
    )
    .await;

    let available_tools = BUILT_IN_TOOLS.iter().map(|s| s.to_string()).collect();

    Ok(Json(ToolAccessConfig {
        project_id: query.project_id.clone(),
        project_name: None,
        allowed_tools: req.allowed_tools,
        disallowed_tools: req.disallowed_tools,
        available_tools,
    }))
}

/// Load the appropriate settings.json based on whether a project_id is provided.
async fn load_settings(
    state: &AppState,
    project_id: &Option<String>,
) -> Result<(serde_json::Value, Option<String>, Option<String>), ApiError> {
    match project_id {
        Some(id) => {
            let project_path = project_resolver::decode_project_id(id)?;
            let encoded = project_resolver::encode_project_path(&project_path);
            let path = state
                .claude_home
                .join("projects")
                .join(&encoded)
                .join("settings.json");

            let settings = if let Ok(content) = tokio::fs::read_to_string(&path).await {
                serde_json::from_str(&content).unwrap_or_else(|_| serde_json::json!({}))
            } else {
                serde_json::json!({})
            };

            let name = std::path::Path::new(&project_path)
                .file_name()
                .map(|s| s.to_string_lossy().to_string());

            Ok((settings, Some(id.clone()), name))
        }
        None => {
            let path = state.claude_home.join("settings.json");
            let settings = if let Ok(content) = tokio::fs::read_to_string(&path).await {
                serde_json::from_str(&content).unwrap_or_else(|_| serde_json::json!({}))
            } else {
                serde_json::json!({})
            };
            Ok((settings, None, None))
        }
    }
}

/// Resolve the settings.json path for global or project scope.
async fn settings_path(
    state: &AppState,
    project_id: &Option<String>,
) -> Result<std::path::PathBuf, ApiError> {
    match project_id {
        Some(id) => {
            let project_path = project_resolver::decode_project_id(id)?;
            let encoded = project_resolver::encode_project_path(&project_path);
            Ok(state
                .claude_home
                .join("projects")
                .join(encoded)
                .join("settings.json"))
        }
        None => Ok(state.claude_home.join("settings.json")),
    }
}
