# AGENTS.md

## Panoramica del Progetto

**MCP per Principianti** è un curriculum educativo open-source per imparare il Model Context Protocol (MCP) - un framework standardizzato per le interazioni tra modelli AI e applicazioni client. Questo repository offre materiali didattici completi con esempi di codice pratici in diversi linguaggi di programmazione.

### Tecnologie Chiave

- **Linguaggi di Programmazione**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Framework e SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Database**: PostgreSQL con estensione pgvector
- **Piattaforme Cloud**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Strumenti di Build**: npm, Maven, pip, Cargo
- **Documentazione**: Markdown con traduzione automatizzata in più lingue (oltre 48 lingue)

### Architettura

- **11 Moduli Core (00-11)**: Percorso di apprendimento sequenziale dai fondamenti agli argomenti avanzati
- **Laboratori Pratici**: Esercizi pratici con codice soluzione completo in più linguaggi
- **Progetti di Esempio**: Implementazioni funzionanti di server e client MCP
- **Sistema di Traduzione**: Flusso di lavoro automatizzato GitHub Actions per supporto multilingue
- **Risorse Immagini**: Directory centralizzata immagini con versioni tradotte

## Comandi di Setup

Questo repository è incentrato sulla documentazione. La maggior parte della configurazione avviene all’interno dei singoli progetti di esempio e laboratori.

### Setup del Repository

```bash
# Clona il repository
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Lavorare con i Progetti di Esempio

I progetti di esempio si trovano in:
- `03-GettingStarted/samples/` - Esempi specifici per linguaggio
- `03-GettingStarted/01-first-server/solution/` - Prime implementazioni server
- `03-GettingStarted/02-client/solution/` - Implementazioni client
- `11-MCPServerHandsOnLabs/` - Laboratori di integrazione database completi

Ogni progetto di esempio contiene le proprie istruzioni di setup:

#### Progetti TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Progetti Python
```bash
cd <project-directory>
pip install -r requirements.txt
# o
pip install -e .
python main.py
```

#### Progetti Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Flusso di Lavoro per lo Sviluppo

### Struttura della Documentazione

- **Moduli 00-11**: Contenuti del curriculum principali in ordine sequenziale
- **translations/**: Versioni specifiche per lingua (generato automaticamente, non modificare direttamente)
- **translated_images/**: Versioni localizzate delle immagini (generate automaticamente)
- **images/**: Immagini e diagrammi originali

### Apportare Modifiche alla Documentazione

1. Modificare solo i file markdown in inglese nelle directory dei moduli principali (00-11)
2. Aggiornare le immagini nella directory `images/` se necessario
3. Il GitHub Action co-op-translator genererà automaticamente le traduzioni
4. Le traduzioni vengono rigenerate al push sul branch main

### Lavorare con le Traduzioni

- **Traduzione Automatizzata**: Il flusso di lavoro GitHub Actions gestisce tutte le traduzioni
- **Non modificare manualmente** i file nella directory `translations/`
- I metadati delle traduzioni sono incorporati in ogni file tradotto
- Lingue supportate: oltre 48 lingue tra cui arabo, cinese, francese, tedesco, hindi, giapponese, coreano, portoghese, russo, spagnolo e molte altre

## Istruzioni per il Testing

### Validazione della Documentazione

Poiché si tratta principalmente di un repository di documentazione, il testing si concentra su:

1. **Validazione Link**: Assicurarsi che tutti i link interni funzionino
```bash
# Controlla i link markdown rotti
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validazione Esempi di Codice**: Verificare che gli esempi di codice compilino/eseguano correttamente
```bash
# Naviga al campione specifico ed esegui i suoi test
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Linting Markdown**: Controllare la coerenza del formato
```bash
# Usa markdownlint se necessario
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testing dei Progetti di Esempio

Ogni esempio specifico per linguaggio include il proprio approccio al testing:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Linee Guida per lo Stile del Codice

### Stile della Documentazione

- Usare un linguaggio chiaro e adatto ai principianti
- Includere esempi di codice in più linguaggi dove applicabile
- Seguire le migliori pratiche markdown:
  - Usare intestazioni in stile ATX (`#` sintassi)
  - Usare blocchi di codice delimitati con identificatori di linguaggio
  - Includere testi alt descrittivi per le immagini
  - Mantenere lunghezze di riga ragionevoli (nessun limite rigido, ma essere sensati)

### Stile degli Esempi di Codice

#### TypeScript/JavaScript
- Usare moduli ES (`import`/`export`)
- Seguire le convenzioni di TypeScript in modalità strict
- Includere annotazioni di tipo
- Target ES2022

#### Python
- Seguire le linee guida di stile PEP 8
- Usare i tipi dove opportuno
- Includere docstring per funzioni e classi
- Usare caratteristiche moderne di Python (3.8+)

#### Java
- Seguire le convenzioni Spring Boot
- Usare le caratteristiche di Java 21
- Seguire la struttura standard del progetto Maven
- Includere commenti Javadoc

### Organizzazione dei File

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Build e Deployment

### Deploy della Documentazione

