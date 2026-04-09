use anyhow::{Context, Result};
use serde::Serialize;
use std::path::{Path, PathBuf};
use std::process::Command;

use crate::config::Config;
use crate::session::WorktreeInfo;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum MergeReadinessStatus {
    Ready,
    Conflicted,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MergeReadiness {
    pub status: MergeReadinessStatus,
    pub summary: String,
    pub conflicts: Vec<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum WorktreeHealth {
    Clear,
    InProgress,
    Conflicted,
}

#[derive(Debug, Clone, Serialize, PartialEq, Eq)]
pub struct MergeOutcome {
    pub branch: String,
    pub base_branch: String,
    pub already_up_to_date: bool,
}

/// Create a new git worktree for an agent session.
pub fn create_for_session(session_id: &str, cfg: &Config) -> Result<WorktreeInfo> {
    let repo_root = std::env::current_dir().context("Failed to resolve repository root")?;
    create_for_session_in_repo(session_id, cfg, &repo_root)
}

pub(crate) fn create_for_session_in_repo(
    session_id: &str,
    cfg: &Config,
    repo_root: &Path,
) -> Result<WorktreeInfo> {
    let branch = format!("ecc/{session_id}");
    let path = cfg.worktree_root.join(session_id);

    // Get current branch as base
    let base = get_current_branch(repo_root)?;

    std::fs::create_dir_all(&cfg.worktree_root)
        .context("Failed to create worktree root directory")?;

    let output = Command::new("git")
        .arg("-C")
        .arg(repo_root)
        .args(["worktree", "add", "-b", &branch])
        .arg(&path)
        .arg("HEAD")
        .output()
        .context("Failed to run git worktree add")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        anyhow::bail!("git worktree add failed: {stderr}");
    }

    tracing::info!(
        "Created worktree at {} on branch {}",
        path.display(),
        branch
    );

    Ok(WorktreeInfo {
        path,
        branch,
        base_branch: base,
    })
}

/// Remove a worktree and its branch.
pub fn remove(worktree: &WorktreeInfo) -> Result<()> {
    let repo_root = match base_checkout_path(worktree) {
        Ok(path) => path,
        Err(error) => {
            tracing::warn!(
                "Falling back to filesystem-only cleanup for {}: {error}",
                worktree.path.display()
            );
            if worktree.path.exists() {
                if let Err(remove_error) = std::fs::remove_dir_all(&worktree.path) {
                    tracing::warn!(
                        "Fallback worktree directory cleanup warning for {}: {remove_error}",
                        worktree.path.display()
                    );
                }
            }
            return Ok(());
        }
    };
    let output = Command::new("git")
        .arg("-C")
        .arg(&repo_root)
        .args(["worktree", "remove", "--force"])
        .arg(&worktree.path)
        .output()
        .context("Failed to remove worktree")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        tracing::warn!("Worktree removal warning: {stderr}");
        if worktree.path.exists() {
            if let Err(remove_error) = std::fs::remove_dir_all(&worktree.path) {
                tracing::warn!(
                    "Fallback worktree directory cleanup warning for {}: {remove_error}",
                    worktree.path.display()
                );
            }
        }
    }

    let branch_output = Command::new("git")
        .arg("-C")
        .arg(&repo_root)
        .args(["branch", "-D", &worktree.branch])
        .output()
        .context("Failed to delete worktree branch")?;

    if !branch_output.status.success() {
        let stderr = String::from_utf8_lossy(&branch_output.stderr);
        tracing::warn!(
            "Worktree branch deletion warning for {}: {stderr}",
            worktree.branch
        );
    }

    Ok(())
}

/// List all active worktrees.
pub fn list() -> Result<Vec<String>> {
    let output = Command::new("git")
        .args(["worktree", "list", "--porcelain"])
        .output()
        .context("Failed to list worktrees")?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    let worktrees: Vec<String> = stdout
        .lines()
        .filter(|l| l.starts_with("worktree "))
        .map(|l| l.trim_start_matches("worktree ").to_string())
        .collect();

    Ok(worktrees)
}

