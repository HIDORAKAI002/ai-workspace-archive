use leptos::*;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

/// Sets up an EventSource connection to the SSE endpoint for live file change notifications.
/// When a change is detected, calls the provided refetch callback.
#[component]
pub fn LiveReload(#[prop(into)] on_change: Callback<String>) -> impl IntoView {
    create_effect(move |_| {
        let base = crate::api::api_base_url();
        let url = format!("{}/events", base);

        if let Ok(es) = web_sys::EventSource::new(&url) {
            let on_change = on_change;
            let callback = Closure::<dyn Fn(web_sys::MessageEvent)>::new(
                move |event: web_sys::MessageEvent| {
                    if let Some(data) = event.data().as_string() {
                        on_change.call(data);
                    }
                },
            );

            es.set_onmessage(Some(callback.as_ref().unchecked_ref()));
            callback.forget(); // Keep the closure alive
        }
    });

    view! {} // No visible UI
}
