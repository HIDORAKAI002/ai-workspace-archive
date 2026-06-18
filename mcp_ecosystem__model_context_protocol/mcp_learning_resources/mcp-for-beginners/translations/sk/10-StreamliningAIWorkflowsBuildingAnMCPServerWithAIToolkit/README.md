# Zjednodušenie AI pracovných tokov: Budovanie MCP servera s Microsoft Foundry Toolkit

[![MCP špecifikácia](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/sk/logo.ec93918ec338dadd.webp)

## 🎯 Prehľad

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/sk/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Kliknite na obrázok vyššie pre zobrazenie videa k tejto lekcii)_

Vitajte na **Model Context Protocol (MCP) workshope**! Tento komplexný praktický workshop spája dve špičkové technológie, ktoré revolučne menia vývoj AI aplikácií:

- **🔗 Model Context Protocol (MCP)**: Otvorený štandard pre bezproblémovú integráciu AI nástrojov
- **🛠️ Microsoft Foundry Toolkit Extension pre VS Code**: Výkonné rozšírenie pre vývoj AI od Microsoftu

### 🎓 Čo sa naučíte

Na konci tohto workshopu ovládnete umenie vytvárania inteligentných aplikácií, ktoré prepájajú AI modely so skutočnými nástrojmi a službami. Od automatizovaného testovania po vlastnú integráciu API získate praktické zručnosti na riešenie komplexných obchodných výziev.

## 🏗️ Technologický stack

### 🔌 Model Context Protocol (MCP)

MCP je **"USB-C pre AI"** - univerzálny štandard, ktorý prepája AI modely s externými nástrojmi a zdrojmi dát.

**✨ Kľúčové vlastnosti:**

- 🔄 **Štandardizovaná integrácia**: Univerzálne rozhranie pre prepojenie AI s nástrojmi
- 🏛️ **Flexibilná architektúra**: Lokálne i vzdialené servery cez stdio/SSE prenos
- 🧰 **Bohatý ekosystém**: Nástroje, prompt-y a zdroje v jednom protokole
- 🔒 **Podniková pripravenosť**: Vstavaná bezpečnosť a spoľahlivosť

**🎯 Prečo je MCP dôležité:**
Rovnako ako USB-C odstránilo chaos so káblami, MCP eliminuje zložitosť AI integrácií. Jeden protokol, nekonečné možnosti.

### 🤖 Microsoft Foundry Toolkit Extension pre VS Code

Vlajková loď Microsoftu pre AI vývoj, ktorá premení VS Code na výkonný AI nástroj.

**🚀 Hlavné schopnosti:**

- 📦 **Katalóg modelov**: Prístup k modelom z Azure AI, GitHub, Hugging Face, Ollama
- ⚡ **Lokálne vyhodnocovanie**: ONNX optimalizovaný CPU/GPU/NPU beh
- 🏗️ **Agent Builder**: Vizualizovaný vývoj AI agentov s integráciou MCP
- 🎭 **Multi-modálne**: Podpora textu, obrazu a štruktúrovaného výstupu

**💡 Výhody vývoja:**

- Nasadenie modelov bez konfigurácie
- Vizualné tvorenie promptov
- Testovanie v reálnom čase
- Bezproblémová integrácia MCP servera

## 📚 Učiaci sa proces

### [🚀 Modul 1: Základy Microsoft Foundry Toolkit](./lab1/README.md)

**Trvanie**: 15 minút

- 🛠️ Inštalácia a konfigurácia Microsoft Foundry Toolkit pre VS Code
- 🗂️ Preskúmanie Katalógu modelov (100+ modelov z GitHub, ONNX, OpenAI, Anthropic, Google)
- 🎮 Ovládnite Interaktívne ihrisko pre testovanie modelov v reálnom čase
- 🤖 Vytvorte svoj prvý AI agent pomocou Agent Builderu
- 📊 Vyhodnoťte výkon modelu so zabudovanými metrikami (F1, relevancia, podobnosť, koherencia)
- ⚡ Naučte sa dávkové spracovanie a multi-modálnu podporu

