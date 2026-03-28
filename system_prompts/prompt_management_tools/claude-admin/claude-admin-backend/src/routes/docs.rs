use axum::http::{header, StatusCode};
use axum::response::Response;

/// Serve the OpenAPI spec as JSON.
pub async fn openapi_spec() -> Response {
    let spec = include_str!("../../openapi.json");
    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/json")
        .body(axum::body::Body::from(spec))
        .unwrap()
}

/// Serve Swagger UI page that loads the spec from /api/v1/docs/openapi.json.
pub async fn swagger_ui() -> Response {
    let html = r#"<!DOCTYPE html>
<html>
<head>
  <title>ClaudeAdmin API Documentation</title>
  <meta charset="utf-8"/>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
  <style>body { margin: 0; padding: 0; }</style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/api/v1/docs/openapi.json',
      dom_id: '#swagger-ui',
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
      layout: "BaseLayout"
    });
  </script>
</body>
</html>"#;

    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "text/html")
        .body(axum::body::Body::from(html))
        .unwrap()
}
