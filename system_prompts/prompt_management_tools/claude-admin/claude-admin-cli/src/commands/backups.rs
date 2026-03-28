use crate::client::ApiClient;
use clap::Subcommand;
use claude_admin_shared::{BackupEntry, PruneResult};

#[derive(Subcommand)]
pub enum BackupAction {
    /// List all backups
    List,
    /// Restore a backup
    Restore {
        /// Backup name
        name: String,
    },
    /// Prune old backups
    Prune,
}

pub async fn run(client: &ApiClient, action: BackupAction) -> Result<(), String> {
    match action {
        BackupAction::List => {
            let backups: Vec<BackupEntry> = client.get("/backups").await?;
            if backups.is_empty() {
                println!("No backups found.");
                return Ok(());
            }
            println!("{:<50} {:<10} Created", "Name", "Size");
            println!("{}", "-".repeat(80));
            for b in backups {
                let size = if b.size_bytes >= 1024 {
                    format!("{:.1} KB", b.size_bytes as f64 / 1024.0)
                } else {
                    format!("{} B", b.size_bytes)
                };
                println!("{:<50} {:<10} {}", b.name, size, b.created);
            }
        }
        BackupAction::Restore { name } => {
            let _: serde_json::Value = client
                .post(&format!("/backups/{}/restore", name), &())
                .await?;
            println!("Backup '{}' restored.", name);
        }
        BackupAction::Prune => {
            let result: PruneResult = client.post("/backups/prune", &()).await?;
            println!(
                "Pruned {} backups, {} remaining.",
                result.deleted_count, result.remaining_count
            );
        }
    }
    Ok(())
}
