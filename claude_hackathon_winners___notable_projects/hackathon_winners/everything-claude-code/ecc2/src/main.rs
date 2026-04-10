mod comms;
mod config;
mod notifications;
mod observability;
mod session;
mod tui;
mod worktree;

use anyhow::Result;
use clap::Parser;
use serde::Serialize;
use std::path::PathBuf;
use tracing_subscriber::EnvFilter;

#[derive(Parser, Debug)]
#[command(name = "ecc", version, about = "ECC 2.0 — Agentic IDE control plane")]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(clap::Args, Debug, Clone, Default)]
struct WorktreePolicyArgs {
    /// Create a dedicated worktree
    #[arg(short = 'w', long = "worktree", action = clap::ArgAction::SetTrue, overrides_with = "no_worktree")]
    worktree: bool,
    /// Skip dedicated worktree creation
    #[arg(long = "no-worktree", action = clap::ArgAction::SetTrue, overrides_with = "worktree")]
    no_worktree: bool,
}

impl WorktreePolicyArgs {
    fn resolve(&self, cfg: &config::Config) -> bool {
        if self.worktree {
            true
        } else if self.no_worktree {
            false
        } else {
            cfg.auto_create_worktrees
        }
    }
}

#[derive(clap::Subcommand, Debug)]
enum Commands {
    /// Launch the TUI dashboard
    Dashboard,
    /// Start a new agent session
    Start {
        /// Task description for the agent
        #[arg(short, long)]
        task: String,
        /// Agent type (claude, codex, custom)
        #[arg(short, long, default_value = "claude")]
        agent: String,
        /// Agent profile defined in ecc2.toml
        #[arg(long)]
        profile: Option<String>,
        #[command(flatten)]
        worktree: WorktreePolicyArgs,
        /// Source session to delegate from
        #[arg(long)]
        from_session: Option<String>,
    },
    /// Delegate a new session from an existing one
    Delegate {
        /// Source session ID or alias
        from_session: String,
        /// Task description for the delegated session
        #[arg(short, long)]
        task: Option<String>,
        /// Agent type (claude, codex, custom)
        #[arg(short, long, default_value = "claude")]
        agent: String,
        /// Agent profile defined in ecc2.toml
        #[arg(long)]
        profile: Option<String>,
        #[command(flatten)]
        worktree: WorktreePolicyArgs,
    },
    /// Route work to an existing delegate when possible, otherwise spawn a new one
    Assign {
        /// Lead session ID or alias
        from_session: String,
        /// Task description for the assignment
        #[arg(short, long)]
        task: String,
        /// Agent type (claude, codex, custom)
        #[arg(short, long, default_value = "claude")]
        agent: String,
        /// Agent profile defined in ecc2.toml
        #[arg(long)]
        profile: Option<String>,
        #[command(flatten)]
        worktree: WorktreePolicyArgs,
    },
    /// Route unread task handoffs from a lead session inbox through the assignment policy
    DrainInbox {
        /// Lead session ID or alias
        session_id: String,
        /// Agent type for routed delegates
        #[arg(short, long, default_value = "claude")]
        agent: String,
        #[command(flatten)]
        worktree: WorktreePolicyArgs,
        /// Maximum unread task handoffs to route
        #[arg(long, default_value_t = 5)]
        limit: usize,
    },
    /// Sweep unread task handoffs across lead sessions and route them through the assignment policy
    AutoDispatch {
        /// Agent type for routed delegates
        #[arg(short, long, default_value = "claude")]
        agent: String,
        #[command(flatten)]
        worktree: WorktreePolicyArgs,
        /// Maximum lead sessions to sweep in one pass
        #[arg(long, default_value_t = 10)]
        lead_limit: usize,
    },
    /// Dispatch unread handoffs, then rebalance delegate backlog across lead teams
    CoordinateBacklog {
        /// Agent type for routed delegates
        #[arg(short, long, default_value = "claude")]
        agent: String,
        #[command(flatten)]
        worktree: WorktreePolicyArgs,
        /// Maximum lead sessions to sweep in one pass
        #[arg(long, default_value_t = 10)]
        lead_limit: usize,
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
        /// Return a non-zero exit code from the final coordination health
        #[arg(long)]
        check: bool,
        /// Keep coordinating until the backlog is healthy, saturated, or max passes is reached
        #[arg(long)]
        until_healthy: bool,
        /// Maximum coordination passes when using --until-healthy
        #[arg(long, default_value_t = 5)]
        max_passes: usize,
    },
    /// Show global coordination, backlog, and daemon policy status
    CoordinationStatus {
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
        /// Return a non-zero exit code when backlog or saturation needs attention
        #[arg(long)]
        check: bool,
    },
    /// Coordinate only when backlog pressure actually needs work
    MaintainCoordination {
        /// Agent type for routed delegates
        #[arg(short, long, default_value = "claude")]
        agent: String,
        #[command(flatten)]
        worktree: WorktreePolicyArgs,
        /// Maximum lead sessions to sweep in one pass
        #[arg(long, default_value_t = 10)]
        lead_limit: usize,
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
        /// Return a non-zero exit code from the final coordination health
        #[arg(long)]
        check: bool,
        /// Maximum coordination passes when maintenance is needed
        #[arg(long, default_value_t = 5)]
        max_passes: usize,
    },
    /// Rebalance unread handoffs across lead teams with backed-up delegates
    RebalanceAll {
        /// Agent type for routed delegates
        #[arg(short, long, default_value = "claude")]
        agent: String,
        #[command(flatten)]
        worktree: WorktreePolicyArgs,
        /// Maximum lead sessions to sweep in one pass
        #[arg(long, default_value_t = 10)]
        lead_limit: usize,
    },
    /// Rebalance unread handoffs off backed-up delegates onto clearer team capacity
    RebalanceTeam {
        /// Lead session ID or alias
        session_id: String,
        /// Agent type for routed delegates
        #[arg(short, long, default_value = "claude")]
        agent: String,
        #[command(flatten)]
        worktree: WorktreePolicyArgs,
        /// Maximum handoffs to reroute in one pass
        #[arg(long, default_value_t = 5)]
        limit: usize,
    },
    /// List active sessions
    Sessions,
    /// Show session details
    Status {
        /// Session ID or alias
        session_id: Option<String>,
    },
    /// Show delegated team board for a session
    Team {
        /// Lead session ID or alias
        session_id: Option<String>,
        /// Delegation depth to traverse
        #[arg(long, default_value_t = 2)]
        depth: usize,
    },
    /// Show worktree diff and merge-readiness details for a session
    WorktreeStatus {
        /// Session ID or alias
        session_id: Option<String>,
        /// Show worktree status for all sessions
        #[arg(long)]
        all: bool,
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
        /// Include a bounded patch preview when a worktree is attached
        #[arg(long)]
        patch: bool,
        /// Return a non-zero exit code when the worktree needs attention
        #[arg(long)]
        check: bool,
    },
    /// Show conflict-resolution protocol for a worktree
    WorktreeResolution {
        /// Session ID or alias
        session_id: Option<String>,
        /// Show conflict protocol for all conflicted worktrees
        #[arg(long)]
        all: bool,
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
        /// Return a non-zero exit code when conflicted worktrees are present
        #[arg(long)]
        check: bool,
    },
    /// Merge a session worktree branch into its base branch
    MergeWorktree {
        /// Session ID or alias
        session_id: Option<String>,
        /// Merge all ready inactive worktrees
        #[arg(long)]
        all: bool,
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
        /// Keep the worktree attached after a successful merge
        #[arg(long)]
        keep_worktree: bool,
    },
    /// Show the merge queue for inactive worktrees and any branch-to-branch blockers
    MergeQueue {
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
        /// Process the queue, auto-rebasing clean blocked worktrees and merging what becomes ready
        #[arg(long)]
        apply: bool,
    },
    /// Prune worktrees for inactive sessions and report any active sessions still holding one
    PruneWorktrees {
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
    },
    /// Log a significant agent decision for auditability
    LogDecision {
        /// Session ID or alias. Omit to log against the latest session.
        session_id: Option<String>,
        /// The chosen decision or direction
        #[arg(long)]
        decision: String,
        /// Why the agent made this choice
        #[arg(long)]
        reasoning: String,
        /// Alternative considered and rejected; repeat for multiple entries
        #[arg(long = "alternative")]
        alternatives: Vec<String>,
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
    },
    /// Show recent decision-log entries
    Decisions {
        /// Session ID or alias. Omit to read the latest session.
        session_id: Option<String>,
        /// Show decision log entries across all sessions
        #[arg(long)]
        all: bool,
        /// Emit machine-readable JSON instead of the human summary
        #[arg(long)]
        json: bool,
        /// Maximum decision-log entries to return
        #[arg(long, default_value_t = 20)]
        limit: usize,
    },
    /// Export sessions, tool spans, and metrics in OTLP-compatible JSON
    ExportOtel {
        /// Session ID or alias. Omit to export all sessions.
        session_id: Option<String>,
        /// Write the export to a file instead of stdout
        #[arg(long)]
        output: Option<PathBuf>,
    },
    /// Stop a running session
    Stop {
        /// Session ID or alias
        session_id: String,
    },
    /// Resume a failed or stopped session
    Resume {
        /// Session ID or alias
        session_id: String,
    },
    /// Send or inspect inter-session messages
    Messages {
        #[command(subcommand)]
        command: MessageCommands,
    },
    /// Run as background daemon
    Daemon,
    #[command(hide = true)]
    RunSession {
        #[arg(long)]
        session_id: String,
        #[arg(long)]
        task: String,
        #[arg(long)]
        agent: String,
        #[arg(long)]
        cwd: PathBuf,
    },
}

#[derive(clap::Subcommand, Debug)]
enum MessageCommands {
    /// Send a structured message between sessions
    Send {
        #[arg(long)]
        from: String,
        #[arg(long)]
        to: String,
        #[arg(long, value_enum)]
        kind: MessageKindArg,
        #[arg(long)]
        text: String,
        #[arg(long)]
        context: Option<String>,
        #[arg(long)]
        file: Vec<String>,
    },
    /// Show recent messages for a session
    Inbox {
        session_id: String,
        #[arg(long, default_value_t = 10)]
        limit: usize,
    },
}

#[derive(clap::ValueEnum, Clone, Debug)]
enum MessageKindArg {
    Handoff,
    Query,
    Response,
    Completed,
    Conflict,
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    let cli = Cli::parse();

    let cfg = config::Config::load()?;
    let db = session::store::StateStore::open(&cfg.db_path)?;

