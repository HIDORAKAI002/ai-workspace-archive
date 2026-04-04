# 🌟 早期采用者的经验教训

[![Lessons from MCP Early Adopters](../../../translated_images/zh-CN/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(点击上方图片观看本课视频)_

## 🎯 本模块涵盖内容

本模块探讨了真实组织和开发者如何利用模型上下文协议（MCP）解决实际问题并推动创新。通过详细的案例研究、动手项目和实用示例，您将发现 MCP 如何实现安全、可扩展的 AI 集成，连接语言模型、工具和企业数据。

### 📚 看 MCP 如何应用

想看看这些原则如何应用于生产就绪工具吗？请查看我们的[**10 个正在改变开发者生产力的微软 MCP 服务器**](microsoft-mcp-servers.md)，展示了您今天即可使用的真实微软 MCP 服务器。

## 概述

本课探索早期采用者如何利用模型上下文协议（MCP）解决现实挑战，并推动各行业的创新。通过详细案例和动手项目，您将看到 MCP 如何实现标准化、安全且可扩展的 AI 集成——将大型语言模型、工具和企业数据统一连接。您将获得设计和构建基于 MCP 解决方案的实践经验，学习经过验证的实现模式，并发现 MCP 在生产环境中的最佳部署实践。课程还强调新兴趋势、未来方向和开源资源，助您保持 MCP 技术及其不断发展的生态系统的前沿地位。

## 学习目标

- 分析不同行业中的真实 MCP 实现案例
- 设计并构建完整的基于 MCP 的应用
- 探索 MCP 技术的新兴趋势和未来方向
- 在实际开发场景中应用最佳实践

## 真实 MCP 实现案例

### 案例研究 1：企业客户支持自动化

一家跨国公司实施了基于 MCP 的解决方案，以标准化其客户支持系统中的 AI 交互。这使他们能够：

- 为多个 LLM 供应商创建统一接口
- 在各部门间保持一致的提示管理
- 实施强大的安全和合规控制
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
  
**结果：** 模型成本降低30%，响应一致性提升45%，全球运营合规性增强。

### 案例研究 2：医疗诊断助手

一家医疗提供商开发了 MCP 基础设施，集成多个专业医疗 AI 模型，同时确保敏感患者数据受到保护：

- 实现通用与专业医疗模型之间的无缝切换
- 严格的隐私控制和审计追踪
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
  
**结果：** 为医生提供更好的诊断建议，同时完全符合 HIPAA 规定，大幅减少系统间上下文切换。

### 案例研究 3：金融服务风险分析

一家金融机构运用 MCP 标准化其跨部门的风险分析流程：

- 创建了信用风险、欺诈检测和投资风险模型的统一接口
- 实施严格的访问控制和模型版本管理
- 确保所有 AI 推荐的可审计性
- 在多样系统间保持一致的数据格式

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
  
**结果：** 加强监管合规，模型部署周期提速40%，风险评估在各部门间更为一致。

### 案例研究 4：微软 Playwright MCP 浏览器自动化服务器

微软开发了[Playwright MCP 服务器](https://github.com/microsoft/playwright-mcp)，通过模型上下文协议实现安全、标准化的浏览器自动化。该生产就绪服务器使 AI 代理和 LLM 能以受控、可审计且可扩展的方式与网页浏览器交互，支持自动化网页测试、数据提取和端到端工作流等用例。

> **🎯 生产就绪工具**
> 
> 本案例展示了您今天即可使用的真实 MCP 服务器！了解更多 Playwright MCP 服务器及其他 9 个微软生产就绪 MCP 服务器信息，请参见我们的[**微软 MCP 服务器指南**](microsoft-mcp-servers.md#8--playwright-mcp-server)。

**主要功能：**  
- 将浏览器自动化能力（导航、表单填写、截图等）作为 MCP 工具公开  
- 实施严格的访问控制和沙箱机制防止未授权操作  
- 提供详细的浏览器交互审计日志  
- 支持与 Azure OpenAI 及其他 LLM 供应商集成，实现代理驱动自动化  
- 支撑 GitHub Copilot 的代码代理具备网页浏览能力

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

// 注册一个用于导航到 URL 并捕获屏幕截图的工具
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

- 实现 AI 代理和 LLM 的安全程序化浏览器自动化  
- 减少人工测试工作，提升网页应用测试覆盖率  
- 提供面向企业环境的可复用、可扩展浏览器工具集成框架  
- 支撑 GitHub Copilot 的网页浏览功能

**参考资料：**

- [Playwright MCP 服务器 GitHub 仓库](https://github.com/microsoft/playwright-mcp)  
- [微软 AI 和自动化解决方案](https://azure.microsoft.com/en-us/products/ai-services/)

### 案例研究 5：Azure MCP — 企业级模型上下文协议即服务

Azure MCP 服务器 ([https://aka.ms/azmcp](https://aka.ms/azmcp)) 是微软的托管企业级 MCP 实现，旨在提供可扩展、安全且合规的 MCP 服务器云服务。Azure MCP 使组织能够快速部署、管理及集成 MCP 服务器与 Azure AI、数据和安全服务，降低运维负担，加速 AI 采用。

> **🎯 生产就绪工具**
> 
> 这是您今天即可使用的真实 MCP 服务器！了解更多 Azure AI Foundry MCP 服务器信息，请参见我们的[**微软 MCP 服务器指南**](microsoft-mcp-servers.md)。

- 全托管 MCP 服务器托管，具备内建扩展、监控和安全功能  
- 与 Azure OpenAI、Azure AI 搜索及其他 Azure 服务原生集成  
- 通过 Microsoft Entra ID 实现企业身份认证和授权  
- 支持自定义工具、提示模板和资源连接器  
- 符合企业安全和合规要求

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
- 简化 LLM、工具和企业数据源的集成  
- 提升 MCP 工作负载的安全性、可观察性和运营效率  
- 通过 Azure SDK 最佳实践和最新认证模式改进代码质量

**参考资料：**  
- [Azure MCP 文档](https://aka.ms/azmcp)  
- [Azure MCP 服务器 GitHub 仓库](https://github.com/Azure/azure-mcp)  
- [Azure AI 服务](https://azure.microsoft.com/en-us/products/ai-services/)  
- [微软 MCP 中心](https://mcp.azure.com)

## 案例研究 6：NLWeb  
MCP（模型上下文协议）是一种新兴协议，使聊天机器人和 AI 助手能够与工具交互。每个 NLWeb 实例同时也是一个 MCP 服务器，支持一个核心方法 ask，用于以自然语言向网站提问。返回的响应利用 schema.org，这是描述网页数据的广泛使用词汇。粗略来说，MCP 对 NLWeb 就如同 Http 对 HTML。NLWeb 结合协议、Schema.org 格式和示例代码，帮助网站快速创建这些端点，既惠及通过对话界面的用户，也支持自然的代理间机器交互。

NLWeb 有两个不同组成部分。  
- 一种协议，从简单入手，用于以自然语言与网站接口，并用 json 和 schema.org 格式返回答案。详情见 REST API 文档。  
- (1) 的简洁实现，借助已有标记，适用于可抽象为项目列表（产品、菜谱、景点、评价等）的网站。结合一套用户界面小部件，网站可以轻松提供其内容的对话式接口。详细工作原理见“会话查询流程”文档。

**参考资料：**  
- [Azure MCP 文档](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### 案例研究 7：Azure AI Foundry MCP 服务器——企业 AI 代理集成

Azure AI Foundry MCP 服务器展示了 MCP 如何在企业环境中协调管理 AI 代理和工作流。通过将 MCP 集成进 Azure AI Foundry，组织可以标准化代理交互，利用 Foundry 的工作流管理，确保安全、可扩展的部署。

> **🎯 生产就绪工具**
> 
> 这是您今天可用的真实 MCP 服务器！了解更多 Azure AI Foundry MCP 服务器信息，请参见我们的[**微软 MCP 服务器指南**](microsoft-mcp-servers.md#9--azure-ai-foundry-mcp-server)。

**主要功能：**  
- 全面访问 Azure AI 生态系统，包括模型目录和部署管理  
- 利用 Azure AI 搜索进行知识索引，支持 RAG 应用  
- AI 模型性能评估和质量保证工具  
- 与 Azure AI Foundry 目录和实验室集成，支持前沿研究模型  
- 生产场景下的代理管理和评估能力

**结果：**  
- 快速原型开发和强健的 AI 代理工作流监控  
- 与 Azure AI 服务无缝集成，支持高级应用场景  
- 统一接口支持构建、部署和监控代理管道  
- 企业级安全、合规和运营效率提升  
- 加速 AI 采用，同时保持复杂代理驱动流程的控制

**参考资料：**  
- [Azure AI Foundry MCP 服务器 GitHub 仓库](https://github.com/azure-ai-foundry/mcp-foundry)  
- [将 Azure AI 代理与 MCP 集成（微软 Foundry 博客）](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### 案例研究 8：Foundry MCP Playground — 实验与原型开发

Foundry MCP Playground 提供了一个即用型环境，用于实验 MCP 服务器和 Azure AI Foundry 集成。开发者可以快速构建原型、测试并评估 AI 模型及代理工作流，利用 Azure AI Foundry 目录和实验室资源。该 Playground 简化了设置过程，提供样例项目，支持协作开发，便于探索最佳实践和新场景，降低复杂基础设施门槛，促进 MCP 与 Azure AI Foundry 生态系统的创新和社区贡献。

**参考资料：**

- [Foundry MCP Playground GitHub 仓库](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### 案例研究 9：Microsoft Learn Docs MCP 服务器——AI 驱动的文档访问

Microsoft Learn Docs MCP 服务器是一个云托管服务，基于模型上下文协议，为 AI 助手提供对微软官方文档的实时访问。该生产就绪服务器连接庞大的 Microsoft Learn 生态系统，实现所有官方微软资源的语义搜索。

> **🎯 生产就绪工具**
> 
> 这是您今天可以使用的真实 MCP 服务器！了解更多 Microsoft Learn Docs MCP 服务器信息，请参见我们的[**微软 MCP 服务器指南**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server)。

**主要功能：**  
- 实时访问微软官方文档、Azure 文档和 Microsoft 365 文档  
- 先进的语义搜索能力，理解上下文和意图  
- 微软 Learn 内容发布即可即时获取最新信息  
- 覆盖 Microsoft Learn、Azure 文档和 Microsoft 365 全面资源  
- 返回最多10条高质量内容块，包括文章标题和链接

**为何重要：**  
- 解决微软技术“知识过时”难题  
- 确保 AI 助手访问最新的 .NET、C#、Azure 和 Microsoft 365 功能  
- 提供权威第一方信息，支持准确的代码生成  
- 开发者处理快速演进微软技术时不可或缺

**结果：**  
- 显著提升微软技术 AI 生成代码的准确度  
- 减少查找最新文档和最佳实践的时间  
- 提升开发者生产力，实现上下文感知文档检索  
- 与开发工作流无缝集成，无需离开 IDE

**参考资料：**  
- [Microsoft Learn Docs MCP 服务器 GitHub 仓库](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn 文档](https://learn.microsoft.com/)

## 动手项目

### 项目 1：构建多供应商 MCP 服务器

**目标：** 创建一个 MCP 服务器，可基于特定条件路由请求到多个 AI 模型供应商。

**需求：**

- 支持至少三个不同模型供应商（如 OpenAI、Anthropic、本地模型）  
- 实现基于请求元数据的路由机制  
- 创建管理供应商凭据的配置系统  
- 增加缓存以优化性能和成本  
- 构建简单的监控仪表盘

**实现步骤：**

1. 搭建基础 MCP 服务器基础设施  
2. 为每个 AI 模型服务实现供应商适配器  
3. 创建基于请求属性的路由逻辑  
4. 添加针对频繁请求的缓存机制  
5. 开发监控仪表盘  
6. 进行多种请求模式测试

**技术栈：** 可选择 Python（.NET/Java/Python 均可），Redis 用于缓存，简易 web 框架搭建仪表盘。

### 项目 2：企业提示管理系统
**目标：** 开发一个基于 MCP 的系统，用于管理、版本控制和部署组织内的提示模板。

**需求：**

- 创建提示模板的集中存储库
- 实现版本控制和审批工作流程
- 构建带有示例输入的模板测试功能
- 开发基于角色的访问控制
- 创建用于模板检索和部署的 API

**实施步骤：**

1. 设计模板存储的数据库架构
2. 创建模板 CRUD 操作的核心 API
3. 实现版本控制系统
4. 构建审批工作流程
5. 开发测试框架
6. 创建简单的管理 Web 界面
7. 与 MCP 服务器集成

**技术栈：** 你的后端框架选择，SQL 或 NoSQL 数据库，以及管理界面的前端框架。

### 项目 3：基于 MCP 的内容生成平台

**目标：** 构建一个利用 MCP 提供不同内容类型间一致结果的内容生成平台。

**需求：**

- 支持多种内容格式（博客文章、社交媒体、营销文案）
- 实现基于模板的生成并带有自定义选项
- 创建内容审核和反馈系统
- 跟踪内容表现指标
- 支持内容版本控制和迭代

**实施步骤：**

1. 搭建 MCP 客户端基础架构
2. 为不同内容类型创建模板
3. 构建内容生成流水线
4. 实现审核系统
5. 开发指标跟踪系统
6. 创建用于模板管理和内容生成的用户界面

**技术栈：** 你偏好的编程语言、Web 框架和数据库系统。

## MCP 技术未来方向

### 新兴趋势

1. **多模态 MCP**
   - 扩展 MCP 以标准化与图像、音频和视频模型的交互
   - 跨模态推理能力的发展
   - 适用于不同模态的标准化提示格式

2. **联邦 MCP 基础设施**
   - 可以跨组织共享资源的分布式 MCP 网络
   - 用于安全模型共享的标准化协议
   - 隐私保护计算技术

3. **MCP 市场**
   - MCP 模板和插件分享及变现的生态系统
   - 质量保证和认证流程
   - 与模型市场的集成

4. **面向边缘计算的 MCP**
   - 针对资源受限边缘设备调整 MCP 标准
   - 针对低带宽环境优化的协议
   - 针对物联网生态系统的专门 MCP 实现

5. **监管框架**
   - 开发用于法规合规的 MCP 扩展
   - 标准化审计追踪和可解释性接口
   - 与新兴 AI 治理框架的集成

### 微软的 MCP 解决方案

微软与 Azure 开发了多个开源仓库，帮助开发者在各种场景中实现 MCP：

#### Microsoft 组织

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - 用于浏览器自动化和测试的 Playwright MCP 服务器
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - OneDrive MCP 服务器实现，用于本地测试和社区贡献
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb 是一套开源协议和相关开源工具，主要致力于建立 AI Web 的基础层

#### Azure-Samples 组织

1. [mcp](https://github.com/Azure-Samples/mcp) - 提供示例、工具和资源，用于多语言在 Azure 上构建和集成 MCP 服务器
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - 参考 MCP 服务器，展示当前 Model Context Protocol 规范下的身份验证
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Azure Functions 中远程 MCP 服务器实现的入口页面及语言特定仓库链接
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - 使用 Python 在 Azure Functions 上构建和部署自定义远程 MCP 服务器的快速入门模板
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - 使用 .NET/C# 在 Azure Functions 上构建和部署自定义远程 MCP 服务器的快速入门模板
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - 使用 TypeScript 在 Azure Functions 上构建和部署自定义远程 MCP 服务器的快速入门模板
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - 作为 AI 网关的 Azure API 管理，支持 Python 远程 MCP 服务器
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - 包含 MCP 功能的 APIM ❤️ AI 实验项目，集成 Azure OpenAI 和 AI Foundry

这些仓库提供了多语言、多 Azure 服务场景下的 Model Context Protocol 各种实现、模板和资源，涵盖从基础服务器实现、身份验证、云部署到企业集成的广泛用例。

#### MCP 资源目录

微软官方 MCP 仓库中的 [MCP Resources 目录](https://github.com/microsoft/mcp/tree/main/Resources) 提供了精选的示例资源、提示模板和工具定义，用于 Model Context Protocol 服务器。该目录旨在通过提供可复用的构建模块和最佳实践示例，帮助开发者快速入门 MCP：

- **提示模板：** 适用于常见 AI 任务和场景的现成提示模板，方便适配自己的 MCP 服务器实现。
- **工具定义：** 示例工具架构和元数据，用于不同 MCP 服务器间标准化工具集成和调用。
- **资源示例：** 用于在 MCP 框架内连接数据源、API 和外部服务的资源定义。
- **参考实现：** 展示如何在真实 MCP 项目中组织资源、提示和工具的实用示例。

这些资源加速开发，促进标准化，并帮助构建和部署基于 MCP 的解决方案时遵循最佳实践。

#### MCP 资源目录

- [MCP 资源（示例提示、工具和资源定义）](https://github.com/microsoft/mcp/tree/main/Resources)

### 研究机会

- MCP 框架内的高效提示优化技术
- 多租户 MCP 部署的安全模型
- 不同 MCP 实现的性能基准测试
- MCP 服务器的形式化验证方法

## 结论

Model Context Protocol (MCP) 正在快速塑造各行业标准化、安全且可互操作的 AI 集成未来。通过本课的案例研究和实操项目，你已经看到包括微软和 Azure 在内的早期采用者，如何利用 MCP 解决实际问题，加速 AI 采用，确保合规、安全和可扩展性。MCP 的模块化方法使组织能够在统一、可审计的框架中连接大型语言模型、工具和企业数据。随着 MCP 持续发展，积极参与社区、探索开源资源和应用最佳实践，将是构建稳健、面向未来的 AI 解决方案的关键。

## 额外资源

- [MCP Foundry GitHub 仓库](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [将 Azure AI 代理与 MCP 集成（微软 Foundry 博客）](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub 仓库（微软）](https://github.com/microsoft/mcp)
- [MCP 资源目录（示例提示、工具和资源定义）](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP 社区与文档](https://modelcontextprotocol.io/introduction)
- [MCP 规范 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP 文档](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全最佳实践
- [Playwright MCP 服务器 GitHub 仓库](https://github.com/microsoft/playwright-mcp)
- [Files MCP 服务器（OneDrive）](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers（Azure-Samples）](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python（Azure-Samples）](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway（Azure-Samples）](https://github.com/Azure-Samples/AI-Gateway)
- [微软 AI 与自动化解决方案](https://azure.microsoft.com/en-us/products/ai-services/)

## 练习

1. 分析一个案例研究，并提出一个替代的实现方案。
2. 选择一个项目想法，创建详细的技术规格。
3. 研究一个案例中未涉及的行业，概述 MCP 如何解决该行业的特定挑战。
4. 探索一个未来方向，提出一个支持该方向的新 MCP 扩展概念。

## 接下来

探索更多：[Microsoft MCP Servers](./microsoft-mcp-servers.md)

继续学习：[第 8 模块：最佳实践](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译。尽管我们力求准确，但自动翻译可能包含错误或不准确之处。原始语言的文档应被视为权威来源。对于重要信息，建议使用专业人工翻译。我们不对因使用本翻译而产生的任何误解或曲解承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->