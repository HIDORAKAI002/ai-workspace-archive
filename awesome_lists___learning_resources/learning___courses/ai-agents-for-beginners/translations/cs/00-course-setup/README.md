# Nastavení kurzu

## Úvod

Tato lekce bude pokrývat, jak spustit ukázky kódu z tohoto kurzu.

## Připojte se k ostatním studentům a získejte pomoc

Než začnete klonovat svůj repozitář, připojte se na [AI Agents For Beginners Discord kanál](https://aka.ms/ai-agents/discord), kde můžete získat pomoc s nastavením, zodpovědět otázky ohledně kurzu nebo se spojit s ostatními studenty.

## Naklonujte nebo forknete tento repozitář

Začněte klonováním nebo forknutím GitHub repozitáře. Vytvoříte si tak vlastní verzi materiálů kurzu, kterou můžete spouštět, testovat a upravovat!

To lze udělat kliknutím na odkaz <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">forknout repozitář</a>

Nyní byste měli mít vlastní forkovanou verzi tohoto kurzu na následujícím odkazu:

![Forkovaný repozitář](../../../translated_images/cs/forked-repo.33f27ca1901baa6a.webp)

### Mělký klon (doporučeno pro workshop / Codespaces)

  >Celý repozitář může být velký (~3 GB), když stahujete kompletní historii a všechny soubory. Pokud se účastníte jen workshopu nebo potřebujete pouze několik složek lekcí, mělký klon (nebo sparse klon) se vyhne většině stahování tím, že omezí historii a/nebo vynechá blob objekty.

#### Rychlý mělký klon — minimální historie, všechny soubory

Nahraďte `<your-username>` v níže uvedených příkazech URL vašeho forku (nebo upstream URL, pokud preferujete).

Pro klonování pouze nejnovější historie commitů (malé stažení):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Pro klonování konkrétní větve:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Částečný (sparse) klon — minimální blob objekty + pouze vybrané složky

Používá částečný klon a sparse-checkout (vyžaduje Git 2.25+ a doporučujeme moderní Git s podporou partial clone):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Přesuňte se do složky repozitáře:

```bash|powershell
cd ai-agents-for-beginners
```

Poté určete, které složky chcete (příklad níže ukazuje dvě složky):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Po klonování a ověření souborů, pokud potřebujete pouze soubory a chcete uvolnit místo (žádná git historie), odstraňte metadata repozitáře (💀nevratné — ztratíte veškerou funkčnost Gitu: žádné commity, pully, pushy ani přístup k historii).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Použití GitHub Codespaces (doporučeno k vyhnutí se velkým lokálním stahováním)

- Vytvořte nový Codespace pro tento repozitář přes [GitHub UI](https://github.com/codespaces).  

- V terminálu nově vytvořeného codespace spusťte jeden z výše uvedených shallow/sparse klonovacích příkazů, aby se do pracovního prostoru Codespace načetly pouze potřebné lekce.
- Volitelné: po klonování v Codespaces odstraňte složku .git pro uvolnění místa (viz výše uvedené příkazy).
- Poznámka: Pokud chcete otevřít repozitář přímo v Codespaces (bez extra klonování), buďte si vědomi, že Codespaces vytvoří devcontainer prostředí a může stále připravit více věcí, než potřebujete. Klonování mělké kopie v novém Codespace vám dává větší kontrolu nad využitím disku.

#### Tipy

- Vždy nahraďte URL klonu URL svého forku, pokud chcete upravovat/komitovat.
- Pokud později budete potřebovat více historie nebo souborů, můžete je stáhnout nebo upravit sparse-checkout, aby zahrnoval další složky.

## Spuštění kódu

Tento kurz nabízí sérii Jupyter Notebooků, které můžete spustit pro praktickou zkušenost s tvorbou AI agentů.

Ukázky kódu používají **Microsoft Agent Framework (MAF)** s `FoundryChatClient`, který se připojuje k **Microsoft Foundry Agent Service V2** (Responses API) prostřednictvím **Microsoft Foundry**.

Všechny Python notebooky jsou označeny `*-python-agent-framework.ipynb`.

## Požadavky

- Python 3.12+
  - **POZNÁMKA**: Pokud nemáte Python3.12 nainstalovaný, ujistěte se, že jej nainstalujete. Pak vytvořte virtuální prostředí (venv) pomocí python3.12, aby se nainstalovaly správné verze z requirements.txt.
  
    > Příklad

    Vytvoření Python venv složky:

    ```bash|powershell
    python -m venv venv
    ```

    Pak aktivujte venv prostředí pro:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+ : Pro vzorové kódy používající .NET si nainstalujte [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) nebo novější. Potom si zkontrolujte nainstalovanou verzi .NET SDK:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Vyžadováno pro autentizaci. Nainstalujte z [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure Subscription** — Pro přístup k Microsoft Foundry a Microsoft Foundry Agent Service.
- **Microsoft Foundry Project** — Projekt s nasazeným modelem (např. `gpt-4.1-mini`). Viz [Krok 1](#krok-1-vytvoření-microsoft-foundry-projektu) níže.

V kořenovém adresáři tohoto repozitáře je soubor `requirements.txt` obsahující všechny požadované Python balíčky ke spuštění kódových ukázek.

Můžete je nainstalovat spuštěním následujícího příkazu v terminálu v kořenovém adresáři repozitáře:

```bash|powershell
pip install -r requirements.txt
```

Doporučujeme vytvoření Python virtuálního prostředí, aby nedocházelo ke konfliktům a problémům.

## Nastavení VSCode

Ujistěte se, že ve VSCode používáte správnou verzi Pythonu.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Nastavení Microsoft Foundry a Microsoft Foundry Agent Service

### Krok 1: Vytvoření Microsoft Foundry projektu

K běhu notebooků potřebujete Microsoft Foundry **hub** a **projekt** s nasazeným modelem.

1. Přejděte na [ai.azure.com](https://ai.azure.com) a přihlaste se ke svému Azure účtu.
2. Vytvořte **hub** (nebo použijte existující). Viz: [Přehled hubů](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. V hubu vytvořte **projekt**.
4. Nasajte model (např. `gpt-4.1-mini`) z **Models + Endpoints** → **Deploy model**.

### Krok 2: Získejte URL konecného bodu projektu a název nasazení modelu

Ve vašem projektu v Microsoft Foundry portálu:

- **Project Endpoint** — Přejděte na stránku **Overview** a zkopírujte URL konecného bodu.

![Project Connection String](../../../translated_images/cs/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — Přejděte na **Models + Endpoints**, vyberte nasazený model a zaznamenejte **Deployment name** (např. `gpt-4.1-mini`).

### Krok 3: Přihlaste se k Azure pomocí `az login`

Všechny notebooky používají pro autentizaci **`AzureCliCredential`** — není třeba spravovat žádné API klíče. Vyžaduje to, abyste byli přihlášeni přes Azure CLI.

1. **Nainstalujte Azure CLI**, pokud jej ještě nemáte: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Přihlaste se** spuštěním:

    ```bash|powershell
    az login
    ```

    Nebo pokud jste v remote/Codespace prostředí bez prohlížeče:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Vyberte svůj subscription**, pokud budete vyzváni — zvolte ten, který obsahuje váš Foundry projekt.

4. **Ověřte**, že jste přihlášeni:

    ```bash|powershell
    az account show
    ```

> **Proč `az login`?** Notebooky se autentizují pomocí `AzureCliCredential` z balíčku `azure-identity`. To znamená, že vaše session Azure CLI poskytuje přihlašovací údaje — žádné API klíče nebo tajemství v souboru `.env`. To je [lepší bezpečnostní praxe](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Krok 4: Vytvořte svůj `.env` soubor

Zkopírujte příkladový soubor:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Otevřete `.env` a vyplňte tyto dvě hodnoty:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Proměnná | Kde ji najít |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry portál → váš projekt → stránka **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry portál → **Models + Endpoints** → jméno nasazeného modelu |

To je vše pro většinu lekcí! Notebooky se autentizují automaticky přes vaši relaci `az login`.

### Krok 5: Nainstalujte Python závislosti

```bash|powershell
pip install -r requirements.txt
```

Doporučujeme spustit tento příkaz uvnitř dříve vytvořeného virtuálního prostředí.

## Další nastavení pro Lekci 5 (Agentic RAG)

Lekce 5 využívá **Azure AI Search** pro retrieval-augmented generation. Pokud plánujete tuto lekci spustit, přidejte tyto proměnné do souboru `.env`:

| Proměnná | Kde ji najít |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure portál → vaše **Azure AI Search** zdroj → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure portál → vaše **Azure AI Search** zdroj → **Settings** → **Keys** → primární admin klíč |

## Další nastavení pro Lekce, které volají Azure OpenAI přímo (Lekce 6 a 8)

Některé notebooky v lekcích 6 a 8 volají **Azure OpenAI** přímo (pomocí **Responses API**) místo přes Microsoft Foundry projekt. Tyto vzory dříve používaly GitHub Models, které jsou zastaralé (ukončení v červenci 2026) a nepodporují Responses API. Pokud plánujete tyto ukázky spustit, přidejte tyto proměnné do souboru `.env`:

| Proměnná | Kde ji najít |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure portál → vaše **Azure OpenAI** zdroj → **Keys and Endpoint** → Endpoint (např. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Název vašeho nasazeného modelu (např. `gpt-4.1-mini`) podporujícího Responses API |
| `AZURE_OPENAI_API_KEY` | Volitelné — jen pokud používáte autentizaci na základě klíče místo `az login` / Entra ID |

> Responses API používá stabilní `/openai/v1/` endpoint, takže není potřeba `api-version`. Přihlaste se pomocí `az login` pro bezklíčovou autentizaci Entra ID.

## Alternativní poskytovatel: MiniMax (kompatibilní s OpenAI)

[MiniMax](https://platform.minimaxi.com/) poskytuje modely s velkým kontextem (až 204K tokenů) skrze API kompatibilní s OpenAI. Jelikož Microsoft Agent Framework `OpenAIChatClient` funguje s jakýmkoli OpenAI-kompatibilním endpointem, můžete MiniMax použít jako náhradu za Azure OpenAI nebo OpenAI.

Přidejte tyto proměnné do svého `.env` souboru:

| Proměnná | Kde ji najít |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API klíče |
| `MINIMAX_BASE_URL` | Použijte `https://api.minimax.io/v1` (výchozí hodnota) |
| `MINIMAX_MODEL_ID` | Název modelu k použití (např. `MiniMax-M3`) |

**Příklady modelů**: `MiniMax-M3` (doporučeno), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (rychlejší odpovědi). Jména modelů a dostupnost se v čase mohou měnit, a přístup k modelu může záviset na vašem účtu nebo regionu — zkontrolujte aktuální seznam na [MiniMax Platform](https://platform.minimaxi.com/). Pokud není `MiniMax-M3` dostupný pro váš účet, nastavte `MINIMAX_MODEL_ID` na model, ke kterému máte přístup (např. `MiniMax-M2.7`).

Ukázkové kódy používající `OpenAIChatClient` (např. workflow rezervace hotelu z Lekce 14) automaticky detekují a použijí vaši konfiguraci MiniMax, pokud je nastaven `MINIMAX_API_KEY`.

## Alternativní poskytovatel: Foundry Local (spuštění modelů lokálně)

[Foundry Local](https://foundrylocal.ai) je lehké runtime prostředí, které stahuje, spravuje a poskytuje jazykové modely **zcela na vašem vlastním zařízení** přes OpenAI-kompatibilní API — bez cloudu, bez Azure subscription a bez API klíčů. Je to skvělá volba pro offline vývoj, experimentování bez nákladů na cloud nebo zachování dat lokálně.

Protože Microsoft Agent Framework `OpenAIChatClient` funguje s jakýmkoli OpenAI-kompatibilním endpointem, Foundry Local je vhodná lokální náhrada za Azure OpenAI.

**1. Instalace Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Stáhněte a spusťte model** (tím se také spustí lokální služba):

```bash
foundry model list          # podívejte se na dostupné modely
foundry model run phi-4-mini
```

**3. Nainstalujte Python SDK** používané k nalezení lokálního endpointu:

```bash
pip install foundry-local-sdk
```

**4. Nastavte Microsoft Agent Framework na váš lokální model:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Stáhne (pokud je potřeba) a lokálně poskytne model, poté zjistí endpoint/port.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # např. http://localhost:<port>/v1
    api_key=manager.api_key,        # vždy "not-required" pro Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Poznámka:** Foundry Local poskytuje OpenAI-kompatibilní **Chat Completions** endpoint. Používejte jej pro lokální vývoj a offline scénáře. Pro plnou funkcionalitu **Responses API** (stavové konverzace, hluboká orchestrace nástrojů a agent-style vývoj) cílujte na **Azure OpenAI** nebo **Microsoft Foundry** projekt, jak ukazují lekce. Viz dokumentace [Foundry Local](https://foundrylocal.ai) pro aktuální katalog modelů a podporu platformy.


## Další nastavení pro Lekci 8 (Bing Grounding Workflow)

Podmíněný workflow notebook v lekci 8 používá **Bing grounding** přes Microsoft Foundry. Pokud plánujete spustit tento příklad, přidejte tuto proměnnou do souboru `.env`:

| Proměnná | Kde ji najít |
|----------|-------------|
| `BING_CONNECTION_ID` | Portál Microsoft Foundry → váš projekt → **Management** → **Connected resources** → vaše Bing připojení → zkopírujte ID připojení |

## Řešení problémů

### Chyby ověření SSL certifikátu na macOS

Pokud používáte macOS a narazíte na chybu jako:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Jedná se o známý problém s Pythonem na macOS, kde systémové SSL certifikáty nejsou automaticky důvěryhodné. Zkuste následující řešení v daném pořadí:

**Možnost 1: Spusťte skript Install Certificates v Pythonu (doporučeno)**

```bash
# Nahraďte 3.XX verzí Pythonu, kterou máte nainstalovanou (např. 3.12 nebo 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Možnost 2: Použijte `connection_verify=False` ve vašem notebooku (platí pouze pro GitHub Models notebooky)**

V notebooku Lekce 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) je již zahrnuto zakomentované řešení. Odkomentujte `connection_verify=False` při vytváření klienta:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Vypněte ověřování SSL, pokud narazíte na chyby certifikátu
)
```

> **⚠️ Varování:** Vypnutí ověřování SSL (`connection_verify=False`) snižuje bezpečnost tím, že přeskočí validaci certifikátu. Používejte toto řešení pouze jako dočasné v prostředích pro vývoj, nikdy v produkci.

**Možnost 3: Nainstalujte a používejte `truststore`**

```bash
pip install truststore
```

Poté přidejte následující na začátek vašeho notebooku nebo skriptu před provedením jakýchkoliv síťových volání:

```python
import truststore
truststore.inject_into_ssl()
```

## Zasekl jste se někde?

Pokud budete mít jakékoliv problémy s tímto nastavením, připojte se do naší <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> nebo <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">vytvořte issue</a>.

## Další lekce

Nyní jste připraveni spustit kód tohoto kurzu. Přejeme vám hodně radosti při učení o světě AI agentů! 

[Úvod do AI agentů a případů použití agentů](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->