# Kursoppsett

## Introduksjon

Denne leksjonen vil dekke hvordan du kjører kodeeksemplene i dette kurset.

## Bli med andre elever og få hjelp

Før du begynner å klone repoet ditt, bli med i [AI Agents For Beginners Discord-kanalen](https://aka.ms/ai-agents/discord) for å få hjelp med oppsett, stille spørsmål om kurset, eller for å komme i kontakt med andre elever.

## Klon eller fork dette repoet

For å begynne, klon eller fork GitHub-repositoriet. Dette vil lage din egen versjon av kursmaterialet slik at du kan kjøre, teste og justere koden!

Dette kan gjøres ved å klikke på linken for å <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">forke repoet</a>

Du skal nå ha din egen forket versjon av dette kurset i følgende link:

![Forked Repo](../../../translated_images/no/forked-repo.33f27ca1901baa6a.webp)

### Grunnleggende kloning (anbefalt for workshop / Codespaces)

  >Det fulle repositoriet kan være stort (~3 GB) når du laster ned full historikk og alle filer. Hvis du bare deltar på workshopen eller bare trenger noen få leksjonsmapper, unngår en grunnleggende kloning (eller en sparsom kloning) mesteparten av nedlastingen ved å kutte historikk og/eller hoppe over blobs.

#### Rask grunnleggende kloning — minimal historikk, alle filer

Erstatt `<your-username>` i kommandoene nedenfor med din fork-URL (eller upstream-URL hvis du foretrekker det).

For å klone kun siste commit-historikk (liten nedlasting):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

For å klone en spesifikk branch:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Delvis (sparsom) kloning — minimal blobs + kun valgte mapper

Dette bruker delvis kloning og sparse-checkout (krever Git 2.25+ og anbefalt moderne Git med delvis kloning støtte):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Gå inn i repo-mappen:

```bash|powershell
cd ai-agents-for-beginners
```

Så spesifiser hvilke mapper du ønsker (eksempel under viser to mapper):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Etter kloning og verifisering av filer, hvis du kun trenger filene og vil frigjøre plass (ingen git-historikk), slett repository-metadaten (💀irreversibelt — du mister all Git-funksjonalitet: ingen commits, pulls, pushes eller tilgang til historikk).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Bruke GitHub Codespaces (anbefalt for å unngå lokale store nedlastinger)

- Opprett en ny Codespace for dette repoet via [GitHub UI](https://github.com/codespaces).  

- I terminalen i den nyskapte Codespacen, kjør en av de grunnleggende/sparsom kloning kommandoene ovenfor for å hente kun de leksjonsmappene du trenger inn i Codespace-arbeidsområdet.
- Valgfritt: etter kloning inne i Codespaces, fjern .git for å frigjøre ekstra plass (se fjerningskommandoene ovenfor).
- Merk: Hvis du heller vil åpne repoet direkte i Codespaces (uten ekstra kloning), vær klar over at Codespaces vil konstruere devcontainer-miljøet og kan fortsatt provisionere mer enn du trenger. Å klone en grunnleggende kopi i en ny Codespace gir deg mer kontroll over diskbruk.

#### Tips

- Bytt alltid klone-URL til din fork hvis du vil redigere/committe.
- Hvis du senere trenger mer historikk eller filer, kan du hente disse eller justere sparse-checkout for å inkludere flere mapper.

## Kjøring av koden

Dette kurset tilbyr en serie Jupyter Notebooks som du kan kjøre for å få praktisk erfaring med å bygge AI-agenter.

Kodeeksemplene bruker **Microsoft Agent Framework (MAF)** med `FoundryChatClient`, som kobler til **Microsoft Foundry Agent Service V2** (Responses API) via **Microsoft Foundry**.

Alle Python-notebooks er merket `*-python-agent-framework.ipynb`.

## Krav

- Python 3.12+
  - **MERK**: Hvis du ikke har Python 3.12 installert, sørg for å installere det. Opprett deretter ditt virtuelle miljø med python3.12 for å sikre at riktige versjoner blir installert fra requirements.txt-filen.
  
    >Eksempel

    Opprett Python venv-katalog:

    ```bash|powershell
    python -m venv venv
    ```

    Aktiver så venv-miljøet for:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: For eksempel med .NET-kode, sørg for å installere [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) eller nyere. Sjekk deretter din installerede .NET SDK-versjon:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Kreves for autentisering. Installer fra [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure-abonnement** — For tilgang til Microsoft Foundry og Microsoft Foundry Agent Service.
- **Microsoft Foundry-prosjekt** — Et prosjekt med en distribuert modell (f.eks. `gpt-4.1-mini`). Se [Steg 1](#steg-1-opprett-et-microsoft-foundry-prosjekt) under.

Vi har inkludert en `requirements.txt`-fil i rotmappen av dette repositoriet som inneholder alle nødvendige Python-pakker for å kjøre kodeeksemplene.

Du kan installere disse ved å kjøre følgende kommando i terminalen i rotnivået av repositoriet:

```bash|powershell
pip install -r requirements.txt
```

Vi anbefaler å lage et Python virtuelt miljø for å unngå konflikter og problemer.

## Sett opp VSCode

Sørg for at du bruker riktig versjon av Python i VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Sett opp Microsoft Foundry og Microsoft Foundry Agent Service

### Steg 1: Opprett et Microsoft Foundry-prosjekt

Du trenger en Microsoft Foundry **hub** og **prosjekt** med en distribuert modell for å kjøre notebookene.

1. Gå til [ai.azure.com](https://ai.azure.com) og logg inn med din Azure-konto.
2. Opprett en **hub** (eller bruk en eksisterende). Se: [Hub ressurser oversikt](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Inne i huben, opprett et **prosjekt**.
4. Distribuer en modell (f.eks. `gpt-4.1-mini`) fra **Models + Endpoints** → **Deploy model**.

### Steg 2: Hent endepunktet for prosjektet og modellens distribusjonsnavn

Fra prosjektet ditt i Microsoft Foundry-portalen:

- **Project Endpoint** — Gå til **Oversikt**-siden og kopier endepunkt-URLen.

![Project Connection String](../../../translated_images/no/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — Gå til **Models + Endpoints**, velg den distribuerte modellen din, og noter **Deployment name** (f.eks. `gpt-4.1-mini`).

### Steg 3: Logg inn i Azure med `az login`

Alle notebooks bruker **`AzureCliCredential`** for autentisering — ingen API-nøkler å håndtere. Dette krever at du er innlogget via Azure CLI.

1. **Installer Azure CLI** hvis du ikke allerede har gjort det: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Logg inn** ved å kjøre:

    ```bash|powershell
    az login
    ```

    Eller hvis du er i et fjernmiljø/Codespace uten nettleser:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Velg abonnementet ditt** hvis du blir spurt — velg det som inneholder Foundry-prosjektet ditt.

4. **Sjekk** at du er innlogget:

    ```bash|powershell
    az account show
    ```

> **Hvorfor `az login`?** Notebookene autentiserer med `AzureCliCredential` fra `azure-identity` pakken. Dette betyr at din Azure CLI-økt gir legitimasjonen — ingen API-nøkler eller hemmeligheter i `.env`-filen. Dette er en [beste praksis for sikkerhet](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Steg 4: Lag din `.env`-fil

Kopier eksempel-filen:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Åpne `.env` og fyll inn disse to verdiene:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Variabel | Hvor du finner den |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry-portalen → prosjektet ditt → **Oversikt**-siden |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry-portalen → **Models + Endpoints** → modellen du har distribuert |

Det er alt for de fleste leksjoner! Notebookene autentiserer automatisk gjennom din `az login` økt.

### Steg 5: Installer Python-avhengigheter

```bash|powershell
pip install -r requirements.txt
```

Vi anbefaler å kjøre dette inne i det virtuelle miljøet du opprettet tidligere.

## Tilleggsoppsett for Leksjon 5 (Agentic RAG)

Leksjon 5 bruker **Azure AI Search** for retrieval-augmented generation. Hvis du planlegger å kjøre den leksjonen, legg til disse variablene i din `.env`-fil:

| Variabel | Hvor du finner den |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure-portalen → din **Azure AI Search** ressurs → **Oversikt** → URL |
| `AZURE_SEARCH_API_KEY` | Azure-portalen → din **Azure AI Search** ressurs → **Innstillinger** → **Nøkler** → primær admin-nøkkel |

## Tilleggsoppsett for leksjoner som kaller Azure OpenAI direkte (Leksjon 6 og 8)

Noen notebooks i leksjon 6 og 8 kaller **Azure OpenAI** direkte (bruker **Responses API**) i stedet for gjennom et Microsoft Foundry-prosjekt. Disse eksemplene brukte tidligere GitHub Models, som er utfaset (utfases juli 2026) og støtter ikke Responses API. Hvis du planlegger å kjøre disse eksemplene, legg til disse variablene i din `.env`-fil:

| Variabel | Hvor du finner den |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure-portalen → din **Azure OpenAI** ressurs → **Nøkler og Endepunkt** → Endepunkt (f.eks. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Navnet på din distribuerte modell (f.eks. `gpt-4.1-mini`) som støtter Responses API |
| `AZURE_OPENAI_API_KEY` | Valgfritt — kun hvis du bruker nøkkelbasert autentisering i stedet for `az login` / Entra ID |

> Responses API bruker det stabile `/openai/v1/` endepunktet, så ingen `api-version` kreves. Logg inn med `az login` for nøkkelfri Entra ID autentisering.

## Alternativ leverandør: MiniMax (OpenAI-kompatibel)

[MiniMax](https://platform.minimaxi.com/) tilbyr modeller med stor kontekst (opptil 204K tokens) gjennom en OpenAI-kompatibel API. Siden Microsoft Agent Frameworks `OpenAIChatClient` fungerer med alle OpenAI-kompatible endepunkter, kan du bruke MiniMax som et alternativ til Azure OpenAI eller OpenAI.

Legg til disse variablene i din `.env`-fil:

| Variabel | Hvor du finner den |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax-plattform](https://platform.minimaxi.com/) → API-nøkler |
| `MINIMAX_BASE_URL` | Bruk `https://api.minimax.io/v1` (standardverdi) |
| `MINIMAX_MODEL_ID` | Modellnavnet som skal brukes (f.eks. `MiniMax-M3`) |

**Eksempelmodeller**: `MiniMax-M3` (anbefalt), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (raskere responser). Modellnavn og tilgjengelighet kan endre seg over tid, og tilgang til en gitt modell kan avhenge av kontoen din eller region — sjekk [MiniMax-plattformen](https://platform.minimaxi.com/) for nåværende liste. Hvis `MiniMax-M3` ikke er tilgjengelig for din konto, sett `MINIMAX_MODEL_ID` til en modell du har tilgang til (f.eks. `MiniMax-M2.7`).

Kodeeksemplene som bruker `OpenAIChatClient` (f.eks. Leksjon 14 hotellbestillingsflyt) vil automatisk oppdage og bruke din MiniMax-konfigurasjon når `MINIMAX_API_KEY` er satt.

## Alternativ leverandør: Foundry Local (Kjør modeller lokalt)

[Foundry Local](https://foundrylocal.ai) er en lettvekts runtime som laster ned, administrerer og serverer språkmodeller **helt på din egen maskin** gjennom en OpenAI-kompatibel API — ingen sky, ingen Azure-abonnement og ingen API-nøkler. Det er et godt valg for offline utvikling, eksperimentering uten sky-kostnader, eller å holde data lokalt.

Siden Microsoft Agent Frameworks `OpenAIChatClient` fungerer med alle OpenAI-kompatible endepunkter, er Foundry Local et lokalt alternativ til Azure OpenAI.

**1. Installer Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Last ned og kjør en modell** (dette starter også den lokale tjenesten):

```bash
foundry model list          # se tilgjengelige modeller
foundry model run phi-4-mini
```

**3. Installer Python SDK-en** som brukes for å oppdage det lokale endepunktet:

```bash
pip install foundry-local-sdk
```

**4. Pek Microsoft Agent Framework mot din lokale modell:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Laster ned (om nødvendig) og kjører modellen lokalt, deretter oppdager endepunkt/port.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # f.eks. http://localhost:<port>/v1
    api_key=manager.api_key,        # alltid "ikke-påkrevd" for Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Merk:** Foundry Local eksponerer et OpenAI-kompatibelt **Chat Completions** endepunkt. Bruk det til lokal utvikling og offline scenarier. For full funksjonalitet av **Responses API** (stateful samtaler, dyp verktøyorchestrering og agent-style utvikling), bruk **Azure OpenAI** eller et **Microsoft Foundry** prosjekt som vist i leksjonene. Se [Foundry Local dokumentasjonen](https://foundrylocal.ai) for nåværende modellkatalog og plattformstøtte.


## Ytterligere oppsett for leksjon 8 (Bing Grounding Workflow)

Den betingede workflow-notatboken i leksjon 8 bruker **Bing grounding** via Microsoft Foundry. Hvis du planlegger å kjøre det eksemplet, legg til denne variabelen i din `.env`-fil:

| Variable | Hvor du finner den |
|----------|-------------------|
| `BING_CONNECTION_ID` | Microsoft Foundry-portalen → prosjektet ditt → **Management** → **Connected resources** → din Bing-tilkobling → kopier tilkoblings-ID |

## Feilsøking

### Feil ved SSL-sertifikatverifisering på macOS

Hvis du bruker macOS og får en feil som:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Dette er et kjent problem med Python på macOS der systemets SSL-sertifikater ikke automatisk blir stolt på. Prøv følgende løsninger i rekkefølge:

**Alternativ 1: Kjør Pythons Install Certificates-skript (anbefalt)**

```bash
# Erstatt 3.XX med din installerte Python-versjon (f.eks. 3.12 eller 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Alternativ 2: Bruk `connection_verify=False` i notatboken din (kun for GitHub Models-notatbøker)**

I leksjon 6-notatboken (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) er en utkommentert løsning allerede inkludert. Fjern kommentaren for `connection_verify=False` når klienten opprettes:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Deaktiver SSL-verifisering hvis du møter sertifikatfeil
)
```

> **⚠️ Advarsel:** Å deaktivere SSL-verifisering (`connection_verify=False`) reduserer sikkerheten ved å hoppe over sertifikatvalidering. Bruk dette kun som en midlertidig løsning i utviklingsmiljøer, aldri i produksjon.

**Alternativ 3: Installer og bruk `truststore`**

```bash
pip install truststore
```

Legg deretter til følgende øverst i notatboken eller skriptet ditt før du gjør noen nettverkskall:

```python
import truststore
truststore.inject_into_ssl()
```

## Stuck et sted?

Hvis du har problemer med å kjøre dette oppsettet, hopp inn i vår <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> eller <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">opprett en sak</a>.

## Neste leksjon

Du er nå klar til å kjøre koden for dette kurset. Lykke til med å lære mer om verden av AI-agenter!

[Introduksjon til AI-agenter og brukstilfeller for agenter](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->