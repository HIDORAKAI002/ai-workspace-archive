> [PRZESTAJE OBOWIĄZYWAĆ: KANDYDAT DO WYDANIA 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Root Contexts MCP

> **Informacja o przestarzałości:** kandydat do specyfikacji MCP `2026-07-28` oznacza Roots jako przestarzałe na rzecz parametrów narzędzi, URI zasobów lub konfiguracji serwera. Roots nadal działają w `2025-11-25` i przez co najmniej rok po formalnym wycofaniu, więc wszystko w tej lekcji pozostaje aktualne - ale nowe projekty serwerów powinny rozważyć wzorzec zastępczy. Zobacz [Co się zmienia w MCP: kandydat do wydania 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Root contexts są podstawową koncepcją w Model Context Protocol, które dostarczają trwałą warstwę do utrzymywania historii konwersacji i współdzielonego stanu w wielu żądaniach i sesjach.

## Wprowadzenie

W tej lekcji poznasz, jak tworzyć, zarządzać i wykorzystywać root contexts w MCP.

## Cele nauki

Na koniec tej lekcji będziesz potrafił:

- Zrozumieć cel i strukturę root contexts
- Tworzyć i zarządzać root contexts za pomocą bibliotek klienckich MCP
- Implementować root contexts w aplikacjach .NET, Java, JavaScript i Python
- Wykorzystywać root contexts do wieloetapowych konwersacji i zarządzania stanem
- Wdrożyć najlepsze praktyki zarządzania root contexts

## Zrozumienie Root Contexts

Root contexts służą jako kontenery przechowujące historię i stan dla serii powiązanych interakcji. Pozwalają na:

- **Utrzymywanie konwersacji**: Zachowanie spójnych wieloetapowych rozmów
- **Zarządzanie pamięcią**: Przechowywanie i odzyskiwanie informacji między interakcjami
- **Zarządzanie stanem**: Śledzenie postępu w złożonych procesach
- **Współdzielenie kontekstu**: Umożliwienie wielu klientom dostępu do tego samego stanu konwersacji

W MCP root contexts mają następujące cechy kluczowe:

- Każdy root context posiada unikalny identyfikator.
- Mogą zawierać historię konwersacji, preferencje użytkownika i inne metadane.
- Mogą być tworzone, dostępne i archiwizowane według potrzeby.
- Wspierają szczegółową kontrolę dostępu i uprawnienia.

## Cykl życia Root Context

```mermaid
flowchart TD
    A[Utwórz kontekst główny] --> B[Zainicjuj z metadanymi]
    B --> C[Wyślij żądania z ID kontekstu]
    C --> D[Zaktualizuj kontekst wynikami]
    D --> C
    D --> E[Zarchiwizuj kontekst po zakończeniu]
```

## Praca z Root Contexts

Oto przykład, jak tworzyć i zarządzać root contexts.

### Implementacja w C#

```csharp
// .NET Example: Root Context Management
using Microsoft.Mcp.Client;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

public class RootContextExample
{
    private readonly IMcpClient _client;
    private readonly IRootContextManager _contextManager;
    
    public RootContextExample(IMcpClient client, IRootContextManager contextManager)
    {
        _client = client;
        _contextManager = contextManager;
    }
    
    public async Task DemonstrateRootContextAsync()
    {
        // 1. Create a new root context
        var contextResult = await _contextManager.CreateRootContextAsync(new RootContextCreateOptions
        {
            Name = "Customer Support Session",
            Metadata = new Dictionary<string, string>
            {
                ["CustomerName"] = "Acme Corporation",
                ["PriorityLevel"] = "High",
                ["Domain"] = "Cloud Services"
            }
        });
        
        string contextId = contextResult.ContextId;
        Console.WriteLine($"Created root context with ID: {contextId}");
        
        // 2. First interaction using the context
        var response1 = await _client.SendPromptAsync(
            "I'm having issues scaling my web service deployment in the cloud.", 
            new SendPromptOptions { RootContextId = contextId }
        );
        
        Console.WriteLine($"First response: {response1.GeneratedText}");
        
        // Second interaction - the model will have access to the previous conversation
        var response2 = await _client.SendPromptAsync(
            "Yes, we're using containerized deployments with Kubernetes.", 
            new SendPromptOptions { RootContextId = contextId }
        );
        
        Console.WriteLine($"Second response: {response2.GeneratedText}");
        
        // 3. Add metadata to the context based on conversation
        await _contextManager.UpdateContextMetadataAsync(contextId, new Dictionary<string, string>
        {
            ["TechnicalEnvironment"] = "Kubernetes",
            ["IssueType"] = "Scaling"
        });
        
        // 4. Get context information
        var contextInfo = await _contextManager.GetRootContextInfoAsync(contextId);
        
        Console.WriteLine("Context Information:");
        Console.WriteLine($"- Name: {contextInfo.Name}");
        Console.WriteLine($"- Created: {contextInfo.CreatedAt}");
        Console.WriteLine($"- Messages: {contextInfo.MessageCount}");
        
        // 5. When the conversation is complete, archive the context
        await _contextManager.ArchiveRootContextAsync(contextId);
        Console.WriteLine($"Archived context {contextId}");
    }
}
```

W powyższym kodzie:

1. Utworzono root context dla sesji wsparcia klienta.
1. Wysłano wiele wiadomości w tym kontekście, co pozwoliło modelowi utrzymać stan.
1. Zaktualizowano kontekst o odpowiednie metadane na podstawie rozmowy.
1. Pobranie informacji o kontekście, aby zrozumieć historię rozmowy.
1. Zarchiwizowano kontekst po zakończeniu rozmowy.

## Przykład: Implementacja Root Context dla analizy finansowej

W tym przykładzie stworzymy root context dla sesji analizy finansowej, pokazując, jak utrzymać stan przez wiele interakcji.

### Implementacja w Java

```java
// Przykład Java: Implementacja kontekstu głównego
package com.example.mcp.contexts;

import com.mcp.client.McpClient;
import com.mcp.client.ContextManager;
import com.mcp.models.RootContext;
import com.mcp.models.McpResponse;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class RootContextsDemo {
    private final McpClient client;
    private final ContextManager contextManager;
    
    public RootContextsDemo(String serverUrl) {
        this.client = new McpClient.Builder()
            .setServerUrl(serverUrl)
            .build();
            
        this.contextManager = new ContextManager(client);
    }
    
    public void demonstrateRootContext() throws Exception {
        // Utwórz metadane kontekstu
        Map<String, String> metadata = new HashMap<>();
        metadata.put("projectName", "Financial Analysis");
        metadata.put("userRole", "Financial Analyst");
        metadata.put("dataSource", "Q1 2025 Financial Reports");
        
        // 1. Utwórz nowy kontekst główny
        RootContext context = contextManager.createRootContext("Financial Analysis Session", metadata);
        String contextId = context.getId();
        
        System.out.println("Created context: " + contextId);
        
        // 2. Pierwsza interakcja
        McpResponse response1 = client.sendPrompt(
            "Analyze the trends in Q1 financial data for our technology division",
            contextId
        );
        
        System.out.println("First response: " + response1.getGeneratedText());
        
        // 3. Zaktualizuj kontekst o ważne informacje uzyskane z odpowiedzi
        contextManager.addContextMetadata(contextId, 
            Map.of("identifiedTrend", "Increasing cloud infrastructure costs"));
        
        // Druga interakcja - użycie tego samego kontekstu
        McpResponse response2 = client.sendPrompt(
            "What's driving the increase in cloud infrastructure costs?",
            contextId
        );
        
        System.out.println("Second response: " + response2.getGeneratedText());
        
        // 4. Wygeneruj podsumowanie sesji analizy
        McpResponse summaryResponse = client.sendPrompt(
            "Summarize our analysis of the technology division financials in 3-5 key points",
            contextId
        );
        
        // Przechowaj podsumowanie w metadanych kontekstu
        contextManager.addContextMetadata(contextId, 
            Map.of("analysisSummary", summaryResponse.getGeneratedText()));
            
        // Pobierz zaktualizowane informacje kontekstowe
        RootContext updatedContext = contextManager.getRootContext(contextId);
        
        System.out.println("Context Information:");
        System.out.println("- Created: " + updatedContext.getCreatedAt());
        System.out.println("- Last Updated: " + updatedContext.getLastUpdatedAt());
        System.out.println("- Analysis Summary: " + 
            updatedContext.getMetadata().get("analysisSummary"));
            
        // 5. Zarchiwizuj kontekst po zakończeniu
        contextManager.archiveContext(contextId);
        System.out.println("Context archived");
    }
}
```

W powyższym kodzie:

1. Utworzono root context dla sesji analizy finansowej.
2. Wysłano wiele wiadomości w tym kontekście, co pozwoliło modelowi utrzymać stan.
3. Zaktualizowano kontekst o odpowiednie metadane na podstawie rozmowy.
4. Wygenerowano podsumowanie sesji analizy i zapisano je w metadanych kontekstu.
5. Zarchiwizowano kontekst po zakończeniu rozmowy.

## Przykład: Zarządzanie Root Context

Skuteczne zarządzanie root contexts jest kluczowe dla utrzymania historii konwersacji i stanu. Poniżej przykład implementacji zarządzania root context.

### Implementacja w JavaScript

```javascript
// Przykład JavaScript: Zarządzanie kontekstami głównymi MCP
const { McpClient, RootContextManager } = require('@mcp/client');

class ContextSession {
  constructor(serverUrl, apiKey = null) {
    // Inicjalizuj klienta MCP
    this.client = new McpClient({
      serverUrl,
      apiKey
    });
    
    // Inicjalizuj menedżera kontekstu
    this.contextManager = new RootContextManager(this.client);
  }
  
  /**
   * Create a new conversation context
   * @param {string} sessionName - Name of the conversation session
   * @param {Object} metadata - Additional metadata for the context
   * @returns {Promise<string>} - Context ID
   */
  async createConversationContext(sessionName, metadata = {}) {
    try {
      const contextResult = await this.contextManager.createRootContext({
        name: sessionName,
        metadata: {
          ...metadata,
          createdAt: new Date().toISOString(),
          status: 'active'
        }
      });
      
      console.log(`Created root context '${sessionName}' with ID: ${contextResult.id}`);
      return contextResult.id;
    } catch (error) {
      console.error('Error creating root context:', error);
      throw error;
    }
  }
  
  /**
   * Send a message in an existing context
   * @param {string} contextId - The root context ID
   * @param {string} message - The user's message
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - Response data
   */
  async sendMessage(contextId, message, options = {}) {
    try {
      // Wyślij wiadomość używając określonego kontekstu
      const response = await this.client.sendPrompt(message, {
        rootContextId: contextId,
        temperature: options.temperature || 0.7,
        allowedTools: options.allowedTools || []
      });
      
      // Opcjonalnie przechowuj ważne spostrzeżenia z rozmowy
      if (options.storeInsights) {
        await this.storeConversationInsights(contextId, message, response.generatedText);
      }
      
      return {
        message: response.generatedText,
        toolCalls: response.toolCalls || [],
        contextId
      };
    } catch (error) {
      console.error(`Error sending message in context ${contextId}:`, error);
      throw error;
    }
  }
  
  /**
   * Store important insights from a conversation
   * @param {string} contextId - The root context ID
   * @param {string} userMessage - User's message
   * @param {string} aiResponse - AI's response
   */
  async storeConversationInsights(contextId, userMessage, aiResponse) {
    try {
      // Wyodrębnij potencjalne spostrzeżenia (w prawdziwej aplikacji byłoby to bardziej zaawansowane)
      const combinedText = userMessage + "\n" + aiResponse;
      
      // Prosta heurystyka do identyfikacji potencjalnych spostrzeżeń
      const insightWords = ["important", "key point", "remember", "significant", "crucial"];
      
      const potentialInsights = combinedText
        .split(".")
        .filter(sentence => 
          insightWords.some(word => sentence.toLowerCase().includes(word))
        )
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 10);
      
      // Przechowuj spostrzeżenia w metadanych kontekstu
      if (potentialInsights.length > 0) {
        const insights = {};
        potentialInsights.forEach((insight, index) => {
          insights[`insight_${Date.now()}_${index}`] = insight;
        });
        
        await this.contextManager.updateContextMetadata(contextId, insights);
        console.log(`Stored ${potentialInsights.length} insights in context ${contextId}`);
      }
    } catch (error) {
      console.warn('Error storing conversation insights:', error);
      // Błąd niekrytyczny, więc tylko zaloguj ostrzeżenie
    }
  }
  
  /**
   * Get summary information about a context
   * @param {string} contextId - The root context ID
   * @returns {Promise<Object>} - Context information
   */
  async getContextInfo(contextId) {
    try {
      const contextInfo = await this.contextManager.getContextInfo(contextId);
      
      return {
        id: contextInfo.id,
        name: contextInfo.name,
        created: new Date(contextInfo.createdAt).toLocaleString(),
        lastUpdated: new Date(contextInfo.lastUpdatedAt).toLocaleString(),
        messageCount: contextInfo.messageCount,
        metadata: contextInfo.metadata,
        status: contextInfo.status
      };
    } catch (error) {
      console.error(`Error getting context info for ${contextId}:`, error);
      throw error;
    }
  }
  
  /**
   * Generate a summary of the conversation in a context
   * @param {string} contextId - The root context ID
   * @returns {Promise<string>} - Generated summary
   */
  async generateContextSummary(contextId) {
    try {
      // Poproś model o wygenerowanie podsumowania dotychczasowej rozmowy
      const response = await this.client.sendPrompt(
        "Please summarize our conversation so far in 3-4 sentences, highlighting the main points discussed.",
        { rootContextId: contextId, temperature: 0.3 }
      );
      
      // Przechowuj podsumowanie w metadanych kontekstu
      await this.contextManager.updateContextMetadata(contextId, {
        conversationSummary: response.generatedText,
        summarizedAt: new Date().toISOString()
      });
      
      return response.generatedText;
    } catch (error) {
      console.error(`Error generating context summary for ${contextId}:`, error);
      throw error;
    }
  }
  
  /**
   * Archive a context when it's no longer needed
   * @param {string} contextId - The root context ID
   * @returns {Promise<Object>} - Result of the archive operation
   */
  async archiveContext(contextId) {
    try {
      // Wygeneruj ostateczne podsumowanie przed archiwizacją
      const summary = await this.generateContextSummary(contextId);
      
      // Zarchiwizuj kontekst
      await this.contextManager.archiveContext(contextId);
      
      return {
        status: "archived",
        contextId,
        summary
      };
    } catch (error) {
      console.error(`Error archiving context ${contextId}:`, error);
      throw error;
    }
  }
}

// Przykładowe użycie
async function demonstrateContextSession() {
  const session = new ContextSession('https://mcp-server-example.com');
  
  try {
    // 1. Utwórz nowy kontekst dla rozmowy wsparcia produktu
    const contextId = await session.createConversationContext(
      'Product Support - Database Performance',
      {
        customer: 'Globex Corporation',
        product: 'Enterprise Database',
        severity: 'Medium',
        supportAgent: 'AI Assistant'
      }
    );
    
    // 2. Pierwsza wiadomość w rozmowie
    const response1 = await session.sendMessage(
      contextId,
      "I'm experiencing slow query performance on our database cluster after the latest update.",
      { storeInsights: true }
    );
    console.log('Response 1:', response1.message);
    
    // Wiadomość uzupełniająca w tym samym kontekście
    const response2 = await session.sendMessage(
      contextId,
      "Yes, we've already checked the indexes and they seem to be properly configured.",
      { storeInsights: true }
    );
    console.log('Response 2:', response2.message);
    
    // 3. Uzyskaj informacje o kontekście
    const contextInfo = await session.getContextInfo(contextId);
    console.log('Context Information:', contextInfo);
    
    // 4. Wygeneruj i wyświetl podsumowanie rozmowy
    const summary = await session.generateContextSummary(contextId);
    console.log('Conversation Summary:', summary);
    
    // 5. Zarchiwizuj kontekst po zakończeniu
    const archiveResult = await session.archiveContext(contextId);
    console.log('Archive Result:', archiveResult);
    
    // 6. Obsłuż wszelkie błędy w sposób łagodny
  } catch (error) {
    console.error('Error in context session demonstration:', error);
  }
}

demonstrateContextSession();
```

W powyższym kodzie:

1. Utworzono root context dla rozmowy wsparcia produktu za pomocą funkcji `createConversationContext`. W tym przypadku kontekst dotyczy problemów z wydajnością bazy danych.

1. Wysłano wiele wiadomości w tym kontekście, co pozwoliło modelowi utrzymać stan za pomocą funkcji `sendMessage`. Wiadomości dotyczyły wolnego działania zapytań i konfiguracji indeksów.

1. Zaktualizowano kontekst o odpowiednie metadane na podstawie rozmowy.

1. Wygenerowano podsumowanie rozmowy i zapisano je w metadanych kontekstu za pomocą funkcji `generateContextSummary`.

1. Zarchiwizowano kontekst po zakończeniu rozmowy za pomocą funkcji `archiveContext`.

1. Obsłużono błędy w sposób łagodny, zapewniając niezawodność.

## Root Context dla Pomocy Wieloetapowej

W tym przykładzie stworzymy root context dla sesji pomocy wieloetapowej, pokazując, jak utrzymać stan przez wiele interakcji.

### Implementacja w Python

```python
# Przykład Python: Główny kontekst dla wieloetapowej pomocy
import asyncio
from datetime import datetime
from mcp_client import McpClient, RootContextManager

class AssistantSession:
    def __init__(self, server_url, api_key=None):
        self.client = McpClient(server_url=server_url, api_key=api_key)
        self.context_manager = RootContextManager(self.client)
    
    async def create_session(self, name, user_info=None):
        """Create a new root context for an assistant session"""
        metadata = {
            "session_type": "assistant",
            "created_at": datetime.now().isoformat(),
        }
        
        # Dodaj informacje o użytkowniku, jeśli są podane
        if user_info:
            metadata.update({f"user_{k}": v for k, v in user_info.items()})
            
        # Utwórz główny kontekst
        context = await self.context_manager.create_root_context(name, metadata)
        return context.id
    
    async def send_message(self, context_id, message, tools=None):
        """Send a message within a root context"""
        # Utwórz opcje z identyfikatorem kontekstu
        options = {
            "root_context_id": context_id
        }
        
        # Dodaj narzędzia, jeśli określono
        if tools:
            options["allowed_tools"] = tools
        
        # Wyślij zapytanie w obrębie kontekstu
        response = await self.client.send_prompt(message, options)
        
        # Zaktualizuj metadane kontekstu postępem rozmowy
        await self.context_manager.update_context_metadata(
            context_id,
            {
                f"message_{datetime.now().timestamp()}": message[:50] + "...",
                "last_interaction": datetime.now().isoformat()
            }
        )
        
        return response
    
    async def get_conversation_history(self, context_id):
        """Retrieve conversation history from a context"""
        context_info = await self.context_manager.get_context_info(context_id)
        messages = await self.client.get_context_messages(context_id)
        
        return {
            "context_info": context_info,
            "messages": messages
        }
    
    async def end_session(self, context_id):
        """End an assistant session by archiving the context"""
        # Najpierw wygeneruj zapytanie podsumowujące
        summary_response = await self.client.send_prompt(
            "Please summarize our conversation and any key points or decisions made.",
            {"root_context_id": context_id}
        )
        
        # Zapisz podsumowanie w metadanych
        await self.context_manager.update_context_metadata(
            context_id,
            {
                "summary": summary_response.generated_text,
                "ended_at": datetime.now().isoformat(),
                "status": "completed"
            }
        )
        
        # Zarchiwizuj kontekst
        await self.context_manager.archive_context(context_id)
        
        return {
            "status": "completed",
            "summary": summary_response.generated_text
        }

# Przykład użycia
async def demo_assistant_session():
    assistant = AssistantSession("https://mcp-server-example.com")
    
    # 1. Utwórz sesję
    context_id = await assistant.create_session(
        "Technical Support Session",
        {"name": "Alex", "technical_level": "advanced", "product": "Cloud Services"}
    )
    print(f"Created session with context ID: {context_id}")
    
    # 2. Pierwsza interakcja
    response1 = await assistant.send_message(
        context_id, 
        "I'm having trouble with the auto-scaling feature in your cloud platform.",
        ["documentation_search", "diagnostic_tool"]
    )
    print(f"Response 1: {response1.generated_text}")
    
    # Druga interakcja w tym samym kontekście
    response2 = await assistant.send_message(
        context_id,
        "Yes, I've already checked the configuration settings you mentioned, but it's still not working."
    )
    print(f"Response 2: {response2.generated_text}")
    
    # 3. Pobierz historię
    history = await assistant.get_conversation_history(context_id)
    print(f"Session has {len(history['messages'])} messages")
    
    # 4. Zakończ sesję
    end_result = await assistant.end_session(context_id)
    print(f"Session ended with summary: {end_result['summary']}")

if __name__ == "__main__":
    asyncio.run(demo_assistant_session())
```

W powyższym kodzie:

1. Utworzono root context dla sesji wsparcia technicznego za pomocą funkcji `create_session`. Kontekst zawiera informacje o użytkowniku, takie jak imię i poziom techniczny.

1. Wysłano wiele wiadomości w tym kontekście, co pozwoliło modelowi utrzymać stan za pomocą funkcji `send_message`. Wiadomości dotyczyły problemów z funkcją auto-skalowania.

1. Pobranie historii rozmowy za pomocą funkcji `get_conversation_history`, która dostarcza informacji o kontekście i wiadomościach.

1. Zakończono sesję, archiwizując kontekst i generując podsumowanie za pomocą funkcji `end_session`. Podsumowanie obejmuje kluczowe punkty z rozmowy.

## Najlepsze praktyki Root Context

Oto najlepsze praktyki dotyczące skutecznego zarządzania root contexts:

- **Twórz skoncentrowane konteksty**: Twórz odrębne root contexts dla różnych celów lub dziedzin rozmów, aby zachować przejrzystość.

- **Ustal zasady wygasania**: Wdrażaj zasady archiwizacji lub usuwania starych kontekstów, aby zarządzać miejscem i spełniać polityki przechowywania danych.

- **Przechowuj istotne metadane**: Używaj metadanych kontekstu do przechowywania ważnych informacji o rozmowie, które mogą być przydatne później.

- **Konsekwentnie korzystaj z ID kontekstu**: Po utworzeniu kontekstu używaj jego ID konsekwentnie we wszystkich powiązanych żądaniach, aby utrzymać ciągłość.

- **Generuj podsumowania**: Gdy kontekst staje się duży, rozważ generowanie podsumowań, aby utrzymać kluczowe informacje, zarządzając rozmiarem kontekstu.

- **Wdrażaj kontrolę dostępu**: W systemach wieloużytkownikowych wprowadź odpowiednie mechanizmy kontroli, aby zapewnić prywatność i bezpieczeństwo kontekstów rozmów.

- **Radź sobie z ograniczeniami kontekstu**: Bądź świadomy ograniczeń rozmiaru kontekstu i wdroż strategie radzenia sobie z bardzo długimi rozmowami.

- **Archiwizuj po zakończeniu**: Archiwizuj konteksty po zakończeniu rozmów, aby zwolnić zasoby, zachowując historię konwersacji.

## Co dalej

- [5.5 Routing](../mcp-routing/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->