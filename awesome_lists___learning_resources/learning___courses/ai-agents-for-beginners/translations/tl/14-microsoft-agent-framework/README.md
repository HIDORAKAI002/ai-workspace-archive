# Pagsisiyasat sa Microsoft Agent Framework

![Agent Framework](../../../translated_images/tl/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Panimula

Tatalakayin sa leksyon na ito ang:

- Pag-unawa sa Microsoft Agent Framework: Pangunahing Katangian at Halaga
- Pagsisiyasat sa mga Pangunahing Konsepto ng Microsoft Agent Framework
- Mga Advanced na Pattern ng MAF: Mga Workflow, Middleware, at Memorya

## Mga Layunin sa Pagkatuto

Pagkatapos makumpleto ang leksyon na ito, malalaman mo kung paano:

- Gumawa ng Production Ready AI Agents gamit ang Microsoft Agent Framework
- Ilapat ang mga pangunahing tampok ng Microsoft Agent Framework sa iyong Mga Kaso ng Paggamit na Agentic
- Gumamit ng mga advanced na pattern kabilang ang workflows, middleware, at observability

## Mga Halimbawa ng Code

Ang mga halimbawa ng code para sa [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) ay matatagpuan sa repositoryong ito sa ilalim ng mga file na `xx-python-agent-framework` at `xx-dotnet-agent-framework`.

## Pag-unawa sa Microsoft Agent Framework

![Framework Intro](../../../translated_images/tl/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) ay ang pinag-isang framework ng Microsoft para sa pagbuo ng mga AI agent. Nag-aalok ito ng kakayahang umangkop upang matugunan ang malawak na iba't ibang mga kaso ng paggamit ng mga agentic na nakikita sa parehong production at research environments kabilang ang:

- **Sunod-sunod na Orkestrasyon ng Agent** sa mga scenario kung saan kinakailangan ang step-by-step na workflows.
- **Sabay-sabay na Orkestrasyon** sa mga scenario kung saan kailangang tapusin ng mga agent ang mga gawain nang sabay-sabay.
- **Orkestrasyon ng Grupong Chat** sa mga scenario kung saan maaaring makipagtulungan ang mga agent sa iisang gawain.
- **Handoff Orkestrasyon** sa mga scenario kung saan ipinapasa ng mga agent ang gawain sa isa't isa habang natatapos ang mga subtasks.
- **Magnetic Orkestrasyon** sa mga scenario kung saan ang isang manager agent ay lumilikha at nagbabago ng listahan ng mga gawain at humahawak ng koordinasyon ng mga subagent upang matapos ang gawain.

Upang maihatid ang mga AI Agent sa Production, may kasamang mga tampok ang MAF para sa:

- **Observability** sa pamamagitan ng paggamit ng OpenTelemetry kung saan bawat aksyon ng AI Agent kabilang ang pagtawag sa tool, mga hakbang ng orkestrasyon, mga agos ng pangangatwiran at pagmomonitor ng performance sa pamamagitan ng Microsoft Foundry dashboards.
- **Seguridad** sa pagho-host ng mga agent nang native sa Microsoft Foundry na may kasamang mga kontrol sa seguridad tulad ng role-based access, pribadong paghawak ng datos at built-in na content safety.
- **Katibayan** kung saan ang mga thread at workflow ng Agent ay maaaring mag-pause, mag-resume at maka-recover mula sa mga error na nagpapahintulot ng mas mahabang proseso.
- **Kontrol** dahil sinusuportahan ang human in the loop workflows kung saan ang mga gawain ay minamarkahan bilang nangangailangan ng pag-apruba ng tao.

Nakatuon din ang Microsoft Agent Framework sa pagiging interoperable sa pamamagitan ng:

- ** pagiging Cloud-agnostic ** - Maaaring tumakbo ang mga agent sa mga container, on-premises at sa iba't ibang mga cloud.
- ** pagiging Provider-agnostic ** - Maaaring malikha ang mga agent gamit ang iyong paboritong SDK kabilang ang Azure OpenAI at OpenAI
- ** Pagsasama ng Open Standards ** - Maaaring gamitin ng mga agent ang mga protocol tulad ng Agent-to-Agent(A2A) at Model Context Protocol (MCP) upang matuklasan at gamitin ang iba pang agent at mga tool.
- ** Plugins at Connectors ** - Maaaring gawin ang koneksyon sa mga serbisyo ng datos at memorya tulad ng Microsoft Fabric, SharePoint, Pinecone at Qdrant.

Tingnan natin kung paano inilalapat ang mga tampok na ito sa ilan sa mga pangunahing konsepto ng Microsoft Agent Framework.

## Mga Pangunahing Konsepto ng Microsoft Agent Framework

### Mga Agent

![Agent Framework](../../../translated_images/tl/agent-components.410a06daf87b4fef.webp)

**Paglikha ng mga Agent**

Ginagawa ang paglikha ng agent sa pamamagitan ng pagtukoy sa inference service (LLM Provider), isang
set ng mga instruksiyon na susundin ng AI Agent, at isang itinalagang `name`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Ang nasa itaas ay gumagamit ng `Azure OpenAI` ngunit maaaring malikha ang mga agent gamit ang iba't ibang serbisyo kabilang ang `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

Mga OpenAI `Responses`, `ChatCompletion` API

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

o [MiniMax](https://platform.minimaxi.com/), na nagbibigay ng OpenAI-compatible API na may malalaking context window (hanggang 204K tokens):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

o mga remote na agent gamit ang A2A protocol:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Pagpapatakbo ng mga Agent**

Pinapatakbo ang mga agent gamit ang `.run` o `.run_stream` na mga pamamaraan para sa non-streaming o streaming na mga tugon.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Bawat pagpapatakbo ng agent ay maaari ring may mga opsyon upang i-customize ang mga parameter tulad ng `max_tokens` na ginagamit ng agent, `tools` na maaaring tawagan ng agent, at maging ang mismong `model` na ginagamit para sa agent.

Kapaki-pakinabang ito sa mga kaso kung saan kinakailangan ang mga partikular na modelo o mga tool para makumpleto ang gawain ng gumagamit.

**Mga Tool**

Maaaring tukuyin ang mga tool kapwa kapag dinefine ang agent:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Kapag direktang lumilikha ng isang ChatAgent

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

at kapag pinapatakbo ang agent:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Kasangkapang ibinigay para lamang sa pagtakbong ito )
```

**Agent Threads**

Ginagamit ang Agent Threads upang hawakan ang multi-turn conversations. Ang mga thread ay maaaring malikha alinman sa pamamagitan ng:

- Paggamit ng `get_new_thread()` na nagpapahintulot na masave ang thread sa paglipas ng panahon
- Awtomatikong paglikha ng thread kapag pinapatakbo ang agent at ang thread ay tatagal lang sa kasalukuyang pagpapatakbo.

Upang gumawa ng thread, ganito ang hitsura ng code:

```python
# Lumikha ng bagong thread.
thread = agent.get_new_thread() # Patakbuhin ang ahente gamit ang thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Maaari mong i-serialize ang thread para maiimbak ito para magamit sa hinaharap:

```python
# Lumikha ng bagong thread.
thread = agent.get_new_thread() 

# Patakbuhin ang ahente gamit ang thread.

response = await agent.run("Hello, how are you?", thread=thread) 

# I-serialize ang thread para sa imbakan.

serialized_thread = await thread.serialize() 

# I-deserialize ang estado ng thread pagkatapos i-load mula sa imbakan.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agent Middleware**

Nakikipag-ugnayan ang mga agent sa mga tool at LLM upang matapos ang mga gawain ng gumagamit. Sa ilang mga senaryo, nais nating magpatupad o mag-track sa gitna ng mga interaksyong ito. Pinapayagan tayo ng agent middleware na gawin ito sa pamamagitan ng:

*Function Middleware*

Pinapayagan tayo ng middleware na ito na magsagawa ng isang aksyon sa pagitan ng agent at isang function/tool na tatawagin nito. Halimbawa ng gamit nito ay kapag nais mong mag-log sa pagtawag ng function.

Sa kodigo sa ibaba, tinutukoy ng `next` kung ang susunod na middleware o ang aktwal na function ang tatawagin.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Pre-processing: Mag-log bago ang pag-execute ng function
    print(f"[Function] Calling {context.function.name}")

    # Magpatuloy sa susunod na middleware o pag-execute ng function
    await next(context)

    # Post-processing: Mag-log pagkatapos ng pag-execute ng function
    print(f"[Function] {context.function.name} completed")
```

*Chat Middleware*

Pinapayagan tayo ng middleware na ito na magsagawa o mag-log ng aksyon sa pagitan ng agent at mga request sa pagitan ng LLM.

Nagtataglay ito ng mahalagang impormasyon tulad ng `messages` na ipinapadala sa AI service.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Paunang pagproseso: Mag-log bago ang tawag sa AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Magpatuloy sa susunod na middleware o serbisyo ng AI
    await next(context)

    # Pagkatapos ng pagproseso: Mag-log pagkatapos ng tugon ng AI
    print("[Chat] AI response received")

```

**Agent Memory**

Tulad ng tinalakay sa leksyon na `Agentic Memory`, mahalagang elemento ang memorya upang payagan ang agent na mag-operate sa iba't ibang konteksto. Nag-aalok ang MAF ng iba't ibang uri ng mga memorya:

*In-Memory Storage*

Ito ang memoryang naka-imbak sa mga thread habang tumatakbo ang aplikasyon.

```python
# Gumawa ng bagong thread.
thread = agent.get_new_thread() # Patakbuhin ang agent gamit ang thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Persistent Messages*

Ginagamit ang memoryang ito kapag nag-iimbak ng kasaysayan ng pag-uusap sa iba't ibang sesyon. Ito ay tinutukoy gamit ang `chat_message_store_factory` :

```python
from agent_framework import ChatMessageStore

# Gumawa ng isang pasadyang imbakan ng mensahe
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynamic Memory*

Idinadagdag ang memoryang ito sa konteksto bago patakbuhin ang mga agent. Maaaring itago ang mga memoryang ito sa mga panlabas na serbisyo tulad ng mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Paggamit ng Mem0 para sa mga advanced na kakayahan sa memorya
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

**Agent Observability**

Mahalaga ang observability upang makabuo ng maaasahan at madaling mapanatili na mga sistema ng agentic. Nakikipagsama ang MAF sa OpenTelemetry upang magbigay ng tracing at metrics para sa mas mahusay na observability.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # gumawa ng isang bagay
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Workflows

Nag-aalok ang MAF ng mga workflow na pre-defined na mga hakbang upang matapos ang isang gawain at kasama ang mga AI agent bilang mga bahagi sa mga hakbang na iyon.

Binubuo ang mga workflow ng iba't ibang bahagi na nagpapahintulot ng mas magandang control flow. Pinapayagan din ng mga workflow ang **multi-agent orchestration** at **checkpointing** upang masave ang estado ng workflow.

Ang mga pangunahing bahagi ng isang workflow ay:

**Executors**

Tumatanggap ang mga executor ng mga input na mensahe, ginagawa ang kanilang mga nakatalagang gawain, at pagkatapos ay gumagawa ng output na mensahe. Ipinagpapatuloy nito ang workflow patungo sa pagkumpleto ng mas malaki pang gawain. Ang mga executor ay maaaring AI agent o custom na lohika.

**Edges**

Ginagamit ang mga edges upang tukuyin ang daloy ng mga mensahe sa isang workflow. Maaari itong:

*Direct Edges* - Simpleng koneksyon na one-to-one sa pagitan ng mga executor:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Conditional Edges* - Ina-activate pagkatapos matugunan ang isang kondisyon. Halimbawa, kapag wala nang mga bakanteng kuwarto sa hotel, maaaring magmungkahi ang executor ng ibang mga opsyon.

*Switch-case Edges* - Nag-ruruta ng mga mensahe sa iba't ibang executor batay sa mga tinukoy na kondisyon. Halimbawa, kung ang customer sa paglalakbay ay may priority access at ang kanilang mga gawain ay hahawakan sa ibang workflow.

*Fan-out Edges* - Nagpapadala ng isang mensahe sa maraming target.

*Fan-in Edges* - Kinokolekta ang maraming mensahe mula sa iba't ibang executor at ipinapadala sa isang target.

**Events**

Upang magbigay ng mas mahusay na observability sa mga workflow, nag-aalok ang MAF ng built-in na mga event para sa pagpapatupad kabilang ang:

- `WorkflowStartedEvent`  - Nagsisimula ang pagpapatupad ng workflow
- `WorkflowOutputEvent` - Gumagawa ng output ang workflow
- `WorkflowErrorEvent` - Nakaranas ng error ang workflow
- `ExecutorInvokeEvent`  - Nagsisimula ang processing ng executor
- `ExecutorCompleteEvent`  - Natatapos ang processing ng executor
- `RequestInfoEvent` - May inilabas na kahilingan

## Mga Advanced na Pattern ng MAF

Ang mga seksyon sa itaas ay tumatalakay sa mga pangunahing konsepto ng Microsoft Agent Framework. Habang gumagawa ka ng mas komplikadong mga agent, narito ang ilang advanced na pattern na dapat isaalang-alang:

- **Middleware Composition**: Pagsamahin ang maraming middleware handler (logging, auth, rate-limiting) gamit ang function at chat middleware para sa mas detalyadong kontrol sa kilos ng agent.
- **Workflow Checkpointing**: Gamitin ang mga event ng workflow at serialization upang mag-save at mag-resume ng mga long-running na proseso ng agent.
- **Dynamic Tool Selection**: Pagsamahin ang RAG sa mga paglalarawan ng tool gamit ang tool registration ng MAF upang ipakita lamang ang mga relevant na tool kada query.
- **Multi-Agent Handoff**: Gamitin ang mga edge ng workflow at conditional routing upang iorkestra ang mga handoff sa pagitan ng mga specialized na agent.

## Pagho-host ng LangChain / LangGraph Agents sa Microsoft Foundry

Ang Microsoft Agent Framework ay **framework-interoperable** — hindi ka limitado sa mga agent na nakasulat gamit ang MAF. Kung mayroon ka nang agent na nabuo gamit ang **LangChain** o **LangGraph**, maaari mo itong patakbuhin bilang isang **Microsoft Foundry hosted agent** kaya't pinamahalaan ng Foundry ang runtime, mga sesyon, scaling, identity, at mga endpoint ng protocol para sa iyo, habang nananatili ang iyong logic ng agent sa LangGraph.

Nagagawa ito gamit ang `langchain_azure_ai.agents.hosting` package, na naglalathala ng compiled LangGraph graph sa parehong mga protocol na ginagamit ng mga Foundry hosted agent.

**1. I-install ang hosting extra:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

Ang `hosting` extra ay nag-iinstall ng mga Foundry protocol library: `azure-ai-agentserver-responses` (ang OpenAI-compatible na `/responses` endpoint) at `azure-ai-agentserver-invocations` (ang generic na `/invocations` endpoint).

**2. Pumili ng hosting protocol:**

| Protocol | Host class | Endpoint | Gamitin kung |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Nais mo ng OpenAI-compatible na chat, streaming, response history, at conversation threading — ang inirerekomendang default para sa mga conversational agent. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Kailangan mo ng custom na JSON shape, isang webhook-style na endpoint, o non-conversational processing. |

Dahil ang **Responses API ang pangunahing API para sa agent-style development sa Foundry**, magsimula sa `ResponsesHostServer` para sa karamihan ng mga agent.

**3. I-configure ang mga environment variable** (`az login` muna para makapag-authenticate ang `DefaultAzureCredential`):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Kapag ang agent ay pinatakbo bilang hosted agent sa Foundry, awtomatikong ini-inject ng platform ang `FOUNDRY_PROJECT_ENDPOINT`.

**4. I-expose ang LangGraph agent sa Responses protocol:**

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

    # Ang ChatOpenAI dito ay tumatarget sa OpenAI-compatible (Responses) endpoint ng Foundry project.
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

Patakbuhin ito nang lokal gamit ang `python main.py`, pagkatapos ay magpadala ng Responses request sa `http://localhost:8088/responses`.

**Mga Pangunahing kilos:**

- **Pag-uusap**: Nagpapatuloy ang mga kliyente sa pag-uusap sa pamamagitan ng pagpapasa ng `previous_response_id` o isang `conversation` ID. Kung ang iyong graph ay na-compile gamit ang LangGraph checkpointer, ini-key ng Foundry ang estado ng pag-uusap sa checkpoint (gumamit ng durable checkpointer sa production; tama na ang `MemorySaver` para sa lokal na testing).
- **Human-in-the-loop**: Kung ang iyong graph ay gumagamit ng LangGraph `interrupt()`, inilalantad ng `ResponsesHostServer` ang pending interrupt bilang Responses `function_call` / `mcp_approval_request` item, at nagpapatuloy ang mga kliyente gamit ang tumutugmang `function_call_output` / `mcp_approval_response`.
- **Deployment sa Foundry**: Gamitin ang Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (lokal, nangangailangan ng Docker), pagkatapos `azd provision` at `azd deploy`. Nangangailangan ng **Foundry Project Manager** role ang deployment ng hosted-agent.

Isang runnable na bersyon ng halimbawang ito ay nasa [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Para sa buong walkthrough (Invocations protocol, custom request schemas, at troubleshooting), tingnan ang [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Mga Halimbawa ng Code

Ang mga halimbawa ng code para sa Microsoft Agent Framework ay matatagpuan sa repositoryong ito sa ilalim ng mga file na `xx-python-agent-framework` at `xx-dotnet-agent-framework`.

## May Karagdagan Pang mga Tanong Tungkol sa Microsoft Agent Framework?

Sumali sa [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) upang makipagtagpo sa ibang mga nag-aaral, dumalo sa mga office hours, at masagot ang iyong mga tanong tungkol sa AI Agents.
## Nakaraang Leksiyon

[Memory para sa AI Agents](../13-agent-memory/README.md)

## Susunod na Leksiyon

[Pagbuo ng Computer Use Agents (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->