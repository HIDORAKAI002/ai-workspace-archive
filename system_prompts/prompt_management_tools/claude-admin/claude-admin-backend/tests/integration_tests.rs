use axum::body::Body;
use axum::http::{header, Method, Request, StatusCode};
use http_body_util::BodyExt;
use std::sync::{Arc, RwLock};
use tempfile::TempDir;
use tower::ServiceExt;

/// Helper: create an app backed by a temp directory.
async fn create_test_app() -> (axum::Router, TempDir) {
    let tmp = TempDir::new().unwrap();
    let claude_home = tmp.path().join(".claude");
    std::fs::create_dir_all(&claude_home).unwrap();

    // Create minimal ~/.claude.json
    let claude_json = tmp.path().join(".claude.json");
    std::fs::write(
        &claude_json,
        r#"{"projects":{"/tmp/test-project":{}},"mcpServers":{}}"#,
    )
    .unwrap();

    let (file_change_tx, _) = tokio::sync::broadcast::channel(100);

    let rbac_config = Arc::new(tokio::sync::RwLock::new(
        claude_admin_backend::infra::rbac::RbacConfig::load(&claude_home),
    ));

    let state = Arc::new(claude_admin_backend::app::AppState {
        config: claude_admin_backend::infra::config::Config {
            host: "127.0.0.1".to_string(),
            port: 9099,
            allowed_origins: vec![],
            anthropic_api_key: None,
        },
        claude_home: claude_home.clone(),
        claude_json_path: claude_json,
        claude_desktop_config_path: None,
        anthropic_client: Arc::new(RwLock::new(None)),
        token_store: claude_admin_backend::infra::auth::TokenStore::new(8),
        rate_limiter: claude_admin_backend::infra::rate_limit::create_rate_limiter(),
        file_change_tx: Arc::new(file_change_tx),
        rbac_config,
    });

    // Use the shared route builder — identical routes as production
    let api = claude_admin_backend::routes::router::create_api_routes()
        .fallback(claude_admin_backend::app::serve_frontend_test)
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::block_path_traversal,
        ))
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::security_headers,
        ))
        .with_state(state);

    (api, tmp)
}

// Note: Auth middleware tests are not included in integration tests because
// they rely on env vars (CLAUDE_ADMIN_TOKEN) which cause race conditions
// in parallel test execution. The auth middleware is tested manually.

async fn body_string(resp: axum::response::Response) -> String {
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    String::from_utf8(bytes.to_vec()).unwrap()
}

// ================================================================
// Health Check
// ================================================================

#[tokio::test]
async fn test_health_check() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/health")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("\"status\":\"ok\""));
}

// ================================================================
// Security Headers
// ================================================================

#[tokio::test]
async fn test_security_headers_present() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/health")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(
        resp.headers().get("x-content-type-options").unwrap(),
        "nosniff"
    );
    assert_eq!(resp.headers().get("x-frame-options").unwrap(), "DENY");
    assert!(resp
        .headers()
        .get("content-security-policy")
        .unwrap()
        .to_str()
        .unwrap()
        .contains("default-src 'self'"));
}

// ================================================================
// Path Traversal Blocking (BUG-v2-001)
// ================================================================

#[tokio::test]
async fn test_path_traversal_blocked_in_url() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills/../../../etc/passwd")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
    let body = body_string(resp).await;
    assert!(body.contains("directory traversal"));
}

#[tokio::test]
async fn test_path_traversal_blocked_double_dots() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/../api/v1/health")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}

// ================================================================
// Authentication Middleware (SEC-v2-001)
// ================================================================

// Auth middleware tests omitted: env var CLAUDE_ADMIN_TOKEN causes race
// conditions in parallel tests. The middleware is verified via UAT.

// ================================================================
// API Catch-All: JSON 404
// ================================================================

#[tokio::test]
async fn test_api_catch_all_returns_json_404() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/nonexistent")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
    let body = body_string(resp).await;
    assert!(body.contains("\"error\""));
}

// ================================================================
// Name Validation
// ================================================================

#[tokio::test]
async fn test_validation_path_traversal() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills/global/..%2F..%2Fetc%2Fpasswd")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn test_validation_null_byte() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/global/test%00evil")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn test_validation_empty_name() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "name": "",
        "scope": "global",
        "content": "test"
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn test_validation_too_long_name() {
    let (app, _tmp) = create_test_app().await;
    let long_name = "a".repeat(200);
    let body = serde_json::json!({
        "name": long_name,
        "scope": "global",
        "content": "test"
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}

// ================================================================
// Content-Type Check
// ================================================================

#[tokio::test]
async fn test_content_type_required_for_json_body() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills")
                .body(Body::from(
                    r#"{"name":"test","scope":"global","frontmatter":{},"content":"x"}"#,
                ))
                .unwrap(),
        )
        .await
        .unwrap();

    assert!(
        resp.status() == StatusCode::UNSUPPORTED_MEDIA_TYPE
            || resp.status() == StatusCode::BAD_REQUEST
    );
}

// ================================================================
// Dashboard
// ================================================================

#[tokio::test]
async fn test_dashboard_returns_stats() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/dashboard")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("global_skills_count"));
    assert!(body.contains("global_rules_count"));
    assert!(body.contains("projects_count"));
}

// ================================================================
// Skills CRUD
// ================================================================

#[tokio::test]
async fn test_skills_list_empty() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert_eq!(body, "[]");
}

#[tokio::test]
async fn test_skills_crud() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "name": "test-skill",
        "scope": "global",
        "frontmatter": {"description": "A test skill"},
        "content": "# Test Skill\nHello"
    });

    // Create
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    // Get
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills/global/test-skill")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    // List
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("test-skill"));

    // Delete
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/skills/global/test-skill")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

// ================================================================
// Rules CRUD
// ================================================================

#[tokio::test]
async fn test_rules_list_empty() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_rules_crud() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "name": "test-rule",
        "scope": "global",
        "content": "Always use tests."
    });

    // Create
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    // Get
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/global/test-rule")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    // Update
    let update = serde_json::json!({"content": "Updated rule."});
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/rules/global/test-rule")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    // Delete
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/rules/global/test-rule")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

// ================================================================
// MCP Create: Wrapper + Flat Format
// ================================================================

#[tokio::test]
async fn test_mcp_create_wrapper_format() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "name": "test-mcp",
        "config": {
            "command": "echo",
            "args": ["hello"]
        }
    });

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_mcp_create_flat_format() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "name": "test-mcp-flat",
        "command": "echo",
        "args": ["hello"],
        "env": {}
    });

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_mcp_crud_full_lifecycle() {
    let (app, _tmp) = create_test_app().await;

    // Create
    let body = serde_json::json!({
        "name": "lifecycle-mcp",
        "command": "echo",
        "args": ["test"],
        "env": {}
    });
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    // List - should contain the new server
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("lifecycle-mcp"));

    // Delete
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/mcp/lifecycle-mcp")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

// ================================================================
// Plans CRUD
// ================================================================

#[tokio::test]
async fn test_plans_list_empty() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/plans")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert_eq!(body, "[]");
}

#[tokio::test]
async fn test_plans_not_found() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/plans/nonexistent")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

// ================================================================
// Memory
// ================================================================

#[tokio::test]
async fn test_memory_get_returns_response() {
    let (app, tmp) = create_test_app().await;

    // Use the dash-encoding used in ~/.claude/projects/
    let encoded_dir_name = "-tmp-test-project";

    // Create the project memory directory
    let memory_dir = tmp
        .path()
        .join(".claude/projects")
        .join(encoded_dir_name)
        .join("memory");
    std::fs::create_dir_all(&memory_dir).unwrap();
    std::fs::write(memory_dir.join("MEMORY.md"), "# Test Memory").unwrap();

    // Encode the path as base64url for the API URL
    let encoded_id =
        claude_admin_backend::services::project_resolver::encode_project_id("/tmp/test-project");

    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/memory/{}", encoded_id))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("MEMORY.md"));
}

// ================================================================
// Settings GET/PUT
// ================================================================

#[tokio::test]
async fn test_settings_get() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/settings/global")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_settings_put() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "settings": {"permissions": {"allow": []}}
    });

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/settings/global")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

// ================================================================
// Sessions
// ================================================================

#[tokio::test]
async fn test_sessions_list_empty() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/sessions?offset=0&limit=5")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("\"sessions\""));
    assert!(body.contains("\"total\""));
}

#[tokio::test]
async fn test_sessions_search_empty() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/sessions/search?q=test&limit=5")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

// ================================================================
// Analytics
// ================================================================

#[tokio::test]
async fn test_analytics_overview() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("total_sessions"));
    assert!(body.contains("estimated_total_cost_usd"));
}

// ================================================================
// Permissions
// ================================================================

#[tokio::test]
async fn test_permissions_list() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/permissions")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_permissions_optimize_nonexistent() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/permissions/nonexistent/optimize")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    // Should return OK with empty optimization or a meaningful error
    assert!(
        resp.status() == StatusCode::OK
            || resp.status() == StatusCode::NOT_FOUND
            || resp.status() == StatusCode::BAD_REQUEST
    );
}

// ================================================================
// Error Response Format
// ================================================================

#[tokio::test]
async fn test_error_response_is_json() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills/global/nonexistent")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
    let body = body_string(resp).await;
    let json: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(json.get("error").is_some());
}

#[tokio::test]
async fn test_error_no_internal_details() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(r#"{"invalid json"#))
                .unwrap(),
        )
        .await
        .unwrap();

    let body = body_string(resp).await;
    assert!(!body.contains("line"));
    assert!(!body.contains("column"));
}

// ================================================================
// Backups
// ================================================================

#[tokio::test]
async fn test_backups_list_empty() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/backups")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert_eq!(body, "[]");
}

#[tokio::test]
async fn test_backup_delete_nonexistent() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/backups/nonexistent-backup")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

// ================================================================
// Export / Import
// ================================================================

#[tokio::test]
async fn test_export_bundle() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/export")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("\"version\""));
    assert!(body.contains("\"exported_at\""));
}

#[tokio::test]
async fn test_import_empty_bundle() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "version": "1.0",
        "exported_at": "2026-01-01T00:00:00Z",
        "skills": [],
        "rules": [],
        "settings": {},
        "mcp_servers": []
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/import")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("skills_imported"));
}

// ================================================================
// Search
// ================================================================

#[tokio::test]
async fn test_search_empty_query() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/search?q=")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert_eq!(body, "[]");
}

#[tokio::test]
async fn test_search_with_term_returns_ok() {
    let (app, _tmp) = create_test_app().await;

    // Search for any term - should return OK with valid JSON array
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/search?q=test")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    // Should be a valid JSON array (empty or not)
    let _: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
}

// ================================================================
// Templates
// ================================================================

#[tokio::test]
async fn test_templates_list() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/templates")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("rust-developer"));
    assert!(body.contains("fullstack-js"));
}

#[tokio::test]
async fn test_template_apply() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/templates/rust-developer/apply")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("rules_created"));
}

// ================================================================
// GitHub Username Parsing (unit tests)
// ================================================================

#[test]
fn test_github_username_unit() {
    let json = r#"{"name":"test","command":"echo","args":["hello"]}"#;
    let req: claude_admin_shared::McpServerCreateRequest = serde_json::from_str(json).unwrap();
    assert_eq!(req.name, "test");
    assert!(req.config.get("command").is_some());
}

