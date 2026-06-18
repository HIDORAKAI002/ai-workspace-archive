# Szenario 3: In-Editor-Dokumentation mit MCP-Server in VS Code

## Übersicht

In diesem Szenario lernen Sie, wie Sie Microsoft Learn Docs direkt in Ihre Visual Studio Code-Umgebung bringen können, indem Sie den MCP-Server verwenden. Anstatt ständig Browser-Tabs zu wechseln, um nach Dokumentationen zu suchen, können Sie offizielle Dokumentationen direkt in Ihrem Editor zugreifen, durchsuchen und referenzieren. Dieser Ansatz optimiert Ihren Arbeitsablauf, hält Sie fokussiert und ermöglicht eine nahtlose Integration mit Tools wie GitHub Copilot.

- Suchen und lesen Sie Dokumentationen innerhalb von VS Code, ohne Ihre Programmierumgebung zu verlassen.
- Referenzieren Sie Dokumentationen und fügen Sie Links direkt in Ihre README- oder Kursdateien ein.
- Verwenden Sie GitHub Copilot und MCP zusammen für einen nahtlosen, KI-gestützten Dokumentations-Workflow.

## Lernziele

Am Ende dieses Kapitels werden Sie verstehen, wie Sie den MCP-Server in VS Code einrichten und verwenden, um Ihre Dokumentations- und Entwicklungsabläufe zu optimieren. Sie werden in der Lage sein:

- Ihren Workspace so zu konfigurieren, dass der MCP-Server für die Dokumentationssuche verwendet wird.
- Dokumentationen direkt aus VS Code heraus zu suchen und einzufügen.
- Die Power von GitHub Copilot und MCP zu kombinieren für einen produktiveren, KI-unterstützten Workflow.

Diese Fähigkeiten helfen Ihnen, fokussiert zu bleiben, die Qualität der Dokumentation zu verbessern und Ihre Produktivität als Entwickler oder technischer Redakteur zu steigern.

## Lösung

Um den Zugriff auf Dokumentationen im Editor zu ermöglichen, folgen Sie einer Reihe von Schritten, die den MCP-Server mit VS Code und GitHub Copilot integrieren. Diese Lösung ist ideal für Kursautor:innen, Dokumentationsschreibende und Entwickler:innen, die ihren Fokus im Editor behalten möchten, während sie mit Docs und Copilot arbeiten.

- Fügen Sie schnell Referenzlinks zu einer README hinzu, während Sie eine Kurs- oder Projektdokumentation schreiben.
- Verwenden Sie Copilot zum Generieren von Code und MCP, um sofort relevante Dokumentationen zu finden und zu zitieren.
- Bleiben Sie fokussiert in Ihrem Editor und steigern Sie Ihre Produktivität.

### Schritt-für-Schritt-Anleitung

Um zu beginnen, folgen Sie diesen Schritten. Zu jedem Schritt können Sie einen Screenshot aus dem Assets-Ordner hinzufügen, um den Prozess visuell zu veranschaulichen.

