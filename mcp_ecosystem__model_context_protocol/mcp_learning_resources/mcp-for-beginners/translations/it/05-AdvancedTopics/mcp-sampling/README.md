> [DEPRECATO: VERSIONE CANDIDATA 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Campionamento in Model Context Protocol

> **Avviso di deprecazione:** la release candidate della specifica MCP `2026-07-28` segna il campionamento come deprecato a favore dell'integrazione diretta con le API del provider LLM. Il campionamento continua a funzionare in `2025-11-25` e per almeno un anno dopo qualsiasi deprecazione formale, quindi tutto in questa lezione rimane valido - ma i nuovi design di server dovrebbero valutare il modello di sostituzione. Vedi [Cosa cambia in MCP: La release candidate 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Il campionamento è una funzionalità potente di MCP che permette ai server di richiedere completamenti LLM tramite il client, abilitando comportamenti agentici sofisticati mantenendo sicurezza e privacy. La configurazione di campionamento corretta può migliorare drasticamente la qualità e le prestazioni della risposta. MCP fornisce un modo standardizzato per controllare come i modelli generano testo con parametri specifici che influenzano casualità, creatività e coerenza.

## Introduzione

In questa lezione esploreremo come configurare i parametri di campionamento nelle richieste MCP e capire i meccanismi di protocollo sottostanti del campionamento.

## Obiettivi di Apprendimento

Alla fine di questa lezione sarai in grado di:

- Comprendere i parametri chiave di campionamento disponibili in MCP.
- Configurare i parametri di campionamento per diversi casi d'uso.
- Implementare campionamento deterministico per risultati riproducibili.
- Regolare dinamicamente i parametri di campionamento in base al contesto e alle preferenze dell'utente.
- Applicare strategie di campionamento per migliorare le prestazioni del modello in vari scenari.
- Comprendere come funziona il campionamento nel flusso client-server di MCP.

## Come funziona il campionamento in MCP

Il flusso di campionamento in MCP segue questi passaggi:

1. Il server invia una richiesta `sampling/createMessage` al client
2. Il client esamina la richiesta e può modificarla
3. Il client campiona da un LLM
4. Il client esamina il completamento
5. Il client restituisce il risultato al server

Questo design con intervento umano garantisce che gli utenti mantengano il controllo su cosa l'LLM vede e genera.

## Panoramica dei parametri di campionamento

MCP definisce i seguenti parametri di campionamento che possono essere configurati nelle richieste client:

| Parametro | Descrizione | Intervallo Tipico |
|-----------|-------------|---------------|
| `temperature` | Controlla la casualità nella selezione dei token | 0.0 - 1.0 |
| `maxTokens` | Numero massimo di token da generare | Valore intero |
| `stopSequences` | Sequenze personalizzate che fermano la generazione quando incontrate | Array di stringhe |
| `metadata` | Ulteriori parametri specifici del provider | Oggetto JSON |

Molti provider LLM supportano parametri aggiuntivi attraverso il campo `metadata`, che possono includere:

| Parametro Estensione Comune | Descrizione | Intervallo Tipico |
|-----------|-------------|---------------|
| `top_p` | Campionamento nucleare - limita i token alla somma cumulativa di probabilità più alta | 0.0 - 1.0 |
| `top_k` | Limita la selezione dei token alle prime K opzioni | 1 - 100 |
| `presence_penalty` | Penalizza i token in base alla loro presenza nel testo finora | -2.0 - 2.0 |
| `frequency_penalty` | Penalizza i token in base alla loro frequenza nel testo finora | -2.0 - 2.0 |
| `seed` | Specifica un seme casuale per risultati riproducibili | Valore intero |

## Esempio di formato richiesta

Ecco un esempio di richiesta di campionamento da un client in MCP:

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

## Formato della risposta

Il client restituisce un risultato di completamento:

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

## Controlli con intervento umano

Il campionamento MCP è progettato con supervisione umana in mente:

- **Per i prompt**:
  - I client dovrebbero mostrare agli utenti il prompt proposto
  - Gli utenti dovrebbero poter modificare o rifiutare i prompt
  - I prompt di sistema possono essere filtrati o modificati
  - L'inclusione del contesto è controllata dal client

- **Per i completamenti**:
  - I client dovrebbero mostrare agli utenti il completamento
  - Gli utenti dovrebbero poter modificare o rifiutare i completamenti
  - I client possono filtrare o modificare i completamenti
  - Gli utenti controllano quale modello è usato

Tenendo presenti questi principi, vediamo come implementare il campionamento in diversi linguaggi di programmazione, concentrandoci sui parametri comunemente supportati tra i provider LLM.

## Considerazioni sulla sicurezza

Quando si implementa il campionamento in MCP, considera queste migliori pratiche di sicurezza:

- **Valida tutto il contenuto del messaggio** prima di inviarlo al client
- **Sanifica informazioni sensibili** da prompt e completamenti
- **Implementa limiti di velocità** per prevenire abusi
- **Monitora l'uso del campionamento** per schemi insoliti
- **Cripta i dati in transito** usando protocolli sicuri
- **Gestisci la privacy dei dati utente** secondo le normative rilevanti
- **Audita le richieste di campionamento** per conformità e sicurezza
- **Controlla l'esposizione ai costi** con limiti adeguati
- **Implementa timeout** per le richieste di campionamento
- **Gestisci errori del modello con grazia** usando fallback appropriati

I parametri di campionamento permettono di affinare il comportamento dei modelli linguistici per raggiungere l'equilibrio desiderato tra output deterministici e creativi.

Vediamo come configurare questi parametri in diversi linguaggi di programmazione.

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

Nel codice precedente abbiamo:

- Creato un client MCP con un URL specifico del server.
- Configurato una richiesta con parametri di campionamento come `temperature`, `top_p` e `top_k`.
- Inviato la richiesta e stampato il testo generato.
- Usato:
    - `allowedTools` per specificare quali strumenti il modello può usare durante la generazione. In questo caso, abbiamo permesso agli strumenti `ideaGenerator` e `marketAnalyzer` di assistere nella generazione di idee creative per app.
    - `frequencyPenalty` e `presencePenalty` per controllare ripetizione e diversità nell'output.
    - `temperature` per controllare la casualità dell'output, dove valori più alti portano a risposte più creative.
    - `top_p` per limitare la selezione dei token a quelli che contribuiscono alla massa cumulativa di probabilità più alta, migliorando la qualità del testo generato.
    - `top_k` per restringere il modello ai primi K token più probabili, che può aiutare a generare risposte più coerenti.
    - `frequencyPenalty` e `presencePenalty` per ridurre la ripetizione e incoraggiare la diversità nel testo generato.

# [JavaScript](#tab/javascript)

```javascript
// Esempio JavaScript: Configurazione della temperatura e del campionamento Top-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Inizializza il client MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Configura la richiesta con parametri di campionamento diversi
  const creativeSampling = {
    temperature: 0.9,    // Temperatura più alta = maggiore casualità/creatività
    topP: 0.92,          // Considera token con massa di probabilità top al 92%
    frequencyPenalty: 0.6, // Riduci la ripetizione delle sequenze di token
    presencePenalty: 0.4   // Penalizza i token che sono già apparsi nel testo finora
  };
  
  const factualSampling = {
    temperature: 0.2,    // Temperatura più bassa = più deterministico/fattuale
    topP: 0.85,          // Selezione di token leggermente più focalizzata
    frequencyPenalty: 0.2, // Penalità di ripetizione minima
    presencePenalty: 0.1   // Penalità di presenza minima
  };
  
  try {
    // Invia due richieste con configurazioni di campionamento diverse
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

Nel codice precedente abbiamo:

- Inizializzato un client MCP con un URL server e una chiave API.
- Configurato due set di parametri di campionamento: uno per compiti creativi e un altro per compiti fattuali.
- Inviato richieste con queste configurazioni, consentendo al modello di usare strumenti specifici per ogni compito.
- Stampato le risposte generate per mostrare gli effetti dei diversi parametri di campionamento.
- Usato `allowedTools` per specificare quali strumenti il modello può usare durante la generazione. In questo caso, abbiamo permesso `ideaGenerator` e `environmentalImpactTool` per compiti creativi, e `factChecker` e `dataAnalysisTool` per compiti fattuali.
- Usato `temperature` per controllare la casualità dell'output, dove valori più alti portano a risposte più creative.
- Usato `top_p` per limitare la selezione dei token a quelli che contribuiscono alla massa cumulativa di probabilità più alta, migliorando la qualità del testo generato.
- Usato `frequencyPenalty` e `presencePenalty` per ridurre la ripetizione e incoraggiare la diversità nell'output.
- Usato `top_k` per limitare il modello ai primi K token più probabili, che può aiutare a generare risposte più coerenti.

---

## Campionamento Deterministico

Per applicazioni che richiedono output consistenti, il campionamento deterministico assicura risultati riproducibili. Ciò si ottiene usando un seme casuale fisso e impostando la temperatura a zero.

Vediamo la seguente implementazione di esempio per dimostrare il campionamento deterministico in diversi linguaggi di programmazione.

# [Java](#tab/java)

```java
// Esempio Java: Risposte deterministiche con seed fisso
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Utilizzo di un seed fisso per risultati deterministici
        
        // Prima richiesta con seed fisso
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Temperatura zero per massima determinismo
            .build();
            
        // Seconda richiesta con lo stesso seed
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Esegui entrambe le richieste
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Le risposte dovrebbero essere identiche grazie allo stesso seed e temperatura=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Nel codice precedente abbiamo:

- Creato un client MCP con un URL server specificato.
- Configurato due richieste con lo stesso prompt, seme fisso e temperatura zero.
- Inviato entrambe le richieste e stampato il testo generato.
- Dimostrato che le risposte sono identiche grazie alla natura deterministica della configurazione di campionamento (stesso seme e temperatura).
- Usato `setSeed` per specificare un seme casuale fisso, assicurando che il modello generi la stessa uscita per lo stesso input ogni volta.
- Impostato `temperature` a zero per garantire il massimo determinismo, significando che il modello selezionerà sempre il token successivo più probabile senza casualità.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Esempio di JavaScript: Risposte deterministiche con controllo del seme
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Prima richiesta con seme fisso
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Temperatura zero per massimo determinismo
    });
    
    // Seconda richiesta con lo stesso seme e temperatura
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Terza richiesta con seme diverso ma stessa temperatura
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

