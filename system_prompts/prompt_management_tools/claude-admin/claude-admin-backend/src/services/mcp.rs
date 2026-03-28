use std::collections::HashMap;
use std::path::Path;
use std::time::Instant;

use claude_admin_shared::*;

use crate::domain::errors::ApiError;
use crate::services::file_ops;

// ─────────────────────────────────────────────
// Multi-source helpers
// ─────────────────────────────────────────────

/// Read `mcpServers` from an arbitrary JSON file and tag each entry with `source`.
async fn read_servers_from_file(
    path: &Path,
    source: &str,
) -> Vec<(String, serde_json::Value, String)> {
    let content = match tokio::fs::read_to_string(path).await {
        Ok(c) => c,
        Err(_) => return vec![],
    };
    let root: serde_json::Value = match serde_json::from_str(&content) {
        Ok(v) => v,
        Err(_) => return vec![],
    };
    let servers = root
        .get("mcpServers")
        .and_then(|v| v.as_object())
        .cloned()
        .unwrap_or_default();
    servers
        .into_iter()
        .map(|(name, config)| (name, config, source.to_string()))
        .collect()
}

/// Aggregate MCP servers from all 3 sources:
/// 1. `~/.claude.json` → "claude_code"
/// 2. `~/Library/Application Support/Claude/claude_desktop_config.json` → "claude_desktop"
/// 3. `~/.claude/projects/<encoded>/settings.json` → "project:<name>"
pub async fn aggregate_all_servers(
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
    claude_home: &Path,
) -> Vec<(String, serde_json::Value, String)> {
    let mut all = Vec::new();

    // Source 1: Claude Code global
    all.extend(read_servers_from_file(claude_json_path, "claude_code").await);

    // Source 2: Claude Desktop
    if let Some(desktop_path) = desktop_config_path {
        all.extend(read_servers_from_file(desktop_path, "claude_desktop").await);
    }

    // Source 3: Per-project settings
    let projects_dir = claude_home.join("projects");
    if let Ok(mut dir) = tokio::fs::read_dir(&projects_dir).await {
        while let Ok(Some(entry)) = dir.next_entry().await {
            let settings_path = entry.path().join("settings.json");
            if tokio::fs::try_exists(&settings_path).await.unwrap_or(false) {
                let dir_name = entry.file_name().to_string_lossy().to_string();
                let source = format!("project:{}", dir_name);
                all.extend(read_servers_from_file(&settings_path, &source).await);
            }
        }
    }

    all
}

/// Count all MCP servers across all sources (for dashboard).
pub async fn count_all_servers(
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
    claude_home: &Path,
) -> usize {
    aggregate_all_servers(claude_json_path, desktop_config_path, claude_home)
        .await
        .len()
}

// ─────────────────────────────────────────────
// Reading
// ─────────────────────────────────────────────

/// List all MCP servers from all sources.
pub async fn list_mcp_servers(
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
    claude_home: &Path,
) -> Result<Vec<McpServerDetail>, ApiError> {
    let all = aggregate_all_servers(claude_json_path, desktop_config_path, claude_home).await;
    let mut result: Vec<McpServerDetail> = all
        .into_iter()
        .map(|(name, config, source)| parse_server_detail(&name, &config, &source))
        .collect();
    result.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(result)
}

/// Get a single MCP server by name (searches all sources).
pub async fn get_mcp_server(
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
    claude_home: &Path,
    name: &str,
) -> Result<McpServerDetail, ApiError> {
    let all = aggregate_all_servers(claude_json_path, desktop_config_path, claude_home).await;
    for (n, config, source) in all {
        if n == name {
            return Ok(parse_server_detail(&n, &config, &source));
        }
    }
    Err(ApiError::NotFound(format!(
        "MCP server '{}' not found",
        name
    )))
}

// ─────────────────────────────────────────────
// CRUD (read-modify-write on ~/.claude.json only)
// ─────────────────────────────────────────────

