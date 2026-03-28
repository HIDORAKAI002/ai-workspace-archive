use claude_admin_shared::{
    AuditLogResponse, DashboardHealthScore, DashboardOverview, ProjectStatus, ProjectSummaryLite,
};
use leptos::*;

use crate::api;
use crate::components::onboarding::OnboardingBanner;
use crate::i18n::t;

#[component]
pub fn DashboardPage() -> impl IntoView {
    let dashboard = create_resource(
        || (),
        |_| async move { api::get::<DashboardOverview>("/dashboard").await },
    );

    // Lazy health score - loaded independently
    let health = create_resource(
        || (),
        |_| async move { api::get::<DashboardHealthScore>("/dashboard/health").await },
    );

    // Recent changes from audit log
    let recent_changes = create_resource(
        || (),
        |_| async move { api::get::<AuditLogResponse>("/audit?limit=5").await },
    );

    view! {
        <div class="page-header">
            <h2>{t("dashboard.title")}</h2>
            <p>{t("dashboard.subtitle")}</p>
        </div>

        <Suspense fallback=move || view! { <div class="loading">{t("dashboard.loading")}</div> }>
            {move || dashboard.get().map(|result| match result {
                Ok(data) => {
                    let projects_for_table = data.recent_projects.clone();
                    view! {
                    <div class="card-grid">
                        <div class="card">
                            <div class="card-value">{data.projects_count}</div>
                            <div class="card-label">{t("dashboard.projects")}</div>
                        </div>
                        <div class="card">
                            <div class="card-value">{data.global_skills_count}</div>
                            <div class="card-label">{t("dashboard.global_skills")}</div>
                        </div>
                        <div class="card">
                            <div class="card-value">{data.global_rules_count}</div>
                            <div class="card-label">{t("dashboard.global_rules")}</div>
                        </div>
                        <div class="card">
                            <div class="card-value">{data.mcp_servers_count}</div>
                            <div class="card-label">{t("dashboard.mcp_servers")}</div>
                        </div>
                        <div class="card">
                            <div class="card-value">{data.plans_count}</div>
                            <div class="card-label">{t("dashboard.plans")}</div>
                        </div>
                        // Lazy health score card
                        {move || match health.get() {
                            Some(Ok(h)) => {
                                let score = h.health_score;
                                let color = if score >= 70 {
                                    "var(--success)"
                                } else if score >= 40 {
                                    "var(--warning)"
                                } else {
                                    "var(--error)"
                                };
                                view! {
                                    <a href="/health" style="text-decoration: none;">
                                        <div class="card" style="cursor: pointer;">
                                            <div class="card-value" style=format!("color: {};", color)>{score}</div>
                                            <div class="card-label">{t("dashboard.config_health")}</div>
                                        </div>
                                    </a>
                                }.into_view()
                            }
                            Some(Err(_)) => view! {}.into_view(),
                            None => view! {
                                <div class="card">
                                    <div class="card-value" style="color: var(--text-muted); font-size: 1rem;">"..."</div>
                                    <div class="card-label">{t("dashboard.config_health")}</div>
                                </div>
                            }.into_view(),
                        }}
                    </div>

                    // Onboarding banner for new users
                    <OnboardingBanner rules_count=data.global_rules_count skills_count=data.global_skills_count />

                    <h3 style="margin-bottom: 1rem;">{t("dashboard.recent_projects")}</h3>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>{t("dashboard.col_name")}</th>
                                    <th>{t("dashboard.col_claude_md")}</th>
                                    <th>{t("dashboard.col_skills")}</th>
                                    <th>{t("dashboard.col_rules")}</th>
                                    <th>{t("dashboard.col_memory")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects_for_table.into_iter().map(|p| {
                                    view! { <ProjectRow project=p/> }
                                }).collect_view()}
                            </tbody>
                        </table>
                    </div>

                    // Recent Changes section
                    <h3 style="margin-top: 2rem; margin-bottom: 1rem;">{t("dashboard.recent_changes")}</h3>
                    <Suspense fallback=move || view! { <div style="color: var(--text-muted); font-size: 0.875rem;">"..."</div> }>
                        {move || recent_changes.get().map(|result| match result {
                            Ok(audit) if !audit.entries.is_empty() => {
                                view! {
                                    <div class="table-container">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>{t("dashboard.change_action")}</th>
                                                    <th>{t("dashboard.change_resource")}</th>
                                                    <th>{t("dashboard.change_time")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {audit.entries.into_iter().map(|entry| {
                                                    let action_badge = match entry.action.as_str() {
                                                        "create" => "badge badge-success",
                                                        "delete" => "badge badge-danger",
                                                        _ => "badge badge-warning",
                                                    };
                                                    // Format timestamp to readable form
                                                    let time_display = entry.timestamp.get(..16).unwrap_or(&entry.timestamp).replace('T', " ");
                                                    view! {
                                                        <tr>
                                                            <td>
                                                                <span class=action_badge>{entry.action}</span>
                                                            </td>
                                                            <td>
                                                                <span style="font-weight: 500;">{&entry.resource_type}</span>
                                                                " "
                                                                <span style="color: var(--text-secondary);">{entry.resource_name}</span>
                                                            </td>
                                                            <td style="color: var(--text-muted); font-size: 0.8125rem;">
                                                                {time_display}
                                                            </td>
                                                        </tr>
                                                    }
                                                }).collect_view()}
                                            </tbody>
                                        </table>
                                    </div>
                                }.into_view()
                            }
                            _ => view! {
                                <div style="color: var(--text-muted); font-size: 0.875rem; padding: 1rem;">
                                    {t("dashboard.no_recent_changes")}
                                </div>
                            }.into_view(),
                        })}
                    </Suspense>
                }.into_view()
                },
                Err(e) => view! {
                    <div class="empty-state">
                        <p>{t("dashboard.error_loading")}</p>
                        <p style="font-size: 0.8rem;">{e}</p>
                    </div>
                }.into_view(),
            })}
        </Suspense>
    }
}

/// Single project row that lazy-loads its status badges.
#[component]
fn ProjectRow(project: ProjectSummaryLite) -> impl IntoView {
    let encoded = project.encoded_path.clone();
    let href = format!("/projects/{}", project.encoded_path);

    let status = create_resource(
        move || encoded.clone(),
        |id| async move { api::get::<ProjectStatus>(&format!("/projects/{}/status", id)).await },
    );

    view! {
        <tr>
            <td>
                <a class="table-link" href=href>{project.name}</a>
            </td>
            {move || match status.get() {
                Some(Ok(s)) => view! {
                    <td>{status_badge(s.has_claude_md)}</td>
                    <td>{status_badge(s.has_skills)}</td>
                    <td>{status_badge(s.has_rules)}</td>
                    <td>{status_badge(s.has_memory)}</td>
                }.into_view(),
                Some(Err(_)) => view! {
                    <td><span class="badge badge-muted">"?"</span></td>
                    <td><span class="badge badge-muted">"?"</span></td>
                    <td><span class="badge badge-muted">"?"</span></td>
                    <td><span class="badge badge-muted">"?"</span></td>
                }.into_view(),
                None => view! {
                    <td><span class="badge badge-muted" style="opacity: 0.5;">"..."</span></td>
                    <td><span class="badge badge-muted" style="opacity: 0.5;">"..."</span></td>
                    <td><span class="badge badge-muted" style="opacity: 0.5;">"..."</span></td>
                    <td><span class="badge badge-muted" style="opacity: 0.5;">"..."</span></td>
                }.into_view(),
            }}
        </tr>
    }
}

fn status_badge(has: bool) -> impl IntoView {
    if has {
        view! { <span class="badge badge-success">{t("dashboard.yes")}</span> }
    } else {
        view! { <span class="badge badge-muted">"-"</span> }
    }
}
