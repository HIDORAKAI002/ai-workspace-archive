use anyhow::{Context, Result};
use rusqlite::{Connection, OptionalExtension};
use serde::Serialize;
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::time::Duration;

use crate::observability::{ToolLogEntry, ToolLogPage};

use super::output::{OutputLine, OutputStream, OUTPUT_BUFFER_LIMIT};
use super::{Session, SessionMessage, SessionMetrics, SessionState};

pub struct StateStore {
    conn: Connection,
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
                agent_type TEXT NOT NULL,
                working_dir TEXT NOT NULL DEFAULT '.',
                state TEXT NOT NULL DEFAULT 'pending',
                pid INTEGER,
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

            CREATE TABLE IF NOT EXISTS tool_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL REFERENCES sessions(id),
                tool_name TEXT NOT NULL,
                input_summary TEXT,
                output_summary TEXT,
                duration_ms INTEGER,
                risk_score REAL DEFAULT 0.0,
                timestamp TEXT NOT NULL
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
            "INSERT INTO sessions (id, task, agent_type, working_dir, state, pid, worktree_path, worktree_branch, worktree_base, created_at, updated_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)",
            rusqlite::params![
                session.id,
                session.task,
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
            ],
        )?;
        Ok(())
    }

    pub fn update_state_and_pid(
        &self,
        session_id: &str,
        state: &SessionState,
        pid: Option<u32>,
    ) -> Result<()> {
        let updated = self.conn.execute(
            "UPDATE sessions SET state = ?1, pid = ?2, updated_at = ?3 WHERE id = ?4",
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
            "UPDATE sessions SET state = ?1, updated_at = ?2 WHERE id = ?3",
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
            "UPDATE sessions SET pid = ?1, updated_at = ?2 WHERE id = ?3",
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
        let updated = self.conn.execute(
            "UPDATE sessions
             SET worktree_path = NULL, worktree_branch = NULL, worktree_base = NULL, updated_at = ?1
             WHERE id = ?2",
            rusqlite::params![chrono::Utc::now().to_rfc3339(), session_id],
        )?;

        if updated == 0 {
            anyhow::bail!("Session not found: {session_id}");
        }

        Ok(())
    }

    pub fn update_metrics(&self, session_id: &str, metrics: &SessionMetrics) -> Result<()> {
        self.conn.execute(
            "UPDATE sessions SET tokens_used = ?1, tool_calls = ?2, files_changed = ?3, duration_secs = ?4, cost_usd = ?5, updated_at = ?6 WHERE id = ?7",
            rusqlite::params![
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

    pub fn increment_tool_calls(&self, session_id: &str) -> Result<()> {
        self.conn.execute(
            "UPDATE sessions SET tool_calls = tool_calls + 1, updated_at = ?1 WHERE id = ?2",
            rusqlite::params![chrono::Utc::now().to_rfc3339(), session_id],
        )?;
        Ok(())
    }

    pub fn list_sessions(&self) -> Result<Vec<Session>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, task, agent_type, working_dir, state, pid, worktree_path, worktree_branch, worktree_base,
                    tokens_used, tool_calls, files_changed, duration_secs, cost_usd,
                    created_at, updated_at
             FROM sessions ORDER BY updated_at DESC",
        )?;

        let sessions = stmt
            .query_map([], |row| {
                let state_str: String = row.get(4)?;
                let state = SessionState::from_db_value(&state_str);

                let worktree_path: Option<String> = row.get(6)?;
                let worktree = worktree_path.map(|path| super::WorktreeInfo {
                    path: PathBuf::from(path),
                    branch: row.get::<_, String>(7).unwrap_or_default(),
                    base_branch: row.get::<_, String>(8).unwrap_or_default(),
                });

                let created_str: String = row.get(14)?;
                let updated_str: String = row.get(15)?;

                Ok(Session {
                    id: row.get(0)?,
                    task: row.get(1)?,
                    agent_type: row.get(2)?,
                    working_dir: PathBuf::from(row.get::<_, String>(3)?),
                    state,
                    pid: row.get::<_, Option<u32>>(5)?,
                    worktree,
                    created_at: chrono::DateTime::parse_from_rfc3339(&created_str)
                        .unwrap_or_default()
                        .with_timezone(&chrono::Utc),
                    updated_at: chrono::DateTime::parse_from_rfc3339(&updated_str)
                        .unwrap_or_default()
                        .with_timezone(&chrono::Utc),
                    metrics: SessionMetrics {
                        tokens_used: row.get(9)?,
                        tool_calls: row.get(10)?,
                        files_changed: row.get(11)?,
                        duration_secs: row.get(12)?,
                        cost_usd: row.get(13)?,
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
            "UPDATE sessions SET updated_at = ?1 WHERE id = ?2",
            rusqlite::params![chrono::Utc::now().to_rfc3339(), session_id],
        )?;

        Ok(())
    }

    pub fn get_output_lines(&self, session_id: &str, limit: usize) -> Result<Vec<OutputLine>> {
        let mut stmt = self.conn.prepare(
            "SELECT stream, line
             FROM (
                 SELECT id, stream, line
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

                Ok(OutputLine {
                    stream: OutputStream::from_db_value(&stream),
                    text,
                })
            })?
            .collect::<Result<Vec<_>, _>>()?;

        Ok(lines)
    }

    pub fn insert_tool_log(
        &self,
        session_id: &str,
        tool_name: &str,
        input_summary: &str,
        output_summary: &str,
        duration_ms: u64,
        risk_score: f64,
        timestamp: &str,
    ) -> Result<ToolLogEntry> {
        self.conn.execute(
            "INSERT INTO tool_log (session_id, tool_name, input_summary, output_summary, duration_ms, risk_score, timestamp)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
            rusqlite::params![
                session_id,
                tool_name,
                input_summary,
                output_summary,
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
            output_summary: output_summary.to_string(),
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
            "SELECT id, session_id, tool_name, input_summary, output_summary, duration_ms, risk_score, timestamp
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
                    output_summary: row.get::<_, Option<String>>(4)?.unwrap_or_default(),
                    duration_ms: row.get::<_, Option<u64>>(5)?.unwrap_or_default(),
                    risk_score: row.get::<_, Option<f64>>(6)?.unwrap_or_default(),
                    timestamp: row.get(7)?,
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
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state,
            pid: None,
            worktree: None,
            created_at: now - ChronoDuration::minutes(1),
            updated_at: now,
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
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
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
