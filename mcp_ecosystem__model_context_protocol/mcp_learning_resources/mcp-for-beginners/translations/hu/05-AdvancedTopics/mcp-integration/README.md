# Vállalati integráció

MCP szerverek vállalati környezetben történő építésekor gyakran szükség van meglévő AI platformokkal és szolgáltatásokkal való integrációra. Ez a rész bemutatja, hogyan integrálható az MCP vállalati rendszerekkel, például az Azure OpenAI-jal és a Microsoft AI Foundry-val, lehetővé téve fejlett AI képességek és eszközösztönzés használatát.

## Bevezetés

Ebben a leckében megtanulod, hogyan integráld a Model Context Protocol-t (MCP) vállalati AI rendszerekkel, különös tekintettel az Azure OpenAI-ra és a Microsoft AI Foundry-ra. Ezek az integrációk lehetővé teszik erőteljes AI modellek és eszközök kihasználását, miközben megőrzik az MCP rugalmasságát és bővíthetőségét.

## Tanulási célok

A lecke végére képes leszel:

- Az MCP integrálása az Azure OpenAI-val, hogy kihasználd annak AI képességeit.
- Az MCP eszközösztönzésének megvalósítása az Azure OpenAI-val.
- Az MCP kombinálása a Microsoft AI Foundry-val fejlett AI ügynök funkciók érdekében.
- Az Azure Machine Learning (ML) kihasználása ML pipeline-ok futtatásához és modellek MCP eszközökként történő regisztrálásához.

## Azure OpenAI integráció

Az Azure OpenAI hozzáférést biztosít erőteljes AI modellekhez, például a GPT-4-hez és másokhoz. Az MCP integrálása az Azure OpenAI-val lehetővé teszi ezeknek a modelleknek a használatát, miközben megőrzi az MCP eszközösztönzésének rugalmasságát.

### C# megvalósítás

Ebben a kódrészletben bemutatjuk, hogyan integrálható az MCP az Azure OpenAI-val az Azure OpenAI SDK használatával.

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
  
Az előző kódban:

- Beállítottuk az Azure OpenAI klienst a végpont, a telepítési név és az API kulcs megadásával.
- Létrehoztunk egy `GetCompletionWithToolsAsync` metódust, amely eszköztámogatással rendelkező válaszokat szerez.
- Kezeltük az eszközhívásokat a válaszban.

Javasoljuk, hogy a tényleges eszközkezelési logikát az adott MCP szerver beállításaid alapján valósítsd meg.

## Microsoft Foundry integráció

A Microsoft Foundry platformot biztosít AI ügynökök fejlesztéséhez és üzembe helyezéséhez. Az MCP integrálása a Microsoft Foundry-val lehetővé teszi annak képességeinek kihasználását, miközben megőrzi az MCP rugalmasságát.

Az alábbi kódban egy olyan ügynök integrációt fejlesztünk, amely kérelmeket dolgoz fel és kezeli az eszközhívásokat MCP használatával.

### Java megvalósítás

```java
// Java AI Foundry Agent integráció
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
        // Az AI Foundry Agent kérés feldolgozása
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Ellenőrizze, hogy az ügynök eszközök használatát kérte-e
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Minden eszközhívás esetén irányítsa azt a megfelelő MCP eszközhöz
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Az eszköz végrehajtása MCP használatával
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Eszközválasz létrehozása az AI Foundry számára
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Az eszközválasz visszaküldése az ügynöknek
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
  
Az előző kódban:

- Létrehoztunk egy `AIFoundryMcpBridge` osztályt, amely integrálja a AI Foundry-t és az MCP-t.
- Megvalósítottunk egy `processAgentRequest` metódust, amely feldolgozza az AI Foundry ügynök kérését.
- Eszközhívásokat kezeltünk úgy, hogy azokat az MCP kliensen keresztül végrehajtottuk, majd az eredményeket visszaküldtük az AI Foundry ügynöknek.

## MCP integrálása Azure ML-hez

Az MCP integrálása az Azure Machine Learning-gel (ML) lehetővé teszi az Azure erőteljes ML képességeinek kihasználását, miközben megőrzi az MCP rugalmasságát. Ez az integráció használható ML pipeline-ok futtatására, modellek eszközként való regisztrálására és számítási erőforrások kezelésére.

### Python megvalósítás

```python
# Python Azure AI Integráció
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP kliens beállítása
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML kliens beállítása
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Először feldolgozza a bemeneti adatokat MCP eszközökkel
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Küldje be a munkafolyamatot az Azure ML-hez
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
        
        # Visszatér a munkainformációkkal
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Modell részleteinek lekérése
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Telepítési környezet létrehozása
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Számítási erőforrás beállítása
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Modell online végpontként való telepítése
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
        
        # MCP eszköz séma létrehozása a modell sémája alapján
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Bemeneti tulajdonságok hozzáadása a modell séma alapján
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Regisztrálás MCP eszközként
        # Egy valódi megvalósításban létrehoznál egy eszközt, amely meghívja a végpontot
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
  
Az előző kódban:

- Létrehoztunk egy `EnterpriseAiIntegration` osztályt, amely integrálja az MCP-t az Azure ML-lel.
- Megvalósítottunk egy `execute_ml_pipeline` metódust, amely bemeneti adatokat dolgoz fel MCP eszközök segítségével, és ML pipeline-t indít az Azure ML-en.
- Megvalósítottunk egy `register_ml_model_as_tool` metódust, amely egy Azure ML modellt MCP eszközként regisztrál, beleértve a szükséges telepítési környezet és számítási erőforrások létrehozását.
- Leképeztük az Azure ML adattípusokat JSON sématípusokra az eszközregisztrációhoz.
- Aszinkron programozást használtunk potenciálisan hosszú futású műveletekhez, például ML pipeline végrehajtáshoz és modellregisztrációhoz.

## Mi következik

- [5.2 Többmodalitás](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->