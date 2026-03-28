use leptos::*;

use crate::api;
use crate::i18n::t;

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct SystemPromptFile {
    pub name: String,
    pub path: String,
    pub content: String,
    pub modified: String,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct SystemPromptCreateRequest {
    pub name: String,
    pub content: String,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct SystemPromptUpdateRequest {
    pub content: String,
}

#[component]
pub fn SystemPromptsPage() -> impl IntoView {
    let active_tab = create_rw_signal("library".to_string());

    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "System Prompts".to_string(),
        description: "Manage system prompt files for Claude Code. System prompts provide persistent instructions that shape Claude's behavior across sessions.".to_string(),
        available_actions: vec![
            "Create new system prompt".to_string(),
            "Edit existing system prompt".to_string(),
            "Delete system prompt".to_string(),
            "Preview prompt content".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    view! {
        <div class="page-header">
            <h2>{t("system_prompts.title")}</h2>
            <p>{t("system_prompts.subtitle")}</p>
        </div>

        <div class="tabs">
            <button
                class=move || if active_tab.get() == "library" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("library".to_string())
            >{t("system_prompts.tab_library")}</button>
            <button
                class=move || if active_tab.get() == "create" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("create".to_string())
            >{t("system_prompts.tab_create")}</button>
        </div>

        {move || match active_tab.get().as_str() {
            "library" => view! { <LibraryTab/> }.into_view(),
            "create" => view! { <CreateTab/> }.into_view(),
            _ => view! { <LibraryTab/> }.into_view(),
        }}
    }
}

// ─────────────────────────────────────────────
// Library Tab
// ─────────────────────────────────────────────

#[component]
fn LibraryTab() -> impl IntoView {
    let prompts = create_resource(
        || (),
        |_| async move { api::get::<Vec<SystemPromptFile>>("/system-prompts").await },
    );

    let expanded = create_rw_signal::<Option<String>>(None);
    let save_status = create_rw_signal::<Option<(String, bool)>>(None);

    view! {
        {move || save_status.get().map(|(msg, ok)| {
            let color = if ok { "var(--success)" } else { "var(--error)" };
            view! {
                <div class="card" style=format!("margin-bottom: 1rem; border-left: 3px solid {};", color)>
                    <span style="font-size: 0.875rem;">{msg}</span>
                </div>
            }
        })}

        <Suspense fallback=move || view! { <div class="loading">{t("system_prompts.loading")}</div> }>
            {move || prompts.get().map(|result| match result {
                Ok(data) => {
                    if data.is_empty() {
                        view! {
                            <div class="empty-state">
                                <p>{t("system_prompts.empty_state")}</p>
                            </div>
                        }.into_view()
                    } else {
                        view! {
                            <div style="display: flex; flex-direction: column; gap: 1rem;">
                                {data.into_iter().map(|prompt| {
                                    let name = prompt.name.clone();
                                    let name_toggle = name.clone();
                                    let name_save = name.clone();
                                    let name_save2 = name.clone();
                                    let name_delete = name.clone();
                                    let modified = prompt.modified.clone();
                                    let preview: String = prompt.content.chars().take(100).collect();
                                    let has_more = prompt.content.len() > 100;
                                    let edit_content = create_rw_signal(prompt.content.clone());
                                    let content_for_copy = prompt.content.clone();

                                    view! {
                                        <div class="card">
                                            // Card header
                                            <div
                                                style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;"
                                                on:click=move |_| {
                                                    let current = expanded.get();
                                                    if current.as_deref() == Some(&name_toggle) {
                                                        expanded.set(None);
                                                    } else {
                                                        expanded.set(Some(name_toggle.clone()));
                                                    }
                                                }
                                            >
                                                <div>
                                                    <span style="font-weight: 600; font-size: 1rem;">{name.clone()}</span>
                                                    <span style="margin-left: 0.75rem; font-size: 0.75rem; color: var(--text-muted);">{modified}</span>
                                                </div>
                                                <span style="color: var(--text-muted); font-size: 0.8rem;">
                                                    {move || if expanded.get().as_deref() == Some(&name) { "▲" } else { "▼" }}
                                                </span>
                                            </div>

                                            // Preview (collapsed)
                                            {move || if expanded.get().as_deref() != Some(&name_save) {
                                                view! {
                                                    <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                                                        {preview.clone()}
                                                        {if has_more { "..." } else { "" }}
                                                    </p>
                                                }.into_view()
                                            } else {
                                                view! {}.into_view()
                                            }}

                                            // Expanded editor
                                            {move || if expanded.get().as_deref() == Some(&name_save2) {
                                                let name_for_save = name_save2.clone();
                                                let name_for_del = name_delete.clone();
                                                let content_for_clipboard = content_for_copy.clone();

                                                view! {
                                                    <div style="margin-top: 1rem;">
                                                        <textarea
                                                            style="width: 100%; min-height: 200px; font-family: monospace; font-size: 0.8rem;"
                                                            prop:value=move || edit_content.get()
                                                            on:input=move |ev| edit_content.set(event_target_value(&ev))
                                                        />
                                                        <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                                                            <button
                                                                class="btn btn-primary btn-sm"
                                                                on:click=move |_| {
                                                                    let name = name_for_save.clone();
                                                                    let content = edit_content.get();
                                                                    save_status.set(None);
                                                                    spawn_local(async move {
                                                                        let req = SystemPromptUpdateRequest { content };
                                                                        match api::put::<SystemPromptFile, _>(
                                                                            &format!("/system-prompts/{}", name),
                                                                            &req,
                                                                        ).await {
                                                                            Ok(_) => {
                                                                                save_status.set(Some((format!("'{}' saved", name), true)));
                                                                                prompts.refetch();
                                                                            }
                                                                            Err(e) => save_status.set(Some((e, false))),
                                                                        }
                                                                    });
                                                                }
                                                            >
                                                                {t("system_prompts.save")}
                                                            </button>
                                                            <button
                                                                class="btn btn-sm"
                                                                on:click=move |_| {
                                                                    let clip_text = format!("--system-prompt \"{}\"", content_for_clipboard);
                                                                    let js = format!("navigator.clipboard.writeText('{}')", clip_text.replace('\'', "\\'"));
                                                                    let _ = js_sys::eval(&js);
                                                                    save_status.set(Some((
                                                                        t("system_prompts.copied").get(),
                                                                        true,
                                                                    )));
                                                                }
                                                            >
                                                                {t("system_prompts.copy_flag")}
                                                            </button>
                                                            <button
                                                                class="btn btn-danger btn-sm"
                                                                on:click=move |_| {
                                                                    let name = name_for_del.clone();
                                                                    if !web_sys::window()
                                                                        .and_then(|w| w.confirm_with_message(
                                                                            &format!("Delete '{}'?", name)
                                                                        ).ok())
                                                                        .unwrap_or(false)
                                                                    {
                                                                        return;
                                                                    }
                                                                    save_status.set(None);
                                                                    spawn_local(async move {
                                                                        match api::delete(
                                                                            &format!("/system-prompts/{}", name),
                                                                        ).await {
                                                                            Ok(_) => {
                                                                                save_status.set(Some((format!("'{}' deleted", name), true)));
                                                                                expanded.set(None);
                                                                                prompts.refetch();
                                                                            }
                                                                            Err(e) => save_status.set(Some((e, false))),
                                                                        }
                                                                    });
                                                                }
                                                            >
                                                                {t("system_prompts.delete")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                }.into_view()
                                            } else {
                                                view! {}.into_view()
                                            }}
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
// Create Tab
// ─────────────────────────────────────────────

struct PromptTemplate {
    label: &'static str,
    i18n_key: &'static str,
    content: &'static str,
}

const TEMPLATES: &[PromptTemplate] = &[
    PromptTemplate {
        label: "Code Reviewer",
        i18n_key: "system_prompts.tpl_code_reviewer",
        content: "You are an expert code reviewer. Focus on:\n\
            - Security vulnerabilities and potential exploits\n\
            - Performance bottlenecks and optimization opportunities\n\
            - Code clarity, naming conventions, and maintainability\n\
            - Error handling completeness\n\
            - Test coverage gaps\n\n\
            Provide actionable feedback with specific line references. Rate severity as: critical, warning, or suggestion.",
    },
    PromptTemplate {
        label: "Documentation Writer",
        i18n_key: "system_prompts.tpl_doc_writer",
        content: "You are a technical documentation specialist. When documenting code:\n\
            - Write clear, concise descriptions for every public API\n\
            - Include usage examples with expected inputs and outputs\n\
            - Document edge cases, error conditions, and limitations\n\
            - Use consistent formatting (Markdown or rustdoc as appropriate)\n\
            - Add inline comments only where logic is non-obvious\n\n\
            Prioritize clarity over brevity. Target audience: intermediate developers.",
    },
    PromptTemplate {
        label: "Security Auditor",
        i18n_key: "system_prompts.tpl_security_auditor",
        content: "You are a security auditor. Analyze code for:\n\
            - Injection vulnerabilities (SQL, command, path traversal)\n\
            - Authentication and authorization flaws\n\
            - Sensitive data exposure (secrets, PII, tokens)\n\
            - Input validation and sanitization gaps\n\
            - Dependency vulnerabilities and supply chain risks\n\
            - Cryptographic weaknesses\n\n\
            Report findings using severity levels: Critical, High, Medium, Low. Include remediation steps.",
    },
    PromptTemplate {
        label: "Refactoring Expert",
        i18n_key: "system_prompts.tpl_refactoring",
        content: "You are a refactoring expert. When improving code:\n\
            - Identify code smells and anti-patterns\n\
            - Apply SOLID principles and clean architecture\n\
            - Reduce duplication with appropriate abstractions\n\
            - Improve type safety and leverage the type system\n\
            - Simplify complex conditionals and nested logic\n\
            - Ensure backward compatibility unless explicitly asked to break it\n\n\
            Explain each refactoring step and the reasoning behind it.",
    },
];

#[component]
fn CreateTab() -> impl IntoView {
    let name = create_rw_signal(String::new());
    let content = create_rw_signal(String::new());
    let save_status = create_rw_signal::<Option<Result<String, String>>>(None);

    let save_prompt = move |_| {
        let n = name.get();
        if n.trim().is_empty() {
            save_status.set(Some(Err(t("system_prompts.name_required").get())));
            return;
        }
        let c = content.get();
        if c.trim().is_empty() {
            save_status.set(Some(Err(t("system_prompts.content_required").get())));
            return;
        }
        spawn_local(async move {
            let req = SystemPromptCreateRequest {
                name: n.clone(),
                content: c,
            };
            match api::post::<SystemPromptFile, _>("/system-prompts", &req).await {
                Ok(_) => {
                    save_status.set(Some(Ok(n)));
                    name.set(String::new());
                    content.set(String::new());
                }
                Err(e) => save_status.set(Some(Err(e))),
            }
        });
    };

    view! {
        {move || save_status.get().map(|result| {
            let (color, msg) = match &result {
                Ok(n) => ("var(--success)", format!("'{}' created", n)),
                Err(e) => ("var(--error)", e.clone()),
            };
            view! {
                <div class="card" style=format!("margin-bottom: 1rem; border-left: 3px solid {};", color)>
                    <span style="font-size: 0.875rem;">{msg}</span>
                </div>
            }
        })}

        <div class="card" style="margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.75rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">{t("system_prompts.name_label")}</label>
                <input
                    type="text"
                    placeholder=t("system_prompts.name_placeholder")
                    style="width: 100%; margin-top: 0.25rem;"
                    prop:value=move || name.get()
                    on:input=move |ev| name.set(event_target_value(&ev))
                />
            </div>

            <div style="margin-bottom: 0.75rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">{t("system_prompts.content_label")}</label>
                <textarea
                    style="width: 100%; min-height: 200px; margin-top: 0.25rem; font-family: monospace; font-size: 0.8rem;"
                    placeholder=t("system_prompts.content_placeholder")
                    prop:value=move || content.get()
                    on:input=move |ev| content.set(event_target_value(&ev))
                />
            </div>

            <button
                class="btn btn-primary"
                on:click=save_prompt
            >
                {t("system_prompts.create")}
            </button>
        </div>

        // Template suggestions
        <div>
            <h4 style="margin-bottom: 0.75rem;">{t("system_prompts.templates_heading")}</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
                {TEMPLATES.iter().map(|tmpl| {
                    let tmpl_content = tmpl.content.to_string();
                    let tmpl_label = tmpl.label.to_string();
                    let i18n_key = tmpl.i18n_key;

                    view! {
                        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <span style="font-weight: 600; font-size: 0.95rem;">{t(i18n_key)}</span>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.4;">
                                    {tmpl_content.chars().take(120).collect::<String>()}
                                    "..."
                                </p>
                            </div>
                            <button
                                class="btn btn-sm"
                                style="margin-top: 0.75rem; align-self: flex-start;"
                                on:click=move |_| {
                                    name.set(tmpl_label.clone());
                                    content.set(tmpl_content.clone());
                                    save_status.set(None);
                                }
                            >
                                {t("system_prompts.use_template")}
                            </button>
                        </div>
                    }
                }).collect_view()}
            </div>
        </div>
    }
}
