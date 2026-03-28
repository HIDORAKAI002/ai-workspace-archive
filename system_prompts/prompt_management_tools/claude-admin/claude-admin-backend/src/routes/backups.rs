use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::backups;
use claude_admin_shared::{BackupEntry, PruneResult};

pub async fn list_backups(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<BackupEntry>>, ApiError> {
    let entries = backups::list_backups(&state.claude_home).await?;
    Ok(Json(entries))
}

pub async fn restore_backup(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    // Name validation is relaxed for backups (they contain timestamps/underscores)
    if name.contains("..") || name.contains('/') || name.contains('\\') || name.contains('\0') {
        return Err(ApiError::BadRequest("Invalid backup name".to_string()));
    }
    backups::restore_backup(&state.claude_home, &name).await?;
    Ok(Json(
        serde_json::json!({ "status": "restored", "name": name }),
    ))
}

pub async fn delete_backup(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    if name.contains("..") || name.contains('/') || name.contains('\\') || name.contains('\0') {
        return Err(ApiError::BadRequest("Invalid backup name".to_string()));
    }
    backups::delete_backup(&state.claude_home, &name).await?;
    Ok(Json(
        serde_json::json!({ "status": "deleted", "name": name }),
    ))
}

pub async fn prune_backups(
    State(state): State<Arc<AppState>>,
) -> Result<Json<PruneResult>, ApiError> {
    let result = backups::prune_backups(&state.claude_home, 100, 30).await?;
    crate::services::audit::log_audit(
        &state.claude_home,
        "prune",
        "backup",
        "all",
        Some(&format!("Pruned {} backups", result.deleted_count)),
    )
    .await;
    Ok(Json(result))
}

pub async fn get_backup_diff(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<claude_admin_shared::DiffResult>, ApiError> {
    if name.contains("..") || name.contains('/') || name.contains('\\') || name.contains('\0') {
        return Err(ApiError::BadRequest("Invalid backup name".to_string()));
    }

    let backup_path = state.claude_home.join("backups").join(&name);
    if !tokio::fs::try_exists(&backup_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!("Backup '{}' not found", name)));
    }

    let backup_content = tokio::fs::read_to_string(&backup_path).await?;

    // Try to find current file
    let original_relative = crate::services::backups::parse_original_path_pub(&name);
    let original_path = state.claude_home.join(original_relative.replace('_', "/"));

    let current_content = if tokio::fs::try_exists(&original_path).await.unwrap_or(false) {
        tokio::fs::read_to_string(&original_path)
            .await
            .unwrap_or_default()
    } else {
        String::new()
    };

    let diff = compute_diff(&backup_content, &current_content);
    Ok(Json(diff))
}

/// Simple LCS-based diff between two texts.
fn compute_diff(old: &str, new: &str) -> claude_admin_shared::DiffResult {
    let old_lines: Vec<&str> = old.lines().collect();
    let new_lines: Vec<&str> = new.lines().collect();

    let mut lines = Vec::new();
    let mut oi = 0;
    let mut ni = 0;

    while oi < old_lines.len() || ni < new_lines.len() {
        if oi < old_lines.len() && ni < new_lines.len() {
            if old_lines[oi] == new_lines[ni] {
                lines.push(claude_admin_shared::DiffLine {
                    kind: "context".to_string(),
                    content: old_lines[oi].to_string(),
                    line_number: Some(ni + 1),
                });
                oi += 1;
                ni += 1;
            } else {
                // Look ahead to find match
                let old_match = new_lines[ni..].iter().position(|l| *l == old_lines[oi]);
                let new_match = old_lines[oi..].iter().position(|l| *l == new_lines[ni]);

                match (old_match, new_match) {
                    (Some(om), Some(nm)) if om <= nm => {
                        // Add new lines first
                        for (j, line) in new_lines.iter().enumerate().skip(ni).take(om) {
                            lines.push(claude_admin_shared::DiffLine {
                                kind: "add".to_string(),
                                content: line.to_string(),
                                line_number: Some(j + 1),
                            });
                        }
                        ni += om;
                    }
                    (Some(_), Some(nm)) => {
                        // Remove old lines first
                        for (j, line) in old_lines.iter().enumerate().skip(oi).take(nm) {
                            lines.push(claude_admin_shared::DiffLine {
                                kind: "remove".to_string(),
                                content: line.to_string(),
                                line_number: Some(j + 1),
                            });
                        }
                        oi += nm;
                    }
                    (Some(om), None) => {
                        for (j, line) in new_lines.iter().enumerate().skip(ni).take(om) {
                            lines.push(claude_admin_shared::DiffLine {
                                kind: "add".to_string(),
                                content: line.to_string(),
                                line_number: Some(j + 1),
                            });
                        }
                        ni += om;
                    }
                    (None, Some(nm)) => {
                        for (j, line) in old_lines.iter().enumerate().skip(oi).take(nm) {
                            lines.push(claude_admin_shared::DiffLine {
                                kind: "remove".to_string(),
                                content: line.to_string(),
                                line_number: Some(j + 1),
                            });
                        }
                        oi += nm;
                    }
                    (None, None) => {
                        lines.push(claude_admin_shared::DiffLine {
                            kind: "remove".to_string(),
                            content: old_lines[oi].to_string(),
                            line_number: Some(oi + 1),
                        });
                        lines.push(claude_admin_shared::DiffLine {
                            kind: "add".to_string(),
                            content: new_lines[ni].to_string(),
                            line_number: Some(ni + 1),
                        });
                        oi += 1;
                        ni += 1;
                    }
                }
            }
        } else if oi < old_lines.len() {
            lines.push(claude_admin_shared::DiffLine {
                kind: "remove".to_string(),
                content: old_lines[oi].to_string(),
                line_number: Some(oi + 1),
            });
            oi += 1;
        } else {
            lines.push(claude_admin_shared::DiffLine {
                kind: "add".to_string(),
                content: new_lines[ni].to_string(),
                line_number: Some(ni + 1),
            });
            ni += 1;
        }
    }

    claude_admin_shared::DiffResult { lines }
}
