use std::path::Path;

use crate::domain::errors::ApiError;
use crate::services::project_resolver;
use claude_admin_shared::*;

/// Compute health overview for all projects.
pub async fn overall_health(
    claude_home: &Path,
    claude_json_path: &Path,
) -> Result<HealthOverview, ApiError> {
    let projects =
        crate::services::fs_scanner::scan_projects(claude_home, claude_json_path).await?;
    let mut summaries = Vec::new();
    let mut total_score: u64 = 0;

    for project in &projects {
        let health = compute_health_score(claude_home, &project.path).await?;
        let mut issues = Vec::new();

        if !health.has_claude_md {
            issues.push("Missing CLAUDE.md".to_string());
        }
        if !health.has_memory {
            issues.push("No memory files".to_string());
        }
        if health.permission_count > 50 {
            issues.push(format!(
                "{} permission entries (bloated)",
                health.permission_count
            ));
        }
        if !health.security_issues.is_empty() {
            issues.push(format!("{} security issues", health.security_issues.len()));
        }
        if !health.duplicated_rules.is_empty() {
            issues.push(format!(
                "{} duplicated rules",
                health.duplicated_rules.len()
            ));
        }

        total_score += health.score as u64;
        summaries.push(ProjectHealthSummary {
            project_id: project.encoded_path.clone(),
            name: project.name.clone(),
            score: health.score,
            issues,
        });
    }

    let average_score = if summaries.is_empty() {
        0
    } else {
        (total_score / summaries.len() as u64) as u8
    };

    summaries.sort_by(|a, b| a.score.cmp(&b.score));

    Ok(HealthOverview {
        projects: summaries,
        average_score,
    })
}

/// Compute health score for a single project (0-100).
pub async fn compute_health_score(
    claude_home: &Path,
    project_path: &str,
) -> Result<ProjectHealth, ApiError> {
    let project_fs = Path::new(project_path);
    let encoded = project_resolver::encode_project_path(project_path);
    let claude_project_dir = claude_home.join("projects").join(&encoded);

    let has_claude_md = tokio::fs::try_exists(project_fs.join("CLAUDE.md"))
        .await
        .unwrap_or(false);

    let has_memory_dir = tokio::fs::try_exists(claude_project_dir.join("memory"))
        .await
        .unwrap_or(false);
    let has_memory = if has_memory_dir {
        if let Ok(mut dir) = tokio::fs::read_dir(claude_project_dir.join("memory")).await {
            dir.next_entry().await.unwrap_or(None).is_some()
        } else {
            false
        }
    } else {
        false
    };

    // Count permissions
    let settings_local = project_fs.join(".claude").join("settings.local.json");
    let (permission_count, security_issues) = if tokio::fs::try_exists(&settings_local)
        .await
        .unwrap_or(false)
    {
        let perms = crate::services::permissions::scan_project_permissions(project_path).await?;
        let sec_issues = perms.security_warnings;
        (perms.entries.len(), sec_issues)
    } else {
        (0, vec![])
    };

    // Check for project-specific skills/rules
    let has_project_config = tokio::fs::try_exists(claude_project_dir.join("skills"))
        .await
        .unwrap_or(false)
        || tokio::fs::try_exists(claude_project_dir.join("rules"))
            .await
            .unwrap_or(false)
        || tokio::fs::try_exists(project_fs.join(".claude").join("skills"))
            .await
            .unwrap_or(false)
        || tokio::fs::try_exists(project_fs.join(".claude").join("rules"))
            .await
            .unwrap_or(false);

    // Find duplicated rules
    let duplicated_rules = find_duplicated_rules(claude_home, project_path).await;

    // Calculate score
    let mut score: u8 = 0;

    // Has CLAUDE.md? (+20)
    if has_claude_md {
        score += 20;
    }

    // Has Memory? (+10)
    if has_memory {
        score += 10;
    }

    // Permission list manageable (<50)? (+15)
    if permission_count < 50 {
        score += 15;
    }

    // No security issues? (+25)
    if security_issues.is_empty() {
        score += 25;
    }

    // No duplicated rules? (+15)
    if duplicated_rules.is_empty() {
        score += 15;
    }

    // Uses project-specific config? (+15)
    if has_project_config {
        score += 15;
    }

    Ok(ProjectHealth {
        score,
        has_claude_md,
        has_memory,
        permission_count,
        security_issues,
        duplicated_rules,
    })
}

/// Detect conflicts between global rules and project rules for all projects.
pub async fn detect_all_rule_conflicts(
    claude_home: &Path,
    claude_json_path: &Path,
) -> Vec<ConflictInfo> {
    let projects = crate::services::fs_scanner::scan_projects_lite(claude_json_path)
        .await
        .unwrap_or_default();

    let mut all_conflicts = Vec::new();
    for project in &projects {
        let mut conflicts = detect_rule_conflicts(claude_home, &project.path).await;
        all_conflicts.append(&mut conflicts);
    }
    all_conflicts
}

