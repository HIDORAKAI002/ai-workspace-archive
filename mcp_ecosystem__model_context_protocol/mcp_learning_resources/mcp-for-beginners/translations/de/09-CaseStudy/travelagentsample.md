# Fallstudie: Azure AI Reiseagenten – Referenzimplementierung

## Überblick

[Azure AI Reiseagenten](https://github.com/Azure-Samples/azure-ai-travel-agents) ist eine umfassende Referenzlösung, die von Microsoft entwickelt wurde und zeigt, wie man eine multi-agentenbasierte, KI-gestützte Reiseplanungsanwendung unter Verwendung des Model Context Protocol (MCP), Azure OpenAI und Azure AI Search erstellt. Dieses Projekt demonstriert bewährte Vorgehensweisen zur Orchestrierung mehrerer KI-Agenten, zur Integration von Unternehmensdaten und zur Bereitstellung einer sicheren, erweiterbaren Plattform für reale Szenarien.

## Hauptmerkmale
- **Multi-Agenten-Orchestrierung:** Nutzt MCP zur Koordination spezialisierter Agenten (z. B. Flug-, Hotel- und Reiseplanungsagenten), die zusammenarbeiten, um komplexe Reiseplanungsaufgaben zu erfüllen.
- **Integration von Unternehmensdaten:** Verbindet sich mit Azure AI Search und anderen Unternehmensdatenquellen, um aktuelle und relevante Informationen für Reiseempfehlungen bereitzustellen.
- **Sichere, skalierbare Architektur:** Verwendet Azure-Dienste für Authentifizierung, Autorisierung und skalierbare Bereitstellung unter Einhaltung von Best Practices zur Unternehmenssicherheit.
- **Erweiterbare Werkzeuge:** Implementiert wiederverwendbare MCP-Tools und Prompt-Vorlagen, die eine schnelle Anpassung an neue Domänen oder Geschäftsanforderungen ermöglichen.
- **Benutzererlebnis:** Bietet eine dialogorientierte Schnittstelle, über die Nutzer mit den Reiseagenten interagieren können, angetrieben von Azure OpenAI und MCP.

## Architektur
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Beschreibung des Architekturdiagramms

Die Azure AI Reiseagenten-Lösung ist auf Modularität, Skalierbarkeit und sichere Integration mehrerer KI-Agenten und Unternehmensdatenquellen ausgelegt. Die Hauptkomponenten und der Datenfluss sind wie folgt:

- **Benutzerschnittstelle:** Nutzer interagieren über eine dialogorientierte Benutzeroberfläche (z. B. Web-Chat oder Teams-Bot), die Benutzeranfragen sendet und Reiseempfehlungen empfängt.
- **MCP-Server:** Dient als zentraler Orchestrator, empfängt Benutzereingaben, verwaltet den Kontext und koordiniert die Aktionen spezialisierter Agenten (z. B. FlightAgent, HotelAgent, ItineraryAgent) über das Model Context Protocol.
- **KI-Agenten:** Jeder Agent ist für einen bestimmten Bereich (Flüge, Hotels, Reiseplanung) zuständig und als MCP-Tool implementiert. Agenten verwenden Prompt-Vorlagen und Logik, um Anfragen zu bearbeiten und Antworten zu generieren.
- **Azure OpenAI Service:** Bietet fortgeschrittenes Verständnis natürlicher Sprache und Spracherzeugung, damit Agenten die Absicht des Nutzers interpretieren und konversationelle Antworten generieren können.
- **Azure AI Search & Unternehmensdaten:** Agenten durchsuchen Azure AI Search und andere Unternehmensdatenquellen, um aktuelle Informationen zu Flügen, Hotels und Reiseoptionen abzurufen.
- **Authentifizierung & Sicherheit:** Integriert Microsoft Entra ID für sichere Authentifizierung und wendet Zugriffskontrollen nach dem Least-Privilege-Prinzip auf alle Ressourcen an.
- **Bereitstellung:** Konzipiert für die Bereitstellung auf Azure Container Apps, um Skalierbarkeit, Überwachung und operative Effizienz sicherzustellen.

Diese Architektur ermöglicht eine nahtlose Orchestrierung mehrerer KI-Agenten, sichere Integration mit Unternehmensdaten und eine robuste, erweiterbare Plattform zum Aufbau branchenspezifischer KI-Lösungen.

## Schritt-für-Schritt-Erklärung des Architekturdiagramms
Stellen Sie sich vor, Sie planen eine große Reise und haben ein Team von Expertenassistenten, die Ihnen bei jedem Detail helfen. Das Azure AI Reiseagenten-System funktioniert ähnlich, indem es verschiedene Teile (wie Teammitglieder) nutzt, die jeweils eine spezielle Aufgabe haben. So fügt sich alles zusammen:

### Benutzerschnittstelle (UI):
Stellen Sie sich dies als den Empfang Ihres Reisebüros vor. Hier stellen Sie (der Nutzer) Fragen oder machen Anfragen, z. B. „Finde mir einen Flug nach Paris.“ Dies könnte ein Chatfenster auf einer Webseite oder eine Messaging-App sein.

### MCP-Server (Der Koordinator):
Der MCP-Server ist wie der Manager, der Ihre Anfrage am Empfang entgegennimmt und entscheidet, welcher Spezialist welchen Teil bearbeiten soll. Er verfolgt Ihre Unterhaltung und sorgt dafür, dass alles reibungslos läuft.

### KI-Agenten (Spezialistenassistenten):
Jeder Agent ist Experte in einem bestimmten Bereich – einer kennt sich mit Flügen aus, ein anderer mit Hotels, ein weiterer mit der Reiseplanung. Wenn Sie eine Reiseanfrage stellen, sendet der MCP-Server Ihre Anfrage an den/ die richtigen Agent(en). Diese Agenten nutzen ihr Wissen und ihre Werkzeuge, um die besten Optionen für Sie zu finden.

### Azure OpenAI Service (Sprachenexperte):
Dies ist wie ein Sprachenexperte, der genau versteht, was Sie fragen, egal wie Sie es formulieren. Er hilft den Agenten, Ihre Anfragen zu verstehen und Antworten in natürlicher, konversationeller Sprache zu generieren.

### Azure AI Search & Unternehmensdaten (Informationsbibliothek):
Stellen Sie sich eine riesige, stets aktuelle Bibliothek mit allen neuesten Reiseinformationen vor – Flugpläne, Hotelverfügbarkeiten und mehr. Die Agenten durchsuchen diese Bibliothek, um die genauesten Antworten für Sie zu finden.

### Authentifizierung & Sicherheit (Sicherheitsdienst):
Wie ein Sicherheitsdienst, der prüft, wer Zutritt zu bestimmten Bereichen erhält, sorgt dieser Teil dafür, dass nur autorisierte Personen und Agenten auf sensible Informationen zugreifen können. Er hält Ihre Daten sicher und privat.

### Bereitstellung auf Azure Container Apps (Das Gebäude):
All diese Assistenten und Werkzeuge arbeiten gemeinsam in einem sicheren, skalierbaren Gebäude (der Cloud). Das bedeutet, das System kann viele Nutzer gleichzeitig bedienen und ist stets verfügbar, wenn Sie es brauchen.

## Wie das alles zusammenarbeitet:

Sie beginnen, indem Sie am Empfang (UI) eine Frage stellen.  
Der Manager (MCP-Server) findet heraus, welcher Spezialist (Agent) Ihnen helfen soll.  
Der Spezialist nutzt den Sprachenexperten (OpenAI) zum Verstehen Ihrer Anfrage und die Bibliothek (AI Search), um die beste Antwort zu finden.  
Der Sicherheitsdienst (Authentifizierung) sorgt dafür, dass alles sicher ist.  
Das alles passiert in einem zuverlässigen, skalierbaren Gebäude (Azure Container Apps), damit Ihr Erlebnis reibungslos und sicher verläuft.  
Diese Teamarbeit ermöglicht es dem System, Ihnen schnell und sicher bei der Reiseplanung zu helfen – wie ein Team von Expertenreisagenten, die zusammen in einem modernen Büro arbeiten!

## Technische Implementierung
- **MCP-Server:** Hält die zentrale Orchestrierungslogik bereit, stellt Agenten-Tools bereit und verwaltet den Kontext für mehrstufige Reiseplanungs-Workflows.
- **Agenten:** Jeder Agent (z. B. FlightAgent, HotelAgent) ist als MCP-Tool mit eigenen Prompt-Vorlagen und Logik implementiert.
- **Azure-Integration:** Nutzt Azure OpenAI für das Verständnis natürlicher Sprache und Azure AI Search für die Datensuche.
- **Sicherheit:** Integriert Microsoft Entra ID für Authentifizierung und wendet Least-Privilege-Zugriffskontrollen auf alle Ressourcen an.
- **Bereitstellung:** Unterstützt die Bereitstellung auf Azure Container Apps für Skalierbarkeit und operative Effizienz.

## Ergebnisse und Auswirkungen
- Demonstriert, wie MCP zum Orchestrieren mehrerer KI-Agenten in einem realen, produktionsreifen Szenario eingesetzt werden kann.
- Beschleunigt die Lösungsentwicklung durch Bereitstellung wiederverwendbarer Muster für Agentenkoordination, Datenintegration und sichere Bereitstellung.
- Dient als Blaupause für den Aufbau branchenspezifischer, KI-gestützter Anwendungen unter Verwendung von MCP und Azure-Diensten.

## Verweise
- [Azure AI Reiseagenten GitHub-Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Was kommt als Nächstes

- Zurück zu: [Fallstudien Übersicht](./README.md)  
- Weiter: [Aktualisieren von ADO-Elementen von YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir um Genauigkeit bemüht sind, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache ist als maßgebliche Quelle zu betrachten. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->