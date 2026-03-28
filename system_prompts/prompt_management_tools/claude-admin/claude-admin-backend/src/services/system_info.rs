use std::path::Path;

use crate::domain::errors::ApiError;
use claude_admin_shared::*;

/// Get system info from ~/.claude.json and system commands.
pub fn get_system_info(
    _claude_home: &Path,
    claude_json_path: &Path,
) -> Result<SystemInfo, ApiError> {
    let json_content = std::fs::read_to_string(claude_json_path).unwrap_or_default();
    let json: serde_json::Value = serde_json::from_str(&json_content).unwrap_or_default();

    // Extract account info
    let account = json.get("oauthAccount");
    let account_name = account
        .and_then(|a| a.get("name"))
        .and_then(|v| v.as_str())
        .map(|s| s.to_string());
    let account_email = account
        .and_then(|a| a.get("emailAddress"))
        .and_then(|v| v.as_str())
        .map(|s| s.to_string());
    let subscription_type = account
        .and_then(|a| a.get("subscriptionType"))
        .and_then(|v| v.as_str())
        .map(|s| s.to_string());

    // Claude Code version
    let claude_code_version = std::process::Command::new("claude")
        .arg("--version")
        .output()
        .ok()
        .and_then(|o| String::from_utf8(o.stdout).ok())
        .map(|s| s.trim().to_string());

    // gh CLI status
    let gh_cli_status = std::process::Command::new("gh")
        .args(["auth", "status"])
        .output()
        .ok()
        .map(|o| {
            let stdout = String::from_utf8_lossy(&o.stdout);
            let stderr = String::from_utf8_lossy(&o.stderr);
            if o.status.success() {
                format!("Authenticated: {}", stdout.trim())
            } else {
                format!("Not authenticated: {}", stderr.trim())
            }
        });

    // Skill usage
    let skill_usage: Vec<(String, u64)> = json
        .get("skillUsage")
        .and_then(|v| v.as_object())
        .map(|obj| {
            let mut v: Vec<(String, u64)> = obj
                .iter()
                .map(|(k, v)| (k.clone(), v.as_u64().unwrap_or(0)))
                .collect();
            v.sort_by(|a, b| b.1.cmp(&a.1));
            v
        })
        .unwrap_or_default();

    Ok(SystemInfo {
        account_name,
        account_email,
        subscription_type,
        claude_code_version,
        gh_cli_status,
        skill_usage,
    })
}

/// Calculate storage usage under ~/.claude/.
pub fn get_storage_info(claude_home: &Path) -> Result<StorageInfo, ApiError> {
    let dirs_to_check = [
        "backups",
        "usage-data",
        "projects",
        "skills",
        "rules",
        "plans",
        "memory",
    ];

    let mut directories = Vec::new();
    let mut total_bytes: u64 = 0;

    for dir_name in &dirs_to_check {
        let dir_path = claude_home.join(dir_name);
        if dir_path.exists() {
            let bytes = dir_size(&dir_path);
            total_bytes += bytes;
            directories.push(StorageDirectory {
                name: dir_name.to_string(),
                bytes,
            });
        }
    }

    directories.sort_by(|a, b| b.bytes.cmp(&a.bytes));

    Ok(StorageInfo {
        total_bytes,
        directories,
    })
}

fn dir_size(path: &Path) -> u64 {
    let mut total: u64 = 0;
    if let Ok(entries) = std::fs::read_dir(path) {
        for entry in entries.flatten() {
            let p = entry.path();
            if p.is_file() {
                total += p.metadata().map(|m| m.len()).unwrap_or(0);
            } else if p.is_dir() {
                total += dir_size(&p);
            }
        }
    }
    total
}
