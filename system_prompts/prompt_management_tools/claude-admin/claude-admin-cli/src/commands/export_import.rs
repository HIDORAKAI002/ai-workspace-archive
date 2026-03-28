use crate::client::ApiClient;
use claude_admin_shared::{ExportBundle, ImportResult};

pub async fn export(client: &ApiClient, output: Option<String>) -> Result<(), String> {
    let bundle: ExportBundle = client.get("/export").await?;
    let json =
        serde_json::to_string_pretty(&bundle).map_err(|e| format!("Serialize error: {}", e))?;

    if let Some(path) = output {
        std::fs::write(&path, &json).map_err(|e| format!("Write error: {}", e))?;
        println!("Exported to {}", path);
    } else {
        println!("{}", json);
    }
    Ok(())
}

pub async fn import(client: &ApiClient, file: &str) -> Result<(), String> {
    let content = std::fs::read_to_string(file).map_err(|e| format!("Read error: {}", e))?;
    let bundle: ExportBundle =
        serde_json::from_str(&content).map_err(|e| format!("Parse error: {}", e))?;
    let result: ImportResult = client.post("/import", &bundle).await?;

    println!("Import complete:");
    println!("  Skills:      {}", result.skills_imported);
    println!("  Rules:       {}", result.rules_imported);
    println!("  Settings:    {}", result.settings_imported);
    println!("  MCP Servers: {}", result.mcp_servers_imported);
    Ok(())
}
