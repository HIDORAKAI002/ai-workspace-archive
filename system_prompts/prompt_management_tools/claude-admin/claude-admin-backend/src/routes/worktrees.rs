use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::services::{audit, fs_scanner};
use claude_admin_shared::*;

pub async fn list_worktrees(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<WorktreeInfo>>, ApiError> {
    let projects = fs_scanner::scan_projects_lite(&state.claude_json_path)
        .await
        .unwrap_or_default();

    let mut all_worktrees = Vec::new();

    for project in &projects {
        let path = std::path::Path::new(&project.path);
        if !path.is_dir() {
            continue;
        }

        // Check if the project is a git repo
        if !path.join(".git").exists() {
            continue;
        }

        match run_git_worktree_list(&project.path).await {
            Ok(worktrees) => {
                for mut wt in worktrees {
                    wt.project_name = Some(project.name.clone());
                    all_worktrees.push(wt);
                }
            }
            Err(_) => {
                // Skip projects where git worktree list fails
                continue;
            }
        }
    }

    Ok(Json(all_worktrees))
}

pub async fn create_worktree(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<WorktreeCreateRequest>,
) -> Result<Json<WorktreeCreateResult>, ApiError> {
    let project_path = std::path::Path::new(&req.project_path);
    if !project_path.is_dir() {
        return Err(ApiError::NotFound(format!(
            "Project directory not found: {}",
            req.project_path
        )));
    }

    // Determine branch name
    let branch_name = req
        .name
        .clone()
        .unwrap_or_else(|| format!("worktree-{}", chrono::Utc::now().format("%Y%m%d-%H%M%S")));

    // Sanitize the branch name
    let branch_name = sanitize_branch_name(&branch_name);

    // Worktree path: sibling directory
    let worktree_path = project_path.parent().unwrap_or(project_path).join(format!(
        "{}-{}",
        project_path
            .file_name()
            .map(|s| s.to_string_lossy().to_string())
            .unwrap_or_else(|| "project".to_string()),
        branch_name
    ));

    let output = tokio::process::Command::new("git")
        .args([
            "worktree",
            "add",
            "-b",
            &branch_name,
            &worktree_path.to_string_lossy(),
        ])
        .current_dir(&req.project_path)
        .output()
        .await
        .map_err(|e| ApiError::Internal(format!("Failed to run git: {}", e)))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(ApiError::Internal(format!(
            "git worktree add failed: {}",
            stderr
        )));
    }

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "worktree.created",
        serde_json::json!({"branch": &branch_name, "path": worktree_path.to_string_lossy()}),
    );

    audit::log_audit(&state.claude_home, "create", "worktree", &branch_name, None).await;

    Ok(Json(WorktreeCreateResult {
        path: worktree_path.to_string_lossy().to_string(),
        branch: branch_name,
    }))
}