1. **Fügen Sie die MCP-Konfiguration hinzu:**
   Erstellen Sie im Projektstammverzeichnis eine `.vscode/mcp.json`-Datei und fügen Sie die folgende Konfiguration hinzu:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Diese Konfiguration teilt VS Code mit, wie die Verbindung zum [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp) hergestellt wird.
   
   ![Schritt 1: Fügen Sie mcp.json zum .vscode-Ordner hinzu](../../../../../../translated_images/de/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Öffnen Sie das GitHub Copilot-Chatfenster:**
   Falls die GitHub Copilot-Erweiterung noch nicht installiert ist, navigieren Sie zur Extensions-Ansicht in VS Code und installieren Sie sie. Sie können sie direkt vom [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) herunterladen. Öffnen Sie anschließend das Copilot-Chatfenster über die Seitenleiste.

   ![Schritt 2: Öffnen Sie das Copilot-Chatfenster](../../../../../../translated_images/de/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Aktivieren Sie den Agent-Modus und überprüfen Sie die Tools:**
   Aktivieren Sie im Copilot-Chatfenster den Agent-Modus.

   ![Schritt 3: Aktivieren Sie den Agent-Modus und überprüfen Sie die Tools](../../../../../../translated_images/de/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Prüfen Sie nach der Aktivierung, dass der MCP-Server als eines der verfügbaren Tools aufgelistet ist. Dies stellt sicher, dass der Copilot-Agent auf den Dokumentationsserver zugreifen kann, um relevante Informationen abzurufen.
   
   ![Schritt 3: Überprüfen Sie das MCP-Server-Tool](../../../../../../translated_images/de/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Starten Sie einen neuen Chat und stellen Sie dem Agenten Fragen:**
   Öffnen Sie einen neuen Chat im Copilot-Chatfenster. Sie können den Agenten nun mit Ihren Dokumentationsanfragen ansprechen. Der Agent verwendet den MCP-Server, um relevante Microsoft Learn-Dokumentationen direkt in Ihrem Editor abzurufen und anzuzeigen.

   - *„Ich versuche, einen Studienplan für Thema X zu erstellen. Ich werde es über 8 Wochen lernen, für jede Woche schlage bitte Inhalte vor, die ich behandeln sollte.“*

   ![Schritt 4: Stellen Sie dem Agenten im Chat eine Frage](../../../../../../translated_images/de/step4-prompt-chat.12187bb001605efc.webp)

5. **Live-Anfrage:**

   > Nehmen wir eine Live-Anfrage aus dem [#get-help](https://discord.gg/D6cRhjHWSC) Bereich des Microsoft Foundry Discord ([Originalnachricht ansehen](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *„Ich suche Antworten dazu, wie man eine Multi-Agenten-Lösung mit AI-Agenten entwickelt, die in Azure AI Foundry entwickelt wurden, einsetzt. Ich sehe, dass es keine direkte Deployment-Methode gibt, wie bei Copilot Studio Channels. Was sind also die verschiedenen Möglichkeiten, dieses Deployment umzusetzen, damit Unternehmensnutzer interagieren und ihre Aufgaben erledigen können?
Es gibt zahlreiche Artikel/Blogs, die sagen, dass man den Azure Bot Service verwenden kann, der als Brücke zwischen MS Teams und Azure AI Foundry Agents fungiert. Funktioniert das, wenn ich einen Azure Bot einrichte, der über eine Azure Function mit dem Orchestrator-Agenten auf Azure AI Foundry verbunden ist, um die Orchestrierung durchzuführen, oder muss ich für jeden AI-Agenten der Multi-Agenten-Lösung eine Azure Function erstellen, um die Orchestrierung im Bot Framework vorzunehmen? Andere Vorschläge sind sehr willkommen.“*

   ![Schritt 5: Live-Anfragen](../../../../../../translated_images/de/step5-live-queries.49db3e4a50bea273.webp)

   Der Agent wird mit relevanten Dokumentationslinks und Zusammenfassungen antworten, die Sie dann direkt in Ihre Markdown-Dateien einfügen oder als Referenzen in Ihrem Code verwenden können.
   
### Beispielanfragen

Hier sind einige Beispielanfragen, die Sie ausprobieren können. Diese Anfragen zeigen, wie der MCP-Server und Copilot zusammenarbeiten können, um sofortige, kontextbezogene Dokumentation und Referenzen anzubieten, ohne VS Code zu verlassen:

- „Zeige mir, wie man Azure Functions-Triggers verwendet.“
- „Füge einen Link zur offiziellen Dokumentation von Azure Key Vault ein.“
- „Was sind die Best Practices für die Sicherung von Azure-Ressourcen?“
- „Finde eine Schnellstartanleitung für Azure AI-Services.“

Diese Anfragen verdeutlichen, wie MCP-Server und Copilot zusammenarbeiten, um sofortige, kontextabhängige Dokumentationen und Referenzen anzubieten, ohne VS Code zu verlassen.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->