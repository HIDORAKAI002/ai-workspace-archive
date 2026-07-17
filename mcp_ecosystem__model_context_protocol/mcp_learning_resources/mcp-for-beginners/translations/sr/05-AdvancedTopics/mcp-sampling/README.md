> [ЗАСТАРЕЛО: 2026-07-28 РЕЛИЗ КАНДИДАТ](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Узорковање у Model Context Protocol

> **Обавештење о застаревању:** квалитетна спецификација `2026-07-28` MCP релиз кандидата означава Узорковање као застарело у корист директне интеграције са LLM провајдер API-јима. Узорковање наставља да ради у `2025-11-25` и најмање годину дана након било ког формалног застаревања, па све у овом лекцији остаје валидно - али нови серверски дизајни треба да процене заменски образац. Погледајте [Шта се мења у MCP: Релиз кандидат 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Узорковање је моћна MCP функција која омогућава серверима да преко клијента захтевају LLM комплетирања, омогућавајући софистицирано понашање агента уз задржавање безбедности и приватности. Правилна конфигурација узорковања може драматично побољшати квалитет одговора и перформансе. MCP обезбеђује стандардан начин контроле начина на који модели генеришу текст са специфичним параметрима који утичу на случајност, креативност и кохеренцију.

## Увод

У овој лекцији истражићемо како да конфигуришемо параметре узорковања у MCP захтевима и разумемо основну протоколску механику узорковања.

## Циљеви учења

До краја ове лекције бићете у могућности да:

- Разумете кључне параметре узорковања доступне у MCP-у.
- Конфигуришете параметре узорковања за различите случајеве коришћења.
- Имплементирате детерминистичко узорковање за репродуктивне резултате.
- Динамички прилагодите параметре узорковања у зависности од контекста и корисничких преференција.
- Примените стратегије узорковања за унапређење перформанси модела у разним сценаријима.
- Разумете како узорковање функционише у клијент-сервер току MCP-а.

## Како узорковање функционише у MCP

Ток узорковања у MCP следи ове кораке:

1. Сервер шаље `sampling/createMessage` захтев клијенту
2. Клијент прегледа захтев и може га изменити
3. Клијент узоркује из LLM-а
4. Клијент прегледа комплетирање
5. Клијент враћа резултат серверу

Овај дизајн са људским управљањем осигурава да корисници одржавају контролу над тим шта LLM види и генерише.

## Преглед параметара узорковања

MCP дефинише следеће параметре узорковања које може клијент користити у захтевима:

| Параметар | Опис | Типичан опсег |
|-----------|-------------|---------------|
| `temperature` | Контрола случајности у избору токена | 0.0 - 1.0 |
| `maxTokens` | Максималан број генерисаних токена | Целобројна вредност |
| `stopSequences` | Прилагођене секвенце које заустављају генерисање када се нађу | Низ стрингова |
| `metadata` | Допунски параметри специфични за провајдера | JSON објекат |

Многи LLM провајдери подржавају додатне параметре преко поља `metadata`, који могу да укључују:

| Уобичајени додатни параметар | Опис | Типичан опсег |
|-----------|-------------|---------------|
| `top_p` | Нуклеусно узорковање - ограничава токене на горњи кумулативни проценат вероватноће | 0.0 - 1.0 |
| `top_k` | Ограничава избор токена на највећих K опција | 1 - 100 |
| `presence_penalty` | Казна за токене на основу њиховог присуства у тексту до сада | -2.0 - 2.0 |
| `frequency_penalty` | Казна за токене на основу њихове учесталости у тексту до сада | -2.0 - 2.0 |
| `seed` | Конкретно случајно семе за репродуктивне резултате | Целобројна вредност |

## Пример формата захтева

Ево примера захтева за узорковање од клијента у MCP-у:

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

## Формат одговора

Клијент враћа резултат комплетирања:

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

## Контрола људске интервенције

MCP узорковање је дизајнирано имајући у виду људски надзор:

- **За упите**:
  - Клијенти треба да приказују корисницима предлоге упита
  - Корисници треба да могу да мењају или одбијају упите
  - Системски упити могу бити филтрирани или изменјени
  - Укључивање контекста контролише клијент

- **За комплетирања**:
  - Клијенти треба да приказују корисницима комплетирање
  - Корисници треба да могу да мењају или одбијају комплетирања
  - Клијенти могу филтрирати или изменјивати комплетирања
  - Корисници контролишу који модел се користи

Са овим принципима на уму, погледајмо како имплементирати узорковање у различитим програмским језицима, фокусирајући се на параметре које обично подржавају LLM провајдери.

## Безбедносни аспекти

При имплементацији узорковања у MCP, размислите о следећим безбедносним најбољим праксама:

- **Проверите сав садржај порука** пре слања клијенту
- **Очистите осетљиве информације** из упита и комплетирања
- **Спроведите ограничења брзине** да спречите злоупотребу
- **Праћење коришћења узорковања** за неуобичајене обрасце
- **Шифровање података у преносу** коришћењем безбедних протокола
- **Руковање приватношћу корисника** у складу са релевантним регулативама
- **Ревизија захтева за узорковање** ради усаглашености и безбедности
- **Контрола излагања трошковима** са одговарајућим ограничењима
- **Имплементација тајмаута** за захтеве узорковања
- **Побрини се да грешке модела буду обрађене** са одговарајућим алтернативама

Параметри узорковања омогућавају прецизно прилагођавање понашања језичких модела како би се постигао жељени баланс између детерминистичких и креативних резултата.

Погледајмо како да конфигуришемо ове параметре у различитим програмским језицима.

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

У претходном коду смо:

- Креирали MCP клијента са одређеним URL сервером.
- Конфигурисали захтев са параметрима узорковања као што су `temperature`, `top_p` и `top_k`.
- Послали захтев и исписали генерисани текст.
- Коришћено је:
    - `allowedTools` да наведемо које алате модел може користити током генерисања. У овом случају, дозволили смо `ideaGenerator` и `marketAnalyzer` алате за помоћ у генерисању креативних идеја за апликације.
    - `frequencyPenalty` и `presencePenalty` за контролу понављања и разноликости у излазу.
    - `temperature` за контролу случајности излаза, где веће вредности воде ка креативнијим одговорима.
    - `top_p` да ограничи избор токена на оне који доприносе највећој кумулативној вероватноћи, побољшавајући квалитет генерисаног текста.
    - `top_k` да ограничи модел на највероватнијих K токена, што може помоћи у генерисању кохерентнијих одговора.
    - Опет `frequencyPenalty` и `presencePenalty` за смањење понављања и охрабривање разноликости у генерисаном тексту.

# [JavaScript](#tab/javascript)

```javascript
// Пример у ЈаваСкрипту: Конфигурација температуре и Top-P узорковања
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Иницијализуј MCP клијента
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Конфигуриши захтев са различитим параметрима узорковања
  const creativeSampling = {
    temperature: 0.9,    // Виша температура = више случајности/креативности
    topP: 0.92,          // Узми у обзир токене са укупним 92% вероватноће
    frequencyPenalty: 0.6, // Смањи понављање секвенци токена
    presencePenalty: 0.4   // Казни токене који су се претходно појавили у тексту
  };
  
  const factualSampling = {
    temperature: 0.2,    // Нижа температура = више детерминистички/фактички
    topP: 0.85,          // Нешто фокусиранији избор токена
    frequencyPenalty: 0.2, // Минимална казна за понављање
    presencePenalty: 0.1   // Минимална казна за присуство
  };
  
  try {
    // Пошаљи два захтева са различитим конфигурацијама узорковања
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

У претходном коду смо:

- Иницијализовали MCP клијента са URL сервером и API кључем.
- Конфигурисали два скупа параметара узорковања: један за креативне задатке и други за чињеничне задатке.
- Послали захтеве са овим конфигурацијама, омогућавајући моделу коришћење специфичних алата за сваки задатак.
- Исписали генерисане одговоре да демонстрирамо ефекте различитих параметара узорковања.
- Користили `allowedTools` да наведу које алате модел може користити током генерисања. У овом случају, дозволили смо `ideaGenerator` и `environmentalImpactTool` за креативне задатке, а `factChecker` и `dataAnalysisTool` за чињеничне задатке.
- Користили `temperature` за контролу случајности излаза, где веће вредности воде ка креативнијим одговорима.
- Користили `top_p` да ограниче избор токена на оне који доприносе највећој кумулативној вероватноћи, побољшавајући квалитет генерисаног текста.
- Користили `frequencyPenalty` и `presencePenalty` за смањење понављања и охрабривање разноликости у излазу.
- Користили `top_k` да ограничи модел на највероватнијих K токена, што може помоћи у генерисању кохерентнијих одговора.

---

## Детерминистичко узорковање

За апликације које захтевају конзистентне излазе, детерминистичко узорковање обезбеђује репродуктивне резултате. То се постиже коришћењем фиксног случајног семена и подешавањем температуре на нулу.

Погледајмо пример имплементације да демонстрирамо детерминистичко узорковање у различитим програмским језицима.

# [Java](#tab/java)

```java
// Јава пример: Детерминистички одговори са фиксним семеном
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Коришћење фиксног семена за детерминистичке резултате
        
        // Први захтев са фиксним семеном
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Нула температура за максималну детерминисаност
            .build();
            
        // Други захтев са истим семеном
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Изврши оба захтева
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Одговори треба да буду идентични због истог семена и температуре=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

У претходном коду смо:

- Креирали MCP клијента са одређеним URL сервером.
- Конфигурисали два захтева са истим упитом, фиксним семеном и температуром нула.
- Послали оба захтева и исписали генерисани текст.
- Показали да су одговори идентични због детерминистичке природе конфигурације узорковања (исто семе и температура).
- Користили `setSeed` да наведемо фиксно случајно семе, обезбеђујући да модел генерише исти излаз за исти улаз сваки пут.
- Подесили `temperature` на нулу да осигурамо максималну детерминисаност, што значи да ће модел увек изабрати највероватнији следећи токен без случајности.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript пример: детерминистички одговори са контролом сида
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Први захтев са фиксним сидом
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Нула температура за максималну детерминисаност
    });
    
    // Други захтев са истим сидом и температуром
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Трећи захтев са другим сидом али истом температуром
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

