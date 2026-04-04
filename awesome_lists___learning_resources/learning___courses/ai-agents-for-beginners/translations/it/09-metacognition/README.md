[![Multi-Agent Design](../../../translated_images/it/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Clicca sull'immagine sopra per vedere il video di questa lezione)_
# Metacognizione negli Agenti IA

## Introduzione

Benvenuti alla lezione sulla metacognizione negli agenti IA! Questo capitolo è pensato per principianti curiosi di capire come gli agenti IA possano riflettere sui propri processi di pensiero. Alla fine di questa lezione, comprenderai i concetti chiave e sarai dotato di esempi pratici per applicare la metacognizione nella progettazione di agenti IA.

## Obiettivi di Apprendimento

Dopo aver completato questa lezione, sarai in grado di:

1. Comprendere le implicazioni dei loop di ragionamento nelle definizioni degli agenti.
2. Usare tecniche di pianificazione e valutazione per aiutare agenti autogestiti.
3. Creare i tuoi agenti capaci di manipolare il codice per svolgere compiti.

## Introduzione alla Metacognizione

La metacognizione si riferisce ai processi cognitivi di ordine superiore che implicano il riflettere sul proprio pensiero. Per gli agenti IA, questo significa essere in grado di valutare e aggiustare le proprie azioni basandosi sulla consapevolezza di sé e sulle esperienze passate. La metacognizione, o "pensare al pensiero," è un concetto importante nello sviluppo di sistemi IA agentici. Coinvolge la capacità dei sistemi IA di essere consapevoli dei propri processi interni e di monitorare, regolare e adattare di conseguenza il proprio comportamento. Proprio come facciamo noi quando capiamo il contesto o analizziamo un problema. Questa autoconsapevolezza può aiutare i sistemi IA a prendere decisioni migliori, identificare errori e migliorare le prestazioni nel tempo — ancora una volta collegandosi al test di Turing e al dibattito sul fatto che l’IA prenderà o meno il controllo.

Nel contesto dei sistemi IA agentici, la metacognizione può aiutare ad affrontare diverse sfide, come:
- Trasparenza: Assicurare che i sistemi IA possano spiegare il proprio ragionamento e le decisioni.
- Ragionamento: Migliorare la capacità dei sistemi IA di sintetizzare informazioni e prendere decisioni appropriate.
- Adattamento: Permettere ai sistemi IA di adeguarsi a nuovi ambienti e condizioni mutevoli.
- Percezione: Aumentare la precisione dei sistemi IA nel riconoscere e interpretare dati provenienti dall’ambiente.

### Cos'è la Metacognizione?

La metacognizione, o "pensare al pensiero," è un processo cognitivo di ordine superiore che implica autoconsapevolezza e autoregolazione dei propri processi cognitivi. Nell’ambito dell’IA, la metacognizione consente agli agenti di valutare e adattare le proprie strategie e azioni, portando a capacità migliorate di risoluzione di problemi e presa di decisioni. Comprendendo la metacognizione, puoi progettare agenti IA che non solo sono più intelligenti ma anche più adattabili ed efficienti. In una vera metacognizione, l’IA ragionerebbe esplicitamente sul proprio ragionamento.

Esempio: “Ho scelto voli più economici perché... potrei perdermi i voli diretti, quindi ricontrollo.”
Tenere traccia di come o perché ha scelto una certa rotta.
- Notare di aver commesso degli errori perché si è affidata eccessivamente alle preferenze dell’utente dell’ultima volta, quindi modifica la strategia decisoria e non solo la raccomandazione finale.
- Diagnosticare schemi come: “Ogni volta che vedo l’utente menzionare ‘troppo affollato,’ non dovrei solo escludere alcune attrazioni ma anche riflettere che il mio metodo di selezionare le ‘attrazioni principali’ è errato se ordino sempre per popolarità.”

### Importanza della Metacognizione negli Agenti IA

La metacognizione svolge un ruolo cruciale nella progettazione degli agenti IA per diverse ragioni:

![Importance of Metacognition](../../../translated_images/it/importance-of-metacognition.b381afe9aae352f7.webp)

- Autoriflessione: Gli agenti possono valutare le proprie prestazioni e identificare aree di miglioramento.
- Adattabilità: Gli agenti possono modificare le proprie strategie basandosi sulle esperienze passate e su ambienti in cambiamento.
- Correzione degli Errori: Gli agenti possono rilevare e correggere autonomamente gli errori, ottenendo risultati più accurati.
- Gestione delle Risorse: Gli agenti possono ottimizzare l’uso delle risorse, come tempo e potenza computazionale, pianificando e valutando le proprie azioni.

## Componenti di un Agente IA

Prima di addentrarci nei processi metacognitivi, è essenziale capire le componenti di base di un agente IA. Un agente IA tipicamente consiste in:

- Persona: La personalità e le caratteristiche dell'agente, che definiscono come interagisce con gli utenti.
- Strumenti: Le capacità e le funzioni che l’agente può svolgere.
- Competenze: La conoscenza e l’esperienza possedute dall’agente.

Questi componenti lavorano insieme per creare un’“unità di competenza” che può svolgere compiti specifici.

**Esempio**:
Considera un agente di viaggio, un servizio agente che non solo organizza la tua vacanza ma adatta il proprio percorso basandosi su dati in tempo reale e sulle esperienze di viaggio passate dei clienti.

### Esempio: Metacognizione in un Servizio di Agente di Viaggio

Immagina di progettare un servizio agente di viaggio alimentato da IA. Questo agente, "Agente di Viaggio," aiuta gli utenti nel pianificare le loro vacanze. Per incorporare la metacognizione, l’Agente di Viaggio deve valutare e regolare le proprie azioni basandosi sull’autoconsapevolezza e sulle esperienze passate. Ecco come la metacognizione potrebbe entrare in gioco:

#### Compito Attuale

Il compito attuale è aiutare un utente a pianificare un viaggio a Parigi.

#### Passi per Completare il Compito

1. **Raccogliere Preferenze dell’Utente**: Chiedere all’utente date di viaggio, budget, interessi (es. musei, cucina, shopping) e eventuali requisiti specifici.
2. **Recuperare Informazioni**: Cercare opzioni di voli, alloggi, attrazioni e ristoranti che corrispondano alle preferenze dell’utente.
3. **Generare Raccomandazioni**: Fornire un itinerario personalizzato con dettagli di voli, prenotazioni hotel e attività suggerite.
4. **Aggiustare in Base a Feedback**: Chiedere un feedback all’utente sulle raccomandazioni e apportare modifiche necessarie.

#### Risorse Richieste

- Accesso a database di prenotazioni voli e hotel.
- Informazioni su attrazioni e ristoranti parigini.
- Dati di feedback utente da interazioni precedenti.

#### Esperienza e Autoriflessione

L’Agente di Viaggio utilizza la metacognizione per valutare le proprie prestazioni e apprendere dalle esperienze passate. Per esempio:

1. **Analisi del Feedback Utente**: L’Agente di Viaggio esamina il feedback per determinare quali raccomandazioni sono state apprezzate e quali no. Modifica le proposte future di conseguenza.
2. **Adattabilità**: Se un utente ha espresso in passato un fastidio per i luoghi affollati, l’Agente di Viaggio eviterà di proporre luoghi turistici popolari durante le ore di punta.
3. **Correzione degli Errori**: Se l’Agente di Viaggio ha commesso un errore in una prenotazione passata, ad esempio suggerendo un hotel esaurito, impara a controllare con maggiore rigore la disponibilità prima di fare raccomandazioni.

#### Esempio Pratico per Sviluppatori

Ecco un esempio semplificato di come potrebbe apparire il codice di Agente di Viaggio integrando la metacognizione:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Cerca voli, hotel e attrazioni basati sulle preferenze
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        # Analizza i feedback e adatta le raccomandazioni future
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Esempio di utilizzo
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

#### Perché la Metacognizione è Importante

- **Autoriflessione**: Gli agenti possono analizzare le proprie prestazioni e individuare aree di miglioramento.
- **Adattabilità**: Gli agenti possono modificare le strategie basandosi sul feedback e sulle condizioni mutevoli.
- **Correzione degli Errori**: Gli agenti possono rilevare e correggere autonomamente gli errori.
- **Gestione delle Risorse**: Gli agenti possono ottimizzare l’uso delle risorse, come tempo e potenza computazionale.

Incorporando la metacognizione, l’Agente di Viaggio può fornire raccomandazioni più personalizzate e precise, migliorando l’esperienza complessiva dell’utente.

---

## 2. Pianificazione negli Agenti

La pianificazione è un componente cruciale del comportamento degli agenti IA. Consiste nel delineare i passaggi necessari per raggiungere un obiettivo, considerando lo stato attuale, le risorse e i possibili ostacoli.

### Elementi della Pianificazione

- **Compito Attuale**: Definire chiaramente il compito.
- **Passi per Completare il Compito**: Suddividere il compito in passaggi gestibili.
- **Risorse Necessarie**: Identificare le risorse necessarie.
- **Esperienza**: Utilizzare esperienze passate per informare la pianificazione.

**Esempio**:
Ecco i passi che l’Agente di Viaggio deve compiere per assistere efficacemente un utente nella pianificazione del viaggio:

### Passi per Agente di Viaggio

1. **Raccogliere Preferenze dell’Utente**
   - Chiedere dettagli all’utente sulle date di viaggio, budget, interessi e eventuali requisiti specifici.
   - Esempi: "Quando prevedi di viaggiare?" "Qual è la tua fascia di budget?" "Quali attività ti piacciono in vacanza?"

2. **Recuperare Informazioni**
   - Cercare opzioni di viaggio rilevanti basate sulle preferenze.
   - **Volì**: Cercare voli disponibili entro budget e date preferite.
   - **Alloggi**: Trovare hotel o strutture in affitto che combacino con posizione, prezzo e servizi richiesti.
   - **Attrazioni e Ristoranti**: Identificare attrazioni, attività e ristoranti popolari che corrispondano agli interessi dell’utente.

3. **Generare Raccomandazioni**
   - Compilare le informazioni in un itinerario personalizzato.
   - Fornire dettagli come opzioni di volo, prenotazioni alberghiere e attività consigliate, assicurandosi che le raccomandazioni siano personalizzate.

4. **Presentare l’Itinerario all’Utente**
   - Condividere l’itinerario proposto per la revisione dell’utente.
   - Esempio: "Ecco un itinerario suggerito per il tuo viaggio a Parigi. Include dettagli dei voli, prenotazioni hotel e una lista di attività e ristoranti raccomandati. Fammi sapere cosa ne pensi!"

5. **Raccogliere Feedback**
   - Chiedere all’utente un riscontro sull’itinerario proposto.
   - Esempi: "Ti piacciono le opzioni di volo?" "L’hotel va bene per le tue esigenze?" "Ci sono attività che vorresti aggiungere o togliere?"

6. **Aggiustare in Base al Feedback**
   - Modificare l’itinerario in base al feedback ricevuto.
   - Apportare cambiamenti necessari a voli, alloggi e attività per meglio rispecchiare le preferenze dell’utente.

7. **Conferma Finale**
   - Presentare l’itinerario aggiornato per la conferma finale.
   - Esempio: "Ho apportato le modifiche in base al tuo feedback. Ecco l’itinerario aggiornato. Va tutto bene per te?"

8. **Prenotare e Confermare**
   - Una volta approvato, procedere con la prenotazione di voli, alloggi e attività pianificate.
   - Inviare dettagli di conferma all’utente.

9. **Fornire Supporto Continuativo**
   - Rimanere disponibile per assistenza su cambiamenti o richieste aggiuntive prima e durante il viaggio.
   - Esempio: "Se hai bisogno di ulteriore assistenza durante il viaggio, non esitare a contattarmi in qualsiasi momento!"

### Esempio di Interazione

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Esempio di utilizzo all'interno di una richiesta di prenotazione
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

## 3. Sistema RAG Correttivo

Iniziamo comprendendo la differenza tra RAG Tool e Caricamento Pre-emptive del Contesto.

![RAG vs Context Loading](../../../translated_images/it/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

RAG combina un sistema di recupero con un modello generativo. Quando viene fatta una richiesta, il sistema di recupero estrae documenti o dati rilevanti da una fonte esterna, e queste informazioni recuperate sono usate per arricchire l’input al modello generativo. Questo aiuta il modello a generare risposte più accurate e contestualmente rilevanti.

In un sistema RAG, l’agente recupera informazioni pertinenti da una base di conoscenza e le usa per generare risposte o azioni appropriate.

### Approccio RAG Correttivo

L’approccio RAG Correttivo mira a usare tecniche RAG per correggere errori e migliorare l’accuratezza degli agenti IA. Ciò implica:

1. **Tecnica di Prompting**: Usare prompt specifici per guidare l’agente nel recupero di informazioni rilevanti.
2. **Strumento**: Implementare algoritmi e meccanismi che permettono all’agente di valutare la pertinenza delle informazioni recuperate e generare risposte accurate.
3. **Valutazione**: Valutare continuamente le prestazioni dell’agente e apportare aggiustamenti per migliorare accuratezza ed efficienza.

#### Esempio: RAG Correttivo in un Agente di Ricerca

Considera un agente di ricerca che estrae informazioni dal web per rispondere a query degli utenti. L’approccio RAG Correttivo potrebbe includere:

1. **Tecnica di Prompting**: Formulare query di ricerca basate sull’input dell’utente.
2. **Strumento**: Usare elaborazione del linguaggio naturale e algoritmi di machine learning per classificare e filtrare i risultati.
3. **Valutazione**: Analizzare il feedback degli utenti per identificare e correggere errori nelle informazioni recuperate.

### RAG Correttivo in Agente di Viaggio

RAG Correttivo (Retrieval-Augmented Generation) migliora la capacità dell’IA di recuperare e generare informazioni correggendo eventuali inesattezze. Vediamo come l’Agente di Viaggio può usare l’approccio RAG Correttivo per fornire raccomandazioni di viaggio più accurate e pertinenti.

Questo involve:

- **Tecnica di Prompting:** Usare prompt specifici per guidare l’agente nel recupero di informazioni pertinenti.
- **Strumento:** Implementare algoritmi e meccanismi che permettono all’agente di valutare la rilevanza delle informazioni recuperate e generare risposte accurate.
- **Valutazione:** Valutare continuamente le prestazioni dell’agente e apportare aggiustamenti per migliorare accuratezza ed efficienza.

#### Passi per Implementare RAG Correttivo in Agente di Viaggio

1. **Interazione Iniziale con l’Utente**
   - L’Agente di Viaggio raccoglie le preferenze iniziali dall’utente, come destinazione, date di viaggio, budget e interessi.
   - Esempio:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Recupero delle Informazioni**
   - L’Agente di Viaggio recupera dati su voli, alloggi, attrazioni e ristoranti basandosi sulle preferenze dell’utente.
   - Esempio:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generazione delle Raccomandazioni Iniziali**
   - L’Agente di Viaggio usa le informazioni recuperate per generare un itinerario personalizzato.
   - Esempio:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Raccolta del Feedback Utente**
   - L’Agente di Viaggio chiede un riscontro sulle raccomandazioni iniziali.
   - Esempio:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Processo RAG Correttivo**
   - **Tecnica di Prompting**: L’Agente di Viaggio formula nuove query di ricerca basate sul feedback dell’utente.
     - Esempio:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Strumento**: L’Agente di Viaggio utilizza algoritmi per classificare e filtrare nuovi risultati di ricerca, enfatizzando la rilevanza basata sul feedback.
     - Esempio:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Valutazione**: L’Agente di Viaggio valuta continuamente la pertinenza e l’accuratezza delle raccomandazioni analizzando il feedback e apportando modifiche necessarie.
     - Esempio:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Esempio Pratico

Ecco un esempio semplificato in Python che incorpora l’approccio RAG Correttivo in Agente di Viaggio:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)
        new_itinerary = self.generate_recommendations()
        return new_itinerary

# Esempio di utilizzo
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
new_itinerary = travel_agent.adjust_based_on_feedback(feedback)
print("Updated Itinerary:", new_itinerary)
```

### Caricamento Pre-emptive del Contesto
Il caricamento preventivo del contesto consiste nel caricare nel modello il contesto rilevante o le informazioni di base prima di elaborare una query. Ciò significa che il modello ha accesso a queste informazioni fin dall'inizio, il che può aiutarlo a generare risposte più informate senza dover recuperare dati aggiuntivi durante il processo.

Ecco un esempio semplificato di come potrebbe apparire un caricamento preventivo del contesto per un'applicazione di agente di viaggio in Python:

```python
class TravelAgent:
    def __init__(self):
        # Pre-carica destinazioni popolari e le loro informazioni
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Recupera informazioni sulla destinazione dal contesto pre-caricato
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Esempio di utilizzo
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Spiegazione

1. **Inizializzazione (metodo `__init__`)**: La classe `TravelAgent` pre-carica un dizionario contenente informazioni su destinazioni popolari come Parigi, Tokyo, New York e Sydney. Questo dizionario include dettagli come il paese, la valuta, la lingua e le principali attrazioni per ogni destinazione.

2. **Recupero Informazioni (metodo `get_destination_info`)**: Quando un utente richiede informazioni su una destinazione specifica, il metodo `get_destination_info` recupera le informazioni rilevanti dal dizionario del contesto pre-caricato.

Pre-caricando il contesto, l'applicazione dell'agente di viaggio può rispondere rapidamente alle domande degli utenti senza dover recuperare queste informazioni da una fonte esterna in tempo reale. Questo rende l'applicazione più efficiente e reattiva.

### Avviare il Piano con un Obiettivo Prima di Iterare

Avviare un piano con un obiettivo significa iniziare con un obiettivo chiaro o un risultato target in mente. Definendo questo obiettivo sin dall'inizio, il modello può usarlo come principio guida durante tutto il processo iterativo. Questo aiuta a garantire che ogni iterazione si avvicini al raggiungimento del risultato desiderato, rendendo il processo più efficiente e focalizzato.

Ecco un esempio di come potresti avviare un piano di viaggio con un obiettivo prima di iterare per un agente di viaggio in Python:

### Scenario

Un agente di viaggio vuole pianificare una vacanza personalizzata per un cliente. L'obiettivo è creare un itinerario che massimizzi la soddisfazione del cliente in base alle sue preferenze e al budget.

### Passaggi

1. Definire le preferenze e il budget del cliente.
2. Avviare il piano iniziale basato su queste preferenze.
3. Iterare per affinare il piano ottimizzando la soddisfazione del cliente.

#### Codice Python

```python
class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def bootstrap_plan(self, preferences, budget):
        plan = []
        total_cost = 0

        for destination in self.destinations:
            if total_cost + destination['cost'] <= budget and self.match_preferences(destination, preferences):
                plan.append(destination)
                total_cost += destination['cost']

        return plan

    def match_preferences(self, destination, preferences):
        for key, value in preferences.items():
            if destination.get(key) != value:
                return False
        return True

    def iterate_plan(self, plan, preferences, budget):
        for i in range(len(plan)):
            for destination in self.destinations:
                if destination not in plan and self.match_preferences(destination, preferences) and self.calculate_cost(plan, destination) <= budget:
                    plan[i] = destination
                    break
        return plan

    def calculate_cost(self, plan, new_destination):
        return sum(destination['cost'] for destination in plan) + new_destination['cost']

# Esempio di utilizzo
destinations = [
    {"name": "Paris", "cost": 1000, "activity": "sightseeing"},
    {"name": "Tokyo", "cost": 1200, "activity": "shopping"},
    {"name": "New York", "cost": 900, "activity": "sightseeing"},
    {"name": "Sydney", "cost": 1100, "activity": "beach"},
]

preferences = {"activity": "sightseeing"}
budget = 2000

travel_agent = TravelAgent(destinations)
initial_plan = travel_agent.bootstrap_plan(preferences, budget)
print("Initial Plan:", initial_plan)

refined_plan = travel_agent.iterate_plan(initial_plan, preferences, budget)
print("Refined Plan:", refined_plan)
```

#### Spiegazione del codice

1. **Inizializzazione (metodo `__init__`)**: La classe `TravelAgent` è inizializzata con una lista di possibili destinazioni, ciascuna con attributi come nome, costo e tipo di attività.

2. **Avvio del Piano (metodo `bootstrap_plan`)**: Questo metodo crea un piano di viaggio iniziale basato sulle preferenze e sul budget del cliente. Itera attraverso la lista delle destinazioni e le aggiunge al piano se corrispondono alle preferenze del cliente e rientrano nel budget.

3. **Corrispondenza delle Preferenze (metodo `match_preferences`)**: Questo metodo verifica se una destinazione corrisponde alle preferenze del cliente.

4. **Iterazione del Piano (metodo `iterate_plan`)**: Questo metodo affina il piano iniziale cercando di sostituire ogni destinazione nel piano con una corrispondenza migliore, tenendo conto delle preferenze del cliente e delle limitazioni di budget.

5. **Calcolo del Costo (metodo `calculate_cost`)**: Questo metodo calcola il costo totale del piano attuale, includendo una potenziale nuova destinazione.

#### Esempio di utilizzo

- **Piano Iniziale**: L'agente di viaggio crea un piano iniziale basato sulle preferenze del cliente per visite turistiche e un budget di $2000.
- **Piano Affinato**: L'agente di viaggio itera il piano, ottimizzandolo in base alle preferenze e al budget del cliente.

Avviando il piano con un obiettivo chiaro (ad esempio, massimizzare la soddisfazione del cliente) e iterando per affinare il piano, l'agente di viaggio può creare un itinerario personalizzato e ottimizzato per il cliente. Questo approccio garantisce che il piano di viaggio sia allineato fin dall'inizio con le preferenze e il budget del cliente e migliori ad ogni iterazione.

### Sfruttare il Modello Linguistico su Grande Scala per Riordinare e Valutare

I Modelli Linguistici di Grandi Dimensioni (LLM) possono essere utilizzati per il riordino e la valutazione assegnando un punteggio alla pertinenza e qualità dei documenti recuperati o delle risposte generate. Ecco come funziona:

**Recupero:** Il passaggio iniziale recupera un set di documenti o risposte candidate in base alla query.

**Riordinamento:** L'LLM valuta queste candidate e le riordina basandosi sulla pertinenza e qualità. Questo passaggio assicura che le informazioni più rilevanti e di alta qualità siano presentate per prime.

**Valutazione:** L'LLM assegna punteggi a ciascuna candidata, riflettendo la loro pertinenza e qualità. Questo aiuta a selezionare la migliore risposta o documento per l'utente.

Sfruttando gli LLM per il riordino e la valutazione, il sistema può fornire informazioni più accurate e contestualmente rilevanti, migliorando l'esperienza complessiva dell'utente.

Ecco un esempio di come un agente di viaggio potrebbe usare un Modello Linguistico di Grandi Dimensioni (LLM) per riordinare e valutare destinazioni di viaggio basandosi sulle preferenze dell'utente in Python:

#### Scenario - Viaggio basato sulle Preferenze

Un agente di viaggio vuole raccomandare le migliori destinazioni di viaggio a un cliente in base alle sue preferenze. L'LLM aiuterà a riordinare e valutare le destinazioni per assicurare che le opzioni più rilevanti siano presentate.

#### Passaggi:

1. Raccogliere le preferenze dell'utente.
2. Recuperare una lista di potenziali destinazioni di viaggio.
3. Usare l'LLM per riordinare e valutare le destinazioni basandosi sulle preferenze utente.

Ecco come aggiornare il precedente esempio per usare i Servizi Azure OpenAI:

#### Requisiti

1. Devi avere un abbonamento Azure.
2. Crea una risorsa Azure OpenAI e ottieni la chiave API.

#### Esempio di codice Python

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Genera un prompt per Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Definisci header e payload per la richiesta
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Chiama l'API Azure OpenAI per ottenere le destinazioni ririordinate e valutate
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Estrai e restituisci le raccomandazioni
        recommendations = response_data['choices'][0]['text'].strip().split('\n')
        return recommendations

    def generate_prompt(self, preferences):
        prompt = "Here are the travel destinations ranked and scored based on the following user preferences:\n"
        for key, value in preferences.items():
            prompt += f"{key}: {value}\n"
        prompt += "\nDestinations:\n"
        for destination in self.destinations:
            prompt += f"- {destination['name']}: {destination['description']}\n"
        return prompt

# Esempio di utilizzo
destinations = [
    {"name": "Paris", "description": "City of lights, known for its art, fashion, and culture."},
    {"name": "Tokyo", "description": "Vibrant city, famous for its modernity and traditional temples."},
    {"name": "New York", "description": "The city that never sleeps, with iconic landmarks and diverse culture."},
    {"name": "Sydney", "description": "Beautiful harbour city, known for its opera house and stunning beaches."},
]

preferences = {"activity": "sightseeing", "culture": "diverse"}
api_key = 'your_azure_openai_api_key'
endpoint = 'https://your-endpoint.com/openai/deployments/your-deployment-name/completions?api-version=2022-12-01'

travel_agent = TravelAgent(destinations)
recommendations = travel_agent.get_recommendations(preferences, api_key, endpoint)
print("Recommended Destinations:")
for rec in recommendations:
    print(rec)
```

#### Spiegazione del codice - Preference Booker

1. **Inizializzazione**: La classe `TravelAgent` è inizializzata con una lista di potenziali destinazioni di viaggio, ognuna con attributi come nome e descrizione.

2. **Ottenere Raccomandazioni (metodo `get_recommendations`)**: Questo metodo genera un prompt per il servizio Azure OpenAI basato sulle preferenze dell'utente e fa una richiesta HTTP POST all'API Azure OpenAI per ottenere destinazioni riordinate e valutate.

3. **Generazione Prompt (metodo `generate_prompt`)**: Questo metodo costruisce un prompt per Azure OpenAI, includendo le preferenze dell'utente e la lista delle destinazioni. Il prompt guida il modello a riordinare e valutare le destinazioni in base alle preferenze fornite.

4. **Chiamata API**: La libreria `requests` viene usata per effettuare una richiesta HTTP POST all'endpoint dell'API Azure OpenAI. La risposta contiene le destinazioni riordinate e valutate.

5. **Esempio di Utilizzo**: L'agente di viaggio raccoglie le preferenze dell'utente (ad esempio interesse per visite turistiche e cultura diversificata) e usa il servizio Azure OpenAI per ottenere raccomandazioni riordinate e valutate per destinazioni di viaggio.

Assicurati di sostituire `your_azure_openai_api_key` con la tua chiave API Azure OpenAI reale e `https://your-endpoint.com/...` con l'URL effettivo dell'endpoint della tua distribuzione Azure OpenAI.

Sfruttando l'LLM per il riordino e la valutazione, l'agente di viaggio può fornire raccomandazioni di viaggio più personalizzate e rilevanti ai clienti, migliorando la loro esperienza complessiva.

### RAG: Tecnica di Prompting vs Strumento

Retrieval-Augmented Generation (RAG) può essere sia una tecnica di prompting sia uno strumento nello sviluppo di agenti AI. Comprendere la distinzione tra i due può aiutarti a sfruttare RAG più efficacemente nei tuoi progetti.

#### RAG come Tecnica di Prompting

**Cos'è?**

- Come tecnica di prompting, RAG consiste nel formulare query o prompt specifici per guidare il recupero di informazioni rilevanti da un grande corpus o database. Queste informazioni vengono poi usate per generare risposte o azioni.

**Come funziona:**

1. **Formulazione dei Prompt**: Creare prompt o query ben strutturate basate sul compito o sull'input dell'utente.
2. **Recupero delle Informazioni**: Usare i prompt per cercare dati rilevanti da una base di conoscenza o dataset preesistente.
3. **Generazione della Risposta**: Combinare le informazioni recuperate con modelli AI generativi per produrre una risposta coerente e completa.

**Esempio in Agente di Viaggio**:

- Input Utente: "Voglio visitare musei a Parigi."
- Prompt: "Trova i principali musei a Parigi."
- Informazioni Recuperate: Dettagli sul Museo del Louvre, Musée d'Orsay, ecc.
- Risposta Generata: "Ecco alcuni dei principali musei a Parigi: Museo del Louvre, Musée d'Orsay e Centre Pompidou."

#### RAG come Strumento

**Cos'è?**

- Come strumento, RAG è un sistema integrato che automatizza il processo di recupero e generazione, facilitando gli sviluppatori nell'implementare funzionalità AI complesse senza dover creare prompt manualmente per ogni query.

**Come funziona:**

1. **Integrazione**: Incorporare RAG nell'architettura dell'agente AI, permettendogli di gestire automaticamente recupero e generazione.
2. **Automazione**: Lo strumento gestisce l'intero processo, dal ricevere l'input dell'utente fino alla generazione della risposta finale, senza richiedere prompt espliciti per ogni passaggio.
3. **Efficienza**: Migliora le prestazioni dell'agente razionalizzando il processo di recupero e generazione, consentendo risposte più rapide e precise.

**Esempio in Agente di Viaggio**:

- Input Utente: "Voglio visitare musei a Parigi."
- Strumento RAG: Recupera automaticamente informazioni sui musei e genera una risposta.
- Risposta Generata: "Ecco alcuni dei principali musei a Parigi: Museo del Louvre, Musée d'Orsay e Centre Pompidou."

### Confronto

| Aspetto                | Tecnica di Prompting                                    | Strumento                                           |
|------------------------|---------------------------------------------------------|----------------------------------------------------|
| **Manuale vs Automatico** | Formulazione manuale dei prompt per ogni query.         | Processo automatico per recupero e generazione.    |
| **Controllo**           | Offre maggiore controllo sul processo di recupero.      | Razionalizza e automatizza recupero e generazione.|
| **Flessibilità**         | Permette prompt personalizzati basati su esigenze specifiche. | Più efficiente per implementazioni su larga scala.  |
| **Complessità**          | Richiede la creazione e l’ottimizzazione di prompt.      | Più facile da integrare nell’architettura di un agente AI.|

### Esempi Pratici

**Esempio Tecnica di Prompting:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Esempio Strumento:**

```python
class Travel_Agent:
    def __init__(self):
        self.rag_tool = RAGTool()

    def get_museums_in_paris(self):
        user_input = "I want to visit museums in Paris."
        response = self.rag_tool.retrieve_and_generate(user_input)
        return response

travel_agent = Travel_Agent()
museums = travel_agent.get_museums_in_paris()
print("Top Museums in Paris:", museums)
```

### Valutazione della Rilevanza

La valutazione della rilevanza è un aspetto cruciale nelle prestazioni di un agente AI. Assicura che le informazioni recuperate e generate siano appropriate, accurate e utili per l'utente. Esploriamo come valutare la rilevanza negli agenti AI, includendo esempi pratici e tecniche.

#### Concetti Chiave nella Valutazione della Rilevanza

1. **Consapevolezza del Contesto**:
   - L'agente deve comprendere il contesto della query dell'utente per recuperare e generare informazioni rilevanti.
   - Esempio: Se un utente chiede "i migliori ristoranti a Parigi", l'agente dovrebbe considerare le preferenze dell'utente, come tipo di cucina e budget.

2. **Accuratezza**:
   - Le informazioni fornite dall'agente devono essere corrette e aggiornate.
   - Esempio: Raccomandare ristoranti attualmente aperti con buone recensioni anziché opzioni obsolete o chiuse.

3. **Intento dell'Utente**:
   - L'agente deve dedurre l'intento dell'utente dietro la query per fornire le informazioni più rilevanti.
   - Esempio: Se un utente chiede "hotel economici", l'agente dovrebbe dare priorità a opzioni a prezzi accessibili.

4. **Ciclo di Feedback**:
   - Raccogliere e analizzare costantemente i feedback degli utenti aiuta l'agente a migliorare il processo di valutazione della rilevanza.
   - Esempio: Incorporare valutazioni e feedback degli utenti sulle raccomandazioni precedenti per migliorare le risposte future.

#### Tecniche Pratiche per Valutare la Rilevanza

1. **Punteggio di Rilevanza**:
   - Assegnare un punteggio di rilevanza a ogni elemento recuperato basato su quanto corrisponde alla query e alle preferenze dell'utente.
   - Esempio:

     ```python
     def relevance_score(item, query):
         score = 0
         if item['category'] in query['interests']:
             score += 1
         if item['price'] <= query['budget']:
             score += 1
         if item['location'] == query['destination']:
             score += 1
         return score
     ```

2. **Filtraggio e Ordinamento**:
   - Filtrare gli elementi irrilevanti e ordinare quelli rimanenti in base ai punteggi di rilevanza.
   - Esempio:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Restituisci i primi 10 elementi rilevanti
     ```

3. **Elaborazione del Linguaggio Naturale (NLP)**:
   - Usare tecniche NLP per comprendere la query dell'utente e recuperare informazioni rilevanti.
   - Esempio:

     ```python
     def process_query(query):
         # Usa l'NLP per estrarre informazioni chiave dalla query dell'utente
         processed_query = nlp(query)
         return processed_query
     ```

4. **Integrazione del Feedback Utente**:
   - Raccogliere feedback sulle raccomandazioni fornite e usarlo per regolare le valutazioni di rilevanza future.
   - Esempio:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Esempio: Valutazione della Rilevanza in Travel Agent

Ecco un esempio pratico di come Travel Agent possa valutare la rilevanza delle raccomandazioni di viaggio:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        ranked_hotels = self.filter_and_rank(hotels, self.user_preferences)
        itinerary = create_itinerary(flights, ranked_hotels, attractions)
        return itinerary

    def filter_and_rank(self, items, query):
        ranked_items = sorted(items, key=lambda item: self.relevance_score(item, query), reverse=True)
        return ranked_items[:10]  # Restituisce i primi 10 elementi rilevanti

    def relevance_score(self, item, query):
        score = 0
        if item['category'] in query['interests']:
            score += 1
        if item['price'] <= query['budget']:
            score += 1
        if item['location'] == query['destination']:
            score += 1
        return score

    def adjust_based_on_feedback(self, feedback, items):
        for item in items:
            if item['name'] in feedback['liked']:
                item['relevance'] += 1
            if item['name'] in feedback['disliked']:
                item['relevance'] -= 1
        return items

# Esempio di utilizzo
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_items = travel_agent.adjust_based_on_feedback(feedback, itinerary['hotels'])
print("Updated Itinerary with Feedback:", updated_items)
```

### Ricerca con l’Intento

La ricerca con intento comporta la comprensione e l'interpretazione dello scopo o obiettivo sottostante dietro la query di un utente per recuperare e generare le informazioni più pertinenti e utili. Questo approccio va oltre il semplice abbinamento di parole chiave e si concentra sul cogliere i reali bisogni e il contesto dell'utente.

#### Concetti Chiave nella Ricerca con Intento

1. **Comprensione dell’Intento Utente**:
   - L’intento utente può essere categorizzato in tre tipi principali: informativo, navigazionale e transazionale.
     - **Intento Informativo**: L’utente cerca informazioni su un argomento (es. “Quali sono i migliori musei a Parigi?”).
     - **Intento Navigazionale**: L’utente vuole accedere a un sito o pagina specifica (es. “Sito ufficiale del Museo del Louvre”).
     - **Intento Transazionale**: L’utente mira a compiere un’azione, come prenotare un volo o fare un acquisto (es. “Prenota un volo per Parigi”).

2. **Consapevolezza del Contesto**:
   - Analizzare il contesto della query aiuta a identificare accuratamente l’intento. Ciò include considerare interazioni precedenti, preferenze dell’utente e dettagli specifici della query corrente.

3. **Elaborazione del Linguaggio Naturale (NLP)**:
   - Tecniche NLP sono impiegate per comprendere e interpretare le query in linguaggio naturale degli utenti, incluso riconoscimento entità, analisi del sentimento e parsing della query.

4. **Personalizzazione**:
   - Personalizzare i risultati di ricerca in base alla storia, preferenze e feedback dell'utente aumenta la rilevanza delle informazioni recuperate.

#### Esempio Pratico: Ricerca con Intento in Travel Agent

Prendiamo Travel Agent come esempio per vedere come implementare la ricerca con intento.

1. **Raccolta delle Preferenze Utente**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Comprensione dell’Intento Utente**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Consapevolezza del Contesto**
   ```python
   def analyze_context(query, user_history):
       # Combina la query attuale con la cronologia dell'utente per comprendere il contesto
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Cerca e Personalizza i Risultati**

   ```python
   def search_with_intent(query, preferences, user_history):
       intent = identify_intent(query)
       context = analyze_context(query, user_history)
       if intent == "informational":
           search_results = search_information(query, preferences)
       elif intent == "navigational":
           search_results = search_navigation(query)
       elif intent == "transactional":
           search_results = search_transaction(query, preferences)
       personalized_results = personalize_results(search_results, user_history)
       return personalized_results

   def search_information(query, preferences):
       # Esempio di logica di ricerca per intento informativo
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Esempio di logica di ricerca per intento navigazionale
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Esempio di logica di ricerca per intento transazionale
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Esempio di logica di personalizzazione
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Restituisce i primi 10 risultati personalizzati
   ```

5. **Esempio di Utilizzo**

   ```python
   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   user_history = ["Louvre Museum website", "Book flight to Paris"]
   query = "best museums in Paris"
   results = search_with_intent(query, preferences, user_history)
   print("Search Results:", results)
   ```

---

## 4. Generazione di Codice come Strumento

Gli agenti generativi di codice utilizzano modelli di intelligenza artificiale per scrivere ed eseguire codice, risolvendo problemi complessi e automatizzando compiti.

### Agenti Generativi di Codice

Gli agenti generativi di codice usano modelli di IA generativa per scrivere ed eseguire codice. Questi agenti possono risolvere problemi complessi, automatizzare compiti e fornire approfondimenti preziosi generando ed eseguendo codice in vari linguaggi di programmazione.

#### Applicazioni Pratiche

1. **Generazione Automatica di Codice**: Generare frammenti di codice per compiti specifici, come analisi dati, web scraping o machine learning.
2. **SQL come RAG**: Usare query SQL per recuperare e manipolare dati da database.
3. **Risoluzione di Problemi**: Creare ed eseguire codice per risolvere problemi specifici, come ottimizzare algoritmi o analizzare dati.

#### Esempio: Agente Generativo di Codice per Analisi Dati

Immagina di progettare un agente generativo di codice. Ecco come potrebbe funzionare:

1. **Compito**: Analizzare un dataset per identificare tendenze e pattern.
2. **Passi**:
   - Caricare il dataset in uno strumento di analisi dati.
   - Generare query SQL per filtrare e aggregare i dati.
   - Eseguire le query e recuperare i risultati.
   - Usare i risultati per generare visualizzazioni e approfondimenti.
3. **Risorse Necessarie**: Accesso al dataset, strumenti di analisi dati, e capacità SQL.
4. **Esperienza**: Usare risultati di analisi passate per migliorare accuratezza e rilevanza di analisi future.

### Esempio: Agente Generativo di Codice per Agenzia di Viaggi

In questo esempio, progettiamo un agente generativo di codice, Travel Agent, per assistere gli utenti nella pianificazione dei viaggi generando ed eseguendo codice. Questo agente può gestire compiti come recuperare opzioni di viaggio, filtrare risultati e compilare un itinerario usando IA generativa.

#### Panoramica dell’Agente Generativo di Codice

1. **Raccolta Preferenze Utente**: Raccoglie input dell’utente come destinazione, date di viaggio, budget e interessi.
2. **Generazione di Codice per il Recupero Dati**: Genera frammenti di codice per recuperare dati su voli, hotel e attrazioni.
3. **Esecuzione del Codice Generato**: Esegue il codice generato per ottenere informazioni in tempo reale.
4. **Generazione dell’Itinerario**: Compila i dati ottenuti in un piano di viaggio personalizzato.
5. **Adattamento Basato sul Feedback**: Riceve feedback dall’utente e rigenera codice se necessario per affinare i risultati.

#### Implementazione Passo-Passo

1. **Raccolta Preferenze Utente**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generazione di Codice per Recupero Dati**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Esempio: Genera codice per cercare voli in base alle preferenze dell'utente
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Esempio: Genera codice per cercare hotel
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Esecuzione del Codice Generato**

   ```python
   def execute_code(code):
       # Esegui il codice generato usando exec
       exec(code)
       result = locals()
       return result

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   
   flight_code = generate_code_to_fetch_data(preferences)
   hotel_code = generate_code_to_fetch_hotels(preferences)
   
   flights = execute_code(flight_code)
   hotels = execute_code(hotel_code)

   print("Flight Options:", flights)
   print("Hotel Options:", hotels)
   ```

4. **Generazione dell’Itinerario**

   ```python
   def generate_itinerary(flights, hotels, attractions):
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   attractions = search_attractions(preferences)
   itinerary = generate_itinerary(flights, hotels, attractions)
   print("Suggested Itinerary:", itinerary)
   ```

5. **Adattamento Basato sul Feedback**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Regola le preferenze in base al feedback dell'utente
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Rigenera ed esegui il codice con le preferenze aggiornate
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Sfruttare consapevolezza ambientale e ragionamento

Basarsi sullo schema della tabella può effettivamente migliorare il processo di generazione delle query sfruttando la consapevolezza ambientale e il ragionamento.

Ecco un esempio di come questo può essere fatto:

1. **Comprensione dello Schema**: Il sistema capirà lo schema della tabella e utilizzerà queste informazioni per ancorare la generazione delle query.
2. **Adattamento Basato sul Feedback**: Il sistema adatterà le preferenze dell’utente in base al feedback e ragionerà su quali campi dello schema devono essere aggiornati.
3. **Generazione ed Esecuzione di Query**: Il sistema genererà ed eseguirà query per recuperare dati aggiornati su voli e hotel basandosi sulle nuove preferenze.

Ecco un esempio aggiornato di codice Python che incorpora questi concetti:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Regola le preferenze in base al feedback dell'utente
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Ragionamento basato sullo schema per regolare altre preferenze correlate
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Logica personalizzata per regolare le preferenze basata su schema e feedback
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Genera codice per recuperare i dati dei voli basati sulle preferenze aggiornate
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Genera codice per recuperare i dati degli hotel basati sulle preferenze aggiornate
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simula l'esecuzione del codice e restituisce dati mock
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Genera un itinerario basato su voli, hotel e attrazioni
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Esempio di schema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Esempio di utilizzo
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Rigenera ed esegui il codice con le preferenze aggiornate
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Spiegazione - Prenotazione Basata sul Feedback

1. **Consapevolezza dello Schema**: Il dizionario `schema` definisce come le preferenze devono essere adattate in base al feedback. Include campi come `favorites` e `avoid`, con corrispondenti aggiustamenti.
2. **Adattamento delle Preferenze (metodo `adjust_based_on_feedback`)**: Questo metodo adatta le preferenze basandosi sul feedback dell’utente e sullo schema.
3. **Aggiustamenti Basati sull’Ambiente (metodo `adjust_based_on_environment`)**: Questo metodo personalizza gli aggiustamenti in base allo schema e al feedback.
4. **Generazione ed Esecuzione di Query**: Il sistema genera il codice per recuperare dati aggiornati su voli e hotel basandosi sulle preferenze modificate e simula l’esecuzione di queste query.
5. **Generazione dell’Itinerario**: Il sistema crea un itinerario aggiornato in base ai nuovi dati su voli, hotel e attrazioni.

Rendendo il sistema consapevole dell’ambiente e capace di ragionare sullo schema, è possibile generare query più precise e rilevanti, portando a raccomandazioni di viaggio migliori e a un’esperienza utente più personalizzata.

### Uso di SQL come Tecnica di Retrieval-Augmented Generation (RAG)

SQL (Structured Query Language) è uno strumento potente per interagire con i database. Quando usato come parte di un approccio Retrieval-Augmented Generation (RAG), SQL può recuperare dati rilevanti dai database per informare e generare risposte o azioni in agenti AI. Vediamo come SQL può essere utilizzato come tecnica RAG nel contesto di Travel Agent.

#### Concetti Chiave

1. **Interazione con Database**:
   - SQL è usato per interrogare database, recuperare informazioni rilevanti e manipolare dati.
   - Esempio: Recupero dettagli voli, informazioni sugli hotel e attrazioni da un database di viaggio.

2. **Integrazione con RAG**:
   - Le query SQL vengono generate in base all’input e alle preferenze dell’utente.
   - I dati recuperati vengono poi usati per generare raccomandazioni personalizzate o azioni.

3. **Generazione Dinamica di Query**:
   - L’agente IA genera query SQL dinamiche basate sul contesto e sulle esigenze dell’utente.
   - Esempio: Personalizzazione di query SQL per filtrare risultati basati su budget, date e interessi.

#### Applicazioni

- **Generazione Automatica di Codice**: Generare frammenti di codice per compiti specifici.
- **SQL come RAG**: Usare query SQL per manipolare dati.
- **Risoluzione di Problemi**: Creare ed eseguire codice per risolvere problemi.

**Esempio**:
Un agente di analisi dati:

1. **Compito**: Analizzare un dataset per trovare tendenze.
2. **Passi**:
   - Caricare il dataset.
   - Generare query SQL per filtrare dati.
   - Eseguire query e recuperare risultati.
   - Generare visualizzazioni e approfondimenti.
3. **Risorse**: Accesso al dataset, capacità SQL.
4. **Esperienza**: Usare risultati passati per migliorare analisi future.

#### Esempio Pratico: Uso di SQL in Travel Agent

1. **Raccolta Preferenze Utente**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generazione di Query SQL**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Esecuzione di Query SQL**

   ```python
   import sqlite3

   def execute_sql_query(query, database="travel.db"):
       connection = sqlite3.connect(database)
       cursor = connection.cursor()
       cursor.execute(query)
       results = cursor.fetchall()
       connection.close()
       return results
   ```

4. **Generazione di Raccomandazioni**

   ```python
   def generate_recommendations(preferences):
       flight_query = generate_sql_query("flights", preferences)
       hotel_query = generate_sql_query("hotels", preferences)
       attraction_query = generate_sql_query("attractions", preferences)
       
       flights = execute_sql_query(flight_query)
       hotels = execute_sql_query(hotel_query)
       attractions = execute_sql_query(attraction_query)
       
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   itinerary = generate_recommendations(preferences)
   print("Suggested Itinerary:", itinerary)
   ```

#### Esempio di Query SQL

1. **Query per Volo**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Query per Hotel**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Query per Attrazione**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Sfruttando SQL come parte della tecnica Retrieval-Augmented Generation (RAG), agenti AI come Travel Agent possono recuperare dinamicamente e utilizzare dati pertinenti per fornire raccomandazioni accurate e personalizzate.

### Esempio di Metacognizione

Per dimostrare un’implementazione della metacognizione, creiamo un agente semplice che *riflette sul proprio processo decisionale* mentre risolve un problema. In questo esempio, costruiremo un sistema in cui un agente cerca di ottimizzare la scelta di un hotel, ma poi valuta il proprio ragionamento e aggiusta la strategia quando compie errori o scelte subottimali.

Simuleremo questo usando un esempio base in cui l’agente seleziona gli hotel basandosi su una combinazione di prezzo e qualità, ma “riflette” sulle sue decisioni e si adatta di conseguenza.

#### Come questo illustra la metacognizione:

1. **Decisione Iniziale**: L’agente sceglierà l’hotel più economico, senza capire l’impatto della qualità.
2. **Riflessione e Valutazione**: Dopo la scelta iniziale, l’agente controllerà se l’hotel è una scelta “scorretta” usando il feedback dell’utente. Se trova che la qualità dell’hotel era troppo bassa, riflette sul proprio ragionamento.
3. **Aggiustamento della Strategia**: L’agente modifica la sua strategia basandosi sulla riflessione, passando da “più economico” a “massima qualità”, migliorando così il processo decisionale nelle iterazioni future.

Ecco un esempio:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Memorizza gli hotel scelti in precedenza
        self.corrected_choices = []  # Memorizza le scelte corrette
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Strategie disponibili

    def recommend_hotel(self, hotels, strategy):
        """
        Recommend a hotel based on the chosen strategy.
        The strategy can either be 'cheapest' or 'highest_quality'.
        """
        if strategy == 'cheapest':
            recommended = min(hotels, key=lambda x: x['price'])
        elif strategy == 'highest_quality':
            recommended = max(hotels, key=lambda x: x['quality'])
        else:
            recommended = None
        self.previous_choices.append((strategy, recommended))
        return recommended

    def reflect_on_choice(self):
        """
        Reflect on the last choice made and decide if the agent should adjust its strategy.
        The agent considers if the previous choice led to a poor outcome.
        """
        if not self.previous_choices:
            return "No choices made yet."

        last_choice_strategy, last_choice = self.previous_choices[-1]
        # Supponiamo di avere un feedback dell'utente che ci dice se l'ultima scelta è stata buona o no
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Adatta la strategia se la scelta precedente è stata insoddisfacente
            new_strategy = 'highest_quality' if last_choice_strategy == 'cheapest' else 'cheapest'
            self.corrected_choices.append((new_strategy, last_choice))
            return f"Reflecting on choice. Adjusting strategy to {new_strategy}."
        else:
            return "The choice was good. No need to adjust."

    def get_user_feedback(self, hotel):
        """
        Simulate user feedback based on hotel attributes.
        For simplicity, assume if the hotel is too cheap, the feedback is "bad".
        If the hotel has quality less than 7, feedback is "bad".
        """
        if hotel['price'] < 100 or hotel['quality'] < 7:
            return "bad"
        return "good"

# Simula una lista di hotel (prezzo e qualità)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Crea un agente
agent = HotelRecommendationAgent()

# Passo 1: L'agente consiglia un hotel usando la strategia "più economico"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Passo 2: L'agente riflette sulla scelta e adatta la strategia se necessario
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Passo 3: L'agente consiglia di nuovo, questa volta usando la strategia adattata
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Capacità di Metacognizione degli Agenti

La chiave è la capacità dell’agente di:
- Valutare le scelte precedenti e il processo decisionale.
- Aggiustare la strategia basandosi su questa riflessione, cioè la metacognizione in azione.

Questa è una forma semplice di metacognizione dove il sistema è capace di modificare il proprio processo di ragionamento basandosi sul feedback interno.

### Conclusione

La metacognizione è uno strumento potente che può migliorare significativamente le capacità degli agenti IA. Incorporando processi metacognitivi, puoi progettare agenti più intelligenti, adattabili ed efficienti. Usa le risorse aggiuntive per esplorare ulteriormente il mondo affascinante della metacognizione negli agenti IA.

### Hai Altre Domande sul Design Pattern Metacognition?

Unisciti al [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) per incontrare altri studenti, partecipare alle office hours e ottenere risposte alle tue domande sugli AI Agents.

## Lezione Precedente

[Multi-Agent Design Pattern](../08-multi-agent/README.md)

## Lezione Successiva

[AI Agents in Production](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Dichiarazione di non responsabilità**:  
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Pur puntando all'accuratezza, si prega di tenere presente che le traduzioni automatiche possono contenere errori o inesattezze. Il documento originale nella lingua madre deve essere considerato la fonte autorevole. Per informazioni critiche, si consiglia una traduzione professionale effettuata da un essere umano. Non ci assumiamo responsabilità per eventuali malintesi o interpretazioni errate derivanti dall’utilizzo di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->