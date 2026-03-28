use claude_admin_shared::{
    BrowsableMcpServer, McpHealthResult, McpInstallRequest, McpServerCreateRequest,
    McpServerDetail, McpServerUpdateRequest,
};
use leptos::*;

use crate::api;
use crate::components::confirm_dialog::ConfirmDialog;
use crate::i18n::t;

#[component]
pub fn McpServersPage() -> impl IntoView {
    let active_tab = create_rw_signal("servers".to_string());

    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "MCP Servers".to_string(),
        description: "Manage Model Context Protocol (MCP) servers. MCP servers provide additional tools and resources to Claude Code via stdio or SSE transports.".to_string(),
        available_actions: vec![
            "Add new MCP server".to_string(),
            "Edit server configuration".to_string(),
            "Delete MCP server".to_string(),
            "Check server health".to_string(),
            "Browse MCP catalog".to_string(),
            "Install from catalog".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    view! {
        <div class="page-header">
            <h2>{t("mcp.title")}</h2>
            <p>{t("mcp.subtitle")}</p>
        </div>

        <div class="tabs">
            <button
                class=move || if active_tab.get() == "servers" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("servers".to_string())
            >{t("mcp.tab_servers")}</button>
            <button
                class=move || if active_tab.get() == "health" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("health".to_string())
            >{t("mcp.tab_health")}</button>
            <button
                class=move || if active_tab.get() == "add" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("add".to_string())
            >{t("mcp.tab_add")}</button>
            <button
                class=move || if active_tab.get() == "browse" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("browse".to_string())
            >{t("mcp.tab_browse")}</button>
            <button
                class=move || if active_tab.get() == "tools" { "tab active" } else { "tab" }
                on:click=move |_| active_tab.set("tools".to_string())
            >{t("mcp.tab_tools")}</button>
        </div>

        {move || match active_tab.get().as_str() {
            "servers" => view! { <ServersTab/> }.into_view(),
            "health" => view! { <HealthCheckTab/> }.into_view(),
            "add" => view! { <AddServerTab/> }.into_view(),
            "browse" => view! { <BrowseCatalogTab/> }.into_view(),
            "tools" => view! { <ToolExplorerTab/> }.into_view(),
            _ => view! { <ServersTab/> }.into_view(),
        }}
    }
}

/// Return CSS for source badge color.
fn source_badge_style(source: &str) -> &'static str {
    if source == "claude_code" {
        "background: var(--success); color: #fff;"
    } else if source == "claude_desktop" {
        "background: var(--warning); color: #000;"
    } else {
        "background: var(--text-muted); color: #fff;"
    }
}

/// Return label for source badge.
fn source_badge_label(source: &str) -> String {
    if source == "claude_code" {
        "Claude Code".to_string()
    } else if source == "claude_desktop" {
        "Claude Desktop".to_string()
    } else if let Some(project) = source.strip_prefix("project:") {
        format!("Project: {}", project)
    } else {
        source.to_string()
    }
}

// ─────────────────────────────────────────────
// Servers Tab
// ─────────────────────────────────────────────

