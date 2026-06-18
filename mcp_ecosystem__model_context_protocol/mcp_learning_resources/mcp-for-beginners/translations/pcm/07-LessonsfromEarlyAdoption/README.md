# 🌟 Lessons from Early Adopters

[![Lessons from MCP Early Adopters](../../../translated_images/pcm/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Click di image wey dey top to watch video of dis lesson)_

## 🎯 Wetin Dis Module Dey Cover

Dis module dey explore how real organizations and developers dey use di Model Context Protocol (MCP) take solve real wahala and drive innovation. Through detailed case studies, hand-on projects, and practical examples, you go discover how MCP dey enable secure, scalable AI integration wey connect language models, tools, and enterprise data.

### 📚 See MCP for Action

You want see how dem dey apply these principles for production-ready tools? Check our [**10 Microsoft MCP Servers We Dey Transform Developer Productivity**](microsoft-mcp-servers.md), wey showcase real Microsoft MCP servers wey you fit use today.

## Overview

Dis lesson dey explore how early adopters don take use di Model Context Protocol (MCP) solve real-world wahala and drive innovation for different industries. Through detailed case studies and hand-on projects, you go see how MCP dey enable standardized, secure, and scalable AI integration—wey dey connect large language models, tools, and enterprise data for one unified framework. You go gain practical experience designing and building MCP-based solutions, learn from proven implementation patterns, and discover best practices to deploy MCP for production environment. Di lesson still highlight emerging trends, future directions, and open-source resources to help you dey gidigba for MCP technology and di way e dey evolve.

## Learning Objectives

- Analyze real-world MCP implementations for different industries
- Design and build complete MCP-based applications
- Explore emerging trends and future directions for MCP technology
- Apply best practices for real development scenarios

## Real-world MCP Implementations

### Case Study 1: Enterprise Customer Support Automation

One multinational company carry out MCP-based solution to standardize AI interactions for their customer support systems. Dis one make dem fit:

- Create one interface wey unify multiple LLM providers
- Maintain consistent prompt management wey cover departments dem
- Implement strong security and compliance controls
- Easily change between different AI models based on wetin dem need

**Technical Implementation:**

```python
# Python MCP server wey dem use for customer support
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Set up logging
logging.basicConfig(level=logging.INFO)

async def main():
    # Make server configuration
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Start MCP server
    server = create_server(config)
    
    # Register knowledge base resources
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Register prompt templates
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Register support tools dem
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Run server with HTTP transport
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```

**Results:** 30% cut down for model costs, 45% improvement for response consistency, plus better compliance for global operations.

### Case Study 2: Healthcare Diagnostic Assistant

One healthcare provider develop MCP infrastructure to join multiple special medical AI models while dem dey protect sensitive patient data:

- Easy switching between generalist and specialist medical models
- Strong privacy controls and audit trails
- Join with existing Electronic Health Record (EHR) systems
- Consistent prompt engineering for medical terminology

**Technical Implementation:**

```csharp
// C# MCP host application implementation in healthcare application
using Microsoft.Extensions.DependencyInjection;
using ModelContextProtocol.SDK.Client;
using ModelContextProtocol.SDK.Security;
using ModelContextProtocol.SDK.Resources;

public class DiagnosticAssistant
{
    private readonly MCPHostClient _mcpClient;
    private readonly PatientContext _patientContext;
    
    public DiagnosticAssistant(PatientContext patientContext)
    {
        _patientContext = patientContext;
        
        // Configure MCP client with healthcare-specific settings
        var clientOptions = new ClientOptions
        {
            Name = "Healthcare Diagnostic Assistant",
            Version = "1.0.0",
            Security = new SecurityOptions
            {
                Encryption = EncryptionLevel.Medical,
                AuditEnabled = true
            }
        };
        
        _mcpClient = new MCPHostClientBuilder()
            .WithOptions(clientOptions)
            .WithTransport(new HttpTransport("https://healthcare-mcp.example.org"))
            .WithAuthentication(new HIPAACompliantAuthProvider())
            .Build();
    }
    
    public async Task<DiagnosticSuggestion> GetDiagnosticAssistance(
        string symptoms, string patientHistory)
    {
        // Create request with appropriate resources and tool access
        var resourceRequest = new ResourceRequest
        {
            Name = "patient_records",
            Parameters = new Dictionary<string, object>
            {
                ["patientId"] = _patientContext.PatientId,
                ["requestingProvider"] = _patientContext.ProviderId
            }
        };
        
        // Request diagnostic assistance using appropriate prompt
        var response = await _mcpClient.SendPromptRequestAsync(
            promptName: "diagnostic_assistance",
            parameters: new Dictionary<string, object>
            {
                ["symptoms"] = symptoms,
                patientHistory = patientHistory,
                relevantGuidelines = _patientContext.GetRelevantGuidelines()
            });
            
        return DiagnosticSuggestion.FromMCPResponse(response);
    }
}
```

**Results:** Better diagnostic suggestions for doctors while dem maintain full HIPAA compliance and big cut down for context-switching between systems.

### Case Study 3: Financial Services Risk Analysis

One financial company implement MCP to standardize their risk analysis process across departments:

- Create one interface wey unify credit risk, fraud detection, and investment risk models
- Implement strong access control and model versioning
- Make sure auditability dey for all AI recommendations
- Maintain consistent data formatting across different systems

**Technical Implementation:**

```java
// Java MCP server for financial risk assessment
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Create MCP server wit financial compliance features
        MCPServer server = new MCPServerBuilder()
            .withModelProviders(
                new ModelProvider("risk-assessment-primary", new AzureOpenAIProvider()),
                new ModelProvider("risk-assessment-audit", new LocalLlamaProvider())
            )
            .withPromptTemplateDirectory("./compliance/templates")
            .withAccessControls(new SOCCompliantAccessControl())
            .withDataEncryption(EncryptionStandard.FINANCIAL_GRADE)
            .withVersionControl(true)
            .withAuditLogging(new DatabaseAuditLogger())
            .build();
            
        server.addRequestValidator(new FinancialDataValidator());
        server.addResponseFilter(new PII_RedactionFilter());
        
        server.start(9000);
        
        System.out.println("Financial Risk MCP Server running on port 9000");
    }
}
```

**Results:** Better regulatory compliance, 40% faster model deployment cycles, plus better risk assessment consistency across departments.

### Case Study 4: Microsoft Playwright MCP Server for Browser Automation

Microsoft develop the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) to enable secure, standardized browser automation through di Model Context Protocol. Dis production-ready server allow AI agents and LLMs to interact with web browsers for controlled, auditable, and extensible way—this one fit do cases like automated web testing, data extraction, and end-to-end workflows.

