# Configurazione del Corso

## Introduzione

Questa lezione spiegherà come eseguire gli esempi di codice di questo corso.

## Unisciti ad Altri Studenti e Ricevi Aiuto

Prima di iniziare a clonare il tuo repository, unisciti al [canale Discord AI Agents For Beginners](https://aka.ms/ai-agents/discord) per ricevere aiuto con la configurazione, domande sul corso, o per connetterti con altri studenti.

## Clona o Fai il Fork di questo Repo

Per iniziare, per favore clona o fai il fork del Repository GitHub. Questo creerà la tua versione del materiale del corso così potrai eseguire, testare e modificare il codice!

Puoi farlo cliccando sul link per <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fare il fork del repo</a>

Ora dovresti avere la tua versione forkata di questo corso nel link seguente:

![Forked Repo](../../../translated_images/it/forked-repo.33f27ca1901baa6a.webp)

### Clonazione Shallow (consigliata per workshop / Codespaces)

  >Il repository completo può essere grande (~3 GB) quando scarichi tutta la storia e tutti i file. Se stai partecipando solo al workshop o ti servono solo alcune cartelle delle lezioni, una clonazione shallow (o sparse) evita gran parte del download troncando la storia e/o saltando i blob.

#### Clonazione shallow veloce — storia minima, tutti i file

Sostituisci `<your-username>` nei comandi sottostanti con l’URL del tuo fork (o l'URL upstream se preferisci).

Per clonare solo la storia dell’ultimo commit (download piccolo):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Per clonare un branch specifico:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Clonazione parziale (sparse) — blob minimi + solo cartelle selezionate

Questo usa la clonazione parziale e sparse-checkout (richiede Git 2.25+ e si consiglia un Git moderno con supporto per clonazione parziale):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Entra nella cartella del repo:

```bash|powershell
cd ai-agents-for-beginners
```

Poi specifica quali cartelle vuoi (l’esempio sotto ne mostra due):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Dopo la clonazione e verifica dei file, se ti servono solo i file e vuoi liberare spazio (niente storia git), per favore elimina i metadati del repository (💀irreversibile — perderai tutte le funzionalità Git: nessun commit, pull, push o accesso alla storia).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Usare GitHub Codespaces (consigliato per evitare grandi download locali)

- Crea un nuovo Codespace per questo repo via [GitHub UI](https://github.com/codespaces).

- Nel terminale del codespace appena creato, esegui uno dei comandi shallow/sparse di cui sopra per portare solo le cartelle delle lezioni che ti servono nello spazio di lavoro del Codespace.
- Opzionale: dopo la clonazione dentro Codespaces, rimuovi .git per recuperare spazio extra (vedi comandi di rimozione sopra).
- Nota: Se preferisci aprire direttamente il repo in Codespaces (senza clonazione aggiuntiva), considera che Codespaces costruirà l’ambiente devcontainer e potrebbe provisionare più di quanto ti serva. Clonare una copia shallow dentro un Codespace fresco ti dà più controllo sull’uso del disco.

#### Consigli

- Sostituisci sempre l’URL di clonazione con il tuo fork se vuoi modificare/fare commit.
- Se in seguito ti servono più file o storia, puoi recuperarli o aggiustare sparse-checkout per includere cartelle aggiuntive.

## Esecuzione del Codice

Questo corso offre una serie di Jupyter Notebooks che puoi eseguire per fare esperienza pratica costruendo Agenti AI.

Gli esempi di codice usano **Microsoft Agent Framework (MAF)** con `AzureAIProjectAgentProvider`, che si connette a **Azure AI Agent Service V2** (l’API Risposte) tramite **Microsoft Foundry**.

Tutti i notebook Python sono etichettati `*-python-agent-framework.ipynb`.

## Requisiti

- Python 3.12+
  - **NOTA**: Se non hai Python 3.12 installato, assicurati di installarlo. Crea poi il tuo venv usando python3.12 per assicurarti che le versioni corrette siano installate dal file requirements.txt.
  
    >Esempio

    Crea la directory venv Python:

    ```bash|powershell
    python -m venv venv
    ```

    Poi attiva l’ambiente venv per:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Per i codici di esempio in .NET, assicurati di installare [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) o superiore. Poi controlla la versione installata del SDK .NET:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Necessaria per l’autenticazione. Installa da [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure Subscription** — Per accedere a Microsoft Foundry e Azure AI Agent Service.
- **Progetto Microsoft Foundry** — Un progetto con un modello distribuito (es. `gpt-4o`). Vedi [Step 1](#passo-1-crea-un-progetto-microsoft-foundry) sotto.

Abbiamo incluso un file `requirements.txt` nella radice di questo repository che contiene tutti i pacchetti Python necessari per eseguire gli esempi di codice.

Puoi installarli eseguendo il comando seguente nel tuo terminale alla radice del repository:

```bash|powershell
pip install -r requirements.txt
```

Raccomandiamo di creare un ambiente virtuale Python per evitare conflitti e problemi.

## Configura VSCode

Assicurati di usare la versione corretta di Python in VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Configurare Microsoft Foundry e Azure AI Agent Service

### Passo 1: Crea un Progetto Microsoft Foundry

Ti serve un **hub** e un **progetto** Azure AI Foundry con un modello distribuito per eseguire i notebook.

1. Vai su [ai.azure.com](https://ai.azure.com) e accedi col tuo account Azure.
2. Crea un **hub** (o usa uno esistente). Vedi: [Panoramica risorse Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. All’interno dell’hub, crea un **progetto**.
4. Distribuisci un modello (es. `gpt-4o`) da **Models + Endpoints** → **Deploy model**.

### Passo 2: Recupera il tuo Endpoint di Progetto e il Nome del Deployment del Modello

Dal tuo progetto nel portale Microsoft Foundry:

- **Endpoint del Progetto** — Vai alla pagina **Overview** e copia l’URL dell’endpoint.

![Project Connection String](../../../translated_images/it/project-endpoint.8cf04c9975bbfbf1.webp)

- **Nome del Deployment del Modello** — Vai in **Models + Endpoints**, seleziona il modello distribuito e annota il **Deployment name** (es. `gpt-4o`).

### Passo 3: Accedi ad Azure con `az login`

Tutti i notebook usano **`AzureCliCredential`** per l’autenticazione — nessuna chiave API da gestire. Questo richiede che tu sia loggato tramite Azure CLI.

1. **Installa Azure CLI** se non l’hai già fatto: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Accedi** eseguendo:

    ```bash|powershell
    az login
    ```

    O se sei in un ambiente remoto/Codespace senza browser:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Seleziona la tua subscription** se richiesto — scegli quella che contiene il tuo progetto Foundry.

4. **Verifica** di essere loggato:

    ```bash|powershell
    az account show
    ```

> **Perché `az login`?** I notebook si autenticano usando `AzureCliCredential` del pacchetto `azure-identity`. Ciò significa che la sessione Azure CLI fornisce le credenziali — niente chiavi API o segreti nel file `.env`. Questa è una [buona pratica di sicurezza](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Passo 4: Crea il tuo File `.env`

Copia il file d’esempio:

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
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| Variabile | Dove trovarla |
|----------|---------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Portale Foundry → il tuo progetto → pagina **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Portale Foundry → **Models + Endpoints** → nome del tuo modello distribuito |

Questo è tutto per la maggior parte delle lezioni! I notebook si autenticheranno automaticamente usando la tua sessione `az login`.

### Passo 5: Installa le Dipendenze Python

```bash|powershell
pip install -r requirements.txt
```

Consigliamo di eseguire questo comando nell’ambiente virtuale che hai creato prima.

## Configurazione Aggiuntiva per la Lezione 5 (Agentic RAG)

La lezione 5 usa **Azure AI Search** per l’estrazione aumentata dal testo. Se prevedi di eseguire quella lezione, aggiungi queste variabili nel tuo file `.env`:

| Variabile | Dove trovarla |
|----------|---------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Portale Azure → la tua risorsa **Azure AI Search** → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Portale Azure → la tua risorsa **Azure AI Search** → **Settings** → **Keys** → chiave amministratore primaria |

## Configurazione Aggiuntiva per le Lezioni 6 e 8 (Modelli GitHub)

Alcuni notebook delle lezioni 6 e 8 usano **GitHub Models** invece di Azure AI Foundry. Se prevedi di eseguire quegli esempi, aggiungi queste variabili nel tuo file `.env`:

| Variabile | Dove trovarla |
|----------|---------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | Usa `https://models.inference.ai.azure.com` (valore predefinito) |
| `GITHUB_MODEL_ID` | Nome modello da usare (es. `gpt-4o-mini`) |

## Provider Alternativo: MiniMax (Compatibile OpenAI)

[MiniMax](https://platform.minimaxi.com/) fornisce modelli a contesto esteso (fino a 204K token) tramite API compatibili OpenAI. Poiché `OpenAIChatClient` del Microsoft Agent Framework funziona con qualsiasi endpoint compatibile OpenAI, puoi usare MiniMax come alternativa drop-in ai Modelli GitHub o OpenAI.

Aggiungi queste variabili nel tuo file `.env`:

| Variabile | Dove trovarla |
|----------|---------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | Usa `https://api.minimax.io/v1` (valore predefinito) |
| `MINIMAX_MODEL_ID` | Nome modello da usare (es. `MiniMax-M2.7`) |

**Modelli disponibili**: `MiniMax-M2.7` (consigliato), `MiniMax-M2.7-highspeed` (risposte più veloci)

Gli esempi di codice che usano `OpenAIChatClient` (es. flusso prenotazione hotel della Lezione 14) rileveranno e useranno automaticamente la configurazione MiniMax quando `MINIMAX_API_KEY` è impostato.

## Configurazione Aggiuntiva per la Lezione 8 (Bing Grounding Workflow)

Il notebook condizionale della lezione 8 usa **Bing grounding** tramite Azure AI Foundry. Se prevedi di eseguire quel campione, aggiungi questa variabile nel tuo file `.env`:

| Variabile | Dove trovarla |
|----------|---------------|
| `BING_CONNECTION_ID` | Portale Azure AI Foundry → il tuo progetto → **Management** → **Connected resources** → la tua connessione Bing → copia l’ID connessione |

## Risoluzione Problemi

### Errori di Verifica Certificato SSL su macOS

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

**Opzione 2: Usa `connection_verify=False` nel notebook (solo per i notebook Modelli GitHub)**

Nel notebook della Lezione 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), è già incluso un workaround commentato. Decommenta `connection_verify=False` durante la creazione del client:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Disabilita la verifica SSL se incontri errori di certificato
)
```

> **⚠️ Avviso:** Disabilitare la verifica SSL (`connection_verify=False`) riduce la sicurezza saltando la validazione del certificato. Usa questo solo come workaround temporaneo in ambienti di sviluppo, mai in produzione.

**Opzione 3: Installa e usa `truststore`**

```bash
pip install truststore
```

Poi aggiungi quanto segue in cima al notebook o script prima di fare chiamate di rete:

```python
import truststore
truststore.inject_into_ssl()
```

## Bloccato da qualche parte?

Se hai problemi con la configurazione, entra nel nostro <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> o <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">crea un issue</a>.

## Prossima Lezione

Ora sei pronto per eseguire il codice di questo corso. Buono studio nel mondo degli Agenti AI!

[Introduzione agli Agenti AI e Casi d'Uso degli Agenti](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa dovrebbe essere considerato la fonte autorevole. Per informazioni critiche, si consiglia la traduzione professionale umana. Non ci assumiamo responsabilità per eventuali incomprensioni o interpretazioni errate derivanti dall'uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->