use axum::extract::State;
use axum::Json;
use std::sync::Arc;
use std::time::Duration;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use claude_admin_shared::*;

/// Default timeout for CLI commands.
const CLI_TIMEOUT: Duration = Duration::from_secs(10);

pub async fn get_system_status(
    State(_state): State<Arc<AppState>>,
) -> Result<Json<SystemStatus>, ApiError> {
    let (auth, update, ide) = tokio::join!(
        fetch_auth_status(),
        fetch_update_status(),
        fetch_ide_status()
    );

    Ok(Json(SystemStatus { auth, update, ide }))
}

pub async fn get_auth_status() -> Result<Json<AuthStatus>, ApiError> {
    let status = fetch_auth_status().await;
    Ok(Json(status))
}

pub async fn get_update_status() -> Result<Json<UpdateStatus>, ApiError> {
    let status = fetch_update_status().await;
    Ok(Json(status))
}

pub async fn get_doctor_result() -> Result<Json<DoctorResult>, ApiError> {
    let result = fetch_doctor_result().await;
    Ok(Json(result))
}

pub async fn get_ide_status() -> Result<Json<IdeStatus>, ApiError> {
    let status = fetch_ide_status().await;
    Ok(Json(status))
}

/// Run `claude auth status` and parse output.
async fn fetch_auth_status() -> AuthStatus {
    let output = run_claude_command(&["auth", "status"]).await;

    match output {
        Some(stdout) => parse_auth_output(&stdout),
        None => AuthStatus {
            authenticated: false,
            auth_method: None,
            account_name: None,
            account_email: None,
            subscription_type: None,
            expires_at: None,
        },
    }
}

/// Run `claude --version` to get current version and check for updates.
async fn fetch_update_status() -> UpdateStatus {
    let version = match run_claude_command(&["--version"]).await {
        Some(stdout) => {
            // Output is typically "claude <version>" or just the version
            let trimmed = stdout.trim().to_string();
            // Extract version from output like "claude 1.2.3" or just "1.2.3"
            if let Some(ver) = trimmed.strip_prefix("claude ") {
                ver.trim().to_string()
            } else {
                trimmed
            }
        }
        None => "unknown".to_string(),
    };

    // Check for update by running `claude update --check` or similar
    let (latest_version, update_available) = match run_claude_command(&["update", "--check"]).await
    {
        Some(stdout) => {
            let trimmed = stdout.trim();
            if trimmed.contains("up to date") || trimmed.contains("already") {
                (Some(version.clone()), false)
            } else {
                // Try to extract version from update output
                let latest =
                    extract_version_from_output(trimmed).unwrap_or_else(|| trimmed.to_string());
                (Some(latest), true)
            }
        }
        None => (None, false),
    };

    UpdateStatus {
        current_version: version,
        latest_version,
        update_available,
        auto_updater_healthy: true,
        last_check: Some(chrono::Utc::now().to_rfc3339()),
    }
}

/// Run `claude doctor` and parse output into DoctorResult.
async fn fetch_doctor_result() -> DoctorResult {
    let output = run_claude_command(&["doctor"]).await;

    match output {
        Some(stdout) => parse_doctor_output(&stdout),
        None => DoctorResult {
            checks: vec![DoctorCheck {
                name: "CLI Access".to_string(),
                status: "error".to_string(),
                message: "Could not run 'claude doctor' command".to_string(),
            }],
            overall_healthy: false,
        },
    }
}

/// Check for IDE connections and Chrome extension status.
async fn fetch_ide_status() -> IdeStatus {
    let mut connections = Vec::new();

    // Check VS Code / Cursor by looking for their socket files or processes
    let vscode_available = check_process_running("code").await;
    connections.push(IdeConnection {
        name: "Visual Studio Code".to_string(),
        ide_type: "vscode".to_string(),
        status: if vscode_available {
            "available".to_string()
        } else {
            "unavailable".to_string()
        },
    });

    let cursor_available = check_process_running("cursor").await;
    connections.push(IdeConnection {
        name: "Cursor".to_string(),
        ide_type: "cursor".to_string(),
        status: if cursor_available {
            "available".to_string()
        } else {
            "unavailable".to_string()
        },
    });

    // Check JetBrains IDEs
    let jetbrains_available = check_process_running("idea").await;
    connections.push(IdeConnection {
        name: "JetBrains".to_string(),
        ide_type: "jetbrains".to_string(),
        status: if jetbrains_available {
            "available".to_string()
        } else {
            "unavailable".to_string()
        },
    });

    // Check Chrome extension by looking for its config
    let chrome_enabled = check_chrome_extension().await;

    IdeStatus {
        connected_ides: connections,
        chrome_enabled,
    }
}

/// Run a claude CLI command with timeout. Returns stdout on success, None on failure.
async fn run_claude_command(args: &[&str]) -> Option<String> {
    let result = tokio::time::timeout(
        CLI_TIMEOUT,
        tokio::process::Command::new("claude")
            .args(args)
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::piped())
            .output(),
    )
    .await;

    match result {
        Ok(Ok(output)) if output.status.success() => {
            Some(String::from_utf8_lossy(&output.stdout).to_string())
        }
        Ok(Ok(output)) => {
            // Command ran but failed - still return stdout if there's content
            let stdout = String::from_utf8_lossy(&output.stdout).to_string();
            if stdout.trim().is_empty() {
                None
            } else {
                Some(stdout)
            }
        }
        _ => None,
    }
}

