use claude_admin_shared::GitHubOverview;
use leptos::*;

use crate::api;
use crate::i18n::t;

#[component]
pub fn GitHubPage() -> impl IntoView {
    let github = create_resource(
        || (),
        |_| async move { api::get::<GitHubOverview>("/github").await },
    );

    view! {
        <div class="page-header">
            <h2>{t("github.title")}</h2>
            <p>{t("github.subtitle_detail")}</p>
        </div>

        <Suspense fallback=move || view! { <div class="loading">{t("github.loading")}</div> }>
            {move || github.get().map(|result| match result {
                Ok(data) => {
                    let status_color = match data.auth_status.as_str() {
                        "authenticated" => "var(--success)",
                        _ => "var(--error)",
                    };

                    view! {
                        <div class="card-grid" style="margin-bottom: 2rem;">
                            <div class="card">
                                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">{t("github.auth_status")}</div>
                                <div style=format!("font-weight: 600; color: {};", status_color)>
                                    {data.auth_status.clone()}
                                </div>
                            </div>
                            <div class="card">
                                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">{t("github.username")}</div>
                                <div style="font-weight: 600;">{data.username.unwrap_or_else(|| "-".to_string())}</div>
                            </div>
                            <div class="card">
                                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">{t("github.linked_repos")}</div>
                                <div class="card-value">{data.linked_repos.len()}</div>
                            </div>
                        </div>

                        {if data.linked_repos.is_empty() {
                            view! {
                                <div class="empty-state">
                                    <p>{t("github.no_linked_repos")}</p>
                                </div>
                            }.into_view()
                        } else {
                            view! {
                                <h3 style="margin-bottom: 1rem;">{t("github.linked_repositories")}</h3>
                                <div class="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>{t("github.col_name")}</th>
                                                <th>{t("github.col_path")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.linked_repos.into_iter().map(|repo| view! {
                                                <tr>
                                                    <td style="font-weight: 500;">{repo.name}</td>
                                                    <td style="font-size: 0.8125rem; color: var(--text-muted);">{repo.path}</td>
                                                </tr>
                                            }).collect_view()}
                                        </tbody>
                                    </table>
                                </div>
                            }.into_view()
                        }}
                    }.into_view()
                }
                Err(e) => view! {
                    <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                }.into_view(),
            })}
        </Suspense>
    }
}