> **🎯 Production Ready Tool**
> 
> Dis case study show real MCP server wey you fit use today! Learn more about di Playwright MCP Server and 9 other production-ready Microsoft MCP servers for our [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Key Features:**
- Exposes browser automation powers (navigation, form filling, screenshot capture, etc.) as MCP tools
- Implements strong access controls and sandboxing to stop unauthorized actions
- Provides detailed audit logs for all browser interactions
- Support integration with Azure OpenAI and other LLM providers for agent-driven automation
- Powers GitHub Copilot's Coding Agent with web browsing abilities

**Technical Implementation:**

```typescript
// TypeScript: Di Playwright browser automation tools dem dey register for MCP server
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Register one tool wey go fit waka go URL and take screenshot
server.tools.register(
  new ToolDefinition({
    name: 'navigate_and_screenshot',
    description: 'Navigate to a URL and capture a screenshot',
    parameters: {
      url: { type: 'string', description: 'The URL to visit' }
    }
  }),
  async ({ url }) => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    return { screenshot };
  }
);

// Make MCP server start work
server.listen(8080);
```

**Results:**

- Enable secure, automatic browser automation for AI agents and LLMs
- Reduce manual testing work and improve test coverage for web apps
- Provide reusable, extensible framework for browser-based tool integration in enterprise environments
- Powers GitHub Copilot's web browsing powers

**References:**

- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)
- [Microsoft AI and Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)

### Case Study 5: Azure MCP – Enterprise-Grade Model Context Protocol as a Service

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) na Microsoft managed, enterprise-grade implementation of di Model Context Protocol, wey dem design to provide scalable, secure, and compliant MCP server power as cloud service. Azure MCP dey enable organizations to quickly deploy, manage, and join MCP servers with Azure AI, data, and security services, reduce operational wahala and quicken AI adoption.

> **🎯 Production Ready Tool**
> 
> Na real MCP server you fit use today! Learn more about Microsoft Foundry MCP Server for our [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md).

