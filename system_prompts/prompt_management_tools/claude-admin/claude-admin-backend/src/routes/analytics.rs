use axum::extract::{Query, State};
use axum::http::{header, StatusCode};
use axum::response::Response;
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::analytics;
use claude_admin_shared::*;

#[derive(serde::Deserialize)]
pub struct AnalyticsQuery {
    pub from: Option<String>,
    pub to: Option<String>,
}

pub async fn get_analytics_tips(
    State(state): State<Arc<AppState>>,
) -> Result<Json<TeachMeResponse>, ApiError> {
    let overview = analytics::get_analytics_overview(&state.claude_home)?;

    // Count hooks for tips
    let settings = crate::services::fs_scanner::scan_settings(&state.claude_home)
        .await
        .unwrap_or_else(|_| SettingsOverview {
            global_settings: serde_json::Value::Object(serde_json::Map::new()),
            hooks: HooksConfig::default(),
        });
    let hooks_count = settings.hooks.pre_tool_use.len()
        + settings.hooks.post_tool_use.len()
        + settings.hooks.notification.len()
        + settings.hooks.stop.len()
        + settings.hooks.user_prompt_submit.len()
        + settings.hooks.session_start.len();

    let tips = analytics::generate_tips(&overview, hooks_count);
    Ok(Json(TeachMeResponse { tips }))
}

pub async fn get_analytics_overview(
    State(state): State<Arc<AppState>>,
    Query(query): Query<AnalyticsQuery>,
) -> Result<Json<AnalyticsOverview>, ApiError> {
    let mut overview = analytics::get_analytics_overview(&state.claude_home)?;

    // Apply date filtering if specified
    if query.from.is_some() || query.to.is_some() {
        let from = query.from.as_deref().unwrap_or("0000-00-00");
        let to = query.to.as_deref().unwrap_or("9999-99-99");

        overview
            .daily_activity
            .retain(|d| d.date.as_str() >= from && d.date.as_str() <= to);

        // Recalculate totals for filtered range
        let filtered_messages: u64 = overview
            .daily_activity
            .iter()
            .map(|d| d.message_count)
            .sum();
        let filtered_sessions: u64 = overview
            .daily_activity
            .iter()
            .map(|d| d.session_count)
            .sum();
        if filtered_messages > 0 {
            overview.total_messages = filtered_messages;
        }
        if filtered_sessions > 0 {
            overview.total_sessions = filtered_sessions;
        }
    }

    Ok(Json(overview))
}

