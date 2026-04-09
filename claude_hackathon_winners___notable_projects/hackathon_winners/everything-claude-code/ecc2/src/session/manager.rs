use anyhow::{Context, Result};
use serde::Serialize;
use std::collections::{BTreeMap, HashSet};
use std::fmt;
use std::path::{Path, PathBuf};
use std::process::Stdio;
use tokio::process::Command;

use super::output::SessionOutputStore;
use super::runtime::capture_command_output;
use super::store::StateStore;
use super::{Session, SessionMetrics, SessionState};
use crate::comms::{self, MessageType};
use crate::config::Config;
use crate::observability::{log_tool_call, ToolCallEvent, ToolLogEntry, ToolLogPage, ToolLogger};
use crate::worktree;

pub async fn create_session(
    db: &StateStore,
    cfg: &Config,
    task: &str,
    agent_type: &str,
    use_worktree: bool,
) -> Result<String> {
    let repo_root =
        std::env::current_dir().context("Failed to resolve current working directory")?;
    queue_session_in_dir(db, cfg, task, agent_type, use_worktree, &repo_root).await
}

pub fn list_sessions(db: &StateStore) -> Result<Vec<Session>> {
    db.list_sessions()
}

pub fn get_status(db: &StateStore, id: &str) -> Result<SessionStatus> {
    let session = resolve_session(db, id)?;
    let session_id = session.id.clone();
    Ok(SessionStatus {
        session,
        parent_session: db.latest_task_handoff_source(&session_id)?,
        delegated_children: db.delegated_children(&session_id, 5)?,
    })
}

pub fn get_team_status(db: &StateStore, id: &str, depth: usize) -> Result<TeamStatus> {
    let root = resolve_session(db, id)?;
    let handoff_backlog = db
        .unread_task_handoff_targets(db.list_sessions()?.len().max(1))?
        .into_iter()
        .collect();
    let mut visited = HashSet::new();
    visited.insert(root.id.clone());

    let mut descendants = Vec::new();
    collect_delegation_descendants(
        db,
        &root.id,
        depth,
        1,
        &handoff_backlog,
        &mut visited,
        &mut descendants,
    )?;

    Ok(TeamStatus {
        root,
        handoff_backlog,
        descendants,
    })
}

pub async fn assign_session(
    db: &StateStore,
    cfg: &Config,
    lead_id: &str,
    task: &str,
    agent_type: &str,
    use_worktree: bool,
) -> Result<AssignmentOutcome> {
    let repo_root =
        std::env::current_dir().context("Failed to resolve current working directory")?;
    assign_session_in_dir_with_runner_program(
        db,
        cfg,
        lead_id,
        task,
        agent_type,
        use_worktree,
        &repo_root,
        &std::env::current_exe().context("Failed to resolve ECC executable path")?,
    )
    .await
}

pub async fn drain_inbox(
    db: &StateStore,
    cfg: &Config,
    lead_id: &str,
    agent_type: &str,
    use_worktree: bool,
    limit: usize,
) -> Result<Vec<InboxDrainOutcome>> {
    let repo_root =
        std::env::current_dir().context("Failed to resolve current working directory")?;
    let runner_program =
        std::env::current_exe().context("Failed to resolve ECC executable path")?;
    let lead = resolve_session(db, lead_id)?;
    let messages = db.unread_task_handoffs_for_session(&lead.id, limit)?;
    let mut outcomes = Vec::new();

    for message in messages {
        let task = match comms::parse(&message.content) {
            Some(MessageType::TaskHandoff { task, .. }) => task,
            _ => extract_legacy_handoff_task(&message.content)
                .unwrap_or_else(|| message.content.clone()),
        };

        let outcome = assign_session_in_dir_with_runner_program(
            db,
            cfg,
            &lead.id,
            &task,
            agent_type,
            use_worktree,
            &repo_root,
            &runner_program,
        )
        .await?;

        if assignment_action_routes_work(outcome.action) {
            let _ = db.mark_message_read(message.id)?;
        }
        outcomes.push(InboxDrainOutcome {
            message_id: message.id,
            task,
            session_id: outcome.session_id,
            action: outcome.action,
        });
    }

    Ok(outcomes)
}

pub async fn auto_dispatch_backlog(
    db: &StateStore,
    cfg: &Config,
    agent_type: &str,
    use_worktree: bool,
    lead_limit: usize,
) -> Result<Vec<LeadDispatchOutcome>> {
    let targets = db.unread_task_handoff_targets(lead_limit)?;
    let mut outcomes = Vec::new();

    for (lead_id, unread_count) in targets {
        let routed = drain_inbox(
            db,
            cfg,
            &lead_id,
            agent_type,
            use_worktree,
            cfg.auto_dispatch_limit_per_session,
        )
        .await?;

        if !routed.is_empty() {
            outcomes.push(LeadDispatchOutcome {
                lead_session_id: lead_id,
                unread_count,
                routed,
            });
        }
    }

    Ok(outcomes)
}

pub async fn rebalance_all_teams(
    db: &StateStore,
    cfg: &Config,
    agent_type: &str,
    use_worktree: bool,
    lead_limit: usize,
) -> Result<Vec<LeadRebalanceOutcome>> {
    let sessions = db.list_sessions()?;
    let mut outcomes = Vec::new();

    for session in sessions
        .into_iter()
        .filter(|session| {
            matches!(
                session.state,
                SessionState::Running | SessionState::Pending | SessionState::Idle
            )
        })
        .take(lead_limit)
    {
        let rerouted = rebalance_team_backlog(
            db,
            cfg,
            &session.id,
            agent_type,
            use_worktree,
            cfg.auto_dispatch_limit_per_session,
        )
        .await?;

        if !rerouted.is_empty() {
            outcomes.push(LeadRebalanceOutcome {
                lead_session_id: session.id,
                rerouted,
            });
        }
    }

    Ok(outcomes)
}

pub async fn coordinate_backlog(
    db: &StateStore,
    cfg: &Config,
    agent_type: &str,
    use_worktree: bool,
    lead_limit: usize,
) -> Result<CoordinateBacklogOutcome> {
    let dispatched = auto_dispatch_backlog(db, cfg, agent_type, use_worktree, lead_limit).await?;
    let rebalanced = rebalance_all_teams(db, cfg, agent_type, use_worktree, lead_limit).await?;
    let remaining_targets = db.unread_task_handoff_targets(db.list_sessions()?.len().max(1))?;
    let pressure = summarize_backlog_pressure(db, cfg, agent_type, &remaining_targets)?;
    let remaining_backlog_sessions = remaining_targets.len();
    let remaining_backlog_messages = remaining_targets
        .iter()
        .map(|(_, unread_count)| *unread_count)
        .sum();

    Ok(CoordinateBacklogOutcome {
        dispatched,
        rebalanced,
        remaining_backlog_sessions,
        remaining_backlog_messages,
        remaining_absorbable_sessions: pressure.absorbable_sessions,
        remaining_saturated_sessions: pressure.saturated_sessions,
    })
}

pub async fn rebalance_team_backlog(
    db: &StateStore,
    cfg: &Config,
    lead_id: &str,
    agent_type: &str,
    use_worktree: bool,
    limit: usize,
) -> Result<Vec<RebalanceOutcome>> {
    let repo_root =
        std::env::current_dir().context("Failed to resolve current working directory")?;
    let runner_program =
        std::env::current_exe().context("Failed to resolve ECC executable path")?;
    let lead = resolve_session(db, lead_id)?;
    let mut outcomes = Vec::new();

    if limit == 0 {
        return Ok(outcomes);
    }

    let delegates = direct_delegate_sessions(db, &lead.id, agent_type)?;
    let unread_counts = db.unread_message_counts()?;
    let team_has_capacity = delegates.len() < cfg.max_parallel_sessions;

    for delegate in &delegates {
        if outcomes.len() >= limit {
            break;
        }

        let unread_count = unread_counts.get(&delegate.id).copied().unwrap_or(0);
        if unread_count <= 1 {
            continue;
        }

        let has_clear_idle_elsewhere = delegates.iter().any(|candidate| {
            candidate.id != delegate.id
                && candidate.state == SessionState::Idle
                && unread_counts.get(&candidate.id).copied().unwrap_or(0) == 0
        });

        if !has_clear_idle_elsewhere && !team_has_capacity {
            continue;
        }

        let message_budget = limit.saturating_sub(outcomes.len());
        let messages = db.unread_task_handoffs_for_session(&delegate.id, message_budget)?;

        for message in messages {
            if outcomes.len() >= limit {
                break;
            }

            let current_delegates = direct_delegate_sessions(db, &lead.id, agent_type)?;
            let current_unread_counts = db.unread_message_counts()?;
            let current_team_has_capacity = current_delegates.len() < cfg.max_parallel_sessions;
            let current_has_clear_idle_elsewhere = current_delegates.iter().any(|candidate| {
                candidate.id != delegate.id
                    && candidate.state == SessionState::Idle
                    && current_unread_counts
                        .get(&candidate.id)
                        .copied()
                        .unwrap_or(0)
                        == 0
            });

            if !current_has_clear_idle_elsewhere && !current_team_has_capacity {
                break;
            }

            if message.from_session != lead.id {
                continue;
            }

            let task = match comms::parse(&message.content) {
                Some(MessageType::TaskHandoff { task, .. }) => task,
                _ => extract_legacy_handoff_task(&message.content)
                    .unwrap_or_else(|| message.content.clone()),
            };

            let outcome = assign_session_in_dir_with_runner_program(
                db,
                cfg,
                &lead.id,
                &task,
                agent_type,
                use_worktree,
                &repo_root,
                &runner_program,
            )
            .await?;

            if outcome.session_id == delegate.id {
                continue;
            }

            let _ = db.mark_message_read(message.id)?;
            outcomes.push(RebalanceOutcome {
                from_session_id: delegate.id.clone(),
                message_id: message.id,
                task,
                session_id: outcome.session_id,
                action: outcome.action,
            });
        }
    }

    Ok(outcomes)
}

pub async fn stop_session(db: &StateStore, id: &str) -> Result<()> {
    stop_session_with_options(db, id, true).await
}

pub fn record_tool_call(
    db: &StateStore,
    session_id: &str,
    tool_name: &str,
    input_summary: &str,
    output_summary: &str,
    duration_ms: u64,
) -> Result<ToolLogEntry> {
    let session = db
        .get_session(session_id)?
        .ok_or_else(|| anyhow::anyhow!("Session not found: {session_id}"))?;

    let event = ToolCallEvent::new(
        session.id.clone(),
        tool_name,
        input_summary,
        output_summary,
        duration_ms,
    );
    let entry = log_tool_call(db, &event)?;
    db.increment_tool_calls(&session.id)?;

    Ok(entry)
}

