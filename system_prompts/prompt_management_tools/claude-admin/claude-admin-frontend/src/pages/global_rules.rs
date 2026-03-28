use claude_admin_shared::{RuleConflictsResponse, RuleFile, RuleUpdateRequest};
use leptos::*;

use crate::api;
use crate::components::markdown_editor::MarkdownEditor;
use crate::i18n::t;

#[component]
pub fn GlobalRulesPage() -> impl IntoView {
    provide_context(create_rw_signal(crate::components::context_help::PageContext {
        page_name: "Global Rules".to_string(),
        description: "Manage global rules for Claude Code. Rules are persistent instructions that Claude always follows, stored as markdown files in ~/.claude/rules/.".to_string(),
        available_actions: vec![
            "Create new rule".to_string(),
            "Edit existing rule".to_string(),
            "Delete rule".to_string(),
            "View rule conflicts".to_string(),
        ],
        current_data_summary: String::new(),
    }));

    let rules = create_resource(
        || (),
        |_| async move { api::get::<Vec<RuleFile>>("/rules").await },
    );

    let conflicts = create_resource(
        || (),
        |_| async move { api::get::<RuleConflictsResponse>("/rules/conflicts").await },
    );

    let selected_rule = create_rw_signal::<Option<RuleFile>>(None);
    let show_conflicts = create_rw_signal(false);

    view! {
        <div class="page-header">
            <h2>{t("global_rules.title")}</h2>
            <p>{t("global_rules.subtitle")}</p>
        </div>

        // Conflict banner
        {move || conflicts.get().map(|result| {
            if let Ok(data) = result {
                if !data.conflicts.is_empty() {
                    let count = data.conflicts.len();
                    return view! {
                        <div
                            class="card"
                            style="margin-bottom: 1.5rem; border-left: 3px solid var(--warning); cursor: pointer;"
                            on:click=move |_| show_conflicts.update(|v| *v = !*v)
                        >
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600; color: var(--warning);">
                                    {t("rules.conflicts_found")} " (" {count} ")"
                                </span>
                                <span style="color: var(--text-muted); font-size: 0.8rem;">
                                    {move || if show_conflicts.get() { "▲" } else { "▼" }}
                                </span>
                            </div>

                            {move || if show_conflicts.get() {
                                let conflicts_list = data.conflicts.clone();
                                view! {
                                    <div style="margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
                                        {conflicts_list.into_iter().map(|c| {
                                            let badge_color = match c.conflict_type {
                                                claude_admin_shared::ConflictType::NameCollision => "var(--error)",
                                                claude_admin_shared::ConflictType::ContentOverlap => "var(--warning)",
                                                claude_admin_shared::ConflictType::Contradiction => "#8b5cf6",
                                            };
                                            let badge_text = match c.conflict_type {
                                                claude_admin_shared::ConflictType::NameCollision => t("rules.conflict_name_collision"),
                                                claude_admin_shared::ConflictType::ContentOverlap => t("rules.conflict_content_overlap"),
                                                claude_admin_shared::ConflictType::Contradiction => t("rules.conflict_contradiction"),
                                            };
                                            view! {
                                                <div style="padding: 0.5rem; background: var(--bg-primary); border-radius: 0.375rem; font-size: 0.875rem;">
                                                    <span
                                                        class="badge"
                                                        style=format!("background: {}20; color: {}; margin-right: 0.5rem;", badge_color, badge_color)
                                                    >
                                                        {badge_text}
                                                    </span>
                                                    {c.description}
                                                </div>
                                            }
                                        }).collect_view()}
                                    </div>
                                }.into_view()
                            } else {
                                view! {}.into_view()
                            }}
                        </div>
                    }.into_view();
                }
            }
            view! {}.into_view()
        })}

        <Suspense fallback=move || view! { <div class="loading">{t("global_rules.loading")}</div> }>
            {move || rules.get().map(|result| match result {
                Ok(data) => {
                    if data.is_empty() {
                        return view! {
                            <div class="empty-state">
                                <p>{t("global_rules.no_rules")}</p>
                                <p style="font-size: 0.8rem;">{t("global_rules.no_rules_hint")}</p>
                            </div>
                        }.into_view();
                    }

                    view! {
                        <div style="display: flex; gap: 1.5rem;">
                            <div style="width: 280px; flex-shrink: 0;">
                                <div class="table-container">
                                    <table>
                                        <thead><tr><th>{t("global_rules.col_rule")}</th></tr></thead>
                                        <tbody>
                                            {data.into_iter().map(|r| {
                                                let rule = r.clone();
                                                view! {
                                                    <tr
                                                        style="cursor: pointer;"
                                                        on:click=move |_| selected_rule.set(Some(rule.clone()))
                                                    >
                                                        <td>{r.name}</td>
                                                    </tr>
                                                }
                                            }).collect_view()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div style="flex: 1;">
                                {move || {
                                    if let Some(rule) = selected_rule.get() {
                                        let content_signal = create_rw_signal(rule.content.clone());
                                        let rule_name = rule.name.clone();

                                        view! {
                                            <h3 style="margin-bottom: 1rem;">{t("global_rules.editing")} " " {rule_name.clone()}</h3>
                                            <MarkdownEditor
                                                content=content_signal
                                                on_save=Callback::new(move |content: String| {
                                                    let name = rule_name.clone();
                                                    spawn_local(async move {
                                                        let req = RuleUpdateRequest { content };
                                                        let _ = api::put::<RuleFile, _>(
                                                            &format!("/rules/global/{}", name),
                                                            &req,
                                                        ).await;
                                                    });
                                                })
                                                label="Rule Content"
                                            />
                                        }.into_view()
                                    } else {
                                        view! {
                                            <div class="empty-state"><p>{t("global_rules.select_rule")}</p></div>
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
