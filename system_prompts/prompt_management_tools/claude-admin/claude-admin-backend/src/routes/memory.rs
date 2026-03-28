use axum::extract::{Path, State};
use axum::Json;
use std::sync::Arc;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::domain::extractors::AppJson;
use crate::domain::validation::validate_resource_name;
use crate::services::{audit, file_ops, project_resolver};
use claude_admin_shared::{MemoryFile, MemoryUpdateRequest};

pub async fn get_memory(
    State(state): State<Arc<AppState>>,
    Path(project): Path<String>,
) -> Result<Json<Vec<MemoryFile>>, ApiError> {
    let project_path = project_resolver::decode_project_id(&project)?;
    let memory_dir = state
        .claude_home
        .join("projects")
        .join(project_resolver::encode_project_path(&project_path))
        .join("memory");

    if !tokio::fs::try_exists(&memory_dir).await.unwrap_or(false) {
        return Ok(Json(vec![]));
    }

    let mut files = Vec::new();
    let mut dir = tokio::fs::read_dir(&memory_dir).await?;
    while let Some(entry) = dir.next_entry().await? {
        let path = entry.path();
        if path.extension().is_some_and(|e| e == "md") {
            let content = tokio::fs::read_to_string(&path).await?;
            files.push(MemoryFile {
                name: path
                    .file_name()
                    .unwrap_or_default()
                    .to_string_lossy()
                    .to_string(),
                path: path.to_string_lossy().to_string(),
                content,
            });
        }
    }

    Ok(Json(files))
}

pub async fn put_memory(
    State(state): State<Arc<AppState>>,
    Path(project): Path<String>,
    AppJson(req): AppJson<MemoryUpdateRequest>,
) -> Result<Json<MemoryFile>, ApiError> {
    let project_path = project_resolver::decode_project_id(&project)?;
    let memory_dir = state
        .claude_home
        .join("projects")
        .join(project_resolver::encode_project_path(&project_path))
        .join("memory");

    tokio::fs::create_dir_all(&memory_dir).await?;
    let memory_path = memory_dir.join("MEMORY.md");
    file_ops::write_with_backup(&state.claude_home, &memory_path, &req.content).await?;

    audit::log_audit(
        &state.claude_home,
        "update",
        "memory",
        "MEMORY.md",
        Some(&project),
    )
    .await;

    Ok(Json(MemoryFile {
        name: "MEMORY.md".to_string(),
        path: memory_path.to_string_lossy().to_string(),
        content: req.content,
    }))
}

pub async fn get_topic(
    State(state): State<Arc<AppState>>,
    Path((project, name)): Path<(String, String)>,
) -> Result<Json<MemoryFile>, ApiError> {
    validate_resource_name(&name, "Memory topic")?;
    let project_path = project_resolver::decode_project_id(&project)?;
    let filename = if name.ends_with(".md") {
        name.clone()
    } else {
        format!("{}.md", name)
    };
    let topic_path = state
        .claude_home
        .join("projects")
        .join(project_resolver::encode_project_path(&project_path))
        .join("memory")
        .join(&filename);

    let content = tokio::fs::read_to_string(&topic_path)
        .await
        .map_err(|_| ApiError::NotFound(format!("Topic '{}' not found", name)))?;

    Ok(Json(MemoryFile {
        name: filename,
        path: topic_path.to_string_lossy().to_string(),
        content,
    }))
}

pub async fn put_topic(
    State(state): State<Arc<AppState>>,
    Path((project, name)): Path<(String, String)>,
    AppJson(req): AppJson<MemoryUpdateRequest>,
) -> Result<Json<MemoryFile>, ApiError> {
    validate_resource_name(&name, "Memory topic")?;
    let project_path = project_resolver::decode_project_id(&project)?;
    let filename = if name.ends_with(".md") {
        name.clone()
    } else {
        format!("{}.md", name)
    };
    let memory_dir = state
        .claude_home
        .join("projects")
        .join(project_resolver::encode_project_path(&project_path))
        .join("memory");

    tokio::fs::create_dir_all(&memory_dir).await?;
    let topic_path = memory_dir.join(&filename);
    file_ops::write_with_backup(&state.claude_home, &topic_path, &req.content).await?;

    audit::log_audit(
        &state.claude_home,
        "update",
        "memory",
        &filename,
        Some(&project),
    )
    .await;

    Ok(Json(MemoryFile {
        name: filename,
        path: topic_path.to_string_lossy().to_string(),
        content: req.content,
    }))
}
