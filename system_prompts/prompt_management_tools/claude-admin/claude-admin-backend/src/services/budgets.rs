use std::path::Path;

use crate::domain::errors::ApiError;
use claude_admin_shared::{BudgetConfig, BudgetStatus};

/// Load budget config from ~/.claude/budget.json.
pub fn load_budget_config(claude_home: &Path) -> BudgetConfig {
    let path = claude_home.join("budget.json");
    if !path.exists() {
        return BudgetConfig {
            daily_budget_usd: None,
            weekly_budget_usd: None,
            monthly_budget_usd: None,
        };
    }

    std::fs::read_to_string(&path)
        .ok()
        .and_then(|c| serde_json::from_str(&c).ok())
        .unwrap_or(BudgetConfig {
            daily_budget_usd: None,
            weekly_budget_usd: None,
            monthly_budget_usd: None,
        })
}

/// Save budget config. Rejects negative budget values.
pub async fn save_budget_config(claude_home: &Path, config: &BudgetConfig) -> Result<(), ApiError> {
    if config.daily_budget_usd.is_some_and(|v| v < 0.0) {
        return Err(ApiError::BadRequest(
            "daily_budget_usd must not be negative".into(),
        ));
    }
    if config.weekly_budget_usd.is_some_and(|v| v < 0.0) {
        return Err(ApiError::BadRequest(
            "weekly_budget_usd must not be negative".into(),
        ));
    }
    if config.monthly_budget_usd.is_some_and(|v| v < 0.0) {
        return Err(ApiError::BadRequest(
            "monthly_budget_usd must not be negative".into(),
        ));
    }

    let path = claude_home.join("budget.json");
    let content = serde_json::to_string_pretty(config)
        .map_err(|e| ApiError::Internal(format!("Serialize error: {}", e)))?;
    crate::services::file_ops::write_with_backup(claude_home, &path, &content).await
}

/// Get budget status with current costs and alerts.
pub fn get_budget_status(
    claude_home: &Path,
    overview: &claude_admin_shared::AnalyticsOverview,
) -> BudgetStatus {
    let config = load_budget_config(claude_home);
    let today = chrono::Utc::now().format("%Y-%m-%d").to_string();

    // Calculate today's cost from daily_activity
    let current_daily_cost: f64 = overview
        .daily_activity
        .iter()
        .filter(|d| d.date == today)
        .map(|_| {
            // Estimate based on total cost and sessions
            if overview.total_sessions > 0 {
                overview.estimated_total_cost_usd / overview.total_sessions as f64
            } else {
                0.0
            }
        })
        .sum();

    // Estimate weekly/monthly from total
    let days_total = overview.daily_activity.len().max(1) as f64;
    let daily_avg = overview.estimated_total_cost_usd / days_total;
    let current_weekly_cost = daily_avg * 7.0;
    let current_monthly_cost = daily_avg * 30.0;

    let mut alerts = Vec::new();

    if let Some(daily_limit) = config.daily_budget_usd {
        if current_daily_cost > daily_limit * 0.8 {
            alerts.push(format!(
                "Daily cost (${:.2}) approaching budget (${:.2})",
                current_daily_cost, daily_limit
            ));
        }
    }

    if let Some(weekly_limit) = config.weekly_budget_usd {
        if current_weekly_cost > weekly_limit * 0.8 {
            alerts.push(format!(
                "Weekly cost estimate (${:.2}) approaching budget (${:.2})",
                current_weekly_cost, weekly_limit
            ));
        }
    }

    if let Some(monthly_limit) = config.monthly_budget_usd {
        if current_monthly_cost > monthly_limit * 0.8 {
            alerts.push(format!(
                "Monthly cost estimate (${:.2}) approaching budget (${:.2})",
                current_monthly_cost, monthly_limit
            ));
        }
    }

    // Avoid negative zero display
    let current_daily_cost = if current_daily_cost == 0.0 {
        0.0
    } else {
        current_daily_cost
    };

    BudgetStatus {
        config,
        current_daily_cost,
        current_weekly_cost,
        current_monthly_cost,
        alerts,
    }
}
