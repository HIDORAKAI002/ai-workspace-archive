use std::path::Path;

use crate::domain::errors::ApiError;
use crate::services::fs_scanner;
use claude_admin_shared::*;

/// Search across skills, rules, CLAUDE.md, and settings.
pub async fn search(claude_home: &Path, query: &str) -> Result<Vec<SearchResult>, ApiError> {
    let query_lower = query.to_lowercase();
    let mut results = Vec::new();

    // Search skills
    let skills = fs_scanner::scan_skills(claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();
    for skill in skills {
        let score = compute_score(&skill.name, &skill.content, &query_lower);
        if score > 0.0 {
            let snippet = extract_snippet(&skill.content, &query_lower);
            results.push(SearchResult {
                resource_type: "skill".to_string(),
                name: skill.name,
                path: skill.path,
                snippet,
                score,
            });
        }
    }

    // Search rules
    let rules = fs_scanner::scan_rules(claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();
    for rule in rules {
        let score = compute_score(&rule.name, &rule.content, &query_lower);
        if score > 0.0 {
            let snippet = extract_snippet(&rule.content, &query_lower);
            results.push(SearchResult {
                resource_type: "rule".to_string(),
                name: rule.name,
                path: rule.path,
                snippet,
                score,
            });
        }
    }

    // Search settings
    let settings = fs_scanner::scan_settings(claude_home).await.ok();
    if let Some(settings) = settings {
        let content = serde_json::to_string_pretty(&settings.global_settings).unwrap_or_default();
        if content.to_lowercase().contains(&query_lower) {
            let snippet = extract_snippet(&content, &query_lower);
            results.push(SearchResult {
                resource_type: "settings".to_string(),
                name: "settings.json".to_string(),
                path: claude_home
                    .join("settings.json")
                    .to_string_lossy()
                    .to_string(),
                snippet,
                score: 0.5,
            });
        }
    }

    // Sort by score descending
    results.sort_by(|a, b| {
        b.score
            .partial_cmp(&a.score)
            .unwrap_or(std::cmp::Ordering::Equal)
    });

    Ok(results)
}

fn compute_score(name: &str, content: &str, query: &str) -> f64 {
    let name_lower = name.to_lowercase();
    let content_lower = content.to_lowercase();

    let mut score = 0.0;

    // Name exact match
    if name_lower == query {
        score += 2.0;
    }
    // Name contains
    else if name_lower.contains(query) {
        score += 1.5;
    }

    // Content contains
    if content_lower.contains(query) {
        // Count occurrences
        let count = content_lower.matches(query).count();
        score += 0.5 + (count as f64 * 0.1).min(1.0);
    }

    score
}

fn extract_snippet(content: &str, query: &str) -> String {
    let lower = content.to_lowercase();
    if let Some(pos) = lower.find(query) {
        let start = pos.saturating_sub(40);
        let end = (pos + query.len() + 40).min(content.len());

        // Find clean boundaries
        let snippet = &content[start..end];
        let prefix = if start > 0 { "..." } else { "" };
        let suffix = if end < content.len() { "..." } else { "" };
        format!("{}{}{}", prefix, snippet.trim(), suffix)
    } else {
        content.chars().take(80).collect::<String>()
    }
}