#[test]
fn test_mcp_create_request_wrapper_format() {
    let json = r#"{"name":"test","config":{"command":"echo"}}"#;
    let req: claude_admin_shared::McpServerCreateRequest = serde_json::from_str(json).unwrap();
    assert_eq!(req.name, "test");
    assert!(req.config.get("command").is_some());
}

// ================================================================
// Budget Validation (GAP-v4-008)
// ================================================================

#[tokio::test]
async fn test_budget_reject_negative_daily() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "daily_budget_usd": -10.0,
        "weekly_budget_usd": null,
        "monthly_budget_usd": null
    });

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/budgets")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
    let body = body_string(resp).await;
    assert!(body.contains("negative"));
}

#[tokio::test]
async fn test_budget_reject_negative_weekly() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "daily_budget_usd": null,
        "weekly_budget_usd": -5.0,
        "monthly_budget_usd": null
    });

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/budgets")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
    let body = body_string(resp).await;
    assert!(body.contains("negative"));
}

#[tokio::test]
async fn test_budget_accept_zero() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "daily_budget_usd": 0.0,
        "weekly_budget_usd": null,
        "monthly_budget_usd": null
    });

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/budgets")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::OK);
}

// ================================================================
// Webhook CRUD (GAP-v4-006)
// ================================================================

#[tokio::test]
async fn test_webhook_crud() {
    let (app, _tmp) = create_test_app().await;

    // Create webhook
    let body = serde_json::json!({
        "url": "https://example.com/webhook",
        "events": ["skill.created", "rule.updated"]
    });
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/webhooks")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let resp_body = body_string(resp).await;
    let created: serde_json::Value = serde_json::from_str(&resp_body).unwrap();
    let webhook_id = created["id"].as_str().unwrap().to_string();

    // List webhooks — should contain the new one
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/webhooks")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let resp_body = body_string(resp).await;
    assert!(resp_body.contains(&webhook_id));

    // Update webhook
    let update_body = serde_json::json!({
        "url": "https://example.com/webhook-v2",
        "active": false
    });
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri(&format!("/api/v1/webhooks/{}", webhook_id))
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update_body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let resp_body = body_string(resp).await;
    assert!(resp_body.contains("webhook-v2"));

    // Delete webhook
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri(&format!("/api/v1/webhooks/{}", webhook_id))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    // Verify deletion — list should be empty
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/webhooks")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let resp_body = body_string(resp).await;
    assert_eq!(resp_body, "[]");
}

// ================================================================
// Audit Log (GAP-v4-006)
// ================================================================

#[tokio::test]
async fn test_audit_log_after_writes() {
    let (app, _tmp) = create_test_app().await;

    // Create a skill to generate an audit entry
    let body = serde_json::json!({
        "name": "audit-test-skill",
        "scope": "global",
        "frontmatter": {"description": "audit test"},
        "content": "# Audit Test"
    });
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    // Check audit log
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/audit?limit=10")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body_str = body_string(resp).await;
    assert!(body_str.contains("\"entries\""));
}

// ================================================================
// Export Format Validation (GAP-v4-006)
// ================================================================

#[tokio::test]
async fn test_export_format_invalid() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/export?format=xml")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
    let body = body_string(resp).await;
    assert!(body.contains("Unsupported"));
}

#[tokio::test]
async fn test_export_format_csv() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/export?format=csv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(resp.headers().get("content-type").unwrap(), "text/csv");
}

// ================================================================
// SSE Events Endpoint (GAP-v4-007)
// ================================================================

#[tokio::test]
async fn test_sse_events_endpoint() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/events")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(resp.status(), StatusCode::OK);
    let content_type = resp
        .headers()
        .get("content-type")
        .unwrap()
        .to_str()
        .unwrap();
    assert!(content_type.contains("text/event-stream"));
}

// ================================================================
// Phase 1: file_ops.rs — Backup & Atomic Writes (20 Tests)
// ================================================================

#[tokio::test]
async fn test_file_ops_write_creates_backup_of_existing_file() {
    let (app, tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"bk-rule","scope":"global","content":"original"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let update = serde_json::json!({"content":"updated"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/rules/global/bk-rule")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let backup_dir = tmp.path().join(".claude/backups");
    let entries: Vec<_> = std::fs::read_dir(&backup_dir).unwrap().collect();
    assert!(!entries.is_empty(), "Backup should be created on update");
}

#[tokio::test]
async fn test_file_ops_write_new_file_no_backup() {
    let (app, tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"new-rule","scope":"global","content":"fresh"});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    let backup_dir = tmp.path().join(".claude/backups");
    let count = std::fs::read_dir(&backup_dir)
        .map(|d| d.count())
        .unwrap_or(0);
    assert_eq!(count, 0, "No backup for brand-new file");
}

#[tokio::test]
async fn test_file_ops_backup_preserves_original_content() {
    let (app, tmp) = create_test_app().await;
    let create =
        serde_json::json!({"name":"preserve-rule","scope":"global","content":"ORIGINAL_CONTENT"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let update = serde_json::json!({"content":"NEW_CONTENT"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/rules/global/preserve-rule")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let backup_dir = tmp.path().join(".claude/backups");
    let backup_file = std::fs::read_dir(&backup_dir)
        .unwrap()
        .next()
        .unwrap()
        .unwrap();
    let backup_content = std::fs::read_to_string(backup_file.path()).unwrap();
    assert_eq!(backup_content, "ORIGINAL_CONTENT");
}

#[tokio::test]
async fn test_file_ops_multiple_writes_create_multiple_backups() {
    let (app, tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"multi-rule","scope":"global","content":"v0"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    for i in 1..=3 {
        let update = serde_json::json!({"content": format!("v{}", i)});
        let _ = app
            .clone()
            .oneshot(
                Request::builder()
                    .method(Method::PUT)
                    .uri("/api/v1/rules/global/multi-rule")
                    .header(header::CONTENT_TYPE, "application/json")
                    .body(Body::from(serde_json::to_vec(&update).unwrap()))
                    .unwrap(),
            )
            .await
            .unwrap();
        tokio::time::sleep(std::time::Duration::from_millis(1100)).await;
    }

    let backup_dir = tmp.path().join(".claude/backups");
    let count = std::fs::read_dir(&backup_dir).unwrap().count();
    assert!(count >= 3, "Expected at least 3 backups, got {}", count);
}

#[tokio::test]
async fn test_file_ops_write_creates_parent_directories() {
    let (app, tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"dir-skill","scope":"global","frontmatter":{"description":"test"},"content":"# Test"});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    let skill_dir = tmp.path().join(".claude/skills/dir-skill");
    assert!(skill_dir.exists(), "Skill directory should be created");
    assert!(skill_dir.join("SKILL.md").exists());
}

#[tokio::test]
async fn test_file_ops_atomic_write_no_tmp_residue() {
    let (app, tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"atomic-rule","scope":"global","content":"test"});
    let _ = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let rules_dir = tmp.path().join(".claude/rules");
    let has_tmp = std::fs::read_dir(&rules_dir).unwrap().any(|e| {
        e.unwrap()
            .path()
            .extension()
            .is_some_and(|ext| ext == "tmp")
    });
    assert!(!has_tmp, "No .tmp files should remain after write");
}

#[tokio::test]
async fn test_file_ops_backup_dir_auto_created() {
    let (app, tmp) = create_test_app().await;
    // Remove backups dir if it exists
    let _ = std::fs::remove_dir_all(tmp.path().join(".claude/backups"));

    let create = serde_json::json!({"name":"autodir-rule","scope":"global","content":"first"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let update = serde_json::json!({"content":"second"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/rules/global/autodir-rule")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    assert!(tmp.path().join(".claude/backups").exists());
}

#[tokio::test]
async fn test_file_ops_skill_update_creates_backup() {
    let (app, tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"bk-skill","scope":"global","frontmatter":{"description":"v1"},"content":"# v1"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let update = serde_json::json!({"frontmatter":{"description":"v2"},"content":"# v2"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/skills/global/bk-skill")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let count = std::fs::read_dir(tmp.path().join(".claude/backups"))
        .unwrap()
        .count();
    assert!(count >= 1, "Skill update should create backup");
}

#[tokio::test]
async fn test_file_ops_settings_write_creates_backup() {
    let (app, tmp) = create_test_app().await;
    // Create settings.json first
    std::fs::write(
        tmp.path().join(".claude/settings.json"),
        r#"{"old":"data"}"#,
    )
    .unwrap();

    let body = serde_json::json!({"settings":{"new":"data"}});
    let _ = app
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/settings/global")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let count = std::fs::read_dir(tmp.path().join(".claude/backups"))
        .map(|d| d.count())
        .unwrap_or(0);
    assert!(count >= 1, "Settings write should create backup");
}

#[tokio::test]
async fn test_file_ops_backup_name_contains_timestamp() {
    let (app, tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"ts-rule","scope":"global","content":"first"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let update = serde_json::json!({"content":"second"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/rules/global/ts-rule")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let backup = std::fs::read_dir(tmp.path().join(".claude/backups"))
        .unwrap()
        .next()
        .unwrap()
        .unwrap();
    let name = backup.file_name().to_string_lossy().to_string();
    // Format: YYYYMMDD_HHMMSS_...
    assert!(name.len() > 15, "Backup name should contain timestamp");
    assert!(
        name.chars().nth(8) == Some('_'),
        "Timestamp separator at pos 8"
    );
}

#[tokio::test]
async fn test_file_ops_backup_delete() {
    let (app, tmp) = create_test_app().await;
    // Create a backup file manually
    let backup_dir = tmp.path().join(".claude/backups");
    std::fs::create_dir_all(&backup_dir).unwrap();
    std::fs::write(backup_dir.join("20260101_000000_test.md"), "old content").unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/backups/20260101_000000_test.md")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    assert!(!backup_dir.join("20260101_000000_test.md").exists());
}

#[tokio::test]
async fn test_file_ops_backup_restore() {
    let (app, _tmp) = create_test_app().await;
    // Create a rule, then update it (creates backup), then restore
    let create = serde_json::json!({"name":"restore-rule","scope":"global","content":"original"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let update = serde_json::json!({"content":"changed"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/rules/global/restore-rule")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    // List backups to get the name
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backups")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let backups: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert!(!backups.is_empty());
    let backup_name = backups[0]["name"].as_str().unwrap();

    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(&format!("/api/v1/backups/{}/restore", backup_name))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_file_ops_prune_backups() {
    let (app, tmp) = create_test_app().await;
    let backup_dir = tmp.path().join(".claude/backups");
    std::fs::create_dir_all(&backup_dir).unwrap();
    // Create many old backup files
    for i in 0..5 {
        std::fs::write(
            backup_dir.join(format!("20240101_00000{}_old.md", i)),
            "old",
        )
        .unwrap();
    }

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/backups/prune")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("deleted_count"));
    assert!(body.contains("remaining_count"));
}

#[tokio::test]
async fn test_file_ops_skill_delete_removes_directory() {
    let (app, tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"del-skill","scope":"global","frontmatter":{"description":"test"},"content":"# Test"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert!(tmp.path().join(".claude/skills/del-skill").exists());

    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/skills/global/del-skill")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    assert!(!tmp.path().join(".claude/skills/del-skill").exists());
}

#[tokio::test]
async fn test_file_ops_rule_delete_removes_file() {
    let (app, tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"del-rule","scope":"global","content":"test"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert!(tmp.path().join(".claude/rules/del-rule.md").exists());

    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/rules/global/del-rule")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    assert!(!tmp.path().join(".claude/rules/del-rule.md").exists());
}

#[tokio::test]
async fn test_file_ops_mcp_write_updates_claude_json() {
    let (app, tmp) = create_test_app().await;
    let body = serde_json::json!({"name":"test-srv","command":"echo","args":["hi"],"env":{}});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let json_content = std::fs::read_to_string(tmp.path().join(".claude.json")).unwrap();
    assert!(json_content.contains("test-srv"));
}

#[tokio::test]
async fn test_file_ops_concurrent_writes_safe() {
    let (app, _tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"conc-rule","scope":"global","content":"init"});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let app1 = app.clone();
    let app2 = app.clone();
    let u1 = serde_json::json!({"content":"write-a"});
    let u2 = serde_json::json!({"content":"write-b"});

    let (r1, r2) = tokio::join!(
        app1.oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/rules/global/conc-rule")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&u1).unwrap()))
                .unwrap()
        ),
        app2.oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/rules/global/conc-rule")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&u2).unwrap()))
                .unwrap()
        ),
    );
    // At least one should succeed; the other may fail due to race, but no corruption
    let s1 = r1.unwrap().status();
    let s2 = r2.unwrap().status();
    assert!(
        s1 == StatusCode::OK || s2 == StatusCode::OK,
        "At least one write must succeed"
    );

    // Verify file is readable (not corrupted) and contains one of the two writes
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/global/conc-rule")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(
        body.contains("write-a") || body.contains("write-b"),
        "File must contain one of the writes"
    );
}

#[tokio::test]
async fn test_file_ops_unicode_content_preserved() {
    let (app, _tmp) = create_test_app().await;
    let content = "Ümlaute: äöüß, CJK: 你好世界, Emoji: 🦀🚀";
    let create = serde_json::json!({"name":"unicode-rule","scope":"global","content": content});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/global/unicode-rule")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    assert!(body.contains("äöüß"));
    assert!(body.contains("你好世界"));
    assert!(body.contains("🦀🚀"));
}

#[tokio::test]
async fn test_file_ops_large_content_handled() {
    let (app, _tmp) = create_test_app().await;
    let large = "x".repeat(50_000);
    let create = serde_json::json!({"name":"large-rule","scope":"global","content": large});
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/global/large-rule")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let json: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(json["content"].as_str().unwrap().len(), 50_000);
}

#[tokio::test]
async fn test_file_ops_empty_content_handled() {
    let (app, _tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"empty-rule","scope":"global","content":""});
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/rules")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/global/empty-rule")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

// ================================================================
// Phase 2: permissions.rs — Parsing, Security, Removal (30 Tests)
// ================================================================

/// Helper: create a test app with a project inside the TmpDir that has settings.local.json
async fn create_test_app_with_permissions(permissions_json: &str) -> (axum::Router, TempDir) {
    let tmp = TempDir::new().unwrap();
    let claude_home = tmp.path().join(".claude");
    std::fs::create_dir_all(&claude_home).unwrap();

    // Create project directory within the TmpDir
    let project_path = tmp.path().join("test-project");
    let project_claude_dir = project_path.join(".claude");
    std::fs::create_dir_all(&project_claude_dir).unwrap();
    std::fs::write(
        project_claude_dir.join("settings.local.json"),
        permissions_json,
    )
    .unwrap();

    // Register project in .claude.json
    let claude_json = tmp.path().join(".claude.json");
    std::fs::write(
        &claude_json,
        format!(
            r#"{{"projects":{{"{}":{{}}}}, "mcpServers":{{}}}}"#,
            project_path.display()
        ),
    )
    .unwrap();

    let (file_change_tx, _) = tokio::sync::broadcast::channel(100);
    let rbac_config = Arc::new(tokio::sync::RwLock::new(
        claude_admin_backend::infra::rbac::RbacConfig::load(&claude_home),
    ));

    let state = Arc::new(claude_admin_backend::app::AppState {
        config: claude_admin_backend::infra::config::Config {
            host: "127.0.0.1".to_string(),
            port: 9099,
            allowed_origins: vec![],
            anthropic_api_key: None,
        },
        claude_home: claude_home.clone(),
        claude_json_path: claude_json,
        claude_desktop_config_path: None,
        anthropic_client: Arc::new(RwLock::new(None)),
        token_store: claude_admin_backend::infra::auth::TokenStore::new(8),
        rate_limiter: claude_admin_backend::infra::rate_limit::create_rate_limiter(),
        file_change_tx: Arc::new(file_change_tx),
        rbac_config,
    });

    let api = claude_admin_backend::routes::router::create_api_routes()
        .fallback(claude_admin_backend::app::serve_frontend_test)
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::block_path_traversal,
        ))
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::security_headers,
        ))
        .with_state(state);

    (api, tmp)
}

#[tokio::test]
async fn test_permissions_empty_settings_returns_empty() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/permissions")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let list: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert!(
        list.is_empty(),
        "No projects with permissions should return empty"
    );
}

#[tokio::test]
async fn test_permissions_parse_string_entries() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(npm run dev)","Bash(cargo test)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    let entries = perms["entries"].as_array().unwrap();
    assert_eq!(entries.len(), 2);
    assert_eq!(entries[0]["tool"], "Bash");
    assert_eq!(entries[0]["command"], "npm run dev");
}

#[tokio::test]
async fn test_permissions_parse_object_entries() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":[{"tool":"Bash","command":"npm run dev"}]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    let entries = perms["entries"].as_array().unwrap();
    assert_eq!(entries[0]["tool"], "Bash");
    assert_eq!(entries[0]["command"], "npm run dev");
}

#[tokio::test]
async fn test_permissions_parse_mixed_entries() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(npm test)",{"tool":"Read","command":"*.rs"}]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    let entries = perms["entries"].as_array().unwrap();
    assert_eq!(entries.len(), 2);
    assert_eq!(entries[0]["tool"], "Bash");
    assert_eq!(entries[1]["tool"], "Read");
}

#[tokio::test]
async fn test_permissions_parse_string_with_parens() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Write(src/main.rs)"]}}"#)
            .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(perms["entries"][0]["tool"], "Write");
    assert_eq!(perms["entries"][0]["command"], "src/main.rs");
}

#[tokio::test]
async fn test_permissions_parse_string_without_parens() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["some-unknown-format"]}}"#)
            .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(perms["entries"][0]["tool"], "unknown");
}

#[tokio::test]
async fn test_permissions_detect_fragment_do() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Bash(do)"]}}"#).await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(perms["entries"][0]["is_fragmented"], true);
}

#[tokio::test]
async fn test_permissions_detect_fragment_fi() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Bash(fi)"]}}"#).await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(perms["entries"][0]["is_fragmented"], true);
}

#[tokio::test]
async fn test_permissions_detect_fragment_done() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Bash(done)"]}}"#).await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(perms["entries"][0]["is_fragmented"], true);
}

#[tokio::test]
async fn test_permissions_normal_command_not_fragmented() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Bash(cargo test)"]}}"#).await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(perms["entries"][0]["is_fragmented"], false);
}

