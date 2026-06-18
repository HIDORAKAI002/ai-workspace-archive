# ਐਂਟਰਪ੍ਰਾਈਜ਼ ਇੰਟਿਗ੍ਰੇਸ਼ਨ

ਐਂਟਰਪ੍ਰਾਈਜ਼ ਸੰਦਰਭ ਵਿੱਚ MCP ਸਰਵਰ ਬਣਾਉਂਦੇ ਸਮੇਂ, ਤੁਹਾਨੂੰ ਅਕਸਰ ਮੌਜੂਦਾ AI ਪਲੇਟਫਾਰਮਾਂ ਅਤੇ ਸੇਵਾਵਾਂ ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਨ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ। ਇਹ ਭਾਗ ਕਵਰਨ ਕਰਦਾ ਹੈ ਕਿ ਕਿਵੇਂ MCP ਨੂੰ ਐਂਟਰਪ੍ਰਾਈਜ਼ ਸਿਸਟਮਾਂ ਜਿਵੇਂ ਕਿ Azure OpenAI ਅਤੇ Microsoft AI Foundry ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਨਾ ਹੈ, ਜਿਸ ਨਾਲ ਉੱਚ ਸਤਰ ਦੀ AI ਸਮਰੱਥਾ ਅਤੇ ਟੂਲ ਸੰਗਠਨ ਸੰਭਵ ਹੁੰਦੀ ਹੈ।

## ਜਾਣੂ

ਇਸ ਪਾਠ ਵਿੱਚ, ਤੁਸੀਂ ਸਿੱਖੋਗੇ ਕਿ ਕਿਵੇਂ ਮਾਡਲ ਕਾਨਟੈਕਸਟ ਪ੍ਰੋਟੋਕੋਲ (MCP) ਨੂੰ ਐਂਟਰਪ੍ਰਾਈਜ਼ AI ਸਿਸਟਮਾਂ ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਨਾ ਹੈ, ਖਾਸ ਕਰਕੇ Azure OpenAI ਅਤੇ Microsoft AI Foundry ਨਾਲ। ਇਹ ਇੰਟਿਗ੍ਰੇਸ਼ਨ ਤੁਹਾਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ AI ਮਾਡਲਾਂ ਅਤੇ ਟੂਲਾਂ ਦਾ ફાયદਾ ਲੈਣ ਦਾ ਮੌਕਾ ਦਿੰਦੇ ਹਨ ਜਦਕਿ MCP ਦੀ ਲਚੀਲਾਪਨ ਅਤੇ ਵਿਸਥਾਰਯੋਗਤਾ ਬਰਕਰਾਰ ਰਹਿੰਦੀ ਹੈ।

## ਸਿੱਖਣ ਦੇ ਲੱਖੜੀ

ਇਸ ਪਾਠ ਦੇ ਅੰਤ ਤੱਕ, ਤੁਸੀਂ ਸਮਰੱਥ ਹੋਵੋਗੇ:

- MCP ਨੂੰ Azure OpenAI ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਕੇ ਇਸ ਦੀ AI ਸਮਰੱਥਾਵਾਂ ਦਾ ਵਰਤੋਂ ਕਰਨ ਲਈ।
- MCP ਟੂਲ ਸੰਗਠਨ ਨੂੰ Azure OpenAI ਨਾਲ ਲਾਗੂ ਕਰਨ ਲਈ।
- MCP ਨੂੰ Microsoft AI Foundry ਨਾਲ ਜੋੜਕੇ ਉੱਚ ਸਤਰ ਦੇ AI ਏਜੰਟ ਸਮਰੱਥਾਵਾਂ ਲਈ।
- Azure ਮਸ਼ੀਨ ਲਰਨਿੰਗ (ML) ਨੂੰ ਇਸਤੇਮਾਲ ਕਰਕੇ ML ਪਾਈਪਲਾਈਨ ਚਲਾਉਣ ਅਤੇ ਮਾਡਲਾਂ ਨੂੰ MCP ਟੂਲਾਂ ਵਜੋਂ ਦਰਜ ਕਰਨ ਲਈ।

