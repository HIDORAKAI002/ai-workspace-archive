# 🚀 Modul 1: Základy Microsoft Foundry Toolkit

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Učebné ciele

Na konci tohto modulu budete vedieť:
- ✅ Inštalovať a konfigurovať rozšírenie Microsoft Foundry Toolkit pre VS Code
- ✅ Navigovať v Katalógu modelov a rozumieť rôznym zdrojom modelov
- ✅ Používať Playground na testovanie a experimentovanie s modelmi
- ✅ Vytvárať vlastných AI agentov pomocou Agent Buildera
- ✅ Porovnávať výkonnosť modelov rôznych poskytovateľov
- ✅ Aplikovať najlepšie postupy pri tvorbe promptov

## 🧠 Úvod do Microsoft Foundry Toolkit

**Rozšírenie Microsoft Foundry Toolkit pre VS Code** je popredné rozšírenie od Microsoftu, ktoré transformuje VS Code na komplexné vývojové prostredie pre AI. Prekladá priepasť medzi AI výskumom a praktickým vývojom aplikácií, čím sprístupňuje generatívnu AI vývojárom všetkých úrovní.

### 🌟 Kľúčové schopnosti

| Funkcia | Popis | Použitie |
|---------|-------------|----------|
| **🗂️ Katalóg modelov** | Prístup k viac ako 100 modelom z GitHub, ONNX, OpenAI, Anthropic, Google | Objavovanie a výber modelov |
| **🔌 Podpora BYOM** | Integrácia vlastných modelov (lokálnych/vzdialených) | Nasadenie vlastných modelov |
| **🎮 Interaktívny Playground** | Testovanie modelov v reálnom čase s chatovým rozhraním | Rýchle prototypovanie a testovanie |
| **📎 Podpora viacerých modalít** | Práca s textom, obrázkami a prílohami | Zložité AI aplikácie |
| **⚡ Hromadné spracovanie** | Spúšťanie viacerých promptov simultánne | Efektívne testovacie toky |
| **📊 Hodnotenie modelov** | Vstavané metriky (F1, relevancia, podobnosť, koherencia) | Posúdenie výkonu |

### 🎯 Prečo je Microsoft Foundry Toolkit dôležitý

- **🚀 Urýchlený vývoj**: Od nápadu k prototypu za pár minút
- **🔄 Jednotný pracovný tok**: Jedno rozhranie pre viacerých AI poskytovateľov
- **🧪 Jednoduché experimentovanie**: Porovnávajte modely bez komplikovanej prípravy
- **📈 Pripravené na produkciu**: Plynulý prechod z prototypu do nasadenia

## 🛠️ Predpoklady a nastavenie

### 📦 Inštalácia rozšírenia Microsoft Foundry Toolkit

**Krok 1: Prístup na trh rozšírení**
1. Otvorte Visual Studio Code
2. Prejdite na prehľad Rozšírení (`Ctrl+Shift+X` alebo `Cmd+Shift+X`)
3. Vyhľadajte "Microsoft Foundry Toolkit"

**Krok 2: Výber verzie**
- **🟢 Release**: Odporúčané pre produkčné použitie
- **🔶 Pre-release**: Skorý prístup k najnovším funkciám

**Krok 3: Inštalácia a aktivácia**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/sk/aitkext.d28945a03eed003c.webp)

### ✅ Overovací zoznam
- [ ] V ponuke VS Code sa zobrazuje ikona Microsoft Foundry Toolkit
- [ ] Rozšírenie je povolené a aktivované
- [ ] V paneli výstupu nie sú žiadne chyby inštalácie

## 🧪 Praktické cvičenie 1: Preskúmanie modelov z GitHubu

**🎯 Cieľ**: Osvojiť si prácu s Katalógom modelov a otestovať svoj prvý AI model

### 📊 Krok 1: Navigácia v Katalógu modelov

Katalóg modelov je vašou bránou do AI ekosystému. Zhromažďuje modely od rôznych poskytovateľov, aby ste mohli jednoducho objavovať a porovnávať možnosti.

**🔍 Navigačný návod:**