#[tokio::test]
async fn test_permissions_detect_plaintext_password() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(mysql --password=secret123)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(perms["entries"][0]["security_issue"]
        .as_str()
        .unwrap()
        .contains("password"));
}

#[tokio::test]
async fn test_permissions_detect_plaintext_token() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(curl -H token=abc123)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(perms["entries"][0]["security_issue"].is_string());
}

#[tokio::test]
async fn test_permissions_detect_env_password() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(PASSWORD=hunter2 ./run.sh)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(perms["entries"][0]["security_issue"].is_string());
}

#[tokio::test]
async fn test_permissions_detect_api_key() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(API_KEY=sk-12345 node app.js)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(perms["entries"][0]["security_issue"]
        .as_str()
        .unwrap()
        .contains("API key"));
}

#[tokio::test]
async fn test_permissions_detect_dangerous_rm_rf_root() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Bash(rm -rf /)"]}}"#).await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(perms["entries"][0]["security_issue"]
        .as_str()
        .unwrap()
        .contains("root"));
}

#[tokio::test]
async fn test_permissions_detect_dangerous_sudo_rm() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(sudo rm /tmp/file)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(perms["entries"][0]["security_issue"]
        .as_str()
        .unwrap()
        .contains("Sudo"));
}

#[tokio::test]
async fn test_permissions_detect_chmod_777() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(chmod 777 /etc/passwd)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(perms["entries"][0]["security_issue"]
        .as_str()
        .unwrap()
        .contains("permissive"));
}

#[tokio::test]
async fn test_permissions_detect_sql_drop() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(psql -c DROP TABLE users)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(perms["entries"][0]["security_issue"]
        .as_str()
        .unwrap()
        .contains("DROP TABLE"));
}

#[tokio::test]
async fn test_permissions_safe_command_no_security_issue() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Bash(cargo test)"]}}"#).await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(perms["entries"][0]["security_issue"].is_null());
    assert!(perms["security_warnings"].as_array().unwrap().is_empty());
}

#[tokio::test]
async fn test_permissions_security_warning_high_severity() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(mysql --password=secret)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    let warnings = perms["security_warnings"].as_array().unwrap();
    assert!(!warnings.is_empty());
    assert_eq!(warnings[0]["severity"], "high");
}

#[tokio::test]
async fn test_permissions_security_warning_medium_severity() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Bash(chmod 777 /tmp)"]}}"#)
            .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    let warnings = perms["security_warnings"].as_array().unwrap();
    assert!(!warnings.is_empty());
    assert_eq!(warnings[0]["severity"], "medium");
}

#[tokio::test]
async fn test_permissions_remove_single_entry() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(npm test)","Bash(npm start)","Bash(npm run build)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let body = serde_json::json!({"indices": [1]});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri(&format!("/api/v1/permissions/{}/entries", encoded))
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(perms["entries"].as_array().unwrap().len(), 2);
}

#[tokio::test]
async fn test_permissions_remove_multiple_entries() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(a)","Bash(b)","Bash(c)","Bash(d)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let body = serde_json::json!({"indices": [0, 2]});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri(&format!("/api/v1/permissions/{}/entries", encoded))
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(perms["entries"].as_array().unwrap().len(), 2);
}

#[tokio::test]
async fn test_permissions_remove_out_of_range_ignored() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Bash(a)","Bash(b)"]}}"#)
            .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let body = serde_json::json!({"indices": [99]});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri(&format!("/api/v1/permissions/{}/entries", encoded))
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let perms: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(
        perms["entries"].as_array().unwrap().len(),
        2,
        "Out-of-range index should be ignored"
    );
}

#[tokio::test]
async fn test_permissions_remove_creates_backup() {
    let (app, tmp) =
        create_test_app_with_permissions(r#"{"permissions":{"allow":["Bash(npm test)"]}}"#).await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let body = serde_json::json!({"indices": [0]});
    let _ = app
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri(&format!("/api/v1/permissions/{}/entries", encoded))
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let backup_dir = tmp.path().join(".claude/backups");
    let count = std::fs::read_dir(&backup_dir)
        .map(|d| d.count())
        .unwrap_or(0);
    assert!(count >= 1, "Permission removal should create backup");
}

#[tokio::test]
async fn test_permissions_remove_from_missing_file_returns_error() {
    let (app, _tmp) = create_test_app().await;
    // Use a non-existent project
    let encoded =
        claude_admin_backend::services::project_resolver::encode_project_id("/nonexistent/project");
    let body = serde_json::json!({"indices": [0]});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri(&format!("/api/v1/permissions/{}/entries", encoded))
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn test_permissions_optimize_consolidation() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(npm test)","Bash(npm start)","Bash(npm run build)","Bash(npm run lint)"]}}"#
    ).await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}/optimize", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let opts: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert!(
        !opts.is_empty(),
        "4 npm entries should trigger consolidation"
    );
    assert!(opts[0]["suggested_entry"].as_str().unwrap().contains("npm"));
}