/// Create a new MCP server entry in ~/.claude.json.
/// Checks all sources for name collision.
pub async fn create_mcp_server(
    claude_home: &Path,
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
    name: &str,
    config: serde_json::Value,
) -> Result<McpServerDetail, ApiError> {
    // Check all sources for name collision
    let all = aggregate_all_servers(claude_json_path, desktop_config_path, claude_home).await;
    for (n, _, source) in &all {
        if n == name {
            return Err(ApiError::BadRequest(format!(
                "MCP server '{}' already exists (source: {})",
                name, source
            )));
        }
    }

    read_modify_write_mcp(claude_home, claude_json_path, |servers| {
        servers.insert(name.to_string(), config.clone());
        Ok(())
    })
    .await?;

    Ok(parse_server_detail(name, &config, "claude_code"))
}

/// Update an existing MCP server entry (claude_code only).
pub async fn update_mcp_server(
    claude_home: &Path,
    claude_json_path: &Path,
    name: &str,
    config: serde_json::Value,
) -> Result<McpServerDetail, ApiError> {
    read_modify_write_mcp(claude_home, claude_json_path, |servers| {
        if !servers.contains_key(name) {
            return Err(ApiError::NotFound(format!(
                "MCP server '{}' not found in Claude Code config",
                name
            )));
        }
        servers.insert(name.to_string(), config.clone());
        Ok(())
    })
    .await?;

    Ok(parse_server_detail(name, &config, "claude_code"))
}

/// Delete an MCP server entry (claude_code only).
pub async fn delete_mcp_server(
    claude_home: &Path,
    claude_json_path: &Path,
    name: &str,
) -> Result<(), ApiError> {
    read_modify_write_mcp(claude_home, claude_json_path, |servers| {
        if servers.remove(name).is_none() {
            return Err(ApiError::NotFound(format!(
                "MCP server '{}' not found in Claude Code config",
                name
            )));
        }
        Ok(())
    })
    .await
}

/// Read-modify-write pattern for ~/.claude.json mcpServers.
async fn read_modify_write_mcp<F>(
    claude_home: &Path,
    claude_json_path: &Path,
    modify: F,
) -> Result<(), ApiError>
where
    F: FnOnce(&mut serde_json::Map<String, serde_json::Value>) -> Result<(), ApiError>,
{
    let content = tokio::fs::read_to_string(claude_json_path)
        .await
        .unwrap_or_else(|_| "{}".to_string());

    let mut root: serde_json::Value = serde_json::from_str(&content)?;

    let servers = root
        .as_object_mut()
        .ok_or_else(|| ApiError::BadRequest("~/.claude.json is not a JSON object".into()))?
        .entry("mcpServers")
        .or_insert(serde_json::json!({}));

    let servers_map = servers
        .as_object_mut()
        .ok_or_else(|| ApiError::BadRequest("mcpServers is not a JSON object".into()))?;

    modify(servers_map)?;

    let new_content = serde_json::to_string_pretty(&root)?;
    file_ops::write_with_backup(claude_home, claude_json_path, &new_content).await?;

    Ok(())
}

// ─────────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────────

