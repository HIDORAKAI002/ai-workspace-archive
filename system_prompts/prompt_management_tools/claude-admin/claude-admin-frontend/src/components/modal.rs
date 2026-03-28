use leptos::*;

#[component]
pub fn Modal(
    #[prop(into)] show: ReadSignal<bool>,
    #[prop(into)] on_close: Callback<()>,
    #[prop(into)] title: String,
    children: Children,
) -> impl IntoView {
    let children = children().nodes.into_iter().collect::<Vec<_>>();

    view! {
        <Show when=move || show.get() fallback=|| ()>
            <div class="modal-overlay" on:click=move |_| on_close.call(())>
                <div class="modal" on:click=move |ev| ev.stop_propagation()>
                    <div class="modal-header">
                        <h3>{title.clone()}</h3>
                        <button class="btn btn-secondary btn-sm" on:click=move |_| on_close.call(())>"X"</button>
                    </div>
                    {children.clone()}
                </div>
            </div>
        </Show>
    }
}
