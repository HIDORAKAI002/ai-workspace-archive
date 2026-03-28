use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::domain::validation::validate_resource_name;
use crate::services::{audit, file_ops};
use claude_admin_shared::*;

/// Read-modify-write pattern for ~/.claude/settings.json "agents" key.
async fn read_modify_write_agents<F>(
    claude_home: &std::path::Path,
    modify: F,
) -> Result<(), ApiError>
where
    F: FnOnce(&mut serde_json::Map<String, serde_json::Value>) -> Result<(), ApiError>,
{
    let settings_path = claude_home.join("settings.json");
    let content = tokio::fs::read_to_string(&settings_path)
        .await
        .unwrap_or_else(|_| "{}".to_string());

    let mut root: serde_json::Value = serde_json::from_str(&content)?;

    let agents = root
        .as_object_mut()
        .ok_or_else(|| ApiError::BadRequest("settings.json is not a JSON object".into()))?
        .entry("agents")
        .or_insert(serde_json::json!({}));

    let agents_map = agents
        .as_object_mut()
        .ok_or_else(|| ApiError::BadRequest("agents is not a JSON object".into()))?;

    modify(agents_map)?;

    let new_content = serde_json::to_string_pretty(&root)?;
    file_ops::write_with_backup(claude_home, &settings_path, &new_content).await?;

    Ok(())
}

/// Read agents from settings.json, returning them as a Vec<AgentDefinition>.
async fn read_agents(claude_home: &std::path::Path) -> Result<Vec<AgentDefinition>, ApiError> {
    let settings_path = claude_home.join("settings.json");
    let content = tokio::fs::read_to_string(&settings_path)
        .await
        .unwrap_or_else(|_| "{}".to_string());

    let root: serde_json::Value = serde_json::from_str(&content)?;

    let agents_obj = root
        .get("agents")
        .and_then(|v| v.as_object())
        .cloned()
        .unwrap_or_default();

    let mut result = Vec::new();
    for (name, value) in &agents_obj {
        let description = value
            .get("description")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string();
        let prompt = value
            .get("prompt")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string();
        let model = value
            .get("model")
            .and_then(|v| v.as_str())
            .map(String::from);
        let allowed_tools = value
            .get("allowedTools")
            .and_then(|v| v.as_array())
            .map(|arr| {
                arr.iter()
                    .filter_map(|v| v.as_str().map(String::from))
                    .collect()
            })
            .unwrap_or_default();
        let disallowed_tools = value
            .get("disallowedTools")
            .and_then(|v| v.as_array())
            .map(|arr| {
                arr.iter()
                    .filter_map(|v| v.as_str().map(String::from))
                    .collect()
            })
            .unwrap_or_default();
        let custom_instructions = value
            .get("customInstructions")
            .and_then(|v| v.as_str())
            .map(String::from);

        result.push(AgentDefinition {
            name: name.clone(),
            description,
            prompt,
            model,
            allowed_tools,
            disallowed_tools,
            custom_instructions,
            source: "settings.json".to_string(),
        });
    }

    result.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(result)
}

/// Build the JSON value for an agent from its fields.
fn agent_to_json(
    description: &str,
    prompt: &str,
    model: &Option<String>,
    allowed_tools: &[String],
    disallowed_tools: &[String],
    custom_instructions: &Option<String>,
) -> serde_json::Value {
    let mut obj = serde_json::json!({
        "description": description,
        "prompt": prompt,
    });
    if let Some(m) = model {
        obj["model"] = serde_json::json!(m);
    }
    if !allowed_tools.is_empty() {
        obj["allowedTools"] = serde_json::json!(allowed_tools);
    }
    if !disallowed_tools.is_empty() {
        obj["disallowedTools"] = serde_json::json!(disallowed_tools);
    }
    if let Some(ci) = custom_instructions {
        obj["customInstructions"] = serde_json::json!(ci);
    }
    obj
}

