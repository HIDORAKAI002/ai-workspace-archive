use leptos::*;

use crate::i18n::t;

/// A confirmation dialog for destructive actions.
/// Shows a modal with a message and Confirm/Cancel buttons.
#[component]
pub fn ConfirmDialog(
    #[prop(into)] show: RwSignal<bool>,
    #[prop(into)] title: String,
    #[prop(into)] message: String,
    #[prop(into)] confirm_label: String,
    #[prop(into)] on_confirm: Callback<()>,
) -> impl IntoView {
    let on_cancel = move |_: leptos::ev::MouseEvent| {
        show.set(false);
    };
    let on_ok = move |_: leptos::ev::MouseEvent| {
        show.set(false);
        on_confirm.call(());
    };

    view! {
        <Show when=move || show.get() fallback=|| ()>
            <div class="modal-overlay" on:click=on_cancel>
                <div class="modal" on:click=move |ev| ev.stop_propagation() style="max-width: 420px;">
                    <div class="modal-header">
                        <h3>{title.clone()}</h3>
                    </div>
                    <div style="padding: 1rem 0; color: var(--text-muted); font-size: 0.9rem;">
                        {message.clone()}
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                        <button class="btn btn-secondary btn-sm" on:click=on_cancel>{t("common.cancel")}</button>
                        <button class="btn btn-danger btn-sm" on:click=on_ok>{confirm_label.clone()}</button>
                    </div>
                </div>
            </div>
        </Show>
    }
}
