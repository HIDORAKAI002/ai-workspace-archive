use std::path::Path;

use crate::domain::errors::ApiError;
use crate::domain::frontmatter;
use claude_admin_shared::*;

/// Extract a human-readable project name from a path.
/// Handles edge cases: "/" → "/ (Root)", empty → "(unnamed)".
fn project_name_from_path(path: &str) -> String {
    if path == "/" {
        return "/ (Root)".to_string();
    }
    Path::new(path)
        .file_name()
        .map(|s| s.to_string_lossy().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| "(unnamed)".to_string())
}

/// Scan ~/.claude/ and ~/.claude.json to build a lightweight dashboard overview.
/// Health score is NOT computed here - loaded lazily via separate endpoint.
pub async fn scan_dashboard(
    claude_home: &Path,
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
) -> Result<DashboardOverview, ApiError> {
    let skills = scan_skills(claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();
    let rules = scan_rules(claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();
    let projects = scan_projects_lite(claude_json_path)
        .await
        .unwrap_or_default();
    let plans = scan_plans(claude_home).await.unwrap_or_default();
    let mcp_count =
        crate::services::mcp::count_all_servers(claude_json_path, desktop_config_path, claude_home)
            .await;

    let recent = projects.iter().take(10).cloned().collect();

    Ok(DashboardOverview {
        global_skills_count: skills.len(),
        global_rules_count: rules.len(),
        projects_count: projects.len(),
        mcp_servers_count: mcp_count,
        plans_count: plans,
        recent_projects: recent,
        conflicts: crate::services::config_health::detect_all_rule_conflicts(
            claude_home,
            claude_json_path,
        )
        .await,
        health_score: None, // Loaded lazily via /api/v1/dashboard/health
    })
}

/// Instant project list from ~/.claude.json - NO filesystem checks.
/// Just parses JSON keys → names + paths. O(1) per project.
pub async fn scan_projects_lite(
    claude_json_path: &Path,
) -> Result<Vec<ProjectSummaryLite>, ApiError> {
    let json_content = tokio::fs::read_to_string(claude_json_path)
        .await
        .map_err(|e| ApiError::Internal(format!("Cannot read ~/.claude.json: {}", e)))?;

    let json: serde_json::Value = serde_json::from_str(&json_content)?;

    let projects_obj = json
        .get("projects")
        .and_then(|v| v.as_object())
        .ok_or_else(|| ApiError::Internal("No 'projects' key in ~/.claude.json".to_string()))?;

    let mut projects = Vec::new();

    for (path_key, _value) in projects_obj {
        let path = path_key.clone();
        let name = project_name_from_path(&path);
        let encoded = crate::services::project_resolver::encode_project_id(&path);

        projects.push(ProjectSummaryLite {
            path,
            encoded_path: encoded,
            name,
        });
    }

    projects.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(projects)
}

/// JIT status check for a single project - called on demand.
pub async fn scan_project_status(
    claude_home: &Path,
    project_path: &str,
) -> Result<ProjectStatus, ApiError> {
    let project_fs = Path::new(project_path);
    let encoded_dir_name = crate::services::project_resolver::encode_project_path(project_path);
    let claude_project_dir = claude_home.join("projects").join(&encoded_dir_name);

    let has_claude_md = tokio::fs::try_exists(project_fs.join("CLAUDE.md"))
        .await
        .unwrap_or(false);
    let has_claude_dir = tokio::fs::try_exists(&claude_project_dir)
        .await
        .unwrap_or(false);

    let has_rules = tokio::fs::try_exists(claude_project_dir.join("rules"))
        .await
        .unwrap_or(false)
        || tokio::fs::try_exists(project_fs.join(".claude").join("rules"))
            .await
            .unwrap_or(false);

    let has_skills = tokio::fs::try_exists(claude_project_dir.join("skills"))
        .await
        .unwrap_or(false)
        || tokio::fs::try_exists(project_fs.join(".claude").join("skills"))
            .await
            .unwrap_or(false);

    let has_memory = tokio::fs::try_exists(claude_project_dir.join("memory"))
        .await
        .unwrap_or(false);

    Ok(ProjectStatus {
        has_claude_md,
        has_claude_dir,
        has_rules,
        has_skills,
        has_memory,
    })
}

/// Scan projects from ~/.claude.json "projects" keys (full version with filesystem checks).
/// Used by endpoints that need the full ProjectSummary (e.g. health overview).
pub async fn scan_projects(
    claude_home: &Path,
    claude_json_path: &Path,
) -> Result<Vec<ProjectSummary>, ApiError> {
    let json_content = tokio::fs::read_to_string(claude_json_path)
        .await
        .map_err(|e| ApiError::Internal(format!("Cannot read ~/.claude.json: {}", e)))?;

    let json: serde_json::Value = serde_json::from_str(&json_content)?;

    let projects_obj = json
        .get("projects")
        .and_then(|v| v.as_object())
        .ok_or_else(|| ApiError::Internal("No 'projects' key in ~/.claude.json".to_string()))?;

    let mut projects = Vec::new();

    for (path_key, _value) in projects_obj {
        let path = path_key.clone();
        let name = project_name_from_path(&path);

        let encoded = crate::services::project_resolver::encode_project_id(&path);

        // Check what exists in this project
        let project_path = Path::new(&path);
        let has_claude_md = tokio::fs::try_exists(project_path.join("CLAUDE.md"))
            .await
            .unwrap_or(false);

        let encoded_dir_name = crate::services::project_resolver::encode_project_path(&path);
        let claude_project_dir = claude_home.join("projects").join(&encoded_dir_name);
        let has_claude_dir = tokio::fs::try_exists(&claude_project_dir)
            .await
            .unwrap_or(false);

        let has_rules = tokio::fs::try_exists(claude_project_dir.join("rules"))
            .await
            .unwrap_or(false)
            || tokio::fs::try_exists(project_path.join(".claude").join("rules"))
                .await
                .unwrap_or(false);

        let has_skills = tokio::fs::try_exists(claude_project_dir.join("skills"))
            .await
            .unwrap_or(false)
            || tokio::fs::try_exists(project_path.join(".claude").join("skills"))
                .await
                .unwrap_or(false);

        let has_memory = tokio::fs::try_exists(claude_project_dir.join("memory"))
            .await
            .unwrap_or(false);

        projects.push(ProjectSummary {
            path,
            encoded_path: encoded,
            name,
            has_claude_md,
            has_claude_dir,
            has_rules,
            has_skills,
            has_memory,
        });
    }

    projects.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(projects)
}

/// Scan full project detail.
pub async fn scan_project_detail(
    claude_home: &Path,
    project_path: &str,
) -> Result<ProjectDetail, ApiError> {
    let encoded_dir_name = crate::services::project_resolver::encode_project_path(project_path);
    let project_fs_path = Path::new(project_path);
    let claude_project_dir = claude_home.join("projects").join(&encoded_dir_name);

    let name = project_name_from_path(project_path);

    let has_claude_md = tokio::fs::try_exists(project_fs_path.join("CLAUDE.md"))
        .await
        .unwrap_or(false);
    let has_claude_dir = tokio::fs::try_exists(&claude_project_dir)
        .await
        .unwrap_or(false);

    let claude_md = if has_claude_md {
        tokio::fs::read_to_string(project_fs_path.join("CLAUDE.md"))
            .await
            .ok()
    } else {
        None
    };

    // Scan project-level skills
    let skills = scan_project_skills(claude_home, project_path)
        .await
        .unwrap_or_default();
    let rules = scan_project_rules(claude_home, project_path)
        .await
        .unwrap_or_default();
    let memory_files = scan_project_memory(claude_home, project_path)
        .await
        .unwrap_or_default();

    let has_rules = !rules.is_empty();
    let has_skills = !skills.is_empty();
    let has_memory = !memory_files.is_empty();

    Ok(ProjectDetail {
        summary: ProjectSummary {
            path: project_path.to_string(),
            encoded_path: crate::services::project_resolver::encode_project_id(project_path),
            name,
            has_claude_md,
            has_claude_dir,
            has_rules,
            has_skills,
            has_memory,
        },
        claude_md,
        rules,
        skills,
        memory_files,
    })
}

/// Scan global skills from ~/.claude/skills/
pub async fn scan_skills(
    claude_home: &Path,
    _scope: &ConfigScope,
) -> Result<Vec<SkillFile>, ApiError> {
    let skills_dir = claude_home.join("skills");
    if !tokio::fs::try_exists(&skills_dir).await.unwrap_or(false) {
        return Ok(vec![]);
    }

    let mut skills = Vec::new();
    let mut dir = tokio::fs::read_dir(&skills_dir).await?;
    while let Some(entry) = dir.next_entry().await? {
        if !entry.file_type().await?.is_dir() {
            continue;
        }

        let skill_path = entry.path().join("SKILL.md");
        if !tokio::fs::try_exists(&skill_path).await.unwrap_or(false) {
            continue;
        }

        let content = tokio::fs::read_to_string(&skill_path).await?;
        let (fm, body) = frontmatter::parse_frontmatter(&content);
        let name = entry.file_name().to_string_lossy().to_string();

        skills.push(SkillFile {
            name,
            path: skill_path.to_string_lossy().to_string(),
            scope: ConfigScope::Global,
            frontmatter: fm.unwrap_or_default(),
            content: body,
        });
    }

    skills.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(skills)
}

/// Scan global rules from ~/.claude/rules/
pub async fn scan_rules(
    claude_home: &Path,
    _scope: &ConfigScope,
) -> Result<Vec<RuleFile>, ApiError> {
    let rules_dir = claude_home.join("rules");
    if !tokio::fs::try_exists(&rules_dir).await.unwrap_or(false) {
        return Ok(vec![]);
    }

    let mut rules = Vec::new();
    let mut dir = tokio::fs::read_dir(&rules_dir).await?;
    while let Some(entry) = dir.next_entry().await? {
        let path = entry.path();
        if path.extension().is_some_and(|e| e == "md") {
            let content = tokio::fs::read_to_string(&path).await?;
            let name = path
                .file_stem()
                .map(|s| s.to_string_lossy().to_string())
                .unwrap_or_else(|| "unknown".to_string());

            rules.push(RuleFile {
                name,
                path: path.to_string_lossy().to_string(),
                scope: ConfigScope::Global,
                content,
            });
        }
    }

    rules.sort_by(|a, b| a.name.cmp(&b.name));
    Ok(rules)
}

async fn scan_project_skills(
    claude_home: &Path,
    project_path: &str,
) -> Result<Vec<SkillFile>, ApiError> {
    // Check ~/.claude/projects/<encoded>/skills/ and <project>/.claude/skills/
    let encoded = crate::services::project_resolver::encode_project_path(project_path);
    let claude_skills = claude_home.join("projects").join(&encoded).join("skills");
    let local_skills = Path::new(project_path).join(".claude").join("skills");

    let mut skills = Vec::new();

    for dir in [claude_skills, local_skills] {
        if !tokio::fs::try_exists(&dir).await.unwrap_or(false) {
            continue;
        }
        let mut dir_entries = match tokio::fs::read_dir(&dir).await {
            Ok(d) => d,
            Err(_) => continue,
        };

        while let Some(entry) = dir_entries.next_entry().await? {
            if !entry.file_type().await?.is_dir() {
                continue;
            }
            let skill_path = entry.path().join("SKILL.md");
            if !tokio::fs::try_exists(&skill_path).await.unwrap_or(false) {
                continue;
            }
            let content = tokio::fs::read_to_string(&skill_path).await?;
            let (fm, body) = frontmatter::parse_frontmatter(&content);
            let name = entry.file_name().to_string_lossy().to_string();

            skills.push(SkillFile {
                name,
                path: skill_path.to_string_lossy().to_string(),
                scope: ConfigScope::Project,
                frontmatter: fm.unwrap_or_default(),
                content: body,
            });
        }
    }

    Ok(skills)
}

async fn scan_project_rules(
    claude_home: &Path,
    project_path: &str,
) -> Result<Vec<RuleFile>, ApiError> {
    let encoded = crate::services::project_resolver::encode_project_path(project_path);
    let claude_rules = claude_home.join("projects").join(&encoded).join("rules");
    let local_rules = Path::new(project_path).join(".claude").join("rules");

    let mut rules = Vec::new();

    for dir in [claude_rules, local_rules] {
        if !tokio::fs::try_exists(&dir).await.unwrap_or(false) {
            continue;
        }
        let mut dir_entries = match tokio::fs::read_dir(&dir).await {
            Ok(d) => d,
            Err(_) => continue,
        };

        while let Some(entry) = dir_entries.next_entry().await? {
            let path = entry.path();
            if path.extension().is_some_and(|e| e == "md") {
                let content = tokio::fs::read_to_string(&path).await?;
                let name = path
                    .file_stem()
                    .map(|s| s.to_string_lossy().to_string())
                    .unwrap_or_else(|| "unknown".to_string());
                rules.push(RuleFile {
                    name,
                    path: path.to_string_lossy().to_string(),
                    scope: ConfigScope::Project,
                    content,
                });
            }
        }
    }

    Ok(rules)
}

async fn scan_project_memory(
    claude_home: &Path,
    project_path: &str,
) -> Result<Vec<MemoryFile>, ApiError> {
    let encoded = crate::services::project_resolver::encode_project_path(project_path);
    let memory_dir = claude_home.join("projects").join(&encoded).join("memory");

    if !tokio::fs::try_exists(&memory_dir).await.unwrap_or(false) {
        return Ok(vec![]);
    }

    let mut files = Vec::new();
    let mut dir = tokio::fs::read_dir(&memory_dir).await?;
    while let Some(entry) = dir.next_entry().await? {
        let path = entry.path();
        if path.extension().is_some_and(|e| e == "md") {
            let content = tokio::fs::read_to_string(&path).await?;
            let name = path
                .file_name()
                .map(|s| s.to_string_lossy().to_string())
                .unwrap_or_else(|| "unknown.md".to_string());
            files.push(MemoryFile {
                name,
                path: path.to_string_lossy().to_string(),
                content,
            });
        }
    }

    Ok(files)
}

async fn scan_plans(claude_home: &Path) -> Result<usize, ApiError> {
    let plans_dir = claude_home.join("plans");
    if !tokio::fs::try_exists(&plans_dir).await.unwrap_or(false) {
        return Ok(0);
    }

    let mut count = 0;
    if let Ok(mut dir) = tokio::fs::read_dir(&plans_dir).await {
        while let Ok(Some(entry)) = dir.next_entry().await {
            if entry.path().extension().is_some_and(|ext| ext == "md") {
                count += 1;
            }
        }
    }

    Ok(count)
}

/// Scan settings.json for hooks configuration.
pub async fn scan_settings(claude_home: &Path) -> Result<SettingsOverview, ApiError> {
    let settings_path = claude_home.join("settings.json");

    if !tokio::fs::try_exists(&settings_path).await.unwrap_or(false) {
        return Ok(SettingsOverview {
            global_settings: serde_json::Value::Object(serde_json::Map::new()),
            hooks: HooksConfig::default(),
        });
    }

    let content = tokio::fs::read_to_string(&settings_path).await?;
    let settings: serde_json::Value = serde_json::from_str(&content)?;

    let hooks = parse_hooks(&settings);

    Ok(SettingsOverview {
        global_settings: settings,
        hooks,
    })
}

fn parse_hooks(settings: &serde_json::Value) -> HooksConfig {
    let hooks_obj = match settings.get("hooks") {
        Some(h) => h,
        None => return HooksConfig::default(),
    };

    let parse_event = |key: &str| -> Vec<HookEntry> {
        hooks_obj
            .get(key)
            .and_then(|v| serde_json::from_value::<Vec<HookEntry>>(v.clone()).ok())
            .unwrap_or_default()
    };

    HooksConfig {
        pre_tool_use: parse_event("PreToolUse"),
        post_tool_use: parse_event("PostToolUse"),
        notification: parse_event("Notification"),
        stop: parse_event("Stop"),
        user_prompt_submit: parse_event("UserPromptSubmit"),
        session_start: parse_event("SessionStart"),
    }
}

/// Scan settings hierarchy for a project: global, project, local layers.
pub async fn scan_settings_hierarchy(
    claude_home: &Path,
    project_path: &str,
) -> Result<SettingsHierarchy, ApiError> {
    let project_fs = Path::new(project_path);
    let mut layers = Vec::new();

    // Layer 1: Global settings
    let global_path = claude_home.join("settings.json");
    let global_settings = if tokio::fs::try_exists(&global_path).await.unwrap_or(false) {
        let content = tokio::fs::read_to_string(&global_path).await?;
        serde_json::from_str(&content).unwrap_or(serde_json::Value::Object(serde_json::Map::new()))
    } else {
        serde_json::Value::Object(serde_json::Map::new())
    };
    layers.push(SettingsLayer {
        scope: "global".to_string(),
        path: global_path.to_string_lossy().to_string(),
        content: global_settings.clone(),
    });

    // Layer 2: Project settings (.claude/settings.json)
    let project_settings_path = project_fs.join(".claude").join("settings.json");
    let project_settings = if tokio::fs::try_exists(&project_settings_path)
        .await
        .unwrap_or(false)
    {
        let content = tokio::fs::read_to_string(&project_settings_path).await?;
        serde_json::from_str(&content).unwrap_or(serde_json::Value::Object(serde_json::Map::new()))
    } else {
        serde_json::Value::Object(serde_json::Map::new())
    };
    layers.push(SettingsLayer {
        scope: "project".to_string(),
        path: project_settings_path.to_string_lossy().to_string(),
        content: project_settings.clone(),
    });

    // Layer 3: Local settings (.claude/settings.local.json)
    let local_settings_path = project_fs.join(".claude").join("settings.local.json");
    let local_settings = if tokio::fs::try_exists(&local_settings_path)
        .await
        .unwrap_or(false)
    {
        let content = tokio::fs::read_to_string(&local_settings_path).await?;
        serde_json::from_str(&content).unwrap_or(serde_json::Value::Object(serde_json::Map::new()))
    } else {
        serde_json::Value::Object(serde_json::Map::new())
    };
    layers.push(SettingsLayer {
        scope: "local".to_string(),
        path: local_settings_path.to_string_lossy().to_string(),
        content: local_settings.clone(),
    });

    // Collect effective hooks from all layers
    let mut effective_hooks = Vec::new();
    for (layer_settings, source) in [
        (&global_settings, "global"),
        (&project_settings, "project"),
        (&local_settings, "local"),
    ] {
        if let Some(hooks) = layer_settings.get("hooks").and_then(|v| v.as_object()) {
            for (event, entries) in hooks {
                if let Some(arr) = entries.as_array() {
                    for entry in arr {
                        let matcher = entry
                            .get("matcher")
                            .and_then(|v| v.as_str())
                            .map(|s| s.to_string());
                        if let Some(hook_arr) = entry.get("hooks").and_then(|v| v.as_array()) {
                            for hook in hook_arr {
                                let command = hook
                                    .get("command")
                                    .and_then(|v| v.as_str())
                                    .unwrap_or("")
                                    .to_string();
                                effective_hooks.push(EffectiveHook {
                                    event: event.clone(),
                                    matcher: matcher.clone(),
                                    command,
                                    source: source.to_string(),
                                });
                            }
                        }
                    }
                }
            }
        }
    }

    Ok(SettingsHierarchy {
        layers,
        effective_hooks,
    })
}

/// Parse ~/.claude.json for overview data.
pub async fn scan_claude_json(claude_json_path: &Path) -> Result<ClaudeJsonOverview, ApiError> {
    let content = tokio::fs::read_to_string(claude_json_path).await?;
    let json: serde_json::Value = serde_json::from_str(&content)?;

    let projects = json
        .get("projects")
        .cloned()
        .unwrap_or(serde_json::Value::Null);
    let mcp_servers = json
        .get("mcpServers")
        .cloned()
        .unwrap_or(serde_json::Value::Null);

    Ok(ClaudeJsonOverview {
        projects,
        mcp_servers,
    })
}
