[![Prozkoumání rámců AI agentů](../../../translated_images/cs/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Klikněte na obrázek výše pro zobrazení videa této lekce)_

# Prozkoumejte rámce AI agentů

Rámce AI agentů jsou softwarové platformy navržené pro zjednodušení tvorby, nasazení a správy AI agentů. Tyto rámce poskytují vývojářům předpřipravené komponenty, abstrakce a nástroje, které zefektivňují vývoj složitých AI systémů.

Tyto rámce pomáhají vývojářům soustředit se na jedinečné aspekty jejich aplikací tím, že poskytují standardizované přístupy k běžným výzvám ve vývoji AI agentů. Posilují škálovatelnost, dostupnost a efektivitu při tvorbě AI systémů.

## Úvod

Tato lekce bude pokrývat:

- Co jsou rámce AI agentů a co umožňují vývojářům dosáhnout?
- Jak mohou týmy rychle prototypovat, iterovat a zlepšovat schopnosti svých agentů?
- Jaké jsou rozdíly mezi rámci a nástroji vytvořenými Microsoftem (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> a <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Mohu integrovat mé stávající nástroje Azure ekosystému přímo, nebo potřebuji samostatná řešení?
- Co je Microsoft Foundry Agent Service a jak mi pomáhá?

## Cíle učení

Cílem této lekce je vám pomoci porozumět:

- Úloze rámců AI agentů ve vývoji AI.
- Jak využít rámce AI agentů k tvorbě inteligentních agentů.
- Klíčovým schopnostem umožněným rámci AI agentů.
- Rozdílům mezi Microsoft Agent Framework a Microsoft Foundry Agent Service.

## Co jsou rámce AI agentů a co umožňují vývojářům dělat?

Tradiční AI rámce vám pomohou integrovat AI do vašich aplikací a vylepšit je následujícími způsoby:

- **Personalizace**: AI může analyzovat chování a preference uživatelů a poskytovat personalizovaná doporučení, obsah a zážitky.
Příklad: Streamingové služby jako Netflix využívají AI k navrhování filmů a pořadů podle historie sledování, což zvyšuje angažovanost a spokojenost uživatelů.
- **Automatizace a efektivita**: AI může automatizovat opakující se úkoly, zjednodušovat pracovní postupy a zlepšovat provozní efektivitu.
Příklad: Aplikace zákaznické podpory využívají AI chatboty k vyřizování běžných dotazů, což zkracuje dobu odezvy a uvolňuje lidské agenty pro složitější záležitosti.
- **Vylepšený uživatelský zážitek**: AI může zlepšit celkový uživatelský zážitek tím, že nabízí inteligentní funkce jako rozpoznávání hlasu, zpracování přirozeného jazyka a prediktivní text.
Příklad: Virtuální asistenti jako Siri a Google Assistant používají AI k porozumění a odpovídání na hlasové příkazy, což usnadňuje uživatelům komunikaci s jejich zařízeními.

### To zní skvěle, ale proč tedy potřebujeme rámec AI agentů?

Rámce AI agentů představují něco více než jen AI rámce. Jsou navrženy k umožnění tvorby inteligentních agentů, kteří mohou komunikovat s uživateli, jinými agenty a prostředím, aby dosáhli specifických cílů. Tito agenti mohou vykazovat autonomní chování, přijímat rozhodnutí a přizpůsobovat se měnícím se podmínkám. Podívejme se na klíčové schopnosti umožněné rámci AI agentů:

- **Spolupráce a koordinace agentů**: Umožňují vytváření více AI agentů, kteří mohou spolupracovat, komunikovat a koordinovat se k řešení složitých úkolů.
- **Automatizace a správa úkolů**: Poskytují mechanismy pro automatizaci vícestupňových pracovních postupů, delegaci úkolů a dynamické řízení úkolů mezi agenty.
- **Kontextové porozumění a adaptace**: Vybavují agenty schopností chápat kontext, přizpůsobovat se měnícím prostředím a přijímat rozhodnutí na základě informací v reálném čase.

Shrnutí: agenti vám umožňují dělat více, posouvat automatizaci na vyšší úroveň a vytvářet inteligentnější systémy, které se dokážou přizpůsobit a učit se ze svého prostředí.

## Jak rychle prototypovat, iterovat a zlepšovat schopnosti agenta?

Toto prostředí se rychle vyvíjí, ale existují některé společné prvky většiny rámců AI agentů, které vám pomohou rychle prototypovat a iterovat, konkrétně modulární komponenty, spolupracující nástroje a učení v reálném čase. Pojďme se na ně podívat:

- **Používejte modulární komponenty**: AI SDK nabízejí předpřipravené komponenty jako AI a paměťové konektory, volání funkcí pomocí přirozeného jazyka nebo kódových pluginů, šablony promptů a další.
- **Využívejte nástroje pro spolupráci**: Navrhujte agenty s konkrétními rolemi a úkoly, což jim umožní testovat a zdokonalovat spolupracující pracovní postupy.
- **Učte se v reálném čase**: Implementujte zpětnovazební smyčky, kde se agenti učí z interakcí a dynamicky upravují své chování.

### Používejte modulární komponenty

SDK jako Microsoft Agent Framework nabízí předpřipravené komponenty jako AI konektory, definice nástrojů a správu agentů.

**Jak mohou týmy tyto komponenty využít**: Týmy mohou rychle sestavit tyto komponenty pro vytvoření funkčního prototypu bez nutnosti začínat od nuly, což umožňuje rychlé experimentování a iterace.

**Jak to funguje v praxi**: Můžete použít předpřipravený parser k extrahování informací z uživatelského vstupu, paměťový modul pro ukládání a získávání dat a generátor promptů pro interakci s uživateli, to vše bez nutnosti komponenty stavět od začátku.

**Ukázkový kód**. Podívejme se na příklad, jak můžete použít Microsoft Agent Framework s `FoundryChatClient` tak, aby model reagoval na uživatelský vstup voláním nástrojů:

``` python
# Příklad Microsoft Agent Framework v Pythonu

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Definujte vzorovou nástrojovou funkci pro rezervaci cesty
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # Příklad výstupu: Váš let do New Yorku dne 1. ledna 2025 byl úspěšně rezervován. Šťastnou cestu! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Z tohoto příkladu vidíte, jak můžete využít předpřipravený parser k extrakci klíčových informací z uživatelského vstupu, jako je původ, cíl a datum požadavku na rezervaci letu. Tento modulární přístup vám umožní soustředit se na logiku na vyšší úrovni.

### Využívejte nástroje pro spolupráci

Rámce jako Microsoft Agent Framework usnadňují tvorbu více agentů, kteří mohou spolupracovat.

**Jak mohou týmy tyto nástroje využít**: Týmy mohou navrhnout agenty s konkrétními rolemi a úkoly, což jim umožní testovat a zdokonalovat spolupracující pracovní postupy a zlepšit celkovou efektivitu systému.

**Jak to funguje v praxi**: Můžete vytvořit tým agentů, kde každý agent má specializovanou funkci, jako je získávání dat, analýza nebo rozhodování. Tito agenti mohou komunikovat a sdílet informace k dosažení společného cíle, například zodpovězení uživatelského dotazu nebo dokončení úkolu.

**Ukázkový kód (Microsoft Agent Framework)**:

```python
# Vytváření více agentů, kteří spolupracují pomocí Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Agent pro získávání dat
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Agent pro analýzu dat
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Spuštění agentů sekvenčně na úkolu
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

V předchozím kódu vidíte, jak můžete vytvořit úkol vyžadující spolupráci více agentů na analýze dat. Každý agent vykonává specifickou funkci a úkol je realizován koordinací agentů k dosažení požadovaného výsledku. Vytvořením dedikovaných agentů se specializovanými rolemi můžete zlepšit efektivitu a výkon úkolu.

### Učte se v reálném čase

Pokročilé rámce poskytují schopnosti pro pochopení kontextu a adaptaci v reálném čase.

**Jak mohou týmy tyto schopnosti využít**: Týmy mohou implementovat zpětnovazební smyčky, kde se agenti učí z interakcí a dynamicky upravují své chování, což vede k neustálému zlepšování a zdokonalování schopností.

**Jak to funguje v praxi**: Agenti mohou analyzovat zpětnou vazbu uživatelů, data z prostředí a výsledky úkolů, aby aktualizovali svou znalostní bázi, upravili algoritmy rozhodování a zlepšili výkon v průběhu času. Tento iterativní učební proces umožňuje agentům přizpůsobit se měnícím podmínkám a uživatelským preferencím, čímž se zvyšuje celková efektivnost systému.

## Jaké jsou rozdíly mezi Microsoft Agent Framework a Microsoft Foundry Agent Service?

Existuje mnoho způsobů, jak tyto přístupy porovnat, ale pojďme se podívat na některé klíčové rozdíly v designu, schopnostech a cílových použitích:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework poskytuje zjednodušené SDK pro budování AI agentů pomocí `FoundryChatClient`. Umožňuje vývojářům vytvářet agenty, kteří využívají Azure OpenAI modely s vestavěným voláním nástrojů, správou konverzace a bezpečností na úrovni podniku pomocí Azure identity.

**Použití**: Tvorba produkčně připravených AI agentů s využitím nástrojů, vícestupňových pracovních postupů a scénářů integrace do podnikového prostředí.

Zde jsou některé důležité základní koncepty Microsoft Agent Framework:

- **Agenti**. Agent je vytvořen pomocí `FoundryChatClient` a nakonfigurován jménem, instrukcemi a nástroji. Agent může:
  - **Zpracovávat uživatelské zprávy** a generovat odpovědi pomocí Azure OpenAI modelů.
  - **Automaticky volat nástroje** na základě kontextu konverzace.
  - **Udržovat stav konverzace** přes více interakcí.

  Zde je ukázka kódu, jak agenta vytvořit:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **Nástroje**. Rámec podporuje definování nástrojů jako Python funkcí, které může agent automaticky vyvolávat. Nástroje se registrují při vytváření agenta:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **Koordinace více agentů**. Můžete vytvořit více agentů se specializacemi a koordinovat jejich práci:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Integrace Azure Identity**. Rámec využívá `AzureCliCredential` (nebo `DefaultAzureCredential`) pro bezpečnou autentizaci bez nutnosti správy API klíčů.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service je novější služba představená na Microsoft Ignite 2024. Umožňuje vývoj a nasazení AI agentů s flexibilnějšími modely, například přímým voláním open-source LLM jako Llama 3, Mistral a Cohere.

Microsoft Foundry Agent Service nabízí silnější mechanismy podnikové bezpečnosti a způsoby ukládání dat, takže je vhodná pro podnikové aplikace.

Funguje přímo s Microsoft Agent Framework pro tvorbu a nasazení agentů.

Tato služba je momentálně ve veřejné ukázce a podporuje Python a C# pro vývoj agentů.

Pomocí Python SDK Microsoft Foundry Agent Service můžeme vytvořit agenta s vlastním nástrojem:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Definujte funkce nástroje
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### Základní koncepty

Microsoft Foundry Agent Service má následující základní koncepty:

- **Agent**. Microsoft Foundry Agent Service je integrován s Microsoft Foundry. V Microsoft Foundry AI Agent působí jako „chytrá“ mikroslužba, která může odpovídat na otázky (RAG), provádět akce nebo zcela automatizovat pracovní postupy. Dosahuje toho kombinací síly generativních AI modelů s nástroji umožňujícími přístup k reálným datovým zdrojům a jejich interakci. Zde je příklad agenta:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    V tomto příkladu je agent vytvořen s modelem `gpt-4.1-mini`, jménem `my-agent` a instrukcemi `You are helpful agent`. Agent je vybaven nástroji a zdroji k vykonání úkolů interpretace kódu.

- **Vlákno a zprávy**. Vlákno je další důležitý koncept. Reprezentuje konverzaci nebo interakci mezi agentem a uživatelem. Vlákna mohou být použita ke sledování průběhu konverzace, ukládání kontextových informací a správě stavu interakce. Zde je příklad vlákna:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Požádejte agenta, aby provedl práci na vlákně
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Načtěte a zaznamenejte všechny zprávy, abyste viděli reakci agenta
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    V předchozím kódu je vytvořeno vlákno. Následně je do vlákna odeslána zpráva. Voláním `create_and_process_run` je agent požádán, aby ve vláknu provedl práci. Nakonec jsou zprávy načteny a zaznamenány pro zobrazení odpovědi agenta. Zprávy ukazují průběh konverzace mezi uživatelem a agentem. Je také důležité pochopit, že zprávy mohou mít různé typy jako text, obrázek nebo soubor, což znamená, že práce agenta v důsledku přinesla například obrázek nebo textovou odpověď. Jako vývojář můžete tyto informace dále zpracovat nebo je předložit uživateli.

- **Integrace s Microsoft Agent Framework**. Microsoft Foundry Agent Service pracuje bezproblémově s Microsoft Agent Framework, což znamená, že můžete vytvářet agenty pomocí `FoundryChatClient` a nasazovat je přes Agent Service v produkčních scénářích.

**Použití**: Microsoft Foundry Agent Service je navržen pro podnikové aplikace vyžadující bezpečné, škálovatelné a flexibilní nasazení AI agentů.

## Jaký je rozdíl mezi těmito přístupy?
 
Zní to, jako by existovala překryvnost, ale jsou zde klíčové rozdíly v designu, schopnostech a cílových použitích:
 
- **Microsoft Agent Framework (MAF)**: Je produkčně připravené SDK pro tvorbu AI agentů. Poskytuje zjednodušené API pro vytváření agentů s voláním nástrojů, správou konverzace a integrací Azure identity.
- **Microsoft Foundry Agent Service**: Je platforma a nasazovací služba v Microsoft Foundry pro agenty. Nabízí vestavěnou konektivitu k službám jako Azure OpenAI, Azure AI Search, Bing Search a spouštění kódu.
 
Ještě si nejste jistí, kterou zvolit?

### Použití
 
Podívejme se, zda vám můžeme pomoci procházením běžných případů použití:
 
> Otázka: Stavím produkční AI agentní aplikace a chci začít rychle
>

> Odpověď: Microsoft Agent Framework je skvělou volbou. Poskytuje jednoduché, pythonické API přes `FoundryChatClient`, které vám umožní definovat agenty s nástroji a instrukcemi v několika řádcích kódu.

> Otázka: Potřebuji nasazení na úrovni podnikové bezpečnosti s integracemi Azure jako Search a spouštění kódu
>
> Odpověď: Microsoft Foundry Agent Service je nejlepší volba. Je to platformní služba poskytující vestavěné možnosti pro různé modely, Azure AI Search, Bing Search a Azure Functions. Usnadňuje tvorbu agentů v Foundry Portálu a jejich škálovatelné nasazení.
 
> Otázka: Jsem stále zmatený, dejte mi prosím jen jednu možnost
>
> Odpověď: Začněte s Microsoft Agent Framework k vytváření agentů a poté použijte Microsoft Foundry Agent Service, když je potřeba je nasadit a škálovat v produkci. Tento přístup vám umožní rychle iterovat na logice agenta s jasnou cestou k podnikové nasazení.
 
Shrňme klíčové rozdíly v tabulce:

| Framework | Zaměření | Základní koncepty | Použití |
| --- | --- | --- | --- |
| Microsoft Agent Framework | Zjednodušené SDK pro agenty s voláním nástrojů | Agenti, nástroje, Azure identity | Tvorba AI agentů, využití nástrojů, vícestupňové workflow |
| Microsoft Foundry Agent Service | Flexibilní modely, podniková bezpečnost, generování kódu, volání nástrojů | Modularita, spolupráce, orchestraci procesů | Bezpečné, škálovatelné a flexibilní nasazení AI agentů |

## Mohu integrální mé stávající nástroje Azure ekosystému přímo, nebo potřebuji samostatná řešení?


Odpověď zní ano, můžete integrovat své stávající nástroje ekosystému Azure přímo se službou Microsoft Foundry Agent Service, protože byla navržena tak, aby bezproblémově fungovala s ostatními službami Azure. Můžete například integrovat Bing, Azure AI Search a Azure Functions. K dispozici je také hluboká integrace s Microsoft Foundry.

Rámec Microsoft Agent Framework se také integruje se službami Azure prostřednictvím `FoundryChatClient` a identity Azure, což vám umožňuje volat služby Azure přímo z vašich nástrojů agenta.

## Ukázkové kódy

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Máte další otázky ohledně AI Agent Frameworků?

Připojte se k [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D), kde se setkáte s ostatními studenty, zúčastníte se konzultací a získáte odpovědi na své otázky ohledně AI agentů.

## Odkazy

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Předchozí lekce

[Úvod do AI agentů a případů užití agentů](../01-intro-to-ai-agents/README.md)

## Další lekce

[Pochopení agentních návrhových vzorů](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->