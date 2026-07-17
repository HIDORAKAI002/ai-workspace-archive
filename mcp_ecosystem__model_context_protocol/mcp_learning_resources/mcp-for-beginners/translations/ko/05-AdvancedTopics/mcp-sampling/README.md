> [사용 중단 예정: 2026-07-28 릴리스 후보](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# 모델 컨텍스트 프로토콜에서의 샘플링

> **사용 중단 알림:** `2026-07-28` MCP 명세 릴리스 후보는 샘플링을 LLM 제공자 API와의 직접 통합으로 대체함에 따라 샘플링을 사용 중단으로 표시합니다. 샘플링은 `2025-11-25` 버전 및 공식 사용 중단 후 최소 1년간 계속 작동하므로 본 강의의 모든 내용은 유효하지만, 새로운 서버 설계 시 대체 패턴을 평가해야 합니다. 자세한 내용은 [MCP에서 변경된 사항: 2026-07-28 릴리스 후보](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)를 참조하세요.

샘플링은 서버가 클라이언트를 통해 LLM 완성을 요청할 수 있게 하는 강력한 MCP 기능으로, 정교한 에이전트 행위를 가능하게 하면서 보안과 개인 정보를 유지합니다. 적절한 샘플링 구성은 응답 품질과 성능을 크게 개선할 수 있습니다. MCP는 임의성, 창의성, 일관성에 영향을 미치는 특정 매개변수로 모델의 텍스트 생성 방식을 표준화하여 제어하는 방법을 제공합니다.

## 소개

이번 강의에서는 MCP 요청에서 샘플링 매개변수를 구성하는 방법과 샘플링의 기본 프로토콜 작동 원리를 살펴봅니다.

## 학습 목표

이 강의를 마치면 다음을 할 수 있습니다:

- MCP에서 제공하는 핵심 샘플링 매개변수를 이해합니다.
- 다양한 사용 사례에 맞게 샘플링 매개변수를 구성합니다.
- 재현 가능한 결과를 위한 결정적 샘플링을 구현합니다.
- 컨텍스트 및 사용자 선호도에 따라 동적으로 샘플링 매개변수를 조정합니다.
- 다양한 시나리오에서 모델 성능 향상을 위한 샘플링 전략을 적용합니다.
- MCP의 클라이언트-서버 흐름에서 샘플링이 어떻게 작동하는지 이해합니다.

## MCP에서 샘플링 작동 방식

MCP의 샘플링 흐름은 다음 단계를 따릅니다:

1. 서버가 클라이언트에 `sampling/createMessage` 요청을 보냅니다.
2. 클라이언트가 요청을 검토하고 수정할 수 있습니다.
3. 클라이언트가 LLM에서 샘플링합니다.
4. 클라이언트가 완성을 검토합니다.
5. 클라이언트가 결과를 서버로 반환합니다.

이 사람 개입(human-in-the-loop) 설계는 사용자가 LLM이 보는 내용과 생성하는 것을 통제할 수 있게 보장합니다.

## 샘플링 매개변수 개요

MCP는 클라이언트 요청 시 구성 가능한 다음과 같은 샘플링 매개변수를 정의합니다:

| 매개변수 | 설명 | 일반 범위 |
|-----------|-------------|---------------|
| `temperature` | 토큰 선택 시 임의성 조절 | 0.0 - 1.0 |
| `maxTokens` | 생성할 최대 토큰 수 | 정수 값 |
| `stopSequences` | 만났을 때 생성을 중단시키는 사용자 정의 시퀀스 | 문자열 배열 |
| `metadata` | 추가 제공자별 매개변수 | JSON 객체 |

많은 LLM 제공자는 `metadata` 필드를 통해 다음과 같은 추가 매개변수를 지원할 수 있습니다:

| 일반 확장 매개변수 | 설명 | 일반 범위 |
|-----------|-------------|---------------|
| `top_p` | 누클리어스 샘플링 - 토큰을 상위 누적 확률로 제한 | 0.0 - 1.0 |
| `top_k` | 토큰 선택을 상위 K개로 제한 | 1 - 100 |
| `presence_penalty` | 텍스트 내 등장 여부에 따른 토큰 페널티 | -2.0 - 2.0 |
| `frequency_penalty` | 텍스트 내 등장 빈도에 따른 토큰 페널티 | -2.0 - 2.0 |
| `seed` | 재현 가능한 결과를 위한 특정 난수 시드 | 정수 값 |

## 요청 예시 형식

다음은 MCP에서 클라이언트에 샘플링 요청을 하는 예시입니다:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## 응답 형식

클라이언트는 완성 결과를 반환합니다:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## 사람 개입 제어

MCP 샘플링은 사람의 감독을 고려해 설계되었습니다:

- **프롬프트에 대해**:
  - 클라이언트는 사용자에게 제안된 프롬프트를 보여야 합니다.
  - 사용자가 프롬프트를 수정하거나 거절할 수 있어야 합니다.
  - 시스템 프롬프트는 걸러지거나 수정될 수 있습니다.
  - 컨텍스트 포함 여부는 클라이언트가 제어합니다.

- **완성에 대해**:
  - 클라이언트는 사용자에게 완성을 보여야 합니다.
  - 사용자가 완성을 수정하거나 거절할 수 있어야 합니다.
  - 클라이언트는 완성을 걸러내거나 수정할 수 있습니다.
  - 사용자가 사용할 모델을 제어합니다.

이러한 원칙을 염두에 두고, LLM 제공 업체 간 공통으로 지원하는 매개변수에 중점을 두어 다양한 프로그래밍 언어에서 샘플링을 구현하는 방법을 살펴봅니다.

## 보안 고려사항

MCP에서 샘플링을 구현할 때는 다음 보안 모범 사례를 고려하십시오:

- 클라이언트에 메시지 내용을 보내기 전에 <strong>모든 메시지 내용을 검증</strong>합니다.
- 프롬프트와 완성에서 <strong>민감 정보를 정제</strong>합니다.
- 남용 방지를 위한 <strong>요율 제한(rate limits)</strong>을 구현합니다.
- 이상 패턴 탐지를 위한 <strong>샘플링 사용량 모니터링</strong>을 수행합니다.
- 안전한 프로토콜을 사용하여 <strong>데이터 전송 시 암호화</strong>합니다.
- 관련 규정에 따라 <strong>사용자 데이터 개인정보를 처리</strong>합니다.
- 준수 및 보안을 위한 <strong>샘플링 요청 감사를 수행</strong>합니다.
- 적절한 제한으로 <strong>비용 노출을 통제</strong>합니다.
- 샘플링 요청에 대해 <strong>타임아웃을 구현</strong>합니다.
- 모델 오류 발생 시 적절한 대체 수단으로 <strong>우아하게 처리</strong>합니다.

샘플링 매개변수는 결정적 출력과 창의적 출력을 원하는 균형에 맞게 언어 모델 동작을 세밀하게 조정할 수 있게 합니다.

다양한 프로그래밍 언어에서 이러한 매개변수를 구성하는 방법을 살펴봅시다.

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

이전 코드에서 우리는:

- 특정 서버 URL로 MCP 클라이언트를 생성했습니다.
- `temperature`, `top_p`, `top_k` 같은 샘플링 매개변수로 요청을 구성했습니다.
- 요청을 보내고 생성된 텍스트를 출력했습니다.
- 다음을 사용했습니다:
    - 생성 중 모델이 사용할 수 있는 도구를 지정하기 위한 `allowedTools`. 이 경우, 앱 아이디어 생성에 도움을 주기 위해 `ideaGenerator`와 `marketAnalyzer` 도구를 허용했습니다.
    - 출력의 반복과 다양성을 제어하기 위한 `frequencyPenalty`와 `presencePenalty`.
    - 출력 임의성 조절을 위한 `temperature`, 값이 높을수록 더 창의적인 응답 생성.
    - 생성된 텍스트 품질을 향상하기 위해 누적 확률 질량 상위 토큰으로 제한하는 `top_p`.
    - 모델이 가장 확률이 높은 상위 K개의 토큰 내에서 선택하도록 제한하는 `top_k`.
    - 생성된 텍스트에서 반복을 줄이고 다양성을 촉진하기 위한 `frequencyPenalty`와 `presencePenalty`.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript 예제: 온도 및 토프-P 샘플링 구성
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP 클라이언트 초기화
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // 다른 샘플링 매개변수로 요청 구성
  const creativeSampling = {
    temperature: 0.9,    // 온도가 높을수록 더 많은 무작위성/창의성
    topP: 0.92,          // 누적 확률 질량 92% 내의 토큰 고려
    frequencyPenalty: 0.6, // 토큰 시퀀스 반복 감소
    presencePenalty: 0.4   // 지금까지 텍스트에 등장한 토큰에 벌점 부여
  };
  
  const factualSampling = {
    temperature: 0.2,    // 온도가 낮을수록 더 결정론적/사실적
    topP: 0.85,          // 약간 더 집중된 토큰 선택
    frequencyPenalty: 0.2, // 최소한의 반복 벌점
    presencePenalty: 0.1   // 최소한의 존재 벌점
  };
  
  try {
    // 서로 다른 샘플링 구성으로 두 개의 요청 보내기
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

이전 코드에서 우리는:

- 서버 URL과 API 키로 MCP 클라이언트를 초기화했습니다.
- 창의적 작업과 사실적 작업을 위한 두 가지 샘플링 매개변수 세트를 구성했습니다.
- 이러한 구성으로 요청을 보내어 각 작업에 대해 모델이 특정 도구를 사용하도록 했습니다.
- 서로 다른 샘플링 매개변수의 효과를 보여주기 위해 생성된 응답을 출력했습니다.
- 생성 과정에서 모델이 사용할 수 있는 도구를 지정하기 위해 `allowedTools`를 사용했습니다. 창의적 작업에는 `ideaGenerator`와 `environmentalImpactTool`을, 사실적 작업에는 `factChecker`와 `dataAnalysisTool`을 허용했습니다.
- 출력 임의성을 조절하기 위해 `temperature`를 사용하여 값이 높을수록 더욱 창의적 반응을 유도했습니다.
- 상위 누적 확률 질량 토큰으로 선택을 제한하여 생성된 텍스트 품질을 높이는 `top_p`를 사용했습니다.
- 반복을 줄이고 다양성을 촉진하기 위해 `frequencyPenalty`와 `presencePenalty`를 사용했습니다.
- 모델이 가장 확률이 높은 상위 K개 토큰 내에서 선택하도록 제한하는 `top_k`를 사용했습니다.

---

## 결정적 샘플링

일관된 출력을 필요로 하는 애플리케이션의 경우, 결정적 샘플링이 재현 가능한 결과를 보장합니다. 이는 고정 난수 시드를 사용하고 온도를 0으로 설정함으로써 이루어집니다.

아래 샘플 구현을 통해 다양한 프로그래밍 언어에서 결정적 샘플링을 시연해 봅시다.

# [Java](#tab/java)

```java
// 자바 예제: 고정 시드로 결정론적 응답
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // 결정론적 결과를 위해 고정 시드 사용
        
        // 고정 시드로 첫 번째 요청
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // 최대 결정론성을 위한 영 온도
            .build();
            
        // 동일한 시드로 두 번째 요청
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // 두 요청 모두 실행
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // 동일한 시드와 온도=0으로 응답이 동일해야 함
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

이전 코드에서 우리는:

- 지정된 서버 URL로 MCP 클라이언트를 생성했습니다.
- 동일한 프롬프트, 고정 시드, 0 온도로 두 요청을 구성했습니다.
- 두 요청을 보내고 생성된 텍스트를 출력했습니다.
- 샘플링 구성의 결정적 특성(동일 시드와 온도)으로 인해 응답이 동일함을 입증했습니다.
- `setSeed`를 사용하여 고정 난수 시드를 지정, 동일 입력에 대해 동일 출력을 생성하도록 했습니다.
- 최대 결정성을 위해 `temperature`를 0으로 설정, 무작위성 없이 항상 가장 확률 높은 다음 토큰을 선택하도록 했습니다.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript 예제: 시드 제어를 통한 결정론적 응답
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // 고정된 시드를 사용한 첫 번째 요청
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // 최대 결정론을 위한 온도 0
    });
    
    // 동일한 시드와 온도를 사용한 두 번째 요청
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // 다른 시드이지만 동일한 온도를 사용한 세 번째 요청
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

이전 코드에서 우리는:

- 서버 URL로 MCP 클라이언트를 초기화했습니다.
- 동일한 프롬프트, 고정 시드, 0 온도로 두 요청을 구성했습니다.
- 두 요청을 보내고 생성된 텍스트를 출력했습니다.
- 샘플링 구성의 결정적 특성(동일 시드와 온도)으로 인해 응답이 동일함을 입증했습니다.
- `seed`를 사용하여 고정 난수 시드를 지정, 동일 입력에 대해 동일 출력을 생성하도록 했습니다.
- 최대 결정성을 위해 `temperature`를 0으로 설정, 무작위성 없이 항상 가장 확률 높은 다음 토큰을 선택하도록 했습니다.
- 세 번째 요청에는 다른 시드를 사용하여, 동일 프롬프트와 온도에도 시드 변경 시 출력이 달라짐을 보여주었습니다.

---

## 동적 샘플링 구성

지능적 샘플링은 각 요청의 컨텍스트와 요구에 따라 매개변수를 조정합니다. 이것은 작업 유형, 사용자 선호도, 과거 성과에 따라 온도, top_p, 페널티 등의 매개변수를 동적으로 조절하는 것을 의미합니다.

다양한 프로그래밍 언어에서 동적 샘플링을 구현하는 방법을 살펴봅시다.

# [Python](#tab/python)

```python
# 파이썬 예제: 요청 컨텍스트 기반 동적 샘플링
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # 다양한 작업 유형에 대한 샘플링 프리셋 정의
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # 기본 프리셋 선택
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # 사용자 선호도에 따라 조정 (제공된 경우)
        if user_preferences:
            if "creativity_level" in user_preferences:
                # 창의성 선호도(1-10)를 기반으로 온도 조절
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # 원하는 응답 다양성에 따라 top_p 조정
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # 사용자 지정 샘플링 매개변수로 요청 생성 및 전송
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # 투명성을 위한 샘플링 메타데이터와 함께 응답 반환
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

이전 코드에서 우리는:

- 적응형 샘플링을 관리하는 `DynamicSamplingService` 클래스를 생성했습니다.
- 서로 다른 작업 유형(창의적, 사실적, 코드, 분석용)에 대한 샘플링 프리셋을 정의했습니다.
- 작업 유형에 따라 기본 샘플링 프리셋을 선택했습니다.
- 창의성 수준 및 다양성과 같은 사용자 선호도에 따라 샘플링 매개변수를 조정했습니다.
- 동적으로 구성된 샘플링 매개변수를 사용해 요청을 보냈습니다.
- 생성된 텍스트와 적용된 샘플링 매개변수 및 작업 유형을 투명하게 반환했습니다.
- 출력 임의성을 조절하기 위해 `temperature`를 사용하여 값이 높을수록 더 창의적인 응답을 생성했습니다.
- 생성된 텍스트 품질을 개선하기 위해 상위 누적 확률 질량 내 토큰 선택을 제한하는 `top_p`를 사용했습니다.
- 반복을 줄이고 다양성을 촉진하기 위해 `frequency_penalty`를 사용했습니다.
- 사용자 정의 창의성 및 다양성 수준에 기반해 샘플링 매개변수를 사용자 맞춤화할 수 있도록 `user_preferences`를 사용했습니다.
- 작업의 특성에 맞춰 더 맞춤화된 응답을 위해 요청에 적합한 샘플링 전략을 결정하는 `task_type`을 사용했습니다.
- 구성된 샘플링 매개변수를 사용해 프롬프트를 전송하는 `send_request` 메서드를 사용했습니다.
- 모델 응답을 `generated_text`로 받아온 후, 샘플링 매개변수 및 작업 유형과 함께 추가 분석이나 표시를 위해 반환했습니다.
- 사용자 선호가 유효한 범위 내로 조정되도록 `min` 및 `max` 함수를 사용해 잘못된 샘플링 구성이 방지되도록 했습니다.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript 예제: 사용자 컨텍스트 기반 동적 샘플링 구성
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // 기본 샘플링 프로필 정의
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // 과거 성능 추적
    this.performanceHistory = [];
  }
  
  // 프롬프트에서 작업 유형 감지
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // 단순 휴리스틱 감지 - ML 분류로 개선 가능
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // 명확한 유형이 감지되지 않으면 대화형으로 기본 설정
    return 'conversational';
  }
  
  // 컨텍스트 및 사용자 선호도에 따른 샘플링 매개변수 계산
  getSamplingParameters(prompt, context = {}) {
    // 작업 유형 감지
    const taskType = this.detectTaskType(prompt, context);
    
    // 기본 프로필 가져오기
    let params = {...this.samplingProfiles[taskType]};
    
    // 사용자 선호도에 따라 조정
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 범위를 적절한 온도 범위로 변환
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // 더 높은 정밀도는 더 낮은 topP (더 집중된 선택)를 의미함
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // 더 높은 일관성은 더 낮은 페널티를 의미함
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // 성능 기록에서 학습된 조정 적용
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // 단순 적응 논리 - 더 정교한 알고리즘으로 개선 가능
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // 최근 기록만 고려
    
    if (relevantHistory.length > 0) {
      // 평균 성능 점수 계산
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // 성능이 임계값 아래인 경우 매개변수 조정
      if (avgScore < 0.7) {
        // 더 안전한 값 쪽으로 약간 조정
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // 미래 조정을 위해 성능 기록
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 응답 품질에 대한 0-1 평가
    });
    
    // 이력 크기 제한
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // 최적화된 샘플링 매개변수 가져오기
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // 최적화된 매개변수로 요청 전송
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // 사용자가 피드백을 제공하면 미래 최적화를 위해 기록
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// 사용 예제
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // 사용자 맞춤 선호도를 가진 창의적 작업
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // 높은 창의성 (1-10)
          consistency: 3  // 낮은 일관성 (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // 코드 생성 작업
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // 낮은 창의성
          precision: 8,   // 높은 정밀도
          consistency: 9  // 높은 일관성
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

이전 코드에서 우리는:

- 작업 유형 및 사용자 선호도에 따라 동적 샘플링을 관리하는 `AdaptiveSamplingManager` 클래스를 생성했습니다.
- 서로 다른 작업 유형(창의적, 사실적, 코드, 대화)에 대한 샘플링 프로필을 정의했습니다.
- 간단한 휴리스틱을 사용해 프롬프트에서 작업 유형을 감지하는 메서드를 구현했습니다.
- 감지된 작업 유형과 사용자 선호도를 기반으로 샘플링 매개변수를 계산했습니다.
- 과거 성과를 반영해 학습된 조정을 적용, 샘플링 매개변수를 최적화했습니다.
- 향후 조정을 위해 성과를 기록해 시스템이 과거 상호작용에서 학습할 수 있도록 했습니다.
- 동적으로 구성된 샘플링 매개변수를 적용해 요청을 보내고, 생성된 텍스트와 적용 매개변수 및 감지된 작업 유형을 반환했습니다.
- 다음을 사용했습니다:
    - 사용자 정의 창의성, 정밀도, 일관성 수준에 기반해 샘플링 매개변수를 맞춤화할 수 있는 `userPreferences`.
    - 프롬프트를 기반으로 작업의 본질을 결정해 더 맞춤화된 응답을 가능케 하는 `detectTaskType`.
    - 생성된 응답의 성과를 기록해 시스템이 시간이 지남에 따라 적응과 개선을 할 수 있도록 하는 `recordPerformance`.
    - 과거 성과를 기반으로 샘플링 매개변수를 수정해 모델의 고품질 응답 생성 능력을 향상시키는 `applyLearnedAdjustments`.
    - 다양한 프롬프트와 컨텍스트에서 호출하기 쉽게 적응형 샘플링으로 응답생성 전체 과정을 캡슐화한 `generateResponse`.
    - 더 문맥에 맞는 응답을 위해 생성 중 모델이 사용할 도구를 지정하는 `allowedTools`.
    - 생성된 응답 품질에 대해 사용자가 피드백을 제공할 수 있어 모델 성능 개선에 활용하는 `feedbackScore`.
    - 과거 상호작용 기록을 유지해 시스템이 이전 성공과 실패를 학습할 수 있도록 하는 `performanceHistory`.
    - 요청 컨텍스트에 기반해 샘플링 매개변수를 동적으로 조절하는 `getSamplingParameters`.
    - 프롬프트 기반 작업 유형 분류로 다양한 요청 유형에 적합한 샘플링 전략 적용을 가능케 하는 `detectTaskType`.
    - 요청 성격에 따라 빠른 조정을 위해 작업 유형별 기본 샘플링 구성을 정의한 `samplingProfiles`.

---

## 다음 단계

- [5.7 확장](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->