# یکپارچه‌سازی سازمانی

هنگام ساخت سرورهای MCP در زمینه سازمانی، اغلب نیاز است که با پلتفرم‌ها و سرویس‌های هوش مصنوعی موجود یکپارچه شوید. این بخش نحوه‌ی ادغام MCP با سیستم‌های سازمانی مانند Azure OpenAI و Microsoft AI Foundry را پوشش می‌دهد که از قابلیت‌های پیشرفته هوش مصنوعی و ارکستراسیون ابزارها پشتیبانی می‌کند.

## مقدمه

در این درس، یاد می‌گیرید چگونه پروتکل زمینه مدل (MCP) را با سیستم‌های هوش مصنوعی سازمانی یکپارچه کنید، با تمرکز بر Azure OpenAI و Microsoft AI Foundry. این یکپارچه‌سازی‌ها به شما امکان می‌دهند از مدل‌ها و ابزارهای قدرتمند هوش مصنوعی بهره ببرید و در عین حال انعطاف‌پذیری و قابلیت توسعه MCP را حفظ کنید.

## اهداف یادگیری

تا پایان این درس، قادر خواهید بود:

- MCP را با Azure OpenAI به منظور بهره‌گیری از قابلیت‌های هوش مصنوعی آن یکپارچه کنید.
- ارکستراسیون ابزارهای MCP را با Azure OpenAI پیاده‌سازی کنید.
- MCP را با Microsoft AI Foundry برای قابلیت‌های پیشرفته نماینده‌های هوش مصنوعی ترکیب کنید.
- از Azure Machine Learning (ML) برای اجرای خطوط لوله ML و ثبت مدل‌ها به عنوان ابزار MCP بهره ببرید.

## یکپارچه‌سازی Azure OpenAI

Azure OpenAI دسترسی به مدل‌های قدرتمند هوش مصنوعی مانند GPT-4 و سایر مدل‌ها را فراهم می‌کند. ادغام MCP با Azure OpenAI امکان استفاده از این مدل‌ها را با حفظ انعطاف‌پذیری ارکستراسیون ابزارهای MCP می‌دهد.

### پیاده‌سازی C#

در این قطعه کد، نحوه‌ی ادغام MCP با Azure OpenAI با استفاده از SDK Azure OpenAI را نشان می‌دهیم.

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

در کد بالا:

- کلاینت Azure OpenAI را با نقطه انتهایی، نام استقرار و کلید API پیکربندی کرده‌ایم.
- متدی به نام `GetCompletionWithToolsAsync` ایجاد کرده‌ایم تا تکمیل‌های همراه با پشتیبانی ابزار را دریافت کنیم.
- تماس‌های ابزار را در پاسخ مدیریت کرده‌ایم.

ترغیب می‌شوید تا منطق واقعی مدیریت ابزار را بر اساس تنظیمات خاص سرور MCP خود پیاده‌سازی کنید.

## یکپارچه‌سازی Microsoft Foundry

Microsoft Foundry پلتفرمی برای ساخت و استقرار نماینده‌های هوش مصنوعی فراهم می‌کند. ادغام MCP با Microsoft Foundry به شما امکان می‌دهد از قابلیت‌های آن استفاده کنید و در عین حال انعطاف‌پذیری MCP را حفظ نمایید.

در کد زیر، توسعه‌ای از یکپارچه‌سازی Agent ارائه شده است که درخواست‌ها را پردازش کرده و تماس‌های ابزار را با استفاده از MCP مدیریت می‌کند.

### پیاده‌سازی Java

```java
// یکپارچه‌سازی عامل Java AI Foundry
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
        // پردازش درخواست عامل AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // بررسی اینکه آیا عامل درخواست استفاده از ابزارها را داده است
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // برای هر فراخوانی ابزار، آن را به ابزار MCP مناسب هدایت کنید
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // اجرای ابزار با استفاده از MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // ایجاد پاسخ ابزار برای AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // ارسال پاسخ ابزار به عامل بازگردانده شود
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

در کد بالا:

- کلاسی به نام `AIFoundryMcpBridge` ایجاد کرده‌ایم که با هر دو AI Foundry و MCP ادغام می‌شود.
- متدی به نام `processAgentRequest` پیاده‌سازی کرده‌ایم که درخواست نماینده AI Foundry را پردازش می‌کند.
- تماس‌های ابزار را با اجرای آن‌ها از طریق کلاینت MCP مدیریت کرده و نتایج را به نماینده AI Foundry ارسال می‌کند.

## ادغام MCP با Azure ML

ادغام MCP با Azure Machine Learning (ML) به شما امکان می‌دهد تا از قابلیت‌های قدرتمند ML Azure بهره‌مند شوید و در عین حال انعطاف‌پذیری MCP را حفظ کنید. این ادغام می‌تواند برای اجرای خطوط لوله ML، ثبت مدل‌ها به عنوان ابزار و مدیریت منابع محاسباتی استفاده شود.

### پیاده‌سازی Python

```python
# ادغام هوش مصنوعی پایتون با آزور
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # تنظیم کلاینت MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # تنظیم کلاینت Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # ابتدا داده ورودی را با استفاده از ابزارهای MCP پردازش کنید
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # ارسال خط لوله به Azure ML
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
        
        # بازگرداندن اطلاعات کار
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # دریافت جزئیات مدل
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # ایجاد محیط استقرار
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # تنظیم محاسبات
        compute = self.ml_client.compute.get("mcp-inference")
        
        # استقرار مدل به عنوان نقطه پایان آنلاین
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
        
        # ایجاد طرح ابزار MCP بر اساس طرح مدل
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # افزودن ویژگی‌های ورودی بر اساس طرح مدل
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # ثبت به عنوان ابزار MCP
        # در یک پیاده‌سازی واقعی، شما ابزاری ایجاد می‌کنید که نقطه پایان را فراخوانی می‌کند
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

در کد بالا:

- کلاسی با نام `EnterpriseAiIntegration` ایجاد کرده‌ایم که MCP را با Azure ML ادغام می‌کند.
- متدی با نام `execute_ml_pipeline` پیاده‌سازی کرده‌ایم که داده ورودی را با استفاده از ابزارهای MCP پردازش کرده و یک خط لوله ML را به Azure ML ارسال می‌کند.
- متدی با نام `register_ml_model_as_tool` پیاده‌سازی کرده‌ایم که مدل Azure ML را به عنوان یک ابزار MCP ثبت می‌کند، شامل ایجاد محیط استقرار لازم و منابع محاسباتی.
- نوع داده‌های Azure ML را به نوع JSON schema برای ثبت ابزار نگاشت کرده‌ایم.
- از برنامه‌نویسی ناهمزمان برای مدیریت عملیات طولانی مثل اجرای خطوط لوله ML و ثبت مدل استفاده کرده‌ایم.

## مرحله بعد

- [5.2 چندرسانه‌ای چندگانه](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->