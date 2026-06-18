# Yritysintegraatio

Rakentaessasi MCP-palvelimia yritysympäristössä, sinun täytyy usein integroida olemassa oleviin tekoälyalustoihin ja -palveluihin. Tässä osiossa käsitellään, kuinka MCP integroidaan yritysjärjestelmiin kuten Azure OpenAI ja Microsoft AI Foundry, mikä mahdollistaa edistyneet tekoälyominaisuudet ja työkalujen orkestroinnin.

## Johdanto

Tässä oppitunnissa opit, kuinka Model Context Protocol (MCP) integroidaan yritysten tekoälyjärjestelmiin, keskittyen Azure OpenAI:hin ja Microsoft AI Foundryyn. Nämä integraatiot antavat mahdollisuuden hyödyntää tehokkaita tekoälymalleja ja työkaluja samalla säilyttäen MCP:n joustavuuden ja laajennettavuuden.

## Oppimistavoitteet

Oppitunnin lopussa osaat:

- Integroida MCP:n Azure OpenAI:n kanssa sen tekoälyominaisuuksien hyödyntämiseksi.
- Toteuttaa MCP-työkalujen orkestroinnin Azure OpenAI:n kanssa.
- Yhdistää MCP:n Microsoft AI Foundryyn saadaksesi kehittyneitä tekoälyagentin ominaisuuksia.
- Hyödyntää Azure Machine Learningiä (ML) ML-putkien suorittamisessa ja mallien rekisteröimisessä MCP-työkaluina.

## Azure OpenAI -integraatio

Azure OpenAI tarjoaa pääsyn tehokkaisiin tekoälymalleihin kuten GPT-4 ja muihin. MCP:n integroiminen Azure OpenAI:n kanssa mahdollistaa näiden mallien käytön säilyttäen MCP:n työkalujen orkestroinnin joustavuuden.

### C# Toteutus

Tässä koodiesimerkissä demonstroidaan, kuinka integroidaan MCP Azure OpenAI:n kanssa Azure OpenAI SDK:n avulla.

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

Edellisessä koodissa olemme:

- Konfiguroineet Azure OpenAI -asiakkaan päätepisteen, käyttöönoton nimen ja API-avaimen avulla.
- Luoneet metodin `GetCompletionWithToolsAsync`, joka hakee tekoälyn vastauksia työkalutuen kanssa.
- Käsitelleet työkalukutsuja vastauksessa.

Kannustamme sinua toteuttamaan varsinaisen työkalukäsittelylogiikan oman MCP-palvelinympäristösi mukaan.

## Microsoft Foundry -integraatio

Microsoft Foundry tarjoaa alustan tekoälyagenttien rakentamiseen ja käyttöönottoon. MCP:n integroiminen Microsoft Foundryyn antaa sinun hyödyntää sen ominaisuuksia säilyttäen MCP:n joustavuuden.

Alla olevassa koodissa kehitämme Agent-integraation, joka käsittelee pyyntöjä ja hoitaa työkalukutsuja MCP:n avulla.

### Java-toteutus

```java
// Java AI Foundry Agent -integrointi
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
        // Käsittele AI Foundry Agent -pyyntö
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Tarkista, pyysikö agentti käyttämään työkaluja
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Reititä jokainen työkalukutsu sopivalle MCP-työkalulle
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Suorita työkalu MCP:n avulla
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Luo työkalun vastaus AI Foundrylle
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Lähetä työkalun vastaus takaisin agentille
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

Edellisessä koodissa olemme:

- Luoneet luokan `AIFoundryMcpBridge`, joka integroi sekä AI Foundryn että MCP:n.
- Toteuttaneet metodin `processAgentRequest`, joka käsittelee AI Foundry -agentin pyyntöjä.
- Käsitelleet työkalukutsuja suorittamalla ne MCP-asiakkaan kautta ja palauttamalla tulokset AI Foundry -agentille.

## MCP:n integroiminen Azure ML:n kanssa

MCP:n integrointi Azure Machine Learningin (ML) kanssa mahdollistaa Azuren tehokkaiden ML-ominaisuuksien hyödyntämisen säilyttäen MCP:n joustavuuden. Tätä integraatiota voidaan käyttää ML-putkien suorittamiseen, mallien rekisteröimiseen työkaluna sekä laskentaresurssien hallintaan.

### Python-toteutus

```python
# Python Azure AI -integraatio
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Aseta MCP-asiakas
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Aseta Azure ML -asiakas
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Käsittele ensin syötteen tiedot MCP-työkaluilla
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Lähetä putkisto Azure ML:ään
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
        
        # Palauta työn tiedot
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Hae mallin tiedot
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Luo käyttöönottoympäristö
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Aseta laskentaresurssit
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Ota malli käyttöön online-päätepisteenä
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
        
        # Luo MCP-työkalun skeema mallin skeeman perusteella
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Lisää syöteominaisuudet mallin skeeman perusteella
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Rekisteröi MCP-työkaluna
        # Todellisessa toteutuksessa loisit työkalun, joka kutsuu päätepistettä
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

Edellisessä koodissa olemme:

- Luoneet luokan `EnterpriseAiIntegration`, joka yhdistää MCP:n Azure ML:n kanssa.
- Toteuttaneet metodin `execute_ml_pipeline`, joka käsittelee syötteitä MCP-työkaluilla ja lähettää ML-putken Azure ML:lle.
- Toteuttaneet metodin `register_ml_model_as_tool`, joka rekisteröi Azure ML -mallin MCP-työkaluksi, mukaan lukien tarvittavan käyttöönottoympäristön ja laskentaresurssit.
- Mapanneet Azure ML:n tietotyypit JSON-skeematyyppeihin työkalurekisteröintiä varten.
- Käyttäneet asynkronista ohjelmointia käsitelläksemme mahdollisesti pitkään kestäviä operaatioita kuten ML-putkien suoritus ja mallin rekisteröinti.

## Mitä seuraavaksi

- [5.2 Multi modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->