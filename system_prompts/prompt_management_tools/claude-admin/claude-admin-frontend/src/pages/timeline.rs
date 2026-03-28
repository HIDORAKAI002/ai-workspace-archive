use leptos::*;

use crate::api;
use crate::components::confirm_dialog::ConfirmDialog;
use crate::i18n::t;

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
struct TimelineEntry {
    hash: String,
    message: String,
    timestamp: String,
    files_changed: u32,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
struct CommitDiff {
    hash: String,
    diff: String,
}

#[component]
pub fn TimelinePage() -> impl IntoView {
    let entries = create_resource(
        || (),
        |_| async move { api::get::<Vec<TimelineEntry>>("/timeline?limit=50").await },
    );
    let selected_diff = create_rw_signal::<Option<CommitDiff>>(None);
    let diff_loading = create_rw_signal(false);
    let restore_target = create_rw_signal::<Option<String>>(None);
    let confirm_restore = create_rw_signal(false);
    let status = create_rw_signal::<Option<(String, bool)>>(None);

    let do_restore = move || {
        if let Some(hash) = restore_target.get() {
            spawn_local(async move {
                match api::post::<serde_json::Value, _>(
                    &format!("/timeline/{}/restore", hash),
                    &serde_json::json!({}),
                )
                .await
                {
                    Ok(_) => {
                        status.set(Some((
                            format!("Restored to {} — reload to see changes", &hash[..7]),
                            true,
                        )));
                        entries.refetch();
                    }
                    Err(e) => status.set(Some((format!("Error: {}", e), false))),
                }
            });
        }
        confirm_restore.set(false);
    };

    view! {
        <div class="page-header">
            <h2>{t("timeline.title")}</h2>
            <p>{t("timeline.subtitle")}</p>
        </div>

        {move || status.get().map(|(msg, ok)| view! {
            <div class="card" style=format!(
                "margin-bottom: 1rem; padding: 0.5rem 1rem; border-left: 3px solid {};",
                if ok { "var(--success)" } else { "var(--error)" }
            )>
                <span style="font-size: 0.875rem;">{msg}</span>
            </div>
        })}

        <ConfirmDialog
            show=confirm_restore
            title=t("timeline.confirm_restore_title").get_untracked()
            message=t("timeline.confirm_restore_msg").get_untracked()
            confirm_label=t("timeline.restore").get_untracked()
            on_confirm=Callback::new(move |_| do_restore())
        />

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            // Left: Timeline
            <div>
                <Suspense fallback=move || view! { <div class="loading">{t("common.loading")}</div> }>
                    {move || entries.get().map(|result| match result {
                        Ok(items) if !items.is_empty() => {
                            view! {
                                <div class="timeline-list">
                                    {items.into_iter().map(|entry| {
                                        let hash_for_diff = entry.hash.clone();
                                        let hash_for_restore = entry.hash.clone();
                                        let short_hash = entry.hash[..7].to_string();
                                        let is_selected = {
                                            let h = entry.hash.clone();
                                            move || selected_diff.get().as_ref().map(|d| d.hash == h).unwrap_or(false)
                                        };
                                        // Format timestamp
                                        let time = entry.timestamp.get(..16).unwrap_or(&entry.timestamp).replace('T', " ");

                                        view! {
                                            <div
                                                class="timeline-entry"
                                                class:active=is_selected
                                                style="padding: 0.75rem 1rem; border-left: 3px solid var(--border); \
                                                       margin-bottom: 0.25rem; cursor: pointer; border-radius: 0 0.375rem 0.375rem 0; \
                                                       transition: all 0.15s;"
                                                on:click=move |_| {
                                                    let h = hash_for_diff.clone();
                                                    diff_loading.set(true);
                                                    spawn_local(async move {
                                                        match api::get::<CommitDiff>(&format!("/timeline/{}", h)).await {
                                                            Ok(d) => selected_diff.set(Some(d)),
                                                            Err(_) => selected_diff.set(None),
                                                        }
                                                        diff_loading.set(false);
                                                    });
                                                }
                                            >
                                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                                    <div>
                                                        <span style="font-weight: 600; font-size: 0.875rem;">{&entry.message}</span>
                                                        <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem; align-items: center;">
                                                            <code style="font-size: 0.75rem; color: var(--accent);">{&short_hash}</code>
                                                            <span style="font-size: 0.75rem; color: var(--text-muted);">{time}</span>
                                                            {if entry.files_changed > 0 {
                                                                view! {
                                                                    <span class="badge badge-muted" style="font-size: 0.65rem;">
                                                                        {entry.files_changed} " " {t("timeline.files")}
                                                                    </span>
                                                                }.into_view()
                                                            } else {
                                                                view! {}.into_view()
                                                            }}
                                                        </div>
                                                    </div>
                                                    <button
                                                        class="btn btn-sm btn-secondary"
                                                        style="font-size: 0.75rem;"
                                                        on:click=move |ev| {
                                                            ev.stop_propagation();
                                                            restore_target.set(Some(hash_for_restore.clone()));
                                                            confirm_restore.set(true);
                                                        }
                                                    >
                                                        {t("timeline.restore")}
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        }
                        Ok(_) => view! {
                            <div class="empty-state">
                                <p>{t("timeline.empty")}</p>
                            </div>
                        }.into_view(),
                        Err(e) => view! {
                            <div class="empty-state">
                                <p>{t("timeline.error")}</p>
                                <p style="font-size: 0.8rem; color: var(--text-muted);">{e}</p>
                            </div>
                        }.into_view(),
                    })}
                </Suspense>
            </div>

            // Right: Diff viewer
            <div>
                {move || if diff_loading.get() {
                    view! { <div class="loading">{t("common.loading")}</div> }.into_view()
                } else if let Some(diff) = selected_diff.get() {
                    let short = diff.hash[..7].to_string();
                    view! {
                        <div class="editor-container">
                            <div class="editor-toolbar">
                                <span style="font-weight: 500; font-size: 0.875rem;">
                                    {t("timeline.diff_for")} " "
                                    <code style="color: var(--accent);">{short}</code>
                                </span>
                            </div>
                            <pre class="editor-textarea" style="min-height: 400px; font-size: 0.8rem; line-height: 1.5; \
                                                                overflow: auto; white-space: pre; user-select: text;">
                                {diff.diff.lines().map(|line| {
                                    let color = if line.starts_with('+') && !line.starts_with("+++") {
                                        "color: var(--success);"
                                    } else if line.starts_with('-') && !line.starts_with("---") {
                                        "color: var(--error);"
                                    } else if line.starts_with("@@") {
                                        "color: var(--accent);"
                                    } else {
                                        ""
                                    };
                                    view! {
                                        <div style=format!("{} padding: 0 0.25rem;", color)>{line.to_string()}</div>
                                    }
                                }).collect_view()}
                            </pre>
                        </div>
                    }.into_view()
                } else {
                    view! {
                        <div class="empty-state" style="padding: 3rem;">
                            <p style="color: var(--text-muted);">{t("timeline.select_commit")}</p>
                        </div>
                    }.into_view()
                }}
            </div>
        </div>
    }
}
