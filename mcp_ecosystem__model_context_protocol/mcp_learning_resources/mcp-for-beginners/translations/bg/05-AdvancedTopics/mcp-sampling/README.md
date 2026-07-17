> [ОСТАРЯЛО: КАНДИДАТ ЗА ИЗЛИЗАНЕ 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Извличане на проби в Model Context Protocol

> **Уведомление за остаряване:** кандидатът за спецификацията на MCP `2026-07-28` отбелязва Извличането на проби като остаряло в полза на директната интеграция с LLM API-та на доставчиците. Извличането на проби продължава да работи в `2025-11-25` и поне една година след всяко официално остаряване, така че всичко в този урок остава валидно – но новите сървърни дизайни трябва да оценят модела за замяна. Вижте [Какво се променя в MCP: Кандидат за излизане 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Извличането на проби е мощна функция на MCP, която позволява на сървърите да заявяват завършвания от LLM чрез клиента, като дава възможност за сложни агентни поведения, докато се поддържат сигурност и поверителност. Правилната конфигурация на извличане на проби може драстично да подобри качеството на отговора и производителността. MCP предоставя стандартизиран начин за контролиране на това как моделите генерират текст със специфични параметри, които влияят на случайността, креативността и последователността.

## Въведение

В този урок ще разгледаме как да конфигурираме параметрите на извличане на проби в заявки на MCP и ще разберем подлежащите протоколните механики на извличането.

## Цели на обучението

В края на този урок ще можете да:

- Разбирате ключовите параметри за извличане на проби, налични в MCP.
- Конфигурирате параметрите на извличане на проби за различни случаи на употреба.
- Прилагате детерминистично извличане на проби за възпроизводими резултати.
- Динамично настройвате параметрите на извличане на проби според контекста и предпочитанията на потребителя.
- Прилагате стратегии за извличане на проби за подобряване на производителността на модела в различни сценарии.
- Разбирате как работи извличането на проби в клиент-сървърния поток на MCP.

## Как работи извличането на проби в MCP

Потокът на извличане на проби в MCP следва тези стъпки:

1. Сървърът изпраща заявка `sampling/createMessage` към клиента
2. Клиентът преглежда заявката и може да я модифицира
3. Клиентът извлича проба от LLM
4. Клиентът преглежда завършването
5. Клиентът връща резултата на сървъра

Този дизайн с човек в цикъла гарантира, че потребителите запазват контрол върху това, което LLM вижда и генерира.

## Преглед на параметрите за извличане на проби

MCP дефинира следните параметри за извличане на проби, които могат да се конфигурират в заявки към клиент:

| Параметър | Описание | Типичен диапазон |
|-----------|-------------|---------------|
| `temperature` | Контролира случайността при избор на токени | 0.0 - 1.0 |
| `maxTokens` | Максимален брой генерирани токени | Цяло число |
| `stopSequences` | Персонализирани поредици, които спират генерирането при срещането им | Масив от низове |
| `metadata` | Допълнителни доставчицки специфични параметри | JSON обект |

Много LLM доставчици поддържат допълнителни параметри чрез полето `metadata`, които може да включват:

| Често използван разширен параметър | Описание | Типичен диапазон |
|-----------|-------------|---------------|
| `top_p` | Нуклеусно извличане - ограничава токените до най-горната кумулативна вероятност | 0.0 - 1.0 |
| `top_k` | Ограничение на избора на токени до топ K опции | 1 - 100 |
| `presence_penalty` | Налага наказание на токени според тяхното присъствие в текста досега | -2.0 - 2.0 |
| `frequency_penalty` | Налага наказание на токени според честотата им в текста досега | -2.0 - 2.0 |
| `seed` | Конкретно случайно семе за възпроизводими резултати | Цяло число |

## Примерен формат на заявка

Ето пример за заявка за извличане на проба от клиент в MCP:

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

## Формат на отговора

Клиентът връща резултат от завършване:

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

## Контроли с човек в цикъла

Извличането на проби в MCP е проектирано с оглед човешкия надзор:

- **За предложения**:
  - Клиентите трябва да показват на потребителите предложението
  - Потребителите трябва да могат да модифицират или отхвърлят предложенията
  - Системните предложения могат да бъдат филтрирани или модифицирани
  - Включването на контекст се контролира от клиента

- **За завършванията**:
  - Клиентите трябва да показват на потребителите завършването
  - Потребителите трябва да могат да модифицират или отхвърлят завършванията
  - Клиентите могат да филтрират или модифицират завършванията
  - Потребителите контролират кой модел се използва

С тези принципи в ума, нека разгледаме как да прилагаме извличане на проби в различни програмни езици, като се фокусираме върху параметрите, които често се поддържат от различните доставчици на LLM.

## Съображения за сигурност

При прилагането на извличане на проби в MCP, имайте предвид следните добри практики за сигурност:

- **Валидирайте цялото съдържание на съобщенията** преди изпращането им към клиента
- **Санитизирайте чувствителна информация** от предложения и завършвания
- **Прилагайте ограничения на честотата** за предотвратяване на злоупотреби
- **Наблюдавайте употребата на извличане на проби** за необичайни модели
- **Шифровайте данните при предаване** с помощта на сигурни протоколи
- **Обработвайте поверителността на потребителските данни** съгласно приложимите регулации
- **Одитирайте заявките за извличане на проби** за съответствие и сигурност
- **Контролирайте разходите** с подходящи ограничения
- **Прилагайте таймаути** за заявките за извличане на проби
- **Обработвайте грешките на модела по щадящ начин** с подходящи резервни варианти

Параметрите за извличане на проби позволяват фина настройка на поведението на езиковите модели, за да се постигне желан баланс между детерминистични и креативни изходи.

Нека разгледаме как да конфигурираме тези параметри в различни програмни езици.

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

В предишния код ние:

- Създадохме MCP клиент със специфичен URL на сървъра.
- Конфигурирахме заявка с параметри за извличане на проби като `temperature`, `top_p` и `top_k`.
- Изпратихме заявката и отпечатахме генерирания текст.
- Използвахме:
    - `allowedTools` за посочване на инструментите, които моделът може да използва по време на генериране. В този случай позволихме инструментите `ideaGenerator` и `marketAnalyzer`, за да помагат в генерирането на творчески идеи за приложения.
    - `frequencyPenalty` и `presencePenalty` за контрол на повторенията и разнообразието в изхода.
    - `temperature` за контролиране на случайността на изхода, като по-високите стойности водят до по-креативни отговори.
    - `top_p` за ограничаване на избора на токени до тези, които допринасят за най-горната кумулативна вероятност, подобрявайки качеството на генерирания текст.
    - `top_k` за ограничаване на модела до топ K най-вероятни токени, което може да помогне за генериране на по-кохерентни отговори.
    - `frequencyPenalty` и `presencePenalty` за намаляване на повторенията и насърчаване на разнообразието в генерирания текст.

# [JavaScript](#tab/javascript)

```javascript
// Пример на JavaScript: Конфигурация за температура и Top-P проба
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Инициализиране на MCP клиента
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Конфигуриране на заявка с различни параметри за проба
  const creativeSampling = {
    temperature: 0.9,    // По-висока температура = повече случайност/креативност
    topP: 0.92,          // Вземане предвид на токени с топ 92% вероятностна маса
    frequencyPenalty: 0.6, // Намаляване на повторенията на последователности от токени
    presencePenalty: 0.4   // Налагане на наказание на токени, които вече са се появили в текста
  };
  
  const factualSampling = {
    temperature: 0.2,    // По-ниска температура = по-детерминистичен/фактически
    topP: 0.85,          // Леко по-фокусирано избиране на токени
    frequencyPenalty: 0.2, // Минимално наказание за повторение
    presencePenalty: 0.1   // Минимално наказание за присъствие
  };
  
  try {
    // Изпращане на две заявки с различни конфигурации за проба
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

В предишния код ние:

- Инициализирахме MCP клиент с URL на сървър и API ключ.
- Конфигурирахме два набора от параметри за извличане на проби: един за творчески задачи и друг за фактически задачи.
- Изпратихме заявки с тези конфигурации, като позволихме на модела да използва специфични инструменти за всяка задача.
- Отпечатахме генерираните отговори, за да демонстрираме ефектите от различните параметри за извличане на проби.
- Използвахме `allowedTools` за посочване на инструментите, които моделът може да използва по време на генериране. В този случай позволихме `ideaGenerator` и `environmentalImpactTool` за творчески задачи, и `factChecker` и `dataAnalysisTool` за фактически задачи.
- Използвахме `temperature` за контрол на случайността на изхода, като по-високите стойности водят до по-креативни отговори.
- Използвахме `top_p` за ограничаване на избора на токени до тези, които допринасят за най-горната кумулативна вероятност, подобрявайки качеството на генерирания текст.
- Използвахме `frequencyPenalty` и `presencePenalty` за намаляване на повторенията и насърчаване на разнообразието в изхода.
- Използвахме `top_k` за ограничаване на модела до топ K най-вероятни токени, което може да помогне за генериране на по-кохерентни отговори.

---

## Детерминистично извличане на проби

За приложения, изискващи последователни резултати, детерминистичното извличане на проби осигурява възпроизводими резултати. Това се постига чрез използване на фиксирано случайно семе и задаване на температура на нула.

Нека разгледаме примерна реализация по-долу, за да демонстрираме детерминистично извличане на проби в различни програмни езици.

# [Java](#tab/java)

```java
// Пример на Java: Определени отговори с фиксирано семе
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Използване на фиксирано семе за определени резултати
        
        // Първа заявка с фиксирано семе
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Нулева температура за максимална детерминираност
            .build();
            
        // Втора заявка със същото семе
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Изпълнете и двете заявки
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Отговорите трябва да са идентични поради същото семе и температура=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

В предишния код ние:

- Създадохме MCP клиент със зададен URL на сървъра.
- Конфигурирахме две заявки с един и същ промпт, фиксирано семе и нулева температура.
- Изпратихме и двете заявки и отпечатахме генерирания текст.
- Демонстрирахме, че отговорите са идентични поради детерминистичния характер на конфигурацията за извличане на проби (същото семе и температура).
- Използвахме `setSeed` за задаване на фиксирано случайно семе, което гарантира, че моделът генерира същия изход за едно и също входно съдържание всеки път.
- Зададохме `temperature` на нула, за да осигурим максимален детерминизъм, което означава, че моделът винаги ще избира най-вероятния следващ токен без случайност.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Пример на JavaScript: Детерминистични отговори с контрол на начална стойност
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Първа заявка с фиксирана начална стойност
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Нулева температура за максимален детерминизъм
    });
    
    // Втора заявка със същата начална стойност и температура
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Трета заявка с различна начална стойност, но със същата температура
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

