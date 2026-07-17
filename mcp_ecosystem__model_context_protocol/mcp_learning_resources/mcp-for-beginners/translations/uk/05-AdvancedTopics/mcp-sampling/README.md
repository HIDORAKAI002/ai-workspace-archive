> [ЗАСТАРІЛО: ВИХІДНА КАНДИДАТУРА 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Вибірка в Model Context Protocol

> **Повідомлення про застарівання:** кандидат у реліз специфікації MCP `2026-07-28` позначає Вибірку як застарілу на користь прямої інтеграції з API постачальників LLM. Вибірка продовжує працювати у версії `2025-11-25` і протягом принаймні року після офіційного застарівання, тому все в цьому уроці лишається дійсним — але нові дизайни серверів повинні оцінити замінний підхід. Дивіться [Що змінюється в MCP: кандидат для релізу 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Вибірка — це потужна функція MCP, що дозволяє серверам запитувати завершення LLM через клієнта, забезпечуючи складні агентські поведінки при збереженні безпеки та конфіденційності. Правильна конфігурація вибірки може кардинально покращити якість відповіді та продуктивність. MCP надає стандартизований спосіб керування тим, як моделі генерують текст із конкретними параметрами, що впливають на випадковість, креативність і послідовність.

## Вступ

У цьому уроці ми розглянемо, як налаштовувати параметри вибірки в запитах MCP та зрозуміємо основні механіки протоколу вибірки.

## Цілі навчання

Наприкінці цього уроку ви зможете:

- Зрозуміти ключові параметри вибірки, доступні в MCP.
- Налаштовувати параметри вибірки для різних випадків використання.
- Реалізувати детерміновану вибірку для відтворюваних результатів.
- Динамічно регулювати параметри вибірки на основі контексту та вподобань користувача.
- Застосовувати стратегії вибірки для підвищення продуктивності моделей у різних сценаріях.
- Зрозуміти, як працює вибірка в клієнт-серверному потоці MCP.

## Як працює вибірка в MCP

Потік вибірки в MCP включає такі кроки:

1. Сервер надсилає запит `sampling/createMessage` клієнту
2. Клієнт переглядає запит і може його змінити
3. Клієнт виконує вибірку з LLM
4. Клієнт переглядає завершення
5. Клієнт повертає результат серверу

Цей дизайн із людиною в циклі гарантує, що користувачі зберігають контроль над тим, що бачить і генерує LLM.

## Огляд параметрів вибірки

MCP визначає такі параметри вибірки, які можна налаштовувати у запитах клієнта:

| Параметр | Опис | Типовий діапазон |
|-----------|-------------|---------------|
| `temperature` | Контролює випадковість при виборі токенів | 0.0 - 1.0 |
| `maxTokens` | Максимальна кількість генерованих токенів | Ціле число |
| `stopSequences` | Користувацькі послідовності, які зупиняють генерацію при зустрічі | Масив рядків |
| `metadata` | Додаткові параметри, специфічні для провайдера | JSON об’єкт |

Багато провайдерів LLM підтримують додаткові параметри через поле `metadata`, яке може включати:

| Загальний розширений параметр | Опис | Типовий діапазон |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling — обмеження токенів верхньою кумулятивною ймовірністю | 0.0 - 1.0 |
| `top_k` | Обмеження вибору токенів топ K варіантами | 1 - 100 |
| `presence_penalty` | Карає токени залежно від їх присутності в тексті | -2.0 - 2.0 |
| `frequency_penalty` | Карає токени залежно від їх частоти в тексті | -2.0 - 2.0 |
| `seed` | Конкретне випадкове зерно для відтворюваності | Ціле число |

## Формат прикладу запиту

Ось приклад запиту вибірки від клієнта в MCP:

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

## Формат відповіді

Клієнт повертає результат завершення:

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

## Контроль людиною в циклі

Вибірка в MCP розроблена з урахуванням контролю людини:

- **Для підказок**:
  - Клієнти повинні показувати користувачам запропоновану підказку
  - Користувачі повинні мати можливість змінювати або відхиляти підказки
  - Системні підказки можуть бути відфільтровані або змінені
  - Включення контексту контролюється клієнтом

- **Для завершень**:
  - Клієнти повинні показувати користувачам завершення
  - Користувачі повинні мати можливість змінювати або відхиляти завершення
  - Клієнти можуть фільтрувати або змінювати завершення
  - Користувачі контролюють, яка модель використовується

Враховуючи ці принципи, розглянемо, як реалізувати вибірку різними мовами програмування, зосереджуючись на параметрах, які підтримуються більшістю провайдерів LLM.

## Безпекові аспекти

При реалізації вибірки в MCP врахуйте такі кращі практики безпеки:

- **Перевіряйте весь вміст повідомлень** перед відправкою клієнту
- **Очищуйте конфіденційну інформацію** із підказок і завершень
- **Впроваджуйте обмеження швидкості** щоб запобігти зловживанням
- **Моніторьте використання вибірки** на предмет аномалій
- **Шифруйте дані під час передачі** із використанням безпечних протоколів
- **Дотримуйтесь конфіденційності користувацьких даних** згідно з відповідними нормами
- **Аудит запитів вибірки** для відповідності та безпеки
- **Контролюйте витрати** за допомогою відповідних обмежень
- **Реалізовуйте тайм-аути** для запитів вибірки
- **Обробляйте помилки моделі коректно** з відповідними обходами

Параметри вибірки дозволяють точно налаштовувати поведінку мовних моделей, щоб досягти бажаного балансу між детермінованими та творчими результатами.

Розглянемо, як налаштовувати ці параметри різними мовами програмування.

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

У наведеному коді ми:

- Створили клієнта MCP із вказаною URL сервера.
- Налаштували запит із параметрами вибірки, такими як `temperature`, `top_p` і `top_k`.
- Відправили запит і вивели згенерований текст.
- Використали:
    - `allowedTools`, щоб вказати, які інструменти модель може використовувати під час генерації. У цьому випадку ми дозволили інструменти `ideaGenerator` і `marketAnalyzer` для допомоги в генерації креативних ідей додатків.
    - `frequencyPenalty` і `presencePenalty` для контролю повторень і різноманітності вихідних даних.
    - `temperature` для контролю випадковості результату, де вищі значення призводять до більш креативних відповідей.
    - `top_p`, щоб обмежити вибір токенів тими, що вносять вклад у верхню кумулятивну ймовірність, підвищуючи якість згенерованого тексту.
    - `top_k`, щоб обмежити модель токенами з топ K найімовірніших, що може допомогти генерувати більш послідовні відповіді.
    - `frequencyPenalty` і `presencePenalty`, щоб зменшити повторення і заохотити різноманітність у згенерованому тексті.

# [JavaScript](#tab/javascript)

```javascript
// Приклад JavaScript: налаштування температури та Top-P семплінгу
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Ініціалізувати клієнта MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Налаштувати запит з різними параметрами семплінгу
  const creativeSampling = {
    temperature: 0.9,    // Вища температура = більше випадковості/креативності
    topP: 0.92,          // Розглядати токени з топ 92% ймовірнісної маси
    frequencyPenalty: 0.6, // Зменшити повторення послідовностей токенів
    presencePenalty: 0.4   // Карати токени, які вже з'являлися в тексті
  };
  
  const factualSampling = {
    temperature: 0.2,    // Нижча температура = більш детермінований/фактичний результат
    topP: 0.85,          // Трохи більш сфокусований вибір токенів
    frequencyPenalty: 0.2, // Мінімальне покарання за повторення
    presencePenalty: 0.1   // Мінімальне покарання за присутність
  };
  
  try {
    // Відправити два запити з різними конфігураціями семплінгу
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

У наведеному коді ми:

- Ініціалізували клієнта MCP з URL сервера та ключем API.
- Налаштували два набори параметрів вибірки: один для креативних завдань, інший для фактичних.
- Відправили запити з цими конфігураціями, дозволяючи моделі використовувати певні інструменти для кожного завдання.
- Вивели згенеровані відповіді, щоб продемонструвати вплив різних параметрів вибірки.
- Використали `allowedTools`, щоб вказати, які інструменти може використовувати модель під час генерації. У цьому випадку ми дозволили `ideaGenerator` і `environmentalImpactTool` для креативних завдань, а `factChecker` і `dataAnalysisTool` для фактичних.
- Використали `temperature` для контролю випадковості виходу, де вищі значення стимулюють більш креативні відповіді.
- Використали `top_p`, щоб обмежити вибір токенів тими, що сприяють верхній кумулятивній ймовірності, підвищуючи якість згенерованого тексту.
- Використали `frequencyPenalty` і `presencePenalty`, щоб зменшити повторення та заохотити різноманітність у виході.
- Використали `top_k`, щоб обмежити модель токенами з топ K найімовірніших, що допомагає генерувати більш послідовні відповіді.

---

## Детермінована вибірка

Для застосунків, що потребують послідовних результатів, детермінована вибірка забезпечує відтворювані результати. Це досягається за допомогою фіксованого випадкового зерна та встановлення температури в нуль.

Розглянемо нижченаведену прикладну реалізацію, щоб показати детерміновану вибірку різними мовами програмування.

# [Java](#tab/java)

```java
// Приклад Java: Детерміновані відповіді з фіксованим зерном
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Використання фіксованого зерна для детермінованих результатів
        
        // Перший запит з фіксованим зерном
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Нульова температура для максимального детермінізму
            .build();
            
        // Другий запит з тим самим зерном
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Виконати обидва запити
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Відповіді повинні бути ідентичними через однакове зерно та температуру=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

У наведеному коді ми:

- Створили клієнта MCP з вказаною URL сервера.
- Налаштували два запити з однаковою підказкою, фіксованим зерном і температурою нуль.
- Відправили обидва запити і вивели згенерований текст.
- Продемонстрували, що відповіді ідентичні через детермінатність конфігурації вибірки (те саме зерно і температура).
- Використали `setSeed`, щоб вказати фіксоване випадкове зерно, гарантувавши, що модель генерує однаковий вихід для одного й того ж вводу щоразу.
- Встановили `temperature` в нуль, щоб забезпечити максимальну детермінованість, тобто модель завжди обиратиме найбільш ймовірний наступний токен без випадковості.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Приклад JavaScript: Детерміновані відповіді з контролем зерна
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Перший запит з фіксованим зерном
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Нульова температура для максимального детермінізму
    });
    
    // Другий запит з тим самим зерном і температурою
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Третій запит з іншим зерном, але з тією ж температурою
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

