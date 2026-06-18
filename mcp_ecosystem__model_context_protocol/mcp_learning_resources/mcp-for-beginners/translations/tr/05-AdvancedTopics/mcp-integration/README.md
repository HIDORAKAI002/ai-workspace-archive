# Kurumsal Entegrasyon

Kurumsal bağlamda MCP Sunucuları oluştururken, genellikle mevcut AI platformları ve hizmetleri ile entegrasyon yapmanız gerekir. Bu bölüm, gelişmiş AI yetenekleri ve araç orkestrasyonunu mümkün kılan Azure OpenAI ve Microsoft AI Foundry gibi kurumsal sistemlerle MCP'nin nasıl entegre edileceğini kapsar.

## Giriş

Bu derste, Model Context Protocol (MCP)'yi Azure OpenAI ve Microsoft AI Foundry odaklı olarak kurumsal AI sistemleri ile nasıl entegre edeceğinizi öğreneceksiniz. Bu entegrasyonlar, güçlü AI modellerinden ve araçlardan yararlanmanızı sağlar ve MCP'nin esnekliği ile genişletilebilirliğini korur.

## Öğrenme Hedefleri

Bu dersin sonunda şunları yapabileceksiniz:

- MCP'yi Azure OpenAI ile entegre ederek AI yeteneklerinden faydalanmak.
- MCP araç orkestrasyonunu Azure OpenAI ile uygulamak.
- MCP'yi Microsoft AI Foundry ile birleştirerek gelişmiş AI ajan yetenekleri elde etmek.
- Azure Machine Learning (ML)'i kullanarak ML boru hatlarını yürütmek ve modelleri MCP araçları olarak kaydetmek.

## Azure OpenAI Entegrasyonu

Azure OpenAI, GPT-4 ve diğerleri gibi güçlü AI modellerine erişim sağlar. MCP'nin Azure OpenAI ile entegrasyonu, bu modelleri kullanmanızı sağlarken MCP'nin araç orkestrasyonunun esnekliğini korur.

### C# Uygulaması

Bu kod parçasında, Azure OpenAI SDK'sı kullanarak MCP'yi Azure OpenAI ile nasıl entegre edeceğimizi gösteriyoruz.

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

Yukarıdaki kodda şunları yaptık:

- Azure OpenAI istemcisini uç nokta, dağıtım adı ve API anahtarı ile yapılandırdık.
- Araç desteğiyle tamamlamalar almak için `GetCompletionWithToolsAsync` adlı bir yöntem oluşturduk.
- Yanıttaki araç çağrılarını ele aldık.

Spesifik MCP sunucu kurulumunuza bağlı olarak gerçek araç işleme mantığını uygulamanız önerilir.

## Microsoft Foundry Entegrasyonu

Microsoft Foundry, AI ajanları oluşturmak ve dağıtmak için bir platform sağlar. MCP'nin Microsoft Foundry ile entegrasyonu, MCP'nin esnekliğini korurken Foundry'nin yeteneklerinden yararlanmanızı sağlar.

Aşağıdaki kodda, MCP kullanarak talepleri işleyen ve araç çağrılarını yöneten bir Ajan entegrasyonu geliştiriyoruz.

### Java Uygulaması

```java
// Java AI Foundry Ajan Entegrasyonu
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
        // AI Foundry Ajan isteğini işle
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Ajanın araç kullanmayı isteyip istemediğini kontrol et
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Her araç çağrısı için, uygun MCP aracına yönlendir
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Aracı MCP kullanarak çalıştır
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI Foundry için araç yanıtı oluştur
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Araç yanıtını tekrar ajana gönder
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

Yukarıdaki kodda şunları yaptık:

- Hem AI Foundry hem de MCP ile entegre olan `AIFoundryMcpBridge` adlı bir sınıf oluşturduk.
- AI Foundry ajan talebini işleyen `processAgentRequest` adlı bir yöntem uyguladık.
- Araç çağrılarını MCP istemcisi ile çalıştırıp sonuçları AI Foundry ajanına geri göndererek ele aldık.

## MCP'nin Azure ML ile Entegrasyonu

MCP'nin Azure Machine Learning (ML) ile entegrasyonu, Azure'un güçlü ML yeteneklerinden yararlanmanızı sağlarken MCP'nin esnekliğini korur. Bu entegrasyon, ML boru hatlarını yürütmek, modelleri araç olarak kaydetmek ve hesaplama kaynaklarını yönetmek için kullanılabilir.

### Python Uygulaması

```python
# Python Azure AI Entegrasyonu
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP istemcisini ayarla
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML istemcisini ayarla
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Öncelikle giriş verilerini MCP araçlarıyla işleyin
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Boru hattını Azure ML'ye gönder
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
        
        # İş bilgilerini döndür
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Model detaylarını al
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Dağıtım ortamı oluştur
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Hesaplama kaynaklarını ayarla
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Modeli çevrimiçi uç nokta olarak dağıt
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
        
        # Model şemasına dayalı MCP araç şeması oluştur
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Model şemasına dayalı giriş özellikleri ekle
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP aracı olarak kaydet
        # Gerçek bir uygulamada, uç noktayı çağıran bir araç oluşturursunuz
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

Yukarıdaki kodda şunları yaptık:

- MCP'yi Azure ML ile entegre eden `EnterpriseAiIntegration` adlı bir sınıf oluşturduk.
- Girdi verisini MCP araçları kullanarak işleyen ve Azure ML'ye bir ML boru hattı gönderen `execute_ml_pipeline` adlı bir yöntem uyguladık.
- Azure ML modelini MCP aracı olarak kaydeden; gerekli dağıtım ortamı ve hesaplama kaynaklarını oluşturan `register_ml_model_as_tool` adlı bir yöntem uyguladık.
- Azure ML veri tiplerini, araç kaydı için JSON şema tiplerine eşledik.
- ML boru hattı yürütme ve model kaydı gibi potansiyel olarak uzun süren işlemleri ele almak için asenkron programlamayı kullandık.

## Sonraki Adımlar

- [5.2 Çoklu modalite](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->