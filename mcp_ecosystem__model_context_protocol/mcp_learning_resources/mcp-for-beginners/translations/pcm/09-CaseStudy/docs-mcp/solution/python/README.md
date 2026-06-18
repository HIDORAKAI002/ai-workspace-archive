# Study Plan Generator wit Chainlit & Microsoft Learn Docs MCP

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Internet access to connect to di Microsoft Learn Docs MCP server

## Installation

1. Clone dis repository or download di project files.
2. Install di required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Scenario 1: Simple Query to Docs MCP
Na command-line client wey dey connect to di Docs MCP server, send query, and show di result.

1. Run di script:
   ```bash
   python scenario1.py
   ```
2. Enter your documentation question for di prompt.

### Scenario 2: Study Plan Generator (Chainlit Web App)
Na web-based interface (wey use Chainlit) wey allow users to generate personalized, week-by-week study plan for any technical topic.

1. Start di Chainlit app:
   ```bash
   chainlit run scenario2.py
   ```
2. Open di local URL wey show for your terminal (like http://localhost:8000) inside your browser.
3. For di chat window, enter your study topic plus di number of weeks wey you want study (like "AI-900 certification, 8 weeks").
4. Di app go respond wit week-by-week study plan, plus links to relevant Microsoft Learn documentation.

**Environment Variables Weh Dem Need:**

To use Scenario 2 (di Chainlit web app wit Azure OpenAI), you gats set di following environment variables for `.env` file inside di `python` directory:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Fill dem values wit your Azure OpenAI resource details before you run di app.

> [!TIP]
> You fit easily deploy your own models using [Microsoft Foundry](https://ai.azure.com/).

### Scenario 3: In-Editor Docs wit MCP Server for VS Code

Instead make you dey switch browser tabs to search documentation, you fit bring Microsoft Learn Docs directly go your VS Code using di MCP server. Dis one go allow you:
- Search and read docs inside VS Code without comot your coding environment.
- Reference documentation and add links directly inside your README or course files.
- Use GitHub Copilot and MCP together for smooth, AI-powered documentation workflow.

**Example Use Cases:**
- Quick add reference links for README while you dey write course or project documentation.
- Use Copilot to generate code and MCP to quickly find and cite relevant docs.
- Stay focused for your editor and boost productivity.

> [!IMPORTANT]
> Make sure say you get valid [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) configuration for your workspace (e.g., `.vscode/mcp.json`).

## Why Chainlit for Scenario 2?

Chainlit na modern open-source framework wey dem use build conversational web applications. E make am easy to create chat-based user interfaces wey connect to backend services like Microsoft Learn Docs MCP server. Dis project dey use Chainlit to give simple, interactive way to generate personalized study plans for real time. By using Chainlit, you fit fast build and deploy chat-based tools wey fit improve productivity and learning.

## Wetin This One Dey Do

Dis app dey allow users to create personalized study plan by just entering topic and duration. Di app go parse your input, query Microsoft Learn Docs MCP server for relevant content, then organize di results into structured, week-by-week plan. Each week recommendations dey show for di chat, e dey easy to follow and track your progress. Di integration dey make sure say you always get di latest and most relevant learning resources.

## Sample Queries

Try these queries for di chat window to see how di app go respond:

- `AI-900 certification, 8 weeks`
- `Learn Azure Functions, 4 weeks`
- `Azure DevOps, 6 weeks`
- `Data engineering on Azure, 10 weeks`
- `Microsoft security fundamentals, 5 weeks`
- `Power Platform, 7 weeks`
- `Azure AI services, 12 weeks`
- `Cloud architecture, 9 weeks`

Dem examples show how flexible di app dey for different learning goals and timeframes.

## References

- [Chainlit Documentation](https://docs.chainlit.io/)
- [MCP Documentation](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->