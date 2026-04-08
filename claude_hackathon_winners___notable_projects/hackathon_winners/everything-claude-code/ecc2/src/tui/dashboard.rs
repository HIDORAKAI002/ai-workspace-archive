use ratatui::{
    prelude::*,
    widgets::{
        Block, Borders, Cell, HighlightSpacing, Paragraph, Row, Table, TableState, Tabs, Wrap,
    },
};
use std::collections::HashMap;
use tokio::sync::broadcast;

use super::widgets::{BudgetState, TokenMeter, budget_state, format_currency, format_token_count};
use crate::comms;
use crate::config::{Config, PaneLayout};
use crate::observability::ToolLogEntry;
use crate::session::manager;
use crate::session::output::{OUTPUT_BUFFER_LIMIT, OutputEvent, OutputLine, SessionOutputStore};
use crate::session::store::{DaemonActivity, StateStore};
use crate::session::{Session, SessionMessage, SessionState};
use crate::worktree;

#[cfg(test)]
use crate::session::output::OutputStream;
#[cfg(test)]
use crate::session::{SessionMetrics, WorktreeInfo};

const DEFAULT_PANE_SIZE_PERCENT: u16 = 35;
const DEFAULT_GRID_SIZE_PERCENT: u16 = 50;
const OUTPUT_PANE_PERCENT: u16 = 70;
const MIN_PANE_SIZE_PERCENT: u16 = 20;
const MAX_PANE_SIZE_PERCENT: u16 = 80;
const PANE_RESIZE_STEP_PERCENT: u16 = 5;
const MAX_LOG_ENTRIES: u64 = 12;
const MAX_DIFF_PREVIEW_LINES: usize = 6;
const MAX_DIFF_PATCH_LINES: usize = 80;

#[derive(Debug, Clone, PartialEq, Eq)]
struct WorktreeDiffColumns {
    removals: String,
    additions: String,
}

pub struct Dashboard {
    db: StateStore,
    cfg: Config,
    output_store: SessionOutputStore,
    output_rx: broadcast::Receiver<OutputEvent>,
    sessions: Vec<Session>,
    session_output_cache: HashMap<String, Vec<OutputLine>>,
    unread_message_counts: HashMap<String, usize>,
    handoff_backlog_counts: HashMap<String, usize>,
    worktree_health_by_session: HashMap<String, worktree::WorktreeHealth>,
    global_handoff_backlog_leads: usize,
    global_handoff_backlog_messages: usize,
    daemon_activity: DaemonActivity,
    selected_messages: Vec<SessionMessage>,
    selected_parent_session: Option<String>,
    selected_child_sessions: Vec<DelegatedChildSummary>,
    selected_team_summary: Option<TeamSummary>,
    selected_route_preview: Option<String>,
    logs: Vec<ToolLogEntry>,
    selected_diff_summary: Option<String>,
    selected_diff_preview: Vec<String>,
    selected_diff_patch: Option<String>,
    selected_conflict_protocol: Option<String>,
    selected_merge_readiness: Option<worktree::MergeReadiness>,
    output_mode: OutputMode,
    selected_pane: Pane,
    selected_session: usize,
    show_help: bool,
    operator_note: Option<String>,
    output_follow: bool,
    output_scroll_offset: usize,
    last_output_height: usize,
    pane_size_percent: u16,
    session_table_state: TableState,
}

#[derive(Debug, Default, PartialEq, Eq)]
struct SessionSummary {
    total: usize,
    pending: usize,
    running: usize,
    idle: usize,
    completed: usize,
    failed: usize,
    stopped: usize,
    unread_messages: usize,
    inbox_sessions: usize,
    conflicted_worktrees: usize,
    in_progress_worktrees: usize,
}

#[derive(Debug, Clone, Copy, PartialEq)]
enum Pane {
    Sessions,
    Output,
    Metrics,
    Log,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum OutputMode {
    SessionOutput,
    WorktreeDiff,
    ConflictProtocol,
}

#[derive(Debug, Clone, Copy)]
struct PaneAreas {
    sessions: Rect,
    output: Rect,
    metrics: Rect,
    log: Option<Rect>,
}

#[derive(Debug, Clone, Copy)]
struct AggregateUsage {
    total_tokens: u64,
    total_cost_usd: f64,
    token_state: BudgetState,
    cost_state: BudgetState,
    overall_state: BudgetState,
}

#[derive(Debug, Clone)]
struct DelegatedChildSummary {
    session_id: String,
    state: SessionState,
    handoff_backlog: usize,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
struct TeamSummary {
    total: usize,
    idle: usize,
    running: usize,
    pending: usize,
    failed: usize,
    stopped: usize,
}

impl Dashboard {
    pub fn new(db: StateStore, cfg: Config) -> Self {
        Self::with_output_store(db, cfg, SessionOutputStore::default())
    }

    pub fn with_output_store(
        db: StateStore,
        cfg: Config,
        output_store: SessionOutputStore,
    ) -> Self {
        let pane_size_percent = match cfg.pane_layout {
            PaneLayout::Grid => DEFAULT_GRID_SIZE_PERCENT,
            PaneLayout::Horizontal | PaneLayout::Vertical => DEFAULT_PANE_SIZE_PERCENT,
        };
        let sessions = db.list_sessions().unwrap_or_default();
        let output_rx = output_store.subscribe();
        let mut session_table_state = TableState::default();
        if !sessions.is_empty() {
            session_table_state.select(Some(0));
        }

        let mut dashboard = Self {
            db,
            cfg,
            output_store,
            output_rx,
            sessions,
            session_output_cache: HashMap::new(),
            unread_message_counts: HashMap::new(),
            handoff_backlog_counts: HashMap::new(),
            worktree_health_by_session: HashMap::new(),
            global_handoff_backlog_leads: 0,
            global_handoff_backlog_messages: 0,
            daemon_activity: DaemonActivity::default(),
            selected_messages: Vec::new(),
            selected_parent_session: None,
            selected_child_sessions: Vec::new(),
            selected_team_summary: None,
            selected_route_preview: None,
            logs: Vec::new(),
            selected_diff_summary: None,
            selected_diff_preview: Vec::new(),
            selected_diff_patch: None,
            selected_conflict_protocol: None,
            selected_merge_readiness: None,
            output_mode: OutputMode::SessionOutput,
            selected_pane: Pane::Sessions,
            selected_session: 0,
            show_help: false,
            operator_note: None,
            output_follow: true,
            output_scroll_offset: 0,
            last_output_height: 0,
            pane_size_percent,
            session_table_state,
        };
        dashboard.unread_message_counts = dashboard.db.unread_message_counts().unwrap_or_default();
        dashboard.sync_handoff_backlog_counts();
        dashboard.sync_global_handoff_backlog();
        dashboard.sync_selected_output();
        dashboard.sync_selected_diff();
        dashboard.sync_selected_messages();
        dashboard.sync_selected_lineage();
        dashboard.refresh_logs();
        dashboard
    }

    pub fn render(&mut self, frame: &mut Frame) {
        let chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Length(3),
                Constraint::Min(10),
                Constraint::Length(3),
            ])
            .split(frame.area());

        self.render_header(frame, chunks[0]);

        if self.show_help {
            self.render_help(frame, chunks[1]);
        } else {
            let pane_areas = self.pane_areas(chunks[1]);
            self.render_sessions(frame, pane_areas.sessions);
            self.render_output(frame, pane_areas.output);
            self.render_metrics(frame, pane_areas.metrics);

            if let Some(log_area) = pane_areas.log {
                self.render_log(frame, log_area);
            }
        }

        self.render_status_bar(frame, chunks[2]);
    }

    fn render_header(&self, frame: &mut Frame, area: Rect) {
        let running = self
            .sessions
            .iter()
            .filter(|session| session.state == SessionState::Running)
            .count();
        let total = self.sessions.len();

        let title = format!(
            " ECC 2.0 | {running} running / {total} total | {} {}% ",
            self.layout_label(),
            self.pane_size_percent
        );
        let tabs = Tabs::new(
            self.visible_panes()
                .iter()
                .map(|pane| pane.title())
                .collect::<Vec<_>>(),
        )
        .block(Block::default().borders(Borders::ALL).title(title))
        .select(self.selected_pane_index())
        .highlight_style(
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        );

        frame.render_widget(tabs, area);
    }

    fn render_sessions(&mut self, frame: &mut Frame, area: Rect) {
        let block = Block::default()
            .borders(Borders::ALL)
            .title(" Sessions ")
            .border_style(self.pane_border_style(Pane::Sessions));
        let inner_area = block.inner(area);
        frame.render_widget(block, area);

        if inner_area.is_empty() {
            return;
        }

        let stabilized = self
            .daemon_activity
            .stabilized_after_recovery_at()
            .is_some();
        let summary = SessionSummary::from_sessions(
            &self.sessions,
            &self.handoff_backlog_counts,
            &self.worktree_health_by_session,
            stabilized,
        );
        let chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([Constraint::Length(2), Constraint::Min(3)])
            .split(inner_area);

        frame.render_widget(
            Paragraph::new(vec![
                summary_line(&summary),
                attention_queue_line(&summary, stabilized),
            ]),
            chunks[0],
        );

        let rows = self.sessions.iter().map(|session| {
            session_row(
                session,
                self.handoff_backlog_counts
                    .get(&session.id)
                    .copied()
                    .unwrap_or(0),
            )
        });
        let header = Row::new([
            "ID", "Agent", "State", "Branch", "Backlog", "Tokens", "Duration",
        ])
        .style(Style::default().add_modifier(Modifier::BOLD));
        let widths = [
            Constraint::Length(8),
            Constraint::Length(10),
            Constraint::Length(10),
            Constraint::Min(12),
            Constraint::Length(7),
            Constraint::Length(8),
            Constraint::Length(8),
        ];

        let table = Table::new(rows, widths)
            .header(header)
            .column_spacing(1)
            .highlight_symbol(">> ")
            .highlight_spacing(HighlightSpacing::Always)
            .row_highlight_style(
                Style::default()
                    .bg(Color::DarkGray)
                    .add_modifier(Modifier::BOLD),
            );

        let selected = if self.sessions.is_empty() {
            None
        } else {
            Some(self.selected_session.min(self.sessions.len() - 1))
        };
        if self.session_table_state.selected() != selected {
            self.session_table_state.select(selected);
        }

        frame.render_stateful_widget(table, chunks[1], &mut self.session_table_state);
    }

