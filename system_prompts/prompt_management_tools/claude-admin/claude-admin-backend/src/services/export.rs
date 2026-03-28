use std::path::Path;

use crate::domain::errors::ApiError;
use crate::services::{fs_scanner, mcp};
use claude_admin_shared::*;

/// Create an export bundle with all global configuration.
pub async fn create_export_bundle(
    claude_home: &Path,
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
) -> Result<ExportBundle, ApiError> {
    let skills = fs_scanner::scan_skills(claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();
    let rules = fs_scanner::scan_rules(claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default();
    let settings = fs_scanner::scan_settings(claude_home)
        .await?
        .global_settings;
    let mcp_servers =
        mcp::list_mcp_servers(claude_json_path, desktop_config_path, claude_home).await?;

    Ok(ExportBundle {
        version: "1.0".to_string(),
        exported_at: chrono::Utc::now().format("%Y-%m-%dT%H:%M:%SZ").to_string(),
        skills,
        rules,
        settings,
        mcp_servers,
    })
}

/// Import a bundle, creating skills, rules, and updating settings.
pub async fn import_bundle(
    claude_home: &Path,
    claude_json_path: &Path,
    desktop_config_path: Option<&Path>,
    bundle: ExportBundle,
) -> Result<ImportResult, ApiError> {
    let mut result = ImportResult {
        skills_imported: 0,
        rules_imported: 0,
        settings_imported: false,
        mcp_servers_imported: 0,
    };

    // Import skills
    for skill in &bundle.skills {
        let skill_dir = claude_home.join("skills").join(&skill.name);
        tokio::fs::create_dir_all(&skill_dir).await?;
        let skill_path = skill_dir.join("SKILL.md");
        let content =
            crate::domain::frontmatter::serialize_frontmatter(&skill.frontmatter, &skill.content);
        crate::services::file_ops::write_with_backup(claude_home, &skill_path, &content).await?;
        result.skills_imported += 1;
    }

    // Import rules
    for rule in &bundle.rules {
        let rules_dir = claude_home.join("rules");
        tokio::fs::create_dir_all(&rules_dir).await?;
        let filename = if rule.name.ends_with(".md") {
            rule.name.clone()
        } else {
            format!("{}.md", rule.name)
        };
        let rule_path = rules_dir.join(&filename);
        crate::services::file_ops::write_with_backup(claude_home, &rule_path, &rule.content)
            .await?;
        result.rules_imported += 1;
    }

    // Import settings
    if !bundle.settings.is_null() {
        let settings_path = claude_home.join("settings.json");
        let content = serde_json::to_string_pretty(&bundle.settings)?;
        crate::services::file_ops::write_with_backup(claude_home, &settings_path, &content).await?;
        result.settings_imported = true;
    }

    // Import MCP servers
    for server in &bundle.mcp_servers {
        if server.source == "claude_code" {
            let _ = mcp::create_mcp_server(
                claude_home,
                claude_json_path,
                desktop_config_path,
                &server.name,
                server.raw_config.clone(),
            )
            .await;
            result.mcp_servers_imported += 1;
        }
    }

    Ok(result)
}
