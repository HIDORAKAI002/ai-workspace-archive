# ಎಂಟರ್ಪ್ರೈಸ್ ಇಂಟಿಗ್ರೇಷನ್

ಎಂಟರ್ಪ್ರೈಸ್ ಪರಿಸರದಲ್ಲಿ MCP ಸರ್ವರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವಾಗ, ನೀವು ಇರಹೊಕ್ಕ AI ಪ್ಲ್ಯಾಟ್‌ಫಾರ್ಮ್‌ಗಳು ಮತ್ತು ಸೇವೆಗಳೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆ ಮಾಡುವ ಅಗತ್ಯವಿರುತ್ತದೆ. ಈ ವಿಭಾಗವು MCP ಅನ್ನು ಎಂಟರ್ಪ್ರೈಸ್ ವ್ಯವಸ್ಥೆಗಳೊಂದಿಗೆ ಹೇಗೆ ಸಂಯೋಜಿಸಬೇಕು ಎಂಬುದನ್ನು ವಿವರಿಸುತ್ತದೆ, ಉದಾಹರಣೆಗೆ Azure OpenAI ಮತ್ತು Microsoft AI Foundry, ಇದು ಅಭಿವೃದ್ಧಿಶೀಲ AI ಸಾಮರ್ಥ್ಯಗಳು ಮತ್ತು ಉಪಕರಣ ಸಂಯೋಜನೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.

## ಪರಿಚಯ

ಈ ಪಾಠದಲ್ಲಿ, ನೀವು Model Context Protocol (MCP) ಅನ್ನು ಎಂಟರ್ಪ್ರೈಸ್ AI ವ್ಯವಸ್ಥೆಗಳನ್ನು ಒಳಗೊಂಡಂತೆ, ವಿಶೇಷವಾಗಿ Azure OpenAI ಮತ್ತು Microsoft AI Foundry ಗಳೊಂದಿಗೆ ಹೇಗೆ ಸಂಯೋಜಿಸುವುದನ್ನು ಕಲಿಯುತ್ತೀರಿ. ಈ ಸಂಯೋಜನೆಗಳು ಶಕ್ತಿಶಾಲಿ AI ಮಾದರಿಗಳನ್ನು ಮತ್ತು ಉಪಕರಣಗಳನ್ನು ಬಳಸಲು ಅವಕಾಶ ನೀಡುತ್ತವೆ ಹಾಗು MCP ನ ಲವಚಿಕತೆ ಮತ್ತು ವಿಸ್ತರಣೆ ಸಾಮರ್ಥ್ಯವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುತ್ತವೆ.

## ಅಧ್ಯಯನ ಉದ್ದೇಶಗಳು

ಈ ಪಾಠದ ಕೊನೆಯಲ್ಲಿ, ನೀವು ಏನು ಮಾಡಬಲ್ಲಿರಿ ಎಂದು:

- MCP ಅನ್ನು Azure OpenAI ಜೊತೆಗೆ ಸಂಯೋಜಿಸಿ ಅದರ AI ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಉಪಯೋಗಿಸುವುದು.
- MCP ಉಪಕರಣ ಸಂಯೋಜನೆಯನ್ನು Azure OpenAI ಜೊತೆಗೆ ಅನುಷ್ಠಾನಗೊಳಿಸುವುದು.
- MCP ಅನ್ನು Microsoft AI Foundry ಜೊತೆ ಸಂಯೋಜಿಸಿ ಉನ್ನತ AI ಏಜೆಂಟ್ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಹೊಂದಿಸಲು.
- AI ಪೈಪ್ಲೈನ್ಗಳನ್ನು ನಡಿಸುವುದು ಮತ್ತು ಮಾದರಿಗಳನ್ನು MCP ಉಪಕರಣಗಳಾಗಿ ನೋಂದಾಯಿಸುವುದಕ್ಕಾಗಿ Azure ಮೆಷೀನ್ ಲರ್ನಿಂಗ್ (ML) ಅನ್ನು ಉಪಯೋಗಿಸುವುದು.

