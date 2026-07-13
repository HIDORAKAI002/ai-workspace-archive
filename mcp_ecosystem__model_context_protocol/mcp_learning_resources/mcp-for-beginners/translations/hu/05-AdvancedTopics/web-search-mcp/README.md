# Lecke: Webes kereső MCP szerver építése

Ebben a fejezetben egy valós AI ügynököt építünk, amely integrálódik külső API-kkal, többféle adat típust kezel, hibákat kezel és több eszközt koordinál – mindezt egy éles környezetbe készült formában. Meg fogod látni:

- **Hitelesítést igénylő külső API-kkal való integráció**
- **Több végpontról származó különféle adattípusok kezelése**
- **Robosztus hibakezelési és naplózási stratégiák**
- **Több eszköz összehangolása egyetlen szerveren belül**

A végére gyakorlati tapasztalatot szerzel a mintákkal és bevált gyakorlatokkal, amelyek elengedhetetlenek a fejlett AI és LLM-alapú alkalmazásokhoz.

## Bevezetés

Ebben a leckében megtanulod, hogyan építs egy fejlett MCP szervert és klienst, amely kibővíti az LLM képességeit valós idejű webes adatokkal a SerpAPI használatával. Ez kritikus készség dinamikus AI ügynökök fejlesztéséhez, amelyekhez naprakész információk érhetők el a webről.

## Tanulási célok

A lecke végére képes leszel:

- Biztonságosan integrálni külső API-kat (például SerpAPI) egy MCP szerverbe
- Több eszközt megvalósítani web-, hírek-, termékkutatás és kérdés-válasz feladatokra
- Strukturált adatokat elemezni és formázni az LLM fogyasztásához
- Hatékonyan kezelni a hibákat és az API hívások korlátait
- Automatizált és interaktív MCP klienseket építeni és tesztelni

## Webes Kereső MCP Szerver

Ebben a részben bemutatjuk a Webes Kereső MCP Szerver architektúráját és funkcióit. Meglátod, hogyan használjuk együtt a FastMCP-t és a SerpAPI-t az LLM képességeinek kibővítéséhez valós idejű webes adatokkal.

### Áttekintés

Ez a megvalósítás négy eszközt tartalmaz, amelyek bemutatják az MCP képességét, hogy többféle, külső API által vezérelt feladatot biztonságosan és hatékonyan kezel:

- **general_search**: Átfogó webes találatokhoz
- **news_search**: Friss címlapokhoz
- **product_search**: E-kereskedelmi adatokhoz
- **qna**: Kérdés-válasz részletekhez

### Jellemzők
- **Kód Példák**: Tartalmaz nyelvspecifikus kódrészleteket Pythonhoz (és könnyen bővíthető más nyelvekre) a kód fókuszok miatt az átláthatóságért

### Python

```python
# A general_search eszköz példamutató használata
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_search():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("general_search", arguments={"query": "open source LLMs"})
            print(result)
```

---

A kliens futtatása előtt hasznos megérteni, mit csinál a szerver. A [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py) fájl implementálja az MCP szervert, amely webes, hírek, termékkutatás és kérdés-válasz eszközöket tesz elérhetővé a SerpAPI integrálásával. Kezeli a bejövő kéréseket, az API hívásokat, elemzi a válaszokat, és strukturált eredményeket ad vissza a kliensnek.

A teljes megvalósítást megtekintheted a [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py) fájlban.

Íme egy rövid példa arra, hogyan definiál és regisztrál egy eszközt a szerver:

### Python Szerver

```python
# server.py (kivonat)
from mcp.server import MCPServer, Tool

async def general_search(query: str):
    # ...megvalósítás...

server = MCPServer()
server.add_tool(Tool("general_search", general_search))

if __name__ == "__main__":
    server.run()
```

---

- **Külső API integráció**: Biztonságos API kulcs és külső kérések kezelése
- **Strukturált adat elemzés**: Az API válaszok átalakítása LLM-barát formátumokra
- **Hibakezelés**: Robosztus hibakezelés megfelelő naplózással
- **Interaktív kliens**: Automatizált tesztek és interaktív tesztelési mód is elérhető
- **Környezet kezelés**: MCP Kontextus használata a naplózáshoz és kéréskövetéshez

## Előfeltételek

Mielőtt elkezdenéd, győződj meg róla, hogy megfelelően beállítottad a környezeted a következő lépések követésével. Ez biztosítja, hogy minden függőség telepítve legyen, és az API kulcsaid helyesen legyenek konfigurálva a zökkenőmentes fejlesztés és tesztelés érdekében.

