use crate::components::language_selector::LanguageSelector;
use crate::components::theme_toggle::ThemeToggle;
use crate::i18n::t;
use leptos::*;
use leptos_router::*;

// SVG icon helper — returns inline SVG markup for nav icons (18x18, stroke-based)
fn icon(svg_path: &'static str) -> impl IntoView {
    view! {
        <span class="nav-icon" inner_html=format!(
            r#"<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{}</svg>"#,
            svg_path
        )/>
    }
}

// Icon path constants (Lucide-style SVG paths)
const ICON_DASHBOARD: &str = r#"<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>"#;
const ICON_ANALYTICS: &str = r#"<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>"#;
const ICON_PROJECTS: &str =
    r#"<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>"#;
const ICON_SKILLS: &str = r#"<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>"#;
const ICON_RULES: &str = r#"<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>"#;
const ICON_PLANS: &str = r#"<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>"#;
const ICON_MCP: &str = r#"<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>"#;
const ICON_AGENTS: &str = r#"<path d="M12 8V4H8"/><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="4" y="10" width="6" height="8" rx="1"/><rect x="14" y="10" width="6" height="8" rx="1"/><path d="M9 18v4"/><path d="M15 18v4"/><path d="M7 10V8a5 5 0 0 1 10 0v2"/>"#;
const ICON_PLUGINS: &str = r#"<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>"#;
const ICON_LAUNCH: &str = r#"<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 4 0 4 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-4 0-4"/>"#;
const ICON_SYSTEM_PROMPTS: &str =
    r#"<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>"#;
const ICON_PERMISSIONS: &str = r#"<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>"#;
const ICON_SETTINGS: &str = r#"<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>"#;
const ICON_BACKUPS: &str =
    r#"<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>"#;
const ICON_SEARCH: &str =
    r#"<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>"#;
const ICON_SESSIONS: &str =
    r#"<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>"#;
const ICON_WORKTREES: &str = r#"<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>"#;
const ICON_GITHUB: &str = r#"<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>"#;
const ICON_DOCS: &str = r#"<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>"#;
const ICON_HELP: &str = r#"<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>"#;
const ICON_TIMELINE: &str =
    r#"<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>"#;
const ICON_LICENSES: &str = r#"<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>"#;

#[component]
pub fn Sidebar() -> impl IntoView {
    view! {
        <aside class="sidebar">
            <div class="sidebar-header">
                <h1>{t("app.title")}</h1>
                <div class="subtitle">{t("app.subtitle")}</div>
                <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem; align-items: center;">
                    <LanguageSelector/>
                    <ThemeToggle/>
                </div>
            </div>
            <nav>
                <div class="nav-section">{t("sidebar.overview")}</div>
                <A href="" class="nav-link" exact=true>
                    {icon(ICON_DASHBOARD)}
                    {t("sidebar.dashboard")}
                </A>
                <A href="/analytics" class="nav-link">
                    {icon(ICON_ANALYTICS)}
                    {t("sidebar.analytics")}
                </A>

                <div class="nav-section">{t("sidebar.manage")}</div>
                <A href="/projects" class="nav-link">
                    {icon(ICON_PROJECTS)}
                    {t("sidebar.projects")}
                </A>
                <A href="/skills" class="nav-link">
                    {icon(ICON_SKILLS)}
                    {t("sidebar.global_skills")}
                </A>
                <A href="/rules" class="nav-link">
                    {icon(ICON_RULES)}
                    {t("sidebar.global_rules")}
                </A>
                <A href="/plans" class="nav-link">
                    {icon(ICON_PLANS)}
                    {t("sidebar.plans")}
                </A>
                <A href="/mcp" class="nav-link">
                    {icon(ICON_MCP)}
                    {t("sidebar.mcp_servers")}
                </A>
                <A href="/agents" class="nav-link">
                    {icon(ICON_AGENTS)}
                    {t("sidebar.agents")}
                </A>
                <A href="/plugins" class="nav-link">
                    {icon(ICON_PLUGINS)}
                    {t("sidebar.plugins")}
                </A>
                <A href="/launch-profiles" class="nav-link">
                    {icon(ICON_LAUNCH)}
                    {t("sidebar.launch_profiles")}
                </A>
                <A href="/system-prompts" class="nav-link">
                    {icon(ICON_SYSTEM_PROMPTS)}
                    {t("sidebar.system_prompts")}
                </A>

                <div class="nav-section">{t("sidebar.security")}</div>
                <A href="/permissions" class="nav-link">
                    {icon(ICON_PERMISSIONS)}
                    {t("sidebar.permissions")}
                </A>

                <div class="nav-section">{t("sidebar.system")}</div>
                <A href="/settings" class="nav-link">
                    {icon(ICON_SETTINGS)}
                    {t("sidebar.settings")}
                </A>
                <A href="/backups" class="nav-link">
                    {icon(ICON_BACKUPS)}
                    {t("sidebar.backups")}
                </A>
                <A href="/search" class="nav-link">
                    {icon(ICON_SEARCH)}
                    {t("sidebar.search")}
                </A>
                <A href="/timeline" class="nav-link">
                    {icon(ICON_TIMELINE)}
                    {t("sidebar.timeline")}
                </A>
                <A href="/sessions" class="nav-link">
                    {icon(ICON_SESSIONS)}
                    {t("sidebar.sessions")}
                </A>
                <A href="/worktrees" class="nav-link">
                    {icon(ICON_WORKTREES)}
                    {t("sidebar.worktrees")}
                </A>
                <A href="/github" class="nav-link">
                    {icon(ICON_GITHUB)}
                    {t("sidebar.github")}
                </A>

                <div class="nav-section">{t("sidebar.learn")}</div>
                <A href="/docs" class="nav-link">
                    {icon(ICON_DOCS)}
                    {t("sidebar.docs")}
                </A>
                <A href="/help" class="nav-link">
                    {icon(ICON_HELP)}
                    {t("sidebar.help")}
                </A>
                <A href="/licenses" class="nav-link">
                    {icon(ICON_LICENSES)}
                    {t("sidebar.licenses")}
                </A>
            </nav>
        </aside>
    }
}
