# Het stroomlijnen van AI-workflows: het bouwen van een MCP-server met Microsoft Foundry Toolkit

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/nl/logo.ec93918ec338dadd.webp)

## 🎯 Overzicht

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/nl/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

Welkom bij de **Model Context Protocol (MCP) Workshop**! Deze uitgebreide hands-on workshop combineert twee geavanceerde technologieën om AI-toepassingen te revolutioneren:

- **🔗 Model Context Protocol (MCP)**: Een open standaard voor naadloze AI-toolintegratie
- **🛠️ Microsoft Foundry Toolkit-extensie voor VS Code**: Microsofts krachtige AI-ontwikkelextensie

### 🎓 Wat je zult leren

Aan het einde van deze workshop beheers je de kunst van het bouwen van intelligente applicaties die AI-modellen koppelen aan echte tools en diensten. Van geautomatiseerd testen tot aangepaste API-integraties, je krijgt praktische vaardigheden om complexe zakelijke uitdagingen op te lossen.

## 🏗️ Technologie-Stack

### 🔌 Model Context Protocol (MCP)

MCP is de **"USB-C voor AI"** - een universele standaard die AI-modellen verbindt met externe tools en datasources.

**✨ Belangrijkste kenmerken:**

- 🔄 **Gestandaardiseerde integratie**: Universele interface voor AI-toolverbindingen
- 🏛️ **Flexibele architectuur**: Lokale en externe servers via stdio/SSE transport
- 🧰 **Rijk ecosysteem**: Tools, prompts en bronnen binnen één protocol
- 🔒 **Enterprise-klaar**: Ingebouwde beveiliging en betrouwbaarheid

**🎯 Waarom MCP belangrijk is:**
Net zoals USB-C kabelchaos elimineerde, vereenvoudigt MCP de complexiteit van AI-integraties. Eén protocol, oneindige mogelijkheden.

### 🤖 Microsoft Foundry Toolkit-extensie voor VS Code

Microsoft’s toonaangevende AI-ontwikkelextensie die VS Code transformeert tot een AI-krachtpatser.

**🚀 Kernmogelijkheden:**

- 📦 **Modelcatalogus**: Toegang tot modellen van Azure AI, GitHub, Hugging Face, Ollama
- ⚡ **Lokale inferentie**: ONNX-geoptimaliseerde CPU/GPU/NPU uitvoering
- 🏗️ **Agent Builder**: Visuele AI-agentontwikkeling met MCP-integratie
- 🎭 **Multi-modale ondersteuning**: Tekst-, visuele en gestructureerde output

**💡 Ontwikkelvoordelen:**

- Configuratievrij modeldeployment
- Visuele prompt-engineering
- Real-time testomgeving
- Naadloze integratie met MCP-servers

## 📚 Leertraject

### [🚀 Module 1: Microsoft Foundry Toolkit Basisprincipes](./lab1/README.md)

**Duur**: 15 minuten

- 🛠️ Microsoft Foundry Toolkit installeren en configureren voor VS Code
- 🗂️ Verken de Modelcatalogus (100+ modellen van GitHub, ONNX, OpenAI, Anthropic, Google)
- 🎮 Beheers de interactieve Playground voor real-time modeltesten
- 🤖 Bouw je eerste AI-agent met Agent Builder
- 📊 Evalueer modelprestaties met ingebouwde metrics (F1, relevantie, gelijkenis, coherentie)
- ⚡ Leer batchverwerking en multi-modale ondersteuning

**🎯 Leerresultaat**: Maak een functionele AI-agent met een uitgebreid begrip van Microsoft Foundry Toolkit-mogelijkheden

### [🌐 Module 2: MCP met Microsoft Foundry Toolkit Basisprincipes](./lab2/README.md)

**Duur**: 20 minuten

- 🧠 Beheers de Model Context Protocol (MCP) architectuur en concepten
- 🌐 Verken Microsoft’s MCP-server-ecosysteem
- 🤖 Bouw een browserautomatiseringsagent met Playwright MCP-server
- 🔧 Integreer MCP-servers met Microsoft Foundry Toolkit Agent Builder
- 📊 Configureer en test MCP-tools binnen je agents
- 🚀 Exporteer en implementeer MCP-aangedreven agents voor productiegebruik

**🎯 Leerresultaat**: Implementeer een AI-agent die is versterkt met externe tools via MCP

### [🔧 Module 3: Geavanceerde MCP-ontwikkeling met Microsoft Foundry Toolkit](./lab3/README.md)

**Duur**: 20 minuten

- 💻 Maak aangepaste MCP-servers met Microsoft Foundry Toolkit
- 🐍 Configureer en gebruik de nieuwste MCP Python SDK (v1.9.3)
- 🔍 Stel MCP Inspector in en gebruik het voor debugging
- 🛠️ Bouw een Weather MCP Server met professionele debug-workflows
- 🧪 Debug MCP-servers in zowel Agent Builder als Inspector-omgevingen

**🎯 Leerresultaat**: Ontwikkel en debug aangepaste MCP-servers met moderne tooling

### [🐙 Module 4: Praktische MCP-ontwikkeling - Custom GitHub Clone Server](./lab4/README.md)

**Duur**: 30 minuten

