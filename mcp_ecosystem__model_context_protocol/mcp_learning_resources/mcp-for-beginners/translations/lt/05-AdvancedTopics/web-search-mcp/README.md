# Pamoka: Web paieškos MCP serverio kūrimas

Šiame skyriuje parodyta, kaip sukurti realaus pasaulio DI agentą, kuris integruojasi su išoriniais API, tvarko įvairius duomenų tipus, valdo klaidas ir koordinuoja kelis įrankius – visa tai gamybai paruoštu formatu. Matysite:

- **Integracija su išoriniais API, reikalaujančiais autentifikacijos**
- **Įvairių duomenų tipų tvarkymas iš kelių endpoint'ų**
- **Patikimos klaidų tvarkymo ir žurnalų strategijos**
- **Kelių įrankių koordinavimas viename serveryje**

Pamokos pabaigoje įgysite praktinės patirties su šablonais ir geriausiomis praktikomis, kurios būtinos pažangioms DI ir LLM pagrindu veikiančioms programoms.

## Įvadas

Šioje pamokoje išmoksite sukurti pažangų MCP serverį ir klientą, kurie praplečia LLM galimybes naudodami realaus laiko interneto duomenis per SerpAPI. Tai svarbus įgūdis kuriant dinamiškus DI agentus, galinčius pasiekti naujausią informaciją iš interneto.

## Mokymosi tikslai

Pamokos pabaigoje galėsite:

- Saugiai integruoti išorinius API (pvz., SerpAPI) į MCP serverį
- Įgyvendinti kelis įrankius interneto, naujienų, produktų paieškai ir klausimų-atsakymų sistema
- Analizuoti ir formatuoti struktūruotus duomenis LLM naudojimui
- Efektyviai tvarkyti klaidas ir valdyti API užklausų ribas
- Kurti ir testuoti tiek automatizuotus, tiek interaktyvius MCP klientus

## Web paieškos MCP serveris

Šioje skiltyje pristatoma Web paieškos MCP serverio architektūra ir funkcijos. Matysite, kaip FastMCP ir SerpAPI naudojami kartu, kad praplėstų LLM galimybes realaus laiko interneto duomenimis.

### Apžvalga

Ši implementacija apima keturis įrankius, demonstruojančius MCP gebėjimą saugiai ir efektyviai valdyti įvairias su išoriniais API susijusias užduotis:

- **general_search**: Bendro pobūdžio interneto paieškai
- **news_search**: Naujausių antraščių paieškai
- **product_search**: Elektroninės prekybos duomenims
- **qna**: Klausimų ir atsakymų fragmentams

### Funkcijos
- **Kodo pavyzdžiai**: Apima kalbai būdingas kodo dalis Python kalba (ir lengvai pritaikomas kitoms kalboms) naudojant kodo sukiojimus aiškumui

### Python

```python
# Bendrojo paieškos įrankio naudojimo pavyzdys
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

Prieš paleisdami klientą, pravartu suprasti, ką veikia serveris. Failas [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py) įgyvendina MCP serverį, kuris suteikia įrankius interneto, naujienų, produktų paieškai ir klausimų-atsakymų sistemai, integruodamas SerpAPI. Jis tvarko gaunamas užklausas, valdo API skambučius, analizuoja atsakymus ir grąžina struktūruotus rezultatus klientui.

Visą implementaciją galite peržiūrėti faile [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py).

Čia pateikiamas trumpas pavyzdys, kaip serveris apibrėžia ir registruoja įrankį:

### Python serveris

```python
# server.py (ištrauka)
from mcp.server import MCPServer, Tool

async def general_search(query: str):
    # ...įgyvendinimas...

server = MCPServer()
server.add_tool(Tool("general_search", general_search))

if __name__ == "__main__":
    server.run()
```

---

- **Išorinių API integracija**: Demonstruoja saugų API raktų ir išorinių užklausų valdymą
- **Struktūruotų duomenų analizė**: Parodo, kaip paversti API atsakymus į LLM draugiškus formatus
- **Klaidų valdymas**: Patikimas klaidų valdymas su tinkamu žurnalo fiksavimu
- **Interaktyvus klientas**: Apima tiek automatinius testus, tiek interaktyvų režimą testavimui
- **Konteksto valdymas**: Naudoja MCP kontekstą žurnalavimo ir užklausų sekimui

## Reikalavimai

Prieš pradedant įsitikinkite, kad jūsų aplinka yra tinkamai paruošta atlikdami toliau nurodytus veiksmus. Tai užtikrins, kad visos priklausomybės bus įdiegtos ir jūsų API raktai bus teisingai sukonfigūruoti sklandžiam vystymui ir testavimui.

- Python 3.8 arba naujesnė versija
- SerpAPI API raktas (užsiregistruokite svetainėje [SerpAPI](https://serpapi.com/) - yra nemokama versija)

## Diegimas

Norėdami pradėti, atlikite šiuos veiksmus aplinkos paruošimui:

1. Įdiekite priklausomybes naudodami uv (rekomenduojama) arba pip:

```bash
# Naudojant uv (rekomenduojama)
uv pip install -r requirements.txt

