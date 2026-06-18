# Uvod v integracijo podatkovne baze MCP

## 🎯 Kaj zajema ta laboratorij

Ta uvodni laboratorij ponuja celovit pregled gradnje strežnikov Model Context Protocol (MCP) z integracijo podatkovne baze. Spoznali boste poslovni primer, tehnično arhitekturo in resnične primere uporabe prek analitičnega primera Zava Retail na https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Pregled

**Model Context Protocol (MCP)** omogoča AI asistentom varen dostop in interakcijo z zunanjimi viri podatkov v realnem času. V kombinaciji z integracijo podatkovne baze MCP odklene močne zmogljivosti za aplikacije AI, ki temeljijo na podatkih.

Ta učna pot vas nauči izdelati MCP strežnike, pripravljene za proizvodnjo, ki povezujejo AI asistente s podatki o prodaji na drobno prek PostgreSQL, z implementacijo poslovnih vzorcev, kot so varnost na ravni vrstic, semantično iskanje in dostop do podatkov za več najemnikov.

## Cilji učenja

Ob koncu tega laboratorija boste znali:

- **Opredeliti** Model Context Protocol in njegove temeljne prednosti za integracijo podatkovnih baz
- **Prepoznati** ključne komponente arhitekture MCP strežnika z bazami podatkov
- **Razumeti** primer uporabe Zava Retail in njegove poslovne zahteve
- **Prepoznati** poslovne vzorce za varen, skalabilen dostop do podatkovnih baz
- **Našteti** orodja in tehnologije, uporabljene skozi to učno pot

## 🧭 Izziv: AI sreča podatke iz resničnega sveta

### Omejitve tradicionalne AI

Sodobni AI asistenti so izjemno zmogljivi, vendar se soočajo z znatnimi omejitvami pri delu s poslovnimi podatki iz resničnega sveta:

| **Izziv**        | **Opis**                                   | **Poslovni vpliv**              |
|------------------|--------------------------------------------|--------------------------------|
| **Statično znanje**  | AI modeli, usposobljeni na fiksnih podatkovnih nizih, nimajo dostopa do trenutnih poslovnih podatkov | Zastarele vpoglede, zamujene priložnosti |
| **Podatkovni otoki** | Informacije so zaklenjene v podatkovnih bazah, API-jih in sistemih, do katerih AI nima dostopa | Nepopolna analiza, razdrobljeni poteki dela |
| **Varnostne omejitve** | Neposreden dostop do podatkovnih baz povzroča varnostne in skladnostne pomisleke | Omejena uvedba, ročna priprava podatkov |
| **Kompleksna poizvedovanja** | Poslovni uporabniki potrebujejo tehnično znanje za pridobivanje vpogledov iz podatkov | Zmanjšano sprejemanje, neučinkoviti procesi |

### Rešitev MCP

Model Context Protocol naslavlja te izzive z zagotavljanjem:

- **Dostop do podatkov v realnem času**: AI asistenti poizvedujejo po živih podatkovnih bazah in API-jih
- **Varna integracija**: nadzorovan dostop z avtentikacijo in dovoljenji
- **Vmesnik naravnega jezika**: poslovni uporabniki zastavljajo vprašanja v preprosti angleščini
- **Standardiziran protokol**: deluje na različnih AI platformah in orodjih

## 🏪 Spoznajte Zava Retail: naš študijski primer https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

V tej učni poti bomo zgradili MCP strežnik za **Zava Retail**, izmišljeno verigo trgovin za domače mojstre z več lokacijami. Ta realističen scenarij prikazuje implementacijo MCP na poslovni ravni.

### Poslovni kontekst

**Zava Retail** deluje:
- s **8 fizičnimi trgovinami** v zvezni državi Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)
- z **1 spletno trgovino** za spletno prodajo
- z **raznolikim katalogom izdelkov**, ki vključuje orodja, strojno opremo, vrtno opremo in gradbene materiale
- z **večnivojskim upravljanjem** s trgovinskimi menedžerji, regionalnimi menedžerji in vodstvom

### Poslovne zahteve

Trgovinski menedžerji in vodje potrebujejo analitiko, podprto z AI za:

1. **Analizo uspešnosti prodaje** po trgovinah in časovnih obdobjih
2. **Sledenje nivoju zalog** in prepoznavanje potreb po dopolnitvi
3. **Razumevanje obnašanja strank** in vzorcev nakupov
4. **Odkritje vpogledov o izdelkih** s pomočjo semantičnega iskanja
5. **Generiranje poročil** z uporabo poizvedb v naravnem jeziku
6. **Vzdrževanje varnosti podatkov** z nadzorom dostopa na podlagi vlog

### Tehnične zahteve

MCP strežnik mora zagotavljati:

