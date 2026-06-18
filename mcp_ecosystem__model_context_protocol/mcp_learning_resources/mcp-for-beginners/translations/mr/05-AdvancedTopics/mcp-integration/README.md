# एंटरप्राइझ इंटिग्रेशन

एंटरप्राइझ संदर्भात MCP सर्व्हर तयार करताना, तुम्हाला अनेकदा विद्यमान AI प्लॅटफॉर्म आणि सेवा एकत्रित करायच्या असतात. हा विभाग Azure OpenAI आणि Microsoft AI Foundry सारख्या एंटरप्राइझ प्रणालींसह MCP कसे एकत्रित करायचे ते स्पष्ट करतो, ज्यामुळे प्रगत AI क्षमतांशी आणि टूल ऑर्केस्ट्रेशनशी संलग्नता साधता येते.

## परिचय

या धड्यात, तुम्हाला Model Context Protocol (MCP) एंटरप्राइझ AI प्रणालींसह कसे एकत्र करायचे ते शिकवले जाईल, विशेषतः Azure OpenAI आणि Microsoft AI Foundry वर लक्ष केंद्रित करून. या एकत्रिकरणांनी तुम्हाला सामर्थ्यशाली AI मॉडेल्स आणि टूल्स वापरण्याची संधी मिळते, तर MCP ची लवचिकता आणि विस्तारक्षमतेचा कायम राखण्यासही मदत होते.

## शिकण्याचे उद्दिष्टे

या धड्याच्या शेवटी, तुम्ही पुढील गोष्टी करू शकाल:

- Azure OpenAI सह MCP समाकलित करून त्याच्या AI क्षमतांचा वापर करणे.
- Azure OpenAI सोबत MCP टूल ऑर्केस्ट्रेशन राबविणे.
- प्रगत AI एजंट क्षमतांसाठी Microsoft AI Foundry सह MCP एकत्र करणे.
- Azure Machine Learning (ML) चा उपयोग करून ML पाईपलाइन्स चालविणे आणि मॉडेल्सना MCP टूल्स म्हणून नोंदविणे.

## Azure OpenAI एकत्रिकरण

Azure OpenAI GPT-4 आणि इतर सामर्थ्यशाली AI मॉडेल्सपर्यंत प्रवेश उपलब्ध करून देते. MCP ला Azure OpenAI सह एकत्रित केल्यास, तुम्ही या मॉडेल्सचा वापर करू शकता आणि त्याच वेळी MCP च्या टूल ऑर्केस्ट्रेशनची लवचिकता राखू शकता.

### C# अंमलबजावणी

या कोड प्याटात, आपण Azure OpenAI SDK वापरून MCP कसे एकत्र करायचे ते दाखवले आहे.

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

वर दिलेल्या कोडमध्ये आम्ही:

- Azure OpenAI क्लायंट एन्डपॉइंट, डिप्लॉयमेंट नाव आणि API कीसह कॉन्फिगर केले आहे.
- टूल समर्थनासह पूर्णता मिळवण्यासाठी `GetCompletionWithToolsAsync` पद्धत तयार केली आहे.
- प्रतिसादात टूल कॉल्स हँडल केले आहेत.

तुम्हाला प्रोत्साहित केले जाते की तुम्ही तुमच्या विशिष्ट MCP सर्व्हर सेटअपनुसार वास्तविक टूल हँडलिंग लॉजिक राबवा.

## Microsoft Foundry एकत्रिकरण

Microsoft Foundry AI एजंट तयार karayla aani deploy karayla प्लॅटफॉर्म देते. MCP ला Microsoft Foundry सह एकत्र केल्यास, तुम्ही त्याच्या क्षमतांचा उपयोग करू शकता आणि त्याच वेळी MCP ची लवचिकता राखू शकता.

खालिल कोडमध्ये, आपण Agent एकत्रिकरण विकसित करतो जे विनंत्या प्रक्रिया करते आणि MCP वापरून टूल कॉल्स हँडल करते.