# Naudojant pip
pip install -r requirements.txt
```

2. Sukurkite `.env` failą projekto šakniniame kataloge su savo SerpAPI raktu:

```
SERPAPI_KEY=your_serpapi_key_here
```

## Naudojimas

Web paieškos MCP serveris yra pagrindinis komponentas, suteikiantis įrankius interneto, naujienų, produktų paieškai ir klausimų-atsakymų sistemai, integruodamas SerpAPI. Jis tvarko užklausas, valdo API skambučius, analizuoja atsakymus ir grąžina struktūruotus rezultatus klientui.

Visą implementaciją galite peržiūrėti faile [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py).

### Serverio paleidimas

Norėdami paleisti MCP serverį, naudokite šią komandą:

```bash
python server.py
```

Serveris veiks kaip stdio pagrindu veikiantis MCP serveris, prie kurio klientas gali tiesiogiai prisijungti.

### Kliento režimai

Klientas (`client.py`) palaiko du režimus, kai bendrauja su MCP serveriu:

- **Įprastas režimas**: Vykdo automatinius testus, kurie patikrina visus įrankius ir patvirtina jų atsakymus. Tai naudinga greitam serverio ir įrankių veikimo patikrinimui.
- **Interaktyvus režimas**: Paleidžia meniu valdomą sąsają, kur galite rankiniu būdu pasirinkti ir iškviesti įrankius, įvesti pasirinktines užklausas ir stebėti rezultatus realiu laiku. Tai idealu serverio galimybėms tyrinėti ir eksperimentuoti su skirtingais įėjimais.

Visą implementaciją galite peržiūrėti faile [`client.py`](../../../../05-AdvancedTopics/web-search-mcp/client.py).

### Kliento paleidimas

Norėdami paleisti automatinius testus (tai automatiškai paleidžia serverį):

```bash
python client.py
```

Arba paleiskite interaktyviu režimu:

```bash
python client.py --interactive
```

### Testavimas skirtingais būdais

Yra keletas būdų testuoti ir bendrauti su serverio teikiamais įrankiais, priklausomai nuo jūsų poreikių ir darbo eigų.

#### Vartotojiškų testų scenarijų rašymas naudojant MCP Python SDK
Taip pat galite kurti savo testų scenarijus naudodami MCP Python SDK:

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
            # Kviesti įrankius su jūsų pasirinktinais parametrais
            result = await session.call_tool("general_search", 
                                           arguments={"query": "your custom query"})
            # Apdoroti rezultatą
```

---


Šiame kontekste „testų scenarijus“ reiškia pasirinktą Python programą, kurią rašote veikti kaip MCP serverio klientą. Vietoje formalaus vieneto testo, šis scenarijus leidžia programiškai prisijungti prie serverio, iškviesti bet kurį jo įrankį su pasirinktinais parametrais ir apžiūrėti rezultatus. Šis požiūris naudingas:
- Prototipų kūrimui ir eksperimentavimui su įrankių kvietimais
- Tikrinant, kaip serveris reaguoja į skirtingus įėjimus
- Automatizuojant pasikartojančius įrankių iškvietimus
- Kuriant savo darbo eigas arba integracijas virš MCP serverio

Galite naudoti testų scenarijus greitam naujų užklausų išbandomumui, įrankių elgsenos derinimui ar kaip pradinį tašką pažangesnei automatizacijai. Žemiau pateiktas pavyzdys, kaip naudoti MCP Python SDK kuriant tokį scenarijų:

## Įrankių aprašymai

Galite naudoti šiuos serverio teikiamus įrankius įvairių tipų paieškoms ir užklausoms atlikti. Kiekvienas įrankis aprašytas žemiau su jo parametrais ir pavyzdžiu.


Ši skiltis pateikia detales apie kiekvieną prieinamą įrankį ir jų parametrus.

### general_search

Atlieka bendrą interneto paiešką ir grąžina suformatuotus rezultatus.

**Kaip iškviesti šį įrankį:**

Galite iškviesti `general_search` iš savo scenarijaus naudodami MCP Python SDK arba interaktyviai naudodami Inspector ar interaktyvų kliento režimą. Čia pateikiamas kodo pavyzdys su SDK:

# [Python pavyzdys](#tab/python-general-search)

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

Kita alternatyva interaktyviame režime – pasirinkite `general_search` iš meniu ir įveskite užklausą, kai būsite paprašyti.

**Parametrai:**
- `query` (eilutė): Paieškos užklausa

**Užklausos pavyzdys:**

