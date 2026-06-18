# Úvod do integrácie databázy MCP

## 🎯 Čo tento laboratórny cvičenie pokrýva

Tento úvodný cvičebný kurz poskytuje komplexný prehľad o budovaní serverov Model Context Protocol (MCP) s integráciou databázy. Budete rozumieť obchodnému prípadu, technickej architektúre a reálnym aplikáciám prostredníctvom použitia Zava Retail pre analytiku na https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Prehľad

**Model Context Protocol (MCP)** umožňuje AI asistentom bezpečne pristupovať k externým dátovým zdrojom a interagovať s nimi v reálnom čase. V spojení s integráciou databázy MCP odomyká silné schopnosti pre dátami riadené AI aplikácie.

Táto učebná cesta vás naučí vytvárať MCP servery pripravené na produkciu, ktoré pripájajú AI asistentov k dátam o maloobchodnom predaji cez PostgreSQL a implementujú podnikové vzory ako Row Level Security, sémantické vyhľadávanie a prístup k dátam viacerých nájomcov.

## Učebné ciele

Po ukončení tohto cvičenia budete schopní:

- **Definovať** Model Context Protocol a jeho hlavné výhody pre integráciu databázy
- **Identifikovať** kľúčové komponenty architektúry MCP servera s databázami
- **Pochopiť** prípad použitia Zava Retail a jeho obchodné požiadavky
- **Rozpoznať** podnikové vzory pre bezpečný a škálovateľný prístup k databáze
- **Vymenovať** nástroje a technológie použité počas tejto učebnej cesty

## 🧭 Výzva: AI stretáva reálne dáta

### Tradičné obmedzenia AI

Moderní AI asistenti sú neuveriteľne výkonní, ale čelia významným obmedzeniam pri práci s reálnymi obchodnými dátami:

| **Výzva** | **Popis** | **Obchodný dopad** |
|---------------|-----------------|-------------------|
| **Statické poznatky** | Modely AI trénované na fixných dátach nemajú prístup k aktuálnym obchodným údajom | Zastaralé poznatky, premárnené príležitosti |
| **Dátové silá** | Informácie uzamknuté v databázach, API a systémoch, ku ktorým AI nemá prístup | Neúplná analýza, roztrieštené pracovné postupy |
| **Bezpečnostné obmedzenia** | Priamy prístup do databázy vyvoláva obavy o bezpečnosť a súlad | Obmedzené nasadenie, manuálna príprava dát |
| **Zložité dotazy** | Obchodní používatelia potrebujú technické znalosti, aby získali dátové poznatky | Znížené prijatie, neefektívne procesy |

### Riešenie MCP

Model Context Protocol rieši tieto výzvy tým, že poskytuje:

- **Prístup k dátam v reálnom čase**: AI asistenti dotazujú na živé databázy a API
- **Bezpečnú integráciu**: Kontrolovaný prístup s autentifikáciou a oprávneniami
- **Rozhranie v prirodzenom jazyku**: Obchodní používatelia pokladajú otázky v bežnej angličtine
- **Štandardizovaný protokol**: Funguje naprieč rôznymi AI platformami a nástrojmi

## 🏪 Spoznajte Zava Retail: Naša prípadová štúdia https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Počas tejto učebnej cesty vybudujeme MCP server pre **Zava Retail**, fiktívny reťazec DIY maloobchodu s viacerými pobočkami. Tento realistický scenár demonštruje implementáciu MCP na podnikovej úrovni.

### Obchodný kontext

**Zava Retail** prevádzkuje:
- **8 fyzických obchodov** po celom štáte Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)
- **1 online obchod** pre e-commerce predaj
- **Rôznorodý produktový katalóg** vrátane nástrojov, hardvéru, záhradnej výbavy a stavebných materiálov
- **Viacúrovňový manažment** so zodpovednými manažérmi obchodov, regionálnymi manažérmi a vedúcimi pracovníkmi

### Obchodné požiadavky

Manažéri obchodov a vedúci potrebujú analytiku poháňanú AI, aby mohli:

1. **Analyzovať výkonnosť predaja** naprieč obchodmi a časovými obdobiami
2. **Sledovať úrovne zásob** a identifikovať potreby doplnenia
3. **Pochopiť správanie zákazníkov** a nákupné vzorce
4. **Objavovať produktové poznatky** prostredníctvom sémantického vyhľadávania
5. **Generovať reporty** pomocou dotazov v prirodzenom jazyku
6. **Udržiavať bezpečnosť dát** s riadením prístupov na základe rolí

### Technické požiadavky

MCP server musí poskytovať:

