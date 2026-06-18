# التكامل المؤسسي

عند بناء خوادم MCP في سياق المؤسسات، غالبًا ما تحتاج إلى التكامل مع منصات وخدمات الذكاء الاصطناعي القائمة. تغطي هذه الفقرة كيفية دمج MCP مع أنظمة المؤسسات مثل Azure OpenAI و Microsoft AI Foundry، مما يتيح قدرات ذكاء اصطناعي متقدمة وتنظيم الأدوات.

## مقدمة

في هذه الدرس، ستتعلم كيفية دمج بروتوكول سياق النموذج (MCP) مع أنظمة الذكاء الاصطناعي للمؤسسات، مع التركيز على Azure OpenAI و Microsoft AI Foundry. تتيح هذه التكاملات لك الاستفادة من نماذج وأدوات الذكاء الاصطناعي القوية مع الحفاظ على مرونة وقابلية توسيع MCP.

## أهداف التعلم

بنهاية هذا الدرس، ستتمكن من:

- دمج MCP مع Azure OpenAI لاستخدام قدرات الذكاء الاصطناعي الخاصة به.
- تنفيذ تنظيم أدوات MCP مع Azure OpenAI.
- الجمع بين MCP و Microsoft AI Foundry لقدرات الوكلاء المتقدمة في الذكاء الاصطناعي.
- الاستفادة من Azure Machine Learning (ML) لتنفيذ خطوط أنابيب التعلم الآلي وتسجيل النماذج كأدوات MCP.

## تكامل Azure OpenAI

يقدم Azure OpenAI الوصول إلى نماذج ذكاء اصطناعي قوية مثل GPT-4 وغيرها. يتيح دمج MCP مع Azure OpenAI الاستفادة من هذه النماذج مع الحفاظ على مرونة تنظيم أدوات MCP.

### التنفيذ بلغة C#

في مقطع الشفرة هذا، نوضح كيفية دمج MCP مع Azure OpenAI باستخدام SDK الخاص بـ Azure OpenAI.

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

في الشفرة السابقة قمنا بـ:

- تكوين عميل Azure OpenAI مع نقطة النهاية، واسم النشر ومفتاح API.
- إنشاء طريقة `GetCompletionWithToolsAsync` للحصول على استكمالات مع دعم الأدوات.
- معالجة استدعاءات الأدوات في الاستجابة.

نشجعك على تنفيذ منطق معالجة الأدوات الفعلي بناءً على إعداد MCP الخاص بخادمك.

## تكامل Microsoft Foundry

توفر Microsoft Foundry منصة لبناء ونشر وكلاء الذكاء الاصطناعي. يتيح دمج MCP مع Microsoft Foundry الاستفادة من قدراتها مع الحفاظ على مرونة MCP.

في الشفرة أدناه، نطور تكامل وكيل يعالج الطلبات ويتعامل مع استدعاءات الأدوات باستخدام MCP.

### التنفيذ بلغة جافا

```java
// دمج وكيل Java AI Foundry
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
        // معالجة طلب وكيل AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // التحقق مما إذا طلب الوكيل استخدام الأدوات
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // لكل استدعاء أداة، توجهها إلى أداة MCP المناسبة
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // تنفيذ الأداة باستخدام MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // إنشاء استجابة الأداة لـ AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // إرسال استجابة الأداة مرة أخرى إلى الوكيل
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

في الشفرة السابقة قمنا بـ:

- إنشاء فئة `AIFoundryMcpBridge` التي تدمج بين AI Foundry و MCP.
- تنفيذ طريقة `processAgentRequest` التي تعالج طلب وكيل AI Foundry.
- التعامل مع استدعاءات الأدوات عن طريق تنفيذها عبر عميل MCP وإرجاع النتائج إلى وكيل AI Foundry.

## دمج MCP مع Azure ML

يتيح دمج MCP مع Azure Machine Learning (ML) الاستفادة من قدرات التعلم الآلي القوية في Azure مع الحفاظ على مرونة MCP. يمكن استخدام هذا التكامل لتنفيذ خطوط أنابيب التعلم الآلي، وتسجيل النماذج كأدوات، وإدارة موارد الحوسبة.

### التنفيذ بلغة بايثون

```python
# تكامل بايثون مع Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # إعداد عميل MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # إعداد عميل Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # معالجة بيانات الإدخال أولاً باستخدام أدوات MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # إرسال خط الأنابيب إلى Azure ML
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
        
        # إرجاع معلومات الوظيفة
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # الحصول على تفاصيل النموذج
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # إنشاء بيئة النشر
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # إعداد الحوسبة
        compute = self.ml_client.compute.get("mcp-inference")
        
        # نشر النموذج كنقطة نهاية عبر الإنترنت
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
        
        # إنشاء مخطط أداة MCP بناءً على مخطط النموذج
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # إضافة خصائص الإدخال بناءً على مخطط النموذج
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # التسجيل كأداة MCP
        # في تطبيق حقيقي، ستقوم بإنشاء أداة تستدعي نقطة النهاية
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

في الشفرة السابقة قمنا بـ:

- إنشاء فئة `EnterpriseAiIntegration` التي تدمج MCP مع Azure ML.
- تنفيذ طريقة `execute_ml_pipeline` التي تعالج بيانات الإدخال باستخدام أدوات MCP وترسل خط أنابيب التعلم الآلي إلى Azure ML.
- تنفيذ طريقة `register_ml_model_as_tool` التي تسجل نموذج Azure ML كأداة MCP، بما في ذلك إنشاء بيئة النشر والموارد الحوسبية اللازمة.
- تعيين أنواع بيانات Azure ML إلى أنواع مخطط JSON لتسجيل الأداة.
- استخدام البرمجة غير المتزامنة لمعالجة العمليات التي قد تستغرق وقتًا طويلًا مثل تنفيذ خطوط أنابيب التعلم الآلي وتسجيل النماذج.

## ما التالي

- [5.2 تعدد الأنماط](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->