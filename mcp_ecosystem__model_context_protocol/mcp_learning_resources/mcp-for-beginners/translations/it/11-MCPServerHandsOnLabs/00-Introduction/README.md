# Introduzione all'Integrazione del Database MCP

## 🎯 Cosa Copre Questo Lab

Questo laboratorio introduttivo offre una panoramica completa sulla costruzione di server Model Context Protocol (MCP) con integrazione di database. Comprenderai il caso d'uso aziendale, l'architettura tecnica e le applicazioni reali attraverso il caso d'uso di analisi Zava Retail su https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Panoramica

**Model Context Protocol (MCP)** consente agli assistenti AI di accedere e interagire in modo sicuro con fonti di dati esterne in tempo reale. Quando combinato con l'integrazione del database, MCP sblocca potenti capacità per applicazioni AI guidate dai dati.

Questo percorso di apprendimento ti insegna a costruire server MCP pronti per la produzione che collegano assistenti AI ai dati delle vendite al dettaglio tramite PostgreSQL, implementando modelli aziendali come Row Level Security, ricerca semantica e accesso multi-tenant ai dati.

## Obiettivi di Apprendimento

Al termine di questo lab, sarai in grado di:

- **Definire** il Model Context Protocol e i suoi principali vantaggi per l'integrazione di database  
- **Identificare** i componenti chiave di un'architettura server MCP con database  
- **Comprendere** il caso d'uso Zava Retail e i suoi requisiti aziendali  
- **Riconoscere** i modelli aziendali per un accesso sicuro e scalabile ai database  
- **Elencare** gli strumenti e le tecnologie utilizzati durante questo percorso di apprendimento  

## 🧭 La Sfida: L'AI incontra i Dati del Mondo Reale

### Limitazioni Tradizionali dell'AI

Gli assistenti AI moderni sono incredibilmente potenti ma affrontano limitazioni significative quando lavorano con dati aziendali reali:

| **Sfida** | **Descrizione** | **Impatto Aziendale** |
|---------------|-----------------|-------------------|
| **Conoscenza Statica** | I modelli AI addestrati su dataset fissi non possono accedere ai dati aziendali attuali | Informazioni obsolete, opportunità mancate |
| **Silos di Dati** | Informazioni bloccate in database, API e sistemi inaccessibili all'AI | Analisi incompleta, flussi di lavoro frammentati |
| **Vincoli di Sicurezza** | L'accesso diretto al database solleva preoccupazioni di sicurezza e conformità | Distribuzione limitata, preparazione manuale dei dati |
| **Query complesse** | Gli utenti aziendali necessitano di conoscenze tecniche per estrarre insight dai dati | Adozione ridotta, processi inefficienti |

### La Soluzione MCP

Il Model Context Protocol affronta queste sfide fornendo:

- **Accesso ai Dati in Tempo Reale**: gli assistenti AI interrogano database e API live  
- **Integrazione Sicura**: accesso controllato con autenticazione e permessi  
- **Interfaccia in Linguaggio Naturale**: gli utenti aziendali fanno domande in inglese semplice  
- **Protocollo Standardizzato**: funziona con diverse piattaforme e strumenti AI  

## 🏪 Conosci Zava Retail: Il Nostro Caso di Studio https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Durante questo percorso di apprendimento, costruiremo un server MCP per **Zava Retail**, una catena al dettaglio fai-da-te fittizia con più punti vendita. Questo scenario realistico dimostra un'implementazione MCP di livello enterprise.

### Contesto Aziendale

**Zava Retail** gestisce:
- **8 negozi fisici** nello stato di Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 negozio online** per vendite e-commerce  
- **Catalogo prodotti vario** che include utensili, ferramenta, forniture per giardinaggio e materiali da costruzione  
- **Gestione multilivello** con responsabili di negozio, responsabili regionali e dirigenti  

### Requisiti Aziendali

I responsabili dei negozi e i dirigenti necessitano di analisi AI per:

1. **Analizzare le performance di vendita** tra negozi e periodi temporali  
2. **Tracciare i livelli di inventario** e identificare necessità di rifornimento  
3. **Comprendere il comportamento dei clienti** e i modelli di acquisto  
4. **Scoprire insight sui prodotti** tramite ricerca semantica  
5. **Generare report** con query in linguaggio naturale  
6. **Mantenere la sicurezza dei dati** con controllo accessi basato sui ruoli  

