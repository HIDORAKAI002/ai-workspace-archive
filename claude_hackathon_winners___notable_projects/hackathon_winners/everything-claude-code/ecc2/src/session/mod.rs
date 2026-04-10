pub mod daemon;
pub mod manager;
pub mod output;
pub mod runtime;
pub mod store;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::fmt;
use std::path::Path;
use std::path::PathBuf;

pub type SessionAgentProfile = crate::config::ResolvedAgentProfile;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Session {
    pub id: String,
    pub task: String,
    pub project: String,
    pub task_group: String,
    pub agent_type: String,
    pub working_dir: PathBuf,
    pub state: SessionState,
    pub pid: Option<u32>,
    pub worktree: Option<WorktreeInfo>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub last_heartbeat_at: DateTime<Utc>,
    pub metrics: SessionMetrics,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum SessionState {
    Pending,
    Running,
    Idle,
    Stale,
    Completed,
    Failed,
    Stopped,
}

impl fmt::Display for SessionState {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            SessionState::Pending => write!(f, "pending"),
            SessionState::Running => write!(f, "running"),
            SessionState::Idle => write!(f, "idle"),
            SessionState::Stale => write!(f, "stale"),
            SessionState::Completed => write!(f, "completed"),
            SessionState::Failed => write!(f, "failed"),
            SessionState::Stopped => write!(f, "stopped"),
        }
    }
}

impl SessionState {
    pub fn can_transition_to(&self, next: &Self) -> bool {
        if self == next {
            return true;
        }

        matches!(
            (self, next),
            (
                SessionState::Pending,
                SessionState::Running | SessionState::Failed | SessionState::Stopped
            ) | (
                SessionState::Running,
                SessionState::Idle
                    | SessionState::Stale
                    | SessionState::Completed
                    | SessionState::Failed
                    | SessionState::Stopped
            ) | (
                SessionState::Idle,
                SessionState::Running
                    | SessionState::Stale
                    | SessionState::Completed
                    | SessionState::Failed
                    | SessionState::Stopped
            ) | (
                SessionState::Stale,
                SessionState::Running
                    | SessionState::Idle
                    | SessionState::Completed
                    | SessionState::Failed
                    | SessionState::Stopped
            ) | (SessionState::Completed, SessionState::Stopped)
                | (SessionState::Failed, SessionState::Stopped)
        )
    }

    pub fn from_db_value(value: &str) -> Self {
        match value {
            "running" => SessionState::Running,
            "idle" => SessionState::Idle,
            "stale" => SessionState::Stale,
            "completed" => SessionState::Completed,
            "failed" => SessionState::Failed,
            "stopped" => SessionState::Stopped,
            _ => SessionState::Pending,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorktreeInfo {
    pub path: PathBuf,
    pub branch: String,
    pub base_branch: String,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct SessionMetrics {
    pub input_tokens: u64,
    pub output_tokens: u64,
    pub tokens_used: u64,
    pub tool_calls: u64,
    pub files_changed: u32,
    pub duration_secs: u64,
    pub cost_usd: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionMessage {
    pub id: i64,
    pub from_session: String,
    pub to_session: String,
    pub content: String,
    pub msg_type: String,
    pub read: bool,
    pub timestamp: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct FileActivityEntry {
    pub session_id: String,
    pub action: FileActivityAction,
    pub path: String,
    pub summary: String,
    pub diff_preview: Option<String>,
    pub patch_preview: Option<String>,
    pub timestamp: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct DecisionLogEntry {
    pub id: i64,
    pub session_id: String,
    pub decision: String,
    pub alternatives: Vec<String>,
    pub reasoning: String,
    pub timestamp: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum FileActivityAction {
    Read,
    Create,
    Modify,
    Move,
    Delete,
    Touch,
}

pub fn normalize_group_label(value: &str) -> Option<String> {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        None
    } else {
        Some(trimmed.to_string())
    }
}

pub fn default_project_label(working_dir: &Path) -> String {
    working_dir
        .file_name()
        .and_then(|value| value.to_str())
        .and_then(normalize_group_label)
        .unwrap_or_else(|| "workspace".to_string())
}

pub fn default_task_group_label(task: &str) -> String {
    normalize_group_label(task).unwrap_or_else(|| "general".to_string())
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, PartialEq, Eq)]
pub struct SessionGrouping {
    pub project: Option<String>,
    pub task_group: Option<String>,
}
