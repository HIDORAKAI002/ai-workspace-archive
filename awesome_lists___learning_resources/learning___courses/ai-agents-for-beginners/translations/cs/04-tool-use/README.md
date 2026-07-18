[![Jak navrhovat dobré AI agenty](../../../translated_images/cs/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Klikněte na obrázek výše pro zobrazení videa této lekce)_

# Vzor použití nástrojů

Nástroje jsou zajímavé, protože umožňují AI agentům mít širší škálu schopností. Místo toho, aby agent měl omezený soubor akcí, které může provádět, přidáním nástroje může nyní provádět širokou škálu akcí. V této kapitole se podíváme na vzor použití nástrojů, který popisuje, jak AI agenti mohou používat konkrétní nástroje k dosažení svých cílů.

## Úvod

V této lekci se pokusíme zodpovědět následující otázky:

- Co je vzor použití nástrojů?
- Pro jaké případy použití lze vzor aplikovat?
- Jaké jsou prvky/stavební kameny potřebné k implementaci tohoto vzoru?
- Jaká jsou speciální opatření při používání vzoru pro vytvoření důvěryhodných AI agentů?

## Cíle učení

Po dokončení této lekce budete schopni:

- Definovat vzor použití nástrojů a jeho účel.
- Identifikovat případy použití, kde je vzor použití nástrojů použitelný.
- Pochopit klíčové prvky potřebné k implementaci vzoru.
- Rozpoznat opatření potřebná k zajištění důvěryhodnosti AI agentů používajících tento vzor.

## Co je vzor použití nástrojů?

**Vzor použití nástrojů** je zaměřen na dávání schopnosti LLM interagovat s externími nástroji k dosažení konkrétních cílů. Nástroje jsou kód, který může agent spustit k provedení akcí. Nástrojem může být jednoduchá funkce, jako kalkulačka, nebo API volání na službu třetí strany, jako je vyhledávání cen akcií nebo předpověď počasí. V kontextu AI agentů jsou nástroje navrženy k tomu, aby byly spouštěny agenty v reakci na **volání funkcí generovaných modelem**.

## Na jaké případy použití lze vzor aplikovat?

AI agenti mohou využívat nástroje k dokončení složitých úloh, získávání informací nebo k rozhodování. Vzor použití nástrojů se často používá v situacích, které vyžadují dynamickou interakci s externími systémy, jako jsou databáze, webové služby nebo interprety kódu. Tato schopnost je užitečná pro řadu různých případů použití, včetně:

- **Dynamické získávání informací:** Agent může dotazovat externí API nebo databáze pro získání aktuálních dat (např. dotazování do SQLite databáze pro analýzu dat, získání cen akcií nebo informací o počasí).
- **Spouštění a interpretace kódu:** Agent může spouštět kód nebo skripty k řešení matematických problémů, generování reportů nebo provádění simulací.
- **Automatizace pracovních postupů:** Automatizace opakujících se nebo vícestupňových pracovních toků pomocí nástrojů jako plánovače úloh, e-mailových služeb nebo datových pipeline.
- **Zákaznická podpora:** Agent může komunikovat s CRM systémy, ticketingovými platformami nebo znalostními databázemi pro řešení uživatelských dotazů.
- **Generování a úprava obsahu:** Agent může využívat nástroje jako korektory gramatiky, shrnovače textů nebo hodnotitele bezpečnosti obsahu k podpoře tvorby obsahu.

## Jaké prvky/stavební kameny jsou potřeba k implementaci vzoru použití nástrojů?

Tyto stavební kameny umožňují AI agentovi provádět širokou škálu úkolů. Podívejme se na klíčové prvky potřebné k implementaci vzoru použití nástrojů:

- **Schémata funkcí/nástrojů:** Podrobné definice dostupných nástrojů včetně názvu funkce, účelu, požadovaných parametrů a očekávaných výstupů. Tato schémata umožňují LLM pochopit, jaké nástroje jsou dostupné a jak vytvořit platné požadavky.

- **Logika spouštění funkcí:** Řídí, jak a kdy jsou nástroje vyvolávány na základě uživatelova záměru a kontextu konverzace. To může zahrnovat plánovací moduly, směrovací mechanismy nebo podmíněné toky, které dynamicky určují použití nástrojů.

- **Systém zpracování zpráv:** Komponenty, které řídí tok konverzace mezi vstupy uživatele, odpověďmi LLM, voláním nástrojů a výstupy nástrojů.

- **Rámec integrace nástrojů:** Infrastruktura, která propojuje agenta s různými nástroji, ať už jsou to jednoduché funkce nebo složité externí služby.

- **Zpracování chyb a validace:** Mechanismy pro řešení selhání při spouštění nástrojů, validaci parametrů a zpracování neočekávaných odpovědí.

- **Správa stavu:** Sleduje kontext konverzace, předchozí interakce s nástroji a persistentní data, aby bylo zajištěno konzistentní chování napříč více koly interakce.

Dále se podíváme podrobněji na volání funkcí/nástrojů.
 
### Volání funkce/nástroje

Volání funkce je hlavní způsob, jak umožňujeme rozsáhlým jazykovým modelům (LLM) interagovat s nástroji. Často uvidíte 'funkce' a 'nástroj' použité zaměnitelně, protože 'funkce' (bloky znovupoužitelného kódu) jsou 'nástroje', které agenti používají k provádění úkolů. Aby byla funkce kódu vyvolána, musí LLM porovnat uživatelův požadavek s popisem funkcí. K tomu je poslány schéma obsahující popisy všech dostupných funkcí LLM. LLM pak vybere nejvhodnější funkci pro úkol a vrátí její název a argumenty. Vybraná funkce je vyvolána, její odpověď je zaslána zpět LLM, které tuto informaci použije k reakci na uživatelův požadavek.

Pro vývojáře, kteří chtějí implementovat volání funkcí pro agenty, budete potřebovat:

1. LLM model podporující volání funkcí
2. Schéma obsahující popisy funkcí
3. Kód pro každou popsanou funkci

Použijme příklad získání aktuálního času ve městě k ilustraci:

1. **Inicializujte LLM, které podporuje volání funkcí:**

    Ne všechny modely podporují volání funkcí, proto je důležité zkontrolovat, zda LLM, které používáte, toto podporuje.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> podporuje volání funkcí. Můžeme začít inicializací OpenAI klienta vůči Azure OpenAI **Responses API** (stabilní endpoint `/openai/v1/` — není potřeba `api_version`). 

    ```python
    # Inicializujte klienta OpenAI pro Azure OpenAI (API odpovědí, konec bodu v1)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Vytvořte schéma funkce**:

    Dále definujeme JSON schéma obsahující název funkce, popis toho, co funkce dělá, a názvy a popisy parametrů funkce.
    Toto schéma pak předáme klientovi vytvořenému dříve spolu s uživatelovým požadavkem na zjištění času v San Franciscu. Je důležité si uvědomit, že se vrací **volání nástroje**, **nikoli** konečná odpověď na otázku. Jak bylo zmíněno výše, LLM vrací název funkce, kterou si zvolilo pro úkol, a argumenty, které jí budou předány.

    ```python
    # Popis funkce pro model ke čtení (formát nástroje Responses API flat)
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
  
    # Počáteční zpráva uživatele
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # První volání API: Požádejte model, aby použil funkci
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # API odpovědí vrací volání nástrojů jako položky function_call v response.output.
    # Připojte je do konverzace, aby model měl plný kontext v dalším kroku.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Kód funkce potřebný k vykonání úkolu:**

    Jakmile si LLM vybralo, kterou funkci spustit, je nutné implementovat a spustit kód, který úkol vykoná.
    Můžeme implementovat kód pro získání aktuálního času v Pythonu. Také musíme napsat kód, který z response_message získá název funkce a argumenty, aby bylo možné získat konečný výsledek.

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
    # Zpracovat volání funkcí
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Vrátit výsledek nástroje jako položku function_call_output
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Druhý volání API: Získat konečnou odpověď od modelu
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

Volání funkcí je v jádru většiny, ne-li všech, návrhů pro použití nástrojů agentů, nicméně jeho implementace od nuly může být někdy náročná.
Jak jsme se naučili v [Leci 2](../../../02-explore-agentic-frameworks), agentní rámce nám poskytují předpřipravené stavební bloky pro implementaci používání nástrojů.
 
## Příklady použití nástrojů s agentními rámci

Zde jsou některé příklady, jak můžete implementovat vzor použití nástrojů pomocí různých agentních rámců:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> je open-source AI rámec pro stavbu AI agentů. Usnadňuje proces volání funkcí tím, že umožňuje definovat nástroje jako Python funkce s dekorátorem `@tool`. Rámec zajišťuje komunikaci tam a zpět mezi modelem a vaším kódem. Také poskytuje přístup k předpřipraveným nástrojům, jako je Vyhledávání souborů a Interpret kódu prostřednictvím `FoundryChatClient`.

Následující diagram ilustruje proces volání funkcí s Microsoft Agent Framework:

![volání funkcí](../../../translated_images/cs/functioncalling-diagram.a84006fc287f6014.webp)

V Microsoft Agent Framework jsou nástroje definovány jako dekorované funkce. Můžeme převést funkci `get_current_time`, kterou jsme viděli dříve, na nástroj pomocí dekorátoru `@tool`. Rámec automaticky serializuje funkci a její parametry a vytvoří schéma, které se odešle LLM.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Vytvořte klienta
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Vytvořte agenta a spusťte s nástrojem
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> je novější agentní rámec navržený tak, aby umožnil vývojářům bezpečně vytvářet, nasazovat a škálovat vysoce kvalitní a rozšiřitelné AI agenty bez potřeby správy základních výpočetních a skladovacích zdrojů. Je obzvláště užitečný pro podnikové aplikace, protože je plně spravovanou službou s bezpečností na podnikové úrovni.

Ve srovnání s vývojem přímo přes LLM API poskytuje Microsoft Foundry Agent Service několik výhod, včetně:

- Automatické volání nástrojů – není potřeba analyzovat volání nástroje, vyvolávat nástroj a zpracovávat odpověď; vše je nyní zpracováno na straně serveru
- Bezpečně spravovaná data – místo správy vlastního stavu konverzace se můžete spolehnout na vlákna, která ukládají všechny potřebné informace
- Nástroje připravené k použití – nástroje, které můžete použít k interakci se svými datovými zdroji, jako jsou Bing, Azure AI Search a Azure Functions.

Nástroje dostupné v Microsoft Foundry Agent Service lze rozdělit do dvou kategorií:

1. Nástroje znalostí:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Základ s Bing vyhledáváním</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Vyhledávání souborů</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Akční nástroje:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Volání funkcí</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Interpret kódu</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">Nástroje definované pomocí OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Agent Service nám umožňuje používat tyto nástroje společně jako `toolset`. Také využívá `vlákna`, která sledují historii zpráv z konkrétní konverzace.

Představte si, že jste obchodní zástupce ve firmě Contoso. Chcete vytvořit konverzačního agenta, který dokáže odpovídat na otázky o vašich prodejních datech.

Následující obrázek ilustruje, jak byste mohli použít Microsoft Foundry Agent Service k analýze vašich prodejních dat:

![Agent Service v akci](../../../translated_images/cs/agent-service-in-action.34fb465c9a84659e.webp)

Pro použití jakéhokoli z těchto nástrojů se službou můžeme vytvořit klienta a definovat nástroj nebo sadu nástrojů. K praktické implementaci můžeme použít následující Python kód. LLM bude moci nahlédnout na toolset a rozhodnout se, zda použije uživatelem vytvořenou funkci `fetch_sales_data_using_sqlite_query`, nebo předpřipravený Code Interpreter v závislosti na uživatelském požadavku.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # funkce fetch_sales_data_using_sqlite_query, kterou najdete v souboru fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Inicializovat sadu nástrojů
toolset = ToolSet()

# Inicializovat agenta volajícího funkce s funkcí fetch_sales_data_using_sqlite_query a přidat ho do sady nástrojů
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Inicializovat nástroj interpret kódu a přidat ho do sady nástrojů.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Jaká jsou speciální opatření pro použití vzoru použití nástrojů při tvorbě důvěryhodných AI agentů?

Častým problémem je bezpečnost SQL dynamicky generovaného LLM, zvláště riziko SQL injection nebo škodlivých akcí, jako je mazání či manipulace s databází. Ačkoliv jsou tyto obavy oprávněné, lze je účinně zmírnit správnou konfigurací přístupových oprávnění k databázi. U většiny databází to znamená nastavení databáze jako pouze pro čtení. Pro databázové služby jako PostgreSQL nebo Azure SQL by aplikace měla mít přiřazenou roli pouze pro čtení (SELECT).

Spuštění aplikace v zabezpečeném prostředí dále zvyšuje ochranu. V podnikových scénářích jsou data obvykle extrahována a transformována z provozních systémů do databáze nebo datového skladu pouze pro čtení s uživatelsky přívětivým schématem. Tento přístup zajistí, že data jsou bezpečná, optimalizovaná pro výkon a dostupnost a aplikace má omezený přístup pouze pro čtení.

## Vzorové kódy

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Máte další otázky ohledně vzoru použití nástrojů?

Přidejte se k [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D), kde se setkáte s dalšími studenty, zúčastníte se konzultačních hodin a získáte odpovědi na své otázky o AI agentech.

## Další zdroje

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service Workshop</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Multi-Agent Workshop</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Přehled Microsoft Agent Framework</a>


## Základní testování agenta (volitelné)

Poté, co se naučíte nasazovat agenty v [Lekci 16](../16-deploying-scalable-agents/README.md), můžete základně otestovat `TravelToolAgent` z této lekce (volá stále své nástroje a odpovídá?) pomocí [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Viz [`tests/README.md`](../tests/README.md) pro informace o tom, jak tento test spustit.

## Předchozí lekce

[Pochopení agentních návrhových vzorů](../03-agentic-design-patterns/README.md)

## Následující lekce

[Agentní RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->