# Επιχειρηματική Ενσωμάτωση

Κατά την κατασκευή MCP Servers σε επιχειρηματικό πλαίσιο, συχνά χρειάζεται να ενσωματώσετε με υπάρχουσες πλατφόρμες και υπηρεσίες τεχνητής νοημοσύνης. Αυτή η ενότητα καλύπτει τον τρόπο ενσωμάτωσης του MCP με συστήματα επιχειρήσεων όπως το Azure OpenAI και το Microsoft AI Foundry, επιτρέποντας προηγμένες δυνατότητες ΤΝ και ορχήστρωση εργαλείων.

## Εισαγωγή

Σε αυτό το μάθημα, θα μάθετε πώς να ενσωματώσετε το Model Context Protocol (MCP) με συστήματα τεχνητής νοημοσύνης επιχειρήσεων, επικεντρώνοντας στο Azure OpenAI και το Microsoft AI Foundry. Αυτές οι ενσωματώσεις σας επιτρέπουν να αξιοποιήσετε ισχυρά μοντέλα και εργαλεία ΤΝ ενώ διατηρείτε την ευελιξία και την επεκτασιμότητα του MCP.

## Στόχοι Μαθήματος

Στο τέλος αυτού του μαθήματος, θα μπορείτε να:

- Ενσωματώσετε το MCP με το Azure OpenAI για να αξιοποιήσετε τις δυνατότητες ΤΝ του.
- Υλοποιήσετε ορχήστρωση εργαλείων MCP με το Azure OpenAI.
- Συνδυάσετε το MCP με το Microsoft AI Foundry για προηγμένες δυνατότητες πράκτορα ΤΝ.
- Αξιοποιήσετε το Azure Machine Learning (ML) για εκτέλεση ML pipelines και καταχώρηση μοντέλων ως εργαλεία MCP.

## Ενσωμάτωση Azure OpenAI

Το Azure OpenAI παρέχει πρόσβαση σε ισχυρά μοντέλα ΤΝ όπως το GPT-4 και άλλα. Η ενσωμάτωση του MCP με το Azure OpenAI σας επιτρέπει να αξιοποιήσετε αυτά τα μοντέλα διατηρώντας την ευελιξία της ορχήστρωσης εργαλείων του MCP.

### Υλοποίηση C#

Σε αυτό το αποσπάσμα κώδικα, δείχνουμε πώς να ενσωματώσετε το MCP με το Azure OpenAI χρησιμοποιώντας το Azure OpenAI SDK.

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

Στον προηγούμενο κώδικα έχουμε:

- Παραμετροποιήσει τον πελάτη Azure OpenAI με το endpoint, όνομα ανάπτυξης και κλειδί API.
- Δημιουργήσει μια μέθοδο `GetCompletionWithToolsAsync` για να λαμβάνουμε συμπληρώσεις με υποστήριξη εργαλείων.
- Διαχειριστεί τις κλήσεις εργαλείων στην απόκριση.

Σας ενθαρρύνουμε να υλοποιήσετε την πραγματική λογική διαχείρισης εργαλείων βάση της συγκεκριμένης ρύθμισης του MCP server σας.

## Ενσωμάτωση Microsoft Foundry

Το Microsoft Foundry προσφέρει μια πλατφόρμα για κατασκευή και ανάπτυξη πρακτόρων ΤΝ. Η ενσωμάτωση του MCP με το Microsoft Foundry σας επιτρέπει να αξιοποιήσετε τις δυνατότητές του διατηρώντας παράλληλα την ευελιξία του MCP.

Στον παρακάτω κώδικα, αναπτύσσουμε μια ενσωμάτωση Πράκτορα που επεξεργάζεται αιτήσεις και διαχειρίζεται κλήσεις εργαλείων μέσω MCP.

### Υλοποίηση Java

```java
// Ενσωμάτωση Πράκτορα Java AI Foundry
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
        // Επεξεργασία του αιτήματος του Πράκτορα AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Έλεγχος εάν ο πράκτορας ζήτησε να χρησιμοποιήσει εργαλεία
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Για κάθε κλήση εργαλείου, δρομολόγησέ την στο κατάλληλο εργαλείο MCP
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Εκτέλεση του εργαλείου χρησιμοποιώντας MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Δημιουργία απάντησης εργαλείου για το AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Υποβολή απάντησης εργαλείου πίσω στον πράκτορα
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

Στον προηγούμενο κώδικα έχουμε:

- Δημιουργήσει μια κλάση `AIFoundryMcpBridge` που ενσωματώνεται τόσο με το AI Foundry όσο και με το MCP.
- Υλοποιήσει μια μέθοδο `processAgentRequest` που επεξεργάζεται αιτήσεις πράκτορα AI Foundry.
- Διαχειριστεί κλήσεις εργαλείων εκτελώντας τες μέσω του MCP client και υποβάλλοντας τα αποτελέσματα πίσω στον πράκτορα AI Foundry.

## Ενσωμάτωση MCP με το Azure ML

Η ενσωμάτωση MCP με το Azure Machine Learning (ML) σας επιτρέπει να αξιοποιήσετε τις ισχυρές δυνατότητες ML του Azure διατηρώντας την ευελιξία του MCP. Αυτή η ενσωμάτωση μπορεί να χρησιμοποιηθεί για την εκτέλεση ML pipelines, την καταχώρηση μοντέλων ως εργαλεία και τη διαχείριση πόρων υπολογισμού.

### Υλοποίηση Python

```python
# Ενσωμάτωση Python Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Ρύθμιση πελάτη MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Ρύθμιση πελάτη Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Πρώτα επεξεργαστείτε τα εισερχόμενα δεδομένα χρησιμοποιώντας εργαλεία MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Υποβολή του pipeline στο Azure ML
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
        
        # Επιστροφή πληροφοριών εργασίας
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Λήψη λεπτομερειών μοντέλου
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Δημιουργία περιβάλλοντος ανάπτυξης
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Ρύθμιση υπολογιστικού πόρου
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Ανάπτυξη μοντέλου ως διαδικτυακού endpoint
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
        
        # Δημιουργία σχήματος εργαλείου MCP βασισμένο στο σχήμα μοντέλου
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Προσθήκη ιδιοτήτων εισόδου βάσει του σχήματος μοντέλου
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Εγγραφή ως εργαλείο MCP
        # Σε μια πραγματική υλοποίηση, θα δημιουργούσατε ένα εργαλείο που καλεί το endpoint
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

Στον προηγούμενο κώδικα έχουμε:

- Δημιουργήσει μια κλάση `EnterpriseAiIntegration` που ενσωματώνει το MCP με το Azure ML.
- Υλοποιήσει μια μέθοδο `execute_ml_pipeline` που επεξεργάζεται εισερχόμενα δεδομένα χρησιμοποιώντας εργαλεία MCP και υποβάλλει ένα ML pipeline στο Azure ML.
- Υλοποιήσει μια μέθοδο `register_ml_model_as_tool` που καταχωρεί ένα μοντέλο Azure ML ως εργαλείο MCP, περιλαμβάνοντας τη δημιουργία του αναγκαίου περιβάλλοντος ανάπτυξης και πόρων υπολογισμού.
- Αντιστοιχίσει τύπους δεδομένων Azure ML σε τύπους JSON schema για την καταχώρηση εργαλείων.
- Χρησιμοποιήσει ασύγχρονο προγραμματισμό για τη διαχείριση ενδεχομένως μακροχρόνιων εργασιών όπως η εκτέλεση ML pipeline και η καταχώρηση μοντέλων.

## Τι ακολουθεί

- [5.2 Πολλαπλή μορφολογία](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->