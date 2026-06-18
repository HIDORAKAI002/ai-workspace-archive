# Enterprise-integratie

Bij het bouwen van MCP-servers in een bedrijfscontext moet je vaak integreren met bestaande AI-platformen en -services. Deze sectie behandelt hoe je MCP integreert met bedrijfsystemen zoals Azure OpenAI en Microsoft AI Foundry, waarmee geavanceerde AI-mogelijkheden en toolorkestratie worden mogelijk gemaakt.

## Introductie

In deze les leer je hoe je het Model Context Protocol (MCP) integreert met enterprise AI-systemen, met focus op Azure OpenAI en Microsoft AI Foundry. Deze integraties stellen je in staat krachtige AI-modellen en tools te benutten, terwijl je de flexibiliteit en uitbreidbaarheid van MCP behoudt.

## Leerdoelen

Aan het einde van deze les kun je:

- MCP integreren met Azure OpenAI om diens AI-mogelijkheden te benutten.
- Implementeren van MCP toolorkestratie met Azure OpenAI.
- MCP combineren met Microsoft AI Foundry voor geavanceerde AI-agentmogelijkheden.
- Azure Machine Learning (ML) inzetten om ML-pijplijnen uit te voeren en modellen als MCP-tools te registreren.

## Azure OpenAI-integratie

Azure OpenAI biedt toegang tot krachtige AI-modellen zoals GPT-4 en anderen. Het integreren van MCP met Azure OpenAI stelt je in staat deze modellen te gebruiken, terwijl de flexibiliteit van MCP's toolorkestratie behouden blijft.

### C#-implementatie

In dit codevoorbeeld laten we zien hoe MCP te integreren met Azure OpenAI via de Azure OpenAI SDK.

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

In bovenstaande code hebben we:

- De Azure OpenAI-client geconfigureerd met de endpoint, naam van de deployment en API-sleutel.
- Een methode `GetCompletionWithToolsAsync` gemaakt om completions met toolondersteuning te verkrijgen.
- Toolaanroepen in de response afgehandeld.

We raden je aan de daadwerkelijke toolafhandelingslogica te implementeren op basis van jouw specifieke MCP-serverconfiguratie.

## Microsoft Foundry-integratie

Microsoft Foundry biedt een platform voor het bouwen en deployen van AI-agents. Het integreren van MCP met Microsoft Foundry maakt het mogelijk de capaciteiten ervan te benutten, terwijl de flexibiliteit van MCP behouden blijft.

In onderstaande code ontwikkelen we een agentintegratie die verzoeken verwerkt en toolaanroepen afhandelt via MCP.

### Java-implementatie

```java
// Java AI Foundry Agent Integratie
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
        // Verwerk het AI Foundry Agent verzoek
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Controleer of de agent heeft gevraagd om tools te gebruiken
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Routeer elke tooloproep naar het juiste MCP-gereedschap
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Voer het gereedschap uit met MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Maak een gereedschapsreactie voor AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Dien de gereedschapsreactie terug in bij de agent
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

In bovenstaande code hebben we:

- Een `AIFoundryMcpBridge`-klasse gemaakt die integreert met zowel AI Foundry als MCP.
- Een methode `processAgentRequest` geïmplementeerd die een AI Foundry-agentverzoek verwerkt.
- Toolaanroepen afgehandeld door deze via de MCP-client uit te voeren en de resultaten terug te sturen naar de AI Foundry-agent.

## MCP integreren met Azure ML

Het integreren van MCP met Azure Machine Learning (ML) stelt je in staat de krachtige ML-mogelijkheden van Azure te benutten, terwijl de flexibiliteit van MCP behouden blijft. Deze integratie kan gebruikt worden om ML-pijplijnen uit te voeren, modellen als tools te registreren en compute resources te beheren.

### Python-implementatie

```python
# Python Azure AI-integratie
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP-client instellen
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML-client instellen
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Verwerk eerst de invoergegevens met MCP-tools
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Dien de pijplijn in bij Azure ML
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
        
        # Retourneer jobinformatie
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Verkrijg modelgegevens
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Maak implementatieomgeving aan
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Stel compute in
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Implementeer model als online endpoint
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
        
        # Maak MCP-tool-schema op basis van modelschema
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Voeg invoereigenschappen toe op basis van modelschema
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Registreer als MCP-tool
        # In een echte implementatie zou u een tool maken die het endpoint aanroept
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

In bovenstaande code hebben we:

- Een `EnterpriseAiIntegration`-klasse gemaakt die MCP integreert met Azure ML.
- Een `execute_ml_pipeline`-methode geïmplementeerd die inputdata verwerkt met MCP-tools en een ML-pijplijn indient bij Azure ML.
- Een `register_ml_model_as_tool`-methode geïmplementeerd die een Azure ML-model registreert als MCP-tool, inclusief het aanmaken van de benodigde deploymentomgeving en compute resources.
- Azure ML-datatypes gemapt naar JSON schema types voor toolregistratie.
- Asynchrone programmatie gebruikt om mogelijk langdurige activiteiten zoals het uitvoeren van ML-pijplijnen en modelregistratie af te handelen.

## Wat volgt

- [5.2 Multi modaliteit](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->