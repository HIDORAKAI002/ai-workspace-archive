use axum::extract::State;
use axum::http::HeaderMap;
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::{extract_lang, AppJson};
use crate::services::claude_api;
use claude_admin_shared::{SuggestionRequest, SuggestionResponse};

pub async fn suggest(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    AppJson(req): AppJson<SuggestionRequest>,
) -> Result<Json<SuggestionResponse>, ApiError> {
    let lang = extract_lang(&headers);
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

    let response = claude_api::get_suggestions(&client, &req, &lang).await?;
    Ok(Json(response))
}

pub async fn validate(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    AppJson(req): AppJson<SuggestionRequest>,
) -> Result<Json<SuggestionResponse>, ApiError> {
    let lang = extract_lang(&headers);
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

    let response = claude_api::validate_content(&client, &req, &lang).await?;
    Ok(Json(response))
}

// ── Help Chat ──

#[derive(serde::Deserialize)]
pub struct HelpChatMessage {
    pub role: String,
    pub content: String,
}

#[derive(serde::Deserialize)]
pub struct HelpChatRequest {
    pub question: String,
    pub page_context: String,
    #[serde(default)]
    pub history: Vec<HelpChatMessage>,
}

#[derive(serde::Serialize)]
pub struct HelpChatResponse {
    pub answer: String,
}

pub async fn help_chat(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    AppJson(req): AppJson<HelpChatRequest>,
) -> Result<Json<HelpChatResponse>, ApiError> {
    let lang = extract_lang(&headers);
    let lang_hint = crate::domain::extractors::lang_instruction(&lang);

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

    let system = format!(
        "You are the built-in help assistant for ClaudeAdmin, a web-based admin console for Claude Code (Anthropic's CLI coding agent).\n\
         ClaudeAdmin manages: Skills (YAML+MD in ~/.claude/skills/), Rules (~/.claude/rules/), MCP Servers (~/.claude.json), \
         Projects, Agents (custom agent definitions in settings.json), Plugins, Launch Profiles, System Prompts, \
         Permissions, Worktrees, Analytics, Plans, and Settings.\n\n\
         {}\n\n\
         The user is currently viewing this page:\n{}\n\n\
         IMPORTANT: You know exactly what the user sees based on the page context above. \
         Answer confidently about the fields, buttons, and options on this page. \
         Do NOT ask the user to describe what they see — you already know.\n\n\
         Rules:\n\
         - Use markdown formatting (bold, lists, code) for readability\n\
         - Reference specific fields and buttons by their exact labels\n\
         - Give practical examples and step-by-step instructions\n\
         - Keep answers focused (3-8 sentences), expand only when needed\n\
         - If the page context mentions current data, reference it specifically",
        lang_hint, req.page_context
    );

    // Build multi-turn messages: history + current question
    let mut messages: Vec<serde_json::Value> = req
        .history
        .iter()
        .filter(|m| m.role == "user" || m.role == "assistant")
        .map(|m| {
            serde_json::json!({
                "role": m.role,
                "content": m.content,
            })
        })
        .collect();
    messages.push(serde_json::json!({
        "role": "user",
        "content": req.question,
    }));

    let response = claude_api::call_claude_with_history(&client, &system, messages).await?;
    Ok(Json(HelpChatResponse { answer: response }))
}