- **Prístup k dátam viacerých nájomcov**, kde manažéri vidia iba údaje svojho obchodu
- **Flexibilné dotazovanie** podporujúce zložité SQL operácie
- **Sémantické vyhľadávanie** na objavovanie produktov a odporúčania
- **Dáta v reálnom čase** odrážajúce aktuálny stav firmy
- **Bezpečnú autentifikáciu** s riadením na úrovni riadkov (Row Level Security)
- **Škálovateľnú architektúru** podporujúcu viacerých súbežných používateľov

## 🏗️ Prehľad architektúry MCP servera

Náš MCP server implementuje vrstvenú architektúru optimalizovanú pre integráciu databázy:

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

### Kľúčové komponenty

#### **1. Vrstva MCP servera**
- **FastMCP Framework**: Moderná implementácia MCP servera v Pythone
- **Registrácia nástrojov**: Deklaratívne definície nástrojov s typovou bezpečnosťou
- **Kontext požiadavky**: Identita používateľa a správa relácie
- **Spracovanie chýb**: Robustné riadenie chýb a logovanie

#### **2. Vrstva integrácie databázy**
- **Pooling pripojení**: Efektívna správa pripojení cez asyncpg
- **Poskytovateľ schémy**: Dynamické zisťovanie schémy tabuliek
- **Vykonávač dotazov**: Bezpečné spúšťanie SQL s kontextom RLS
- **Správa transakcií**: Dodržiavanie ACID a spracovanie rollbacku

#### **3. Bezpečnostná vrstva**
- **Row Level Security**: PostgreSQL RLS na izoláciu dát viacerých nájomcov
- **Identita používateľa**: Autentifikácia a autorizácia manažéra obchodu
- **Riadenie prístupu**: Jemnozrnné oprávnenia a auditné stopy
- **Validácia vstupov**: Prevencia SQL injectu a validácia dotazov

#### **4. Vrstva AI vylepšení**
- **Sémantické vyhľadávanie**: Vektorové embeddingy na objavovanie produktov
- **Integrácia Azure OpenAI**: Generovanie textových embeddingov
- **Algoritmy podobnosti**: pgvector vyhľadávanie podľa kosínovej podobnosti
- **Optimalizácia vyhľadávania**: Indexovanie a ladenie výkonu

## 🔧 Technologický stack

### Základné technológie

| **Komponent** | **Technológia** | **Účel** |
|---------------|----------------|-------------|
| **MCP Framework** | FastMCP (Python) | Moderná implementácia MCP servera |
| **Databáza** | PostgreSQL 17 + pgvector | Relačné dáta s vektorovým vyhľadávaním |
| **AI služby** | Azure OpenAI | Textové embeddingy a jazykové modely |
| **Kontejnerizácia** | Docker + Docker Compose | Vývojové prostredie |
| **Cloud platforma** | Microsoft Azure | Produkčné nasadenie |
| **Integrácia IDE** | VS Code | AI Chat a vývojový workflow |

### Vývojové nástroje

| **Nástroj** | **Účel** |
|----------|-------------|
| **asyncpg** | Vysokovýkonný PostgreSQL driver |
| **Pydantic** | Validácia a serializácia dát |
| **Azure SDK** | Integrácia cloudových služieb |
| **pytest** | Testovací framework |
| **Docker** | Kontejnerizácia a nasadenie |

### Produkčný stack

| **Služba** | **Azure zdroj** | **Účel** |
|-------------|-------------------|-------------|
| **Databáza** | Azure Database for PostgreSQL | Spravovaná databázová služba |
| **Kontajner** | Azure Container Apps | Bezserverové hostovanie kontajnerov |
| **AI služby** | Microsoft Foundry | OpenAI modely a endpointy |
| **Monitorovanie** | Application Insights | Pozorovateľnosť a diagnostika |
| **Bezpečnosť** | Azure Key Vault | Správa tajomstiev a konfigurácií |

## 🎬 Scenáre použitia v reálnom svete

Pozrime sa, ako rôzni používatelia interagujú s naším MCP serverom:

### Scenár 1: Prehliadka výkonnosti manažéra obchodu

**Používateľ**: Sarah, manažérka obchodu v Seattli  
**Cieľ**: Analyzovať výkonnosť predaja za posledný štvrťrok

**Dotaz v prirodzenom jazyku**:
> "Ukáž mi top 10 produktov podľa príjmu pre môj obchod v Q4 2024"

**Čo sa deje**:
1. VS Code AI Chat odosiela dotaz na MCP server
2. MCP server identifikuje kontext obchodu Sarah (Seattle)
3. RLS politika filtruje dáta len pre obchod v Seattli
4. SQL dotaz je vygenerovaný a vykonaný
5. Výsledky sú naformátované a vrátené AI Chat
6. AI poskytuje analýzu a poznatky

