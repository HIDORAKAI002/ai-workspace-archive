# Streaming HTTPS com Model Context Protocol (MCP)

Este capítulo oferece um guia abrangente para implementar streaming seguro, escalável e em tempo real com o Model Context Protocol (MCP) usando HTTPS. Cobre a motivação para streaming, os mecanismos de transporte disponíveis, como implementar HTTP com suporte a streaming no MCP, melhores práticas de segurança, migração do SSE e orientações práticas para construir suas próprias aplicações de streaming MCP.

> **Olhando para frente:** esta lição descreve o HTTP com suporte a streaming sob a **Especificação MCP 2025-11-25**, onde uma sessão é estabelecida durante `initialize` e fixada com um cabeçalho `Mcp-Session-Id`. A versão candidata a lançamento `2026-07-28` remove completamente a negociação inicial e o ID da sessão, tornando cada requisição autocontida e roteável para qualquer instância do servidor sem sessões fixas. Veja [O que está mudando no MCP: o release candidate 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para detalhes.

## Mecanismos de Transporte e Streaming no MCP

Esta seção explora os diferentes mecanismos de transporte disponíveis no MCP e seu papel em habilitar recursos de streaming para comunicação em tempo real entre clientes e servidores.

### O que é um Mecanismo de Transporte?

Um mecanismo de transporte define como os dados são trocados entre o cliente e o servidor. O MCP suporta múltiplos tipos de transporte para se adequar a diferentes ambientes e requisitos:

- **stdio**: Entrada/saída padrão, adequada para ferramentas locais e baseadas em CLI. Simples, mas não adequada para web ou nuvem.
- **SSE (Server-Sent Events)**: Permite que servidores enviem atualizações em tempo real para clientes via HTTP. Bom para interfaces web, mas limitado em escalabilidade e flexibilidade. A partir da Especificação MCP 2025-06-18, o transporte standalone SSE (Server-Sent Events) foi descontinuado e substituído pelo transporte "Streamable HTTP".
- **Streamable HTTP**: Transporte de streaming moderno baseado em HTTP, suportando notificações e melhor escalabilidade. Recomendado para a maioria dos cenários de produção e cloud.

### Tabela Comparativa

Veja a tabela comparativa abaixo para entender as diferenças entre esses mecanismos de transporte:

| Transporte        | Atualizações em Tempo Real | Streaming | Escalabilidade | Caso de Uso             |
|------------------|----------------------------|-----------|---------------|------------------------|
| stdio            | Não                        | Não       | Baixa         | Ferramentas CLI Locais  |
| SSE              | Sim                        | Sim       | Média         | Web, atualizações em tempo real |
| Streamable HTTP  | Sim                        | Sim       | Alta          | Cloud, multi-clientes   |

> **Dica:** A escolha do transporte certo impacta o desempenho, a escalabilidade e a experiência do usuário. **Streamable HTTP** é recomendado para aplicações modernas, escaláveis e prontas para cloud.

Observe os transportes stdio e SSE que foram mostrados nos capítulos anteriores e como o streamable HTTP é o transporte abordado neste capítulo.

## Streaming: Conceitos e Motivação

Compreender os conceitos fundamentais e as motivações por trás do streaming é essencial para implementar sistemas eficazes de comunicação em tempo real.

**Streaming** é uma técnica na programação de redes que permite que os dados sejam enviados e recebidos em pequenos pedaços gerenciáveis ou como uma sequência de eventos, em vez de esperar que uma resposta inteira esteja pronta. Isso é especialmente útil para:

- Arquivos ou conjuntos de dados grandes.
- Atualizações em tempo real (ex: chat, barras de progresso).
- Computações de longa duração onde se deseja manter o usuário informado.

Eis o que você precisa saber sobre streaming em alto nível:

- Os dados são entregues progressivamente, não todos de uma vez.
- O cliente pode processar os dados conforme eles chegam.
- Reduz a latência percebida e melhora a experiência do usuário.

### Por que usar streaming?

Os motivos para usar streaming são os seguintes:

- Os usuários recebem feedback imediatamente, não apenas ao final.
- Permite aplicações em tempo real e interfaces responsivas.
- Uso mais eficiente dos recursos de rede e computação.

### Exemplo Simples: Servidor e Cliente HTTP Streaming

Aqui está um exemplo simples de como o streaming pode ser implementado:

#### Python

**Servidor (Python, usando FastAPI e StreamingResponse):**

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time

app = FastAPI()

async def event_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)

