# Explorando o Microsoft Agent Framework

![Agent Framework](../../../translated_images/pt-BR/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Introdução

Esta lição cobrirá:

- Compreendendo o Microsoft Agent Framework: Recursos-chave e Valor  
- Explorando os Conceitos principais do Microsoft Agent Framework
- Padrões avançados de MAF: Workflows, Middleware e Memória

## Objetivos de Aprendizagem

Após completar esta lição, você saberá como:

- Construir agentes de IA prontos para produção usando Microsoft Agent Framework
- Aplicar os recursos centrais do Microsoft Agent Framework aos seus casos de uso agentic
- Usar padrões avançados incluindo workflows, middleware e observabilidade

## Exemplos de Código 

Exemplos de código para [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) podem ser encontrados neste repositório nos arquivos `xx-python-agent-framework` e `xx-dotnet-agent-framework`.

## Compreendendo o Microsoft Agent Framework

![Framework Intro](../../../translated_images/pt-BR/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) é o framework unificado da Microsoft para construção de agentes de IA. Ele oferece flexibilidade para abordar a grande variedade de casos de uso agentic vistos em ambientes de produção e pesquisa, incluindo:

- **Orquestração sequencial de agentes** em cenários onde workflows passo a passo são necessários.
- **Orquestração concorrente** em cenários onde agentes precisam completar tarefas simultaneamente.
- **Orquestração de chat em grupo** em cenários onde agentes podem colaborar em uma mesma tarefa.
- **Orquestração de passagem de tarefas** em cenários onde agentes transferem a tarefa um para o outro à medida que subtarefas são concluídas.
- **Orquestração magnética** em cenários onde um agente gerente cria e modifica uma lista de tarefas e gerencia a coordenação dos subagentes para completá-las.

Para entregar Agentes de IA em produção, o MAF também inclui recursos para:

- **Observabilidade** através do uso de OpenTelemetry onde cada ação do Agente de IA inclui a invocação de ferramentas, passos de orquestração, fluxos de raciocínio e monitoramento de desempenho via dashboards Microsoft Foundry.
- **Segurança** hospedando agentes nativamente no Microsoft Foundry que inclui controles de segurança como acesso baseado em função, manejo de dados privados e segurança de conteúdo integrada.
- **Durabilidade** pois threads e workflows de agentes podem pausar, retomar e recuperar de erros, permitindo processos de longa duração.
- **Controle** pois workflows com intervenção humana são suportados, onde tarefas são marcadas como requerendo aprovação humana.

O Microsoft Agent Framework também é focado em interoperabilidade por:

- **Ser agnóstico em nuvem** - Agentes podem rodar em containers, on-premises e em múltiplas nuvens distintas.
- **Ser agnóstico a provedores** - Agentes podem ser criados via seu SDK preferido incluindo Azure OpenAI e OpenAI
- **Integrar padrões abertos** - Agentes podem usar protocolos como Agent-to-Agent (A2A) e Model Context Protocol (MCP) para descobrir e usar outros agentes e ferramentas.
- **Plugins e Conectores** - Conexões podem ser feitas a serviços de dados e memória como Microsoft Fabric, SharePoint, Pinecone e Qdrant.

Vamos ver como estes recursos são aplicados em alguns dos conceitos centrais do Microsoft Agent Framework.

## Conceitos-chave do Microsoft Agent Framework

### Agentes

![Agent Framework](../../../translated_images/pt-BR/agent-components.410a06daf87b4fef.webp)

**Criando Agentes**

A criação de agentes é feita definindo o serviço de inferência (Provedor LLM), um
conjunto de instruções para o Agente de IA seguir e um `nome` atribuído:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

O exemplo acima usa `Azure OpenAI` mas agentes podem ser criados com vários serviços incluindo o `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

APIs OpenAI de `Responses`, `ChatCompletion`

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ou [MiniMax](https://platform.minimaxi.com/), que oferece uma API compatível com OpenAI com janelas de contexto grandes (até 204K tokens):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ou agentes remotos usando o protocolo A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Executando Agentes**

Agentes são executados usando os métodos `.run` ou `.run_stream` para respostas não-streaming ou streaming.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Cada execução do agente pode ter opções para personalizar parâmetros como `max_tokens` usados pelo agente, `tools` que o agente pode chamar, e até mesmo o próprio `model` usado para o agente.

Isso é útil em casos onde modelos ou ferramentas específicas são requeridas para completar a tarefa do usuário.

**Ferramentas**

Ferramentas podem ser definidas tanto na definição do agente:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Ao criar um ChatAgent diretamente

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

e também na execução do agente:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Ferramenta fornecida apenas para esta execução )
```

**Threads de Agente**

Threads de Agente são usadas para lidar com conversas multi-turnos. Threads podem ser criadas por:

- Usando `get_new_thread()` que permite a thread ser salva ao longo do tempo
- Criando uma thread automaticamente ao executar um agente que dura apenas durante a execução atual.

Para criar uma thread, o código é assim:

```python
# Crie uma nova thread.
thread = agent.get_new_thread() # Execute o agente com a thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Você pode então serializar a thread para armazenar para uso posterior:

```python
# Crie uma nova thread.
thread = agent.get_new_thread() 

# Execute o agente com a thread.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serialize a thread para armazenamento.

serialized_thread = await thread.serialize() 

# Desserialize o estado da thread após carregar do armazenamento.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Middleware de Agente**

Agentes interagem com ferramentas e LLMs para completar tarefas do usuário. Em certos cenários, queremos executar ou acompanhar entre essas interações. Middleware de agente permite isso por meio de:

*Middleware de Função*

Esse middleware permite executar uma ação entre o agente e a função/ferramenta que ele irá chamar. Um exemplo de uso é fazer log da chamada da função.

No código abaixo `next` define se o próximo middleware ou a função real deve ser chamada.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Pré-processamento: Registro antes da execução da função
    print(f"[Function] Calling {context.function.name}")

    # Continuar para o próximo middleware ou execução da função
    await next(context)

    # Pós-processamento: Registro após a execução da função
    print(f"[Function] {context.function.name} completed")
```

*Middleware de Chat*

Esse middleware permite executar ou registrar uma ação entre o agente e os pedidos entre o LLM.

Isso contém informações importantes como os `messages` que são enviados ao serviço de IA.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Pré-processamento: Registrar antes da chamada de IA
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Continuar para o próximo middleware ou serviço de IA
    await next(context)

    # Pós-processamento: Registrar após a resposta da IA
    print("[Chat] AI response received")

```

**Memória de Agente**

Como abordado na lição `Agentic Memory`, memória é um elemento importante para permitir que o agente opere sobre diferentes contextos. O MAF oferece vários tipos diferentes de memórias:

*Armazenamento em memória*

Esta é a memória armazenada em threads durante a execução do aplicativo.

```python
# Crie uma nova thread.
thread = agent.get_new_thread() # Execute o agente com a thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Mensagens Persistentes*

Essa memória é usada para armazenar histórico de conversa entre diferentes sessões. É definida usando `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Criar um armazenamento de mensagens personalizado
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Memória Dinâmica*

Essa memória é adicionada ao contexto antes da execução dos agentes. Essas memórias podem ser armazenadas em serviços externos como mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Usando Mem0 para capacidades avançadas de memória
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

**Observabilidade de Agente**

Observabilidade é importante para construir sistemas agentic confiáveis e mantíveis. O MAF integra com OpenTelemetry para fornecer tracing e medidores para melhor observabilidade.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # faça algo
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Workflows

O MAF oferece workflows que são passos pré-definidos para completar uma tarefa e incluem agentes de IA como componentes nesses passos.

Workflows são compostos por diferentes componentes que permitem melhor fluxo de controle. Workflows também permitem **orquestração multi-agente** e **checkpointing** para salvar estados do workflow.

Os componentes centrais de um workflow são:

**Executores**

Executores recebem mensagens de entrada, realizam suas tarefas designadas e então produzem uma mensagem de saída. Isso move o workflow adiante para completar a tarefa maior. Executores podem ser agentes de IA ou lógica personalizada.

**Arestas**

Arestas são usadas para definir o fluxo de mensagens em um workflow. Elas podem ser:

*Arestas Diretas* - Conexões simples um-a-um entre executores:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Arestas Condicionais* - Ativadas após determinada condição ser atendida. Por exemplo, quando quartos de hotel estão indisponíveis, um executor pode sugerir outras opções.

*Arestas de switch-case* - Direcionam mensagens a diferentes executores baseados em condições definidas. Por exemplo, se cliente de viagem tem acesso prioritário e suas tarefas serão tratadas via outro workflow.

*Arestas Fan-out* - Enviam uma mensagem a múltiplos destinos.

*Arestas Fan-in* - Coletam múltiplas mensagens de diferentes executores e enviam a um destino único.

**Eventos**

Para oferecer melhor observabilidade em workflows, MAF oferece eventos internos de execução incluindo:

- `WorkflowStartedEvent`  - Execução do workflow inicia
- `WorkflowOutputEvent` - Workflow produz uma saída
- `WorkflowErrorEvent` - Workflow encontra um erro
- `ExecutorInvokeEvent`  - Executor inicia processamento
- `ExecutorCompleteEvent`  -  Executor finaliza processamento
- `RequestInfoEvent` - Um pedido é emitido

## Padrões Avançados do MAF

As seções acima cobrem os conceitos chave do Microsoft Agent Framework. Conforme você constrói agentes mais complexos, aqui estão alguns padrões avançados a considerar:

- **Composição de Middleware**: Encadeie múltiplos manipuladores de middleware (logging, autenticação, limitação de taxa) usando middleware de função e de chat para controle refinado do comportamento do agente.
- **Checkpointing de Workflow**: Use eventos de workflow e serialização para salvar e retomar processos de agente de longa duração.
- **Seleção Dinâmica de Ferramentas**: Combine RAG sobre descrições de ferramentas com registro de ferramentas do MAF para apresentar apenas ferramentas relevantes por consulta.
- **Passagem Multi-Agente**: Use arestas de workflow e roteamento condicional para orquestrar passagens entre agentes especializados.

## Hospedando Agentes LangChain / LangGraph no Microsoft Foundry

O Microsoft Agent Framework é **interoperável entre frameworks** — você não está limitado a agentes escritos com MAF. Se você já tem um agente construído com **LangChain** ou **LangGraph**, você pode executá-lo como um **agente hospedado no Microsoft Foundry** para que o Foundry gerencie o runtime, sessões, escala, identidade e endpoints de protocolo para você, enquanto a lógica do seu agente permanece no LangGraph.

Isso é feito com o pacote `langchain_azure_ai.agents.hosting`, que expõe um grafo LangGraph compilado sobre os mesmos protocolos que agentes hospedados no Foundry usam.

**1. Instale o extra de hospedagem:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

O extra `hosting` instala as bibliotecas de protocolo Foundry: `azure-ai-agentserver-responses` (endpoint `/responses` compatível com OpenAI) e `azure-ai-agentserver-invocations` (endpoint genérico `/invocations`).

**2. Escolha um protocolo de hospedagem:**

| Protocolo | Classe Host | Endpoint | Use quando |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Você quer chat compatível com OpenAI, streaming, histórico de respostas e threading de conversas — o padrão recomendado para agentes conversacionais. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Você precisa de um formato JSON customizado, um endpoint estilo webhook, ou processamento não conversacional. |

Como a **API Responses é a principal API para desenvolvimento ao estilo agente no Foundry**, comece com `ResponsesHostServer` para a maioria dos agentes.

**3. Configure variáveis de ambiente** (`az login` primeiro para que o `DefaultAzureCredential` possa autenticar):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Quando o agente for executado como agente hospedado no Foundry, a plataforma injeta `FOUNDRY_PROJECT_ENDPOINT` automaticamente.

**4. Exponha um agente LangGraph pelo protocolo Responses:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # ChatOpenAI aqui mira o endpoint compatível com OpenAI (Responses) do projeto Foundry.
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

Execute localmente com `python main.py`, depois envie uma requisição Responses para `http://localhost:8088/responses`.

**Comportamentos chave:**

- **Conversas**: Clientes continuam uma conversa passando `previous_response_id` ou um ID de `conversation`. Se seu grafo for compilado com um checkpoint LangGraph, Foundry usa este checkpoint para chavear o estado da conversa (use checkpoint durável em produção; `MemorySaver` é adequado para testes locais).
- **Intervenção humana**: Se seu grafo usa `interrupt()` do LangGraph, `ResponsesHostServer` expõe a interrupção pendente como um item `function_call` / `mcp_approval_request` do Responses, e clientes retomam com um `function_call_output` / `mcp_approval_response` correspondente.
- **Implantação no Foundry**: Use o Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (local, requer Docker), então `azd provision` e `azd deploy`. Implantação como agente hospedado requer o papel **Foundry Project Manager**.

Uma versão executável deste exemplo está em [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Para o tutorial completo (protocolo Invocations, esquemas de requisição customizados, e resolução de problemas), veja [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Exemplos de Código 

Exemplos de código para Microsoft Agent Framework podem ser encontrados neste repositório nos arquivos `xx-python-agent-framework` e `xx-dotnet-agent-framework`.

## Tem Mais Perguntas Sobre Microsoft Agent Framework?

Junte-se ao [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) para encontrar outros estudantes, participar de horários de plantão e tirar dúvidas sobre seus Agentes de IA.
## Lição Anterior

[Memória para Agentes de IA](../13-agent-memory/README.md)

## Próxima Lição

[Construindo Agentes de Uso de Computador (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->