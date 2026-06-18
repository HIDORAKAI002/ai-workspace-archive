# Lernplan-Generator mit Chainlit & Microsoft Learn Docs MCP

## Voraussetzungen

- Python 3.8 oder höher
- pip (Python-Paketmanager)
- Internetzugang zur Verbindung mit dem Microsoft Learn Docs MCP-Server

## Installation

1. Klonen Sie dieses Repository oder laden Sie die Projektdateien herunter.
2. Installieren Sie die erforderlichen Abhängigkeiten:

   ```bash
   pip install -r requirements.txt
   ```

## Verwendung

### Szenario 1: Einfache Abfrage an Docs MCP
Ein Befehlszeilen-Client, der eine Verbindung zum Docs MCP-Server herstellt, eine Abfrage sendet und das Ergebnis ausgibt.

1. Führen Sie das Skript aus:
   ```bash
   python scenario1.py
   ```
2. Geben Sie am Prompt Ihre Frage zur Dokumentation ein.

### Szenario 2: Lernplan-Generator (Chainlit Web-App)
Eine webbasierte Oberfläche (mit Chainlit), die es Benutzern ermöglicht, einen personalisierten, wochenweisen Lernplan für ein beliebiges technisches Thema zu erstellen.

1. Starten Sie die Chainlit-App:
   ```bash
   chainlit run scenario2.py
   ```
2. Öffnen Sie die im Terminal angegebene lokale URL (z. B. http://localhost:8000) in Ihrem Browser.
3. Geben Sie im Chatfenster Ihr Lernthema und die Anzahl der Wochen ein, die Sie lernen möchten (z. B. „AI-900 Zertifizierung, 8 Wochen“).
4. Die App antwortet mit einem wochenweisen Lernplan, einschließlich Links zu relevanten Microsoft Learn-Dokumentationen.

**Erforderliche Umgebungsvariablen:**

Um Szenario 2 (die Chainlit-Web-App mit Azure OpenAI) zu nutzen, müssen Sie die folgenden Umgebungsvariablen in einer `.env`-Datei im `python`-Verzeichnis setzen:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Füllen Sie diese Werte mit Ihren Azure OpenAI-Ressourcendetails aus, bevor Sie die App starten.

> [!TIP]
> Sie können Ihre eigenen Modelle ganz einfach mit [Microsoft Foundry](https://ai.azure.com/) bereitstellen.

### Szenario 3: Docs im Editor mit MCP-Server in VS Code

Anstatt im Browser-Tab zur Dokumentation zu wechseln, können Sie Microsoft Learn Docs direkt in Ihren VS Code integrieren – über den MCP-Server. So können Sie:
- Dokumentation in VS Code suchen und lesen, ohne Ihre Arbeitsumgebung zu verlassen.
- Dokumentationsreferenzen finden und Links direkt in Ihre README- oder Kursdateien einfügen.
- GitHub Copilot und MCP zusammen verwenden für einen nahtlosen, KI-gestützten Dokumentations-Workflow.

**Beispielanwendungen:**
- Schnell Referenzlinks in eine README einfügen, während Sie eine Kurs- oder Projektdokumentation schreiben.
- Copilot zum Generieren von Code nutzen und MCP, um relevante Dokumentation sofort zu finden und zu zitieren.
- Konzentriert im Editor bleiben und Produktivität steigern.

> [!IMPORTANT]
> Stellen Sie sicher, dass Sie eine gültige [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) Konfiguration in Ihrem Workspace haben (Ort ist `.vscode/mcp.json`).

## Warum Chainlit für Szenario 2?

Chainlit ist ein modernes Open-Source-Framework zur Erstellung von konversationellen Webanwendungen. Es erleichtert die Erstellung von chatbasierten Benutzeroberflächen, die mit Backend-Diensten wie dem Microsoft Learn Docs MCP-Server verbunden sind. Dieses Projekt nutzt Chainlit, um eine einfache, interaktive Möglichkeit zur Erstellung personalisierter Lernpläne in Echtzeit zu bieten. Mit Chainlit können Sie schnell chatbasierte Tools erstellen und bereitstellen, die Produktivität und Lernen verbessern.

## Was das bewirkt

Diese App ermöglicht es Benutzern, einen personalisierten Lernplan zu erstellen, indem sie einfach ein Thema und eine Dauer eingeben. Die App wertet Ihre Eingabe aus, fragt den Microsoft Learn Docs MCP-Server nach relevantem Inhalt ab und organisiert die Ergebnisse in einem strukturierten, wochenweisen Plan. Die Empfehlungen jeder Woche werden im Chat angezeigt, sodass Sie leicht folgen und Ihren Fortschritt verfolgen können. Die Integration stellt sicher, dass Sie stets die neuesten und relevantesten Lernressourcen erhalten.

## Beispielabfragen

Probieren Sie diese Abfragen im Chatfenster aus, um zu sehen, wie die App reagiert:

- `AI-900 certification, 8 weeks`
- `Learn Azure Functions, 4 weeks`
- `Azure DevOps, 6 weeks`
- `Data engineering on Azure, 10 weeks`
- `Microsoft security fundamentals, 5 weeks`
- `Power Platform, 7 weeks`
- `Azure AI services, 12 weeks`
- `Cloud architecture, 9 weeks`

Diese Beispiele zeigen die Flexibilität der App für verschiedene Lernziele und Zeitrahmen.

## Referenzen

- [Chainlit Dokumentation](https://docs.chainlit.io/)
- [MCP Dokumentation](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->