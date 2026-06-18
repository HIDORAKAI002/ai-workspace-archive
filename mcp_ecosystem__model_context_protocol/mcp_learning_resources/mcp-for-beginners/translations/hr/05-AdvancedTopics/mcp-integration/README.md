# Integracija u poduzeću

Prilikom izgradnje MCP poslužitelja u kontekstu poduzeća, često je potrebno integrirati se s postojećim AI platformama i servisima. Ovaj odjeljak obuhvaća način integracije MCP-a s poduzećnim sustavima poput Azure OpenAI i Microsoft AI Foundry, omogućujući napredne AI mogućnosti i orkestraciju alata.

## Uvod

U ovoj lekciji naučit ćete kako integrirati Model Context Protocol (MCP) s poduzećnim AI sustavima, s fokusom na Azure OpenAI i Microsoft AI Foundry. Ove integracije omogućuju vam korištenje moćnih AI modela i alata uz zadržavanje fleksibilnosti i proširivosti MCP-a.

## Ciljevi učenja

Na kraju ove lekcije bit ćete u stanju:

- Integrirati MCP s Azure OpenAI kako biste iskoristili njegove AI mogućnosti.
- Implementirati orkestraciju MCP alata s Azure OpenAI.
- Kombinirati MCP s Microsoft AI Foundry za napredne AI agentne sposobnosti.
- Iskoristiti Azure Machine Learning (ML) za izvršavanje ML cjevovoda i registraciju modela kao MCP alata.

## Integracija s Azure OpenAI

Azure OpenAI pruža pristup moćnim AI modelima kao što su GPT-4 i drugi. Integracija MCP-a s Azure OpenAI omogućuje vam korištenje tih modela uz zadržavanje fleksibilnosti orkestracije alata MCP-a.

### Implementacija u C#

U ovom isječku koda prikazujemo kako integrirati MCP s Azure OpenAI koristeći Azure OpenAI SDK.

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

U prethodnom kodu smo:

- Konfigurirali Azure OpenAI klijenta s krajnjom točkom, imenom implementacije i API ključem.
- Kreirali metodu `GetCompletionWithToolsAsync` za dobivanje dovršetaka s podrškom za alate.
- Obradili pozive alata u odgovoru.

Potaknuti ste implementirati stvarnu logiku rukovanja alatima na temelju vaše specifične MCP server postavke.

## Integracija s Microsoft Foundry

Microsoft Foundry pruža platformu za izgradnju i implementaciju AI agenata. Integracija MCP-a s Microsoft Foundry omogućuje vam iskorištavanje njegovih sposobnosti uz zadržavanje fleksibilnosti MCP-a.

U donjem kodu razvijamo integraciju agenta koja obrađuje zahtjeve i rukuje pozivima alata koristeći MCP.

### Implementacija u Javi

```java
// Integracija Java AI Foundry Agenta
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
        // Obradite zahtjev AI Foundry Agenta
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Provjerite je li agent zatražio korištenje alata
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Za svaki poziv alata, usmjerite ga na odgovarajući MCP alat
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Izvršite alat koristeći MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Kreirajte odgovor alata za AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Pošaljite odgovor alata natrag agentu
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

U prethodnom kodu smo:

- Kreirali klasu `AIFoundryMcpBridge` koja integrira AI Foundry i MCP.
- Implementirali metodu `processAgentRequest` koja obrađuje zahtjev AI Foundry agenta.
- Rukovali pozivima alata izvršavajući ih preko MCP klijenta i vraćajući rezultate natrag AI Foundry agentu.

## Integracija MCP-a s Azure ML

Integracija MCP-a s Azure Machine Learning (ML) omogućuje vam iskorištavanje moćnih ML mogućnosti Azure-a uz zadržavanje fleksibilnosti MCP-a. Ova integracija može se koristiti za izvršavanje ML cjevovoda, registraciju modela kao alata i upravljanje računalnim resursima.

### Implementacija u Pythonu

```python
# Python Azure AI integracija
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Postavi MCP klijenta
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Postavi Azure ML klijenta
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Prvo obradi ulazne podatke koristeći MCP alate
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Pošalji pipeline na Azure ML
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
        
        # Vrati informacije o zadatku
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Dohvati detalje modela
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Kreiraj okruženje za implementaciju
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Postavi računsku snagu
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Implementiraj model kao online endpoint
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
        
        # Kreiraj MCP alat schemu temeljenu na schemi modela
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Dodaj ulazna svojstva na temelju scheme modela
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Registriraj kao MCP alat
        # U pravoj implementaciji, kreirali biste alat koji poziva endpoint
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

U prethodnom kodu smo:

- Kreirali klasu `EnterpriseAiIntegration` koja integrira MCP s Azure ML.
- Implementirali metodu `execute_ml_pipeline` koja obrađuje ulazne podatke koristeći MCP alate i šalje ML cjevovod u Azure ML.
- Implementirali metodu `register_ml_model_as_tool` koja registrira Azure ML model kao MCP alat, uključujući stvaranje potrebnog okruženja za implementaciju i računalnih resursa.
- Mapirali Azure ML vrste podataka na JSON sheme za registraciju alata.
- Koristili asinhrono programiranje za upravljanje potencijalno dugotrajnim radnjama poput izvršavanja ML cjevovoda i registracije modela.

## Što je sljedeće

- [5.2 Multimodalnost](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->