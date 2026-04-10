use anyhow::{Context, Result};
use rusqlite::{Connection, OptionalExtension};
use serde::Serialize;
use std::cmp::Reverse;
use std::collections::{HashMap, HashSet};
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::{Path, PathBuf};
use std::time::Duration;

use crate::config::Config;
use crate::observability::{ToolCallEvent, ToolLogEntry, ToolLogPage};

use super::output::{OutputLine, OutputStream, OUTPUT_BUFFER_LIMIT};
use super::{
    default_project_label, default_task_group_label, normalize_group_label, DecisionLogEntry,
    FileActivityAction, FileActivityEntry, Session, SessionAgentProfile, SessionMessage,
    SessionMetrics, SessionState, WorktreeInfo,
};

pub struct StateStore {
    conn: Connection,
}

#[derive(Debug, Clone)]
pub struct PendingWorktreeRequest {
    pub session_id: String,
    pub repo_root: PathBuf,
    pub _requested_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct FileActivityOverlap {
    pub path: String,
    pub current_action: FileActivityAction,
    pub other_action: FileActivityAction,
    pub other_session_id: String,
    pub other_session_state: SessionState,
    pub timestamp: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct ConflictIncident {
    pub id: i64,
    pub conflict_key: String,
    pub path: String,
    pub first_session_id: String,
    pub second_session_id: String,
    pub active_session_id: String,
    pub paused_session_id: String,
    pub first_action: FileActivityAction,
    pub second_action: FileActivityAction,
    pub strategy: String,
    pub summary: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
    pub resolved_at: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Clone, Default, Serialize)]
pub struct DaemonActivity {
    pub last_dispatch_at: Option<chrono::DateTime<chrono::Utc>>,
    pub last_dispatch_routed: usize,
    pub last_dispatch_deferred: usize,
    pub last_dispatch_leads: usize,
    pub chronic_saturation_streak: usize,
    pub last_recovery_dispatch_at: Option<chrono::DateTime<chrono::Utc>>,
    pub last_recovery_dispatch_routed: usize,
    pub last_recovery_dispatch_leads: usize,
    pub last_rebalance_at: Option<chrono::DateTime<chrono::Utc>>,
    pub last_rebalance_rerouted: usize,
    pub last_rebalance_leads: usize,
    pub last_auto_merge_at: Option<chrono::DateTime<chrono::Utc>>,
    pub last_auto_merge_merged: usize,
    pub last_auto_merge_active_skipped: usize,
    pub last_auto_merge_conflicted_skipped: usize,
    pub last_auto_merge_dirty_skipped: usize,
    pub last_auto_merge_failed: usize,
    pub last_auto_prune_at: Option<chrono::DateTime<chrono::Utc>>,
    pub last_auto_prune_pruned: usize,
    pub last_auto_prune_active_skipped: usize,
}

impl DaemonActivity {
    pub fn prefers_rebalance_first(&self) -> bool {
        if self.last_dispatch_deferred == 0 {
            return false;
        }

        match (
            self.last_dispatch_at.as_ref(),
            self.last_recovery_dispatch_at.as_ref(),
        ) {
            (Some(dispatch_at), Some(recovery_at)) => recovery_at < dispatch_at,
            (Some(_), None) => true,
            _ => false,
        }
    }

    pub fn dispatch_cooloff_active(&self) -> bool {
        self.prefers_rebalance_first()
            && (self.last_dispatch_deferred >= 2 || self.chronic_saturation_streak >= 3)
    }

    pub fn chronic_saturation_cleared_at(&self) -> Option<&chrono::DateTime<chrono::Utc>> {
        if self.prefers_rebalance_first() {
            return None;
        }

        match (
            self.last_dispatch_at.as_ref(),
            self.last_recovery_dispatch_at.as_ref(),
        ) {
            (Some(dispatch_at), Some(recovery_at)) if recovery_at > dispatch_at => {
                Some(recovery_at)
            }
            _ => None,
        }
    }

    pub fn stabilized_after_recovery_at(&self) -> Option<&chrono::DateTime<chrono::Utc>> {
        if self.last_dispatch_deferred != 0 {
            return None;
        }

        match (
            self.last_dispatch_at.as_ref(),
            self.last_recovery_dispatch_at.as_ref(),
        ) {
            (Some(dispatch_at), Some(recovery_at)) if dispatch_at > recovery_at => {
                Some(dispatch_at)
            }
            _ => None,
        }
    }

    pub fn operator_escalation_required(&self) -> bool {
        self.dispatch_cooloff_active()
            && self.chronic_saturation_streak >= 5
            && self.last_rebalance_rerouted == 0
    }
}

impl StateStore {
    pub fn open(path: &Path) -> Result<Self> {
        let conn = Connection::open(path)?;
        conn.execute_batch("PRAGMA foreign_keys = ON;")?;
        conn.busy_timeout(Duration::from_secs(5))?;
        let store = Self { conn };
        store.init_schema()?;
        Ok(store)
    }

    fn init_schema(&self) -> Result<()> {
        self.conn.execute_batch(
            "
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                task TEXT NOT NULL,
                project TEXT NOT NULL DEFAULT '',
                task_group TEXT NOT NULL DEFAULT '',
                agent_type TEXT NOT NULL,
                working_dir TEXT NOT NULL DEFAULT '.',
                state TEXT NOT NULL DEFAULT 'pending',
                pid INTEGER,
                worktree_path TEXT,
                worktree_branch TEXT,
                worktree_base TEXT,
                input_tokens INTEGER DEFAULT 0,
                output_tokens INTEGER DEFAULT 0,
                tokens_used INTEGER DEFAULT 0,
                tool_calls INTEGER DEFAULT 0,
                files_changed INTEGER DEFAULT 0,
                duration_secs INTEGER DEFAULT 0,
                cost_usd REAL DEFAULT 0.0,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                last_heartbeat_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS tool_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hook_event_id TEXT UNIQUE,
                session_id TEXT NOT NULL REFERENCES sessions(id),
                tool_name TEXT NOT NULL,
                input_summary TEXT,
                input_params_json TEXT NOT NULL DEFAULT '{}',
                output_summary TEXT,
                trigger_summary TEXT NOT NULL DEFAULT '',
                duration_ms INTEGER,
                risk_score REAL DEFAULT 0.0,
                timestamp TEXT NOT NULL,
                file_paths_json TEXT NOT NULL DEFAULT '[]',
                file_events_json TEXT NOT NULL DEFAULT '[]'
            );

            CREATE TABLE IF NOT EXISTS session_profiles (
                session_id TEXT PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
                profile_name TEXT NOT NULL,
                model TEXT,
                allowed_tools_json TEXT NOT NULL DEFAULT '[]',
                disallowed_tools_json TEXT NOT NULL DEFAULT '[]',
                permission_mode TEXT,
                add_dirs_json TEXT NOT NULL DEFAULT '[]',
                max_budget_usd REAL,
                token_budget INTEGER,
                append_system_prompt TEXT
            );

            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                from_session TEXT NOT NULL,
                to_session TEXT NOT NULL,
                content TEXT NOT NULL,
                msg_type TEXT NOT NULL DEFAULT 'info',
                read INTEGER DEFAULT 0,
                timestamp TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS session_output (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL REFERENCES sessions(id),
                stream TEXT NOT NULL,
                line TEXT NOT NULL,
                timestamp TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS decision_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
                decision TEXT NOT NULL,
                alternatives_json TEXT NOT NULL DEFAULT '[]',
                reasoning TEXT NOT NULL,
                timestamp TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS pending_worktree_queue (
                session_id TEXT PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
                repo_root TEXT NOT NULL,
                requested_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS conflict_incidents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                conflict_key TEXT NOT NULL UNIQUE,
                path TEXT NOT NULL,
                first_session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
                second_session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
                active_session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
                paused_session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
                first_action TEXT NOT NULL,
                second_action TEXT NOT NULL,
                strategy TEXT NOT NULL,
                summary TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                resolved_at TEXT
            );

            CREATE TABLE IF NOT EXISTS daemon_activity (
                id INTEGER PRIMARY KEY CHECK(id = 1),
                last_dispatch_at TEXT,
                last_dispatch_routed INTEGER NOT NULL DEFAULT 0,
                last_dispatch_deferred INTEGER NOT NULL DEFAULT 0,
                last_dispatch_leads INTEGER NOT NULL DEFAULT 0,
                chronic_saturation_streak INTEGER NOT NULL DEFAULT 0,
                last_recovery_dispatch_at TEXT,
                last_recovery_dispatch_routed INTEGER NOT NULL DEFAULT 0,
                last_recovery_dispatch_leads INTEGER NOT NULL DEFAULT 0,
                last_rebalance_at TEXT,
                last_rebalance_rerouted INTEGER NOT NULL DEFAULT 0,
                last_rebalance_leads INTEGER NOT NULL DEFAULT 0,
                last_auto_merge_at TEXT,
                last_auto_merge_merged INTEGER NOT NULL DEFAULT 0,
                last_auto_merge_active_skipped INTEGER NOT NULL DEFAULT 0,
                last_auto_merge_conflicted_skipped INTEGER NOT NULL DEFAULT 0,
                last_auto_merge_dirty_skipped INTEGER NOT NULL DEFAULT 0,
                last_auto_merge_failed INTEGER NOT NULL DEFAULT 0,
                last_auto_prune_at TEXT,
                last_auto_prune_pruned INTEGER NOT NULL DEFAULT 0,
                last_auto_prune_active_skipped INTEGER NOT NULL DEFAULT 0
            );

            CREATE INDEX IF NOT EXISTS idx_sessions_state ON sessions(state);
            CREATE INDEX IF NOT EXISTS idx_tool_log_session ON tool_log(session_id);
            CREATE INDEX IF NOT EXISTS idx_messages_to ON messages(to_session, read);
            CREATE INDEX IF NOT EXISTS idx_session_output_session
                ON session_output(session_id, id);
            CREATE INDEX IF NOT EXISTS idx_decision_log_session
                ON decision_log(session_id, timestamp, id);
            CREATE INDEX IF NOT EXISTS idx_conflict_incidents_sessions
                ON conflict_incidents(first_session_id, second_session_id, resolved_at, updated_at);
            CREATE INDEX IF NOT EXISTS idx_pending_worktree_queue_requested_at
                ON pending_worktree_queue(requested_at, session_id);

            INSERT OR IGNORE INTO daemon_activity (id) VALUES (1);
            ",
        )?;
        self.ensure_session_columns()?;
        Ok(())
    }

    fn ensure_session_columns(&self) -> Result<()> {
        if !self.has_column("sessions", "working_dir")? {
            self.conn
                .execute(
                    "ALTER TABLE sessions ADD COLUMN working_dir TEXT NOT NULL DEFAULT '.'",
                    [],
                )
                .context("Failed to add working_dir column to sessions table")?;
        }

        if !self.has_column("sessions", "pid")? {
            self.conn
                .execute("ALTER TABLE sessions ADD COLUMN pid INTEGER", [])
                .context("Failed to add pid column to sessions table")?;
        }

        if !self.has_column("sessions", "project")? {
            self.conn
                .execute(
                    "ALTER TABLE sessions ADD COLUMN project TEXT NOT NULL DEFAULT ''",
                    [],
                )
                .context("Failed to add project column to sessions table")?;
        }

        if !self.has_column("sessions", "task_group")? {
            self.conn
                .execute(
                    "ALTER TABLE sessions ADD COLUMN task_group TEXT NOT NULL DEFAULT ''",
                    [],
                )
                .context("Failed to add task_group column to sessions table")?;
        }

        if !self.has_column("sessions", "input_tokens")? {
            self.conn
                .execute(
                    "ALTER TABLE sessions ADD COLUMN input_tokens INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add input_tokens column to sessions table")?;
        }

        if !self.has_column("sessions", "output_tokens")? {
            self.conn
                .execute(
                    "ALTER TABLE sessions ADD COLUMN output_tokens INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add output_tokens column to sessions table")?;
        }

        if !self.has_column("sessions", "last_heartbeat_at")? {
            self.conn
                .execute("ALTER TABLE sessions ADD COLUMN last_heartbeat_at TEXT", [])
                .context("Failed to add last_heartbeat_at column to sessions table")?;
            self.conn
                .execute(
                    "UPDATE sessions
                     SET last_heartbeat_at = updated_at
                     WHERE last_heartbeat_at IS NULL",
                    [],
                )
                .context("Failed to backfill last_heartbeat_at column")?;
        }

        if !self.has_column("tool_log", "hook_event_id")? {
            self.conn
                .execute("ALTER TABLE tool_log ADD COLUMN hook_event_id TEXT", [])
                .context("Failed to add hook_event_id column to tool_log table")?;
        }

        if !self.has_column("tool_log", "file_paths_json")? {
            self.conn
                .execute(
                    "ALTER TABLE tool_log ADD COLUMN file_paths_json TEXT NOT NULL DEFAULT '[]'",
                    [],
                )
                .context("Failed to add file_paths_json column to tool_log table")?;
        }

        if !self.has_column("tool_log", "file_events_json")? {
            self.conn
                .execute(
                    "ALTER TABLE tool_log ADD COLUMN file_events_json TEXT NOT NULL DEFAULT '[]'",
                    [],
                )
                .context("Failed to add file_events_json column to tool_log table")?;
        }

        if !self.has_column("tool_log", "input_params_json")? {
            self.conn
                .execute(
                    "ALTER TABLE tool_log ADD COLUMN input_params_json TEXT NOT NULL DEFAULT '{}'",
                    [],
                )
                .context("Failed to add input_params_json column to tool_log table")?;
        }

        if !self.has_column("tool_log", "trigger_summary")? {
            self.conn
                .execute(
                    "ALTER TABLE tool_log ADD COLUMN trigger_summary TEXT NOT NULL DEFAULT ''",
                    [],
                )
                .context("Failed to add trigger_summary column to tool_log table")?;
        }

        if !self.has_column("daemon_activity", "last_dispatch_deferred")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_dispatch_deferred INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_dispatch_deferred column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_recovery_dispatch_at")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_recovery_dispatch_at TEXT",
                    [],
                )
                .context(
                    "Failed to add last_recovery_dispatch_at column to daemon_activity table",
                )?;
        }

