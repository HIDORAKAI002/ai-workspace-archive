use axum::Json;

use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use claude_admin_shared::{
    HighlightRequest, HighlightResponse, MarkdownPreviewRequest, MarkdownPreviewResponse,
};

pub async fn render_markdown(
    AppJson(req): AppJson<MarkdownPreviewRequest>,
) -> Result<Json<MarkdownPreviewResponse>, ApiError> {
    use pulldown_cmark::{html, Parser};
    let parser = Parser::new(&req.content);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    Ok(Json(MarkdownPreviewResponse { html: html_output }))
}

pub async fn highlight_code(
    AppJson(req): AppJson<HighlightRequest>,
) -> Result<Json<HighlightResponse>, ApiError> {
    use syntect::highlighting::ThemeSet;
    use syntect::html::highlighted_html_for_string;
    use syntect::parsing::SyntaxSet;

    let ss = SyntaxSet::load_defaults_newlines();
    let ts = ThemeSet::load_defaults();
    let theme = &ts.themes["base16-ocean.dark"];

    let syntax = ss
        .find_syntax_by_token(&req.language)
        .unwrap_or_else(|| ss.find_syntax_plain_text());

    let html = highlighted_html_for_string(&req.code, &ss, syntax, theme)
        .unwrap_or_else(|_| format!("<pre><code>{}</code></pre>", html_escape(&req.code)));

    Ok(Json(HighlightResponse { html }))
}

fn html_escape(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
}
