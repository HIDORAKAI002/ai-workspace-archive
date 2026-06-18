# Integrazione Enterprise

Quando si costruiscono server MCP in un contesto aziendale, spesso è necessario integrare con piattaforme e servizi di intelligenza artificiale esistenti. Questa sezione spiega come integrare MCP con sistemi aziendali come Azure OpenAI e Microsoft AI Foundry, abilitando funzionalità avanzate di AI e orchestrazione degli strumenti.

## Introduzione

In questa lezione, imparerai come integrare il Model Context Protocol (MCP) con sistemi aziendali di IA, concentrandoti su Azure OpenAI e Microsoft AI Foundry. Queste integrazioni ti permettono di sfruttare potenti modelli e strumenti di IA mantenendo la flessibilità e l’estensibilità di MCP.

## Obiettivi di apprendimento

Al termine di questa lezione, sarai in grado di:

- Integrare MCP con Azure OpenAI per utilizzare le sue capacità di IA.
- Implementare l’orchestrazione degli strumenti MCP con Azure OpenAI.
- Combinare MCP con Microsoft AI Foundry per capacità avanzate di agenti IA.
- Sfruttare Azure Machine Learning (ML) per eseguire pipeline ML e registrare modelli come strumenti MCP.

## Integrazione Azure OpenAI

Azure OpenAI offre accesso a potenti modelli di intelligenza artificiale come GPT-4 e altri. Integrare MCP con Azure OpenAI consente di utilizzare questi modelli mantenendo la flessibilità dell’orchestrazione degli strumenti di MCP.

### Implementazione in C#

In questo snippet di codice, dimostriamo come integrare MCP con Azure OpenAI utilizzando l’SDK Azure OpenAI.

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
  
Nel codice precedente abbiamo:

- Configurato il client Azure OpenAI con l’endpoint, il nome del deployment e la chiave API.  
- Creato un metodo `GetCompletionWithToolsAsync` per ottenere completamenti con supporto agli strumenti.  
- Gestito le chiamate agli strumenti nella risposta.

Ti invitiamo a implementare la logica effettiva di gestione degli strumenti in base alla configurazione specifica del tuo server MCP.

## Integrazione Microsoft Foundry

Microsoft Foundry offre una piattaforma per costruire e distribuire agenti di intelligenza artificiale. Integrare MCP con Microsoft Foundry consente di sfruttarne le capacità mantenendo la flessibilità di MCP.

Nel codice sottostante, sviluppiamo un’integrazione Agent che processa richieste e gestisce chiamate agli strumenti usando MCP.

### Implementazione in Java

```java
// Integrazione Agente AI Foundry Java
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
        // Elabora la richiesta dell'agente AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Controlla se l'agente ha richiesto di usare strumenti
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Per ogni chiamata allo strumento, indirizzala allo strumento MCP appropriato
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Esegui lo strumento usando MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Crea la risposta dello strumento per AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Invia la risposta dello strumento all'agente
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
  
Nel codice precedente abbiamo:

- Creato una classe `AIFoundryMcpBridge` che integra sia AI Foundry che MCP.  
- Implementato un metodo `processAgentRequest` che elabora una richiesta di un agente AI Foundry.  
- Gestito le chiamate agli strumenti eseguendole tramite il client MCP e inviando i risultati indietro all’agente AI Foundry.

## Integrare MCP con Azure ML

Integrare MCP con Azure Machine Learning (ML) consente di sfruttare le potenti capacità di ML di Azure pur mantenendo la flessibilità di MCP. Questa integrazione può essere usata per eseguire pipeline ML, registrare modelli come strumenti e gestire risorse di calcolo.

### Implementazione in Python

```python
# Integrazione Python Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Configura il client MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Configura il client Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Prima elabora i dati di input usando gli strumenti MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Invia la pipeline ad Azure ML
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
        
        # Restituisci informazioni sul lavoro
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Ottieni dettagli del modello
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Crea l'ambiente di distribuzione
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Configura il calcolo
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Distribuisci il modello come endpoint online
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
        
        # Crea lo schema dello strumento MCP basato sullo schema del modello
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Aggiungi proprietà di input basate sullo schema del modello
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Registra come strumento MCP
        # In una implementazione reale, creeresti uno strumento che chiama l'endpoint
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
  
Nel codice precedente abbiamo:

- Creato una classe `EnterpriseAiIntegration` che integra MCP con Azure ML.  
- Implementato un metodo `execute_ml_pipeline` che elabora dati di input usando strumenti MCP e invia una pipeline ML ad Azure ML.  
- Implementato un metodo `register_ml_model_as_tool` che registra un modello Azure ML come strumento MCP, includendo la creazione dell’ambiente di deployment e delle risorse di calcolo necessarie.  
- Mappato i tipi di dati Azure ML ai tipi schema JSON per la registrazione degli strumenti.  
- Usato la programmazione asincrona per gestire operazioni potenzialmente di lunga durata come l’esecuzione di pipeline ML e la registrazione di modelli.

## Cosa vedremo dopo

- [5.2 Multi modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->