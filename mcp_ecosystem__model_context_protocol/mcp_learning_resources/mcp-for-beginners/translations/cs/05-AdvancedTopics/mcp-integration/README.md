# Podniková integrace

Při výstavbě MCP serverů v podnikovém kontextu často potřebujete integrovat existující AI platformy a služby. Tato sekce popisuje, jak integrovat MCP s podnikovými systémy jako Azure OpenAI a Microsoft AI Foundry, což umožňuje pokročilé AI funkce a orchestraci nástrojů.

## Úvod

V této lekci se naučíte, jak integrovat Model Context Protocol (MCP) s podnikovýma AI systémy se zaměřením na Azure OpenAI a Microsoft AI Foundry. Tyto integrace vám umožní využívat výkonné AI modely a nástroje při zachování flexibility a rozšiřitelnosti MCP.

## Cíle učení

Na konci této lekce budete schopni:

- Integrovat MCP s Azure OpenAI pro využití jeho AI schopností.
- Implementovat orchestraci nástrojů MCP s Azure OpenAI.
- Kombinovat MCP s Microsoft AI Foundry pro pokročilé schopnosti AI agentů.
- Využít Azure Machine Learning (ML) pro spouštění ML pipeline a registraci modelů jako nástrojů MCP.

## Integrace Azure OpenAI

Azure OpenAI poskytuje přístup k výkonným AI modelům jako GPT-4 a další. Integrace MCP s Azure OpenAI vám umožní využít tyto modely při zachování flexibility orchestraci nástrojů MCP.

### Implementace v C#

V tomto ukázkovém kódu demonstrujeme, jak integrovat MCP s Azure OpenAI pomocí Azure OpenAI SDK.

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

V předchozím kódu jsme:

- Nakonfigurovali klienta Azure OpenAI s endpointem, názvem nasazení a API klíčem.
- Vytvořili metodu `GetCompletionWithToolsAsync` pro získání dokončení s podporou nástrojů.
- Zpracovali volání nástrojů v odpovědi.

Doporučujeme implementovat vlastní logiku zpracování nástrojů podle konkrétního nastavení vašeho MCP serveru.

## Integrace Microsoft Foundry

Microsoft Foundry nabízí platformu pro tvorbu a nasazení AI agentů. Integrace MCP s Microsoft Foundry umožňuje využít jeho schopnosti při zachování flexibility MCP.

V níže uvedeném kódu vytváříme integraci agenta, který zpracovává požadavky a ovládá volání nástrojů pomocí MCP.

### Implementace v Javě

```java
// Integrace agenta Java AI Foundry
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
        // Zpracujte požadavek agenta AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Zkontrolujte, zda agent požádal o použití nástrojů
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Pro každý volání nástroje ho přesměrujte na odpovídající nástroj MCP
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Spusťte nástroj pomocí MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Vytvořte odpověď nástroje pro AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Odešlete odpověď nástroje zpět agentovi
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

V předchozím kódu jsme:

- Vytvořili třídu `AIFoundryMcpBridge`, která integruje AI Foundry a MCP.
- Implementovali metodu `processAgentRequest`, která zpracovává požadavek AI Foundry agenta.
- Zpracovali volání nástrojů jejich spuštěním přes MCP klienta a odesláním výsledků zpět AI Foundry agentovi.

## Integrace MCP s Azure ML

Integrace MCP s Azure Machine Learning (ML) umožňuje využít výkonné ML schopnosti Azure při zachování flexibility MCP. Tato integrace může být použita ke spouštění ML pipeline, registraci modelů jako nástrojů a správě výpočetních zdrojů.

### Implementace v Pythonu

```python
# Integrace Python Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Nastavit klienta MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Nastavit klienta Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Nejprve zpracujte vstupní data pomocí nástrojů MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Odešlete pipeline do Azure ML
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
        
        # Vrátit informace o úloze
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Získat podrobnosti o modelu
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Vytvořit nasazovací prostředí
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Nastavit výpočetní zdroje
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Nasadit model jako online endpoint
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
        
        # Vytvořit schéma nástroje MCP na základě schématu modelu
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Přidat vstupní vlastnosti na základě schématu modelu
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Registrovat jako nástroj MCP
        # V reálné implementaci byste vytvořili nástroj, který volá endpoint
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

V předchozím kódu jsme:

- Vytvořili třídu `EnterpriseAiIntegration`, která integruje MCP s Azure ML.
- Implementovali metodu `execute_ml_pipeline`, která zpracovává vstupní data pomocí nástrojů MCP a spouští ML pipeline v Azure ML.
- Implementovali metodu `register_ml_model_as_tool`, která registruje model Azure ML jako nástroj MCP, včetně vytvoření potřebného prostředí pro nasazení a výpočetních zdrojů.
- Namapovali datové typy Azure ML na JSON schéma pro registraci nástroje.
- Použili asynchronní programování k řešení potenciálně dlouhotrvajících operací jako je spouštění ML pipeline a registrace modelu.

## Co dál

- [5.2 Multi modalita](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->