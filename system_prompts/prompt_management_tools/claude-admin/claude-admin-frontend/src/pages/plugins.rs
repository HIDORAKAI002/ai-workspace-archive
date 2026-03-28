use leptos::*;

use crate::api;
use crate::i18n::t;

// ─────────────────────────────────────────────
// Local types (WASM cannot share backend crate)
// ─────────────────────────────────────────────

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct PluginInfo {
    pub name: String,
    pub path: String,
    pub description: Option<String>,
    pub version: Option<String>,
    pub enabled: bool,
    pub source: String,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct PluginInstallRequest {
    pub path: String,
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

#[component]
pub fn PluginsPage() -> impl IntoView {
    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "Plugins".to_string(),
        description: "Manage Claude Code plugins. Plugins extend functionality by adding custom commands and integrations.".to_string(),
        available_actions: vec![
            "Install plugin from path".to_string(),
            "Remove installed plugin".to_string(),
            "View plugin details".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    let plugins = create_resource(
        || (),
        |_| async move { api::get::<Vec<PluginInfo>>("/plugins").await },
    );

    let install_path = create_rw_signal(String::new());
    let status_msg = create_rw_signal::<Option<(String, bool)>>(None);

    let on_install = move |_| {
        let path = install_path.get();
        if path.trim().is_empty() {
            status_msg.set(Some((t("plugins.path_required").get(), false)));
            return;
        }
        let req = PluginInstallRequest { path };
        spawn_local(async move {
            match api::post::<PluginInfo, _>("/plugins", &req).await {
                Ok(plugin) => {
                    status_msg.set(Some((
                        format!("{} '{}'", t("plugins.install_success").get(), plugin.name),
                        true,
                    )));
                    install_path.set(String::new());
                    plugins.refetch();
                }
                Err(e) => {
                    status_msg.set(Some((e, false)));
                }
            }
        });
    };

    let delete_plugin = move |name: String| {
        let confirmed = web_sys::window()
            .and_then(|w| {
                w.confirm_with_message(&format!(
                    "{} '{}'?",
                    t("plugins.confirm_delete").get(),
                    name
                ))
                .ok()
            })
            .unwrap_or(false);
        if !confirmed {
            return;
        }
        spawn_local(async move {
            match api::delete(&format!("/plugins/{}", name)).await {
                Ok(_) => {
                    status_msg.set(Some((t("plugins.delete_success").get(), true)));
                    plugins.refetch();
                }
                Err(e) => {
                    status_msg.set(Some((e, false)));
                }
            }
        });
    };

    view! {
        <div class="page-header">
            <h2>{t("plugins.title")}</h2>
            <p>{t("plugins.subtitle")}</p>
        </div>

        // ── Install section ──
        <div class="card" style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.75rem;">{t("plugins.install_heading")}</h4>
            <div style="display: flex; gap: 0.5rem; align-items: flex-end;">
                <div style="flex: 1;">
                    <label style="font-size: 0.875rem; font-weight: 500;">{t("plugins.field_path")}</label>
                    <input
                        type="text"
                        placeholder=t("plugins.path_placeholder")
                        style="width: 100%; margin-top: 0.25rem;"
                        prop:value=move || install_path.get()
                        on:input=move |ev| install_path.set(event_target_value(&ev))
                    />
                </div>
                <button
                    class="btn btn-primary"
                    on:click=on_install
                >{t("plugins.install_btn")}</button>
            </div>
        </div>

        // ── Status message ──
        {move || status_msg.get().map(|(msg, success)| {
            let color = if success { "var(--success)" } else { "var(--error)" };
            view! {
                <div class="card" style=format!("margin-bottom: 1rem; border-left: 3px solid {};", color)>
                    <span style="font-size: 0.875rem;">{msg}</span>
                </div>
            }
        })}

        // ── Plugin list ──
        <Suspense fallback=move || view! { <div class="loading">{t("plugins.loading")}</div> }>
            {move || plugins.get().map(|result| match result {
                Ok(data) => {
                    if data.is_empty() {
                        view! {
                            <div class="empty-state">
                                <p>{t("plugins.empty")}</p>
                            </div>
                        }.into_view()
                    } else {
                        view! {
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{t("plugins.col_name")}</th>
                                            <th>{t("plugins.col_version")}</th>
                                            <th>{t("plugins.col_path")}</th>
                                            <th>{t("plugins.col_status")}</th>
                                            <th>{t("plugins.col_actions")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.into_iter().map(|plugin| {
                                            let name_for_delete = plugin.name.clone();

                                            view! {
                                                <tr>
                                                    <td>
                                                        <span style="font-weight: 600;">{plugin.name.clone()}</span>
                                                        <span class="badge badge-muted" style="margin-left: 0.5rem;">{plugin.source.clone()}</span>
                                                        {plugin.description.clone().map(|desc| view! {
                                                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">{desc}</div>
                                                        })}
                                                    </td>
                                                    <td style="color: var(--text-muted);">
                                                        {plugin.version.clone().unwrap_or_else(|| "-".to_string())}
                                                    </td>
                                                    <td>
                                                        <code style="font-size: 0.75rem;">{plugin.path.clone()}</code>
                                                    </td>
                                                    <td>
                                                        {if plugin.enabled {
                                                            view! { <span class="badge badge-success">{t("plugins.enabled")}</span> }.into_view()
                                                        } else {
                                                            view! { <span class="badge badge-muted">{t("plugins.disabled")}</span> }.into_view()
                                                        }}
                                                    </td>
                                                    <td>
                                                        <button
                                                            class="btn btn-danger btn-sm"
                                                            on:click=move |_| delete_plugin(name_for_delete.clone())
                                                        >{t("common.delete")}</button>
                                                    </td>
                                                </tr>
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
        </Suspense>
    }
}
