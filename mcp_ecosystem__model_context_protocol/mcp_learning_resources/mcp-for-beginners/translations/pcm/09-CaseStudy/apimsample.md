# Case Study: Show REST API for API Management as MCP server

Azure API Management, na service wey dey provide Gateway ontop your API Endpoints. How e dey work be say Azure API Management dey act like proxy ontop your APIs and fit decide wetin e go do with incoming requests.

If you use am, e go add plenti features like:

- **Security**, you fit use everything from API keys, JWT to managed identity.
- **Rate limiting**, beta feature na to fit decide how many calls go pass per certain time. E dey help make sure say all users get beta experience and also say your service no too full with requests.
- **Scaling & Load balancing**. You fit set some endpoints wey go share the load and you fit also decide how to "load balance".
- **AI features like semantic caching**, token limit and token monitoring plus more. These features beta well well wey go beta responsiveness and also help you dey control your token spending. [Read more here](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Why MCP + Azure API Management?

Model Context Protocol dey fast become standard for agentic AI apps and how to show tools and data for one consistent way. Azure API Management na natural choice when you need to "manage" APIs. MCP Servers dey often join with other APIs to resolve requests to one tool for example. So to join Azure API Management and MCP make plenty sense.

## Overview

For this specific case, we go learn how to show API endpoints as MCP Server. By doing this, we fit easily make these endpoints be part of agentic app and also use beta features from Azure API Management.

## Key Features

- You go select the endpoint methods wey you want show as tools.
- The extra features wey you go get depend on how you set policy section for your API. But here we go show you how to add rate limiting.

## Pre-step: import API

If you already get API for Azure API Management, e good, you fit skip this step. If no, check this link, [importing an API to Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Show API as MCP Server

To show API endpoints, make we follow these steps:

1. Go Azure Portal and open <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Go your API Management instance.

1. For left menu, select APIs > MCP Servers > + Create new MCP Server.

1. For API, select REST API wey you wan show as MCP server.

1. Select one or more API Operations wey you want show as tools. You fit select all operations or only some specific operations.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Select **Create**.

1. Go menu option **APIs** and **MCP Servers**, you go see like this:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP server don create and API operations don show as tools. MCP server dey for MCP Servers pane. URL column dey show endpoint of MCP server wey you fit call for testing or for client app.

## Optional: Configure policies

Azure API Management get core concept of policies wey you fit set different rules for your endpoints like rate limiting or semantic caching. These policies dem dey write for XML.

Here how you fit set policy to rate limit your MCP Server:

1. For portal, under APIs, select **MCP Servers**.

1. Select MCP server wey you create.

1. For left menu, under MCP, select **Policies**.

1. For policy editor, add or change policies wey you want use for MCP server's tools. Policies dem dey in XML format. For example, you fit add policy to limit calls to MCP server's tools (this example na 5 calls per 30 seconds per client IP). Dis XML go do rate limit:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    This one na image of policy editor:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Try am

Make we confirm say MCP Server dey work well.

For this one, we go use Visual Studio Code and GitHub Copilot plus Agent mode. We go add MCP server to *mcp.json* file. By doing so, Visual Studio Code go behave like client with agentic powers and end users fit enter prompt and interact with the server.

Make we see how, to add MCP server inside Visual Studio Code:

1. Use MCP: **Add Server command for Command Palette**.

1. When e ask, select server type: **HTTP (HTTP or Server Sent Events)**.

1. Enter URL of MCP server for API Management. Example: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (for SSE endpoint) or **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (for MCP endpoint), note say difference between transport na `/sse` or `/mcp`.

1. Enter server ID wey you like. E no too important but e go help you remember which server instance be this.

1. Select whether to save configuration to workspace settings or user settings.

  - **Workspace settings** - Server config go save for .vscode/mcp.json file wey dey only inside current workspace.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    or if you choose streaming HTTP as transport e go be small different:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - Server config go add to your global *settings.json* file and e go dey available for all workspaces. Config look like this:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. You also need add config, a header to make sure e authenticate well to Azure API Management. E use header called **Ocp-Apim-Subscription-Key*. 

    - How to add to settings:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), dis one go cause prompt to ask for API key value wey you fit find for Azure Portal for your Azure API Management instance.

   - To add am to *mcp.json* instead, you fit add am like dis:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Use Agent mode

Now we don set all, for either settings or *.vscode/mcp.json*. Make we try am.

You suppose see Tools icon like dis, wey go list exposed tools from your server:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Click tools icon you go see list of tools like dis:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Enter prompt for chat to invoke tool. For example, if you select tool to get order info, you fit ask agent about order. Example prompt be dis:

    ```text
    get information from order 2
    ```

    You go see tools icon ask if you wan continue call tool. Select to continue run the tool, you suppose see output like dis:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **wetin you see depend on tools wey you set, but idea be say you go get textual response like this one**


## References

How you fit learn more:

- [Tutorial on Azure API Management and MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python sample: Secure remote MCP servers using Azure API Management (experimental)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP client authorization lab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Use the Azure API Management extension for VS Code to import and manage APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Register and discover remote MCP servers in Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Beta repo wey show plenty AI capabilities with Azure API Management
- [AI Gateway workshops](https://azure-samples.github.io/AI-Gateway/) Get workshops wey dey use Azure Portal, beta way to start to test AI capabilities.

## What's Next

- Back to: [Case Studies Overview](./README.md)
- Next: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dis document dem don translate am wit AI translation service wey dem dey call [Co-op Translator](https://github.com/Azure/co-op-translator). Even though we dey try make am correct, abeg sabi say automated translation fit get error or no too clear. Di original document wey dey im own language na di real correct one. If na serious matter, better make person wey sabi human translation do am. We no go take any blame if person no understand well or if person miss the real meaning because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->