# 엔터프라이즈 통합

엔터프라이즈 환경에서 MCP 서버를 구축할 때 기존 AI 플랫폼 및 서비스와 통합해야 하는 경우가 많습니다. 이 섹션에서는 Azure OpenAI 및 Microsoft AI Foundry와 같은 엔터프라이즈 시스템과 MCP를 통합하는 방법을 다루며, 이를 통해 고급 AI 기능과 도구 오케스트레이션을 구현할 수 있습니다.

## 소개

이 수업에서는 Azure OpenAI와 Microsoft AI Foundry에 중점을 두고 모델 컨텍스트 프로토콜(MCP)을 엔터프라이즈 AI 시스템과 통합하는 방법을 배우게 됩니다. 이러한 통합을 통해 강력한 AI 모델과 도구를 활용하는 동시에 MCP의 유연성과 확장성을 유지할 수 있습니다.

## 학습 목표

이 수업이 끝나면 다음을 수행할 수 있습니다:

- MCP를 Azure OpenAI와 통합하여 AI 기능을 활용할 수 있습니다.
- Azure OpenAI와 함께 MCP 도구 오케스트레이션을 구현할 수 있습니다.
- MCP를 Microsoft AI Foundry와 결합하여 고급 AI 에이전트 기능을 활용할 수 있습니다.
- Azure 머신러닝(ML)을 활용하여 ML 파이프라인을 실행하고 모델을 MCP 도구로 등록할 수 있습니다.

## Azure OpenAI 통합

Azure OpenAI는 GPT-4 등 강력한 AI 모델에 접근할 수 있는 기능을 제공합니다. MCP를 Azure OpenAI와 통합하면 MCP의 도구 오케스트레이션 유연성을 유지하면서 이러한 모델을 활용할 수 있습니다.

### C# 구현

다음 코드 스니펫에서는 Azure OpenAI SDK를 사용하여 MCP를 Azure OpenAI와 통합하는 방법을 보여줍니다.

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

앞선 코드에서 우리는:

- 엔드포인트, 배포 이름 및 API 키로 Azure OpenAI 클라이언트를 구성했습니다.
- 도구 지원이 포함된 완료를 가져오는 `GetCompletionWithToolsAsync` 메서드를 만들었습니다.
- 응답에서 도구 호출을 처리했습니다.

특정 MCP 서버 설정에 따라 실제 도구 처리 로직을 구현하는 것을 권장합니다.

## Microsoft Foundry 통합

Microsoft Foundry는 AI 에이전트를 구축하고 배포할 수 있는 플랫폼을 제공합니다. MCP를 Microsoft Foundry와 통합하면 MCP의 유연성을 유지하면서 해당 플랫폼의 기능을 활용할 수 있습니다.

아래 코드에서는 요청을 처리하고 MCP를 사용하여 도구 호출을 처리하는 에이전트 통합을 개발합니다.

### Java 구현

```java
// Java AI Foundry 에이전트 통합
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
        // AI Foundry 에이전트 요청 처리
        AgentResponse initialResponse = agentClient.processRequest(request);
        
        // 에이전트가 도구 사용을 요청했는지 확인
        if (initialResponse.getToolCalls() != null && !initialResponse.getToolCalls().isEmpty()) {
            // 각 도구 호출마다 적절한 MCP 도구로 라우팅
            for (AgentToolCall toolCall : initialResponse.getToolCalls()) {
                String toolName = toolCall.getName();
                Map<String, Object> parameters = toolCall.getArguments();
                
                // MCP를 사용하여 도구 실행
                ToolResponse mcpResponse = mcpClient.executeTool(toolName, parameters);
                
                // AI Foundry 를 위한 도구 응답 생성
                AgentToolResponse toolResponse = new AgentToolResponse(
                    toolCall.getId(),
                    mcpResponse.getResult()
                );
                
                // 에이전트에 도구 응답 제출
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

앞선 코드에서 우리는:

- AI Foundry와 MCP를 모두 통합하는 `AIFoundryMcpBridge` 클래스를 만들었습니다.
- AI Foundry 에이전트 요청을 처리하는 `processAgentRequest` 메서드를 구현했습니다.
- MCP 클라이언트를 통해 도구 호출을 실행하고 결과를 AI Foundry 에이전트에 제출하여 도구 호출을 처리했습니다.

## MCP와 Azure ML 통합

MCP를 Azure 머신러닝(ML)과 통합하면 Azure의 강력한 ML 기능을 활용하는 동시에 MCP의 유연성을 유지할 수 있습니다. 이 통합을 통해 ML 파이프라인을 실행하고, 모델을 도구로 등록하며, 컴퓨팅 리소스를 관리할 수 있습니다.

### Python 구현

```python
# 파이썬 Azure AI 통합
from mcp_client import McpClient
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azure.ai.ml.entities import Environment, AmlCompute
import os
import asyncio

