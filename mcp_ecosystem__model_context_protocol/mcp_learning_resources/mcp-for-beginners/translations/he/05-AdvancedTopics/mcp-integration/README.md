# אינטגרציה ארגונית

כאשר בונים שרתי MCP בהקשר ארגוני, לעיתים קרובות יש צורך להתממשק עם פלטפורמות ושירותי AI קיימים. החלק הזה מכסה כיצד לשלב את MCP עם מערכות ארגוניות כמו Azure OpenAI ו-Microsoft AI Foundry, המאפשרים יכולות AI מתקדמות ושליטה יחסית בכלים.

## הקדמה

בשיעור זה, תלמד כיצד לשלב את פרוטוקול הקשר מודל (MCP) עם מערכות AI ארגוניות, תוך התמקדות ב-Azure OpenAI וב-Microsoft AI Foundry. אינטגרציות אלו מאפשרות לך לנצל דגמי AI חזקים וכלים תוך שמירה על הגמישות וההרחבה של MCP.

## יעדי הלמידה

בסיום שיעור זה תוכל:

- לשלב MCP עם Azure OpenAI כדי לנצל את יכולות ה-AI שלה.
- ליישם תיאום כלים MCP עם Azure OpenAI.
- לשלב MCP עם Microsoft AI Foundry ליכולות סוכן AI מתקדמות.
- לנצל את Azure Machine Learning (ML) לביצוע צינורות ML ורישום דגמים ככלים ב-MCP.

## אינטגרציית Azure OpenAI

Azure OpenAI מספקת גישה לדגמי AI חזקים כמו GPT-4 ואחרים. שילוב MCP עם Azure OpenAI מאפשר לך להשתמש בדגמים אלה תוך שמירה על גמישות תיאום הכלים של MCP.

### יישום ב-C#

בקטע הקוד הזה, אנו מראים כיצד לשלב את MCP עם Azure OpenAI באמצעות Azure OpenAI SDK.

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

בקוד הקודם עשינו:

- קונפיגורציה של לקוח Azure OpenAI עם נקודת הקצה, שם הפריסה ומפתח ה-API.
- יצירת מתודה `GetCompletionWithToolsAsync` לקבלת השלמות עם תמיכה בכלים.
- טיפול בקריאות כלים בתגובה.

מומלץ שתיישם את הלוגיקה לטיפול בכלים בהתאם להגדרת שרת MCP הספציפית שלך.

## אינטגרציית Microsoft Foundry

Microsoft Foundry מספקת פלטפורמה לבניית פריסת סוכני AI. שילוב MCP עם Microsoft Foundry מאפשר לך לנצל את יכולותיה תוך שמירה על גמישות MCP.

בקטע הקוד למטה, אנו מפתחים אינטגרציית סוכן שמעבד בקשות ומטפל בקריאות כלים באמצעות MCP.

### יישום ב-Java

```java
// אינטגרציה של סוכן Java AI Foundry
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
        // עיבוד בקשת סוכן AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // בדוק אם הסוכן ביקש להשתמש בכלים
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // עבור כל קריאת כלי, נהל זאת לכלי MCP המתאים
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // הפעל את הכלי באמצעות MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // צור תגובת כלי עבור AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // הגש את תגובת הכלי חזרה לסוכן
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

בקוד הקודם עשינו:

- יצירת מחלקת `AIFoundryMcpBridge` שמשלבת בין AI Foundry לבין MCP.
- מימוש מתודה `processAgentRequest` שמעבדת בקשה מסוכן AI Foundry.
- טיפול בקריאות כלים באמצעות ביצוען דרך לקוח MCP ושליחת התוצאות חזרה לסוכן AI Foundry.

## שילוב MCP עם Azure ML

שילוב MCP עם Azure Machine Learning (ML) מאפשר לך לנצל את יכולות ה-ML החזקות של Azure תוך שמירה על הגמישות של MCP. אינטגרציה זו מאפשרת הפעלת צינורות ML, רישום דגמים ככלים וניהול משאבי חישוב.

### יישום בפייתון

```python
# אינטגרציית Python עם Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # הגדר לקוח MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # הגדר לקוח Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # עיבוד ראשוני של נתוני הקלט באמצעות כלי MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # שלח את הצנרת ל-Azure ML
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
        
        # החזר מידע על המשימה
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # קבל פרטי המודל
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # צור סביבת פריסה
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # הגדר חישוב
        compute = self.ml_client.compute.get("mcp-inference")
        
        # פרוס את המודל כנקודת קצה מקוונת
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
        
        # צור סכמת כלי MCP בהתבסס על סכמת המודל
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # הוסף מאפייני קלט בהתבסס על סכמת המודל
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # רשם ככלי MCP
        # ביישום אמיתי, תיצור כלי שקורא לנקודת הקצה
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

בקוד הקודם עשינו:

- יצירת מחלקת `EnterpriseAiIntegration` שמשלבת את MCP עם Azure ML.
- מימוש מתודה `execute_ml_pipeline` שטוענת נתוני קלט באמצעות כלים של MCP ומגישה צינור ML ל-Azure ML.
- מימוש מתודה `register_ml_model_as_tool` שרושמת דגם Azure ML ככלי MCP, כולל יצירת סביבה ופריסת משאבים.
- מיפוי סוגי הנתונים של Azure ML לסכמות JSON לרישום כלי.
- שימוש בתכנות אסינכרוני לטיפול בפעולות ארוכות כמו הפעלת צינורות ML ורישום דגמים.

## מה הלאה

- [5.2 מולטי מודאליות](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->