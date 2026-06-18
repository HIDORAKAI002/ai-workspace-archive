# एंटरप्राइज़ इंटीग्रेशन

जब आप एंटरप्राइज़ संदर्भ में MCP सर्वर बनाते हैं, तो आपको अक्सर मौजूदा AI प्लेटफ़ॉर्म और सेवाओं के साथ इंटीग्रेट करना पड़ता है। यह अनुभाग MCP को एज़्योर OpenAI और Microsoft AI Foundry जैसे एंटरप्राइज़ सिस्टम के साथ कैसे इंटीग्रेट करें, यह कवर करता है, जो उन्नत AI क्षमताओं और टूल ऑर्केस्ट्रेशन को सक्षम बनाता है।

## परिचय

इस पाठ में, आप सीखेंगे कि मॉडल संदर्भ प्रोटोकॉल (MCP) को एंटरप्राइज़ AI सिस्टम के साथ कैसे इंटीग्रेट करें, जिसमें मुख्य रूप से Azure OpenAI और Microsoft AI Foundry शामिल हैं। ये इंटीग्रेशन आपको शक्तिशाली AI मॉडल और टूल्स का लाभ उठाने की अनुमति देते हैं, जबकि MCP की लचीलापन और विस्तारशीलता बनाए रखते हैं।

## सीखने के उद्देश्य

इस पाठ के अंत तक, आप सक्षम होंगे:

- Azure OpenAI के साथ MCP को इंटीग्रेट करना ताकि उसकी AI क्षमताओं का उपयोग कर सकें।
- Azure OpenAI के साथ MCP टूल ऑर्केस्ट्रेशन को लागू करना।
- Microsoft AI Foundry के साथ MCP को जोड़कर अत्याधुनिक AI एजेंट क्षमताएँ प्राप्त करना।
- Azure मशीन लर्निंग (ML) का लाभ उठाना, ML पाइपलाइनों को निष्पादित करने और मॉडल्स को MCP टूल्स के रूप में रजिस्टर करने के लिए।

## Azure OpenAI इंटीग्रेशन

Azure OpenAI GPT-4 और अन्य जैसे शक्तिशाली AI मॉडलों तक पहुँच प्रदान करता है। MCP को Azure OpenAI के साथ इंटीग्रेट करने से आप इन मॉडलों का उपयोग कर सकेंगे, साथ ही MCP के टूल ऑर्केस्ट्रेशन की लचीलापन बनाए रखेंगे।

### C# कार्यान्वयन

इस कोड स्निपेट में, हम Azure OpenAI SDK का उपयोग करके MCP को Azure OpenAI के साथ कैसे इंटीग्रेट करें, यह प्रदर्शित करते हैं।

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


पिछले कोड में हमने:

- Azure OpenAI क्लाइंट को एंडपॉइंट, डिप्लॉयमेंट नाम और API कुंजी के साथ कॉन्फ़िगर किया।
- एक मेथड `GetCompletionWithToolsAsync` बनाया जो टूल सपोर्ट के साथ पूर्णता प्राप्त करता है।
- प्रतिक्रिया में टूल कॉल्स को संभाला।

आपको अपने विशिष्ट MCP सर्वर सेटअप के आधार पर वास्तविक टूल हैंडलिंग लॉजिक लागू करने के लिए प्रोत्साहित किया जाता है।

## Microsoft Foundry इंटीग्रेशन

Microsoft Foundry AI एजेंट बनाने और तैनात करने के लिए एक प्लेटफ़ॉर्म प्रदान करता है। MCP को Microsoft Foundry के साथ इंटीग्रेट करने से आप इसकी क्षमताओं का लाभ उठा सकते हैं, जबकि MCP की लचीलापन बनाए रख सकते हैं।

नीचे दिए गए कोड में, हम एक एजेंट इंटीग्रेशन विकसित करते हैं जो अनुरोधों को प्रोसेस करता है और MCP का उपयोग करके टूल कॉल्स को संभालता है।

### जावा कार्यान्वयन

