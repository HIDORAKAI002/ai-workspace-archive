use std::path::Path;

use crate::domain::errors::ApiError;
use crate::domain::frontmatter;
use claude_admin_shared::*;

/// Hardcoded list of well-known official Anthropic skills.
pub async fn get_official_skills(claude_home: &Path) -> Vec<BrowsableSkill> {
    let official = vec![
        (
            "commit",
            "Generate git commit messages from staged changes",
            "git",
        ),
        (
            "review-pr",
            "Review pull requests with detailed feedback",
            "git",
        ),
        (
            "create-pr",
            "Create pull requests with auto-generated descriptions",
            "git",
        ),
        ("fix-github-issue", "Analyze and fix GitHub issues", "git"),
        (
            "code-review",
            "Perform comprehensive code review",
            "development",
        ),
        (
            "refactor",
            "Refactor code with best practices",
            "development",
        ),
        (
            "add-tests",
            "Generate unit and integration tests",
            "testing",
        ),
        ("debug", "Debug and diagnose issues", "debugging"),
        ("explain", "Explain code and concepts", "learning"),
        (
            "document",
            "Generate documentation for code",
            "documentation",
        ),
    ];

    let mut result = Vec::new();
    for (name, desc, cat) in official {
        let installed = is_skill_installed(claude_home, name).await;
        result.push(BrowsableSkill {
            name: name.to_string(),
            description: desc.to_string(),
            source: SkillSource::Official,
            repo: "anthropics/skills".to_string(),
            path: format!("skills/{}/SKILL.md", name),
            installed,
            category: Some(cat.to_string()),
        });
    }

    result
}

/// Curated community skill index.
pub async fn get_community_skills(claude_home: &Path) -> Vec<BrowsableSkill> {
    let community = vec![
        (
            "book-generator",
            "Generate complete books from outlines",
            "awesome-claude-code",
            "content",
        ),
        (
            "blog-post",
            "Create SEO-optimized blog posts",
            "awesome-claude-code",
            "content",
        ),
        (
            "api-client",
            "Generate API client libraries from OpenAPI specs",
            "awesome-claude-code",
            "development",
        ),
        (
            "database-schema",
            "Design and generate database schemas",
            "awesome-claude-code",
            "database",
        ),
        (
            "docker-compose",
            "Generate Docker Compose configurations",
            "awesome-claude-code",
            "devops",
        ),
        (
            "ci-pipeline",
            "Create CI/CD pipeline configurations",
            "awesome-claude-code",
            "devops",
        ),
        (
            "landing-page",
            "Generate landing page HTML/CSS",
            "awesome-claude-code",
            "web",
        ),
        (
            "component-library",
            "Create reusable UI component libraries",
            "awesome-claude-code",
            "web",
        ),
        (
            "email-template",
            "Design email templates",
            "awesome-claude-code",
            "content",
        ),
        (
            "rest-api",
            "Scaffold REST API endpoints",
            "awesome-claude-code",
            "development",
        ),
        (
            "graphql-schema",
            "Generate GraphQL schemas and resolvers",
            "awesome-claude-code",
            "development",
        ),
        (
            "migration-script",
            "Create database migration scripts",
            "awesome-claude-code",
            "database",
        ),
        (
            "terraform",
            "Generate Terraform infrastructure configs",
            "awesome-claude-code",
            "devops",
        ),
        (
            "security-audit",
            "Audit code for security vulnerabilities",
            "awesome-claude-code",
            "security",
        ),
        (
            "performance-profile",
            "Profile and optimize performance",
            "awesome-claude-code",
            "development",
        ),
    ];

    let mut result = Vec::new();
    for (name, desc, repo, cat) in community {
        let installed = is_skill_installed(claude_home, name).await;
        result.push(BrowsableSkill {
            name: name.to_string(),
            description: desc.to_string(),
            source: SkillSource::Community,
            repo: repo.to_string(),
            path: format!("{}/SKILL.md", name),
            installed,
            category: Some(cat.to_string()),
        });
    }

    result
}

/// Check if a skill is locally installed.
pub async fn is_skill_installed(claude_home: &Path, name: &str) -> bool {
    tokio::fs::try_exists(claude_home.join("skills").join(name).join("SKILL.md"))
        .await
        .unwrap_or(false)
}

/// Install a skill by writing its content to ~/.claude/skills/{name}/SKILL.md.
pub async fn install_skill(claude_home: &Path, name: &str, content: &str) -> Result<(), ApiError> {
    let skill_dir = claude_home.join("skills").join(name);
    tokio::fs::create_dir_all(&skill_dir).await?;

    let skill_path = skill_dir.join("SKILL.md");
    crate::services::file_ops::write_with_backup(claude_home, &skill_path, content).await?;

    Ok(())
}

/// Get skill detail (parse frontmatter from content).
#[allow(dead_code)]
pub fn parse_skill_detail(name: &str, content: &str) -> SkillDetail {
    let (fm, body) = frontmatter::parse_frontmatter(content);
    SkillDetail {
        name: name.to_string(),
        content: body,
        frontmatter: fm.unwrap_or_default(),
    }
}