    fn render_output(&mut self, frame: &mut Frame, area: Rect) {
        self.sync_output_scroll(area.height.saturating_sub(2) as usize);

        if self.sessions.get(self.selected_session).is_some()
            && self.output_mode == OutputMode::WorktreeDiff
            && self.selected_diff_patch.is_some()
        {
            self.render_split_diff_output(frame, area);
            return;
        }

        let (title, content) = if self.sessions.get(self.selected_session).is_some() {
            match self.output_mode {
                OutputMode::SessionOutput => {
                    let lines = self.selected_output_lines();
                    let content = if lines.is_empty() {
                        "Waiting for session output...".to_string()
                    } else {
                        lines.iter().map(|line| line.text.as_str()).collect::<Vec<_>>().join("\n")
                    };
                    (" Output ", content)
                }
                OutputMode::WorktreeDiff => {
                    let content = self
                        .selected_diff_patch
                        .clone()
                        .or_else(|| {
                            self.selected_diff_summary.as_ref().map(|summary| {
                                format!(
                                    "{summary}\n\nNo patch content to preview yet. The worktree may be clean or only have summary-level changes."
                                )
                            })
                        })
                        .unwrap_or_else(|| {
                            "No worktree diff available for the selected session.".to_string()
                        });
                    (" Diff ", content)
                }
                OutputMode::ConflictProtocol => {
                    let content = self
                        .selected_conflict_protocol
                        .clone()
                        .unwrap_or_else(|| {
                            "No conflicted worktree available for the selected session."
                                .to_string()
                        });
                    (" Conflict Protocol ", content)
                }
            }
        } else {
            (" Output ", "No sessions. Press 'n' to start one.".to_string())
        };

        let paragraph = Paragraph::new(content)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .title(title)
                    .border_style(self.pane_border_style(Pane::Output)),
            )
            .scroll((self.output_scroll_offset as u16, 0));
        frame.render_widget(paragraph, area);
    }

    fn render_split_diff_output(&mut self, frame: &mut Frame, area: Rect) {
        let block = Block::default()
            .borders(Borders::ALL)
            .title(" Diff ")
            .border_style(self.pane_border_style(Pane::Output));
        let inner_area = block.inner(area);
        frame.render_widget(block, area);

        if inner_area.is_empty() {
            return;
        }

        let Some(patch) = self.selected_diff_patch.as_ref() else {
            return;
        };
        let columns = build_worktree_diff_columns(patch);
        let column_chunks = Layout::default()
            .direction(Direction::Horizontal)
            .constraints([Constraint::Percentage(50), Constraint::Percentage(50)])
            .split(inner_area);

        let removals = Paragraph::new(columns.removals)
            .block(Block::default().borders(Borders::ALL).title(" Removals "))
            .scroll((self.output_scroll_offset as u16, 0))
            .wrap(Wrap { trim: false });
        frame.render_widget(removals, column_chunks[0]);

        let additions = Paragraph::new(columns.additions)
            .block(Block::default().borders(Borders::ALL).title(" Additions "))
            .scroll((self.output_scroll_offset as u16, 0))
            .wrap(Wrap { trim: false });
        frame.render_widget(additions, column_chunks[1]);
    }

    fn render_metrics(&self, frame: &mut Frame, area: Rect) {
        let block = Block::default()
            .borders(Borders::ALL)
            .title(" Metrics ")
            .border_style(self.pane_border_style(Pane::Metrics));
        let inner = block.inner(area);
        frame.render_widget(block, area);

        if inner.is_empty() {
            return;
        }

        let chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Length(2),
                Constraint::Length(2),
                Constraint::Min(1),
            ])
            .split(inner);

        let aggregate = self.aggregate_usage();
        frame.render_widget(
            TokenMeter::tokens(
                "Token Budget",
                aggregate.total_tokens,
                self.cfg.token_budget,
            ),
            chunks[0],
        );
        frame.render_widget(
            TokenMeter::currency(
                "Cost Budget",
                aggregate.total_cost_usd,
                self.cfg.cost_budget_usd,
            ),
            chunks[1],
        );
        frame.render_widget(
            Paragraph::new(self.selected_session_metrics_text()).wrap(Wrap { trim: true }),
            chunks[2],
        );
    }

    fn render_log(&self, frame: &mut Frame, area: Rect) {
        let content = if self.sessions.get(self.selected_session).is_none() {
            "No session selected.".to_string()
        } else if self.logs.is_empty() {
            "No tool logs available for this session yet.".to_string()
        } else {
            self.logs
                .iter()
                .map(|entry| {
                    format!(
                        "[{}] {} | {}ms | risk {:.0}%\ninput: {}\noutput: {}",
                        self.short_timestamp(&entry.timestamp),
                        entry.tool_name,
                        entry.duration_ms,
                        entry.risk_score * 100.0,
                        self.log_field(&entry.input_summary),
                        self.log_field(&entry.output_summary)
                    )
                })
                .collect::<Vec<_>>()
                .join("\n\n")
        };

        let paragraph = Paragraph::new(content)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .title(" Log ")
                    .border_style(self.pane_border_style(Pane::Log)),
            )
            .scroll((self.output_scroll_offset as u16, 0))
            .wrap(Wrap { trim: false });
        frame.render_widget(paragraph, area);
    }

    fn render_status_bar(&self, frame: &mut Frame, area: Rect) {
        let text = format!(
            " [n]ew session  [a]ssign  re[b]alance  global re[B]alance  dra[i]n inbox  [g]lobal dispatch  coordinate [G]lobal  [v]iew diff  conflict proto[c]ol  [m]erge  merge ready [M]  auto-merge [w]  toggle [p]olicy  [,/.] dispatch limit  [s]top  [u]resume  [x]cleanup  prune inactive [X]  [d]elete  [r]efresh  [Tab] switch pane  [j/k] scroll  [+/-] resize  [{}] layout  [?] help  [q]uit ",
            self.layout_label()
        );
        let text = if let Some(note) = self.operator_note.as_ref() {
            format!(" {} |{}", truncate_for_dashboard(note, 96), text)
        } else {
            text
        };
        let aggregate = self.aggregate_usage();
        let (summary_text, summary_style) = self.aggregate_cost_summary();
        let block = Block::default()
            .borders(Borders::ALL)
            .border_style(aggregate.overall_state.style());
        let inner = block.inner(area);
        frame.render_widget(block, area);

        if inner.is_empty() {
            return;
        }

        let summary_width = summary_text
            .len()
            .min(inner.width.saturating_sub(1) as usize) as u16;
        let chunks = Layout::default()
            .direction(Direction::Horizontal)
            .constraints([Constraint::Min(1), Constraint::Length(summary_width)])
            .split(inner);

        frame.render_widget(
            Paragraph::new(text).style(Style::default().fg(Color::DarkGray)),
            chunks[0],
        );
        frame.render_widget(
            Paragraph::new(summary_text)
                .style(summary_style)
                .alignment(Alignment::Right),
            chunks[1],
        );
    }

    fn render_help(&self, frame: &mut Frame, area: Rect) {
        let help = vec![
            "Keyboard Shortcuts:",
            "",
            "  n       New session",
            "  a       Assign follow-up work from selected session",
            "  b       Rebalance backed-up delegate handoff backlog for selected lead",
            "  B       Rebalance backed-up delegate handoff backlog across lead teams",
            "  i       Drain unread task handoffs from selected lead",
            "  g       Auto-dispatch unread handoffs across lead sessions",
            "  G       Dispatch then rebalance backlog across lead teams",
            "  v       Toggle selected worktree diff in output pane",
            "  c       Show conflict-resolution protocol for selected conflicted worktree",
            "  m       Merge selected ready worktree into base and clean it up",
            "  M       Merge all ready inactive worktrees and clean them up",
            "  p       Toggle daemon auto-dispatch policy and persist config",
            "  w       Toggle daemon auto-merge for ready inactive worktrees",
            "  ,/.     Decrease/increase auto-dispatch limit per lead",
            "  s       Stop selected session",
            "  u       Resume selected session",
            "  x       Cleanup selected worktree",
            "  X       Prune inactive worktrees globally",
            "  d       Delete selected inactive session",
            "  Tab     Next pane",
            "  S-Tab   Previous pane",
            "  j/↓     Scroll down",
            "  k/↑     Scroll up",
            "  +/=     Increase pane size",
            "  -       Decrease pane size",
            "  r       Refresh",
            "  ?       Toggle help",
            "  q/C-c   Quit",
        ];

        let paragraph = Paragraph::new(help.join("\n")).block(
            Block::default()
                .borders(Borders::ALL)
                .title(" Help ")
                .border_style(Style::default().fg(Color::Yellow)),
        );
        frame.render_widget(paragraph, area);
    }

    pub fn next_pane(&mut self) {
        let visible_panes = self.visible_panes();
        let next_index = self
            .selected_pane_index()
            .checked_add(1)
            .map(|index| index % visible_panes.len())
            .unwrap_or(0);

        self.selected_pane = visible_panes[next_index];
    }

    pub fn prev_pane(&mut self) {
        let visible_panes = self.visible_panes();
        let previous_index = if self.selected_pane_index() == 0 {
            visible_panes.len() - 1
        } else {
            self.selected_pane_index() - 1
        };

        self.selected_pane = visible_panes[previous_index];
    }

    pub fn increase_pane_size(&mut self) {
        self.pane_size_percent =
            (self.pane_size_percent + PANE_RESIZE_STEP_PERCENT).min(MAX_PANE_SIZE_PERCENT);
    }

    pub fn decrease_pane_size(&mut self) {
        self.pane_size_percent = self
            .pane_size_percent
            .saturating_sub(PANE_RESIZE_STEP_PERCENT)
            .max(MIN_PANE_SIZE_PERCENT);
    }

    pub fn scroll_down(&mut self) {
        match self.selected_pane {
            Pane::Sessions if !self.sessions.is_empty() => {
                self.selected_session = (self.selected_session + 1).min(self.sessions.len() - 1);
                self.sync_selection();
                self.reset_output_view();
                self.sync_selected_output();
                self.sync_selected_diff();
                self.sync_selected_messages();
                self.sync_selected_lineage();
                self.refresh_logs();
            }
            Pane::Output => {
                let max_scroll = self.max_output_scroll();
                if self.output_follow {
                    return;
                }

                if self.output_scroll_offset >= max_scroll.saturating_sub(1) {
                    self.output_follow = true;
                    self.output_scroll_offset = max_scroll;
                } else {
                    self.output_scroll_offset = self.output_scroll_offset.saturating_add(1);
                }
            }
            Pane::Metrics => {}
            Pane::Log => {
                self.output_follow = false;
                self.output_scroll_offset = self.output_scroll_offset.saturating_add(1);
            }
            Pane::Sessions => {}
        }
    }

    pub fn scroll_up(&mut self) {
        match self.selected_pane {
            Pane::Sessions => {
                self.selected_session = self.selected_session.saturating_sub(1);
                self.sync_selection();
                self.reset_output_view();
                self.sync_selected_output();
                self.sync_selected_diff();
                self.sync_selected_messages();
                self.sync_selected_lineage();
                self.refresh_logs();
            }
            Pane::Output => {
                if self.output_follow {
                    self.output_follow = false;
                    self.output_scroll_offset = self.max_output_scroll();
                }

                self.output_scroll_offset = self.output_scroll_offset.saturating_sub(1);
            }
            Pane::Metrics => {}
            Pane::Log => {
                self.output_follow = false;
                self.output_scroll_offset = self.output_scroll_offset.saturating_sub(1);
            }
        }
    }

    pub async fn new_session(&mut self) {
        if self.active_session_count() >= self.cfg.max_parallel_sessions {
            tracing::warn!(
                "Cannot queue new session: active session limit reached ({})",
                self.cfg.max_parallel_sessions
            );
            return;
        }

        let task = self.new_session_task();
        let agent = self.cfg.default_agent.clone();

        let session_id =
            match manager::create_session(&self.db, &self.cfg, &task, &agent, true).await {
                Ok(session_id) => session_id,
                Err(error) => {
                    tracing::warn!("Failed to create new session from dashboard: {error}");
                    self.set_operator_note(format!("new session failed: {error}"));
                    return;
                }
            };

        if let Some(source_session) = self.sessions.get(self.selected_session) {
            let context = format!(
                "Dashboard handoff from {} [{}] | cwd {}{}",
                format_session_id(&source_session.id),
                source_session.agent_type,
                source_session.working_dir.display(),
                source_session
                    .worktree
                    .as_ref()
                    .map(|worktree| format!(
                        " | worktree {} ({})",
                        worktree.branch,
                        worktree.path.display()
                    ))
                    .unwrap_or_default()
            );
            if let Err(error) = comms::send(
                &self.db,
                &source_session.id,
                &session_id,
                &comms::MessageType::TaskHandoff {
                    task: source_session.task.clone(),
                    context,
                },
            ) {
                tracing::warn!(
                    "Failed to send handoff from session {} to {}: {error}",
                    source_session.id,
                    session_id
                );
            }
        }

        self.refresh();
        self.sync_selection_by_id(Some(&session_id));
        self.set_operator_note(format!(
            "spawned session {}",
            format_session_id(&session_id)
        ));
        self.reset_output_view();
        self.sync_selected_output();
        self.sync_selected_diff();
        self.sync_selected_messages();
        self.sync_selected_lineage();
        self.refresh_logs();
    }

    pub fn toggle_output_mode(&mut self) {
        match self.output_mode {
            OutputMode::SessionOutput => {
                if self.selected_diff_patch.is_some() || self.selected_diff_summary.is_some() {
                    self.output_mode = OutputMode::WorktreeDiff;
                    self.selected_pane = Pane::Output;
                    self.output_follow = false;
                    self.output_scroll_offset = 0;
                    self.set_operator_note("showing selected worktree diff".to_string());
                } else {
                    self.set_operator_note("no worktree diff for selected session".to_string());
                }
            }
            OutputMode::WorktreeDiff => {
                self.output_mode = OutputMode::SessionOutput;
                self.reset_output_view();
                self.set_operator_note("showing session output".to_string());
            }
            OutputMode::ConflictProtocol => {
                self.output_mode = OutputMode::SessionOutput;
                self.reset_output_view();
                self.set_operator_note("showing session output".to_string());
            }
        }
    }

    pub fn toggle_conflict_protocol_mode(&mut self) {
        match self.output_mode {
            OutputMode::ConflictProtocol => {
                self.output_mode = OutputMode::SessionOutput;
                self.reset_output_view();
                self.set_operator_note("showing session output".to_string());
            }
            _ => {
                if self.selected_conflict_protocol.is_some() {
                    self.output_mode = OutputMode::ConflictProtocol;
                    self.selected_pane = Pane::Output;
                    self.output_follow = false;
                    self.output_scroll_offset = 0;
                    self.set_operator_note("showing worktree conflict protocol".to_string());
                } else {
                    self.set_operator_note(
                        "no conflicted worktree for selected session".to_string(),
                    );
                }
            }
        }
    }

    pub async fn assign_selected(&mut self) {
        let Some(source_session) = self.sessions.get(self.selected_session) else {
            return;
        };

        let task = self.new_session_task();
        let agent = self.cfg.default_agent.clone();

        let outcome = match manager::assign_session(
            &self.db,
            &self.cfg,
            &source_session.id,
            &task,
            &agent,
            true,
        )
        .await
        {
            Ok(outcome) => outcome,
            Err(error) => {
                tracing::warn!(
                    "Failed to assign follow-up work from session {}: {error}",
                    source_session.id
                );
                self.set_operator_note(format!("assignment failed: {error}"));
                return;
            }
        };

        self.refresh();
        self.sync_selection_by_id(Some(&outcome.session_id));
        self.set_operator_note(format!(
            "assigned via {} -> {}",
            assignment_action_label(outcome.action),
            format_session_id(&outcome.session_id)
        ));
        self.reset_output_view();
        self.sync_selected_output();
        self.sync_selected_diff();
        self.sync_selected_messages();
        self.sync_selected_lineage();
        self.refresh_logs();
    }

    pub async fn rebalance_selected_team(&mut self) {
        let Some(source_session) = self.sessions.get(self.selected_session) else {
            return;
        };

        let agent = self.cfg.default_agent.clone();
        let source_session_id = source_session.id.clone();
        let outcomes = match manager::rebalance_team_backlog(
            &self.db,
            &self.cfg,
            &source_session_id,
            &agent,
            true,
            self.cfg.auto_dispatch_limit_per_session,
        )
        .await
        {
            Ok(outcomes) => outcomes,
            Err(error) => {
                tracing::warn!(
                    "Failed to rebalance team backlog for session {}: {error}",
                    source_session_id
                );
                self.set_operator_note(format!(
                    "rebalance failed for {}: {error}",
                    format_session_id(&source_session_id)
                ));
                return;
            }
        };

        self.refresh();
        self.sync_selection_by_id(Some(&source_session_id));
        self.sync_selected_output();
        self.sync_selected_diff();
        self.sync_selected_messages();
        self.sync_selected_lineage();
        self.refresh_logs();

        if outcomes.is_empty() {
            self.set_operator_note(format!(
                "no delegate backlog needed rebalancing for {}",
                format_session_id(&source_session_id)
            ));
        } else {
            self.set_operator_note(format!(
                "rebalanced {} delegate handoff(s) for {}",
                outcomes.len(),
                format_session_id(&source_session_id)
            ));
        }
    }

    pub async fn drain_inbox_selected(&mut self) {
        let Some(source_session) = self.sessions.get(self.selected_session) else {
            return;
        };

        let agent = self.cfg.default_agent.clone();
        let source_session_id = source_session.id.clone();

        let outcomes = match manager::drain_inbox(
            &self.db,
            &self.cfg,
            &source_session_id,
            &agent,
            true,
            self.cfg.max_parallel_sessions,
        )
        .await
        {
            Ok(outcomes) => outcomes,
            Err(error) => {
                tracing::warn!(
                    "Failed to drain inbox for session {}: {error}",
                    source_session_id
                );
                self.set_operator_note(format!(
                    "drain inbox failed for {}: {error}",
                    format_session_id(&source_session_id)
                ));
                return;
            }
        };

        self.refresh();
        self.sync_selection_by_id(Some(&source_session_id));
        self.sync_selected_output();
        self.sync_selected_diff();
        self.sync_selected_messages();
        self.sync_selected_lineage();
        self.refresh_logs();

        if outcomes.is_empty() {
            self.set_operator_note(format!(
                "no unread handoffs for {}",
                format_session_id(&source_session_id)
            ));
        } else {
            self.set_operator_note(format!(
                "drained {} handoff(s) from {}",
                outcomes.len(),
                format_session_id(&source_session_id)
            ));
        }
    }

    pub async fn auto_dispatch_backlog(&mut self) {
        let agent = self.cfg.default_agent.clone();
        let lead_limit = self.sessions.len().max(1);

        let outcomes =
            match manager::auto_dispatch_backlog(&self.db, &self.cfg, &agent, true, lead_limit)
                .await
            {
                Ok(outcomes) => outcomes,
                Err(error) => {
                    tracing::warn!("Failed to auto-dispatch backlog from dashboard: {error}");
                    self.set_operator_note(format!("global auto-dispatch failed: {error}"));
                    return;
                }
            };

        let total_processed: usize = outcomes.iter().map(|outcome| outcome.routed.len()).sum();
        let total_routed: usize = outcomes
            .iter()
            .map(|outcome| {
                outcome
                    .routed
                    .iter()
                    .filter(|item| manager::assignment_action_routes_work(item.action))
                    .count()
            })
            .sum();
        let total_deferred = total_processed.saturating_sub(total_routed);
        let selected_session_id = self
            .sessions
            .get(self.selected_session)
            .map(|session| session.id.clone());

        self.refresh();
        self.sync_selection_by_id(selected_session_id.as_deref());
        self.sync_selected_output();
        self.sync_selected_diff();
        self.sync_selected_messages();
        self.sync_selected_lineage();
        self.refresh_logs();

        if total_processed == 0 {
            self.set_operator_note("no unread handoff backlog found".to_string());
        } else {
            self.set_operator_note(format!(
                "auto-dispatch processed {} handoff(s) across {} lead session(s) ({} routed, {} deferred)",
                total_processed,
                outcomes.len(),
                total_routed,
                total_deferred
            ));
        }
    }

    pub async fn rebalance_all_teams(&mut self) {
        let agent = self.cfg.default_agent.clone();
        let lead_limit = self.sessions.len().max(1);

        let outcomes =
            match manager::rebalance_all_teams(&self.db, &self.cfg, &agent, true, lead_limit).await
            {
                Ok(outcomes) => outcomes,
                Err(error) => {
                    tracing::warn!("Failed to rebalance teams from dashboard: {error}");
                    self.set_operator_note(format!("global rebalance failed: {error}"));
                    return;
                }
            };

        let total_rerouted: usize = outcomes.iter().map(|outcome| outcome.rerouted.len()).sum();
        let selected_session_id = self
            .sessions
            .get(self.selected_session)
            .map(|session| session.id.clone());

        self.refresh();
        self.sync_selection_by_id(selected_session_id.as_deref());
        self.sync_selected_output();
        self.sync_selected_diff();
        self.sync_selected_messages();
        self.sync_selected_lineage();
        self.refresh_logs();

        if total_rerouted == 0 {
            self.set_operator_note("no delegate backlog needed global rebalancing".to_string());
        } else {
            self.set_operator_note(format!(
                "rebalanced {} handoff(s) across {} lead session(s)",
                total_rerouted,
                outcomes.len()
            ));
        }
    }

    pub async fn coordinate_backlog(&mut self) {
        let agent = self.cfg.default_agent.clone();
        let lead_limit = self.sessions.len().max(1);

        let outcome = match manager::coordinate_backlog(
            &self.db, &self.cfg, &agent, true, lead_limit,
        )
        .await
        {
            Ok(outcomes) => outcomes,
            Err(error) => {
                tracing::warn!("Failed to coordinate backlog from dashboard: {error}");
                self.set_operator_note(format!("global coordinate failed: {error}"));
                return;
            }
        };
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
                    .filter(|item| manager::assignment_action_routes_work(item.action))
                    .count()
            })
            .sum();
        let total_deferred = total_processed.saturating_sub(total_routed);
        let total_rerouted: usize = outcome
            .rebalanced
            .iter()
            .map(|rebalance| rebalance.rerouted.len())
            .sum();

        let selected_session_id = self
            .sessions
            .get(self.selected_session)
            .map(|session| session.id.clone());

        self.refresh();
        self.sync_selection_by_id(selected_session_id.as_deref());
        self.sync_selected_output();
        self.sync_selected_diff();
        self.sync_selected_messages();
        self.sync_selected_lineage();
        self.refresh_logs();

        if total_processed == 0 && total_rerouted == 0 && outcome.remaining_backlog_sessions == 0 {
            self.set_operator_note("backlog already clear".to_string());
        } else {
            self.set_operator_note(format!(
                "coordinated backlog: processed {} across {} lead(s) ({} routed, {} deferred), rebalanced {} across {} lead(s), remaining {} across {} session(s) [{} absorbable, {} saturated]",
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
            ));
        }
    }

    pub async fn stop_selected(&mut self) {
        let Some(session) = self.sessions.get(self.selected_session) else {
            return;
        };

        let session_id = session.id.clone();
        if let Err(error) = manager::stop_session(&self.db, &session_id).await {
            tracing::warn!("Failed to stop session {}: {error}", session.id);
            self.set_operator_note(format!(
                "stop failed for {}: {error}",
                format_session_id(&session_id)
            ));
            return;
        }

        self.refresh();
        self.set_operator_note(format!(
            "stopped session {}",
            format_session_id(&session_id)
        ));
    }

    pub async fn resume_selected(&mut self) {
        let Some(session) = self.sessions.get(self.selected_session) else {
            return;
        };

        let session_id = session.id.clone();
        if let Err(error) = manager::resume_session(&self.db, &self.cfg, &session_id).await {
            tracing::warn!("Failed to resume session {}: {error}", session.id);
            self.set_operator_note(format!(
                "resume failed for {}: {error}",
                format_session_id(&session_id)
            ));
            return;
        }

        self.refresh();
        self.set_operator_note(format!(
            "resumed session {}",
            format_session_id(&session_id)
        ));
    }

    pub async fn cleanup_selected_worktree(&mut self) {
        let Some(session) = self.sessions.get(self.selected_session) else {
            return;
        };

        if session.worktree.is_none() {
            return;
        }

        let session_id = session.id.clone();
        if let Err(error) = manager::cleanup_session_worktree(&self.db, &session_id).await {
            tracing::warn!("Failed to cleanup session {} worktree: {error}", session.id);
            self.set_operator_note(format!(
                "cleanup failed for {}: {error}",
                format_session_id(&session_id)
            ));
            return;
        }

        self.refresh();
        self.set_operator_note(format!(
            "cleaned worktree for {}",
            format_session_id(&session_id)
        ));
    }

    pub async fn merge_selected_worktree(&mut self) {
        let Some(session) = self.sessions.get(self.selected_session) else {
            return;
        };

        if session.worktree.is_none() {
            self.set_operator_note("selected session has no worktree to merge".to_string());
            return;
        }

        let session_id = session.id.clone();
        let outcome = match manager::merge_session_worktree(&self.db, &session_id, true).await {
            Ok(outcome) => outcome,
            Err(error) => {
                tracing::warn!("Failed to merge session {} worktree: {error}", session.id);
                self.set_operator_note(format!(
                    "merge failed for {}: {error}",
                    format_session_id(&session_id)
                ));
                return;
            }
        };

        self.refresh();
        self.set_operator_note(format!(
            "merged {} into {} for {}{}",
            outcome.branch,
            outcome.base_branch,
            format_session_id(&session_id),
            if outcome.already_up_to_date {
                " (already up to date)"
            } else {
                ""
            }
        ));
    }

    pub async fn merge_ready_worktrees(&mut self) {
        match manager::merge_ready_worktrees(&self.db, true).await {
            Ok(outcome) => {
                self.refresh();
                if outcome.merged.is_empty()
                    && outcome.active_with_worktree_ids.is_empty()
                    && outcome.conflicted_session_ids.is_empty()
                    && outcome.dirty_worktree_ids.is_empty()
                    && outcome.failures.is_empty()
                {
                    self.set_operator_note("no ready worktrees to merge".to_string());
                    return;
                }

                let mut parts = vec![format!("merged {} ready worktree(s)", outcome.merged.len())];
                if !outcome.active_with_worktree_ids.is_empty() {
                    parts.push(format!(
                        "skipped {} active",
                        outcome.active_with_worktree_ids.len()
                    ));
                }
                if !outcome.conflicted_session_ids.is_empty() {
                    parts.push(format!(
                        "skipped {} conflicted",
                        outcome.conflicted_session_ids.len()
                    ));
                }
                if !outcome.dirty_worktree_ids.is_empty() {
                    parts.push(format!(
                        "skipped {} dirty",
                        outcome.dirty_worktree_ids.len()
                    ));
                }
                if !outcome.failures.is_empty() {
                    parts.push(format!("{} failed", outcome.failures.len()));
                }
                self.set_operator_note(parts.join("; "));
            }
            Err(error) => {
                tracing::warn!("Failed to merge ready worktrees: {error}");
                self.set_operator_note(format!("merge ready worktrees failed: {error}"));
            }
        }
    }

    pub async fn prune_inactive_worktrees(&mut self) {
        match manager::prune_inactive_worktrees(&self.db).await {
            Ok(outcome) => {
                self.refresh();
                if outcome.cleaned_session_ids.is_empty() {
                    self.set_operator_note("no inactive worktrees to prune".to_string());
                } else if outcome.active_with_worktree_ids.is_empty() {
                    self.set_operator_note(format!(
                        "pruned {} inactive worktree(s)",
                        outcome.cleaned_session_ids.len()
                    ));
                } else {
                    self.set_operator_note(format!(
                        "pruned {} inactive worktree(s); skipped {} active session(s)",
                        outcome.cleaned_session_ids.len(),
                        outcome.active_with_worktree_ids.len()
                    ));
                }
            }
            Err(error) => {
                tracing::warn!("Failed to prune inactive worktrees: {error}");
                self.set_operator_note(format!("prune inactive worktrees failed: {error}"));
            }
        }
    }

    pub async fn delete_selected_session(&mut self) {
        let Some(session) = self.sessions.get(self.selected_session) else {
            return;
        };

        let session_id = session.id.clone();
        if let Err(error) = manager::delete_session(&self.db, &session_id).await {
            tracing::warn!("Failed to delete session {}: {error}", session.id);
            self.set_operator_note(format!(
                "delete failed for {}: {error}",
                format_session_id(&session_id)
            ));
            return;
        }

        self.refresh();
        self.set_operator_note(format!(
            "deleted session {}",
            format_session_id(&session_id)
        ));
    }

    pub fn refresh(&mut self) {
        self.sync_from_store();
    }

    pub fn toggle_help(&mut self) {
        self.show_help = !self.show_help;
    }

    pub fn toggle_auto_dispatch_policy(&mut self) {
        self.cfg.auto_dispatch_unread_handoffs = !self.cfg.auto_dispatch_unread_handoffs;
        match self.cfg.save() {
            Ok(()) => {
                let state = if self.cfg.auto_dispatch_unread_handoffs {
                    "enabled"
                } else {
                    "disabled"
                };
                self.set_operator_note(format!(
                    "daemon auto-dispatch {state} | saved to {}",
                    crate::config::Config::config_path().display()
                ));
            }
            Err(error) => {
                self.cfg.auto_dispatch_unread_handoffs = !self.cfg.auto_dispatch_unread_handoffs;
                self.set_operator_note(format!("failed to persist auto-dispatch policy: {error}"));
            }
        }
    }

    pub fn toggle_auto_merge_policy(&mut self) {
        self.cfg.auto_merge_ready_worktrees = !self.cfg.auto_merge_ready_worktrees;
        match self.cfg.save() {
            Ok(()) => {
                let state = if self.cfg.auto_merge_ready_worktrees {
                    "enabled"
                } else {
                    "disabled"
                };
                self.set_operator_note(format!(
                    "daemon auto-merge {state} | saved to {}",
                    crate::config::Config::config_path().display()
                ));
            }
            Err(error) => {
                self.cfg.auto_merge_ready_worktrees = !self.cfg.auto_merge_ready_worktrees;
                self.set_operator_note(format!("failed to persist auto-merge policy: {error}"));
            }
        }
    }

    pub fn adjust_auto_dispatch_limit(&mut self, delta: isize) {
        let next =
            (self.cfg.auto_dispatch_limit_per_session as isize + delta).clamp(1, 50) as usize;
        if next == self.cfg.auto_dispatch_limit_per_session {
            self.set_operator_note(format!(
                "auto-dispatch limit unchanged at {} handoff(s) per lead",
                self.cfg.auto_dispatch_limit_per_session
            ));
            return;
        }

        let previous = self.cfg.auto_dispatch_limit_per_session;
        self.cfg.auto_dispatch_limit_per_session = next;
        match self.cfg.save() {
            Ok(()) => self.set_operator_note(format!(
                "auto-dispatch limit set to {} handoff(s) per lead | saved to {}",
                self.cfg.auto_dispatch_limit_per_session,
                crate::config::Config::config_path().display()
            )),
            Err(error) => {
                self.cfg.auto_dispatch_limit_per_session = previous;
                self.set_operator_note(format!("failed to persist auto-dispatch limit: {error}"));
            }
        }
    }

    pub async fn tick(&mut self) {
        loop {
            match self.output_rx.try_recv() {
                Ok(_event) => {}
                Err(broadcast::error::TryRecvError::Empty) => break,
                Err(broadcast::error::TryRecvError::Lagged(_)) => continue,
                Err(broadcast::error::TryRecvError::Closed) => break,
            }
        }

        self.sync_from_store();
    }

    fn sync_from_store(&mut self) {
        let selected_id = self.selected_session_id().map(ToOwned::to_owned);
        self.sessions = match self.db.list_sessions() {
            Ok(sessions) => sessions,
            Err(error) => {
                tracing::warn!("Failed to refresh sessions: {error}");
                Vec::new()
            }
        };
        self.unread_message_counts = match self.db.unread_message_counts() {
            Ok(counts) => counts,
            Err(error) => {
                tracing::warn!("Failed to refresh unread message counts: {error}");
                HashMap::new()
            }
        };
        self.sync_handoff_backlog_counts();
        self.sync_worktree_health_by_session();
        self.sync_global_handoff_backlog();
        self.sync_daemon_activity();
        self.sync_selection_by_id(selected_id.as_deref());
        self.ensure_selected_pane_visible();
        self.sync_selected_output();
        self.sync_selected_diff();
        self.sync_selected_messages();
        self.sync_selected_lineage();
        self.refresh_logs();
    }

    fn sync_selection(&mut self) {
        if self.sessions.is_empty() {
            self.selected_session = 0;
            self.session_table_state.select(None);
        } else {
            self.selected_session = self.selected_session.min(self.sessions.len() - 1);
            self.session_table_state.select(Some(self.selected_session));
        }
    }

    fn sync_selection_by_id(&mut self, selected_id: Option<&str>) {
        if let Some(selected_id) = selected_id {
            if let Some(index) = self
                .sessions
                .iter()
                .position(|session| session.id == selected_id)
            {
                self.selected_session = index;
            }
        }
        self.sync_selection();
    }

    fn ensure_selected_pane_visible(&mut self) {
        if !self.visible_panes().contains(&self.selected_pane) {
            self.selected_pane = Pane::Sessions;
        }
    }

    fn sync_global_handoff_backlog(&mut self) {
        let limit = self.sessions.len().max(1);
        match self.db.unread_task_handoff_targets(limit) {
            Ok(targets) => {
                self.global_handoff_backlog_leads = targets.len();
                self.global_handoff_backlog_messages =
                    targets.iter().map(|(_, unread_count)| *unread_count).sum();
            }
            Err(error) => {
                tracing::warn!("Failed to refresh global handoff backlog: {error}");
                self.global_handoff_backlog_leads = 0;
                self.global_handoff_backlog_messages = 0;
            }
        }
    }

    fn sync_handoff_backlog_counts(&mut self) {
        let limit = self.sessions.len().max(1);
        self.handoff_backlog_counts.clear();
        match self.db.unread_task_handoff_targets(limit) {
            Ok(targets) => {
                self.handoff_backlog_counts.extend(targets);
            }
            Err(error) => {
                tracing::warn!("Failed to refresh handoff backlog counts: {error}");
            }
        }
    }

    fn sync_worktree_health_by_session(&mut self) {
        self.worktree_health_by_session.clear();
        for session in &self.sessions {
            let Some(worktree) = session.worktree.as_ref() else {
                continue;
            };

            match worktree::health(worktree) {
                Ok(health) => {
                    self.worktree_health_by_session
                        .insert(session.id.clone(), health);
                }
                Err(error) => {
                    tracing::warn!(
                        "Failed to refresh worktree health for {}: {error}",
                        session.id
                    );
                }
            }
        }
    }

    fn sync_daemon_activity(&mut self) {
        self.daemon_activity = match self.db.daemon_activity() {
            Ok(activity) => activity,
            Err(error) => {
                tracing::warn!("Failed to refresh daemon activity: {error}");
                DaemonActivity::default()
            }
        };
    }

    fn sync_selected_output(&mut self) {
        let Some(session_id) = self.selected_session_id().map(ToOwned::to_owned) else {
            self.output_scroll_offset = 0;
            self.output_follow = true;
            return;
        };

        match self.db.get_output_lines(&session_id, OUTPUT_BUFFER_LIMIT) {
            Ok(lines) => {
                self.output_store.replace_lines(&session_id, lines.clone());
                self.session_output_cache.insert(session_id, lines);
            }
            Err(error) => {
                tracing::warn!("Failed to load session output: {error}");
            }
        }
    }

    fn sync_selected_diff(&mut self) {
        let session = self.sessions.get(self.selected_session);
        let worktree = session.and_then(|session| session.worktree.as_ref());

        self.selected_diff_summary =
            worktree.and_then(|worktree| worktree::diff_summary(worktree).ok().flatten());
        self.selected_diff_preview = worktree
            .and_then(|worktree| worktree::diff_file_preview(worktree, MAX_DIFF_PREVIEW_LINES).ok())
            .unwrap_or_default();
        self.selected_diff_patch = worktree
            .and_then(|worktree| worktree::diff_patch_preview(worktree, MAX_DIFF_PATCH_LINES).ok().flatten());
        self.selected_merge_readiness = worktree
            .and_then(|worktree| worktree::merge_readiness(worktree).ok());
        self.selected_conflict_protocol = session
            .zip(worktree)
            .zip(self.selected_merge_readiness.as_ref())
            .and_then(|((session, worktree), merge_readiness)| {
                build_conflict_protocol(&session.id, worktree, merge_readiness)
            });
        if self.output_mode == OutputMode::WorktreeDiff && self.selected_diff_patch.is_none() {
            self.output_mode = OutputMode::SessionOutput;
        }
        if self.output_mode == OutputMode::ConflictProtocol
            && self.selected_conflict_protocol.is_none()
        {
            self.output_mode = OutputMode::SessionOutput;
        }
    }

    fn sync_selected_messages(&mut self) {
        let Some(session_id) = self.selected_session_id().map(ToOwned::to_owned) else {
            self.selected_messages.clear();
            return;
        };

        let unread_count = self
            .unread_message_counts
            .get(&session_id)
            .copied()
            .unwrap_or(0);
        if unread_count > 0 {
            match self.db.mark_messages_read(&session_id) {
                Ok(_) => {
                    self.unread_message_counts.insert(session_id.clone(), 0);
                }
                Err(error) => {
                    tracing::warn!(
                        "Failed to mark session {} messages as read: {error}",
                        session_id
                    );
                }
            }
        }

        self.selected_messages = match self.db.list_messages_for_session(&session_id, 5) {
            Ok(messages) => messages,
            Err(error) => {
                tracing::warn!("Failed to load session messages: {error}");
                Vec::new()
            }
        };
    }

    fn sync_selected_lineage(&mut self) {
        let Some(session_id) = self.selected_session_id().map(ToOwned::to_owned) else {
            self.selected_parent_session = None;
            self.selected_child_sessions.clear();
            self.selected_team_summary = None;
            self.selected_route_preview = None;
            return;
        };

        self.selected_parent_session = match self.db.latest_task_handoff_source(&session_id) {
            Ok(parent) => parent,
            Err(error) => {
                tracing::warn!("Failed to load session parent linkage: {error}");
                None
            }
        };

        self.selected_child_sessions = match self.db.delegated_children(&session_id, 50) {
            Ok(children) => {
                let mut delegated = Vec::new();
                let mut team = TeamSummary::default();
                let mut route_candidates = Vec::new();

                for child_id in children {
                    match self.db.get_session(&child_id) {
                        Ok(Some(session)) => {
                            team.total += 1;
                            let handoff_backlog = match self.db.unread_task_handoff_count(&child_id)
                            {
                                Ok(count) => count,
                                Err(error) => {
                                    tracing::warn!(
                                        "Failed to load delegated child handoff backlog {}: {error}",
                                        child_id
                                    );
                                    0
                                }
                            };
                            let state = session.state.clone();
                            match state {
                                SessionState::Idle => team.idle += 1,
                                SessionState::Running => team.running += 1,
                                SessionState::Pending => team.pending += 1,
                                SessionState::Failed => team.failed += 1,
                                SessionState::Stopped => team.stopped += 1,
                                SessionState::Completed => {}
                            }

                            route_candidates.push(DelegatedChildSummary {
                                handoff_backlog,
                                state: state.clone(),
                                session_id: child_id.clone(),
                            });
                            delegated.push(DelegatedChildSummary {
                                handoff_backlog,
                                state,
                                session_id: child_id,
                            });
                        }
                        Ok(None) => {}
                        Err(error) => {
                            tracing::warn!(
                                "Failed to load delegated child session {}: {error}",
                                child_id
                            );
                        }
                    }
                }

                self.selected_team_summary = if team.total > 0 { Some(team) } else { None };
                self.selected_route_preview =
                    self.build_route_preview(team.total, &route_candidates);
                delegated.truncate(3);
                delegated
            }
            Err(error) => {
                tracing::warn!("Failed to load delegated child sessions: {error}");
                self.selected_team_summary = None;
                self.selected_route_preview = None;
                Vec::new()
            }
        };
    }

    fn build_route_preview(
        &self,
        delegate_count: usize,
        delegates: &[DelegatedChildSummary],
    ) -> Option<String> {
        if let Some(idle_clear) = delegates
            .iter()
            .filter(|delegate| {
                delegate.state == SessionState::Idle && delegate.handoff_backlog == 0
            })
            .min_by_key(|delegate| delegate.session_id.as_str())
        {
            return Some(format!(
                "reuse idle {}",
                format_session_id(&idle_clear.session_id)
            ));
        }

        if delegate_count < self.cfg.max_parallel_sessions {
            return Some("spawn new delegate".to_string());
        }

        if let Some(idle_backed_up) = delegates
            .iter()
            .filter(|delegate| delegate.state == SessionState::Idle)
            .min_by_key(|delegate| (delegate.handoff_backlog, delegate.session_id.as_str()))
        {
            return Some(format!(
                "reuse idle {} with backlog {}",
                format_session_id(&idle_backed_up.session_id),
                idle_backed_up.handoff_backlog
            ));
        }

        if let Some(active_delegate) = delegates
            .iter()
            .filter(|delegate| {
                matches!(
                    delegate.state,
                    SessionState::Running | SessionState::Pending
                )
            })
            .min_by_key(|delegate| (delegate.handoff_backlog, delegate.session_id.as_str()))
        {
            return Some(format!(
                "reuse active {} with backlog {}",
                format_session_id(&active_delegate.session_id),
                active_delegate.handoff_backlog
            ));
        }

        if delegate_count == 0 {
            Some("spawn new delegate".to_string())
        } else {
            Some("spawn fallback delegate".to_string())
        }
    }

    fn selected_session_id(&self) -> Option<&str> {
        self.sessions
            .get(self.selected_session)
            .map(|session| session.id.as_str())
    }

    fn selected_output_lines(&self) -> &[OutputLine] {
        self.selected_session_id()
            .and_then(|session_id| self.session_output_cache.get(session_id))
            .map(Vec::as_slice)
            .unwrap_or(&[])
    }

    fn sync_output_scroll(&mut self, viewport_height: usize) {
        self.last_output_height = viewport_height.max(1);
        let max_scroll = self.max_output_scroll();

        if self.output_follow {
            self.output_scroll_offset = max_scroll;
        } else {
            self.output_scroll_offset = self.output_scroll_offset.min(max_scroll);
        }
    }

    fn max_output_scroll(&self) -> usize {
        self.selected_output_lines()
            .len()
            .saturating_sub(self.last_output_height.max(1))
    }

    fn reset_output_view(&mut self) {
        self.output_follow = true;
        self.output_scroll_offset = 0;
    }

    fn refresh_logs(&mut self) {
        let Some(session_id) = self.selected_session_id().map(ToOwned::to_owned) else {
            self.logs.clear();
            return;
        };

        match self.db.query_tool_logs(&session_id, 1, MAX_LOG_ENTRIES) {
            Ok(page) => self.logs = page.entries,
            Err(error) => {
                tracing::warn!("Failed to load tool logs: {error}");
                self.logs.clear();
            }
        }
    }

    fn aggregate_usage(&self) -> AggregateUsage {
        let total_tokens = self
            .sessions
            .iter()
            .map(|session| session.metrics.tokens_used)
            .sum();
        let total_cost_usd = self
            .sessions
            .iter()
            .map(|session| session.metrics.cost_usd)
            .sum::<f64>();
        let token_state = budget_state(total_tokens as f64, self.cfg.token_budget as f64);
        let cost_state = budget_state(total_cost_usd, self.cfg.cost_budget_usd);

        AggregateUsage {
            total_tokens,
            total_cost_usd,
            token_state,
            cost_state,
            overall_state: token_state.max(cost_state),
        }
    }

    fn selected_session_metrics_text(&self) -> String {
        if let Some(session) = self.sessions.get(self.selected_session) {
            let metrics = &session.metrics;
            let mut lines = vec![
                format!(
                    "Selected {} [{}]",
                    &session.id[..8.min(session.id.len())],
                    session.state
                ),
                format!("Task {}", session.task),
            ];

            if let Some(parent) = self.selected_parent_session.as_ref() {
                lines.push(format!("Delegated from {}", format_session_id(parent)));
            }

            if let Some(team) = self.selected_team_summary {
                lines.push(format!(
                    "Team {}/{} | idle {} | running {} | pending {} | failed {} | stopped {}",
                    team.total,
                    self.cfg.max_parallel_sessions,
                    team.idle,
                    team.running,
                    team.pending,
                    team.failed,
                    team.stopped
                ));
            }

            lines.push(format!(
                "Global handoff backlog {} lead(s) / {} handoff(s) | Auto-dispatch {} @ {}/lead | Auto-merge {}",
                self.global_handoff_backlog_leads,
                self.global_handoff_backlog_messages,
                if self.cfg.auto_dispatch_unread_handoffs {
                    "on"
                } else {
                    "off"
                },
                self.cfg.auto_dispatch_limit_per_session,
                if self.cfg.auto_merge_ready_worktrees {
                    "on"
                } else {
                    "off"
                }
            ));

            let stabilized = self.daemon_activity.stabilized_after_recovery_at();

            lines.push(format!(
                "Coordination mode {}",
                if self.daemon_activity.dispatch_cooloff_active() {
                    "rebalance-cooloff (chronic saturation)"
                } else if self.daemon_activity.prefers_rebalance_first() {
                    "rebalance-first (chronic saturation)"
                } else if stabilized.is_some() {
                    "dispatch-first (stabilized)"
                } else {
                    "dispatch-first"
                }
            ));

            if self.daemon_activity.chronic_saturation_streak > 0 {
                lines.push(format!(
                    "Chronic saturation streak {} cycle(s)",
                    self.daemon_activity.chronic_saturation_streak
                ));
            }

            if self.daemon_activity.operator_escalation_required() {
                lines.push(
                    "Operator escalation recommended: chronic saturation is not clearing".into(),
                );
            }

            if let Some(cleared_at) = self.daemon_activity.chronic_saturation_cleared_at() {
                lines.push(format!(
                    "Chronic saturation cleared @ {}",
                    self.short_timestamp(&cleared_at.to_rfc3339())
                ));
            }

            if let Some(stabilized_at) = stabilized {
                lines.push(format!(
                    "Recovery stabilized @ {}",
                    self.short_timestamp(&stabilized_at.to_rfc3339())
                ));
            }

            if let Some(last_dispatch_at) = self.daemon_activity.last_dispatch_at.as_ref() {
                lines.push(format!(
                    "Last daemon dispatch {} routed / {} deferred across {} lead(s) @ {}",
                    self.daemon_activity.last_dispatch_routed,
                    self.daemon_activity.last_dispatch_deferred,
                    self.daemon_activity.last_dispatch_leads,
                    self.short_timestamp(&last_dispatch_at.to_rfc3339())
                ));
            }

            if stabilized.is_none() {
                if let Some(last_recovery_dispatch_at) =
                    self.daemon_activity.last_recovery_dispatch_at.as_ref()
                {
                    lines.push(format!(
                        "Last daemon recovery dispatch {} handoff(s) across {} lead(s) @ {}",
                        self.daemon_activity.last_recovery_dispatch_routed,
                        self.daemon_activity.last_recovery_dispatch_leads,
                        self.short_timestamp(&last_recovery_dispatch_at.to_rfc3339())
                    ));
                }

                if let Some(last_rebalance_at) = self.daemon_activity.last_rebalance_at.as_ref() {
                    lines.push(format!(
                        "Last daemon rebalance {} handoff(s) across {} lead(s) @ {}",
                        self.daemon_activity.last_rebalance_rerouted,
                        self.daemon_activity.last_rebalance_leads,
                        self.short_timestamp(&last_rebalance_at.to_rfc3339())
                    ));
                }
            }

            if let Some(last_auto_merge_at) = self.daemon_activity.last_auto_merge_at.as_ref() {
                lines.push(format!(
                    "Last daemon auto-merge {} merged / {} active / {} conflicted / {} dirty / {} failed @ {}",
                    self.daemon_activity.last_auto_merge_merged,
                    self.daemon_activity.last_auto_merge_active_skipped,
                    self.daemon_activity.last_auto_merge_conflicted_skipped,
                    self.daemon_activity.last_auto_merge_dirty_skipped,
                    self.daemon_activity.last_auto_merge_failed,
                    self.short_timestamp(&last_auto_merge_at.to_rfc3339())
                ));
            }

            if let Some(route_preview) = self.selected_route_preview.as_ref() {
                lines.push(format!("Next route {route_preview}"));
            }

            if !self.selected_child_sessions.is_empty() {
                lines.push("Delegates".to_string());
                for child in &self.selected_child_sessions {
                    lines.push(format!(
                        "- {} [{}] | backlog {}",
                        format_session_id(&child.session_id),
                        session_state_label(&child.state),
                        child.handoff_backlog
                    ));
                }
            }

            if let Some(worktree) = session.worktree.as_ref() {
                lines.push(format!(
                    "Branch {} | Base {}",
                    worktree.branch, worktree.base_branch
                ));
                lines.push(format!("Worktree {}", worktree.path.display()));
                if let Some(diff_summary) = self.selected_diff_summary.as_ref() {
                    lines.push(format!("Diff {diff_summary}"));
                }
                if !self.selected_diff_preview.is_empty() {
                    lines.push("Changed files".to_string());
                    for entry in &self.selected_diff_preview {
                        lines.push(format!("- {entry}"));
                    }
                }
                if let Some(merge_readiness) = self.selected_merge_readiness.as_ref() {
                    lines.push(merge_readiness.summary.clone());
                    for conflict in merge_readiness.conflicts.iter().take(3) {
                        lines.push(format!("- conflict {conflict}"));
                    }
                }
            }

            lines.push(format!(
                "Tokens {} | Tools {} | Files {}",
                format_token_count(metrics.tokens_used),
                metrics.tool_calls,
                metrics.files_changed,
            ));
            lines.push(format!(
                "Cost ${:.4} | Duration {}s",
                metrics.cost_usd, metrics.duration_secs
            ));

            if let Some(last_output) = self.selected_output_lines().last() {
                lines.push(format!(
                    "Last output {}",
                    truncate_for_dashboard(&last_output.text, 96)
                ));
            }

            lines.push(String::new());
            if self.selected_messages.is_empty() {
                lines.push("Message inbox clear".to_string());
            } else {
                lines.push("Recent messages:".to_string());
                let recent = self
                    .selected_messages
                    .iter()
                    .rev()
                    .take(3)
                    .collect::<Vec<_>>();
                for message in recent.into_iter().rev() {
                    lines.push(format!(
                        "- {} {} -> {} | {}",
                        self.short_timestamp(&message.timestamp.to_rfc3339()),
                        format_session_id(&message.from_session),
                        format_session_id(&message.to_session),
                        comms::preview(&message.msg_type, &message.content)
                    ));
                }
            }

            let attention_items = self.attention_queue_items(3);
            if attention_items.is_empty() {
                lines.push(String::new());
                lines.push("Attention queue clear".to_string());
            } else {
                lines.push(String::new());
                lines.push("Needs attention:".to_string());
                lines.extend(attention_items);
            }

            lines.join("\n")
        } else {
            "No metrics available".to_string()
        }
    }

    fn aggregate_cost_summary(&self) -> (String, Style) {
        let aggregate = self.aggregate_usage();
        let mut text = if self.cfg.cost_budget_usd > 0.0 {
            format!(
                "Aggregate cost {} / {}",
                format_currency(aggregate.total_cost_usd),
                format_currency(self.cfg.cost_budget_usd),
            )
        } else {
            format!(
                "Aggregate cost {} (no budget)",
                format_currency(aggregate.total_cost_usd)
            )
        };

        match aggregate.overall_state {
            BudgetState::Warning => text.push_str(" | Budget warning"),
            BudgetState::OverBudget => text.push_str(" | Budget exceeded"),
            _ => {}
        }

        (text, aggregate.overall_state.style())
    }

    fn attention_queue_items(&self, limit: usize) -> Vec<String> {
        let mut items = Vec::new();
        let suppress_inbox_attention = self
            .daemon_activity
            .stabilized_after_recovery_at()
            .is_some();

        for session in &self.sessions {
            if self
                .worktree_health_by_session
                .get(&session.id)
                .copied()
                == Some(worktree::WorktreeHealth::Conflicted)
            {
                items.push(format!(
                    "- Conflicted worktree {} | {}",
                    format_session_id(&session.id),
                    truncate_for_dashboard(&session.task, 48)
                ));
            }

            let handoff_backlog = self
                .handoff_backlog_counts
                .get(&session.id)
                .copied()
                .unwrap_or(0);
            if handoff_backlog > 0 && !suppress_inbox_attention {
                items.push(format!(
                    "- Backlog {} | {} handoff(s) | {}",
                    format_session_id(&session.id),
                    handoff_backlog,
                    truncate_for_dashboard(&session.task, 40)
                ));
            }

            if matches!(
                session.state,
                SessionState::Failed | SessionState::Stopped | SessionState::Pending
            ) {
                items.push(format!(
                    "- {} {} | {}",
                    session_state_label(&session.state),
                    format_session_id(&session.id),
                    truncate_for_dashboard(&session.task, 48)
                ));
            }

            if items.len() >= limit {
                break;
            }
        }

        items.truncate(limit);
        items
    }

    fn set_operator_note(&mut self, note: String) {
        self.operator_note = Some(note);
    }

    fn active_session_count(&self) -> usize {
        self.sessions
            .iter()
            .filter(|session| {
                matches!(
                    session.state,
                    SessionState::Pending | SessionState::Running | SessionState::Idle
                )
            })
            .count()
    }

    fn new_session_task(&self) -> String {
        self.sessions
            .get(self.selected_session)
            .map(|session| {
                format!(
                    "Follow up on {}: {}",
                    format_session_id(&session.id),
                    truncate_for_dashboard(&session.task, 96)
                )
            })
            .unwrap_or_else(|| "New ECC 2.0 session".to_string())
    }

    fn pane_areas(&self, area: Rect) -> PaneAreas {
        match self.cfg.pane_layout {
            PaneLayout::Horizontal => {
                let columns = Layout::default()
                    .direction(Direction::Horizontal)
                    .constraints(self.primary_constraints())
                    .split(area);
                let right_rows = Layout::default()
                    .direction(Direction::Vertical)
                    .constraints([
                        Constraint::Percentage(OUTPUT_PANE_PERCENT),
                        Constraint::Percentage(100 - OUTPUT_PANE_PERCENT),
                    ])
                    .split(columns[1]);

                PaneAreas {
                    sessions: columns[0],
                    output: right_rows[0],
                    metrics: right_rows[1],
                    log: None,
                }
            }
            PaneLayout::Vertical => {
                let rows = Layout::default()
                    .direction(Direction::Vertical)
                    .constraints(self.primary_constraints())
                    .split(area);
                let bottom_columns = Layout::default()
                    .direction(Direction::Horizontal)
                    .constraints([
                        Constraint::Percentage(OUTPUT_PANE_PERCENT),
                        Constraint::Percentage(100 - OUTPUT_PANE_PERCENT),
                    ])
                    .split(rows[1]);

                PaneAreas {
                    sessions: rows[0],
                    output: bottom_columns[0],
                    metrics: bottom_columns[1],
                    log: None,
                }
            }
            PaneLayout::Grid => {
                let rows = Layout::default()
                    .direction(Direction::Vertical)
                    .constraints(self.primary_constraints())
                    .split(area);
                let top_columns = Layout::default()
                    .direction(Direction::Horizontal)
                    .constraints(self.primary_constraints())
                    .split(rows[0]);
                let bottom_columns = Layout::default()
                    .direction(Direction::Horizontal)
                    .constraints(self.primary_constraints())
                    .split(rows[1]);

                PaneAreas {
                    sessions: top_columns[0],
                    output: top_columns[1],
                    metrics: bottom_columns[0],
                    log: Some(bottom_columns[1]),
                }
            }
        }
    }

    fn primary_constraints(&self) -> [Constraint; 2] {
        [
            Constraint::Percentage(self.pane_size_percent),
            Constraint::Percentage(100 - self.pane_size_percent),
        ]
    }

    fn visible_panes(&self) -> &'static [Pane] {
        match self.cfg.pane_layout {
            PaneLayout::Grid => &[Pane::Sessions, Pane::Output, Pane::Metrics, Pane::Log],
            PaneLayout::Horizontal | PaneLayout::Vertical => {
                &[Pane::Sessions, Pane::Output, Pane::Metrics]
            }
        }
    }

    fn selected_pane_index(&self) -> usize {
        self.visible_panes()
            .iter()
            .position(|pane| *pane == self.selected_pane)
            .unwrap_or(0)
    }

    fn pane_border_style(&self, pane: Pane) -> Style {
        if self.selected_pane == pane {
            Style::default().fg(Color::Cyan)
        } else {
            Style::default()
        }
    }

    fn layout_label(&self) -> &'static str {
        match self.cfg.pane_layout {
            PaneLayout::Horizontal => "horizontal",
            PaneLayout::Vertical => "vertical",
            PaneLayout::Grid => "grid",
        }
    }

    fn log_field<'a>(&self, value: &'a str) -> &'a str {
        let trimmed = value.trim();
        if trimmed.is_empty() { "n/a" } else { trimmed }
    }

    fn short_timestamp(&self, timestamp: &str) -> String {
        chrono::DateTime::parse_from_rfc3339(timestamp)
            .map(|value| value.format("%H:%M:%S").to_string())
            .unwrap_or_else(|_| timestamp.to_string())
    }

    #[cfg(test)]
    fn aggregate_cost_summary_text(&self) -> String {
        self.aggregate_cost_summary().0
    }

    #[cfg(test)]
    fn selected_output_text(&self) -> String {
        self.selected_output_lines()
            .iter()
            .map(|line| line.text.clone())
            .collect::<Vec<_>>()
            .join("\n")
    }

    #[cfg(test)]
    fn rendered_output_text(&mut self, width: u16, height: u16) -> String {
        let backend = ratatui::backend::TestBackend::new(width, height);
        let mut terminal = ratatui::Terminal::new(backend).expect("terminal");
        terminal.draw(|frame| self.render(frame)).expect("draw");
        terminal
            .backend()
            .buffer()
            .content()
            .iter()
            .map(|cell| cell.symbol())
            .collect::<String>()
    }
}

