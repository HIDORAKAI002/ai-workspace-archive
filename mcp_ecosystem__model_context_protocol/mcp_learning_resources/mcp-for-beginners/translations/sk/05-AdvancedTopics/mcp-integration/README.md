# Podniková integrácia

Pri vytváraní serverov MCP v podnikateľskom kontexte často potrebujete integrovať existujúce AI platformy a služby. Táto sekcia pokrýva, ako integrovať MCP s podnikových systémami, ako sú Azure OpenAI a Microsoft AI Foundry, čo umožňuje pokročilé AI schopnosti a organizáciu nástrojov.

## Úvod

V tejto lekcii sa naučíte, ako integrovať Model Context Protocol (MCP) s podnikmi AI systémami, so zameraním na Azure OpenAI a Microsoft AI Foundry. Tieto integrácie vám umožnia využiť silné AI modely a nástroje a zároveň zachovať flexibilitu a rozšíriteľnosť MCP.

## Ciele učenia

Na konci tejto lekcie budete schopní:

- Integrovať MCP s Azure OpenAI na využitie jeho AI možností.
- Implementovať organizáciu nástrojov MCP s Azure OpenAI.
- Kombinovať MCP s Microsoft AI Foundry pre pokročilé schopnosti AI agentov.
- Využiť Azure Machine Learning (ML) na spúšťanie ML pipelín a registráciu modelov ako nástrojov MCP.

## Integrácia Azure OpenAI

Azure OpenAI poskytuje prístup k silným AI modelom, ako je GPT-4 a ďalšie. Integrácia MCP s Azure OpenAI vám umožňuje využiť tieto modely a zároveň zachovať flexibilitu organizácie nástrojov MCP.

### Implementácia v C#

V tomto úryvku kódu demonštrujeme, ako integrovať MCP s Azure OpenAI pomocou Azure OpenAI SDK.

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

V predchádzajúcom kóde sme:

- Nakonfigurovali klienta Azure OpenAI s endpointom, názvom deployu a API kľúčom.
- Vytvorili metódu `GetCompletionWithToolsAsync` na získavanie doplnení s podporou nástrojov.
- Spracovali volania nástrojov v odpovedi.

Odporúča sa implementovať skutočnú logiku spracovania nástrojov podľa konkrétnej konfigurácie vášho MCP servera.

## Integrácia Microsoft Foundry

Microsoft Foundry poskytuje platformu na vytváranie a nasadzovanie AI agentov. Integrácia MCP s Microsoft Foundry vám umožňuje využiť jeho schopnosti a zároveň zachovať flexibilitu MCP.

V nižšie uvedenom kóde vyvíjame integráciu Agenta, ktorá spracováva požiadavky a spracováva volania nástrojov pomocou MCP.

### Implementácia v Java

```java
// Integrácia agenta Java AI Foundry
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
        // Spracovanie požiadavky agenta AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Skontrolujte, či agent požiadal o použitie nástrojov
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Pre každý volanie nástroja ho nasmerujte na príslušný nástroj MCP
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Spustite nástroj pomocou MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Vytvorte odpoveď nástroja pre AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Odoslať odpoveď nástroja späť agentovi
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

V predchádzajúcom kóde sme:

- Vytvorili triedu `AIFoundryMcpBridge`, ktorá integruje AI Foundry a MCP.
- Implementovali metódu `processAgentRequest`, ktorá spracúva požiadavky AI Foundry agenta.
- Spracovali volania nástrojov vykonaním pomocou MCP klienta a odoslaním výsledkov späť AI Foundry agentovi.

## Integrácia MCP s Azure ML

Integrácia MCP s Azure Machine Learning (ML) vám umožňuje využiť silné ML schopnosti Azure a zároveň zachovať flexibilitu MCP. Táto integrácia sa môže využiť na spúšťanie ML pipelín, registráciu modelov ako nástrojov a správu výpočtových zdrojov.

### Implementácia v Pythone

```python
# Python integrácia Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Nastaviť MCP klienta
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Nastaviť Azure ML klienta
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Najskôr spracovať vstupné údaje pomocou MCP nástrojov
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Odoslať pipeline do Azure ML
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
        
        # Vrátiť informácie o úlohe
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Získať detaily modelu
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Vytvoriť prostredie pre nasadenie
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Nastaviť výpočtové zdroje
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Nasadiť model ako online endpoint
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
        
        # Vytvoriť schému MCP nástroja na základe schémy modelu
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Pridať vstupné vlastnosti na základe schémy modelu
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Registrovať ako MCP nástroj
        # V skutočnej implementácii by ste vytvorili nástroj, ktorý volá endpoint
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

V predchádzajúcom kóde sme:

- Vytvorili triedu `EnterpriseAiIntegration`, ktorá integruje MCP s Azure ML.
- Implementovali metódu `execute_ml_pipeline`, ktorá spracováva vstupné dáta pomocou MCP nástrojov a spúšťa ML pipeline v Azure ML.
- Implementovali metódu `register_ml_model_as_tool`, ktorá registruje Azure ML model ako MCP nástroj, vrátane vytvorenia potrebného prostredia pre deployment a výpočtových zdrojov.
- Namapovali dátové typy Azure ML na JSON schémy pre registráciu nástrojov.
- Použili asynchrónne programovanie na spracovanie potenciálne dlhodobých operácií, ako je vykonávanie ML pipeline a registrácia modelu.

## Čo bude ďalej

- [5.2 Multi modalita](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->