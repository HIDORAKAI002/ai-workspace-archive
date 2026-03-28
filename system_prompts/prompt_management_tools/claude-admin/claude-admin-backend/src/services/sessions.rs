use std::path::Path;

use crate::domain::errors::ApiError;
use claude_admin_shared::*;

/// List sessions with pagination and optional project filter.
pub fn list_sessions(
    claude_home: &Path,
    offset: u64,
    limit: u64,
    project_filter: Option<&str>,
) -> Result<SessionListResponse, ApiError> {
    let session_meta_dir = claude_home.join("usage-data").join("session-meta");
    let facets_dir = claude_home.join("usage-data").join("facets");

    if !session_meta_dir.exists() {
        return Ok(SessionListResponse {
            sessions: vec![],
            total: 0,
        });
    }

    let mut sessions: Vec<SessionSummary> = Vec::new();

    if let Ok(entries) = std::fs::read_dir(&session_meta_dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.extension().is_none_or(|e| e != "json") {
                continue;
            }

            let content = match std::fs::read_to_string(&path) {
                Ok(c) => c,
                Err(_) => continue,
            };

            let json: serde_json::Value = match serde_json::from_str(&content) {
                Ok(v) => v,
                Err(_) => continue,
            };

            let session_id = path
                .file_stem()
                .unwrap_or_default()
                .to_string_lossy()
                .to_string();

            let project_path = json
                .get("projectPath")
                .or_else(|| json.get("project_path"))
                .and_then(|v| v.as_str())
                .unwrap_or("unknown");

            // Apply project filter
            if let Some(filter) = project_filter {
                if !project_path.contains(filter) {
                    continue;
                }
            }

            let project_name = Path::new(project_path)
                .file_name()
                .unwrap_or_default()
                .to_string_lossy()
                .to_string();

            let start_time = json
                .get("startTime")
                .or_else(|| json.get("start_time"))
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();

            let duration = json
                .get("durationMinutes")
                .or_else(|| json.get("duration_minutes"))
                .and_then(|v| v.as_u64())
                .unwrap_or(0);

            let msg_count = json
                .get("userMessageCount")
                .or_else(|| json.get("user_message_count"))
                .and_then(|v| v.as_u64())
                .unwrap_or(0)
                + json
                    .get("assistantMessageCount")
                    .or_else(|| json.get("assistant_message_count"))
                    .and_then(|v| v.as_u64())
                    .unwrap_or(0);

            let summary = json
                .get("summary")
                .and_then(|v| v.as_str())
                .map(|s| s.to_string());

            // Try to get outcome from facets
            let outcome = load_facet_outcome(&facets_dir, &session_id);

            sessions.push(SessionSummary {
                session_id,
                project_name,
                start_time,
                duration_minutes: duration,
                message_count: msg_count,
                summary,
                outcome,
            });
        }
    }

    // Sort by start_time descending (most recent first)
    sessions.sort_by(|a, b| b.start_time.cmp(&a.start_time));

    let total = sessions.len() as u64;
    let paginated: Vec<SessionSummary> = sessions
        .into_iter()
        .skip(offset as usize)
        .take(limit as usize)
        .collect();

    Ok(SessionListResponse {
        sessions: paginated,
        total,
    })
}

