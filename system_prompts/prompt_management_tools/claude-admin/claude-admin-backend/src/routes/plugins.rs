use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::domain::validation::validate_resource_name;
use crate::services::audit;
use claude_admin_shared::*;

/// Scan ~/.claude/plugins/ for installed plugins.
/// Each sub-directory is treated as a plugin. We look for manifest.json or
/// package.json inside each directory to extract metadata.
async fn scan_plugins(claude_home: &std::path::Path) -> Result<Vec<PluginInfo>, ApiError> {
    let plugins_dir = claude_home.join("plugins");
    if !tokio::fs::try_exists(&plugins_dir).await.unwrap_or(false) {
        return Ok(Vec::new());
    }

    let mut result = Vec::new();
    let mut entries = tokio::fs::read_dir(&plugins_dir).await?;

    while let Some(entry) = entries.next_entry().await? {
        let path = entry.path();
        if !path.is_dir() {
            continue;
        }

        let name = path
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("unknown")
            .to_string();

        let mut description: Option<String> = None;
        let mut version: Option<String> = None;

        // Try manifest.json first
        let manifest_path = path.join("manifest.json");
        let package_path = path.join("package.json");

        if let Ok(content) = tokio::fs::read_to_string(&manifest_path).await {
            if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&content) {
                description = parsed
                    .get("description")
                    .and_then(|v| v.as_str())
                    .map(String::from);
                version = parsed
                    .get("version")
                    .and_then(|v| v.as_str())
                    .map(String::from);
            }
        } else if let Ok(content) = tokio::fs::read_to_string(&package_path).await {
            if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&content) {
                description = parsed
                    .get("description")
                    .and_then(|v| v.as_str())
                    .map(String::from);
                version = parsed
                    .get("version")
                    .and_then(|v| v.as_str())
                    .map(String::from);
            }
        }

        result.push(PluginInfo {
            name,
            path: path.to_string_lossy().to_string(),
            description,
            version,
            enabled: true,
            source: "global".to_string(),
        });
    }

    result.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(result)
}

pub async fn list_plugins(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<PluginInfo>>, ApiError> {
    let plugins = scan_plugins(&state.claude_home).await?;
    Ok(Json(plugins))
}

pub async fn install_plugin(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<PluginInstallRequest>,
) -> Result<Json<PluginInfo>, ApiError> {
    let source_path = std::path::Path::new(&req.path);

    if !tokio::fs::try_exists(source_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!(
            "Source path '{}' does not exist",
            req.path
        )));
    }

    // Validate source is a directory
    let metadata = tokio::fs::metadata(source_path).await?;
    if !metadata.is_dir() {
        return Err(ApiError::BadRequest(
            "Source path must be a directory".into(),
        ));
    }

    // Reject path traversal in the source path
    let canonical = tokio::fs::canonicalize(source_path).await?;
    let canonical_str = canonical.to_string_lossy();
    if canonical_str.contains("..") {
        return Err(ApiError::BadRequest("Path traversal not allowed".into()));
    }

    let plugin_name = source_path
        .file_name()
        .and_then(|n| n.to_str())
        .ok_or_else(|| ApiError::BadRequest("Could not determine plugin name from path".into()))?
        .to_string();

    validate_resource_name(&plugin_name, "Plugin")?;

    let plugins_dir = state.claude_home.join("plugins");
    tokio::fs::create_dir_all(&plugins_dir).await?;

    let target_path = plugins_dir.join(&plugin_name);
    if tokio::fs::try_exists(&target_path).await.unwrap_or(false) {
        return Err(ApiError::BadRequest(format!(
            "Plugin '{}' already exists",
            plugin_name
        )));
    }

    // Create a symlink to the source directory
    #[cfg(unix)]
    tokio::fs::symlink(&canonical, &target_path).await?;

    #[cfg(not(unix))]
    return Err(ApiError::BadRequest(
        "Plugin installation via symlink is only supported on Unix systems".into(),
    ));

    // Read metadata from newly linked plugin
    let mut description: Option<String> = None;
    let mut version: Option<String> = None;

    let manifest_path = target_path.join("manifest.json");
    let package_path = target_path.join("package.json");

    if let Ok(content) = tokio::fs::read_to_string(&manifest_path).await {
        if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&content) {
            description = parsed
                .get("description")
                .and_then(|v| v.as_str())
                .map(String::from);
            version = parsed
                .get("version")
                .and_then(|v| v.as_str())
                .map(String::from);
        }
    } else if let Ok(content) = tokio::fs::read_to_string(&package_path).await {
        if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&content) {
            description = parsed
                .get("description")
                .and_then(|v| v.as_str())
                .map(String::from);
            version = parsed
                .get("version")
                .and_then(|v| v.as_str())
                .map(String::from);
        }
    }

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "plugin.installed",
        serde_json::json!({"name": &plugin_name, "path": &req.path}),
    );

    audit::log_audit(&state.claude_home, "install", "plugin", &plugin_name, None).await;

    Ok(Json(PluginInfo {
        name: plugin_name,
        path: target_path.to_string_lossy().to_string(),
        description,
        version,
        enabled: true,
        source: "global".to_string(),
    }))
}

pub async fn delete_plugin(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    validate_resource_name(&name, "Plugin")?;

    let plugin_path = state.claude_home.join("plugins").join(&name);

    if !tokio::fs::try_exists(&plugin_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!("Plugin '{}' not found", name)));
    }

    // Check if it's a symlink - remove the symlink, not the target
    let metadata = tokio::fs::symlink_metadata(&plugin_path).await?;
    if metadata.file_type().is_symlink() {
        tokio::fs::remove_file(&plugin_path).await?;
    } else {
        tokio::fs::remove_dir_all(&plugin_path).await?;
    }

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "plugin.deleted",
        serde_json::json!({"name": &name}),
    );

    audit::log_audit(&state.claude_home, "delete", "plugin", &name, None).await;

    Ok(Json(serde_json::json!({"deleted": name})))
}
