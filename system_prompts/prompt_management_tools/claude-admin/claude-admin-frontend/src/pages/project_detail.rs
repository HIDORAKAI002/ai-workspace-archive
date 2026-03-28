use claude_admin_shared::{
    ClaudeMdContent, ClaudeMdUpdateRequest, ConflictType, EffectiveConfig, ProjectDetail,
    ProjectHealth, ProjectPermissions, ProjectProfile,
};
use leptos::*;
use leptos_router::*;

use crate::api;
use crate::components::markdown_editor::MarkdownEditor;
use crate::components::project_tabs::advisor_tab::AdvisorTab;
use crate::i18n::t;

#[component]
pub fn ProjectDetailPage() -> impl IntoView {
    let params = use_params_map();
    let id = move || params.with(|p| p.get("id").cloned().unwrap_or_default());

    let project = create_resource(id, |id| async move {
        api::get::<ProjectDetail>(&format!("/projects/{}", id)).await
    });

    let active_tab = create_rw_signal("profile".to_string());

    view! {
        <Suspense fallback=move || view! { <div class="loading">{t("project_detail.loading")}</div> }>
            {move || project.get().map(|result| match result {
                Ok(detail) => {
                    let name = detail.summary.name.clone();
                    let path = detail.summary.path.clone();

                    view! {
                        <div class="page-header">
                            <h2>{name}</h2>
                            <p>{path}</p>
                        </div>

                        <div class="tabs">
                            <button
                                class=move || if active_tab.get() == "profile" { "tab active" } else { "tab" }
                                on:click=move |_| active_tab.set("profile".to_string())
                            >{t("project_detail.tab_profile")}</button>
                            <button
                                class=move || if active_tab.get() == "claude-md" { "tab active" } else { "tab" }
                                on:click=move |_| active_tab.set("claude-md".to_string())
                            >{t("project_detail.tab_claude_md")}</button>
                            <button
                                class=move || if active_tab.get() == "skills" { "tab active" } else { "tab" }
                                on:click=move |_| active_tab.set("skills".to_string())
                            >{t("project_detail.tab_skills")}</button>
                            <button
                                class=move || if active_tab.get() == "rules" { "tab active" } else { "tab" }
                                on:click=move |_| active_tab.set("rules".to_string())
                            >{t("project_detail.tab_rules")}</button>
                            <button
                                class=move || if active_tab.get() == "memory" { "tab active" } else { "tab" }
                                on:click=move |_| active_tab.set("memory".to_string())
                            >{t("project_detail.tab_memory")}</button>
                            <button
                                class=move || if active_tab.get() == "effective" { "tab active" } else { "tab" }
                                on:click=move |_| active_tab.set("effective".to_string())
                            >{t("project_detail.tab_effective")}</button>
                            <button
                                class=move || if active_tab.get() == "permissions" { "tab active" } else { "tab" }
                                on:click=move |_| active_tab.set("permissions".to_string())
                            >{t("project_detail.tab_permissions")}</button>
                            <button
                                class=move || if active_tab.get() == "health" { "tab active" } else { "tab" }
                                on:click=move |_| active_tab.set("health".to_string())
                            >{t("project_detail.tab_health")}</button>
                        </div>

                        {move || {
                            let tab = active_tab.get();
                            match tab.as_str() {
                                "profile" => {
                                    let pid = id();
                                    view! { <ProfileTab project_id=pid/> }.into_view()
                                }
                                "claude-md" => {
                                    let content_signal = create_rw_signal(
                                        detail.claude_md.clone().unwrap_or_default()
                                    );
                                    let project_id = id();
                                    view! {
                                        <MarkdownEditor
                                            content=content_signal
                                            on_save=Callback::new(move |content: String| {
                                                let pid = project_id.clone();
                                                spawn_local(async move {
                                                    let req = ClaudeMdUpdateRequest { content };
                                                    let _ = api::put::<ClaudeMdContent, _>(
                                                        &format!("/projects/{}/claude-md", pid),
                                                        &req
                                                    ).await;
                                                });
                                            })
                                            label="CLAUDE.md"
                                        />
                                    }.into_view()
                                }
                                "skills" => {
                                    let skills = detail.skills.clone();
                                    view! {
                                        <div class="table-container">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>{t("project_detail.skills_col_name")}</th>
                                                        <th>{t("project_detail.skills_col_description")}</th>
                                                        <th>{t("project_detail.skills_col_invocable")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {skills.into_iter().map(|s| view! {
                                                        <tr>
                                                            <td>{s.name}</td>
                                                            <td>{s.frontmatter.description.unwrap_or_default()}</td>
                                                            <td>{if s.frontmatter.user_invocable.unwrap_or(false) {
                                                                view! { <span class="badge badge-success">{t("common.yes")}</span> }.into_view()
                                                            } else {
                                                                view! { <span class="badge badge-muted">{t("common.no")}</span> }.into_view()
                                                            }}</td>
                                                        </tr>
                                                    }).collect_view()}
                                                </tbody>
                                            </table>
                                        </div>
                                    }.into_view()
                                }
                                "rules" => {
                                    let rules = detail.rules.clone();
                                    if rules.is_empty() {
                                        view! { <div class="empty-state"><p>{t("project_detail.no_rules")}</p></div> }.into_view()
                                    } else {
                                        view! {
                                            <div class="table-container">
                                                <table>
                                                    <thead><tr><th>{t("project_detail.rules_col_name")}</th><th>{t("project_detail.rules_col_path")}</th></tr></thead>
                                                    <tbody>
                                                        {rules.into_iter().map(|r| view! {
                                                            <tr>
                                                                <td>{r.name}</td>
                                                                <td style="font-size: 0.8rem; color: var(--text-muted);">{r.path}</td>
                                                            </tr>
                                                        }).collect_view()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        }.into_view()
                                    }
                                }
                                "memory" => {
                                    let memory = detail.memory_files.clone();
                                    if memory.is_empty() {
                                        view! { <div class="empty-state"><p>{t("project_detail.no_memory")}</p></div> }.into_view()
                                    } else {
                                        let expanded_memory = create_rw_signal::<Option<String>>(None);
                                        let memory_save_status = create_rw_signal::<Option<(bool, String)>>(None);
                                        let pid = id();

                                        view! {
                                            {move || memory_save_status.get().map(|(ok, msg)| {
                                                let color = if ok { "var(--success)" } else { "var(--error)" };
                                                view! {
                                                    <div class="card" style=format!("margin-bottom: 0.75rem; border-left: 3px solid {};", color)>
                                                        <span style="font-size: 0.875rem;">{msg}</span>
                                                    </div>
                                                }
                                            })}
                                            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                                {memory.into_iter().map(|m| {
                                                    let name = m.name.clone();
                                                    let name_toggle = name.clone();
                                                    let name_check = name.clone();
                                                    let name_check2 = name.clone();
                                                    let size = m.content.len();
                                                    let edit_signal = create_rw_signal(m.content.clone());
                                                    let preview: String = m.content.lines().take(3).collect::<Vec<_>>().join(" | ");
                                                    let pid_for_item = pid.clone();

                                                    view! {
                                                        <div class="card" style="padding: 0.75rem 1rem;">
                                                            <div
                                                                style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;"
                                                                on:click=move |_| {
                                                                    let cur = expanded_memory.get();
                                                                    if cur.as_deref() == Some(&name_toggle) {
                                                                        expanded_memory.set(None);
                                                                    } else {
                                                                        expanded_memory.set(Some(name_toggle.clone()));
                                                                    }
                                                                }
                                                            >
                                                                <div>
                                                                    <span style="font-weight: 600;">{name.clone()}</span>
                                                                    <span style="margin-left: 0.75rem; font-size: 0.75rem; color: var(--text-muted);">
                                                                        {format!("{} bytes", size)}
                                                                    </span>
                                                                </div>
                                                                <span style="color: var(--text-muted); font-size: 0.8rem;">
                                                                    {move || if expanded_memory.get().as_deref() == Some(&name_check) { "▲" } else { "▼" }}
                                                                </span>
                                                            </div>

                                                            // Collapsed preview
                                                            {move || if expanded_memory.get().as_deref() != Some(&name_check2) {
                                                                let p = preview.clone();
                                                                view! {
                                                                    <p style="margin-top: 0.25rem; font-size: 0.8rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                                                        {p}
                                                                    </p>
                                                                }.into_view()
                                                            } else {
                                                                let save_name = name.clone();
                                                                let pid_save = pid_for_item.clone();
                                                                view! {
                                                                    <div style="margin-top: 0.5rem;">
                                                                        <textarea
                                                                            style="width: 100%; min-height: 250px; font-family: monospace; font-size: 0.8rem; border: 1px solid var(--border); border-radius: 4px; padding: 0.5rem;"
                                                                            prop:value=move || edit_signal.get()
                                                                            on:input=move |ev| edit_signal.set(event_target_value(&ev))
                                                                        />
                                                                        <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
                                                                            <button
                                                                                class="btn btn-primary btn-sm"
                                                                                on:click=move |_| {
                                                                                    let content = edit_signal.get();
                                                                                    let topic = save_name.clone();
                                                                                    let p = pid_save.clone();
                                                                                    spawn_local(async move {
                                                                                        let endpoint = if topic == "MEMORY.md" {
                                                                                            format!("/memory/{}", p)
                                                                                        } else {
                                                                                            format!("/memory/{}/topics/{}", p, topic)
                                                                                        };
                                                                                        let req = claude_admin_shared::MemoryUpdateRequest { content };
                                                                                        match crate::api::put::<claude_admin_shared::MemoryFile, _>(&endpoint, &req).await {
                                                                                            Ok(_) => memory_save_status.set(Some((true, t("common.saved").get()))),
                                                                                            Err(e) => memory_save_status.set(Some((false, e))),
                                                                                        }
                                                                                    });
                                                                                }
                                                                            >{t("common.save")}</button>
                                                                        </div>
                                                                    </div>
                                                                }.into_view()
                                                            }}
                                                        </div>
                                                    }
                                                }).collect_view()}
                                            </div>
                                        }.into_view()
                                    }
                                }
                                "effective" => {
                                    let pid = id();
                                    view! { <EffectiveConfigTab project_id=pid/> }.into_view()
                                }
                                "permissions" => {
                                    let pid = id();
                                    view! { <PermissionsTab project_id=pid/> }.into_view()
                                }
                                "health" => {
                                    let pid = id();
                                    view! { <HealthTab project_id=pid/> }.into_view()
                                }
                                _ => view! { <div>{t("project_detail.unknown_tab")}</div> }.into_view(),
                            }
                        }}
                    }.into_view()
                }
                Err(e) => view! {
                    <div class="empty-state">
                        <p>{t("common.error_prefix")} {e}</p>
                    </div>
                }.into_view(),
            })}
        </Suspense>
    }
}

// ─────────────────────────────────────────────
// Profile Tab (replaces Advisor)
// ─────────────────────────────────────────────

#[component]
fn ProfileTab(#[prop(into)] project_id: String) -> impl IntoView {
    let pid = project_id.clone();
    let pid_for_advisor = store_value(project_id.clone());

    let profile = create_resource(
        move || pid.clone(),
        |id| async move { api::get::<ProjectProfile>(&format!("/projects/{}/profile", id)).await },
    );

    view! {
        <Suspense fallback=move || view! { <div class="loading">{t("project_detail.loading")}</div> }>
            {move || profile.get().map(|result| match result {
                Ok(data) => {
                    let color = if data.health_score >= 70 { "var(--success)" }
                        else if data.health_score >= 40 { "var(--warning)" }
                        else { "var(--error)" };

                    let global_rules: Vec<_> = data.rules.iter()
                        .filter(|r| r.scope == claude_admin_shared::ConfigScope::Global)
                        .cloned().collect();
                    let project_rules: Vec<_> = data.rules.iter()
                        .filter(|r| r.scope == claude_admin_shared::ConfigScope::Project)
                        .cloned().collect();
                    let global_skills: Vec<_> = data.skills.iter()
                        .filter(|s| s.scope == claude_admin_shared::ConfigScope::Global)
                        .cloned().collect();
                    let project_skills: Vec<_> = data.skills.iter()
                        .filter(|s| s.scope == claude_admin_shared::ConfigScope::Project)
                        .cloned().collect();
                    let conflicts = data.conflicts.clone();

                    view! {
                        // Card grid: summary stats
                        <div class="card-grid">
                            <div class="card">
                                <div class="card-value" style=format!("color: {};", color)>{data.health_score}</div>
                                <div class="card-label">{t("project_detail.profile_health")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.rules.len()}</div>
                                <div class="card-label">{t("project_detail.profile_rules")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.skills.len()}</div>
                                <div class="card-label">{t("project_detail.profile_skills")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.memory_files.len()}</div>
                                <div class="card-label">{t("project_detail.profile_memory")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.mcp_servers.len()}</div>
                                <div class="card-label">{t("project_detail.profile_mcp")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.hooks_count}</div>
                                <div class="card-label">{t("project_detail.profile_hooks")}</div>
                            </div>
                        </div>

                        // Rules list with scope badges
                        {if !data.rules.is_empty() {
                            view! {
                                <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">{t("project_detail.profile_rules")}</h4>
                                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                                    {global_rules.into_iter().map(|r| view! {
                                        <div class="badge badge-muted" style="display: inline-flex; gap: 0.25rem; align-items: center;">
                                            <span style="font-size: 0.65rem; opacity: 0.7;">{t("project_detail.profile_global_scope")}</span>
                                            {r.name}
                                        </div>
                                    }).collect_view()}
                                    {project_rules.into_iter().map(|r| view! {
                                        <div class="badge badge-success" style="display: inline-flex; gap: 0.25rem; align-items: center;">
                                            <span style="font-size: 0.65rem; opacity: 0.7;">{t("project_detail.profile_project_scope")}</span>
                                            {r.name}
                                        </div>
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        } else {
                            view! {}.into_view()
                        }}

                        // Skills list with scope badges
                        {if !data.skills.is_empty() {
                            view! {
                                <h4 style="margin-bottom: 0.5rem;">{t("project_detail.profile_skills")}</h4>
                                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                                    {global_skills.into_iter().map(|s| view! {
                                        <div class="badge badge-muted" style="display: inline-flex; gap: 0.25rem; align-items: center;">
                                            <span style="font-size: 0.65rem; opacity: 0.7;">{t("project_detail.profile_global_scope")}</span>
                                            {s.name}
                                        </div>
                                    }).collect_view()}
                                    {project_skills.into_iter().map(|s| view! {
                                        <div class="badge badge-success" style="display: inline-flex; gap: 0.25rem; align-items: center;">
                                            <span style="font-size: 0.65rem; opacity: 0.7;">{t("project_detail.profile_project_scope")}</span>
                                            {s.name}
                                        </div>
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        } else {
                            view! {}.into_view()
                        }}

                        // Conflicts
                        {if !conflicts.is_empty() {
                            view! {
                                <h4 style="margin-bottom: 0.5rem; color: var(--warning);">{t("project_detail.profile_conflicts")} " (" {conflicts.len()} ")"</h4>
                                <div class="card" style="border-left: 3px solid var(--warning); margin-bottom: 1rem;">
                                    {conflicts.into_iter().map(|c| {
                                        let badge = match c.conflict_type {
                                            ConflictType::NameCollision => t("rules.conflict_name_collision"),
                                            ConflictType::ContentOverlap => t("rules.conflict_content_overlap"),
                                            ConflictType::Contradiction => t("rules.conflict_contradiction"),
                                        };
                                        view! {
                                            <div style="padding: 0.25rem 0; font-size: 0.875rem;">
                                                <span class="badge badge-warning" style="margin-right: 0.5rem;">{badge}</span>
                                                {c.description}
                                            </div>
                                        }
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        } else {
                            view! {}.into_view()
                        }}

                        // Deep analysis with one-click actions
                        <div style="margin-top: 1.5rem; border-top: 1px solid var(--border); padding-top: 1rem;">
                            <AdvisorTab project_id=pid_for_advisor.get_value()/>
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

// ─────────────────────────────────────────────
// Effective Config Tab
// ─────────────────────────────────────────────

#[component]
fn EffectiveConfigTab(#[prop(into)] project_id: String) -> impl IntoView {
    let pid = project_id.clone();
    let config = create_resource(
        move || pid.clone(),
        |id| async move {
            api::get::<EffectiveConfig>(&format!("/projects/{}/effective-config", id)).await
        },
    );

    view! {
        <Suspense fallback=move || view! { <div class="loading">{t("common.loading")}</div> }>
            {move || config.get().map(|result| match result {
                Ok(data) => {
                    let global_rules = data.rules.global.clone();
                    let project_rules = data.rules.project.clone();
                    let global_skills = data.skills.global.clone();
                    let project_skills = data.skills.project.clone();
                    let mcp_servers = data.mcp_servers.clone();
                    let hooks = data.hooks.effective_hooks.clone();
                    let conflicts = data.conflicts.clone();
                    let memory = data.memory_files.clone();

                    view! {
                        // Summary cards
                        <div class="card-grid">
                            <div class="card">
                                <div class="card-value">{data.rules.effective_count}</div>
                                <div class="card-label">{t("effective.total_rules")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.skills.effective_count}</div>
                                <div class="card-label">{t("effective.total_skills")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{mcp_servers.len()}</div>
                                <div class="card-label">{t("effective.mcp_servers")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.hooks.global_count}</div>
                                <div class="card-label">{t("effective.hooks")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{if data.has_claude_md { t("common.yes").get() } else { t("common.no").get() }}</div>
                                <div class="card-label">{"CLAUDE.md"}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{memory.len()}</div>
                                <div class="card-label">{t("effective.memory_files")}</div>
                            </div>
                        </div>

                        // Conflicts warning
                        {if !conflicts.is_empty() {
                            let c = conflicts.clone();
                            view! {
                                <div class="card" style="margin: 1rem 0; border-left: 3px solid var(--warning); padding: 0.75rem 1rem;">
                                    <h4 style="color: var(--warning); margin-bottom: 0.5rem;">
                                        {t("effective.conflicts")} " (" {c.len()} ")"
                                    </h4>
                                    {c.into_iter().map(|c| {
                                        let badge = match c.conflict_type {
                                            ConflictType::NameCollision => t("rules.conflict_name_collision"),
                                            ConflictType::ContentOverlap => t("rules.conflict_content_overlap"),
                                            ConflictType::Contradiction => t("rules.conflict_contradiction"),
                                        };
                                        view! {
                                            <div style="padding: 0.25rem 0; font-size: 0.875rem;">
                                                <span class="badge badge-warning" style="margin-right: 0.5rem;">{badge}</span>
                                                {c.description}
                                            </div>
                                        }
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        } else {
                            view! {}.into_view()
                        }}

                        // Rules section
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1rem;">
                            // Global (inherited) rules
                            <div>
                                <h4 style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                    <span class="badge badge-muted">{t("effective.inherited")}</span>
                                    {t("effective.rules")} " (" {global_rules.len()} ")"
                                </h4>
                                {if global_rules.is_empty() {
                                    view! { <p style="color: var(--text-muted); font-size: 0.875rem;">{t("effective.none")}</p> }.into_view()
                                } else {
                                    view! {
                                        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                                            {global_rules.into_iter().map(|r| view! {
                                                <div class="card" style="padding: 0.5rem 0.75rem;">
                                                    <div style="font-weight: 500; font-size: 0.875rem;">{r.name}</div>
                                                    <div style="font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                                        {r.content.lines().next().unwrap_or("").to_string()}
                                                    </div>
                                                </div>
                                            }).collect_view()}
                                        </div>
                                    }.into_view()
                                }}
                            </div>
                            // Project (own) rules
                            <div>
                                <h4 style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                    <span class="badge badge-success">{t("effective.own")}</span>
                                    {t("effective.rules")} " (" {project_rules.len()} ")"
                                </h4>
                                {if project_rules.is_empty() {
                                    view! { <p style="color: var(--text-muted); font-size: 0.875rem;">{t("effective.none")}</p> }.into_view()
                                } else {
                                    view! {
                                        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                                            {project_rules.into_iter().map(|r| view! {
                                                <div class="card" style="padding: 0.5rem 0.75rem; border-left: 2px solid var(--success);">
                                                    <div style="font-weight: 500; font-size: 0.875rem;">{r.name}</div>
                                                    <div style="font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                                        {r.content.lines().next().unwrap_or("").to_string()}
                                                    </div>
                                                </div>
                                            }).collect_view()}
                                        </div>
                                    }.into_view()
                                }}
                            </div>
                        </div>

                        // Skills section
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem;">
                            <div>
                                <h4 style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                    <span class="badge badge-muted">{t("effective.inherited")}</span>
                                    {t("effective.skills")} " (" {global_skills.len()} ")"
                                </h4>
                                {if global_skills.is_empty() {
                                    view! { <p style="color: var(--text-muted); font-size: 0.875rem;">{t("effective.none")}</p> }.into_view()
                                } else {
                                    view! {
                                        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                                            {global_skills.into_iter().map(|s| view! {
                                                <div class="card" style="padding: 0.5rem 0.75rem;">
                                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                                        <span style="font-weight: 500; font-size: 0.875rem;">{s.name}</span>
                                                        {if s.frontmatter.user_invocable.unwrap_or(false) {
                                                            view! { <span class="badge badge-success" style="font-size: 0.65rem;">{t("effective.invocable")}</span> }.into_view()
                                                        } else {
                                                            view! {}.into_view()
                                                        }}
                                                    </div>
                                                    {s.frontmatter.description.map(|d| view! {
                                                        <div style="font-size: 0.75rem; color: var(--text-muted);">{d}</div>
                                                    })}
                                                </div>
                                            }).collect_view()}
                                        </div>
                                    }.into_view()
                                }}
                            </div>
                            <div>
                                <h4 style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                    <span class="badge badge-success">{t("effective.own")}</span>
                                    {t("effective.skills")} " (" {project_skills.len()} ")"
                                </h4>
                                {if project_skills.is_empty() {
                                    view! { <p style="color: var(--text-muted); font-size: 0.875rem;">{t("effective.none")}</p> }.into_view()
                                } else {
                                    view! {
                                        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                                            {project_skills.into_iter().map(|s| view! {
                                                <div class="card" style="padding: 0.5rem 0.75rem; border-left: 2px solid var(--success);">
                                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                                        <span style="font-weight: 500; font-size: 0.875rem;">{s.name}</span>
                                                        {if s.frontmatter.user_invocable.unwrap_or(false) {
                                                            view! { <span class="badge badge-success" style="font-size: 0.65rem;">{t("effective.invocable")}</span> }.into_view()
                                                        } else {
                                                            view! {}.into_view()
                                                        }}
                                                    </div>
                                                    {s.frontmatter.description.map(|d| view! {
                                                        <div style="font-size: 0.75rem; color: var(--text-muted);">{d}</div>
                                                    })}
                                                </div>
                                            }).collect_view()}
                                        </div>
                                    }.into_view()
                                }}
                            </div>
                        </div>

                        // MCP Servers + Hooks
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem;">
                            <div>
                                <h4 style="margin-bottom: 0.5rem;">{t("effective.mcp_servers")} " (" {mcp_servers.len()} ")"</h4>
                                {if mcp_servers.is_empty() {
                                    view! { <p style="color: var(--text-muted); font-size: 0.875rem;">{t("effective.none")}</p> }.into_view()
                                } else {
                                    view! {
                                        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                                            {mcp_servers.into_iter().map(|s| {
                                                view! {
                                                    <div class="card" style="padding: 0.5rem 0.75rem;">
                                                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                            <span class="badge badge-muted" style="font-size: 0.65rem;">{s.source.clone()}</span>
                                                            <span style="font-weight: 500; font-size: 0.875rem;">{s.name}</span>
                                                        </div>
                                                    </div>
                                                }
                                            }).collect_view()}
                                        </div>
                                    }.into_view()
                                }}
                            </div>
                            <div>
                                <h4 style="margin-bottom: 0.5rem;">{t("effective.hooks")} " (" {hooks.len()} ")"</h4>
                                {if hooks.is_empty() {
                                    view! { <p style="color: var(--text-muted); font-size: 0.875rem;">{t("effective.none")}</p> }.into_view()
                                } else {
                                    view! {
                                        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                                            {hooks.into_iter().map(|h| view! {
                                                <div class="card" style="padding: 0.5rem 0.75rem;">
                                                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                                                        <span class="badge badge-muted" style="font-size: 0.65rem;">{h.event}</span>
                                                        {h.matcher.map(|m| view! {
                                                            <code style="font-size: 0.75rem;">{m}</code>
                                                        })}
                                                    </div>
                                                    <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; margin-top: 0.125rem;">
                                                        {h.command}
                                                    </div>
                                                </div>
                                            }).collect_view()}
                                        </div>
                                    }.into_view()
                                }}
                            </div>
                        </div>

                        // Memory files
                        {if !memory.is_empty() {
                            view! {
                                <div style="margin-top: 1.5rem;">
                                    <h4 style="margin-bottom: 0.5rem;">{t("effective.memory_files")} " (" {memory.len()} ")"</h4>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                        {memory.into_iter().map(|m| view! {
                                            <span class="badge badge-success">{m}</span>
                                        }).collect_view()}
                                    </div>
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

#[component]
fn PermissionsTab(#[prop(into)] project_id: String) -> impl IntoView {
    let pid = project_id.clone();
    let pid_for_link = project_id.clone();
    let permissions = create_resource(
        move || pid.clone(),
        |id| async move { api::get::<ProjectPermissions>(&format!("/permissions/{}", id)).await },
    );

    let link_href = store_value(format!("/permissions/{}", pid_for_link));

    view! {
        <Suspense fallback=move || view! { <div class="loading">{t("project_detail.permissions_loading")}</div> }>
            {move || {
                permissions.get().map(|result| match result {
                Ok(data) => {
                    if data.entries.is_empty() {
                        view! {
                            <div class="empty-state"><p>{t("project_detail.permissions_no_entries")}</p></div>
                        }.into_view()
                    } else {
                        view! {
                            {if !data.security_warnings.is_empty() {
                                view! {
                                    <div class="card" style="margin-bottom: 1rem; border-left: 3px solid var(--error);">
                                        <span style="color: var(--error); font-weight: 600;">
                                            {data.security_warnings.len()} " " {t("project_detail.permissions_security_warnings")}
                                        </span>
                                    </div>
                                }.into_view()
                            } else {
                                view! {}.into_view()
                            }}

                            <div class="table-container">
                                <table>
                                    <thead><tr><th>{t("project_detail.permissions_col_index")}</th><th>{t("project_detail.permissions_col_tool")}</th><th>{t("project_detail.permissions_col_command")}</th><th>{t("project_detail.permissions_col_status")}</th></tr></thead>
                                    <tbody>
                                        {data.entries.into_iter().map(|e| {
                                            let has_issue = e.security_issue.is_some();
                                            let is_frag = e.is_fragmented;
                                            view! {
                                                <tr class={if has_issue { "row-warning" } else { "" }}>
                                                    <td style="color: var(--text-muted);">{e.index}</td>
                                                    <td><code>{e.tool}</code></td>
                                                    <td style="font-family: monospace; font-size: 0.8rem; word-break: break-all; max-width: 400px;">{e.command}</td>
                                                    <td>
                                                        {if has_issue {
                                                            view! { <span class="badge badge-danger">{e.security_issue.unwrap_or_default()}</span> }.into_view()
                                                        } else if is_frag {
                                                            view! { <span class="badge badge-warning">{t("project_detail.permissions_fragment")}</span> }.into_view()
                                                        } else {
                                                            view! { <span class="badge badge-success">{t("project_detail.permissions_ok")}</span> }.into_view()
                                                        }}
                                                    </td>
                                                </tr>
                                            }
                                        }).collect_view()}
                                    </tbody>
                                </table>
                            </div>

                            <div style="margin-top: 1rem;">
                                <a class="btn btn-secondary btn-sm" href=link_href.get_value()>
                                    {t("project_detail.permissions_manage")}
                                </a>
                            </div>
                        }.into_view()
                    }
                }
                Err(e) => view! {
                    <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                }.into_view(),
            })}}
        </Suspense>
    }
}

#[component]
fn HealthTab(#[prop(into)] project_id: String) -> impl IntoView {
    let pid = project_id.clone();
    let health = create_resource(
        move || pid.clone(),
        |id| async move { api::get::<ProjectHealth>(&format!("/health/{}", id)).await },
    );

    view! {
        <Suspense fallback=move || view! { <div class="loading">{t("project_detail.health_loading")}</div> }>
            {move || health.get().map(|result| match result {
                Ok(data) => {
                    let color = if data.score >= 70 { "var(--success)" } else if data.score >= 40 { "var(--warning)" } else { "var(--error)" };
                    view! {
                        <div class="card-grid">
                            <div class="card">
                                <div class="card-value" style=format!("color: {};", color)>{data.score}</div>
                                <div class="card-label">{t("project_detail.health_score")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{if data.has_claude_md { t("common.yes").get() } else { t("common.no").get() }}</div>
                                <div class="card-label">{t("project_detail.health_claude_md")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{if data.has_memory { t("common.yes").get() } else { t("common.no").get() }}</div>
                                <div class="card-label">{t("project_detail.health_memory")}</div>
                            </div>
                            <div class="card">
                                <div class="card-value">{data.permission_count}</div>
                                <div class="card-label">{t("project_detail.health_permission_entries")}</div>
                            </div>
                        </div>

                        {if !data.security_issues.is_empty() {
                            view! {
                                <h4 style="margin-bottom: 0.5rem; color: var(--error);">{t("project_detail.health_security_issues")}</h4>
                                <div class="card" style="margin-bottom: 1rem; border-left: 3px solid var(--error);">
                                    {data.security_issues.into_iter().map(|w| view! {
                                        <div style="padding: 0.25rem 0; font-size: 0.875rem;">
                                            <span class="badge badge-danger" style="margin-right: 0.5rem;">{w.severity}</span>
                                            {w.message}
                                        </div>
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        } else {
                            view! {
                                <div class="card" style="border-left: 3px solid var(--success); margin-bottom: 1rem;">
                                    <span style="color: var(--success);">{t("project_detail.health_no_security_issues")}</span>
                                </div>
                            }.into_view()
                        }}

                        {if !data.duplicated_rules.is_empty() {
                            view! {
                                <h4 style="margin-bottom: 0.5rem;">{t("project_detail.health_duplicated_rules")}</h4>
                                <div class="table-container">
                                    <table>
                                        <thead><tr><th>{t("project_detail.health_col_text")}</th><th>{t("project_detail.health_col_found_in")}</th><th>{t("project_detail.health_col_also_in")}</th></tr></thead>
                                        <tbody>
                                            {data.duplicated_rules.into_iter().map(|d| view! {
                                                <tr>
                                                    <td style="font-size: 0.8125rem; max-width: 300px; overflow: hidden; text-overflow: ellipsis;">{d.text}</td>
                                                    <td>{d.found_in_project}</td>
                                                    <td>{d.also_in_global}</td>
                                                </tr>
                                            }).collect_view()}
                                        </tbody>
                                    </table>
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
