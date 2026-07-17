> [PRZESTARZAŁE: KANDYDAT DO WYDANIA 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Próbowanie w Protokole Kontekstu Modelu

> **Informacja o przestarzałości:** kandydat do wydania specyfikacji MCP `2026-07-28` oznacza Próbowanie jako przestarzałe na rzecz bezpośredniej integracji z API dostawców LLM. Próbowanie nadal działa w `2025-11-25` i przez co najmniej rok po formalnym wycofaniu, więc wszystko w tej lekcji pozostaje ważne - ale nowe projekty serwerów powinny rozważyć wzorzec zastępczy. Zobacz [Co się zmienia w MCP: Kandydat do wydania 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Próbowanie to potężna funkcja MCP, która pozwala serwerom na żądanie uzupełnień LLM przez klienta, umożliwiając zaawansowane zachowania agentowe przy zachowaniu bezpieczeństwa i prywatności. Właściwa konfiguracja próbkowania może znacząco poprawić jakość i wydajność odpowiedzi. MCP zapewnia ustandaryzowany sposób kontrolowania, jak modele generują tekst z użyciem określonych parametrów wpływających na losowość, kreatywność i spójność.

## Wprowadzenie

W tej lekcji omówimy, jak konfigurować parametry próbkowania w żądaniach MCP i zrozumieć mechanizmy protokołu stojące za próbkowaniem.

## Cele nauki

Pod koniec tej lekcji będziesz w stanie:

- Zrozumieć kluczowe parametry próbkowania dostępne w MCP.
- Konfigurować parametry próbkowania dla różnych przypadków użycia.
- Implementować deterministyczne próbkowanie dla powtarzalnych wyników.
- Dynamicznie dostosowywać parametry próbkowania w oparciu o kontekst i preferencje użytkownika.
- Stosować strategie próbkowania dla poprawy wydajności modeli w różnych scenariuszach.
- Zrozumieć, jak próbkowanie działa w przepływie klient-serwer w MCP.

## Jak działa próbkowanie w MCP

Przepływ próbkowania w MCP przebiega według następujących kroków:

1. Serwer wysyła żądanie `sampling/createMessage` do klienta
2. Klient przegląda żądanie i może je zmodyfikować
3. Klient próbuje z LLM
4. Klient przegląda uzupełnienie
5. Klient zwraca wynik do serwera

Ta konstrukcja z człowiekiem w pętli zapewnia użytkownikom kontrolę nad tym, co LLM widzi i generuje.

## Przegląd parametrów próbkowania

MCP definiuje następujące parametry próbkowania, które mogą być konfigurowane w żądaniach klienta:

| Parametr | Opis | Typowy zakres |
|-----------|-------------|---------------|
| `temperature` | Kontroluje losowość wyboru tokenów | 0.0 - 1.0 |
| `maxTokens` | Maksymalna liczba tokenów do wygenerowania | Wartość całkowita |
| `stopSequences` | Niestandardowe sekwencje przerywające generowanie | Tablica łańcuchów znaków |
| `metadata` | Dodatkowe parametry specyficzne dla dostawcy | Obiekt JSON |

Wielu dostawców LLM wspiera dodatkowe parametry przez pole `metadata`, które mogą obejmować:

| Powszechny parametr rozszerzenia | Opis | Typowy zakres |
|-----------|-------------|---------------|
| `top_p` | Próbowanie jądrowe - ogranicza tokeny do najwyższej skumulowanej prawdopodobności | 0.0 - 1.0 |
| `top_k` | Ogranicza wybór tokenów do najlepszych K opcji | 1 - 100 |
| `presence_penalty` | Kara za obecność tokenów w dotychczasowym tekście | -2.0 - 2.0 |
| `frequency_penalty` | Kara za częstotliwość tokenów w dotychczasowym tekście | -2.0 - 2.0 |
| `seed` | Konkretny losowy seed dla powtarzalnych wyników | Wartość całkowita |

## Przykładowy format żądania

Oto przykład żądania próbkowania od klienta w MCP:

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

## Format odpowiedzi

Klient zwraca wynik uzupełnienia:

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

## Kontrola człowieka w pętli

Próbowanie MCP jest zaprojektowane z myślą o nadzorze człowieka:

- **Dla promptów**:
  - Klienci powinni pokazywać użytkownikom proponowany prompt
  - Użytkownicy powinni móc modyfikować lub odrzucać prompt
  - Prompty systemowe mogą być filtrowane lub modyfikowane
  - Włączenie kontekstu jest kontrolowane przez klienta

- **Dla uzupełnień**:
  - Klienci powinni pokazywać użytkownikom uzupełnienie
  - Użytkownicy powinni móc modyfikować lub odrzucać uzupełnienia
  - Klienci mogą filtrować lub modyfikować uzupełnienia
  - Użytkownicy kontrolują, który model jest używany

Z tymi zasadami na uwadze spójrzmy, jak zaimplementować próbkowanie w różnych językach programowania, koncentrując się na parametrach powszechnie wspieranych przez dostawców LLM.

## Aspekty bezpieczeństwa

Przy implementacji próbkowania w MCP rozważ poniższe najlepsze praktyki bezpieczeństwa:

- **Weryfikuj całą treść wiadomości** przed wysłaniem do klienta
- **Oczyść wrażliwe informacje** z promptów i uzupełnień
- **Wprowadź limity szybkości** aby zapobiec nadużyciom
- **Monitoruj użycie próbkowania** w poszukiwaniu nieprawidłowości
- **Szyfruj dane w tranzycie** używając bezpiecznych protokołów
- **Zarządzaj prywatnością danych użytkowników** zgodnie z odpowiednimi regulacjami
- **Audytuj żądania próbkowania** pod kątem zgodności i bezpieczeństwa
- **Kontroluj narażenie kosztów** ustawiając odpowiednie limity
- **Implementuj limit czasu** dla żądań próbkowania
- **Obsługuj błędy modelu z odpowiednimi zabezpieczeniami**

Parametry próbkowania pozwalają precyzyjnie dostroić zachowanie modeli językowych, by osiągnąć pożądaną równowagę między deterministycznymi a kreatywnymi wynikami.

Spójrzmy, jak konfigurować te parametry w różnych językach programowania.

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

W powyższym kodzie:

- Utworzono klienta MCP z określonym URL serwera.
- Skonfigurowano żądanie z parametrami próbkowania takimi jak `temperature`, `top_p` i `top_k`.
- Wysłano żądanie i wydrukowano wygenerowany tekst.
- Użyto:
    - `allowedTools` do określenia, które narzędzia model może używać podczas generowania. W tym przypadku zezwoliliśmy narzędziom `ideaGenerator` i `marketAnalyzer` na pomoc przy generowaniu kreatywnych pomysłów na aplikacje.
    - `frequencyPenalty` i `presencePenalty` do kontrolowania powtórzeń i różnorodności w wyjściu.
    - `temperature` do kontroli losowości wyjścia, gdzie wyższe wartości prowadzą do bardziej kreatywnych odpowiedzi.
    - `top_p` do ograniczenia wyboru tokenów do tych, które wnoszą największy wkład w top skumulowanej masy prawdopodobieństwa, poprawiając jakość generowanego tekstu.
    - `top_k` do ograniczenia modelu do top K najbardziej prawdopodobnych tokenów, co może pomóc w generowaniu bardziej spójnych odpowiedzi.
    - `frequencyPenalty` i `presencePenalty` do redukcji powtórzeń i zachęcenia do różnorodności w generowanym tekście.

# [JavaScript](#tab/javascript)

```javascript
// Przykład JavaScript: Konfiguracja temperatury i próbkowania Top-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Inicjalizuj klienta MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Skonfiguruj zapytanie z różnymi parametrami próbkowania
  const creativeSampling = {
    temperature: 0.9,    // Wyższa temperatura = większa losowość/kreatywność
    topP: 0.92,          // Uwzględnij tokeny o łącznym prawdopodobieństwie 92%
    frequencyPenalty: 0.6, // Zmniejsz powtarzalność sekwencji tokenów
    presencePenalty: 0.4   // Nakładaj karę na tokeny występujące wcześniej w tekście
  };
  
  const factualSampling = {
    temperature: 0.2,    // Niższa temperatura = bardziej deterministyczne/faktualne
    topP: 0.85,          // Nieco bardziej ukierunkowany wybór tokenów
    frequencyPenalty: 0.2, // Minimalna kara za powtarzalność
    presencePenalty: 0.1   // Minimalna kara za obecność
  };
  
  try {
    // Wyślij dwa zapytania z różnymi konfiguracjami próbkowania
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

W powyższym kodzie:

- Zainicjalizowano klienta MCP z URL serwera i kluczem API.
- Skonfigurowano dwa zestawy parametrów próbkowania: jeden dla zadań kreatywnych, a drugi dla faktograficznych.
- Wysłano żądania z tymi konfiguracjami, pozwalając modelowi używać określonych narzędzi dla każdego zadania.
- Wydrukowano wygenerowane odpowiedzi, aby zilustrować efekty różnych parametrów próbkowania.
- Użyto `allowedTools` aby określić, które narzędzia model może używać podczas generowania. W tym przypadku pozwoliliśmy na użycie `ideaGenerator` i `environmentalImpactTool` dla zadań kreatywnych oraz `factChecker` i `dataAnalysisTool` dla zadań faktograficznych.
- Użyto `temperature` do kontroli losowości wyjścia, gdzie wyższe wartości prowadzą do bardziej kreatywnych odpowiedzi.
- Użyto `top_p` do ograniczenia wyboru tokenów do tych, które wnoszą największy wkład w top skumulowanej masy prawdopodobieństwa, co poprawia jakość generowanego tekstu.
- Użyto `frequencyPenalty` i `presencePenalty` do redukcji powtórzeń i zachęcania do różnorodności w wyjściu.
- Użyto `top_k` by ograniczyć model do top K najbardziej prawdopodobnych tokenów, co może pomóc w generowaniu bardziej spójnych odpowiedzi.

---

## Deterministyczne próbkowanie

Dla zastosowań wymagających spójnych wyników, deterministyczne próbkowanie zapewnia powtarzalne rezultaty. Dzieje się tak przez użycie stałego losowego seeda i ustawienie temperatury na zero.

Poniżej znajduje się przykładowa implementacja demonstrująca deterministyczne próbkowanie w różnych językach programowania.

# [Java](#tab/java)

```java
// Przykład w Javie: deterministyczne odpowiedzi z ustalonym ziarnem
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Używanie ustalonego ziarna dla deterministycznych wyników
        
        // Pierwsze żądanie z ustalonym ziarnem
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Zerowa temperatura dla maksymalnej deterministyczności
            .build();
            
        // Drugie żądanie z tym samym ziarnem
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Wykonaj oba żądania
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Odpowiedzi powinny być identyczne ze względu na to samo ziarno i temperaturę=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

W powyższym kodzie:

- Utworzono klienta MCP z określonym URL serwera.
- Skonfigurowano dwa żądania z tym samym promptem, stałym seedem i zerową temperaturą.
- Wysłano oba żądania i wydrukowano wygenerowany tekst.
- Wykazano, że odpowiedzi są identyczne z powodu deterministycznego charakteru konfiguracji próbkowania (ten sam seed i temperatura).
- Użyto `setSeed` do określenia stałego losowego seeda, zapewniając, że model generuje ten sam wynik dla tego samego wejścia za każdym razem.
- Ustawiono `temperature` na zero, aby zapewnić maksymalną deterministyczność, co oznacza, że model zawsze wybierze najbardziej prawdopodobny kolejny token bez losowości.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Przykład w JavaScript: Deterministyczne odpowiedzi z kontrolą ziarna
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Pierwsze zapytanie z ustalonym ziarnem
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Temperatura zero dla maksymalnego determinismu
    });
    
    // Drugie zapytanie z tym samym ziarnem i temperaturą
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Trzecie zapytanie z różnym ziarnem, ale tą samą temperaturą
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

