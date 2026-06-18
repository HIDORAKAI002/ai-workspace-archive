# ఎంటర్‌ప్రైజ్ ఇంటిగ్రేషన్

ఎంటర్‌ప్రైజ్ సందర్భంలో MCP సర్వర్లను నిర్మిస్తునప్పుడు, మీరు తరచుగా ఇప్పటికే ఉన్న AI ప్లాట్‌ఫారమ్‌లు మరియు సేవల‌తో ఇంటిగ్రేట్ చేయాల్సి ఉంటుంది. ఈ విభాగం MCP ను Azure OpenAI మరియు Microsoft AI Foundry వంటి ఎంటర్‌ప్రైజ్ సిస్టమ్‌ల‌తో ఎలా ఇంటిగ్రేట్ చేయాలో కవర్ చేస్తుంది, తద్వారా అధునాతన AI సామర్ధ్యాలు మరియు టూల్ ఆర్క్ట్రేషన్ సాధ్యమవుతుంది.

## పరిచయం

ఈ పాఠంలో, మీరు Model Context Protocol (MCP) ను ఎంటర్‌ప్రైజ్ AI సిస్టమ్‌ల‌తో, ముఖ్యంగా Azure OpenAI మరియు Microsoft AI Foundryతో, ఎలా ఇంటిగ్రేట్ చేయాలో నేర్చుకుంటారు. ఈ ఇంటిగ్రేషన్లు శక్తివంతమైన AI మోడళ్లను మరియు టూల్స్‌ను ఉపయోగించుకోవడానికి వీలు కల్పిస్తాయి, అదేవిధంగా MCP యొక్క సౌలభ్యకరత మరియు విస్తరణ సామర్థ్యాన్ని ఉంచేవి.

## నేర్చుకోవాల్సిన లక్ష్యాలు

ఈ పాఠం చివరికి, మీరు చేయగలుగుతారు:

- MCP ను Azure OpenAI తో ఇంటిగ్రేట్ చేసి దాని AI సామర్థ్యాలను ఉపయోగించడం.
- Azure OpenAIతో MCP టూల్ ఆర్క్ట్రేషనును అమలు చేయడం.
- Microsoft AI Foundryతో MCP ను కంబైన్ చేసి అధునాతన AI ఏజెంట్ సామర్థ్యాలను అందించడం.
- Azure Machine Learning (ML) ను ML పైప్లైన్లను అమలు చేయడానికి మరియు MCP టూల్స్‌గా మోడల్స్‌ను రిజిస్టర్ చేయడానికి ఉపయోగించడం.

## Azure OpenAI ఇంటిగ్రేషన్

Azure OpenAI GPT-4 మరియు ఇతర శక్తివంతమైన AI మోడల్స్‌కి ప్రాప్తి ఇస్తుంది. MCP ను Azure OpenAIతో ఇంటిగ్రేట్ చేయడం దీన్ని ఉపయోగించుకునేందుకు మరియు MCP యొక్క టూల్ ఆర్క్ట్రేషన్ యొక్క సౌలభ్యకతను ఉంచేందుకు అనుమతిస్తుంది.

### C# అమలు

ఈ కోడ్ స్నిపెట్‌లో, మేము Azure OpenAI SDK ను ఉపయోగించి MCP ను Azure OpenAIతో ఎలా ఇంటిగ్రేట్ చేయాలో చూపిస్తున్నాము.

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

మునుపటి కోడ్‌లో మేము:

- ఎండ్‌పాయింట్, డిప్లాయ్‌మెంట్ పేరు మరియు API కీతో Azure OpenAI క్లయింట్ ను కన్‌ఫిగర్ చేశాము.
- టూల్ మద్దతుతో కంప్లీషన్స్ పొందడానికి `GetCompletionWithToolsAsync` మేతడ్‌ను సృష్టించాము.
- రెస్పాన్స్‌లో టూల్ కాల్స్‌ను నిర్వహించాము.

మీరు మీ ప్రత్యేక MCP సర్వర్ సెటప్ ఆధారంగా వాస్తవ టూల్ హ్యాండ్లింగ్ లాజిక్‌ను అమలు చేయడం ఉత్తమం.

## Microsoft Foundry ఇంటిగ్రేషన్

Microsoft Foundry AI ఏజెంట్లను నిర్మించడానికి మరియు పంపిణీ చేయడానికి వేదికను అందజేస్తుంది. MCP ను Microsoft Foundryతో ఇంటిగ్రేట్ చేయడం దాని సామర్థ్యాలను ఉపయోగించేటప్పుడు MCP యొక్క సౌలభ్యకతను నిలుపుతుంది.

క్రింది కోడ్‌లో, మేము MCPని ఉపయోగించి అభ్యర్థనలను ప్రాసెస్ చేసి టూల్ కాల్స్‌ను హ్యాండిల్ చేసే ఏజెంట్ ఇంటిగ్రేషన్‌ను డెవలప్ చేస్తున్నాము.

### Java అమలు

