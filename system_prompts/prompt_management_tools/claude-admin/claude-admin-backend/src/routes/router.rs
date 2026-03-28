use axum::routing::{delete, get, post};
use axum::Router;
use std::sync::Arc;

use crate::app::{login, AppState};
use crate::routes;

fn health_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/api/v1/health", get(routes::health::health_check))
        .route("/api/v1/dashboard", get(routes::dashboard::get_dashboard))
        .route(
            "/api/v1/dashboard/health",
            get(routes::dashboard::get_dashboard_health),
        )
}

fn project_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/api/v1/projects", get(routes::projects::list_projects))
        .route("/api/v1/projects/:id", get(routes::projects::get_project))
        .route(
            "/api/v1/projects/:id/status",
            get(routes::projects::get_project_status),
        )
        .route(
            "/api/v1/projects/:id/claude-md",
            get(routes::projects::get_claude_md).put(routes::projects::put_claude_md),
        )
        .route(
            "/api/v1/projects/:id/profile",
            get(routes::projects::get_project_profile),
        )
        .route(
            "/api/v1/projects/:id/effective-config",
            get(routes::projects::get_effective_config),
        )
        .route(
            "/api/v1/projects/:id/advisor",
            get(routes::advisor::get_advisor_report),
        )
        .route(
            "/api/v1/projects/:id/advisor/apply",
            post(routes::advisor::apply_advisor_action),
        )
}

fn skill_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/skills",
            get(routes::skills::list_skills).post(routes::skills::create_skill),
        )
        .route(
            "/api/v1/skills/:scope/:name",
            get(routes::skills::get_skill)
                .put(routes::skills::update_skill)
                .delete(routes::skills::delete_skill),
        )
        .route(
            "/api/v1/skills/templates",
            get(routes::skills::list_skill_templates),
        )
        .route(
            "/api/v1/skills/preview",
            post(routes::skills::preview_skill),
        )
        .route(
            "/api/v1/skill-browser/official",
            get(routes::skill_browser::list_official_skills),
        )
        .route(
            "/api/v1/skill-browser/community",
            get(routes::skill_browser::list_community_skills),
        )
        .route(
            "/api/v1/skill-browser/install",
            post(routes::skill_browser::install_skill),
        )
}

fn rule_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/rules",
            get(routes::rules::list_rules).post(routes::rules::create_rule),
        )
        .route(
            "/api/v1/rules/conflicts",
            get(routes::rules::get_rule_conflicts),
        )
        .route(
            "/api/v1/rules/:scope/:name",
            get(routes::rules::get_rule)
                .put(routes::rules::update_rule)
                .delete(routes::rules::delete_rule),
        )
}

fn memory_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/memory/:project",
            get(routes::memory::get_memory).put(routes::memory::put_memory),
        )
        .route(
            "/api/v1/memory/:project/topics/:name",
            get(routes::memory::get_topic).put(routes::memory::put_topic),
        )
}

fn settings_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/settings/global",
            get(routes::settings::get_global_settings).put(routes::settings::put_global_settings),
        )
        .route(
            "/api/v1/settings/claude-json",
            get(routes::settings::get_claude_json),
        )
        .route(
            "/api/v1/settings/hierarchy/:project_id",
            get(routes::settings::get_settings_hierarchy),
        )
        .route(
            "/api/v1/settings/hook-templates",
            get(routes::settings::get_hook_templates),
        )
        .route(
            "/api/v1/settings/storage",
            get(routes::settings::get_storage),
        )
        .route(
            "/api/v1/settings/api-key",
            get(routes::settings::get_api_key_status).put(routes::settings::set_api_key),
        )
}

fn plan_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/api/v1/plans", get(routes::plans::list_plans))
        .route(
            "/api/v1/plans/:name",
            get(routes::plans::get_plan)
                .put(routes::plans::update_plan)
                .delete(routes::plans::delete_plan),
        )
}

fn ai_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/api/v1/ai/suggest", post(routes::ai::suggest))
        .route("/api/v1/ai/validate", post(routes::ai::validate))
        .route("/api/v1/ai/help-chat", post(routes::ai::help_chat))
}

