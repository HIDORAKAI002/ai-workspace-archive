# Streaming HTTPS com o Model Context Protocol (MCP)

Este capítulo fornece um guia abrangente para implementar streaming seguro, escalável e em tempo real com o Model Context Protocol (MCP) usando HTTPS. Cobre a motivação para o streaming, os mecanismos de transporte disponíveis, como implementar HTTP streaming no MCP, melhores práticas de segurança, migração a partir do SSE e orientações práticas para construir as suas próprias aplicações MCP com streaming.

## Mecanismos de Transporte e Streaming no MCP

Esta secção explora os diferentes mecanismos de transporte disponíveis no MCP e o seu papel em permitir capacidades de streaming para comunicação em tempo real entre clientes e servidores.

### O que é um Mecanismo de Transporte?

Um mecanismo de transporte define como os dados são trocados entre o cliente e o servidor. O MCP suporta múltiplos tipos de transporte para adequar-se a diferentes ambientes e requisitos:

- **stdio**: Entrada/saída padrão, adequado para ferramentas locais e baseadas em linha de comandos. Simples mas não adequado para web ou cloud.
- **SSE (Server-Sent Events)**: Permite que servidores enviem atualizações em tempo real para clientes sobre HTTP. Bom para interfaces web, mas limitado em escalabilidade e flexibilidade. A partir da Especificação MCP 2025-06-18, o transporte SSE independente foi descontinuado e substituído pelo transporte "Streamable HTTP".
- **Streamable HTTP**: Transporte de streaming moderno baseado em HTTP, suportando notificações e melhor escalabilidade. Recomendado para a maioria dos cenários de produção e cloud.

### Tabela Comparativa

Veja a tabela comparativa abaixo para entender as diferenças entre estes mecanismos de transporte:

| Transporte        | Atualizações em Tempo Real | Streaming | Escalabilidade | Caso de Utilização        |
|-------------------|----------------------------|-----------|----------------|--------------------------|
| stdio             | Não                        | Não       | Baixa          | Ferramentas CLI locais    |
| SSE               | Sim                        | Sim       | Média          | Web, atualizações em tempo real |
| Streamable HTTP   | Sim                        | Sim       | Alta           | Cloud, múltiplos clientes |

> **Dica:** Escolher o transporte correto impacta o desempenho, escalabilidade e experiência do utilizador. **Streamable HTTP** é recomendado para aplicações modernas, escaláveis e preparadas para cloud.

Note os transportes stdio e SSE que foram apresentados nos capítulos anteriores e como o streamable HTTP é o transporte abordado neste capítulo.

## Streaming: Conceitos e Motivação

Compreender os conceitos fundamentais e as motivações por trás do streaming é essencial para implementar sistemas eficazes de comunicação em tempo real.

**Streaming** é uma técnica em programação de redes que permite enviar e receber dados em pequenos fragmentos geríveis ou como uma sequência de eventos, em vez de esperar que uma resposta completa esteja pronta. Isto é especialmente útil para:

- Ficheiros ou conjuntos de dados grandes.
- Atualizações em tempo real (ex.: chat, barras de progresso).
- Cálculos longos onde se pretende manter o utilizador informado.

Aqui está o que precisa de saber acerca do streaming a alto nível:

- Os dados são entregues progressivamente, não de uma vez só.
- O cliente pode processar os dados à medida que estes chegam.
- Reduz a latência percetível e melhora a experiência do utilizador.

### Porque usar streaming?

As razões para usar streaming são as seguintes:

- Os utilizadores recebem feedback imediato, não apenas no final.
- Permite aplicações em tempo real e interfaces reativas.
- Mais eficiente no uso dos recursos de rede e computação.

### Exemplo Simples: Servidor & Cliente HTTP Streaming

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

Este exemplo demonstra um servidor a enviar uma série de mensagens ao cliente à medida que ficam disponíveis, em vez de esperar que todas as mensagens estejam prontas.

**Como funciona:**

- O servidor produz cada mensagem assim que está pronta.
- O cliente recebe e imprime cada pedaço assim que chega.

**Requisitos:**

- O servidor deve usar uma resposta de streaming (ex.: `StreamingResponse` no FastAPI).
- O cliente deve processar a resposta como um stream (`stream=True` em requests).
- O Content-Type é geralmente `text/event-stream` ou `application/octet-stream`.

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

**Notas de Implementação Java:**

- Usa o stack reativo do Spring Boot com `Flux` para streaming.
- `ServerSentEvent` fornece streaming estruturado de eventos com tipos de evento.
- `WebClient` com `bodyToFlux()` permite consumo reativo.
- `delayElements()` simula tempo de processamento entre eventos.
- Eventos podem ter tipos (`info`, `result`) para melhor tratamento pelo cliente.