pub fn query_tool_calls(
    db: &StateStore,
    session_id: &str,
    page: u64,
    page_size: u64,
) -> Result<ToolLogPage> {
    let session = db
        .get_session(session_id)?
        .ok_or_else(|| anyhow::anyhow!("Session not found: {session_id}"))?;

    ToolLogger::new(db).query(&session.id, page, page_size)
}

pub async fn resume_session(db: &StateStore, _cfg: &Config, id: &str) -> Result<String> {
    resume_session_with_program(db, id, None).await
}

async fn resume_session_with_program(
    db: &StateStore,
    id: &str,
    runner_executable_override: Option<&Path>,
) -> Result<String> {
    let session = resolve_session(db, id)?;

    if session.state == SessionState::Completed {
        anyhow::bail!("Completed sessions cannot be resumed: {}", session.id);
    }

    if session.state == SessionState::Running {
        anyhow::bail!("Session is already running: {}", session.id);
    }

    db.update_state_and_pid(&session.id, &SessionState::Pending, None)?;
    let runner_executable = match runner_executable_override {
        Some(program) => program.to_path_buf(),
        None => std::env::current_exe().context("Failed to resolve ECC executable path")?,
    };
    spawn_session_runner_for_program(
        &session.task,
        &session.id,
        &session.agent_type,
        &session.working_dir,
        &runner_executable,
    )
    .await
    .with_context(|| format!("Failed to resume session {}", session.id))?;
    Ok(session.id)
}

async fn assign_session_in_dir_with_runner_program(
    db: &StateStore,
    cfg: &Config,
    lead_id: &str,
    task: &str,
    agent_type: &str,
    use_worktree: bool,
    repo_root: &Path,
    runner_program: &Path,
) -> Result<AssignmentOutcome> {
    let lead = resolve_session(db, lead_id)?;
    let delegates = direct_delegate_sessions(db, &lead.id, agent_type)?;
    let delegate_handoff_backlog = delegates
        .iter()
        .map(|session| {
            db.unread_task_handoff_count(&session.id)
                .map(|count| (session.id.clone(), count))
        })
        .collect::<Result<std::collections::HashMap<_, _>>>()?;

    if let Some(idle_delegate) = delegates
        .iter()
        .filter(|session| {
            session.state == SessionState::Idle
                && delegate_handoff_backlog
                    .get(&session.id)
                    .copied()
                    .unwrap_or(0)
                    == 0
        })
        .min_by_key(|session| session.updated_at)
    {
        send_task_handoff(db, &lead, &idle_delegate.id, task, "reused idle delegate")?;
        return Ok(AssignmentOutcome {
            session_id: idle_delegate.id.clone(),
            action: AssignmentAction::ReusedIdle,
        });
    }

    if delegates.len() < cfg.max_parallel_sessions {
        let session_id = queue_session_in_dir_with_runner_program(
            db,
            cfg,
            task,
            agent_type,
            use_worktree,
            repo_root,
            runner_program,
        )
        .await?;
        send_task_handoff(db, &lead, &session_id, task, "spawned new delegate")?;
        return Ok(AssignmentOutcome {
            session_id,
            action: AssignmentAction::Spawned,
        });
    }

    if let Some(_idle_delegate) = delegates
        .iter()
        .filter(|session| session.state == SessionState::Idle)
        .min_by_key(|session| {
            (
                delegate_handoff_backlog
                    .get(&session.id)
                    .copied()
                    .unwrap_or(0),
                session.updated_at,
            )
        })
    {
        return Ok(AssignmentOutcome {
            session_id: lead.id.clone(),
            action: AssignmentAction::DeferredSaturated,
        });
    }

    if let Some(active_delegate) = delegates
        .iter()
        .filter(|session| matches!(session.state, SessionState::Running | SessionState::Pending))
        .min_by_key(|session| {
            (
                delegate_handoff_backlog
                    .get(&session.id)
                    .copied()
                    .unwrap_or(0),
                session.updated_at,
            )
        })
    {
        if delegate_handoff_backlog
            .get(&active_delegate.id)
            .copied()
            .unwrap_or(0)
            > 0
        {
            return Ok(AssignmentOutcome {
                session_id: lead.id.clone(),
                action: AssignmentAction::DeferredSaturated,
            });
        }

        send_task_handoff(
            db,
            &lead,
            &active_delegate.id,
            task,
            "reused active delegate at capacity",
        )?;
        return Ok(AssignmentOutcome {
            session_id: active_delegate.id.clone(),
            action: AssignmentAction::ReusedActive,
        });
    }

    let session_id = queue_session_in_dir_with_runner_program(
        db,
        cfg,
        task,
        agent_type,
        use_worktree,
        repo_root,
        runner_program,
    )
    .await?;
    send_task_handoff(db, &lead, &session_id, task, "spawned fallback delegate")?;
    Ok(AssignmentOutcome {
        session_id,
        action: AssignmentAction::Spawned,
    })
}

fn collect_delegation_descendants(
    db: &StateStore,
    session_id: &str,
    remaining_depth: usize,
    current_depth: usize,
    handoff_backlog: &std::collections::HashMap<String, usize>,
    visited: &mut HashSet<String>,
    descendants: &mut Vec<DelegatedSessionSummary>,
) -> Result<()> {
    if remaining_depth == 0 {
        return Ok(());
    }

    for child_id in db.delegated_children(session_id, 50)? {
        if !visited.insert(child_id.clone()) {
            continue;
        }

        let Some(session) = db.get_session(&child_id)? else {
            continue;
        };

        descendants.push(DelegatedSessionSummary {
            depth: current_depth,
            handoff_backlog: handoff_backlog.get(&child_id).copied().unwrap_or(0),
            session,
        });

        collect_delegation_descendants(
            db,
            &child_id,
            remaining_depth.saturating_sub(1),
            current_depth + 1,
            handoff_backlog,
            visited,
            descendants,
        )?;
    }

    Ok(())
}

pub async fn cleanup_session_worktree(db: &StateStore, id: &str) -> Result<()> {
    let session = resolve_session(db, id)?;

    if session.state == SessionState::Running {
        stop_session_with_options(db, &session.id, true).await?;
        db.clear_worktree(&session.id)?;
        return Ok(());
    }

    if let Some(worktree) = session.worktree.as_ref() {
        crate::worktree::remove(worktree)?;
        db.clear_worktree(&session.id)?;
    }

    Ok(())
}

#[derive(Debug, Clone, Serialize)]
pub struct WorktreeMergeOutcome {
    pub session_id: String,
    pub branch: String,
    pub base_branch: String,
    pub already_up_to_date: bool,
    pub cleaned_worktree: bool,
}

pub async fn merge_session_worktree(
    db: &StateStore,
    id: &str,
    cleanup_worktree: bool,
) -> Result<WorktreeMergeOutcome> {
    let session = resolve_session(db, id)?;

    if matches!(
        session.state,
        SessionState::Pending | SessionState::Running | SessionState::Idle
    ) {
        anyhow::bail!(
            "Cannot merge active session {} while it is {}",
            session.id,
            session.state
        );
    }

    let worktree = session
        .worktree
        .clone()
        .ok_or_else(|| anyhow::anyhow!("Session {} has no attached worktree", session.id))?;
    let outcome = crate::worktree::merge_into_base(&worktree)?;

    if cleanup_worktree {
        crate::worktree::remove(&worktree)?;
        db.clear_worktree(&session.id)?;
    }

    Ok(WorktreeMergeOutcome {
        session_id: session.id,
        branch: outcome.branch,
        base_branch: outcome.base_branch,
        already_up_to_date: outcome.already_up_to_date,
        cleaned_worktree: cleanup_worktree,
    })
}

