# 🚀 Modul 1: Základy Microsoft Foundry Toolkit

[![Délka](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Obtížnost](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Požadavky](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Výukové cíle

Na konci tohoto modulu budete schopni:
- ✅ Nainstalovat a nakonfigurovat Microsoft Foundry Toolkit Extension pro VS Code
- ✅ Pohybovat se v Model Catalog a rozumět různým zdrojům modelů
- ✅ Používat Playground pro testování a experimentování s modely
- ✅ Vytvářet vlastní AI agenty pomocí Agent Builder
- ✅ Porovnávat výkon modelů napříč různými poskytovateli
- ✅ Aplikovat nejlepší postupy pro návrh promptů

## 🧠 Úvod do Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit Extension pro VS Code** je hlavní rozšíření Microsoftu, které přeměňuje VS Code na komplexní vývojové prostředí pro AI. Spojuje výzkum AI s praktickým vývojem aplikací, díky čemuž je generativní AI přístupná vývojářům všech úrovní.

### 🌟 Klíčové funkce

| Funkce | Popis | Případ použití |
|---------|-------------|----------|
| **🗂️ Model Catalog** | Přístup k více než 100 modelům z GitHub, ONNX, OpenAI, Anthropic, Google | Objevování a výběr modelů |
| **🔌 Podpora BYOM** | Integrace vlastních modelů (lokálních/vzdálených) | Nasazení vlastních modelů |
| **🎮 Interaktivní Playground** | Testování modelů v reálném čase s chatovým rozhraním | Rychlé prototypování a testování |
| **📎 Podpora multimodálních dat** | Zpracování textu, obrázků a příloh | Komplexní AI aplikace |
| **⚡ Hromadné zpracování** | Spouštění více promptů současně | Efektivní testovací procesy |
| **📊 Hodnocení modelů** | Vstavané metriky (F1, relevance, podobnost, koherence) | Hodnocení výkonu |

### 🎯 Proč je Microsoft Foundry Toolkit důležitý

- **🚀 Zrychlený vývoj**: Od nápadu k prototypu během minut
- **🔄 Jednotný pracovní tok**: Jedno rozhraní pro více AI poskytovatelů
- **🧪 Snadné experimentování**: Porovnání modelů bez složitého nastavení
- **📈 Připravený na produkci**: Plynulý přechod z prototypu do nasazení

## 🛠️ Požadavky a nastavení

### 📦 Instalace Microsoft Foundry Toolkit Extension

**Krok 1: Přístup na tržiště rozšíření**
1. Otevřete Visual Studio Code
2. Přejděte do zobrazení Rozšíření (`Ctrl+Shift+X` nebo `Cmd+Shift+X`)
3. Vyhledejte "Microsoft Foundry Toolkit"

**Krok 2: Výběr verze**
- **🟢 Stabilní verze**: Doporučeno pro produkční použití
- **🔶 Předběžná verze**: Předčasný přístup k nejnovějším funkcím

**Krok 3: Instalace a aktivace**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/cs/aitkext.d28945a03eed003c.webp)

### ✅ Kontrolní seznam ověření
- [ ] Ikona Microsoft Foundry Toolkit se zobrazila v postranním panelu VS Code
- [ ] Rozšíření je povoleno a aktivováno
- [ ] V panelu výstupu nejsou chyby instalace

## 🧪 Praktický úkol 1: Prozkoumání GitHub modelů

**🎯 Cíl**: Ovládnout Model Catalog a otestovat svůj první AI model

### 📊 Krok 1: Pohyb v Model Catalog

Model Catalog je vaše brána do AI ekosystému. Agreguje modely od různých poskytovatelů, což usnadňuje objevování a porovnávání možností.

**🔍 Průvodce navigací:**

Klikněte na **MODELS – Catalog** v postranním panelu Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/cs/aimodel.263ed2be013d8fb0.webp)

**💡 Tip:** Hledejte modely s konkrétními schopnostmi, které odpovídají vašemu použití (např. generování kódu, kreativní psaní, analýza).

**⚠️ Poznámka**: Modely hostované na GitHubu (tj. GitHub Models) jsou zdarma, ale podléhají limitům počtu požadavků a tokenů. Pokud chcete přistupovat k modelům mimo GitHub (např. externí modely hostované přes Azure AI nebo jiné endpointy), budete muset zadat příslušný API klíč nebo autentifikaci.

### 🚀 Krok 2: Přidání a konfigurace prvního modelu

**Strategie výběru modelu:**
- **GPT-4.1**: Nejlepší pro složité uvažování a analýzu
- **Phi-4-mini**: Lehčí, rychlé odpovědi pro jednoduché úlohy

**🔧 Proces konfigurace:**
1. Vyberte **OpenAI GPT-4.1** z katalogu
2. Klikněte na **Add to My Models** – tím se model zaregistruje pro použití
3. Zvolte **Try in Playground** pro spuštění testovacího prostředí
4. Počkejte na inicializaci modelu (nastavení při prvním použití může chvíli trvat)

![Playground Setup](../../../../translated_images/cs/playground.dd6f5141344878ca.webp)

**⚙️ Pochopení parametrů modelu:**
- **Temperature**: Ovládá kreativitu (0 = deterministický, 1 = kreativní)
- **Max Tokens**: Maximální délka odpovědi
- **Top-p**: Nucleus sampling pro rozmanitost odpovědí

### 🎯 Krok 3: Ovládněte rozhraní Playground

Playground je vaše laboratoř pro experimentování s AI. Zde je, jak maximálně využít jeho potenciál:

