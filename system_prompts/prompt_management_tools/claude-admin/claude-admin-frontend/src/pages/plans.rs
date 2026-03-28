use claude_admin_shared::PlanFile;
use leptos::*;

use crate::api;
use crate::components::markdown_editor::MarkdownEditor;
use crate::i18n::t;

#[component]
pub fn PlansPage() -> impl IntoView {
    let plans = create_resource(
        || (),
        |_| async move { api::get::<Vec<PlanFile>>("/plans").await },
    );

    let selected_plan = create_rw_signal::<Option<PlanFile>>(None);

    view! {
        <div class="page-header">
            <h2>{t("plans.title")}</h2>
            <p>{t("plans.subtitle")}</p>
        </div>

        <Suspense fallback=move || view! { <div class="loading">{t("plans.loading")}</div> }>
            {move || plans.get().map(|result| match result {
                Ok(data) => {
                    if data.is_empty() {
                        return view! {
                            <div class="empty-state"><p>{t("plans.no_plans")}</p></div>
                        }.into_view();
                    }

                    view! {
                        <div style="display: flex; gap: 1.5rem;">
                            <div style="width: 300px; flex-shrink: 0;">
                                <div class="table-container">
                                    <table>
                                        <thead><tr><th>{t("plans.col_plan")}</th><th>{t("plans.col_modified")}</th></tr></thead>
                                        <tbody>
                                            {data.into_iter().map(|p| {
                                                let plan = p.clone();
                                                view! {
                                                    <tr
                                                        style="cursor: pointer;"
                                                        on:click=move |_| selected_plan.set(Some(plan.clone()))
                                                    >
                                                        <td>{p.name}</td>
                                                        <td style="font-size: 0.75rem; color: var(--text-muted);">
                                                            {p.modified}
                                                        </td>
                                                    </tr>
                                                }
                                            }).collect_view()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div style="flex: 1;">
                                {move || {
                                    if let Some(plan) = selected_plan.get() {
                                        let content_signal = create_rw_signal(plan.content.clone());
                                        let plan_name = plan.name.clone();

                                        view! {
                                            <h3 style="margin-bottom: 1rem;">{t("plans.plan_label")} " " {plan_name.clone()}</h3>
                                            <MarkdownEditor
                                                content=content_signal
                                                on_save=Callback::new(move |content: String| {
                                                    let name = plan_name.clone();
                                                    spawn_local(async move {
                                                        let req = claude_admin_shared::PlanUpdateRequest { content };
                                                        let _ = api::put::<PlanFile, _>(
                                                            &format!("/plans/{}", name),
                                                            &req,
                                                        ).await;
                                                    });
                                                })
                                                label="Plan Content"
                                            />
                                        }.into_view()
                                    } else {
                                        view! {
                                            <div class="empty-state"><p>{t("plans.select_plan")}</p></div>
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
