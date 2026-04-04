# Azure AI Agent Service Entwicklung

In dieser Übung verwenden Sie die Azure AI Agent Dienst-Tools im [Microsoft Foundry-Portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst), um einen Agenten für die Flugbuchung zu erstellen. Der Agent kann mit Benutzern interagieren und Informationen zu Flügen bereitstellen.

## Voraussetzungen

Um diese Übung abzuschließen, benötigen Sie Folgendes:
1. Ein Azure-Konto mit einem aktiven Abonnement. [Erstellen Sie ein kostenloses Konto](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Sie benötigen Berechtigungen, um einen Microsoft Foundry-Hub zu erstellen oder einen erstellen zu lassen.
    - Wenn Ihre Rolle Contributor oder Owner ist, können Sie die Schritte in diesem Tutorial befolgen.

## Erstellen eines Microsoft Foundry-Hubs

> **Hinweis:** Microsoft Foundry war früher als Azure AI Studio bekannt.

1. Befolgen Sie diese Richtlinien aus dem [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) Blogbeitrag zum Erstellen eines Microsoft Foundry-Hubs.
2. Wenn Ihr Projekt erstellt wurde, schließen Sie alle angezeigten Tipps und überprüfen Sie die Projektseite im Microsoft Foundry-Portal, die etwa wie das folgende Bild aussehen sollte:

    ![Microsoft Foundry Project](../../../translated_images/de/azure-ai-foundry.88d0c35298348c2f.webp)

## Modell bereitstellen

1. Wählen Sie im linken Bereich für Ihr Projekt im Abschnitt **My assets** die Seite **Models + endpoints** aus.
2. Wählen Sie auf der Seite **Models + endpoints** im Tab **Model deployments** im Menü **+ Deploy model** die Option **Deploy base model** aus.
3. Suchen Sie in der Liste nach dem Modell `gpt-4o-mini` und wählen Sie es dann aus und bestätigen Sie es.

    > **Hinweis**: Die Reduzierung des TPM hilft, eine Überschreitung des in Ihrem Abonnement verfügbaren Kontingents zu vermeiden.

    ![Model Deployed](../../../translated_images/de/model-deployment.3749c53fb81e18fd.webp)

## Erstellen eines Agenten

Nachdem Sie ein Modell bereitgestellt haben, können Sie einen Agenten erstellen. Ein Agent ist ein konversationelles KI-Modell, das verwendet werden kann, um mit Benutzern zu interagieren.

1. Wählen Sie im linken Bereich für Ihr Projekt im Abschnitt **Build & Customize** die Seite **Agents** aus.
2. Klicken Sie auf **+ Create agent**, um einen neuen Agenten zu erstellen. Im Dialogfeld **Agent Setup**:
    - Geben Sie einen Namen für den Agenten ein, z. B. `FlightAgent`.
    - Stellen Sie sicher, dass die zuvor erstellte Modellbereitstellung `gpt-4o-mini` ausgewählt ist.
    - Legen Sie die **Instructions** gemäß den Anweisungen fest, denen der Agent folgen soll. Hier ein Beispiel:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> Für eine detaillierte Eingabeaufforderung können Sie [dieses Repository](https://github.com/ShivamGoyal03/RoamMind) für weitere Informationen einsehen.
    
> Außerdem können Sie **Knowledge Base** und **Actions** hinzufügen, um die Fähigkeiten des Agenten zu erweitern, um mehr Informationen bereitzustellen und automatisierte Aufgaben basierend auf Benutzeranfragen auszuführen. Für diese Übung können Sie diese Schritte überspringen.
    
![Agent Setup](../../../translated_images/de/agent-setup.9bbb8755bf5df672.webp)

3. Um einen neuen Multi-AI-Agenten zu erstellen, klicken Sie einfach auf **New Agent**. Der neu erstellte Agent wird dann auf der Seite Agents angezeigt.


## Testen des Agenten

Nachdem Sie den Agenten erstellt haben, können Sie ihn testen, um zu sehen, wie er auf Benutzeranfragen im Microsoft Foundry-Portal Playground reagiert.

1. Wählen Sie oben im Bereich **Setup** für Ihren Agenten **Try in playground** aus.
2. Im Bereich **Playground** können Sie mit dem Agenten interagieren, indem Sie Anfragen im Chatfenster eingeben. Zum Beispiel können Sie den Agenten bitten, Flüge von Seattle nach New York am 28. zu suchen.

    > **Hinweis**: Der Agent liefert möglicherweise keine genauen Antworten, da in dieser Übung keine Echtzeitdaten verwendet werden. Der Zweck ist es, die Fähigkeit des Agenten zu testen, Benutzeranfragen basierend auf den bereitgestellten Anweisungen zu verstehen und zu beantworten.

    ![Agent Playground](../../../translated_images/de/agent-playground.dc146586de715010.webp)

3. Nach dem Testen des Agenten können Sie ihn weiter anpassen, indem Sie weitere Intents, Trainingsdaten und Aktionen hinzufügen, um seine Fähigkeiten zu verbessern.

## Bereinigen von Ressourcen

Wenn Sie mit dem Testen des Agenten fertig sind, können Sie ihn löschen, um zusätzliche Kosten zu vermeiden.
1. Öffnen Sie das [Azure-Portal](https://portal.azure.com) und zeigen Sie den Inhalt der Ressourcengruppe an, in der Sie die für diese Übung verwendeten Hub-Ressourcen bereitgestellt haben.
2. Wählen Sie in der Symbolleiste die Option **Resourcegruppe löschen** aus.
3. Geben Sie den Namen der Ressourcengruppe ein und bestätigen Sie, dass Sie sie löschen möchten.

## Ressourcen

- [Microsoft Foundry Dokumentation](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry Portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Erste Schritte mit Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Grundlagen von KI-Agenten auf Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir um Genauigkeit bemüht sind, können automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten. Das Originaldokument in seiner ursprünglichen Sprache gilt als maßgebliche Quelle. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->