**🎯 Výsledok učenia**: Vytvorte funkčného AI agenta s komplexným chápaním schopností Microsoft Foundry Toolkit

### [🌐 Modul 2: MCP so základmi Microsoft Foundry Toolkit](./lab2/README.md)

**Trvanie**: 20 minút

- 🧠 Osvojte si architektúru a koncepty Model Context Protocol (MCP)
- 🌐 Preskúmajte ekosystém MCP serverov od Microsoftu
- 🤖 Vytvorte agenta na automatizáciu prehliadača pomocou Playwright MCP servera
- 🔧 Integrujte MCP servery s Agent Builderom Microsoft Foundry Toolkit
- 📊 Konfigurujte a testujte MCP nástroje vo svojich agentoch
- 🚀 Exportujte a nasadzujte agentov poháňaných MCP pre produkčné použitie

**🎯 Výsledok učenia**: Nasadiť AI agenta posilneného externými nástrojmi prostredníctvom MCP

### [🔧 Modul 3: Pokročilý vývoj MCP s Microsoft Foundry Toolkit](./lab3/README.md)

**Trvanie**: 20 minút

- 💻 Vytvárajte vlastné MCP servery pomocou Microsoft Foundry Toolkit
- 🐍 Konfigurujte a používajte najnovšie MCP Python SDK (v1.9.3)
- 🔍 Nastavte a používajte MCP Inspector pre ladenie
- 🛠️ Vybudujte Weather MCP Server s profesionálnymi pracovnými postupmi ladenia
- 🧪 Ladte MCP servery v prostrediach Agent Builder a Inspector

**🎯 Výsledok učenia**: Vyvíjajte a ladiť vlastné MCP servery s modernými nástrojmi

### [🐙 Modul 4: Praktický vývoj MCP - Vlastný GitHub Clone Server](./lab4/README.md)

**Trvanie**: 30 minút

- 🏗️ Vytvorte reálny GitHub Clone MCP Server pre vývojové pracovné toky
- 🔄 Implementujte inteligentné klonovanie repozitára s validáciou a spracovaním chýb
- 📁 Vytvorte inteligentné spravovanie adresárov a integráciu do VS Code
- 🤖 Používajte režim GitHub Copilot Agent s vlastnými MCP nástrojmi
- 🛡️ Aplikujte spoľahlivosť pripravenú na produkciu a multiplatformovú kompatibilitu

**🎯 Výsledok učenia**: Nasadiť produkčný MCP server, ktorý zefektívňuje skutočné vývojové pracovné toky

## 💡 Skutočné aplikácie a dopad

### 🏢 Príklady použitia v podnikoch

#### 🔄 Automatizácia DevOps

Transformujte svoje vývojové pracovné toky inteligentnou automatizáciou:

- **Inteligentná správa repozitárov**: AI riadené prezeranie kódu a rozhodovanie o zlúčení
- **Inteligentné CI/CD**: Automatická optimalizácia pipeline na základe zmien v kóde
- **Triedenie problémov**: Automatická klasifikácia a priradenie chýb

#### 🧪 Revolúcia v zabezpečovaní kvality

Zvýšte testovanie s AI podporovanou automatizáciou:

- **Inteligentná generácia testov**: Automatické vytváranie komplexných testovacích sád
- **Vizualizácia regresných testov**: AI detekcia zmien v UI
- **Monitorovanie výkonu**: Proaktívne zisťovanie a riešenie problémov

#### 📊 Inteligentné dátové toky

Budujte inteligentnejšie pracovné toky spracovania dát:

- **Adaptívne ETL procesy**: Samooptimalizujúce transformácie dát
- **Detekcia anomálií**: Monitoring kvality dát v reálnom čase
- **Inteligentné smerovanie**: Efektívna správa toku dát

