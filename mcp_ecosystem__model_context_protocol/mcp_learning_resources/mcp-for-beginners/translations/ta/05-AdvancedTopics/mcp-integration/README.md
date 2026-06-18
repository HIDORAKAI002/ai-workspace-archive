# நிறுவன ஒருங்கிணைப்பு

ஒரு நிறுவன சூழலில் MCP சேவையகங்களை உருவாக்கும் போது, நீங்கள் பெரும்பாலும் ஏற்கனவே உள்ள AI தளங்கள் மற்றும் சேவைகளுடன் ஒருங்கிணைக்க வேண்டியாகும். இந்த பகுதியில் MCP-ஐ Azure OpenAI மற்றும் Microsoft AI Foundry போன்ற நிறுவன அமைப்புகளுடன் ஒருங்கிணைப்பது எப்படி என்பதை பேசுகிறது, இது முன்னோடியான AI திறன்கள் மற்றும் கருவி ஒருங்கிணைப்பை செயல்படுத்த உதவுகிறது.

## அறிமுகம்

இந்த பாடத்தில், நீங்கள் கட்டுமான Context Protocol (MCP)-ஐ நிறுவன AI அமைப்புகளுடன் எப்படி ஒருங்கிணைக்கணுமென கற்கப்போகிறீர்கள், குறிப்பாக Azure OpenAI மற்றும் Microsoft AI Foundry மீது கவனம் செலுத்துகின்றோம். இந்த ஒருங்கிணைப்புகள் சக்திவாய்ந்த AI மாதிரிகள் மற்றும் கருவிகளை பயன்படுத்துவதற்கும் MCP-ன் தானியங்கி மற்றும் விரிவாக்கத் தன்மையை நிலைநிறுத்துவதற்குமான வாய்ப்புகளை வழங்குகின்றன.

## கற்றல் முன் நோக்கங்கள்

இந்த பாடத்தின் கடைசியில், நீங்கள்:

- Azure OpenAI உடன் MCP-ஐ ஒருங்கிணைத்து அதன் AI திறன்களை பயன்படுத்த இயலும்.
- Azure OpenAI உடன் MCP கருவி ஒருங்கிணைப்பை செயல்படுத்த இயலும்.
- Microsoft AI Foundry உடன் MCP-ஐ இணைத்து முன்னோடியான AI ஏஜென்ட் திறன்களை பெற இயலும்.
- Azure Machine Learning (ML)ஐ பயன்படுத்தி ML பயன்பாடுகளை இயக்கவும் மற்றும் மாதிரிகளை MCP கருவிகளாக பதிவு செய்யவும் இயலும்.

## Azure OpenAI ஒருங்கிணைப்பு

Azure OpenAI GPT-4 மற்றும் பிற சக்திவாய்ந்த AI மாதிரிகளுக்கு அணுகலை வழங்குகிறது. MCP-ஐ Azure OpenAI உடன் ஒருங்கிணைப்பதால், நீங்கள் இந்த மாதிரிகளை பயன்படுத்தி MCP-ன் கருவி ஒருங்கிணைப்பின் தானியங்கி தன்மையை பாதுகாப்பதில் உதவி செய்கிறது.

### C# செயலாக்கம்

இந்த குறியீட்டில், Azure OpenAI SDK-ஐ பயன்படுத்தி MCP உடன் Azure OpenAI-ஐ எப்படி ஒருங்கிணைக்கலாம் என்பதைக் காட்டுகிறோம்.

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

மேலே உள்ள குறியீட்டில் நாம்:

- Azure OpenAI கிளையண்டை endpoint, deployment name மற்றும் API key உடன் கட்டமைத்துள்ளோம்.
- `GetCompletionWithToolsAsync` என்ற முறையை உருவாக்கி கருவி ஆதரவுடன் முடித்தல் பெறுவது எப்படி என்பதை காட்டியுள்ளோம்.
- கருவி அழைப்புகளை பதிலில் கையாளியுள்ளோம்.

உங்கள் தனிப்பட்ட MCP சேவையக அமைப்பை கருத்தில் கொண்டு கருவி கையாளுதல் தர்க்கத்தை நீங்கள் செயல்படுத்த encouraged ஆக உள்ளீர்கள்.

## Microsoft Foundry ஒருங்கிணைப்பு

Microsoft Foundry AI ஏஜென்ட்களை உருவாக்குவதற்கும் நடைமுறையில் வைக்கத்தக்க தளத்தைக் கொடுக்கிறது. MCP-ஐ Microsoft Foundry உடன் ஒருங்கிணைப்பது அதன் திறன்களை பயன்படுத்தும் போது MCP-ன் தானியக்க தன்மையை கடைப்பிடிக்க உதவும்.

கீழே உள்ள குறியீட்டில், MCP-ஐ பயன்படுத்தி கோரிக்கைகளை செயல்படுத்தும் மற்றும் கருவி அழைப்புகளை கையாளும் ஏஜென்ட் ஒருங்கிணைப்பை உருவாக்கியுள்ளோம்.