У претходном коду смо:

- Иницијализовали MCP клијента са URL сервером.
- Конфигурисали два захтева са истим упитом, фиксним семеном и температуром нула.
- Послали оба захтева и исписали генерисани текст.
- Показали да су одговори идентични због детерминистичке природе конфигурације узорковања (исто семе и температура).
- Користили `seed` да наведемо фиксно случајно семе, обезбеђујући да модел генерише исти излаз за исти улаз сваки пут.
- Подесили `temperature` на нулу да осигурамо максималну детерминисаност, што значи да ће модел увек изабрати највероватнији следећи токен без случајности.
- Користили друго семе за трећи захтев да покажемо да промена семена резултује другачијим излазом, чак и уз исти упит и температуру.

---

## Динамичка конфигурација узорковања

Интелигентно узорковање прилагођава параметре на основу контекста и захтева сваког захтева. То значи динамичко подешавање параметара као што су temperature, top_p и казне узимајући у обзир врсту задатка, преференције корисника или историјске перформансе.

Погледајмо како имплементирати динамичко узорковање у различитим програмским језицима.

# [Python](#tab/python)

```python
# Пример у Питону: динамичко узорковање засновано на контексту захтева
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Дефинишите претходно подешене вредности за различите типове задатака
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Изаберите основну претходно подешену вредност
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Прилагодите у складу са корисничким преференцама ако су доступне
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Скалирајте температуру у зависности од жељене креативности (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Прилагодите top_p у складу са жељеном разноврсношћу одговора
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Креирајте и пошаљите захтев са прилагођеним параметрима узорковања
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Вратите одговор са метаподацима о узорковању ради транспарентности
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

У претходном коду смо:

- Креирали класу `DynamicSamplingService` која управља адаптивним узорковањем.
- Дефинисали пресете узорковања за различите типове задатака (креативни, чињенични, код, аналитички).
- Изабрали базични пресет узорковања на основу типа задатка.
- Прилагодили параметре узорковања на основу корисничких преференција, као што су ниво креативности и разноликост.
- Послали захтев са динамички конфигурисаним параметрима узорковања.
- Вратили генерисани текст заједно са применама параметрима узорковања и типом задатка ради транспарентности.
- Користили `temperature` за контролу случајности излаза, где веће вредности воде ка креативнијим одговорима.
- Користили `top_p` да ограниче избор токена на оне који доприносе највећој кумулативној вероватноћи, побољшавајући квалитет генерисаног текста.
- Користили `frequency_penalty` за смањење понављања и охрабривање разноликости у излазу.
- Користили `user_preferences` да омогуће прилагођавање параметара узорковања на основу кориснички дефинисаног нивоа креативности и разноликости.
- Користили `task_type` да одреде одговарајућу стратегију узорковања за захтев, омогућавајући прилагођеније одговоре на основу природе задатка.
- Користили методу `send_request` за слање упита са конфигурисаним параметрима узорковања, осигуравајући да модел генерише текст према наведеним захтевима.
- Користили `generated_text` да преузму одговор модела, који се затим враћа заједно са параметрима узорковања и типом задатка за даљу анализу или приказ.
- Користили функције `min` и `max` да обезбеде да су корисничке преференције унутар важећих опсега, спречавајући невалидне конфигурације узорковања.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// ЈаваСкрипт пример: Динамичка конфигурација узорковања базирана на корисничком контексту
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Дефиниши основне профиле узорковања
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Прати историјске перформансе
    this.performanceHistory = [];
  }
  
  // Детектуј тип задатка из упита
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Једноставна хеуристичка детекција - може се побољшати МЛ класификацијом
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
    
    // Подразумевано на разговорно ако није откривен јасан тип
    return 'conversational';
  }
  
  // Израчунај параметре узорковања на основу контекста и корисничких преференција
  getSamplingParameters(prompt, context = {}) {
    // Детектуј тип задатка
    const taskType = this.detectTaskType(prompt, context);
    
    // Узми основни профил
    let params = {...this.samplingProfiles[taskType]};
    
    // Прилагоди на основу корисничких преференција
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Прескалирaј са 1-10 на одговарајући распон температуре
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Већа прецизност значи нижи topP (фокусиранији избор)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Већа конзистентност значи ниже казне
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Примени научена подешавања из историје перформанси
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Једноставна адаптивна логика - може се побољшати софистициранијим алгоритмима
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Узимај у обзир само недавну историју
    
    if (relevantHistory.length > 0) {
      // Израчунај просечне оцене перформанси
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Ако су перформансе испод прага, прилагоди параметре
      if (avgScore < 0.7) {
        // Благо подешавање ка сигурнијим вредностима
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Запамти перформансе за будућа подешавања
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Оцена квалитета одговора од 0 до 1
    });
    
    // Ограничити величину историје
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Узми оптимизоване параметре узорковања
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Пошаљи захтев са оптимизованим параметрима
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Ако корисник да повратну информацију, забележи је за будућу оптимизацију
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

// Пример коришћења
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Креативан задатак са прилагођеним корисничким преференцијама
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Висока креативност (1-10)
          consistency: 3  // Ниска конзистентност (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Задатак генерације кода
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Ниска креативност
          precision: 8,   // Висока прецизност
          consistency: 9  // Висока конзистентност
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

У претходном коду смо:

- Креирали класу `AdaptiveSamplingManager` која управља динамичким узорковањем заснованим на типу задатка и корисничким преференцама.
- Дефинисали профиле узорковања за различите типове задатака (креативни, чињенични, код, разговорни).
- Имплементирали метод за детекцију типa задатка из упита коришћењем једноставних хеуристика.
- Израчунавали параметре узорковања на основу детектованог типа задатка и корисничких преференција.
- Применили прилагођавања заснована на наученим историјским перформансама за оптимизацију параметара узорковања.
- Бележили перформансе за будућа прилагођавања, омогућавајући систему да учи из претходних интеракција.
- Сларали захтеве са динамички конфигурисаним параметрима узорковања и враћали генерисани текст са применама параметара и детектованим типом задатка.
- Коришћено је:
    - `userPreferences` да омогуће прилагођавање параметара узорковања на основу кориснички дефинисаних нивоа креативности, прецизности и конзистентности.
    - `detectTaskType` да одреди природу задатка на основу упита, омогућавајући прилагођеније одговоре.
    - `recordPerformance` да евидентира перформансе генерисаних одговора, омогућавајући систему да се прилагоди и побољшава током времена.
    - `applyLearnedAdjustments` да модифikuје параметре узорковања на основу историјских перформанси, побољшавајући способност модела да генерише одговоре високог квалитета.
    - `generateResponse` да инкапсулира цео процес генерисања одговора са адаптивним узорковањем, олакшавајући позив са различитим упитима и контекстом.
    - `allowedTools` да наведу које алате модел може користити током генерисања, омогућавајући одговоре свесне контекста.
    - `feedbackScore` да омогући корисницима да пруже повратне информације о квалитету генерисаног одговора, које могу бити коришћене за додатно унапређење перформанси модела током времена.
    - `performanceHistory` да одржава евиденцију претходних интеракција, омогућавајући систему да учи из претходних успеха и неуспеха.
    - `getSamplingParameters` да динамички прилагоди параметре узорковања на основу контекста захтева, омогућавајући флексибилније и реактивније понашање модела.
    - `detectTaskType` да класификује задатак на основу упита, омогућавајући систему да примени одговарајуће стратегије узорковања за различите типове захтева.
    - `samplingProfiles` да дефинише базичне конфигурације узорковања за различите типове задатака, омогућавајући брза прилагођавања на основу природе захтева.

---

## Шта следи

- [5.7 Скалирање](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->