**🎨 Nejlepší postupy pro návrh promptů:**
1. **Buďte konkrétní**: Jasné, detailní instrukce přinášejí lepší výsledky
2. **Poskytněte kontext**: Zahrňte relevantní doplňující informace
3. **Používejte příklady**: Ukažte modelu, co chcete, na příkladech
4. **Iterujte**: Vylepšujte prompt podle prvních výsledků

**🧪 Testovací scénáře:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/cs/result.1dfcf211fb359cf6.webp)

### 🏆 Výzva: Porovnání výkonu modelů

**🎯 Cíl**: Porovnat různé modely se stejnými prompty, pochopit jejich přednosti

**📋 Instrukce:**
1. Přidejte **Phi-4-mini** do svého workspace
2. Použijte stejný prompt pro GPT-4.1 i Phi-4-mini

![set](../../../../translated_images/cs/set.88132df189ecde2c.webp)

3. Porovnejte kvalitu odpovědí, rychlost a přesnost
4. Zdokumentujte své poznatky v sekci výsledků

![Model Comparison](../../../../translated_images/cs/compare.97746cd0f9074955.webp)

**💡 Klíčová zjištění:**
- Kdy použít LLM vs SLM
- Kompromisy mezi náklady a výkonem
- Specializované schopnosti jednotlivých modelů

## 🤖 Praktický úkol 2: Vytváření vlastních agentů pomocí Agent Builder

**🎯 Cíl**: Vytvořit specializované AI agenty přizpůsobené konkrétním úlohám a workflow

### 🏗️ Krok 1: Pochopení Agent Builder

Agent Builder je místo, kde Microsoft Foundry Toolkit opravdu zazáří. Umožňuje vám vytvářet účelově navržené AI asistenty, kteří kombinují sílu velkých jazykových modelů s vlastními instrukcemi, konkrétními parametry a specializovanými znalostmi.

**🧠 Složky architektury agenta:**
- **Jádrový model**: Základní LLM (GPT-4, Groks, Phi atd.)
- **Systémový prompt**: Definuje osobnost a chování agenta
- **Parametry**: Detailní nastavení pro optimální výkon
- **Integrace nástrojů**: Připojení k externím API a MCP službám
- **Paměť**: Kontext konverzace a přetrvávání sezení

![Agent Builder Interface](../../../../translated_images/cs/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Krok 2: Hloubková konfigurace agenta

**🎨 Vytváření efektivních systémových promptů:**
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

*Samozřejmě můžete také použít Generate System Prompt, aby vám AI pomohla generovat a optimalizovat prompty*

**🔧 Optimalizace parametrů:**
| Parametr | Doporučený rozsah | Případ použití |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Technické/faktické odpovědi |
| **Temperature** | 0.7-0.9 | Kreativní/brainstormingové úlohy |
| **Max Tokens** | 500-1000 | Stručné odpovědi |
| **Max Tokens** | 2000-4000 | Detailní vysvětlení |

### 🐍 Krok 3: Praktický úkol – Python programovací agent

**🎯 Mise**: Vytvořit specializovaného asistenta pro Python programování

**📋 Konfigurační kroky:**

1. **Výběr modelu**: Zvolte **Claude 3.5 Sonnet** (vynikající pro kód)

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

3. **Konfigurace parametrů**:
   - Temperature: 0.2 (pro konzistentní, spolehlivý kód)
   - Max Tokens: 2000 (detailní vysvětlení)
   - Top-p: 0.9 (vyvážená kreativita)

![Python Agent Configuration](../../../../translated_images/cs/pythonagent.5e51b406401c165f.webp)

### 🧪 Krok 4: Testování vašeho Python agenta

**Testovací scénáře:**
1. **Základní funkce**: "Vytvoř funkci na hledání prvočísel"
2. **Složitý algoritmus**: "Implementuj binární vyhledávací strom s metodami insert, delete a search"
3. **Reálný problém**: "Postav web scraper, který řeší omezení počtu požadavků a opakování"
4. **Ladění**: "Oprav tento kód [vložit chybný kód]"

**🏆 Kritéria úspěchu:**
- ✅ Kód běží bez chyb
- ✅ Obsahuje odpovídající dokumentaci
- ✅ Dodržuje nejlepší postupy v Pythonu
- ✅ Poskytuje jasná vysvětlení
- ✅ Navrhuje vylepšení

## 🎓 Shrnutí modulu 1 a další kroky

### 📊 Kontrola znalostí

Otestujte své porozumění:
- [ ] Dokážete vysvětlit rozdíl mezi modely v katalogu?
- [ ] Úspěšně jste vytvořili a otestovali vlastního agenta?
- [ ] Rozumíte optimalizaci parametrů pro různé případy použití?
- [ ] Umíte navrhovat efektivní systémové prompty?

### 📚 Další zdroje

- **Dokumentace Microsoft Foundry Toolkit**: [Oficiální dokumentace Microsoft](https://github.com/microsoft/vscode-ai-toolkit)
- **Průvodce návrhem promptů**: [Nejlepší postupy](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modely v Microsoft Foundry Toolkit**: [Modely ve vývoji](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Gratulujeme!** Ovládli jste základy Microsoft Foundry Toolkit a jste připraveni vytvářet pokročilejší AI aplikace!

### 🔜 Pokračujte do dalšího modulu

Chcete-li pokročilé funkce, pokračujte do **[Modul 2: MCP s Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)**, kde se naučíte:
- Připojovat své agenty k externím nástrojům pomocí Model Context Protocol (MCP)
- Vytvářet agenty pro automatizaci prohlížeče s Playwright
- Integrovat MCP servery s vašimi Microsoft Foundry Toolkit agenty
- Posílit své agenty o externí data a schopnosti

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->