        if !self.has_column("daemon_activity", "last_recovery_dispatch_routed")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_recovery_dispatch_routed INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_recovery_dispatch_routed column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_recovery_dispatch_leads")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_recovery_dispatch_leads INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_recovery_dispatch_leads column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "chronic_saturation_streak")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN chronic_saturation_streak INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add chronic_saturation_streak column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_auto_merge_at")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_auto_merge_at TEXT",
                    [],
                )
                .context("Failed to add last_auto_merge_at column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_auto_merge_merged")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_auto_merge_merged INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_auto_merge_merged column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_auto_merge_active_skipped")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_auto_merge_active_skipped INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_auto_merge_active_skipped column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_auto_merge_conflicted_skipped")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_auto_merge_conflicted_skipped INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_auto_merge_conflicted_skipped column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_auto_merge_dirty_skipped")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_auto_merge_dirty_skipped INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_auto_merge_dirty_skipped column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_auto_merge_failed")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_auto_merge_failed INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_auto_merge_failed column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_auto_prune_at")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_auto_prune_at TEXT",
                    [],
                )
                .context("Failed to add last_auto_prune_at column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_auto_prune_pruned")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_auto_prune_pruned INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_auto_prune_pruned column to daemon_activity table")?;
        }

        if !self.has_column("daemon_activity", "last_auto_prune_active_skipped")? {
            self.conn
                .execute(
                    "ALTER TABLE daemon_activity ADD COLUMN last_auto_prune_active_skipped INTEGER NOT NULL DEFAULT 0",
                    [],
                )
                .context("Failed to add last_auto_prune_active_skipped column to daemon_activity table")?;
        }

        self.conn.execute_batch(
            "CREATE UNIQUE INDEX IF NOT EXISTS idx_tool_log_hook_event
             ON tool_log(hook_event_id)
             WHERE hook_event_id IS NOT NULL;",
        )?;

        Ok(())
    }

    fn has_column(&self, table: &str, column: &str) -> Result<bool> {
        let pragma = format!("PRAGMA table_info({table})");
        let mut stmt = self.conn.prepare(&pragma)?;
        let columns = stmt
            .query_map([], |row| row.get::<_, String>(1))?
            .collect::<std::result::Result<Vec<_>, _>>()?;

        Ok(columns.iter().any(|existing| existing == column))
    }

    pub fn insert_session(&self, session: &Session) -> Result<()> {
        self.conn.execute(
            "INSERT INTO sessions (id, task, project, task_group, agent_type, working_dir, state, pid, worktree_path, worktree_branch, worktree_base, created_at, updated_at, last_heartbeat_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)",
            rusqlite::params![
                session.id,
                session.task,
                session.project,
                session.task_group,
                session.agent_type,
                session.working_dir.to_string_lossy().to_string(),
                session.state.to_string(),
                session.pid.map(i64::from),
                session
                    .worktree
                    .as_ref()
                    .map(|w| w.path.to_string_lossy().to_string()),
                session.worktree.as_ref().map(|w| w.branch.clone()),
                session.worktree.as_ref().map(|w| w.base_branch.clone()),
                session.created_at.to_rfc3339(),
                session.updated_at.to_rfc3339(),
                session.last_heartbeat_at.to_rfc3339(),
            ],
        )?;
        Ok(())
    }

    pub fn upsert_session_profile(
        &self,
        session_id: &str,
        profile: &SessionAgentProfile,
    ) -> Result<()> {
        let allowed_tools_json = serde_json::to_string(&profile.allowed_tools)
            .context("serialize allowed agent profile tools")?;
        let disallowed_tools_json = serde_json::to_string(&profile.disallowed_tools)
            .context("serialize disallowed agent profile tools")?;
        let add_dirs_json = serde_json::to_string(&profile.add_dirs)
            .context("serialize agent profile add_dirs")?;

        self.conn.execute(
            "INSERT INTO session_profiles (
                session_id,
                profile_name,
                model,
                allowed_tools_json,
                disallowed_tools_json,
                permission_mode,
                add_dirs_json,
                max_budget_usd,
                token_budget,
                append_system_prompt
             )
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
             ON CONFLICT(session_id) DO UPDATE SET
                profile_name = excluded.profile_name,
                model = excluded.model,
                allowed_tools_json = excluded.allowed_tools_json,
                disallowed_tools_json = excluded.disallowed_tools_json,
                permission_mode = excluded.permission_mode,
                add_dirs_json = excluded.add_dirs_json,
                max_budget_usd = excluded.max_budget_usd,
                token_budget = excluded.token_budget,
                append_system_prompt = excluded.append_system_prompt",
            rusqlite::params![
                session_id,
                profile.profile_name,
                profile.model,
                allowed_tools_json,
                disallowed_tools_json,
                profile.permission_mode,
                add_dirs_json,
                profile.max_budget_usd,
                profile.token_budget,
                profile.append_system_prompt,
            ],
        )?;
        Ok(())
    }

    pub fn get_session_profile(&self, session_id: &str) -> Result<Option<SessionAgentProfile>> {
        self.conn
            .query_row(
                "SELECT
                    profile_name,
                    model,
                    allowed_tools_json,
                    disallowed_tools_json,
                    permission_mode,
                    add_dirs_json,
                    max_budget_usd,
                    token_budget,
                    append_system_prompt
                 FROM session_profiles
                 WHERE session_id = ?1",
                [session_id],
                |row| {
                    let allowed_tools_json: String = row.get(2)?;
                    let disallowed_tools_json: String = row.get(3)?;
                    let add_dirs_json: String = row.get(5)?;
                    Ok(SessionAgentProfile {
                        profile_name: row.get(0)?,
                        model: row.get(1)?,
                        allowed_tools: serde_json::from_str(&allowed_tools_json)
                            .unwrap_or_default(),
                        disallowed_tools: serde_json::from_str(&disallowed_tools_json)
                            .unwrap_or_default(),
                        permission_mode: row.get(4)?,
                        add_dirs: serde_json::from_str(&add_dirs_json).unwrap_or_default(),
                        max_budget_usd: row.get(6)?,
                        token_budget: row.get(7)?,
                        append_system_prompt: row.get(8)?,
                        agent: None,
                    })
                },
            )
            .optional()
            .map_err(Into::into)
    }

    pub fn update_state_and_pid(
        &self,
        session_id: &str,
        state: &SessionState,
        pid: Option<u32>,
    ) -> Result<()> {
        let updated = self.conn.execute(
            "UPDATE sessions
             SET state = ?1,
                 pid = ?2,
                 updated_at = ?3,
                 last_heartbeat_at = ?3
             WHERE id = ?4",
            rusqlite::params![
                state.to_string(),
                pid.map(i64::from),
                chrono::Utc::now().to_rfc3339(),
                session_id,
            ],
        )?;

        if updated == 0 {
            anyhow::bail!("Session not found: {session_id}");
        }

        Ok(())
    }

    pub fn update_state(&self, session_id: &str, state: &SessionState) -> Result<()> {
        let current_state = self
            .conn
            .query_row(
                "SELECT state FROM sessions WHERE id = ?1",
                [session_id],
                |row| row.get::<_, String>(0),
            )
            .optional()?
            .map(|raw| SessionState::from_db_value(&raw))
            .ok_or_else(|| anyhow::anyhow!("Session not found: {session_id}"))?;

        if !current_state.can_transition_to(state) {
            anyhow::bail!(
                "Invalid session state transition: {} -> {}",
                current_state,
                state
            );
        }

        let updated = self.conn.execute(
            "UPDATE sessions
             SET state = ?1,
                 updated_at = ?2,
                 last_heartbeat_at = ?2
             WHERE id = ?3",
            rusqlite::params![
                state.to_string(),
                chrono::Utc::now().to_rfc3339(),
                session_id,
            ],
        )?;

        if updated == 0 {
            anyhow::bail!("Session not found: {session_id}");
        }

        Ok(())
    }

    pub fn update_pid(&self, session_id: &str, pid: Option<u32>) -> Result<()> {
        let updated = self.conn.execute(
            "UPDATE sessions
             SET pid = ?1,
                 updated_at = ?2,
                 last_heartbeat_at = ?2
             WHERE id = ?3",
            rusqlite::params![
                pid.map(i64::from),
                chrono::Utc::now().to_rfc3339(),
                session_id,
            ],
        )?;

        if updated == 0 {
            anyhow::bail!("Session not found: {session_id}");
        }

        Ok(())
    }

    pub fn clear_worktree(&self, session_id: &str) -> Result<()> {
        let working_dir: String = self.conn.query_row(
            "SELECT working_dir FROM sessions WHERE id = ?1",
            [session_id],
            |row| row.get(0),
        )?;
        self.clear_worktree_to_dir(session_id, Path::new(&working_dir))
    }

    pub fn clear_worktree_to_dir(&self, session_id: &str, working_dir: &Path) -> Result<()> {
        let updated = self.conn.execute(
            "UPDATE sessions
             SET working_dir = ?1,
                 worktree_path = NULL,
                 worktree_branch = NULL,
                 worktree_base = NULL,
                 updated_at = ?2,
                 last_heartbeat_at = ?2
             WHERE id = ?3",
            rusqlite::params![
                working_dir.to_string_lossy().to_string(),
                chrono::Utc::now().to_rfc3339(),
                session_id
            ],
        )?;

        if updated == 0 {
            anyhow::bail!("Session not found: {session_id}");
        }

        Ok(())
    }

    pub fn attach_worktree(&self, session_id: &str, worktree: &WorktreeInfo) -> Result<()> {
        let updated = self.conn.execute(
            "UPDATE sessions
             SET working_dir = ?1,
                 worktree_path = ?2,
                 worktree_branch = ?3,
                 worktree_base = ?4,
                 updated_at = ?5,
                 last_heartbeat_at = ?5
             WHERE id = ?6",
            rusqlite::params![
                worktree.path.to_string_lossy().to_string(),
                worktree.path.to_string_lossy().to_string(),
                worktree.branch,
                worktree.base_branch,
                chrono::Utc::now().to_rfc3339(),
                session_id
            ],
        )?;

        if updated == 0 {
            anyhow::bail!("Session not found: {session_id}");
        }

        Ok(())
    }

    pub fn enqueue_pending_worktree(&self, session_id: &str, repo_root: &Path) -> Result<()> {
        self.conn.execute(
            "INSERT OR REPLACE INTO pending_worktree_queue (session_id, repo_root, requested_at)
             VALUES (?1, ?2, ?3)",
            rusqlite::params![
                session_id,
                repo_root.to_string_lossy().to_string(),
                chrono::Utc::now().to_rfc3339()
            ],
        )?;
        Ok(())
    }

    pub fn dequeue_pending_worktree(&self, session_id: &str) -> Result<()> {
        self.conn.execute(
            "DELETE FROM pending_worktree_queue WHERE session_id = ?1",
            [session_id],
        )?;
        Ok(())
    }

    pub fn pending_worktree_queue_contains(&self, session_id: &str) -> Result<bool> {
        Ok(self
            .conn
            .query_row(
                "SELECT 1 FROM pending_worktree_queue WHERE session_id = ?1",
                [session_id],
                |_| Ok(()),
            )
            .optional()?
            .is_some())
    }

    pub fn pending_worktree_queue(&self, limit: usize) -> Result<Vec<PendingWorktreeRequest>> {
        let mut stmt = self.conn.prepare(
            "SELECT session_id, repo_root, requested_at
             FROM pending_worktree_queue
             ORDER BY requested_at ASC, session_id ASC
             LIMIT ?1",
        )?;

        let rows = stmt
            .query_map([limit as i64], |row| {
                let requested_at: String = row.get(2)?;
                Ok(PendingWorktreeRequest {
                    session_id: row.get(0)?,
                    repo_root: PathBuf::from(row.get::<_, String>(1)?),
                    _requested_at: chrono::DateTime::parse_from_rfc3339(&requested_at)
                        .unwrap_or_default()
                        .with_timezone(&chrono::Utc),
                })
            })?
            .collect::<std::result::Result<Vec<_>, _>>()?;

        Ok(rows)
    }

    pub fn update_metrics(&self, session_id: &str, metrics: &SessionMetrics) -> Result<()> {
        self.conn.execute(
            "UPDATE sessions
             SET input_tokens = ?1,
                 output_tokens = ?2,
                 tokens_used = ?3,
                 tool_calls = ?4,
                 files_changed = ?5,
                 duration_secs = ?6,
                 cost_usd = ?7,
                 updated_at = ?8
             WHERE id = ?9",
            rusqlite::params![
                metrics.input_tokens,
                metrics.output_tokens,
                metrics.tokens_used,
                metrics.tool_calls,
                metrics.files_changed,
                metrics.duration_secs,
                metrics.cost_usd,
                chrono::Utc::now().to_rfc3339(),
                session_id,
            ],
        )?;
        Ok(())
    }

    pub fn refresh_session_durations(&self) -> Result<()> {
        let now = chrono::Utc::now();
        let mut stmt = self.conn.prepare(
            "SELECT id, state, created_at, updated_at, duration_secs
             FROM sessions",
        )?;
        let rows = stmt
            .query_map([], |row| {
                Ok((
                    row.get::<_, String>(0)?,
                    row.get::<_, String>(1)?,
                    row.get::<_, String>(2)?,
                    row.get::<_, String>(3)?,
                    row.get::<_, u64>(4)?,
                ))
            })?
            .collect::<std::result::Result<Vec<_>, _>>()?;

        for (session_id, state_raw, created_raw, updated_raw, current_duration) in rows {
            let state = SessionState::from_db_value(&state_raw);
            let created_at = chrono::DateTime::parse_from_rfc3339(&created_raw)
                .unwrap_or_default()
                .with_timezone(&chrono::Utc);
            let updated_at = chrono::DateTime::parse_from_rfc3339(&updated_raw)
                .unwrap_or_default()
                .with_timezone(&chrono::Utc);
            let effective_end = match state {
                SessionState::Pending
                | SessionState::Running
                | SessionState::Idle
                | SessionState::Stale => now,
                SessionState::Completed | SessionState::Failed | SessionState::Stopped => {
                    updated_at
                }
            };
            let duration_secs = effective_end
                .signed_duration_since(created_at)
                .num_seconds()
                .max(0) as u64;

            if duration_secs != current_duration {
                self.conn.execute(
                    "UPDATE sessions SET duration_secs = ?1 WHERE id = ?2",
                    rusqlite::params![duration_secs, session_id],
                )?;
            }
        }

        Ok(())
    }

    pub fn touch_heartbeat(&self, session_id: &str) -> Result<()> {
        let now = chrono::Utc::now().to_rfc3339();
        let updated = self.conn.execute(
            "UPDATE sessions SET last_heartbeat_at = ?1 WHERE id = ?2",
            rusqlite::params![now, session_id],
        )?;

        if updated == 0 {
            anyhow::bail!("Session not found: {session_id}");
        }

        Ok(())
    }

    pub fn sync_cost_tracker_metrics(&self, metrics_path: &Path) -> Result<()> {
        if !metrics_path.exists() {
            return Ok(());
        }

        #[derive(Default)]
        struct UsageAggregate {
            input_tokens: u64,
            output_tokens: u64,
            cost_usd: f64,
        }

        #[derive(serde::Deserialize)]
        struct CostTrackerRow {
            session_id: String,
            #[serde(default)]
            input_tokens: u64,
            #[serde(default)]
            output_tokens: u64,
            #[serde(default)]
            estimated_cost_usd: f64,
        }

        let file = File::open(metrics_path)
            .with_context(|| format!("Failed to open {}", metrics_path.display()))?;
        let reader = BufReader::new(file);
        let mut aggregates: HashMap<String, UsageAggregate> = HashMap::new();

        for line in reader.lines() {
            let line = line?;
            let trimmed = line.trim();
            if trimmed.is_empty() {
                continue;
            }

            let Ok(row) = serde_json::from_str::<CostTrackerRow>(trimmed) else {
                continue;
            };
            if row.session_id.trim().is_empty() {
                continue;
            }

            let aggregate = aggregates.entry(row.session_id).or_default();
            aggregate.input_tokens = aggregate.input_tokens.saturating_add(row.input_tokens);
            aggregate.output_tokens = aggregate.output_tokens.saturating_add(row.output_tokens);
            aggregate.cost_usd += row.estimated_cost_usd;
        }

        for (session_id, aggregate) in aggregates {
            self.conn.execute(
                "UPDATE sessions
                 SET input_tokens = ?1,
                     output_tokens = ?2,
                     tokens_used = ?3,
                     cost_usd = ?4
                 WHERE id = ?5",
                rusqlite::params![
                    aggregate.input_tokens,
                    aggregate.output_tokens,
                    aggregate
                        .input_tokens
                        .saturating_add(aggregate.output_tokens),
                    aggregate.cost_usd,
                    session_id,
                ],
            )?;
        }

        Ok(())
    }

    pub fn sync_tool_activity_metrics(&self, metrics_path: &Path) -> Result<()> {
        if !metrics_path.exists() {
            return Ok(());
        }

        #[derive(Default)]
        struct ActivityAggregate {
            tool_calls: u64,
            file_paths: HashSet<String>,
        }

        #[derive(serde::Deserialize)]
        struct ToolActivityRow {
            id: String,
            session_id: String,
            tool_name: String,
            #[serde(default)]
            input_summary: String,
            #[serde(default = "default_input_params_json")]
            input_params_json: String,
            #[serde(default)]
            output_summary: String,
            #[serde(default)]
            duration_ms: u64,
            #[serde(default)]
            file_paths: Vec<String>,
            #[serde(default)]
            file_events: Vec<ToolActivityFileEvent>,
            #[serde(default)]
            timestamp: String,
        }

        #[derive(serde::Deserialize)]
        struct ToolActivityFileEvent {
            path: String,
            action: String,
            #[serde(default)]
            diff_preview: Option<String>,
            #[serde(default)]
            patch_preview: Option<String>,
        }

        let file = File::open(metrics_path)
            .with_context(|| format!("Failed to open {}", metrics_path.display()))?;
        let reader = BufReader::new(file);
        let mut aggregates: HashMap<String, ActivityAggregate> = HashMap::new();
        let mut seen_event_ids = HashSet::new();
        let session_tasks = self
            .list_sessions()?
            .into_iter()
            .map(|session| (session.id, session.task))
            .collect::<HashMap<_, _>>();

        for line in reader.lines() {
            let line = line?;
            let trimmed = line.trim();
            if trimmed.is_empty() {
                continue;
            }

            let Ok(row) = serde_json::from_str::<ToolActivityRow>(trimmed) else {
                continue;
            };
            if row.id.trim().is_empty()
                || row.session_id.trim().is_empty()
                || row.tool_name.trim().is_empty()
            {
                continue;
            }
            if !seen_event_ids.insert(row.id.clone()) {
                continue;
            }

            let file_paths: Vec<String> = row
                .file_paths
                .into_iter()
                .map(|path| path.trim().to_string())
                .filter(|path| !path.is_empty())
                .collect();
            let file_events: Vec<PersistedFileEvent> = if row.file_events.is_empty() {
                file_paths
                    .iter()
                    .cloned()
                    .map(|path| PersistedFileEvent {
                        path,
                        action: infer_file_activity_action(&row.tool_name),
                        diff_preview: None,
                        patch_preview: None,
                    })
                    .collect()
            } else {
                row.file_events
                    .into_iter()
                    .filter_map(|event| {
                        let path = event.path.trim().to_string();
                        if path.is_empty() {
                            return None;
                        }
                        Some(PersistedFileEvent {
                            path,
                            action: parse_file_activity_action(&event.action)
                                .unwrap_or_else(|| infer_file_activity_action(&row.tool_name)),
                            diff_preview: normalize_optional_string(event.diff_preview),
                            patch_preview: normalize_optional_string(event.patch_preview),
                        })
                    })
                    .collect()
            };
            let file_paths_json =
                serde_json::to_string(&file_paths).unwrap_or_else(|_| "[]".to_string());
            let file_events_json =
                serde_json::to_string(&file_events).unwrap_or_else(|_| "[]".to_string());
            let timestamp = if row.timestamp.trim().is_empty() {
                chrono::Utc::now().to_rfc3339()
            } else {
                row.timestamp
            };
            let risk_score = ToolCallEvent::compute_risk(
                &row.tool_name,
                &row.input_summary,
                &Config::RISK_THRESHOLDS,
            )
            .score;
            let session_id = row.session_id.clone();
            let trigger_summary = session_tasks.get(&session_id).cloned().unwrap_or_default();

            self.conn.execute(
                "INSERT OR IGNORE INTO tool_log (
                    hook_event_id,
                    session_id,
                    tool_name,
                    input_summary,
                    input_params_json,
                    output_summary,
                    trigger_summary,
                    duration_ms,
                    risk_score,
                    timestamp,
                    file_paths_json,
                    file_events_json
                 )
                 VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)",
                rusqlite::params![
                    row.id,
                    row.session_id,
                    row.tool_name,
                    row.input_summary,
                    row.input_params_json,
                    row.output_summary,
                    trigger_summary,
                    row.duration_ms,
                    risk_score,
                    timestamp,
                    file_paths_json,
                    file_events_json,
                ],
            )?;

            let aggregate = aggregates.entry(session_id).or_default();
            aggregate.tool_calls = aggregate.tool_calls.saturating_add(1);
            for file_path in file_paths {
                aggregate.file_paths.insert(file_path);
            }
        }

        for session in self.list_sessions()? {
            let mut metrics = session.metrics.clone();
            let aggregate = aggregates.get(&session.id);
            metrics.tool_calls = aggregate.map(|item| item.tool_calls).unwrap_or(0);
            metrics.files_changed = aggregate
                .map(|item| item.file_paths.len().min(u32::MAX as usize) as u32)
                .unwrap_or(0);
            self.update_metrics(&session.id, &metrics)?;
        }

        Ok(())
    }

    pub fn increment_tool_calls(&self, session_id: &str) -> Result<()> {
        self.conn.execute(
            "UPDATE sessions
             SET tool_calls = tool_calls + 1,
                 updated_at = ?1,
                 last_heartbeat_at = ?1
             WHERE id = ?2",
            rusqlite::params![chrono::Utc::now().to_rfc3339(), session_id],
        )?;
        Ok(())
    }

    pub fn list_sessions(&self) -> Result<Vec<Session>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, task, project, task_group, agent_type, working_dir, state, pid, worktree_path, worktree_branch, worktree_base,
                    input_tokens, output_tokens, tokens_used, tool_calls, files_changed, duration_secs, cost_usd,
                    created_at, updated_at, last_heartbeat_at
             FROM sessions ORDER BY updated_at DESC",
        )?;

        let sessions = stmt
            .query_map([], |row| {
                let state_str: String = row.get(6)?;
                let state = SessionState::from_db_value(&state_str);

                let working_dir = PathBuf::from(row.get::<_, String>(5)?);
                let project = row
                    .get::<_, String>(2)
                    .ok()
                    .and_then(|value| normalize_group_label(&value))
                    .unwrap_or_else(|| default_project_label(&working_dir));
                let task: String = row.get(1)?;
                let task_group = row
                    .get::<_, String>(3)
                    .ok()
                    .and_then(|value| normalize_group_label(&value))
                    .unwrap_or_else(|| default_task_group_label(&task));

                let worktree_path: Option<String> = row.get(8)?;
                let worktree = worktree_path.map(|path| super::WorktreeInfo {
                    path: PathBuf::from(path),
                    branch: row.get::<_, String>(9).unwrap_or_default(),
                    base_branch: row.get::<_, String>(10).unwrap_or_default(),
                });

                let created_str: String = row.get(18)?;
                let updated_str: String = row.get(19)?;
                let heartbeat_str: String = row.get(20)?;

                Ok(Session {
                    id: row.get(0)?,
                    task,
                    project,
                    task_group,
                    agent_type: row.get(4)?,
                    working_dir,
                    state,
                    pid: row.get::<_, Option<u32>>(7)?,
                    worktree,
                    created_at: chrono::DateTime::parse_from_rfc3339(&created_str)
                        .unwrap_or_default()
                        .with_timezone(&chrono::Utc),
                    updated_at: chrono::DateTime::parse_from_rfc3339(&updated_str)
                        .unwrap_or_default()
                        .with_timezone(&chrono::Utc),
                    last_heartbeat_at: chrono::DateTime::parse_from_rfc3339(&heartbeat_str)
                        .unwrap_or_else(|_| {
                            chrono::DateTime::parse_from_rfc3339(&updated_str).unwrap_or_default()
                        })
                        .with_timezone(&chrono::Utc),
                    metrics: SessionMetrics {
                        input_tokens: row.get(11)?,
                        output_tokens: row.get(12)?,
                        tokens_used: row.get(13)?,
                        tool_calls: row.get(14)?,
                        files_changed: row.get(15)?,
                        duration_secs: row.get(16)?,
                        cost_usd: row.get(17)?,
                    },
                })
            })?
            .collect::<Result<Vec<_>, _>>()?;

        Ok(sessions)
    }

    pub fn get_latest_session(&self) -> Result<Option<Session>> {
        Ok(self.list_sessions()?.into_iter().next())
    }

    pub fn get_session(&self, id: &str) -> Result<Option<Session>> {
        let sessions = self.list_sessions()?;
        Ok(sessions
            .into_iter()
            .find(|session| session.id == id || session.id.starts_with(id)))
    }

    pub fn delete_session(&self, session_id: &str) -> Result<()> {
        self.conn.execute(
            "DELETE FROM session_output WHERE session_id = ?1",
            rusqlite::params![session_id],
        )?;
        self.conn.execute(
            "DELETE FROM tool_log WHERE session_id = ?1",
            rusqlite::params![session_id],
        )?;
        self.conn.execute(
            "DELETE FROM messages WHERE from_session = ?1 OR to_session = ?1",
            rusqlite::params![session_id],
        )?;

        let deleted = self.conn.execute(
            "DELETE FROM sessions WHERE id = ?1",
            rusqlite::params![session_id],
        )?;

        if deleted == 0 {
            anyhow::bail!("Session not found: {session_id}");
        }

        Ok(())
    }

    pub fn send_message(&self, from: &str, to: &str, content: &str, msg_type: &str) -> Result<()> {
        self.conn.execute(
            "INSERT INTO messages (from_session, to_session, content, msg_type, timestamp)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            rusqlite::params![from, to, content, msg_type, chrono::Utc::now().to_rfc3339()],
        )?;
        Ok(())
    }

    pub fn list_messages_for_session(
        &self,
        session_id: &str,
        limit: usize,
    ) -> Result<Vec<SessionMessage>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, from_session, to_session, content, msg_type, read, timestamp
             FROM messages
             WHERE from_session = ?1 OR to_session = ?1
             ORDER BY id DESC
             LIMIT ?2",
        )?;

        let mut messages = stmt
            .query_map(rusqlite::params![session_id, limit as i64], |row| {
                let timestamp: String = row.get(6)?;

                Ok(SessionMessage {
                    id: row.get(0)?,
                    from_session: row.get(1)?,
                    to_session: row.get(2)?,
                    content: row.get(3)?,
                    msg_type: row.get(4)?,
                    read: row.get::<_, i64>(5)? != 0,
                    timestamp: chrono::DateTime::parse_from_rfc3339(&timestamp)
                        .unwrap_or_default()
                        .with_timezone(&chrono::Utc),
                })
            })?
            .collect::<Result<Vec<_>, _>>()?;

        messages.reverse();
        Ok(messages)
    }

    pub fn unread_message_counts(&self) -> Result<HashMap<String, usize>> {
        let mut stmt = self.conn.prepare(
            "SELECT to_session, COUNT(*)
             FROM messages
             WHERE read = 0
             GROUP BY to_session",
        )?;

        let counts = stmt
            .query_map([], |row| {
                Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)? as usize))
            })?
            .collect::<Result<HashMap<_, _>, _>>()?;

        Ok(counts)
    }

    pub fn unread_approval_counts(&self) -> Result<HashMap<String, usize>> {
        let mut stmt = self.conn.prepare(
            "SELECT to_session, COUNT(*)
             FROM messages
             WHERE read = 0 AND msg_type IN ('query', 'conflict')
             GROUP BY to_session",
        )?;

        let counts = stmt
            .query_map([], |row| {
                Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)? as usize))
            })?
            .collect::<Result<HashMap<_, _>, _>>()?;

        Ok(counts)
    }

    pub fn unread_approval_queue(&self, limit: usize) -> Result<Vec<SessionMessage>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, from_session, to_session, content, msg_type, read, timestamp
             FROM messages
             WHERE read = 0 AND msg_type IN ('query', 'conflict')
             ORDER BY id ASC
             LIMIT ?1",
        )?;

        let messages = stmt.query_map(rusqlite::params![limit as i64], |row| {
            let timestamp: String = row.get(6)?;

            Ok(SessionMessage {
                id: row.get(0)?,
                from_session: row.get(1)?,
                to_session: row.get(2)?,
                content: row.get(3)?,
                msg_type: row.get(4)?,
                read: row.get::<_, i64>(5)? != 0,
                timestamp: chrono::DateTime::parse_from_rfc3339(&timestamp)
                    .unwrap_or_default()
                    .with_timezone(&chrono::Utc),
            })
        })?;

        messages.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    pub fn latest_unread_approval_message(&self) -> Result<Option<SessionMessage>> {
        self.conn
            .query_row(
                "SELECT id, from_session, to_session, content, msg_type, read, timestamp
                 FROM messages
                 WHERE read = 0 AND msg_type IN ('query', 'conflict')
                 ORDER BY id DESC
                 LIMIT 1",
                [],
                |row| {
                    let timestamp: String = row.get(6)?;

                    Ok(SessionMessage {
                        id: row.get(0)?,
                        from_session: row.get(1)?,
                        to_session: row.get(2)?,
                        content: row.get(3)?,
                        msg_type: row.get(4)?,
                        read: row.get::<_, i64>(5)? != 0,
                        timestamp: chrono::DateTime::parse_from_rfc3339(&timestamp)
                            .unwrap_or_default()
                            .with_timezone(&chrono::Utc),
                    })
                },
            )
            .optional()
            .map_err(Into::into)
    }

    pub fn unread_task_handoffs_for_session(
        &self,
        session_id: &str,
        limit: usize,
    ) -> Result<Vec<SessionMessage>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, from_session, to_session, content, msg_type, read, timestamp
             FROM messages
             WHERE to_session = ?1 AND msg_type = 'task_handoff' AND read = 0
             ORDER BY id ASC
             LIMIT ?2",
        )?;

        let messages = stmt.query_map(rusqlite::params![session_id, limit as i64], |row| {
            let timestamp: String = row.get(6)?;

            Ok(SessionMessage {
                id: row.get(0)?,
                from_session: row.get(1)?,
                to_session: row.get(2)?,
                content: row.get(3)?,
                msg_type: row.get(4)?,
                read: row.get::<_, i64>(5)? != 0,
                timestamp: chrono::DateTime::parse_from_rfc3339(&timestamp)
                    .unwrap_or_default()
                    .with_timezone(&chrono::Utc),
            })
        })?;

        messages.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    pub fn unread_task_handoff_count(&self, session_id: &str) -> Result<usize> {
        self.conn
            .query_row(
                "SELECT COUNT(*)
                 FROM messages
                 WHERE to_session = ?1 AND msg_type = 'task_handoff' AND read = 0",
                rusqlite::params![session_id],
                |row| row.get::<_, i64>(0),
            )
            .map(|count| count as usize)
            .map_err(Into::into)
    }

    pub fn unread_task_handoff_targets(&self, limit: usize) -> Result<Vec<(String, usize)>> {
        let mut stmt = self.conn.prepare(
            "SELECT to_session, COUNT(*) as unread_count
             FROM messages
             WHERE msg_type = 'task_handoff' AND read = 0
             GROUP BY to_session
             ORDER BY unread_count DESC, MAX(id) ASC
             LIMIT ?1",
        )?;

        let targets = stmt.query_map(rusqlite::params![limit as i64], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)? as usize))
        })?;

        targets.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    pub fn mark_messages_read(&self, session_id: &str) -> Result<usize> {
        let updated = self.conn.execute(
            "UPDATE messages SET read = 1 WHERE to_session = ?1 AND read = 0",
            rusqlite::params![session_id],
        )?;

        Ok(updated)
    }

    pub fn mark_message_read(&self, message_id: i64) -> Result<usize> {
        let updated = self.conn.execute(
            "UPDATE messages SET read = 1 WHERE id = ?1 AND read = 0",
            rusqlite::params![message_id],
        )?;

        Ok(updated)
    }

    pub fn latest_task_handoff_source(&self, session_id: &str) -> Result<Option<String>> {
        self.conn
            .query_row(
                "SELECT from_session
                 FROM messages
                 WHERE to_session = ?1 AND msg_type = 'task_handoff'
                 ORDER BY id DESC
                 LIMIT 1",
                rusqlite::params![session_id],
                |row| row.get::<_, String>(0),
            )
            .optional()
            .map_err(Into::into)
    }

    pub fn insert_decision(
        &self,
        session_id: &str,
        decision: &str,
        alternatives: &[String],
        reasoning: &str,
    ) -> Result<DecisionLogEntry> {
        let timestamp = chrono::Utc::now();
        let alternatives_json = serde_json::to_string(alternatives)
            .context("Failed to serialize decision alternatives")?;

        self.conn.execute(
            "INSERT INTO decision_log (session_id, decision, alternatives_json, reasoning, timestamp)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            rusqlite::params![
                session_id,
                decision,
                alternatives_json,
                reasoning,
                timestamp.to_rfc3339(),
            ],
        )?;

        Ok(DecisionLogEntry {
            id: self.conn.last_insert_rowid(),
            session_id: session_id.to_string(),
            decision: decision.to_string(),
            alternatives: alternatives.to_vec(),
            reasoning: reasoning.to_string(),
            timestamp,
        })
    }

    pub fn list_decisions_for_session(
        &self,
        session_id: &str,
        limit: usize,
    ) -> Result<Vec<DecisionLogEntry>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, session_id, decision, alternatives_json, reasoning, timestamp
             FROM (
                 SELECT id, session_id, decision, alternatives_json, reasoning, timestamp
                 FROM decision_log
                 WHERE session_id = ?1
                 ORDER BY timestamp DESC, id DESC
                 LIMIT ?2
             )
             ORDER BY timestamp ASC, id ASC",
        )?;

        let entries = stmt
            .query_map(rusqlite::params![session_id, limit as i64], |row| {
                map_decision_log_entry(row)
            })?
            .collect::<Result<Vec<_>, _>>()?;

        Ok(entries)
    }

    pub fn list_decisions(&self, limit: usize) -> Result<Vec<DecisionLogEntry>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, session_id, decision, alternatives_json, reasoning, timestamp
             FROM (
                 SELECT id, session_id, decision, alternatives_json, reasoning, timestamp
                 FROM decision_log
                 ORDER BY timestamp DESC, id DESC
                 LIMIT ?1
             )
             ORDER BY timestamp ASC, id ASC",
        )?;

        let entries = stmt
            .query_map(rusqlite::params![limit as i64], map_decision_log_entry)?
            .collect::<Result<Vec<_>, _>>()?;

        Ok(entries)
    }

    pub fn daemon_activity(&self) -> Result<DaemonActivity> {
        self.conn
            .query_row(
                "SELECT last_dispatch_at, last_dispatch_routed, last_dispatch_deferred, last_dispatch_leads,
                        chronic_saturation_streak,
                        last_recovery_dispatch_at, last_recovery_dispatch_routed, last_recovery_dispatch_leads,
                        last_rebalance_at, last_rebalance_rerouted, last_rebalance_leads,
                        last_auto_merge_at, last_auto_merge_merged, last_auto_merge_active_skipped,
                        last_auto_merge_conflicted_skipped, last_auto_merge_dirty_skipped,
                        last_auto_merge_failed, last_auto_prune_at, last_auto_prune_pruned,
                        last_auto_prune_active_skipped
                 FROM daemon_activity
                 WHERE id = 1",
                [],
                |row| {
                    let parse_ts =
                        |value: Option<String>| -> rusqlite::Result<Option<chrono::DateTime<chrono::Utc>>> {
                            value
                                .map(|raw| {
                                    chrono::DateTime::parse_from_rfc3339(&raw)
                                        .map(|ts| ts.with_timezone(&chrono::Utc))
                                        .map_err(|err| {
                                            rusqlite::Error::FromSqlConversionFailure(
                                                0,
                                                rusqlite::types::Type::Text,
                                                Box::new(err),
                                            )
                                        })
                                })
                                .transpose()
                        };

                    Ok(DaemonActivity {
                        last_dispatch_at: parse_ts(row.get(0)?)?,
                        last_dispatch_routed: row.get::<_, i64>(1)? as usize,
                        last_dispatch_deferred: row.get::<_, i64>(2)? as usize,
                        last_dispatch_leads: row.get::<_, i64>(3)? as usize,
                        chronic_saturation_streak: row.get::<_, i64>(4)? as usize,
                        last_recovery_dispatch_at: parse_ts(row.get(5)?)?,
                        last_recovery_dispatch_routed: row.get::<_, i64>(6)? as usize,
                        last_recovery_dispatch_leads: row.get::<_, i64>(7)? as usize,
                        last_rebalance_at: parse_ts(row.get(8)?)?,
                        last_rebalance_rerouted: row.get::<_, i64>(9)? as usize,
                        last_rebalance_leads: row.get::<_, i64>(10)? as usize,
                        last_auto_merge_at: parse_ts(row.get(11)?)?,
                        last_auto_merge_merged: row.get::<_, i64>(12)? as usize,
                        last_auto_merge_active_skipped: row.get::<_, i64>(13)? as usize,
                        last_auto_merge_conflicted_skipped: row.get::<_, i64>(14)? as usize,
                        last_auto_merge_dirty_skipped: row.get::<_, i64>(15)? as usize,
                        last_auto_merge_failed: row.get::<_, i64>(16)? as usize,
                        last_auto_prune_at: parse_ts(row.get(17)?)?,
                        last_auto_prune_pruned: row.get::<_, i64>(18)? as usize,
                        last_auto_prune_active_skipped: row.get::<_, i64>(19)? as usize,
                    })
                },
            )
            .map_err(Into::into)
    }

    pub fn record_daemon_dispatch_pass(
        &self,
        routed: usize,
        deferred: usize,
        leads: usize,
    ) -> Result<()> {
        self.conn.execute(
            "UPDATE daemon_activity
             SET last_dispatch_at = ?1,
                 last_dispatch_routed = ?2,
                 last_dispatch_deferred = ?3,
                 last_dispatch_leads = ?4,
                 chronic_saturation_streak = CASE
                    WHEN ?3 > 0 THEN chronic_saturation_streak + 1
                    ELSE 0
                 END
             WHERE id = 1",
            rusqlite::params![
                chrono::Utc::now().to_rfc3339(),
                routed as i64,
                deferred as i64,
                leads as i64
            ],
        )?;

        Ok(())
    }

    pub fn record_daemon_recovery_dispatch_pass(&self, routed: usize, leads: usize) -> Result<()> {
        self.conn.execute(
            "UPDATE daemon_activity
             SET last_recovery_dispatch_at = ?1,
                 last_recovery_dispatch_routed = ?2,
                 last_recovery_dispatch_leads = ?3,
                 chronic_saturation_streak = 0
             WHERE id = 1",
            rusqlite::params![chrono::Utc::now().to_rfc3339(), routed as i64, leads as i64],
        )?;

        Ok(())
    }

    pub fn record_daemon_rebalance_pass(&self, rerouted: usize, leads: usize) -> Result<()> {
        self.conn.execute(
            "UPDATE daemon_activity
             SET last_rebalance_at = ?1,
                 last_rebalance_rerouted = ?2,
                 last_rebalance_leads = ?3
             WHERE id = 1",
            rusqlite::params![
                chrono::Utc::now().to_rfc3339(),
                rerouted as i64,
                leads as i64
            ],
        )?;

        Ok(())
    }

    pub fn record_daemon_auto_merge_pass(
        &self,
        merged: usize,
        active_skipped: usize,
        conflicted_skipped: usize,
        dirty_skipped: usize,
        failed: usize,
    ) -> Result<()> {
        self.conn.execute(
            "UPDATE daemon_activity
             SET last_auto_merge_at = ?1,
                 last_auto_merge_merged = ?2,
                 last_auto_merge_active_skipped = ?3,
                 last_auto_merge_conflicted_skipped = ?4,
                 last_auto_merge_dirty_skipped = ?5,
                 last_auto_merge_failed = ?6
             WHERE id = 1",
            rusqlite::params![
                chrono::Utc::now().to_rfc3339(),
                merged as i64,
                active_skipped as i64,
                conflicted_skipped as i64,
                dirty_skipped as i64,
                failed as i64,
            ],
        )?;

        Ok(())
    }

    pub fn record_daemon_auto_prune_pass(
        &self,
        pruned: usize,
        active_skipped: usize,
    ) -> Result<()> {
        self.conn.execute(
            "UPDATE daemon_activity
             SET last_auto_prune_at = ?1,
                 last_auto_prune_pruned = ?2,
                 last_auto_prune_active_skipped = ?3
             WHERE id = 1",
            rusqlite::params![
                chrono::Utc::now().to_rfc3339(),
                pruned as i64,
                active_skipped as i64,
            ],
        )?;

        Ok(())
    }

    pub fn delegated_children(&self, session_id: &str, limit: usize) -> Result<Vec<String>> {
        let mut stmt = self.conn.prepare(
            "SELECT to_session
             FROM messages
             WHERE from_session = ?1 AND msg_type = 'task_handoff'
             GROUP BY to_session
             ORDER BY MAX(id) DESC
             LIMIT ?2",
        )?;

        let children = stmt
            .query_map(rusqlite::params![session_id, limit as i64], |row| {
                row.get::<_, String>(0)
            })?
            .collect::<Result<Vec<_>, _>>()?;

        Ok(children)
    }

    pub fn append_output_line(
        &self,
        session_id: &str,
        stream: OutputStream,
        line: &str,
    ) -> Result<()> {
        let now = chrono::Utc::now().to_rfc3339();

        self.conn.execute(
            "INSERT INTO session_output (session_id, stream, line, timestamp)
             VALUES (?1, ?2, ?3, ?4)",
            rusqlite::params![session_id, stream.as_str(), line, now],
        )?;

        self.conn.execute(
            "DELETE FROM session_output
             WHERE session_id = ?1
               AND id NOT IN (
                   SELECT id
                   FROM session_output
                   WHERE session_id = ?1
                   ORDER BY id DESC
                   LIMIT ?2
               )",
            rusqlite::params![session_id, OUTPUT_BUFFER_LIMIT as i64],
        )?;

        self.conn.execute(
            "UPDATE sessions
             SET updated_at = ?1,
                 last_heartbeat_at = ?1
             WHERE id = ?2",
            rusqlite::params![chrono::Utc::now().to_rfc3339(), session_id],
        )?;

        Ok(())
    }

    pub fn get_output_lines(&self, session_id: &str, limit: usize) -> Result<Vec<OutputLine>> {
        let mut stmt = self.conn.prepare(
            "SELECT stream, line, timestamp
             FROM (
                 SELECT id, stream, line, timestamp
                 FROM session_output
                 WHERE session_id = ?1
                 ORDER BY id DESC
                 LIMIT ?2
             )
             ORDER BY id ASC",
        )?;

        let lines = stmt
            .query_map(rusqlite::params![session_id, limit as i64], |row| {
                let stream: String = row.get(0)?;
                let text: String = row.get(1)?;
                let timestamp: String = row.get(2)?;

                Ok(OutputLine::new(
                    OutputStream::from_db_value(&stream),
                    text,
                    timestamp,
                ))
            })?
            .collect::<Result<Vec<_>, _>>()?;

        Ok(lines)
    }

    pub fn insert_tool_log(
        &self,
        session_id: &str,
        tool_name: &str,
        input_summary: &str,
        input_params_json: &str,
        output_summary: &str,
        trigger_summary: &str,
        duration_ms: u64,
        risk_score: f64,
        timestamp: &str,
    ) -> Result<ToolLogEntry> {
        self.conn.execute(
            "INSERT INTO tool_log (session_id, tool_name, input_summary, input_params_json, output_summary, trigger_summary, duration_ms, risk_score, timestamp)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
            rusqlite::params![
                session_id,
                tool_name,
                input_summary,
                input_params_json,
                output_summary,
                trigger_summary,
                duration_ms,
                risk_score,
                timestamp,
            ],
        )?;

        Ok(ToolLogEntry {
            id: self.conn.last_insert_rowid(),
            session_id: session_id.to_string(),
            tool_name: tool_name.to_string(),
            input_summary: input_summary.to_string(),
            input_params_json: input_params_json.to_string(),
            output_summary: output_summary.to_string(),
            trigger_summary: trigger_summary.to_string(),
            duration_ms,
            risk_score,
            timestamp: timestamp.to_string(),
        })
    }

    pub fn query_tool_logs(
        &self,
        session_id: &str,
        page: u64,
        page_size: u64,
    ) -> Result<ToolLogPage> {
        let page = page.max(1);
        let offset = (page - 1) * page_size;

        let total: u64 = self.conn.query_row(
            "SELECT COUNT(*) FROM tool_log WHERE session_id = ?1",
            rusqlite::params![session_id],
            |row| row.get(0),
        )?;

        let mut stmt = self.conn.prepare(
            "SELECT id, session_id, tool_name, input_summary, input_params_json, output_summary, trigger_summary, duration_ms, risk_score, timestamp
             FROM tool_log
             WHERE session_id = ?1
             ORDER BY timestamp DESC, id DESC
             LIMIT ?2 OFFSET ?3",
        )?;

        let entries = stmt
            .query_map(rusqlite::params![session_id, page_size, offset], |row| {
                Ok(ToolLogEntry {
                    id: row.get(0)?,
                    session_id: row.get(1)?,
                    tool_name: row.get(2)?,
                    input_summary: row.get::<_, Option<String>>(3)?.unwrap_or_default(),
                    input_params_json: row
                        .get::<_, Option<String>>(4)?
                        .unwrap_or_else(|| "{}".to_string()),
                    output_summary: row.get::<_, Option<String>>(5)?.unwrap_or_default(),
                    trigger_summary: row.get::<_, Option<String>>(6)?.unwrap_or_default(),
                    duration_ms: row.get::<_, Option<u64>>(7)?.unwrap_or_default(),
                    risk_score: row.get::<_, Option<f64>>(8)?.unwrap_or_default(),
                    timestamp: row.get(9)?,
                })
            })?
            .collect::<Result<Vec<_>, _>>()?;

        Ok(ToolLogPage {
            entries,
            page,
            page_size,
            total,
        })
    }

    pub fn list_tool_logs_for_session(&self, session_id: &str) -> Result<Vec<ToolLogEntry>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, session_id, tool_name, input_summary, input_params_json, output_summary, trigger_summary, duration_ms, risk_score, timestamp
             FROM tool_log
             WHERE session_id = ?1
             ORDER BY timestamp ASC, id ASC",
        )?;

        let entries = stmt
            .query_map(rusqlite::params![session_id], |row| {
                Ok(ToolLogEntry {
                    id: row.get(0)?,
                    session_id: row.get(1)?,
                    tool_name: row.get(2)?,
                    input_summary: row.get::<_, Option<String>>(3)?.unwrap_or_default(),
                    input_params_json: row
                        .get::<_, Option<String>>(4)?
                        .unwrap_or_else(|| "{}".to_string()),
                    output_summary: row.get::<_, Option<String>>(5)?.unwrap_or_default(),
                    trigger_summary: row.get::<_, Option<String>>(6)?.unwrap_or_default(),
                    duration_ms: row.get::<_, Option<u64>>(7)?.unwrap_or_default(),
                    risk_score: row.get::<_, Option<f64>>(8)?.unwrap_or_default(),
                    timestamp: row.get(9)?,
                })
            })?
            .collect::<Result<Vec<_>, _>>()?;

        Ok(entries)
    }

    pub fn list_file_activity(
        &self,
        session_id: &str,
        limit: usize,
    ) -> Result<Vec<FileActivityEntry>> {
        let mut stmt = self.conn.prepare(
            "SELECT session_id, tool_name, input_summary, output_summary, timestamp, file_events_json, file_paths_json
             FROM tool_log
             WHERE session_id = ?1
               AND (
                    (file_events_json IS NOT NULL AND file_events_json != '[]')
                    OR (file_paths_json IS NOT NULL AND file_paths_json != '[]')
               )
             ORDER BY timestamp DESC, id DESC",
        )?;

        let rows = stmt
            .query_map(rusqlite::params![session_id], |row| {
                Ok((
                    row.get::<_, String>(0)?,
                    row.get::<_, String>(1)?,
                    row.get::<_, Option<String>>(2)?.unwrap_or_default(),
                    row.get::<_, Option<String>>(3)?.unwrap_or_default(),
                    row.get::<_, String>(4)?,
                    row.get::<_, Option<String>>(5)?
                        .unwrap_or_else(|| "[]".to_string()),
                    row.get::<_, Option<String>>(6)?
                        .unwrap_or_else(|| "[]".to_string()),
                ))
            })?
            .collect::<Result<Vec<_>, _>>()?;

        let mut events = Vec::new();
        for (
            session_id,
            tool_name,
            input_summary,
            output_summary,
            timestamp,
            file_events_json,
            file_paths_json,
        ) in rows
        {
            let occurred_at = chrono::DateTime::parse_from_rfc3339(&timestamp)
                .unwrap_or_default()
                .with_timezone(&chrono::Utc);
            let summary = if output_summary.trim().is_empty() {
                input_summary
            } else {
                output_summary
            };

            let persisted = parse_persisted_file_events(&file_events_json).unwrap_or_else(|| {
                serde_json::from_str::<Vec<String>>(&file_paths_json)
                    .unwrap_or_default()
                    .into_iter()
                    .filter_map(|path| {
                        let path = path.trim().to_string();
                        if path.is_empty() {
                            return None;
                        }
                        Some(PersistedFileEvent {
                            path,
                            action: infer_file_activity_action(&tool_name),
                            diff_preview: None,
                            patch_preview: None,
                        })
                    })
                    .collect()
            });

            for event in persisted {
                events.push(FileActivityEntry {
                    session_id: session_id.clone(),
                    action: event.action,
                    path: event.path,
                    summary: summary.clone(),
                    diff_preview: event.diff_preview,
                    patch_preview: event.patch_preview,
                    timestamp: occurred_at,
                });
                if events.len() >= limit {
                    return Ok(events);
                }
            }
        }

        Ok(events)
    }

    pub fn list_file_overlaps(
        &self,
        session_id: &str,
        limit: usize,
    ) -> Result<Vec<FileActivityOverlap>> {
        if limit == 0 {
            return Ok(Vec::new());
        }

        let current_activity = self.list_file_activity(session_id, 64)?;
        if current_activity.is_empty() {
            return Ok(Vec::new());
        }

        let mut current_by_path = HashMap::new();
        for entry in current_activity {
            current_by_path.entry(entry.path.clone()).or_insert(entry);
        }

        let mut overlaps = Vec::new();
        let mut seen = HashSet::new();

        for session in self.list_sessions()? {
            if session.id == session_id || !session_state_supports_overlap(&session.state) {
                continue;
            }

            for entry in self.list_file_activity(&session.id, 32)? {
                let Some(current) = current_by_path.get(&entry.path) else {
                    continue;
                };
                if !file_overlap_is_relevant(current, &entry) {
                    continue;
                }
                if !seen.insert((session.id.clone(), entry.path.clone())) {
                    continue;
                }

                overlaps.push(FileActivityOverlap {
                    path: entry.path.clone(),
                    current_action: current.action.clone(),
                    other_action: entry.action.clone(),
                    other_session_id: session.id.clone(),
                    other_session_state: session.state.clone(),
                    timestamp: entry.timestamp,
                });
            }
        }

        overlaps.sort_by_key(|entry| {
            (
                overlap_state_priority(&entry.other_session_state),
                Reverse(entry.timestamp),
                entry.other_session_id.clone(),
                entry.path.clone(),
            )
        });
        overlaps.truncate(limit);
        Ok(overlaps)
    }

    pub fn has_open_conflict_incident(&self, conflict_key: &str) -> Result<bool> {
        let exists = self
            .conn
            .query_row(
                "SELECT 1
                 FROM conflict_incidents
                 WHERE conflict_key = ?1 AND resolved_at IS NULL
                 LIMIT 1",
                rusqlite::params![conflict_key],
                |_| Ok(()),
            )
            .optional()?
            .is_some();
        Ok(exists)
    }

    #[allow(clippy::too_many_arguments)]
    pub fn upsert_conflict_incident(
        &self,
        conflict_key: &str,
        path: &str,
        first_session_id: &str,
        second_session_id: &str,
        active_session_id: &str,
        paused_session_id: &str,
        first_action: &FileActivityAction,
        second_action: &FileActivityAction,
        strategy: &str,
        summary: &str,
    ) -> Result<ConflictIncident> {
        let now = chrono::Utc::now().to_rfc3339();
        self.conn.execute(
            "INSERT INTO conflict_incidents (
                 conflict_key, path, first_session_id, second_session_id,
                 active_session_id, paused_session_id, first_action, second_action,
                 strategy, summary, created_at, updated_at, resolved_at
             )
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?11, NULL)
             ON CONFLICT(conflict_key) DO UPDATE SET
                 path = excluded.path,
                 first_session_id = excluded.first_session_id,
                 second_session_id = excluded.second_session_id,
                 active_session_id = excluded.active_session_id,
                 paused_session_id = excluded.paused_session_id,
                 first_action = excluded.first_action,
                 second_action = excluded.second_action,
                 strategy = excluded.strategy,
                 summary = excluded.summary,
                 updated_at = excluded.updated_at,
                 resolved_at = NULL",
            rusqlite::params![
                conflict_key,
                path,
                first_session_id,
                second_session_id,
                active_session_id,
                paused_session_id,
                file_activity_action_value(first_action),
                file_activity_action_value(second_action),
                strategy,
                summary,
                now,
            ],
        )?;

        self.conn
            .query_row(
                "SELECT id, conflict_key, path, first_session_id, second_session_id,
                        active_session_id, paused_session_id, first_action, second_action,
                        strategy, summary, created_at, updated_at, resolved_at
                 FROM conflict_incidents
                 WHERE conflict_key = ?1",
                rusqlite::params![conflict_key],
                map_conflict_incident,
            )
            .map_err(Into::into)
    }

    pub fn resolve_conflict_incidents_not_in(
        &self,
        active_keys: &HashSet<String>,
    ) -> Result<usize> {
        let open = self.list_open_conflict_incidents(512)?;
        let now = chrono::Utc::now().to_rfc3339();
        let mut resolved = 0;

        for incident in open {
            if active_keys.contains(&incident.conflict_key) {
                continue;
            }

            resolved += self.conn.execute(
                "UPDATE conflict_incidents
                 SET resolved_at = ?2, updated_at = ?2
                 WHERE conflict_key = ?1 AND resolved_at IS NULL",
                rusqlite::params![incident.conflict_key, now],
            )?;
        }

        Ok(resolved)
    }

    pub fn list_open_conflict_incidents_for_session(
        &self,
        session_id: &str,
        limit: usize,
    ) -> Result<Vec<ConflictIncident>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, conflict_key, path, first_session_id, second_session_id,
                    active_session_id, paused_session_id, first_action, second_action,
                    strategy, summary, created_at, updated_at, resolved_at
             FROM conflict_incidents
             WHERE resolved_at IS NULL
               AND (
                   first_session_id = ?1
                   OR second_session_id = ?1
                   OR active_session_id = ?1
                   OR paused_session_id = ?1
               )
             ORDER BY updated_at DESC, id DESC
             LIMIT ?2",
        )?;

        let incidents = stmt
            .query_map(
                rusqlite::params![session_id, limit as i64],
                map_conflict_incident,
            )?
            .collect::<Result<Vec<_>, _>>()
            .map_err(anyhow::Error::from)?;
        Ok(incidents)
    }

    fn list_open_conflict_incidents(&self, limit: usize) -> Result<Vec<ConflictIncident>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, conflict_key, path, first_session_id, second_session_id,
                    active_session_id, paused_session_id, first_action, second_action,
                    strategy, summary, created_at, updated_at, resolved_at
             FROM conflict_incidents
             WHERE resolved_at IS NULL
             ORDER BY updated_at DESC, id DESC
             LIMIT ?1",
        )?;

        let incidents = stmt
            .query_map(rusqlite::params![limit as i64], map_conflict_incident)?
            .collect::<Result<Vec<_>, _>>()
            .map_err(anyhow::Error::from)?;
        Ok(incidents)
    }
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct PersistedFileEvent {
    path: String,
    action: FileActivityAction,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    diff_preview: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    patch_preview: Option<String>,
}

