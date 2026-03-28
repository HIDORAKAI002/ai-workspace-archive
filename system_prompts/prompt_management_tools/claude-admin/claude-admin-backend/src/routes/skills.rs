use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::domain::frontmatter;
use crate::domain::validation::validate_resource_name;
use crate::services::{audit, file_ops, fs_scanner, skill_builder};
use claude_admin_shared::{
    ConfigScope, SkillCreateRequest, SkillFile, SkillPreviewRequest, SkillPreviewResponse,
    SkillTemplate, SkillUpdateRequest,
};

pub async fn list_skills(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<SkillFile>>, ApiError> {
    let skills = fs_scanner::scan_skills(&state.claude_home, &ConfigScope::Global).await?;
    Ok(Json(skills))
}

pub async fn get_skill(
    State(state): State<Arc<AppState>>,
    Path((scope, name)): Path<(String, String)>,
) -> Result<Json<SkillFile>, ApiError> {
    validate_resource_name(&name, "Skill")?;
    let scope = parse_scope(&scope)?;
    let skill_path = skill_path(&state.claude_home, &scope, &name);
    let content = tokio::fs::read_to_string(&skill_path)
        .await
        .map_err(|_| ApiError::NotFound(format!("Skill '{}' not found", name)))?;

    let (fm, body) = frontmatter::parse_frontmatter(&content);

    Ok(Json(SkillFile {
        name: name.clone(),
        path: skill_path.to_string_lossy().to_string(),
        scope,
        frontmatter: fm.unwrap_or_default(),
        content: body,
    }))
}

pub async fn create_skill(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<SkillCreateRequest>,
) -> Result<Json<SkillFile>, ApiError> {
    validate_resource_name(&req.name, "Skill")?;
    let skill_dir = skill_dir(&state.claude_home, &req.scope, &req.name);
    tokio::fs::create_dir_all(&skill_dir).await?;

    let skill_path = skill_dir.join("SKILL.md");
    let content = frontmatter::serialize_frontmatter(&req.frontmatter, &req.content);
    file_ops::write_with_backup(&state.claude_home, &skill_path, &content).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "skill.created",
        serde_json::json!({"name": &req.name, "scope": format!("{:?}", &req.scope)}),
    );

    audit::log_audit(&state.claude_home, "create", "skill", &req.name, None).await;

    Ok(Json(SkillFile {
        name: req.name,
        path: skill_path.to_string_lossy().to_string(),
        scope: req.scope,
        frontmatter: req.frontmatter,
        content: req.content,
    }))
}

pub async fn update_skill(
    State(state): State<Arc<AppState>>,
    Path((scope, name)): Path<(String, String)>,
    AppJson(req): AppJson<SkillUpdateRequest>,
) -> Result<Json<SkillFile>, ApiError> {
    validate_resource_name(&name, "Skill")?;
    let scope = parse_scope(&scope)?;
    let skill_path = skill_path(&state.claude_home, &scope, &name);

    if !tokio::fs::try_exists(&skill_path).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!("Skill '{}' not found", name)));
    }

    let content = frontmatter::serialize_frontmatter(&req.frontmatter, &req.content);
    file_ops::write_with_backup(&state.claude_home, &skill_path, &content).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "skill.updated",
        serde_json::json!({"name": &name, "scope": format!("{:?}", &scope)}),
    );

    audit::log_audit(&state.claude_home, "update", "skill", &name, None).await;

    Ok(Json(SkillFile {
        name,
        path: skill_path.to_string_lossy().to_string(),
        scope,
        frontmatter: req.frontmatter,
        content: req.content,
    }))
}

pub async fn delete_skill(
    State(state): State<Arc<AppState>>,
    Path((scope, name)): Path<(String, String)>,
) -> Result<Json<serde_json::Value>, ApiError> {
    validate_resource_name(&name, "Skill")?;
    let scope = parse_scope(&scope)?;
    let dir = skill_dir(&state.claude_home, &scope, &name);

    if !tokio::fs::try_exists(&dir).await.unwrap_or(false) {
        return Err(ApiError::NotFound(format!("Skill '{}' not found", name)));
    }

    // Backup before delete
    let skill_path = dir.join("SKILL.md");
    if tokio::fs::try_exists(&skill_path).await.unwrap_or(false) {
        let content = tokio::fs::read_to_string(&skill_path).await?;
        file_ops::create_backup(&state.claude_home, &skill_path, &content).await?;
    }

    tokio::fs::remove_dir_all(&dir).await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "skill.deleted",
        serde_json::json!({"name": &name, "scope": format!("{:?}", &scope)}),
    );

    audit::log_audit(&state.claude_home, "delete", "skill", &name, None).await;

    Ok(Json(serde_json::json!({"deleted": name})))
}

pub async fn list_skill_templates() -> Result<Json<Vec<SkillTemplate>>, ApiError> {
    Ok(Json(skill_builder::get_skill_templates()))
}

pub async fn preview_skill(
    AppJson(req): AppJson<SkillPreviewRequest>,
) -> Result<Json<SkillPreviewResponse>, ApiError> {
    Ok(Json(skill_builder::preview_skill(&req)))
}

fn parse_scope(s: &str) -> Result<ConfigScope, ApiError> {
    match s {
        "global" => Ok(ConfigScope::Global),
        "project" => Err(ApiError::BadRequest(
            "Project-scoped resources are not yet supported. Use 'global' scope.".into(),
        )),
        _ => Err(ApiError::BadRequest(format!("Invalid scope: {}", s))),
    }
}

fn skill_dir(claude_home: &std::path::Path, scope: &ConfigScope, name: &str) -> std::path::PathBuf {
    match scope {
        ConfigScope::Global => claude_home.join("skills").join(name),
        ConfigScope::Project => unreachable!("Project scope rejected by parse_scope"),
    }
}

fn skill_path(
    claude_home: &std::path::Path,
    scope: &ConfigScope,
    name: &str,
) -> std::path::PathBuf {
    skill_dir(claude_home, scope, name).join("SKILL.md")
}
