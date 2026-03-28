use crate::api;
use crate::i18n::t;
use claude_admin_shared::{
    AdvisorActionType, AdvisorCategory, AdvisorReport, ClaudeMdContent, ClaudeMdUpdateRequest,
};
use leptos::*;

#[component]
pub fn AdvisorTab(#[prop(into)] project_id: String) -> impl IntoView {
    let pid = project_id.clone();
    let advisor_data = create_rw_signal::<Option<Result<AdvisorReport, String>>>(None);
    let loading = create_rw_signal(false);
    let action_status = create_rw_signal::<Option<(usize, String)>>(None);

    let fetch_advisor = move |_| {
        let pid = pid.clone();
        loading.set(true);
        advisor_data.set(None);
        spawn_local(async move {
            let result = api::get::<AdvisorReport>(&format!("/projects/{}/advisor", pid)).await;
            advisor_data.set(Some(result));
            loading.set(false);
        });
    };

    view! {
        <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <button
                    class="btn btn-primary"
                    on:click=fetch_advisor
                    disabled=loading
                >
                    {move || if loading.get() { t("component.advisor.analyzing") } else { t("component.advisor.analyze_project") }}
                </button>
                <span style="color: var(--text-muted); font-size: 0.8125rem;">
                    {t("component.advisor.hint")}
                </span>
            </div>

            {move || if loading.get() {
                view! {
                    <div class="loading">{t("component.advisor.loading")}</div>
                }.into_view()
            } else {
                view! {}.into_view()
            }}

            {move || advisor_data.get().map(|result| match result {
                Ok(report) => {
                    let summary = report.project_summary.clone();
                    view! {
                        // Project summary
                        <div class="card" style="margin-bottom: 1.5rem; border-left: 3px solid var(--accent);">
                            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.5rem;">
                                {t("component.advisor.assessment")}
                            </div>
                            <div style="font-size: 0.9375rem; line-height: 1.5;">{summary}</div>
                        </div>

                        // Recommendations
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            {report.recommendations.into_iter().enumerate().map(|(idx, rec)| {
                                let category_label = category_label(&rec.category);
                                let category_color = category_color(&rec.category);
                                let title = rec.title.clone();
                                let description = rec.description.clone();
                                let has_action = rec.action.is_some();
                                let action_label = rec.action.as_ref().map(|a| a.label.clone()).unwrap_or_default();
                                let action_payload = rec.action.as_ref().map(|a| a.payload.clone()).unwrap_or_default();
                                let action_type = rec.action.as_ref().map(|a| a.action_type.clone());
                                let project_id_for_action = project_id.clone();

                                view! {
                                    <div class="card" style="border-left: 3px solid; border-left-color: var(--border);">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                            <div>
                                                <span
                                                    class="badge"
                                                    style=format!("background: {}20; color: {};", category_color, category_color)
                                                >
                                                    {category_label}
                                                </span>
                                                <span style="font-weight: 600; margin-left: 0.5rem;">{title}</span>
                                            </div>
                                        </div>
                                        <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6; white-space: pre-line;">
                                            {description}
                                        </p>

                                        {if has_action {
                                            let pid = project_id_for_action.clone();
                                            let payload = action_payload.clone();
                                            let at = action_type.clone();
                                            view! {
                                                <div style="margin-top: 0.75rem; display: flex; align-items: center; gap: 0.75rem;">
                                                    <button
                                                        class="btn btn-primary btn-sm"
                                                        on:click=move |_| {
                                                            let pid = pid.clone();
                                                            let payload = payload.clone();
                                                            let at = at.clone();
                                                            action_status.set(Some((idx, "running".to_string())));
                                                            spawn_local(async move {
                                                                let result = execute_action(&pid, at.as_ref(), &payload).await;
                                                                match result {
                                                                    Ok(_) => action_status.set(Some((idx, "done".to_string()))),
                                                                    Err(e) => action_status.set(Some((idx, format!("error: {}", e)))),
                                                                }
                                                            });
                                                        }
                                                    >
                                                        {action_label}
                                                    </button>
                                                    {move || action_status.get().and_then(|(i, status)| {
                                                        if i == idx {
                                                            Some(if status == "done" {
                                                                view! { <span style="color: var(--success); font-size: 0.8125rem;">{t("component.advisor.applied")}</span> }.into_view()
                                                            } else if status == "running" {
                                                                view! { <span style="color: var(--text-muted); font-size: 0.8125rem;">"..."</span> }.into_view()
                                                            } else {
                                                                view! { <span style="color: var(--error); font-size: 0.8125rem;">{status}</span> }.into_view()
                                                            })
                                                        } else {
                                                            None
                                                        }
                                                    })}
                                                </div>
                                            }.into_view()
                                        } else {
                                            view! {}.into_view()
                                        }}

                                        // Show payload preview if there's an action with content
                                        {if !action_payload.is_empty() && action_payload.len() > 20 {
                                            view! {
                                                <details style="margin-top: 0.75rem;">
                                                    <summary style="cursor: pointer; color: var(--text-muted); font-size: 0.8125rem;">
                                                        {t("component.advisor.show_preview")}
                                                    </summary>
                                                    <pre style="
                                                        margin-top: 0.5rem;
                                                        padding: 0.75rem;
                                                        background: var(--bg-primary);
                                                        border-radius: 0.375rem;
                                                        font-size: 0.8rem;
                                                        line-height: 1.5;
                                                        overflow-x: auto;
                                                        white-space: pre-wrap;
                                                        color: var(--text-secondary);
                                                    ">
                                                        {action_payload}
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
                    }.into_view()
                }
                Err(e) => view! {
                    <div class="card" style="border-left: 3px solid var(--error);">
                        <p style="color: var(--error);">{t("common.error_prefix")} {e}</p>
                    </div>
                }.into_view(),
            })}
        </div>
    }
}

fn category_label(cat: &AdvisorCategory) -> &'static str {
    match cat {
        AdvisorCategory::GlobalSkill => "Skill",
        AdvisorCategory::GlobalRule => "Rule",
        AdvisorCategory::ClaudeMd => "CLAUDE.md",
        AdvisorCategory::Memory => "Memory",
        AdvisorCategory::Hooks => "Hooks",
        AdvisorCategory::General => "Tip",
    }
}

fn category_color(cat: &AdvisorCategory) -> &'static str {
    match cat {
        AdvisorCategory::GlobalSkill => "#f97316",
        AdvisorCategory::GlobalRule => "#8b5cf6",
        AdvisorCategory::ClaudeMd => "#22c55e",
        AdvisorCategory::Memory => "#3b82f6",
        AdvisorCategory::Hooks => "#eab308",
        AdvisorCategory::General => "#94a3b8",
    }
}

async fn execute_action(
    project_id: &str,
    action_type: Option<&AdvisorActionType>,
    payload: &str,
) -> Result<(), String> {
    match action_type {
        Some(AdvisorActionType::CreateClaudeMd) | Some(AdvisorActionType::UpdateClaudeMd) => {
            let req = ClaudeMdUpdateRequest {
                content: payload.to_string(),
            };
            api::put::<ClaudeMdContent, _>(&format!("/projects/{}/claude-md", project_id), &req)
                .await
                .map(|_| ())
        }
        Some(AdvisorActionType::InitMemory) => {
            let req = claude_admin_shared::MemoryUpdateRequest {
                content: payload.to_string(),
            };
            api::put::<claude_admin_shared::MemoryFile, _>(&format!("/memory/{}", project_id), &req)
                .await
                .map(|_| ())
        }
        _ => {
            // Other action types not yet implemented
            Ok(())
        }
    }
}
