use crate::domain::errors::ApiError;
use claude_admin_shared::{ClaudeFileType, SuggestionRequest, SuggestionResponse};
use std::path::Path;
use std::sync::{Arc, RwLock};

#[derive(Clone)]
pub struct AnthropicClient {
    token: Arc<RwLock<String>>,
    auth_mode: AuthMode,
    client: reqwest::Client,
}

#[derive(Clone)]
enum AuthMode {
    ApiKey,
    OAuthBearer,
}

impl AnthropicClient {
    /// Try to create a client from ANTHROPIC_API_KEY env var only.
    fn from_env() -> Option<Self> {
        if let Ok(api_key) = std::env::var("ANTHROPIC_API_KEY") {
            tracing::info!("Using ANTHROPIC_API_KEY for Claude API");
            return Some(Self {
                token: Arc::new(RwLock::new(api_key)),
                auth_mode: AuthMode::ApiKey,
                client: reqwest::Client::new(),
            });
        }
        None
    }

    /// Refresh the OAuth token by triggering Claude Code to do its own refresh,
    /// then re-reading the fresh token from the Keychain.
    /// Returns true if a new token was loaded successfully.
    fn refresh_token(&self) -> bool {
        if !matches!(self.auth_mode, AuthMode::OAuthBearer) {
            return false;
        }

        tracing::info!("Triggering Claude Code to refresh OAuth token...");

        // Run a minimal Claude Code command to force token refresh
        let output = std::process::Command::new("claude")
            .args(["-p", "ping"])
            .stdin(std::process::Stdio::null())
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::piped())
            .output();

        match output {
            Ok(o) if o.status.success() => {
                tracing::info!("Claude Code responded, re-reading token from Keychain");
            }
            Ok(o) => {
                let stderr = String::from_utf8_lossy(&o.stderr);
                tracing::warn!("Claude Code returned error: {}", stderr);
            }
            Err(e) => {
                tracing::warn!("Failed to run 'claude': {}", e);
                return false;
            }
        }

        // Re-read the (now hopefully refreshed) token from Keychain
        if let Some(new_token) = read_oauth_from_keychain() {
            if let Ok(mut token) = self.token.write() {
                tracing::info!("OAuth token refreshed via Claude Code");
                *token = new_token;
                return true;
            }
        }

        tracing::warn!("Failed to refresh OAuth token from Keychain");
        false
    }

    /// Read the current token.
    fn current_token(&self) -> String {
        self.token.read().expect("token lock poisoned").clone()
    }

    /// Try all sources: env var → config file → macOS Keychain.
    pub fn from_env_or_config(claude_home: &Path) -> Option<Self> {
        // 1. env var (highest priority)
        if let Some(c) = Self::from_env() {
            return Some(c);
        }

        // 2. Config file (~/.claude/claude-admin.json)
        if let Some(key) = read_api_key_from_config(claude_home) {
            tracing::info!("Using API key from claude-admin.json");
            return Some(Self::from_api_key(key));
        }

        // 3. macOS Keychain
        if let Some(oauth_token) = read_oauth_from_keychain() {
            tracing::info!("Using OAuth token from macOS Keychain for Claude API");
            return Some(Self {
                token: Arc::new(RwLock::new(oauth_token)),
                auth_mode: AuthMode::OAuthBearer,
                client: reqwest::Client::new(),
            });
        }

        tracing::warn!("No Claude API credentials found");
        None
    }

    /// Create a client from an explicit API key.
    pub fn from_api_key(key: String) -> Self {
        Self {
            token: Arc::new(RwLock::new(key)),
            auth_mode: AuthMode::ApiKey,
            client: reqwest::Client::new(),
        }
    }
}

