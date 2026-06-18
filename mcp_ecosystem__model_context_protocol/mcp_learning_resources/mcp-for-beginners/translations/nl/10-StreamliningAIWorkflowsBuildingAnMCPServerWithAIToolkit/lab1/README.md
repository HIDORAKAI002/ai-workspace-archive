# 🚀 Module 1: Microsoft Foundry Toolkit Basisprincipes

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Leerdoelen

Aan het einde van deze module kun je:
- ✅ De Microsoft Foundry Toolkit-extensie voor VS Code installeren en configureren
- ✅ Navigeren door de Modelcatalogus en verschillende modelbronnen begrijpen
- ✅ De Playground gebruiken voor modeltesten en experimenteren
- ✅ Aangepaste AI-agenten maken met Agent Builder
- ✅ Modelprestaties vergelijken tussen verschillende aanbieders
- ✅ Best practices toepassen voor prompt engineering

## 🧠 Introductie tot Microsoft Foundry Toolkit

De **Microsoft Foundry Toolkit-extensie voor VS Code** is Microsofts toonaangevende extensie die VS Code transformeert tot een uitgebreide AI-ontwikkelomgeving. Het overbrugt de kloof tussen AI-onderzoek en praktische applicatieontwikkeling, waardoor generatieve AI toegankelijk wordt voor ontwikkelaars van alle niveaus.

### 🌟 Belangrijke Mogelijkheden

| Kenmerk | Beschrijving | Gebruiksscenario |
|---------|--------------|------------------|
| **🗂️ Modelcatalogus** | Toegang tot 100+ modellen van GitHub, ONNX, OpenAI, Anthropic, Google | Modelontdekking en -selectie |
| **🔌 BYOM-ondersteuning** | Integreer je eigen modellen (lokaal/remote) | Aangepaste modelimplementatie |
| **🎮 Interactieve Playground** | Real-time modeltesten met chatinterface | Snel prototypen en testen |
| **📎 Multi-modale ondersteuning** | Verwerken van tekst, afbeeldingen en bijlagen | Geavanceerde AI-toepassingen |
| **⚡ Batchverwerking** | Voer meerdere prompts gelijktijdig uit | Efficiënte testworkflows |
| **📊 Modelevaluatie** | Ingebouwde metrics (F1, relevantie, gelijkenis, samenhang) | Prestatiebeoordeling |

### 🎯 Waarom Microsoft Foundry Toolkit Belangrijk Is

- **🚀 Versnelde ontwikkeling**: Van idee tot prototype in minuten
- **🔄 Geünificeerde workflow**: Eén interface voor meerdere AI-aanbieders
- **🧪 Makkelijk experimenteren**: Modellen vergelijken zonder complexe setup
- **📈 Klaar voor productie**: Naadloze overgang van prototype naar implementatie

## 🛠️ Vereisten & Installatie

### 📦 Installeren van Microsoft Foundry Toolkit Extensie

**Stap 1: Toegang tot Extensions Marketplace**
1. Open Visual Studio Code
2. Ga naar het Extensions-venster (`Ctrl+Shift+X` of `Cmd+Shift+X`)
3. Zoek naar "Microsoft Foundry Toolkit"

**Stap 2: Kies je Versie**
- **🟢 Release**: Aanbevolen voor productiegebruik
- **🔶 Pre-release**: Vroege toegang tot geavanceerde functies

**Stap 3: Installeren en Activeren**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/nl/aitkext.d28945a03eed003c.webp)

### ✅ Verificatiechecklist
- [ ] Microsoft Foundry Toolkit-pictogram verschijnt in de VS Code zijbalk
- [ ] Extensie is ingeschakeld en geactiveerd
- [ ] Geen installatieproblemen in het outputpaneel

## 🧪 Praktijkoefening 1: GitHub Modellen Verkennen

**🎯 Doel**: Beheers de Modelcatalogus en test je eerste AI-model

### 📊 Stap 1: Navigeer door de Modelcatalogus