### Scenár 2: Objavovanie produktu so sémantickým vyhľadávaním

**Používateľ**: Mike, manažér inventára  
**Cieľ**: Nájsť produkty podobné zákazníckemu požiadavku

**Dotaz v prirodzenom jazyku**:
> "Aké produkty predávame, ktoré sú podobné 'vodotesným elektrickým konektorom na vonkajšie použitie'?"

**Čo sa deje**:
1. Dotaz spracovaný nástrojom sémantického vyhľadávania
2. Azure OpenAI generuje vektor embeddingu
3. pgvector vykonáva vyhľadávanie podľa podobnosti
4. Súvisiace produkty sú zoradené podľa relevantnosti
5. Výsledky zahŕňajú detaily o produktoch a dostupnosti
6. AI navrhuje alternatívy a možnosti bundlovania

### Scenár 3: Analytika medzi obchodmi

**Používateľ**: Jennifer, regionálna manažérka  
**Cieľ**: Porovnať výkonnosť naprieč všetkými obchodmi

**Dotaz v prirodzenom jazyku**:
> "Porovnaj predaj podľa kategórie pre všetky obchody za posledných 6 mesiacov"

**Čo sa deje**:
1. Nastaví sa RLS kontext pre prístup regionálnej manažérky
2. Vygeneruje sa komplexný dotaz pokrývajúci viaceré obchody
3. Dáta sa agregujú z rôznych pobočiek
4. Výsledky zahŕňajú trendy a porovnania
5. AI identifikuje poznatky a odporúčania

## 🔒 Hĺbkový pohľad na bezpečnosť a multi-tenanciu

Naša implementácia kladie dôraz na bezpečnosť na podnikovej úrovni:

### Row Level Security (RLS)

PostgreSQL RLS zabezpečuje izoláciu dát:

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

### Správa identity používateľov

Každé MCP pripojenie obsahuje:
- **ID manažéra obchodu**: Unikátny identifikátor pre RLS kontext
- **Priradenie rolí**: Oprávnenia a úrovne prístupu
- **Správa relácií**: Bezpečné autentifikačné tokeny
- **Auditné logovanie**: Kompletná história prístupov

### Ochrana dát

Viaceré bezpečnostné vrstvy:
- **Šifrovanie pripojenia**: TLS pre všetky spojenia do databázy
- **Prevencia SQL injection**: Iba parametrizované dotazy
- **Validácia vstupu**: Komplexná validácia požiadaviek
- **Spracovanie chýb**: Žiadne citlivé údaje v chybových hláseniach

## 🎯 Kľúčové zistenia

Po prečítaní tohto úvodu by ste mali rozumieť:

✅ **Hodnote MCP**: Ako MCP prepája AI asistentov s reálnymi dátami  
✅ **Obchodnému kontextu**: Požiadavky a výzvy Zava Retail  
✅ **Prehľadu architektúry**: Kľúčové komponenty a ich interakcie  
✅ **Technologickému stacku**: Nástroje a frameworky použité počas cesty  
✅ **Bezpečnostnému modelu**: Prístup k dátam viacerých nájomcov a ochrana  
✅ **Vzory použitia**: Reálne scenáre dotazov a pracovné postupy  

## 🚀 Čo ďalej

Ste pripravení hlbšie preniknúť? Pokračujte s:

**[Lab 01: Core Architecture Concepts](../01-Architecture/README.md)**

Naučíte sa o vzorcoch architektúry MCP servera, princípoch návrhu databázy a detailnej technickej implementácii, ktorá poháňa naše riešenie maloobchodnej analytiky.

## 📚 Dodatočné zdroje

### Dokumentácia MCP
- [MCP špecifikácia](https://modelcontextprotocol.io/docs/) - Oficiálna dokumentácia protokolu
- [MCP pre začiatočníkov](https://aka.ms/mcp-for-beginners) - Komplexný učebný sprievodca MCP
- [FastMCP dokumentácia](https://github.com/modelcontextprotocol/python-sdk) - Python SDK dokumentácia

### Integrácia databázy
- [PostgreSQL dokumentácia](https://www.postgresql.org/docs/) - Kompletná referenčná príručka PostgreSQL
- [pgvector príručka](https://github.com/pgvector/pgvector) - Dokumentácia rozšírenia vektorov
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Sprievodca RLS v PostgreSQL

### Azure služby
- [Azure OpenAI dokumentácia](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integrácia AI služieb
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Spravovaná databázová služba
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Bezserverové kontajnery

---

**Vysvetlenie**: Toto je učebné cvičenie využívajúce fiktívne maloobchodné dáta. Vždy dodržiavajte zásady dátovej správy a bezpečnostné politiky vašej organizácie pri implementácii podobných riešení v produkčnom prostredí.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->