```json
{
  "query": "latest AI trends"
}
```

### news_search

Ieško naujausių su užklausa susijusių naujienų straipsnių.

**Kaip iškviesti šį įrankį:**

Galite iškviesti `news_search` iš savo scenarijaus naudodami MCP Python SDK arba interaktyviai naudodami Inspector ar interaktyvų kliento režimą. Čia pateikiamas kodo pavyzdys su SDK:

# [Python pavyzdys](#tab/python-news-search)

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

Kita alternatyva interaktyviame režime – pasirinkite `news_search` iš meniu ir įveskite užklausą, kai būsite paprašyti.

**Parametrai:**
- `query` (eilutė): Paieškos užklausa

**Užklausos pavyzdys:**

```json
{
  "query": "AI policy updates"
}
```

### product_search

Ieško produktų, atitinkančių užklausą.

**Kaip iškviesti šį įrankį:**

Galite iškviesti `product_search` iš savo scenarijaus naudodami MCP Python SDK arba interaktyviai naudodami Inspector ar interaktyvų kliento režimą. Čia pateikiamas kodo pavyzdys su SDK:

# [Python pavyzdys](#tab/python-product-search)

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

Kita alternatyva interaktyviame režime – pasirinkite `product_search` iš meniu ir įveskite užklausą, kai būsite paprašyti.

**Parametrai:**
- `query` (eilutė): Produkto paieškos užklausa

**Užklausos pavyzdys:**

```json
{
  "query": "best AI gadgets 2025"
}
```

### qna

Gauna tiesioginius atsakymus į klausimus iš paieškos variklių.

**Kaip iškviesti šį įrankį:**

Galite iškviesti `qna` iš savo scenarijaus naudodami MCP Python SDK arba interaktyviai naudodami Inspector ar interaktyvų kliento režimą. Čia pateikiamas kodo pavyzdys su SDK:

# [Python pavyzdys](#tab/python-qna)

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

Kita alternatyva interaktyviame režime – pasirinkite `qna` iš meniu ir užduokite klausimą, kai būsite paprašyti.

**Parametrai:**
- `question` (eilutė): Klausimas, į kurį norima gauti atsakymą

**Užklausos pavyzdys:**

```json
{
  "question": "what is artificial intelligence"
}
```

## Kodo detalės

Ši skiltis pateikia kodo fragmentus ir nuorodas į serverio ir kliento implementacijas.

# [Python](#tab/python-code-details)

Daugiau informacijos apie visą implementaciją rasite failuose [`server.py`](../../../../05-AdvancedTopics/web-search-mcp/server.py) ir [`client.py`](../../../../05-AdvancedTopics/web-search-mcp/client.py).

```python
# Pavyzdinis fragmentas iš server.py:
import os
import httpx
# ...esamas kodas...
```

---

## Pažangios sąvokos šioje pamokoje

Prieš pradėdami kurti, čia yra keletas svarbių pažangių sąvokų, kurios pasikartos šiame skyriuje. Supratimas jų padės jums sekti toliau, net jei dar su jomis nesate susipažinę:

- **Kelių įrankių koordinavimas**: Tai reiškia kelių skirtingų įrankių (pvz., interneto paieška, naujienų paieška, produktų paieška, klausimų-atsakymų sistema) veikimą viename MCP serveryje. Tai leidžia serveriui atlikti įvairias užduotis, o ne tik vieną.
- **API užklausų ribų valdymas**: Daugelis išorinių API (pvz., SerpAPI) riboja, kiek užklausų galite pateikti per tam tikrą laiką. Geras kodas tikrina šias ribas ir jas tinkamai tvarko, kad jūsų programa nesugestų, jei pasieksite ribą.
- **Struktūruotų duomenų analizė**: API atsakymai dažnai būna sudėtingi ir vidumi susieti. Ši sąvoka reiškia, kaip tuos atsakymus konvertuoti į švarius, lengvai naudojamus formatus, palankius LLM ar kitoms programoms.
- **Klaidų atkūrimas**: Kartais nutinka problemų – gal tinklas sugesti, arba API negrąžina to, ko tikitės. Klaidų atkūrimas reiškia, kad jūsų kodas geba tvarkyti šias problemas ir vis tiek pateikti naudingą atsakymą, o ne sugesti.
- **Parametrų patikra**: Tai apie tai, kaip patikrinti, ar visi įrankių įėjimai yra teisingi ir saugūs naudoti. Tai apima numatytųjų reikšmių nustatymą ir tipų tikrinimą, kas padeda išvengti klaidų ir painiavos.

Ši skiltis padės jums diagnozuoti ir išspręsti dažniausiai pasitaikančias problemas naudojantis Web paieškos MCP serveriu. Jei susidursite su klaidomis ar netikėtu elgesiu, šios trikčių šalinimo gairės siūlo sprendimus dažniausioms problemoms. Peržiūrėkite jas prieš kreipdamiesi dėl papildomos pagalbos – dažnai problemos sprendžiasi greitai.