impl Pane {
    fn title(self) -> &'static str {
        match self {
            Pane::Sessions => "Sessions",
            Pane::Output => "Output",
            Pane::Metrics => "Metrics",
            Pane::Log => "Log",
        }
    }
}

impl SessionSummary {
    fn from_sessions(
        sessions: &[Session],
        unread_message_counts: &HashMap<String, usize>,
        worktree_health_by_session: &HashMap<String, worktree::WorktreeHealth>,
        suppress_inbox_attention: bool,
    ) -> Self {
        sessions.iter().fold(
            Self {
                total: sessions.len(),
                unread_messages: if suppress_inbox_attention {
                    0
                } else {
                    unread_message_counts.values().sum()
                },
                inbox_sessions: if suppress_inbox_attention {
                    0
                } else {
                    unread_message_counts
                        .values()
                        .filter(|count| **count > 0)
                        .count()
                },
                ..Self::default()
            },
            |mut summary, session| {
                match session.state {
                    SessionState::Pending => summary.pending += 1,
                    SessionState::Running => summary.running += 1,
                    SessionState::Idle => summary.idle += 1,
                    SessionState::Completed => summary.completed += 1,
                    SessionState::Failed => summary.failed += 1,
                    SessionState::Stopped => summary.stopped += 1,
                }
                match worktree_health_by_session.get(&session.id).copied() {
                    Some(worktree::WorktreeHealth::Conflicted) => {
                        summary.conflicted_worktrees += 1;
                    }
                    Some(worktree::WorktreeHealth::InProgress) => {
                        summary.in_progress_worktrees += 1;
                    }
                    Some(worktree::WorktreeHealth::Clear) | None => {}
                }
                summary
            },
        )
    }
}

