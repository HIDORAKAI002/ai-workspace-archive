# Интеграција предузећа

Када градите MCP сервере у контексту предузећа, често је потребно интегрисати се са постојећим AI платформама и услугама. Овај одељак покрива како интегрисати MCP са системима предузећа као што су Azure OpenAI и Microsoft AI Foundry, омогућавајући напредне AI могућности и оркестрацију алата.

## Увод

У овој лекцији ћете научити како да интегришете Model Context Protocol (MCP) са AI системима предузећа, фокусирајући се на Azure OpenAI и Microsoft AI Foundry. Ове интеграције вам омогућавају да користите моћне AI моделе и алате уз одржавање флексибилности и проширивости MCP-а.

## Циљеви учења

На крају ове лекције моћи ћете да:

- Интегришете MCP са Azure OpenAI ради коришћења његових AI могућности.
- Имплементирате оркестрацију MCP алата са Azure OpenAI.
- Комбинујете MCP са Microsoft AI Foundry за напредне могућности AI агената.
- Искористите Azure Machine Learning (ML) за извршавање ML пипелајна и регистрацију модела као MCP алата.

## Интеграција са Azure OpenAI

Azure OpenAI пружа приступ моћним AI моделима као што су GPT-4 и други. Интеграција MCP-а са Azure OpenAI омогућава коришћење ових модела уз одржавање флексибилности оркестрације алата унутар MCP-а.

### Имплементација у C#

У овом примерку кода приказујемо како интегрисати MCP са Azure OpenAI користећи Azure OpenAI SDK.

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

У претходном коду смо:

- Конфигурисали Azure OpenAI клијента са крајњом тачком, именом распореда и API кључем.
- Креирали методу `GetCompletionWithToolsAsync` за добијање одговора уз подршку алата.
- Обрадили позиве алата у одговору.

Подстичемо вас да имплементирате стварну логику обраде алата према вашој специфичној поставци MCP сервера.

## Интеграција са Microsoft Foundry

Microsoft Foundry пружа платформу за изградњу и деплој AI агената. Интеграција MCP-а са Microsoft Foundry омогућава искоришћавање његових могућности уз одржавање флексибилности MCP-а.

У доњем коду развијамо интеграцију агента који обрађује захтеве и рукује позивима алата користећи MCP.

### Имплементација у Јава

```java
// Интеграција Java AI Foundry агента
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
        // Обради захтев AI Foundry агента
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Провери да ли је агент тражио коришћење алата
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // За сваки позив алата усмери га на одговарајући MCP алат
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Изврши алат користећи MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Креирај одговор алата за AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Пошаљи одговор алата назад агенту
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

У претходном коду смо:

- Креирали класу `AIFoundryMcpBridge` која интегрише и AI Foundry и MCP.
- Имплементирали метод `processAgentRequest` који обрађује захтев AI Foundry агента.
- Обрадили позиве алата извршавајући их кроз MCP клијент и враћајући резултате назад AI Foundry агенту.

## Интеграција MCP са Azure ML

Интеграција MCP-а са Azure Machine Learning (ML) омогућава искоришћење моћних ML могућности Azure-а уз одржавање флексибилности MCP-а. Ова интеграција се може користити за извршавање ML пипелајна, регистрацију модела као алата и управљање рачунарским ресурсима.

### Имплементација у Python-у

```python
# Python интеграција Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Поставите MCP клијента
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Поставите Azure ML клијента
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Прво обрадите улазне податке коришћењем MCP алата
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Пошаљите pipeline у Azure ML
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
        
        # Вратите информације о послу
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Приступите детаљима модела
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Креирајте окружење за имплементацију
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Поставите рачунарске ресурсе
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Имплементирајте модел као онлајн ендпоинт
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
        
        # Креирајте MCP шему алата на основу шеме модела
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Додајте улазне особине на основу шеме модела
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Региструјте као MCP алат
        # У стварној имплементацији, направили бисте алат који позива ендпоинт
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

У претходном коду смо:

- Креирали класу `EnterpriseAiIntegration` која интегрише MCP са Azure ML.
- Имплементирали метод `execute_ml_pipeline` који обрађује улазне податке коришћењем MCP алата и покреће ML пипелајн на Azure ML.
- Имплементирали метод `register_ml_model_as_tool` који региструје Azure ML модел као MCP алат, укључујући креирање потребног окружења за деплој и рачунарских ресурса.
- Мапирали типове података из Azure ML у JSON схемске типове за регистрацију алата.
- Користили асинхрони програмски модел за руковање потенцијално дуго трајућим операцијама као што су извршавање ML пипелајна и регистрација модела.

## Следећи кораци

- [5.2 Мултимодалност](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->