# 🚀 Modul 1: Microsoft Foundry Toolkit Grunder

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Lärandemål

I slutet av denna modul kommer du att kunna:
- ✅ Installera och konfigurera Microsoft Foundry Toolkit Extension för VS Code
- ✅ Navigera i Modellkatalogen och förstå olika modellkällor
- ✅ Använda Playground för modelltestning och experiment
- ✅ Skapa anpassade AI-agenter med Agent Builder
- ✅ Jämföra modellprestanda mellan olika leverantörer
- ✅ Tillämpa bästa praxis för promptdesign

## 🧠 Introduktion till Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit Extension för VS Code** är Microsofts flaggskeppstillägg som förvandlar VS Code till en omfattande AI-utvecklingsmiljö. Den bygger en bro mellan AI-forskning och praktisk applikationsutveckling, vilket gör generativ AI tillgängligt för utvecklare på alla nivåer.

### 🌟 Viktiga Funktioner

| Funktion | Beskrivning | Användningsfall |
|---------|-------------|----------|
| **🗂️ Modellkatalog** | Tillgång till 100+ modeller från GitHub, ONNX, OpenAI, Anthropic, Google | Modellupptäckt och urval |
| **🔌 BYOM Support** | Integrera dina egna modeller (lokala/fjärr) | Anpassad modellimplementering |
| **🎮 Interaktiv Playground** | Realtidstestning av modeller med chattgränssnitt | Snabb prototypframtagning och testning |
| **📎 Multimodal Support** | Hantera text, bilder och bilagor | Komplexa AI-applikationer |
| **⚡ Batchbearbetning** | Kör flera prompts samtidigt | Effektiva testarbetsflöden |
| **📊 Modellevaluering** | Inbyggda mått (F1, relevans, likhet, koherens) | Prestandautvärdering |

### 🎯 Varför Microsoft Foundry Toolkit är Viktigt

- **🚀 Snabbare utveckling**: Från idé till prototyp på några minuter
- **🔄 Enhetligt arbetsflöde**: En gränssnitt för flera AI-leverantörer
- **🧪 Enkel experimentering**: Jämför modeller utan komplicerad setup
- **📈 Produktionsklar**: Sömlös övergång från prototyp till driftsättning

## 🛠️ Förutsättningar & Installation

### 📦 Installera Microsoft Foundry Toolkit Extension

**Steg 1: Öppna Extensions Marketplace**
1. Öppna Visual Studio Code
2. Navigera till Extensions-vyn (`Ctrl+Shift+X` eller `Cmd+Shift+X`)
3. Sök efter "Microsoft Foundry Toolkit"

**Steg 2: Välj Din Version**
- **🟢 Släppversion**: Rekommenderad för produktionsanvändning
- **🔶 Förhandsversion**: Tidig tillgång till nya funktioner

**Steg 3: Installera och Aktivera**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/sv/aitkext.d28945a03eed003c.webp)

### ✅ Verifieringslista
- [ ] Microsoft Foundry Toolkit-ikonen visas i VS Code sidofält
- [ ] Tillägget är aktiverat och igång
- [ ] Inga installationsfel i utmatningspanelen

## 🧪 Praktisk Övning 1: Utforska GitHub-modeller

**🎯 Mål**: Behärska Modellkatalogen och testa din första AI-modell

### 📊 Steg 1: Navigera Modellkatalogen

Modellkatalogen är din port till AI-ekosystemet. Den samlar modeller från flera leverantörer, vilket gör det enkelt att upptäcka och jämföra alternativ.

**🔍 Navigeringsguide:**

Klicka på **MODELS - Catalog** i Microsoft Foundry Toolkit sidofält

![Model Catalog](../../../../translated_images/sv/aimodel.263ed2be013d8fb0.webp)

**💡 Tips**: Leta efter modeller med specifika kapabiliteter som matchar ditt användningsfall (t.ex. kodgenerering, kreativt skrivande, analys).

**⚠️ Obs**: GitHub-hostade modeller (dvs GitHub Models) är gratis att använda men är föremål för begränsningar i förfrågningar och tokens. Om du vill komma åt modeller som inte finns på GitHub (dvs externa modeller hostade via Azure AI eller andra endpoints) behöver du tillhandahålla lämplig API-nyckel eller autentisering.

### 🚀 Steg 2: Lägg till och konfigurera din första modell

**Modellvalstrategi:**
- **GPT-4.1**: Bäst för komplexa resonemang och analyser
- **Phi-4-mini**: Lättviktig, snabba svar för enkla uppgifter

**🔧 Konfigurationsprocess:**
1. Välj **OpenAI GPT-4.1** från katalogen
2. Klicka **Add to My Models** - registrerar modellen för användning
3. Välj **Try in Playground** för att starta testmiljön
4. Vänta på initialisering av modellen (första uppstarten kan ta en stund)

![Playground Setup](../../../../translated_images/sv/playground.dd6f5141344878ca.webp)

**⚙️ Förståelse av modellparametrar:**
- **Temperature**: Styr kreativitet (0 = deterministisk, 1 = kreativ)
- **Max Tokens**: Maximal svarslängd
- **Top-p**: Nucleus-sampling för varierande svar

### 🎯 Steg 3: Bemästra Playground-gränssnittet

Playground är ditt AI-experimentlaboratorium. Så här maximerar du dess potential:

**🎨 Bästa praxis för promptdesign:**
1. **Var specifik**: Klara, detaljerade instruktioner ger bättre resultat
2. **Ge kontext**: Inkludera relevant bakgrundsinformation
3. **Använd exempel**: Visa modellen vad du vill med exempel
4. **Iterera**: Förfina prompts baserat på initiala resultat

