use claude_admin_shared::DiffResult;
use leptos::*;

/// Renders a diff with green/red/context coloring.
#[component]
pub fn DiffViewer(diff: DiffResult) -> impl IntoView {
    view! {
        <div class="diff-viewer" style="font-family: monospace; font-size: 0.8125rem; border: 1px solid var(--border); border-radius: 6px; overflow: auto; max-height: 500px;">
            {diff.lines.into_iter().map(|line| {
                let (bg, prefix) = match line.kind.as_str() {
                    "add" => ("var(--success-bg, #dcfce7)", "+ "),
                    "remove" => ("var(--error-bg, #fee2e2)", "- "),
                    _ => ("transparent", "  "),
                };
                let line_num = line.line_number.map(|n| format!("{:>4} ", n)).unwrap_or("     ".to_string());
                view! {
                    <div style=format!(
                        "padding: 1px 0.75rem; background: {}; white-space: pre-wrap; border-bottom: 1px solid var(--border);",
                        bg
                    )>
                        <span style="color: var(--text-muted); user-select: none;">{line_num}</span>
                        <span style="user-select: none;">{prefix}</span>
                        {line.content}
                    </div>
                }
            }).collect_view()}
        </div>
    }
}