@app.get("/stream")
def stream():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**Cliente (Python, usando requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Este exemplo demonstra um servidor enviando uma série de mensagens para o cliente conforme elas ficam disponíveis, ao invés de esperar que todas as mensagens estejam prontas.

**Como funciona:**

- O servidor libera cada mensagem conforme ela estiver pronta.
- O cliente recebe e imprime cada pedaço conforme ele chega.

**Requisitos:**

- O servidor deve usar uma resposta de streaming (ex: `StreamingResponse` no FastAPI).
- O cliente deve processar a resposta como uma stream (`stream=True` no requests).
- O Content-Type geralmente é `text/event-stream` ou `application/octet-stream`.

#### Java

**Servidor (Java, usando Spring Boot e Server-Sent Events):**

```java
@RestController
public class CalculatorController {

    @GetMapping(value = "/calculate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> calculate(@RequestParam double a,
                                                   @RequestParam double b,
                                                   @RequestParam String op) {
        
        double result;
        switch (op) {
            case "add": result = a + b; break;
            case "sub": result = a - b; break;
            case "mul": result = a * b; break;
            case "div": result = b != 0 ? a / b : Double.NaN; break;
            default: result = Double.NaN;
        }

        return Flux.<ServerSentEvent<String>>just(
                    ServerSentEvent.<String>builder()
                        .event("info")
                        .data("Calculating: " + a + " " + op + " " + b)
                        .build(),
                    ServerSentEvent.<String>builder()
                        .event("result")
                        .data(String.valueOf(result))
                        .build()
                )
                .delayElements(Duration.ofSeconds(1));
    }
}
```

**Cliente (Java, usando Spring WebFlux WebClient):**

```java
@SpringBootApplication
public class CalculatorClientApplication implements CommandLineRunner {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:8080")
            .build();

    @Override
    public void run(String... args) {
        client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/calculate")
                        .queryParam("a", 7)
                        .queryParam("b", 5)
                        .queryParam("op", "mul")
                        .build())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(System.out::println)
                .blockLast();
    }
}
```

**Notas sobre a Implementação Java:**

- Utiliza a pilha reativa do Spring Boot com `Flux` para streaming
- `ServerSentEvent` fornece streaming estruturado de eventos com tipos de eventos
- `WebClient` com `bodyToFlux()` permite consumo reativo de streaming
- `delayElements()` simula tempo de processamento entre eventos
- Eventos podem ter tipos (`info`, `result`) para melhor tratamento no cliente

### Comparação: Streaming Clássico vs Streaming MCP

As diferenças entre como o streaming funciona de forma "clássica" versus como funciona em MCP podem ser ilustradas assim:

| Característica        | Streaming HTTP Clássico          | Streaming MCP (Notificações)        |
|-----------------------|---------------------------------|-------------------------------------|
| Resposta principal    | Fragmentada (chunked)            | Única, no final                     |
| Atualizações de progresso | Enviadas como pedaços de dados | Enviadas como notificações          |
| Requisitos do cliente | Deve processar a stream          | Deve implementar handler de mensagens |
| Caso de uso           | Arquivos grandes, streams de tokens AI | Progresso, logs, feedback em tempo real |

### Diferenças Chave Observadas

Além disso, aqui estão algumas diferenças principais:

- **Padrão de Comunicação:**
  - Streaming HTTP clássico: Usa encoding de transferência chunked simples para enviar dados em pedaços
  - Streaming MCP: Usa um sistema estruturado de notificações com protocolo JSON-RPC

- **Formato da Mensagem:**
  - HTTP clássico: Pedaços de texto simples com quebras de linha
  - MCP: Objetos estruturados LoggingMessageNotification com metadados

- **Implementação do Cliente:**
  - HTTP clássico: Cliente simples que processa respostas streaming
  - MCP: Cliente mais sofisticado com handler de mensagens para processar diferentes tipos de mensagens

- **Atualizações de Progresso:**
  - HTTP clássico: O progresso faz parte da stream de resposta principal
  - MCP: Progresso é enviado via mensagens de notificação separadas enquanto o resultado principal vem no final

### Recomendações

Há algumas coisas que recomendamos quando se trata de escolher entre implementar streaming clássico (como o endpoint mostrado acima usando `/stream`) versus escolher streaming via MCP.

- **Para necessidades simples de streaming:** O streaming HTTP clássico é mais simples de implementar e suficiente para necessidades básicas de streaming.

- **Para aplicações complexas e interativas:** O streaming MCP fornece uma abordagem mais estruturada com metadados enriquecidos e separação entre notificações e resultados finais.

- **Para aplicações AI:** O sistema de notificações do MCP é particularmente útil para tarefas AI de longa duração onde você quer manter os usuários informados do progresso.

## Streaming no MCP

Ok, você já viu algumas recomendações e comparações até agora sobre a diferença entre streaming clássico e streaming no MCP. Vamos entrar em detalhes exatamente como você pode aproveitar o streaming no MCP.

Compreender como o streaming funciona dentro do framework MCP é essencial para construir aplicações responsivas que forneçam feedback em tempo real aos usuários durante operações de longa duração.

No MCP, streaming não é sobre enviar a resposta principal em pedaços, mas sim sobre enviar **notificações** para o cliente enquanto uma ferramenta está processando uma requisição. Essas notificações podem incluir atualizações de progresso, logs ou outros eventos.

### Como funciona

O resultado principal ainda é enviado como uma única resposta. Porém, notificações podem ser enviadas como mensagens separadas durante o processamento e assim atualizar o cliente em tempo real. O cliente deve ser capaz de tratar e exibir essas notificações.

## O que é uma Notificação?

Falamos "Notificação", o que isso significa no contexto do MCP?

Uma notificação é uma mensagem enviada do servidor para o cliente para informar sobre progresso, estado ou outros eventos durante uma operação de longa duração. As notificações melhoram a transparência e a experiência do usuário.

Por exemplo, um cliente deve enviar uma notificação assim que a negociação inicial com o servidor foi feita.

Uma notificação se parece assim como mensagem JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notificações pertencem a um tópico no MCP referido como ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Para fazer o logging funcionar, o servidor precisa habilitá-lo como uma feature/capacidade assim:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Dependendo do SDK usado, o logging pode estar habilitado por padrão, ou você pode precisar ativá-lo explicitamente na configuração do servidor.

Existem diferentes tipos de notificações:

| Nível      | Descrição                      | Exemplo de Uso                 |
|------------|-------------------------------|-------------------------------|
| debug      | Informações detalhadas para depuração | Pontos de entrada/saída de funções |
| info       | Mensagens informativas gerais | Atualizações de progresso da operação |
| notice     | Eventos normais porém significativos | Alterações de configuração      |
| warning    | Condições de aviso            | Uso de recursos depreciados    |
| error      | Condições de erro             | Falhas na operação              |
| critical   | Condições críticas            | Falhas de componentes do sistema |
| alert      | Ação deve ser tomada imediatamente | Detecção de corrupção de dados |
| emergency  | Sistema está inutilizável      | Falha completa do sistema       |

## Implementando Notificações no MCP

Para implementar notificações no MCP, você precisa configurar ambos os lados, servidor e cliente, para tratar atualizações em tempo real. Isso permite que sua aplicação forneça feedback imediato aos usuários durante operações longas.

### Lado do Servidor: Enviando Notificações

Vamos começar pelo lado do servidor. No MCP, você define ferramentas que podem enviar notificações enquanto processam requisições. O servidor usa o objeto de contexto (geralmente `ctx`) para enviar mensagens ao cliente.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

No exemplo acima, a ferramenta `process_files` envia três notificações ao cliente enquanto processa cada arquivo. O método `ctx.info()` é usado para enviar mensagens informativas.

Além disso, para habilitar notificações, assegure que seu servidor usa um transporte streaming (como `streamable-http`) e que seu cliente implemente um handler de mensagens para processar notificações. Veja como configurar o servidor para usar o transporte `streamable-http`:

```python
mcp.run(transport="streamable-http")
```

#### .NET

```csharp
[Tool("A tool that sends progress notifications")]
public async Task<TextContent> ProcessFiles(string message, ToolContext ctx)
{
    await ctx.Info("Processing file 1/3...");
    await ctx.Info("Processing file 2/3...");
    await ctx.Info("Processing file 3/3...");
    return new TextContent
    {
        Type = "text",
        Text = $"Done: {message}"
    };
}
```

Neste exemplo .NET, a ferramenta `ProcessFiles` é decorada com o atributo `Tool` e envia três notificações ao cliente enquanto processa cada arquivo. O método `ctx.Info()` é usado para enviar mensagens informativas.

Para habilitar notificações no seu servidor MCP .NET, certifique-se de usar um transporte streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Lado do Cliente: Recebendo Notificações

O cliente deve implementar um handler de mensagens para processar e exibir notificações conforme elas chegam.

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)

