use claude_admin_shared::UserRole;
use std::path::Path;

/// RBAC configuration loaded from ~/.claude/users.json.
/// If the file doesn't exist, single-user mode is assumed (all access).
#[derive(Clone)]
pub struct RbacConfig {
    pub enabled: bool,
    pub users: Vec<RbacUser>,
}

#[derive(Clone)]
pub struct RbacUser {
    #[allow(dead_code)] // Used for audit context
    pub username: String,
    pub role: UserRole,
    pub token: String,
}

impl RbacConfig {
    /// Load RBAC config from users.json. Returns disabled config if file doesn't exist.
    pub fn load(claude_home: &Path) -> Self {
        let users_path = claude_home.join("users.json");
        if !users_path.exists() {
            return Self {
                enabled: false,
                users: vec![],
            };
        }

        let content = match std::fs::read_to_string(&users_path) {
            Ok(c) => c,
            Err(_) => {
                return Self {
                    enabled: false,
                    users: vec![],
                }
            }
        };

        let users: Vec<claude_admin_shared::UserEntry> = match serde_json::from_str(&content) {
            Ok(u) => u,
            Err(_) => {
                return Self {
                    enabled: false,
                    users: vec![],
                }
            }
        };

        Self {
            enabled: true,
            users: users
                .into_iter()
                .map(|u| RbacUser {
                    username: u.username,
                    role: u.role,
                    token: u.token,
                })
                .collect(),
        }
    }

    /// Find user by token.
    pub fn find_by_token(&self, token: &str) -> Option<&RbacUser> {
        self.users.iter().find(|u| u.token == token)
    }

    /// Check if the given role can perform write operations (POST/PUT/DELETE).
    pub fn can_write(role: &UserRole) -> bool {
        matches!(role, UserRole::Admin | UserRole::Editor)
    }

    /// Check if the given role can manage users.
    pub fn can_manage_users(role: &UserRole) -> bool {
        matches!(role, UserRole::Admin)
    }
}