Nel codice precedente abbiamo:

- Inizializzato un client MCP con un URL server.
- Configurato due richieste con lo stesso prompt, seme fisso e temperatura zero.
- Inviato entrambe le richieste e stampato il testo generato.
- Dimostrato che le risposte sono identiche grazie alla natura deterministica della configurazione di campionamento (stesso seme e temperatura).
- Usato `seed` per specificare un seme casuale fisso, assicurando che il modello generi la stessa uscita per lo stesso input ogni volta.
- Impostato `temperature` a zero per garantire il massimo determinismo, significando che il modello selezionerà sempre il token successivo più probabile senza casualità.
- Usato un seme diverso per la terza richiesta per mostrare che cambiare il seme produce output differenti, anche con lo stesso prompt e temperatura.

---

## Configurazione Dinamica del Campionamento

Il campionamento intelligente adatta i parametri in base al contesto e ai requisiti di ogni richiesta. Ciò significa regolare dinamicamente parametri come temperature, top_p e penalità basandosi sul tipo di compito, le preferenze dell'utente o la performance storica.

Vediamo come implementare il campionamento dinamico in diversi linguaggi di programmazione.

# [Python](#tab/python)

```python
# Esempio Python: campionamento dinamico basato sul contesto della richiesta
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Definire i preset di campionamento per diversi tipi di attività
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Selezionare il preset base
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Regolare in base alle preferenze dell'utente se fornite
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Scalare la temperatura in base alla preferenza di creatività (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Regolare top_p in base alla diversità della risposta desiderata
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Creare e inviare la richiesta con parametri di campionamento personalizzati
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Restituire la risposta con i metadati di campionamento per trasparenza
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Nel codice precedente abbiamo:

- Creato una classe `DynamicSamplingService` che gestisce il campionamento adattivo.
- Definito preset di campionamento per diversi tipi di compiti (creativo, fattuale, codice, analitico).
- Selezionato un preset base di campionamento in base al tipo di compito.
- Regolato i parametri di campionamento basandosi sulle preferenze dell'utente, come livello di creatività e diversità.
- Inviato la richiesta con parametri di campionamento configurati dinamicamente.
- Restituito il testo generato insieme ai parametri di campionamento applicati e al tipo di compito per trasparenza.
- Usato `temperature` per controllare la casualità dell'output, dove valori più alti portano a risposte più creative.
- Usato `top_p` per limitare la selezione dei token a quelli che contribuiscono alla massa cumulativa di probabilità più alta, migliorando la qualità del testo generato.
- Usato `frequency_penalty` per ridurre la ripetizione e incoraggiare la diversità nell'output.
- Usato `user_preferences` per permettere la personalizzazione dei parametri di campionamento basata sui livelli di creatività e diversità definiti dall'utente.
- Usato `task_type` per determinare la strategia di campionamento appropriata per la richiesta, permettendo risposte più su misura in base alla natura del compito.
- Usato il metodo `send_request` per inviare il prompt con i parametri di campionamento configurati, assicurandosi che il modello generi testo secondo i requisiti specificati.
- Usato `generated_text` per recuperare la risposta del modello, poi restituita insieme ai parametri di campionamento e al tipo di compito per ulteriori analisi o visualizzazione.
- Usato le funzioni `min` e `max` per garantire che le preferenze dell'utente siano limitate entro intervalli validi, prevenendo configurazioni di campionamento non valide.

# [JavaScript Dinamico](#tab/javascript-dynamic)

```javascript
// Esempio JavaScript: Configurazione dinamica del campionamento basata sul contesto utente
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Definire profili di campionamento base
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Tracciare le prestazioni storiche
    this.performanceHistory = [];
  }
  
  // Rilevare il tipo di attività dal prompt
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Rilevamento euristico semplice - potrebbe essere migliorato con classificazione ML
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
    
    // Impostare di default su conversazionale se non viene rilevato un tipo chiaro
    return 'conversational';
  }
  
  // Calcolare i parametri di campionamento basati sul contesto e le preferenze utente
  getSamplingParameters(prompt, context = {}) {
    // Rilevare il tipo di attività
    const taskType = this.detectTaskType(prompt, context);
    
    // Ottenere il profilo base
    let params = {...this.samplingProfiles[taskType]};
    
    // Regolare in base alle preferenze utente
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Ridimensionare da 1-10 alla gamma di temperatura appropriata
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Maggiore precisione significa topP più basso (selezione più focalizzata)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Maggiore coerenza significa penalità più basse
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Applicare aggiustamenti appresi dalla storia delle prestazioni
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Logica adattativa semplice - potrebbe essere migliorata con algoritmi più sofisticati
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Considerare solo la storia recente
    
    if (relevantHistory.length > 0) {
      // Calcolare i punteggi medi delle prestazioni
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Se le prestazioni sono sotto la soglia, regolare i parametri
      if (avgScore < 0.7) {
        // Leggero aggiustamento verso valori più sicuri
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Registrare le prestazioni per aggiustamenti futuri
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Valutazione 0-1 della qualità della risposta
    });
    
    // Limitare la dimensione della storia
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Ottenere i parametri di campionamento ottimizzati
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Inviare richiesta con parametri ottimizzati
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Se l’utente fornisce feedback, registrarlo per l’ottimizzazione futura
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

// Esempio di utilizzo
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Attività creativa con preferenze personalizzate dell’utente
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Alta creatività (1-10)
          consistency: 3  // Bassa coerenza (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Attività di generazione codice
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Bassa creatività
          precision: 8,   // Alta precisione
          consistency: 9  // Alta coerenza
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

Nel codice precedente abbiamo:

- Creato una classe `AdaptiveSamplingManager` che gestisce il campionamento dinamico in base a tipo di compito e preferenze utente.
- Definito profili di campionamento per diversi tipi di compito (creativo, fattuale, codice, conversazionale).
- Implementato un metodo per rilevare il tipo di compito dal prompt usando semplici euristiche.
- Calcolato i parametri di campionamento basandosi sul tipo di compito rilevato e sulle preferenze dell'utente.
- Applicato aggiustamenti appresi basati sulla performance storica per ottimizzare i parametri di campionamento.
- Registrato le performance per futuri aggiustamenti, permettendo al sistema di apprendere dalle interazioni passate.
- Inviato richieste con parametri di campionamento configurati dinamicamente e restituito il testo generato con i parametri applicati e tipo di compito rilevato.
- Usato:
    - `userPreferences` per permettere la personalizzazione dei parametri di campionamento basata su creatività, precisione e livelli di coerenza definiti dall'utente.
    - `detectTaskType` per determinare la natura del compito basato sul prompt, permettendo risposte più su misura.
    - `recordPerformance` per registrare la performance delle risposte generate, consentendo al sistema di adattarsi e migliorare nel tempo.
    - `applyLearnedAdjustments` per modificare i parametri di campionamento basati sulla performance storica, migliorando la capacità del modello di generare risposte di alta qualità.
    - `generateResponse` per incapsulare l'intero processo di generazione di una risposta con campionamento adattivo, facilitando la chiamata con prompt e contesti differenti.
    - `allowedTools` per specificare quali strumenti il modello può usare durante la generazione, permettendo risposte più contestualizzate.
    - `feedbackScore` per permettere agli utenti di fornire feedback sulla qualità della risposta generata, che può essere usato per affinare ulteriormente le prestazioni del modello nel tempo.
    - `performanceHistory` per mantenere un registro delle interazioni passate, consentendo al sistema di apprendere dai successi e fallimenti precedenti.
    - `getSamplingParameters` per regolare dinamicamente i parametri di campionamento basati sul contesto della richiesta, consentendo comportamenti del modello più flessibili e reattivi.
    - `detectTaskType` per classificare il compito in base al prompt, permettendo al sistema di applicare strategie di campionamento appropriate per diversi tipi di richieste.
    - `samplingProfiles` per definire configurazioni base di campionamento per vari tipi di compito, consentendo regolazioni rapide basate sulla natura della richiesta.

---

## Cosa c'è dopo

- [5.7 Scaling](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->