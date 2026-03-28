use axum::http::{header, Method};
use tower_http::cors::{Any, CorsLayer};

pub fn create_cors_layer(allowed_origins: &[String]) -> CorsLayer {
    let methods = vec![
        Method::GET,
        Method::POST,
        Method::PUT,
        Method::DELETE,
        Method::OPTIONS,
    ];

    let headers = vec![header::CONTENT_TYPE, header::AUTHORIZATION, header::ACCEPT];

    if allowed_origins.is_empty() {
        return CorsLayer::new()
            .allow_origin(Any)
            .allow_methods(methods)
            .allow_headers(headers);
    }

    let origins: Vec<_> = allowed_origins
        .iter()
        .filter_map(|o| o.parse().ok())
        .collect();

    CorsLayer::new()
        .allow_origin(origins)
        .allow_methods(methods)
        .allow_headers(headers)
}
