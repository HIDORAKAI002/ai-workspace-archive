use std::path::Path;

use crate::domain::errors::ApiError;
use claude_admin_shared::BackupEntry;

/// List all backups from ~/.claude/backups/
pub async fn list_backups(claude_home: &Path) -> Result<Vec<BackupEntry>, ApiError> {
    let backup_dir = claude_home.join("backups");
    if !tokio::fs::try_exists(&backup_dir).await.unwrap_or(false) {
        return Ok(vec![]);
    }

    let mut entries = Vec::new();
    let mut dir = tokio::fs::read_dir(&backup_dir).await?;
    while let Some(entry) = dir.next_entry().await? {
        let path = entry.path();
        if !path.is_file() {
            continue;
        }
        let metadata = entry.metadata().await?;
        let name = path
            .file_name()
            .unwrap_or_default()
            .to_string_lossy()
            .to_string();

        let created = metadata
            .modified()
            .ok()
            .and_then(|t| {
                t.duration_since(std::time::UNIX_EPOCH)
                    .ok()
                    .map(|d| d.as_secs())
            })
            .map(|secs| {
                chrono::DateTime::from_timestamp(secs as i64, 0)
                    .map(|dt| dt.format("%Y-%m-%d %H:%M:%S").to_string())
                    .unwrap_or_default()
            })
            .unwrap_or_default();

        // Parse original path from backup name:
        // Format: YYYYMMDD_HHMMSS_relative_path
        let original_path = parse_original_path(&name);

        entries.push(BackupEntry {
            name,
            size_bytes: metadata.len(),
            created,
            original_path,
        });
    }

    entries.sort_by(|a, b| b.created.cmp(&a.created));
    Ok(entries)
}

/// Restore a backup by copying its content back to the original path.
pub async fn restore_backup(claude_home: &Path, backup_name: &str) -> Result<(), ApiError> {
    let backup_path = claude_home.join("backups").join(backup_name);
    if !tokio::fs::try_exists(&backup_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!(
            "Backup '{}' not found",
            backup_name
        )));
    }

    let content = tokio::fs::read_to_string(&backup_path).await?;

    // Reconstruct original path from backup name
    let original_relative = parse_original_path(backup_name);
    if original_relative.is_empty() {
        return Err(ApiError::BadRequest(
            "Cannot determine original file path from backup name".to_string(),
        ));
    }

    let original_path = claude_home.join(original_relative.replace('_', "/"));

    // Create a backup of current state before restoring
    if tokio::fs::try_exists(&original_path).await.unwrap_or(false) {
        let current_content = tokio::fs::read_to_string(&original_path).await?;
        crate::services::file_ops::create_backup(claude_home, &original_path, &current_content)
            .await?;
    }

    // Ensure parent dir exists and write
    if let Some(parent) = original_path.parent() {
        tokio::fs::create_dir_all(parent).await?;
    }
    tokio::fs::write(&original_path, &content).await?;

    Ok(())
}

/// Delete a backup file.
pub async fn delete_backup(claude_home: &Path, backup_name: &str) -> Result<(), ApiError> {
    let backup_path = claude_home.join("backups").join(backup_name);
    if !tokio::fs::try_exists(&backup_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!(
            "Backup '{}' not found",
            backup_name
        )));
    }
    tokio::fs::remove_file(&backup_path).await?;
    Ok(())
}

/// Prune old backups. Keeps at most `max_files` and removes files older than `max_days`.
pub async fn prune_backups(
    claude_home: &Path,
    max_files: usize,
    max_days: u64,
) -> Result<claude_admin_shared::PruneResult, ApiError> {
    let backup_dir = claude_home.join("backups");
    if !tokio::fs::try_exists(&backup_dir).await.unwrap_or(false) {
        return Ok(claude_admin_shared::PruneResult {
            deleted_count: 0,
            remaining_count: 0,
        });
    }

    let mut entries: Vec<(String, std::time::SystemTime)> = Vec::new();
    let mut dir = tokio::fs::read_dir(&backup_dir).await?;
    while let Some(entry) = dir.next_entry().await? {
        let path = entry.path();
        if !path.is_file() {
            continue;
        }
        let name = path
            .file_name()
            .unwrap_or_default()
            .to_string_lossy()
            .to_string();
        let modified = entry
            .metadata()
            .await
            .ok()
            .and_then(|m| m.modified().ok())
            .unwrap_or(std::time::SystemTime::UNIX_EPOCH);
        entries.push((name, modified));
    }

    // Sort by modified time, newest first
    entries.sort_by(|a, b| b.1.cmp(&a.1));

    let now = std::time::SystemTime::now();
    let max_age = std::time::Duration::from_secs(max_days * 86400);
    let mut deleted_count = 0;

    for (i, (name, modified)) in entries.iter().enumerate() {
        let too_old = now
            .duration_since(*modified)
            .map(|d| d > max_age)
            .unwrap_or(false);
        let over_limit = i >= max_files;

        if too_old || over_limit {
            let path = backup_dir.join(name);
            if tokio::fs::remove_file(&path).await.is_ok() {
                deleted_count += 1;
            }
        }
    }

    let remaining_count = entries.len() - deleted_count;
    Ok(claude_admin_shared::PruneResult {
        deleted_count,
        remaining_count,
    })
}

/// Spawn background task to prune backups every 6 hours.
pub fn spawn_backup_prune_task(claude_home: std::path::PathBuf) {
    tokio::spawn(async move {
        let mut interval = tokio::time::interval(std::time::Duration::from_secs(6 * 3600));
        loop {
            interval.tick().await;
            match prune_backups(&claude_home, 100, 30).await {
                Ok(result) => {
                    if result.deleted_count > 0 {
                        tracing::info!(
                            "Auto-pruned {} backups, {} remaining",
                            result.deleted_count,
                            result.remaining_count
                        );
                    }
                }
                Err(e) => tracing::warn!("Backup auto-prune failed: {}", e),
            }
        }
    });
}

/// Extract relative path from backup name (public version).
pub fn parse_original_path_pub(name: &str) -> String {
    parse_original_path(name)
}

/// Extract relative path from backup name.
/// Format: YYYYMMDD_HHMMSS_relative_path
fn parse_original_path(name: &str) -> String {
    // Skip timestamp prefix: "20240101_120000_"
    let parts: Vec<&str> = name.splitn(3, '_').collect();
    if parts.len() >= 3 {
        parts[2].to_string()
    } else {
        name.to_string()
    }
}