#[component]
fn ServersTab() -> impl IntoView {
    let servers = create_resource(
        || (),
        |_| async move { api::get::<Vec<McpServerDetail>>("/mcp").await },
    );
    let selected = create_rw_signal::<Option<String>>(None);
    let selected_source = create_rw_signal::<Option<String>>(None);
    let editor_content = create_rw_signal(String::new());
    let save_status = create_rw_signal::<Option<(String, bool)>>(None);
    let confirm_delete = create_rw_signal(false);
    let delete_target = create_rw_signal::<Option<String>>(None);

    view! {
        <Suspense fallback=move || view! { <div class="loading">{t("mcp.loading")}</div> }>
            {move || servers.get().map(|result| match result {
                Ok(list) => {
                    if list.is_empty() {
                        view! {
                            <div class="empty-state">
                                <p>{t("mcp.no_servers")}</p>
                                <p style="color: var(--text-muted); font-size: 0.875rem;">
                                    {t("mcp.no_servers_hint")}
                                </p>
                            </div>
                        }.into_view()
                    } else {
                        let list_clone = list.clone();
                        view! {
                            <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; min-height: 400px;">
                                // Left: server list
                                <div class="card" style="padding: 0; overflow: hidden;">
                                    <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); font-weight: 600; font-size: 0.875rem;">
                                        {format!("{} Server{}", list.len(), if list.len() == 1 { "" } else { "s" })}
                                    </div>
                                    {list.into_iter().map(|s| {
                                        let name = s.name.clone();
                                        let name_click = s.name.clone();
                                        let source = s.source.clone();
                                        let source_click = s.source.clone();
                                        let config_json = serde_json::to_string_pretty(&s.raw_config).unwrap_or_default();
                                        let server_type = if s.command.is_empty() { "sse" } else { "stdio" };
                                        let badge_style = source_badge_style(&source);
                                        let badge_label = source_badge_label(&source);

                                        view! {
                                            <div
                                                style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.15s;"
                                                class="hover-highlight"
                                                on:click=move |_| {
                                                    selected.set(Some(name_click.clone()));
                                                    selected_source.set(Some(source_click.clone()));
                                                    editor_content.set(config_json.clone());
                                                    save_status.set(None);
                                                }
                                            >
                                                <div style="font-weight: 500; font-size: 0.875rem;">{name}</div>
                                                <div style="display: flex; gap: 0.35rem; margin-top: 0.25rem;">
                                                    <span class="badge badge-muted" style="font-size: 0.7rem;">
                                                        {server_type}
                                                    </span>
                                                    <span class="badge" style=format!("font-size: 0.65rem; padding: 0.1rem 0.4rem; border-radius: 4px; {}", badge_style)>
                                                        {badge_label}
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                    }).collect_view()}
                                </div>

                                // Right: editor
                                <div>
                                    {move || {
                                        if let Some(name) = selected.get() {
                                            let is_editable = selected_source.get().as_deref() == Some("claude_code");
                                            let name_save = name.clone();
                                            let name_delete = name.clone();
                                            let name_health = name.clone();

                                            view! {
                                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                                    <h3 style="margin: 0;">{name}</h3>
                                                    <div style="display: flex; gap: 0.5rem;">
                                                        <button
                                                            class="btn btn-sm"
                                                            on:click=move |_| {
                                                                let n = name_health.clone();
                                                                spawn_local(async move {
                                                                    match api::get::<McpHealthResult>(&format!("/mcp/{}/health", n)).await {
                                                                        Ok(r) => {
                                                                            let ok = r.error.is_none();
                                                                            let msg = if let Some(e) = r.error {
                                                                                format!("Error: {}", e)
                                                                            } else {
                                                                                format!("OK - {} tools, {}ms", r.tools.len(), r.duration_ms)
                                                                            };
                                                                            save_status.set(Some((msg, ok)));
                                                                        }
                                                                        Err(e) => save_status.set(Some((format!("Error: {}", e), false))),
                                                                    }
                                                                });
                                                            }
                                                        >{t("mcp.check_health")}</button>
                                                        {if is_editable {
                                                            view! {
                                                                <button
                                                                    class="btn btn-primary btn-sm"
                                                                    on:click=move |_| {
                                                                        let n = name_save.clone();
                                                                        let content = editor_content.get();
                                                                        spawn_local(async move {
                                                                            match serde_json::from_str::<serde_json::Value>(&content) {
                                                                                Ok(config) => {
                                                                                    let req = McpServerUpdateRequest { config };
                                                                                    match api::put::<McpServerDetail, _>(&format!("/mcp/{}", n), &req).await {
                                                                                        Ok(_) => save_status.set(Some(("Saved!".to_string(), true))),
                                                                                        Err(e) => save_status.set(Some((format!("Error: {}", e), false))),
                                                                                    }
                                                                                }
                                                                                Err(e) => save_status.set(Some((format!("Invalid JSON: {}", e), false))),
                                                                            }
                                                                        });
                                                                    }
                                                                >{t("mcp.save")}</button>
                                                                <button
                                                                    class="btn btn-sm"
                                                                    style="color: var(--error);"
                                                                    on:click=move |_| {
                                                                        delete_target.set(Some(name_delete.clone()));
                                                                        confirm_delete.set(true);
                                                                    }
                                                                >{t("mcp.delete")}</button>
                                                            }.into_view()
                                                        } else {
                                                            view! {
                                                                <span class="badge badge-muted" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;">
                                                                    {t("mcp.read_only")}
                                                                </span>
                                                            }.into_view()
                                                        }}
                                                    </div>
                                                </div>

                                                {move || {
                                                    let is_ro = selected_source.get().as_deref() != Some("claude_code");
                                                    if is_ro {
                                                        Some(view! {
                                                            <div class="card" style="margin-bottom: 1rem; padding: 0.5rem 1rem; border-left: 3px solid var(--warning); font-size: 0.85rem; color: var(--text-secondary);">
                                                                {t("mcp.read_only_hint")}
                                                            </div>
                                                        })
                                                    } else {
                                                        None
                                                    }
                                                }}

                                                {move || save_status.get().map(|(msg, ok)| view! {
                                                    <div class="card" style=format!(
                                                        "margin-bottom: 1rem; padding: 0.5rem 1rem; border-left: 3px solid {};",
                                                        if ok { "var(--success)" } else { "var(--error)" }
                                                    )>
                                                        <span style="font-size: 0.875rem;">{msg}</span>
                                                    </div>
                                                })}

                                                <div class="editor-container">
                                                    <textarea
                                                        class="editor-textarea"
                                                        style="min-height: 300px; font-family: monospace; font-size: 0.85rem;"
                                                        prop:value=move || editor_content.get()
                                                        prop:disabled=move || selected_source.get().as_deref() != Some("claude_code")
                                                        on:input=move |ev| editor_content.set(event_target_value(&ev))
                                                    />
                                                </div>
                                            }.into_view()
                                        } else {
                                            let first_name = list_clone.first().map(|s| s.name.clone());
                                            view! {
                                                <div class="empty-state" style="min-height: 300px; display: flex; align-items: center; justify-content: center;">
                                                    <p style="color: var(--text-muted);">
                                                        {if first_name.is_some() {
                                                            t("mcp.select_server")
                                                        } else {
                                                            t("mcp.no_servers_configured")
                                                        }}
                                                    </p>
                                                </div>
                                            }.into_view()
                                        }
                                    }}
                                </div>
                            </div>
                        }.into_view()
                    }
                }
                Err(e) => view! {
                    <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                }.into_view(),
            })}
        </Suspense>

        <ConfirmDialog
            show=confirm_delete
            title=t("mcp.confirm_delete_title").get_untracked()
            message=t("mcp.confirm_delete_msg").get_untracked()
            confirm_label=t("common.delete").get_untracked()
            on_confirm=Callback::new(move |_| {
                if let Some(name) = delete_target.get() {
                    spawn_local(async move {
                        match api::delete(&format!("/mcp/{}", name)).await {
                            Ok(_) => {
                                selected.set(None);
                                save_status.set(Some(("Deleted!".to_string(), true)));
                                servers.refetch();
                            }
                            Err(e) => save_status.set(Some((format!("Error: {}", e), false))),
                        }
                    });
                }
            })
        />
    }
}