    match cli.command {
        Some(Commands::Dashboard) | None => {
            tui::app::run(db, cfg).await?;
        }
        Some(Commands::Start {
            task,
            agent,
            profile,
            worktree,
            from_session,
        }) => {
            let use_worktree = worktree.resolve(&cfg);
            let source = if let Some(from_session) = from_session.as_ref() {
                let from_id = resolve_session_id(&db, from_session)?;
                Some(
                    db.get_session(&from_id)?
                        .ok_or_else(|| anyhow::anyhow!("Session not found: {from_id}"))?,
                )
            } else {
                None
            };
            let grouping = session::SessionGrouping {
                project: source.as_ref().map(|session| session.project.clone()),
                task_group: source.as_ref().map(|session| session.task_group.clone()),
            };
            let session_id = if let Some(source) = source.as_ref() {
                session::manager::create_session_from_source_with_profile_and_grouping(
                    &db,
                    &cfg,
                    &task,
                    &agent,
                    use_worktree,
                    profile.as_deref(),
                    &source.id,
                    grouping,
                )
                .await?
            } else {
                session::manager::create_session_with_profile_and_grouping(
                    &db,
                    &cfg,
                    &task,
                    &agent,
                    use_worktree,
                    profile.as_deref(),
                    grouping,
                )
                .await?
            };
            if let Some(source) = source {
                let from_id = source.id;
                send_handoff_message(&db, &from_id, &session_id)?;
            }
            println!("Session started: {session_id}");
        }
        Some(Commands::Delegate {
            from_session,
            task,
            agent,
            profile,
            worktree,
        }) => {
            let use_worktree = worktree.resolve(&cfg);
            let from_id = resolve_session_id(&db, &from_session)?;
            let source = db
                .get_session(&from_id)?
                .ok_or_else(|| anyhow::anyhow!("Session not found: {from_id}"))?;
            let task = task.unwrap_or_else(|| {
                format!(
                    "Follow up on {}: {}",
                    short_session(&source.id),
                    source.task
                )
            });

            let session_id = session::manager::create_session_from_source_with_profile_and_grouping(
                &db,
                &cfg,
                &task,
                &agent,
                use_worktree,
                profile.as_deref(),
                &source.id,
                session::SessionGrouping {
                    project: Some(source.project.clone()),
                    task_group: Some(source.task_group.clone()),
                },
            )
            .await?;
            send_handoff_message(&db, &source.id, &session_id)?;
            println!(
                "Delegated session started: {} <- {}",
                session_id,
                short_session(&source.id)
            );
        }
        Some(Commands::Assign {
            from_session,
            task,
            agent,
            profile,
            worktree,
        }) => {
            let use_worktree = worktree.resolve(&cfg);
            let lead_id = resolve_session_id(&db, &from_session)?;
            let outcome = session::manager::assign_session_with_profile_and_grouping(
                &db,
                &cfg,
                &lead_id,
                &task,
                &agent,
                use_worktree,
                profile.as_deref(),
                session::SessionGrouping::default(),
            )
            .await?;
            if session::manager::assignment_action_routes_work(outcome.action) {
                println!(
                    "Assignment routed: {} -> {} ({})",
                    short_session(&lead_id),
                    short_session(&outcome.session_id),
                    match outcome.action {
                        session::manager::AssignmentAction::Spawned => "spawned",
                        session::manager::AssignmentAction::ReusedIdle => "reused-idle",
                        session::manager::AssignmentAction::ReusedActive => "reused-active",
                        session::manager::AssignmentAction::DeferredSaturated => unreachable!(),
                    }
                );
            } else {
                println!(
                    "Assignment deferred: {} is saturated; task stayed in {} inbox",
                    short_session(&lead_id),
                    short_session(&lead_id),
                );
            }
        }
        Some(Commands::DrainInbox {
            session_id,
            agent,
            worktree,
            limit,
        }) => {
            let use_worktree = worktree.resolve(&cfg);
            let lead_id = resolve_session_id(&db, &session_id)?;
            let outcomes =
                session::manager::drain_inbox(&db, &cfg, &lead_id, &agent, use_worktree, limit)
                    .await?;
            if outcomes.is_empty() {
                println!("No unread task handoffs for {}", short_session(&lead_id));
            } else {
                let routed_count = outcomes
                    .iter()
                    .filter(|outcome| {
                        session::manager::assignment_action_routes_work(outcome.action)
                    })
                    .count();
                let deferred_count = outcomes.len().saturating_sub(routed_count);
                println!(
                    "Processed {} inbox task handoff(s) from {} ({} routed, {} deferred)",
                    outcomes.len(),
                    short_session(&lead_id),
                    routed_count,
                    deferred_count
                );
                for outcome in outcomes {
                    println!(
                        "- {} -> {} ({}) | {}",
                        outcome.message_id,
                        short_session(&outcome.session_id),
                        match outcome.action {
                            session::manager::AssignmentAction::Spawned => "spawned",
                            session::manager::AssignmentAction::ReusedIdle => "reused-idle",
                            session::manager::AssignmentAction::ReusedActive => "reused-active",
                            session::manager::AssignmentAction::DeferredSaturated => {
                                "deferred-saturated"
                            }
                        },
                        outcome.task
                    );
                }
            }
        }
        Some(Commands::AutoDispatch {
            agent,
            worktree,
            lead_limit,
        }) => {
            let use_worktree = worktree.resolve(&cfg);
            let outcomes = session::manager::auto_dispatch_backlog(
                &db,
                &cfg,
                &agent,
                use_worktree,
                lead_limit,
            )
            .await?;
            if outcomes.is_empty() {
                println!("No unread task handoff backlog found");
            } else {
                let total_processed: usize =
                    outcomes.iter().map(|outcome| outcome.routed.len()).sum();
                let total_routed: usize = outcomes
                    .iter()
                    .map(|outcome| {
                        outcome
                            .routed
                            .iter()
                            .filter(|item| {
                                session::manager::assignment_action_routes_work(item.action)
                            })
                            .count()
                    })
                    .sum();
                let total_deferred = total_processed.saturating_sub(total_routed);
                println!(
                    "Auto-dispatch processed {} task handoff(s) across {} lead session(s) ({} routed, {} deferred)",
                    total_processed,
                    outcomes.len(),
                    total_routed,
                    total_deferred
                );
                for outcome in outcomes {
                    let routed = outcome
                        .routed
                        .iter()
                        .filter(|item| session::manager::assignment_action_routes_work(item.action))
                        .count();
                    let deferred = outcome.routed.len().saturating_sub(routed);
                    println!(
                        "- {} | unread {} | routed {} | deferred {}",
                        short_session(&outcome.lead_session_id),
                        outcome.unread_count,
                        routed,
                        deferred
                    );
                }
            }
        }
        Some(Commands::CoordinateBacklog {
            agent,
            worktree,
            lead_limit,
            json,
            check,
            until_healthy,
            max_passes,
        }) => {
            let use_worktree = worktree.resolve(&cfg);
            let pass_budget = if until_healthy { max_passes.max(1) } else { 1 };
            let run = run_coordination_loop(
                &db,
                &cfg,
                &agent,
                use_worktree,
                lead_limit,
                pass_budget,
                !json,
            )
            .await?;

            if json {
                println!("{}", serde_json::to_string_pretty(&run)?);
            }

            if check {
                let exit_code = run
                    .final_status
                    .as_ref()
                    .map(coordination_status_exit_code)
                    .unwrap_or(0);
                std::process::exit(exit_code);
            }
        }
        Some(Commands::CoordinationStatus { json, check }) => {
            let status = session::manager::get_coordination_status(&db, &cfg)?;
            println!("{}", format_coordination_status(&status, json)?);
            if check {
                std::process::exit(coordination_status_exit_code(&status));
            }
        }
        Some(Commands::MaintainCoordination {
            agent,
            worktree,
            lead_limit,
            json,
            check,
            max_passes,
        }) => {
            let use_worktree = worktree.resolve(&cfg);
            let initial_status = session::manager::get_coordination_status(&db, &cfg)?;
            let run = if matches!(
                initial_status.health,
                session::manager::CoordinationHealth::Healthy
            ) {
                None
            } else {
                Some(
                    run_coordination_loop(
                        &db,
                        &cfg,
                        &agent,
                        use_worktree,
                        lead_limit,
                        max_passes.max(1),
                        !json,
                    )
                    .await?,
                )
            };
            let final_status = run
                .as_ref()
                .and_then(|run| run.final_status.clone())
                .unwrap_or_else(|| initial_status.clone());

            if json {
                let payload = MaintainCoordinationRun {
                    skipped: run.is_none(),
                    initial_status,
                    run,
                    final_status: final_status.clone(),
                };
                println!("{}", serde_json::to_string_pretty(&payload)?);
            } else if run.is_none() {
                println!("Coordination already healthy");
            }

            if check {
                std::process::exit(coordination_status_exit_code(&final_status));
            }
        }
        Some(Commands::RebalanceAll {
            agent,
            worktree,
            lead_limit,
        }) => {
            let use_worktree = worktree.resolve(&cfg);
            let outcomes =
                session::manager::rebalance_all_teams(&db, &cfg, &agent, use_worktree, lead_limit)
                    .await?;
            if outcomes.is_empty() {
                println!("No delegate backlog needed global rebalancing");
            } else {
                let total_rerouted: usize =
                    outcomes.iter().map(|outcome| outcome.rerouted.len()).sum();
                println!(
                    "Rebalanced {} task handoff(s) across {} lead session(s)",
                    total_rerouted,
                    outcomes.len()
                );
                for outcome in outcomes {
                    println!(
                        "- {} | rerouted {}",
                        short_session(&outcome.lead_session_id),
                        outcome.rerouted.len()
                    );
                }
            }
        }
        Some(Commands::RebalanceTeam {
            session_id,
            agent,
            worktree,
            limit,
        }) => {
            let use_worktree = worktree.resolve(&cfg);
            let lead_id = resolve_session_id(&db, &session_id)?;
            let outcomes = session::manager::rebalance_team_backlog(
                &db,
                &cfg,
                &lead_id,
                &agent,
                use_worktree,
                limit,
            )
            .await?;
            if outcomes.is_empty() {
                println!(
                    "No delegate backlog needed rebalancing for {}",
                    short_session(&lead_id)
                );
            } else {
                println!(
                    "Rebalanced {} task handoff(s) for {}",
                    outcomes.len(),
                    short_session(&lead_id)
                );
                for outcome in outcomes {
                    println!(
                        "- {} | {} -> {} ({}) | {}",
                        outcome.message_id,
                        short_session(&outcome.from_session_id),
                        short_session(&outcome.session_id),
                        match outcome.action {
                            session::manager::AssignmentAction::Spawned => "spawned",
                            session::manager::AssignmentAction::ReusedIdle => "reused-idle",
                            session::manager::AssignmentAction::ReusedActive => "reused-active",
                            session::manager::AssignmentAction::DeferredSaturated => {
                                "deferred-saturated"
                            }
                        },
                        outcome.task
                    );
                }
            }
        }
        Some(Commands::Sessions) => {
            sync_runtime_session_metrics(&db, &cfg)?;
            let sessions = session::manager::list_sessions(&db)?;
            for s in sessions {
                println!("{} [{}] {}", s.id, s.state, s.task);
            }
        }
        Some(Commands::Status { session_id }) => {
            sync_runtime_session_metrics(&db, &cfg)?;
            let id = session_id.unwrap_or_else(|| "latest".to_string());
            let status = session::manager::get_status(&db, &id)?;
            println!("{status}");
        }
        Some(Commands::Team { session_id, depth }) => {
            sync_runtime_session_metrics(&db, &cfg)?;
            let id = session_id.unwrap_or_else(|| "latest".to_string());
            let team = session::manager::get_team_status(&db, &id, depth)?;
            println!("{team}");
        }
        Some(Commands::WorktreeStatus {
            session_id,
            all,
            json,
            patch,
            check,
        }) => {
            if all && session_id.is_some() {
                return Err(anyhow::anyhow!(
                    "worktree-status does not accept a session ID when --all is set"
                ));
            }
            let reports = if all {
                session::manager::list_sessions(&db)?
                    .into_iter()
                    .map(|session| build_worktree_status_report(&session, patch))
                    .collect::<Result<Vec<_>>>()?
            } else {
                let id = session_id.unwrap_or_else(|| "latest".to_string());
                let resolved_id = resolve_session_id(&db, &id)?;
                let session = db
                    .get_session(&resolved_id)?
                    .ok_or_else(|| anyhow::anyhow!("Session not found: {resolved_id}"))?;
                vec![build_worktree_status_report(&session, patch)?]
            };
            if json {
                if all {
                    println!("{}", serde_json::to_string_pretty(&reports)?);
                } else {
                    println!("{}", serde_json::to_string_pretty(&reports[0])?);
                }
            } else {
                println!("{}", format_worktree_status_reports_human(&reports));
            }
            if check {
                std::process::exit(worktree_status_reports_exit_code(&reports));
            }
        }
        Some(Commands::WorktreeResolution {
            session_id,
            all,
            json,
            check,
        }) => {
            if all && session_id.is_some() {
                return Err(anyhow::anyhow!(
                    "worktree-resolution does not accept a session ID when --all is set"
                ));
            }
            let reports = if all {
                session::manager::list_sessions(&db)?
                    .into_iter()
                    .map(|session| build_worktree_resolution_report(&session))
                    .collect::<Result<Vec<_>>>()?
                    .into_iter()
                    .filter(|report| report.conflicted)
                    .collect::<Vec<_>>()
            } else {
                let id = session_id.unwrap_or_else(|| "latest".to_string());
                let resolved_id = resolve_session_id(&db, &id)?;
                let session = db
                    .get_session(&resolved_id)?
                    .ok_or_else(|| anyhow::anyhow!("Session not found: {resolved_id}"))?;
                vec![build_worktree_resolution_report(&session)?]
            };
            if json {
                if all {
                    println!("{}", serde_json::to_string_pretty(&reports)?);
                } else {
                    println!("{}", serde_json::to_string_pretty(&reports[0])?);
                }
            } else {
                println!("{}", format_worktree_resolution_reports_human(&reports));
            }
            if check {
                std::process::exit(worktree_resolution_reports_exit_code(&reports));
            }
        }
        Some(Commands::MergeWorktree {
            session_id,
            all,
            json,
            keep_worktree,
        }) => {
            if all && session_id.is_some() {
                return Err(anyhow::anyhow!(
                    "merge-worktree does not accept a session ID when --all is set"
                ));
            }
            if all {
                let outcome = session::manager::merge_ready_worktrees(&db, !keep_worktree).await?;
                if json {
                    println!("{}", serde_json::to_string_pretty(&outcome)?);
                } else {
                    println!("{}", format_bulk_worktree_merge_human(&outcome));
                }
            } else {
                let id = session_id.unwrap_or_else(|| "latest".to_string());
                let resolved_id = resolve_session_id(&db, &id)?;
                let outcome =
                    session::manager::merge_session_worktree(&db, &resolved_id, !keep_worktree)
                        .await?;
                if json {
                    println!("{}", serde_json::to_string_pretty(&outcome)?);
                } else {
                    println!("{}", format_worktree_merge_human(&outcome));
                }
            }
        }
        Some(Commands::MergeQueue { json, apply }) => {
            if apply {
                let outcome = session::manager::process_merge_queue(&db).await?;
                if json {
                    println!("{}", serde_json::to_string_pretty(&outcome)?);
                } else {
                    println!("{}", format_bulk_worktree_merge_human(&outcome));
                }
            } else {
                let report = session::manager::build_merge_queue(&db)?;
                if json {
                    println!("{}", serde_json::to_string_pretty(&report)?);
                } else {
                    println!("{}", format_merge_queue_human(&report));
                }
            }
        }
        Some(Commands::PruneWorktrees { json }) => {
            let outcome = session::manager::prune_inactive_worktrees(&db, &cfg).await?;
            if json {
                println!("{}", serde_json::to_string_pretty(&outcome)?);
            } else {
                println!("{}", format_prune_worktrees_human(&outcome));
            }
        }
        Some(Commands::LogDecision {
            session_id,
            decision,
            reasoning,
            alternatives,
            json,
        }) => {
            let resolved_id = resolve_session_id(&db, session_id.as_deref().unwrap_or("latest"))?;
            let entry = db.insert_decision(&resolved_id, &decision, &alternatives, &reasoning)?;
            if json {
                println!("{}", serde_json::to_string_pretty(&entry)?);
            } else {
                println!("{}", format_logged_decision_human(&entry));
            }
        }
        Some(Commands::Decisions {
            session_id,
            all,
            json,
            limit,
        }) => {
            if all && session_id.is_some() {
                return Err(anyhow::anyhow!(
                    "decisions does not accept a session ID when --all is set"
                ));
            }
            let entries = if all {
                db.list_decisions(limit)?
            } else {
                let resolved_id =
                    resolve_session_id(&db, session_id.as_deref().unwrap_or("latest"))?;
                db.list_decisions_for_session(&resolved_id, limit)?
            };
            if json {
                println!("{}", serde_json::to_string_pretty(&entries)?);
            } else {
                println!("{}", format_decisions_human(&entries, all));
            }
        }
        Some(Commands::ExportOtel { session_id, output }) => {
            sync_runtime_session_metrics(&db, &cfg)?;
            let resolved_session_id = session_id
                .as_deref()
                .map(|value| resolve_session_id(&db, value))
                .transpose()?;
            let export = build_otel_export(&db, resolved_session_id.as_deref())?;
            let rendered = serde_json::to_string_pretty(&export)?;
            if let Some(path) = output {
                std::fs::write(&path, rendered)?;
                println!("OTLP export written to {}", path.display());
            } else {
                println!("{rendered}");
            }
        }
        Some(Commands::Stop { session_id }) => {
            session::manager::stop_session(&db, &session_id).await?;
            println!("Session stopped: {session_id}");
        }
        Some(Commands::Resume { session_id }) => {
            let resumed_id = session::manager::resume_session(&db, &cfg, &session_id).await?;
            println!("Session resumed: {resumed_id}");
        }
        Some(Commands::Messages { command }) => match command {
            MessageCommands::Send {
                from,
                to,
                kind,
                text,
                context,
                file,
            } => {
                let from = resolve_session_id(&db, &from)?;
                let to = resolve_session_id(&db, &to)?;
                let message = build_message(kind, text, context, file)?;
                comms::send(&db, &from, &to, &message)?;
                println!(
                    "Message sent: {} -> {}",
                    short_session(&from),
                    short_session(&to)
                );
            }
            MessageCommands::Inbox { session_id, limit } => {
                let session_id = resolve_session_id(&db, &session_id)?;
                let messages = db.list_messages_for_session(&session_id, limit)?;
                let unread_before = db
                    .unread_message_counts()?
                    .get(&session_id)
                    .copied()
                    .unwrap_or(0);
                if unread_before > 0 {
                    let _ = db.mark_messages_read(&session_id)?;
                }

                if messages.is_empty() {
                    println!("No messages for {}", short_session(&session_id));
                } else {
                    println!("Messages for {}", short_session(&session_id));
                    for message in messages {
                        println!(
                            "{} {} -> {} | {}",
                            message.timestamp.format("%H:%M:%S"),
                            short_session(&message.from_session),
                            short_session(&message.to_session),
                            comms::preview(&message.msg_type, &message.content)
                        );
                    }
                }
            }
        },
        Some(Commands::Daemon) => {
            println!("Starting ECC daemon...");
            session::daemon::run(db, cfg).await?;
        }
        Some(Commands::RunSession {
            session_id,
            task,
            agent,
            cwd,
        }) => {
            session::manager::run_session(&cfg, &session_id, &task, &agent, &cwd).await?;
        }
    }