pub async fn list_agents(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<AgentDefinition>>, ApiError> {
    let agents = read_agents(&state.claude_home).await?;
    Ok(Json(agents))
}

pub async fn get_agent(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<AgentDefinition>, ApiError> {
    validate_resource_name(&name, "Agent")?;
    let agents = read_agents(&state.claude_home).await?;
    let agent = agents
        .into_iter()
        .find(|a| a.name == name)
        .ok_or_else(|| ApiError::NotFound(format!("Agent '{}' not found", name)))?;
    Ok(Json(agent))
}

pub async fn create_agent(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<AgentCreateRequest>,
) -> Result<Json<AgentDefinition>, ApiError> {
    validate_resource_name(&req.name, "Agent")?;

    let name = req.name.clone();
    let agent_value = agent_to_json(
        &req.description,
        &req.prompt,
        &req.model,
        &req.allowed_tools,
        &req.disallowed_tools,
        &req.custom_instructions,
    );

    read_modify_write_agents(&state.claude_home, |agents_map| {
        if agents_map.contains_key(&name) {
            return Err(ApiError::BadRequest(format!(
                "Agent '{}' already exists",
                name
            )));
        }
        agents_map.insert(name.clone(), agent_value.clone());
        Ok(())
    })
    .await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "agent.created",
        serde_json::json!({"name": &req.name}),
    );

    audit::log_audit(&state.claude_home, "create", "agent", &req.name, None).await;

    Ok(Json(AgentDefinition {
        name: req.name,
        description: req.description,
        prompt: req.prompt,
        model: req.model,
        allowed_tools: req.allowed_tools,
        disallowed_tools: req.disallowed_tools,
        custom_instructions: req.custom_instructions,
        source: "settings.json".to_string(),
    }))
}

pub async fn update_agent(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
    AppJson(req): AppJson<AgentUpdateRequest>,
) -> Result<Json<AgentDefinition>, ApiError> {
    validate_resource_name(&name, "Agent")?;

    let name_clone = name.clone();
    let req_clone = req.clone();

    read_modify_write_agents(&state.claude_home, |agents_map| {
        let existing = agents_map
            .get(&name_clone)
            .ok_or_else(|| ApiError::NotFound(format!("Agent '{}' not found", name_clone)))?
            .clone();

        let mut updated = existing.clone();
        if let Some(desc) = &req_clone.description {
            updated["description"] = serde_json::json!(desc);
        }
        if let Some(prompt) = &req_clone.prompt {
            updated["prompt"] = serde_json::json!(prompt);
        }
        if let Some(model) = &req_clone.model {
            updated["model"] = serde_json::json!(model);
        }
        if let Some(tools) = &req_clone.allowed_tools {
            updated["allowedTools"] = serde_json::json!(tools);
        }
        if let Some(tools) = &req_clone.disallowed_tools {
            updated["disallowedTools"] = serde_json::json!(tools);
        }
        if let Some(ci) = &req_clone.custom_instructions {
            updated["customInstructions"] = serde_json::json!(ci);
        }

        agents_map.insert(name_clone.clone(), updated);
        Ok(())
    })
    .await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "agent.updated",
        serde_json::json!({"name": &name}),
    );

    audit::log_audit(&state.claude_home, "update", "agent", &name, None).await;

    // Re-read the updated agent to return it
    let agents = read_agents(&state.claude_home).await?;
    let agent = agents
        .into_iter()
        .find(|a| a.name == name)
        .ok_or_else(|| ApiError::NotFound(format!("Agent '{}' not found after update", name)))?;

    Ok(Json(agent))
}

pub async fn delete_agent(
    State(state): State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    validate_resource_name(&name, "Agent")?;

    let name_clone = name.clone();
    read_modify_write_agents(&state.claude_home, |agents_map| {
        if agents_map.remove(&name_clone).is_none() {
            return Err(ApiError::NotFound(format!(
                "Agent '{}' not found",
                name_clone
            )));
        }
        Ok(())
    })
    .await?;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "agent.deleted",
        serde_json::json!({"name": &name}),
    );

    audit::log_audit(&state.claude_home, "delete", "agent", &name, None).await;

    Ok(Json(serde_json::json!({"deleted": name})))
}
