mod api;
mod app;
mod components;
mod i18n;
mod pages;

fn main() {
    console_error_panic_hook::set_once();
    let _ = console_log::init_with_level(log::Level::Debug);
    leptos::mount_to_body(app::App);
}
