# 🐙 Modul 4: Praktisk MCP-utvikling - Egen GitHub-klone-server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Rask start:** Bygg en produksjonsklar MCP-server som automatiserer kloning av GitHub-repositorier og integrasjon med VS Code på bare 30 minutter!

## 🎯 Læringsmål

Ved slutten av dette laboratoriet vil du kunne:

- ✅ Lage en egendefinert MCP-server for reelle utviklingsarbeidsflyter
- ✅ Implementere funksjonalitet for kloning av GitHub-repositorier via MCP
- ✅ Integrere egendefinerte MCP-servere med VS Code og Agent Builder
- ✅ Bruke GitHub Copilot Agent Mode med egendefinerte MCP-verktøy
- ✅ Teste og ta i bruk egendefinerte MCP-servere i produksjonsmiljøer

## 📋 Forutsetninger

- Fullført laboratoriene 1-3 (MCP-grunnprinsipper og avansert utvikling)
- GitHub Copilot-abonnement ([gratis påmelding tilgjengelig](https://github.com/github-copilot/signup))
- VS Code med Microsoft Foundry Toolkit og GitHub Copilot-utvidelser
- Git CLI installert og konfigurert

## 🏗️ Prosjektoversikt

### **Utviklingsutfordring i virkeligheten**
Som utviklere bruker vi ofte GitHub for å klone repositorier og åpne dem i VS Code eller VS Code Insiders. Denne manuelle prosessen innebærer:
1. Åpne terminal/kommandoprompt
2. Navigere til ønsket mappe
3. Kjøre `git clone`-kommandoen
4. Åpne VS Code i den klonede mappen

**Vår MCP-løsning forenkler dette til én enkelt intelligent kommando!**

### **Dette skal du bygge**
En **GitHub Clone MCP Server** (`git_mcp_server`) som tilbyr:

| Funksjon | Beskrivelse | Fordel |
|---------|-------------|---------|
| 🔄 **Smart kloning av repositorier** | Klon GitHub-repoer med validering | Automatisert feilsjekk |
| 📁 **Intelligent kataloghåndtering** | Sjekk og opprett mapper sikkert | Forhindrer overskriving |
| 🚀 **Tverrplattform VS Code-integrasjon** | Åpne prosjekter i VS Code/Insiders | Sømløs arbeidsflytovergang |
| 🛡️ **Robust feilbehandling** | Håndter nettverks-, tilgangs- og sti-problemer | Produksjonsklar pålitelighet |

---

## 📖 Trinnvis implementering

### Trinn 1: Opprett GitHub-agent i Agent Builder

1. **Start Agent Builder** via Microsoft Foundry Toolkit-utvidelsen
2. **Lag en ny agent** med følgende konfigurasjon:
   ```
   Agent Name: GitHubAgent
   ```

3. **Initialiser egendefinert MCP-server:**
   - Gå til **Verktøy** → **Legg til verktøy** → **MCP Server**
   - Velg **"Opprett en ny MCP-server"**
   - Velg **Python-mal** for maksimal fleksibilitet
   - **Servernavn:** `git_mcp_server`

### Trinn 2: Konfigurer GitHub Copilot Agent Mode

1. **Åpne GitHub Copilot** i VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Velg Agentmodell** i Copilot-grensesnittet
3. **Velg Claude 3.7-modellen** for bedre resonnementsevner
4. **Aktiver MCP-integrasjon** for tilgang til verktøy

> **💡 Pro-tips:** Claude 3.7 gir overlegen forståelse av utviklingsflyter og mønstre for feilbehandling.

### Trinn 3: Implementer kjernen i MCP-serveren

**Bruk følgende detaljerte prompt med GitHub Copilot Agent Mode:**

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

### Trinn 4: Test MCP-serveren din

#### 4a. Test i Agent Builder

1. **Start debug-konfigurasjonen** for Agent Builder
2. **Konfigurer agenten din med dette systempromptet:**

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
- ✅ Korrekt håndtering av kanttilfeller

#### 4b. Test i MCP Inspector


![MCP Inspector Testing](../../../../translated_images/no/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Gratulerer!** Du har nå laget en praktisk, produksjonsklar MCP-server som løser reelle utfordringer i utviklingsarbeidsflyter. Din egendefinerte GitHub-klone-server viser styrken til MCP for å automatisere og forbedre utviklerproduktivitet.

### 🏆 Oppnåelse Låst opp:
- ✅ **MCP-utvikler** - Laget egendefinert MCP-server
- ✅ **Automatiseringsekspert for arbeidsflyt** - Effektiviserte utviklingsprosesser  
- ✅ **Integrasjonsmester** - Knyttet sammen flere utviklingsverktøy
- ✅ **Produksjonsklar** - Bygget løsninger klare for produksjon

---

## 🎓 Fullført workshop: Din reise med Model Context Protocol

**Kjære workshop-deltaker,**

Gratulerer med å ha fullført alle fire modulene i Model Context Protocol-workshopen! Du har gått en lang vei fra å forstå grunnleggende konsepter i Microsoft Foundry Toolkit til å bygge MCP-servere klare for produksjon som løser reelle utviklingsutfordringer.

### 🚀 Oppsummering av læringsstien:

**[Modul 1](../lab1/README.md)**: Du startet med å utforske Microsoft Foundry Toolkit-grunnprinsipper, testing av modeller og opprettelse av din første AI-agent.

**[Modul 2](../lab2/README.md)**: Du lærte MCP-arkitektur, integrerte Playwright MCP, og bygget din første automatiseringsagent for nettleser.

**[Modul 3](../lab3/README.md)**: Du avanserte til egendefinert MCP-serverutvikling med Weather MCP-serveren og mestret feilsøkingsverktøy.

**[Modul 4](../lab4/README.md)**: Nå har du anvendt alt for å lage et praktisk verktøy for automatisering av GitHub-repositoriearbeidsflyt.

### 🌟 Det du har mestret:

- ✅ **Microsoft Foundry Toolkit-økosystemet**: Modeller, agenter og integrasjonsmønstre
- ✅ **MCP-arkitektur**: Klient-server design, transportprotokoller og sikkerhet
- ✅ **Utviklerverktøy**: Fra Playground til Inspector til produksjonsutrulling
- ✅ **Egendefinert utvikling**: Bygge, teste og ta i bruk egne MCP-servere
- ✅ **Praktiske anvendelser**: Løse virkelige arbeidsflytutfordringer med AI

### 🔮 Dine neste steg:

1. **Bygg din egen MCP-server**: Ta i bruk disse ferdighetene for å automatisere dine unike arbeidsflyter
2. **Bli med i MCP-fellesskapet**: Del dine kreasjoner og lær av andre
3. **Utforsk avansert integrasjon**: Knytt MCP-servere til bedriftsystemer
4. **Bidra til Open Source**: Hjelp til med å forbedre MCP-verktøy og dokumentasjon

Husk, denne workshopen er bare begynnelsen. Model Context Protocol-økosystemet utvikler seg raskt, og du er nå rustet til å være i front for AI-drevne utviklingsverktøy.

**Takk for ditt engasjement og din læringsvilje!**

Vi håper denne workshopen har vekket ideer som vil forandre hvordan du bygger og samhandler med AI-verktøy i din utviklingsreise.

**God koding!**

---

## Hva skjer nå

Gratulerer med å ha fullført alle laboratorier i Modul 10!

- Tilbake til: [Modul 10 Oversikt](../README.md)
- Fortsett til: [Modul 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->