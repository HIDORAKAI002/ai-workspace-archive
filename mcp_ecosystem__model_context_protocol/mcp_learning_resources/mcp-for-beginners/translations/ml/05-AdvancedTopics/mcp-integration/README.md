# ഇന്റർപ്രൈസ് ഇന്റഗ്രേഷൻ

എന്റർപ്രൈസ് പരിസരത്തിൽ MCP സർവറുകൾ നിർമ്മിക്കുമ്പോൾ, നിലവിലുള്ള AI പ്ലാറ്റ്‌ഫോമുകളുമായും സേവനങ്ങളുമായും സംയോജിപ്പിക്കേണ്ടതുണ്ടാകും. ഈ ഭാഗം Azure OpenAI, Microsoft AI Foundry തുടങ്ങിയ എന്റർപ്രൈസ് സിസ്റ്റങ്ങളുമായി MCP സംയോജിപ്പിക്കുന്നതിനെക്കുറിച്ച് ഉൾക്കൊള്ളിച്ചിരിക്കുന്നു, അവയിലൂടെ ഉയർന്ന നിലവാരമുള്ള AI കഴിവുകളും ടൂൾ ഓർക്കസ്ട്രേഷനും സാധ്യമാക്കുന്നു.

## പരിചയം

ഈ പാഠത്തിൽ, നിങ്ങൾ Model Context Protocol (MCP) എന്റർപ്രൈസ് AI സിസ്റ്റങ്ങളുമായും പ്രത്യേകിച്ച് Azure OpenAI, Microsoft AI Foundry എന്നിവയുമായും എങ്ങനെ സംയോജിപ്പിക്കാമെന്ന് പഠിക്കും. ഈ സംയോജിപ്പുകൾ ശക്തമായ AI മോഡലുകളും ടൂളുകളും ഉപയോഗപ്പെടുത്താൻ അനുവദിക്കുന്നതും MCPയുടെ വലുപ്പതും വിപുലീകരണതയും നിലനിർത്തുന്നതുമായിരിക്കും.

## പഠന ലക്ഷ്യങ്ങൾ

ഈ പാഠം കഴിഞ്ഞപ്പോൾ, നിങ്ങൾക്ക് സാധിക്കും:

- MCP-നെ Azure OpenAI-യുമായി സംയോജിപ്പിച്ച് അതിന്റെ AI കഴിവുകൾ ഉപയോഗപ്പെടുത്തുക.
- Azure OpenAI ഉപയോഗിച്ച് MCP ടൂൾ ഓർക്കസ്ട്രേഷൻ നടപ്പാക്കുക.
- ഉയർന്ന നിലവാരമുള്ള AI ഏജൻറ് കഴിവുകൾക്കായി MCP-നെ Microsoft AI Foundry-യുമായി സംയോജിപ്പിക്കുക.
- Azure Machine Learning (ML) ഉപയോഗിച്ച് ML പൈപ്പ്ലൈനുകൾ നടത്താനും മോഡലുകൾ MCP ടൂളുകളായി രജിസ്റ്റർ ചെയ്യാനും.

## Azure OpenAI സംയോജനം

Azure OpenAI GPT-4 പോലുള്ള ശക്തമായ AI മോഡലുകളിൽ ആക്‌സസ് നൽകുന്നു. MCP-നെ Azure OpenAI-യുമായി സംയോജിപ്പിക്കുന്നതിലൂടെ ഈ മോഡലുകൾ ഉപയോഗപ്പെടുത്തുന്നതിനൊപ്പം MCPയുടെ ടൂൾ ഓർക്കസ്ട്രേഷന്റെ ലचीലതയും നിലനിർത്താൻ സാധിക്കും.

### C# നടപ്പാക്കൽ

ഈ കോഡ് സ്നിപ്പറ്റിൽ, Azure OpenAI SDK ഉപയോഗിച്ച് MCP എങ്ങനെ സംയോജിപ്പിക്കാമെന്ന് കാണിക്കുന്നു.

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

മുൻകോഡിൽ, ഞങ്ങൾ:

