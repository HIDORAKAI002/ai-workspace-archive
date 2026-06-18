# การบูรณาการองค์กร

เมื่อสร้าง MCP Servers ในบริบทขององค์กร คุณมักจะต้องบูรณาการกับแพลตฟอร์มและบริการ AI ที่มีอยู่แล้ว ส่วนนี้กล่าวถึงวิธีการบูรณาการ MCP กับระบบองค์กรเช่น Azure OpenAI และ Microsoft AI Foundry เพื่อเปิดใช้งานความสามารถ AI ขั้นสูงและการจัดการเครื่องมือ

## บทนำ

ในบทเรียนนี้ คุณจะได้เรียนรู้วิธีการบูรณาการ Model Context Protocol (MCP) กับระบบ AI ในองค์กร โดยเน้นที่ Azure OpenAI และ Microsoft AI Foundry การบูรณาการเหล่านี้ช่วยให้คุณใช้ประโยชน์จากโมเดลและเครื่องมือ AI ที่ทรงพลัง ในขณะที่ยังคงความยืดหยุ่นและการขยายตัวของ MCP

## วัตถุประสงค์การเรียนรู้

เมื่อจบบทเรียนนี้ คุณจะสามารถ:

- บูรณาการ MCP กับ Azure OpenAI เพื่อใช้ความสามารถ AI ของมัน
- นำ MCP ไปใช้ในการจัดการเครื่องมือร่วมกับ Azure OpenAI
- รวม MCP กับ Microsoft AI Foundry เพื่อความสามารถเอเย่นต์ AI ขั้นสูง
- ใช้ Azure Machine Learning (ML) ในการประมวลผล pipeline ของ ML และลงทะเบียนโมเดลเป็นเครื่องมือของ MCP

## การบูรณาการกับ Azure OpenAI

Azure OpenAI ให้การเข้าถึงโมเดล AI ที่ทรงพลังเช่น GPT-4 และอื่น ๆ การบูรณาการ MCP กับ Azure OpenAI ช่วยให้คุณใช้โมเดลเหล่านี้ในขณะยังคงรักษาความยืดหยุ่นของการจัดการเครื่องมือของ MCP

### การใช้งานด้วย C#

ในตัวอย่างโค้ดนี้ เราจะแสดงวิธีการบูรณาการ MCP กับ Azure OpenAI โดยใช้ Azure OpenAI SDK

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
  
ในโค้ดก่อนหน้านี้ เราได้:

- กำหนดค่าไคลเอ็นต์ Azure OpenAI ด้วย endpoint, ชื่อ deployment และ API key
- สร้างเมธอด `GetCompletionWithToolsAsync` เพื่อรับคำตอบพร้อมการสนับสนุนเครื่องมือ
- จัดการการเรียกใช้เครื่องมือในคำตอบ

คุณได้รับคำแนะนำให้สร้างตรรกะการจัดการเครื่องมือที่แท้จริงตามการตั้งค่า MCP server เฉพาะของคุณ

## การบูรณาการกับ Microsoft Foundry

Microsoft Foundry มอบแพลตฟอร์มสำหรับสร้างและปรับใช้เอเย่นต์ AI การบูรณาการ MCP กับ Microsoft Foundry ช่วยให้คุณใช้ประโยชน์จากความสามารถของมันในขณะที่ยังคงรักษาความยืดหยุ่นของ MCP

ในโค้ดด้านล่างนี้ เราพัฒนาเอเย่นต์บูรณาการที่ประมวลผลคำขอและจัดการการเรียกใช้เครื่องมือโดยใช้ MCP

### การใช้งานด้วย Java

```java
// การผสานรวมเอเจนต์ Java AI Foundry
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
        // ประมวลผลคำขอของเอเจนต์ AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // ตรวจสอบว่าเอเจนต์ร้องขอใช้เครื่องมือหรือไม่
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // สำหรับแต่ละการเรียกเครื่องมือ ส่งไปยังเครื่องมือ MCP ที่เหมาะสม
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // ดำเนินการเครื่องมือโดยใช้ MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // สร้างการตอบกลับเครื่องมือสำหรับ AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // ส่งการตอบกลับเครื่องมือกลับไปยังเอเจนต์
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
  
ในโค้ดก่อนหน้านี้ เราได้:

- สร้างคลาส `AIFoundryMcpBridge` ที่บูรณาการกับทั้ง AI Foundry และ MCP
- นำเมธอด `processAgentRequest` ไปใช้ ซึ่งประมวลผลคำขอของเอเย่นต์ AI Foundry
- จัดการเรียกเครื่องมือโดยการประมวลผลผ่านไคลเอ็นต์ MCP และส่งผลลัพธ์กลับไปยังเอเย่นต์ AI Foundry

## การบูรณาการ MCP กับ Azure ML

การบูรณาการ MCP กับ Azure Machine Learning (ML) ช่วยให้คุณใช้ความสามารถ ML อันทรงพลังของ Azure พร้อมยังคงความยืดหยุ่นของ MCP การบูรณาการนี้สามารถใช้สำหรับการประมวลผล pipeline ของ ML การลงทะเบียนโมเดลเป็นเครื่องมือ และการจัดการทรัพยากรคำนวณ

### การใช้งานด้วย Python

```python
# การรวม Python กับ Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # ตั้งค่าไคลเอนต์ MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # ตั้งค่าไคลเอนต์ Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # ประมวลผลข้อมูลนำเข้าครั้งแรกโดยใช้เครื่องมือ MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # ส่ง pipeline ไปยัง Azure ML
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
        
        # คืนค่าข้อมูลงาน
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # รับรายละเอียดโมเดล
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # สร้างสภาพแวดล้อมสำหรับการปรับใช้
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # ตั้งค่าการคำนวณ
        compute = self.ml_client.compute.get("mcp-inference")
        
        # ปรับใช้โมเดลเป็น endpoint ออนไลน์
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
        
        # สร้างสกีมาของเครื่องมือ MCP ตามสกีมาของโมเดล
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # เพิ่มคุณสมบัติการนำเข้าตามสกีมาของโมเดล
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # ลงทะเบียนเป็นเครื่องมือ MCP
        # ในการใช้งานจริง คุณจะสร้างเครื่องมือที่เรียกใช้ endpoint
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
  
ในโค้ดก่อนหน้านี้ เราได้:

- สร้างคลาส `EnterpriseAiIntegration` ที่บูรณาการ MCP กับ Azure ML
- นำเมธอด `execute_ml_pipeline` ไปใช้ ซึ่งประมวลผลข้อมูลนำเข้าโดยใช้เครื่องมือ MCP และส่ง pipeline ของ ML ไปยัง Azure ML
- นำเมธอด `register_ml_model_as_tool` ไปใช้ ซึ่งลงทะเบียนโมเดล Azure ML เป็นเครื่องมือของ MCP รวมถึงสร้างสภาพแวดล้อม deployment และทรัพยากรคำนวณที่จำเป็น
- ทำการแมปประเภทข้อมูล Azure ML ไปเป็นชนิด JSON schema สำหรับการลงทะเบียนเครื่องมือ
- ใช้โปรแกรมแบบอะซิงโครนัสเพื่อจัดการกับงานที่อาจใช้เวลานาน เช่น การประมวลผล pipeline ML และการลงทะเบียนโมเดล

## สิ่งที่ต้องทำต่อไป

- [5.2 Multi modality](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->