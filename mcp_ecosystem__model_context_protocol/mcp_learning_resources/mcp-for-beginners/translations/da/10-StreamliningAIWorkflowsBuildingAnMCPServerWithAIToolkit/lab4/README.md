# 🐙 Modul 4: Praktisk MCP-udvikling - Tilpasset GitHub Clone Server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Kom hurtigt i gang:** Byg en produktionsklar MCP-server, der automatiserer GitHub repository-kloning og VS Code-integration på kun 30 minutter!

## 🎯 Læringsmål

Når du har gennemført dette laboratorium, kan du:

- ✅ Oprette en tilpasset MCP-server til udviklingsarbejdsgange i praksis
- ✅ Implementere funktionalitet til GitHub repository-kloning via MCP
- ✅ Integrere tilpassede MCP-servere med VS Code og Agent Builder
- ✅ Bruge GitHub Copilot Agent Mode med tilpassede MCP-værktøjer
- ✅ Teste og implementere tilpassede MCP-servere i produktionsmiljøer

## 📋 Forudsætninger

- Gennemførelse af Labs 1-3 (MCP-grundlæggende og avanceret udvikling)
- GitHub Copilot abonnement ([gratis tilmelding tilgængelig](https://github.com/github-copilot/signup))
- VS Code med Microsoft Foundry Toolkit- og GitHub Copilot-udvidelser
- Installeret og konfigureret Git CLI

## 🏗️ Projektoversigt

### **Udviklingsudfordring i praksis**
Som udviklere bruger vi ofte GitHub til at klone repositories og åbne dem i VS Code eller VS Code Insiders. Denne manuelle proces indebærer:
1. Åbning af terminal/kommandoprompt
2. Navigering til ønsket mappe
3. Kørsel af `git clone`-kommando
4. Åbning af VS Code i den klonede mappe

**Vores MCP-løsning sammenkæder dette til en enkelt intelligent kommando!**

### **Hvad du vil bygge**
En **GitHub Clone MCP Server** (`git_mcp_server`), der leverer:

| Funktion | Beskrivelse | Fordel |
|---------|-------------|---------|
| 🔄 **Smart repository-kloning** | Klon GitHub repos med validering | Automatiseret fejlkontrol |
| 📁 **Intelligent mappestyring** | Tjek og opret mapper sikkert | Forhindrer overskrivning |
| 🚀 **Platformuafhængig VS Code-integration** | Åbn projekter i VS Code/Insiders | Flydende arbejdsgangsovergang |
| 🛡️ **Robust fejlhåndtering** | Håndter netværks-, tilladelses- og sti-problemer | Produktionsklar pålidelighed |

---

## 📖 Trin-for-trin implementering

### Trin 1: Opret GitHub-agent i Agent Builder

1. **Start Agent Builder** gennem Microsoft Foundry Toolkit-udvidelsen
2. **Opret en ny agent** med følgende konfiguration:
   ```
   Agent Name: GitHubAgent
   ```

3. **Initialiser tilpasset MCP-server:**
   - Gå til **Tools** → **Add Tool** → **MCP Server**
   - Vælg **"Create A new MCP Server"**
   - Vælg **Python-skabelon** for maksimal fleksibilitet
   - **Servernavn:** `git_mcp_server`

### Trin 2: Konfigurer GitHub Copilot Agent Mode

1. **Åbn GitHub Copilot** i VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Vælg Agent Model** i Copilot-interface
3. **Vælg Claude 3.7-modellen** for forbedrede ræsonnementsevner
4. **Aktivér MCP-integration** for værktøjstilgang

> **💡 Pro Tip:** Claude 3.7 giver overlegen forståelse af udviklingsarbejdsgange og fejlhåndteringsmønstre.

### Trin 3: Implementer kernefunktionalitet i MCP-server

**Brug følgende detaljerede prompt med GitHub Copilot Agent Mode:**

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

### Trin 4: Test din MCP-server

#### 4a. Test i Agent Builder

1. **Start debug-konfigurationen** for Agent Builder
2. **Konfigurer din agent med denne systemprompt:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Test med realistiske brugerscenarier:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/da/DebugAgent.81d152370c503241.webp)

**Forventede resultater:**
- ✅ Vellykket kloning med sti-bekræftelse
- ✅ Automatisk åbning af VS Code
- ✅ Klare fejlmeddelelser for ugyldige scenarier
- ✅ Korrekt håndtering af kanttilfælde

#### 4b. Test i MCP Inspector


![MCP Inspector Testing](../../../../translated_images/da/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Tillykke!** Du har med succes oprettet en praktisk, produktionsklar MCP-server, der løser reelle udviklingsarbejdsgangsudfordringer. Din tilpassede GitHub clone-server demonstrerer styrken af MCP til at automatisere og forbedre udviklerproduktiviteten.

### 🏆 Opnåelse låst op:
- ✅ **MCP-udvikler** - Oprettet tilpasset MCP-server
- ✅ **Workflow Automator** - Strømlinet udviklingsprocesser  
- ✅ **Integrations-ekspert** - Forbundet flere udviklingsværktøjer
- ✅ **Produktionsklar** - Bygget implementerbare løsninger

---

## 🎓 Workshopafslutning: Din rejse med Model Context Protocol

**Kære workshopdeltager,**

Tillykke med at have gennemført alle fire moduler i Model Context Protocol-workshoppen! Du er kommet langt fra at forstå grundlæggende Microsoft Foundry Toolkit-koncepter til at bygge produktionsklare MCP-servere, der løser virkelige udviklingsudfordringer.

### 🚀 Dit læringsforløb opsummeret:

**[Modul 1](../lab1/README.md)**: Du begyndte med at udforske Microsoft Foundry Toolkit-grundlag, modeltest og oprettelse af din første AI-agent.

**[Modul 2](../lab2/README.md)**: Du lærte MCP-arkitektur, integrerede Playwright MCP og byggede din første browserautomationsagent.

**[Modul 3](../lab3/README.md)**: Du avancerede til tilpasset MCP-serverudvikling med Weather MCP-serveren og mestrede fejlsøgningsværktøjer.

**[Modul 4](../lab4/README.md)**: Du har nu anvendt alt til at skabe et praktisk GitHub repository workflow automatiseringsværktøj.

### 🌟 Det, du har mestret:

- ✅ **Microsoft Foundry Toolkit-økosystemet**: Modeller, agenter og integrationsmønstre
- ✅ **MCP-arkitektur**: Klient-server design, transportprotokoller og sikkerhed
- ✅ **Udviklingsværktøjer**: Fra Playground til Inspector til produktionsimplementering
- ✅ **Tilpasset udvikling**: Opbygning, test og udrulning af dine egne MCP-servere
- ✅ **Praktiske anvendelser**: Løsning af reelle arbejdsgangsudfordringer med AI

### 🔮 Dine næste skridt:

1. **Byg din egen MCP-server**: Brug disse færdigheder til at automatisere dine unikke arbejdsgange
2. **Deltag i MCP-fællesskabet**: Del dine kreationer og lær af andre
3. **Udforsk avanceret integration**: Forbind MCP-servere med enterprise-systemer
4. **Bidrag til open source**: Hjælp med at forbedre MCP-værktøjer og dokumentation

Husk, denne workshop er kun begyndelsen. Model Context Protocol-økosystemet udvikler sig hurtigt, og du er nu rustet til at være i front med AI-drevne udviklingsværktøjer.

**Tak for dit engagement og din lyst til at lære!**

Vi håber, denne workshop har givet dig idéer, der vil transformere, hvordan du bygger og interagerer med AI-værktøjer på din udviklingsrejse.

**God kodning!**

---

## Hvad er næste skridt

Tillykke med at have gennemført alle labs i Modul 10!

- Tilbage til: [Module 10 Overview](../README.md)
- Fortsæt til: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->