/// Health check a single MCP server by spawning it and sending JSON-RPC initialize + tools/list.
pub async fn health_check_server(
    name: &str,
    config: &serde_json::Value,
    source: &str,
) -> McpHealthResult {
    let start = Instant::now();

    let command = config
        .get("command")
        .and_then(|v| v.as_str())
        .unwrap_or("")
        .to_string();

    let args: Vec<String> = config
        .get("args")
        .and_then(|v| v.as_array())
        .map(|arr| {
            arr.iter()
                .filter_map(|v| v.as_str().map(|s| s.to_string()))
                .collect()
        })
        .unwrap_or_default();

    let env_vars: HashMap<String, String> = config
        .get("env")
        .and_then(|v| v.as_object())
        .map(|obj| {
            obj.iter()
                .filter_map(|(k, v)| v.as_str().map(|s| (k.clone(), s.to_string())))
                .collect()
        })
        .unwrap_or_default();

    if command.is_empty() {
        return McpHealthResult {
            name: name.to_string(),
            status: McpServerStatus::Error,
            server_info: None,
            tools: vec![],
            duration_ms: start.elapsed().as_millis() as u64,
            error: Some("No command configured".to_string()),
            source: source.to_string(),
            stderr_output: None,
        };
    }

    match tokio::time::timeout(
        std::time::Duration::from_secs(10),
        spawn_and_check(&command, &args, &env_vars),
    )
    .await
    {
        Ok(Ok((server_info, tools, stderr))) => McpHealthResult {
            name: name.to_string(),
            status: McpServerStatus::Running,
            server_info: Some(server_info),
            tools,
            duration_ms: start.elapsed().as_millis() as u64,
            error: None,
            source: source.to_string(),
            stderr_output: if stderr.is_empty() {
                None
            } else {
                Some(stderr)
            },
        },
        Ok(Err(e)) => McpHealthResult {
            name: name.to_string(),
            status: McpServerStatus::Error,
            server_info: None,
            tools: vec![],
            duration_ms: start.elapsed().as_millis() as u64,
            error: Some(e),
            source: source.to_string(),
            stderr_output: None,
        },
        Err(_) => McpHealthResult {
            name: name.to_string(),
            status: McpServerStatus::Timeout,
            server_info: None,
            tools: vec![],
            duration_ms: start.elapsed().as_millis() as u64,
            error: Some("Health check timed out after 10s".to_string()),
            source: source.to_string(),
            stderr_output: None,
        },
    }
}

/// Read lines from the MCP server until we find a JSON-RPC response with the given `id`.
/// Skips empty lines, non-JSON output, and notifications (messages without `id`).
async fn read_jsonrpc_response(
    reader: &mut tokio::io::BufReader<tokio::process::ChildStdout>,
    expected_id: u64,
) -> Result<serde_json::Value, String> {
    use tokio::io::AsyncBufReadExt;

    for _ in 0..50 {
        let mut line = String::new();
        let bytes_read = reader
            .read_line(&mut line)
            .await
            .map_err(|e| format!("Read error: {}", e))?;

        if bytes_read == 0 {
            return Err("Server closed stdout (EOF)".to_string());
        }

        let trimmed = line.trim();
        if trimmed.is_empty() {
            continue;
        }

        let parsed: serde_json::Value = match serde_json::from_str(trimmed) {
            Ok(v) => v,
            Err(_) => continue, // skip non-JSON output (banners, logs)
        };

        // Skip notifications (no "id" field)
        if parsed.get("id").is_none() {
            continue;
        }

        // Check if this is the response we're waiting for
        if parsed.get("id").and_then(|v| v.as_u64()) == Some(expected_id) {
            return Ok(parsed);
        }
    }

    Err("No matching JSON-RPC response after 50 lines".to_string())
}

