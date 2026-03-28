use leptos::*;

/// Read-only code viewer with syntax highlighting (rendered HTML from backend).
#[component]
pub fn CodeViewer(#[prop(into)] html: String) -> impl IntoView {
    view! {
        <div
            class="code-viewer"
            style="font-family: monospace; font-size: 0.8125rem; border: 1px solid var(--border); border-radius: 6px; overflow: auto; max-height: 600px; padding: 1rem; background: var(--bg-secondary);"
            inner_html=html
        />
    }
}
