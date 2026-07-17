> [OBSOLETO: CANDIDATO A LANÇAMENTO 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Contextos Raiz do MCP

> **Aviso de descontinuação:** o candidato a lançamento da especificação MCP `2026-07-28` marca as Raízes como obsoletas em favor de parâmetros de ferramentas, URIs de recursos ou configuração do servidor. As raízes continuam funcionando em `2025-11-25` e por pelo menos um ano após qualquer descontinuação formal, portanto tudo nesta lição permanece válido - mas novos designs de servidor devem avaliar o padrão de substituição. Veja [O que está mudando no MCP: O Candidato a Lançamento 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Contextos raiz são um conceito fundamental no Model Context Protocol que fornecem uma camada persistente para manter o histórico da conversa e o estado compartilhado através de múltiplas requisições e sessões.

## Introdução

Nesta lição, exploraremos como criar, gerenciar e utilizar contextos raiz no MCP. 

## Objetivos de Aprendizagem

Ao final desta lição, você será capaz de:

- Entender o propósito e a estrutura dos contextos raiz
- Criar e gerenciar contextos raiz usando bibliotecas cliente MCP
- Implementar contextos raiz em aplicações .NET, Java, JavaScript e Python
- Utilizar contextos raiz para conversas multi-turnos e gerenciamento de estado
- Implementar as melhores práticas para gerenciamento de contextos raiz

## Entendendo os Contextos Raiz

Contextos raiz funcionam como contêineres que guardam o histórico e o estado para uma série de interações relacionadas. Eles permitem:

- **Persistência da Conversa**: Manter conversas coerentes multi-turnos
- **Gerenciamento de Memória**: Armazenar e recuperar informações entre interações
- **Gerenciamento de Estado**: Rastrear progresso em fluxos de trabalho complexos
- **Compartilhamento de Contexto**: Permitir que múltiplos clientes acessem o mesmo estado da conversa

No MCP, contextos raiz possuem essas características principais:

- Cada contexto raiz possui um identificador único.
- Podem conter histórico da conversa, preferências do usuário e outros metadados.
- Podem ser criados, acessados e arquivados conforme necessário.
- Suportam controle de acesso e permissões detalhadas.

## Ciclo de Vida do Contexto Raiz

```mermaid
flowchart TD
    A[Criar Contexto Raiz] --> B[Inicializar com Metadados]
    B --> C[Enviar Solicitações com ID de Contexto]
    C --> D[Atualizar Contexto com Resultados]
    D --> C
    D --> E[Arquivar Contexto Quando Completo]
```

## Trabalhando com Contextos Raiz

Aqui está um exemplo de como criar e gerenciar contextos raiz. 

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

No código acima nós:

1. Criamos um contexto raiz para uma sessão de suporte ao cliente.
1. Enviamos múltiplas mensagens dentro desse contexto, permitindo que o modelo mantenha o estado.
1. Atualizamos o contexto com metadados relevantes baseados na conversa.
1. Recuperamos informações do contexto para entender o histórico da conversa.
1. Arquivamos o contexto quando a conversa foi concluída.

## Exemplo: Implementação de Contexto Raiz para análise financeira

Neste exemplo, criaremos um contexto raiz para uma sessão de análise financeira, demonstrando como manter o estado através de múltiplas interações.

### Implementação em Java

```java
// Exemplo em Java: Implementação do Contexto Raiz
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
        // Criar metadados do contexto
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
        
        // 3. Atualizar o contexto com informações importantes obtidas da resposta
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
            
        // Obter informações atualizadas do contexto
        RootContext updatedContext = contextManager.getRootContext(contextId);
        
        System.out.println("Context Information:");
        System.out.println("- Created: " + updatedContext.getCreatedAt());
        System.out.println("- Last Updated: " + updatedContext.getLastUpdatedAt());
        System.out.println("- Analysis Summary: " + 
            updatedContext.getMetadata().get("analysisSummary"));
            
        // 5. Arquivar o contexto ao finalizar
        contextManager.archiveContext(contextId);
        System.out.println("Context archived");
    }
}
```

No código acima, nós:

1. Criamos um contexto raiz para uma sessão de análise financeira.
2. Enviamos múltiplas mensagens dentro desse contexto, permitindo que o modelo mantenha o estado.
3. Atualizamos o contexto com metadados relevantes baseados na conversa.
4. Geramos um resumo da sessão de análise e o armazenamos nos metadados do contexto.
5. Arquivamos o contexto quando a conversa foi concluída.

## Exemplo: Gerenciamento de Contexto Raiz

Gerenciar contextos raiz efetivamente é crucial para manter o histórico e estado da conversa. Abaixo está um exemplo de como implementar o gerenciamento de contexto raiz.

### Implementação em JavaScript

```javascript
// Exemplo JavaScript: Gerenciando Contextos Raiz MCP
const { McpClient, RootContextManager } = require('@mcp/client');

class ContextSession {
  constructor(serverUrl, apiKey = null) {
    // Inicializar o cliente MCP
    this.client = new McpClient({
      serverUrl,
      apiKey
    });
    
    // Inicializar o gerenciador de contexto
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
      // Extrair potenciais insights (em um app real, isso seria mais sofisticado)
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
      // Erro não crítico, então apenas registrar o aviso
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

// Exemplo de uso
async function demonstrateContextSession() {
  const session = new ContextSession('https://mcp-server-example.com');
  
  try {
    // 1. Criar um novo contexto para uma conversa de suporte ao produto
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
    
    // Mensagem de acompanhamento no mesmo contexto
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
    
    // 5. Arquivar o contexto quando terminar
    const archiveResult = await session.archiveContext(contextId);
    console.log('Archive Result:', archiveResult);
    
    // 6. Lidar com quaisquer erros de forma elegante
  } catch (error) {
    console.error('Error in context session demonstration:', error);
  }
}

demonstrateContextSession();
```

No código acima nós:

1. Criamos um contexto raiz para uma conversa de suporte ao produto com a função `createConversationContext`. Neste caso, o contexto é sobre problemas de desempenho do banco de dados.

1. Enviamos múltiplas mensagens dentro desse contexto, permitindo que o modelo mantenha estado com a função `sendMessage`. As mensagens enviadas são sobre desempenho lento de consultas e configuração de índice.

1. Atualizamos o contexto com metadados relevantes baseados na conversa.

1. Geramos um resumo da conversa e armazenamos nos metadados do contexto com a função `generateContextSummary`.

1. Arquivamos o contexto quando a conversa foi concluída com a função `archiveContext`.

1. Tratamos erros de forma elegante para garantir robustez.

## Contexto Raiz para Assistência Multi-turno

Neste exemplo, criaremos um contexto raiz para uma sessão de assistência multi-turno, demonstrando como manter o estado através de múltiplas interações.

### Implementação em Python

```python
# Exemplo em Python: Contexto Raiz para Assistência Multi-Turno
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
        
        # Adicione informações do usuário se fornecidas
        if user_info:
            metadata.update({f"user_{k}": v for k, v in user_info.items()})
            
        # Crie o contexto raiz
        context = await self.context_manager.create_root_context(name, metadata)
        return context.id
    
    async def send_message(self, context_id, message, tools=None):
        """Send a message within a root context"""
        # Crie opções com ID do contexto
        options = {
            "root_context_id": context_id
        }
        
        # Adicione ferramentas se especificadas
        if tools:
            options["allowed_tools"] = tools
        
        # Envie o prompt dentro do contexto
        response = await self.client.send_prompt(message, options)
        
        # Atualize os metadados do contexto com o progresso da conversa
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
        # Gere um prompt de resumo primeiro
        summary_response = await self.client.send_prompt(
            "Please summarize our conversation and any key points or decisions made.",
            {"root_context_id": context_id}
        )
        
        # Armazene o resumo nos metadados
        await self.context_manager.update_context_metadata(
            context_id,
            {
                "summary": summary_response.generated_text,
                "ended_at": datetime.now().isoformat(),
                "status": "completed"
            }
        )
        
        # Arquive o contexto
        await self.context_manager.archive_context(context_id)
        
        return {
            "status": "completed",
            "summary": summary_response.generated_text
        }

# Exemplo de uso
async def demo_assistant_session():
    assistant = AssistantSession("https://mcp-server-example.com")
    
    # 1. Crie a sessão
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
    
    # 3. Obtenha o histórico
    history = await assistant.get_conversation_history(context_id)
    print(f"Session has {len(history['messages'])} messages")
    
    # 4. Encerre a sessão
    end_result = await assistant.end_session(context_id)
    print(f"Session ended with summary: {end_result['summary']}")

if __name__ == "__main__":
    asyncio.run(demo_assistant_session())
```

No código acima nós:

1. Criamos um contexto raiz para uma sessão de suporte técnico com a função `create_session`. O contexto inclui informações do usuário como nome e nível técnico.

1. Enviamos múltiplas mensagens dentro desse contexto, permitindo que o modelo mantenha o estado com a função `send_message`. As mensagens enviadas são sobre problemas com o recurso de auto-escalonamento.

1. Recuperamos o histórico da conversa usando a função `get_conversation_history`, que fornece informações do contexto e mensagens.

1. Encerramos a sessão arquivando o contexto e gerando um resumo com a função `end_session`. O resumo captura os pontos principais da conversa.

## Melhores Práticas para Contexto Raiz

Aqui estão algumas melhores práticas para gerenciar contextos raiz efetivamente:

- **Criar Contextos Focados**: Crie contextos raiz separados para diferentes propósitos ou domínios da conversa para manter clareza.

- **Definir Políticas de Expiração**: Implemente políticas para arquivar ou deletar contextos antigos para gerenciar armazenamento e cumprir políticas de retenção de dados.

- **Armazenar Metadados Relevantes**: Use metadados do contexto para armazenar informações importantes sobre a conversa que possam ser úteis no futuro.

- **Usar IDs de Contexto Consistentemente**: Uma vez criado um contexto, use seu ID consistentemente para todas as solicitações relacionadas para manter continuidade.

- **Gerar Resumos**: Quando um contexto crescer muito, considere gerar resumos para capturar informações essenciais ao mesmo tempo em que gerencia o tamanho do contexto.

- **Implementar Controle de Acesso**: Para sistemas multi-usuário, implemente controles adequados para garantir privacidade e segurança dos contextos das conversas.

- **Lidar com Limitações de Contexto**: Esteja ciente das limitações do tamanho do contexto e implemente estratégias para lidar com conversas muito longas.

- **Arquivar Quando Concluído**: Arquive contextos quando as conversas forem concluídas para liberar recursos ao mesmo tempo em que preserva o histórico da conversa.

## O que vem a seguir

- [5.5 Roteamento](../mcp-routing/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->