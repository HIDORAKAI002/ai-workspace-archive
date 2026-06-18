# 企业集成

在企业环境中构建 MCP 服务器时，您通常需要与现有的 AI 平台和服务进行集成。本节介绍如何将 MCP 与企业系统（如 Azure OpenAI 和 Microsoft AI Foundry）集成，启用先进的 AI 功能和工具编排。

## 介绍

在本课中，您将学习如何将模型上下文协议（MCP）与企业 AI 系统集成，重点是 Azure OpenAI 和 Microsoft AI Foundry。这些集成使您能够利用强大的 AI 模型和工具，同时保持 MCP 的灵活性和可扩展性。

## 学习目标

在本课结束时，您将能够：

- 将 MCP 与 Azure OpenAI 集成，以利用其 AI 功能。
- 实现 MCP 与 Azure OpenAI 的工具编排。
- 将 MCP 与 Microsoft AI Foundry 结合使用，实现高级 AI 代理功能。
- 利用 Azure 机器学习（ML）执行 ML 流水线并将模型注册为 MCP 工具。

## Azure OpenAI 集成

Azure OpenAI 提供了对 GPT-4 等强大 AI 模型的访问。将 MCP 与 Azure OpenAI 集成，允许您利用这些模型，同时保持 MCP 工具编排的灵活性。

### C# 实现

在此代码片段中，我们演示了如何使用 Azure OpenAI SDK 将 MCP 与 Azure OpenAI 集成。

```csharp
// .NET Azure OpenAI Integration
using Microsoft.Mcp.Client;
using Azure.AI.OpenAI;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace EnterpriseIntegration
{
    public class AzureOpenAiMcpClient
    {
        private readonly string _endpoint;
        private readonly string _apiKey;
        private readonly string _deploymentName;
        
        public AzureOpenAiMcpClient(IConfiguration config)
        {
            _endpoint = config["AzureOpenAI:Endpoint"];
            _apiKey = config["AzureOpenAI:ApiKey"];
            _deploymentName = config["AzureOpenAI:DeploymentName"];
        }
        
        public async Task<string> GetCompletionWithToolsAsync(string prompt, params string[] allowedTools)
        {
            // Create OpenAI client
            var client = new OpenAIClient(new Uri(_endpoint), new AzureKeyCredential(_apiKey));
            
            // Create completion options with tools
            var completionOptions = new ChatCompletionsOptions
            {
                DeploymentName = _deploymentName,
                Messages = { new ChatMessage(ChatRole.User, prompt) },
                Temperature = 0.7f,
                MaxTokens = 800
            };
            
            // Add tool definitions
            foreach (var tool in allowedTools)
            {
                completionOptions.Tools.Add(new ChatCompletionsFunctionToolDefinition
                {
                    Name = tool,
                    // In a real implementation, you'd add the tool schema here
                });
            }
            
            // Get completion response
            var response = await client.GetChatCompletionsAsync(completionOptions);
            
            // Handle tool calls in the response
            foreach (var toolCall in response.Value.Choices[0].Message.ToolCalls)
            {
                // Implementation to handle Azure OpenAI tool calls with MCP
                // ...
            }
            
            return response.Value.Choices[0].Message.Content;
        }
    }
}
```

在上述代码中，我们：

- 配置了 Azure OpenAI 客户端，设置了端点、部署名称和 API 密钥。
- 创建了一个名为 `GetCompletionWithToolsAsync` 的方法，用于获取带工具支持的完成结果。
- 处理了响应中的工具调用。

建议您根据具体的 MCP 服务器设置实现实际的工具处理逻辑。

## Microsoft Foundry 集成

Microsoft Foundry 提供了构建和部署 AI 代理的平台。将 MCP 与 Microsoft Foundry 集成，使您能够利用其功能，同时保持 MCP 的灵活性。

在以下代码中，我们开发了一个代理集成，使用 MCP 处理请求并处理工具调用。

### Java 实现

