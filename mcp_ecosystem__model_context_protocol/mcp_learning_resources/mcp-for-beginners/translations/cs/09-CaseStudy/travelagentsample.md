# Případová studie: Azure AI Travel Agents – Referenční implementace

## Přehled

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) je komplexní referenční řešení vyvinuté společností Microsoft, které demonstruje, jak postavit aplikaci pro plánování cest založenou na více agentech a umělé inteligenci pomocí Model Context Protocol (MCP), Azure OpenAI a Azure AI Search. Tento projekt ukazuje osvědčené postupy pro orchestraci více AI agentů, integraci podnikových dat a poskytování zabezpečené, rozšiřitelné platformy pro reálné scénáře.

## Klíčové vlastnosti
- **Orchestrace více agentů:** Využívá MCP k koordinaci specializovaných agentů (např. agentů na letecké spojení, hotely a itineráře), kteří spolupracují na plnění složitých úkolů cestovního plánování.
- **Integrace podnikových dat:** Připojuje se k Azure AI Search a dalším podnikových datovým zdrojům, aby poskytl aktuální a relevantní informace pro cestovní doporučení.
- **Zabezpečená a škálovatelná architektura:** Využívá služby Azure pro autentizaci, autorizaci a škálovatelné nasazení podle nejlepších bezpečnostních postupů pro podniky.
- **Rozšiřitelné nástroje:** Implementuje znovupoužitelné MCP nástroje a šablony promptů, umožňující rychlou adaptaci na nové oblasti či obchodní požadavky.
- **Uživatelská zkušenost:** Poskytuje konverzační rozhraní pro uživatele k interakci s cestovními agenty, poháněné Azure OpenAI a MCP.

## Architektura
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Popis architektonického diagramu

Řešení Azure AI Travel Agents je navrženo s ohledem na modularitu, škálovatelnost a zabezpečenou integraci více AI agentů a podnikových datových zdrojů. Hlavní komponenty a tok dat jsou následující:

- **Uživatelské rozhraní:** Uživatelé komunikují se systémem prostřednictvím konverzačního uživatelského rozhraní (např. webový chat nebo Teams bot), které odesílá uživatelské dotazy a přijímá cestovní doporučení.
- **MCP Server:** Slouží jako ústřední orchestrátor, přijímá vstupy od uživatele, spravuje kontext a koordinuje činnost specializovaných agentů (např. FlightAgent, HotelAgent, ItineraryAgent) pomocí Model Context Protocol.
- **AI agenti:** Každý agent je zodpovědný za konkrétní doménu (lety, hotely, itineráře) a je implementován jako MCP nástroj. Agent používají šablony promptů a logiku k zpracování požadavků a generování odpovědí.
- **Azure OpenAI služba:** Poskytuje pokročilé porozumění a generování přirozeného jazyka, které umožňuje agentům interpretovat uživatelský záměr a vytvářet konverzační odpovědi.
- **Azure AI Search a podniková data:** Agentům umožňuje dotazovat se na Azure AI Search a další podnikové zdroje dat pro získání aktuálních informací o letech, hotelech a možnostech cestování.
- **Autentizace a zabezpečení:** Integrace s Microsoft Entra ID pro bezpečnou autentizaci a uplatnění principu nejmenšího oprávnění ke všem zdrojům.
- **Nasazení:** Navrženo k nasazení na Azure Container Apps, což zajišťuje škálovatelnost, monitoring a provozní efektivitu.

Tato architektura umožňuje hladkou orchestraci více AI agentů, zabezpečenou integraci podnikovými daty a robustní, rozšiřitelnou platformu pro budování doménově specifických AI řešení.

## Krok za krokem vysvětlení architektonického diagramu
Představte si, že plánujete velkou cestu a máte tým odborných asistentů, kteří vám pomáhají s každým detailem. Systém Azure AI Travel Agents funguje podobně, používá různé části (jako členy týmu), z nichž každý má svou specializovanou roli. Takto to všechno zapadá dohromady:

