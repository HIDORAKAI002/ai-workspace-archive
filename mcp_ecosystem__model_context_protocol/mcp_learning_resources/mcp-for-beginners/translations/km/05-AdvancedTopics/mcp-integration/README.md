# សមាសភាពអង្គភាពសហគ្រាស

ពេលកសាងម៉ាស៊ីនមេ MCP នៅក្នុងបរិបទសហគ្រាស ប្រហែលជាអ្នកត្រូវចូលរួមសមាសភាពជាមួយវេទិកានិងសេវាកម្ម AI ទើបមានរួចជាមុន។ ផ្នែកនេះគ្របដណ្តប់ពីរបៀបបញ្ចូល MCP ជាមួយប្រព័ន្ធសហគ្រាសដូចជា Azure OpenAI និង Microsoft AI Foundry ដែលអាចបើកមានសមត្ថភាព AI ជំនាញ និងការគ្រប់គ្រងឧបករណ៍។

## ការណែនាំ

ក្នុងមេរៀននេះ អ្នកនឹងរៀនពីរបៀបបញ្ចូល Model Context Protocol (MCP) ជាមួយប្រព័ន្ធ AI សហគ្រាស ដោយផ្តោតលើ Azure OpenAI និង Microsoft AI Foundry។ ការបញ្ចូលទាំងនេះអនុញ្ញាតឲ្យអ្នកប្រើប្រាស់ម៉ូដែល AI អាចម៍ជាទំនើប និងឧបករណ៍ខណៈដែលរក្សាងារស្មាតលឿននិងអាចពង្រីកបានរបស់ MCP។

## គោលបំណងរៀន

នៅចប់មេរៀននេះ អ្នកនឹងអាច៖

- បញ្ចូល MCP ជាមួយ Azure OpenAI ដើម្បីប្រើប្រាស់សមត្ថភាព AI របស់វា។
- អនុវត្តប្រេសករណ៍ការគ្រប់គ្រងឧបករណ៍ MCP ជាមួយ Azure OpenAI។
- បញ្ចូល MCP ជាមួយ Microsoft AI Foundry សម្រាប់សមត្ថភាពភ្នាក់ងារត្រឹមត្រូវ AI ជំនាន់ខ្ពស់។
- ប្រើប្រាស់ Azure Machine Learning (ML) សម្រាប់បញ្ជារប្រតិបត្តិការប្រព័ន្ធ ML និងចុះបញ្ជីម៉ូដែលជា​ឧបករណ៍ MCP។

## ការបញ្ចូល Azure OpenAI

Azure OpenAI ផ្ដល់ចូលដំណើរការទៅម៉ូដែល AI ដូចជា GPT-4 និងម៉ូដែលផ្សេងៗទៀត។ ការបញ្ចូល MCP ជាមួយ Azure OpenAI អនុញ្ញាតឲ្យអ្នកប្រើម៉ូដែលទាំងនេះ ខណៈដែលរក្សាការស្វែងរកនៃការគ្រប់គ្រងឧបករណ៍របស់ MCP។

### ការអនុវត្ត នៅ C#

ក្នុងកូដខាងលើ យើងបង្ហាញពីរបៀបបញ្ចូល MCP ជាមួយ Azure OpenAI ដោយប្រើ Azure OpenAI SDK។

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

ក្នុងកូដខាងលើ យើងបាន៖

- កំណត់អតិថិជន Azure OpenAI ជាមួយចំណុចបញ្ចប់ ឈ្មោះការចែកចាយ និងកូដ API។
- បង្កើតវិធីសាស្រ្ត `GetCompletionWithToolsAsync` ដើម្បីទទួលបានការបញ្ចប់ជាមួយការគាំទ្រឧបករណ៍។
- គ្រប់គ្រងការហៅឧបករណ៍នៅក្នុងការឆ្លើយតប។

អ្នកត្រូវបានលើកទឹកចិត្តអោយអនុវត្តល្បងការគ្រប់គ្រងឧបករណ៍ពិតប្រាកដ ដោយផ្អែកលើកំណត់រចនាសម្ព័ន្ធម៉ាស៊ីនមេ MCP របស់អ្នក។

## ការបញ្ចូល Microsoft Foundry

Microsoft Foundry ផ្ដល់វេទិកាសម្រាប់កសាងនិងចែកចាយភ្នាក់ងារ AI។ ការបញ្ចូល MCP ជាមួយ Microsoft Foundry អនុញ្ញាតឲ្យអ្នកប្រើសមត្ថភាពរបស់វា ខណៈរក្សាការស្មាតលឿននិងអាចពង្រីកបានរបស់ MCP។

ក្នុងកូដខាងក្រោម យើងបង្កើតការបញ្ចូលភ្នាក់ងារដែលដំណើរការសំណើរ និងគ្រប់គ្រងការហៅឧបករណ៍តាមរយៈ MCP។

