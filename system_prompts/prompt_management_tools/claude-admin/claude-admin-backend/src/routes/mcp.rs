use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::domain::validation::validate_resource_name;
use crate::services::mcp;
use claude_admin_shared::*;

/// GET /api/v1/mcp — List all MCP servers (all sources).
pub async fn list_mcp_servers(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<McpServerDetail>>, ApiError> {
    let servers = mcp::list_mcp_servers(
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        &state.claude_home,
    )
    .await?;
    Ok(Json(servers))
}

/// POST /api/v1/mcp — Create a new MCP server (in ~/.claude.json).
pub async fn create_mcp_server(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<McpServerCreateRequest>,
) -> Result<Json<McpServerDetail>, ApiError> {
    validate_resource_name(&req.name, "MCP server")?;
    let detail = mcp::create_mcp_server(
        &state.claude_home,
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        &req.name,
        req.config,
    )
    .await?;
    Ok(Json(detail))
}

/// GET /api/v1/mcp/health — Health check all servers (all sources).
pub async fn health_check_all(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<McpHealthResult>>, ApiError> {
    let results = mcp::health_check_all(
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        &state.claude_home,
    )
    .await?;
    Ok(Json(results))
}

/// GET /api/v1/mcp/:name — Get a single MCP server (any source).
pub async fn get_mcp_server(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<McpServerDetail>, ApiError> {
    validate_resource_name(&name, "MCP server")?;
    let detail = mcp::get_mcp_server(
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        &state.claude_home,
        &name,
    )
    .await?;
    Ok(Json(detail))
}

/// PUT /api/v1/mcp/:name — Update a server's config (claude_code only).
pub async fn update_mcp_server(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
    AppJson(req): AppJson<McpServerUpdateRequest>,
) -> Result<Json<McpServerDetail>, ApiError> {
    validate_resource_name(&name, "MCP server")?;
    let detail = mcp::update_mcp_server(
        &state.claude_home,
        &state.claude_json_path,
        &name,
        req.config,
    )
    .await?;
    Ok(Json(detail))
}

/// DELETE /api/v1/mcp/:name — Delete a server (claude_code only).
pub async fn delete_mcp_server(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    validate_resource_name(&name, "MCP server")?;
    mcp::delete_mcp_server(&state.claude_home, &state.claude_json_path, &name).await?;
    Ok(Json(
        serde_json::json!({ "status": "deleted", "name": name }),
    ))
}

/// GET /api/v1/mcp/:name/health — Health check a single server.
pub async fn health_check_server(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<McpHealthResult>, ApiError> {
    validate_resource_name(&name, "MCP server")?;
    let detail = mcp::get_mcp_server(
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        &state.claude_home,
        &name,
    )
    .await?;
    let result = mcp::health_check_server(&name, &detail.raw_config, &detail.source).await;
    Ok(Json(result))
}

/// GET /api/v1/mcp-browser — Get catalog of browsable MCP servers.
pub async fn get_mcp_catalog(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<BrowsableMcpServer>>, ApiError> {
    let catalog = mcp::get_mcp_catalog(
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        &state.claude_home,
    )
    .await?;
    Ok(Json(catalog))
}

/// POST /api/v1/mcp-browser/install — Install an MCP server from the catalog.
pub async fn install_mcp_server(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<McpInstallRequest>,
) -> Result<Json<McpServerDetail>, ApiError> {
    validate_resource_name(&req.name, "MCP server")?;
    let detail = mcp::create_mcp_server(
        &state.claude_home,
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        &req.name,
        req.config,
    )
    .await?;
    Ok(Json(detail))
}
