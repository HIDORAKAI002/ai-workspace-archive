use std::collections::HashMap;
use std::path::Path;

use crate::domain::errors::ApiError;
use claude_admin_shared::*;

/// Parse stats-cache.json and aggregate session data for analytics overview.
pub fn get_analytics_overview(claude_home: &Path) -> Result<AnalyticsOverview, ApiError> {
    let stats_cache = parse_stats_cache(claude_home);
    let session_data = aggregate_session_meta(claude_home);
    let facets = parse_facets(claude_home);

    // Calculate total cost with model-specific pricing
    let estimated_total_cost_usd = stats_cache
        .model_usage
        .iter()
        .map(|m| {
            let model_lower = m.model.to_lowercase();
            let (input_rate, output_rate) = if model_lower.contains("opus") {
                (15.0, 75.0) // $/M tokens
            } else if model_lower.contains("haiku") {
                (0.80, 4.0)
            } else {
                // Sonnet (default)
                (3.0, 15.0)
            };
            ((m.input_tokens as f64 * input_rate) + (m.output_tokens as f64 * output_rate))
                / 1_000_000.0
        })
        .sum();

    Ok(AnalyticsOverview {
        total_sessions: stats_cache.total_sessions + session_data.session_count,
        total_messages: stats_cache.total_messages,
        first_session_date: stats_cache.first_session_date,
        daily_activity: stats_cache.daily_activity,
        hour_distribution: stats_cache.hour_distribution,
        model_usage: stats_cache.model_usage,
        tool_ranking: session_data.tool_ranking,
        language_breakdown: session_data.language_breakdown,
        outcome_distribution: facets,
        total_git_commits: session_data.total_git_commits,
        total_lines_added: session_data.total_lines_added,
        total_lines_removed: session_data.total_lines_removed,
        estimated_total_cost_usd,
    })
}

/// Get per-project analytics.
pub fn get_project_analytics(
    claude_home: &Path,
    claude_json_path: &Path,
) -> Result<Vec<ProjectAnalytics>, ApiError> {
    let session_meta_dir = claude_home.join("usage-data").join("session-meta");
    if !session_meta_dir.exists() {
        return Ok(vec![]);
    }

    let mut project_stats: HashMap<String, ProjectAnalytics> = HashMap::new();

    if let Ok(entries) = std::fs::read_dir(&session_meta_dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.extension().is_some_and(|e| e == "json") {
                if let Ok(content) = std::fs::read_to_string(&path) {
                    if let Ok(json) = serde_json::from_str::<serde_json::Value>(&content) {
                        let project_path = json
                            .get("projectPath")
                            .or_else(|| json.get("project_path"))
                            .and_then(|v| v.as_str())
                            .unwrap_or("unknown")
                            .to_string();

                        let name = Path::new(&project_path)
                            .file_name()
                            .unwrap_or_default()
                            .to_string_lossy()
                            .to_string();

                        let input_tokens = json
                            .get("inputTokens")
                            .or_else(|| json.get("input_tokens"))
                            .and_then(|v| v.as_u64())
                            .unwrap_or(0);
                        let output_tokens = json
                            .get("outputTokens")
                            .or_else(|| json.get("output_tokens"))
                            .and_then(|v| v.as_u64())
                            .unwrap_or(0);

                        let entry =
                            project_stats
                                .entry(project_path.clone())
                                .or_insert_with(|| ProjectAnalytics {
                                    path: project_path,
                                    name,
                                    session_count: 0,
                                    total_input_tokens: 0,
                                    total_output_tokens: 0,
                                    estimated_cost_usd: 0.0,
                                    languages: vec![],
                                });

                        entry.session_count += 1;
                        entry.total_input_tokens += input_tokens;
                        entry.total_output_tokens += output_tokens;
                    }
                }
            }
        }
    }

    // Calculate estimated costs using blended rate
    // Opus: $15/M input, $75/M output; Sonnet: $3/M input, $15/M output; Haiku: $0.80/M input, $4/M output
    // Use Sonnet as default rate (most common in Claude Code usage)
    let mut projects: Vec<ProjectAnalytics> = project_stats
        .into_values()
        .map(|mut p| {
            p.estimated_cost_usd = (p.total_input_tokens as f64 * 3.0
                + p.total_output_tokens as f64 * 15.0)
                / 1_000_000.0;
            p
        })
        .collect();

    projects.sort_by(|a, b| b.total_output_tokens.cmp(&a.total_output_tokens));

    // Filter to known projects from claude.json
    let _ = claude_json_path; // available if needed for filtering
    Ok(projects)
}