/// Parse `claude auth status` output.
fn parse_auth_output(output: &str) -> AuthStatus {
    let lines: Vec<&str> = output.lines().collect();
    let full = output.to_lowercase();

    let authenticated =
        !full.contains("not authenticated") && !full.contains("not logged in") && !full.is_empty();

    let auth_method = if full.contains("oauth") {
        Some("oauth".to_string())
    } else if full.contains("api_key") || full.contains("api key") {
        Some("api_key".to_string())
    } else if full.contains("token") {
        Some("token".to_string())
    } else if authenticated {
        Some("unknown".to_string())
    } else {
        None
    };

    let account_name = extract_field(&lines, &["account", "name", "user"]);
    let account_email = extract_field(&lines, &["email"]);
    let subscription_type = extract_field(&lines, &["plan", "subscription", "tier"]);
    let expires_at = extract_field(&lines, &["expires", "expiry"]);

    AuthStatus {
        authenticated,
        auth_method,
        account_name,
        account_email,
        subscription_type,
        expires_at,
    }
}

/// Parse `claude doctor` output into structured checks.
fn parse_doctor_output(output: &str) -> DoctorResult {
    let mut checks = Vec::new();
    let mut overall_healthy = true;

    for line in output.lines() {
        let trimmed = line.trim();
        if trimmed.is_empty() {
            continue;
        }

        let (status, message) = if trimmed.starts_with("[ok]")
            || trimmed.starts_with("[OK]")
            || trimmed.contains("PASS")
            || trimmed.starts_with('\u{2713}')
        {
            ("ok".to_string(), strip_status_prefix(trimmed))
        } else if trimmed.starts_with("[warn")
            || trimmed.contains("WARN")
            || trimmed.starts_with('\u{26A0}')
        {
            ("warning".to_string(), strip_status_prefix(trimmed))
        } else if trimmed.starts_with("[error")
            || trimmed.starts_with("[FAIL")
            || trimmed.contains("ERROR")
            || trimmed.starts_with('\u{2717}')
        {
            overall_healthy = false;
            ("error".to_string(), strip_status_prefix(trimmed))
        } else {
            continue;
        };

        let name = message
            .split(':')
            .next()
            .unwrap_or(&message)
            .trim()
            .to_string();

        checks.push(DoctorCheck {
            name,
            status,
            message,
        });
    }

    // If we didn't parse any checks, create a generic one
    if checks.is_empty() && !output.trim().is_empty() {
        checks.push(DoctorCheck {
            name: "Doctor Output".to_string(),
            status: "ok".to_string(),
            message: output.trim().to_string(),
        });
    }

    DoctorResult {
        checks,
        overall_healthy,
    }
}

/// Extract a field value from CLI output lines by matching keywords.
fn extract_field(lines: &[&str], keywords: &[&str]) -> Option<String> {
    for line in lines {
        let lower = line.to_lowercase();
        for keyword in keywords {
            if lower.contains(keyword) {
                // Try to extract value after ":" or "="
                if let Some(pos) = line.find(':') {
                    let value = line[pos + 1..].trim();
                    if !value.is_empty() {
                        return Some(value.to_string());
                    }
                }
                if let Some(pos) = line.find('=') {
                    let value = line[pos + 1..].trim();
                    if !value.is_empty() {
                        return Some(value.to_string());
                    }
                }
            }
        }
    }
    None
}

/// Strip status prefixes like "[ok]", "[error]", checkmarks, etc.
fn strip_status_prefix(s: &str) -> String {
    let trimmed = s.trim();
    // Strip bracketed prefixes
    if let Some(rest) = trimmed.strip_prefix('[') {
        if let Some(pos) = rest.find(']') {
            return rest[pos + 1..].trim().to_string();
        }
    }
    // Strip unicode checkmarks/crosses
    let stripped = trimmed
        .trim_start_matches('\u{2713}')
        .trim_start_matches('\u{2717}')
        .trim_start_matches('\u{26A0}')
        .trim();
    stripped.to_string()
}

/// Try to extract a semver-like version string from output.
fn extract_version_from_output(output: &str) -> Option<String> {
    for word in output.split_whitespace() {
        // Match patterns like "1.2.3" or "v1.2.3"
        let candidate = word.trim_start_matches('v');
        let parts: Vec<&str> = candidate.split('.').collect();
        if parts.len() >= 2 && parts.iter().all(|p| p.chars().all(|c| c.is_ascii_digit())) {
            return Some(candidate.to_string());
        }
    }
    None
}

/// Check if a process is running by name using pgrep.
async fn check_process_running(name: &str) -> bool {
    let result = tokio::time::timeout(
        Duration::from_secs(3),
        tokio::process::Command::new("pgrep")
            .args(["-x", name])
            .stdout(std::process::Stdio::null())
            .stderr(std::process::Stdio::null())
            .status(),
    )
    .await;

    matches!(result, Ok(Ok(status)) if status.success())
}

/// Check if the Chrome extension configuration exists.
async fn check_chrome_extension() -> bool {
    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
    // Check for Claude Chrome extension native messaging host manifest
    let manifest_path = std::path::Path::new(&home).join(
        "Library/Application Support/Google/Chrome/NativeMessagingHosts/com.anthropic.claude.json",
    );
    tokio::fs::try_exists(&manifest_path).await.unwrap_or(false)
}
