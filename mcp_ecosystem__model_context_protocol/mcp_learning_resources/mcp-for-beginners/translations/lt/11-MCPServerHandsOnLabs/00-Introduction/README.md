# Įvadas į MCP duomenų bazės integraciją

## 🎯 Ko apima šis laboratorinis darbas

Šis įvadinis laboratorinis darbas suteikia išsamų Model Context Protocol (MCP) serverių kūrimo su duomenų bazių integracija apžvalgą. Suprasite verslo atvejį, techninę architektūrą ir realaus pasaulio taikymą per Zava Retail analizės naudojimo atvejį adresu https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Apžvalga

**Model Context Protocol (MCP)** leidžia AI asistentams saugiai pasiekti ir bendrauti su išoriniais duomenų šaltiniais realiuoju laiku. Derinant su duomenų bazių integracija, MCP atveria galingas galimybes duomenimis pagrįstoms AI programoms.

Šis mokymosi kelias moko jus kurti gamybai pasiruošusius MCP serverius, kurie jungia AI asistentus su mažmeninės prekybos pardavimų duomenimis per PostgreSQL, įgyvendinant įmonių modelius kaip Row Level Security, semantinė paieška ir daugiapakopis duomenų prieigos valdymas.

## Mokymosi tikslai

Baigę šį laboratorinį darbą, galėsite:

- **Apibrėžti** Model Context Protocol ir jo pagrindines naudą duomenų bazių integracijai
- **Nustatyti** pagrindinius MCP serverio architektūros komponentus su duomenų bazėmis
- **Suprasti** Zava Retail naudojimo atvejį ir jo verslo reikalavimus
- **Atpažinti** įmonių modelius saugiam, mastomam duomenų bazių pasiekiamumui
- **Išvardyti** įrankius ir technologijas, naudojamas šiame mokymosi kelyje

## 🧭 Iššūkis: AI susitinka su realaus pasaulio duomenimis

### Tradiciniai AI apribojimai

Šiuolaikiniai AI asistentai yra nepaprastai galingi, tačiau susiduria su reikšmingais apribojimais dirbdami su realaus pasaulio verslo duomenimis:

| **Iššūkis** | **Aprašymas** | **Verslo poveikis** |
|-------------|---------------|---------------------|
| **Statinė žinios bazė** | AI modeliai, apmokyti ant fiksuotų duomenų, negali pasiekti dabartinių verslo duomenų | Pasenę įžvalgos, prarastos galimybės |
| **Duomenų izoliuotumas** | Informacija užrakinta duomenų bazėse, API ir sistemose, prie kurių AI neturi prieigos | Nepilna analizė, fragmentuoti darbo procesai |
| **Saugumo apribojimai** | Tiesioginė prieiga prie duomenų bazės kelia saugumo ir atitikties problemas | Ribotas diegimas, rankinis duomenų paruošimas |
| **Sudėtingi užklausimai** | Verslo naudotojams reikalingos techninės žinios duomenų įžvalgoms gauti | Sumažėjęs priėmimas, neefektyvūs procesai |

### MCP sprendimas

Model Context Protocol sprendžia šiuos iššūkius suteikdamas:

- **Realiojo laiko duomenų prieigą**: AI asistentai gali užklausti tiesiogines duomenų bazes ir API
- **Saugų integravimą**: Kontroliuojama prieiga su autentifikacija ir leidimais
- **Natūralios kalbos sąsają**: Verslo vartotojai gali užduoti klausimus paprasta anglų kalba
- **Standartizuotą protokolą**: Veikia su skirtingomis AI platformomis ir įrankiais

## 🏪 Susipažinkite su Zava Retail: mūsų mokymosi atveju https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Šio mokymosi kelio metu kursime MCP serverį **Zava Retail**, fiktyviai „pasidaryk pats“ mažmeninės prekybos tinklui su keliais parduotuvių taškais. Šis realistiškas scenarijus demonstruoja įmonių lygio MCP diegimą.

### Verslo kontekstas

**Zava Retail** veikia:
- **8 fizinės parduotuvės** visoje Vašingtono valstijoje (Sietlas, Bellevue, Takoma, Spokane, Everett, Redmond, Kirkland)
- **1 internetinė parduotuvė** el. prekybai
- **Įvairus prekių katalogas**, įskaitant įrankius, aparatūrą, sodininkystės prekes ir statybines medžiagas
- **Daugiapakopė valdymo struktūra** su parduotuvės vadovais, regioniniais vadovais ir vadovybe

### Verslo reikalavimai

Parduotuvės vadovams ir vadovybei reikia AI pagrįstos analizės, kad būtų galima:

1. **Analizuoti pardavimų rezultatus** tarp parduotuvių ir laiko tarpų
2. **Stebėti inventoriaus lygius** ir numatyti papildymo poreikius
3. **Suprasti klientų elgseną** ir pirkimo įpročius
4. **Atrasti produktų įžvalgas** per semantinę paiešką
5. **Generuoti ataskaitas** su natūralios kalbos užklausomis
6. **Užtikrinti duomenų saugumą** pagal vaidmenų pagrindu valdomą prieigą