## Azure OpenAI ਇੰਟਿਗ੍ਰੇਸ਼ਨ

Azure OpenAI ਸ਼ਕਤੀਸ਼ਾਲੀ AI ਮਾਡਲਾਂ ਜਿਵੇਂ GPT-4 ਅਤੇ ਹੋਰਾਂ ਤੱਕ ਪਹੁੰਚ ਦਿੰਦਾ ਹੈ। MCP ਨੂੰ Azure OpenAI ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਕੇ ਤੁਸੀਂ ਇਹ ਮਾਡਲ ਵਰਤ ਸਕਦੇ ਹੋ ਜਦਕਿ MCP ਦੀ ਟੂਲ ਸੰਗਠਨ ਦੀ ਲਚੀਲਾਪਨ ਬਰਕਰਾਰ ਰਹਿੰਦੀ ਹੈ।

### C# ਇਮਪਲੀਮੇਟੇਸ਼ਨ

ਇਸ ਕੋਡ ਸਨੇਪਸ਼ਾਟ ਵਿੱਚ, ਅਸੀਂ ਦਿਖਾਉਂਦੇ ਹਾਂ ਕਿ ਕਿਵੇਂ MCP ਨੂੰ Azure OpenAI SDK ਦੀ ਵਰਤੋਂ ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਨਾ ਹੈ।

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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- Azure OpenAI ਕਲਾਇੰਟ ਨੂੰ ਐਂਡਪੋਇੰਟ, ਡਿਪਲੋਇਮੈਂਟ ਨਾਮ ਅਤੇ API ਕੁੰਜੀ ਨਾਲ ਸੰਰਚਿਤ ਕੀਤਾ।
- `GetCompletionWithToolsAsync` ਮੈਥਡ ਬਣਾਈ ਜੋ ਟੂਲ ਸਹਾਇਤਾ ਨਾਲ ਕਮਪਲੀਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ।
- ਜਵਾਬ ਵਿੱਚ ਟੂਲ ਕਾਲਾਂ ਨੂੰ ਸੰਭਾਲਿਆ।

ਤੁਹਾਨੂੰ ਆਪਣੇ ਵਿਸ਼ੇਸ਼ MCP ਸਰਵਰ ਸੈੱਟਅਪ ਦੇ ਅਨੁਸਾਰ ਅਸਲ ਟੂਲ ਸੰਭਾਲਣ ਦੀ ਤਰਕੀਬ ਲਾਗੂ ਕਰਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

## ਮਾਈਕ੍ਰੋਸਾਫਟ ਫਾਉਂਡਰੀ ਇੰਟਿਗ੍ਰੇਸ਼ਨ

Microsoft Foundry AI ਏਜੰਟ ਬਣਾਉਣ ਅਤੇ ਤੈਨਾਤ ਕਰਨ ਲਈ ਪਲੇਟਫਾਰਮ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। MCP ਨੂੰ Microsoft Foundry ਨਾਲ ਜੋੜ ਕੇ ਤੁਸੀਂ ਇਸ ਦੀ ਸਮਰੱਥਾਵਾਂ ਦਾ લાભ ਲੈ ਸਕਦੇ ਹੋ ਜਦਕਿ MCP ਦੀ ਲਚੀਲਾਪਨ ਬਰਕਰਾਰ ਰਹਿੰਦੀ ਹੈ।

ਹੇਠਾਂ ਦਿੱਤੇ ਕੋਡ ਵਿੱਚ, ਅਸੀਂ ਇੱਕ ਏਜੰਟ ਇੰਟਿਗ੍ਰੇਸ਼ਨ ਤਿਆਰ ਕਰਦੇ ਹਾਂ ਜੋ MCP ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਬੇਨਤੀਆਂ ਨੂੰ ਪ੍ਰਕਿਰਿਆ ਕਰਦਾ ਹੈ ਅਤੇ ਟੂਲ ਕਾਲਾਂ ਨੂੰ ਸੰਭਾਲਦਾ ਹੈ।

### ਜਾਵਾ ਇਮਪਲੀਮੇਟੇਸ਼ਨ

