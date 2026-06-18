# Įmonių integracija

Kuriant MCP serverius įmonių kontekste dažnai reikia integruotis su esamomis DI platformomis ir paslaugomis. Šiame skyriuje aprašoma, kaip integruoti MCP su įmonių sistemomis, tokiomis kaip Azure OpenAI ir Microsoft AI Foundry, leidžiant pažangias DI galimybes ir įrankių orkestravimą.

## Įvadas

Šioje pamokoje sužinosite, kaip integruoti Model Context Protocol (MCP) su įmonių DI sistemomis, daugiausia dėmesio skiriant Azure OpenAI ir Microsoft AI Foundry. Šios integracijos leidžia pasinaudoti galingais DI modeliais ir įrankiais, išlaikant MCP lankstumą ir išplečiamumą.

## Mokymosi tikslai

Pamokos pabaigoje galėsite:

- Integruoti MCP su Azure OpenAI, kad pasinaudotumėte jos DI galimybėmis.
- Įgyvendinti MCP įrankių orkestravimą su Azure OpenAI.
- Derinti MCP su Microsoft AI Foundry pažangioms DI agentų galimybėms.
- Išnaudoti Azure Machine Learning (ML) ML vamzdynams vykdyti ir modeliams registruoti kaip MCP įrankiams.

## Azure OpenAI integracija

Azure OpenAI suteikia prieigą prie galingų DI modelių, tokių kaip GPT-4 ir kitų. Integruoti MCP su Azure OpenAI leidžia pasinaudoti šiais modeliais, išlaikant MCP įrankių orkestravimo lankstumą.

### C# įgyvendinimas

Šiame kodo fragmente demonstruojame, kaip integruoti MCP su Azure OpenAI, naudojant Azure OpenAI SDK.

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

Aukščiau pateiktame kode mes:

- Suconfigūravome Azure OpenAI klientą su galiniu tašku, diegimo pavadinimu ir API raktu.
- Sukūrėme metodą `GetCompletionWithToolsAsync`, kad gautume užbaigimus su įrankių palaikymu.
- Apdorojome įrankių kvietimus atsakyme.

Rekomenduojame įgyvendinti faktinę įrankių apdorojimo logiką pagal jūsų konkrečią MCP serverio sąranką.

## Microsoft Foundry integracija

Microsoft Foundry suteikia platformą DI agentams kurti ir diegti. Integruoti MCP su Microsoft Foundry leidžia išnaudoti jo galimybes, išlaikant MCP lankstumą.

Toliau esančiame kode kuriame agento integraciją, kuri apdoroja užklausas ir tvarko įrankių kvietimus naudodama MCP.

### Java įgyvendinimas

```java
// Java AI Foundry agento integracija
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
        // Apdoroti AI Foundry agento užklausą
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Patikrinti, ar agentas prašė naudoti įrankius
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Kiekvienam įrankio kvietimui nukreipti jį į atitinkamą MCP įrankį
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Vykdyti įrankį naudojant MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Sukurti įrankio atsakymą AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Grąžinti įrankio atsakymą agentui
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

Aukščiau esančiame kode mes:

- Sukūrėme `AIFoundryMcpBridge` klasę, kuri integruojasi su tiek AI Foundry, tiek MCP.
- Įgyvendinome metodą `processAgentRequest`, kuris apdoroja AI Foundry agento užklausą.
- Apdorojome įrankių kvietimus vykdydami juos per MCP klientą ir pateikdami rezultatus atgal AI Foundry agentui.

## MCP integravimas su Azure ML

Integracija MCP su Azure Machine Learning (ML) leidžia išnaudoti Azure galingas ML galimybes, išlaikant MCP lankstumą. Ši integracija gali būti naudojama ML vamzdynų vykdymui, modelių registravimui kaip įrankiams ir skaičiavimo išteklių valdymui.

### Python įgyvendinimas

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
        # Nustatyti MCP klientą
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Nustatyti Azure ML klientą
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Pirmiausia apdoroti įvesties duomenis naudojant MCP įrankius
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Pateikti procesų seką į Azure ML
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
        
        # Grąžinti darbo informaciją
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Gauti modelio detales
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Sukurti diegimo aplinką
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Nustatyti skaičiavimą
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Diegti modelį kaip internetinę pabaigos tašką
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
        
        # Sukurti MCP įrankio schemą pagal modelio schemą
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Pridėti įvesties savybes pagal modelio schemą
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Užregistruoti kaip MCP įrankį
        # Tikroje implementacijoje sukurtumėte įrankį, kuris kviečia pabaigos tašką
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

Aukščiau pateiktame kode mes:

- Sukūrėme `EnterpriseAiIntegration` klasę, kuri integruoja MCP su Azure ML.
- Įgyvendinome `execute_ml_pipeline` metodą, kuris apdoroja įvesties duomenis naudodamas MCP įrankius ir pateikia ML vamzdyną Azure ML.
- Įgyvendinome `register_ml_model_as_tool` metodą, kuris registruoja Azure ML modelį kaip MCP įrankį, įskaitant reikalingos diegimo aplinkos ir skaičiavimo išteklių sukūrimą.
- Atvaizdavo Azure ML duomenų tipus į JSON schemos tipus įrankių registravimui.
- Naudojo asinchroninį programavimą, kad apdorotų potencialiai ilgai trunkančias operacijas kaip ML vamzdynų vykdymą ir modelių registravimą.

## Kas toliau

- [5.2 Multi modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->