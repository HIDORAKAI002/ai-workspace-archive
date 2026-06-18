# Sissejuhatus MCP andmebaasi integratsiooni

## 🎯 Mida see labor katab

See sissejuhatav labor annab põhjaliku ülevaate Model Context Protocol (MCP) serverite loomise kohta andmebaasi integratsiooniga. Sa mõistad ärijuhtumit, tehnilist arhitektuuri ja reaalse maailma rakendusi Zava Retail analüütika näite kaudu aadressil https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Ülevaade

**Model Context Protocol (MCP)** võimaldab tehisintellekti assistentidel turvaliselt juurdepääsu välistele andmeallikatele ja suhelda nendega reaalajas. Andmebaasi integratsiooniga kombineerides avab MCP võimsad võimalused andmepõhiste tehisintellekti rakenduste jaoks.

See õppeprogramm õpetab sind ehitama tootmiseks valmis MCP servereid, mis ühendavad tehisintellekti assistendid jaemüügi müügiandmetega läbi PostgreSQL, rakendades ettevõtte mustreid nagu rea tasemel turvalisus, semantiline otsing ja mitme rentnikuga andmesisestus.

## Õppe eesmärgid

Selle labori lõpuks suudad sa:

- **Määratleda** Model Context Protocol ja selle põhieelised andmebaasi integratsioonis
- **Tuvastada** MCP serveri arhitektuuri põhilised komponendid andmebaasidega
- **Mõista** Zava Retail ärijuhtumit ja selle ärivajadusi
- **Tunda ära** ettevõtte mustrid turvaliseks ja skaleeritavaks andmebaasi juurdepääsuks
- **Loetleda** tööriistad ja tehnoloogiad, mida selles õpperajas kasutatakse

## 🧭 Väljakutse: tehisintellekt kohtub reaalse maailma andmetega

### Traditsioonilise tehisintellekti piirangud

Moodsa tehisintellekti assistendid on väga võimsad, kuid nad puutuvad reaalse ärandmetega töötades silmitsi oluliste piirangutega:

| **Väljakutse** | **Kirjeldus** | **Äriline mõju** |
|---------------|---------------|------------------|
| **Staatiline teadmus** | Tehisintellekti mudelid, mis on treenitud fikseeritud andmestikel, ei pääse ligi jooksvale ärandmele | Aegunud teadmised, kasutamata võimalused |
| **Andmesaarte eraldatus** | Informatsioon on lukustatud andmebaasidesse, API-desse ja süsteemidesse, mida tehisintellekt ei küüni | Ebapiisav analüüs, killustatud töövood |
| **Turvalisuse piirangud** | Otsene andmebaasi juurdepääs tekitab turva- ja vastavusprobleeme | Piiratud kasutuselevõtt, käsitsi andmete ettevalmistus |
| **Keerulised päringud** | Ärikasutajad vajavad tehnilisi oskusi, et andmeanalüüsi päringuid teha | Vähenenud kasutuselevõtt, ebaefektiivsed protsessid |

### MCP lahendus

Model Context Protocol lahendab need väljakutsed, pakkudes:

- **Reaalajas andmete ligipääs**: tehisintellekti assistendid pärivad otsepöördumisi elavatesse andmebaasidesse ja API-desse
- **Turvaline integratsioon**: juurdepääsu kontrollimisega autentimise ja õigustega
- **Loomuliku keele liides**: ärikasutajad saavad küsimusi esitada tavakeeles
- **Standardiseeritud protokoll**: töötab erinevates tehisintellekti platvormides ja tööriistades

## 🏪 Tutvuge Zava Retailiga: meie õppenäide https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Selle õpperaja jooksul ehitame MCP serveri **Zava Retailile**, väljamõeldud isetegemise jaemüügikettile, millel on mitu kauplust. See realistlik stsenaarium demonstreerib ettevõtte tasemel MCP juurutamist.

### Ärikontekst

**Zava Retail** haldab:
- **8 füüsilist kauplust** Washingtoni osariigis (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)
- **1 veebipoodi** e-kaubanduse müügiks
- **Mitmekesine tootekataloog**, mis hõlmab tööriistu, ehitustarvikuid, aiavarustust ja ehitusmaterjale
- **Mitmetasandiline juhtimine**: kaupluse juhid, piirkondlikud juhid ja juhatus

### Ärinõuded

Kaupluse juhid ja juhatus vajavad AI-põhist analüütikat, et:

1. **Analüüsida müügitulemusi** kaupluste ja ajaperioodide lõikes
2. **Jälgida laoseisu** ja määrata täiendamise vajadust
3. **Mõista kliendi käitumist** ja ostumustreid
4. **Leida tooteinfot** läbi semantilise otsingu
5. **Genereerida aruandeid** loomulikus keeles esitatud päringutel
6. **Tagada andmete turvalisus** rollipõhise juurdepääsukontrolliga

### Tehnilised nõuded

MCP server peab pakkuma:

