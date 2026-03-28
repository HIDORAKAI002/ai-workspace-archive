use leptos::*;
use leptos_meta::*;
use leptos_router::*;

use crate::components::context_help::ContextHelpChat;
use crate::components::footer::Footer;
use crate::components::keyboard_shortcuts::KeyboardShortcuts;
use crate::components::sidebar::Sidebar;
use crate::pages;

#[component]
pub fn App() -> impl IntoView {
    crate::i18n::provide_i18n();
    provide_meta_context();

    view! {
        <Title text="ClaudeAdmin"/>
        <KeyboardShortcuts/>
        <Router>
            <div class="app-layout">
                <Sidebar/>
                <main class="main-content">
                    <Routes>
                        <Route path="" view=pages::dashboard::DashboardPage/>
                        <Route path="/analytics" view=pages::analytics::AnalyticsPage/>
                        <Route path="/projects" view=pages::projects::ProjectsPage/>
                        <Route path="/projects/:id" view=pages::project_detail::ProjectDetailPage/>
                        <Route path="/skills" view=pages::global_skills::GlobalSkillsPage/>
                        <Route path="/rules" view=pages::global_rules::GlobalRulesPage/>
                        <Route path="/plans" view=pages::plans::PlansPage/>
                        <Route path="/mcp" view=pages::mcp::McpServersPage/>
                        <Route path="/agents" view=pages::agents::AgentsPage/>
                        <Route path="/plugins" view=pages::plugins::PluginsPage/>
                        <Route path="/launch-profiles" view=pages::launch_profiles::LaunchProfilesPage/>
                        <Route path="/system-prompts" view=pages::system_prompts::SystemPromptsPage/>
                        <Route path="/permissions" view=pages::permissions::PermissionsPage/>
                        <Route path="/permissions/:id" view=pages::permissions::PermissionDetailPage/>
                        <Route path="/worktrees" view=pages::worktrees::WorktreesPage/>
                        <Route path="/settings" view=pages::settings::SettingsPage/>
                        <Route path="/sessions" view=pages::sessions::SessionsPage/>
                        <Route path="/github" view=pages::github::GitHubPage/>
                        <Route path="/docs" view=pages::docs::DocsPage/>
                        <Route path="/help" view=pages::help::HelpPage/>
                        <Route path="/licenses" view=pages::licenses::LicensesPage/>
                        <Route path="/backups" view=pages::backups::BackupsPage/>
                        <Route path="/timeline" view=pages::timeline::TimelinePage/>
                        <Route path="/search" view=pages::search::SearchPage/>
                    </Routes>
                </main>
                <Footer/>
            </div>
            <ContextHelpChat/>
        </Router>
    }
}