    Ok(())
}

fn resolve_session_id(db: &session::store::StateStore, value: &str) -> Result<String> {
    if value == "latest" {
        return db
            .get_latest_session()?
            .map(|session| session.id)
            .ok_or_else(|| anyhow::anyhow!("No sessions found"));
    }

    db.get_session(value)?
        .map(|session| session.id)
        .ok_or_else(|| anyhow::anyhow!("Session not found: {value}"))
}

fn sync_runtime_session_metrics(
    db: &session::store::StateStore,
    cfg: &config::Config,
) -> Result<()> {
    db.refresh_session_durations()?;
    db.sync_cost_tracker_metrics(&cfg.cost_metrics_path())?;
    db.sync_tool_activity_metrics(&cfg.tool_activity_metrics_path())?;
    let _ = session::manager::enforce_session_heartbeats(db, cfg)?;
    let _ = session::manager::enforce_budget_hard_limits(db, cfg)?;
    Ok(())
}

fn build_message(
    kind: MessageKindArg,
    text: String,
    context: Option<String>,
    files: Vec<String>,
) -> Result<comms::MessageType> {
    Ok(match kind {
        MessageKindArg::Handoff => comms::MessageType::TaskHandoff {
            task: text,
            context: context.unwrap_or_default(),
        },
        MessageKindArg::Query => comms::MessageType::Query { question: text },
        MessageKindArg::Response => comms::MessageType::Response { answer: text },
        MessageKindArg::Completed => comms::MessageType::Completed {
            summary: text,
            files_changed: files,
        },
        MessageKindArg::Conflict => {
            let file = files
                .first()
                .cloned()
                .ok_or_else(|| anyhow::anyhow!("Conflict messages require at least one --file"))?;
            comms::MessageType::Conflict {
                file,
                description: context.unwrap_or(text),
            }
        }
    })
}

fn short_session(session_id: &str) -> String {
    session_id.chars().take(8).collect()
}

fn format_coordination_status(
    status: &session::manager::CoordinationStatus,
    json: bool,
) -> Result<String> {
    if json {
        return Ok(serde_json::to_string_pretty(status)?);
    }

    Ok(status.to_string())
}

async fn run_coordination_loop(
    db: &session::store::StateStore,
    cfg: &config::Config,
    agent: &str,
    use_worktree: bool,
    lead_limit: usize,
    pass_budget: usize,
    emit_progress: bool,
) -> Result<CoordinateBacklogRun> {
    let mut final_status = None;
    let mut pass_summaries = Vec::new();

    for pass in 1..=pass_budget.max(1) {
        let outcome =
            session::manager::coordinate_backlog(db, cfg, agent, use_worktree, lead_limit).await?;
        let mut summary = summarize_coordinate_backlog(&outcome);
        summary.pass = pass;
        pass_summaries.push(summary.clone());

        if emit_progress {
            if pass_budget > 1 {
                println!("Pass {pass}/{pass_budget}: {}", summary.message);
            } else {
                println!("{}", summary.message);
            }
        }

        let status = session::manager::get_coordination_status(db, cfg)?;
        let should_stop = matches!(
            status.health,
            session::manager::CoordinationHealth::Healthy
                | session::manager::CoordinationHealth::Saturated
                | session::manager::CoordinationHealth::EscalationRequired
        );
        final_status = Some(status);

        if should_stop {
            break;
        }
    }

    let run = CoordinateBacklogRun {
        pass_budget,
        passes: pass_summaries,
        final_status,
    };

    if emit_progress && pass_budget > 1 {
        if let Some(status) = run.final_status.as_ref() {
            println!(
                "Final coordination health: {:?} | mode {:?} | backlog {} handoff(s) across {} lead(s)",
                status.health, status.mode, status.backlog_messages, status.backlog_leads
            );
        }
    }

    Ok(run)
}

#[derive(Debug, Clone, Serialize)]
struct CoordinateBacklogPassSummary {
    pass: usize,
    processed: usize,
    routed: usize,
    deferred: usize,
    rerouted: usize,
    dispatched_leads: usize,
    rebalanced_leads: usize,
    remaining_backlog_sessions: usize,
    remaining_backlog_messages: usize,
    remaining_absorbable_sessions: usize,
    remaining_saturated_sessions: usize,
    message: String,
}

#[derive(Debug, Clone, Serialize)]
struct CoordinateBacklogRun {
    pass_budget: usize,
    passes: Vec<CoordinateBacklogPassSummary>,
    final_status: Option<session::manager::CoordinationStatus>,
}

#[derive(Debug, Clone, Serialize)]
struct MaintainCoordinationRun {
    skipped: bool,
    initial_status: session::manager::CoordinationStatus,
    run: Option<CoordinateBacklogRun>,
    final_status: session::manager::CoordinationStatus,
}

#[derive(Debug, Clone, Serialize)]
struct WorktreeMergeReadinessReport {
    status: String,
    summary: String,
    conflicts: Vec<String>,
}

#[derive(Debug, Clone, Serialize)]
struct WorktreeStatusReport {
    session_id: String,
    task: String,
    session_state: String,
    health: String,
    check_exit_code: i32,
    patch_included: bool,
    attached: bool,
    path: Option<String>,
    branch: Option<String>,
    base_branch: Option<String>,
    diff_summary: Option<String>,
    file_preview: Vec<String>,
    patch_preview: Option<String>,
    merge_readiness: Option<WorktreeMergeReadinessReport>,
}

