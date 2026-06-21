#!/usr/bin/env python3
"""MetaVision MCP Server - leidžia AI agentams naudoti MetaVision API"""
import asyncio
import requests
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

app = Server("metavision")

@app.list_tools()
async def list_tools():
    return [
        types.Tool(
            name="generate_3d_from_text",
            description="Generate a 3D model from text description. Returns a task ID to check status.",
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {
                        "type": "string",
                        "description": "Text description of the 3D model to generate (e.g. 'a red sports car', 'medieval sword')"
                    },
                    "api_key": {
                        "type": "string", 
                        "description": "MetaVision API key (optional for first 10 free generations)"
                    }
                },
                "required": ["prompt"]
            }
        ),
        types.Tool(
            name="check_3d_status",
            description="Check the status of a 3D model generation task",
            inputSchema={
                "type": "object",
                "properties": {
                    "task_id": {
                        "type": "string",
                        "description": "Task ID returned from generate_3d_from_text"
                    }
                },
                "required": ["task_id"]
            }
        ),
        types.Tool(
            name="validate_api_key",
            description="Validate a MetaVision API key and check remaining credits",
            inputSchema={
                "type": "object",
                "properties": {
                    "api_key": {
                        "type": "string",
                        "description": "MetaVision API key to validate"
                    }
                },
                "required": ["api_key"]
            }
        ),
        types.Tool(
            name="browse_3d_gallery",
            description="Browse MetaVision 3D model gallery",
            inputSchema={
                "type": "object",
                "properties": {}
            }
        ),
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict):
    BASE = "https://metavision.click"
    
    if name == "generate_3d_from_text":
        prompt = arguments.get("prompt", "")
        api_key = arguments.get("api_key", "")
        
        headers = {"Content-Type": "application/json"}
        if api_key:
            headers["X-API-Key"] = api_key
            
        r = requests.post(f"{BASE}/api/generate3d",
            headers=headers,
            json={"prompt": prompt},
            timeout=15)
        
        if r.status_code == 200:
            data = r.json()
            task_id = data.get("task_id", "")
            return [types.TextContent(
                type="text",
                text=f"✅ 3D generation started!\nTask ID: {task_id}\nUse check_3d_status to monitor progress.\nStudio: {BASE}/studio"
            )]
        else:
            return [types.TextContent(
                type="text", 
                text=f"❌ Error: {r.text[:200]}\nGet API key at: {BASE}/docs"
            )]
    
    elif name == "check_3d_status":
        task_id = arguments.get("task_id", "")
        r = requests.get(f"{BASE}/api/status/{task_id}", timeout=10)
        data = r.json()
        status = data.get("status", "unknown")
        progress = data.get("progress", 0)
        model_url = data.get("model", "")
        image_url = data.get("image", "")
        
        if status == "success":
            return [types.TextContent(
                type="text",
                text=f"✅ 3D Model Ready!\nStatus: {status}\nModel download: {model_url}\nPreview: {image_url}"
            )]
        else:
            return [types.TextContent(
                type="text",
                text=f"⏳ Status: {status} ({progress}%)\nCheck again in a few seconds."
            )]
    
    elif name == "validate_api_key":
        api_key = arguments.get("api_key", "")
        r = requests.post(f"{BASE}/api/key/validate",
            json={"api_key": api_key},
            timeout=10)
        data = r.json()
        
        if data.get("valid"):
            return [types.TextContent(
                type="text",
                text=f"✅ Valid API Key!\nPlan: {data.get('plan')}\nCredits: {data.get('remaining')}/{data.get('credits')}"
            )]
        else:
            return [types.TextContent(
                type="text",
                text=f"❌ Invalid API key\nGet one at: {BASE}/docs"
            )]
    
    elif name == "browse_3d_gallery":
        return [types.TextContent(
            type="text",
            text=f"🖼 MetaVision 3D Gallery\nBrowse AI-generated 3D models: {BASE}/gallery\n3D Model Library (10,000+ models): {BASE}/library\nGenerate your own: {BASE}/studio"
        )]
    
    return [types.TextContent(type="text", text="Unknown tool")]

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())

if __name__ == "__main__":
    asyncio.run(main())
