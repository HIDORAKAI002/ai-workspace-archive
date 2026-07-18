# Kuchunguza Mfumo wa Wakala wa Microsoft

![Agent Framework](../../../translated_images/sw/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Utangulizi

Somo hili litajumuisha:

- Kuelewa Mfumo wa Wakala wa Microsoft: Sifa Muhimu na Thamani  
- Kuchunguza Misingi Muhimu ya Mfumo wa Wakala wa Microsoft
- Mifumo ya Juu ya MAF: Mifumo ya Kazi, Middleware, na Kumbukumbu

## Malengo ya Kujifunza

Baada ya kumaliza somo hili, utajua jinsi ya:

- Kujenga Wakala wa AI Tayari kwa Uzalishaji ukitumia Mfumo wa Wakala wa Microsoft
- Kutumia sifa kuu za Mfumo wa Wakala wa Microsoft kwa Matukio yako ya Matumizi ya Wakala
- Kutumia mifumo ya juu ikiwemo mifumo ya kazi, middleware, na uangalizi

## Sampuli za Nambari 

Sampuli za nambari za [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) zinaweza kupatikana katika hifadhidata hii chini ya faili za `xx-python-agent-framework` na `xx-dotnet-agent-framework`.

## Kuelewa Mfumo wa Wakala wa Microsoft

![Framework Intro](../../../translated_images/sw/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) ni mfumo wa pamoja wa Microsoft wa kujenga mawakala wa AI. Hutolewa kwa kubadilika kuendana na aina mbalimbali za matukio ya matumizi ya mawakala yanayoonekana katika mazingira ya uzalishaji na utafiti ikiwa ni pamoja na:

- **Uendeshaji wa Wakala kwa Mfuatano** katika hali ambapo taratibu ya hatua kwa hatua zinahitajika.
- **Uendeshaji Wakati Mmoja** katika hali ambapo mawakala wanahitaji kumaliza kazi kwa wakati mmoja.
- **Uendeshaji wa Mazungumzo ya Kikundi** katika hali ambapo mawakala wanaweza kushirikiana pamoja kwenye kazi moja.
- **Uendeshaji wa Kupeana Kazi** katika hali ambapo mawakala wanapassisha kazi kwa kila mmoja wanapokamilisha sehemu ndogo za kazi.
- **Uendeshaji wa Kiwango cha Mstari** katika hali ambapo wakala meneja huunda na kubadilisha orodha ya kazi na kushughulikia uratibu wa mawakala ndogo kukamilisha kazi.

Ili kutoa Wakala wa AI katika Uzalishaji, MAF pia ina sifa za:

- **Uangalizi** kupitia matumizi ya OpenTelemetry ambapo kila kitendo cha Wakala wa AI ikiwa ni pamoja na kuitwa kwa zana, hatua za uendeshaji, mtiririko wa hoja na ufuatiliaji wa utendaji kupitia dashibodi za Microsoft Foundry.
- **Usalama** kwa kuwa mwenyeji wa mawakala moja kwa moja kwenye Microsoft Foundry ambayo ni pamoja na udhibiti wa usalama kama ufikiaji kwa misingi ya kazi, usimamizi wa data binafsi na usalama wa yaliyomo yaliyojengwa ndani.
- **Ustahimilivu** kwani midundu na mifumo ya wakala inaweza kusitishwa, kuendelea na kupona kutoka kwa makosa ambayo huruhusu michakato inayokaa kwa muda mrefu.
- **Udhibiti** kwani mifumo ya mtu katika mzunguko inasaidiwa ambapo kazi zinatambulika kuwa zinahitaji idhini ya mtu.

Mfumo wa Wakala wa Microsoft pia unalenga kuwa wa kuingiliana kwa:

- **Kutokuwa Tegemezi la Wingu moja** - Wakala wanaweza kuendesha kwenye kontena, on-prem na katika mawingu mbalimbali tofauti.
- **Kutokuwa Tegemezi la Mtoa Huduma** - Wakala wanaweza kuundwa kupitia SDK unayopendelea ikiwa ni pamoja na Azure OpenAI na OpenAI
- **Kuingiza Viwango vya Wazi** - Wakala wanaweza kutumia itifaki kama Agent-to-Agent (A2A) na Model Context Protocol (MCP) kugundua na kutumia mawakala na zana nyingine.
- **Viambatisho na Vifunguo** - Uunganisho unaweza kufanywa kwa huduma za data na kumbukumbu kama Microsoft Fabric, SharePoint, Pinecone na Qdrant.

Hebu tuangalie jinsi sifa hizi zinavyotekelezwa kwa baadhi ya dhana kuu za Mfumo wa Wakala wa Microsoft.

## Misingi Muhimu ya Mfumo wa Wakala wa Microsoft

### Wakala

![Agent Framework](../../../translated_images/sw/agent-components.410a06daf87b4fef.webp)

**Kuunda Wakala**

Uundaji wa wakala hufanywa kwa kufafanua huduma ya uainishaji (Mtoa Huduma LLM), seti ya maagizo kwa Wakala wa AI kufuata, na `jina` lililopangiwa:


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Huo ulitumia `Azure OpenAI` lakini mawakala wanaweza kuundwa kwa kutumia aina mbalimbali za huduma ikiwa ni pamoja na `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Majibu`, API za `ChatCompletion`

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

au [MiniMax](https://platform.minimaxi.com/), ambayo hutoa API inayolingana na OpenAI na dirisha kubwa za muktadha (hadi tokeni 204K):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

au mawakala wa mbali kwa kutumia itifaki ya A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Kuendesha Wakala**

Wakala huendeshwa kwa kutumia mbinu `.run` au `.run_stream` kwa majibu yasiyo na mtiririko au yanayotiririka.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Kila kuendeshwa kwa wakala pia kunaweza kuwa na chaguzi za kubinafsisha vigezo kama `max_tokens` vinavyotumiwa na wakala, `zana` ambazo wakala anaweza kutumia, na hata `mfano` wenyewe unaotumiwa na wakala.

Hii ni muhimu katika kesi ambapo mifano maalum au zana zinahitajika kukamilisha kazi ya mtumiaji.

**Zana**

Zana zinaweza kufafanuliwa wakati wa kufafanua wakala:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Wakati wa kuunda ChatAgent moja kwa moja

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

na pia wakati wa kuendesha wakala:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Zana iliyotolewa kwa ajili ya mtihani huu pekee )
```

**Midundu ya Wakala**

Midundu ya wakala hutumiwa kushughulikia mazungumzo ya mizunguko mingi. Midundu inaweza kuundwa kwa:

- Kutumia `get_new_thread()` ambayo inaruhusu midundu kuhifadhiwa kwa muda mrefu
- Kuunda midundu moja kwa moja wakati wa kuendesha wakala na midundu kuishi tu wakati wa kuendeshwa kwa sasa.

Kuunda midundu, nambari inaonekana hivi:

```python
# Unda thread mpya.
thread = agent.get_new_thread() # Endesha wakala na thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Kisha unaweza kuhamisha midundu kuhifadhiwa ili kutumika baadaye:

```python
# Unda thread mpya.
thread = agent.get_new_thread() 

# Endesha wakala na thread.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serialize thread kwa ajili ya kuhifadhi.

serialized_thread = await thread.serialize() 

# Fanya deserialize hali ya thread baada ya kupakia kutoka hifadhi.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Middleware ya Wakala**

Wakala huingiliana na zana na LLMs ili kukamilisha kazi za mtumiaji. Katika mazingira fulani, tunataka kutekeleza au kufuatilia kati ya mwingiliano hivi. Middleware ya wakala inaturuhusu kufanya hivi kupitia:

*Middleware ya Kazi*

Middleware hii inatuwezesha kutekeleza kitendo kati ya wakala na kazi/azana atakayotumia. Mfano wa matumizi ni wakati ungetaka kufanya kumbukumbu ya wito wa kazi.

Katika nambari hapa chini `next` inafafanua kama middleware inayofuata au kazi halisi iitwe.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Usindikaji wa awali: Andika kumbukumbu kabla ya utekelezaji wa kazi
    print(f"[Function] Calling {context.function.name}")

    # Endelea kwenye middleware inayofuata au utekelezaji wa kazi
    await next(context)

    # Usindikaji wa baadaye: Andika kumbukumbu baada ya utekelezaji wa kazi
    print(f"[Function] {context.function.name} completed")
```

*Middleware ya Mazungumzo*

Middleware hii inatuwezesha kutekeleza au kurekodi kitendo kati ya wakala na maombi kati ya LLM.

Hii ina taarifa muhimu kama `messages` zinazotumwa kwa huduma ya AI.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Uchakataji wa awali: Kumbukumbu kabla ya kuita AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Endelea kwa middleware au huduma ya AI inayofuata
    await next(context)

    # Uchakataji wa baada: Kumbukumbu baada ya jibu la AI
    print("[Chat] AI response received")

```

**Kumbukumbu ya Wakala**

Kama ilivyoelezwa katika somo la `Kumbukumbu ya Wakala`, kumbukumbu ni kitu muhimu kinacho wawezesha wakala kufanya kazi kwa muktadha tofauti. MAF inatoa aina mbalimbali za kumbukumbu:

*Hifadhi ya Ndani ya Kumbukumbu*

Hii ni kumbukumbu inayohifadhiwa katika midundu wakati wa utekelezaji wa programu.

```python
# Unda uzi mpya.
thread = agent.get_new_thread() # Endesha wakala na uzi huo.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Ujumbe Endelevu*

Kumbukumbu hii hutumiwa kuhifadhi historia ya mazungumzo katika vipindi tofauti. Inafafanuliwa kwa kutumia `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Unda duka la ujumbe la desturi
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Kumbukumbu Inayotumika*

Kumbukumbu hii inaongezwa kwenye muktadha kabla mawakala kuendeshwa. Kumbukumbu hizi zinaweza kuhifadhiwa katika huduma za nje kama mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Kutumia Mem0 kwa uwezo wa kumbukumbu wa hali ya juu
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

**Uangalizi wa Wakala**

Uangalizi ni muhimu katika kujenga mifumo ya wakala ya kuaminika na inayoweza kudumishwa. MAF inaunganishwa na OpenTelemetry kutoa utambulisho na mita kwa uangalizi bora.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # fanya kitu
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Mifumo ya Kazi

MAF hutoa mifumo ya kazi ambayo ni hatua zilizobainishwa awali kukamilisha kazi na kujumuisha mawakala wa AI kama vipengele katika hatua hizo.

Mifumo ya kazi imeundwa na vipengele tofauti vinavyoruhusu mtiririko bora wa udhibiti. Mifumo ya kazi pia inawezesha **uendeshaji wa mawakala wengi** na **kudaima hali** kuhifadhi hali ya mfumo wa kazi.

Vipengele vikuu vya mfumo wa kazi ni:

**Waendeshaji**

Waendeshaji hupokea ujumbe wa ingizo, hufanya kazi zao zilizopangiwa, na kisha hutengeneza ujumbe wa matokeo. Hii hushawishi mfumo wa kazi kuelekea kukamilisha kazi kubwa. Waendeshaji wanaweza kuwa wakala wa AI au mantiki maalum.

**Mikondo**

Mikondo hutumiwa kufafanua mtiririko wa ujumbe katika mfumo wa kazi. Hii inaweza kuwa:

*Mikondo ya Moja kwa Moja* - Uunganisho rahisi wa moja kwa moja kati ya waendeshaji:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Mikondo ya Masharti* - Hutumika baada ya sharti fulani kutimizwa. Kwa mfano, wakati vyumba vya hoteli havipo, mtengezaji anaweza kupendekeza chaguzi nyingine.

*Mikondo ya Kubadili Kesi* - Kupitia ujumbe kwa waendeshaji tofauti kulingana na masharti yaliyobainishwa. Kwa mfano, ikiwa mteja wa usafiri ana upatikanaji wa kipaumbele na kazi zao zitashughulikiwa kupitia mfumo mwingine wa kazi.

*Mikondo ya Mtoaji Kufikia Wengi* - Kutuma ujumbe mmoja kwa malengo mengi.

*Mikondo ya Kupokea Kutoka Wengi* - Kukusanya ujumbe mwingi kutoka kwa waendeshaji tofauti na kutuma kwa lengo moja.

**Matukio**

Ili kutoa uangalizi bora kwenye mifumo ya kazi, MAF hutoa matukio yaliyojengwa ndani kwa utekelezaji ikiwa ni pamoja na:

- `WorkflowStartedEvent`  - Utekelezaji wa mfumo wa kazi unaanza
- `WorkflowOutputEvent` - Mfumo wa kazi hutengeneza matokeo
- `WorkflowErrorEvent` - Mfumo wa kazi unakumbana na kosa
- `ExecutorInvokeEvent`  - Mtegemezi huanza mchakato
- `ExecutorCompleteEvent`  -  Mtegemezi anamaliza mchakato
- `RequestInfoEvent` - Ombi litatolewa

## Mifumo ya Juu ya MAF

Sehemu zilizo juu zinahusu misingi muhimu ya Mfumo wa Wakala wa Microsoft. Unapotengeneza mawakala tata zaidi, hapa kuna mifumo ya juu kuchukulia:

- **Muunganiko wa Middleware**: Mfuatano wa wafanyakazi wa middleware (kumbukumbu, uthibitisho, ukomo wa kiwango) ukitumia middleware ya kazi na mazungumzo kwa udhibiti wa kina wa tabia ya wakala.
- **Kudaima Hali ya Mfumo wa Kazi**: Tumia matukio ya mfumo wa kazi na serialization kuhifadhi na kuendelea na michakato mirefu ya wakala.
- **Uchaguaji wa Zana wa Kijanja**: Changanya RAG juu ya maelezo ya zana na usajili wa zana wa MAF kuonyesha zana zinazohusiana tu kwa kila maombi.
- ** Kupassiana Kazi kwa Wakala Wengi**: Tumia mikondo ya mfumo wa kazi na uelekeo wa masharti kuendeshwa kwa upassaji kati ya mawakala maalum.

## Kusimamia Wakala za LangChain / LangGraph kwenye Microsoft Foundry

Mfumo wa Wakala wa Microsoft ni **mfumo unaoingiliana** — huna mipaka kwa mawakala yaliyoandikwa kwa MAF. Ikiwa tayari una wakala uliojengwa kwa **LangChain** au **LangGraph**, unaweza kuendesha kama **wakala mwenyeji wa Microsoft Foundry** ili Foundry idhibiti wakati wa huduma, vikao, upanuzi, utambulisho, na ncha za itifaki kwako, wakati mantiki ya wakala wako inaendelea kubaki ndani ya LangGraph.

Hii hufanywa kwa kifurushi cha `langchain_azure_ai.agents.hosting`, ambacho kinaonyesha mchoro wa LangGraph uliokusanywa kupitia itifaki zinazotumika na mawakala wenyeji wa Foundry.

**1. Sakinisha kifurushi cha mwenyeji:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

Kifurushi cha `hosting` kinapakua maktaba za itifaki za Foundry: `azure-ai-agentserver-responses` (ncha inayolingana na OpenAI ya `/responses`) na `azure-ai-agentserver-invocations` (ncha ya jumla ya `/invocations`).

**2. Chagua itifaki ya mwenyeji:**

| Itifaki | Darasa la mwenyeji | Ncha | Tumia wakati |
|----------|-----------|----------|----------|
| **Majibu** | `ResponsesHostServer` | `/responses` | Unapotaka mazungumzo yanayolingana na OpenAI, mtiririko, historia ya majibu, na midundu ya mazungumzo — chaguo bora kwa mawakala wa mazungumzo. |
| **Mitoaji** | `InvocationsHostServer` | `/invocations` | Unahitaji muundo wa JSON maalum, ncha ya webhook, au usindikaji usio wa mazungumzo. |

Kwa sababu **API za Majibu ni API kuu kwa maendeleo ya wakala katika Foundry**, anza na `ResponsesHostServer` kwa mawakala wengi.

**3. Sanidi vigezo vya mazingira** (`az login` kwanza ili `DefaultAzureCredential` iweze kuthibitisha):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Wakala itakayendeshwa baadaye kama wakala mwenyeji katika Foundry, jukwaa hutoa `FOUNDRY_PROJECT_ENDPOINT` moja kwa moja.

**4. Tangaza wakala wa LangGraph kupitia itifaki ya Majibu:**

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

    # ChatOpenAI hapa inalenga kwenye daraja la mradi wa Foundry linaloendana na OpenAI (Majibu).
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

Iendeshe mahali hapo kwa `python main.py`, kisha tuma ombi la Majibu kwa `http://localhost:8088/responses`.

**Tabia kuu:**

- **Mazungumzo**: Wateja wanaendelea na mazungumzo kwa kupeleka `previous_response_id` au kitambulisho cha `conversation`. Ikiwa mchoro wako umeunganishwa na kidhibiti cha LangGraph, Foundry hubandika hali ya mazungumzo kwa kidhibiti (tumia kidhibiti cha kudumu katika uzalishaji; `MemorySaver` ni nzuri kwa mtihani wa ndani).
- **Mtu Katikati ya mzunguko**: Ikiwa mchoro wako unatumia `interrupt()` ya LangGraph, `ResponsesHostServer` inaonyesha kusitisha kinachoendelea kama kipengele cha `function_call` / `mcp_approval_request` cha Majibu, na wateja wanaendelea na `function_call_output` / `mcp_approval_response` zinazolingana.
- **Tangaza kwenye Foundry**: Tumia Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (ndani, inahitaji Docker), kisha `azd provision` na `azd deploy`. Utoaji wa wakala mwenyeji unahitaji nafasi ya **Msimamizi wa Mradi wa Foundry**.

Toleo la kuendesha mfano huu linaishi katika [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Kwa mwendo wote (itifaki za Mitoaji, muundo wa maombi maalum, na utatuzi wa matatizo), ona [Kuwa mwenyeji wa mawakala wa LangGraph kama mawakala wa Foundry](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Sampuli za Nambari 

Sampuli za nambari za Mfumo wa Wakala wa Microsoft zinaweza kupatikana katika hifadhidata hii chini ya faili za `xx-python-agent-framework` na `xx-dotnet-agent-framework`.

## Je, Una Maswali Zaidi Kuhusu Mfumo wa Wakala wa Microsoft?

Jiunge na [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) kutana na wapenzi wengine, hudhuria saa za maofisi na pata majibu kwa maswali yako kuhusu Wakala wa AI.
## Somo Lililopita

[Kumbukumbu kwa Wakala wa AI](../13-agent-memory/README.md)

## Somo Linalofuata

[Kujenga Mawakala wa Matumizi ya Kompyuta (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->