pub fn diff_summary(worktree: &WorktreeInfo) -> Result<Option<String>> {
    let base_ref = format!("{}...HEAD", worktree.base_branch);
    let committed = git_diff_shortstat(&worktree.path, &[&base_ref])?;
    let working = git_diff_shortstat(&worktree.path, &[])?;

    let mut parts = Vec::new();
    if let Some(committed) = committed {
        parts.push(format!("Branch {committed}"));
    }
    if let Some(working) = working {
        parts.push(format!("Working tree {working}"));
    }

    if parts.is_empty() {
        Ok(Some(format!("Clean relative to {}", worktree.base_branch)))
    } else {
        Ok(Some(parts.join(" | ")))
    }
}

pub fn diff_file_preview(worktree: &WorktreeInfo, limit: usize) -> Result<Vec<String>> {
    let mut preview = Vec::new();
    let base_ref = format!("{}...HEAD", worktree.base_branch);

    let committed = git_diff_name_status(&worktree.path, &[&base_ref])?;
    if !committed.is_empty() {
        preview.extend(
            committed
                .into_iter()
                .map(|entry| format!("Branch {entry}"))
                .take(limit.saturating_sub(preview.len())),
        );
    }

    if preview.len() < limit {
        let working = git_status_short(&worktree.path)?;
        if !working.is_empty() {
            preview.extend(
                working
                    .into_iter()
                    .map(|entry| format!("Working {entry}"))
                    .take(limit.saturating_sub(preview.len())),
            );
        }
    }

    Ok(preview)
}

pub fn diff_patch_preview(worktree: &WorktreeInfo, max_lines: usize) -> Result<Option<String>> {
    let mut remaining = max_lines.max(1);
    let mut sections = Vec::new();
    let base_ref = format!("{}...HEAD", worktree.base_branch);

    let committed = git_diff_patch_lines(&worktree.path, &[&base_ref])?;
    if !committed.is_empty() && remaining > 0 {
        let taken = take_preview_lines(&committed, &mut remaining);
        sections.push(format!(
            "--- Branch diff vs {} ---\n{}",
            worktree.base_branch,
            taken.join("\n")
        ));
    }

    let working = git_diff_patch_lines(&worktree.path, &[])?;
    if !working.is_empty() && remaining > 0 {
        let taken = take_preview_lines(&working, &mut remaining);
        sections.push(format!("--- Working tree diff ---\n{}", taken.join("\n")));
    }

    if sections.is_empty() {
        Ok(None)
    } else {
        Ok(Some(sections.join("\n\n")))
    }
}

pub fn merge_readiness(worktree: &WorktreeInfo) -> Result<MergeReadiness> {
    let output = Command::new("git")
        .arg("-C")
        .arg(&worktree.path)
        .args([
            "merge-tree",
            "--write-tree",
            &worktree.base_branch,
            &worktree.branch,
        ])
        .output()
        .context("Failed to generate merge readiness preview")?;

    let merged_output = format!(
        "{}\n{}",
        String::from_utf8_lossy(&output.stdout),
        String::from_utf8_lossy(&output.stderr)
    );
    let conflicts = merged_output
        .lines()
        .filter_map(parse_merge_conflict_path)
        .collect::<Vec<_>>();

    if output.status.success() {
        return Ok(MergeReadiness {
            status: MergeReadinessStatus::Ready,
            summary: format!("Merge ready into {}", worktree.base_branch),
            conflicts: Vec::new(),
        });
    }

    if !conflicts.is_empty() {
        let conflict_summary = conflicts
            .iter()
            .take(3)
            .cloned()
            .collect::<Vec<_>>()
            .join(", ");
        let overflow = conflicts.len().saturating_sub(3);
        let detail = if overflow > 0 {
            format!("{conflict_summary}, +{overflow} more")
        } else {
            conflict_summary
        };

        return Ok(MergeReadiness {
            status: MergeReadinessStatus::Conflicted,
            summary: format!("Merge blocked by {} conflict(s): {detail}", conflicts.len()),
            conflicts,
        });
    }

    let stderr = String::from_utf8_lossy(&output.stderr);
    anyhow::bail!("git merge-tree failed: {stderr}");
}

pub fn health(worktree: &WorktreeInfo) -> Result<WorktreeHealth> {
    let merge_readiness = merge_readiness(worktree)?;
    if merge_readiness.status == MergeReadinessStatus::Conflicted {
        return Ok(WorktreeHealth::Conflicted);
    }

    if diff_file_preview(worktree, 1)?.is_empty() {
        Ok(WorktreeHealth::Clear)
    } else {
        Ok(WorktreeHealth::InProgress)
    }
}

