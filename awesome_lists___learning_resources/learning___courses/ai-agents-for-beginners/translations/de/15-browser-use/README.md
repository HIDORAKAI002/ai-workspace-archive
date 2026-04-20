# Erstellung von Computer Use Agents (CUA)

Computer-Use-Agents können mit Websites genauso interagieren wie eine Person: indem sie einen Browser öffnen, die Seite inspizieren und anhand dessen die jeweils beste nächste Aktion ausführen. In dieser Lektion baust du einen Browser-Automatisierungsagenten, der Airbnb durchsucht, strukturierte Angebotsdaten extrahiert und die günstigste Unterkunft in Stockholm identifiziert.

Die Lektion kombiniert Browser-Use für KI-gesteuerte Navigation, Playwright und das Chrome DevTools Protocol (CDP) für die Browsersteuerung, Azure OpenAI für visuell unterstützte Schlussfolgerungen und Pydantic für strukturierte Extraktion.

## Einführung

Diese Lektion behandelt:

- Verständnis, wann Computer-Use-Agents besser geeignet sind als reine API-Automatisierung
- Kombination von Browser-Use mit Playwright und CDP für zuverlässiges Browser-Lifecycle-Management
- Nutzung von Azure OpenAI Vision und strukturierter Pydantic-Ausgabe zur Extraktion von Angebotsdaten aus dynamischen Webseiten
- Entscheidung, wann ein agentenbasierter, actor-basierter oder hybrider Browser-Automatisierungs-Workflow anzuwenden ist

## Lernziele

Nach Abschluss dieser Lektion wirst du wissen, wie man:

- Browser-Use mit Azure OpenAI und Playwright konfiguriert
- Ein Browser-Automatisierungs-Workflow erstellt, der eine reale Webseite navigiert und dynamische UI-Elemente handhabt
- Typisierte Ergebnisse aus sichtbaren Seiteninhalten extrahiert und sie in nachgelagerte Geschäftslogik umwandelt
- Zwischen Agent- und Actor-Patterns wählt, basierend darauf, wie vorhersehbar die Browseraufgabe ist

## Code-Beispiel

Diese Lektion enthält ein Notebook-Tutorial:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Startet eine Chrome-Session über CDP, sucht auf Airbnb nach Angeboten in Stockholm, extrahiert Preise mit Browser-Use Vision und gibt die günstigste Option als strukturierte Daten zurück.

## Voraussetzungen

- Python 3.12+
- Azure OpenAI Deployment in deiner Umgebung konfiguriert
- Chrome oder Chromium lokal installiert
- Playwright-Abhängigkeiten installiert
- Grundlegende Kenntnisse in async Python

## Einrichtung

Installiere die im Notebook verwendeten Pakete:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Setze die vom Notebook verwendeten Azure OpenAI Umgebungsvariablen:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Optional: Standardmäßig die neueste API-Version, wenn ausgelassen
AZURE_OPENAI_API_VERSION=...
```

## Architekturübersicht

Das Notebook demonstriert einen hybriden Browser-Automatisierungs-Workflow:

1. Chrome startet mit aktiviertem CDP, sodass sowohl Playwright als auch Browser-Use dieselbe Browsersitzung teilen können.
2. Ein Browser-Use Agent übernimmt offene Navigationsaufgaben wie Öffnen von Airbnb, Wegklicken von Pop-ups und Suche nach Stockholm.
3. Die aktive Seite wird mit einem strukturierten Pydantic-Schema inspiziert, um Angebotstitel, Nachtpreise, Bewertungen und URLs zu extrahieren.
4. Python-Logik vergleicht die extrahierten Angebote und hebt das günstigste Ergebnis hervor.

Dieser Ansatz bewahrt die flexible, vision-basierte Schlussfolgerung, für die Browser-Use bekannt ist, während er gleichzeitig deterministische Browsersteuerung bei Bedarf ermöglicht.

## Wichtige Erkenntnisse und bewährte Praktiken

### Wann Agent vs Actor verwenden

| Szenario           | Agent verwenden                     | Actor verwenden                 |
|--------------------|-----------------------------------|--------------------------------|
| Dynamische Layouts  | Ja, KI kann sich an Seitenänderungen anpassen | Nein, fragile Selektoren brechen leicht |
| Bekannte Struktur  | Nein, Agent ist langsamer als direkte Kontrolle | Ja, schnell und präzise        |
| Elemente finden     | Ja, natürliche Sprache funktioniert gut | Nein, exakte Selektoren sind erforderlich |
| Zeitsteuerung       | Nein, weniger vorhersehbar         | Ja, volle Kontrolle über Wartezeiten und Wiederholungen |
| Komplexe Workflows  | Ja, handhabt unerwartete UI-Zustände | Nein, erfordert explizite Verzweigungen |

### Browser-Use bewährte Praktiken

1. Beginne mit einem Agenten für Erkundung und dynamische Navigation.
2. Wechsel zu direkter Seitensteuerung, wenn die Interaktion vorhersehbar wird.
3. Verwende strukturierte Ausgabemodelle, damit extrahierte Daten validiert und typensicher sind.
4. Füge strategisch Verzögerungen nach Aktionen hinzu, die sichtbare UI-Änderungen auslösen.
5. Erstelle während der Iteration Screenshots, damit Fehler einfacher zu debuggen sind.
6. Erwarte, dass sich Webseiten ändern, und entwerfe Rückfallstrategien für Pop-ups und Layout-Verschiebungen.
7. Kombiniere Agent- und Actor-Muster, um Flexibilität und Präzision zu erreichen.

### Anwendungen in der Praxis

- Reisebuchungen und Preisüberwachung
- Preisvergleiche und Verfügbarkeitsprüfungen im E-Commerce
- Strukturierte Extraktion von dynamischen Webseiten
- Vision-basierte UI-Tests und Verifikation
- Webseitenüberwachung und Alarmierung
- Intelligentes Ausfüllen von Formularen über mehrstufige Abläufe

## Zusätzliche Ressourcen

- [Browser-Use Playwright-Integrationsvorlage](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use Actor-Parameter und Inhaltsextraktion](https://docs.browser-use.com/customize/actor/all-parameters)
- [Kursvorbereitung](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Während wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das ursprüngliche Dokument in seiner ursprünglichen Sprache gilt als maßgebliche Quelle. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die sich aus der Verwendung dieser Übersetzung ergeben.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->