- **Dostop do podatkov za več najemnikov**, kjer trgovinski menedžerji vidijo le podatke svoje trgovine
- **Fleksibilno poizvedovanje**, ki podpira kompleksne SQL operacije
- **Semantično iskanje** za odkrivanje izdelkov in priporočila
- **Podatke v realnem času**, ki odražajo trenutni poslovni položaj
- **Varno avtentikacijo** z varnostjo na ravni vrstic
- **Skalabilno arhitekturo**, ki podpira več sočasnih uporabnikov

## 🏗️ Pregled arhitekture MCP strežnika

Naš MCP strežnik izvaja plastno arhitekturo, optimizirano za integracijo podatkovne baze:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Ključne komponente

#### **1. Plast MCP strežnika**
- **Okvir FastMCP**: sodobna Python implementacija MCP strežnika
- **Registracija orodij**: deklarativne definicije orodij z varnostjo tipov
- **Kontekst zahteve**: identiteta uporabnika in upravljanje seje
- **Ravnanje z napakami**: robustno upravljanje napak in beleženje

#### **2. Plast integracije podatkovne baze**
- **Upravljanje povezav (pooling)**: učinkovito asyncpg upravljanje povezav
- **Ponudnik sheme**: dinamično odkrivanje shem tabel
- **Izvrševalec poizvedb**: varen zagon SQL z RLS kontekstom
- **Upravljanje transakcij**: skladnost ACID in upravljanje povračil

#### **3. Varnostna plast**
- **Varnost na ravni vrstic (RLS)**: PostgreSQL RLS za izolacijo podatkov več najemnikov
- **Identiteta uporabnika**: avtentikacija in avtorizacija trgovinskega menedžerja
- **Nadzor dostopa**: drobnozrnat nadzor dovoljenj in revizijske sledi
- **Preverjanje vnosa**: preprečevanje SQL injekcij in validacija poizvedb

#### **4. Plast izboljšav AI**
- **Semantično iskanje**: vektorske predstavitve za iskanje izdelkov
- **Integracija Azure OpenAI**: generiranje predstavitev besedila
- **Algoritmi podobnosti**: pgvector iskanje po kosinusni podobnosti
- **Optimizacija iskanja**: indeksiranje in nastavitve učinkovitosti

## 🔧 Tehnološka skladba

### Osnovne tehnologije

| **Komponenta** | **Tehnologija** | **Namen** |
|----------------|-----------------|-----------|
| **Okvir MCP**  | FastMCP (Python) | sodobna implementacija MCP strežnika |
| **Podatkovna baza** | PostgreSQL 17 + pgvector | relacijski podatki z vektorskim iskanjem |
| **AI storitve** | Azure OpenAI | predstavitve besedil in jezikovni modeli |
| **Kontejnerizacija** | Docker + Docker Compose | razvojno okolje |
| **Oblačna platforma** | Microsoft Azure | proizvodna uvedba |
| **IDE integracija** | VS Code | AI klepet in razvojni potek dela |

### Razvojna orodja

| **Orodje**  | **Namen**                         |
|-------------|----------------------------------|
| **asyncpg** | visoko zmogljiv PostgreSQL gonilnik |
| **Pydantic**| validacija in serializacija podatkov |
| **Azure SDK**| integracija oblačnih storitev    |
| **pytest**  | testni okvir                     |
| **Docker**  | kontejnerizacija in uvedba      |

### Proizvodna skladba

| **Storitev**                    | **Azure vir**                 | **Namen**                      |
|--------------------------------|------------------------------|-------------------------------|
| **Podatkovna baza**             | Azure Database for PostgreSQL | upravljana podatkovna storitev |
| **Kontejner**                  | Azure Container Apps          | gostovanje kontejnerjev brez strežnika |
| **AI storitve**                | Microsoft Foundry             | modeli in končne točke OpenAI  |
| **Nadzor**                    | Application Insights          | opazovanje in diagnostika      |
| **Varnost**                   | Azure Key Vault               | upravljanje skrivnosti in konfiguracije |

## 🎬 Primeri uporabe v resničnem svetu

Oglejmo si, kako različni uporabniki komunicirajo z našim MCP strežnikom:

### Scenarij 1: Pregled uspešnosti trgovinskega menedžerja

**Uporabnik**: Sarah, menedžerka trgovine v Seattlu  
**Cilj**: analizirati prodajo v zadnjem četrtletju

**Poizvedba v naravnem jeziku**:
> "Pokaži mi top 10 izdelkov glede na prihodke za mojo trgovino v Q4 2024"

**Kaj se zgodi**:
1. VS Code AI Chat pošlje poizvedbo MCP strežniku
2. MCP strežnik prepozna trgovinski kontekst Sarah (Seattle)
3. RLS politike filtrirajo podatke za trgovino Seattle
4. SQL poizvedba se generira in izvede
5. Rezultati se formatirajo in vrnejo AI Chat-u
6. AI zagotovi analizo in vpoglede

