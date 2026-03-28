use axum::extract::{Path, State};
use axum::http::HeaderMap;
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::extract_lang;
use crate::services::{advisor, audit, file_ops, project_resolver};
use claude_admin_shared::AdvisorReport;

pub async fn get_advisor_report(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Path(id): Path<String>,
) -> Result<Json<AdvisorReport>, ApiError> {
    let lang = extract_lang(&headers);
    let project_path = project_resolver::decode_project_id(&id)?;

    let client = {
        let guard = state
            .anthropic_client
            .read()
            .map_err(|_| ApiError::Internal("Lock poisoned".to_string()))?;
        guard.as_ref().cloned().ok_or_else(|| {
            ApiError::BadRequest(
                "API-Key nicht konfiguriert. Bitte unter Settings → API Key eintragen.".to_string(),
            )
        })?
    };

    let report = advisor::analyze_project(&state, &client, &project_path, &lang).await?;
    Ok(Json(report))
}

#[derive(serde::Deserialize)]
pub struct ApplyActionRequest {
    pub action_type: String,
    pub payload: String,
    pub label: String,
}

pub async fn apply_advisor_action(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
    crate::domain::extractors::AppJson(req): crate::domain::extractors::AppJson<ApplyActionRequest>,
) -> Result<Json<serde_json::Value>, ApiError> {
    let project_path = project_resolver::decode_project_id(&id)?;

    match req.action_type.as_str() {
        "create_claude_md" | "update_claude_md" => {
            let claude_md_path = std::path::Path::new(&project_path).join("CLAUDE.md");
            file_ops::write_with_backup(&state.claude_home, &claude_md_path, &req.payload).await?;
            audit::log_audit(
                &state.claude_home,
                "advisor_apply",
                "claude_md",
                &project_path,
                Some(&req.label),
            )
            .await;
        }
        "init_memory" => {
            let encoded = project_resolver::encode_project_path(&project_path);
            let memory_dir = state
                .claude_home
                .join("projects")
                .join(&encoded)
                .join("memory");
            tokio::fs::create_dir_all(&memory_dir).await?;
            let memory_path = memory_dir.join("MEMORY.md");
            file_ops::write_with_backup(&state.claude_home, &memory_path, &req.payload).await?;
            audit::log_audit(
                &state.claude_home,
                "advisor_apply",
                "memory",
                &project_path,
                Some(&req.label),
            )
            .await;
        }
        "create_rule" => {
            let encoded = project_resolver::encode_project_path(&project_path);
            let rules_dir = state
                .claude_home
                .join("projects")
                .join(&encoded)
                .join("rules");
            tokio::fs::create_dir_all(&rules_dir).await?;
            let rule_name = req
                .payload
                .lines()
                .next()
                .and_then(|l| l.strip_prefix("# "))
                .unwrap_or("advisor-rule")
                .replace(' ', "-")
                .to_lowercase();
            let rule_path = rules_dir.join(format!("{}.md", rule_name));
            file_ops::write_with_backup(&state.claude_home, &rule_path, &req.payload).await?;
            audit::log_audit(
                &state.claude_home,
                "advisor_apply",
                "rule",
                &rule_name,
                Some(&req.label),
            )
            .await;
        }
        "enable_skill" => {
            audit::log_audit(
                &state.claude_home,
                "advisor_apply",
                "skill",
                &req.payload,
                Some(&req.label),
            )
            .await;
        }
        _ => {
            return Err(ApiError::BadRequest(format!(
                "Unknown action type: {}",
                req.action_type
            )));
        }
    }

    Ok(Json(
        serde_json::json!({"status": "applied", "action": req.action_type}),
    ))
}