#[tokio::test]
async fn test_permissions_optimize_no_consolidation_for_few() {
    let (app, tmp) = create_test_app_with_permissions(
        r#"{"permissions":{"allow":["Bash(npm test)","Bash(cargo build)"]}}"#,
    )
    .await;
    let project_path = tmp.path().join("test-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/permissions/{}/optimize", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let opts: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert!(opts.is_empty(), "Too few entries for consolidation");
}

#[tokio::test]
async fn test_permissions_list_all_projects_sorted_by_count() {
    let tmp = TempDir::new().unwrap();
    let claude_home = tmp.path().join(".claude");
    std::fs::create_dir_all(&claude_home).unwrap();

    // Create two projects with different permission counts
    let proj_a = tmp.path().join("proj-a");
    let proj_b = tmp.path().join("proj-b");
    std::fs::create_dir_all(proj_a.join(".claude")).unwrap();
    std::fs::create_dir_all(proj_b.join(".claude")).unwrap();
    std::fs::write(
        proj_a.join(".claude/settings.local.json"),
        r#"{"permissions":{"allow":["Bash(a)"]}}"#,
    )
    .unwrap();
    std::fs::write(
        proj_b.join(".claude/settings.local.json"),
        r#"{"permissions":{"allow":["Bash(b1)","Bash(b2)","Bash(b3)"]}}"#,
    )
    .unwrap();

    let claude_json = tmp.path().join(".claude.json");
    std::fs::write(
        &claude_json,
        format!(
            r#"{{"projects":{{"{}":{{}},"{}":{{}}}}, "mcpServers":{{}}}}"#,
            proj_a.display(),
            proj_b.display()
        ),
    )
    .unwrap();

    let (file_change_tx, _) = tokio::sync::broadcast::channel(100);
    let rbac_config = Arc::new(tokio::sync::RwLock::new(
        claude_admin_backend::infra::rbac::RbacConfig::load(&claude_home),
    ));
    let state = Arc::new(claude_admin_backend::app::AppState {
        config: claude_admin_backend::infra::config::Config {
            host: "127.0.0.1".to_string(),
            port: 9099,
            allowed_origins: vec![],
            anthropic_api_key: None,
        },
        claude_home: claude_home.clone(),
        claude_json_path: claude_json,
        claude_desktop_config_path: None,
        anthropic_client: Arc::new(RwLock::new(None)),
        token_store: claude_admin_backend::infra::auth::TokenStore::new(8),
        rate_limiter: claude_admin_backend::infra::rate_limit::create_rate_limiter(),
        file_change_tx: Arc::new(file_change_tx),
        rbac_config,
    });
    let api = claude_admin_backend::routes::router::create_api_routes()
        .fallback(claude_admin_backend::app::serve_frontend_test)
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::block_path_traversal,
        ))
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::security_headers,
        ))
        .with_state(state);

    let resp = api
        .oneshot(
            Request::builder()
                .uri("/api/v1/permissions")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let list: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(list.len(), 2);
    // Sorted by total_entries descending
    assert!(
        list[0]["total_entries"].as_u64().unwrap() >= list[1]["total_entries"].as_u64().unwrap()
    );
}

// ================================================================
// Phase 3: skill_builder.rs — Templates & Preview (15 Tests)
// ================================================================

#[tokio::test]
async fn test_skill_templates_returns_all_templates() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills/templates")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let templates: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert!(templates.len() >= 5, "Should have at least 5 templates");
}

#[tokio::test]
async fn test_skill_templates_have_required_fields() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills/templates")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let templates: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    for t in &templates {
        assert!(t["id"].is_string(), "Template missing id");
        assert!(t["name"].is_string(), "Template missing name");
        assert!(t["description"].is_string(), "Template missing description");
        assert!(t["category"].is_string(), "Template missing category");
        assert!(
            t["trigger_example"].is_string(),
            "Template missing trigger_example"
        );
        assert!(
            t["content_template"].is_string(),
            "Template missing content_template"
        );
    }
}

#[tokio::test]
async fn test_skill_templates_unique_ids() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills/templates")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let templates: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    let ids: Vec<&str> = templates
        .iter()
        .map(|t| t["id"].as_str().unwrap())
        .collect();
    let mut unique = ids.clone();
    unique.sort();
    unique.dedup();
    assert_eq!(ids.len(), unique.len(), "Template IDs must be unique");
}

#[tokio::test]
async fn test_skill_templates_categories_valid() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills/templates")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let templates: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    let known = ["Development", "DevOps", "Testing", "Documentation"];
    for t in &templates {
        let cat = t["category"].as_str().unwrap();
        assert!(known.contains(&cat), "Unknown category: {}", cat);
    }
}

#[tokio::test]
async fn test_skill_templates_content_not_empty() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills/templates")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let templates: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    for t in &templates {
        assert!(!t["content_template"].as_str().unwrap().is_empty());
    }
}

#[tokio::test]
async fn test_skill_preview_basic() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "frontmatter": {"description": "Test skill", "user_invocable": true},
        "content": "# Hello World"
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let rendered = preview["rendered"].as_str().unwrap();
    assert!(rendered.contains("---"));
    assert!(rendered.contains("description: Test skill"));
    assert!(rendered.contains("# Hello World"));
}

#[tokio::test]
async fn test_skill_preview_with_trigger() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "frontmatter": {"description": "Use /review to trigger code review"},
        "content": "# Code Review"
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(preview["trigger"], "/review");
}

#[tokio::test]
async fn test_skill_preview_without_trigger() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "frontmatter": {"description": "A skill with no slash command"},
        "content": "# Content"
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(preview["trigger"].is_null());
}

#[tokio::test]
async fn test_skill_preview_missing_description_warning() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "frontmatter": {"description": ""},
        "content": "# Content"
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let warnings = preview["warnings"].as_array().unwrap();
    assert!(warnings
        .iter()
        .any(|w| w.as_str().unwrap().contains("description")));
}

#[tokio::test]
async fn test_skill_preview_empty_content_warning() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "frontmatter": {"description": "Test"},
        "content": ""
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let warnings = preview["warnings"].as_array().unwrap();
    assert!(warnings
        .iter()
        .any(|w| w.as_str().unwrap().contains("Empty content")));
}

#[tokio::test]
async fn test_skill_preview_long_content_warning() {
    let (app, _tmp) = create_test_app().await;
    let long_content = "x".repeat(11_000);
    let body = serde_json::json!({
        "frontmatter": {"description": "Test"},
        "content": long_content
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let warnings = preview["warnings"].as_array().unwrap();
    assert!(warnings
        .iter()
        .any(|w| w.as_str().unwrap().contains("10KB")));
}

#[tokio::test]
async fn test_skill_preview_no_warnings_valid_skill() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "frontmatter": {"description": "A valid skill"},
        "content": "# Good Content\nThis is a valid skill."
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(preview["warnings"].as_array().unwrap().is_empty());
}

#[tokio::test]
async fn test_skill_preview_frontmatter_format() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "frontmatter": {"description": "My Skill"},
        "content": "# Content"
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let rendered = preview["rendered"].as_str().unwrap();
    assert!(rendered.starts_with("---\n"));
    assert!(rendered.contains("---\n\n"));
}

#[tokio::test]
async fn test_skill_preview_user_invocable_true() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "frontmatter": {"description": "Test", "user_invocable": true},
        "content": "# Content"
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(preview["rendered"]
        .as_str()
        .unwrap()
        .contains("user_invocable: true"));
}

#[tokio::test]
async fn test_skill_preview_user_invocable_false() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({
        "frontmatter": {"description": "Test", "user_invocable": false},
        "content": "# Content"
    });
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/skills/preview")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let preview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(preview["rendered"]
        .as_str()
        .unwrap()
        .contains("user_invocable: false"));
}

// ================================================================
// Phase 4: fs_scanner.rs — Filesystem Scanning (28 Tests)
// ================================================================

#[tokio::test]
async fn test_scanner_projects_from_claude_json() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/projects")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let projects: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert!(
        !projects.is_empty(),
        "Should parse projects from .claude.json"
    );
}

#[tokio::test]
async fn test_scanner_project_name_extraction() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/projects")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let projects: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    // Default test project is /tmp/test-project, name should be "test-project"
    assert!(projects
        .iter()
        .any(|p| p["name"].as_str().unwrap() == "test-project"));
}

#[tokio::test]
async fn test_scanner_project_encoded_id_roundtrip() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/projects")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let projects: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    let encoded = projects[0]["encoded_path"].as_str().unwrap();

    // Use the encoded ID to get the project
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/projects/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_scanner_projects_sorted_by_name() {
    let tmp = TempDir::new().unwrap();
    let claude_home = tmp.path().join(".claude");
    std::fs::create_dir_all(&claude_home).unwrap();
    let claude_json = tmp.path().join(".claude.json");
    std::fs::write(
        &claude_json,
        r#"{"projects":{"/tmp/zebra":{},"/tmp/alpha":{},"/tmp/mango":{}},"mcpServers":{}}"#,
    )
    .unwrap();

    let (file_change_tx, _) = tokio::sync::broadcast::channel(100);
    let rbac_config = Arc::new(tokio::sync::RwLock::new(
        claude_admin_backend::infra::rbac::RbacConfig::load(&claude_home),
    ));
    let state = Arc::new(claude_admin_backend::app::AppState {
        config: claude_admin_backend::infra::config::Config {
            host: "127.0.0.1".to_string(),
            port: 9099,
            allowed_origins: vec![],
            anthropic_api_key: None,
        },
        claude_home: claude_home.clone(),
        claude_json_path: claude_json,
        claude_desktop_config_path: None,
        anthropic_client: Arc::new(RwLock::new(None)),
        token_store: claude_admin_backend::infra::auth::TokenStore::new(8),
        rate_limiter: claude_admin_backend::infra::rate_limit::create_rate_limiter(),
        file_change_tx: Arc::new(file_change_tx),
        rbac_config,
    });
    let api = claude_admin_backend::routes::router::create_api_routes()
        .fallback(claude_admin_backend::app::serve_frontend_test)
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::block_path_traversal,
        ))
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::security_headers,
        ))
        .with_state(state);

    let resp = api
        .oneshot(
            Request::builder()
                .uri("/api/v1/projects")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let projects: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    let names: Vec<&str> = projects
        .iter()
        .map(|p| p["name"].as_str().unwrap())
        .collect();
    let mut sorted = names.clone();
    sorted.sort();
    assert_eq!(names, sorted, "Projects should be sorted by name");
}

#[tokio::test]
async fn test_scanner_skills_empty_dir() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    assert_eq!(body, "[]");
}

#[tokio::test]
async fn test_scanner_skills_with_frontmatter() {
    let (app, tmp) = create_test_app().await;
    let skill_dir = tmp.path().join(".claude/skills/test-scan-skill");
    std::fs::create_dir_all(&skill_dir).unwrap();
    std::fs::write(
        skill_dir.join("SKILL.md"),
        "---\ndescription: Scanned Skill\nuser_invocable: true\n---\n\n# Content",
    )
    .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let skills: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(skills.len(), 1);
    assert_eq!(skills[0]["name"], "test-scan-skill");
    assert_eq!(skills[0]["frontmatter"]["description"], "Scanned Skill");
}