fn permission_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/permissions",
            get(routes::permissions::list_permissions),
        )
        .route(
            "/api/v1/permissions/:project_id",
            get(routes::permissions::get_project_permissions),
        )
        .route(
            "/api/v1/permissions/:project_id/entries",
            delete(routes::permissions::delete_permission_entries),
        )
        .route(
            "/api/v1/permissions/:project_id/optimize",
            get(routes::permissions::optimize_permissions),
        )
        .route(
            "/api/v1/health/overview",
            get(routes::permissions::get_health_overview),
        )
        .route(
            "/api/v1/health/:project_id",
            get(routes::permissions::get_project_health),
        )
}

fn analytics_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/analytics/tips",
            get(routes::analytics::get_analytics_tips),
        )
        .route(
            "/api/v1/analytics/overview",
            get(routes::analytics::get_analytics_overview),
        )
        .route(
            "/api/v1/analytics/projects",
            get(routes::analytics::get_project_analytics),
        )
        .route(
            "/api/v1/analytics/export",
            get(routes::analytics::export_analytics),
        )
        .route("/api/v1/sessions", get(routes::sessions::list_sessions))
        .route(
            "/api/v1/sessions/search",
            get(routes::sessions::search_history),
        )
        .route("/api/v1/sessions/:id", get(routes::sessions::get_session))
        .route(
            "/api/v1/sessions/:id/transcript",
            get(routes::sessions::get_transcript),
        )
}

fn system_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/system/info",
            get(routes::system_info::get_system_info),
        )
        .route(
            "/api/v1/system/storage",
            get(routes::system_info::get_storage_info),
        )
        .route("/api/v1/github", get(routes::github::get_github_overview))
        .route("/api/v1/licenses", get(routes::licenses::get_licenses))
}

fn mcp_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/mcp",
            get(routes::mcp::list_mcp_servers).post(routes::mcp::create_mcp_server),
        )
        .route("/api/v1/mcp/health", get(routes::mcp::health_check_all))
        .route(
            "/api/v1/mcp/:name",
            get(routes::mcp::get_mcp_server)
                .put(routes::mcp::update_mcp_server)
                .delete(routes::mcp::delete_mcp_server),
        )
        .route(
            "/api/v1/mcp/:name/health",
            get(routes::mcp::health_check_server),
        )
        .route("/api/v1/mcp-browser", get(routes::mcp::get_mcp_catalog))
        .route(
            "/api/v1/mcp-browser/install",
            post(routes::mcp::install_mcp_server),
        )
}

fn agent_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/agents",
            get(routes::agents::list_agents).post(routes::agents::create_agent),
        )
        .route(
            "/api/v1/agents/:name",
            get(routes::agents::get_agent)
                .put(routes::agents::update_agent)
                .delete(routes::agents::delete_agent),
        )
}

fn plugin_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/plugins",
            get(routes::plugins::list_plugins).post(routes::plugins::install_plugin),
        )
        .route(
            "/api/v1/plugins/:name",
            delete(routes::plugins::delete_plugin),
        )
}

fn launch_profile_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/launch-profiles",
            get(routes::launch_profiles::list_profiles)
                .post(routes::launch_profiles::create_profile),
        )
        .route(
            "/api/v1/launch-profiles/:name",
            get(routes::launch_profiles::get_profile)
                .put(routes::launch_profiles::update_profile)
                .delete(routes::launch_profiles::delete_profile),
        )
        .route(
            "/api/v1/launch-profiles/:name/command",
            get(routes::launch_profiles::generate_command),
        )
}

fn system_prompt_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/system-prompts",
            get(routes::system_prompts::list_system_prompts)
                .post(routes::system_prompts::create_system_prompt),
        )
        .route(
            "/api/v1/system-prompts/:name",
            get(routes::system_prompts::get_system_prompt)
                .put(routes::system_prompts::update_system_prompt)
                .delete(routes::system_prompts::delete_system_prompt),
        )
}

fn tool_access_routes() -> Router<Arc<AppState>> {
    Router::new().route(
        "/api/v1/tool-access",
        get(routes::tool_access::get_tool_access).put(routes::tool_access::update_tool_access),
    )
}

