use axum::body::Body;
use axum::http::{header, Request, StatusCode};
use axum::middleware::{self, Next};
use axum::response::{IntoResponse, Response};
use axum::{Json, Router};
use rust_embed::Embed;
use std::path::PathBuf;
use std::sync::{Arc, RwLock};
use tokio::sync::broadcast;
use tower_http::{compression::CompressionLayer, trace::TraceLayer};

use crate::infra::auth::TokenStore;
use crate::infra::rate_limit::{create_rate_limiter, RateLimiter};
use crate::infra::rbac::RbacConfig;
use crate::infra::{config::Config, cors::create_cors_layer};
use crate::routes;
use crate::services::claude_api::AnthropicClient;
use crate::services::watcher::FileChangeEvent;

#[derive(Clone)]
pub struct AppState {
    #[allow(dead_code)]
    pub config: Config,
    pub claude_home: PathBuf,
    pub claude_json_path: PathBuf,
    pub claude_desktop_config_path: Option<PathBuf>,
    pub anthropic_client: Arc<RwLock<Option<AnthropicClient>>>,
    pub token_store: TokenStore,
    pub rate_limiter: RateLimiter,
    pub file_change_tx: Arc<broadcast::Sender<FileChangeEvent>>,
    pub rbac_config: Arc<tokio::sync::RwLock<RbacConfig>>,
}

#[derive(Embed)]
#[folder = "../claude-admin-frontend/dist/"]
struct FrontendAssets;

/// Middleware that blocks requests containing ".." path segments (path traversal).
pub async fn block_path_traversal(request: Request<Body>, next: Next) -> Response {
    let path = request.uri().path();
    if path.contains("..") {
        return (
            StatusCode::BAD_REQUEST,
            Json(serde_json::json!({ "error": "Invalid path: directory traversal not allowed" })),
        )
            .into_response();
    }
    next.run(request).await
}

/// Middleware that enforces Bearer token authentication when CLAUDE_ADMIN_TOKEN is set.
/// Supports both master tokens and session tokens.
/// Also enforces RBAC when ~/.claude/users.json exists.
pub async fn auth_middleware(
    axum::extract::State(state): axum::extract::State<Arc<AppState>>,
    request: Request<Body>,
    next: Next,
) -> Response {
    let token = std::env::var("CLAUDE_ADMIN_TOKEN").unwrap_or_default();
    if token.is_empty() {
        return next.run(request).await;
    }

    // Exempt health check endpoint
    if request.uri().path() == "/api/v1/health" {
        return next.run(request).await;
    }

    // Exempt non-API paths (frontend assets)
    if !request.uri().path().starts_with("/api/") {
        return next.run(request).await;
    }

    // Exempt login endpoint
    if request.uri().path() == "/api/v1/auth/login" {
        return next.run(request).await;
    }

    // Exempt docs endpoints
    if request.uri().path().starts_with("/api/v1/docs") {
        return next.run(request).await;
    }

    let method = request.method().clone();
    let path = request.uri().path().to_string();

    match request.headers().get(header::AUTHORIZATION) {
        Some(auth_value) => {
            if let Ok(auth_str) = auth_value.to_str() {
                let bearer = auth_str.strip_prefix("Bearer ").unwrap_or(auth_str);

                // Check master token — full admin access, skip RBAC
                if bearer == token {
                    return next.run(request).await;
                }

                // Check session token
                if state.token_store.validate(bearer) {
                    // Session token is valid — now enforce RBAC if enabled
                    let rbac = state.rbac_config.read().await;
                    if rbac.enabled {
                        if let Some(user) = rbac.find_by_token(bearer) {
                            if let Some(resp) = check_rbac(&user.role, &method, &path) {
                                return resp;
                            }
                        }
                        // If RBAC is enabled but user not found in users.json,
                        // the session token was created via master token login —
                        // allow full access (backwards compatible)
                    }
                    return next.run(request).await;
                }

                // Check RBAC user tokens directly (users.json tokens without session)
                let rbac = state.rbac_config.read().await;
                if rbac.enabled {
                    if let Some(user) = rbac.find_by_token(bearer) {
                        if let Some(resp) = check_rbac(&user.role, &method, &path) {
                            return resp;
                        }
                        return next.run(request).await;
                    }
                }
            }
            (
                StatusCode::UNAUTHORIZED,
                Json(serde_json::json!({ "error": "Invalid authentication token" })),
            )
                .into_response()
        }
        None => (
            StatusCode::UNAUTHORIZED,
            Json(serde_json::json!({ "error": "Authentication required. Set Authorization: Bearer <token> header." })),
        )
            .into_response(),
    }
}