### Java अंमलबजावणी

```java
// Java AI Foundry एजंट एकत्रीकरण
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
        // AI Foundry एजंट विनंती प्रक्रिया करा
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // एजंटने उपकरणे वापरण्यास विनंती केली आहे का ते पहा
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // प्रत्येक उपकरण कॉलसाठी, त्यास योग्य MCP उपकरणाकडे मार्गदर्शन करा
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP वापरून उपकरण कार्यान्वित करा
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI Foundry साठी उपकरण प्रतिसाद तयार करा
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // एजंटला उपकरण प्रतिसाद परत सादर करा
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

वर दिलेल्या कोडमध्ये, आम्ही:

- एक `AIFoundryMcpBridge` क्लास तयार केला आहे जो AI Foundry आणि MCP दोन्ही एकत्रित करतो.
- `processAgentRequest` पद्धत लागू केली आहे जी AI Foundry एजंटच्या विनंतीची प्रक्रिया करते.
- टूल कॉल्स MCP क्लायंटद्वारे चालवून त्यांचे निकाल AI Foundry एजंटकडे परत सादर करतात.

## MCP चे Azure ML सह एकत्रिकरण

MCP ला Azure Machine Learning (ML) सह एकत्र करणे तुम्हाला Azure च्या सामर्थ्यशाली ML क्षमतांचा वापर करण्याची परवानगी देते, तर MCP ची लवचिकता कायम ठेवते. हे एकत्रिकरण ML पाईपलाइन्स चालविण्यासाठी, मॉडेल्सना टूल म्हणून नोंदविण्यासाठी, आणि कंप्यूट संसाधने व्यवस्थापित करण्यासाठी वापरता येते.

### Python अंमलबजावणी

```python
# Python Azure AI एकत्रीकरण
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP क्लायंट सेट करा
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML क्लायंट सेट करा
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # प्रथम MCP साधनांचा वापर करून इनपुट डेटा प्रोसेस करा
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # पाइपलाइन Azure ML ला सबमिट करा
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
        
        # जॉब माहिती परत करा
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # मॉडेल तपशील मिळवा
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # डिप्लॉयमेंट पर्यावरण तयार करा
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # संगणनाची व्यवस्था करा
        compute = self.ml_client.compute.get("mcp-inference")
        
        # मॉडेलला ऑनलाइन एंडपॉइंट म्हणून तैनात करा
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
        
        # मॉडेल स्कीमावर आधारित MCP टूल स्कीमा तयार करा
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # मॉडेल स्कीमावर आधारित इनपुट प्रॉपर्टीज जोडा
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP टूल म्हणून नोंदणी करा
        # वास्तविक अंमलबजावणीत, तुम्ही एंडपॉइंट कॉल करणारे टूल तयार कराल
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

वर दिलेल्या कोडमध्ये, आम्ही:

- `EnterpriseAiIntegration` नावाचा क्लास तयार केला आहे जो MCP ला Azure ML सह एकत्रित करतो.
- `execute_ml_pipeline` पद्धत राबवली आहे जी MCP टूल्सचा वापर करून इनपुट डेटा प्रक्रिया करते आणि ML पाईपलाइन Azure ML कडे सबमिट करते.
- `register_ml_model_as_tool` पद्धत तयार केली आहे जी Azure ML मॉडेलला MCP टूल म्हणून नोंदवते, ज्यात आवश्यक असलेले डिप्लॉयमेंट एन्व्हायर्नमेंट आणि कंप्यूट संसाधने तयार करणे समाविष्ट आहे.
- टूल नोंदणीसाठी Azure ML डेटा प्रकार JSON स्कीमा प्रकारांशी मॅप केले आहेत.
- ML पाईपलाइनची अंमलबजावणी आणि मॉडेल नोंदणीसारख्या संभाव्य दीर्घकालीन ऑपरेशन्ससाठी असिंक्रोनस प्रोग्रामिंग वापरले आहे.

## पुढे काय

- [5.2 Multi modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->