# 🚀 MCP Server s PostgreSQL – Kompletný učebný sprievodca

## 🧠 Prehľad vzdelávacej cesty integrácie MCP s databázou

Tento komplexný učebný sprievodca vás naučí, ako vytvoriť produkčne pripravené **Model Context Protocol (MCP) servery**, ktoré integrujú databázy prostredníctvom praktickej implementácie retailovej analytiky. Naučíte sa podnikové vzory vrátane **Row Level Security (RLS)**, **sémantického vyhľadávania**, **integrácie Azure AI** a **multitenantného prístupu k dátam**.

Nezáleží na tom, či ste backend vývojár, AI inžinier alebo dátový architekt, tento sprievodca vám poskytne štruktúrované učenie s reálnymi príkladmi a praktickými cvičeniami, ktoré vás prevedú nasledujúcim MCP serverom https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Oficiálne MCP zdroje

- 📘 [MCP Dokumentácia](https://modelcontextprotocol.io/) – Detailné návody a používateľské príručky
- 📜 [MCP Špecifikácia (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Architektúra protokolu a technické referencie
- 🧑‍💻 [MCP GitHub úložisko](https://github.com/modelcontextprotocol) – Open-source SDK, nástroje a príklady kódu
- 🌐 [MCP Komunita](https://github.com/orgs/modelcontextprotocol/discussions) – Zapojte sa do diskusií a prispejte komunite
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Najlepšie bezpečnostné praktiky a zmierňovanie rizík

## 🧭 Vzdelávacia cesta integrácie MCP s databázou

### 📚 Kompletná štruktúra učenia pre https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Laboratórium | Téma | Popis | Odkaz |
|--------|-------|-------------|------|
| **Lab 1-3: Základy** | | | |
| 00 | [Úvod do integrácie MCP s databázou](./00-Introduction/README.md) | Prehľad MCP s integráciou databázy a prípad použitia retailovej analytiky | [Začíname tu](./00-Introduction/README.md) |
| 01 | [Základné architektonické koncepty](./01-Architecture/README.md) | Pochopenie architektúry MCP servera, databázových vrstiev a bezpečnostných vzorov | [Naučiť sa](./01-Architecture/README.md) |
| 02 | [Bezpečnosť a multitenancia](./02-Security/README.md) | Row Level Security, autentifikácia a multitenantný prístup k údajom | [Naučiť sa](./02-Security/README.md) |
| 03 | [Nastavenie prostredia](./03-Setup/README.md) | Nastavenie vývojového prostredia, Docker, Azure zdroje | [Nastaviť](./03-Setup/README.md) |
| **Lab 4-6: Budovanie MCP servera** | | | |
| 04 | [Návrh databázy a schémy](./04-Database/README.md) | Nastavenie PostgreSQL, návrh retail schémy a ukážkové dáta | [Stavať](./04-Database/README.md) |
| 05 | [Implementácia MCP servera](./05-MCP-Server/README.md) | Výstavba FastMCP servera s integráciou databázy | [Stavať](./05-MCP-Server/README.md) |
| 06 | [Vývoj nástrojov](./06-Tools/README.md) | Tvorba nástrojov na databázové dotazy a introspekciu schémy | [Stavať](./06-Tools/README.md) |
| **Lab 7-9: Pokročilé funkcie** | | | |
| 07 | [Integrácia sémantického vyhľadávania](./07-Semantic-Search/README.md) | Implementácia vektorových embeddings s Azure OpenAI a pgvector | [Pokročiť](./07-Semantic-Search/README.md) |
| 08 | [Testovanie a ladenie](./08-Testing/README.md) | Testovacie stratégie, nástroje na ladenie a prístupy k validácii | [Testovať](./08-Testing/README.md) |
| 09 | [Integrácia s VS Code](./09-VS-Code/README.md) | Konfigurácia VS Code MCP integrácie a využívanie AI chatu | [Integrovať](./09-VS-Code/README.md) |
| **Lab 10-12: Produkčné nasadenie a najlepšie praktiky** | | | |
| 10 | [Stratégie nasadenia](./10-Deployment/README.md) | Nasadenie pomocou Docker, Azure Container Apps a škálovanie | [Nasadiť](./10-Deployment/README.md) |
| 11 | [Monitorovanie a sledovateľnosť](./11-Monitoring/README.md) | Application Insights, logovanie, monitorovanie výkonu | [Monitorovať](./11-Monitoring/README.md) |
| 12 | [Najlepšie praktiky a optimalizácia](./12-Best-Practices/README.md) | Optimalizácia výkonu, sprísnenie bezpečnosti a produkčné tipy | [Optimalizovať](./12-Best-Practices/README.md) |

### 💻 Čo postavíte

Na konci tejto vzdelávacej cesty budete mať postavený kompletný **Zava Retail Analytics MCP Server** so znalosťami:

- **Viacero tabuľková retail databáza** so zákazníckymi objednávkami, produktmi a inventárom
- **Row Level Security** pre izoláciu údajov podľa obchodu
- **Sémantické vyhľadávanie produktov** pomocou Azure OpenAI embeddings
- **VS Code AI Chat integrácia** pre dotazy v prirodzenom jazyku
- **Produkčné nasadenie** s Docker a Azure
- **Komplexné monitorovanie** cez Application Insights

## 🎯 Predpoklady pre učenie

Pre maximálny úžitok z tejto vzdelávacej cesty by ste mali mať:

- **Skúsenosti s programovaním**: Znalosť Pythonu (preferované) alebo podobných jazykov
- **Znalosti databáz**: Základy SQL a relačných databáz
- **Koncepty API**: Pochopenie REST API a HTTP princípov
- **Vývojové nástroje**: Skúsenosti s príkazovým riadkom, Git a editorami kódu
- **Základy cloudu**: (voliteľné) Základné znalosti Azure alebo podobných cloudu platforiem
- **Znalosť Dockeru**: (voliteľné) Pochopenie kontajnerizácie

### Potrebné nástroje

- **Docker Desktop** – na spúšťanie PostgreSQL a MCP servera
- **Azure CLI** – na nasadenie cloudových zdrojov
- **VS Code** – na vývoj a MCP integráciu
- **Git** – na verziovanie kódu
- **Python 3.8+** – na vývoj MCP servera

## 📚 Študijný sprievodca a zdroje

Táto vzdelávacia cesta obsahuje komplexné zdroje pre efektívnu orientáciu:

### Študijný sprievodca

Každé laboratórium obsahuje:
- **Jasné učebné ciele** – Čo dosiahnete
- **Krok za krokom návody** – Detailné praktické inštrukcie
- **Ukážky kódu** – Funkčné príklady s vysvetleniami
- **Cvičenia** – Praktické úlohy na precvičenie
- **Návody na riešenie problémov** – Bežné problémy a riešenia
- **Doplnkové zdroje** – Ďalšie čítanie a štúdium

### Kontrola predpokladov

Pred začatím každého laboratória nájdete:
- **Požadované znalosti** – Čo by ste mali vedieť predtým
- **Overenie nastavenia** – Ako skontrolovať prostredie
- **Odhadovaný čas** – Očakávaná doba dokončenia
- **Výsledky učenia** – Čo budete vedieť po dokončení

### Odporúčané vzdelávacie cesty

Vyberte si cestu podľa vašej úrovne skúseností:

#### 🟢 **Začiatočnícka cesta** (nováčik v MCP)
1. Najskôr dokončite kroky 0-10 v [MCP pre začiatočníkov](https://aka.ms/mcp-for-beginners)
2. Dokončite laboratória 00-03 na upevnenie základov
3. Nasledujte laboratória 04-06 pre praktickú výstavbu
4. Vyskúšajte laboratória 07-09 na praktické využitie

#### 🟡 **Stredne pokročilá cesta** (niečo skúseností s MCP)
1. Prezrite si laboratória 00-01 pre koncepty špecifické pre databázy
2. Zamerajte sa na laboratória 02-06 pre implementáciu
3. Ponorte sa hlboko do laboratórií 07-12 pre pokročilé funkcie

#### 🔴 **Pokročilá cesta** (skúsený s MCP)
1. Prebehnite laboratória 00-03 na získanie kontextu
2. Zamerajte sa na laboratória 04-09 pre integráciu databáz
3. Koncentrujte sa na laboratória 10-12 pre produkčné nasadenie

## 🛠️ Ako efektívne používať túto vzdelávaciu cestu

### Sekvenčné učenie (odporúčané)

Prejdite laboratóriá v poradí pre komplexné pochopenie:

1. **Prečítajte si prehľad** – Pochopte, čo sa naučíte
2. **Skontrolujte predpoklady** – Uistite sa, že máte potrebné znalosti
3. **Nasledujte krok za krokom návody** – Implementujte počas učenia
4. **Dokončite cvičenia** – Upevnite si vaše znalosti
5. **Prejdite si kľúčové poznatky** – Zdokonaľujte si výsledky učenia

### Cieľové učenie

Ak potrebujete konkrétne zručnosti:

- **Integrácia databázy**: Zamerajte sa na laboratória 04-06
- **Implementácia bezpečnosti**: Sústreďte sa na laboratória 02, 08, 12
- **AI/sémantické vyhľadávanie**: Preštudujte laboratórium 07
- **Produkčné nasadenie**: Študujte laboratória 10-12

### Praktické cvičenia

Každé laboratórium obsahuje:
- **Funkčné ukážky kódu** – Kopírujte, modifikujte a experimentujte
- **Reálne scenáre** – Praktické prípady použitia retailovej analytiky
- **Postupnú komplexnosť** – Budovanie od jednoduchého po pokročilé
- **Validáciu krokov** – Overte správnosť implementácie

## 🌟 Komunita a podpora

### Získajte pomoc

- **Azure AI Discord**: [Pripojte sa pre odbornú podporu](https://discord.com/invite/ByRwuEEgH4)
- **GitHub repozitár a ukážka implementácie**: [Ukážka nasadenia a zdroje](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **MCP komunita**: [Zapojte sa do širších MCP diskusií](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Pripravení začať?

Začnite svoju cestu s **[Lab 00: Úvod do integrácie MCP s databázou](./00-Introduction/README.md)**

---

*Osvojte si tvorbu produkčne pripravených MCP serverov s integráciou databázy prostredníctvom tohto komplexného, praktického učebného zážitku.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zrieknutie sa zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, berte prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre dôležité informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nedorozumenia alebo nesprávne výklady vyplývajúce z používania tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->