# انٹرپرائز انٹیگریشن

جب آپ انٹرپرائز سیاق و سباق میں MCP سرورز بناتے ہیں، تو آپ کو اکثر موجودہ AI پلیٹ فارمز اور خدمات کے ساتھ انٹیگریٹ کرنے کی ضرورت ہوتی ہے۔ یہ سیکشن MCP کو انٹرپرائز سسٹمز جیسے Azure OpenAI اور Microsoft AI Foundry کے ساتھ مربوط کرنے کے طریقے پر روشنی ڈالتا ہے، جو جدید AI صلاحیتوں اور ٹول آرکسٹریشن کو فعال بناتا ہے۔

## تعارف

اس سبق میں، آپ سیکھیں گے کہ ماڈل کانٹیکسٹ پروٹوکول (MCP) کو انٹرپرائز AI سسٹمز کے ساتھ کیسے مربوط کیا جائے، خاص طور پر Azure OpenAI اور Microsoft AI Foundry پر توجہ مرکوز کرتے ہوئے۔ یہ انٹیگریشن آپ کو طاقتور AI ماڈلز اور ٹولز کو استعمال کرنے کی اجازت دیتی ہے جبکہ MCP کی لچک اور توسیع پذیری کو برقرار رکھتی ہے۔

## سیکھنے کے مقاصد

اس سبق کے اختتام تک، آپ قابل ہو جائیں گے کہ:

- MCP کو Azure OpenAI کے ساتھ مربوط کریں تاکہ اس کی AI صلاحیتوں سے فائدہ اٹھایا جا سکے۔
- Azure OpenAI کے ساتھ MCP ٹول آرکسٹریشن کو نافذ کریں۔
- MCP کو Microsoft AI Foundry کے ساتھ ملائیں تاکہ جدید AI ایجنٹ کی صلاحیتیں فراہم کی جا سکیں۔
- Azure Machine Learning (ML) کا فائدہ اٹھائیں تاکہ ML پائپ لائنز چلائیں اور ماڈلز کو MCP ٹولز کے طور پر رجسٹر کریں۔

## Azure OpenAI انٹیگریشن

Azure OpenAI طاقتور AI ماڈلز جیسے GPT-4 اور دیگر تک رسائی فراہم کرتا ہے۔ MCP کو Azure OpenAI کے ساتھ مربوط کرنے سے آپ ان ماڈلز کو استعمال کر سکتے ہیں جبکہ MCP کے ٹول آرکسٹریشن کی لچک کو برقرار رکھتے ہیں۔

### C# نفاذ

اس کوڈ کے ٹکڑے میں، ہم Azure OpenAI SDK استعمال کرتے ہوئے MCP کو Azure OpenAI کے ساتھ مربوط کرنے کا مظاہرہ کرتے ہیں۔

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

پچھلے کوڈ میں ہم نے:

- Azure OpenAI کلائنٹ کو اینڈ پوائنٹ، ڈپلائمنٹ نام اور API کلید کے ساتھ ترتیب دیا۔
- `GetCompletionWithToolsAsync` طریقہ بنایا تاکہ ٹول سپورٹ کے ساتھ مکملات حاصل کی جا سکیں۔
- ردعمل میں ٹول کالز کو سنبھالا۔

آپ کو مشورہ دیا جاتا ہے کہ آپ اپنے مخصوص MCP سرور سیٹ اپ کی بنیاد پر حقیقی ٹول ہینڈلنگ لاجک نافذ کریں۔

## Microsoft Foundry انٹیگریشن

Microsoft Foundry AI ایجنٹس بنانے اور تعینات کرنے کے لیے ایک پلیٹ فارم فراہم کرتا ہے۔ MCP کو Microsoft Foundry کے ساتھ مربوط کرنے سے آپ اس کی صلاحیتوں سے فائدہ اٹھا سکتے ہیں جبکہ MCP کی لچک کو برقرار رکھتے ہیں۔

نیچے دیے گئے کوڈ میں، ہم ایک ایجنٹ انٹیگریشن تیار کرتے ہیں جو درخواستوں کو پروسیس کرتا ہے اور MCP استعمال کرتے ہوئے ٹول کالز کو سنبھالتا ہے۔

### جاوا نفاذ

