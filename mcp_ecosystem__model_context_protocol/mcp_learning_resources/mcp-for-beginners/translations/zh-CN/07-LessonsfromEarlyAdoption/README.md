# 🌟 早期采用者的经验教训

[![Lessons from MCP Early Adopters](../../../translated_images/zh-CN/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(点击上方图片观看本课程视频)_

## 🎯 本模块涵盖内容

本模块探讨了真实组织和开发者如何利用模型上下文协议（MCP）解决实际问题并推动创新。通过详细的案例研究、动手项目和实用示例，您将发现 MCP 如何实现安全、可扩展的 AI 集成，将语言模型、工具和企业数据连接起来。

### 📚 观看 MCP 实际应用

想要看到这些原则如何应用于可生产使用的工具吗？请查看我们的[**10 个正在改变开发者生产力的微软 MCP 服务器**](microsoft-mcp-servers.md)，展示了您今天就可以使用的真实微软 MCP 服务器。

## 概述

本课探讨了早期采用者如何利用模型上下文协议（MCP）解决现实世界中的挑战，并推动各行业创新。通过详细的案例研究和动手项目，您将看到 MCP 如何实现标准化、安全且可扩展的 AI 集成——在统一框架下连接大型语言模型、工具和企业数据。您将获得设计和构建基于 MCP 解决方案的实用经验，学习经验证的实现模式，并发现 MCP 在生产环境中部署的最佳实践。本课程还强调了新兴趋势、未来方向及开源资源，助您保持在 MCP 技术及其不断发展的生态系统的前沿。

## 学习目标

- 分析不同行业中的现实 MCP 实现案例
- 设计并构建完整的基于 MCP 的应用
- 探索 MCP 技术的新兴趋势和未来方向
- 在实际开发场景中应用最佳实践

## 现实世界的 MCP 实现

### 案例研究 1：企业客户支持自动化

一家跨国公司实施了基于 MCP 的解决方案，标准化了其客户支持系统中的 AI 交互。该方案使他们能够：

- 为多个大型语言模型提供商创建统一界面
- 保持部门间一致的提示管理
- 实施强大的安全与合规控制
- 根据具体需求轻松切换不同 AI 模型

**技术实现：**

```python
# 用于客户支持的 Python MCP 服务器实现
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# 配置日志记录
logging.basicConfig(level=logging.INFO)

async def main():
    # 创建服务器配置
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # 初始化 MCP 服务器
    server = create_server(config)
    
    # 注册知识库资源
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # 注册提示模板
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # 注册支持工具
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # 使用 HTTP 传输启动服务器
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**结果:** 模型成本降低 30%，响应一致性提升 45%，全球运营的合规性增强。

### 案例研究 2：医疗诊断助手

一家医疗服务提供商开发了 MCP 基础设施，以集成多个专业医疗 AI 模型，同时确保敏感患者数据得到保护：

- 在通用与专业医疗模型间无缝切换
- 严格的隐私控制和审计跟踪
- 与现有电子健康记录（EHR）系统集成
- 医疗术语的统一提示工程

**技术实现：**

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
  
**结果:** 改善医生的诊断建议，同时保持 HIPAA 完全合规，大幅减少系统间上下文切换。

### 案例研究 3：金融服务风险分析

一家金融机构实施了 MCP，以标准化其跨部门的风险分析流程：

- 为信用风险、欺诈检测和投资风险模型创建统一接口
- 实施严格的访问控制和模型版本管理
- 确保所有 AI 推荐具有可审计性
- 保持不同系统间数据格式一致

**技术实现：**

```java
// 用于金融风险评估的Java MCP服务器
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // 创建具有金融合规功能的MCP服务器
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
  
**结果:** 改进法规合规性，模型部署周期缩短 40%，部门间风险评估一致性提升。

### 案例研究 4：微软 Playwright MCP 服务器用于浏览器自动化

微软开发了[Playwright MCP 服务器](https://github.com/microsoft/playwright-mcp)，通过模型上下文协议实现安全、标准化的浏览器自动化。该生产级服务器允许 AI 代理和大型语言模型以受控、可审计且可扩展的方式与网页浏览器交互——支持自动化网页测试、数据提取和端到端工作流等用例。

> **🎯 可生产工具**  
> 本案例展示一个真实的 MCP 服务器，您今天就可以使用！了解 Playwright MCP 服务器以及其他 9 个生产级微软 MCP 服务器，请参阅我们的[**微软 MCP 服务器指南**](microsoft-mcp-servers.md#8--playwright-mcp-server)。

**主要特点：**  
- 以 MCP 工具形式暴露浏览器自动化功能（导航、表单填写、截图等）  
- 实施严格访问控制和沙箱机制防止未经授权操作  
- 提供详细的浏览器交互审计日志  
- 支持与 Azure OpenAI 及其他大型语言模型服务提供商的集成，实现代理驱动的自动化  
- 驱动 GitHub Copilot 的编码代理具备网页浏览功能  

**技术实现：**

```typescript
// TypeScript：在 MCP 服务器中注册 Playwright 浏览器自动化工具
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// 注册一个用于导航到 URL 并截取屏幕截图的工具
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

// 启动 MCP 服务器
server.listen(8080);
```
  
**结果：**  

- 为 AI 代理和大型语言模型提供安全的程序化浏览器自动化  
- 减少人工测试工作，提升网页应用测试覆盖率  
- 提供可复用、可扩展的企业级浏览器工具集成框架  
- 支持 GitHub Copilot 的网页浏览功能  

**参考资料：**  

- [Playwright MCP 服务器 GitHub 仓库](https://github.com/microsoft/playwright-mcp)  
- [微软 AI 和自动化解决方案](https://azure.microsoft.com/en-us/products/ai-services/)  

### 案例研究 5：Azure MCP – 企业级模型上下文协议即服务

Azure MCP 服务器（[https://aka.ms/azmcp](https://aka.ms/azmcp)）是微软托管的企业级模型上下文协议实现，旨在作为云服务提供可扩展、安全和合规的 MCP 服务器能力。Azure MCP 使组织能够快速部署、管理并将 MCP 服务器与 Azure AI、数据及安全服务集成，降低运维成本，加速 AI 采用。

> **🎯 可生产工具**  
> 这是您今天即可使用的真实 MCP 服务器！欲了解微软 Foundry MCP 服务器，请参阅我们的[**微软 MCP 服务器指南**](microsoft-mcp-servers.md)。

- 完全托管的 MCP 服务器主机，内置弹性伸缩、监控和安全功能  
- 与 Azure OpenAI、Azure AI 搜索及其他 Azure 服务的原生集成  
- 通过 Microsoft Entra ID 提供企业级身份认证与授权  
- 支持自定义工具、提示模板和资源连接器  
- 满足企业安全和法规合规要求  

**技术实现：**

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
  
**结果：**  
- 为企业 AI 项目提供即用型合规 MCP 服务器平台，缩短价值实现时间  
- 简化大型语言模型、工具及企业数据源的集成  
- 提升 MCP 工作负载的安全性、可观测性和运营效率  
- 使用 Azure SDK 最佳实践及当前认证模式提升代码质量  

**参考资料：**  
- [Azure MCP 文档](https://aka.ms/azmcp)  
- [Azure MCP 服务器 GitHub 仓库](https://github.com/Azure/azure-mcp)  
- [Azure AI 服务](https://azure.microsoft.com/en-us/products/ai-services/)  
- [微软 MCP 中心](https://mcp.azure.com)  

## 案例研究 6：NLWeb

MCP（模型上下文协议）是一种新兴协议，支持聊天机器人和 AI 助手与工具交互。每个 NLWeb 实例也是一个 MCP 服务器，支持一个核心方法 ask，用于向网站以自然语言提问。返回响应采用 schema.org，一种广泛使用的描述网页数据的词汇。粗略来说，MCP 就像 NLWeb 对 HTML 的 Http 协议。NLWeb 结合协议、Schema.org 格式和示例代码，帮助网站快速创建这些端点，既方便人们通过对话界面使用，也方便机器通过自然的代理间交互。

NLWeb 有两个不同组件：  
- 一个简单协议，从自然语言接口访问网站，返回答案格式利用 json 和 schema.org。详细请参阅 REST API 文档。  
- 一个利用现有标记的简单实现，适用于可抽象为项目列表（产品、食谱、景点、评论等）的网站。结合一组用户界面控件，网站可以轻松提供内容的对话接口。详见“聊天查询生命周期”文档了解其工作原理。  

**参考资料：**  
- [Azure MCP 文档](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)  

### 案例研究 7：微软 Foundry MCP 服务器 – 企业 AI 代理集成

微软 Foundry MCP 服务器展示了如何使用 MCP 协调和管理企业环境中的 AI 代理和工作流。通过将 MCP 与微软 Foundry 集成，组织能够标准化代理交互，利用 Foundry 的工作流管理，并确保安全、可扩展的部署。

> **🎯 可生产工具**  
> 这是您今天可以使用的真实 MCP 服务器！欲了解微软 Foundry MCP 服务器，请参阅我们的[**微软 MCP 服务器指南**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server)。

**主要特点：**  
- 全面访问 Azure AI 生态系统，包括模型目录和部署管理  
- Azure AI 搜索的知识索引，实现 RAG 应用  
- AI 模型性能与质量保证评估工具  
- 与微软 Foundry 目录和实验室集成，支持前沿研究模型  
- 生产场景下的代理管理与评估功能  

**结果：**  
- 快速原型制作与稳健的 AI 代理工作流监控  
- 与 Azure AI 服务无缝集成以支持高级场景  
- 构建、部署和监控代理管道的统一界面  
- 提升企业安全、合规和运营效率  
- 加速 AI 采用，同时保持对复杂代理驱动流程的控制  

**参考资料：**  
- [微软 Foundry MCP 服务器 GitHub 仓库](https://github.com/azure-ai-foundry/mcp-foundry)  
- [微软 Foundry 博客：集成 Azure AI 代理与 MCP](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  

### 案例研究 8：Foundry MCP 游乐场 – 实验与原型开发

Foundry MCP 游乐场提供了一个现成环境，用于试验 MCP 服务器和微软 Foundry 集成。开发者可以快速原型制作、测试和评估 AI 模型及代理工作流，使用微软 Foundry 目录和实验室资源。该游乐场简化了设置，提供示例项目，并支持协作开发，方便探索最佳实践和新场景，开销极低。它特别适合团队验证想法、共享实验、加速学习，无需复杂基础设施。游乐场通过降低门槛，助力 MCP 及微软 Foundry 生态系统的创新和社区贡献。

**参考资料：**

- [Foundry MCP 游乐场 GitHub 仓库](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### 案例研究 9：微软 Learn Docs MCP 服务器 – AI 助力文档访问

微软 Learn Docs MCP 服务器是一项云托管服务，通过模型上下文协议为 AI 助手实时访问微软官方文档提供支持。该生产级服务器连接微软 Learn 完整生态，实现所有官方来源的语义搜索。

> **🎯 可生产工具**  
> 这是您今天即用的真实 MCP 服务器！了解微软 Learn Docs MCP 服务器，请参阅我们的[**微软 MCP 服务器指南**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server)。

**主要特点：**  
- 实时访问微软官方文档、Azure 文档及 Microsoft 365 文档  
- 先进的语义搜索能力，理解上下文和意图  
- 随微软 Learn 内容发布始终保持信息最新  
- 涵盖微软 Learn、Azure 文档和 Microsoft 365 资料的全面内容  
- 返回最多 10 个高质量内容片段，附带文章标题和链接  

**重要意义：**  
- 解决微软技术中 AI 知识过时的问题  
- 确保 AI 助手访问最新的 .NET、C#、Azure 和 Microsoft 365 功能  
- 提供权威第一方信息，保障代码生成准确性  
- 对快速演进的微软技术开发者至关重要  

**结果：**  
- 大幅提升微软技术 AI 生成代码的准确性  
- 减少查找最新文档和最佳实践的时间  
- 通过上下文感知文档检索提升开发者生产力  
- 与开发工作流无缝集成，无需离开 IDE  

**参考资料：**  
- [微软 Learn Docs MCP 服务器 GitHub 仓库](https://github.com/MicrosoftDocs/mcp)  
- [微软 Learn 文档](https://learn.microsoft.com/)  

## 动手项目

### 项目 1：构建多模型提供商 MCP 服务器

**目标：** 创建一个 MCP 服务器，能根据特定条件路由请求到多个 AI 模型提供商。

**需求：**

- 支持至少三个不同的模型提供商（如 OpenAI、Anthropic、本地模型）  
- 基于请求元数据实现路由机制  
- 创建配置系统管理提供商凭证  
- 添加缓存以优化性能和成本  
- 构建简单监控仪表盘  

**实施步骤：**

1. 搭建基本 MCP 服务器架构  
2. 为每个 AI 模型服务实现提供商适配器  
3. 基于请求属性创建路由逻辑  
4. 为频繁请求添加缓存机制  
5. 开发监控仪表盘  
6. 使用多种请求模式测试  

**技术选型：** 可选用 Python（或基于 .NET/Java/Python 的技术栈），Redis 用于缓存，仪表盘采用简单的 web 框架。

### 项目 2：企业提示管理系统

**目标：** 开发基于 MCP 的系统，管理、版本控制并在组织内部署提示模板。

**需求：**
- 创建一个集中管理的提示模板库  
- 实现版本控制和审批工作流  
- 构建带有示例输入的模板测试功能  
- 开发基于角色的访问控制  
- 创建用于模板检索和部署的API  

**实施步骤：**  

1. 设计模板存储的数据库模式  
2. 创建模板增删改查的核心API  
3. 实现版本控制系统  
4. 构建审批工作流  
5. 开发测试框架  
6. 创建简单的管理网页界面  
7. 与MCP服务器集成  

**技术栈：** 可选择任何后端框架，SQL或NoSQL数据库，以及管理界面的前端框架。  

### 项目3：基于MCP的内容生成平台  

**目标：** 构建一个利用MCP提供跨多种内容类型一致性结果的内容生成平台。  

**需求：**  

- 支持多种内容格式（博客文章、社交媒体、营销文案）  
- 实现基于模板的内容生成并支持定制化选项  
- 创建内容审核和反馈系统  
- 跟踪内容性能指标  
- 支持内容版本管理和迭代  

**实施步骤：**  

1. 搭建MCP客户端基础设施  
2. 创建不同内容类型的模板  
3. 构建内容生成流水线  
4. 实现审核系统  
5. 开发指标跟踪系统  
6. 创建模板管理和内容生成的用户界面  

**技术栈：** 可根据偏好选择编程语言、Web框架和数据库系统。  

## MCP技术的未来方向  

### 新兴趋势  

1. **多模态MCP**  
   - 扩展MCP以标准化与图像、音频和视频模型的交互  
   - 开发跨模态推理能力  
   - 不同模态的标准化提示格式  

2. **联邦MCP基础设施**  
   - 能在组织间共享资源的分布式MCP网络  
   - 用于安全模型共享的标准化协议  
   - 隐私保护计算技术  

3. **MCP市场**  
   - 用于分享和变现MCP模板及插件的生态系统  
   - 质量保证和认证流程  
   - 与模型市场的集成  

4. **边缘计算的MCP**  
   - 为资源受限的边缘设备适配MCP标准  
   - 适用于低带宽环境的优化协议  
   - 专门针对物联网生态的MCP实现  

5. <strong>监管框架</strong>  
   - 开发用于合规监管的MCP扩展  
   - 标准化的审计轨迹和解释接口  
   - 与新兴AI治理框架的集成  

### 微软的MCP解决方案  

微软与Azure开发了多个开源仓库，帮助开发者在各种场景下实现MCP：  

#### Microsoft 组织  

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - 用于浏览器自动化和测试的Playwright MCP服务器  
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - OneDrive MCP服务器实现，支持本地测试和社区贡献  
3. [NLWeb](https://github.com/microsoft/NlWeb) - 一套开放协议及相关开源工具，重点是为AI Web建立基础层  

#### Azure-Samples 组织  

1. [mcp](https://github.com/Azure-Samples/mcp) - 多语言在Azure上构建和集成MCP服务器的示例、工具和资源链接  
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - 参考MCP服务器，演示当前Model Context Protocol规范的认证  
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Azure Functions中远程MCP服务器实现主页，包含语言特定仓库链接  
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - 使用Python构建和部署自定义远程MCP服务器的快速入门模板  
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - 使用.NET/C#构建和部署自定义远程MCP服务器的快速入门模板  
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - 使用TypeScript构建和部署自定义远程MCP服务器的快速入门模板  
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - 使用Python的Azure API管理作为远程MCP服务器的AI网关  
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - 包括MCP能力的APIM ❤️ AI实验，集成Azure OpenAI和AI Foundry  

这些仓库提供了跨多编程语言和Azure服务的各种MCP实现、模板与资源，覆盖从基本服务器实现到认证、云部署及企业集成等多种用例。  

#### MCP资源目录  

[Microsoft官方MCP仓库的MCP资源目录](https://github.com/microsoft/mcp/tree/main/Resources)提供精选的样例资源、提示模板和工具定义，供Model Context Protocol服务器使用。该目录旨在为开发者快速入门MCP提供可重用构件和最佳实践示例，包括：  

- **提示模板：** 适用于常见AI任务和场景的现成提示模板，可用于您自己的MCP服务器实现。  
- **工具定义：** 示例工具架构和元数据，用于标准化不同MCP服务器间的工具集成和调用。  
- **资源样例：** 用于连接数据源、API及MCP框架内外部服务的示例资源定义。  
- **参考实现：** 展示如何在真实MCP项目中组织和结构化资源、提示和工具的实用样例。  

这些资源加快开发进度，促进标准化，并帮助确保构建与部署基于MCP的解决方案的最佳实践。  

#### MCP资源目录  

- [MCP资源（示例提示、工具和资源定义）](https://github.com/microsoft/mcp/tree/main/Resources)  

### 研究机会  

- MCP框架内的高效提示优化技术  
- 多租户MCP部署的安全模型  
- 不同MCP实现间的性能基准测试  
- MCP服务器的形式化验证方法  

## 结论  

Model Context Protocol（MCP）正在快速塑造跨行业标准化、安全且可互操作的AI集成未来。通过本课的案例研究和动手项目，您已了解包括微软和Azure等早期采用者如何利用MCP解决现实问题，加速AI采纳，并确保合规、安全与可扩展性。MCP的模块化方法使组织能够将大语言模型、工具和企业数据连接在一个统一且可审计的框架中。随着MCP的不断发展，持续参与社区、探索开源资源和应用最佳实践将是构建稳健且面向未来的AI解决方案的关键。  

## 额外资源  

- [MCP Foundry GitHub仓库](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)  
- [将Azure AI代理与MCP集成（微软Foundry博客）](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  
- [MCP GitHub仓库（微软）](https://github.com/microsoft/mcp)  
- [MCP资源目录（示例提示、工具和资源定义）](https://github.com/microsoft/mcp/tree/main/Resources)  
- [MCP社区与文档](https://modelcontextprotocol.io/introduction)  
- [MCP规范（2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Azure MCP文档](https://aka.ms/azmcp)  
- [OWASP MCP十大安全最佳实践](https://microsoft.github.io/mcp-azure-security-guide/mcp/)  
- [Playwright MCP服务器GitHub仓库](https://github.com/microsoft/playwright-mcp)  
- [Files MCP服务器（OneDrive）](https://github.com/microsoft/files-mcp-server)  
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)  
- [MCP认证服务器（Azure-Samples）](https://github.com/Azure-Samples/mcp-auth-servers)  
- [远程MCP Functions（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-functions)  
- [远程MCP Functions Python（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-functions-python)  
- [远程MCP Functions .NET（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)  
- [远程MCP Functions TypeScript（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-functions-typescript)  
- [远程MCP APIM Functions Python（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)  
- [AI-Gateway（Azure-Samples）](https://github.com/Azure-Samples/AI-Gateway)  
- [微软AI与自动化解决方案](https://azure.microsoft.com/en-us/products/ai-services/)  

## 练习  

1. 分析一个案例研究，并提出一种替代的实现方案。  
2. 选择一个项目思路，创建详细的技术规范。  
3. 研究案例研究未涵盖的行业，并概述MCP如何解决其特定挑战。  
4. 探索未来方向之一，构思支持该方向的新MCP扩展方案。  

## 后续内容  

深入了解：[Microsoft MCP Servers](./microsoft-mcp-servers.md)  

继续阅读：[模块8：最佳实践](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->