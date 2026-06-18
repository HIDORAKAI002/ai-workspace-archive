# Generatore di Piani di Studio con Chainlit & Microsoft Learn Docs MCP

## Prerequisiti

- Python 3.8 o superiore
- pip (gestore pacchetti Python)
- Accesso a Internet per connettersi al server Microsoft Learn Docs MCP

## Installazione

1. Clona questo repository o scarica i file del progetto.
2. Installa le dipendenze richieste:

   ```bash
   pip install -r requirements.txt
   ```

## Utilizzo

### Scenario 1: Query Semplice a Docs MCP
Un client da riga di comando che si connette al server Docs MCP, invia una query e stampa il risultato.

1. Esegui lo script:
   ```bash
   python scenario1.py
   ```
2. Inserisci la tua domanda sulla documentazione al prompt.

### Scenario 2: Generatore di Piani di Studio (App Web Chainlit)
Un'interfaccia web (usando Chainlit) che permette agli utenti di generare un piano di studio personalizzato, settimana per settimana, per qualsiasi argomento tecnico.

1. Avvia l'app Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Apri l'URL locale fornito nel terminale (es. http://localhost:8000) nel tuo browser.
3. Nella finestra della chat, inserisci il tuo argomento di studio e il numero di settimane in cui vuoi studiare (es. "certificazione AI-900, 8 settimane").
4. L'app risponderà con un piano di studio settimana per settimana, inclusi link alla relativa documentazione Microsoft Learn.

**Variabili d'Ambiente Richieste:**

Per utilizzare lo Scenario 2 (l'app web Chainlit con Azure OpenAI), devi impostare le seguenti variabili d'ambiente in un file `.env` nella directory `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Compila questi valori con i dettagli della tua risorsa Azure OpenAI prima di eseguire l'app.

> [!TIP]
> Puoi facilmente distribuire i tuoi modelli usando [Microsoft Foundry](https://ai.azure.com/).

### Scenario 3: Documentazione in-Editor con MCP Server in VS Code

Invece di passare da una scheda del browser per cercare documentazione, puoi portare Microsoft Learn Docs direttamente in VS Code usando il server MCP. Questo ti consente di:
- Cercare e leggere la documentazione dentro VS Code senza lasciare l’ambiente di sviluppo.
- Fare riferimento alla documentazione e inserire link direttamente nei tuoi file README o corsi.
- Usare GitHub Copilot e MCP insieme per un flusso di lavoro documentale potenziato dall’IA.

**Esempi di Casi d’Uso:**
- Aggiungere rapidamente link di riferimento a un README mentre scrivi documentazione per corsi o progetti.
- Usare Copilot per generare codice e MCP per trovare e citare immediatamente la documentazione rilevante.
- Restare concentrato nell'editor aumentandone la produttività.

> [!IMPORTANT]
> Assicurati di avere un file di configurazione valido [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) nel tuo workspace (il percorso è `.vscode/mcp.json`).

## Perché Chainlit per lo Scenario 2?

Chainlit è un framework open-source moderno per costruire applicazioni web conversazionali. Facilita la creazione di interfacce basate su chat che si connettono a servizi backend come il server Microsoft Learn Docs MCP. Questo progetto utilizza Chainlit per offrire un modo semplice e interattivo per generare piani di studio personalizzati in tempo reale. Grazie a Chainlit, puoi costruire e distribuire rapidamente strumenti chat-based che migliorano produttività e apprendimento.

## Cosa fa

Questa app permette agli utenti di creare un piano di studio personalizzato semplicemente inserendo un argomento e una durata. L’app analizza il tuo input, interroga il server Microsoft Learn Docs MCP per contenuti rilevanti e organizza i risultati in un piano strutturato, settimana per settimana. Le raccomandazioni di ogni settimana sono visualizzate nella chat, facilitando il monitoraggio e il progresso. L’integrazione garantisce di ricevere sempre le risorse di apprendimento più aggiornate e pertinenti.

## Query di Esempio

Prova queste query nella finestra della chat per vedere come risponde l’app:

- `certificazione AI-900, 8 settimane`
- `Imparare Azure Functions, 4 settimane`
- `Azure DevOps, 6 settimane`
- `Ingegneria dei dati su Azure, 10 settimane`
- `Fondamenti di sicurezza Microsoft, 5 settimane`
- `Power Platform, 7 settimane`
- `Servizi Azure AI, 12 settimane`
- `Architettura cloud, 9 settimane`

Questi esempi mostrano la flessibilità dell’app per diversi obiettivi di apprendimento e tempistiche.

## Riferimenti

- [Documentazione Chainlit](https://docs.chainlit.io/)
- [Documentazione MCP](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->