class EnterpriseAiIntegration:
    def __init__(self, mcp_server_url, subscription_id, resource_group, workspace_name):
        # MCP 클라이언트 설정
        self.mcp_client = McpClient(server_url=mcp_server_url)
        
        # Azure ML 클라이언트 설정
        self.credential = DefaultAzureCredential()
        self.ml_client = MLClient(
            self.credential,
            subscription_id,
            resource_group,
            workspace_name
        )
    
    async def execute_ml_pipeline(self, pipeline_name, input_data):
        """Executes an ML pipeline in Azure ML"""
        # 먼저 MCP 도구를 사용하여 입력 데이터를 처리
        processed_data = await self.mcp_client.execute_tool(
            "dataPreprocessor",
            {
                "data": input_data,
                "operations": ["normalize", "clean", "transform"]
            }
        )
        
        # Azure ML에 파이프라인 제출
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
        
        # 작업 정보 반환
        return {
            "job_id": pipeline_job.id,
            "status": pipeline_job.status,
            "creation_time": pipeline_job.creation_context.created_at
        }
    
    async def register_ml_model_as_tool(self, model_name, model_version="latest"):
        """Registers an Azure ML model as an MCP tool"""
        # 모델 세부 정보 가져오기
        if model_version == "latest":
            model = self.ml_client.models.get(name=model_name, label="latest")
        else:
            model = self.ml_client.models.get(name=model_name, version=model_version)
        
        # 배포 환경 생성
        env = Environment(
            name="mcp-model-env",
            conda_file="./environments/inference-env.yml"
        )
        
        # 컴퓨트 설정
        compute = self.ml_client.compute.get("mcp-inference")
        
        # 모델을 온라인 엔드포인트로 배포
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
        
        # 모델 스키마를 기반으로 MCP 도구 스키마 생성
        tool_schema = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        # 모델 스키마를 기반으로 입력 속성 추가
        for input_name, input_spec in model.signature.inputs.items():
            tool_schema["properties"][input_name] = {
                "type": self._map_ml_type_to_json_type(input_spec.type)
            }
            tool_schema["required"].append(input_name)
        
        # MCP 도구로 등록
        # 실제 구현에서는 엔드포인트를 호출하는 도구를 생성합니다
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

앞선 코드에서 우리는:

- MCP와 Azure ML을 통합하는 `EnterpriseAiIntegration` 클래스를 만들었습니다.
- MCP 도구를 사용하여 입력 데이터를 처리하고 Azure ML에 ML 파이프라인을 제출하는 `execute_ml_pipeline` 메서드를 구현했습니다.
- 필요한 배포 환경 및 컴퓨팅 리소스 생성 포함하여 Azure ML 모델을 MCP 도구로 등록하는 `register_ml_model_as_tool` 메서드를 구현했습니다.
- 도구 등록을 위해 Azure ML 데이터 유형을 JSON 스키마 유형에 매핑했습니다.
- ML 파이프라인 실행 및 모델 등록과 같이 장시간 실행되는 작업을 처리하기 위해 비동기 프로그래밍을 사용했습니다.

## 다음 단계

- [5.2 멀티 모달리티](../mcp-multi-modality/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->