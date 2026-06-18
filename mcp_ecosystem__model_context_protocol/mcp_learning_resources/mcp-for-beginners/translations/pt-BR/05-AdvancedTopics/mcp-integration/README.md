# Integração Empresarial

Ao construir Servidores MCP em um contexto empresarial, frequentemente é necessário integrar com plataformas e serviços de IA existentes. Esta seção aborda como integrar o MCP com sistemas empresariais como Azure OpenAI e Microsoft AI Foundry, possibilitando recursos avançados de IA e orquestração de ferramentas.

## Introdução

Nesta lição, você aprenderá como integrar o Protocolo de Contexto de Modelo (MCP) com sistemas de IA empresariais, focando no Azure OpenAI e Microsoft AI Foundry. Essas integrações permitem aproveitar modelos de IA poderosos e ferramentas enquanto mantém a flexibilidade e extensibilidade do MCP.

## Objetivos de Aprendizagem

Ao final desta lição, você será capaz de:

- Integrar MCP com Azure OpenAI para utilizar suas capacidades de IA.
- Implementar orquestração de ferramentas MCP com Azure OpenAI.
- Combinar MCP com Microsoft AI Foundry para capacidades avançadas de agentes de IA.
- Aproveitar Azure Machine Learning (ML) para executar pipelines de ML e registrar modelos como ferramentas MCP.

## Integração com Azure OpenAI

Azure OpenAI fornece acesso a poderosos modelos de IA como GPT-4 e outros. Integrar MCP com Azure OpenAI permite utilizar esses modelos mantendo a flexibilidade da orquestração de ferramentas do MCP.

### Implementação em C#

Neste trecho de código, demonstramos como integrar MCP com Azure OpenAI usando o SDK Azure OpenAI.

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

No código acima nós:

- Configuramos o cliente Azure OpenAI com o endpoint, nome da implantação e chave da API.
- Criamos o método `GetCompletionWithToolsAsync` para obter completions com suporte a ferramentas.
- Tratamos chamadas de ferramentas na resposta.

Você é incentivado a implementar a lógica real de tratamento das ferramentas com base na sua configuração específica do servidor MCP.

## Integração com Microsoft Foundry

Microsoft Foundry fornece uma plataforma para construir e implantar agentes de IA. Integrar MCP com Microsoft Foundry permite aproveitar suas capacidades mantendo a flexibilidade do MCP.

No código abaixo, desenvolvemos uma integração de Agente que processa requisições e trata chamadas de ferramentas usando MCP.

### Implementação em Java

```java
// Integração do Agente Java AI Foundry
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
        // Processar a solicitação do Agente AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Verificar se o agente solicitou o uso de ferramentas
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Para cada chamada de ferramenta, direcioná-la para a ferramenta MCP apropriada
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Executar a ferramenta usando o MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Criar resposta da ferramenta para o AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Enviar a resposta da ferramenta de volta para o agente
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

No código acima, nós:

- Criamos a classe `AIFoundryMcpBridge` que integra tanto com AI Foundry quanto com MCP.
- Implementamos o método `processAgentRequest` que processa uma requisição de agente AI Foundry.
- Tratamos chamadas de ferramentas executando-as via cliente MCP e submetendo os resultados de volta ao agente AI Foundry.

## Integrando MCP com Azure ML

Integrar MCP com Azure Machine Learning (ML) permite aproveitar as poderosas capacidades de ML do Azure mantendo a flexibilidade do MCP. Essa integração pode ser usada para executar pipelines de ML, registrar modelos como ferramentas e gerenciar recursos computacionais.

### Implementação em Python

```python
# Integração Python Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Configurar cliente MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Configurar cliente Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Primeiro processe os dados de entrada usando ferramentas MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Enviar o pipeline para o Azure ML
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
        
        # Retornar informações do trabalho
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Obter detalhes do modelo
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Criar ambiente de implantação
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Configurar computação
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Implantar modelo como endpoint online
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
        
        # Criar esquema da ferramenta MCP baseado no esquema do modelo
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Adicionar propriedades de entrada baseadas no esquema do modelo
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Registrar como ferramenta MCP
        # Em uma implementação real, você criaria uma ferramenta que chama o endpoint
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

No código acima, nós:

- Criamos a classe `EnterpriseAiIntegration` que integra MCP com Azure ML.
- Implementamos o método `execute_ml_pipeline` que processa dados de entrada usando ferramentas MCP e submete um pipeline ML para Azure ML.
- Implementamos o método `register_ml_model_as_tool` que registra um modelo Azure ML como ferramenta MCP, incluindo a criação do ambiente de implantação e recursos computacionais necessários.
- Mapeamos tipos de dados do Azure ML para tipos do schema JSON para o registro da ferramenta.
- Usamos programação assíncrona para tratar operações potencialmente demoradas, como execução de pipeline ML e registro de modelos.

## O que vem a seguir

- [5.2 Multi-modalidade](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->