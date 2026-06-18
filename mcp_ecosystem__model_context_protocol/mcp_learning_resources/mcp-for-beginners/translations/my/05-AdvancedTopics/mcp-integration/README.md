# စီးပွားရေးလက်တွဲမှု

စီးပွားရေးအခြေအနေနှင့် MCP Server များတည်ဆောက်စဉ်၊ အသုံးပြုနေသော AI ပလက်ဖောင်းများနှင့် ဝန်ဆောင်မှုများနှင့် ပေါင်းစည်းရန် မကြာခဏလိုအပ်သည်။ ဤအပိုင်းတွင် Azure OpenAI နှင့် Microsoft AI Foundry များကဲ့သို့သော စီးပွားရေးစနစ်များနှင့် MCP ကို ပေါင်းစည်းသည့်နည်းလမ်းများကို ဖော်ပြထားပြီး အဆင့်မြင့် AI စွမ်းဆောင်ရည်များနှင့် ကိရိယာစီမံခန့်ခွဲမှုကို ချိတ်ဆက်ပေးသည်။

## နိဒါန်း

ဤသင်ခန်းစာတွင် သင်သည် Model Context Protocol (MCP) ကို စီးပွားရေး AI စနစ်များအဖြစ် Azure OpenAI နှင့် Microsoft AI Foundry နှင့် ပေါင်းစည်းနည်းကို လေ့လာမည်ဖြစ်သည်။ ဤပေါင်းစည်းမှုများသည် พော်ဝါဖူ AI မော်ဒယ်များနှင့် ကိရိယာများကို အသုံးချစဉ် MCP ၏ ချိုးဖောက်နိုင်စွမ်းနှင့် လွတ်လပ်မှုများကို ထိန်းသိမ်းနိုင်စေသည်။

## သင်ယူရမည့် ရည်မှန်းချက်များ

ဤသင်ခန်းစာပြီးဆုံးလျှင် သင်သည် -

- MCP ကို Azure OpenAI နှင့် ပေါင်းစည်း၍ ၎င်း၏ AI စွမ်းဆောင်ရည်များကို အသုံးချနိုင်သည်။
- Azure OpenAI နှင့် MCP ကိရိယာစီမံခန့်ခွဲမှုကို အကောင်အထည်ဖော်နိုင်သည်။
- Microsoft AI Foundry နှင့် MCP ကို ပေါင်းစည်း၍ အဆင့်မြင့် AI ကိုယ်စားလှယ် စွမ်းဆောင်ရည်များ ရရှိနိုင်သည်။
- Azure Machine Learning (ML) ကို အသုံးပြု၍ ML လမ်းကြောင်းများကို ဆောင်ရွက်ခြင်းနှင့် MCP ကိရိယာအဖြစ် မော်ဒယ်များကို မှတ်ပုံတင်နိုင်ခြင်း။

## Azure OpenAI ပေါင်းစည်းမှု

Azure OpenAI သည် GPT-4 အပါအဝင် ထွက်ခွာအားကြီးသော AI မော်ဒယ်များကို မျှဝေပေးသည်။ MCP ကို Azure OpenAI နှင့် ပေါင်းစည်းခြင်းအားဖြင့် ၎င်းတို့၏ မော်ဒယ်များကို အသုံးချနိုင်ပြီး MCP ၏ ကိရိယာစီမံခန့်ခွဲရေး လွတ်လပ်မှုကို ထိန်းသိမ်းနိုင်သည်။

### C# အကောင်အထည်ဖော်မှု

ဤကုဒ်အစိတ်အပိုင်းတွင် MCP ကို Azure OpenAI SDK အသုံးပြု၍ ပေါင်းစည်းနည်းကို ပြသထားသည်။

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

အထက်ေပးထားသောကုဒ်တွင် -

- Azure OpenAI client ကို endpoint, deployment name နှင့် API key ဖြင့် ပြင်ဆင်ထားသည်။
- ကိရိယာများပံ့ပိုးမှုဖြင့် မြှင့်တင်မှုရယူရန် `GetCompletionWithToolsAsync` မက်သစ်ကို ဖန်တီးထားသည်။
- တုံ့ပြန်ချက်တွင် ကိရိယာခေါ်ယူမှုများကို ကိုင်တွယ်ထားသည်။

သင်၏ MCP Server စနစ်အရ သက်ဆိုင်ရာ ကိရိယာ ကိုင်တွယ်မှု အလုပ်လုပ်နည်းကို လက်တွေ့ဖော်ဆောင်ရန် အကြံပြုပါသည်။

## Microsoft Foundry ပေါင်းစည်းမှု

Microsoft Foundry သည် AI ကိုယ်စားလှယ်များ တည်ဆောက်ခြင်းနှင့် ဖြန့်ချိခြင်းအတွက် ပလက်ဖောင်းတစ်ခုဖြစ်သည်။ MCP ကို Microsoft Foundry နှင့် ပေါင်းစည်းခြင်းအားဖြင့် ၎င်း၏ စွမ်းဆောင်ရည်များကို အသုံးချနိုင်ပြီး MCP ၏ လွတ်လပ်မှုကို ထိန်းသိမ်းနိုင်သည်။

အောက်တွင် MCP ကို အသုံးပြု၍ အီးဂျင့်ခေါ်ယူမှုများကို စီမံကိန်းဆောင်ရွက်ပြီး ကိရိယာခေါ်ယူမှုများကို ကိုင်တွယ်သည့် AI ကိုယ်စားလှယ် ပေါင်းစည်းမှုကို ဖော်ဆောင်ထားသည်။

