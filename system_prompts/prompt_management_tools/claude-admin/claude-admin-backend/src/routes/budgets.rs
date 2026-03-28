use axum::extract::State;
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::services::{analytics, budgets};
use claude_admin_shared::{BudgetConfig, BudgetStatus};

pub async fn get_budget_status(
    State(state): State<Arc<AppState>>,
) -> Result<Json<BudgetStatus>, ApiError> {
    let overview = analytics::get_analytics_overview(&state.claude_home)?;
    let status = budgets::get_budget_status(&state.claude_home, &overview);
    Ok(Json(status))
}

pub async fn update_budget(
    State(state): State<Arc<AppState>>,
    AppJson(config): AppJson<BudgetConfig>,
) -> Result<Json<BudgetConfig>, ApiError> {
    budgets::save_budget_config(&state.claude_home, &config).await?;
    crate::services::audit::log_audit(&state.claude_home, "update", "budget", "config", None).await;

    let webhooks = crate::services::webhooks::load_webhooks(&state.claude_home);
    crate::services::webhooks::fire_webhook(
        &webhooks,
        "budget.updated",
        serde_json::json!({"config": config}),
    );

    Ok(Json(config))
}
