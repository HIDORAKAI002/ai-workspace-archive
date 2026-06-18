# Ettevõtte integreerimine

Kui ehitate MCP servereid ettevõtte kontekstis, peate sageli integreerima olemasolevate tehisintellekti platvormide ja teenustega. See jaotis käsitleb, kuidas integreerida MCP ettevõtte süsteemidega nagu Azure OpenAI ja Microsoft AI Foundry, võimaldades täiustatud tehisintellekti võimekust ja tööriistade orkestreerimist.

## Sissejuhatus

Selles õppetükis õpite, kuidas integreerida Mudeli kontekstiprotocoli (MCP) ettevõtte tehisintellekti süsteemidega, keskendudes Azure OpenAI-le ja Microsoft AI Foundryle. Need integratsioonid võimaldavad teil kasutada võimsaid tehisintellekti mudeleid ja tööriistu, säilitades samal ajal MCP paindlikkuse ja laiendatavuse.

## Õpieesmärgid

Selle õppetüki lõpuks oskate:

- Integreerida MCP Azure OpenAI-ga, et kasutada selle tehisintellekti võimeid.
- Rakendada MCP tööriistade orkestreerimist Azure OpenAI-ga.
- Ühendada MCP Microsoft AI Foundry-ga täiustatud AI agendi võimekuse jaoks.
- Kasutada Azure Machine Learningut (ML) ML torujuhtmete täitmiseks ja mudelite registreerimiseks MCP tööriistadena.

## Azure OpenAI integratsioon

Azure OpenAI pakub ligipääsu võimsatele tehisintellekti mudelitele nagu GPT-4 ja teised. MCP integreerimine Azure OpenAI-ga võimaldab teil neid mudeleid kasutada, säilitades MCP tööriistade orkestreerimise paindlikkuse.

### C# rakendus

Selles koodilõigus demonstreerime, kuidas integreerida MCP Azure OpenAI-ga, kasutades Azure OpenAI SDK-d.

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

Ülaltoodud koodis oleme:

- Konfigureerinud Azure OpenAI kliendi lõpp-punkti, juurutuse nime ja API võtmega.
- Loonud meetodi `GetCompletionWithToolsAsync`, et saada täiendusi tööriistade toetusega.
- Töötlenud tööriistakõnesid vastuses.

Soovitame teil rakendada tegeliku tööriistakäsitluse loogika vastavalt teie konkreetsele MCP serveri seadistusele.

## Microsoft Foundry integratsioon

Microsoft Foundry pakub platvormi tehisintellekti agentide ehitamiseks ja juurutamiseks. MCP integreerimine Microsoft Foundryga võimaldab kasutada selle võimeid, säilitades samal ajal MCP paindlikkuse.

Järgmises koodis arendame välja agendi integratsiooni, mis töötleb päringuid ja käitleb tööriistakõnesid MCP abil.

### Java rakendus

```java
// Java AI Foundry agendi integratsioon
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
        // Töötle AI Foundry agendi päringut
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Kontrolli, kas agent palus tööriistu kasutada
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Iga tööriistakutse puhul suuna see sobivale MCP tööriistale
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Käivita tööriist MCP abil
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Loo tööriista vastus AI Foundry jaoks
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Esita tööriista vastus tagasi agendile
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

Ülaltoodud koodis oleme:

- Loonud `AIFoundryMcpBridge` klassi, mis integreerub nii AI Foundry kui ka MCP-ga.
- Rakendanud meetodi `processAgentRequest`, mis töötleb AI Foundry agendi päringut.
- Töötlenud tööriistakõnesid, täites neid MCP kliendi kaudu ja esitades tulemused tagasi AI Foundry agendile.

## MCP integreerimine Azure ML-iga

MCP integreerimine Azure Machine Learninguga (ML) võimaldab kasutada Azure võimsaid ML võimeid, säilitades samal ajal MCP paindlikkuse. Seda integratsiooni saab kasutada ML torujuhtmete täitmiseks, mudelite registreerimiseks tööriistadena ja arvutusressursside haldamiseks.

### Python rakendus

```python
# Python Azure AI integratsioon
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Määra MCP klient
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Määra Azure ML klient
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Töötle sisendandmeid esmalt MCP tööriistadega
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Esita töövoog Azure ML-ile
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
        
        # Tagasta töö teave
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Hangi mudeli üksikasjad
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Loo juurutuskeskkond
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Määra arvutusressursid
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Juuri mudel veebipõhisena lõpp-punktina
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
        
        # Loo MCP tööriista skeem mudeli skeemi põhjal
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Lisa sisendomadused mudeli skeemi põhjal
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Registreeri MCP tööriistana
        # Tõelises rakenduses looksid tööriista, mis kutsub lõpp-punkti
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

Ülaltoodud koodis oleme:

- Loonud `EnterpriseAiIntegration` klassi, mis integreerib MCP Azure ML-iga.
- Rakendanud `execute_ml_pipeline` meetodi, mis töötleb sisendandmeid MCP tööriistade abil ja esitab ML torujuhtme Azure ML-ile.
- Rakendanud `register_ml_model_as_tool` meetodi, mis registreerib Azure ML mudeli MCP tööriistana, sealhulgas loob vajaliku juurutuskeskkonna ja arvutusressursid.
- Kaardistanud Azure ML andmetüübid JSON skeemi tüüpideks tööriistade registreerimiseks.
- Kasutanud asünkroonset programmeerimist pikaajaliste operatsioonide, nagu ML torujuhtme täitmine ja mudeli registreerimine, käsitlemiseks.

## Mis edasi

- [5.2 Mitme modaaliga](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->