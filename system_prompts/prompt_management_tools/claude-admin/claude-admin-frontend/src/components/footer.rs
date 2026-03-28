use leptos::*;

#[component]
pub fn Footer() -> impl IntoView {
    view! {
        <footer class="app-footer">
            <a href="https://bruchmann-tec.com" target="_blank" rel="noopener noreferrer" class="footer-logo-link">
                <svg viewBox="0 0 660 40" class="footer-logo" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="2">
                        <tspan fill="currentColor">"BRUCHMANN "</tspan>
                        <tspan fill="#ef4444">"["</tspan>
                        <tspan fill="#ef4444" font-weight="900">"TEC"</tspan>
                        <tspan fill="#ef4444">"]"</tspan>
                        <tspan fill="currentColor">" INNOVATION GMBH"</tspan>
                    </text>
                </svg>
            </a>
        </footer>
    }
}
