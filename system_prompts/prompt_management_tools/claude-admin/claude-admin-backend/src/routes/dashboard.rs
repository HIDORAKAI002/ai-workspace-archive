use axum::extract::State;
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::fs_scanner;
use claude_admin_shared::{DashboardHealthScore, DashboardOverview};

pub async fn get_dashboard(
    State(state): State<Arc<AppState>>,
) -> Result<Json<DashboardOverview>, ApiError> {
    let overview = fs_scanner::scan_dashboard(
        &state.claude_home,
        &state.claude_json_path,
        state.claude_desktop_config_path.as_deref(),
    )
    .await?;
    Ok(Json(overview))
}

/// Lazy health score - computed on demand, not blocking the dashboard.
pub async fn get_dashboard_health(
    State(state): State<Arc<AppState>>,
) -> Result<Json<DashboardHealthScore>, ApiError> {
    let health =
        crate::services::config_health::overall_health(&state.claude_home, &state.claude_json_path)
            .await?;
    Ok(Json(DashboardHealthScore {
        health_score: health.average_score,
    }))
}
