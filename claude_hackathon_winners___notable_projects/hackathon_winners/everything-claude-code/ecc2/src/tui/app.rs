use anyhow::Result;
use crossterm::{
    event::{self, Event, KeyCode, KeyModifiers},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use ratatui::prelude::*;
use std::io;
use std::time::Duration;

use super::dashboard::Dashboard;
use crate::config::Config;
use crate::session::store::StateStore;

pub async fn run(db: StateStore, cfg: Config) -> Result<()> {
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen)?;

    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    let mut dashboard = Dashboard::new(db, cfg);

    loop {
        terminal.draw(|frame| dashboard.render(frame))?;

        if event::poll(Duration::from_millis(250))? {
            if let Event::Key(key) = event::read()? {
                match (key.modifiers, key.code) {
                    (KeyModifiers::CONTROL, KeyCode::Char('c')) => break,
                    (_, KeyCode::Char('q')) => break,
                    (_, KeyCode::Tab) => dashboard.next_pane(),
                    (KeyModifiers::SHIFT, KeyCode::BackTab) => dashboard.prev_pane(),
                    (_, KeyCode::Char('+')) | (_, KeyCode::Char('=')) => {
                        dashboard.increase_pane_size()
                    }
                    (_, KeyCode::Char('-')) => dashboard.decrease_pane_size(),
                    (_, KeyCode::Char('j')) | (_, KeyCode::Down) => dashboard.scroll_down(),
                    (_, KeyCode::Char('k')) | (_, KeyCode::Up) => dashboard.scroll_up(),
                    (_, KeyCode::Char('n')) => dashboard.new_session().await,
                    (_, KeyCode::Char('a')) => dashboard.assign_selected().await,
                    (_, KeyCode::Char('b')) => dashboard.rebalance_selected_team().await,
                    (_, KeyCode::Char('B')) => dashboard.rebalance_all_teams().await,
                    (_, KeyCode::Char('i')) => dashboard.drain_inbox_selected().await,
                    (_, KeyCode::Char('g')) => dashboard.auto_dispatch_backlog().await,
                    (_, KeyCode::Char('G')) => dashboard.coordinate_backlog().await,
                    (_, KeyCode::Char('v')) => dashboard.toggle_output_mode(),
                    (_, KeyCode::Char('c')) => dashboard.toggle_conflict_protocol_mode(),
                    (_, KeyCode::Char('m')) => dashboard.merge_selected_worktree().await,
                    (_, KeyCode::Char('M')) => dashboard.merge_ready_worktrees().await,
                    (_, KeyCode::Char('p')) => dashboard.toggle_auto_dispatch_policy(),
                    (_, KeyCode::Char('t')) => dashboard.toggle_auto_worktree_policy(),
                    (_, KeyCode::Char('w')) => dashboard.toggle_auto_merge_policy(),
                    (_, KeyCode::Char(',')) => dashboard.adjust_auto_dispatch_limit(-1),
                    (_, KeyCode::Char('.')) => dashboard.adjust_auto_dispatch_limit(1),
                    (_, KeyCode::Char('s')) => dashboard.stop_selected().await,
                    (_, KeyCode::Char('u')) => dashboard.resume_selected().await,
                    (_, KeyCode::Char('x')) => dashboard.cleanup_selected_worktree().await,
                    (_, KeyCode::Char('X')) => dashboard.prune_inactive_worktrees().await,
                    (_, KeyCode::Char('d')) => dashboard.delete_selected_session().await,
                    (_, KeyCode::Char('r')) => dashboard.refresh(),
                    (_, KeyCode::Char('?')) => dashboard.toggle_help(),
                    _ => {}
                }
            }
        }

        dashboard.tick().await;
    }

    disable_raw_mode()?;
    execute!(terminal.backend_mut(), LeaveAlternateScreen)?;
    Ok(())
}