#[derive(Debug, Clone, Serialize)]
pub struct WorktreeMergeFailure {
    pub session_id: String,
    pub reason: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct WorktreeBulkMergeOutcome {
    pub merged: Vec<WorktreeMergeOutcome>,
    pub active_with_worktree_ids: Vec<String>,
    pub conflicted_session_ids: Vec<String>,
    pub dirty_worktree_ids: Vec<String>,
    pub failures: Vec<WorktreeMergeFailure>,
}

pub async fn merge_ready_worktrees(
    db: &StateStore,
    cleanup_worktree: bool,
) -> Result<WorktreeBulkMergeOutcome> {
    let sessions = db.list_sessions()?;
    let mut merged = Vec::new();
    let mut active_with_worktree_ids = Vec::new();
    let mut conflicted_session_ids = Vec::new();
    let mut dirty_worktree_ids = Vec::new();
    let mut failures = Vec::new();

    for session in sessions {
        let Some(worktree) = session.worktree.clone() else {
            continue;
        };

        if matches!(
            session.state,
            SessionState::Pending | SessionState::Running | SessionState::Idle
        ) {
            active_with_worktree_ids.push(session.id);
            continue;
        }

        match crate::worktree::merge_readiness(&worktree) {
            Ok(readiness)
                if readiness.status == crate::worktree::MergeReadinessStatus::Conflicted =>
            {
                conflicted_session_ids.push(session.id);
                continue;
            }
            Ok(_) => {}
            Err(error) => {
                failures.push(WorktreeMergeFailure {
                    session_id: session.id,
                    reason: error.to_string(),
                });
                continue;
            }
        }

        match crate::worktree::has_uncommitted_changes(&worktree) {
            Ok(true) => {
                dirty_worktree_ids.push(session.id);
                continue;
            }
            Ok(false) => {}
            Err(error) => {
                failures.push(WorktreeMergeFailure {
                    session_id: session.id,
                    reason: error.to_string(),
                });
                continue;
            }
        }

        match merge_session_worktree(db, &session.id, cleanup_worktree).await {
            Ok(outcome) => merged.push(outcome),
            Err(error) => failures.push(WorktreeMergeFailure {
                session_id: session.id,
                reason: error.to_string(),
            }),
        }
    }

    Ok(WorktreeBulkMergeOutcome {
        merged,
        active_with_worktree_ids,
        conflicted_session_ids,
        dirty_worktree_ids,
        failures,
    })
}

#[derive(Debug, Clone, Serialize)]
pub struct WorktreePruneOutcome {
    pub cleaned_session_ids: Vec<String>,
    pub active_with_worktree_ids: Vec<String>,
}

pub async fn prune_inactive_worktrees(db: &StateStore) -> Result<WorktreePruneOutcome> {
    let sessions = db.list_sessions()?;
    let mut cleaned_session_ids = Vec::new();
    let mut active_with_worktree_ids = Vec::new();

    for session in sessions {
        let Some(_) = session.worktree.as_ref() else {
            continue;
        };

        if matches!(
            session.state,
            SessionState::Pending | SessionState::Running | SessionState::Idle
        ) {
            active_with_worktree_ids.push(session.id);
            continue;
        }

        cleanup_session_worktree(db, &session.id).await?;
        cleaned_session_ids.push(session.id);
    }

    Ok(WorktreePruneOutcome {
        cleaned_session_ids,
        active_with_worktree_ids,
    })
}

pub async fn delete_session(db: &StateStore, id: &str) -> Result<()> {
    let session = resolve_session(db, id)?;

    if matches!(
        session.state,
        SessionState::Pending | SessionState::Running | SessionState::Idle
    ) {
        anyhow::bail!(
            "Cannot delete active session {} while it is {}",
            session.id,
            session.state
        );
    }

    if let Some(worktree) = session.worktree.as_ref() {
        let _ = crate::worktree::remove(worktree);
    }

    db.delete_session(&session.id)?;
    Ok(())
}

fn agent_program(agent_type: &str) -> Result<PathBuf> {
    match agent_type {
        "claude" => Ok(PathBuf::from("claude")),
        other => anyhow::bail!("Unsupported agent type: {other}"),
    }
}

fn resolve_session(db: &StateStore, id: &str) -> Result<Session> {
    let session = if id == "latest" {
        db.get_latest_session()?
    } else {
        db.get_session(id)?
    };

    session.ok_or_else(|| anyhow::anyhow!("Session not found: {id}"))
}

pub async fn run_session(
    cfg: &Config,
    session_id: &str,
    task: &str,
    agent_type: &str,
    working_dir: &Path,
) -> Result<()> {
    let db = StateStore::open(&cfg.db_path)?;
    let session = resolve_session(&db, session_id)?;

    if session.state != SessionState::Pending {
        tracing::info!(
            "Skipping run_session for {} because state is {}",
            session_id,
            session.state
        );
        return Ok(());
    }

    let agent_program = agent_program(agent_type)?;
    let command = build_agent_command(&agent_program, task, session_id, working_dir);
    capture_command_output(
        cfg.db_path.clone(),
        session_id.to_string(),
        command,
        SessionOutputStore::default(),
    )
    .await?;
    Ok(())
}

async fn queue_session_in_dir(
    db: &StateStore,
    cfg: &Config,
    task: &str,
    agent_type: &str,
    use_worktree: bool,
    repo_root: &Path,
) -> Result<String> {
    queue_session_in_dir_with_runner_program(
        db,
        cfg,
        task,
        agent_type,
        use_worktree,
        repo_root,
        &std::env::current_exe().context("Failed to resolve ECC executable path")?,
    )
    .await
}

async fn queue_session_in_dir_with_runner_program(
    db: &StateStore,
    cfg: &Config,
    task: &str,
    agent_type: &str,
    use_worktree: bool,
    repo_root: &Path,
    runner_program: &Path,
) -> Result<String> {
    let session = build_session_record(task, agent_type, use_worktree, cfg, repo_root)?;
    db.insert_session(&session)?;

    let working_dir = session
        .worktree
        .as_ref()
        .map(|worktree| worktree.path.as_path())
        .unwrap_or(repo_root);

    match spawn_session_runner_for_program(
        task,
        &session.id,
        agent_type,
        working_dir,
        runner_program,
    )
    .await
    {
        Ok(()) => Ok(session.id),
        Err(error) => {
            db.update_state(&session.id, &SessionState::Failed)?;

            if let Some(worktree) = session.worktree.as_ref() {
                let _ = crate::worktree::remove(worktree);
            }

            Err(error.context(format!("Failed to queue session {}", session.id)))
        }
    }
}

fn build_session_record(
    task: &str,
    agent_type: &str,
    use_worktree: bool,
    cfg: &Config,
    repo_root: &Path,
) -> Result<Session> {
    let id = uuid::Uuid::new_v4().to_string()[..8].to_string();
    let now = chrono::Utc::now();

    let worktree = if use_worktree {
        Some(worktree::create_for_session_in_repo(&id, cfg, repo_root)?)
    } else {
        None
    };
    let working_dir = worktree
        .as_ref()
        .map(|worktree| worktree.path.clone())
        .unwrap_or_else(|| repo_root.to_path_buf());

    Ok(Session {
        id,
        task: task.to_string(),
        agent_type: agent_type.to_string(),
        working_dir,
        state: SessionState::Pending,
        pid: None,
        worktree,
        created_at: now,
        updated_at: now,
        metrics: SessionMetrics::default(),
    })
}

async fn create_session_in_dir(
    db: &StateStore,
    cfg: &Config,
    task: &str,
    agent_type: &str,
    use_worktree: bool,
    repo_root: &Path,
    agent_program: &Path,
) -> Result<String> {
    let session = build_session_record(task, agent_type, use_worktree, cfg, repo_root)?;

    db.insert_session(&session)?;

    let working_dir = session
        .worktree
        .as_ref()
        .map(|worktree| worktree.path.as_path())
        .unwrap_or(repo_root);

    match spawn_claude_code(agent_program, task, &session.id, working_dir).await {
        Ok(pid) => {
            db.update_pid(&session.id, Some(pid))?;
            db.update_state(&session.id, &SessionState::Running)?;
            Ok(session.id)
        }
        Err(error) => {
            db.update_state(&session.id, &SessionState::Failed)?;

            if let Some(worktree) = session.worktree.as_ref() {
                let _ = crate::worktree::remove(worktree);
            }

            Err(error.context(format!("Failed to start session {}", session.id)))
        }
    }
}

async fn spawn_session_runner(
    task: &str,
    session_id: &str,
    agent_type: &str,
    working_dir: &Path,
) -> Result<()> {
    spawn_session_runner_for_program(
        task,
        session_id,
        agent_type,
        working_dir,
        &std::env::current_exe().context("Failed to resolve ECC executable path")?,
    )
    .await
}

fn direct_delegate_sessions(
    db: &StateStore,
    lead_id: &str,
    agent_type: &str,
) -> Result<Vec<Session>> {
    let mut sessions = Vec::new();
    for child_id in db.delegated_children(lead_id, 50)? {
        let Some(session) = db.get_session(&child_id)? else {
            continue;
        };

        if session.agent_type != agent_type {
            continue;
        }

        if matches!(
            session.state,
            SessionState::Pending | SessionState::Running | SessionState::Idle
        ) {
            sessions.push(session);
        }
    }

    Ok(sessions)
}

fn summarize_backlog_pressure(
    db: &StateStore,
    cfg: &Config,
    agent_type: &str,
    targets: &[(String, usize)],
) -> Result<BacklogPressureSummary> {
    let mut summary = BacklogPressureSummary::default();

    for (session_id, _) in targets {
        let delegates = direct_delegate_sessions(db, session_id, agent_type)?;
        let has_clear_idle_delegate = delegates.iter().any(|delegate| {
            delegate.state == SessionState::Idle
                && db.unread_task_handoff_count(&delegate.id).unwrap_or(0) == 0
        });
        let has_capacity = delegates.len() < cfg.max_parallel_sessions;

        if has_clear_idle_delegate || has_capacity {
            summary.absorbable_sessions += 1;
        } else {
            summary.saturated_sessions += 1;
        }
    }

    Ok(summary)
}

fn send_task_handoff(
    db: &StateStore,
    from_session: &Session,
    to_session_id: &str,
    task: &str,
    routing_reason: &str,
) -> Result<()> {
    let context = format!(
        "Assigned by {} [{}] | cwd {}{} | {}",
        from_session.id,
        from_session.agent_type,
        from_session.working_dir.display(),
        from_session
            .worktree
            .as_ref()
            .map(|worktree| format!(
                " | worktree {} ({})",
                worktree.branch,
                worktree.path.display()
            ))
            .unwrap_or_default(),
        routing_reason
    );

    crate::comms::send(
        db,
        &from_session.id,
        to_session_id,
        &crate::comms::MessageType::TaskHandoff {
            task: task.to_string(),
            context,
        },
    )
}

fn extract_legacy_handoff_task(content: &str) -> Option<String> {
    let value: serde_json::Value = serde_json::from_str(content).ok()?;
    value
        .get("task")
        .and_then(|task| task.as_str())
        .map(ToOwned::to_owned)
}

async fn spawn_session_runner_for_program(
    task: &str,
    session_id: &str,
    agent_type: &str,
    working_dir: &Path,
    current_exe: &Path,
) -> Result<()> {
    let child = Command::new(current_exe)
        .arg("run-session")
        .arg("--session-id")
        .arg(session_id)
        .arg("--task")
        .arg(task)
        .arg("--agent")
        .arg(agent_type)
        .arg("--cwd")
        .arg(working_dir)
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn()
        .with_context(|| format!("Failed to spawn ECC runner from {}", current_exe.display()))?;

    child
        .id()
        .ok_or_else(|| anyhow::anyhow!("ECC runner did not expose a process id"))?;
    Ok(())
}

fn build_agent_command(
    agent_program: &Path,
    task: &str,
    session_id: &str,
    working_dir: &Path,
) -> Command {
    let mut command = Command::new(agent_program);
    command
        .arg("--print")
        .arg("--name")
        .arg(format!("ecc-{session_id}"))
        .arg(task)
        .current_dir(working_dir)
        .stdin(Stdio::null());
    command
}

async fn spawn_claude_code(
    agent_program: &Path,
    task: &str,
    session_id: &str,
    working_dir: &Path,
) -> Result<u32> {
    let mut command = build_agent_command(agent_program, task, session_id, working_dir);
    let child = command
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn()
        .with_context(|| {
            format!(
                "Failed to spawn Claude Code from {}",
                agent_program.display()
            )
        })?;

    child
        .id()
        .ok_or_else(|| anyhow::anyhow!("Claude Code did not expose a process id"))
}

async fn stop_session_with_options(
    db: &StateStore,
    id: &str,
    cleanup_worktree: bool,
) -> Result<()> {
    let session = resolve_session(db, id)?;

    if let Some(pid) = session.pid {
        kill_process(pid).await?;
    }

    db.update_pid(&session.id, None)?;
    db.update_state(&session.id, &SessionState::Stopped)?;

    if cleanup_worktree {
        if let Some(worktree) = session.worktree.as_ref() {
            crate::worktree::remove(worktree)?;
        }
    }

    Ok(())
}

#[cfg(unix)]
async fn kill_process(pid: u32) -> Result<()> {
    send_signal(pid, libc::SIGTERM)?;
    tokio::time::sleep(std::time::Duration::from_millis(1200)).await;
    send_signal(pid, libc::SIGKILL)?;
    Ok(())
}

#[cfg(unix)]
fn send_signal(pid: u32, signal: i32) -> Result<()> {
    let outcome = unsafe { libc::kill(pid as i32, signal) };
    if outcome == 0 {
        return Ok(());
    }

    let error = std::io::Error::last_os_error();
    if error.raw_os_error() == Some(libc::ESRCH) {
        return Ok(());
    }

    Err(error).with_context(|| format!("Failed to kill process {pid}"))
}

#[cfg(not(unix))]
async fn kill_process(pid: u32) -> Result<()> {
    let status = Command::new("taskkill")
        .args(["/F", "/PID", &pid.to_string()])
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .status()
        .await
        .with_context(|| format!("Failed to invoke taskkill for process {pid}"))?;

    if status.success() {
        Ok(())
    } else {
        anyhow::bail!("taskkill failed for process {pid}");
    }
}

pub struct SessionStatus {
    session: Session,
    parent_session: Option<String>,
    delegated_children: Vec<String>,
}

pub struct TeamStatus {
    root: Session,
    handoff_backlog: std::collections::HashMap<String, usize>,
    descendants: Vec<DelegatedSessionSummary>,
}

pub struct AssignmentOutcome {
    pub session_id: String,
    pub action: AssignmentAction,
}

pub struct InboxDrainOutcome {
    pub message_id: i64,
    pub task: String,
    pub session_id: String,
    pub action: AssignmentAction,
}

pub struct LeadDispatchOutcome {
    pub lead_session_id: String,
    pub unread_count: usize,
    pub routed: Vec<InboxDrainOutcome>,
}

pub struct RebalanceOutcome {
    pub from_session_id: String,
    pub message_id: i64,
    pub task: String,
    pub session_id: String,
    pub action: AssignmentAction,
}

pub struct LeadRebalanceOutcome {
    pub lead_session_id: String,
    pub rerouted: Vec<RebalanceOutcome>,
}

pub struct CoordinateBacklogOutcome {
    pub dispatched: Vec<LeadDispatchOutcome>,
    pub rebalanced: Vec<LeadRebalanceOutcome>,
    pub remaining_backlog_sessions: usize,
    pub remaining_backlog_messages: usize,
    pub remaining_absorbable_sessions: usize,
    pub remaining_saturated_sessions: usize,
}

#[derive(Debug, Clone, Serialize)]
pub struct CoordinationStatus {
    pub backlog_leads: usize,
    pub backlog_messages: usize,
    pub absorbable_sessions: usize,
    pub saturated_sessions: usize,
    pub mode: CoordinationMode,
    pub health: CoordinationHealth,
    pub operator_escalation_required: bool,
    pub auto_dispatch_enabled: bool,
    pub auto_dispatch_limit_per_session: usize,
    pub daemon_activity: super::store::DaemonActivity,
}

#[derive(Debug, Clone, Copy, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum CoordinationMode {
    DispatchFirst,
    DispatchFirstStabilized,
    RebalanceFirstChronicSaturation,
    RebalanceCooloffChronicSaturation,
}