Il repository usa GitHub Pages o simili per l’hosting della documentazione (se applicabile). Le modifiche al branch main innescano:

1. Flusso di lavoro di traduzione (`.github/workflows/co-op-translator.yml`)
2. Traduzione automatizzata di tutti i file markdown in inglese
3. Localizzazione delle immagini se necessario

### Nessun Processo di Build Richiesto

Questo repository contiene principalmente documentazione markdown. Non è richiesta alcuna compilazione o fase di build per il contenuto del curriculum principale.

### Deploy dei Progetti di Esempio

I singoli progetti di esempio possono includere istruzioni di deployment:
- Vedi `03-GettingStarted/09-deployment/` per la guida al deploy del server MCP
- Esempi di deploy Azure Container Apps in `11-MCPServerHandsOnLabs/`

## Linee Guida per il Contributo

### Processo di Pull Request

1. **Fork e Clona**: Fai fork del repository e clona il tuo fork localmente
2. **Crea un Branch**: Usa nomi di branch descrittivi (es. `fix/typo-module-3`, `add/python-example`)
3. **Apporta Modifiche**: Modifica solo i file markdown in inglese (non traduzioni)
4. **Testa Localmente**: Verifica che il markdown venga renderizzato correttamente
5. **Invia PR**: Usa titoli e descrizioni chiari per la pull request
6. **CLA**: Firma il Contratto di Licenza per Contributori Microsoft quando richiesto

### Formato del Titolo PR

Usa titoli chiari e descrittivi:
- `[Module XX] Breve descrizione` per modifiche specifiche ai moduli
- `[Samples] Descrizione` per cambiamenti agli esempi di codice
- `[Docs] Descrizione` per aggiornamenti generali alla documentazione

### Cosa Contribuire

- Correzioni di bug nella documentazione o negli esempi di codice
- Nuovi esempi di codice in altri linguaggi
- Chiarimenti e miglioramenti ai contenuti esistenti
- Nuovi casi di studio o esempi pratici
- Segnalazioni di problemi su contenuti poco chiari o errati

### Cosa NON Fare

- Non modificare direttamente i file nella directory `translations/`
- Non modificare la directory `translated_images/`
- Non aggiungere file binari grandi senza discussione
- Non cambiare i file del flusso di lavoro di traduzione senza coordinazione

## Note Aggiuntive

### Manutenzione del Repository

- **Changelog**: Tutti i cambiamenti significativi sono documentati in `changelog.md`
- **Guida di Studio**: Usa `study_guide.md` per una panoramica di navigazione del curriculum
- **Template Issue**: Usa i template GitHub per segnalazioni bug e richieste funzionalità
- **Codice di Condotta**: Tutti i contributori devono seguire il Codice di Condotta Open Source Microsoft

### Percorso di Apprendimento

Segui i moduli in ordine sequenziale (00-11) per un apprendimento ottimale:
1. **00-02**: Fondamenti (Introduzione, Concetti base, Sicurezza)
2. **03**: Inizio pratico con implementazioni hands-on
3. **04-05**: Implementazioni pratiche e argomenti avanzati
4. **06-10**: Comunità, best practice e applicazioni reali
5. **11**: Laboratori completi di integrazione database (13 laboratori sequenziali)

### Risorse di Supporto

- **Documentazione**: https://modelcontextprotocol.io/
- **Specifiche**: https://spec.modelcontextprotocol.io/
- **Comunità**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Server Discord Microsoft Foundry
- **Corsi Correlati**: Vedi README.md per altri percorsi di apprendimento Microsoft

### Problemi Comuni

**D: La mia PR fallisce il controllo traduzioni**  
R: Assicurati di aver modificato solo i file markdown in inglese nelle directory dei moduli principali, non le versioni tradotte.

**D: Come aggiungo una nuova lingua?**  
R: Il supporto linguistico è gestito dal workflow co-op-translator. Apri un issue per discutere l’aggiunta di nuove lingue.

**D: Gli esempi di codice non funzionano**  
R: Assicurati di aver seguito le istruzioni di setup specificate nel README dell’esempio. Verifica di avere le versioni corrette delle dipendenze installate.

**D: Le immagini non vengono visualizzate**  
R: Verifica che i percorsi delle immagini siano relativi e usino slash avanti. Le immagini devono essere nella directory `images/` o in `translated_images/` per le versioni localizzate.

### Considerazioni sulle Prestazioni

- Il flusso di lavoro di traduzione può richiedere diversi minuti per completarsi
- Le immagini grandi dovrebbero essere ottimizzate prima del commit
- Mantieni i singoli file markdown focalizzati e di dimensioni ragionevoli
- Usa link relativi per migliorare la portabilità

### Governance del Progetto

Questo progetto segue le pratiche open source Microsoft:  
- Licenza MIT per codice e documentazione  
- Codice di Condotta Open Source Microsoft  
- CLA richiesta per i contributi  
- Problemi di sicurezza: segui le linee guida di SECURITY.md  
- Supporto: vedi SUPPORT.md per risorse di aiuto

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->