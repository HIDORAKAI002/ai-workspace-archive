use crate::client::ApiClient;
use clap::Subcommand;
use claude_admin_shared::AnalyticsOverview;

#[derive(Subcommand)]
pub enum AnalyticsAction {
    /// Show analytics overview
    Overview,
    /// Export analytics data
    Export {
        /// Format: csv or json
        #[arg(short, long, default_value = "json")]
        format: String,
        /// Output file
        #[arg(short, long)]
        output: Option<String>,
    },
}

pub async fn run(client: &ApiClient, action: AnalyticsAction) -> Result<(), String> {
    match action {
        AnalyticsAction::Overview => {
            let overview: AnalyticsOverview = client.get("/analytics/overview").await?;
            println!("Analytics Overview");
            println!("{}", "=".repeat(40));
            println!("Total Sessions: {}", overview.total_sessions);
            println!("Total Messages: {}", overview.total_messages);
            println!("Git Commits:    {}", overview.total_git_commits);
            println!("Lines Added:    {}", overview.total_lines_added);
            println!("Lines Removed:  {}", overview.total_lines_removed);
            println!("Est. Cost:      ${:.2}", overview.estimated_total_cost_usd);

            if !overview.model_usage.is_empty() {
                println!("\nModel Usage:");
                for m in &overview.model_usage {
                    println!(
                        "  {}: {} input, {} output tokens",
                        m.model, m.input_tokens, m.output_tokens
                    );
                }
            }
        }
        AnalyticsAction::Export { format, output } => {
            let data = client
                .get_text(&format!("/analytics/export?format={}", format))
                .await?;

            if let Some(path) = output {
                std::fs::write(&path, &data).map_err(|e| format!("Write error: {}", e))?;
                println!("Exported to {}", path);
            } else {
                println!("{}", data);
            }
        }
    }
    Ok(())
}