pub fn has_uncommitted_changes(worktree: &WorktreeInfo) -> Result<bool> {
    Ok(!git_status_short(&worktree.path)?.is_empty())
}

pub fn merge_into_base(worktree: &WorktreeInfo) -> Result<MergeOutcome> {
    let readiness = merge_readiness(worktree)?;
    if readiness.status == MergeReadinessStatus::Conflicted {
        anyhow::bail!(readiness.summary);
    }

    if has_uncommitted_changes(worktree)? {
        anyhow::bail!(
            "Worktree {} has uncommitted changes; commit or discard them before merging",
            worktree.branch
        );
    }

    let repo_root = base_checkout_path(worktree)?;
    let current_branch = get_current_branch(&repo_root)?;
    if current_branch != worktree.base_branch {
        anyhow::bail!(
            "Base branch {} is not checked out in repo root (currently {})",
            worktree.base_branch,
            current_branch
        );
    }

    if !git_status_short(&repo_root)?.is_empty() {
        anyhow::bail!(
            "Repository root {} has uncommitted changes; commit or stash them before merging",
            repo_root.display()
        );
    }

    let output = Command::new("git")
        .arg("-C")
        .arg(&repo_root)
        .args(["merge", "--no-edit", &worktree.branch])
        .output()
        .context("Failed to merge worktree branch into base")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        anyhow::bail!("git merge failed: {stderr}");
    }

    let merged_output = format!(
        "{}\n{}",
        String::from_utf8_lossy(&output.stdout),
        String::from_utf8_lossy(&output.stderr)
    );

    Ok(MergeOutcome {
        branch: worktree.branch.clone(),
        base_branch: worktree.base_branch.clone(),
        already_up_to_date: merged_output.contains("Already up to date."),
    })
}

fn git_diff_shortstat(worktree_path: &Path, extra_args: &[&str]) -> Result<Option<String>> {
    let mut command = Command::new("git");
    command
        .arg("-C")
        .arg(worktree_path)
        .arg("diff")
        .arg("--shortstat");
    command.args(extra_args);

    let output = command
        .output()
        .context("Failed to generate worktree diff summary")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        tracing::warn!(
            "Worktree diff summary warning for {}: {stderr}",
            worktree_path.display()
        );
        return Ok(None);
    }

    let summary = String::from_utf8_lossy(&output.stdout).trim().to_string();
    if summary.is_empty() {
        Ok(None)
    } else {
        Ok(Some(summary))
    }
}

fn git_diff_name_status(worktree_path: &Path, extra_args: &[&str]) -> Result<Vec<String>> {
    let mut command = Command::new("git");
    command
        .arg("-C")
        .arg(worktree_path)
        .arg("diff")
        .arg("--name-status");
    command.args(extra_args);

    let output = command
        .output()
        .context("Failed to generate worktree diff file preview")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        tracing::warn!(
            "Worktree diff file preview warning for {}: {stderr}",
            worktree_path.display()
        );
        return Ok(Vec::new());
    }

    Ok(parse_nonempty_lines(&output.stdout))
}

fn git_diff_patch_lines(worktree_path: &Path, extra_args: &[&str]) -> Result<Vec<String>> {
    let mut command = Command::new("git");
    command
        .arg("-C")
        .arg(worktree_path)
        .arg("diff")
        .args(["--stat", "--patch", "--find-renames"]);
    command.args(extra_args);

    let output = command
        .output()
        .context("Failed to generate worktree patch preview")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        tracing::warn!(
            "Worktree patch preview warning for {}: {stderr}",
            worktree_path.display()
        );
        return Ok(Vec::new());
    }

    Ok(parse_nonempty_lines(&output.stdout))
}

fn git_status_short(worktree_path: &Path) -> Result<Vec<String>> {
    let output = Command::new("git")
        .arg("-C")
        .arg(worktree_path)
        .args(["status", "--short"])
        .output()
        .context("Failed to generate worktree status preview")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        tracing::warn!(
            "Worktree status preview warning for {}: {stderr}",
            worktree_path.display()
        );
        return Ok(Vec::new());
    }

    Ok(parse_nonempty_lines(&output.stdout))
}