- Azure OpenAI ക്ലയന്റിന് എൻഡ്‌പോയിന്റ്, ഡിപ്പ്ലോയ്മെന്റ് പേര്, API കീ എന്നിവ കോൺഫിഗർ ചെയ്‌തു.
- ടൂൾ പിന്തുണയുള്ള പൂർത്തീകരണങ്ങൾ നേടുന്നതിനുള്ള `GetCompletionWithToolsAsync` എന്ന മെത്തഡ് സൃഷ്ടിച്ചു.
- പസ്‌സിൽ ടൂൾ കോളുകൾ കൈകാര്യം ചെയ്‌തു.

നിങ്ങളുടെ MCP സർവർ ക്രമീകരണത്തിനു അനുസരിച്ച് യഥാർത്ഥ ടൂൾ കൈകാര്യം ചെയ്യൽ ലాజിക് നടപ്പാക്കാൻ ഞങ്ങൾ പ്രോത്സാഹിപ്പിക്കുന്നു.

## Microsoft Foundry സംയോജനം

Microsoft Foundry AI ഏജൻറുകൾ നിർമ്മിച്ച് ഡിപ്പ്ലോയ് ചെയ്യാനുള്ള ഒരു പ്ലാറ്റ്‌ഫോം ആണ്. MCP-നെ Microsoft Foundry-യുമായി സംയോജിപ്പിച്ച് അതിന്റെ കഴിവുകൾ ഉപയോഗപ്പെടുത്താനും MCPയുടെ ലചിലത നിലനിർത്താനും സാധിക്കും.

താഴെയുള്ള കോഡിൽ, MCP ഉപയോഗിച്ച് ആവശ്യങ്ങൾ പ്രോസസ്സ് ചെയ്ത് ടൂൾ കോളുകൾ കൈകാര്യം ചെയ്യുന്ന ഒരു ഏജന്റ് സംയോജനം വികസിപ്പിക്കുന്നു.

### ജാവ നടപ്പാക്കൽ

```java
// ജാവ എഐ ഫൗണ്ടറി ഏജന്റ് ഇന്റഗ്രേഷൻ
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
        // എഐ ഫൗണ്ടറി ഏജന്റ് അഭ്യർത്ഥന പ്രോസസ്സ് ചെയ്യുക
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // ഏജന്റ് ടൂളുകൾ ഉപയോഗിക്കാൻ അപേക്ഷിച്ചോയെന്ന് പരിശോധിക്കുക
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // ഓരോ ടൂൾ കോൾക്കും അനുയോജ്യമായ MCP ടൂളിലേക്ക് റൂട്ടുചെയ്യുക
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP ഉപയോഗിച്ച് ടൂൾ പ്രവർത്തിപ്പിക്കുക
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // എഐ ഫൗണ്ടറിയ്ക്ക് ടൂൾ പ്രതികരണം സൃഷ്ടിക്കുക
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // ടൂൾ പ്രതികരണം തിരികെ ഏജന്റിന് സമർപ്പിക്കുക
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

മുൻകോഡിൽ, ഞങ്ങൾ:

- AI Foundry-യുമായും MCP-യുമായും സംയോജിപ്പിക്കുന്ന `AIFoundryMcpBridge` ക്ലാസ് സൃഷ്ടിച്ചു.
- AI Foundry ഏജന്റ് അഭ്യർത്ഥന പ്രോസസ്സ് ചെയ്യുന്ന `processAgentRequest` മെത്തഡ് നടപ്പാക്കി.
- MCP ക്ലയന്റ് വഴിയുള്ള ടൂൾ കോളുകൾ നടപ്പാക്കിയെന്നും ഫലം AI Foundry ഏജентിലേക്ക് തിരികെ സമർപ്പിച്ചതായി കൈകാര്യം ചെയ്തു.

## MCP-നെ Azure ML-യുമായി സംയോജിപ്പിക്കൽ

MCP-നെ Azure Machine Learning (ML) വഴി സംയോജിപ്പിച്ച് Azureയുടെ ശക്തമായ ML കഴിവുകൾ ഉപയോഗപ്പെടുത്താനും MCPയുടെ ലചിലതയും നിലനിർത്താനും കഴിയും. ML പൈപ്പ്ലൈനുകൾ പ്രവർത്തിപ്പിക്കാനും മോഡലുകൾ ടൂൾസായി രജിസ്റ്റർ ചെയ്യാനും കമ്പ്യൂട്ട് റിസോഴ്സുകൾ മാനേജു ചെയ്യാനും ഈ സംയോജനം ഉപയോഗിക്കാം.

### പൈതൺ നടപ്പാക്കൽ

```python
# പൈതൺ ആസ്യൂർ എഐ ഇന്റഗ്രേഷൻ
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP ക്ലയന്റ് സെറ്റ് അപ്പ് ചെയ്യുക
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # ആസ്യൂർ ML ക്ലയന്റ് സജ്ജീകരിക്കുക
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # ആദ്യമായി ഇൻപുട്ട് ഡാറ്റ MCP ഉപകരണങ്ങൾ ഉപയോഗിച്ച് പ്രോസസ്സ് ചെയ്യുക
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # പൈപ്പ്‌ലൈൻ ആസ്യൂർ ML-ലേക്ക് സമർപ്പിക്കുക
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
        
        # ജോബ് വിവരങ്ങൾ മടക്കിക്കുക
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # മോഡൽ വിശദാംശങ്ങൾ നേടുക
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # ഡിപ്പ്ലോയ്മെന്റ് പരിസ്ഥിതി സൃഷ്ടിക്കുക
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # കംപ്യൂട്ട് സജ്ജീകരിക്കുക
        compute = self.ml_client.compute.get("mcp-inference")
        
        # മodel് ഓൺലൈൻ എണ്ഡ്പോയിന്റായി ഡിപ്ലോയ് ചെയ്യുക
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
        
        # മോഡൽ സ്‌കീമയുടെ അടിസ്ഥാനത്തിൽ MCP ടൂൾ സ്‌കീമ സൃഷ്ടിക്കുക
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # മോഡൽ സ്‌കീമയുടെ അടിസ്ഥാനത്തിൽ ഇൻപുട്ട് സ്വഭാവങ്ങൾ ചേർക്കുക
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP ടൂളായി രജിസ്റ്റർ ചെയ്യുക
        # യഥാർത്ഥ നടപടി നടപ്പിലാക്കലിൽ, എണ്ഡ്പോയിന്റ് വിളിക്കുന്ന ടൂൾ നിങ്ങൾ സൃഷ്ടിക്കും
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

