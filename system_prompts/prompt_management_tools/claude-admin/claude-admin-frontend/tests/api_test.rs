use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

// Test that shared types serialize/deserialize correctly
#[wasm_bindgen_test]
fn test_health_response_deserialize() {
    let json = r#"{"status":"ok","version":"0.1.0"}"#;
    let resp: claude_admin_shared::HealthResponse = serde_json::from_str(json).unwrap();
    assert_eq!(resp.status, "ok");
    assert_eq!(resp.version, "0.1.0");
}

#[wasm_bindgen_test]
fn test_dashboard_overview_deserialize() {
    let json = r#"{
        "global_skills_count": 5,
        "global_rules_count": 3,
        "projects_count": 10,
        "mcp_servers_count": 2,
        "plans_count": 1,
        "recent_projects": [],
        "conflicts": []
    }"#;
    let overview: claude_admin_shared::DashboardOverview = serde_json::from_str(json).unwrap();
    assert_eq!(overview.global_skills_count, 5);
    assert_eq!(overview.projects_count, 10);
}

#[wasm_bindgen_test]
fn test_analytics_overview_deserialize() {
    let json = r#"{
        "total_sessions": 100,
        "total_messages": 5000,
        "first_session_date": "2024-01-01",
        "daily_activity": [],
        "hour_distribution": [],
        "model_usage": [],
        "tool_ranking": [],
        "language_breakdown": [],
        "outcome_distribution": [],
        "total_git_commits": 50,
        "total_lines_added": 10000,
        "total_lines_removed": 3000,
        "estimated_total_cost_usd": 42.50
    }"#;
    let overview: claude_admin_shared::AnalyticsOverview = serde_json::from_str(json).unwrap();
    assert_eq!(overview.total_sessions, 100);
    assert_eq!(overview.estimated_total_cost_usd, 42.50);
}

#[wasm_bindgen_test]
fn test_backup_entry_deserialize() {
    let json = r#"{"name":"20240101_120000_test","size_bytes":1024,"created":"2024-01-01 12:00:00","original_path":"test"}"#;
    let entry: claude_admin_shared::BackupEntry = serde_json::from_str(json).unwrap();
    assert_eq!(entry.size_bytes, 1024);
}

#[wasm_bindgen_test]
fn test_skill_file_roundtrip() {
    let skill = claude_admin_shared::SkillFile {
        name: "test-skill".to_string(),
        path: "/skills/test-skill.md".to_string(),
        scope: claude_admin_shared::ConfigScope::Global,
        frontmatter: claude_admin_shared::SkillFrontmatter {
            description: Some("A test skill".to_string()),
            user_invocable: Some(true),
        },
        content: "# Test\nSome content".to_string(),
    };
    let json = serde_json::to_string(&skill).unwrap();
    let deserialized: claude_admin_shared::SkillFile = serde_json::from_str(&json).unwrap();
    assert_eq!(deserialized.name, "test-skill");
    assert_eq!(deserialized.frontmatter.user_invocable, Some(true));
}

#[wasm_bindgen_test]
fn test_budget_config_defaults() {
    let json = r#"{}"#;
    let config: claude_admin_shared::BudgetConfig = serde_json::from_str(json).unwrap();
    assert!(config.daily_budget_usd.is_none());
    assert!(config.weekly_budget_usd.is_none());
    assert!(config.monthly_budget_usd.is_none());
}

#[wasm_bindgen_test]
fn test_webhook_config_serialize() {
    let webhook = claude_admin_shared::WebhookConfig {
        id: "wh_123".to_string(),
        url: "https://example.com/hook".to_string(),
        events: vec!["skill.create".to_string(), "rule.update".to_string()],
        secret: Some("mysecret".to_string()),
        active: true,
    };
    let json = serde_json::to_string(&webhook).unwrap();
    assert!(json.contains("wh_123"));
    assert!(json.contains("skill.create"));
}

#[wasm_bindgen_test]
fn test_diff_result_deserialize() {
    let json = r#"{"lines":[{"kind":"context","content":"hello","line_number":1},{"kind":"add","content":"world","line_number":2}]}"#;
    let diff: claude_admin_shared::DiffResult = serde_json::from_str(json).unwrap();
    assert_eq!(diff.lines.len(), 2);
    assert_eq!(diff.lines[0].kind, "context");
    assert_eq!(diff.lines[1].kind, "add");
}

#[wasm_bindgen_test]
fn test_audit_entry_serialize() {
    let entry = claude_admin_shared::AuditEntry {
        timestamp: "2024-01-01T00:00:00Z".to_string(),
        action: "create".to_string(),
        resource_type: "skill".to_string(),
        resource_name: "my-skill".to_string(),
        details: Some("Created new skill".to_string()),
    };
    let json = serde_json::to_string(&entry).unwrap();
    assert!(json.contains("create"));
    assert!(json.contains("my-skill"));
}

#[wasm_bindgen_test]
fn test_sync_manifest_deserialize() {
    let json = r#"{
        "instance_id": "host_12345",
        "files": [{"path":"skills/test.md","hash":"abc123","size":100,"modified":"2024-01-01"}],
        "generated_at": "2024-01-01T00:00:00Z"
    }"#;
    let manifest: claude_admin_shared::SyncManifest = serde_json::from_str(json).unwrap();
    assert_eq!(manifest.files.len(), 1);
    assert_eq!(manifest.files[0].hash, "abc123");
}

