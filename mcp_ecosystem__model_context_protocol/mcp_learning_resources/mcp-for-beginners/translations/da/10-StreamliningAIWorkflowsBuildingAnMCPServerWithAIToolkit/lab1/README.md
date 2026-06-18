# 🚀 Modul 1: Microsoft Foundry Toolkit Grundlæggende

[![Varighed](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Vanskelighed](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Forudsætninger](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Læringsmål

Ved afslutningen af dette modul vil du kunne:
- ✅ Installere og konfigurere Microsoft Foundry Toolkit Extension til VS Code
- ✅ Navigere i Modelkataloget og forstå forskellige modelkilder
- ✅ Bruge Playground til modeltest og eksperimenter
- ✅ Oprette brugerdefinerede AI-agenter ved hjælp af Agent Builder
- ✅ Sammenligne modelpræstationer på tværs af forskellige leverandører
- ✅ Anvende bedste praksis for prompt-engineering

## 🧠 Introduktion til Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit Extension til VS Code** er Microsofts flagskibsudvidelse, der forvandler VS Code til et omfattende AI-udviklingsmiljø. Det bygger bro mellem AI-forskning og praktisk applikationsudvikling, hvilket gør generativ AI tilgængelig for udviklere på alle færdighedsniveauer.

### 🌟 Centrale Funktioner

| Funktion | Beskrivelse | Anvendelsestilfælde |
|---------|-------------|---------------------|
| **🗂️ Modelkatalog** | Adgang til 100+ modeller fra GitHub, ONNX, OpenAI, Anthropic, Google | Modelopdagelse og -valg |
| **🔌 BYOM Support** | Integrer dine egne modeller (lokale/fjern) | Brugerdefineret modeludrulning |
| **🎮 Interaktiv Playground** | Realtid modeltest med chat-interface | Hurtig prototyping og test |
| **📎 Multimodal Support** | Håndter tekst, billeder og vedhæftninger | Komplekse AI-applikationer |
| **⚡ Batchbehandling** | Kør flere prompts samtidigt | Effektive testarbejdsgange |
| **📊 Model Evaluering** | Indbyggede metrikker (F1, relevans, lighed, kohærens) | Præstationsvurdering |

### 🎯 Hvorfor Microsoft Foundry Toolkit er vigtigt

- **🚀 Accelereret udvikling**: Fra idé til prototype på minutter
- **🔄 Fælles arbejdsgang**: Én grænseflade til flere AI-leverandører
- **🧪 Nem eksperimentering**: Sammenlign modeller uden kompleks opsætning
- **📈 Klar til produktion**: Problemløs overgang fra prototype til implementering

## 🛠️ Forudsætninger & Opsætning

### 📦 Installer Microsoft Foundry Toolkit Extension

**Trin 1: Åbn Extensions Markedspladsen**
1. Åbn Visual Studio Code
2. Gå til Extensions-visningen (`Ctrl+Shift+X` eller `Cmd+Shift+X`)
3. Søg efter "Microsoft Foundry Toolkit"

**Trin 2: Vælg din version**
- **🟢 Release**: Anbefales til produktion
- **🔶 Pre-release**: Tidlig adgang til banebrydende funktioner

**Trin 3: Installer og aktiver**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/da/aitkext.d28945a03eed003c.webp)

### ✅ Verifikationscheckliste
- [ ] Microsoft Foundry Toolkit-ikon vises i VS Code sidebjælken
- [ ] Udvidelsen er aktiveret og i brug
- [ ] Ingen installationsfejl i output-panelet

## 🧪 Praktisk Øvelse 1: Udforsk GitHub-modeller

**🎯 Mål**: Mestre Modelkataloget og test din første AI-model

### 📊 Trin 1: Naviger i Modelkataloget

Modelkataloget er din gateway til AI-økosystemet. Det samler modeller fra flere leverandører, der gør det nemt at opdage og sammenligne muligheder.

**🔍 Navigationsvejledning:**

Klik på **MODELS - Catalog** i Microsoft Foundry Toolkit sidebjælken

![Modelkatalog](../../../../translated_images/da/aimodel.263ed2be013d8fb0.webp)

**💡 Pro tip**: Kig efter modeller med specifikke egenskaber, der matcher dit anvendelsestilfælde (fx kodegenerering, kreativ skrivning, analyse).

**⚠️ Bemærk**: GitHub-hostede modeller (dvs. GitHub-modeller) er gratis at bruge, men er underlagt ratebegrænsninger på forespørgsler og tokens. Hvis du vil tilgå ikke-GitHub-modeller (eksterne modeller hostet via Azure AI eller andre endpoints), skal du angive den korrekte API-nøgle eller godkendelse.

### 🚀 Trin 2: Tilføj og Konfigurer Din Første Model

**Modelvalgstrategi:**
- **GPT-4.1**: Bedst til kompleks ræsonnering og analyse
- **Phi-4-mini**: Letvægtsmodel, hurtige svar til simple opgaver

**🔧 Konfigurationsproces:**
1. Vælg **OpenAI GPT-4.1** fra kataloget
2. Klik **Add to My Models** - dette registrerer modellen til brug
3. Vælg **Try in Playground** for at åbne testmiljøet
4. Vent på modelinitialisering (opsætning første gang kan tage et øjeblik)

![Playground opsætning](../../../../translated_images/da/playground.dd6f5141344878ca.webp)

**⚙️ Forståelse af modelparametre:**
- **Temperature**: Kontrollerer kreativitet (0 = deterministisk, 1 = kreativt)
- **Max Tokens**: Maksimal svarlængde
- **Top-p**: Nucleus sampling for responsdiversitet

### 🎯 Trin 3: Mestre Playground-grænsefladen

Playground er dit AI-eksperimentlaboratorium. Sådan maksimerer du dets potentiale:

**🎨 Best Practices for Prompt Engineering:**
1. **Vær specifik**: Klar, detaljeret instruktion giver bedre resultater
2. **Giv kontekst**: Medtag relevant baggrundsinformation
3. **Brug eksempler**: Vis modellen, hvad du ønsker med eksempler
4. **Iterér**: Forfin prompts baseret på første resultater

**🧪 Testscenarier:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testresultater](../../../../translated_images/da/result.1dfcf211fb359cf6.webp)