#[derive(Debug, Clone, Copy, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum CoordinationHealth {
    Healthy,
    BacklogAbsorbable,
    Saturated,
    EscalationRequired,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AssignmentAction {
    Spawned,
    ReusedIdle,
    ReusedActive,
    DeferredSaturated,
}

pub fn assignment_action_routes_work(action: AssignmentAction) -> bool {
    !matches!(action, AssignmentAction::DeferredSaturated)
}

fn coordination_mode(activity: &super::store::DaemonActivity) -> CoordinationMode {
    if activity.dispatch_cooloff_active() {
        CoordinationMode::RebalanceCooloffChronicSaturation
    } else if activity.prefers_rebalance_first() {
        CoordinationMode::RebalanceFirstChronicSaturation
    } else if activity.stabilized_after_recovery_at().is_some() {
        CoordinationMode::DispatchFirstStabilized
    } else {
        CoordinationMode::DispatchFirst
    }
}

fn coordination_health(
    backlog_messages: usize,
    saturated_sessions: usize,
    activity: &super::store::DaemonActivity,
) -> CoordinationHealth {
    if activity.operator_escalation_required() {
        CoordinationHealth::EscalationRequired
    } else if saturated_sessions > 0 {
        CoordinationHealth::Saturated
    } else if backlog_messages > 0 {
        CoordinationHealth::BacklogAbsorbable
    } else {
        CoordinationHealth::Healthy
    }
}

pub fn get_coordination_status(db: &StateStore, cfg: &Config) -> Result<CoordinationStatus> {
    let targets = db.unread_task_handoff_targets(db.list_sessions()?.len().max(1))?;
    let pressure = summarize_backlog_pressure(db, cfg, &cfg.default_agent, &targets)?;
    let backlog_messages = targets
        .iter()
        .map(|(_, unread_count)| *unread_count)
        .sum::<usize>();
    let daemon_activity = db.daemon_activity()?;

    Ok(CoordinationStatus {
        backlog_leads: targets.len(),
        backlog_messages,
        absorbable_sessions: pressure.absorbable_sessions,
        saturated_sessions: pressure.saturated_sessions,
        mode: coordination_mode(&daemon_activity),
        health: coordination_health(
            backlog_messages,
            pressure.saturated_sessions,
            &daemon_activity,
        ),
        operator_escalation_required: daemon_activity.operator_escalation_required(),
        auto_dispatch_enabled: cfg.auto_dispatch_unread_handoffs,
        auto_dispatch_limit_per_session: cfg.auto_dispatch_limit_per_session,
        daemon_activity,
    })
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
struct BacklogPressureSummary {
    absorbable_sessions: usize,
    saturated_sessions: usize,
}

struct DelegatedSessionSummary {
    depth: usize,
    handoff_backlog: usize,
    session: Session,
}

impl fmt::Display for SessionStatus {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = &self.session;
        writeln!(f, "Session: {}", s.id)?;
        writeln!(f, "Task:    {}", s.task)?;
        writeln!(f, "Agent:   {}", s.agent_type)?;
        writeln!(f, "State:   {}", s.state)?;
        if let Some(parent) = self.parent_session.as_ref() {
            writeln!(f, "Parent:  {}", parent)?;
        }
        if let Some(pid) = s.pid {
            writeln!(f, "PID:     {}", pid)?;
        }
        if let Some(ref wt) = s.worktree {
            writeln!(f, "Branch:  {}", wt.branch)?;
            writeln!(f, "Worktree: {}", wt.path.display())?;
        }
        writeln!(f, "Tokens:  {}", s.metrics.tokens_used)?;
        writeln!(f, "Tools:   {}", s.metrics.tool_calls)?;
        writeln!(f, "Files:   {}", s.metrics.files_changed)?;
        writeln!(f, "Cost:    ${:.4}", s.metrics.cost_usd)?;
        if !self.delegated_children.is_empty() {
            writeln!(f, "Children: {}", self.delegated_children.join(", "))?;
        }
        writeln!(f, "Created: {}", s.created_at)?;
        write!(f, "Updated: {}", s.updated_at)
    }
}

impl fmt::Display for TeamStatus {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        writeln!(f, "Lead:    {} [{}]", self.root.id, self.root.state)?;
        writeln!(f, "Task:    {}", self.root.task)?;
        writeln!(f, "Agent:   {}", self.root.agent_type)?;
        if let Some(worktree) = self.root.worktree.as_ref() {
            writeln!(f, "Branch:  {}", worktree.branch)?;
        }

        let lead_handoff_backlog = self
            .handoff_backlog
            .get(&self.root.id)
            .copied()
            .unwrap_or(0);
        writeln!(f, "Backlog: {}", lead_handoff_backlog)?;

        if self.descendants.is_empty() {
            return write!(f, "Board:   no delegated sessions");
        }

        writeln!(f, "Board:")?;
        let mut lanes: BTreeMap<&'static str, Vec<&DelegatedSessionSummary>> = BTreeMap::new();
        for summary in &self.descendants {
            lanes
                .entry(session_state_label(&summary.session.state))
                .or_default()
                .push(summary);
        }

        for lane in [
            "Running",
            "Idle",
            "Pending",
            "Failed",
            "Stopped",
            "Completed",
        ] {
            let Some(items) = lanes.get(lane) else {
                continue;
            };

            writeln!(f, "  {lane}:")?;
            for item in items {
                writeln!(
                    f,
                    "    - {}{} [{}] | backlog {} handoff(s) | {}",
                    "  ".repeat(item.depth.saturating_sub(1)),
                    item.session.id,
                    item.session.agent_type,
                    item.handoff_backlog,
                    item.session.task
                )?;
            }
        }

        Ok(())
    }
}

impl fmt::Display for CoordinationStatus {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let stabilized = self.daemon_activity.stabilized_after_recovery_at();
        let mode = match self.mode {
            CoordinationMode::DispatchFirst => "dispatch-first",
            CoordinationMode::DispatchFirstStabilized => "dispatch-first (stabilized)",
            CoordinationMode::RebalanceFirstChronicSaturation => {
                "rebalance-first (chronic saturation)"
            }
            CoordinationMode::RebalanceCooloffChronicSaturation => {
                "rebalance-cooloff (chronic saturation)"
            }
        };

        writeln!(
            f,
            "Global handoff backlog: {} lead(s) / {} handoff(s) [{} absorbable, {} saturated]",
            self.backlog_leads,
            self.backlog_messages,
            self.absorbable_sessions,
            self.saturated_sessions
        )?;
        writeln!(
            f,
            "Auto-dispatch: {} @ {}/lead",
            if self.auto_dispatch_enabled {
                "on"
            } else {
                "off"
            },
            self.auto_dispatch_limit_per_session
        )?;
        writeln!(f, "Coordination mode: {mode}")?;

        if self.daemon_activity.chronic_saturation_streak > 0 {
            writeln!(
                f,
                "Chronic saturation streak: {} cycle(s)",
                self.daemon_activity.chronic_saturation_streak
            )?;
        }

        if self.operator_escalation_required {
            writeln!(f, "Operator escalation: chronic saturation is not clearing")?;
        }

        if let Some(cleared_at) = self.daemon_activity.chronic_saturation_cleared_at() {
            writeln!(f, "Chronic saturation cleared: {}", cleared_at.to_rfc3339())?;
        }

        if let Some(stabilized_at) = stabilized {
            writeln!(f, "Recovery stabilized: {}", stabilized_at.to_rfc3339())?;
        }

        if let Some(last_dispatch_at) = self.daemon_activity.last_dispatch_at.as_ref() {
            writeln!(
                f,
                "Last daemon dispatch: {} routed / {} deferred across {} lead(s) @ {}",
                self.daemon_activity.last_dispatch_routed,
                self.daemon_activity.last_dispatch_deferred,
                self.daemon_activity.last_dispatch_leads,
                last_dispatch_at.to_rfc3339()
            )?;
        }

        if stabilized.is_none() {
            if let Some(last_recovery_dispatch_at) =
                self.daemon_activity.last_recovery_dispatch_at.as_ref()
            {
                writeln!(
                    f,
                    "Last daemon recovery dispatch: {} handoff(s) across {} lead(s) @ {}",
                    self.daemon_activity.last_recovery_dispatch_routed,
                    self.daemon_activity.last_recovery_dispatch_leads,
                    last_recovery_dispatch_at.to_rfc3339()
                )?;
            }

            if let Some(last_rebalance_at) = self.daemon_activity.last_rebalance_at.as_ref() {
                writeln!(
                    f,
                    "Last daemon rebalance: {} handoff(s) across {} lead(s) @ {}",
                    self.daemon_activity.last_rebalance_rerouted,
                    self.daemon_activity.last_rebalance_leads,
                    last_rebalance_at.to_rfc3339()
                )?;
            }
        }