De Modelcatalogus is je toegangspoort tot het AI-ecosysteem. Het verzamelt modellen van meerdere aanbieders, zodat je eenvoudig opties kunt ontdekken en vergelijken.

**🔍 Navigatiegids:**

Klik op **MODELS - Catalog** in de Microsoft Foundry Toolkit zijbalk

![Model Catalog](../../../../translated_images/nl/aimodel.263ed2be013d8fb0.webp)

**💡 Pro Tip**: Zoek modellen met specifieke mogelijkheden die passen bij je gebruiksscenario (bijv. codegeneratie, creatief schrijven, analyse).

**⚠️ Nota**: Modellen gehost op GitHub (d.w.z. GitHub-modellen) zijn gratis te gebruiken, maar zijn onderhevig aan limieten op verzoeken en tokens. Als je toegang wilt tot niet-GitHub-modellen (dat wil zeggen externe modellen gehost via Azure AI of andere endpoints), moet je de juiste API-sleutel of authenticatie leveren.

### 🚀 Stap 2: Voeg je Eerste Model toe en Configureer Het

**Modelselectiestrategie:**
- **GPT-4.1**: Het beste voor complexe redenering en analyse
- **Phi-4-mini**: Lichtgewicht, snelle antwoorden voor eenvoudige taken

**🔧 Configuratieproces:**
1. Selecteer **OpenAI GPT-4.1** uit de catalogus
2. Klik op **Add to My Models** - dit registreert het model voor gebruik
3. Kies **Try in Playground** om de testomgeving te starten
4. Wacht op modelinitialisatie (eerste keer kan even duren)

![Playground Setup](../../../../translated_images/nl/playground.dd6f5141344878ca.webp)

**⚙️ Begrip van Modelparameters:**
- **Temperature**: Bepaalt creativiteit (0 = deterministisch, 1 = creatief)
- **Max Tokens**: Maximale responslengte
- **Top-p**: Nucleus sampling voor diversiteit in antwoorden

### 🎯 Stap 3: Beheers de Playground-interface

De Playground is je AI-experimentatielab. Zo haal je er het maximale uit:

**🎨 Best Practices voor Prompt Engineering:**
1. **Wees specifiek**: Duidelijke, gedetailleerde instructies leveren betere resultaten
2. **Geef context**: Voeg relevante achtergrondinformatie toe
3. **Gebruik voorbeelden**: Laat aan het model zien wat je wilt met voorbeelden
4. **Itereer**: Verbeter prompts op basis van eerste resultaten

**🧪 Testscenario's:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/nl/result.1dfcf211fb359cf6.webp)

### 🏆 Uitdagingsoefening: Modelprestaties Vergelijken

**🎯 Doel**: Vergelijk verschillende modellen met identieke prompts om hun kracht te begrijpen

**📋 Instructies:**
1. Voeg **Phi-4-mini** toe aan je werkruimte
2. Gebruik dezelfde prompt voor zowel GPT-4.1 als Phi-4-mini

![set](../../../../translated_images/nl/set.88132df189ecde2c.webp)

3. Vergelijk de responskwaliteit, snelheid en nauwkeurigheid
4. Documenteer je bevindingen in het resultatenblok

![Model Comparison](../../../../translated_images/nl/compare.97746cd0f9074955.webp)

**💡 Belangrijke inzichten om te ontdekken:**
- Wanneer gebruik je LLM vs SLM
- Kosten- en prestatieafwegingen
- Gespecialiseerde capaciteiten van verschillende modellen

## 🤖 Praktijkoefening 2: Aangepaste Agenten Bouwen met Agent Builder

**🎯 Doel**: Maak gespecialiseerde AI-agenten op maat voor specifieke taken en workflows

### 🏗️ Stap 1: Agent Builder Begrijpen

Agent Builder is waar Microsoft Foundry Toolkit echt uitblinkt. Het stelt je in staat doelgerichte AI-assistenten te maken die de kracht van grote taalmodellen combineren met aangepaste instructies, specifieke parameters en gespecialiseerde kennis.

