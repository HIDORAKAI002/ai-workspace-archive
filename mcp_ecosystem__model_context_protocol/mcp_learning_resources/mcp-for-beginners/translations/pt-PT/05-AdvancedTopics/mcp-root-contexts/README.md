> [OBSOLETO: CANDIDATO A LANÇAMENTO 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Contextos Raiz MCP

> **Aviso de descontinuação:** o candidato a especificação MCP `2026-07-28` marca as Raízes como obsoletas em favor de parâmetros de ferramenta, URIs de recursos ou configuração do servidor. As Raízes continuam a funcionar na versão `2025-11-25` e pelo menos durante um ano após qualquer descontinuação formal, por isso tudo nesta lição mantém-se válido - mas os novos designs de servidor devem avaliar o padrão substituto. Veja [O que está a mudar no MCP: O Candidato a Lançamento 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Os contextos raiz são um conceito fundamental no Protocolo de Contexto de Modelo que fornecem uma camada persistente para manter o histórico da conversa e o estado partilhado através de múltiplos pedidos e sessões.

## Introdução

Nesta lição, vamos explorar como criar, gerir e utilizar contextos raiz no MCP.

## Objetivos de Aprendizagem

No final desta lição, serás capaz de:

- Compreender o propósito e a estrutura dos contextos raiz
- Criar e gerir contextos raiz usando bibliotecas clientes MCP
- Implementar contextos raiz em aplicações .NET, Java, JavaScript e Python
- Utilizar contextos raiz para conversas multi-turno e gestão de estado
- Implementar as melhores práticas para gestão de contextos raiz

## Compreender os Contextos Raiz

Os contextos raiz funcionam como contentores que mantêm o histórico e o estado de uma série de interações relacionadas. Eles permitem:

- **Persistência da Conversa**: Manter conversas multi-turno coerentes
- **Gestão de Memória**: Guardar e recuperar informação através de interações
- **Gestão de Estado**: Acompanhar o progresso em fluxos de trabalho complexos
- **Partilha de Contexto**: Permitir que múltiplos clientes acedam ao mesmo estado da conversa

No MCP, os contextos raiz têm as seguintes características chave:

- Cada contexto raiz tem um identificador único.
- Podem conter histórico da conversa, preferências do utilizador e outros metadados.
- Podem ser criados, acedidos e arquivados conforme necessário.
- Suportam controlo de acesso e permissões granulares.

## Ciclo de Vida do Contexto Raiz

```mermaid
flowchart TD
    A[Criar Contexto Raiz] --> B[Inicializar com Metadados]
    B --> C[Enviar Pedidos com ID do Contexto]
    C --> D[Atualizar Contexto com Resultados]
    D --> C
    D --> E[Arquivar Contexto Quando Completo]
```

## Trabalhar com Contextos Raiz

Aqui está um exemplo de como criar e gerir contextos raiz.

### Implementação em C#

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

No código anterior, nós:

1. Criámos um contexto raiz para uma sessão de suporte ao cliente.
1. Enviámos múltiplas mensagens dentro desse contexto, permitindo ao modelo manter estado.
1. Atualizámos o contexto com metadados relevantes com base na conversa.
1. Recuperámos informação do contexto para entender o histórico da conversa.
1. Arquivámos o contexto quando a conversa terminou.

## Exemplo: Implementação de Contexto Raiz para análise financeira

Neste exemplo, vamos criar um contexto raiz para uma sessão de análise financeira, demonstrando como manter estado através de múltiplas interações.

### Implementação em Java

```java
// Exemplo Java: Implementação de Contexto Raiz
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
        // Criar metadados de contexto
        Map<String, String> metadata = new HashMap<>();
        metadata.put("projectName", "Financial Analysis");
        metadata.put("userRole", "Financial Analyst");
        metadata.put("dataSource", "Q1 2025 Financial Reports");
        
        // 1. Criar um novo contexto raiz
        RootContext context = contextManager.createRootContext("Financial Analysis Session", metadata);
        String contextId = context.getId();
        
        System.out.println("Created context: " + contextId);
        
        // 2. Primeira interação
        McpResponse response1 = client.sendPrompt(
            "Analyze the trends in Q1 financial data for our technology division",
            contextId
        );
        
        System.out.println("First response: " + response1.getGeneratedText());
        
        // 3. Atualizar o contexto com informação importante obtida da resposta
        contextManager.addContextMetadata(contextId, 
            Map.of("identifiedTrend", "Increasing cloud infrastructure costs"));
        
        // Segunda interação - usando o mesmo contexto
        McpResponse response2 = client.sendPrompt(
            "What's driving the increase in cloud infrastructure costs?",
            contextId
        );
        
        System.out.println("Second response: " + response2.getGeneratedText());
        
        // 4. Gerar um resumo da sessão de análise
        McpResponse summaryResponse = client.sendPrompt(
            "Summarize our analysis of the technology division financials in 3-5 key points",
            contextId
        );
        
        // Armazenar o resumo nos metadados do contexto
        contextManager.addContextMetadata(contextId, 
            Map.of("analysisSummary", summaryResponse.getGeneratedText()));
            
        // Obter informação atualizada do contexto
        RootContext updatedContext = contextManager.getRootContext(contextId);
        
        System.out.println("Context Information:");
        System.out.println("- Created: " + updatedContext.getCreatedAt());
        System.out.println("- Last Updated: " + updatedContext.getLastUpdatedAt());
        System.out.println("- Analysis Summary: " + 
            updatedContext.getMetadata().get("analysisSummary"));
            
        // 5. Arquivar o contexto quando terminado
        contextManager.archiveContext(contextId);
        System.out.println("Context archived");
    }
}
```

No código anterior, nós:

1. Criámos um contexto raiz para uma sessão de análise financeira.
2. Enviámos múltiplas mensagens dentro desse contexto, permitindo ao modelo manter estado.
3. Atualizámos o contexto com metadados relevantes com base na conversa.
4. Gerámos um sumário da sessão de análise e guardámo-lo nos metadados do contexto.
5. Arquivámos o contexto quando a conversa terminou.

## Exemplo: Gestão de Contexto Raiz

Gerir contextos raiz de forma eficaz é crucial para manter o histórico e o estado da conversa. Abaixo está um exemplo de como implementar a gestão de contexto raiz.

### Implementação em JavaScript

```javascript
// Exemplo de JavaScript: Gestão de Contextos Raiz MCP
const { McpClient, RootContextManager } = require('@mcp/client');

class ContextSession {
  constructor(serverUrl, apiKey = null) {
    // Inicializar o cliente MCP
    this.client = new McpClient({
      serverUrl,
      apiKey
    });
    
    // Inicializar o gestor de contexto
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
      // Enviar a mensagem usando o contexto especificado
      const response = await this.client.sendPrompt(message, {
        rootContextId: contextId,
        temperature: options.temperature || 0.7,
        allowedTools: options.allowedTools || []
      });
      
      // Opcionalmente armazenar insights importantes da conversa
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
      // Extrair potenciais insights (num aplicação real, isto seria mais sofisticado)
      const combinedText = userMessage + "\n" + aiResponse;
      
      // Heurística simples para identificar potenciais insights
      const insightWords = ["important", "key point", "remember", "significant", "crucial"];
      
      const potentialInsights = combinedText
        .split(".")
        .filter(sentence => 
          insightWords.some(word => sentence.toLowerCase().includes(word))
        )
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 10);
      
      // Armazenar insights nos metadados do contexto
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
      // Erro não crítico, por isso apenas registar aviso
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
      // Pedir ao modelo para gerar um resumo da conversa até agora
      const response = await this.client.sendPrompt(
        "Please summarize our conversation so far in 3-4 sentences, highlighting the main points discussed.",
        { rootContextId: contextId, temperature: 0.3 }
      );
      
      // Armazenar o resumo nos metadados do contexto
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
      // Gerar um resumo final antes de arquivar
      const summary = await this.generateContextSummary(contextId);
      
      // Arquivar o contexto
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

// Exemplo de utilização
async function demonstrateContextSession() {
  const session = new ContextSession('https://mcp-server-example.com');
  
  try {
    // 1. Criar um novo contexto para uma conversa de suporte a produto
    const contextId = await session.createConversationContext(
      'Product Support - Database Performance',
      {
        customer: 'Globex Corporation',
        product: 'Enterprise Database',
        severity: 'Medium',
        supportAgent: 'AI Assistant'
      }
    );
    
    // 2. Primeira mensagem na conversa
    const response1 = await session.sendMessage(
      contextId,
      "I'm experiencing slow query performance on our database cluster after the latest update.",
      { storeInsights: true }
    );
    console.log('Response 1:', response1.message);
    
    // Mensagem de seguimento no mesmo contexto
    const response2 = await session.sendMessage(
      contextId,
      "Yes, we've already checked the indexes and they seem to be properly configured.",
      { storeInsights: true }
    );
    console.log('Response 2:', response2.message);
    
    // 3. Obter informações sobre o contexto
    const contextInfo = await session.getContextInfo(contextId);
    console.log('Context Information:', contextInfo);
    
    // 4. Gerar e mostrar o resumo da conversa
    const summary = await session.generateContextSummary(contextId);
    console.log('Conversation Summary:', summary);
    
    // 5. Arquivar o contexto quando terminado
    const archiveResult = await session.archiveContext(contextId);
    console.log('Archive Result:', archiveResult);
    
    // 6. Lidar com quaisquer erros de forma graciosa
  } catch (error) {
    console.error('Error in context session demonstration:', error);
  }
}

demonstrateContextSession();
```

No código anterior, nós:

1. Criámos um contexto raiz para uma conversa de suporte a produto com a função `createConversationContext`. Neste caso, o contexto é sobre problemas de desempenho da base de dados.

1. Enviámos múltiplas mensagens dentro desse contexto, permitindo ao modelo manter estado com a função `sendMessage`. As mensagens enviadas são sobre desempenho lento de consultas e configuração de índices.

1. Atualizámos o contexto com metadados relevantes com base na conversa.

1. Gerámos um sumário da conversa e armazenámo-lo nos metadados do contexto com a função `generateContextSummary`.

1. Arquivámos o contexto quando a conversa terminou com a função `archiveContext`.

1. Tratámos erros de forma elegante para garantir robustez.

## Contexto Raiz para Assistência Multi-Turno

Neste exemplo, vamos criar um contexto raiz para uma sessão de assistência multi-turno, demonstrando como manter estado através de múltiplas interações.

### Implementação em Python

```python
# Exemplo em Python: Contexto Raiz para Assistência Multi-Turnos
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
        
        # Adicionar informações do utilizador se fornecidas
        if user_info:
            metadata.update({f"user_{k}": v for k, v in user_info.items()})
            
        # Criar o contexto raiz
        context = await self.context_manager.create_root_context(name, metadata)
        return context.id
    
    async def send_message(self, context_id, message, tools=None):
        """Send a message within a root context"""
        # Criar opções com ID do contexto
        options = {
            "root_context_id": context_id
        }
        
        # Adicionar ferramentas se especificadas
        if tools:
            options["allowed_tools"] = tools
        
        # Enviar o prompt dentro do contexto
        response = await self.client.send_prompt(message, options)
        
        # Atualizar metadados do contexto com o progresso da conversa
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
        # Gerar primeiro um prompt de resumo
        summary_response = await self.client.send_prompt(
            "Please summarize our conversation and any key points or decisions made.",
            {"root_context_id": context_id}
        )
        
        # Armazenar o resumo nos metadados
        await self.context_manager.update_context_metadata(
            context_id,
            {
                "summary": summary_response.generated_text,
                "ended_at": datetime.now().isoformat(),
                "status": "completed"
            }
        )
        
        # Arquivar o contexto
        await self.context_manager.archive_context(context_id)
        
        return {
            "status": "completed",
            "summary": summary_response.generated_text
        }

# Exemplo de uso
async def demo_assistant_session():
    assistant = AssistantSession("https://mcp-server-example.com")
    
    # 1. Criar sessão
    context_id = await assistant.create_session(
        "Technical Support Session",
        {"name": "Alex", "technical_level": "advanced", "product": "Cloud Services"}
    )
    print(f"Created session with context ID: {context_id}")
    
    # 2. Primeira interação
    response1 = await assistant.send_message(
        context_id, 
        "I'm having trouble with the auto-scaling feature in your cloud platform.",
        ["documentation_search", "diagnostic_tool"]
    )
    print(f"Response 1: {response1.generated_text}")
    
    # Segunda interação no mesmo contexto
    response2 = await assistant.send_message(
        context_id,
        "Yes, I've already checked the configuration settings you mentioned, but it's still not working."
    )
    print(f"Response 2: {response2.generated_text}")
    
    # 3. Obter histórico
    history = await assistant.get_conversation_history(context_id)
    print(f"Session has {len(history['messages'])} messages")
    
    # 4. Terminar sessão
    end_result = await assistant.end_session(context_id)
    print(f"Session ended with summary: {end_result['summary']}")

if __name__ == "__main__":
    asyncio.run(demo_assistant_session())
```

No código anterior, nós:

1. Criámos um contexto raiz para uma sessão de suporte técnico com a função `create_session`. O contexto inclui informação do utilizador como nome e nível técnico.

1. Enviámos múltiplas mensagens dentro desse contexto, permitindo ao modelo manter estado com a função `send_message`. As mensagens enviadas são sobre problemas com a funcionalidade de auto-escalonamento.

1. Recuperámos histórico da conversa usando a função `get_conversation_history`, que fornece informação do contexto e mensagens.

1. Terminámos a sessão arquivando o contexto e gerando um sumário com a função `end_session`. O sumário capta os pontos-chave da conversa.

## Melhores Práticas para Contextos Raiz

Aqui estão algumas melhores práticas para gerir contextos raiz de forma eficaz:

- **Criar Contextos Focados**: Crie contextos raiz separados para diferentes propósitos ou domínios da conversa para manter a clareza.

- **Definir Políticas de Expiração**: Implemente políticas para arquivar ou eliminar contextos antigos para gerir o armazenamento e cumprir políticas de retenção de dados.

- **Guardar Metadados Relevantes**: Use os metadados do contexto para armazenar informação importante sobre a conversa que possa ser útil depois.

- **Usar IDs de Contexto Consistentemente**: Uma vez criado um contexto, utilize o seu ID consistentemente para todos os pedidos relacionados para manter a continuidade.

- **Gerar Sumários**: Quando um contexto cresce muito, considere gerar sumários para capturar informações essenciais enquanto gere o tamanho do contexto.

- **Implementar Controlo de Acesso**: Para sistemas multiutilizador, implemente controles de acesso apropriados para garantir a privacidade e segurança dos contextos de conversa.

- **Lidar com Limitações do Contexto**: Esteja ciente das limitações de tamanho do contexto e implemente estratégias para lidar com conversas muito longas.

- **Arquivar Quando Completo**: Arquive contextos quando as conversas estiverem completas para libertar recursos enquanto preserva o histórico da conversa.

## O que vem a seguir

- [5.5 Roteamento](../mcp-routing/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->