#[tokio::test]
async fn test_scanner_skills_without_frontmatter() {
    let (app, tmp) = create_test_app().await;
    let skill_dir = tmp.path().join(".claude/skills/bare-skill");
    std::fs::create_dir_all(&skill_dir).unwrap();
    std::fs::write(skill_dir.join("SKILL.md"), "# Just content, no frontmatter").unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let skills: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(skills.len(), 1);
    assert!(skills[0]["content"]
        .as_str()
        .unwrap()
        .contains("Just content"));
}

#[tokio::test]
async fn test_scanner_skills_dir_without_skill_md_ignored() {
    let (app, tmp) = create_test_app().await;
    let skill_dir = tmp.path().join(".claude/skills/empty-skill");
    std::fs::create_dir_all(&skill_dir).unwrap();
    // Directory exists but no SKILL.md

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    assert_eq!(body, "[]");
}

#[tokio::test]
async fn test_scanner_skills_sorted_by_name() {
    let (app, tmp) = create_test_app().await;
    for name in ["zebra-skill", "alpha-skill", "mango-skill"] {
        let d = tmp.path().join(format!(".claude/skills/{}", name));
        std::fs::create_dir_all(&d).unwrap();
        std::fs::write(d.join("SKILL.md"), "---\ndescription: test\n---\n# X").unwrap();
    }

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/skills")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let skills: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    let names: Vec<&str> = skills.iter().map(|s| s["name"].as_str().unwrap()).collect();
    let mut sorted = names.clone();
    sorted.sort();
    assert_eq!(names, sorted);
}

#[tokio::test]
async fn test_scanner_rules_empty_dir() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_scanner_rules_md_files_read() {
    let (app, tmp) = create_test_app().await;
    let rules_dir = tmp.path().join(".claude/rules");
    std::fs::create_dir_all(&rules_dir).unwrap();
    std::fs::write(rules_dir.join("test-scan-rule.md"), "Always test.").unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let rules: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(rules.len(), 1);
    assert_eq!(rules[0]["name"], "test-scan-rule");
    assert_eq!(rules[0]["content"], "Always test.");
}

#[tokio::test]
async fn test_scanner_rules_non_md_ignored() {
    let (app, tmp) = create_test_app().await;
    let rules_dir = tmp.path().join(".claude/rules");
    std::fs::create_dir_all(&rules_dir).unwrap();
    std::fs::write(rules_dir.join("valid.md"), "rule").unwrap();
    std::fs::write(rules_dir.join("notes.txt"), "not a rule").unwrap();
    std::fs::write(rules_dir.join(".DS_Store"), "").unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let rules: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(rules.len(), 1, "Only .md files should be scanned");
}

#[tokio::test]
async fn test_scanner_rules_sorted() {
    let (app, tmp) = create_test_app().await;
    let rules_dir = tmp.path().join(".claude/rules");
    std::fs::create_dir_all(&rules_dir).unwrap();
    for name in ["z-rule.md", "a-rule.md", "m-rule.md"] {
        std::fs::write(rules_dir.join(name), "content").unwrap();
    }

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let rules: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    let names: Vec<&str> = rules.iter().map(|r| r["name"].as_str().unwrap()).collect();
    let mut sorted = names.clone();
    sorted.sort();
    assert_eq!(names, sorted);
}

#[tokio::test]
async fn test_scanner_memory_files_returned() {
    let (app, tmp) = create_test_app().await;
    let encoded_dir_name = "-tmp-test-project";
    let memory_dir = tmp
        .path()
        .join(".claude/projects")
        .join(encoded_dir_name)
        .join("memory");
    std::fs::create_dir_all(&memory_dir).unwrap();
    std::fs::write(memory_dir.join("MEMORY.md"), "# Memory").unwrap();
    std::fs::write(memory_dir.join("debugging.md"), "# Debug Notes").unwrap();

    let encoded =
        claude_admin_backend::services::project_resolver::encode_project_id("/tmp/test-project");
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/memory/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert!(body.contains("MEMORY.md"));
    assert!(body.contains("debugging.md"));
}

#[tokio::test]
async fn test_scanner_memory_empty_dir() {
    let (app, tmp) = create_test_app().await;
    let encoded_dir_name = "-tmp-test-project";
    let memory_dir = tmp
        .path()
        .join(".claude/projects")
        .join(encoded_dir_name)
        .join("memory");
    std::fs::create_dir_all(&memory_dir).unwrap();

    let encoded =
        claude_admin_backend::services::project_resolver::encode_project_id("/tmp/test-project");
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/memory/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    assert_eq!(body, "[]");
}

#[tokio::test]
async fn test_scanner_memory_non_md_ignored() {
    let (app, tmp) = create_test_app().await;
    let encoded_dir_name = "-tmp-test-project";
    let memory_dir = tmp
        .path()
        .join(".claude/projects")
        .join(encoded_dir_name)
        .join("memory");
    std::fs::create_dir_all(&memory_dir).unwrap();
    std::fs::write(memory_dir.join("MEMORY.md"), "# Memory").unwrap();
    std::fs::write(memory_dir.join("notes.txt"), "not memory").unwrap();

    let encoded =
        claude_admin_backend::services::project_resolver::encode_project_id("/tmp/test-project");
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/memory/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let files: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(files.len(), 1, "Only .md files in memory");
}

#[tokio::test]
async fn test_scanner_plans_count() {
    let (app, tmp) = create_test_app().await;
    let plans_dir = tmp.path().join(".claude/plans");
    std::fs::create_dir_all(&plans_dir).unwrap();
    std::fs::write(plans_dir.join("plan-a.md"), "# Plan A").unwrap();
    std::fs::write(plans_dir.join("plan-b.md"), "# Plan B").unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/plans")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let plans: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(plans.len(), 2);
}

#[tokio::test]
async fn test_scanner_plans_non_md_ignored() {
    let (app, tmp) = create_test_app().await;
    let plans_dir = tmp.path().join(".claude/plans");
    std::fs::create_dir_all(&plans_dir).unwrap();
    std::fs::write(plans_dir.join("plan.md"), "# Plan").unwrap();
    std::fs::write(plans_dir.join("draft.txt"), "not a plan").unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/plans")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let plans: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(plans.len(), 1);
}

#[tokio::test]
async fn test_scanner_settings_missing_file() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/settings/global")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_scanner_settings_hooks_parsed() {
    let (app, tmp) = create_test_app().await;
    std::fs::write(tmp.path().join(".claude/settings.json"), r#"{
        "hooks": {
            "PreToolUse": [{"matcher": "Bash", "hooks": [{"type": "command", "command": "echo pre"}]}]
        }
    }"#).unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/settings/global")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let settings: serde_json::Value = serde_json::from_str(&body).unwrap();
    let pre_hooks = settings["hooks"]["pre_tool_use"].as_array().unwrap();
    assert_eq!(pre_hooks.len(), 1);
}

#[tokio::test]
async fn test_scanner_dashboard_correct_counts() {
    let (app, tmp) = create_test_app().await;
    // Add some skills and rules
    let skills_dir = tmp.path().join(".claude/skills/dash-skill");
    std::fs::create_dir_all(&skills_dir).unwrap();
    std::fs::write(
        skills_dir.join("SKILL.md"),
        "---\ndescription: test\n---\n# X",
    )
    .unwrap();

    let rules_dir = tmp.path().join(".claude/rules");
    std::fs::create_dir_all(&rules_dir).unwrap();
    std::fs::write(rules_dir.join("dash-rule.md"), "Always test.").unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/dashboard")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let dash: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(dash["global_skills_count"], 1);
    assert_eq!(dash["global_rules_count"], 1);
    assert_eq!(dash["projects_count"], 1);
}

#[tokio::test]
async fn test_scanner_dashboard_recent_projects_limit() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/dashboard")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let dash: serde_json::Value = serde_json::from_str(&body).unwrap();
    let recent = dash["recent_projects"].as_array().unwrap();
    assert!(
        recent.len() <= 10,
        "Recent projects should be limited to 10"
    );
}

#[tokio::test]
async fn test_scanner_project_has_claude_md() {
    let (app, tmp) = create_test_app().await;
    // Create a project with CLAUDE.md within TmpDir
    let project_path = tmp.path().join("md-project");
    std::fs::create_dir_all(&project_path).unwrap();
    std::fs::write(project_path.join("CLAUDE.md"), "# Project Config").unwrap();

    // Update .claude.json to reference this project
    std::fs::write(
        tmp.path().join(".claude.json"),
        format!(
            r#"{{"projects":{{"{}":{{}}}}, "mcpServers":{{}}}}"#,
            project_path.display()
        ),
    )
    .unwrap();

    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/projects/{}/status", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let status: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(status["has_claude_md"], true);
}

// ================================================================
// Phase 5: mcp.rs — MCP Config Parsing, CRUD, Catalog (25 Tests)
// ================================================================

#[tokio::test]
async fn test_mcp_list_empty() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let servers: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert!(servers.is_empty());
}

#[tokio::test]
async fn test_mcp_list_parses_claude_json() {
    let (app, tmp) = create_test_app().await;
    std::fs::write(
        tmp.path().join(".claude.json"),
        r#"{"projects":{},"mcpServers":{"test-srv":{"command":"echo","args":["hello"]}}}"#,
    )
    .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let servers: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(servers.len(), 1);
    assert_eq!(servers[0]["name"], "test-srv");
    assert_eq!(servers[0]["command"], "echo");
}

#[tokio::test]
async fn test_mcp_list_sorted() {
    let (app, tmp) = create_test_app().await;
    std::fs::write(
        tmp.path().join(".claude.json"),
        r#"{"projects":{},"mcpServers":{"zebra":{"command":"z"},"alpha":{"command":"a"}}}"#,
    )
    .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let servers: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert_eq!(servers[0]["name"], "alpha");
    assert_eq!(servers[1]["name"], "zebra");
}

#[tokio::test]
async fn test_mcp_aggregation_missing_desktop_no_error() {
    let (app, _tmp) = create_test_app().await;
    // Desktop config path is None in test app — should not error
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_mcp_create_basic() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({"name":"new-srv","command":"echo","args":["test"],"env":{}});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let srv: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(srv["name"], "new-srv");
}

#[tokio::test]
async fn test_mcp_create_duplicate_rejected() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({"name":"dup-srv","command":"echo","args":[],"env":{}});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn test_mcp_create_with_env_vars() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({"name":"env-srv","command":"node","args":["server.js"],"env":{"PORT":"3000","NODE_ENV":"test"}});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let srv: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(srv["env"]["PORT"], "3000");
}

#[tokio::test]
async fn test_mcp_update() {
    let (app, _tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"upd-srv","command":"echo","args":["v1"],"env":{}});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let update = serde_json::json!({"config":{"command":"echo","args":["v2"]}});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/mcp/upd-srv")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_mcp_update_nonexistent() {
    let (app, _tmp) = create_test_app().await;
    let update = serde_json::json!({"config":{"command":"echo"}});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::PUT)
                .uri("/api/v1/mcp/nonexistent")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&update).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn test_mcp_delete() {
    let (app, _tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"del-srv","command":"echo","args":[],"env":{}});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/mcp/del-srv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_mcp_delete_nonexistent() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/mcp/ghost-srv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn test_mcp_get_single() {
    let (app, _tmp) = create_test_app().await;
    let create = serde_json::json!({"name":"get-srv","command":"echo","args":["hi"],"env":{}});
    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&create).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp/get-srv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let srv: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(srv["name"], "get-srv");
}