fn parse_nonempty_lines(stdout: &[u8]) -> Vec<String> {
    String::from_utf8_lossy(stdout)
        .lines()
        .map(str::trim)
        .filter(|line| !line.is_empty())
        .map(ToOwned::to_owned)
        .collect()
}

fn take_preview_lines(lines: &[String], remaining: &mut usize) -> Vec<String> {
    let count = (*remaining).min(lines.len());
    let taken = lines.iter().take(count).cloned().collect::<Vec<_>>();
    *remaining = remaining.saturating_sub(count);
    taken
}

fn parse_merge_conflict_path(line: &str) -> Option<String> {
    if !line.contains("CONFLICT") {
        return None;
    }

    line.split(" in ")
        .nth(1)
        .map(str::trim)
        .filter(|path| !path.is_empty())
        .map(ToOwned::to_owned)
}

fn get_current_branch(repo_root: &Path) -> Result<String> {
    let output = Command::new("git")
        .arg("-C")
        .arg(repo_root)
        .args(["rev-parse", "--abbrev-ref", "HEAD"])
        .output()
        .context("Failed to get current branch")?;

    Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
}

fn base_checkout_path(worktree: &WorktreeInfo) -> Result<PathBuf> {
    let output = Command::new("git")
        .arg("-C")
        .arg(&worktree.path)
        .args(["worktree", "list", "--porcelain"])
        .output()
        .context("Failed to resolve git worktree list")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        anyhow::bail!("git worktree list --porcelain failed: {stderr}");
    }

    let target_branch = format!("refs/heads/{}", worktree.base_branch);
    let mut current_path: Option<PathBuf> = None;
    let mut current_branch: Option<String> = None;
    let mut fallback: Option<PathBuf> = None;

    for line in String::from_utf8_lossy(&output.stdout).lines() {
        if line.is_empty() {
            if let Some(path) = current_path.take() {
                if fallback.is_none() && path != worktree.path {
                    fallback = Some(path.clone());
                }
                if current_branch.as_deref() == Some(target_branch.as_str())
                    && path != worktree.path
                {
                    return Ok(path);
                }
            }
            current_branch = None;
            continue;
        }

        if let Some(path) = line.strip_prefix("worktree ") {
            current_path = Some(PathBuf::from(path.trim()));
        } else if let Some(branch) = line.strip_prefix("branch ") {
            current_branch = Some(branch.trim().to_string());
        }
    }

    if let Some(path) = current_path.take() {
        if fallback.is_none() && path != worktree.path {
            fallback = Some(path.clone());
        }
        if current_branch.as_deref() == Some(target_branch.as_str()) && path != worktree.path {
            return Ok(path);
        }
    }

    fallback.context(format!(
        "Failed to locate base checkout for {} from git worktree list",
        worktree.base_branch
    ))
}

#[cfg(test)]
mod tests {
    use super::*;
    use anyhow::Result;
    use std::fs;
    use std::process::Command;
    use uuid::Uuid;

    fn run_git(repo: &Path, args: &[&str]) -> Result<()> {
        let output = Command::new("git")
            .arg("-C")
            .arg(repo)
            .args(args)
            .output()?;
        if !output.status.success() {
            anyhow::bail!("{}", String::from_utf8_lossy(&output.stderr));
        }
        Ok(())
    }

