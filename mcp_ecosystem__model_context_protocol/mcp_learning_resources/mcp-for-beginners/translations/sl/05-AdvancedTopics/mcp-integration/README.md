# Podjetniška integracija

Pri gradnji strežnikov MCP v podjetniškem okolju je pogosto potrebno integrirati obstoječe AI platforme in storitve. Ta razdelek zajema, kako integrirati MCP s podjetniškimi sistemi, kot sta Azure OpenAI in Microsoft AI Foundry, kar omogoča napredne AI zmogljivosti in orkestracijo orodij.

## Uvod

V tej lekciji se boste naučili, kako integrirati Model Context Protocol (MCP) s podjetniškimi AI sistemi, s poudarkom na Azure OpenAI in Microsoft AI Foundry. Te integracije vam omogočajo uporabo zmogljivih AI modelov in orodij ob ohranjanju prilagodljivosti in razširljivosti MCP.

## Cilji učenja

Na koncu te lekcije boste znali:

- Integrirati MCP z Azure OpenAI za uporabo njegovih AI zmogljivosti.
- Implementirati orkestracijo orodij MCP z Azure OpenAI.
- Združiti MCP z Microsoft AI Foundry za napredne zmogljivosti AI agentov.
- Izkoristiti Azure Machine Learning (ML) za izvajanje ML cevovodov in registracijo modelov kot orodij MCP.

## Integracija z Azure OpenAI

Azure OpenAI omogoča dostop do zmogljivih AI modelov, kot je GPT-4 in drugi. Integracija MCP z Azure OpenAI vam omogoča uporabo teh modelov ob ohranjanju prilagodljivosti orkestracije orodij MCP.

### Implementacija v C#

V tem odseku kode prikazujemo, kako integrirati MCP z Azure OpenAI z uporabo Azure OpenAI SDK.

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

V zgornji kodi smo:

- Konfigurirali Azure OpenAI odjemalca z naslovom, imenom namestitve in API ključem.
- Ustvarili metodo `GetCompletionWithToolsAsync` za pridobivanje dokončanj z podporo orodij.
- Obravnavali klice orodij v odgovoru.

Spodbujamo vas, da implementirate dejansko logiko obdelave orodij glede na vašo specifično nastavitev MCP strežnika.

## Integracija z Microsoft Foundry

Microsoft Foundry zagotavlja platformo za gradnjo in nameščanje AI agentov. Integracija MCP z Microsoft Foundry omogoča izkoriščanje njenih zmogljivosti ob ohranjanju prilagodljivosti MCP.

V spodnji kodi razvijamo agentno integracijo, ki obdeluje zahteve in obravnava klice orodij z uporabo MCP.

### Implementacija v Javi

```java
// Integracija Java AI Foundry agenta
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
        // Obdelava zahteve AI Foundry agenta
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Preveri, ali je agent zahteval uporabo orodij
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Za vsak klic orodja ga usmeri na ustrezno MCP orodje
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Izvedi orodje z uporabo MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Ustvari odgovor orodja za AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Pošlji odgovor orodja nazaj agentu
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

V zgornji kodi smo:

- Ustvarili razred `AIFoundryMcpBridge`, ki se integrira tako z AI Foundry kot MCP.
- Implementirali metodo `processAgentRequest`, ki obdeluje zahtevo AI Foundry agenta.
- Obravnavali klice orodij z njihovim izvajanjem prek MCP odjemalca in posredovanjem rezultatov nazaj AI Foundry agentu.

## Integracija MCP z Azure ML

Integracija MCP z Azure Machine Learning (ML) omogoča izrabo zmogljivih ML zmožnosti Azure, ob ohranjanju prilagodljivosti MCP. Ta integracija se lahko uporablja za izvajanje ML cevovodov, registracijo modelov kot orodij in upravljanje računalniških virov.

### Implementacija v Pythonu

```python
# Python integracija Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Nastavi MCP odjemalca
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Nastavi Azure ML odjemalca
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Najprej obdela vhodne podatke z MCP orodji
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Pošlji cevovod v Azure ML
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
        
        # Vrni informacije o opravilu
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Pridobi podrobnosti o modelu
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Ustvari okolje za uvajanje
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Nastavi računalniške vire
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Uvedi model kot spletno končno točko
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
        
        # Ustvari MCP orodje shemo na osnovi modelne sheme
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Dodaj vhodne lastnosti na osnovi modelne sheme
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Registriraj kot MCP orodje
        # V resnični implementaciji bi ustvarili orodje, ki kliče končno točko
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

V zgornji kodi smo:

- Ustvarili razred `EnterpriseAiIntegration`, ki povezuje MCP z Azure ML.
- Implementirali metodo `execute_ml_pipeline`, ki obdeluje vhodne podatke z uporabo orodij MCP in pošilja ML cevovod v Azure ML.
- Implementirali metodo `register_ml_model_as_tool`, ki registrira model Azure ML kot orodje MCP, vključno z ustvarjanjem potrebnega okolja za nameščanje in računalniških virov.
- Preslikali tipe podatkov Azure ML v tipe JSON sheme za registracijo orodij.
- Uporabili asinhrono programiranje za upravljanje potencialno dolgotrajnih operacij, kot sta izvedba ML cevovoda in registracija modela.

## Kaj sledi

- [5.2 Večmodalnost](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->