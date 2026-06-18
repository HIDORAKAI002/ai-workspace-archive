# Integracja przedsiębiorstw

Budując serwery MCP w kontekście przedsiębiorstwa, często musisz integrować się z istniejącymi platformami i usługami AI. Ta sekcja opisuje, jak integrować MCP z systemami przedsiębiorstwowymi, takimi jak Azure OpenAI i Microsoft AI Foundry, umożliwiając zaawansowane możliwości sztucznej inteligencji i orkiestrację narzędzi.

## Wprowadzenie

W tej lekcji nauczysz się, jak integrować Model Context Protocol (MCP) z systemami AI dla przedsiębiorstw, koncentrując się na Azure OpenAI i Microsoft AI Foundry. Te integracje pozwalają na wykorzystanie potężnych modeli AI i narzędzi, zachowując jednocześnie elastyczność i rozszerzalność MCP.

## Cele nauki

Po zakończeniu tej lekcji będziesz potrafił:

- Zintegrować MCP z Azure OpenAI, aby wykorzystać jego możliwości AI.
- Zaimplementować orkiestrację narzędzi MCP z Azure OpenAI.
- Połączyć MCP z Microsoft AI Foundry, aby uzyskać zaawansowane możliwości agentów AI.
- Wykorzystać Azure Machine Learning (ML) do wykonywania potoków ML i rejestracji modeli jako narzędzi MCP.

## Integracja z Azure OpenAI

Azure OpenAI udostępnia dostęp do potężnych modeli AI, takich jak GPT-4 i inne. Integracja MCP z Azure OpenAI pozwala na wykorzystanie tych modeli, zachowując elastyczność orkiestracji narzędzi MCP.

### Implementacja w C#

W tym fragmencie kodu pokazujemy, jak zintegrować MCP z Azure OpenAI przy użyciu SDK Azure OpenAI.

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

W powyższym kodzie:

- Skonfigurowaliśmy klienta Azure OpenAI z punktem końcowym, nazwą wdrożenia i kluczem API.
- Utworzyliśmy metodę `GetCompletionWithToolsAsync` do uzyskiwania uzupełnień z obsługą narzędzi.
- Obsłużyliśmy wywołania narzędzi w odpowiedzi.

Zalecamy implementację rzeczywistej logiki obsługi narzędzi w oparciu o specyficzną konfigurację Twojego serwera MCP.

## Integracja z Microsoft Foundry

Microsoft Foundry oferuje platformę do tworzenia i wdrażania agentów AI. Integracja MCP z Microsoft Foundry pozwala wykorzystać jej możliwości, zachowując elastyczność MCP.

W poniższym kodzie tworzymy integrację agenta, która przetwarza żądania i obsługuje wywołania narzędzi za pomocą MCP.

### Implementacja w Javie

```java
// Integracja agenta Java AI Foundry
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
        // Przetwórz żądanie agenta AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Sprawdź, czy agent zażądał użycia narzędzi
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Dla każdego wywołania narzędzia skieruj je do odpowiedniego narzędzia MCP
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Wykonaj narzędzie za pomocą MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Utwórz odpowiedź narzędzia dla AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Prześlij odpowiedź narzędzia z powrotem do agenta
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

W powyższym kodzie:

- Utworzyliśmy klasę `AIFoundryMcpBridge`, która integruje AI Foundry i MCP.
- Zaimplementowaliśmy metodę `processAgentRequest` przetwarzającą żądanie agenta AI Foundry.
- Obsłużyliśmy wywołania narzędzi, wykonując je przez klienta MCP i przesyłając wyniki z powrotem do agenta AI Foundry.

## Integracja MCP z Azure ML

Integracja MCP z Azure Machine Learning (ML) pozwala korzystać z potężnych możliwości ML Azure, zachowując elastyczność MCP. Ta integracja może być używana do wykonywania potoków ML, rejestrowania modeli jako narzędzi i zarządzania zasobami obliczeniowymi.

### Implementacja w Pythonie

```python
# Integracja Python z Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Skonfiguruj klienta MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Skonfiguruj klienta Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Najpierw przetwórz dane wejściowe za pomocą narzędzi MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Prześlij pipeline do Azure ML
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
        
        # Zwróć informacje o zadaniu
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Pobierz szczegóły modelu
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Utwórz środowisko wdrożeniowe
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Skonfiguruj zasoby obliczeniowe
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Wdróż model jako punkt końcowy online
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
        
        # Utwórz schemat narzędzia MCP na podstawie schematu modelu
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Dodaj właściwości wejściowe na podstawie schematu modelu
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Zarejestruj jako narzędzie MCP
        # W rzeczywistej implementacji utworzyłbyś narzędzie wywołujące punkt końcowy
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

W powyższym kodzie:

- Utworzyliśmy klasę `EnterpriseAiIntegration`, która integruje MCP z Azure ML.
- Zaimplementowaliśmy metodę `execute_ml_pipeline`, która przetwarza dane wejściowe za pomocą narzędzi MCP i uruchamia potok ML w Azure ML.
- Zaimplementowaliśmy metodę `register_ml_model_as_tool`, która rejestruje model Azure ML jako narzędzie MCP, w tym tworzy niezbędne środowisko wdrożeniowe i zasoby obliczeniowe.
- Mapowaliśmy typy danych Azure ML na typy schematu JSON do rejestracji narzędzi.
- Użyliśmy programowania asynchronicznego, aby obsłużyć potencjalnie długotrwałe operacje, takie jak wykonanie potoku ML i rejestracja modelu.

## Co dalej

- [5.2 Multi modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->