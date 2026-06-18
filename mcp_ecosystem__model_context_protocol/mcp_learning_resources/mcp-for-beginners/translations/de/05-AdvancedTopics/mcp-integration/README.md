# Unternehmensintegration

Beim Erstellen von MCP-Servern in einem Unternehmenskontext müssen Sie häufig bestehende KI-Plattformen und -Dienste integrieren. Dieser Abschnitt behandelt, wie MCP mit Unternehmenssystemen wie Azure OpenAI und Microsoft AI Foundry integriert wird, um erweiterte KI-Fähigkeiten und Tool-Orchestrierung zu ermöglichen.

## Einführung

In dieser Lektion lernen Sie, wie Sie das Model Context Protocol (MCP) mit Unternehmens-KI-Systemen integrieren, mit Schwerpunkt auf Azure OpenAI und Microsoft AI Foundry. Diese Integrationen ermöglichen es Ihnen, leistungsstarke KI-Modelle und -Tools zu nutzen und dabei die Flexibilität und Erweiterbarkeit von MCP beizubehalten.

## Lernziele

Am Ende dieser Lektion werden Sie in der Lage sein:

- MCP mit Azure OpenAI zu integrieren, um dessen KI-Fähigkeiten zu nutzen.
- Die MCP-Tool-Orchestrierung mit Azure OpenAI zu implementieren.
- MCP mit Microsoft AI Foundry zu kombinieren, um erweiterte KI-Agentenfähigkeiten zu erhalten.
- Azure Machine Learning (ML) zu nutzen, um ML-Pipelines auszuführen und Modelle als MCP-Tools zu registrieren.

## Azure OpenAI Integration

Azure OpenAI bietet Zugang zu leistungsfähigen KI-Modellen wie GPT-4 und anderen. Die Integration von MCP mit Azure OpenAI ermöglicht es Ihnen, diese Modelle zu nutzen und gleichzeitig die Flexibilität der MCP-Tool-Orchestrierung zu bewahren.

### C# Implementierung

In diesem Codebeispiel zeigen wir, wie MCP mit Azure OpenAI unter Verwendung des Azure OpenAI SDK integriert wird.

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

Im vorangegangenen Code haben wir:

- Den Azure OpenAI-Client mit Endpunkt, Bereitstellungsnamen und API-Schlüssel konfiguriert.
- Eine Methode `GetCompletionWithToolsAsync` erstellt, um Komplettierungen mit Tool-Unterstützung zu erhalten.
- Tool-Aufrufe in der Antwort behandelt.

Sie werden ermutigt, die tatsächliche Logik zur Behandlung der Tools basierend auf Ihrem spezifischen MCP-Server-Setup zu implementieren.

## Microsoft Foundry Integration

Microsoft Foundry bietet eine Plattform zum Erstellen und Bereitstellen von KI-Agenten. Die Integration von MCP mit Microsoft Foundry ermöglicht Ihnen, dessen Fähigkeiten zu nutzen und dabei die Flexibilität von MCP zu erhalten.

Im folgenden Code entwickeln wir eine Agent-Integration, die Anfragen verarbeitet und Tool-Aufrufe mittels MCP behandelt.

### Java Implementierung

```java
// Java AI Foundry Agent Integration
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
        // Verarbeiten Sie die AI Foundry Agent-Anfrage
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Prüfen Sie, ob der Agent die Verwendung von Werkzeugen angefordert hat
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Leiten Sie für jeden Werkzeugaufruf diesen an das entsprechende MCP-Werkzeug weiter
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Führen Sie das Werkzeug mit MCP aus
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Erstellen Sie eine Werkzeugantwort für AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Senden Sie die Werkzeugantwort zurück an den Agenten
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

Im vorangegangenen Code haben wir:

- Eine `AIFoundryMcpBridge`-Klasse erstellt, die sowohl mit AI Foundry als auch MCP integriert ist.
- Eine Methode `processAgentRequest` implementiert, die eine Anfrage eines AI Foundry-Agenten verarbeitet.
- Tool-Aufrufe behandelt, indem diese über den MCP-Client ausgeführt und die Ergebnisse an den AI Foundry-Agenten zurückgesendet werden.

## Integration von MCP mit Azure ML

Die Integration von MCP mit Azure Machine Learning (ML) ermöglicht es Ihnen, die leistungsstarken ML-Fähigkeiten von Azure zu nutzen und dabei die Flexibilität von MCP zu bewahren. Diese Integration kann verwendet werden, um ML-Pipelines auszuführen, Modelle als Tools zu registrieren und Rechenressourcen zu verwalten.

### Python Implementierung

```python
# Python Azure KI-Integration
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP-Client einrichten
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML-Client einrichten
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Verarbeiten Sie zuerst die Eingabedaten mit MCP-Tools
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Reichen Sie die Pipeline bei Azure ML ein
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
        
        # Jobinformationen zurückgeben
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Modellinformationen abrufen
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Bereitstellungsumgebung erstellen
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Compute einrichten
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Modell als Online-Endpunkt bereitstellen
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
        
        # MCP-Tool-Schema basierend auf dem Modellschema erstellen
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Eingabeeigenschaften basierend auf dem Modellschema hinzufügen
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Als MCP-Tool registrieren
        # In einer echten Implementierung würden Sie ein Tool erstellen, das den Endpunkt aufruft
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

Im vorangegangenen Code haben wir:

- Eine Klasse `EnterpriseAiIntegration` erstellt, die MCP mit Azure ML integriert.
- Eine Methode `execute_ml_pipeline` implementiert, die Eingabedaten mit MCP-Tools verarbeitet und eine ML-Pipeline an Azure ML übermittelt.
- Eine Methode `register_ml_model_as_tool` implementiert, die ein Azure ML-Modell als MCP-Tool registriert, einschließlich der Erstellung der erforderlichen Bereitstellungsumgebung und Rechenressourcen.
- Azure ML-Datentypen auf JSON-Schema-Typen für die Tool-Registrierung abgebildet.
- Asynchrone Programmierung verwendet, um potenziell lang laufende Operationen wie die Ausführung von ML-Pipelines und die Modellregistrierung zu handhaben.

## Was kommt als Nächstes

- [5.2 Multimodalität](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->