fn parse_persisted_file_events(value: &str) -> Option<Vec<PersistedFileEvent>> {
    let events = serde_json::from_str::<Vec<PersistedFileEvent>>(value).ok()?;
    let events: Vec<PersistedFileEvent> = events
        .into_iter()
        .filter_map(|event| {
            let path = event.path.trim().to_string();
            if path.is_empty() {
                return None;
            }
            Some(PersistedFileEvent {
                path,
                action: event.action,
                diff_preview: normalize_optional_string(event.diff_preview),
                patch_preview: normalize_optional_string(event.patch_preview),
            })
        })
        .collect();
    if events.is_empty() {
        return None;
    }
    Some(events)
}

fn file_activity_action_value(action: &FileActivityAction) -> &'static str {
    match action {
        FileActivityAction::Read => "read",
        FileActivityAction::Create => "create",
        FileActivityAction::Modify => "modify",
        FileActivityAction::Move => "move",
        FileActivityAction::Delete => "delete",
        FileActivityAction::Touch => "touch",
    }
}

fn map_conflict_incident(row: &rusqlite::Row<'_>) -> rusqlite::Result<ConflictIncident> {
    let created_at = parse_timestamp_column(row.get::<_, String>(11)?, 11)?;
    let updated_at = parse_timestamp_column(row.get::<_, String>(12)?, 12)?;
    let resolved_at = row
        .get::<_, Option<String>>(13)?
        .map(|value| parse_timestamp_column(value, 13))
        .transpose()?;

    Ok(ConflictIncident {
        id: row.get(0)?,
        conflict_key: row.get(1)?,
        path: row.get(2)?,
        first_session_id: row.get(3)?,
        second_session_id: row.get(4)?,
        active_session_id: row.get(5)?,
        paused_session_id: row.get(6)?,
        first_action: parse_file_activity_action(&row.get::<_, String>(7)?).ok_or_else(|| {
            rusqlite::Error::InvalidColumnType(
                7,
                "first_action".into(),
                rusqlite::types::Type::Text,
            )
        })?,
        second_action: parse_file_activity_action(&row.get::<_, String>(8)?).ok_or_else(|| {
            rusqlite::Error::InvalidColumnType(
                8,
                "second_action".into(),
                rusqlite::types::Type::Text,
            )
        })?,
        strategy: row.get(9)?,
        summary: row.get(10)?,
        created_at,
        updated_at,
        resolved_at,
    })
}

