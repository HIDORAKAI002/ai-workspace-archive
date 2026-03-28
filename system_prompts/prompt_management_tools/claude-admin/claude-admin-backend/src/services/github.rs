use std::path::Path;

use crate::domain::errors::ApiError;
use claude_admin_shared::*;

/// Get GitHub overview from gh CLI and ~/.claude.json.
pub fn get_github_overview(claude_json_path: &Path) -> Result<GitHubOverview, ApiError> {
    // Check gh auth status
    let auth_output = std::process::Command::new("gh")
        .args(["auth", "status"])
        .output();

    let (auth_status, username) = match auth_output {
        Ok(output) => {
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            let stdout = String::from_utf8_lossy(&output.stdout).to_string();
            let combined = format!("{}{}", stdout, stderr);

            if output.status.success() {
                // Extract username: look for "account" keyword, take next word
                let username = extract_github_username(&combined);
                ("authenticated".to_string(), username)
            } else {
                ("not_authenticated".to_string(), None)
            }
        }
        Err(_) => ("gh_not_installed".to_string(), None),
    };

    // Get linked repos from ~/.claude.json
    let json_content = std::fs::read_to_string(claude_json_path).unwrap_or_default();
    let json: serde_json::Value = serde_json::from_str(&json_content).unwrap_or_default();

    let linked_repos: Vec<GitHubRepo> = json
        .get("githubRepoPaths")
        .and_then(|v| v.as_array())
        .map(|arr| {
            arr.iter()
                .filter_map(|v| v.as_str())
                .map(|path| {
                    let name = Path::new(path)
                        .file_name()
                        .unwrap_or_default()
                        .to_string_lossy()
                        .to_string();

                    GitHubRepo {
                        path: path.to_string(),
                        name,
                        recent_commits: vec![], // Could be fetched on demand
                        open_prs: 0,
                    }
                })
                .collect()
        })
        .unwrap_or_default();

    Ok(GitHubOverview {
        auth_status,
        username,
        linked_repos,
    })
}

/// Extract GitHub username from `gh auth status` output.
/// Looks for the word after "account" to get the username reliably.
fn extract_github_username(output: &str) -> Option<String> {
    for line in output.lines() {
        let lower = line.to_lowercase();
        if lower.contains("account") {
            let words: Vec<&str> = line.split_whitespace().collect();
            for (i, word) in words.iter().enumerate() {
                if word.to_lowercase() == "account" {
                    // Next word is the username
                    if let Some(username) = words.get(i + 1) {
                        let clean = username
                            .trim_matches(|c: char| !c.is_alphanumeric() && c != '-' && c != '_');
                        if !clean.is_empty() {
                            return Some(clean.to_string());
                        }
                    }
                }
            }
        }
        // Also try "Logged in to github.com account <username>"
        if lower.contains("logged in") {
            if let Some(pos) = lower.find("account") {
                let after = &line[pos + "account".len()..];
                let username = after
                    .split_whitespace()
                    .next()
                    .map(|w| w.trim_matches(|c: char| !c.is_alphanumeric() && c != '-' && c != '_'))
                    .filter(|w| !w.is_empty());
                if let Some(u) = username {
                    return Some(u.to_string());
                }
            }
        }
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_username_from_account() {
        let output = "✓ Logged in to github.com account myuser (keyring)";
        assert_eq!(extract_github_username(output), Some("myuser".to_string()));
    }

    #[test]
    fn test_extract_username_parens() {
        let output = "  Logged in to github.com account testuser (token)";
        assert_eq!(
            extract_github_username(output),
            Some("testuser".to_string())
        );
    }
}