/// Axum middleware function for rate limiting (uses State instead of Extension).
pub async fn rate_limit_middleware(
    axum::extract::State(state): axum::extract::State<Arc<AppState>>,
    request: Request<Body>,
    next: Next,
) -> Response {
    // Only rate-limit API endpoints
    if !request.uri().path().starts_with("/api/") {
        return next.run(request).await;
    }

    // Extract client IP from headers or connection
    let client_ip = request
        .headers()
        .get("x-forwarded-for")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.split(',').next().unwrap_or("unknown").trim().to_string())
        .unwrap_or_else(|| "unknown".to_string());

    match state.rate_limiter.check(&client_ip) {
        Some(_remaining) => next.run(request).await,
        None => (
            StatusCode::TOO_MANY_REQUESTS,
            [("Retry-After", "60")],
            Json(serde_json::json!({ "error": "Rate limit exceeded. Try again later." })),
        )
            .into_response(),
    }
}

/// Check RBAC permissions. Returns Some(Response) if access is denied, None if allowed.
fn check_rbac(
    role: &claude_admin_shared::UserRole,
    method: &axum::http::Method,
    path: &str,
) -> Option<Response> {
    use crate::domain::errors::ApiError;

    // User management endpoints require Admin
    if path.starts_with("/api/v1/users") && !RbacConfig::can_manage_users(role) {
        return Some(
            ApiError::Forbidden("Admin role required for user management".to_string())
                .into_response(),
        );
    }

    // Write operations (POST/PUT/DELETE) require Admin or Editor
    if method != axum::http::Method::GET && !RbacConfig::can_write(role) {
        return Some(
            ApiError::Forbidden("Write access denied for Viewer role".to_string()).into_response(),
        );
    }

    None
}

/// Middleware that adds security headers to every response.
pub async fn security_headers(request: Request<Body>, next: Next) -> Response {
    let mut response = next.run(request).await;
    let headers = response.headers_mut();
    headers.insert(header::X_CONTENT_TYPE_OPTIONS, "nosniff".parse().unwrap());
    headers.insert(header::X_FRAME_OPTIONS, "DENY".parse().unwrap());
    headers.insert(
        header::CONTENT_SECURITY_POLICY,
        "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'; img-src 'self' data:; connect-src 'self' https://unpkg.com"
            .parse()
            .unwrap(),
    );
    response
}

/// Login route: exchange master token for a session token with TTL.
pub async fn login(
    axum::extract::State(state): axum::extract::State<Arc<AppState>>,
    crate::domain::extractors::AppJson(req): crate::domain::extractors::AppJson<
        claude_admin_shared::LoginRequest,
    >,
) -> Result<Json<claude_admin_shared::LoginResponse>, crate::domain::errors::ApiError> {
    let master_token = std::env::var("CLAUDE_ADMIN_TOKEN").unwrap_or_default();
    if master_token.is_empty() || req.token != master_token {
        return Err(crate::domain::errors::ApiError::Unauthorized(
            "Invalid token".to_string(),
        ));
    }

    let (session_token, expires_at) = state.token_store.create_session();
    Ok(Json(claude_admin_shared::LoginResponse {
        session_token,
        expires_at: expires_at.to_rfc3339(),
    }))
}

