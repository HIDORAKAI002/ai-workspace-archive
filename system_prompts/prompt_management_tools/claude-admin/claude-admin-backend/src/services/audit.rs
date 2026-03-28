use std::path::Path;

use crate::domain::errors::ApiError;
use claude_admin_shared::{AuditEntry, AuditLogResponse};

/// Append an audit entry to ~/.claude/audit.log (JSONL format).
pub async fn log_audit(
    claude_home: &Path,
    action: &str,
    resource_type: &str,
    resource_name: &str,
    details: Option<&str>,
) {
    let entry = AuditEntry {
        timestamp: chrono::Utc::now().to_rfc3339(),
        action: action.to_string(),
        resource_type: resource_type.to_string(),
        resource_name: resource_name.to_string(),
        details: details.map(|s| s.to_string()),
    };

    let audit_path = claude_home.join("audit.log");

    // Serialize to JSONL line
    if let Ok(line) = serde_json::to_string(&entry) {
        use tokio::io::AsyncWriteExt;
        if let Ok(mut file) = tokio::fs::OpenOptions::new()
            .create(true)
            .append(true)
            .open(&audit_path)
            .await
        {
            let _ = file.write_all(format!("{}\n", line).as_bytes()).await;
        }
    }
}

/// Read audit log entries with pagination.
pub async fn get_audit_log(
    claude_home: &Path,
    limit: usize,
    offset: usize,
) -> Result<AuditLogResponse, ApiError> {
    let audit_path = claude_home.join("audit.log");
    if !tokio::fs::try_exists(&audit_path).await.unwrap_or(false) {
        return Ok(AuditLogResponse {
            entries: vec![],
            total: 0,
        });
    }

    let content = tokio::fs::read_to_string(&audit_path).await?;
    let all_entries: Vec<AuditEntry> = content
        .lines()
        .rev() // Most recent first
        .filter_map(|line| serde_json::from_str(line).ok())
        .collect();

    let total = all_entries.len() as u64;
    let entries: Vec<AuditEntry> = all_entries.into_iter().skip(offset).take(limit).collect();

    Ok(AuditLogResponse { entries, total })
}
