# এন্টারপ্রাইজ ইন্টিগ্রেশন

একটি এন্টারপ্রাইজ প্রেক্ষাপটে MCP সার্ভার তৈরি করার সময়, আপনাকে প্রায়ই বিদ্যমান AI প্ল্যাটফর্ম এবং সেবার সাথে ইন্টিগ্রেট করতে হবে। এই অংশে MCP কে Azure OpenAI এবং Microsoft AI Foundry এর মতো এন্টারপ্রাইজ সিস্টেমের সাথে ইন্টিগ্রেট করার পদ্ধতি আলোচনা করা হয়েছে, যা উন্নত AI সক্ষমতা এবং টুল অর্কেস্ট্রেশন সক্ষম করে।

## পরিচিতি

এই পাঠে, আপনি শিখবেন কিভাবে মডেল কনটেক্সট প্রোটোকল (MCP) কে এন্টারপ্রাইজ AI সিস্টেমের সাথে ইন্টিগ্রেট করতে হয়, বিশেষ করে Azure OpenAI এবং Microsoft AI Foundry এর সাথে। এই ইন্টিগ্রেশনগুলি আপনাকে শক্তিশালী AI মডেল এবং টুল ব্যবহার করার সুযোগ দেয় MCP এর নমনীয়তা এবং সম্প্রসারণযোগ্যতা বজায় রেখে।

## শেখার উদ্দেশ্যসমূহ

এই পাঠের শেষে, আপনি সক্ষম হবেন:

- MCP কে Azure OpenAI এর সাথে সংযুক্ত করে তার AI সক্ষমতাগুলি ব্যবহার করতে।
- Azure OpenAI সহ MCP টুল অর্কেস্ট্রেশন কার্যায়ন করতে।
- উন্নত AI এজেন্ট সক্ষমতার জন্য MCP কে Microsoft AI Foundry এর সাথে সংযুক্ত করতে।
- Azure Machine Learning (ML) ব্যবহার করে ML পাইপলাইন কার্যকর এবং মডেলগুলোকে MCP টুল হিসেবে নিবন্ধন করতে।

## Azure OpenAI ইন্টিগ্রেশন

Azure OpenAI শক্তিশালী AI মডেল যেমন GPT-4 ইত্যাদির অ্যাক্সেস প্রদান করে। MCP কে Azure OpenAI এর সাথে সংযুক্ত করলে, আপনি এই মডেলগুলো ব্যবহার করতে পারবেন MCP এর টুল অর্কেস্ট্রেশনের নমনীয়তা বজায় রেখে।

### C# ইমপ্লিমেন্টেশন

এই কোড স্নিপেটে আমরা দেখাচ্ছি কিভাবে MCP কে Azure OpenAI SDK ব্যবহার করে সংযুক্ত করা যায়।

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

উপরের কোডে আমরা:

- Azure OpenAI ক্লায়েন্ট কনফিগার করেছি endpoint, deployment নাম এবং API কী ব্যবহার করে।
- `GetCompletionWithToolsAsync` নামে একটি মেথড তৈরি করেছি যা টুল সমর্থনের সঙ্গে কমপ্লিশন পায়।
- রেসপন্সে টুল কল হ্যান্ডেল করেছি।

আপনার নির্দিষ্ট MCP সার্ভার সেটআপ অনুযায়ী প্রকৃত টুল হ্যান্ডলিং লজিক বাস্তবায়ন করতে উৎসাহিত করা হচ্ছে।

## Microsoft Foundry ইন্টিগ্রেশন

Microsoft Foundry AI এজেন্ট তৈরি এবং ডিপ্লয় করার একটি প্ল্যাটফর্ম প্রদান করে। MCP কে Microsoft Foundry এর সাথে সংযুক্ত করলে আপনি এর সক্ষমতাগুলো ব্যবহার করতে পারবেন MCP এর নমনীয়তা বজায় রেখে।

নিম্নলিখিত কোডে, আমরা একটি এজেন্ট ইন্টিগ্রেশন তৈরি করছি যা MCP ব্যবহার করে অনুরোধ প্রক্রিয়াকরণ এবং টুল কল হ্যান্ডেল করে।

### Java ইমপ্লিমেন্টেশন