/// Read the Claude OAuth access token from the macOS Keychain.
fn read_oauth_from_keychain() -> Option<String> {
    let output = std::process::Command::new("security")
        .args([
            "find-generic-password",
            "-s",
            "Claude Code-credentials",
            "-w",
        ])
        .output()
        .ok()?;

    if !output.status.success() {
        tracing::debug!("Keychain lookup for 'Claude Code-credentials' failed");
        return None;
    }

    let raw = String::from_utf8(output.stdout).ok()?;
    let raw = raw.trim();

    // Parse the JSON to extract the OAuth access token
    let json: serde_json::Value = serde_json::from_str(raw).ok()?;
    let access_token = json
        .get("claudeAiOauth")
        .and_then(|o| o.get("accessToken"))
        .and_then(|t| t.as_str())?;

    Some(access_token.to_string())
}

/// Read API key from ~/.claude/claude-admin.json
fn read_api_key_from_config(claude_home: &Path) -> Option<String> {
    let config_path = claude_home.join("claude-admin.json");
    let content = std::fs::read_to_string(&config_path).ok()?;
    let json: serde_json::Value = serde_json::from_str(&content).ok()?;
    json.get("api_key")
        .and_then(|v| v.as_str())
        .filter(|s| !s.is_empty())
        .map(String::from)
}

/// Save API key to ~/.claude/claude-admin.json
pub fn save_api_key_to_config(claude_home: &Path, api_key: &str) -> Result<(), ApiError> {
    let config_path = claude_home.join("claude-admin.json");

    // Read existing config or create new
    let mut json: serde_json::Value = if config_path.exists() {
        let content = std::fs::read_to_string(&config_path)
            .map_err(|e| ApiError::Internal(format!("Failed to read config: {}", e)))?;
        serde_json::from_str(&content).unwrap_or(serde_json::json!({}))
    } else {
        serde_json::json!({})
    };

    // Set or remove key
    if api_key.is_empty() {
        json.as_object_mut().map(|o| o.remove("api_key"));
    } else {
        json["api_key"] = serde_json::Value::String(api_key.to_string());
    }

    let content = serde_json::to_string_pretty(&json)
        .map_err(|e| ApiError::Internal(format!("Failed to serialize config: {}", e)))?;
    std::fs::write(&config_path, content)
        .map_err(|e| ApiError::Internal(format!("Failed to write config: {}", e)))?;

    Ok(())
}

/// Check what auth source is currently active.
pub fn get_auth_status(claude_home: &Path) -> AuthStatus {
    if std::env::var("ANTHROPIC_API_KEY").is_ok() {
        return AuthStatus {
            configured: true,
            source: "env".to_string(),
            has_config_key: read_api_key_from_config(claude_home).is_some(),
        };
    }
    if read_api_key_from_config(claude_home).is_some() {
        return AuthStatus {
            configured: true,
            source: "config".to_string(),
            has_config_key: true,
        };
    }
    if read_oauth_from_keychain().is_some() {
        return AuthStatus {
            configured: true,
            source: "keychain".to_string(),
            has_config_key: false,
        };
    }
    AuthStatus {
        configured: false,
        source: "none".to_string(),
        has_config_key: false,
    }
}

#[derive(serde::Serialize)]
pub struct AuthStatus {
    pub configured: bool,
    pub source: String,
    pub has_config_key: bool,
}

pub async fn get_suggestions(
    client: &AnthropicClient,
    req: &SuggestionRequest,
    lang: &str,
) -> Result<SuggestionResponse, ApiError> {
    let lang_hint = crate::domain::extractors::lang_instruction(lang);
    let system_prompt = format!("{}\n\n{}", build_system_prompt(&req.file_type), lang_hint);
    let user_prompt = format!(
        "Analyze and suggest improvements for this {}:\n\n```\n{}\n```\n\n{}",
        file_type_label(&req.file_type),
        req.content,
        req.context.as_deref().unwrap_or("")
    );

    let response = call_claude(client, &system_prompt, &user_prompt).await?;
    parse_suggestion_response(&response)
}

pub async fn validate_content(
    client: &AnthropicClient,
    req: &SuggestionRequest,
    lang: &str,
) -> Result<SuggestionResponse, ApiError> {
    let lang_hint = crate::domain::extractors::lang_instruction(lang);
    let system_prompt = format!(
        "You are a Claude Code configuration validator. Check the following {} for issues, \
         best practices violations, and potential problems. Return a JSON object with keys: \
         'validation_issues' (array of strings), 'suggestions' (array of strings).\n\n{}",
        file_type_label(&req.file_type),
        lang_hint
    );

    let user_prompt = format!("Validate this content:\n\n```\n{}\n```", req.content);

    let response = call_claude(client, &system_prompt, &user_prompt).await?;
    parse_suggestion_response(&response)
}

