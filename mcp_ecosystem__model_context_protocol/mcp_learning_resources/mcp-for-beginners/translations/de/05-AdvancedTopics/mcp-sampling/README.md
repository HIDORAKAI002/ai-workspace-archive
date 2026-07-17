> [VERALTET: 2026-07-28 RELEASE CANDIDATE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Sampling im Model Context Protocol

> **Hinweis zur Veraltung:** Der Spezifikations-Release-Kandidat `2026-07-28` des MCP markiert Sampling als veraltet zugunsten einer direkten Integration mit LLM-Anbieter-APIs. Sampling funktioniert weiterhin in `2025-11-25` und mindestens ein Jahr nach jeder formalen Veraltung, sodass alles in dieser Lektion gültig bleibt – aber neue Server-Designs sollten das Ersatzmuster evaluieren. Siehe [Was ändert sich in MCP: Der Release-Kandidat 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Sampling ist eine leistungsstarke MCP-Funktion, mit der Server LLM-Vervollständigungen über den Client anfordern können, um ausgeklügelte agentenbasierte Verhaltensweisen zu ermöglichen und gleichzeitig Sicherheit und Datenschutz zu gewährleisten. Die richtige Sampling-Konfiguration kann die Antwortqualität und Leistung dramatisch verbessern. MCP bietet eine standardisierte Möglichkeit, zu steuern, wie Modelle Text mit bestimmten Parametern generieren, die Zufälligkeit, Kreativität und Kohärenz beeinflussen.

## Einführung

In dieser Lektion werden wir untersuchen, wie Sampling-Parameter in MCP-Anfragen konfiguriert werden und die zugrundeliegenden Protokollmechaniken des Samplings verstehen.

## Lernziele

Am Ende dieser Lektion wirst du in der Lage sein:

- Die wichtigsten Sampling-Parameter im MCP zu verstehen.
- Sampling-Parameter für verschiedene Anwendungsfälle zu konfigurieren.
- Deterministisches Sampling für reproduzierbare Ergebnisse umzusetzen.
- Sampling-Parameter dynamisch basierend auf Kontext und Benutzerpräferenzen anzupassen.
- Sampling-Strategien anzuwenden, um die Modellleistung in verschiedenen Szenarien zu verbessern.
- Zu verstehen, wie Sampling im Client-Server-Fluss des MCP funktioniert.

## Wie Sampling im MCP funktioniert

Der Sampling-Ablauf im MCP folgt diesen Schritten:

1. Der Server sendet eine `sampling/createMessage`-Anfrage an den Client
2. Der Client überprüft die Anfrage und kann sie modifizieren
3. Der Client führt Sampling an einem LLM durch
4. Der Client überprüft die Vervollständigung
5. Der Client gibt das Ergebnis an den Server zurück

Dieses Human-in-the-Loop-Design stellt sicher, dass Benutzer die Kontrolle darüber behalten, was das LLM sieht und generiert.

## Übersicht der Sampling-Parameter

MCP definiert folgende Sampling-Parameter, die in Client-Anfragen konfiguriert werden können:

| Parameter | Beschreibung | Typischer Bereich |
|-----------|-------------|---------------|
| `temperature` | Steuert die Zufälligkeit bei der Token-Auswahl | 0,0 - 1,0 |
| `maxTokens` | Maximale Anzahl zu generierender Tokens | Ganzzahliger Wert |
| `stopSequences` | Benutzerdefinierte Sequenzen, die die Generierung stoppen | Array von Strings |
| `metadata` | Zusätzliche anbieter-spezifische Parameter | JSON-Objekt |

Viele LLM-Anbieter unterstützen zusätzliche Parameter über das Feld `metadata`, das Folgendes enthalten kann:

| Häufiger Erweiterungsparameter | Beschreibung | Typischer Bereich |
|-----------|-------------|---------------|
| `top_p` | Nucleus Sampling – begrenzt Tokens auf die oberste kumulative Wahrscheinlichkeit | 0,0 - 1,0 |
| `top_k` | Begrenzung der Token-Auswahl auf die Top-K-Optionen | 1 - 100 |
| `presence_penalty` | Bestraft Tokens basierend auf deren bisheriger Präsenz im Text | -2,0 - 2,0 |
| `frequency_penalty` | Bestraft Tokens basierend auf ihrer bisherigen Häufigkeit im Text | -2,0 - 2,0 |
| `seed` | Spezifischer Zufallssamen für reproduzierbare Ergebnisse | Ganzzahliger Wert |

## Beispiel für Anfragformat

Hier ein Beispiel, wie Sampling von einem Client im MCP angefordert wird:

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

## Antwortformat

Der Client gibt ein Vervollständigungsergebnis zurück:

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

## Human-in-the-Loop-Steuerung

Sampling im MCP ist mit Blick auf menschliche Aufsicht gestaltet:

- **Für Prompts**:
  - Clients sollten Benutzern den vorgeschlagenen Prompt anzeigen
  - Benutzer sollten Prompts ändern oder ablehnen können
  - System-Prompts können gefiltert oder modifiziert werden
  - Die Einbeziehung von Kontext wird vom Client gesteuert

- **Für Vervollständigungen**:
  - Clients sollten Benutzern die Vervollständigung anzeigen
  - Benutzer sollten Vervollständigungen ändern oder ablehnen können
  - Clients können Vervollständigungen filtern oder modifizieren
  - Benutzer kontrollieren, welches Modell verwendet wird

Mit diesen Prinzipien betrachten wir, wie Sampling in verschiedenen Programmiersprachen implementiert wird und konzentrieren uns dabei auf die Parameter, die von LLM-Anbietern häufig unterstützt werden.

## Sicherheitsüberlegungen

Bei der Implementierung von Sampling im MCP sollten diese bewährten Sicherheitspraktiken beachtet werden:

- **Validiere alle Nachrichteninhalte**, bevor sie an den Client gesendet werden
- **Bereinige sensible Informationen** aus Prompts und Vervollständigungen
- **Implementiere Ratenbegrenzungen**, um Missbrauch zu verhindern
- **Überwache Sampling-Nutzung** auf ungewöhnliche Muster
- **Verschlüssele Daten bei der Übertragung** mittels sicherer Protokolle
- **Behandle Datenschutz der Nutzerdaten** gemäß relevanter Vorschriften
- **Prüfe Sampling-Anfragen** auf Einhaltung und Sicherheit
- **Kontrolliere Kostenauswirkungen** mit angemessenen Limits
- **Setze Timeouts** für Sampling-Anfragen ein
- **Behandle Modellfehler angemessen** mit passenden Fallbacks

Sampling-Parameter ermöglichen es, das Verhalten von Sprachmodellen fein zu justieren, um die gewünschte Balance zwischen deterministischen und kreativen Ausgaben zu erreichen.

Schauen wir uns an, wie diese Parameter in verschiedenen Programmiersprachen konfiguriert werden.

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

Im vorherigen Code haben wir:

- Einen MCP-Client mit einer spezifischen Server-URL erstellt.
- Eine Anfrage mit Sampling-Parametern wie `temperature`, `top_p` und `top_k` konfiguriert.
- Die Anfrage gesendet und den generierten Text ausgegeben.
- Folgendes verwendet:
    - `allowedTools`, um anzugeben, welche Tools das Modell während der Generierung verwenden darf. In diesem Fall erlaubten wir die Tools `ideaGenerator` und `marketAnalyzer`, um kreative App-Ideen zu unterstützen.
    - `frequencyPenalty` und `presencePenalty`, um Wiederholungen und Vielfalt in der Ausgabe zu kontrollieren.
    - `temperature`, um die Zufälligkeit der Ausgabe zu steuern, wobei höhere Werte zu kreativeren Antworten führen.
    - `top_p`, um die Auswahl der Tokens auf diejenigen zu beschränken, die zur obersten kumulativen Wahrscheinlichkeitsmasse beitragen, was die Qualität des generierten Textes verbessert.
    - `top_k`, um das Modell auf die K wahrscheinlichsten Tokens zu begrenzen, was zu kohärenteren Antworten beitragen kann.
    - `frequencyPenalty` und `presencePenalty`, um Wiederholungen zu reduzieren und Vielfalt in der Ausgabe zu fördern.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript-Beispiel: Temperatur- und Top-P-Sampling-Konfiguration
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Initialisiere den MCP-Client
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfiguriere Anfrage mit verschiedenen Sampling-Parametern
  const creativeSampling = {
    temperature: 0.9,    // Höhere Temperatur = mehr Zufälligkeit/Kreativität
    topP: 0.92,          // Berücksichtige Tokens mit einer Top-92%-Wahrscheinlichkeitsmasse
    frequencyPenalty: 0.6, // Wiederholung von Token-Sequenzen reduzieren
    presencePenalty: 0.4   // Bestrafe Tokens, die bisher im Text aufgetaucht sind
  };
  
  const factualSampling = {
    temperature: 0.2,    // Niedrigere Temperatur = mehr Determinismus/Fakten
    topP: 0.85,          // Etwas fokussiertere Token-Auswahl
    frequencyPenalty: 0.2, // Minimale Wiederholungsstrafe
    presencePenalty: 0.1   // Minimale Präsenzstrafe
  };
  
  try {
    // Sende zwei Anfragen mit unterschiedlichen Sampling-Konfigurationen
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

Im vorherigen Code haben wir:

- Einen MCP-Client mit Server-URL und API-Schlüssel initialisiert.
- Zwei Sets von Sampling-Parametern konfiguriert: eines für kreative Aufgaben und eines für faktische Aufgaben.
- Anfragen mit diesen Konfigurationen gesendet, wobei das Modell für jede Aufgabe bestimmte Tools nutzen durfte.
- Die generierten Antworten ausgegeben, um die Auswirkungen der unterschiedlichen Sampling-Parameter zu demonstrieren.
- `allowedTools` verwendet, um anzugeben, welche Tools das Modell während der Generierung nutzen darf. Für kreative Aufgaben erlaubten wir `ideaGenerator` und `environmentalImpactTool`, für faktische Aufgaben `factChecker` und `dataAnalysisTool`.
- `temperature` verwendet, um die Zufälligkeit der Ausgabe zu steuern, wobei höhere Werte zu kreativeren Antworten führen.
- `top_p` genutzt, um die Auswahl der Tokens auf die oberste kumulative Wahrscheinlichkeitsmasse zu beschränken und so die Qualität des generierten Textes zu verbessern.
- `frequencyPenalty` und `presencePenalty` verwendet, um Wiederholungen zu reduzieren und Vielfalt in der Ausgabe zu fördern.
- `top_k` verwendet, um das Modell auf die K wahrscheinlichsten Tokens zu begrenzen und kohärentere Antworten zu erzeugen.

---

## Deterministisches Sampling

Für Anwendungen, die konsistente Ausgaben benötigen, sorgt deterministisches Sampling für reproduzierbare Ergebnisse. Das geschieht durch die Verwendung eines festen Zufallssamens und das Setzen der Temperatur auf null.

Werfen wir einen Blick auf eine Beispielimplementierung, die deterministisches Sampling in verschiedenen Programmiersprachen demonstriert.

# [Java](#tab/java)

```java
// Java Beispiel: Deterministische Antworten mit festem Seed
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Verwendung eines festen Seeds für deterministische Ergebnisse
        
        // Erste Anfrage mit festem Seed
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Temperatur Null für maximale Determinismus
            .build();
            
        // Zweite Anfrage mit demselben Seed
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Beide Anfragen ausführen
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Antworten sollten aufgrund gleichen Seeds und Temperatur=0 identisch sein
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Im vorherigen Code haben wir:

- Einen MCP-Client mit einer spezifizierten Server-URL erstellt.
- Zwei Anfragen mit demselben Prompt, festem Seed und Temperatur null konfiguriert.
- Beide Anfragen gesendet und den generierten Text ausgegeben.
- Demonstriert, dass die Antworten aufgrund der deterministischen Konfiguration (gleicher Seed und Temperatur) identisch sind.
- `setSeed` verwendet, um einen festen Zufallssamen anzugeben, sodass das Modell für dieselbe Eingabe immer das gleiche Ergebnis generiert.
- `temperature` auf null gesetzt, um maximale Determinismus sicherzustellen, sodass das Modell immer das wahrscheinlichste nächste Token ohne Zufälligkeit auswählt.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript-Beispiel: Deterministische Antworten mit Saatgutsteuerung
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Erste Anfrage mit festem Saatgut
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Null Temperatur für maximale Determinismus
    });
    
    // Zweite Anfrage mit demselben Saatgut und Temperatur
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Dritte Anfrage mit anderem Saatgut aber gleicher Temperatur
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

Im vorherigen Code haben wir:

- Einen MCP-Client mit einer Server-URL initialisiert.
- Zwei Anfragen mit demselben Prompt, festem Seed und Temperatur null konfiguriert.
- Beide Anfragen gesendet und den generierten Text ausgegeben.
- Demonstriert, dass die Antworten aufgrund der deterministischen Konfiguration (gleicher Seed und Temperatur) identisch sind.
- `seed` verwendet, um einen festen Zufallssamen anzugeben, sodass das Modell für dieselbe Eingabe immer das gleiche Ergebnis generiert.
- `temperature` auf null gesetzt, um maximale Determinismus sicherzustellen, sodass das Modell immer das wahrscheinlichste nächste Token ohne Zufälligkeit auswählt.
- Für die dritte Anfrage einen anderen Seed verwendet, um zu zeigen, dass durch Änderung des Seeds unterschiedliche Ausgaben entstehen, selbst bei gleichem Prompt und Temperatur.

---

## Dynamische Sampling-Konfiguration

Intelligentes Sampling passt Parameter basierend auf dem Kontext und den Anforderungen jeder Anfrage an. Das bedeutet, dass Parameter wie Temperatur, top_p und Strafen dynamisch je nach Aufgabentyp, Benutzerpräferenzen oder historischer Leistung angepasst werden.

Schauen wir uns an, wie dynamisches Sampling in verschiedenen Programmiersprachen implementiert wird.

# [Python](#tab/python)

```python
# Python Beispiel: Dynamische Abtastung basierend auf dem Anfragekontext
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Definieren Sie Sampling-Voreinstellungen für verschiedene Aufgabentypen
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Basisvoreinstellung auswählen
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Anpassen basierend auf Benutzerpräferenzen, falls vorhanden
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Temperatur basierend auf Kreativitätspräferenz (1-10) skalieren
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Top_p basierend auf der gewünschten Antwortvielfalt anpassen
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Erstellen und senden Sie eine Anfrage mit benutzerdefinierten Sampling-Parametern
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Antwort mit Sampling-Metadaten für Transparenz zurückgeben
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Im vorherigen Code haben wir:

- Eine `DynamicSamplingService`-Klasse erstellt, die adaptives Sampling verwaltet.
- Sampling-Voreinstellungen für verschiedene Aufgabentypen definiert (kreativ, faktisch, Code, analytisch).
- Basierend auf dem Aufgabentyp eine Basis-Sampling-Voreinstellung ausgewählt.
- Sampling-Parameter basierend auf Benutzerpräferenzen wie Kreativitäts- und Vielfalt-Level angepasst.
- Die Anfrage mit dynamisch konfigurierten Sampling-Parametern gesendet.
- Den generierten Text zusammen mit den angewandten Sampling-Parametern und dem Aufgabentyp für Transparenz zurückgegeben.
- `temperature` verwendet, um die Zufälligkeit der Ausgabe zu steuern, wobei höhere Werte zu kreativeren Antworten führen.
- `top_p` verwendet, um die Auswahl der Tokens auf diejenigen zu begrenzen, die zur obersten kumulativen Wahrscheinlichkeitsmasse beitragen und so die Qualität des generierten Textes zu verbessern.
- `frequency_penalty` verwendet, um Wiederholungen zu reduzieren und Vielfalt in der Ausgabe zu fördern.
- `user_preferences` verwendet, um die Sampling-Parameter basierend auf benutzerdefinierten Kreativitäts- und Vielfaltniveaus anzupassen.
- `task_type` verwendet, um die geeignete Sampling-Strategie für die Anfrage zu bestimmen, was maßgeschneiderte Antworten basierend auf der Art der Aufgabe ermöglicht.
- Die Methode `send_request` verwendet, um den Prompt mit den konfigurierten Sampling-Parametern zu senden, damit das Modell Text gemäß den angegebenen Anforderungen generiert.
- `generated_text` verwendet, um die Antwort des Modells abzurufen, die zusammen mit Sampling-Parametern und Aufgabentyp für weitere Analysen oder Anzeige zurückgegeben wird.
- `min` und `max` Funktionen verwendet, um sicherzustellen, dass Benutzerpräferenzen innerhalb gültiger Bereiche liegen und ungültige Sampling-Konfigurationen verhindert werden.

# [JavaScript Dynamisch](#tab/javascript-dynamic)

```javascript
// JavaScript-Beispiel: Dynamische Sampling-Konfiguration basierend auf dem Benutzerkontext
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Basis-Sampling-Profile definieren
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Historische Leistung verfolgen
    this.performanceHistory = [];
  }
  
  // Aufgabentyp aus dem Prompt erkennen
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Einfache heuristische Erkennung - könnte mit ML-Klassifikation verbessert werden
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
    
    // Standardmäßig auf Konversation einstellen, wenn kein klarer Typ erkannt wird
    return 'conversational';
  }
  
  // Sampling-Parameter basierend auf Kontext und Benutzerpräferenzen berechnen
  getSamplingParameters(prompt, context = {}) {
    // Erkenne den Aufgabentyp
    const taskType = this.detectTaskType(prompt, context);
    
    // Basisprofil abrufen
    let params = {...this.samplingProfiles[taskType]};
    
    // An Benutzerpräferenzen anpassen
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Von 1-10 auf den entsprechenden Temperaturbereich skalieren
        params.temperature = 0.1 + (creativity * 0.09); // 0,1-1,0
      }
      
      if (precision !== undefined) {
        // Höhere Präzision bedeutet niedrigeren topP (konzentriertere Auswahl)
        params.topP = 1.0 - (precision * 0.05); // 0,5-1,0
      }
      
      if (consistency !== undefined) {
        // Höhere Konsistenz bedeutet geringere Strafen
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0,1-0,9
      }
    }
    
    // Gelernte Anpassungen aus der Leistungshistorie anwenden
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Einfache adaptive Logik - könnte mit komplexeren Algorithmen verbessert werden
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Nur die jüngste Historie berücksichtigen
    
    if (relevantHistory.length > 0) {
      // Durchschnittliche Leistungspunkte berechnen
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Wenn Leistung unter dem Schwellenwert liegt, Parameter anpassen
      if (avgScore < 0.7) {
        // Leichte Anpassung in Richtung sicherer Werte
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Leistung für zukünftige Anpassungen aufzeichnen
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 Bewertung der Antwortqualität
    });
    
    // Historiengröße begrenzen
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Optimierte Sampling-Parameter erhalten
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Anfrage mit optimierten Parametern senden
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Wenn der Benutzer Feedback gibt, dieses für zukünftige Optimierungen aufzeichnen
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

// Beispielanwendung
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Kreative Aufgabe mit benutzerdefinierten Präferenzen
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Hohe Kreativität (1-10)
          consistency: 3  // Geringe Konsistenz (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Aufgaben zur Codegenerierung
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Geringe Kreativität
          precision: 8,   // Hohe Präzision
          consistency: 9  // Hohe Konsistenz
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

Im vorherigen Code haben wir:

- Eine `AdaptiveSamplingManager`-Klasse erstellt, die dynamisches Sampling basierend auf Aufgabentyp und Benutzerpräferenzen verwaltet.
- Sampling-Profile für verschiedene Aufgabentypen definiert (kreativ, faktisch, Code, konversationell).
- Eine Methode implementiert, die den Aufgabentyp anhand des Prompts mit einfachen Heuristiken erkennt.
- Sampling-Parameter basierend auf dem erkannten Aufgabentyp und Benutzerpräferenzen berechnet.
- Gelernte Anpassungen basierend auf historischer Leistung angewandt, um Sampling-Parameter zu optimieren.
- Leistung für zukünftige Anpassungen protokolliert, sodass das System aus vergangenen Interaktionen lernt.
- Anfragen mit dynamisch konfigurierten Sampling-Parametern gesendet und den generierten Text zusammen mit den angewandten Parametern und dem erkannten Aufgabentyp zurückgegeben.
- Folgendes verwendet:
    - `userPreferences`, um die Sampling-Parameter basierend auf benutzerdefinierten Kreativitäts-, Präzisions- und Konsistenzniveaus anzupassen.
    - `detectTaskType`, um die Art der Aufgabe anhand des Prompts zu bestimmen und so maßgeschneiderte Antworten zu ermöglichen.
    - `recordPerformance`, um die Leistung generierter Antworten zu protokollieren und das System mit der Zeit anpassen und verbessern zu können.
    - `applyLearnedAdjustments`, um Sampling-Parameter basierend auf historischer Leistung zu modifizieren und so die Fähigkeit des Modells zur Generierung hochwertiger Antworten zu verbessern.
    - `generateResponse`, um den gesamten Prozess der Antwortgenerierung mit adaptivem Sampling zu kapseln und einfach mit verschiedenen Prompts und Kontexten aufrufbar zu machen.
    - `allowedTools`, um anzugeben, welche Tools das Modell während der Generierung verwenden darf, was kontextbewusstere Antworten ermöglicht.
    - `feedbackScore`, um Benutzern die Möglichkeit zu geben, Feedback zur Qualität der generierten Antwort zu geben, welches zur weiteren Verfeinerung der Modellleistung verwendet werden kann.
    - `performanceHistory`, um eine Historie vergangener Interaktionen zu führen, damit das System aus Erfolgen und Misserfolgen lernen kann.
    - `getSamplingParameters`, um Sampling-Parameter dynamisch basierend auf dem Kontext der Anfrage anzupassen und so flexibleres und reaktiveres Modellverhalten zu ermöglichen.
    - `detectTaskType`, um die Aufgabe anhand des Prompts zu klassifizieren und passende Sampling-Strategien für verschiedene Anfragetypen anzuwenden.
    - `samplingProfiles`, um Basis-Sampling-Konfigurationen für verschiedene Aufgabentypen zu definieren und so schnelle Anpassungen basierend auf der Art der Anfrage zu ermöglichen.

---

## Was kommt als nächstes

- [5.7 Skalierung](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->