# Configurazione del Corso

## Introduzione

Questa lezione spiega come eseguire gli esempi di codice di questo corso.

## Unisciti ad Altri Studenti e Ricevi Aiuto

Prima di iniziare a clonare il tuo repo, unisciti al [canale Discord AI Agents For Beginners](https://aka.ms/ai-agents/discord) per ricevere aiuto con la configurazione, porre domande sul corso o connetterti con altri studenti.

## Clona o Fai Fork di questo Repo

Per cominciare, clona o fai un fork del repository GitHub. Questo creerà una tua versione del materiale del corso così potrai eseguire, testare e modificare il codice!

Puoi farlo cliccando sul link per <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fare il fork del repo</a>

Ora dovresti avere la tua versione forkata di questo corso al link seguente:

![Forked Repo](../../../translated_images/it/forked-repo.33f27ca1901baa6a.webp)

### Clonazione Leggera (consigliata per workshop / Codespaces)

  >Il repository completo può essere grande (~3 GB) se scarichi tutta la cronologia e tutti i file. Se partecipi solo al workshop o ti servono solo alcune cartelle delle lezioni, una clonazione leggera (o clonazione sparsa) evita la maggior parte del download troncando la cronologia e/o saltando i blob.

#### Clonazione leggera rapida — cronologia minima, tutti i file

Sostituisci `<your-username>` nei comandi sotto con l'URL del tuo fork (o l'URL upstream se preferisci).

Per clonare solo la cronologia dell'ultimo commit (download piccolo):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Per clonare un ramo specifico:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Clonazione parziale (sparsa) — blob minimi + solo cartelle selezionate

Questo usa la clonazione parziale e sparse-checkout (richiede Git 2.25+ e si consiglia una versione moderna di Git con supporto clonazione parziale):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Entra nella cartella del repo:

```bash|powershell
cd ai-agents-for-beginners
```