## Azure OpenAI ಸಂಯೋಜನೆ

Azure OpenAI ಶಕ್ತಿಶಾಲಿ AI ಮಾದರಿಗಳಾದ GPT-4 ಮತ್ತು ಇನ್ನಿತರಗಳಿಗೆ ಪ್ರವೇಶವನ್ನು ಒದಗಿಸುತ್ತದೆ. MCP ಅನ್ನು Azure OpenAI ಜೊತೆ ಸಂಯೋಜಿಸುವ ಮೂಲಕ, ನೀವು ಈ ಮಾದರಿಗಳನ್ನು ಉಪಯೋಗಿಸಬಹುದು ಮತ್ತು MCP ಯ ಉಪಕರಣ ಸಂಯೋಜನೆಯ ಲವಚಿಕತೆಯನ್ನು ಕಾಪಾಡಬಹುದು.

### C# ಅನುಷ್ಠಾನ

ಈ ಕೋಡ್ ಉದಾಹರಣೆಯಲ್ಲಿ, ನಾವು Azure OpenAI SDK ಬಳಸಿ MCP ನೊಂದಿಗೆ Azure OpenAI ಯನ್ನು ಸಂಯೋಜಿಸುವ ವಿಧಾನವನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತೇವೆ.

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

ಮುಂಬರುವ ಕೋಡಿನಲ್ಲಿ ನಾವು:

- ಎಂಡ್ಪಾಯಿಂಟ್, ಡಿಪ್ಲಾಯ್ಮೆಂಟ್ ಹೆಸರು ಮತ್ತು API ಕಿ ಬಳಸಿ Azure OpenAI ಕ್ಲೈಂಟ್ ಅನ್ನು ಸಂರಚಿಸಿದೆವು.
- ಉಪಕರಣಗಳ ಬೆಂಬಲದೊಂದಿಗೆ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಯನ್ನು ಪಡೆಯಲು `GetCompletionWithToolsAsync` ಎಂಬ ವಿಧಾನವನ್ನು ರಚಿಸಿದೆವು.
- ಪ್ರತಿಕ್ರಿಯೆಯಲ್ಲಿ ಉಪಕರಣ ಕಾೕಲ್‌ಗಳನ್ನು ಹ್ಯಾಂಡಲ್ ಮಾಡಿದೆವು.

ನೀವು ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ MCP ಸರ್ವರ್ ಸೆಟ್ಅಪ್ ಆಧರಿಸಿ ವಾಸ್ತವ ಉಪಕರಣ ನಿರ್ವಹಣಾ ಲಾಜಿಕ್ನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಲು ಪ್ರೋತ್ಸಾಹಿತರಾಗಿದ್ದೀರಿ.

## Microsoft Foundry ಸಂಯೋಜನೆ

Microsoft Foundry AI ಏಜೆಂಟ್‌ಗಳನ್ನು ನಿರ್ಮಿಸಲು ಮತ್ತು ನಿಯೋಜಿಸಲು ವೇದಿಕೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ. MCP ಅನ್ನು Microsoft Foundry ಜೊತೆಗೆ ಸಂಯೋಜಿಸುವ ಮೂಲಕ ನೀವು ಅದರ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಬಳಸಬಹುದು ಮತ್ತು MCP ಯ ಲವಚಿಕತೆಯನ್ನು ಕಾಪಾಡಬಹುದು.

ಕೆಳಗಿನ ಕೋಡ್‌ನಲ್ಲಿ, ನಾವು MCP ಬಳಸಿ ವಿನಂತಿಗಳನ್ನು ಪ್ರಕ್ರಿಯೆ ಮಾಡುವ ಮತ್ತು ಉಪಕರಣ ಕಾೕಲ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸುವ ಏಜೆಂಟ್ ಸಂಯೋಜನೆಯನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸುತ್ತೇವೆ.

### Java ಅನುಷ್ಠಾನ

