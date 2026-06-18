# 🐙 Modul 4: Praktický vývoj MCP - Vlastný GitHub klonovací server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Rýchly štart:** Postavte produkčný MCP server, ktorý automatizuje klonovanie GitHub repozitárov a integráciu s VS Code za iba 30 minút!

## 🎯 Ciele učenia

Na konci tejto laboratórnej úlohy budete vedieť:

- ✅ Vytvoriť vlastný MCP server pre reálne vývojové pracovné postupy
- ✅ Implementovať funkciu klonovania GitHub repozitárov cez MCP
- ✅ Integrovať vlastné MCP servery s VS Code a Agent Builderom
- ✅ Používať GitHub Copilot Agent Mode s vlastnými MCP nástrojmi
- ✅ Testovať a nasadiť vlastné MCP servery v produkčnom prostredí

## 📋 Predpoklady

- Dokončenie laboratórií 1-3 (základy MCP a pokročilý vývoj)
- Predplatné GitHub Copilot ([dostupná bezplatná registrácia](https://github.com/github-copilot/signup))
- VS Code s rozšíreniami Microsoft Foundry Toolkit a GitHub Copilot
- Nainštalovaný a nakonfigurovaný Git CLI

## 🏗️ Prehľad projektu

### **Reálny vývojársky problém**
Ako vývojári často používame GitHub na klonovanie repozitárov a ich otvorenie vo VS Code alebo VS Code Insiders. Tento manuálny proces zahŕňa:
1. Otvorenie terminálu/príkazového riadku
2. Navigáciu do požadovaného adresára
3. Spustenie príkazu `git clone`
4. Otvorenie VS Code v klonovanom adresári

**Naše riešenie MCP toto zjednodušuje do jediného inteligentného príkazu!**

### **Čo postavíte**
**GitHub Clone MCP Server** (`git_mcp_server`), ktorý ponúka:

| Funkcia | Popis | Výhoda |
|---------|-------------|---------|
| 🔄 **Inteligentné klonovanie repozitárov** | Klonuje GitHub repozitáre s overením | Automatická kontrola chýb |
| 📁 **Inteligentné spravovanie adresárov** | Bezpečne kontroluje a vytvára adresáre | Predchádza prepísaniu |
| 🚀 **Viacplatformová integrácia VS Code** | Otvára projekty vo VS Code/Insiders | Plynulý pracovný tok |
| 🛡️ **Robustné spracovanie chýb** | Rieši sieťové, oprávnenia a cesty | Spoľahlivosť vhodná do produkcie |

---

## 📖 Implementácia krok za krokom

### Krok 1: Vytvorte GitHub Agenta v Agent Builderi

1. **Spustite Agent Builder** cez rozšírenie Microsoft Foundry Toolkit
2. **Vytvorte nového agenta** s nasledujúcou konfiguráciou:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inicializujte vlastný MCP server:**
   - Prejdite do **Nástroje** → **Pridať nástroj** → **MCP Server**
   - Vyberte **"Vytvoriť nový MCP Server"**
   - Zvoľte **Python šablónu** pre maximálnu flexibilitu
   - **Názov servera:** `git_mcp_server`

### Krok 2: Nakonfigurujte GitHub Copilot Agent Mode

1. **Otvorte GitHub Copilot** vo VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Vyberte Agent Model** v rozhraní Copilota
3. **Zvoľte model Claude 3.7** pre rozšírené schopnosti uvažovania
4. **Povoľte integráciu MCP** pre prístup k nástrojom

> **💡 Tip:** Claude 3.7 poskytuje lepšie porozumenie vývojovým pracovným postupom a vzorcom spracovania chýb.

### Krok 3: Implementujte základnú funkcionalitu MCP servera

**Použite nasledujúci detailný prompt s GitHub Copilot Agent Mode:**

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

### Krok 4: Otestujte svoj MCP server

#### 4a. Test v Agent Builderi

1. **Spustite debug konfiguráciu** pre Agent Builder
2. **Nakonfigurujte svojho agenta pomocou tohto systémového promptu:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testujte realistické používateľské scenáre:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/sk/DebugAgent.81d152370c503241.webp)

**Očakávané výsledky:**
- ✅ Úspešné klonovanie s potvrdením cesty
- ✅ Automatické spustenie VS Code
- ✅ Jasné chybové hlásenia pri neplatných scenároch
- ✅ Správne zvládanie hraničných prípadov

#### 4b. Test v MCP Inspectore


![MCP Inspector Testing](../../../../translated_images/sk/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Gratulujeme!** Úspešne ste vytvorili praktický, produkčný MCP server, ktorý rieši skutočné problémy vývojových pracovných postupov. Váš vlastný GitHub klonovací server demonštruje silu MCP pri automatizácii a zlepšovaní produktivity vývojárov.

### 🏆 Odmeny za úspech:
- ✅ **MCP vývojár** - Vytvoril vlastný MCP server
- ✅ **Automatizátor pracovných tokov** - Zefektívnil vývojové procesy  
- ✅ **Expert na integrácie** - Prepojil viaceré vývojové nástroje
- ✅ **Produkčný stav** - Postavil riešenia pripravené na nasadenie

---

## 🎓 Ukončenie workshopu: Vaša cesta s Model Context Protocol

**Vážený účastník workshopu,**

Gratulujeme k úspešnému dokončeniu všetkých štyroch modulov workshopu Model Context Protocol! Prešli ste dlhú cestu od pochopenia základov Microsoft Foundry Toolkit až po vytváranie produkčných MCP serverov, ktoré riešia reálne vývojové výzvy.

### 🚀 Rekapitulácia vašej učenia:

**[Modul 1](../lab1/README.md)**: Začali ste skúmaním základov Microsoft Foundry Toolkit, testovaním modelov a vytváraním prvého AI agenta.

**[Modul 2](../lab2/README.md)**: Naučili ste sa architektúru MCP, integrovali Playwright MCP a postavili prvého agenta na automatizáciu prehliadača.

**[Modul 3](../lab3/README.md)**: Pokročili ste vo vývoji vlastných MCP serverov s Weather MCP serverom a ovládli nástroje na ladenie.

**[Modul 4](../lab4/README.md)**: Teraz ste všetko využili na vytvorenie praktického nástroja na automatizáciu pracovného toku s GitHub repozitármi.

### 🌟 Čo ste zvládli:

- ✅ **Ekosystém Microsoft Foundry Toolkit**: Modely, agenti a integračné vzory
- ✅ **Architektúra MCP**: Klient-server dizajn, transportné protokoly a bezpečnosť
- ✅ **Vývojárske nástroje**: Od Playground cez Inspector až po produkčné nasadenie
- ✅ **Vlastný vývoj**: Budovanie, testovanie a nasadzovanie vlastných MCP serverov
- ✅ **Praktické aplikácie**: Riešenie reálnych pracovných tokov pomocou AI

### 🔮 Vaše ďalšie kroky:

1. **Postavte si vlastný MCP server**: Aplikujte tieto zručnosti na automatizáciu svojich jedinečných pracovných tokov
2. **Pripojte sa ku komunite MCP**: Zdieľajte svoje výtvory a učte sa od ostatných
3. **Preskúmajte pokročilé integrácie**: Prepojte MCP servery s podnikových systémami
4. **Prispievajte do Open Source**: Pomáhajte zlepšovať MCP nástroje a dokumentáciu

Pamätajte, tento workshop je len začiatok. Ekosystém Model Context Protocol sa rýchlo vyvíja a teraz ste pripravení byť na čele vývoja AI-nástrojov.

**Ďakujeme za vašu účasť a oddanosť učeniu!**

Dúfame, že tento workshop vám priniesol nápady, ktoré zmenia váš spôsob práce a interakcie s AI nástrojmi vo vašom vývojárskom živote.

**Prajeme vám veľa šťastia pri kódovaní!**

---

## Čo je ďalej

Gratulujeme k dokončeniu všetkých laboratórií modulu 10!

- Späť na: [Prehľad modulu 10](../README.md)
- Pokračujte na: [Modul 11: Praktické laboratóriá MCP servera](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->