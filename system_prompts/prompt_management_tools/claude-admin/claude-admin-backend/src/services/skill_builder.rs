use claude_admin_shared::*;

/// Hardcoded skill template catalog.
pub fn get_skill_templates() -> Vec<SkillTemplate> {
    vec![
        SkillTemplate {
            id: "code-review".to_string(),
            name: "Code Review".to_string(),
            description: "Automated code review with configurable focus areas".to_string(),
            category: "Development".to_string(),
            trigger_example: "/review".to_string(),
            frontmatter: SkillFrontmatter {
                description: Some("Reviews code for quality, bugs, and best practices".to_string()),
                user_invocable: Some(true),
            },
            content_template: r#"# Code Review

Review the code changes for:
- Bug risks and edge cases
- Performance issues
- Security vulnerabilities
- Code style and readability

Provide specific, actionable feedback with line references.
"#
            .to_string(),
        },
        SkillTemplate {
            id: "deploy".to_string(),
            name: "Deploy".to_string(),
            description: "Deployment workflow automation".to_string(),
            category: "DevOps".to_string(),
            trigger_example: "/deploy".to_string(),
            frontmatter: SkillFrontmatter {
                description: Some("Runs deployment checks and pushes to production".to_string()),
                user_invocable: Some(true),
            },
            content_template: r#"# Deploy

Deployment workflow:
1. Run all tests
2. Check for uncommitted changes
3. Build production artifacts
4. Push to remote
5. Verify deployment

Abort on any failure and report the issue.
"#
            .to_string(),
        },
        SkillTemplate {
            id: "testing".to_string(),
            name: "Test Suite".to_string(),
            description: "Generate comprehensive test suites".to_string(),
            category: "Testing".to_string(),
            trigger_example: "/test".to_string(),
            frontmatter: SkillFrontmatter {
                description: Some("Generates tests for specified code".to_string()),
                user_invocable: Some(true),
            },
            content_template: r#"# Test Suite Generator

Generate comprehensive tests for the specified code:
- Unit tests for individual functions
- Integration tests for module interactions
- Edge cases and error conditions
- Use the project's existing test framework and patterns
"#
            .to_string(),
        },
        SkillTemplate {
            id: "docs".to_string(),
            name: "Documentation".to_string(),
            description: "Generate or update documentation".to_string(),
            category: "Documentation".to_string(),
            trigger_example: "/docs".to_string(),
            frontmatter: SkillFrontmatter {
                description: Some("Generates or updates project documentation".to_string()),
                user_invocable: Some(true),
            },
            content_template: r#"# Documentation Generator

Document the specified code or feature:
- API reference with parameters and return types
- Usage examples
- Architecture decisions
- Keep documentation close to the code
"#
            .to_string(),
        },
        SkillTemplate {
            id: "refactor".to_string(),
            name: "Refactor".to_string(),
            description: "Guided code refactoring".to_string(),
            category: "Development".to_string(),
            trigger_example: "/refactor".to_string(),
            frontmatter: SkillFrontmatter {
                description: Some("Refactors code to improve quality".to_string()),
                user_invocable: Some(true),
            },
            content_template: r#"# Refactor

Refactor the specified code:
- Identify code smells and anti-patterns
- Propose specific improvements
- Maintain existing behavior (no functional changes)
- Run tests after each change to verify correctness
"#
            .to_string(),
        },
    ]
}

/// Preview a skill by rendering its frontmatter + content into the final format.
pub fn preview_skill(req: &SkillPreviewRequest) -> SkillPreviewResponse {
    let mut warnings = Vec::new();

    // Build rendered preview
    let mut rendered = String::new();
    rendered.push_str("---\n");
    if let Some(desc) = &req.frontmatter.description {
        rendered.push_str(&format!("description: {}\n", desc));
    }
    if let Some(invocable) = req.frontmatter.user_invocable {
        rendered.push_str(&format!("user_invocable: {}\n", invocable));
    }
    rendered.push_str("---\n\n");
    rendered.push_str(&req.content);

    // Extract trigger from description or content
    let trigger = req.frontmatter.description.as_ref().and_then(|d| {
        if d.contains('/') {
            d.split_whitespace()
                .find(|w| w.starts_with('/'))
                .map(String::from)
        } else {
            None
        }
    });

    // Warnings
    if req.frontmatter.description.is_none()
        || req
            .frontmatter
            .description
            .as_ref()
            .map(|d| d.is_empty())
            .unwrap_or(true)
    {
        warnings
            .push("Missing description — Claude won't know when to use this skill.".to_string());
    }
    if req.content.trim().is_empty() {
        warnings.push("Empty content — the skill has no instructions.".to_string());
    }
    if req.content.len() > 10000 {
        warnings.push(
            "Very long content (>10KB) — consider splitting into multiple skills.".to_string(),
        );
    }

    SkillPreviewResponse {
        rendered,
        trigger,
        warnings,
    }
}