```java
// जावा एआई फाउंड्री एजेंट इंटीग्रेशन
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
        // एआई फाउंड्री एजेंट अनुरोध को प्रोसेस करें
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // जांचें कि एजेंट ने टूल्स का उपयोग करने के लिए अनुरोध किया है या नहीं
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // प्रत्येक टूल कॉल के लिए, इसे उपयुक्त MCP टूल पर रूट करें
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP का उपयोग करके टूल को निष्पादित करें
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // एआई फाउंड्री के लिए टूल उत्तर बनाएं
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // टूल उत्तर को एजेंट को वापस सबमिट करें
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


पिछले कोड में, हमने:

- एक `AIFoundryMcpBridge` क्लास बनाया जो दोनों AI Foundry और MCP के साथ इंटीग्रेट करता है।
- `processAgentRequest` नामक एक मेथड लागू किया जो AI Foundry एजेंट अनुरोध को प्रोसेस करता है।
- टूल कॉल्स को MCP क्लाइंट के माध्यम से निष्पादित करके हैंडल किया और परिणामों को वापस AI Foundry एजेंट में सबमिट किया।

## MCP को Azure ML के साथ इंटीग्रेट करना

MCP को Azure मशीन लर्निंग (ML) के साथ इंटीग्रेट करने से आप Azure की शक्तिशाली ML क्षमताओं का लाभ उठा सकते हैं जबकि MCP की लचीलापन बनाए रखते हैं। इस इंटीग्रेशन का उपयोग ML पाइपलाइनों को निष्पादित करने, मॉडल्स को टूल्स के रूप में रजिस्टर करने और कंप्यूट संसाधनों का प्रबंधन करने के लिए किया जा सकता है।

### पायथन कार्यान्वयन

```python
# पायथन ऐज़्योर एआई एकीकरण
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP क्लाइंट सेट करें
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # ऐज़्योर एमएल क्लाइंट सेट करें
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # पहले डेटा को MCP टूल्स का उपयोग करके प्रोसेस करें
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # पाइपलाइन को ऐज़्योर एमएल में सबमिट करें
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
        
        # जॉब की जानकारी लौटाएँ
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # मॉडल विवरण प्राप्त करें
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # डिप्लॉयमेंट वातावरण बनाएँ
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # कम्प्यूट सेट करें
        compute = self.ml_client.compute.get("mcp-inference")
        
        # मॉडल को ऑनलाइन एंडपॉइंट के रूप में डिप्लॉय करें
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
        
        # मॉडल स्कीमा के आधार पर MCP टूल स्कीमा बनाएँ
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # मॉडल स्कीमा के आधार पर इनपुट प्रॉपर्टीज जोड़ें
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP टूल के रूप में रजिस्टर करें
        # वास्तविक कार्यान्वयन में, आप ऐसा टूल बनाएंगे जो एंडपॉइंट को कॉल करे
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


पिछले कोड में हमने:

- एक `EnterpriseAiIntegration` क्लास बनाया जो MCP को Azure ML के साथ इंटीग्रेट करता है।
- `execute_ml_pipeline` मेथड लागू किया जो MCP टूल्स का उपयोग करके इनपुट डेटा को प्रोसेस करता है और Azure ML को ML पाइपलाइन सबमिट करता है।
- `register_ml_model_as_tool` मेथड लागू किया जो Azure ML मॉडल को MCP टूल के रूप में रजिस्टर करता है, जिसमें आवश्यक डिप्लॉयमेंट वातावरण और कंप्यूट संसाधन बनाना शामिल है।
- टूल रजिस्ट्रेशन के लिए Azure ML डेटा प्रकारों को JSON स्कीमा प्रकारों के साथ मैप किया।
- लंबी चलने वाली प्रक्रियाओं जैसे ML पाइपलाइन निष्पादन और मॉडल रजिस्ट्रेशन को संभालने के लिए असिंक्रोनस प्रोग्रामिंग का उपयोग किया।

## आगे क्या है

- [5.2 मल्टी मोडलिटी](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->