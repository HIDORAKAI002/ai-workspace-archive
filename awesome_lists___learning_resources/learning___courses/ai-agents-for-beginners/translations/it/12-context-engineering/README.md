# Ingegneria del contesto per agenti IA

[![Ingegneria del contesto](../../../translated_images/it/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Fai clic sull'immagine sopra per vedere il video di questa lezione)_

Comprendere la complessità dell'applicazione per cui si sta costruendo un agente IA è importante per creare uno affidabile. Dobbiamo costruire agenti IA che gestiscano efficacemente le informazioni per rispondere a esigenze complesse oltre il prompt engineering.

In questa lezione vedremo cos'è l'ingegneria del contesto e il suo ruolo nella costruzione di agenti IA.

## Introduzione

Questa lezione tratterà:

• **Cos'è l'ingegneria del contesto** e perché è diversa dal prompt engineering.

• **Strategie per un'ingegneria del contesto efficace**, incluso come scrivere, selezionare, comprimere e isolare le informazioni.

• **Fallimenti comuni del contesto** che possono compromettere il tuo agente IA e come correggerli.

## Obiettivi di apprendimento

Dopo aver completato questa lezione, saprai capire come:

• **Definire l'ingegneria del contesto** e differenziarla dal prompt engineering.

• **Identificare i componenti chiave del contesto** nelle applicazioni basate su Large Language Model (LLM).

• **Applicare strategie per scrivere, selezionare, comprimere e isolare il contesto** per migliorare le prestazioni dell'agente.

• **Riconoscere i fallimenti comuni del contesto** come avvelenamento, distrazione, confusione e conflitto, e implementare tecniche di mitigazione.

## Cos'è l'ingegneria del contesto?

Per gli agenti IA, il contesto è ciò che guida la pianificazione dell'agente IA nell'effettuare determinate azioni. L'ingegneria del contesto è la pratica di assicurarsi che l'agente IA abbia le informazioni giuste per completare il prossimo passo del compito. La finestra di contesto è limitata in dimensione, quindi come costruttori di agenti dobbiamo creare sistemi e processi per gestire l'aggiunta, la rimozione e la condensazione delle informazioni nella finestra di contesto.

### Prompt Engineering vs Ingegneria del contesto

Il prompt engineering si concentra su un insieme unico di istruzioni statiche per guidare efficacemente gli agenti IA con un insieme di regole. L'ingegneria del contesto riguarda come gestire un insieme dinamico di informazioni, incluso il prompt iniziale, per garantire che l'agente IA abbia quello che gli serve nel tempo. L'idea principale dell'ingegneria del contesto è rendere questo processo ripetibile e affidabile.

### Tipi di contesto

[![Tipi di contesto](../../../translated_images/it/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

È importante ricordare che il contesto non è una sola cosa. Le informazioni di cui l'agente IA ha bisogno possono provenire da una varietà di fonti diverse ed è nostro compito assicurare che l'agente abbia accesso a queste fonti:

I tipi di contesto che un agente IA potrebbe dover gestire includono:

• **Istruzioni:** Sono come le "regole" dell'agente – prompt, messaggi di sistema, esempi few-shot (che mostrano all'IA come fare qualcosa) e descrizioni degli strumenti che può usare. Qui è dove il focus del prompt engineering si combina con l'ingegneria del contesto.

• **Conoscenza:** Copre fatti, informazioni recuperate da database o memorie a lungo termine che l'agente ha accumulato. Ciò include l'integrazione di un sistema Retrieval Augmented Generation (RAG) se un agente ha bisogno di accedere a diversi archivi di conoscenza e database.

• **Strumenti:** Sono le definizioni di funzioni esterne, API e MCP Servers che l'agente può chiamare, insieme al feedback (risultati) che ottiene dal loro utilizzo.

• **Cronologia della conversazione:** Il dialogo in corso con un utente. Con il passare del tempo, queste conversazioni diventano più lunghe e complesse, il che significa che occupano spazio nella finestra di contesto.

• **Preferenze dell'utente:** Informazioni apprese sui gusti o sulle preferenze di un utente nel tempo. Possono essere memorizzate e richiamate quando si prendono decisioni chiave per aiutare l'utente.

## Strategie per un'ingegneria del contesto efficace

### Strategie di pianificazione

[![Buone pratiche per l'ingegneria del contesto](../../../translated_images/it/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Una buona ingegneria del contesto inizia con una buona pianificazione. Ecco un approccio che ti aiuterà a iniziare a pensare a come applicare il concetto di ingegneria del contesto:

1. **Definire risultati chiari** - I risultati dei compiti assegnati agli agenti IA dovrebbero essere chiaramente definiti. Rispondi alla domanda - "Come sarà il mondo quando l'agente IA avrà finito il suo compito?" In altre parole, quale cambiamento, informazione o risposta dovrebbe avere l'utente dopo aver interagito con l'agente IA.
2. **Mappare il contesto** - Una volta definiti i risultati dell'agente IA, devi rispondere alla domanda "Quali informazioni servono all'agente IA per completare questo compito?". In questo modo puoi iniziare a mappare il contesto di dove tali informazioni possono essere localizzate.
3. **Creare pipeline di contesto** - Ora che sai dove sono le informazioni, devi rispondere alla domanda "Come otterrà l'agente queste informazioni?". Questo può essere fatto in vari modi, inclusi RAG, uso di MCP server e altri strumenti.

### Strategie pratiche

La pianificazione è importante, ma una volta che le informazioni iniziano a fluire nella finestra di contesto del nostro agente, dobbiamo avere strategie pratiche per gestirle:

#### Gestire il contesto

Mentre alcune informazioni verranno aggiunte automaticamente alla finestra di contesto, l'ingegneria del contesto riguarda assumere un ruolo più attivo su queste informazioni, il che può essere fatto con alcune strategie:

 1. **Bloc-notes dell'agente**
 Questo consente a un agente IA di prendere appunti sulle informazioni rilevanti relative ai compiti correnti e alle interazioni con l'utente durante una singola sessione. Questo dovrebbe esistere al di fuori della finestra di contesto in un file o oggetto runtime che l'agente può successivamente recuperare durante questa sessione se necessario.

 2. **Memorie**
 I bloc-notes sono utili per gestire informazioni al di fuori della finestra di contesto di una singola sessione. Le memorie consentono agli agenti di memorizzare e recuperare informazioni rilevanti attraverso più sessioni. Questo potrebbe includere riassunti, preferenze dell'utente e feedback per miglioramenti futuri.

 3. **Compressione del contesto**
  Una volta che la finestra di contesto cresce e si avvicina al suo limite, si possono usare tecniche come la sintesi e il trimming. Ciò include mantenere solo le informazioni più rilevanti o rimuovere messaggi più vecchi.
  
 4. **Sistemi multi-agente**
  Sviluppare sistemi multi-agente è una forma di ingegneria del contesto perché ogni agente ha la propria finestra di contesto. Come quel contesto viene condiviso e passato a agenti diversi è un altro elemento da pianificare durante la costruzione di questi sistemi.
  
 5. **Ambienti sandbox**
  Se un agente deve eseguire del codice o elaborare grandi quantità di informazioni in un documento, questo può richiedere un gran numero di token per processare i risultati. Invece di memorizzare tutto nella finestra di contesto, l'agente può usare un ambiente sandbox in grado di eseguire questo codice e leggere solo i risultati e le altre informazioni rilevanti.
  
 6. **Oggetti di stato runtime**
   Questo si realizza creando contenitori di informazioni per gestire le situazioni in cui l'agente ha bisogno di accedere a determinate informazioni. Per un compito complesso, questo consentirebbe a un agente di memorizzare i risultati di ogni sotto-compito passo dopo passo, permettendo al contesto di rimanere collegato solo a quel sotto-compito specifico.
  
### Esempio di ingegneria del contesto

Supponiamo di voler che un agente IA **"Prenotami un viaggio a Parigi."**

• Un agente semplice che usa solo il prompt engineering potrebbe rispondere semplicemente: **"Ok, quando vorresti andare a Parigi?**". Ha solo elaborato la tua domanda diretta al momento in cui l'utente l'ha posta.

• Un agente che utilizza le strategie di ingegneria del contesto trattate farebbe molto di più. Prima ancora di rispondere, il suo sistema potrebbe:

  ◦ **Controllare il tuo calendario** per date disponibili (recuperando dati in tempo reale).

  ◦ **Richiamare preferenze di viaggio passate** (dalla memoria a lungo termine) come la compagnia aerea preferita, il budget o se preferisci voli diretti.

  ◦ **Identificare gli strumenti disponibili** per la prenotazione di voli e hotel.

- Poi, un esempio di risposta potrebbe essere:  "Ehi [Il tuo nome]! Vedo che sei libero la prima settimana di ottobre. Ti cerco voli diretti per Parigi con [Compagnia preferita] entro il tuo solito budget di [Budget]?" Questa risposta più ricca e consapevole del contesto dimostra il potere dell'ingegneria del contesto.

## Fallimenti comuni del contesto

### Avvelenamento del contesto

**Cos'è:** Quando un'allucinazione (informazione falsa generata dall'LLM) o un errore entra nel contesto ed è ripetutamente riferita, causando all'agente il perseguimento di obiettivi impossibili o lo sviluppo di strategie senza senso.

**Cosa fare:** Implementare **validazione del contesto** e **quarantena**. Convalidare le informazioni prima che vengano aggiunte alla memoria a lungo termine. Se viene rilevato un potenziale avvelenamento, iniziare nuovi thread di contesto per impedire la diffusione delle informazioni errate.

**Esempio di prenotazione di viaggio:** Il tuo agente allucina un **volo diretto da un piccolo aeroporto locale a una lontana città internazionale** che in realtà non offre voli internazionali. Questo dettaglio di volo inesistente viene salvato nel contesto. Più tardi, quando chiedi all'agente di prenotare, continua a cercare biglietti per questa tratta impossibile, portando a errori ripetuti.

**Soluzione:** Implementare un passaggio che **convalidi l'esistenza dei voli e le rotte con un'API in tempo reale** _prima_ di aggiungere il dettaglio del volo al contesto di lavoro dell'agente. Se la convalida fallisce, l'informazione errata viene "messa in quarantena" e non utilizzata ulteriormente.

### Distrazione del contesto

**Cos'è:** Quando il contesto diventa così grande che il modello si concentra troppo sulla cronologia accumulata invece di usare ciò che ha appreso durante l'addestramento, portando ad azioni ripetitive o poco utili. I modelli possono iniziare a commettere errori anche prima che la finestra di contesto sia piena.

**Cosa fare:** Usare la **sintesi del contesto**. Comprimere periodicamente le informazioni accumulate in riassunti più brevi, mantenendo i dettagli importanti e rimuovendo la cronologia ridondante. Questo aiuta a "ripristinare" il focus.

**Esempio di prenotazione di viaggio:** Hai discusso per molto tempo varie destinazioni da sogno, inclusa una dettagliata rievocazione del tuo viaggio zaino in spalla di due anni fa. Quando finalmente chiedi di **"trovami un volo economico per** **il prossimo mese****,"** l'agente rimane impantanato nei dettagli vecchi e irrilevanti e continua a chiedere dei tuoi equipaggiamenti da zaino o degli itinerari passati, trascurando la tua richiesta attuale.

**Soluzione:** Dopo un certo numero di interazioni o quando il contesto cresce troppo, l'agente dovrebbe **riassumere le parti più recenti e rilevanti della conversazione** – concentrandosi sulle tue date di viaggio attuali e sulla destinazione – e usare quel riassunto condensato per la chiamata LLM successiva, scartando la chat storica meno rilevante.

### Confusione del contesto

**Cos'è:** Quando il contesto non necessario, spesso sotto forma di troppi strumenti disponibili, causa al modello la generazione di risposte sbagliate o il richiamo di strumenti irrilevanti. I modelli più piccoli sono particolarmente soggetti a questo.

**Cosa fare:** Implementare la **gestione del carico di strumenti** usando tecniche RAG. Memorizzare le descrizioni degli strumenti in un database vettoriale e selezionare _solo_ gli strumenti più rilevanti per ogni compito specifico. La ricerca mostra di limitare la selezione degli strumenti a meno di 30.

**Esempio di prenotazione di viaggio:** Il tuo agente ha accesso a dozzine di strumenti: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations`, ecc. Chiedi, **"Qual è il modo migliore per spostarsi a Parigi?"** A causa del gran numero di strumenti, l'agente si confonde e tenta di chiamare `book_flight` _all'interno_ di Parigi, o `rent_car` anche se preferisci i mezzi pubblici, perché le descrizioni degli strumenti possono sovrapporsi o semplicemente non riesce a discernere quale sia il migliore.

**Soluzione:** Usare **RAG sulle descrizioni degli strumenti**. Quando chiedi come muoverti a Parigi, il sistema recupera dinamicamente _solo_ gli strumenti più rilevanti come `rent_car` o `public_transport_info` in base alla tua richiesta, presentando all'LLM un "carico" focalizzato di strumenti.

### Conflitto del contesto

**Cos'è:** Quando esistono informazioni in conflitto all'interno del contesto, portando a ragionamenti incoerenti o a risposte finali errate. Questo accade spesso quando le informazioni arrivano per fasi e le assunzioni iniziali e sbagliate rimangono nel contesto.

**Cosa fare:** Usare il **potatura del contesto** e lo **offloading**. La potatura significa rimuovere informazioni obsolete o conflittuali man mano che arrivano nuovi dettagli. L'offloading fornisce al modello un'area di lavoro "scratchpad" separata per elaborare le informazioni senza intasare il contesto principale.

**Esempio di prenotazione di viaggio:** Inizialmente dici al tuo agente, **"Voglio volare in classe economy."** Più avanti nella conversazione cambi idea e dici, **"In realtà, per questo viaggio, andiamo in business class."** Se entrambe le istruzioni rimangono nel contesto, l'agente potrebbe ricevere risultati di ricerca contrastanti o confondersi su quale preferenza dare priorità.

**Soluzione:** Implementare la **potatura del contesto**. Quando una nuova istruzione contraddice una precedente, l'istruzione più vecchia viene rimossa o esplicitamente sovrascritta nel contesto. In alternativa, l'agente può usare un **bloc-notes** per conciliare le preferenze in conflitto prima di decidere, assicurando che solo l'istruzione finale e coerente guidi le sue azioni.

## Hai altre domande sull'ingegneria del contesto?

Partecipa al [Discord di Microsoft Foundry](https://aka.ms/ai-agents/discord) per incontrare altri studenti, partecipare alle ore di assistenza e ottenere risposte alle tue domande sugli agenti IA.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Disclaimer:
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo a garantire l'accuratezza, si prega di notare che le traduzioni automatiche possono contenere errori o inesattezze. Il documento originale nella sua lingua d'origine deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale eseguita da un traduttore umano. Non siamo responsabili per eventuali incomprensioni o interpretazioni errate derivanti dall'uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->