pub async fn get_project_analytics(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<ProjectAnalytics>>, ApiError> {
    let projects = analytics::get_project_analytics(&state.claude_home, &state.claude_json_path)?;
    Ok(Json(projects))
}

#[derive(serde::Deserialize)]
pub struct ExportQuery {
    pub format: Option<String>,
}

pub async fn export_analytics(
    State(state): State<Arc<AppState>>,
    Query(query): Query<ExportQuery>,
) -> Result<Response, ApiError> {
    let overview = analytics::get_analytics_overview(&state.claude_home)?;
    let format = query.format.as_deref().unwrap_or("json");

    match format {
        "csv" => {
            let mut csv = String::new();

            // Section 1: Summary
            csv.push_str("# Summary\n");
            csv.push_str("metric,value\n");
            csv.push_str(&format!("total_sessions,{}\n", overview.total_sessions));
            csv.push_str(&format!("total_messages,{}\n", overview.total_messages));
            csv.push_str(&format!(
                "first_session_date,{}\n",
                overview.first_session_date.as_deref().unwrap_or("-")
            ));
            csv.push_str(&format!("git_commits,{}\n", overview.total_git_commits));
            csv.push_str(&format!("lines_added,{}\n", overview.total_lines_added));
            csv.push_str(&format!("lines_removed,{}\n", overview.total_lines_removed));
            csv.push_str(&format!(
                "estimated_cost_usd,{:.2}\n",
                overview.estimated_total_cost_usd
            ));

            // Section 2: Daily Activity
            csv.push_str("\n# Daily Activity\n");
            csv.push_str("date,messages,sessions,tool_calls\n");
            for d in &overview.daily_activity {
                csv.push_str(&format!(
                    "{},{},{},{}\n",
                    d.date, d.message_count, d.session_count, d.tool_call_count
                ));
            }

            // Section 3: Model Usage
            csv.push_str("\n# Model Usage\n");
            csv.push_str("model,input_tokens,output_tokens,cache_read_tokens\n");
            for m in &overview.model_usage {
                csv.push_str(&format!(
                    "{},{},{},{}\n",
                    m.model, m.input_tokens, m.output_tokens, m.cache_read_tokens
                ));
            }

            // Section 4: Top Tools
            csv.push_str("\n# Tool Usage\n");
            csv.push_str("tool,call_count\n");
            for (tool, count) in &overview.tool_ranking {
                csv.push_str(&format!("{},{}\n", tool, count));
            }

            // Section 5: Languages
            csv.push_str("\n# Languages\n");
            csv.push_str("language,file_count\n");
            for (lang, count) in &overview.language_breakdown {
                csv.push_str(&format!("{},{}\n", lang, count));
            }

            // Section 6: Outcomes
            csv.push_str("\n# Session Outcomes\n");
            csv.push_str("outcome,count\n");
            for (outcome, count) in &overview.outcome_distribution {
                csv.push_str(&format!("{},{}\n", outcome, count));
            }

            // Section 7: Hour Distribution
            csv.push_str("\n# Activity by Hour\n");
            csv.push_str("hour,session_count\n");
            for (hour, count) in &overview.hour_distribution {
                csv.push_str(&format!("{},{}\n", hour, count));
            }

            Ok(Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, "text/csv")
                .header(
                    header::CONTENT_DISPOSITION,
                    "attachment; filename=\"analytics.csv\"",
                )
                .body(axum::body::Body::from(csv))
                .unwrap())
        }
        "json" => {
            // Build a clean export object with named keys instead of tuple arrays
            let hour_dist: Vec<serde_json::Value> = overview
                .hour_distribution
                .iter()
                .map(|(h, c)| serde_json::json!({"hour": h, "sessions": c}))
                .collect();
            let tools: Vec<serde_json::Value> = overview
                .tool_ranking
                .iter()
                .map(|(t, c)| serde_json::json!({"tool": t, "calls": c}))
                .collect();
            let langs: Vec<serde_json::Value> = overview
                .language_breakdown
                .iter()
                .map(|(l, c)| serde_json::json!({"language": l, "files": c}))
                .collect();
            let outcomes: Vec<serde_json::Value> = overview
                .outcome_distribution
                .iter()
                .map(|(o, c)| serde_json::json!({"outcome": o, "count": c}))
                .collect();

            let export = serde_json::json!({
                "summary": {
                    "total_sessions": overview.total_sessions,
                    "total_messages": overview.total_messages,
                    "first_session_date": overview.first_session_date,
                    "estimated_cost_usd": (overview.estimated_total_cost_usd * 100.0).round() / 100.0,
                    "git_commits": overview.total_git_commits,
                    "lines_added": overview.total_lines_added,
                    "lines_removed": overview.total_lines_removed,
                },
                "daily_activity": overview.daily_activity,
                "hour_distribution": hour_dist,
                "model_usage": overview.model_usage,
                "tool_ranking": tools,
                "language_breakdown": langs,
                "outcome_distribution": outcomes,
            });

            let json = serde_json::to_string_pretty(&export)
                .map_err(|e| ApiError::Internal(format!("Serialize error: {}", e)))?;

            Ok(Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, "application/json")
                .header(
                    header::CONTENT_DISPOSITION,
                    "attachment; filename=\"analytics.json\"",
                )
                .body(axum::body::Body::from(json))
                .unwrap())
        }
        other => Err(ApiError::BadRequest(format!(
            "Unsupported export format '{}'. Use 'json' or 'csv'.",
            other
        ))),
    }
}