### 🏆 Udfordringsøvelse: Sammenligning af modelpræstationer

**🎯 Målsætning**: Sammenlign forskellige modeller med identiske prompts for at forstå deres styrker

**📋 Instruktioner:**
1. Tilføj **Phi-4-mini** til dit workspace
2. Brug den samme prompt for både GPT-4.1 og Phi-4-mini

![set](../../../../translated_images/da/set.88132df189ecde2c.webp)

3. Sammenlign svarenes kvalitet, hastighed og nøjagtighed
4. Dokumentér dine fund i resultatafsnittet

![Model Sammenligning](../../../../translated_images/da/compare.97746cd0f9074955.webp)

**💡 Vigtige indsigter at opdage:**
- Hvornår man bruger LLM vs. SLM
- Omkostninger vs. præstationsafvejninger
- Specialiserede kapaciteter i forskellige modeller

## 🤖 Praktisk Øvelse 2: Byg Brugerdefinerede Agenter med Agent Builder

**🎯 Mål**: Opret specialiserede AI-agenter tilpasset specifikke opgaver og arbejdsgange

### 🏗️ Trin 1: Forstå Agent Builder

Agent Builder er, hvor Microsoft Foundry Toolkit virkelig briljerer. Det giver dig mulighed for at skabe formålsbyggede AI-assistenter, som kombinerer kraften i store sprogmodeller med brugerdefinerede instruktioner, specifikke parametre og specialiseret viden.

