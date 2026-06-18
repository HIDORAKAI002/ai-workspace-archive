# Scénář 3: Dokumentace v editoru s MCP serverem ve VS Code

## Přehled

V tomto scénáři se naučíte, jak přenést Microsoft Learn Docs přímo do vašeho prostředí Visual Studio Code pomocí MCP serveru. Místo neustálého přepínání záložek v prohlížeči pro hledání dokumentace můžete získat přístup, vyhledávat a odkazovat na oficiální dokumentaci přímo uvnitř svého editoru. Tento přístup zefektivňuje váš pracovní postup, udržuje vás soustředěné a umožňuje bezproblémovou integraci s nástroji, jako je GitHub Copilot.

- Vyhledávejte a čtěte dokumentaci ve VS Code bez opuštění kódovacího prostředí.
- Odkazujte na dokumentaci a vkládejte odkazy přímo do vašeho README nebo učebních souborů.
- Používejte GitHub Copilot a MCP společně pro bezproblémový workflow dokumentace podporovaný AI.

## Výukové cíle

Na konci této kapitoly budete rozumět tomu, jak nastavit a používat MCP server ve VS Code pro zlepšení vašeho pracovního postupu při dokumentaci a vývoji. Budete schopni:

- Nakonfigurovat své pracovní prostředí pro použití MCP serveru pro vyhledávání dokumentace.
- Vyhledávat a vkládat dokumentaci přímo z VS Code.
- Kombinovat sílu GitHub Copilot a MCP pro produktivnější workflow rozšířený o AI.

Tyto dovednosti vám pomohou zůstat soustředění, zlepšit kvalitu dokumentace a zvýšit vaši produktivitu jako vývojáře nebo technického spisovatele.

## Řešení

Pro dosažení přístupu k dokumentaci přímo v editoru budete postupovat podle řady kroků, které integrují MCP server s VS Code a GitHub Copilot. Toto řešení je ideální pro autory kurzů, dokumentační spisovatele a vývojáře, kteří chtějí zůstat soustředění v editoru při práci s dokumentací a Copilotem.

- Rychle přidávejte odkazy na README při psaní kurzové nebo projektové dokumentace.
- Používejte Copilot k generování kódu a MCP k okamžitému nalezení a citování relevantní dokumentace.
- Zůstaňte soustředění ve svém editoru a zvyšte produktivitu.

### Krok za krokem

Pro začátek postupujte podle těchto kroků. Ke každému kroku můžete přidat snímek obrazovky z adresáře assets pro vizuální znázornění procesu.

1. **Přidejte konfiguraci MCP:**
   Ve kořenovém adresáři projektu vytvořte soubor `.vscode/mcp.json` a přidejte následující konfiguraci:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Tato konfigurace říká VS Code, jak se připojit k [`Microsoft Learn Docs MCP serveru`](https://github.com/MicrosoftDocs/mcp).
   
   ![Krok 1: Přidejte mcp.json do složky .vscode](../../../../../../translated_images/cs/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Otevřete panel GitHub Copilot Chat:**
   Pokud nemáte rozšíření GitHub Copilot nainstalované, přejděte do zobrazení Rozšíření ve VS Code a nainstalujte ho. Můžete si ho stáhnout přímo z [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Poté otevřete panel Copilot Chat z bočního panelu.

   ![Krok 2: Otevřete panel Copilot Chat](../../../../../../translated_images/cs/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Povolte režim agenta a ověřte nástroje:**
   V panelu Copilot Chat povolte režim agenta.

   ![Krok 3: Povolte režim agenta a ověřte nástroje](../../../../../../translated_images/cs/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Po povolení režimu agenta ověřte, že je MCP server uveden jako jeden z dostupných nástrojů. To zajišťuje, že agent Copilot má přístup k dokumentačnímu serveru pro získávání relevantních informací.
   
   ![Krok 3: Ověřte nástroj MCP server](../../../../../../translated_images/cs/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Spusťte nový rozhovor a vyzvěte agenta:**
   Otevřete nový rozhovor v panelu Copilot Chat. Nyní můžete agenta vyzvat se svými dotazy ohledně dokumentace. Agent použije MCP server k získání a zobrazení relevantní dokumentace Microsoft Learn přímo ve vašem editoru.

   - *„Snažím se napsat studijní plán pro téma X. Budu se mu věnovat 8 týdnů, pro každý týden navrhni obsah, který bych měl probrat.“*

   ![Krok 4: Vyzvěte agenta v chatu](../../../../../../translated_images/cs/step4-prompt-chat.12187bb001605efc.webp)

5. **Živé dotazy:**

   > Vezměme si živý dotaz ze sekce [#get-help](https://discord.gg/D6cRhjHWSC) v Microsoft Foundry Discordu ([zobrazit původní zprávu](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *„Hledám odpovědi na to, jak nasadit řešení s více agenty pomocí AI agentů vyvinutých na Azure AI Foundry. Vidím, že neexistuje přímá metoda nasazení, jako jsou kanály Copilot Studio. Jaké jsou tedy různé způsoby, jak toto nasazení provést pro podnikové uživatele, aby mohli interagovat a splnit úkol?
Existuje mnoho článků/blogů, které říkají, že můžeme použít službu Azure Bot k této práci, která může fungovat jako most mezi MS Teams a Azure AI Foundry Agents. Bude to fungovat, pokud nastavím Azure bota, který se připojuje k Orchestrator Agentovi na Azure AI Foundry prostřednictvím Azure funkcí pro orchestraci, nebo potřebuji vytvořit Azure funkci pro každého AI agenta součást víceagentového řešení pro orchestraci v rámci Bot frameworku? Jakékoliv další návrhy jsou vítány.“*

   ![Krok 5: Živé dotazy](../../../../../../translated_images/cs/step5-live-queries.49db3e4a50bea273.webp)

   Agent odpoví s relevantními odkazy na dokumentaci a shrnutími, které můžete přímo vložit do svých markdown souborů nebo použít jako reference ve svém kódu.
   
### Ukázkové dotazy

Zde je několik příkladů dotazů, které můžete vyzkoušet. Tyto dotazy ukážou, jak MCP server a Copilot mohou spolupracovat a poskytovat okamžitou, kontextově podloženou dokumentaci a odkazy bez opuštění VS Code:

- „Ukáž mi, jak používat spouštěče Azure Functions.“
- „Vlož odkaz na oficiální dokumentaci Azure Key Vault.“
- „Jaké jsou nejlepší postupy pro zabezpečení Azure zdrojů?“
- „Najdi rychlý start pro Azure AI služby.“

Tyto dotazy ukážou, jak MCP server a Copilot mohou spolupracovat a poskytovat okamžitou, kontextově podloženou dokumentaci a odkazy bez opuštění VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->