fn session_row(session: &Session, unread_messages: usize) -> Row<'static> {
    Row::new(vec![
        Cell::from(format_session_id(&session.id)),
        Cell::from(session.agent_type.clone()),
        Cell::from(session_state_label(&session.state)).style(
            Style::default()
                .fg(session_state_color(&session.state))
                .add_modifier(Modifier::BOLD),
        ),
        Cell::from(session_branch(session)),
        Cell::from(if unread_messages == 0 {
            "-".to_string()
        } else {
            unread_messages.to_string()
        })
        .style(if unread_messages == 0 {
            Style::default()
        } else {
            Style::default()
                .fg(Color::Magenta)
                .add_modifier(Modifier::BOLD)
        }),
        Cell::from(session.metrics.tokens_used.to_string()),
        Cell::from(format_duration(session.metrics.duration_secs)),
    ])
}

fn summary_line(summary: &SessionSummary) -> Line<'static> {
    let mut spans = vec![
        Span::styled(
            format!("Total {}  ", summary.total),
            Style::default().add_modifier(Modifier::BOLD),
        ),
        summary_span("Running", summary.running, Color::Green),
        summary_span("Idle", summary.idle, Color::Yellow),
        summary_span("Completed", summary.completed, Color::Blue),
        summary_span("Failed", summary.failed, Color::Red),
        summary_span("Stopped", summary.stopped, Color::DarkGray),
        summary_span("Pending", summary.pending, Color::Reset),
    ];

    if summary.conflicted_worktrees > 0 {
        spans.push(summary_span("Conflicts", summary.conflicted_worktrees, Color::Red));
    }

    if summary.in_progress_worktrees > 0 {
        spans.push(summary_span("Worktrees", summary.in_progress_worktrees, Color::Cyan));
    }

    Line::from(spans)
}