struct StatsCacheData {
    total_sessions: u64,
    total_messages: u64,
    first_session_date: Option<String>,
    daily_activity: Vec<DailyActivity>,
    hour_distribution: Vec<(u8, u64)>,
    model_usage: Vec<ModelUsageEntry>,
}

fn parse_stats_cache(claude_home: &Path) -> StatsCacheData {
    let path = claude_home.join("stats-cache.json");
    let mut data = StatsCacheData {
        total_sessions: 0,
        total_messages: 0,
        first_session_date: None,
        daily_activity: vec![],
        hour_distribution: vec![],
        model_usage: vec![],
    };

    let content = match std::fs::read_to_string(&path) {
        Ok(c) => c,
        Err(_) => return data,
    };

    let json: serde_json::Value = match serde_json::from_str(&content) {
        Ok(v) => v,
        Err(_) => return data,
    };

    data.total_sessions = json
        .get("totalSessions")
        .and_then(|v| v.as_u64())
        .unwrap_or(0);
    data.total_messages = json
        .get("totalMessages")
        .and_then(|v| v.as_u64())
        .unwrap_or(0);
    data.first_session_date = json
        .get("firstSessionDate")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string());

    // Parse daily activity (array of {date, messageCount, sessionCount, toolCallCount})
    if let Some(daily) = json.get("dailyActivity").and_then(|v| v.as_array()) {
        let mut activities: Vec<DailyActivity> = daily
            .iter()
            .filter_map(|val| {
                let date = val.get("date").and_then(|v| v.as_str())?.to_string();
                let msg_count = val
                    .get("messageCount")
                    .and_then(|v| v.as_u64())
                    .unwrap_or(0);
                let sess_count = val
                    .get("sessionCount")
                    .and_then(|v| v.as_u64())
                    .unwrap_or(0);
                let tool_count = val
                    .get("toolCallCount")
                    .and_then(|v| v.as_u64())
                    .unwrap_or(0);
                Some(DailyActivity {
                    date,
                    message_count: msg_count,
                    session_count: sess_count,
                    tool_call_count: tool_count,
                })
            })
            .collect();
        activities.sort_by(|a, b| a.date.cmp(&b.date));
        data.daily_activity = activities;
    }

    // Parse hour distribution
    if let Some(hours) = json.get("hourCounts").and_then(|v| v.as_object()) {
        let mut dist: Vec<(u8, u64)> = hours
            .iter()
            .filter_map(|(h, count)| {
                let hour: u8 = h.parse().ok()?;
                let c = count.as_u64()?;
                Some((hour, c))
            })
            .collect();
        dist.sort_by_key(|(h, _)| *h);
        data.hour_distribution = dist;
    }

    // Parse model usage
    if let Some(models) = json.get("modelUsage").and_then(|v| v.as_object()) {
        data.model_usage = models
            .iter()
            .map(|(model, val)| {
                let input = val.get("inputTokens").and_then(|v| v.as_u64()).unwrap_or(0);
                let output = val
                    .get("outputTokens")
                    .and_then(|v| v.as_u64())
                    .unwrap_or(0);
                let cache = val
                    .get("cacheReadTokens")
                    .and_then(|v| v.as_u64())
                    .unwrap_or(0);
                ModelUsageEntry {
                    model: model.clone(),
                    input_tokens: input,
                    output_tokens: output,
                    cache_read_tokens: cache,
                }
            })
            .collect();
    }

    data
}

struct SessionAggregation {
    session_count: u64,
    tool_ranking: Vec<(String, u64)>,
    language_breakdown: Vec<(String, u64)>,
    total_git_commits: u64,
    total_lines_added: u64,
    total_lines_removed: u64,
}

