use leptos::*;

use crate::components::editor_history::{EditorHistory, UndoRedoButtons};
use crate::i18n::t;

#[component]
pub fn JsonEditor(
    #[prop(into)] content: RwSignal<String>,
    #[prop(into)] on_save: Callback<String>,
    #[prop(optional)] label: &'static str,
) -> impl IntoView {
    let is_valid =
        create_memo(move |_| serde_json::from_str::<serde_json::Value>(&content.get()).is_ok());
    let history = EditorHistory::new();

    history.push_snapshot(&content.get_untracked());

    let handle_save = move |_| {
        if is_valid.get() {
            on_save.call(content.get());
        }
    };

    // Keyboard handler for undo/redo
    let history_kbd = history.clone();
    let on_keydown = move |ev: web_sys::KeyboardEvent| {
        if ev.ctrl_key() || ev.meta_key() {
            if ev.key() == "z" && !ev.shift_key() {
                ev.prevent_default();
                let current = content.get_untracked();
                if let Some(previous) = history_kbd.undo(&current) {
                    content.set(previous);
                }
            } else if (ev.key() == "z" && ev.shift_key()) || ev.key() == "y" {
                ev.prevent_default();
                let current = content.get_untracked();
                if let Some(next) = history_kbd.redo(&current) {
                    content.set(next);
                }
            }
        }
    };

    let history_blur = history.clone();
    let on_blur = move |_| {
        history_blur.push_snapshot(&content.get_untracked());
    };

    view! {
        <div class="editor-container">
            <div class="editor-toolbar">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span>{label}</span>
                    <UndoRedoButtons history=history.clone() content=content/>
                    {move || if !is_valid.get() {
                        view! { <span style="color: var(--error); margin-left: 0.5rem;">" " {t("component.json_editor.invalid")}</span> }.into_view()
                    } else {
                        view! { <span style="color: var(--success); margin-left: 0.5rem;">" " {t("component.json_editor.valid")}</span> }.into_view()
                    }}
                </div>
                <button
                    class="btn btn-primary btn-sm"
                    on:click=handle_save
                    disabled=move || !is_valid.get()
                >
                    {t("common.save")}
                </button>
            </div>
            <textarea
                class="editor-textarea"
                prop:value=move || content.get()
                on:input=move |ev| {
                    content.set(event_target_value(&ev));
                }
                on:keydown=on_keydown
                on:blur=on_blur
            />
        </div>
    }
}