- **Mitme rentnikuga andmete ligipääsu**, kus kaupluse juhid näevad ainult oma kaupluse andmeid
- **Paindlikke päringuvõimalusi**, mis toetavad keerukaid SQL operatsioone
- **Semantilist otsingut** toodete leidmiseks ja soovitamiseks
- **Reaalajas andmeid**, mis kajastavad praegust äriseisu
- **Turvalist autentimist** rea tasemel turvalisusega
- **Skaleeritavat arhitektuuri**, mis toetab mitut samaaegset kasutajat

## 🏗️ MCP serveri arhitektuuri ülevaade

Meie MCP server rakendab kihilist arhitektuuri, mis on optimeeritud andmebaasi integratsiooniks:

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

### Peamised komponendid

#### **1. MCP serveri kiht**
- **FastMCP raamistik**: kaasaegne Python MCP serveri teostus
- **Tööriistade registreerimine**: deklaratiivsed tööriistade definitsioonid tüübikindlusega
- **Päringu kontekst**: kasutajatuvastus ja sessioonihaldus
- **Vigade käitlemine**: robustne veahaldus ja logimine

#### **2. Andmebaasi integratsiooni kiht**
- **Ühenduste haldus**: tõhus asyncpg ühenduste haldamine
- **Šemade pakkuja**: dünaamiline tabeli skeemi avastamine
- **Päringu täitja**: turvaline SQL täitmine RLS kontekstis
- **Tehingute haldus**: ACID nõuete täitmine ja tagasipööramine

#### **3. Turvakiht**
- **Rea tasemel turvalisus**: PostgreSQL RLS mitme rentnikuga andmete isoleerimiseks
- **Kasutajatuvastus**: kaupluse juhi autentimine ja autoriseerimine
- **Juurdepääsukontroll**: peenhäälestatud õigused ja auditeerimislogid
- **Sisendi valideerimine**: SQL süstimise vältimine ja päringu valideerimine

#### **4. AI täiustamise kiht**
- **Semantiline otsing**: vektori embed´id tooteteabe leidmiseks
- **Azure OpenAI integratsioon**: teksti embed´ide genereerimine
- **Sarnasuse algoritmid**: pgvector kosinuse sarnasuse otsing
- **Otsingu optimeerimine**: indekseerimine ja jõudluse häälestus

## 🔧 Tehnoloogiapinu

### Põhitehnoloogiad

| **Komponent** | **Tehnoloogia** | **Eesmärk** |
|---------------|----------------|-------------|
| **MCP raamistik** | FastMCP (Python) | Kaasaegne MCP serveri realiseerimine |
| **Andmebaas** | PostgreSQL 17 + pgvector | Suhteline andmebaas koos vektori otsinguga |
| **AI teenused** | Azure OpenAI | Teksti embed´id ja keele mudelid |
| **Konteinerid** | Docker + Docker Compose | Arenduskeskkond |
| **Pilveplatvorm** | Microsoft Azure | Tootmiskeskkonna juurutus |
| **IDE integratsioon** | VS Code | AI vestlus ja arendusvoog |

### Arendustööriistad

| **Tööriist** | **Eesmärk** |
|-------------|--------------|
| **asyncpg** | Kõrge jõudlus PostgreSQL draiver |
| **Pydantic** | Andmete valideerimine ja serialiseerimine |
| **Azure SDK** | Pilveteenuse integratsioon |
| **pytest** | Testimise raamistik |
| **Docker** | Konteinerid ja juurutamine |

### Tootmispinu

| **Teenusekomponent** | **Azure ressurss** | **Eesmärk** |
|---------------------|-------------------|-------------|
| **Andmebaas** | Azure Database for PostgreSQL | Halustatud andmebaasiteenus |
| **Konteiner** | Azure Container Apps | Serverivabad konteineri hostid |
| **AI teenused** | Microsoft Foundry | OpenAI mudelid ja lõpp-punktid |
| **Jälgimine** | Application Insights | Jälgitavus ja diagnostika |
| **Turvalisus** | Azure Key Vault | Saladused ja konfiguratsiooni haldus |

## 🎬 Reaalmaailma kasutussituatsioonid

Vaatame, kuidas erinevad kasutajad meie MCP serveriga suhtlevad:

### Stsenaarium 1: kaupluse juhi tulemuste ülevaade

**Kasutaja**: Sarah, Seattle kaupluse juht  
**Eesmärk**: analüüsida eelmise kvartali müügitulemusi

**Loomulikus keeles päring**:
> "Näita mulle minu kaupluse top 10 toodet tulude järgi 2024. aasta 4. kvartalis"

**Mis juhtub**:
1. VS Code AI Chat saadab päringu MCP serverile
2. MCP server tuvastab Sarah kaupluse konteksti (Seattle)
3. RLS poliitikad filtreerivad andmed ainult Seattle kaupluse jaoks
4. SQL päring genereeritakse ja täidetakse
5. Tulemused vormindatakse ja tagastatakse AI chit’ile
6. AI annab analüüsi ja ülevaateid

