# Úvod do integrace databáze MCP

## 🎯 Co tento lab pokrývá

Tento úvodní lab poskytuje komplexní přehled o vytváření serverů Model Context Protocol (MCP) s integrací databáze. Pochopíte obchodní případ, technickou architekturu a reálné aplikace prostřednictvím případu použití Zava Retail analýzy na https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Přehled

**Model Context Protocol (MCP)** umožňuje AI asistentům bezpečný přístup a interakci s externími zdroji dat v reálném čase. Ve spojení s integrací databáze MCP otevírá silné možnosti pro aplikace AI založené na datech.

Tato výuková cesta vás naučí vytvářet produkčně připravené MCP servery, které propojují AI asistenty s prodejními daty maloobchodu přes PostgreSQL a implementují podnikové vzory jako Row Level Security, sémantické vyhledávání a přístup k datům více nájemců.

## Cíle učení

Na konci tohoto labu budete schopni:

- **Definovat** Model Context Protocol a jeho hlavní přínosy pro integraci databáze  
- **Identifikovat** klíčové komponenty architektury MCP serveru s databázemi  
- **Pochopit** případ použití Zava Retail a jeho obchodní požadavky  
- **Rozpoznat** podnikové vzory pro bezpečný, škálovatelný přístup k databázi  
- **Vyjmenovat** nástroje a technologie používané během této výukové cesty  

## 🧭 Výzva: AI potkává reálná data

### Tradiční omezení AI

Moderní AI asistenti jsou nesmírně schopní, ale čelí významným omezením při práci s reálnými obchodními daty:

| **Výzva** | **Popis** | **Obchodní dopad** |
|---------------|-----------------|-------------------|
| **Statické znalosti** | AI modely trénované na fixních datech nemají přístup k aktuálním obchodním datům | Zastaralé poznatky, promarněné příležitosti |
| **Datové silo** | Informace uzavřené v databázích, API a systémech, kam AI nemá přístup | Neúplná analýza, fragmentované workflow |
| **Bezpečnostní omezení** | Přímý přístup k databázi přináší bezpečnostní a shodné obavy | Omezené nasazení, manuální příprava dat |
| **Složité dotazy** | Obchodní uživatelé potřebují technické znalosti k získání datových poznatků | Snížené přijetí, neefektivní procesy |

### Řešení MCP

Model Context Protocol řeší tyto výzvy tím, že poskytuje:

- **Přístup k datům v reálném čase**: AI asistenti dotazují živé databáze a API  
- **Bezpečnou integraci**: Kontrolovaný přístup s autentizací a oprávněními  
- **Rozhraní v přirozeném jazyce**: Obchodní uživatelé kladou dotazy běžnou angličtinou  
- **Standardizovaný protokol**: Funguje napříč různými AI platformami a nástroji  

## 🏪 Seznamte se se Zava Retail: náš případová studie https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Během této výukové cesty vybudujeme MCP server pro **Zava Retail**, fiktivní maloobchodní řetězec DIY s více pobočkami. Tento realistický scénář demonstruje implementaci MCP na podnikové úrovni.

### Obchodní kontext

**Zava Retail** provozuje:  
- **8 kamenných prodejen** po celém státě Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 online obchod** pro prodej e-commerce  
- **Různorodý katalog produktů** zahrnující nářadí, hardwarové potřeby, zahradní zásoby a stavební materiály  
- **Víceúrovňové řízení** s vedoucími prodejen, regionálními manažery a vedením  

### Obchodní požadavky

Vedoucí prodejen a vedení potřebují AI-řízené analytiky, aby:

1. **Analyzovali prodejní výkonnost** napříč prodejnami a časovými obdobími  
2. **Sledovali stavy zásob** a identifikovali potřebu doplnění  
3. **Chápali chování zákazníků** a nákupní vzory  
4. **Objevovali produktové poznatky** přes sémantické vyhledávání  
5. **Generovali reporty** pomocí dotazů v přirozeném jazyce  
6. **Udržovali bezpečnost dat** s řízením přístupu podle rolí  

### Technické požadavky

MCP server musí poskytovat:

- **Vícenájemnický přístup k datům**, kde vedoucí vidí pouze data své prodejny  
- **Flexibilní dotazování** podporující složité SQL operace  
- **Sémantické vyhledávání** pro objevování produktů a doporučení  
- **Data v reálném čase** odrážející aktuální obchodní stav  
- **Bezpečnou autentizaci** s řízením přístupu na úrovni řádků  
- **Škálovatelnou architekturu**, podporující více současných uživatelů  

