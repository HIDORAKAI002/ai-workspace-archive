use std::path::Path;

use crate::app::AppState;
use crate::domain::errors::ApiError;
use crate::services::claude_api::AnthropicClient;
use crate::services::fs_scanner;
use claude_admin_shared::*;

/// Analyze a project and generate an advisor report via Claude API.
pub async fn analyze_project(
    state: &AppState,
    client: &AnthropicClient,
    project_path: &str,
    lang: &str,
) -> Result<AdvisorReport, ApiError> {
    // Gather context
    let context = gather_project_context(state, project_path).await?;

    // Build prompt and call Claude
    let system = build_advisor_system_prompt(lang);
    let user = build_advisor_user_prompt(&context);

    let response = crate::services::claude_api::call_claude_raw(client, &system, &user).await?;

    parse_advisor_response(&response)
}

struct ProjectContext {
    project_path: String,
    project_name: String,
    // Project files detected
    detected_stack: Vec<String>,
    readme_snippet: Option<String>,
    // Current Claude config
    has_claude_md: bool,
    claude_md_content: Option<String>,
    has_memory: bool,
    memory_files: Vec<String>,
    project_skills: Vec<String>,
    project_rules: Vec<String>,
    // Global config available
    global_skills: Vec<SkillSummary>,
    global_rules: Vec<String>,
    hooks_summary: String,
}

struct SkillSummary {
    name: String,
    description: String,
    user_invocable: bool,
}