Kliknite na **MODELY - Katalóg** v bočnom paneli Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/sk/aimodel.263ed2be013d8fb0.webp)

**💡 Tip**: Vyhľadávajte modely so špecifickými schopnosťami, ktoré vyhovujú vášmu prípad použitia (napr. generovanie kódu, kreatívne písanie, analýza).

**⚠️ Poznámka**: Modely hostované na GitHube (GitHub Models) sú bezplatné na použitie, ale podliehajú obmedzeniam počtu požiadaviek a tokenov. Pre prístup k mimo-GitHub modelom (t.j. externé modely hostované cez Azure AI alebo iné koncové body) je potrebné poskytnúť príslušný API kľúč alebo autentifikáciu.

### 🚀 Krok 2: Pridanie a konfigurácia prvého modelu

**Stratégia výberu modelu:**
- **GPT-4.1**: Najlepší pre komplexné uvažovanie a analýzu
- **Phi-4-mini**: Ľahký, rýchle odpovede pre jednoduché úlohy

**🔧 Postup konfigurácie:**
1. Vyberte **OpenAI GPT-4.1** z katalógu
2. Kliknite na **Pridať do mojich modelov** – model sa zaregistruje na použitie
3. Vyberte **Vyskúšať v Playground** na spustenie testovacieho prostredia
4. Počkajte na inicializáciu modelu (nastavenie pri prvom spustení môže chvíľu trvať)

![Playground Setup](../../../../translated_images/sk/playground.dd6f5141344878ca.webp)

**⚙️ Pochopenie parametrov modelu:**
- **Temperature**: Ovláda kreativitu (0 = deterministický, 1 = kreatívny)
- **Max Tokens**: Maximálna dĺžka odpovede
- **Top-p**: Nucleus sampling pre rozmanitosť odpovedí

### 🎯 Krok 3: Osvojenie si rozhrania Playground

Playground je vaše laboratórium na experimentovanie s AI. Tu je, ako ho čo najlepšie využiť:

**🎨 Najlepšie postupy pri tvorbe promptov:**
1. **Buďte konkrétny**: Jasné a podrobné inštrukcie prinášajú lepšie výsledky
2. **Poskytnite kontext**: Pridajte relevantné podkladové informácie
3. **Používajte príklady**: Ukážte modelu, čo chcete, pomocou príkladov
4. **Iterujte**: Zdokonaľujte prompt na základe počiatočných výsledkov

**🧪 Testovacie scenáre:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/sk/result.1dfcf211fb359cf6.webp)

### 🏆 Výzva na cvičenie: Porovnanie výkonnosti modelov

**🎯 Cieľ**: Porovnajte rôzne modely pomocou identických promptov a pochopte ich silné stránky

**📋 Inštrukcie:**
1. Pridajte **Phi-4-mini** do vášho pracovného priestoru
2. Použite rovnaký prompt pre GPT-4.1 aj Phi-4-mini

![set](../../../../translated_images/sk/set.88132df189ecde2c.webp)

3. Porovnajte kvalitu, rýchlosť a presnosť odpovedí
4. Zdokumentujte svoje poznatky v sekcii výsledkov

![Model Comparison](../../../../translated_images/sk/compare.97746cd0f9074955.webp)

**💡 Kľúčové poznatky, ktoré môžete objaviť:**
- Kedy použiť LLM vs SLM
- Kompromisy medzi nákladmi a výkonnosťou
- Špecializované schopnosti rôznych modelov

## 🤖 Praktické cvičenie 2: Vytváranie vlastných agentov s Agent Builderom

**🎯 Cieľ**: Vytvoriť špecializovaných AI agentov prispôsobených pre konkrétne úlohy a pracovné toky

### 🏗️ Krok 1: Pochopenie Agent Buildera

Agent Builder je miesto, kde Microsoft Foundry Toolkit naozaj vyniká. Umožňuje vám vytvárať cielene vytvorené AI asistenty, ktoré kombinujú silu veľkých jazykových modelov s vlastnými inštrukciami, špecifickými parametrami a špecializovanými znalosťami.

