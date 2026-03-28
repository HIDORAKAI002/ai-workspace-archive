use crate::client::ApiClient;
use clap::Subcommand;
use claude_admin_shared::RuleFile;

#[derive(Subcommand)]
pub enum RuleAction {
    /// List all rules
    List,
    /// Get a rule by scope and name
    Get {
        /// Scope (global or project)
        scope: String,
        /// Rule name
        name: String,
    },
}

pub async fn run(client: &ApiClient, action: RuleAction) -> Result<(), String> {
    match action {
        RuleAction::List => {
            let rules: Vec<RuleFile> = client.get("/rules").await?;
            if rules.is_empty() {
                println!("No rules found.");
                return Ok(());
            }
            println!("{:<10} Name", "Scope");
            println!("{}", "-".repeat(50));
            for rule in rules {
                let scope = format!("{:?}", rule.scope).to_lowercase();
                println!("{:<10} {}", scope, rule.name);
            }
        }
        RuleAction::Get { scope, name } => {
            let rule: RuleFile = client.get(&format!("/rules/{}/{}", scope, name)).await?;
            println!("{}", rule.content);
        }
    }
    Ok(())
}