### Techniniai reikalavimai

MCP serveris turi užtikrinti:

- **Daugiapakopę duomenų prieigą**, kur parduotuvių vadovai mato tik savo parduotuvės duomenis
- **Lankstų užklausų palaikymą** su sudėtingomis SQL operacijomis
- **Semantinę paiešką** produktų atradimui ir rekomendacijoms
- **Realiojo laiko duomenis**, atspindinčius esamą verslo būklę
- **Saugų autentifikavimą** su eilutės lygio saugumu (RLS)
- **Mastomą architektūrą** keliems vienu metu veikiančiams naudotojams

## 🏗️ MCP serverio architektūros apžvalga

Mūsų MCP serveris įgyvendina sluoksniuotą architektūrą, optimizuotą duomenų bazių integracijai:

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

### Pagrindiniai komponentai

#### **1. MCP serverio sluoksnis**
- **FastMCP Framework**: šiuolaikiška Python MCP serverio įgyvendinimas
- **Įrankių registracija**: deklaratyvūs įrankių apibrėžimai su tipo saugumu
- **Užklausos kontekstas**: naudotojo tapatybės ir sesijos valdymas
- **Klaidų valdymas**: tvirtas klaidų valdymas ir žurnalo įrašai

#### **2. Duomenų bazės integracijos sluoksnis**
- **Ryšių valdymas**: efektyvus asyncpg ryšių valdymas
- **Schemos tiekėjas**: dinamiškas lentelės schemos atpažinimas
- **Užklausų vykdytojas**: saugus SQL vykdymas su RLS kontekstu
- **Transakcijų valdymas**: ACID atitiktis ir transakcijų atšaukimas

#### **3. Saugumo sluoksnis**
- **Eilutės lygio saugumas (RLS)**: PostgreSQL RLS daugiapakopiam duomenų izoliavimui
- **Naudotojo tapatybė**: parduotuvių vadovų autentifikavimas ir autorizacija
- **Prieigos kontrolė**: smulkiai sureguliuoti leidimai ir audito žurnalai
- **Įvesties validacija**: SQL injekcijų prevencija ir užklausų patikra

#### **4. AI stiprinimo sluoksnis**
- **Semantinė paieška**: vektorinės embedavimo priemonės produktų atradimui
- **Azure OpenAI integracija**: tekstų embedavimo generavimas
- **Panašumo algoritmai**: pgvector kosinuso panašumo paieška
- **Paieškos optimizavimas**: indeksavimas ir našumo reguliavimas

## 🔧 Technologijų rinkinys

### Pagrindinės technologijos

| **Komponentas** | **Technologija** | **Paskirtis** |
|-----------------|------------------|---------------|
| **MCP Framework** | FastMCP (Python) | Šiuolaikiškas MCP serverio įgyvendinimas |
| **Duomenų bazė** | PostgreSQL 17 + pgvector | Santykiniai duomenys su vektorinės paieškos palaikymu |
| **AI paslaugos** | Azure OpenAI | Tekstų embedavimas ir kalbos modeliai |
| **Konteinerizacija** | Docker + Docker Compose | Kūrimo aplinka |
| **Debesų platforma** | Microsoft Azure | Gamybinė diegimo aplinka |
| **IDE integracija** | VS Code | AI pokalbių ir kūrimo darbo eiga |

### Kūrimo įrankiai

| **Įrankis** | **Paskirtis** |
|-------------|---------------|
| **asyncpg** | Aukšto našumo PostgreSQL tvarkyklė |
| **Pydantic** | Duomenų validacija ir serializacija |
| **Azure SDK** | Debesų paslaugų integracija |
| **pytest** | Testavimo karkasas |
| **Docker** | Konteinerizacija ir diegimas |

### Gamybinis rinkinys

| **Paslauga** | **Azure resursas** | **Paskirtis** |
|--------------|--------------------|---------------|
| **Duomenų bazė** | Azure Database for PostgreSQL | Valdoma duomenų bazės paslauga |
| **Konteineris** | Azure Container Apps | Serverless konteinerių talpinimas |
| **AI paslaugos** | Microsoft Foundry | OpenAI modeliai ir galutinės taškos |
| **Stebėsena** | Application Insights | Stebėjimo ir diagnostikos įrankiai |
| **Saugumas** | Azure Key Vault | Slapčių ir konfigūracijos valdymas |

## 🎬 Realūs naudojimo scenarijai

Pažiūrėkime, kaip skirtingi naudotojai sąveikauja su mūsų MCP serveriu:

### Scenarijus 1: Parduotuvės vadovo našumo apžvalga

**Naudotojas**: Sarah, Sietlo parduotuvės vadovė  
**Tikslas**: Analizuoti praėjusio ketvirčio pardavimų rezultatus

**Natūralios kalbos užklausa**:
> "Rodyk man 10 geriausiai parduodamų produktų pagal pajamas mano parduotuvėje 2024 m. IV ketvirtį"

**Kas vyksta**:
1. VS Code AI Chat siunčia užklausą MCP serveriui
2. MCP serveris nustato Sarah parduotuvės kontekstą (Sietlas)
3. RLS politika filtruoja duomenis tik Sietlo parduotuvei
4. Sukuriama ir vykdoma SQL užklausa
5. Rezultatai formatuojami ir perduodami AI Chat
6. AI pateikia analizę ir įžvalgas

