# 🐙 Modul 4: Praktisk MCP-utvikling - Egendefinert GitHub-klone-server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Rask start:** Bygg en produksjonsklar MCP-server som automatiserer kloning av GitHub-repositorier og integrasjon med VS Code på bare 30 minutter!

## 🎯 Læringsmål

Innen slutten av dette laboratoriet vil du kunne:

- ✅ Lage en egendefinert MCP-server for virkelige utviklingsarbeidsflyter  
- ✅ Implementere funksjonalitet for kloning av GitHub-repositorier via MCP  
- ✅ Integrere egendefinerte MCP-servere med VS Code og Agent Builder  
- ✅ Bruke GitHub Copilot Agent Mode med egendefinerte MCP-verktøy  
- ✅ Teste og distribuere egendefinerte MCP-servere i produksjonsmiljøer  

## 📋 Forutsetninger

- Fullført laboratoriene 1-3 (MCP-grunnleggende og avansert utvikling)  
- GitHub Copilot-abonnement ([gratis registrering tilgjengelig](https://github.com/github-copilot/signup))  
- VS Code med AI Toolkit og GitHub Copilot-utvidelser  
- Git CLI installert og konfigurert  

## 🏗️ Prosjektoversikt

### **Utviklingsutfordring i den virkelige verden**
Som utviklere bruker vi ofte GitHub for å klone repositorier og åpne dem i VS Code eller VS Code Insiders. Denne manuelle prosessen innebærer:  
1. Åpne terminal/kommandolinje  
2. Navigere til ønsket mappe  
3. Kjøre `git clone`-kommandoen  
4. Åpne VS Code i den klonede mappen  

**Vår MCP-løsning forenkler dette til én eneste intelligent kommando!**

### **Hva du skal bygge**
En **GitHub Clone MCP Server** (`git_mcp_server`) som tilbyr:

| Funksjon | Beskrivelse | Fordel |
|---------|-------------|---------|
| 🔄 **Smart kloning av repositorier** | Klon GitHub-repoer med validering | Automatisert feilsjekk |
| 📁 **Intelligent kataloghåndtering** | Sjekk og opprett mapper sikkert | Forhindrer overskriving |
| 🚀 **Tverrplattform VS Code-integrasjon** | Åpne prosjekter i VS Code/Insiders | Sømløs arbeidsflytovergang |
| 🛡️ **Robust feilhåndtering** | Håndter nettverk, tillatelser og sti-feil | Produksjonsklar pålitelighet |

---

## 📖 Steg-for-steg Implementering

### Steg 1: Opprett GitHub-agent i Agent Builder

1. **Start Agent Builder** via AI Toolkit-utvidelsen  
2. **Lag en ny agent** med følgende konfigurasjon:  
   ```
   Agent Name: GitHubAgent
   ```
  
3. **Initialiser egendefinert MCP-server:**  
   - Gå til **Tools** → **Add Tool** → **MCP Server**  
   - Velg **"Create A new MCP Server"**  
   - Velg **Python-mal** for maksimal fleksibilitet  
   - **Servernavn:** `git_mcp_server`  

### Steg 2: Konfigurer GitHub Copilot Agent Mode

1. **Åpne GitHub Copilot** i VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")  
2. **Velg Agent-modell** i Copilot-grensesnittet  
3. **Velg Claude 3.7-modellen** for forbedrede resonneringsevner  
4. **Aktiver MCP-integrasjon** for verktøystilgang  

> **💡 Profftips:** Claude 3.7 gir bedre forståelse av utviklingsarbeidsflyter og mønstre for feilhåndtering.  

### Steg 3: Implementer kjernekode for MCP-serveren

**Bruk denne detaljspesifikke prompten med GitHub Copilot Agent Mode:**  

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```
  
### Steg 4: Test din MCP-server  

#### 4a. Test i Agent Builder

1. **Start feilsøkingsoppsett** for Agent Builder  
2. **Konfigurer agenten din med denne systemprompten:**  

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```
  
3. **Test med realistiske brukerscenarier:**  

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```
  
![Agent Builder Testing](../../../../translated_images/no/DebugAgent.81d152370c503241.webp)  

**Forventede resultater:**  
- ✅ Vellykket kloning med bekreftelse av sti  
- ✅ Automatisk oppstart av VS Code  
- ✅ Klare feilmeldinger ved ugyldige scenarioer  
- ✅ Korrekt håndtering av yttertilfeller  

#### 4b. Test i MCP Inspector


![MCP Inspector Testing](../../../../translated_images/no/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 Gratulerer!** Du har nå laget en praktisk, produksjonsklar MCP-server som løser reelle utfordringer i utviklingsarbeidsflyter. Din egendefinerte GitHub-klone-server viser kraften i MCP for å automatisere og forbedre utviklerproduktivitet.

### 🏆 Oppnåelse låst opp:
- ✅ **MCP-utvikler** - Lager egendefinert MCP-server  
- ✅ **Automatiseringsguru** - Effektiviserte utviklingsprosesser  
- ✅ **Integrasjonsekspert** - Koblede flere utviklingsverktøy  
- ✅ **Produksjonsklar** - Bygd deployerbare løsninger  

---

## 🎓 Workshop fullført: Din reise med Model Context Protocol

**Kjære workshopdeltaker,**

Gratulerer med å ha fullført alle fire modulene i Model Context Protocol-workshopen! Du har kommet langt fra å forstå grunnkonsepter i AI Toolkit til å bygge produksjonsklare MCP-servere som løser virkelige utviklingsutfordringer.

### 🚀 Oppsummering av læringsreisen:

**[Modul 1](../lab1/README.md)**: Du begynte med å utforske AI Toolkit-grunnleggende, modelltesting og lage din første AI-agent.  

**[Modul 2](../lab2/README.md)**: Du lærte MCP-arkitektur, integrerte Playwright MCP, og bygde din første nettleserautomatiseringsagent.  

**[Modul 3](../lab3/README.md)**: Du avanserte til utvikling av egendefinerte MCP-servere med Weather MCP-serveren og mestret feilsøkingsverktøy.  

**[Modul 4](../lab4/README.md)**: Du har nå brukt alt til å lage et praktisk automatiseringsverktøy for GitHub-repositorier.  

### 🌟 Det du har mestret:

- ✅ **AI Toolkit-økosystem**: Modeller, agenter og integrasjonsmønstre  
- ✅ **MCP-arkitektur**: Klient-tjener-design, transportprotokoller og sikkerhet  
- ✅ **Utviklerverktøy**: Fra Playground til Inspector og produksjonsdistribusjon  
- ✅ **Egendefinert utvikling**: Bygge, teste og distribuere egne MCP-servere  
- ✅ **Praktiske anvendelser**: Løse virkelige arbeidsflytproblemer med AI  

### 🔮 Dine neste steg:

1. **Bygg din egen MCP-server**: Bruk disse ferdighetene til å automatisere dine unike arbeidsflyter  
2. **Bli med i MCP-miljøet**: Del dine prosjekter og lær fra andre  
3. **Utforsk avansert integrasjon**: Koble MCP-servere til bedriftsløsninger  
4. **Bidra til open source**: Hjelp med å forbedre MCP-verktøy og dokumentasjon  

Husk, denne workshopen er bare starten. Model Context Protocol-økosystemet utvikler seg raskt, og du er nå rustet til å være i front med AI-drevne utviklingsverktøy.  

**Takk for din deltakelse og ditt engasjement for læring!**  

Vi håper denne workshopen har tent idéer som vil forandre måten du bygger og samhandler med AI-verktøy i din utviklingsreise.  

**God koding!**

---

## Hva skjer videre

Gratulerer med å ha fullført alle laboratoriene i Modul 10!

- Tilbake til: [Modul 10 Oversikt](../README.md)  
- Fortsett til: [Modul 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det originale dokumentet på dets opprinnelige språk bør betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->