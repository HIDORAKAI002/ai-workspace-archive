use leptos::*;

use crate::api;
use crate::i18n::t;

// ─────────────────────────────────────────────
// Local types (WASM cannot share backend crate)
// ─────────────────────────────────────────────

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct AgentDefinition {
    pub name: String,
    pub description: String,
    pub prompt: String,
    pub model: Option<String>,
    pub allowed_tools: Vec<String>,
    pub disallowed_tools: Vec<String>,
    pub custom_instructions: Option<String>,
    pub source: String,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct AgentCreateRequest {
    pub name: String,
    pub description: String,
    pub prompt: String,
    pub model: Option<String>,
    pub allowed_tools: Vec<String>,
    pub disallowed_tools: Vec<String>,
    pub custom_instructions: Option<String>,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct AgentUpdateRequest {
    pub description: String,
    pub prompt: String,
    pub model: Option<String>,
    pub allowed_tools: Vec<String>,
    pub disallowed_tools: Vec<String>,
    pub custom_instructions: Option<String>,
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

#[component]
pub fn AgentsPage() -> impl IntoView {
    let active_tab = create_rw_signal("overview".to_string());

    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "Agents".to_string(),
        description: "Create and manage custom Claude Code agents (stored in ~/.claude/settings.json under 'agents' key). \
            Two tabs: 'Overview' shows existing agents as cards with edit/delete buttons and a 'claude --agent <name>' copy button. \
            'Create' tab has a form with fields: Name (required, e.g. 'code-reviewer'), Description (what the agent does), \
            Prompt (system prompt defining agent behavior), Model (optional, e.g. claude-sonnet-4-5-20250514), \
            Allowed Tools (comma-separated, e.g. Bash,Edit,Read), Disallowed Tools, Custom Instructions. \
            Button 'Create Agent' saves to settings.json. Use 'claude --agent <name>' in CLI to invoke.".to_string(),
        available_actions: vec![
            "Create new agent with name, prompt, and tool config".to_string(),
            "Edit existing agent inline".to_string(),
            "Delete agent".to_string(),
            "Copy 'claude --agent <name>' CLI command".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    view! {
        <div class="page-header">
            <h2>{t("agents.title")}</h2>
            <p>{t("agents.subtitle")}</p>
        </div>

        <div class="tabs">
            <button
                class=move || if active_tab.get() == "overview" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("overview".to_string())
            >{t("agents.tab_overview")}</button>
            <button
                class=move || if active_tab.get() == "create" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("create".to_string())
            >{t("agents.tab_create")}</button>
        </div>

        {move || match active_tab.get().as_str() {
            "overview" => view! { <AgentsOverviewTab/> }.into_view(),
            "create" => view! { <AgentCreateTab/> }.into_view(),
            _ => view! { <AgentsOverviewTab/> }.into_view(),
        }}
    }
}

// ─────────────────────────────────────────────
// Overview Tab
// ─────────────────────────────────────────────

#[component]
fn AgentsOverviewTab() -> impl IntoView {
    let agents = create_resource(
        || (),
        |_| async move { api::get::<Vec<AgentDefinition>>("/agents").await },
    );

    let editing = create_rw_signal::<Option<String>>(None);
    let status_msg = create_rw_signal::<Option<(String, bool)>>(None);

    // Signals for edit form
    let edit_description = create_rw_signal(String::new());
    let edit_prompt = create_rw_signal(String::new());
    let edit_model = create_rw_signal(String::new());
    let edit_allowed_tools = create_rw_signal(String::new());
    let edit_disallowed_tools = create_rw_signal(String::new());
    let edit_custom_instructions = create_rw_signal(String::new());

    let start_edit = move |agent: AgentDefinition| {
        editing.set(Some(agent.name.clone()));
        edit_description.set(agent.description.clone());
        edit_prompt.set(agent.prompt.clone());
        edit_model.set(agent.model.clone().unwrap_or_default());
        edit_allowed_tools.set(agent.allowed_tools.join(", "));
        edit_disallowed_tools.set(agent.disallowed_tools.join(", "));
        edit_custom_instructions.set(agent.custom_instructions.clone().unwrap_or_default());
    };

    let cancel_edit = move |_| {
        editing.set(None);
    };

    let save_edit = move |name: String| {
        let model_val = edit_model.get();
        let req = AgentUpdateRequest {
            description: edit_description.get(),
            prompt: edit_prompt.get(),
            model: if model_val.is_empty() {
                None
            } else {
                Some(model_val)
            },
            allowed_tools: parse_comma_list(&edit_allowed_tools.get()),
            disallowed_tools: parse_comma_list(&edit_disallowed_tools.get()),
            custom_instructions: {
                let v = edit_custom_instructions.get();
                if v.is_empty() {
                    None
                } else {
                    Some(v)
                }
            },
        };
        spawn_local(async move {
            match api::put::<AgentDefinition, _>(&format!("/agents/{}", name), &req).await {
                Ok(_) => {
                    status_msg.set(Some((t("agents.save_success").get(), true)));
                    editing.set(None);
                    agents.refetch();
                }
                Err(e) => {
                    status_msg.set(Some((e, false)));
                }
            }
        });
    };

    let delete_agent = move |name: String| {
        let confirmed = web_sys::window()
            .and_then(|w| {
                w.confirm_with_message(&format!("{} '{}'?", t("agents.confirm_delete").get(), name))
                    .ok()
            })
            .unwrap_or(false);
        if !confirmed {
            return;
        }
        spawn_local(async move {
            match api::delete(&format!("/agents/{}", name)).await {
                Ok(_) => {
                    status_msg.set(Some((t("agents.delete_success").get(), true)));
                    agents.refetch();
                }
                Err(e) => {
                    status_msg.set(Some((e, false)));
                }
            }
        });
    };

    let copy_cli_flag = move |name: String| {
        let text = format!("--agent {}", name);
        let js = format!(
            "navigator.clipboard.writeText('{}')",
            text.replace('\'', "\\'")
        );
        let _ = js_sys::eval(&js);
        status_msg.set(Some((t("agents.copied").get(), true)));
    };

    view! {
        {move || status_msg.get().map(|(msg, success)| {
            let color = if success { "var(--success)" } else { "var(--error)" };
            view! {
                <div class="card" style=format!("margin-bottom: 1rem; border-left: 3px solid {};", color)>
                    <span style="font-size: 0.875rem;">{msg}</span>
                </div>
            }
        })}

        <Suspense fallback=move || view! { <div class="loading">{t("agents.loading")}</div> }>
            {move || agents.get().map(|result| match result {
                Ok(data) => {
                    if data.is_empty() {
                        view! {
                            <div class="empty-state">
                                <p>{t("agents.empty")}</p>
                            </div>
                        }.into_view()
                    } else {
                        view! {
                            <div class="skill-grid">
                                {data.into_iter().map(|agent| {
                                    let name = agent.name.clone();
                                    let name_for_edit = agent.name.clone();
                                    let name_for_save = agent.name.clone();
                                    let name_for_delete = agent.name.clone();
                                    let name_for_copy = agent.name.clone();
                                    let agent_for_edit = agent.clone();
                                    let is_editing = move || editing.get().as_deref() == Some(&name);

                                    view! {
                                        <div class="card">
                                            {move || if is_editing() {
                                                // ── Edit form ──
                                                let save_name = name_for_save.clone();
                                                view! {
                                                    <h4 style="margin-bottom: 0.75rem;">{t("agents.editing")} " " {name_for_edit.clone()}</h4>

                                                    <div style="margin-bottom: 0.5rem;">
                                                        <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_description")}</label>
                                                        <input
                                                            type="text"
                                                            style="width: 100%; margin-top: 0.25rem;"
                                                            prop:value=move || edit_description.get()
                                                            on:input=move |ev| edit_description.set(event_target_value(&ev))
                                                        />
                                                    </div>

                                                    <div style="margin-bottom: 0.5rem;">
                                                        <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_prompt")}</label>
                                                        <textarea
                                                            style="width: 100%; min-height: 120px; margin-top: 0.25rem; font-family: monospace; font-size: 0.8rem;"
                                                            prop:value=move || edit_prompt.get()
                                                            on:input=move |ev| edit_prompt.set(event_target_value(&ev))
                                                        />
                                                    </div>

                                                    <div style="margin-bottom: 0.5rem;">
                                                        <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_model")}</label>
                                                        <select
                                                            style="width: 100%; margin-top: 0.25rem;"
                                                            on:change=move |ev| edit_model.set(event_target_value(&ev))
                                                        >
                                                            <option value="" selected=move || edit_model.get().is_empty()>{t("agents.model_default")}</option>
                                                            <option value="opus" selected=move || edit_model.get() == "opus">"opus"</option>
                                                            <option value="sonnet" selected=move || edit_model.get() == "sonnet">"sonnet"</option>
                                                            <option value="haiku" selected=move || edit_model.get() == "haiku">"haiku"</option>
                                                        </select>
                                                    </div>

                                                    <div style="margin-bottom: 0.5rem;">
                                                        <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_allowed_tools")}</label>
                                                        <input
                                                            type="text"
                                                            placeholder=t("agents.tools_placeholder")
                                                            style="width: 100%; margin-top: 0.25rem;"
                                                            prop:value=move || edit_allowed_tools.get()
                                                            on:input=move |ev| edit_allowed_tools.set(event_target_value(&ev))
                                                        />
                                                    </div>

                                                    <div style="margin-bottom: 0.5rem;">
                                                        <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_disallowed_tools")}</label>
                                                        <input
                                                            type="text"
                                                            placeholder=t("agents.tools_placeholder")
                                                            style="width: 100%; margin-top: 0.25rem;"
                                                            prop:value=move || edit_disallowed_tools.get()
                                                            on:input=move |ev| edit_disallowed_tools.set(event_target_value(&ev))
                                                        />
                                                    </div>

                                                    <div style="margin-bottom: 0.75rem;">
                                                        <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_custom_instructions")}</label>
                                                        <textarea
                                                            style="width: 100%; min-height: 80px; margin-top: 0.25rem; font-family: monospace; font-size: 0.8rem;"
                                                            prop:value=move || edit_custom_instructions.get()
                                                            on:input=move |ev| edit_custom_instructions.set(event_target_value(&ev))
                                                        />
                                                    </div>

                                                    <div style="display: flex; gap: 0.5rem;">
                                                        <button
                                                            class="btn btn-primary btn-sm"
                                                            on:click=move |_| save_edit(save_name.clone())
                                                        >{t("common.save")}</button>
                                                        <button
                                                            class="btn btn-secondary btn-sm"
                                                            on:click=cancel_edit
                                                        >{t("common.cancel")}</button>
                                                    </div>
                                                }.into_view()
                                            } else {
                                                // ── Card view ──
                                                let agent_clone = agent_for_edit.clone();
                                                let delete_name = name_for_delete.clone();
                                                let copy_name = name_for_copy.clone();
                                                view! {
                                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                                        <div>
                                                            <span style="font-weight: 600; font-size: 1rem;">{agent.name.clone()}</span>
                                                            <span class="badge badge-muted" style="margin-left: 0.5rem;">{agent.source.clone()}</span>
                                                            {agent.model.clone().map(|m| view! {
                                                                <span class="badge badge-muted" style="margin-left: 0.5rem;">{m}</span>
                                                            })}
                                                        </div>
                                                        <div style="display: flex; gap: 0.25rem;">
                                                            <button
                                                                class="btn btn-secondary btn-sm"
                                                                title="Copy CLI flag"
                                                                on:click=move |_| copy_cli_flag(copy_name.clone())
                                                            >"CLI"</button>
                                                            <button
                                                                class="btn btn-secondary btn-sm"
                                                                on:click=move |_| start_edit(agent_clone.clone())
                                                            >{t("common.edit")}</button>
                                                            <button
                                                                class="btn btn-danger btn-sm"
                                                                on:click=move |_| delete_agent(delete_name.clone())
                                                            >{t("common.delete")}</button>
                                                        </div>
                                                    </div>
                                                    <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.5rem;">
                                                        {agent.description.clone()}
                                                    </p>
                                                    <pre style="background: var(--bg-secondary); padding: 0.75rem; border-radius: 0.375rem; font-size: 0.75rem; line-height: 1.4; white-space: pre-wrap; max-height: 120px; overflow-y: auto; color: var(--text-muted);">
                                                        {agent.prompt.clone()}
                                                    </pre>
                                                }.into_view()
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

#[component]
fn AgentCreateTab() -> impl IntoView {
    let name = create_rw_signal(String::new());
    let description = create_rw_signal(String::new());
    let prompt = create_rw_signal(String::new());
    let model = create_rw_signal(String::new());
    let allowed_tools = create_rw_signal(String::new());
    let disallowed_tools = create_rw_signal(String::new());
    let custom_instructions = create_rw_signal(String::new());
    let save_status = create_rw_signal::<Option<Result<String, String>>>(None);

    let on_create = move |_| {
        let name_val = name.get();
        if name_val.trim().is_empty() {
            save_status.set(Some(Err(t("agents.name_required").get())));
            return;
        }
        let model_val = model.get();
        let ci = custom_instructions.get();
        let req = AgentCreateRequest {
            name: name_val.clone(),
            description: description.get(),
            prompt: prompt.get(),
            model: if model_val.is_empty() {
                None
            } else {
                Some(model_val)
            },
            allowed_tools: parse_comma_list(&allowed_tools.get()),
            disallowed_tools: parse_comma_list(&disallowed_tools.get()),
            custom_instructions: if ci.is_empty() { None } else { Some(ci) },
        };
        spawn_local(async move {
            match api::post::<AgentDefinition, _>("/agents", &req).await {
                Ok(_) => {
                    save_status.set(Some(Ok(name_val)));
                    // Reset form
                    name.set(String::new());
                    description.set(String::new());
                    prompt.set(String::new());
                    model.set(String::new());
                    allowed_tools.set(String::new());
                    disallowed_tools.set(String::new());
                    custom_instructions.set(String::new());
                }
                Err(e) => {
                    save_status.set(Some(Err(e)));
                }
            }
        });
    };

    view! {
        {move || save_status.get().map(|result| {
            let (color, msg) = match &result {
                Ok(n) => ("var(--success)", format!("{} '{}'", t("agents.create_success").get(), n)),
                Err(e) => ("var(--error)", e.clone()),
            };
            view! {
                <div class="card" style=format!("margin-bottom: 1rem; border-left: 3px solid {};", color)>
                    <span style="font-size: 0.875rem;">{msg}</span>
                </div>
            }
        })}

        <div style="max-width: 640px;">
            <div style="margin-bottom: 0.75rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_name")}</label>
                <input
                    type="text"
                    placeholder=t("agents.name_placeholder")
                    style="width: 100%; margin-top: 0.25rem;"
                    prop:value=move || name.get()
                    on:input=move |ev| name.set(event_target_value(&ev))
                />
            </div>

            <div style="margin-bottom: 0.75rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_description")}</label>
                <input
                    type="text"
                    placeholder=t("agents.desc_placeholder")
                    style="width: 100%; margin-top: 0.25rem;"
                    prop:value=move || description.get()
                    on:input=move |ev| description.set(event_target_value(&ev))
                />
            </div>

            <div style="margin-bottom: 0.75rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_prompt")}</label>
                <textarea
                    placeholder=t("agents.prompt_placeholder")
                    style="width: 100%; min-height: 160px; margin-top: 0.25rem; font-family: monospace; font-size: 0.8rem;"
                    prop:value=move || prompt.get()
                    on:input=move |ev| prompt.set(event_target_value(&ev))
                />
            </div>

            <div style="margin-bottom: 0.75rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_model")}</label>
                <select
                    style="width: 100%; margin-top: 0.25rem;"
                    on:change=move |ev| model.set(event_target_value(&ev))
                >
                    <option value="">{t("agents.model_default")}</option>
                    <option value="opus">"opus"</option>
                    <option value="sonnet">"sonnet"</option>
                    <option value="haiku">"haiku"</option>
                </select>
            </div>

            <div style="margin-bottom: 0.75rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_allowed_tools")}</label>
                <input
                    type="text"
                    placeholder=t("agents.tools_placeholder")
                    style="width: 100%; margin-top: 0.25rem;"
                    prop:value=move || allowed_tools.get()
                    on:input=move |ev| allowed_tools.set(event_target_value(&ev))
                />
                <span style="font-size: 0.75rem; color: var(--text-muted);">{t("agents.tools_hint")}</span>
            </div>

            <div style="margin-bottom: 0.75rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_disallowed_tools")}</label>
                <input
                    type="text"
                    placeholder=t("agents.tools_placeholder")
                    style="width: 100%; margin-top: 0.25rem;"
                    prop:value=move || disallowed_tools.get()
                    on:input=move |ev| disallowed_tools.set(event_target_value(&ev))
                />
            </div>

            <div style="margin-bottom: 0.75rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">{t("agents.field_custom_instructions")}</label>
                <textarea
                    placeholder=t("agents.instructions_placeholder")
                    style="width: 100%; min-height: 80px; margin-top: 0.25rem; font-family: monospace; font-size: 0.8rem;"
                    prop:value=move || custom_instructions.get()
                    on:input=move |ev| custom_instructions.set(event_target_value(&ev))
                />
            </div>

            <button
                class="btn btn-primary"
                on:click=on_create
            >{t("agents.create_btn")}</button>
        </div>
    }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

fn parse_comma_list(input: &str) -> Vec<String> {
    input
        .split(',')
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .collect()
}
