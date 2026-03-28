use notify::{Event, RecommendedWatcher, RecursiveMode, Watcher};
use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::broadcast;

/// File change event for SSE.
#[derive(Clone, Debug, serde::Serialize)]
pub struct FileChangeEvent {
    pub path: String,
    pub kind: String,
    pub timestamp: String,
}

/// Start watching ~/.claude/ and broadcast changes.
pub fn start_watcher(
    claude_home: PathBuf,
    tx: Arc<broadcast::Sender<FileChangeEvent>>,
) -> Option<RecommendedWatcher> {
    let tx_clone = tx.clone();

    let mut watcher =
        notify::recommended_watcher(move |res: Result<Event, notify::Error>| match res {
            Ok(event) => {
                // Only broadcast for known file patterns
                for path in &event.paths {
                    let path_str = path.to_string_lossy().to_string();

                    let is_relevant = path_str.ends_with(".json")
                        || path_str.ends_with(".md")
                        || path_str.ends_with(".yaml")
                        || path_str.ends_with(".yml")
                        || path_str.ends_with(".log");

                    if is_relevant {
                        let change = FileChangeEvent {
                            path: path_str,
                            kind: format!("{:?}", event.kind),
                            timestamp: chrono::Utc::now().to_rfc3339(),
                        };
                        let _ = tx_clone.send(change);
                    }
                }
            }
            Err(e) => tracing::warn!("File watcher error: {}", e),
        })
        .ok()?;

    if watcher
        .watch(&claude_home, RecursiveMode::Recursive)
        .is_err()
    {
        tracing::warn!("Failed to start file watcher on {:?}", claude_home);
        return None;
    }

    tracing::info!("File watcher started on {:?}", claude_home);
    Some(watcher)
}
