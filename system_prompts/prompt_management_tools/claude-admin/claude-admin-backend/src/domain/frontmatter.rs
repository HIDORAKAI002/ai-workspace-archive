use claude_admin_shared::SkillFrontmatter;

/// Parse YAML frontmatter from markdown content.
/// Frontmatter is delimited by `---` at the start and end.
pub fn parse_frontmatter(content: &str) -> (Option<SkillFrontmatter>, String) {
    let trimmed = content.trim_start();
    if !trimmed.starts_with("---") {
        return (None, content.to_string());
    }

    // Find the closing ---
    let after_first = &trimmed[3..];
    if let Some(end_idx) = after_first.find("\n---") {
        let yaml_str = &after_first[..end_idx].trim();
        let body = &after_first[end_idx + 4..]; // skip \n---
                                                // Skip leading newline in body
        let body = body.strip_prefix('\n').unwrap_or(body);

        match serde_yaml::from_str::<SkillFrontmatter>(yaml_str) {
            Ok(fm) => (Some(fm), body.to_string()),
            Err(_) => (None, content.to_string()),
        }
    } else {
        (None, content.to_string())
    }
}

/// Serialize frontmatter + body back into markdown.
pub fn serialize_frontmatter(frontmatter: &SkillFrontmatter, body: &str) -> String {
    let yaml = serde_yaml::to_string(frontmatter).unwrap_or_default();
    // serde_yaml adds a trailing newline
    format!("---\n{}---\n\n{}", yaml, body)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_frontmatter() {
        let input = r#"---
description: "Test skill"
user_invocable: true
---

# My Skill

Content here."#;

        let (fm, body) = parse_frontmatter(input);
        let fm = fm.unwrap();
        assert_eq!(fm.description, Some("Test skill".to_string()));
        assert_eq!(fm.user_invocable, Some(true));
        assert!(body.contains("# My Skill"));
    }

    #[test]
    fn test_no_frontmatter() {
        let input = "# Just markdown\n\nNo frontmatter here.";
        let (fm, body) = parse_frontmatter(input);
        assert!(fm.is_none());
        assert_eq!(body, input);
    }

    #[test]
    fn test_roundtrip() {
        let fm = SkillFrontmatter {
            description: Some("A skill".to_string()),
            user_invocable: Some(true),
        };
        let body = "# Content\n\nHello.";
        let serialized = serialize_frontmatter(&fm, body);
        let (fm2, body2) = parse_frontmatter(&serialized);
        let fm2 = fm2.unwrap();
        assert_eq!(fm2.description, fm.description);
        assert_eq!(body2.trim(), body);
    }
}