### ஜாவா செயலாக்கம்

```java
// ஜாவா AI ஃபவுண்ட்ரி ஏஜெண்ட் ஒருங்கிணைப்பு
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
        // AI ஃபவுண்ட்ரி ஏஜெண்ட் கோரிக்கையை செயலாக்கு
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // ஏஜெண்ட் கருவிகளை பயன்படுத்த கோரியுள்ளதா என்பதைக் சோதி
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // ஒவ்வொரு கருவி அழைப்பிற்கும், அதனை பொருத்தமான MCP கருவிக்கு வழிமொழி செய்
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP பயன்படுத்தி கருவியை செயல்படுத்து
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI ஃபவுண்ட்ரிக்கான கருவி பதிலை உருவாக்கு
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // கருவி பதிலை மீண்டும் ஏஜெண்டுக்கு சமர்ப்பி
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

மேலே உள்ள குறியீட்டில் நாம்:

- AI Foundry மற்றும் MCP-இன் இரண்டையும் இணைக்கும் `AIFoundryMcpBridge` வகுப்பை உருவாக்கியுள்ளோம்.
- AI Foundry ஏஜென்ட் கோரிக்கையை செயலாக்கும் `processAgentRequest` என்ற முறையை உருவாக்கியுள்ளோம்.
- MCP கிளையண்ட் மூலம் கருவி அழைப்புகளை இயக்கி முடிவுகளை AI Foundry ஏஜென்ட்டுக்கு ஒப்படைத்துள்ளோம்.

## MCP-ஐ Azure ML உடன் ஒருங்கிணைத்தல்

MCP-ஐ Azure Machine Learning (ML) உடன் ஒருங்கிணைப்பதால் Azure-ன் சக்திவாய்ந்த ML திறன்களை பயன்படுத்தி MCP-ன் தானியக்கிய தன்மையையும் பாதுகாக்க முடியும். இந்த ஒருங்கிணைப்பு ML பைப்பிளைன்களை இயக்கவோ, மாதிரிகளை கருவிகளாக பதிவு செய்யவோ மற்றும் கணனி வளங்களை நிர்வகிக்கவோ பயன்படுகிறது.

### பைதான் செயலாக்கம்

```python
# Python Azure AI இணைபKevVisualStyleBackColor
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP கிளையண்டை அமைக்கவும்
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML கிளையண்டை அமைக்கவும்
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # முதலில் MCP கருவிகளைப் பயன்படுத்தி உள்ளீட்டு தரவை செயலாக்கவும்
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # பைப்லைனைக் Azure ML க்கு சமர்ப்பிக்கவும்
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
        
        # வேலை தகவலை திருப்பி கொடு
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # மாடல் விவரங்களைப் பெறுக
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # பணி நடத்திய சூழலை உருவாக்கவும்
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # கணினியை அமைக்கவும்
        compute = self.ml_client.compute.get("mcp-inference")
        
        # மாடலை ஆன்லைன் எண்ட்பாயிண்டாக வெளியிடவும்
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
        
        # மாடல் திட்டத்தின் அடிப்படையில் MCP கருவி திட்டத்தை உருவாக்கவும்
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # மாடல் திட்டத்தின் அடிப்படையில் உள்ளீட்டு பண்புகளைச் சேர்க்கவும்
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP கருவியாக பதிவு செய்யவும்
        # உண்மையான செயல்திறனில், நீங்கள் அந்த எண்ட்பாயிண்டை அழைக்கும் ஒரு கருவியை உருவாக்குவீர்கள்
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

மேலே உள்ள குறியீட்டில் நாம்:

- MCP மற்றும் Azure ML-ஐ ஒருங்கிணைக்கும் `EnterpriseAiIntegration` வகுப்பை உருவாக்கியுள்ளோம்.
- MCP கருவிகளை பயன்படுத்தி உள்ளீட்டு தரவை செயலாக்கி Azure ML-க்கு ML பைப்பிளைனை சமர்ப்பிக்கும் `execute_ml_pipeline` முறையை உருவாக்கியுள்ளோம்.
- தேவையான deployment சுற்றுச்சூழல் மற்றும் கணனி வளங்களை உருவாக்கி Azure ML மாதிரியை MCP கருவியாக பதிவு செய்யும் `register_ml_model_as_tool` முறையை உருவாக்கியுள்ளோம்.
- கருவி பதிவு செய்ய Azure ML தரவுத் தகுதிகளை JSON ஸ்கீமா வகைகளுக்கு மாற்றியுள்ளோம்.
- ML பைப்பிளைன் இயக்கம் மற்றும் மாதிரி பதிவு போன்ற நீண்ட நேரம் எடுக்கும் செயல்கள் கூட்டு நிரலாக்கத்தை பயன்படுத்தியுள்ளோம்.

## அடுத்தது என்ன

- [5.2 பன்முக வடிவமைப்பு](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->