**🧪 Testscenarier:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/sv/result.1dfcf211fb359cf6.webp)

### 🏆 Utmaningsövning: Jämförelse av modellprestanda

**🎯 Mål**: Jämför olika modeller med identiska prompts för att förstå deras styrkor

**📋 Instruktioner:**
1. Lägg till **Phi-4-mini** i din arbetsyta
2. Använd samma prompt för både GPT-4.1 och Phi-4-mini

![set](../../../../translated_images/sv/set.88132df189ecde2c.webp)

3. Jämför svarens kvalitet, hastighet och noggrannhet
4. Dokumentera dina fynd i resultatavsnittet

![Model Comparison](../../../../translated_images/sv/compare.97746cd0f9074955.webp)

**💡 Viktiga insikter att upptäcka:**
- När man ska använda LLM vs SLM
- Kostnad kontra prestanda- avvägningar
- Specialiserade kapabiliteter hos olika modeller

## 🤖 Praktisk Övning 2: Bygga Anpassade Agenter med Agent Builder

**🎯 Mål**: Skapa specialiserade AI-agenter anpassade för specifika uppgifter och arbetsflöden

### 🏗️ Steg 1: Förstå Agent Builder

Agent Builder är där Microsoft Foundry Toolkit verkligen utmärker sig. Det låter dig skapa ändamålsbyggda AI-assistenter som kombinerar kraften i stora språkmodeller med anpassade instruktioner, specifika parametrar och specialiserad kunskap.

**🧠 Agentarkitekturens komponenter:**
- **Core Model**: Grunden, LLM (GPT-4, Groks, Phi, etc.)
- **System Prompt**: Definierar agentens personlighet och beteende
- **Parametrar**: Finjusterade inställningar för optimal prestanda
- **Verktygsintegration**: Koppla till externa API:er och MCP-tjänster
- **Minne**: Konversationskontext och sessionspersistens

![Agent Builder Interface](../../../../translated_images/sv/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Steg 2: Djupdykning i agentkonfiguration

**🎨 Skapa effektiva systemprompter:**
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

*Självklart kan du också använda Generate System Prompt för att låta AI hjälpa dig generera och optimera prompter*

**🔧 Parameteroptimering:**
| Parameter | Rekommenderat intervall | Användningsfall |
|-----------|------------------------|----------------|
| **Temperature** | 0.1-0.3 | Tekniska/faktabaserade svar |
| **Temperature** | 0.7-0.9 | Kreativa/idégenererande uppgifter |
| **Max Tokens** | 500-1000 | Koncisa svar |
| **Max Tokens** | 2000-4000 | Utförliga förklaringar |

### 🐍 Steg 3: Praktisk övning - Python-programmeringsagent

**🎯 Uppdrag**: Skapa en specialiserad Python-kodningsassistent

**📋 Konfigurationssteg:**

1. **Modellval**: Välj **Claude 3.5 Sonnet** (utmärkt för kod)

2. **System Prompt-design**:
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

3. **Parameterkonfiguration**:
   - Temperature: 0.2 (för konsekvent, tillförlitlig kod)
   - Max Tokens: 2000 (utförliga förklaringar)
   - Top-p: 0.9 (balanserad kreativitet)

![Python Agent Configuration](../../../../translated_images/sv/pythonagent.5e51b406401c165f.webp)

### 🧪 Steg 4: Testa din Python-agent

**Testscenarier:**
1. **Grundläggande funktion**: "Skapa en funktion för att hitta primtal"
2. **Komplex algoritm**: "Implementera ett binärt sökträd med metoder för insättning, borttagning och sökning"
3. **Verklighetsproblem**: "Bygg en web scraper som hanterar rate limiting och retries"
4. **Felsökning**: "Åtgärda denna kod [klistra in buggy kod]"

**🏆 Framgångskriterier:**
- ✅ Koden körs utan fel
- ✅ Inkluderar korrekt dokumentation
- ✅ Följer Pythons bästa praxis
- ✅ Ger tydliga förklaringar
- ✅ Föreslår förbättringar

## 🎓 Modul 1 Sammanfattning & Nästa Steg

### 📊 Kunskapskontroll

Testa din förståelse:
- [ ] Kan du förklara skillnaden mellan modeller i katalogen?
- [ ] Har du framgångsrikt skapat och testat en anpassad agent?
- [ ] Förstår du hur du optimerar parametrar för olika användningsfall?
- [ ] Kan du designa effektiva systemprompter?

### 📚 Ytterligare resurser

- **Microsoft Foundry Toolkit Dokumentation**: [Officiell Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Guide till promptdesign**: [Bästa praxis](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modeller i Microsoft Foundry Toolkit**: [Modeller under utveckling](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Grattis!** Du har behärskat grunderna i Microsoft Foundry Toolkit och är redo att bygga mer avancerade AI-applikationer!

### 🔜 Fortsätt till nästa modul

Redo för mer avancerade funktioner? Gå vidare till **[Modul 2: MCP med Microsoft Foundry Toolkit Grunder](../lab2/README.md)** där du lär dig hur du:
- Kopplar dina agenter till externa verktyg med Model Context Protocol (MCP)
- Bygger webbläsarautomationsagenter med Playwright
- Integrerar MCP-servrar med dina Microsoft Foundry Toolkit-agenter
- Superladdar dina agenter med externa data och kapabiliteter

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->