മുൻകോഡിൽ, ഞങ്ങൾ:

- MCP-നുമായി Azure ML സംയോജിപ്പിക്കുന്ന `EnterpriseAiIntegration` ക്ലാസ് സൃഷ്ടിച്ചു.
- MCP ടൂളുകൾ ഉപയോഗിച്ച് ഇൻപുട്ട് ഡാറ്റ പ്രോസസ്സ് ചെയ്ത് Azure ML-യിലേക്ക് ML പൈപ്പ്‌ലൈൻ സമർപ്പിക്കുന്ന `execute_ml_pipeline` മെത്തഡ് നടപ്പാക്കി.
- Azure ML മോഡൽ MCP ടൂളായിരിക്കാൻ ആവശ്യമായ ഡിപ്പ്ലോയ്മെന്റ് പരിസരം, കമ്പ്യൂട്ട് റിസോഴ്സ് എന്നിവ സൃഷ്ടിച്ച് മോഡൽ രജിസ്റ്റർ ചെയ്യുന്ന `register_ml_model_as_tool` മെത്തഡ് നടപ്പാക്കി.
- ടൂൾ രജിസ്‌ട്രേഷനായി Azure ML ഡാറ്റാ ടൈപ്പുകൾ JSON സ്‌കീമ ടൈപ്പുകളിലേക്ക് മാപ്പ് ചെയ്‌തു.
- ML പൈപ്പ്ലൈൻ പ്രവർത്തനവും മോഡൽ രജിസ്ട്രേഷനും പോലുള്ള ദൈർഘ്യമുള്ള പ്രവർത്തനങ്ങൾ అసിങ്ക്രണസായി കൈകാര്യം ചെയ്യാൻ പ്രോഗ്രാമിങ് പ്രയോഗിച്ചു.

## അടുത്തത്

- [5.2 മൾട്ടി മോഡാലിറ്റി](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->