У наведеному коді ми:

- Ініціалізували клієнта MCP з URL сервера.
- Налаштували два запити з однаковою підказкою, фіксованим зерном і температурою нуль.
- Відправили обидва запити і вивели згенерований текст.
- Продемонстрували, що відповіді ідентичні через детермінований характер конфігурації вибірки (те саме зерно і температура).
- Використали `seed`, щоб вказати фіксоване випадкове зерно, гарантувавши, що модель генерує однаковий результат для того ж вводу щоразу.
- Встановили `temperature` в нуль, щоб забезпечити максимальну детермінованість, тобто модель завжди обиратиме найбільш ймовірний наступний токен без випадковості.
- Використали інше зерно для третього запиту, щоб показати, що зміна зерна дає різні результати навіть при однаковій підказці і температурі.

---

## Динамічна конфігурація вибірки

Інтелектуальна вибірка адаптує параметри на основі контексту і вимог кожного запиту. Це означає динамічне регулювання параметрів, таких як temperature, top_p і штрафи на основі типу завдання, вподобань користувача або історичної продуктивності.

Розглянемо, як реалізувати динамічну вибірку різними мовами програмування.

# [Python](#tab/python)

```python
# Приклад на Python: Динамічне вибіркове опитування на основі контексту запиту
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Визначте зразки вибірки для різних типів завдань
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Виберіть базовий зразок
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Налаштуйте відповідно до переваг користувача, якщо надано
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Масштабуйте температуру залежно від переваги креативності (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Налаштуйте top_p залежно від бажаної різноманітності відповіді
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Створіть та надішліть запит з користувацькими параметрами вибірки
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Поверніть відповідь із метаданими вибірки для прозорості
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

У наведеному коді ми:

- Створили клас `DynamicSamplingService`, який управляє адаптивною вибіркою.
- Визначили пресети вибірки для різних типів завдань (креативні, фактичні, кодування, аналітичні).
- Вибрали базовий пресет вибірки залежно від типу завдання.
- Відкоригували параметри вибірки згідно із вподобаннями користувача, такими як рівень креативності та різноманітність.
- Відправили запит із динамічно налаштованими параметрами вибірки.
- Повернули згенерований текст разом із застосованими параметрами вибірки і типом завдання для прозорості.
- Використали `temperature` для контролю випадковості результату, де вищі значення стимулюють більш креативні відповіді.
- Використали `top_p`, щоб обмежити вибір токенів тими, що вносять вклад у верхню кумулятивну ймовірність, підвищуючи якість згенерованого тексту.
- Використали `frequency_penalty` для зменшення повторень і заохочення різноманітності у виході.
- Використали `user_preferences` для кастомізації параметрів вибірки на основі визначених користувачем рівнів креативності та різноманітності.
- Використали `task_type` для визначення відповідної стратегії вибірки для запиту, що дозволяє створювати більш персоналізовані відповіді відповідно до природи завдання.
- Використали метод `send_request`, щоб відправити підказку із налаштованими параметрами вибірки та забезпечити генерацію тексту згідно з вказаними вимогами.
- Використали `generated_text`, щоб отримати відповідь моделі, яку потім повернули разом із параметрами вибірки і типом завдання для подальшого аналізу чи відображення.
- Використали функції `min` і `max`, щоб переконатися, що вподобання користувача узгоджені з допустимими діапазонами, уникаючи некоректних конфігурацій вибірки.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// Приклад JavaScript: динамічна конфігурація вибірки на основі контексту користувача
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Визначення базових профілів вибірки
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Відстеження історичної продуктивності
    this.performanceHistory = [];
  }
  
  // Визначення типу завдання з підказки
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Проста евристична детекція - може бути покращена за допомогою класифікації машинного навчання
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
    
    // За замовчуванням - розмовний режим, якщо тип не визначено
    return 'conversational';
  }
  
  // Обчислення параметрів вибірки на основі контексту та вподобань користувача
  getSamplingParameters(prompt, context = {}) {
    // Визначення типу завдання
    const taskType = this.detectTaskType(prompt, context);
    
    // Отримати базовий профіль
    let params = {...this.samplingProfiles[taskType]};
    
    // Коригування на основі вподобань користувача
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Масштабування від 1 до 10 до відповідного діапазону температури
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Вища точність означає нижче topP (більш сфокусований вибір)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Вища узгодженість означає менші штрафи
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Застосування вивчених коригувань з історії продуктивності
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Проста адаптивна логіка - може бути покращена більш складними алгоритмами
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Враховувати тільки останню історію
    
    if (relevantHistory.length > 0) {
      // Обчислення середніх показників продуктивності
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Якщо продуктивність нижча за поріг, коригувати параметри
      if (avgScore < 0.7) {
        // Невелика корекція у бік безпечніших значень
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Запис продуктивності для майбутніх коригувань
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Оцінка якості відповіді від 0 до 1
    });
    
    // Обмеження розміру історії
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Отримати оптимізовані параметри вибірки
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Надіслати запит з оптимізованими параметрами
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Якщо користувач надає відгук, записати його для майбутньої оптимізації
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

// Приклад використання
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Креативне завдання з індивідуальними вподобаннями користувача
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Висока креативність (1-10)
          consistency: 3  // Низька узгодженість (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Завдання генерації коду
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Низька креативність
          precision: 8,   // Висока точність
          consistency: 9  // Висока узгодженість
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

У наведеному коді ми:

- Створили клас `AdaptiveSamplingManager`, який управляє динамічною вибіркою на основі типу завдання і вподобань користувача.
- Визначили профілі вибірки для різних типів завдань (креативні, фактичні, кодування, розмовні).
- Реалізували метод для визначення типу завдання за підказкою з використанням простих евристик.
- Обчислили параметри вибірки на основі визначеного типу завдання та вподобань користувача.
- Застосували навчальні коригування на основі історичної продуктивності для оптимізації параметрів вибірки.
- Задокументували продуктивність для майбутніх коригувань, дозволяючи системі навчатися на попередніх взаємодіях.
- Відправили запити з динамічно налаштованими параметрами вибірки і повернули згенерований текст разом із застосованими параметрами і визначеним типом завдання.
- Використали:
    - `userPreferences`, щоб дозволити кастомізацію параметрів вибірки на основі користувацьких рівнів креативності, точності та послідовності.
    - `detectTaskType`, щоб визначити природу завдання на основі підказки, що дає змогу створювати більш персоналізовані відповіді.
    - `recordPerformance`, щоб записувати продуктивність згенерованих відповідей, даючи системі можливість адаптуватися і покращуватись з часом.
    - `applyLearnedAdjustments`, щоб змінювати параметри вибірки на основі історичної продуктивності, покращуючи здатність моделі генерувати якісні відповіді.
    - `generateResponse`, щоб інкапсулювати весь процес генерації відповіді з адаптивною вибіркою, роблячи його зручним для виклику з різними підказками і контекстами.
    - `allowedTools`, щоб вказати, які інструменти модель може використовувати під час генерації, даючи змогу отримувати контекстно орієнтовані відповіді.
    - `feedbackScore`, щоб дозволити користувачам оцінювати якість згенерованої відповіді, що може бути використано для подальшого покращення продуктивності моделі з часом.
    - `performanceHistory`, щоб зберігати записи минулих взаємодій, дозволяючи системі навчатися на попередніх успіхах і помилках.
    - `getSamplingParameters`, щоб динамічно регулювати параметри вибірки на основі контексту запиту, забезпечуючи більш гнучку і чутливу поведінку моделі.
    - `detectTaskType`, щоб класифікувати завдання за підказкою, даючи змогу застосовувати відповідні стратегії вибірки для різних типів запитів.
    - `samplingProfiles`, щоб визначити базові конфігурації вибірки для різних типів завдань, дозволяючи швидко коригувати параметри залежно від природи запиту.

---

## Що далі

- [5.7 Масштабування](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->