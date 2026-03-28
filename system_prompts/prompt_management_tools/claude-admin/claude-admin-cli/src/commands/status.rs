use crate::client::ApiClient;
use claude_admin_shared::HealthResponse;

pub async fn run(client: &ApiClient) -> Result<(), String> {
    let health: HealthResponse = client.get("/health").await?;
    println!("Status:  {}", health.status);
    println!("Version: {}", health.version);

    // Try to get dashboard overview
    if let Ok(dash) = client
        .get::<claude_admin_shared::DashboardOverview>("/dashboard")
        .await
    {
        println!("\nDashboard:");
        println!("  Skills:   {}", dash.global_skills_count);
        println!("  Rules:    {}", dash.global_rules_count);
        println!("  Projects: {}", dash.projects_count);
        println!("  MCP:      {}", dash.mcp_servers_count);
        println!("  Plans:    {}", dash.plans_count);
    }

    Ok(())
}