pub async fn create_app(config: Config) -> Result<Router, Box<dyn std::error::Error>> {
    let claude_home = dirs_home().join(".claude");
    let claude_json_path = dirs_home().join(".claude.json");

    let desktop_config =
        dirs_home().join("Library/Application Support/Claude/claude_desktop_config.json");
    let claude_desktop_config_path = if desktop_config.exists() {
        Some(desktop_config)
    } else {
        None
    };

    let anthropic_client = AnthropicClient::from_env_or_config(&claude_home);
    let token_store = TokenStore::new(8); // 8 hour TTL
    let rate_limiter = create_rate_limiter();

    // File watcher broadcast channel
    let (file_change_tx, _) = broadcast::channel::<FileChangeEvent>(100);
    let file_change_tx = Arc::new(file_change_tx);

    // Start file watcher
    let _watcher =
        crate::services::watcher::start_watcher(claude_home.clone(), file_change_tx.clone());

    // Spawn background tasks
    crate::infra::auth::spawn_token_purge_task(token_store.clone());
    crate::services::backups::spawn_backup_prune_task(claude_home.clone());

    // Initialize git timeline (best-effort)
    if let Err(e) = crate::services::timeline::ensure_git_repo(&claude_home).await {
        tracing::warn!("Timeline git init skipped: {}", e);
    }

    // RBAC cache — loaded once, reloaded on users.json changes
    let rbac_config = Arc::new(tokio::sync::RwLock::new(RbacConfig::load(&claude_home)));
    {
        let rbac_cache = rbac_config.clone();
        let claude_home_clone = claude_home.clone();
        let mut rx = file_change_tx.subscribe();
        tokio::spawn(async move {
            while let Ok(event) = rx.recv().await {
                if event.path.ends_with("users.json") {
                    *rbac_cache.write().await = RbacConfig::load(&claude_home_clone);
                }
            }
        });
    }

    let state = Arc::new(AppState {
        config: config.clone(),
        claude_home,
        claude_json_path,
        claude_desktop_config_path,
        anthropic_client: Arc::new(RwLock::new(anthropic_client)),
        token_store,
        rate_limiter,
        file_change_tx,
        rbac_config,
    });

    let api_routes = routes::router::create_api_routes();

    let app = Router::new()
        .merge(api_routes)
        .fallback(serve_frontend)
        .layer(middleware::from_fn(block_path_traversal))
        .layer(middleware::from_fn_with_state(
            state.clone(),
            rate_limit_middleware,
        ))
        .layer(middleware::from_fn_with_state(
            state.clone(),
            auth_middleware,
        ))
        .layer(middleware::from_fn(security_headers))
        .layer(TraceLayer::new_for_http())
        .layer(CompressionLayer::new())
        .layer(create_cors_layer(&config.allowed_origins))
        .with_state(state);

    Ok(app)
}

/// Test-friendly version of serve_frontend that always returns JSON 404 for API paths.
/// Used by integration tests as a fallback handler.
#[allow(dead_code)]
pub async fn serve_frontend_test(uri: axum::http::Uri) -> Response {
    let path = uri.path().trim_start_matches('/');
    if path.starts_with("api/") {
        return (
            StatusCode::NOT_FOUND,
            Json(serde_json::json!({ "error": "API endpoint not found" })),
        )
            .into_response();
    }
    (StatusCode::NOT_FOUND, "Not Found").into_response()
}

/// Serve embedded frontend assets, falling back to index.html for SPA routing.
/// Returns JSON 404 for unmatched /api/ paths (BUG-004).
async fn serve_frontend(uri: axum::http::Uri) -> Response {
    let path = uri.path().trim_start_matches('/');

    // API catch-all: return JSON 404 for unmatched /api/ routes
    if path.starts_with("api/") {
        return (
            StatusCode::NOT_FOUND,
            Json(serde_json::json!({ "error": "API endpoint not found" })),
        )
            .into_response();
    }

    // Try to serve the exact file
    if let Some(file) = FrontendAssets::get(path) {
        let mime = mime_guess::from_path(path)
            .first_or_octet_stream()
            .to_string();
        return Response::builder()
            .status(StatusCode::OK)
            .header(header::CONTENT_TYPE, mime)
            .body(Body::from(file.data.to_vec()))
            .unwrap();
    }

    // SPA fallback: serve index.html for all non-API, non-file routes
    if let Some(index) = FrontendAssets::get("index.html") {
        return Response::builder()
            .status(StatusCode::OK)
            .header(header::CONTENT_TYPE, "text/html")
            .body(Body::from(index.data.to_vec()))
            .unwrap();
    }

    (StatusCode::NOT_FOUND, "Not Found").into_response()
}

/// Returns the user's home directory.
/// Panics with a clear message if HOME is not set — a silent /tmp fallback
/// would silently corrupt a different directory tree.
fn dirs_home() -> PathBuf {
    std::env::var("HOME")
        .map(PathBuf::from)
        .unwrap_or_else(|_| {
            eprintln!(
                "ERROR: HOME environment variable is not set. \
                 ClaudeAdmin cannot determine where ~/.claude/ is located. \
                 Please set HOME and try again."
            );
            std::process::exit(1);
        })
}
