use std::collections::HashMap;
use std::sync::OnceLock;

static TRANSLATIONS: OnceLock<HashMap<&'static str, &'static str>> = OnceLock::new();

pub fn translations() -> &'static HashMap<&'static str, &'static str> {
    TRANSLATIONS.get_or_init(|| {
        let mut m = HashMap::new();

        // ── App ──
        m.insert("app.title", "ClaudeAdmin");
        m.insert("app.subtitle", "Configuration Manager");

        // ── Sidebar ──
        m.insert("sidebar.overview", "Overview");
        m.insert("sidebar.dashboard", "Dashboard");
        m.insert("sidebar.analytics", "Analytics");
        m.insert("sidebar.manage", "Manage");
        m.insert("sidebar.projects", "Projects");
        m.insert("sidebar.global_skills", "Global Skills");
        m.insert("sidebar.skill_browser", "Skill Browser");
        m.insert("sidebar.global_rules", "Global Rules");
        m.insert("sidebar.plans", "Plans");
        m.insert("sidebar.mcp_servers", "MCP Servers");
        m.insert("sidebar.mcp_browser", "MCP Browser");
        m.insert("sidebar.security", "Security");
        m.insert("sidebar.permissions", "Permissions");
        m.insert("sidebar.config_health", "Config Health");
        m.insert("sidebar.system", "System");
        m.insert("sidebar.settings", "Settings");
        m.insert("sidebar.sessions", "Sessions");
        m.insert("sidebar.github", "GitHub");
        m.insert("sidebar.learn", "Learn");
        m.insert("sidebar.docs", "Documentation");
        m.insert("sidebar.help", "System Info");

        // ── Dashboard ──
        m.insert("dashboard.title", "Dashboard");
        m.insert("dashboard.subtitle", "Overview of your Claude Code configuration");
        m.insert("dashboard.projects", "Projects");
        m.insert("dashboard.global_skills", "Global Skills");
        m.insert("dashboard.global_rules", "Global Rules");
        m.insert("dashboard.mcp_servers", "MCP Servers");
        m.insert("dashboard.plans", "Plans");
        m.insert("dashboard.config_health", "Config Health");
        m.insert("dashboard.recent_projects", "Recent Projects");
        m.insert("dashboard.recent_changes", "Recent Changes");
        m.insert("dashboard.no_recent_changes", "No recent changes");
        m.insert("dashboard.change_action", "Action");
        m.insert("dashboard.change_resource", "Resource");
        m.insert("dashboard.change_time", "Time");
        m.insert("dashboard.loading", "Loading");
        m.insert("dashboard.error_loading", "Error loading dashboard");
        m.insert("dashboard.col_name", "Name");
        m.insert("dashboard.col_claude_md", "CLAUDE.md");
        m.insert("dashboard.col_skills", "Skills");
        m.insert("dashboard.col_rules", "Rules");
        m.insert("dashboard.col_memory", "Memory");
        m.insert("dashboard.yes", "Yes");

        // ── MCP ──
        m.insert("mcp.title", "MCP Servers");
        m.insert("mcp.subtitle", "Manage Model Context Protocol servers for Claude Code");
        m.insert("mcp.tab_servers", "Servers");
        m.insert("mcp.tab_health", "Health Check");
        m.insert("mcp.tab_add", "New Server");
        m.insert("mcp.tab_browse", "Browse Catalog");
        m.insert("mcp.tab_tools", "Tool Explorer");
        m.insert("mcp.tools.title", "Tool Explorer");
        m.insert("mcp.tools.description", "All tools across all MCP servers");
        m.insert("mcp.tools.search", "Search tools...");
        m.insert("mcp.tools.parameters", "Parameters (JSON Schema)");
        m.insert("mcp.tools.required", "Required");
        m.insert("mcp.tools.no_tools", "No tools found. Run a health check first.");
        m.insert("mcp.tools.from_server", "from");
        m.insert("mcp.tools.loading", "Loading tools...");
        m.insert("mcp.loading", "Loading MCP servers");
        m.insert("mcp.no_servers", "No MCP servers configured");
        m.insert("mcp.no_servers_hint", "Add servers using the 'New Server' tab or the MCP Browser.");
        m.insert("mcp.select_server", "Select a server from the list to view and edit its configuration.");
        m.insert("mcp.no_servers_configured", "No servers configured.");
        m.insert("mcp.check_health", "Check Health");
        m.insert("mcp.save", "Save");
        m.insert("mcp.delete", "Delete");
        m.insert("mcp.saved", "Saved!");
        m.insert("mcp.deleted", "Deleted!");
        m.insert("mcp.read_only", "Read-only");
        m.insert("mcp.read_only_hint", "This server is managed externally and cannot be edited here.");
        m.insert("mcp.health.title", "MCP Server Health");
        m.insert("mcp.health.check_all", "Check All Servers");
        m.insert("mcp.health.checking", "Checking...");
        m.insert("mcp.health.description", "Spawns each MCP server process, sends JSON-RPC initialize + tools/list, and reports the results. Timeout: 10 seconds per server.");
        m.insert("mcp.health.col_name", "Name");
        m.insert("mcp.health.col_source", "Source");
        m.insert("mcp.health.col_status", "Status");
        m.insert("mcp.health.col_server_info", "Server Info");
        m.insert("mcp.health.col_tools", "Tools");
        m.insert("mcp.health.col_duration", "Duration");
        m.insert("mcp.health.running", "Running");
        m.insert("mcp.health.error", "Error");
        m.insert("mcp.health.timeout", "Timeout");
        m.insert("mcp.health.unsupported", "Not supported");
        m.insert("mcp.health.unknown", "Unknown");
        m.insert("mcp.add.title", "Add MCP Server");
        m.insert("mcp.add.description", "Add a new MCP server to your global ~/.claude.json configuration.");
        m.insert("mcp.add.name_label", "Server Name");
        m.insert("mcp.add.name_placeholder", "e.g. my-server");
        m.insert("mcp.add.config_label", "Server Configuration (JSON)");
        m.insert("mcp.add.mode_form", "Form");
        m.insert("mcp.add.mode_json", "Advanced JSON");
        m.insert("mcp.add.command_label", "Command");
        m.insert("mcp.add.args_label", "Arguments");
        m.insert("mcp.add.args_hint", "One argument per line");
        m.insert("mcp.add.env_label", "Environment Variables");
        m.insert("mcp.add.env_hint", "KEY=VALUE format, one per line");
        m.insert("mcp.add.submit", "Add Server");
        m.insert("mcp.add.name_required", "Please enter a server name");
        m.insert("mcp.browse.title", "MCP Server Catalog");
        m.insert("mcp.browse.description", "Browse popular MCP servers and install them with one click. Review the configuration before installing.");
        m.insert("mcp.browse.installed", "Installed");
        m.insert("mcp.browse.install", "Install");
        m.insert("mcp.browse.show_config", "Show Configuration");
        m.insert("mcp.browse.hide_config", "Hide Configuration");
        m.insert("mcp.browse.config_hint", "Review and edit the configuration before installing. Fill in required API keys and paths.");
        m.insert("mcp.browse.cat_system", "System & Files");
        m.insert("mcp.browse.cat_database", "Databases");
        m.insert("mcp.browse.cat_api", "APIs");
        m.insert("mcp.browse.cat_specialized", "Specialized");
        m.insert("mcp.browse.npm", "npm");
        m.insert("mcp.source.claude_code", "Claude Code");
        m.insert("mcp.source.claude_desktop", "Claude Desktop");

        // ── MCP Browser ──
        m.insert("mcp_browser.title", "MCP Browser");
        m.insert("mcp_browser.subtitle", "Discover and install MCP servers for Claude Code");
        m.insert("mcp_browser.search_placeholder", "Search MCP servers...");
        m.insert("mcp_browser.loading", "Loading MCP catalog");
        m.insert("mcp_browser.no_results", "No MCP servers found");
        m.insert("mcp_browser.installed", "Installed");
        m.insert("mcp_browser.install", "Install");
        m.insert("mcp_browser.needs_api_key", "Needs API Key");
        m.insert("mcp_browser.install_success", "installed successfully!");
        m.insert("mcp_browser.install_failed", "Failed to install");

        // ── Projects ──
        m.insert("projects.tab_projects", "Projects");
        m.insert("projects.tab_health", "Health Overview");
        m.insert("projects.title", "Projects");
        m.insert("projects.subtitle", "All projects registered in ~/.claude.json");
        m.insert("projects.loading", "Loading");
        m.insert("projects.error_loading", "Error loading projects: ");
        m.insert("projects.col_name", "Name");
        m.insert("projects.col_path", "Path");
        m.insert("projects.col_claude_md", "CLAUDE.md");
        m.insert("projects.col_skills", "Skills");
        m.insert("projects.col_rules", "Rules");
        m.insert("projects.col_memory", "Memory");
        m.insert("projects.yes", "Yes");

        // ── Project Detail ──
        m.insert("project_detail.loading", "Loading project details");
        m.insert("project_detail.error_loading", "Error loading project");
        m.insert("project_detail.tab_advisor", "Advisor");
        m.insert("project_detail.tab_profile", "Profile");
        m.insert("project_detail.profile_health", "Health Score");
        m.insert("project_detail.profile_rules", "Rules");
        m.insert("project_detail.profile_skills", "Skills");
        m.insert("project_detail.profile_memory", "Memory");
        m.insert("project_detail.profile_mcp", "MCP Servers");
        m.insert("project_detail.profile_hooks", "Hooks");
        m.insert("project_detail.profile_conflicts", "Conflicts");
        m.insert("project_detail.profile_analyze", "Run Deep Analysis");
        m.insert("project_detail.profile_no_mcp", "No MCP servers");
        m.insert("project_detail.profile_global_scope", "Global");
        m.insert("project_detail.profile_project_scope", "Project");
        m.insert("project_detail.tab_claude_md", "CLAUDE.md");
        m.insert("project_detail.tab_skills", "Skills");
        m.insert("project_detail.tab_rules", "Rules");
        m.insert("project_detail.tab_memory", "Memory");
        m.insert("project_detail.tab_permissions", "Permissions");
        m.insert("project_detail.tab_effective", "Effective Config");
        m.insert("project_detail.tab_health", "Health");
        m.insert("project_detail.no_claude_md", "No CLAUDE.md found");
        m.insert("project_detail.no_claude_md_hint", "Create a CLAUDE.md in your project directory to give Claude Code instructions.");
        m.insert("project_detail.no_skills", "No skills for this project");
        m.insert("project_detail.no_rules", "No rules for this project");
        m.insert("project_detail.no_memory", "No memory for this project");
        m.insert("project_detail.save", "Save");
        m.insert("project_detail.saved", "Saved!");
        m.insert("project_detail.skill_scope", "Scope");
        m.insert("project_detail.permissions_loading", "Loading permissions...");
        m.insert("project_detail.permissions_error", "Error loading permissions");
        m.insert("project_detail.permissions_entries", "Entries");
        m.insert("project_detail.permissions_col_tool", "Tool");
        m.insert("project_detail.permissions_col_command", "Command");
        m.insert("project_detail.permissions_no_entries", "No permission entries");
        m.insert("project_detail.health_loading", "Calculating health...");
        m.insert("project_detail.health_error", "Error loading health data");
        m.insert("project_detail.health_score", "Health Score");
        m.insert("project_detail.health_claude_md", "CLAUDE.md present");
        m.insert("project_detail.health_memory", "Memory present");
        m.insert("project_detail.health_permissions", "Permissions");
        m.insert("project_detail.health_security_issues", "Security issues");
        m.insert("project_detail.health_duplicated_rules", "Duplicated rules");
        m.insert("project_detail.health_no_security_issues", "No security issues found");
        m.insert("project_detail.health_col_text", "Text");
        m.insert("project_detail.health_col_found_in", "Found In");
        m.insert("project_detail.health_col_also_in", "Also In");
        m.insert("project_detail.health_permission_entries", "Permission Entries");
        m.insert("project_detail.permissions_col_index", "#");
        m.insert("project_detail.permissions_col_status", "Status");
        m.insert("project_detail.permissions_fragment", "Fragment");
        m.insert("project_detail.permissions_ok", "OK");
        m.insert("project_detail.permissions_security_warnings", "security warning(s)");
        m.insert("project_detail.permissions_manage", "Manage Permissions");
        m.insert("project_detail.advisor_analyze", "Analyze project");
        m.insert("project_detail.advisor_analyzing", "Analyzing...");
        m.insert("project_detail.advisor_description", "Claude analyzes your project and provides recommendations");
        m.insert("project_detail.advisor_loading", "Claude is analyzing your project");
        m.insert("project_detail.advisor_summary", "Project Assessment");
        m.insert("project_detail.advisor_done", "Done!");
        m.insert("project_detail.advisor_preview", "Show preview");
        m.insert("project_detail.advisor_category_tip", "Tip");
        m.insert("project_detail.skills_col_name", "Name");
        m.insert("project_detail.skills_col_description", "Description");
        m.insert("project_detail.skills_col_invocable", "Invocable");
        m.insert("project_detail.rules_col_name", "Name");
        m.insert("project_detail.rules_col_path", "Path");
        m.insert("project_detail.memory_col_file", "File");
        m.insert("project_detail.memory_col_size", "Size");
        m.insert("project_detail.bytes", "bytes");
        m.insert("project_detail.unknown_tab", "Unknown tab");

        // ── Global Skills ──
        m.insert("global_skills.tab_my_skills", "My Skills");
        m.insert("global_skills.tab_browse", "Browse");
        m.insert("global_skills.tab_templates", "Templates");
        m.insert("global_skills.title", "Global Skills");
        m.insert("global_skills.subtitle", "Manage skills in ~/.claude/skills/");
        m.insert("global_skills.loading", "Loading skills");
        m.insert("global_skills.no_skills", "No global skills found");
        m.insert("global_skills.no_skills_hint", "Create skills in ~/.claude/skills/ or use the Skill Browser.");
        m.insert("global_skills.select_skill", "Select a skill from the list.");
        m.insert("global_skills.col_skill", "Skill");
        m.insert("global_skills.col_invocable", "Invocable");
        m.insert("global_skills.invocable", "Invocable");
        m.insert("global_skills.not_invocable", "Not invocable");
        m.insert("global_skills.editing", "Editing:");
        m.insert("global_skills.save", "Save");
        m.insert("global_skills.saved", "Saved!");
        m.insert("global_skills.delete", "Delete");
        m.insert("global_skills.deleted", "Deleted!");

        // ── Skill Builder ──
        m.insert("global_skills.tab_create", "Create");
        m.insert("skill_builder.templates", "Templates");
        m.insert("skill_builder.editor", "Editor");
        m.insert("skill_builder.preview", "Preview");
        m.insert("skill_builder.name", "Skill Name");
        m.insert("skill_builder.name_placeholder", "e.g. my-skill");
        m.insert("skill_builder.name_required", "Please enter a skill name");
        m.insert("skill_builder.description", "Description");
        m.insert("skill_builder.desc_placeholder", "What does this skill do?");
        m.insert("skill_builder.user_invocable", "User-invocable (callable via /command)");
        m.insert("skill_builder.content", "Skill Content (Markdown)");
        m.insert("skill_builder.save", "Save Skill");
        m.insert("skill_builder.saved", "Skill saved:");
        m.insert("skill_builder.trigger", "Trigger:");
        m.insert("skill_builder.preview_hint", "Select a template or start typing to see a live preview.");

        // ── Global Rules ──
        m.insert("global_rules.title", "Global Rules");
        m.insert("global_rules.subtitle", "Manage rules in ~/.claude/rules/");
        m.insert("global_rules.loading", "Loading rules");
        m.insert("global_rules.no_rules", "No global rules found");
        m.insert("global_rules.no_rules_hint", "Create .md files in ~/.claude/rules/");
        m.insert("global_rules.select_rule", "Select a rule from the list.");
        m.insert("global_rules.col_rule", "Rule");
        m.insert("global_rules.editing", "Editing:");
        m.insert("global_rules.save", "Save");
        m.insert("global_rules.saved", "Saved!");
        m.insert("global_rules.delete", "Delete");
        m.insert("global_rules.deleted", "Deleted!");

        // ── Rules Conflicts ──
        m.insert("rules.conflicts_title", "Rule Conflicts");
        m.insert("rules.conflicts_found", "Conflicts found");
        m.insert("rules.conflict_name_collision", "Name Collision");
        m.insert("rules.conflict_content_overlap", "Content Overlap");
        m.insert("rules.conflict_contradiction", "Contradiction");
        m.insert("rules.conflict_global", "Global");
        m.insert("rules.conflict_project", "Project");
        m.insert("rules.no_conflicts", "No conflicts detected");

        // ── Plans ──
        m.insert("plans.title", "Plans");
        m.insert("plans.subtitle", "Manage plan files in ~/.claude/plans/");
        m.insert("plans.loading", "Loading plans");
        m.insert("plans.no_plans", "No plans found");
        m.insert("plans.no_plans_hint", "Plans are created by Claude Code during planning.");
        m.insert("plans.select_plan", "Select a plan from the list.");
        m.insert("plans.col_plan", "Plan");
        m.insert("plans.col_modified", "Modified");
        m.insert("plans.modified", "Modified");
        m.insert("plans.plan_label", "Plan:");
        m.insert("plans.save", "Save");
        m.insert("plans.saved", "Saved!");
        m.insert("plans.delete", "Delete");
        m.insert("plans.deleted", "Deleted!");

        // ── Settings ──
        m.insert("settings.title", "Settings");
        m.insert("settings.subtitle", "Manage Claude Code settings and hooks");
        m.insert("settings.tab_overview", "Overview");
        m.insert("settings.tab_hooks", "Hook Templates");
        m.insert("settings.tab_storage", "Storage");
        m.insert("settings.loading", "Loading settings");
        m.insert("settings.hooks_title", "Hooks");
        m.insert("settings.no_hooks", "No hooks configured");
        m.insert("settings.pre_tool_use", "PreToolUse");
        m.insert("settings.post_tool_use", "PostToolUse");
        m.insert("settings.matcher", "Matcher");
        m.insert("settings.command", "Command");
        m.insert("settings.hook_templates_title", "Hook Templates");
        m.insert("settings.hook_templates_desc", "Pre-built hook configurations to add.");
        m.insert("settings.hook_templates_loading", "Loading templates");
        m.insert("settings.add_hook", "Add");
        m.insert("settings.storage_title", "Storage Usage");
        m.insert("settings.storage_loading", "Calculating storage");
        m.insert("settings.storage_total", "Total");
        m.insert("settings.storage_dir", "Directory");
        m.insert("settings.storage_size", "Size");

        // ── Permissions ──
        m.insert("permissions.title", "Permissions");
        m.insert("permissions.subtitle", "Review and manage project permissions");
        m.insert("permissions.loading", "Loading permissions");
        m.insert("permissions.no_permissions", "No permissions found");
        m.insert("permissions.col_project", "Project");
        m.insert("permissions.col_entries", "Entries");
        m.insert("permissions.col_issues", "Issues");
        m.insert("permissions.col_fragmented", "Fragmented");
        m.insert("permissions.detail_title", "Permissions");
        m.insert("permissions.detail_loading", "Loading permissions");
        m.insert("permissions.detail_col_tool", "Tool");
        m.insert("permissions.detail_col_command", "Command");
        m.insert("permissions.detail_col_status", "Status");
        m.insert("permissions.detail_fragmented", "Fragmented");
        m.insert("permissions.detail_security_issue", "Security Issue");
        m.insert("permissions.detail_delete_selected", "Delete Selected");
        m.insert("permissions.detail_deleted", "Deleted!");
        m.insert("permissions.detail_warnings_title", "Security Warnings");
        m.insert("permissions.health_title", "Config Health");
        m.insert("permissions.health_subtitle", "Health status of all projects");
        m.insert("permissions.health_loading", "Calculating health");
        m.insert("permissions.health_col_project", "Project");
        m.insert("permissions.health_col_score", "Score");
        m.insert("permissions.health_col_issues", "Issues");
        m.insert("permissions.health_avg", "Average");
        m.insert("permissions.subtitle_manage", "Manage permission allow-lists across all projects");
        m.insert("permissions.col_actions", "Actions");
        m.insert("permissions.col_security_issues", "Security Issues");
        m.insert("permissions.details", "Details");
        m.insert("permissions.detail_subtitle", "Review and prune permission entries");
        m.insert("permissions.detail_deleting", "Deleting...");
        m.insert("permissions.detail_deleted_reloading", "Deleted! Reloading...");
        m.insert("permissions.detail_delete_count", "Delete Selected");
        m.insert("permissions.detail_col_index", "#");
        m.insert("permissions.detail_fragment", "Fragment");
        m.insert("permissions.detail_ok", "OK");
        m.insert("permissions.detail_warnings_count", "Security Warnings");
        m.insert("permissions.detail_entry", "entry");
        m.insert("permissions.health_subtitle_scores", "Configuration health scores across all projects");
        m.insert("permissions.health_avg_score", "Average Health Score");
        m.insert("permissions.health_projects_analyzed", "Projects Analyzed");
        m.insert("permissions.health_no_issues", "No issues");

        // ── Analytics ──
        m.insert("analytics.title", "Analytics");
        m.insert("analytics.subtitle", "Claude Code usage statistics");
        m.insert("analytics.loading", "Loading analytics");
        m.insert("analytics.error_loading", "Error loading analytics");
        m.insert("analytics.total_sessions", "Total Sessions");
        m.insert("analytics.total_messages", "Total Messages");
        m.insert("analytics.git_commits", "Git Commits");
        m.insert("analytics.lines_added", "Lines Added");
        m.insert("analytics.lines_removed", "Lines Removed");
        m.insert("analytics.since", "since");
        m.insert("analytics.activity_heatmap", "Activity Heatmap");
        m.insert("analytics.messages", "Messages");
        m.insert("analytics.sessions", "Sessions");
        m.insert("analytics.tool_calls", "Tool Calls");
        m.insert("analytics.hourly_distribution", "Hourly Distribution");
        m.insert("analytics.model_usage", "Model Usage");
        m.insert("analytics.col_model", "Model");
        m.insert("analytics.col_input_tokens", "Input Tokens");
        m.insert("analytics.col_output_tokens", "Output Tokens");
        m.insert("analytics.col_cache_tokens", "Cache Tokens");
        m.insert("analytics.tool_ranking", "Tool Ranking");
        m.insert("analytics.col_cache_read", "Cache Read");
        m.insert("analytics.tool_usage_top10", "Tool Usage (Top 10)");
        m.insert("analytics.languages", "Languages");
        m.insert("analytics.session_outcomes", "Session Outcomes");
        m.insert("analytics.outcomes", "Outcomes");

        // ── Sessions ──
        m.insert("sessions.title", "Sessions");
        m.insert("sessions.subtitle", "Browse Claude Code session history");
        m.insert("sessions.loading", "Loading sessions");
        m.insert("sessions.search_placeholder", "Search sessions...");
        m.insert("sessions.no_sessions", "No sessions found");
        m.insert("sessions.col_project", "Project");
        m.insert("sessions.col_date", "Date");
        m.insert("sessions.col_duration", "Duration");
        m.insert("sessions.col_messages", "Messages");
        m.insert("sessions.col_summary", "Summary");
        m.insert("sessions.col_outcome", "Outcome");
        m.insert("sessions.minutes", "min");
        m.insert("sessions.load_more", "Load More");
        m.insert("sessions.detail_title", "Session Details");
        m.insert("sessions.detail_loading", "Loading session");
        m.insert("sessions.detail_project", "Project");
        m.insert("sessions.detail_start", "Start");
        m.insert("sessions.detail_duration", "Duration");
        m.insert("sessions.detail_messages", "Messages");
        m.insert("sessions.detail_tools", "Tool Calls");
        m.insert("sessions.detail_tokens", "Tokens");
        m.insert("sessions.detail_git", "Git");
        m.insert("sessions.detail_first_prompt", "First Prompt");
        m.insert("sessions.detail_summary", "Summary");
        m.insert("sessions.back", "Back");
        m.insert("sessions.searching", "Searching...");
        m.insert("sessions.search", "Search");
        m.insert("sessions.clear", "Clear");
        m.insert("sessions.search_results", "Search Results");
        m.insert("sessions.no_results", "No results found");
        m.insert("sessions.col_prompt", "Prompt");
        m.insert("sessions.session_prefix", "Session: ");
        m.insert("sessions.detail_start_time", "Start Time");
        m.insert("sessions.user_messages", " user / ");
        m.insert("sessions.assistant_messages", " assistant");
        m.insert("sessions.tokens_in", " in / ");
        m.insert("sessions.tokens_out", " out");
        m.insert("sessions.commits_label", " commits, +");
        m.insert("sessions.lines_minus", " / -");
        m.insert("sessions.tools_used", "Tools Used");
        m.insert("sessions.outcome_prefix", "Outcome: ");
        m.insert("sessions.showing", "Showing");
        m.insert("sessions.of", "of");
        m.insert("sessions.previous", "Previous");
        m.insert("sessions.next", "Next");

        // ── GitHub ──
        m.insert("github.title", "GitHub");
        m.insert("github.subtitle", "GitHub Integration Status");
        m.insert("github.loading", "Loading GitHub data");
        m.insert("github.auth_status", "Auth Status");
        m.insert("github.username", "Username");
        m.insert("github.linked_repos", "Linked Repos");
        m.insert("github.no_repos", "No linked repos");
        m.insert("github.col_repo", "Repository");
        m.insert("github.col_recent_commits", "Recent Commits");
        m.insert("github.col_open_prs", "Open PRs");

        // ── Help / System Info ──
        m.insert("help.title", "System Info");
        m.insert("help.subtitle", "Claude Code system information");
        m.insert("help.loading", "Loading system information");
        m.insert("help.account", "Account");
        m.insert("help.account_name", "Name");
        m.insert("help.account_email", "Email");
        m.insert("help.subscription", "Subscription");
        m.insert("help.claude_version", "Claude Code Version");
        m.insert("help.gh_cli", "GitHub CLI");
        m.insert("help.skill_usage", "Skill Usage");
        m.insert("help.no_skill_usage", "No skill usage recorded");
        m.insert("help.col_skill", "Skill");
        m.insert("help.col_count", "Count");
        m.insert("help.what_is_title", "What is ClaudeAdmin?");
        m.insert("help.what_is_desc", "ClaudeAdmin is the visual admin console for Claude Code. It provides a web-based interface to manage all aspects of your Claude Code configuration: Projects, Skills, Rules, Memory, Settings, Hooks, MCP Servers, and Plans.");
        m.insert("help.system_status", "System Status");
        m.insert("help.not_set", "Not set");
        m.insert("help.unknown", "Unknown");
        m.insert("help.not_found", "Not found");
        m.insert("help.not_installed", "Not installed");
        m.insert("help.concepts_title", "Claude Code Concepts");
        m.insert("help.concept_skills", "Reusable prompts with YAML frontmatter. Stored as SKILL.md files in ~/.claude/skills/ (global) or .claude/skills/ (project).");
        m.insert("help.concept_rules", "Constraints and guidelines that shape Claude's behavior. Stored as .md files in ~/.claude/rules/ or project-level.");
        m.insert("help.concept_memory", "Persistent notes per project. MEMORY.md is automatically loaded into system prompts. Stores patterns, preferences, and learnings.");
        m.insert("help.concept_hooks", "Shell commands triggered by events (PreToolUse, PostToolUse, Stop). Configured in settings.json for auto-formatting, linting, etc.");
        m.insert("help.concept_mcp", "Model Context Protocol servers extend Claude with external tools. Configured in ~/.claude.json with command, args, and env.");
        m.insert("help.concept_claudemd", "Project-level instructions file. Automatically loaded as context. Contains project conventions, stack info, and coding guidelines.");
        m.insert("help.disclaimer", "ClaudeAdmin is an independent community project. It is not affiliated with, endorsed by, or approved by Anthropic. Claude and Claude Code are trademarks of Anthropic.");

        m.insert("github.subtitle_detail", "GitHub CLI integration and linked repositories");
        m.insert("github.linked_repositories", "Linked Repositories");
        m.insert("github.no_linked_repos", "No GitHub repositories linked in ~/.claude.json");
        m.insert("github.col_name", "Name");
        m.insert("github.col_path", "Path");

        // ── Skill Browser ──
        m.insert("skill_browser.title", "Skill Browser");
        m.insert("skill_browser.subtitle", "Discover and install official and community skills");
        m.insert("skill_browser.loading", "Loading skills");
        m.insert("skill_browser.search_placeholder", "Search skills...");
        m.insert("skill_browser.no_results", "No skills found");
        m.insert("skill_browser.installed", "Installed");
        m.insert("skill_browser.install", "Install");
        m.insert("skill_browser.official", "Official");
        m.insert("skill_browser.community", "Community");
        m.insert("skill_browser.tab_official", "Official (Anthropic)");
        m.insert("skill_browser.tab_community", "Community");
        m.insert("skill_browser.install_success", "installed successfully!");
        m.insert("skill_browser.install_failed", "Failed to install:");

        // ── Docs ──
        m.insert("docs.title", "Documentation");
        m.insert("docs.subtitle", "Everything you need to know about Claude Code configuration");
        m.insert("docs.loading", "Loading documentation");

        // ── Docs: Table of Contents ──
        m.insert("docs.toc_contents", "Contents");
        m.insert("docs.toc_why_claudeadmin", "Why ClaudeAdmin?");
        m.insert("docs.toc_capabilities", "What it can & cannot do");
        m.insert("docs.toc_group", "Concepts");
        m.insert("docs.toc_claude_md", "CLAUDE.md");
        m.insert("docs.toc_rules", "Rules");
        m.insert("docs.toc_skills", "Skills");
        m.insert("docs.toc_memory", "Memory");
        m.insert("docs.toc_settings", "Settings & Hooks");
        m.insert("docs.toc_mcp", "MCP Servers");
        m.insert("docs.toc_plans", "Plans");
        m.insert("docs.toc_scopes", "Global vs. Project");
        m.insert("docs.toc_tips", "Tips & Best Practices");
        m.insert("docs.toc_links", "Official Documentation");

        // ── Docs: Shared labels ──
        m.insert("docs.tips_heading", "Tips & Tricks");
        m.insert("docs.scope_global", "Global");
        m.insert("docs.scope_project", "Project");
        m.insert("docs.scope_user", "User");
        m.insert("docs.scope_parent", "Parent");
        m.insert("docs.scope_managed", "Managed");
        m.insert("docs.scope_local", "Local");

        // ── Docs: Overview ──
        m.insert("docs.overview_heading", "Why ClaudeAdmin?");
        m.insert("docs.overview_callout", " is the central admin console for your entire Claude Code configuration. It replaces manual file editing across dozens of hidden directories with a single, visual interface.");
        m.insert("docs.overview_text1", "Claude Code stores its configuration across a complex hierarchy of files and directories: CLAUDE.md files in project roots, rules and skills scattered in ~/.claude/ subdirectories, memory files keyed by encoded project paths, settings in multiple JSON files, and MCP server configurations in ~/.claude.json. As your projects grow, managing all of this by hand becomes error-prone and time-consuming.");
        m.insert("docs.overview_text2", "ClaudeAdmin gives you:");
        m.insert("docs.overview_li_visibility_label", "Visibility");
        m.insert("docs.overview_li_visibility", " \u{2013} See all your projects, skills, rules, and memory in one place");
        m.insert("docs.overview_li_editing_label", "Editing");
        m.insert("docs.overview_li_editing", " \u{2013} Edit CLAUDE.md, rules, skills, and memory with a proper editor");
        m.insert("docs.overview_li_health_label", "Health Checks");
        m.insert("docs.overview_li_health", " \u{2013} Spot security issues in permissions, duplicated rules, and missing configs");
        m.insert("docs.overview_li_analytics_label", "Analytics");
        m.insert("docs.overview_li_analytics", " \u{2013} Understand how you use Claude Code: sessions, tokens, tools, costs");
        m.insert("docs.overview_li_advisor_label", "Advisor");
        m.insert("docs.overview_li_advisor", " \u{2013} AI-powered recommendations to improve your project configuration");

        // ── Docs: Capabilities ──
        m.insert("docs.cap_heading", "What ClaudeAdmin Can & Cannot Do");
        m.insert("docs.cap_can_heading", "What it can do");
        m.insert("docs.cap_can_1", "Browse and manage all projects registered in ~/.claude.json");
        m.insert("docs.cap_can_2", "View and edit CLAUDE.md files for any project");
        m.insert("docs.cap_can_3", "Create, edit, and delete global and project skills");
        m.insert("docs.cap_can_4", "Create, edit, and delete global and project rules");
        m.insert("docs.cap_can_5", "View and edit project memory files (MEMORY.md and topics)");
        m.insert("docs.cap_can_6", "Inspect the settings hierarchy (global \u{2192} project \u{2192} local)");
        m.insert("docs.cap_can_7", "Audit permission entries and detect security issues");
        m.insert("docs.cap_can_8", "View MCP server configurations");
        m.insert("docs.cap_can_9", "Analyze session history, token usage, and costs");
        m.insert("docs.cap_can_10", "Run AI-powered project analysis with actionable recommendations");
        m.insert("docs.cap_can_11", "Browse and install skills from community repositories");
        m.insert("docs.cap_can_12", "All writes create automatic backups in ~/.claude/backups/");
        m.insert("docs.cap_cannot_heading", "What it cannot do");
        m.insert("docs.cap_cannot_1", "Run Claude Code sessions \u{2013} it manages configuration, not execution");
        m.insert("docs.cap_cannot_2", "Modify managed policies (enterprise/organization level settings)");
        m.insert("docs.cap_cannot_3", "Access remote environments or SSH sessions");
        m.insert("docs.cap_cannot_4", "Replace the Claude Code CLI for actual coding work");
        m.insert("docs.cap_cannot_5", "Edit .claude.json MCP servers directly (read-only for safety)");
        m.insert("docs.cap_cannot_6", "Manage API keys or authentication credentials");
        m.insert("docs.cap_cannot_callout", "ClaudeAdmin is a configuration manager, not a replacement for Claude Code itself. Think of it like a database admin tool: it helps you inspect, configure, and maintain \u{2013} but the actual work happens in Claude Code.");

        // ── Docs: CLAUDE.md ──
        m.insert("docs.claudemd_callout", "The project constitution. CLAUDE.md is the most important configuration file \u{2013} it\u{2019}s automatically loaded into every Claude Code session as persistent context.");
        m.insert("docs.claudemd_how_heading", "How it works");
        m.insert("docs.claudemd_how_text", "When Claude Code starts a session, it searches for CLAUDE.md files recursively from your current working directory up to the filesystem root. All found files are loaded and concatenated, with closer files taking precedence. This means you can have a monorepo-level CLAUDE.md with shared conventions and package-level CLAUDE.md files with specific overrides.");
        m.insert("docs.claudemd_locations_heading", "Locations");
        m.insert("docs.claudemd_loc_project_or", " or ");
        m.insert("docs.claudemd_loc_parent", "Monorepo root, loaded for all subpackages");
        m.insert("docs.claudemd_loc_user", "Personal defaults across all projects");
        m.insert("docs.claudemd_whatto_heading", "What to put in it");
        m.insert("docs.claudemd_whatto_context_label", "Project context");
        m.insert("docs.claudemd_whatto_context", " \u{2013} Tech stack, architecture decisions, key dependencies");
        m.insert("docs.claudemd_whatto_standards_label", "Coding standards");
        m.insert("docs.claudemd_whatto_standards", " \u{2013} Naming conventions, formatting rules, error handling patterns");
        m.insert("docs.claudemd_whatto_workflows_label", "Workflows");
        m.insert("docs.claudemd_whatto_workflows", " \u{2013} How to build, test, deploy; branch naming; PR conventions");
        m.insert("docs.claudemd_whatto_dodont_label", "Do/Don\u{2019}t rules");
        m.insert("docs.claudemd_whatto_dodont", " \u{2013} Explicit constraints (e.g. \u{201c}never use any in TypeScript\u{201d})");
        m.insert("docs.claudemd_whatto_team_label", "Team agreements");
        m.insert("docs.claudemd_whatto_team", " \u{2013} Review process, commit message format, module boundaries");
        m.insert("docs.claudemd_tip1", "Keep it under 500 lines. Claude loads the entire file into context \u{2013} bloated CLAUDE.md files waste tokens and dilute important instructions.");
        m.insert("docs.claudemd_tip2", "Use clear section headers (## Architecture, ## Conventions). Claude parses structure to find relevant sections.");
        m.insert("docs.claudemd_tip3", "Put the most critical rules at the top. In long files, content at the beginning gets more attention.");
        m.insert("docs.claudemd_tip4", "Use CLAUDE.local.md for personal preferences that shouldn\u{2019}t be committed to git.");
        m.insert("docs.claudemd_ext_link", "Anthropic Docs: CLAUDE.md \u{2192}");

        // ── Docs: Rules ──
        m.insert("docs.rules_heading", "Rules");
        m.insert("docs.rules_callout", "Modular, thematic constraints that shape Claude\u{2019}s behavior. Unlike CLAUDE.md which is one big file, rules are separate .md files \u{2013} each focused on a specific topic.");
        m.insert("docs.rules_how_heading", "How it works");
        m.insert("docs.rules_how_text", "Rules are loaded automatically at session start. Global rules (your personal preferences) are loaded first, then project rules overlay them. This lets you define your coding style globally while projects add domain-specific constraints.");
        m.insert("docs.rules_locations_heading", "Locations");
        m.insert("docs.rules_loc_global", "Your personal rules, applied to all projects");
        m.insert("docs.rules_loc_project", "Project-specific, committed to git for team sharing");
        m.insert("docs.rules_examples_heading", "Examples");
        m.insert("docs.rules_example_frontend", " \u{2013} React component patterns, state management rules");
        m.insert("docs.rules_example_security", " \u{2013} Input validation, auth patterns, OWASP compliance");
        m.insert("docs.rules_example_testing", " \u{2013} Test structure, coverage expectations, mocking strategy");
        m.insert("docs.rules_example_rust", " \u{2013} Error handling with thiserror, module structure, naming");
        m.insert("docs.rules_tip1", "One topic per file. Don\u{2019}t mix frontend and backend rules \u{2013} smaller, focused files are easier to maintain and reuse.");
        m.insert("docs.rules_tip2", "Global rules are great for personal style preferences: preferred language, formatting tool, commit message format.");
        m.insert("docs.rules_tip3", "Project rules override global rules. If there\u{2019}s a conflict, the project-level rule wins.");
        m.insert("docs.rules_tip4", "Use ClaudeAdmin\u{2019}s Health Check to detect duplicated rules between global and project level.");
        m.insert("docs.rules_ext_link", "Anthropic Docs: Rules \u{2192}");

        // ── Docs: Skills ──
        m.insert("docs.skills_heading", "Skills");
        m.insert("docs.skills_callout", "Reusable, structured prompts with metadata. Skills are like plugins for Claude \u{2013} they can be triggered automatically by context or invoked manually via slash commands.");
        m.insert("docs.skills_how_heading", "How it works");
        m.insert("docs.skills_how_text", "Each skill lives in its own directory containing a SKILL.md file with YAML frontmatter and a markdown body. The frontmatter defines metadata like description and trigger conditions. The body contains the actual prompt instructions, examples, and reference material.");
        m.insert("docs.skills_structure_heading", "Structure");
        m.insert("docs.skills_locations_heading", "Locations");
        m.insert("docs.skills_loc_global", "Available in all projects");
        m.insert("docs.skills_loc_project", "Project-specific skills");
        m.insert("docs.skills_tip1", "Set user_invocable: true in frontmatter to make a skill callable via /skill-name in Claude Code.");
        m.insert("docs.skills_tip2", "Include concrete examples in your SKILL.md. Claude performs much better with input/output examples.");
        m.insert("docs.skills_tip3", "Use the Skill Browser in ClaudeAdmin to discover and install community skills.");
        m.insert("docs.skills_tip4", "Reference files in the skill directory are only loaded when the skill is triggered, saving tokens.");
        m.insert("docs.skills_ext_link", "Anthropic Docs: Skills \u{2192}");

        // ── Docs: Memory ──
        m.insert("docs.memory_heading", "Memory");
        m.insert("docs.memory_callout", "Claude\u{2019}s persistent knowledge base per project. Memory files store patterns, preferences, and learnings that Claude accumulates across sessions.");
        m.insert("docs.memory_how_heading", "How it works");
        m.insert("docs.memory_how_text", "Claude Code maintains a memory directory for each project, stored in ~/.claude/projects/<encoded-path>/memory/. The main file MEMORY.md has special status: its first 200 lines are loaded into the system prompt at session start. Additional topic files (debugging.md, api-conventions.md, etc.) are loaded on demand when Claude determines they\u{2019}re relevant to the current task.");
        m.insert("docs.memory_structure_heading", "Structure");
        m.insert("docs.memory_auto_heading", "Auto-Memory");
        m.insert("docs.memory_auto_text", "Claude Code can automatically add entries to memory when it discovers project patterns, debugging solutions, or your preferences. You can review and edit auto-generated memory with the /memory command in Claude Code or through ClaudeAdmin\u{2019}s Memory editor.");
        m.insert("docs.memory_tip1", "Put the most critical information in the first 200 lines of MEMORY.md \u{2013} that\u{2019}s what gets auto-loaded.");
        m.insert("docs.memory_tip2", "Use topic files for deep knowledge. They\u{2019}re only loaded when needed, keeping base token usage low.");
        m.insert("docs.memory_tip3", "Review auto-memory regularly. Claude sometimes stores overly specific one-time solutions.");
        m.insert("docs.memory_tip4", "Memory is per-project. If you switch to a different project, Claude gets a different set of memories.");
        m.insert("docs.memory_ext_link", "Anthropic Docs: Memory \u{2192}");

        // ── Docs: Settings & Hooks ──
        m.insert("docs.settings_heading", "Settings & Hooks");
        m.insert("docs.settings_heading_short", "Settings");
        m.insert("docs.settings_callout", "JSON-based configuration for behavior, permissions, and automation. Hooks let you run shell commands automatically before or after Claude uses tools.");
        m.insert("docs.settings_hierarchy_heading", "Settings Hierarchy");
        m.insert("docs.settings_hierarchy_text", "Settings follow a layered model with increasing specificity. More specific layers override less specific ones:");
        m.insert("docs.settings_managed_code", "Enterprise policies");
        m.insert("docs.settings_managed_desc", "Highest priority, set by organization (read-only)");
        m.insert("docs.settings_global_desc", "Your personal global settings");
        m.insert("docs.settings_project_desc", "Team settings, committed to git");
        m.insert("docs.settings_local_desc", "Your personal project overrides (gitignored)");
        m.insert("docs.settings_hooks_heading", "Hooks");
        m.insert("docs.settings_hooks_text", "Hooks are shell commands triggered at specific events during a Claude Code session. They\u{2019}re configured in settings.json under the hooks key.");
        m.insert("docs.settings_hooks_events", "Events:\n\u{2022} PreToolUse  \u{2013} Before Claude executes a tool (e.g. auto-format before write)\n\u{2022} PostToolUse \u{2013} After Claude executes a tool (e.g. lint after file change)\n\u{2022} Stop        \u{2013} When Claude finishes a response");
        m.insert("docs.settings_tip1", "Use PreToolUse hooks to auto-format code before Claude writes files. This ensures consistent style.");
        m.insert("docs.settings_tip2", "PostToolUse hooks are great for linting: catch issues immediately after Claude changes code.");
        m.insert("docs.settings_tip3", "ClaudeAdmin\u{2019}s Settings page shows the effective hook chain across all layers.");
        m.insert("docs.settings_ext_link", "Anthropic Docs: Settings \u{2192}");
        m.insert("docs.settings_hooks_ext_link", "Anthropic Docs: Hooks \u{2192}");

        // ── Docs: MCP Servers ──
        m.insert("docs.mcp_heading", "MCP Servers");
        m.insert("docs.mcp_callout", "Model Context Protocol servers extend Claude with external tools and data sources. They let Claude interact with databases, APIs, file systems, and other services.");
        m.insert("docs.mcp_how_heading", "How it works");
        m.insert("docs.mcp_how_text", "MCP servers are external processes that Claude Code spawns and communicates with via the MCP protocol. Each server provides a set of tools that Claude can call. Configuration lives in ~/.claude.json under the mcpServers key.");
        m.insert("docs.mcp_config_heading", "Configuration");
        m.insert("docs.mcp_management_heading", "Management in ClaudeAdmin");
        m.insert("docs.mcp_management_text", "ClaudeAdmin provides a dedicated MCP Servers page for full management: view, add, edit, and delete servers without manual JSON editing. The Health Check feature spawns each server and verifies it responds to JSON-RPC initialize and tools/list requests. Use the MCP Browser to discover and install popular servers with one click.");
        m.insert("docs.mcp_tip1", "MCP servers can also be configured per-project in .claude/settings.json.");
        m.insert("docs.mcp_tip2", "Use environment variables for secrets \u{2013} never hardcode API keys in config files.");
        m.insert("docs.mcp_tip3", "Use the MCP Browser to discover and install popular servers, or add custom ones via the New Server tab.");
        m.insert("docs.mcp_ext_link", "Anthropic Docs: MCP \u{2192}");
        m.insert("docs.mcp_spec_ext_link", "MCP Specification \u{2192}");

        // ── Docs: Plans ──
        m.insert("docs.plans_heading", "Plans");
        m.insert("docs.plans_callout", "Markdown files that Claude uses to break down complex tasks. Plans help Claude maintain focus on multi-step work and track progress.");
        m.insert("docs.plans_how_heading", "How it works");
        m.insert("docs.plans_how_text", "When Claude tackles a complex task, it can create or reference plan files stored in ~/.claude/plans/. Plans are structured markdown documents with task lists, dependencies, and status tracking. They persist across sessions, so Claude can resume where it left off.");
        m.insert("docs.plans_location_heading", "Location");
        m.insert("docs.plans_loc_global", "All plan files");
        m.insert("docs.plans_tip1", "Ask Claude to \u{201c}make a plan\u{201d} before complex refactoring. Plans reduce mistakes on multi-file changes.");
        m.insert("docs.plans_tip2", "Clean up old plans periodically. ClaudeAdmin\u{2019}s Plans page shows all stored plans with modification dates.");

        // ── Docs: Scopes ──
        m.insert("docs.scopes_heading", "Global vs. Project Scope");
        m.insert("docs.scopes_callout", "Understanding scope is key to effective Claude Code configuration. Every config type exists in two layers: global (your personal defaults) and project-specific (shared with your team).");
        m.insert("docs.scopes_overview_heading", "Scope Overview");
        m.insert("docs.scopes_col_type", "Config Type");
        m.insert("docs.scopes_col_global", "Global (User)");
        m.insert("docs.scopes_col_project", "Project");
        m.insert("docs.scopes_col_priority", "Priority");
        m.insert("docs.scopes_priority_project_global", "Project > Global");
        m.insert("docs.scopes_priority_both", "Both available");
        m.insert("docs.scopes_memory_global", "Per-project in ~/.claude/projects/");
        m.insert("docs.scopes_priority_project_keyed", "Project-keyed");
        m.insert("docs.scopes_priority_local_project_global", "Local > Project > Global");
        m.insert("docs.scopes_priority_merged", "Merged");
        m.insert("docs.scopes_when_heading", "When to use which?");
        m.insert("docs.scopes_use_global", "Use Global for");
        m.insert("docs.scopes_global_1", "Personal coding style preferences");
        m.insert("docs.scopes_global_2", "Preferred language and framework defaults");
        m.insert("docs.scopes_global_3", "Commit message format");
        m.insert("docs.scopes_global_4", "Editor/IDE integration settings");
        m.insert("docs.scopes_global_5", "MCP servers you use across all projects");
        m.insert("docs.scopes_use_project", "Use Project for");
        m.insert("docs.scopes_project_1", "Tech stack documentation and constraints");
        m.insert("docs.scopes_project_2", "Team coding conventions");
        m.insert("docs.scopes_project_3", "Domain-specific rules (security, compliance)");
        m.insert("docs.scopes_project_4", "Project-specific skills and workflows");
        m.insert("docs.scopes_project_5", "CI/CD hooks and automation");

        // ── Docs: Optimization Guide ──
        m.insert("docs.toc_optimization", "Optimization Guide");
        m.insert("docs.opt_heading", "Optimization Guide");
        m.insert("docs.opt_callout", "Personalized tips from Analytics explained in depth. Each section covers why a pattern matters and how to improve, with links to Anthropic\u{2019}s official documentation.");
        m.insert("docs.opt_why", "Why:");
        m.insert("docs.opt_how", "How:");
        m.insert("docs.opt_task_heading", "Parallel Agents with Task Tool");
        m.insert("docs.opt_task_why", "The Task tool launches specialized sub-agents that work in parallel. For complex multi-step work (research, code exploration, testing), sub-agents can run simultaneously instead of sequentially, significantly reducing total time.");
        m.insert("docs.opt_task_how", "Claude Code uses the Task tool automatically when it recognizes opportunities for parallelism. You can also explicitly ask: \u{201c}Research X and Y in parallel\u{201d} or \u{201c}Run tests while fixing the bug.\u{201d} Each agent gets its own context window, so large codebases are explored more efficiently.");
        m.insert("docs.opt_task_link", "Anthropic Docs: Best Practices \u{2192}");
        m.insert("docs.opt_hooks_heading", "Automating with Hooks");
        m.insert("docs.opt_hooks_why", "Hooks are shell commands that run automatically before or after Claude uses a tool. Without hooks, you rely on manually running formatters, linters, and tests. With hooks, every file write can auto-format, every commit can auto-test.");
        m.insert("docs.opt_hooks_how", "Configure hooks in ~/.claude/settings.json under the \u{201c}hooks\u{201d} key. Use PreToolUse to run actions before a tool executes (e.g., format code before writing). Use PostToolUse for validation after changes (e.g., lint after edit). Use Stop to run checks when Claude finishes.");
        m.insert("docs.opt_hooks_link", "Anthropic Docs: Hooks \u{2192}");
        m.insert("docs.opt_sessions_heading", "Optimal Session Length");
        m.insert("docs.opt_sessions_why", "Long sessions accumulate context that can dilute Claude\u{2019}s focus. After many messages, earlier instructions become less salient. Token costs also increase as the context window fills up with conversation history.");
        m.insert("docs.opt_sessions_how", "Break complex work into focused sessions. Use /clear to reset context within a session. For multi-step projects, use plan files (Claude writes a plan, then executes steps in focused sessions). Each fresh session starts with maximum attention on your current task.");
        m.insert("docs.opt_sessions_link", "Anthropic Docs: Best Practices \u{2192}");
        m.insert("docs.opt_cost_heading", "Cost Optimization");
        m.insert("docs.opt_cost_why", "Different Claude models have vastly different costs. Opus excels at complex reasoning but costs more per token. Haiku is fast and cheap, ideal for simple tasks. Using the right model for each task can cut costs dramatically.");
        m.insert("docs.opt_cost_how", "Use /model to switch models mid-session. Use Haiku for: quick fixes, code formatting, simple questions. Use Sonnet for: moderate coding tasks, reviews. Use Opus for: architecture design, complex debugging, multi-file refactoring. The Analytics page shows your cost breakdown by model.");
        m.insert("docs.opt_cost_link", "Anthropic Docs: Claude Code Overview \u{2192}");
        m.insert("docs.opt_write_heading", "Write vs Edit: Choosing the Right Tool");
        m.insert("docs.opt_write_why", "The Write tool creates entire files at once, while Edit makes targeted changes to existing files. For new files, Write is more efficient because Edit requires reading the file first and then specifying exact string replacements.");
        m.insert("docs.opt_write_how", "Claude generally picks the right tool automatically. But if you\u{2019}re creating new files from scratch (templates, boilerplate, configuration), explicitly saying \u{201c}create a new file\u{201d} helps Claude choose Write. For modifications to existing code, Edit is always preferred.");
        m.insert("docs.opt_models_heading", "Model Diversity");
        m.insert("docs.opt_models_why", "Using a single model for all tasks means either overpaying for simple work (Opus for everything) or under-powering complex tasks (Haiku for everything). Each model family has strengths: Haiku for speed, Sonnet for balance, Opus for deep reasoning.");
        m.insert("docs.opt_models_how", "Switch models with the /model command. A good pattern: start with Opus for planning and architecture, switch to Sonnet for implementation, use Haiku for quick fixes and formatting. The Analytics page shows which model you use most.");
        m.insert("docs.opt_models_link", "Anthropic Docs: Claude Code Overview \u{2192}");
        m.insert("docs.opt_git_heading", "Git Integration");
        m.insert("docs.opt_git_why", "Claude Code can stage, commit, push, and create PRs directly. Without git integration, you manually commit after every Claude session, which breaks the flow and risks forgetting to commit important changes.");
        m.insert("docs.opt_git_how", "Simply ask Claude to commit: \u{201c}commit these changes\u{201d} or use /commit. Claude writes descriptive commit messages, stages only relevant files, and respects pre-commit hooks. For PRs, ask Claude to \u{201c}create a PR\u{201d} \u{2013} it uses the gh CLI to push and open a pull request with a summary.");
        m.insert("docs.opt_git_link", "Anthropic Docs: Best Practices \u{2192}");
        m.insert("docs.opt_churn_heading", "Reducing Code Churn");
        m.insert("docs.opt_churn_why", "When more lines are deleted than added, it usually means Claude wrote code that had to be rewritten. This wastes tokens and time. Common causes: vague prompts, missing context, or Claude guessing at requirements.");
        m.insert("docs.opt_churn_how", "Be specific in prompts: reference existing files, name exact functions, describe expected behavior. Use CLAUDE.md to document conventions so Claude doesn\u{2019}t guess. For complex changes, ask Claude to plan first (/plan) before implementing. Review Claude\u{2019}s plan before it starts coding.");
        m.insert("docs.opt_churn_link", "Anthropic Docs: Best Practices \u{2192}");

        // ── Docs: Tips & Best Practices ──
        m.insert("docs.bestpractices_heading", "Tips & Best Practices");
        m.insert("docs.bestpractices_hygiene_heading", "Configuration Hygiene");
        m.insert("docs.bestpractices_hygiene_1", "Run ClaudeAdmin\u{2019}s Config Health check regularly. It detects duplicated rules, bloated permission lists, and missing CLAUDE.md files.");
        m.insert("docs.bestpractices_hygiene_2", "Don\u{2019}t repeat yourself: if a rule exists globally, don\u{2019}t copy it into project CLAUDE.md. Use the scope system.");
        m.insert("docs.bestpractices_hygiene_3", "Keep permission lists clean. Over time, Claude Code accumulates hundreds of allow/deny entries. Use the Permissions page to prune them.");
        m.insert("docs.bestpractices_tokens_heading", "Token Efficiency");
        m.insert("docs.bestpractices_tokens_1", "Everything in CLAUDE.md, rules, skills (when triggered), and the first 200 lines of MEMORY.md counts against your context window. Be concise.");
        m.insert("docs.bestpractices_tokens_2", "Move detailed reference material into skill reference files or memory topic files \u{2013} they\u{2019}re only loaded when needed.");
        m.insert("docs.bestpractices_tokens_3", "Use the Analytics page to monitor your token usage across projects and sessions.");
        m.insert("docs.bestpractices_team_heading", "Team Collaboration");
        m.insert("docs.bestpractices_team_1", "Commit .claude/rules/ and .claude/skills/ to git. This shares conventions across the team.");
        m.insert("docs.bestpractices_team_2", "Use .claude/settings.json for team settings and .claude/settings.local.json for personal overrides.");
        m.insert("docs.bestpractices_team_3", "CLAUDE.md in the project root is your team\u{2019}s contract with Claude. Treat it like documentation \u{2013} review changes in PRs.");
        m.insert("docs.bestpractices_debug_heading", "Debugging Claude Behavior");
        m.insert("docs.bestpractices_debug_1", "If Claude ignores a rule, check the Settings Hierarchy page for conflicting settings across layers.");
        m.insert("docs.bestpractices_debug_2", "Memory can cause unexpected behavior. Review auto-generated entries \u{2013} Claude may have memorized a workaround instead of the correct approach.");
        m.insert("docs.bestpractices_debug_3", "Use the Sessions page to review past conversations and understand what Claude was \u{201c}thinking\u{201d}.");

        // ── Docs: Links ──
        m.insert("docs.links_heading", "Official Anthropic Documentation");
        m.insert("docs.links_text", "These links point to the authoritative documentation maintained by Anthropic. ClaudeAdmin is built on top of these specifications.");
        m.insert("docs.link_overview_title", "Claude Code Overview");
        m.insert("docs.link_overview_desc", "Getting started, installation, and basic usage");
        m.insert("docs.link_memory_title", "Memory & CLAUDE.md");
        m.insert("docs.link_memory_desc", "How Claude stores and uses project memory");
        m.insert("docs.link_skills_title", "Skills");
        m.insert("docs.link_skills_desc", "Creating and managing reusable skills");
        m.insert("docs.link_settings_title", "Settings");
        m.insert("docs.link_settings_desc", "Configuration hierarchy and options");
        m.insert("docs.link_hooks_title", "Hooks");
        m.insert("docs.link_hooks_desc", "Event-driven automation with shell commands");
        m.insert("docs.link_mcp_title", "MCP Servers");
        m.insert("docs.link_mcp_desc", "Extending Claude with external tools");
        m.insert("docs.link_bestpractices_title", "Best Practices");
        m.insert("docs.link_bestpractices_desc", "Tips for effective Claude Code usage");
        m.insert("docs.link_mcp_spec_title", "MCP Specification");
        m.insert("docs.link_mcp_spec_desc", "The Model Context Protocol standard");

        // ── Licenses ──
        m.insert("sidebar.licenses", "Licenses");
        m.insert("licenses.title", "Licenses");
        m.insert("licenses.subtitle", "Open source licenses and dependencies");
        m.insert("licenses.own_license", "ClaudeAdmin License");
        m.insert("licenses.third_party", "Third-Party Dependencies");
        m.insert("licenses.col_name", "Crate");
        m.insert("licenses.col_version", "Version");
        m.insert("licenses.col_license", "License");
        m.insert("licenses.search_placeholder", "Search dependencies...");
        m.insert("licenses.loading", "Loading licenses");
        m.insert("licenses.count", "dependencies");
        m.insert("licenses.mit_copyright", "Copyright (c) 2024-2026");
        m.insert("licenses.mit_line1", "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \u{201c}Software\u{201d}), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:");
        m.insert("licenses.mit_line2", "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.");
        m.insert("licenses.mit_line3", "THE SOFTWARE IS PROVIDED \u{201c}AS IS\u{201d}, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.");
        m.insert("licenses.direct_deps", "Direct Dependencies");
        m.insert("licenses.transitive_deps", "Transitive Dependencies");
        m.insert("licenses.overview", "License Overview");
        m.insert("licenses.direct_count", "direct");
        m.insert("licenses.transitive_count", "transitive dependencies");

        // ── Components ──
        m.insert("component.modal.close", "Close");
        m.insert("component.editor.save", "Save");
        m.insert("component.editor.saved", "Saved!");
        m.insert("component.json_editor.valid", "Valid JSON");
        m.insert("component.json_editor.invalid", "Invalid JSON");
        m.insert("component.frontmatter.description", "Description");
        m.insert("component.frontmatter.user_invocable", "User-invocable");
        m.insert("component.advisor.title", "Project Advisor");
        m.insert("component.advisor.analyze", "Analyze");
        m.insert("component.advisor.analyzing", "Analyzing...");
        m.insert("component.advisor.no_api_key", "No ANTHROPIC_API_KEY configured");
        m.insert("component.advisor.error", "Error loading recommendations");
        m.insert("component.advisor.summary", "Summary");
        m.insert("component.advisor.recommendations", "Recommendations");
        m.insert("component.advisor.apply", "Apply");
        m.insert("component.advisor.applied", "Done!");
        m.insert("component.advisor.analyze_project", "Analyze Project");
        m.insert("component.advisor.hint", "Claude analyzes your project and provides recommendations");
        m.insert("component.advisor.loading", "Claude is analyzing your project");
        m.insert("component.advisor.assessment", "Project Assessment");
        m.insert("component.advisor.show_preview", "Show Preview");
        m.insert("component.advisor.category_tip", "Tip");
        m.insert("component.frontmatter.user_invocable_label", "User Invocable (can be called with /command)");
        m.insert("component.editor.saving", "Saving...");

        // ── Backups ──
        m.insert("sidebar.backups", "Backups");
        m.insert("backups.title", "Backups");
        m.insert("backups.subtitle", "Browse and restore configuration backups");
        m.insert("backups.loading", "Loading backups");
        m.insert("backups.no_backups", "No backups found");
        m.insert("backups.col_name", "Backup");
        m.insert("backups.col_size", "Size");
        m.insert("backups.col_created", "Created");
        m.insert("backups.col_original", "Original File");
        m.insert("backups.col_actions", "Actions");
        m.insert("backups.restore", "Restore");
        m.insert("backups.delete", "Delete");
        m.insert("backups.restored", "Restored!");
        m.insert("backups.deleted", "Deleted!");
        m.insert("backups.confirm_restore", "Are you sure you want to restore this backup? The current file will be backed up first.");
        m.insert("backups.confirm_delete", "Are you sure you want to delete this backup?");

        // ── Export/Import ──
        m.insert("settings.tab_export", "Export/Import");
        m.insert("settings.export_title", "Configuration Export");
        m.insert("settings.export_desc", "Export all global configuration as a JSON bundle.");
        m.insert("settings.export_btn", "Export Configuration");
        m.insert("settings.export_loading", "Exporting...");
        m.insert("settings.import_title", "Configuration Import");
        m.insert("settings.import_desc", "Import a previously exported configuration bundle.");
        m.insert("settings.import_btn", "Import Configuration");
        m.insert("settings.import_success", "Import successful!");
        m.insert("settings.import_skills", "Skills imported");
        m.insert("settings.import_rules", "Rules imported");
        m.insert("settings.import_mcp", "MCP servers imported");

        // ── Search ──
        m.insert("sidebar.search", "Search");
        m.insert("search.title", "Search");
        m.insert("search.subtitle", "Search across all configuration");
        m.insert("search.placeholder", "Search skills, rules, settings...");
        m.insert("search.loading", "Searching...");
        m.insert("search.no_results", "No results found");
        m.insert("search.col_type", "Type");
        m.insert("search.col_name", "Name");
        m.insert("search.col_snippet", "Match");

        // ── Templates ──
        m.insert("sidebar.templates", "Templates");
        m.insert("templates.title", "Config Templates");
        m.insert("templates.subtitle", "Pre-built configuration starter packs");
        m.insert("templates.loading", "Loading templates");
        m.insert("templates.apply", "Apply");
        m.insert("templates.applied", "Applied!");
        m.insert("templates.confirm", "Apply this template? It will create rules in your global config.");

        // ── Theme ──
        m.insert("theme.toggle", "Toggle theme");
        m.insert("theme.light", "Light");
        m.insert("theme.dark", "Dark");

        // ── Hook Events (extended) ──
        m.insert("settings.notification", "Notification");
        m.insert("settings.stop", "Stop");
        m.insert("settings.user_prompt_submit", "UserPromptSubmit");
        m.insert("settings.session_start", "SessionStart");

        // ── Common ──
        m.insert("common.error", "Error");
        m.insert("common.loading", "Loading");
        m.insert("common.save", "Save");
        m.insert("common.delete", "Delete");
        m.insert("common.cancel", "Cancel");
        m.insert("common.close", "Close");
        m.insert("common.yes", "Yes");
        m.insert("common.no", "No");
        m.insert("common.ok", "OK");
        m.insert("common.error_prefix", "Error: ");
        m.insert("common.invalid_json", "Invalid JSON: ");

        // -- Hardcoded string translations --
        m.insert("backups.prune", "Prune Old Backups");
        m.insert("backups.prune_confirm", "Delete backups older than 30 days?");
        m.insert("mcp.confirm_delete_title", "Delete MCP Server");
        m.insert("mcp.confirm_delete_msg", "Are you sure you want to delete this MCP server? This action cannot be undone.");
        m.insert("mcp.add.name_placeholder_short", "e.g. my-server");
        m.insert("mcp.health.ok_format", "OK \u{2013} {tools} Tools, {ms}ms");
        m.insert("backups.confirm_delete_title", "Delete Backup");
        m.insert("backups.confirm_delete_msg", "Are you sure you want to delete this backup? This action cannot be undone.");
        m.insert("permissions.confirm_delete_title", "Delete Permission Entries");
        m.insert("permissions.confirm_delete_msg", "Are you sure you want to delete the selected permission entries? This action cannot be undone.");
        m.insert("sessions.no_transcript", "No transcript data available.");
        m.insert("sessions.loading_transcript", "Loading transcript...");
        m.insert("analytics.filter", "Filter:");
        m.insert("analytics.to", "to");
        m.insert("analytics.clear", "Clear");
        m.insert("analytics.export_csv", "Export CSV");
        m.insert("analytics.export_json", "Export JSON");
        m.insert("analytics.tips_title", "Insights & Tips");
        m.insert("analytics.tips_dismiss", "Dismiss");
        m.insert("analytics.tips_learn_more", "Learn more");
        m.insert("analytics.tip_category_tool", "Tool");
        m.insert("analytics.tip_category_workflow", "Workflow");
        m.insert("analytics.tip_category_performance", "Performance");
        m.insert("analytics.tip_category_config", "Config");
        m.insert("analytics.no_tips", "No tips available");
        m.insert("analytics.est_cost", "Est. Cost");
        m.insert("settings.timeout", "Timeout");
        m.insert("component.confirm.cancel", "Cancel");
        m.insert("component.editor.undo_tooltip", "Undo (Ctrl+Z)");
        m.insert("component.editor.redo_tooltip", "Redo (Ctrl+Shift+Z)");
        m.insert("component.markdown.toggle_preview", "Toggle Preview");
        m.insert("component.markdown.edit", "Edit");
        m.insert("component.markdown.preview", "Preview");
        m.insert("component.markdown.preview_unavailable", "Preview unavailable");
        m.insert("component.onboarding.title", "Getting Started with Claude Code");
        m.insert("component.onboarding.dismiss", "Dismiss");
        m.insert("component.onboarding.step1_title", "Create a CLAUDE.md");
        m.insert("component.onboarding.step1_desc", "Add project instructions to guide Claude's behavior.");
        m.insert("component.onboarding.step1_link", "Go to Projects");
        m.insert("component.onboarding.step2_title", "Add a Rule");
        m.insert("component.onboarding.step2_desc", "Create coding conventions or constraints.");
        m.insert("component.onboarding.step2_link", "Go to Rules");
        m.insert("component.onboarding.step3_title", "Install a Skill");
        m.insert("component.onboarding.step3_desc", "Browse and install reusable skills.");
        m.insert("component.onboarding.step3_link", "Skill Browser");

        // ── Sidebar New ──
        m.insert("sidebar.agents", "Agents");
        m.insert("sidebar.plugins", "Plugins");
        m.insert("sidebar.launch_profiles", "Launch Profiles");
        m.insert("sidebar.system_prompts", "System Prompts");
        m.insert("sidebar.worktrees", "Worktrees");

        // ── Agents ──
        m.insert("agents.title", "Agents");
        m.insert("agents.subtitle", "Define and manage custom Claude agents");
        m.insert("agents.tab_overview", "Overview");
        m.insert("agents.tab_create", "Create");
        m.insert("agents.loading", "Loading agents...");
        m.insert("agents.empty", "No agents defined yet. Create custom agents with specific prompts and tool configurations.");
        m.insert("agents.name", "Name");
        m.insert("agents.description", "Description");
        m.insert("agents.prompt", "Prompt");
        m.insert("agents.model", "Model");
        m.insert("agents.allowed_tools", "Allowed Tools");
        m.insert("agents.disallowed_tools", "Disallowed Tools");
        m.insert("agents.custom_instructions", "Custom Instructions");
        m.insert("agents.source", "Source");
        m.insert("agents.create_success", "Agent created successfully");
        m.insert("agents.update_success", "Agent updated successfully");
        m.insert("agents.delete_confirm", "Delete this agent?");
        m.insert("agents.delete_success", "Agent deleted");
        m.insert("agents.copy_cli", "Copy CLI flag");
        m.insert("agents.copied", "Copied to clipboard!");

        // ── Plugins ──
        m.insert("plugins.title", "Plugins");
        m.insert("plugins.subtitle", "Manage Claude Code plugins");
        m.insert("plugins.loading", "Loading plugins...");
        m.insert("plugins.empty", "No plugins installed. Plugins extend Claude Code with custom tools and capabilities.");
        m.insert("plugins.name", "Name");
        m.insert("plugins.version", "Version");
        m.insert("plugins.path", "Path");
        m.insert("plugins.status", "Status");
        m.insert("plugins.enabled", "Enabled");
        m.insert("plugins.disabled", "Disabled");
        m.insert("plugins.install", "Install Plugin");
        m.insert("plugins.install_path", "Plugin directory path");
        m.insert("plugins.install_success", "Plugin installed successfully");
        m.insert("plugins.delete_confirm", "Remove this plugin?");
        m.insert("plugins.delete_success", "Plugin removed");

        // ── Launch Profiles ──
        m.insert("launch_profiles.title", "Launch Profiles");
        m.insert("launch_profiles.subtitle", "Reusable CLI configurations for different workflows");
        m.insert("launch_profiles.tab_profiles", "Profiles");
        m.insert("launch_profiles.tab_create", "Create");
        m.insert("launch_profiles.tab_presets", "Presets");
        m.insert("launch_profiles.loading", "Loading profiles...");
        m.insert("launch_profiles.empty", "No launch profiles yet. Create reusable CLI configurations combining model, effort, tools, and budget settings.");
        m.insert("launch_profiles.name", "Name");
        m.insert("launch_profiles.description", "Description");
        m.insert("launch_profiles.model", "Model");
        m.insert("launch_profiles.effort", "Effort Level");
        m.insert("launch_profiles.permission_mode", "Permission Mode");
        m.insert("launch_profiles.allowed_tools", "Allowed Tools");
        m.insert("launch_profiles.disallowed_tools", "Disallowed Tools");
        m.insert("launch_profiles.system_prompt", "System Prompt");
        m.insert("launch_profiles.append_system_prompt", "Append System Prompt");
        m.insert("launch_profiles.max_budget", "Max Budget (USD)");
        m.insert("launch_profiles.fallback_model", "Fallback Model");
        m.insert("launch_profiles.debug_filter", "Debug Filter");
        m.insert("launch_profiles.add_dirs", "Additional Directories");
        m.insert("launch_profiles.copy_command", "Copy CLI Command");
        m.insert("launch_profiles.copied", "Copied!");
        m.insert("launch_profiles.create_success", "Profile created successfully");
        m.insert("launch_profiles.delete_confirm", "Delete this profile?");
        m.insert("launch_profiles.delete_success", "Profile deleted");
        m.insert("launch_profiles.use_template", "Use as Template");
        m.insert("launch_profiles.preset_code_review", "Code Review");
        m.insert("launch_profiles.preset_code_review_desc", "Sonnet model, plan mode, read-only tools, low budget");
        m.insert("launch_profiles.preset_full_dev", "Full Dev");
        m.insert("launch_profiles.preset_full_dev_desc", "Opus model, high effort, all tools, default permissions");
        m.insert("launch_profiles.preset_quick_fix", "Quick Fix");
        m.insert("launch_profiles.preset_quick_fix_desc", "Haiku model, medium effort, Bash + Edit + Read only");
        m.insert("launch_profiles.preset_research", "Research");
        m.insert("launch_profiles.preset_research_desc", "Opus model, high effort, web + read tools, plan mode");
        m.insert("launch_profiles.preset_budget", "Budget Conscious");
        m.insert("launch_profiles.preset_budget_desc", "Sonnet model, low effort, $1 budget limit");

        // ── System Prompts ──
        m.insert("system_prompts.title", "System Prompts");
        m.insert("system_prompts.subtitle", "Create and manage reusable system prompts");
        m.insert("system_prompts.tab_library", "Library");
        m.insert("system_prompts.tab_create", "Create");
        m.insert("system_prompts.loading", "Loading system prompts...");
        m.insert("system_prompts.empty", "No system prompts yet. Create reusable prompts for different use cases.");
        m.insert("system_prompts.name", "Name");
        m.insert("system_prompts.content", "Content");
        m.insert("system_prompts.modified", "Modified");
        m.insert("system_prompts.create_success", "System prompt created successfully");
        m.insert("system_prompts.update_success", "System prompt updated");
        m.insert("system_prompts.delete_confirm", "Delete this system prompt?");
        m.insert("system_prompts.delete_success", "System prompt deleted");
        m.insert("system_prompts.copy_cli", "Copy CLI flag");
        m.insert("system_prompts.copied", "Copied!");
        m.insert("system_prompts.use_template", "Use Template");
        m.insert("system_prompts.template_reviewer", "Code Reviewer");
        m.insert("system_prompts.template_docs", "Documentation Writer");
        m.insert("system_prompts.template_security", "Security Auditor");
        m.insert("system_prompts.template_refactor", "Refactoring Expert");

        // ── Worktrees ──
        m.insert("worktrees.title", "Worktrees");
        m.insert("worktrees.subtitle", "Manage git worktrees across your projects");
        m.insert("worktrees.loading", "Loading worktrees...");
        m.insert("worktrees.empty", "No active worktrees found. Worktrees allow parallel development on multiple branches.");
        m.insert("worktrees.project_path", "Project Path");
        m.insert("worktrees.branch_name", "Branch Name (optional)");
        m.insert("worktrees.create", "Create Worktree");
        m.insert("worktrees.create_success", "Worktree created successfully");
        m.insert("worktrees.delete_confirm", "Remove this worktree?");
        m.insert("worktrees.delete_success", "Worktree removed");
        m.insert("worktrees.col_branch", "Branch");
        m.insert("worktrees.col_path", "Path");
        m.insert("worktrees.col_head", "HEAD");
        m.insert("worktrees.col_status", "Status");
        m.insert("worktrees.col_actions", "Actions");
        m.insert("worktrees.badge_main", "main");
        m.insert("worktrees.badge_bare", "bare");
        m.insert("worktrees.badge_worktree", "worktree");

        // ── Agents (form fields) ──
        m.insert("agents.field_name", "Name");
        m.insert("agents.field_description", "Description");
        m.insert("agents.field_prompt", "Prompt");
        m.insert("agents.field_model", "Model");
        m.insert("agents.field_allowed_tools", "Allowed Tools");
        m.insert("agents.field_disallowed_tools", "Disallowed Tools");
        m.insert("agents.field_custom_instructions", "Custom Instructions");
        m.insert("agents.tools_hint", "Comma-separated list, e.g. Bash, Edit, Read");
        m.insert("agents.tools_placeholder", "Bash, Edit, Read, Write...");
        m.insert("agents.create_btn", "Create Agent");
        m.insert("agents.editing", "Editing");
        m.insert("agents.save_success", "Agent updated successfully");
        m.insert("agents.confirm_delete", "Delete agent");
        m.insert("agents.name_required", "Name is required");
        m.insert("agents.model_default", "Default (inherit)");
        m.insert("agents.name_placeholder", "e.g. code-reviewer");
        m.insert("agents.desc_placeholder", "What does this agent do?");
        m.insert("agents.prompt_placeholder", "You are a code reviewer...");
        m.insert("agents.instructions_placeholder", "Additional instructions...");

        // ── Plugins (missing) ──
        m.insert("plugins.actions", "Actions");

        // ── Launch Profiles (missing) ──
        m.insert("launch_profiles.save_btn", "Create Profile");

        // ── Common (missing) ──
        m.insert("common.edit", "Edit");
        m.insert("common.saved", "Saved");

        // ── Timeline ──
        m.insert("sidebar.timeline", "Timeline");
        m.insert("timeline.title", "Timeline");
        m.insert("timeline.subtitle", "Git-based version history of your Claude configuration");
        m.insert("timeline.files", "files");
        m.insert("timeline.restore", "Restore");
        m.insert("timeline.confirm_restore_title", "Restore Configuration");
        m.insert("timeline.confirm_restore_msg", "This will restore all files to the selected commit. A backup of the current state will be saved first. Continue?");
        m.insert("timeline.empty", "No timeline entries yet. Changes will appear here as you edit your configuration.");
        m.insert("timeline.error", "Failed to load timeline");
        m.insert("timeline.select_commit", "Select a commit to view its changes");
        m.insert("timeline.diff_for", "Changes in");

        // ── Effective Config ──
        m.insert("effective.total_rules", "Total Rules");
        m.insert("effective.total_skills", "Total Skills");
        m.insert("effective.mcp_servers", "MCP Servers");
        m.insert("effective.hooks", "Hooks");
        m.insert("effective.memory_files", "Memory Files");
        m.insert("effective.inherited", "Inherited");
        m.insert("effective.own", "Own");
        m.insert("effective.rules", "Rules");
        m.insert("effective.skills", "Skills");
        m.insert("effective.conflicts", "Conflicts");
        m.insert("effective.none", "None");
        m.insert("effective.invocable", "Invocable");

        // ── Help Chat ──
        m.insert("help_chat.title", "Help");
        m.insert("help_chat.placeholder", "Ask about this page...");
        m.insert("help_chat.send", "Send");
        m.insert("help_chat.thinking", "Thinking...");
        m.insert("help_chat.clear", "New conversation");
        m.insert("help_chat.no_api_key", "API key required for help chat. Configure in Settings.");

        m
    })
}