        if let Some(last_auto_merge_at) = self.daemon_activity.last_auto_merge_at.as_ref() {
            writeln!(
                f,
                "Last daemon auto-merge: {} merged / {} active / {} conflicted / {} dirty / {} failed @ {}",
                self.daemon_activity.last_auto_merge_merged,
                self.daemon_activity.last_auto_merge_active_skipped,
                self.daemon_activity.last_auto_merge_conflicted_skipped,
                self.daemon_activity.last_auto_merge_dirty_skipped,
                self.daemon_activity.last_auto_merge_failed,
                last_auto_merge_at.to_rfc3339()
            )?;
        }

        if let Some(last_auto_prune_at) = self.daemon_activity.last_auto_prune_at.as_ref() {
            writeln!(
                f,
                "Last daemon auto-prune: {} pruned / {} active @ {}",
                self.daemon_activity.last_auto_prune_pruned,
                self.daemon_activity.last_auto_prune_active_skipped,
                last_auto_prune_at.to_rfc3339()
            )?;
        }

        Ok(())
    }
}

fn session_state_label(state: &SessionState) -> &'static str {
    match state {
        SessionState::Pending => "Pending",
        SessionState::Running => "Running",
        SessionState::Idle => "Idle",
        SessionState::Completed => "Completed",
        SessionState::Failed => "Failed",
        SessionState::Stopped => "Stopped",
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::config::{Config, PaneLayout, Theme};
    use crate::session::{Session, SessionMetrics, SessionState};
    use anyhow::{Context, Result};
    use chrono::{Duration, Utc};
    use std::fs;
    use std::os::unix::fs::PermissionsExt;
    use std::path::{Path, PathBuf};
    use std::process::Command as StdCommand;
    use std::thread;
    use std::time::Duration as StdDuration;

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

    fn build_config(root: &Path) -> Config {
        Config {
            db_path: root.join("state.db"),
            worktree_root: root.join("worktrees"),
            max_parallel_sessions: 4,
            max_parallel_worktrees: 4,
            session_timeout_secs: 60,
            heartbeat_interval_secs: 5,
            default_agent: "claude".to_string(),
            auto_dispatch_unread_handoffs: false,
            auto_dispatch_limit_per_session: 5,
            auto_create_worktrees: true,
            auto_merge_ready_worktrees: false,
            cost_budget_usd: 10.0,
            token_budget: 500_000,
            theme: Theme::Dark,
            pane_layout: PaneLayout::Horizontal,
            risk_thresholds: Config::RISK_THRESHOLDS,
        }
    }

    fn build_session(id: &str, state: SessionState, updated_at: chrono::DateTime<Utc>) -> Session {
        Session {
            id: id.to_string(),
            task: format!("task-{id}"),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state,
            pid: None,
            worktree: None,
            created_at: updated_at - Duration::minutes(1),
            updated_at,
            metrics: SessionMetrics::default(),
        }
    }

    fn build_daemon_activity() -> super::super::store::DaemonActivity {
        let now = Utc::now();
        super::super::store::DaemonActivity {
            last_dispatch_at: Some(now),
            last_dispatch_routed: 3,
            last_dispatch_deferred: 1,
            last_dispatch_leads: 2,
            chronic_saturation_streak: 2,
            last_recovery_dispatch_at: Some(now - Duration::seconds(5)),
            last_recovery_dispatch_routed: 2,
            last_recovery_dispatch_leads: 1,
            last_rebalance_at: Some(now - Duration::seconds(2)),
            last_rebalance_rerouted: 0,
            last_rebalance_leads: 1,
            last_auto_merge_at: Some(now - Duration::seconds(1)),
            last_auto_merge_merged: 1,
            last_auto_merge_active_skipped: 1,
            last_auto_merge_conflicted_skipped: 0,
            last_auto_merge_dirty_skipped: 0,
            last_auto_merge_failed: 0,
            last_auto_prune_at: Some(now),
            last_auto_prune_pruned: 2,
            last_auto_prune_active_skipped: 1,
        }
    }

    fn init_git_repo(path: &Path) -> Result<()> {
        fs::create_dir_all(path)?;
        run_git(path, ["init", "-q"])?;
        run_git(path, ["config", "user.name", "ECC Tests"])?;
        run_git(path, ["config", "user.email", "ecc-tests@example.com"])?;
        fs::write(path.join("README.md"), "hello\n")?;
        run_git(path, ["add", "README.md"])?;
        run_git(path, ["commit", "-qm", "init"])?;
        Ok(())
    }

    fn run_git<const N: usize>(path: &Path, args: [&str; N]) -> Result<()> {
        let status = StdCommand::new("git")
            .args(args)
            .current_dir(path)
            .status()
            .with_context(|| format!("failed to run git in {}", path.display()))?;

        if !status.success() {
            anyhow::bail!("git command failed in {}", path.display());
        }

        Ok(())
    }

    fn write_fake_claude(root: &Path) -> Result<(PathBuf, PathBuf)> {
        let script_path = root.join("fake-claude.sh");
        let log_path = root.join("fake-claude.log");
        let script = format!(
            "#!/usr/bin/env python3\nimport os\nimport pathlib\nimport signal\nimport sys\nimport time\n\nlog_path = pathlib.Path(r\"{}\")\nlog_path.write_text(os.getcwd() + \"\\n\", encoding=\"utf-8\")\nwith log_path.open(\"a\", encoding=\"utf-8\") as handle:\n    handle.write(\" \".join(sys.argv[1:]) + \"\\n\")\n\ndef handle_term(signum, frame):\n    raise SystemExit(0)\n\nsignal.signal(signal.SIGTERM, handle_term)\nwhile True:\n    time.sleep(0.1)\n",
            log_path.display()
        );

        fs::write(&script_path, script)?;
        let mut permissions = fs::metadata(&script_path)?.permissions();
        permissions.set_mode(0o755);
        fs::set_permissions(&script_path, permissions)?;

        Ok((script_path, log_path))
    }

    fn wait_for_file(path: &Path) -> Result<String> {
        for _ in 0..200 {
            if path.exists() {
                let content = fs::read_to_string(path)
                    .with_context(|| format!("failed to read {}", path.display()))?;
                if content.lines().count() >= 2 {
                    return Ok(content);
                }
            }

            thread::sleep(StdDuration::from_millis(20));
        }

        anyhow::bail!("timed out waiting for {}", path.display());
    }

    #[tokio::test(flavor = "current_thread")]
    async fn create_session_spawns_process_and_marks_session_running() -> Result<()> {
        let tempdir = TestDir::new("manager-create-session")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let (fake_claude, log_path) = write_fake_claude(tempdir.path())?;

        let session_id = create_session_in_dir(
            &db,
            &cfg,
            "implement lifecycle",
            "claude",
            false,
            &repo_root,
            &fake_claude,
        )
        .await?;

        let session = db
            .get_session(&session_id)?
            .context("session should exist")?;
        assert_eq!(session.state, SessionState::Running);
        assert!(
            session.pid.is_some(),
            "spawned session should persist a pid"
        );

        let log = wait_for_file(&log_path)?;
        assert!(log.contains(repo_root.to_string_lossy().as_ref()));
        assert!(log.contains("--print"));
        assert!(log.contains("implement lifecycle"));

        stop_session_with_options(&db, &session_id, false).await?;
        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn stop_session_kills_process_and_optionally_cleans_worktree() -> Result<()> {
        let tempdir = TestDir::new("manager-stop-session")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let (fake_claude, _) = write_fake_claude(tempdir.path())?;

        let keep_id = create_session_in_dir(
            &db,
            &cfg,
            "keep worktree",
            "claude",
            true,
            &repo_root,
            &fake_claude,
        )
        .await?;
        let keep_session = db.get_session(&keep_id)?.context("keep session missing")?;
        keep_session.pid.context("keep session pid missing")?;
        let keep_worktree = keep_session
            .worktree
            .clone()
            .context("keep session worktree missing")?
            .path;

        stop_session_with_options(&db, &keep_id, false).await?;

        let stopped_keep = db
            .get_session(&keep_id)?
            .context("stopped keep session missing")?;
        assert_eq!(stopped_keep.state, SessionState::Stopped);
        assert_eq!(stopped_keep.pid, None);
        assert!(
            keep_worktree.exists(),
            "worktree should remain when cleanup is disabled"
        );

        let cleanup_id = create_session_in_dir(
            &db,
            &cfg,
            "cleanup worktree",
            "claude",
            true,
            &repo_root,
            &fake_claude,
        )
        .await?;
        let cleanup_session = db
            .get_session(&cleanup_id)?
            .context("cleanup session missing")?;
        let cleanup_worktree = cleanup_session
            .worktree
            .clone()
            .context("cleanup session worktree missing")?
            .path;

        stop_session_with_options(&db, &cleanup_id, true).await?;
        assert!(
            !cleanup_worktree.exists(),
            "worktree should be removed when cleanup is enabled"
        );

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn resume_session_requeues_failed_session() -> Result<()> {
        let tempdir = TestDir::new("manager-resume-session")?;
        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "deadbeef".to_string(),
            task: "resume previous task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: tempdir.path().join("resume-working-dir"),
            state: SessionState::Failed,
            pid: Some(31337),
            worktree: None,
            created_at: now - Duration::minutes(1),
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        fs::create_dir_all(tempdir.path().join("resume-working-dir"))?;
        let (fake_claude, log_path) = write_fake_claude(tempdir.path())?;

        let resumed_id = resume_session_with_program(&db, "deadbeef", Some(&fake_claude)).await?;
        let resumed = db
            .get_session(&resumed_id)?
            .context("resumed session should exist")?;

        assert_eq!(resumed.state, SessionState::Pending);
        assert_eq!(resumed.pid, None);

        let log = wait_for_file(&log_path)?;
        assert!(log.contains("run-session"));
        assert!(log.contains("--session-id"));
        assert!(log.contains("deadbeef"));
        assert!(log.contains("resume previous task"));
        assert!(log.contains(
            tempdir
                .path()
                .join("resume-working-dir")
                .to_string_lossy()
                .as_ref()
        ));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn cleanup_session_worktree_removes_path_and_clears_metadata() -> Result<()> {
        let tempdir = TestDir::new("manager-cleanup-worktree")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let (fake_claude, _) = write_fake_claude(tempdir.path())?;

        let session_id = create_session_in_dir(
            &db,
            &cfg,
            "cleanup later",
            "claude",
            true,
            &repo_root,
            &fake_claude,
        )
        .await?;

        stop_session_with_options(&db, &session_id, false).await?;
        let stopped = db
            .get_session(&session_id)?
            .context("stopped session should exist")?;
        let worktree_path = stopped
            .worktree
            .clone()
            .context("stopped session worktree missing")?
            .path;
        assert!(
            worktree_path.exists(),
            "worktree should still exist before cleanup"
        );

        cleanup_session_worktree(&db, &session_id).await?;

        let cleaned = db
            .get_session(&session_id)?
            .context("cleaned session should still exist")?;
        assert!(
            cleaned.worktree.is_none(),
            "worktree metadata should be cleared"
        );
        assert!(!worktree_path.exists(), "worktree path should be removed");

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn prune_inactive_worktrees_cleans_stopped_sessions_only() -> Result<()> {
        let tempdir = TestDir::new("manager-prune-worktrees")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let (fake_claude, _) = write_fake_claude(tempdir.path())?;

        let active_id = create_session_in_dir(
            &db,
            &cfg,
            "active worktree",
            "claude",
            true,
            &repo_root,
            &fake_claude,
        )
        .await?;
        let stopped_id = create_session_in_dir(
            &db,
            &cfg,
            "stopped worktree",
            "claude",
            true,
            &repo_root,
            &fake_claude,
        )
        .await?;

        stop_session_with_options(&db, &stopped_id, false).await?;

        let active_before = db
            .get_session(&active_id)?
            .context("active session should exist")?;
        let active_path = active_before
            .worktree
            .clone()
            .context("active session worktree missing")?
            .path;

        let stopped_before = db
            .get_session(&stopped_id)?
            .context("stopped session should exist")?;
        let stopped_path = stopped_before
            .worktree
            .clone()
            .context("stopped session worktree missing")?
            .path;

        let outcome = prune_inactive_worktrees(&db).await?;

        assert_eq!(outcome.cleaned_session_ids, vec![stopped_id.clone()]);
        assert_eq!(outcome.active_with_worktree_ids, vec![active_id.clone()]);
        assert!(active_path.exists(), "active worktree should remain");
        assert!(!stopped_path.exists(), "stopped worktree should be removed");

        let active_after = db
            .get_session(&active_id)?
            .context("active session should still exist")?;
        assert!(
            active_after.worktree.is_some(),
            "active session should keep worktree metadata"
        );

        let stopped_after = db
            .get_session(&stopped_id)?
            .context("stopped session should still exist")?;
        assert!(
            stopped_after.worktree.is_none(),
            "stopped session worktree metadata should be cleared"
        );

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn merge_session_worktree_merges_branch_and_cleans_worktree() -> Result<()> {
        let tempdir = TestDir::new("manager-merge-worktree")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let (fake_claude, _) = write_fake_claude(tempdir.path())?;

        let session_id = create_session_in_dir(
            &db,
            &cfg,
            "merge later",
            "claude",
            true,
            &repo_root,
            &fake_claude,
        )
        .await?;

        stop_session_with_options(&db, &session_id, false).await?;
        let stopped = db
            .get_session(&session_id)?
            .context("stopped session should exist")?;
        let worktree = stopped
            .worktree
            .clone()
            .context("stopped session worktree missing")?;

        fs::write(worktree.path.join("feature.txt"), "ready to merge\n")?;
        run_git(&worktree.path, ["add", "feature.txt"])?;
        run_git(&worktree.path, ["commit", "-qm", "feature work"])?;

        let outcome = merge_session_worktree(&db, &session_id, true).await?;

        assert_eq!(outcome.session_id, session_id);
        assert_eq!(outcome.branch, worktree.branch);
        assert_eq!(outcome.base_branch, worktree.base_branch);
        assert!(outcome.cleaned_worktree);
        assert!(!outcome.already_up_to_date);
        assert_eq!(
            fs::read_to_string(repo_root.join("feature.txt"))?,
            "ready to merge\n"
        );

        let merged = db
            .get_session(&outcome.session_id)?
            .context("merged session should still exist")?;
        assert!(
            merged.worktree.is_none(),
            "worktree metadata should be cleared"
        );
        assert!(!worktree.path.exists(), "worktree path should be removed");

        let branch_output = StdCommand::new("git")
            .arg("-C")
            .arg(&repo_root)
            .args(["branch", "--list", &worktree.branch])
            .output()?;
        assert!(
            String::from_utf8_lossy(&branch_output.stdout)
                .trim()
                .is_empty(),
            "merged worktree branch should be deleted"
        );

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn merge_ready_worktrees_merges_ready_sessions_and_skips_active_and_dirty() -> Result<()>
    {
        let tempdir = TestDir::new("manager-merge-ready-worktrees")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        let merged_worktree =
            crate::worktree::create_for_session_in_repo("merge-ready", &cfg, &repo_root)?;
        fs::write(merged_worktree.path.join("merged.txt"), "bulk merge\n")?;
        run_git(&merged_worktree.path, ["add", "merged.txt"])?;
        run_git(&merged_worktree.path, ["commit", "-qm", "merge ready"])?;
        db.insert_session(&Session {
            id: "merge-ready".to_string(),
            task: "merge me".to_string(),
            agent_type: "claude".to_string(),
            working_dir: merged_worktree.path.clone(),
            state: SessionState::Completed,
            pid: None,
            worktree: Some(merged_worktree.clone()),
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let active_worktree =
            crate::worktree::create_for_session_in_repo("active-worktree", &cfg, &repo_root)?;
        db.insert_session(&Session {
            id: "active-worktree".to_string(),
            task: "still running".to_string(),
            agent_type: "claude".to_string(),
            working_dir: active_worktree.path.clone(),
            state: SessionState::Running,
            pid: Some(12345),
            worktree: Some(active_worktree.clone()),
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dirty_worktree =
            crate::worktree::create_for_session_in_repo("dirty-worktree", &cfg, &repo_root)?;
        fs::write(dirty_worktree.path.join("dirty.txt"), "not committed yet\n")?;
        db.insert_session(&Session {
            id: "dirty-worktree".to_string(),
            task: "needs commit".to_string(),
            agent_type: "claude".to_string(),
            working_dir: dirty_worktree.path.clone(),
            state: SessionState::Stopped,
            pid: None,
            worktree: Some(dirty_worktree.clone()),
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let outcome = merge_ready_worktrees(&db, true).await?;

        assert_eq!(outcome.merged.len(), 1);
        assert_eq!(outcome.merged[0].session_id, "merge-ready");
        assert_eq!(
            outcome.active_with_worktree_ids,
            vec!["active-worktree".to_string()]
        );
        assert_eq!(
            outcome.dirty_worktree_ids,
            vec!["dirty-worktree".to_string()]
        );
        assert!(outcome.conflicted_session_ids.is_empty());
        assert!(outcome.failures.is_empty());

        assert_eq!(
            fs::read_to_string(repo_root.join("merged.txt"))?,
            "bulk merge\n"
        );
        assert!(db
            .get_session("merge-ready")?
            .context("merged session should still exist")?
            .worktree
            .is_none());
        assert!(db
            .get_session("active-worktree")?
            .context("active session should still exist")?
            .worktree
            .is_some());
        assert!(db
            .get_session("dirty-worktree")?
            .context("dirty session should still exist")?
            .worktree
            .is_some());
        assert!(!merged_worktree.path.exists());
        assert!(active_worktree.path.exists());
        assert!(dirty_worktree.path.exists());

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn delete_session_removes_inactive_session_and_worktree() -> Result<()> {
        let tempdir = TestDir::new("manager-delete-session")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let (fake_claude, _) = write_fake_claude(tempdir.path())?;

        let session_id = create_session_in_dir(
            &db,
            &cfg,
            "delete later",
            "claude",
            true,
            &repo_root,
            &fake_claude,
        )
        .await?;

        stop_session_with_options(&db, &session_id, false).await?;
        let stopped = db
            .get_session(&session_id)?
            .context("stopped session should exist")?;
        let worktree_path = stopped
            .worktree
            .clone()
            .context("stopped session worktree missing")?
            .path;

        delete_session(&db, &session_id).await?;

        assert!(
            db.get_session(&session_id)?.is_none(),
            "session should be deleted"
        );
        assert!(!worktree_path.exists(), "worktree path should be removed");

        Ok(())
    }

    #[test]
    fn get_status_supports_latest_alias() -> Result<()> {
        let tempdir = TestDir::new("manager-latest-status")?;
        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let older = Utc::now() - Duration::minutes(2);
        let newer = Utc::now();

        db.insert_session(&build_session("older", SessionState::Running, older))?;
        db.insert_session(&build_session("newer", SessionState::Idle, newer))?;

        let status = get_status(&db, "latest")?;
        assert_eq!(status.session.id, "newer");

        Ok(())
    }

    #[test]
    fn get_status_surfaces_handoff_lineage() -> Result<()> {
        let tempdir = TestDir::new("manager-status-lineage")?;
        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&build_session(
            "parent",
            SessionState::Running,
            now - Duration::minutes(2),
        ))?;
        db.insert_session(&build_session(
            "child",
            SessionState::Pending,
            now - Duration::minutes(1),
        ))?;
        db.insert_session(&build_session("sibling", SessionState::Idle, now))?;

        db.send_message(
            "parent",
            "child",
            "{\"task\":\"Review auth flow\",\"context\":\"Delegated from parent\"}",
            "task_handoff",
        )?;
        db.send_message(
            "parent",
            "sibling",
            "{\"task\":\"Check billing\",\"context\":\"Delegated from parent\"}",
            "task_handoff",
        )?;

        let status = get_status(&db, "parent")?;
        let rendered = status.to_string();

        assert!(rendered.contains("Children:"));
        assert!(rendered.contains("child"));
        assert!(rendered.contains("sibling"));

        let child_status = get_status(&db, "child")?;
        assert_eq!(child_status.parent_session.as_deref(), Some("parent"));

        Ok(())
    }

    #[test]
    fn get_team_status_groups_delegated_children() -> Result<()> {
        let tempdir = TestDir::new("manager-team-status")?;
        let _cfg = build_config(tempdir.path());
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let now = Utc::now();

        db.insert_session(&build_session(
            "lead",
            SessionState::Running,
            now - Duration::minutes(3),
        ))?;
        db.insert_session(&build_session(
            "worker-a",
            SessionState::Running,
            now - Duration::minutes(2),
        ))?;
        db.insert_session(&build_session(
            "worker-b",
            SessionState::Pending,
            now - Duration::minutes(1),
        ))?;
        db.insert_session(&build_session("reviewer", SessionState::Completed, now))?;

        db.send_message(
            "lead",
            "worker-a",
            "{\"task\":\"Implement auth\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;
        db.send_message(
            "lead",
            "worker-b",
            "{\"task\":\"Check billing\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;
        db.send_message(
            "worker-a",
            "reviewer",
            "{\"task\":\"Review auth\",\"context\":\"Delegated from worker-a\"}",
            "task_handoff",
        )?;

        let team = get_team_status(&db, "lead", 2)?;
        let rendered = team.to_string();

        assert!(rendered.contains("Lead:    lead [running]"));
        assert!(rendered.contains("Running:"));
        assert!(rendered.contains("Pending:"));
        assert!(rendered.contains("Completed:"));
        assert!(rendered.contains("worker-a"));
        assert!(rendered.contains("worker-b"));
        assert!(rendered.contains("reviewer"));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn assign_session_reuses_idle_delegate_when_available() -> Result<()> {
        let tempdir = TestDir::new("manager-assign-reuse-idle")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead".to_string(),
            task: "lead task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(2),
            updated_at: now - Duration::minutes(2),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "idle-worker".to_string(),
            task: "old worker task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Idle,
            pid: Some(99),
            worktree: None,
            created_at: now - Duration::minutes(1),
            updated_at: now - Duration::minutes(1),
            metrics: SessionMetrics::default(),
        })?;
        db.send_message(
            "lead",
            "idle-worker",
            "{\"task\":\"old worker task\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;
        db.mark_messages_read("idle-worker")?;

        let (fake_runner, _) = write_fake_claude(tempdir.path())?;
        let outcome = assign_session_in_dir_with_runner_program(
            &db,
            &cfg,
            "lead",
            "Review billing edge cases",
            "claude",
            true,
            &repo_root,
            &fake_runner,
        )
        .await?;

        assert_eq!(outcome.session_id, "idle-worker");
        assert_eq!(outcome.action, AssignmentAction::ReusedIdle);

        let messages = db.list_messages_for_session("idle-worker", 10)?;
        assert!(messages.iter().any(|message| {
            message.msg_type == "task_handoff"
                && message.content.contains("Review billing edge cases")
        }));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn assign_session_spawns_instead_of_reusing_backed_up_idle_delegate() -> Result<()> {
        let tempdir = TestDir::new("manager-assign-spawn-backed-up-idle")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead".to_string(),
            task: "lead task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(3),
            updated_at: now - Duration::minutes(3),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "idle-worker".to_string(),
            task: "old worker task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Idle,
            pid: Some(99),
            worktree: None,
            created_at: now - Duration::minutes(2),
            updated_at: now - Duration::minutes(2),
            metrics: SessionMetrics::default(),
        })?;
        db.send_message(
            "lead",
            "idle-worker",
            "{\"task\":\"old worker task\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;

        let (fake_runner, _) = write_fake_claude(tempdir.path())?;
        let outcome = assign_session_in_dir_with_runner_program(
            &db,
            &cfg,
            "lead",
            "Fresh delegated task",
            "claude",
            true,
            &repo_root,
            &fake_runner,
        )
        .await?;

        assert_eq!(outcome.action, AssignmentAction::Spawned);
        assert_ne!(outcome.session_id, "idle-worker");

        let idle_messages = db.list_messages_for_session("idle-worker", 10)?;
        let fresh_assignments = idle_messages
            .iter()
            .filter(|message| {
                message.msg_type == "task_handoff"
                    && message.content.contains("Fresh delegated task")
            })
            .count();
        assert_eq!(fresh_assignments, 0);

        let spawned_messages = db.list_messages_for_session(&outcome.session_id, 10)?;
        assert!(spawned_messages.iter().any(|message| {
            message.msg_type == "task_handoff" && message.content.contains("Fresh delegated task")
        }));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn assign_session_reuses_idle_delegate_when_only_non_handoff_messages_are_unread(
    ) -> Result<()> {
        let tempdir = TestDir::new("manager-assign-reuse-idle-info-inbox")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead".to_string(),
            task: "lead task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(3),
            updated_at: now - Duration::minutes(3),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "idle-worker".to_string(),
            task: "old worker task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Idle,
            pid: Some(99),
            worktree: None,
            created_at: now - Duration::minutes(2),
            updated_at: now - Duration::minutes(2),
            metrics: SessionMetrics::default(),
        })?;
        db.send_message(
            "lead",
            "idle-worker",
            "{\"task\":\"old worker task\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;
        db.mark_messages_read("idle-worker")?;
        db.send_message("lead", "idle-worker", "FYI status update", "info")?;

        let (fake_runner, _) = write_fake_claude(tempdir.path())?;
        let outcome = assign_session_in_dir_with_runner_program(
            &db,
            &cfg,
            "lead",
            "Fresh delegated task",
            "claude",
            true,
            &repo_root,
            &fake_runner,
        )
        .await?;

        assert_eq!(outcome.action, AssignmentAction::ReusedIdle);
        assert_eq!(outcome.session_id, "idle-worker");

        let idle_messages = db.list_messages_for_session("idle-worker", 10)?;
        assert!(idle_messages.iter().any(|message| {
            message.msg_type == "task_handoff" && message.content.contains("Fresh delegated task")
        }));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn assign_session_spawns_when_team_has_capacity() -> Result<()> {
        let tempdir = TestDir::new("manager-assign-spawn")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead".to_string(),
            task: "lead task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(3),
            updated_at: now - Duration::minutes(3),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "busy-worker".to_string(),
            task: "existing work".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(55),
            worktree: None,
            created_at: now - Duration::minutes(2),
            updated_at: now - Duration::minutes(2),
            metrics: SessionMetrics::default(),
        })?;
        db.send_message(
            "lead",
            "busy-worker",
            "{\"task\":\"existing work\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;

        let (fake_runner, _) = write_fake_claude(tempdir.path())?;
        let outcome = assign_session_in_dir_with_runner_program(
            &db,
            &cfg,
            "lead",
            "New delegated task",
            "claude",
            true,
            &repo_root,
            &fake_runner,
        )
        .await?;

        assert_eq!(outcome.action, AssignmentAction::Spawned);
        assert_ne!(outcome.session_id, "busy-worker");

        let spawned = db
            .get_session(&outcome.session_id)?
            .context("spawned delegated session missing")?;
        assert_eq!(spawned.state, SessionState::Pending);

        let messages = db.list_messages_for_session(&outcome.session_id, 10)?;
        assert!(messages.iter().any(|message| {
            message.msg_type == "task_handoff" && message.content.contains("New delegated task")
        }));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn assign_session_defers_when_team_is_saturated() -> Result<()> {
        let tempdir = TestDir::new("manager-assign-defer-saturated")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let mut cfg = build_config(tempdir.path());
        cfg.max_parallel_sessions = 1;
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead".to_string(),
            task: "lead task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(3),
            updated_at: now - Duration::minutes(3),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "busy-worker".to_string(),
            task: "existing work".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(55),
            worktree: None,
            created_at: now - Duration::minutes(2),
            updated_at: now - Duration::minutes(2),
            metrics: SessionMetrics::default(),
        })?;
        db.send_message(
            "lead",
            "busy-worker",
            "{\"task\":\"existing work\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;

        let (fake_runner, _) = write_fake_claude(tempdir.path())?;
        let outcome = assign_session_in_dir_with_runner_program(
            &db,
            &cfg,
            "lead",
            "New delegated task",
            "claude",
            true,
            &repo_root,
            &fake_runner,
        )
        .await?;

        assert_eq!(outcome.action, AssignmentAction::DeferredSaturated);
        assert_eq!(outcome.session_id, "lead");

        let busy_messages = db.list_messages_for_session("busy-worker", 10)?;
        assert!(!busy_messages.iter().any(|message| {
            message.msg_type == "task_handoff" && message.content.contains("New delegated task")
        }));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn drain_inbox_routes_unread_task_handoffs_and_marks_them_read() -> Result<()> {
        let tempdir = TestDir::new("manager-drain-inbox")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead".to_string(),
            task: "lead task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(3),
            updated_at: now - Duration::minutes(3),
            metrics: SessionMetrics::default(),
        })?;

        db.send_message(
            "planner",
            "lead",
            "{\"task\":\"Review auth changes\",\"context\":\"Inbound request\"}",
            "task_handoff",
        )?;

        let outcomes = drain_inbox(&db, &cfg, "lead", "claude", true, 5).await?;
        assert_eq!(outcomes.len(), 1);
        assert_eq!(outcomes[0].task, "Review auth changes");
        assert_eq!(outcomes[0].action, AssignmentAction::Spawned);

        let unread = db.unread_message_counts()?;
        assert_eq!(unread.get("lead"), None);

        let messages = db.list_messages_for_session(&outcomes[0].session_id, 10)?;
        assert!(messages.iter().any(|message| {
            message.msg_type == "task_handoff" && message.content.contains("Review auth changes")
        }));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn drain_inbox_leaves_saturated_handoffs_unread() -> Result<()> {
        let tempdir = TestDir::new("manager-drain-inbox-defer")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let mut cfg = build_config(tempdir.path());
        cfg.max_parallel_sessions = 1;
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead".to_string(),
            task: "lead task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(3),
            updated_at: now - Duration::minutes(3),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "busy-worker".to_string(),
            task: "existing work".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(55),
            worktree: None,
            created_at: now - Duration::minutes(2),
            updated_at: now - Duration::minutes(2),
            metrics: SessionMetrics::default(),
        })?;
        db.send_message(
            "lead",
            "busy-worker",
            "{\"task\":\"existing work\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;
        db.send_message(
            "planner",
            "lead",
            "{\"task\":\"Review auth changes\",\"context\":\"Inbound request\"}",
            "task_handoff",
        )?;

        let outcomes = drain_inbox(&db, &cfg, "lead", "claude", true, 5).await?;
        assert_eq!(outcomes.len(), 1);
        assert_eq!(outcomes[0].task, "Review auth changes");
        assert_eq!(outcomes[0].action, AssignmentAction::DeferredSaturated);
        assert_eq!(outcomes[0].session_id, "lead");

        let unread = db.unread_message_counts()?;
        assert_eq!(unread.get("lead"), Some(&1));
        assert_eq!(unread.get("busy-worker"), Some(&1));

        let messages = db.list_messages_for_session("busy-worker", 10)?;
        assert!(!messages.iter().any(|message| {
            message.msg_type == "task_handoff" && message.content.contains("Review auth changes")
        }));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn auto_dispatch_backlog_routes_multiple_lead_inboxes() -> Result<()> {
        let tempdir = TestDir::new("manager-auto-dispatch")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let mut cfg = build_config(tempdir.path());
        cfg.auto_dispatch_limit_per_session = 5;
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        for lead_id in ["lead-a", "lead-b"] {
            db.insert_session(&Session {
                id: lead_id.to_string(),
                task: format!("{lead_id} task"),
                agent_type: "claude".to_string(),
                working_dir: repo_root.clone(),
                state: SessionState::Running,
                pid: Some(42),
                worktree: None,
                created_at: now - Duration::minutes(3),
                updated_at: now - Duration::minutes(3),
                metrics: SessionMetrics::default(),
            })?;
        }

        db.send_message(
            "planner",
            "lead-a",
            "{\"task\":\"Review auth\",\"context\":\"Inbound\"}",
            "task_handoff",
        )?;
        db.send_message(
            "planner",
            "lead-b",
            "{\"task\":\"Review billing\",\"context\":\"Inbound\"}",
            "task_handoff",
        )?;

        let outcomes = auto_dispatch_backlog(&db, &cfg, "claude", true, 10).await?;
        assert_eq!(outcomes.len(), 2);
        assert!(outcomes.iter().any(|outcome| {
            outcome.lead_session_id == "lead-a"
                && outcome.unread_count == 1
                && outcome.routed.len() == 1
        }));
        assert!(outcomes.iter().any(|outcome| {
            outcome.lead_session_id == "lead-b"
                && outcome.unread_count == 1
                && outcome.routed.len() == 1
        }));

        let unread = db.unread_task_handoff_targets(10)?;
        assert!(!unread.iter().any(|(session_id, _)| session_id == "lead-a"));
        assert!(!unread.iter().any(|(session_id, _)| session_id == "lead-b"));

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn coordinate_backlog_reports_remaining_backlog_after_limited_pass() -> Result<()> {
        let tempdir = TestDir::new("manager-coordinate-backlog")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let mut cfg = build_config(tempdir.path());
        cfg.auto_dispatch_limit_per_session = 5;
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        for lead_id in ["lead-a", "lead-b"] {
            db.insert_session(&Session {
                id: lead_id.to_string(),
                task: format!("{lead_id} task"),
                agent_type: "claude".to_string(),
                working_dir: repo_root.clone(),
                state: SessionState::Running,
                pid: Some(42),
                worktree: None,
                created_at: now - Duration::minutes(3),
                updated_at: now - Duration::minutes(3),
                metrics: SessionMetrics::default(),
            })?;
        }

        db.send_message(
            "planner",
            "lead-a",
            "{\"task\":\"Review auth\",\"context\":\"Inbound\"}",
            "task_handoff",
        )?;
        db.send_message(
            "planner",
            "lead-b",
            "{\"task\":\"Review billing\",\"context\":\"Inbound\"}",
            "task_handoff",
        )?;

        let outcome = coordinate_backlog(&db, &cfg, "claude", true, 1).await?;

        assert_eq!(outcome.dispatched.len(), 1);
        assert_eq!(outcome.rebalanced.len(), 0);
        assert_eq!(outcome.remaining_backlog_sessions, 2);
        assert_eq!(outcome.remaining_backlog_messages, 2);
        assert_eq!(outcome.remaining_absorbable_sessions, 2);
        assert_eq!(outcome.remaining_saturated_sessions, 0);

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn coordinate_backlog_classifies_remaining_saturated_pressure() -> Result<()> {
        let tempdir = TestDir::new("manager-coordinate-saturated")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let mut cfg = build_config(tempdir.path());
        cfg.max_parallel_sessions = 1;
        cfg.auto_dispatch_limit_per_session = 1;
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "worker".to_string(),
            task: "worker task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(3),
            updated_at: now - Duration::minutes(3),
            metrics: SessionMetrics::default(),
        })?;

        db.insert_session(&Session {
            id: "worker-child".to_string(),
            task: "delegate task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(43),
            worktree: None,
            created_at: now - Duration::minutes(2),
            updated_at: now - Duration::minutes(2),
            metrics: SessionMetrics::default(),
        })?;

        db.send_message(
            "worker",
            "worker-child",
            "{\"task\":\"seed delegate\",\"context\":\"Delegated from worker\"}",
            "task_handoff",
        )?;
        let _ = db.mark_messages_read("worker-child")?;

        db.send_message(
            "planner",
            "worker",
            "{\"task\":\"task-a\",\"context\":\"Inbound\"}",
            "task_handoff",
        )?;
        db.send_message(
            "planner",
            "worker",
            "{\"task\":\"task-b\",\"context\":\"Inbound\"}",
            "task_handoff",
        )?;

        let outcome = coordinate_backlog(&db, &cfg, "claude", true, 10).await?;

        assert_eq!(outcome.remaining_backlog_sessions, 1);
        assert_eq!(outcome.remaining_backlog_messages, 2);
        assert_eq!(outcome.remaining_absorbable_sessions, 0);
        assert_eq!(outcome.remaining_saturated_sessions, 1);

        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn rebalance_team_backlog_moves_work_off_backed_up_delegate() -> Result<()> {
        let tempdir = TestDir::new("manager-rebalance-team")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let mut cfg = build_config(tempdir.path());
        cfg.max_parallel_sessions = 2;
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead".to_string(),
            task: "lead task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(4),
            updated_at: now - Duration::minutes(4),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "worker-a".to_string(),
            task: "auth lane".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Idle,
            pid: None,
            worktree: None,
            created_at: now - Duration::minutes(3),
            updated_at: now - Duration::minutes(3),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "worker-b".to_string(),
            task: "billing lane".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Idle,
            pid: None,
            worktree: None,
            created_at: now - Duration::minutes(2),
            updated_at: now - Duration::minutes(2),
            metrics: SessionMetrics::default(),
        })?;

        db.send_message(
            "lead",
            "worker-a",
            "{\"task\":\"Review auth flow\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;
        db.send_message(
            "lead",
            "worker-a",
            "{\"task\":\"Check billing integration\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;
        db.send_message(
            "lead",
            "worker-b",
            "{\"task\":\"Existing clear lane\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;
        let _ = db.mark_messages_read("worker-b")?;

        let outcomes = rebalance_team_backlog(&db, &cfg, "lead", "claude", true, 5).await?;
        assert_eq!(outcomes.len(), 1);
        assert_eq!(outcomes[0].from_session_id, "worker-a");
        assert_eq!(outcomes[0].session_id, "worker-b");
        assert_eq!(outcomes[0].action, AssignmentAction::ReusedIdle);

        let unread = db.unread_message_counts()?;
        assert_eq!(unread.get("worker-a"), Some(&1));
        assert_eq!(unread.get("worker-b"), Some(&1));

        let worker_b_messages = db.list_messages_for_session("worker-b", 10)?;
        assert!(worker_b_messages.iter().any(|message| {
            message.msg_type == "task_handoff" && message.content.contains("Review auth flow")
        }));

        Ok(())
    }

    #[test]
    fn team_status_reports_handoff_backlog_not_generic_inbox_noise() -> Result<()> {
        let tempdir = TestDir::new("manager-team-status-backlog")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(tempdir.path());
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead".to_string(),
            task: "lead task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root.clone(),
            state: SessionState::Running,
            pid: Some(42),
            worktree: None,
            created_at: now - Duration::minutes(4),
            updated_at: now - Duration::minutes(4),
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "worker".to_string(),
            task: "delegate task".to_string(),
            agent_type: "claude".to_string(),
            working_dir: repo_root,
            state: SessionState::Idle,
            pid: None,
            worktree: None,
            created_at: now - Duration::minutes(3),
            updated_at: now - Duration::minutes(3),
            metrics: SessionMetrics::default(),
        })?;

        db.send_message("lead", "worker", "FYI status update", "info")?;
        db.send_message(
            "lead",
            "worker",
            "{\"task\":\"Delegated work\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;
        let _ = db.mark_messages_read("worker")?;
        db.send_message("lead", "worker", "FYI reminder", "info")?;

        let status = get_team_status(&db, "lead", 3)?;
        let rendered = format!("{status}");

        assert!(rendered.contains("Backlog: 0"));
        assert!(rendered.contains("| backlog 0 handoff(s) |"));
        assert!(!rendered.contains("Inbox:"));

        Ok(())
    }

    #[test]
    fn coordination_status_display_surfaces_mode_and_activity() {
        let status = CoordinationStatus {
            backlog_leads: 2,
            backlog_messages: 5,
            absorbable_sessions: 1,
            saturated_sessions: 1,
            mode: CoordinationMode::RebalanceFirstChronicSaturation,
            health: CoordinationHealth::Saturated,
            operator_escalation_required: false,
            auto_dispatch_enabled: true,
            auto_dispatch_limit_per_session: 4,
            daemon_activity: build_daemon_activity(),
        };

        let rendered = status.to_string();
        assert!(rendered.contains(
            "Global handoff backlog: 2 lead(s) / 5 handoff(s) [1 absorbable, 1 saturated]"
        ));
        assert!(rendered.contains("Auto-dispatch: on @ 4/lead"));
        assert!(rendered.contains("Coordination mode: rebalance-first (chronic saturation)"));
        assert!(rendered.contains("Chronic saturation streak: 2 cycle(s)"));
        assert!(rendered.contains("Last daemon dispatch: 3 routed / 1 deferred across 2 lead(s)"));
        assert!(rendered.contains("Last daemon recovery dispatch: 2 handoff(s) across 1 lead(s)"));
        assert!(rendered.contains("Last daemon rebalance: 0 handoff(s) across 1 lead(s)"));
        assert!(rendered.contains(
            "Last daemon auto-merge: 1 merged / 1 active / 0 conflicted / 0 dirty / 0 failed"
        ));
        assert!(rendered.contains("Last daemon auto-prune: 2 pruned / 1 active"));
    }

    #[test]
    fn coordination_status_summarizes_real_handoff_backlog() -> Result<()> {
        let tempdir = TestDir::new("manager-coordination-status")?;
        let repo_root = tempdir.path().join("repo");
        init_git_repo(&repo_root)?;

        let cfg = Config {
            max_parallel_sessions: 1,
            ..build_config(tempdir.path())
        };
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        db.insert_session(&build_session("source", SessionState::Running, now))?;
        db.insert_session(&build_session("lead-a", SessionState::Running, now))?;
        db.insert_session(&build_session("lead-b", SessionState::Running, now))?;
        db.insert_session(&build_session(
            "delegate-b",
            SessionState::Idle,
            now - Duration::seconds(1),
        ))?;

        db.send_message(
            "source",
            "lead-a",
            "{\"task\":\"clear docs\",\"context\":\"incoming\"}",
            "task_handoff",
        )?;
        db.send_message(
            "source",
            "lead-b",
            "{\"task\":\"review queue\",\"context\":\"incoming\"}",
            "task_handoff",
        )?;
        db.send_message(
            "lead-b",
            "delegate-b",
            "{\"task\":\"delegate queue\",\"context\":\"routed\"}",
            "task_handoff",
        )?;

        db.record_daemon_dispatch_pass(1, 1, 2)?;

        let status = get_coordination_status(&db, &cfg)?;
        assert_eq!(status.backlog_leads, 3);
        assert_eq!(status.backlog_messages, 3);
        assert_eq!(status.absorbable_sessions, 2);
        assert_eq!(status.saturated_sessions, 1);
        assert_eq!(
            status.mode,
            CoordinationMode::RebalanceFirstChronicSaturation
        );
        assert_eq!(status.health, CoordinationHealth::Saturated);
        assert!(!status.operator_escalation_required);
        assert_eq!(status.daemon_activity.last_dispatch_routed, 1);
        assert_eq!(status.daemon_activity.last_dispatch_deferred, 1);

        Ok(())
    }
}