#[derive(Debug, Clone, Serialize)]
struct WorktreeResolutionReport {
    session_id: String,
    task: String,
    session_state: String,
    attached: bool,
    conflicted: bool,
    check_exit_code: i32,
    path: Option<String>,
    branch: Option<String>,
    base_branch: Option<String>,
    summary: String,
    conflicts: Vec<String>,
    resolution_steps: Vec<String>,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpExport {
    resource_spans: Vec<OtlpResourceSpans>,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpResourceSpans {
    resource: OtlpResource,
    scope_spans: Vec<OtlpScopeSpans>,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpResource {
    attributes: Vec<OtlpKeyValue>,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpScopeSpans {
    scope: OtlpInstrumentationScope,
    spans: Vec<OtlpSpan>,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpInstrumentationScope {
    name: String,
    version: String,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpSpan {
    trace_id: String,
    span_id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    parent_span_id: Option<String>,
    name: String,
    kind: String,
    start_time_unix_nano: String,
    end_time_unix_nano: String,
    attributes: Vec<OtlpKeyValue>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    links: Vec<OtlpSpanLink>,
    status: OtlpSpanStatus,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpSpanLink {
    trace_id: String,
    span_id: String,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    attributes: Vec<OtlpKeyValue>,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpSpanStatus {
    code: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    message: Option<String>,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpKeyValue {
    key: String,
    value: OtlpAnyValue,
}

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct OtlpAnyValue {
    #[serde(skip_serializing_if = "Option::is_none")]
    string_value: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    int_value: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    double_value: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    bool_value: Option<bool>,
}

fn build_worktree_status_report(
    session: &session::Session,
    include_patch: bool,
) -> Result<WorktreeStatusReport> {
    let Some(worktree) = session.worktree.as_ref() else {
        return Ok(WorktreeStatusReport {
            session_id: session.id.clone(),
            task: session.task.clone(),
            session_state: session.state.to_string(),
            health: "clear".to_string(),
            check_exit_code: 0,
            patch_included: include_patch,
            attached: false,
            path: None,
            branch: None,
            base_branch: None,
            diff_summary: None,
            file_preview: Vec::new(),
            patch_preview: None,
            merge_readiness: None,
        });
    };

    let diff_summary = worktree::diff_summary(worktree)?;
    let file_preview = worktree::diff_file_preview(worktree, 8)?;
    let patch_preview = if include_patch {
        worktree::diff_patch_preview(worktree, 80)?
    } else {
        None
    };
    let merge_readiness = worktree::merge_readiness(worktree)?;
    let worktree_health = worktree::health(worktree)?;
    let (health, check_exit_code) = match worktree_health {
        worktree::WorktreeHealth::Conflicted => ("conflicted".to_string(), 2),
        worktree::WorktreeHealth::Clear => ("clear".to_string(), 0),
        worktree::WorktreeHealth::InProgress => ("in_progress".to_string(), 1),
    };

    Ok(WorktreeStatusReport {
        session_id: session.id.clone(),
        task: session.task.clone(),
        session_state: session.state.to_string(),
        health,
        check_exit_code,
        patch_included: include_patch,
        attached: true,
        path: Some(worktree.path.display().to_string()),
        branch: Some(worktree.branch.clone()),
        base_branch: Some(worktree.base_branch.clone()),
        diff_summary,
        file_preview,
        patch_preview,
        merge_readiness: Some(WorktreeMergeReadinessReport {
            status: match merge_readiness.status {
                worktree::MergeReadinessStatus::Ready => "ready".to_string(),
                worktree::MergeReadinessStatus::Conflicted => "conflicted".to_string(),
            },
            summary: merge_readiness.summary,
            conflicts: merge_readiness.conflicts,
        }),
    })
}

fn build_worktree_resolution_report(
    session: &session::Session,
) -> Result<WorktreeResolutionReport> {
    let Some(worktree) = session.worktree.as_ref() else {
        return Ok(WorktreeResolutionReport {
            session_id: session.id.clone(),
            task: session.task.clone(),
            session_state: session.state.to_string(),
            attached: false,
            conflicted: false,
            check_exit_code: 0,
            path: None,
            branch: None,
            base_branch: None,
            summary: "No worktree attached".to_string(),
            conflicts: Vec::new(),
            resolution_steps: Vec::new(),
        });
    };

    let merge_readiness = worktree::merge_readiness(worktree)?;
    let conflicted = merge_readiness.status == worktree::MergeReadinessStatus::Conflicted;
    let resolution_steps = if conflicted {
        vec![
            format!(
                "Inspect current patch: ecc worktree-status {} --patch",
                session.id
            ),
            format!("Open worktree: cd {}", worktree.path.display()),
            "Resolve conflicts and stage files: git add <paths>".to_string(),
            format!("Commit the resolution on {}: git commit", worktree.branch),
            format!(
                "Re-check readiness: ecc worktree-status {} --check",
                session.id
            ),
            format!("Merge when clear: ecc merge-worktree {}", session.id),
        ]
    } else {
        Vec::new()
    };

    Ok(WorktreeResolutionReport {
        session_id: session.id.clone(),
        task: session.task.clone(),
        session_state: session.state.to_string(),
        attached: true,
        conflicted,
        check_exit_code: if conflicted { 2 } else { 0 },
        path: Some(worktree.path.display().to_string()),
        branch: Some(worktree.branch.clone()),
        base_branch: Some(worktree.base_branch.clone()),
        summary: merge_readiness.summary,
        conflicts: merge_readiness.conflicts,
        resolution_steps,
    })
}

fn format_worktree_status_human(report: &WorktreeStatusReport) -> String {
    let mut lines = vec![format!(
        "Worktree status for {} [{}]",
        short_session(&report.session_id),
        report.session_state
    )];
    lines.push(format!("Task {}", report.task));
    lines.push(format!("Health {}", report.health));

    if !report.attached {
        lines.push("No worktree attached".to_string());
        return lines.join("\n");
    }

    if let Some(path) = report.path.as_ref() {
        lines.push(format!("Path {path}"));
    }
    if let (Some(branch), Some(base_branch)) = (report.branch.as_ref(), report.base_branch.as_ref())
    {
        lines.push(format!("Branch {branch} (base {base_branch})"));
    }
    if let Some(diff_summary) = report.diff_summary.as_ref() {
        lines.push(diff_summary.clone());
    }
    if !report.file_preview.is_empty() {
        lines.push("Files".to_string());
        for entry in &report.file_preview {
            lines.push(format!("- {entry}"));
        }
    }
    if let Some(merge_readiness) = report.merge_readiness.as_ref() {
        lines.push(merge_readiness.summary.clone());
        for conflict in merge_readiness.conflicts.iter().take(5) {
            lines.push(format!("- conflict {conflict}"));
        }
    }
    if report.patch_included {
        if let Some(patch_preview) = report.patch_preview.as_ref() {
            lines.push("Patch preview".to_string());
            lines.push(patch_preview.clone());
        } else {
            lines.push("Patch preview unavailable".to_string());
        }
    }

    lines.join("\n")
}

fn format_worktree_status_reports_human(reports: &[WorktreeStatusReport]) -> String {
    reports
        .iter()
        .map(format_worktree_status_human)
        .collect::<Vec<_>>()
        .join("\n\n")
}

fn format_worktree_resolution_human(report: &WorktreeResolutionReport) -> String {
    let mut lines = vec![format!(
        "Worktree resolution for {} [{}]",
        short_session(&report.session_id),
        report.session_state
    )];
    lines.push(format!("Task {}", report.task));

    if !report.attached {
        lines.push(report.summary.clone());
        return lines.join("\n");
    }

    if let Some(path) = report.path.as_ref() {
        lines.push(format!("Path {path}"));
    }
    if let (Some(branch), Some(base_branch)) = (report.branch.as_ref(), report.base_branch.as_ref())
    {
        lines.push(format!("Branch {branch} (base {base_branch})"));
    }
    lines.push(report.summary.clone());

    if !report.conflicts.is_empty() {
        lines.push("Conflicts".to_string());
        for conflict in &report.conflicts {
            lines.push(format!("- {conflict}"));
        }
    }

    if report.resolution_steps.is_empty() {
        lines.push("No conflict-resolution steps required".to_string());
    } else {
        lines.push("Resolution steps".to_string());
        for (index, step) in report.resolution_steps.iter().enumerate() {
            lines.push(format!("{}. {step}", index + 1));
        }
    }

    lines.join("\n")
}

fn format_worktree_resolution_reports_human(reports: &[WorktreeResolutionReport]) -> String {
    if reports.is_empty() {
        return "No conflicted worktrees found".to_string();
    }

    reports
        .iter()
        .map(format_worktree_resolution_human)
        .collect::<Vec<_>>()
        .join("\n\n")
}

fn format_worktree_merge_human(outcome: &session::manager::WorktreeMergeOutcome) -> String {
    let mut lines = vec![format!(
        "Merged worktree for {}",
        short_session(&outcome.session_id)
    )];
    lines.push(format!(
        "Branch {} -> {}",
        outcome.branch, outcome.base_branch
    ));
    lines.push(if outcome.already_up_to_date {
        "Result already up to date".to_string()
    } else {
        "Result merged into base".to_string()
    });
    lines.push(if outcome.cleaned_worktree {
        "Cleanup removed worktree and branch".to_string()
    } else {
        "Cleanup kept worktree attached".to_string()
    });
    lines.join("\n")
}

fn format_bulk_worktree_merge_human(
    outcome: &session::manager::WorktreeBulkMergeOutcome,
) -> String {
    let mut lines = Vec::new();
    lines.push(format!("Merged {} ready worktree(s)", outcome.merged.len()));

    for merged in &outcome.merged {
        lines.push(format!(
            "- merged {} -> {} for {}{}",
            merged.branch,
            merged.base_branch,
            short_session(&merged.session_id),
            if merged.already_up_to_date {
                " (already up to date)"
            } else {
                ""
            }
        ));
    }

    if !outcome.rebased.is_empty() {
        lines.push(format!(
            "Rebased {} blocked worktree(s) onto their base branch",
            outcome.rebased.len()
        ));
        for rebased in &outcome.rebased {
            lines.push(format!(
                "- rebased {} onto {} for {}{}",
                rebased.branch,
                rebased.base_branch,
                short_session(&rebased.session_id),
                if rebased.already_up_to_date {
                    " (already up to date)"
                } else {
                    ""
                }
            ));
        }
    }

    if !outcome.active_with_worktree_ids.is_empty() {
        lines.push(format!(
            "Skipped {} active worktree session(s)",
            outcome.active_with_worktree_ids.len()
        ));
    }
    if !outcome.conflicted_session_ids.is_empty() {
        lines.push(format!(
            "Skipped {} conflicted worktree(s)",
            outcome.conflicted_session_ids.len()
        ));
    }
    if !outcome.dirty_worktree_ids.is_empty() {
        lines.push(format!(
            "Skipped {} dirty worktree(s)",
            outcome.dirty_worktree_ids.len()
        ));
    }
    if !outcome.blocked_by_queue_session_ids.is_empty() {
        lines.push(format!(
            "Blocked {} worktree(s) on remaining queue conflicts",
            outcome.blocked_by_queue_session_ids.len()
        ));
    }
    if !outcome.failures.is_empty() {
        lines.push(format!(
            "Encountered {} merge failure(s)",
            outcome.failures.len()
        ));
        for failure in &outcome.failures {
            lines.push(format!(
                "- failed {}: {}",
                short_session(&failure.session_id),
                failure.reason
            ));
        }
    }

    lines.join("\n")
}

fn worktree_status_exit_code(report: &WorktreeStatusReport) -> i32 {
    report.check_exit_code
}

fn worktree_status_reports_exit_code(reports: &[WorktreeStatusReport]) -> i32 {
    reports
        .iter()
        .map(worktree_status_exit_code)
        .max()
        .unwrap_or(0)
}

fn worktree_resolution_reports_exit_code(reports: &[WorktreeResolutionReport]) -> i32 {
    reports
        .iter()
        .map(|report| report.check_exit_code)
        .max()
        .unwrap_or(0)
}

fn format_prune_worktrees_human(outcome: &session::manager::WorktreePruneOutcome) -> String {
    let mut lines = Vec::new();

    if outcome.cleaned_session_ids.is_empty() {
        lines.push("Pruned 0 inactive worktree(s)".to_string());
    } else {
        lines.push(format!(
            "Pruned {} inactive worktree(s)",
            outcome.cleaned_session_ids.len()
        ));
        for session_id in &outcome.cleaned_session_ids {
            lines.push(format!("- cleaned {}", short_session(session_id)));
        }
    }

    if outcome.active_with_worktree_ids.is_empty() {
        lines.push("No active sessions are holding worktrees".to_string());
    } else {
        lines.push(format!(
            "Skipped {} active session(s) still holding worktrees",
            outcome.active_with_worktree_ids.len()
        ));
        for session_id in &outcome.active_with_worktree_ids {
            lines.push(format!("- active {}", short_session(session_id)));
        }
    }

    if outcome.retained_session_ids.is_empty() {
        lines.push("No inactive worktrees are being retained".to_string());
    } else {
        lines.push(format!(
            "Deferred {} inactive worktree(s) still within retention",
            outcome.retained_session_ids.len()
        ));
        for session_id in &outcome.retained_session_ids {
            lines.push(format!("- retained {}", short_session(session_id)));
        }
    }

    lines.join("\n")
}

fn format_logged_decision_human(entry: &session::DecisionLogEntry) -> String {
    let mut lines = vec![
        format!("Logged decision for {}", short_session(&entry.session_id)),
        format!("Decision: {}", entry.decision),
        format!("Why: {}", entry.reasoning),
    ];

    if entry.alternatives.is_empty() {
        lines.push("Alternatives: none recorded".to_string());
    } else {
        lines.push("Alternatives:".to_string());
        for alternative in &entry.alternatives {
            lines.push(format!("- {alternative}"));
        }
    }

    lines.push(format!(
        "Recorded at: {}",
        entry.timestamp.format("%Y-%m-%d %H:%M:%S UTC")
    ));
    lines.join("\n")
}

fn format_decisions_human(entries: &[session::DecisionLogEntry], include_session: bool) -> String {
    if entries.is_empty() {
        return if include_session {
            "No decision-log entries across all sessions yet.".to_string()
        } else {
            "No decision-log entries for this session yet.".to_string()
        };
    }

    let mut lines = vec![format!("Decision log: {} entries", entries.len())];
    for entry in entries {
        let prefix = if include_session {
            format!("{} | ", short_session(&entry.session_id))
        } else {
            String::new()
        };
        lines.push(format!(
            "- [{}] {prefix}{}",
            entry.timestamp.format("%H:%M:%S"),
            entry.decision
        ));
        lines.push(format!("  why {}", entry.reasoning));
        if entry.alternatives.is_empty() {
            lines.push("  alternatives none recorded".to_string());
        } else {
            for alternative in &entry.alternatives {
                lines.push(format!("  alternative {alternative}"));
            }
        }
    }

    lines.join("\n")
}

fn format_merge_queue_human(report: &session::manager::MergeQueueReport) -> String {
    let mut lines = Vec::new();
    lines.push(format!(
        "Merge queue: {} ready / {} blocked",
        report.ready_entries.len(),
        report.blocked_entries.len()
    ));

    if report.ready_entries.is_empty() {
        lines.push("No merge-ready worktrees queued".to_string());
    } else {
        lines.push("Ready".to_string());
        for entry in &report.ready_entries {
            lines.push(format!(
                "- #{} {} [{}] | {} / {} | {}",
                entry.queue_position.unwrap_or(0),
                entry.session_id,
                entry.branch,
                entry.project,
                entry.task_group,
                entry.task
            ));
        }
    }

    if !report.blocked_entries.is_empty() {
        lines.push(String::new());
        lines.push("Blocked".to_string());
        for entry in &report.blocked_entries {
            lines.push(format!(
                "- {} [{}] | {} / {} | {}",
                entry.session_id,
                entry.branch,
                entry.project,
                entry.task_group,
                entry.suggested_action
            ));
            for blocker in entry.blocked_by.iter().take(2) {
                lines.push(format!(
                    "  blocker {} [{}] | {}",
                    blocker.session_id, blocker.branch, blocker.summary
                ));
                for conflict in blocker.conflicts.iter().take(3) {
                    lines.push(format!("    conflict {conflict}"));
                }
                if let Some(preview) = blocker.conflicting_patch_preview.as_ref() {
                    for line in preview.lines().take(6) {
                        lines.push(format!("    {}", line));
                    }
                }
            }
        }
    }

    lines.join("\n")
}

fn build_otel_export(
    db: &session::store::StateStore,
    session_id: Option<&str>,
) -> Result<OtlpExport> {
    let sessions = if let Some(session_id) = session_id {
        vec![db
            .get_session(session_id)?
            .ok_or_else(|| anyhow::anyhow!("Session not found: {session_id}"))?]
    } else {
        db.list_sessions()?
    };

    let mut spans = Vec::new();
    for session in &sessions {
        spans.extend(build_session_otel_spans(db, session)?);
    }

    Ok(OtlpExport {
        resource_spans: vec![OtlpResourceSpans {
            resource: OtlpResource {
                attributes: vec![
                    otlp_string_attr("service.name", "ecc2"),
                    otlp_string_attr("service.version", env!("CARGO_PKG_VERSION")),
                    otlp_string_attr("telemetry.sdk.language", "rust"),
                ],
            },
            scope_spans: vec![OtlpScopeSpans {
                scope: OtlpInstrumentationScope {
                    name: "ecc2".to_string(),
                    version: env!("CARGO_PKG_VERSION").to_string(),
                },
                spans,
            }],
        }],
    })
}

fn build_session_otel_spans(
    db: &session::store::StateStore,
    session: &session::Session,
) -> Result<Vec<OtlpSpan>> {
    let trace_id = otlp_trace_id(&session.id);
    let session_span_id = otlp_span_id(&format!("session:{}", session.id));
    let parent_link = db.latest_task_handoff_source(&session.id)?;
    let session_end = session.updated_at.max(session.created_at);
    let mut spans = vec![OtlpSpan {
        trace_id: trace_id.clone(),
        span_id: session_span_id.clone(),
        parent_span_id: None,
        name: format!("session {}", session.task),
        kind: "SPAN_KIND_INTERNAL".to_string(),
        start_time_unix_nano: otlp_timestamp_nanos(session.created_at),
        end_time_unix_nano: otlp_timestamp_nanos(session_end),
        attributes: vec![
            otlp_string_attr("ecc.session.id", &session.id),
            otlp_string_attr("ecc.session.state", &session.state.to_string()),
            otlp_string_attr("ecc.agent.type", &session.agent_type),
            otlp_string_attr("ecc.session.task", &session.task),
            otlp_string_attr(
                "ecc.working_dir",
                session.working_dir.to_string_lossy().as_ref(),
            ),
            otlp_int_attr("ecc.metrics.input_tokens", session.metrics.input_tokens),
            otlp_int_attr("ecc.metrics.output_tokens", session.metrics.output_tokens),
            otlp_int_attr("ecc.metrics.tokens_used", session.metrics.tokens_used),
            otlp_int_attr("ecc.metrics.tool_calls", session.metrics.tool_calls),
            otlp_int_attr(
                "ecc.metrics.files_changed",
                u64::from(session.metrics.files_changed),
            ),
            otlp_int_attr("ecc.metrics.duration_secs", session.metrics.duration_secs),
            otlp_double_attr("ecc.metrics.cost_usd", session.metrics.cost_usd),
        ],
        links: parent_link
            .into_iter()
            .map(|parent_session_id| OtlpSpanLink {
                trace_id: otlp_trace_id(&parent_session_id),
                span_id: otlp_span_id(&format!("session:{parent_session_id}")),
                attributes: vec![otlp_string_attr(
                    "ecc.parent_session.id",
                    &parent_session_id,
                )],
            })
            .collect(),
        status: otlp_session_status(&session.state),
    }];

    for entry in db.list_tool_logs_for_session(&session.id)? {
        let span_end = chrono::DateTime::parse_from_rfc3339(&entry.timestamp)
            .unwrap_or_else(|_| session.updated_at.into())
            .with_timezone(&chrono::Utc);
        let span_start = span_end - chrono::Duration::milliseconds(entry.duration_ms as i64);

        spans.push(OtlpSpan {
            trace_id: trace_id.clone(),
            span_id: otlp_span_id(&format!("tool:{}:{}", session.id, entry.id)),
            parent_span_id: Some(session_span_id.clone()),
            name: format!("tool {}", entry.tool_name),
            kind: "SPAN_KIND_INTERNAL".to_string(),
            start_time_unix_nano: otlp_timestamp_nanos(span_start),
            end_time_unix_nano: otlp_timestamp_nanos(span_end),
            attributes: vec![
                otlp_string_attr("ecc.session.id", &entry.session_id),
                otlp_string_attr("tool.name", &entry.tool_name),
                otlp_string_attr("tool.input_summary", &entry.input_summary),
                otlp_string_attr("tool.output_summary", &entry.output_summary),
                otlp_string_attr("tool.trigger_summary", &entry.trigger_summary),
                otlp_string_attr("tool.input_params_json", &entry.input_params_json),
                otlp_int_attr("tool.duration_ms", entry.duration_ms),
                otlp_double_attr("tool.risk_score", entry.risk_score),
            ],
            links: Vec::new(),
            status: OtlpSpanStatus {
                code: "STATUS_CODE_UNSET".to_string(),
                message: None,
            },
        });
    }

    Ok(spans)
}

fn otlp_timestamp_nanos(value: chrono::DateTime<chrono::Utc>) -> String {
    value
        .timestamp_nanos_opt()
        .unwrap_or_default()
        .max(0)
        .to_string()
}

fn otlp_trace_id(seed: &str) -> String {
    format!(
        "{:016x}{:016x}",
        fnv1a64(seed.as_bytes()),
        fnv1a64_with_seed(seed.as_bytes(), 1099511628211)
    )
}

fn otlp_span_id(seed: &str) -> String {
    format!("{:016x}", fnv1a64(seed.as_bytes()))
}

fn fnv1a64(bytes: &[u8]) -> u64 {
    fnv1a64_with_seed(bytes, 14695981039346656037)
}

fn fnv1a64_with_seed(bytes: &[u8], offset_basis: u64) -> u64 {
    let mut hash = offset_basis;
    for byte in bytes {
        hash ^= u64::from(*byte);
        hash = hash.wrapping_mul(1099511628211);
    }
    hash
}

fn otlp_string_attr(key: &str, value: &str) -> OtlpKeyValue {
    OtlpKeyValue {
        key: key.to_string(),
        value: OtlpAnyValue {
            string_value: Some(value.to_string()),
            int_value: None,
            double_value: None,
            bool_value: None,
        },
    }
}

fn otlp_int_attr(key: &str, value: u64) -> OtlpKeyValue {
    OtlpKeyValue {
        key: key.to_string(),
        value: OtlpAnyValue {
            string_value: None,
            int_value: Some(value.to_string()),
            double_value: None,
            bool_value: None,
        },
    }
}

fn otlp_double_attr(key: &str, value: f64) -> OtlpKeyValue {
    OtlpKeyValue {
        key: key.to_string(),
        value: OtlpAnyValue {
            string_value: None,
            int_value: None,
            double_value: Some(value),
            bool_value: None,
        },
    }
}

fn otlp_session_status(state: &session::SessionState) -> OtlpSpanStatus {
    match state {
        session::SessionState::Completed => OtlpSpanStatus {
            code: "STATUS_CODE_OK".to_string(),
            message: None,
        },
        session::SessionState::Failed => OtlpSpanStatus {
            code: "STATUS_CODE_ERROR".to_string(),
            message: Some("session failed".to_string()),
        },
        _ => OtlpSpanStatus {
            code: "STATUS_CODE_UNSET".to_string(),
            message: None,
        },
    }
}

fn summarize_coordinate_backlog(
    outcome: &session::manager::CoordinateBacklogOutcome,
) -> CoordinateBacklogPassSummary {
    let total_processed: usize = outcome
        .dispatched
        .iter()
        .map(|dispatch| dispatch.routed.len())
        .sum();
    let total_routed: usize = outcome
        .dispatched
        .iter()
        .map(|dispatch| {
            dispatch
                .routed
                .iter()
                .filter(|item| session::manager::assignment_action_routes_work(item.action))
                .count()
        })
        .sum();
    let total_deferred = total_processed.saturating_sub(total_routed);
    let total_rerouted: usize = outcome
        .rebalanced
        .iter()
        .map(|rebalance| rebalance.rerouted.len())
        .sum();

    let message = if total_routed == 0
        && total_rerouted == 0
        && outcome.remaining_backlog_sessions == 0
    {
        "Backlog already clear".to_string()
    } else {
        format!(
            "Coordinated backlog: processed {} handoff(s) across {} lead(s) ({} routed, {} deferred); rebalanced {} handoff(s) across {} lead(s); remaining {} handoff(s) across {} session(s) [{} absorbable, {} saturated]",
            total_processed,
            outcome.dispatched.len(),
            total_routed,
            total_deferred,
            total_rerouted,
            outcome.rebalanced.len(),
            outcome.remaining_backlog_messages,
            outcome.remaining_backlog_sessions,
            outcome.remaining_absorbable_sessions,
            outcome.remaining_saturated_sessions
        )
    };

    CoordinateBacklogPassSummary {
        pass: 0,
        processed: total_processed,
        routed: total_routed,
        deferred: total_deferred,
        rerouted: total_rerouted,
        dispatched_leads: outcome.dispatched.len(),
        rebalanced_leads: outcome.rebalanced.len(),
        remaining_backlog_sessions: outcome.remaining_backlog_sessions,
        remaining_backlog_messages: outcome.remaining_backlog_messages,
        remaining_absorbable_sessions: outcome.remaining_absorbable_sessions,
        remaining_saturated_sessions: outcome.remaining_saturated_sessions,
        message,
    }
}

fn coordination_status_exit_code(status: &session::manager::CoordinationStatus) -> i32 {
    match status.health {
        session::manager::CoordinationHealth::Healthy => 0,
        session::manager::CoordinationHealth::BacklogAbsorbable => 1,
        session::manager::CoordinationHealth::Saturated
        | session::manager::CoordinationHealth::EscalationRequired => 2,
    }
}

fn send_handoff_message(db: &session::store::StateStore, from_id: &str, to_id: &str) -> Result<()> {
    let from_session = db
        .get_session(from_id)?
        .ok_or_else(|| anyhow::anyhow!("Session not found: {from_id}"))?;
    let context = format!(
        "Delegated from {} [{}] | cwd {}{}",
        short_session(&from_session.id),
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
            .unwrap_or_default()
    );

    comms::send(
        db,
        &from_session.id,
        to_id,
        &comms::MessageType::TaskHandoff {
            task: from_session.task,
            context,
        },
    )
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::config::Config;
    use crate::session::store::StateStore;
    use crate::session::{Session, SessionMetrics, SessionState};
    use chrono::{Duration, Utc};
    use std::fs;
    use std::path::{Path, PathBuf};

    struct TestDir {
        path: PathBuf,
    }

    impl TestDir {
        fn new(label: &str) -> Result<Self> {
            let path =
                std::env::temp_dir().join(format!("ecc2-main-{label}-{}", uuid::Uuid::new_v4()));
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

    fn build_session(id: &str, task: &str, state: SessionState) -> Session {
        let now = Utc::now();
        Session {
            id: id.to_string(),
            task: task.to_string(),
            project: "workspace".to_string(),
            task_group: "general".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp/ecc"),
            state,
            pid: None,
            worktree: None,
            created_at: now - Duration::seconds(5),
            updated_at: now,
            last_heartbeat_at: now,
            metrics: SessionMetrics {
                input_tokens: 120,
                output_tokens: 30,
                tokens_used: 150,
                tool_calls: 2,
                files_changed: 1,
                duration_secs: 5,
                cost_usd: 0.42,
            },
        }
    }

    fn attr_value<'a>(attrs: &'a [OtlpKeyValue], key: &str) -> Option<&'a OtlpAnyValue> {
        attrs
            .iter()
            .find(|attr| attr.key == key)
            .map(|attr| &attr.value)
    }

    #[test]
    fn worktree_policy_defaults_to_config_setting() {
        let mut cfg = Config::default();
        let policy = WorktreePolicyArgs::default();

        assert!(policy.resolve(&cfg));

        cfg.auto_create_worktrees = false;
        assert!(!policy.resolve(&cfg));
    }

    #[test]
    fn worktree_policy_explicit_flags_override_config_setting() {
        let mut cfg = Config::default();
        cfg.auto_create_worktrees = false;

        assert!(WorktreePolicyArgs {
            worktree: true,
            no_worktree: false,
        }
        .resolve(&cfg));

        cfg.auto_create_worktrees = true;
        assert!(!WorktreePolicyArgs {
            worktree: false,
            no_worktree: true,
        }
        .resolve(&cfg));
    }

    #[test]
    fn cli_parses_resume_command() {
        let cli = Cli::try_parse_from(["ecc", "resume", "deadbeef"])
            .expect("resume subcommand should parse");

        match cli.command {
            Some(Commands::Resume { session_id }) => assert_eq!(session_id, "deadbeef"),
            _ => panic!("expected resume subcommand"),
        }
    }

    #[test]
    fn cli_parses_export_otel_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "export-otel",
            "worker-1234",
            "--output",
            "/tmp/ecc-otel.json",
        ])
        .expect("export-otel should parse");

        match cli.command {
            Some(Commands::ExportOtel { session_id, output }) => {
                assert_eq!(session_id.as_deref(), Some("worker-1234"));
                assert_eq!(output.as_deref(), Some(Path::new("/tmp/ecc-otel.json")));
            }
            _ => panic!("expected export-otel subcommand"),
        }
    }

    #[test]
    fn cli_parses_messages_send_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "messages",
            "send",
            "--from",
            "planner",
            "--to",
            "worker",
            "--kind",
            "query",
            "--text",
            "Need context",
        ])
        .expect("messages send should parse");

        match cli.command {
            Some(Commands::Messages {
                command:
                    MessageCommands::Send {
                        from,
                        to,
                        kind,
                        text,
                        ..
                    },
            }) => {
                assert_eq!(from, "planner");
                assert_eq!(to, "worker");
                assert!(matches!(kind, MessageKindArg::Query));
                assert_eq!(text, "Need context");
            }
            _ => panic!("expected messages send subcommand"),
        }
    }

    #[test]
    fn cli_parses_start_with_handoff_source() {
        let cli = Cli::try_parse_from([
            "ecc",
            "start",
            "--task",
            "Follow up",
            "--agent",
            "claude",
            "--from-session",
            "planner",
        ])
        .expect("start with handoff source should parse");

        match cli.command {
            Some(Commands::Start {
                from_session,
                task,
                agent,
                ..
            }) => {
                assert_eq!(task, "Follow up");
                assert_eq!(agent, "claude");
                assert_eq!(from_session.as_deref(), Some("planner"));
            }
            _ => panic!("expected start subcommand"),
        }
    }

    #[test]
    fn cli_parses_start_no_worktree_override() {
        let cli = Cli::try_parse_from(["ecc", "start", "--task", "Follow up", "--no-worktree"])
            .expect("start --no-worktree should parse");

        match cli.command {
            Some(Commands::Start { worktree, .. }) => {
                assert!(!worktree.worktree);
                assert!(worktree.no_worktree);
            }
            _ => panic!("expected start subcommand"),
        }
    }

    #[test]
    fn cli_parses_delegate_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "delegate",
            "planner",
            "--task",
            "Review auth changes",
            "--agent",
            "codex",
        ])
        .expect("delegate should parse");

        match cli.command {
            Some(Commands::Delegate {
                from_session,
                task,
                agent,
                ..
            }) => {
                assert_eq!(from_session, "planner");
                assert_eq!(task.as_deref(), Some("Review auth changes"));
                assert_eq!(agent, "codex");
            }
            _ => panic!("expected delegate subcommand"),
        }
    }

