# Enterprise Integration

Kapag gumagawa ng MCP Servers sa konteksto ng enterprise, madalas mong kailangang isama ang mga umiiral na AI platforms at serbisyo. Tinatalakay ng seksyong ito kung paano isasama ang MCP sa mga enterprise system tulad ng Azure OpenAI at Microsoft AI Foundry, na nagpapagana ng advanced na mga kakayahan ng AI at tool orchestration.

## Panimula

Sa araling ito, matututuhan mo kung paano isama ang Model Context Protocol (MCP) sa mga enterprise AI system, na nakatuon sa Azure OpenAI at Microsoft AI Foundry. Pinapayagan ka ng mga integrasyong ito na magamit ang makapangyarihang AI models at mga tool habang pinananatili ang kakayahang umangkop at mapapalawak ng MCP.

## Mga Layunin ng Pagkatuto

Sa pagtatapos ng araling ito, magagawa mong:

- Isama ang MCP sa Azure OpenAI upang magamit ang mga kakayahan nito sa AI.
- Ipatupad ang MCP tool orchestration gamit ang Azure OpenAI.
- Pagsamahin ang MCP sa Microsoft AI Foundry para sa advanced na kakayahan ng AI agent.
- Gamitin ang Azure Machine Learning (ML) para sa pagpapatupad ng mga ML pipeline at pagrerehistro ng mga modelo bilang mga MCP tool.

## Integrasyon sa Azure OpenAI

Nagbibigay ang Azure OpenAI ng access sa makapangyarihang mga AI models tulad ng GPT-4 at iba pa. Ang pagsasama ng MCP sa Azure OpenAI ay nagpapahintulot sa iyo na gamitin ang mga modelong ito habang pinananatili ang kakayahang umangkop ng tool orchestration ng MCP.

### Pagpapatupad sa C#

Sa snippet ng code na ito, ipinapakita namin kung paano isasama ang MCP sa Azure OpenAI gamit ang Azure OpenAI SDK.

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

Sa naunang code ay:

- Nakapag-configure kami ng Azure OpenAI client gamit ang endpoint, deployment name, at API key.
- Nakagawa ng method na `GetCompletionWithToolsAsync` upang makakuha ng mga completion na may suporta sa tool.
- Hinawakan ang mga pagtawag sa tool sa response.

Hinihikayat kang ipatupad ang aktwal na lohika ng paghawak ng tool batay sa iyong specific na setup ng MCP server.

## Integrasyon sa Microsoft Foundry

Nagbibigay ang Microsoft Foundry ng plataporma para sa pagbuo at pag-deploy ng mga AI agent. Ang pagsasama ng MCP sa Microsoft Foundry ay nagpapahintulot sa iyo na gamitin ang mga kakayahan nito habang pinananatili ang kakayahang umangkop ng MCP.

Sa code sa ibaba, bumuo kami ng isang Agent integration na nagpoproseso ng mga request at humahawak ng mga pagtawag sa tool gamit ang MCP.

### Pagpapatupad sa Java

```java
// Integrasyon ng Java AI Foundry Agent
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
        // Iproseso ang kahilingan ng AI Foundry Agent
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Suriin kung humiling ang agent na gumamit ng mga tool
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Para sa bawat tawag sa tool, i-route ito sa angkop na MCP tool
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Isagawa ang tool gamit ang MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Gumawa ng tugon ng tool para sa AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Isumite ang tugon ng tool pabalik sa agent
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

Sa naunang code, ginawa namin ang sumusunod:

- Nakagawa ng isang `AIFoundryMcpBridge` class na nag-iintegrate sa parehong AI Foundry at MCP.
- Ipinatupad ang method na `processAgentRequest` na nagpoproseso ng AI Foundry agent request.
- Hinawakan ang mga pagtawag sa tool sa pamamagitan ng pagpapatupad nila gamit ang MCP client at pagsusumite ng mga resulta pabalik sa AI Foundry agent.

## Pagsasama ng MCP sa Azure ML

Ang pagsasama ng MCP sa Azure Machine Learning (ML) ay nagpapahintulot sa iyo na gamitin ang makapangyarihang mga kakayahan ng Azure ML habang pinananatili ang kakayahang umangkop ng MCP. Magagamit ang integrasyong ito para magpatupad ng mga ML pipeline, magrehistro ng mga modelo bilang mga tool, at pamahalaan ang mga compute resources.

### Pagpapatupad sa Python

```python
# Pagsasama ng Python Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # I-set up ang MCP client
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # I-set up ang Azure ML client
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Unang iproseso ang input na data gamit ang mga MCP tool
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Isumite ang pipeline sa Azure ML
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
        
        # Ibalik ang impormasyon ng job
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Kunin ang mga detalye ng modelo
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Gumawa ng deployment environment
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # I-set up ang compute
        compute = self.ml_client.compute.get("mcp-inference")
        
        # I-deploy ang modelo bilang online endpoint
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
        
        # Gumawa ng schema ng MCP tool base sa schema ng modelo
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Magdagdag ng mga input properties base sa schema ng modelo
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Irehistro bilang MCP tool
        # Sa isang tunay na implementasyon, gagawa ka ng tool na tumatawag sa endpoint
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

Sa naunang code, ginawa namin ang sumusunod:

- Nakagawa ng klase na `EnterpriseAiIntegration` na nag-iintegrate ng MCP sa Azure ML.
- Ipinatupad ang method na `execute_ml_pipeline` na nagpoproseso ng input data gamit ang mga MCP tool at nagsusumite ng ML pipeline sa Azure ML.
- Ipinatupad ang method na `register_ml_model_as_tool` na nagrerehistro ng isang Azure ML model bilang MCP tool, kabilang ang paggawa ng kinakailangang deployment environment at compute resources.
- Ini-map ang mga uri ng data ng Azure ML sa mga JSON schema type para sa pagrerehistro ng tool.
- Gumamit ng asynchronous programming upang hawakan ang mga posibleng matagal na operasyon tulad ng pagpapatupad ng ML pipeline at pagrerehistro ng modelo.

## Ano ang susunod

- [5.2 Multi modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->