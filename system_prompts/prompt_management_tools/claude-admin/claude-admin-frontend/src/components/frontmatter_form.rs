use claude_admin_shared::SkillFrontmatter;
use leptos::*;

use crate::i18n::t;

#[component]
pub fn FrontmatterForm(#[prop(into)] frontmatter: RwSignal<SkillFrontmatter>) -> impl IntoView {
    let description = create_rw_signal(frontmatter.get_untracked().description.unwrap_or_default());
    let user_invocable =
        create_rw_signal(frontmatter.get_untracked().user_invocable.unwrap_or(false));

    // Sync back to parent signal
    create_effect(move |_| {
        frontmatter.set(SkillFrontmatter {
            description: Some(description.get()),
            user_invocable: Some(user_invocable.get()),
        });
    });

    view! {
        <div class="form-group">
            <label>{t("component.frontmatter.description")}</label>
            <input
                type="text"
                prop:value=move || description.get()
                on:input=move |ev| description.set(event_target_value(&ev))
            />
        </div>
        <div class="form-group">
            <label>
                <input
                    type="checkbox"
                    prop:checked=move || user_invocable.get()
                    on:change=move |ev| {
                        user_invocable.set(event_target_checked(&ev));
                    }
                />
                " " {t("component.frontmatter.user_invocable_label")}
            </label>
        </div>
    }
}

fn event_target_checked(ev: &leptos::ev::Event) -> bool {
    use wasm_bindgen::JsCast;
    ev.target()
        .and_then(|t| t.dyn_into::<web_sys::HtmlInputElement>().ok())
        .map(|input| input.checked())
        .unwrap_or(false)
}