    #[test]
    fn cli_parses_delegate_worktree_override() {
        let cli = Cli::try_parse_from(["ecc", "delegate", "planner", "--worktree"])
            .expect("delegate --worktree should parse");

        match cli.command {
            Some(Commands::Delegate { worktree, .. }) => {
                assert!(worktree.worktree);
                assert!(!worktree.no_worktree);
            }
            _ => panic!("expected delegate subcommand"),
        }
    }

    #[test]
    fn cli_parses_team_command() {
        let cli = Cli::try_parse_from(["ecc", "team", "planner", "--depth", "3"])
            .expect("team should parse");

        match cli.command {
            Some(Commands::Team { session_id, depth }) => {
                assert_eq!(session_id.as_deref(), Some("planner"));
                assert_eq!(depth, 3);
            }
            _ => panic!("expected team subcommand"),
        }
    }

    #[test]
    fn cli_parses_worktree_status_command() {
        let cli = Cli::try_parse_from(["ecc", "worktree-status", "planner"])
            .expect("worktree-status should parse");

        match cli.command {
            Some(Commands::WorktreeStatus {
                session_id,
                all,
                json,
                patch,
                check,
            }) => {
                assert_eq!(session_id.as_deref(), Some("planner"));
                assert!(!all);
                assert!(!json);
                assert!(!patch);
                assert!(!check);
            }
            _ => panic!("expected worktree-status subcommand"),
        }
    }

