# उद्यम एकीकरण

जब तपाईँ उद्यम सन्दर्भमा MCP सर्भरहरू निर्माण गर्नुहुन्छ, तपाइँलाई प्रायः विद्यमान AI प्लेटफर्म र सेवाहरू सँग एकीकृत गर्न आवश्यक पर्छ। यो खण्डले Azure OpenAI र Microsoft AI Foundry जस्ता उद्यम प्रणालीहरूसँग MCP कसरी एकीकृत गर्ने कुरा समेट्छ, जसले उन्नत AI क्षमता र उपकरण संयोजनलाई सक्षम बनाउँछ।

## परिचय

यस पाठमा, तपाइँले Model Context Protocol (MCP) लाई उद्यम AI प्रणालीहरूसँग कसरी एकीकृत गर्ने सिक्नुहुनेछ, विशेष रूपमा Azure OpenAI र Microsoft AI Foundry मा केन्द्रित। यी एकीकरणहरूले तपाईँलाई शक्तिशाली AI मोडेल र उपकरणहरू उपयोग गर्न अनुमति दिन्छ, जबकि MCP को लचिलोपन र विस्तारयोग्यतालाई कायम राख्छ।

## सिकाइका उद्देश्यहरू

यस पाठको अन्त्यसम्म, तपाइँ सक्षम हुनुहुनेछ:

- MCP लाई Azure OpenAI सँग एकीकृत गर्न र यसको AI क्षमताहरू प्रयोग गर्न।
- Azure OpenAI सँग MCP उपकरण संयोजन कार्यान्वयन गर्न।
- Microsoft AI Foundry सँग MCP संयोजन गरेर उन्नत AI एजेन्ट क्षमताहरू पाउन।
- Azure Machine Learning (ML) लाई प्रयोग गरेर ML पाइपलाइनहरू सञ्चालन गर्न र मोडेलहरू MCP उपकरणको रूपमा दर्ता गर्न।

## Azure OpenAI एकीकरण

Azure OpenAI ले GPT-4 जस्ता शक्तिशाली AI मोडेलहरूमा पहुँच प्रदान गर्दछ। MCP लाई Azure OpenAI सँग एकीकृत गर्दा तपाइँ यी मोडेलहरू उपयोग गर्न सक्नुहुन्छ, साथै MCP को उपकरण संयोजनको लचिलोपन कायम राख्न सक्नुहुन्छ।

### C# कार्यान्वयन

यस कोड स्निपेटमा, हामीले Azure OpenAI SDK प्रयोग गरेर MCP लाई Azure OpenAI सँग कसरी एकीकृत गर्ने देखाएका छौं।

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

पूर्वको कोडमा हामीले:

- Azure OpenAI क्लाइन्टलाई एन्डपोइन्ट, डिप्लोयमेन्ट नाम र API कुञ्जीसहित कन्फिगर गरेका छौं।
- उपकरण समर्थनसहित कम्प्लीसनहरू प्राप्त गर्न `GetCompletionWithToolsAsync` मेथड सिर्जना गरेका छौं।
- प्रतिक्रिया भित्र उपकरण कलहरू सम्हालेका छौं।

आफ्नो विशेष MCP सर्भर सेटअप अनुसार वास्तविक उपकरण सञ्चालन तर्क कार्यान्वयन गर्न उत्साहित हुनुहोस्।

## Microsoft Foundry एकीकरण

Microsoft Foundry ले AI एजेन्टहरू निर्माण र परिनियोजन गर्ने प्लेटफर्म प्रदान गर्दछ। MCP लाई Microsoft Foundry सँग एकीकृत गर्दा यसको क्षमता उपयोग गर्न सकिन्छ, साथै MCP को लचिलोपन कायम रहन्छ।

तलको कोडमा, हामीले MCP प्रयोग गरेर अनुरोधहरू प्रशोधन गर्ने र उपकरण कलहरू सम्हाल्ने एजेन्ट एकीकरण विकास गरेका छौं।

### Java कार्यान्वयन