    #[test]
    fn diff_summary_reports_clean_and_dirty_worktrees() -> Result<()> {
        let root = std::env::temp_dir().join(format!("ecc2-worktree-{}", Uuid::new_v4()));
        let repo = root.join("repo");
        fs::create_dir_all(&repo)?;

        run_git(&repo, &["init", "-b", "main"])?;
        run_git(&repo, &["config", "user.email", "ecc@example.com"])?;
        run_git(&repo, &["config", "user.name", "ECC"])?;
        fs::write(repo.join("README.md"), "hello\n")?;
        run_git(&repo, &["add", "README.md"])?;
        run_git(&repo, &["commit", "-m", "init"])?;

        let worktree_dir = root.join("wt-1");
        run_git(
            &repo,
            &[
                "worktree",
                "add",
                "-b",
                "ecc/test",
                worktree_dir.to_str().expect("utf8 path"),
                "HEAD",
            ],
        )?;

        let info = WorktreeInfo {
            path: worktree_dir.clone(),
            branch: "ecc/test".to_string(),
            base_branch: "main".to_string(),
        };

        assert_eq!(
            diff_summary(&info)?,
            Some("Clean relative to main".to_string())
        );

        fs::write(worktree_dir.join("README.md"), "hello\nmore\n")?;
        let dirty = diff_summary(&info)?.expect("dirty summary");
        assert!(dirty.contains("Working tree"));
        assert!(dirty.contains("file changed"));

        let _ = Command::new("git")
            .arg("-C")
            .arg(&repo)
            .args(["worktree", "remove", "--force"])
            .arg(&worktree_dir)
            .output();
        let _ = fs::remove_dir_all(root);
        Ok(())
    }

    #[test]
    fn diff_file_preview_reports_branch_and_working_tree_files() -> Result<()> {
        let root = std::env::temp_dir().join(format!("ecc2-worktree-preview-{}", Uuid::new_v4()));
        let repo = root.join("repo");
        fs::create_dir_all(&repo)?;

        run_git(&repo, &["init", "-b", "main"])?;
        run_git(&repo, &["config", "user.email", "ecc@example.com"])?;
        run_git(&repo, &["config", "user.name", "ECC"])?;
        fs::write(repo.join("README.md"), "hello\n")?;
        run_git(&repo, &["add", "README.md"])?;
        run_git(&repo, &["commit", "-m", "init"])?;

        let worktree_dir = root.join("wt-1");
        run_git(
            &repo,
            &[
                "worktree",
                "add",
                "-b",
                "ecc/test",
                worktree_dir.to_str().expect("utf8 path"),
                "HEAD",
            ],
        )?;

        fs::write(worktree_dir.join("src.txt"), "branch\n")?;
        run_git(&worktree_dir, &["add", "src.txt"])?;
        run_git(&worktree_dir, &["commit", "-m", "branch file"])?;
        fs::write(worktree_dir.join("README.md"), "hello\nworking\n")?;

        let info = WorktreeInfo {
            path: worktree_dir.clone(),
            branch: "ecc/test".to_string(),
            base_branch: "main".to_string(),
        };

        let preview = diff_file_preview(&info, 6)?;
        assert!(preview
            .iter()
            .any(|line| line.contains("Branch A") && line.contains("src.txt")));
        assert!(preview
            .iter()
            .any(|line| line.contains("Working M") && line.contains("README.md")));

        let _ = Command::new("git")
            .arg("-C")
            .arg(&repo)
            .args(["worktree", "remove", "--force"])
            .arg(&worktree_dir)
            .output();
        let _ = fs::remove_dir_all(root);
        Ok(())
    }

    #[test]
    fn diff_patch_preview_reports_branch_and_working_tree_sections() -> Result<()> {
        let root = std::env::temp_dir().join(format!("ecc2-worktree-patch-{}", Uuid::new_v4()));
        let repo = root.join("repo");
        fs::create_dir_all(&repo)?;

        run_git(&repo, &["init", "-b", "main"])?;
        run_git(&repo, &["config", "user.email", "ecc@example.com"])?;
        run_git(&repo, &["config", "user.name", "ECC"])?;
        fs::write(repo.join("README.md"), "hello\n")?;
        run_git(&repo, &["add", "README.md"])?;
        run_git(&repo, &["commit", "-m", "init"])?;

        let worktree_dir = root.join("wt-1");
        run_git(
            &repo,
            &[
                "worktree",
                "add",
                "-b",
                "ecc/test",
                worktree_dir.to_str().expect("utf8 path"),
                "HEAD",
            ],
        )?;

        fs::write(worktree_dir.join("src.txt"), "branch\n")?;
        run_git(&worktree_dir, &["add", "src.txt"])?;
        run_git(&worktree_dir, &["commit", "-m", "branch file"])?;
        fs::write(worktree_dir.join("README.md"), "hello\nworking\n")?;

        let info = WorktreeInfo {
            path: worktree_dir.clone(),
            branch: "ecc/test".to_string(),
            base_branch: "main".to_string(),
        };

        let preview = diff_patch_preview(&info, 40)?.expect("patch preview");
        assert!(preview.contains("--- Branch diff vs main ---"));
        assert!(preview.contains("--- Working tree diff ---"));
        assert!(preview.contains("src.txt"));
        assert!(preview.contains("README.md"));

        let _ = Command::new("git")
            .arg("-C")
            .arg(&repo)
            .args(["worktree", "remove", "--force"])
            .arg(&worktree_dir)
            .output();
        let _ = fs::remove_dir_all(root);
        Ok(())
    }