    #[test]
    fn cli_parses_worktree_status_json_flag() {
        let cli = Cli::try_parse_from(["ecc", "worktree-status", "--json"])
            .expect("worktree-status --json should parse");

        match cli.command {
            Some(Commands::WorktreeStatus {
                session_id,
                all,
                json,
                patch,
                check,
            }) => {
                assert_eq!(session_id, None);
                assert!(!all);
                assert!(json);
                assert!(!patch);
                assert!(!check);
            }
            _ => panic!("expected worktree-status subcommand"),
        }
    }

    #[test]
    fn cli_parses_worktree_status_all_flag() {
        let cli = Cli::try_parse_from(["ecc", "worktree-status", "--all"])
            .expect("worktree-status --all should parse");

        match cli.command {
            Some(Commands::WorktreeStatus {
                session_id,
                all,
                json,
                patch,
                check,
            }) => {
                assert_eq!(session_id, None);
                assert!(all);
                assert!(!json);
                assert!(!patch);
                assert!(!check);
            }
            _ => panic!("expected worktree-status subcommand"),
        }
    }

    #[test]
    fn cli_parses_worktree_status_session_id_with_all_flag() {
        let err = Cli::try_parse_from(["ecc", "worktree-status", "planner", "--all"])
            .expect("worktree-status planner --all should parse");

        let command = err.command.expect("expected command");
        let Commands::WorktreeStatus {
            session_id, all, ..
        } = command
        else {
            panic!("expected worktree-status subcommand");
        };

        assert_eq!(session_id.as_deref(), Some("planner"));
        assert!(all);
    }

    #[test]
    fn format_worktree_status_reports_human_joins_multiple_reports() {
        let reports = vec![
            WorktreeStatusReport {
                session_id: "sess-a".to_string(),
                task: "first".to_string(),
                session_state: "running".to_string(),
                health: "in_progress".to_string(),
                check_exit_code: 1,
                patch_included: false,
                attached: false,
                path: None,
                branch: None,
                base_branch: None,
                diff_summary: None,
                file_preview: Vec::new(),
                patch_preview: None,
                merge_readiness: None,
            },
            WorktreeStatusReport {
                session_id: "sess-b".to_string(),
                task: "second".to_string(),
                session_state: "stopped".to_string(),
                health: "clear".to_string(),
                check_exit_code: 0,
                patch_included: false,
                attached: false,
                path: None,
                branch: None,
                base_branch: None,
                diff_summary: None,
                file_preview: Vec::new(),
                patch_preview: None,
                merge_readiness: None,
            },
        ];

        let text = format_worktree_status_reports_human(&reports);
        assert!(text.contains("Worktree status for sess-a [running]"));
        assert!(text.contains("Worktree status for sess-b [stopped]"));
        assert!(text.contains("\n\nWorktree status for sess-b [stopped]"));
    }

    #[test]
    fn cli_parses_worktree_status_patch_flag() {
        let cli = Cli::try_parse_from(["ecc", "worktree-status", "--patch"])
            .expect("worktree-status --patch should parse");

        match cli.command {
            Some(Commands::WorktreeStatus {
                session_id,
                all,
                json,
                patch,
                check,
            }) => {
                assert_eq!(session_id, None);
                assert!(!all);
                assert!(!json);
                assert!(patch);
                assert!(!check);
            }
            _ => panic!("expected worktree-status subcommand"),
        }
    }

    #[test]
    fn build_otel_export_includes_session_and_tool_spans() -> Result<()> {
        let tempdir = TestDir::new("otel-export-session")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let session = build_session("session-1", "Investigate export", SessionState::Completed);
        db.insert_session(&session)?;
        db.insert_tool_log(
            &session.id,
            "Write",
            "Write src/lib.rs",
            "{\"file\":\"src/lib.rs\"}",
            "Updated file",
            "manual test",
            120,
            0.75,
            &Utc::now().to_rfc3339(),
        )?;

        let export = build_otel_export(&db, Some("session-1"))?;
        let spans = &export.resource_spans[0].scope_spans[0].spans;
        assert_eq!(spans.len(), 2);

        let session_span = spans
            .iter()
            .find(|span| span.parent_span_id.is_none())
            .expect("session root span");
        let tool_span = spans
            .iter()
            .find(|span| span.parent_span_id.is_some())
            .expect("tool child span");

        assert_eq!(session_span.trace_id, tool_span.trace_id);
        assert_eq!(
            tool_span.parent_span_id.as_deref(),
            Some(session_span.span_id.as_str())
        );
        assert_eq!(session_span.status.code, "STATUS_CODE_OK");
        assert_eq!(
            attr_value(&session_span.attributes, "ecc.session.id")
                .and_then(|value| value.string_value.as_deref()),
            Some("session-1")
        );
        assert_eq!(
            attr_value(&tool_span.attributes, "tool.name")
                .and_then(|value| value.string_value.as_deref()),
            Some("Write")
        );
        assert_eq!(
            attr_value(&tool_span.attributes, "tool.duration_ms")
                .and_then(|value| value.int_value.as_deref()),
            Some("120")
        );

        Ok(())
    }

    #[test]
    fn build_otel_export_links_delegated_session_to_parent_trace() -> Result<()> {
        let tempdir = TestDir::new("otel-export-parent-link")?;
        let db = StateStore::open(&tempdir.path().join("state.db"))?;
        let parent = build_session("lead-1", "Lead task", SessionState::Running);
        let child = build_session("worker-1", "Delegated task", SessionState::Running);
        db.insert_session(&parent)?;
        db.insert_session(&child)?;
        db.send_message(
            &parent.id,
            &child.id,
            "{\"task\":\"Delegated task\",\"context\":\"Delegated from lead\"}",
            "task_handoff",
        )?;

        let export = build_otel_export(&db, Some("worker-1"))?;
        let session_span = export.resource_spans[0].scope_spans[0]
            .spans
            .iter()
            .find(|span| span.parent_span_id.is_none())
            .expect("session root span");

        assert_eq!(session_span.links.len(), 1);
        assert_eq!(session_span.links[0].trace_id, otlp_trace_id("lead-1"));
        assert_eq!(
            session_span.links[0].span_id,
            otlp_span_id("session:lead-1")
        );
        assert_eq!(
            attr_value(&session_span.links[0].attributes, "ecc.parent_session.id")
                .and_then(|value| value.string_value.as_deref()),
            Some("lead-1")
        );

        Ok(())
    }

    #[test]
    fn cli_parses_worktree_status_check_flag() {
        let cli = Cli::try_parse_from(["ecc", "worktree-status", "--check"])
            .expect("worktree-status --check should parse");

        match cli.command {
            Some(Commands::WorktreeStatus {
                session_id,
                all,
                json,
                patch,
                check,
            }) => {
                assert_eq!(session_id, None);
                assert!(!all);
                assert!(!json);
                assert!(!patch);
                assert!(check);
            }
            _ => panic!("expected worktree-status subcommand"),
        }
    }

    #[test]
    fn cli_parses_worktree_resolution_flags() {
        let cli =
            Cli::try_parse_from(["ecc", "worktree-resolution", "planner", "--json", "--check"])
                .expect("worktree-resolution flags should parse");

        match cli.command {
            Some(Commands::WorktreeResolution {
                session_id,
                all,
                json,
                check,
            }) => {
                assert_eq!(session_id.as_deref(), Some("planner"));
                assert!(!all);
                assert!(json);
                assert!(check);
            }
            _ => panic!("expected worktree-resolution subcommand"),
        }
    }

    #[test]
    fn cli_parses_worktree_resolution_all_flag() {
        let cli = Cli::try_parse_from(["ecc", "worktree-resolution", "--all"])
            .expect("worktree-resolution --all should parse");

        match cli.command {
            Some(Commands::WorktreeResolution {
                session_id,
                all,
                json,
                check,
            }) => {
                assert!(session_id.is_none());
                assert!(all);
                assert!(!json);
                assert!(!check);
            }
            _ => panic!("expected worktree-resolution subcommand"),
        }
    }

    #[test]
    fn cli_parses_prune_worktrees_json_flag() {
        let cli = Cli::try_parse_from(["ecc", "prune-worktrees", "--json"])
            .expect("prune-worktrees --json should parse");

        match cli.command {
            Some(Commands::PruneWorktrees { json }) => {
                assert!(json);
            }
            _ => panic!("expected prune-worktrees subcommand"),
        }
    }

    #[test]
    fn cli_parses_merge_worktree_flags() {
        let cli = Cli::try_parse_from([
            "ecc",
            "merge-worktree",
            "deadbeef",
            "--json",
            "--keep-worktree",
        ])
        .expect("merge-worktree flags should parse");

        match cli.command {
            Some(Commands::MergeWorktree {
                session_id,
                all,
                json,
                keep_worktree,
            }) => {
                assert_eq!(session_id.as_deref(), Some("deadbeef"));
                assert!(!all);
                assert!(json);
                assert!(keep_worktree);
            }
            _ => panic!("expected merge-worktree subcommand"),
        }
    }

    #[test]
    fn cli_parses_merge_worktree_all_flags() {
        let cli = Cli::try_parse_from(["ecc", "merge-worktree", "--all", "--json"])
            .expect("merge-worktree --all --json should parse");

        match cli.command {
            Some(Commands::MergeWorktree {
                session_id,
                all,
                json,
                keep_worktree,
            }) => {
                assert!(session_id.is_none());
                assert!(all);
                assert!(json);
                assert!(!keep_worktree);
            }
            _ => panic!("expected merge-worktree subcommand"),
        }
    }

    #[test]
    fn cli_parses_merge_queue_json_flag() {
        let cli = Cli::try_parse_from(["ecc", "merge-queue", "--json"])
            .expect("merge-queue --json should parse");

        match cli.command {
            Some(Commands::MergeQueue { json, apply }) => {
                assert!(json);
                assert!(!apply);
            }
            _ => panic!("expected merge-queue subcommand"),
        }
    }

    #[test]
    fn cli_parses_merge_queue_apply_flag() {
        let cli = Cli::try_parse_from(["ecc", "merge-queue", "--apply", "--json"])
            .expect("merge-queue --apply --json should parse");

        match cli.command {
            Some(Commands::MergeQueue { json, apply }) => {
                assert!(json);
                assert!(apply);
            }
            _ => panic!("expected merge-queue subcommand"),
        }
    }

    #[test]
    fn format_worktree_status_human_includes_readiness_and_conflicts() {
        let report = WorktreeStatusReport {
            session_id: "deadbeefcafefeed".to_string(),
            task: "Review merge readiness".to_string(),
            session_state: "running".to_string(),
            health: "conflicted".to_string(),
            check_exit_code: 2,
            patch_included: true,
            attached: true,
            path: Some("/tmp/ecc/wt-1".to_string()),
            branch: Some("ecc/deadbeefcafefeed".to_string()),
            base_branch: Some("main".to_string()),
            diff_summary: Some("Branch 1 file changed, 2 insertions(+)".to_string()),
            file_preview: vec!["Branch M README.md".to_string()],
            patch_preview: Some("--- Branch diff vs main ---\n+hello".to_string()),
            merge_readiness: Some(WorktreeMergeReadinessReport {
                status: "conflicted".to_string(),
                summary: "Merge blocked by 1 conflict(s): README.md".to_string(),
                conflicts: vec!["README.md".to_string()],
            }),
        };

        let text = format_worktree_status_human(&report);
        assert!(text.contains("Worktree status for deadbeef [running]"));
        assert!(text.contains("Branch ecc/deadbeefcafefeed (base main)"));
        assert!(text.contains("Health conflicted"));
        assert!(text.contains("Branch M README.md"));
        assert!(text.contains("Merge blocked by 1 conflict(s): README.md"));
        assert!(text.contains("- conflict README.md"));
        assert!(text.contains("Patch preview"));
        assert!(text.contains("--- Branch diff vs main ---"));
    }

