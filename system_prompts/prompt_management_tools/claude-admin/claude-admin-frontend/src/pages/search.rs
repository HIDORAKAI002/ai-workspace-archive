use claude_admin_shared::SearchResult;
use leptos::*;

use crate::api;
use crate::i18n::t;

#[component]
pub fn SearchPage() -> impl IntoView {
    let query = create_rw_signal(String::new());

    // Debounce: a separate signal that only updates after the user has stopped
    // typing for ~300 ms. We use a generation counter to discard stale async
    // callbacks that fire after a newer keystroke has already superseded them.
    let debounce_gen = create_rw_signal(0u32);
    let debounced_query = create_rw_signal(String::new());

    let on_input = move |q: String| {
        query.set(q.clone());
        debounce_gen.update(|g| *g += 1);
        let gen = debounce_gen.get();

        spawn_local(async move {
            // 300 ms delay implemented via a JS Promise / setTimeout wrapper.
            let promise = js_sys::Promise::new(&mut |resolve, _reject| {
                web_sys::window()
                    .unwrap()
                    .set_timeout_with_callback_and_timeout_and_arguments_0(&resolve, 300)
                    .unwrap();
            });
            let _ = wasm_bindgen_futures::JsFuture::from(promise).await;

            // Only propagate if no newer keystroke has fired.
            if debounce_gen.get() == gen {
                debounced_query.set(q);
            }
        });
    };

    // Reactive search: re-runs whenever debounced_query changes.
    let search_results = create_resource(
        move || debounced_query.get(),
        |q| async move {
            if q.trim().is_empty() {
                return Ok(vec![]);
            }
            let encoded = js_sys::encode_uri_component(&q);
            api::get::<Vec<SearchResult>>(&format!("/search?q={}", encoded)).await
        },
    );

    view! {
        <div class="page-header">
            <h2>{t("search.title")}</h2>
            <p>{t("search.subtitle")}</p>
        </div>

        // Search input
        <div style="margin-bottom: 1.5rem;">
            <input
                type="text"
                placeholder=t("search.placeholder")
                style="max-width: 480px; width: 100%;"
                prop:value=move || query.get()
                on:input=move |ev| on_input(event_target_value(&ev))
            />
        </div>

        <Suspense fallback=move || view! {
            {move || if !debounced_query.get().trim().is_empty() {
                view! { <div class="loading">{t("search.loading")}</div> }.into_view()
            } else {
                view! {}.into_view()
            }}
        }>
            {move || search_results.get().map(|result| match result {
                Ok(data) => {
                    if debounced_query.get().trim().is_empty() {
                        // Empty query — show nothing.
                        view! {}.into_view()
                    } else if data.is_empty() {
                        view! {
                            <div class="empty-state">
                                <p>{t("search.no_results")}</p>
                            </div>
                        }.into_view()
                    } else {
                        view! {
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{t("search.col_type")}</th>
                                            <th>{t("search.col_name")}</th>
                                            <th>{t("search.col_snippet")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.into_iter().map(|r| view! {
                                            <tr>
                                                <td>
                                                    <span class="badge badge-muted">{r.resource_type}</span>
                                                </td>
                                                <td style="font-weight: 500; white-space: nowrap;">
                                                    {r.name}
                                                </td>
                                                <td style="color: var(--text-secondary); font-size: 0.875rem; font-family: monospace; max-width: 500px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                                    {r.snippet}
                                                </td>
                                            </tr>
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