**🧠 Agentarkitektur-komponenter:**
- **Kernemodel**: Grundlæggende LLM (GPT-4, Groks, Phi, osv.)
- **Systemprompt**: Definerer agentens personlighed og adfærd
- **Parametre**: Finjusterede indstillinger for optimal præstation
- **Værktøjsintegration**: Forbind til eksterne API'er og MCP-tjenester
- **Hukommelse**: Samtale-kontekst og sessionsvedvarende data

![Agent Builder Interface](../../../../translated_images/da/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Trin 2: Dybdegående Agentkonfiguration

**🎨 Skab Effektive Systemprompts:**
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

*Du kan selvfølgelig også bruge Generate System Prompt til at lade AI hjælpe dig med at generere og optimere prompts*

**🔧 Parameteroptimering:**
| Parameter | Anbefalet Interval | Anvendelsestilfælde |
|-----------|--------------------|---------------------|
| **Temperature** | 0,1-0,3 | Tekniske/faktuelle svar |
| **Temperature** | 0,7-0,9 | Kreative/brainstorming-opgaver |
| **Max Tokens** | 500-1000 | Kortfattede svar |
| **Max Tokens** | 2000-4000 | Detaljerede forklaringer |

### 🐍 Trin 3: Praktisk Øvelse - Python Programmeringsagent

**🎯 Mission**: Opret en specialiseret Python-kodeassistent

**📋 Konfigurationsskridt:**

1. **Modelvalg**: Vælg **Claude 3.5 Sonnet** (fremragende til kode)

2. **Systemprompt Design**:
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
   - Temperature: 0,2 (til konsistent, pålidelig kode)
   - Max Tokens: 2000 (detaljerede forklaringer)
   - Top-p: 0,9 (balanceret kreativitet)

![Python Agent Konfiguration](../../../../translated_images/da/pythonagent.5e51b406401c165f.webp)

### 🧪 Trin 4: Test Din Python Agent

**Testscenarier:**
1. **Grundlæggende funktion**: "Opret en funktion til at finde primtal"
2. **Kompleks algoritme**: "Implementer et binært søgetræ med indsæt, slet og søge-metoder"
3. **Virkelighedsproblem**: "Byg en web scraper, der håndterer rate limiting og genforsøg"
4. **Fejlfinding**: "Ret denne kode [indsæt buggy kode]"

**🏆 Succes kriterier:**
- ✅ Koden kører uden fejl
- ✅ Indeholder korrekt dokumentation
- ✅ Følger Python bedste praksis
- ✅ Giver klare forklaringer
- ✅ Foreslår forbedringer

## 🎓 Modul 1 Opsummering & Næste Skridt

### 📊 Videnscheck

Test din forståelse:
- [ ] Kan du forklare forskellen mellem modellerne i kataloget?
- [ ] Har du succesfuldt oprettet og testet en brugerdefineret agent?
- [ ] Forstår du, hvordan man optimerer parametre til forskellige anvendelsestilfælde?
- [ ] Kan du designe effektive systemprompts?

### 📚 Yderligere Ressourcer

- **Microsoft Foundry Toolkit Dokumentation**: [Official Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Prompt Engineering Guide**: [Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modeller i Microsoft Foundry Toolkit**: [Models in Development](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Tillykke!** Du har mestret grundlæggende færdigheder med Microsoft Foundry Toolkit og er klar til at bygge mere avancerede AI-applikationer!

### 🔜 Fortsæt til Næste Modul

Klar til mere avancerede funktioner? Fortsæt til **[Modul 2: MCP med Microsoft Foundry Toolkit Grundlæggende](../lab2/README.md)** hvor du vil lære hvordan du:
- Forbinder dine agenter til eksterne værktøjer ved hjælp af Model Context Protocol (MCP)
- Bygger browser-automatiseringsagenter med Playwright
- Integrerer MCP-servere med dine Microsoft Foundry Toolkit-agenter
- Superlader dine agenter med ekstern data og muligheder

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->