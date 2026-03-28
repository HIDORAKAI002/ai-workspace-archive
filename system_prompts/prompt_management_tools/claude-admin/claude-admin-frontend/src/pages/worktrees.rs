use leptos::*;

use crate::api;
use crate::i18n::t;

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct WorktreeInfo {
    pub path: String,
    pub branch: String,
    pub head_commit: String,
    pub is_main: bool,
    pub is_bare: bool,
    pub project_name: Option<String>,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct WorktreeCreateRequest {
    pub project_path: String,
    pub name: Option<String>,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct WorktreeCreateResult {
    pub path: String,
    pub branch: String,
}

#[component]
pub fn WorktreesPage() -> impl IntoView {
    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "Worktrees".to_string(),
        description: "Manage Git worktrees for your projects. Worktrees let you work on multiple branches simultaneously in separate directories.".to_string(),
        available_actions: vec![
            "Create new worktree".to_string(),
            "Remove worktree".to_string(),
            "View worktree details".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    let worktrees = create_resource(
        || (),
        |_| async move { api::get::<Vec<WorktreeInfo>>("/worktrees").await },
    );

    let project_path = create_rw_signal(String::new());
    let worktree_name = create_rw_signal(String::new());
    let action_status = create_rw_signal::<Option<(String, bool)>>(None);

    let create_worktree = move |_| {
        let path = project_path.get();
        if path.trim().is_empty() {
            action_status.set(Some((t("worktrees.path_required").get(), false)));
            return;
        }
        let name = worktree_name.get();
        let name_opt = if name.trim().is_empty() {
            None
        } else {
            Some(name)
        };

        action_status.set(None);
        spawn_local(async move {
            let req = WorktreeCreateRequest {
                project_path: path,
                name: name_opt,
            };
            match api::post::<WorktreeCreateResult, _>("/worktrees", &req).await {
                Ok(result) => {
                    action_status.set(Some((
                        format!(
                            "Worktree created: {} (branch: {})",
                            result.path, result.branch
                        ),
                        true,
                    )));
                    project_path.set(String::new());
                    worktree_name.set(String::new());
                    worktrees.refetch();
                }
                Err(e) => action_status.set(Some((e, false))),
            }
        });
    };

    let delete_worktree = move |path: String| {
        if !web_sys::window()
            .and_then(|w| {
                w.confirm_with_message(&format!("Delete worktree at '{}'?", path))
                    .ok()
            })
            .unwrap_or(false)
        {
            return;
        }
        action_status.set(None);
        spawn_local(async move {
            let encoded = js_sys::encode_uri_component(&path);
            match api::delete(&format!("/worktrees/{}", encoded)).await {
                Ok(_) => {
                    action_status.set(Some((format!("Worktree '{}' removed", path), true)));
                    worktrees.refetch();
                }
                Err(e) => action_status.set(Some((e, false))),
            }
        });
    };

    view! {
        <div class="page-header">
            <h2>{t("worktrees.title")}</h2>
            <p>{t("worktrees.subtitle")}</p>
        </div>

        // Status message
        {move || action_status.get().map(|(msg, ok)| {
            let color = if ok { "var(--success)" } else { "var(--error)" };
            view! {
                <div class="card" style=format!("margin-bottom: 1rem; border-left: 3px solid {};", color)>
                    <span style="font-size: 0.875rem;">{msg}</span>
                </div>
            }
        })}

        // Create section
        <div class="card" style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.75rem;">{t("worktrees.create_heading")}</h4>
            <div style="display: flex; gap: 0.75rem; align-items: flex-end; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 250px;">
                    <label style="font-size: 0.875rem; font-weight: 500;">{t("worktrees.project_path")}</label>
                    <input
                        type="text"
                        placeholder=t("worktrees.project_path_placeholder")
                        style="width: 100%; margin-top: 0.25rem;"
                        prop:value=move || project_path.get()
                        on:input=move |ev| project_path.set(event_target_value(&ev))
                    />
                </div>
                <div style="min-width: 180px;">
                    <label style="font-size: 0.875rem; font-weight: 500;">{t("worktrees.name_label")}</label>
                    <input
                        type="text"
                        placeholder=t("worktrees.name_placeholder")
                        style="width: 100%; margin-top: 0.25rem;"
                        prop:value=move || worktree_name.get()
                        on:input=move |ev| worktree_name.set(event_target_value(&ev))
                    />
                </div>
                <button
                    class="btn btn-primary"
                    on:click=create_worktree
                >
                    {t("worktrees.create")}
                </button>
            </div>
        </div>

        // Worktree table
        <Suspense fallback=move || view! { <div class="loading">{t("worktrees.loading")}</div> }>
            {move || worktrees.get().map(|result| match result {
                Ok(data) => {
                    if data.is_empty() {
                        view! {
                            <div class="empty-state">
                                <p>{t("worktrees.empty_state")}</p>
                            </div>
                        }.into_view()
                    } else {
                        // Group by project_name
                        let mut groups: std::collections::BTreeMap<String, Vec<WorktreeInfo>> =
                            std::collections::BTreeMap::new();
                        for wt in data {
                            let key = wt.project_name.clone().unwrap_or_else(|| "Unknown".to_string());
                            groups.entry(key).or_default().push(wt);
                        }

                        view! {
                            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                                {groups.into_iter().map(|(project, trees)| {
                                    let has_extra = trees.iter().any(|wt| !wt.is_main);

                                    view! {
                                        <div>
                                            <h4 style="margin-bottom: 0.5rem;">{project}</h4>
                                            <div class="table-container">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>{t("worktrees.col_branch")}</th>
                                                            <th>{t("worktrees.col_path")}</th>
                                                            <th>{t("worktrees.col_head")}</th>
                                                            <th>{t("worktrees.col_status")}</th>
                                                            <th>{t("worktrees.col_actions")}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {trees.into_iter().map(|wt| {
                                                            let path_for_delete = wt.path.clone();
                                                            let is_main = wt.is_main;

                                                            view! {
                                                                <tr>
                                                                    <td>
                                                                        <span style="font-weight: 500;">{wt.branch.clone()}</span>
                                                                    </td>
                                                                    <td>
                                                                        <code style="font-size: 0.8rem;">{wt.path.clone()}</code>
                                                                    </td>
                                                                    <td>
                                                                        <code style="font-size: 0.8rem;">{
                                                                            wt.head_commit.chars().take(8).collect::<String>()
                                                                        }</code>
                                                                    </td>
                                                                    <td>
                                                                        {if wt.is_main {
                                                                            view! { <span class="badge badge-success">"main"</span> }.into_view()
                                                                        } else if wt.is_bare {
                                                                            view! { <span class="badge badge-muted">"bare"</span> }.into_view()
                                                                        } else {
                                                                            view! { <span class="badge badge-muted">"worktree"</span> }.into_view()
                                                                        }}
                                                                    </td>
                                                                    <td>
                                                                        {if !is_main {
                                                                            view! {
                                                                                <button
                                                                                    class="btn btn-danger btn-sm"
                                                                                    on:click=move |_| {
                                                                                        delete_worktree(path_for_delete.clone());
                                                                                    }
                                                                                >
                                                                                    {t("worktrees.delete")}
                                                                                </button>
                                                                            }.into_view()
                                                                        } else {
                                                                            view! {}.into_view()
                                                                        }}
                                                                    </td>
                                                                </tr>
                                                            }
                                                        }).collect_view()}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {if !has_extra {
                                                view! {
                                                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">
                                                        {t("worktrees.no_extra")}
                                                    </p>
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