async with ClientSession(
   read_stream, 
   write_stream,
   logging_callback=logging_collector,
   message_handler=message_handler,
) as session:
```

No código acima, a função `message_handler` verifica se a mensagem recebida é uma notificação. Se for, imprime a notificação; caso contrário, processa como mensagem normal do servidor. Note também como a `ClientSession` é inicializada com o `message_handler` para tratar notificações recebidas.

#### .NET

```csharp
// Define a message handler
void MessageHandler(IJsonRpcMessage message)
{
    if (message is ServerNotification notification)
    {
        Console.WriteLine($"NOTIFICATION: {notification}");
    }
    else
    {
        Console.WriteLine($"SERVER MESSAGE: {message}");
    }
}

// Create and use a client session with the message handler
var clientOptions = new ClientSessionOptions
{
    MessageHandler = MessageHandler,
    LoggingCallback = (level, message) => Console.WriteLine($"[{level}] {message}")
};

using var client = new ClientSession(readStream, writeStream, clientOptions);
await client.InitializeAsync();

// Now the client will process notifications through the MessageHandler
```

Neste exemplo .NET, a função `MessageHandler` verifica se a mensagem recebida é uma notificação. Se for, imprime a notificação; caso contrário, processa como mensagem normal do servidor. A `ClientSession` é inicializada com o handler via `ClientSessionOptions`.

Para habilitar notificações, assegure que seu servidor use um transporte streaming (como `streamable-http`) e que seu cliente implemente um handler de mensagens para processar notificações.

## Notificações de Progresso & Cenários

Esta seção explica o conceito de notificações de progresso no MCP, por que elas são importantes e como implementá-las usando Streamable HTTP. Você também encontrará uma tarefa prática para reforçar seu aprendizado.

Notificações de progresso são mensagens em tempo real enviadas do servidor para o cliente durante operações longas. Ao invés de esperar o processo inteiro acabar, o servidor mantém o cliente atualizado sobre o status atual. Isso melhora a transparência, experiência do usuário e facilita a depuração.

**Exemplo:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Por que Usar Notificações de Progresso?

As notificações de progresso são essenciais por várias razões:

- **Melhora a experiência do usuário:** Usuários veem atualizações durante o progresso do trabalho, não apenas no final.
- **Feedback em tempo real:** Clientes podem exibir barras de progresso ou logs, tornando a aplicação mais responsiva.
- **Depuração e monitoramento facilitados:** Desenvolvedores e usuários podem ver onde o processo pode estar lento ou travado.

### Como Implementar Notificações de Progresso

Veja como implementar notificações de progresso no MCP:

- **No servidor:** Use `ctx.info()` ou `ctx.log()` para enviar notificações conforme cada item é processado. Isso envia uma mensagem ao cliente antes do resultado principal estar pronto.
- **No cliente:** Implemente um handler de mensagens que escute e exiba notificações conforme chegam. Esse handler distingue entre notificações e resultado final.

**Exemplo do Servidor:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Exemplo do Cliente:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Considerações de Segurança

Ao implementar servidores MCP com transportes baseados em HTTP, a segurança torna-se uma preocupação primordial que requer atenção cuidadosa a múltiplos vetores de ataque e mecanismos de proteção.

### Visão Geral

A segurança é crítica ao expor servidores MCP via HTTP. O Streamable HTTP introduz novas superfícies de ataque e requer configuração cuidadosa.

### Pontos-Chave


- **Validação do Cabeçalho Origin**: Sempre valide o cabeçalho `Origin` para prevenir ataques de rebinding DNS.
- **Vinculação ao Localhost**: Para desenvolvimento local, vincule os servidores ao `localhost` para evitar expô-los na internet pública.
- **Autenticação**: Implemente autenticação (ex: chaves de API, OAuth) para implantações em produção.
- **CORS**: Configure políticas de Compartilhamento de Recursos entre Origens (CORS) para restringir acesso.
- **HTTPS**: Use HTTPS em produção para criptografar o tráfego.

### Melhores Práticas

- Nunca confie em requisições recebidas sem validação.
- Registre e monitore todos os acessos e erros.
- Atualize regularmente as dependências para corrigir vulnerabilidades de segurança.

### Desafios

- Equilibrar segurança com facilidade de desenvolvimento
- Garantir compatibilidade com vários ambientes de clientes

## Atualizando de SSE para Streamable HTTP

Para aplicações que atualmente usam Server-Sent Events (SSE), migrar para Streamable HTTP oferece capacidades aprimoradas e melhor sustentabilidade a longo prazo para suas implementações MCP.

### Por que Atualizar?

Existem duas razões convincentes para atualizar de SSE para Streamable HTTP:

- Streamable HTTP oferece melhor escalabilidade, compatibilidade e suporte a notificações mais rico do que SSE.
- É o transporte recomendado para novas aplicações MCP.

### Etapas da Migração

Veja como você pode migrar de SSE para Streamable HTTP em suas aplicações MCP:

- **Atualize o código do servidor** para usar `transport="streamable-http"` em `mcp.run()`.
- **Atualize o código do cliente** para usar `streamablehttp_client` em vez do cliente SSE.
- **Implemente um manipulador de mensagens** no cliente para processar notificações.
- **Teste a compatibilidade** com ferramentas e fluxos de trabalho existentes.

### Mantendo a Compatibilidade

Recomenda-se manter a compatibilidade com clientes SSE existentes durante o processo de migração. Aqui estão algumas estratégias:

- Você pode suportar ambos SSE e Streamable HTTP executando os dois transportes em diferentes endpoints.
- Migre os clientes gradualmente para o novo transporte.

### Desafios

Garanta que os seguintes desafios sejam abordados durante a migração:

- Garantir que todos os clientes sejam atualizados
- Lidar com diferenças na entrega das notificações

## Considerações de Segurança

A segurança deve ser prioridade máxima ao implementar qualquer servidor, especialmente usando transportes baseados em HTTP como Streamable HTTP no MCP.

Ao implementar servidores MCP com transportes baseados em HTTP, a segurança se torna uma preocupação fundamental que requer atenção cuidadosa a múltiplos vetores de ataque e mecanismos de proteção.

### Visão Geral

A segurança é crítica ao expor servidores MCP via HTTP. Streamable HTTP introduz novas superfícies de ataque e requer configuração cuidadosa.

Aqui estão algumas considerações-chave de segurança:

- **Validação do Cabeçalho Origin**: Sempre valide o cabeçalho `Origin` para prevenir ataques de rebinding DNS.
- **Vinculação ao Localhost**: Para desenvolvimento local, vincule os servidores ao `localhost` para evitar expô-los na internet pública.
- **Autenticação**: Implemente autenticação (ex: chaves de API, OAuth) para implantações em produção.
- **CORS**: Configure políticas de Compartilhamento de Recursos entre Origens (CORS) para restringir acesso.
- **HTTPS**: Use HTTPS em produção para criptografar o tráfego.

### Melhores Práticas

Além disso, aqui estão algumas melhores práticas a seguir ao implementar segurança em seu servidor de streaming MCP:

- Nunca confie em requisições recebidas sem validação.
- Registre e monitore todos os acessos e erros.
- Atualize regularmente as dependências para corrigir vulnerabilidades de segurança.

### Desafios

Você enfrentará alguns desafios ao implementar segurança em servidores de streaming MCP:

- Equilibrar segurança com facilidade de desenvolvimento
- Garantir compatibilidade com vários ambientes de clientes

### Exercício: Construa Seu Próprio App MCP de Streaming

**Cenário:**
Construa um servidor e cliente MCP onde o servidor processa uma lista de itens (ex: arquivos ou documentos) e envia uma notificação para cada item processado. O cliente deve exibir cada notificação conforme ela chega.

**Passos:**

1. Implemente uma ferramenta de servidor que processe uma lista e envie notificações para cada item.
2. Implemente um cliente com um manipulador de mensagens para exibir notificações em tempo real.
3. Teste sua implementação executando servidor e cliente, e observe as notificações.

[Solução](./solution/README.md)

## Leituras Complementares e Próximos Passos

Para continuar sua jornada com streaming MCP e expandir seu conhecimento, esta seção fornece recursos adicionais e próximos passos sugeridos para construir aplicações mais avançadas.

### Leituras Complementares

- [Microsoft: Introdução ao HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS no ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Requisições de Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Próximos Passos

- Experimente construir ferramentas MCP mais avançadas que usem streaming para análises em tempo real, chat ou edição colaborativa.
- Explore a integração do streaming MCP com frameworks frontend (React, Vue, etc.) para atualizações ao vivo da interface.
- Próximo: [Utilizando AI Toolkit para VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->