# Používání serveru z rozšíření AI Toolkit pro Visual Studio Code

Když vytváříte AI agenta, nejde jen o generování chytrých odpovědí; jde také o to, aby váš agent měl schopnost podnikat akce. A právě zde přichází na řadu Protokol kontextu modelu (Model Context Protocol, MCP). MCP umožňuje agentům snadný přístup k externím nástrojům a službám jednotným způsobem. Představte si to jako připojení vašeho agenta k sadě nástrojů, kterou *opravdu* může používat.

Řekněme, že propojujete agenta se serverem MCP kalkulačky. Najednou může váš agent provádět matematické operace jen tím, že obdrží požadavek jako „Kolik je 47 krát 89?“—bez potřeby pevné logiky nebo vytváření vlastního API.

## Přehled

Tato lekce pokrývá, jak připojit server MCP kalkulačky k agentovi pomocí rozšíření [AI Toolkit](https://aka.ms/AIToolkit) ve Visual Studio Code, takže agent může provádět matematické operace jako sčítání, odčítání, násobení a dělení v přirozeném jazyce.

AI Toolkit je výkonné rozšíření pro Visual Studio Code, které zjednodušuje vývoj agentů. AI inženýři mohou snadno vytvářet AI aplikace vytvářením a testováním generativních AI modelů—lokálně nebo v cloudu. Rozšíření podporuje většinu hlavních dnes dostupných generativních modelů.

*Poznámka*: AI Toolkit v současné době podporuje Python a TypeScript.

## Cíle učení

Na konci této lekce budete umět:

- Spotřebovat MCP server přes AI Toolkit.
- Nakonfigurovat nastavení agenta, aby mohl objevovat a využívat nástroje poskytované MCP serverem.
- Využívat nástroje MCP přirozeným jazykem.

## Přístup

Toto je náš přístup na vysoké úrovni:

- Vytvořit agenta a definovat jeho systémový prompt.
- Vytvořit MCP server s nástroji kalkulačky.
- Připojit Agent Builder k MCP serveru.
- Otestovat vyvolání nástroje agenta přirozeným jazykem.

Skvěle, nyní když rozumíme postupu, nakonfigurujeme AI agenta tak, aby využíval externí nástroje přes MCP a rozšíříme jeho schopnosti!

## Předpoklady

- [Visual Studio Code](https://code.visualstudio.com/)
- [AI Toolkit for Visual Studio Code](https://aka.ms/AIToolkit)

## Cvičení: Používání serveru

> [!WARNING]
> Poznámka pro uživatele macOS. V současné době vyšetřujeme problém, který ovlivňuje instalaci závislostí na macOS. Kvůli tomu uživatelé macOS nyní nebudou moci dokončit tento tutoriál. Pokyny aktualizujeme, jakmile bude k dispozici oprava. Děkujeme za vaši trpělivost a pochopení!

V tomto cvičení si vytvoříte, spustíte a vylepšíte AI agenta s nástroji ze serveru MCP přímo ve Visual Studio Code pomocí AI Toolkit.

### -0- Předsázení: přidání modelu OpenAI GPT-4o do My Models

Cvičení využívá model **GPT-4o**. Model byste měli přidat do sekce **My Models** ještě před vytvořením agenta.

![Snímek rozhraní výběru modelu v rozšíření AI Toolkit pro Visual Studio Code. Nadpis zní "Najděte ten správný model pro vaše AI řešení" s podnadpisem vybízejícím uživatele, aby objevovali, testovali a nasazovali AI modely. Pod tím v sekci „Populární modely“ je zobrazeno šest karet modelů: DeepSeek-R1 (hostováno na GitHubu), OpenAI GPT-4o, OpenAI GPT-4.1, OpenAI o1, Phi 4 Mini (CPU - Malý, Rychlý), a DeepSeek-R1 (hostováno na Ollama). Každá karta obsahuje možnosti „Přidat“ model nebo „Vyzkoušet v Playground“.](../../../../translated_images/cs/aitk-model-catalog.2acd38953bb9c119.webp)

1. Otevřete rozšíření **AI Toolkit** z **Activity Bar**.
1. V sekci **Catalog** vyberte **Models** pro otevření **Model Catalog**. Výběr **Models** otevře **Model Catalog** v nové záložce editoru.
1. Do vyhledávacího pole **Model Catalog** zadejte **OpenAI GPT-4o**.
1. Klikněte na **+ Přidat** pro přidání modelu do vašeho seznamu **My Models**. Ujistěte se, že vybraný model je **hostovaný na GitHubu**.
1. V **Activity Bar** potvrďte, že model **OpenAI GPT-4o** je v seznamu.

### -1- Vytvoření agenta

**Agent (Prompt) Builder** vám umožní vytvořit a přizpůsobit vlastní AI agenty. V této části vytvoříte nového agenta a nastavíte model, který bude pohánět konverzaci.

![Snímek rozhraní builderu „Calculator Agent“ v rozšíření AI Toolkit pro Visual Studio Code. V levém panelu je vybraný model „OpenAI GPT-4o (přes GitHub).“ Systémový prompt říká „Jste profesor na univerzitě, který vyučuje matematiku,“ a uživatelský prompt říká „Vysvětli mi Fourierovu rovnici jednoduše.“ Další možnosti zahrnují tlačítka pro přidání nástrojů, povolení MCP serveru a výběr strukturovaného výstupu. Ve spodní části modrý tlačítko „Spustit“. V pravém panelu jsou pod záložkou „Začínáme s příklady“ tři ukázkoví agenti: Web Developer (s MCP Serverem, zjednodušovačem pro druhou třídu a tlumočníkem snů, každý s krátkým popisem funkcí).](../../../../translated_images/cs/aitk-agent-builder.901e3a2960c3e477.webp)

1. Otevřete rozšíření **AI Toolkit** z **Activity Bar**.
1. V sekci **Tools** vyberte **Agent (Prompt) Builder**. Výběr otevře **Agent (Prompt) Builder** v nové záložce editoru.
1. Klikněte na tlačítko **+ Nový agent**. Rozšíření spustí průvodce nastavením přes **Command Palette**.
1. Zadejte název **Calculator Agent** a stiskněte **Enter**.
1. V **Agent (Prompt) Builder**, u pole **Model** vyberte model **OpenAI GPT-4o (přes GitHub)**.

### -2- Vytvoření systémového promptu pro agenta

Po založení agenta je čas definovat jeho osobnost a účel. V této části použijete funkci **Generovat systémový prompt** k popisu zamýšleného chování agenta—v tomto případě kalkulačního agenta—a model pro vás napíše systémový prompt.

![Snímek rozhraní „Calculator Agent“ v AI Toolkit pro Visual Studio Code se zobrazeným modálním oknem s názvem „Vygenerovat prompt.“ Modál vysvětluje, že lze vygenerovat šablonu promptu sdílením základních informací, a obsahuje textové pole s ukázkovým systémovým promptem: „Jste užitečný a efektivní matematický asistent. Při zadání problému s základní aritmetikou odpovídáte správným výsledkem.“ Pod textovým polem jsou tlačítka „Zavřít“ a „Vygenerovat“. V pozadí je vidět část konfigurace agenta včetně vybraného modelu „OpenAI GPT-4o (přes GitHub)“ a polí pro systémový a uživatelský prompt.](../../../../translated_images/cs/aitk-generate-prompt.ba9e69d3d2bbe2a2.webp)

1. V sekci **Prompts** klikněte na tlačítko **Generovat systémový prompt**. Toto tlačítko otevře tvůrce promptu, který využívá AI pro generování systémového promptu pro agenta.
1. V okně **Generovat prompt** zadejte toto: `Jste užitečný a efektivní matematický asistent. Při zadání problému s základní aritmetikou odpovídáte správným výsledkem.`
1. Klikněte na tlačítko **Generovat**. V pravém dolním rohu se objeví oznámení potvrzující, že systémový prompt je generován. Po dokončení generování se prompt zobrazí v poli **Systémový prompt** v **Agent (Prompt) Builderu**.
1. Zkontrolujte systémový prompt a případně jej upravte.

### -3- Vytvoření MCP serveru

Nyní, když jste definovali systémový prompt agenta—který řídí jeho chování a odpovědi—je čas agenta vybavit praktickými schopnostmi. V této části vytvoříte MCP server kalkulačky s nástroji pro provádění sčítání, odčítání, násobení a dělení. Tento server umožní vašemu agentovi provádět matematické operace v reálném čase na základě přirozeně formulovaných požadavků.

![Snímek dolní části rozhraní Calculator Agent v rozšíření AI Toolkit pro Visual Studio Code. Zobrazuje rozbalitelné menu „Nástroje“ a „Strukturovaný výstup“, včetně rozevíracího menu „Vyberte formát výstupu“ nastaveného na „text.“ Vpravo je tlačítko „+ MCP Server“ pro přidání serveru pro Model Context Protocol. Nad sekcí Nástroje je zástupný obrázek ikony.](../../../../translated_images/cs/aitk-add-mcp-server.9742cfddfe808353.webp)

AI Toolkit je vybaven šablonami, které usnadňují vytváření vlastních MCP serverů. Budeme používat Python šablonu pro vytvoření kalkulačního MCP serveru.

*Poznámka*: AI Toolkit v současné době podporuje Python a TypeScript.

1. V sekci **Nástroje** v **Agent (Prompt) Builderu** klikněte na tlačítko **+ MCP Server**. Rozšíření spustí průvodce nastavením přes **Command Palette**.
1. Vyberte **+ Přidat server**.
1. Vyberte **Vytvořit nový MCP server**.
1. Zvolte šablonu **python-weather**.
1. Zvolte **Výchozí složku** pro uložení šablony MCP serveru.
1. Zadejte jako název serveru: **Calculator**
1. Otevře se nové okno Visual Studio Code. Vyberte **Ano, důvěřuji autorům**.
1. V terminálu (**Terminál** > **Nový terminál**) vytvořte virtuální prostředí pomocí příkazu: `python -m venv .venv`
1. V terminálu aktivujte virtuální prostředí:
    1. Windows - `.venv\Scripts\activate`
    1. macOS/Linux - `source .venv/bin/activate`
1. V terminálu nainstalujte závislosti příkazem: `pip install -e .[dev]`
1. V zobrazení **Explorer** v **Activity Bar** rozbalte složku **src** a vyberte soubor **server.py** pro otevření v editoru.
1. Nahraďte kód v souboru **server.py** následujícím a soubor uložte:

    ```python
    """
    Sample MCP Calculator Server implementation in Python.

    
    This module demonstrates how to create a simple MCP server with calculator tools
    that can perform basic arithmetic operations (add, subtract, multiply, divide).
    """
    
    from mcp.server.fastmcp import FastMCP
    
    server = FastMCP("calculator")
    
    @server.tool()
    def add(a: float, b: float) -> float:
        """Add two numbers together and return the result."""
        return a + b
    
    @server.tool()
    def subtract(a: float, b: float) -> float:
        """Subtract b from a and return the result."""
        return a - b
    
    @server.tool()
    def multiply(a: float, b: float) -> float:
        """Multiply two numbers together and return the result."""
        return a * b
    
    @server.tool()
    def divide(a: float, b: float) -> float:
        """
        Divide a by b and return the result.
        
        Raises:
            ValueError: If b is zero
        """
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b
    ```

### -4- Spuštění agenta s MCP serverem kalkulačky

Nyní, když má váš agent nástroje, je čas je použít! V této části odešlete agentovi požadavky, abyste otestovali a ověřili, zda agent využívá vhodný nástroj z MCP serveru kalkulačky.

![Screenshot rozhraní Calculator Agent v AI Toolkit pro Visual Studio Code. Na levém panelu je pod „Nástroji“ přidán MCP server nazvaný local-server-calculator_server, zobrazující čtyři dostupné nástroje: sčítat, odečítat, násobit a dělit. Odznak ukazuje, že čtyři nástroje jsou aktivní. Pod tím je sbalená sekce „Strukturovaný výstup“ a modré tlačítko „Spustit“. Pravý panel ukazuje v „Odpovědi modelu“, že agent vyvolal nástroje násobit a odečíst s vstupy {"a": 3, "b": 25} a {"a": 75, "b": 20}. Konečná „Odpověď nástroje“ je 75,0. Ve spodní části je tlačítko „Zobrazit kód“.](../../../../translated_images/cs/aitk-agent-response-with-tools.e7c781869dc8041a.webp)

MCP server kalkulačky spustíte na svém lokálním vývojovém počítači přes **Agent Builder** jako klient MCP.

1. Stiskněte `F5` pro spuštění ladění MCP serveru. **Agent (Prompt) Builder** se otevře v nové záložce editoru. Stav serveru je viditelný v terminálu.
1. Do pole **User prompt** v **Agent (Prompt) Builderu** zadejte prompt: `Koupil jsem 3 položky za 25 dolarů každá a pak jsem použil slevu 20 dolarů. Kolik jsem zaplatil?`
1. Klikněte na tlačítko **Spustit** pro vygenerování odpovědi agenta.
1. Prohlédněte si výstup agenta. Model by měl dojít k závěru, že jste zaplatili **55 dolarů**.
1. Zde je rozpis, co by mělo proběhnout:
    - Agent vybere nástroje **multiply** a **subtract** pro pomoc s výpočtem.
    - Pro nástroj **multiply** jsou přiřazeny hodnoty `a` a `b`.
    - Pro nástroj **subtract** jsou přiřazeny hodnoty `a` a `b`.
    - Odpověď každého nástroje je zobrazena v příslušné **Odpovědi nástroje**.
    - Konečný výstup modelu je zobrazen v konečné **Odpovědi modelu**.
1. Odešlete další prompt pro další testování agenta. Můžete upravit existující prompt v poli **User prompt** kliknutím do pole a přepsáním existujícího textu.
1. Až dokončíte testování agenta, můžete server zastavit přes **terminál** zadáním **CTRL/CMD+C** pro ukončení.

## Zadání

Zkuste přidat další nástroj do souboru **server.py** (například: vrátit druhou odmocninu čísla). Odešlete další požadavky, které budou vyžadovat využití vašeho nového (nebo existujících) nástroje. Nezapomeňte restartovat server, aby se nové nástroje načetly.

## Řešení

[Řešení](./solution/README.md)

## Klíčové poznatky

Klíčové poznatky z této kapitoly jsou následující:

- Rozšíření AI Toolkit je skvělý klient, který umožňuje využívat MCP servery a jejich nástroje.
- Můžete přidávat nové nástroje do MCP serverů, čímž rozšiřujete schopnosti agenta podle vyvíjejících se požadavků.
- AI Toolkit obsahuje šablony (například Python šablony MCP serverů) pro zjednodušení vytváření vlastních nástrojů.

## Další zdroje

- [Dokumentace k AI Toolkit](https://aka.ms/AIToolkit/doc)

## Co bude dál
- Dále: [Testování a ladění](../08-testing/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->