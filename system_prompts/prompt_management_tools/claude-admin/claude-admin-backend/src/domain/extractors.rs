use axum::extract::rejection::JsonRejection;
use axum::extract::FromRequest;
use axum::http::header::ACCEPT_LANGUAGE;
use axum::http::{HeaderMap, StatusCode};
use axum::response::{IntoResponse, Response};
use serde::de::DeserializeOwned;
use serde_json::json;

/// Extract the UI language code from the Accept-Language header. Defaults to "de".
pub fn extract_lang(headers: &HeaderMap) -> String {
    headers
        .get(ACCEPT_LANGUAGE)
        .and_then(|v| v.to_str().ok())
        .map(|s| s.split(',').next().unwrap_or("de").trim().to_string())
        .unwrap_or_else(|| "de".to_string())
}

/// Return the full language name for use in AI prompts.
pub fn lang_instruction(lang: &str) -> &'static str {
    match lang {
        "en" => "Always respond in English.",
        "de" => "Antworte immer auf Deutsch.",
        "es" => "Responde siempre en español.",
        "fr" => "Réponds toujours en français.",
        "it" => "Rispondi sempre in italiano.",
        "pt" => "Responda sempre em português.",
        "ja" => "必ず日本語で回答してください。",
        "ko" => "항상 한국어로 답변해 주세요.",
        "zh" => "请始终用中文回答。",
        "nl" => "Antwoord altijd in het Nederlands.",
        "pl" => "Zawsze odpowiadaj po polsku.",
        "tr" => "Her zaman Türkçe cevap ver.",
        _ => "Antworte immer auf Deutsch.",
    }
}

/// Custom JSON extractor that returns generic error messages without exposing internals.
pub struct AppJson<T>(pub T);

#[axum::async_trait]
impl<S, T> FromRequest<S> for AppJson<T>
where
    T: DeserializeOwned,
    S: Send + Sync,
{
    type Rejection = AppJsonRejection;

    async fn from_request(req: axum::extract::Request, state: &S) -> Result<Self, Self::Rejection> {
        match axum::Json::<T>::from_request(req, state).await {
            Ok(axum::Json(value)) => Ok(AppJson(value)),
            Err(rejection) => Err(AppJsonRejection::from(rejection)),
        }
    }
}

pub struct AppJsonRejection {
    status: StatusCode,
    message: String,
}

impl From<JsonRejection> for AppJsonRejection {
    fn from(rejection: JsonRejection) -> Self {
        let (status, message) = match rejection {
            JsonRejection::MissingJsonContentType(_) => (
                StatusCode::UNSUPPORTED_MEDIA_TYPE,
                "Content-Type must be application/json".to_string(),
            ),
            JsonRejection::JsonSyntaxError(_) => (
                StatusCode::BAD_REQUEST,
                "Invalid JSON syntax in request body".to_string(),
            ),
            JsonRejection::JsonDataError(_) => (
                StatusCode::BAD_REQUEST,
                "Invalid or missing fields in request body".to_string(),
            ),
            JsonRejection::BytesRejection(_) => (
                StatusCode::BAD_REQUEST,
                "Failed to read request body".to_string(),
            ),
            _ => (StatusCode::BAD_REQUEST, "Invalid request body".to_string()),
        };

        AppJsonRejection { status, message }
    }
}

impl IntoResponse for AppJsonRejection {
    fn into_response(self) -> Response {
        let body = json!({ "error": self.message });
        (self.status, axum::Json(body)).into_response()
    }
}
