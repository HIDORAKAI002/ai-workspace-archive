use claude_admin_shared::{HealthOverview, ProjectStatus, ProjectSummaryLite};
use leptos::*;

use crate::api;
use crate::i18n::t;

#[component]
pub fn ProjectsPage() -> impl IntoView {
    let active_tab = create_rw_signal("projects".to_string());

    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "Projects".to_string(),
        description: "View and manage Claude Code projects. Projects are directories registered in ~/.claude.json with their own CLAUDE.md, memory, and settings.".to_string(),
        available_actions: vec![
            "View project list".to_string(),
            "Open project details".to_string(),
            "View project status".to_string(),
            "View config health overview".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    view! {
        <div class="page-header">
            <h2>{t("projects.title")}</h2>
            <p>{t("projects.subtitle")}</p>
        </div>

        <div class="tabs">
            <button
                class=move || if active_tab.get() == "projects" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("projects".to_string())
            >{t("projects.tab_projects")}</button>
            <button
                class=move || if active_tab.get() == "health" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("health".to_string())
            >{t("projects.tab_health")}</button>
        </div>

        {move || match active_tab.get().as_str() {
            "projects" => view! { <ProjectListTab/> }.into_view(),
            "health" => view! { <HealthOverviewTab/> }.into_view(),
            _ => view! { <ProjectListTab/> }.into_view(),
        }}
    }
}

// ─────────────────────────────────────────────
// Project List Tab (original content)
// ─────────────────────────────────────────────

#[component]
fn ProjectListTab() -> impl IntoView {
    let projects = create_resource(
        || (),
        |_| async move { api::get::<Vec<ProjectSummaryLite>>("/projects").await },
    );

    view! {
        <Suspense fallback=move || view! { <div class="loading">{t("projects.loading")}</div> }>
            {move || projects.get().map(|result| match result {
                Ok(data) => view! {
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>{t("projects.col_name")}</th>
                                    <th>{t("projects.col_path")}</th>
                                    <th>{t("projects.col_claude_md")}</th>
                                    <th>{t("projects.col_skills")}</th>
                                    <th>{t("projects.col_rules")}</th>
                                    <th>{t("projects.col_memory")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.into_iter().map(|p| {
                                    view! { <ProjectRow project=p/> }
                                }).collect_view()}
                            </tbody>
                        </table>
                    </div>
                }.into_view(),
                Err(e) => view! {
                    <div class="empty-state">
                        <p>{t("projects.error_loading")} {e}</p>
                    </div>
                }.into_view(),
            })}
        </Suspense>
    }
}

/// Single project row - loads status badges JIT.
#[component]
fn ProjectRow(project: ProjectSummaryLite) -> impl IntoView {
    let encoded = project.encoded_path.clone();
    let href = format!("/projects/{}", project.encoded_path);
    let path = project.path.clone();

    let status = create_resource(
        move || encoded.clone(),
        |id| async move { api::get::<ProjectStatus>(&format!("/projects/{}/status", id)).await },
    );

    view! {
        <tr>
            <td>
                <a class="table-link" href=href>{project.name}</a>
            </td>
            <td style="color: var(--text-muted); font-size: 0.8rem;">{path}</td>
            {move || match status.get() {
                Some(Ok(s)) => view! {
                    <td>{badge(s.has_claude_md)}</td>
                    <td>{badge(s.has_skills)}</td>
                    <td>{badge(s.has_rules)}</td>
                    <td>{badge(s.has_memory)}</td>
                }.into_view(),
                Some(Err(_)) => view! {
                    <td>{badge_placeholder("?")}</td>
                    <td>{badge_placeholder("?")}</td>
                    <td>{badge_placeholder("?")}</td>
                    <td>{badge_placeholder("?")}</td>
                }.into_view(),
                None => view! {
                    <td>{badge_loading()}</td>
                    <td>{badge_loading()}</td>
                    <td>{badge_loading()}</td>
                    <td>{badge_loading()}</td>
                }.into_view(),
            }}
        </tr>
    }
}

fn badge(has: bool) -> impl IntoView {
    if has {
        view! { <span class="badge badge-success">{t("projects.yes")}</span> }
    } else {
        view! { <span class="badge badge-muted">"-"</span> }
    }
}

fn badge_placeholder(text: &'static str) -> impl IntoView {
    view! { <span class="badge badge-muted">{text}</span> }
}

fn badge_loading() -> impl IntoView {
    view! { <span class="badge badge-muted" style="opacity: 0.5;">"..."</span> }
}

// ─────────────────────────────────────────────
// Health Overview Tab (from ConfigHealthPage)
// ─────────────────────────────────────────────

#[component]
fn HealthOverviewTab() -> impl IntoView {
    let health = create_resource(
        || (),
        |_| async move { api::get::<HealthOverview>("/health/overview").await },
    );

    view! {
        <Suspense fallback=move || view! { <div class="loading">{t("permissions.health_loading")}</div> }>
            {move || health.get().map(|result| match result {
                Ok(data) => {
                    let avg = data.average_score;
                    let color = score_color(avg);

                    view! {
                        <div class="card-grid">
                            <div class="card">
                                <div class="card-value" style=format!("color: {};", color)>{avg}</div>
                                <div class="card-label">{t("permissions.health_avg_score")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.projects.len()}</div>
                                <div class="card-label">{t("permissions.health_projects_analyzed")}</div>
                            </div>
                        </div>

                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t("permissions.health_col_project")}</th>
                                        <th>{t("permissions.health_col_score")}</th>
                                        <th>{t("permissions.health_col_issues")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.projects.into_iter().map(|p| {
                                        let color = score_color(p.score);
                                        view! {
                                            <tr>
                                                <td>{p.name}</td>
                                                <td>
                                                    <span class="badge" style=format!(
                                                        "background: {}20; color: {};", color, color
                                                    )>
                                                        {p.score} "/100"
                                                    </span>
                                                </td>
                                                <td>
                                                    {if p.issues.is_empty() {
                                                        view! { <span style="color: var(--success);">{t("permissions.health_no_issues")}</span> }.into_view()
                                                    } else {
                                                        view! {
                                                            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.8125rem; color: var(--text-secondary);">
                                                                {p.issues.into_iter().map(|issue| view! {
                                                                    <li>{issue}</li>
                                                                }).collect_view()}
                                                            </ul>
                                                        }.into_view()
                                                    }}
                                                </td>
                                            </tr>
                                        }
                                    }).collect_view()}
                                </tbody>
                            </table>
                        </div>
                    }.into_view()
                }
                Err(e) => view! {
                    <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                }.into_view(),
            })}
        </Suspense>
    }
}

fn score_color(score: u8) -> &'static str {
    if score >= 70 {
        "#22c55e"
    } else if score >= 40 {
        "#eab308"
    } else {
        "#ef4444"
    }
}
