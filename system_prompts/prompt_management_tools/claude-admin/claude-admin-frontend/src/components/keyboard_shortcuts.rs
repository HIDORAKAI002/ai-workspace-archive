use leptos::*;
use wasm_bindgen::prelude::*;
use web_sys;

#[component]
pub fn KeyboardShortcuts() -> impl IntoView {
    create_effect(move |_| {
        let closure =
            Closure::<dyn Fn(web_sys::KeyboardEvent)>::new(move |event: web_sys::KeyboardEvent| {
                let ctrl_or_cmd = event.ctrl_key() || event.meta_key();

                if ctrl_or_cmd {
                    match event.key().as_str() {
                        "k" | "K" => {
                            event.prevent_default();
                            if let Some(window) = web_sys::window() {
                                let _ = window.location().set_href("/search");
                            }
                        }
                        "s" | "S" => {
                            event.prevent_default();
                        }
                        _ => {}
                    }
                }
            });

        let window = web_sys::window().expect("no global window");
        window
            .add_event_listener_with_callback("keydown", closure.as_ref().unchecked_ref())
            .expect("failed to add keydown listener");

        on_cleanup(move || {
            let window = web_sys::window().expect("no global window");
            window
                .remove_event_listener_with_callback("keydown", closure.as_ref().unchecked_ref())
                .expect("failed to remove keydown listener");
            drop(closure);
        });
    });

    view! {}
}