/// Spawn the MCP process and run JSON-RPC initialize + tools/list.
/// Returns (server_info, tools, stderr_output).
async fn spawn_and_check(
    command: &str,
    args: &[String],
    env_vars: &HashMap<String, String>,
) -> Result<(String, Vec<McpToolInfo>, String), String> {
    use tokio::io::{AsyncReadExt, AsyncWriteExt, BufReader};
    use tokio::process::Command;

    let mut child = Command::new(command)
        .args(args)
        .envs(env_vars)
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
        .map_err(|e| format!("Failed to spawn '{}': {}", command, e))?;

    let stdin = child.stdin.as_mut().ok_or("No stdin")?;
    let stdout = child.stdout.take().ok_or("No stdout")?;
    let mut reader = BufReader::new(stdout);

    // Send JSON-RPC initialize request
    let init_request = serde_json::json!({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {
                "name": "claude-admin",
                "version": "0.1.0"
            }
        }
    });

    let msg = serde_json::to_string(&init_request).unwrap();
    stdin
        .write_all(msg.as_bytes())
        .await
        .map_err(|e| format!("Write error: {}", e))?;
    stdin
        .write_all(b"\n")
        .await
        .map_err(|e| format!("Write error: {}", e))?;
    stdin
        .flush()
        .await
        .map_err(|e| format!("Flush error: {}", e))?;

    // Read initialize response (skip empty lines, notifications, non-JSON)
    let init_resp = read_jsonrpc_response(&mut reader, 1).await?;

    let server_info = init_resp
        .pointer("/result/serverInfo/name")
        .and_then(|v| v.as_str())
        .unwrap_or("unknown")
        .to_string();

    // Send initialized notification
    let initialized = serde_json::json!({
        "jsonrpc": "2.0",
        "method": "notifications/initialized"
    });
    let msg2 = serde_json::to_string(&initialized).unwrap();
    let stdin = child.stdin.as_mut().ok_or("No stdin")?;
    stdin
        .write_all(msg2.as_bytes())
        .await
        .map_err(|e| format!("Write error: {}", e))?;
    stdin
        .write_all(b"\n")
        .await
        .map_err(|e| format!("Write error: {}", e))?;
    stdin
        .flush()
        .await
        .map_err(|e| format!("Flush error: {}", e))?;

    // Send tools/list request
    let tools_request = serde_json::json!({
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/list",
        "params": {}
    });
    let msg3 = serde_json::to_string(&tools_request).unwrap();
    let stdin = child.stdin.as_mut().ok_or("No stdin")?;
    stdin
        .write_all(msg3.as_bytes())
        .await
        .map_err(|e| format!("Write error: {}", e))?;
    stdin
        .write_all(b"\n")
        .await
        .map_err(|e| format!("Write error: {}", e))?;
    stdin
        .flush()
        .await
        .map_err(|e| format!("Flush error: {}", e))?;

    // Read tools/list response (skip empty lines, notifications, non-JSON)
    let tools_resp = read_jsonrpc_response(&mut reader, 2).await?;

    let tools = tools_resp
        .pointer("/result/tools")
        .and_then(|v| v.as_array())
        .map(|arr| {
            arr.iter()
                .map(|t| McpToolInfo {
                    name: t
                        .get("name")
                        .and_then(|v| v.as_str())
                        .unwrap_or("unknown")
                        .to_string(),
                    description: t
                        .get("description")
                        .and_then(|v| v.as_str())
                        .map(String::from),
                    input_schema: t.get("inputSchema").cloned(),
                })
                .collect()
        })
        .unwrap_or_default();

    // Read stderr with short timeout (don't block if empty)
    let mut stderr_output = String::new();
    if let Some(mut stderr) = child.stderr.take() {
        let mut buf = vec![0u8; 4096];
        if let Ok(Ok(n)) =
            tokio::time::timeout(std::time::Duration::from_millis(500), stderr.read(&mut buf)).await
        {
            stderr_output = String::from_utf8_lossy(&buf[..n]).to_string();
        }
    }

    // Clean up: kill the process
    let _ = child.kill().await;

    Ok((server_info, tools, stderr_output))
}

/// Health check all configured MCP servers in parallel (all sources).
pub async fn health_check_all(
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
    claude_home: &Path,
) -> Result<Vec<McpHealthResult>, ApiError> {
    let all = aggregate_all_servers(claude_json_path, desktop_config_path, claude_home).await;

    let futures: Vec<_> =
        all.into_iter()
            .map(|(name, config, source)| async move {
                health_check_server(&name, &config, &source).await
            })
            .collect();

    let results = futures::future::join_all(futures).await;
    Ok(results)
}

// ─────────────────────────────────────────────
// Catalog
// ─────────────────────────────────────────────

