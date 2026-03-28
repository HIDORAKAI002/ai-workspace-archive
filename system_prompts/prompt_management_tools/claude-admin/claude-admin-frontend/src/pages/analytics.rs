use claude_admin_shared::{AnalyticsOverview, TeachMeResponse, TipCategory};
use leptos::*;

use crate::api;
use crate::i18n::t;

#[component]
pub fn AnalyticsPage() -> impl IntoView {
    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "Analytics".to_string(),
        description: "View usage analytics and tips for Claude Code. See session statistics, token usage, cost estimates, and actionable improvement tips.".to_string(),
        available_actions: vec![
            "Filter analytics by date range".to_string(),
            "View usage tips and recommendations".to_string(),
            "Export analytics data".to_string(),
            "View per-project analytics".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    let from_date = create_rw_signal(String::new());
    let to_date = create_rw_signal(String::new());

    let tips = create_resource(
        || (),
        |_| async move { api::get::<TeachMeResponse>("/analytics/tips").await },
    );

    let analytics = create_resource(
        move || (from_date.get(), to_date.get()),
        move |(from, to)| async move {
            let mut path = "/analytics/overview".to_string();
            let mut params = Vec::new();
            if !from.is_empty() {
                params.push(format!("from={}", from));
            }
            if !to.is_empty() {
                params.push(format!("to={}", to));
            }
            if !params.is_empty() {
                path = format!("{}?{}", path, params.join("&"));
            }
            api::get::<AnalyticsOverview>(&path).await
        },
    );

    let export_base = move || {
        let base = crate::api::api_base_url();
        format!("{}/analytics/export", base)
    };

    view! {
        <div class="page-header">
            <h2>{t("analytics.title")}</h2>
            <p>{t("analytics.subtitle")}</p>
        </div>

        // Tips strip
        {move || tips.get().map(|result| {
            if let Ok(data) = result {
                if !data.tips.is_empty() {
                    return view! {
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 0.75rem;">{t("analytics.tips_title")}</h4>
                            <div style="display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 0.5rem;">
                                {data.tips.into_iter().map(|tip| {
                                    let cat_color = match tip.category {
                                        TipCategory::Tool => "#3b82f6",
                                        TipCategory::Workflow => "#8b5cf6",
                                        TipCategory::Performance => "#f97316",
                                        TipCategory::Config => "#22c55e",
                                    };
                                    let cat_label = match tip.category {
                                        TipCategory::Tool => t("analytics.tip_category_tool"),
                                        TipCategory::Workflow => t("analytics.tip_category_workflow"),
                                        TipCategory::Performance => t("analytics.tip_category_performance"),
                                        TipCategory::Config => t("analytics.tip_category_config"),
                                    };
                                    view! {
                                        <div class="card" style=format!(
                                            "min-width: 280px; max-width: 340px; flex-shrink: 0; border-top: 3px solid {};",
                                            cat_color
                                        )>
                                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                                <span class="badge" style=format!(
                                                    "background: {}20; color: {};", cat_color, cat_color
                                                )>{cat_label}</span>
                                            </div>
                                            <div style="font-weight: 600; font-size: 0.9375rem; margin-bottom: 0.25rem;">
                                                {tip.title}
                                            </div>
                                            <p style="color: var(--text-secondary); font-size: 0.8125rem; line-height: 1.5; margin-bottom: 0.5rem;">
                                                {tip.body}
                                            </p>
                                            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">
                                                {tip.data_point}
                                            </div>
                                            {tip.action_url.map(|url| view! {
                                                <a
                                                    href=url
                                                    style="display: inline-block; margin-top: 0.5rem; font-size: 0.8rem; color: var(--accent);"
                                                >{t("analytics.tips_learn_more")}</a>
                                            })}
                                        </div>
                                    }
                                }).collect_view()}
                            </div>
                        </div>
                    }.into_view();
                }
            }
            view! {}.into_view()
        })}

        // Date filter controls
        <div class="card" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <label style="font-size: 0.875rem; font-weight: 500;">{t("analytics.filter")}</label>
            <input
                type="date"
                style="padding: 0.375rem 0.5rem; border: 1px solid var(--border); border-radius: 4px; background: var(--bg-secondary); color: var(--text);"
                prop:value=move || from_date.get()
                on:input=move |ev| from_date.set(event_target_value(&ev))
            />
            <span style="color: var(--text-muted);">{t("analytics.to")}</span>
            <input
                type="date"
                style="padding: 0.375rem 0.5rem; border: 1px solid var(--border); border-radius: 4px; background: var(--bg-secondary); color: var(--text);"
                prop:value=move || to_date.get()
                on:input=move |ev| to_date.set(event_target_value(&ev))
            />
            <button
                class="btn btn-sm btn-ghost"
                on:click=move |_| { from_date.set(String::new()); to_date.set(String::new()); }
            >
                {t("analytics.clear")}
            </button>
            <div style="margin-left: auto; display: flex; gap: 0.5rem;">
                <a
                    class="btn btn-sm btn-secondary"
                    href=move || format!("{}?format=csv", export_base())
                    target="_blank"
                    download="analytics.csv"
                >
                    {t("analytics.export_csv")}
                </a>
                <a
                    class="btn btn-sm btn-secondary"
                    href=move || format!("{}?format=json", export_base())
                    target="_blank"
                    download="analytics.json"
                >
                    {t("analytics.export_json")}
                </a>
            </div>
        </div>

        <Suspense fallback=move || view! { <div class="loading">{t("analytics.loading")}</div> }>
            {move || analytics.get().map(|result| match result {
                Ok(data) => {
                    let daily = data.daily_activity.clone();
                    let hours = data.hour_distribution.clone();
                    let models = data.model_usage.clone();
                    let tools = data.tool_ranking.clone();
                    let langs = data.language_breakdown.clone();
                    let outcomes = data.outcome_distribution.clone();

                    view! {
                        // Summary cards
                        <div class="card-grid">
                            <div class="card">
                                <div class="card-value">{data.total_sessions}</div>
                                <div class="card-label">{t("analytics.total_sessions")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{format_number(data.total_messages)}</div>
                                <div class="card-label">{t("analytics.total_messages")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.total_git_commits}</div>
                                <div class="card-label">{t("analytics.git_commits")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{format_number(data.total_lines_added)}</div>
                                <div class="card-label">{t("analytics.lines_added")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{format!("${:.2}", data.estimated_total_cost_usd)}</div>
                                <div class="card-label">{t("analytics.est_cost")}</div>
                            </div>
                        </div>

                        // Activity Heatmap
                        <h3 style="margin-bottom: 1rem;">{t("analytics.activity_heatmap")}</h3>
                        <div class="card" style="margin-bottom: 2rem; overflow-x: auto;">
                            <div class="heatmap-grid">
                                {daily.iter().map(|d| {
                                    let intensity = heatmap_intensity(d.message_count);
                                    let title = format!("{}: {} messages, {} sessions", d.date, d.message_count, d.session_count);
                                    view! {
                                        <div
                                            class="heatmap-cell"
                                            style=format!("background: rgba(249, 115, 22, {});", intensity)
                                            title=title
                                        />
                                    }
                                }).collect_view()}
                            </div>
                        </div>

                        // Hour distribution
                        <h3 style="margin-bottom: 1rem;">{t("analytics.hourly_distribution")}</h3>
                        <div class="card" style="margin-bottom: 2rem;">
                            <div class="hour-chart">
                                {hours.iter().map(|(hour, count)| {
                                    let max_count = hours.iter().map(|(_, c)| *c).max().unwrap_or(1);
                                    let pct = (*count as f64 / max_count as f64 * 100.0) as u64;
                                    view! {
                                        <div class="hour-bar-container">
                                            <div class="hour-bar" style=format!("height: {}%;", pct)/>
                                            <div class="hour-label">{format!("{:02}", hour)}</div>
                                        </div>
                                    }
                                }).collect_view()}
                            </div>
                        </div>

                        // Model usage
                        <h3 style="margin-bottom: 1rem;">{t("analytics.model_usage")}</h3>
                        <div class="table-container" style="margin-bottom: 2rem;">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t("analytics.col_model")}</th>
                                        <th>{t("analytics.col_input_tokens")}</th>
                                        <th>{t("analytics.col_output_tokens")}</th>
                                        <th>{t("analytics.col_cache_read")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {models.into_iter().map(|m| view! {
                                        <tr>
                                            <td>{m.model}</td>
                                            <td>{format_number(m.input_tokens)}</td>
                                            <td>{format_number(m.output_tokens)}</td>
                                            <td>{format_number(m.cache_read_tokens)}</td>
                                        </tr>
                                    }).collect_view()}
                                </tbody>
                            </table>
                        </div>

                        // Two-column layout for tools and languages
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                            // Tool ranking
                            <div>
                                <h3 style="margin-bottom: 1rem;">{t("analytics.tool_usage_top10")}</h3>
                                <div class="card">
                                    {tools.iter().take(10).map(|(name, count)| {
                                        let max = tools.first().map(|(_, c)| *c).unwrap_or(1);
                                        let pct = (*count as f64 / max as f64 * 100.0) as u64;
                                        view! {
                                            <div style="margin-bottom: 0.75rem;">
                                                <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.25rem;">
                                                    <span>{name}</span>
                                                    <span style="color: var(--text-muted);">{format_number(*count)}</span>
                                                </div>
                                                <div class="progress-bar">
                                                    <div class="progress-fill" style=format!("width: {}%;", pct)/>
                                                </div>
                                            </div>
                                        }
                                    }).collect_view()}
                                </div>
                            </div>

                            // Language breakdown
                            <div>
                                <h3 style="margin-bottom: 1rem;">{t("analytics.languages")}</h3>
                                <div class="card">
                                    {langs.iter().take(10).map(|(name, count)| {
                                        let max = langs.first().map(|(_, c)| *c).unwrap_or(1);
                                        let pct = (*count as f64 / max as f64 * 100.0) as u64;
                                        view! {
                                            <div style="margin-bottom: 0.75rem;">
                                                <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.25rem;">
                                                    <span>{name}</span>
                                                    <span style="color: var(--text-muted);">{format_number(*count)}</span>
                                                </div>
                                                <div class="progress-bar">
                                                    <div class="progress-fill progress-blue" style=format!("width: {}%;", pct)/>
                                                </div>
                                            </div>
                                        }
                                    }).collect_view()}
                                </div>
                            </div>
                        </div>

                        // Outcome distribution
                        {if !outcomes.is_empty() {
                            view! {
                                <h3 style="margin-bottom: 1rem;">{t("analytics.session_outcomes")}</h3>
                                <div class="card">
                                    {outcomes.into_iter().map(|(outcome, count)| view! {
                                        <div style="display: flex; justify-content: space-between; padding: 0.375rem 0; border-bottom: 1px solid var(--border);">
                                            <span style="font-size: 0.875rem;">{outcome}</span>
                                            <span class="badge badge-muted">{count}</span>
                                        </div>
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        } else {
                            view! {}.into_view()
                        }}
                    }.into_view()
                }
                Err(e) => view! {
                    <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                }.into_view(),
            })}
        </Suspense>
    }
}

fn format_number(n: u64) -> String {
    if n >= 1_000_000 {
        format!("{:.1}M", n as f64 / 1_000_000.0)
    } else if n >= 1_000 {
        format!("{:.1}K", n as f64 / 1_000.0)
    } else {
        n.to_string()
    }
}

fn heatmap_intensity(count: u64) -> f64 {
    if count == 0 {
        0.05
    } else if count < 10 {
        0.2
    } else if count < 50 {
        0.4
    } else if count < 200 {
        0.6
    } else if count < 500 {
        0.8
    } else {
        1.0
    }
}
