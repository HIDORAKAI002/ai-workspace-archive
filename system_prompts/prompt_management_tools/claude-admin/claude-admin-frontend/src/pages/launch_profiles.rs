use leptos::*;

use crate::api;
use crate::i18n::t;

// ─────────────────────────────────────────────
// Local types (matching shared types)
// ─────────────────────────────────────────────

#[derive(Clone, Debug, Default, serde::Serialize, serde::Deserialize)]
pub struct LaunchProfile {
    pub name: String,
    pub description: String,
    #[serde(default)]
    pub model: Option<String>,
    #[serde(default)]
    pub effort: Option<String>,
    #[serde(default)]
    pub permission_mode: Option<String>,
    #[serde(default)]
    pub allowed_tools: Vec<String>,
    #[serde(default)]
    pub disallowed_tools: Vec<String>,
    #[serde(default)]
    pub system_prompt: Option<String>,
    #[serde(default)]
    pub append_system_prompt: Option<String>,
    #[serde(default)]
    pub max_budget_usd: Option<f64>,
    #[serde(default)]
    pub fallback_model: Option<String>,
    #[serde(default)]
    pub mcp_config: Option<String>,
    #[serde(default)]
    pub debug: Option<String>,
    #[serde(default)]
    pub add_dirs: Vec<String>,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct LaunchCommand {
    pub command: String,
}

// ─────────────────────────────────────────────
// Built-in presets (not persisted)
// ─────────────────────────────────────────────

fn builtin_presets() -> Vec<LaunchProfile> {
    vec![
        LaunchProfile {
            name: "Code Review".to_string(),
            description: "Read-only code review with plan mode and low budget".to_string(),
            model: Some("sonnet".to_string()),
            effort: Some("low".to_string()),
            permission_mode: Some("plan".to_string()),
            allowed_tools: vec!["Read".to_string(), "Glob".to_string(), "Grep".to_string()],
            disallowed_tools: vec!["Bash".to_string(), "Write".to_string(), "Edit".to_string()],
            max_budget_usd: Some(0.5),
            ..Default::default()
        },
        LaunchProfile {
            name: "Full Dev".to_string(),
            description: "Full development with opus, high effort, all tools".to_string(),
            model: Some("opus".to_string()),
            effort: Some("high".to_string()),
            permission_mode: Some("default".to_string()),
            ..Default::default()
        },
        LaunchProfile {
            name: "Quick Fix".to_string(),
            description: "Fast fixes with haiku, medium effort, core tools only".to_string(),
            model: Some("haiku".to_string()),
            effort: Some("medium".to_string()),
            allowed_tools: vec!["Bash".to_string(), "Edit".to_string(), "Read".to_string()],
            ..Default::default()
        },
        LaunchProfile {
            name: "Research".to_string(),
            description: "Research mode with opus, web access, plan mode".to_string(),
            model: Some("opus".to_string()),
            effort: Some("high".to_string()),
            permission_mode: Some("plan".to_string()),
            allowed_tools: vec![
                "WebFetch".to_string(),
                "WebSearch".to_string(),
                "Read".to_string(),
            ],
            ..Default::default()
        },
        LaunchProfile {
            name: "Budget Conscious".to_string(),
            description: "Cost-efficient with sonnet, low effort, $1 budget cap".to_string(),
            model: Some("sonnet".to_string()),
            effort: Some("low".to_string()),
            max_budget_usd: Some(1.0),
            ..Default::default()
        },
    ]
}

// ─────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────

#[component]
pub fn LaunchProfilesPage() -> impl IntoView {
    let active_tab = create_rw_signal("profiles".to_string());

    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "Launch Profiles".to_string(),
        description: "Create and manage launch profiles for Claude Code. Each profile configures model, permission mode, allowed/disallowed tools, system prompt, and budget for a specific use case.".to_string(),
        available_actions: vec![
            "Create new launch profile".to_string(),
            "Edit existing profile".to_string(),
            "Delete profile".to_string(),
            "Generate CLI command".to_string(),
            "Use preset as template".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    // Form signals shared between Create tab and Presets "Use as Template"
    let form_name = create_rw_signal(String::new());
    let form_description = create_rw_signal(String::new());
    let form_model = create_rw_signal(String::new());
    let form_effort = create_rw_signal(String::new());
    let form_permission_mode = create_rw_signal(String::new());
    let form_allowed_tools = create_rw_signal(String::new());
    let form_disallowed_tools = create_rw_signal(String::new());
    let form_system_prompt = create_rw_signal(String::new());
    let form_append_system_prompt = create_rw_signal(String::new());
    let form_max_budget = create_rw_signal(String::new());
    let form_fallback_model = create_rw_signal(String::new());
    let form_debug = create_rw_signal(String::new());
    let form_add_dirs = create_rw_signal(String::new());

    view! {
        <div class="page-header">
            <h2>{t("launch_profiles.title")}</h2>
            <p>{t("launch_profiles.subtitle")}</p>
        </div>

        <div class="tabs">
            <button
                class=move || if active_tab.get() == "profiles" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("profiles".to_string())
            >{t("launch_profiles.tab_profiles")}</button>
            <button
                class=move || if active_tab.get() == "create" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("create".to_string())
            >{t("launch_profiles.tab_create")}</button>
            <button
                class=move || if active_tab.get() == "presets" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("presets".to_string())
            >{t("launch_profiles.tab_presets")}</button>
        </div>

        {move || match active_tab.get().as_str() {
            "profiles" => view! { <ProfilesTab/> }.into_view(),
            "create" => view! {
                <CreateTab
                    form_name=form_name
                    form_description=form_description
                    form_model=form_model
                    form_effort=form_effort
                    form_permission_mode=form_permission_mode
                    form_allowed_tools=form_allowed_tools
                    form_disallowed_tools=form_disallowed_tools
                    form_system_prompt=form_system_prompt
                    form_append_system_prompt=form_append_system_prompt
                    form_max_budget=form_max_budget
                    form_fallback_model=form_fallback_model
                    form_debug=form_debug
                    form_add_dirs=form_add_dirs
                />
            }.into_view(),
            "presets" => view! {
                <PresetsTab
                    active_tab=active_tab
                    form_name=form_name
                    form_description=form_description
                    form_model=form_model
                    form_effort=form_effort
                    form_permission_mode=form_permission_mode
                    form_allowed_tools=form_allowed_tools
                    form_disallowed_tools=form_disallowed_tools
                    form_system_prompt=form_system_prompt
                    form_append_system_prompt=form_append_system_prompt
                    form_max_budget=form_max_budget
                    form_fallback_model=form_fallback_model
                    form_debug=form_debug
                    form_add_dirs=form_add_dirs
                />
            }.into_view(),
            _ => view! { <ProfilesTab/> }.into_view(),
        }}
    }
}

// ─────────────────────────────────────────────
// Tab 1: Profiles Overview
// ─────────────────────────────────────────────

#[component]
fn ProfilesTab() -> impl IntoView {
    let profiles = create_resource(
        || (),
        |_| async move { api::get::<Vec<LaunchProfile>>("/launch-profiles").await },
    );

    let delete_status = create_rw_signal::<Option<Result<String, String>>>(None);
    let clipboard_status = create_rw_signal::<Option<String>>(None);

    view! {
        {move || delete_status.get().map(|result| {
            let (color, msg) = match &result {
                Ok(name) => ("var(--success)", format!("{} '{}'", t("launch_profiles.deleted").get(), name)),
                Err(e) => ("var(--error)", e.clone()),
            };
            view! {
                <div class="card" style=format!("margin-bottom: 1rem; border-left: 3px solid {};", color)>
                    <span style="font-size: 0.875rem;">{msg}</span>
                </div>
            }
        })}

        {move || clipboard_status.get().map(|name| {
            view! {
                <div class="card" style="margin-bottom: 1rem; border-left: 3px solid var(--success);">
                    <span style="font-size: 0.875rem;">
                        {t("launch_profiles.copied_command")} " '" {name} "'"
                    </span>
                </div>
            }
        })}

        <Suspense fallback=move || view! { <div class="loading">{t("launch_profiles.loading")}</div> }>
            {move || profiles.get().map(|result| match result {
                Ok(data) => {
                    if data.is_empty() {
                        view! {
                            <div class="empty-state">
                                <p>{t("launch_profiles.no_profiles")}</p>
                            </div>
                        }.into_view()
                    } else {
                        view! {
                            <div class="skill-grid">
                                {data.into_iter().map(|profile| {
                                    let name = profile.name.clone();
                                    let name_for_copy = profile.name.clone();
                                    let name_for_delete = profile.name.clone();

                                    view! {
                                        <div class="card skill-card">
                                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                                <h3 style="font-size: 1rem; font-weight: 600; margin: 0;">{name.clone()}</h3>
                                            </div>

                                            <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.75rem;">
                                                {profile.description.clone()}
                                            </p>

                                            // Badges for model, effort, permission_mode
                                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                                                {profile.model.clone().map(|m| view! {
                                                    <span class="badge badge-success">{m}</span>
                                                })}
                                                {profile.effort.clone().map(|e| view! {
                                                    <span class="badge badge-muted">{t("launch_profiles.effort_label")} " " {e}</span>
                                                })}
                                                {profile.permission_mode.clone().map(|p| view! {
                                                    <span class="badge badge-muted">{p}</span>
                                                })}
                                                {profile.max_budget_usd.map(|b| view! {
                                                    <span class="badge badge-muted">"$" {format!("{:.2}", b)}</span>
                                                })}
                                            </div>

                                            // Allowed tools
                                            {if !profile.allowed_tools.is_empty() {
                                                let tools = profile.allowed_tools.clone();
                                                view! {
                                                    <div style="margin-bottom: 0.5rem;">
                                                        <span style="font-size: 0.75rem; color: var(--text-muted);">{t("launch_profiles.allowed")} " "</span>
                                                        {tools.into_iter().map(|tool| view! {
                                                            <span class="badge badge-success" style="margin-right: 0.25rem; font-size: 0.7rem;">{tool}</span>
                                                        }).collect_view()}
                                                    </div>
                                                }.into_view()
                                            } else {
                                                view! {}.into_view()
                                            }}

                                            // Disallowed tools
                                            {if !profile.disallowed_tools.is_empty() {
                                                let tools = profile.disallowed_tools.clone();
                                                view! {
                                                    <div style="margin-bottom: 0.5rem;">
                                                        <span style="font-size: 0.75rem; color: var(--text-muted);">{t("launch_profiles.disallowed")} " "</span>
                                                        {tools.into_iter().map(|tool| view! {
                                                            <span class="badge badge-muted" style="margin-right: 0.25rem; font-size: 0.7rem; text-decoration: line-through;">{tool}</span>
                                                        }).collect_view()}
                                                    </div>
                                                }.into_view()
                                            } else {
                                                view! {}.into_view()
                                            }}

                                            // Action buttons
                                            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                                                <button
                                                    class="btn btn-primary btn-sm"
                                                    on:click=move |_| {
                                                        let profile_name = name_for_copy.clone();
                                                        spawn_local(async move {
                                                            match api::get::<LaunchCommand>(
                                                                &format!("/launch-profiles/{}/command", profile_name)
                                                            ).await {
                                                                Ok(cmd) => {
                                                                    let js = format!("navigator.clipboard.writeText('{}')", cmd.command.replace('\'', "\\'"));
                                                                    let _ = js_sys::eval(&js);
                                                                    clipboard_status.set(Some(profile_name));
                                                                }
                                                                Err(e) => {
                                                                    delete_status.set(Some(Err(e)));
                                                                }
                                                            }
                                                        });
                                                    }
                                                >
                                                    {t("launch_profiles.copy_command")}
                                                </button>

                                                <button
                                                    class="btn btn-danger btn-sm"
                                                    on:click=move |_| {
                                                        let name = name_for_delete.clone();
                                                        if !web_sys::window()
                                                            .and_then(|w| w.confirm_with_message(
                                                                &t("launch_profiles.confirm_delete").get()
                                                            ).ok())
                                                            .unwrap_or(false)
                                                        {
                                                            return;
                                                        }
                                                        spawn_local(async move {
                                                            match api::delete(
                                                                &format!("/launch-profiles/{}", name)
                                                            ).await {
                                                                Ok(_) => {
                                                                    delete_status.set(Some(Ok(name)));
                                                                    profiles.refetch();
                                                                }
                                                                Err(e) => {
                                                                    delete_status.set(Some(Err(e)));
                                                                }
                                                            }
                                                        });
                                                    }
                                                >
                                                    {t("launch_profiles.delete")}
                                                </button>
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
// Tab 2: Create Profile
// ─────────────────────────────────────────────

#[component]
fn CreateTab(
    form_name: RwSignal<String>,
    form_description: RwSignal<String>,
    form_model: RwSignal<String>,
    form_effort: RwSignal<String>,
    form_permission_mode: RwSignal<String>,
    form_allowed_tools: RwSignal<String>,
    form_disallowed_tools: RwSignal<String>,
    form_system_prompt: RwSignal<String>,
    form_append_system_prompt: RwSignal<String>,
    form_max_budget: RwSignal<String>,
    form_fallback_model: RwSignal<String>,
    form_debug: RwSignal<String>,
    form_add_dirs: RwSignal<String>,
) -> impl IntoView {
    let save_status = create_rw_signal::<Option<Result<String, String>>>(None);

    let save_profile = move |_| {
        let name = form_name.get();
        if name.trim().is_empty() {
            save_status.set(Some(Err(t("launch_profiles.name_required").get())));
            return;
        }
        let desc = form_description.get();
        if desc.trim().is_empty() {
            save_status.set(Some(Err(t("launch_profiles.description_required").get())));
            return;
        }

        let profile = LaunchProfile {
            name: name.clone(),
            description: desc,
            model: non_empty(&form_model.get()),
            effort: non_empty(&form_effort.get()),
            permission_mode: non_empty(&form_permission_mode.get()),
            allowed_tools: split_comma(&form_allowed_tools.get()),
            disallowed_tools: split_comma(&form_disallowed_tools.get()),
            system_prompt: non_empty(&form_system_prompt.get()),
            append_system_prompt: non_empty(&form_append_system_prompt.get()),
            max_budget_usd: form_max_budget.get().parse::<f64>().ok(),
            fallback_model: non_empty(&form_fallback_model.get()),
            mcp_config: None,
            debug: non_empty(&form_debug.get()),
            add_dirs: split_comma(&form_add_dirs.get()),
        };

        spawn_local(async move {
            match api::post::<LaunchProfile, _>("/launch-profiles", &profile).await {
                Ok(_) => {
                    save_status.set(Some(Ok(name)));
                }
                Err(e) => {
                    save_status.set(Some(Err(e)));
                }
            }
        });
    };

    let label_style =
        "font-size: 0.875rem; font-weight: 500; display: block; margin-bottom: 0.25rem;";
    let field_style = "margin-bottom: 1rem;";

    view! {
        <div style="max-width: 700px;">

            {move || save_status.get().map(|result| {
                let (color, msg) = match &result {
                    Ok(name) => ("var(--success)", format!("{} '{}'", t("launch_profiles.saved").get(), name)),
                    Err(e) => ("var(--error)", e.clone()),
                };
                view! {
                    <div class="card" style=format!("margin-bottom: 1rem; border-left: 3px solid {};", color)>
                        <span style="font-size: 0.875rem;">{msg}</span>
                    </div>
                }
            })}

            // Name
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_name")} " *"</label>
                <input
                    type="text"
                    placeholder=t("launch_profiles.name_placeholder")
                    style="width: 100%;"
                    prop:value=move || form_name.get()
                    on:input=move |ev| form_name.set(event_target_value(&ev))
                />
            </div>

            // Description
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_description")} " *"</label>
                <input
                    type="text"
                    placeholder=t("launch_profiles.description_placeholder")
                    style="width: 100%;"
                    prop:value=move || form_description.get()
                    on:input=move |ev| form_description.set(event_target_value(&ev))
                />
            </div>

            // Model
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_model")}</label>
                <select
                    style="width: 100%;"
                    prop:value=move || form_model.get()
                    on:change=move |ev| form_model.set(event_target_value(&ev))
                >
                    <option value="">{t("launch_profiles.select_default")}</option>
                    <option value="opus">"opus"</option>
                    <option value="sonnet">"sonnet"</option>
                    <option value="haiku">"haiku"</option>
                    <option value="claude-opus-4-6">"claude-opus-4-6"</option>
                    <option value="claude-sonnet-4-6">"claude-sonnet-4-6"</option>
                    <option value="claude-haiku-4-5-20251001">"claude-haiku-4-5-20251001"</option>
                </select>
            </div>

            // Effort
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_effort")}</label>
                <select
                    style="width: 100%;"
                    prop:value=move || form_effort.get()
                    on:change=move |ev| form_effort.set(event_target_value(&ev))
                >
                    <option value="">{t("launch_profiles.select_default")}</option>
                    <option value="low">"low"</option>
                    <option value="medium">"medium"</option>
                    <option value="high">"high"</option>
                </select>
            </div>

            // Permission Mode
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_permission_mode")}</label>
                <select
                    style="width: 100%;"
                    prop:value=move || form_permission_mode.get()
                    on:change=move |ev| form_permission_mode.set(event_target_value(&ev))
                >
                    <option value="">{t("launch_profiles.select_default")}</option>
                    <option value="default">"default"</option>
                    <option value="acceptEdits">"acceptEdits"</option>
                    <option value="plan">"plan"</option>
                    <option value="bypassPermissions">"bypassPermissions"</option>
                    <option value="dontAsk">"dontAsk"</option>
                </select>
            </div>

            // Allowed Tools
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_allowed_tools")}</label>
                <input
                    type="text"
                    placeholder=t("launch_profiles.tools_placeholder")
                    style="width: 100%;"
                    prop:value=move || form_allowed_tools.get()
                    on:input=move |ev| form_allowed_tools.set(event_target_value(&ev))
                />
            </div>

            // Disallowed Tools
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_disallowed_tools")}</label>
                <input
                    type="text"
                    placeholder=t("launch_profiles.tools_placeholder")
                    style="width: 100%;"
                    prop:value=move || form_disallowed_tools.get()
                    on:input=move |ev| form_disallowed_tools.set(event_target_value(&ev))
                />
            </div>

            // System Prompt
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_system_prompt")}</label>
                <textarea
                    style="width: 100%; min-height: 100px; font-family: monospace; font-size: 0.8rem;"
                    placeholder=t("launch_profiles.system_prompt_placeholder")
                    prop:value=move || form_system_prompt.get()
                    on:input=move |ev| form_system_prompt.set(event_target_value(&ev))
                />
            </div>

            // Append System Prompt
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_append_system_prompt")}</label>
                <textarea
                    style="width: 100%; min-height: 100px; font-family: monospace; font-size: 0.8rem;"
                    placeholder=t("launch_profiles.append_system_prompt_placeholder")
                    prop:value=move || form_append_system_prompt.get()
                    on:input=move |ev| form_append_system_prompt.set(event_target_value(&ev))
                />
            </div>

            // Max Budget USD
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_max_budget")}</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g. 5.00"
                    style="width: 100%;"
                    prop:value=move || form_max_budget.get()
                    on:input=move |ev| form_max_budget.set(event_target_value(&ev))
                />
            </div>

            // Fallback Model
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_fallback_model")}</label>
                <input
                    type="text"
                    placeholder=t("launch_profiles.fallback_model_placeholder")
                    style="width: 100%;"
                    prop:value=move || form_fallback_model.get()
                    on:input=move |ev| form_fallback_model.set(event_target_value(&ev))
                />
            </div>

            // Debug Filter
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_debug")}</label>
                <input
                    type="text"
                    placeholder=t("launch_profiles.debug_placeholder")
                    style="width: 100%;"
                    prop:value=move || form_debug.get()
                    on:input=move |ev| form_debug.set(event_target_value(&ev))
                />
            </div>

            // Additional Dirs
            <div style=field_style>
                <label style=label_style>{t("launch_profiles.field_add_dirs")}</label>
                <input
                    type="text"
                    placeholder=t("launch_profiles.add_dirs_placeholder")
                    style="width: 100%;"
                    prop:value=move || form_add_dirs.get()
                    on:input=move |ev| form_add_dirs.set(event_target_value(&ev))
                />
            </div>

            <button
                class="btn btn-primary"
                on:click=save_profile
            >
                {t("launch_profiles.save")}
            </button>
        </div>
    }
}

// ─────────────────────────────────────────────
// Tab 3: Presets
// ─────────────────────────────────────────────

#[component]
fn PresetsTab(
    active_tab: RwSignal<String>,
    form_name: RwSignal<String>,
    form_description: RwSignal<String>,
    form_model: RwSignal<String>,
    form_effort: RwSignal<String>,
    form_permission_mode: RwSignal<String>,
    form_allowed_tools: RwSignal<String>,
    form_disallowed_tools: RwSignal<String>,
    form_system_prompt: RwSignal<String>,
    form_append_system_prompt: RwSignal<String>,
    form_max_budget: RwSignal<String>,
    form_fallback_model: RwSignal<String>,
    form_debug: RwSignal<String>,
    form_add_dirs: RwSignal<String>,
) -> impl IntoView {
    let presets = builtin_presets();

    view! {
        <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.875rem;">
            {t("launch_profiles.presets_hint")}
        </p>

        <div class="skill-grid">
            {presets.into_iter().map(|preset| {
                let preset_for_use = preset.clone();
                let name = preset.name.clone();

                view! {
                    <div class="card skill-card">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <h3 style="font-size: 1rem; font-weight: 600; margin: 0;">{name}</h3>
                            <button
                                class="btn btn-secondary btn-sm"
                                on:click=move |_| {
                                    let p = preset_for_use.clone();
                                    form_name.set(p.name);
                                    form_description.set(p.description);
                                    form_model.set(p.model.unwrap_or_default());
                                    form_effort.set(p.effort.unwrap_or_default());
                                    form_permission_mode.set(p.permission_mode.unwrap_or_default());
                                    form_allowed_tools.set(p.allowed_tools.join(", "));
                                    form_disallowed_tools.set(p.disallowed_tools.join(", "));
                                    form_system_prompt.set(p.system_prompt.unwrap_or_default());
                                    form_append_system_prompt.set(p.append_system_prompt.unwrap_or_default());
                                    form_max_budget.set(
                                        p.max_budget_usd.map(|b| format!("{:.2}", b)).unwrap_or_default()
                                    );
                                    form_fallback_model.set(p.fallback_model.unwrap_or_default());
                                    form_debug.set(p.debug.unwrap_or_default());
                                    form_add_dirs.set(p.add_dirs.join(", "));
                                    active_tab.set("create".to_string());
                                }
                            >
                                {t("launch_profiles.use_as_template")}
                            </button>
                        </div>

                        <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.75rem;">
                            {preset.description.clone()}
                        </p>

                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            {preset.model.clone().map(|m| view! {
                                <span class="badge badge-success">{m}</span>
                            })}
                            {preset.effort.clone().map(|e| view! {
                                <span class="badge badge-muted">{t("launch_profiles.effort_label")} " " {e}</span>
                            })}
                            {preset.permission_mode.clone().map(|p| view! {
                                <span class="badge badge-muted">{p}</span>
                            })}
                            {preset.max_budget_usd.map(|b| view! {
                                <span class="badge badge-muted">"$" {format!("{:.2}", b)}</span>
                            })}
                            {if !preset.allowed_tools.is_empty() {
                                let tools_str = preset.allowed_tools.join(", ");
                                view! {
                                    <span class="badge badge-muted">{tools_str}</span>
                                }.into_view()
                            } else {
                                view! {}.into_view()
                            }}
                        </div>
                    </div>
                }
            }).collect_view()}
        </div>
    }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

fn non_empty(s: &str) -> Option<String> {
    let trimmed = s.trim();
    if trimmed.is_empty() {
        None
    } else {
        Some(trimmed.to_string())
    }
}

fn split_comma(s: &str) -> Vec<String> {
    s.split(',')
        .map(|part| part.trim().to_string())
        .filter(|part| !part.is_empty())
        .collect()
}