## 🏗️ Přehled architektury MCP serveru

Náš MCP server implementuje vrstevnou architekturu optimalizovanou pro integraci databáze:

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

### Klíčové komponenty

#### **1. Vrstva MCP serveru**
- **Rámec FastMCP**: Moderní implementace MCP serveru v Pythonu  
- **Registrace nástrojů**: Deklarativní definice nástrojů s typovou bezpečností  
- **Kontext požadavku**: Identita uživatele a správa relace  
- **Zpracování chyb**: Robustní správa chyb a logování  

#### **2. Vrstva integrace databáze**
- **Poolování připojení**: Efektivní správa asynchronních připojení asyncpg  
- **Poskytovatel schématu**: Dynamické zjišťování tabulkových schémat  
- **Vykonávač dotazů**: Bezpečné provedení SQL s kontextem RLS  
- **Správa transakcí**: Soulad s ACID a rollback zpracování  

#### **3. Bezpečnostní vrstva**
- **Řízení přístupu na úrovni řádků (RLS)**: PostgreSQL RLS pro izolaci dat více nájemců  
- **Identita uživatele**: Autentizace a autorizace vedoucích prodejen  
- **Řízení přístupu**: Jemně granulovaná oprávnění a auditní stopy  
- **Validace vstupu**: Prevence SQL injekcí a validace dotazů  

#### **4. Vrstva AI rozšíření**
- **Sémantické vyhledávání**: Vektorové vnoření pro objevování produktů  
- **Integrace Azure OpenAI**: Generování textových vnoření  
- **Algoritmy podobnosti**: pgvector cosine similarity vyhledávání  
- **Optimalizace vyhledávání**: Indexace a ladění výkonu  

## 🔧 Technologie

### Základní technologie

| **Komponenta** | **Technologie** | **Účel** |
|---------------|----------------|-------------|
| **Rámec MCP** | FastMCP (Python) | Moderní implementace MCP serveru |
| **Databáze** | PostgreSQL 17 + pgvector | Relační data s vektorovým vyhledáváním |
| **AI služby** | Azure OpenAI | Textová vnoření a jazykové modely |
| **Kontejnerizace** | Docker + Docker Compose | Vývojové prostředí |
| **Cloud platforma** | Microsoft Azure | Produkční nasazení |
| **Integrace IDE** | VS Code | AI chat a vývojový workflow |

### Vývojové nástroje

| **Nástroj** | **Účel** |
|----------|-------------|
| **asyncpg** | Vysoce výkonný PostgreSQL ovladač |
| **Pydantic** | Validace a serializace dat |
| **Azure SDK** | Integrace cloudových služeb |
| **pytest** | Testovací framework |
| **Docker** | Kontejnerizace a nasazení |

### Produkční stack

| **Služba** | **Azure zdroj** | **Účel** |
|-------------|-------------------|-------------|
| **Databáze** | Azure Database for PostgreSQL | Spravovaná databázová služba |
| **Kontejner** | Azure Container Apps | Serverless hosting kontejnerů |
| **AI služby** | Microsoft Foundry | OpenAI modely a endpointy |
| **Monitorování** | Application Insights | Pozorovatelnost a diagnostika |
| **Bezpečnost** | Azure Key Vault | Správa tajemství a konfigurace |

## 🎬 Scénáře reálného použití

Podívejme se, jak různí uživatelé interagují s naším MCP serverem:

### Scénář 1: Přehled výkonu vedoucího prodejny

**Uživatel**: Sarah, vedoucí prodejny v Seattlu  
**Cíl**: Analyzovat výkonnost prodeje za poslední čtvrtletí

**Dotaz v přirozeném jazyce**:  
> "Ukaž mi top 10 produktů podle příjmu pro mou prodejnu ve 4. čtvrtletí 2024"

**Co se stane**:  
1. VS Code AI Chat pošle dotaz MCP serveru  
2. MCP server identifikuje kontext prodejny Sarah (Seattle)  
3. Politiky RLS filtrují data jen pro prodejnu Seattle  
4. SQL dotaz je vygenerován a proveden  
5. Výsledky jsou formátovány a vráceny AI chatu  
6. AI poskytne analýzu a poznatky  

### Scénář 2: Objevování produktů sémantickým vyhledáváním

