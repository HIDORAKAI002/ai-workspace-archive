[![Come progettare buoni agenti IA](../../../translated_images/it/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Fai clic sull'immagine sopra per vedere il video di questa lezione)_
# Principi di design agentico per l'IA

## Introduzione

Esistono molti modi per pensare alla costruzione di Sistemi Agentici basati sull'IA. Dato che l'ambiguità è una caratteristica e non un bug nel design della Generative AI, a volte è difficile per gli ingegneri capire da dove iniziare. Abbiamo creato un insieme di Principi di Design UX incentrati sull'essere umano per consentire agli sviluppatori di costruire sistemi agentici orientati al cliente per risolvere le loro esigenze di business. Questi principi di design non sono un'architettura prescrittiva ma piuttosto un punto di partenza per i team che stanno definendo e sviluppando esperienze agentiche.

In generale, gli agenti dovrebbero:

- Ampliare e scalare le capacità umane (brainstorming, problem solving, automazione, ecc.)
- Colmare lacune di conoscenza (portarmi al passo su domini di conoscenza, traduzione, ecc.)
- Facilitare e supportare la collaborazione nei modi in cui preferiamo lavorare con gli altri
- Renderci versioni migliori di noi stessi (es., life coach/gestore di attività, aiutandoci a imparare abilità di regolazione emotiva e mindfulness, costruendo resilienza, ecc.)

## Questa lezione tratterà

- Cosa sono i Principi di Design Agentico
- Quali linee guida seguire durante l'implementazione di questi principi di design
- Alcuni esempi di utilizzo dei principi di design

## Obiettivi di apprendimento

Dopo aver completato questa lezione, sarai in grado di:

1. Spiegare cosa sono i Principi di Design Agentico
2. Spiegare le linee guida per l'utilizzo dei Principi di Design Agentico
3. Capire come costruire un agente usando i Principi di Design Agentico

## I principi di design agentico

![Principi di design agentico](../../../translated_images/it/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agente (Spazio)

Questo è l'ambiente in cui l'agente opera. Questi principi informano come progettiamo agenti per impegnarsi nei mondi fisici e digitali.

- **Collegare, non collassare** – aiutare a collegare le persone ad altre persone, eventi e conoscenze azionabili per abilitare collaborazione e connessione.
- Gli agenti aiutano a collegare eventi, conoscenze e persone.
- Gli agenti avvicinano le persone. Non sono progettati per sostituire o sminuire le persone.
- **Facilmente accessibile ma occasionalmente invisibile** – l'agente opera in gran parte in background e ci spinge solo quando è rilevante e appropriato.
  - L'agente è facilmente individuabile e accessibile per utenti autorizzati su qualsiasi dispositivo o piattaforma.
  - L'agente supporta input e output multimodali (suono, voce, testo, ecc.).
  - L'agente può passare senza soluzione di continuità tra primo piano e sfondo; tra proattivo e reattivo, a seconda della sua percezione dei bisogni dell'utente.
  - L'agente può operare in forma invisibile, ma il suo processo in background e la collaborazione con altri agenti sono trasparenti e controllabili dall'utente.

### Agente (Tempo)

Questo è come l'agente opera nel tempo. Questi principi informano come progettiamo agenti che interagiscono attraverso passato, presente e futuro.

- **Passato**: Riflettere sulla storia che include sia stato che contesto.
  - L'agente fornisce risultati più pertinenti basati sull'analisi di dati storici più ricchi, oltre al singolo evento, alle persone o agli stati.
  - L'agente crea connessioni dagli eventi passati e riflette attivamente sulla memoria per interagire con le situazioni attuali.
- **Ora**: Sollecitare più che notificare.
  - L'agente incarna un approccio comprensivo all'interazione con le persone. Quando si verifica un evento, l'agente va oltre la semplice notifica statica o altre formalità statiche. L'agente può semplificare i flussi o generare dinamicamente segnali per dirigere l'attenzione dell'utente al momento giusto.
  - L'agente fornisce informazioni basate sull'ambiente contestuale, i cambiamenti sociali e culturali e adattate all'intento dell'utente.
  - L'interazione con l'agente può essere graduale, evolvere/aumentare in complessità per potenziare gli utenti nel lungo termine.
- **Futuro**: Adattarsi ed evolvere.
  - L'agente si adatta a diversi dispositivi, piattaforme e modalità.
  - L'agente si adatta al comportamento dell'utente, alle necessità di accessibilità ed è liberamente personalizzabile.
  - L'agente è plasmato da e si evolve attraverso l'interazione continua con l'utente.

### Agente (Nucleo)

Questi sono gli elementi chiave nel nucleo del design di un agente.

- **Accogliere l'incertezza ma stabilire fiducia**.
  - Un certo livello di incertezza dell'agente è previsto. L'incertezza è un elemento chiave del design degli agenti.
  - Fiducia e trasparenza sono livelli fondamentali del design dell'agente.
  - Gli esseri umani controllano quando l'agente è attivo/disattivato e lo stato dell'agente è chiaramente visibile in ogni momento.

## Le linee guida per implementare questi principi

Quando utilizzi i precedenti principi di design, usa le seguenti linee guida:

1. **Trasparenza**: Informare l'utente che è coinvolta l'IA, come funziona (incluse azioni passate) e come fornire feedback e modificare il sistema.
2. **Controllo**: Consentire all'utente di personalizzare, specificare preferenze e impostazioni personali, e avere il controllo sul sistema e sui suoi attributi (inclusa la capacità di dimenticare).
3. **Coerenza**: Puntare a esperienze coerenti e multimodali attraverso dispositivi ed endpoint. Usare elementi UI/UX familiari quando possibile (ad es., icona del microfono per l'interazione vocale) e ridurre il carico cognitivo del cliente il più possibile (ad es., mirare a risposte concise, supporti visivi e contenuti 'Per saperne di più').

## Come progettare un Agente di viaggio usando questi principi e linee guida

Immagina di progettare un Agente di viaggio, ecco come potresti pensare di utilizzare i Principi di Design e le Linee Guida:

1. **Trasparenza** – Informare l'utente che l'Agente di viaggio è un agente abilitato all'IA. Fornire alcune istruzioni di base su come iniziare (ad es., un messaggio di “Ciao”, prompt di esempio). Documentare chiaramente questo nella pagina del prodotto. Mostrare l'elenco dei prompt che un utente ha richiesto in passato. Rendere chiaro come fornire feedback (pollice in su e in giù, pulsante Invia feedback, ecc.). Articolare chiaramente se l'agente ha restrizioni di utilizzo o di argomento.
2. **Controllo** – Assicurarsi che sia chiaro come l'utente possa modificare l'agente dopo la sua creazione con elementi come il Prompt di sistema. Consentire all'utente di scegliere quanto verbose sia l'agente, il suo stile di scrittura e eventuali avvertenze su ciò di cui l'agente non dovrebbe parlare. Permettere all'utente di visualizzare ed eliminare file o dati associati, prompt e conversazioni passate.
3. **Coerenza** – Assicurarsi che le icone per Condividi prompt, aggiungi un file o una foto e tagga qualcuno o qualcosa siano standard e riconoscibili. Usare l'icona della graffetta per indicare il caricamento/condivisione di file con l'agente, e un'icona immagine per indicare il caricamento di grafica.

## Esempi di codice

- Python: [Framework per agenti](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Framework per agenti](./code_samples/03-dotnet-agent-framework.md)


## Hai altre domande sui pattern di design agentico per l'IA?

Unisciti al [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) per incontrare altri studenti, partecipare a ore di ricevimento e ottenere risposte alle tue domande sugli agenti IA.

## Risorse aggiuntive

- <a href="https://openai.com" target="_blank">Pratiche per la governance dei sistemi agentici di IA | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Il progetto HAX Toolkit - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Toolkit per un'IA responsabile</a>

## Lezione precedente

[Esplorare i framework agentici](../02-explore-agentic-frameworks/README.md)

## Prossima lezione

[Pattern di design per l'uso degli strumenti](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Dichiarazione di non responsabilità:
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica basato su IA Co-op Translator (https://github.com/Azure/co-op-translator). Pur impegnandoci per garantire accuratezza, si prega di notare che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua è da considerarsi la fonte autorevole. Per informazioni di carattere critico è consigliata una traduzione professionale effettuata da un traduttore umano. Non ci riteniamo responsabili per eventuali incomprensioni o interpretazioni errate derivanti dall'uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->