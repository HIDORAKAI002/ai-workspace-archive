use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};

/// Session token store with TTL-based expiry.
#[derive(Clone)]
pub struct TokenStore {
    tokens: Arc<Mutex<HashMap<String, TokenEntry>>>,
    ttl: Duration,
}

struct TokenEntry {
    created_at: Instant,
}

impl TokenStore {
    pub fn new(ttl_hours: u64) -> Self {
        Self {
            tokens: Arc::new(Mutex::new(HashMap::new())),
            ttl: Duration::from_secs(ttl_hours * 3600),
        }
    }

    /// Create a new session token and store it.
    pub fn create_session(&self) -> (String, chrono::DateTime<chrono::Utc>) {
        let token = generate_token();
        let expires_at = chrono::Utc::now() + chrono::Duration::seconds(self.ttl.as_secs() as i64);

        let mut tokens = self.tokens.lock().unwrap();
        tokens.insert(
            token.clone(),
            TokenEntry {
                created_at: Instant::now(),
            },
        );
        (token, expires_at)
    }

    /// Validate a session token. Returns true if valid and not expired.
    pub fn validate(&self, token: &str) -> bool {
        let tokens = self.tokens.lock().unwrap();
        if let Some(entry) = tokens.get(token) {
            entry.created_at.elapsed() < self.ttl
        } else {
            false
        }
    }

    /// Purge expired tokens.
    pub fn purge_expired(&self) -> usize {
        let mut tokens = self.tokens.lock().unwrap();
        let before = tokens.len();
        tokens.retain(|_, entry| entry.created_at.elapsed() < self.ttl);
        before - tokens.len()
    }
}

fn generate_token() -> String {
    use hmac::{Hmac, Mac};
    use sha2::Sha256;
    use std::sync::atomic::{AtomicU64, Ordering};
    use std::sync::OnceLock;
    use std::time::SystemTime;

    // Process-unique secret (created once per process lifetime)
    static SECRET: OnceLock<[u8; 32]> = OnceLock::new();
    static COUNTER: AtomicU64 = AtomicU64::new(0);

    let secret = SECRET.get_or_init(|| {
        let ts = SystemTime::now()
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap_or_default()
            .as_nanos();
        let pid = std::process::id() as u128;
        // Mix timestamp, PID, and a stack address for uniqueness
        let stack_var = 0u8;
        let stack_addr = &stack_var as *const u8 as u128;
        let combined = ts ^ (pid << 64) ^ stack_addr;
        let mut buf = [0u8; 32];
        buf[..16].copy_from_slice(&combined.to_le_bytes());
        buf[16..].copy_from_slice(&ts.to_be_bytes());
        buf
    });

    let counter = COUNTER.fetch_add(1, Ordering::Relaxed);
    let ts = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap_or_default()
        .as_nanos();

    let message = format!("{}:{}", ts, counter);
    let mut mac = Hmac::<Sha256>::new_from_slice(secret).expect("HMAC accepts any key length");
    mac.update(message.as_bytes());
    let result = mac.finalize().into_bytes();

    // Take first 16 bytes (128 bits) and format as hex
    let hex: String = result[..16].iter().map(|b| format!("{:02x}", b)).collect();
    format!("ses_{}", hex)
}

/// Spawn background task to purge expired tokens every 5 minutes.
pub fn spawn_token_purge_task(store: TokenStore) {
    tokio::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_secs(300));
        loop {
            interval.tick().await;
            let purged = store.purge_expired();
            if purged > 0 {
                tracing::debug!("Purged {} expired session tokens", purged);
            }
        }
    });
}