```java
// ਜਾਵਾ ਏਆਈ ਫਾਊਂਡਰੀ ਏਜੇੰਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ
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
        // ਏਆਈ ਫਾਊਂਡਰੀ ਏਜੇੰਟ ਬੇਨਤੀ ਨੂੰ ਪ੍ਰਕਿਰਿਆ ਕਰੋ
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // ਜाँचੋ ਕਿ ਏਜੇੰਟ ਨੇ ਟੂਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰਨ ਦੀ ਬੇਨਤੀ ਕੀਤੀ ਹੈ
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // ਹਰ ਟੂਲ ਕਾਲ ਲਈ, ਇਸਨੂੰ ਉਚਿਤ MCP ਟੂਲ ਵੱਲ ਰਾਹਦਾਰੀ ਕਰੋ
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP ਦਾ ਉਪਯੋਗ ਕਰਕੇ ਟੂਲ ਚਲਾਓ
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // ਏਆਈ ਫਾਊਂਡਰੀ ਲਈ ਟੂਲ ਪ੍ਰਤਿਕਿਰਿਆ ਬਣਾਓ
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // ਟੂਲ ਪ੍ਰਤਿਕਿਰਿਆ ਨੂੰ ਵਾਪਸ ਏਜੇੰਟ ਨੂੰ ਭੇਜੋ
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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- `AIFoundryMcpBridge` ਕਲਾਸ ਬਣਾਈ ਜੋ AI Foundry ਅਤੇ MCP ਦੋਹਾਂ ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਹੁੰਦੀ ਹੈ।
- `processAgentRequest` ਮੈਥਡ ਲਾਗੂ ਕੀਤਾ ਜੋ AI Foundry ਏਜੰਟ ਬੇਨਤੀ ਨੂੰ ਸਾਂਭਦਾ ਹੈ।
- MCP ਕਲਾਇੰਟ ਰਾਹੀਂ ਟੂਲ ਕਾਲਾਂ ਨੂੰ ਚਲਾ ਕੇ ਫਲਫਲਾਂ ਨੂੰ ਵਾਪਸ AI Foundry ਏਜੰਟ ਨੂੰ ਭੇਜਣ ਦਾ ਕੰਮ ਕੀਤਾ।

## MCP ਨੂੰ Azure ML ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਨਾ

MCP ਨੂੰ Azure ਮਸ਼ੀਨ ਲਰਨਿੰਗ (ML) ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਕੇ ਤੁਸੀਂ Azure ਦੀ ਸ਼ਕਤੀਸ਼ਾਲੀ ML ਸਮਰੱਥਾ ਦਾ ਫਾਇਦਾ ਲੈ ਸਕਦੇ ਹੋ ਜਦਕਿ MCP ਦੀ ਲਚੀਲਾਪਨ ਨੂੰ ਬਰਕਰਾਰ ਰੱਖਿਆ ਜਾ ਸਕਦਾ ਹੈ। ਇਸ ਇੰਟਿਗ੍ਰੇਸ਼ਨ ਦਾ ਇਸਤੇਮਾਲ ML ਪਾਈਪਲਾਈਨਾਂ ਨੂੰ ਚਲਾਉਣ, ਮਾਡਲਾਂ ਨੂੰ ਟੂਲ ਵਜੋਂ ਦਰਜ ਕਰਨ ਅਤੇ ਕੰਪਿਊਟ ਰਿਸੋਰਸਜ਼ ਦਾ ਪ੍ਰਬੰਧ ਕਰਨ ਲਈ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।

### ਪਾਇਥਨ ਇਮਪਲੀਮੇਟੇਸ਼ਨ

```python
# ਪਾਇਥਨ ਅਜ਼ੂਰ ਏਆਈ ਏਕਤੀਕਰਨ
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP ਕਲਾਇੰਟ ਸੈੱਟ ਅੱਪ ਕਰੋ
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # ਅਜ਼ੂਰ ਐਮਐਲ ਕਲਾਇੰਟ ਸੈੱਟ ਅੱਪ ਕਰੋ
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # ਪਹਿਲਾਂ ਮੂਲ ਡਾਟਾ MCP ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਪ੍ਰਕਿਰਿਆ ਕਰੋ
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # ਪਾਈਪਲਾਈਨ ਨੂੰ ਅਜ਼ੂਰ ਐਮਐਲ ਵਿੱਚ ਭੇਜੋ
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
        
        # ਨੌਕਰੀ ਜਾਣਕਾਰੀ ਵਾਪਸ ਕਰੋ
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # ਮਾਡਲ ਵੇਰਵੇ ਪ੍ਰਾਪਤ ਕਰੋ
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # ਤੈਅ ਕਰਨ ਵਾਲਾ ਮਾਹੌਲ ਬਣਾਓ
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # ਗਣਨਾ ਸੈੱਟ ਕਰੋ
        compute = self.ml_client.compute.get("mcp-inference")
        
        # ਮਾਡਲ ਨੂੰ ਆਨਲਾਈਨ ਏਂਡਪੌਇੰਟ ਵਜੋਂ ਤਨਾਖ਼ਾ ਕਰੋ
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
        
        # ਮਾਡਲ ਸਕੀਮਾ ਦੇ ਆਧਾਰ 'ਤੇ MCP ਟੂਲ ਸਕੀਮਾ ਬਣਾਓ
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # ਮਾਡਲ ਸਕੀਮਾ ਦੇ ਆਧਾਰ 'ਤੇ ਇਨਪੁੱਟ ਗੁਣ ਜੋੜੋ
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP ਟੂਲ ਵਜੋਂ ਦਰਜ ਕਰੋ
        # ਇੱਕ ਅਸਲੀ ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ ਵਿੱਚ, ਤੁਸੀਂ ਇੱਕ ਟੂਲ ਬਣਾਉਂਦੇ ਜੋ ਏਂਡਪੌਇੰਟ ਨੂੰ ਕਾਲ ਕਰਦਾ ਹੈ
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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- `EnterpriseAiIntegration` ਕਲਾਸ ਬਣਾਈ ਜੋ MCP ਨੂੰ Azure ML ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਦੀ ਹੈ।
- `execute_ml_pipeline` ਮੈਥਡ ਲਾਗੂ ਕੀਤਾ ਜੋ MCP ਟੂਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇਨਪੁੱਟ ਡਾਟਾ ਪ੍ਰਕਿਰਿਆ ਕਰਦਾ ਹੈ ਅਤੇ Azure ML ਨੂੰ ML ਪਾਈਪਲਾਈਨ ਦਰਜ ਕਰਾਉਂਦਾ ਹੈ।
- `register_ml_model_as_tool` ਮੈਥਡ ਲਾਗੂ ਕੀਤਾ ਜੋ ਇੱਕ Azure ML ਮਾਡਲ ਨੂੰ MCP ਟੂਲ ਵਜੋਂ ਦਰਜ ਕਰਦਾ ਹੈ, ਜਿਸ ਵਿੱਚ ਜਰੂਰੀ ਡਿਪਲੋਇਮੈਂਟ ਪਰੀਬੇਸ਼ ਅਤੇ ਕੰਪਿਊਟ ਸਾਦਨਾਂ ਬਣਾਉਣਾ ਸ਼ਾਮਿਲ ਹੈ।
- ਟੂਲ ਦਰਜ ਕਰਨ ਲਈ Azure ML ਡਾਟਾ ਕਿਸਮਾਂ ਨੂੰ JSON ਸਕੀਮਾ ਕਿਸਮਾਂ ਨਾਲ ਮੈਪ ਕੀਤਾ।
- ਲੰਬੇ ਸਮੇਂ ਚੱਲ ਸਕਦੇ ਕਾਰਜ ਜਿਵੇਂ ML ਪਾਈਪਲਾਈਨ ਚਲਾਉਣ ਅਤੇ ਮਾਡਲ ਦਰਜ ਕਰਨ ਲਈ ਏਸਿੰਕ੍ਰੋਨਸ ਪ੍ਰੋਗਰਾਮਿੰਗ ਦੀ ਵਰਤੋਂ ਕੀਤੀ।

## ਹੁਣ ਹੋਰ ਕੀ

- [5.2 ਮਲਟੀ ਮੋਡੈਲਿਟੀ](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->