pub async fn delete_worktree(
    State(state): State<Arc<AppState>>,
    Path(path_encoded): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    let worktree_path = crate::services::project_resolver::decode_project_id(&path_encoded)?;

    let wt_path = std::path::Path::new(&worktree_path);
    if !wt_path.exists() {
        return Err(ApiError::NotFound(format!(
            "Worktree path not found: {}",
            worktree_path
        )));
    }

    // Find the main worktree (parent git repo) by reading .git file
    let git_path = wt_path.join(".git");
    let main_repo = if git_path.is_file() {
        // Linked worktree: .git is a file pointing to the main repo's .git/worktrees/<name>
        let content = tokio::fs::read_to_string(&git_path)
            .await
            .map_err(|e| ApiError::Internal(format!("Failed to read .git file: {}", e)))?;
        let gitdir = content
            .trim()
            .strip_prefix("gitdir: ")
            .ok_or_else(|| ApiError::Internal("Invalid .git file format".to_string()))?;
        // gitdir points to .git/worktrees/<name>, go up 3 levels for the repo root
        std::path::Path::new(gitdir)
            .parent() // .git/worktrees
            .and_then(|p| p.parent()) // .git
            .and_then(|p| p.parent()) // repo root
            .map(|p| p.to_path_buf())
            .ok_or_else(|| ApiError::Internal("Cannot determine main repo path".to_string()))?
    } else {
        return Err(ApiError::BadRequest(
            "Cannot remove the main worktree".to_string(),
        ));
    };

    let output = tokio::process::Command::new("git")
        .args(["worktree", "remove", &worktree_path, "--force"])
        .current_dir(&main_repo)
        .output()
        .await
        .map_err(|e| ApiError::Internal(format!("Failed to run git: {}", e)))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(ApiError::Internal(format!(
            "git worktree remove failed: {}",
            stderr
        )));
    }

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "worktree.deleted",
        serde_json::json!({"path": &worktree_path}),
    );

    audit::log_audit(
        &state.claude_home,
        "delete",
        "worktree",
        &worktree_path,
        None,
    )
    .await;

    Ok(Json(serde_json::json!({"deleted": worktree_path})))
}

/// Run `git worktree list --porcelain` and parse the output.
async fn run_git_worktree_list(project_path: &str) -> Result<Vec<WorktreeInfo>, ApiError> {
    let output = tokio::process::Command::new("git")
        .args(["worktree", "list", "--porcelain"])
        .current_dir(project_path)
        .output()
        .await
        .map_err(|e| ApiError::Internal(format!("Failed to run git: {}", e)))?;

    if !output.status.success() {
        return Err(ApiError::Internal("git worktree list failed".to_string()));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    Ok(parse_porcelain_output(&stdout))
}

/// Parse the porcelain output of `git worktree list --porcelain`.
///
/// Format:
/// ```text
/// worktree /path/to/main
/// HEAD abc123def456
/// branch refs/heads/main
///
/// worktree /path/to/feature
/// HEAD def456abc789
/// branch refs/heads/feature-x
/// ```
fn parse_porcelain_output(output: &str) -> Vec<WorktreeInfo> {
    let mut worktrees = Vec::new();
    let mut current_path = String::new();
    let mut current_head = String::new();
    let mut current_branch = String::new();
    let mut is_bare = false;
    let mut is_first = true;

    for line in output.lines() {
        if let Some(path) = line.strip_prefix("worktree ") {
            // If we have a pending worktree, push it
            if !current_path.is_empty() {
                worktrees.push(WorktreeInfo {
                    path: current_path.clone(),
                    branch: current_branch.clone(),
                    head_commit: current_head.clone(),
                    is_main: is_first,
                    is_bare,
                    project_name: None,
                });
                is_first = false;
            }
            current_path = path.to_string();
            current_head.clear();
            current_branch.clear();
            is_bare = false;
        } else if let Some(head) = line.strip_prefix("HEAD ") {
            current_head = head.to_string();
        } else if let Some(branch) = line.strip_prefix("branch ") {
            // Strip refs/heads/ prefix for cleaner display
            current_branch = branch
                .strip_prefix("refs/heads/")
                .unwrap_or(branch)
                .to_string();
        } else if line == "bare" {
            is_bare = true;
        } else if line == "detached" {
            current_branch = "(detached)".to_string();
        }
    }

    // Push the last worktree
    if !current_path.is_empty() {
        worktrees.push(WorktreeInfo {
            path: current_path,
            branch: current_branch,
            head_commit: current_head,
            is_main: is_first,
            is_bare,
            project_name: None,
        });
    }

    worktrees
}

/// Sanitize a branch name to be git-compatible.
fn sanitize_branch_name(name: &str) -> String {
    name.chars()
        .map(|c| {
            if c.is_alphanumeric() || c == '-' || c == '_' || c == '/' {
                c
            } else {
                '-'
            }
        })
        .collect::<String>()
        .trim_matches('-')
        .to_string()
}
