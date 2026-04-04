# 🚀 MCP Server s PostgreSQL – Kompletní výukový průvodce

## 🧠 Přehled výukové cesty integrace databáze MCP

Tento komplexní výukový průvodce vás naučí, jak postavit produkčně připravené **Model Context Protocol (MCP) servery**, které se integrují s databázemi prostřednictvím praktické implementace maloobchodní analytiky. Naučíte se podnikové vzory včetně **Row Level Security (RLS)**, **sémantického vyhledávání**, **integrace Azure AI** a **vícenájemnického přístupu k datům**.

Ať už jste backendový vývojář, AI inženýr nebo datový architekt, tento průvodce nabízí strukturované učení s reálnými příklady a praktickými cvičeními, které vás provedou následujícím MCP serverem https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Oficiální zdroje MCP

- 📘 [Dokumentace MCP](https://modelcontextprotocol.io/) – Podrobné návody a uživatelské příručky  
- 📜 [Specifikace MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Architektura protokolu a technické reference  
- 🧑‍💻 [GitHub repozitář MCP](https://github.com/modelcontextprotocol) – Open-source SDK, nástroje a ukázky kódu  
- 🌐 [Komunita MCP](https://github.com/orgs/modelcontextprotocol/discussions) – Připojte se k diskuzím a přispívejte komunitě  
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Bezpečnostní osvědčené postupy a mitigace rizik  

## 🧭 Výuková cesta integrace databáze MCP

### 📚 Kompletní struktura učení pro https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Lab | Téma | Popis | Odkaz |
|--------|-------|-------------|------|
| **Lab 1-3: Základy** | | | |
| 00 | [Úvod do integrace databáze MCP](./00-Introduction/README.md) | Přehled MCP s integrací databáze a případ použití maloobchodní analytiky | [Začít zde](./00-Introduction/README.md) |
| 01 | [Základní koncepty architektury](./01-Architecture/README.md) | Porozumění architektuře MCP serveru, datovým vrstvám a bezpečnostním vzorům | [Naučit se](./01-Architecture/README.md) |
| 02 | [Bezpečnost a vícenájemnictví](./02-Security/README.md) | Row Level Security, autentizace a vícenájemnický přístup k datům | [Naučit se](./02-Security/README.md) |
| 03 | [Nastavení prostředí](./03-Setup/README.md) | Nastavení vývojového prostředí, Docker, Azure zdroje | [Nastavit](./03-Setup/README.md) |
| **Lab 4-6: Stavba MCP serveru** | | | |
| 04 | [Návrh databáze a schéma](./04-Database/README.md) | Nastavení PostgreSQL, návrh maloobchodního schématu a vzorová data | [Stavět](./04-Database/README.md) |
| 05 | [Implementace MCP serveru](./05-MCP-Server/README.md) | Stavba FastMCP serveru s integrací databáze | [Stavět](./05-MCP-Server/README.md) |
| 06 | [Vývoj nástrojů](./06-Tools/README.md) | Vytváření nástrojů pro dotazy do databáze a introspekce schématu | [Stavět](./06-Tools/README.md) |
| **Lab 7-9: Pokročilé funkce** | | | |
| 07 | [Integrace sémantického vyhledávání](./07-Semantic-Search/README.md) | Implementace vektorových embedings s Azure OpenAI a pgvector | [Pokročilé](./07-Semantic-Search/README.md) |
| 08 | [Testování a ladění](./08-Testing/README.md) | Testovací strategie, ladící nástroje a validační přístupy | [Testovat](./08-Testing/README.md) |
| 09 | [Integrace ve VS Code](./09-VS-Code/README.md) | Konfigurace integrace MCP ve VS Code a používání AI chatu | [Integrovat](./09-VS-Code/README.md) |
| **Lab 10-12: Produkce a osvědčené postupy** | | | |
| 10 | [Strategie nasazení](./10-Deployment/README.md) | Nasazení v Dockeru, Azure Container Apps a škálování | [Nasadit](./10-Deployment/README.md) |
| 11 | [Monitoring a pozorovatelnost](./11-Monitoring/README.md) | Application Insights, logování, monitorování výkonu | [Monitorovat](./11-Monitoring/README.md) |
| 12 | [Nejlepší praktiky a optimalizace](./12-Best-Practices/README.md) | Optimalizace výkonu, zabezpečení a tipy pro produkci | [Optimalizovat](./12-Best-Practices/README.md) |

### 💻 Co vytvoříte

Na konci této výukové cesty budete mít plně funkční **Zava Retail Analytics MCP Server**, který obsahuje:

- **Vícekolejovou maloobchodní databázi** s objednávkami zákazníků, produkty a skladem
- **Row Level Security** pro izolaci dat podle prodejny
- **Sémantické vyhledávání produktů** pomocí Azure OpenAI embedings
- **Integraci VS Code AI Chatu** pro dotazy v přirozeném jazyce
- **Produkčně připravené nasazení** s Dockerem a Azure
- **Komplexní monitoring** s Application Insights

## 🎯 Požadavky pro učení

Abyste získali co nejvíce z této výukové cesty, měli byste mít:

- **Zkušenosti s programováním**: Znalost Pythonu (doporučeno) nebo podobných jazyků  
- **Znalosti databází**: Základní porozumění SQL a relačním databázím  
- **Koncepty API**: Porozumění REST API a HTTP konceptům  
- **Vývojové nástroje**: Zkušenosti s příkazovou řádkou, Gitem a kódovými editory  
- **Základy cloudu**: (Volitelné) Základní znalost Azure nebo podobných cloudových platforem  
- **Znalost Dockeru**: (Volitelné) Porozumění konceptu kontejnerizace

### Požadované nástroje

- **Docker Desktop** – Pro spuštění PostgreSQL a MCP serveru  
- **Azure CLI** – Pro nasazení cloudových zdrojů  
- **VS Code** – Pro vývoj a integraci MCP  
- **Git** – Pro správu verzí  
- **Python 3.8+** – Pro vývoj MCP serveru  

## 📚 Studijní průvodce & zdroje

Tato výuková cesta obsahuje komplexní zdroje, které vám pomohou efektivně postupovat:

### Studijní průvodce

Každý lab obsahuje:  
- **Jasné cíle učení** – Co se naučíte  
- **Krok za krokem instrukce** – Podrobné návody k implementaci  
- **Ukázky kódu** – Fungující příklady s vysvětlením  
- **Cvičení** – Příležitosti pro praktický trénink  
- **Průvodce řešením problémů** – Časté problémy a řešení  
- **Další zdroje** – Další čtení a průzkum  

### Kontrola předpokladů

Před začátkem každého labu naleznete:  
- **Požadované znalosti** – Co byste měli znát předem  
- **Ověření nastavení** – Jak ověřit své prostředí  
- **Časové odhady** – Očekávaná doba dokončení  
- **Výsledky učení** – Co budete umět po dokončení  

### Doporučené výukové cesty

Vyberte si cestu podle své úrovně zkušeností:

#### 🟢 **Začátečnická cesta** (Nový v MCP)  
1. Nejprve dokončete 0-10 z [MCP for Beginners](https://aka.ms/mcp-for-beginners)  
2. Dokončete laby 00-03 pro posílení základů  
3. Následujte laby 04-06 pro praktickou stavbu  
4. Vyzkoušejte laby 07-09 pro praktické použití

#### 🟡 **Středně pokročilá cesta** (S nějakou zkušeností s MCP)  
1. Projděte laby 00-01 pro databázové koncepty  
2. Zaměřte se na laby 02-06 pro implementaci  
3. Hlouběji prozkoumejte laby 07-12 pro pokročilé funkce

#### 🔴 **Pokročilá cesta** (Zkušený v MCP)  
1. Prolistujte laby 00-03 pro kontext  
2. Zaměřte se na laby 04-09 pro databázovou integraci  
3. Soustřeďte se na laby 10-12 pro produkční nasazení  

## 🛠️ Jak používat tuto výukovou cestu efektivně

### Sekvenční učení (doporučeno)

Projděte laby postupně pro komplexní pochopení:

1. **Přečtěte si přehled** – Pochopte, co se naučíte  
2. **Zkontrolujte předpoklady** – Ujistěte se, že máte potřebné znalosti  
3. **Následujte návody krok za krokem** – Implementujte podle učení  
4. **Dokončete cvičení** – Posilte své pochopení  
5. **Zopakujte si hlavní závěry** – Upevněte výsledky učení  

### Cílené učení

Pokud potřebujete konkrétní dovednosti:

- **Integrace databáze**: Zaměřte se na laby 04-06  
- **Implementace bezpečnosti**: Soustřeďte se na laby 02, 08, 12  
- **AI/sémantické vyhledávání**: Hloubkově v labu 07  
- **Produkční nasazení**: Studujte laby 10-12  

### Praktický nácvik

Každý lab obsahuje:  
- **Fungující příklady kódu** – Kopírujte, upravujte a experimentujte  
- **Reálné scénáře** – Praktické případy použití maloobchodní analýzy  
- **Postupující složitost** – Stavba od jednoduchého po pokročilé  
- **Kroky ověření** – Ověřte, že vaše implementace funguje  

## 🌟 Komunita a podpora

### Získejte pomoc

- **Azure AI Discord**: [Připojte se pro odbornou podporu](https://discord.com/invite/ByRwuEEgH4)  
- **GitHub repozitář a ukázka implementace**: [Ukázková nasazení a zdroje](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)  
- **Komunita MCP**: [Připojte se k širším diskuzím MCP](https://github.com/orgs/modelcontextprotocol/discussions)  

## 🚀 Připraven začít?

Začněte svou cestu s **[Lab 00: Úvod do integrace databáze MCP](./00-Introduction/README.md)**

---

*Mistrovsky postavte produkčně připravené MCP servery s integrací databáze prostřednictvím této komplexní, praktické výukové zkušenosti.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro důležité informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoliv nedorozumění nebo chybný výklad vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->