fn parse_timestamp_column(
    value: String,
    index: usize,
) -> rusqlite::Result<chrono::DateTime<chrono::Utc>> {
    chrono::DateTime::parse_from_rfc3339(&value)
        .map(|value| value.with_timezone(&chrono::Utc))
        .map_err(|error| {
            rusqlite::Error::FromSqlConversionFailure(
                index,
                rusqlite::types::Type::Text,
                Box::new(error),
            )
        })
}

fn parse_file_activity_action(value: &str) -> Option<FileActivityAction> {
    match value.trim().to_ascii_lowercase().as_str() {
        "read" => Some(FileActivityAction::Read),
        "create" => Some(FileActivityAction::Create),
        "modify" | "edit" | "write" => Some(FileActivityAction::Modify),
        "move" | "rename" => Some(FileActivityAction::Move),
        "delete" | "remove" => Some(FileActivityAction::Delete),
        "touch" => Some(FileActivityAction::Touch),
        _ => None,
    }
}

fn normalize_optional_string(value: Option<String>) -> Option<String> {
    value.and_then(|value| {
        let trimmed = value.trim();
        if trimmed.is_empty() {
            None
        } else {
            Some(trimmed.to_string())
        }
    })
}

fn default_input_params_json() -> String {
    "{}".to_string()
}