pub async fn call_claude_raw(
    client: &AnthropicClient,
    system: &str,
    user: &str,
) -> Result<String, ApiError> {
    call_claude(client, system, user).await
}

/// Send a multi-turn conversation to the Claude API (for chat with history).
pub async fn call_claude_with_history(
    client: &AnthropicClient,
    system: &str,
    messages: Vec<serde_json::Value>,
) -> Result<String, ApiError> {
    match send_claude_request_multi(client, system, &messages).await {
        Ok(text) => Ok(text),
        Err(ApiError::Unauthorized(msg)) => {
            tracing::warn!("Got 401, attempting token refresh: {}", msg);
            if client.refresh_token() {
                tracing::info!("Token refreshed, retrying request...");
                send_claude_request_multi(client, system, &messages).await
            } else {
                Err(ApiError::Internal(
                    "Claude API: Token abgelaufen. Refresh aus Keychain fehlgeschlagen. \
                     Stelle sicher, dass Claude Code eingeloggt ist."
                        .to_string(),
                ))
            }
        }
        Err(e) => Err(e),
    }
}

async fn call_claude(
    client: &AnthropicClient,
    system: &str,
    user: &str,
) -> Result<String, ApiError> {
    // Try the request; on 401 with OAuth, refresh token and retry once.
    match send_claude_request(client, system, user).await {
        Ok(text) => Ok(text),
        Err(ApiError::Unauthorized(msg)) => {
            tracing::warn!("Got 401, attempting token refresh: {}", msg);
            if client.refresh_token() {
                tracing::info!("Token refreshed, retrying request...");
                send_claude_request(client, system, user).await
            } else {
                Err(ApiError::Internal(
                    "Claude API: Token abgelaufen. Refresh aus Keychain fehlgeschlagen. \
                     Stelle sicher, dass Claude Code eingeloggt ist."
                        .to_string(),
                ))
            }
        }
        Err(e) => Err(e),
    }
}

async fn send_claude_request(
    client: &AnthropicClient,
    system: &str,
    user: &str,
) -> Result<String, ApiError> {
    let body = serde_json::json!({
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 4096,
        "system": system,
        "messages": [
            {"role": "user", "content": user}
        ]
    });

    let token = client.current_token();

    let mut req = client
        .client
        .post("https://api.anthropic.com/v1/messages")
        .header("anthropic-version", "2023-06-01")
        .header("content-type", "application/json");

    req = match &client.auth_mode {
        AuthMode::ApiKey => req.header("x-api-key", &token),
        AuthMode::OAuthBearer => req
            .header("Authorization", format!("Bearer {}", token))
            .header("anthropic-beta", "oauth-2025-04-20"),
    };

    let resp = req
        .json(&body)
        .send()
        .await
        .map_err(|e| ApiError::Internal(format!("Claude API request failed: {}", e)))?;

    if !resp.status().is_success() {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();

        if status.as_u16() == 401 {
            return Err(ApiError::Unauthorized(format!("Claude API 401: {}", text)));
        }

        return Err(ApiError::Internal(format!(
            "Claude API error {}: {}",
            status, text
        )));
    }

    let json: serde_json::Value = resp
        .json()
        .await
        .map_err(|e| ApiError::Internal(format!("Failed to parse Claude response: {}", e)))?;

    let text = json["content"][0]["text"]
        .as_str()
        .unwrap_or("")
        .to_string();

    Ok(text)
}

