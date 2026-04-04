# Případová studie: Zpřístupnění REST API v API Management jako MCP server

Azure API Management je služba, která poskytuje bránu nad vašimi API koncovými body. Funguje tak, že Azure API Management působí jako proxy před vašimi API a může rozhodovat, co dělat s příchozími požadavky.

Použitím této služby přidáte celou řadu funkcí, jako jsou:

- **Bezpečnost**, můžete použít vše od API klíčů, JWT až po spravovanou identitu.
- **Omezení rychlosti**, skvělá funkce umožňující rozhodnout, kolik volání projde za určitou jednotku času. To pomáhá zajistit všem uživatelům skvělý zážitek a také tomu, že váš servis nebude přetížen požadavky.
- **Škálování a vyvažování zátěže**. Můžete nastavit několik koncových bodů pro vyvážení zátěže a také určovat, jakým způsobem „vyvažovat zátěž“.
- **AI funkce jako sémantické cachování**, limit tokenů a monitorování tokenů a další. Toto jsou skvělé funkce, které zlepšují odezvu a zároveň pomáhají mít přehled o spotřebě tokenů. [Více informací zde](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities). 

## Proč MCP + Azure API Management?

Model Context Protocol se rychle stává standardem pro agentní AI aplikace a způsob, jak zpřístupnit nástroje a data konzistentním způsobem. Azure API Management je přirozenou volbou, když potřebujete „spravovat“ API. MCP Servery se často integrují s dalšími API, aby například vyřešily požadavky na nástroje. Kombinace Azure API Management a MCP proto dává velký smysl.

## Přehled

V tomto specifickém případě se naučíme zpřístupnit API koncové body jako MCP Server. Tímto způsobem můžeme snadno začlenit tyto koncové body do agentní aplikace a zároveň využívat funkce Azure API Management.

## Klíčové funkce

- Vyberete metody koncových bodů, které chcete zpřístupnit jako nástroje.
- Další funkce, které získáte, závisí na tom, co nakonfigurujete v části policy pro vaše API. Zde ukážeme, jak přidat omezení rychlosti.

## Předkrok: import API

