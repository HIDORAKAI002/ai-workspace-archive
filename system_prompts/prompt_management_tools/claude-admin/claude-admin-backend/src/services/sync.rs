use std::path::Path;

use crate::domain::errors::ApiError;
use claude_admin_shared::{SyncFileEntry, SyncManifest, SyncResult};

/// Generate a sync manifest of all config files under ~/.claude/.
pub async fn generate_manifest(claude_home: &Path) -> Result<SyncManifest, ApiError> {
    let mut files = Vec::new();

    // Collect relevant config files
    let patterns = [
        "settings.json",
        "budget.json",
        "webhooks.json",
        "users.json",
    ];

    for pattern in &patterns {
        let path = claude_home.join(pattern);
        if tokio::fs::try_exists(&path).await.unwrap_or(false) {
            if let Ok(entry) = file_entry(claude_home, &path).await {
                files.push(entry);
            }
        }
    }

    // Collect skills
    collect_dir_entries(claude_home, &claude_home.join("skills"), &mut files).await;

    // Collect rules
    collect_dir_entries(claude_home, &claude_home.join("rules"), &mut files).await;

    let instance_id = format!(
        "{}_{:x}",
        hostname(),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_secs()
    );

    Ok(SyncManifest {
        instance_id,
        files,
        generated_at: chrono::Utc::now().to_rfc3339(),
    })
}

/// Push files to a remote ClaudeAdmin instance.
pub async fn push_to_remote(
    claude_home: &Path,
    target_url: &str,
    file_paths: &[String],
) -> Result<SyncResult, ApiError> {
    let mut transferred = 0;
    let mut errors = Vec::new();

    for file_path in file_paths {
        let full_path = claude_home.join(file_path);
        if !tokio::fs::try_exists(&full_path).await.unwrap_or(false) {
            errors.push(format!("File not found: {}", file_path));
            continue;
        }

        let content = tokio::fs::read_to_string(&full_path).await?;
        let payload = serde_json::json!({
            "path": file_path,
            "content": content,
        });

        let url = format!("{}/api/v1/sync/receive", target_url.trim_end_matches('/'));
        match reqwest::Client::new()
            .post(&url)
            .json(&payload)
            .send()
            .await
        {
            Ok(resp) if resp.status().is_success() => transferred += 1,
            Ok(resp) => errors.push(format!("Remote rejected {}: {}", file_path, resp.status())),
            Err(e) => errors.push(format!("Failed to push {}: {}", file_path, e)),
        }
    }

    Ok(SyncResult {
        transferred,
        skipped: file_paths.len() - transferred - errors.len(),
        errors,
    })
}

/// Pull files from a remote ClaudeAdmin instance.
pub async fn pull_from_remote(
    claude_home: &Path,
    source_url: &str,
    file_paths: &[String],
) -> Result<SyncResult, ApiError> {
    let mut transferred = 0;
    let mut errors = Vec::new();

    // First get the remote manifest
    let manifest_url = format!("{}/api/v1/sync/manifest", source_url.trim_end_matches('/'));
    let manifest: SyncManifest = reqwest::Client::new()
        .get(&manifest_url)
        .send()
        .await
        .map_err(|e| ApiError::Internal(format!("Failed to fetch manifest: {}", e)))?
        .json()
        .await
        .map_err(|e| ApiError::Internal(format!("Failed to parse manifest: {}", e)))?;

    for file_path in file_paths {
        // Check if file exists on remote
        if !manifest.files.iter().any(|f| f.path == *file_path) {
            errors.push(format!("File not found on remote: {}", file_path));
            continue;
        }

        let fetch_url = format!(
            "{}/api/v1/sync/file?path={}",
            source_url.trim_end_matches('/'),
            file_path
        );
        match reqwest::Client::new().get(&fetch_url).send().await {
            Ok(resp) if resp.status().is_success() => {
                if let Ok(content) = resp.text().await {
                    let target_path = claude_home.join(file_path);
                    if let Err(e) = crate::services::file_ops::write_with_backup(
                        claude_home,
                        &target_path,
                        &content,
                    )
                    .await
                    {
                        errors.push(format!("Failed to write {}: {}", file_path, e));
                    } else {
                        transferred += 1;
                    }
                }
            }
            Ok(resp) => errors.push(format!("Remote error for {}: {}", file_path, resp.status())),
            Err(e) => errors.push(format!("Failed to pull {}: {}", file_path, e)),
        }
    }

    Ok(SyncResult {
        transferred,
        skipped: file_paths.len() - transferred - errors.len(),
        errors,
    })
}

/// Receive a file push from a remote instance.
pub async fn receive_file(claude_home: &Path, path: &str, content: &str) -> Result<(), ApiError> {
    // Validate path
    if path.contains("..") || path.starts_with('/') {
        return Err(ApiError::BadRequest("Invalid path".to_string()));
    }

    let target = claude_home.join(path);
    crate::services::file_ops::write_with_backup(claude_home, &target, content).await
}

async fn file_entry(claude_home: &Path, path: &Path) -> Result<SyncFileEntry, ApiError> {
    let metadata = tokio::fs::metadata(path).await?;
    let content = tokio::fs::read(path).await?;

    use sha2::Digest;
    let hash = format!("{:x}", sha2::Sha256::digest(&content));

    let relative = path
        .strip_prefix(claude_home)
        .unwrap_or(path)
        .to_string_lossy()
        .to_string();

    let modified = metadata
        .modified()
        .ok()
        .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
        .map(|d| {
            chrono::DateTime::from_timestamp(d.as_secs() as i64, 0)
                .map(|dt| dt.to_rfc3339())
                .unwrap_or_default()
        })
        .unwrap_or_default();

    Ok(SyncFileEntry {
        path: relative,
        hash,
        size: metadata.len(),
        modified,
    })
}

async fn collect_dir_entries(claude_home: &Path, dir: &Path, files: &mut Vec<SyncFileEntry>) {
    if !dir.exists() {
        return;
    }
    if let Ok(mut entries) = tokio::fs::read_dir(dir).await {
        while let Ok(Some(entry)) = entries.next_entry().await {
            let path = entry.path();
            // Skip macOS metadata files
            if let Some(name) = path.file_name().and_then(|n| n.to_str()) {
                if name == ".DS_Store" || name.starts_with("._") {
                    continue;
                }
            }
            if path.is_dir() {
                // Recurse into subdirectories (e.g. skills/commit/SKILL.md)
                Box::pin(collect_dir_entries(claude_home, &path, files)).await;
            } else if path.is_file() {
                if let Ok(e) = file_entry(claude_home, &path).await {
                    files.push(e);
                }
            }
        }
    }
}

fn hostname() -> String {
    std::env::var("HOSTNAME")
        .or_else(|_| std::env::var("HOST"))
        .unwrap_or_else(|_| "unknown".to_string())
}
