# Scenario 3: In-Editor Docs with MCP Server for VS Code

## Overview

For this scenario, you go learn how to bring Microsoft Learn Docs straight enter your Visual Studio Code environment using the MCP server. Instead make you dey always dey switch browser tab to find documentation, you fit access, search, and refer official docs right inside your editor. This way go smooth your workflow, mak you focus, and e go allow easy joining with tools like GitHub Copilot.

- Search and read docs inside VS Code without comot from your coding environment.
- Refer documentation and insert links direct enter your README or course files.
- Use GitHub Copilot and MCP together for better, AI-powered documentation workflow.

## Learning Objectives

By the time you finish this chapter, you go sabi how to set up and use the MCP server inside VS Code to boost your documentation and development workflow. You go fit:

- Configure your workspace to use the MCP server for documentation lookup.
- Search and insert documentation directly from inside VS Code.
- Join the power of GitHub Copilot and MCP make your work more productive, AI-assisted.

These skills go help you remain focused, improve documentation quality, and increase your productivity as developer or technical writer.

## Solution

To fit get in-editor documentation access, you go follow some steps wey go join the MCP server with VS Code and GitHub Copilot. This solution na perfect for course authors, documentation writers, and developers wey want make dem no comot eye for editor as dem dey work with docs and Copilot.

- Quickly add reference links to README while you dey write course or project documentation.
- Use Copilot to generate code and MCP to sabi and show correct docs sharp sharp.
- Remain focus for your editor and increase your productivity.

### Step-by-Step Guide

To start, follow these steps. For each step, you fit put screenshot from the assets folder make e visually explain the process.

1. **Add the MCP configuration:**
   For your project root, create `.vscode/mcp.json` file and add this configuration:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   This configuration go tell VS Code how to connect to the [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Step 1: Add mcp.json to .vscode folder](../../../../../../translated_images/pcm/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Open the GitHub Copilot Chat panel:**
   If you never get the GitHub Copilot extension before, waka go Extensions view for VS Code and install am. You fit download am direct from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). After that, open the Copilot Chat panel from the sidebar.

   ![Step 2: Open Copilot Chat panel](../../../../../../translated_images/pcm/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Enable agent mode and verify tools:**
   For the Copilot Chat panel, turn on agent mode.

   ![Step 3: Enable agent mode and verify tools](../../../../../../translated_images/pcm/step3-agent-mode.cdc32520fd7dd1d1.webp)

   After you turn on agent mode, check say MCP server dey among the tools wey dey available. This make sure say Copilot agent fit access the documentation server to grab relevant info.
   
   ![Step 3: Verify MCP server tool](../../../../../../translated_images/pcm/step3-verify-mcp-tool.76096a6329cbfecd.webp)

4. **Start a new chat and prompt the agent:**
   Open new chat for Copilot Chat panel. Now you fit ask the agent your documentation questions. The agent go use MCP server fetch and show correct Microsoft Learn documentation inside your editor.

   - *"I dey try write study plan for topic X. I wan study am for 8 weeks, for every week, suggest content wey I suppose take."*

   ![Step 4: Prompt the agent in chat](../../../../../../translated_images/pcm/step4-prompt-chat.12187bb001605efc.webp)

5. **Live Query:**

   > Make we take live query from the [#get-help](https://discord.gg/D6cRhjHWSC) section for Microsoft Foundry Discord ([view original message](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"I dey find answer on how to deploy multi-agent solution with AI agents wey dem develop for Azure AI Foundry. I see say no direct way to deploy like Copilot Studio channels. So, how dem dey do deployment for enterprise users to fit interact and complete the work?
Dem get plenty articles/blogs wey talk say we fit use Azure Bot service for this job wey fit act as bridge between MS teams and Azure AI Foundry Agents, but e go work if I setup Azure bot to connect Orchestrator Agent for Azure AI foundry thru Azure function to perform orchestration or I go need create Azure function for every AI agent wey dey multi agent solution to do orchestration at Bot framework? Any other suggestions we welcome."*

   ![Step 5: Live queries](../../../../../../translated_images/pcm/step5-live-queries.49db3e4a50bea273.webp)

   The agent go answer with relevant documentation links and summaries, then you fit insert dem direct inside your markdown files or use as references for your code.
   
### Sample Queries

Here be some example queries wey you fit try. These queries go show how MCP server and Copilot fit join hand provide quick, context-aware documentation and references without leaving VS Code:

- "Show me how to use Azure Functions triggers."
- "Insert link to official documentation for Azure Key Vault."
- "What are the best practices to secure Azure resources?"
- "Find quickstart for Azure AI services."

These queries go show how MCP server and Copilot fit join hand to provide quick, context-aware documentation and references without you leave VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->