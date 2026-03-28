use std::collections::HashMap;
use std::sync::OnceLock;

static TRANSLATIONS: OnceLock<HashMap<&'static str, &'static str>> = OnceLock::new();

pub fn translations() -> &'static HashMap<&'static str, &'static str> {
    TRANSLATIONS.get_or_init(|| {
        let mut m = HashMap::new();

        // ── App ──
        m.insert("app.title", "ClaudeAdmin");
        m.insert("app.subtitle", "配置管理器");

        // ── Sidebar ──
        m.insert("sidebar.overview", "概览");
        m.insert("sidebar.dashboard", "仪表板");
        m.insert("sidebar.analytics", "数据分析");
        m.insert("sidebar.manage", "管理");
        m.insert("sidebar.projects", "项目");
        m.insert("sidebar.global_skills", "全局 Skills");
        m.insert("sidebar.skill_browser", "Skill 浏览器");
        m.insert("sidebar.global_rules", "全局规则");
        m.insert("sidebar.plans", "计划");
        m.insert("sidebar.mcp_servers", "MCP 服务器");
        m.insert("sidebar.mcp_browser", "MCP 浏览器");
        m.insert("sidebar.security", "安全");
        m.insert("sidebar.permissions", "权限");
        m.insert("sidebar.config_health", "配置健康");
        m.insert("sidebar.system", "系统");
        m.insert("sidebar.settings", "设置");
        m.insert("sidebar.sessions", "会话");
        m.insert("sidebar.github", "GitHub");
        m.insert("sidebar.learn", "学习");
        m.insert("sidebar.docs", "文档");
        m.insert("sidebar.help", "系统信息");

        // ── Dashboard ──
        m.insert("dashboard.title", "仪表板");
        m.insert("dashboard.subtitle", "Claude Code 配置概览");
        m.insert("dashboard.projects", "项目");
        m.insert("dashboard.global_skills", "全局 Skills");
        m.insert("dashboard.global_rules", "全局规则");
        m.insert("dashboard.mcp_servers", "MCP 服务器");
        m.insert("dashboard.plans", "计划");
        m.insert("dashboard.config_health", "配置健康");
        m.insert("dashboard.recent_projects", "最近项目");
        m.insert("dashboard.recent_changes", "最近更改");
        m.insert("dashboard.no_recent_changes", "没有最近的更改");
        m.insert("dashboard.change_action", "操作");
        m.insert("dashboard.change_resource", "资源");
        m.insert("dashboard.change_time", "时间");
        m.insert("dashboard.loading", "加载中");
        m.insert("dashboard.error_loading", "加载仪表板时出错");
        m.insert("dashboard.col_name", "名称");
        m.insert("dashboard.col_claude_md", "CLAUDE.md");
        m.insert("dashboard.col_skills", "Skills");
        m.insert("dashboard.col_rules", "规则");
        m.insert("dashboard.col_memory", "记忆");
        m.insert("dashboard.yes", "是");

        // ── MCP ──
        m.insert("mcp.title", "MCP 服务器");
        m.insert("mcp.subtitle", "管理 Claude Code 的 Model Context Protocol 服务器");
        m.insert("mcp.tab_servers", "服务器");
        m.insert("mcp.tab_health", "健康检查");
        m.insert("mcp.tab_add", "新建服务器");
        m.insert("mcp.tab_browse", "浏览目录");
        m.insert("mcp.loading", "加载 MCP 服务器中");
        m.insert("mcp.no_servers", "未配置 MCP 服务器");
        m.insert("mcp.no_servers_hint", "使用\u{201c}新建服务器\u{201d}标签页或 MCP 浏览器添加服务器。");
        m.insert("mcp.select_server", "从列表中选择一个服务器以查看和编辑其配置。");
        m.insert("mcp.no_servers_configured", "未配置服务器。");
        m.insert("mcp.check_health", "检查健康");
        m.insert("mcp.save", "保存");
        m.insert("mcp.delete", "删除");
        m.insert("mcp.saved", "已保存！");
        m.insert("mcp.deleted", "已删除！");
        m.insert("mcp.read_only", "只读");
        m.insert("mcp.read_only_hint", "此服务器由外部管理，无法在此编辑。");
        m.insert("mcp.health.title", "MCP 服务器健康状态");
        m.insert("mcp.health.check_all", "检查所有服务器");
        m.insert("mcp.health.checking", "检查中...");
        m.insert("mcp.health.description", "启动每个 MCP 服务器进程，发送 JSON-RPC initialize + tools/list 请求，并报告结果。每台服务器超时时间：10 秒。");
        m.insert("mcp.health.col_name", "名称");
        m.insert("mcp.health.col_source", "来源");
        m.insert("mcp.health.col_status", "状态");
        m.insert("mcp.health.col_server_info", "服务器信息");
        m.insert("mcp.health.col_tools", "工具");
        m.insert("mcp.health.col_duration", "耗时");
        m.insert("mcp.health.running", "运行中");
        m.insert("mcp.health.error", "错误");
        m.insert("mcp.health.timeout", "超时");
        m.insert("mcp.health.unsupported", "不支持");
        m.insert("mcp.health.unknown", "未知");
        m.insert("mcp.add.title", "添加 MCP 服务器");
        m.insert("mcp.add.description", "将新的 MCP 服务器添加到全局 ~/.claude.json 配置中。");
        m.insert("mcp.add.name_label", "服务器名称");
        m.insert("mcp.add.name_placeholder", "例如 my-server");
        m.insert("mcp.add.config_label", "服务器配置 (JSON)");
        m.insert("mcp.add.mode_form", "表单");
        m.insert("mcp.add.mode_json", "高级 JSON");
        m.insert("mcp.add.command_label", "命令");
        m.insert("mcp.add.args_label", "参数");
        m.insert("mcp.add.args_hint", "每行一个参数");
        m.insert("mcp.add.env_label", "环境变量");
        m.insert("mcp.add.env_hint", "KEY=VALUE 格式，每行一个");
        m.insert("mcp.add.submit", "添加服务器");
        m.insert("mcp.add.name_required", "请输入服务器名称");
        m.insert("mcp.browse.title", "MCP 服务器目录");
        m.insert("mcp.browse.description", "浏览热门 MCP 服务器，一键安装。安装前可查看配置。");
        m.insert("mcp.browse.installed", "已安装");
        m.insert("mcp.browse.install", "安装");
        m.insert("mcp.browse.show_config", "显示配置");
        m.insert("mcp.browse.hide_config", "隐藏配置");
        m.insert("mcp.browse.config_hint", "安装前检查并编辑配置。填写所需的 API 密钥和路径。");
        m.insert("mcp.browse.cat_system", "系统与文件");
        m.insert("mcp.browse.cat_database", "数据库");
        m.insert("mcp.browse.cat_api", "API");
        m.insert("mcp.browse.cat_specialized", "专业工具");
        m.insert("mcp.browse.npm", "npm");
        m.insert("mcp.source.claude_code", "Claude Code");
        m.insert("mcp.source.claude_desktop", "Claude Desktop");

        // ── MCP Tools (Feature 7) ──
        m.insert("mcp.tab_tools", "工具浏览器");
        m.insert("mcp.tools.title", "工具浏览器");
        m.insert("mcp.tools.description", "所有 MCP 服务器的所有工具");
        m.insert("mcp.tools.search", "搜索工具...");
        m.insert("mcp.tools.parameters", "参数 (JSON Schema)");
        m.insert("mcp.tools.required", "必填");
        m.insert("mcp.tools.no_tools", "未找到工具。请先运行健康检查。");
        m.insert("mcp.tools.from_server", "来自");

        // ── MCP Browser ──
        m.insert("mcp_browser.title", "MCP 浏览器");
        m.insert("mcp_browser.subtitle", "发现并安装 Claude Code 的 MCP 服务器");
        m.insert("mcp_browser.search_placeholder", "搜索 MCP 服务器...");
        m.insert("mcp_browser.loading", "加载 MCP 目录中");
        m.insert("mcp_browser.no_results", "未找到 MCP 服务器");
        m.insert("mcp_browser.installed", "已安装");
        m.insert("mcp_browser.install", "安装");
        m.insert("mcp_browser.needs_api_key", "需要 API 密钥");
        m.insert("mcp_browser.install_success", "安装成功！");
        m.insert("mcp_browser.install_failed", "安装失败");

        // ── Projects ──
        m.insert("projects.tab_projects", "项目");
        m.insert("projects.tab_health", "健康概览");
        m.insert("projects.title", "项目");
        m.insert("projects.subtitle", "所有在 ~/.claude.json 中注册的项目");
        m.insert("projects.loading", "加载中");
        m.insert("projects.error_loading", "加载项目时出错：");
        m.insert("projects.col_name", "名称");
        m.insert("projects.col_path", "路径");
        m.insert("projects.col_claude_md", "CLAUDE.md");
        m.insert("projects.col_skills", "Skills");
        m.insert("projects.col_rules", "规则");
        m.insert("projects.col_memory", "记忆");
        m.insert("projects.yes", "是");

        // ── Project Detail ──
        m.insert("project_detail.loading", "加载项目详情中");
        m.insert("project_detail.error_loading", "加载项目时出错");
        m.insert("project_detail.tab_advisor", "顾问");
        m.insert("project_detail.tab_claude_md", "CLAUDE.md");
        m.insert("project_detail.tab_skills", "Skills");
        m.insert("project_detail.tab_rules", "规则");
        m.insert("project_detail.tab_memory", "记忆");
        m.insert("project_detail.tab_permissions", "权限");
        m.insert("project_detail.tab_effective", "有效配置");
        m.insert("project_detail.tab_health", "健康");
        m.insert("project_detail.no_claude_md", "未找到 CLAUDE.md");
        m.insert("project_detail.no_claude_md_hint", "在项目目录中创建 CLAUDE.md 以向 Claude Code 提供指令。");
        m.insert("project_detail.no_skills", "此项目没有 Skills");
        m.insert("project_detail.no_rules", "此项目没有规则");
        m.insert("project_detail.no_memory", "此项目没有记忆");
        m.insert("project_detail.save", "保存");
        m.insert("project_detail.saved", "已保存！");
        m.insert("project_detail.skill_scope", "范围");
        m.insert("project_detail.permissions_loading", "加载权限中...");
        m.insert("project_detail.permissions_error", "加载权限时出错");
        m.insert("project_detail.permissions_entries", "条目");
        m.insert("project_detail.permissions_col_tool", "工具");
        m.insert("project_detail.permissions_col_command", "命令");
        m.insert("project_detail.permissions_no_entries", "无权限条目");
        m.insert("project_detail.health_loading", "计算健康状态中...");
        m.insert("project_detail.health_error", "加载健康数据时出错");
        m.insert("project_detail.health_score", "健康评分");
        m.insert("project_detail.health_claude_md", "CLAUDE.md 存在");
        m.insert("project_detail.health_memory", "记忆存在");
        m.insert("project_detail.health_permissions", "权限");
        m.insert("project_detail.health_security_issues", "安全问题");
        m.insert("project_detail.health_duplicated_rules", "重复规则");
        m.insert("project_detail.health_no_security_issues", "未发现安全问题");
        m.insert("project_detail.health_col_text", "文本");
        m.insert("project_detail.health_col_found_in", "发现于");
        m.insert("project_detail.health_col_also_in", "同时存在于");
        m.insert("project_detail.health_permission_entries", "权限条目");
        m.insert("project_detail.permissions_col_index", "#");
        m.insert("project_detail.permissions_col_status", "状态");
        m.insert("project_detail.permissions_fragment", "片段");
        m.insert("project_detail.permissions_ok", "正常");
        m.insert("project_detail.permissions_security_warnings", "条安全警告");
        m.insert("project_detail.permissions_manage", "管理权限");
        m.insert("project_detail.advisor_analyze", "分析项目");
        m.insert("project_detail.advisor_analyzing", "分析中...");
        m.insert("project_detail.advisor_description", "Claude 会分析您的项目并提供建议");
        m.insert("project_detail.advisor_loading", "Claude 正在分析您的项目");
        m.insert("project_detail.advisor_summary", "项目评估");
        m.insert("project_detail.advisor_done", "完成！");
        m.insert("project_detail.advisor_preview", "显示预览");
        m.insert("project_detail.advisor_category_tip", "提示");
        m.insert("project_detail.skills_col_name", "名称");
        m.insert("project_detail.skills_col_description", "描述");
        m.insert("project_detail.skills_col_invocable", "可调用");
        m.insert("project_detail.rules_col_name", "名称");
        m.insert("project_detail.rules_col_path", "路径");
        m.insert("project_detail.memory_col_file", "文件");
        m.insert("project_detail.memory_col_size", "大小");
        m.insert("project_detail.bytes", "字节");
        m.insert("project_detail.unknown_tab", "未知标签页");

        // ── Project Profile (Feature 1) ──
        m.insert("project_detail.tab_profile", "概况");
        m.insert("project_detail.profile_health", "健康评分");
        m.insert("project_detail.profile_rules", "规则");
        m.insert("project_detail.profile_skills", "Skills");
        m.insert("project_detail.profile_memory", "记忆");
        m.insert("project_detail.profile_mcp", "MCP 服务器");
        m.insert("project_detail.profile_hooks", "Hooks");
        m.insert("project_detail.profile_conflicts", "冲突");
        m.insert("project_detail.profile_analyze", "运行深度分析");
        m.insert("project_detail.profile_no_mcp", "无 MCP 服务器");
        m.insert("project_detail.profile_global_scope", "全局");
        m.insert("project_detail.profile_project_scope", "项目");

        // ── Global Skills ──
        m.insert("global_skills.tab_my_skills", "我的技能");
        m.insert("global_skills.tab_browse", "浏览");
        m.insert("global_skills.tab_templates", "模板");
        m.insert("global_skills.title", "全局 Skills");
        m.insert("global_skills.subtitle", "管理 ~/.claude/skills/ 中的 Skills");
        m.insert("global_skills.loading", "加载 Skills 中");
        m.insert("global_skills.no_skills", "未找到全局 Skills");
        m.insert("global_skills.no_skills_hint", "在 ~/.claude/skills/ 中创建 Skills 或使用 Skill 浏览器。");
        m.insert("global_skills.select_skill", "从列表中选择一个 Skill。");
        m.insert("global_skills.col_skill", "Skill");
        m.insert("global_skills.col_invocable", "可调用");
        m.insert("global_skills.invocable", "可调用");
        m.insert("global_skills.not_invocable", "不可调用");
        m.insert("global_skills.editing", "编辑：");
        m.insert("global_skills.save", "保存");
        m.insert("global_skills.saved", "已保存！");
        m.insert("global_skills.delete", "删除");
        m.insert("global_skills.deleted", "已删除！");

        // ── Skill Builder (Feature 2) ──
        m.insert("global_skills.tab_create", "创建");
        m.insert("skill_builder.templates", "模板");
        m.insert("skill_builder.editor", "编辑器");
        m.insert("skill_builder.preview", "预览");
        m.insert("skill_builder.name", "Skill 名称");
        m.insert("skill_builder.name_placeholder", "例如 my-skill");
        m.insert("skill_builder.name_required", "请输入 Skill 名称");
        m.insert("skill_builder.description", "描述");
        m.insert("skill_builder.desc_placeholder", "这个 Skill 做什么？");
        m.insert("skill_builder.user_invocable", "用户可调用（可通过 /command 调用）");
        m.insert("skill_builder.content", "Skill 内容 (Markdown)");
        m.insert("skill_builder.save", "保存 Skill");
        m.insert("skill_builder.saved", "Skill 已保存：");
        m.insert("skill_builder.trigger", "触发器：");
        m.insert("skill_builder.preview_hint", "选择模板或开始输入以查看实时预览。");

        // ── Global Rules ──
        m.insert("global_rules.title", "全局规则");
        m.insert("global_rules.subtitle", "管理 ~/.claude/rules/ 中的规则");
        m.insert("global_rules.loading", "加载规则中");
        m.insert("global_rules.no_rules", "未找到全局规则");
        m.insert("global_rules.no_rules_hint", "在 ~/.claude/rules/ 中创建 .md 文件");
        m.insert("global_rules.select_rule", "从列表中选择一条规则。");
        m.insert("global_rules.col_rule", "规则");
        m.insert("global_rules.editing", "编辑：");
        m.insert("global_rules.save", "保存");
        m.insert("global_rules.saved", "已保存！");
        m.insert("global_rules.delete", "删除");
        m.insert("global_rules.deleted", "已删除！");

        // ── Rules Conflicts (Feature 6) ──
        m.insert("rules.conflicts_title", "规则冲突");
        m.insert("rules.conflicts_found", "发现冲突");
        m.insert("rules.conflict_name_collision", "名称冲突");
        m.insert("rules.conflict_content_overlap", "内容重叠");
        m.insert("rules.conflict_contradiction", "矛盾");
        m.insert("rules.conflict_global", "全局");
        m.insert("rules.conflict_project", "项目");
        m.insert("rules.no_conflicts", "未检测到冲突");

        // ── Plans ──
        m.insert("plans.title", "计划");
        m.insert("plans.subtitle", "管理 ~/.claude/plans/ 中的计划文件");
        m.insert("plans.loading", "加载计划中");
        m.insert("plans.no_plans", "未找到计划");
        m.insert("plans.no_plans_hint", "计划由 Claude Code 在规划过程中创建。");
        m.insert("plans.select_plan", "从列表中选择一个计划。");
        m.insert("plans.col_plan", "计划");
        m.insert("plans.col_modified", "修改时间");
        m.insert("plans.modified", "修改时间");
        m.insert("plans.plan_label", "计划：");
        m.insert("plans.save", "保存");
        m.insert("plans.saved", "已保存！");
        m.insert("plans.delete", "删除");
        m.insert("plans.deleted", "已删除！");

        // ── Settings ──
        m.insert("settings.title", "设置");
        m.insert("settings.subtitle", "管理 Claude Code 设置和 Hooks");
        m.insert("settings.tab_overview", "概览");
        m.insert("settings.tab_hooks", "Hook 模板");
        m.insert("settings.tab_storage", "存储");
        m.insert("settings.loading", "加载设置中");
        m.insert("settings.hooks_title", "Hooks");
        m.insert("settings.no_hooks", "未配置 Hooks");
        m.insert("settings.pre_tool_use", "PreToolUse");
        m.insert("settings.post_tool_use", "PostToolUse");
        m.insert("settings.matcher", "匹配器");
        m.insert("settings.command", "命令");
        m.insert("settings.hook_templates_title", "Hook 模板");
        m.insert("settings.hook_templates_desc", "预构建的 Hook 配置，可直接添加。");
        m.insert("settings.hook_templates_loading", "加载模板中");
        m.insert("settings.add_hook", "添加");
        m.insert("settings.storage_title", "存储用量");
        m.insert("settings.storage_loading", "计算存储用量中");
        m.insert("settings.storage_total", "总计");
        m.insert("settings.storage_dir", "目录");
        m.insert("settings.storage_size", "大小");

        // ── Permissions ──
        m.insert("permissions.title", "权限");
        m.insert("permissions.subtitle", "审查和管理项目权限");
        m.insert("permissions.loading", "加载权限中");
        m.insert("permissions.no_permissions", "未找到权限");
        m.insert("permissions.col_project", "项目");
        m.insert("permissions.col_entries", "条目");
        m.insert("permissions.col_issues", "问题");
        m.insert("permissions.col_fragmented", "碎片化");
        m.insert("permissions.detail_title", "权限");
        m.insert("permissions.detail_loading", "加载权限中");
        m.insert("permissions.detail_col_tool", "工具");
        m.insert("permissions.detail_col_command", "命令");
        m.insert("permissions.detail_col_status", "状态");
        m.insert("permissions.detail_fragmented", "碎片化");
        m.insert("permissions.detail_security_issue", "安全问题");
        m.insert("permissions.detail_delete_selected", "删除所选");
        m.insert("permissions.detail_deleted", "已删除！");
        m.insert("permissions.detail_warnings_title", "安全警告");
        m.insert("permissions.health_title", "配置健康");
        m.insert("permissions.health_subtitle", "所有项目的健康状态");
        m.insert("permissions.health_loading", "计算健康状态中");
        m.insert("permissions.health_col_project", "项目");
        m.insert("permissions.health_col_score", "评分");
        m.insert("permissions.health_col_issues", "问题");
        m.insert("permissions.health_avg", "平均");
        m.insert("permissions.subtitle_manage", "管理所有项目的权限白名单");
        m.insert("permissions.col_actions", "操作");
        m.insert("permissions.col_security_issues", "安全问题");
        m.insert("permissions.details", "详情");
        m.insert("permissions.detail_subtitle", "审查和清理权限条目");
        m.insert("permissions.detail_deleting", "删除中...");
        m.insert("permissions.detail_deleted_reloading", "已删除！重新加载中...");
        m.insert("permissions.detail_delete_count", "删除所选");
        m.insert("permissions.detail_col_index", "#");
        m.insert("permissions.detail_fragment", "片段");
        m.insert("permissions.detail_ok", "正常");
        m.insert("permissions.detail_warnings_count", "安全警告");
        m.insert("permissions.detail_entry", "条目");
        m.insert("permissions.health_subtitle_scores", "所有项目的配置健康评分");
        m.insert("permissions.health_avg_score", "平均健康评分");
        m.insert("permissions.health_projects_analyzed", "已分析项目");
        m.insert("permissions.health_no_issues", "无问题");

        // ── Analytics ──
        m.insert("analytics.title", "数据分析");
        m.insert("analytics.subtitle", "Claude Code 使用统计");
        m.insert("analytics.loading", "加载分析数据中");
        m.insert("analytics.error_loading", "加载分析数据时出错");
        m.insert("analytics.total_sessions", "总会话数");
        m.insert("analytics.total_messages", "总消息数");
        m.insert("analytics.git_commits", "Git 提交");
        m.insert("analytics.lines_added", "新增行数");
        m.insert("analytics.lines_removed", "删除行数");
        m.insert("analytics.since", "起始");
        m.insert("analytics.activity_heatmap", "活动热图");
        m.insert("analytics.messages", "消息");
        m.insert("analytics.sessions", "会话");
        m.insert("analytics.tool_calls", "工具调用");
        m.insert("analytics.hourly_distribution", "小时分布");
        m.insert("analytics.model_usage", "模型使用量");
        m.insert("analytics.col_model", "模型");
        m.insert("analytics.col_input_tokens", "输入 Token");
        m.insert("analytics.col_output_tokens", "输出 Token");
        m.insert("analytics.col_cache_tokens", "缓存 Token");
        m.insert("analytics.tool_ranking", "工具排名");
        m.insert("analytics.col_cache_read", "缓存读取");
        m.insert("analytics.tool_usage_top10", "工具使用量（前 10）");
        m.insert("analytics.languages", "编程语言");
        m.insert("analytics.session_outcomes", "会话结果");
        m.insert("analytics.outcomes", "结果");

        // ── Teach Me Tips (Feature 5) ──
        m.insert("analytics.tips_title", "洞察与提示");
        m.insert("analytics.tips_dismiss", "关闭");
        m.insert("analytics.tips_learn_more", "了解更多");
        m.insert("analytics.tip_category_tool", "工具");
        m.insert("analytics.tip_category_workflow", "工作流");
        m.insert("analytics.tip_category_performance", "性能");
        m.insert("analytics.tip_category_config", "配置");
        m.insert("analytics.no_tips", "暂无提示");

        // ── Sessions ──
        m.insert("sessions.title", "会话");
        m.insert("sessions.subtitle", "浏览 Claude Code 会话历史");
        m.insert("sessions.loading", "加载会话中");
        m.insert("sessions.search_placeholder", "搜索会话...");
        m.insert("sessions.no_sessions", "未找到会话");
        m.insert("sessions.col_project", "项目");
        m.insert("sessions.col_date", "日期");
        m.insert("sessions.col_duration", "时长");
        m.insert("sessions.col_messages", "消息");
        m.insert("sessions.col_summary", "摘要");
        m.insert("sessions.col_outcome", "结果");
        m.insert("sessions.minutes", "分钟");
        m.insert("sessions.load_more", "加载更多");
        m.insert("sessions.detail_title", "会话详情");
        m.insert("sessions.detail_loading", "加载会话中");
        m.insert("sessions.detail_project", "项目");
        m.insert("sessions.detail_start", "开始");
        m.insert("sessions.detail_duration", "时长");
        m.insert("sessions.detail_messages", "消息");
        m.insert("sessions.detail_tools", "工具调用");
        m.insert("sessions.detail_tokens", "Token");
        m.insert("sessions.detail_git", "Git");
        m.insert("sessions.detail_first_prompt", "首次提示");
        m.insert("sessions.detail_summary", "摘要");
        m.insert("sessions.back", "返回");
        m.insert("sessions.searching", "搜索中...");
        m.insert("sessions.search", "搜索");
        m.insert("sessions.clear", "清除");
        m.insert("sessions.search_results", "搜索结果");
        m.insert("sessions.no_results", "未找到结果");
        m.insert("sessions.col_prompt", "提示");
        m.insert("sessions.session_prefix", "会话：");
        m.insert("sessions.detail_start_time", "开始时间");
        m.insert("sessions.user_messages", " 用户 / ");
        m.insert("sessions.assistant_messages", " 助手");
        m.insert("sessions.tokens_in", " 输入 / ");
        m.insert("sessions.tokens_out", " 输出");
        m.insert("sessions.commits_label", " 次提交，+");
        m.insert("sessions.lines_minus", " / -");
        m.insert("sessions.tools_used", "已使用工具");
        m.insert("sessions.outcome_prefix", "结果：");
        m.insert("sessions.showing", "显示");
        m.insert("sessions.of", "/");
        m.insert("sessions.previous", "上一页");
        m.insert("sessions.next", "下一页");

        // ── GitHub ──
        m.insert("github.title", "GitHub");
        m.insert("github.subtitle", "GitHub 集成状态");
        m.insert("github.loading", "加载 GitHub 数据中");
        m.insert("github.auth_status", "认证状态");
        m.insert("github.username", "用户名");
        m.insert("github.linked_repos", "关联仓库");
        m.insert("github.no_repos", "无关联仓库");
        m.insert("github.col_repo", "仓库");
        m.insert("github.col_recent_commits", "最近提交");
        m.insert("github.col_open_prs", "开放 PR");

        // ── Help / System Info ──
        m.insert("help.title", "系统信息");
        m.insert("help.subtitle", "Claude Code 系统信息");
        m.insert("help.loading", "加载系统信息中");
        m.insert("help.account", "账户");
        m.insert("help.account_name", "姓名");
        m.insert("help.account_email", "邮箱");
        m.insert("help.subscription", "订阅");
        m.insert("help.claude_version", "Claude Code 版本");
        m.insert("help.gh_cli", "GitHub CLI");
        m.insert("help.skill_usage", "Skill 使用情况");
        m.insert("help.no_skill_usage", "未记录 Skill 使用情况");
        m.insert("help.col_skill", "Skill");
        m.insert("help.col_count", "次数");
        m.insert("help.what_is_title", "什么是 ClaudeAdmin？");
        m.insert("help.what_is_desc", "ClaudeAdmin 是 Claude Code 的可视化管理控制台。它提供基于 Web 的界面来管理 Claude Code 配置的各个方面：项目、Skills、规则、记忆、设置、Hooks、MCP 服务器和计划。");
        m.insert("help.system_status", "系统状态");
        m.insert("help.not_set", "未设置");
        m.insert("help.unknown", "未知");
        m.insert("help.not_found", "未找到");
        m.insert("help.not_installed", "未安装");
        m.insert("help.concepts_title", "Claude Code 概念");
        m.insert("help.concept_skills", "带有 YAML 前置信息的可复用提示。以 SKILL.md 文件形式存储在 ~/.claude/skills/（全局）或 .claude/skills/（项目级）中。");
        m.insert("help.concept_rules", "塑造 Claude 行为的约束和指南。以 .md 文件形式存储在 ~/.claude/rules/ 或项目级目录中。");
        m.insert("help.concept_memory", "每个项目的持久化笔记。MEMORY.md 会自动加载到系统提示中。存储模式、偏好和经验。");
        m.insert("help.concept_hooks", "由事件（PreToolUse、PostToolUse、Stop）触发的 Shell 命令。在 settings.json 中配置，用于自动格式化、代码检查等。");
        m.insert("help.concept_mcp", "Model Context Protocol 服务器通过外部工具扩展 Claude。在 ~/.claude.json 中配置 command、args 和 env。");
        m.insert("help.concept_claudemd", "项目级指令文件。自动加载为上下文。包含项目约定、技术栈信息和编码指南。");
        m.insert("help.disclaimer", "ClaudeAdmin是一个独立的社区项目。它与Anthropic没有关联，也未获得Anthropic的认可或批准。Claude和Claude Code是Anthropic的商标。");

        m.insert("github.subtitle_detail", "GitHub CLI 集成和关联仓库");
        m.insert("github.linked_repositories", "关联仓库");
        m.insert("github.no_linked_repos", "~/.claude.json 中未关联 GitHub 仓库");
        m.insert("github.col_name", "名称");
        m.insert("github.col_path", "路径");

        // ── Skill Browser ──
        m.insert("skill_browser.title", "Skill 浏览器");
        m.insert("skill_browser.subtitle", "发现并安装官方和社区 Skills");
        m.insert("skill_browser.loading", "加载 Skills 中");
        m.insert("skill_browser.search_placeholder", "搜索 Skills...");
        m.insert("skill_browser.no_results", "未找到 Skills");
        m.insert("skill_browser.installed", "已安装");
        m.insert("skill_browser.install", "安装");
        m.insert("skill_browser.official", "官方");
        m.insert("skill_browser.community", "社区");
        m.insert("skill_browser.tab_official", "官方 (Anthropic)");
        m.insert("skill_browser.tab_community", "社区");
        m.insert("skill_browser.install_success", "安装成功！");
        m.insert("skill_browser.install_failed", "安装失败：");

        // ── Docs ──
        m.insert("docs.title", "文档");
        m.insert("docs.subtitle", "关于 Claude Code 配置您需要了解的一切");
        m.insert("docs.loading", "加载文档中");

        // ── Docs: Table of Contents ──
        m.insert("docs.toc_contents", "目录");
        m.insert("docs.toc_why_claudeadmin", "为什么选择 ClaudeAdmin？");
        m.insert("docs.toc_capabilities", "能做什么和不能做什么");
        m.insert("docs.toc_group", "概念");
        m.insert("docs.toc_claude_md", "CLAUDE.md");
        m.insert("docs.toc_rules", "规则");
        m.insert("docs.toc_skills", "Skills");
        m.insert("docs.toc_memory", "记忆");
        m.insert("docs.toc_settings", "设置和 Hooks");
        m.insert("docs.toc_mcp", "MCP 服务器");
        m.insert("docs.toc_plans", "计划");
        m.insert("docs.toc_scopes", "全局与项目级");
        m.insert("docs.toc_tips", "技巧和最佳实践");
        m.insert("docs.toc_links", "官方文档");

        // ── Docs: Shared labels ──
        m.insert("docs.tips_heading", "技巧和窍门");
        m.insert("docs.scope_global", "全局");
        m.insert("docs.scope_project", "项目");
        m.insert("docs.scope_user", "用户");
        m.insert("docs.scope_parent", "父级");
        m.insert("docs.scope_managed", "托管");
        m.insert("docs.scope_local", "本地");

        // ── Docs: Overview ──
        m.insert("docs.overview_heading", "为什么选择 ClaudeAdmin？");
        m.insert("docs.overview_callout", " 是您整个 Claude Code 配置的集中管理控制台。它用一个可视化界面取代了跨数十个隐藏目录的手动文件编辑。");
        m.insert("docs.overview_text1", "Claude Code 将其配置存储在一个复杂的文件和目录层级中：项目根目录中的 CLAUDE.md 文件、分散在 ~/.claude/ 子目录中的规则和 Skills、按编码项目路径索引的记忆文件、多个 JSON 文件中的设置，以及 ~/.claude.json 中的 MCP 服务器配置。随着项目的增长，手动管理这一切会变得容易出错且耗时。");
        m.insert("docs.overview_text2", "ClaudeAdmin 为您提供：");
        m.insert("docs.overview_li_visibility_label", "可见性");
        m.insert("docs.overview_li_visibility", " \u{2013} 在一个地方查看所有项目、Skills、规则和记忆");
        m.insert("docs.overview_li_editing_label", "编辑");
        m.insert("docs.overview_li_editing", " \u{2013} 使用专业编辑器编辑 CLAUDE.md、规则、Skills 和记忆");
        m.insert("docs.overview_li_health_label", "健康检查");
        m.insert("docs.overview_li_health", " \u{2013} 发现权限中的安全问题、重复规则和缺失的配置");
        m.insert("docs.overview_li_analytics_label", "数据分析");
        m.insert("docs.overview_li_analytics", " \u{2013} 了解您如何使用 Claude Code：会话、Token、工具、费用");
        m.insert("docs.overview_li_advisor_label", "顾问");
        m.insert("docs.overview_li_advisor", " \u{2013} AI 驱动的建议，改善您的项目配置");

        // ── Docs: Capabilities ──
        m.insert("docs.cap_heading", "ClaudeAdmin 能做什么和不能做什么");
        m.insert("docs.cap_can_heading", "能做什么");
        m.insert("docs.cap_can_1", "浏览和管理在 ~/.claude.json 中注册的所有项目");
        m.insert("docs.cap_can_2", "查看和编辑任何项目的 CLAUDE.md 文件");
        m.insert("docs.cap_can_3", "创建、编辑和删除全局及项目 Skills");
        m.insert("docs.cap_can_4", "创建、编辑和删除全局及项目规则");
        m.insert("docs.cap_can_5", "查看和编辑项目记忆文件（MEMORY.md 和主题）");
        m.insert("docs.cap_can_6", "检查设置层级（全局 \u{2192} 项目 \u{2192} 本地）");
        m.insert("docs.cap_can_7", "审计权限条目并检测安全问题");
        m.insert("docs.cap_can_8", "查看 MCP 服务器配置");
        m.insert("docs.cap_can_9", "分析会话历史、Token 使用量和费用");
        m.insert("docs.cap_can_10", "运行 AI 驱动的项目分析，提供可操作的建议");
        m.insert("docs.cap_can_11", "浏览并安装社区仓库中的 Skills");
        m.insert("docs.cap_can_12", "所有写入操作自动在 ~/.claude/backups/ 中创建备份");
        m.insert("docs.cap_cannot_heading", "不能做什么");
        m.insert("docs.cap_cannot_1", "运行 Claude Code 会话 \u{2013} 它管理配置，而非执行");
        m.insert("docs.cap_cannot_2", "修改托管策略（企业/组织级设置）");
        m.insert("docs.cap_cannot_3", "访问远程环境或 SSH 会话");
        m.insert("docs.cap_cannot_4", "替代 Claude Code CLI 进行实际编码工作");
        m.insert("docs.cap_cannot_5", "直接编辑 .claude.json MCP 服务器（为安全起见仅提供只读）");
        m.insert("docs.cap_cannot_6", "管理 API 密钥或认证凭据");
        m.insert("docs.cap_cannot_callout", "ClaudeAdmin 是配置管理器，不是 Claude Code 本身的替代品。可以把它想象成数据库管理工具：它帮助您检查、配置和维护 \u{2013} 但实际工作在 Claude Code 中完成。");

        // ── Docs: CLAUDE.md ──
        m.insert("docs.claudemd_callout", "项目的宪法。CLAUDE.md 是最重要的配置文件 \u{2013} 它会自动加载到每个 Claude Code 会话中作为持久上下文。");
        m.insert("docs.claudemd_how_heading", "工作原理");
        m.insert("docs.claudemd_how_text", "当 Claude Code 启动会话时，它会从当前工作目录向上递归搜索到文件系统根目录，查找 CLAUDE.md 文件。所有找到的文件会被加载并拼接，距离更近的文件优先级更高。这意味着您可以在 Monorepo 级别拥有共享约定的 CLAUDE.md，同时在包级别拥有特定覆盖的 CLAUDE.md 文件。");
        m.insert("docs.claudemd_locations_heading", "文件位置");
        m.insert("docs.claudemd_loc_project_or", " 或 ");
        m.insert("docs.claudemd_loc_parent", "Monorepo 根目录，为所有子包加载");
        m.insert("docs.claudemd_loc_user", "跨所有项目的个人默认设置");
        m.insert("docs.claudemd_whatto_heading", "应该写些什么");
        m.insert("docs.claudemd_whatto_context_label", "项目上下文");
        m.insert("docs.claudemd_whatto_context", " \u{2013} 技术栈、架构决策、关键依赖");
        m.insert("docs.claudemd_whatto_standards_label", "编码标准");
        m.insert("docs.claudemd_whatto_standards", " \u{2013} 命名约定、格式规则、错误处理模式");
        m.insert("docs.claudemd_whatto_workflows_label", "工作流");
        m.insert("docs.claudemd_whatto_workflows", " \u{2013} 构建、测试、部署方式；分支命名；PR 约定");
        m.insert("docs.claudemd_whatto_dodont_label", "行为准则");
        m.insert("docs.claudemd_whatto_dodont", " \u{2013} 明确的约束（例如 \u{201c}在 TypeScript 中永远不要使用 any\u{201d}）");
        m.insert("docs.claudemd_whatto_team_label", "团队协议");
        m.insert("docs.claudemd_whatto_team", " \u{2013} 审查流程、提交消息格式、模块边界");
        m.insert("docs.claudemd_tip1", "保持在 500 行以内。Claude 会将整个文件加载到上下文中 \u{2013} 臃肿的 CLAUDE.md 文件会浪费 Token 并稀释重要指令。");
        m.insert("docs.claudemd_tip2", "使用清晰的章节标题（## 架构、## 约定）。Claude 通过解析结构来查找相关章节。");
        m.insert("docs.claudemd_tip3", "将最关键的规则放在最前面。在长文件中，开头的内容会获得更多关注。");
        m.insert("docs.claudemd_tip4", "使用 CLAUDE.local.md 存放不应提交到 Git 的个人偏好。");
        m.insert("docs.claudemd_ext_link", "Anthropic 文档：CLAUDE.md \u{2192}");

        // ── Docs: Rules ──
        m.insert("docs.rules_heading", "规则");
        m.insert("docs.rules_callout", "塑造 Claude 行为的模块化主题约束。与作为单一大文件的 CLAUDE.md 不同，规则是独立的 .md 文件 \u{2013} 每个专注于一个特定主题。");
        m.insert("docs.rules_how_heading", "工作原理");
        m.insert("docs.rules_how_text", "规则在会话启动时自动加载。全局规则（您的个人偏好）首先加载，然后项目规则覆盖它们。这使您可以全局定义编码风格，同时项目可以添加特定领域的约束。");
        m.insert("docs.rules_locations_heading", "文件位置");
        m.insert("docs.rules_loc_global", "您的个人规则，适用于所有项目");
        m.insert("docs.rules_loc_project", "项目特定规则，提交到 Git 与团队共享");
        m.insert("docs.rules_examples_heading", "示例");
        m.insert("docs.rules_example_frontend", " \u{2013} React 组件模式、状态管理规则");
        m.insert("docs.rules_example_security", " \u{2013} 输入验证、认证模式、OWASP 合规");
        m.insert("docs.rules_example_testing", " \u{2013} 测试结构、覆盖率要求、Mock 策略");
        m.insert("docs.rules_example_rust", " \u{2013} 使用 thiserror 的错误处理、模块结构、命名");
        m.insert("docs.rules_tip1", "每个文件一个主题。不要混合前端和后端规则 \u{2013} 更小、更专注的文件更容易维护和复用。");
        m.insert("docs.rules_tip2", "全局规则非常适合个人风格偏好：首选语言、格式化工具、提交消息格式。");
        m.insert("docs.rules_tip3", "项目规则覆盖全局规则。如果存在冲突，项目级规则优先。");
        m.insert("docs.rules_tip4", "使用 ClaudeAdmin 的健康检查来检测全局和项目级之间的重复规则。");
        m.insert("docs.rules_ext_link", "Anthropic 文档：规则 \u{2192}");

        // ── Docs: Skills ──
        m.insert("docs.skills_heading", "Skills");
        m.insert("docs.skills_callout", "带有元数据的可复用结构化提示。Skills 就像 Claude 的插件 \u{2013} 它们可以通过上下文自动触发或通过斜杠命令手动调用。");
        m.insert("docs.skills_how_heading", "工作原理");
        m.insert("docs.skills_how_text", "每个 Skill 存放在自己的目录中，包含一个带有 YAML 前置信息和 Markdown 正文的 SKILL.md 文件。前置信息定义了描述和触发条件等元数据。正文包含实际的提示指令、示例和参考材料。");
        m.insert("docs.skills_structure_heading", "结构");
        m.insert("docs.skills_locations_heading", "文件位置");
        m.insert("docs.skills_loc_global", "在所有项目中可用");
        m.insert("docs.skills_loc_project", "项目特定 Skills");
        m.insert("docs.skills_tip1", "在前置信息中设置 user_invocable: true，使 Skill 可以在 Claude Code 中通过 /skill-name 调用。");
        m.insert("docs.skills_tip2", "在 SKILL.md 中包含具体示例。Claude 在有输入/输出示例时表现更好。");
        m.insert("docs.skills_tip3", "使用 ClaudeAdmin 中的 Skill 浏览器发现和安装社区 Skills。");
        m.insert("docs.skills_tip4", "Skill 目录中的参考文件仅在 Skill 被触发时加载，节省 Token。");
        m.insert("docs.skills_ext_link", "Anthropic 文档：Skills \u{2192}");

        // ── Docs: Memory ──
        m.insert("docs.memory_heading", "记忆");
        m.insert("docs.memory_callout", "Claude 的每个项目持久化知识库。记忆文件存储 Claude 在各会话中积累的模式、偏好和经验。");
        m.insert("docs.memory_how_heading", "工作原理");
        m.insert("docs.memory_how_text", "Claude Code 为每个项目维护一个记忆目录，存储在 ~/.claude/projects/<encoded-path>/memory/ 中。主文件 MEMORY.md 具有特殊地位：其前 200 行会在会话启动时加载到系统提示中。附加的主题文件（debugging.md、api-conventions.md 等）按需加载，当 Claude 判断它们与当前任务相关时。");
        m.insert("docs.memory_structure_heading", "结构");
        m.insert("docs.memory_auto_heading", "自动记忆");
        m.insert("docs.memory_auto_text", "当 Claude Code 发现项目模式、调试解决方案或您的偏好时，可以自动向记忆中添加条目。您可以通过 Claude Code 中的 /memory 命令或 ClaudeAdmin 的记忆编辑器来审查和编辑自动生成的记忆。");
        m.insert("docs.memory_tip1", "将最关键的信息放在 MEMORY.md 的前 200 行 \u{2013} 这是自动加载的部分。");
        m.insert("docs.memory_tip2", "使用主题文件存储深度知识。它们仅在需要时加载，保持较低的基础 Token 使用量。");
        m.insert("docs.memory_tip3", "定期审查自动记忆。Claude 有时会存储过于具体的一次性解决方案。");
        m.insert("docs.memory_tip4", "记忆是按项目分隔的。切换到不同项目时，Claude 会获得不同的记忆集合。");
        m.insert("docs.memory_ext_link", "Anthropic 文档：记忆 \u{2192}");

        // ── Docs: Settings & Hooks ──
        m.insert("docs.settings_heading", "设置和 Hooks");
        m.insert("docs.settings_heading_short", "设置");
        m.insert("docs.settings_callout", "基于 JSON 的行为、权限和自动化配置。Hooks 让您在 Claude 使用工具之前或之后自动运行 Shell 命令。");
        m.insert("docs.settings_hierarchy_heading", "设置层级");
        m.insert("docs.settings_hierarchy_text", "设置遵循分层模型，具体度递增。更具体的层会覆盖不太具体的层：");
        m.insert("docs.settings_managed_code", "企业策略");
        m.insert("docs.settings_managed_desc", "最高优先级，由组织设置（只读）");
        m.insert("docs.settings_global_desc", "您的个人全局设置");
        m.insert("docs.settings_project_desc", "团队设置，提交到 Git");
        m.insert("docs.settings_local_desc", "您的个人项目覆盖（已加入 gitignore）");
        m.insert("docs.settings_hooks_heading", "Hooks");
        m.insert("docs.settings_hooks_text", "Hooks 是在 Claude Code 会话期间特定事件触发的 Shell 命令。它们在 settings.json 的 hooks 键下配置。");
        m.insert("docs.settings_hooks_events", "事件：\n\u{2022} PreToolUse  \u{2013} Claude 执行工具之前（例如写入前自动格式化）\n\u{2022} PostToolUse \u{2013} Claude 执行工具之后（例如代码变更后进行检查）\n\u{2022} Stop        \u{2013} Claude 完成回复时");
        m.insert("docs.settings_tip1", "使用 PreToolUse Hooks 在 Claude 写入文件前自动格式化代码。这确保了一致的代码风格。");
        m.insert("docs.settings_tip2", "PostToolUse Hooks 非常适合代码检查：在 Claude 更改代码后立即发现问题。");
        m.insert("docs.settings_tip3", "ClaudeAdmin 的设置页面显示所有层的有效 Hook 链。");
        m.insert("docs.settings_ext_link", "Anthropic 文档：设置 \u{2192}");
        m.insert("docs.settings_hooks_ext_link", "Anthropic 文档：Hooks \u{2192}");

        // ── Docs: MCP Servers ──
        m.insert("docs.mcp_heading", "MCP 服务器");
        m.insert("docs.mcp_callout", "Model Context Protocol 服务器通过外部工具和数据源扩展 Claude。它们让 Claude 与数据库、API、文件系统和其他服务交互。");
        m.insert("docs.mcp_how_heading", "工作原理");
        m.insert("docs.mcp_how_text", "MCP 服务器是 Claude Code 启动的外部进程，通过 MCP 协议进行通信。每个服务器提供一组 Claude 可以调用的工具。配置存储在 ~/.claude.json 的 mcpServers 键下。");
        m.insert("docs.mcp_config_heading", "配置");
        m.insert("docs.mcp_management_heading", "在 ClaudeAdmin 中管理");
        m.insert("docs.mcp_management_text", "ClaudeAdmin 提供专用的 MCP 服务器页面进行完整管理：查看、添加、编辑和删除服务器，无需手动编辑 JSON。健康检查功能会启动每个服务器并验证其对 JSON-RPC initialize 和 tools/list 请求的响应。使用 MCP 浏览器一键发现和安装热门服务器。");
        m.insert("docs.mcp_tip1", "MCP 服务器也可以在 .claude/settings.json 中按项目配置。");
        m.insert("docs.mcp_tip2", "使用环境变量存储密钥 \u{2013} 永远不要在配置文件中硬编码 API 密钥。");
        m.insert("docs.mcp_tip3", "使用 MCP 浏览器发现和安装热门服务器，或通过\u{201c}新建服务器\u{201d}标签页添加自定义服务器。");
        m.insert("docs.mcp_ext_link", "Anthropic 文档：MCP \u{2192}");
        m.insert("docs.mcp_spec_ext_link", "MCP 规范 \u{2192}");

        // ── Docs: Plans ──
        m.insert("docs.plans_heading", "计划");
        m.insert("docs.plans_callout", "Claude 用来分解复杂任务的 Markdown 文件。计划帮助 Claude 在多步骤工作中保持专注并跟踪进度。");
        m.insert("docs.plans_how_heading", "工作原理");
        m.insert("docs.plans_how_text", "当 Claude 处理复杂任务时，它可以创建或引用存储在 ~/.claude/plans/ 中的计划文件。计划是带有任务列表、依赖关系和状态跟踪的结构化 Markdown 文档。它们在会话间持久化，因此 Claude 可以从上次中断的地方继续。");
        m.insert("docs.plans_location_heading", "文件位置");
        m.insert("docs.plans_loc_global", "所有计划文件");
        m.insert("docs.plans_tip1", "在复杂重构之前让 Claude \u{201c}制定计划\u{201d}。计划可以减少多文件变更中的错误。");
        m.insert("docs.plans_tip2", "定期清理旧计划。ClaudeAdmin 的计划页面显示所有存储的计划及其修改日期。");

        // ── Docs: Scopes ──
        m.insert("docs.scopes_heading", "全局与项目级范围");
        m.insert("docs.scopes_callout", "理解范围是高效配置 Claude Code 的关键。每种配置类型都存在两个层级：全局（您的个人默认值）和项目级（与团队共享）。");
        m.insert("docs.scopes_overview_heading", "范围概览");
        m.insert("docs.scopes_col_type", "配置类型");
        m.insert("docs.scopes_col_global", "全局（用户）");
        m.insert("docs.scopes_col_project", "项目");
        m.insert("docs.scopes_col_priority", "优先级");
        m.insert("docs.scopes_priority_project_global", "项目 > 全局");
        m.insert("docs.scopes_priority_both", "两者都可用");
        m.insert("docs.scopes_memory_global", "按项目存储在 ~/.claude/projects/ 中");
        m.insert("docs.scopes_priority_project_keyed", "按项目索引");
        m.insert("docs.scopes_priority_local_project_global", "本地 > 项目 > 全局");
        m.insert("docs.scopes_priority_merged", "合并");
        m.insert("docs.scopes_when_heading", "何时使用哪种？");
        m.insert("docs.scopes_use_global", "使用全局用于");
        m.insert("docs.scopes_global_1", "个人编码风格偏好");
        m.insert("docs.scopes_global_2", "首选语言和框架默认设置");
        m.insert("docs.scopes_global_3", "提交消息格式");
        m.insert("docs.scopes_global_4", "编辑器/IDE 集成设置");
        m.insert("docs.scopes_global_5", "跨所有项目使用的 MCP 服务器");
        m.insert("docs.scopes_use_project", "使用项目级用于");
        m.insert("docs.scopes_project_1", "技术栈文档和约束");
        m.insert("docs.scopes_project_2", "团队编码约定");
        m.insert("docs.scopes_project_3", "特定领域规则（安全、合规）");
        m.insert("docs.scopes_project_4", "项目特定 Skills 和工作流");
        m.insert("docs.scopes_project_5", "CI/CD Hooks 和自动化");

        // ── Docs: Optimization Guide ──
        m.insert("docs.toc_optimization", "优化指南");
        m.insert("docs.opt_heading", "优化指南");
        m.insert("docs.opt_callout", "来自分析的个性化提示深度解析。每个部分介绍某个模式为何重要以及如何改进，并附有 Anthropic 官方文档链接。");
        m.insert("docs.opt_why", "为什么：");
        m.insert("docs.opt_how", "如何做：");
        m.insert("docs.opt_task_heading", "使用 Task 工具的并行代理");
        m.insert("docs.opt_task_why", "Task 工具启动并行工作的专业子代理。对于复杂的多步骤工作（研究、代码探索、测试），子代理可以同时运行而不是依次运行，从而大大减少总时间。");
        m.insert("docs.opt_task_how", "Claude Code 在识别到并行化机会时会自动使用 Task 工具。你也可以明确请求：\u{201c}并行研究 X 和 Y\u{201d}或\u{201c}修复 bug 的同时运行测试。\u{201d}每个代理获得自己的上下文窗口，使大型代码库的探索更加高效。");
        m.insert("docs.opt_task_link", "Anthropic Docs：最佳实践 \u{2192}");
        m.insert("docs.opt_hooks_heading", "使用 Hooks 自动化");
        m.insert("docs.opt_hooks_why", "Hooks 是在 Claude 使用工具前后自动运行的 shell 命令。没有 Hooks，你需要手动运行格式化器、检查器和测试。有了 Hooks，每次文件写入可以自动格式化，每次提交可以自动测试。");
        m.insert("docs.opt_hooks_how", "在 ~/.claude/settings.json 的\u{201c}hooks\u{201d}键下配置 Hooks。使用 PreToolUse 在工具执行前运行操作（例如：写入前格式化代码）。使用 PostToolUse 在更改后进行验证（例如：编辑后 lint）。使用 Stop 在 Claude 完成时运行检查。");
        m.insert("docs.opt_hooks_link", "Anthropic Docs：Hooks \u{2192}");
        m.insert("docs.opt_sessions_heading", "最佳会话时长");
        m.insert("docs.opt_sessions_why", "长会话会积累稀释 Claude 注意力的上下文。在许多消息之后，先前的指令变得不那么突出。随着上下文窗口被对话历史填满，Token 成本也会增加。");
        m.insert("docs.opt_sessions_how", "将复杂工作拆分为专注的会话。使用 /clear 在会话内重置上下文。对于多步骤项目，使用计划文件（Claude 编写计划，然后在专注的会话中执行步骤）。每个新会话都以对当前任务的最大关注度开始。");
        m.insert("docs.opt_sessions_link", "Anthropic Docs：最佳实践 \u{2192}");
        m.insert("docs.opt_cost_heading", "成本优化");
        m.insert("docs.opt_cost_why", "不同的 Claude 模型成本差异很大。Opus 擅长复杂推理但每个 Token 成本更高。Haiku 快速且便宜，适合简单任务。为每个任务使用合适的模型可以大幅降低成本。");
        m.insert("docs.opt_cost_how", "使用 /model 在会话中切换模型。Haiku 适用于：快速修复、代码格式化、简单问题。Sonnet 适用于：中等编码任务、审查。Opus 适用于：架构设计、复杂调试、多文件重构。分析页面显示按模型划分的成本明细。");
        m.insert("docs.opt_cost_link", "Anthropic Docs：Claude Code 概览 \u{2192}");
        m.insert("docs.opt_write_heading", "Write vs Edit：选择正确的工具");
        m.insert("docs.opt_write_why", "Write 工具一次创建整个文件，而 Edit 对现有文件进行有针对性的更改。对于新文件，Write 更高效，因为 Edit 需要先读取文件然后指定精确的字符串替换。");
        m.insert("docs.opt_write_how", "Claude 通常会自动选择正确的工具。但如果你从头创建新文件（模板、样板、配置），明确说\u{201c}创建一个新文件\u{201d}有助于 Claude 选择 Write。对于现有代码的修改，始终首选 Edit。");
        m.insert("docs.opt_models_heading", "模型多样性");
        m.insert("docs.opt_models_why", "对所有任务使用单一模型意味着要么为简单工作多付费（所有事都用 Opus），要么对复杂任务动力不足（所有事都用 Haiku）。每个模型系列都有优势：Haiku 注重速度，Sonnet 注重平衡，Opus 注重深度推理。");
        m.insert("docs.opt_models_how", "使用 /model 命令切换模型。一个好的模式：从 Opus 开始进行规划和架构设计，切换到 Sonnet 进行实现，使用 Haiku 进行快速修复和格式化。分析页面显示你最常使用的模型。");
        m.insert("docs.opt_models_link", "Anthropic Docs：Claude Code 概览 \u{2192}");
        m.insert("docs.opt_git_heading", "Git 集成");
        m.insert("docs.opt_git_why", "Claude Code 可以直接进行暂存、提交、推送和创建 PR。没有 Git 集成，你需要在每个 Claude 会话后手动提交，这会打断工作流程并有忘记重要更改的风险。");
        m.insert("docs.opt_git_how", "只需请求 Claude 提交：\u{201c}提交这些更改\u{201d}或使用 /commit。Claude 会编写描述性的提交消息，仅暂存相关文件，并遵守 pre-commit hooks。对于 PR，请求 Claude\u{201c}创建一个 PR\u{201d}\u{2014}它使用 gh CLI 推送并打开带有摘要的拉取请求。");
        m.insert("docs.opt_git_link", "Anthropic Docs：最佳实践 \u{2192}");
        m.insert("docs.opt_churn_heading", "减少代码变动");
        m.insert("docs.opt_churn_why", "当删除的行多于添加的行时，通常意味着 Claude 写了需要重写的代码。这浪费了 Token 和时间。常见原因：模糊的提示、缺少上下文、或 Claude 猜测需求。");
        m.insert("docs.opt_churn_how", "在提示中要具体：引用现有文件、命名精确的函数、描述预期行为。使用 CLAUDE.md 记录约定，这样 Claude 就不会猜测。对于复杂更改，要求 Claude 先制定计划（/plan）再实施。在 Claude 开始编码之前审查其计划。");
        m.insert("docs.opt_churn_link", "Anthropic Docs：最佳实践 \u{2192}");

        // ── Docs: Tips & Best Practices ──
        m.insert("docs.bestpractices_heading", "技巧和最佳实践");
        m.insert("docs.bestpractices_hygiene_heading", "配置卫生");
        m.insert("docs.bestpractices_hygiene_1", "定期运行 ClaudeAdmin 的配置健康检查。它可以检测重复规则、臃肿的权限列表和缺失的 CLAUDE.md 文件。");
        m.insert("docs.bestpractices_hygiene_2", "不要重复自己：如果规则已在全局存在，不要将其复制到项目 CLAUDE.md 中。使用范围系统。");
        m.insert("docs.bestpractices_hygiene_3", "保持权限列表整洁。随着时间推移，Claude Code 会累积数百个允许/拒绝条目。使用权限页面进行清理。");
        m.insert("docs.bestpractices_tokens_heading", "Token 效率");
        m.insert("docs.bestpractices_tokens_1", "CLAUDE.md、规则、Skills（触发时）以及 MEMORY.md 的前 200 行中的所有内容都计入上下文窗口。请保持简洁。");
        m.insert("docs.bestpractices_tokens_2", "将详细的参考材料移到 Skill 参考文件或记忆主题文件中 \u{2013} 它们仅在需要时加载。");
        m.insert("docs.bestpractices_tokens_3", "使用数据分析页面监控跨项目和会话的 Token 使用量。");
        m.insert("docs.bestpractices_team_heading", "团队协作");
        m.insert("docs.bestpractices_team_1", "将 .claude/rules/ 和 .claude/skills/ 提交到 Git。这会在团队中共享约定。");
        m.insert("docs.bestpractices_team_2", "使用 .claude/settings.json 存储团队设置，使用 .claude/settings.local.json 存储个人覆盖。");
        m.insert("docs.bestpractices_team_3", "项目根目录中的 CLAUDE.md 是团队与 Claude 的契约。像对待文档一样对待它 \u{2013} 在 PR 中审查变更。");
        m.insert("docs.bestpractices_debug_heading", "调试 Claude 行为");
        m.insert("docs.bestpractices_debug_1", "如果 Claude 忽略了某条规则，请检查设置层级页面查看各层之间是否存在冲突设置。");
        m.insert("docs.bestpractices_debug_2", "记忆可能导致意外行为。审查自动生成的条目 \u{2013} Claude 可能记住了变通方案而非正确方法。");
        m.insert("docs.bestpractices_debug_3", "使用会话页面审查过去的对话，了解 Claude 在\u{201c}思考\u{201d}什么。");

        // ── Docs: Links ──
        m.insert("docs.links_heading", "Anthropic 官方文档");
        m.insert("docs.links_text", "这些链接指向 Anthropic 维护的权威文档。ClaudeAdmin 建立在这些规范之上。");
        m.insert("docs.link_overview_title", "Claude Code 概览");
        m.insert("docs.link_overview_desc", "入门、安装和基本用法");
        m.insert("docs.link_memory_title", "记忆和 CLAUDE.md");
        m.insert("docs.link_memory_desc", "Claude 如何存储和使用项目记忆");
        m.insert("docs.link_skills_title", "Skills");
        m.insert("docs.link_skills_desc", "创建和管理可复用 Skills");
        m.insert("docs.link_settings_title", "设置");
        m.insert("docs.link_settings_desc", "配置层级和选项");
        m.insert("docs.link_hooks_title", "Hooks");
        m.insert("docs.link_hooks_desc", "使用 Shell 命令的事件驱动自动化");
        m.insert("docs.link_mcp_title", "MCP 服务器");
        m.insert("docs.link_mcp_desc", "通过外部工具扩展 Claude");
        m.insert("docs.link_bestpractices_title", "最佳实践");
        m.insert("docs.link_bestpractices_desc", "高效使用 Claude Code 的技巧");
        m.insert("docs.link_mcp_spec_title", "MCP 规范");
        m.insert("docs.link_mcp_spec_desc", "Model Context Protocol 标准");

        // ── Licenses ──
        m.insert("sidebar.licenses", "\u{8bb8}\u{53ef}\u{8bc1}");
        m.insert("licenses.title", "\u{8bb8}\u{53ef}\u{8bc1}");
        m.insert("licenses.subtitle", "\u{5f00}\u{6e90}\u{8bb8}\u{53ef}\u{8bc1}\u{548c}\u{4f9d}\u{8d56}\u{9879}");
        m.insert("licenses.own_license", "ClaudeAdmin \u{8bb8}\u{53ef}\u{8bc1}");
        m.insert("licenses.third_party", "\u{7b2c}\u{4e09}\u{65b9}\u{4f9d}\u{8d56}\u{9879}");
        m.insert("licenses.col_name", "Crate");
        m.insert("licenses.col_version", "\u{7248}\u{672c}");
        m.insert("licenses.col_license", "\u{8bb8}\u{53ef}\u{8bc1}");
        m.insert("licenses.search_placeholder", "\u{641c}\u{7d22}\u{4f9d}\u{8d56}\u{9879}...");
        m.insert("licenses.loading", "\u{52a0}\u{8f7d}\u{8bb8}\u{53ef}\u{8bc1}\u{4e2d}");
        m.insert("licenses.count", "\u{4e2a}\u{4f9d}\u{8d56}\u{9879}");
        m.insert("licenses.mit_copyright", "Copyright (c) 2024-2026");
        m.insert("licenses.mit_line1", "特此免费授予获得本软件及相关文档文件（以下简称\u{201c}软件\u{201d}）副本的任何人不受限制地处理本软件的权利，包括但不限于使用、复制、修改、合并、发布、分发、再许可和/或销售本软件副本的权利，以及允许获得本软件的人这样做，但须符合以下条件：");
        m.insert("licenses.mit_line2", "上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。");
        m.insert("licenses.mit_line3", "本软件按\u{201c}原样\u{201d}提供，不附带任何明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对因本软件或本软件的使用或其他交易而产生的任何索赔、损害或其他责任承担责任，无论是在合同诉讼、侵权行为还是其他方面。");
        m.insert("licenses.direct_deps", "直接依赖");
        m.insert("licenses.transitive_deps", "间接依赖");
        m.insert("licenses.overview", "许可证概览");
        m.insert("licenses.direct_count", "直接");
        m.insert("licenses.transitive_count", "间接依赖");

        // ── Components ──
        m.insert("component.modal.close", "关闭");
        m.insert("component.editor.save", "保存");
        m.insert("component.editor.saved", "已保存！");
        m.insert("component.json_editor.valid", "有效的 JSON");
        m.insert("component.json_editor.invalid", "无效的 JSON");
        m.insert("component.frontmatter.description", "描述");
        m.insert("component.frontmatter.user_invocable", "用户可调用");
        m.insert("component.advisor.title", "项目顾问");
        m.insert("component.advisor.analyze", "分析");
        m.insert("component.advisor.analyzing", "分析中...");
        m.insert("component.advisor.no_api_key", "未配置 ANTHROPIC_API_KEY");
        m.insert("component.advisor.error", "加载建议时出错");
        m.insert("component.advisor.summary", "摘要");
        m.insert("component.advisor.recommendations", "建议");
        m.insert("component.advisor.apply", "应用");
        m.insert("component.advisor.applied", "完成！");
        m.insert("component.advisor.analyze_project", "分析项目");
        m.insert("component.advisor.hint", "Claude 会分析您的项目并提供建议");
        m.insert("component.advisor.loading", "Claude 正在分析您的项目");
        m.insert("component.advisor.assessment", "项目评估");
        m.insert("component.advisor.show_preview", "显示预览");
        m.insert("component.advisor.category_tip", "提示");
        m.insert("component.frontmatter.user_invocable_label", "用户可调用（可通过 /command 调用）");
        m.insert("component.editor.saving", "保存中...");

        // ── Common ──
        m.insert("common.error", "错误");
        m.insert("common.loading", "加载中");
        m.insert("common.save", "保存");
        m.insert("common.delete", "删除");
        m.insert("common.cancel", "取消");
        m.insert("common.close", "关闭");
        m.insert("common.yes", "是");
        m.insert("common.no", "否");
        m.insert("common.ok", "确定");
        m.insert("common.error_prefix", "错误：");
        m.insert("common.invalid_json", "无效的 JSON：");

        // -- New features --
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
        m.insert("backups.confirm_restore", "Are you sure you want to restore this backup?");
        m.insert("backups.confirm_delete", "Are you sure you want to delete this backup?");
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
        m.insert("sidebar.search", "Search");
        m.insert("search.title", "Search");
        m.insert("search.subtitle", "Search across all configuration");
        m.insert("search.placeholder", "Search skills, rules, settings...");
        m.insert("search.loading", "Searching...");
        m.insert("search.no_results", "No results found");
        m.insert("search.col_type", "Type");
        m.insert("search.col_name", "Name");
        m.insert("search.col_snippet", "Match");
        m.insert("sidebar.templates", "Templates");
        m.insert("templates.title", "Config Templates");
        m.insert("templates.subtitle", "Pre-built configuration starter packs");
        m.insert("templates.loading", "Loading templates");
        m.insert("templates.apply", "Apply");
        m.insert("templates.applied", "Applied!");
        m.insert("templates.confirm", "Apply this template?");
        m.insert("theme.toggle", "Toggle theme");
        m.insert("theme.light", "Light");
        m.insert("theme.dark", "Dark");
        m.insert("settings.notification", "Notification");
        m.insert("settings.stop", "Stop");
        m.insert("settings.user_prompt_submit", "UserPromptSubmit");
        m.insert("settings.session_start", "SessionStart");

        // ── Sidebar (new) ──
        m.insert("sidebar.agents", "代理");
        m.insert("sidebar.plugins", "插件");
        m.insert("sidebar.launch_profiles", "启动配置");
        m.insert("sidebar.system_prompts", "系统提示词");
        m.insert("sidebar.worktrees", "工作树");

        // ── Agents ──
        m.insert("agents.title", "代理");
        m.insert("agents.subtitle", "管理自定义代理配置");
        m.insert("agents.tab_overview", "概览");
        m.insert("agents.tab_create", "新建");
        m.insert("agents.loading", "加载中...");
        m.insert("agents.empty", "未找到代理");
        m.insert("agents.name", "名称");
        m.insert("agents.description", "描述");
        m.insert("agents.prompt", "提示词");
        m.insert("agents.model", "模型");
        m.insert("agents.allowed_tools", "允许的工具");
        m.insert("agents.disallowed_tools", "禁止的工具");
        m.insert("agents.custom_instructions", "自定义指令");
        m.insert("agents.source", "来源");
        m.insert("agents.create_success", "代理已创建");
        m.insert("agents.update_success", "代理已更新");
        m.insert("agents.delete_confirm", "确定要删除此代理吗？");
        m.insert("agents.delete_success", "代理已删除");
        m.insert("agents.copy_cli", "复制 CLI 命令");
        m.insert("agents.copied", "已复制");

        // ── Plugins ──
        m.insert("plugins.title", "插件");
        m.insert("plugins.subtitle", "管理已安装的插件");
        m.insert("plugins.loading", "加载中...");
        m.insert("plugins.empty", "未找到插件");
        m.insert("plugins.name", "名称");
        m.insert("plugins.version", "版本");
        m.insert("plugins.path", "路径");
        m.insert("plugins.status", "状态");
        m.insert("plugins.enabled", "已启用");
        m.insert("plugins.disabled", "已禁用");
        m.insert("plugins.install", "安装");
        m.insert("plugins.install_path", "安装路径");
        m.insert("plugins.install_success", "插件已安装");
        m.insert("plugins.delete_confirm", "确定要删除此插件吗？");
        m.insert("plugins.delete_success", "插件已删除");

        // ── Launch Profiles ──
        m.insert("launch_profiles.title", "启动配置");
        m.insert("launch_profiles.subtitle", "管理 Claude Code 启动配置");
        m.insert("launch_profiles.tab_profiles", "配置列表");
        m.insert("launch_profiles.tab_create", "新建");
        m.insert("launch_profiles.tab_presets", "预设");
        m.insert("launch_profiles.loading", "加载中...");
        m.insert("launch_profiles.empty", "未找到配置");
        m.insert("launch_profiles.name", "名称");
        m.insert("launch_profiles.description", "描述");
        m.insert("launch_profiles.model", "模型");
        m.insert("launch_profiles.effort", "推理级别");
        m.insert("launch_profiles.permission_mode", "权限模式");
        m.insert("launch_profiles.allowed_tools", "允许的工具");
        m.insert("launch_profiles.disallowed_tools", "禁止的工具");
        m.insert("launch_profiles.system_prompt", "系统提示词");
        m.insert("launch_profiles.append_system_prompt", "追加系统提示词");
        m.insert("launch_profiles.max_budget", "最大预算");
        m.insert("launch_profiles.fallback_model", "备用模型");
        m.insert("launch_profiles.debug_filter", "调试过滤器");
        m.insert("launch_profiles.add_dirs", "添加目录");
        m.insert("launch_profiles.copy_command", "复制命令");
        m.insert("launch_profiles.copied", "已复制");
        m.insert("launch_profiles.create_success", "配置已创建");
        m.insert("launch_profiles.delete_confirm", "确定要删除此配置吗？");
        m.insert("launch_profiles.delete_success", "配置已删除");
        m.insert("launch_profiles.use_template", "使用模板");
        m.insert("launch_profiles.preset_code_review", "代码审查");
        m.insert("launch_profiles.preset_code_review_desc", "只读代码审查配置");
        m.insert("launch_profiles.preset_full_dev", "完整开发");
        m.insert("launch_profiles.preset_full_dev_desc", "拥有完整权限的开发配置");
        m.insert("launch_profiles.preset_quick_fix", "快速修复");
        m.insert("launch_profiles.preset_quick_fix_desc", "用于小修改的轻量配置");
        m.insert("launch_profiles.preset_research", "研究");
        m.insert("launch_profiles.preset_research_desc", "代码库调查用配置");
        m.insert("launch_profiles.preset_budget", "预算限制");
        m.insert("launch_profiles.preset_budget_desc", "带成本限制的配置");

        // ── System Prompts ──
        m.insert("system_prompts.title", "系统提示词");
        m.insert("system_prompts.subtitle", "管理可复用的系统提示词");
        m.insert("system_prompts.tab_library", "库");
        m.insert("system_prompts.tab_create", "新建");
        m.insert("system_prompts.loading", "加载中...");
        m.insert("system_prompts.empty", "未找到系统提示词");
        m.insert("system_prompts.name", "名称");
        m.insert("system_prompts.content", "内容");
        m.insert("system_prompts.modified", "修改时间");
        m.insert("system_prompts.create_success", "系统提示词已创建");
        m.insert("system_prompts.update_success", "系统提示词已更新");
        m.insert("system_prompts.delete_confirm", "确定要删除此系统提示词吗？");
        m.insert("system_prompts.delete_success", "系统提示词已删除");
        m.insert("system_prompts.copy_cli", "复制 CLI 命令");
        m.insert("system_prompts.copied", "已复制");
        m.insert("system_prompts.use_template", "使用模板");
        m.insert("system_prompts.template_reviewer", "代码审查员");
        m.insert("system_prompts.template_docs", "文档编写者");
        m.insert("system_prompts.template_security", "安全审计");
        m.insert("system_prompts.template_refactor", "重构");

        // ── Worktrees ──
        m.insert("worktrees.title", "工作树");
        m.insert("worktrees.subtitle", "管理 Git 工作树");
        m.insert("worktrees.loading", "加载中...");
        m.insert("worktrees.empty", "未找到工作树");
        m.insert("worktrees.project_path", "项目路径");
        m.insert("worktrees.branch_name", "分支名称");
        m.insert("worktrees.create", "创建");
        m.insert("worktrees.create_success", "工作树已创建");
        m.insert("worktrees.delete_confirm", "确定要删除此工作树吗？");
        m.insert("worktrees.delete_success", "工作树已删除");
        m.insert("worktrees.col_branch", "分支");
        m.insert("worktrees.col_path", "路径");
        m.insert("worktrees.col_head", "HEAD");
        m.insert("worktrees.col_status", "状态");
        m.insert("worktrees.col_actions", "操作");
        m.insert("worktrees.badge_main", "主分支");
        m.insert("worktrees.badge_bare", "裸仓库");
        m.insert("worktrees.badge_worktree", "工作树");

        // ── 代理（表单字段） ──
        m.insert("agents.field_name", "名称");
        m.insert("agents.field_description", "描述");
        m.insert("agents.field_prompt", "提示词");
        m.insert("agents.field_model", "模型");
        m.insert("agents.field_allowed_tools", "允许的工具");
        m.insert("agents.field_disallowed_tools", "禁止的工具");
        m.insert("agents.field_custom_instructions", "自定义指令");
        m.insert("agents.tools_hint", "逗号分隔列表，例如 Bash, Edit, Read");
        m.insert("agents.tools_placeholder", "Bash, Edit, Read, Write...");
        m.insert("agents.create_btn", "创建代理");
        m.insert("agents.editing", "编辑中");
        m.insert("agents.save_success", "代理已更新");
        m.insert("agents.confirm_delete", "删除代理");
        m.insert("agents.name_required", "名称为必填项");
        m.insert("agents.model_default", "默认（继承）");
        m.insert("agents.name_placeholder", "例如 code-reviewer");
        m.insert("agents.desc_placeholder", "这个代理做什么？");
        m.insert("agents.prompt_placeholder", "你是一个代码审查员...");
        m.insert("agents.instructions_placeholder", "附加指令...");

        // ── 插件（缺失） ──
        m.insert("plugins.actions", "操作");

        // ── 启动配置（缺失） ──
        m.insert("launch_profiles.save_btn", "创建配置");

        // ── 通用（缺失） ──
        m.insert("common.edit", "编辑");
        m.insert("common.saved", "已保存");

        // ── Timeline ──
        m.insert("sidebar.timeline", "时间线");
        m.insert("timeline.title", "时间线");
        m.insert("timeline.subtitle", "基于 Git 的 Claude 配置版本历史");
        m.insert("timeline.files", "文件");
        m.insert("timeline.restore", "恢复");
        m.insert("timeline.confirm_restore_title", "恢复配置");
        m.insert("timeline.confirm_restore_msg", "这将把所有文件恢复到所选提交。当前状态的备份将会先被保存。是否继续？");
        m.insert("timeline.empty", "暂无时间线条目。编辑配置后，更改将显示在此处。");
        m.insert("timeline.error", "加载时间线失败");
        m.insert("timeline.select_commit", "选择一个提交以查看其更改");
        m.insert("timeline.diff_for", "更改内容");

        // ── Effective Config ──
        m.insert("effective.total_rules", "规则总数");
        m.insert("effective.total_skills", "技能总数");
        m.insert("effective.mcp_servers", "MCP 服务器");
        m.insert("effective.hooks", "Hooks");
        m.insert("effective.memory_files", "记忆文件");
        m.insert("effective.inherited", "继承");
        m.insert("effective.own", "自有");
        m.insert("effective.rules", "规则");
        m.insert("effective.skills", "技能");
        m.insert("effective.conflicts", "冲突");
        m.insert("effective.none", "无");
        m.insert("effective.invocable", "可调用");

        // ── 帮助聊天 ──
        m.insert("help_chat.title", "帮助");
        m.insert("help_chat.placeholder", "询问关于此页面的问题...");
        m.insert("help_chat.send", "发送");
        m.insert("help_chat.thinking", "思考中...");
        m.insert("help_chat.clear", "新对话");
        m.insert("help_chat.no_api_key", "帮助聊天需要API密钥。请在设置中配置。");

        m
    })
}
