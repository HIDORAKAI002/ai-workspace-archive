> [УСТАРЕЛО: КАНДИДАТ НА ВЫПУСК 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Сэмплирование в Model Context Protocol

> **Уведомление об устаревании:** кандидат на выпуск спецификации MCP `2026-07-28` отмечает сэмплирование как устаревшее в пользу прямой интеграции с API поставщиков LLM. Сэмплирование продолжит работать в версии `2025-11-25` и в течение как минимум года после официального устаревания, поэтому всё в этом уроке остаётся актуальным — однако новые серверные разработки должны рассмотреть замену этой модели. См. [Что изменилось в MCP: кандидат на выпуск 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Сэмплирование — мощная функция MCP, позволяющая серверам запрашивать завершения LLM через клиента, что даёт возможность сложного агентного поведения, сохраняя при этом безопасность и конфиденциальность. Правильная конфигурация сэмплирования может значительно улучшить качество и производительность ответов. MCP предоставляет стандартизированный способ управлять генерацией текста моделями с использованием определённых параметров, влияющих на случайность, креативность и когерентность.

## Введение

В этом уроке мы исследуем, как настраивать параметры сэмплирования в запросах MCP и понимаем механизмы протокола сэмплирования.

## Цели обучения

По окончании урока вы сможете:

- Понимать ключевые параметры сэмплирования, доступные в MCP.
- Настраивать параметры сэмплирования для различных сценариев использования.
- Реализовывать детерминированное сэмплирование для воспроизводимых результатов.
- Динамически регулировать параметры сэмплирования на основе контекста и предпочтений пользователя.
- Применять стратегии сэмплирования для улучшения работы модели в разных ситуациях.
- Понимать, как работает сэмплирование в клиент-серверном потоке MCP.

## Как работает сэмплирование в MCP

Поток сэмплирования в MCP следует следующим шагам:

1. Сервер отправляет запрос `sampling/createMessage` клиенту
2. Клиент рассматривает запрос и может его изменить
3. Клиент выполняет сэмплирование на LLM
4. Клиент оценивает полученное завершение
5. Клиент возвращает результат серверу

Такой дизайн с участием человека в цикле позволяет пользователям сохранять контроль над тем, что видит и создаёт LLM.

## Обзор параметров сэмплирования

MCP определяет следующие параметры сэмплирования, которые могут быть настроены в запросах клиента:

| Параметр | Описание | Типичный диапазон |
|-----------|-------------|---------------|
| `temperature` | Управляет случайностью выбора токенов | 0.0 - 1.0 |
| `maxTokens` | Максимальное количество генерируемых токенов | Целочисленное значение |
| `stopSequences` | Пользовательские последовательности для остановки генерации при их встрече | Массив строк |
| `metadata` | Дополнительные параметры, специфичные для провайдера | JSON-объект |

Многие провайдеры LLM поддерживают дополнительные параметры через поле `metadata`, которые могут включать:

| Распространённый параметр расширения | Описание | Типичный диапазон |
|-----------|-------------|---------------|
| `top_p` | Nucleus-сэмплирование — ограничивает токены верхней кумулятивной вероятностью | 0.0 - 1.0 |
| `top_k` | Ограничивает выбор токенов топ K опциями | 1 - 100 |
| `presence_penalty` | Штрафует токены за повторное появление в тексте | -2.0 - 2.0 |
| `frequency_penalty` | Штрафует токены за частоту в тексте | -2.0 - 2.0 |
| `seed` | Конкретное случайное зерно для воспроизводимости | Целочисленное значение |

## Формат примерного запроса

Вот пример запроса сэмплирования от клиента в MCP:

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

## Формат ответа

Клиент возвращает результат завершения:

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

## Контроль с участием человека

Сэмплирование MCP разработано с учётом человеческого контроля:

- **Для подсказок**:
  - Клиенты должны показывать пользователю предлагаемую подсказку
  - Пользователи должны иметь возможность изменять или отвергать подсказки
  - Системные подсказки могут быть отфильтрованы или изменены
  - Включение контекста контролируется клиентом

- **Для завершений**:
  - Клиенты должны показывать пользователю завершение
  - Пользователи должны иметь возможность изменять или отвергать завершения
  - Клиенты могут фильтровать или изменять завершения
  - Пользователи контролируют, какая модель используется

При этих принципах рассмотрим, как реализовать сэмплирование на разных языках программирования, сосредоточившись на параметрах, часто поддерживаемых провайдерами LLM.

## Вопросы безопасности

При реализации сэмплирования в MCP учитывайте эти лучшие практики безопасности:

- **Проверяйте весь содержимый текст сообщений** перед отправкой клиенту
- **Очищайте конфиденциальную информацию** из подсказок и завершений
- **Реализуйте ограничения скорости запросов** для предотвращения злоупотреблений
- **Мониторьте использование сэмплирования** на наличие аномалий
- **Шифруйте данные при передаче** с использованием безопасных протоколов
- **Обеспечивайте конфиденциальность данных пользователей** в соответствии с соответствующими нормативами
- **Проводите аудит запросов сэмплирования** для проверки соответствия и безопасности
- **Контролируйте расходы** с помощью соответствующих лимитов
- **Реализуйте тайм-ауты** для запросов сэмплирования
- **Обрабатывайте ошибки модели корректно** с помощью соответствующих запасных вариантов

Параметры сэмплирования позволяют тонко настроить поведение языковых моделей для достижения нужного баланса между детерминированным и креативным выводом.

Рассмотрим, как настроить эти параметры на разных языках программирования.

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

В приведённом коде мы:

- Создали клиент MCP с указанием URL сервера.
- Настроили запрос с параметрами сэмплирования, такими как `temperature`, `top_p` и `top_k`.
- Отправили запрос и распечатали сгенерированный текст.
- Использовали:
    - `allowedTools` для указания инструментов, которые модель может использовать во время генерации. В этом случае разрешены инструменты `ideaGenerator` и `marketAnalyzer` для помощи в создании креативных идей приложений.
    - `frequencyPenalty` и `presencePenalty` для контроля повторений и разнообразия в выводе.
    - `temperature` для управления случайностью вывода — при больших значениях ответы более творческие.
    - `top_p` для ограничения выбора токенов теми, что вносят вклад в верхнюю кумулятивную вероятность, что улучшает качество генерируемого текста.
    - `top_k` для ограничения модели первыми K наиболее вероятными токенами, что помогает генерировать более связные ответы.
    - `frequencyPenalty` и `presencePenalty` для снижения повторений и поощрения разнообразия в тексте.

# [JavaScript](#tab/javascript)

```javascript
// Пример на JavaScript: настройка температуры и Top-P сэмплинга
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Инициализация клиента MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Настройка запроса с различными параметрами сэмплинга
  const creativeSampling = {
    temperature: 0.9,    // Более высокая температура = больше случайности/креативности
    topP: 0.92,          // Учитывать токены с топ 92% вероятностной массы
    frequencyPenalty: 0.6, // Снизить повторение последовательностей токенов
    presencePenalty: 0.4   // Наказывать токены, которые уже появились в тексте
  };
  
  const factualSampling = {
    temperature: 0.2,    // Ниже температура = более детерминированный/фактический
    topP: 0.85,          // Немного более сфокусированный выбор токенов
    frequencyPenalty: 0.2, // Минимальное наказание за повторение
    presencePenalty: 0.1   // Минимальное наказание за присутствие
  };
  
  try {
    // Отправить два запроса с разными конфигурациями сэмплинга
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

В приведённом коде мы:

- Инициализировали клиент MCP с URL сервера и ключом API.
- Настроили два набора параметров сэмплирования: один для креативных задач, другой — для фактических.
- Отправили запросы с этими конфигурациями, позволяя модели использовать специфические инструменты для каждой задачи.
- Распечатали сгенерированные ответы, демонстрируя влияние различных параметров сэмплирования.
- Использовали `allowedTools` для указания инструментов, которые модель может использовать во время генерации. В данном случае разрешены инструменты `ideaGenerator` и `environmentalImpactTool` для творческих задач и `factChecker` и `dataAnalysisTool` для фактических.
- Использовали `temperature` для управления случайностью вывода — при больших значениях ответы более творческие.
- Использовали `top_p` для ограничения выбора токенов теми, что вносят вклад в верхнюю кумулятивную вероятность, что улучшает качество генерируемого текста.
- Использовали `frequencyPenalty` и `presencePenalty` для снижения повторений и поощрения разнообразия в выводе.
- Использовали `top_k` для ограничения модели первыми K наиболее вероятными токенами, что помогает генерировать более связные ответы.

---

## Детерминированное сэмплирование

Для приложений, требующих устойчивых результатов, детерминированное сэмплирование обеспечивает воспроизводимость. Это достигается использованием фиксированного случайного зерна и установкой температуры в ноль.

Рассмотрим ниже пример реализации детерминированного сэмплирования на разных языках программирования.

# [Java](#tab/java)

```java
// Пример на Java: Детерминированные ответы с фиксированным значением seed
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Использование фиксированного seed для детерминированных результатов
        
        // Первый запрос с фиксированным seed
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Нулевая температура для максимального детерминизма
            .build();
            
        // Второй запрос с тем же seed
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Выполнить оба запроса
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Ответы должны быть идентичными из-за одинакового seed и temperature=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

В приведённом коде мы:

- Создали клиент MCP с указанным URL сервера.
- Настроили два запроса с одинаковой подсказкой, фиксированным зерном и нулевой температурой.
- Отправили оба запроса и распечатали сгенерированный текст.
- Продемонстрировали, что ответы идентичны благодаря детерминированной природе конфигурации сэмплирования (одинаковое зерно и температура).
- Использовали `setSeed` для установки фиксированного случайного зерна, гарантируя одинаковый вывод модели при одинаковом входе.
- Установили `temperature` в ноль для максимальной детерминированности, что означает, что модель всегда будет выбирать наиболее вероятный следующий токен без случайности.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Пример JavaScript: Определённые ответы с управлением зерном (seed)
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Первый запрос с фиксированным зерном
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Нулевая температура для максимального детерминизма
    });
    
    // Второй запрос с тем же зерном и температурой
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Третий запрос с другим зерном, но с той же температурой
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