#### 🎧 Zlepšenie zákazníckej skúsenosti

Vytvorte výnimočné interakcie so zákazníkmi:

- **Podpora so zohľadnením kontextu**: AI agenti s prístupom k histórii zákazníka
- **Proaktívne riešenie problémov**: Prediktívna zákaznícka podpora
- **Integrácia viacerých kanálov**: Zjednotený AI zážitok naprieč platformami

## 🛠️ Požiadavky & nastavenie

### 💻 Požiadavky na systém

| Komponent | Požiadavka | Poznámky |
|-----------|------------|----------|
| **Operačný systém** | Windows 10+, macOS 10.15+, Linux | Akýkoľvek moderný OS |
| **Visual Studio Code** | Najnovšia stabilná verzia | Povinné pre Microsoft Foundry Toolkit |
| **Node.js** | v18.0+ a npm | Pre vývoj MCP servera |
| **Python** | 3.10+ | Voliteľné pre Python MCP servery |
| **Pamäť** | Min. 8GB RAM | Odporúčané 16GB pre lokálne modely |

### 🔧 Vývojové prostredie

#### Odporúčané VS Code rozšírenia

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - Voliteľné, ale užitočné

#### Voliteľné nástroje

- **uv**: Moderný Python správca balíčkov
- **MCP Inspector**: Vizualizačný nástroj na ladenie MCP serverov
- **Playwright**: Pre príklady webovej automatizácie

## 🎖️ Výsledky učenia a certifikačná cesta

### 🏆 Kontrolný zoznam zručností

Dokončením tohto workshopu dosiahnete majstrovstvo v:

#### 🎯 Kľúčové kompetencie

- [ ] **Majstrovstvo MCP protokolu**: Hlboké pochopenie architektúry a implementačných vzorov
- [ ] **Ovládanie Microsoft Foundry Toolkit**: Expert na rýchly vývoj s Microsoft Foundry Toolkit
- [ ] **Vývoj vlastných serverov**: Vytvárajte, nasadzujte a spravujte production MCP servery
- [ ] **Excelentná integrácia nástrojov**: Bezproblémové prepojenie AI s existujúcimi vývojovými tokmi
- [ ] **Aplikácia riešení problémov**: Používanie získaných zručností na riešenie reálnych obchodných výziev

#### 🔧 Technické zručnosti

- [ ] Nastavenie a konfigurácia Microsoft Foundry Toolkit vo VS Code
- [ ] Návrh a implementácia vlastných MCP serverov
- [ ] Integrácia GitHub modelov s MCP architektúrou
- [ ] Vytváranie automatizovaných testovacích tokov s Playwright
- [ ] Nasadenie AI agentov pre produkčné použitie
- [ ] Ladenie a optimalizácia výkonu MCP servera

#### 🚀 Pokročilé schopnosti

- [ ] Architektúra podnikových AI integrácií
- [ ] Implementácia najlepších bezpečnostných praktík pre AI aplikácie
- [ ] Návrh škálovateľných MCP serverových architektúr
- [ ] Vytváranie vlastných nástrojových reťazcov pre špecifické domény
- [ ] Mentoring v oblasti natívneho AI vývoja

## 📖 Dodatočné zdroje

- [MCP špecifikácia (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHub repozitár](https://github.com/microsoft/vscode-ai-toolkit)
- [Kolekcia vzorových MCP serverov](https://github.com/modelcontextprotocol/servers)
- [Sprievodca najlepšími praktikami](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Najlepšie bezpečnostné praktiky

---

**🚀 Ste pripravení zrevolucionizovať svoj vývoj AI pracovných tokov?**

Postavme spolu budúcnosť inteligentných aplikácií s MCP a Microsoft Foundry Toolkit!

## Čo ďalej

Pokračujte do: [Modul 11: MCP Server praktické laboratóriá](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->