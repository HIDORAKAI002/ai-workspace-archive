use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PaneLayout {
    #[default]
    Horizontal,
    Vertical,
    Grid,
}

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
#[serde(default)]
pub struct RiskThresholds {
    pub review: f64,
    pub confirm: f64,
    pub block: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct Config {
    pub db_path: PathBuf,
    pub worktree_root: PathBuf,
    pub max_parallel_sessions: usize,
    pub max_parallel_worktrees: usize,
    pub session_timeout_secs: u64,
    pub heartbeat_interval_secs: u64,
    pub default_agent: String,
    pub auto_dispatch_unread_handoffs: bool,
    pub auto_dispatch_limit_per_session: usize,
    pub auto_create_worktrees: bool,
    pub auto_merge_ready_worktrees: bool,
    pub cost_budget_usd: f64,
    pub token_budget: u64,
    pub theme: Theme,
    pub pane_layout: PaneLayout,
    pub risk_thresholds: RiskThresholds,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Theme {
    Dark,
    Light,
}

impl Default for Config {
    fn default() -> Self {
        let home = dirs::home_dir().unwrap_or_else(|| PathBuf::from("."));
        Self {
            db_path: home.join(".claude").join("ecc2.db"),
            worktree_root: PathBuf::from("/tmp/ecc-worktrees"),
            max_parallel_sessions: 8,
            max_parallel_worktrees: 6,
            session_timeout_secs: 3600,
            heartbeat_interval_secs: 30,
            default_agent: "claude".to_string(),
            auto_dispatch_unread_handoffs: false,
            auto_dispatch_limit_per_session: 5,
            auto_create_worktrees: true,
            auto_merge_ready_worktrees: false,
            cost_budget_usd: 10.0,
            token_budget: 500_000,
            theme: Theme::Dark,
            pane_layout: PaneLayout::Horizontal,
            risk_thresholds: Self::RISK_THRESHOLDS,
        }
    }
}

impl Config {
    pub const RISK_THRESHOLDS: RiskThresholds = RiskThresholds {
        review: 0.35,
        confirm: 0.60,
        block: 0.85,
    };

    pub fn config_path() -> PathBuf {
        dirs::home_dir()
            .unwrap_or_else(|| PathBuf::from("."))
            .join(".claude")
            .join("ecc2.toml")
    }

    pub fn load() -> Result<Self> {
        let config_path = Self::config_path();

        if config_path.exists() {
            let content = std::fs::read_to_string(&config_path)?;
            let config: Config = toml::from_str(&content)?;
            Ok(config)
        } else {
            Ok(Config::default())
        }
    }

    pub fn save(&self) -> Result<()> {
        self.save_to_path(&Self::config_path())
    }

    pub fn save_to_path(&self, path: &std::path::Path) -> Result<()> {
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent)?;
        }

        let content = toml::to_string_pretty(self)?;
        std::fs::write(path, content)?;
        Ok(())
    }
}

impl Default for RiskThresholds {
    fn default() -> Self {
        Config::RISK_THRESHOLDS
    }
}

#[cfg(test)]
mod tests {
    use super::{Config, PaneLayout};
    use uuid::Uuid;

    #[test]
    fn default_includes_positive_budget_thresholds() {
        let config = Config::default();

        assert!(config.cost_budget_usd > 0.0);
        assert!(config.token_budget > 0);
    }

    #[test]
    fn missing_budget_fields_fall_back_to_defaults() {
        let legacy_config = r#"
db_path = "/tmp/ecc2.db"
worktree_root = "/tmp/ecc-worktrees"
max_parallel_sessions = 8
max_parallel_worktrees = 6
session_timeout_secs = 3600
heartbeat_interval_secs = 30
default_agent = "claude"
theme = "Dark"
"#;

        let config: Config = toml::from_str(legacy_config).unwrap();
        let defaults = Config::default();

        assert_eq!(config.cost_budget_usd, defaults.cost_budget_usd);
        assert_eq!(config.token_budget, defaults.token_budget);
        assert_eq!(config.pane_layout, defaults.pane_layout);
        assert_eq!(config.risk_thresholds, defaults.risk_thresholds);
        assert_eq!(
            config.auto_dispatch_unread_handoffs,
            defaults.auto_dispatch_unread_handoffs
        );
        assert_eq!(
            config.auto_dispatch_limit_per_session,
            defaults.auto_dispatch_limit_per_session
        );
        assert_eq!(config.auto_create_worktrees, defaults.auto_create_worktrees);
        assert_eq!(
            config.auto_merge_ready_worktrees,
            defaults.auto_merge_ready_worktrees
        );
    }

    #[test]
    fn default_pane_layout_is_horizontal() {
        assert_eq!(Config::default().pane_layout, PaneLayout::Horizontal);
    }

    #[test]
    fn pane_layout_deserializes_from_toml() {
        let config: Config = toml::from_str(r#"pane_layout = "grid""#).unwrap();

        assert_eq!(config.pane_layout, PaneLayout::Grid);
    }

    #[test]
    fn default_risk_thresholds_are_applied() {
        assert_eq!(Config::default().risk_thresholds, Config::RISK_THRESHOLDS);
    }

    #[test]
    fn save_round_trips_automation_settings() {
        let path = std::env::temp_dir().join(format!("ecc2-config-{}.toml", Uuid::new_v4()));
        let mut config = Config::default();
        config.auto_dispatch_unread_handoffs = true;
        config.auto_dispatch_limit_per_session = 9;
        config.auto_create_worktrees = false;
        config.auto_merge_ready_worktrees = true;

        config.save_to_path(&path).unwrap();
        let content = std::fs::read_to_string(&path).unwrap();
        let loaded: Config = toml::from_str(&content).unwrap();

        assert!(loaded.auto_dispatch_unread_handoffs);
        assert_eq!(loaded.auto_dispatch_limit_per_session, 9);
        assert!(!loaded.auto_create_worktrees);
        assert!(loaded.auto_merge_ready_worktrees);

        let _ = std::fs::remove_file(path);
    }
}
