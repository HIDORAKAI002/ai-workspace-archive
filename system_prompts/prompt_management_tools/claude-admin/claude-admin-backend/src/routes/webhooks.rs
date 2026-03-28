use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::services::webhooks;
use claude_admin_shared::{WebhookConfig, WebhookCreateRequest, WebhookUpdateRequest};

pub async fn list_webhooks(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<WebhookConfig>>, ApiError> {
    let whs = webhooks::load_webhooks(&state.claude_home);
    Ok(Json(whs))
}

pub async fn create_webhook(
    State(state): State<Arc<AppState>>,
    AppJson(req): AppJson<WebhookCreateRequest>,
) -> Result<Json<WebhookConfig>, ApiError> {
    let webhook = webhooks::create_webhook(&state.claude_home, req).await?;
    crate::services::audit::log_audit(
        &state.claude_home,
        "create",
        "webhook",
        &webhook.id,
        Some(&webhook.url),
    )
    .await;
    Ok(Json(webhook))
}

pub async fn update_webhook(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
    AppJson(req): AppJson<WebhookUpdateRequest>,
) -> Result<Json<WebhookConfig>, ApiError> {
    let webhook = webhooks::update_webhook(&state.claude_home, &id, req).await?;
    crate::services::audit::log_audit(&state.claude_home, "update", "webhook", &id, None).await;
    Ok(Json(webhook))
}

pub async fn delete_webhook(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<Json<serde_json::Value>, ApiError> {
    webhooks::delete_webhook(&state.claude_home, &id).await?;
    crate::services::audit::log_audit(&state.claude_home, "delete", "webhook", &id, None).await;
    Ok(Json(serde_json::json!({ "status": "deleted", "id": id })))
}