fn summary_span(label: &str, value: usize, color: Color) -> Span<'static> {
    Span::styled(
        format!("{label} {value}  "),
        Style::default().fg(color).add_modifier(Modifier::BOLD),
    )
}

fn attention_queue_line(summary: &SessionSummary, stabilized: bool) -> Line<'static> {
    if summary.failed == 0
        && summary.stopped == 0
        && summary.pending == 0
        && summary.unread_messages == 0
        && summary.conflicted_worktrees == 0
    {
        return Line::from(vec![
            Span::styled(
                "Attention queue clear",
                Style::default()
                    .fg(Color::Green)
                    .add_modifier(Modifier::BOLD),
            ),
            Span::raw(if stabilized {
                "  stabilized backlog absorbed"
            } else {
                "  no failed, stopped, or pending sessions"
            }),
        ]);
    }

    let mut spans = vec![
        Span::styled(
            "Attention queue  ",
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::BOLD),
        ),
    ];

    if summary.conflicted_worktrees > 0 {
        spans.push(summary_span("Conflicts", summary.conflicted_worktrees, Color::Red));
    }

    spans.extend([
        summary_span("Backlog", summary.unread_messages, Color::Magenta),
        summary_span("Failed", summary.failed, Color::Red),
        summary_span("Stopped", summary.stopped, Color::DarkGray),
        summary_span("Pending", summary.pending, Color::Yellow),
    ]);

    Line::from(spans)
}

fn truncate_for_dashboard(value: &str, max_chars: usize) -> String {
    let trimmed = value.trim();
    if trimmed.chars().count() <= max_chars {
        return trimmed.to_string();
    }

    let truncated: String = trimmed.chars().take(max_chars.saturating_sub(1)).collect();
    format!("{truncated}…")
}

