# AGENTS.md

## Panoramica del Progetto

Questo repository contiene "AI Agents for Beginners" - un corso educativo completo che insegna tutto ciò che serve per costruire Agenti AI. Il corso è composto da 18 lezioni (numerate 00-18) che coprono le basi, i pattern di design, i framework, il deployment in produzione, agenti locali/su dispositivo e la sicurezza degli agenti AI.

**Tecnologie Chiave:**
- Python 3.12+
- Jupyter Notebooks per apprendimento interattivo
- Framework AI: Microsoft Agent Framework (MAF)
- Servizi Azure AI: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Architettura:**
- Struttura basata sulle lezioni (cartelle 00-15+)
- Ogni lezione contiene: documentazione README, esempi di codice (notebook Jupyter) e immagini
- Supporto multilingue tramite sistema di traduzione automatica
- Un notebook Python per lezione che usa Microsoft Agent Framework

## Comandi di Setup

### Prerequisiti
- Python 3.12 o superiore
- Sottoscrizione Azure (per Microsoft Foundry)
- Azure CLI installato e autenticato (`az login`)

### Setup Iniziale

1. **Clona o fai fork del repository:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # OPPURE
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Crea e attiva un ambiente virtuale Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Su Windows: venv\Scripts\activate
   ```

3. **Installa le dipendenze:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configura le variabili d'ambiente:**
   ```bash
   cp .env.example .env
   # Modifica .env con le tue chiavi API e gli endpoint
   ```

### Variabili d'Ambiente Richieste

Per **Microsoft Foundry** (richiesto):
- `AZURE_AI_PROJECT_ENDPOINT` - endpoint del progetto Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - nome del deployment modello (es. gpt-4.1-mini)

Per **Azure AI Search** (Lezione 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - endpoint Azure AI Search
- `AZURE_SEARCH_API_KEY` - chiave API Azure AI Search

Autenticazione: Esegui `az login` prima di eseguire i notebook (usa `AzureCliCredential`).

## Flusso di Lavoro per lo Sviluppo

### Esecuzione dei Jupyter Notebooks

Ogni lezione contiene più notebook Jupyter per diversi framework:

1. **Avvia Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Naviga nella cartella della lezione** (es. `01-intro-to-ai-agents/code_samples/`)

3. **Apri ed esegui i notebook:**
   - `*-python-agent-framework.ipynb` - Usa Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Usa Microsoft Agent Framework (.NET)

### Lavorare con Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Richiede sottoscrizione Azure
- Usa `FoundryChatClient` per Agent Service V2 (agenti visibili nel portale Foundry)
- Pronto per la produzione con osservabilità integrata
- Pattern di file: `*-python-agent-framework.ipynb`

## Istruzioni per i Test

Questo è un repository educativo con codice esempio piuttosto che codice di produzione con test automatizzati. Per verificare il setup e le modifiche:

### Test Manuale

1. **Test ambiente Python:**
   ```bash
   python --version  # Dovrebbe essere 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Test esecuzione notebook:**
   ```bash
   # Converti il notebook in script ed esegui (testa le importazioni)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Verifica variabili d'ambiente:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Esecuzione di Singoli Notebook

Apri i notebook in Jupyter ed esegui le celle in sequenza. Ogni notebook è autonomo e include:
- Istruzioni di importazione
- Caricamento configurazione
- Implementazioni di esempio degli agenti
- Output attesi nelle celle markdown

### Smoke-Testing degli Agenti Deployati

Per le lezioni in cui un agente è deployato come agente ospitato Microsoft Foundry (01, 04, 05, 16), il repo contiene dei cataloghi di smoke-test sotto `tests/` eseguiti dal workflow `.github/workflows/smoke-test.yml` tramite l'azione [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test). Questi sono un controllo post-deploy leggero (l'agente è raggiungibile e segue le aspettative di base dei prompt?), che integra la pipeline di valutazione delle Lezioni 10 e 16. Vedi [tests/README.md](./tests/README.md) per la mappatura catalogo→lezione→agente. La Lezione 17 si esegue localmente con Foundry Local e non ha endpoint ospitato, quindi è validata eseguendo direttamente il suo notebook.

## Stile del Codice

### Convenzioni Python

- **Versione Python**: 3.12+
- **Stile Codice**: Seguire le convenzioni standard Python PEP 8
- **Notebook**: Usare chiare celle markdown per spiegare i concetti
- **Importazioni**: Raggruppare per libreria standard, terze parti, importazioni locali

### Convenzioni Jupyter Notebook

- Includere celle markdown descrittive prima delle celle di codice
- Aggiungere esempi di output nei notebook a scopo di riferimento
- Usare nomi variabili chiari che corrispondano ai concetti della lezione
- Mantenere ordine di esecuzione lineare nel notebook (cella 1 → 2 → 3...)

### Organizzazione dei File

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Costruzione e Deployment

### Costruzione Documentazione

Questo repository usa Markdown per la documentazione:
- File README.md in ogni cartella lezione
- README.md principale nella radice del repository
- Sistema di traduzione automatica tramite GitHub Actions

### Pipeline CI/CD

Localizzata in `.github/workflows/`:

1. **co-op-translator.yml** - Traduzione automatica in 50+ lingue
2. **welcome-issue.yml** - Accoglie i creatori di nuove issue
3. **welcome-pr.yml** - Accoglie i nuovi contributori di pull request

### Deployment

Questo è un repository educativo - nessun processo di deployment. Gli utenti:
1. Fanno fork o clonano il repository
2. Eseguono notebook localmente o in GitHub Codespaces
3. Imparano modificando e sperimentando con gli esempi

## Linee Guida per le Pull Request

### Prima di Inviare

1. **Testa le tue modifiche:**
   - Esegui completamente i notebook interessati
   - Verifica che tutte le celle vengano eseguite senza errori
   - Controlla che gli output siano appropriati

2. **Aggiornamenti documentazione:**
   - Aggiorna README.md se aggiungi nuovi concetti
   - Aggiungi commenti nei notebook per codice complesso
   - Assicurati che le celle markdown spieghino lo scopo

3. **Modifiche ai file:**
   - Evita di commettere file `.env` (usa `.env.example`)
   - Non commettere directory `venv/` o `__pycache__/`
   - Mantieni output notebook quando mostrano concetti
   - Rimuovi file temporanei e notebook di backup (`*-backup.ipynb`)

### Formato Titolo PR

Usa titoli descrittivi:
- `[Lesson-XX] Aggiungi nuovo esempio per <concetto>`
- `[Fix] Correggi errore di battitura nel README della lezione-XX`
- `[Update] Migliora esempio di codice nella lezione-XX`
- `[Docs] Aggiorna istruzioni di setup`

### Controlli Richiesti

- I notebook devono eseguire senza errori
- I file README devono essere chiari e accurati
- Seguire i pattern di codice esistenti nel repository
- Mantenere coerenza con altre lezioni

## Note Aggiuntive

### Errori Comuni

1. **Incompatibilità versione Python:**
   - Assicurati di usare Python 3.12+
   - Alcuni pacchetti potrebbero non funzionare con versioni precedenti
   - Usa `python3 -m venv` per specificare esplicitamente la versione Python

2. **Variabili d'ambiente:**
   - Crea sempre `.env` partendo da `.env.example`
   - Non commettere il file `.env` (è nel `.gitignore`)
   - Effettua login con `az login` per autenticazione Entra ID senza chiavi

3. **Conflitti tra pacchetti:**
   - Usa un ambiente virtuale nuovo
   - Installa da `requirements.txt` piuttosto che pacchetti singoli
   - Alcuni notebook potrebbero richiedere pacchetti aggiuntivi indicati nelle celle markdown

4. **Servizi Azure:**
   - I servizi AI Azure richiedono sottoscrizione attiva
   - Alcune funzionalità sono specifiche per regione
   - Assicurati che il deployment del modello Azure OpenAI supporti l'API Responses

### Percorso di Apprendimento

Progressione consigliata nelle lezioni:
1. **00-course-setup** - Inizia qui per configurare l'ambiente
2. **01-intro-to-ai-agents** - Comprendere le basi degli agenti AI
3. **02-explore-agentic-frameworks** - Imparare i diversi framework
4. **03-agentic-design-patterns** - Pattern di design principali
5. Continua attraverso le lezioni numerate in sequenza

### Scelta del Framework

Scegli il framework in base ai tuoi obiettivi:
- **Tutte le lezioni**: Microsoft Agent Framework (MAF) con `FoundryChatClient`
- **Agenti registrati lato server** in Microsoft Foundry Agent Service V2 e visibili nel portale Foundry

### Ottenere Aiuto

- Unisciti al [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Consulta i file README delle lezioni per indicazioni specifiche
- Controlla il principale [README.md](./README.md) per panoramica corso
- Consulta [Course Setup](./00-course-setup/README.md) per istruzioni dettagliate di configurazione

### Contributi

Questo è un progetto educativo open. Contributi benvenuti:
- Migliorare gli esempi di codice
- Correggere errori di battitura o bug
- Aggiungere commenti chiarificatori
- Suggerire nuovi argomenti per lezioni
- Tradurre in lingue aggiuntive

Vedi [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) per necessità attuali.

## Contesto Specifico del Progetto

### Supporto Multilingue

Questo repository usa un sistema di traduzione automatica:
- Supporta 50+ lingue
- Traduzioni nelle cartelle `/translations/<codice-lingua>/`
- Workflow GitHub Actions gestisce aggiornamenti traduzioni
- I file sorgente sono in inglese alla radice del repository

### Struttura della Lezione

Ogni lezione segue uno schema coerente:
1. Miniatura video con link
2. Contenuto scritto della lezione (README.md)
3. Esempi di codice in più framework
4. Obiettivi di apprendimento e prerequisiti
5. Risorse aggiuntive di apprendimento collegate

### Nomenclatura Campione di Codice

Formato: `<numero-lezione>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Lezione 1, MAF Python
- `14-sequential.ipynb` - Lezione 14, pattern avanzati MAF
- `16-python-agent-framework.ipynb` - Lezione 16, agente assistenza clienti in produzione
- `17-local-agent-foundry-local.ipynb` - Lezione 17, agente locale con Foundry Local + Qwen

### Cartelle Speciali

- `translated_images/` - Immagini localizzate per le traduzioni
- `images/` - Immagini originali per il contenuto inglese
- `.devcontainer/` - Configurazione contenitore di sviluppo VS Code
- `.github/` - Workflow e template GitHub Actions

### Dipendenze

Pacchetti chiave da `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Supporto protocollo Agent-to-Agent
- `azure-ai-inference`, `azure-ai-projects` - Servizi Azure AI
- `azure-identity` - Autenticazione Azure (AzureCliCredential)
- `azure-search-documents` - Integrazione Azure AI Search
- `mcp[cli]` - Supporto Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->