use std::path::Path;

use crate::domain::errors::ApiError;
use crate::services::project_resolver;
use claude_admin_shared::*;

/// Scan all projects and return permission summaries.
pub async fn scan_all_permissions(
    claude_home: &Path,
    claude_json_path: &Path,
) -> Result<Vec<ProjectPermissionSummary>, ApiError> {
    let projects =
        crate::services::fs_scanner::scan_projects(claude_home, claude_json_path).await?;
    let mut summaries = Vec::new();

    for project in &projects {
        let project_path = Path::new(&project.path);
        let settings_local = project_path.join(".claude").join("settings.local.json");

        if !tokio::fs::try_exists(&settings_local)
            .await
            .unwrap_or(false)
        {
            continue;
        }

        let content = match tokio::fs::read_to_string(&settings_local).await {
            Ok(c) => c,
            Err(_) => continue,
        };

        let json: serde_json::Value = match serde_json::from_str(&content) {
            Ok(v) => v,
            Err(_) => continue,
        };

        let entries = extract_permission_entries(&json);
        let security_issues = entries
            .iter()
            .filter(|e| e.security_issue.is_some())
            .count();
        let fragmented = entries.iter().filter(|e| e.is_fragmented).count();

        summaries.push(ProjectPermissionSummary {
            project_id: project.encoded_path.clone(),
            project_name: project.name.clone(),
            path: project.path.clone(),
            total_entries: entries.len(),
            security_issues,
            fragmented_entries: fragmented,
        });
    }

    summaries.sort_by(|a, b| b.total_entries.cmp(&a.total_entries));
    Ok(summaries)
}

/// Get detailed permissions for a specific project.
pub async fn scan_project_permissions(project_path: &str) -> Result<ProjectPermissions, ApiError> {
    let project_fs = Path::new(project_path);
    let settings_local = project_fs.join(".claude").join("settings.local.json");

    let project_id = project_resolver::encode_project_id(project_path);

    if !tokio::fs::try_exists(&settings_local)
        .await
        .unwrap_or(false)
    {
        return Ok(ProjectPermissions {
            project_id,
            entries: vec![],
            security_warnings: vec![],
        });
    }

    let content = tokio::fs::read_to_string(&settings_local).await?;
    let json: serde_json::Value = serde_json::from_str(&content)?;

    let entries = extract_permission_entries(&json);
    let security_warnings: Vec<SecurityWarning> = entries
        .iter()
        .filter_map(|e| {
            e.security_issue.as_ref().map(|msg| SecurityWarning {
                index: e.index,
                severity: if msg.contains("password")
                    || msg.contains("secret")
                    || msg.contains("token")
                {
                    "high".to_string()
                } else {
                    "medium".to_string()
                },
                message: msg.clone(),
            })
        })
        .collect();

    Ok(ProjectPermissions {
        project_id,
        entries,
        security_warnings,
    })
}

/// Remove permission entries at given indices from a project's settings.local.json.
pub async fn remove_permissions(
    claude_home: &Path,
    project_path: &str,
    indices: &[usize],
) -> Result<(), ApiError> {
    let project_fs = Path::new(project_path);
    let settings_local = project_fs.join(".claude").join("settings.local.json");

    if !tokio::fs::try_exists(&settings_local)
        .await
        .unwrap_or(false)
    {
        return Err(ApiError::NotFound(
            "settings.local.json not found".to_string(),
        ));
    }

    let content = tokio::fs::read_to_string(&settings_local).await?;
    let mut json: serde_json::Value = serde_json::from_str(&content)?;

    // Get the allow array
    let allow = json
        .pointer_mut("/permissions/allow")
        .and_then(|v| v.as_array_mut());

    if let Some(allow_arr) = allow {
        // Remove indices in reverse order to maintain correct positions
        let mut sorted_indices: Vec<usize> = indices.to_vec();
        sorted_indices.sort_unstable();
        sorted_indices.dedup();
        for &idx in sorted_indices.iter().rev() {
            if idx < allow_arr.len() {
                allow_arr.remove(idx);
            }
        }
    }

    let new_content = serde_json::to_string_pretty(&json)?;
    crate::services::file_ops::write_with_backup(claude_home, &settings_local, &new_content)
        .await?;

    Ok(())
}

/// Extract permission entries from a settings.local.json value.
fn extract_permission_entries(json: &serde_json::Value) -> Vec<PermissionEntry> {
    let allow = match json.pointer("/permissions/allow") {
        Some(v) => v,
        None => return vec![],
    };

    let arr = match allow.as_array() {
        Some(a) => a,
        None => return vec![],
    };

    let mut entries = Vec::new();

    for (i, item) in arr.iter().enumerate() {
        let (tool, command) = if let Some(s) = item.as_str() {
            // Simple string entries like "Bash(npm run dev)"
            parse_permission_string(s)
        } else if let Some(obj) = item.as_object() {
            let tool = obj
                .get("tool")
                .and_then(|v| v.as_str())
                .unwrap_or("unknown")
                .to_string();
            let cmd = obj
                .get("command")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();
            (tool, cmd)
        } else {
            ("unknown".to_string(), item.to_string())
        };

        let is_fragmented = detect_fragment(&command);
        let security_issue = detect_security_issue(&command);

        entries.push(PermissionEntry {
            index: i,
            tool,
            command,
            is_fragmented,
            security_issue,
        });
    }

    entries
}

