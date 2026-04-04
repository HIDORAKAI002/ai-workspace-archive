[![Agentic RAG](../../../translated_images/it/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Clicca sull'immagine sopra per guardare il video di questa lezione)_

# Agentic RAG

Questa lezione fornisce una panoramica completa di Agentic Retrieval-Augmented Generation (Agentic RAG), un paradigma emergente dell'IA in cui i grandi modelli linguistici (LLM) pianificano autonomamente i propri passi successivi mentre estraggono informazioni da fonti esterne. A differenza dei modelli statici di recupero e poi lettura, Agentic RAG prevede chiamate iterative al LLM, intervallate da chiamate a strumenti o funzioni e output strutturati. Il sistema valuta i risultati, affina le query, invoca ulteriori strumenti se necessario e continua questo ciclo fino a raggiungere una soluzione soddisfacente.

## Introduzione

Questa lezione coprirà

- **Comprendere Agentic RAG:** Imparare il paradigma emergente nell'IA in cui i grandi modelli linguistici (LLM) pianificano autonomamente i passi successivi mentre estraggono informazioni da fonti dati esterne.
- **Catturare lo Stile Iterativo Maker-Checker:** Comprendere il ciclo di chiamate iterative al LLM, intervallate da chiamate a strumenti o funzioni e output strutturati, progettato per migliorare la correttezza e gestire query malformate.
- **Esplorare Applicazioni Pratiche:** Identificare gli scenari in cui Agentic RAG eccelle, come ambienti incentrati sulla correttezza, interazioni complesse con database e flussi di lavoro estesi.

## Obiettivi di Apprendimento

Dopo aver completato questa lezione, saprai come/comprendere:

- **Comprendere Agentic RAG:** Imparare il paradigma emergente nell'IA in cui i grandi modelli linguistici (LLM) pianificano autonomamente i passi successivi mentre estraggono informazioni da fonti dati esterne.
- **Stile Iterativo Maker-Checker:** Comprendere il concetto di ciclo di chiamate iterative al LLM, intervallate da chiamate a strumenti o funzioni e output strutturati, progettato per migliorare la correttezza e gestire query malformate.
- **Padroneggiare il Processo di Ragionamento:** Comprendere la capacità del sistema di possedere il proprio processo di ragionamento, prendendo decisioni su come affrontare i problemi senza affidarsi a percorsi predefiniti.
- **Flusso di Lavoro:** Capire come un modello agentico decide autonomamente di recuperare report sulle tendenze di mercato, identificare dati dei concorrenti, correlare metriche di vendita interne, sintetizzare i risultati e valutare la strategia.
- **Cicli Iterativi, Integrazione di Strumenti e Memoria:** Imparare il modello di interazione ciclico del sistema, mantenendo stato e memoria tra i passaggi per evitare loop ripetitivi e prendere decisioni informate.
- **Gestione dei Modelli di Fallimento e Auto-Correzione:** Esplorare i meccanismi robusti di auto-correzione del sistema, includendo iterazioni e nuove query, uso di strumenti diagnostici e ricorso alla supervisione umana.
- **Limiti dell’Agency:** Comprendere le limitazioni di Agentic RAG, incentrandosi sull’autonomia specifica del dominio, dipendenza dall’infrastruttura e rispetto delle regole di sicurezza.
- **Casi d'Uso Pratici e Valore:** Identificare gli scenari in cui Agentic RAG brilla, come ambienti focalizzati sulla correttezza, interazioni complesse con database e flussi di lavoro estesi.
- **Governance, Trasparenza e Fiducia:** Imparare l'importanza della governance e della trasparenza, includendo il ragionamento spiegabile, il controllo dei bias e la supervisione umana.

## Cos’è Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) è un paradigma emergente di IA in cui i grandi modelli linguistici (LLM) pianificano autonomamente i propri passi successivi mentre estraggono informazioni da fonti esterne. A differenza dei modelli statici di recupero e poi lettura, Agentic RAG prevede chiamate iterative al LLM, intervallate da chiamate a strumenti o funzioni e output strutturati. Il sistema valuta i risultati, affina le query, invoca ulteriori strumenti se necessario e continua questo ciclo fino a ottenere una soluzione soddisfacente. Questo stile iterativo “maker-checker” migliora la correttezza, gestisce query malformate e assicura risultati di alta qualità.

Il sistema possiede attivamente il proprio processo di ragionamento, riscrivendo query fallite, scegliendo metodi di recupero diversi e integrando più strumenti—come la ricerca vettoriale in Azure AI Search, database SQL o API personalizzate—prima di finalizzare la risposta. La qualità distintiva di un sistema agentico è la capacità di possedere il proprio processo di ragionamento. Le implementazioni RAG tradizionali si basano su percorsi predefiniti, ma un sistema agentico determina autonomamente la sequenza di passi basandosi sulla qualità delle informazioni trovate.

## Definizione di Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) è un paradigma emergente nello sviluppo dell'IA in cui i LLM non solo estraggono informazioni da fonti dati esterne, ma pianificano anche autonomamente i prossimi passi. A differenza dei modelli statici di recupero-then-read o di sequenze di prompt accuratamente scriptate, Agentic RAG prevede un ciclo di chiamate iterative al LLM, intervallate da chiamate a strumenti o funzioni e output strutturati. Ad ogni passaggio, il sistema valuta i risultati ottenuti, decide se affinare le query, invoca strumenti aggiuntivi se necessario e continua questo ciclo finché non ottiene una soluzione soddisfacente.

Questo stile iterativo “maker-checker” è progettato per migliorare la correttezza, gestire query malformate a database strutturati (es. NL2SQL) e garantire risultati equilibrati e di alta qualità. Invece di affidarsi solamente a catene di prompt ingegnerizzate con cura, il sistema possiede attivamente il proprio processo di ragionamento. Può riscrivere query fallite, scegliere metodi di recupero diversi e integrare molteplici strumenti—come la ricerca vettoriale in Azure AI Search, database SQL o API personalizzate—prima di finalizzare la risposta. Questo elimina la necessità di framework di orchestrazione eccessivamente complessi. Invece, un ciclo relativamente semplice di “chiamata LLM → uso dello strumento → chiamata LLM → …” può fornire output sofisticati e ben fondati.

![Agentic RAG Core Loop](../../../translated_images/it/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Padroneggiare il Processo di Ragionamento

La qualità distintiva che rende un sistema “agentico” è la sua capacità di possedere il proprio processo di ragionamento. Le implementazioni RAG tradizionali spesso dipendono da umani che predefiniscono un percorso per il modello: una catena di pensieri che definisce cosa recuperare e quando.
Ma quando un sistema è veramente agentico, decide internamente come affrontare il problema. Non esegue semplicemente uno script; determina autonomamente la sequenza dei passi basandosi sulla qualità delle informazioni trovate.
Per esempio, se gli viene chiesto di creare una strategia di lancio prodotto, non si affida solo a un prompt che esplicita l'intero flusso di ricerca e decisione. Invece, il modello agentico decide autonomamente di:

1. Recuperare report sulle tendenze attuali del mercato usando Bing Web Grounding
2. Identificare dati rilevanti dei concorrenti usando Azure AI Search.
3. Correlare metriche storiche di vendita interna usando Azure SQL Database.
4. Sintetizzare i risultati in una strategia coerente orchestrata tramite Azure OpenAI Service.
5. Valutare la strategia per lacune o incoerenze, attivando un altro ciclo di recupero se necessario.
Tutti questi passaggi—rifinire query, scegliere fonti, iterare fino a essere “soddisfatti” della risposta—sono decisi dal modello, non pre-scritti da un umano.

## Cicli Iterativi, Integrazione di Strumenti e Memoria

![Tool Integration Architecture](../../../translated_images/it/tool-integration.0f569710b5c17c10.webp)

Un sistema agentico si basa su un modello di interazione ciclico:

- **Chiamata Iniziale:** L’obiettivo dell’utente (cioè prompt utente) viene presentato al LLM.
- **Invocazione dello Strumento:** Se il modello identifica informazioni mancanti o istruzioni ambigue, seleziona uno strumento o metodo di recupero—come una query a database vettoriale (es. ricerca ibrida Azure AI Search su dati privati) o una chiamata SQL strutturata—per raccogliere più contesto.
- **Valutazione e Raffinamento:** Dopo aver esaminato i dati restituiti, il modello decide se l’informazione è sufficiente. In caso contrario, affina la query, prova uno strumento diverso o aggiusta l’approccio.
- **Ripetere fino a Soddisfazione:** Questo ciclo continua finché il modello determina di avere abbastanza chiarezza e prove per fornire una risposta finale ben ragionata.
- **Memoria e Stato:** Poiché il sistema mantiene stato e memoria tra i passaggi, può ricordare tentativi precedenti e risultati, evitando cicli ripetitivi e prendendo decisioni più informate nel procedere.

Col tempo, questo crea una sensazione di comprensione evolutiva, permettendo al modello di navigare compiti complessi a più passaggi senza richiedere un intervento umano costante o la riformulazione del prompt.

## Gestione dei Modelli di Fallimento e Auto-Correzione

L'autonomia di Agentic RAG comprende anche robusti meccanismi di auto-correzione. Quando il sistema incontra vicoli ciechi—come recuperare documenti irrilevanti o incorrere in query malformate—può:

- **Iterare e Fare Nuove Query:** Invece di restituire risposte di scarso valore, il modello tenta nuove strategie di ricerca, riscrive query al database o esamina dataset alternativi.
- **Usare Strumenti Diagnostici:** Il sistema può invocare funzioni aggiuntive progettate per aiutarlo a diagnosticare i propri passi logici o confermare la correttezza dei dati recuperati. Strumenti come Azure AI Tracing saranno importanti per abilitare robusta osservabilità e monitoraggio.
- **Fare Ricorso alla Supervisione Umana:** Per scenari ad alto rischio o a fallimento ripetuto, il modello potrebbe segnalare incertezza e richiedere guida umana. Una volta ricevuto feedback correttivo dall’umano, il modello può integrare quell’insegnamento nel prosieguo.

Questo approccio iterativo e dinamico consente al modello di migliorare continuamente, assicurando che non sia semplicemente un sistema “one-shot” ma uno che apprende dai propri errori durante ciascuna sessione.

![Self Correction Mechanism](../../../translated_images/it/self-correction.da87f3783b7f174b.webp)

## Limiti dell’Agency

Nonostante la sua autonomia all’interno di un compito, Agentic RAG non è analogo a un'Intelligenza Artificiale Generale. Le sue capacità “agentiche” sono confinate agli strumenti, alle fonti dati e alle policy fornite dagli sviluppatori umani. Non può inventare propri strumenti né uscire dai confini di dominio stabiliti. Piuttosto, eccelle nell’orchestrare dinamicamente le risorse a disposizione.
Differenze chiave rispetto a forme di IA più avanzate includono:

1. **Autonomia Specifica del Dominio:** I sistemi Agentic RAG sono focalizzati sul raggiungimento di obiettivi definiti dall’utente all’interno di un dominio noto, impiegando strategie come la riscrittura di query o la selezione di strumenti per migliorare i risultati.
2. **Dipendenza dall’Infrastruttura:** Le capacità del sistema dipendono dagli strumenti e dati integrati dagli sviluppatori. Non può superare questi limiti senza intervento umano.
3. **Rispetto delle Regole di Sicurezza:** Linee guida etiche, norme di conformità e policy aziendali restano molto importanti. La libertà dell’agente è sempre vincolata da misure di sicurezza e meccanismi di supervisione (si spera).

## Casi d'Uso Pratici e Valore

Agentic RAG eccelle in scenari che richiedono raffinamento iterativo e precisione:

1. **Ambienti incentrati sulla Correttezza:** In controlli di conformità, analisi regolamentari o ricerche legali, il modello agentico può verificare ripetutamente fatti, consultare fonti multiple e riscrivere query finché non produce una risposta accuratamente verificata.
2. **Interazioni Complesse con Database:** Nella gestione di dati strutturati dove le query possono spesso fallire o necessitare aggiustamenti, il sistema può raffinare autonomamente le query usando Azure SQL o Microsoft Fabric OneLake, assicurando che il recupero finale rispecchi l’intento dell’utente.
3. **Flussi di Lavoro Estesi:** Sessioni di lunga durata possono evolvere man mano che emergono nuove informazioni. Agentic RAG può incorporare continuamente nuovi dati, adattando strategie mentre apprende di più sul problema.

## Governance, Trasparenza e Fiducia

Man mano che questi sistemi diventano più autonomi nel ragionamento, governance e trasparenza sono cruciali:

- **Ragionamento Spiegabile:** Il modello può fornire una traccia di audit delle query effettuate, delle fonti consultate e dei passi di ragionamento compiuti per raggiungere la conclusione. Strumenti come Azure AI Content Safety e Azure AI Tracing / GenAIOps aiutano a mantenere trasparenza e mitigare rischi.
- **Controllo dei Bias e Recupero Bilanciato:** Gli sviluppatori possono calibrare le strategie di recupero per assicurare che vengano considerate fonti dati equilibrate e rappresentative, e regolarmente verificare gli output per rilevare bias o schemi distorti usando modelli personalizzati per organizzazioni di data science avanzate con Azure Machine Learning.
- **Supervisione Umana e Conformità:** Per compiti sensibili, la revisione umana rimane essenziale. Agentic RAG non sostituisce il giudizio umano nelle decisioni di alto impatto—lo integra fornendo opzioni più accuratamente verificate.

Avere strumenti che forniscono un chiaro registro delle azioni è essenziale. Senza di essi, il debug di un processo a più fasi può essere molto difficile. Vedi l’esempio seguente da Literal AI (azienda dietro Chainlit) per una sessione Agent:

![AgentRunExample](../../../translated_images/it/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusione

Agentic RAG rappresenta un'evoluzione naturale nel modo in cui i sistemi IA gestiscono compiti complessi e intensivi di dati. Adottando un modello di interazione ciclico, selezionando autonomamente gli strumenti e raffinando le query fino a ottenere risultati di alta qualità, il sistema supera il semplice follow-up di prompt statici per diventare un decisore più adattivo e consapevole del contesto. Pur essendo ancora vincolato da infrastrutture definite dall’umano e linee guida etiche, queste capacità agentiche permettono interazioni IA più ricche, dinamiche e infine più utili sia per le imprese che per gli utenti finali.

### Hai altre domande su Agentic RAG?

Unisciti al [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) per incontrare altri studenti, partecipare alle ore di ufficio e ottenere risposte alle tue domande sugli AI Agents.

## Risorse Aggiuntive
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementare Retrieval Augmented Generation (RAG) con Azure OpenAI Service: Scopri come utilizzare i tuoi dati con Azure OpenAI Service. Questo modulo Microsoft Learn offre una guida completa sull'implementazione di RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Valutazione delle applicazioni di intelligenza artificiale generativa con Microsoft Foundry: Questo articolo tratta la valutazione e il confronto dei modelli su dataset disponibili pubblicamente, comprese le applicazioni Agentic AI e le architetture RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Cos'è Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Una guida completa alla Retrieval Augmented Generation basata su agenti – Notizie da generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: potenzia il tuo RAG con riformulazione delle query e auto-query! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Aggiunta di livelli agentici a RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Il futuro degli assistenti di conoscenza: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Come costruire sistemi Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Utilizzo di Microsoft Foundry Agent Service per scalare i tuoi agenti AI</a>

### Articoli accademici

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: raffinamento iterativo con auto-feedback</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: agenti linguistici con apprendimento per rinforzo verbale</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: i grandi modelli linguistici possono autocorreggersi con critica interattiva tramite strumenti</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: una panoramica su Agentic RAG</a>

## Lezione precedente

[Tool Use Design Pattern](../04-tool-use/README.md)

## Lezione successiva

[Costruire agenti AI affidabili](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Dichiarazione di non responsabilità**:
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Pur impegnandoci per l’accuratezza, si prega di considerare che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda la traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali incomprensioni o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->