В приведённом коде мы:

- Инициализировали клиент MCP с URL сервера.
- Настроили два запроса с одинаковой подсказкой, фиксированным зерном и нулевой температурой.
- Отправили оба запроса и распечатали сгенерированный текст.
- Продемонстрировали, что ответы идентичны благодаря детерминированной природе конфигурации сэмплирования (одинаковое зерно и температура).
- Использовали `seed` для установки фиксированного случайного зерна, гарантируя одинаковый вывод модели при одинаковом входе.
- Установили `temperature` в ноль для максимальной детерминированности, что означает, что модель всегда будет выбирать наиболее вероятный следующий токен без случайности.
- Для третьего запроса использовали другое зерно, показав, что изменение зерна приводит к разным результатам, даже при той же подсказке и температуре.

---

## Динамическая настройка сэмплирования

Интеллектуальное сэмплирование адаптирует параметры на основе контекста и требований каждого запроса. Это означает динамическую регулировку таких параметров, как температура, top_p и штрафы, в зависимости от типа задачи, предпочтений пользователя или исторической производительности.

Рассмотрим, как реализовать динамическое сэмплирование на разных языках программирования.

# [Python](#tab/python)

```python
# Пример на Python: динамическая выборка на основе контекста запроса
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Определите пресеты выборки для разных типов задач
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Выберите базовый пресет
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Настройте на основе предпочтений пользователя, если они указаны
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Масштабируйте температуру в зависимости от предпочтения к креативности (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Настройте top_p в зависимости от желаемого разнообразия ответов
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Создайте и отправьте запрос с пользовательскими параметрами выборки
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Верните ответ с метаданными выборки для прозрачности
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

В приведённом коде мы:

- Создали класс `DynamicSamplingService`, управляющий адаптивным сэмплированием.
- Определили пресеты сэмплирования для разных типов задач (креативные, фактические, код, аналитические).
- Выбрали базовый пресет сэмплирования в зависимости от типа задачи.
- Настроили параметры сэмплирования на основе пользовательских предпочтений, таких как уровень креативности и разнообразия.
- Отправили запрос с динамически сконфигурированными параметрами сэмплирования.
- Вернули сгенерированный текст вместе с применёнными параметрами сэмплирования и типом задачи для прозрачности.
- Использовали `temperature` для управления случайностью вывода — при больших значениях ответы более творческие.
- Использовали `top_p` для ограничения выбора токенов теми, что вносят вклад в верхнюю кумулятивную вероятность, что улучшает качество генерируемого текста.
- Использовали `frequency_penalty` для снижения повторений и поощрения разнообразия в выводе.
- Использовали `user_preferences` для настройки параметров сэмплирования в зависимости от заданных пользователем уровней креативности и разнообразия.
- Использовали `task_type` для определения подходящей стратегии сэмплирования, позволяя более точно адаптировать ответы в зависимости от характера задачи.
- Использовали метод `send_request` для отправки подсказки с настроенными параметрами сэмплирования, обеспечивая генерацию текста согласно заданным требованиям.
- Использовали `generated_text` для получения ответа модели, который затем возвращается вместе с параметрами сэмплирования и типом задачи для дальнейшего анализа или отображения.
- Использовали функции `min` и `max` для обеспечения попадания пользовательских предпочтений в допустимые пределы, предотвращая недопустимые конфигурации сэмплирования.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// Пример на JavaScript: динамическая конфигурация выборки на основе контекста пользователя
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Определить базовые профили выборки
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Отслеживать историческую производительность
    this.performanceHistory = [];
  }
  
  // Определить тип задачи по подсказке
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Простое эвристическое определение - можно улучшить с помощью классификации на основе машинного обучения
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
    
    // По умолчанию использовать разговорный режим, если тип не ясен
    return 'conversational';
  }
  
  // Рассчитать параметры выборки на основе контекста и предпочтений пользователя
  getSamplingParameters(prompt, context = {}) {
    // Определить тип задачи
    const taskType = this.detectTaskType(prompt, context);
    
    // Получить базовый профиль
    let params = {...this.samplingProfiles[taskType]};
    
    // Отрегулировать на основе предпочтений пользователя
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Масштабировать с 1-10 до соответствующего диапазона температуры
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Более высокая точность означает меньший topP (более сфокусированный выбор)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Более высокая согласованность означает меньшие штрафы
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Применить изученные корректировки из истории производительности
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Простая адаптивная логика - можно улучшить с помощью более сложных алгоритмов
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Учитывать только недавнюю историю
    
    if (relevantHistory.length > 0) {
      // Рассчитать средние показатели производительности
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Если производительность ниже порогового значения, скорректировать параметры
      if (avgScore < 0.7) {
        // Незначительная корректировка в сторону более безопасных значений
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Записать производительность для будущих корректировок
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Оценка качества ответа от 0 до 1
    });
    
    // Ограничить размер истории
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Получить оптимизированные параметры выборки
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Отправить запрос с оптимизированными параметрами
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Если пользователь оставляет отзыв, записать его для будущей оптимизации
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

// Пример использования
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Креативная задача с индивидуальными предпочтениями пользователя
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Высокая креативность (1-10)
          consistency: 3  // Низкая согласованность (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Задача генерации кода
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Низкая креативность
          precision: 8,   // Высокая точность
          consistency: 9  // Высокая согласованность
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

В приведённом коде мы:

- Создали класс `AdaptiveSamplingManager`, управляющий динамическим сэмплированием на основе типа задачи и предпочтений пользователя.
- Определили профили сэмплирования для разных типов задач (креативные, фактические, код, разговорные).
- Реализовали метод определения типа задачи по подсказке с помощью простых эвристик.
- Рассчитали параметры сэмплирования на основе определённого типа задачи и пользовательских предпочтений.
- Применили изученные корректировки на основе исторической производительности для оптимизации параметров сэмплирования.
- Зафиксировали показатели производительности для будущих корректировок, позволяя системе учиться на прошлых взаимодействиях.
- Отправили запросы с динамически настроенными параметрами сэмплирования и вернули сгенерированный текст вместе с применёнными параметрами и определённым типом задачи.
- Использовали:
    - `userPreferences` для настройки параметров сэмплирования на основе определённых пользователем уровней креативности, точности и последовательности.
    - `detectTaskType` для определения характера задачи по подсказке, что позволяет адаптировать ответы более точно.
    - `recordPerformance` для записи эффективности сгенерированных ответов, давая системе возможность адаптироваться и улучшаться со временем.
    - `applyLearnedAdjustments` для изменения параметров сэмплирования на основе исторической производительности, улучшая качество ответов модели.
    - `generateResponse` для инкапсуляции всего процесса генерации ответа с адаптивным сэмплированием, упрощая вызов с разными подсказками и контекстами.
    - `allowedTools` для указания инструментов, которые модель может использовать во время генерации, обеспечивая более контекстно-зависимые ответы.
    - `feedbackScore` для возможности пользователей предоставлять обратную связь о качестве сгенерированного ответа, что может использоваться для дальнейшей настройки работы модели.
    - `performanceHistory` для ведения записей прошлых взаимодействий, позволяя системе учиться на предыдущих успехах и неудачах.
    - `getSamplingParameters` для динамического изменения параметров сэмплирования на основе контекста запроса, обеспечивая более гибкое и отзывчивое поведение модели.
    - `detectTaskType` для классификации задачи по подсказке, что позволяет системе применять соответствующие стратегии сэмплирования для разных типов запросов.
    - `samplingProfiles` для определения базовых конфигураций сэмплирования для разных типов задач, упрощая быстрые настройки в зависимости от характера запроса.

---

## Что дальше

- [5.7 Масштабирование](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->