### Stsenaarium 2: toodete leidmine semantilise otsinguga

**Kasutaja**: Mike, laohaldur  
**Eesmärk**: leida tooteid, mis sarnanevad kliendi päringule

**Loomulikus keeles päring**:
> "Milliseid tooteid me müüme, mis on sarnased 'veekindlatele elektriühendustele välitingimustes'?"

**Mis juhtub**:
1. Päring töödeldakse semantilise otsingu tööriistaga
2. Azure OpenAI genereerib embed vektori
3. pgvector teeb sarnasusotsingu
4. Seotud tooted otsitakse tähtsuse järgi järjestatud
5. Tulemutes on toote üksikasjad ja saadavus
6. AI pakub alternatiive ja komplektiseerimise võimalusi

### Stsenaarium 3: analüüs kaupluste lõikes

**Kasutaja**: Jennifer, piirkonna juht  
**Eesmärk**: võrrelda müügitulemusi kõigi kaupluste lõikes

**Loomulikus keeles päring**:
> "Võrreldes müüki kategooriate lõikes viimase kuue kuu jooksul kõigis kauplustes"

**Mis juhtub**:
1. RLS kontekst seatakse piirkondliku juhi õigustega
2. Genereeritakse keerukas mitme kaupluse päring
3. Andmed koondatakse kõigi kaupluste kaupa
4. Tulemused sisaldavad trende ja võrdlusi
5. AI tuvastab ülevaated ja soovitused

## 🔒 Turvalisus ja mitmerentnikkuse süvitsi

Meie lahendus paneb rõhku ettevõtte tasemel turvalisusele:

### Rea tasemel turvalisus (RLS)

PostgreSQL RLS tagab andmete isoleerimise:

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

### Kasutajatuvastuse haldus

Iga MCP ühendus sisaldab:
- **Kaupluse juhi ID**: unikaalne identifikaator RLS kontekstiks
- **Rollijaotus**: õigused ja juurdepääsu tasemed
- **Sessioonihaldus**: turvalised autentimismärgid
- **Auditilogimine**: täielik juurdepääsu ajalugu

### Andmekaitse

Mitmekihiline turvalisus:
- **Ühenduste krüpteerimine**: TLS kõikidele andmebaasiühendustele
- **SQL süstimise vältimine**: ainult parameetriseeritud päringud
- **Sisendi valideerimine**: põhjalik päringu valideerimine
- **Vigade käitlemine**: veateadetes ei avaldata tundlikku infot

## 🎯 Peamised õppetunnid

Pärast selle sissejuhatuse lõpetamist peaksid sa mõistma:

✅ **MCP väärtuspakkumine**: kuidas MCP ühendab tehisintellekti assistendid ja reaalsed andmed  
✅ **Ärikontekst**: Zava Retail’i nõuded ja väljakutsed  
✅ **Arhitektuuri ülevaade**: peamised komponendid ja nende koostöö  
✅ **Tehnoloogiapinu**: kogu õppeprogrammis kasutatud tööriistad ja raamistike  
✅ **Turvamudel**: mitmerentnikuline andmete ligipääs ja kaitse  
✅ **Kasutusmustrid**: reaalse maailma päringud ja töövood  

## 🚀 Mis edasi

Oled valmis süvitsi minema? Jätka:

**[Labor 01: Põhiarhitektuuri kontseptsioonid](../01-Architecture/README.md)**

Õpi MCP serveri arhitektuurimustreid, andmebaasi disaini põhimõtteid ja detailset tehnilist teostust, mis tagab meie jaemüügianalüütika lahenduse toimimise.

## 📚 Täiendavad ressursid

### MCP dokumentatsioon  
- [MCP spetsifikatsioon](https://modelcontextprotocol.io/docs/) - ametlik protokolli dokumentatsioon  
- [MCP algajatele](https://aka.ms/mcp-for-beginners) - põhjalik MCP õppematerjal  
- [FastMCP dokumentatsioon](https://github.com/modelcontextprotocol/python-sdk) - Python SDK dokumentatsioon  

### Andmebaasi integratsioon  
- [PostgreSQL dokumentatsioon](https://www.postgresql.org/docs/) - kogu PostgreSQL viide  
- [pgvector juhend](https://github.com/pgvector/pgvector) - vektori laienduse dokumentatsioon  
- [Rea tasemel turvalisus](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS juhend  

### Azure teenused  
- [Azure OpenAI dokumentatsioon](https://docs.microsoft.com/azure/cognitive-services/openai/) - tehisintellekti teenuste integratsioon  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - hallatud andmebaasiteenus  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - serverivabad konteinerid  

---

**Vastutusest loobumine**: See on õppetöö, mis kasutab väljamõeldud jaemüügi andmeid. Järgige alati oma organisatsiooni andmete valitsemise ja turvapoliitikaid, kui juurutate sarnaseid lahendusi tootmiskeskkonnas.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->