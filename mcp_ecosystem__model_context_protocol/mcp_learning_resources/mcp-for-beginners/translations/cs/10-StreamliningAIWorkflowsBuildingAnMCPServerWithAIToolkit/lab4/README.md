# 🐙 Modul 4: Praktický vývoj MCP - Vlastní GitHub Klonovací Server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Rychlý start:** Postavte produkčně připravený MCP server, který automatizuje klonování repozitářů z GitHubu a integraci do VS Code za pouhých 30 minut!

## 🎯 Výukové cíle

Na konci tohoto labu budete schopni:

- ✅ Vytvořit vlastní MCP server pro reálné vývojové pracovní postupy
- ✅ Implementovat funkci klonování GitHub repozitářů přes MCP
- ✅ Integrovat vlastní MCP servery s VS Code a Agent Builderem
- ✅ Používat režim Agenta GitHub Copilot s vlastními MCP nástroji
- ✅ Testovat a nasazovat vlastní MCP servery v produkčním prostředí

## 📋 Předpoklady

- Dokončení labů 1-3 (základy MCP a pokročilý vývoj)
- Předplatné GitHub Copilot ([k dispozici zdarma](https://github.com/github-copilot/signup))
- VS Code s rozšířeními Microsoft Foundry Toolkit a GitHub Copilot
- Nainstalovaný a nakonfigurovaný Git CLI

## 🏗️ Přehled projektu

### **Skutečná výzva vývoje**
Jako vývojáři často používáme GitHub k klonování repozitářů a otevírání ve VS Code nebo VS Code Insiders. Tento manuální proces zahrnuje:
1. Otevření terminálu / příkazového řádku
2. Navigaci do požadovaného adresáře
3. Spuštění příkazu `git clone`
4. Otevření VS Code ve zkopírovaném adresáři

**Naše MCP řešení zjednodušuje vše do jediného inteligentního příkazu!**

### **Co postavíte**
**GitHub Clone MCP Server** (`git_mcp_server`), který poskytuje:

| Funkce | Popis | Výhoda |
|---------|-------------|---------|
| 🔄 **Chytré klonování repozitářů** | Klonování GitHub repozitářů s validací | Automatická kontrola chyb |
| 📁 **Inteligentní správa adresářů** | Kontrola a bezpečné vytváření adresářů | Zabraňuje přepsání |
| 🚀 **Multiplatformní integrace VS Code** | Otevírání projektů v VS Code / Insiders | Plynulý přechod ve workflow |
| 🛡️ **Robustní zpracování chyb** | Řešení problémů sítě, oprávnění a cest | Produkčně připravená spolehlivost |

---

## 📖 Podrobná implementace krok za krokem

### Krok 1: Vytvoření GitHub Agenta v Agent Builderu

1. **Spusťte Agent Builder** přes rozšíření Microsoft Foundry Toolkit
2. **Vytvořte nového agenta** s následující konfigurací:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inicializujte vlastní MCP server:**
   - Přejděte do **Nástroje** → **Přidat nástroj** → **MCP Server**
   - Vyberte **„Vytvořit nový MCP Server“**
   - Zvolte **Python šablonu** pro maximální flexibilitu
   - **Název serveru:** `git_mcp_server`

### Krok 2: Nastavení režimu Agenta GitHub Copilot

1. **Otevřete GitHub Copilot** ve VS Code (Ctrl/Cmd + Shift + P → „GitHub Copilot: Open“)
2. **Vyberte model agenta** v rozhraní Copilota
3. **Zvolte model Claude 3.7** pro lepší schopnosti uvažování
4. **Aktivujte integraci MCP** pro přístup k nástrojům

> **💡 Profesionální tip:** Claude 3.7 poskytuje lepší porozumění vývojovým workflow a vzorcům řešení chyb.

### Krok 3: Implementace základní funkčnosti MCP serveru

**Použijte následující podrobný prompt s režimem Agenta GitHub Copilot:**

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

### Krok 4: Testování vašeho MCP serveru

#### 4a. Test v Agent Builderu

1. **Spusťte ladicí konfiguraci** v Agent Builderu
2. **Nakonfigurujte svého agenta tímto systémovým promptem:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testujte pomocí realistických scénářů uživatelů:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/cs/DebugAgent.81d152370c503241.webp)

**Očekávané výsledky:**
- ✅ Úspěšné klonování s potvrzením cesty
- ✅ Automatické spuštění VS Code
- ✅ Jasné chybové hlášky pro neplatné scénáře
- ✅ Správné zacházení s okrajovými případy

#### 4b. Test v MCP Inspectoru


![MCP Inspector Testing](../../../../translated_images/cs/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Gratulujeme!** Úspěšně jste vytvořili praktický, produkčně připravený MCP server, který řeší reálné výzvy vývojových workflow. Váš vlastní GitHub klonovací server demonstruje sílu MCP pro automatizaci a zvyšování produktivity vývojářů.

### 🏆 Odemčené úspěchy:
- ✅ **MCP Vývojář** – Vytvořil vlastní MCP server
- ✅ **Automatizátor workflow** – Zjednodušil vývojové procesy  
- ✅ **Expert na integraci** – Propojil různé vývojové nástroje
- ✅ **Připravený do produkce** – Postavil nasaditelné řešení

---

## 🎓 Dokončení workshopu: Vaše cesta s Model Context Protocol

**Vážený účastníku workshopu,**

Gratulujeme k dokončení všech čtyř modulů workshopu Model Context Protocol! Ušla jste dlouhou cestu od pochopení základů Microsoft Foundry Toolkit až po stavbu produkčně připravených MCP serverů, které řeší skutečné výzvy vývoje.

### 🚀 Přehled vaší vzdělávací cesty:

**[Modul 1](../lab1/README.md)**: Začali jste průzkumem Microsoft Foundry Toolkit, testováním modelů a tvorbou prvního AI agenta.

**[Modul 2](../lab2/README.md)**: Naučili jste se architekturu MCP, integrovali Playwright MCP a vytvořili prvního agenta pro automatizaci prohlížeče.

**[Modul 3](../lab3/README.md)**: Postoupili jste k vývoji vlastních MCP serverů s Weather MCP serverem a zvládli ladicí nástroje.

**[Modul 4](../lab4/README.md)**: Nyní jste vše aplikovali na vytvoření praktického nástroje pro automatizaci pracovního postupu s GitHub repozitáři.

### 🌟 Co jste zvládli:

- ✅ **Ekosystém Microsoft Foundry Toolkit**: Modely, agenti a integrační vzory
- ✅ **Architektura MCP**: Klient-server design, transportní protokoly a bezpečnost
- ✅ **Vývojářské nástroje**: Od Playground přes Inspector až po produkční nasazení
- ✅ **Vlastní vývoj**: Stavba, testování a nasazování vlastních MCP serverů
- ✅ **Praktické aplikace**: Řešení reálných workflow výzev pomocí AI

### 🔮 Vaše další kroky:

1. **Postavte si vlastní MCP server**: Aplikujte tyto znalosti k automatizaci vašich unikátních workflow
2. **Přidejte se ke komunitě MCP**: Sdílejte své výtvory a učte se od ostatních
3. **Prozkoumejte pokročilou integraci**: Propojte MCP servery s podnikovými systémy
4. **Přispějte do open source**: Pomozte vylepšit MCP nástroje a dokumentaci

Pamatujte, že tento workshop je teprve začátek. Ekosystém Model Context Protocol se rychle vyvíjí a nyní jste vybaveni být v popředí AI vývojářských nástrojů.

**Děkujeme za vaši účast a odhodlání se učit!**

Doufáme, že workshop rozproudil nápady, které změní způsob, jakým stavíte a používáte AI nástroje ve vašem vývojovém procesu.

**Přejeme hodně zdaru při kódování!**

---

## Co dál

Gratulujeme k dokončení všech labů v Modulu 10!

- Zpět na: [Přehled Modulu 10](../README.md)
- Pokračujte na: [Modul 11: Praktické laby s MCP serverem](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->