- Fully managed MCP server hosting with built-in scaling, monitoring, and security
- Native integration with Azure OpenAI, Azure AI Search, and other Azure services
- Enterprise authentication and authorization with Microsoft Entra ID
- Support custom tools, prompt templates, and resource connectors
- Comply with enterprise security and regulatory requirements

**Technical Implementation:**

```yaml
# Example: Azure MCP server deployment configuration (YAML)
apiVersion: mcp.microsoft.com/v1
kind: McpServer
metadata:
  name: enterprise-mcp-server
spec:
  modelProviders:
    - name: azure-openai
      type: AzureOpenAI
      endpoint: https://<your-openai-resource>.openai.azure.com/
      apiKeySecret: <your-azure-keyvault-secret>
  tools:
    - name: document_search
      type: AzureAISearch
      endpoint: https://<your-search-resource>.search.windows.net/
      apiKeySecret: <your-azure-keyvault-secret>
  authentication:
    type: EntraID
    tenantId: <your-tenant-id>
  monitoring:
    enabled: true
    logAnalyticsWorkspace: <your-log-analytics-id>
```

**Results:**  
- Reduce time-to-value for enterprise AI projects by providing ready-to-use, compliant MCP server platform
- Simplify integration of LLMs, tools, and enterprise data sources
- Better security, observability, and operational efficiency for MCP workloads
- Improve code quality with Azure SDK best practices and current auth patterns

