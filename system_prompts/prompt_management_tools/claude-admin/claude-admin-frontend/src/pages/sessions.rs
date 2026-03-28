use claude_admin_shared::{HistoryEntry, SessionDetail, SessionListResponse, SessionTranscript};
use leptos::*;

use crate::api;
use crate::i18n::t;

#[component]
pub fn SessionsPage() -> impl IntoView {
    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "Sessions".to_string(),
        description: "Browse and search Claude Code session history. View past conversations, search through history, and inspect session transcripts.".to_string(),
        available_actions: vec![
            "Browse session list".to_string(),
            "Search session history".to_string(),
            "View session details".to_string(),
            "View session transcript".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    let page_offset = create_rw_signal(0u64);
    let search_query = create_rw_signal(String::new());
    let search_results = create_rw_signal::<Option<Vec<HistoryEntry>>>(None);
    let search_loading = create_rw_signal(false);
    let selected_session = create_rw_signal::<Option<String>>(None);

    let sessions = create_resource(
        move || page_offset.get(),
        |offset| async move {
            api::get::<SessionListResponse>(&format!("/sessions?offset={}&limit=20", offset)).await
        },
    );

    let session_detail = create_resource(
        move || selected_session.get(),
        |id| async move {
            match id {
                Some(session_id) => api::get::<SessionDetail>(&format!("/sessions/{}", session_id))
                    .await
                    .ok(),
                None => None,
            }
        },
    );

    let trigger_search = move || {
        let q = search_query.get();
        if q.is_empty() {
            search_results.set(None);
            return;
        }
        search_loading.set(true);
        spawn_local(async move {
            match api::get::<Vec<HistoryEntry>>(&format!(
                "/sessions/search?q={}&limit=20",
                js_sys::encode_uri_component(&q)
            ))
            .await
            {
                Ok(results) => search_results.set(Some(results)),
                Err(_) => search_results.set(Some(vec![])),
            }
            search_loading.set(false);
        });
    };

    view! {
        <div class="page-header">
            <h2>{t("sessions.title")}</h2>
            <p>{t("sessions.subtitle")}</p>
        </div>

        // Search bar
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
            <input
                type="text"
                placeholder=t("sessions.search_placeholder")
                style="max-width: 400px;"
                prop:value=move || search_query.get()
                on:input=move |ev| search_query.set(event_target_value(&ev))
                on:keydown=move |ev| {
                    if ev.key() == "Enter" {
                        trigger_search();
                    }
                }
            />
            <button class="btn btn-primary" on:click=move |_| trigger_search() disabled=search_loading>
                {move || if search_loading.get() { t("sessions.searching") } else { t("sessions.search") }}
            </button>
            {move || if search_results.get().is_some() {
                view! {
                    <button class="btn btn-secondary" on:click=move |_| {
                        search_results.set(None);
                        search_query.set(String::new());
                    }>{t("sessions.clear")}</button>
                }.into_view()
            } else {
                view! {}.into_view()
            }}
        </div>

        // Search results
        {move || search_results.get().map(|results| {
            view! {
                <h3 style="margin-bottom: 1rem;">{t("sessions.search_results")} " (" {results.len()} ")"</h3>
                {if results.is_empty() {
                    view! { <div class="empty-state"><p>{t("sessions.no_results")}</p></div> }.into_view()
                } else {
                    view! {
                        <div class="table-container" style="margin-bottom: 2rem;">
                            <table>
                                <thead><tr><th>{t("sessions.col_prompt")}</th><th>{t("sessions.col_project")}</th></tr></thead>
                                <tbody>
                                    {results.into_iter().map(|h| view! {
                                        <tr>
                                            <td style="max-width: 500px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                                {h.display}
                                            </td>
                                            <td style="color: var(--text-muted); font-size: 0.8125rem;">{h.project}</td>
                                        </tr>
                                    }).collect_view()}
                                </tbody>
                            </table>
                        </div>
                    }.into_view()
                }}
            }
        })}

        // Session detail panel
        <Suspense fallback=|| ()>
            {move || session_detail.get().flatten().map(|detail| {
                view! {
                    <div class="card" style="margin-bottom: 2rem; border-left: 3px solid var(--accent);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                            <h3 style="font-size: 1rem;">
                                {t("sessions.session_prefix")} {detail.session_id.chars().take(12).collect::<String>()} "..."
                            </h3>
                            <button class="btn btn-secondary btn-sm" on:click=move |_| selected_session.set(None)>{t("common.close")}</button>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.875rem;">
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.25rem;">{t("sessions.detail_project")}</div>
                                <div>{detail.project_path}</div>
                            </div>
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.25rem;">{t("sessions.detail_start_time")}</div>
                                <div>{detail.start_time}</div>
                            </div>
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.25rem;">{t("sessions.detail_duration")}</div>
                                <div>{detail.duration_minutes} " " {t("sessions.minutes")}</div>
                            </div>
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.25rem;">{t("sessions.detail_messages")}</div>
                                <div>{detail.user_message_count} {t("sessions.user_messages")} {detail.assistant_message_count} {t("sessions.assistant_messages")}</div>
                            </div>
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.25rem;">{t("sessions.detail_tokens")}</div>
                                <div>{format_tokens(detail.input_tokens)} {t("sessions.tokens_in")} {format_tokens(detail.output_tokens)} {t("sessions.tokens_out")}</div>
                            </div>
                            <div>
                                <div style="color: var(--text-muted); margin-bottom: 0.25rem;">{t("sessions.detail_git")}</div>
                                <div>{detail.git_commits} {t("sessions.commits_label")} {detail.lines_added} {t("sessions.lines_minus")} {detail.lines_removed}</div>
                            </div>
                        </div>

                        {detail.summary.map(|s| view! {
                            <div style="margin-top: 1rem;">
                                <div style="color: var(--text-muted); margin-bottom: 0.25rem; font-size: 0.8125rem;">{t("sessions.detail_summary")}</div>
                                <div style="font-size: 0.875rem; line-height: 1.5;">{s}</div>
                            </div>
                        })}

                        {if !detail.tool_counts.is_empty() {
                            view! {
                                <div style="margin-top: 1rem;">
                                    <div style="color: var(--text-muted); margin-bottom: 0.25rem; font-size: 0.8125rem;">{t("sessions.tools_used")}</div>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.375rem;">
                                        {detail.tool_counts.into_iter().map(|(name, count)| view! {
                                            <span class="badge badge-muted">{name} ": " {count}</span>
                                        }).collect_view()}
                                    </div>
                                </div>
                            }.into_view()
                        } else {
                            view! {}.into_view()
                        }}

                        {detail.outcome.map(|o| view! {
                            <div style="margin-top: 0.75rem;">
                                <span class="badge badge-success">{t("sessions.outcome_prefix")} {o}</span>
                            </div>
                        })}

                        <TranscriptViewer session_id=detail.session_id.clone() />
                    </div>
                }
            })}
        </Suspense>

        // Session list
        <Suspense fallback=move || view! { <div class="loading">{t("sessions.loading")}</div> }>
            {move || sessions.get().map(|result| match result {
                Ok(data) => {
                    let total = data.total;
                    let current_offset = page_offset.get();

                    view! {
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <span style="color: var(--text-muted); font-size: 0.8125rem;">
                                {t("sessions.showing")} " " {current_offset + 1} "-" {std::cmp::min(current_offset + 20, total)} " " {t("sessions.of")} " " {total}
                            </span>
                            <div style="display: flex; gap: 0.5rem;">
                                <button
                                    class="btn btn-secondary btn-sm"
                                    disabled=move || page_offset.get() == 0
                                    on:click=move |_| page_offset.update(|o| *o = o.saturating_sub(20))
                                >{t("sessions.previous")}</button>
                                <button
                                    class="btn btn-secondary btn-sm"
                                    disabled=move || page_offset.get() + 20 >= total
                                    on:click=move |_| page_offset.update(|o| *o += 20)
                                >{t("sessions.next")}</button>
                            </div>
                        </div>

                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t("sessions.col_project")}</th>
                                        <th>{t("sessions.col_date")}</th>
                                        <th>{t("sessions.col_duration")}</th>
                                        <th>{t("sessions.col_messages")}</th>
                                        <th>{t("sessions.col_summary")}</th>
                                        <th>{t("sessions.col_outcome")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.sessions.into_iter().map(|s| {
                                        let sid = s.session_id.clone();
                                        view! {
                                            <tr
                                                style="cursor: pointer;"
                                                on:click=move |_| selected_session.set(Some(sid.clone()))
                                            >
                                                <td>{s.project_name}</td>
                                                <td style="white-space: nowrap;">{s.start_time.chars().take(16).collect::<String>()}</td>
                                                <td>{s.duration_minutes} {t("sessions.minutes")}</td>
                                                <td>{s.message_count}</td>
                                                <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                                    {s.summary.unwrap_or_default()}
                                                </td>
                                                <td>
                                                    {s.outcome.map(|o| view! {
                                                        <span class="badge badge-success">{o}</span>
                                                    })}
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

#[component]
fn TranscriptViewer(session_id: String) -> impl IntoView {
    let show_transcript = create_rw_signal(false);
    let transcript = create_rw_signal::<Option<Result<SessionTranscript, String>>>(None);
    let sid = session_id.clone();

    let load_transcript = move |_| {
        let id = sid.clone();
        if show_transcript.get() {
            show_transcript.set(false);
            return;
        }
        show_transcript.set(true);
        if transcript.get().is_none() {
            spawn_local(async move {
                let result =
                    api::get::<SessionTranscript>(&format!("/sessions/{}/transcript", id)).await;
                transcript.set(Some(result));
            });
        }
    };

    view! {
        <div style="margin-top: 1rem; border-top: 1px solid var(--border); padding-top: 0.75rem;">
            <button
                class="btn btn-secondary btn-sm"
                on:click=load_transcript
            >
                {move || if show_transcript.get() { "Hide Transcript" } else { "Show Transcript" }}
            </button>

            {move || if show_transcript.get() {
                match transcript.get() {
                    Some(Ok(tr)) => {
                        if tr.messages.is_empty() {
                            view! { <p style="color: var(--text-muted); margin-top: 0.5rem; font-size: 0.85rem;">{t("sessions.no_transcript")}</p> }.into_view()
                        } else {
                            view! {
                                <div class="transcript-viewer">
                                    {tr.messages.into_iter().map(|msg| {
                                        let (class, label) = match msg.role.as_str() {
                                            "user" => ("transcript-msg user", "User"),
                                            "assistant" => ("transcript-msg assistant", "Assistant"),
                                            "tool_use" => ("transcript-msg tool-use", "Tool"),
                                            "tool_result" => ("transcript-msg tool-result", "Result"),
                                            _ => ("transcript-msg", "System"),
                                        };
                                        view! {
                                            <div class=class>
                                                <div class="transcript-msg-header">
                                                    <span class="transcript-role">{label}</span>
                                                    {msg.tool_name.map(|tn| view! {
                                                        <span class="badge badge-muted" style="font-size: 0.65rem; margin-left: 0.25rem;">{tn}</span>
                                                    })}
                                                </div>
                                                <div class="transcript-msg-content">
                                                    <pre>{msg.content}</pre>
                                                </div>
                                            </div>
                                        }
                                    }).collect_view()}
                                </div>
                            }.into_view()
                        }
                    }
                    Some(Err(e)) => view! {
                        <p style="color: var(--error); margin-top: 0.5rem; font-size: 0.85rem;">"Transcript unavailable: " {e}</p>
                    }.into_view(),
                    None => view! {
                        <p style="color: var(--text-muted); margin-top: 0.5rem; font-size: 0.85rem;">{t("sessions.loading_transcript")}</p>
                    }.into_view(),
                }
            } else {
                view! {}.into_view()
            }}
        </div>
    }
}

fn format_tokens(n: u64) -> String {
    if n >= 1_000_000 {
        format!("{:.1}M", n as f64 / 1_000_000.0)
    } else if n >= 1_000 {
        format!("{:.1}K", n as f64 / 1_000.0)
    } else {
        n.to_string()
    }
}