```java
// Java AI Foundry 代理集成
package com.example.mcp.enterprise;

import com.microsoft.aifoundry.AgentClient;
import com.microsoft.aifoundry.AgentToolResponse;
import com.microsoft.aifoundry.models.AgentRequest;
import com.microsoft.aifoundry.models.AgentResponse;
import com.mcp.client.McpClient;
import com.mcp.tools.ToolRequest;
import com.mcp.tools.ToolResponse;

public class AIFoundryMcpBridge {
    private final AgentClient agentClient;
    private final McpClient mcpClient;
    
    public AIFoundryMcpBridge(String aiFoundryEndpoint, String mcpServerUrl) {
        this.agentClient = new AgentClient(aiFoundryEndpoint);
        this.mcpClient = new McpClient.Builder()
            .setServerUrl(mcpServerUrl)
            .build();
    }
    
    public AgentResponse processAgentRequest(AgentRequest request) {
        // 处理 AI Foundry 代理请求
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // 检查代理是否请求使用工具
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // 对每个工具调用，将其路由到相应的 MCP 工具
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // 使用 MCP 执行工具
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // 为 AI Foundry 创建工具响应
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // 将工具响应提交回代理
                initialResponse = agentClient.submitToolResponse(
                    request.getConversationId(), 
                    toolResponse
                );
            }
        }
        
        return initialResponse;
    }
}
```

在上述代码中，我们：

- 创建了一个整合 AI Foundry 和 MCP 的 `AIFoundryMcpBridge` 类。
- 实现了一个处理 AI Foundry 代理请求的 `processAgentRequest` 方法。
- 通过 MCP 客户端执行工具调用，并将结果提交回 AI Foundry 代理。

## 将 MCP 与 Azure ML 集成

将 MCP 与 Azure 机器学习（ML）集成，使您能够利用 Azure 强大的 ML 功能，同时保持 MCP 的灵活性。此集成可以用于执行 ML 流水线、将模型注册为工具，以及管理计算资源。

### Python 实现

```python
# Python Azure AI 集成
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # 设置 MCP 客户端
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # 设置 Azure ML 客户端
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # 首先使用 MCP 工具处理输入数据
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # 将管道提交到 Azure ML
        pipeline_job = self.ml_client.jobs.create_or_update(
            entity={
                "name": pipeline_name,
                "display_name": f"MCP-triggered {pipeline_name}",
                "experiment_name": "mcp-integration",
                "inputs": {
                    "processed_data": processed_data.result
                }
            }
        )
        
        # 返回作业信息
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # 获取模型详情
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # 创建部署环境
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # 设置计算资源
        compute = self.ml_client.compute.get("mcp-inference")
        
        # 将模型部署为在线端点
        deployment = self.ml_client.online_deployments.create_or_update(
            endpoint_name=f"mcp-{model_name}",
            deployment={
                "name": f"mcp-{model_name}-deployment",
                "model": model.id,
                "environment": env,
                "compute": compute,
                "scale_settings": {
                    "scale_type": "auto",
                    "min_instances": 1,
                    "max_instances": 3
                }
            }
        )
        
        # 根据模型架构创建 MCP 工具架构
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # 根据模型架构添加输入属性
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # 注册为 MCP 工具
        # 在实际实现中，您将创建一个调用端点的工具
        return {
            "model_name": model_name,
            "model_version": model.version,
            "endpoint": deployment.endpoint_uri,
            "tool_schema": tool_schema
        }
    
    def _map_ml_type_to_json_type(self, ml_type):
        """Maps ML data types to JSON schema types"""
        mapping = {
            "float": "number",
            "int": "integer",
            "bool": "boolean",
            "str": "string",
            "object": "object",
            "array": "array"
        }
        return mapping.get(ml_type, "string")
```

在上述代码中，我们：

- 创建了一个将 MCP 与 Azure ML 集成的 `EnterpriseAiIntegration` 类。
- 实现了一个 `execute_ml_pipeline` 方法，使用 MCP 工具处理输入数据并向 Azure ML 提交 ML 流水线。
- 实现了一个 `register_ml_model_as_tool` 方法，将 Azure ML 模型注册为 MCP 工具，包括创建必要的部署环境和计算资源。
- 将 Azure ML 数据类型映射到用于工具注册的 JSON 模式类型。
- 使用异步编程处理可能的长时间运行操作，如 ML 流水线执行和模型注册。

## 后续内容

- [5.2 多模态](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->