### Requisiti Tecnici

Il server MCP deve fornire:

- **Accesso multi-tenant ai dati** dove i responsabili vedono solo i dati del proprio negozio  
- **Query flessibili** che supportano operazioni SQL complesse  
- **Ricerca semantica** per la scoperta e raccomandazione di prodotti  
- **Dati in tempo reale** che riflettono lo stato attuale del business  
- **Autenticazione sicura** con sicurezza a livello di riga (RLS)  
- **Architettura scalabile** che supporta utenti concorrenti multipli  

## 🏗️ Panoramica dell'Architettura del Server MCP

Il nostro server MCP implementa un'architettura stratificata ottimizzata per l'integrazione del database:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Componenti Chiave

#### **1. Livello Server MCP**
- **FastMCP Framework**: implementazione moderna del server MCP in Python  
- **Registrazione Strumenti**: definizioni dichiarative degli strumenti con sicurezza del tipo  
- **Contesto Richiesta**: gestione identità utente e sessione  
- **Gestione Errori**: robusta gestione degli errori e logging  

#### **2. Livello Integrazione Database**
- **Pooling Connessioni**: gestione efficiente delle connessioni asyncpg  
- **Provider di Schema**: scoperta dinamica degli schemi delle tabelle  
- **Esecutore di Query**: esecuzione SQL sicura con contesto RLS  
- **Gestione Transazioni**: conformità ACID e gestione rollback  

#### **3. Livello Sicurezza**
- **Row Level Security**: RLS di PostgreSQL per isolamento dati multi-tenant  
- **Identità Utente**: autenticazione e autorizzazione dei responsabili di negozio  
- **Controllo Accessi**: permessi granulati e tracciabilità audit  
- **Validazione Input**: prevenzione SQL injection e validazione query  

#### **4. Livello di Potenziamento AI**
- **Ricerca Semantica**: embedding vettoriali per scoperta prodotti  
- **Integrazione Azure OpenAI**: generazione di embedding testuali  
- **Algoritmi di Similarità**: ricerca di similarità coseno con pgvector  
- **Ottimizzazione Ricerca**: indicizzazione e tuning delle prestazioni  

## 🔧 Stack Tecnologico

### Tecnologie Core

| **Componente** | **Tecnologia** | **Scopo** |
|---------------|----------------|-------------|
| **Framework MCP** | FastMCP (Python) | Implementazione moderna server MCP |
| **Database** | PostgreSQL 17 + pgvector | Dati relazionali con ricerca vettoriale |
| **Servizi AI** | Azure OpenAI | Embedding testuali e modelli linguistici |
| **Containerizzazione** | Docker + Docker Compose | Ambiente di sviluppo |
| **Piattaforma Cloud** | Microsoft Azure | Distribuzione in produzione |
| **Integrazione IDE** | VS Code | Chat AI e workflow di sviluppo |

### Strumenti di Sviluppo

| **Strumento** | **Scopo** |
|----------|-------------|
| **asyncpg** | Driver PostgreSQL ad alte prestazioni |
| **Pydantic** | Validazione e serializzazione dati |
| **Azure SDK** | Integrazione servizi cloud |
| **pytest** | Framework di testing |
| **Docker** | Containerizzazione e distribuzione |

### Stack di Produzione

| **Servizio** | **Risorsa Azure** | **Scopo** |
|-------------|-------------------|-------------|
| **Database** | Azure Database for PostgreSQL | Servizio database gestito |
| **Container** | Azure Container Apps | Hosting container serverless |
| **Servizi AI** | Microsoft Foundry | Modelli OpenAI e endpoint |
| **Monitoraggio** | Application Insights | Osservabilità e diagnostica |
| **Sicurezza** | Azure Key Vault | Gestione segreti e configurazioni |

## 🎬 Scenari di Utilizzo Reali

Esploriamo come diversi utenti interagiscono con il nostro server MCP:

### Scenario 1: Revisione Prestazioni Responsabile Negozio

**Utente**: Sarah, responsabile negozio Seattle  
**Obiettivo**: Analizzare le performance di vendita dell'ultimo trimestre

**Query in Linguaggio Naturale**:  
> "Mostrami i primi 10 prodotti per ricavi del mio negozio nel Q4 2024"