fn worktree_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/worktrees",
            get(routes::worktrees::list_worktrees).post(routes::worktrees::create_worktree),
        )
        .route(
            "/api/v1/worktrees/:path",
            delete(routes::worktrees::delete_worktree),
        )
}

fn system_status_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/v1/system/status",
            get(routes::system_status::get_system_status),
        )
        .route(
            "/api/v1/system/auth",
            get(routes::system_status::get_auth_status),
        )
        .route(
            "/api/v1/system/update",
            get(routes::system_status::get_update_status),
        )
        .route(
            "/api/v1/system/doctor",
            get(routes::system_status::get_doctor_result),
        )
        .route(
            "/api/v1/system/ide",
            get(routes::system_status::get_ide_status),
        )
}

fn timeline_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/api/v1/timeline", get(routes::timeline::list_timeline))
        .route(
            "/api/v1/timeline/:hash",
            get(routes::timeline::get_commit_diff),
        )
        .route(
            "/api/v1/timeline/:hash/restore",
            post(routes::timeline::restore_to_commit),
        )
}

fn backup_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/api/v1/backups", get(routes::backups::list_backups))
        .route(
            "/api/v1/backups/prune",
            post(routes::backups::prune_backups),
        )
        .route(
            "/api/v1/backups/:name/restore",
            post(routes::backups::restore_backup),
        )
        .route(
            "/api/v1/backups/:name/diff",
            get(routes::backups::get_backup_diff),
        )
        .route(
            "/api/v1/backups/:name",
            delete(routes::backups::delete_backup),
        )
}

fn utility_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/api/v1/export", get(routes::export::export_bundle))
        .route("/api/v1/import", post(routes::export::import_bundle))
        .route("/api/v1/search", get(routes::search::search))
        .route("/api/v1/templates", get(routes::templates::list_templates))
        .route(
            "/api/v1/templates/:name/apply",
            post(routes::templates::apply_template),
        )
}

fn operational_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/api/v1/auth/login", post(login))
        .route("/api/v1/audit", get(routes::audit::get_audit_log))
        .route(
            "/api/v1/budgets",
            get(routes::budgets::get_budget_status).put(routes::budgets::update_budget),
        )
        .route(
            "/api/v1/preview/markdown",
            post(routes::preview::render_markdown),
        )
        .route(
            "/api/v1/preview/highlight",
            post(routes::preview::highlight_code),
        )
        .route("/api/v1/events", get(routes::events::sse_events))
        .route(
            "/api/v1/webhooks",
            get(routes::webhooks::list_webhooks).post(routes::webhooks::create_webhook),
        )
        .route(
            "/api/v1/webhooks/:id",
            axum::routing::put(routes::webhooks::update_webhook)
                .delete(routes::webhooks::delete_webhook),
        )
        .route("/api/v1/sync/manifest", get(routes::sync::get_manifest))
        .route("/api/v1/sync/push", post(routes::sync::push_files))
        .route("/api/v1/sync/pull", post(routes::sync::pull_files))
        .route("/api/v1/sync/file", get(routes::sync::get_file))
        .route("/api/v1/sync/receive", post(routes::sync::receive_file))
        .route("/api/v1/docs", get(routes::docs::swagger_ui))
        .route("/api/v1/docs/openapi.json", get(routes::docs::openapi_spec))
}

/// Create the complete API router used by both production and tests.
pub fn create_api_routes() -> Router<Arc<AppState>> {
    Router::new()
        .merge(health_routes())
        .merge(project_routes())
        .merge(skill_routes())
        .merge(rule_routes())
        .merge(memory_routes())
        .merge(settings_routes())
        .merge(plan_routes())
        .merge(ai_routes())
        .merge(permission_routes())
        .merge(analytics_routes())
        .merge(system_routes())
        .merge(mcp_routes())
        .merge(agent_routes())
        .merge(plugin_routes())
        .merge(launch_profile_routes())
        .merge(system_prompt_routes())
        .merge(tool_access_routes())
        .merge(worktree_routes())
        .merge(system_status_routes())
        .merge(backup_routes())
        .merge(timeline_routes())
        .merge(utility_routes())
        .merge(operational_routes())
}