fn build_worktree_diff_columns(patch: &str) -> WorktreeDiffColumns {
    let mut removals = Vec::new();
    let mut additions = Vec::new();

    for line in patch.lines() {
        if line.is_empty() {
            continue;
        }

        if line.starts_with("--- ") && !line.starts_with("--- a/") {
            removals.push(line.to_string());
            additions.push(line.to_string());
            continue;
        }

        if let Some(path) = line.strip_prefix("--- a/") {
            removals.push(format!("File {path}"));
            continue;
        }

        if let Some(path) = line.strip_prefix("+++ b/") {
            additions.push(format!("File {path}"));
            continue;
        }

        if line.starts_with("diff --git ") || line.starts_with("@@") {
            removals.push(line.to_string());
            additions.push(line.to_string());
            continue;
        }

        if line.starts_with('-') {
            removals.push(line.to_string());
            continue;
        }

        if line.starts_with('+') {
            additions.push(line.to_string());
            continue;
        }
    }

    WorktreeDiffColumns {
        removals: if removals.is_empty() {
            "No removals in this bounded preview.".to_string()
        } else {
            removals.join("\n")
        },
        additions: if additions.is_empty() {
            "No additions in this bounded preview.".to_string()
        } else {
            additions.join("\n")
        },
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

fn session_state_color(state: &SessionState) -> Color {
    match state {
        SessionState::Running => Color::Green,
        SessionState::Idle => Color::Yellow,
        SessionState::Failed => Color::Red,
        SessionState::Stopped => Color::DarkGray,
        SessionState::Completed => Color::Blue,
        SessionState::Pending => Color::Reset,
    }
}

fn format_session_id(id: &str) -> String {
    id.chars().take(8).collect()
}

fn build_conflict_protocol(
    session_id: &str,
    worktree: &crate::session::WorktreeInfo,
    merge_readiness: &worktree::MergeReadiness,
) -> Option<String> {
    if merge_readiness.status != worktree::MergeReadinessStatus::Conflicted {
        return None;
    }

    let mut lines = vec![
        format!("Conflict protocol for {}", format_session_id(session_id)),
        format!("Worktree {}", worktree.path.display()),
        format!("Branch {} (base {})", worktree.branch, worktree.base_branch),
        merge_readiness.summary.clone(),
    ];

    if !merge_readiness.conflicts.is_empty() {
        lines.push("Conflicts".to_string());
        for conflict in &merge_readiness.conflicts {
            lines.push(format!("- {conflict}"));
        }
    }

    lines.push("Resolution steps".to_string());
    lines.push(format!(
        "1. Inspect current patch: ecc worktree-status {session_id} --patch"
    ));
    lines.push(format!("2. Open worktree: cd {}", worktree.path.display()));
    lines.push("3. Resolve conflicts and stage files: git add <paths>".to_string());
    lines.push(format!("4. Commit the resolution on {}: git commit", worktree.branch));
    lines.push(format!(
        "5. Re-check readiness: ecc worktree-status {session_id} --check"
    ));
    lines.push(format!("6. Merge when clear: ecc merge-worktree {session_id}"));

    Some(lines.join("\n"))
}

fn assignment_action_label(action: manager::AssignmentAction) -> &'static str {
    match action {
        manager::AssignmentAction::Spawned => "spawned",
        manager::AssignmentAction::ReusedIdle => "reused idle",
        manager::AssignmentAction::ReusedActive => "reused active",
        manager::AssignmentAction::DeferredSaturated => "deferred saturated",
    }
}

fn session_branch(session: &Session) -> String {
    session
        .worktree
        .as_ref()
        .map(|worktree| worktree.branch.clone())
        .unwrap_or_else(|| "-".to_string())
}

fn format_duration(duration_secs: u64) -> String {
    let hours = duration_secs / 3600;
    let minutes = (duration_secs % 3600) / 60;
    let seconds = duration_secs % 60;
    format!("{hours:02}:{minutes:02}:{seconds:02}")
}

#[cfg(test)]
mod tests {
    use anyhow::{Context, Result};
    use chrono::Utc;
    use ratatui::{Terminal, backend::TestBackend};
    use std::fs;
    use std::path::{Path, PathBuf};
    use std::process::Command;
    use uuid::Uuid;

    use super::*;
    use crate::config::{Config, PaneLayout, Theme};

    #[test]
    fn render_sessions_shows_summary_headers_and_selected_row() {
        let dashboard = test_dashboard(
            vec![
                sample_session(
                    "run-12345678",
                    "planner",
                    SessionState::Running,
                    Some("feat/run"),
                    128,
                    15,
                ),
                sample_session(
                    "done-87654321",
                    "reviewer",
                    SessionState::Completed,
                    Some("release/v1"),
                    2048,
                    125,
                ),
            ],
            1,
        );

        let rendered = render_dashboard_text(dashboard, 180, 24);
        assert!(rendered.contains("ID"));
        assert!(rendered.contains("Branch"));
        assert!(rendered.contains("Total 2"));
        assert!(rendered.contains("Running 1"));
        assert!(rendered.contains("Completed 1"));
        assert!(rendered.contains("Attention queue clear"));
        assert!(rendered.contains("done-876"));
    }

    #[test]
    fn selected_session_metrics_text_includes_worktree_output_and_attention_queue() {
        let mut dashboard = test_dashboard(
            vec![
                sample_session(
                    "focus-12345678",
                    "planner",
                    SessionState::Running,
                    Some("ecc/focus"),
                    512,
                    42,
                ),
                sample_session(
                    "failed-87654321",
                    "reviewer",
                    SessionState::Failed,
                    Some("ecc/failed"),
                    64,
                    5,
                ),
            ],
            0,
        );
        dashboard.session_output_cache.insert(
            "focus-12345678".to_string(),
            vec![OutputLine {
                stream: OutputStream::Stdout,
                text: "last useful output".to_string(),
            }],
        );
        dashboard.selected_diff_summary = Some("1 file changed, 2 insertions(+)".to_string());
        dashboard.selected_diff_preview = vec![
            "Branch M src/main.rs".to_string(),
            "Working ?? notes.txt".to_string(),
        ];
        dashboard.selected_merge_readiness = Some(worktree::MergeReadiness {
            status: worktree::MergeReadinessStatus::Conflicted,
            summary: "Merge blocked by 1 conflict(s): src/main.rs".to_string(),
            conflicts: vec!["src/main.rs".to_string()],
        });

        let text = dashboard.selected_session_metrics_text();
        assert!(text.contains("Branch ecc/focus | Base main"));
        assert!(text.contains("Worktree /tmp/ecc/focus"));
        assert!(text.contains("Diff 1 file changed, 2 insertions(+)"));
        assert!(text.contains("Changed files"));
        assert!(text.contains("- Branch M src/main.rs"));
        assert!(text.contains("- Working ?? notes.txt"));
        assert!(text.contains("Merge blocked by 1 conflict(s): src/main.rs"));
        assert!(text.contains("- conflict src/main.rs"));
        assert!(text.contains("Last output last useful output"));
        assert!(text.contains("Needs attention:"));
        assert!(text.contains("Failed failed-8 | Render dashboard rows"));
    }

    #[test]
    fn toggle_output_mode_switches_to_worktree_diff_preview() {
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );
        dashboard.selected_diff_summary = Some("1 file changed".to_string());
        dashboard.selected_diff_patch = Some(
            "--- Branch diff vs main ---\ndiff --git a/src/lib.rs b/src/lib.rs\n@@ -1 +1 @@\n-old line\n+new line".to_string(),
        );

        dashboard.toggle_output_mode();

        assert_eq!(dashboard.output_mode, OutputMode::WorktreeDiff);
        assert_eq!(
            dashboard.operator_note.as_deref(),
            Some("showing selected worktree diff")
        );
        let rendered = dashboard.rendered_output_text(180, 30);
        assert!(rendered.contains("Diff"));
        assert!(rendered.contains("Removals"));
        assert!(rendered.contains("Additions"));
        assert!(rendered.contains("-old line"));
        assert!(rendered.contains("+new line"));
    }

    #[test]
    fn worktree_diff_columns_split_removed_and_added_lines() {
        let patch = "\
--- Branch diff vs main ---
diff --git a/src/lib.rs b/src/lib.rs
@@ -1,2 +1,2 @@
-old line
 context
+new line

--- Working tree diff ---
diff --git a/src/next.rs b/src/next.rs
@@ -3 +3 @@
-bye
+hello";

        let columns = build_worktree_diff_columns(patch);
        assert!(columns.removals.contains("Branch diff vs main"));
        assert!(columns.removals.contains("-old line"));
        assert!(columns.removals.contains("-bye"));
        assert!(columns.additions.contains("Working tree diff"));
        assert!(columns.additions.contains("+new line"));
        assert!(columns.additions.contains("+hello"));
    }

    #[test]
    fn toggle_conflict_protocol_mode_switches_to_protocol_view() {
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );
        dashboard.selected_merge_readiness = Some(worktree::MergeReadiness {
            status: worktree::MergeReadinessStatus::Conflicted,
            summary: "Merge blocked by 1 conflict(s): src/main.rs".to_string(),
            conflicts: vec!["src/main.rs".to_string()],
        });
        dashboard.selected_conflict_protocol = Some(
            "Conflict protocol for focus-12\nResolution steps\n1. Inspect current patch: ecc worktree-status focus-12345678 --patch"
                .to_string(),
        );

        dashboard.toggle_conflict_protocol_mode();

        assert_eq!(dashboard.output_mode, OutputMode::ConflictProtocol);
        assert_eq!(
            dashboard.operator_note.as_deref(),
            Some("showing worktree conflict protocol")
        );
        let rendered = dashboard.rendered_output_text(180, 30);
        assert!(rendered.contains("Conflict Protocol"));
        assert!(rendered.contains("Resolution steps"));
    }

    #[test]
    fn selected_session_metrics_text_includes_team_capacity_summary() {
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );
        dashboard.selected_team_summary = Some(TeamSummary {
            total: 3,
            idle: 1,
            running: 1,
            pending: 1,
            failed: 0,
            stopped: 0,
        });
        dashboard.global_handoff_backlog_leads = 2;
        dashboard.global_handoff_backlog_messages = 5;
        dashboard.selected_route_preview = Some("reuse idle worker-1".to_string());

        let text = dashboard.selected_session_metrics_text();
        assert!(text.contains("Team 3/8 | idle 1 | running 1 | pending 1 | failed 0 | stopped 0"));
        assert!(text.contains(
            "Global handoff backlog 2 lead(s) / 5 handoff(s) | Auto-dispatch off @ 5/lead | Auto-merge off"
        ));
        assert!(text.contains("Coordination mode dispatch-first"));
        assert!(text.contains("Next route reuse idle worker-1"));
    }

    #[test]
    fn selected_session_metrics_text_shows_auto_merge_policy_state() {
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );
        dashboard.cfg.auto_dispatch_unread_handoffs = true;
        dashboard.cfg.auto_merge_ready_worktrees = true;
        dashboard.global_handoff_backlog_leads = 1;
        dashboard.global_handoff_backlog_messages = 2;

        let text = dashboard.selected_session_metrics_text();
        assert!(text.contains(
            "Global handoff backlog 1 lead(s) / 2 handoff(s) | Auto-dispatch on @ 5/lead | Auto-merge on"
        ));
    }

    #[test]
    fn selected_session_metrics_text_includes_daemon_activity() {
        let now = Utc::now();
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );
        dashboard.daemon_activity = DaemonActivity {
            last_dispatch_at: Some(now),
            last_dispatch_routed: 4,
            last_dispatch_deferred: 2,
            last_dispatch_leads: 2,
            chronic_saturation_streak: 0,
            last_recovery_dispatch_at: Some(now + chrono::Duration::seconds(1)),
            last_recovery_dispatch_routed: 1,
            last_recovery_dispatch_leads: 1,
            last_rebalance_at: Some(now + chrono::Duration::seconds(2)),
            last_rebalance_rerouted: 1,
            last_rebalance_leads: 1,
            last_auto_merge_at: Some(now + chrono::Duration::seconds(3)),
            last_auto_merge_merged: 2,
            last_auto_merge_active_skipped: 1,
            last_auto_merge_conflicted_skipped: 1,
            last_auto_merge_dirty_skipped: 0,
            last_auto_merge_failed: 0,
        };

        let text = dashboard.selected_session_metrics_text();
        assert!(text.contains("Coordination mode dispatch-first"));
        assert!(text.contains("Chronic saturation cleared @"));
        assert!(text.contains("Last daemon dispatch 4 routed / 2 deferred across 2 lead(s)"));
        assert!(text.contains("Last daemon recovery dispatch 1 handoff(s) across 1 lead(s)"));
        assert!(text.contains("Last daemon rebalance 1 handoff(s) across 1 lead(s)"));
        assert!(
            text.contains("Last daemon auto-merge 2 merged / 1 active / 1 conflicted / 0 dirty / 0 failed")
        );
    }

    #[test]
    fn selected_session_metrics_text_shows_rebalance_first_mode_when_saturation_is_unrecovered() {
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );
        dashboard.daemon_activity = DaemonActivity {
            last_dispatch_at: Some(Utc::now()),
            last_dispatch_routed: 0,
            last_dispatch_deferred: 1,
            last_dispatch_leads: 1,
            chronic_saturation_streak: 1,
            last_recovery_dispatch_at: None,
            last_recovery_dispatch_routed: 0,
            last_recovery_dispatch_leads: 0,
            last_rebalance_at: Some(Utc::now()),
            last_rebalance_rerouted: 1,
            last_rebalance_leads: 1,
            last_auto_merge_at: None,
            last_auto_merge_merged: 0,
            last_auto_merge_active_skipped: 0,
            last_auto_merge_conflicted_skipped: 0,
            last_auto_merge_dirty_skipped: 0,
            last_auto_merge_failed: 0,
        };

        let text = dashboard.selected_session_metrics_text();
        assert!(text.contains("Coordination mode rebalance-first (chronic saturation)"));
    }

    #[test]
    fn selected_session_metrics_text_shows_rebalance_cooloff_mode_when_saturation_is_chronic() {
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );
        dashboard.daemon_activity = DaemonActivity {
            last_dispatch_at: Some(Utc::now()),
            last_dispatch_routed: 0,
            last_dispatch_deferred: 3,
            last_dispatch_leads: 1,
            chronic_saturation_streak: 3,
            last_recovery_dispatch_at: None,
            last_recovery_dispatch_routed: 0,
            last_recovery_dispatch_leads: 0,
            last_rebalance_at: Some(Utc::now()),
            last_rebalance_rerouted: 1,
            last_rebalance_leads: 1,
            last_auto_merge_at: None,
            last_auto_merge_merged: 0,
            last_auto_merge_active_skipped: 0,
            last_auto_merge_conflicted_skipped: 0,
            last_auto_merge_dirty_skipped: 0,
            last_auto_merge_failed: 0,
        };

        let text = dashboard.selected_session_metrics_text();
        assert!(text.contains("Coordination mode rebalance-cooloff (chronic saturation)"));
        assert!(text.contains("Chronic saturation streak 3 cycle(s)"));
    }

    #[test]
    fn selected_session_metrics_text_recommends_operator_escalation_when_chronic_saturation_is_stuck()
     {
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );
        dashboard.daemon_activity = DaemonActivity {
            last_dispatch_at: Some(Utc::now()),
            last_dispatch_routed: 0,
            last_dispatch_deferred: 2,
            last_dispatch_leads: 1,
            chronic_saturation_streak: 5,
            last_recovery_dispatch_at: None,
            last_recovery_dispatch_routed: 0,
            last_recovery_dispatch_leads: 0,
            last_rebalance_at: Some(Utc::now()),
            last_rebalance_rerouted: 0,
            last_rebalance_leads: 1,
            last_auto_merge_at: None,
            last_auto_merge_merged: 0,
            last_auto_merge_active_skipped: 0,
            last_auto_merge_conflicted_skipped: 0,
            last_auto_merge_dirty_skipped: 0,
            last_auto_merge_failed: 0,
        };

        let text = dashboard.selected_session_metrics_text();
        assert!(
            text.contains("Operator escalation recommended: chronic saturation is not clearing")
        );
    }

    #[test]
    fn selected_session_metrics_text_shows_stabilized_dispatch_mode_after_recovery() {
        let now = Utc::now();
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );
        dashboard.daemon_activity = DaemonActivity {
            last_dispatch_at: Some(now + chrono::Duration::seconds(2)),
            last_dispatch_routed: 2,
            last_dispatch_deferred: 0,
            last_dispatch_leads: 1,
            chronic_saturation_streak: 0,
            last_recovery_dispatch_at: Some(now + chrono::Duration::seconds(1)),
            last_recovery_dispatch_routed: 1,
            last_recovery_dispatch_leads: 1,
            last_rebalance_at: Some(now),
            last_rebalance_rerouted: 1,
            last_rebalance_leads: 1,
            last_auto_merge_at: None,
            last_auto_merge_merged: 0,
            last_auto_merge_active_skipped: 0,
            last_auto_merge_conflicted_skipped: 0,
            last_auto_merge_dirty_skipped: 0,
            last_auto_merge_failed: 0,
        };

        let text = dashboard.selected_session_metrics_text();
        assert!(text.contains("Coordination mode dispatch-first (stabilized)"));
        assert!(text.contains("Recovery stabilized @"));
        assert!(!text.contains("Last daemon recovery dispatch"));
        assert!(!text.contains("Last daemon rebalance"));
    }

    #[test]
    fn attention_queue_suppresses_inbox_pressure_when_stabilized() {
        let now = Utc::now();
        let sessions = vec![sample_session(
            "focus-12345678",
            "planner",
            SessionState::Running,
            Some("ecc/focus"),
            512,
            42,
        )];
        let unread = HashMap::from([(String::from("focus-12345678"), 3usize)]);
        let summary = SessionSummary::from_sessions(&sessions, &unread, &HashMap::new(), true);

        let line = attention_queue_line(&summary, true);
        let rendered = line
            .spans
            .iter()
            .map(|span| span.content.as_ref())
            .collect::<String>();

        assert!(rendered.contains("Attention queue clear"));
        assert!(rendered.contains("stabilized backlog absorbed"));

        let mut dashboard = test_dashboard(sessions, 0);
        dashboard.unread_message_counts = unread;
        dashboard.handoff_backlog_counts =
            HashMap::from([(String::from("focus-12345678"), 3usize)]);
        dashboard.daemon_activity = DaemonActivity {
            last_dispatch_at: Some(now + chrono::Duration::seconds(2)),
            last_dispatch_routed: 2,
            last_dispatch_deferred: 0,
            last_dispatch_leads: 1,
            chronic_saturation_streak: 0,
            last_recovery_dispatch_at: Some(now + chrono::Duration::seconds(1)),
            last_recovery_dispatch_routed: 1,
            last_recovery_dispatch_leads: 1,
            last_rebalance_at: Some(now),
            last_rebalance_rerouted: 1,
            last_rebalance_leads: 1,
            last_auto_merge_at: None,
            last_auto_merge_merged: 0,
            last_auto_merge_active_skipped: 0,
            last_auto_merge_conflicted_skipped: 0,
            last_auto_merge_dirty_skipped: 0,
            last_auto_merge_failed: 0,
        };

        let text = dashboard.selected_session_metrics_text();
        assert!(text.contains("Attention queue clear"));
        assert!(!text.contains("Needs attention:"));
        assert!(!text.contains("Backlog focus-12"));
    }

    #[test]
    fn summary_line_includes_worktree_health_counts() {
        let sessions = vec![
            sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            ),
            sample_session(
                "worker-1234567",
                "claude",
                SessionState::Idle,
                Some("ecc/worker"),
                256,
                21,
            ),
        ];
        let unread = HashMap::new();
        let worktree_health = HashMap::from([
            (
                String::from("focus-12345678"),
                worktree::WorktreeHealth::Conflicted,
            ),
            (
                String::from("worker-1234567"),
                worktree::WorktreeHealth::InProgress,
            ),
        ]);

        let summary = SessionSummary::from_sessions(&sessions, &unread, &worktree_health, false);
        let rendered = summary_line(&summary)
            .spans
            .iter()
            .map(|span| span.content.as_ref())
            .collect::<String>();

        assert!(rendered.contains("Conflicts 1"));
        assert!(rendered.contains("Worktrees 1"));
    }

    #[test]
    fn attention_queue_keeps_conflicted_worktree_pressure_when_stabilized() {
        let now = Utc::now();
        let sessions = vec![sample_session(
            "focus-12345678",
            "planner",
            SessionState::Running,
            Some("ecc/focus"),
            512,
            42,
        )];
        let unread = HashMap::from([(String::from("focus-12345678"), 3usize)]);
        let worktree_health = HashMap::from([(
            String::from("focus-12345678"),
            worktree::WorktreeHealth::Conflicted,
        )]);

        let summary = SessionSummary::from_sessions(&sessions, &unread, &worktree_health, true);
        let rendered = attention_queue_line(&summary, true)
            .spans
            .iter()
            .map(|span| span.content.as_ref())
            .collect::<String>();

        assert!(rendered.contains("Attention queue"));
        assert!(rendered.contains("Conflicts 1"));
        assert!(!rendered.contains("Attention queue clear"));

        let mut dashboard = test_dashboard(sessions, 0);
        dashboard.unread_message_counts = unread;
        dashboard.handoff_backlog_counts =
            HashMap::from([(String::from("focus-12345678"), 3usize)]);
        dashboard.worktree_health_by_session = worktree_health;
        dashboard.daemon_activity = DaemonActivity {
            last_dispatch_at: Some(now + chrono::Duration::seconds(2)),
            last_dispatch_routed: 2,
            last_dispatch_deferred: 0,
            last_dispatch_leads: 1,
            chronic_saturation_streak: 0,
            last_recovery_dispatch_at: Some(now + chrono::Duration::seconds(1)),
            last_recovery_dispatch_routed: 1,
            last_recovery_dispatch_leads: 1,
            last_rebalance_at: Some(now),
            last_rebalance_rerouted: 1,
            last_rebalance_leads: 1,
            last_auto_merge_at: None,
            last_auto_merge_merged: 0,
            last_auto_merge_active_skipped: 0,
            last_auto_merge_conflicted_skipped: 0,
            last_auto_merge_dirty_skipped: 0,
            last_auto_merge_failed: 0,
        };

        let text = dashboard.selected_session_metrics_text();
        assert!(text.contains("Needs attention:"));
        assert!(text.contains("Conflicted worktree focus-12"));
        assert!(!text.contains("Backlog focus-12"));
    }

    #[test]
    fn route_preview_ignores_non_handoff_inbox_noise() {
        let lead = sample_session(
            "lead-12345678",
            "planner",
            SessionState::Running,
            Some("ecc/lead"),
            512,
            42,
        );
        let idle_worker = sample_session(
            "idle-worker",
            "planner",
            SessionState::Idle,
            Some("ecc/idle"),
            128,
            12,
        );

        let mut dashboard = test_dashboard(vec![lead.clone(), idle_worker.clone()], 0);
        dashboard.db.insert_session(&lead).unwrap();
        dashboard.db.insert_session(&idle_worker).unwrap();
        dashboard
            .db
            .send_message("lead-12345678", "idle-worker", "FYI status update", "info")
            .unwrap();
        dashboard
            .db
            .send_message(
                "lead-12345678",
                "idle-worker",
                "{\"task\":\"Delegated work\",\"context\":\"Delegated from lead\"}",
                "task_handoff",
            )
            .unwrap();
        dashboard.db.mark_messages_read("idle-worker").unwrap();
        dashboard
            .db
            .send_message("lead-12345678", "idle-worker", "FYI status update", "info")
            .unwrap();

        dashboard.unread_message_counts = dashboard.db.unread_message_counts().unwrap();
        dashboard.sync_selected_lineage();

        assert_eq!(
            dashboard.selected_route_preview.as_deref(),
            Some("reuse idle idle-wor")
        );
        assert_eq!(dashboard.selected_child_sessions.len(), 1);
        assert_eq!(dashboard.selected_child_sessions[0].handoff_backlog, 0);
    }

    #[test]
    fn aggregate_cost_summary_mentions_total_cost() {
        let db = StateStore::open(Path::new(":memory:")).unwrap();
        let mut cfg = Config::default();
        cfg.cost_budget_usd = 10.0;

        let mut dashboard = Dashboard::new(db, cfg);
        dashboard.sessions = vec![budget_session("sess-1", 3_500, 8.25)];

        assert_eq!(
            dashboard.aggregate_cost_summary_text(),
            "Aggregate cost $8.25 / $10.00 | Budget warning"
        );
    }

    #[test]
    fn new_session_task_uses_selected_session_context() {
        let dashboard = test_dashboard(
            vec![sample_session(
                "focus-12345678",
                "planner",
                SessionState::Running,
                Some("ecc/focus"),
                512,
                42,
            )],
            0,
        );

        assert_eq!(
            dashboard.new_session_task(),
            "Follow up on focus-12: Render dashboard rows"
        );
    }

    #[test]
    fn active_session_count_only_counts_live_queue_states() {
        let dashboard = test_dashboard(
            vec![
                sample_session("pending-1", "planner", SessionState::Pending, None, 1, 1),
                sample_session("running-1", "planner", SessionState::Running, None, 1, 1),
                sample_session("idle-1", "planner", SessionState::Idle, None, 1, 1),
                sample_session("failed-1", "planner", SessionState::Failed, None, 1, 1),
                sample_session("stopped-1", "planner", SessionState::Stopped, None, 1, 1),
                sample_session("done-1", "planner", SessionState::Completed, None, 1, 1),
            ],
            0,
        );

        assert_eq!(dashboard.active_session_count(), 3);
    }

    #[test]
    fn refresh_preserves_selected_session_by_id() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "older".to_string(),
            task: "older".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Idle,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        db.insert_session(&Session {
            id: "newer".to_string(),
            task: "newer".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now + chrono::Duration::seconds(1),
            metrics: SessionMetrics::default(),
        })?;

        let mut dashboard = Dashboard::new(db, Config::default());
        dashboard.selected_session = 1;
        dashboard.sync_selection();
        dashboard.refresh();

        assert_eq!(dashboard.selected_session_id(), Some("older"));
        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[test]
    fn metrics_scroll_does_not_mutate_output_scroll() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "inspect output".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        for index in 0..6 {
            db.append_output_line("session-1", OutputStream::Stdout, &format!("line {index}"))?;
        }

        let mut dashboard = Dashboard::new(db, Config::default());
        dashboard.selected_pane = Pane::Output;
        dashboard.refresh();
        dashboard.sync_output_scroll(3);
        dashboard.scroll_up();
        let previous_scroll = dashboard.output_scroll_offset;

        dashboard.selected_pane = Pane::Metrics;
        dashboard.scroll_up();
        dashboard.scroll_down();

        assert_eq!(dashboard.output_scroll_offset, previous_scroll);
        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[test]
    fn refresh_loads_selected_session_output_and_follows_tail() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "session-1".to_string(),
            task: "tail output".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        for index in 0..12 {
            db.append_output_line("session-1", OutputStream::Stdout, &format!("line {index}"))?;
        }

        let mut dashboard = Dashboard::new(db, Config::default());
        dashboard.selected_pane = Pane::Output;
        dashboard.refresh();
        dashboard.sync_output_scroll(4);

        assert_eq!(dashboard.output_scroll_offset, 8);
        assert!(dashboard.selected_output_text().contains("line 11"));

        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test]
    async fn stop_selected_uses_session_manager_transition() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "running-1".to_string(),
            task: "stop me".to_string(),
            agent_type: "claude".to_string(),
            state: SessionState::Running,
            working_dir: PathBuf::from("/tmp"),
            pid: Some(999_999),
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.stop_selected().await;

        let session = db
            .get_session("running-1")?
            .expect("session should exist after stop");
        assert_eq!(session.state, SessionState::Stopped);
        assert_eq!(session.pid, None);

        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test]
    async fn resume_selected_requeues_failed_session() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "failed-1".to_string(),
            task: "resume me".to_string(),
            agent_type: "claude".to_string(),
            state: SessionState::Failed,
            working_dir: PathBuf::from("/tmp/ecc2-resume"),
            pid: None,
            worktree: Some(WorktreeInfo {
                path: PathBuf::from("/tmp/ecc2-resume"),
                branch: "ecc/failed-1".to_string(),
                base_branch: "main".to_string(),
            }),
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.resume_selected().await;

        let session = db
            .get_session("failed-1")?
            .expect("session should exist after resume");
        assert_eq!(session.state, SessionState::Pending);
        assert_eq!(session.pid, None);

        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test]
    async fn cleanup_selected_worktree_clears_session_metadata() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();
        let worktree_path = std::env::temp_dir().join(format!("ecc2-cleanup-{}", Uuid::new_v4()));
        std::fs::create_dir_all(&worktree_path)?;

        db.insert_session(&Session {
            id: "stopped-1".to_string(),
            task: "cleanup me".to_string(),
            agent_type: "claude".to_string(),
            state: SessionState::Stopped,
            working_dir: worktree_path.clone(),
            pid: None,
            worktree: Some(WorktreeInfo {
                path: worktree_path.clone(),
                branch: "ecc/stopped-1".to_string(),
                base_branch: "main".to_string(),
            }),
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.cleanup_selected_worktree().await;

        let session = db
            .get_session("stopped-1")?
            .expect("session should exist after cleanup");
        assert!(
            session.worktree.is_none(),
            "worktree metadata should be cleared"
        );

        let _ = std::fs::remove_dir_all(worktree_path);
        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test]
    async fn prune_inactive_worktrees_sets_operator_note_when_clear() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "running-1".to_string(),
            task: "keep alive".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.prune_inactive_worktrees().await;

        assert_eq!(
            dashboard.operator_note.as_deref(),
            Some("no inactive worktrees to prune")
        );

        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test]
    async fn prune_inactive_worktrees_reports_pruned_and_skipped_counts() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();
        let active_path = std::env::temp_dir().join(format!("ecc2-active-{}", Uuid::new_v4()));
        let stopped_path = std::env::temp_dir().join(format!("ecc2-stopped-{}", Uuid::new_v4()));
        std::fs::create_dir_all(&active_path)?;
        std::fs::create_dir_all(&stopped_path)?;

        db.insert_session(&Session {
            id: "running-1".to_string(),
            task: "keep worktree".to_string(),
            agent_type: "claude".to_string(),
            working_dir: active_path.clone(),
            state: SessionState::Running,
            pid: None,
            worktree: Some(WorktreeInfo {
                path: active_path.clone(),
                branch: "ecc/running-1".to_string(),
                base_branch: "main".to_string(),
            }),
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;
        db.insert_session(&Session {
            id: "stopped-1".to_string(),
            task: "prune me".to_string(),
            agent_type: "claude".to_string(),
            working_dir: stopped_path.clone(),
            state: SessionState::Stopped,
            pid: None,
            worktree: Some(WorktreeInfo {
                path: stopped_path.clone(),
                branch: "ecc/stopped-1".to_string(),
                base_branch: "main".to_string(),
            }),
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.prune_inactive_worktrees().await;

        assert_eq!(
            dashboard.operator_note.as_deref(),
            Some("pruned 1 inactive worktree(s); skipped 1 active session(s)")
        );
        assert!(
            db.get_session("stopped-1")?
                .expect("stopped session should exist")
                .worktree
                .is_none()
        );
        assert!(
            db.get_session("running-1")?
                .expect("running session should exist")
                .worktree
                .is_some()
        );

        let _ = std::fs::remove_dir_all(active_path);
        let _ = std::fs::remove_dir_all(stopped_path);
        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn merge_selected_worktree_sets_operator_note_when_ready() -> Result<()> {
        let tempdir = std::env::temp_dir().join(format!("dashboard-merge-{}", Uuid::new_v4()));
        let repo_root = tempdir.join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(&tempdir);
        let db = StateStore::open(&cfg.db_path)?;
        let worktree = worktree::create_for_session_in_repo("merge1234", &cfg, &repo_root)?;
        let session_id = "merge1234".to_string();
        let now = Utc::now();
        db.insert_session(&Session {
            id: session_id.clone(),
            task: "merge via dashboard".to_string(),
            agent_type: "claude".to_string(),
            working_dir: worktree.path.clone(),
            state: SessionState::Completed,
            pid: None,
            worktree: Some(worktree.clone()),
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        std::fs::write(worktree.path.join("dashboard.txt"), "dashboard merge\n")?;
        Command::new("git")
            .arg("-C")
            .arg(&worktree.path)
            .args(["add", "dashboard.txt"])
            .status()?;
        Command::new("git")
            .arg("-C")
            .arg(&worktree.path)
            .args(["commit", "-qm", "dashboard work"])
            .status()?;

        let mut dashboard = Dashboard::new(db, cfg);
        dashboard.sync_selection_by_id(Some(&session_id));
        dashboard.merge_selected_worktree().await;

        let note = dashboard
            .operator_note
            .clone()
            .context("operator note should be set")?;
        assert!(note.contains("merged ecc/merge1234 into"));
        assert!(note.contains(&format!("for {}", format_session_id(&session_id))));

        let session = dashboard
            .db
            .get_session(&session_id)?
            .context("merged session should still exist")?;
        assert!(session.worktree.is_none(), "worktree metadata should be cleared");
        assert!(!worktree.path.exists(), "worktree path should be removed");
        assert_eq!(
            std::fs::read_to_string(repo_root.join("dashboard.txt"))?,
            "dashboard merge\n"
        );

        let _ = std::fs::remove_dir_all(&tempdir);
        Ok(())
    }

    #[tokio::test(flavor = "current_thread")]
    async fn merge_ready_worktrees_sets_operator_note_with_skip_summary() -> Result<()> {
        let tempdir =
            std::env::temp_dir().join(format!("dashboard-merge-ready-{}", Uuid::new_v4()));
        let repo_root = tempdir.join("repo");
        init_git_repo(&repo_root)?;

        let cfg = build_config(&tempdir);
        let db = StateStore::open(&cfg.db_path)?;
        let now = Utc::now();

        let merged_worktree = worktree::create_for_session_in_repo("merge-ready", &cfg, &repo_root)?;
        std::fs::write(merged_worktree.path.join("merged.txt"), "dashboard bulk merge\n")?;
        Command::new("git")
            .arg("-C")
            .arg(&merged_worktree.path)
            .args(["add", "merged.txt"])
            .status()?;
        Command::new("git")
            .arg("-C")
            .arg(&merged_worktree.path)
            .args(["commit", "-qm", "dashboard bulk merge"])
            .status()?;
        db.insert_session(&Session {
            id: "merge-ready".to_string(),
            task: "merge via dashboard".to_string(),
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
            worktree::create_for_session_in_repo("active-ready", &cfg, &repo_root)?;
        db.insert_session(&Session {
            id: "active-ready".to_string(),
            task: "still active".to_string(),
            agent_type: "claude".to_string(),
            working_dir: active_worktree.path.clone(),
            state: SessionState::Running,
            pid: Some(999),
            worktree: Some(active_worktree.clone()),
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let mut dashboard = Dashboard::new(db, cfg);
        dashboard.merge_ready_worktrees().await;

        let note = dashboard
            .operator_note
            .clone()
            .context("operator note should be set")?;
        assert!(note.contains("merged 1 ready worktree(s)"));
        assert!(note.contains("skipped 1 active"));
        assert!(
            dashboard
                .db
                .get_session("merge-ready")?
                .context("merged session should still exist")?
                .worktree
                .is_none()
        );
        assert_eq!(
            std::fs::read_to_string(repo_root.join("merged.txt"))?,
            "dashboard bulk merge\n"
        );

        let _ = std::fs::remove_dir_all(&tempdir);
        Ok(())
    }

    #[tokio::test]
    async fn delete_selected_session_removes_inactive_session() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "done-1".to_string(),
            task: "delete me".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Completed,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.delete_selected_session().await;

        assert!(
            db.get_session("done-1")?.is_none(),
            "session should be deleted"
        );

        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test]
    async fn auto_dispatch_backlog_sets_operator_note_when_clear() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead-1".to_string(),
            task: "coordinate".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.auto_dispatch_backlog().await;

        assert_eq!(
            dashboard.operator_note.as_deref(),
            Some("no unread handoff backlog found")
        );

        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test]
    async fn rebalance_selected_team_sets_operator_note_when_clear() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead-1".to_string(),
            task: "coordinate".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.rebalance_selected_team().await;

        assert_eq!(
            dashboard.operator_note.as_deref(),
            Some("no delegate backlog needed rebalancing for lead-1")
        );

        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test]
    async fn rebalance_all_teams_sets_operator_note_when_clear() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead-1".to_string(),
            task: "coordinate".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.rebalance_all_teams().await;

        assert_eq!(
            dashboard.operator_note.as_deref(),
            Some("no delegate backlog needed global rebalancing")
        );

        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[tokio::test]
    async fn coordinate_backlog_sets_operator_note_when_clear() -> Result<()> {
        let db_path = std::env::temp_dir().join(format!("ecc2-dashboard-{}.db", Uuid::new_v4()));
        let db = StateStore::open(&db_path)?;
        let now = Utc::now();

        db.insert_session(&Session {
            id: "lead-1".to_string(),
            task: "coordinate".to_string(),
            agent_type: "claude".to_string(),
            working_dir: PathBuf::from("/tmp"),
            state: SessionState::Running,
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics::default(),
        })?;

        let dashboard_store = StateStore::open(&db_path)?;
        let mut dashboard = Dashboard::new(dashboard_store, Config::default());
        dashboard.coordinate_backlog().await;

        assert_eq!(
            dashboard.operator_note.as_deref(),
            Some("backlog already clear")
        );

        let _ = std::fs::remove_file(db_path);
        Ok(())
    }

    #[test]
    fn grid_layout_renders_four_panes() {
        let mut dashboard = test_dashboard(
            vec![sample_session(
                "grid-1",
                "claude",
                SessionState::Running,
                None,
                1,
                1,
            )],
            0,
        );
        dashboard.cfg.pane_layout = PaneLayout::Grid;
        dashboard.pane_size_percent = DEFAULT_GRID_SIZE_PERCENT;

        let areas = dashboard.pane_areas(Rect::new(0, 0, 100, 40));
        let log_area = areas.log.expect("grid layout should include a log pane");

        assert!(areas.output.x > areas.sessions.x);
        assert!(areas.metrics.y > areas.sessions.y);
        assert!(log_area.x > areas.metrics.x);
    }

    #[test]
    fn pane_resize_clamps_to_bounds() {
        let mut dashboard = test_dashboard(Vec::new(), 0);
        dashboard.cfg.pane_layout = PaneLayout::Grid;
        dashboard.pane_size_percent = DEFAULT_GRID_SIZE_PERCENT;

        for _ in 0..20 {
            dashboard.increase_pane_size();
        }
        assert_eq!(dashboard.pane_size_percent, MAX_PANE_SIZE_PERCENT);

        for _ in 0..40 {
            dashboard.decrease_pane_size();
        }
        assert_eq!(dashboard.pane_size_percent, MIN_PANE_SIZE_PERCENT);
    }

    #[test]
    fn pane_navigation_skips_log_outside_grid_layouts() {
        let mut dashboard = test_dashboard(Vec::new(), 0);
        dashboard.next_pane();
        dashboard.next_pane();
        dashboard.next_pane();
        assert_eq!(dashboard.selected_pane, Pane::Sessions);

        dashboard.cfg.pane_layout = PaneLayout::Grid;
        dashboard.pane_size_percent = DEFAULT_GRID_SIZE_PERCENT;
        dashboard.next_pane();
        dashboard.next_pane();
        dashboard.next_pane();
        assert_eq!(dashboard.selected_pane, Pane::Log);
    }

    fn test_dashboard(sessions: Vec<Session>, selected_session: usize) -> Dashboard {
        let selected_session = selected_session.min(sessions.len().saturating_sub(1));
        let cfg = Config::default();
        let output_store = SessionOutputStore::default();
        let output_rx = output_store.subscribe();
        let mut session_table_state = TableState::default();
        if !sessions.is_empty() {
            session_table_state.select(Some(selected_session));
        }

        Dashboard {
            db: StateStore::open(Path::new(":memory:")).expect("open test db"),
            pane_size_percent: match cfg.pane_layout {
                PaneLayout::Grid => DEFAULT_GRID_SIZE_PERCENT,
                PaneLayout::Horizontal | PaneLayout::Vertical => DEFAULT_PANE_SIZE_PERCENT,
            },
            cfg,
            output_store,
            output_rx,
            sessions,
            session_output_cache: HashMap::new(),
            unread_message_counts: HashMap::new(),
            handoff_backlog_counts: HashMap::new(),
            worktree_health_by_session: HashMap::new(),
            global_handoff_backlog_leads: 0,
            global_handoff_backlog_messages: 0,
            daemon_activity: DaemonActivity::default(),
            selected_messages: Vec::new(),
            selected_parent_session: None,
            selected_child_sessions: Vec::new(),
            selected_team_summary: None,
            selected_route_preview: None,
            logs: Vec::new(),
            selected_diff_summary: None,
            selected_diff_preview: Vec::new(),
            selected_diff_patch: None,
            selected_conflict_protocol: None,
            selected_merge_readiness: None,
            output_mode: OutputMode::SessionOutput,
            selected_pane: Pane::Sessions,
            selected_session,
            show_help: false,
            operator_note: None,
            output_follow: true,
            output_scroll_offset: 0,
            last_output_height: 0,
            session_table_state,
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
            auto_merge_ready_worktrees: false,
            cost_budget_usd: 10.0,
            token_budget: 500_000,
            theme: Theme::Dark,
            pane_layout: PaneLayout::Horizontal,
            risk_thresholds: Config::RISK_THRESHOLDS,
        }
    }

    fn init_git_repo(path: &Path) -> Result<()> {
        fs::create_dir_all(path)?;
        run_git(path, &["init", "-q"])?;
        run_git(path, &["config", "user.name", "ECC Tests"])?;
        run_git(path, &["config", "user.email", "ecc-tests@example.com"])?;
        fs::write(path.join("README.md"), "hello\n")?;
        run_git(path, &["add", "README.md"])?;
        run_git(path, &["commit", "-qm", "init"])?;
        Ok(())
    }

    fn run_git(path: &Path, args: &[&str]) -> Result<()> {
        let output = Command::new("git")
            .arg("-C")
            .arg(path)
            .args(args)
            .output()?;
        if !output.status.success() {
            anyhow::bail!("{}", String::from_utf8_lossy(&output.stderr));
        }
        Ok(())
    }

    fn sample_session(
        id: &str,
        agent_type: &str,
        state: SessionState,
        branch: Option<&str>,
        tokens_used: u64,
        duration_secs: u64,
    ) -> Session {
        Session {
            id: id.to_string(),
            task: "Render dashboard rows".to_string(),
            agent_type: agent_type.to_string(),
            state,
            working_dir: branch
                .map(|branch| PathBuf::from(format!("/tmp/{branch}")))
                .unwrap_or_else(|| PathBuf::from("/tmp")),
            pid: None,
            worktree: branch.map(|branch| WorktreeInfo {
                path: PathBuf::from(format!("/tmp/{branch}")),
                branch: branch.to_string(),
                base_branch: "main".to_string(),
            }),
            created_at: Utc::now(),
            updated_at: Utc::now(),
            metrics: SessionMetrics {
                tokens_used,
                tool_calls: 4,
                files_changed: 2,
                duration_secs,
                cost_usd: 0.42,
            },
        }
    }

    fn budget_session(id: &str, tokens_used: u64, cost_usd: f64) -> Session {
        let now = Utc::now();
        Session {
            id: id.to_string(),
            task: "Budget tracking".to_string(),
            agent_type: "claude".to_string(),
            state: SessionState::Running,
            working_dir: PathBuf::from("/tmp"),
            pid: None,
            worktree: None,
            created_at: now,
            updated_at: now,
            metrics: SessionMetrics {
                tokens_used,
                tool_calls: 0,
                files_changed: 0,
                duration_secs: 0,
                cost_usd,
            },
        }
    }

    fn render_dashboard_text(mut dashboard: Dashboard, width: u16, height: u16) -> String {
        let backend = TestBackend::new(width, height);
        let mut terminal = Terminal::new(backend).expect("create terminal");

        terminal
            .draw(|frame| dashboard.render(frame))
            .expect("render dashboard");

        let buffer = terminal.backend().buffer();
        buffer
            .content
            .chunks(buffer.area.width as usize)
            .map(|cells| cells.iter().map(|cell| cell.symbol()).collect::<String>())
            .collect::<Vec<_>>()
            .join("\n")
    }
}