W powyższym kodzie:

- Zainicjalizowano klienta MCP z URL serwera.
- Skonfigurowano dwa żądania z tym samym promptem, stałym seedem i zerową temperaturą.
- Wysłano oba żądania i wydrukowano wygenerowany tekst.
- Wykazano, że odpowiedzi są identyczne z powodu deterministycznego charakteru konfiguracji próbkowania (ten sam seed i temperatura).
- Użyto `seed` aby określić stały losowy seed, zapewniając, że model generuje ten sam wynik dla tego samego wejścia każdorazowo.
- Ustawiono `temperature` na zero, aby zapewnić maksymalną deterministyczność, co oznacza, że model zawsze wybierze najbardziej prawdopodobny kolejny token bez losowości.
- Użyto innego seeda dla trzeciego żądania, aby pokazać, że zmiana seeda powoduje różne wyniki, nawet przy tym samym prompt i temperaturze.

---

## Dynamiczna konfiguracja próbkowania

Inteligentne próbkowanie dostosowuje parametry w oparciu o kontekst i wymagania każdego żądania. Oznacza to dynamiczne dopasowywanie parametrów takich jak temperatura, top_p i kary bazując na typie zadania, preferencjach użytkownika lub historii wydajności.

Spójrzmy, jak zaimplementować dynamiczne próbkowanie w różnych językach programowania.