### Uživatelské rozhraní (UI):
Představte si to jako recepci vašeho cestovního agenta. Je to místo, kde ptáte na otázky nebo podáváte žádosti, například „Najdi mi let do Paříže.“ Může to být chatové okno na webu nebo v aplikaci pro zasílání zpráv.

### MCP Server (Koordinátor):
MCP Server je jako manažer, který naslouchá vašemu požadavku na recepci a rozhoduje, který specialista má každou část řešit. Sleduje vaši konverzaci a zajišťuje, že vše probíhá hladce.

### AI agenti (specialisté-asistenti):
Každý agent je odborníkem na určitou oblast – jeden zná vše o letech, další o hotelech a další o plánování itineráře. Když požádáte o cestu, MCP Server pošle váš požadavek správnému agentovi nebo agentům. Ti využívají své znalosti a nástroje, aby pro vás našli nejlepší možnosti.

### Azure OpenAI služba (jazykový expert):
Je to jako mít jazykového experta, který přesně rozumí, co říkáte, bez ohledu na to, jak to formulujete. Pomáhá agentům pochopit vaše požadavky a odpovídat přirozeným, konverzačním jazykem.

### Azure AI Search a podniková data (informační knihovna):
Představte si obrovskou, aktuální knihovnu se všemi nejnovějšími informacemi o cestování – jízdní řády letů, dostupnost hotelů a další. Agent hledá v této knihovně, aby získal co nejpřesnější odpovědi.

### Autentizace a zabezpečení (ochranka):
Stejně jako ochranka kontroluje, kdo může vstoupit do určitých oblastí, tato část zajišťuje, aby měli přístup pouze oprávnění lidé a agenti k citlivým informacím. Chrání vaše data a soukromí.

### Nasazení na Azure Container Apps (budova):
Všichni tito asistenti a nástroje pracují společně uvnitř bezpečné, škálovatelné budovy (cloudu). To znamená, že systém může obsloužit mnoho uživatelů současně a je vždy k dispozici, když ho potřebujete.

## Jak to všechno funguje společně:

Začnete položením otázky na recepci (UI).
Manažer (MCP Server) zjistí, který specialista (agent) vám má pomoci.
Specialista využije jazykového experta (OpenAI), aby pochopil váš požadavek, a knihovnu (AI Search), aby našel nejlepší odpověď.
Ochranka (Autentizace) zajistí, že vše je bezpečné.
To vše se děje v spolehlivé, škálovatelné budově (Azure Container Apps), takže je vaše zkušenost plynulá a bezpečná.
Tato týmová práce umožňuje systému rychle a bezpečně vám pomoci s plánováním cesty, stejně jako tým zkušených cestovních agentů pracujících společně v moderní kanceláři!

## Technická implementace
- **MCP Server:** Hostuje hlavní logiku orchestrace, vystavuje nástroje agentů a spravuje kontext pro víceetapové pracovní postupy cestovního plánování.
- **Agenti:** Každý agent (např. FlightAgent, HotelAgent) je implementován jako MCP nástroj se svými vlastními šablonami promptů a logikou.
- **Azure integrace:** Používá Azure OpenAI pro porozumění přirozenému jazyku a Azure AI Search pro získávání dat.
- **Zabezpečení:** Integruje se s Microsoft Entra ID pro autentizaci a uplatňuje přístupová práva s principem nejmenšího oprávnění ke všem zdrojům.
- **Nasazení:** Podporuje nasazení do Azure Container Apps pro škálovatelnost a provozní efektivitu.

## Výsledky a dopad
- Ukazuje, jak lze MCP použít k orchestraci více AI agentů v reálném, produkčním scénáři.
- Urychluje vývoj řešení díky poskytování znovupoužitelných vzorů pro koordinaci agentů, integraci dat a bezpečné nasazení.
- Slouží jako vzor pro vytváření doménově specifických aplikací poháněných AI pomocí MCP a služeb Azure.

## Reference
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Co dál

- Zpět na: [Přehled případových studií](./README.md)
- Další: [Aktualizace ADO položek z YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:
Tento dokument byl přeložen za použití AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Ačkoliv usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho původním jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoliv nedorozumění nebo mylné výklady vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->