#[wasm_bindgen_test]
fn test_user_role_enum() {
    let json = r#""admin""#;
    let role: claude_admin_shared::UserRole = serde_json::from_str(json).unwrap();
    assert_eq!(role, claude_admin_shared::UserRole::Admin);

    let json = r#""editor""#;
    let role: claude_admin_shared::UserRole = serde_json::from_str(json).unwrap();
    assert_eq!(role, claude_admin_shared::UserRole::Editor);

    let json = r#""viewer""#;
    let role: claude_admin_shared::UserRole = serde_json::from_str(json).unwrap();
    assert_eq!(role, claude_admin_shared::UserRole::Viewer);
}

#[wasm_bindgen_test]
fn test_export_bundle_roundtrip() {
    let bundle = claude_admin_shared::ExportBundle {
        version: "1.0".to_string(),
        exported_at: "2024-01-01".to_string(),
        skills: vec![],
        rules: vec![],
        settings: serde_json::json!({}),
        mcp_servers: vec![],
    };
    let json = serde_json::to_string(&bundle).unwrap();
    let deserialized: claude_admin_shared::ExportBundle = serde_json::from_str(&json).unwrap();
    assert_eq!(deserialized.version, "1.0");
}

#[wasm_bindgen_test]
fn test_login_request_serialize() {
    let req = claude_admin_shared::LoginRequest {
        token: "master-token-123".to_string(),
    };
    let json = serde_json::to_string(&req).unwrap();
    assert!(json.contains("master-token-123"));
}

#[wasm_bindgen_test]
fn test_prune_result_deserialize() {
    let json = r#"{"deleted_count":5,"remaining_count":95}"#;
    let result: claude_admin_shared::PruneResult = serde_json::from_str(json).unwrap();
    assert_eq!(result.deleted_count, 5);
    assert_eq!(result.remaining_count, 95);
}

#[wasm_bindgen_test]
fn test_markdown_preview_roundtrip() {
    let req = claude_admin_shared::MarkdownPreviewRequest {
        content: "# Hello\nWorld".to_string(),
    };
    let json = serde_json::to_string(&req).unwrap();
    assert!(json.contains("# Hello"));

    let resp_json = r#"{"html":"<h1>Hello</h1>\n<p>World</p>"}"#;
    let resp: claude_admin_shared::MarkdownPreviewResponse =
        serde_json::from_str(resp_json).unwrap();
    assert!(resp.html.contains("Hello"));
}

#[wasm_bindgen_test]
fn test_highlight_request_serialize() {
    let req = claude_admin_shared::HighlightRequest {
        code: "fn main() {}".to_string(),
        language: "rust".to_string(),
    };
    let json = serde_json::to_string(&req).unwrap();
    assert!(json.contains("rust"));
}

#[wasm_bindgen_test]
fn test_session_summary_deserialize() {
    let json = r#"{
        "session_id": "abc123",
        "project_name": "my-project",
        "start_time": "2024-01-01T00:00:00Z",
        "duration_minutes": 30,
        "message_count": 50,
        "summary": "Worked on feature X",
        "outcome": "success"
    }"#;
    let session: claude_admin_shared::SessionSummary = serde_json::from_str(json).unwrap();
    assert_eq!(session.session_id, "abc123");
    assert_eq!(session.duration_minutes, 30);
}

#[wasm_bindgen_test]
fn test_config_scope_variants() {
    let global = serde_json::to_string(&claude_admin_shared::ConfigScope::Global).unwrap();
    assert_eq!(global, r#""global""#);

    let project = serde_json::to_string(&claude_admin_shared::ConfigScope::Project).unwrap();
    assert_eq!(project, r#""project""#);
}

#[wasm_bindgen_test]
fn test_mcp_server_status_variants() {
    let running = serde_json::to_string(&claude_admin_shared::McpServerStatus::Running).unwrap();
    assert_eq!(running, r#""running""#);

    let error = serde_json::to_string(&claude_admin_shared::McpServerStatus::Error).unwrap();
    assert_eq!(error, r#""error""#);
}

#[wasm_bindgen_test]
fn test_permission_entry_deserialize() {
    let json = r#"{"index":0,"tool":"Bash","command":"git status","is_fragmented":false,"security_issue":null}"#;
    let entry: claude_admin_shared::PermissionEntry = serde_json::from_str(json).unwrap();
    assert_eq!(entry.tool, "Bash");
    assert!(!entry.is_fragmented);
}

#[wasm_bindgen_test]
fn test_search_result_deserialize() {
    let json = r#"{"resource_type":"skill","name":"test","path":"/skills/test.md","snippet":"some text","score":0.95}"#;
    let result: claude_admin_shared::SearchResult = serde_json::from_str(json).unwrap();
    assert_eq!(result.score, 0.95);
}

#[wasm_bindgen_test]
fn test_budget_status_with_alerts() {
    let json = r#"{
        "config": {"daily_budget_usd": 10.0, "weekly_budget_usd": null, "monthly_budget_usd": null},
        "current_daily_cost": 8.5,
        "current_weekly_cost": 42.0,
        "current_monthly_cost": 180.0,
        "alerts": ["Daily cost ($8.50) approaching budget ($10.00)"]
    }"#;
    let status: claude_admin_shared::BudgetStatus = serde_json::from_str(json).unwrap();
    assert_eq!(status.alerts.len(), 1);
    assert_eq!(status.config.daily_budget_usd, Some(10.0));
}
