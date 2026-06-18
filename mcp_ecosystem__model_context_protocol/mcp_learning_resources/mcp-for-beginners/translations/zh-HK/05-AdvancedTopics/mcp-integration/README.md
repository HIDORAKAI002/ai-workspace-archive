# 企業整合

在企業環境中構建 MCP 伺服器時，您經常需要與現有的 AI 平台和服務進行整合。本節介紹如何將 MCP 與企業系統如 Azure OpenAI 和 Microsoft AI Foundry 整合，從而實現進階的 AI 能力和工具調度。

## 介紹

在本課程中，您將學習如何將模型上下文協定（Model Context Protocol，MCP）與企業 AI 系統整合，重點聚焦於 Azure OpenAI 及 Microsoft AI Foundry。這些整合讓您能夠利用強大的 AI 模型與工具，同時保持 MCP 的靈活性與可擴展性。

## 學習目標

完成本課程後，您將能夠：

- 將 MCP 與 Azure OpenAI 整合，以利用其 AI 能力。
- 實現 MCP 環境下的工具調度，結合 Azure OpenAI。
- 將 MCP 與 Microsoft AI Foundry 結合，實現進階 AI 代理功能。
- 利用 Azure 機器學習（ML）執行 ML 工作流程，並註冊模型為 MCP 工具。

## Azure OpenAI 整合

Azure OpenAI 提供使用強大 AI 模型如 GPT-4 等的能力。將 MCP 與 Azure OpenAI 整合可以使用這些模型，同時保有 MCP 工具調度的靈活性。

### C# 範例實作

在此程式碼範例中，我們演示如何使用 Azure OpenAI SDK 整合 MCP 與 Azure OpenAI。

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

在上述程式碼中，我們：

- 配置了 Azure OpenAI 用戶端，包含端點、部署名稱與 API 金鑰。
- 建立了 `GetCompletionWithToolsAsync` 方法，取得具工具支持的完成結果。
- 處理回應中的工具呼叫。

建議您根據具體 MCP 伺服器環境實作實際的工具處理邏輯。

## Microsoft Foundry 整合

Microsoft Foundry 提供建立與部署 AI 代理的平台。將 MCP 與 Microsoft Foundry 整合，允許您利用其平台功能，同時保有 MCP 的彈性。

以下程式碼示範了基於 MCP，開發處理請求與工具呼叫的代理整合。

### Java 範例實作

```java
// Java AI Foundry Agent 整合
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
        // 處理 AI Foundry Agent 請求
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // 檢查代理是否要求使用工具
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // 對每個工具呼叫，將其路由到適當的 MCP 工具
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // 使用 MCP 執行工具
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // 為 AI Foundry 建立工具回應
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // 將工具回應提交回代理
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

在上述程式碼中，我們：

- 建立一個名為 `AIFoundryMcpBridge` 的類別，實現與 AI Foundry 及 MCP 的整合。
- 實作 `processAgentRequest` 方法，處理 AI Foundry 代理的請求。
- 透過 MCP 用戶端執行工具呼叫，並將結果回傳給 AI Foundry 代理。

## MCP 與 Azure ML 整合

將 MCP 與 Azure 機器學習（ML）整合，讓您同時利用 Azure 強大的 ML 功能及 MCP 的靈活性。此整合可用於執行 ML 流程、將模型註冊為工具，並管理計算資源。

### Python 範例實作

```python
# Python Azure AI 整合
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # 設定 MCP 用戶端
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # 設定 Azure ML 用戶端
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # 首先使用 MCP 工具處理輸入資料
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # 提交管線至 Azure ML
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
        
        # 返回工作資訊
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # 取得模型詳細資料
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # 建立部署環境
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # 設定計算資源
        compute = self.ml_client.compute.get("mcp-inference")
        
        # 將模型部署為線上端點
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
        
        # 根據模型結構建立 MCP 工具結構
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # 根據模型結構加入輸入屬性
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # 註冊為 MCP 工具
        # 在實際實作中，你會建立一個呼叫端點的工具
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

在上述程式碼中，我們：

- 建立 `EnterpriseAiIntegration` 類別，整合 MCP 與 Azure ML。
- 實作 `execute_ml_pipeline` 方法，使用 MCP 工具處理輸入資料並提交 ML 流程至 Azure ML。
- 實作 `register_ml_model_as_tool` 方法，將 Azure ML 模型註冊為 MCP 工具，包含建立必要的部署環境與計算資源。
- 將 Azure ML 資料型態映射為 JSON schema 型態以便工具註冊。
- 使用非同步程式設計，處理 ML 流程執行及模型註冊等可能的長時間作業。

## 下一步

- [5.2 多模態](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->