fn infer_file_activity_action(tool_name: &str) -> FileActivityAction {
    let tool_name = tool_name.trim().to_ascii_lowercase();
    if tool_name.contains("read") {
        FileActivityAction::Read
    } else if tool_name.contains("write") {
        FileActivityAction::Create
    } else if tool_name.contains("edit") {
        FileActivityAction::Modify
    } else if tool_name.contains("delete") || tool_name.contains("remove") {
        FileActivityAction::Delete
    } else if tool_name.contains("move") || tool_name.contains("rename") {
        FileActivityAction::Move
    } else {
        FileActivityAction::Touch
    }
}

fn session_state_supports_overlap(state: &SessionState) -> bool {
    matches!(
        state,
        SessionState::Pending | SessionState::Running | SessionState::Idle | SessionState::Stale
    )
}

fn map_decision_log_entry(row: &rusqlite::Row<'_>) -> rusqlite::Result<DecisionLogEntry> {
    let alternatives_json = row
        .get::<_, Option<String>>(3)?
        .unwrap_or_else(|| "[]".to_string());
    let alternatives = serde_json::from_str(&alternatives_json).map_err(|error| {
        rusqlite::Error::FromSqlConversionFailure(3, rusqlite::types::Type::Text, Box::new(error))
    })?;
    let timestamp = row.get::<_, String>(5)?;
    let timestamp = chrono::DateTime::parse_from_rfc3339(&timestamp)
        .map(|value| value.with_timezone(&chrono::Utc))
        .map_err(|error| {
            rusqlite::Error::FromSqlConversionFailure(
                5,
                rusqlite::types::Type::Text,
                Box::new(error),
            )
        })?;

    Ok(DecisionLogEntry {
        id: row.get(0)?,
        session_id: row.get(1)?,
        decision: row.get(2)?,
        alternatives,
        reasoning: row.get(4)?,
        timestamp,
    })
}

