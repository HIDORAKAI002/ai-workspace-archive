# Streaming HTTPS com o Modelo Contexto Protocolo (MCP)

Este capítulo fornece um guia completo para implementar streaming seguro, escalável e em tempo real com o Modelo Contexto Protocolo (MCP) usando HTTPS. Cobre a motivação para streaming, os mecanismos de transporte disponíveis, como implementar HTTP transmissível no MCP, melhores práticas de segurança, migração a partir de SSE e orientações práticas para construir as suas próprias aplicações MCP com streaming. 

> **Olhar em frente:** esta lição descreve o HTTP Transmissível sob a **Especificação MCP 2025-11-25**, onde uma sessão é estabelecida durante a `initialize` e fixa-se com um cabeçalho `Mcp-Session-Id`. O candidato a lançamento `2026-07-28` remove completamente o handshake e o ID da sessão, tornando cada pedido autónomo e endereçável a qualquer instância do servidor sem sessões fixas. Veja [O que está a mudar no MCP: Candidato a lançamento 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para detalhes.

## Mecanismos de Transporte e Streaming no MCP

Esta secção explora os diferentes mecanismos de transporte disponíveis no MCP e o seu papel em permitir capacidades de streaming para comunicação em tempo real entre clientes e servidores.

### O que é um Mecanismo de Transporte?

Um mecanismo de transporte define como os dados são trocados entre o cliente e o servidor. O MCP suporta múltiplos tipos de transporte para adequar-se a diferentes ambientes e requisitos:

- **stdio**: Entrada/saída padrão, adequado para ferramentas locais e baseadas em CLI. Simples, mas não adequado para web ou cloud.
- **SSE (Server-Sent Events)**: Permite que os servidores enviem atualizações em tempo real para os clientes através de HTTP. Bom para interfaces web, mas limitado em escalabilidade e flexibilidade. Desde a Especificação MCP 2025-06-18, o transporte SSE autocontido foi descontinuado e substituído pelo transporte "HTTP Transmissível".
- **HTTP Transmissível**: Transporte moderno baseado em HTTP para streaming, suportando notificações e melhor escalabilidade. Recomendado para a maioria dos cenários de produção e cloud.

### Tabela Comparativa

Veja a tabela comparativa abaixo para compreender as diferenças entre estes mecanismos de transporte:

| Transporte        | Atualizações em Tempo Real | Streaming | Escalabilidade | Caso de Uso                |
|------------------|----------------------------|-----------|---------------|----------------------------|
| stdio            | Não                        | Não       | Baixa         | Ferramentas CLI locais      |
| SSE              | Sim                        | Sim       | Média         | Web, atualizações em tempo real |
| HTTP Transmissível | Sim                      | Sim       | Alta          | Cloud, multi-cliente       |

> **Dica:** A escolha do transporte certo impacta o desempenho, escalabilidade e a experiência do utilizador. **HTTP Transmissível** é recomendado para aplicações modernas, escaláveis e prontas para cloud.

Note os transportes stdio e SSE que foram mostrados nos capítulos anteriores e como o HTTP transmissível é o transporte abordado neste capítulo.

## Streaming: Conceitos e Motivação

Compreender os conceitos fundamentais e as motivações por trás do streaming é essencial para implementar sistemas de comunicação em tempo real eficazes.

**Streaming** é uma técnica em programação de redes que permite que dados sejam enviados e recebidos em pequenos pedaços geríveis ou como uma sequência de eventos, em vez de esperar que uma resposta inteira esteja pronta. Isto é especialmente útil para:

- Ficheiros grandes ou conjuntos de dados extensos.
- Atualizações em tempo real (ex.: chat, barras de progresso).
- Cálculos de longa duração onde se pretende manter o utilizador informado.

Eis o que precisa de saber sobre streaming a alto nível:

- Dados são entregues progressivamente, não todos de uma vez.
- O cliente pode processar os dados à medida que chegam.
- Reduz a latência percebida e melhora a experiência do utilizador.

### Por que usar streaming?

As razões para usar streaming são as seguintes:

- Os utilizadores recebem feedback imediatamente, não apenas no fim
- Permite aplicações em tempo real e interfaces responsivas
- Uso mais eficiente dos recursos de rede e computação

### Exemplo Simples: Servidor & Cliente HTTP Streaming

Aqui está um exemplo simples de como streaming pode ser implementado:

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

Este exemplo demonstra um servidor a enviar uma série de mensagens ao cliente conforme ficam disponíveis, em vez de esperar que todas as mensagens estejam prontas.

**Como funciona:**

- O servidor produz cada mensagem à medida que está pronta.
- O cliente recebe e imprime cada pedaço à medida que chega.

**Requisitos:**

- O servidor deve usar uma resposta de streaming (ex.: `StreamingResponse` no FastAPI).
- O cliente deve processar a resposta como um stream (`stream=True` nas requests).
- Content-Type normalmente é `text/event-stream` ou `application/octet-stream`.

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

**Notas de implementação Java:**

- Usa a stack reativa do Spring Boot com `Flux` para streaming
- `ServerSentEvent` fornece streaming estruturado de eventos com tipos de evento
- `WebClient` com `bodyToFlux()` permite consumo reativo de streaming
- `delayElements()` simula tempo de processamento entre eventos
- Os eventos podem ter tipos (`info`, `result`) para melhor tratamento no cliente

### Comparação: Streaming Clássico vs Streaming MCP

As diferenças entre como o streaming funciona de forma "clássica" versus como funciona no MCP podem ser representadas assim:

| Característica           | Streaming HTTP Clássico       | Streaming MCP (Notificações)     |
|-------------------------|-------------------------------|---------------------------------|
| Resposta principal      | Segmentada                    | Única, no fim                   |
| Atualizações de progresso | Enviadas como pedaços de dados | Enviadas como notificações       |
| Requisitos do cliente   | Deve processar o stream       | Deve implementar manipulador de mensagens |
| Caso de uso             | Ficheiros grandes, streams de tokens de IA | Progresso, logs, feedback em tempo real |

### Diferenças-chave observadas

Adicionalmente, aqui estão algumas diferenças chave:

- **Padrão de Comunicação:**
  - Streaming HTTP clássico: Usa codificação simples chunked para enviar dados em pedaços
  - Streaming MCP: Usa um sistema estruturado de notificações com protocolo JSON-RPC

- **Formato da Mensagem:**
  - HTTP clássico: Pedaços de texto normal com novas linhas
  - MCP: Objetos estruturados LoggingMessageNotification com metadados

- **Implementação do Cliente:**
  - HTTP clássico: Cliente simples que processa respostas em streaming
  - MCP: Cliente mais sofisticado com manipulador de mensagens para processar diferentes tipos de mensagens

- **Atualizações de Progresso:**
  - HTTP clássico: O progresso é parte do fluxo principal de resposta
  - MCP: Progresso é enviado via mensagens de notificação separadas enquanto a resposta principal chega no fim

### Recomendações

Existem algumas coisas que recomendamos quanto à escolha entre implementar streaming clássico (como um endpoint que mostramos acima usando `/stream`) versus escolher streaming via MCP.

- **Para necessidades simples de streaming:** O streaming HTTP clássico é mais simples de implementar e suficiente para necessidades básicas de streaming.

- **Para aplicações complexas e interativas:** O streaming MCP oferece uma abordagem mais estruturada com metadados ricos e separação entre notificações e resultados finais.

- **Para aplicações de IA:** O sistema de notificações do MCP é particularmente útil para tarefas de IA longas onde se pretende manter os utilizadores informados sobre o progresso.

## Streaming no MCP

Ok, já viu algumas recomendações e comparações até agora sobre a diferença entre streaming clássico e streaming no MCP. Vamos entrar em detalhe em como pode aproveitar o streaming no MCP.

Compreender como o streaming funciona dentro do quadro MCP é essencial para construir aplicações responsivas que fornecem feedback em tempo real aos utilizadores durante operações longas.

No MCP, streaming não é sobre enviar a resposta principal em pedaços, mas sim sobre enviar **notificações** para o cliente enquanto uma ferramenta está a processar um pedido. Essas notificações podem incluir atualizações de progresso, logs ou outros eventos.

### Como funciona

O resultado principal ainda é enviado como uma única resposta. No entanto, notificações podem ser enviadas como mensagens separadas durante o processamento, atualizando assim o cliente em tempo real. O cliente deve ser capaz de tratar e exibir essas notificações.

## O que é uma Notificação?

Dissemos "Notificação", o que isso significa no contexto do MCP?

Uma notificação é uma mensagem enviada do servidor para o cliente para informar sobre progresso, estado ou outros eventos durante uma operação demorada. As notificações melhoram a transparência e a experiência do utilizador.

Por exemplo, espera-se que um cliente envie uma notificação uma vez que o handshake inicial com o servidor tenha sido feito.

Uma notificação parece assim como uma mensagem JSON:

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

> **Aviso de descontinuação:** o candidato a lançamento da especificação MCP `2026-07-28` marca a primitiva Logging como obsoleta em favor do `stderr` para transportes stdio e OpenTelemetry para observabilidade estruturada. Logging continuará a funcionar em `2025-11-25` e por pelo menos um ano após qualquer descontinuação formal. Veja [O que está a mudar no MCP: Candidato a lançamento 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Para fazer o logging funcionar, o servidor precisa de o ativar como uma funcionalidade/capacidade assim:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Dependendo do SDK usado, o logging poderá estar ativado por defeito, ou poderá precisar ativar explicitamente na configuração do servidor.

Existem diferentes tipos de notificações:

| Nível     | Descrição                     | Exemplo de Caso de Uso          |
|-----------|-------------------------------|--------------------------------|
| debug     | Informação detalhada de depuração | Pontos de entrada/saída de funções |
| info      | Mensagens informativas gerais | Atualizações de progresso de operação |
| notice    | Eventos normais, mas significativos | Alterações de configuração     |
| warning   | Condições de aviso             | Uso de funcionalidade obsoleta |
| error     | Condições de erro              | Falhas de operação             |
| critical  | Condições críticas             | Falhas de componentes do sistema |
| alert     | Ação deve ser tomada imediatamente | Detecção de corrupção de dados |
| emergency | Sistema inutilizável           | Falha completa do sistema      |

## Implementação de Notificações no MCP

Para implementar notificações no MCP, precisa configurar tanto o lado servidor como o lado cliente para tratar de atualizações em tempo real. Isso permite que a sua aplicação forneça feedback imediato aos utilizadores durante operações longas.

### Lado servidor: Envio de Notificações

Vamos começar pelo lado servidor. No MCP, define ferramentas que podem enviar notificações enquanto processam pedidos. O servidor usa o objeto contexto (geralmente `ctx`) para enviar mensagens ao cliente.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

No exemplo anterior, a ferramenta `process_files` envia três notificações ao cliente à medida que processa cada ficheiro. O método `ctx.info()` é usado para enviar mensagens informativas.

Além disso, para permitir notificações, assegure que o seu servidor usa um transporte de streaming (como `streamable-http`) e que o seu cliente implemente um manipulador de mensagens para processar notificações. Veja como configurar o servidor para usar o transporte `streamable-http`:

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

Neste exemplo .NET, a ferramenta `ProcessFiles` está decorada com o atributo `Tool` e envia três notificações ao cliente enquanto processa cada ficheiro. O método `ctx.Info()` é usado para enviar mensagens informativas.

Para ativar notificações no seu servidor MCP .NET, assegure que está a usar um transporte de streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Lado cliente: Receber Notificações

O cliente deve implementar um manipulador de mensagens para processar e exibir notificações à medida que chegam.

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

No código anterior, a função `message_handler` verifica se a mensagem recebida é uma notificação. Se for, imprime a notificação; caso contrário, processa-a como uma mensagem normal do servidor. Note também como a `ClientSession` é inicializada com o `message_handler` para tratar notificações recebidas.

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

Neste exemplo .NET, a função `MessageHandler` verifica se a mensagem recebida é uma notificação. Se for, imprime a notificação; caso contrário, processa-a como uma mensagem normal do servidor. A `ClientSession` é inicializada com o manipulador de mensagens via `ClientSessionOptions`.

Para ativar notificações, assegure que o seu servidor usa um transporte de streaming (como `streamable-http`) e que o seu cliente implemente um manipulador de mensagens para processar notificações.

## Notificações de Progresso & Cenários

Esta secção explica o conceito de notificações de progresso no MCP, porque são importantes, e como implementá-las usando HTTP Transmissível. Também encontrará um exercício prático para reforçar a sua compreensão.

Notificações de progresso são mensagens em tempo real enviadas do servidor para o cliente durante operações demoradas. Em vez de esperar que todo o processo termine, o servidor mantém o cliente atualizado sobre o estado corrente. Isso melhora a transparência, a experiência do utilizador e facilita a depuração.

**Exemplo:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Porque usar Notificações de Progresso?

As notificações de progresso são essenciais por várias razões:

- **Melhor experiência do utilizador:** Os utilizadores veem atualizações conforme o trabalho progride, não apenas no fim.
- **Feedback em tempo real:** Os clientes podem mostrar barras de progresso ou logs, tornando a aplicação mais responsiva.
- **Depuração e monitorização facilitadas:** Desenvolvedores e utilizadores podem ver onde o processo pode estar lento ou bloqueado.

### Como implementar Notificações de Progresso

Eis como pode implementar notificações de progresso no MCP:

- **No servidor:** Use `ctx.info()` ou `ctx.log()` para enviar notificações à medida que cada item é processado. Isto envia uma mensagem ao cliente antes do resultado principal estar pronto.
- **No cliente:** Implemente um manipulador de mensagens que escute e exiba notificações à medida que chegam. Este manipulador distingue entre notificações e o resultado final.

**Exemplo servidor:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Exemplo de Cliente:**

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

A segurança é crítica ao expor servidores MCP via HTTP. O HTTP transmissível introduz novas superfícies de ataque e requer configuração cuidadosa.

### Pontos-Chave

- **Validação do Cabeçalho Origin**: Valide sempre o cabeçalho `Origin` para prevenir ataques de rebindings de DNS.
- **Binding ao Localhost**: Para desenvolvimento local, associe os servidores ao `localhost` para evitar expô-los na internet pública.
- **Autenticação**: Implemente autenticação (ex.: chaves API, OAuth) para implementações em produção.
- **CORS**: Configure políticas de Cross-Origin Resource Sharing (CORS) para restringir o acesso.
- **HTTPS**: Utilize HTTPS em produção para encriptar o tráfego.

### Melhores Práticas

- Nunca confie em pedidos recebidos sem validação.
- Registe e monitorize todo o acesso e erros.
- Atualize regularmente as dependências para corrigir vulnerabilidades de segurança.

### Desafios

- Equilibrar a segurança com a facilidade de desenvolvimento
- Garantir compatibilidade com vários ambientes de cliente

## Atualização de SSE para Streamable HTTP

Para aplicações que utilizam atualmente Server-Sent Events (SSE), migrar para Streamable HTTP oferece capacidades melhoradas e maior sustentabilidade a longo prazo para as suas implementações MCP.

### Porquê Atualizar?

Existem duas razões convincentes para atualizar de SSE para Streamable HTTP:

- O Streamable HTTP oferece melhor escalabilidade, compatibilidade e suporte de notificações mais rico do que o SSE.
- É o transporte recomendado para novas aplicações MCP.

### Passos para Migração

Eis como pode migrar de SSE para Streamable HTTP nas suas aplicações MCP:

- **Atualize o código do servidor** para usar `transport="streamable-http"` em `mcp.run()`.
- **Atualize o código do cliente** para usar `streamablehttp_client` em vez do cliente SSE.
- **Implemente um manipulador de mensagens** no cliente para processar notificações.
- **Teste a compatibilidade** com as ferramentas e fluxos de trabalho existentes.

### Manutenção da Compatibilidade

Recomenda-se manter a compatibilidade com clientes SSE existentes durante o processo de migração. Aqui estão algumas estratégias:

- Pode suportar ambos, SSE e Streamable HTTP, executando os dois transportes em endpoints diferentes.
- Migre gradualmente os clientes para o novo transporte.

### Desafios

Garanta que aborda os seguintes desafios durante a migração:

- Garantir que todos os clientes são atualizados
- Lidar com as diferenças na entrega de notificações

## Considerações de Segurança

A segurança deve ser uma prioridade máxima ao implementar qualquer servidor, especialmente quando se usam transportes baseados em HTTP como o Streamable HTTP no MCP. 

Ao implementar servidores MCP com transportes baseados em HTTP, a segurança torna-se uma preocupação primordial que requer atenção cuidadosa a múltiplos vetores de ataque e mecanismos de proteção.

### Visão Geral

A segurança é crítica ao expor servidores MCP via HTTP. O HTTP transmissível introduz novas superfícies de ataque e requer configuração cuidadosa.

Aqui estão algumas considerações chave de segurança:

- **Validação do Cabeçalho Origin**: Valide sempre o cabeçalho `Origin` para prevenir ataques de rebindings de DNS.
- **Binding ao Localhost**: Para desenvolvimento local, associe os servidores ao `localhost` para evitar expô-los na internet pública.
- **Autenticação**: Implemente autenticação (ex.: chaves API, OAuth) para implementações em produção.
- **CORS**: Configure políticas de Cross-Origin Resource Sharing (CORS) para restringir o acesso.
- **HTTPS**: Utilize HTTPS em produção para encriptar o tráfego.

### Melhores Práticas

Adicionalmente, aqui estão algumas melhores práticas a seguir ao implementar a segurança no seu servidor de streaming MCP:

- Nunca confie em pedidos recebidos sem validação.
- Registe e monitorize todo o acesso e erros.
- Atualize regularmente as dependências para corrigir vulnerabilidades de segurança.

### Desafios

Vai enfrentar alguns desafios ao implementar segurança em servidores MCP de streaming:

- Equilibrar a segurança com a facilidade de desenvolvimento
- Garantir compatibilidade com vários ambientes de cliente

### Exercício: Crie a Sua Própria Aplicação MCP Streaming

**Cenário:**
Crie um servidor e cliente MCP onde o servidor processa uma lista de itens (ex.: ficheiros ou documentos) e envia uma notificação para cada item processado. O cliente deverá mostrar cada notificação conforme chega.

**Passos:**

1. Implemente uma ferramenta de servidor que processe uma lista e envie notificações para cada item.
2. Implemente um cliente com um manipulador de mensagens para mostrar notificações em tempo real.
3. Teste a sua implementação ao executar servidor e cliente, e observe as notificações.

[Solução](./solution/README.md)

## Leitura Adicional & Próximos Passos

Para continuar a sua jornada com o streaming MCP e expandir o seu conhecimento, esta secção fornece recursos adicionais e passos sugeridos para construir aplicações mais avançadas.

### Leitura Adicional

- [Microsoft: Introdução ao Streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS em ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Pedidos em Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Próximos Passos

- Experimente construir ferramentas MCP mais avançadas que usem streaming para análises em tempo real, chat, ou edição colaborativa.
- Explore integrar streaming MCP com frameworks frontend (React, Vue, etc.) para atualizações UI em direto.
- Seguinte: [Utilizando AI Toolkit para VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->