/// Parse a permission string like "Bash(npm run dev)" into (tool, command).
fn parse_permission_string(s: &str) -> (String, String) {
    if let Some(paren_start) = s.find('(') {
        if s.ends_with(')') {
            let tool = s[..paren_start].to_string();
            let command = s[paren_start + 1..s.len() - 1].to_string();
            return (tool, command);
        }
    }
    ("unknown".to_string(), s.to_string())
}

/// Detect if a command is a fragment of a multi-line bash script.
fn detect_fragment(command: &str) -> bool {
    let trimmed = command.trim();
    let fragments = [
        "do", "done", "fi", "else", "elif", "then", "esac", ";;", "in",
    ];
    fragments.contains(&trimmed)
}

/// Detect security issues in a permission command.
fn detect_security_issue(command: &str) -> Option<String> {
    // Plaintext passwords
    let password_patterns = [
        (
            r"--password[= ]\S+",
            "Possible plaintext password in command",
        ),
        (r"password=\S+", "Plaintext password in command"),
        (r"secret=\S+", "Plaintext secret in command"),
        (r"token=\S+", "Plaintext token in command"),
        (
            r"PASSWORD=\S+",
            "Plaintext password in environment variable",
        ),
        (r"SECRET=\S+", "Plaintext secret in environment variable"),
        (r"TOKEN=\S+", "Plaintext token in environment variable"),
        (r"API_KEY=\S+", "Plaintext API key in command"),
    ];

    for (pattern, msg) in &password_patterns {
        if simple_regex_match(command, pattern) {
            return Some(msg.to_string());
        }
    }

    // Dangerous commands
    let dangerous = [
        ("rm -rf /", "Dangerous recursive delete from root"),
        ("rm -rf ~", "Dangerous recursive delete of home directory"),
        ("sudo rm", "Sudo delete command"),
        ("DROP TABLE", "SQL DROP TABLE command"),
        ("DROP DATABASE", "SQL DROP DATABASE command"),
        ("chmod 777", "Overly permissive file permissions"),
    ];

    for (pattern, msg) in &dangerous {
        if command.contains(pattern) {
            return Some(msg.to_string());
        }
    }

    None
}

/// Analyze permission entries and suggest consolidation optimizations.
pub fn optimize_permissions(perms: &ProjectPermissions) -> Vec<PermissionOptimization> {
    let mut optimizations = Vec::new();

    // Group entries by tool prefix
    let mut tool_groups: std::collections::HashMap<String, Vec<&PermissionEntry>> =
        std::collections::HashMap::new();
    for entry in &perms.entries {
        let tool = entry.tool.clone();
        tool_groups.entry(tool).or_default().push(entry);
    }

    for (tool, entries) in &tool_groups {
        if entries.len() < 3 {
            continue;
        }

        // Check if commands share common prefixes
        let commands: Vec<&str> = entries.iter().map(|e| e.command.as_str()).collect();

        // Find common prefix
        if let Some(first) = commands.first() {
            let first_word = first.split_whitespace().next().unwrap_or("");
            let matching: Vec<&&str> = commands
                .iter()
                .filter(|c| c.starts_with(first_word))
                .collect();

            if matching.len() >= 3 {
                let current: Vec<String> = matching
                    .iter()
                    .map(|c| format!("{}({})", tool, c))
                    .collect();
                let saved = matching.len() - 1;
                optimizations.push(PermissionOptimization {
                    description: format!(
                        "Consolidate {} {} entries starting with '{}'",
                        matching.len(),
                        tool,
                        first_word
                    ),
                    current_entries: current,
                    suggested_entry: format!("{}({}:*)", tool, first_word),
                    entries_saved: saved,
                });
            }
        }
    }

    optimizations
}

/// Simple pattern matching (not full regex, but sufficient for our patterns).
fn simple_regex_match(text: &str, pattern: &str) -> bool {
    // Handle patterns with \s* and \S+
    if pattern.contains(r"\s*") || pattern.contains(r"\S+") {
        // Convert to a simpler check
        let parts: Vec<&str> = pattern.split(r"\S+").collect();
        if parts.len() == 2 {
            let prefix = parts[0].replace(r"\s*", "").replace(r"\s+", " ");
            return text.contains(&prefix);
        }
        let clean = pattern.replace(r"\s*", "").replace(r"\S+", "");
        return text.contains(&clean);
    }
    text.contains(pattern)
}