async fn gather_project_context(
    state: &AppState,
    project_path: &str,
) -> Result<ProjectContext, ApiError> {
    let p = Path::new(project_path);
    let project_name = p
        .file_name()
        .unwrap_or_default()
        .to_string_lossy()
        .to_string();

    // Detect project stack
    let detected_stack = detect_stack(p).await;

    // Read README snippet (first 50 lines)
    let readme_snippet = read_readme_snippet(p).await;

    // Current Claude config for this project
    let detail = fs_scanner::scan_project_detail(&state.claude_home, project_path)
        .await
        .unwrap_or_else(|_| ProjectDetail {
            summary: ProjectSummary {
                path: project_path.to_string(),
                encoded_path: String::new(),
                name: project_name.clone(),
                has_claude_md: false,
                has_claude_dir: false,
                has_rules: false,
                has_skills: false,
                has_memory: false,
            },
            claude_md: None,
            rules: vec![],
            skills: vec![],
            memory_files: vec![],
        });

    // Global skills
    let global_skills = fs_scanner::scan_skills(&state.claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default()
        .into_iter()
        .map(|s| SkillSummary {
            name: s.name,
            description: s.frontmatter.description.unwrap_or_default(),
            user_invocable: s.frontmatter.user_invocable.unwrap_or(false),
        })
        .collect();

    let global_rules = fs_scanner::scan_rules(&state.claude_home, &ConfigScope::Global)
        .await
        .unwrap_or_default()
        .into_iter()
        .map(|r| r.name)
        .collect();

    // Hooks summary
    let settings = fs_scanner::scan_settings(&state.claude_home)
        .await
        .unwrap_or(SettingsOverview {
            global_settings: serde_json::Value::Null,
            hooks: HooksConfig::default(),
        });
    let hooks_summary = format!(
        "{} PreToolUse hooks, {} PostToolUse hooks",
        settings.hooks.pre_tool_use.len(),
        settings.hooks.post_tool_use.len()
    );

    Ok(ProjectContext {
        project_path: project_path.to_string(),
        project_name,
        detected_stack,
        readme_snippet,
        has_claude_md: detail.summary.has_claude_md,
        claude_md_content: detail.claude_md,
        has_memory: detail.summary.has_memory,
        memory_files: detail.memory_files.iter().map(|m| m.name.clone()).collect(),
        project_skills: detail.skills.iter().map(|s| s.name.clone()).collect(),
        project_rules: detail.rules.iter().map(|r| r.name.clone()).collect(),
        global_skills,
        global_rules,
        hooks_summary,
    })
}

async fn detect_stack(project_path: &Path) -> Vec<String> {
    let mut stack = Vec::new();

    let checks = [
        ("Cargo.toml", "Rust"),
        ("package.json", "Node.js"),
        ("pyproject.toml", "Python"),
        ("go.mod", "Go"),
        ("pom.xml", "Java/Maven"),
        ("build.gradle", "Java/Gradle"),
        ("Gemfile", "Ruby"),
        ("composer.json", "PHP"),
        ("tsconfig.json", "TypeScript"),
        ("Dockerfile", "Docker"),
        ("docker-compose.yml", "Docker Compose"),
        ("Makefile", "Make"),
        (".github/workflows", "GitHub Actions"),
    ];

    for (file, label) in checks {
        if tokio::fs::try_exists(project_path.join(file))
            .await
            .unwrap_or(false)
        {
            stack.push(label.to_string());
        }
    }

    if stack.is_empty() {
        stack.push("Unbekannt".to_string());
    }

    stack
}

async fn read_readme_snippet(project_path: &Path) -> Option<String> {
    for name in ["README.md", "readme.md", "Readme.md"] {
        let path = project_path.join(name);
        if tokio::fs::try_exists(&path).await.unwrap_or(false) {
            if let Ok(content) = tokio::fs::read_to_string(&path).await {
                let lines: Vec<&str> = content.lines().take(50).collect();
                return Some(lines.join("\n"));
            }
        }
    }

    // Fallback: try CLAUDE.md
    let claude_md = project_path.join("CLAUDE.md");
    if tokio::fs::try_exists(&claude_md).await.unwrap_or(false) {
        if let Ok(content) = tokio::fs::read_to_string(&claude_md).await {
            let lines: Vec<&str> = content.lines().take(30).collect();
            return Some(lines.join("\n"));
        }
    }

    None
}

fn build_advisor_system_prompt(lang: &str) -> String {
    let lang_instruction = crate::domain::extractors::lang_instruction(lang);
    format!(
        "You are an experienced Claude Code configuration advisor. You analyze a project and \
         provide concrete, helpful recommendations on how the developer can improve their Claude \
         Code setup for this project.\n\n\
         {}\n\n\
         Respond as JSON with this schema:\n\
         {{\n\
           \"project_summary\": \"Brief description of what the project is about (1-2 sentences)\",\n\
           \"recommendations\": [\n\
             {{\n\
               \"category\": \"global_skill\" | \"global_rule\" | \"claude_md\" | \"memory\" | \"hooks\" | \"general\",\n\
               \"title\": \"Short title\",\n\
               \"description\": \"Detailed explanation of why this helps and what to do\",\n\
               \"action\": {{\n\
                 \"label\": \"Button text for the action\",\n\
                 \"action_type\": \"create_claude_md\" | \"update_claude_md\" | \"enable_skill\" | \"create_rule\" | \"init_memory\",\n\
                 \"payload\": \"Content of the file or config to be created/changed\"\n\
               }}\n\
             }}\n\
           ]\n\
         }}\n\n\
         Rules for recommendations:\n\
         - Maximum 6 recommendations, sorted by importance\n\
         - Each recommendation must be concrete and actionable\n\
         - If the project is already well configured, say so! Don't force empty recommendations\n\
         - \"action\" is optional - only set when the action can be performed automatically\n\
         - For action.payload: Write the COMPLETE content of the file to be created\n\
         - Consider the project's tech stack (Rust, Node.js, Python etc.)\n\
         - Reference available global skills and explain which ones help the project\n\
         - Check if CLAUDE.md is missing or can be improved\n\
         - Check if memory would be useful\n\
         - Check if project-specific rules would help",
        lang_instruction
    )
}

fn build_advisor_user_prompt(ctx: &ProjectContext) -> String {
    let mut prompt = String::new();

    prompt.push_str(&format!("## Projekt: {}\n", ctx.project_name));
    prompt.push_str(&format!("Pfad: {}\n", ctx.project_path));
    prompt.push_str(&format!(
        "Tech-Stack: {}\n\n",
        ctx.detected_stack.join(", ")
    ));

    if let Some(readme) = &ctx.readme_snippet {
        prompt.push_str("### README/Beschreibung:\n```\n");
        prompt.push_str(readme);
        prompt.push_str("\n```\n\n");
    }

    prompt.push_str("### Aktueller Claude-Code-Status:\n");
    prompt.push_str(&format!(
        "- CLAUDE.md vorhanden: {}\n",
        if ctx.has_claude_md { "Ja" } else { "Nein" }
    ));
    if let Some(cmd) = &ctx.claude_md_content {
        let preview: String = cmd.chars().take(500).collect();
        prompt.push_str(&format!(
            "- CLAUDE.md Inhalt (Auszug):\n```\n{}\n```\n",
            preview
        ));
    }
    prompt.push_str(&format!(
        "- Memory vorhanden: {}\n",
        if ctx.has_memory { "Ja" } else { "Nein" }
    ));
    if !ctx.memory_files.is_empty() {
        prompt.push_str(&format!(
            "- Memory-Dateien: {}\n",
            ctx.memory_files.join(", ")
        ));
    }
    if !ctx.project_skills.is_empty() {
        prompt.push_str(&format!(
            "- Projekt-Skills: {}\n",
            ctx.project_skills.join(", ")
        ));
    }
    if !ctx.project_rules.is_empty() {
        prompt.push_str(&format!(
            "- Projekt-Rules: {}\n",
            ctx.project_rules.join(", ")
        ));
    }

    prompt.push_str("\n### Verfügbare globale Konfiguration:\n");
    prompt.push_str("Globale Skills:\n");
    for s in &ctx.global_skills {
        prompt.push_str(&format!(
            "  - /{} {} (invocable: {})\n",
            s.name,
            if s.description.is_empty() {
                String::new()
            } else {
                format!("— {}", s.description)
            },
            s.user_invocable
        ));
    }
    if !ctx.global_rules.is_empty() {
        prompt.push_str(&format!("Globale Rules: {}\n", ctx.global_rules.join(", ")));
    } else {
        prompt.push_str("Globale Rules: keine\n");
    }
    prompt.push_str(&format!("Hooks: {}\n", ctx.hooks_summary));

    prompt.push_str("\nAnalysiere das Projekt und gib konkrete Empfehlungen.");

    prompt
}

fn parse_advisor_response(text: &str) -> Result<AdvisorReport, ApiError> {
    // Try to extract JSON from markdown code blocks
    let json_str = if let Some(start) = text.find('{') {
        if let Some(end) = text.rfind('}') {
            &text[start..=end]
        } else {
            text
        }
    } else {
        text
    };

    if let Ok(json) = serde_json::from_str::<serde_json::Value>(json_str) {
        let project_summary = json["project_summary"]
            .as_str()
            .unwrap_or("Keine Zusammenfassung verfügbar")
            .to_string();

        let recommendations = json["recommendations"]
            .as_array()
            .map(|arr| {
                arr.iter()
                    .filter_map(|r| {
                        let category = match r["category"].as_str().unwrap_or("general") {
                            "global_skill" => AdvisorCategory::GlobalSkill,
                            "global_rule" => AdvisorCategory::GlobalRule,
                            "claude_md" => AdvisorCategory::ClaudeMd,
                            "memory" => AdvisorCategory::Memory,
                            "hooks" => AdvisorCategory::Hooks,
                            _ => AdvisorCategory::General,
                        };

                        let action = r.get("action").and_then(|a| {
                            if a.is_null() {
                                return None;
                            }
                            let action_type = match a["action_type"].as_str()? {
                                "create_claude_md" => AdvisorActionType::CreateClaudeMd,
                                "update_claude_md" => AdvisorActionType::UpdateClaudeMd,
                                "enable_skill" => AdvisorActionType::EnableSkill,
                                "create_rule" => AdvisorActionType::CreateRule,
                                "init_memory" => AdvisorActionType::InitMemory,
                                _ => return None,
                            };
                            Some(AdvisorAction {
                                label: a["label"].as_str().unwrap_or("Ausführen").to_string(),
                                action_type,
                                payload: a["payload"].as_str().unwrap_or("").to_string(),
                            })
                        });

                        Some(AdvisorRecommendation {
                            category,
                            title: r["title"].as_str()?.to_string(),
                            description: r["description"].as_str().unwrap_or("").to_string(),
                            action,
                        })
                    })
                    .collect()
            })
            .unwrap_or_default();

        return Ok(AdvisorReport {
            project_summary,
            recommendations,
        });
    }

    // Fallback: return raw text as single recommendation
    Ok(AdvisorReport {
        project_summary: "Konnte Projektanalyse nicht strukturiert auswerten".to_string(),
        recommendations: vec![AdvisorRecommendation {
            category: AdvisorCategory::General,
            title: "Analyse-Ergebnis".to_string(),
            description: text.to_string(),
            action: None,
        }],
    })
}
