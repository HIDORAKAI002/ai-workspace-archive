use claude_admin_shared::{
    BrowsableSkill, ConfigScope, ConfigTemplate, SkillCreateRequest, SkillFile, SkillFrontmatter,
    SkillInstallRequest, SkillPreviewRequest, SkillPreviewResponse, SkillTemplate,
    SkillUpdateRequest, TemplateApplyResult,
};
use leptos::*;

use crate::api;
use crate::components::frontmatter_form::FrontmatterForm;
use crate::components::markdown_editor::MarkdownEditor;
use crate::i18n::t;

#[component]
pub fn GlobalSkillsPage() -> impl IntoView {
    let active_tab = create_rw_signal("my_skills".to_string());

    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "Global Skills".to_string(),
        description: "Manage global skills for Claude Code. Skills are reusable instructions with YAML frontmatter and markdown body that teach Claude specific capabilities.".to_string(),
        available_actions: vec![
            "Create new skill".to_string(),
            "Edit existing skill".to_string(),
            "Delete skill".to_string(),
            "Browse skill catalog".to_string(),
            "Install community skills".to_string(),
            "Preview skill rendering".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    view! {
        <div class="page-header">
            <h2>{t("global_skills.title")}</h2>
            <p>{t("global_skills.subtitle")}</p>
        </div>

        <div class="tabs">
            <button
                class=move || if active_tab.get() == "my_skills" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("my_skills".to_string())
            >{t("global_skills.tab_my_skills")}</button>
            <button
                class=move || if active_tab.get() == "browse" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("browse".to_string())
            >{t("global_skills.tab_browse")}</button>
            <button
                class=move || if active_tab.get() == "templates" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("templates".to_string())
            >{t("global_skills.tab_templates")}</button>
            <button
                class=move || if active_tab.get() == "create" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("create".to_string())
            >{t("global_skills.tab_create")}</button>
        </div>

        {move || match active_tab.get().as_str() {
            "my_skills" => view! { <MySkillsTab/> }.into_view(),
            "browse" => view! { <BrowseSkillsTab/> }.into_view(),
            "templates" => view! { <TemplatesTab/> }.into_view(),
            "create" => view! { <SkillBuilderTab/> }.into_view(),
            _ => view! { <MySkillsTab/> }.into_view(),
        }}
    }
}

// ─────────────────────────────────────────────
// My Skills Tab (original GlobalSkillsPage content)
// ─────────────────────────────────────────────

#[component]
fn MySkillsTab() -> impl IntoView {
    let skills = create_resource(
        || (),
        |_| async move { api::get::<Vec<SkillFile>>("/skills").await },
    );

    let selected_skill = create_rw_signal::<Option<SkillFile>>(None);

    view! {
        <Suspense fallback=move || view! { <div class="loading">{t("global_skills.loading")}</div> }>
            {move || skills.get().map(|result| match result {
                Ok(data) => {
                    view! {
                        <div style="display: flex; gap: 1.5rem;">
                            // Skill list
                            <div style="width: 280px; flex-shrink: 0;">
                                <div class="table-container">
                                    <table>
                                        <thead><tr><th>{t("global_skills.col_skill")}</th><th>{t("global_skills.col_invocable")}</th></tr></thead>
                                        <tbody>
                                            {data.into_iter().map(|s| {
                                                let skill = s.clone();
                                                view! {
                                                    <tr
                                                        style="cursor: pointer;"
                                                        on:click=move |_| selected_skill.set(Some(skill.clone()))
                                                    >
                                                        <td>{s.name.clone()}</td>
                                                        <td>{if s.frontmatter.user_invocable.unwrap_or(false) {
                                                            view! { <span class="badge badge-success">{t("common.yes")}</span> }.into_view()
                                                        } else {
                                                            view! { <span class="badge badge-muted">{t("common.no")}</span> }.into_view()
                                                        }}</td>
                                                    </tr>
                                                }
                                            }).collect_view()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            // Editor panel
                            <div style="flex: 1;">
                                {move || {
                                    if let Some(skill) = selected_skill.get() {
                                        let fm_signal = create_rw_signal(skill.frontmatter.clone());
                                        let content_signal = create_rw_signal(skill.content.clone());
                                        let skill_name = skill.name.clone();

                                        view! {
                                            <h3 style="margin-bottom: 1rem;">{t("global_skills.editing")} " " {skill_name.clone()}</h3>
                                            <FrontmatterForm frontmatter=fm_signal/>
                                            <MarkdownEditor
                                                content=content_signal
                                                on_save=Callback::new(move |content: String| {
                                                    let name = skill_name.clone();
                                                    let fm = fm_signal.get();
                                                    spawn_local(async move {
                                                        let req = SkillUpdateRequest {
                                                            frontmatter: fm,
                                                            content,
                                                        };
                                                        let _ = api::put::<SkillFile, _>(
                                                            &format!("/skills/global/{}", name),
                                                            &req,
                                                        ).await;
                                                    });
                                                })
                                                label="Skill Content"
                                            />
                                        }.into_view()
                                    } else {
                                        view! {
                                            <div class="empty-state">
                                                <p>{t("global_skills.select_skill")}</p>
                                            </div>
                                        }.into_view()
                                    }
                                }}
                            </div>
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
// Browse Skills Tab (from skill_browser.rs)
// ─────────────────────────────────────────────

#[component]
fn BrowseSkillsTab() -> impl IntoView {
    let active_sub = create_rw_signal("official".to_string());
    let search_query = create_rw_signal(String::new());
    let install_status = create_rw_signal::<Option<(String, String)>>(None);

    let official = create_resource(
        || (),
        |_| async move { api::get::<Vec<BrowsableSkill>>("/skill-browser/official").await },
    );

    let community = create_resource(
        || (),
        |_| async move { api::get::<Vec<BrowsableSkill>>("/skill-browser/community").await },
    );

    view! {
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            <button
                class=move || if active_sub.get() == "official" { "btn btn-primary btn-sm" } else { "btn btn-secondary btn-sm" }
                on:click=move |_| active_sub.set("official".to_string())
            >{t("skill_browser.tab_official")}</button>
            <button
                class=move || if active_sub.get() == "community" { "btn btn-primary btn-sm" } else { "btn btn-secondary btn-sm" }
                on:click=move |_| active_sub.set("community".to_string())
            >{t("skill_browser.tab_community")}</button>
        </div>

        <div style="margin-bottom: 1rem;">
            <input
                type="text"
                placeholder=t("skill_browser.search_placeholder")
                style="max-width: 400px;"
                prop:value=move || search_query.get()
                on:input=move |ev| search_query.set(event_target_value(&ev))
            />
        </div>

        {move || install_status.get().map(|(name, status)| view! {
            <div class="card" style=format!(
                "margin-bottom: 1rem; border-left: 3px solid {};",
                if status == "installed" { "var(--success)" } else { "var(--error)" }
            )>
                <span style="font-size: 0.875rem;">
                    {if status == "installed" {
                        view! { <span>"'" {name} "' " {t("skill_browser.install_success")}</span> }.into_view()
                    } else {
                        view! { <span>{t("skill_browser.install_failed")} " '" {name} "': " {status}</span> }.into_view()
                    }}
                </span>
            </div>
        })}

        <Suspense fallback=move || view! { <div class="loading">{t("skill_browser.loading")}</div> }>
            {move || {
                let tab = active_sub.get();
                let query = search_query.get().to_lowercase();

                let skills_result = if tab == "official" {
                    official.get()
                } else {
                    community.get()
                };

                skills_result.map(|result| match result {
                    Ok(skills) => {
                        let filtered: Vec<BrowsableSkill> = skills
                            .into_iter()
                            .filter(|s| {
                                if query.is_empty() {
                                    true
                                } else {
                                    s.name.to_lowercase().contains(&query)
                                        || s.description.to_lowercase().contains(&query)
                                }
                            })
                            .collect();

                        if filtered.is_empty() {
                            view! {
                                <div class="empty-state"><p>{t("skill_browser.no_results")}</p></div>
                            }.into_view()
                        } else {
                            view! {
                                <div class="skill-grid">
                                    {filtered.into_iter().map(|skill| {
                                        let name = skill.name.clone();
                                        let name_for_install = skill.name.clone();
                                        let installed = skill.installed;

                                        view! {
                                            <div class="card skill-card">
                                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                                    <div>
                                                        <span style="font-weight: 600; font-size: 1rem;">{name}</span>
                                                        {skill.category.map(|cat| view! {
                                                            <span class="badge badge-muted" style="margin-left: 0.5rem;">{cat}</span>
                                                        })}
                                                    </div>
                                                    {if installed {
                                                        view! { <span class="badge badge-success">{t("skill_browser.installed")}</span> }.into_view()
                                                    } else {
                                                        view! {
                                                            <button
                                                                class="btn btn-primary btn-sm"
                                                                on:click=move |_| {
                                                                    let name = name_for_install.clone();
                                                                    install_status.set(None);
                                                                    spawn_local(async move {
                                                                        let req = SkillInstallRequest {
                                                                            name: name.clone(),
                                                                            content: format!(
                                                                                "---\ndescription: Installed via ClaudeAdmin\nuser_invocable: true\n---\n\n# {}\n\nInstalled from Skill Browser.\n",
                                                                                name
                                                                            ),
                                                                        };
                                                                        match api::post::<serde_json::Value, _>(
                                                                            "/skill-browser/install",
                                                                            &req
                                                                        ).await {
                                                                            Ok(_) => {
                                                                                install_status.set(Some((name, "installed".to_string())));
                                                                            }
                                                                            Err(e) => {
                                                                                install_status.set(Some((name, e)));
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            >
                                                                {t("skill_browser.install")}
                                                            </button>
                                                        }.into_view()
                                                    }}
                                                </div>
                                                <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
                                                    {skill.description}
                                                </p>
                                                <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-muted);">
                                                    {skill.repo}
                                                </div>
                                            </div>
                                        }
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        }
                    }
                    Err(e) => view! {
                        <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                    }.into_view(),
                })
            }}
        </Suspense>
    }
}

// ─────────────────────────────────────────────
// Templates Tab (from templates.rs)
// ─────────────────────────────────────────────

#[component]
fn TemplatesTab() -> impl IntoView {
    let apply_status =
        create_rw_signal::<Option<(String, Result<TemplateApplyResult, String>)>>(None);

    let templates = create_resource(
        || (),
        |_| async move { api::get::<Vec<ConfigTemplate>>("/templates").await },
    );

    view! {
        {move || apply_status.get().map(|(name, result)| {
            let (border_color, message) = match &result {
                Ok(r) => (
                    "var(--success)",
                    format!(
                        "'{}' {}  ({} rules, {} skills{})",
                        name,
                        "applied",
                        r.rules_created,
                        r.skills_created,
                        if r.claude_md_updated { ", CLAUDE.md updated" } else { "" },
                    ),
                ),
                Err(e) => (
                    "var(--error)",
                    format!("Failed to apply '{}': {}", name, e),
                ),
            };
            view! {
                <div class="card" style=format!("margin-bottom: 1.5rem; border-left: 3px solid {};", border_color)>
                    <span style="font-size: 0.875rem;">{message}</span>
                </div>
            }
        })}

        <Suspense fallback=move || view! { <div class="loading">{t("templates.loading")}</div> }>
            {move || templates.get().map(|result| match result {
                Ok(data) => {
                    if data.is_empty() {
                        view! {
                            <div class="empty-state">
                                <p>{t("search.no_results")}</p>
                            </div>
                        }.into_view()
                    } else {
                        view! {
                            <div class="skill-grid">
                                {data.into_iter().map(|tmpl| {
                                    let name_for_apply = tmpl.name.clone();
                                    let name_display = tmpl.name.clone();

                                    view! {
                                        <div class="card skill-card">
                                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                                <div>
                                                    <span style="font-weight: 600; font-size: 1rem;">{name_display.clone()}</span>
                                                    <span class="badge badge-muted" style="margin-left: 0.5rem;">{tmpl.category.clone()}</span>
                                                </div>
                                                <button
                                                    class="btn btn-primary btn-sm"
                                                    on:click=move |_| {
                                                        let name = name_for_apply.clone();
                                                        if !web_sys::window()
                                                            .and_then(|w| w.confirm_with_message(&t("templates.confirm").get()).ok())
                                                            .unwrap_or(false)
                                                        {
                                                            return;
                                                        }
                                                        apply_status.set(None);
                                                        spawn_local(async move {
                                                            let outcome = api::post::<TemplateApplyResult, ()>(
                                                                &format!("/templates/{}/apply", name),
                                                                &(),
                                                            )
                                                            .await;
                                                            apply_status.set(Some((name, outcome)));
                                                            templates.refetch();
                                                        });
                                                    }
                                                >
                                                    {t("templates.apply")}
                                                </button>
                                            </div>

                                            <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.75rem;">
                                                {tmpl.description}
                                            </p>

                                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; font-size: 0.75rem; color: var(--text-muted);">
                                                {if !tmpl.rules.is_empty() {
                                                    view! {
                                                        <span class="badge badge-muted">
                                                            {tmpl.rules.len()} " rules"
                                                        </span>
                                                    }.into_view()
                                                } else {
                                                    view! {}.into_view()
                                                }}
                                                {if !tmpl.skills.is_empty() {
                                                    view! {
                                                        <span class="badge badge-muted">
                                                            {tmpl.skills.len()} " skills"
                                                        </span>
                                                    }.into_view()
                                                } else {
                                                    view! {}.into_view()
                                                }}
                                                {if tmpl.claude_md_snippet.is_some() {
                                                    view! {
                                                        <span class="badge badge-muted">"CLAUDE.md snippet"</span>
                                                    }.into_view()
                                                } else {
                                                    view! {}.into_view()
                                                }}
                                            </div>
                                        </div>
                                    }
                                }).collect_view()}
                            </div>
                        }.into_view()
                    }
                }
                Err(e) => view! {
                    <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                }.into_view(),
            })}
        </Suspense>
    }
}

// ─────────────────────────────────────────────
// Skill Builder Tab (Feature 2)
// ─────────────────────────────────────────────

#[component]
fn SkillBuilderTab() -> impl IntoView {
    let templates = create_resource(
        || (),
        |_| async move { api::get::<Vec<SkillTemplate>>("/skills/templates").await },
    );

    let skill_name = create_rw_signal(String::new());
    let description = create_rw_signal(String::new());
    let user_invocable = create_rw_signal(true);
    let content = create_rw_signal(String::new());
    let preview = create_rw_signal::<Option<SkillPreviewResponse>>(None);
    let save_status = create_rw_signal::<Option<Result<String, String>>>(None);

    // Preview fetch
    let fetch_preview = move || {
        let fm = SkillFrontmatter {
            description: Some(description.get()),
            user_invocable: Some(user_invocable.get()),
        };
        let c = content.get();
        spawn_local(async move {
            let req = SkillPreviewRequest {
                frontmatter: fm,
                content: c,
            };
            if let Ok(resp) = api::post::<SkillPreviewResponse, _>("/skills/preview", &req).await {
                preview.set(Some(resp));
            }
        });
    };

    // Load template into editor
    let load_template = move |tmpl: SkillTemplate| {
        skill_name.set(tmpl.id.clone());
        description.set(tmpl.frontmatter.description.unwrap_or_default());
        user_invocable.set(tmpl.frontmatter.user_invocable.unwrap_or(true));
        content.set(tmpl.content_template.clone());
        save_status.set(None);
        fetch_preview();
    };

    // Save skill
    let save_skill = move |_| {
        let name = skill_name.get();
        if name.trim().is_empty() {
            save_status.set(Some(Err(t("skill_builder.name_required").get())));
            return;
        }
        let fm = SkillFrontmatter {
            description: Some(description.get()),
            user_invocable: Some(user_invocable.get()),
        };
        let c = content.get();
        spawn_local(async move {
            let req = SkillCreateRequest {
                name: name.clone(),
                scope: ConfigScope::Global,
                frontmatter: fm,
                content: c,
            };
            match api::post::<SkillFile, _>("/skills", &req).await {
                Ok(_) => save_status.set(Some(Ok(name))),
                Err(e) => save_status.set(Some(Err(e))),
            }
        });
    };

    view! {
        <div style="display: grid; grid-template-columns: 220px 1fr 1fr; gap: 1.5rem; min-height: 500px;">

            // ── Left: Template Picker ──
            <div>
                <h4 style="margin-bottom: 0.75rem;">{t("skill_builder.templates")}</h4>
                <Suspense fallback=move || view! { <div class="loading">{t("common.loading")}</div> }>
                    {move || templates.get().map(|result| match result {
                        Ok(tmpls) => {
                            view! {
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    {tmpls.into_iter().map(|tmpl| {
                                        let tmpl_clone = tmpl.clone();
                                        let name = tmpl.name.clone();
                                        let cat = tmpl.category.clone();
                                        let desc = tmpl.description.clone();
                                        view! {
                                            <div
                                                class="card"
                                                style="cursor: pointer; padding: 0.75rem;"
                                                on:click=move |_| load_template(tmpl_clone.clone())
                                            >
                                                <div style="font-weight: 600; font-size: 0.875rem;">{name}</div>
                                                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
                                                    <span class="badge badge-muted" style="font-size: 0.65rem;">{cat}</span>
                                                </div>
                                                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">{desc}</div>
                                            </div>
                                        }
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        }
                        Err(e) => view! {
                            <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                        }.into_view(),
                    })}
                </Suspense>
            </div>

            // ── Center: Editor ──
            <div>
                <h4 style="margin-bottom: 0.75rem;">{t("skill_builder.editor")}</h4>

                {move || save_status.get().map(|result| {
                    let (color, msg) = match &result {
                        Ok(name) => ("var(--success)", format!("{} '{}'", t("skill_builder.saved").get(), name)),
                        Err(e) => ("var(--error)", e.clone()),
                    };
                    view! {
                        <div class="card" style=format!("margin-bottom: 1rem; border-left: 3px solid {};", color)>
                            <span style="font-size: 0.875rem;">{msg}</span>
                        </div>
                    }
                })}

                <div style="margin-bottom: 0.75rem;">
                    <label style="font-size: 0.875rem; font-weight: 500;">{t("skill_builder.name")}</label>
                    <input
                        type="text"
                        placeholder=t("skill_builder.name_placeholder")
                        style="width: 100%; margin-top: 0.25rem;"
                        prop:value=move || skill_name.get()
                        on:input=move |ev| skill_name.set(event_target_value(&ev))
                    />
                </div>

                <div style="margin-bottom: 0.75rem;">
                    <label style="font-size: 0.875rem; font-weight: 500;">{t("skill_builder.description")}</label>
                    <input
                        type="text"
                        placeholder=t("skill_builder.desc_placeholder")
                        style="width: 100%; margin-top: 0.25rem;"
                        prop:value=move || description.get()
                        on:input=move |ev| {
                            description.set(event_target_value(&ev));
                            fetch_preview();
                        }
                    />
                </div>

                <div style="margin-bottom: 0.75rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
                        <input
                            type="checkbox"
                            prop:checked=move || user_invocable.get()
                            on:change=move |ev| {
                                user_invocable.set(event_target_checked(&ev));
                                fetch_preview();
                            }
                        />
                        {t("skill_builder.user_invocable")}
                    </label>
                </div>

                <div style="margin-bottom: 0.75rem;">
                    <label style="font-size: 0.875rem; font-weight: 500;">{t("skill_builder.content")}</label>
                    <textarea
                        style="width: 100%; min-height: 250px; margin-top: 0.25rem; font-family: monospace; font-size: 0.8rem;"
                        prop:value=move || content.get()
                        on:input=move |ev| {
                            content.set(event_target_value(&ev));
                            fetch_preview();
                        }
                    />
                </div>

                <button
                    class="btn btn-primary"
                    on:click=save_skill
                >
                    {t("skill_builder.save")}
                </button>
            </div>

            // ── Right: Live Preview ──
            <div>
                <h4 style="margin-bottom: 0.75rem;">{t("skill_builder.preview")}</h4>
                {move || {
                    if let Some(p) = preview.get() {
                        view! {
                            <div>
                                // Warnings
                                {if !p.warnings.is_empty() {
                                    view! {
                                        <div style="margin-bottom: 0.75rem;">
                                            {p.warnings.iter().map(|w| {
                                                let w = w.clone();
                                                view! {
                                                    <div class="card" style="border-left: 3px solid var(--warning); padding: 0.5rem; margin-bottom: 0.5rem; font-size: 0.8rem;">
                                                        {w}
                                                    </div>
                                                }
                                            }).collect_view()}
                                        </div>
                                    }.into_view()
                                } else {
                                    view! {}.into_view()
                                }}

                                // Trigger
                                {p.trigger.clone().map(|trig| view! {
                                    <div style="margin-bottom: 0.75rem;">
                                        <span style="font-size: 0.8rem; color: var(--text-muted);">{t("skill_builder.trigger")} </span>
                                        <code style="font-size: 0.875rem; font-weight: 600;">{trig}</code>
                                    </div>
                                })}

                                // Rendered preview
                                <pre style="background: var(--bg-secondary); padding: 1rem; border-radius: 0.5rem; font-size: 0.75rem; line-height: 1.5; overflow-x: auto; white-space: pre-wrap; max-height: 400px; overflow-y: auto;">
                                    {p.rendered.clone()}
                                </pre>
                            </div>
                        }.into_view()
                    } else {
                        view! {
                            <div class="empty-state" style="padding: 2rem;">
                                <p style="color: var(--text-muted); font-size: 0.875rem;">{t("skill_builder.preview_hint")}</p>
                            </div>
                        }.into_view()
                    }
                }}
            </div>
        </div>
    }
}
