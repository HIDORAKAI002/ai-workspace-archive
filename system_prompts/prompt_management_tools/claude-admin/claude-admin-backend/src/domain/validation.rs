use regex::Regex;
use std::sync::LazyLock;

use crate::domain::errors::ApiError;

static RESOURCE_NAME_RE: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"^[a-zA-Z0-9][a-zA-Z0-9._\- ]*$").unwrap());

const MAX_NAME_LEN: usize = 128;

/// Validate a resource name (skill, rule, plan, MCP server, memory topic).
/// Rejects: null bytes, path traversal (`..`, `/`, `\`), whitespace, control chars.
pub fn validate_resource_name(name: &str, resource_type: &str) -> Result<(), ApiError> {
    if name.is_empty() {
        return Err(ApiError::BadRequest(format!(
            "{} name must not be empty",
            resource_type
        )));
    }

    if name.len() > MAX_NAME_LEN {
        return Err(ApiError::BadRequest(format!(
            "{} name must not exceed {} characters",
            resource_type, MAX_NAME_LEN
        )));
    }

    if name.contains('\0') {
        return Err(ApiError::BadRequest(format!(
            "{} name contains invalid characters",
            resource_type
        )));
    }

    if name.contains("..") || name.contains('/') || name.contains('\\') {
        return Err(ApiError::BadRequest(format!(
            "{} name contains invalid path characters",
            resource_type
        )));
    }

    if name.chars().any(|c| c.is_control()) {
        return Err(ApiError::BadRequest(format!(
            "{} name contains control characters",
            resource_type
        )));
    }

    // Strip .md suffix for regex check (rules/plans may have .md extension)
    let check_name = name.strip_suffix(".md").unwrap_or(name);

    if !RESOURCE_NAME_RE.is_match(check_name) {
        return Err(ApiError::BadRequest(format!(
            "{} name must match pattern: alphanumeric start, then alphanumeric/dot/dash/underscore/space",
            resource_type
        )));
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_names() {
        assert!(validate_resource_name("my-skill", "Skill").is_ok());
        assert!(validate_resource_name("my_rule.md", "Rule").is_ok());
        assert!(validate_resource_name("test123", "Plan").is_ok());
        assert!(validate_resource_name("A.B-C_D", "MCP").is_ok());
    }

    #[test]
    fn test_valid_names_with_spaces() {
        assert!(validate_resource_name("My Custom Prompt", "System prompt").is_ok());
        assert!(validate_resource_name("code review helper", "System prompt").is_ok());
    }

    #[test]
    fn test_invalid_names() {
        assert!(validate_resource_name("", "Skill").is_err());
        assert!(validate_resource_name("../etc/passwd", "Skill").is_err());
        assert!(validate_resource_name("foo/bar", "Skill").is_err());
        assert!(validate_resource_name("foo\\bar", "Skill").is_err());
        assert!(validate_resource_name("foo\0bar", "Skill").is_err());
        assert!(validate_resource_name(".hidden", "Skill").is_err());
        assert!(validate_resource_name("-dash", "Skill").is_err());
        let long = "a".repeat(129);
        assert!(validate_resource_name(&long, "Skill").is_err());
    }
}