**🧠 Architectuurcomponenten van Agent:**
- **Core Model**: Het fundamentele LLM (GPT-4, Groks, Phi, etc.)
- **System Prompt**: Definieert de persoonlijkheid en het gedrag van de agent
- **Parameters**: Fijn afgestelde instellingen voor optimale prestaties
- **Tools Integratie**: Verbind met externe API's en MCP-services
- **Geheugen**: Conversatiecontext en sessiepersistentie

![Agent Builder Interface](../../../../translated_images/nl/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Stap 2: Diepgaande Agentconfiguratie

**🎨 Effectieve System Prompts Maken:**
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

*Natuurlijk kun je ook Generate System Prompt gebruiken om AI te laten helpen bij het genereren en optimaliseren van prompts*

**🔧 Parameteroptimalisatie:**
| Parameter | Aanbevolen Bereik | Gebruiksscenario |
|-----------|-------------------|------------------|
| **Temperature** | 0.1-0.3 | Technische/factuele antwoorden |
| **Temperature** | 0.7-0.9 | Creatieve/brainstorming taken |
| **Max Tokens** | 500-1000 | Bondige antwoorden |
| **Max Tokens** | 2000-4000 | Gedetailleerde uitleg |

### 🐍 Stap 3: Praktijkoefening - Python Programmeeragent

**🎯 Opdracht**: Maak een gespecialiseerde Python-codeerassistent

**📋 Configuratiestappen:**

1. **Modelselectie**: Kies **Claude 3.5 Sonnet** (uitstekend voor code)

2. **System Prompt ontwerp**:
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

3. **Parameterconfiguratie**:
   - Temperature: 0.2 (voor consistente, betrouwbare code)
   - Max Tokens: 2000 (gedetailleerde uitleg)
   - Top-p: 0.9 (gebalanceerde creativiteit)

![Python Agent Configuration](../../../../translated_images/nl/pythonagent.5e51b406401c165f.webp)

### 🧪 Stap 4: Test je Python-agent

**Testscenario's:**
1. **Basale functie**: "Maak een functie om priemgetallen te vinden"
2. **Complex algoritme**: "Implementeer een binaire zoekboom met insert-, delete- en zoekmethoden"
3. **Praktisch probleem**: "Bouw een web scraper die rate limiting en retries afhandelt"
4. **Debugging**: "Los deze code op [plak buggy code]"

**🏆 Succescriteria:**
- ✅ Code draait zonder fouten
- ✅ Bevat goede documentatie
- ✅ Volgt Python best practices
- ✅ Biedt duidelijke uitleg
- ✅ Doet verbeteringsvoorstellen

## 🎓 Module 1 Afronding & Volgende Stappen

### 📊 Kennischeck

Test je begrip:
- [ ] Kun je het verschil tussen modellen in de catalogus uitleggen?
- [ ] Heb je succesvol een aangepaste agent gemaakt en getest?
- [ ] Begrijp je hoe je parameters optimaliseert voor verschillende gebruiksscenario's?
- [ ] Kun je effectieve system prompts ontwerpen?

### 📚 Aanvullende bronnen

- **Microsoft Foundry Toolkit Documentatie**: [Officiële Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Prompt Engineering Gids**: [Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modellen in Microsoft Foundry Toolkit**: [Models in Development](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Gefeliciteerd!** Je beheerst nu de basisprincipes van Microsoft Foundry Toolkit en bent klaar om geavanceerdere AI-applicaties te bouwen!

### 🔜 Ga door naar de Volgende Module

Klaar voor geavanceerdere mogelijkheden? Ga door naar **[Module 2: MCP met Microsoft Foundry Toolkit Basisprincipes](../lab2/README.md)** waar je leert hoe je:
- Je agenten koppelt aan externe tools met Model Context Protocol (MCP)
- Browserautomatiseringsagenten bouwt met Playwright
- MCP-servers integreert met je Microsoft Foundry Toolkit-agenten
- Je agenten versterkt met externe data en mogelijkheden

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->