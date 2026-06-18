# エンタープライズ統合

エンタープライズ環境でMCPサーバーを構築する際には、既存のAIプラットフォームやサービスと統合する必要がよくあります。このセクションでは、MCPをAzure OpenAIやMicrosoft AI Foundryなどのエンタープライズシステムと統合し、高度なAI機能とツールオーケストレーションを可能にする方法について説明します。

## はじめに

このレッスンでは、Model Context Protocol（MCP）をエンタープライズAIシステム、特にAzure OpenAIとMicrosoft AI Foundryと統合する方法を学びます。これらの統合により、強力なAIモデルとツールを活用しつつ、MCPの柔軟性と拡張性を維持できます。

## 学習目標

このレッスンの終了時には、以下ができるようになります：

- MCPをAzure OpenAIと統合して、そのAI機能を利用する。
- Azure OpenAIとともにMCPのツールオーケストレーションを実装する。
- Microsoft AI FoundryとMCPを組み合わせて高度なAIエージェント機能を実現する。
- Azure Machine Learning（ML）を活用してMLパイプラインを実行し、モデルをMCPツールとして登録する。

## Azure OpenAI統合

Azure OpenAIはGPT-4などの強力なAIモデルへのアクセスを提供します。MCPをAzure OpenAIと統合することで、これらのモデルを利用しつつ、MCPのツールオーケストレーションの柔軟性を維持できます。

### C# 実装

このコードスニペットでは、Azure OpenAI SDKを使用してMCPとAzure OpenAIを統合する方法を示します。

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

前述のコードでは以下を行っています：

- エンドポイント、デプロイメント名、APIキーを使ってAzure OpenAIクライアントを構成しました。
- ツールサポート付きの補完を取得するための `GetCompletionWithToolsAsync` メソッドを作成しました。
- 応答内のツール呼び出しを処理しました。

実際のツール処理ロジックは、ご自身のMCPサーバーのセットアップに基づいて実装することをお勧めします。

## Microsoft Foundry統合

Microsoft FoundryはAIエージェントの構築および展開のためのプラットフォームを提供します。MCPをMicrosoft Foundryと統合することで、その機能を活用しつつ、MCPの柔軟性を維持できます。

以下のコードでは、リクエストを処理し、MCPを用いてツール呼び出しを処理するAgent統合を開発しています。

### Java 実装

```java
// Java AI Foundry エージェントの統合
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
        // AI Foundry エージェントのリクエストを処理する
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // エージェントがツールの使用を要求したか確認する
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // 各ツール呼び出しを適切な MCP ツールにルーティングする
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP を使ってツールを実行する
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI Foundry 用のツールレスポンスを作成する
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // ツールレスポンスをエージェントに返送する
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

前述のコードでは以下を行いました：

- AI FoundryとMCPの両方と統合する `AIFoundryMcpBridge` クラスを作成しました。
- AI Foundryエージェントのリクエストを処理する `processAgentRequest` メソッドを実装しました。
- MCPクライアントを通じてツール呼び出しを実行し、その結果をAI Foundryエージェントに返すツール呼び出し処理を実装しました。

## MCPとAzure MLの統合

MCPをAzure Machine Learning（ML）と統合することで、Azureの強力なML機能を活用しつつ、MCPの柔軟性を保持できます。この統合はMLパイプラインの実行、モデルのツールとしての登録、計算リソースの管理に利用可能です。

### Python 実装

```python
# Python Azure AI 統合
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP クライアントを設定する
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML クライアントを設定する
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # まず MCP ツールを使って入力データを処理する
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # パイプラインを Azure ML に送信する
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
        
        # ジョブ情報を返す
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # モデルの詳細を取得する
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # デプロイメント環境を作成する
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # コンピューティングを設定する
        compute = self.ml_client.compute.get("mcp-inference")
        
        # モデルをオンラインエンドポイントとしてデプロイする
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
        
        # モデルスキーマに基づいて MCP ツールスキーマを作成する
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # モデルスキーマに基づいて入力プロパティを追加する
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP ツールとして登録する
        # 実際の実装では、エンドポイントを呼び出すツールを作成します
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

前述のコードでは以下を行いました：

- MCPとAzure MLを統合する `EnterpriseAiIntegration` クラスを作成しました。
- MCPツールを使って入力データを処理し、Azure MLにMLパイプラインを提出する `execute_ml_pipeline` メソッドを実装しました。
- Azure MLモデルをMCPツールとして登録する `register_ml_model_as_tool` メソッドを実装し、必要なデプロイメント環境と計算リソースの作成も行いました。
- ツール登録のためにAzure MLのデータ型をJSONスキーマ型にマッピングしました。
- MLパイプラインの実行やモデル登録のような長時間かかる可能性がある処理を非同期プログラミングで扱いました。

## 次に進む

- [5.2 マルチモダリティ](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->