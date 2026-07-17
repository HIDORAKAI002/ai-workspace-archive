> [ZASTARANÉ: 2026-07-28 VERZIA NA SCHVÁLENIE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# MCP Koreňové Kontexty

> **Upozornenie na zastaranie:** kandidátska verzia špecifikácie MCP `2026-07-28` označuje koreňové kontexty ako zastarané v prospech parametrov nástroja, URI zdrojov alebo konfigurácie servera. Koreňové kontexty naďalej fungujú v `2025-11-25` a minimálne rok po akejkoľvek formálnej deprekácii, takže všetko v tejto lekcii zostáva platné - ale nové návrhy serverov by mali vyhodnotiť vzor nahradenia. Pozrite si [Čo sa mení v MCP: Verzia na schválenie 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Koreňové kontexty sú základným konceptom v Model Context Protocol, ktorý poskytuje perzistentnú vrstvu na uchovávanie histórie konverzácie a zdieľaného stavu v rámci viacerých požiadaviek a relácií.

## Úvod

V tejto lekcii preskúmame, ako vytvárať, spravovať a využívať koreňové kontexty v MCP.

## Ciele učenia

Na konci tejto lekcie budete schopní:

- Pochopiť účel a štruktúru koreňových kontextov
- Vytvárať a spravovať koreňové kontexty pomocou MCP klientskych knižníc
- Implementovať koreňové kontexty v aplikáciách .NET, Java, JavaScript a Python
- Využívať koreňové kontexty pre viackolové konverzácie a správu stavu
- Zavádzať osvedčené postupy pre správu koreňových kontextov

## Pochopenie koreňových kontextov

Koreňové kontexty slúžia ako kontajnery, ktoré uchovávajú históriu a stav pre sériu súvisiacich interakcií. Umožňujú:

- **Perzistenciu konverzácie**: Udržiavanie súdržných viackolových konverzácií
- **Správu pamäte**: Ukladanie a získavanie informácií naprieč interakciami
- **Správu stavu**: Sledovanie postupu v zložitých pracovných postupoch
- **Zdieľanie kontextu**: Umožnenie viacerým klientom prístup k rovnakému stavu konverzácie

V MCP majú koreňové kontexty tieto kľúčové vlastnosti:

- Každý koreňový kontext má jedinečný identifikátor.
- Môžu obsahovať históriu konverzácie, používateľské preferencie a ďalšie metadáta.
- Môžu byť vytvárané, pristupované a archivované podľa potreby.
- Podporujú jemnozrnné riadenie prístupu a oprávnenia.

## Životný cyklus koreňového kontextu

```mermaid
flowchart TD
    A[Vytvoriť koreňový kontext] --> B[Inicializovať s metadátami]
    B --> C[Odoslať požiadavky s ID kontextu]
    C --> D[Aktualizovať kontext s výsledkami]
    D --> C
    D --> E[Archivovať kontext po dokončení]
```

## Práca s koreňovými kontextami

Tu je príklad, ako vytvoriť a spravovať koreňové kontexty.

### Implementácia v C#

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

V predchádzajúcom kóde sme:

1. Vytvorili koreňový kontext pre reláciu zákazníckej podpory.
1. Odoslali viac správ v rámci tohto kontextu, čo umožnilo modelu udržiavať stav.
1. Aktualizovali kontext relevantnými metadátami na základe konverzácie.
1. Získali informácie o kontexte na pochopenie histórie konverzácie.
1. Archivovali kontext, keď bola konverzácia ukončená.

## Príklad: Implementácia koreňového kontextu pre finančnú analýzu

V tomto príklade vytvoríme koreňový kontext pre reláciu finančnej analýzy, demonštrujúc, ako udržiavať stav naprieč viacerými interakciami.

### Implementácia v Java

```java
// Java Príklad: Implementácia koreňového kontextu
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
        // Vytvoriť metadáta kontextu
        Map<String, String> metadata = new HashMap<>();
        metadata.put("projectName", "Financial Analysis");
        metadata.put("userRole", "Financial Analyst");
        metadata.put("dataSource", "Q1 2025 Financial Reports");
        
        // 1. Vytvorte nový koreňový kontext
        RootContext context = contextManager.createRootContext("Financial Analysis Session", metadata);
        String contextId = context.getId();
        
        System.out.println("Created context: " + contextId);
        
        // 2. Prvá interakcia
        McpResponse response1 = client.sendPrompt(
            "Analyze the trends in Q1 financial data for our technology division",
            contextId
        );
        
        System.out.println("First response: " + response1.getGeneratedText());
        
        // 3. Aktualizovať kontext s dôležitými informáciami získanými z odpovede
        contextManager.addContextMetadata(contextId, 
            Map.of("identifiedTrend", "Increasing cloud infrastructure costs"));
        
        // Druhá interakcia - použitie rovnakého kontextu
        McpResponse response2 = client.sendPrompt(
            "What's driving the increase in cloud infrastructure costs?",
            contextId
        );
        
        System.out.println("Second response: " + response2.getGeneratedText());
        
        // 4. Vygenerovať zhrnutie analýzy
        McpResponse summaryResponse = client.sendPrompt(
            "Summarize our analysis of the technology division financials in 3-5 key points",
            contextId
        );
        
        // Uložiť zhrnutie do metadát kontextu
        contextManager.addContextMetadata(contextId, 
            Map.of("analysisSummary", summaryResponse.getGeneratedText()));
            
        // Získať aktualizované informácie kontextu
        RootContext updatedContext = contextManager.getRootContext(contextId);
        
        System.out.println("Context Information:");
        System.out.println("- Created: " + updatedContext.getCreatedAt());
        System.out.println("- Last Updated: " + updatedContext.getLastUpdatedAt());
        System.out.println("- Analysis Summary: " + 
            updatedContext.getMetadata().get("analysisSummary"));
            
        // 5. Archivovať kontext po dokončení
        contextManager.archiveContext(contextId);
        System.out.println("Context archived");
    }
}
```

V predchádzajúcom kóde sme:

1. Vytvorili koreňový kontext pre reláciu finančnej analýzy.
2. Odoslali viac správ v rámci tohto kontextu, čo umožnilo modelu udržiavať stav.
3. Aktualizovali kontext relevantnými metadátami na základe konverzácie.
4. Vytvorili súhrn relácie analýzy a uložili ho do metadát kontextu.
5. Archivovali kontext, keď bola konverzácia ukončená.

## Príklad: Správa koreňového kontextu

Efektívna správa koreňových kontextov je kľúčová pre udržiavanie histórie a stavu konverzácie. Nižšie je príklad, ako implementovať správu koreňového kontextu.

### Implementácia v JavaScript

```javascript
// Príklad JavaScript: Správa MCP koreňových kontextov
const { McpClient, RootContextManager } = require('@mcp/client');

class ContextSession {
  constructor(serverUrl, apiKey = null) {
    // Inicializujte MCP klienta
    this.client = new McpClient({
      serverUrl,
      apiKey
    });
    
    // Inicializujte správcu kontextu
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
      // Odošlite správu pomocou špecifikovaného kontextu
      const response = await this.client.sendPrompt(message, {
        rootContextId: contextId,
        temperature: options.temperature || 0.7,
        allowedTools: options.allowedTools || []
      });
      
      // Voliteľne uložte dôležité postrehy z konverzácie
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
      // Extrahujte potenciálne postrehy (v reálnej aplikácii by to bolo sofistikovanejšie)
      const combinedText = userMessage + "\n" + aiResponse;
      
      // Jednoduchá heuristika na identifikáciu potenciálnych postrehov
      const insightWords = ["important", "key point", "remember", "significant", "crucial"];
      
      const potentialInsights = combinedText
        .split(".")
        .filter(sentence => 
          insightWords.some(word => sentence.toLowerCase().includes(word))
        )
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 10);
      
      // Uložte postrehy do metadát kontextu
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
      // Nekritická chyba, takže iba zaznamenajte varovanie
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
      // Požiadajte model, aby vygeneroval zhrnutie doterajšej konverzácie
      const response = await this.client.sendPrompt(
        "Please summarize our conversation so far in 3-4 sentences, highlighting the main points discussed.",
        { rootContextId: contextId, temperature: 0.3 }
      );
      
      // Uložte zhrnutie do metadát kontextu
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
      // Vygenerujte konečné zhrnutie pred archiváciou
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

// Príklad použitia
async function demonstrateContextSession() {
  const session = new ContextSession('https://mcp-server-example.com');
  
  try {
    // 1. Vytvorte nový kontext pre konverzáciu o podpore produktu
    const contextId = await session.createConversationContext(
      'Product Support - Database Performance',
      {
        customer: 'Globex Corporation',
        product: 'Enterprise Database',
        severity: 'Medium',
        supportAgent: 'AI Assistant'
      }
    );
    
    // 2. Prvá správa v konverzácii
    const response1 = await session.sendMessage(
      contextId,
      "I'm experiencing slow query performance on our database cluster after the latest update.",
      { storeInsights: true }
    );
    console.log('Response 1:', response1.message);
    
    // Nasledujúca správa v rovnakom kontexte
    const response2 = await session.sendMessage(
      contextId,
      "Yes, we've already checked the indexes and they seem to be properly configured.",
      { storeInsights: true }
    );
    console.log('Response 2:', response2.message);
    
    // 3. Získajte informácie o kontexte
    const contextInfo = await session.getContextInfo(contextId);
    console.log('Context Information:', contextInfo);
    
    // 4. Vytvorte a zobrazte zhrnutie konverzácie
    const summary = await session.generateContextSummary(contextId);
    console.log('Conversation Summary:', summary);
    
    // 5. Archivujte kontext po dokončení
    const archiveResult = await session.archiveContext(contextId);
    console.log('Archive Result:', archiveResult);
    
    // 6. Ošetrite prípadné chyby jemne
  } catch (error) {
    console.error('Error in context session demonstration:', error);
  }
}

demonstrateContextSession();
```

V predchádzajúcom kóde sme:

1. Vytvorili koreňový kontext pre konverzáciu o podpore produktu pomocou funkcie `createConversationContext`. V tomto prípade je kontext o problémoch s výkonom databázy.

1. Odoslali viac správ v rámci tohto kontextu, čo umožnilo modelu udržiavať stav pomocou funkcie `sendMessage`. Správy sa týkajú pomalého vykonávania dopytov a konfigurácie indexov.

1. Aktualizovali kontext relevantnými metadátami na základe konverzácie.

1. Vytvorili súhrn konverzácie a uložili ho do metadát kontextu pomocou funkcie `generateContextSummary`.

1. Archivovali kontext po ukončení konverzácie pomocou funkcie `archiveContext`.

1. Ošetrenie chýb pre zabezpečenie stability.

## Koreňový kontext pre viackolovú asistenciu

V tomto príklade vytvoríme koreňový kontext pre reláciu viackolovej asistencie, demonštrujúc, ako udržiavať stav naprieč viacerými interakciami.

### Implementácia v Pythone

```python
# Príklad Python: Koreňový kontext pre viackolovú asistenciu
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
        
        # Pridajte informácie o používateľovi, ak sú poskytnuté
        if user_info:
            metadata.update({f"user_{k}": v for k, v in user_info.items()})
            
        # Vytvorte koreňový kontext
        context = await self.context_manager.create_root_context(name, metadata)
        return context.id
    
    async def send_message(self, context_id, message, tools=None):
        """Send a message within a root context"""
        # Vytvorte možnosti s ID kontextu
        options = {
            "root_context_id": context_id
        }
        
        # Pridajte nástroje, ak sú špecifikované
        if tools:
            options["allowed_tools"] = tools
        
        # Odoslať prompt v rámci kontextu
        response = await self.client.send_prompt(message, options)
        
        # Aktualizujte metadata kontextu s priebehom konverzácie
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
        # Najprv vygenerujte zhrňujúci prompt
        summary_response = await self.client.send_prompt(
            "Please summarize our conversation and any key points or decisions made.",
            {"root_context_id": context_id}
        )
        
        # Uložte zhrnutie do metadát
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

# Príklad použitia
async def demo_assistant_session():
    assistant = AssistantSession("https://mcp-server-example.com")
    
    # 1. Vytvoriť reláciu
    context_id = await assistant.create_session(
        "Technical Support Session",
        {"name": "Alex", "technical_level": "advanced", "product": "Cloud Services"}
    )
    print(f"Created session with context ID: {context_id}")
    
    # 2. Prvá interakcia
    response1 = await assistant.send_message(
        context_id, 
        "I'm having trouble with the auto-scaling feature in your cloud platform.",
        ["documentation_search", "diagnostic_tool"]
    )
    print(f"Response 1: {response1.generated_text}")
    
    # Druhá interakcia v tom istom kontexte
    response2 = await assistant.send_message(
        context_id,
        "Yes, I've already checked the configuration settings you mentioned, but it's still not working."
    )
    print(f"Response 2: {response2.generated_text}")
    
    # 3. Získať históriu
    history = await assistant.get_conversation_history(context_id)
    print(f"Session has {len(history['messages'])} messages")
    
    # 4. Ukončiť reláciu
    end_result = await assistant.end_session(context_id)
    print(f"Session ended with summary: {end_result['summary']}")

if __name__ == "__main__":
    asyncio.run(demo_assistant_session())
```

V predchádzajúcom kóde sme:

1. Vytvorili koreňový kontext pre reláciu technickej podpory pomocou funkcie `create_session`. Kontext obsahuje informácie o používateľovi ako meno a technická úroveň.

1. Odoslali viac správ v rámci tohto kontextu, čo umožnilo modelu udržiavať stav pomocou funkcie `send_message`. Správy sa týkajú problémov s funkciou automatického škálovania.

1. Získali históriu konverzácie pomocou funkcie `get_conversation_history`, ktorá poskytuje informácie o kontexte a správy.

1. Ukončili reláciu archiváciou kontextu a vytvorením súhrnu pomocou funkcie `end_session`. Súhrn zachytáva kľúčové body konverzácie.

## Osvedčené postupy pre koreňové kontexty

Tu sú niektoré osvedčené postupy pre efektívnu správu koreňových kontextov:

- **Vytvárajte zamerané kontexty**: Vytvárajte samostatné koreňové kontexty pre rôzne účely konverzácie alebo domény, aby sa zachovala jasnosť.

- **Nastavte pravidlá expirácií**: Zavádzajte pravidlá na archiváciu alebo mazanie starých kontextov, aby ste spravovali úložisko a dodržiavali pravidlá uchovávania údajov.

- **Ukladajte relevantné metadáta**: Používajte metadáta kontextu na uloženie dôležitých informácií o konverzácii, ktoré môžu byť neskôr užitočné.

- **Konzistentne používajte ID kontextov**: Akonáhle je kontext vytvorený, používajte jeho ID konzistentne pre všetky súvisiace požiadavky na udržanie kontinuity.

- **Vytvárajte súhrny**: Keď kontext narastie, zvážte vytvorenie súhrnov na zachytenie podstatných informácií pri správe veľkosti kontextu.

- **Implementujte riadenie prístupu**: Pre systémy viac používateľov zavádzajte správne riadenie prístupu na zabezpečenie súkromia a bezpečnosti kontextov konverzácie.

- **Zvládajte obmedzenia kontextu**: Buďte si vedomí obmedzení veľkosti kontextu a implementujte stratégie na zvládnutie veľmi dlhých konverzácií.

- **Archivujte po dokončení**: Archivujte kontexty po ukončení konverzácií na uvoľnenie zdrojov pri zachovaní histórie konverzácie.

## Čo bude ďalej

- [5.5 Smerovanie](../mcp-routing/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->