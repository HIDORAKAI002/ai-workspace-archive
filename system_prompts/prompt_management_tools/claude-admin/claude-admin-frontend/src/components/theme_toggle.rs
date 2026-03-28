use leptos::*;
use web_sys;

use crate::i18n::t;

fn get_initial_theme() -> String {
    let window = web_sys::window().expect("no window");
    let storage = window
        .local_storage()
        .ok()
        .flatten()
        .expect("no localStorage");

    if let Ok(Some(saved)) = storage.get_item("claude_admin_theme") {
        if saved == "dark" || saved == "light" {
            return saved;
        }
    }

    let prefers_dark = window
        .match_media("(prefers-color-scheme: dark)")
        .ok()
        .flatten()
        .map(|mql| mql.matches())
        .unwrap_or(false);

    if prefers_dark {
        "dark".to_string()
    } else {
        "light".to_string()
    }
}

fn apply_theme(theme: &str) {
    let window = web_sys::window().expect("no window");
    let document = window.document().expect("no document");
    let root = document.document_element().expect("no document element");

    root.set_attribute("data-theme", theme)
        .expect("failed to set data-theme");

    if let Ok(Some(storage)) = window.local_storage() {
        let _ = storage.set_item("claude_admin_theme", theme);
    }
}

#[component]
pub fn ThemeToggle() -> impl IntoView {
    let initial_theme = get_initial_theme();
    apply_theme(&initial_theme);

    let (theme, set_theme) = create_signal(initial_theme);

    let toggle_theme = move |_| {
        let next = if theme.get() == "dark" {
            "light".to_string()
        } else {
            "dark".to_string()
        };
        apply_theme(&next);
        set_theme.set(next);
    };

    view! {
        <button
            class="theme-toggle"
            on:click=toggle_theme
            title=t("theme.toggle").get_untracked()
            aria-label=t("theme.toggle").get_untracked()
        >
            {move || if theme.get() == "dark" { "\u{2600}" } else { "\u{263D}" }}
        </button>
    }
}