fn aggregate_session_meta(claude_home: &Path) -> SessionAggregation {
    let session_meta_dir = claude_home.join("usage-data").join("session-meta");
    let mut agg = SessionAggregation {
        session_count: 0,
        tool_ranking: vec![],
        language_breakdown: vec![],
        total_git_commits: 0,
        total_lines_added: 0,
        total_lines_removed: 0,
    };

    if !session_meta_dir.exists() {
        return agg;
    }

    let mut tool_counts: HashMap<String, u64> = HashMap::new();
    let mut lang_counts: HashMap<String, u64> = HashMap::new();

    if let Ok(entries) = std::fs::read_dir(&session_meta_dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.extension().is_none_or(|e| e != "json") {
                continue;
            }
            let content = match std::fs::read_to_string(&path) {
                Ok(c) => c,
                Err(_) => continue,
            };
            let json: serde_json::Value = match serde_json::from_str(&content) {
                Ok(v) => v,
                Err(_) => continue,
            };

            agg.session_count += 1;

            // Tool counts (snake_case or camelCase)
            let tools_val = json.get("tool_counts").or_else(|| json.get("toolCounts"));
            if let Some(tools) = tools_val.and_then(|v| v.as_object()) {
                for (tool, count) in tools {
                    let c = count.as_u64().unwrap_or(0);
                    *tool_counts.entry(tool.clone()).or_insert(0) += c;
                }
            }

            // Languages
            if let Some(langs) = json.get("languages").and_then(|v| v.as_object()) {
                for (lang, count) in langs {
                    let c = count.as_u64().unwrap_or(0);
                    *lang_counts.entry(lang.clone()).or_insert(0) += c;
                }
            }

            // Git stats (flat fields or nested)
            agg.total_git_commits += json
                .get("git_commits")
                .or_else(|| json.pointer("/git/commits"))
                .and_then(|v| v.as_u64())
                .unwrap_or(0);
            agg.total_lines_added += json
                .get("lines_added")
                .or_else(|| json.pointer("/git/linesAdded"))
                .and_then(|v| v.as_u64())
                .unwrap_or(0);
            agg.total_lines_removed += json
                .get("lines_removed")
                .or_else(|| json.pointer("/git/linesRemoved"))
                .and_then(|v| v.as_u64())
                .unwrap_or(0);
        }
    }

    // Sort by count descending
    let mut tools: Vec<(String, u64)> = tool_counts.into_iter().collect();
    tools.sort_by(|a, b| b.1.cmp(&a.1));
    agg.tool_ranking = tools;

    let mut langs: Vec<(String, u64)> = lang_counts.into_iter().collect();
    langs.sort_by(|a, b| b.1.cmp(&a.1));
    agg.language_breakdown = langs;

    agg
}

fn parse_facets(claude_home: &Path) -> Vec<(String, u64)> {
    let facets_dir = claude_home.join("usage-data").join("facets");
    if !facets_dir.exists() {
        return vec![];
    }

    let mut outcome_counts: HashMap<String, u64> = HashMap::new();

    if let Ok(entries) = std::fs::read_dir(&facets_dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.extension().is_none_or(|e| e != "json") {
                continue;
            }
            if let Ok(content) = std::fs::read_to_string(&path) {
                if let Ok(json) = serde_json::from_str::<serde_json::Value>(&content) {
                    if let Some(outcome) = json.get("outcome").and_then(|v| v.as_str()) {
                        *outcome_counts.entry(outcome.to_string()).or_insert(0) += 1;
                    }
                }
            }
        }
    }

    let mut outcomes: Vec<(String, u64)> = outcome_counts.into_iter().collect();
    outcomes.sort_by(|a, b| b.1.cmp(&a.1));
    outcomes
}