async fn send_claude_request_multi(
    client: &AnthropicClient,
    system: &str,
    messages: &[serde_json::Value],
) -> Result<String, ApiError> {
    let body = serde_json::json!({
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 4096,
        "system": system,
        "messages": messages
    });

    let token = client.current_token();

    let mut req = client
        .client
        .post("https://api.anthropic.com/v1/messages")
        .header("anthropic-version", "2023-06-01")
        .header("content-type", "application/json");

    req = match &client.auth_mode {
        AuthMode::ApiKey => req.header("x-api-key", &token),
        AuthMode::OAuthBearer => req
            .header("Authorization", format!("Bearer {}", token))
            .header("anthropic-beta", "oauth-2025-04-20"),
    };

    let resp = req
        .json(&body)
        .send()
        .await
        .map_err(|e| ApiError::Internal(format!("Claude API request failed: {}", e)))?;

    if !resp.status().is_success() {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();

        if status.as_u16() == 401 {
            return Err(ApiError::Unauthorized(format!("Claude API 401: {}", text)));
        }

        return Err(ApiError::Internal(format!(
            "Claude API error {}: {}",
            status, text
        )));
    }

    let json: serde_json::Value = resp
        .json()
        .await
        .map_err(|e| ApiError::Internal(format!("Failed to parse Claude response: {}", e)))?;

    let text = json["content"][0]["text"]
        .as_str()
        .unwrap_or("")
        .to_string();

    Ok(text)
}

fn build_system_prompt(file_type: &ClaudeFileType) -> String {
    match file_type {
        ClaudeFileType::Skill => {
            "You are an expert at writing Claude Code skills. Skills are markdown files with YAML \
             frontmatter (description, user_invocable). Suggest improvements for clarity, \
             completeness, and effectiveness. Return JSON with 'suggestions' (array of strings), \
             'improved_content' (string with the improved skill), and 'validation_issues' (array)."
                .to_string()
        }
        ClaudeFileType::Rule => {
            "You are an expert at writing Claude Code rules. Rules guide Claude's behavior in \
             specific contexts. Suggest improvements for specificity and actionability. Return JSON \
             with 'suggestions', 'improved_content', and 'validation_issues'."
                .to_string()
        }
        ClaudeFileType::ClaudeMd => {
            "You are an expert at writing CLAUDE.md files for Claude Code projects. These files \
             provide project context, coding conventions, and instructions. Return JSON with \
             'suggestions', 'improved_content', and 'validation_issues'."
                .to_string()
        }
        ClaudeFileType::Memory => {
            "You are an expert at writing Claude Code memory files. These persist knowledge across \
             sessions. Suggest improvements for organization and usefulness. Return JSON with \
             'suggestions', 'improved_content', and 'validation_issues'."
                .to_string()
        }
        _ => {
            "You are an expert at Claude Code configuration. Analyze and suggest improvements. \
             Return JSON with 'suggestions', 'improved_content', and 'validation_issues'."
                .to_string()
        }
    }
}

fn file_type_label(file_type: &ClaudeFileType) -> &str {
    match file_type {
        ClaudeFileType::Skill => "skill",
        ClaudeFileType::Rule => "rule",
        ClaudeFileType::ClaudeMd => "CLAUDE.md",
        ClaudeFileType::Memory => "memory file",
        ClaudeFileType::Settings => "settings",
        ClaudeFileType::Plan => "plan",
    }
}

fn parse_suggestion_response(text: &str) -> Result<SuggestionResponse, ApiError> {
    // Try to parse as JSON
    if let Ok(json) = serde_json::from_str::<serde_json::Value>(text) {
        return Ok(SuggestionResponse {
            suggestions: json["suggestions"]
                .as_array()
                .map(|a| {
                    a.iter()
                        .filter_map(|v| v.as_str().map(String::from))
                        .collect()
                })
                .unwrap_or_default(),
            improved_content: json["improved_content"].as_str().map(String::from),
            validation_issues: json["validation_issues"]
                .as_array()
                .map(|a| {
                    a.iter()
                        .filter_map(|v| v.as_str().map(String::from))
                        .collect()
                })
                .unwrap_or_default(),
        });
    }

    // If not JSON, treat entire response as a suggestion
    Ok(SuggestionResponse {
        suggestions: vec![text.to_string()],
        improved_content: None,
        validation_issues: vec![],
    })
}