### Comparação: Streaming Clássico vs Streaming MCP

As diferenças entre a forma clássica de streaming e como funciona no MCP podem ser descritas assim:

| Característica        | Streaming HTTP Clássico        | Streaming MCP (Notificações)    |
|------------------------|-------------------------------|--------------------------------|
| Resposta principal     | Chunked                       | Única, no fim                  |
| Atualizações de progresso | Enviadas como pedaços de dados | Enviadas como notificações     |
| Requisitos do cliente  | Deve processar o stream       | Deve implementar manipulador de mensagens |
| Caso de uso            | Ficheiros grandes, fluxos de tokens AI | Progresso, logs, feedback em tempo real |

### Diferenças Chave Observadas

Adicionalmente, aqui estão algumas diferenças chave:

- **Padrão de Comunicação:**
  - Streaming HTTP clássico: usa codificação de transferência em fragmentos simples para enviar dados em pedaços.
  - Streaming MCP: usa um sistema estruturado de notificações com protocolo JSON-RPC.

- **Formato da Mensagem:**
  - HTTP clássico: pedaços de texto simples com novas linhas.
  - MCP: objetos estruturados LoggingMessageNotification com metadados.

- **Implementação do Cliente:**
  - HTTP clássico: cliente simples que processa respostas streaming.
  - MCP: cliente mais sofisticado com manipulador de mensagens para processar diferentes tipos.

- **Atualizações de Progresso:**
  - HTTP clássico: progresso faz parte do stream principal de resposta.
  - MCP: progresso é enviado via mensagens de notificação separadas enquanto o resultado principal vem no final.

### Recomendações

Há algumas coisas que recomendamos na escolha entre implementar streaming clássico (como endpoint mostrado acima usando `/stream`) versus streaming via MCP.

- **Para necessidades simples de streaming:** Streaming HTTP clássico é mais fácil de implementar e suficiente para necessidades básicas.

- **Para aplicações complexas e interativas:** Streaming MCP oferece uma abordagem mais estruturada com metadados ricos e separação entre notificações e resultados finais.

- **Para aplicações de IA:** O sistema de notificações do MCP é particularmente útil para tarefas AI longas onde se quer manter o utilizador informado do progresso.

## Streaming no MCP

Ok, já viu algumas recomendações e comparações sobre a diferença entre o streaming clássico e o streaming no MCP. Vamos detalhar exatamente como pode tirar partido do streaming no MCP.

Compreender como o streaming funciona dentro do framework MCP é essencial para construir aplicações reativas que oferecem feedback em tempo real aos utilizadores durante operações prolongadas.

No MCP, o streaming não é sobre enviar a resposta principal em pedaços, mas sobre enviar **notificações** ao cliente enquanto uma ferramenta processa um pedido. Essas notificações podem incluir atualizações de progresso, logs ou outros eventos.

### Como funciona

O resultado principal é ainda enviado como uma única resposta. Contudo, notificações podem ser enviadas como mensagens separadas durante o processamento e assim atualizar o cliente em tempo real. O cliente deve ser capaz de gerir e apresentar essas notificações.

## O que é uma Notificação?

Dissemos "Notificação", o que isso significa no contexto do MCP?

Uma notificação é uma mensagem enviada do servidor para o cliente para informar sobre progresso, estado ou outros eventos durante uma operação longa. Notificações melhoram a transparência e experiência do utilizador.

Por exemplo, um cliente deve enviar uma notificação assim que a ligação inicial com o servidor esteja estabelecida.

Uma notificação é assim apresentada como mensagem JSON:

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

Para fazer logging funcionar, o servidor necessita de habilitá-lo como funcionalidade/capacidade desta forma:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Dependendo do SDK utilizado, o logging pode estar ativado por defeito, ou poderá ser necessário ativá-lo explicitamente na configuração do servidor.

Existem diferentes tipos de notificações:

| Nível     | Descrição                      | Exemplo de Uso                 |
|-----------|-------------------------------|-------------------------------|
| debug     | Informação detalhada de debug  | Pontos de entrada/saída de funções |
| info      | Mensagens informativas gerais  | Atualizações do progresso da operação |
| notice    | Eventos normais mas significativos | Alterações de configuração    |
| warning   | Condições de aviso             | Uso de funcionalidade obsoleta |
| error     | Condições de erro              | Falhas na operação            |
| critical  | Condições críticas             | Falhas em componentes do sistema |
| alert     | Ação deve ser tomada imediatamente | Corrupção de dados detectada |
| emergency | Sistema está inutilizável      | Falha completa do sistema     |

