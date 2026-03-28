use std::path::Path;

use crate::domain::errors::ApiError;
use crate::services::file_ops;
use claude_admin_shared::{ConfigTemplate, TemplateApplyResult};

/// Return predefined config templates.
pub fn list_templates() -> Vec<ConfigTemplate> {
    vec![
        ConfigTemplate {
            name: "rust-developer".to_string(),
            description: "Optimized for Rust projects: cargo workflows, clippy, formatting"
                .to_string(),
            category: "Development".to_string(),
            rules: vec![
                "Always run `cargo clippy` before committing.".to_string(),
                "Use `thiserror` for library errors, `anyhow` for applications.".to_string(),
                "Prefer `&str` over `String` in function parameters.".to_string(),
            ],
            skills: vec![],
            claude_md_snippet: Some(
                "## Stack\n- Language: Rust\n- Build: cargo\n- Linting: clippy\n- Formatting: rustfmt"
                    .to_string(),
            ),
        },
        ConfigTemplate {
            name: "fullstack-js".to_string(),
            description: "Full-stack JavaScript/TypeScript with React and Node.js".to_string(),
            category: "Development".to_string(),
            rules: vec![
                "Use TypeScript strict mode.".to_string(),
                "Prefer functional components with hooks.".to_string(),
                "Use `const` by default, `let` when needed, never `var`.".to_string(),
            ],
            skills: vec![],
            claude_md_snippet: Some(
                "## Stack\n- Frontend: React + TypeScript\n- Backend: Node.js/Express\n- Package Manager: npm"
                    .to_string(),
            ),
        },
        ConfigTemplate {
            name: "data-science".to_string(),
            description: "Python data science with pandas, numpy, and jupyter".to_string(),
            category: "Data Science".to_string(),
            rules: vec![
                "Use type hints for all function signatures.".to_string(),
                "Document dataframe transformations with comments.".to_string(),
                "Prefer vectorized operations over loops.".to_string(),
            ],
            skills: vec![],
            claude_md_snippet: Some(
                "## Stack\n- Language: Python 3.11+\n- Data: pandas, numpy, scipy\n- Viz: matplotlib, seaborn"
                    .to_string(),
            ),
        },
        ConfigTemplate {
            name: "enterprise-security".to_string(),
            description: "Security-focused configuration for enterprise environments".to_string(),
            category: "Security".to_string(),
            rules: vec![
                "Never write secrets, API keys, or passwords to files.".to_string(),
                "Always validate and sanitize user input.".to_string(),
                "Use parameterized queries for all database operations.".to_string(),
                "Review all file permissions before committing.".to_string(),
            ],
            skills: vec![],
            claude_md_snippet: None,
        },
    ]
}

/// Apply a template to the current configuration.
pub async fn apply_template(
    claude_home: &Path,
    template: &ConfigTemplate,
) -> Result<TemplateApplyResult, ApiError> {
    let mut result = TemplateApplyResult {
        rules_created: 0,
        skills_created: 0,
        claude_md_updated: false,
    };

    // Create rules
    let rules_dir = claude_home.join("rules");
    tokio::fs::create_dir_all(&rules_dir).await?;
    for (i, rule_content) in template.rules.iter().enumerate() {
        let name = format!("{}-rule-{}.md", template.name, i + 1);
        let path = rules_dir.join(&name);
        if !tokio::fs::try_exists(&path).await.unwrap_or(false) {
            file_ops::write_with_backup(claude_home, &path, rule_content).await?;
            result.rules_created += 1;
        }
    }

    Ok(result)
}