```java
// ಜಾವಾ AI ಫೌಂಡ್ರಿ ಏಜೆಂಟ್ ಸಂಯೋಜನೆ
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
        // AI ಫೌಂಡ್ರಿ ಏಜೆಂಟ್ ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಿ
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // ಏಜೆಂಟ್ ಸಲಕರಣೆಗಳನ್ನು ಬಳಸಲು ಕೇಳಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸು
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // ಪ್ರತಿ ಸಲಕರಣೆ ಕರೆಗಾಗಿ, ಅದನ್ನು ಸೂಕ್ತ MCP ಸಲಕರಣೆಗೆ ಮಾರ್ಗದರ್ಶನ ಮಾಡಿ
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP ಬಳಸಿ ಸಲಕರಣೆಯನ್ನು ನಿಭಾಯಿಸಿ
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI ಫೌಂಡ್ರಿಗಾಗಿ ಸಲಕರಣೆ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ರಚಿಸಿ
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // ಸಲಕರಣೆ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಏಜೆಂಟ್‌ಗೆ ಹಿಂತಿರುಗಿಸಿ ಸಲ್ಲಿಸಿ
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

ಮುಂಬರುವ ಕೋಡಿನಲ್ಲಿ ನಾವು:

- AI Foundry ಮತ್ತು MCP ಎರಡರನ್ನೂ ಸಂಯೋಜಿಸುವ `AIFoundryMcpBridge` ಕ್ಲಾಸ್ ರಚಿಸಿದೆವು.
- AI Foundry ಏಜೆಂಟ್ ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಮಾಡುವ `processAgentRequest` ಎಂಬ ವಿಧಾನವನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿದೆವು.
- ಟೂಲ್ ಕಾೕಲ್‌ಗಳನ್ನು MCP ಕ್ಲೈಂಟ್ ಮೂಲಕ ನಡಿಸಿ, ಫಲಿತಾಂಶಗಳನ್ನು AI Foundry ಏಜೆಂಟ್‌ಗೆ ಸಮರ್ಪಿಸಿದೆವು.

## MCP ಅನ್ನು Azure ML ಜೊತೆ ಸಂಯೋಜಿಸುವುದು

MCP ಅನ್ನು Azure ಮೆಷೀನ್ ಲರ್ನಿಂಗ್ (ML) ಜೊತೆ ಸಂಯೋಜಿಸುವ ಮೂಲಕ ನೀವು Azure ಯ ಶಕ್ತಿಶಾಲಿ ML ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಉಪಯೋಗಿಸಬಹುದು ಮತ್ತು MCP ಯ ಲವಚಿಕತೆಯನ್ನು ಕಾಪಾಡಬಹುದು. ಈ ಸಂಯೋಜನೆಯು ML ಪೈಪ್ಲೈನ್ಗಳನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಲು, ಮಾದರಿಗಳನ್ನು ಉಪಕರಣಗಳಾಗಿ ನೋಂದಾಯಿಸಲು, ಮತ್ತು ಗಣನೆ ಸಂಪನ್ಮೂಲಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಬಳಸಬಹುದು.

### Python ಅನುಷ್ಠಾನ

```python
# ಪೈಥಾನ್ ಏಜುರ್ ಎಐ ಏಕೀಕರಣ
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # ಎ็มಸಿ‌పಿ ಕ್ಲೈಯಂಟ್ ಅನ್ನು ಸೆಟ್ ಅಪ್ ಮಾಡಿ
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # ಏಜುರ್ ಎಂಎಲ್ ಕ್ಲೈಯಂಟ್ ಅನ್ನು ಸೆಟ್ ಅಪ್ ಮಾಡಿ
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # ಮೊದಲಿಗೆ ಎಂಟ್ರಿ ಡೇಟಾವನ್ನು ಎ็มಸಿ‌పಿ ಸಾಧನಗಳನ್ನು ಬಳಸಿ ಪ್ರಕ್ರಿಯೆ ಮಾಡಿರಿ
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # ಪೈಪ್‌ಲೈನ್ ಅನ್ನು ಏಜುರ್ ಎಂಎಲ್ ಗೆ ಸಲ್ಲಿಸಿ
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
        
        # ಕೆಲಸದ ಮಾಹಿತಿಯನ್ನು ಹಿಂತಿರುಗಿಸಿ
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # ಮಾದರಿಯ ವಿವರಗಳನ್ನು ಪಡೆಯಿರಿ
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # ನಿಯೋಜನೆಯ ಪರಿಸರವನ್ನು ರಚಿಸಿ
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # ಕಂಪ್ಯೂಟ್ ಅನ್ನು ಸೆಟ್ ಅಪ್ ಮಾಡಿ
        compute = self.ml_client.compute.get("mcp-inference")
        
        # ಮಾದರಿಯನ್ನು ಆನ್‌ಲೈನ್ ಎಂಡ್‌ಪಾಯಿಂಟ್ ಆಗಿ ನಿಯೋಜಿಸಿ
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
        
        # ಮಾದರಿ ಸ್ಕೀಮಾ ಆಧಾರಿತ ಎ็มಸಿ‌పಿ ಸಾಧನ ಸ್ಕೀಮಾ ರಚಿಸಿ
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # ಮಾದರಿ ಸ್ಕೀಮಾದ ಆಧಾರದ ಮೇಲೆ ಇನ್ಪುಟ್ ಗುಣಲಕ್ಷಣಗಳನ್ನು ಸೇರಿಸಿ
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # ಎ็มಸಿ‌పಿ ಸಾಧನವಾಗಿ ನೋಂದಣಿ ಮಾಡಿ
        # ನಿಜವಾದ ಅನುಷ್ಠಾನದಲ್ಲಿ, ನೀವು ಎಂಡ್‌ಪಾಯಿಂಟ್ ಅನ್ನು ಕರೆಸುವ ಸಾಧನವನ್ನು ರಚಿಸುತ್ತೀರಿ
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

