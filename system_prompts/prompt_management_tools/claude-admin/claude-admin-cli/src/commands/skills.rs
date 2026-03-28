use crate::client::ApiClient;
use clap::Subcommand;
use claude_admin_shared::SkillFile;

#[derive(Subcommand)]
pub enum SkillAction {
    /// List all skills
    List,
    /// Get a skill by scope and name
    Get {
        /// Scope (global or project)
        scope: String,
        /// Skill name
        name: String,
    },
    /// Create a new skill
    Create {
        /// Skill name
        name: String,
        /// Content (reads from stdin if not provided)
        #[arg(short, long)]
        content: Option<String>,
    },
    /// Delete a skill
    Delete {
        /// Scope
        scope: String,
        /// Skill name
        name: String,
    },
}

pub async fn run(client: &ApiClient, action: SkillAction) -> Result<(), String> {
    match action {
        SkillAction::List => {
            let skills: Vec<SkillFile> = client.get("/skills").await?;
            if skills.is_empty() {
                println!("No skills found.");
                return Ok(());
            }
            println!("{:<10} {:<30} Description", "Scope", "Name");
            println!("{}", "-".repeat(70));
            for skill in skills {
                let scope = format!("{:?}", skill.scope).to_lowercase();
                let desc = skill
                    .frontmatter
                    .description
                    .unwrap_or_else(|| "-".to_string());
                println!("{:<10} {:<30} {}", scope, skill.name, desc);
            }
        }
        SkillAction::Get { scope, name } => {
            let skill: SkillFile = client.get(&format!("/skills/{}/{}", scope, name)).await?;
            println!("Name: {}", skill.name);
            if let Some(desc) = skill.frontmatter.description {
                println!("Description: {}", desc);
            }
            println!("---");
            println!("{}", skill.content);
        }
        SkillAction::Create { name, content } => {
            let content = content.unwrap_or_else(|| {
                use std::io::Read;
                let mut buf = String::new();
                std::io::stdin()
                    .read_to_string(&mut buf)
                    .unwrap_or_default();
                buf
            });
            let req = claude_admin_shared::SkillCreateRequest {
                name: name.clone(),
                scope: claude_admin_shared::ConfigScope::Global,
                frontmatter: claude_admin_shared::SkillFrontmatter::default(),
                content,
            };
            let _: SkillFile = client.post("/skills", &req).await?;
            println!("Skill '{}' created.", name);
        }
        SkillAction::Delete { scope, name } => {
            client
                .delete(&format!("/skills/{}/{}", scope, name))
                .await?;
            println!("Skill '{}/{}' deleted.", scope, name);
        }
    }
    Ok(())
}