#[tokio::test]
async fn test_mcp_get_nonexistent() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp/no-such-srv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn test_mcp_config_full() {
    let (app, tmp) = create_test_app().await;
    std::fs::write(tmp.path().join(".claude.json"),
        r#"{"projects":{},"mcpServers":{"full-srv":{"command":"npx","args":["-y","@test/pkg"],"env":{"KEY":"val"}}}}"#
    ).unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp/full-srv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let srv: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(srv["command"], "npx");
    assert_eq!(srv["args"][0], "-y");
    assert_eq!(srv["env"]["KEY"], "val");
}

#[tokio::test]
async fn test_mcp_config_minimal() {
    let (app, tmp) = create_test_app().await;
    std::fs::write(
        tmp.path().join(".claude.json"),
        r#"{"projects":{},"mcpServers":{"min-srv":{"command":"echo"}}}"#,
    )
    .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp/min-srv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let srv: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(srv["command"], "echo");
    assert!(srv["args"].as_array().unwrap().is_empty());
}

#[tokio::test]
async fn test_mcp_config_missing_command() {
    let (app, tmp) = create_test_app().await;
    std::fs::write(
        tmp.path().join(".claude.json"),
        r#"{"projects":{},"mcpServers":{"bad-srv":{"url":"http://localhost"}}}"#,
    )
    .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp/bad-srv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let srv: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(srv["command"], "");
}

#[tokio::test]
async fn test_mcp_catalog_entries() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp-browser")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let catalog: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert!(!catalog.is_empty(), "Catalog should have entries");
}

#[tokio::test]
async fn test_mcp_catalog_installed_false() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp-browser")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let catalog: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    // With empty mcpServers, nothing should be installed
    for entry in &catalog {
        assert_eq!(entry["installed"], false);
    }
}

#[tokio::test]
async fn test_mcp_catalog_installed_true() {
    let (app, tmp) = create_test_app().await;
    // Install one catalog server
    std::fs::write(
        tmp.path().join(".claude.json"),
        r#"{"projects":{},"mcpServers":{"filesystem":{"command":"npx","args":[]}}}"#,
    )
    .unwrap();

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp-browser")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let catalog: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    let fs_entry = catalog.iter().find(|e| e["name"] == "filesystem").unwrap();
    assert_eq!(fs_entry["installed"], true);
}

#[tokio::test]
async fn test_mcp_catalog_categories() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp-browser")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let catalog: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    let categories: Vec<&str> = catalog
        .iter()
        .map(|e| e["category"].as_str().unwrap())
        .collect();
    assert!(categories.contains(&"system"));
    assert!(categories.contains(&"database"));
    assert!(categories.contains(&"api"));
    assert!(categories.contains(&"specialized"));
}

#[tokio::test]
async fn test_mcp_catalog_install() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({"name":"filesystem","config":{"command":"npx","args":["-y","@modelcontextprotocol/server-filesystem"]}});
    let resp = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp-browser/install")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_mcp_create_preserves_other_keys() {
    let (app, tmp) = create_test_app().await;
    // Verify .claude.json retains projects key after MCP create
    let body = serde_json::json!({"name":"safe-srv","command":"echo","args":[],"env":{}});
    let _ = app
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();

    let content = std::fs::read_to_string(tmp.path().join(".claude.json")).unwrap();
    let json: serde_json::Value = serde_json::from_str(&content).unwrap();
    assert!(
        json["projects"].is_object(),
        "projects key should be preserved"
    );
    assert!(json["mcpServers"]["safe-srv"].is_object());
}

#[tokio::test]
async fn test_mcp_delete_preserves_other_servers() {
    let (app, tmp) = create_test_app().await;
    std::fs::write(tmp.path().join(".claude.json"),
        r#"{"projects":{},"mcpServers":{"keep-srv":{"command":"echo"},"del-srv":{"command":"echo"}}}"#
    ).unwrap();

    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri("/api/v1/mcp/del-srv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    let content = std::fs::read_to_string(tmp.path().join(".claude.json")).unwrap();
    let json: serde_json::Value = serde_json::from_str(&content).unwrap();
    assert!(
        json["mcpServers"]["keep-srv"].is_object(),
        "Other servers should be preserved"
    );
    assert!(json["mcpServers"]["del-srv"].is_null());
}

#[tokio::test]
async fn test_mcp_extra_config_fields_preserved() {
    let (app, _tmp) = create_test_app().await;
    let body = serde_json::json!({"name":"extra-srv","config":{"command":"echo","customField":"value","disabled":false}});
    let resp = app
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/api/v1/mcp")
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/mcp/extra-srv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let srv: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(srv["raw_config"]["customField"], "value");
}

// ================================================================
// Phase 6: analytics.rs — Costs, Sessions, Tips, Export (28 Tests)
// ================================================================

/// Helper: create a test app with stats-cache.json and optional session-meta files
async fn create_test_app_with_analytics(
    stats_cache: Option<&str>,
    session_metas: &[&str],
    facets: &[&str],
) -> (axum::Router, TempDir) {
    let tmp = TempDir::new().unwrap();
    let claude_home = tmp.path().join(".claude");
    std::fs::create_dir_all(&claude_home).unwrap();

    if let Some(cache) = stats_cache {
        std::fs::write(claude_home.join("stats-cache.json"), cache).unwrap();
    }

    if !session_metas.is_empty() {
        let meta_dir = claude_home.join("usage-data").join("session-meta");
        std::fs::create_dir_all(&meta_dir).unwrap();
        for (i, meta) in session_metas.iter().enumerate() {
            std::fs::write(meta_dir.join(format!("session-{}.json", i)), meta).unwrap();
        }
    }

    if !facets.is_empty() {
        let facets_dir = claude_home.join("usage-data").join("facets");
        std::fs::create_dir_all(&facets_dir).unwrap();
        for (i, facet) in facets.iter().enumerate() {
            std::fs::write(facets_dir.join(format!("facet-{}.json", i)), facet).unwrap();
        }
    }

    let claude_json = tmp.path().join(".claude.json");
    std::fs::write(&claude_json, r#"{"projects":{},"mcpServers":{}}"#).unwrap();

    let (file_change_tx, _) = tokio::sync::broadcast::channel(100);
    let rbac_config = Arc::new(tokio::sync::RwLock::new(
        claude_admin_backend::infra::rbac::RbacConfig::load(&claude_home),
    ));
    let state = Arc::new(claude_admin_backend::app::AppState {
        config: claude_admin_backend::infra::config::Config {
            host: "127.0.0.1".to_string(),
            port: 9099,
            allowed_origins: vec![],
            anthropic_api_key: None,
        },
        claude_home: claude_home.clone(),
        claude_json_path: claude_json,
        claude_desktop_config_path: None,
        anthropic_client: Arc::new(RwLock::new(None)),
        token_store: claude_admin_backend::infra::auth::TokenStore::new(8),
        rate_limiter: claude_admin_backend::infra::rate_limit::create_rate_limiter(),
        file_change_tx: Arc::new(file_change_tx),
        rbac_config,
    });
    let api = claude_admin_backend::routes::router::create_api_routes()
        .fallback(claude_admin_backend::app::serve_frontend_test)
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::block_path_traversal,
        ))
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::security_headers,
        ))
        .with_state(state);
    (api, tmp)
}

#[tokio::test]
async fn test_analytics_empty_data() {
    let (app, _tmp) = create_test_app_with_analytics(None, &[], &[]).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(overview["total_sessions"], 0);
    assert_eq!(overview["estimated_total_cost_usd"], 0.0);
}

#[tokio::test]
async fn test_analytics_stats_cache_parsing() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":42,"totalMessages":100,"firstSessionDate":"2026-01-01"}"#),
        &[],
        &[],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(overview["total_sessions"], 42);
    assert_eq!(overview["total_messages"], 100);
    assert_eq!(overview["first_session_date"], "2026-01-01");
}

#[tokio::test]
async fn test_analytics_daily_activity() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":2,"dailyActivity":[{"date":"2026-01-01","messageCount":10,"sessionCount":1,"toolCallCount":5}]}"#),
        &[], &[],
    ).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let daily = overview["daily_activity"].as_array().unwrap();
    assert_eq!(daily.len(), 1);
    assert_eq!(daily[0]["date"], "2026-01-01");
    assert_eq!(daily[0]["message_count"], 10);
}

#[tokio::test]
async fn test_analytics_hour_distribution() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":5,"hourCounts":{"9":10,"14":20,"22":5}}"#),
        &[],
        &[],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let hours = overview["hour_distribution"].as_array().unwrap();
    assert_eq!(hours.len(), 3);
}

#[tokio::test]
async fn test_analytics_model_usage() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":1,"modelUsage":{"claude-sonnet":{"inputTokens":1000,"outputTokens":500,"cacheReadTokens":100}}}"#),
        &[], &[],
    ).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let models = overview["model_usage"].as_array().unwrap();
    assert_eq!(models.len(), 1);
    assert_eq!(models[0]["model"], "claude-sonnet");
}

#[tokio::test]
async fn test_analytics_cost_sonnet_pricing() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":1,"modelUsage":{"claude-sonnet":{"inputTokens":1000000,"outputTokens":1000000,"cacheReadTokens":0}}}"#),
        &[], &[],
    ).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    // Sonnet: $3/M input + $15/M output = $18
    let cost = overview["estimated_total_cost_usd"].as_f64().unwrap();
    assert!(
        (cost - 18.0).abs() < 0.01,
        "Sonnet cost should be ~$18, got {}",
        cost
    );
}

#[tokio::test]
async fn test_analytics_cost_opus_pricing() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":1,"modelUsage":{"claude-opus":{"inputTokens":1000000,"outputTokens":1000000,"cacheReadTokens":0}}}"#),
        &[], &[],
    ).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    // Opus: $15/M input + $75/M output = $90
    let cost = overview["estimated_total_cost_usd"].as_f64().unwrap();
    assert!(
        (cost - 90.0).abs() < 0.01,
        "Opus cost should be ~$90, got {}",
        cost
    );
}

#[tokio::test]
async fn test_analytics_cost_haiku_pricing() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":1,"modelUsage":{"claude-haiku":{"inputTokens":1000000,"outputTokens":1000000,"cacheReadTokens":0}}}"#),
        &[], &[],
    ).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    // Haiku: $0.80/M input + $4/M output = $4.80
    let cost = overview["estimated_total_cost_usd"].as_f64().unwrap();
    assert!(
        (cost - 4.8).abs() < 0.01,
        "Haiku cost should be ~$4.80, got {}",
        cost
    );
}

#[tokio::test]
async fn test_analytics_cost_mixed_models() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":2,"modelUsage":{"claude-sonnet":{"inputTokens":500000,"outputTokens":500000,"cacheReadTokens":0},"claude-haiku":{"inputTokens":500000,"outputTokens":500000,"cacheReadTokens":0}}}"#),
        &[], &[],
    ).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let cost = overview["estimated_total_cost_usd"].as_f64().unwrap();
    // Sonnet: 0.5*$3 + 0.5*$15 = $9; Haiku: 0.5*$0.80 + 0.5*$4 = $2.40; Total = $11.40
    assert!(
        (cost - 11.4).abs() < 0.01,
        "Mixed cost should be ~$11.40, got {}",
        cost
    );
}