# [Python](#tab/python)

```python
# Przykład w Pythonie: Dynamiczne próbkowanie oparte na kontekście żądania
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Zdefiniuj ustawienia próbkowania dla różnych typów zadań
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Wybierz podstawowe ustawienie
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Dostosuj na podstawie preferencji użytkownika, jeśli zostały podane
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Skaluj temperaturę na podstawie preferencji kreatywności (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Dostosuj top_p na podstawie pożądanej różnorodności odpowiedzi
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Utwórz i wyślij żądanie z niestandardowymi parametrami próbkowania
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Zwróć odpowiedź z metadanymi próbkowania dla przejrzystości
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

W powyższym kodzie:

- Utworzono klasę `DynamicSamplingService`, która zarządza adaptacyjnym próbkowaniem.
- Zdefiniowano presety próbkowania dla różnych typów zadań (kreatywne, faktograficzne, kod, analityczne).
- Wybrano bazowy preset próbkowania w zależności od typu zadania.
- Dostosowano parametry próbkowania na podstawie preferencji użytkownika, takich jak poziom kreatywności i różnorodności.
- Wysłano żądanie z dynamicznie skonfigurowanymi parametrami próbkowania.
- Zwrócono wygenerowany tekst wraz z zastosowanymi parametrami próbkowania i typem zadania dla przejrzystości.
- Użyto `temperature`, aby kontrolować losowość wyjścia, gdzie wyższe wartości prowadzą do bardziej kreatywnych odpowiedzi.
- Użyto `top_p` do ograniczenia wyboru tokenów do tych, które wnoszą wkład w top skumulowaną masę prawdopodobieństwa, co poprawia jakość generowanego tekstu.
- Użyto `frequency_penalty` do redukcji powtórzeń i zachęcenia do różnorodności w wyjściu.
- Użyto `user_preferences`, aby umożliwić dostosowanie parametrów próbkowania w oparciu o zdefiniowane przez użytkownika poziomy kreatywności i różnorodności.
- Użyto `task_type`, aby określić odpowiednią strategię próbkowania dla żądania, umożliwiając bardziej dopasowane odpowiedzi w zależności od charakteru zadania.
- Użyto metody `send_request`, aby wysłać prompt z skonfigurowanymi parametrami próbkowania, zapewniając że model generuje tekst zgodnie z określonymi wymaganiami.
- Użyto `generated_text`, aby odebrać odpowiedź modelu, która jest następnie zwracana wraz z parametrami próbkowania i typem zadania do dalszej analizy lub przedstawienia.
- Użyto funkcji `min` i `max`, aby upewnić się, że preferencje użytkownika mieszczą się w poprawnych zakresach, zapobiegając błędnym konfiguracjom próbkowania.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// Przykład JavaScript: Dynamiczna konfiguracja próbkowania oparta na kontekście użytkownika
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Definiuj podstawowe profile próbkowania
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Śledź historyczną wydajność
    this.performanceHistory = [];
  }
  
  // Wykrywaj typ zadania na podstawie promptu
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Proste wykrywanie heurystyczne — można ulepszyć za pomocą klasyfikacji ML
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
    
    // Domyślnie ustaw na konwersacyjny, jeśli nie wykryto wyraźnego typu
    return 'conversational';
  }
  
  // Oblicz parametry próbkowania na podstawie kontekstu i preferencji użytkownika
  getSamplingParameters(prompt, context = {}) {
    // Wykryj typ zadania
    const taskType = this.detectTaskType(prompt, context);
    
    // Pobierz podstawowy profil
    let params = {...this.samplingProfiles[taskType]};
    
    // Dostosuj na podstawie preferencji użytkownika
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Przeskaluj z zakresu 1-10 do odpowiedniego zakresu temperatury
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Wyższa precyzja oznacza niższe topP (bardziej skoncentrowany wybór)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Wyższa spójność oznacza niższe kary
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Zastosuj wyuczone korekty na podstawie historii wydajności
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Prosta adaptacyjna logika — można ulepszyć bardziej zaawansowanymi algorytmami
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Uwzględniaj tylko ostatnią historię
    
    if (relevantHistory.length > 0) {
      // Oblicz średnie wyniki wydajności
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Jeśli wydajność jest poniżej progu, dostosuj parametry
      if (avgScore < 0.7) {
        // Niewielka korekta w kierunku bezpieczniejszych wartości
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Zapisz wydajność do przyszłych korekt
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Ocena jakości odpowiedzi w zakresie 0-1
    });
    
    // Ogranicz rozmiar historii
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Pobierz zoptymalizowane parametry próbkowania
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Wyślij żądanie z zoptymalizowanymi parametrami
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Jeśli użytkownik udziela opinii, zapisz ją do przyszłej optymalizacji
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

// Przykładowe użycie
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Zadanie kreatywne z niestandardowymi preferencjami użytkownika
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Wysoka kreatywność (1-10)
          consistency: 3  // Niska spójność (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Zadanie generowania kodu
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Niska kreatywność
          precision: 8,   // Wysoka precyzja
          consistency: 9  // Wysoka spójność
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

W powyższym kodzie:

- Utworzono klasę `AdaptiveSamplingManager`, która zarządza dynamicznym próbkowaniem w zależności od typu zadania i preferencji użytkownika.
- Zdefiniowano profile próbkowania dla różnych typów zadań (kreatywne, faktograficzne, kod, konwersacyjne).
- Zaimplementowano metodę wykrywania typu zadania na podstawie promptu, używając prostych heurystyk.
- Obliczono parametry próbkowania bazując na wykrytym typie zadania i preferencjach użytkownika.
- Zastosowano wyuczone korekty na podstawie historycznej wydajności, aby optymalizować parametry próbkowania.
- Zarejestrowano wyniki wydajności dla przyszłych korekt, pozwalając systemowi uczyć się na podstawie wcześniejszych interakcji.
- Wysłano żądania z dynamicznie skonfigurowanymi parametrami próbkowania i zwrócono wygenerowany tekst wraz z zastosowanymi parametrami i wykrytym typem zadania.
- Użyto:
    - `userPreferences`, aby umożliwić dostosowanie parametrów próbkowania na podstawie zdefiniowanych przez użytkownika poziomów kreatywności, precyzji i spójności.
    - `detectTaskType`, aby określić charakter zadania na podstawie promptu, pozwalając na bardziej dopasowane odpowiedzi.
    - `recordPerformance`, aby logować wyniki wygenerowanych odpowiedzi, umożliwiając systemowi adaptację i ulepszanie z czasem.
    - `applyLearnedAdjustments`, aby modyfikować parametry próbkowania bazując na historycznej wydajności, zwiększając zdolność modelu do generowania wysokiej jakości odpowiedzi.
    - `generateResponse`, aby opakować cały proces generacji odpowiedzi z adaptacyjnym próbkowaniem, ułatwiając wywołanie z różnymi promptami i kontekstami.
    - `allowedTools`, aby określić, które narzędzia model może używać podczas generowania, pozwalając na bardziej świadome kontekstowo odpowiedzi.
    - `feedbackScore`, aby umożliwić użytkownikom udzielanie informacji zwrotnej na temat jakości wygenerowanej odpowiedzi, co może być wykorzystywane do dalszego doskonalenia działania modelu.
    - `performanceHistory`, aby utrzymywać rejestr poprzednich interakcji, pozwalając systemowi uczyć się na podstawie wcześniejszych sukcesów i niepowodzeń.
    - `getSamplingParameters`, aby dynamicznie dostosowywać parametry próbkowania w zależności od kontekstu żądania, pozwalając na bardziej elastyczne i responsywne zachowanie modelu.
    - `detectTaskType`, aby klasyfikować zadanie na podstawie promptu, umożliwiając systemowi stosowanie odpowiednich strategii próbkowania dla różnych typów żądań.
    - `samplingProfiles`, aby definiować bazowe konfiguracje próbkowania dla różnych typów zadań, umożliwiając szybkie dopasowanie w zależności od charakteru żądania.

---

## Co dalej

- [5.7 Skalowanie](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->