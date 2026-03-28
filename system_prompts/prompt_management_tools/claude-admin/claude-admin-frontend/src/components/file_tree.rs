use leptos::*;

#[component]
pub fn FileTree(
    #[prop(into)] files: Vec<String>,
    #[prop(into)] on_select: Callback<String>,
) -> impl IntoView {
    view! {
        <div class="file-tree">
            {files.into_iter().map(|file| {
                let f = file.clone();
                view! {
                    <div
                        class="file-tree-item"
                        on:click=move |_| on_select.call(f.clone())
                    >
                        {file}
                    </div>
                }
            }).collect_view()}
        </div>
    }
}
