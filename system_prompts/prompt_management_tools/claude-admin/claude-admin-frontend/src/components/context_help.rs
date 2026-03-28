use leptos::*;
use pulldown_cmark::{Options, Parser};

use crate::api;
use crate::i18n::t;

fn md_to_html(md: &str) -> String {
    let opts = Options::ENABLE_STRIKETHROUGH | Options::ENABLE_TABLES;
    let parser = Parser::new_ext(md, opts);
    let mut html = String::new();
    pulldown_cmark::html::push_html(&mut html, parser);
    html
}

/// Context provided by each page describing what the user can do there.
#[derive(Clone, Debug, Default)]
pub struct PageContext {
    pub page_name: String,
    pub description: String,
    pub available_actions: Vec<String>,
    pub current_data_summary: String,
}

#[derive(Clone, Debug, serde::Deserialize)]
struct HelpChatResponse {
    answer: String,
}

#[component]
pub fn ContextHelpChat() -> impl IntoView {
    let is_open = create_rw_signal(false);
    let messages = create_rw_signal::<Vec<(String, bool)>>(vec![]); // (text, is_user)
    let input = create_rw_signal(String::new());
    let is_loading = create_rw_signal(false);

    // Try to get page context, or use default
    let page_ctx = use_context::<RwSignal<PageContext>>()
        .unwrap_or_else(|| create_rw_signal(PageContext::default()));

    let do_send = move || {
        let question = input.get();
        if question.trim().is_empty() {
            return;
        }

        // Add user message
        messages.update(|msgs| msgs.push((question.clone(), true)));
        input.set(String::new());
        is_loading.set(true);

        let ctx = page_ctx.get();
        let context_json = format!(
            "Page: {}\nDescription: {}\nAvailable actions: {}\nCurrent state: {}",
            ctx.page_name,
            ctx.description,
            ctx.available_actions.join(", "),
            ctx.current_data_summary
        );

        // Build conversation history from previous messages
        let current_msgs = messages.get();
        let history: Vec<serde_json::Value> = current_msgs
            .iter()
            .rev()
            .skip(1) // skip the just-added user message (sent as "question")
            .collect::<Vec<_>>()
            .into_iter()
            .rev()
            .map(|(text, is_user)| {
                serde_json::json!({
                    "role": if *is_user { "user" } else { "assistant" },
                    "content": text,
                })
            })
            .collect();

        spawn_local(async move {
            let req = serde_json::json!({
                "question": question,
                "page_context": context_json,
                "history": history,
            });
            match api::post::<HelpChatResponse, _>("/ai/help-chat", &req).await {
                Ok(resp) => {
                    messages.update(|msgs| msgs.push((resp.answer, false)));
                }
                Err(e) => {
                    let error_text = if e.contains("400") {
                        t("help_chat.no_api_key").get()
                    } else {
                        format!("Error: {}", e)
                    };
                    messages.update(|msgs| msgs.push((error_text, false)));
                }
            }
            is_loading.set(false);
        });
    };

    let send_on_click = move |_: web_sys::MouseEvent| {
        do_send();
    };

    let on_keydown = move |ev: web_sys::KeyboardEvent| {
        if ev.key() == "Enter" && !ev.shift_key() {
            ev.prevent_default();
            do_send();
        }
    };

    view! {
        // Floating help button
        <button
            class="help-chat-fab"
            style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; \
                   width: 48px; height: 48px; border-radius: 50%; \
                   background: var(--color-primary, #6366f1); color: white; \
                   border: none; font-size: 20px; font-weight: bold; \
                   cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.25); \
                   display: flex; align-items: center; justify-content: center;"
            on:click=move |_| is_open.update(|v| *v = !*v)
            title=t("help_chat.title")
        >
            {move || if is_open.get() { "X" } else { "?" }}
        </button>

        // Chat panel
        <Show when=move || is_open.get() fallback=|| ()>
            <div
                class="help-chat-panel"
                style="position: fixed; bottom: 80px; right: 24px; z-index: 9998; \
                       width: 350px; height: 450px; \
                       background: var(--bg-primary, #fff); \
                       border: 1px solid var(--border, #e5e7eb); \
                       border-radius: 12px; \
                       box-shadow: 0 8px 32px rgba(0,0,0,0.15); \
                       display: flex; flex-direction: column; \
                       overflow: hidden;"
            >
                // Header
                <div style="padding: 12px 16px; \
                            border-bottom: 1px solid var(--border, #e5e7eb); \
                            font-weight: 600; font-size: 14px; \
                            display: flex; align-items: center; justify-content: space-between; \
                            color: var(--text-primary, #111);">
                    <span>{t("help_chat.title")}</span>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        // Clear conversation button
                        <button
                            style="background: none; border: none; cursor: pointer; \
                                   color: var(--text-secondary, #666); padding: 2px; \
                                   display: flex; align-items: center;"
                            title=t("help_chat.clear")
                            on:click=move |_| messages.set(vec![])
                        >
                            <span inner_html=r#"<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>"#/>
                        </button>
                        <button
                            style="background: none; border: none; cursor: pointer; \
                                   font-size: 16px; color: var(--text-secondary, #666); padding: 0;"
                            on:click=move |_| is_open.set(false)
                        >
                            "X"
                        </button>
                    </div>
                </div>

                // Messages area
                <div style="flex: 1; overflow-y: auto; padding: 12px; \
                            display: flex; flex-direction: column; gap: 8px;">
                    <For
                        each=move || {
                            let msgs = messages.get();
                            msgs.into_iter().enumerate().collect::<Vec<_>>()
                        }
                        key=|(i, _)| *i
                        children=move |(_, (text, is_user))| {
                            let align = if is_user { "flex-end" } else { "flex-start" };
                            let bg = if is_user {
                                "var(--color-primary, #6366f1)"
                            } else {
                                "var(--bg-secondary, #f3f4f6)"
                            };
                            let color = if is_user {
                                "white"
                            } else {
                                "var(--text-primary, #111)"
                            };
                            if is_user {
                                view! {
                                    <div style=format!(
                                        "display: flex; justify-content: {};", align
                                    )>
                                        <div style=format!(
                                            "max-width: 85%; padding: 8px 12px; border-radius: 12px; \
                                             font-size: 13px; line-height: 1.4; \
                                             background: {}; color: {};",
                                            bg, color
                                        )>
                                            {text}
                                        </div>
                                    </div>
                                }.into_view()
                            } else {
                                let html = md_to_html(&text);
                                view! {
                                    <div style=format!(
                                        "display: flex; justify-content: {};", align
                                    )>
                                        <div
                                            class="help-chat-md"
                                            style=format!(
                                                "max-width: 85%; padding: 8px 12px; border-radius: 12px; \
                                                 font-size: 13px; line-height: 1.5; \
                                                 background: {}; color: {};",
                                                bg, color
                                            )
                                            inner_html=html
                                        />
                                    </div>
                                }.into_view()
                            }
                        }
                    />
                    <Show when=move || is_loading.get() fallback=|| ()>
                        <div style="display: flex; justify-content: flex-start;">
                            <div style="padding: 8px 12px; border-radius: 12px; font-size: 13px; \
                                        background: var(--bg-secondary, #f3f4f6); \
                                        color: var(--text-secondary, #666);">
                                {t("help_chat.thinking")}
                            </div>
                        </div>
                    </Show>
                </div>

                // Input area
                <div style="padding: 8px 12px; \
                            border-top: 1px solid var(--border, #e5e7eb); \
                            display: flex; gap: 8px; align-items: center;">
                    <input
                        type="text"
                        class="form-control"
                        style="flex: 1; font-size: 13px; padding: 6px 10px; \
                               border: 1px solid var(--border, #e5e7eb); border-radius: 8px; \
                               background: var(--bg-primary, #fff); \
                               color: var(--text-primary, #111);"
                        placeholder=t("help_chat.placeholder")
                        prop:value=move || input.get()
                        on:input=move |ev| input.set(event_target_value(&ev))
                        on:keydown=on_keydown
                    />
                    <button
                        class="btn btn-primary btn-sm"
                        style="padding: 6px 12px; font-size: 13px; border-radius: 8px;"
                        on:click=send_on_click
                        disabled=move || is_loading.get() || input.get().trim().is_empty()
                    >
                        {t("help_chat.send")}
                    </button>
                </div>
            </div>
        </Show>
    }
}