ಮುಂಬರುವ ಕೋಡಿನಲ್ಲಿ ನಾವು:

- MCP ಅನ್ನು Azure ML ಜೊತೆ ಸಂಯೋಜಿಸುವ `EnterpriseAiIntegration` ಎಂಬ ಕ್ಲಾಸ್ ರಚಿಸಿದೆವು.
- ಇನ್‌ಪುಟ್ ಡೇಟಾವನ್ನು MCP ಉಪಕರಣಗಳ ಮೂಲಕ ಪ್ರಕ್ರಿಯೆ ಮಾಡಿ, ML ಪೈಪ್ಲೈನ್ ಅನ್ನು Azure ML ಗೆ ಸಲ್ಲಿಸುವ `execute_ml_pipeline` ವಿಧಾನವನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿದೆವು.
- ಅಗತ್ಯವಾದ ನಿಯೋಜನಾ ಪರಿಸರ ಮತ್ತು ಗಣನೆ ಸಂಪನ್ಮೂಲಗಳನ್ನು ರಚಿಸುವ ಮೂಲಕ Azure ML ಮಾದರಿಯನ್ನು MCP ಉಪಕರಣವಾಗಿ ನೋಂದಾಯಿಸುವ `register_ml_model_as_tool` ವಿಧಾನವನ್ನು ರಚಿಸಿದೆವು.
- ಉಪಕರಣ ನೋಂದಾಯಿಸಲು Azure ML ಡೇಟಾ ಪ್ರಕಾರಗಳನ್ನು JSON ಸ್ಕೀಮಾ ಪ್ರಕಾರಗಳಿಗೆ ಮ್ಯಾಪ್ ಮಾಡಿದೆವು.
- ML ಪೈಪ್ಲೈನ್ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ ಮತ್ತು ಮಾದರಿ ನೋಂದಣೆಯಂತಹ ದೀರ್ಘಕಾಲ ಚಲಿಸುವ ಕಾರ್ಯಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಅಸಿಂಕ್ರೋನಸ್ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಬಳಸಿದೆವು.

## ಮುಂದೇನು

- [5.2 ಬಹು ಮಾದರಿತ್ವ](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->