- 🏗️ Bouw een real-world GitHub Clone MCP-server voor ontwikkelworkflows
- 🔄 Implementeer slimme repository cloning met validatie en foutafhandeling
- 📁 Maak intelligent mapbeheer en VS Code-integratie
- 🤖 Gebruik GitHub Copilot Agent Mode met aangepaste MCP-tools
- 🛡️ Pas productieklare betrouwbaarheid en platformoverstijgende compatibiliteit toe

**🎯 Leerresultaat**: Implementeer een productieklare MCP-server die echte ontwikkelworkflows vereenvoudigt

## 💡 Praktische Toepassingen & Impact

### 🏢 Enterprise-gebruikscases

#### 🔄 DevOps-automatisering

Transformeer je ontwikkelworkflow met intelligente automatisering:

- **Slim repositorybeheer**: AI-gestuurde code review en merge-besluiten
- **Intelligente CI/CD**: Geautomatiseerde pipeline-optimalisatie op basis van codewijzigingen
- **Issue-triage**: Automatische bugclassificatie en toewijzing

#### 🧪 Kwaliteitsborging Revolutie

Verhoog testen met AI-ondersteunde automatisering:

- **Intelligente testgeneratie**: Maak automatisch uitgebreide test suites
- **Visuele regressietests**: AI-gedreven UI-wijzigingsdetectie
- **Performance monitoring**: Proactieve probleemherkenning en -oplossing

#### 📊 Data pipeline intelligentie

Bouw slimmere dataverwerkingsworkflows:

- **Adaptieve ETL-processen**: Zelfoptimaliserende data-transformaties
- **Anomaliedetectie**: Real-time bewaking van datakwaliteit
- **Intelligent routeren**: Slim beheer van datastromen

#### 🎧 Verbetering van de klantbeleving

Creëer uitzonderlijke klantinteracties:

- **Contextbewuste ondersteuning**: AI-agents met toegang tot klantgeschiedenis
- **Proactieve probleemoplossing**: Predictieve klantenservice
- **Multi-channel integratie**: Geünificeerde AI-ervaring over platforms

## 🛠️ Vereisten & Setup

### 💻 Systeemeisen

| Component        | Vereiste                | Opmerkingen                    |
|------------------|-------------------------|-------------------------------|
| **Besturingssysteem** | Windows 10+, macOS 10.15+, Linux | Elk modern OS                 |
| **Visual Studio Code** | Laatste stabiele versie  | Vereist voor Microsoft Foundry Toolkit |
| **Node.js**          | v18.0+ en npm           | Voor MCP-serverontwikkeling    |
| **Python**           | 3.10+                   | Optioneel voor Python MCP-servers |
| **Geheugen**         | Minimaal 8GB RAM        | 16GB aanbevolen voor lokale modellen |

### 🔧 Ontwikkelomgeving

#### Aanbevolen VS Code-extensies

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - Optioneel maar handig

#### Optionele tools

- **uv**: Moderne Python pakketbeheerder
- **MCP Inspector**: Visuele debugtool voor MCP-servers
- **Playwright**: Voor webautomatiseringsvoorbeelden

## 🎖️ Leerresultaten & Certificeringspad

### 🏆 Checklist vaardigheden

Door deze workshop af te ronden, bereik je meesterschap in:

#### 🎯 Kerncompetenties

- [ ] **MCP Protocolbeheersing**: Diepgaand begrip van architectuur en implementatiepatronen
- [ ] **Microsoft Foundry Toolkit-vaardigheid**: Expertgebruik van Microsoft Foundry Toolkit voor snelle ontwikkeling
- [ ] **Aangepaste serverontwikkeling**: Bouwen, uitrollen en onderhouden van productie-MCP-servers
- [ ] **Toolintegratie-excellentie**: Naadloze koppeling van AI met bestaande ontwikkelworkflows
- [ ] **Probleemoplossingsvaardigheden**: Toepassen van geleerde vaardigheden op echte zakelijke uitdagingen

#### 🔧 Technische vaardigheden

- [ ] Microsoft Foundry Toolkit instellen en configureren in VS Code
- [ ] Ontwerpen en implementeren van aangepaste MCP-servers
- [ ] Integreren van GitHub-modellen met MCP-architectuur
- [ ] Automatische testworkflows bouwen met Playwright
- [ ] AI-agents uitrollen voor productiegebruik
- [ ] Debuggen en optimaliseren van MCP-serverprestaties

#### 🚀 Geavanceerde capaciteiten

- [ ] Architectuur van AI-integraties op ondernemingsniveau
- [ ] Implementeren van beveiligingsbest practices voor AI-applicaties
- [ ] Ontwerpen van schaalbare MCP-serverarchitecturen
- [ ] Creëren van aangepaste toolchains voor specifieke domeinen
- [ ] Anderen begeleiden in AI-native ontwikkeling

## 📖 Aanvullende bronnen

- [MCP-specificatie (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHub-repository](https://github.com/microsoft/vscode-ai-toolkit)
- [Voorbeeldverzameling MCP-servers](https://github.com/modelcontextprotocol/servers)
- [Best Practices Gids](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Beveiligingsbest practices

---

**🚀 Klaar om je AI-ontwikkelworkflow te revolutioneren?**

Laten we samen de toekomst van intelligente applicaties bouwen met MCP en Microsoft Foundry Toolkit!

## Wat nu

Ga verder naar: [Module 11: MCP Server Hands-On Labs](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->