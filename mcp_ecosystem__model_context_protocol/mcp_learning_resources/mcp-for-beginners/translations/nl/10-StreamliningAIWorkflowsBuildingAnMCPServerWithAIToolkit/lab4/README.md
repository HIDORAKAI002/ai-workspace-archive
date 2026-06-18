# 🐙 Module 4: Praktische MCP-ontwikkeling - Aangepaste GitHub Clone Server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Snelle start:** Bouw in slechts 30 minuten een productieklare MCP-server die het klonen van GitHub-repositories en VS Code-integratie automatiseert!

## 🎯 Leerdoelen

Aan het einde van deze lab kun je:

- ✅ Een aangepaste MCP-server maken voor realistische ontwikkelingsworkflows
- ✅ GitHub-repository-klonen functionaliteit implementeren via MCP
- ✅ Aangepaste MCP-servers integreren met VS Code en Agent Builder
- ✅ GitHub Copilot Agent Mode gebruiken met aangepaste MCP-tools
- ✅ Aangepaste MCP-servers testen en inzetten in productieomgevingen

## 📋 Vereisten

- Voltooiing van Labs 1-3 (MCP-kennis en gevorderde ontwikkeling)
- GitHub Copilot-abonnement ([gratis aanmelden mogelijk](https://github.com/github-copilot/signup))
- VS Code met Microsoft Foundry Toolkit en GitHub Copilot-extensies
- Git CLI geïnstalleerd en geconfigureerd

## 🏗️ Projectoverzicht

### **Realistische Ontwikkelingsuitdaging**
Als ontwikkelaars gebruiken we GitHub vaak om repositories te klonen en te openen in VS Code of VS Code Insiders. Dit handmatige proces omvat:
1. Terminal/opdrachtprompt openen
2. Navigeren naar de gewenste map
3. Uitvoeren van `git clone`-opdracht
4. VS Code openen in de gekloonde map

**Onze MCP-oplossing stroomlijnt dit in één slimme opdracht!**

### **Wat Je Gaat Bouwen**
Een **GitHub Clone MCP Server** (`git_mcp_server`) die het volgende biedt:

| Functie | Beschrijving | Voordeel |
|---------|--------------|----------|
| 🔄 **Slim Repository Klonen** | GitHub-repo's klonen met validatie | Geautomatiseerde foutcontrole |
| 📁 **Intelligent Mapbeheer** | Mappen controleren en veilig aanmaken | Voorkomt overschrijven |
| 🚀 **Cross-platform VS Code-integratie** | Projecten openen in VS Code/Insiders | Naadloze workflowovergang |
| 🛡️ **Robuuste Foutafhandeling** | Omgaan met netwerk-, permissie- en padproblemen | Vertrouwbaarheid geschikt voor productie |

---

## 📖 Stapsgewijze Implementatie

### Stap 1: Maak GitHub Agent aan in Agent Builder

1. **Start Agent Builder** via de Microsoft Foundry Toolkit-extensie
2. **Maak een nieuwe agent aan** met de volgende configuratie:
   ```
   Agent Name: GitHubAgent
   ```

3. **Initialiseer aangepaste MCP-server:**
   - Ga naar **Tools** → **Add Tool** → **MCP Server**
   - Selecteer **"Create A new MCP Server"**
   - Kies **Python-sjabloon** voor maximale flexibiliteit
   - **Servernaam:** `git_mcp_server`

### Stap 2: Configureer GitHub Copilot Agent Mode

1. **Open GitHub Copilot** in VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Selecteer Agent Model** in de Copilot-interface
3. **Kies Claude 3.7-model** voor verbeterde redeneercapaciteiten
4. **Schakel MCP-integratie in** voor toegang tot tools

> **💡 Pro Tip:** Claude 3.7 biedt superieur begrip van ontwikkelingsworkflows en foutafhandelingspatronen.

### Stap 3: Implementeer Kernfunctionaliteit van MCP Server

**Gebruik de volgende gedetailleerde prompt met GitHub Copilot Agent Mode:**

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

### Stap 4: Test Je MCP-Server

#### 4a. Test in Agent Builder

1. **Start de debugconfiguratie** voor Agent Builder
2. **Configureer je agent met deze systeem-prompt:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Test met realistische gebruikersscenario's:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/nl/DebugAgent.81d152370c503241.webp)

**Verwachte Resultaten:**
- ✅ Succesvol klonen met padbevestiging
- ✅ Automatisch starten van VS Code
- ✅ Duidelijke foutmeldingen bij ongeldige scenario's
- ✅ Correcte afhandeling van randgevallen

#### 4b. Test in MCP Inspector


![MCP Inspector Testing](../../../../translated_images/nl/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Gefeliciteerd!** Je hebt met succes een praktische, productieklare MCP-server gemaakt die echte uitdagingen in ontwikkelingsworkflows oplost. Je aangepaste GitHub-cloneserver toont de kracht van MCP aan voor het automatiseren en verbeteren van ontwikkelaarproductiviteit.

### 🏆 Prestatie Behaald:
- ✅ **MCP Ontwikkelaar** - Aangepaste MCP-server gemaakt
- ✅ **Workflow Automatisering** - Ontwikkelingsprocessen gestroomlijnd  
- ✅ **Integratie Expert** - Meerdere ontwikkeltools verbonden
- ✅ **Productieklaar** - Oplossingen bouwklaar gemaakt

---

## 🎓 Workshop Voltooiing: Je Reis met Model Context Protocol

**Beste Workshopdeelnemer,**

Gefeliciteerd met het voltooien van alle vier modules van de Model Context Protocol-workshop! Je hebt een lange weg afgelegd van het begrijpen van basisconcepten van Microsoft Foundry Toolkit tot het bouwen van productieklare MCP-servers die echte ontwikkelingsuitdagingen oplossen.

### 🚀 Terugblik op je Leerpad:

**[Module 1](../lab1/README.md)**: Je begon met het verkennen van Microsoft Foundry Toolkit-fundamentals, modeltesten, en het maken van je eerste AI-agent.

**[Module 2](../lab2/README.md)**: Je leerde MCP-architectuur, integreerde Playwright MCP, en bouwde je eerste browserautomatiseringsagent.

**[Module 3](../lab3/README.md)**: Je ging verder met aangepaste MCP-serverontwikkeling met de Weather MCP-server en beheerde debugtools.

**[Module 4](../lab4/README.md)**: Nu heb je alles toegepast om een praktische GitHub-repository workflow-automatiseringstool te maken.

### 🌟 Wat Je Beheerst:

- ✅ **Microsoft Foundry Toolkit Ecosysteem**: Modellen, agents, en integratiepatronen
- ✅ **MCP Architectuur**: Client-serverontwerp, transportprotocollen en beveiliging
- ✅ **Ontwikkelaarstools**: Van Playground tot Inspector tot productie-uitrol
- ✅ **Aangepaste Ontwikkeling**: Je eigen MCP-servers bouwen, testen en uitrollen
- ✅ **Praktische Toepassingen**: Echte workflow-uitdagingen oplossen met AI

### 🔮 Je Volgende Stappen:

1. **Bouw je eigen MCP-server**: Pas deze vaardigheden toe om je unieke workflows te automatiseren
2. **Word lid van de MCP-community**: Deel je creaties en leer van anderen
3. **Ontdek gevorderde integratie**: Verbind MCP-servers met bedrijfsystemen
4. **Draag bij aan Open Source**: Help MCP-tooling en documentatie verbeteren

Onthoud, deze workshop is slechts het begin. Het Model Context Protocol-ecosysteem ontwikkelt zich snel en je bent nu uitgerust om voorop te lopen in AI-gestuurde ontwikkeltools.

**Dank je wel voor je deelname en inzet om te leren!**

We hopen dat deze workshop ideeën heeft aangewakkerd die zullen transformeren hoe je bouwt en omgaat met AI-tools in je ontwikkeltraject.

**Veel programmeerplezier!**

---

## Wat Nu?

Gefeliciteerd met het voltooien van alle labs in Module 10!

- Terug naar: [Module 10 Overzicht](../README.md)
- Ga verder naar: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->