Pokud již máte API v Azure API Management, můžete tento krok přeskočit. Pokud ne, podívejte se na tento odkaz, [import API do Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Zpřístupnění API jako MCP Server

Pro zpřístupnění API koncových bodů postupujte podle těchto kroků:

1. Přejděte do Azure Portal na adresu <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Přejděte ke své instanci API Management.

1. V levém menu vyberte APIs > MCP Servers > + Vytvořit nový MCP Server.

1. V položce API vyberte REST API, které chcete zpřístupnit jako MCP server.

1. Vyberte jednu nebo více operací API, které chcete zpřístupnit jako nástroje. Můžete vybrat všechny operace nebo jen vybrané.

    ![Vyberte metody k zpřístupnění](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Vyberte **Create** (Vytvořit).

1. Přejděte do nabídky **APIs** a **MCP Servers**, měli byste vidět následující:

    ![Zobrazení MCP Serveru v hlavním panelu](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP server je vytvořen a operace API jsou zpřístupněny jako nástroje. MCP server je zobrazen v nabídce MCP Servers. Sloupec URL ukazuje koncový bod MCP serveru, který můžete volat pro testování nebo v klientské aplikaci.

## Volitelné: Konfigurace politik

Azure API Management má základní koncept politik, kde nastavujete různá pravidla pro své koncové body, například omezení rychlosti nebo sémantické cachování. Tyto politiky se vytvářejí v XML.

Zde je postup, jak nastavit politiku pro omezení rychlosti vašeho MCP Serveru:

1. V portálu, pod APIs vyberte **MCP Servers**.

1. Zvolte MCP server, který jste vytvořili.

1. V levém menu, pod MCP, vyberte **Policies** (Politiky).

1. V editoru politik přidejte nebo upravte politiky, které chcete aplikovat na nástroje MCP serveru. Politiky jsou definovány ve formátu XML. Například můžete přidat politiku omezení volání na nástroje MCP serveru (v tomto příkladu 5 volání za 30 sekund na IP adresu klienta). Toto XML způsobí omezení rychlosti:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Zde je obrázek editoru politik:

    ![Editor politik](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Vyzkoušejte to

Ujistíme se, že náš MCP Server funguje podle očekávání.

K tomu použijeme Visual Studio Code a GitHub Copilot v režimu Agenta. Přidáme MCP server do souboru *mcp.json*. Tím Visual Studio Code bude fungovat jako klient s agentními schopnostmi a koncoví uživatelé budou moci psát prompt a komunikovat s tímto serverem.

Podívejme se, jak přidat MCP server do Visual Studio Code:

1. Použijte příkaz MCP: **Add Server z nabídky příkazů**.

1. Po výzvě vyberte typ serveru: **HTTP (HTTP nebo Server Sent Events)**.

1. Zadejte URL MCP serveru v API Management. Příklad: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (pro SSE endpoint) nebo **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (pro MCP endpoint), všimněte si rozdílu v přenosech je `/sse` nebo `/mcp`.

1. Zadejte ID serveru podle vlastního výběru. Není to důležitá hodnota, ale pomůže vám si zapamatovat, o jakou instanci serveru se jedná.

1. Vyberte, zda uložit konfiguraci do nastavení pracovního prostoru nebo uživatelských nastavení.

  - **Nastavení pracovního prostoru** - Konfigurace serveru je uložena pouze v souboru .vscode/mcp.json dostupném v aktuálním pracovním prostoru.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    nebo pokud zvolíte streamovací HTTP jako přenos, bude to trochu jiné:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Uživatelská nastavení** - Konfigurace serveru je přidána do globálního souboru *settings.json* a je dostupná ve všech pracovních prostorech. Konfigurace vypadá přibližně takto:

    ![Uživatelské nastavení](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Také je potřeba přidat konfiguraci, hlavičku k správné autentizaci vůči Azure API Management. Používá hlavičku s názvem **Ocp-Apim-Subscription-Key**. 

    - Zde je návod, jak ji přidat do nastavení:

    ![Přidání hlavičky pro autentizaci](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), což způsobí zobrazení výzvy k zadání hodnoty API klíče, kterou najdete v Azure portálu pro vaši instanci Azure API Management.

   - Pro přidání přímo do *mcp.json* ji můžete přidat takto:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Použití režimu Agenta

Nyní jsme vše nastavili buď v nastavení, nebo v *.vscode/mcp.json*. Zkusme to.

Měla by se zobrazit ikona Nástroje, kde jsou vyjmenovány nástroje zpřístupněné vaším serverem:

![Nástroje ze serveru](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klikněte na ikonu nástrojů a uvidíte seznam nástrojů:

    ![Nástroje](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Zadejte prompt do chatu pro zavolání nástroje. Například, pokud jste vybrali nástroj pro získání informací o objednávce, můžete se agenta zeptat na objednávku. Zde je příklad promptu:

    ```text
    get information from order 2
    ```

    Nyní se vám zobrazí ikona nástroje s výzvou pokračovat ve volání nástroje. Zvolte pokračování a nyní uvidíte výstup jako na obrázku:

    ![Výsledek promptu](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **to, co vidíte výše, závisí na tom, jaké nástroje jste nastavili, ale podstata je, že obdržíte textovou odpověď, jak je výše uvedeno**


## Reference

Zde se můžete dozvědět více:

- [Návod na Azure API Management a MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python příklad: Zabezpečení vzdálených MCP serverů pomocí Azure API Management (experimentální)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP klient autorizace lab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Použijte rozšíření Azure API Management pro VS Code k importu a správě API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registrace a objevování vzdálených MCP serverů v Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Skvělé repozitář, který ukazuje mnoho AI schopností s Azure API Management
- [AI Gateway workshopy](https://azure-samples.github.io/AI-Gateway/) Obsahuje workshopy využívající Azure Portal, což je skvělý způsob, jak začít hodnotit AI schopnosti.

## Co dál

- Zpět na: [Přehled případových studií](./README.md)
- Dále: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). I když usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho původním jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědni za jakékoliv nedorozumění nebo mylné výklady vzniklé z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->