```java
// జావా AI ఫౌండ్రీ ఏజెంట్ సమగ్రకం
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
        // AI ఫౌండ్రీ ఏజెంట్ అభ్యర్థనను ప్రాసెస్ చేయండి
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // ఏజెంట్ టూల్స్ ఉపయోగించమని అభ్యర్థించిందో లేదో తనిఖీ చేయండి
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // ప్రతి టూల్ కాల్ కోసం, దాన్ని సరైన MCP టూల్‌కి రోట్ చేయండి
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP ఉపయోగించి టూల్‌ని అమలు చేయండి
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI ఫౌండ్రీ కోసం టూల్ ప్రతిస్పందనను సృష్టించండి
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // టూల్ ప్రతిస్పందనను తిరిగి ఏజెంట్‌కి సమర్పించండి
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

మునుపటి కోడ్‌లో మేము:

- AI Foundry మరియు MCP రెండింటి తో ఇంటిగ్రేట్ అయ్యే `AIFoundryMcpBridge` క్లాస్‌ను సృష్టించాము.
- AI Foundry ఏజెంట్ అభ్యర్థనలను ప్రాసెస్ చేసే `processAgentRequest` మెతడ్‌ను అమలు చేసాము.
- టూల్ కాల్స్‌ను MCP క్లయింట్ ద్వారా అమలు చేసి ఫలితాలను AI Foundry ఏజెంట్‌కు తిరిగి సమర్పించడం ద్వారా నిర్వహించాము.

## MCP ను Azure MLతో ఇంటిగ్రేట్ చేయడం

MCP ను Azure Machine Learning (ML)తో ఇంటిగ్రేట్ చేయడం ద్వారా మీరు Azure యొక్క శక్తివంతమైన ML సామర్థ్యాలను ఉపయోగించుకునేంత వరకు MCP యొక్క సౌలభ్యకతను నిలుపుకోవచ్చు. ఈ ఇంటిగ్రేషన్ ML పైప్లైన్లను అమలు చేయడానికి, మోడల్స్‌ను టూల్‌లుగా రిజిస్టర్ చేయడానికి మరియు కంప్యూట్ వనరులను నిర్వహించడానికి ఉపయోగపడుతుంది.

### Python అమలు

```python
# పైథాన్ అజ్యూర్ AI ఏకీకరణ
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP క్లయింట్ సెట్ చేసుకోండి
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # అజ్యూర్ ML క్లయింట్ సెట్ చేసుకోండి
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # మొదట MCP టూల్స్ ఉపయోగించి ఇన్‌పుట్ డేటాను ప్రోసెస్ చేయండి
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # పైన్లైన్‌ను అజ్యూర్ ML కి సమర్పించండి
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
        
        # జాబ్ సమాచారం రిటర్న్ చేయండి
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # మోడల్ వివరాలు పొందండి
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # డిప్లాయ్‌మెంట్ వాతావరణాన్ని సృష్టించండి
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # కంఫ్యూట్ సెట్ చేసుకోండి
        compute = self.ml_client.compute.get("mcp-inference")
        
        # మోడల్‌ను ఆన్‌లైన్ ఎండ్పాయింట్‌గా డిప్లాయ్ చేయండి
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
        
        # మోడల్ స్కీమాపై ఆధారపడి MCP టూల్ స్కీమాను సృష్టించండి
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # మోడల్ స్కీమా ఆధారంగా ఇన్‌పుట్ లక్షణాలు జోడించండి
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP టూల్‌గా రిజిస్టర్ చేసుకోండి
        # నిజమైన అమలులో, మీరు ఎండ్పాయింట్‌ను కాల్ చేసే ఒక టూల్‌ను సృష్టిస్తారు
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

మునుపటి కోడ్‌లో మేము:

- MCPను Azure MLతో ఇంటిగ్రేట్ చేసే `EnterpriseAiIntegration` క్లాస్‌ను సృష్టించాము.
- ইন్ఫుట్ డేటాను MCP టూల్స్ ద్వారా ప్రాసెస్ చేసి Azure ML కు ML పైప్లైన్ సమర్పించే `execute_ml_pipeline` మెతడ్‌ను అమలు చేశాము.
- అవసరమైన డిప్లాయ్‌మెంట్ వాతావరణం మరియు కంప్యూట్ వనరులు సృష్టించడంలతో పాటు Azure ML మోడల్‌ను MCP టూల్‌గా రిజిస్టర్ చేసే `register_ml_model_as_tool` మెతడ్‌ను అమలు చేశాము.
- టూల్ రిజిస్ట్రేషన్ కోసం Azure ML డేటా టైప్స్‌ను JSON స్కీమా టైప్స్‌కు మ్యాప్ చేశారు.
- ML పైప్లైన్ అమలు మరియు మోడల్ రిజిస్ట్రేషన్ లాంటి పొడుగు-కాలం ఆపరేషన్లను హ్యాండిల్ చేయడానికి అసింక్రోనస్ ప్రోగ్రామింగ్ ఉపయోగించాము.

## తరువాతి దశ

- [5.2 మల్టీ మోడాలిటీ](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->