/// Generate personalized tips based on analytics data.
/// Rule-based heuristics, no LLM call required.
pub fn generate_tips(analytics: &AnalyticsOverview, hooks_count: usize) -> Vec<TeachMeTip> {
    let mut tips = Vec::new();

    // 1. Task vs Bash ratio
    let bash_count = analytics
        .tool_ranking
        .iter()
        .find(|(name, _)| name == "Bash")
        .map(|(_, c)| *c)
        .unwrap_or(0);
    let task_count = analytics
        .tool_ranking
        .iter()
        .find(|(name, _)| name == "Task")
        .map(|(_, c)| *c)
        .unwrap_or(0);
    if bash_count > 100 && task_count < bash_count / 10 {
        tips.push(TeachMeTip {
            id: "task_underused".to_string(),
            category: TipCategory::Tool,
            title: "Task tool underused".to_string(),
            body: format!(
                "You use Bash {}x but Task only {}x. Task can launch parallel agents for complex work.",
                bash_count, task_count
            ),
            data_point: format!("Bash: {}, Task: {}", bash_count, task_count),
            action_url: Some("/docs?section=optimization".to_string()),
        });
    }

    // 2. No hooks configured
    if analytics.total_git_commits > 20 && hooks_count == 0 {
        tips.push(TeachMeTip {
            id: "no_hooks".to_string(),
            category: TipCategory::Config,
            title: "No hooks configured".to_string(),
            body: format!(
                "{} git commits but no hooks configured. Hooks can automate tests before commits.",
                analytics.total_git_commits
            ),
            data_point: format!("{} commits, 0 hooks", analytics.total_git_commits),
            action_url: Some("/docs?section=optimization".to_string()),
        });
    }

    // 3. Long sessions
    if analytics.total_sessions > 10 {
        let avg_messages = analytics.total_messages as f64 / analytics.total_sessions as f64;
        if avg_messages > 50.0 {
            tips.push(TeachMeTip {
                id: "long_sessions".to_string(),
                category: TipCategory::Performance,
                title: "Very long sessions detected".to_string(),
                body: format!(
                    "Average {:.0} messages per session. Smaller, focused tasks usually yield better results.",
                    avg_messages
                ),
                data_point: format!("{:.0} avg messages/session", avg_messages),
                action_url: Some("/docs?section=optimization".to_string()),
            });
        }
    }

    // 4. High cost
    if analytics.estimated_total_cost_usd > 50.0 {
        tips.push(TeachMeTip {
            id: "high_cost".to_string(),
            category: TipCategory::Performance,
            title: "Cost optimization opportunity".to_string(),
            body: format!(
                "Estimated ${:.2} total spend. Consider using Haiku for simpler tasks to reduce costs.",
                analytics.estimated_total_cost_usd
            ),
            data_point: format!("${:.2} estimated total", analytics.estimated_total_cost_usd),
            action_url: Some("/docs?section=optimization".to_string()),
        });
    }

    // 5. Write tool underused
    let write_count = analytics
        .tool_ranking
        .iter()
        .find(|(name, _)| name == "Write")
        .map(|(_, c)| *c)
        .unwrap_or(0);
    let edit_count = analytics
        .tool_ranking
        .iter()
        .find(|(name, _)| name == "Edit")
        .map(|(_, c)| *c)
        .unwrap_or(0);
    if edit_count > 100 && write_count < 5 {
        tips.push(TeachMeTip {
            id: "write_underused".to_string(),
            category: TipCategory::Tool,
            title: "Write tool rarely used".to_string(),
            body: format!(
                "You use Edit {}x but Write only {}x. For new files, Write is more efficient.",
                edit_count, write_count
            ),
            data_point: format!("Edit: {}, Write: {}", edit_count, write_count),
            action_url: Some("/docs?section=optimization".to_string()),
        });
    }

    // 6. Single model usage
    if analytics.model_usage.len() == 1 && analytics.total_sessions > 20 {
        let model = &analytics.model_usage[0].model;
        tips.push(TeachMeTip {
            id: "single_model".to_string(),
            category: TipCategory::Workflow,
            title: "Only using one model".to_string(),
            body: format!(
                "All {} sessions use {}. Try Haiku for quick tasks or Opus for complex reasoning.",
                analytics.total_sessions, model
            ),
            data_point: format!("100% {}", model),
            action_url: Some("/docs?section=optimization".to_string()),
        });
    }

    // 7. No git integration
    if analytics.total_git_commits == 0 && analytics.total_sessions > 30 {
        tips.push(TeachMeTip {
            id: "no_git".to_string(),
            category: TipCategory::Workflow,
            title: "No git commits found".to_string(),
            body: format!(
                "{} sessions but 0 git commits tracked. Claude can commit changes directly.",
                analytics.total_sessions
            ),
            data_point: format!("{} sessions, 0 commits", analytics.total_sessions),
            action_url: Some("/docs?section=optimization".to_string()),
        });
    }

    // 8. Heavy code deletion
    if analytics.total_lines_removed > analytics.total_lines_added * 2
        && analytics.total_lines_removed > 1000
    {
        tips.push(TeachMeTip {
            id: "heavy_deletion".to_string(),
            category: TipCategory::Workflow,
            title: "More code deleted than added".to_string(),
            body: format!(
                "+{} / -{} lines. Consider being more specific in prompts to reduce rework.",
                analytics.total_lines_added, analytics.total_lines_removed
            ),
            data_point: format!(
                "+{} / -{}",
                analytics.total_lines_added, analytics.total_lines_removed
            ),
            action_url: Some("/docs?section=optimization".to_string()),
        });
    }

    // Cap at 5 tips
    tips.truncate(5);
    tips
}
