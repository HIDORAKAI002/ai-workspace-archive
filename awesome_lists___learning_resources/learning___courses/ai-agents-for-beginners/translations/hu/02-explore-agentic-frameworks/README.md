[![Az MI ügynök keretrendszerek felfedezése](../../../translated_images/hu/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Kattintson a fenti képre, hogy megtekintse a lecke videóját)_

# AI ügynök keretrendszerek felfedezése

Az AI ügynök keretrendszerek olyan szoftverplatformok, amelyeket az AI ügynökök létrehozásának, telepítésének és kezelésének egyszerűsítésére terveztek. Ezek a keretrendszerek előre elkészített komponenseket, absztrakciókat és eszközöket biztosítanak a fejlesztők számára, amelyek leegyszerűsítik a bonyolult AI rendszerek fejlesztését.

Ezek a keretrendszerek segítik a fejlesztőket abban, hogy az alkalmazásaik egyedi aspektusaira összpontosítsanak azáltal, hogy szabványosított megközelítéseket kínálnak az AI ügynök fejlesztésének gyakori kihívásaira. Növelik az AI rendszerek felépítésének skálázhatóságát, elérhetőségét és hatékonyságát.

## Bevezetés 

Ez a lecke a következőket fedi le:

- Mik azok az AI Ügynök Keretrendszerek, és mit tesznek lehetővé a fejlesztők számára?
- Hogyan használhatják a csapatok ezeket az ügynök képességeinek gyors prototípus készítésére, iterálására és fejlesztésére?
- Mik a különbségek a Microsoft által készített keretrendszerek és eszközök között (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> és a <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Közvetlenül integrálhatom a meglévő Azure ökoszisztéma eszközeimet, vagy különálló megoldásokat kell használnom?
- Mi az a Microsoft Foundry Agent Service, és hogyan segít nekem?

## Tanulási célok

Ennek a leckének a célja, hogy segítsen megérteni:

- Az AI Ügynök Keretrendszerek szerepét az AI fejlesztésben.
- Hogyan lehet kihasználni az AI Ügynök Keretrendszereket intelligens ügynökök létrehozásához.
- Az AI Ügynök Keretrendszerek által biztosított kulcsfontosságú képességek.
- A Microsoft Agent Framework és a Microsoft Foundry Agent Service közötti különbségek.

## Mik azok az AI Ügynök Keretrendszerek, és mit tesznek lehetővé a fejlesztők számára?

A hagyományos AI keretrendszerek segíthetnek az AI alkalmazásba integrálásában és az alábbi módokon teszik jobbá ezeket az alkalmazásokat:

- **Személyre szabás**: Az AI képes elemezni a felhasználói viselkedést és preferenciákat, hogy személyre szabott ajánlásokat, tartalmakat és élményeket nyújtson.
Példa: Az olyan streaming szolgáltatások, mint a Netflix, AI-t használnak, hogy mozifilmeket és műsorokat javasoljanak a megtekintési előzmények alapján, növelve ezzel a felhasználói elkötelezettséget és elégedettséget.
- **Automatizálás és hatékonyság**: Az AI képes automatizálni az ismétlődő feladatokat, egyszerűsíteni a munkafolyamatokat és javítani a hatékonyságot.
Példa: Az ügyfélszolgálati alkalmazások AI-alapú chatbotokat használnak a gyakori kérdések kezelésére, csökkentve a válaszidőket és felszabadítva az emberi ügynököket összetettebb problémák kezelésére.
- **Fokozott felhasználói élmény**: Az AI javíthatja az általános felhasználói élményt intelligens funkciók révén, mint a hangfelismerés, természetes nyelvfeldolgozás és prediktív szövegbevitel.
Példa: A Siri és a Google Assistant virtuális asszisztensek AI-t használnak a hangparancsok megértésére és válaszadására, megkönnyítve ezzel a felhasználók számára az eszközeikkel való interakciót.

### Ez mind nagyszerűen hangzik, de akkor miért van szükség az AI Ügynök Keretrendszerre?

Az AI ügynök keretrendszerek többet jelentenek, mint egyszerű AI keretrendszerek. Olyan intelligens ügynökök létrehozását teszik lehetővé, amelyek képesek felhasználókkal, más ügynökökkel és a környezettel interakcióba lépni meghatározott célok elérése érdekében. Ezek az ügynökök autonóm viselkedést tanúsíthatnak, döntéseket hozhatnak és alkalmazkodhatnak a változó körülményekhez. Tekintsünk néhány kulcsfontosságú képességet, amelyeket az AI Ügynök Keretrendszerek biztosítanak:

- **Ügynökök közötti együttműködés és koordináció**: Több AI ügynök létrehozását teszi lehetővé, amelyek együtt dolgoznak, kommunikálnak és koordinálnak összetett feladatok megoldására.
- **Feladat automatizálás és kezelés**: Mechanizmusokat biztosít a többlépéses munkafolyamatok automatizálására, feladatdelegálásra és dinamikus feladatmenedzsmentre az ügynökök között.
- **Kontextusértés és alkalmazkodás**: Olyan képességekkel látja el az ügynököket, hogy megértsék a kontextust, alkalmazkodjanak a változó környezethez és valós idejű információk alapján hozzanak döntéseket.

Összefoglalva, az ügynökök lehetővé teszik, hogy többet tegyünk, új szintre emeljük az automatizálást, és intelligensebb rendszereket hozzunk létre, amelyek alkalmazkodnak és tanulnak a környezetükből.

## Hogyan készíthetünk gyorsan prototípust, iterálhatunk és fejleszthetjük az ügynök képességeit?

Ez egy gyorsan változó terület, de vannak olyan közös elemek a legtöbb AI Ügynök Keretrendszerben, amelyek segítik a gyors prototípus készítést és iterációt, nevezetesen moduláris komponensek, együttműködési eszközök és valós idejű tanulás. Nézzük meg ezeket részletesebben:

- **Használj moduláris komponenseket**: Az AI SDK-k előre elkészített komponenseket kínálnak, például AI és memória csatlakozókat, természetes nyelvű vagy kód bővítmények segítségével történő függvényhívást, prompt sablonokat és továbbiakat.
- **Használj együttműködési eszközöket**: Tervezd meg az ügynököket specifikus szerepkörökkel és feladatokkal, lehetővé téve számukra az együttműködéses munkafolyamatok tesztelését és finomítását.
- **Tanulj valós időben**: Valósíts meg visszacsatolási hurkokat, ahol az ügynökök az interakciókból tanulnak és dinamikusan igazítják viselkedésüket.

### Használj moduláris komponenseket

Olyan SDK-k, mint a Microsoft Agent Framework, előre elkészített komponenseket kínálnak, például AI csatlakozókat, eszközdefiníciókat és ügynökmenedzsmentet.

**Hogyan használhatják a csapatok ezeket**: A csapatok gyorsan összerakhatják ezeket a komponenseket működő prototípus létrehozásához, anélkül, hogy nulláról kellene kezdeniük, ami gyors kísérletezést és iterációt tesz lehetővé.

**Hogyan működik ez a gyakorlatban**: Használhatsz előre elkészített elemzőt (parsert) a felhasználói bemenetből információk kinyerésére, egy memória modult az adatok tárolására és előhívására, valamint egy prompt generátort a felhasználókkal való interakcióhoz, mindezt anélkül, hogy ezeket a komponenseket nulláról kellene megépíteni.

**Példakód**. Nézzünk egy példát arra, hogyan használhatod a Microsoft Agent Framework-öt a `FoundryChatClient`-tel, hogy a modell válaszoljon a felhasználói bemenetre eszközhívással:

``` python
# Microsoft Agent Framework Python példa

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Mintafunkció definiálása utazásfoglaláshoz
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # Példa kimenet: Az 2025. január 1-jei New York-i járatát sikeresen lefoglaltuk. Jó utat! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Ebből a példából látható, hogyan használhatsz előre elkészített elemzőt kulcsinformációk kinyerésére a felhasználói bemenetből, például egy repülőjegy foglalási kérés eredetét, célállomását és dátumát. Ez a moduláris megközelítés lehetővé teszi, hogy a magas szintű logikára koncentrálj.

### Használj együttműködési eszközöket

Olyan keretrendszerek, mint a Microsoft Agent Framework, támogatják több ügynök létrehozását, amelyek együtt tudnak dolgozni.

**Hogyan használhatják a csapatok ezeket**: A csapatok tervezhetnek ügynököket specifikus szerepekkel és feladatokkal, lehetővé téve a kollaboratív munkafolyamatok tesztelését és finomítását, valamint a rendszer általános hatékonyságának javítását.

**Hogyan működik ez a gyakorlatban**: Létrehozhatsz egy ügynök csapatot, ahol minden ügynök specializált funkciót lát el, például adatlekérést, elemzést vagy döntéshozatalt. Ezek az ügynökök kommunikálhatnak és megoszthatják az információkat, hogy egy közös célt érjenek el, például egy felhasználói kérdés megválaszolását vagy egy feladat elvégzését.

**Példakód (Microsoft Agent Framework)**:

```python
# Több ügynök létrehozása, amelyek együtt dolgoznak a Microsoft Agent Framework használatával

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Adatlekérdező ügynök
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Adat elemző ügynök
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Ügynökök egymás utáni futtatása egy feladaton
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

A fenti kódból látható, hogyan hozhatsz létre egy olyan feladatot, amelyben több ügynök működik együtt adatokat elemezve. Minden ügynök egy meghatározott funkciót végez el, és a feladatot úgy hajtják végre, hogy koordinálják az ügynököket a kívánt eredmény eléréséhez. Az ilyen típusú, specializált szerepek betöltése javítja a feladat hatékonyságát és teljesítményét.

### Tanulás valós időben

A fejlettebb keretrendszerek valós idejű kontextusértést és alkalmazkodást is lehetővé tesznek.

**Hogyan használhatják a csapatok ezeket**: A csapatok visszacsatolási hurkokat valósíthatnak meg, ahol az ügynökök az interakciókból tanulnak és dinamikusan módosítják a viselkedésüket, ami folyamatos fejlesztést és képességfinomítást eredményez.

**Hogyan működik ez a gyakorlatban**: Az ügynökök elemezhetik a felhasználói visszajelzéseket, a környezeti adatokat és a feladatok eredményeit, hogy frissítsék tudásbázisukat, módosítsák döntéshozatali algoritmusaikat és idővel javítsák teljesítményüket. Ez az ismétlődő tanulási folyamat lehetővé teszi, hogy az ügynökök alkalmazkodjanak a változó körülményekhez és a felhasználói preferenciákhoz, ezáltal növelve a rendszer hatékonyságát.

## Mik a különbségek a Microsoft Agent Framework és a Microsoft Foundry Agent Service között?

Sokféleképpen összehasonlíthatjuk ezeket a megközelítéseket, de nézzük meg néhány kulcsfontosságú különbséget a tervezésük, képességeik és célzott felhasználási esetek szempontjából:

## Microsoft Agent Framework (MAF)

A Microsoft Agent Framework egy egyszerűsített SDK-t biztosít AI ügynökök építéséhez `FoundryChatClient` használatával. Lehetővé teszi a fejlesztők számára, hogy olyan ügynököket hozzanak létre, amelyek Azure OpenAI modelleket használnak beépített eszközhívással, beszélgetéskezeléssel és vállalati szintű biztonsággal az Azure identitáson keresztül.

**Felhasználási esetek**: Éles környezetbe kész AI ügynökök építése eszközhasználattal, több lépéses munkafolyamatokkal és vállalati integrációs forgatókönyvekkel.

Íme néhány fontos alapfogalom a Microsoft Agent Frameworkből:

- **Ügynökök**. Egy ügynököt a `FoundryChatClient` segítségével hoznak létre, és konfigurálják névvel, utasításokkal és eszközökkel. Az ügynök képes:
  - **Feldolgozni a felhasználói üzeneteket** és válaszokat generálni Azure OpenAI modellek segítségével.
  - **Automatikusan hívni eszközöket** a beszélgetés kontextusa alapján.
  - **Fenntartani a beszélgetés állapotát** több interakció során.

  Íme egy kódrészlet, amely bemutatja, hogyan lehet egy ügynököt létrehozni:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **Eszközök**. A keretrendszer támogatja eszközök definiálását Python függvényekként, amelyeket az ügynök automatikusan használhat. Az eszközök regisztrálása az ügynök létrehozásakor történik:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **Több ügynök közötti koordináció**. Több, különböző specializációval rendelkező ügynök is létrehozható és koordinálható:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Azure identitási integráció**. A keretrendszer a `AzureCliCredential` (vagy `DefaultAzureCredential`) használatával biztosít kulcs nélküli biztonságos hitelesítést, ezzel megszüntetve az API kulcsok közvetlen kezelésének szükségességét.

## Microsoft Foundry Agent Service

A Microsoft Foundry Agent Service egy újabb szolgáltatás, amelyet a Microsoft Ignite 2024-en mutattak be. Lehetővé teszi AI ügynökök fejlesztését és telepítését rugalmasabb modellekkel, mint például közvetlen hívás nyílt forráskódú LLM-ekhez, mint a Llama 3, Mistral és Cohere.

A Microsoft Foundry Agent Service erősebb vállalati biztonsági mechanizmusokat és adatkezelési módszereket kínál, így alkalmas vállalati alkalmazásokhoz.

Zökkenőmentesen működik a Microsoft Agent Framework-kel az ügynökök építéséhez és telepítéséhez.

Ez a szolgáltatás jelenleg nyilvános előnézetben van, támogatja a Pythont és a C#-ot az ügynökök építéséhez.

A Microsoft Foundry Agent Service Python SDK segítségével létrehozhatunk egy ügynököt felhasználó által definiált eszközzel:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Eszközfunkciók meghatározása
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### Alapfogalmak

A Microsoft Foundry Agent Service a következő alapfogalmakkal rendelkezik:

- **Ügynök**. A Microsoft Foundry Agent Service integrálódik a Microsoft Foundry-val. A Microsoft Foundry-n belül egy AI Ügynök "okos" mikroszolgáltatásként működik, amely kérdések megválaszolására (RAG), cselekvések végrehajtására vagy teljes munkafolyamatok automatizálására használható. Ezt úgy éri el, hogy összekapcsolja a generatív AI modellek erejét olyan eszközökkel, amelyek hozzáférést és interakciót tesznek lehetővé valós adatforrásokkal. Íme egy példa egy ügynökre:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    Ebben a példában egy ügynököt hoznak létre `gpt-4.1-mini` modellel, `my-agent` névvel és azzal az utasítással, hogy „Te egy segítőkész ügynök vagy”. Az ügynök felszerelt eszközökkel és erőforrásokkal kód értelmezési feladatok végrehajtásához.

- **Szál és üzenetek**. A szál egy másik fontos fogalom. Egy szál egy beszélgetést vagy interakciót jelöl egy ügynök és egy felhasználó között. A szálakat a beszélgetés előrehaladásának nyomon követésére, kontextus információk tárolására, valamint az interakció állapotának kezelésére használják. Íme egy példa egy szálra:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Kérd meg az ügynököt, hogy végezzen munkát a szálon
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Lekérdezd és naplózd az összes üzenetet, hogy lásd az ügynök válaszát
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    Az előző kódban egy szálat hoznak létre. Ezt követően egy üzenetet küldenek a szálnak. A `create_and_process_run` hívásával az ügynököt megkérik, hogy dolgozzon a szálon. Végül az üzeneteket lekérik és naplózzák, hogy lássák az ügynök válaszát. Az üzenetek jelezik a beszélgetés előrehaladását a felhasználó és az ügynök között. Fontos megérteni, hogy az üzenetek különböző típusúak lehetnek, például szöveg, kép vagy fájl, ami azt jelenti, hogy az ügynök munkája eredményeként például egy kép vagy szöveges válasz jött létre. Fejlesztőként ezt az információt tovább feldolgozhatod, vagy megjelenítheted a felhasználó számára.

- **Integráció a Microsoft Agent Framework-kel**. A Microsoft Foundry Agent Service zökkenőmentesen együttműködik a Microsoft Agent Framework-kel, ami azt jelenti, hogy ügynököket hozhatsz létre a `FoundryChatClient` használatával, és telepítheted őket az Agent Service-en keresztül éles környezetben.

**Felhasználási esetek**: A Microsoft Foundry Agent Service olyan vállalati alkalmazások számára készült, amelyek biztonságos, skálázható és rugalmas AI ügynök telepítést igényelnek.

## Mi a különbség ezek a megközelítések között?
 
Habár átfedés látszik, mégis vannak kulcsfontosságú különbségek a tervezés, képességek és célfelhasználások terén:
 
- **Microsoft Agent Framework (MAF)**: Ez egy éles környezetbe kész SDK AI ügynökök építéséhez. Egyszerűsített API-t biztosít eszközhívással, beszélgetéskezeléssel és Azure identitás integrációval.
- **Microsoft Foundry Agent Service**: Ez egy platform és telepítési szolgáltatás a Microsoft Foundry-ban ügynökök számára. Beépített kapcsolatot kínál olyan szolgáltatásokhoz, mint az Azure OpenAI, Azure AI Search, Bing Search és kódvégrehajtás.
 
Még mindig bizonytalan, melyiket válaszd?

### Felhasználási esetek
 
Nézzük meg, hogyan segíthetünk néhány gyakori felhasználási eset áttekintésével:
 
> K: Éles környezetben használható AI ügynököket építek, és gyorsan szeretnék elkezdeni.
>

>V: A Microsoft Agent Framework kiváló választás. Egyszerű, Pythonos API-t kínál a `FoundryChatClient`-en keresztül, amellyel néhány sor kóddal definiálhatók az ügynökök eszközökkel és utasításokkal.

>K: Vállalati szintű telepítésre van szükségem Azure integrációkkal, mint a Search és kódvégrehajtás.
>
> V: A Microsoft Foundry Agent Service a legmegfelelőbb. Ez egy platform szolgáltatás, amely beépített képességeket nyújt több modellhez, Azure AI Search-hoz, Bing Search-hoz és Azure Functions-hoz. Könnyű létrehozni ügynököket a Foundry Portálon és skálázva telepíteni őket.
 
> K: Még mindig bizonytalan vagyok, csak adj egy opciót.
>
> V: Kezdd a Microsoft Agent Framework-kel az ügynökök építéséhez, majd használd a Microsoft Foundry Agent Service-t, amikor élesben kell telepíteni és skálázni őket. Ez a megközelítés lehetővé teszi a gyors iterációt az ügynök logikán, miközben világos utat ad a vállalati telepítéshez.
 
Foglaljuk össze a kulcsfontosságú különbségeket egy táblázatban:

| Keretrendszer | Fókusz | Alapfogalmak | Felhasználási esetek |
| --- | --- | --- | --- |
| Microsoft Agent Framework | Egyszerűsített ügynök SDK eszközhívással | Ügynökök, Eszközök, Azure Identitás | AI ügynökök építése, eszközhasználat, több lépéses munkafolyamatok |
| Microsoft Foundry Agent Service | Rugalmas modellek, vállalati biztonság, kódgenerálás, eszközhívás | Modularitás, Együttműködés, Folyamat-orchestration | Biztonságos, skálázható és rugalmas AI ügynök telepítés |

## Közvetlenül integrálhatom a meglévő Azure ökoszisztéma eszközeimet, vagy különálló megoldásokat kell használnom?


A válasz igen, közvetlenül integrálhatja meglévő Azure ökoszisztéma eszközeit a Microsoft Foundry Agent Service szolgáltatással, különösen azért, mert úgy lett kialakítva, hogy zökkenőmentesen működjön más Azure szolgáltatásokkal. Például integrálhatja a Binget, az Azure AI Search-t és az Azure Functionst. Emellett mély integráció van a Microsoft Foundry-val.

A Microsoft Agent Framework szintén integrálódik az Azure szolgáltatásokkal a `FoundryChatClient` és az Azure identitás révén, lehetővé téve, hogy közvetlenül hívjon Azure szolgáltatásokat az ügynök eszközeiről.

## Minta kódok

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## További kérdései vannak az AI Agent Framework-ök kapcsán?

Csatlakozzon a [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) közösséghez, hogy találkozzon más tanulókkal, részt vegyen ügyfélfogadáson és választ kapjon AI Agent kérdéseire.

## Hivatkozások

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Előző lecke

[Bevezetés az AI ügynökökhöz és azok használati eseteihez](../01-intro-to-ai-agents/README.md)

## Következő lecke

[Az agentikus tervezési minták megértése](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->