### Scenarij 2: Odkrivanje izdelkov s semantičnim iskanjem

**Uporabnik**: Mike, menedžer zalog  
**Cilj**: najti izdelke, podobne zahtevku kupca

**Poizvedba v naravnem jeziku**:
> "Katere izdelke prodajamo, ki so podobni 'vodoodpornim električnim priključkom za zunanjo uporabo'?"

**Kaj se zgodi**:
1. Poizvedba se obdela z orodjem za semantično iskanje
2. Azure OpenAI ustvari vektorsko predstavitev
3. pgvector izvede iskanje po podobnosti
4. Sorodni izdelki so razvrščeni po relevantnosti
5. Rezultati vključujejo podrobnosti izdelkov in razpoložljivost
6. AI predlaga alternative in možnosti paketiranja

### Scenarij 3: Analitika prek vseh trgovin

**Uporabnik**: Jennifer, regionalna menedžerka  
**Cilj**: primerjati uspešnost vseh trgovin

**Poizvedba v naravnem jeziku**:
> "Primerjaj prodajo po kategorijah za vse trgovine v zadnjih 6 mesecih"

**Kaj se zgodi**:
1. RLS kontekst nastavi dostop regionalne menedžerke
2. Generira se kompleksna poizvedba za več trgovin
3. Podatki se združijo po lokacijah trgovin
4. Rezultati vključujejo trende in primerjave
5. AI prepozna vpoglede in priporočila

## 🔒 Poglobljen pogled na varnost in večnajemništvo

Naša implementacija daje prednost varnosti na ravni podjetja:

### Varnost na ravni vrstic (RLS)

PostgreSQL RLS zagotavlja izolacijo podatkov:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Upravljanje identitete uporabnika

Vsaka MCP povezava vključuje:
- **ID trgovinskega menedžerja**: edinstven identifikator za RLS kontekst
- **Dodelitev vlog**: dovoljenja in ravni dostopa
- **Upravljanje sej**: varni avtentikacijski tokeni
- **Revizijsko beleženje**: popolna zgodovina dostopa

### Zaščita podatkov

Več plasti varnosti:
- **Šifriranje povezave**: TLS za vse povezave s podatkovno bazo
- **Preprečevanje SQL injekcij**: le parametizirane poizvedbe
- **Validacija vnosa**: celovita validacija zahtev
- **Ravnanje z napakami**: brez občutljivih podatkov v sporočilih o napakah

## 🎯 Ključne ugotovitve

Po zaključku tega uvoda bi morali razumeti:

✅ **Vrednost MCP**: kako MCP povezuje AI asistente in podatke iz resničnega sveta  
✅ **Poslovni kontekst**: zahteve in izzive Zava Retail  
✅ **Pregled arhitekture**: ključne komponente in njihove interakcije  
✅ **Tehnološko skladišče**: orodja in okviri, uporabljeni skozi celotno pot  
✅ **Varnostni model**: dostop do podatkov za več najemnikov in zaščita  
✅ **Vzorce uporabe**: scenariji poizvedb in poteki dela v resničnem svetu  

## 🚀 Kaj sledi

Pripravljeni na nadaljnje poglabljanje? Nadaljujte z:

**[Lab 01: Osnovni arhitekturni koncepti](../01-Architecture/README.md)**

Naučite se o vzorcih arhitekture MCP strežnika, principih oblikovanja podatkovnih baz in podrobni tehnični implementaciji, ki poganja našo rešitev analitike za maloprodajo.

## 📚 Dodatni viri

### Dokumentacija MCP
- [Specifikacija MCP](https://modelcontextprotocol.io/docs/) - uradna dokumentacija protokola
- [MCP za začetnike](https://aka.ms/mcp-for-beginners) - obsežen učni vodič MCP
- [Dokumentacija FastMCP](https://github.com/modelcontextprotocol/python-sdk) - dokumentacija Python SDK

### Integracija podatkovnih baz
- [Dokumentacija PostgreSQL](https://www.postgresql.org/docs/) - popolna referenca PostgreSQL
- [Vodnik pgvector](https://github.com/pgvector/pgvector) - dokumentacija razširitve za vektorsko iskanje
- [Varnost na ravni vrstic](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - vodnik PostgreSQL RLS

### Storitve Azure
- [Dokumentacija Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - integracija AI storitev
- [Azure Database za PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - upravljana storitev podatkovne baze
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - kontejnerji brez strežnika

---

**Omejitev odgovornosti**: To je učna vaja z uporabo izmišljenih maloprodajnih podatkov. Vedno upoštevajte politike upravljanja podatkov in varnosti vaše organizacije pri implementaciji podobnih rešitev v proizvodnih okoljih.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->