/// Get detailed session information.
pub fn get_session(claude_home: &Path, session_id: &str) -> Result<SessionDetail, ApiError> {
    let session_path = claude_home
        .join("usage-data")
        .join("session-meta")
        .join(format!("{}.json", session_id));

    if !session_path.exists() {
        return Err(ApiError::NotFound(format!(
            "Session {} not found",
            session_id
        )));
    }

    let content = std::fs::read_to_string(&session_path)?;
    let json: serde_json::Value = serde_json::from_str(&content)?;

    let facets_dir = claude_home.join("usage-data").join("facets");
    let facet = load_facet(&facets_dir, session_id);

    let tool_counts = json
        .get("toolCounts")
        .and_then(|v| v.as_object())
        .map(|obj| {
            let mut v: Vec<(String, u64)> = obj
                .iter()
                .map(|(k, v)| (k.clone(), v.as_u64().unwrap_or(0)))
                .collect();
            v.sort_by(|a, b| b.1.cmp(&a.1));
            v
        })
        .unwrap_or_default();

    let languages = json
        .get("languages")
        .and_then(|v| v.as_object())
        .map(|obj| {
            let mut v: Vec<(String, u64)> = obj
                .iter()
                .map(|(k, v)| (k.clone(), v.as_u64().unwrap_or(0)))
                .collect();
            v.sort_by(|a, b| b.1.cmp(&a.1));
            v
        })
        .unwrap_or_default();

    Ok(SessionDetail {
        session_id: session_id.to_string(),
        project_path: json
            .get("projectPath")
            .or_else(|| json.get("project_path"))
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string(),
        start_time: json
            .get("startTime")
            .or_else(|| json.get("start_time"))
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string(),
        duration_minutes: json
            .get("durationMinutes")
            .or_else(|| json.get("duration_minutes"))
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
        user_message_count: json
            .get("userMessageCount")
            .or_else(|| json.get("user_message_count"))
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
        assistant_message_count: json
            .get("assistantMessageCount")
            .or_else(|| json.get("assistant_message_count"))
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
        tool_counts,
        languages,
        git_commits: json
            .get("git")
            .and_then(|g| g.get("commits"))
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
        lines_added: json
            .get("git")
            .and_then(|g| g.get("linesAdded"))
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
        lines_removed: json
            .get("git")
            .and_then(|g| g.get("linesRemoved"))
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
        files_modified: json
            .get("git")
            .and_then(|g| g.get("filesModified"))
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
        first_prompt: json
            .get("firstPrompt")
            .or_else(|| json.get("first_prompt"))
            .and_then(|v| v.as_str())
            .map(|s| s.to_string()),
        summary: json
            .get("summary")
            .and_then(|v| v.as_str())
            .map(|s| s.to_string()),
        input_tokens: json
            .get("inputTokens")
            .or_else(|| json.get("input_tokens"))
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
        output_tokens: json
            .get("outputTokens")
            .or_else(|| json.get("output_tokens"))
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
        outcome: facet.as_ref().and_then(|f| {
            f.get("outcome")
                .and_then(|v| v.as_str())
                .map(|s| s.to_string())
        }),
        helpfulness: facet.as_ref().and_then(|f| {
            f.get("helpfulness")
                .and_then(|v| v.as_str())
                .map(|s| s.to_string())
        }),
        brief_summary: facet.as_ref().and_then(|f| {
            f.get("briefSummary")
                .and_then(|v| v.as_str())
                .map(|s| s.to_string())
        }),
    })
}

/// Search history.jsonl for matching prompts.
pub fn search_history(
    claude_home: &Path,
    query: &str,
    limit: usize,
) -> Result<Vec<HistoryEntry>, ApiError> {
    let history_path = claude_home.join("history.jsonl");
    if !history_path.exists() {
        return Ok(vec![]);
    }

    let content = std::fs::read_to_string(&history_path)?;
    let query_lower = query.to_lowercase();
    let mut results = Vec::new();

    for line in content.lines().rev() {
        if results.len() >= limit {
            break;
        }

        let json: serde_json::Value = match serde_json::from_str(line) {
            Ok(v) => v,
            Err(_) => continue,
        };

        let display = json
            .get("display")
            .or_else(|| json.get("prompt"))
            .and_then(|v| v.as_str())
            .unwrap_or("");

        if display.to_lowercase().contains(&query_lower) {
            results.push(HistoryEntry {
                display: display.to_string(),
                timestamp: json.get("timestamp").and_then(|v| v.as_u64()).unwrap_or(0),
                project: json
                    .get("project")
                    .and_then(|v| v.as_str())
                    .unwrap_or("")
                    .to_string(),
                session_id: json
                    .get("sessionId")
                    .or_else(|| json.get("session_id"))
                    .and_then(|v| v.as_str())
                    .unwrap_or("")
                    .to_string(),
            });
        }
    }

    Ok(results)
}

fn load_facet_outcome(facets_dir: &Path, session_id: &str) -> Option<String> {
    load_facet(facets_dir, session_id).and_then(|f| {
        f.get("outcome")
            .and_then(|v| v.as_str())
            .map(|s| s.to_string())
    })
}

fn load_facet(facets_dir: &Path, session_id: &str) -> Option<serde_json::Value> {
    let facet_path = facets_dir.join(format!("{}.json", session_id));
    if !facet_path.exists() {
        return None;
    }
    std::fs::read_to_string(&facet_path)
        .ok()
        .and_then(|c| serde_json::from_str(&c).ok())
}