### Scenarijus 2: Produktų atradimas su semantine paieška

**Naudotojas**: Mike, inventoriaus vadybininkas  
**Tikslas**: Rasti produktus, panašius į kliento užklausą

**Natūralios kalbos užklausa**:
> "Kokius produktus parduodame, kurie panašūs į „atsparius vandeniui elektrinius jungtukus lauko naudotojui“?"

**Kas vyksta**:
1. Užklausa apdorojama semantinės paieškos įrankiu
2. Azure OpenAI generuoja embedavimo vektorių
3. pgvector atlieka panašumo paiešką
4. Susiję produktai surikiuojami pagal svarbumą
5. Rezultatuose pateikiama produktų informacija ir prieinamumas
6. AI siūlo alternatyvas ir komplektavimo galimybes

### Scenarijus 3: Kryžminė parduotuvių analizė

**Naudotojas**: Jennifer, regioninė vadybininkė  
**Tikslas**: Palyginti rezultatus visose parduotuvėse

**Natūralios kalbos užklausa**:
> "Palyginkite pardavimus pagal kategorijas per paskutinius 6 mėnesius visose parduotuvėse"

**Kas vyksta**:
1. Nustatomas RLS kontekstas regioninei vadybinei prieigai
2. Sukuriama sudėtinga užklausa kelioms parduotuvėms
3. Duomenys agreguojami per parduotuvių vietas
4. Rezultatuose pateikiamos tendencijos ir palyginimai
5. AI pateikia įžvalgas ir rekomendacijas

## 🔒 Saugumo ir daugiapakopio prieigos giluminis peržiūrėjimas

Mūsų įgyvendinimas prioritetizuoja įmonių lygio saugumą:

### Eilutės lygio saugumas (RLS)

PostgreSQL RLS užtikrina duomenų izoliavimą:

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

### Naudotojo tapatybės valdymas

Kiekvienas MCP ryšys apima:
- **Parduotuvės vadovo ID**: unikalus RLS konteksto identifikatorius
- **Vaidmens priskyrimas**: leidimai ir prieigos lygiai
- **Sesijos valdymas**: saugūs autentifikacijos tokenai
- **Audito žurnalas**: pilnas prieigos istorijos registravimas

### Duomenų apsauga

Daugiasluoksnis saugumas:
- **Ryšių šifravimas**: TLS visiems duomenų bazės ryšiams
- **SQL injekcijų prevencija**: tik parametrizuotos užklausos
- **Įvesties validacija**: išsami užklausų ir įvesties patikra
- **Klaidų valdymas**: jokios jautrios informacijos klaidų pranešimuose

## 🎯 Pagrindinės išvados

Baigę šį įvadą, turėtumėte suprasti:

✅ **MCP vertės pasiūlymą**: kaip MCP sujungia AI asistentus su realaus pasaulio duomenimis  
✅ **Verslo kontekstą**: Zava Retail reikalavimus ir iššūkius  
✅ **Architektūros apžvalgą**: pagrindinius komponentus ir jų sąveiką  
✅ **Technologijų rinkinį**: naudojamus įrankius ir karkasus  
✅ **Saugumo modelį**: daugiapakopę duomenų prieigą ir apsaugą  
✅ **Naudojimo modelius**: realaus pasaulio užklausų scenarijus ir darbo eigas  

## 🚀 Kas toliau

Pasiruošę gilintis? Tęskite su:

**[Laboratorinis darbas 01: Pagrindinės architektūros koncepcijos](../01-Architecture/README.md)**

Sužinokite apie MCP serverio architektūros modelius, duomenų bazių projektavimo principus ir išsamų techninį įgyvendinimą, kuris palaiko mūsų mažmeninės prekybos analizės sprendimą.

## 📚 Papildomi šaltiniai

### MCP dokumentacija
- [MCP specifikacija](https://modelcontextprotocol.io/docs/) - Oficialioji protokolo dokumentacija
- [MCP pradedantiesiems](https://aka.ms/mcp-for-beginners) - Išsamus MCP mokymosi gidas
- [FastMCP dokumentacija](https://github.com/modelcontextprotocol/python-sdk) - Python SDK dokumentai

### Duomenų bazių integracija
- [PostgreSQL dokumentacija](https://www.postgresql.org/docs/) - Išsamus PostgreSQL žinynas
- [pgvector vadovas](https://github.com/pgvector/pgvector) - Vektorinių plėtinių dokumentacija
- [Eilutės lygio saugumas](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS vadovas

### Azure paslaugos
- [Azure OpenAI dokumentacija](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI paslaugų integracija
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Valdoma duomenų bazės paslauga
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverless konteineriai

---

**Atsakomybės klausimas**: Tai mokymosi pratybos, naudojant fiktyvius mažmeninės prekybos duomenis. Įgyvendindami panašius sprendimus gamybinėje aplinkoje, visuomet laikykitės savo organizacijos duomenų valdymo ir saugumo politikos.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->