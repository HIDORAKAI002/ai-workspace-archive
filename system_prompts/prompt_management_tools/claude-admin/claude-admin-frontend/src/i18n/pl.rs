use std::collections::HashMap;
use std::sync::OnceLock;

static TRANSLATIONS: OnceLock<HashMap<&'static str, &'static str>> = OnceLock::new();

pub fn translations() -> &'static HashMap<&'static str, &'static str> {
    TRANSLATIONS.get_or_init(|| {
        let mut m = HashMap::new();

        // ── App ──
        m.insert("app.title", "ClaudeAdmin");
        m.insert("app.subtitle", "Mened\u{017c}er konfiguracji");

        // ── Sidebar ──
        m.insert("sidebar.overview", "Przegl\u{0105}d");
        m.insert("sidebar.dashboard", "Panel");
        m.insert("sidebar.analytics", "Analityka");
        m.insert("sidebar.manage", "Zarz\u{0105}dzaj");
        m.insert("sidebar.projects", "Projekty");
        m.insert("sidebar.global_skills", "Globalne Skills");
        m.insert("sidebar.skill_browser", "Skill Browser");
        m.insert("sidebar.global_rules", "Globalne regu\u{0142}y");
        m.insert("sidebar.plans", "Plany");
        m.insert("sidebar.mcp_servers", "Serwery MCP");
        m.insert("sidebar.mcp_browser", "MCP Browser");
        m.insert("sidebar.security", "Bezpiecze\u{0144}stwo");
        m.insert("sidebar.permissions", "Uprawnienia");
        m.insert("sidebar.config_health", "Config Health");
        m.insert("sidebar.system", "System");
        m.insert("sidebar.settings", "Ustawienia");
        m.insert("sidebar.sessions", "Sesje");
        m.insert("sidebar.github", "GitHub");
        m.insert("sidebar.learn", "Nauka");
        m.insert("sidebar.docs", "Dokumentacja");
        m.insert("sidebar.help", "Info o systemie");

        // ── Dashboard ──
        m.insert("dashboard.title", "Panel");
        m.insert("dashboard.subtitle", "Przegl\u{0105}d konfiguracji Claude Code");
        m.insert("dashboard.projects", "Projekty");
        m.insert("dashboard.global_skills", "Globalne Skills");
        m.insert("dashboard.global_rules", "Globalne regu\u{0142}y");
        m.insert("dashboard.mcp_servers", "Serwery MCP");
        m.insert("dashboard.plans", "Plany");
        m.insert("dashboard.config_health", "Config Health");
        m.insert("dashboard.recent_projects", "Ostatnie projekty");
        m.insert("dashboard.recent_changes", "Ostatnie zmiany");
        m.insert("dashboard.no_recent_changes", "Brak ostatnich zmian");
        m.insert("dashboard.change_action", "Akcja");
        m.insert("dashboard.change_resource", "Zas\u{f3}b");
        m.insert("dashboard.change_time", "Czas");
        m.insert("dashboard.loading", "\u{0141}adowanie");
        m.insert("dashboard.error_loading", "B\u{0142}\u{0105}d podczas \u{0142}adowania panelu");
        m.insert("dashboard.col_name", "Nazwa");
        m.insert("dashboard.col_claude_md", "CLAUDE.md");
        m.insert("dashboard.col_skills", "Skills");
        m.insert("dashboard.col_rules", "Regu\u{0142}y");
        m.insert("dashboard.col_memory", "Memory");
        m.insert("dashboard.yes", "Tak");

        // ── MCP ──
        m.insert("mcp.title", "Serwery MCP");
        m.insert("mcp.subtitle", "Zarz\u{0105}dzanie serwerami Model Context Protocol dla Claude Code");
        m.insert("mcp.tab_servers", "Serwery");
        m.insert("mcp.tab_health", "Health Check");
        m.insert("mcp.tab_add", "Nowy serwer");
        m.insert("mcp.tab_browse", "Przeglądaj katalog");
        m.insert("mcp.loading", "\u{0141}adowanie serwer\u{00f3}w MCP");
        m.insert("mcp.no_servers", "Brak skonfigurowanych serwer\u{00f3}w MCP");
        m.insert("mcp.no_servers_hint", "Dodaj serwery przez zak\u{0142}adk\u{0119} 'Nowy serwer' lub MCP Browser.");
        m.insert("mcp.select_server", "Wybierz serwer z listy, aby wy\u{015b}wietli\u{0107} konfiguracj\u{0119}.");
        m.insert("mcp.no_servers_configured", "Brak skonfigurowanych serwer\u{00f3}w.");
        m.insert("mcp.check_health", "Health Check");
        m.insert("mcp.save", "Zapisz");
        m.insert("mcp.delete", "Usu\u{0144}");
        m.insert("mcp.saved", "Zapisano!");
        m.insert("mcp.deleted", "Usuni\u{0119}to!");
        m.insert("mcp.read_only", "Tylko odczyt");
        m.insert("mcp.read_only_hint", "Ten serwer jest zarz\u{0105}dzany zewn\u{0119}trznie i nie mo\u{017c}e by\u{0107} tu edytowany.");
        m.insert("mcp.health.title", "MCP Server Health");
        m.insert("mcp.health.check_all", "Sprawd\u{017a} wszystkie serwery");
        m.insert("mcp.health.checking", "Sprawdzanie...");
        m.insert("mcp.health.description", "Uruchamia ka\u{017c}dy serwer MCP, wysy\u{0142}a JSON-RPC initialize + tools/list i pokazuje wyniki. Timeout: 10 sekund na serwer.");
        m.insert("mcp.health.col_name", "Nazwa");
        m.insert("mcp.health.col_source", "\u{0179}r\u{00f3}d\u{0142}o");
        m.insert("mcp.health.col_status", "Status");
        m.insert("mcp.health.col_server_info", "Info o serwerze");
        m.insert("mcp.health.col_tools", "Narz\u{0119}dzia");
        m.insert("mcp.health.col_duration", "Czas");
        m.insert("mcp.health.running", "Dzia\u{0142}a");
        m.insert("mcp.health.error", "B\u{0142}\u{0105}d");
        m.insert("mcp.health.timeout", "Timeout");
        m.insert("mcp.health.unsupported", "Nieobsługiwany");
        m.insert("mcp.health.unknown", "Nieznany");
        m.insert("mcp.add.title", "Dodaj serwer MCP");
        m.insert("mcp.add.description", "Dodaj nowy serwer MCP do globalnej konfiguracji ~/.claude.json.");
        m.insert("mcp.add.name_label", "Nazwa serwera");
        m.insert("mcp.add.name_placeholder", "np. my-server");
        m.insert("mcp.add.config_label", "Konfiguracja serwera (JSON)");
        m.insert("mcp.add.mode_form", "Formularz");
        m.insert("mcp.add.mode_json", "Zaawansowany JSON");
        m.insert("mcp.add.command_label", "Polecenie");
        m.insert("mcp.add.args_label", "Argumenty");
        m.insert("mcp.add.args_hint", "Jeden argument na lini\u{0119}");
        m.insert("mcp.add.env_label", "Zmienne \u{015b}rodowiskowe");
        m.insert("mcp.add.env_hint", "Format KEY=VALUE, jedna na lini\u{0119}");
        m.insert("mcp.add.submit", "Dodaj serwer");
        m.insert("mcp.add.name_required", "Podaj nazw\u{0119} serwera");
        m.insert("mcp.browse.title", "Katalog serwerów MCP");
        m.insert("mcp.browse.description", "Przeglądaj popularne serwery MCP i instaluj jednym kliknięciem. Sprawdź konfigurację przed instalacją.");
        m.insert("mcp.browse.installed", "Zainstalowany");
        m.insert("mcp.browse.install", "Zainstaluj");
        m.insert("mcp.browse.show_config", "Pokaż konfigurację");
        m.insert("mcp.browse.hide_config", "Ukryj konfigurację");
        m.insert("mcp.browse.config_hint", "Sprawdź i edytuj konfigurację przed instalacją. Uzupełnij wymagane klucze API i ścieżki.");
        m.insert("mcp.browse.cat_system", "System i pliki");
        m.insert("mcp.browse.cat_database", "Bazy danych");
        m.insert("mcp.browse.cat_api", "API");
        m.insert("mcp.browse.cat_specialized", "Specjalistyczne");
        m.insert("mcp.browse.npm", "npm");
        m.insert("mcp.source.claude_code", "Claude Code");
        m.insert("mcp.source.claude_desktop", "Claude Desktop");

        // ── MCP Tools (Feature 7) ──
        m.insert("mcp.tab_tools", "Eksplorator narz\u{0119}dzi");
        m.insert("mcp.tools.title", "Eksplorator narz\u{0119}dzi");
        m.insert("mcp.tools.description", "Wszystkie narz\u{0119}dzia ze wszystkich serwer\u{00f3}w MCP");
        m.insert("mcp.tools.search", "Szukaj narz\u{0119}dzi...");
        m.insert("mcp.tools.parameters", "Parametry (JSON Schema)");
        m.insert("mcp.tools.required", "Wymagane");
        m.insert("mcp.tools.no_tools", "Nie znaleziono narz\u{0119}dzi. Najpierw uruchom Health Check.");
        m.insert("mcp.tools.from_server", "z");

        // ── MCP Browser ──
        m.insert("mcp_browser.title", "MCP Browser");
        m.insert("mcp_browser.subtitle", "Odkrywaj i instaluj serwery MCP dla Claude Code");
        m.insert("mcp_browser.search_placeholder", "Szukaj serwer\u{00f3}w MCP...");
        m.insert("mcp_browser.loading", "\u{0141}adowanie katalogu MCP");
        m.insert("mcp_browser.no_results", "Nie znaleziono serwer\u{00f3}w MCP");
        m.insert("mcp_browser.installed", "Zainstalowany");
        m.insert("mcp_browser.install", "Zainstaluj");
        m.insert("mcp_browser.needs_api_key", "Wymaga klucza API");
        m.insert("mcp_browser.install_success", "pomy\u{015b}lnie zainstalowany!");
        m.insert("mcp_browser.install_failed", "Instalacja nie powiod\u{0142}a si\u{0119}");

        // ── Projects ──
        m.insert("projects.tab_projects", "Projekty");
        m.insert("projects.tab_health", "Przegląd Zdrowia");
        m.insert("projects.title", "Projekty");
        m.insert("projects.subtitle", "Wszystkie projekty zarejestrowane w ~/.claude.json");
        m.insert("projects.loading", "\u{0141}adowanie");
        m.insert("projects.error_loading", "B\u{0142}\u{0105}d podczas \u{0142}adowania projekt\u{00f3}w: ");
        m.insert("projects.col_name", "Nazwa");
        m.insert("projects.col_path", "\u{015a}cie\u{017c}ka");
        m.insert("projects.col_claude_md", "CLAUDE.md");
        m.insert("projects.col_skills", "Skills");
        m.insert("projects.col_rules", "Regu\u{0142}y");
        m.insert("projects.col_memory", "Memory");
        m.insert("projects.yes", "Tak");

        // ── Project Detail ──
        m.insert("project_detail.loading", "\u{0141}adowanie szczeg\u{00f3}\u{0142}\u{00f3}w projektu");
        m.insert("project_detail.error_loading", "B\u{0142}\u{0105}d podczas \u{0142}adowania projektu");
        m.insert("project_detail.tab_advisor", "Advisor");
        m.insert("project_detail.tab_claude_md", "CLAUDE.md");
        m.insert("project_detail.tab_skills", "Skills");
        m.insert("project_detail.tab_rules", "Regu\u{0142}y");
        m.insert("project_detail.tab_memory", "Memory");
        m.insert("project_detail.tab_permissions", "Uprawnienia");
        m.insert("project_detail.tab_effective", "Konfiguracja efektywna");
        m.insert("project_detail.tab_health", "Health");
        m.insert("project_detail.no_claude_md", "Brak pliku CLAUDE.md");
        m.insert("project_detail.no_claude_md_hint", "Utw\u{00f3}rz plik CLAUDE.md w katalogu projektu, aby da\u{0107} Claude Code instrukcje.");
        m.insert("project_detail.no_skills", "Brak Skills dla tego projektu");
        m.insert("project_detail.no_rules", "Brak regu\u{0142} dla tego projektu");
        m.insert("project_detail.no_memory", "Brak Memory dla tego projektu");
        m.insert("project_detail.save", "Zapisz");
        m.insert("project_detail.saved", "Zapisano!");
        m.insert("project_detail.skill_scope", "Scope");
        m.insert("project_detail.permissions_loading", "\u{0141}adowanie uprawnie\u{0144}...");
        m.insert("project_detail.permissions_error", "B\u{0142}\u{0105}d podczas \u{0142}adowania uprawnie\u{0144}");
        m.insert("project_detail.permissions_entries", "Wpisy");
        m.insert("project_detail.permissions_col_tool", "Narz\u{0119}dzie");
        m.insert("project_detail.permissions_col_command", "Polecenie");
        m.insert("project_detail.permissions_no_entries", "Brak wpis\u{00f3}w uprawnie\u{0144}");
        m.insert("project_detail.health_loading", "Obliczanie Health...");
        m.insert("project_detail.health_error", "B\u{0142}\u{0105}d podczas \u{0142}adowania danych Health");
        m.insert("project_detail.health_score", "Health Score");
        m.insert("project_detail.health_claude_md", "CLAUDE.md obecny");
        m.insert("project_detail.health_memory", "Memory obecny");
        m.insert("project_detail.health_permissions", "Uprawnienia");
        m.insert("project_detail.health_security_issues", "Problemy bezpiecze\u{0144}stwa");
        m.insert("project_detail.health_duplicated_rules", "Zduplikowane regu\u{0142}y");
        m.insert("project_detail.health_no_security_issues", "Nie znaleziono problem\u{00f3}w bezpiecze\u{0144}stwa");
        m.insert("project_detail.health_col_text", "Tekst");
        m.insert("project_detail.health_col_found_in", "Znaleziono w");
        m.insert("project_detail.health_col_also_in", "Tak\u{017c}e w");
        m.insert("project_detail.health_permission_entries", "Wpisy uprawnie\u{0144}");
        m.insert("project_detail.permissions_col_index", "#");
        m.insert("project_detail.permissions_col_status", "Status");
        m.insert("project_detail.permissions_fragment", "Fragment");
        m.insert("project_detail.permissions_ok", "OK");
        m.insert("project_detail.permissions_security_warnings", "ostrze\u{017c}enia bezpiecze\u{0144}stwa");
        m.insert("project_detail.permissions_manage", "Zarz\u{0105}dzaj uprawnieniami");
        m.insert("project_detail.advisor_analyze", "Analizuj projekt");
        m.insert("project_detail.advisor_analyzing", "Analizowanie...");
        m.insert("project_detail.advisor_description", "Claude analizuje Tw\u{00f3}j projekt i daje rekomendacje");
        m.insert("project_detail.advisor_loading", "Claude analizuje Tw\u{00f3}j projekt");
        m.insert("project_detail.advisor_summary", "Ocena projektu");
        m.insert("project_detail.advisor_done", "Gotowe!");
        m.insert("project_detail.advisor_preview", "Poka\u{017c} podgl\u{0105}d");
        m.insert("project_detail.advisor_category_tip", "Wskaz\u{00f3}wka");
        m.insert("project_detail.skills_col_name", "Nazwa");
        m.insert("project_detail.skills_col_description", "Opis");
        m.insert("project_detail.skills_col_invocable", "Wywo\u{0142}ywalny");
        m.insert("project_detail.rules_col_name", "Nazwa");
        m.insert("project_detail.rules_col_path", "\u{015a}cie\u{017c}ka");
        m.insert("project_detail.memory_col_file", "Plik");
        m.insert("project_detail.memory_col_size", "Rozmiar");
        m.insert("project_detail.bytes", "bajt\u{00f3}w");
        m.insert("project_detail.unknown_tab", "Nieznana zak\u{0142}adka");

        // ── Project Profile (Feature 1) ──
        m.insert("project_detail.tab_profile", "Profil");
        m.insert("project_detail.profile_health", "Wynik Health");
        m.insert("project_detail.profile_rules", "Regu\u{0142}y");
        m.insert("project_detail.profile_skills", "Skills");
        m.insert("project_detail.profile_memory", "Memory");
        m.insert("project_detail.profile_mcp", "Serwery MCP");
        m.insert("project_detail.profile_hooks", "Hooki");
        m.insert("project_detail.profile_conflicts", "Konflikty");
        m.insert("project_detail.profile_analyze", "Uruchom g\u{0142}\u{0119}bok\u{0105} analiz\u{0119}");
        m.insert("project_detail.profile_no_mcp", "Brak serwer\u{00f3}w MCP");
        m.insert("project_detail.profile_global_scope", "Globalny");
        m.insert("project_detail.profile_project_scope", "Projekt");

        // ── Global Skills ──
        m.insert("global_skills.tab_my_skills", "Moje Skille");
        m.insert("global_skills.tab_browse", "Przeglądaj");
        m.insert("global_skills.tab_templates", "Szablony");
        m.insert("global_skills.title", "Globalne Skills");
        m.insert("global_skills.subtitle", "Zarz\u{0105}dzaj Skills w ~/.claude/skills/");
        m.insert("global_skills.loading", "\u{0141}adowanie Skills");
        m.insert("global_skills.no_skills", "Brak globalnych Skills");
        m.insert("global_skills.no_skills_hint", "Utw\u{00f3}rz Skills w ~/.claude/skills/ lub u\u{017c}yj Skill Browsera.");
        m.insert("global_skills.select_skill", "Wybierz Skill z listy.");
        m.insert("global_skills.col_skill", "Skill");
        m.insert("global_skills.col_invocable", "Wywo\u{0142}ywalny");
        m.insert("global_skills.invocable", "Wywo\u{0142}ywalny");
        m.insert("global_skills.not_invocable", "Niewywo\u{0142}ywalny");
        m.insert("global_skills.editing", "Edycja:");
        m.insert("global_skills.save", "Zapisz");
        m.insert("global_skills.saved", "Zapisano!");
        m.insert("global_skills.delete", "Usu\u{0144}");
        m.insert("global_skills.deleted", "Usuni\u{0119}to!");

        // ── Skill Builder (Feature 2) ──
        m.insert("global_skills.tab_create", "Utw\u{00f3}rz");
        m.insert("skill_builder.templates", "Szablony");
        m.insert("skill_builder.editor", "Edytor");
        m.insert("skill_builder.preview", "Podgl\u{0105}d");
        m.insert("skill_builder.name", "Nazwa Skilla");
        m.insert("skill_builder.name_placeholder", "np. m\u{00f3}j-skill");
        m.insert("skill_builder.name_required", "Podaj nazw\u{0119} Skilla");
        m.insert("skill_builder.description", "Opis");
        m.insert("skill_builder.desc_placeholder", "Co robi ten Skill?");
        m.insert("skill_builder.user_invocable", "Wywo\u{0142}ywalny (/command)");
        m.insert("skill_builder.content", "Tre\u{015b}\u{0107} Skilla (Markdown)");
        m.insert("skill_builder.save", "Zapisz Skilla");
        m.insert("skill_builder.saved", "Skill zapisany:");
        m.insert("skill_builder.trigger", "Wyzwalacz:");
        m.insert("skill_builder.preview_hint", "Wybierz szablon lub zacznij pisa\u{0107}, aby zobaczy\u{0107} podgl\u{0105}d na \u{017c}ywo.");

        // ── Global Rules ──
        m.insert("global_rules.title", "Globalne regu\u{0142}y");
        m.insert("global_rules.subtitle", "Zarz\u{0105}dzaj regu\u{0142}ami w ~/.claude/rules/");
        m.insert("global_rules.loading", "\u{0141}adowanie regu\u{0142}");
        m.insert("global_rules.no_rules", "Brak globalnych regu\u{0142}");
        m.insert("global_rules.no_rules_hint", "Utw\u{00f3}rz pliki .md w ~/.claude/rules/");
        m.insert("global_rules.select_rule", "Wybierz regu\u{0142}\u{0119} z listy.");
        m.insert("global_rules.col_rule", "Regu\u{0142}a");
        m.insert("global_rules.editing", "Edycja:");
        m.insert("global_rules.save", "Zapisz");
        m.insert("global_rules.saved", "Zapisano!");
        m.insert("global_rules.delete", "Usu\u{0144}");
        m.insert("global_rules.deleted", "Usuni\u{0119}to!");

        // ── Rules Conflicts (Feature 6) ──
        m.insert("rules.conflicts_title", "Konflikty regu\u{0142}");
        m.insert("rules.conflicts_found", "Znalezione konflikty");
        m.insert("rules.conflict_name_collision", "Kolizja nazw");
        m.insert("rules.conflict_content_overlap", "Nak\u{0142}adanie si\u{0119} tre\u{015b}ci");
        m.insert("rules.conflict_contradiction", "Sprzeczno\u{015b}\u{0107}");
        m.insert("rules.conflict_global", "Globalny");
        m.insert("rules.conflict_project", "Projekt");
        m.insert("rules.no_conflicts", "Nie wykryto konflikt\u{00f3}w");

        // ── Plans ──
        m.insert("plans.title", "Plany");
        m.insert("plans.subtitle", "Zarz\u{0105}dzaj plikami plan\u{00f3}w w ~/.claude/plans/");
        m.insert("plans.loading", "\u{0141}adowanie plan\u{00f3}w");
        m.insert("plans.no_plans", "Brak plan\u{00f3}w");
        m.insert("plans.no_plans_hint", "Plany s\u{0105} tworzone przez Claude Code podczas planowania.");
        m.insert("plans.select_plan", "Wybierz plan z listy.");
        m.insert("plans.col_plan", "Plan");
        m.insert("plans.col_modified", "Zmieniony");
        m.insert("plans.modified", "Zmieniony");
        m.insert("plans.plan_label", "Plan:");
        m.insert("plans.save", "Zapisz");
        m.insert("plans.saved", "Zapisano!");
        m.insert("plans.delete", "Usu\u{0144}");
        m.insert("plans.deleted", "Usuni\u{0119}to!");

        // ── Settings ──
        m.insert("settings.title", "Ustawienia");
        m.insert("settings.subtitle", "Zarz\u{0105}dzaj ustawieniami i hookami Claude Code");
        m.insert("settings.tab_overview", "Przegl\u{0105}d");
        m.insert("settings.tab_hooks", "Hook Templates");
        m.insert("settings.tab_storage", "Pami\u{0119}\u{0107}");
        m.insert("settings.loading", "\u{0141}adowanie ustawie\u{0144}");
        m.insert("settings.hooks_title", "Hooki");
        m.insert("settings.no_hooks", "Brak skonfigurowanych hook\u{00f3}w");
        m.insert("settings.pre_tool_use", "PreToolUse");
        m.insert("settings.post_tool_use", "PostToolUse");
        m.insert("settings.matcher", "Matcher");
        m.insert("settings.command", "Polecenie");
        m.insert("settings.hook_templates_title", "Hook Templates");
        m.insert("settings.hook_templates_desc", "Gotowe konfiguracje hook\u{00f3}w do dodania.");
        m.insert("settings.hook_templates_loading", "\u{0141}adowanie szablon\u{00f3}w");
        m.insert("settings.add_hook", "Dodaj");
        m.insert("settings.storage_title", "Zu\u{017c}ycie pami\u{0119}ci");
        m.insert("settings.storage_loading", "Obliczanie pami\u{0119}ci");
        m.insert("settings.storage_total", "Razem");
        m.insert("settings.storage_dir", "Katalog");
        m.insert("settings.storage_size", "Rozmiar");

        // ── Permissions ──
        m.insert("permissions.title", "Uprawnienia");
        m.insert("permissions.subtitle", "Przegl\u{0105}daj i zarz\u{0105}dzaj uprawnieniami projekt\u{00f3}w");
        m.insert("permissions.loading", "\u{0141}adowanie uprawnie\u{0144}");
        m.insert("permissions.no_permissions", "Nie znaleziono uprawnie\u{0144}");
        m.insert("permissions.col_project", "Projekt");
        m.insert("permissions.col_entries", "Wpisy");
        m.insert("permissions.col_issues", "Problemy");
        m.insert("permissions.col_fragmented", "Fragmentowane");
        m.insert("permissions.detail_title", "Uprawnienia");
        m.insert("permissions.detail_loading", "\u{0141}adowanie uprawnie\u{0144}");
        m.insert("permissions.detail_col_tool", "Narz\u{0119}dzie");
        m.insert("permissions.detail_col_command", "Polecenie");
        m.insert("permissions.detail_col_status", "Status");
        m.insert("permissions.detail_fragmented", "Fragmentowane");
        m.insert("permissions.detail_security_issue", "Problem bezpiecze\u{0144}stwa");
        m.insert("permissions.detail_delete_selected", "Usu\u{0144} zaznaczone");
        m.insert("permissions.detail_deleted", "Usuni\u{0119}to!");
        m.insert("permissions.detail_warnings_title", "Ostrze\u{017c}enia bezpiecze\u{0144}stwa");
        m.insert("permissions.health_title", "Config Health");
        m.insert("permissions.health_subtitle", "Stan zdrowia wszystkich projekt\u{00f3}w");
        m.insert("permissions.health_loading", "Obliczanie Health");
        m.insert("permissions.health_col_project", "Projekt");
        m.insert("permissions.health_col_score", "Wynik");
        m.insert("permissions.health_col_issues", "Problemy");
        m.insert("permissions.health_avg", "\u{015a}rednia");
        m.insert("permissions.subtitle_manage", "Zarz\u{0105}dzaj listami uprawnie\u{0144} wszystkich projekt\u{00f3}w");
        m.insert("permissions.col_actions", "Akcje");
        m.insert("permissions.col_security_issues", "Problemy bezpiecze\u{0144}stwa");
        m.insert("permissions.details", "Szczeg\u{00f3}\u{0142}y");
        m.insert("permissions.detail_subtitle", "Przegl\u{0105}daj i czysc wpisy uprawnie\u{0144}");
        m.insert("permissions.detail_deleting", "Usuwanie...");
        m.insert("permissions.detail_deleted_reloading", "Usuni\u{0119}to! Prze\u{0142}adowywanie...");
        m.insert("permissions.detail_delete_count", "Usu\u{0144} zaznaczone");
        m.insert("permissions.detail_col_index", "#");
        m.insert("permissions.detail_fragment", "Fragment");
        m.insert("permissions.detail_ok", "OK");
        m.insert("permissions.detail_warnings_count", "Ostrze\u{017c}enia bezpiecze\u{0144}stwa");
        m.insert("permissions.detail_entry", "wpis");
        m.insert("permissions.health_subtitle_scores", "Wyniki Config Health wszystkich projekt\u{00f3}w");
        m.insert("permissions.health_avg_score", "\u{015a}redni wynik Health");
        m.insert("permissions.health_projects_analyzed", "Przeanalizowane projekty");
        m.insert("permissions.health_no_issues", "Brak problem\u{00f3}w");

        // ── Analytics ──
        m.insert("analytics.title", "Analityka");
        m.insert("analytics.subtitle", "Statystyki u\u{017c}ycia Claude Code");
        m.insert("analytics.loading", "\u{0141}adowanie analityki");
        m.insert("analytics.error_loading", "B\u{0142}\u{0105}d podczas \u{0142}adowania analityki");
        m.insert("analytics.total_sessions", "Sesje razem");
        m.insert("analytics.total_messages", "Wiadomo\u{015b}ci razem");
        m.insert("analytics.git_commits", "Git Commits");
        m.insert("analytics.lines_added", "Dodane linie");
        m.insert("analytics.lines_removed", "Usuni\u{0119}te linie");
        m.insert("analytics.since", "od");
        m.insert("analytics.activity_heatmap", "Mapa aktywno\u{015b}ci");
        m.insert("analytics.messages", "Wiadomo\u{015b}ci");
        m.insert("analytics.sessions", "Sesje");
        m.insert("analytics.tool_calls", "Wywo\u{0142}ania narz\u{0119}dzi");
        m.insert("analytics.hourly_distribution", "Rozk\u{0142}ad godzinowy");
        m.insert("analytics.model_usage", "U\u{017c}ycie modeli");
        m.insert("analytics.col_model", "Model");
        m.insert("analytics.col_input_tokens", "Input Tokens");
        m.insert("analytics.col_output_tokens", "Output Tokens");
        m.insert("analytics.col_cache_tokens", "Cache Tokens");
        m.insert("analytics.tool_ranking", "Ranking narz\u{0119}dzi");
        m.insert("analytics.col_cache_read", "Cache Read");
        m.insert("analytics.tool_usage_top10", "U\u{017c}ycie narz\u{0119}dzi (Top 10)");
        m.insert("analytics.languages", "J\u{0119}zyki");
        m.insert("analytics.session_outcomes", "Wyniki sesji");
        m.insert("analytics.outcomes", "Wyniki");

        // ── Teach Me Tips (Feature 5) ──
        m.insert("analytics.tips_title", "Spostrze\u{017c}enia i wskaz\u{00f3}wki");
        m.insert("analytics.tips_dismiss", "Zamknij");
        m.insert("analytics.tips_learn_more", "Dowiedz si\u{0119} wi\u{0119}cej");
        m.insert("analytics.tip_category_tool", "Narz\u{0119}dzie");
        m.insert("analytics.tip_category_workflow", "Workflow");
        m.insert("analytics.tip_category_performance", "Wydajno\u{015b}\u{0107}");
        m.insert("analytics.tip_category_config", "Konfiguracja");
        m.insert("analytics.no_tips", "Brak dost\u{0119}pnych wskaz\u{00f3}wek");

        // ── Sessions ──
        m.insert("sessions.title", "Sesje");
        m.insert("sessions.subtitle", "Przegl\u{0105}daj histori\u{0119} sesji Claude Code");
        m.insert("sessions.loading", "\u{0141}adowanie sesji");
        m.insert("sessions.search_placeholder", "Szukaj sesji...");
        m.insert("sessions.no_sessions", "Nie znaleziono sesji");
        m.insert("sessions.col_project", "Projekt");
        m.insert("sessions.col_date", "Data");
        m.insert("sessions.col_duration", "Czas trwania");
        m.insert("sessions.col_messages", "Wiadomo\u{015b}ci");
        m.insert("sessions.col_summary", "Podsumowanie");
        m.insert("sessions.col_outcome", "Wynik");
        m.insert("sessions.minutes", "min");
        m.insert("sessions.load_more", "Za\u{0142}aduj wi\u{0119}cej");
        m.insert("sessions.detail_title", "Szczeg\u{00f3}\u{0142}y sesji");
        m.insert("sessions.detail_loading", "\u{0141}adowanie sesji");
        m.insert("sessions.detail_project", "Projekt");
        m.insert("sessions.detail_start", "Start");
        m.insert("sessions.detail_duration", "Czas trwania");
        m.insert("sessions.detail_messages", "Wiadomo\u{015b}ci");
        m.insert("sessions.detail_tools", "Wywo\u{0142}ania narz\u{0119}dzi");
        m.insert("sessions.detail_tokens", "Tokeny");
        m.insert("sessions.detail_git", "Git");
        m.insert("sessions.detail_first_prompt", "Pierwszy prompt");
        m.insert("sessions.detail_summary", "Podsumowanie");
        m.insert("sessions.back", "Wstecz");
        m.insert("sessions.searching", "Szukanie...");
        m.insert("sessions.search", "Szukaj");
        m.insert("sessions.clear", "Wyczy\u{015b}\u{0107}");
        m.insert("sessions.search_results", "Wyniki wyszukiwania");
        m.insert("sessions.no_results", "Nie znaleziono wynik\u{00f3}w");
        m.insert("sessions.col_prompt", "Prompt");
        m.insert("sessions.session_prefix", "Sesja: ");
        m.insert("sessions.detail_start_time", "Czas startu");
        m.insert("sessions.user_messages", " u\u{017c}ytkownik / ");
        m.insert("sessions.assistant_messages", " asystent");
        m.insert("sessions.tokens_in", " wej / ");
        m.insert("sessions.tokens_out", " wyj");
        m.insert("sessions.commits_label", " commit\u{00f3}w, +");
        m.insert("sessions.lines_minus", " / -");
        m.insert("sessions.tools_used", "U\u{017c}yte narz\u{0119}dzia");
        m.insert("sessions.outcome_prefix", "Wynik: ");
        m.insert("sessions.showing", "Pokazano");
        m.insert("sessions.of", "z");
        m.insert("sessions.previous", "Poprzednie");
        m.insert("sessions.next", "Nast\u{0119}pne");

        // ── GitHub ──
        m.insert("github.title", "GitHub");
        m.insert("github.subtitle", "Status integracji GitHub");
        m.insert("github.loading", "\u{0141}adowanie danych GitHub");
        m.insert("github.auth_status", "Status autoryzacji");
        m.insert("github.username", "Nazwa u\u{017c}ytkownika");
        m.insert("github.linked_repos", "Po\u{0142}\u{0105}czone repozytoria");
        m.insert("github.no_repos", "Brak po\u{0142}\u{0105}czonych repozytori\u{00f3}w");
        m.insert("github.col_repo", "Repozytorium");
        m.insert("github.col_recent_commits", "Ostatnie commity");
        m.insert("github.col_open_prs", "Otwarte PR");

        // ── Help / System Info ──
        m.insert("help.title", "Info o systemie");
        m.insert("help.subtitle", "Informacje systemowe Claude Code");
        m.insert("help.loading", "\u{0141}adowanie informacji systemowych");
        m.insert("help.account", "Konto");
        m.insert("help.account_name", "Nazwa");
        m.insert("help.account_email", "E-mail");
        m.insert("help.subscription", "Subskrypcja");
        m.insert("help.claude_version", "Wersja Claude Code");
        m.insert("help.gh_cli", "GitHub CLI");
        m.insert("help.skill_usage", "U\u{017c}ycie Skills");
        m.insert("help.no_skill_usage", "Brak zarejestrowanego u\u{017c}ycia Skills");
        m.insert("help.col_skill", "Skill");
        m.insert("help.col_count", "Wywo\u{0142}ania");
        m.insert("help.what_is_title", "Czym jest ClaudeAdmin?");
        m.insert("help.what_is_desc", "ClaudeAdmin to wizualna konsola administracyjna dla Claude Code. Zapewnia interfejs webowy do zarz\u{0105}dzania wszystkimi aspektami konfiguracji Claude Code: Projektami, Skills, Regu\u{0142}ami, Memory, Ustawieniami, Hookami, Serwerami MCP i Planami.");
        m.insert("help.system_status", "Status systemu");
        m.insert("help.not_set", "Nie ustawiono");
        m.insert("help.unknown", "Nieznany");
        m.insert("help.not_found", "Nie znaleziono");
        m.insert("help.not_installed", "Nie zainstalowano");
        m.insert("help.concepts_title", "Koncepcje Claude Code");
        m.insert("help.concept_skills", "Wielokrotnego u\u{017c}ytku prompty z YAML frontmatter. Przechowywane jako SKILL.md w ~/.claude/skills/ (globalnie) lub .claude/skills/ (projekt).");
        m.insert("help.concept_rules", "Ograniczenia i wytyczne kszta\u{0142}tuj\u{0105}ce zachowanie Claude\u{2019}a. Przechowywane jako pliki .md w ~/.claude/rules/ lub na poziomie projektu.");
        m.insert("help.concept_memory", "Trwa\u{0142}e notatki per projekt. MEMORY.md jest automatycznie \u{0142}adowany do prompt\u{00f3}w systemowych. Przechowuje wzorce, preferencje i wnioski.");
        m.insert("help.concept_hooks", "Polecenia shell wywo\u{0142}ywane przez zdarzenia (PreToolUse, PostToolUse, Stop). Konfigurowane w settings.json dla autoformatowania, lintingu itp.");
        m.insert("help.concept_mcp", "Serwery Model Context Protocol rozszerzaj\u{0105} Claude o zewn\u{0119}trzne narz\u{0119}dzia. Konfigurowane w ~/.claude.json z command, args i env.");
        m.insert("help.concept_claudemd", "Plik instrukcji na poziomie projektu. Automatycznie \u{0142}adowany jako kontekst. Zawiera konwencje projektu, info o stacku i wytyczne kodowania.");
        m.insert("help.disclaimer", "ClaudeAdmin jest niezale\u{017c}nym projektem spo\u{0142}eczno\u{015b}ciowym. Nie jest powi\u{0105}zany z Anthropic, ani przez Anthropic wspierany lub zatwierdzony. Claude i Claude Code s\u{0105} znakami towarowymi Anthropic.");

        m.insert("github.subtitle_detail", "Integracja GitHub CLI i po\u{0142}\u{0105}czone repozytoria");
        m.insert("github.linked_repositories", "Po\u{0142}\u{0105}czone repozytoria");
        m.insert("github.no_linked_repos", "Brak po\u{0142}\u{0105}czonych repozytori\u{00f3}w GitHub w ~/.claude.json");
        m.insert("github.col_name", "Nazwa");
        m.insert("github.col_path", "\u{015a}cie\u{017c}ka");

        // ── Skill Browser ──
        m.insert("skill_browser.title", "Skill Browser");
        m.insert("skill_browser.subtitle", "Odkrywaj i instaluj oficjalne i community Skills");
        m.insert("skill_browser.loading", "\u{0141}adowanie Skills");
        m.insert("skill_browser.search_placeholder", "Szukaj Skills...");
        m.insert("skill_browser.no_results", "Nie znaleziono Skills");
        m.insert("skill_browser.installed", "Zainstalowany");
        m.insert("skill_browser.install", "Zainstaluj");
        m.insert("skill_browser.official", "Oficjalny");
        m.insert("skill_browser.community", "Community");
        m.insert("skill_browser.tab_official", "Oficjalne (Anthropic)");
        m.insert("skill_browser.tab_community", "Community");
        m.insert("skill_browser.install_success", "pomy\u{015b}lnie zainstalowany!");
        m.insert("skill_browser.install_failed", "Instalacja nie powiod\u{0142}a si\u{0119}:");

        // ── Docs ──
        m.insert("docs.title", "Dokumentacja");
        m.insert("docs.subtitle", "Wszystko, co musisz wiedzie\u{0107} o konfiguracji Claude Code");
        m.insert("docs.loading", "\u{0141}adowanie dokumentacji");

        // ── Docs: Spis tre\u{015b}ci ──
        m.insert("docs.toc_contents", "Spis tre\u{015b}ci");
        m.insert("docs.toc_why_claudeadmin", "Dlaczego ClaudeAdmin?");
        m.insert("docs.toc_capabilities", "Co potrafi, a czego nie");
        m.insert("docs.toc_group", "Koncepcje");
        m.insert("docs.toc_claude_md", "CLAUDE.md");
        m.insert("docs.toc_rules", "Regu\u{0142}y");
        m.insert("docs.toc_skills", "Skills");
        m.insert("docs.toc_memory", "Memory");
        m.insert("docs.toc_settings", "Ustawienia i Hooki");
        m.insert("docs.toc_mcp", "Serwery MCP");
        m.insert("docs.toc_plans", "Plany");
        m.insert("docs.toc_scopes", "Global vs. Projekt");
        m.insert("docs.toc_tips", "Wskaz\u{00f3}wki i najlepsze praktyki");
        m.insert("docs.toc_links", "Oficjalna dokumentacja");

        // ── Docs: Wsp\u{00f3}lne etykiety ──
        m.insert("docs.tips_heading", "Wskaz\u{00f3}wki i triki");
        m.insert("docs.scope_global", "Globalny");
        m.insert("docs.scope_project", "Projekt");
        m.insert("docs.scope_user", "U\u{017c}ytkownik");
        m.insert("docs.scope_parent", "Nadrz\u{0119}dny");
        m.insert("docs.scope_managed", "Zarz\u{0105}dzany");
        m.insert("docs.scope_local", "Lokalny");

        // ── Docs: Przegl\u{0105}d ──
        m.insert("docs.overview_heading", "Dlaczego ClaudeAdmin?");
        m.insert("docs.overview_callout", " to centralna konsola administracyjna dla ca\u{0142}ej konfiguracji Claude Code. Zast\u{0119}puje r\u{0119}czn\u{0105} edycj\u{0119} plik\u{00f3}w w dziesi\u{0105}tkach ukrytych katalog\u{00f3}w jednym wizualnym interfejsem.");
        m.insert("docs.overview_text1", "Claude Code przechowuje konfiguracj\u{0119} w z\u{0142}o\u{017c}onej hierarchii plik\u{00f3}w i katalog\u{00f3}w: pliki CLAUDE.md w korzeniach projekt\u{00f3}w, regu\u{0142}y i Skills rozrzucone w podkatalogach ~/.claude/, pliki Memory wed\u{0142}ug zakodowanych \u{015b}cie\u{017c}ek projekt\u{00f3}w, ustawienia w wielu plikach JSON i konfiguracje serwer\u{00f3}w MCP w ~/.claude.json. Gdy projekty rosn\u{0105}, r\u{0119}czne zarz\u{0105}dzanie tym wszystkim staje si\u{0119} podatne na b\u{0142}\u{0119}dy i czasoch\u{0142}onne.");
        m.insert("docs.overview_text2", "ClaudeAdmin daje Ci:");
        m.insert("docs.overview_li_visibility_label", "Widoczno\u{015b}\u{0107}");
        m.insert("docs.overview_li_visibility", " \u{2013} Zobacz wszystkie projekty, Skills, regu\u{0142}y i Memory w jednym miejscu");
        m.insert("docs.overview_li_editing_label", "Edycja");
        m.insert("docs.overview_li_editing", " \u{2013} Edytuj CLAUDE.md, regu\u{0142}y, Skills i Memory za pomoc\u{0105} prawdziwego edytora");
        m.insert("docs.overview_li_health_label", "Health Checks");
        m.insert("docs.overview_li_health", " \u{2013} Wykrywaj problemy bezpiecze\u{0144}stwa w uprawnieniach, zduplikowane regu\u{0142}y i brakuj\u{0105}ce konfiguracje");
        m.insert("docs.overview_li_analytics_label", "Analityka");
        m.insert("docs.overview_li_analytics", " \u{2013} Zrozum, jak u\u{017c}ywasz Claude Code: sesje, tokeny, narz\u{0119}dzia, koszty");
        m.insert("docs.overview_li_advisor_label", "Advisor");
        m.insert("docs.overview_li_advisor", " \u{2013} Rekomendacje oparte na AI do ulepszenia konfiguracji projektu");

        // ── Docs: Mo\u{017c}liwo\u{015b}ci ──
        m.insert("docs.cap_heading", "Co ClaudeAdmin potrafi, a czego nie");
        m.insert("docs.cap_can_heading", "Co potrafi");
        m.insert("docs.cap_can_1", "Przegl\u{0105}daj i zarz\u{0105}dzaj wszystkimi projektami zarejestrowanymi w ~/.claude.json");
        m.insert("docs.cap_can_2", "Wy\u{015b}wietlaj i edytuj pliki CLAUDE.md dla ka\u{017c}dego projektu");
        m.insert("docs.cap_can_3", "Tw\u{00f3}rz, edytuj i usuwaj globalne i projektowe Skills");
        m.insert("docs.cap_can_4", "Tw\u{00f3}rz, edytuj i usuwaj globalne i projektowe regu\u{0142}y");
        m.insert("docs.cap_can_5", "Wy\u{015b}wietlaj i edytuj pliki Memory projektu (MEMORY.md i tematy)");
        m.insert("docs.cap_can_6", "Inspekcja hierarchii ustawie\u{0144} (Globalny \u{2192} Projekt \u{2192} Lokalny)");
        m.insert("docs.cap_can_7", "Audyt wpis\u{00f3}w uprawnie\u{0144} i wykrywanie problem\u{00f3}w bezpiecze\u{0144}stwa");
        m.insert("docs.cap_can_8", "Wy\u{015b}wietlaj konfiguracje serwer\u{00f3}w MCP");
        m.insert("docs.cap_can_9", "Analizuj histori\u{0119} sesji, zu\u{017c}ycie token\u{00f3}w i koszty");
        m.insert("docs.cap_can_10", "Przeprowadzaj analiz\u{0119} projektu opart\u{0105} na AI z konkretnymi rekomendacjami");
        m.insert("docs.cap_can_11", "Przegl\u{0105}daj i instaluj Skills z repozytori\u{00f3}w community");
        m.insert("docs.cap_can_12", "Wszystkie zapisy tworz\u{0105} automatyczne kopie zapasowe w ~/.claude/backups/");
        m.insert("docs.cap_cannot_heading", "Czego nie potrafi");
        m.insert("docs.cap_cannot_1", "Uruchamia\u{0107} sesji Claude Code \u{2013} zarz\u{0105}dza konfiguracj\u{0105}, nie wykonaniem");
        m.insert("docs.cap_cannot_2", "Zmienia\u{0107} zarz\u{0105}dzanych polityk (ustawienia enterprise/organizacji)");
        m.insert("docs.cap_cannot_3", "Uzyska\u{0107} dost\u{0119}p do \u{015b}rodowisk zdalnych lub sesji SSH");
        m.insert("docs.cap_cannot_4", "Zast\u{0105}pi\u{0107} Claude Code CLI do faktycznego kodowania");
        m.insert("docs.cap_cannot_5", "Edytowa\u{0107} serwer\u{00f3}w MCP w .claude.json bezpo\u{015b}rednio (tylko odczyt, dla bezpiecze\u{0144}stwa)");
        m.insert("docs.cap_cannot_6", "Zarz\u{0105}dza\u{0107} kluczami API lub danymi uwierzytelniaj\u{0105}cymi");
        m.insert("docs.cap_cannot_callout", "ClaudeAdmin to mened\u{017c}er konfiguracji, nie zamiennik Claude Code. Pomys\u{0142} o nim jak o narz\u{0119}dziu administracyjnym bazy danych: pomaga inspekcjonowa\u{0107}, konfigurowa\u{0107} i utrzymywa\u{0107} \u{2013} ale w\u{0142}a\u{015b}ciwa praca odbywa si\u{0119} w Claude Code.");

        // ── Docs: CLAUDE.md ──
        m.insert("docs.claudemd_callout", "Konstytucja projektu. CLAUDE.md to najwa\u{017c}niejszy plik konfiguracyjny \u{2013} jest automatycznie \u{0142}adowany do ka\u{017c}dej sesji Claude Code jako trwa\u{0142}y kontekst.");
        m.insert("docs.claudemd_how_heading", "Jak to dzia\u{0142}a");
        m.insert("docs.claudemd_how_text", "Gdy Claude Code uruchamia sesj\u{0119}, szuka rekurencyjnie plik\u{00f3}w CLAUDE.md od bie\u{017c}\u{0105}cego katalogu roboczego a\u{017c} do korzenia systemu plik\u{00f3}w. Wszystkie znalezione pliki s\u{0105} \u{0142}adowane i \u{0142}\u{0105}czone, przy czym bli\u{017c}sze pliki maj\u{0105} pierwsze\u{0144}stwo. Oznacza to, \u{017c}e mo\u{017c}esz mie\u{0107} CLAUDE.md na poziomie monorepo ze wsp\u{00f3}lnymi konwencjami i pliki CLAUDE.md na poziomie pakietu ze specyficznymi nadpisaniami.");
        m.insert("docs.claudemd_locations_heading", "Lokalizacje");
        m.insert("docs.claudemd_loc_project_or", " lub ");
        m.insert("docs.claudemd_loc_parent", "Korze\u{0144} monorepo, \u{0142}adowany dla wszystkich podpakiet\u{00f3}w");
        m.insert("docs.claudemd_loc_user", "Osobiste domy\u{015b}lne dla wszystkich projekt\u{00f3}w");
        m.insert("docs.claudemd_whatto_heading", "Co powinno si\u{0119} w nim znale\u{017a}\u{0107}");
        m.insert("docs.claudemd_whatto_context_label", "Kontekst projektu");
        m.insert("docs.claudemd_whatto_context", " \u{2013} Stack technologiczny, decyzje architektoniczne, kluczowe zale\u{017c}no\u{015b}ci");
        m.insert("docs.claudemd_whatto_standards_label", "Standardy kodowania");
        m.insert("docs.claudemd_whatto_standards", " \u{2013} Konwencje nazewnictwa, regu\u{0142}y formatowania, wzorce obs\u{0142}ugi b\u{0142}\u{0119}d\u{00f3}w");
        m.insert("docs.claudemd_whatto_workflows_label", "Przeplywy pracy");
        m.insert("docs.claudemd_whatto_workflows", " \u{2013} Budowanie, testowanie, wdra\u{017c}anie; nazewnictwo ga\u{0142}\u{0119}zi; konwencje PR");
        m.insert("docs.claudemd_whatto_dodont_label", "Regu\u{0142}y Do/Don\u{2019}t");
        m.insert("docs.claudemd_whatto_dodont", " \u{2013} Jawne ograniczenia (np. \u{201c}nigdy nie u\u{017c}ywaj any w TypeScript\u{201d})");
        m.insert("docs.claudemd_whatto_team_label", "Ustalenia zespo\u{0142}owe");
        m.insert("docs.claudemd_whatto_team", " \u{2013} Proces przegl\u{0105}du, format wiadomo\u{015b}ci commit, granice modu\u{0142}\u{00f3}w");
        m.insert("docs.claudemd_tip1", "Ogranicz do 500 linii. Claude \u{0142}aduje ca\u{0142}y plik do kontekstu \u{2013} rozdmuchane pliki CLAUDE.md marnuj\u{0105} tokeny i rozcie\u{0144}czaj\u{0105} wa\u{017c}ne instrukcje.");
        m.insert("docs.claudemd_tip2", "U\u{017c}ywaj wyra\u{017a}nych nag\u{0142}\u{00f3}wk\u{00f3}w sekcji (## Architektura, ## Konwencje). Claude wykorzystuje struktur\u{0119} do znajdowania odpowiednich sekcji.");
        m.insert("docs.claudemd_tip3", "Umie\u{015b}\u{0107} najwa\u{017c}niejsze regu\u{0142}y na pocz\u{0105}tku. W d\u{0142}ugich plikach tre\u{015b}\u{0107} na pocz\u{0105}tku otrzymuje wi\u{0119}cej uwagi.");
        m.insert("docs.claudemd_tip4", "U\u{017c}ywaj CLAUDE.local.md dla osobistych preferencji, kt\u{00f3}re nie powinny by\u{0107} commitowane do git.");
        m.insert("docs.claudemd_ext_link", "Anthropic Docs: CLAUDE.md \u{2192}");

        // ── Docs: Regu\u{0142}y ──
        m.insert("docs.rules_heading", "Regu\u{0142}y");
        m.insert("docs.rules_callout", "Modularne, tematyczne ograniczenia kszta\u{0142}tuj\u{0105}ce zachowanie Claude\u{2019}a. W przeciwie\u{0144}stwie do CLAUDE.md, kt\u{00f3}ry jest jednym du\u{017c}ym plikiem, regu\u{0142}y to oddzielne pliki .md \u{2013} ka\u{017c}dy skupiony na konkretnym temacie.");
        m.insert("docs.rules_how_heading", "Jak to dzia\u{0142}a");
        m.insert("docs.rules_how_text", "Regu\u{0142}y s\u{0105} \u{0142}adowane automatycznie przy starcie sesji. Globalne regu\u{0142}y (Twoje osobiste preferencje) s\u{0105} \u{0142}adowane najpierw, a potem regu\u{0142}y projektu je nadpisuj\u{0105}. Pozwala to zdefiniowa\u{0107} globalnie sw\u{00f3}j styl kodowania, podczas gdy projekty dodaj\u{0105} specyficzne dla domeny ograniczenia.");
        m.insert("docs.rules_locations_heading", "Lokalizacje");
        m.insert("docs.rules_loc_global", "Twoje osobiste regu\u{0142}y, stosowane do wszystkich projekt\u{00f3}w");
        m.insert("docs.rules_loc_project", "Specyficzne dla projektu, commitowane do git dla zespo\u{0142}u");
        m.insert("docs.rules_examples_heading", "Przyk\u{0142}ady");
        m.insert("docs.rules_example_frontend", " \u{2013} Wzorce komponent\u{00f3}w React, regu\u{0142}y zarz\u{0105}dzania stanem");
        m.insert("docs.rules_example_security", " \u{2013} Walidacja wej\u{015b}cia, wzorce autoryzacji, zgodno\u{015b}\u{0107} z OWASP");
        m.insert("docs.rules_example_testing", " \u{2013} Struktura test\u{00f3}w, oczekiwania pokrycia, strategia mockowania");
        m.insert("docs.rules_example_rust", " \u{2013} Obs\u{0142}uga b\u{0142}\u{0119}d\u{00f3}w z thiserror, struktura modu\u{0142}\u{00f3}w, nazewnictwo");
        m.insert("docs.rules_tip1", "Jeden temat na plik. Nie mieszaj regu\u{0142} frontend i backend \u{2013} mniejsze, skupione pliki s\u{0105} \u{0142}atwiejsze do utrzymania i ponownego u\u{017c}ycia.");
        m.insert("docs.rules_tip2", "Globalne regu\u{0142}y s\u{0105} \u{015b}wietne dla osobistych preferencji stylu: preferowany j\u{0119}zyk, narz\u{0119}dzie formatowania, format wiadomo\u{015b}ci commit.");
        m.insert("docs.rules_tip3", "Regu\u{0142}y projektu nadpisuj\u{0105} globalne regu\u{0142}y. W przypadku konfliktu wygrywa regu\u{0142}a poziomu projektu.");
        m.insert("docs.rules_tip4", "U\u{017c}yj Health Check ClaudeAdmin, aby wykry\u{0107} zduplikowane regu\u{0142}y mi\u{0119}dzy poziomem globalnym a projektowym.");
        m.insert("docs.rules_ext_link", "Anthropic Docs: Regu\u{0142}y \u{2192}");

        // ── Docs: Skills ──
        m.insert("docs.skills_heading", "Skills");
        m.insert("docs.skills_callout", "Wielokrotnego u\u{017c}ytku, strukturalne prompty z metadanymi. Skills s\u{0105} jak wtyczki dla Claude \u{2013} mog\u{0105} by\u{0107} wyzwalane automatycznie przez kontekst lub wywo\u{0142}ywane r\u{0119}cznie przez komendy slash.");
        m.insert("docs.skills_how_heading", "Jak to dzia\u{0142}a");
        m.insert("docs.skills_how_text", "Ka\u{017c}dy Skill \u{017c}yje we w\u{0142}asnym katalogu zawieraj\u{0105}cym plik SKILL.md z YAML frontmatter i tre\u{015b}ci\u{0105} markdown. Frontmatter definiuje metadane jak opis i warunki wyzwalania. Tre\u{015b}\u{0107} zawiera w\u{0142}a\u{015b}ciwe instrukcje prompt\u{00f3}w, przyk\u{0142}ady i materia\u{0142}y referencyjne.");
        m.insert("docs.skills_structure_heading", "Struktura");
        m.insert("docs.skills_locations_heading", "Lokalizacje");
        m.insert("docs.skills_loc_global", "Dost\u{0119}pne we wszystkich projektach");
        m.insert("docs.skills_loc_project", "Skills specyficzne dla projektu");
        m.insert("docs.skills_tip1", "Ustaw user_invocable: true we frontmatter, aby Skill by\u{0142} wywo\u{0142}ywalny przez /skill-name w Claude Code.");
        m.insert("docs.skills_tip2", "Do\u{0142}\u{0105}cz konkretne przyk\u{0142}ady w swoim SKILL.md. Claude dzia\u{0142}a znacznie lepiej z przyk\u{0142}adami input/output.");
        m.insert("docs.skills_tip3", "U\u{017c}yj Skill Browsera w ClaudeAdmin, aby odkrywa\u{0107} i instalowa\u{0107} community Skills.");
        m.insert("docs.skills_tip4", "Pliki referencyjne w katalogu Skill s\u{0105} \u{0142}adowane tylko gdy Skill jest wyzwalany \u{2013} to oszcz\u{0119}dza tokeny.");
        m.insert("docs.skills_ext_link", "Anthropic Docs: Skills \u{2192}");

        // ── Docs: Memory ──
        m.insert("docs.memory_heading", "Memory");
        m.insert("docs.memory_callout", "Trwa\u{0142}a baza wiedzy Claude per projekt. Pliki Memory przechowuj\u{0105} wzorce, preferencje i wnioski, kt\u{00f3}re Claude gromadzi przez sesje.");
        m.insert("docs.memory_how_heading", "Jak to dzia\u{0142}a");
        m.insert("docs.memory_how_text", "Claude Code utrzymuje katalog Memory dla ka\u{017c}dego projektu, przechowywany w ~/.claude/projects/<encoded-path>/memory/. G\u{0142}\u{00f3}wny plik MEMORY.md ma specjalny status: jego pierwsze 200 linii jest \u{0142}adowanych do promptu systemowego przy starcie sesji. Dodatkowe pliki tematyczne (debugging.md, api-conventions.md itp.) s\u{0105} \u{0142}adowane na \u{017c}\u{0105}danie, gdy Claude okre\u{015b}li, \u{017c}e s\u{0105} istotne dla bie\u{017c}\u{0105}cego zadania.");
        m.insert("docs.memory_structure_heading", "Struktura");
        m.insert("docs.memory_auto_heading", "Auto-Memory");
        m.insert("docs.memory_auto_text", "Claude Code mo\u{017c}e automatycznie dodawa\u{0107} wpisy do Memory, gdy odkryje wzorce projektu, rozwi\u{0105}zania debugowania lub Twoje preferencje. Mo\u{017c}esz przegl\u{0105}da\u{0107} i edytowa\u{0107} auto-generowane Memory komend\u{0105} /memory w Claude Code lub przez edytor Memory ClaudeAdmin.");
        m.insert("docs.memory_tip1", "Umie\u{015b}\u{0107} najwa\u{017c}niejsze informacje w pierwszych 200 liniach MEMORY.md \u{2013} to jest automatycznie \u{0142}adowane.");
        m.insert("docs.memory_tip2", "U\u{017c}ywaj plik\u{00f3}w tematycznych dla g\u{0142}\u{0119}bokiej wiedzy. S\u{0105} \u{0142}adowane tylko wtedy, gdy s\u{0105} potrzebne, utrzymuj\u{0105}c niskie podstawowe zu\u{017c}ycie token\u{00f3}w.");
        m.insert("docs.memory_tip3", "Regularnie przegl\u{0105}daj Auto-Memory. Claude czasem zapisuje zbyt specyficzne jednorazowe rozwi\u{0105}zania.");
        m.insert("docs.memory_tip4", "Memory jest per projekt. Gdy przechodzisz do innego projektu, Claude otrzymuje inny zestaw wspomnie\u{0144}.");
        m.insert("docs.memory_ext_link", "Anthropic Docs: Memory \u{2192}");

        // ── Docs: Ustawienia & Hooki ──
        m.insert("docs.settings_heading", "Ustawienia i Hooki");
        m.insert("docs.settings_heading_short", "Ustawienia");
        m.insert("docs.settings_callout", "Konfiguracja oparta na JSON dla zachowania, uprawnie\u{0144} i automatyzacji. Hooki pozwalaj\u{0105} uruchamia\u{0107} polecenia shell automatycznie przed lub po u\u{017c}yciu narz\u{0119}dzi przez Claude.");
        m.insert("docs.settings_hierarchy_heading", "Hierarchia ustawie\u{0144}");
        m.insert("docs.settings_hierarchy_text", "Ustawienia s\u{0105} warstwowe z rosn\u{0105}c\u{0105} specyficzno\u{015b}ci\u{0105}. Bardziej specyficzne warstwy nadpisuj\u{0105} mniej specyficzne:");
        m.insert("docs.settings_managed_code", "Polityki enterprise");
        m.insert("docs.settings_managed_desc", "Najwy\u{017c}szy priorytet, ustawiony przez organizacj\u{0119} (tylko odczyt)");
        m.insert("docs.settings_global_desc", "Twoje osobiste globalne ustawienia");
        m.insert("docs.settings_project_desc", "Ustawienia zespo\u{0142}owe, commitowane do git");
        m.insert("docs.settings_local_desc", "Twoje osobiste nadpisania projektu (gitignored)");
        m.insert("docs.settings_hooks_heading", "Hooki");
        m.insert("docs.settings_hooks_text", "Hooki to polecenia shell wyzwalane przez okre\u{015b}lone zdarzenia podczas sesji Claude Code. S\u{0105} konfigurowane w settings.json pod kluczem hooks.");
        m.insert("docs.settings_hooks_events", "Zdarzenia:\n\u{2022} PreToolUse  \u{2013} Przed u\u{017c}yciem narz\u{0119}dzia przez Claude (np. autoformatowanie przed zapisem)\n\u{2022} PostToolUse \u{2013} Po u\u{017c}yciu narz\u{0119}dzia przez Claude (np. lint po zmianie pliku)\n\u{2022} Stop        \u{2013} Gdy Claude ko\u{0144}czy odpowied\u{017a}");
        m.insert("docs.settings_tip1", "U\u{017c}ywaj hook\u{00f3}w PreToolUse do automatycznego formatowania kodu przed zapisem plik\u{00f3}w przez Claude. Zapewnia to sp\u{00f3}jny styl.");
        m.insert("docs.settings_tip2", "Hooki PostToolUse s\u{0105} \u{015b}wietne do lintingu: wykrywaj problemy natychmiast po zmianie kodu przez Claude.");
        m.insert("docs.settings_tip3", "Strona ustawie\u{0144} ClaudeAdmin pokazuje efektywny \u{0142}a\u{0144}cuch hook\u{00f3}w przez wszystkie warstwy.");
        m.insert("docs.settings_ext_link", "Anthropic Docs: Ustawienia \u{2192}");
        m.insert("docs.settings_hooks_ext_link", "Anthropic Docs: Hooki \u{2192}");

        // ── Docs: Serwery MCP ──
        m.insert("docs.mcp_heading", "Serwery MCP");
        m.insert("docs.mcp_callout", "Serwery Model Context Protocol rozszerzaj\u{0105} Claude o zewn\u{0119}trzne narz\u{0119}dzia i \u{017a}r\u{00f3}d\u{0142}a danych. Pozwalaj\u{0105} Claude na interakcj\u{0119} z bazami danych, API, systemami plik\u{00f3}w i innymi us\u{0142}ugami.");
        m.insert("docs.mcp_how_heading", "Jak to dzia\u{0142}a");
        m.insert("docs.mcp_how_text", "Serwery MCP to zewn\u{0119}trzne procesy, kt\u{00f3}re Claude Code uruchamia i komunikuje si\u{0119} z nimi przez protok\u{00f3}\u{0142} MCP. Ka\u{017c}dy serwer udost\u{0119}pnia zestaw narz\u{0119}dzi, kt\u{00f3}re Claude mo\u{017c}e wywo\u{0142}a\u{0107}. Konfiguracja znajduje si\u{0119} w ~/.claude.json pod kluczem mcpServers.");
        m.insert("docs.mcp_config_heading", "Konfiguracja");
        m.insert("docs.mcp_management_heading", "Zarz\u{0105}dzanie w ClaudeAdmin");
        m.insert("docs.mcp_management_text", "ClaudeAdmin oferuje dedykowan\u{0105} stron\u{0119} serwer\u{00f3}w MCP do pe\u{0142}nego zarz\u{0105}dzania: wy\u{015b}wietlaj, dodawaj, edytuj i usuwaj serwery bez r\u{0119}cznej edycji JSON. Funkcja Health Check uruchamia ka\u{017c}dy serwer i weryfikuje, czy odpowiada na \u{017c}\u{0105}dania JSON-RPC initialize i tools/list. U\u{017c}yj MCP Browsera, aby odkrywa\u{0107} i instalowa\u{0107} popularne serwery jednym klikni\u{0119}ciem.");
        m.insert("docs.mcp_tip1", "Serwery MCP mog\u{0105} by\u{0107} te\u{017c} konfigurowane per projekt w .claude/settings.json.");
        m.insert("docs.mcp_tip2", "U\u{017c}ywaj zmiennych \u{015b}rodowiskowych dla sekret\u{00f3}w \u{2013} nigdy nie koduj kluczy API bezpo\u{015b}rednio w plikach konfiguracyjnych.");
        m.insert("docs.mcp_tip3", "U\u{017c}yj MCP Browsera, aby odkrywa\u{0107} i instalowa\u{0107} popularne serwery, lub dodaj w\u{0142}asne przez zak\u{0142}adk\u{0119} \u{201c}Nowy serwer\u{201d}.");
        m.insert("docs.mcp_ext_link", "Anthropic Docs: MCP \u{2192}");
        m.insert("docs.mcp_spec_ext_link", "Specyfikacja MCP \u{2192}");

        // ── Docs: Plany ──
        m.insert("docs.plans_heading", "Plany");
        m.insert("docs.plans_callout", "Pliki markdown, kt\u{00f3}re Claude u\u{017c}ywa do rozk\u{0142}adania z\u{0142}o\u{017c}onych zada\u{0144}. Plany pomagaj\u{0105} Claude utrzyma\u{0107} skupienie przy wieloetapowej pracy i \u{015b}ledzi\u{0107} post\u{0119}p.");
        m.insert("docs.plans_how_heading", "Jak to dzia\u{0142}a");
        m.insert("docs.plans_how_text", "Gdy Claude podejmuje si\u{0119} z\u{0142}o\u{017c}onego zadania, mo\u{017c}e tworzy\u{0107} lub odwo\u{0142}ywa\u{0107} si\u{0119} do plik\u{00f3}w plan\u{00f3}w przechowywanych w ~/.claude/plans/. Plany to ustrukturyzowane dokumenty markdown z listami zada\u{0144}, zale\u{017c}no\u{015b}ciami i \u{015b}ledzeniem statusu. Utrzymuj\u{0105} si\u{0119} mi\u{0119}dzy sesjami, wi\u{0119}c Claude mo\u{017c}e kontynuowa\u{0107} tam, gdzie sko\u{0144}czy\u{0142}.");
        m.insert("docs.plans_location_heading", "Lokalizacja");
        m.insert("docs.plans_loc_global", "Wszystkie pliki plan\u{00f3}w");
        m.insert("docs.plans_tip1", "Popro\u{015b} Claude, aby \u{201c}zrobi\u{0142} plan\u{201d} przed z\u{0142}o\u{017c}onym refaktoringiem. Plany redukuj\u{0105} b\u{0142}\u{0119}dy przy zmianach w wielu plikach.");
        m.insert("docs.plans_tip2", "Regularnie sprz\u{0105}taj stare plany. Strona Plan\u{00f3}w ClaudeAdmin pokazuje wszystkie zapisane plany z datami modyfikacji.");

        // ── Docs: Scopes ──
        m.insert("docs.scopes_heading", "Global vs. Projekt Scope");
        m.insert("docs.scopes_callout", "Zrozumienie scope\u{2019}\u{00f3}w jest kluczem do efektywnej konfiguracji Claude Code. Ka\u{017c}dy typ konfiguracji istnieje w dw\u{00f3}ch warstwach: globalnej (Twoje osobiste domy\u{015b}lne) i specyficznej dla projektu (wsp\u{00f3}\u{0142}dzielonej z zespo\u{0142}em).");
        m.insert("docs.scopes_overview_heading", "Przegl\u{0105}d Scope");
        m.insert("docs.scopes_col_type", "Typ konfiguracji");
        m.insert("docs.scopes_col_global", "Globalny (U\u{017c}ytkownik)");
        m.insert("docs.scopes_col_project", "Projekt");
        m.insert("docs.scopes_col_priority", "Priorytet");
        m.insert("docs.scopes_priority_project_global", "Projekt > Globalny");
        m.insert("docs.scopes_priority_both", "Oba dost\u{0119}pne");
        m.insert("docs.scopes_memory_global", "Per projekt w ~/.claude/projects/");
        m.insert("docs.scopes_priority_project_keyed", "Klucz projektu");
        m.insert("docs.scopes_priority_local_project_global", "Lokalny > Projekt > Globalny");
        m.insert("docs.scopes_priority_merged", "Po\u{0142}\u{0105}czone");
        m.insert("docs.scopes_when_heading", "Kiedy u\u{017c}ywa\u{0107} czego?");
        m.insert("docs.scopes_use_global", "U\u{017c}yj Global dla");
        m.insert("docs.scopes_global_1", "Osobiste preferencje stylu kodowania");
        m.insert("docs.scopes_global_2", "Preferowane standardy j\u{0119}zyka i frameworka");
        m.insert("docs.scopes_global_3", "Format wiadomo\u{015b}ci commit");
        m.insert("docs.scopes_global_4", "Ustawienia integracji edytora/IDE");
        m.insert("docs.scopes_global_5", "Serwery MCP u\u{017c}ywane we wszystkich projektach");
        m.insert("docs.scopes_use_project", "U\u{017c}yj Project dla");
        m.insert("docs.scopes_project_1", "Dokumentacja i ograniczenia stosu technologicznego");
        m.insert("docs.scopes_project_2", "Konwencje kodowania zespo\u{0142}u");
        m.insert("docs.scopes_project_3", "Regu\u{0142}y specyficzne dla domeny (bezpiecze\u{0144}stwo, zgodno\u{015b}\u{0107})");
        m.insert("docs.scopes_project_4", "Skills i przeplywy pracy specyficzne dla projektu");
        m.insert("docs.scopes_project_5", "Hooki CI/CD i automatyzacja");

        // ── Docs: Optimization Guide ──
        m.insert("docs.toc_optimization", "Przewodnik optymalizacji");
        m.insert("docs.opt_heading", "Przewodnik optymalizacji");
        m.insert("docs.opt_callout", "Spersonalizowane wskaz\u{f3}wki z Analityki om\u{f3}wione szczeg\u{f3}\u{142}owo. Ka\u{17c}da sekcja wyja\u{15b}nia dlaczego wz\u{f3}r jest wa\u{17c}ny i jak si\u{119} poprawi\u{107}, z linkami do oficjalnej dokumentacji Anthropic.");
        m.insert("docs.opt_why", "Dlaczego:");
        m.insert("docs.opt_how", "Jak:");
        m.insert("docs.opt_task_heading", "R\u{f3}wnoleg\u{142}e agenty z narz\u{119}dziem Task");
        m.insert("docs.opt_task_why", "Narz\u{119}dzie Task uruchamia wyspecjalizowane podagenty pracuj\u{105}ce r\u{f3}wnolegle. Przy z\u{142}o\u{17c}onych, wieloetapowych zadaniach (badania, eksploracja kodu, testowanie) podagenty mog\u{105} dzia\u{142}a\u{107} jednocze\u{15b}nie zamiast sekwencyjnie, znacz\u{105}co skracaj\u{105}c ca\u{142}kowity czas.");
        m.insert("docs.opt_task_how", "Claude Code u\u{17c}ywa narz\u{119}dzia Task automatycznie, gdy rozpozna mo\u{17c}liwo\u{15b}ci r\u{f3}wnoleg\u{142}ego przetwarzania. Mo\u{17c}esz te\u{17c} poprosi\u{107} wprost: \u{201e}Zbadaj X i Y r\u{f3}wnolegle\u{201d} lub \u{201e}Uruchom testy podczas naprawiania b\u{142}\u{119}du.\u{201d} Ka\u{17c}dy agent dostaje w\u{142}asne okno kontekstu, dzi\u{119}ki czemu eksploracja du\u{17c}ych baz kodu jest bardziej wydajna.");
        m.insert("docs.opt_task_link", "Anthropic Docs: Najlepsze praktyki \u{2192}");
        m.insert("docs.opt_hooks_heading", "Automatyzacja z Hooks");
        m.insert("docs.opt_hooks_why", "Hooki to komendy powloki uruchamiane automatycznie przed lub po u\u{17c}yciu narz\u{119}dzia przez Claude. Bez hook\u{f3}w musisz r\u{119}cznie uruchamia\u{107} formatery, lintery i testy. Z hookami ka\u{17c}dy zapis pliku mo\u{17c}e automatycznie formatowa\u{107}, ka\u{17c}dy commit mo\u{17c}e automatycznie testowa\u{107}.");
        m.insert("docs.opt_hooks_how", "Skonfiguruj hooki w ~/.claude/settings.json pod kluczem \u{201e}hooks\u{201d}. U\u{17c}yj PreToolUse do uruchomienia akcji przed narz\u{119}dziem (np. formatowanie kodu przed zapisem). U\u{17c}yj PostToolUse do walidacji po zmianach (np. lint po edycji). U\u{17c}yj Stop do uruchomienia sprawdze\u{144} gdy Claude sko\u{144}czy.");
        m.insert("docs.opt_hooks_link", "Anthropic Docs: Hooks \u{2192}");
        m.insert("docs.opt_sessions_heading", "Optymalna d\u{142}ugo\u{15b}\u{107} sesji");
        m.insert("docs.opt_sessions_why", "D\u{142}ugie sesje gromadz\u{105} kontekst, kt\u{f3}ry mo\u{17c}e rozmy\u{107} skupienie Claude. Po wielu wiadomo\u{15b}ciach wcze\u{15b}niejsze instrukcje staj\u{105} si\u{119} mniej widoczne. Koszty token\u{f3}w r\u{f3}wnie\u{17c} rosn\u{105}, gdy okno kontekstu wype\u{142}nia si\u{119} histori\u{105} rozmowy.");
        m.insert("docs.opt_sessions_how", "Podziel z\u{142}o\u{17c}on\u{105} prac\u{119} na ukierunkowane sesje. U\u{17c}yj /clear, aby zresetowa\u{107} kontekst w ramach sesji. Dla projekt\u{f3}w wieloetapowych u\u{17c}yj plik\u{f3}w planu (Claude pisze plan, a nast\u{119}pnie wykonuje kroki w ukierunkowanych sesjach). Ka\u{17c}da nowa sesja zaczyna si\u{119} z maksymaln\u{105} uwag\u{105} na bie\u{17c}\u{105}ce zadanie.");
        m.insert("docs.opt_sessions_link", "Anthropic Docs: Najlepsze praktyki \u{2192}");
        m.insert("docs.opt_cost_heading", "Optymalizacja koszt\u{f3}w");
        m.insert("docs.opt_cost_why", "R\u{f3}\u{17c}ne modele Claude maj\u{105} bardzo r\u{f3}\u{17c}ne koszty. Opus \u{15b}wietnie radzi sobie ze z\u{142}o\u{17c}onym rozumowaniem, ale kosztuje wi\u{119}cej za token. Haiku jest szybki i tani, idealny do prostych zada\u{144}. U\u{17c}ywanie odpowiedniego modelu do ka\u{17c}dego zadania mo\u{17c}e drastycznie obni\u{17c}y\u{107} koszty.");
        m.insert("docs.opt_cost_how", "U\u{17c}yj /model, aby prze\u{142}\u{105}cza\u{107} modele podczas sesji. Haiku do: szybkich poprawek, formatowania kodu, prostych pyta\u{144}. Sonnet do: \u{15b}rednich zada\u{144} kodowania, przegl\u{105}d\u{f3}w. Opus do: projektowania architektury, z\u{142}o\u{17c}onego debugowania, refaktoryzacji wielu plik\u{f3}w. Strona Analityki pokazuje rozk\u{142}ad koszt\u{f3}w wed\u{142}ug modelu.");
        m.insert("docs.opt_cost_link", "Anthropic Docs: Przegl\u{105}d Claude Code \u{2192}");
        m.insert("docs.opt_write_heading", "Write vs Edit: wyb\u{f3}r w\u{142}a\u{15b}ciwego narz\u{119}dzia");
        m.insert("docs.opt_write_why", "Narz\u{119}dzie Write tworzy ca\u{142}e pliki na raz, podczas gdy Edit wprowadza ukierunkowane zmiany w istniej\u{105}cych plikach. Dla nowych plik\u{f3}w Write jest bardziej wydajne, poniewa\u{17c} Edit musi najpierw przeczyta\u{107} plik, a nast\u{119}pnie okre\u{15b}li\u{107} dok\u{142}adne zamiany ci\u{105}g\u{f3}w znak\u{f3}w.");
        m.insert("docs.opt_write_how", "Claude zazwyczaj automatycznie wybiera w\u{142}a\u{15b}ciwe narz\u{119}dzie. Ale je\u{15b}li tworzysz nowe pliki od podstaw (szablony, boilerplate, konfiguracja), wyra\u{17a}ne powiedzenie \u{201e}utw\u{f3}rz nowy plik\u{201d} pomaga Claude wybra\u{107} Write. Dla modyfikacji istniej\u{105}cego kodu Edit jest zawsze preferowany.");
        m.insert("docs.opt_models_heading", "R\u{f3}\u{17c}norodno\u{15b}\u{107} modeli");
        m.insert("docs.opt_models_why", "U\u{17c}ywanie jednego modelu do wszystkich zada\u{144} oznacza albo przep\u{142}acanie za prost\u{105} prac\u{119} (Opus do wszystkiego), albo niewystarczaj\u{105}c\u{105} moc dla z\u{142}o\u{17c}onych zada\u{144} (Haiku do wszystkiego). Ka\u{17c}da rodzina modeli ma mocne strony: Haiku dla szybko\u{15b}ci, Sonnet dla r\u{f3}wnowagi, Opus dla g\u{142}\u{119}bokiego rozumowania.");
        m.insert("docs.opt_models_how", "Prze\u{142}\u{105}czaj modele poleceniem /model. Dobry wz\u{f3}r: zacznij od Opus do planowania i architektury, przejd\u{17a} na Sonnet do implementacji, u\u{17c}yj Haiku do szybkich poprawek i formatowania. Strona Analityki pokazuje, kt\u{f3}rego modelu u\u{17c}ywasz najcz\u{119}\u{15b}ciej.");
        m.insert("docs.opt_models_link", "Anthropic Docs: Przegl\u{105}d Claude Code \u{2192}");
        m.insert("docs.opt_git_heading", "Integracja z Git");
        m.insert("docs.opt_git_why", "Claude Code mo\u{17c}e stagowa\u{107}, commitowa\u{107}, pushowa\u{107} i tworzy\u{107} PR bezpo\u{15b}rednio. Bez integracji z Git r\u{119}cznie commitujesz po ka\u{17c}dej sesji Claude, co przerywa przep\u{142}yw pracy i grozi zapomnieniem wa\u{17c}nych zmian.");
        m.insert("docs.opt_git_how", "Po prostu popro\u{15b} Claude o commit: \u{201e}commituj te zmiany\u{201d} lub u\u{17c}yj /commit. Claude pisze opisowe wiadomo\u{15b}ci commitowe, staguje tylko odpowiednie pliki i respektuje pre-commit hooks. Dla PR popro\u{15b} Claude o \u{201e}stworzenie PR\u{201d} \u{2013} u\u{17c}ywa gh CLI do pushowania i otwierania pull requesta z podsumowaniem.");
        m.insert("docs.opt_git_link", "Anthropic Docs: Najlepsze praktyki \u{2192}");
        m.insert("docs.opt_churn_heading", "Zmniejszanie zmienno\u{15b}ci kodu");
        m.insert("docs.opt_churn_why", "Gdy usuwanych jest wi\u{119}cej linii ni\u{17c} dodawanych, zwykle oznacza to, \u{17c}e Claude napisa\u{142} kod, kt\u{f3}ry musia\u{142} zosta\u{107} przepisany. To marnuje tokeny i czas. Cz\u{119}ste przyczyny: niejasne prompty, brakuj\u{105}cy kontekst lub Claude zgaduj\u{105}cy wymagania.");
        m.insert("docs.opt_churn_how", "B\u{105}d\u{17a} konkretny w promptach: odwo\u{142}uj si\u{119} do istniej\u{105}cych plik\u{f3}w, podawaj dok\u{142}adne nazwy funkcji, opisuj oczekiwane zachowanie. U\u{17c}yj CLAUDE.md do dokumentowania konwencji, aby Claude nie zgadywa\u{142}. Dla z\u{142}o\u{17c}onych zmian popro\u{15b} Claude o zaplanowanie najpierw (/plan) przed implementacj\u{105}. Przejrzyj plan Claude przed rozpocz\u{119}ciem kodowania.");
        m.insert("docs.opt_churn_link", "Anthropic Docs: Najlepsze praktyki \u{2192}");

        // ── Docs: Wskaz\u{00f3}wki & Best Practices ──
        m.insert("docs.bestpractices_heading", "Wskaz\u{00f3}wki i najlepsze praktyki");
        m.insert("docs.bestpractices_hygiene_heading", "Higiena konfiguracji");
        m.insert("docs.bestpractices_hygiene_1", "Regularnie uruchamiaj Config Health Check ClaudeAdmin. Wykrywa zduplikowane regu\u{0142}y, rozdmuchane listy uprawnie\u{0144} i brakuj\u{0105}ce pliki CLAUDE.md.");
        m.insert("docs.bestpractices_hygiene_2", "Nie powtarzaj si\u{0119}: je\u{015b}li regu\u{0142}a istnieje globalnie, nie kopiuj jej do CLAUDE.md projektu. U\u{017c}yj systemu scope.");
        m.insert("docs.bestpractices_hygiene_3", "Utrzymuj czyste listy uprawnie\u{0144}. Z czasem Claude Code gromadzi setki wpis\u{00f3}w zezwole\u{0144}/odmow. U\u{017c}yj strony Uprawnie\u{0144}, aby je oczy\u{015b}ci\u{0107}.");
        m.insert("docs.bestpractices_tokens_heading", "Efektywno\u{015b}\u{0107} token\u{00f3}w");
        m.insert("docs.bestpractices_tokens_1", "Wszystko w CLAUDE.md, regu\u{0142}ach, Skills (gdy wyzwolone) i pierwszych 200 liniach MEMORY.md liczy si\u{0119} do okna kontekstu. B\u{0105}d\u{017a} zwi\u{0119}z\u{0142}y.");
        m.insert("docs.bestpractices_tokens_2", "Przenoś szczeg\u{00f3}\u{0142}owe materia\u{0142}y referencyjne do plik\u{00f3}w referencyjnych Skill lub plik\u{00f3}w tematycznych Memory \u{2013} s\u{0105} \u{0142}adowane tylko wtedy, gdy s\u{0105} potrzebne.");
        m.insert("docs.bestpractices_tokens_3", "U\u{017c}yj strony Analityki, aby monitorowa\u{0107} zu\u{017c}ycie token\u{00f3}w w projektach i sesjach.");
        m.insert("docs.bestpractices_team_heading", "Wsp\u{00f3}\u{0142}praca zespo\u{0142}owa");
        m.insert("docs.bestpractices_team_1", "Commituj .claude/rules/ i .claude/skills/ do git. To dzieli konwencje w ca\u{0142}ym zespole.");
        m.insert("docs.bestpractices_team_2", "U\u{017c}ywaj .claude/settings.json dla ustawie\u{0144} zespo\u{0142}u i .claude/settings.local.json dla osobistych nadpisa\u{0144}.");
        m.insert("docs.bestpractices_team_3", "CLAUDE.md w korzeniu projektu to umowa Twojego zespo\u{0142}u z Claude. Traktuj jak dokumentacj\u{0119} \u{2013} przegl\u{0105}daj zmiany w PR-ach.");
        m.insert("docs.bestpractices_debug_heading", "Debugowanie zachowania Claude");
        m.insert("docs.bestpractices_debug_1", "Je\u{015b}li Claude ignoruje regu\u{0142}\u{0119}, sprawd\u{017a} stron\u{0119} Hierarchii Ustawie\u{0144} pod k\u{0105}tem sprzecznych ustawie\u{0144} mi\u{0119}dzy warstwami.");
        m.insert("docs.bestpractices_debug_2", "Memory mo\u{017c}e powodowa\u{0107} nieoczekiwane zachowanie. Przegl\u{0105}daj auto-generowane wpisy \u{2013} Claude m\u{00f3}g\u{0142} zapami\u{0119}ta\u{0107} obej\u{015b}cie zamiast prawid\u{0142}owego podej\u{015b}cia.");
        m.insert("docs.bestpractices_debug_3", "U\u{017c}yj strony Sesji, aby przegl\u{0105}da\u{0107} przesz\u{0142}e rozmowy i zrozumie\u{0107}, co Claude \u{201c}my\u{015b}la\u{0142}\u{201d}.");

        // ── Docs: Linki ──
        m.insert("docs.links_heading", "Oficjalna dokumentacja Anthropic");
        m.insert("docs.links_text", "Te linki prowadz\u{0105} do oficjalnej dokumentacji utrzymywanej przez Anthropic. ClaudeAdmin jest zbudowany na tych specyfikacjach.");
        m.insert("docs.link_overview_title", "Przegl\u{0105}d Claude Code");
        m.insert("docs.link_overview_desc", "Pierwsze kroki, instalacja i podstawowe u\u{017c}ycie");
        m.insert("docs.link_memory_title", "Memory & CLAUDE.md");
        m.insert("docs.link_memory_desc", "Jak Claude przechowuje i u\u{017c}ywa Memory projektu");
        m.insert("docs.link_skills_title", "Skills");
        m.insert("docs.link_skills_desc", "Tworzenie i zarz\u{0105}dzanie wielokrotnego u\u{017c}ytku Skills");
        m.insert("docs.link_settings_title", "Ustawienia");
        m.insert("docs.link_settings_desc", "Hierarchia konfiguracji i opcje");
        m.insert("docs.link_hooks_title", "Hooki");
        m.insert("docs.link_hooks_desc", "Automatyzacja zdarzeniowa z poleceniami shell");
        m.insert("docs.link_mcp_title", "Serwery MCP");
        m.insert("docs.link_mcp_desc", "Rozszerzanie Claude o zewn\u{0119}trzne narz\u{0119}dzia");
        m.insert("docs.link_bestpractices_title", "Najlepsze praktyki");
        m.insert("docs.link_bestpractices_desc", "Wskaz\u{00f3}wki dotycz\u{0105}ce efektywnego u\u{017c}ycia Claude Code");
        m.insert("docs.link_mcp_spec_title", "Specyfikacja MCP");
        m.insert("docs.link_mcp_spec_desc", "Standard Model Context Protocol");

        // ── Licenses ──
        m.insert("sidebar.licenses", "Licencje");
        m.insert("licenses.title", "Licencje");
        m.insert("licenses.subtitle", "Licencje open source i zale\u{017c}no\u{015b}ci");
        m.insert("licenses.own_license", "Licencja ClaudeAdmin");
        m.insert("licenses.third_party", "Zale\u{017c}no\u{015b}ci firm trzecich");
        m.insert("licenses.col_name", "Crate");
        m.insert("licenses.col_version", "Wersja");
        m.insert("licenses.col_license", "Licencja");
        m.insert("licenses.search_placeholder", "Szukaj zale\u{017c}no\u{015b}ci...");
        m.insert("licenses.loading", "\u{0141}adowanie licencji");
        m.insert("licenses.count", "zale\u{017c}no\u{015b}ci");
        m.insert("licenses.mit_copyright", "Copyright (c) 2024-2026");
        m.insert("licenses.mit_line1", "Niniejszym udziela się bezpłatnego zezwolenia każdej osobie, która uzyska kopię tego oprogramowania i powiązanych plików dokumentacji (\u{201c}Oprogramowanie\u{201d}), na korzystanie z Oprogramowania bez ograniczeń, w tym bez ograniczeń prawa do używania, kopiowania, modyfikowania, łączenia, publikowania, dystrybucji, sublicencjonowania i/lub sprzedaży kopii Oprogramowania, oraz zezwalania osobom, którym Oprogramowanie jest dostarczane, na to samo, z zastrzeżeniem następujących warunków:");
        m.insert("licenses.mit_line2", "Powyższa informacja o prawach autorskich i niniejsza informacja o zezwoleniu muszą być zawarte we wszystkich kopiach lub istotnych częściach Oprogramowania.");
        m.insert("licenses.mit_line3", "OPROGRAMOWANIE JEST DOSTARCZANE \u{201c}TAK JAK JEST\u{201d}, BEZ JAKIEJKOLWIEK GWARANCJI, WYRAŹNEJ LUB DOROZUMIANEJ, W TYM BEZ OGRANICZEŃ GWARANCJI PRZYDATNOŚCI HANDLOWEJ, PRZYDATNOŚCI DO OKREŚLONEGO CELU I NIENARUSZALNOŚCI. W ŻADNYM WYPADKU AUTORZY LUB POSIADACZE PRAW AUTORSKICH NIE PONOSZĄ ODPOWIEDZIALNOŚCI ZA JAKIEKOLWIEK ROSZCZENIA, SZKODY LUB INNE ZOBOWIĄZANIA, CZY TO W RAMACH UMOWY, CZYNU NIEDOZWOLONEGO CZY INNEGO, WYNIKAJĄCE Z OPROGRAMOWANIA LUB W ZWIĄZKU Z OPROGRAMOWANIEM LUB KORZYSTANIEM Z NIEGO LUB INNYMI CZYNNOŚCIAMI W OPROGRAMOWANIU.");
        m.insert("licenses.direct_deps", "Bezpośrednie zależności");
        m.insert("licenses.transitive_deps", "Pośrednie zależności");
        m.insert("licenses.overview", "Przegląd licencji");
        m.insert("licenses.direct_count", "bezpośrednich");
        m.insert("licenses.transitive_count", "pośrednich zależności");

        // ── Components ──
        m.insert("component.modal.close", "Zamknij");
        m.insert("component.editor.save", "Zapisz");
        m.insert("component.editor.saved", "Zapisano!");
        m.insert("component.json_editor.valid", "Prawid\u{0142}owy JSON");
        m.insert("component.json_editor.invalid", "Nieprawid\u{0142}owy JSON");
        m.insert("component.frontmatter.description", "Opis");
        m.insert("component.frontmatter.user_invocable", "Wywo\u{0142}ywalny przez u\u{017c}ytkownika");
        m.insert("component.advisor.title", "Doradca projektu");
        m.insert("component.advisor.analyze", "Analizuj");
        m.insert("component.advisor.analyzing", "Analizowanie...");
        m.insert("component.advisor.no_api_key", "Brak skonfigurowanego ANTHROPIC_API_KEY");
        m.insert("component.advisor.error", "B\u{0142}\u{0105}d podczas \u{0142}adowania rekomendacji");
        m.insert("component.advisor.summary", "Podsumowanie");
        m.insert("component.advisor.recommendations", "Rekomendacje");
        m.insert("component.advisor.apply", "Zastosuj");
        m.insert("component.advisor.applied", "Gotowe!");
        m.insert("component.advisor.analyze_project", "Analizuj projekt");
        m.insert("component.advisor.hint", "Claude analizuje Tw\u{00f3}j projekt i daje rekomendacje");
        m.insert("component.advisor.loading", "Claude analizuje Tw\u{00f3}j projekt");
        m.insert("component.advisor.assessment", "Ocena projektu");
        m.insert("component.advisor.show_preview", "Poka\u{017c} podgl\u{0105}d");
        m.insert("component.advisor.category_tip", "Wskaz\u{00f3}wka");
        m.insert("component.frontmatter.user_invocable_label", "Wywo\u{0142}ywalny (mo\u{017c}na wywo\u{0142}a\u{0107} przez /command)");
        m.insert("component.editor.saving", "Zapisywanie...");

        // ── Common ──
        m.insert("common.error", "B\u{0142}\u{0105}d");
        m.insert("common.loading", "\u{0141}adowanie");
        m.insert("common.save", "Zapisz");
        m.insert("common.delete", "Usu\u{0144}");
        m.insert("common.cancel", "Anuluj");
        m.insert("common.close", "Zamknij");
        m.insert("common.yes", "Tak");
        m.insert("common.no", "Nie");
        m.insert("common.ok", "OK");
        m.insert("common.error_prefix", "B\u{0142}\u{0105}d: ");
        m.insert("common.invalid_json", "Nieprawid\u{0142}owy JSON: ");

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
        m.insert("sidebar.agents", "Agenci");
        m.insert("sidebar.plugins", "Wtyczki");
        m.insert("sidebar.launch_profiles", "Profile startowe");
        m.insert("sidebar.system_prompts", "Prompty systemowe");
        m.insert("sidebar.worktrees", "Drzewa robocze");

        // ── Agents ──
        m.insert("agents.title", "Agenci");
        m.insert("agents.subtitle", "Zarządzanie konfiguracjami agentów");
        m.insert("agents.tab_overview", "Przegląd");
        m.insert("agents.tab_create", "Utwórz nowego");
        m.insert("agents.loading", "Ładowanie...");
        m.insert("agents.empty", "Nie znaleziono agentów");
        m.insert("agents.name", "Nazwa");
        m.insert("agents.description", "Opis");
        m.insert("agents.prompt", "Prompt");
        m.insert("agents.model", "Model");
        m.insert("agents.allowed_tools", "Dozwolone narzędzia");
        m.insert("agents.disallowed_tools", "Zablokowane narzędzia");
        m.insert("agents.custom_instructions", "Niestandardowe instrukcje");
        m.insert("agents.source", "Źródło");
        m.insert("agents.create_success", "Agent został utworzony");
        m.insert("agents.update_success", "Agent został zaktualizowany");
        m.insert("agents.delete_confirm", "Czy na pewno chcesz usunąć tego agenta?");
        m.insert("agents.delete_success", "Agent został usunięty");
        m.insert("agents.copy_cli", "Kopiuj polecenie CLI");
        m.insert("agents.copied", "Skopiowano");

        // ── Plugins ──
        m.insert("plugins.title", "Wtyczki");
        m.insert("plugins.subtitle", "Zarządzanie zainstalowanymi wtyczkami");
        m.insert("plugins.loading", "Ładowanie...");
        m.insert("plugins.empty", "Nie znaleziono wtyczek");
        m.insert("plugins.name", "Nazwa");
        m.insert("plugins.version", "Wersja");
        m.insert("plugins.path", "Ścieżka");
        m.insert("plugins.status", "Status");
        m.insert("plugins.enabled", "Włączona");
        m.insert("plugins.disabled", "Wyłączona");
        m.insert("plugins.install", "Zainstaluj");
        m.insert("plugins.install_path", "Ścieżka instalacji");
        m.insert("plugins.install_success", "Wtyczka została zainstalowana");
        m.insert("plugins.delete_confirm", "Czy na pewno chcesz usunąć tę wtyczkę?");
        m.insert("plugins.delete_success", "Wtyczka została usunięta");

        // ── Launch Profiles ──
        m.insert("launch_profiles.title", "Profile startowe");
        m.insert("launch_profiles.subtitle", "Zarządzanie konfiguracjami startowymi Claude Code");
        m.insert("launch_profiles.tab_profiles", "Profile");
        m.insert("launch_profiles.tab_create", "Utwórz nowy");
        m.insert("launch_profiles.tab_presets", "Szablony");
        m.insert("launch_profiles.loading", "Ładowanie...");
        m.insert("launch_profiles.empty", "Nie znaleziono profili");
        m.insert("launch_profiles.name", "Nazwa");
        m.insert("launch_profiles.description", "Opis");
        m.insert("launch_profiles.model", "Model");
        m.insert("launch_profiles.effort", "Poziom wnioskowania");
        m.insert("launch_profiles.permission_mode", "Tryb uprawnień");
        m.insert("launch_profiles.allowed_tools", "Dozwolone narzędzia");
        m.insert("launch_profiles.disallowed_tools", "Zablokowane narzędzia");
        m.insert("launch_profiles.system_prompt", "Prompt systemowy");
        m.insert("launch_profiles.append_system_prompt", "Dopisz do promptu systemowego");
        m.insert("launch_profiles.max_budget", "Maksymalny budżet");
        m.insert("launch_profiles.fallback_model", "Model zapasowy");
        m.insert("launch_profiles.debug_filter", "Filtr debugowania");
        m.insert("launch_profiles.add_dirs", "Dodaj katalogi");
        m.insert("launch_profiles.copy_command", "Kopiuj polecenie");
        m.insert("launch_profiles.copied", "Skopiowano");
        m.insert("launch_profiles.create_success", "Profil został utworzony");
        m.insert("launch_profiles.delete_confirm", "Czy na pewno chcesz usunąć ten profil?");
        m.insert("launch_profiles.delete_success", "Profil został usunięty");
        m.insert("launch_profiles.use_template", "Użyj szablonu");
        m.insert("launch_profiles.preset_code_review", "Przegląd kodu");
        m.insert("launch_profiles.preset_code_review_desc", "Profil tylko do odczytu do przeglądu kodu");
        m.insert("launch_profiles.preset_full_dev", "Pełne programowanie");
        m.insert("launch_profiles.preset_full_dev_desc", "Profil programistyczny z pełnymi uprawnieniami");
        m.insert("launch_profiles.preset_quick_fix", "Szybka poprawka");
        m.insert("launch_profiles.preset_quick_fix_desc", "Lekki profil do drobnych poprawek");
        m.insert("launch_profiles.preset_research", "Badanie");
        m.insert("launch_profiles.preset_research_desc", "Profil do analizy bazy kodu");
        m.insert("launch_profiles.preset_budget", "Limit budżetu");
        m.insert("launch_profiles.preset_budget_desc", "Profil z limitem kosztów");

        // ── System Prompts ──
        m.insert("system_prompts.title", "Prompty systemowe");
        m.insert("system_prompts.subtitle", "Zarządzanie wielokrotnie używanymi promptami systemowymi");
        m.insert("system_prompts.tab_library", "Biblioteka");
        m.insert("system_prompts.tab_create", "Utwórz nowy");
        m.insert("system_prompts.loading", "Ładowanie...");
        m.insert("system_prompts.empty", "Nie znaleziono promptów systemowych");
        m.insert("system_prompts.name", "Nazwa");
        m.insert("system_prompts.content", "Treść");
        m.insert("system_prompts.modified", "Zmodyfikowano");
        m.insert("system_prompts.create_success", "Prompt systemowy został utworzony");
        m.insert("system_prompts.update_success", "Prompt systemowy został zaktualizowany");
        m.insert("system_prompts.delete_confirm", "Czy na pewno chcesz usunąć ten prompt systemowy?");
        m.insert("system_prompts.delete_success", "Prompt systemowy został usunięty");
        m.insert("system_prompts.copy_cli", "Kopiuj polecenie CLI");
        m.insert("system_prompts.copied", "Skopiowano");
        m.insert("system_prompts.use_template", "Użyj szablonu");
        m.insert("system_prompts.template_reviewer", "Recenzent kodu");
        m.insert("system_prompts.template_docs", "Autor dokumentacji");
        m.insert("system_prompts.template_security", "Audyt bezpieczeństwa");
        m.insert("system_prompts.template_refactor", "Refaktoryzacja");

        // ── Worktrees ──
        m.insert("worktrees.title", "Drzewa robocze");
        m.insert("worktrees.subtitle", "Zarządzanie drzewami roboczymi Git");
        m.insert("worktrees.loading", "Ładowanie...");
        m.insert("worktrees.empty", "Nie znaleziono drzew roboczych");
        m.insert("worktrees.project_path", "Ścieżka projektu");
        m.insert("worktrees.branch_name", "Nazwa gałęzi");
        m.insert("worktrees.create", "Utwórz");
        m.insert("worktrees.create_success", "Drzewo robocze zostało utworzone");
        m.insert("worktrees.delete_confirm", "Czy na pewno chcesz usunąć to drzewo robocze?");
        m.insert("worktrees.delete_success", "Drzewo robocze zostało usunięte");
        m.insert("worktrees.col_branch", "Gałąź");
        m.insert("worktrees.col_path", "Ścieżka");
        m.insert("worktrees.col_head", "HEAD");
        m.insert("worktrees.col_status", "Status");
        m.insert("worktrees.col_actions", "Akcje");
        m.insert("worktrees.badge_main", "Główna");
        m.insert("worktrees.badge_bare", "Goła");
        m.insert("worktrees.badge_worktree", "Drzewo robocze");

        // ── Agenci (pola formularza) ──
        m.insert("agents.field_name", "Nazwa");
        m.insert("agents.field_description", "Opis");
        m.insert("agents.field_prompt", "Prompt");
        m.insert("agents.field_model", "Model");
        m.insert("agents.field_allowed_tools", "Dozwolone narz\u{0119}dzia");
        m.insert("agents.field_disallowed_tools", "Zablokowane narz\u{0119}dzia");
        m.insert("agents.field_custom_instructions", "Niestandardowe instrukcje");
        m.insert("agents.tools_hint", "Lista rozdzielona przecinkami, np. Bash, Edit, Read");
        m.insert("agents.tools_placeholder", "Bash, Edit, Read, Write...");
        m.insert("agents.create_btn", "Utw\u{f3}rz agenta");
        m.insert("agents.editing", "Edycja");
        m.insert("agents.save_success", "Agent zosta\u{0142} zaktualizowany");
        m.insert("agents.confirm_delete", "Usu\u{0144} agenta");
        m.insert("agents.name_required", "Nazwa jest wymagana");
        m.insert("agents.model_default", "Domy\u{015b}lny (dziedziczony)");
        m.insert("agents.name_placeholder", "np. code-reviewer");
        m.insert("agents.desc_placeholder", "Co robi ten agent?");
        m.insert("agents.prompt_placeholder", "Jeste\u{015b} recenzentem kodu...");
        m.insert("agents.instructions_placeholder", "Dodatkowe instrukcje...");

        // ── Wtyczki (brakuj\u{0105}ce) ──
        m.insert("plugins.actions", "Akcje");

        // ── Profile uruchamiania (brakuj\u{0105}ce) ──
        m.insert("launch_profiles.save_btn", "Utw\u{f3}rz profil");

        // ── Wsp\u{f3}lne (brakuj\u{0105}ce) ──
        m.insert("common.edit", "Edytuj");
        m.insert("common.saved", "Zapisano");

        // ── Timeline ──
        m.insert("sidebar.timeline", "Oś czasu");
        m.insert("timeline.title", "Oś czasu");
        m.insert("timeline.subtitle", "Historia wersji konfiguracji Claude oparta na Git");
        m.insert("timeline.files", "pliki");
        m.insert("timeline.restore", "Przywróć");
        m.insert("timeline.confirm_restore_title", "Przywróć konfigurację");
        m.insert("timeline.confirm_restore_msg", "Spowoduje to przywrócenie wszystkich plików do wybranego commita. Najpierw zostanie zapisana kopia zapasowa bieżącego stanu. Kontynuować?");
        m.insert("timeline.empty", "Brak wpisów na osi czasu. Zmiany pojawią się tutaj, gdy edytujesz konfigurację.");
        m.insert("timeline.error", "Nie udało się załadować osi czasu");
        m.insert("timeline.select_commit", "Wybierz commit, aby zobaczyć zmiany");
        m.insert("timeline.diff_for", "Zmiany w");

        // ── Effective Config ──
        m.insert("effective.total_rules", "Łącznie reguł");
        m.insert("effective.total_skills", "Łącznie umiejętności");
        m.insert("effective.mcp_servers", "Serwery MCP");
        m.insert("effective.hooks", "Hooks");
        m.insert("effective.memory_files", "Pliki pamięci");
        m.insert("effective.inherited", "Odziedziczone");
        m.insert("effective.own", "Własne");
        m.insert("effective.rules", "Reguły");
        m.insert("effective.skills", "Umiejętności");
        m.insert("effective.conflicts", "Konflikty");
        m.insert("effective.none", "Brak");
        m.insert("effective.invocable", "Wywoływalny");

        // ── Czat pomocy ──
        m.insert("help_chat.title", "Pomoc");
        m.insert("help_chat.placeholder", "Zapytaj o tę stronę...");
        m.insert("help_chat.send", "Wyślij");
        m.insert("help_chat.thinking", "Myślę...");
        m.insert("help_chat.clear", "Nowa rozmowa");
        m.insert("help_chat.no_api_key", "Klucz API wymagany do czatu pomocy. Skonfiguruj w Ustawieniach.");

        m
    })
}