```java
// Java AI Foundry एजेन्ट एकीकरण
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
        // AI Foundry एजेन्ट अनुरोध प्रक्रिया गर्नुहोस्
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // एजेन्टले उपकरणहरू प्रयोग गर्ने अनुरोध गरेको छ कि छैन जाँच्नुहोस्
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // प्रत्येक उपकरण कलका लागि, यसलाई उपयुक्त MCP उपकरणमा मार्गनिर्देशन गर्नुहोस्
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP प्रयोग गरेर उपकरण सञ्चालन गर्नुहोस्
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI Foundry को लागि उपकरण प्रतिक्रिया सिर्जना गर्नुहोस्
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // उपकरण प्रतिक्रियालाई एजेन्टमा फिर्ता पेश गर्नुहोस्
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

पूर्वको कोडमा, हामीले:

- `AIFoundryMcpBridge` क्लास सिर्जना गरेका छौं जसले AI Foundry र MCP सँग एकीकृत हुन्छ।
- `processAgentRequest` मेथड कार्यान्वयन गरेका छौं जसले AI Foundry एजेन्ट अनुरोध प्रशोधन गर्दछ।
- उपकरण कलहरू MCP क्लाइन्टमार्फत कार्यान्वयन गरेर नतिजा AI Foundry एजेन्टमा फर्काउने व्यवस्था गरेका छौं।

## MCP लाई Azure ML सँग एकीकृत गर्नु

MCP लाई Azure Machine Learning (ML) सँग एकीकृत गर्दा तपाइँ Azure को शक्तिशाली ML क्षमता उपयोग गर्न सक्नुहुन्छ, साथै MCP को लचिलोपन कायम राख्न सक्नुहुन्छ। यो एकीकरण ML पाइपलाइनहरू सञ्चालन, मोडेलहरू उपकरणको रूपमा दर्ता गर्ने, र कम्प्युट कर्तव्यहरू व्यवस्थापन गर्न प्रयोग गर्न सकिन्छ।

### Python कार्यान्वयन

```python
# Python Azure AI एकीकरण
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP ग्राहक सेट अप गर्नुहोस्
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML ग्राहक सेट अप गर्नुहोस्
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # पहिलो पटक इनपुट डाटा MCP उपकरणहरू प्रयोग गरेर प्रक्रिया गर्नुहोस्
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # पाइपलाइन Azure ML मा पेश गर्नुहोस्
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
        
        # कामको जानकारी फिर्ता गर्नुहोस्
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # मोडेल विवरण प्राप्त गर्नुहोस्
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # वितरण वातावरण सिर्जना गर्नुहोस्
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # कम्प्युट सेट अप गर्नुहोस्
        compute = self.ml_client.compute.get("mcp-inference")
        
        # मोडेललाई अनलाइन अन्तर्बिन्दुको रूपमा तैनाथ गर्नुहोस्
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
        
        # मोडेल स्किमाको आधारमा MCP उपकरण स्किमा सिर्जना गर्नुहोस्
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # मोडेल स्किमाको आधारमा इनपुट गुणहरू थप गर्नुहोस्
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP उपकरणको रूपमा दर्ता गर्नुहोस्
        # वास्तविक कार्यान्वयनमा, तपाईंले त्यस्तो उपकरण सिर्जना गर्नुहुनेछ जुन अन्तर्बिन्दुलाई कल गर्दछ
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

पूर्वको कोडमा, हामीले:

- `EnterpriseAiIntegration` क्लास सिर्जना गरेका छौं जसले MCP लाई Azure ML सँग एकीकृत गर्दछ।
- `execute_ml_pipeline` मेथड कार्यान्वयन गरेका छौं जसले इनपुट डाटा MCP उपकरणहरू प्रयोग गरेर प्रशोधन गर्छ र Azure ML मा ML पाइपलाइन सबमिट गर्छ।
- `register_ml_model_as_tool` मेथड कार्यान्वयन गरेका छौं जसले Azure ML मोडेललाई MCP उपकरणको रूपमा दर्ता गर्छ, आवश्यक डिप्लोयमेन्ट वातावरण र कम्प्युट स्रोतहरू सिर्जना गरेर।
- उपकरण दर्ताका लागि Azure ML डेटा प्रकारहरूलाई JSON स्किमा प्रकारहरूसँग मिलाएका छौं।
- ML पाइपलाइन सञ्चालन र मोडेल दर्ता जस्ता लामो समय चल्ने कार्यहरूलाई असिन्क्रोनस प्रोग्रामिङ प्रयोग गरेर सम्हालेका छौं।

## अर्को के छ

- [5.2 बहु माध्यमिकता](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->