    #[test]
    fn format_worktree_resolution_human_includes_protocol_steps() {
        let report = WorktreeResolutionReport {
            session_id: "deadbeefcafefeed".to_string(),
            task: "Resolve merge conflict".to_string(),
            session_state: "stopped".to_string(),
            attached: true,
            conflicted: true,
            check_exit_code: 2,
            path: Some("/tmp/ecc/wt-1".to_string()),
            branch: Some("ecc/deadbeefcafefeed".to_string()),
            base_branch: Some("main".to_string()),
            summary: "Merge blocked by 1 conflict(s): README.md".to_string(),
            conflicts: vec!["README.md".to_string()],
            resolution_steps: vec![
                "Inspect current patch: ecc worktree-status deadbeefcafefeed --patch".to_string(),
                "Open worktree: cd /tmp/ecc/wt-1".to_string(),
                "Resolve conflicts and stage files: git add <paths>".to_string(),
            ],
        };

        let text = format_worktree_resolution_human(&report);
        assert!(text.contains("Worktree resolution for deadbeef [stopped]"));
        assert!(text.contains("Merge blocked by 1 conflict(s): README.md"));
        assert!(text.contains("Conflicts"));
        assert!(text.contains("- README.md"));
        assert!(text.contains("Resolution steps"));
        assert!(text.contains("1. Inspect current patch"));
    }

    #[test]
    fn worktree_resolution_reports_exit_code_tracks_conflicts() {
        let clear = WorktreeResolutionReport {
            session_id: "clear".to_string(),
            task: "ok".to_string(),
            session_state: "stopped".to_string(),
            attached: false,
            conflicted: false,
            check_exit_code: 0,
            path: None,
            branch: None,
            base_branch: None,
            summary: "No worktree attached".to_string(),
            conflicts: Vec::new(),
            resolution_steps: Vec::new(),
        };
        let conflicted = WorktreeResolutionReport {
            session_id: "conflicted".to_string(),
            task: "resolve".to_string(),
            session_state: "failed".to_string(),
            attached: true,
            conflicted: true,
            check_exit_code: 2,
            path: Some("/tmp/ecc/wt-2".to_string()),
            branch: Some("ecc/conflicted".to_string()),
            base_branch: Some("main".to_string()),
            summary: "Merge blocked by 1 conflict(s): src/lib.rs".to_string(),
            conflicts: vec!["src/lib.rs".to_string()],
            resolution_steps: vec!["Inspect current patch".to_string()],
        };

        assert_eq!(worktree_resolution_reports_exit_code(&[clear]), 0);
        assert_eq!(worktree_resolution_reports_exit_code(&[conflicted]), 2);
    }

    #[test]
    fn format_prune_worktrees_human_reports_cleaned_and_active_sessions() {
        let text = format_prune_worktrees_human(&session::manager::WorktreePruneOutcome {
            cleaned_session_ids: vec!["deadbeefcafefeed".to_string()],
            active_with_worktree_ids: vec!["facefeed12345678".to_string()],
            retained_session_ids: vec!["retain1234567890".to_string()],
        });

        assert!(text.contains("Pruned 1 inactive worktree(s)"));
        assert!(text.contains("- cleaned deadbeef"));
        assert!(text.contains("Skipped 1 active session(s) still holding worktrees"));
        assert!(text.contains("- active facefeed"));
        assert!(text.contains("Deferred 1 inactive worktree(s) still within retention"));
        assert!(text.contains("- retained retain12"));
    }

    #[test]
    fn format_worktree_merge_human_reports_merge_and_cleanup() {
        let text = format_worktree_merge_human(&session::manager::WorktreeMergeOutcome {
            session_id: "deadbeefcafefeed".to_string(),
            branch: "ecc/deadbeef".to_string(),
            base_branch: "main".to_string(),
            already_up_to_date: false,
            cleaned_worktree: true,
        });

        assert!(text.contains("Merged worktree for deadbeef"));
        assert!(text.contains("Branch ecc/deadbeef -> main"));
        assert!(text.contains("Result merged into base"));
        assert!(text.contains("Cleanup removed worktree and branch"));
    }

    #[test]
    fn format_merge_queue_human_reports_ready_and_blocked_entries() {
        let text = format_merge_queue_human(&session::manager::MergeQueueReport {
            ready_entries: vec![session::manager::MergeQueueEntry {
                session_id: "alpha1234".to_string(),
                task: "merge alpha".to_string(),
                project: "ecc".to_string(),
                task_group: "checkout".to_string(),
                branch: "ecc/alpha1234".to_string(),
                base_branch: "main".to_string(),
                state: session::SessionState::Stopped,
                worktree_health: worktree::WorktreeHealth::InProgress,
                dirty: false,
                queue_position: Some(1),
                ready_to_merge: true,
                blocked_by: Vec::new(),
                suggested_action: "merge in queue order #1".to_string(),
            }],
            blocked_entries: vec![session::manager::MergeQueueEntry {
                session_id: "beta5678".to_string(),
                task: "merge beta".to_string(),
                project: "ecc".to_string(),
                task_group: "checkout".to_string(),
                branch: "ecc/beta5678".to_string(),
                base_branch: "main".to_string(),
                state: session::SessionState::Stopped,
                worktree_health: worktree::WorktreeHealth::InProgress,
                dirty: false,
                queue_position: None,
                ready_to_merge: false,
                blocked_by: vec![session::manager::MergeQueueBlocker {
                    session_id: "alpha1234".to_string(),
                    branch: "ecc/alpha1234".to_string(),
                    state: session::SessionState::Stopped,
                    conflicts: vec!["README.md".to_string()],
                    summary: "merge after alpha1234 to avoid branch conflicts".to_string(),
                    conflicting_patch_preview: Some(
                        "--- Branch diff vs main ---\nREADME.md".to_string(),
                    ),
                    blocker_patch_preview: None,
                }],
                suggested_action: "merge after alpha1234".to_string(),
            }],
        });

        assert!(text.contains("Merge queue: 1 ready / 1 blocked"));
        assert!(text.contains("Ready"));
        assert!(text.contains("#1 alpha1234"));
        assert!(text.contains("Blocked"));
        assert!(text.contains("beta5678"));
        assert!(text.contains("blocker alpha1234"));
        assert!(text.contains("conflict README.md"));
    }

    #[test]
    fn format_bulk_worktree_merge_human_reports_summary_and_skips() {
        let text = format_bulk_worktree_merge_human(&session::manager::WorktreeBulkMergeOutcome {
            merged: vec![session::manager::WorktreeMergeOutcome {
                session_id: "deadbeefcafefeed".to_string(),
                branch: "ecc/deadbeefcafefeed".to_string(),
                base_branch: "main".to_string(),
                already_up_to_date: false,
                cleaned_worktree: true,
            }],
            rebased: vec![session::manager::WorktreeRebaseOutcome {
                session_id: "rebased12345678".to_string(),
                branch: "ecc/rebased12345678".to_string(),
                base_branch: "main".to_string(),
                already_up_to_date: false,
            }],
            active_with_worktree_ids: vec!["running12345678".to_string()],
            conflicted_session_ids: vec!["conflict123456".to_string()],
            dirty_worktree_ids: vec!["dirty123456789".to_string()],
            blocked_by_queue_session_ids: vec!["queue123456789".to_string()],
            failures: vec![session::manager::WorktreeMergeFailure {
                session_id: "fail1234567890".to_string(),
                reason: "base branch not checked out".to_string(),
            }],
        });

        assert!(text.contains("Merged 1 ready worktree(s)"));
        assert!(text.contains("- merged ecc/deadbeefcafefeed -> main for deadbeef"));
        assert!(text.contains("Rebased 1 blocked worktree(s) onto their base branch"));
        assert!(text.contains("- rebased ecc/rebased12345678 onto main for rebased1"));
        assert!(text.contains("Skipped 1 active worktree session(s)"));
        assert!(text.contains("Skipped 1 conflicted worktree(s)"));
        assert!(text.contains("Skipped 1 dirty worktree(s)"));
        assert!(text.contains("Blocked 1 worktree(s) on remaining queue conflicts"));
        assert!(text.contains("Encountered 1 merge failure(s)"));
        assert!(text.contains("- failed fail1234: base branch not checked out"));
    }

    #[test]
    fn format_worktree_status_human_handles_missing_worktree() {
        let report = WorktreeStatusReport {
            session_id: "deadbeefcafefeed".to_string(),
            task: "No worktree here".to_string(),
            session_state: "stopped".to_string(),
            health: "clear".to_string(),
            check_exit_code: 0,
            patch_included: true,
            attached: false,
            path: None,
            branch: None,
            base_branch: None,
            diff_summary: None,
            file_preview: Vec::new(),
            patch_preview: None,
            merge_readiness: None,
        };

        let text = format_worktree_status_human(&report);
        assert!(text.contains("Worktree status for deadbeef [stopped]"));
        assert!(text.contains("Task No worktree here"));
        assert!(text.contains("Health clear"));
        assert!(text.contains("No worktree attached"));
    }

    #[test]
    fn worktree_status_exit_code_tracks_health() {
        let clear = WorktreeStatusReport {
            session_id: "a".to_string(),
            task: "clear".to_string(),
            session_state: "idle".to_string(),
            health: "clear".to_string(),
            check_exit_code: 0,
            patch_included: false,
            attached: false,
            path: None,
            branch: None,
            base_branch: None,
            diff_summary: None,
            file_preview: Vec::new(),
            patch_preview: None,
            merge_readiness: None,
        };
        let in_progress = WorktreeStatusReport {
            session_id: "b".to_string(),
            task: "progress".to_string(),
            session_state: "running".to_string(),
            health: "in_progress".to_string(),
            check_exit_code: 1,
            patch_included: false,
            attached: true,
            path: Some("/tmp/ecc/wt-2".to_string()),
            branch: Some("ecc/b".to_string()),
            base_branch: Some("main".to_string()),
            diff_summary: Some("Branch 1 file changed".to_string()),
            file_preview: vec!["Branch M README.md".to_string()],
            patch_preview: None,
            merge_readiness: Some(WorktreeMergeReadinessReport {
                status: "ready".to_string(),
                summary: "Merge ready into main".to_string(),
                conflicts: Vec::new(),
            }),
        };
        let conflicted = WorktreeStatusReport {
            session_id: "c".to_string(),
            task: "conflict".to_string(),
            session_state: "running".to_string(),
            health: "conflicted".to_string(),
            check_exit_code: 2,
            patch_included: false,
            attached: true,
            path: Some("/tmp/ecc/wt-3".to_string()),
            branch: Some("ecc/c".to_string()),
            base_branch: Some("main".to_string()),
            diff_summary: Some("Branch 1 file changed".to_string()),
            file_preview: vec!["Branch M README.md".to_string()],
            patch_preview: None,
            merge_readiness: Some(WorktreeMergeReadinessReport {
                status: "conflicted".to_string(),
                summary: "Merge blocked by 1 conflict(s): README.md".to_string(),
                conflicts: vec!["README.md".to_string()],
            }),
        };

        assert_eq!(worktree_status_exit_code(&clear), 0);
        assert_eq!(worktree_status_exit_code(&in_progress), 1);
        assert_eq!(worktree_status_exit_code(&conflicted), 2);
    }

    #[test]
    fn worktree_status_reports_exit_code_uses_highest_severity() {
        let reports = vec![
            WorktreeStatusReport {
                session_id: "sess-a".to_string(),
                task: "first".to_string(),
                session_state: "running".to_string(),
                health: "clear".to_string(),
                check_exit_code: 0,
                patch_included: false,
                attached: false,
                path: None,
                branch: None,
                base_branch: None,
                diff_summary: None,
                file_preview: Vec::new(),
                patch_preview: None,
                merge_readiness: None,
            },
            WorktreeStatusReport {
                session_id: "sess-b".to_string(),
                task: "second".to_string(),
                session_state: "running".to_string(),
                health: "in_progress".to_string(),
                check_exit_code: 1,
                patch_included: false,
                attached: false,
                path: None,
                branch: None,
                base_branch: None,
                diff_summary: None,
                file_preview: Vec::new(),
                patch_preview: None,
                merge_readiness: None,
            },
            WorktreeStatusReport {
                session_id: "sess-c".to_string(),
                task: "third".to_string(),
                session_state: "running".to_string(),
                health: "conflicted".to_string(),
                check_exit_code: 2,
                patch_included: false,
                attached: false,
                path: None,
                branch: None,
                base_branch: None,
                diff_summary: None,
                file_preview: Vec::new(),
                patch_preview: None,
                merge_readiness: None,
            },
        ];

        assert_eq!(worktree_status_reports_exit_code(&reports), 2);
    }

