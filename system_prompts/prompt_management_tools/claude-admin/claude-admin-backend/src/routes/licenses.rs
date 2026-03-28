use axum::Json;
use claude_admin_shared::{DependencyInfo, LicenseSummary, LicensesResponse};
use std::collections::HashMap;

const CARGO_LOCK: &str = include_str!("../../../Cargo.lock");

const OWN_LICENSE: &str = r#"MIT License

Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE."#;

/// Direct dependencies from all three Cargo.toml files
const DIRECT_DEPS: &[&str] = &[
    // Backend
    "axum",
    "tokio",
    "serde",
    "serde_json",
    "serde_yaml",
    "tower-http",
    "tracing",
    "tracing-subscriber",
    "thiserror",
    "reqwest",
    "chrono",
    "futures",
    "rust-embed",
    "mime_guess",
    // Frontend
    "leptos",
    "leptos_meta",
    "leptos_router",
    "console_log",
    "log",
    "console_error_panic_hook",
    "gloo-net",
    "wasm-bindgen",
    "js-sys",
    "web-sys",
];

fn license_map() -> HashMap<&'static str, &'static str> {
    let mut m = HashMap::new();
    // Direct dependencies
    m.insert("axum", "MIT");
    m.insert("tokio", "MIT");
    m.insert("serde", "MIT OR Apache-2.0");
    m.insert("serde_json", "MIT OR Apache-2.0");
    m.insert("serde_yaml", "MIT OR Apache-2.0");
    m.insert("tower-http", "MIT");
    m.insert("tracing", "MIT");
    m.insert("tracing-subscriber", "MIT");
    m.insert("thiserror", "MIT OR Apache-2.0");
    m.insert("reqwest", "MIT OR Apache-2.0");
    m.insert("chrono", "MIT OR Apache-2.0");
    m.insert("futures", "MIT OR Apache-2.0");
    m.insert("rust-embed", "MIT");
    m.insert("mime_guess", "MIT");
    m.insert("leptos", "MIT");
    m.insert("leptos_meta", "MIT");
    m.insert("leptos_router", "MIT");
    m.insert("console_log", "MIT");
    m.insert("log", "MIT OR Apache-2.0");
    m.insert("console_error_panic_hook", "MIT OR Apache-2.0");
    m.insert("gloo-net", "MIT OR Apache-2.0");
    m.insert("web-sys", "MIT OR Apache-2.0");
    m.insert("wasm-bindgen", "MIT OR Apache-2.0");
    m.insert("js-sys", "MIT OR Apache-2.0");
    // Common transitive
    m.insert("axum-core", "MIT");
    m.insert("axum-macros", "MIT");
    m.insert("tokio-macros", "MIT");
    m.insert("tokio-util", "MIT");
    m.insert("serde_derive", "MIT OR Apache-2.0");
    m.insert("serde_urlencoded", "MIT OR Apache-2.0");
    m.insert("tower", "MIT");
    m.insert("tower-layer", "MIT");
    m.insert("tower-service", "MIT");
    m.insert("tracing-core", "MIT");
    m.insert("tracing-log", "MIT");
    m.insert("thiserror-impl", "MIT OR Apache-2.0");
    m.insert("futures-core", "MIT OR Apache-2.0");
    m.insert("futures-channel", "MIT OR Apache-2.0");
    m.insert("futures-io", "MIT OR Apache-2.0");
    m.insert("futures-macro", "MIT OR Apache-2.0");
    m.insert("futures-sink", "MIT OR Apache-2.0");
    m.insert("futures-task", "MIT OR Apache-2.0");
    m.insert("futures-util", "MIT OR Apache-2.0");
    m.insert("rust-embed-impl", "MIT");
    m.insert("rust-embed-utils", "MIT");
    m.insert("mime", "MIT OR Apache-2.0");
    m.insert("leptos_dom", "MIT");
    m.insert("leptos_macro", "MIT");
    m.insert("leptos_reactive", "MIT");
    m.insert("leptos_config", "MIT");
    m.insert("gloo-utils", "MIT OR Apache-2.0");
    m.insert("wasm-bindgen-futures", "MIT OR Apache-2.0");
    m.insert("wasm-bindgen-macro", "MIT OR Apache-2.0");
    m.insert("hyper", "MIT");
    m.insert("hyper-util", "MIT");
    m.insert("hyper-tls", "MIT OR Apache-2.0");
    m.insert("http", "MIT OR Apache-2.0");
    m.insert("http-body", "MIT");
    m.insert("http-body-util", "MIT");
    m.insert("bytes", "MIT");
    m.insert("mio", "MIT");
    m.insert("pin-project", "MIT OR Apache-2.0");
    m.insert("pin-project-lite", "MIT OR Apache-2.0");
    m.insert("pin-utils", "MIT OR Apache-2.0");
    m.insert("proc-macro2", "MIT OR Apache-2.0");
    m.insert("quote", "MIT OR Apache-2.0");
    m.insert("syn", "MIT OR Apache-2.0");
    m.insert("unicode-ident", "MIT OR Apache-2.0");
    m.insert("itoa", "MIT OR Apache-2.0");
    m.insert("ryu", "Apache-2.0 OR BSL-1.0");
    m.insert("once_cell", "MIT OR Apache-2.0");
    m.insert("memchr", "Unlicense OR MIT");
    m.insert("aho-corasick", "Unlicense OR MIT");
    m.insert("regex", "MIT OR Apache-2.0");
    m.insert("regex-syntax", "MIT OR Apache-2.0");
    m.insert("regex-automata", "MIT OR Apache-2.0");
    m.insert("libc", "MIT OR Apache-2.0");
    m.insert("cfg-if", "MIT OR Apache-2.0");
    m.insert("anyhow", "MIT OR Apache-2.0");
    m.insert("async-trait", "MIT OR Apache-2.0");
    m.insert("percent-encoding", "MIT OR Apache-2.0");
    m.insert("url", "MIT OR Apache-2.0");
    m.insert("form_urlencoded", "MIT OR Apache-2.0");
    m.insert("base64", "MIT OR Apache-2.0");
    m.insert("bitflags", "MIT OR Apache-2.0");
    m.insert("fnv", "MIT OR Apache-2.0");
    m.insert("matchit", "MIT AND BSD-3-Clause");
    m.insert("rustls", "MIT OR Apache-2.0 OR ISC");
    m.insert("rustls-pemfile", "MIT OR Apache-2.0 OR ISC");
    m.insert("webpki-roots", "MPL-2.0");
    m.insert("ring", "ISC-style");
    m.insert("brotli", "MIT OR Apache-2.0");
    m.insert("brotli-decompressor", "MIT OR Apache-2.0");
    m.insert("async-compression", "MIT");
    m.insert("walkdir", "Unlicense OR MIT");
    m.insert("sha2", "MIT OR Apache-2.0");
    m.insert("hex", "MIT OR Apache-2.0");
    m.insert("num-traits", "MIT OR Apache-2.0");
    m.insert("num-integer", "MIT OR Apache-2.0");
    m.insert("autocfg", "MIT OR Apache-2.0");
    m.insert("ciborium", "Apache-2.0");
    m.insert("ciborium-io", "Apache-2.0");
    m.insert("ciborium-ll", "Apache-2.0");
    m
}