### ការអនុវត្តនៅ Java

```java
// ការរួមបញ្ចូល Python AI Foundry Agent
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
        // ដំណើរការសំណើ AI Foundry Agent
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // ពិនិត្យថាម៉ាស៊ីនត្រូវបានសុំប្រើឧបករណ៍ឬទេ
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // សម្រាប់ការហៅឧបករណ៍មួយៗ នាំវាទៅឧបករណ៍ MCP សមស្រប
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // បំពេញការប្រតិបត្តិការឧបករណ៍ដោយប្រើ MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // បង្កើតការឆ្លើយតបឧបករណ៍សម្រាប់ AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // ទាញយកការឆ្លើយតបឧបករណ៍ត្រឡប់ទៅម៉ាស៊ីន
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

ក្នុងកូដខាងលើ យើងបាន៖

- បង្កើតថ្នាក់ `AIFoundryMcpBridge` ដែលបញ្ចូលរវាង AI Foundry និង MCP ។
- អនុវត្តវិធីសាស្រ្ត `processAgentRequest` ដែលដំណើរការសំណើរ ភ្នាក់ងារ AI Foundry។
- គ្រប់គ្រងការហៅឧបករណ៍ដោយអនុវត្តតាមរយៈអតិថិជន MCP ហើយដាក់លទ្ធផលត្រឡប់ទៅភ្នាក់ងារ AI Foundry។

## ការបញ្ចូល MCP ជាមួយ Azure ML

ការបញ្ចូល MCP ជាមួយ Azure Machine Learning (ML) អនុញ្ញាតឲ្យអ្នកប្រើសមត្ថភាព ML ខ្លាំងរបស់ Azure ខណៈការរក្សាអាចលូតលាស់និងអាចពង្រីកបានរបស់ MCP។ ការបញ្ចូលនេះអាចប្រើដើម្បីរត់បណ្តាញ ML ចុះបញ្ជីម៉ូដែលជា​ឧបករណ៍ និងគ្រប់គ្រងធនធានកុំព្យូទ័រ។

### ការអនុវត្តនៅ Python

```python
# ការរួមបញ្ចូល Python Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # កំណត់អតិថិជន MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # កំណត់អតិថិជន Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # ដំណើរការដំបូងទិន្នន័យបញ្ចូលដោយប្រើឧបករណ៍ MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # ស្នើសុំបណ្ដាញដំណើរការទៅ Azure ML
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
        
        # ត្រឡប់ព័ត៌មានការងារ
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # ទទួលបានព័ត៌មានលម្អិតម៉ូដែល
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # បង្កើតបរិស្ថានការដាក់ចេញ
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # កំណត់កុំព្យូទ័រ
        compute = self.ml_client.compute.get("mcp-inference")
        
        # ដាក់ម៉ូដែលជាចំណុចចេញអនឡាញ
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
        
        # បង្កើតស្កេម៉ាឧបករណ៍ MCP ផ្អែកលើស្កេម៉ាម៉ូដែល
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # បន្ថែមលក្ខណៈបញ្ចូលផ្អែកលើស្កេម៉ាម៉ូដែល
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # ចុះបញ្ជីជា​ឧបករណ៍ MCP
        # ក្នុងការអនុវត្តពិតប្រាកដ អ្នកនឹងបង្កើតឧបករណ៍ដែលហៅចំណុចចេញ
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

ក្នុងកូដខាងលើ យើងបាន៖

- បង្កើតថ្នាក់ `EnterpriseAiIntegration` ដែលបញ្ចូល MCP ជាមួយ Azure ML។
- អនុវត្តវិធីសាស្រ្ត `execute_ml_pipeline` ដែលដំណើរការទិន្នន័យបញ្ចូលដោយប្រើឧបករណ៍ MCP ហើយដាក់បញ្ជូនបណ្តាញ ML ទៅ Azure ML។
- អនុវត្តវិធីសាស្រ្ត `register_ml_model_as_tool` ដែលចុះបញ្ជីម៉ូដែល Azure ML ជា​ឧបករណ៍ MCP រួមទាំងការបង្កើតបរិយាកាសចែកចាយ និងធនធានកុំព្យូទ័រដែលចាំបាច់។
- ផ្គូផ្គងប្រភេទទិន្នន័យ Azure ML ទៅប្រភេទ schema JSON សម្រាប់ចុះបញ្ជីឧបករណ៍។
- ប្រើកម្មវិធីអស៊ីនខ្រុន (asynchronous) ដើម្បីគ្រប់គ្រងប្រតិបត្តិការយឺតអាចកើតមានដូចជាការប្រតិបត្តិបណ្តាញ ML និងការចុះបញ្ជីម៉ូដែល។

## អ្វីដែលមកបន្ទាប់

- [5.2 ម៉ូដែលមួយច្រើន](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->