## Erste Schritte  

[![Erstelle deinen ersten MCP-Server](../../../translated_images/de/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Klicke auf das obige Bild, um das Video dieser Lektion anzusehen)_

Dieser Abschnitt besteht aus mehreren Lektionen:

- **1 Dein erster Server**, in dieser ersten Lektion lernst du, wie du deinen ersten Server erstellst und ihn mit dem Inspector-Tool überprüfst, eine wertvolle Methode zum Testen und Debuggen deines Servers, [zur Lektion](01-first-server/README.md)

- **2 Client**, in dieser Lektion lernst du, wie man einen Client schreibt, der sich mit deinem Server verbinden kann, [zur Lektion](02-client/README.md)

- **3 Client mit LLM**, eine noch bessere Methode, einen Client zu schreiben, besteht darin, einen LLM hinzuzufügen, der "verhandeln" kann, was der Server tun soll, [zur Lektion](03-llm-client/README.md)

- **4 Nutzung eines Server GitHub Copilot Agent Modus in Visual Studio Code**. Hier betrachten wir, wie unser MCP Server direkt in Visual Studio Code ausgeführt wird, [zur Lektion](04-vscode/README.md)

- **5 stdio Transport Server** stdio Transport ist der empfohlene Standard für die lokale Kommunikation zwischen MCP Server und Client und bietet eine sichere Subprozess-basierte Kommunikation mit eingebauter Prozessisolation [zur Lektion](05-stdio-server/README.md)

- **6 HTTP Streaming mit MCP (Streamable HTTP)**. Erfahre mehr über den modernen HTTP-Streaming-Transport (die empfohlene Methode für entfernte MCP Server laut [MCP Spezifikation 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), Fortschrittsbenachrichtigungen und wie man skalierbare, Echtzeit-MCP-Server und -Clients mit Streamable HTTP implementiert. [zur Lektion](06-http-streaming/README.md)

- **7 Nutzung des AI Toolkits für VSCode** zum Konsumieren und Testen deiner MCP Clients und Server [zur Lektion](07-aitk/README.md)

- **8 Testing**. Hier konzentrieren wir uns besonders darauf, wie wir unseren Server und Client auf verschiedene Arten testen können, [zur Lektion](08-testing/README.md)

- **9 Deployment**. Dieses Kapitel betrachtet verschiedene Möglichkeiten, deine MCP-Lösungen bereitzustellen, [zur Lektion](09-deployment/README.md)

- **10 Erweiterte Servernutzung**. Dieses Kapitel behandelt erweiterte Serveranwendungen, [zur Lektion](./10-advanced/README.md)

- **11 Auth**. Dieses Kapitel behandelt, wie man einfache Authentifizierung hinzufügt – von Basic Auth bis zur Verwendung von JWT und RBAC. Es wird empfohlen, hier zu beginnen, dann die erweiterten Themen in Kapitel 5 anzuschauen und zusätzliche Sicherheitsmaßnahmen gemäß den Empfehlungen in Kapitel 2 durchzuführen, [zur Lektion](./11-simple-auth/README.md)

- **12 MCP Hosts**. Konfiguriere und nutze beliebte MCP Host Clients wie Claude Desktop, Cursor, Cline und Windsurf. Lerne verschiedene Transportarten und Fehlerbehebung, [zur Lektion](./12-mcp-hosts/README.md)

- **13 MCP Inspector**. Debugge und teste deine MCP Server interaktiv mit dem MCP Inspector Tool. Lerne Fehlerbehebungstools, Ressourcen und Protokollnachrichten, [zur Lektion](./13-mcp-inspector/README.md)

- **14 Sampling**. Erstelle MCP Server, die mit MCP Clients bei LLM-bezogenen Aufgaben zusammenarbeiten (veraltet im Release-Kandidaten `2026-07-28`; weiterhin gültig für `2025-11-25`). [zur Lektion](./14-sampling/README.md)

- **15 MCP Apps**. Baue MCP Server, die auch mit UI-Anweisungen antworten, [zur Lektion](./15-mcp-apps/README.md)

Das Model Context Protocol (MCP) ist ein offenes Protokoll, das standardisiert, wie Anwendungen Kontext für LLMs bereitstellen. Denke an MCP wie an einen USB-C-Anschluss für KI-Anwendungen – es bietet eine standardisierte Möglichkeit, KI-Modelle mit verschiedenen Datenquellen und Werkzeugen zu verbinden.

## Lernziele

Am Ende dieser Lektion wirst du in der Lage sein:

- Entwicklungsumgebungen für MCP in C#, Java, Python, TypeScript und JavaScript einzurichten
- Grundlegende MCP-Server mit benutzerdefinierten Features (Ressourcen, Prompts und Werkzeuge) zu erstellen und bereitzustellen
- Host-Anwendungen zu erstellen, die sich mit MCP-Servern verbinden
- MCP-Implementierungen zu testen und zu debuggen
- Häufige Einrichtungsprobleme zu verstehen und deren Lösungen kennenzulernen
- Deine MCP-Implementierungen mit beliebten LLM-Diensten zu verbinden

## Einrichtung deiner MCP-Umgebung

Bevor du mit MCP arbeitest, ist es wichtig, deine Entwicklungsumgebung vorzubereiten und den grundlegenden Arbeitsablauf zu verstehen. Dieser Abschnitt führt dich durch die ersten Einrichtungsschritte, um einen reibungslosen Start mit MCP zu gewährleisten.

### Voraussetzungen

Bevor du mit der MCP-Entwicklung beginnst, stelle sicher, dass du:

- **Entwicklungsumgebung**: Für deine gewählte Sprache (C#, Java, Python, TypeScript oder JavaScript)
- **IDE/Editor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm oder einen modernen Code-Editor
- **Paketmanager**: NuGet, Maven/Gradle, pip oder npm/yarn
- **API-Schlüssel**: Für alle KI-Dienste, die du in deinen Host-Anwendungen nutzen möchtest


### Offizielle SDKs

In den kommenden Kapiteln wirst du Lösungen sehen, die mit Python, TypeScript, Java und .NET erstellt wurden. Hier sind alle offiziell unterstützten SDKs.

MCP bietet offizielle SDKs für mehrere Sprachen (entsprechend der [MCP Spezifikation 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Wird in Zusammenarbeit mit Microsoft gewartet
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Wird in Zusammenarbeit mit Spring AI gepflegt
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Die offizielle TypeScript-Implementierung
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Die offizielle Python-Implementierung (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Die offizielle Kotlin-Implementierung
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Wird in Zusammenarbeit mit Loopwork AI gepflegt
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Die offizielle Rust-Implementierung
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Die offizielle Go-Implementierung

## Wichtige Erkenntnisse

- Die Einrichtung einer MCP-Entwicklungsumgebung ist dank sprachspezifischer SDKs unkompliziert
- Der Aufbau von MCP-Servern umfasst das Erstellen und Registrieren von Werkzeugen mit klaren Schemata
- MCP-Clients verbinden sich mit Servern und Modellen, um erweiterte Fähigkeiten zu nutzen
- Testing und Debugging sind essenziell für zuverlässige MCP-Implementierungen
- Bereitstellungsoptionen reichen von lokaler Entwicklung bis hin zu Cloud-basierten Lösungen

## Üben

Wir haben eine Reihe von Beispielen, die die Übungen ergänzen, die du in allen Kapiteln dieses Abschnitts sehen wirst. Zusätzlich enthält jedes Kapitel eigene Übungen und Aufgaben.

- [Java Rechner](./samples/java/calculator/README.md)
- [.Net Rechner](../../../03-GettingStarted/samples/csharp)
- [JavaScript Rechner](./samples/javascript/README.md)
- [TypeScript Rechner](./samples/typescript/README.md)
- [Python Rechner](../../../03-GettingStarted/samples/python)

## Zusätzliche Ressourcen

- [Erstelle Agents mit Model Context Protocol auf Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Remote MCP mit Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Was kommt als Nächstes

Beginne mit der ersten Lektion: [Erstellen deines ersten MCP Servers](01-first-server/README.md)

Sobald du dieses Modul abgeschlossen hast, fahre fort mit: [Modul 4: Praktische Umsetzung](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->