**🧠 Architektúra agenta zahŕňa:**
- **Jadrový model**: Základný LLM (GPT-4, Groks, Phi, atď.)
- **Systémový prompt**: Definuje osobnosť a správanie agenta
- **Parametre**: Jemné doladenie pre optimálny výkon
- **Integrácia nástrojov**: Pripojenie k externým API a MCP službám
- **Pamäť**: Kontext konverzácie a perzistencia relácie

![Agent Builder Interface](../../../../translated_images/sk/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Krok 2: Hlbší pohľad na konfiguráciu agenta

**🎨 Vytváranie efektívnych systémových promptov:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Samozrejme, môžete tiež použiť Generate System Prompt, aby vám AI pomohla generovať a optimalizovať prompty.*

**🔧 Optimalizácia parametrov:**
| Parameter | Odporúčaný rozsah | Použitie |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Technické/faktické odpovede |
| **Temperature** | 0.7-0.9 | Kreatívne/brainstormingové úlohy |
| **Max Tokens** | 500-1000 | Stručné odpovede |
| **Max Tokens** | 2000-4000 | Podrobné vysvetlenia |

### 🐍 Krok 3: Praktické cvičenie – Python programovací agent

**🎯 Misia**: Vytvoriť špecializovaného asistenta pre programovanie v Pythone

**📋 Kroky konfigurácie:**

1. **Výber modelu**: Zvoľte **Claude 3.5 Sonnet** (vynikajúci na kódovanie)

2. **Návrh systémového promptu**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Konfigurácia parametrov**:
   - Temperature: 0.2 (pre konzistentný, spoľahlivý kód)
   - Max Tokens: 2000 (podrobné vysvetlenia)
   - Top-p: 0.9 (vyvážená kreativita)

![Python Agent Configuration](../../../../translated_images/sk/pythonagent.5e51b406401c165f.webp)

### 🧪 Krok 4: Testovanie vášho Python agenta

**Testovacie scenáre:**
1. **Základná funkcia**: „Vytvor funkciu na hľadanie prvočísel“
2. **Zložitý algoritmus**: „Implementuj binárny vyhľadávací strom s metódami na vloženie, vymazanie a vyhľadávanie“
3. **Reálny problém**: „Postav web scraper, ktorý zvláda obmedzovanie požiadaviek a opakovania“
4. **Ladenie**: „Oprav tento kód [vložiť chybný kód]“

**🏆 Kritériá úspechu:**
- ✅ Kód beží bez chýb
- ✅ Obsahuje vhodnú dokumentáciu
- ✅ Dodržiava najlepšie praktiky Pythona
- ✅ Poskytuje jasné vysvetlenia
- ✅ Navrhuje zlepšenia

## 🎓 Zhrnutie modulu 1 a ďalšie kroky

### 📊 Kontrola vedomostí

Otestujte svoje pochopenie:
- [ ] Viete vysvetliť rozdiely medzi modelmi v katalógu?
- [ ] Úspešne ste vytvorili a otestovali vlastného agenta?
- [ ] Rozumiete, ako optimalizovať parametre pre rôzne prípady použitia?
- [ ] Viete navrhnúť efektívne systémové prompty?

### 📚 Ďalšie zdroje

- **Microsoft Foundry Toolkit Dokumentácia**: [Oficiálne Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Príručka prompt engineeringu**: [Najlepšie postupy](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modely v Microsoft Foundry Toolkit**: [Modely v štádiu vývoja](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Gratulujeme!** Ovládli ste základy Microsoft Foundry Toolkit a ste pripravení vytvárať pokročilejšie AI aplikácie!

### 🔜 Pokračujte do ďalšieho modulu

Pripravení na pokročilejšie schopnosti? Pokračujte do **[Modul 2: MCP s Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)**, kde sa naučíte:
- Pripojiť agentov k externým nástrojom pomocou Model Context Protocol (MCP)
- Vytvárať agentov na automatizáciu prehliadača s Playwright
- Integrovať MCP servery s agentmi Microsoft Foundry Toolkit
- Zosilniť agentov externými dátami a schopnosťami

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->