# 🐙 Modulul 4: Dezvoltare practică MCP - Server GitHub Clone personalizat

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Pornire rapidă:** Construiește un server MCP gata de producție care automatizează clonarea repository-urilor GitHub și integrarea cu VS Code în doar 30 de minute!

## 🎯 Obiective de învățare

La finalul acestui laborator, vei putea:

- ✅ Crea un server MCP personalizat pentru fluxuri de lucru reale de dezvoltare
- ✅ Implementa funcționalitatea de clonare a repository-urilor GitHub prin MCP
- ✅ Integra servere MCP personalizate cu VS Code și Agent Builder
- ✅ Folosi GitHub Copilot Agent Mode cu unelte MCP personalizate
- ✅ Testa și implementa servere MCP personalizate în medii de producție

## 📋 Precondiții

- Finalizarea laboratoarelor 1-3 (fundamente MCP și dezvoltare avansată)
- Abonament GitHub Copilot ([înregistrare gratuită disponibilă](https://github.com/github-copilot/signup))
- VS Code cu extensiile Microsoft Foundry Toolkit și GitHub Copilot
- CLI Git instalat și configurat

## 🏗️ Prezentare generală a proiectului

### **Provocarea dezvoltării reale**
Ca dezvoltatori, folosim frecvent GitHub pentru a clona repository-uri și a le deschide în VS Code sau VS Code Insiders. Acest proces manual implică:
1. Deschiderea terminalului/command prompt-ului
2. Navigarea către directorul dorit
3. Executarea comenzii `git clone`
4. Deschiderea VS Code în directorul clonat

**Soluția noastră MCP simplifică toate acestea într-o singură comandă inteligentă!**

### **Ce vei construi**
Un **Server MCP GitHub Clone** (`git_mcp_server`) care oferă:

| Caracteristică | Descriere | Beneficiu |
|---------|-------------|---------|
| 🔄 **Clonare inteligentă a repository-urilor** | Clonarea repository-urilor GitHub cu validare | Verificare automată a erorilor |
| 📁 **Management inteligent al directoarelor** | Verifică și creează directoare în siguranță | Previne suprascrierea |
| 🚀 **Integrare cross-platform VS Code** | Deschide proiecte în VS Code/Insiders | Tranziție fluidă a fluxului de lucru |
| 🛡️ **Gestionare robustă a erorilor** | Tratamentul problemelor de rețea, permisiuni și căi de acces | Fiabilitate pregătită pentru producție |

---

## 📖 Implementare pas cu pas

### Pasul 1: Creează un agent GitHub în Agent Builder

1. **Lansează Agent Builder** prin extensia Microsoft Foundry Toolkit
2. **Creează un agent nou** cu următoarea configurație:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inițializează serverul MCP personalizat:**
   - Navighează la **Tools** → **Add Tool** → **MCP Server**
   - Selectează **"Create A new MCP Server"**
   - Alege **șablonul Python** pentru flexibilitate maximă
   - **Nume server:** `git_mcp_server`

### Pasul 2: Configurează GitHub Copilot Agent Mode

1. **Deschide GitHub Copilot** în VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Selectează modelul Agent** în interfața Copilot
3. **Alege modelul Claude 3.7** pentru capabilități avansate de raționament
4. **Activează integrarea MCP** pentru acces la unelte

> **💡 Sfat de expert:** Claude 3.7 oferă o înțelegere superioară a fluxurilor de dezvoltare și a modelelor de gestionare a erorilor.

### Pasul 3: Implementează funcționalitatea de bază a serverului MCP

**Folosește promptul detaliat următor cu GitHub Copilot Agent Mode:**

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

### Pasul 4: Testează serverul MCP

#### 4a. Testează în Agent Builder

1. **Lansează configurația de depanare** pentru Agent Builder
2. **Configurează agentul tău cu acest prompt de sistem:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testează cu scenarii realiste de utilizare:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/ro/DebugAgent.81d152370c503241.webp)

**Rezultate așteptate:**
- ✅ Clonare reușită cu confirmarea căii
- ✅ Lansare automată VS Code
- ✅ Mesaje clare de eroare pentru scenarii invalide
- ✅ Gestionarea corectă a situațiilor limită

#### 4b. Testează în MCP Inspector

![MCP Inspector Testing](../../../../translated_images/ro/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Felicitări!** Ai creat cu succes un server MCP practic, gata pentru producție, care rezolvă provocările reale ale fluxului de lucru de dezvoltare. Serverul tău personalizat de clonare GitHub demonstrează puterea MCP în automatizarea și creșterea productivității dezvoltatorilor.

### 🏆 Realizări obținute:
- ✅ **Dezvoltator MCP** - A creat server MCP personalizat
- ✅ **Automator de fluxuri de lucru** - A optimizat procesele de dezvoltare  
- ✅ **Expert în integrare** - A conectat mai multe unelte de dezvoltare
- ✅ **Pregătit pentru producție** - A construit soluții deployabile

---

## 🎓 Finalizarea workshop-ului: Călătoria ta cu Model Context Protocol

**Dragă participant la workshop,**

Felicitări pentru finalizarea celor patru module ale workshop-ului Model Context Protocol! Ai parcurs un drum lung de la înțelegerea conceptelor fundamentale Microsoft Foundry Toolkit până la construirea serverelor MCP gata de producție care rezolvă provocări reale de dezvoltare.

### 🚀 Recapitulare a traseului de învățare:

**[Modulul 1](../lab1/README.md)**: Ai început explorând fundamentele Microsoft Foundry Toolkit, testarea modelelor și crearea primului agent AI.

**[Modulul 2](../lab2/README.md)**: Ai învățat arhitectura MCP, ai integrat Playwright MCP și ai construit primul tău agent de automatizare a browserului.

**[Modulul 3](../lab3/README.md)**: Ai avansat către dezvoltarea serverelor MCP personalizate cu serverul Weather MCP și ai stăpânit uneltele de depanare.

**[Modulul 4](../lab4/README.md)**: Acum ai aplicat totul pentru a crea un instrument practic de automatizare a fluxului de lucru în repository-uri GitHub.

### 🌟 Ce ai stăpânit:

- ✅ **Ecosistemul Microsoft Foundry Toolkit**: Modele, agenți și modele de integrare
- ✅ **Arhitectura MCP**: Design client-server, protocoale de transport și securitate
- ✅ **Unelte pentru dezvoltatori**: De la Playground la Inspector și implementare în producție
- ✅ **Dezvoltare personalizată**: Construirea, testarea și implementarea propriilor servere MCP
- ✅ **Aplicații practice**: Rezolvarea problemelor reale de flux de lucru cu AI

### 🔮 Pașii următori:

1. **Construiește propriul server MCP**: Aplică aceste abilități pentru a automatiza fluxurile tale unice
2. **Alătură-te comunității MCP**: Împărtășește creațiile și învață de la alții
3. **Explorează integrarea avansată**: Conectează serverele MCP la sisteme enterprise
4. **Contribuie la open source**: Ajută la îmbunătățirea uneltelor și documentației MCP

Amintește-ți, acest workshop este doar începutul. Ecosistemul Model Context Protocol evoluează rapid, iar acum ești echipat să fii în fruntea uneltelor de dezvoltare asistate de AI.

**Îți mulțumim pentru participare și dedicarea învățării!**

Sperăm că acest workshop ți-a creat idei care vor transforma modul în care construiești și interacționezi cu uneltele AI în călătoria ta de dezvoltare.

**Codare fericită!**

---

## Ce urmează

Felicitări pentru finalizarea tuturor laboratoarelor din Modulul 10!

- Înapoi la: [Prezentare Modul 10](../README.md)
- Continuă la: [Modulul 11: Laboratoare practice MCP Server](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->