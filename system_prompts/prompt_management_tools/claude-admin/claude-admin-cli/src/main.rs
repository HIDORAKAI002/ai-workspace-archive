mod client;
mod commands;

use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "claude-admin-cli", about = "CLI companion for ClaudeAdmin")]
struct Cli {
    /// ClaudeAdmin server URL
    #[arg(
        long,
        env = "CLAUDE_ADMIN_URL",
        default_value = "http://localhost:9022"
    )]
    url: String,

    /// Authentication token
    #[arg(long, env = "CLAUDE_ADMIN_TOKEN")]
    token: Option<String>,

    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Show server status
    Status,
    /// Manage skills
    Skills {
        #[command(subcommand)]
        action: commands::skills::SkillAction,
    },
    /// Manage rules
    Rules {
        #[command(subcommand)]
        action: commands::rules::RuleAction,
    },
    /// View analytics
    Analytics {
        #[command(subcommand)]
        action: commands::analytics::AnalyticsAction,
    },
    /// Manage backups
    Backups {
        #[command(subcommand)]
        action: commands::backups::BackupAction,
    },
    /// Export configuration bundle
    Export {
        /// Output file path
        #[arg(short, long)]
        output: Option<String>,
    },
    /// Import configuration bundle
    Import {
        /// Input file path
        file: String,
    },
}

#[tokio::main]
async fn main() {
    let cli = Cli::parse();
    let client = client::ApiClient::new(&cli.url, cli.token.as_deref());

    let result = match cli.command {
        Commands::Status => commands::status::run(&client).await,
        Commands::Skills { action } => commands::skills::run(&client, action).await,
        Commands::Rules { action } => commands::rules::run(&client, action).await,
        Commands::Analytics { action } => commands::analytics::run(&client, action).await,
        Commands::Backups { action } => commands::backups::run(&client, action).await,
        Commands::Export { output } => commands::export_import::export(&client, output).await,
        Commands::Import { file } => commands::export_import::import(&client, &file).await,
    };

    if let Err(e) = result {
        eprintln!("Error: {}", e);
        std::process::exit(1);
    }
}
