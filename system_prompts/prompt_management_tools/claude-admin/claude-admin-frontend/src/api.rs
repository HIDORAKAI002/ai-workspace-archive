use gloo_net::http::Request;
use serde::{de::DeserializeOwned, Serialize};

/// Public accessor for the API base URL (used by LiveReload and other components).
pub fn api_base_url() -> String {
    api_base()
}

/// Returns the API base URL. In dev (trunk on :9023), points to backend on :9022.
/// In production (embedded frontend), uses relative path.
fn api_base() -> String {
    if let Some(window) = web_sys::window() {
        if let Ok(origin) = window.location().origin() {
            if origin.contains(":9023") {
                return "http://localhost:9022/api/v1".to_string();
            }
        }
    }
    "/api/v1".to_string()
}

/// Read current UI language from localStorage for Accept-Language header.
fn current_lang() -> String {
    web_sys::window()
        .and_then(|w| w.local_storage().ok().flatten())
        .and_then(|s| s.get_item("claude_admin_lang").ok().flatten())
        .unwrap_or_else(|| "de".to_string())
}

pub async fn get<T: DeserializeOwned>(path: &str) -> Result<T, String> {
    let url = format!("{}{}", api_base(), path);
    let resp = Request::get(&url)
        .header("Accept-Language", &current_lang())
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    if !resp.ok() {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();
        return Err(format!("HTTP {}: {}", status, text));
    }

    resp.json::<T>()
        .await
        .map_err(|e| format!("Parse error: {}", e))
}

pub async fn put<T: DeserializeOwned, B: Serialize>(path: &str, body: &B) -> Result<T, String> {
    let url = format!("{}{}", api_base(), path);
    let resp = Request::put(&url)
        .header("Accept-Language", &current_lang())
        .json(body)
        .map_err(|e| format!("Serialize error: {}", e))?
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    if !resp.ok() {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();
        return Err(format!("HTTP {}: {}", status, text));
    }

    resp.json::<T>()
        .await
        .map_err(|e| format!("Parse error: {}", e))
}

pub async fn post<T: DeserializeOwned, B: Serialize>(path: &str, body: &B) -> Result<T, String> {
    let url = format!("{}{}", api_base(), path);
    let resp = Request::post(&url)
        .header("Accept-Language", &current_lang())
        .json(body)
        .map_err(|e| format!("Serialize error: {}", e))?
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    if !resp.ok() {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();
        return Err(format!("HTTP {}: {}", status, text));
    }

    resp.json::<T>()
        .await
        .map_err(|e| format!("Parse error: {}", e))
}

pub async fn delete(path: &str) -> Result<serde_json::Value, String> {
    let url = format!("{}{}", api_base(), path);
    let resp = Request::delete(&url)
        .header("Accept-Language", &current_lang())
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    if !resp.ok() {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();
        return Err(format!("HTTP {}: {}", status, text));
    }

    resp.json::<serde_json::Value>()
        .await
        .map_err(|e| format!("Parse error: {}", e))
}

pub async fn delete_with_body<T: DeserializeOwned, B: Serialize>(
    path: &str,
    body: &B,
) -> Result<T, String> {
    let url = format!("{}{}", api_base(), path);
    let resp = Request::delete(&url)
        .header("Accept-Language", &current_lang())
        .json(body)
        .map_err(|e| format!("Serialize error: {}", e))?
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    if !resp.ok() {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();
        return Err(format!("HTTP {}: {}", status, text));
    }

    resp.json::<T>()
        .await
        .map_err(|e| format!("Parse error: {}", e))
}