/// Curated catalog of popular MCP servers.
pub async fn get_mcp_catalog(
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
    claude_home: &Path,
) -> Result<Vec<BrowsableMcpServer>, ApiError> {
    let all = aggregate_all_servers(claude_json_path, desktop_config_path, claude_home).await;
    let installed_names: Vec<String> = all.into_iter().map(|(name, _, _)| name).collect();

    let catalog = vec![
        // System & Files
        (
            "filesystem",
            "Secure file system access — read, write, search, and manage files within allowed directories",
            "system",
            "@modelcontextprotocol/server-filesystem",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
            }),
        ),
        (
            "desktop-commander",
            "Desktop automation — execute commands, manage processes, read/write files, and diff editing",
            "system",
            "@wonderwhy-er/desktop-commander",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@wonderwhy-er/desktop-commander@latest"]
            }),
        ),
        (
            "fetch",
            "Web content fetching — retrieve and convert web pages to markdown for AI consumption",
            "system",
            "@modelcontextprotocol/server-fetch",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-fetch"]
            }),
        ),
        // Databases
        (
            "postgres",
            "PostgreSQL database access — query, schema inspection, and data management",
            "database",
            "@modelcontextprotocol/server-postgres",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-postgres"],
                "env": { "POSTGRES_URL": "postgresql://localhost:5432/mydb" }
            }),
        ),
        (
            "sqlite",
            "SQLite database access — lightweight local database queries",
            "database",
            "@modelcontextprotocol/server-sqlite",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data.db"]
            }),
        ),
        // APIs
        (
            "github",
            "GitHub API integration — repos, issues, pull requests, and more",
            "api",
            "@modelcontextprotocol/server-github",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-github"],
                "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "" }
            }),
        ),
        (
            "slack",
            "Slack workspace integration — channels, messages, and users",
            "api",
            "@modelcontextprotocol/server-slack",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-slack"],
                "env": { "SLACK_BOT_TOKEN": "", "SLACK_TEAM_ID": "" }
            }),
        ),
        (
            "linear",
            "Linear project management — issues, projects, and teams",
            "api",
            "@modelcontextprotocol/server-linear",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-linear"],
                "env": { "LINEAR_API_KEY": "" }
            }),
        ),
        // Specialized
        (
            "memory",
            "Persistent memory for Claude — store and retrieve knowledge across sessions",
            "specialized",
            "@modelcontextprotocol/server-memory",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-memory"]
            }),
        ),
        (
            "sequential-thinking",
            "Enhanced reasoning with step-by-step thinking process",
            "specialized",
            "@modelcontextprotocol/server-sequential-thinking",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
            }),
        ),
        (
            "brave-search",
            "Web search powered by Brave Search API",
            "specialized",
            "@modelcontextprotocol/server-brave-search",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-brave-search"],
                "env": { "BRAVE_API_KEY": "" }
            }),
        ),
        (
            "puppeteer",
            "Browser automation — navigate, screenshot, and interact with web pages",
            "specialized",
            "@modelcontextprotocol/server-puppeteer",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
            }),
        ),
        (
            "sentry",
            "Sentry error tracking — view and analyze application errors",
            "specialized",
            "@modelcontextprotocol/server-sentry",
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-sentry"],
                "env": { "SENTRY_AUTH_TOKEN": "", "SENTRY_ORG": "" }
            }),
        ),
    ];

    let mut result = Vec::new();
    for (name, desc, cat, npm, default_config) in catalog {
        result.push(BrowsableMcpServer {
            name: name.to_string(),
            description: desc.to_string(),
            category: cat.to_string(),
            npm_package: npm.to_string(),
            default_config,
            installed: installed_names.contains(&name.to_string()),
        });
    }

    Ok(result)
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/// Parse a server config JSON value into McpServerDetail.
fn parse_server_detail(name: &str, config: &serde_json::Value, source: &str) -> McpServerDetail {
    let command = config
        .get("command")
        .and_then(|v| v.as_str())
        .unwrap_or("")
        .to_string();

    let args = config
        .get("args")
        .and_then(|v| v.as_array())
        .map(|arr| {
            arr.iter()
                .filter_map(|v| v.as_str().map(|s| s.to_string()))
                .collect()
        })
        .unwrap_or_default();

    let env = config
        .get("env")
        .and_then(|v| v.as_object())
        .map(|obj| {
            obj.iter()
                .filter_map(|(k, v)| v.as_str().map(|s| (k.clone(), s.to_string())))
                .collect()
        })
        .unwrap_or_default();

    McpServerDetail {
        name: name.to_string(),
        command,
        args,
        env,
        raw_config: config.clone(),
        source: source.to_string(),
    }
}