#[tokio::test]
async fn test_analytics_cost_zero_tokens() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":1,"modelUsage":{"claude-sonnet":{"inputTokens":0,"outputTokens":0,"cacheReadTokens":0}}}"#),
        &[], &[],
    ).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(overview["estimated_total_cost_usd"], 0.0);
}

#[tokio::test]
async fn test_analytics_session_meta_tool_counts() {
    let (app, _tmp) =
        create_test_app_with_analytics(None, &[r#"{"toolCounts":{"Bash":10,"Read":5}}"#], &[])
            .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let tools = overview["tool_ranking"].as_array().unwrap();
    assert!(tools.iter().any(|t| t[0] == "Bash" && t[1] == 10));
}

#[tokio::test]
async fn test_analytics_session_meta_multiple_aggregated() {
    let (app, _tmp) = create_test_app_with_analytics(
        None,
        &[
            r#"{"toolCounts":{"Bash":10}}"#,
            r#"{"toolCounts":{"Bash":5,"Write":3}}"#,
        ],
        &[],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let tools = overview["tool_ranking"].as_array().unwrap();
    let bash = tools.iter().find(|t| t[0] == "Bash").unwrap();
    assert_eq!(bash[1], 15, "Bash should be aggregated to 15");
}

#[tokio::test]
async fn test_analytics_session_meta_languages() {
    let (app, _tmp) =
        create_test_app_with_analytics(None, &[r#"{"languages":{"Rust":5,"TypeScript":3}}"#], &[])
            .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let langs = overview["language_breakdown"].as_array().unwrap();
    assert!(langs.iter().any(|l| l[0] == "Rust"));
}

#[tokio::test]
async fn test_analytics_session_meta_git_stats() {
    let (app, _tmp) = create_test_app_with_analytics(
        None,
        &[r#"{"git_commits":5,"lines_added":100,"lines_removed":30}"#],
        &[],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(overview["total_git_commits"], 5);
    assert_eq!(overview["total_lines_added"], 100);
    assert_eq!(overview["total_lines_removed"], 30);
}

#[tokio::test]
async fn test_analytics_session_meta_camelcase_fields() {
    let (app, _tmp) = create_test_app_with_analytics(
        None,
        &[r#"{"toolCounts":{"Bash":7},"git_commits":2}"#],
        &[],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(overview["total_git_commits"], 2);
}

#[tokio::test]
async fn test_analytics_facets_outcome_distribution() {
    let (app, _tmp) = create_test_app_with_analytics(
        None,
        &[],
        &[
            r#"{"outcome":"success"}"#,
            r#"{"outcome":"success"}"#,
            r#"{"outcome":"error"}"#,
        ],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let outcomes = overview["outcome_distribution"].as_array().unwrap();
    assert!(!outcomes.is_empty());
}

#[tokio::test]
async fn test_analytics_facets_empty_dir() {
    let (app, _tmp) = create_test_app_with_analytics(None, &[], &[]).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(overview["outcome_distribution"]
        .as_array()
        .unwrap()
        .is_empty());
}

#[tokio::test]
async fn test_analytics_tips_task_underused() {
    let (app, _tmp) =
        create_test_app_with_analytics(None, &[r#"{"toolCounts":{"Bash":200,"Task":5}}"#], &[])
            .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/tips")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let tips: serde_json::Value = serde_json::from_str(&body).unwrap();
    let tip_ids: Vec<&str> = tips["tips"]
        .as_array()
        .unwrap()
        .iter()
        .map(|t| t["id"].as_str().unwrap())
        .collect();
    assert!(tip_ids.contains(&"task_underused"));
}

#[tokio::test]
async fn test_analytics_tips_no_hooks() {
    let (app, _tmp) = create_test_app_with_analytics(None, &[r#"{"git_commits":25}"#], &[]).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/tips")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let tips: serde_json::Value = serde_json::from_str(&body).unwrap();
    let tip_ids: Vec<&str> = tips["tips"]
        .as_array()
        .unwrap()
        .iter()
        .map(|t| t["id"].as_str().unwrap())
        .collect();
    assert!(tip_ids.contains(&"no_hooks"));
}

#[tokio::test]
async fn test_analytics_tips_long_sessions() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":20,"totalMessages":2000}"#),
        &[],
        &[],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/tips")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let tips: serde_json::Value = serde_json::from_str(&body).unwrap();
    let tip_ids: Vec<&str> = tips["tips"]
        .as_array()
        .unwrap()
        .iter()
        .map(|t| t["id"].as_str().unwrap())
        .collect();
    assert!(tip_ids.contains(&"long_sessions"));
}

#[tokio::test]
async fn test_analytics_tips_high_cost() {
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":100,"modelUsage":{"claude-opus":{"inputTokens":2000000,"outputTokens":1000000,"cacheReadTokens":0}}}"#),
        &[], &[],
    ).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/tips")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let tips: serde_json::Value = serde_json::from_str(&body).unwrap();
    let tip_ids: Vec<&str> = tips["tips"]
        .as_array()
        .unwrap()
        .iter()
        .map(|t| t["id"].as_str().unwrap())
        .collect();
    assert!(tip_ids.contains(&"high_cost"));
}

#[tokio::test]
async fn test_analytics_tips_healthy_no_tips() {
    let (app, _tmp) =
        create_test_app_with_analytics(Some(r#"{"totalSessions":5,"totalMessages":20}"#), &[], &[])
            .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/tips")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let tips: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(
        tips["tips"].as_array().unwrap().is_empty(),
        "Healthy usage = no tips"
    );
}

#[tokio::test]
async fn test_analytics_tips_max_5() {
    // Trigger as many tips as possible
    let (app, _tmp) = create_test_app_with_analytics(
        Some(r#"{"totalSessions":100,"totalMessages":10000,"modelUsage":{"claude-opus":{"inputTokens":5000000,"outputTokens":5000000,"cacheReadTokens":0}}}"#),
        &[
            r#"{"toolCounts":{"Bash":500,"Task":2,"Edit":200,"Write":1},"git_commits":50,"lines_added":100,"lines_removed":5000}"#,
        ],
        &[],
    ).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/tips")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let tips: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(
        tips["tips"].as_array().unwrap().len() <= 5,
        "Tips capped at 5"
    );
}

#[tokio::test]
async fn test_analytics_export_json_format() {
    let (app, _tmp) =
        create_test_app_with_analytics(Some(r#"{"totalSessions":5}"#), &[], &[]).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/export?format=json")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(
        resp.headers().get("content-type").unwrap(),
        "application/json"
    );
    let body = body_string(resp).await;
    let json: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(json["summary"].is_object());
}

#[tokio::test]
async fn test_analytics_export_csv_sections() {
    let (app, _tmp) =
        create_test_app_with_analytics(Some(r#"{"totalSessions":5}"#), &[], &[]).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/export?format=csv")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(resp.headers().get("content-type").unwrap(), "text/csv");
    let body = body_string(resp).await;
    assert!(body.contains("# Summary"));
    assert!(body.contains("# Daily Activity"));
    assert!(body.contains("# Model Usage"));
    assert!(body.contains("# Tool Usage"));
}

#[tokio::test]
async fn test_analytics_project_analytics() {
    let (app, _tmp) = create_test_app_with_analytics(
        None,
        &[r#"{"projectPath":"/tmp/proj","inputTokens":1000,"outputTokens":500}"#],
        &[],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/analytics/projects")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let projects: Vec<serde_json::Value> = serde_json::from_str(&body).unwrap();
    assert!(!projects.is_empty());
    assert_eq!(projects[0]["path"], "/tmp/proj");
}

// ================================================================
// Phase 7: config_health.rs — Health Score, Duplication, Conflicts (26 Tests)
// ================================================================

/// Helper: create test app with a project that has various health characteristics
async fn create_health_test_app(
    has_claude_md: bool,
    has_memory: bool,
    permission_count: usize,
    has_security_issues: bool,
    has_project_config: bool,
    global_rules: &[(&str, &str)],
    project_rules: &[(&str, &str)],
) -> (axum::Router, TempDir) {
    let tmp = TempDir::new().unwrap();
    let claude_home = tmp.path().join(".claude");
    std::fs::create_dir_all(&claude_home).unwrap();

    let project_path = tmp.path().join("health-project");
    std::fs::create_dir_all(&project_path).unwrap();

    if has_claude_md {
        let mut content = "# Project Config\n\n".to_string();
        // For duplication tests, include some global rule content
        for (_, rule_content) in global_rules {
            if rule_content.len() > 20 {
                content.push_str(rule_content);
                content.push('\n');
            }
        }
        std::fs::write(project_path.join("CLAUDE.md"), content).unwrap();
    }

    let encoded = project_path.to_string_lossy().replace('/', "-");
    let claude_project_dir = claude_home.join("projects").join(&encoded);

    if has_memory {
        let memory_dir = claude_project_dir.join("memory");
        std::fs::create_dir_all(&memory_dir).unwrap();
        std::fs::write(memory_dir.join("MEMORY.md"), "# Memory").unwrap();
    }

    if permission_count > 0 || has_security_issues {
        let proj_claude = project_path.join(".claude");
        std::fs::create_dir_all(&proj_claude).unwrap();
        let mut perms = Vec::new();
        for i in 0..permission_count {
            if has_security_issues && i == 0 {
                perms.push(format!(r#""Bash(mysql --password=secret{})""#, i));
            } else {
                perms.push(format!(r#""Bash(echo {})""#, i));
            }
        }
        std::fs::write(
            proj_claude.join("settings.local.json"),
            format!(r#"{{"permissions":{{"allow":[{}]}}}}"#, perms.join(",")),
        )
        .unwrap();
    }

    if has_project_config {
        let proj_rules = project_path.join(".claude").join("rules");
        std::fs::create_dir_all(&proj_rules).unwrap();
        std::fs::write(proj_rules.join("local.md"), "Local rule").unwrap();
    }

    // Write global rules
    if !global_rules.is_empty() {
        let rules_dir = claude_home.join("rules");
        std::fs::create_dir_all(&rules_dir).unwrap();
        for (name, content) in global_rules {
            std::fs::write(rules_dir.join(format!("{}.md", name)), content).unwrap();
        }
    }

    // Write project-level rules in claude project dir
    if !project_rules.is_empty() {
        let proj_rules_dir = claude_project_dir.join("rules");
        std::fs::create_dir_all(&proj_rules_dir).unwrap();
        for (name, content) in project_rules {
            std::fs::write(proj_rules_dir.join(format!("{}.md", name)), content).unwrap();
        }
    }

    let claude_json = tmp.path().join(".claude.json");
    std::fs::write(
        &claude_json,
        format!(
            r#"{{"projects":{{"{}":{{}}}}, "mcpServers":{{}}}}"#,
            project_path.display()
        ),
    )
    .unwrap();

    let (file_change_tx, _) = tokio::sync::broadcast::channel(100);
    let rbac_config = Arc::new(tokio::sync::RwLock::new(
        claude_admin_backend::infra::rbac::RbacConfig::load(&claude_home),
    ));
    let state = Arc::new(claude_admin_backend::app::AppState {
        config: claude_admin_backend::infra::config::Config {
            host: "127.0.0.1".to_string(),
            port: 9099,
            allowed_origins: vec![],
            anthropic_api_key: None,
        },
        claude_home: claude_home.clone(),
        claude_json_path: claude_json,
        claude_desktop_config_path: None,
        anthropic_client: Arc::new(RwLock::new(None)),
        token_store: claude_admin_backend::infra::auth::TokenStore::new(8),
        rate_limiter: claude_admin_backend::infra::rate_limit::create_rate_limiter(),
        file_change_tx: Arc::new(file_change_tx),
        rbac_config,
    });
    let api = claude_admin_backend::routes::router::create_api_routes()
        .fallback(claude_admin_backend::app::serve_frontend_test)
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::block_path_traversal,
        ))
        .layer(axum::middleware::from_fn(
            claude_admin_backend::app::security_headers,
        ))
        .with_state(state);
    (api, tmp)
}

#[tokio::test]
async fn test_health_score_perfect_100() {
    let (app, tmp) = create_health_test_app(true, true, 5, false, true, &[], &[]).await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(health["score"], 100);
}

#[tokio::test]
async fn test_health_score_without_claude_md() {
    let (app, tmp) = create_health_test_app(false, true, 5, false, true, &[], &[]).await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(health["score"], 80); // 100 - 20
    assert_eq!(health["has_claude_md"], false);
}

#[tokio::test]
async fn test_health_score_without_memory() {
    let (app, tmp) = create_health_test_app(true, false, 5, false, true, &[], &[]).await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(health["score"], 90); // 100 - 10
    assert_eq!(health["has_memory"], false);
}

#[tokio::test]
async fn test_health_score_many_permissions() {
    let (app, tmp) = create_health_test_app(true, true, 60, false, true, &[], &[]).await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(health["score"], 85); // 100 - 15
    assert_eq!(health["permission_count"], 60);
}

#[tokio::test]
async fn test_health_score_security_issues() {
    let (app, tmp) = create_health_test_app(true, true, 5, true, true, &[], &[]).await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(health["score"], 75); // 100 - 25
    assert!(!health["security_issues"].as_array().unwrap().is_empty());
}

#[tokio::test]
async fn test_health_score_no_project_config() {
    let (app, tmp) = create_health_test_app(true, true, 5, false, false, &[], &[]).await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert_eq!(health["score"], 85); // 100 - 15
}

#[tokio::test]
async fn test_health_score_minimum_zero() {
    let (app, tmp) = create_health_test_app(false, false, 60, true, false, &[], &[]).await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    let score = health["score"].as_u64().unwrap();
    assert!(score <= 100);
}

#[tokio::test]
async fn test_health_score_empty_project() {
    let (app, tmp) = create_health_test_app(false, false, 0, false, false, &[], &[]).await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    // no claude_md(-20), no memory(-10), no project_config(-15) = 55
    assert_eq!(health["score"], 55);
}

#[tokio::test]
async fn test_health_overview_all_projects() {
    let (app, _tmp) = create_health_test_app(false, false, 0, false, false, &[], &[]).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/health/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(overview["projects"].as_array().unwrap().len() >= 1);
}

#[tokio::test]
async fn test_health_overview_sorted_by_score_asc() {
    let (app, _tmp) = create_health_test_app(false, false, 0, false, false, &[], &[]).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/health/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let projects = overview["projects"].as_array().unwrap();
    if projects.len() >= 2 {
        let scores: Vec<u64> = projects
            .iter()
            .map(|p| p["score"].as_u64().unwrap())
            .collect();
        for w in scores.windows(2) {
            assert!(w[0] <= w[1], "Projects should be sorted by score ascending");
        }
    }
}

#[tokio::test]
async fn test_health_overview_average_score() {
    let (app, _tmp) = create_health_test_app(false, false, 0, false, false, &[], &[]).await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/health/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let overview: serde_json::Value = serde_json::from_str(&body).unwrap();
    let avg = overview["average_score"].as_u64().unwrap();
    assert!(avg <= 100);
}

#[tokio::test]
async fn test_health_overview_empty_projects() {
    let (app, _tmp) = create_test_app().await;
    // Default test project exists but minimal
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/health/overview")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

#[tokio::test]
async fn test_health_duplicated_rules_detected() {
    let long_rule =
        "Always validate and sanitize all user inputs before processing them in the backend";
    let (app, tmp) = create_health_test_app(
        true,
        true,
        5,
        false,
        true,
        &[("validation", long_rule)],
        &[],
    )
    .await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(
        !health["duplicated_rules"].as_array().unwrap().is_empty(),
        "Long rule content in CLAUDE.md matching global rule should be detected as duplicate"
    );
}

#[tokio::test]
async fn test_health_short_lines_ignored_for_duplication() {
    let (app, tmp) = create_health_test_app(
        true,
        true,
        5,
        false,
        true,
        &[("short", "Be nice.")], // < 20 chars
        &[],
    )
    .await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(
        health["duplicated_rules"].as_array().unwrap().is_empty(),
        "Short lines (<20 chars) should not trigger duplication"
    );
}

#[tokio::test]
async fn test_health_different_content_no_duplicate() {
    let (app, tmp) = create_health_test_app(
        true,
        true,
        5,
        false,
        true,
        &[(
            "global-rule",
            "This is a completely different rule content that should not match anything",
        )],
        &[],
    )
    .await;
    // The CLAUDE.md won't contain this exact line (create_health_test_app only copies if len > 20)
    // But create_health_test_app does include global rules in CLAUDE.md... let me adjust
    // Actually it does copy them. Let me use a different approach - create CLAUDE.md with different content
    std::fs::write(
        tmp.path().join("health-project/CLAUDE.md"),
        "# Totally different content\n\nThis has nothing to do with global rules.",
    )
    .unwrap();

    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(health["duplicated_rules"].as_array().unwrap().is_empty());
}

#[tokio::test]
async fn test_conflicts_name_collision() {
    let (app, _tmp) = create_health_test_app(
        false,
        false,
        0,
        false,
        false,
        &[("same-name", "Global version of the rule")],
        &[("same-name", "Project version of the rule")],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/conflicts")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let result: serde_json::Value = serde_json::from_str(&body).unwrap();
    let conflicts = result["conflicts"].as_array().unwrap();
    assert!(
        conflicts
            .iter()
            .any(|c| c["conflict_type"] == "name_collision"),
        "Same-named rules should trigger NameCollision"
    );
}

#[tokio::test]
async fn test_conflicts_content_overlap() {
    let long_line =
        "Always run comprehensive test suites before deploying to production environments";
    let (app, _tmp) = create_health_test_app(
        false,
        false,
        0,
        false,
        false,
        &[("global-testing", long_line)],
        &[("project-testing", &format!("Important: {}", long_line))],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/conflicts")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let result: serde_json::Value = serde_json::from_str(&body).unwrap();
    let conflicts = result["conflicts"].as_array().unwrap();
    assert!(
        conflicts
            .iter()
            .any(|c| c["conflict_type"] == "content_overlap"),
        "Overlapping content should trigger ContentOverlap"
    );
}

#[tokio::test]
async fn test_conflicts_always_never_contradiction() {
    let (app, _tmp) = create_health_test_app(
        false,
        false,
        0,
        false,
        false,
        &[(
            "global-commit",
            "always commit changes immediately after completing the implementation work",
        )],
        &[(
            "project-commit",
            "never commit changes without running the full integration test suite first",
        )],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/conflicts")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let result: serde_json::Value = serde_json::from_str(&body).unwrap();
    let conflicts = result["conflicts"].as_array().unwrap();
    assert!(
        conflicts
            .iter()
            .any(|c| c["conflict_type"] == "contradiction"),
        "always/never on same topic should trigger Contradiction"
    );
}

#[tokio::test]
async fn test_conflicts_must_must_not_contradiction() {
    let (app, _tmp) = create_health_test_app(
        false,
        false,
        0,
        false,
        false,
        &[(
            "global-format",
            "must format output as structured JSON data with proper indentation always",
        )],
        &[(
            "project-format",
            "must not format output as structured JSON data, use plain text instead",
        )],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/conflicts")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let result: serde_json::Value = serde_json::from_str(&body).unwrap();
    let conflicts = result["conflicts"].as_array().unwrap();
    assert!(
        !conflicts.is_empty(),
        "must/must not contradiction should be detected"
    );
}

#[tokio::test]
async fn test_conflicts_prefer_avoid_contradiction() {
    let (app, _tmp) = create_health_test_app(
        false,
        false,
        0,
        false,
        false,
        &[(
            "global-style",
            "prefer using functional programming patterns and immutable data structures always",
        )],
        &[(
            "project-style",
            "avoid using functional programming patterns, use imperative style with mutable state",
        )],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/conflicts")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let result: serde_json::Value = serde_json::from_str(&body).unwrap();
    let conflicts = result["conflicts"].as_array().unwrap();
    assert!(
        !conflicts.is_empty(),
        "prefer/avoid contradiction should be detected"
    );
}

#[tokio::test]
async fn test_conflicts_different_topics_no_false_positive() {
    let (app, _tmp) = create_health_test_app(
        false,
        false,
        0,
        false,
        false,
        &[(
            "global-testing",
            "always write comprehensive unit tests for every new function",
        )],
        &[(
            "project-deploy",
            "never deploy directly to production without staging first",
        )],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/conflicts")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let result: serde_json::Value = serde_json::from_str(&body).unwrap();
    let conflicts = result["conflicts"].as_array().unwrap();
    // Different topics: testing vs deploy — should not have contradictions
    let contradictions: Vec<_> = conflicts
        .iter()
        .filter(|c| c["conflict_type"] == "contradiction")
        .collect();
    assert!(
        contradictions.is_empty(),
        "Different topics should not trigger false-positive contradictions"
    );
}

#[tokio::test]
async fn test_conflicts_same_direction_no_conflict() {
    let (app, _tmp) = create_health_test_app(
        false,
        false,
        0,
        false,
        false,
        &[(
            "global-test",
            "always write comprehensive tests for every important change",
        )],
        &[(
            "project-test",
            "always ensure proper test coverage when modifying important code",
        )],
    )
    .await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/conflicts")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_string(resp).await;
    let result: serde_json::Value = serde_json::from_str(&body).unwrap();
    let conflicts = result["conflicts"].as_array().unwrap();
    let contradictions: Vec<_> = conflicts
        .iter()
        .filter(|c| c["conflict_type"] == "contradiction")
        .collect();
    assert!(
        contradictions.is_empty(),
        "Rules in same direction should not conflict"
    );
}

#[tokio::test]
async fn test_conflicts_endpoint_rules_conflicts() {
    let (app, _tmp) = create_test_app().await;
    let resp = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/rules/conflicts")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let result: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(result["conflicts"].is_array());
}

#[tokio::test]
async fn test_conflicts_endpoint_health_project() {
    let (app, tmp) = create_health_test_app(true, true, 5, false, true, &[], &[]).await;
    let project_path = tmp.path().join("health-project");
    let encoded = claude_admin_backend::services::project_resolver::encode_project_id(
        &project_path.to_string_lossy(),
    );
    let resp = app
        .oneshot(
            Request::builder()
                .uri(&format!("/api/v1/health/{}", encoded))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_string(resp).await;
    let health: serde_json::Value = serde_json::from_str(&body).unwrap();
    assert!(health["score"].is_number());
    assert!(health["has_claude_md"].is_boolean());
    assert!(health["has_memory"].is_boolean());
    assert!(health["permission_count"].is_number());
    assert!(health["security_issues"].is_array());
    assert!(health["duplicated_rules"].is_array());
}