**Cosa Succede**:  
1. VS Code AI Chat invia la query al server MCP  
2. Il server MCP identifica il contesto del negozio di Sarah (Seattle)  
3. Le politiche RLS filtrano i dati solo per il negozio di Seattle  
4. Query SQL generata ed eseguita  
5. Risultati formattati e restituiti all’AI Chat  
6. L’AI fornisce analisi e insight  

### Scenario 2: Scoperta Prodotti con Ricerca Semantica

**Utente**: Mike, responsabile inventario  
**Obiettivo**: Trovare prodotti simili a una richiesta cliente

**Query in Linguaggio Naturale**:  
> "Quali prodotti vendiamo simili a 'connettori elettrici waterproof per uso esterno'?"

**Cosa Succede**:  
1. Query processata dallo strumento di ricerca semantica  
2. Azure OpenAI genera il vettore embedding  
3. pgvector esegue la ricerca per similarità  
4. Prodotti correlati classificati per pertinenza  
5. Risultati includono dettagli prodotto e disponibilità  
6. L’AI suggerisce alternative e opportunità di bundle  

### Scenario 3: Analisi Inter-Negozio

**Utente**: Jennifer, responsabile regionale  
**Obiettivo**: Confrontare performance tra tutti i negozi

**Query in Linguaggio Naturale**:  
> "Confronta le vendite per categoria in tutti i negozi negli ultimi 6 mesi"

**Cosa Succede**:  
1. Contesto RLS impostato per accesso manager regionale  
2. Generazione query complessa multi-negozio  
3. Aggregazione dati tra sedi dei negozi  
4. Risultati includono trend e confronti  
5. L’AI individua insight e raccomandazioni  

## 🔒 Approfondimento Sicurezza e Multi-Tenancy

La nostra implementazione dà priorità alla sicurezza a livello enterprise:

### Row Level Security (RLS)

PostgreSQL RLS garantisce isolamento dati:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Gestione Identità Utente

Ogni connessione MCP include:  
- **ID Responsabile Negozio**: identificativo unico per contesto RLS  
- **Assegnazione Ruolo**: permessi e livelli di accesso  
- **Gestione Sessione**: token di autenticazione sicuri  
- **Logging Audit**: cronologia completa degli accessi  

### Protezione dei Dati

Più livelli di sicurezza:  
- **Crittografia Connessione**: TLS per tutte le connessioni al database  
- **Prevenzione SQL Injection**: solo query parametrizzate  
- **Validazione Input**: validazione completa delle richieste  
- **Gestione Errori**: nessun dato sensibile nei messaggi di errore  

## 🎯 Punti Chiave da Ricordare

Dopo aver completato questa introduzione dovresti comprendere:

✅ **Valore MCP**: come MCP collega assistenti AI e dati reali  
✅ **Contesto Aziendale**: requisiti e sfide di Zava Retail  
✅ **Panoramica Architettura**: componenti chiave e loro interazioni  
✅ **Stack Tecnologico**: strumenti e framework utilizzati  
✅ **Modello di Sicurezza**: accesso multi-tenant e protezione  
✅ **Modelli di Utilizzo**: scenari e flussi di query reali  

## 🚀 Cosa Fare Dopo

Pronto per approfondire? Continua con:

**[Lab 01: Concetti di Architettura Core](../01-Architecture/README.md)**

Scopri i modelli di architettura server MCP, i principi di design del database e l’implementazione tecnica dettagliata che alimenta la nostra soluzione di analisi retail.

## 📚 Risorse Aggiuntive

### Documentazione MCP
- [MCP Specification](https://modelcontextprotocol.io/docs/) - Documentazione ufficiale del protocollo  
- [MCP for Beginners](https://aka.ms/mcp-for-beginners) - Guida completa per imparare MCP  
- [FastMCP Documentation](https://github.com/modelcontextprotocol/python-sdk) - Documentazione SDK Python  

### Integrazione Database
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Riferimento completo PostgreSQL  
- [pgvector Guide](https://github.com/pgvector/pgvector) - Documentazione estensione vettoriale  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Guida RLS PostgreSQL  

### Servizi Azure
- [Azure OpenAI Documentation](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integrazione servizi AI  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Servizio database gestito  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Container serverless  

---

**Disclaimer**: Questo è un esercizio di apprendimento che utilizza dati retail fittizi. Segui sempre le politiche di governance e sicurezza dei dati della tua organizzazione quando implementi soluzioni simili in ambienti di produzione.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->