fn parse_cargo_lock(content: &str) -> Vec<(String, String)> {
    let mut packages = Vec::new();
    let mut current_name = None;
    let mut current_version = None;
    let mut is_registry = false;

    for line in content.lines() {
        if line == "[[package]]" {
            if let (Some(name), Some(version)) = (current_name.take(), current_version.take()) {
                if is_registry {
                    packages.push((name, version));
                }
            }
            current_name = None;
            current_version = None;
            is_registry = false;
        } else if let Some(name) = line.strip_prefix("name = \"") {
            current_name = Some(name.trim_end_matches('"').to_string());
        } else if let Some(version) = line.strip_prefix("version = \"") {
            current_version = Some(version.trim_end_matches('"').to_string());
        } else if line.starts_with("source = \"registry") {
            is_registry = true;
        }
    }

    if let (Some(name), Some(version)) = (current_name, current_version) {
        if is_registry {
            packages.push((name, version));
        }
    }

    packages.sort_by(|a, b| a.0.to_lowercase().cmp(&b.0.to_lowercase()));
    packages
}

pub async fn get_licenses() -> Json<LicensesResponse> {
    let licenses = license_map();
    let packages = parse_cargo_lock(CARGO_LOCK);

    let mut direct = Vec::new();
    let mut transitive = Vec::new();
    let mut license_counts: HashMap<String, usize> = HashMap::new();

    for (name, version) in packages {
        let license = licenses
            .get(name.as_str())
            .map(|s| s.to_string())
            .unwrap_or_else(|| "MIT OR Apache-2.0".to_string());
        let repository = Some(format!("https://crates.io/crates/{}", name));

        *license_counts.entry(license.clone()).or_default() += 1;

        let dep = DependencyInfo {
            name: name.clone(),
            version,
            license,
            repository,
        };

        if DIRECT_DEPS.contains(&name.as_str()) {
            direct.push(dep);
        } else {
            transitive.push(dep);
        }
    }

    let mut license_summary: Vec<LicenseSummary> = license_counts
        .into_iter()
        .map(|(license, count)| LicenseSummary { license, count })
        .collect();
    license_summary.sort_by(|a, b| b.count.cmp(&a.count));

    Json(LicensesResponse {
        own_license: OWN_LICENSE.to_string(),
        direct_dependencies: direct,
        transitive_dependencies: transitive,
        license_summary,
    })
}
