use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::services::{audit, config_health, file_ops, fs_scanner, project_resolver};
use claude_admin_shared::{
    ClaudeMdContent, ClaudeMdUpdateRequest, ConfigScope, EffectiveConfig, EffectiveConfigSection,
    EffectiveHooksSection, ProjectDetail, ProjectProfile, ProjectStatus, ProjectSummaryLite,
};

/// Instant project list - no filesystem checks.
pub async fn list_projects(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<ProjectSummaryLite>>, ApiError> {
    let projects = fs_scanner::scan_projects_lite(&state.claude_json_path).await?;
    Ok(Json(projects))
}

/// JIT status for a single project - loaded on demand.
pub async fn get_project_status(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<Json<ProjectStatus>, ApiError> {
    let project_path = project_resolver::decode_project_id(&id)?;
    let status = fs_scanner::scan_project_status(&state.claude_home, &project_path).await?;
    Ok(Json(status))
}

pub async fn get_project(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<Json<ProjectDetail>, ApiError> {
    let project_path = project_resolver::decode_project_id(&id)?;
    let detail = fs_scanner::scan_project_detail(&state.claude_home, &project_path).await?;
    Ok(Json(detail))
}

pub async fn get_project_profile(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<Json<ProjectProfile>, ApiError> {
    let project_path = project_resolver::decode_project_id(&id)?;

    // Get project detail for rules/skills/memory
    let detail = fs_scanner::scan_project_detail(&state.claude_home, &project_path).await?;

    // Get global rules and skills too
    let global_rules = fs_scanner::scan_rules(&state.claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();
    let global_skills = fs_scanner::scan_skills(&state.claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();

    // Merge global + project rules/skills
    let mut all_rules = global_rules;
    all_rules.extend(detail.rules);
    let mut all_skills = global_skills;
    all_skills.extend(detail.skills);

    // Memory file names
    let memory_names: Vec<String> = detail.memory_files.iter().map(|m| m.name.clone()).collect();

    // MCP servers (names only)
    let mcp_servers = crate::services::mcp::list_mcp_servers(
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        &state.claude_home,
    )
    .await
    .unwrap_or_default()
    .into_iter()
    .map(|s| s.name)
    .collect();

    // Hooks count
    let settings = fs_scanner::scan_settings(&state.claude_home)
        .await
        .unwrap_or_else(|_| claude_admin_shared::SettingsOverview {
            global_settings: serde_json::Value::Object(serde_json::Map::new()),
            hooks: claude_admin_shared::HooksConfig::default(),
        });
    let hooks_count = settings.hooks.pre_tool_use.len()
        + settings.hooks.post_tool_use.len()
        + settings.hooks.notification.len()
        + settings.hooks.stop.len()
        + settings.hooks.user_prompt_submit.len()
        + settings.hooks.session_start.len();

    // Health score
    let health = config_health::compute_health_score(&state.claude_home, &project_path)
        .await
        .unwrap_or(claude_admin_shared::ProjectHealth {
            score: 0,
            has_claude_md: false,
            has_memory: false,
            permission_count: 0,
            security_issues: vec![],
            duplicated_rules: vec![],
        });

    // Conflicts
    let conflicts = config_health::detect_rule_conflicts(&state.claude_home, &project_path).await;

    Ok(Json(ProjectProfile {
        has_claude_md: detail.summary.has_claude_md,
        rules: all_rules,
        skills: all_skills,
        memory_files: memory_names,
        mcp_servers,
        hooks_count,
        health_score: health.score,
        conflicts,
    }))
}

pub async fn get_effective_config(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<Json<EffectiveConfig>, ApiError> {
    let project_path = project_resolver::decode_project_id(&id)?;

    // Get project detail (project-level rules, skills, memory)
    let detail = fs_scanner::scan_project_detail(&state.claude_home, &project_path).await?;

    // Get global rules and skills
    let global_rules = fs_scanner::scan_rules(&state.claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();
    let global_skills = fs_scanner::scan_skills(&state.claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();

    // MCP servers
    let mcp_servers = crate::services::mcp::list_mcp_servers(
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
        &state.claude_home,
    )
    .await
    .unwrap_or_default();

    // Global hooks
    let settings = fs_scanner::scan_settings(&state.claude_home)
        .await
        .unwrap_or_else(|_| claude_admin_shared::SettingsOverview {
            global_settings: serde_json::Value::Object(serde_json::Map::new()),
            hooks: claude_admin_shared::HooksConfig::default(),
        });
    let global_hook_count = settings.hooks.pre_tool_use.len()
        + settings.hooks.post_tool_use.len()
        + settings.hooks.notification.len()
        + settings.hooks.stop.len()
        + settings.hooks.user_prompt_submit.len()
        + settings.hooks.session_start.len();

    // Build effective hooks list
    let mut effective_hooks = Vec::new();
    for entry in &settings.hooks.pre_tool_use {
        for hook in &entry.hooks {
            effective_hooks.push(claude_admin_shared::EffectiveHook {
                event: "PreToolUse".to_string(),
                matcher: Some(entry.matcher.clone()),
                command: hook.command.clone(),
                source: "global".to_string(),
            });
        }
    }
    for entry in &settings.hooks.post_tool_use {
        for hook in &entry.hooks {
            effective_hooks.push(claude_admin_shared::EffectiveHook {
                event: "PostToolUse".to_string(),
                matcher: Some(entry.matcher.clone()),
                command: hook.command.clone(),
                source: "global".to_string(),
            });
        }
    }

    // Conflicts
    let conflicts = config_health::detect_rule_conflicts(&state.claude_home, &project_path).await;

    // Memory file names
    let memory_names: Vec<String> = detail.memory_files.iter().map(|m| m.name.clone()).collect();

    let rules_effective = global_rules.len() + detail.rules.len();
    let skills_effective = global_skills.len() + detail.skills.len();

    Ok(Json(EffectiveConfig {
        rules: EffectiveConfigSection {
            global: global_rules,
            project: detail.rules,
            effective_count: rules_effective,
        },
        skills: EffectiveConfigSection {
            global: global_skills,
            project: detail.skills,
            effective_count: skills_effective,
        },
        mcp_servers,
        hooks: EffectiveHooksSection {
            global_count: global_hook_count,
            effective_hooks,
        },
        has_claude_md: detail.summary.has_claude_md,
        memory_files: memory_names,
        conflicts,
    }))
}

pub async fn get_claude_md(
    State(_state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<Json<ClaudeMdContent>, ApiError> {
    let project_path = project_resolver::decode_project_id(&id)?;
    let claude_md_path = std::path::Path::new(&project_path).join("CLAUDE.md");

    if !tokio::fs::try_exists(&claude_md_path)
        .await
        .unwrap_or(false)
    {
        return Err(ApiError::NotFound(format!(
            "CLAUDE.md not found for project {}",
            project_path
        )));
    }

    let content = tokio::fs::read_to_string(&claude_md_path).await?;
    Ok(Json(ClaudeMdContent {
        content,
        path: claude_md_path.to_string_lossy().to_string(),
    }))
}

pub async fn put_claude_md(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
    AppJson(req): AppJson<ClaudeMdUpdateRequest>,
) -> Result<Json<ClaudeMdContent>, ApiError> {
    let project_path = project_resolver::decode_project_id(&id)?;
    let claude_md_path = std::path::Path::new(&project_path).join("CLAUDE.md");

    file_ops::write_with_backup(&state.claude_home, &claude_md_path, &req.content).await?;

    audit::log_audit(&state.claude_home, "update", "claude-md", &id, None).await;

    Ok(Json(ClaudeMdContent {
        content: req.content,
        path: claude_md_path.to_string_lossy().to_string(),
    }))
}