/// Detect conflicts between global rules and project rules for a single project.
pub async fn detect_rule_conflicts(claude_home: &Path, project_path: &str) -> Vec<ConflictInfo> {
    let mut conflicts = Vec::new();

    // Load global rules
    let global_rules = crate::services::fs_scanner::scan_rules(claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();

    // Load project rules
    let encoded = crate::services::project_resolver::encode_project_path(project_path);
    let project_rules_dir = claude_home.join("projects").join(&encoded).join("rules");
    let local_rules_dir = std::path::Path::new(project_path)
        .join(".claude")
        .join("rules");

    let mut project_rules: Vec<RuleFile> = Vec::new();
    for dir in [project_rules_dir, local_rules_dir] {
        if !tokio::fs::try_exists(&dir).await.unwrap_or(false) {
            continue;
        }
        if let Ok(mut entries) = tokio::fs::read_dir(&dir).await {
            while let Ok(Some(entry)) = entries.next_entry().await {
                let path = entry.path();
                if path.extension().is_some_and(|e| e == "md") {
                    if let Ok(content) = tokio::fs::read_to_string(&path).await {
                        let name = path
                            .file_stem()
                            .map(|s| s.to_string_lossy().to_string())
                            .unwrap_or_default();
                        project_rules.push(RuleFile {
                            name,
                            path: path.to_string_lossy().to_string(),
                            scope: ConfigScope::Project,
                            content,
                        });
                    }
                }
            }
        }
    }

    // Contradiction keywords (pairs of opposites)
    let contradictions: &[(&str, &str)] = &[
        ("always", "never"),
        ("must", "must not"),
        ("require", "forbid"),
        ("enable", "disable"),
        ("allow", "deny"),
        ("prefer", "avoid"),
    ];

    for proj_rule in &project_rules {
        for glob_rule in &global_rules {
            // 1. Name collision
            if proj_rule.name == glob_rule.name {
                conflicts.push(ConflictInfo {
                    name: proj_rule.name.clone(),
                    file_type: ClaudeFileType::Rule,
                    global_path: glob_rule.path.clone(),
                    project_path: proj_rule.path.clone(),
                    conflict_type: ConflictType::NameCollision,
                    description: format!(
                        "Rule '{}' exists in both global and project scope",
                        proj_rule.name
                    ),
                });
                continue;
            }

            let proj_lower = proj_rule.content.to_lowercase();
            let glob_lower = glob_rule.content.to_lowercase();

            // 2. Content overlap: significant lines that appear in both
            let glob_lines: Vec<&str> =
                glob_lower.lines().filter(|l| l.trim().len() > 20).collect();
            let has_overlap = glob_lines.iter().any(|l| proj_lower.contains(l.trim()));

            if has_overlap {
                conflicts.push(ConflictInfo {
                    name: format!("{} vs {}", glob_rule.name, proj_rule.name),
                    file_type: ClaudeFileType::Rule,
                    global_path: glob_rule.path.clone(),
                    project_path: proj_rule.path.clone(),
                    conflict_type: ConflictType::ContentOverlap,
                    description: format!(
                        "Global rule '{}' and project rule '{}' have overlapping content",
                        glob_rule.name, proj_rule.name
                    ),
                });
                continue;
            }

            // 3. Contradiction detection via keyword pairs
            for (word_a, word_b) in contradictions {
                let glob_has_a = glob_lower.contains(word_a);
                let proj_has_b = proj_lower.contains(word_b);
                let glob_has_b = glob_lower.contains(word_b);
                let proj_has_a = proj_lower.contains(word_a);

                if (glob_has_a && proj_has_b) || (glob_has_b && proj_has_a) {
                    // Check if they reference similar topics (share at least one significant word)
                    let glob_words: std::collections::HashSet<&str> = glob_lower
                        .split_whitespace()
                        .filter(|w| w.len() > 4)
                        .collect();
                    let proj_words: std::collections::HashSet<&str> = proj_lower
                        .split_whitespace()
                        .filter(|w| w.len() > 4)
                        .collect();
                    let shared: Vec<&&str> = glob_words.intersection(&proj_words).take(3).collect();

                    if !shared.is_empty() {
                        conflicts.push(ConflictInfo {
                            name: format!("{} vs {}", glob_rule.name, proj_rule.name),
                            file_type: ClaudeFileType::Rule,
                            global_path: glob_rule.path.clone(),
                            project_path: proj_rule.path.clone(),
                            conflict_type: ConflictType::Contradiction,
                            description: format!(
                                "Possible contradiction: '{}' (global) vs '{}' (project) — opposing keywords '{}/{}' on shared topic",
                                glob_rule.name, proj_rule.name, word_a, word_b
                            ),
                        });
                        break;
                    }
                }
            }
        }
    }

    conflicts
}

/// Find rules that are duplicated between project CLAUDE.md and global rules/skills.
async fn find_duplicated_rules(claude_home: &Path, project_path: &str) -> Vec<DuplicatedRule> {
    let mut duplicates = Vec::new();

    // Read project CLAUDE.md
    let project_claude_md = Path::new(project_path).join("CLAUDE.md");
    let project_content = match tokio::fs::read_to_string(&project_claude_md).await {
        Ok(c) => c,
        Err(_) => return duplicates,
    };

    // Read global rules
    let rules_dir = claude_home.join("rules");
    if tokio::fs::try_exists(&rules_dir).await.unwrap_or(false) {
        if let Ok(mut dir) = tokio::fs::read_dir(&rules_dir).await {
            while let Ok(Some(entry)) = dir.next_entry().await {
                let path = entry.path();
                if path.extension().is_some_and(|e| e == "md") {
                    if let Ok(rule_content) = tokio::fs::read_to_string(&path).await {
                        // Check if significant portions overlap (simple line-based check)
                        let rule_lines: Vec<&str> = rule_content
                            .lines()
                            .filter(|l| l.trim().len() > 20)
                            .collect();
                        for line in &rule_lines {
                            if project_content.contains(line.trim()) {
                                duplicates.push(DuplicatedRule {
                                    text: line.trim().chars().take(100).collect(),
                                    found_in_project: "CLAUDE.md".to_string(),
                                    also_in_global: format!(
                                        "rules/{}",
                                        path.file_name().unwrap_or_default().to_string_lossy()
                                    ),
                                });
                                break; // One match per file is enough
                            }
                        }
                    }
                }
            }
        }
    }

    duplicates
}