В предишния код ние:

- Инициализирахме MCP клиент с URL на сървър.
- Конфигурирахме две заявки с един и същ промпт, фиксирано семе и нулева температура.
- Изпратихме и двете заявки и отпечатахме генерирания текст.
- Демонстрирахме, че отговорите са идентични поради детерминистичния характер на конфигурацията за извличане на проби (същото семе и температура).
- Използвахме `seed` за задаване на фиксирано случайно семе, което гарантира, че моделът генерира същия изход за едно и също входно съдържание всеки път.
- Зададохме `temperature` на нула, за да осигурим максимален детерминизъм, което означава, че моделът винаги ще избира най-вероятния следващ токен без случайност.
- Използвахме различно семе за третата заявка, за да покажем, че промяната на семето води до различни изходи, дори със същия промпт и температура.

---

## Динамична конфигурация на извличане на проби

Интелигентното извличане на проби адаптира параметрите според контекста и изискванията на всяка заявка. Това означава динамично настройване на параметри като температура, top_p и наказания според типа задача, предпочитанията на потребителя или историческата производителност.

Нека разгледаме как да прилагаме динамично извличане на проби в различни програмни езици.

# [Python](#tab/python)

```python
# Пример на Python: Динамично семплиране, базирано на контекста на заявката
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Дефиниране на предварителни настройки за семплиране за различни типове задачи
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Избор на базова предварителна настройка
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Корекция въз основа на предпочитанията на потребителя, ако са предоставени
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Скалиране на температурата въз основа на предпочитание за креативност (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Коригиране на top_p въз основа на желаното разнообразие на отговорите
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Създаване и изпращане на заявка с персонализирани параметри за семплиране
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Връщане на отговор с метаданни за семплиране за прозрачност
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

В предишния код ние:

- Създадохме клас `DynamicSamplingService`, който управлява адаптивното извличане на проби.
- Определихме предварителни настройки за извличане на проби за различни видове задачи (творчески, фактически, код, аналитични).
- Избрахме базова предварителна настройка въз основа на типа задача.
- Настроихме параметрите за извличане на проби според предпочитанията на потребителя, като ниво на креативност и разнообразие.
- Изпратихме заявката с динамично конфигурираните параметри за извличане на проби.
- Върнахме генерирания текст заедно с приложените параметри и типа задача за прозрачност.
- Използвахме `temperature` за контрол на случайността на изхода, като по-високите стойности водят до по-креативни отговори.
- Използвахме `top_p` за ограничаване на избора на токени до тези, които допринасят за най-горната кумулативна вероятност, подобрявайки качеството на генерирания текст.
- Използвахме `frequency_penalty` за намаляване на повторенията и насърчаване на разнообразието в изхода.
- Използвахме `user_preferences` за персонализация на параметрите според дефинираните от потребителя нива на креативност и разнообразие.
- Използвахме `task_type` за определяне на подходящата стратегия за извличане на проби в заявката, позволяваща по-персонализирани отговори според природата на задачата.
- Използвахме метода `send_request` за изпращане на промпта с конфигурираните параметри, за да се гарантира, че моделът генерира текст според зададените изисквания.
- Използвахме `generated_text` за получаване на отговора от модела, който след това се връща заедно с параметрите и типа задача за допълнителен анализ или показване.
- Използвахме функциите `min` и `max`, за да гарантираме, че потребителските предпочитания са в рамките на валидни граници, предотвратявайки невалидни конфигурации.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript пример: Динамична конфигурация на извадкове въз основа на контекста на потребителя
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Дефиниране на базови профили за извадки
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Проследяване на историческа производителност
    this.performanceHistory = [];
  }
  
  // Откриване на тип задача от подсказката
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Просто евристично откриване - може да бъде подобрено с ML класификация
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
    
    // По подразбиране към разговорен режим, ако не е открит ясен тип
    return 'conversational';
  }
  
  // Изчисляване на параметри за извадкове въз основа на контекста и предпочитанията на потребителя
  getSamplingParameters(prompt, context = {}) {
    // Открийте типа на задачата
    const taskType = this.detectTaskType(prompt, context);
    
    // Вземете базов профил
    let params = {...this.samplingProfiles[taskType]};
    
    // Регулиране въз основа на потребителските предпочитания
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Преобразуване от скала 1-10 към подходящия температурен диапазон
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // По-високото прецизиране означава по-нисък topP (по-фокусирано избиране)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // По-високата последователност означава по-ниски наказания
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Прилагане на научени корекции от историята на производителността
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Прост адаптивен логически алгоритъм - може да бъде подобрен с по-сложни алгоритми
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Вземане предвид само на последната история
    
    if (relevantHistory.length > 0) {
      // Изчисляване на средни оценки за производителност
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Ако производителността е под прага, настройте параметрите
      if (avgScore < 0.7) {
        // Лека корекция към по-безопасни стойности
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Записване на производителността за бъдещи корекции
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Оценка от 0-1 за качество на отговора
    });
    
    // Ограничаване на размера на историята
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Вземете оптимизирани параметри за извадки
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Изпратете заявката с оптимизираните параметри
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Ако потребителят даде обратна връзка, запишете я за бъдеща оптимизация
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

// Пример за употреба
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Креативна задача с персонализирани потребителски предпочитания
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Висока креативност (1-10)
          consistency: 3  // Ниска последователност (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Задача за генериране на код
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Ниска креативност
          precision: 8,   // Висока прецизност
          consistency: 9  // Висока последователност
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

В предишния код ние:

- Създадохме клас `AdaptiveSamplingManager`, който управлява динамично извличане на проби според типа задача и предпочитанията на потребителя.
- Определихме профили за извличане на проби за различни типове задачи (творчески, фактически, код, разговорни).
- Прилагнахме метод за откриване на типа задача от промпта чрез прости евристики.
- Изчислихме параметрите за извличане на проби според открития тип задача и предпочитанията на потребителя.
- Прилагаме научени корекции, базирани на историческа производителност за оптимизиране на параметрите.
- Записахме резултатите за бъдещи корекции, позволявайки на системата да се учи от минали взаимодействия.
- Изпратихме заявки с динамично конфигурирани параметри и върнахме генерирания текст заедно с приложените параметри и открития тип задача.
- Използвахме:
    - `userPreferences` за персонализиране на параметрите според дефинираните от потребителя нива на креативност, прецизност и последователност.
    - `detectTaskType` за определяне на естеството на задачата според промпта, което позволява по-персонализирани отговори.
    - `recordPerformance` за записване на производителността на генерираните отговори, позволявайки системата да се адаптира и подобрява с течение на времето.
    - `applyLearnedAdjustments` за модифициране на параметрите според историческа производителност, подобряваща способността на модела да генерира качествени отговори.
    - `generateResponse` за капсулиране на целия процес на генериране на отговор с адаптивно извличане на проби, улесняващо използването с различни промпти и контексти.
    - `allowedTools` за задаване кои инструменти моделът може да използва по време на генериране, позволявайки по-контекстно ориентирани отговори.
    - `feedbackScore` за позволяване на потребителите да предоставят обратна връзка за качеството на отговора, която може да бъде използвана за допълнително усъвършенстване.
    - `performanceHistory` за поддържане на записи на минали взаимодействия, позволяващ на системата да се учи от предишни успехи и неуспехи.
    - `getSamplingParameters` за динамично настройване на параметрите според контекста на заявката, позволяващо по-гъвкаво и отзивчиво поведение на модела.
    - `detectTaskType` за класифициране на задачата според промпта, позволяващо прилагане на подходящи стратегии за различни типове заявки.
    - `samplingProfiles` за определяне на базови конфигурации за различните типове задачи, позволяващи бързи настройки според естеството на заявката.

---

## Какво следва

- [5.7 Скалиране](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->