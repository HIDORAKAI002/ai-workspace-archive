use crate::domain::errors::ApiError;
use std::path::Path;

/// Write content to a file, creating a backup first if the file exists.
/// Uses atomic write (write to .tmp, then rename).
/// Also commits to the git timeline if the file is inside claude_home.
pub async fn write_with_backup(
    claude_home: &Path,
    file_path: &Path,
    content: &str,
) -> Result<(), ApiError> {
    // Create backup of existing file
    if file_path.exists() {
        let existing = tokio::fs::read_to_string(file_path).await?;
        create_backup(claude_home, file_path, &existing).await?;
    }

    // Ensure parent directory exists
    if let Some(parent) = file_path.parent() {
        tokio::fs::create_dir_all(parent).await?;
    }

    // Atomic write: write to .tmp, then rename
    let tmp_path = file_path.with_extension("tmp");
    tokio::fs::write(&tmp_path, content).await?;
    tokio::fs::rename(&tmp_path, file_path).await?;

    // Auto-commit to git timeline (best-effort, don't fail the write)
    if file_path.starts_with(claude_home) {
        let relative = file_path
            .strip_prefix(claude_home)
            .unwrap_or(file_path)
            .to_string_lossy();
        let action = if file_path.exists() {
            "Update"
        } else {
            "Create"
        };
        let msg = format!("{} {}", action, relative);
        let home = claude_home.to_path_buf();
        tokio::spawn(async move {
            if let Err(e) = crate::services::timeline::commit_all(&home, &msg).await {
                tracing::debug!("Timeline commit skipped: {}", e);
            }
        });
    }

    Ok(())
}

/// Create a timestamped backup of a file.
pub async fn create_backup(
    claude_home: &Path,
    file_path: &Path,
    content: &str,
) -> Result<(), ApiError> {
    let backup_dir = claude_home.join("backups");
    tokio::fs::create_dir_all(&backup_dir).await?;

    let timestamp = chrono::Utc::now().format("%Y%m%d_%H%M%S");

    // Include relative path info in backup name to avoid collisions
    let relative = file_path
        .strip_prefix(claude_home)
        .unwrap_or(file_path)
        .to_string_lossy()
        .replace('/', "_");

    let backup_name = format!("{}_{}", timestamp, relative);
    let backup_path = backup_dir.join(backup_name);

    tokio::fs::write(&backup_path, content).await?;

    tracing::debug!("Backup created: {}", backup_path.display());
    Ok(())
}