## Implementar Notificações no MCP

Para implementar notificações no MCP, deve configurar ambos os lados, servidor e cliente, para lidar com atualizações em tempo real. Isto permite que a sua aplicação forneça feedback imediato aos utilizadores durante operações longas.

### Lado servidor: Enviar Notificações

Vamos começar pelo lado do servidor. No MCP, define ferramentas que podem enviar notificações enquanto processam pedidos. O servidor usa o objeto de contexto (normalmente `ctx`) para enviar mensagens ao cliente.

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

Adicionalmente, para ativar notificações, assegure-se que o seu servidor usa um transporte de streaming (como `streamable-http`) e que o seu cliente implementa um manipulador de mensagens para processar notificações. Veja como configurar o servidor para usar o transporte `streamable-http`:

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

Neste exemplo .NET, a ferramenta `ProcessFiles` é decorada com o atributo `Tool` e envia três notificações ao cliente conforme processa cada ficheiro. O método `ctx.Info()` é usado para enviar mensagens informativas.

Para ativar notificações no seu servidor MCP .NET, assegure-se que está a usar um transporte de streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Lado cliente: Receber Notificações

O cliente deve implementar um manipulador de mensagens para processar e apresentar notificações assim que estas chegam.

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

No código anterior, a função `message_handler` verifica se a mensagem recebida é uma notificação. Se for, imprime a notificação; caso contrário, processa-a como uma mensagem normal do servidor. Note também como a `ClientSession` é inicializada com o `message_handler` para lidar com notificações recebidas.

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

Neste exemplo .NET, a função `MessageHandler` verifica se a mensagem recebida é uma notificação. Se for, imprime a notificação; caso contrário, processa-a como uma mensagem normal do servidor. A `ClientSession` é inicializada com o handler de mensagens via `ClientSessionOptions`.

Para ativar notificações, assegure-se que o seu servidor está a usar um transporte de streaming (como o `streamable-http`) e que o cliente implementa um manipulador para processar notificações.

## Notificações de Progresso & Cenários

Esta secção explica o conceito de notificações de progresso no MCP, porque são importantes e como implementá-las usando Streamable HTTP. Inclui também um exercício prático para reforçar a sua compreensão.

Notificações de progresso são mensagens em tempo real enviadas do servidor para o cliente durante operações longas. Em vez de esperar que todo o processo termine, o servidor mantém o cliente atualizado sobre o estado atual. Isto melhora a transparência, experiência do utilizador e facilita a resolução de problemas.

**Exemplo:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Porque Usar Notificações de Progresso?

Notificações de progresso são essenciais por várias razões:

- **Melhora da experiência do utilizador:** Os utilizadores veem atualizações à medida que o trabalho avança, não apenas no final.
- **Feedback em tempo real:** Clientes podem mostrar barras de progresso ou logs, fazendo a app parecer reativa.
- **Depuração e monitorização facilitadas:** Desenvolvedores e utilizadores podem ver onde um processo está lento ou bloqueado.

### Como Implementar Notificações de Progresso

Aqui está como pode implementar notificações de progresso no MCP:

- **No servidor:** Use `ctx.info()` ou `ctx.log()` para enviar notificações à medida que cada item é processado. Isto envia uma mensagem ao cliente antes do resultado principal estar pronto.
- **No cliente:** Implemente um manipulador de mensagens que escute e apresente notificações assim que chegarem. Este manipulador distingue entre notificações e resultado final.

**Exemplo Servidor:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Exemplo Cliente:**

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

A segurança é crítica ao expor servidores MCP via HTTP. Streamable HTTP introduz novas superfícies de ataque e requer configuração cuidadosa.

### Pontos-Chave

- **Validação do Header Origin**: Valide sempre o header `Origin` para prevenir ataques de DNS rebinding.
- **Binding ao Localhost**: Para desenvolvimento local, associe servidores a `localhost` para evitar exposição pública.
- **Autenticação**: Implemente autenticação (ex.: chaves API, OAuth) para ambientes de produção.
- **CORS**: Configure políticas de Cross-Origin Resource Sharing (CORS) para restringir acesso.
- **HTTPS**: Use HTTPS em produção para encriptar o tráfego.

### Melhores Práticas

- Nunca confie em pedidos recebidos sem validação.
- Registe e monitorize todo o acesso e erros.
- Atualize regularmente dependências para corrigir vulnerabilidades de segurança.

