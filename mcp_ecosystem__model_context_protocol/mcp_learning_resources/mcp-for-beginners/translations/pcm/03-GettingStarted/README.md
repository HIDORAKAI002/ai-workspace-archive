## How to Start  

[![Build Your First MCP Server](../../../translated_images/pcm/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Click di picture wey dey top to watch di video for dis lesson)_

Dis part get plenti lessons:

- **1 Your first server**, for dis first lesson, you go learn how to build your first server and check am with inspector tool, beta way to test and debug your server, [go di lesson](01-first-server/README.md)

- **2 Client**, for dis lesson, you go learn how to write client wey fit connect to your server, [go di lesson](02-client/README.md)

- **3 Client with LLM**, beta way to write client na to add LLM to am so e fit "talk" with your server about wetin to do, [go di lesson](03-llm-client/README.md)

- **4 Consuming a server GitHub Copilot Agent mode in Visual Studio Code**. Here, we dey see how to run our MCP Server inside Visual Studio Code, [go di lesson](04-vscode/README.md)

- **5 stdio Transport Server** stdio transport na di recommended standard for local MCP server-to-client talk, e provide secure subprocess-based communication with built-in process isolation [go di lesson](05-stdio-server/README.md)

- **6 HTTP Streaming with MCP (Streamable HTTP)**. Learn about modern HTTP streaming transport (di recommended way for remote MCP servers as per [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), progress notifications, and how to make scalable, real-time MCP servers and clients using Streamable HTTP. [go di lesson](06-http-streaming/README.md)

- **7 Utilising AI Toolkit for VSCode** to use and test your MCP Clients and Servers [go di lesson](07-aitk/README.md)

- **8 Testing**. For here we go focus mainly how we fit test our server and client in different ways, [go di lesson](08-testing/README.md)

- **9 Deployment**. Dis chapter go look different ways wey you fit deploy your MCP solutions, [go di lesson](09-deployment/README.md)

- **10 Advanced server usage**. Dis chapter dey cover advanced server usage, [go di lesson](./10-advanced/README.md)

- **11 Auth**. Dis chapter go show how to add simple auth, from Basic Auth to using JWT and RBAC. We dey encourage you start here and then check Advanced Topics for Chapter 5 and add extra security because of recommendations for Chapter 2, [go di lesson](./11-simple-auth/README.md)

- **12 MCP Hosts**. Setup and use common MCP host clients like Claude Desktop, Cursor, Cline, and Windsurf. Learn transport types and how to fix palava, [go di lesson](./12-mcp-hosts/README.md)

- **13 MCP Inspector**. Debug and test your MCP servers for interactive way using MCP Inspector tool. Learn how to fix tools, resources, and protocol messages, [go di lesson](./13-mcp-inspector/README.md)

- **14 Sampling**. Create MCP Servers wey dey work together with MCP clients on LLM related tasks (old one wey dem no go use too soon `2026-07-28` release candidate; still good for `2025-11-25`). [go di lesson](./14-sampling/README.md)

- **15 MCP Apps**. Build MCP Servers wey go also reply with UI instructions, [go di lesson](./15-mcp-apps/README.md)

Model Context Protocol (MCP) na open protocol wey make how apps go provide context to LLMs standard. Think am like USB-C port for AI apps - e provide one standard way to join AI models to different data sources and tools.

## Wetin You Go Learn

By di time you finish dis lesson, you go fit:

- Setup development environments for MCP inside C#, Java, Python, TypeScript, and JavaScript
- Build and deploy basic MCP servers with your own features (resources, prompts, and tools)
- Make host applications wey connect to MCP servers
- Test and debug MCP programmes
- Understand common setup wahala and how to solve am
- Connect your MCP works to popular LLM services

## How to Setup Your MCP Environment

Before you start to work with MCP, e important to prepare your development environment and sabi di basic workflow. Dis section go guide you wetin to do first to make sure say you start well well with MCP.

### Wetin You Need First

Before you waka enter MCP development, make sure say you get:

- **Development Environment**: For which language you go use (C#, Java, Python, TypeScript, or JavaScript)
- **IDE/Editor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm, or any modern code editor
- **Package Managers**: NuGet, Maven/Gradle, pip, or npm/yarn
- **API Keys**: For any AI services wey you want use for your host applications


### Official SDKs

For chapters wey dey come, you go see solutions wey dem build with Python, TypeScript, Java and .NET. Here na all di officially supported SDKs.

MCP get official SDKs for plenty languages (wey match [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Dem dey maintain am with Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Dem dey maintain am with Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - The official TypeScript implementation
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - The official Python implementation (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - The official Kotlin implementation
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Dem dey maintain am with Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - The official Rust implementation
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - The official Go implementation

## Main Tin Dem Wey You Go Take Remember

- To setup MCP development environment dey easy with language-specific SDKs
- To build MCP servers mean to create and register tools wey get clear schemas
- MCP clients dey connect to servers and models to use better features
- Testing and debugging important to make MCP implementation solid
- Deployment options include local development to cloud solutions

## Practice Time

We get set of samples wey go support di exercises wey you go see for all chapters for dis section. Plus each chapter still get their own exercises and assignments

- [Java Calculator](./samples/java/calculator/README.md)
- [.Net Calculator](../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](./samples/javascript/README.md)
- [TypeScript Calculator](./samples/typescript/README.md)
- [Python Calculator](../../../03-GettingStarted/samples/python)

## More Resources

- [Build Agents using Model Context Protocol on Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Remote MCP with Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Wetin Next

Start with di first lesson: [How to create your first MCP Server](01-first-server/README.md)

After you don finish dis module, continue to: [Module 4: Practical Implementation](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->