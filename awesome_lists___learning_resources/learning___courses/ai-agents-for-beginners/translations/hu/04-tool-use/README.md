[![Hogyan tervezzünk jó MI ügynököket](../../../translated_images/hu/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Kattints a fenti képre a lecke videójának megtekintéséhez)_

# Eszközhasználati Tervezési Minta

Az eszközök azért érdekesek, mert lehetővé teszik, hogy az MI ügynökök szélesebb képességtartománnyal rendelkezzenek. Annak helyett, hogy az ügynöknek korlátozott számú művelete lenne, egy eszköz hozzáadásával az ügynök most már széles körű műveleteket tud végrehajtani. Ebben a fejezetben megvizsgáljuk az Eszközhasználati Tervezési Mintát, amely leírja, hogyan használhatnak az MI ügynökök specifikus eszközöket céljaik eléréséhez.

## Bevezetés

Ebben a leckében a következő kérdésekre keressük a választ:

- Mi az eszközhasználati tervezési minta?
- Milyen esetekben alkalmazható?
- Mely elemek/építőkövek szükségesek a tervezési minta megvalósításához?
- Milyen különleges szempontokat kell figyelembe venni az Eszközhasználati Tervezési Minta alkalmazásakor megbízható MI ügynökök építéséhez?

## Tanulási célok

A lecke elvégzése után képes leszel:

- Meghatározni az Eszközhasználati Tervezési Mintát és célját.
- Azonosítani azokat az eseteket, ahol az Eszközhasználati Tervezési Minta alkalmazható.
- Megérteni a tervezési minta megvalósításához szükséges kulcselemeket.
- Felismerni a megfontolásokat a megbízhatóság biztosításához az MI ügynökök eszközhasználatában.

## Mi az Eszközhasználati Tervezési Minta?

Az **Eszközhasználati Tervezési Minta** arra összpontosít, hogy a nagy nyelvi modellek (LLM-ek) képessé váljanak külső eszközökkel való interakcióra egyedi célok elérése érdekében. Az eszközök kódok, amelyeket az ügynök végrehajthat műveletek végrehajtására. Egy eszköz lehet egy egyszerű függvény, mint például egy számológép, vagy egy API hívás egy harmadik féltől származó szolgáltatáshoz, például részvényárfolyam lekérdezés vagy időjárás-előrejelzés. Az MI ügynökök kontextusában az eszközöket úgy tervezték, hogy az ügynökök végrehajthassák azokat **modell által generált függvényhívásokra** válaszul.

## Milyen esetekben alkalmazható?

Az MI ügynökök eszközöket használhatnak összetett feladatok elvégzésére, információ lekérésére vagy döntéshozatalra. Az eszközhasználati tervezési mintát gyakran alkalmazzák olyan helyzetekben, ahol dinamikus interakció szükséges külső rendszerekkel, például adatbázisokkal, webszolgáltatásokkal vagy kódértelmezőkkel. Ez a képesség többféle felhasználási esetben hasznos, úgymint:

- **Dinamikus információ lekérés:** Az ügynökök külső API-kat vagy adatbázisokat kérdezhetnek le friss adatokért (pl. SQLite adatbázis lekérdezés adat elemzéshez, részvényárak vagy időjárás információ lekérése).
- **Kód végrehajtás és értelmezés:** Az ügynökök kódot vagy szkripteket futtathatnak matematikai problémák megoldására, jelentések generálására vagy szimulációk végrehajtására.
- **Munkafolyamat automatizálás:** Ismétlődő vagy többlépcsős munkafolyamatok automatizálása eszközök integrálásával, mint például feladattervezők, e-mail szolgáltatások vagy adatcsatornák.
- **Ügyfélszolgálat:** Az ügynökök kommunikálhatnak CRM rendszerekkel, jegykezelő platformokkal vagy tudásbázisokkal a felhasználói kérdések megoldására.
- **Tartalom generálás és szerkesztés:** Az ügynökök eszközöket használhatnak, mint például nyelvtani ellenőrzők, szöveg összefoglalók vagy tartalombiztonsági értékelők, hogy segítsék a tartalom készítését.

## Melyek az eszközhasználati tervezési minta megvalósításához szükséges elemek/építőkövek?

Ezek az építőkövek lehetővé teszik, hogy az MI ügynök széles körű feladatokat hajtson végre. Nézzük meg az Eszközhasználati Tervezési Minta megvalósításához szükséges kulcselemeket:

- **Függvény/Eszköz sémák**: Részletes definíciók az elérhető eszközökről, beleértve a függvény nevét, célját, szükséges paramétereket és várható kimeneteket. Ezek a sémák lehetővé teszik az LLM számára, hogy megértse, milyen eszközök állnak rendelkezésére és hogyan kell helyes kéréseket összeállítani.

- **Függvény végrehajtási logika**: Szabályozza, mikor és hogyan hívják meg az eszközöket a felhasználó szándéka és a beszélgetési kontextus alapján. Ez magában foglalhat tervező modulokat, útválasztó mechanizmusokat vagy feltételes folyamatokat, amelyek dinamikusan határozzák meg az eszközhasználatot.

- **Üzenetkezelő rendszer**: Olyan komponensek, amelyek kezelik a beszélgetés folyamatát a felhasználói bemenetek, LLM válaszok, eszközhívások és eszköz output között.

- **Eszköz integrációs keretrendszer**: Infrastruktúra, amely összekapcsolja az ügynököt különféle eszközökkel, legyenek azok egyszerű függvények vagy összetett külső szolgáltatások.

- **Hibakezelés és validáció**: Mechanizmusok az eszköz végrehajtási hibáinak kezelésére, paraméterek érvényesítésére és váratlan válaszok kezelésére.

- **Állapotkezelés**: Követi a beszélgetés kontextusát, előző eszközhasználatot és tartós adatokat annak biztosítására, hogy következetesség legyen a többlépcsős interakciók során.

Ezután nézzük meg részletesebben a Függvény/Eszköz hívást.
 
### Függvény/Eszköz hívás

A függvényhívás az alapvető mód, amellyel lehetővé tesszük, hogy a Nagy Nyelvi Modellek (LLM-ek) eszközökkel lépjenek interakcióba. Gyakran használják egymás szinonimájaként a „Függvény” és „Eszköz” kifejezést, mert a „függvények” (újrahasználható kódrészek) azok az “eszközök”, amelyeket az ügynökök a feladatok végrehajtására használnak. Ahhoz, hogy egy függvény kódját végrehajtsák, az LLM-nek össze kell hasonlítania a felhasználó kérését a függvény leírásával. Ehhez egy sémát küldenek az LLM-nek, amely az összes elérhető függvény leírását tartalmazza. Az LLM kiválasztja a feladathoz legmegfelelőbb függvényt, és visszaküldi annak nevét és argumentumait. A kiválasztott függvényt meghívják, a válasza visszakerül az LLM-hez, amely ezt az információt a felhasználó kérdésére adott válasz elkészítéséhez használja.

A fejlesztők számára a függvényhívás megvalósításához az ügynökök esetén szükség van:

1. Egy LLM modellre, amely támogatja a függvényhívást
2. Egy sémára, amely tartalmazza a függvények leírását
3. A kódra minden egyes leírt függvényhez

Vegyünk egy példát a város aktuális idejének lekérésére a bemutatáshoz:

1. **Indítsd el az LLM-et, amely támogatja a függvényhívást:**

    Nem minden modell támogatja a függvényhívást, ezért fontos ellenőrizni, hogy az LLM, amelyet használsz, igen. Az <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> támogatja a függvényhívást. Kezdhetjük az OpenAI kliens inicializálásával az Azure OpenAI **Responses API** (a stabil `/openai/v1/` végpont — nem szükséges `api_version`) felé.

    ```python
    # Inicializálja az OpenAI klienst az Azure OpenAI-hoz (Responses API, v1 végpont)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Hozz létre egy Függvény Sémát**:

    Ezután definiálunk egy JSON sémát, amely tartalmazza a függvény nevét, a függvény leírását, valamint a paraméterek neveit és leírásait.
    Ezt a sémát továbbítjuk a korábban létrehozott kliensnek, a felhasználó „San Francisco idő” lekérdezésével együtt. Fontos megjegyezni, hogy egy **eszközhívás** az, ami visszatér, **nem** a kérdés végső válasza. Ahogy korábban említettük, az LLM visszaadja a feladathoz kiválasztott függvény nevét és az argumentumokat.

    ```python
    # A modell számára olvasható függvényleírás (Válaszok API lapos eszköz formátumban)
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
  
    # Kezdő felhasználói üzenet
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Első API hívás: Kérje a modellt, hogy használja a függvényt
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # A Responses API a tool callokat function_call elemekként adja vissza a response.output-ban.
    # Fűzze hozzá ezeket a beszélgetéshez, hogy a modell rendelkezzen a teljes kontextussal a következő lépésnél.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **A függvénykód a feladat végrehajtásához:**

    Miután az LLM kiválasztotta, melyik függvényt kell futtatni, meg kell valósítani és végrehajtani kell a feladatot ellátó kódot.
    A jelenlegi idő lekéréséhez Pythonban írhatjuk meg a kódot. Szintén szükség lesz kódra, amely kiveszi a függvény nevét és argumentumait a response_message-ből a végső eredmény eléréséhez.

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
    # Függvényhívások kezelése
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Az eszköz eredményének visszaadása function_call_output elemként
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Második API hívás: A modell végső válaszának lekérése
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

A Függvényhívás az ügynök eszközhasználati tervezések szívében áll, de a megvalósítása nulláról néha kihívást jelenthet.
Ahogy a [2. leckében](../../../02-explore-agentic-frameworks) tanultuk, az ügynöki keretrendszerek előre elkészített építőköveket kínálnak az eszközhasználat megvalósításához.
 
## Eszközhasználati példák ügynöki keretrendszerekkel

Íme néhány példa arra, hogyan valósíthatod meg az Eszközhasználati Tervezési Mintát különböző ügynöki keretrendszerek segítségével:

### Microsoft Agent Framework

A <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> egy nyílt forráskódú MI keretrendszer AI ügynökök építéséhez. Egyszerűsíti a függvényhívás használatát azzal, hogy lehetővé teszi eszközök definiálását Python függvényekként `@tool` dekorátorral. A keretrendszer kezeli a kommunikációt a modell és a kód között. Elérhetőek előre elkészített eszközök is, mint a Fájlkereső és Kódértelmező a `FoundryChatClient` használatával.

Az alábbi ábra szemlélteti a függvényhívás folyamatát a Microsoft Agent Framework-kel:

![function calling](../../../translated_images/hu/functioncalling-diagram.a84006fc287f6014.webp)

A Microsoft Agent Framework-ben az eszközök díszített függvényekként vannak definiálva. Az előzőleg látott `get_current_time` függvényt eszközzé alakíthatjuk a `@tool` dekorátor használatával. A keretrendszer automatikusan szériázza a függvényt és paramétereit, létrehozva azt a sémát, amely az LLM-nek küldendő.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Létrehozza az ügyfelet
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Létrehoz egy ügynököt és futtatja az eszközzel
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

A <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> egy újabb ügynöki keretrendszer, amely célja, hogy a fejlesztőket képessé tegye biztonságosan fejleszteni, telepíteni és méretezni magas minőségű, bővíthető MI ügynököket anélkül, hogy az alapvető számítási vagy tárolási erőforrásokat kellene kezelniük. Különösen hasznos vállalati alkalmazásokhoz, mivel teljesen menedzselt szolgáltatás vállalati szintű biztonsággal.

Az LLM API közvetlen fejlesztéséhez képest a Microsoft Foundry Agent Service több előnyt kínál, többek között:

- Automatikus eszközhívás – nem szükséges parsolni az eszközhívást, meghívni az eszközt és kezelni a választ; mindez szerveroldalon történik
- Biztonságosan kezelt adatok – ahelyett, hogy a saját beszélgetési állapotodat kezeled, a szálakra támaszkodhatsz az összes szükséges információ tárolására
- Kézből használható eszközök – olyan eszközök, amelyekkel az adatforrásaiddal léphetsz interakcióba, például Bing, Azure AI Search és Azure Functions.

A Microsoft Foundry Agent Service-ben lévő eszközök két kategóriába sorolhatók:

1. Tudás Eszközök:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing Search alapú alapozás</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Fájlkereső</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Műveleti Eszközök:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Függvényhívás</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Kódértelmező</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI által definiált eszközök</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Az Agent Service lehetővé teszi, hogy ezeket az eszközöket egy `toolset`-ként használjuk együtt. Emellett használ `szálakat`, amelyek nyomon követik az adott beszélgetés üzenettörténetét.

Képzeld el, hogy egy értékesítési ügynök vagy a Contoso nevű cégnél. Egy olyan beszélgető ügynököt szeretnél fejleszteni, amely képes válaszolni kérdésekre az értékesítési adataidról.

A következő kép azt mutatja be, hogyan használhatnád a Microsoft Foundry Agent Service-t az értékesítési adatok elemzésére:

![Agentic Service In Action](../../../translated_images/hu/agent-service-in-action.34fb465c9a84659e.webp)

Bármelyik eszköz használatához a szolgáltatással létrehozhatunk egy klienst és definiálhatunk egy eszközt vagy toolsetet. Ehhez a gyakorlati megvalósításhoz használhatjuk a következő Python kódot. Az LLM képes megvizsgálni a toolsetet, és eldönteni, hogy az általa készített függvényt, `fetch_sales_data_using_sqlite_query`-t használja vagy az előre elkészített Kódértelmezőt a felhasználó kérése alapján.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query függvény, amely a fetch_sales_data_functions.py fájlban található.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Eszközkészlet inicializálása
toolset = ToolSet()

# Függvényhívó ügynök inicializálása a fetch_sales_data_using_sqlite_query függvénnyel és hozzáadása az eszközkészlethez
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Kódértelmező eszköz inicializálása és hozzáadása az eszközkészlethez.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Milyen különleges szempontokat kell figyelembe venni az Eszközhasználati Tervezési Minta alkalmazásakor a megbízható MI ügynökök építéséhez?

Az LLM-ek által dinamikusan generált SQL-lel kapcsolatos gyakori aggodalom a biztonság, különösen az SQL injekció vagy rosszindulatú műveletek, például az adatbázis törlése vagy manipulálása. Bár ezek a félelmek jogosak, hatékonyan mérsékelhetők az adatbázis-hozzáférési engedélyek megfelelő konfigurálásával. A legtöbb adatbázis esetében ez azt jelenti, hogy az adatbázist csak olvasható módban konfiguráljuk. PostgreSQL vagy Azure SQL adatbázis szolgáltatásoknál az alkalmazásnak olvasható (SELECT) szerepkört kell kapnia.

Az alkalmazás biztonságos környezetben való futtatása tovább növeli a védelmet. Vállalati környezetben az adatok általában működési rendszerekből kerülnek kinyerésre és átalakításra egy csak-olvasható adatbázisba vagy adattárházba, felhasználóbarát sémával. Ez a megközelítés biztosítja, hogy az adatok biztonságosak, a teljesítmény és elérhetőség optimalizált, és az alkalmazás korlátozott, olvasható hozzáféréssel rendelkezik.

## Minta Kódok

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## További kérdéseid vannak az Eszközhasználati Tervezési Mintákkal kapcsolatban?

Csatlakozz a [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) szerverhez, hogy találkozz más tanulókkal, részt vehess ügyfélfogadásokon, és választ kapj MI ügynökeiddel kapcsolatos kérdéseidre.

## További források

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service Workshop</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Többügynökös Workshop</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework Áttekintés</a>


## Az Ügynök Gyors Tesztelése (Opcionális)

Miután megtanultad az ügynökök telepítését a [16. leckében](../16-deploying-scalable-agents/README.md), gyors tesztelheted ennek a leckének a `TravelToolAgent` ügynökét (még mindig hívja az eszközeit és válaszol?) a [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) fájl segítségével. A lefuttatás módjáról a [`tests/README.md`](../tests/README.md) fájlban találsz információt.

## Előző Lecke

[Az Ügynöki Tervezési Minták Megértése](../03-agentic-design-patterns/README.md)

## Következő Lecke

[Ügynöki RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->