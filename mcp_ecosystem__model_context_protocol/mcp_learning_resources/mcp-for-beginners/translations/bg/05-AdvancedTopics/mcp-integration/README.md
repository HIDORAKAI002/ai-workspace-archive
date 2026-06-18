# Интеграция в предприятието

При изграждане на MCP сървъри в корпоративен контекст, често се налага интеграция със съществуващи AI платформи и услуги. Този раздел обхваща как да интегрирате MCP с корпоративни системи като Azure OpenAI и Microsoft AI Foundry, позволявайки напреднали AI възможности и оркестрация на инструменти.

## Въведение

В този урок ще научите как да интегрирате Model Context Protocol (MCP) с корпоративни AI системи, съсредоточавайки се върху Azure OpenAI и Microsoft AI Foundry. Тези интеграции ви позволяват да използвате мощни AI модели и инструменти, като същевременно запазвате гъвкавостта и разширяемостта на MCP.

## Учебни цели

В края на този урок ще можете да:

- Интегрирате MCP с Azure OpenAI, за да използвате неговите AI възможности.
- Имплементирате оркестрация на MCP инструменти с Azure OpenAI.
- Комбинирате MCP с Microsoft AI Foundry за напреднали AI агент възможности.
- Използвате Azure Machine Learning (ML) за изпълнение на ML конвейери и регистриране на модели като MCP инструменти.

## Интеграция с Azure OpenAI

Azure OpenAI осигурява достъп до мощни AI модели като GPT-4 и други. Интегрирането на MCP с Azure OpenAI ви позволява да използвате тези модели, като същевременно запазвате гъвкавостта на оркестрацията на инструменти на MCP.

### Имплементация на C#

В този кодов фрагмент демонстрираме как да интегрирате MCP с Azure OpenAI, използвайки Azure OpenAI SDK.

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

В горния код ние:

- Конфигурирахме Azure OpenAI клиента с крайна точка, име на внедряване и API ключ.
- Създадохме метод `GetCompletionWithToolsAsync`, за да получаваме довършвания с поддръжка на инструменти.
- Обработихме повиквания на инструменти в отговора.

Препоръчваме ви да реализирате действителната логика за обработка на инструменти според конкретната ви MCP сървърна конфигурация.

## Интеграция с Microsoft Foundry

Microsoft Foundry предоставя платформа за изграждане и внедряване на AI агенти. Интегрирането на MCP с Microsoft Foundry ви позволява да използвате неговите възможности, като същевременно запазвате гъвкавостта на MCP.

В следния код разработваме интеграция на агент, който обработва заявки и управлява повиквания на инструменти с помощта на MCP.

### Имплементация на Java

```java
// Интеграция на Java AI Foundry агент
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
        // Обработете заявката на AI Foundry агент
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Проверете дали агентът е поискал да използва инструменти
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // За всяко повикване на инструмент го препратете към съответния MCP инструмент
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Изпълнете инструмента с помощта на MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Създайте отговор на инструмента за AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Изпратете отговора на инструмента обратно към агента
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

В горния код ние:

- Създадохме клас `AIFoundryMcpBridge`, който интегрира както AI Foundry, така и MCP.
- Имплементирахме метод `processAgentRequest`, който обработва заявка от AI Foundry агент.
- Обработихме повиквания на инструменти, като ги изпълняваме чрез MCP клиента и връщаме резултатите обратно към AI Foundry агента.

## Интегриране на MCP с Azure ML

Интегрирането на MCP с Azure Machine Learning (ML) ви позволява да използвате мощните ML възможности на Azure, като същевременно запазвате гъвкавостта на MCP. Тази интеграция може да се използва за изпълнение на ML конвейери, регистриране на модели като инструменти и управление на изчислителни ресурси.

### Имплементация на Python

```python
# Python интеграция с Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Настройка на MCP клиент
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Настройка на Azure ML клиент
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Първо обработете входните данни с помощта на инструменти MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Изпратете тръбопровода в Azure ML
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
        
        # Върнете информация за задачата
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Вземете подробности за модела
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Създаване на среда за внедряване
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Настройка на изчисленията
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Внедряване на модела като онлайн крайна точка
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
        
        # Създайте схема за инструмент MCP въз основа на схемата на модела
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Добавете входни свойства въз основа на схемата на модела
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Регистрирайте като инструмент MCP
        # В реална имплементация бихте създали инструмент, който извиква крайната точка
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

В горния код ние:

- Създадохме клас `EnterpriseAiIntegration`, който интегрира MCP с Azure ML.
- Имплементирахме метод `execute_ml_pipeline`, който обработва входни данни, използвайки MCP инструменти, и подава ML конвейер към Azure ML.
- Имплементирахме метод `register_ml_model_as_tool`, който регистрира Azure ML модел като MCP инструмент, включително създаване на необходимата среда за внедряване и изчислителни ресурси.
- Съобразихме типовете данни на Azure ML с JSON схеми за регистрация на инструменти.
- Използвахме асинхронно програмиране, за да се справим с потенциално дълги операции като изпълнение на ML конвейери и регистрация на модели.

## Какво следва

- [5.2 Мултимодалност](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->