/// Parse a session's JSONL transcript file into messages.
pub fn get_transcript(claude_home: &Path, session_id: &str) -> Result<SessionTranscript, ApiError> {
    // Session JSONL files are at ~/.claude/projects/<encoded>/sessions/<session_id>.jsonl
    // But we don't know the project path. Search all project dirs.
    let projects_dir = claude_home.join("projects");
    if !projects_dir.exists() {
        return Err(ApiError::NotFound("No projects directory".into()));
    }

    let mut jsonl_path = None;
    if let Ok(entries) = std::fs::read_dir(&projects_dir) {
        for entry in entries.flatten() {
            let candidate = entry.path().join(format!("{}.jsonl", session_id));
            if candidate.exists() {
                jsonl_path = Some(candidate);
                break;
            }
        }
    }

    let path = jsonl_path.ok_or_else(|| {
        ApiError::NotFound(format!("Transcript for session {} not found", session_id))
    })?;

    let content = std::fs::read_to_string(&path)?;
    let mut messages = Vec::new();

    for line in content.lines() {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }
        let entry: serde_json::Value = match serde_json::from_str(line) {
            Ok(v) => v,
            Err(_) => continue,
        };

        let msg_type = entry.get("type").and_then(|v| v.as_str()).unwrap_or("");

        match msg_type {
            "human" | "user" => {
                let text = extract_message_text(&entry);
                if !text.is_empty() {
                    messages.push(TranscriptMessage {
                        role: "user".to_string(),
                        content: text,
                        tool_name: None,
                        timestamp: entry
                            .get("timestamp")
                            .and_then(|v| v.as_str())
                            .map(String::from),
                    });
                }
            }
            "assistant" => {
                let text = extract_message_text(&entry);
                if !text.is_empty() {
                    messages.push(TranscriptMessage {
                        role: "assistant".to_string(),
                        content: text,
                        tool_name: None,
                        timestamp: entry
                            .get("timestamp")
                            .and_then(|v| v.as_str())
                            .map(String::from),
                    });
                }
                // Also extract tool_use blocks from assistant messages
                if let Some(content_arr) = entry
                    .get("message")
                    .and_then(|m| m.get("content"))
                    .and_then(|c| c.as_array())
                {
                    for block in content_arr {
                        if block.get("type").and_then(|v| v.as_str()) == Some("tool_use") {
                            let tool = block
                                .get("name")
                                .and_then(|v| v.as_str())
                                .unwrap_or("unknown");
                            let input = block
                                .get("input")
                                .map(|v| serde_json::to_string_pretty(v).unwrap_or_default())
                                .unwrap_or_default();
                            messages.push(TranscriptMessage {
                                role: "tool_use".to_string(),
                                content: input,
                                tool_name: Some(tool.to_string()),
                                timestamp: None,
                            });
                        }
                    }
                }
            }
            "tool_result" => {
                let text = extract_message_text(&entry);
                if !text.is_empty() {
                    messages.push(TranscriptMessage {
                        role: "tool_result".to_string(),
                        content: if text.len() > 500 {
                            format!("{}...", &text[..500])
                        } else {
                            text
                        },
                        tool_name: entry
                            .get("tool_use_id")
                            .and_then(|v| v.as_str())
                            .map(String::from),
                        timestamp: None,
                    });
                }
            }
            _ => {}
        }
    }

    Ok(SessionTranscript {
        session_id: session_id.to_string(),
        messages,
    })
}

fn extract_message_text(entry: &serde_json::Value) -> String {
    // Try message.content as string
    if let Some(text) = entry
        .get("message")
        .and_then(|m| m.get("content"))
        .and_then(|c| c.as_str())
    {
        return text.to_string();
    }
    // Try message.content as array of blocks
    if let Some(arr) = entry
        .get("message")
        .and_then(|m| m.get("content"))
        .and_then(|c| c.as_array())
    {
        let texts: Vec<&str> = arr
            .iter()
            .filter_map(|b| {
                if b.get("type").and_then(|v| v.as_str()) == Some("text") {
                    b.get("text").and_then(|v| v.as_str())
                } else {
                    None
                }
            })
            .collect();
        if !texts.is_empty() {
            return texts.join("\n");
        }
    }
    String::new()
}
