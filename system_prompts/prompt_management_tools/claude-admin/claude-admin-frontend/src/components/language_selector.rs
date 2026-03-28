use crate::i18n::{self, Language};
use leptos::*;

#[component]
pub fn LanguageSelector() -> impl IntoView {
    let lang = i18n::use_language();

    view! {
        <select
            style="width: 100%; padding: 0.35rem 0.5rem; font-size: 0.8rem; border-radius: 6px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); cursor: pointer;"
            on:change=move |ev| {
                let code = event_target_value(&ev);
                if let Some(new_lang) = Language::from_code(&code) {
                    lang.set(new_lang);
                    i18n::persist_language(new_lang);
                }
            }
        >
            {Language::all().iter().map(|l| {
                let code = l.code();
                let label = l.label();
                let is_selected = *l;
                view! {
                    <option
                        value=code
                        selected=move || lang.get() == is_selected
                    >{label}</option>
                }
            }).collect_view()}
        </select>
    }
}