- Python 3.8 vagy újabb verzió
- SerpAPI API kulcs (Regisztrálj a [SerpAPI](https://serpapi.com/) oldalon - ingyenes szint elérhető)

## Telepítés

A kezdéshez kövesd az alábbi lépéseket a környezet beállításához:

1. Telepítsd a függőségeket az uv (ajánlott) vagy pip használatával:

```bash
# uv használata (ajánlott)
uv pip install -r requirements.txt

# pip használata
pip install -r requirements.txt
```

2. Hozz létre egy `.env` fájlt a projekt gyökérkönyvtárában a SerpAPI kulcsoddal:

```
SERPAPI_KEY=your_serpapi_key_here
```

## Használat

A Webes Kereső MCP Szerver az a központi komponens, amely webes, hírek, termékkutatás és kérdés-válasz eszközöket tesz elérhetővé a SerpAPI integrálásával. Kezeli a bejövő kéréseket, az API hívásokat, elemzi a válaszokat, és strukturált eredményeket ad vissza a kliensnek.

A teljes megvalósítást megtekintheted a [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py) fájlban.

### A szerver indítása

Az MCP szerver indításához használd a következő parancsot:

```bash
python server.py
```

A szerver stdio alapú MCP szerverként fut, amelyhez a kliens közvetlenül csatlakozhat.

### Kliens módok

A kliens (`client.py`) két módot támogat az MCP szerverrel való interakcióra:

- **Normál mód**: Automatizált teszteket futtat, melyek minden eszközt meghívnak és ellenőrzik a válaszokat. Hasznos gyors ellenőrzéshez, hogy a szerver és az eszközök várakozás szerint működnek-e.
- **Interaktív mód**: Menü-alapú felület indul, ahol manuálisan választhatsz ki eszközöket, adhatsz meg egyéni lekérdezéseket és valós időben láthatod az eredményeket. Ideális a szerver képességeinek felfedezéséhez és különböző bemenetek kipróbálásához.

A teljes megvalósítást megtekintheted a [`client.py`](../../../../05-AdvancedTopics/web-search-mcp/client.py) fájlban.

### A kliens futtatása

Az automatizált tesztek futtatásához (ez automatikusan elindítja a szervert is):

```bash
python client.py
```

Vagy interaktív módban futtatva:

```bash
python client.py --interactive
```

### Tesztelés különböző módszerekkel

Többféle módon tesztelheted és használhatod az eszközöket, amelyeket a szerver biztosít, attól függően, mire van szükséged és hogyan dolgozol.

#### Egyedi teszt szkriptek írása az MCP Python SDK-val
Saját teszt szkripteket is írhatsz az MCP Python SDK használatával:

# [Python](#tab/python-sdk)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def test_custom_query():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            # Hívd meg az eszközöket a saját paramétereiddel
            result = await session.call_tool("general_search", 
                                           arguments={"query": "your custom query"})
            # Feldolgozza az eredményt
```

---


Ebben a kontextusban egy „teszt szkript” egy egyedi Python programot jelent, amelyet ügyfélként írsz az MCP szerverhez. Nem formális egységteszt, hanem programozottan csatlakozhatsz a szerverhez, meghívhatod az eszközök bármelyikét kiválasztott paraméterekkel és megvizsgálhatod az eredményeket. Ez az eszköz ideális:
- Prototípus készítéshez és eszköz hívások kísérletezéséhez
- A szerver válaszainak validálásához különböző bemenetekre
- Ismételt eszköz meghívások automatizálásához
- Saját munkafolyamatok vagy integrációk építéséhez az MCP szerver fölé

Teszt szkriptekkel gyorsan kipróbálhatod új lekérdezéseket, hibakeresheted az eszközök működését, vagy akár fejlettebb automatizáláshoz is kiindulópontként használhatod. Lentebb egy példa arra, hogyan használd az MCP Python SDK-t egy ilyen szkript létrehozásához:

## Eszköz leírások

A szerver által kínált eszközökkel különböző típusú kereséseket és lekérdezéseket hajthatsz végre. Az alábbiakban részletesen leírjuk az egyes eszközöket, paramétereiket és példa használatukat.


Ez a rész részletezi az összes elérhető eszközt és azok paramétereit.

### general_search

Általános webes keresést végez és formázott eredményeket ad vissza.

**Hogyan hívhatod ezt az eszközt:**

Meghívhatod a `general_search` eszközt saját szkriptedből az MCP Python SDK-val, vagy interaktívan az Inspektorral vagy az interaktív kliens móddal. Íme egy kód példa a SDK használatára:

# [Python Példa](#tab/python-general-search)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_general_search():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("general_search", arguments={"query": "latest AI trends"})
            print(result)
```

---

Alternatívaként interaktív módban válaszd ki a `general_search` menüpontot és írd be a lekérdezést a kérést követően.

**Paraméterek:**
- `query` (string): A keresési lekérdezés

**Példa kérés:**

```json
{
  "query": "latest AI trends"
}
```

### news_search

Friss hírek cikkeket keres megadott lekérdezéshez.

**Hogyan hívhatod ezt az eszközt:**

Meghívhatod a `news_search` eszközt saját szkriptedből az MCP Python SDK-val, vagy interaktívan az Inspectornál vagy az interaktív kliens módban. Íme egy kód példa a SDK használatára:

# [Python Példa](#tab/python-news-search)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_news_search():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("news_search", arguments={"query": "AI policy updates"})
            print(result)
```

---

Alternatívaként interaktív módban válaszd a `news_search` menüpontot és írd be a lekérdezést a felkéréskor.

**Paraméterek:**
- `query` (string): A keresési lekérdezés

**Példa kérés:**

```json
{
  "query": "AI policy updates"
}
```

### product_search

Termékeket keres megadott lekérdezés alapján.

**Hogyan hívhatod ezt az eszközt:**

Meghívhatod a `product_search` eszközt saját szkriptedből az MCP Python SDK-val, vagy interaktívan az Inspectornál vagy az interaktív kliens módban. Íme egy kód példa a SDK használatára:

# [Python Példa](#tab/python-product-search)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_product_search():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("product_search", arguments={"query": "best AI gadgets 2025"})
            print(result)
```

---

Alternatívaként interaktív módban válaszd a `product_search` menüpontot és írd be a lekérdezést a felkéréskor.

**Paraméterek:**
- `query` (string): A termékkutatási lekérdezés

**Példa kérés:**

```json
{
  "query": "best AI gadgets 2025"
}
```

### qna

Közvetlen válaszokat ad a keresőmotorokból származó kérdésekre.

**Hogyan hívhatod ezt az eszközt:**

Meghívhatod a `qna` eszközt saját szkriptedből az MCP Python SDK-val, vagy interaktívan az Inspectornál vagy az interaktív kliens módban. Íme egy kód példa a SDK használatára:

# [Python Példa](#tab/python-qna)

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_qna():
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )
    async with stdio_client(server_params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            result = await session.call_tool("qna", arguments={"question": "what is artificial intelligence"})
            print(result)
```

---

Alternatívaként interaktív módban válaszd a `qna` menüpontot, és írd be a kérdésed a felkéréskor.

**Paraméterek:**
- `question` (string): A kérdés, amire választ keresel

**Példa kérés:**

```json
{
  "question": "what is artificial intelligence"
}
```

## Kód részletek

Ebben a részben kódrészleteket és referenciákat találsz a szerver és kliens implementációhoz.

# [Python](#tab/python-code-details)

Teljes megvalósítási részletek a [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py) és a [`client.py`](../../../../05-AdvancedTopics/web-search-mcp/client.py) fájlban.

```python
# Példa részlet a server.py-ből:
import os
import httpx
# ...létező kód...
```

---

## Haladó Konzeptezek ebben a leckében

Az építés elkezdése előtt itt van néhány fontos haladó fogalom, amelyek végig megjelennek ebben a fejezetben. Ezek megértése segít követni a leckét, még ha újak is számodra:

- **Több eszköz összehangolás**: Ez azt jelenti, hogy egyetlen MCP szerveren több különböző eszköz fut (például webkeresés, hírek keresése, termékkutatás és kérdés-válasz). Ez lehetővé teszi, hogy a szerver számos feladatot kezeljen, nem csak egyet.
- **API hívási korlátok kezelése**: Sok külső API (például SerpAPI) korlátozza, hogy mennyi kérést tehetsz egy adott idő alatt. A jó kód ellenőrzi ezeket a korlátokat és megfelelően kezeli őket, hogy az alkalmazásod ne hibázzon, ha eléri a limitet.
- **Strukturált adat elemzés**: Az API válaszok gyakran összetettek és egymásba ágyazottak. Ez a koncepció arról szól, hogyan alakítsuk át ezeket tiszta, könnyen használható formátumokká, amelyek barátságosak LLM-ek vagy más programok számára.
- **Hibák helyreállítása**: Néha hibák történnek – például hálózati hiba vagy az API nem azt adja vissza, amit vársz. A hibakezelés azt jelenti, hogy a kód kezeli ezeket a problémákat és hasznos visszajelzést ad, anélkül, hogy összeomlana.
- **Paraméter validálás**: Ez arról szól, hogy minden eszköz bemenet helyes és biztonságos legyen. Ide tartozik alapértelmezett értékek beállítása és a típusellenőrzés, amelyek segítenek elkerülni hibákat és félreértéseket.

Ez a rész segít diagnosztizálni és megoldani a Webes Kereső MCP Szerverrel kapcsolatos gyakori problémákat. Ha hibába vagy váratlan viselkedésbe futsz, ez a hibakereső szakasz megoldásokat kínál a leggyakoribb gondokra. Nézd át ezeket a tippeket mielőtt további segítséget kérnél – gyakran gyorsan megoldják a problémákat.

## Hibakeresés

A Webes Kereső MCP Szerverrel való munka során időnként találkozhatsz problémákkal – ami normális külső API-k és új eszközök fejlesztésekor. Ez a rész gyakorlati megoldásokat ad a leggyakoribb gondokra, hogy gyorsan visszatérhess a munkához. Ha hibába ütközöl, innen érdemes indítani: az alábbi tippek a legtöbb felhasználó által tapasztalt problémákat kezelik és gyakran segítség nélkül megoldják azokat.

### Gyakori problémák

Lent felsoroljuk a leggyakoribb problémákat, világos magyarázatokkal és lépésekkel a megoldásra:

1. **A SERPAPI_KEY hiányzik a .env fájlból**
   - Ha azt az üzenetet látod, hogy `SERPAPI_KEY environment variable not found`, akkor az alkalmazásod nem találja a SerpAPI kulcsot. Javításhoz hozz létre egy `.env` fájlt a projekt gyökérkönyvtárában (ha még nincs), és adj hozzá egy sorot így: `SERPAPI_KEY=your_serpapi_key_here`. Ügyelj rá, hogy a `your_serpapi_key_here` helyére az általad kapott kulcsot írd be a SerpAPI weboldalról.

2. **Module not found hibák**
   - Az olyan hibák, mint `ModuleNotFoundError: No module named 'httpx'`, azt jelzik, hogy hiányzik egy szükséges Python csomag. Ez általában akkor fordul elő, ha nem telepítetted az összes függőséget. Megoldáshoz futtasd a `pip install -r requirements.txt` parancsot a terminálban a szükséges csomagok telepítéséhez.

3. **Kapcsolati problémák**
   - Ha olyan hibát kapsz, hogy `Error during client execution`, az azt jelenti, hogy a kliens nem tud csatlakozni a szerverhez, vagy a szerver nem fut megfelelően. Ellenőrizd, hogy a kliens és szerver verziók kompatibilisek-e, és hogy a `server.py` ott van és fut a helyes könyvtárban. A szerver és kliens újraindítása is segíthet.

4. **SerpAPI hibák**
   - Ha azt látod, hogy `Search API returned error status: 401`, akkor a SerpAPI kulcsod hiányzik, helytelen vagy lejárt. Nézd meg a SerpAPI irányítópultodon a kulcsot, és szükség esetén frissítsd a `.env` fájlt. Ha a kulcs rendben van, de mégis ezt a hibát kapod, ellenőrizd, hogy az ingyenes kvótád nem fogyott-e el.

### Hibakeresési mód

Alapértelmezésben az alkalmazás csak a fontos információkat naplózza. Ha több részletre vagy kíváncsi (például bonyolult problémák diagnosztizálásához), engedélyezheted a DEBUG módot. Ez sokkal több információt mutat minden lépésről, amit az alkalmazás tesz.

**Példa: Normál kimenet**
```plaintext
2025-06-01 10:15:23,456 - __main__ - INFO - Calling general_search with params: {'query': 'open source LLMs'}
2025-06-01 10:15:24,123 - __main__ - INFO - Successfully called general_search

GENERAL_SEARCH RESULTS:
... (search results here) ...
```

**Példa: DEBUG kimenet**
```plaintext
2025-06-01 10:15:23,456 - __main__ - INFO - Calling general_search with params: {'query': 'open source LLMs'}
2025-06-01 10:15:23,457 - httpx - DEBUG - HTTP Request: GET https://serpapi.com/search ...
2025-06-01 10:15:23,458 - httpx - DEBUG - HTTP Response: 200 OK ...
2025-06-01 10:15:24,123 - __main__ - INFO - Successfully called general_search

GENERAL_SEARCH RESULTS:
... (search results here) ...
```

Figyeld meg, hogy a DEBUG mód extra sorokat tartalmaz az HTTP kérésekről, válaszokról és egyéb belső részletekről. Ez nagyon hasznos lehet a hibakeresés során.

A DEBUG mód engedélyezéséhez állítsd a naplózási szintet DEBUG-ra a `client.py` vagy `server.py` fájl tetején:

# [Python](#tab/python-debug)


```python
# A client.py vagy server.py elején
import logging
logging.basicConfig(
    level=logging.DEBUG,  # Változtasd INFO-ról DEBUG-ra
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
```

---

---

## Mi következik

- [5.10 Valós idejű adatfolyam](../mcp-realtimestreaming/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->