    #[test]
    fn cli_parses_assign_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "assign",
            "lead",
            "--task",
            "Review auth changes",
            "--agent",
            "claude",
        ])
        .expect("assign should parse");

        match cli.command {
            Some(Commands::Assign {
                from_session,
                task,
                agent,
                ..
            }) => {
                assert_eq!(from_session, "lead");
                assert_eq!(task, "Review auth changes");
                assert_eq!(agent, "claude");
            }
            _ => panic!("expected assign subcommand"),
        }
    }

    #[test]
    fn cli_parses_drain_inbox_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "drain-inbox",
            "lead",
            "--agent",
            "claude",
            "--limit",
            "3",
        ])
        .expect("drain-inbox should parse");

        match cli.command {
            Some(Commands::DrainInbox {
                session_id,
                agent,
                limit,
                ..
            }) => {
                assert_eq!(session_id, "lead");
                assert_eq!(agent, "claude");
                assert_eq!(limit, 3);
            }
            _ => panic!("expected drain-inbox subcommand"),
        }
    }

    #[test]
    fn cli_parses_auto_dispatch_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "auto-dispatch",
            "--agent",
            "claude",
            "--lead-limit",
            "4",
        ])
        .expect("auto-dispatch should parse");

        match cli.command {
            Some(Commands::AutoDispatch {
                agent, lead_limit, ..
            }) => {
                assert_eq!(agent, "claude");
                assert_eq!(lead_limit, 4);
            }
            _ => panic!("expected auto-dispatch subcommand"),
        }
    }

    #[test]
    fn cli_parses_coordinate_backlog_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "coordinate-backlog",
            "--agent",
            "claude",
            "--lead-limit",
            "7",
        ])
        .expect("coordinate-backlog should parse");

        match cli.command {
            Some(Commands::CoordinateBacklog {
                agent,
                lead_limit,
                check,
                until_healthy,
                max_passes,
                ..
            }) => {
                assert_eq!(agent, "claude");
                assert_eq!(lead_limit, 7);
                assert!(!check);
                assert!(!until_healthy);
                assert_eq!(max_passes, 5);
            }
            _ => panic!("expected coordinate-backlog subcommand"),
        }
    }

    #[test]
    fn cli_parses_coordinate_backlog_until_healthy_flags() {
        let cli = Cli::try_parse_from([
            "ecc",
            "coordinate-backlog",
            "--until-healthy",
            "--max-passes",
            "3",
        ])
        .expect("coordinate-backlog looping flags should parse");

        match cli.command {
            Some(Commands::CoordinateBacklog {
                json,
                until_healthy,
                max_passes,
                ..
            }) => {
                assert!(!json);
                assert!(until_healthy);
                assert_eq!(max_passes, 3);
            }
            _ => panic!("expected coordinate-backlog subcommand"),
        }
    }

    #[test]
    fn cli_parses_coordinate_backlog_json_flag() {
        let cli = Cli::try_parse_from(["ecc", "coordinate-backlog", "--json"])
            .expect("coordinate-backlog --json should parse");

        match cli.command {
            Some(Commands::CoordinateBacklog {
                json,
                check,
                until_healthy,
                max_passes,
                ..
            }) => {
                assert!(json);
                assert!(!check);
                assert!(!until_healthy);
                assert_eq!(max_passes, 5);
            }
            _ => panic!("expected coordinate-backlog subcommand"),
        }
    }

    #[test]
    fn cli_parses_coordinate_backlog_check_flag() {
        let cli = Cli::try_parse_from(["ecc", "coordinate-backlog", "--check"])
            .expect("coordinate-backlog --check should parse");

        match cli.command {
            Some(Commands::CoordinateBacklog {
                json,
                check,
                until_healthy,
                max_passes,
                ..
            }) => {
                assert!(!json);
                assert!(check);
                assert!(!until_healthy);
                assert_eq!(max_passes, 5);
            }
            _ => panic!("expected coordinate-backlog subcommand"),
        }
    }

    #[test]
    fn cli_parses_rebalance_all_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "rebalance-all",
            "--agent",
            "claude",
            "--lead-limit",
            "6",
        ])
        .expect("rebalance-all should parse");

        match cli.command {
            Some(Commands::RebalanceAll {
                agent, lead_limit, ..
            }) => {
                assert_eq!(agent, "claude");
                assert_eq!(lead_limit, 6);
            }
            _ => panic!("expected rebalance-all subcommand"),
        }
    }

    #[test]
    fn cli_parses_coordination_status_command() {
        let cli = Cli::try_parse_from(["ecc", "coordination-status"])
            .expect("coordination-status should parse");

        match cli.command {
            Some(Commands::CoordinationStatus { json, check }) => {
                assert!(!json);
                assert!(!check);
            }
            _ => panic!("expected coordination-status subcommand"),
        }
    }

    #[test]
    fn cli_parses_log_decision_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "log-decision",
            "latest",
            "--decision",
            "Use sqlite",
            "--reasoning",
            "It is already embedded",
            "--alternative",
            "json files",
            "--alternative",
            "memory only",
            "--json",
        ])
        .expect("log-decision should parse");

        match cli.command {
            Some(Commands::LogDecision {
                session_id,
                decision,
                reasoning,
                alternatives,
                json,
            }) => {
                assert_eq!(session_id.as_deref(), Some("latest"));
                assert_eq!(decision, "Use sqlite");
                assert_eq!(reasoning, "It is already embedded");
                assert_eq!(alternatives, vec!["json files", "memory only"]);
                assert!(json);
            }
            _ => panic!("expected log-decision subcommand"),
        }
    }

    #[test]
    fn cli_parses_decisions_command() {
        let cli = Cli::try_parse_from(["ecc", "decisions", "--all", "--limit", "5", "--json"])
            .expect("decisions should parse");

        match cli.command {
            Some(Commands::Decisions {
                session_id,
                all,
                json,
                limit,
            }) => {
                assert!(session_id.is_none());
                assert!(all);
                assert!(json);
                assert_eq!(limit, 5);
            }
            _ => panic!("expected decisions subcommand"),
        }
    }

    #[test]
    fn format_decisions_human_renders_details() {
        let text = format_decisions_human(
            &[session::DecisionLogEntry {
                id: 1,
                session_id: "sess-12345678".to_string(),
                decision: "Use sqlite for the shared context graph".to_string(),
                alternatives: vec!["json files".to_string(), "memory only".to_string()],
                reasoning: "SQLite keeps the audit trail queryable.".to_string(),
                timestamp: chrono::DateTime::parse_from_rfc3339("2026-04-09T01:02:03Z")
                    .unwrap()
                    .with_timezone(&chrono::Utc),
            }],
            true,
        );

        assert!(text.contains("Decision log: 1 entries"));
        assert!(text.contains("sess-123"));
        assert!(text.contains("Use sqlite for the shared context graph"));
        assert!(text.contains("why SQLite keeps the audit trail queryable."));
        assert!(text.contains("alternative json files"));
        assert!(text.contains("alternative memory only"));
    }

    #[test]
    fn cli_parses_coordination_status_json_flag() {
        let cli = Cli::try_parse_from(["ecc", "coordination-status", "--json"])
            .expect("coordination-status --json should parse");

        match cli.command {
            Some(Commands::CoordinationStatus { json, check }) => {
                assert!(json);
                assert!(!check);
            }
            _ => panic!("expected coordination-status subcommand"),
        }
    }

    #[test]
    fn cli_parses_coordination_status_check_flag() {
        let cli = Cli::try_parse_from(["ecc", "coordination-status", "--check"])
            .expect("coordination-status --check should parse");

        match cli.command {
            Some(Commands::CoordinationStatus { json, check }) => {
                assert!(!json);
                assert!(check);
            }
            _ => panic!("expected coordination-status subcommand"),
        }
    }

    #[test]
    fn cli_parses_maintain_coordination_command() {
        let cli = Cli::try_parse_from(["ecc", "maintain-coordination"])
            .expect("maintain-coordination should parse");

        match cli.command {
            Some(Commands::MaintainCoordination {
                agent,
                json,
                check,
                max_passes,
                ..
            }) => {
                assert_eq!(agent, "claude");
                assert!(!json);
                assert!(!check);
                assert_eq!(max_passes, 5);
            }
            _ => panic!("expected maintain-coordination subcommand"),
        }
    }

    #[test]
    fn cli_parses_maintain_coordination_json_flag() {
        let cli = Cli::try_parse_from(["ecc", "maintain-coordination", "--json"])
            .expect("maintain-coordination --json should parse");

        match cli.command {
            Some(Commands::MaintainCoordination {
                json,
                check,
                max_passes,
                ..
            }) => {
                assert!(json);
                assert!(!check);
                assert_eq!(max_passes, 5);
            }
            _ => panic!("expected maintain-coordination subcommand"),
        }
    }

    #[test]
    fn cli_parses_maintain_coordination_check_flag() {
        let cli = Cli::try_parse_from(["ecc", "maintain-coordination", "--check"])
            .expect("maintain-coordination --check should parse");

        match cli.command {
            Some(Commands::MaintainCoordination {
                json,
                check,
                max_passes,
                ..
            }) => {
                assert!(!json);
                assert!(check);
                assert_eq!(max_passes, 5);
            }
            _ => panic!("expected maintain-coordination subcommand"),
        }
    }

    #[test]
    fn format_coordination_status_emits_json() {
        let status = session::manager::CoordinationStatus {
            backlog_leads: 2,
            backlog_messages: 5,
            absorbable_sessions: 1,
            saturated_sessions: 1,
            mode: session::manager::CoordinationMode::RebalanceFirstChronicSaturation,
            health: session::manager::CoordinationHealth::Saturated,
            operator_escalation_required: false,
            auto_dispatch_enabled: true,
            auto_dispatch_limit_per_session: 4,
            daemon_activity: session::store::DaemonActivity {
                last_dispatch_routed: 3,
                last_dispatch_deferred: 1,
                last_dispatch_leads: 2,
                ..Default::default()
            },
        };

        let rendered =
            format_coordination_status(&status, true).expect("json formatting should succeed");
        let value: serde_json::Value =
            serde_json::from_str(&rendered).expect("valid json should be emitted");
        assert_eq!(value["backlog_leads"], 2);
        assert_eq!(value["backlog_messages"], 5);
        assert_eq!(value["daemon_activity"]["last_dispatch_routed"], 3);
    }

    #[test]
    fn coordination_status_exit_codes_reflect_pressure() {
        let clear = session::manager::CoordinationStatus {
            backlog_leads: 0,
            backlog_messages: 0,
            absorbable_sessions: 0,
            saturated_sessions: 0,
            mode: session::manager::CoordinationMode::DispatchFirst,
            health: session::manager::CoordinationHealth::Healthy,
            operator_escalation_required: false,
            auto_dispatch_enabled: false,
            auto_dispatch_limit_per_session: 5,
            daemon_activity: Default::default(),
        };
        assert_eq!(coordination_status_exit_code(&clear), 0);

        let absorbable = session::manager::CoordinationStatus {
            backlog_messages: 2,
            backlog_leads: 1,
            absorbable_sessions: 1,
            health: session::manager::CoordinationHealth::BacklogAbsorbable,
            ..clear.clone()
        };
        assert_eq!(coordination_status_exit_code(&absorbable), 1);

        let saturated = session::manager::CoordinationStatus {
            saturated_sessions: 1,
            health: session::manager::CoordinationHealth::Saturated,
            ..absorbable
        };
        assert_eq!(coordination_status_exit_code(&saturated), 2);
    }

    #[test]
    fn summarize_coordinate_backlog_reports_clear_state() {
        let summary = summarize_coordinate_backlog(&session::manager::CoordinateBacklogOutcome {
            dispatched: Vec::new(),
            rebalanced: Vec::new(),
            remaining_backlog_sessions: 0,
            remaining_backlog_messages: 0,
            remaining_absorbable_sessions: 0,
            remaining_saturated_sessions: 0,
        });

        assert_eq!(summary.message, "Backlog already clear");
        assert_eq!(summary.processed, 0);
        assert_eq!(summary.rerouted, 0);
    }

    #[test]
    fn summarize_coordinate_backlog_structures_counts() {
        let summary = summarize_coordinate_backlog(&session::manager::CoordinateBacklogOutcome {
            dispatched: vec![session::manager::LeadDispatchOutcome {
                lead_session_id: "lead".into(),
                unread_count: 2,
                routed: vec![
                    session::manager::InboxDrainOutcome {
                        message_id: 1,
                        task: "one".into(),
                        session_id: "a".into(),
                        action: session::manager::AssignmentAction::Spawned,
                    },
                    session::manager::InboxDrainOutcome {
                        message_id: 2,
                        task: "two".into(),
                        session_id: "lead".into(),
                        action: session::manager::AssignmentAction::DeferredSaturated,
                    },
                ],
            }],
            rebalanced: vec![session::manager::LeadRebalanceOutcome {
                lead_session_id: "lead".into(),
                rerouted: vec![session::manager::RebalanceOutcome {
                    from_session_id: "a".into(),
                    message_id: 3,
                    task: "three".into(),
                    session_id: "b".into(),
                    action: session::manager::AssignmentAction::ReusedIdle,
                }],
            }],
            remaining_backlog_sessions: 1,
            remaining_backlog_messages: 2,
            remaining_absorbable_sessions: 1,
            remaining_saturated_sessions: 0,
        });

        assert_eq!(summary.processed, 2);
        assert_eq!(summary.routed, 1);
        assert_eq!(summary.deferred, 1);
        assert_eq!(summary.rerouted, 1);
        assert_eq!(summary.dispatched_leads, 1);
        assert_eq!(summary.rebalanced_leads, 1);
        assert_eq!(summary.remaining_backlog_messages, 2);
    }

    #[test]
    fn cli_parses_rebalance_team_command() {
        let cli = Cli::try_parse_from([
            "ecc",
            "rebalance-team",
            "lead",
            "--agent",
            "claude",
            "--limit",
            "2",
        ])
        .expect("rebalance-team should parse");

        match cli.command {
            Some(Commands::RebalanceTeam {
                session_id,
                agent,
                limit,
                ..
            }) => {
                assert_eq!(session_id, "lead");
                assert_eq!(agent, "claude");
                assert_eq!(limit, 2);
            }
            _ => panic!("expected rebalance-team subcommand"),
        }
    }
}
