use std::path::Path;

use crate::domain::errors::ApiError;
use claude_admin_shared::{WebhookConfig, WebhookCreateRequest, WebhookUpdateRequest};

/// Load webhooks from ~/.claude/webhooks.json.
pub fn load_webhooks(claude_home: &Path) -> Vec<WebhookConfig> {
    let path = claude_home.join("webhooks.json");
    if !path.exists() {
        return vec![];
    }

    std::fs::read_to_string(&path)
        .ok()
        .and_then(|c| serde_json::from_str(&c).ok())
        .unwrap_or_default()
}

/// Save webhooks.
pub async fn save_webhooks(claude_home: &Path, webhooks: &[WebhookConfig]) -> Result<(), ApiError> {
    let path = claude_home.join("webhooks.json");
    let content = serde_json::to_string_pretty(webhooks)
        .map_err(|e| ApiError::Internal(format!("Serialize error: {}", e)))?;
    crate::services::file_ops::write_with_backup(claude_home, &path, &content).await
}

/// Create a new webhook.
pub async fn create_webhook(
    claude_home: &Path,
    req: WebhookCreateRequest,
) -> Result<WebhookConfig, ApiError> {
    let mut webhooks = load_webhooks(claude_home);

    let id = format!("wh_{}", chrono::Utc::now().timestamp_millis());
    let webhook = WebhookConfig {
        id,
        url: req.url,
        events: req.events,
        secret: req.secret,
        active: true,
    };

    webhooks.push(webhook.clone());
    save_webhooks(claude_home, &webhooks).await?;

    Ok(webhook)
}

/// Update an existing webhook.
pub async fn update_webhook(
    claude_home: &Path,
    id: &str,
    req: WebhookUpdateRequest,
) -> Result<WebhookConfig, ApiError> {
    let mut webhooks = load_webhooks(claude_home);

    let webhook = webhooks
        .iter_mut()
        .find(|w| w.id == id)
        .ok_or_else(|| ApiError::NotFound(format!("Webhook '{}' not found", id)))?;

    if let Some(url) = req.url {
        webhook.url = url;
    }
    if let Some(events) = req.events {
        webhook.events = events;
    }
    if let Some(secret) = req.secret {
        webhook.secret = Some(secret);
    }
    if let Some(active) = req.active {
        webhook.active = active;
    }

    let result = webhook.clone();
    save_webhooks(claude_home, &webhooks).await?;
    Ok(result)
}

/// Delete a webhook.
pub async fn delete_webhook(claude_home: &Path, id: &str) -> Result<(), ApiError> {
    let mut webhooks = load_webhooks(claude_home);
    let before = webhooks.len();
    webhooks.retain(|w| w.id != id);
    if webhooks.len() == before {
        return Err(ApiError::NotFound(format!("Webhook '{}' not found", id)));
    }
    save_webhooks(claude_home, &webhooks).await
}

/// Fire a webhook event (fire-and-forget).
pub fn fire_webhook(webhooks: &[WebhookConfig], event: &str, payload: serde_json::Value) {
    for webhook in webhooks {
        if !webhook.active || !webhook.events.iter().any(|e| e == event || e == "*") {
            continue;
        }

        let url = webhook.url.clone();
        let secret = webhook.secret.clone();
        let payload = payload.clone();
        let event = event.to_string();

        tokio::spawn(async move {
            let body = serde_json::json!({ "event": event, "payload": payload, "timestamp": chrono::Utc::now().to_rfc3339() });

            let mut builder = reqwest::Client::new().post(&url).json(&body);

            // Add HMAC signature if secret is configured
            if let Some(ref secret) = secret {
                if let Ok(body_bytes) = serde_json::to_vec(&body) {
                    use hmac::{Hmac, Mac};
                    use sha2::Sha256;
                    type HmacSha256 = Hmac<Sha256>;
                    if let Ok(mut mac) = HmacSha256::new_from_slice(secret.as_bytes()) {
                        mac.update(&body_bytes);
                        let signature = hex_encode(&mac.finalize().into_bytes());
                        builder =
                            builder.header("X-Webhook-Signature", format!("sha256={}", signature));
                    }
                }
            }

            match builder.send().await {
                Ok(resp) => {
                    tracing::debug!("Webhook {} fired: {}", url, resp.status());
                }
                Err(e) => {
                    tracing::warn!("Webhook {} failed: {}", url, e);
                }
            }
        });
    }
}

fn hex_encode(bytes: &[u8]) -> String {
    bytes.iter().map(|b| format!("{:02x}", b)).collect()
}
