use claude_admin_shared::HooksConfig;
use leptos::*;

use crate::i18n::t;

/// Visual hook pipeline showing the event flow with configured hook counts.
#[component]
pub fn HookPipeline(hooks: HooksConfig) -> impl IntoView {
    let events = vec![
        ("SessionStart", hooks.session_start.len()),
        ("UserPromptSubmit", hooks.user_prompt_submit.len()),
        ("PreToolUse", hooks.pre_tool_use.len()),
        ("PostToolUse", hooks.post_tool_use.len()),
        ("Stop", hooks.stop.len()),
        ("Notification", hooks.notification.len()),
    ];

    view! {
        <div class="hook-pipeline">
            {events.into_iter().enumerate().map(|(i, (name, count))| {
                let has_hooks = count > 0;
                let node_class = if has_hooks { "pipeline-node active" } else { "pipeline-node" };
                let is_last = i == 5;

                view! {
                    <div class="pipeline-step">
                        <div class=node_class>
                            <div class="pipeline-node-name">{name}</div>
                            {if has_hooks {
                                view! { <div class="pipeline-node-count">{count} " hook(s)"</div> }.into_view()
                            } else {
                                view! { <div class="pipeline-node-count">{t("settings.no_hooks")}</div> }.into_view()
                            }}
                        </div>
                        {if !is_last {
                            view! { <div class="pipeline-arrow">"→"</div> }.into_view()
                        } else {
                            view! {}.into_view()
                        }}
                    </div>
                }
            }).collect_view()}
        </div>
    }
}