**References:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)
- [Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)
- [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/)
- [Microsoft MCP Center](https://mcp.azure.com)

## Case Study 6: NLWeb 
MCP (Model Context Protocol) na one protocol wey dey emerge for Chatbots and AI assistants to interact with tools. Every NLWeb instance na MCP server too, wey support one core method, ask, wey dey use to ask any website question for natural language. The response wey e return dey use schema.org, wey be popular vocabulary to describe web data. Loosely talk, MCP na NLWeb as Http na to HTML. NLWeb combine protocols, Schema.org formats, and sample code to help sites create these endpoints quick, making e better for humans through conversational interfaces and for machines through natural agent-to-agent interaction.

NLWeb get two main parts.
- One protocol, very simple to start with, to interface with site for natural language and one format, wey dey use json and schema.org for the answer wey e return. See di documentation on di REST API for more info.
- One straightforward implementation of (1) wey use existing markup, for sites wey dem fit turn to lists of items (products, recipes, attractions, reviews, etc.). Together with some user interface widgets, sites fit easily provide conversational interfaces to their content. See documentation on Life of a chat query for more info how dis one work.
 
**References:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)
- [NLWeb](https://github.com/microsoft/NlWeb)

### Case Study 7: Microsoft Foundry MCP Server – Enterprise AI Agent Integration

Microsoft Foundry MCP servers show how MCP fit take manage AI agents and workflows for enterprise environment. By joining MCP with Microsoft Foundry, organizations fit standardize agent interaction, use Foundry workflow management, and ensure secure, scalable deployments.

> **🎯 Production Ready Tool**
> 
> Nor be joke, na real MCP server wey you fit use today! Learn more about Microsoft Foundry MCP Server for our [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Key Features:**
- Complete access to Azure's AI ecosystem, including model catalogs and deployment management
- Knowledge indexing with Azure AI Search for RAG apps
- Evaluation tools to measure AI model performance and quality assurance
- Integrate with Microsoft Foundry Catalog and Labs for latest research models
- Manage agent and evaluate capabilities for production use

**Results:**
- Rapid prototyping plus solid monitoring of AI agent workflows
- Smooth integration with Azure AI services for advanced cases
- One interface to build, deploy, and monitor agent pipelines
- Better security, compliance, and operational efficiency for enterprises
- Faster AI adoption but still maintain control over complex agent-driven work

**References:**
- [Microsoft Foundry MCP Server GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)
- [Joining Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Case Study 8: Foundry MCP Playground – Experimentation and Prototyping

Foundry MCP Playground provide ready-to-use place for experimentation with MCP servers and Microsoft Foundry integrations. Developers fit quickly prototype, test, and evaluate AI models and agent workflows with resources from Microsoft Foundry Catalog and Labs. The playground dey simplify setup, provide sample projects, and support teamwork development, making am easy to explore best practices and new ideas with small wahala. E dey especially useful for teams wey wan validate ideas, share experiments, and learn fast without complex infrastructure. By making am easy to start, the playground dey encourage innovation and community contributions for MCP and Microsoft Foundry ecosystem.

**References:**

- [Foundry MCP Playground GitHub Repository](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Case Study 9: Microsoft Learn Docs MCP Server – AI-Powered Documentation Access

Microsoft Learn Docs MCP Server na cloud-hosted service wey dey provide AI assistants access to official Microsoft documentation for real-time through Model Context Protocol. Dis production-ready server dey connect to full Microsoft Learn ecosystem and enable semantic search across all official Microsoft sources.

> **🎯 Production Ready Tool**
> 
> Na real MCP server wey you fit use today! Learn more about Microsoft Learn Docs MCP Server for our [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Key Features:**
- Real-time access to official Microsoft documentation, Azure docs, and Microsoft 365 documentation
- Advanced semantic search wey sabi context and intent
- Always get updated info as Microsoft Learn content dey released
- Cover Microsoft Learn, Azure documentation, and Microsoft 365 sources well well
- Return up to 10 quality content chunks with article titles and URLs

**Why E Dey Important:**
- Solve "oldy AI knowledge" problem for Microsoft technology
- Make sure AI assistants get access to latest .NET, C#, Azure, and Microsoft 365 features
- Provide official, first-party info for accurate code generation
- Necessary for developers wey dey work with fast-changing Microsoft tech

**Results:**
- Greatly improve accuracy of AI-generated code for Microsoft tech
- Cut time wey dem dey spend searching for current docs and best practices
- Boost developer productivity with context-aware documentation retrieval
- Join smoothly with development workflows without leaving IDE

**References:**
- [Microsoft Learn Docs MCP Server GitHub Repository](https://github.com/MicrosoftDocs/mcp)
- [Microsoft Learn Documentation](https://learn.microsoft.com/)

## Hands-on Projects

### Project 1: Build a Multi-Provider MCP Server

**Objective:** Make one MCP server wey fit route requests to many AI model providers based on specific criteria.

**Requirements:**

- Support at least three different model providers (e.g., OpenAI, Anthropic, local models)
- Implement routing mechanism based on request metadata
- Create configuration system to manage provider credentials
- Add caching to make performance and costs better
- Build simple dashboard to monitor usage

**Implementation Steps:**

1. Setup basic MCP server infrastructure
2. Implement provider adapters for each AI model service
3. Create routing logic based on request attributes
4. Add caching for frequent requests
5. Develop monitoring dashboard
6. Test with various request patterns

**Technologies:** Choose from Python (.NET/Java/Python based on your preference), Redis for caching, and simple web framework for dashboard.

### Project 2: Enterprise Prompt Management System

**Objective:** Develop MCP-based system to manage, version, and deploy prompt templates for organization.

**Requirements:**
- Create wan central palava house fo prompt templates
- Make versioning an approval waka dem
- Build template testin power with sample input dem
- Develop role-based access control dem
- Create API fo template retrieval an deployment

**Implementation Steps:**

1. Design di database schema fo template storage
2. Create di core API fo template CRUD operations
3. Implement di versioning system
4. Build di approval waka
5. Develop di testin framework
6. Create simple web interface fo management
7. Integrate wit MCP server

**Technologies:** Your choice of backend framework, SQL or NoSQL database, an frontend framework fo di management interface.

### Project 3: MCP-Based Content Generation Platform

**Objective:** Build content generation platform wey dey use MCP fo provide stable results across different content kin.

**Requirements:**

- Support many content formats (blog post dem, social media, marketing copy)
- Implement template-based generation wit custom options
- Create content review an feedback system
- Track content performance metrics
- Support content versioning an iteration

**Implementation Steps:**

1. Set up MCP client infrastructure
2. Create templates fo different content kin
3. Build content generation pipeline
4. Implement di review system
5. Develop metrics tracking system
6. Create user interface fo template management an content generation

**Technologies:** Your preferred programming language, web framework, an database system.

## Future Directions for MCP Technology

### Emerging Trends

1. **Multi-Modal MCP**
   - Expansion of MCP to standardize interactions wit image, audio, an video models
   - Development of cross-modal reasoning kapabiliti dem
   - Standardized prompt formats fo different modaliti dem

2. **Federated MCP Infrastructure**
   - Distributed MCP networks wey fit share resources across organizations
   - Standardized protocols fo secure model sharing
   - Privacy-preserving computation techniques

3. **MCP Marketplaces**
   - Ecosystem fo share an make money from MCP templates an plugins
   - Quality assurance an certification waka dem
   - Integration wit model marketplaces

4. **MCP for Edge Computing**
   - Adaptation of MCP standards fo resource-constraint edge devices
   - Optimized protocols fo low-bandwidth environment dem
   - Special MCP implementations fo IoT ecosystems

5. **Regulatory Frameworks**
   - Development of MCP extensions fo regulatory compliance
   - Standardized audit trails an explainability interfaces
   - Integration wit emerging AI governance frameworks

### MCP Solutions from Microsoft

Microsoft an Azure don develop plenty open-source repository dem fo help developers implement MCP for different scenarios:

#### Microsoft Organization

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Playwright MCP server fo browser automation an testin
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - OneDrive MCP server implementation fo local test an community contribution
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb na collection of open protocols an open source tools. E main focus na to establis foundation layer fo AI Web

#### Azure-Samples Organization

1. [mcp](https://github.com/Azure-Samples/mcp) - Links to samples, tools, an resources fo build an integrate MCP servers on Azure wit many languages
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Reference MCP servers wey show how authentication dey work wit di current Model Context Protocol spec
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Landing page fo Remote MCP Server implementations in Azure Functions wit language-specific repos links
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Quickstart template fo build an deploy custom remote MCP servers using Azure Functions with Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Quickstart template fo build an deploy custom remote MCP servers using Azure Functions wit .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Quickstart template fo build an deploy custom remote MCP servers using Azure Functions wit TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API Management as AI Gateway to Remote MCP servers using Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI experiments including MCP capabilities, integrating wit Azure OpenAI an AI Foundry

Dem repositories provide different implementations, templates, an resources for work wit Model Context Protocol across different programming languages an Azure services. Dem cover plenty use cases from basic server to authentication, cloud deployment, an enterprise integration.

#### MCP Resources Directory

Di [MCP Resources directory](https://github.com/microsoft/mcp/tree/main/Resources) wey dey official Microsoft MCP repository na curated collection of sample resources, prompt templates, an tool definitions wey fit use wit Model Context Protocol servers. Dis directory dey help developers quick start wit MCP by offering reusable building blocks an best-practice examples for:

- **Prompt Templates:** Ready-to-use prompt templates fo common AI tasks and scenarios we fit adapt for your own MCP server implementation.
- **Tool Definitions:** Example tool schemas an metadata to standardize tool integration an invocation across different MCP servers.
- **Resource Samples:** Example resource definitions fo connect to data sources, APIs, an external services inside MCP framework.
- **Reference Implementations:** Practical samples wey show how dem fit structure an organize resources, prompts, an tools in real-world MCP projects.

Dem resources dey speed up development, promote standardization, an help ensure best practice when you dey build an deploy MCP-based solutions.

#### MCP Resources Directory

- [MCP Resources (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)

### Research Opportunities

- Efficient prompt optimization techniques inside MCP frameworks
- Security models fo multi-tenant MCP deployments
- Performance benchmarking across different MCP implementations
- Formal verification methods fo MCP servers

## Conclusion

Model Context Protocol (MCP) dey sharply shape future of standardized, secure, an interoperable AI integration across industries. Through case studies an hands-on projects for dis lesson, you don see how early adopters—including Microsoft an Azure—dey use MCP to solve real-world palava dem, speed AI adoption, an make sure say dem follow law, security, an scalability. MCP modular method dey enable organizations to connect large language models, tools, an enterprise data together inside one audit-friendly framework. As MCP dey always grow, to stay involved wit community, explore open-source resources, an apply best practices go be the way to build solid, future-ready AI solutions.

## Additional Resources

- [MCP Foundry GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub Repository (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources Directory (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP Community & Documentation](https://modelcontextprotocol.io/introduction)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP Documentation](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Security best practices
- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Microsoft AI and Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)

## Exercises

1. Analyze one of di case studies an suggest another way to implement am.
2. Choose one of di project ideas an create detailed technical specification.
3. Research one industry wey case studies no cover an show like how MCP fit solve dia specific palava dem.
4. Explore one of di future directions an create concept for new MCP extension to support am.

## What's Next

Explore more: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

Continue to: [Module 8: Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->