    #[test]
    fn merge_readiness_reports_ready_worktree() -> Result<()> {
        let root =
            std::env::temp_dir().join(format!("ecc2-worktree-merge-ready-{}", Uuid::new_v4()));
        let repo = root.join("repo");
        fs::create_dir_all(&repo)?;

        run_git(&repo, &["init", "-b", "main"])?;
        run_git(&repo, &["config", "user.email", "ecc@example.com"])?;
        run_git(&repo, &["config", "user.name", "ECC"])?;
        fs::write(repo.join("README.md"), "hello\n")?;
        run_git(&repo, &["add", "README.md"])?;
        run_git(&repo, &["commit", "-m", "init"])?;

        let worktree_dir = root.join("wt-1");
        run_git(
            &repo,
            &[
                "worktree",
                "add",
                "-b",
                "ecc/test",
                worktree_dir.to_str().expect("utf8 path"),
                "HEAD",
            ],
        )?;

        fs::write(worktree_dir.join("src.txt"), "branch only\n")?;
        run_git(&worktree_dir, &["add", "src.txt"])?;
        run_git(&worktree_dir, &["commit", "-m", "branch file"])?;

        let info = WorktreeInfo {
            path: worktree_dir.clone(),
            branch: "ecc/test".to_string(),
            base_branch: "main".to_string(),
        };

        let readiness = merge_readiness(&info)?;
        assert_eq!(readiness.status, MergeReadinessStatus::Ready);
        assert!(readiness.summary.contains("Merge ready into main"));
        assert!(readiness.conflicts.is_empty());

        let _ = Command::new("git")
            .arg("-C")
            .arg(&repo)
            .args(["worktree", "remove", "--force"])
            .arg(&worktree_dir)
            .output();
        let _ = fs::remove_dir_all(root);
        Ok(())
    }

    #[test]
    fn merge_readiness_reports_conflicted_worktree() -> Result<()> {
        let root =
            std::env::temp_dir().join(format!("ecc2-worktree-merge-conflict-{}", Uuid::new_v4()));
        let repo = root.join("repo");
        fs::create_dir_all(&repo)?;

        run_git(&repo, &["init", "-b", "main"])?;
        run_git(&repo, &["config", "user.email", "ecc@example.com"])?;
        run_git(&repo, &["config", "user.name", "ECC"])?;
        fs::write(repo.join("README.md"), "hello\n")?;
        run_git(&repo, &["add", "README.md"])?;
        run_git(&repo, &["commit", "-m", "init"])?;

        let worktree_dir = root.join("wt-1");
        run_git(
            &repo,
            &[
                "worktree",
                "add",
                "-b",
                "ecc/test",
                worktree_dir.to_str().expect("utf8 path"),
                "HEAD",
            ],
        )?;

        fs::write(worktree_dir.join("README.md"), "hello\nbranch\n")?;
        run_git(&worktree_dir, &["commit", "-am", "branch change"])?;
        fs::write(repo.join("README.md"), "hello\nmain\n")?;
        run_git(&repo, &["commit", "-am", "main change"])?;

        let info = WorktreeInfo {
            path: worktree_dir.clone(),
            branch: "ecc/test".to_string(),
            base_branch: "main".to_string(),
        };

        let readiness = merge_readiness(&info)?;
        assert_eq!(readiness.status, MergeReadinessStatus::Conflicted);
        assert!(readiness.summary.contains("Merge blocked by 1 conflict"));
        assert_eq!(readiness.conflicts, vec!["README.md".to_string()]);

        let _ = Command::new("git")
            .arg("-C")
            .arg(&repo)
            .args(["worktree", "remove", "--force"])
            .arg(&worktree_dir)
            .output();
        let _ = fs::remove_dir_all(root);
        Ok(())
    }
}
