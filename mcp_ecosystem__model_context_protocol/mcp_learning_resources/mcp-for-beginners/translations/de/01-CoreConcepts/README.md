# MCP-Grundkonzepte: Meisterung des Model Context Protocol für die KI-Integration

[![MCP Core Concepts](../../../translated_images/de/02.8203e26c6fb5a797.webp)](https://youtu.be/earDzWGtE84)

_(Klicken Sie auf das Bild oben, um das Video dieser Lektion anzusehen)_

Das [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) ist ein leistungsstarkes, standardisiertes Framework, das die Kommunikation zwischen großen Sprachmodellen (LLMs) und externen Werkzeugen, Anwendungen und Datenquellen optimiert.  
Dieser Leitfaden führt Sie durch die Kernkonzepte von MCP. Sie lernen die Client-Server-Architektur, wesentliche Komponenten, Kommunikationsmechanismen und bewährte Implementierungspraktiken kennen.

- **Explizite Zustimmung des Benutzers**: Alle Datenzugriffe und Operationen erfordern vor der Ausführung eine ausdrückliche Zustimmung des Benutzers. Benutzer müssen klar verstehen, auf welche Daten zugegriffen und welche Aktionen ausgeführt werden, mit granularer Kontrolle über Berechtigungen und Autorisierungen.

- **Datenschutz**: Benutzerdaten werden nur mit ausdrücklicher Zustimmung offengelegt und müssen durch robuste Zugriffskontrollen während des gesamten Interaktionszyklus geschützt werden. Implementierungen müssen unbefugte Datenübertragungen verhindern und strikte Datenschutzgrenzen einhalten.

- **Sicherheit bei der Werkzeugausführung**: Jede Werkzeugaufruf erfordert eine ausdrückliche Zustimmung des Benutzers mit klarer Kenntnis über Funktionalität, Parameter und potenzielle Auswirkungen des Werkzeugs. Robuste Sicherheitsgrenzen müssen unbeabsichtigte, unsichere oder böswillige Werkzeugausführung verhindern.

- **Transportschicht-Sicherheit**: Alle Kommunikationskanäle sollten geeignete Verschlüsselungs- und Authentifizierungsmechanismen verwenden. Remote-Verbindungen sollten sichere Transportprotokolle und angemessenes Credential-Management implementieren.

#### Implementierungsrichtlinien:

- **Berechtigungsverwaltung**: Implementieren Sie fein abgestufte Berechtigungssysteme, die es Benutzern ermöglichen zu steuern, welche Server, Werkzeuge und Ressourcen zugänglich sind  
- **Authentifizierung & Autorisierung**: Verwenden Sie sichere Authentifizierungsmethoden (OAuth, API-Schlüssel) mit ordnungsgemäßem Token-Management und Ablauf  
- **Eingabevalidierung**: Validieren Sie alle Parameter und Dateneingaben gemäß definierter Schemata zur Vermeidung von Injection-Angriffen  
- **Audit-Logging**: Führen Sie umfassende Protokolle aller Operationen zur Sicherheitsüberwachung und Compliance

## Überblick

Diese Lektion untersucht die grundlegende Architektur und die Komponenten, die das Model Context Protocol (MCP) Ökosystem ausmachen. Sie lernen die Client-Server-Architektur, wichtige Komponenten und Kommunikationsmechanismen kennen, die MPC-Interaktionen antreiben.

## Wichtige Lernziele

Am Ende dieser Lektion werden Sie:

- Die MCP-Client-Server-Architektur verstehen.  
- Rollen und Verantwortlichkeiten von Hosts, Clients und Servern identifizieren.  
- Die Kernfunktionen analysieren, die MCP zu einer flexiblen Integrationsschicht machen.  
- Verstehen, wie Informationen im MCP-Ökosystem fließen.  
- Praktische Einblicke durch Codebeispiele in .NET, Java, Python und JavaScript erhalten.

## MCP-Architektur: Ein tieferer Blick

Das MCP-Ökosystem basiert auf einem Client-Server-Modell. Diese modulare Struktur ermöglicht es KI-Anwendungen, effizient mit Werkzeugen, Datenbanken, APIs und kontextuellen Ressourcen zu interagieren. Lassen Sie uns diese Architektur in ihre Kernkomponenten aufschlüsseln.

Im Kern folgt MCP einer Client-Server-Architektur, bei der eine Host-Anwendung Verbindungen zu mehreren Servern herstellen kann:

```mermaid
flowchart LR
    subgraph "Ihr Computer"
        Host["Host mit MCP (Visual Studio, VS Code, IDEs, Werkzeuge)"]
        S1["MCP Server A"]
        S2["MCP Server B"]
        S3["MCP Server C"]
        Host <-->|"MCP Protokoll"| S1
        Host <-->|"MCP Protokoll"| S2
        Host <-->|"MCP Protokoll"| S3
        S1 <--> D1[("Lokal\Datenquelle A")]
        S2 <--> D2[("Lokal\Datenquelle B")]
    end
    subgraph "Internet"
        S3 <-->|"Web-APIs"| D3[("Remote\Dienste")]
    end
```
- **MCP Hosts**: Programme wie VSCode, Claude Desktop, IDEs oder KI-Tools, die über MCP auf Daten zugreifen möchten  
- **MCP Clients**: Protokoll-Clients, die 1:1-Verbindungen zu Servern aufrechterhalten  
- **MCP Server**: Leichtgewichtige Programme, die jeweils spezifische Fähigkeiten über das standardisierte Model Context Protocol bereitstellen  
- **Lokale Datenquellen**: Dateien, Datenbanken und Dienste Ihres Computers, auf die MCP-Server sicher zugreifen können  
- **Remote-Dienste**: Externe Systeme, die über das Internet verfügbar sind und mit denen sich MCP-Server über APIs verbinden können.

Das MCP-Protokoll ist ein sich entwickelnder Standard, der eine Datums-basierte Versionierung (Format JJJJ-MM-TT) verwendet. Die aktuelle Protokollversion ist **2025-11-25**. Die neuesten Updates der [Protokollspezifikation](https://modelcontextprotocol.io/specification/2025-11-25/) können Sie dort einsehen.

### 1. Hosts

Im Model Context Protocol (MCP) sind **Hosts** KI-Anwendungen, die als primäre Schnittstelle dienen, über die Nutzer mit dem Protokoll interagieren. Hosts koordinieren und verwalten Verbindungen zu mehreren MCP-Servern, indem sie für jede Serververbindung dedizierte MCP-Clients erstellen. Beispiele für Hosts sind:

- **KI-Anwendungen**: Claude Desktop, Visual Studio Code, Claude Code  
- **Entwicklungsumgebungen**: IDEs und Code-Editoren mit MCP-Integration  
- **Benutzerdefinierte Anwendungen**: Speziell entwickelte KI-Agenten und Tools

**Hosts** sind Anwendungen, die KI-Modell-Interaktionen koordinieren. Sie:

- **orchestrieren KI-Modelle**: Führen LLMs aus oder interagieren mit ihnen, um Antworten zu generieren und KI-Workflows zu koordinieren  
- **verwalten Client-Verbindungen**: Erstellen und pflegen für jede MCP-Server-Verbindung einen MCP-Client  
- **steuern die Benutzeroberfläche**: Handhaben Gesprächsabläufe, Benutzerinteraktionen und Antwortpräsentation  
- **setzen Sicherheitsrichtlinien um**: Steuern Berechtigungen, Sicherheitsbeschränkungen und Authentifizierung  
- **verwalten Benutzerzustimmungen**: Steuern Benutzerfreigaben für Datenaustausch und Werkzeugausführung

### 2. Clients

**Clients** sind wesentliche Komponenten, die dedizierte Eins-zu-eins-Verbindungen zwischen Hosts und MCP-Servern aufrechterhalten. Jeder MCP-Client wird vom Host instanziiert, um eine spezifische Verbindung zu einem MCP-Server herzustellen und so geordnete und sichere Kommunikationskanäle zu gewährleisten. Mehrere Clients ermöglichen es Hosts, gleichzeitig Verbindungen zu mehreren Servern herzustellen.

**Clients** sind Verbindungs-Komponenten innerhalb der Host-Anwendung. Sie:

- **kommunizieren nach Protokoll**: Senden JSON-RPC 2.0-Anfragen an Server mit Prompts und Anweisungen  
- **führen Fähigkeitenaushandlung durch**: Verhandeln unterstützte Features und Protokollversionen bei der Initialisierung mit Servern  
- **führen Werkzeugausführung durch**: Verwalten Werkzeugausführungsanfragen von Modellen und verarbeiten Antworten  
- **verarbeiten Echtzeit-Updates**: Empfangen Benachrichtigungen und Echtzeit-Updates von Servern  
- **verarbeiten Antworten**: Verarbeiten und formatieren Serverantworten für die Darstellung an Benutzer

### 3. Server

**Server** sind Programme, die Kontext, Werkzeuge und Kompetenzen für MCP-Clients bereitstellen. Sie können lokal (auf demselben Rechner wie der Host) oder remote (auf externen Plattformen) ausgeführt werden und sind verantwortlich für das Handling von Client-Anfragen und Bereitstellung strukturierter Antworten. Server stellen spezifische Funktionen über das standardisierte Model Context Protocol bereit.

**Server** sind Dienste, die Kontext und Fähigkeiten bereitstellen. Sie:

- **melden Funktionen an**: Registrieren und stellen verfügbare Primitiven (Ressourcen, Prompts, Tools) Clients zur Verfügung  
- **verarbeiten Anfragen**: Empfangen und führen Werkzeugaufrufe, Ressourcen- und Prompt-Anfragen von Clients aus  
- **stellen Kontext bereit**: Bieten kontextuelle Informationen und Daten zur Verbesserung von Modellantworten  
- **verwalten Zustände**: Halten Sitzungszustände und bearbeiten wenn nötig zustandsbehaftete Interaktionen  
- **senden Echtzeit-Benachrichtigungen**: Informieren über Fähigkeitsänderungen und Updates an verbundene Clients

Server können von jedem entwickelt werden, um Modellfähigkeiten mit spezialisierter Funktionalität zu erweitern. Sie unterstützen sowohl lokale als auch remote Bereitstellungsszenarien.

### 4. Server-Primitiven

Server im Model Context Protocol (MCP) bieten drei Kern-**Primitiven**, die die grundlegenden Bausteine für reichhaltige Interaktionen zwischen Clients, Hosts und Sprachmodellen definieren. Diese Primitiven spezifizieren Arten von kontextuellen Informationen und Aktionen, die über das Protokoll verfügbar sind.

MCP-Server können jede Kombination der folgenden drei Kernprimitiven bereitstellen:

#### Ressourcen

**Ressourcen** sind Datenquellen, die kontextuelle Informationen für KI-Anwendungen bereitstellen. Sie repräsentieren statische oder dynamische Inhalte, die das Verständnis und die Entscheidungsfindung der Modelle verbessern können:

- **Kontextuelle Daten**: Strukturierte Informationen und Kontext für die Nutzung durch KI-Modelle  
- **Wissensbasen**: Dokumentenarchive, Artikel, Handbücher und Forschungspublikationen  
- **Lokale Datenquellen**: Dateien, Datenbanken und lokale Systeminformationen  
- **Externe Daten**: API-Antworten, Webdienste und entfernte Systemdaten  
- **Dynamische Inhalte**: Echtzeitdaten, die sich anhand externer Bedingungen aktualisieren

Ressourcen werden durch URIs identifiziert und unterstützen Entdeckung über `resources/list` sowie Abruf mittels `resources/read`:

```text
file://documents/project-spec.md
database://production/users/schema
api://weather/current
```

#### Prompts

**Prompts** sind wiederverwendbare Vorlagen, die dabei helfen, Interaktionen mit Sprachmodellen zu strukturieren. Sie stellen standardisierte Interaktionsmuster und vorgefertigte Workflows bereit:

- **Vorlagenbasierte Interaktionen**: Vorgefertigte Nachrichten und Gesprächseinstiege  
- **Workflow-Vorlagen**: Standardisierte Sequenzen für allgemeine Aufgaben und Interaktionen  
- **Few-shot-Beispiele**: Beispiel-basierte Vorlagen zur Modellanweisung  
- **Systemprompts**: Grundlegende Prompts, die Modellverhalten und Kontext definieren  
- **Dynamische Vorlagen**: Parametrisierte Prompts, die sich an spezifische Kontexte anpassen

Prompts unterstützen Variablenersetzung und können über `prompts/list` entdeckt sowie mit `prompts/get` abgerufen werden:

```markdown
Generate a {{task_type}} for {{product}} targeting {{audience}} with the following requirements: {{requirements}}
```

#### Tools

**Werkzeuge** sind ausführbare Funktionen, die KI-Modelle aufrufen können, um bestimmte Aktionen auszuführen. Sie repräsentieren die „Verben“ des MCP-Ökosystems und ermöglichen es den Modellen, mit externen Systemen zu interagieren:

- **Ausführbare Funktionen**: Einzelne Operationen, die Modelle mit spezifischen Parametern ausführen können  
- **Integration externer Systeme**: API-Aufrufe, Datenbankabfragen, Dateioperationen, Berechnungen  
- **Einzigartige Identität**: Jedes Werkzeug hat einen eindeutigen Namen, Beschreibung und Parameterschema  
- **Strukturierte Ein-/Ausgabe**: Werkzeuge akzeptieren validierte Parameter und geben strukturierte, typisierte Antworten zurück  
- **Aktionsfähigkeiten**: Ermöglichen es Modellen, reale Aktionen auszuführen und Live-Daten abzurufen

Werkzeuge sind mit JSON Schema für Parameter-Validierung definiert und können über `tools/list` entdeckt sowie über `tools/call` ausgeführt werden. Werkzeuge können zudem **Icons** als zusätzliche Metadaten für eine bessere UI-Präsentation enthalten.

**Werkzeug-Annotationen**: Werkzeuge unterstützen Verhaltensanmerkungen (z. B. `readOnlyHint`, `destructiveHint`), die beschreiben, ob ein Werkzeug nur lesend oder destruktiv ist, was Clients bei der Entscheidungsfindung zur Werkzeugausführung unterstützt.

Beispiel einer Werkzeugdefinition:

```typescript
server.tool(
  "search_products", 
  {
    query: z.string().describe("Search query for products"),
    category: z.string().optional().describe("Product category filter"),
    max_results: z.number().default(10).describe("Maximum results to return")
  }, 
  async (params) => {
    // Suche ausführen und strukturierte Ergebnisse zurückgeben
    return await productService.search(params);
  }
);
```

## Client-Primitiven

Im Model Context Protocol (MCP) können **Clients** Primitiven bereitstellen, die es Servern ermöglichen, zusätzliche Fähigkeiten von der Host-Anwendung anzufordern. Diese client-seitigen Primitiven erlauben reichhaltigere, interaktivere Serverimplementierungen, die auf KI-Modellfähigkeiten und Benutzerinteraktionen zugreifen können.

### Sampling

**Sampling** ermöglicht es Servern, Sprachmodell-Komplettierungen von der KI-Anwendung des Clients anzufordern. Diese Primitive erlaubt Servern, auf LLM-Fähigkeiten zuzugreifen, ohne eigene Modelldependencies einzubetten:

- **Modellunabhängiger Zugriff**: Server können Komplettierungen anfragen, ohne LLM-SDKs einzuschließen oder Modellzugriffe zu verwalten  
- **Server-initiierte KI**: Ermöglicht Servern, autonom Inhalte unter Nutzung des KI-Modells des Clients zu generieren  
- **Rekursive LLM-Interaktionen**: Unterstützt komplexe Szenarien, in denen Server KI-Unterstützung für die Verarbeitung benötigen  
- **Dynamische Inhaltserzeugung**: Erlaubt Servern die Erstellung kontextueller Antworten unter Verwendung des Host-Modells  
- **Werkzeugaufruf-Unterstützung**: Server können `tools` und `toolChoice` Parameter angeben, um dem Modell des Clients Werkzeugaufrufe während des Sampling zu ermöglichen

Sampling wird über die Methode `sampling/complete` initiiert, bei der Server Vollständigkeitsanfragen an Clients senden.

### Roots

**Roots** bieten eine standardisierte Möglichkeit für Clients, Dateisystemgrenzen für Server offenzulegen und dienen Servern zum Verständnis, auf welche Verzeichnisse und Dateien sie Zugriff haben:

- **Dateisystem-Grenzen**: Definieren Bereiche, in denen Server innerhalb des Dateisystems operieren dürfen  
- **Zugriffskontrolle**: Helfen Servern zu verstehen, auf welche Verzeichnisse und Dateien sie Zugriffsrechte haben  
- **Dynamische Updates**: Clients können Server benachrichtigen, wenn sich die Liste der Roots ändert  
- **URI-basierte Identifikation**: Roots verwenden `file://`-URIs zur Identifikation zugänglicher Verzeichnisse und Dateien

Roots werden über die Methode `roots/list` entdeckt; Clients senden `notifications/roots/list_changed`, wenn sich die Roots ändern.

### Elicitation  

**Elicitation** ermöglicht es Servern, über die Client-Oberfläche zusätzliche Informationen oder Bestätigungen von Nutzern anzufordern:

- **Benutzereingabe-Anfragen**: Server können bei Bedarf zusätzliche Informationen für Werkzeugausführungen abfragen  
- **Bestätigungsdialoge**: Fordern Benutzerzustimmung für sensible oder weitreichende Operationen an  
- **Interaktive Workflows**: Ermöglichen schrittweise Benutzerinteraktionen durch Server  
- **Dynamische Parametererfassung**: Sammeln fehlender oder optionaler Parameter während der Werkzeugausführung

Elicitation-Anfragen erfolgen über die Methode `elicitation/request` und sammeln Benutzereingaben über die Client-Schnittstelle.

**URL-Modus Elicitation**: Server können auch URL-basierte Benutzerinteraktionen anfragen, die es erlauben, Nutzer zu externen Webseiten für Authentifizierung, Bestätigung oder Dateneingabe zu leiten.

### Logging

**Logging** erlaubt es Servern, strukturierte Lognachrichten an Clients zum Debugging, zur Überwachung und operativen Transparenz zu senden:

- **Debugging-Unterstützung**: Erlaubt Servern, detaillierte Ausführungsprotokolle für Fehlerbehebung bereitzustellen  
- **Operative Überwachung**: Sendet Statusupdates und Leistungsmetriken an Clients  
- **Fehlermeldungen**: Liefert detaillierten Fehlerkontext und Diagnosedaten  
- **Audit-Trails**: Erstellt umfassende Protokolle von Serveroperationen und Entscheidungen

Logging-Nachrichten werden an Clients gesendet, um Transparenz der Serveraktionen zu gewährleisten und die Fehlerbehebung zu erleichtern.

## Informationsfluss im MCP

Das Model Context Protocol (MCP) definiert einen strukturierten Informationsfluss zwischen Hosts, Clients, Servern und Modellen. Das Verständnis dieses Flusses hilft dabei zu klären, wie Benutzeranfragen verarbeitet werden und wie externe Werkzeuge und Daten in Modellantworten integriert werden.
- **Host initiiert Verbindung**  
  Die Host-Anwendung (z. B. eine IDE oder Chat-Oberfläche) stellt eine Verbindung zu einem MCP-Server her, typischerweise über STDIO, WebSocket oder einen anderen unterstützten Transport.

- **Fähigkeitsverhandlung**  
  Der Client (eingebettet im Host) und der Server tauschen Informationen über ihre unterstützten Funktionen, Werkzeuge, Ressourcen und Protokollversionen aus. Dies stellt sicher, dass beide Seiten wissen, welche Fähigkeiten für die Sitzung verfügbar sind.

- **Benutzeranfrage**  
  Der Benutzer interagiert mit dem Host (z. B. durch Eingabe eines Prompts oder Befehls). Der Host sammelt diese Eingabe und übergibt sie zur Verarbeitung an den Client.

- **Nutzung von Ressourcen oder Werkzeugen**  
  - Der Client kann zusätzliche Kontexte oder Ressourcen beim Server anfordern (wie Dateien, Datenbankeinträge oder Wissensdatenbankartikel), um das Verständnis des Modells zu erweitern.  
  - Wenn das Modell feststellt, dass ein Werkzeug benötigt wird (z. B. um Daten abzurufen, eine Berechnung durchzuführen oder eine API aufzurufen), sendet der Client eine Anforderung zur Werkzeugausführung an den Server, wobei der Werkzeugname und Parameter angegeben werden.

- **Serverausführung**  
  Der Server empfängt die Anfrage zu Ressource oder Werkzeug, führt die notwendigen Operationen aus (z. B. eine Funktion ausführen, eine Datenbank abfragen oder eine Datei abrufen) und gibt die Ergebnisse in einem strukturierten Format an den Client zurück.

- **Antwortgenerierung**  
  Der Client integriert die Serverantworten (Ressourcendaten, Werkzeugausgaben usw.) in die fortlaufende Modellinteraktion. Das Modell verwendet diese Informationen, um eine umfassende und kontextuell relevante Antwort zu erzeugen.

- **Ergebnispräsentation**  
  Der Host erhält die finale Ausgabe vom Client und präsentiert sie dem Benutzer, oft einschließlich sowohl des vom Modell generierten Textes als auch der Ergebnisse aus Werkzeugaufrufen oder Ressourcensuchen.

Dieser Ablauf ermöglicht MCP, fortschrittliche, interaktive und kontextbewusste KI-Anwendungen zu unterstützen, indem Modelle nahtlos mit externen Werkzeugen und Datenquellen verbunden werden.

## Protokollarchitektur & Schichten

MCP besteht aus zwei unterschiedlichen architektonischen Schichten, die zusammenarbeiten, um einen vollständigen Kommunikationsrahmen bereitzustellen:

### Datenschicht

Die **Datenschicht** implementiert das Kernprotokoll von MCP auf Basis von **JSON-RPC 2.0**. Diese Schicht definiert die Nachrichtenstruktur, Semantik und Interaktionsmuster:

#### Kernkomponenten:

- **JSON-RPC 2.0 Protokoll**: Alle Kommunikation verwendet das standardisierte JSON-RPC 2.0 Nachrichtenformat für Methodenaufrufe, Antworten und Benachrichtigungen  
- **Lebenszyklusverwaltung**: Handhabt Verbindungsinitialisierung, Fähigkeitsverhandlung und Sitzungsbeendigung zwischen Clients und Servern  
- **Serverprimitiven**: Ermöglicht Servern, Kernfunktionen über Werkzeuge, Ressourcen und Prompts bereitzustellen  
- **Clientprimitiven**: Ermöglicht Servern, Sampling von LLMs anzufordern, Benutzereingaben einzufordern und Lognachrichten zu senden  
- **Echtzeitbenachrichtigungen**: Unterstützt asynchrone Benachrichtigungen für dynamische Updates ohne Abfrage

#### Schlüsselfunktionen:

- **Protokollversionsverhandlung**: Verwendet datumsbasierte Versionierung (JJJJ-MM-TT) zur Gewährleistung der Kompatibilität  
- **Fähigkeitenentdeckung**: Clients und Server tauschen unterstützte Funktionsinformationen während der Initialisierung aus  
- **Zustandsbehaftete Sitzungen**: Erhält Verbindungszustand über mehrere Interaktionen hinweg für Kontextkontinuität  

### Transportschicht

Die **Transportschicht** verwaltet Kommunikationskanäle, Nachrichtenformatierung und Authentifizierung zwischen MCP-Teilnehmern:

#### Unterstützte Transportmechanismen:

1. **STDIO Transport**:  
   - Verwendet Standard-Ein-/Ausgabeströme für direkte Prozesskommunikation  
   - Optimal für lokale Prozesse auf demselben Rechner ohne Netzwerkaufwand  
   - Häufig benutzt für lokale MCP-Serverimplementierungen

2. **Streambarer HTTP-Transport**:  
   - Verwendet HTTP POST für Client-zu-Server-Nachrichten  
   - Optional Server-Sent Events (SSE) für Server-zu-Client-Streaming  
   - Ermöglicht Remote-Server-Kommunikation über Netzwerke  
   - Unterstützt Standard-HTTP-Authentifizierung (Bearer-Token, API-Schlüssel, benutzerdefinierte Header)  
   - MCP empfiehlt OAuth für sichere tokenbasierte Authentifizierung

#### Transportabstraktion:

Die Transportschicht abstrahiert Kommunikationsdetails von der Datenschicht und ermöglicht dasselbe JSON-RPC 2.0 Nachrichtenformat über alle Transportmechanismen hinweg. Diese Abstraktion erlaubt Anwendungen, nahtlos zwischen lokalen und entfernten Servern zu wechseln.

### Sicherheitsüberlegungen

MCP-Implementierungen müssen mehrere kritische Sicherheitsprinzipien einhalten, um sichere, vertrauenswürdige und geschützte Interaktionen in allen Protokolloperationen zu gewährleisten:

- **Benutzerzustimmung und Kontrolle**: Benutzer müssen ausdrücklich zustimmen, bevor Daten zugänglich gemacht oder Operationen ausgeführt werden. Sie sollen klare Kontrolle darüber haben, welche Daten geteilt und welche Aktionen autorisiert werden, unterstützt durch intuitive Benutzeroberflächen zur Überprüfung und Genehmigung von Aktivitäten.

- **Datenschutz**: Benutzerdaten dürfen nur mit ausdrücklicher Zustimmung freigegeben werden und müssen durch geeignete Zugriffskontrollen geschützt sein. MCP-Implementierungen müssen unerlaubte Datenübertragung verhindern und den Datenschutz in allen Interaktionen gewährleisten.

- **Werkzeugsicherheit**: Vor dem Aufruf eines Werkzeugs ist ausdrückliche Benutzerzustimmung erforderlich. Benutzer sollen die Funktionsweise jedes Werkzeugs verstehen, und robuste Sicherheitsgrenzen müssen durchgesetzt werden, um unbeabsichtigte oder unsichere Werkzeugausführung zu verhindern.

Durch die Einhaltung dieser Sicherheitsprinzipien stellt MCP sicher, dass Vertrauen, Datenschutz und Sicherheit bei allen Protokollinteraktionen erhalten bleiben und gleichzeitig leistungsstarke KI-Integrationen ermöglicht werden.

## Codebeispiele: Schlüsselfunktionen

Nachfolgend sind Codebeispiele in mehreren populären Programmiersprachen aufgeführt, die zeigen, wie wichtige MCP-Serverkomponenten und Werkzeuge implementiert werden.

### .NET Beispiel: Einfachen MCP-Server mit Werkzeugen erstellen

Hier ist ein praktisches .NET-Codebeispiel, das demonstriert, wie man einen einfachen MCP-Server mit benutzerdefinierten Werkzeugen implementiert. Dieses Beispiel zeigt, wie man Werkzeuge definiert und registriert, Anfragen verarbeitet und den Server über das Model Context Protocol verbindet.

```csharp
using System;
using System.Threading.Tasks;
using ModelContextProtocol.Server;
using ModelContextProtocol.Server.Transport;
using ModelContextProtocol.Server.Tools;

public class WeatherServer
{
    public static async Task Main(string[] args)
    {
        // Create an MCP server
        var server = new McpServer(
            name: "Weather MCP Server",
            version: "1.0.0"
        );
        
        // Register our custom weather tool
        server.AddTool<string, WeatherData>("weatherTool", 
            description: "Gets current weather for a location",
            execute: async (location) => {
                // Call weather API (simplified)
                var weatherData = await GetWeatherDataAsync(location);
                return weatherData;
            });
        
        // Connect the server using stdio transport
        var transport = new StdioServerTransport();
        await server.ConnectAsync(transport);
        
        Console.WriteLine("Weather MCP Server started");
        
        // Keep the server running until process is terminated
        await Task.Delay(-1);
    }
    
    private static async Task<WeatherData> GetWeatherDataAsync(string location)
    {
        // This would normally call a weather API
        // Simplified for demonstration
        await Task.Delay(100); // Simulate API call
        return new WeatherData { 
            Temperature = 72.5,
            Conditions = "Sunny",
            Location = location
        };
    }
}

public class WeatherData
{
    public double Temperature { get; set; }
    public string Conditions { get; set; }
    public string Location { get; set; }
}
```

### Java Beispiel: MCP Serverkomponenten

Dieses Beispiel zeigt denselben MCP-Server und Werkzeugregistrierung wie das obige .NET-Beispiel, jedoch in Java implementiert.

```java
import io.modelcontextprotocol.server.McpServer;
import io.modelcontextprotocol.server.McpToolDefinition;
import io.modelcontextprotocol.server.transport.StdioServerTransport;
import io.modelcontextprotocol.server.tool.ToolExecutionContext;
import io.modelcontextprotocol.server.tool.ToolResponse;

public class WeatherMcpServer {
    public static void main(String[] args) throws Exception {
        // Erstellen Sie einen MCP-Server
        McpServer server = McpServer.builder()
            .name("Weather MCP Server")
            .version("1.0.0")
            .build();
            
        // Registrieren Sie ein Wettertool
        server.registerTool(McpToolDefinition.builder("weatherTool")
            .description("Gets current weather for a location")
            .parameter("location", String.class)
            .execute((ToolExecutionContext ctx) -> {
                String location = ctx.getParameter("location", String.class);
                
                // Wetterdaten abrufen (vereinfacht)
                WeatherData data = getWeatherData(location);
                
                // Formatierte Antwort zurückgeben
                return ToolResponse.content(
                    String.format("Temperature: %.1f°F, Conditions: %s, Location: %s", 
                    data.getTemperature(), 
                    data.getConditions(), 
                    data.getLocation())
                );
            })
            .build());
        
        // Verbinden Sie den Server über stdio-Transport
        try (StdioServerTransport transport = new StdioServerTransport()) {
            server.connect(transport);
            System.out.println("Weather MCP Server started");
            // Server am Laufen halten, bis der Prozess beendet wird
            Thread.currentThread().join();
        }
    }
    
    private static WeatherData getWeatherData(String location) {
        // Die Implementierung würde eine Wetter-API aufrufen
        // Vereinfacht zu Demonstrationszwecken
        return new WeatherData(72.5, "Sunny", location);
    }
}

class WeatherData {
    private double temperature;
    private String conditions;
    private String location;
    
    public WeatherData(double temperature, String conditions, String location) {
        this.temperature = temperature;
        this.conditions = conditions;
        this.location = location;
    }
    
    public double getTemperature() {
        return temperature;
    }
    
    public String getConditions() {
        return conditions;
    }
    
    public String getLocation() {
        return location;
    }
}
```

### Python Beispiel: Aufbau eines MCP-Servers

Dieses Beispiel verwendet fastmcp, bitte stellen Sie sicher, dass Sie es zuerst installieren:

```python
pip install fastmcp
```
Code-Beispiel:

```python
#!/usr/bin/env python3
import asyncio
from fastmcp import FastMCP
from fastmcp.transports.stdio import serve_stdio

# Erstelle einen FastMCP-Server
mcp = FastMCP(
    name="Weather MCP Server",
    version="1.0.0"
)

@mcp.tool()
def get_weather(location: str) -> dict:
    """Gets current weather for a location."""
    return {
        "temperature": 72.5,
        "conditions": "Sunny",
        "location": location
    }

# Alternative Vorgehensweise mit einer Klasse
class WeatherTools:
    @mcp.tool()
    def forecast(self, location: str, days: int = 1) -> dict:
        """Gets weather forecast for a location for the specified number of days."""
        return {
            "location": location,
            "forecast": [
                {"day": i+1, "temperature": 70 + i, "conditions": "Partly Cloudy"}
                for i in range(days)
            ]
        }

# Klassenwerkzeuge registrieren
weather_tools = WeatherTools()

# Starte den Server
if __name__ == "__main__":
    asyncio.run(serve_stdio(mcp))
```

### JavaScript Beispiel: MCP-Server erstellen

Dieses Beispiel zeigt die Erstellung eines MCP-Servers in JavaScript und wie zwei wetterbezogene Werkzeuge registriert werden.

```javascript
// Verwendung des offiziellen Model Context Protocol SDK
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // Zur Parametervalidierung

// Erstelle einen MCP-Server
const server = new McpServer({
  name: "Weather MCP Server",
  version: "1.0.0"
});

// Definiere ein Wetter-Tool
server.tool(
  "weatherTool",
  {
    location: z.string().describe("The location to get weather for")
  },
  async ({ location }) => {
    // Dies würde normalerweise eine Wetter-API aufrufen
    // Für die Demonstration vereinfacht
    const weatherData = await getWeatherData(location);
    
    return {
      content: [
        { 
          type: "text", 
          text: `Temperature: ${weatherData.temperature}°F, Conditions: ${weatherData.conditions}, Location: ${weatherData.location}` 
        }
      ]
    };
  }
);

// Definiere ein Prognose-Tool
server.tool(
  "forecastTool",
  {
    location: z.string(),
    days: z.number().default(3).describe("Number of days for forecast")
  },
  async ({ location, days }) => {
    // Dies würde normalerweise eine Wetter-API aufrufen
    // Für die Demonstration vereinfacht
    const forecast = await getForecastData(location, days);
    
    return {
      content: [
        { 
          type: "text", 
          text: `${days}-day forecast for ${location}: ${JSON.stringify(forecast)}` 
        }
      ]
    };
  }
);

// Hilfsfunktionen
async function getWeatherData(location) {
  // API-Aufruf simulieren
  return {
    temperature: 72.5,
    conditions: "Sunny",
    location: location
  };
}

async function getForecastData(location, days) {
  // API-Aufruf simulieren
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    temperature: 70 + Math.floor(Math.random() * 10),
    conditions: i % 2 === 0 ? "Sunny" : "Partly Cloudy"
  }));
}

// Verbinde den Server mit dem stdio-Transport
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);

console.log("Weather MCP Server started");
```

Dieses JavaScript-Beispiel demonstriert, wie man mit dem Model Context Protocol SDK einen MCP-Server erstellt. Es zeigt, wie zwei Werkzeuge namens `weatherTool` und `forecastTool` registriert und MCP-Clients über den `StdioServerTransport` bereitgestellt werden.

## Sicherheit und Autorisierung

MCP umfasst mehrere eingebaute Konzepte und Mechanismen zur Verwaltung von Sicherheit und Autorisierung während des gesamten Protokolls:

1. **Werkzeug-Berechtigungskontrolle**:  
   Clients können angeben, welche Werkzeuge ein Modell während einer Sitzung verwenden darf. Dies stellt sicher, dass nur ausdrücklich autorisierte Werkzeuge zugänglich sind und minimiert das Risiko unbeabsichtigter oder unsicherer Operationen. Berechtigungen können dynamisch basierend auf Benutzerpräferenzen, organisatorischen Richtlinien oder dem Kontext der Interaktion konfiguriert werden.

2. **Authentifizierung**:  
   Server können eine Authentifizierung verlangen, bevor Zugriff auf Werkzeuge, Ressourcen oder sensible Operationen gewährt wird. Dies kann API-Schlüssel, OAuth-Token oder andere Authentifizierungsschemata umfassen. Eine ordnungsgemäße Authentifizierung stellt sicher, dass nur vertrauenswürdige Clients und Benutzer serverseitige Fähigkeiten aufrufen können.

3. **Validierung**:  
   Parametervalidierung wird bei allen Werkzeugaufrufen durchgesetzt. Jedes Werkzeug definiert die erwarteten Typen, Formate und Einschränkungen für seine Parameter, und der Server validiert eingehende Anfragen entsprechend. Dies verhindert fehlerhafte oder bösartige Eingaben, die Werkzeugimplementierungen erreichen, und hilft, die Integrität der Operationen zu erhalten.

4. **Drosselung (Rate Limiting)**:  
   Um Missbrauch zu verhindern und faire Nutzung der Serverressourcen sicherzustellen, können MCP-Server Drosselungen für Werkzeugaufrufe und Ressourcenaufrufe implementieren. Limits können pro Benutzer, pro Sitzung oder global gelten und helfen, Denial-of-Service-Angriffe oder übermäßigen Ressourcenverbrauch zu vermeiden.

Durch die Kombination dieser Mechanismen bietet MCP eine sichere Grundlage für die Integration von Sprachmodellen mit externen Werkzeugen und Datenquellen und ermöglicht Benutzern und Entwicklern eine fein abgestimmte Kontrolle über Zugriff und Nutzung.

## Protokollnachrichten & Kommunikationsablauf

MCP-Kommunikation verwendet strukturierte **JSON-RPC 2.0**-Nachrichten, um klare und verlässliche Interaktionen zwischen Hosts, Clients und Servern zu ermöglichen. Das Protokoll definiert spezifische Nachrichtenmuster für unterschiedliche Operationstypen:

### Kernnachrichtentypen:

#### **Initialisierungsnachrichten**
- **`initialize` Anfrage**: Stellt Verbindung her und verhandelt Protokollversion und Fähigkeiten  
- **`initialize` Antwort**: Bestätigt unterstützte Funktionen und Serverinformationen  
- **`notifications/initialized`**: Signalisiert, dass die Initialisierung abgeschlossen ist und die Sitzung bereitsteht

#### **Entdeckungsnachrichten**
- **`tools/list` Anfrage**: Entdeckt verfügbare Werkzeuge vom Server  
- **`resources/list` Anfrage**: Listet verfügbare Ressourcen (Datenquellen) auf  
- **`prompts/list` Anfrage**: Ruft verfügbare Prompt-Vorlagen ab

#### **Ausführungsnachrichten**  
- **`tools/call` Anfrage**: Führt ein spezifisches Werkzeug mit übergebenen Parametern aus  
- **`resources/read` Anfrage**: Ruft Inhalt einer spezifischen Ressource ab  
- **`prompts/get` Anfrage**: Holt eine Prompt-Vorlage mit optionalen Parametern

#### **Clientseitige Nachrichten**
- **`sampling/complete` Anfrage**: Server fordert LLM-Vervollständigung vom Client an  
- **`elicitation/request`**: Server fordert Benutzereingabe über Client-Oberfläche an  
- **Logging-Nachrichten**: Server sendet strukturierte Protokollnachrichten an den Client

#### **Benachrichtigungsnachrichten**
- **`notifications/tools/list_changed`**: Server benachrichtigt Client über Werkzeugänderungen  
- **`notifications/resources/list_changed`**: Server benachrichtigt Client über Ressourcenänderungen  
- **`notifications/prompts/list_changed`**: Server benachrichtigt Client über Prompt-Änderungen

### Nachrichtenstruktur:

Alle MCP-Nachrichten folgen dem JSON-RPC 2.0-Format mit:  
- **Anfragenachrichten**: Enthalten `id`, `method` und optional `params`  
- **Antwortnachrichten**: Enthalten `id` und entweder `result` oder `error`  
- **Benachrichtigungsnachrichten**: Enthalten `method` und optional `params` (kein `id` und keine Antwort erwartet)

Diese strukturierte Kommunikation gewährleistet zuverlässige, nachvollziehbare und erweiterbare Interaktionen, die fortschrittliche Szenarien wie Echtzeitupdates, Werkzeugverkettung und robuste Fehlerbehandlung unterstützen.

### Aufgaben (Experimentell)

**Aufgaben** sind ein experimentelles Feature, das langlebige Ausführungshüllen bereitstellt, welche eine verzögerte Ergebniserfassung und Statusverfolgung für MCP-Anfragen ermöglichen:

- **Langlaufende Operationen**: Verfolgt aufwändige Berechnungen, Workflow-Automatisierung und Batch-Verarbeitung  
- **Verzögerte Ergebnisse**: Überprüft Aufgabenstatus und ruft Ergebnisse ab, wenn Operationen abgeschlossen sind  
- **Statusverfolgung**: Überwacht Aufgabenfortschritt durch definierte Lebenszyklusphasen  
- **Mehrphasige Operationen**: Unterstützt komplexe Arbeitsabläufe, die mehrere Interaktionen umfassen

Aufgaben kapseln Standard-MCP-Anfragen, um asynchrone Ausführungsmuster für Operationen zu ermöglichen, die nicht sofort abgeschlossen werden können.

## Wichtige Erkenntnisse

- **Architektur**: MCP verwendet eine Client-Server-Architektur, bei der Hosts mehrere Client-Verbindungen zu Servern verwalten  
- **Teilnehmer**: Das Ökosystem umfasst Hosts (KI-Anwendungen), Clients (Protokollverbindungsstücke) und Server (Fähigkeitsanbieter)  
- **Transportmechanismen**: Kommunikation unterstützt STDIO (lokal) und streambaren HTTP mit optionalem SSE (remote)  
- **Kernprimitiven**: Server stellen Werkzeuge (ausführbare Funktionen), Ressourcen (Datenquellen) und Prompts (Vorlagen) bereit  
- **Clientprimitiven**: Server können Sampling (LLM-Vervollständigungen mit Werkzeugaufrufen), Elicitation (Benutzereingaben inkl. URL-Modus), Roots (Dateisystemgrenzen) und Logging von Clients anfordern  
- **Experimentelle Features**: Aufgaben bieten langlebige Ausführungshüllen für langlaufende Operationen  
- **Protokollgrundlage**: Basierend auf JSON-RPC 2.0 mit datumsbasierter Versionierung (aktuell: 2025-11-25)  
- **Echtzeitfähigkeiten**: Unterstützt Benachrichtigungen für dynamische Updates und Echtzeitsynchronisation  
- **Sicherheit an erster Stelle**: Explizite Benutzerzustimmung, Datenschutz und sichere Übertragung sind Kernanforderungen

## Übung

Entwerfen Sie ein einfaches MCP-Werkzeug, das in Ihrem Fachbereich nützlich wäre. Definieren Sie:  
1. Wie das Werkzeug heißen würde  
2. Welche Parameter es akzeptieren würde  
3. Welche Ausgabe es zurückgeben würde  
4. Wie ein Modell dieses Werkzeug nutzen könnte, um Benutzerprobleme zu lösen


---

## Was kommt als Nächstes

Nächstes: [Kapitel 2: Sicherheit](../02-Security/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mithilfe des KI-Übersetzungsdienstes [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->