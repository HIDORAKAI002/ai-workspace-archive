use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::time::Instant;

/// Sliding-window rate limiter keyed by client IP.
#[derive(Clone)]
pub struct RateLimiter {
    state: Arc<Mutex<HashMap<String, Vec<Instant>>>>,
    max_rpm: u64,
}

impl RateLimiter {
    pub fn new(max_rpm: u64) -> Self {
        Self {
            state: Arc::new(Mutex::new(HashMap::new())),
            max_rpm,
        }
    }

    /// Check if the given key is within the rate limit.
    /// Returns the number of remaining requests if allowed, or None if rate-limited.
    pub fn check(&self, key: &str) -> Option<u64> {
        let mut state = self.state.lock().unwrap();
        let now = Instant::now();
        let window = std::time::Duration::from_secs(60);

        let timestamps = state.entry(key.to_string()).or_default();

        // Remove timestamps outside the window
        timestamps.retain(|t| now.duration_since(*t) < window);

        if (timestamps.len() as u64) >= self.max_rpm {
            None
        } else {
            timestamps.push(now);
            Some(self.max_rpm - timestamps.len() as u64)
        }
    }
}

/// Create a rate-limiting middleware layer.
pub fn create_rate_limiter() -> RateLimiter {
    let max_rpm: u64 = std::env::var("RATE_LIMIT_RPM")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(600);

    RateLimiter::new(max_rpm)
}