### Desafios
- Equilibrar a segurança com a facilidade de desenvolvimento
- Garantir compatibilidade com vários ambientes de cliente

## Atualização de SSE para Streamable HTTP

Para aplicações que atualmente utilizam Server-Sent Events (SSE), a migração para Streamable HTTP proporciona capacidades melhoradas e melhor sustentabilidade a longo prazo para as suas implementações MCP.

### Porque atualizar?

Existem duas razões convincentes para atualizar de SSE para Streamable HTTP:

- Streamable HTTP oferece melhor escalabilidade, compatibilidade e suporte de notificações mais rico do que SSE.
- É o transporte recomendado para novas aplicações MCP.

### Passos de migração

Aqui está como pode migrar de SSE para Streamable HTTP nas suas aplicações MCP:

- **Atualizar o código do servidor** para usar `transport="streamable-http"` em `mcp.run()`.
- **Atualizar o código do cliente** para usar `streamablehttp_client` em vez do cliente SSE.
- **Implementar um manipulador de mensagens** no cliente para processar notificações.
- **Testar a compatibilidade** com ferramentas e fluxos de trabalho existentes.

### Manutenção da compatibilidade

Recomenda-se manter a compatibilidade com clientes SSE existentes durante o processo de migração. Eis algumas estratégias:

- Pode suportar tanto SSE como Streamable HTTP executando ambos os transportes em endpoints diferentes.
- Migrar gradualmente os clientes para o novo transporte.

### Desafios

Deve assegurar que aborda os seguintes desafios durante a migração:

- Garantir que todos os clientes são atualizados
- Lidar com diferenças na entrega das notificações

## Considerações de Segurança

A segurança deve ser uma prioridade principal ao implementar qualquer servidor, especialmente ao usar transportes baseados em HTTP como o Streamable HTTP no MCP.

Ao implementar servidores MCP com transportes baseados em HTTP, a segurança torna-se uma preocupação primordial que exige atenção cuidadosa a múltiplos vetores de ataque e mecanismos de proteção.

### Visão geral

A segurança é crítica quando se expõem servidores MCP através de HTTP. O Streamable HTTP introduz novas superfícies de ataque e requer configuração cuidadosa.

Aqui estão algumas considerações chave de segurança:

- **Validação do Cabeçalho Origin**: Valide sempre o cabeçalho `Origin` para evitar ataques de DNS rebinding.
- **Ligação ao Localhost**: Para desenvolvimento local, ligue os servidores ao `localhost` para evitar expô-los à internet pública.
- **Autenticação**: Implemente autenticação (por exemplo, chaves API, OAuth) para implementações de produção.
- **CORS**: Configure políticas de Cross-Origin Resource Sharing (CORS) para restringir o acesso.
- **HTTPS**: Use HTTPS em produção para encriptar o tráfego.

### Melhores práticas

Além disso, aqui estão algumas melhores práticas a seguir ao implementar segurança no seu servidor de streaming MCP:

- Nunca confie em pedidos recebidos sem validação.
- Registe e monitorize todos os acessos e erros.
- Atualize regularmente as dependências para corrigir vulnerabilidades de segurança.

### Desafios

Vai enfrentar alguns desafios ao implementar segurança em servidores de streaming MCP:

- Equilibrar a segurança com a facilidade de desenvolvimento
- Garantir compatibilidade com vários ambientes de cliente

### Tarefa: Crie a Sua Própria App de Streaming MCP

**Cenário:**
Crie um servidor MCP e um cliente onde o servidor processa uma lista de itens (por exemplo, ficheiros ou documentos) e envia uma notificação para cada item processado. O cliente deve mostrar cada notificação à medida que chega.

**Passos:**

1. Implemente uma ferramenta servidor que processe uma lista e envie notificações para cada item.
2. Implemente um cliente com um manipulador de mensagens para mostrar as notificações em tempo real.
3. Teste a sua implementação executando ambos, servidor e cliente, e observe as notificações.

[Solução](./solution/README.md)

## Leitura Complementar & Próximos Passos

Para continuar a sua jornada com o streaming MCP e expandir o seu conhecimento, esta secção fornece recursos adicionais e etapas sugeridas para construir aplicações mais avançadas.

### Leitura complementar

- [Microsoft: Introdução ao HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS em ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Próximos passos

- Tente construir ferramentas MCP mais avançadas que usem streaming para análises em tempo real, chat, ou edição colaborativa.
- Explore a integração do streaming MCP com frameworks frontend (React, Vue, etc.) para atualizações em tempo real da interface.
- Seguir para: [Utilização do AI Toolkit para VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->