### Java အကောင်အထည်ဖော်မှု

```java
// Java AI Foundry Agent ပေါင်းစပ်မှု
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
        // AI Foundry Agent တောင်းဆိုမှုကို ကိုင်တွယ်ခြင်း
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // အေးဂျင့်သည် ကိရိယာများအသုံးပြုရန် တောင်းဆိုထားမရှိမရှိ စစ်ဆေးပါ
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // ကိရိယာတစ်ခုချင်းစီအတွက် အခန်းကဏ္ဍ MCP ကိရိယာသို့ လမ်းကြောင်းပြုလုပ်ပါ
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP ကို အသုံးပြုကိရိယာကို ဆောင်ရွက်ပါ
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI Foundry အတွက် ကိရိယာတုံ့ပြန်ချက်ကို ဖန်တီးပါ
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // အေးဂျင့်ထံ ပြန်လည်သွင်းရန် ကိရိယာတုံ့ပြန်ချက်ကိုတင်သွင်းပါ
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

အထက်ပါကုဒ်တွင် -

- AI Foundry နှင့် MCP နှစ်ခုလုံးနှင့် ပေါင်းစည်းသော `AIFoundryMcpBridge` အတန်းကို ဖန်တီးထားသည်။
- AI Foundry ကိုယ်စားလှယ်၏ အော်ဒါများကို ဆောင်ရွက်သည့် `processAgentRequest` မက်သစ်ကို အကောင်အထည်ဖော်ထားသည်။
- MCP client တဆင့် ကိရိယာခေါ်ယူမှုများကို ဆောင်ရွက်ပြီး ရလဒ်များကို AI Foundry ကိုယ်စားလှယ်ထံ ပြန်လည်ပေးပို့ထားသည်။

## MCP ကို Azure ML နှင့် ပေါင်းစည်းခြင်း

MCP ကို Azure Machine Learning (ML) နှင့် ပေါင်းစည်းခြင်းအားဖြင့် Azure ၏ မြင့်မားသော ML စွမ်းဆောင်ရည်များကို အသုံးချနိုင်ပြီး MCP ၏ လွတ်လပ်မှုကို ထိန်းသိမ်းထားနိုင်သည်။ ဤပေါင်းစည်းမှုသည် ML လမ်းကြောင်းများကို ဆောင်ရွက်ခြင်း၊ မော်ဒယ်များကို ကိရိယာအဖြစ် မှတ်ပုံတင်ခြင်းနှင့် ကွန်ပျူတာ အရင်းအမြစ်များကို စီမံခန့်ခွဲရန် အသုံးပြုနိုင်သည်။

### Python အကောင်အထည်ဖော်မှု

```python
# Python Azure AI ပေါင်းစည်းခြင်း
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP client ကို စီစပ်ပါ
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML client ကို စီစပ်ပါ
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # ပထမဆုံး MCP ကိရိယာများဖြင့် input data ကို ပြုလုပ်ပါ
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # pipeline ကို Azure ML သို့ တင်ပြပါ
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
        
        # အလုပ်အချက်အလက် ပြန်ပေးပါ
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # မော်ဒယ်အသေးစိတ်ကို ရယူပါ
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # deployment ပတ်ဝန်းကျင်ကို ဖန်တီးပါ
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # compute ကို စီစပ်ပါ
        compute = self.ml_client.compute.get("mcp-inference")
        
        # မော်ဒယ်ကို online endpoint အဖြစ် တပ်ဆင်ပါ
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
        
        # မော်ဒယ် schema အပေါ်မူတည်၍ MCP tool schema ဖန်တီးပါ
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # မော်ဒယ် schema အပေါ်မူတည်၍ input property များ ထည့်သွင်းပါ
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP tool အဖြစ် မှတ်ပုံတင်ပါ
        # အမှန်တကယ် အကောင်အထည် ဖော်သောအခါ endpoint ကို ခေါ်သုံးသည့် tool တစ်ခု ဖန်တီးမည်ဖြစ်သည်
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

အထက်ပါကုဒ်တွင် -

- MCP ကို Azure ML နှင့် ပေါင်းစည်းထားသော `EnterpriseAiIntegration` အတန်းကို ဖန်တီးထားသည်။
- MCP ကိရိယာများအသုံးပြု၍ အချက်အလက်တွင် ပြုလုပ်ပြီး Azure ML သို့ ML pipeline တင်သွင်းသော `execute_ml_pipeline` မက်သစ်ကို ဖန်တီးထားသည်။
- Azure ML မော်ဒယ်ကို MCP ကိရိယာအဖြစ် မှတ်ပုံတင်ရန်၊ deployment ပတ်ဝန်းကျင်နှင့် ကွန်ပျူတာ အရင်းအမြစ်များ ဖန်တီးခံထားရသော `register_ml_model_as_tool` မက်သစ်ကို ဖေါ်ဆောင်ထားသည်။
- Azure ML အချက်အလက် အမျိုးအစားများကို JSON schema အမျိုးအစားများသို့ မျှတစွာ mapping ပြုလုပ်ထားသည်။
- ML pipeline ဆောင်ရွက်ခြင်းနှင့် မော်ဒယ် မှတ်ပုံတင်ခြင်းကဲ့သို့ အချိန်ကြာနိုင်သော လုပ်ငန်းစဉ်များကို အဆက်မပြတ် အလုပ်လုပ်စေသည့် asynchronous programming ကို အသုံးပြုထားသည်။

## နောက်တစ်ဆင့်

- [5.2 Multi modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->