```java
// جاوا اے آئی فاؤنڈری ایجنٹ انضمام
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
        // اے آئی فاؤنڈری ایجنٹ کی درخواست پر کارروائی کریں
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // چیک کریں کہ آیا ایجنٹ نے ٹولز استعمال کرنے کی درخواست کی ہے
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // ہر ٹول کال کے لیے، اسے مناسب MCP ٹول کی جانب بھیجیں
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // ٹول کو MCP کے ذریعے چلائیں
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // اے آئی فاؤنڈری کے لیے ٹول کا جواب بنائیں
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // ٹول کا جواب دوبارہ ایجنٹ کو بھیجیں
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

پچھلے کوڈ میں ہم نے:

- `AIFoundryMcpBridge` کلاس بنائی جو AI Foundry اور MCP دونوں کے ساتھ مربوط ہوتی ہے۔
- `processAgentRequest` طریقہ نافذ کیا جو AI Foundry ایجنٹ کی درخواست کو پروسیس کرتا ہے۔
- ٹول کالز کو MCP کلائنٹ کے ذریعے چلایا اور نتائج AI Foundry ایجنٹ کو واپس بھیجے۔

## MCP کو Azure ML کے ساتھ مربوط کرنا

MCP کو Azure Machine Learning (ML) کے ساتھ مربوط کرنے سے آپ Azure کی طاقتور ML صلاحیتوں کا فائدہ اٹھا سکتے ہیں جبکہ MCP کی لچک کو برقرار رکھتے ہیں۔ اس انٹیگریشن کو ML پائپ لائنز چلانے، ماڈلز کو ٹولز کے طور پر رجسٹر کرنے، اور کمپیوٹ وسائل کا انتظام کرنے کے لیے استعمال کیا جا سکتا ہے۔

### پائتھن نفاذ

```python
# پائتھن ایزور اے آئی انضمام
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # ایم سی پی کلائنٹ سیٹ اپ کریں
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # ایزور ایم ایل کلائنٹ سیٹ اپ کریں
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # پہلے ایم سی پی ٹولز کا استعمال کرتے ہوئے ان پٹ ڈیٹا پروسیس کریں
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # پائپ لائن کو ایزور ایم ایل میں سبمٹ کریں
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
        
        # جاب کی معلومات واپس کریں
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # ماڈل کی تفصیلات حاصل کریں
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # تعیناتی کا ماحول بنائیں
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # کمپیوٹ سیٹ اپ کریں
        compute = self.ml_client.compute.get("mcp-inference")
        
        # ماڈل کو آن لائن اینڈ پوائنٹ کے طور پر تعینات کریں
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
        
        # ماڈل اسکیمہ کی بنیاد پر ایم سی پی ٹول اسکیمہ بنائیں
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # ماڈل اسکیمہ کی بنیاد پر ان پٹ خصوصیات شامل کریں
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # ایم سی پی ٹول کے طور پر رجسٹر کریں
        # حقیقی نفاذ میں، آپ ایک ایسا ٹول بنائیں گے جو اینڈ پوائنٹ کو کال کرے گا
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

پچھلے کوڈ میں ہم نے:

- `EnterpriseAiIntegration` کلاس بنائی جو MCP کو Azure ML کے ساتھ مربوط کرتی ہے۔
- `execute_ml_pipeline` طریقہ نافذ کیا جو ان پٹ ڈیٹا کو MCP ٹولز کے ذریعے پروسیس کرتا ہے اور Azure ML کو ML پائپ لائن بھیجتا ہے۔
- `register_ml_model_as_tool` طریقہ نافذ کیا جو Azure ML ماڈل کو MCP ٹول کے طور پر رجسٹر کرتا ہے، جس میں ضروری ڈپلائمنٹ ماحول اور کمپیوٹ وسائل بنانا شامل ہے۔
- Azure ML ڈیٹا ٹائپس کو JSON اسکیمہ ٹائپس میں میپ کیا ٹول رجسٹریشن کے لیے۔
- طویل چلنے والے آپریشنز جیسے ML پائپ لائن کی تکمیل اور ماڈل رجسٹریشن کو ہینڈل کرنے کے لیے غیر ہم عصر پروگرامنگ استعمال کی۔

## اگلا کیا ہے

- [5.2 ملٹی موڈالیٹی](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->