> [Zastaralé: 2026-07-28 VERZE K UZAVŘENÍ](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Kořenové kontexty MCP

> **Oznámení o ukončení podpory:** verze kandidáta specifikace MCP `2026-07-28` označuje Kořeny jako zastaralé ve prospěch parametrů nástrojů, URI zdrojů nebo konfigurace serveru. Kořeny nadále fungují ve verzi `2025-11-25` a alespoň rok po jakémkoli formálním ukončení podpory, takže vše v této lekci zůstává platné - nové návrhy serverů by ale měly zvážit náhradní vzor. Viz [Co se mění v MCP: Verze kandidáta 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Kořenové kontexty jsou základním konceptem v Model Context Protocol, které poskytují trvalou vrstvu pro udržování historie konverzace a sdíleného stavu napříč více požadavky a relacemi.

## Úvod

V této lekci si ukážeme, jak vytvářet, spravovat a využívat kořenové kontexty v MCP.

## Vzdělávací cíle

Na konci této lekce budete schopni:

- Pochopit účel a strukturu kořenových kontextů
- Vytvářet a spravovat kořenové kontexty pomocí klientských knihoven MCP
- Implementovat kořenové kontexty v aplikacích .NET, Java, JavaScript a Python
- Využívat kořenové kontexty pro vícekrokové konverzace a správu stavu
- Dodržovat nejlepší postupy pro správu kořenových kontextů

## Porozumění kořenovým kontextům

Kořenové kontexty slouží jako kontejnery, které uchovávají historii a stav pro řadu souvisejících interakcí. Umožňují:

- **Trvalost konverzace**: Udržení koherentních vícekrokových konverzací
- **Správa paměti**: Ukládání a získávání informací napříč interakcemi
- **Správa stavu**: Sledování pokroku v komplexních pracovních postupech
- **Sdílení kontextu**: Umožnění více klientům přístup ke stejnému stavu konverzace

V MCP mají kořenové kontexty tyto klíčové vlastnosti:

- Každý kořenový kontext má unikátní identifikátor.
- Mohou obsahovat historii konverzace, uživatelská nastavení a další metadata.
- Mohou být vytvořeny, přístupné a archivované dle potřeby.
- Podporují jemnozrnnou kontrolu přístupu a oprávnění.

## Životní cyklus kořenového kontextu

```mermaid
flowchart TD
    A[Vytvořit kořenový kontext] --> B[Inicializovat s metadaty]
    B --> C[Odeslat požadavky s ID kontextu]
    C --> D[Aktualizovat kontext s výsledky]
    D --> C
    D --> E[Archivovat kontext po dokončení]
```

## Práce s kořenovými kontexty

Zde je příklad, jak vytvářet a spravovat kořenové kontexty.

### Implementace v C#

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

V předchozím kódu jsme:

1. Vytvořili kořenový kontext pro relaci zákaznické podpory.
1. Odeslali několik zpráv v tomto kontextu, což umožnilo modelu udržet stav.
1. Aktualizovali kontext příslušnými metadata na základě konverzace.
1. Získali informace z kontextu pro pochopení historie konverzace.
1. Archivovali kontext po ukončení konverzace.

## Příklad: Implementace kořenového kontextu pro finanční analýzu

V tomto příkladu vytvoříme kořenový kontext pro relaci finanční analýzy a ukážeme, jak udržovat stav napříč více interakcemi.

### Implementace v Javě

```java
// Příklad v Javě: Implementace kořenového kontextu
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
        // Vytvořit metadata kontextu
        Map<String, String> metadata = new HashMap<>();
        metadata.put("projectName", "Financial Analysis");
        metadata.put("userRole", "Financial Analyst");
        metadata.put("dataSource", "Q1 2025 Financial Reports");
        
        // 1. Vytvořit nový kořenový kontext
        RootContext context = contextManager.createRootContext("Financial Analysis Session", metadata);
        String contextId = context.getId();
        
        System.out.println("Created context: " + contextId);
        
        // 2. První interakce
        McpResponse response1 = client.sendPrompt(
            "Analyze the trends in Q1 financial data for our technology division",
            contextId
        );
        
        System.out.println("First response: " + response1.getGeneratedText());
        
        // 3. Aktualizovat kontext důležitými informacemi získanými z odpovědi
        contextManager.addContextMetadata(contextId, 
            Map.of("identifiedTrend", "Increasing cloud infrastructure costs"));
        
        // Druhá interakce - použití stejného kontextu
        McpResponse response2 = client.sendPrompt(
            "What's driving the increase in cloud infrastructure costs?",
            contextId
        );
        
        System.out.println("Second response: " + response2.getGeneratedText());
        
        // 4. Vygenerovat shrnutí analýzy
        McpResponse summaryResponse = client.sendPrompt(
            "Summarize our analysis of the technology division financials in 3-5 key points",
            contextId
        );
        
        // Uložit shrnutí do metadat kontextu
        contextManager.addContextMetadata(contextId, 
            Map.of("analysisSummary", summaryResponse.getGeneratedText()));
            
        // Získat aktualizované informace kontextu
        RootContext updatedContext = contextManager.getRootContext(contextId);
        
        System.out.println("Context Information:");
        System.out.println("- Created: " + updatedContext.getCreatedAt());
        System.out.println("- Last Updated: " + updatedContext.getLastUpdatedAt());
        System.out.println("- Analysis Summary: " + 
            updatedContext.getMetadata().get("analysisSummary"));
            
        // 5. Archivovat kontext po ukončení
        contextManager.archiveContext(contextId);
        System.out.println("Context archived");
    }
}
```

V předchozím kódu jsme:

1. Vytvořili kořenový kontext pro relaci finanční analýzy.
2. Odeslali několik zpráv v tomto kontextu, což umožnilo modelu udržet stav.
3. Aktualizovali kontext příslušnými metadata na základě konverzace.
4. Vygenerovali shrnutí relace analýzy a uložili ho do metadat kontextu.
5. Archivovali kontext po ukončení konverzace.

## Příklad: Správa kořenového kontextu

Efektivní správa kořenových kontextů je klíčová pro udržování historie konverzace a stavu. Níže je uveden příklad, jak implementovat správu kořenového kontextu.

### Implementace v JavaScriptu

```javascript
// JavaScript Příklad: Správa MCP Root Kontextů
const { McpClient, RootContextManager } = require('@mcp/client');

class ContextSession {
  constructor(serverUrl, apiKey = null) {
    // Inicializujte MCP klienta
    this.client = new McpClient({
      serverUrl,
      apiKey
    });
    
    // Inicializujte správce kontextu
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
      // Odeslat zprávu pomocí specifikovaného kontextu
      const response = await this.client.sendPrompt(message, {
        rootContextId: contextId,
        temperature: options.temperature || 0.7,
        allowedTools: options.allowedTools || []
      });
      
      // Volitelně uložte důležité poznatky z konverzace
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
      // Extrahujte potenciální poznatky (v reálné aplikaci by to bylo sofistikovanější)
      const combinedText = userMessage + "\n" + aiResponse;
      
      // Jednoduchá heuristika pro identifikaci potenciálních poznatků
      const insightWords = ["important", "key point", "remember", "significant", "crucial"];
      
      const potentialInsights = combinedText
        .split(".")
        .filter(sentence => 
          insightWords.some(word => sentence.toLowerCase().includes(word))
        )
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 10);
      
      // Uložte poznatky do metadat kontextu
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
      // Nekritická chyba, proto pouze zaznamenejte varování
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
      // Požádejte model o vytvoření shrnutí dosavadní konverzace
      const response = await this.client.sendPrompt(
        "Please summarize our conversation so far in 3-4 sentences, highlighting the main points discussed.",
        { rootContextId: contextId, temperature: 0.3 }
      );
      
      // Uložte shrnutí do metadat kontextu
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
      // Vytvořte konečné shrnutí před archivací
      const summary = await this.generateContextSummary(contextId);
      
      // Archivujte kontext
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

// Příklad použití
async function demonstrateContextSession() {
  const session = new ContextSession('https://mcp-server-example.com');
  
  try {
    // 1. Vytvořte nový kontext pro konverzaci o podpoře produktu
    const contextId = await session.createConversationContext(
      'Product Support - Database Performance',
      {
        customer: 'Globex Corporation',
        product: 'Enterprise Database',
        severity: 'Medium',
        supportAgent: 'AI Assistant'
      }
    );
    
    // 2. První zpráva v konverzaci
    const response1 = await session.sendMessage(
      contextId,
      "I'm experiencing slow query performance on our database cluster after the latest update.",
      { storeInsights: true }
    );
    console.log('Response 1:', response1.message);
    
    // Následující zpráva ve stejném kontextu
    const response2 = await session.sendMessage(
      contextId,
      "Yes, we've already checked the indexes and they seem to be properly configured.",
      { storeInsights: true }
    );
    console.log('Response 2:', response2.message);
    
    // 3. Získejte informace o kontextu
    const contextInfo = await session.getContextInfo(contextId);
    console.log('Context Information:', contextInfo);
    
    // 4. Vytvořte a zobrazte shrnutí konverzace
    const summary = await session.generateContextSummary(contextId);
    console.log('Conversation Summary:', summary);
    
    // 5. Po dokončení archivujte kontext
    const archiveResult = await session.archiveContext(contextId);
    console.log('Archive Result:', archiveResult);
    
    // 6. Zvládněte případné chyby jemně
  } catch (error) {
    console.error('Error in context session demonstration:', error);
  }
}

demonstrateContextSession();
```

V předchozím kódu jsme:

1. Vytvořili kořenový kontext pro konverzaci o podpoře produktu pomocí funkce `createConversationContext`. V tomto případě je kontext o problémech s výkonem databáze.

1. Odeslali několik zpráv v tomto kontextu, což umožnilo modelu udržet stav pomocí funkce `sendMessage`. Odesílané zprávy jsou o pomalém výkonu dotazů a konfiguraci indexu.

1. Aktualizovali kontext příslušnými metadata na základě konverzace.

1. Vygenerovali shrnutí konverzace a uložili ho do metadat kontextu pomocí funkce `generateContextSummary`.

1. Archivovali kontext po ukončení konverzace funkcí `archiveContext`.

1. Ošetřili chyby tak, aby byla zajištěna robustnost.

## Kořenový kontext pro vícekrokovou asistenci

V tomto příkladu vytvoříme kořenový kontext pro relaci vícekrokové asistence a ukážeme, jak udržovat stav napříč více interakcemi.

### Implementace v Pythonu

```python
# Python Příklad: Kořenový kontext pro asistenci s více koly
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
        
        # Přidejte informace o uživateli, pokud jsou k dispozici
        if user_info:
            metadata.update({f"user_{k}": v for k, v in user_info.items()})
            
        # Vytvořte kořenový kontext
        context = await self.context_manager.create_root_context(name, metadata)
        return context.id
    
    async def send_message(self, context_id, message, tools=None):
        """Send a message within a root context"""
        # Vytvořte možnosti s ID kontextu
        options = {
            "root_context_id": context_id
        }
        
        # Přidejte nástroje, pokud jsou specifikovány
        if tools:
            options["allowed_tools"] = tools
        
        # Odešlete výzvu v rámci kontextu
        response = await self.client.send_prompt(message, options)
        
        # Aktualizujte metadata kontextu s pokrokem konverzace
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
        # Nejprve vygenerujte shrnující výzvu
        summary_response = await self.client.send_prompt(
            "Please summarize our conversation and any key points or decisions made.",
            {"root_context_id": context_id}
        )
        
        # Uložte shrnutí do metadat
        await self.context_manager.update_context_metadata(
            context_id,
            {
                "summary": summary_response.generated_text,
                "ended_at": datetime.now().isoformat(),
                "status": "completed"
            }
        )
        
        # Archivujte kontext
        await self.context_manager.archive_context(context_id)
        
        return {
            "status": "completed",
            "summary": summary_response.generated_text
        }

# Příklad použití
async def demo_assistant_session():
    assistant = AssistantSession("https://mcp-server-example.com")
    
    # 1. Vytvořit relaci
    context_id = await assistant.create_session(
        "Technical Support Session",
        {"name": "Alex", "technical_level": "advanced", "product": "Cloud Services"}
    )
    print(f"Created session with context ID: {context_id}")
    
    # 2. První interakce
    response1 = await assistant.send_message(
        context_id, 
        "I'm having trouble with the auto-scaling feature in your cloud platform.",
        ["documentation_search", "diagnostic_tool"]
    )
    print(f"Response 1: {response1.generated_text}")
    
    # Druhá interakce ve stejném kontextu
    response2 = await assistant.send_message(
        context_id,
        "Yes, I've already checked the configuration settings you mentioned, but it's still not working."
    )
    print(f"Response 2: {response2.generated_text}")
    
    # 3. Získat historii
    history = await assistant.get_conversation_history(context_id)
    print(f"Session has {len(history['messages'])} messages")
    
    # 4. Ukončit relaci
    end_result = await assistant.end_session(context_id)
    print(f"Session ended with summary: {end_result['summary']}")

if __name__ == "__main__":
    asyncio.run(demo_assistant_session())
```

V předchozím kódu jsme:

1. Vytvořili kořenový kontext pro relaci technické podpory pomocí funkce `create_session`. Kontext zahrnuje informace o uživateli, jako jsou jméno a technická úroveň.

1. Odeslali několik zpráv v tomto kontextu, což umožnilo modelu udržet stav pomocí funkce `send_message`. Odesílané zprávy jsou o problémech s funkcí automatického škálování.

1. Získali historii konverzace pomocí funkce `get_conversation_history`, která poskytuje informace o kontextu a zprávách.

1. Ukončili relaci archivací kontextu a vygenerováním shrnutí pomocí funkce `end_session`. Shrnutí zachycuje klíčové body konverzace.

## Nejlepší postupy pro kořenové kontexty

Zde jsou některé nejlepší postupy pro efektivní správu kořenových kontextů:

- **Vytvářejte zaměřené kontexty**: Vytvářejte samostatné kořenové kontexty pro různé účely konverzace nebo oblasti, aby byla zachována přehlednost.

- **Nastavte zásady vypršení platnosti**: Implementujte zásady archivace nebo mazání starých kontextů pro správu úložiště a dodržování pravidel uchovávání dat.

- **Ukládejte relevantní metadata**: Používejte metadata kontextu k ukládání důležitých informací o konverzaci, které by mohly být později užitečné.

- **Konzistentně používejte ID kontextu**: Jakmile je kontext vytvořen, používejte jeho ID konzistentně pro všechny související požadavky, abyste zachovali kontinuitu.

- **Generujte shrnutí**: Pokud kontext roste příliš velký, zvažte generování shrnutí pro zachycení podstatných informací a zmenšení velikosti kontextu.

- **Implementujte kontrolu přístupu**: Pro víceuživatelské systémy implementujte správnou kontrolu přístupu, aby byla zajištěna soukromí a bezpečnost kontextů konverzace.

- **Řešte omezení kontextu**: Buďte si vědomi omezení velikosti kontextu a implementujte strategie pro zacházení s velmi dlouhými konverzacemi.

- **Archivujte po skončení**: Archivujte kontexty, když jsou konverzace ukončené, aby se uvolnily zdroje a přitom zachovala historie konverzace.

## Co dál

- [5.5 Směrování](../mcp-routing/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->