use claude_admin_shared::LicensesResponse;
use leptos::*;

use crate::api;
use crate::i18n::t;

#[component]
pub fn LicensesPage() -> impl IntoView {
    let licenses = create_resource(
        || (),
        |_| async move { api::get::<LicensesResponse>("/licenses").await },
    );

    let (search, set_search) = create_signal(String::new());
    let (show_transitive, set_show_transitive) = create_signal(false);

    view! {
        <div class="page-header">
            <h2>{t("licenses.title")}</h2>
            <p>{t("licenses.subtitle")}</p>
        </div>

        <Suspense fallback=move || view! { <div class="loading">{t("licenses.loading")}</div> }>
            {move || licenses.get().map(|result| match result {
                Ok(data) => {
                    let summary = data.license_summary.clone();
                    let direct = data.direct_dependencies.clone();
                    let transitive = data.transitive_dependencies.clone();
                    let direct_count = direct.len();
                    let transitive_count = transitive.len();

                    view! {
                        // Own License (translated with colored company name)
                        <div class="card" style="margin-bottom: 1.5rem; border-left: 3px solid var(--accent);">
                            <h3 style="margin-bottom: 0.75rem;">{t("licenses.own_license")}</h3>
                            <div style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.8;">
                                <p style="margin-bottom: 0.5rem; font-weight: 600;">
                                    "MIT License"
                                </p>
                                <p style="margin-bottom: 0.75rem;">
                                    {t("licenses.mit_copyright")} " Conrad Bruchmann, "
                                    <span style="color: #ffffff; font-weight: 700;">"BRUCHMANN "</span>
                                    <span style="color: #ef4444; font-weight: 800;">"[TEC]"</span>
                                    <span style="color: #ffffff; font-weight: 700;">" INNOVATION GMBH"</span>
                                </p>
                                <p style="margin-bottom: 0.75rem;">
                                    {t("licenses.mit_line1")}
                                </p>
                                <p style="margin-bottom: 0.75rem;">
                                    {t("licenses.mit_line2")}
                                </p>
                                <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.02em;">
                                    {t("licenses.mit_line3")}
                                </p>
                            </div>
                        </div>

                        // License Summary
                        <div class="card" style="margin-bottom: 1.5rem;">
                            <h3 style="margin-bottom: 0.75rem;">{t("licenses.overview")}</h3>
                            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                                {summary.iter().map(|s| {
                                    let label = s.license.clone();
                                    let count = s.count;
                                    view! {
                                        <span class="badge badge-muted" style="font-size: 0.75rem; padding: 0.25rem 0.625rem;">
                                            {label} ": " {count}
                                        </span>
                                    }
                                }).collect_view()}
                            </div>
                            <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.75rem;">
                                {direct_count} " " {t("licenses.direct_count")} ", " {transitive_count} " " {t("licenses.transitive_count")}
                            </p>
                        </div>

                        // Direct Dependencies
                        <h3 style="margin-bottom: 1rem;">
                            {t("licenses.direct_deps")} " "
                            <span class="badge badge-success">{direct_count}</span>
                        </h3>

                        // Search
                        <div style="margin-bottom: 1rem;">
                            <input
                                type="text"
                                placeholder=t("licenses.search_placeholder")
                                class="input"
                                style="width: 100%; max-width: 400px;"
                                on:input=move |ev| set_search.set(event_target_value(&ev))
                            />
                        </div>

                        // Direct Dependencies Table
                        {
                            let direct_for_table = direct.clone();
                            view! {
                                <div class="table-container" style="margin-bottom: 2rem;">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>{t("licenses.col_name")}</th>
                                                <th>{t("licenses.col_version")}</th>
                                                <th>{t("licenses.col_license")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {move || {
                                                let q = search.get().to_lowercase();
                                                direct_for_table.iter()
                                                    .filter(|d| {
                                                        if q.is_empty() { return true; }
                                                        d.name.to_lowercase().contains(&q) || d.license.to_lowercase().contains(&q)
                                                    })
                                                    .map(|dep| {
                                                        let url = dep.repository.clone().unwrap_or_default();
                                                        let name = dep.name.clone();
                                                        let version = dep.version.clone();
                                                        let license = dep.license.clone();
                                                        view! {
                                                            <tr>
                                                                <td>
                                                                    <a href={url} target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none;">
                                                                        {name}
                                                                    </a>
                                                                </td>
                                                                <td><span class="badge badge-muted">{version}</span></td>
                                                                <td>{license}</td>
                                                            </tr>
                                                        }
                                                    })
                                                    .collect_view()
                                            }}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        }

                        // Transitive Dependencies (collapsible)
                        <div style="margin-bottom: 2rem;">
                            <button
                                class="btn btn-secondary"
                                on:click=move |_| set_show_transitive.update(|v| *v = !*v)
                            >
                                {move || if show_transitive.get() { "▾" } else { "▸" }}
                                " " {t("licenses.transitive_deps")} " "
                                <span class="badge badge-muted">{transitive_count}</span>
                            </button>

                            {
                                let transitive_for_table = transitive.clone();
                                move || {
                                    if show_transitive.get() {
                                        let q = search.get().to_lowercase();
                                        let rows = transitive_for_table.iter()
                                            .filter(|d| {
                                                if q.is_empty() { return true; }
                                                d.name.to_lowercase().contains(&q) || d.license.to_lowercase().contains(&q)
                                            })
                                            .map(|dep| {
                                                let url = dep.repository.clone().unwrap_or_default();
                                                let name = dep.name.clone();
                                                let version = dep.version.clone();
                                                let license = dep.license.clone();
                                                view! {
                                                    <tr>
                                                        <td>
                                                            <a href={url} target="_blank" rel="noopener" style="color: var(--text-secondary); text-decoration: none;">
                                                                {name}
                                                            </a>
                                                        </td>
                                                        <td><span class="badge badge-muted">{version}</span></td>
                                                        <td>{license}</td>
                                                    </tr>
                                                }
                                            })
                                            .collect_view();
                                        view! {
                                            <div class="table-container" style="margin-top: 1rem;">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>{t("licenses.col_name")}</th>
                                                            <th>{t("licenses.col_version")}</th>
                                                            <th>{t("licenses.col_license")}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>{rows}</tbody>
                                                </table>
                                            </div>
                                        }.into_view()
                                    } else {
                                        view! { <div></div> }.into_view()
                                    }
                                }
                            }
                        </div>
                    }.into_view()
                },
                Err(e) => view! {
                    <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                }.into_view(),
            })}
        </Suspense>
    }
}
