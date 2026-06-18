# Enterprise-integrasjon

Når man bygger MCP-servere i en bedriftskontekst, trenger man ofte å integrere med eksisterende AI-plattformer og -tjenester. Denne seksjonen dekker hvordan man integrerer MCP med bedriftsystemer som Azure OpenAI og Microsoft AI Foundry, som muliggjør avanserte AI-funksjoner og verktørovervåkning.

## Introduksjon

I denne leksjonen lærer du hvordan du integrerer Model Context Protocol (MCP) med bedrifts-AI-systemer, med fokus på Azure OpenAI og Microsoft AI Foundry. Disse integrasjonene lar deg utnytte kraftige AI-modeller og verktøy samtidig som du beholder fleksibiliteten og utvidbarheten til MCP.

## Læringsmål

Ved slutten av denne leksjonen vil du kunne:

- Integrere MCP med Azure OpenAI for å bruke dets AI-funksjoner.
- Implementere MCP-verktørovervåkning med Azure OpenAI.
- Kombinere MCP med Microsoft AI Foundry for avanserte AI-agentfunksjoner.
- Utnytte Azure Machine Learning (ML) for å kjøre ML-pipelines og registrere modeller som MCP-verktøy.

## Azure OpenAI-integrasjon

Azure OpenAI gir tilgang til kraftige AI-modeller som GPT-4 og andre. Å integrere MCP med Azure OpenAI lar deg bruke disse modellene samtidig som du bevarer fleksibiliteten til MCPs verktørovervåkning.

### C#-implementasjon

I denne kodeeksemplet viser vi hvordan du integrerer MCP med Azure OpenAI ved bruk av Azure OpenAI SDK.

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

I koden ovenfor har vi:

- Konfigurert Azure OpenAI-klienten med endepunkt, distribusjonsnavn og API-nøkkel.
- Opprettet en metode `GetCompletionWithToolsAsync` for å hente fullføringer med verktøystøtte.
- Håndtert verktøykall i responsen.

Du oppfordres til å implementere den faktiske logikken for verktøyhåndtering basert på din spesifikke MCP-serveroppsett.

## Microsoft Foundry-integrasjon

Microsoft Foundry gir en plattform for å bygge og distribuere AI-agenter. Å integrere MCP med Microsoft Foundry lar deg utnytte dens funksjoner samtidig som du bevarer fleksibiliteten til MCP.

I koden nedenfor utvikler vi en agentintegrasjon som behandler forespørsler og håndterer verktøykall via MCP.

### Java-implementasjon

```java
// Java AI Foundry Agent-integrasjon
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
        // Behandle AI Foundry Agent-forespørselen
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Sjekk om agenten ba om å bruke verktøy
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // For hvert verktøy kall, rute det til riktig MCP-verktøy
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Utfør verktøyet ved å bruke MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Lag verktøysvar for AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Send verktøysvar tilbake til agenten
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

I koden ovenfor har vi:

- Opprettet en `AIFoundryMcpBridge`-klasse som integrerer både AI Foundry og MCP.
- Implementert en metode `processAgentRequest` som behandler en AI Foundry-agentforespørsel.
- Håndtert verktøykall ved å utføre dem gjennom MCP-klienten og sende resultatene tilbake til AI Foundry-agenten.

## Integrering av MCP med Azure ML

Å integrere MCP med Azure Machine Learning (ML) lar deg utnytte Azures kraftige ML-muligheter samtidig som du beholder fleksibiliteten til MCP. Denne integrasjonen kan brukes til å kjøre ML-pipelines, registrere modeller som verktøy og administrere databehandlingsressurser.

### Python-implementasjon

```python
# Python Azure AI-integrasjon
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Sett opp MCP-klient
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Sett opp Azure ML-klient
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Behandle først inndataene ved hjelp av MCP-verktøy
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Send rørledningen til Azure ML
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
        
        # Returner jobbinfo
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Hent modellinformasjon
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Opprett distribusjonsmiljø
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Sett opp beregning
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Distribuer modell som online endepunkt
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
        
        # Lag MCP-verktøyskjema basert på modellskjema
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Legg til inndataegenskaper basert på modellskjema
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Registrer som MCP-verktøy
        # I en virkelig implementering ville du laget et verktøy som kaller endepunktet
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

I koden ovenfor har vi:

- Opprettet en `EnterpriseAiIntegration`-klasse som integrerer MCP med Azure ML.
- Implementert en metode `execute_ml_pipeline` som behandler inputdata ved bruk av MCP-verktøy og sender en ML-pipeline til Azure ML.
- Implementert en metode `register_ml_model_as_tool` som registrerer en Azure ML-modell som et MCP-verktøy, inkludert opprettelse av nødvendig distribusjonsmiljø og databehandlingsressurser.
- Kartlagt Azure ML-datatyper til JSON-skjema-typer for verktøyregistrering.
- Brukt asynkron programmering for å håndtere potensielt langvarige operasjoner som kjøring av ML-pipelines og modellregistrering.

## Hva skjer videre

- [5.2 Multi-modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->