use leptos::*;

use crate::components::editor_history::{EditorHistory, UndoRedoButtons};
use crate::i18n::t;

#[component]
pub fn MarkdownEditor(
    #[prop(into)] content: RwSignal<String>,
    #[prop(into)] on_save: Callback<String>,
    #[prop(optional)] label: &'static str,
) -> impl IntoView {
    let saving = create_rw_signal(false);
    let show_preview = create_rw_signal(false);
    let preview_html = create_rw_signal(String::new());
    let history = EditorHistory::new();

    // Push initial snapshot
    history.push_snapshot(&content.get_untracked());

    let handle_save = move |_| {
        saving.set(true);
        on_save.call(content.get());
        set_timeout(
            move || saving.set(false),
            std::time::Duration::from_millis(500),
        );
    };

    // Debounced preview rendering
    let content_for_preview = content;
    let preview_html_setter = preview_html;
    create_effect(move |_| {
        let showing = show_preview.get();
        if showing {
            let text = content_for_preview.get();
            let setter = preview_html_setter;
            spawn_local(async move {
                let req = claude_admin_shared::MarkdownPreviewRequest { content: text };
                match crate::api::post::<claude_admin_shared::MarkdownPreviewResponse, _>(
                    "/preview/markdown",
                    &req,
                )
                .await
                {
                    Ok(resp) => setter.set(resp.html),
                    Err(_) => setter.set(format!(
                        "<p>{}</p>",
                        t("component.markdown.preview_unavailable").get_untracked()
                    )),
                }
            });
        }
    });

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
                    <button
                        class="btn btn-sm btn-ghost"
                        on:click=move |_| show_preview.update(|v| *v = !*v)
                        title=t("component.markdown.toggle_preview").get_untracked()
                    >
                        {move || if show_preview.get() { t("component.markdown.edit") } else { t("component.markdown.preview") }}
                    </button>
                </div>
                <button class="btn btn-primary btn-sm" on:click=handle_save disabled=saving>
                    {move || if saving.get() { t("component.editor.saving") } else { t("common.save") }}
                </button>
            </div>
            {move || if show_preview.get() {
                view! {
                    <div
                        class="editor-preview"
                        style="padding: 1rem; min-height: 200px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 4px;"
                        inner_html=preview_html.get()
                    />
                }.into_view()
            } else {
                view! {
                    <textarea
                        class="editor-textarea"
                        prop:value=move || content.get()
                        on:input=move |ev| {
                            content.set(event_target_value(&ev));
                        }
                        on:keydown=on_keydown.clone()
                        on:blur=on_blur.clone()
                    />
                }.into_view()
            }}
        </div>
    }
}
