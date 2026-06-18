# 企業整合

在企業環境中構建 MCP 伺服器時，您經常需要與現有的 AI 平台和服務整合。本節涵蓋如何將 MCP 與 Azure OpenAI 和 Microsoft AI Foundry 等企業系統整合，實現先進的 AI 能力和工具協調。

## 介紹

在本課程中，您將學習如何將模型上下文協議（MCP）與企業 AI 系統整合，重點是 Azure OpenAI 和 Microsoft AI Foundry。這些整合使您能夠利用強大的 AI 模型和工具，同時保持 MCP 的靈活性和擴展性。

## 學習目標

完成本課程後，您將能夠：

- 將 MCP 與 Azure OpenAI 整合以利用其 AI 功能。
- 實現 MCP 與 Azure OpenAI 的工具協調。
- 將 MCP 與 Microsoft AI Foundry 結合以獲得高級 AI 代理能力。
- 利用 Azure 機器學習（ML）執行 ML 管道並將模型註冊為 MCP 工具。

## Azure OpenAI 整合

Azure OpenAI 提供對強大 AI 模型（如 GPT-4 等）的訪問。將 MCP 與 Azure OpenAI 整合使您能夠利用這些模型，同時保持 MCP 的工具協調靈活性。

### C# 實作

在此程式碼片段中，我們展示了如何使用 Azure OpenAI SDK 將 MCP 與 Azure OpenAI 整合。

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

在上述程式碼中我們：

- 使用端點、部署名稱和 API 金鑰配置了 Azure OpenAI 客戶端。
- 建立了一個 `GetCompletionWithToolsAsync` 方法來獲取支持工具的完成結果。
- 處理了回應中的工具呼叫。

我們鼓勵您根據具體的 MCP 伺服器設置實現實際的工具處理邏輯。

## Microsoft Foundry 整合

Microsoft Foundry 提供了一個用於構建和部署 AI 代理的平台。將 MCP 與 Microsoft Foundry 整合，使您能夠利用其功能，同時保持 MCP 的靈活性。

在下面的程式碼中，我們開發了一個代理整合，該代理使用 MCP 處理請求並處理工具呼叫。

### Java 實作

```java
// Java AI Foundry 代理整合
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
        // 處理 AI Foundry 代理請求
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // 檢查代理是否請求使用工具
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // 對每個工具呼叫，將其導向適當的 MCP 工具
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
                
                // 提交工具回應回代理
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

- 建立了一個整合 AI Foundry 與 MCP 的 `AIFoundryMcpBridge` 類別。
- 實作了一個 `processAgentRequest` 方法，該方法處理 AI Foundry 代理請求。
- 通過 MCP 客戶端執行工具呼叫，並將結果提交回 AI Foundry 代理。

## 將 MCP 與 Azure ML 整合

將 MCP 與 Azure 機器學習（ML）整合，使您能夠利用 Azure 強大的 ML 功能，同時保持 MCP 的靈活性。此整合可用於執行 ML 管道、將模型註冊為工具以及管理計算資源。

### Python 實作

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
        # 先使用 MCP 工具處理輸入資料
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # 將流程提交至 Azure ML
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
        
        # 回傳工作資訊
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
        
        # 根據模型結構新增輸入屬性
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # 註冊為 MCP 工具
        # 在實際應用中，您會建立一個呼叫該端點的工具
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

- 建立了一個將 MCP 與 Azure ML 整合的 `EnterpriseAiIntegration` 類別。
- 實作了 `execute_ml_pipeline` 方法，該方法使用 MCP 工具處理輸入資料並向 Azure ML 提交 ML 管道。
- 實作了 `register_ml_model_as_tool` 方法，該方法將 Azure ML 模型註冊為 MCP 工具，包括建立必要的部署環境及計算資源。
- 將 Azure ML 數據類型映射到工具註冊的 JSON schema 類型。
- 使用非同步程式設計來處理可能耗時的操作，如 ML 管道執行和模型註冊。

## 接下來

- [5.2 多模態](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->