```java
// জাভা AI ফাউন্ড্রি এজেন্ট ইন্টিগ্রেশন
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
        // AI ফাউন্ড্রি এজেন্ট অনুরোধ প্রক্রিয়াকরণ
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // চেক করুন এজেন্ট টুল ব্যবহার করার অনুরোধ করেছে কিনা
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // প্রতিটি টুল কলের জন্য, এটি সঠিক MCP টুলের কাছে রুট করুন
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP ব্যবহার করে টুল চালান
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI ফাউন্ড্রির জন্য টুল প্রতিক্রিয়া তৈরি করুন
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // টুল প্রতিক্রিয়া আবার এজেন্টের কাছে জমা দিন
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

উপরের কোডে, আমরা:

- `AIFoundryMcpBridge` ক্লাস তৈরি করেছি যা AI Foundry এবং MCP উভয়ের সাথে সংযুক্ত।
- `processAgentRequest` নামে একটি মেথড বাস্তবায়ন করেছি যা একটি AI Foundry এজেন্ট অনুরোধ প্রক্রিয়াকরণ করে।
- টুল কলগুলো MCP ক্লায়েন্টের মাধ্যমে চালিয়ে ফলাফলগুলো AI Foundry এজেন্টকে জমা দেয়।

## MCP কে Azure ML এর সাথে সংযুক্ত করা

MCP কে Azure Machine Learning (ML) এর সাথে সংযুক্ত করলে আপনি Azure এর শক্তিশালী ML সক্ষমতাগুলো ব্যবহার করতে পারবেন MCP এর নমনীয়তা বজায় রেখে। এই ইন্টিগ্রেশন ML পাইপলাইন কার্যকর, মডেলকে টুল হিসেবে নিবন্ধন, এবং কম্পিউট রিসোর্স পরিচালনার জন্য ব্যবহার করা যেতে পারে।

### Python ইমপ্লিমেন্টেশন

```python
# পাইথন আজুর এআই ইন্টিগ্রেশন
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP ক্লায়েন্ট সেট আপ করুন
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # আজুর এমএল ক্লায়েন্ট সেট আপ করুন
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # প্রথমে ইনপুট ডেটা MCP টুলস ব্যবহার করে প্রক্রিয়া করুন
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # পাইপলাইনটি আজুর এমএল-এ জমা দিন
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
        
        # কাজের তথ্য ফিরিয়ে দিন
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # মডেলের বিবরণ গুলো নিন
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # ডিপ্লয়মেন্ট পরিবেশ তৈরি করুন
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # কম্পিউট সেট আপ করুন
        compute = self.ml_client.compute.get("mcp-inference")
        
        # মডেলকে অনলাইন এন্ডপয়েন্ট হিসেবে ডিপ্লয় করুন
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
        
        # মডেল স্কিমার ওপর ভিত্তি করে MCP টুল স্কিমা তৈরি করুন
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # মডেল স্কিমার ওপর ভিত্তি করে ইনপুট প্রোপার্টি যুক্ত করুন
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP টুল হিসেবে রजिस्टर করুন
        # বাস্তবায়নে, আপনি এমন একটি টুল তৈরি করবেন যা এন্ডপয়েন্ট কল করে
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

উপরের কোডে, আমরা:

- একটি `EnterpriseAiIntegration` ক্লাস তৈরি করেছি যা MCP কে Azure ML এর সাথে সংযুক্ত করে।
- `execute_ml_pipeline` মেথড বাস্তবায়ন করেছি যা MCP টুল ব্যবহার করে ইনপুট ডেটা প্রক্রিয়া করে এবং ML পাইপলাইন Azure ML এ জমা দেয়।
- `register_ml_model_as_tool` মেথড বাস্তবায়ন করেছি যা একটি Azure ML মডেল MCP টুল হিসেবে নিবন্ধন করে, প্রয়োজনীয় ডিপ্লয়মেন্ট পরিবেশ এবং কম্পিউট রিসোর্স তৈরি সহ।
- Azure ML ডেটা টাইপগুলোকে JSON স্কিমা টাইপের সাথে ম্যাপ করে টুল নিবন্ধনের জন্য।
- দীর্ঘমেয়াদী অপারেশন যেমন ML পাইপলাইন কার্যকর এবং মডেল নিবন্ধনের জন্য আসিঙ্ক্রোনাস প্রোগ্রামিং ব্যবহার করেছি।

## পরবর্তী ধাপ

- [5.2 মুল্টি মোডালিটি](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->