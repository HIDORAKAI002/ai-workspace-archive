[![Paano Magdisenyo ng Magandang AI Agents](../../../translated_images/tl/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(I-click ang larawan sa itaas upang panoorin ang video ng leksyon na ito)_

# Disenyo ng Paggamit ng Tool

Kawili-wili ang mga tool dahil pinapayagan nila ang mga AI agents na magkaroon ng mas malawak na hanay ng mga kakayahan. Sa halip na ang agent ay may limitadong set ng mga aksyon na maaaring gawin, sa pamamagitan ng pagdagdag ng tool, maaari na ngayong magsagawa ng malawak na hanay ng mga aksyon ang agent. Sa kabanatang ito, titingnan natin ang Tool Use Design Pattern, na naglalarawan kung paano magagamit ng mga AI agents ang mga partikular na tool upang makamit ang kanilang mga layunin.

## Panimula

Sa leksyon na ito, nilalayon naming sagutin ang mga sumusunod na katanungan:

- Ano ang tool use design pattern?
- Ano ang mga kaso ng paggamit kung saan ito maaaring ilapat?
- Ano ang mga elemento/mga bahagi na kailangan upang maipatupad ang design pattern?
- Ano ang mga espesyal na konsiderasyon para sa paggamit ng Tool Use Design Pattern upang bumuo ng mapagkakatiwalaang AI agents?

## Mga Layunin sa Pagkatuto

Pagkatapos makumpleto ang leksyon na ito, magagawa mong:

- Tukuyin ang Tool Use Design Pattern at ang layunin nito.
- Kilalanin ang mga kaso ng paggamit kung saan naaangkop ang Tool Use Design Pattern.
- Unawain ang mga pangunahing elemento na kailangan upang ipatupad ang design pattern.
- Kilalanin ang mga konsiderasyon upang matiyak ang pagkakatiwalaan sa mga AI agents na gumagamit ng design pattern na ito.

## Ano ang Tool Use Design Pattern?

Ang **Tool Use Design Pattern** ay nakatuon sa pagbibigay ng kakayahan sa mga LLM na makipag-ugnayan sa mga panlabas na tool upang makamit ang mga partikular na layunin. Ang mga tool ay code na maaaring patakbuhin ng isang agent upang magsagawa ng mga aksyon. Ang isang tool ay maaaring isang simpleng function tulad ng calculator, o isang API call sa isang third-party na serbisyo tulad ng paghahanap ng presyo ng stock o forecast ng panahon. Sa konteksto ng AI agents, ang mga tool ay idinisenyo upang patakbuhin ng mga agent bilang tugon sa **model-generated function calls**.

## Ano ang mga kaso ng paggamit kung saan ito maaaring ilapat?

Maaaring gamitin ng mga AI Agents ang mga tool upang matapos ang kumplikadong mga gawain, kumuha ng impormasyon, o gumawa ng mga desisyon. Madalas gamitin ang tool use design pattern sa mga senaryo na nangangailangan ng dinamiko na pakikipag-ugnayan sa mga panlabas na sistema, tulad ng mga database, web services, o code interpreters. Mahalaga ito para sa iba't ibang mga kaso ng paggamit kabilang ang:

- **Dinamiko na Pagkuha ng Impormasyon:** Maaaring mag-query ang mga agent sa mga panlabas na API o database upang kumuha ng napapanahong data (halimbawa, pag-query sa SQLite database para sa pagsusuri ng data, pagkuha ng presyo ng stock o impormasyon ng panahon).
- **Pagsasagawa at Pag-interpret ng Code:** Maaaring magsagawa ang mga agent ng code o scripts para lutasin ang mga problemang matematika, gumawa ng mga ulat, o magsagawa ng mga simulasyon.
- **Automation ng Workflow:** Awtomatikong paggawa ng mga paulit-ulit o maraming hakbang na workflow sa pamamagitan ng pag-integrate ng mga tool tulad ng mga task scheduler, email services, o data pipelines.
- **Suporta sa Kostumer:** Maaaring makipag-ugnayan ang mga agent sa mga CRM system, ticketing platform, o knowledge base upang lutasin ang mga tanong ng gumagamit.
- **Paglikha at Pag-edit ng Nilalaman:** Maaaring gamitin ng mga agent ang mga tool tulad ng grammar checker, text summarizer, o mga tool para suriin ang kaligtasan ng nilalaman upang tumulong sa mga gawain sa paggawa ng nilalaman.

## Ano ang mga elemento/mga bahagi na kailangan upang ipatupad ang tool use design pattern?

Pinapayagan ng mga bahaging ito ang AI agent na magsagawa ng malawak na hanay ng mga gawain. Tingnan natin ang mga pangunahing elemento na kailangan upang ipatupad ang Tool Use Design Pattern:

- **Function/Tool Schemas**: Detalyadong mga depinisyon ng mga magagamit na tool, kabilang ang pangalan ng function, layunin, kinakailangang mga parameter, at inaasahang output. Pinapayagan ng mga schema na ito ang LLM na maunawaan kung ano ang mga tool na magagamit at kung paano bumuo ng wastong mga kahilingan.

- **Function Execution Logic**: Namamahala kung paano at kailan tinatawag ang mga tool batay sa layunin ng gumagamit at konteksto ng pag-uusap. Maaaring kabilang dito ang mga planner module, mekanismo ng routing, o mga kundisyunal na daloy na tumutukoy sa paggamit ng tool nang dinamiko.

- **Message Handling System**: Mga bahagi na namamahala sa daloy ng pag-uusap sa pagitan ng mga input ng gumagamit, mga tugon ng LLM, mga tawag sa tool, at mga output ng tool.

- **Tool Integration Framework**: Impraestruktura na kumokonekta sa agent sa iba't ibang tool, mapa-simple man na mga function o komplikadong panlabas na serbisyo.

- **Error Handling & Validation**: Mga mekanismo upang humawak ng mga pagkabigo sa pagsasagawa ng tool, beripikahin ang mga parameter, at pamahalaan ang mga hindi inaasahang tugon.

- **State Management**: Nagtatala ng konteksto ng pag-uusap, mga naunang interaksyon sa tool, at persistenteng data upang matiyak ang konsistensi sa mga multi-turn na interaksyon.

Susunod, tingnan natin nang mas detalyado ang Function/Tool Calling.
 
### Pagpatawag ng Function/Tool

Ang function calling ang pangunahing paraan para pahintulutan ang Malalaking Modelo ng Wika (LLMs) na makipag-ugnayan sa mga tool. Madalas mong makita ang 'Function' at 'Tool' na ginagamit na palitan dahil ang 'functions' (mga bloke ng reusable na code) ay ang mga 'tool' na ginagamit ng mga agent upang isagawa ang mga gawain. Upang mapatakbo ang code ng isang function, kailangan ng LLM na ikumpara ang kahilingan ng gumagamit sa depinisyon ng mga function. Upang magawa ito, isang schema na naglalaman ng mga paglalarawan ng lahat ng magagamit na function ang ipapadala sa LLM. Piliin ng LLM ang pinakaangkop na function para sa gawain at ibabalik ang pangalan nito at mga argument. Tatawagin ang napiling function, ang tugon nito ay ibabalik sa LLM, na gagamit ng impormasyon upang tumugon sa kahilingan ng gumagamit.

Para sa mga developer na magpatupad ng function calling para sa mga agent, kakailanganin mo:

1. Isang modelo ng LLM na sumusuporta sa function calling
2. Isang schema na naglalaman ng mga paglalarawan ng function
3. Ang code para sa bawat inilalarawang function

Gamitin natin ang halimbawa ng pagkuha ng kasalukuyang oras sa isang lungsod upang ipakita:

1. **Simulan ang isang LLM na sumusuporta sa function calling:**

    Hindi lahat ng modelo ay sumusuporta sa function calling, kaya mahalagang tiyakin na ang LLM na ginagamit mo ay sumusuporta nito.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> ay sumusuporta sa function calling. Maaari nating simulan sa pamamagitan ng pag-inisyalisa ng OpenAI client laban sa Azure OpenAI **Responses API** (ang stable na `/openai/v1/` endpoint — hindi kailangan ang `api_version`). 

    ```python
    # I-initialize ang OpenAI client para sa Azure OpenAI (Responses API, v1 endpoint)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Gumawa ng Function Schema**:

    Susunod, magtatakda tayo ng isang JSON schema na naglalaman ng pangalan ng function, paglalarawan ng ginagawa ng function, at mga pangalan at paglalarawan ng mga parameter ng function.
    Ipasa natin ang schema na ito sa client na nilikha kanina, kasama ang kahilingan ng gumagamit upang malaman ang oras sa San Francisco. Mahalaga na tandaan na ang isang **tool call** ang ibinabalik, **hindi** ang pinal na sagot sa tanong. Tulad ng nabanggit kanina, ibinabalik ng LLM ang pangalan ng function na pinili nito para sa gawain, at ang mga argumentong ipapasa dito.

    ```python
    # Paglalarawan ng function para mabasa ng modelo (Format ng Responses API flat tool)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # Paunang mensahe ng gumagamit
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Unang tawag sa API: Hilingin sa modelo na gamitin ang function
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Ibinabalik ng Responses API ang mga tawag sa tool bilang function_call items sa response.output.
    # Idagdag ito sa usapan upang magkaroon ang modelo ng buong konteksto sa susunod na ikot.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Ang code ng function na kinakailangan upang isagawa ang gawain:**

    Ngayong napili na ng LLM kung aling function ang kailangang patakbuhin, kailangang ipatupad at isagawa ang code na nagsasagawa ng gawain.
    Maaari nating ipatupad ang code para makuha ang kasalukuyang oras gamit ang Python. Kailangan din nating isulat ang code para kunin ang pangalan at mga argument mula sa response_message upang makuha ang pinal na resulta.

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # Hawakan ang mga tawag sa function
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Ibalik ang resulta ng tool bilang isang function_call_output item
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Pangalawang tawag sa API: Kunin ang panghuling tugon mula sa modelo
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

Ang Function Calling ay nasa puso ng karamihan, kung hindi sa lahat, na disenyo ng paggamit ng tool ng agent, ngunit maaaring minsan ay hamon ang pag-implementa nito mula sa simula.
Tulad ng natutunan natin sa [Lesson 2](../../../02-explore-agentic-frameworks), nagbibigay ang mga agentic frameworks ng mga pre-built na bahagi upang magamit ang tool.
 
## Mga Halimbawa ng Paggamit ng Tool gamit ang Agentic Frameworks

Narito ang ilang halimbawa kung paano mo maipapatupad ang Tool Use Design Pattern gamit ang iba't ibang agentic frameworks:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> ay isang open-source na AI framework para sa pagbuo ng mga AI agent. Pinapadali nito ang proseso ng paggamit ng function calling sa pamamagitan ng pagpapahintulot na magdeklara ng mga tool bilang mga Python function gamit ang `@tool` decorator. Pinamamahalaan ng framework ang komunikasyon pabalik-balik sa pagitan ng model at ng iyong code. Nagbibigay din ito ng access sa mga pre-built na tool tulad ng File Search at Code Interpreter sa pamamagitan ng `FoundryChatClient`.

Ang sumusunod na diagrama ay nagpapakita ng proseso ng function calling gamit ang Microsoft Agent Framework:

![function calling](../../../translated_images/tl/functioncalling-diagram.a84006fc287f6014.webp)

Sa Microsoft Agent Framework, ang mga tool ay dinideklara bilang mga decorated function. Maaari nating gawing tool ang function na `get_current_time` na nakita natin kanina gamit ang `@tool` decorator. Awtomatikong isinasalaysay ng framework ang function at ang mga parameter nito, na lumilikha ng schema na ipapadala sa LLM.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Gumawa ng kliyente
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Gumawa ng ahente at patakbuhin gamit ang kasangkapan
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> ay isang mas bagong agentic framework na idinisenyo upang bigyan kapangyarihan ang mga developer na ligtas na bumuo, mag-deploy, at mag-scale ng mataas na kalidad, at extensible na mga AI agent nang hindi kailangang pamahalaan ang underlying compute at storage resources. Partikular itong kapaki-pakinabang para sa mga enterprise application dahil ito ay isang fully managed service na may enterprise-grade na seguridad.

Kung ikukumpara sa direktang pag-develop gamit ang LLM API, nagbibigay ang Microsoft Foundry Agent Service ng ilang mga kalamangan, kabilang ang:

- Awtomatikong pagtawag ng tool – hindi na kailangan i-parse ang tool call, tawagin ang tool, at hawakan ang tugon; lahat ng ito ay isinasagawa na sa server-side
- Ligtas na pinamamahalaang data – sa halip na pamahalaan ang sariling estado ng pag-uusap, maaari kang umasa sa mga threads upang iimbak lahat ng impormasyong kailangan mo
- Mga tool na handa nang gamitin – Mga tool na maaari mong gamitin upang makipag-ugnayan sa iyong mga pinagmumulan ng data, tulad ng Bing, Azure AI Search, at Azure Functions.

Maaaring hatiin ang mga tool na magagamit sa Microsoft Foundry Agent Service sa dalawang kategorya:

1. Knowledge Tools:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Grounding gamit ang Bing Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">File Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Action Tools:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Function Calling</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Code Interpreter</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">Mga tool na tinukoy ng OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Pinapayagan tayo ng Agent Service na magamit ang mga tool na ito nang magkakasama bilang isang `toolset`. Ginagamit din nito ang mga `threads` na sumusubaybay sa kasaysayan ng mga mensahe mula sa isang tiyak na pag-uusap.

Isipin mong ikaw ay isang sales agent sa isang kumpanya na tinatawag na Contoso. Nais mong bumuo ng isang conversational agent na maaaring sumagot sa mga tanong tungkol sa iyong sales data.

Ipinapakita ng sumusunod na larawan kung paano mo maaaring gamitin ang Microsoft Foundry Agent Service upang suriin ang iyong sales data:

![Agentic Service In Action](../../../translated_images/tl/agent-service-in-action.34fb465c9a84659e.webp)

Upang magamit ang alinman sa mga tool na ito sa serbisyo, maaari tayong lumikha ng client at magdeklara ng tool o toolset. Upang gawin ito nang praktikal, maaari nating gamitin ang sumusunod na Python code. Magagawa ng LLM na tingnan ang toolset at magpasya kung gagamitin ang user-created na function na `fetch_sales_data_using_sqlite_query`, o ang pre-built Code Interpreter depende sa kahilingan ng gumagamit.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query na function na matatagpuan sa fetch_sales_data_functions.py na file.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# I-initialize ang toolset
toolset = ToolSet()

# I-initialize ang function calling agent gamit ang fetch_sales_data_using_sqlite_query na function at idagdag ito sa toolset
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# I-initialize ang Code Interpreter tool at idagdag ito sa toolset.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Ano ang mga espesyal na konsiderasyon sa paggamit ng Tool Use Design Pattern upang bumuo ng mga mapagkakatiwalaang AI agents?

Isang karaniwang alalahanin sa SQL na dinamiko na ginagawa ng LLMs ay seguridad, lalo na ang panganib ng SQL injection o malisyosong aksyon, tulad ng pagtanggal o pagmamanipula ng database. Bagama't makatwiran ang mga alalahaning ito, maaaring epektibong mapangasiwaan ito sa pamamagitan ng wastong pag-configure ng mga permiso sa pag-access ng database. Para sa karamihan ng mga database, nangangahulugan ito ng pag-configure ng database bilang read-only. Para sa mga database service tulad ng PostgreSQL o Azure SQL, dapat bigyan ang app ng read-only (SELECT) na role.

Ang pagpapatakbo ng app sa isang ligtas na kapaligiran ay lalo pang nagpapalakas ng proteksyon. Sa mga enterprise na senaryo, karaniwang kinukuha at binabago ang data mula sa mga operational system patungo sa isang read-only na database o data warehouse na may user-friendly na schema. Tinitiyak ng pamamaraang ito na ang data ay ligtas, na-optimize para sa performance at accessibility, at ang app ay may limitadong read-only na access.

## Mga Halimbawang Code

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## May Karagdagang Mga Tanong tungkol sa Tool Use Design Patterns?

Sumali sa [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) upang makipagkilala sa ibang mga nag-aaral, dumalo sa office hours, at masagot ang iyong mga tanong tungkol sa AI Agents.

## Karagdagang Mga Sanggunian

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service Workshop</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Multi-Agent Workshop</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework Overview</a>


## Pagsusuri ng Maikling Takbo ng Ahenteng Ito (Opsyonal)

Pagkatapos mong matutunan kung paano mag-deploy ng mga ahente sa [Lesson 16](../16-deploying-scalable-agents/README.md), maaari mong smoke-test ang `TravelToolAgent` ng araling ito (tinatawag pa rin ba nito ang mga tools nito at sumasagot?) gamit ang [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Tingnan ang [`tests/README.md`](../tests/README.md) kung paano ito patakbuhin.

## Nakaraang Aralin

[Pag-unawa sa mga Agentic Design Patterns](../03-agentic-design-patterns/README.md)

## Susunod na Aralin

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->