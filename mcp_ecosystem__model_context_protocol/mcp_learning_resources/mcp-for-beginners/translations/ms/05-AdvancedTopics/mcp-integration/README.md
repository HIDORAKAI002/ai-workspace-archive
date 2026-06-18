# Integrasi Perusahaan

Apabila membina Server MCP dalam konteks perusahaan, anda sering perlu mengintegrasikan dengan platform dan perkhidmatan AI sedia ada. Bahagian ini merangkumi cara mengintegrasikan MCP dengan sistem perusahaan seperti Azure OpenAI dan Microsoft AI Foundry, membolehkan keupayaan AI lanjutan dan orkestrasi alat.

## Pengenalan

Dalam pelajaran ini, anda akan belajar bagaimana mengintegrasikan Model Context Protocol (MCP) dengan sistem AI perusahaan, tertumpu pada Azure OpenAI dan Microsoft AI Foundry. Integrasi ini membolehkan anda memanfaatkan model dan alat AI yang berkuasa sambil mengekalkan fleksibiliti dan kebolehusuaian MCP.

## Objektif Pembelajaran

Menjelang akhir pelajaran ini, anda akan dapat:

- Mengintegrasikan MCP dengan Azure OpenAI untuk memanfaatkan keupayaan AI-nya.
- Melaksanakan orkestrasi alat MCP dengan Azure OpenAI.
- Menggabungkan MCP dengan Microsoft AI Foundry untuk keupayaan ejen AI yang lanjutan.
- Memanfaatkan Azure Machine Learning (ML) untuk melaksanakan saluran paip ML dan mendaftar model sebagai alat MCP.

## Integrasi Azure OpenAI

Azure OpenAI menyediakan akses kepada model AI yang berkuasa seperti GPT-4 dan lain-lain. Mengintegrasikan MCP dengan Azure OpenAI membolehkan anda menggunakan model ini sambil mengekalkan fleksibiliti orkestrasi alat MCP.

### Pelaksanaan C#

Dalam petikan kod ini, kami menunjukkan cara mengintegrasikan MCP dengan Azure OpenAI menggunakan Azure OpenAI SDK.

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

Dalam kod sebelum ini kami telah:

- Mengkonfigurasi klien Azure OpenAI dengan titik akhir, nama penempatan dan kunci API.
- Membuat kaedah `GetCompletionWithToolsAsync` untuk mendapatkan penyelesaian dengan sokongan alat.
- Mengendalikan panggilan alat dalam respons.

Anda digalakkan untuk melaksanakan logik pengendalian alat sebenar berdasarkan persediaan server MCP anda yang khusus.

## Integrasi Microsoft Foundry

Microsoft Foundry menyediakan platform untuk membina dan melaksanakan ejen AI. Mengintegrasikan MCP dengan Microsoft Foundry membolehkan anda memanfaatkan keupayaannya sambil mengekalkan fleksibiliti MCP.

Dalam kod di bawah, kami membangunkan integrasi Ejen yang memproses permintaan dan mengendalikan panggilan alat menggunakan MCP.

### Pelaksanaan Java

```java
// Integrasi Ejen Java AI Foundry
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
        // Proses permintaan Ejen AI Foundry
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // Semak jika ejen meminta menggunakan alat
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // Untuk setiap panggilan alat, lalukan ke alat MCP yang sesuai
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // Laksanakan alat menggunakan MCP
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // Buat tindak balas alat untuk AI Foundry
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // Hantar balik tindak balas alat kepada ejen
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

Dalam kod sebelum ini, kami telah:

- Mencipta kelas `AIFoundryMcpBridge` yang mengintegrasikan kedua-dua AI Foundry dan MCP.
- Melaksanakan kaedah `processAgentRequest` yang memproses permintaan ejen AI Foundry.
- Mengendalikan panggilan alat dengan melaksanakannya melalui klien MCP dan menyerahkan hasil kembali kepada ejen AI Foundry.

## Mengintegrasikan MCP dengan Azure ML

Mengintegrasikan MCP dengan Azure Machine Learning (ML) membolehkan anda memanfaatkan keupayaan ML Azure yang berkuasa sambil mengekalkan fleksibiliti MCP. Integrasi ini boleh digunakan untuk melaksanakan saluran paip ML, mendaftar model sebagai alat, dan mengurus sumber pengkomputeran.

### Pelaksanaan Python

```python
# Integrasi Python Azure AI
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # Sediakan klien MCP
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Sediakan klien Azure ML
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # Pertama proses data input menggunakan alat MCP
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Hantar saluran kerja ke Azure ML
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
        
        # Pulangkan maklumat kerja
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # Dapatkan butiran model
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # Cipta persekitaran penerapan
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # Sediakan pengkomputeran
        compute = self.ml_client.compute.get("mcp-inference")
        
        # Terapkan model sebagai titik akhir dalam talian
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
        
        # Cipta skema alat MCP berdasarkan skema model
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # Tambah sifat input berdasarkan skema model
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # Daftar sebagai alat MCP
        # Dalam pelaksanaan sebenar, anda akan mencipta alat yang memanggil titik akhir
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

Dalam kod sebelum ini, kami telah:

- Mencipta kelas `EnterpriseAiIntegration` yang mengintegrasikan MCP dengan Azure ML.
- Melaksanakan kaedah `execute_ml_pipeline` yang memproses data input menggunakan alat MCP dan menyerahkan saluran paip ML kepada Azure ML.
- Melaksanakan kaedah `register_ml_model_as_tool` yang mendaftar model Azure ML sebagai alat MCP, termasuk mencipta persekitaran penempatan dan sumber pengkomputeran yang diperlukan.
- Memetakan jenis data Azure ML kepada jenis skema JSON untuk pendaftaran alat.
- Menggunakan pengaturcaraan tak segerak untuk mengendalikan operasi yang mungkin mengambil masa lama seperti pelaksanaan saluran paip ML dan pendaftaran model.

## Apa seterusnya

- [5.2 Multi modaliti](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->