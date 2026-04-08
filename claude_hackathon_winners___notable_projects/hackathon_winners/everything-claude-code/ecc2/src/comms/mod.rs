use anyhow::Result;
use serde::{Deserialize, Serialize};

use crate::session::store::StateStore;

/// Message types for inter-agent communication.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum MessageType {
    /// Task handoff from one agent to another
    TaskHandoff { task: String, context: String },
    /// Agent requesting information from another
    Query { question: String },
    /// Response to a query
    Response { answer: String },
    /// Notification of completion
    Completed {
        summary: String,
        files_changed: Vec<String>,
    },
    /// Conflict detected (e.g., two agents editing the same file)
    Conflict { file: String, description: String },
}

/// Send a structured message between sessions.
pub fn send(db: &StateStore, from: &str, to: &str, msg: &MessageType) -> Result<()> {
    let content = serde_json::to_string(msg)?;
    let msg_type = message_type_name(msg);
    db.send_message(from, to, &content, msg_type)?;
    Ok(())
}

pub fn message_type_name(msg: &MessageType) -> &'static str {
    match msg {
        MessageType::TaskHandoff { .. } => "task_handoff",
        MessageType::Query { .. } => "query",
        MessageType::Response { .. } => "response",
        MessageType::Completed { .. } => "completed",
        MessageType::Conflict { .. } => "conflict",
    }
}

pub fn parse(content: &str) -> Option<MessageType> {
    serde_json::from_str(content).ok()
}

pub fn preview(msg_type: &str, content: &str) -> String {
    match parse(content) {
        Some(MessageType::TaskHandoff { task, .. }) => {
            format!("handoff {}", truncate(&task, 56))
        }
        Some(MessageType::Query { question }) => {
            format!("query {}", truncate(&question, 56))
        }
        Some(MessageType::Response { answer }) => {
            format!("response {}", truncate(&answer, 56))
        }
        Some(MessageType::Completed {
            summary,
            files_changed,
        }) => {
            if files_changed.is_empty() {
                format!("completed {}", truncate(&summary, 48))
            } else {
                format!(
                    "completed {} | {} files",
                    truncate(&summary, 40),
                    files_changed.len()
                )
            }
        }
        Some(MessageType::Conflict { file, description }) => {
            format!("conflict {} | {}", file, truncate(&description, 40))
        }
        None => format!("{} {}", msg_type.replace('_', " "), truncate(content, 56)),
    }
}

fn truncate(value: &str, max_chars: usize) -> String {
    let trimmed = value.trim();
    if trimmed.chars().count() <= max_chars {
        return trimmed.to_string();
    }

    let truncated: String = trimmed.chars().take(max_chars.saturating_sub(1)).collect();
    format!("{truncated}…")
}
