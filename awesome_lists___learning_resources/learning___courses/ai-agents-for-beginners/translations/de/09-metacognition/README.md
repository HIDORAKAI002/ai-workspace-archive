[![Multi-Agent-Design](../../../translated_images/de/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Klicken Sie auf das Bild oben, um das Video zu dieser Lektion anzusehen)_
# Metakognition bei KI-Agenten

## Einführung

Willkommen zur Lektion über Metakognition bei KI-Agenten! Dieses Kapitel ist für Anfänger konzipiert, die neugierig darauf sind, wie KI-Agenten über ihre eigenen Denkprozesse nachdenken können. Am Ende dieser Lektion werden Sie Schlüsselkonzepte verstehen und mit praktischen Beispielen ausgestattet sein, um Metakognition im Design von KI-Agenten anzuwenden.

## Lernziele

Nach Abschluss dieser Lektion können Sie:

1. Die Auswirkungen von Schleifen im Denken bei Agentendefinitionen verstehen.
2. Planungs- und Bewertungstechniken nutzen, um selbstkorrigierende Agenten zu unterstützen.
3. Eigene Agenten erstellen, die in der Lage sind, Code zu manipulieren, um Aufgaben zu erfüllen.

## Einführung in die Metakognition

Metakognition bezieht sich auf kognitive Prozesse höherer Ordnung, die das Nachdenken über das eigene Denken umfassen. Für KI-Agenten bedeutet dies, in der Lage zu sein, ihre Handlungen basierend auf Selbstbewusstsein und vergangenen Erfahrungen zu bewerten und anzupassen. Metakognition oder „Denken über das Denken“ ist ein wichtiger Begriff bei der Entwicklung agentischer KI-Systeme. Es bedeutet, dass KI-Systeme sich ihrer eigenen internen Prozesse bewusst sind und ihr Verhalten entsprechend überwachen, regulieren und anpassen können. Ähnlich wie wir es tun, wenn wir die Situation einschätzen oder ein Problem betrachten. Dieses Selbstbewusstsein kann KI-Systemen helfen, bessere Entscheidungen zu treffen, Fehler zu identifizieren und ihre Leistung im Laufe der Zeit zu verbessern – was wieder auf den Turing-Test und die Debatte zurückführt, ob KI die Kontrolle übernehmen wird.

Im Kontext agentischer KI-Systeme kann Metakognition helfen, mehrere Herausforderungen zu bewältigen, wie z.B.:
- Transparenz: Sicherstellen, dass KI-Systeme ihre Denkprozesse und Entscheidungen erklären können.
- Denken: Die Fähigkeit der KI-Systeme verbessern, Informationen zu synthetisieren und fundierte Entscheidungen zu treffen.
- Anpassung: Ermöglichen, dass KI-Systeme sich an neue Umgebungen und sich ändernde Bedingungen anpassen.
- Wahrnehmung: Die Genauigkeit der KI-Systeme bei der Erkennung und Interpretation von Umgebungsdaten verbessern.

### Was ist Metakognition?

Metakognition oder „Denken über das Denken“ ist ein kognitiver Prozess höherer Ordnung, der Selbstbewusstsein und Selbstregulation der eigenen kognitiven Prozesse umfasst. Im Bereich der KI befähigt Metakognition Agenten, ihre Strategien und Handlungen zu bewerten und anzupassen, was zu verbesserten Fähigkeiten bei Problemlösung und Entscheidungsfindung führt. Durch das Verständnis von Metakognition können Sie KI-Agenten entwerfen, die nicht nur intelligenter, sondern auch anpassungsfähiger und effizienter sind. Echte Metakognition zeigt sich darin, dass die KI explizit über ihr eigenes Denken reflektiert.

Beispiel: „Ich habe billigere Flüge priorisiert, weil… vielleicht verpasse ich Direktflüge, also überprüfe ich das nochmal.“
Verfolgen, wie oder warum sie eine bestimmte Route gewählt hat.
- Feststellen, dass Fehler gemacht wurden, weil zu stark auf Nutzerpräferenzen vom letzten Mal vertraut wurde, daher wird die Entscheidungsstrategie und nicht nur die finale Empfehlung angepasst.
- Muster erkennen wie: „Immer wenn ich sehe, dass der Nutzer ‚zu voll‘ erwähnt, sollte ich nicht nur bestimmte Attraktionen entfernen, sondern auch reflektieren, dass meine Methode, ‚Top-Attraktionen‘ auszuwählen, fehlerhaft ist, wenn ich immer nach Beliebtheit sortiere.“

### Bedeutung der Metakognition bei KI-Agenten

Metakognition spielt eine entscheidende Rolle im Design von KI-Agenten aus mehreren Gründen:

![Bedeutung der Metakognition](../../../translated_images/de/importance-of-metacognition.b381afe9aae352f7.webp)

- Selbstreflexion: Agenten können ihre eigene Leistung bewerten und Verbesserungsbereiche identifizieren.
- Anpassungsfähigkeit: Agenten können ihre Strategien basierend auf Erfahrungen und sich ändernden Umgebungen anpassen.
- Fehlerkorrektur: Agenten können Fehler autonom erkennen und korrigieren, was zu genaueren Ergebnissen führt.
- Ressourcenmanagement: Agenten können die Nutzung von Ressourcen wie Zeit und Rechenleistung durch Planung und Bewertung ihrer Handlungen optimieren.

## Komponenten eines KI-Agenten

Bevor wir in metakognitive Prozesse eintauchen, ist es wichtig, die grundlegenden Komponenten eines KI-Agenten zu verstehen. Ein KI-Agent besteht typischerweise aus:

- Persona: Die Persönlichkeit und Eigenschaften des Agenten, die definieren, wie er mit Nutzern interagiert.
- Werkzeuge: Die Fähigkeiten und Funktionen, die der Agent ausführen kann.
- Fähigkeiten: Das Wissen und die Expertise, über die der Agent verfügt.

Diese Komponenten arbeiten zusammen, um eine „Expertiseeinheit“ zu schaffen, die spezifische Aufgaben ausführen kann.

**Beispiel**:
Betrachten Sie einen Reiseberater – Agenten-Dienste, die nicht nur Ihren Urlaub planen, sondern ihren Weg basierend auf Echtzeitdaten und vergangenen Kundenerfahrungen anpassen.

### Beispiel: Metakognition in einem Reiseberater-Service

Stellen Sie sich vor, Sie entwickeln einen von KI betriebenen Reiseberater-Service. Dieser Agent, „Reiseberater“, unterstützt Nutzer bei der Urlaubsplanung. Um Metakognition einzubinden, muss der Reiseberater seine Handlungen basierend auf Selbstbewusstsein und vergangenen Erfahrungen bewerten und anpassen. So könnte Metakognition eine Rolle spielen:

#### Aktuelle Aufgabe

Die aktuelle Aufgabe ist, einem Nutzer zu helfen, eine Reise nach Paris zu planen.

#### Schritte zur Erfüllung der Aufgabe

1. **Nutzerpräferenzen erfassen**: Fragen Sie den Nutzer nach Reisedaten, Budget, Interessen (z.B. Museen, Küche, Einkaufen) und speziellen Anforderungen.
2. **Informationen abrufen**: Suchen Sie nach Flugoptionen, Unterkünften, Attraktionen und Restaurants, die zu den Präferenzen des Nutzers passen.
3. **Empfehlungen erstellen**: Bieten Sie eine personalisierte Reiseroute mit Flugdaten, Hotelbuchungen und vorgeschlagenen Aktivitäten.
4. **Anpassung basierend auf Feedback**: Fragen Sie den Nutzer nach Feedback zu den Empfehlungen und nehmen Sie notwendige Anpassungen vor.

#### Benötigte Ressourcen

- Zugriff auf Datenbanken für Flüge und Hotelbuchungen.
- Informationen zu Pariser Attraktionen und Restaurants.
- Nutzungsfeedback-Daten aus vorherigen Interaktionen.

#### Erfahrung und Selbstreflexion

Der Reiseberater nutzt Metakognition, um seine Leistung zu bewerten und aus vergangenen Erfahrungen zu lernen. Zum Beispiel:

1. **Analyse des Nutzerfeedbacks**: Der Reiseberater überprüft das Nutzerfeedback, um zu bestimmen, welche Empfehlungen gut ankamen und welche nicht. Er passt zukünftige Vorschläge entsprechend an.
2. **Anpassungsfähigkeit**: Wenn ein Nutzer zuvor erwähnt hat, dass er überfüllte Orte nicht mag, wird der Reiseberater zukünftig vermeiden, beliebte Touristenattraktionen zu Stoßzeiten zu empfehlen.
3. **Fehlerkorrektur**: Wenn der Reiseberater einen Fehler bei einer früheren Buchung gemacht hat, etwa ein Hotel vorgeschlagen hat, das ausgebucht war, lernt er, die Verfügbarkeit rigoroser zu prüfen, bevor Empfehlungen abgegeben werden.

#### Praktisches Beispiel für Entwickler

Hier ein einfaches Beispiel, wie der Code des Reiseberaters aussehen könnte, wenn Metakognition eingebaut wird:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Suche nach Flügen, Hotels und Attraktionen basierend auf Vorlieben
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
        # Feedback analysieren und zukünftige Empfehlungen anpassen
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Beispielanwendung
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

#### Warum Metakognition wichtig ist

- **Selbstreflexion**: Agenten können ihre Leistung analysieren und Verbesserungen identifizieren.
- **Anpassungsfähigkeit**: Agenten können Strategien basierend auf Feedback und veränderten Bedingungen anpassen.
- **Fehlerkorrektur**: Agenten können Fehler autonom erkennen und korrigieren.
- **Ressourcenmanagement**: Agenten können Ressourcennutzung wie Zeit und Rechenleistung optimieren.

Durch Einbindung von Metakognition kann der Reiseberater persönlichere und genauere Reiseempfehlungen geben und so das Nutzererlebnis verbessern.

---

## 2. Planung bei Agenten

Planung ist eine zentrale Komponente im Verhalten von KI-Agenten. Es geht darum, die notwendigen Schritte zu skizzieren, um ein Ziel zu erreichen, unter Berücksichtigung des aktuellen Zustands, der Ressourcen und möglicher Hindernisse.

### Elemente der Planung

- **Aktuelle Aufgabe**: Definieren Sie die Aufgabe klar.
- **Schritte zur Erfüllung der Aufgabe**: Zerlegen Sie die Aufgabe in machbare Schritte.
- **Benötigte Ressourcen**: Identifizieren Sie notwendige Ressourcen.
- **Erfahrung**: Nutzen Sie vergangene Erfahrungen zur Informationsgewinnung.

**Beispiel**:
Hier sind die Schritte, die der Reiseberater unternehmen muss, um einem Nutzer bei der effektiven Urlaubsplanung zu helfen:

### Schritte für den Reiseberater

1. **Nutzerpräferenzen erfassen**
   - Fragen Sie den Nutzer nach Details zu Reisedaten, Budget, Interessen und speziellen Anforderungen.
   - Beispiele: „Wann möchten Sie reisen?“ „Was ist Ihr Budget?“ „Welche Aktivitäten mögen Sie im Urlaub?“

2. **Informationen abrufen**
   - Suchen Sie nach passenden Reiseoptionen basierend auf den Präferenzen des Nutzers.
   - **Flüge**: Suchen Sie verfügbare Flüge im Budget und bevorzugten Zeitraum.
   - **Unterkünfte**: Finden Sie Hotels oder Ferienwohnungen, die den Präferenzen bezüglich Lage, Preis und Ausstattung entsprechen.
   - **Attraktionen und Restaurants**: Identifizieren Sie beliebte Sehenswürdigkeiten, Aktivitäten und Lokale, die zu den Interessen des Nutzers passen.

3. **Empfehlungen generieren**
   - Stellen Sie die abgerufenen Informationen zu einer personalisierten Reiseroute zusammen.
   - Geben Sie Details wie Flugoptionen, Hotelbuchungen und vorgeschlagene Aktivitäten an, zugeschnitten auf die Präferenzen des Nutzers.

4. **Reiseroute dem Nutzer präsentieren**
   - Teilen Sie die vorgeschlagene Reiseroute mit dem Nutzer zur Überprüfung.
   - Beispiel: „Hier ist eine vorgeschlagene Reiseroute für Ihre Paris-Reise. Sie enthält Flugdaten, Hotelbuchungen und eine Liste empfohlener Aktivitäten und Restaurants. Teilen Sie mir gerne Ihre Meinung mit!“

5. **Feedback sammeln**
   - Fragen Sie den Nutzer nach Feedback zur vorgeschlagenen Reiseroute.
   - Beispiele: „Gefällt Ihnen die Flugauswahl?“ „Ist das Hotel passend für Ihre Bedürfnisse?“ „Möchten Sie Aktivitäten hinzufügen oder entfernen?“

6. **Anpassung basierend auf Feedback**
   - Passen Sie die Reiseroute entsprechend dem Feedback an.
   - Nehmen Sie notwendige Änderungen bei Flug-, Hotel- und Aktivitätsempfehlungen vor, um besser zu den Präferenzen zu passen.

7. **Endgültige Bestätigung**
   - Präsentieren Sie die angepasste Reiseroute zur finalen Bestätigung.
   - Beispiel: „Ich habe die Anpassungen auf Grundlage Ihres Feedbacks vorgenommen. Hier ist die aktualisierte Reiseroute. Passt alles für Sie?“

8. **Buchung und Bestätigung der Reservierungen**
   - Nach Nutzerfreigabe buchen Sie Flüge, Unterkünfte und geplante Aktivitäten.
   - Senden Sie Bestätigungsdetails an den Nutzer.

9. **Laufende Unterstützung bieten**
   - Bleiben Sie erreichbar, um den Nutzer bei Änderungen oder weiteren Wünschen vor und während der Reise zu unterstützen.
   - Beispiel: „Falls Sie während der Reise weitere Hilfe benötigen, können Sie sich jederzeit an mich wenden!“

### Beispiel-Interaktion

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

# Beispielhafte Verwendung innerhalb einer Buchungsanfrage
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

## 3. Korrektives RAG-System

Beginnen wir zunächst mit dem Verständnis des Unterschieds zwischen RAG-Werkzeug und präventiver Kontextladung.

![RAG vs Kontextladen](../../../translated_images/de/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

RAG kombiniert ein Abrufsystem mit einem generativen Modell. Wenn eine Anfrage gestellt wird, holt das Abrufsystem relevante Dokumente oder Daten aus einer externen Quelle, und diese abgerufenen Informationen werden genutzt, um die Eingabe für das generative Modell zu erweitern. Das hilft dem Modell, genauere und kontextuell relevantere Antworten zu generieren.

In einem RAG-System ruft der Agent relevante Informationen aus einer Wissensbasis ab und nutzt diese, um passende Antworten oder Aktionen zu erzeugen.

### Korrektiver RAG-Ansatz

Der korrektive RAG-Ansatz konzentriert sich darauf, RAG-Techniken einzusetzen, um Fehler zu korrigieren und die Genauigkeit von KI-Agenten zu verbessern. Dies beinhaltet:

1. **Prompting-Technik**: Verwendung spezieller Eingabeaufforderungen, um den Agenten beim Abrufen relevanter Informationen zu leiten.
2. **Werkzeug**: Implementierung von Algorithmen und Mechanismen, die den Agenten befähigen, die Relevanz der abgerufenen Informationen zu bewerten und präzise Antworten zu generieren.
3. **Evaluation**: Kontinuierliche Bewertung der Agentenleistung und Anpassungen zur Verbesserung von Genauigkeit und Effizienz.

#### Beispiel: Korrektives RAG in einem Suchagenten

Betrachten Sie einen Suchagenten, der Informationen aus dem Web abruft, um Nutzerfragen zu beantworten. Der korrektive RAG-Ansatz könnte beinhalten:

1. **Prompting-Technik**: Formulierung von Suchanfragen basierend auf der Nutzereingabe.
2. **Werkzeug**: Einsatz von NLP- und Machine-Learning-Algorithmen, um Suchergebnisse zu bewerten und zu filtern.
3. **Evaluation**: Analyse von Nutzerfeedback, um Ungenauigkeiten in den abgerufenen Informationen zu erkennen und zu korrigieren.

### Korrektives RAG im Reiseberater

Korrektives RAG (Retrieval-Augmented Generation) verbessert die Fähigkeit einer KI, Informationen abzurufen und zu generieren, während Fehler korrigiert werden. Sehen wir, wie der Reiseberater den korrektiven RAG-Ansatz nutzen kann, um genauere und relevantere Reiseempfehlungen zu geben.

Dies umfasst:

- **Prompting-Technik:** Nutzung spezieller Eingabeaufforderungen, um den Agenten bei der Informationssuche zu leiten.
- **Werkzeug:** Implementierung von Algorithmen und Mechanismen, die den Agenten befähigen, die Relevanz der abgerufenen Informationen zu bewerten und präzise Antworten zu liefern.
- **Evaluation:** Kontinuierliche Beurteilung der Agentenleistung mit Anpassungen zur Verbesserung von Genauigkeit und Effizienz.

#### Schritte zur Implementierung von korrektivem RAG im Reiseberater

1. **Erste Nutzerinteraktion**
   - Der Reiseberater erfasst erste Präferenzen des Nutzers, wie Zielort, Reisedaten, Budget und Interessen.
   - Beispiel:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Informationsabruf**
   - Der Reiseberater ruft Informationen zu Flügen, Unterkünften, Attraktionen und Restaurants basierend auf Nutzerpräferenzen ab.
   - Beispiel:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generierung erster Empfehlungen**
   - Der Reiseberater nutzt die abgefragten Informationen zur Erstellung einer personalisierten Reiseroute.
   - Beispiel:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Sammeln von Nutzerfeedback**
   - Der Reiseberater bittet um Feedback zu den ersten Empfehlungen.
   - Beispiel:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Korrektiver RAG-Prozess**
   - **Prompting-Technik**: Der Reiseberater formuliert neue Suchanfragen basierend auf dem Nutzerfeedback.
     - Beispiel:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Werkzeug**: Der Reiseberater verwendet Algorithmen, um neue Suchergebnisse zu bewerten und zu filtern, wobei die Relevanz basierend auf Nutzerfeedback hervorgehoben wird.
     - Beispiel:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Evaluation**: Der Reiseberater bewertet kontinuierlich die Relevanz und Genauigkeit seiner Empfehlungen durch Analyse des Nutzerfeedbacks und nimmt dabei erforderliche Anpassungen vor.
     - Beispiel:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktisches Beispiel

Hier ein einfaches Python-Codebeispiel, das den korrektiven RAG-Ansatz im Reiseberater integriert:

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

# Beispiel für die Verwendung
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

### Präventive Kontextladung
Vorab-Kontextladen beinhaltet das Laden relevanter Kontext- oder Hintergrundinformationen in das Modell, bevor eine Anfrage verarbeitet wird. Das bedeutet, dass das Modell von Anfang an Zugriff auf diese Informationen hat, was ihm helfen kann, fundiertere Antworten zu generieren, ohne während des Prozesses zusätzliche Daten abrufen zu müssen.

Hier ist ein vereinfachtes Beispiel, wie ein vorab geladenes Kontextset für eine Reisebüroanwendung in Python aussehen könnte:

```python
class TravelAgent:
    def __init__(self):
        # Beliebte Reiseziele und deren Informationen vorab laden
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Reisezielinformationen aus dem vorab geladenen Kontext abrufen
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Beispiel für die Verwendung
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Erklärung

1. **Initialisierung (`__init__` Methode)**: Die Klasse `TravelAgent` lädt vorab ein Wörterbuch mit Informationen zu beliebten Reisezielen wie Paris, Tokio, New York und Sydney. Dieses Wörterbuch enthält Details wie Land, Währung, Sprache und wichtige Sehenswürdigkeiten für jedes Reiseziel.

2. **Abrufen von Informationen (`get_destination_info` Methode)**: Wenn ein Nutzer nach einem bestimmten Reiseziel fragt, holt die Methode `get_destination_info` die relevanten Informationen aus dem vorab geladenen Kontext-Wörterbuch.

Durch das Vorab-Laden des Kontexts kann die Reisebüroanwendung schnell auf Nutzeranfragen reagieren, ohne diese Informationen in Echtzeit aus einer externen Quelle abrufen zu müssen. Das macht die Anwendung effizienter und reaktionsschneller.

### Starten des Plans mit einem Ziel, bevor iteriert wird

Das Starten eines Plans mit einem Ziel bedeutet, mit einem klaren Ziel oder Ergebnis vor Augen zu beginnen. Indem dieses Ziel zu Beginn definiert wird, kann das Modell es als Leitprinzip während des iterativen Prozesses verwenden. Das hilft sicherzustellen, dass jede Iteration dem gewünschten Ergebnis näherkommt und macht den Prozess effizienter und zielgerichteter.

Hier ist ein Beispiel, wie man einen Reiseplan mit einem Ziel initialisieren kann, bevor man für einen Reisebüroagenten in Python iteriert:

### Szenario

Ein Reisebüroagent möchte einen individuellen Urlaub für einen Kunden planen. Das Ziel ist es, eine Reiseroute zu erstellen, die die Zufriedenheit des Kunden basierend auf dessen Präferenzen und Budget maximiert.

### Schritte

1. Definieren Sie die Präferenzen und das Budget des Kunden.
2. Starten Sie den Anfangsplan basierend auf diesen Präferenzen.
3. Iterieren Sie, um den Plan zu verfeinern und die Kundenzufriedenheit zu optimieren.

#### Python-Code

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

# Anwendungsbeispiel
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

#### Code-Erklärung

1. **Initialisierung (`__init__` Methode)**: Die Klasse `TravelAgent` wird mit einer Liste potenzieller Reiseziele initialisiert, die jeweils Attribute wie Name, Kosten und Aktivitätstyp besitzen.

2. **Plan initialisieren (`bootstrap_plan` Methode)**: Diese Methode erstellt einen Anfangsreiseplan basierend auf den Präferenzen und dem Budget des Kunden. Es wird durch die Liste der Reiseziele iteriert und jene hinzugefügt, die zu den Präferenzen passen und innerhalb des Budgets liegen.

3. **Präferenzen abgleichen (`match_preferences` Methode)**: Diese Methode prüft, ob ein Reiseziel mit den Präferenzen des Kunden übereinstimmt.

4. **Plan iterieren (`iterate_plan` Methode)**: Diese Methode verfeinert den Anfangsplan, indem sie versucht, jedes Reiseziel im Plan durch eine bessere Übereinstimmung zu ersetzen und dabei die Präferenzen und Budgetbeschränkungen des Kunden berücksichtigt.

5. **Kosten berechnen (`calculate_cost` Methode)**: Diese Methode berechnet die Gesamtkosten des aktuellen Plans, inklusive eines eventuell neuen Reiseziels.

#### Beispielhafte Verwendung

- **Anfangsplan**: Der Reisebüroagent erstellt einen Anfangsplan basierend auf den Präferenzen des Kunden für Sightseeing und einem Budget von 2000$.
- **Verfeinerter Plan**: Der Reisebüroagent iteriert den Plan und optimiert ihn für die Aktivitäten und das Budget des Kunden.

Indem der Plan mit einem klaren Ziel (z.B. maximale Kundenzufriedenheit) gestartet und iterativ verfeinert wird, kann der Reisebüroagent eine individuelle und optimierte Reiseroute für den Kunden erstellen. Dieser Ansatz stellt sicher, dass die Reiseplanung von Anfang an mit den Präferenzen und dem Budget des Kunden übereinstimmt und sich mit jeder Iteration verbessert.

### Nutzung von LLM für Re-Ranking und Bewertung

Große Sprachmodelle (LLMs) können für Re-Ranking und Bewertung eingesetzt werden, indem sie die Relevanz und Qualität abgerufener Dokumente oder erstellter Antworten bewerten. So funktioniert das:

**Abruf:** Im ersten Schritt werden Kandidatendokumente oder Antworten basierend auf der Anfrage abgefragt.

**Re-Ranking:** Das LLM bewertet diese Kandidaten und sortiert sie neu nach Relevanz und Qualität. Dieser Schritt stellt sicher, dass die relevantesten und qualitativ hochwertigsten Informationen zuerst präsentiert werden.

**Bewertung:** Das LLM vergibt Bewertungen an jeden Kandidaten, die deren Relevanz und Qualität widerspiegeln. Dies hilft bei der Auswahl der besten Antwort oder des besten Dokuments für den Nutzer.

Durch die Nutzung von LLMs für Re-Ranking und Bewertung kann das System genauere und kontextuell relevantere Informationen bereitstellen und so das Nutzererlebnis verbessern.

Hier ist ein Beispiel, wie ein Reisebüroagent ein Large Language Model (LLM) verwenden könnte, um Reiseziele anhand von Nutzerpräferenzen in Python neu zu bewerten und zu bewerten:

#### Szenario – Reisen basierend auf Präferenzen

Ein Reisebüroagent möchte dem Kunden die besten Reiseziele basierend auf dessen Präferenzen empfehlen. Das LLM hilft, die Reiseziele neu zu sortieren und zu bewerten, um die relevantesten Optionen zu präsentieren.

#### Schritte:

1. Sammlung der Nutzerpräferenzen.
2. Abrufen einer Liste potenzieller Reiseziele.
3. Verwendung des LLM zur Neu-Bewertung und Bewertung der Reiseziele auf Basis der Nutzerpräferenzen.

So können Sie das vorherige Beispiel aktualisieren, um Azure OpenAI Services zu verwenden:

#### Voraussetzungen

1. Sie benötigen ein Azure-Abonnement.
2. Erstellen Sie eine Azure OpenAI-Resource und erhalten Sie Ihren API-Schlüssel.

#### Beispiel Python-Code

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Generiere eine Eingabeaufforderung für Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Definiere Header und Nutzlast für die Anfrage
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Rufe die Azure OpenAI API auf, um die neu bewerteten und bewerteten Ziele zu erhalten
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Extrahiere und gebe die Empfehlungen zurück
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

# Beispielverwendung
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

#### Code-Erklärung – Präferenzbucher

1. **Initialisierung**: Die Klasse `TravelAgent` wird mit einer Liste potenzieller Reiseziele initialisiert, die Attribute wie Name und Beschreibung besitzen.

2. **Empfehlungen abrufen (`get_recommendations` Methode)**: Diese Methode generiert eine Prompt für den Azure OpenAI Service basierend auf den Nutzerpräferenzen und sendet eine HTTP-POST-Anfrage an die Azure OpenAI API, um neu bewertete und bewertete Reiseziele zu erhalten.

3. **Prompt generieren (`generate_prompt` Methode)**: Diese Methode erstellt eine Eingabeaufforderung für Azure OpenAI, die die Nutzerpräferenzen und die Liste der Reiseziele enthält. Die Prompt führt das Modell dazu, die Reiseziele basierend auf den angegebenen Präferenzen neu zu sortieren und zu bewerten.

4. **API-Aufruf**: Die Bibliothek `requests` wird verwendet, um eine HTTP-POST-Anfrage an den Azure OpenAI API-Endpunkt zu senden. Die Antwort enthält die neu gereihten und bewerteten Reiseziele.

5. **Beispielhafte Verwendung**: Der Reisebüroagent sammelt Nutzerpräferenzen (z.B. Interesse an Sightseeing und vielfältiger Kultur) und verwendet den Azure OpenAI Service, um neu gereihte und bewertete Empfehlungen für Reiseziele zu erhalten.

Ersetzen Sie `your_azure_openai_api_key` unbedingt durch Ihren tatsächlichen Azure OpenAI API-Schlüssel und `https://your-endpoint.com/...` durch die tatsächliche Endpunkt-URL Ihrer Azure OpenAI-Implementierung.

Durch die Nutzung des LLM für Re-Ranking und Bewertung kann der Reisebüroagent personalisierte und relevantere Reiseempfehlungen für Kunden bereitstellen und so das Gesamterlebnis verbessern.

### RAG: Prompting-Technik versus Tool

Retrieval-Augmented Generation (RAG) kann sowohl eine Prompting-Technik als auch ein Tool bei der Entwicklung von KI-Agenten sein. Das Verständnis des Unterschieds kann Ihnen helfen, RAG in Ihren Projekten effektiver zu nutzen.

#### RAG als Prompting-Technik

**Was ist das?**

- Als Prompting-Technik umfasst RAG die Formulierung spezifischer Anfragen oder Prompts, um relevante Informationen aus einem großen Korpus oder einer Datenbank abzurufen. Diese Informationen werden dann verwendet, um Antworten oder Aktionen zu generieren.

**Wie funktioniert es:**

1. **Prompts formulieren:** Erstellen Sie gut strukturierte Eingabeaufforderungen oder Anfragen basierend auf der Aufgabe oder der Nutzereingabe.
2. **Informationen abrufen:** Verwenden Sie die Prompts, um relevante Daten aus einer bestehenden Wissensbasis oder einem Datensatz zu suchen.
3. **Antwort generieren:** Kombinieren Sie die abgerufenen Informationen mit generativen KI-Modellen, um eine umfassende und kohärente Antwort zu erzeugen.

**Beispiel im Reisebüro:**

- Nutzereingabe: „Ich möchte Museen in Paris besuchen.“
- Prompt: „Finde die besten Museen in Paris.“
- Abgerufene Informationen: Details zum Louvre, Musée d'Orsay usw.
- Generierte Antwort: „Hier sind einige Top-Museen in Paris: Louvre, Musée d’Orsay und Centre Pompidou.“

#### RAG als Tool

**Was ist das?**

- Als Tool ist RAG ein integriertes System, das den Abruf- und Generierungsprozess automatisiert und Entwicklern das Implementieren komplexer KI-Funktionalitäten erleichtert, ohne dass für jede Anfrage manuell Prompts erstellt werden müssen.

**Wie funktioniert es:**

1. **Integration:** Eingebettet in die Architektur des KI-Agenten übernimmt es automatisch die Aufgaben Abruf und Generierung.
2. **Automatisierung:** Das Tool steuert den gesamten Prozess vom Empfang der Nutzereingabe bis zur Generierung der endgültigen Antwort, ohne explizite Prompts für jeden Schritt zu benötigen.
3. **Effizienz:** Verbessert die Leistung des Agenten durch Vereinfachung der Abruf- und Generierungsprozesse und ermöglicht schnellere und genauere Antworten.

**Beispiel im Reisebüro:**

- Nutzereingabe: „Ich möchte Museen in Paris besuchen.“
- RAG-Tool: Ruft automatisch Informationen zu Museen ab und generiert eine Antwort.
- Generierte Antwort: „Hier sind einige Top-Museen in Paris: Louvre, Musée d’Orsay und Centre Pompidou.“

### Vergleich

| Aspekt                   | Prompting-Technik                                      | Tool                                               |
|--------------------------|-------------------------------------------------------|----------------------------------------------------|
| **Manuell vs Automatisch**| Manuelle Formulierung von Prompts für jede Anfrage.  | Automatisierter Prozess für Abruf und Generierung. |
| **Kontrolle**            | Bietet mehr Kontrolle über den Abrufprozess.         | Vereinfachte und automatisierte Abruf- und Generierung. |
| **Flexibilität**         | Erlaubt individuelle Prompts nach Bedarf.             | Effizienter für großflächige Anwendungen.          |
| **Komplexität**          | Erfordert Erstellen und Anpassen von Prompts.         | Einfacher in die KI-Architektur zu integrieren.     |

### Praktische Beispiele

**Beispiel für Prompting-Technik:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Beispiel für Tool:**

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

### Bewertung der Relevanz

Die Bewertung der Relevanz ist ein entscheidender Aspekt der Leistung von KI-Agenten. Sie stellt sicher, dass die vom Agenten abgerufenen und generierten Informationen angemessen, korrekt und nützlich für den Nutzer sind. Lassen Sie uns anschauen, wie man die Relevanz bei KI-Agenten bewertet, mit praktischen Beispielen und Techniken.

#### Schlüsselkonzepte bei der Bewertung der Relevanz

1. **Kontextbewusstsein**:
   - Der Agent muss den Kontext der Nutzeranfrage verstehen, um relevante Informationen abzurufen und zu generieren.
   - Beispiel: Fragt ein Nutzer nach „besten Restaurants in Paris“, sollte der Agent Präferenzen wie Küche und Budget berücksichtigen.

2. **Genauigkeit**:
   - Die vom Agenten bereitgestellten Informationen sollten sachlich korrekt und aktuell sein.
   - Beispiel: Empfehlung von aktuell geöffneten Restaurants mit guten Bewertungen statt veralteter oder geschlossener Optionen.

3. **Nutzerintention**:
   - Der Agent sollte die Absicht des Nutzers hinter der Anfrage ableiten, um die relevanteste Information zu liefern.
   - Beispiel: Bei „budgetfreundliche Hotels“ sollte der Agent preiswerte Optionen priorisieren.

4. **Feedback-Schleife**:
   - Fortlaufendes Sammeln und Analysieren von Nutzerfeedback hilft dem Agenten, den Relevanzbewertungsprozess zu verfeinern.
   - Beispiel: Einbeziehung von Nutzerbewertungen und Feedback zu früheren Empfehlungen zur Verbesserung zukünftiger Antworten.

#### Praktische Techniken zur Bewertung der Relevanz

1. **Bewertung der Relevanz (Relevance Scoring)**:
   - Vergeben eines Relevanzwertes für jedes abgerufene Element basierend darauf, wie gut es zur Nutzeranfrage und den Präferenzen passt.
   - Beispiel:

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

2. **Filtern und Rangordnen**:
   - Herausfiltern irrelevanter Einträge und Rangordnen der verbleibenden basierend auf ihren Relevanzwerten.
   - Beispiel:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Gib die 10 relevantesten Elemente zurück
     ```

3. **Natürlichsprachliche Verarbeitung (NLP)**:
   - Einsatz von NLP-Techniken, um die Nutzeranfrage zu verstehen und relevante Informationen abzurufen.
   - Beispiel:

     ```python
     def process_query(query):
         # Verwenden Sie NLP, um wichtige Informationen aus der Benutzeranfrage zu extrahieren
         processed_query = nlp(query)
         return processed_query
     ```

4. **Nutzerfeedback-Integration**:
   - Sammeln von Nutzerfeedback zu bereitgestellten Empfehlungen und Verwendung zur Anpassung zukünftiger Relevanzbewertungen.
   - Beispiel:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Beispiel: Bewertung der Relevanz im Reisebüro

Hier ein praktisches Beispiel, wie der Travel Agent die Relevanz von Reiseempfehlungen evaluieren kann:

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
        return ranked_items[:10]  # Gib die obersten 10 relevanten Elemente zurück

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

# Beispielverwendung
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

### Suche mit Absicht

Suche mit Absicht beinhaltet das Verstehen und Interpretieren des zugrunde liegenden Zwecks oder Ziels einer Nutzeranfrage, um die relevantesten und nützlichsten Informationen abzurufen und zu generieren. Dieser Ansatz geht über die reine Übereinstimmung von Schlüsselwörtern hinaus und konzentriert sich darauf, die tatsächlichen Bedürfnisse und den Kontext des Nutzers zu erfassen.

#### Schlüsselkonzepte bei der Suche mit Absicht

1. **Verstehen der Nutzerintention**:
   - Nutzerintentionen können in drei Haupttypen unterteilt werden: informativ, navigierend und transaktional.
     - **Informative Intention**: Der Nutzer sucht Informationen zu einem Thema (z.B. „Was sind die besten Museen in Paris?“).
     - **Navigierende Intention**: Der Nutzer möchte zu einer bestimmten Webseite oder Seite navigieren (z.B. „Offizielle Webseite des Louvre“).
     - **Transaktionale Intention**: Der Nutzer verfolgt eine Transaktion, wie Buchung eines Fluges oder Kauf (z.B. „Flug nach Paris buchen“).

2. **Kontextbewusstsein**:
   - Die Analyse des Kontexts der Nutzeranfrage hilft dabei, deren Absicht genau zu identifizieren. Dies beinhaltet Berücksichtigung vorheriger Interaktionen, Präferenzen des Nutzers und Details der aktuellen Anfrage.

3. **Natürlichsprachliche Verarbeitung (NLP)**:
   - NLP-Techniken werden eingesetzt, um die natürlichsprachlichen Anfragen der Nutzer zu verstehen und zu interpretieren. Dazu gehören Aufgaben wie Entitätserkennung, Sentiment-Analyse und Anfragenparsing.

4. **Personalisierung**:
   - Personalisierte Suchergebnisse basierend auf der Nutzerhistorie, Präferenzen und Feedback verbessern die Relevanz der abgerufenen Informationen.

#### Praktisches Beispiel: Suche mit Absicht im Reisebüro

Lassen Sie uns Travel Agent als Beispiel nehmen, wie Suche mit Absicht implementiert werden kann.

1. **Sammeln der Nutzerpräferenzen**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Verstehen der Nutzerintention**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Kontextbewusstsein**
   ```python
   def analyze_context(query, user_history):
       # Kombiniere die aktuelle Anfrage mit der Benutzerhistorie, um den Kontext zu verstehen
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Ergebnisse durchsuchen und personalisieren**

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
       # Beispiel-Suchlogik für informative Absicht
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Beispiel-Suchlogik für navigationsbezogene Absicht
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Beispiel-Suchlogik für transaktionale Absicht
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Beispiel-Personalisierungslogik
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Rückgabe der Top 10 personalisierten Ergebnisse
   ```

5. **Beispielanwendung**

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

## 4. Code als Werkzeug generieren

Code generierende Agenten verwenden KI-Modelle, um Code zu schreiben und auszuführen, komplexe Probleme zu lösen und Aufgaben zu automatisieren.

### Code generierende Agenten

Code generierende Agenten verwenden generative KI-Modelle, um Code zu schreiben und auszuführen. Diese Agenten können komplexe Probleme lösen, Aufgaben automatisieren und wertvolle Einblicke bieten, indem sie Code in verschiedenen Programmiersprachen generieren und ausführen.

#### Praktische Anwendungen

1. **Automatisierte Codegenerierung**: Generieren von Codeschnipseln für spezifische Aufgaben wie Datenanalyse, Web-Scraping oder maschinelles Lernen.
2. **SQL als RAG**: Verwenden von SQL-Abfragen zum Abrufen und Manipulieren von Daten aus Datenbanken.
3. **Problemlösung**: Erstellen und Ausführen von Code zur Lösung spezifischer Probleme, wie der Optimierung von Algorithmen oder der Analyse von Daten.

#### Beispiel: Code generierender Agent für Datenanalyse

Stellen Sie sich vor, Sie entwerfen einen code generierenden Agenten. So könnte er funktionieren:

1. **Aufgabe**: Analysieren eines Datensatzes, um Trends und Muster zu erkennen.
2. **Schritte**:
   - Laden des Datensatzes in ein Datenanalysetool.
   - Generieren von SQL-Abfragen, um die Daten zu filtern und zu aggregieren.
   - Ausführen der Abfragen und Abrufen der Ergebnisse.
   - Verwenden der Ergebnisse zur Erstellung von Visualisierungen und Einblicken.
3. **Benötigte Ressourcen**: Zugriff auf den Datensatz, Datenanalysetools und SQL-Fähigkeiten.
4. **Erfahrung**: Verwenden vergangener Analyseergebnisse, um die Genauigkeit und Relevanz zukünftiger Analysen zu verbessern.

### Beispiel: code generierender Agent für Reisebüro

In diesem Beispiel entwerfen wir einen code generierenden Agenten, Travel Agent, der Benutzern bei der Reiseplanung durch das Generieren und Ausführen von Code hilft. Dieser Agent kann Aufgaben wie das Abrufen von Reiseoptionen, Filtern von Ergebnissen und das Erstellen eines Reiseplans mit generativer KI übernehmen.

#### Überblick über den code generierenden Agenten

1. **Sammeln von Benutzerpräferenzen**: Erfasst Benutzereingaben wie Zielort, Reisedaten, Budget und Interessen.
2. **Generieren von Code zum Abrufen von Daten**: Generiert Codeschnipsel, um Daten über Flüge, Hotels und Sehenswürdigkeiten abzurufen.
3. **Ausführen des generierten Codes**: Führt den generierten Code aus, um Echtzeitinformationen abzurufen.
4. **Erstellen des Reiseplans**: Fasst die abgerufenen Daten in einem personalisierten Reiseplan zusammen.
5. **Anpassen basierend auf Feedback**: Nimmt Benutzerfeedback entgegen und generiert bei Bedarf den Code neu, um die Ergebnisse zu verfeinern.

#### Schritt-für-Schritt Implementierung

1. **Sammeln von Benutzerpräferenzen**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generieren von Code zum Abrufen von Daten**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Beispiel: Generiere Code, um Flüge basierend auf Benutzerpräferenzen zu suchen
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Beispiel: Generiere Code, um Hotels zu suchen
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Ausführen des generierten Codes**

   ```python
   def execute_code(code):
       # Führen Sie den generierten Code mit exec aus
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

4. **Erstellen des Reiseplans**

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

5. **Anpassen basierend auf Feedback**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Einstellungen basierend auf Benutzerfeedback anpassen
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Code mit aktualisierten Einstellungen neu erzeugen und ausführen
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Nutzung von Umweltbewusstsein und logischem Denken

Basierend auf dem Schema der Tabelle kann tatsächlich der Prozess der Abfragegenerierung verbessert werden, indem Umweltbewusstsein und logisches Denken genutzt werden.

Hier ein Beispiel, wie das umgesetzt werden kann:

1. **Verstehen des Schemas**: Das System versteht das Schema der Tabelle und verwendet diese Information, um die Abfragegenerierung zu fundieren.
2. **Anpassen basierend auf Feedback**: Das System passt Benutzerpräferenzen basierend auf Feedback an und überlegt, welche Felder im Schema aktualisiert werden müssen.
3. **Generieren und Ausführen von Abfragen**: Das System generiert und führt Abfragen aus, um aktualisierte Flug- und Hoteldaten basierend auf den neuen Präferenzen abzurufen.

Hier ein aktualisiertes Python-Codebeispiel, das diese Konzepte integriert:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Einstellungen basierend auf Benutzerfeedback anpassen
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Ableitung basierend auf Schema, um andere verwandte Einstellungen anzupassen
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Benutzerdefinierte Logik, um Einstellungen basierend auf Schema und Feedback anzupassen
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Code generieren, um Flugdaten basierend auf aktualisierten Einstellungen abzurufen
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Code generieren, um Hoteldaten basierend auf aktualisierten Einstellungen abzurufen
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Ausführung des Codes simulieren und Mock-Daten zurückgeben
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Reiseroute basierend auf Flügen, Hotels und Attraktionen erstellen
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Beispielschema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Beispielverwendung
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Code mit aktualisierten Einstellungen neu generieren und ausführen
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Erklärung - Buchung basierend auf Feedback

1. **Schema-Bewusstsein**: Das Wörterbuch `schema` definiert, wie Präferenzen basierend auf Feedback angepasst werden sollten. Es enthält Felder wie `favorites` und `avoid` mit entsprechenden Anpassungen.
2. **Anpassen von Präferenzen (`adjust_based_on_feedback`-Methode)**: Diese Methode passt Präferenzen basierend auf Benutzerfeedback und dem Schema an.
3. **Umweltbasierte Anpassungen (`adjust_based_on_environment`-Methode)**: Diese Methode passt die Anpassungen basierend auf dem Schema und Feedback an.
4. **Generieren und Ausführen von Abfragen**: Das System generiert Code, um aktualisierte Flug- und Hoteldaten basierend auf den angepassten Präferenzen abzurufen, und simuliert die Ausführung dieser Abfragen.
5. **Erstellen des Reiseplans**: Das System erstellt einen aktualisierten Reiseplan basierend auf den neuen Flug-, Hotel- und Sehenswürdigkeitsdaten.

Indem das System umweltbewusst gemacht wird und logisches Denken basierend auf dem Schema anwendet, kann es genauere und relevantere Abfragen generieren, was zu besseren Reiseempfehlungen und einer personalisierteren Benutzererfahrung führt.

### Verwendung von SQL als Retrieval-Augmented Generation (RAG)-Technik

SQL (Structured Query Language) ist ein leistungsfähiges Werkzeug für die Interaktion mit Datenbanken. Wenn es als Teil eines Retrieval-Augmented Generation (RAG)-Ansatzes verwendet wird, kann SQL relevante Daten aus Datenbanken abrufen, um Antworten oder Aktionen in KI-Agenten zu informieren und zu erzeugen. Lassen Sie uns erkunden, wie SQL als RAG-Technik im Kontext von Travel Agent verwendet werden kann.

#### Schlüsselaspekte

1. **Datenbankinteraktion**:
   - SQL wird zum Abfragen von Datenbanken, Abrufen relevanter Informationen und Manipulieren von Daten verwendet.
   - Beispiel: Abrufen von Flugdaten, Hotelinformationen und Sehenswürdigkeiten aus einer Reisedatenbank.

2. **Integration mit RAG**:
   - SQL-Abfragen werden basierend auf Benutzereingaben und Präferenzen generiert.
   - Die abgerufenen Daten werden dann verwendet, um personalisierte Empfehlungen oder Aktionen zu generieren.

3. **Dynamische Abfragegenerierung**:
   - Der KI-Agent generiert dynamische SQL-Abfragen basierend auf dem Kontext und den Bedürfnissen des Benutzers.
   - Beispiel: Anpassen von SQL-Abfragen zur Filterung von Ergebnissen basierend auf Budget, Daten und Interessen.

#### Anwendungen

- **Automatisierte Codegenerierung**: Generieren von Codeschnipseln für spezifische Aufgaben.
- **SQL als RAG**: Verwenden von SQL-Abfragen zur Datenmanipulation.
- **Problemlösung**: Erstellen und Ausführen von Code zur Problemlösung.

**Beispiel**:
Ein Agent für Datenanalyse:

1. **Aufgabe**: Analysieren eines Datensatzes, um Trends zu finden.
2. **Schritte**:
   - Laden des Datensatzes.
   - Generieren von SQL-Abfragen zum Filtern der Daten.
   - Ausführen der Abfragen und Abrufen der Ergebnisse.
   - Erstellen von Visualisierungen und Einblicken.
3. **Ressourcen**: Zugriff auf den Datensatz, SQL-Fähigkeiten.
4. **Erfahrung**: Verwenden vergangener Ergebnisse zur Verbesserung zukünftiger Analysen.

#### Praktisches Beispiel: Verwendung von SQL im Travel Agent

1. **Sammeln von Benutzerpräferenzen**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generieren von SQL-Abfragen**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Ausführen von SQL-Abfragen**

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

4. **Generieren von Empfehlungen**

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

#### Beispiel-SQL-Abfragen

1. **Flugabfrage**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Hotelabfrage**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Sehenswürdigkeiten-Abfrage**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Durch die Nutzung von SQL als Teil der Retrieval-Augmented Generation (RAG)-Technik können KI-Agenten wie Travel Agent relevante Daten dynamisch abrufen und verwenden, um präzise und personalisierte Empfehlungen zu liefern.

### Beispiel für Metakognition

Um eine Implementierung von Metakognition zu demonstrieren, erstellen wir einen einfachen Agenten, der *über seinen Entscheidungsprozess reflektiert*, während er ein Problem löst. Für dieses Beispiel bauen wir ein System, bei dem ein Agent versucht, die Wahl eines Hotels zu optimieren, dann jedoch sein eigenes Denken bewertet und seine Strategie anpasst, wenn er Fehler oder suboptimale Entscheidungen trifft.

Wir simulieren dies mit einem einfachen Beispiel, bei dem der Agent Hotels basierend auf einer Kombination aus Preis und Qualität auswählt, jedoch seine Entscheidungen „reflektiert“ und entsprechend anpasst.

#### Wie dies Metakognition illustriert:

1. **Erste Entscheidung**: Der Agent wählt das günstigste Hotel, ohne den Einfluss der Qualität zu berücksichtigen.
2. **Reflexion und Bewertung**: Nach der ersten Wahl überprüft der Agent anhand von Benutzerfeedback, ob das Hotel eine „schlechte“ Wahl war. Wenn festgestellt wird, dass die Qualität zu niedrig war, reflektiert der Agent sein Denken.
3. **Anpassen der Strategie**: Der Agent passt seine Strategie basierend auf der Reflexion an, wechselt von „günstigstes Hotel“ zu „höchste Qualität“ und verbessert so seinen Entscheidungsprozess in zukünftigen Durchläufen.

Hier ein Beispiel:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Speichert die zuvor gewählten Hotels
        self.corrected_choices = []  # Speichert die korrigierten Entscheidungen
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Verfügbare Strategien

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
        # Nehmen wir an, wir haben ein Benutzerfeedback, das uns sagt, ob die letzte Wahl gut war oder nicht
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Strategie anpassen, wenn die vorherige Wahl unbefriedigend war
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

# Simuliere eine Liste von Hotels (Preis und Qualität)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Erstelle einen Agenten
agent = HotelRecommendationAgent()

# Schritt 1: Der Agent empfiehlt ein Hotel mit der "günstigsten" Strategie
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Schritt 2: Der Agent überdenkt die Wahl und passt die Strategie bei Bedarf an
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Schritt 3: Der Agent empfiehlt erneut, diesmal mit der angepassten Strategie
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Metakognitive Fähigkeiten des Agenten

Der Schlüssel ist die Fähigkeit des Agenten:
- Seine vorherigen Entscheidungen und den Entscheidungsprozess zu bewerten.
- Die Strategie auf Basis dieser Reflexion anzupassen, also Metakognition in Aktion.

Dies ist eine einfache Form von Metakognition, bei der das System seinen Denkprozess basierend auf internem Feedback anpassen kann.

### Fazit

Metakognition ist ein mächtiges Werkzeug, das die Fähigkeiten von KI-Agenten erheblich verbessern kann. Durch die Einbindung metakognitiver Prozesse können Sie Agenten entwerfen, die intelligenter, anpassungsfähiger und effizienter sind. Nutzen Sie die zusätzlichen Ressourcen, um die faszinierende Welt der Metakognition in KI-Agenten weiter zu erkunden.

### Haben Sie weitere Fragen zum Metakognition Design Pattern?

Treten Sie dem [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) bei, um andere Lernende zu treffen, an Office Hours teilzunehmen und Ihre Fragen zu AI Agents beantworten zu lassen.

## Vorherige Lektion

[Multi-Agent Design Pattern](../08-multi-agent/README.md)

## Nächste Lektion

[AI Agents in Production](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir Genauigkeit anstreben, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als verbindliche Quelle. Bei wichtigen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->