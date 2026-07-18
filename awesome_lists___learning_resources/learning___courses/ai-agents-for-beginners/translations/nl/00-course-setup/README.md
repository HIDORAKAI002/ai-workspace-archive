# Cursusinstelling

## Introductie

Deze les behandelt hoe je de codevoorbeelden van deze cursus uitvoert.

## Sluit je aan bij andere cursisten en krijg hulp

Voordat je begint met het klonen van je repo, sluit je aan bij het [AI Agents For Beginners Discord-kanaal](https://aka.ms/ai-agents/discord) om hulp te krijgen bij de installatie, vragen over de cursus te stellen of om contact te maken met andere cursisten.

## Clone of Fork deze Repo

Om te beginnen, clone of fork alsjeblieft de GitHub-repository. Dit maakt je eigen versie van het cursusmateriaal zodat je de code kunt uitvoeren, testen en aanpassen!

Dit kan gedaan worden door te klikken op de link om <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">de repo te forken</a>

Je zou nu je eigen geforkte versie van deze cursus moeten hebben via de volgende link:

![Geforkte Repo](../../../translated_images/nl/forked-repo.33f27ca1901baa6a.webp)

### Shallow Clone (aanbevolen voor workshop / Codespaces)

  >De volledige repository kan groot zijn (~3 GB) als je de volledige geschiedenis en alle bestanden downloadt. Als je alleen de workshop bijwoont of slechts een paar lesmappen nodig hebt, voorkomt een shallow clone (of sparse clone) dat je het meeste van die download krijgt door geschiedenis af te kappen en/of blobs over te slaan.

#### Snelle shallow clone — minimale geschiedenis, alle bestanden

Vervang `<your-username>` in de onderstaande opdrachten met je fork-URL (of de upstream-URL als je dat liever hebt).

Om alleen de laatste commitgeschiedenis te clonen (kleine download):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Om een specifieke branch te clonen:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Gedeeltelijke (sparse) clone — minimale blobs + alleen geselecteerde mappen

Dit gebruikt gedeeltelijke clone en sparse-checkout (vereist Git 2.25+ en aanbevolen moderne Git met partial clone-ondersteuning):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Ga naar de repo-map:

```bash|powershell
cd ai-agents-for-beginners
```

Geef vervolgens aan welke mappen je wilt (voorbeeld toont twee mappen):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Na het klonen en verifiëren van de bestanden, als je alleen bestanden nodig hebt en ruimte wilt vrijmaken (geen git-geschiedenis), verwijder dan de repository metadata (💀onherstelbaar — je verliest alle Git-functionaliteit: geen commits, pulls, pushes of toegang tot geschiedenis).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Gebruik van GitHub Codespaces (aanbevolen om grote lokale downloads te vermijden)

- Maak een nieuwe Codespace voor deze repo via de [GitHub UI](https://github.com/codespaces).  

- Voer in de terminal van de nieuw aangemaakte codespace een van de hierboven genoemde shallow/sparse clone-opdrachten uit om alleen de benodigde lesmappen in de Codespace-werkruimte te brengen.
- Optioneel: verwijder binnen Codespaces na het clonen de .git-map om extra ruimte vrij te maken (zie verwijderopdrachten hierboven).
- Opmerking: als je de repo rechtstreeks in Codespaces opent (zonder extra clone), houd er dan rekening mee dat Codespaces de devcontainer-omgeving zal opbouwen en mogelijk meer voorziet dan je nodig hebt. Het klonen van een shallow copy binnen een nieuwe Codespace geeft je meer controle over het schijfgebruik.

#### Tips

- Vervang altijd de clone-URL door jouw fork als je wilt bewerken/committen.
- Als je later meer geschiedenis of bestanden nodig hebt, kun je die ophalen of sparse-checkout aanpassen om extra mappen op te nemen.

## Code Uitvoeren

Deze cursus biedt een serie Jupyter Notebooks die je kunt uitvoeren om praktische ervaring op te doen met het bouwen van AI Agents.

De codevoorbeelden gebruiken **Microsoft Agent Framework (MAF)** met de `FoundryChatClient`, die verbinding maakt met **Microsoft Foundry Agent Service V2** (de Responses API) via **Microsoft Foundry**.

Alle Python-notebooks hebben het label `*-python-agent-framework.ipynb`.

## Vereisten

- Python 3.12+
  - **OPMERKING**: Als je Python3.12 niet hebt geïnstalleerd, zorg dan dat je het installeert. Maak vervolgens je venv aan met python3.12 om ervoor te zorgen dat de juiste versies worden geïnstalleerd vanuit het requirements.txt-bestand.
  
    >Voorbeeld

    Maak een Python venv-map aan:

    ```bash|powershell
    python -m venv venv
    ```

    Activeer dan de venv-omgeving voor:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Voor de voorbeeldcodes die .NET gebruiken, zorg dat je [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) of hoger installeert. Controleer daarna je geïnstalleerde .NET SDK-versie:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Vereist voor authenticatie. Installeer via [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure-abonnement** — Voor toegang tot Microsoft Foundry en Microsoft Foundry Agent Service.
- **Microsoft Foundry-project** — Een project met een ingezet model (bijv. `gpt-4.1-mini`). Zie [Stap 1](#stap-1-maak-een-microsoft-foundry-project-aan) hieronder.

We hebben een `requirements.txt` bestand opgenomen in de root van deze repository met alle benodigde Python-pakketten om de codevoorbeelden uit te voeren.

Je kunt ze installeren door de volgende opdracht uit te voeren in de terminal in de root van de repository:

```bash|powershell
pip install -r requirements.txt
```

We raden aan een Python virtuele omgeving aan te maken om conflicten en problemen te vermijden.

## VSCode instellen

Zorg ervoor dat je de juiste versie van Python gebruikt in VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry en Microsoft Foundry Agent Service instellen

### Stap 1: Maak een Microsoft Foundry-project aan

Je hebt een Microsoft Foundry **hub** en **project** nodig met een ingezet model om de notebooks uit te voeren.

1. Ga naar [ai.azure.com](https://ai.azure.com) en meld je aan met je Azure-account.
2. Maak een **hub** aan (of gebruik een bestaande). Zie: [Overzicht hub-resources](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Maak binnen de hub een **project** aan.
4. Zet een model in (bijv. `gpt-4.1-mini`) via **Models + Endpoints** → **Deploy model**.

### Stap 2: Haal je projectendpoint en modeldeploymentnaam op

Vanuit je project in het Microsoft Foundry-portaal:

- **Project Endpoint** — Ga naar de **Overzicht**-pagina en kopieer de endpoint-URL.

![Project Connection String](../../../translated_images/nl/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — Ga naar **Models + Endpoints**, selecteer je ingezette model en noteer de **Deployment name** (bijv. `gpt-4.1-mini`).

### Stap 3: Aanmelden bij Azure met `az login`

Alle notebooks gebruiken **`AzureCliCredential`** voor authenticatie — geen API-sleutels om te beheren. Dit vereist dat je bent aangemeld via de Azure CLI.

1. **Installeer de Azure CLI** als je dat nog niet hebt: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Meld je aan** door het volgende uit te voeren:

    ```bash|powershell
    az login
    ```

    Of als je in een remote/Codespace-omgeving bent zonder browser:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Selecteer je abonnement** als daarom wordt gevraagd — kies degene die je Foundry-project bevat.

4. **Controleer of je bent aangemeld:**

    ```bash|powershell
    az account show
    ```

> **Waarom `az login`?** De notebooks authenticeren via `AzureCliCredential` van het `azure-identity` pakket. Dit betekent dat je Azure CLI-sessie de credentials levert — geen API-sleutels of geheimen in je `.env`-bestand. Dit is een [beste beveiligingspraktijk](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Stap 4: Maak je `.env`-bestand aan

Kopieer het voorbeeldbestand:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Open `.env` en vul deze twee waarden in:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Variabele | Waar te vinden |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry portal → je project → **Overzicht**-pagina |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry portal → **Models + Endpoints** → de naam van je ingezette model |

Dat is het voor de meeste lessen! De notebooks authenticeren automatisch via je `az login`-sessie.

### Stap 5: Installeer Python-afhankelijkheden

```bash|powershell
pip install -r requirements.txt
```

We raden aan dit uit te voeren binnen de virtuele omgeving die je eerder hebt aangemaakt.

## Extra Setup voor Les 5 (Agentic RAG)

Les 5 gebruikt **Azure AI Search** voor retrieval-augmented generation. Als je die les wilt uitvoeren, voeg dan deze variabelen toe aan je `.env`-bestand:

| Variabele | Waar te vinden |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure portal → je **Azure AI Search**-resource → **Overzicht** → URL |
| `AZURE_SEARCH_API_KEY` | Azure portal → je **Azure AI Search**-resource → **Instellingen** → **Sleutels** → primaire beheerderssleutel |

## Extra Setup voor Lessen die Azure OpenAI Direct Aanroepen (Lessen 6 en 8)

Sommige notebooks in lessen 6 en 8 roepen **Azure OpenAI** direct aan (met de **Responses API**) in plaats van een Microsoft Foundry-project te gebruiken. Deze voorbeelden gebruikten eerder GitHub Models, wat verouderd is (wordt uitgefaseerd juli 2026) en de Responses API niet ondersteunt. Als je die voorbeelden wilt uitvoeren, voeg dan deze variabelen toe aan je `.env`-bestand:

| Variabele | Waar te vinden |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure portal → je **Azure OpenAI**-resource → **Sleutels en Endpoint** → Endpoint (bijv. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | De naam van je ingezette model (bijv. `gpt-4.1-mini`) dat de Responses API ondersteunt |
| `AZURE_OPENAI_API_KEY` | Optioneel — alleen als je sleutelgebaseerde authenticatie gebruikt in plaats van `az login` / Entra ID |

> De Responses API gebruikt de stabiele `/openai/v1/`-endpoint, dus er is geen `api-version` vereist. Meld je aan met `az login` om sleutelvrije Entra ID-authenticatie te gebruiken.

## Alternatieve Provider: MiniMax (Compatibel met OpenAI)

[MiniMax](https://platform.minimaxi.com/) biedt grote-contextmodellen (tot 204K tokens) via een OpenAI-compatibele API. Omdat de Microsoft Agent Framework's `OpenAIChatClient` werkt met elke OpenAI-compatibele endpoint, kun je MiniMax gebruiken als een drop-in alternatief voor Azure OpenAI of OpenAI.

Voeg deze variabelen toe aan je `.env`-bestand:

| Variabele | Waar te vinden |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API-sleutels |
| `MINIMAX_BASE_URL` | Gebruik `https://api.minimax.io/v1` (standaardwaarde) |
| `MINIMAX_MODEL_ID` | Modelnaam om te gebruiken (bijv. `MiniMax-M3`) |

**Voorbeeldmodellen**: `MiniMax-M3` (aanbevolen), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (snellere reacties). Modellnamen en beschikbaarheid kunnen in de loop der tijd veranderen, en toegang tot een model kan afhangen van je account of regio — kijk op het [MiniMax Platform](https://platform.minimaxi.com/) voor de actuele lijst. Als `MiniMax-M3` niet beschikbaar is voor je account, stel dan `MINIMAX_MODEL_ID` in op een model waar je toegang toe hebt (bijv. `MiniMax-M2.7`).

De codevoorbeelden die `OpenAIChatClient` gebruiken (bijv. Les 14 hotelboekingsworkflow) detecteren en gebruiken automatisch je MiniMax-configuratie wanneer `MINIMAX_API_KEY` is ingesteld.

## Alternatieve Provider: Foundry Local (Modellen lokaal draaien)

[Foundry Local](https://foundrylocal.ai) is een lichtgewicht runtime die taalmodellen **volledig op je eigen machine** downloadt, beheert en serveert via een OpenAI-compatibele API — geen cloud, geen Azure-abonnement, en geen API-sleutels. Het is een goede optie voor offline ontwikkeling, experimenteren zonder cloudkosten of om data op het apparaat te houden.

Omdat de Microsoft Agent Framework's `OpenAIChatClient` werkt met elke OpenAI-compatibele endpoint, is Foundry Local een lokale drop-in vervanging voor Azure OpenAI.

**1. Installeer Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Download en start een model** (dit start ook de lokale service):

```bash
foundry model list          # bekijk beschikbare modellen
foundry model run phi-4-mini
```

**3. Installeer de Python SDK** die gebruikt wordt om de lokale endpoint te ontdekken:

```bash
pip install foundry-local-sdk
```

**4. Richt de Microsoft Agent Framework op je lokale model:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Downloadt (indien nodig) en serveert het model lokaal, en ontdekt vervolgens de endpoint/poort.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # bijv. http://localhost:<port>/v1
    api_key=manager.api_key,        # altijd "niet-vereist" voor Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Opmerking:** Foundry Local biedt een OpenAI-compatibele **Chat Completions**-endpoint. Gebruik deze voor lokale ontwikkeling en offline scenario's. Voor de volledige **Responses API**-functionaliteit (stateful conversaties, diepe tool-orkestratie en agent-stijl ontwikkeling) richt je je op **Azure OpenAI** of een **Microsoft Foundry**-project zoals getoond in de lessen. Zie de [Foundry Local-documentatie](https://foundrylocal.ai) voor de actuele modelcatalogus en platformondersteuning.


## Extra Setup voor Les 8 (Bing Grounding Workflow)

Het conditionele workflow-notebook in les 8 gebruikt **Bing grounding** via Microsoft Foundry. Als je van plan bent dat voorbeeld uit te voeren, voeg dan deze variabele toe aan je `.env`-bestand:

| Variabele | Waar te vinden |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry portaal → jouw project → **Management** → **Connected resources** → jouw Bing-verbinding → kopieer de verbinding-ID |

## Problemen oplossen

### SSL-certificaatverificatiefouten op macOS

Als je macOS gebruikt en een foutmelding tegenkomt zoals:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Dit is een bekend probleem met Python op macOS waarbij de systeem-SSL-certificaten niet automatisch worden vertrouwd. Probeer de volgende oplossingen op volgorde:

**Optie 1: Voer het Install Certificates-script van Python uit (aanbevolen)**

```bash
# Vervang 3.XX door uw geïnstalleerde Python-versie (bijv. 3.12 of 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Optie 2: Gebruik `connection_verify=False` in je notebook (alleen voor GitHub Models-notebooks)**

In het Les 6-notebook (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) is een uitgeschakelde workaround al opgenomen. Haal de commentaar weg voor `connection_verify=False` bij het maken van de client:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Schakel SSL-verificatie uit als u certificaatfouten tegenkomt
)
```

> **⚠️ Waarschuwing:** Het uitschakelen van SSL-verificatie (`connection_verify=False`) vermindert de veiligheid doordat certificaatvalidatie wordt overgeslagen. Gebruik dit alleen als tijdelijke oplossing in ontwikkelomgevingen, nooit in productie.

**Optie 3: Installeer en gebruik `truststore`**

```bash
pip install truststore
```

Voeg dan het volgende toe aan het begin van je notebook of script voordat je netwerkverzoeken maakt:

```python
import truststore
truststore.inject_into_ssl()
```

## Vastgelopen?

Als je problemen hebt met het uitvoeren van deze setup, neem dan contact op via onze <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> of <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">maak een issue aan</a>.

## Volgende Les

Je bent nu klaar om de code voor deze cursus uit te voeren. Veel succes met het verder ontdekken van de wereld van AI Agents!

[Introductie tot AI Agents en Agent Use Cases](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->