fn file_overlap_is_relevant(current: &FileActivityEntry, other: &FileActivityEntry) -> bool {
    current.path == other.path
        && !(matches!(current.action, FileActivityAction::Read)
            && matches!(other.action, FileActivityAction::Read))
}

fn overlap_state_priority(state: &SessionState) -> u8 {
    match state {
        SessionState::Running => 0,
        SessionState::Idle => 1,
        SessionState::Pending => 2,
        SessionState::Stale => 3,
        SessionState::Completed => 4,
        SessionState::Failed => 5,
        SessionState::Stopped => 6,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::{Duration as ChronoDuration, Utc};
    use std::fs;

    struct TestDir {
        path: PathBuf,
    }

    impl TestDir {
        fn new(label: &str) -> Result<Self> {
            let path =
                std::env::temp_dir().join(format!("ecc2-{}-{}", label, uuid::Uuid::new_v4()));
            fs::create_dir_all(&path)?;
            Ok(Self { path })
        }

        fn path(&self) -> &Path {
            &self.path
        }
    }

    impl Drop for TestDir {
        fn drop(&mut self) {
            let _ = fs::remove_dir_all(&self.path);
        }
    }

    fn build_session(id: &str, state: SessionState) -> Session {
        let now = Utc::now();
        Session {
            id: id.to_string(),
            task: "task".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state,
            pid: None,
            worktree: None,
            created_at: now - ChronoDuration::minutes(1),
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        }
    }

    #[test]
    fn update_state_rejects_invalid_terminal_transition() -> Result<()> {
        let tempdir = TestDir::new("store-invalid-transition")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;

        db.insert_session(&build_session("done", SessionState::Completed))?;

        let error = db
            .update_state("done", &SessionState::Running)
            .expect_err("completed sessions must not transition back to running");

        assert!(error
            .to_string()
            .contains("Invalid session state transition"));
        Ok(())
    }

    #[test]
    fn open_migrates_existing_sessions_table_with_pid_column() -> Result<()> {
        let tempdir = TestDir::new("store-migration")?;
        let db_path = tempdir.path().join("state.db");

        let conn = Connection::open(&db_path)?;
        conn.execute_batch(
            "
            CREATE TABLE sessions (
                id TEXT PRIMARY KEY,
                task TEXT NOT NULL,
                agent_type TEXT NOT NULL,
                working_dir TEXT NOT NULL DEFAULT '.',
                state TEXT NOT NULL DEFAULT 'pending',
                worktree_path TEXT,
                worktree_branch TEXT,
                worktree_base TEXT,
                tokens_used INTEGER DEFAULT 0,
                tool_calls INTEGER DEFAULT 0,
                files_changed INTEGER DEFAULT 0,
                duration_secs INTEGER DEFAULT 0,
                cost_usd REAL DEFAULT 0.0,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );
            ",
        )?;
        drop(conn);

        let db = StateStore::open(&db_path)?;
        let mut stmt = db.conn.prepare("PRAGMA table_info(sessions)")?;
        let column_names = stmt
            .query_map([], |row| row.get::<_, String>(1))?
            .collect::<std::result::Result<Vec<_>, _>>()?;

        assert!(column_names.iter().any(|column| column == "working_dir"));
        assert!(column_names.iter().any(|column| column == "pid"));
        assert!(column_names.iter().any(|column| column == "input_tokens"));
        assert!(column_names.iter().any(|column| column == "output_tokens"));
        assert!(column_names
            .iter()
            .any(|column| column == "last_heartbeat_at"));
        Ok(())
    }

    #[test]
    fn session_profile_round_trips_with_launch_settings() -> Result<()> {
        let tempdir = TestDir::new("store-session-profile")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "review work".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Pending,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;

        db.upsert_session_profile(
            "session-1",
            &crate::session::SessionAgentProfile {
                agent: None,
                profile_name: "reviewer".to_string(),
                model: Some("sonnet".to_string()),
                allowed_tools: vec!["Read".to_string(), "Edit".to_string()],
                disallowed_tools: vec!["Bash".to_string()],
                permission_mode: Some("plan".to_string()),
                add_dirs: vec![PathBuf::from("docs"), PathBuf::from("specs")],
                max_budget_usd: Some(1.5),
                token_budget: Some(1200),
                append_system_prompt: Some("Review thoroughly.".to_string()),
            },
        )?;

        let profile = db
            .get_session_profile("session-1")?
            .expect("profile should be stored");
        assert_eq!(profile.profile_name, "reviewer");
        assert_eq!(profile.model.as_deref(), Some("sonnet"));
        assert_eq!(profile.allowed_tools, vec!["Read", "Edit"]);
        assert_eq!(profile.disallowed_tools, vec!["Bash"]);
        assert_eq!(profile.permission_mode.as_deref(), Some("plan"));
        assert_eq!(profile.add_dirs, vec![PathBuf::from("docs"), PathBuf::from("specs")]);
        assert_eq!(profile.max_budget_usd, Some(1.5));
        assert_eq!(profile.token_budget, Some(1200));
        assert_eq!(
            profile.append_system_prompt.as_deref(),
            Some("Review thoroughly.")
        );

        Ok(())
    }

    #[test]
    fn sync_cost_tracker_metrics_aggregates_usage_into_sessions() -> Result<()> {
        let tempdir = TestDir::new("store-cost-metrics")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "sync usage".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let metrics_dir = tempdir.path().join("metrics");
        fs::create_dir_all(&metrics_dir)?;
        let metrics_path = metrics_dir.join("costs.jsonl");
        fs::write(
            &metrics_path,
            concat!(
                "{\"session_id\":\"session-1\",\"input_tokens\":100,\"output_tokens\":25,\"estimated_cost_usd\":0.11}\n",
                "{\"session_id\":\"session-1\",\"input_tokens\":40,\"output_tokens\":10,\"estimated_cost_usd\":0.05}\n",
                "{\"session_id\":\"other-session\",\"input_tokens\":999,\"output_tokens\":1,\"estimated_cost_usd\":9.99}\n"
            ),
        )?;

        db.sync_cost_tracker_metrics(&metrics_path)?;

        let session = db
            .get_session("session-1")?
            .expect("session should still exist");
        assert_eq!(session.metrics.input_tokens, 140);
        assert_eq!(session.metrics.output_tokens, 35);
        assert_eq!(session.metrics.tokens_used, 175);
        assert!((session.metrics.cost_usd - 0.16).abs() < f64::EPSILON);

        Ok(())
    }

    #[test]
    fn sync_tool_activity_metrics_aggregates_usage_and_logs() -> Result<()> {
        let tempdir = TestDir::new("store-tool-activity")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "sync tools".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "session-2".to_string(),
            task: "no activity".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Pending,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let metrics_dir = tempdir.path().join("metrics");
        fs::create_dir_all(&metrics_dir)?;
        let metrics_path = metrics_dir.join("tool-usage.jsonl");
        fs::write(
            &metrics_path,
            concat!(
                "{\"id\":\"evt-1\",\"session_id\":\"session-1\",\"tool_name\":\"Read\",\"input_summary\":\"Read src/lib.rs\",\"input_params_json\":\"{\\\"file_path\\\":\\\"src/lib.rs\\\"}\",\"output_summary\":\"ok\",\"file_paths\":[\"src/lib.rs\"],\"timestamp\":\"2026-04-09T00:00:00Z\"}\n",
                "{\"id\":\"evt-1\",\"session_id\":\"session-1\",\"tool_name\":\"Read\",\"input_summary\":\"Read src/lib.rs\",\"input_params_json\":\"{\\\"file_path\\\":\\\"src/lib.rs\\\"}\",\"output_summary\":\"ok\",\"file_paths\":[\"src/lib.rs\"],\"timestamp\":\"2026-04-09T00:00:00Z\"}\n",
                "{\"id\":\"evt-2\",\"session_id\":\"session-1\",\"tool_name\":\"Write\",\"input_summary\":\"Write README.md\",\"input_params_json\":\"{\\\"file_path\\\":\\\"README.md\\\",\\\"content\\\":\\\"hello\\\"}\",\"output_summary\":\"ok\",\"file_paths\":[\"src/lib.rs\",\"README.md\"],\"timestamp\":\"2026-04-09T00:01:00Z\"}\n"
            ),
        )?;

        db.sync_tool_activity_metrics(&metrics_path)?;

        let session = db
            .get_session("session-1")?
            .expect("session should still exist");
        assert_eq!(session.metrics.tool_calls, 2);
        assert_eq!(session.metrics.files_changed, 2);

        let inactive = db
            .get_session("session-2")?
            .expect("session should still exist");
        assert_eq!(inactive.metrics.tool_calls, 0);
        assert_eq!(inactive.metrics.files_changed, 0);

        let logs = db.query_tool_logs("session-1", 1, 10)?;
        assert_eq!(logs.total, 2);
        assert_eq!(logs.entries[0].tool_name, "Write");
        assert_eq!(logs.entries[1].tool_name, "Read");
        assert_eq!(
            logs.entries[0].input_params_json,
            "{\"file_path\":\"README.md\",\"content\":\"hello\"}"
        );
        assert_eq!(logs.entries[0].trigger_summary, "sync tools");
        assert_eq!(
            logs.entries[1].input_params_json,
            "{\"file_path\":\"src/lib.rs\"}"
        );
        assert_eq!(logs.entries[1].trigger_summary, "sync tools");

        Ok(())
    }

    #[test]
    fn list_file_activity_expands_logged_file_paths() -> Result<()> {
        let tempdir = TestDir::new("store-file-activity")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "sync tools".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let metrics_dir = tempdir.path().join("metrics");
        fs::create_dir_all(&metrics_dir)?;
        let metrics_path = metrics_dir.join("tool-usage.jsonl");
        fs::write(
            &metrics_path,
            concat!(
                "{\"id\":\"evt-1\",\"session_id\":\"session-1\",\"tool_name\":\"Read\",\"input_summary\":\"Read src/lib.rs\",\"output_summary\":\"ok\",\"file_paths\":[\"src/lib.rs\"],\"timestamp\":\"2026-04-09T00:00:00Z\"}\n",
                "{\"id\":\"evt-2\",\"session_id\":\"session-1\",\"tool_name\":\"Write\",\"input_summary\":\"Write README.md\",\"output_summary\":\"updated readme\",\"file_paths\":[\"README.md\",\"src/lib.rs\"],\"timestamp\":\"2026-04-09T00:01:00Z\"}\n"
            ),
        )?;

        db.sync_tool_activity_metrics(&metrics_path)?;

        let activity = db.list_file_activity("session-1", 10)?;
        assert_eq!(activity.len(), 3);
        assert_eq!(activity[0].action, FileActivityAction::Create);
        assert_eq!(activity[0].path, "README.md");
        assert_eq!(activity[1].action, FileActivityAction::Create);
        assert_eq!(activity[1].path, "src/lib.rs");
        assert_eq!(activity[2].action, FileActivityAction::Read);
        assert_eq!(activity[2].path, "src/lib.rs");

        Ok(())
    }

    #[test]
    fn list_file_activity_preserves_diff_and_patch_previews() -> Result<()> {
        let tempdir = TestDir::new("store-file-activity-diffs")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "sync tools".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let metrics_dir = tempdir.path().join("metrics");
        fs::create_dir_all(&metrics_dir)?;
        let metrics_path = metrics_dir.join("tool-usage.jsonl");
        fs::write(
            &metrics_path,
            concat!(
                "{\"id\":\"evt-1\",\"session_id\":\"session-1\",\"tool_name\":\"Edit\",\"input_summary\":\"Edit src/config.ts\",\"output_summary\":\"updated config\",\"file_paths\":[\"src/config.ts\"],\"file_events\":[{\"path\":\"src/config.ts\",\"action\":\"modify\",\"diff_preview\":\"API_URL=http://localhost:3000 -> API_URL=https://api.example.com\",\"patch_preview\":\"@@\\n- API_URL=http://localhost:3000\\n+ API_URL=https://api.example.com\"}],\"timestamp\":\"2026-04-09T00:00:00Z\"}\n"
            ),
        )?;

        db.sync_tool_activity_metrics(&metrics_path)?;

        let activity = db.list_file_activity("session-1", 10)?;
        assert_eq!(activity.len(), 1);
        assert_eq!(activity[0].action, FileActivityAction::Modify);
        assert_eq!(activity[0].path, "src/config.ts");
        assert_eq!(
            activity[0].diff_preview.as_deref(),
            Some("API_URL=http://localhost:3000 -> API_URL=https://api.example.com")
        );
        assert_eq!(
            activity[0].patch_preview.as_deref(),
            Some("@@\n- API_URL=http://localhost:3000\n+ API_URL=https://api.example.com")
        );

        Ok(())
    }

    #[test]
    fn list_file_overlaps_reports_other_active_sessions_sharing_paths() -> Result<()> {
        let tempdir = TestDir::new("store-file-overlaps")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "focus".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "session-2".to_string(),
            task: "delegate".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Idle,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "session-3".to_string(),
            task: "done".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Completed,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let metrics_dir = tempdir.path().join("metrics");
        fs::create_dir_all(&metrics_dir)?;
        let metrics_path = metrics_dir.join("tool-usage.jsonl");
        fs::write(
            &metrics_path,
            concat!(
                "{\"id\":\"evt-1\",\"session_id\":\"session-1\",\"tool_name\":\"Edit\",\"input_summary\":\"Edit src/lib.rs\",\"output_summary\":\"updated lib\",\"file_events\":[{\"path\":\"src/lib.rs\",\"action\":\"modify\"}],\"timestamp\":\"2026-04-09T00:02:00Z\"}\n",
                "{\"id\":\"evt-2\",\"session_id\":\"session-2\",\"tool_name\":\"Write\",\"input_summary\":\"Write src/lib.rs\",\"output_summary\":\"touched lib\",\"file_events\":[{\"path\":\"src/lib.rs\",\"action\":\"modify\"}],\"timestamp\":\"2026-04-09T00:03:00Z\"}\n",
                "{\"id\":\"evt-3\",\"session_id\":\"session-3\",\"tool_name\":\"Write\",\"input_summary\":\"Write src/lib.rs\",\"output_summary\":\"completed overlap\",\"file_events\":[{\"path\":\"src/lib.rs\",\"action\":\"modify\"}],\"timestamp\":\"2026-04-09T00:04:00Z\"}\n"
            ),
        )?;

        db.sync_tool_activity_metrics(&metrics_path)?;

        let overlaps = db.list_file_overlaps("session-1", 10)?;
        assert_eq!(overlaps.len(), 1);
        assert_eq!(overlaps[0].path, "src/lib.rs");
        assert_eq!(overlaps[0].current_action, FileActivityAction::Modify);
        assert_eq!(overlaps[0].other_action, FileActivityAction::Modify);
        assert_eq!(overlaps[0].other_session_id, "session-2");
        assert_eq!(overlaps[0].other_session_state, SessionState::Idle);

        Ok(())
    }

    #[test]
    fn conflict_incidents_upsert_and_resolve() -> Result<()> {
        let tempdir = TestDir::new("store-conflict-incidents")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        for id in ["session-a", "session-b"] {
            db.insert_session(&Session {
                id: id.to_string(),
                task: id.to_string(),
                project: "workspace".to_string(),
                task_group: "general".to_string(),
                agent_type: "claude".to_string(),
                working_dir: PathBuf::from("/tmp"),
                state: SessionState::Running,
                pid: None,
                worktree: None,
                created_at: now,
                updated_at: now,
                last_heartbeat_at: now,
                metrics: SessionMetrics::default(),
            })?;
        }

        let incident = db.upsert_conflict_incident(
            "src/lib.rs::session-a::session-b",
            "src/lib.rs",
            "session-a",
            "session-b",
            "session-a",
            "session-b",
            &FileActivityAction::Modify,
            &FileActivityAction::Modify,
            "escalate",
            "Paused session-b after overlapping modify on src/lib.rs",
        )?;
        assert_eq!(incident.paused_session_id, "session-b");
        assert!(db.has_open_conflict_incident("src/lib.rs::session-a::session-b")?);

        let listed = db.list_open_conflict_incidents_for_session("session-b", 10)?;
        assert_eq!(listed.len(), 1);
        assert_eq!(listed[0].path, "src/lib.rs");

        let resolved = db.resolve_conflict_incidents_not_in(&HashSet::new())?;
        assert_eq!(resolved, 1);
        assert!(!db.has_open_conflict_incident("src/lib.rs::session-a::session-b")?);

        Ok(())
    }

    #[test]
    fn open_migrates_legacy_tool_log_before_creating_hook_event_index() -> Result<()> {
        let tempdir = TestDir::new("store-legacy-hook-event")?;
        let db_path = tempdir.path().join("state.db");
        let conn = Connection::open(&db_path)?;
        conn.execute_batch(
            "
            CREATE TABLE sessions (
                id TEXT PRIMARY KEY,
                task TEXT NOT NULL,
                agent_type TEXT NOT NULL,
                state TEXT NOT NULL DEFAULT 'pending',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE tool_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                tool_name TEXT NOT NULL,
                input_summary TEXT,
                output_summary TEXT,
                duration_ms INTEGER,
                risk_score REAL DEFAULT 0.0,
                timestamp TEXT NOT NULL
            );
            ",
        )?;
        drop(conn);

        let db = StateStore::open(&db_path)?;
        assert!(db.has_column("tool_log", "hook_event_id")?);

        let conn = Connection::open(&db_path)?;
        let index_count: i64 = conn.query_row(
            "SELECT COUNT(*)
             FROM sqlite_master
             WHERE type = 'index' AND name = 'idx_tool_log_hook_event'",
            [],
            |row| row.get(0),
        )?;
        assert_eq!(index_count, 1);

        Ok(())
    }

    #[test]
    fn insert_and_list_decisions_for_session() -> Result<()> {
        let tempdir = TestDir::new("store-decisions")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "architect".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;

        db.insert_decision(
            "session-1",
            "Use sqlite for the shared context graph",
            &["json files".to_string(), "memory only".to_string()],
            "SQLite keeps the audit trail queryable from both CLI and TUI.",
        )?;
        db.insert_decision(
            "session-1",
            "Keep decision logging append-only",
            &["mutable edits".to_string()],
            "Append-only history preserves operator trust and timeline integrity.",
        )?;

        let entries = db.list_decisions_for_session("session-1", 10)?;
        assert_eq!(entries.len(), 2);
        assert_eq!(entries[0].session_id, "session-1");
        assert_eq!(
            entries[0].decision,
            "Use sqlite for the shared context graph"
        );
        assert_eq!(
            entries[0].alternatives,
            vec!["json files".to_string(), "memory only".to_string()]
        );
        assert_eq!(entries[1].decision, "Keep decision logging append-only");
        assert_eq!(
            entries[1].reasoning,
            "Append-only history preserves operator trust and timeline integrity."
        );

        Ok(())
    }

    #[test]
    fn list_recent_decisions_across_sessions_returns_latest_subset_in_order() -> Result<()> {
        let tempdir = TestDir::new("store-decisions-all")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        for session_id in ["session-a", "session-b", "session-c"] {
            db.insert_session(&Session {
                id: session_id.to_string(),
                task: "decision log".to_string(),
                project: "workspace".to_string(),
                task_group: "general".to_string(),
                agent_type: "claude".to_string(),
                working_dir: PathBuf::from("/tmp"),
                state: SessionState::Running,
                pid: None,
                worktree: None,
                created_at: now,
                updated_at: now,
                last_heartbeat_at: now,
                metrics: SessionMetrics::default(),
            })?;
        }

        db.insert_decision("session-a", "Oldest", &[], "first")?;
        std::thread::sleep(std::time::Duration::from_millis(2));
        db.insert_decision("session-b", "Middle", &[], "second")?;
        std::thread::sleep(std::time::Duration::from_millis(2));
        db.insert_decision("session-c", "Newest", &[], "third")?;

        let entries = db.list_decisions(2)?;
        assert_eq!(
            entries
                .iter()
                .map(|entry| entry.decision.as_str())
                .collect::<Vec<_>>(),
            vec!["Middle", "Newest"]
        );
        assert_eq!(entries[0].session_id, "session-b");
        assert_eq!(entries[1].session_id, "session-c");

        Ok(())
    }

    #[test]
    fn refresh_session_durations_updates_running_and_terminal_sessions() -> Result<()> {
        let tempdir = TestDir::new("store-duration-metrics")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "running-1".to_string(),
            task: "live run".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: Some(1234),
            worktree: None,
            created_at: now - ChronoDuration::seconds(95),
            updated_at: now - ChronoDuration::seconds(1),
            last_heartbeat_at: now - ChronoDuration::seconds(1),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "done-1".to_string(),
            task: "finished run".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Completed,
            pid: None,
            worktree: None,
            created_at: now - ChronoDuration::seconds(80),
            updated_at: now - ChronoDuration::seconds(5),
            last_heartbeat_at: now - ChronoDuration::seconds(5),
            metrics: SessionMetrics::default(),
        })?;

        db.refresh_session_durations()?;

        let running = db
            .get_session("running-1")?
            .expect("running session should exist");
        let completed = db
            .get_session("done-1")?
            .expect("completed session should exist");

        assert!(running.metrics.duration_secs >= 95);
        assert!(completed.metrics.duration_secs >= 75);

        Ok(())
    }

    #[test]
    fn touch_heartbeat_updates_last_heartbeat_timestamp() -> Result<()> {
        let tempdir = TestDir::new("store-touch-heartbeat")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now() - ChronoDuration::seconds(30);

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "heartbeat".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: Some(1234),
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;

        db.touch_heartbeat("session-1")?;

        let session = db
            .get_session("session-1")?
            .expect("session should still exist");
        assert!(session.last_heartbeat_at > now);

        Ok(())
    }

    #[test]
    fn append_output_line_keeps_latest_buffer_window() -> Result<()> {
        let tempdir = TestDir::new("store-output")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "buffer output".to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics::default(),
        })?;

        for index in 0..(OUTPUT_BUFFER_LIMIT + 5) {
            db.append_output_line("session-1", OutputStream::Stdout, &format!("line-{index}"))?;
        }

        let lines = db.get_output_lines("session-1", OUTPUT_BUFFER_LIMIT)?;
        let texts: Vec<_> = lines.iter().map(|line| line.text.as_str()).collect();

        assert_eq!(lines.len(), OUTPUT_BUFFER_LIMIT);
        assert_eq!(texts.first().copied(), Some("line-5"));
        let expected_last_line = format!("line-{}", OUTPUT_BUFFER_LIMIT + 4);
        assert_eq!(texts.last().copied(), Some(expected_last_line.as_str()));

        Ok(())
    }

    #[test]
    fn message_round_trip_tracks_unread_counts_and_read_state() -> Result<()> {
        let tempdir = TestDir::new("store-messages")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;

        db.insert_session(&build_session("planner", SessionState::Running))?;
        db.insert_session(&build_session("worker", SessionState::Pending))?;

        db.send_message(
            "planner",
            "worker",
            "{\"question\":\"Need context\"}",
            "query",
        )?;
        db.send_message(
            "worker",
            "planner",
            "{\"summary\":\"Finished pass\",\"files_changed\":[\"src/app.rs\"]}",
            "completed",
        )?;

        let unread = db.unread_message_counts()?;
        assert_eq!(unread.get("worker"), Some(&1));
        assert_eq!(unread.get("planner"), Some(&1));

        let worker_messages = db.list_messages_for_session("worker", 10)?;
        assert_eq!(worker_messages.len(), 2);
        assert_eq!(worker_messages[0].msg_type, "query");
        assert_eq!(worker_messages[1].msg_type, "completed");

        let updated = db.mark_messages_read("worker")?;
        assert_eq!(updated, 1);

        let unread_after = db.unread_message_counts()?;
        assert_eq!(unread_after.get("worker"), None);
        assert_eq!(unread_after.get("planner"), Some(&1));

        db.send_message(
            "planner",
            "worker-2",
            "{\"task\":\"Review auth flow\",\"context\":\"Delegated from planner\"}",
            "task_handoff",
        )?;
        db.send_message(
            "planner",
            "worker-3",
            "{\"task\":\"Check billing\",\"context\":\"Delegated from planner\"}",
            "task_handoff",
        )?;

        assert_eq!(
            db.latest_task_handoff_source("worker-2")?,
            Some("planner".to_string())
        );
        assert_eq!(
            db.delegated_children("planner", 10)?,
            vec!["worker-3".to_string(), "worker-2".to_string(),]
        );
        assert_eq!(
            db.unread_task_handoff_targets(10)?,
            vec![("worker-2".to_string(), 1), ("worker-3".to_string(), 1),]
        );

        Ok(())
    }

    #[test]
    fn approval_queue_counts_only_queries_and_conflicts() -> Result<()> {
        let tempdir = TestDir::new("store-approval-queue")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;

        db.insert_session(&build_session("planner", SessionState::Running))?;
        db.insert_session(&build_session("worker", SessionState::Pending))?;
        db.insert_session(&build_session("worker-2", SessionState::Pending))?;

        db.send_message(
            "planner",
            "worker",
            "{\"question\":\"Need operator approval\"}",
            "query",
        )?;
        db.send_message(
            "planner",
            "worker",
            "{\"file\":\"src/main.rs\",\"description\":\"Merge conflict\"}",
            "conflict",
        )?;
        db.send_message(
            "worker",
            "planner",
            "{\"summary\":\"Finished pass\",\"files_changed\":[]}",
            "completed",
        )?;
        db.send_message(
            "planner",
            "worker-2",
            "{\"task\":\"Review auth flow\",\"context\":\"Delegated from planner\"}",
            "task_handoff",
        )?;

        let counts = db.unread_approval_counts()?;
        assert_eq!(counts.get("worker"), Some(&2));
        assert_eq!(counts.get("planner"), None);
        assert_eq!(counts.get("worker-2"), None);

        let queue = db.unread_approval_queue(10)?;
        assert_eq!(queue.len(), 2);
        assert_eq!(queue[0].msg_type, "query");
        assert_eq!(queue[1].msg_type, "conflict");

        Ok(())
    }

    #[test]
    fn daemon_activity_round_trips_latest_passes() -> Result<()> {
        let tempdir = TestDir::new("store-daemon-activity")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;

        db.record_daemon_dispatch_pass(4, 1, 2)?;
        db.record_daemon_recovery_dispatch_pass(2, 1)?;
        db.record_daemon_rebalance_pass(3, 1)?;
        db.record_daemon_auto_merge_pass(2, 1, 1, 1, 0)?;
        db.record_daemon_auto_prune_pass(3, 1)?;

        let activity = db.daemon_activity()?;
        assert_eq!(activity.last_dispatch_routed, 4);
        assert_eq!(activity.last_dispatch_deferred, 1);
        assert_eq!(activity.last_dispatch_leads, 2);
        assert_eq!(activity.chronic_saturation_streak, 0);
        assert_eq!(activity.last_recovery_dispatch_routed, 2);
        assert_eq!(activity.last_recovery_dispatch_leads, 1);
        assert_eq!(activity.last_rebalance_rerouted, 3);
        assert_eq!(activity.last_rebalance_leads, 1);
        assert_eq!(activity.last_auto_merge_merged, 2);
        assert_eq!(activity.last_auto_merge_active_skipped, 1);
        assert_eq!(activity.last_auto_merge_conflicted_skipped, 1);
        assert_eq!(activity.last_auto_merge_dirty_skipped, 1);
        assert_eq!(activity.last_auto_merge_failed, 0);
        assert_eq!(activity.last_auto_prune_pruned, 3);
        assert_eq!(activity.last_auto_prune_active_skipped, 1);
        assert!(activity.last_dispatch_at.is_some());
        assert!(activity.last_recovery_dispatch_at.is_some());
        assert!(activity.last_rebalance_at.is_some());
        assert!(activity.last_auto_merge_at.is_some());
        assert!(activity.last_auto_prune_at.is_some());

        Ok(())
    }

    #[test]
    fn daemon_activity_detects_rebalance_first_mode() {
        let now = chrono::Utc::now();

        let clear = DaemonActivity::default();
        assert!(!clear.prefers_rebalance_first());
        assert!(!clear.dispatch_cooloff_active());
        assert!(clear.chronic_saturation_cleared_at().is_none());
        assert!(clear.stabilized_after_recovery_at().is_none());

        let unresolved = DaemonActivity {
            last_dispatch_at: Some(now),
            last_dispatch_routed: 0,
            last_dispatch_deferred: 2,
            last_dispatch_leads: 1,
            chronic_saturation_streak: 1,
            last_recovery_dispatch_at: None,
            last_recovery_dispatch_routed: 0,
            last_recovery_dispatch_leads: 0,
            last_rebalance_at: None,
            last_rebalance_rerouted: 0,
            last_rebalance_leads: 0,
            last_auto_merge_at: None,
            last_auto_merge_merged: 0,
            last_auto_merge_active_skipped: 0,
            last_auto_merge_conflicted_skipped: 0,
            last_auto_merge_dirty_skipped: 0,
            last_auto_merge_failed: 0,
            last_auto_prune_at: None,
            last_auto_prune_pruned: 0,
            last_auto_prune_active_skipped: 0,
        };
        assert!(unresolved.prefers_rebalance_first());
        assert!(unresolved.dispatch_cooloff_active());
        assert!(unresolved.chronic_saturation_cleared_at().is_none());
        assert!(unresolved.stabilized_after_recovery_at().is_none());

        let persistent = DaemonActivity {
            last_dispatch_deferred: 1,
            chronic_saturation_streak: 3,
            ..unresolved.clone()
        };
        assert!(persistent.prefers_rebalance_first());
        assert!(persistent.dispatch_cooloff_active());
        assert!(!persistent.operator_escalation_required());

        let escalated = DaemonActivity {
            chronic_saturation_streak: 5,
            last_rebalance_rerouted: 0,
            ..persistent.clone()
        };
        assert!(escalated.operator_escalation_required());

        let recovered = DaemonActivity {
            last_recovery_dispatch_at: Some(now + chrono::Duration::seconds(1)),
            last_recovery_dispatch_routed: 1,
            chronic_saturation_streak: 0,
            ..unresolved
        };
        assert!(!recovered.prefers_rebalance_first());
        assert!(!recovered.dispatch_cooloff_active());
        assert_eq!(
            recovered.chronic_saturation_cleared_at(),
            recovered.last_recovery_dispatch_at.as_ref()
        );
        assert!(recovered.stabilized_after_recovery_at().is_none());

        let stabilized = DaemonActivity {
            last_dispatch_at: Some(now + chrono::Duration::seconds(2)),
            last_dispatch_routed: 2,
            last_dispatch_deferred: 0,
            last_dispatch_leads: 1,
            ..recovered
        };
        assert!(!stabilized.prefers_rebalance_first());
        assert!(!stabilized.dispatch_cooloff_active());
        assert!(stabilized.chronic_saturation_cleared_at().is_none());
        assert_eq!(
            stabilized.stabilized_after_recovery_at(),
            stabilized.last_dispatch_at.as_ref()
        );
    }

    #[test]
    fn daemon_activity_tracks_chronic_saturation_streak() -> Result<()> {
        let tempdir = TestDir::new("store-daemon-streak")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;

        db.record_daemon_dispatch_pass(0, 1, 1)?;
        db.record_daemon_dispatch_pass(0, 1, 1)?;
        let saturated = db.daemon_activity()?;
        assert_eq!(saturated.chronic_saturation_streak, 2);
        assert!(!saturated.dispatch_cooloff_active());

        db.record_daemon_dispatch_pass(0, 1, 1)?;
        let chronic = db.daemon_activity()?;
        assert_eq!(chronic.chronic_saturation_streak, 3);
        assert!(chronic.dispatch_cooloff_active());

        db.record_daemon_recovery_dispatch_pass(1, 1)?;
        let recovered = db.daemon_activity()?;
        assert_eq!(recovered.chronic_saturation_streak, 0);

        Ok(())
    }
}