// ─────────────────────────────────────────────
// Health Check Tab
// ─────────────────────────────────────────────

#[component]
fn HealthCheckTab() -> impl IntoView {
    let results = create_rw_signal::<Option<Result<Vec<McpHealthResult>, String>>>(None);
    let loading = create_rw_signal(false);

    view! {
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="margin: 0;">{t("mcp.health.title")}</h3>
            <button
                class="btn btn-primary"
                prop:disabled=move || loading.get()
                on:click=move |_| {
                    loading.set(true);
                    results.set(None);
                    spawn_local(async move {
                        let res = api::get::<Vec<McpHealthResult>>("/mcp/health").await;
                        results.set(Some(res));
                        loading.set(false);
                    });
                }
            >
                {move || if loading.get() { t("mcp.health.checking") } else { t("mcp.health.check_all") }}
            </button>
        </div>

        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1.5rem;">
            {t("mcp.health.description")}
        </p>

        {move || results.get().map(|res| match res {
            Ok(checks) => {
                if checks.is_empty() {
                    view! {
                        <div class="empty-state"><p>{t("mcp.no_servers")}</p></div>
                    }.into_view()
                } else {
                    view! {
                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t("mcp.health.col_name")}</th>
                                        <th>{t("mcp.health.col_source")}</th>
                                        <th>{t("mcp.health.col_status")}</th>
                                        <th>{t("mcp.health.col_server_info")}</th>
                                        <th>{t("mcp.health.col_tools")}</th>
                                        <th>{t("mcp.health.col_duration")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checks.into_iter().map(|r| {
                                        let (badge_class, status_text) = match r.status {
                                            claude_admin_shared::McpServerStatus::Running => ("badge badge-success", t("mcp.health.running").get_untracked()),
                                            claude_admin_shared::McpServerStatus::Error => ("badge badge-error", t("mcp.health.error").get_untracked()),
                                            claude_admin_shared::McpServerStatus::Timeout => ("badge badge-warning", t("mcp.health.timeout").get_untracked()),
                                            claude_admin_shared::McpServerStatus::Unsupported => ("badge badge-muted", t("mcp.health.unsupported").get_untracked()),
                                            claude_admin_shared::McpServerStatus::Unknown => ("badge badge-muted", t("mcp.health.unknown").get_untracked()),
                                        };
                                        let src_style = source_badge_style(&r.source);
                                        let src_label = source_badge_label(&r.source);

                                        view! {
                                            <tr>
                                                <td style="font-weight: 500;">{r.name}</td>
                                                <td>
                                                    <span class="badge" style=format!("font-size: 0.65rem; padding: 0.1rem 0.4rem; border-radius: 4px; {}", src_style)>
                                                        {src_label}
                                                    </span>
                                                </td>
                                                <td><span class=badge_class>{status_text}</span></td>
                                                <td style="font-size: 0.85rem; color: var(--text-secondary);">
                                                    {r.server_info.unwrap_or_else(|| "-".to_string())}
                                                </td>
                                                <td>{r.tools.len().to_string()}</td>
                                                <td style="font-size: 0.85rem; color: var(--text-muted);">
                                                    {format!("{}ms", r.duration_ms)}
                                                </td>
                                            </tr>
                                            {r.error.map(|e| view! {
                                                <tr>
                                                    <td colspan="6">
                                                        <div class="card" style="margin: 0.25rem 0; padding: 0.5rem; border-left: 3px solid var(--error); font-size: 0.8rem; color: var(--error);">
                                                            {e}
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                            {r.stderr_output.map(|s| view! {
                                                <tr>
                                                    <td colspan="6">
                                                        <div class="mcp-stderr">{s}</div>
                                                    </td>
                                                </tr>
                                            })}
                                        }
                                    }).collect_view()}
                                </tbody>
                            </table>
                        </div>
                    }.into_view()
                }
            }
            Err(e) => view! {
                <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
            }.into_view(),
        })}
    }
}

// ─────────────────────────────────────────────
// Add Server Tab
// ─────────────────────────────────────────────

#[component]
fn AddServerTab() -> impl IntoView {
    let name = create_rw_signal(String::new());
    let command = create_rw_signal(String::new());
    let args_text = create_rw_signal(String::new());
    let env_text = create_rw_signal(String::new());
    let advanced_mode = create_rw_signal(false);
    let config_json = create_rw_signal(
        "{\n  \"command\": \"npx\",\n  \"args\": [\"-y\", \"@modelcontextprotocol/server-name\"],\n  \"env\": {}\n}".to_string()
    );
    let status = create_rw_signal::<Option<(String, bool)>>(None);

    // Build config JSON from structured fields
    let build_config = move || -> Result<serde_json::Value, String> {
        if advanced_mode.get() {
            serde_json::from_str::<serde_json::Value>(&config_json.get())
                .map_err(|e| format!("Invalid JSON: {}", e))
        } else {
            let cmd = command.get();
            if cmd.trim().is_empty() {
                return Err("Please enter a command".to_string());
            }
            let args: Vec<String> = args_text
                .get()
                .lines()
                .map(|l| l.trim().to_string())
                .filter(|l| !l.is_empty())
                .collect();
            let mut env_map = serde_json::Map::new();
            for line in env_text.get().lines() {
                let line = line.trim();
                if line.is_empty() {
                    continue;
                }
                if let Some((k, v)) = line.split_once('=') {
                    env_map.insert(
                        k.trim().to_string(),
                        serde_json::Value::String(v.trim().to_string()),
                    );
                }
            }
            Ok(serde_json::json!({
                "command": cmd.trim(),
                "args": args,
                "env": env_map,
            }))
        }
    };

    view! {
        <h3 style="margin-bottom: 1rem;">{t("mcp.add.title")}</h3>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1.5rem;">
            {t("mcp.add.description")}
        </p>

        {move || status.get().map(|(msg, ok)| view! {
            <div class="card" style=format!(
                "margin-bottom: 1rem; padding: 0.5rem 1rem; border-left: 3px solid {};",
                if ok { "var(--success)" } else { "var(--error)" }
            )>
                <span style="font-size: 0.875rem;">{msg}</span>
            </div>
        })}

        <div class="card" style="padding: 1.5rem;">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; font-weight: 500; margin-bottom: 0.5rem; font-size: 0.875rem;">{t("mcp.add.name_label")}</label>
                <input
                    type="text"
                    placeholder="e.g. my-server"
                    style="max-width: 400px;"
                    prop:value=move || name.get()
                    on:input=move |ev| name.set(event_target_value(&ev))
                />
            </div>

            // Mode toggle
            <div style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem;">
                <button
                    class=move || if !advanced_mode.get() { "btn btn-sm btn-primary" } else { "btn btn-sm btn-secondary" }
                    on:click=move |_| advanced_mode.set(false)
                >{t("mcp.add.mode_form")}</button>
                <button
                    class=move || if advanced_mode.get() { "btn btn-sm btn-primary" } else { "btn btn-sm btn-secondary" }
                    on:click=move |_| advanced_mode.set(true)
                >{t("mcp.add.mode_json")}</button>
            </div>

            {move || if advanced_mode.get() {
                // Advanced: raw JSON editor
                view! {
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-weight: 500; margin-bottom: 0.5rem; font-size: 0.875rem;">{t("mcp.add.config_label")}</label>
                        <div class="editor-container">
                            <textarea
                                class="editor-textarea"
                                style="min-height: 200px; font-family: monospace; font-size: 0.85rem;"
                                prop:value=move || config_json.get()
                                on:input=move |ev| config_json.set(event_target_value(&ev))
                            />
                        </div>
                    </div>
                }.into_view()
            } else {
                // Structured form
                view! {
                    <div class="form-group">
                        <label>{t("mcp.add.command_label")}</label>
                        <input
                            type="text"
                            placeholder="e.g. npx, node, uvx, docker"
                            style="max-width: 400px;"
                            prop:value=move || command.get()
                            on:input=move |ev| command.set(event_target_value(&ev))
                        />
                    </div>
                    <div class="form-group">
                        <label>{t("mcp.add.args_label")}</label>
                        <textarea
                            class="editor-textarea"
                            style="min-height: 80px; font-family: monospace; font-size: 0.85rem;"
                            placeholder="-y\n@modelcontextprotocol/server-name"
                            prop:value=move || args_text.get()
                            on:input=move |ev| args_text.set(event_target_value(&ev))
                        />
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
                            {t("mcp.add.args_hint")}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>{t("mcp.add.env_label")}</label>
                        <textarea
                            class="editor-textarea"
                            style="min-height: 60px; font-family: monospace; font-size: 0.85rem;"
                            placeholder="API_KEY=your-key\nDEBUG=true"
                            prop:value=move || env_text.get()
                            on:input=move |ev| env_text.set(event_target_value(&ev))
                        />
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
                            {t("mcp.add.env_hint")}
                        </div>
                    </div>
                }.into_view()
            }}

            <button
                class="btn btn-primary"
                on:click=move |_| {
                    let n = name.get();
                    if n.trim().is_empty() {
                        status.set(Some(("Please enter a server name".to_string(), false)));
                        return;
                    }
                    let config = match build_config() {
                        Ok(c) => c,
                        Err(e) => {
                            status.set(Some((e, false)));
                            return;
                        }
                    };
                    spawn_local(async move {
                        let req = McpServerCreateRequest {
                            name: n.clone(),
                            config,
                        };
                        match api::post::<McpServerDetail, _>("/mcp", &req).await {
                            Ok(_) => {
                                status.set(Some((format!("'{}' added successfully!", n), true)));
                                name.set(String::new());
                            }
                            Err(e) => status.set(Some((format!("Error: {}", e), false))),
                        }
                    });
                }
            >{t("mcp.add.submit")}</button>
        </div>
    }
}

// ─────────────────────────────────────────────
// Browse Catalog Tab
// ─────────────────────────────────────────────

fn category_label(cat: &str) -> Signal<String> {
    match cat {
        "system" => t("mcp.browse.cat_system"),
        "database" => t("mcp.browse.cat_database"),
        "api" => t("mcp.browse.cat_api"),
        "specialized" => t("mcp.browse.cat_specialized"),
        _ => t("mcp.browse.cat_specialized"),
    }
}

fn category_color(cat: &str) -> &'static str {
    match cat {
        "system" => "background: var(--info); color: #fff;",
        "database" => "background: var(--warning); color: #000;",
        "api" => "background: var(--success); color: #fff;",
        "specialized" => "background: var(--text-muted); color: #fff;",
        _ => "background: var(--text-muted); color: #fff;",
    }
}

#[component]
fn BrowseCatalogTab() -> impl IntoView {
    let catalog = create_resource(
        || (),
        |_| async move { api::get::<Vec<BrowsableMcpServer>>("/mcp-browser").await },
    );
    let expanded = create_rw_signal::<Option<String>>(None);
    let edit_config = create_rw_signal(String::new());
    let install_status = create_rw_signal::<Option<(String, bool)>>(None);

    view! {
        <h3 style="margin-bottom: 0.5rem;">{t("mcp.browse.title")}</h3>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1.5rem;">
            {t("mcp.browse.description")}
        </p>

        {move || install_status.get().map(|(msg, ok)| view! {
            <div class="card" style=format!(
                "margin-bottom: 1rem; padding: 0.5rem 1rem; border-left: 3px solid {};",
                if ok { "var(--success)" } else { "var(--error)" }
            )>
                <span style="font-size: 0.875rem;">{msg}</span>
            </div>
        })}

        <Suspense fallback=move || view! { <div class="loading">{t("mcp.loading")}</div> }>
            {move || catalog.get().map(|result| match result {
                Ok(servers) => {
                    let categories = vec!["system", "database", "api", "specialized"];
                    view! {
                        {categories.into_iter().map(|cat| {
                            let cat_servers: Vec<_> = servers.iter()
                                .filter(|s| s.category == cat)
                                .cloned()
                                .collect();
                            if cat_servers.is_empty() {
                                return view! { <div></div> }.into_view();
                            }
                            view! {
                                <div style="margin-bottom: 1.5rem;">
                                    <h4 style="margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                                        <span class="badge" style=format!("font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: 4px; {}", category_color(cat))>
                                            {category_label(cat)}
                                        </span>
                                    </h4>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem;">
                                        {cat_servers.into_iter().map(|server| {
                                            let name = server.name.clone();
                                            let name_expand = server.name.clone();
                                            let name_install = server.name.clone();
                                            let config_json = serde_json::to_string_pretty(&server.default_config).unwrap_or_default();
                                            let config_for_expand = config_json.clone();
                                            let installed = server.installed;

                                            view! {
                                                <div class="card" style="padding: 1rem; position: relative;">
                                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                                        <div>
                                                            <div style="font-weight: 600; font-size: 0.95rem;">{&server.name}</div>
                                                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
                                                                <span class="badge badge-muted" style="font-size: 0.65rem; padding: 0.1rem 0.3rem;">
                                                                    {t("mcp.browse.npm")}
                                                                </span>
                                                                " "
                                                                {&server.npm_package}
                                                            </div>
                                                        </div>
                                                        {if installed {
                                                            view! {
                                                                <span class="badge badge-success" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">
                                                                    {t("mcp.browse.installed")}
                                                                </span>
                                                            }.into_view()
                                                        } else {
                                                            view! { <span></span> }.into_view()
                                                        }}
                                                    </div>
                                                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0.5rem 0 0.75rem 0; line-height: 1.4;">
                                                        {&server.description}
                                                    </p>
                                                    <div style="display: flex; gap: 0.5rem;">
                                                        <button
                                                            class="btn btn-sm"
                                                            on:click=move |_| {
                                                                if expanded.get().as_deref() == Some(&name_expand) {
                                                                    expanded.set(None);
                                                                } else {
                                                                    edit_config.set(config_for_expand.clone());
                                                                    expanded.set(Some(name_expand.clone()));
                                                                    install_status.set(None);
                                                                }
                                                            }
                                                        >
                                                            {move || {
                                                                if expanded.get().as_deref() == Some(&name) {
                                                                    t("mcp.browse.hide_config").get()
                                                                } else {
                                                                    t("mcp.browse.show_config").get()
                                                                }
                                                            }}
                                                        </button>
                                                    </div>

                                                    // Expandable config panel
                                                    {move || {
                                                        if expanded.get().as_deref() == Some(&name_install) {
                                                            let n = name_install.clone();
                                                            Some(view! {
                                                                <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border);">
                                                                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                                                                        {t("mcp.browse.config_hint")}
                                                                    </p>
                                                                    <div class="editor-container">
                                                                        <textarea
                                                                            class="editor-textarea"
                                                                            style="min-height: 140px; font-family: monospace; font-size: 0.8rem;"
                                                                            prop:value=move || edit_config.get()
                                                                            on:input=move |ev| edit_config.set(event_target_value(&ev))
                                                                        />
                                                                    </div>
                                                                    <div style="margin-top: 0.5rem;">
                                                                        <button
                                                                            class="btn btn-primary btn-sm"
                                                                            prop:disabled=installed
                                                                            on:click=move |_| {
                                                                                let server_name = n.clone();
                                                                                let config_str = edit_config.get();
                                                                                spawn_local(async move {
                                                                                    match serde_json::from_str::<serde_json::Value>(&config_str) {
                                                                                        Ok(config) => {
                                                                                            let req = McpInstallRequest {
                                                                                                name: server_name.clone(),
                                                                                                config,
                                                                                            };
                                                                                            match api::post::<McpServerDetail, _>("/mcp-browser/install", &req).await {
                                                                                                Ok(_) => {
                                                                                                    install_status.set(Some((format!("'{}' installed!", server_name), true)));
                                                                                                    catalog.refetch();
                                                                                                }
                                                                                                Err(e) => install_status.set(Some((format!("Error: {}", e), false))),
                                                                                            }
                                                                                        }
                                                                                        Err(e) => install_status.set(Some((format!("Invalid JSON: {}", e), false))),
                                                                                    }
                                                                                });
                                                                            }
                                                                        >
                                                                            {if installed {
                                                                                t("mcp.browse.installed")
                                                                            } else {
                                                                                t("mcp.browse.install")
                                                                            }}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            })
                                                        } else {
                                                            None
                                                        }
                                                    }}
                                                </div>
                                            }
                                        }).collect_view()}
                                    </div>
                                </div>
                            }.into_view()
                        }).collect_view()}
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
// Tool Explorer Tab
// ─────────────────────────────────────────────

#[component]
fn ToolExplorerTab() -> impl IntoView {
    let search_query = create_rw_signal(String::new());

    let health_data = create_resource(
        || (),
        |_| async move { api::get::<Vec<McpHealthResult>>("/mcp/health").await },
    );

    view! {
        <div style="margin-bottom: 1rem;">
            <input
                type="text"
                placeholder=t("mcp.tools.search")
                style="max-width: 400px;"
                prop:value=move || search_query.get()
                on:input=move |ev| search_query.set(event_target_value(&ev))
            />
        </div>

        <Suspense fallback=move || view! { <div class="loading">{t("mcp.tools.loading")}</div> }>
            {move || {
                let query = search_query.get().to_lowercase();

                health_data.get().map(|result| match result {
                    Ok(servers) => {
                        // Flatten all tools grouped by server
                        let mut tool_cards: Vec<(String, String, claude_admin_shared::McpToolInfo)> = Vec::new();
                        for server in &servers {
                            if server.status != claude_admin_shared::McpServerStatus::Running {
                                continue;
                            }
                            for tool in &server.tools {
                                if !query.is_empty() {
                                    let name_match = tool.name.to_lowercase().contains(&query);
                                    let desc_match = tool.description.as_ref()
                                        .map(|d| d.to_lowercase().contains(&query))
                                        .unwrap_or(false);
                                    if !name_match && !desc_match {
                                        continue;
                                    }
                                }
                                tool_cards.push((
                                    server.name.clone(),
                                    server.source.clone(),
                                    tool.clone(),
                                ));
                            }
                        }

                        if tool_cards.is_empty() {
                            view! {
                                <div class="empty-state"><p>{t("mcp.tools.no_tools")}</p></div>
                            }.into_view()
                        } else {
                            // Group by server
                            let mut grouped: std::collections::BTreeMap<String, Vec<(String, claude_admin_shared::McpToolInfo)>> =
                                std::collections::BTreeMap::new();
                            for (server_name, source, tool) in tool_cards {
                                grouped.entry(server_name).or_default().push((source, tool));
                            }

                            view! {
                                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                                    {grouped.into_iter().map(|(server_name, tools)| {
                                        let source_label = tools.first().map(|(s, _)| source_badge_label(s)).unwrap_or_default();
                                        view! {
                                            <div>
                                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                                                    <h4 style="margin: 0;">{server_name}</h4>
                                                    <span class="badge badge-muted" style="font-size: 0.7rem;">{source_label}</span>
                                                    <span class="badge badge-muted" style="font-size: 0.7rem;">{tools.len()} " tools"</span>
                                                </div>
                                                <div class="skill-grid">
                                                    {tools.into_iter().map(|(_, tool)| {
                                                        let has_schema = tool.input_schema.is_some();
                                                        let required_fields: Vec<String> = tool.input_schema.as_ref()
                                                            .and_then(|s| s.get("required"))
                                                            .and_then(|v| v.as_array())
                                                            .map(|arr| arr.iter().filter_map(|v| v.as_str().map(String::from)).collect())
                                                            .unwrap_or_default();
                                                        let schema_json = tool.input_schema
                                                            .as_ref()
                                                            .map(|s| serde_json::to_string_pretty(s).unwrap_or_default())
                                                            .unwrap_or_default();

                                                        view! {
                                                            <div class="card skill-card">
                                                                <div style="margin-bottom: 0.5rem;">
                                                                    <span style="font-weight: 600; font-size: 1rem; font-family: monospace;">{tool.name}</span>
                                                                </div>
                                                                {tool.description.map(|desc| view! {
                                                                    <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.5rem;">
                                                                        {desc}
                                                                    </p>
                                                                })}
                                                                {if !required_fields.is_empty() {
                                                                    view! {
                                                                        <div style="margin-bottom: 0.5rem; font-size: 0.75rem;">
                                                                            <span style="color: var(--text-muted);">{t("mcp.tools.required")} ": "</span>
                                                                            {required_fields.iter().map(|f| view! {
                                                                                <code style="margin-right: 0.25rem; background: var(--bg-primary); padding: 0.1rem 0.3rem; border-radius: 0.2rem;">{f.clone()}</code>
                                                                            }).collect_view()}
                                                                        </div>
                                                                    }.into_view()
                                                                } else {
                                                                    view! {}.into_view()
                                                                }}
                                                                {if has_schema {
                                                                    view! {
                                                                        <details style="margin-top: 0.25rem;">
                                                                            <summary style="cursor: pointer; color: var(--text-muted); font-size: 0.8rem;">
                                                                                {t("mcp.tools.parameters")}
                                                                            </summary>
                                                                            <pre style="
                                                                                margin-top: 0.5rem;
                                                                                padding: 0.5rem;
                                                                                background: var(--bg-primary);
                                                                                border-radius: 0.375rem;
                                                                                font-size: 0.75rem;
                                                                                line-height: 1.4;
                                                                                overflow-x: auto;
                                                                                max-height: 200px;
                                                                                color: var(--text-secondary);
                                                                            ">
                                                                                {schema_json}
                                                                            </pre>
                                                                        </details>
                                                                    }.into_view()
                                                                } else {
                                                                    view! {}.into_view()
                                                                }}
                                                            </div>
                                                        }
                                                    }).collect_view()}
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
