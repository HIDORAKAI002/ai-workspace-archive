use std::collections::HashMap;
use std::sync::OnceLock;

static TRANSLATIONS: OnceLock<HashMap<&'static str, &'static str>> = OnceLock::new();

pub fn translations() -> &'static HashMap<&'static str, &'static str> {
    TRANSLATIONS.get_or_init(|| {
        let mut m = HashMap::new();

        // ── App ──
        m.insert("app.title", "ClaudeAdmin");
        m.insert("app.subtitle", "구성 관리자");

        // ── Sidebar ──
        m.insert("sidebar.overview", "개요");
        m.insert("sidebar.dashboard", "대시보드");
        m.insert("sidebar.analytics", "분석");
        m.insert("sidebar.manage", "관리");
        m.insert("sidebar.projects", "프로젝트");
        m.insert("sidebar.global_skills", "글로벌 Skills");
        m.insert("sidebar.skill_browser", "Skill 브라우저");
        m.insert("sidebar.global_rules", "글로벌 규칙");
        m.insert("sidebar.plans", "플랜");
        m.insert("sidebar.mcp_servers", "MCP 서버");
        m.insert("sidebar.mcp_browser", "MCP 브라우저");
        m.insert("sidebar.security", "보안");
        m.insert("sidebar.permissions", "권한");
        m.insert("sidebar.config_health", "구성 상태 점검");
        m.insert("sidebar.system", "시스템");
        m.insert("sidebar.settings", "설정");
        m.insert("sidebar.sessions", "세션");
        m.insert("sidebar.github", "GitHub");
        m.insert("sidebar.learn", "학습");
        m.insert("sidebar.docs", "문서");
        m.insert("sidebar.help", "시스템 정보");

        // ── Dashboard ──
        m.insert("dashboard.title", "대시보드");
        m.insert("dashboard.subtitle", "Claude Code 구성 개요");
        m.insert("dashboard.projects", "프로젝트");
        m.insert("dashboard.global_skills", "글로벌 Skills");
        m.insert("dashboard.global_rules", "글로벌 규칙");
        m.insert("dashboard.mcp_servers", "MCP 서버");
        m.insert("dashboard.plans", "플랜");
        m.insert("dashboard.config_health", "구성 상태 점검");
        m.insert("dashboard.recent_projects", "최근 프로젝트");
        m.insert("dashboard.recent_changes", "최근 변경사항");
        m.insert("dashboard.no_recent_changes", "최근 변경사항 없음");
        m.insert("dashboard.change_action", "작업");
        m.insert("dashboard.change_resource", "리소스");
        m.insert("dashboard.change_time", "시간");
        m.insert("dashboard.loading", "로딩 중");
        m.insert("dashboard.error_loading", "대시보드 로딩 오류");
        m.insert("dashboard.col_name", "이름");
        m.insert("dashboard.col_claude_md", "CLAUDE.md");
        m.insert("dashboard.col_skills", "Skills");
        m.insert("dashboard.col_rules", "규칙");
        m.insert("dashboard.col_memory", "메모리");
        m.insert("dashboard.yes", "있음");

        // ── MCP ──
        m.insert("mcp.title", "MCP 서버");
        m.insert("mcp.subtitle", "Claude Code의 Model Context Protocol 서버 관리");
        m.insert("mcp.tab_servers", "서버");
        m.insert("mcp.tab_health", "상태 점검");
        m.insert("mcp.tab_add", "새 서버");
        m.insert("mcp.tab_browse", "카탈로그 찾아보기");
        m.insert("mcp.loading", "MCP 서버 로딩 중");
        m.insert("mcp.no_servers", "구성된 MCP 서버가 없습니다");
        m.insert("mcp.no_servers_hint", "'새 서버' 탭이나 MCP 브라우저에서 서버를 추가하세요.");
        m.insert("mcp.select_server", "목록에서 서버를 선택하여 구성을 보고 편집하세요.");
        m.insert("mcp.no_servers_configured", "구성된 서버가 없습니다.");
        m.insert("mcp.check_health", "상태 점검");
        m.insert("mcp.save", "저장");
        m.insert("mcp.delete", "삭제");
        m.insert("mcp.saved", "저장되었습니다!");
        m.insert("mcp.deleted", "삭제되었습니다!");
        m.insert("mcp.read_only", "읽기 전용");
        m.insert("mcp.read_only_hint", "이 서버는 외부에서 관리되며 여기서 편집할 수 없습니다.");
        m.insert("mcp.health.title", "MCP 서버 상태");
        m.insert("mcp.health.check_all", "모든 서버 점검");
        m.insert("mcp.health.checking", "점검 중...");
        m.insert("mcp.health.description", "각 MCP 서버 프로세스를 시작하고 JSON-RPC initialize 및 tools/list를 전송하여 결과를 보고합니다. 타임아웃: 서버당 10초.");
        m.insert("mcp.health.col_name", "이름");
        m.insert("mcp.health.col_source", "소스");
        m.insert("mcp.health.col_status", "상태");
        m.insert("mcp.health.col_server_info", "서버 정보");
        m.insert("mcp.health.col_tools", "도구");
        m.insert("mcp.health.col_duration", "소요 시간");
        m.insert("mcp.health.running", "실행 중");
        m.insert("mcp.health.error", "오류");
        m.insert("mcp.health.timeout", "타임아웃");
        m.insert("mcp.health.unsupported", "지원되지 않음");
        m.insert("mcp.health.unknown", "알 수 없음");
        m.insert("mcp.add.title", "MCP 서버 추가");
        m.insert("mcp.add.description", "글로벌 ~/.claude.json 구성에 새 MCP 서버를 추가합니다.");
        m.insert("mcp.add.name_label", "서버 이름");
        m.insert("mcp.add.name_placeholder", "예: my-server");
        m.insert("mcp.add.config_label", "서버 구성 (JSON)");
        m.insert("mcp.add.mode_form", "폼");
        m.insert("mcp.add.mode_json", "고급 JSON");
        m.insert("mcp.add.command_label", "명령어");
        m.insert("mcp.add.args_label", "인수");
        m.insert("mcp.add.args_hint", "한 줄에 하나의 인수");
        m.insert("mcp.add.env_label", "환경 변수");
        m.insert("mcp.add.env_hint", "KEY=VALUE 형식, 한 줄에 하나");
        m.insert("mcp.add.submit", "서버 추가");
        m.insert("mcp.add.name_required", "서버 이름을 입력하세요");
        m.insert("mcp.browse.title", "MCP 서버 카탈로그");
        m.insert("mcp.browse.description", "인기 MCP 서버를 찾아보고 한 번의 클릭으로 설치하세요. 설치 전 구성을 확인할 수 있습니다.");
        m.insert("mcp.browse.installed", "설치됨");
        m.insert("mcp.browse.install", "설치");
        m.insert("mcp.browse.show_config", "구성 보기");
        m.insert("mcp.browse.hide_config", "구성 숨기기");
        m.insert("mcp.browse.config_hint", "설치 전에 구성을 확인하고 편집하세요. 필요한 API 키와 경로를 입력하세요.");
        m.insert("mcp.browse.cat_system", "시스템 & 파일");
        m.insert("mcp.browse.cat_database", "데이터베이스");
        m.insert("mcp.browse.cat_api", "API");
        m.insert("mcp.browse.cat_specialized", "전문 도구");
        m.insert("mcp.browse.npm", "npm");
        m.insert("mcp.source.claude_code", "Claude Code");
        m.insert("mcp.source.claude_desktop", "Claude Desktop");

        // ── MCP Tools (Feature 7) ──
        m.insert("mcp.tab_tools", "도구 탐색기");
        m.insert("mcp.tools.title", "도구 탐색기");
        m.insert("mcp.tools.description", "모든 MCP 서버의 모든 도구");
        m.insert("mcp.tools.search", "도구 검색...");
        m.insert("mcp.tools.parameters", "매개변수 (JSON Schema)");
        m.insert("mcp.tools.required", "필수");
        m.insert("mcp.tools.no_tools", "도구를 찾을 수 없습니다. 먼저 상태 점검을 실행하세요.");
        m.insert("mcp.tools.from_server", "서버");

        // ── MCP Browser ──
        m.insert("mcp_browser.title", "MCP 브라우저");
        m.insert("mcp_browser.subtitle", "Claude Code용 MCP 서버를 탐색하고 설치");
        m.insert("mcp_browser.search_placeholder", "MCP 서버 검색...");
        m.insert("mcp_browser.loading", "MCP 카탈로그 로딩 중");
        m.insert("mcp_browser.no_results", "MCP 서버를 찾을 수 없습니다");
        m.insert("mcp_browser.installed", "설치됨");
        m.insert("mcp_browser.install", "설치");
        m.insert("mcp_browser.needs_api_key", "API 키 필요");
        m.insert("mcp_browser.install_success", "설치에 성공했습니다!");
        m.insert("mcp_browser.install_failed", "설치에 실패했습니다");

        // ── Projects ──
        m.insert("projects.tab_projects", "프로젝트");
        m.insert("projects.tab_health", "건강 개요");
        m.insert("projects.title", "프로젝트");
        m.insert("projects.subtitle", "~/.claude.json에 등록된 모든 프로젝트");
        m.insert("projects.loading", "로딩 중");
        m.insert("projects.error_loading", "프로젝트 로딩 오류: ");
        m.insert("projects.col_name", "이름");
        m.insert("projects.col_path", "경로");
        m.insert("projects.col_claude_md", "CLAUDE.md");
        m.insert("projects.col_skills", "Skills");
        m.insert("projects.col_rules", "규칙");
        m.insert("projects.col_memory", "메모리");
        m.insert("projects.yes", "있음");

        // ── Project Detail ──
        m.insert("project_detail.loading", "프로젝트 상세 정보 로딩 중");
        m.insert("project_detail.error_loading", "프로젝트 로딩 오류");
        m.insert("project_detail.tab_advisor", "어드바이저");
        m.insert("project_detail.tab_claude_md", "CLAUDE.md");
        m.insert("project_detail.tab_skills", "Skills");
        m.insert("project_detail.tab_rules", "규칙");
        m.insert("project_detail.tab_memory", "메모리");
        m.insert("project_detail.tab_permissions", "권한");
        m.insert("project_detail.tab_effective", "유효 설정");
        m.insert("project_detail.tab_health", "상태");
        m.insert("project_detail.no_claude_md", "CLAUDE.md를 찾을 수 없습니다");
        m.insert("project_detail.no_claude_md_hint", "프로젝트 디렉터리에 CLAUDE.md를 생성하여 Claude Code에 지침을 제공하세요.");
        m.insert("project_detail.no_skills", "이 프로젝트에 Skills가 없습니다");
        m.insert("project_detail.no_rules", "이 프로젝트에 규칙이 없습니다");
        m.insert("project_detail.no_memory", "이 프로젝트에 메모리가 없습니다");
        m.insert("project_detail.save", "저장");
        m.insert("project_detail.saved", "저장되었습니다!");
        m.insert("project_detail.skill_scope", "범위");
        m.insert("project_detail.permissions_loading", "권한 로딩 중...");
        m.insert("project_detail.permissions_error", "권한 로딩 오류");
        m.insert("project_detail.permissions_entries", "항목");
        m.insert("project_detail.permissions_col_tool", "도구");
        m.insert("project_detail.permissions_col_command", "명령어");
        m.insert("project_detail.permissions_no_entries", "권한 항목이 없습니다");
        m.insert("project_detail.health_loading", "상태 계산 중...");
        m.insert("project_detail.health_error", "상태 데이터 로딩 오류");
        m.insert("project_detail.health_score", "상태 점수");
        m.insert("project_detail.health_claude_md", "CLAUDE.md 있음");
        m.insert("project_detail.health_memory", "메모리 있음");
        m.insert("project_detail.health_permissions", "권한");
        m.insert("project_detail.health_security_issues", "보안 문제");
        m.insert("project_detail.health_duplicated_rules", "중복 규칙");
        m.insert("project_detail.health_no_security_issues", "보안 문제가 발견되지 않았습니다");
        m.insert("project_detail.health_col_text", "텍스트");
        m.insert("project_detail.health_col_found_in", "발견 위치");
        m.insert("project_detail.health_col_also_in", "다른 위치");
        m.insert("project_detail.health_permission_entries", "권한 항목");
        m.insert("project_detail.permissions_col_index", "#");
        m.insert("project_detail.permissions_col_status", "상태");
        m.insert("project_detail.permissions_fragment", "프래그먼트");
        m.insert("project_detail.permissions_ok", "OK");
        m.insert("project_detail.permissions_security_warnings", "건의 보안 경고");
        m.insert("project_detail.permissions_manage", "권한 관리");
        m.insert("project_detail.advisor_analyze", "프로젝트 분석");
        m.insert("project_detail.advisor_analyzing", "분석 중...");
        m.insert("project_detail.advisor_description", "Claude가 프로젝트를 분석하고 권장 사항을 제공합니다");
        m.insert("project_detail.advisor_loading", "Claude가 프로젝트를 분석 중입니다");
        m.insert("project_detail.advisor_summary", "프로젝트 평가");
        m.insert("project_detail.advisor_done", "완료!");
        m.insert("project_detail.advisor_preview", "미리보기 표시");
        m.insert("project_detail.advisor_category_tip", "팁");
        m.insert("project_detail.skills_col_name", "이름");
        m.insert("project_detail.skills_col_description", "설명");
        m.insert("project_detail.skills_col_invocable", "호출 가능");
        m.insert("project_detail.rules_col_name", "이름");
        m.insert("project_detail.rules_col_path", "경로");
        m.insert("project_detail.memory_col_file", "파일");
        m.insert("project_detail.memory_col_size", "크기");
        m.insert("project_detail.bytes", "바이트");
        m.insert("project_detail.unknown_tab", "알 수 없는 탭");

        // ── Project Profile (Feature 1) ──
        m.insert("project_detail.tab_profile", "프로필");
        m.insert("project_detail.profile_health", "상태 점수");
        m.insert("project_detail.profile_rules", "규칙");
        m.insert("project_detail.profile_skills", "Skills");
        m.insert("project_detail.profile_memory", "메모리");
        m.insert("project_detail.profile_mcp", "MCP 서버");
        m.insert("project_detail.profile_hooks", "Hooks");
        m.insert("project_detail.profile_conflicts", "충돌");
        m.insert("project_detail.profile_analyze", "심층 분석 실행");
        m.insert("project_detail.profile_no_mcp", "MCP 서버 없음");
        m.insert("project_detail.profile_global_scope", "글로벌");
        m.insert("project_detail.profile_project_scope", "프로젝트");

        // ── Global Skills ──
        m.insert("global_skills.tab_my_skills", "내 스킬");
        m.insert("global_skills.tab_browse", "탐색");
        m.insert("global_skills.tab_templates", "템플릿");
        m.insert("global_skills.title", "글로벌 Skills");
        m.insert("global_skills.subtitle", "~/.claude/skills/의 Skills 관리");
        m.insert("global_skills.loading", "Skills 로딩 중");
        m.insert("global_skills.no_skills", "글로벌 Skills를 찾을 수 없습니다");
        m.insert("global_skills.no_skills_hint", "~/.claude/skills/에 Skills를 생성하거나 Skill 브라우저를 사용하세요.");
        m.insert("global_skills.select_skill", "목록에서 Skill을 선택하세요.");
        m.insert("global_skills.col_skill", "Skill");
        m.insert("global_skills.col_invocable", "호출 가능");
        m.insert("global_skills.invocable", "호출 가능");
        m.insert("global_skills.not_invocable", "호출 불가");
        m.insert("global_skills.editing", "편집 중:");
        m.insert("global_skills.save", "저장");
        m.insert("global_skills.saved", "저장되었습니다!");
        m.insert("global_skills.delete", "삭제");
        m.insert("global_skills.deleted", "삭제되었습니다!");

        // ── Skill Builder (Feature 2) ──
        m.insert("global_skills.tab_create", "새로 만들기");
        m.insert("skill_builder.templates", "템플릿");
        m.insert("skill_builder.editor", "편집기");
        m.insert("skill_builder.preview", "미리보기");
        m.insert("skill_builder.name", "Skill 이름");
        m.insert("skill_builder.name_placeholder", "예: my-skill");
        m.insert("skill_builder.name_required", "Skill 이름을 입력하세요");
        m.insert("skill_builder.description", "설명");
        m.insert("skill_builder.desc_placeholder", "이 Skill은 무엇을 하나요?");
        m.insert("skill_builder.user_invocable", "사용자 호출 가능 (/command로 호출 가능)");
        m.insert("skill_builder.content", "Skill 내용 (Markdown)");
        m.insert("skill_builder.save", "Skill 저장");
        m.insert("skill_builder.saved", "Skill 저장됨:");
        m.insert("skill_builder.trigger", "트리거:");
        m.insert("skill_builder.preview_hint", "템플릿을 선택하거나 입력을 시작하면 실시간 미리보기가 표시됩니다.");

        // ── Global Rules ──
        m.insert("global_rules.title", "글로벌 규칙");
        m.insert("global_rules.subtitle", "~/.claude/rules/의 규칙 관리");
        m.insert("global_rules.loading", "규칙 로딩 중");
        m.insert("global_rules.no_rules", "글로벌 규칙을 찾을 수 없습니다");
        m.insert("global_rules.no_rules_hint", "~/.claude/rules/에 .md 파일을 생성하세요");
        m.insert("global_rules.select_rule", "목록에서 규칙을 선택하세요.");
        m.insert("global_rules.col_rule", "규칙");
        m.insert("global_rules.editing", "편집 중:");
        m.insert("global_rules.save", "저장");
        m.insert("global_rules.saved", "저장되었습니다!");
        m.insert("global_rules.delete", "삭제");
        m.insert("global_rules.deleted", "삭제되었습니다!");

        // ── Rules Conflicts (Feature 6) ──
        m.insert("rules.conflicts_title", "규칙 충돌");
        m.insert("rules.conflicts_found", "충돌 발견");
        m.insert("rules.conflict_name_collision", "이름 충돌");
        m.insert("rules.conflict_content_overlap", "내용 중복");
        m.insert("rules.conflict_contradiction", "모순");
        m.insert("rules.conflict_global", "글로벌");
        m.insert("rules.conflict_project", "프로젝트");
        m.insert("rules.no_conflicts", "충돌이 감지되지 않았습니다");

        // ── Plans ──
        m.insert("plans.title", "플랜");
        m.insert("plans.subtitle", "~/.claude/plans/의 플랜 파일 관리");
        m.insert("plans.loading", "플랜 로딩 중");
        m.insert("plans.no_plans", "플랜을 찾을 수 없습니다");
        m.insert("plans.no_plans_hint", "플랜은 Claude Code가 계획 수립 중에 생성합니다.");
        m.insert("plans.select_plan", "목록에서 플랜을 선택하세요.");
        m.insert("plans.col_plan", "플랜");
        m.insert("plans.col_modified", "수정일");
        m.insert("plans.modified", "수정일");
        m.insert("plans.plan_label", "플랜:");
        m.insert("plans.save", "저장");
        m.insert("plans.saved", "저장되었습니다!");
        m.insert("plans.delete", "삭제");
        m.insert("plans.deleted", "삭제되었습니다!");

        // ── Settings ──
        m.insert("settings.title", "설정");
        m.insert("settings.subtitle", "Claude Code 설정 및 Hooks 관리");
        m.insert("settings.tab_overview", "개요");
        m.insert("settings.tab_hooks", "Hook 템플릿");
        m.insert("settings.tab_storage", "스토리지");
        m.insert("settings.loading", "설정 로딩 중");
        m.insert("settings.hooks_title", "Hooks");
        m.insert("settings.no_hooks", "구성된 Hooks가 없습니다");
        m.insert("settings.pre_tool_use", "PreToolUse");
        m.insert("settings.post_tool_use", "PostToolUse");
        m.insert("settings.matcher", "매처");
        m.insert("settings.command", "명령어");
        m.insert("settings.hook_templates_title", "Hook 템플릿");
        m.insert("settings.hook_templates_desc", "추가할 수 있는 사전 구성된 Hook 설정.");
        m.insert("settings.hook_templates_loading", "템플릿 로딩 중");
        m.insert("settings.add_hook", "추가");
        m.insert("settings.storage_title", "스토리지 사용량");
        m.insert("settings.storage_loading", "스토리지 계산 중");
        m.insert("settings.storage_total", "합계");
        m.insert("settings.storage_dir", "디렉터리");
        m.insert("settings.storage_size", "크기");

        // ── Permissions ──
        m.insert("permissions.title", "권한");
        m.insert("permissions.subtitle", "프로젝트 권한 확인 및 관리");
        m.insert("permissions.loading", "권한 로딩 중");
        m.insert("permissions.no_permissions", "권한을 찾을 수 없습니다");
        m.insert("permissions.col_project", "프로젝트");
        m.insert("permissions.col_entries", "항목");
        m.insert("permissions.col_issues", "문제");
        m.insert("permissions.col_fragmented", "프래그먼트화");
        m.insert("permissions.detail_title", "권한");
        m.insert("permissions.detail_loading", "권한 로딩 중");
        m.insert("permissions.detail_col_tool", "도구");
        m.insert("permissions.detail_col_command", "명령어");
        m.insert("permissions.detail_col_status", "상태");
        m.insert("permissions.detail_fragmented", "프래그먼트화");
        m.insert("permissions.detail_security_issue", "보안 문제");
        m.insert("permissions.detail_delete_selected", "선택 항목 삭제");
        m.insert("permissions.detail_deleted", "삭제되었습니다!");
        m.insert("permissions.detail_warnings_title", "보안 경고");
        m.insert("permissions.health_title", "구성 상태 점검");
        m.insert("permissions.health_subtitle", "모든 프로젝트의 상태");
        m.insert("permissions.health_loading", "상태 계산 중");
        m.insert("permissions.health_col_project", "프로젝트");
        m.insert("permissions.health_col_score", "점수");
        m.insert("permissions.health_col_issues", "문제");
        m.insert("permissions.health_avg", "평균");
        m.insert("permissions.subtitle_manage", "모든 프로젝트의 권한 허용 목록 관리");
        m.insert("permissions.col_actions", "작업");
        m.insert("permissions.col_security_issues", "보안 문제");
        m.insert("permissions.details", "상세");
        m.insert("permissions.detail_subtitle", "권한 항목 확인 및 정리");
        m.insert("permissions.detail_deleting", "삭제 중...");
        m.insert("permissions.detail_deleted_reloading", "삭제되었습니다! 다시 로딩 중...");
        m.insert("permissions.detail_delete_count", "선택 항목 삭제");
        m.insert("permissions.detail_col_index", "#");
        m.insert("permissions.detail_fragment", "프래그먼트");
        m.insert("permissions.detail_ok", "OK");
        m.insert("permissions.detail_warnings_count", "보안 경고");
        m.insert("permissions.detail_entry", "항목");
        m.insert("permissions.health_subtitle_scores", "모든 프로젝트의 구성 상태 점수");
        m.insert("permissions.health_avg_score", "평균 상태 점수");
        m.insert("permissions.health_projects_analyzed", "분석된 프로젝트");
        m.insert("permissions.health_no_issues", "문제 없음");

        // ── Analytics ──
        m.insert("analytics.title", "분석");
        m.insert("analytics.subtitle", "Claude Code 사용 통계");
        m.insert("analytics.loading", "분석 데이터 로딩 중");
        m.insert("analytics.error_loading", "분석 데이터 로딩 오류");
        m.insert("analytics.total_sessions", "전체 세션");
        m.insert("analytics.total_messages", "전체 메시지");
        m.insert("analytics.git_commits", "Git 커밋");
        m.insert("analytics.lines_added", "추가된 줄");
        m.insert("analytics.lines_removed", "삭제된 줄");
        m.insert("analytics.since", "시작일");
        m.insert("analytics.activity_heatmap", "활동 히트맵");
        m.insert("analytics.messages", "메시지");
        m.insert("analytics.sessions", "세션");
        m.insert("analytics.tool_calls", "도구 호출");
        m.insert("analytics.hourly_distribution", "시간대별 분포");
        m.insert("analytics.model_usage", "모델 사용량");
        m.insert("analytics.col_model", "모델");
        m.insert("analytics.col_input_tokens", "입력 토큰");
        m.insert("analytics.col_output_tokens", "출력 토큰");
        m.insert("analytics.col_cache_tokens", "캐시 토큰");
        m.insert("analytics.tool_ranking", "도구 순위");
        m.insert("analytics.col_cache_read", "캐시 읽기");
        m.insert("analytics.tool_usage_top10", "도구 사용량 (상위 10)");
        m.insert("analytics.languages", "언어");
        m.insert("analytics.session_outcomes", "세션 결과");
        m.insert("analytics.outcomes", "결과");

        // ── Teach Me Tips (Feature 5) ──
        m.insert("analytics.tips_title", "인사이트 및 팁");
        m.insert("analytics.tips_dismiss", "닫기");
        m.insert("analytics.tips_learn_more", "자세히 보기");
        m.insert("analytics.tip_category_tool", "도구");
        m.insert("analytics.tip_category_workflow", "워크플로우");
        m.insert("analytics.tip_category_performance", "성능");
        m.insert("analytics.tip_category_config", "구성");
        m.insert("analytics.no_tips", "사용 가능한 팁이 없습니다");

        // ── Sessions ──
        m.insert("sessions.title", "세션");
        m.insert("sessions.subtitle", "Claude Code 세션 기록 탐색");
        m.insert("sessions.loading", "세션 로딩 중");
        m.insert("sessions.search_placeholder", "세션 검색...");
        m.insert("sessions.no_sessions", "세션을 찾을 수 없습니다");
        m.insert("sessions.col_project", "프로젝트");
        m.insert("sessions.col_date", "날짜");
        m.insert("sessions.col_duration", "소요 시간");
        m.insert("sessions.col_messages", "메시지");
        m.insert("sessions.col_summary", "요약");
        m.insert("sessions.col_outcome", "결과");
        m.insert("sessions.minutes", "분");
        m.insert("sessions.load_more", "더 불러오기");
        m.insert("sessions.detail_title", "세션 상세");
        m.insert("sessions.detail_loading", "세션 로딩 중");
        m.insert("sessions.detail_project", "프로젝트");
        m.insert("sessions.detail_start", "시작");
        m.insert("sessions.detail_duration", "소요 시간");
        m.insert("sessions.detail_messages", "메시지");
        m.insert("sessions.detail_tools", "도구 호출");
        m.insert("sessions.detail_tokens", "토큰");
        m.insert("sessions.detail_git", "Git");
        m.insert("sessions.detail_first_prompt", "첫 번째 프롬프트");
        m.insert("sessions.detail_summary", "요약");
        m.insert("sessions.back", "뒤로");
        m.insert("sessions.searching", "검색 중...");
        m.insert("sessions.search", "검색");
        m.insert("sessions.clear", "지우기");
        m.insert("sessions.search_results", "검색 결과");
        m.insert("sessions.no_results", "결과를 찾을 수 없습니다");
        m.insert("sessions.col_prompt", "프롬프트");
        m.insert("sessions.session_prefix", "세션: ");
        m.insert("sessions.detail_start_time", "시작 시간");
        m.insert("sessions.user_messages", " 사용자 / ");
        m.insert("sessions.assistant_messages", " 어시스턴트");
        m.insert("sessions.tokens_in", " 입력 / ");
        m.insert("sessions.tokens_out", " 출력");
        m.insert("sessions.commits_label", " 커밋, +");
        m.insert("sessions.lines_minus", " / -");
        m.insert("sessions.tools_used", "사용된 도구");
        m.insert("sessions.outcome_prefix", "결과: ");
        m.insert("sessions.showing", "표시 중");
        m.insert("sessions.of", "/");
        m.insert("sessions.previous", "이전");
        m.insert("sessions.next", "다음");

        // ── GitHub ──
        m.insert("github.title", "GitHub");
        m.insert("github.subtitle", "GitHub 연동 상태");
        m.insert("github.loading", "GitHub 데이터 로딩 중");
        m.insert("github.auth_status", "인증 상태");
        m.insert("github.username", "사용자 이름");
        m.insert("github.linked_repos", "연결된 저장소");
        m.insert("github.no_repos", "연결된 저장소 없음");
        m.insert("github.col_repo", "저장소");
        m.insert("github.col_recent_commits", "최근 커밋");
        m.insert("github.col_open_prs", "오픈 PR");

        // ── Help / System Info ──
        m.insert("help.title", "시스템 정보");
        m.insert("help.subtitle", "Claude Code 시스템 정보");
        m.insert("help.loading", "시스템 정보 로딩 중");
        m.insert("help.account", "계정");
        m.insert("help.account_name", "이름");
        m.insert("help.account_email", "이메일");
        m.insert("help.subscription", "구독");
        m.insert("help.claude_version", "Claude Code 버전");
        m.insert("help.gh_cli", "GitHub CLI");
        m.insert("help.skill_usage", "Skill 사용 현황");
        m.insert("help.no_skill_usage", "Skill 사용 기록이 없습니다");
        m.insert("help.col_skill", "Skill");
        m.insert("help.col_count", "횟수");
        m.insert("help.what_is_title", "ClaudeAdmin이란?");
        m.insert("help.what_is_desc", "ClaudeAdmin은 Claude Code의 시각적 관리 콘솔입니다. 프로젝트, Skills, 규칙, 메모리, 설정, Hooks, MCP 서버, 플랜 등 Claude Code 구성의 모든 측면을 관리할 수 있는 웹 기반 인터페이스를 제공합니다.");
        m.insert("help.system_status", "시스템 상태");
        m.insert("help.not_set", "미설정");
        m.insert("help.unknown", "알 수 없음");
        m.insert("help.not_found", "찾을 수 없음");
        m.insert("help.not_installed", "미설치");
        m.insert("help.concepts_title", "Claude Code 개념");
        m.insert("help.concept_skills", "YAML 프런트매터가 포함된 재사용 가능한 프롬프트. ~/.claude/skills/(글로벌) 또는 .claude/skills/(프로젝트)에 SKILL.md 파일로 저장됩니다.");
        m.insert("help.concept_rules", "Claude의 동작을 형성하는 제약 조건과 가이드라인. ~/.claude/rules/ 또는 프로젝트 수준에 .md 파일로 저장됩니다.");
        m.insert("help.concept_memory", "프로젝트별 영구 메모. MEMORY.md는 시스템 프롬프트에 자동으로 로드됩니다. 패턴, 설정, 학습 내용을 저장합니다.");
        m.insert("help.concept_hooks", "이벤트(PreToolUse, PostToolUse, Stop)에 의해 트리거되는 셸 명령어. 자동 포맷, 린트 등을 위해 settings.json에서 구성합니다.");
        m.insert("help.concept_mcp", "Model Context Protocol 서버는 외부 도구로 Claude를 확장합니다. ~/.claude.json에서 command, args, env를 설정합니다.");
        m.insert("help.concept_claudemd", "프로젝트 수준의 지침 파일. 컨텍스트로 자동 로드됩니다. 프로젝트 규약, 스택 정보, 코딩 가이드라인을 포함합니다.");
        m.insert("help.disclaimer", "ClaudeAdmin은 독립적인 커뮤니티 프로젝트입니다. Anthropic과 제휴, 보증 또는 승인된 것이 아닙니다. Claude 및 Claude Code는 Anthropic의 상표입니다.");

        m.insert("github.subtitle_detail", "GitHub CLI 연동 및 연결된 저장소");
        m.insert("github.linked_repositories", "연결된 저장소");
        m.insert("github.no_linked_repos", "~/.claude.json에 연결된 GitHub 저장소가 없습니다");
        m.insert("github.col_name", "이름");
        m.insert("github.col_path", "경로");

        // ── Skill Browser ──
        m.insert("skill_browser.title", "Skill 브라우저");
        m.insert("skill_browser.subtitle", "공식 및 커뮤니티 Skills 탐색 및 설치");
        m.insert("skill_browser.loading", "Skills 로딩 중");
        m.insert("skill_browser.search_placeholder", "Skills 검색...");
        m.insert("skill_browser.no_results", "Skills를 찾을 수 없습니다");
        m.insert("skill_browser.installed", "설치됨");
        m.insert("skill_browser.install", "설치");
        m.insert("skill_browser.official", "공식");
        m.insert("skill_browser.community", "커뮤니티");
        m.insert("skill_browser.tab_official", "공식 (Anthropic)");
        m.insert("skill_browser.tab_community", "커뮤니티");
        m.insert("skill_browser.install_success", "설치에 성공했습니다!");
        m.insert("skill_browser.install_failed", "설치에 실패했습니다:");

        // ── Docs ──
        m.insert("docs.title", "문서");
        m.insert("docs.subtitle", "Claude Code 구성에 대해 알아야 할 모든 것");
        m.insert("docs.loading", "문서 로딩 중");

        // ── Docs: Table of Contents ──
        m.insert("docs.toc_contents", "목차");
        m.insert("docs.toc_why_claudeadmin", "왜 ClaudeAdmin인가?");
        m.insert("docs.toc_capabilities", "할 수 있는 것과 없는 것");
        m.insert("docs.toc_group", "개념");
        m.insert("docs.toc_claude_md", "CLAUDE.md");
        m.insert("docs.toc_rules", "규칙");
        m.insert("docs.toc_skills", "Skills");
        m.insert("docs.toc_memory", "메모리");
        m.insert("docs.toc_settings", "설정과 Hooks");
        m.insert("docs.toc_mcp", "MCP 서버");
        m.insert("docs.toc_plans", "플랜");
        m.insert("docs.toc_scopes", "글로벌 vs. 프로젝트");
        m.insert("docs.toc_tips", "팁과 모범 사례");
        m.insert("docs.toc_links", "공식 문서");

        // ── Docs: Shared labels ──
        m.insert("docs.tips_heading", "팁과 요령");
        m.insert("docs.scope_global", "글로벌");
        m.insert("docs.scope_project", "프로젝트");
        m.insert("docs.scope_user", "사용자");
        m.insert("docs.scope_parent", "상위");
        m.insert("docs.scope_managed", "관리 대상");
        m.insert("docs.scope_local", "로컬");

        // ── Docs: Overview ──
        m.insert("docs.overview_heading", "왜 ClaudeAdmin인가?");
        m.insert("docs.overview_callout", "은 Claude Code 구성 전체를 위한 중앙 관리 콘솔입니다. 수많은 숨겨진 디렉터리에 걸친 수동 파일 편집을 하나의 시각적 인터페이스로 대체합니다.");
        m.insert("docs.overview_text1", "Claude Code는 파일과 디렉터리의 복잡한 계층 구조에 구성을 저장합니다: 프로젝트 루트의 CLAUDE.md 파일, ~/.claude/ 하위 디렉터리에 흩어진 규칙과 Skills, 인코딩된 프로젝트 경로로 키가 지정된 메모리 파일, 여러 JSON 파일의 설정, ~/.claude.json의 MCP 서버 구성. 프로젝트가 늘어남에 따라 이 모든 것을 수동으로 관리하면 오류가 발생하기 쉽고 시간이 많이 걸립니다.");
        m.insert("docs.overview_text2", "ClaudeAdmin이 제공하는 것:");
        m.insert("docs.overview_li_visibility_label", "가시성");
        m.insert("docs.overview_li_visibility", " \u{2013} 모든 프로젝트, Skills, 규칙, 메모리를 한 곳에서 확인");
        m.insert("docs.overview_li_editing_label", "편집");
        m.insert("docs.overview_li_editing", " \u{2013} CLAUDE.md, 규칙, Skills, 메모리를 적절한 편집기로 편집");
        m.insert("docs.overview_li_health_label", "상태 점검");
        m.insert("docs.overview_li_health", " \u{2013} 권한의 보안 문제, 중복 규칙, 누락된 구성 감지");
        m.insert("docs.overview_li_analytics_label", "분석");
        m.insert("docs.overview_li_analytics", " \u{2013} Claude Code 사용 현황 파악: 세션, 토큰, 도구, 비용");
        m.insert("docs.overview_li_advisor_label", "어드바이저");
        m.insert("docs.overview_li_advisor", " \u{2013} AI 기반 프로젝트 구성 개선 제안");

        // ── Docs: Capabilities ──
        m.insert("docs.cap_heading", "ClaudeAdmin이 할 수 있는 것과 없는 것");
        m.insert("docs.cap_can_heading", "할 수 있는 것");
        m.insert("docs.cap_can_1", "~/.claude.json에 등록된 모든 프로젝트 탐색 및 관리");
        m.insert("docs.cap_can_2", "모든 프로젝트의 CLAUDE.md 파일 보기 및 편집");
        m.insert("docs.cap_can_3", "글로벌 및 프로젝트 Skills 생성, 편집, 삭제");
        m.insert("docs.cap_can_4", "글로벌 및 프로젝트 규칙 생성, 편집, 삭제");
        m.insert("docs.cap_can_5", "프로젝트 메모리 파일(MEMORY.md 및 토픽) 보기 및 편집");
        m.insert("docs.cap_can_6", "설정 계층 구조(글로벌 \u{2192} 프로젝트 \u{2192} 로컬) 검사");
        m.insert("docs.cap_can_7", "권한 항목 감사 및 보안 문제 감지");
        m.insert("docs.cap_can_8", "MCP 서버 구성 보기");
        m.insert("docs.cap_can_9", "세션 기록, 토큰 사용량, 비용 분석");
        m.insert("docs.cap_can_10", "실행 가능한 권장 사항이 포함된 AI 기반 프로젝트 분석 실행");
        m.insert("docs.cap_can_11", "커뮤니티 저장소에서 Skills 탐색 및 설치");
        m.insert("docs.cap_can_12", "모든 쓰기 작업은 ~/.claude/backups/에 자동 백업 생성");
        m.insert("docs.cap_cannot_heading", "할 수 없는 것");
        m.insert("docs.cap_cannot_1", "Claude Code 세션 실행 \u{2013} 구성 관리이지 실행이 아닙니다");
        m.insert("docs.cap_cannot_2", "관리 대상 정책(엔터프라이즈/조직 수준 설정) 수정");
        m.insert("docs.cap_cannot_3", "원격 환경 또는 SSH 세션 접근");
        m.insert("docs.cap_cannot_4", "실제 코딩 작업에서 Claude Code CLI 대체");
        m.insert("docs.cap_cannot_5", ".claude.json MCP 서버 직접 편집(안전을 위해 읽기 전용)");
        m.insert("docs.cap_cannot_6", "API 키 또는 인증 자격 증명 관리");
        m.insert("docs.cap_cannot_callout", "ClaudeAdmin은 구성 관리자이지 Claude Code 자체를 대체하는 것이 아닙니다. 데이터베이스 관리 도구처럼 생각하세요: 검사, 구성, 유지보수를 도와주지만 실제 작업은 Claude Code에서 수행됩니다.");

        // ── Docs: CLAUDE.md ──
        m.insert("docs.claudemd_callout", "프로젝트의 헌법. CLAUDE.md는 가장 중요한 구성 파일입니다 \u{2013} 모든 Claude Code 세션에 영구적 컨텍스트로 자동 로드됩니다.");
        m.insert("docs.claudemd_how_heading", "작동 원리");
        m.insert("docs.claudemd_how_text", "Claude Code가 세션을 시작하면 현재 작업 디렉터리에서 파일 시스템 루트까지 재귀적으로 CLAUDE.md 파일을 검색합니다. 발견된 모든 파일이 로드되어 연결되며, 더 가까운 파일이 우선됩니다. 이를 통해 모노레포 수준의 CLAUDE.md에 공유 규약을 두고 패키지 수준의 CLAUDE.md 파일에 특정 오버라이드를 설정할 수 있습니다.");
        m.insert("docs.claudemd_locations_heading", "위치");
        m.insert("docs.claudemd_loc_project_or", " 또는 ");
        m.insert("docs.claudemd_loc_parent", "모노레포 루트, 모든 하위 패키지에 로드됨");
        m.insert("docs.claudemd_loc_user", "모든 프로젝트에 적용되는 개인 기본값");
        m.insert("docs.claudemd_whatto_heading", "작성할 내용");
        m.insert("docs.claudemd_whatto_context_label", "프로젝트 컨텍스트");
        m.insert("docs.claudemd_whatto_context", " \u{2013} 기술 스택, 아키텍처 결정, 주요 의존성");
        m.insert("docs.claudemd_whatto_standards_label", "코딩 표준");
        m.insert("docs.claudemd_whatto_standards", " \u{2013} 명명 규칙, 포맷 규칙, 오류 처리 패턴");
        m.insert("docs.claudemd_whatto_workflows_label", "워크플로우");
        m.insert("docs.claudemd_whatto_workflows", " \u{2013} 빌드, 테스트, 배포 방법; 브랜치 명명; PR 규약");
        m.insert("docs.claudemd_whatto_dodont_label", "해야 할 것/하지 말아야 할 것");
        m.insert("docs.claudemd_whatto_dodont", " \u{2013} 명시적 제약(예: \u{201c}TypeScript에서 any를 사용하지 않기\u{201d})");
        m.insert("docs.claudemd_whatto_team_label", "팀 합의");
        m.insert("docs.claudemd_whatto_team", " \u{2013} 리뷰 프로세스, 커밋 메시지 형식, 모듈 경계");
        m.insert("docs.claudemd_tip1", "500줄 이하로 유지하세요. Claude는 전체 파일을 컨텍스트에 로드합니다 \u{2013} 비대해진 CLAUDE.md는 토큰을 낭비하고 중요한 지침을 희석시킵니다.");
        m.insert("docs.claudemd_tip2", "명확한 섹션 제목(## Architecture, ## Conventions)을 사용하세요. Claude는 관련 섹션을 찾기 위해 구조를 파싱합니다.");
        m.insert("docs.claudemd_tip3", "가장 중요한 규칙을 맨 위에 두세요. 긴 파일에서는 시작 부분의 콘텐츠가 더 주목받습니다.");
        m.insert("docs.claudemd_tip4", "CLAUDE.local.md를 사용하여 git에 커밋하지 않아야 할 개인 설정을 작성하세요.");
        m.insert("docs.claudemd_ext_link", "Anthropic 문서: CLAUDE.md \u{2192}");

        // ── Docs: Rules ──
        m.insert("docs.rules_heading", "규칙");
        m.insert("docs.rules_callout", "Claude의 동작을 형성하는 모듈식 주제별 제약. 하나의 큰 파일인 CLAUDE.md와 달리 규칙은 각각 특정 주제에 초점을 맞춘 별도의 .md 파일입니다.");
        m.insert("docs.rules_how_heading", "작동 원리");
        m.insert("docs.rules_how_text", "규칙은 세션 시작 시 자동으로 로드됩니다. 글로벌 규칙(개인 설정)이 먼저 로드되고 그 위에 프로젝트 규칙이 덮어씁니다. 이를 통해 코딩 스타일을 글로벌로 정의하면서 프로젝트가 도메인별 제약을 추가할 수 있습니다.");
        m.insert("docs.rules_locations_heading", "위치");
        m.insert("docs.rules_loc_global", "개인 규칙, 모든 프로젝트에 적용");
        m.insert("docs.rules_loc_project", "프로젝트 전용, 팀 공유를 위해 git에 커밋");
        m.insert("docs.rules_examples_heading", "예시");
        m.insert("docs.rules_example_frontend", " \u{2013} React 컴포넌트 패턴, 상태 관리 규칙");
        m.insert("docs.rules_example_security", " \u{2013} 입력 검증, 인증 패턴, OWASP 준수");
        m.insert("docs.rules_example_testing", " \u{2013} 테스트 구조, 커버리지 요구사항, 모킹 전략");
        m.insert("docs.rules_example_rust", " \u{2013} thiserror를 사용한 오류 처리, 모듈 구조, 명명");
        m.insert("docs.rules_tip1", "파일당 하나의 주제. 프론트엔드와 백엔드 규칙을 혼합하지 마세요 \u{2013} 작고 집중된 파일이 유지보수와 재사용이 더 쉽습니다.");
        m.insert("docs.rules_tip2", "글로벌 규칙은 개인 스타일 설정에 적합합니다: 선호 언어, 포맷 도구, 커밋 메시지 형식.");
        m.insert("docs.rules_tip3", "프로젝트 규칙은 글로벌 규칙을 덮어씁니다. 충돌이 있으면 프로젝트 수준 규칙이 우선합니다.");
        m.insert("docs.rules_tip4", "ClaudeAdmin의 상태 점검을 사용하여 글로벌과 프로젝트 수준 간의 중복 규칙을 감지하세요.");
        m.insert("docs.rules_ext_link", "Anthropic 문서: 규칙 \u{2192}");

        // ── Docs: Skills ──
        m.insert("docs.skills_heading", "Skills");
        m.insert("docs.skills_callout", "메타데이터가 포함된 재사용 가능한 구조화된 프롬프트. Skills는 Claude의 플러그인과 같으며 컨텍스트에 의해 자동으로 트리거되거나 슬래시 명령으로 수동 호출할 수 있습니다.");
        m.insert("docs.skills_how_heading", "작동 원리");
        m.insert("docs.skills_how_text", "각 Skill은 YAML 프런트매터와 마크다운 본문이 포함된 SKILL.md 파일이 있는 자체 디렉터리에 존재합니다. 프런트매터는 설명 및 트리거 조건과 같은 메타데이터를 정의합니다. 본문에는 실제 프롬프트 지침, 예시, 참고 자료가 포함됩니다.");
        m.insert("docs.skills_structure_heading", "구조");
        m.insert("docs.skills_locations_heading", "위치");
        m.insert("docs.skills_loc_global", "모든 프로젝트에서 사용 가능");
        m.insert("docs.skills_loc_project", "프로젝트 전용 Skills");
        m.insert("docs.skills_tip1", "프런트매터에서 user_invocable: true를 설정하면 Claude Code에서 /skill-name으로 호출할 수 있습니다.");
        m.insert("docs.skills_tip2", "SKILL.md에 구체적인 예시를 포함하세요. Claude는 입출력 예시가 있을 때 훨씬 더 좋은 성능을 발휘합니다.");
        m.insert("docs.skills_tip3", "ClaudeAdmin의 Skill 브라우저를 사용하여 커뮤니티 Skills를 탐색하고 설치하세요.");
        m.insert("docs.skills_tip4", "Skill 디렉터리의 참조 파일은 Skill이 트리거될 때만 로드되어 토큰을 절약합니다.");
        m.insert("docs.skills_ext_link", "Anthropic 문서: Skills \u{2192}");

        // ── Docs: Memory ──
        m.insert("docs.memory_heading", "메모리");
        m.insert("docs.memory_callout", "프로젝트별 Claude의 영구 지식 기반. 메모리 파일은 Claude가 세션을 통해 축적한 패턴, 설정, 학습 내용을 저장합니다.");
        m.insert("docs.memory_how_heading", "작동 원리");
        m.insert("docs.memory_how_text", "Claude Code는 각 프로젝트의 메모리 디렉터리를 ~/.claude/projects/<encoded-path>/memory/에 유지합니다. 메인 파일 MEMORY.md는 특별한 지위를 가지며, 처음 200줄이 세션 시작 시 시스템 프롬프트에 로드됩니다. 추가 토픽 파일(debugging.md, api-conventions.md 등)은 Claude가 현재 작업에 관련이 있다고 판단할 때 온디맨드로 로드됩니다.");
        m.insert("docs.memory_structure_heading", "구조");
        m.insert("docs.memory_auto_heading", "자동 메모리");
        m.insert("docs.memory_auto_text", "Claude Code는 프로젝트 패턴, 디버깅 솔루션, 사용자 설정을 발견하면 자동으로 메모리에 항목을 추가할 수 있습니다. Claude Code의 /memory 명령어나 ClaudeAdmin의 메모리 편집기에서 자동 생성된 메모리를 확인하고 편집할 수 있습니다.");
        m.insert("docs.memory_tip1", "MEMORY.md의 처음 200줄에 가장 중요한 정보를 두세요 \u{2013} 그것이 자동 로드되는 부분입니다.");
        m.insert("docs.memory_tip2", "상세한 지식에는 토픽 파일을 사용하세요. 필요할 때만 로드되므로 기본 토큰 사용량을 낮게 유지할 수 있습니다.");
        m.insert("docs.memory_tip3", "자동 메모리를 정기적으로 검토하세요. Claude는 때때로 지나치게 구체적인 일회성 솔루션을 저장합니다.");
        m.insert("docs.memory_tip4", "메모리는 프로젝트별입니다. 다른 프로젝트로 전환하면 Claude는 다른 메모리 세트를 가져옵니다.");
        m.insert("docs.memory_ext_link", "Anthropic 문서: 메모리 \u{2192}");

        // ── Docs: Settings & Hooks ──
        m.insert("docs.settings_heading", "설정과 Hooks");
        m.insert("docs.settings_heading_short", "설정");
        m.insert("docs.settings_callout", "동작, 권한, 자동화를 위한 JSON 기반 구성. Hooks를 사용하면 Claude가 도구를 사용하기 전후에 셸 명령어를 자동으로 실행할 수 있습니다.");
        m.insert("docs.settings_hierarchy_heading", "설정 계층");
        m.insert("docs.settings_hierarchy_text", "설정은 구체성이 증가하는 계층 모델을 따릅니다. 더 구체적인 계층이 더 일반적인 계층을 덮어씁니다:");
        m.insert("docs.settings_managed_code", "엔터프라이즈 정책");
        m.insert("docs.settings_managed_desc", "최고 우선순위, 조직이 설정(읽기 전용)");
        m.insert("docs.settings_global_desc", "개인 글로벌 설정");
        m.insert("docs.settings_project_desc", "팀 설정, git에 커밋");
        m.insert("docs.settings_local_desc", "개인 프로젝트 오버라이드(gitignore 대상)");
        m.insert("docs.settings_hooks_heading", "Hooks");
        m.insert("docs.settings_hooks_text", "Hooks는 Claude Code 세션 중 특정 이벤트에서 트리거되는 셸 명령어입니다. settings.json의 hooks 키에서 구성합니다.");
        m.insert("docs.settings_hooks_events", "이벤트:\n\u{2022} PreToolUse  \u{2013} Claude가 도구를 실행하기 전(예: 쓰기 전 자동 포맷)\n\u{2022} PostToolUse \u{2013} Claude가 도구를 실행한 후(예: 파일 변경 후 린트)\n\u{2022} Stop        \u{2013} Claude가 응답을 완료할 때");
        m.insert("docs.settings_tip1", "PreToolUse Hooks를 사용하여 Claude가 파일을 쓰기 전에 코드를 자동 포맷하세요. 일관된 스타일이 보장됩니다.");
        m.insert("docs.settings_tip2", "PostToolUse Hooks는 린트에 적합합니다: Claude가 코드를 변경한 직후 문제를 잡아낼 수 있습니다.");
        m.insert("docs.settings_tip3", "ClaudeAdmin의 설정 페이지에서 모든 계층에 걸친 유효한 Hook 체인을 확인할 수 있습니다.");
        m.insert("docs.settings_ext_link", "Anthropic 문서: 설정 \u{2192}");
        m.insert("docs.settings_hooks_ext_link", "Anthropic 문서: Hooks \u{2192}");

        // ── Docs: MCP Servers ──
        m.insert("docs.mcp_heading", "MCP 서버");
        m.insert("docs.mcp_callout", "Model Context Protocol 서버는 외부 도구와 데이터 소스로 Claude를 확장합니다. 데이터베이스, API, 파일 시스템 및 기타 서비스와 Claude가 상호작용할 수 있게 합니다.");
        m.insert("docs.mcp_how_heading", "작동 원리");
        m.insert("docs.mcp_how_text", "MCP 서버는 Claude Code가 시작하고 MCP 프로토콜을 통해 통신하는 외부 프로세스입니다. 각 서버는 Claude가 호출할 수 있는 도구 세트를 제공합니다. 구성은 ~/.claude.json의 mcpServers 키에 있습니다.");
        m.insert("docs.mcp_config_heading", "구성");
        m.insert("docs.mcp_management_heading", "ClaudeAdmin에서의 관리");
        m.insert("docs.mcp_management_text", "ClaudeAdmin은 MCP 서버 관리 전용 페이지를 제공합니다: 수동 JSON 편집 없이 서버 보기, 추가, 편집, 삭제가 가능합니다. 상태 점검 기능은 각 서버를 시작하고 JSON-RPC initialize 및 tools/list 요청에 대한 응답을 검증합니다. MCP 브라우저를 사용하여 인기 서버를 원클릭으로 탐색하고 설치할 수 있습니다.");
        m.insert("docs.mcp_tip1", "MCP 서버는 .claude/settings.json에서 프로젝트별로도 구성할 수 있습니다.");
        m.insert("docs.mcp_tip2", "시크릿에는 환경 변수를 사용하세요 \u{2013} 구성 파일에 API 키를 하드코딩하지 마세요.");
        m.insert("docs.mcp_tip3", "MCP 브라우저를 사용하여 인기 서버를 탐색하고 설치하거나, '새 서버' 탭에서 커스텀 서버를 추가하세요.");
        m.insert("docs.mcp_ext_link", "Anthropic 문서: MCP \u{2192}");
        m.insert("docs.mcp_spec_ext_link", "MCP 사양 \u{2192}");

        // ── Docs: Plans ──
        m.insert("docs.plans_heading", "플랜");
        m.insert("docs.plans_callout", "Claude가 복잡한 작업을 분해하는 데 사용하는 마크다운 파일. 플랜은 다단계 작업에서 Claude가 집중력을 유지하고 진행 상황을 추적하는 데 도움이 됩니다.");
        m.insert("docs.plans_how_heading", "작동 원리");
        m.insert("docs.plans_how_text", "Claude가 복잡한 작업을 수행할 때 ~/.claude/plans/에 저장된 플랜 파일을 생성하거나 참조할 수 있습니다. 플랜은 작업 목록, 종속성, 상태 추적이 포함된 구조화된 마크다운 문서입니다. 세션 간에 지속되므로 Claude는 중단된 곳에서 재개할 수 있습니다.");
        m.insert("docs.plans_location_heading", "위치");
        m.insert("docs.plans_loc_global", "모든 플랜 파일");
        m.insert("docs.plans_tip1", "복잡한 리팩토링 전에 Claude에게 \u{201c}계획을 세워줘\u{201d}라고 요청하세요. 플랜은 여러 파일 변경 시 실수를 줄입니다.");
        m.insert("docs.plans_tip2", "오래된 플랜을 정기적으로 정리하세요. ClaudeAdmin의 플랜 페이지에서 수정 날짜와 함께 모든 저장된 플랜을 확인할 수 있습니다.");

        // ── Docs: Scopes ──
        m.insert("docs.scopes_heading", "글로벌 vs. 프로젝트 범위");
        m.insert("docs.scopes_callout", "범위의 이해는 효과적인 Claude Code 구성의 핵심입니다. 모든 구성 유형은 글로벌(개인 기본값)과 프로젝트 전용(팀과 공유)의 두 계층에 존재합니다.");
        m.insert("docs.scopes_overview_heading", "범위 개요");
        m.insert("docs.scopes_col_type", "구성 유형");
        m.insert("docs.scopes_col_global", "글로벌(사용자)");
        m.insert("docs.scopes_col_project", "프로젝트");
        m.insert("docs.scopes_col_priority", "우선순위");
        m.insert("docs.scopes_priority_project_global", "프로젝트 > 글로벌");
        m.insert("docs.scopes_priority_both", "둘 다 사용 가능");
        m.insert("docs.scopes_memory_global", "~/.claude/projects/에 프로젝트별");
        m.insert("docs.scopes_priority_project_keyed", "프로젝트 키");
        m.insert("docs.scopes_priority_local_project_global", "로컬 > 프로젝트 > 글로벌");
        m.insert("docs.scopes_priority_merged", "병합");
        m.insert("docs.scopes_when_heading", "어떤 것을 사용해야 할까?");
        m.insert("docs.scopes_use_global", "글로벌 용도");
        m.insert("docs.scopes_global_1", "개인 코딩 스타일 설정");
        m.insert("docs.scopes_global_2", "선호 언어 및 프레임워크 기본값");
        m.insert("docs.scopes_global_3", "커밋 메시지 형식");
        m.insert("docs.scopes_global_4", "편집기/IDE 연동 설정");
        m.insert("docs.scopes_global_5", "모든 프로젝트에서 사용하는 MCP 서버");
        m.insert("docs.scopes_use_project", "프로젝트 용도");
        m.insert("docs.scopes_project_1", "기술 스택 문서 및 제약");
        m.insert("docs.scopes_project_2", "팀 코딩 규약");
        m.insert("docs.scopes_project_3", "도메인별 규칙(보안, 컴플라이언스)");
        m.insert("docs.scopes_project_4", "프로젝트 전용 Skills 및 워크플로우");
        m.insert("docs.scopes_project_5", "CI/CD Hooks 및 자동화");

        // ── Docs: Optimization Guide ──
        m.insert("docs.toc_optimization", "최적화 가이드");
        m.insert("docs.opt_heading", "최적화 가이드");
        m.insert("docs.opt_callout", "분석에서 제공하는 맞춤형 팁을 심층적으로 설명합니다. 각 섹션은 패턴이 중요한 이유와 개선 방법을 Anthropic 공식 문서 링크와 함께 다룹니다.");
        m.insert("docs.opt_why", "이유:");
        m.insert("docs.opt_how", "방법:");
        m.insert("docs.opt_task_heading", "Task 도구를 사용한 병렬 에이전트");
        m.insert("docs.opt_task_why", "Task 도구는 병렬로 작업하는 전문 하위 에이전트를 실행합니다. 복잡한 다단계 작업(조사, 코드 탐색, 테스트)의 경우 하위 에이전트가 순차적이 아닌 동시에 실행될 수 있어 총 시간을 크게 줄입니다.");
        m.insert("docs.opt_task_how", "Claude Code는 병렬화 기회를 인식하면 자동으로 Task 도구를 사용합니다. 명시적으로 요청할 수도 있습니다: \u{201c}X와 Y를 병렬로 조사해\u{201d} 또는 \u{201c}버그를 수정하면서 테스트를 실행해.\u{201d} 각 에이전트는 자체 컨텍스트 윈도우를 가져 대규모 코드베이스 탐색이 더 효율적입니다.");
        m.insert("docs.opt_task_link", "Anthropic Docs: 모범 사례 \u{2192}");
        m.insert("docs.opt_hooks_heading", "Hooks를 활용한 자동화");
        m.insert("docs.opt_hooks_why", "Hooks는 Claude가 도구를 사용하기 전후에 자동으로 실행되는 셸 명령입니다. Hooks 없이는 포매터, 린터, 테스트를 수동으로 실행해야 합니다. Hooks를 사용하면 파일 작성마다 자동 포맷, 커밋마다 자동 테스트가 가능합니다.");
        m.insert("docs.opt_hooks_how", "~/.claude/settings.json의 \u{201c}hooks\u{201d} 키에서 Hooks를 설정합니다. PreToolUse로 도구 실행 전 작업을 수행합니다(예: 쓰기 전 코드 포맷). PostToolUse로 변경 후 검증을 수행합니다(예: 편집 후 lint). Stop으로 Claude 완료 시 검사를 실행합니다.");
        m.insert("docs.opt_hooks_link", "Anthropic Docs: Hooks \u{2192}");
        m.insert("docs.opt_sessions_heading", "최적 세션 길이");
        m.insert("docs.opt_sessions_why", "긴 세션은 Claude의 집중력을 희석시키는 컨텍스트를 축적합니다. 많은 메시지 후에는 이전 지시사항이 덜 눈에 띄게 됩니다. 컨텍스트 윈도우가 대화 기록으로 채워지면서 토큰 비용도 증가합니다.");
        m.insert("docs.opt_sessions_how", "복잡한 작업을 집중된 세션으로 나누세요. /clear를 사용하여 세션 내에서 컨텍스트를 초기화하세요. 다단계 프로젝트의 경우 계획 파일을 사용하세요(Claude가 계획을 작성한 후 집중된 세션에서 단계를 실행). 각 새 세션은 현재 작업에 최대한의 주의를 기울이며 시작됩니다.");
        m.insert("docs.opt_sessions_link", "Anthropic Docs: 모범 사례 \u{2192}");
        m.insert("docs.opt_cost_heading", "비용 최적화");
        m.insert("docs.opt_cost_why", "Claude 모델마다 비용이 크게 다릅니다. Opus는 복잡한 추론에 뛰어나지만 토큰당 비용이 더 높습니다. Haiku는 빠르고 저렴하여 간단한 작업에 이상적입니다. 각 작업에 적합한 모델을 사용하면 비용을 크게 절감할 수 있습니다.");
        m.insert("docs.opt_cost_how", "/model을 사용하여 세션 중 모델을 전환하세요. Haiku 용도: 빠른 수정, 코드 포맷, 간단한 질문. Sonnet 용도: 중간 수준의 코딩 작업, 리뷰. Opus 용도: 아키텍처 설계, 복잡한 디버깅, 다중 파일 리팩토링. 분석 페이지에서 모델별 비용 내역을 확인할 수 있습니다.");
        m.insert("docs.opt_cost_link", "Anthropic Docs: Claude Code 개요 \u{2192}");
        m.insert("docs.opt_write_heading", "Write vs Edit: 올바른 도구 선택");
        m.insert("docs.opt_write_why", "Write 도구는 파일 전체를 한 번에 생성하고, Edit는 기존 파일에 대상을 지정하여 변경합니다. 새 파일의 경우 Edit는 먼저 파일을 읽고 정확한 문자열 대체를 지정해야 하므로 Write가 더 효율적입니다.");
        m.insert("docs.opt_write_how", "Claude는 일반적으로 자동으로 올바른 도구를 선택합니다. 그러나 처음부터 새 파일을 만드는 경우(템플릿, 보일러플레이트, 설정) 명시적으로 \u{201c}새 파일을 만들어\u{201d}라고 하면 Claude가 Write를 선택하는 데 도움이 됩니다. 기존 코드 수정에는 항상 Edit가 선호됩니다.");
        m.insert("docs.opt_models_heading", "모델 다양성");
        m.insert("docs.opt_models_why", "모든 작업에 단일 모델을 사용하면 간단한 작업에 과다 지불(모든 것에 Opus)하거나 복잡한 작업에 파워 부족(모든 것에 Haiku)이 됩니다. 각 모델 패밀리는 강점이 있습니다: 속도의 Haiku, 균형의 Sonnet, 깊은 추론의 Opus.");
        m.insert("docs.opt_models_how", "/model 명령으로 모델을 전환하세요. 좋은 패턴: Opus로 계획과 아키텍처를 시작하고, Sonnet으로 전환하여 구현, Haiku로 빠른 수정과 포맷을 수행합니다. 분석 페이지에서 가장 많이 사용하는 모델을 확인할 수 있습니다.");
        m.insert("docs.opt_models_link", "Anthropic Docs: Claude Code 개요 \u{2192}");
        m.insert("docs.opt_git_heading", "Git 통합");
        m.insert("docs.opt_git_why", "Claude Code는 스테이지, 커밋, 푸시 및 PR 생성을 직접 수행할 수 있습니다. Git 통합 없이는 Claude 세션마다 수동으로 커밋해야 하므로 워크플로가 중단되고 중요한 변경 사항을 잊을 위험이 있습니다.");
        m.insert("docs.opt_git_how", "Claude에게 커밋을 요청하기만 하면 됩니다: \u{201c}이 변경 사항을 커밋해\u{201d} 또는 /commit을 사용합니다. Claude는 설명적인 커밋 메시지를 작성하고, 관련 파일만 스테이지하며, pre-commit hooks를 존중합니다. PR의 경우 Claude에게 \u{201c}PR을 만들어\u{201d}라고 요청하면 gh CLI를 사용하여 푸시하고 요약이 포함된 풀 리퀘스트를 엽니다.");
        m.insert("docs.opt_git_link", "Anthropic Docs: 모범 사례 \u{2192}");
        m.insert("docs.opt_churn_heading", "코드 변동 줄이기");
        m.insert("docs.opt_churn_why", "추가된 줄보다 삭제된 줄이 많으면 보통 Claude가 다시 작성해야 하는 코드를 작성했다는 의미입니다. 이는 토큰과 시간의 낭비입니다. 일반적인 원인: 모호한 프롬프트, 누락된 컨텍스트, 요구 사항 추측.");
        m.insert("docs.opt_churn_how", "프롬프트에서 구체적으로: 기존 파일을 참조하고, 정확한 함수명을 지정하고, 예상 동작을 설명하세요. CLAUDE.md를 사용하여 규칙을 문서화해 Claude가 추측하지 않도록 하세요. 복잡한 변경의 경우 구현 전에 먼저 Claude에게 계획을 세우도록 요청하세요(/plan). 코딩을 시작하기 전에 Claude의 계획을 검토하세요.");
        m.insert("docs.opt_churn_link", "Anthropic Docs: 모범 사례 \u{2192}");

        // ── Docs: Tips & Best Practices ──
        m.insert("docs.bestpractices_heading", "팁과 모범 사례");
        m.insert("docs.bestpractices_hygiene_heading", "구성 위생");
        m.insert("docs.bestpractices_hygiene_1", "ClaudeAdmin의 구성 상태 점검을 정기적으로 실행하세요. 중복 규칙, 비대해진 권한 목록, 누락된 CLAUDE.md 파일을 감지합니다.");
        m.insert("docs.bestpractices_hygiene_2", "반복하지 마세요: 글로벌에 규칙이 있으면 프로젝트 CLAUDE.md에 복사하지 마세요. 범위 시스템을 사용하세요.");
        m.insert("docs.bestpractices_hygiene_3", "권한 목록을 깨끗하게 유지하세요. 시간이 지나면 Claude Code는 수백 개의 허용/거부 항목을 축적합니다. 권한 페이지를 사용하여 정리하세요.");
        m.insert("docs.bestpractices_tokens_heading", "토큰 효율성");
        m.insert("docs.bestpractices_tokens_1", "CLAUDE.md, 규칙, Skills(트리거 시), MEMORY.md의 처음 200줄 모두가 컨텍스트 윈도우에 포함됩니다. 간결하게 작성하세요.");
        m.insert("docs.bestpractices_tokens_2", "상세한 참고 자료는 Skill 참조 파일이나 메모리 토픽 파일로 이동하세요 \u{2013} 필요할 때만 로드됩니다.");
        m.insert("docs.bestpractices_tokens_3", "분석 페이지를 사용하여 프로젝트와 세션별 토큰 사용량을 모니터링하세요.");
        m.insert("docs.bestpractices_team_heading", "팀 협업");
        m.insert("docs.bestpractices_team_1", ".claude/rules/와 .claude/skills/를 git에 커밋하세요. 팀 전체에서 규약을 공유할 수 있습니다.");
        m.insert("docs.bestpractices_team_2", "팀 설정에는 .claude/settings.json을, 개인 오버라이드에는 .claude/settings.local.json을 사용하세요.");
        m.insert("docs.bestpractices_team_3", "프로젝트 루트의 CLAUDE.md는 팀과 Claude의 계약입니다. 문서처럼 다루고 PR에서 변경 사항을 리뷰하세요.");
        m.insert("docs.bestpractices_debug_heading", "Claude 동작 디버깅");
        m.insert("docs.bestpractices_debug_1", "Claude가 규칙을 무시하면 설정 계층 페이지에서 계층 간 설정 충돌을 확인하세요.");
        m.insert("docs.bestpractices_debug_2", "메모리가 예상치 못한 동작의 원인이 될 수 있습니다. 자동 생성된 항목을 확인하세요 \u{2013} Claude가 올바른 접근법 대신 우회 방법을 기억하고 있을 수 있습니다.");
        m.insert("docs.bestpractices_debug_3", "세션 페이지를 사용하여 과거 대화를 검토하고 Claude가 무엇을 \u{201c}생각하고 있었는지\u{201d} 이해하세요.");

        // ── Docs: Links ──
        m.insert("docs.links_heading", "Anthropic 공식 문서");
        m.insert("docs.links_text", "이 링크들은 Anthropic이 관리하는 공식 문서를 가리킵니다. ClaudeAdmin은 이러한 사양 위에 구축되어 있습니다.");
        m.insert("docs.link_overview_title", "Claude Code 개요");
        m.insert("docs.link_overview_desc", "시작하기, 설치, 기본 사용법");
        m.insert("docs.link_memory_title", "메모리 및 CLAUDE.md");
        m.insert("docs.link_memory_desc", "Claude가 프로젝트 메모리를 저장하고 사용하는 방법");
        m.insert("docs.link_skills_title", "Skills");
        m.insert("docs.link_skills_desc", "재사용 가능한 Skills 생성 및 관리");
        m.insert("docs.link_settings_title", "설정");
        m.insert("docs.link_settings_desc", "구성 계층 및 옵션");
        m.insert("docs.link_hooks_title", "Hooks");
        m.insert("docs.link_hooks_desc", "셸 명령어를 사용한 이벤트 기반 자동화");
        m.insert("docs.link_mcp_title", "MCP 서버");
        m.insert("docs.link_mcp_desc", "외부 도구로 Claude 확장");
        m.insert("docs.link_bestpractices_title", "모범 사례");
        m.insert("docs.link_bestpractices_desc", "효과적인 Claude Code 사용을 위한 팁");
        m.insert("docs.link_mcp_spec_title", "MCP 사양");
        m.insert("docs.link_mcp_spec_desc", "Model Context Protocol 표준 사양");

        // ── Licenses ──
        m.insert("sidebar.licenses", "\u{b77c}\u{c774}\u{c120}\u{c2a4}");
        m.insert("licenses.title", "\u{b77c}\u{c774}\u{c120}\u{c2a4}");
        m.insert("licenses.subtitle", "\u{c624}\u{d508}\u{c18c}\u{c2a4} \u{b77c}\u{c774}\u{c120}\u{c2a4} \u{bc0f} \u{c758}\u{c874}\u{c131}");
        m.insert("licenses.own_license", "ClaudeAdmin \u{b77c}\u{c774}\u{c120}\u{c2a4}");
        m.insert("licenses.third_party", "\u{c11c}\u{b4dc}\u{d30c}\u{d2f0} \u{c758}\u{c874}\u{c131}");
        m.insert("licenses.col_name", "Crate");
        m.insert("licenses.col_version", "\u{bc84}\u{c804}");
        m.insert("licenses.col_license", "\u{b77c}\u{c774}\u{c120}\u{c2a4}");
        m.insert("licenses.search_placeholder", "\u{c758}\u{c874}\u{c131} \u{ac80}\u{c0c9}...");
        m.insert("licenses.loading", "\u{b77c}\u{c774}\u{c120}\u{c2a4} \u{b85c}\u{b529} \u{c911}");
        m.insert("licenses.count", "\u{ac1c} \u{c758}\u{c874}\u{c131}");
        m.insert("licenses.mit_copyright", "Copyright (c) 2024-2026");
        m.insert("licenses.mit_line1", "이 소프트웨어 및 관련 문서 파일(이하 \u{201c}소프트웨어\u{201d})의 사본을 얻는 모든 사람에게 소프트웨어를 제한 없이 다룰 수 있는 무료 허가를 부여합니다. 이에는 소프트웨어의 사본을 사용, 복사, 수정, 병합, 게시, 배포, 재라이선스 및/또는 판매할 권리가 포함되며, 소프트웨어를 제공받는 사람들이 그렇게 할 수 있도록 허용할 수 있습니다. 단, 다음 조건을 따라야 합니다:");
        m.insert("licenses.mit_line2", "위의 저작권 고지 및 이 허가 고지는 소프트웨어의 모든 사본 또는 상당 부분에 포함되어야 합니다.");
        m.insert("licenses.mit_line3", "소프트웨어는 상품성, 특정 목적에의 적합성 및 비침해에 대한 보증을 포함하되 이에 국한되지 않는 어떠한 종류의 명시적 또는 묵시적 보증 없이 \u{201c}있는 그대로\u{201d} 제공됩니다. 어떠한 경우에도 저작자 또는 저작권 보유자는 계약, 불법 행위 또는 기타 행위로 인해 소프트웨어 또는 소프트웨어의 사용 또는 기타 거래와 관련하여 발생하는 어떠한 청구, 손해 또는 기타 책임에 대해서도 책임을 지지 않습니다.");
        m.insert("licenses.direct_deps", "직접 종속성");
        m.insert("licenses.transitive_deps", "간접 종속성");
        m.insert("licenses.overview", "라이선스 개요");
        m.insert("licenses.direct_count", "직접");
        m.insert("licenses.transitive_count", "간접 종속성");

        // ── Components ──
        m.insert("component.modal.close", "닫기");
        m.insert("component.editor.save", "저장");
        m.insert("component.editor.saved", "저장되었습니다!");
        m.insert("component.json_editor.valid", "유효한 JSON");
        m.insert("component.json_editor.invalid", "유효하지 않은 JSON");
        m.insert("component.frontmatter.description", "설명");
        m.insert("component.frontmatter.user_invocable", "사용자 호출 가능");
        m.insert("component.advisor.title", "프로젝트 어드바이저");
        m.insert("component.advisor.analyze", "분석");
        m.insert("component.advisor.analyzing", "분석 중...");
        m.insert("component.advisor.no_api_key", "ANTHROPIC_API_KEY가 구성되지 않았습니다");
        m.insert("component.advisor.error", "권장 사항 로딩 오류");
        m.insert("component.advisor.summary", "요약");
        m.insert("component.advisor.recommendations", "권장 사항");
        m.insert("component.advisor.apply", "적용");
        m.insert("component.advisor.applied", "완료!");
        m.insert("component.advisor.analyze_project", "프로젝트 분석");
        m.insert("component.advisor.hint", "Claude가 프로젝트를 분석하고 권장 사항을 제공합니다");
        m.insert("component.advisor.loading", "Claude가 프로젝트를 분석 중입니다");
        m.insert("component.advisor.assessment", "프로젝트 평가");
        m.insert("component.advisor.show_preview", "미리보기 표시");
        m.insert("component.advisor.category_tip", "팁");
        m.insert("component.frontmatter.user_invocable_label", "사용자 호출 가능 (/command로 호출 가능)");
        m.insert("component.editor.saving", "저장 중...");

        // ── Common ──
        m.insert("common.error", "오류");
        m.insert("common.loading", "로딩 중");
        m.insert("common.save", "저장");
        m.insert("common.delete", "삭제");
        m.insert("common.cancel", "취소");
        m.insert("common.close", "닫기");
        m.insert("common.yes", "예");
        m.insert("common.no", "아니오");
        m.insert("common.ok", "OK");
        m.insert("common.error_prefix", "오류: ");
        m.insert("common.invalid_json", "유효하지 않은 JSON: ");

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
        m.insert("sidebar.agents", "에이전트");
        m.insert("sidebar.plugins", "플러그인");
        m.insert("sidebar.launch_profiles", "실행 프로필");
        m.insert("sidebar.system_prompts", "시스템 프롬프트");
        m.insert("sidebar.worktrees", "워크트리");

        // ── Agents ──
        m.insert("agents.title", "에이전트");
        m.insert("agents.subtitle", "커스텀 에이전트 구성 관리");
        m.insert("agents.tab_overview", "개요");
        m.insert("agents.tab_create", "새로 만들기");
        m.insert("agents.loading", "로딩 중...");
        m.insert("agents.empty", "에이전트가 없습니다");
        m.insert("agents.name", "이름");
        m.insert("agents.description", "설명");
        m.insert("agents.prompt", "프롬프트");
        m.insert("agents.model", "모델");
        m.insert("agents.allowed_tools", "허용된 도구");
        m.insert("agents.disallowed_tools", "차단된 도구");
        m.insert("agents.custom_instructions", "커스텀 지시사항");
        m.insert("agents.source", "소스");
        m.insert("agents.create_success", "에이전트가 생성되었습니다");
        m.insert("agents.update_success", "에이전트가 업데이트되었습니다");
        m.insert("agents.delete_confirm", "이 에이전트를 삭제하시겠습니까?");
        m.insert("agents.delete_success", "에이전트가 삭제되었습니다");
        m.insert("agents.copy_cli", "CLI 명령어 복사");
        m.insert("agents.copied", "복사됨");

        // ── Plugins ──
        m.insert("plugins.title", "플러그인");
        m.insert("plugins.subtitle", "설치된 플러그인 관리");
        m.insert("plugins.loading", "로딩 중...");
        m.insert("plugins.empty", "플러그인이 없습니다");
        m.insert("plugins.name", "이름");
        m.insert("plugins.version", "버전");
        m.insert("plugins.path", "경로");
        m.insert("plugins.status", "상태");
        m.insert("plugins.enabled", "활성");
        m.insert("plugins.disabled", "비활성");
        m.insert("plugins.install", "설치");
        m.insert("plugins.install_path", "설치 경로");
        m.insert("plugins.install_success", "플러그인이 설치되었습니다");
        m.insert("plugins.delete_confirm", "이 플러그인을 삭제하시겠습니까?");
        m.insert("plugins.delete_success", "플러그인이 삭제되었습니다");

        // ── Launch Profiles ──
        m.insert("launch_profiles.title", "실행 프로필");
        m.insert("launch_profiles.subtitle", "Claude Code 실행 구성 관리");
        m.insert("launch_profiles.tab_profiles", "프로필");
        m.insert("launch_profiles.tab_create", "새로 만들기");
        m.insert("launch_profiles.tab_presets", "프리셋");
        m.insert("launch_profiles.loading", "로딩 중...");
        m.insert("launch_profiles.empty", "프로필이 없습니다");
        m.insert("launch_profiles.name", "이름");
        m.insert("launch_profiles.description", "설명");
        m.insert("launch_profiles.model", "모델");
        m.insert("launch_profiles.effort", "추론 수준");
        m.insert("launch_profiles.permission_mode", "권한 모드");
        m.insert("launch_profiles.allowed_tools", "허용된 도구");
        m.insert("launch_profiles.disallowed_tools", "차단된 도구");
        m.insert("launch_profiles.system_prompt", "시스템 프롬프트");
        m.insert("launch_profiles.append_system_prompt", "시스템 프롬프트에 추가");
        m.insert("launch_profiles.max_budget", "최대 예산");
        m.insert("launch_profiles.fallback_model", "대체 모델");
        m.insert("launch_profiles.debug_filter", "디버그 필터");
        m.insert("launch_profiles.add_dirs", "디렉토리 추가");
        m.insert("launch_profiles.copy_command", "명령어 복사");
        m.insert("launch_profiles.copied", "복사됨");
        m.insert("launch_profiles.create_success", "프로필이 생성되었습니다");
        m.insert("launch_profiles.delete_confirm", "이 프로필을 삭제하시겠습니까?");
        m.insert("launch_profiles.delete_success", "프로필이 삭제되었습니다");
        m.insert("launch_profiles.use_template", "템플릿 사용");
        m.insert("launch_profiles.preset_code_review", "코드 리뷰");
        m.insert("launch_profiles.preset_code_review_desc", "읽기 전용 코드 리뷰 프로필");
        m.insert("launch_profiles.preset_full_dev", "풀 개발");
        m.insert("launch_profiles.preset_full_dev_desc", "전체 권한을 가진 개발 프로필");
        m.insert("launch_profiles.preset_quick_fix", "빠른 수정");
        m.insert("launch_profiles.preset_quick_fix_desc", "간단한 수정을 위한 경량 프로필");
        m.insert("launch_profiles.preset_research", "리서치");
        m.insert("launch_profiles.preset_research_desc", "코드베이스 조사용 프로필");
        m.insert("launch_profiles.preset_budget", "예산 제한");
        m.insert("launch_profiles.preset_budget_desc", "비용 제한이 있는 프로필");

        // ── System Prompts ──
        m.insert("system_prompts.title", "시스템 프롬프트");
        m.insert("system_prompts.subtitle", "재사용 가능한 시스템 프롬프트 관리");
        m.insert("system_prompts.tab_library", "라이브러리");
        m.insert("system_prompts.tab_create", "새로 만들기");
        m.insert("system_prompts.loading", "로딩 중...");
        m.insert("system_prompts.empty", "시스템 프롬프트가 없습니다");
        m.insert("system_prompts.name", "이름");
        m.insert("system_prompts.content", "내용");
        m.insert("system_prompts.modified", "수정일");
        m.insert("system_prompts.create_success", "시스템 프롬프트가 생성되었습니다");
        m.insert("system_prompts.update_success", "시스템 프롬프트가 업데이트되었습니다");
        m.insert("system_prompts.delete_confirm", "이 시스템 프롬프트를 삭제하시겠습니까?");
        m.insert("system_prompts.delete_success", "시스템 프롬프트가 삭제되었습니다");
        m.insert("system_prompts.copy_cli", "CLI 명령어 복사");
        m.insert("system_prompts.copied", "복사됨");
        m.insert("system_prompts.use_template", "템플릿 사용");
        m.insert("system_prompts.template_reviewer", "코드 리뷰어");
        m.insert("system_prompts.template_docs", "문서 작성자");
        m.insert("system_prompts.template_security", "보안 감사");
        m.insert("system_prompts.template_refactor", "리팩토링");

        // ── Worktrees ──
        m.insert("worktrees.title", "워크트리");
        m.insert("worktrees.subtitle", "Git 워크트리 관리");
        m.insert("worktrees.loading", "로딩 중...");
        m.insert("worktrees.empty", "워크트리가 없습니다");
        m.insert("worktrees.project_path", "프로젝트 경로");
        m.insert("worktrees.branch_name", "브랜치 이름");
        m.insert("worktrees.create", "생성");
        m.insert("worktrees.create_success", "워크트리가 생성되었습니다");
        m.insert("worktrees.delete_confirm", "이 워크트리를 삭제하시겠습니까?");
        m.insert("worktrees.delete_success", "워크트리가 삭제되었습니다");
        m.insert("worktrees.col_branch", "브랜치");
        m.insert("worktrees.col_path", "경로");
        m.insert("worktrees.col_head", "HEAD");
        m.insert("worktrees.col_status", "상태");
        m.insert("worktrees.col_actions", "작업");
        m.insert("worktrees.badge_main", "메인");
        m.insert("worktrees.badge_bare", "베어");
        m.insert("worktrees.badge_worktree", "워크트리");

        // ── 에이전트 (폼 필드) ──
        m.insert("agents.field_name", "이름");
        m.insert("agents.field_description", "설명");
        m.insert("agents.field_prompt", "프롬프트");
        m.insert("agents.field_model", "모델");
        m.insert("agents.field_allowed_tools", "허용된 도구");
        m.insert("agents.field_disallowed_tools", "차단된 도구");
        m.insert("agents.field_custom_instructions", "커스텀 지시사항");
        m.insert("agents.tools_hint", "쉼표로 구분된 목록, 예: Bash, Edit, Read");
        m.insert("agents.tools_placeholder", "Bash, Edit, Read, Write...");
        m.insert("agents.create_btn", "에이전트 생성");
        m.insert("agents.editing", "편집 중");
        m.insert("agents.save_success", "에이전트가 업데이트되었습니다");
        m.insert("agents.confirm_delete", "에이전트 삭제");
        m.insert("agents.name_required", "이름은 필수입니다");
        m.insert("agents.model_default", "기본값 (상속)");
        m.insert("agents.name_placeholder", "예: code-reviewer");
        m.insert("agents.desc_placeholder", "이 에이전트는 무엇을 하나요?");
        m.insert("agents.prompt_placeholder", "당신은 코드 리뷰어입니다...");
        m.insert("agents.instructions_placeholder", "추가 지시사항...");

        // ── 플러그인 (누락) ──
        m.insert("plugins.actions", "작업");

        // ── 실행 프로필 (누락) ──
        m.insert("launch_profiles.save_btn", "프로필 생성");

        // ── 공통 (누락) ──
        m.insert("common.edit", "편집");
        m.insert("common.saved", "저장됨");

        // ── Timeline ──
        m.insert("sidebar.timeline", "타임라인");
        m.insert("timeline.title", "타임라인");
        m.insert("timeline.subtitle", "Claude 구성의 Git 기반 버전 기록");
        m.insert("timeline.files", "파일");
        m.insert("timeline.restore", "복원");
        m.insert("timeline.confirm_restore_title", "구성 복원");
        m.insert("timeline.confirm_restore_msg", "선택한 커밋으로 모든 파일을 복원합니다. 현재 상태의 백업이 먼저 저장됩니다. 계속하시겠습니까?");
        m.insert("timeline.empty", "아직 타임라인 항목이 없습니다. 구성을 편집하면 여기에 변경 사항이 표시됩니다.");
        m.insert("timeline.error", "타임라인 로드 실패");
        m.insert("timeline.select_commit", "커밋을 선택하여 변경 사항 보기");
        m.insert("timeline.diff_for", "변경 사항");

        // ── Effective Config ──
        m.insert("effective.total_rules", "전체 규칙");
        m.insert("effective.total_skills", "전체 스킬");
        m.insert("effective.mcp_servers", "MCP 서버");
        m.insert("effective.hooks", "Hooks");
        m.insert("effective.memory_files", "메모리 파일");
        m.insert("effective.inherited", "상속됨");
        m.insert("effective.own", "고유");
        m.insert("effective.rules", "규칙");
        m.insert("effective.skills", "스킬");
        m.insert("effective.conflicts", "충돌");
        m.insert("effective.none", "없음");
        m.insert("effective.invocable", "호출 가능");

        // ── 도움말 채팅 ──
        m.insert("help_chat.title", "도움말");
        m.insert("help_chat.placeholder", "이 페이지에 대해 질문하세요...");
        m.insert("help_chat.send", "보내기");
        m.insert("help_chat.thinking", "생각 중...");
        m.insert("help_chat.clear", "새 대화");
        m.insert("help_chat.no_api_key", "도움말 채팅에는 API 키가 필요합니다. 설정에서 구성하세요.");

        m
    })
}
