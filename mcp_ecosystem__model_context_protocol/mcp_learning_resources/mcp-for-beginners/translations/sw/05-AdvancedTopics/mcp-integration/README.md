# Muunganiko wa Biashara

Unapo jenga seva za MCP katika muktadha wa biashara, mara nyingi unahitaji kuunganisha na majukwaa na huduma za AI zilizopo. Sehemu hii inaelezea jinsi ya kuunganisha MCP na mifumo ya biashara kama Azure OpenAI na Microsoft AI Foundry, kuwezesha uwezo wa hali ya juu wa AI na upangaji wa zana.

## Utangulizi

Katika somo hili, utajifunza jinsi ya kuunganisha Model Context Protocol (MCP) na mifumo ya AI ya biashara, ukizingatia Azure OpenAI na Microsoft AI Foundry. Muunganiko huu unakuwezesha kutumia mifano yenye nguvu ya AI na zana huku ukidumisha unyumbufu na uwezo wa kupanua wa MCP.

## Malengo ya Kujifunza

Mwisho wa somo hili, utaweza:

- Kuunganisha MCP na Azure OpenAI kutumia uwezo wake wa AI.
- Kutekeleza upangaji wa zana za MCP na Azure OpenAI.
- Kuchanganya MCP na Microsoft AI Foundry kwa uwezo wa mawakala wa AI wa hali ya juu.
- Kutumia Azure Machine Learning (ML) kwa ajili ya kutekeleza mizunguko ya ML na kusajili mifano kama zana za MCP.

## Muunganiko wa Azure OpenAI

Azure OpenAI huwapa watumiaji vifaa vya AI vyenye nguvu kama GPT-4 na vinginevyo. Kuunganisha MCP na Azure OpenAI kunakuwezesha kutumia mifano hii huku ukidumisha unyumbufu wa upangaji wa zana za MCP.

### Utekelezaji wa C#

Katika kipande hiki cha msimbo, tunaonyesha jinsi ya kuunganisha MCP na Azure OpenAI kwa kutumia Azure OpenAI SDK.

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

Katika msimbo ulio hapo juu tume:

- Kuandaa mteja wa Azure OpenAI na kiunganishi, jina la uenezaji na API key.
- Kutengeneza njia `GetCompletionWithToolsAsync` kupata matokeo kwa msaada wa zana.
- Kushughulikia simu za zana katika jibu.

Unashauriwa kutekeleza mantiki halisi ya kushughulikia zana kulingana na usanidi wako maalum wa seva ya MCP.

## Muunganiko wa Microsoft Foundry

Microsoft Foundry hutoa jukwaa la kuunda na kusambaza mawakala wa AI. Kuunganisha MCP na Microsoft Foundry kunakuwezesha kutumia uwezo wake huku ukidumisha unyumbufu wa MCP.

Katika msimbo uliopo hapa chini, tunaendeleza muunganiko wa Mwakala ambao hushughulikia maombi na simu za zana kwa kutumia MCP.

### Utekelezaji wa Java

```java
// Muunganisho wa Wakala wa Java AI Foundry
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
        // Endesha ombi la Wakala wa AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Angalia kama wakala alitaka kutumia zana
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Kwa kila simu ya zana, panga kwa zana sahihi ya MCP
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Tekeleza zana kwa kutumia MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Unda jibu la zana kwa AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Tuma jibu la zana kurudi kwa wakala
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

Katika msimbo ulio hapo juu, tume:

- Kutengeneza darasa `AIFoundryMcpBridge` linalounganisha na AI Foundry pamoja na MCP.
- Kutekeleza njia `processAgentRequest` inayoshughulikia ombi la wakala wa AI Foundry.
- Kushughulikia simu za zana kwa kuzitekeleza kupitia mteja wa MCP na kurudisha matokeo kwa wakala wa AI Foundry.

## Kuunganisha MCP na Azure ML

Kuunganisha MCP na Azure Machine Learning (ML) kunakuwezesha kutumia uwezo mzito wa ML wa Azure huku ukidumisha unyumbufu wa MCP. Muunganiko huu unaweza kutumika kutekeleza mizunguko ya ML, kusajili mifano kama zana, na kusimamia rasilimali za kompyuta.

### Utekelezaji wa Python

```python
# Muunganiko wa Python Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Weka mteja wa MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Weka mteja wa Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Kwanza chakata data ya ingizo kwa kutumia zana za MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Wasilisha mchakato wa pipeline kwenye Azure ML
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
        
        # Rejea taarifa za kazi
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Pata maelezo ya mfano
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Unda mazingira ya usambazaji
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Weka hesabu
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Sambaza mfano kama hatua ya mtandao
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
        
        # Unda mpangilio wa zana ya MCP kulingana na mpangilio wa mfano
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Ongeza mali za ingizo kulingana na mpangilio wa mfano
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Sajili kama zana ya MCP
        # Katika utekelezaji halisi, ungefanya zana inayopiga simu kwa hatua hiyo
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

Katika msimbo ulio hapo juu, tume:

- Kutengeneza darasa `EnterpriseAiIntegration` linalounganisha MCP na Azure ML.
- Kutekeleza njia `execute_ml_pipeline` inayoshughulikia data ya kuingiza kwa kutumia zana za MCP na kuwasilisha mzunguko wa ML kwa Azure ML.
- Kutekeleza njia `register_ml_model_as_tool` inayosajili mfano wa Azure ML kama zana ya MCP, ikiwa ni pamoja na kuunda mazingira ya uenezaji yanayohitajika na rasilimali za kompyuta.
- Kurejelea aina za data za Azure ML kwa aina za schema za JSON kwa ajili ya usajili wa zana.
- Kutumia programu ya asynchronous kushughulikia shughuli zinazoweza kuchukua muda mrefu kama utekelezaji wa mizunguko ya ML na usajili wa mifano.

## Nini kinachofuata

- [5.2 Multi modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->