**Uživatel**: Mike, manažer zásob  
**Cíl**: Najít produkty podobné požadavku zákazníka

**Dotaz v přirozeném jazyce**:  
> "Jaké produkty prodáváme, které jsou podobné 'vodotěsným elektrickým konektorům pro venkovní použití'?"

**Co se stane**:  
1. Dotaz je zpracován nástrojem sémantického vyhledávání  
2. Azure OpenAI vygeneruje vektorové vnoření  
3. pgvector provede vyhledávání podobnosti  
4. Související produkty se seřadí podle relevance  
5. Výsledky obsahují detaily produktu a dostupnost  
6. AI navrhne alternativy a příležitosti ke kompletaci  

### Scénář 3: Analýza napříč prodejnami

**Uživatel**: Jennifer, regionální manažerka  
**Cíl**: Porovnat výkonnost napříč všemi prodejnami

**Dotaz v přirozeném jazyce**:  
> "Porovnej prodeje podle kategorií pro všechny prodejny za posledních 6 měsíců"

**Co se stane**:  
1. Kontekst RLS nastaví přístup regionální manažerky  
2. Vytvoří se složitý dotaz napříč více prodejnami  
3. Data se agregují mezi prodejnami  
4. Výsledky obsahují trendy a porovnání  
5. AI identifikuje poznatky a doporučení  

## 🔒 Bezpečnost a více nájemnický přístup do hloubky

Naše implementace upřednostňuje bezpečnost na podnikové úrovni:

### Řízení přístupu na úrovni řádků (RLS)

PostgreSQL RLS zajišťuje izolaci dat:

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

### Správa identity uživatele

Každé MCP připojení obsahuje:  
- **ID vedoucího prodejny**: Unikátní identifikátor pro kontext RLS  
- **Přiřazení rolí**: Oprávnění a úrovně přístupu  
- **Správa relace**: Bezpečné autentizační tokeny  
- **Auditní logování**: Kompletní historie přístupů  

### Ochrana dat

Více vrstev bezpečnosti:  
- **Šifrování připojení**: TLS pro všechna databázová připojení  
- **Prevence SQL injekcí**: Pouze parametrizované dotazy  
- **Validace vstupů**: Komplexní ověřování požadavků  
- **Zpracování chyb**: Žádné citlivé údaje v chybových zprávách  

## 🎯 Klíčové poznatky

Po dokončení tohoto úvodu byste měli rozumět:

✅ **Hodnotě MCP**: Jak MCP propojuje AI asistenty a reálná data  
✅ **Obchodnímu kontextu**: Požadavkům a výzvám Zava Retail  
✅ **Přehledu architektury**: Klíčovým komponentám a jejich interakcím  
✅ **Technologickému stacku**: Používaným nástrojům a rámcům  
✅ **Bezpečnostnímu modelu**: Vícenájemnickému přístupu a ochraně dat  
✅ **Vzorcům použití**: Reálným scénářům dotazů a pracovním postupům  

## 🚀 Co dál

Připraveni jít hlouběji? Pokračujte s:

**[Lab 01: Základní architektonické koncepty](../01-Architecture/README.md)**

Naučte se o vzorech architektury MCP serveru, principech návrhu databáze a podrobných technických implementacích, které pohánějí naše maloobchodní analytické řešení.

## 📚 Další zdroje

### Dokumentace MCP  
- [Specifikace MCP](https://modelcontextprotocol.io/docs/) - Oficiální protokolová dokumentace  
- [MCP pro začátečníky](https://aka.ms/mcp-for-beginners) - Komplexní průvodce učením MCP  
- [FastMCP dokumentace](https://github.com/modelcontextprotocol/python-sdk) - Dokumentace Python SDK  

### Integrace databází  
- [PostgreSQL dokumentace](https://www.postgresql.org/docs/) - Kompletní reference PostgreSQL  
- [Průvodce pgvector](https://github.com/pgvector/pgvector) - Dokumentace rozšíření vektorů  
- [Řízení přístupu na úrovni řádků](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Průvodce RLS PostgreSQL  

### Azure služby  
- [Azure OpenAI dokumentace](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integrace AI služeb  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Spravovaná databázová služba  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverless kontejnery  

---

**Poznámka**: Toto je výukový úkol využívající fiktivní maloobchodní data. Při implementaci podobných řešení v produkčním prostředí vždy dodržujte zásady správy dat a bezpečnostní politiky vaší organizace.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->