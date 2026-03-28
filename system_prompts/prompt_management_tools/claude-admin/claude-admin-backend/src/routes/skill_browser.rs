use axum::extract::State;
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::domain::validation::validate_resource_name;
use crate::services::skill_browser;
use claude_admin_shared::*;

pub async fn list_official_skills(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<BrowsableSkill>>, ApiError> {
    let skills = skill_browser::get_official_skills(&state.claude_home).await;
    Ok(Json(skills))
}

pub async fn list_community_skills(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<BrowsableSkill>>, ApiError> {
    let skills = skill_browser::get_community_skills(&state.claude_home).await;
    Ok(Json(skills))
}

pub async fn install_skill(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<SkillInstallRequest>,
) -> Result<Json<serde_json::Value>, ApiError> {
    validate_resource_name(&req.name, "Skill")?;
    skill_browser::install_skill(&state.claude_home, &req.name, &req.content).await?;
    Ok(Json(
        serde_json::json!({ "status": "installed", "name": req.name }),
    ))
}
