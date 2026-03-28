use std::env;

#[derive(Clone, Debug)]
#[allow(dead_code)]
pub struct Config {
    pub host: String,
    pub port: u16,
    pub allowed_origins: Vec<String>,
    pub anthropic_api_key: Option<String>,
}

impl Config {
    pub fn load() -> Self {
        Self {
            host: env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string()),
            port: env::var("PORT")
                .unwrap_or_else(|_| "9022".to_string())
                .parse()
                .unwrap_or(9022),
            allowed_origins: env::var("ALLOWED_ORIGINS")
                .unwrap_or_else(|_| "http://localhost:9023,http://127.0.0.1:9023".to_string())
                .split(',')
                .map(|s| s.trim().to_string())
                .collect(),
            anthropic_api_key: env::var("ANTHROPIC_API_KEY").ok(),
        }
    }
}