Poi specifica quali cartelle vuoi (l'esempio sotto ne mostra due):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Dopo essere clonati e aver verificato i file, se ti servono solo i file e vuoi liberare spazio (senza cronologia git), elimina i metadati del repository (💀 irreversibile — perderai tutte le funzionalità Git: no commit, pull, push o accesso cronologia).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Usare GitHub Codespaces (consigliato per evitare grossi download locali)

- Crea un nuovo Codespace per questo repo tramite l'[interfaccia GitHub](https://github.com/codespaces).  

- Nel terminale del Codespace appena creato, esegui uno dei comandi di clonazione leggera/sparsa sopra per portare solo le cartelle delle lezioni necessarie nell'ambiente Codespace.
- Opzionale: dopo il clone dentro Codespaces, rimuovi .git per liberare spazio extra (vedi comandi di rimozione sopra).
- Nota: Se preferisci aprire il repo direttamente in Codespaces (senza un clone extra), tieni presente che Codespaces costruirà l'ambiente devcontainer e potrebbe comunque fornire più di quello che ti serve. Clonare una copia leggera dentro un nuovo Codespace ti dà più controllo sull'uso del disco.

#### Consigli

- Sostituisci sempre l'URL del clone con quello del tuo fork se vuoi modificare/commitare.
- Se in seguito ti serve più cronologia o file, puoi recuperarli o regolare sparse-checkout per includere altre cartelle.

## Esecuzione del Codice

Questo corso offre una serie di Jupyter Notebooks da eseguire per acquisire esperienza pratica nel costruire AI Agents.

Gli esempi di codice usano **Microsoft Agent Framework (MAF)** con il `FoundryChatClient`, che si collega a **Microsoft Foundry Agent Service V2** (l'API Responses) attraverso **Microsoft Foundry**.

Tutti i notebook Python sono etichettati `*-python-agent-framework.ipynb`.

## Requisiti

- Python 3.12+
  - **NOTA**: Se non hai Python3.12 installato, assicurati di installarlo. Crea poi il tuo venv usando python3.12 per garantire che vengano installate le versioni corrette dal file requirements.txt.
  
    >Esempio

    Crea la directory venv Python:

    ```bash|powershell
    python -m venv venv
    ```

    Poi attiva l'ambiente venv per:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Per i codici di esempio che usano .NET, assicurati di installare il [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) o versione successiva. Poi verifica la versione .NET SDK installata:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Necessaria per l'autenticazione. Installala da [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Sottoscrizione Azure** — Per accedere a Microsoft Foundry e Microsoft Foundry Agent Service.
- **Progetto Microsoft Foundry** — Un progetto con un modello distribuito (es. `gpt-4.1-mini`). Vedi [Passo 1](#passo-1-crea-un-progetto-microsoft-foundry) sotto.

Abbiamo incluso un file `requirements.txt` nella radice di questo repository che contiene tutti i pacchetti Python necessari per eseguire gli esempi di codice.

Puoi installarli eseguendo il seguente comando nel terminale alla radice del repository:

```bash|powershell
pip install -r requirements.txt
```

Consigliamo di creare un ambiente virtuale Python per evitare conflitti e problemi.

## Configura VSCode

Assicurati di usare la versione corretta di Python in VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Configura Microsoft Foundry e Microsoft Foundry Agent Service

### Passo 1: Crea un Progetto Microsoft Foundry

Ti serve un **hub** e un **progetto** Microsoft Foundry con un modello distribuito per eseguire i notebook.

1. Vai su [ai.azure.com](https://ai.azure.com) e accedi con il tuo account Azure.
2. Crea un **hub** (o usa uno esistente). Vedi: [Panoramica risorse hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. All'interno dell'hub, crea un **progetto**.
4. Distribuisci un modello (es., `gpt-4.1-mini`) da **Models + Endpoints** → **Deploy model**.

### Passo 2: Recupera l'Endpoint del Progetto e il Nome della Distribuzione del Modello

Dal tuo progetto nel portale Microsoft Foundry:

- **Project Endpoint** — Vai alla pagina **Overview** e copia l'URL dell'endpoint.

![Project Connection String](../../../translated_images/it/project-endpoint.8cf04c9975bbfbf1.webp)

- **Nome Distribuzione Modello** — Vai su **Models + Endpoints**, seleziona il modello distribuito e annota il **Deployment name** (es., `gpt-4.1-mini`).

### Passo 3: Accedi ad Azure con `az login`

Tutti i notebook usano **`AzureCliCredential`** per l'autenticazione — nessuna chiave API da gestire. Questo richiede di essere connessi tramite Azure CLI.

1. **Installa Azure CLI** se non l'hai già fatto: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Accedi** eseguendo:

    ```bash|powershell
    az login
    ```

    Oppure se sei in un ambiente remoto/Codespace senza browser:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Se ti viene chiesto, seleziona la sottoscrizione** — scegli quella che contiene il tuo progetto Foundry.

4. **Verifica** di essere connesso:

    ```bash|powershell
    az account show
    ```

> **Perché `az login`?** I notebook si autenticano usando `AzureCliCredential` dal pacchetto `azure-identity`. Ciò significa che la sessione Azure CLI fornisce le credenziali — nessuna chiave API o segreti nel file `.env`. Questa è una [best practice per la sicurezza](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Passo 4: Crea il tuo file `.env`

Copia il file di esempio:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Apri `.env` e compila questi due valori:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Variabile | Dove trovarla |
|----------|--------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Portale Foundry → il tuo progetto → pagina **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Portale Foundry → **Models + Endpoints** → nome del modello distribuito |

Questo è tutto per la maggior parte delle lezioni! I notebook si autenticano automaticamente tramite la tua sessione `az login`.

### Passo 5: Installa le Dipendenze Python

```bash|powershell
pip install -r requirements.txt
```

Consigliamo di eseguire questo dentro l'ambiente virtuale creato prima.

## Configurazione Aggiuntiva per la Lezione 5 (Agentic RAG)

La lezione 5 usa **Azure AI Search** per la generazione aumentata da recupero. Se prevedi di eseguire quella lezione, aggiungi queste variabili al tuo file `.env`:

| Variabile | Dove trovarla |
|----------|--------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Portale Azure → la tua risorsa **Azure AI Search** → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Portale Azure → la tua risorsa **Azure AI Search** → **Settings** → **Keys** → chiave amministratore primaria |

## Configurazione Aggiuntiva per Lezioni che Chiamano Diretto Azure OpenAI (Lezioni 6 e 8)

Alcuni notebook delle lezioni 6 e 8 chiamano **Azure OpenAI** direttamente (usando l'**API Responses**) invece di usare un progetto Microsoft Foundry. Questi esempi prima usavano GitHub Models, ora deprecati (ritirati a luglio 2026) e che non supportano l'API Responses. Se prevedi di eseguire questi esempi, aggiungi queste variabili al tuo `.env`:

| Variabile | Dove trovarla |
|----------|--------------|
| `AZURE_OPENAI_ENDPOINT` | Portale Azure → tua risorsa **Azure OpenAI** → **Keys and Endpoint** → Endpoint (es. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Nome del modello distribuito (es. `gpt-4.1-mini`) che supporta l'API Responses |
| `AZURE_OPENAI_API_KEY` | Opzionale — solo se usi autenticazione basata su chiave invece di `az login` / Entra ID |

> L'API Responses usa l'endpoint stabile `/openai/v1/`, quindi non serve specificare `api-version`. Accedi con `az login` per usare l'autenticazione Entra ID senza chiavi.

## Provider Alternativo: MiniMax (Compatibile OpenAI)

[MiniMax](https://platform.minimaxi.com/) fornisce modelli con contesto esteso (fino a 204K token) tramite un'API compatibile OpenAI. Poiché `OpenAIChatClient` di Microsoft Agent Framework funziona con qualsiasi endpoint compatibile OpenAI, puoi usare MiniMax come alternativa a Azure OpenAI o OpenAI.

Aggiungi queste variabili al tuo file `.env`:

| Variabile | Dove trovarla |
|----------|--------------|
| `MINIMAX_API_KEY` | [Piattaforma MiniMax](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | Usa `https://api.minimax.io/v1` (valore di default) |
| `MINIMAX_MODEL_ID` | Nome del modello da usare (es., `MiniMax-M3`) |

**Modelli esempio**: `MiniMax-M3` (consigliato), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (risposte più veloci). I nomi e la disponibilità dei modelli possono cambiare, e l'accesso a un modello può dipendere dal tuo account o regione — controlla la [Piattaforma MiniMax](https://platform.minimaxi.com/) per la lista aggiornata. Se `MiniMax-M3` non è disponibile sul tuo account, imposta `MINIMAX_MODEL_ID` su un modello a cui hai accesso (es. `MiniMax-M2.7`).

Gli esempi di codice che usano `OpenAIChatClient` (es., il workflow di prenotazione hotel della Lezione 14) rileveranno automaticamente la configurazione MiniMax quando `MINIMAX_API_KEY` è impostata.

## Provider Alternativo: Foundry Local (Esegui Modelli in Locale)

[Foundry Local](https://foundrylocal.ai) è un runtime leggero che scarica, gestisce e serve modelli linguistici **interamente sul tuo computer** tramite un'API compatibile OpenAI — niente cloud, nessuna sottoscrizione Azure e nessuna chiave API. È una grande opzione per sviluppo offline, sperimentare senza costi cloud o mantenere i dati sul dispositivo.

Poiché `OpenAIChatClient` di Microsoft Agent Framework funziona con qualsiasi endpoint compatibile OpenAI, Foundry Local è una valida alternativa locale a Azure OpenAI.

**1. Installa Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Scarica ed esegui un modello** (questo avvia anche il servizio locale):

```bash
foundry model list          # vedere i modelli disponibili
foundry model run phi-4-mini
```

**3. Installa l'SDK Python** usato per rilevare l'endpoint locale:

```bash
pip install foundry-local-sdk
```

**4. Punta Microsoft Agent Framework al tuo modello locale:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Scarica (se necessario) e serve il modello localmente, quindi scopre l'endpoint/porta.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # es. http://localhost:<port>/v1
    api_key=manager.api_key,        # sempre "non richiesto" per Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Nota:** Foundry Local espone un endpoint compatibile OpenAI per **Chat Completions**. Usalo per sviluppo locale e scenari offline. Per l'intero set di funzionalità dell'**API Responses** (conversazioni con stato, orchestrazione di strumenti profonda e sviluppo stile agent), punta ad **Azure OpenAI** o un progetto **Microsoft Foundry** come mostrato nelle lezioni. Consulta la [documentazione Foundry Local](https://foundrylocal.ai) per il catalogo modelli attuale e supporto piattaforma.


## Configurazione aggiuntiva per la Lezione 8 (Workflow con Bing Grounding)

Il notebook del workflow condizionale nella lezione 8 utilizza **Bing grounding** tramite Microsoft Foundry. Se prevedi di eseguire quel campione, aggiungi questa variabile al tuo file `.env`:

| Variabile | Dove trovarla |
|----------|-----------------|
| `BING_CONNECTION_ID` | Portale Microsoft Foundry → il tuo progetto → **Gestione** → **Risorse connesse** → la tua connessione Bing → copia l’ID della connessione |

## Risoluzione dei problemi

### Errori di verifica del certificato SSL su macOS

Se sei su macOS e riscontri un errore come:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Questo è un problema noto di Python su macOS dove i certificati SSL di sistema non sono automaticamente considerati affidabili. Prova le seguenti soluzioni in ordine:

**Opzione 1: Esegui lo script Install Certificates di Python (consigliato)**

```bash
# Sostituisci 3.XX con la versione di Python installata (ad esempio, 3.12 o 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Opzione 2: Usa `connection_verify=False` nel tuo notebook (solo per notebook Modelli GitHub)**

Nel notebook della Lezione 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), è già inclusa una soluzione temporanea commentata. Decommenta `connection_verify=False` quando crei il client:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Disabilita la verifica SSL se incontri errori di certificato
)
```

> **⚠️ Attenzione:** Disabilitare la verifica SSL (`connection_verify=False`) riduce la sicurezza saltando la validazione del certificato. Usalo solo come soluzione temporanea in ambienti di sviluppo, mai in produzione.

**Opzione 3: Installa e usa `truststore`**

```bash
pip install truststore
```

Poi aggiungi quanto segue in cima al tuo notebook o script prima di effettuare qualsiasi chiamata di rete:

```python
import truststore
truststore.inject_into_ssl()
```

## Bloccato da qualche parte?

Se riscontri problemi con questa configurazione, entra nella nostra <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> o <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">apri un problema</a>.

## Prossima lezione

Ora sei pronto per eseguire il codice di questo corso. Buono studio nel mondo degli Agenti AI!

[Introduzione agli Agenti AI e Casi d’uso degli Agenti](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->