## Trikčių šalinimas

Dirbant su Web paieškos MCP serveriu kartais gali kilti nesklandumų – tai įprasta dirbant su išoriniais API ir naujais įrankiais. Ši skiltis pateikia praktiškus sprendimus dažniausioms problemoms, kad greitai vėl galėtumėte tęsti darbą. Jei pastebėjote klaidą, pradėkite čia: žemiau pateikti patarimai sprendžia dažniausiai vartotojų susiduriamas problemas ir dažnai gali pašalinti problemą be papildomos pagalbos.

### Dažnos problemos

Žemiau pateikiamos dažniausios problemos, su kuriomis susiduria vartotojai, kartu su aiškiais paaiškinimais ir sprendimo žingsniais:

1. **Nerastas SERPAPI_KEY .env faile**
   - Jei matote klaidą `SERPAPI_KEY environment variable not found`, tai reiškia, kad jūsų programa neranda API rakto, reikalingo prieigai prie SerpAPI. Norėdami pataisyti, sukurkite failą pavadinimu `.env` projekto šakniniame kataloge (jei jo dar nėra) ir pridėkite eilutę `SERPAPI_KEY=your_serpapi_key_here`. Įsitikinkite, kad vietoje `your_serpapi_key_here` įrašėte tikrą savo raktą iš SerpAPI svetainės.

2. **Neaptikti moduliai**
   - Klaidos, kaip `ModuleNotFoundError: No module named 'httpx'`, reiškia, kad trūksta reikiamos Python paketo. Tai dažnai nutinka, jei neįdiegėte visų priklausomybių. Norėdami išspręsti, paleiskite `pip install -r requirements.txt` terminale, kad įdiegtumėte viską, ko reikia jūsų projektui.

3. **Ryšio problemos**
   - Jei gaunate klaidą, pvz., `Error during client execution`, dažnai tai reiškia, kad klientas negali prisijungti prie serverio arba serveris neveikia kaip tikėtasi. Patikrinkite, ar klientas ir serveris yra suderinamų versijų, ir ar failas `server.py` yra tinkamoje direktorijoje ir veikia. Taip pat gali padėti serverio ir kliento perkrovimas.

4. **SerpAPI klaidos**
   - Jei matote pranešimą `Search API returned error status: 401`, tai reiškia, kad jūsų SerpAPI raktas trūksta, yra neteisingas arba pasibaigęs. Eikite į savo SerpAPI skydelį, patikrinkite raktą ir, jei reikia, atnaujinkite `.env` failą. Jei raktas teisingas, bet klaida vis dar atsiranda, patikrinkite, ar jūsų nemokamas plano kvotas dar nėra išnaudota.

### Derinimo režimas (Debug mode)

Pagal nutylėjimą programa fiksuoja tik svarbią informaciją. Jei norite matyti daugiau detalių apie vykstančius veiksmus (pvz., diagnozuoti sudėtingas problemas), galite įjungti DERINIMO (DEBUG) režimą. Tai parodys daug daugiau informacijos apie kiekvieną žingsnį.

**Pavyzdys: Įprastas išvestis**
```plaintext
2025-06-01 10:15:23,456 - __main__ - INFO - Calling general_search with params: {'query': 'open source LLMs'}
2025-06-01 10:15:24,123 - __main__ - INFO - Successfully called general_search

GENERAL_SEARCH RESULTS:
... (search results here) ...
```

**Pavyzdys: DERINIMO (DEBUG) išvestis**
```plaintext
2025-06-01 10:15:23,456 - __main__ - INFO - Calling general_search with params: {'query': 'open source LLMs'}
2025-06-01 10:15:23,457 - httpx - DEBUG - HTTP Request: GET https://serpapi.com/search ...
2025-06-01 10:15:23,458 - httpx - DEBUG - HTTP Response: 200 OK ...
2025-06-01 10:15:24,123 - __main__ - INFO - Successfully called general_search

GENERAL_SEARCH RESULTS:
... (search results here) ...
```

Pastebėkite, kaip DERINIMO režimas įtraukia papildomas eilutes apie HTTP užklausas, atsakymus ir kitas vidines detales. Tai gali būti labai naudinga trikčių šalinimui.

Norėdami įjungti DERINIMO režimą, nustatykite žurnalo lygį į DEBUG `client.py` arba `server.py` faile viršuje:

# [Python](#tab/python-debug)


```python
# Jūsų client.py arba server.py viršuje
import logging
logging.basicConfig(
    level=logging.DEBUG,  # Pakeiskite iš INFO į DEBUG
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
```

---

---

## Kas toliau

- [5.10 Real Time Streaming](../mcp-realtimestreaming/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->