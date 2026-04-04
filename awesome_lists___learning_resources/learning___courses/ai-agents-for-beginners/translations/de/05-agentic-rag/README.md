[![Agentic RAG](../../../translated_images/de/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Klicken Sie auf das obige Bild, um das Video zu dieser Lektion anzusehen)_

# Agentic RAG

Diese Lektion bietet einen umfassenden Überblick über Agentic Retrieval-Augmented Generation (Agentic RAG), ein aufkommendes KI-Paradigma, bei dem große Sprachmodelle (LLMs) autonom ihre nächsten Schritte planen, während sie Informationen aus externen Quellen abrufen. Im Gegensatz zu statischen Mustern aus Abruf und anschließendem Lesen beinhaltet Agentic RAG iterative Aufrufe an das LLM, die von Tool- oder Funktionsaufrufen und strukturierten Ausgaben durchsetzt sind. Das System bewertet Ergebnisse, verfeinert Abfragen, ruft bei Bedarf zusätzliche Tools auf und setzt diesen Zyklus fort, bis eine zufriedenstellende Lösung erreicht ist.

## Einführung

In dieser Lektion werden behandelt

- **Agentic RAG verstehen:** Erfahren Sie mehr über das aufkommende Paradigma in der KI, bei dem große Sprachmodelle (LLMs) autonom ihre nächsten Schritte planen, während sie Informationen aus externen Datenquellen abrufen.
- **Iterativen Maker-Checker-Stil erfassen:** Verstehen Sie die Schleife aus iterativen Aufrufen an das LLM, die von Tool- oder Funktionsaufrufen und strukturierten Ausgaben durchsetzt sind, die darauf ausgelegt sind, Korrektheit zu verbessern und fehlerhafte Anfragen zu bearbeiten.
- **Praktische Anwendungen erkunden:** Identifizieren Sie Szenarien, in denen Agentic RAG glänzt, wie beispielsweise Umgebungen mit Fokus auf Korrektheit, komplexe Datenbankinteraktionen und erweiterte Workflows.

## Lernziele

Nach Abschluss dieser Lektion wissen Sie, wie man/verstehen Sie:

- **Agentic RAG verstehen:** Erfahren Sie mehr über das aufkommende Paradigma in der KI, bei dem große Sprachmodelle (LLMs) autonom ihre nächsten Schritte planen, während sie Informationen aus externen Datenquellen abrufen.
- **Iterativen Maker-Checker-Stil:** Verstehen Sie das Konzept einer Schleife aus iterativen Aufrufen an das LLM, die von Tool- oder Funktionsaufrufen und strukturierten Ausgaben durchsetzt sind, um Korrektheit zu verbessern und fehlerhafte Abfragen zu handhaben.
- **Den Denkprozess übernehmen:** Verstehen Sie die Fähigkeit des Systems, seinen Denkprozess zu übernehmen und Entscheidungen darüber zu treffen, wie Probleme ohne vorgegebene Pfade angegangen werden.
- **Workflow:** Verstehen Sie, wie ein agentisches Modell eigenständig entscheidet, Markttrendberichte abzurufen, Wettbewerberdaten zu identifizieren, interne Verkaufskennzahlen zu korrelieren, Ergebnisse zu synthetisieren und die Strategie zu bewerten.
- **Iterative Schleifen, Tool-Integration und Gedächtnis:** Erfahren Sie mehr über das vom System genutzte Schleifeninteraktionsmuster, bei dem Zustand und Gedächtnis über die Schritte hinweg erhalten bleiben, um Wiederholungsschleifen zu vermeiden und fundierte Entscheidungen zu treffen.
- **Umgang mit Fehlerarten und Selbstkorrektur:** Erkunden Sie die robusten Selbstkorrekturmechanismen des Systems, einschließlich Iteration und erneuter Abfragen, Verwendung diagnostischer Tools und Rückgriff auf menschliche Aufsicht.
- **Grenzen der Agentur:** Verstehen Sie die Grenzen von Agentic RAG, mit Fokus auf domänenspezifische Autonomie, Infrastrukturbeschränkungen und Respekt vor Schutzvorrichtungen.
- **Praktische Anwendungsfälle und Nutzen:** Identifizieren Sie Szenarien, in denen Agentic RAG glänzt, wie beispielsweise Umgebungen mit Fokus auf Korrektheit, komplexe Datenbankinteraktionen und erweiterte Workflows.
- **Governance, Transparenz und Vertrauen:** Erfahren Sie mehr über die Bedeutung von Governance und Transparenz, einschließlich erklärbarer Entscheidungsfindung, Bias-Kontrolle und menschlicher Aufsicht.

## Was ist Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) ist ein aufkommendes KI-Paradigma, bei dem große Sprachmodelle (LLMs) autonom ihre nächsten Schritte planen, während sie Informationen aus externen Quellen abrufen. Im Gegensatz zu statischen Mustern aus Abruf und anschließendem Lesen beinhaltet Agentic RAG iterative Aufrufe an das LLM, die von Tool- oder Funktionsaufrufen und strukturierten Ausgaben durchsetzt sind. Das System bewertet Ergebnisse, verfeinert Abfragen, ruft bei Bedarf zusätzliche Tools auf und setzt diesen Zyklus fort, bis eine zufriedenstellende Lösung erreicht ist. Dieser iterative „Maker-Checker“-Stil verbessert die Korrektheit, bearbeitet fehlerhafte Abfragen und sorgt für qualitativ hochwertige Ergebnisse.

Das System übernimmt aktiv seinen Denkprozess, schreibt fehlgeschlagene Abfragen um, wählt unterschiedliche Abrufmethoden, integriert mehrere Tools – wie Vektorsuche in Azure AI Search, SQL-Datenbanken oder benutzerdefinierte APIs – bevor es seine Antwort finalisiert. Die herausragende Eigenschaft eines agentischen Systems ist seine Fähigkeit, seinen Denkprozess zu übernehmen. Traditionelle RAG-Implementierungen beruhen auf vordefinierten Pfaden, doch ein agentisches System bestimmt die Abfolge der Schritte autonom basierend auf der Qualität der gefundenen Informationen.

## Definition von Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) ist ein aufkommendes Paradigma in der KI-Entwicklung, bei dem LLMs nicht nur Informationen aus externen Datenquellen abrufen, sondern auch autonom ihre nächsten Schritte planen. Im Gegensatz zu statischen Abruf- und Lese-Mustern oder sorgfältig gestalteten Prompt-Sequenzen beinhaltet Agentic RAG eine Schleife aus iterativen Aufrufen an das LLM, die von Tool- oder Funktionsaufrufen und strukturierten Ausgaben unterbrochen werden. Bei jedem Schritt bewertet das System die erhaltenen Ergebnisse, entscheidet, ob es seine Abfragen verfeinern soll, ruft bei Bedarf zusätzliche Tools auf und setzt diesen Zyklus fort, bis eine zufriedenstellende Lösung erreicht ist.

Dieser iterative „Maker-Checker“-Betriebsstil ist darauf ausgelegt, Korrektheit zu verbessern, mit fehlerhaften Anfragen an strukturierte Datenbanken (z. B. NL2SQL) umzugehen und ausgewogene, hochwertige Ergebnisse sicherzustellen. Anstatt sich ausschließlich auf sorgfältig ausgefeilte Prompt-Ketten zu verlassen, übernimmt das System aktiv seinen Denkprozess. Es kann fehlgeschlagene Abfragen umschreiben, unterschiedliche Abrufmethoden auswählen und mehrere Tools integrieren – wie Vektorsuche in Azure AI Search, SQL-Datenbanken oder benutzerdefinierte APIs – bevor es seine Antwort finalisiert. Dies beseitigt die Notwendigkeit für übermäßig komplexe Orchestrierungsframeworks. Stattdessen kann eine relativ einfache Schleife „LLM-Aufruf → Tool-Nutzung → LLM-Aufruf → …“ hochentwickelte und gut fundierte Ausgaben erzeugen.

![Agentic RAG Core Loop](../../../translated_images/de/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Den Denkprozess übernehmen

Die herausragende Eigenschaft, die ein System „agentisch“ macht, ist seine Fähigkeit, seinen Denkprozess zu übernehmen. Traditionelle RAG-Implementierungen sind häufig darauf angewiesen, dass Menschen einen Pfad für das Modell vorgeben: eine Chain-of-Thought, die beschreibt, was wann abgerufen werden soll. 
Ein wirklich agentisches System entscheidet jedoch intern, wie es das Problem angehen will. Es führt nicht einfach ein Skript aus; es bestimmt autonom die Reihenfolge der Schritte basierend auf der Qualität der Informationen, die es findet.
Zum Beispiel, wenn es gebeten wird, eine Produktlancierungsstrategie zu erstellen, verlässt es sich nicht ausschließlich auf einen Prompt, der den gesamten Forschungs- und Entscheidungsworkflow vorgibt. Stattdessen entscheidet das agentische Modell eigenständig:

1. Aktuelle Markttrendberichte mit Bing Web Grounding abzurufen
2. Relevante Wettbewerberdaten mit Azure AI Search zu identifizieren
3. Historische interne Verkaufskennzahlen mit Azure SQL Database zu korrelieren
4. Die Ergebnisse zu einer kohärenten Strategie zu synthetisieren, orchestriert über Azure OpenAI Service
5. Die Strategie auf Lücken oder Inkonsistenzen zu evaluieren und bei Bedarf eine weitere Abrufrunde einzuleiten
Alle diese Schritte – Abfragen verfeinern, Quellen wählen, iterieren bis es „zufrieden“ mit der Antwort ist – werden vom Modell entschieden und nicht von einem Menschen vorab festgelegt.

## Iterative Schleifen, Tool-Integration und Gedächtnis

![Tool Integration Architecture](../../../translated_images/de/tool-integration.0f569710b5c17c10.webp)

Ein agentisches System nutzt ein Schleifeninteraktionsmuster:

- **Erstaufruf:** Das Ziel des Nutzers (aka. Nutzer-Prompt) wird dem LLM präsentiert.
- **Tool-Aufruf:** Erkennt das Modell fehlende Informationen oder mehrdeutige Anweisungen, wählt es ein Tool oder eine Abrufmethode – wie eine Vektordatenbankabfrage (z. B. Azure AI Search Hybrid-Suche über private Daten) oder einen strukturierten SQL-Aufruf –, um mehr Kontext zu sammeln.
- **Bewertung & Verfeinerung:** Nach Prüfung der zurückgegebenen Daten entscheidet das Modell, ob die Information ausreicht. Wenn nicht, verfeinert es die Abfrage, probiert ein anderes Tool oder passt seinen Ansatz an.
- **Wiederholen bis Zufriedenheit:** Dieser Zyklus wiederholt sich, bis das Modell bestimmt, dass es genügend Klarheit und Belege hat, um eine abschließende, gut begründete Antwort zu liefern.
- **Gedächtnis & Zustand:** Da das System Zustand und Gedächtnis über die Schritte hinweg aufrechterhält, kann es frühere Versuche und deren Ergebnisse erinnern, Wiederholungsschleifen vermeiden und fundiertere Entscheidungen treffen.

Mit der Zeit entsteht so ein Gefühl eines sich entwickelnden Verständnisses, das dem Modell erlaubt, komplexe, mehrstufige Aufgaben zu navigieren, ohne dass ein Mensch ständig eingreifen oder den Prompt neu gestalten muss.

## Umgang mit Fehlerarten und Selbstkorrektur

Die Autonomie von Agentic RAG umfasst auch robuste Selbstkorrekturmechanismen. Wenn das System Sackgassen erreicht – wie das Abrufen irrelevanter Dokumente oder das Auftreten fehlerhafter Abfragen – kann es:

- **Iterieren und neu abfragen:** Statt niedrigwertige Antworten zurückzugeben, versucht das Modell neue Suchstrategien, schreibt Datenbankabfragen um oder betrachtet alternative Datensätze.
- **Diagnosetools verwenden:** Das System kann zusätzliche Funktionen aufrufen, die ihm helfen, seine Denkprozesse zu debuggen oder die Korrektheit der abgerufenen Daten zu bestätigen. Tools wie Azure AI Tracing sind wichtig, um eine robuste Beobachtbarkeit und Überwachung zu ermöglichen.
- **Auf menschliche Aufsicht zurückgreifen:** In risikoreichen oder wiederholt fehlschlagenden Szenarien kann das Modell Unsicherheiten signalisieren und menschliche Anleitung anfordern. Sobald der Mensch korrigierendes Feedback gibt, kann das Modell diese Lektion künftig berücksichtigen.

Dieser iterative und dynamische Ansatz ermöglicht es dem Modell, sich kontinuierlich zu verbessern, sodass es nicht nur ein Einmal-System ist, sondern aus seinen Fehlern während einer Sitzung lernt.

![Self Correction Mechanism](../../../translated_images/de/self-correction.da87f3783b7f174b.webp)

## Grenzen der Agentur

Trotz seiner Autonomie innerhalb einer Aufgabe ist Agentic RAG nicht mit Artificial General Intelligence vergleichbar. Seine „agentischen“ Fähigkeiten beschränken sich auf die von menschlichen Entwicklern bereitgestellten Tools, Datenquellen und Richtlinien. Es kann keine eigenen Tools erfinden oder die gesetzten Domänengrenzen überschreiten. Stattdessen ist es darin hervorragend, die zur Verfügung stehenden Ressourcen dynamisch zu orchestrieren.
Wichtige Unterschiede zu fortgeschritteneren KI-Formen sind:

1. **Domänenspezifische Autonomie:** Agentic RAG-Systeme konzentrieren sich darauf, nutzergedefinierte Ziele innerhalb einer bekannten Domäne zu erreichen, und verwenden Strategien wie Abfrageumformulierung oder Tool-Auswahl zur Ergebnisverbesserung.
2. **Infrastrukturabhängig:** Die Fähigkeiten des Systems hängen von den von Entwicklern integrierten Tools und Daten ab. Ohne menschliches Eingreifen kann es diese Grenzen nicht überschreiten.
3. **Respekt vor Schutzvorrichtungen:** Ethische Leitlinien, Compliance-Regeln und Unternehmensrichtlinien bleiben sehr wichtig. Die Freiheit des Agenten ist immer durch Sicherheitsmaßnahmen und Kontrollmechanismen beschränkt (hoffentlich).

## Praktische Anwendungsfälle und Nutzen

Agentic RAG glänzt in Szenarien, die iterative Verfeinerung und Präzision erfordern:

1. **Umgebungen mit Fokus auf Korrektheit:** Bei Compliance-Prüfungen, regulatorischen Analysen oder juristischer Recherche kann das agentische Modell Fakten wiederholt überprüfen, mehrere Quellen konsultieren und Abfragen umschreiben, bis es eine gründlich geprüfte Antwort liefert.
2. **Komplexe Datenbankinteraktionen:** Wenn mit strukturierten Daten umgegangen wird, bei denen Abfragen oft fehlschlagen oder angepasst werden müssen, kann das System seine Abfragen eigenständig mit Azure SQL oder Microsoft Fabric OneLake verfeinern, um sicherzustellen, dass der endgültige Abruf der Intention des Nutzers entspricht.
3. **Erweiterte Workflows:** Längere Sitzungen können sich weiterentwickeln, wenn neue Informationen auftauchen. Agentic RAG kann fortlaufend neue Daten einbeziehen und seine Strategien anpassen, wenn es mehr über den Problemraum erfährt.

## Governance, Transparenz und Vertrauen

Da diese Systeme in ihrer Entscheidungsfindung immer autonomer werden, sind Governance und Transparenz entscheidend:

- **Erklärbare Entscheidungsfindung:** Das Modell kann eine Audit-Spur der getätigten Abfragen, der konsultierten Quellen und der getroffenen Denkprozesse zur Erreichung der Schlussfolgerung bereitstellen. Tools wie Azure AI Content Safety und Azure AI Tracing / GenAIOps helfen, Transparenz zu wahren und Risiken zu minimieren.
- **Bias-Kontrolle und ausgewogener Abruf:** Entwickler können die Abrufstrategien anpassen, um ausgewogene und repräsentative Datenquellen zu berücksichtigen, und Ausgaben regelmäßig auditieren, um Vorurteile oder verzerrte Muster mit benutzerdefinierten Modellen für fortgeschrittene Data-Science-Organisationen mit Azure Machine Learning zu erkennen.
- **Menschliche Aufsicht und Compliance:** Bei sensiblen Aufgaben bleibt die menschliche Überprüfung unerlässlich. Agentic RAG ersetzt nicht das menschliche Urteil bei wichtigen Entscheidungen – es ergänzt es, indem es gründlich geprüfte Optionen liefert.

Werkzeuge, die eine klare Aufzeichnung der Aktionen bieten, sind essenziell. Ohne diese ist das Debuggen eines mehrstufigen Prozesses sehr schwierig. Siehe folgendes Beispiel von Literal AI (Firma hinter Chainlit) für einen Agentenlauf:

![AgentRunExample](../../../translated_images/de/AgentRunExample.471a94bc40cbdc0c.webp)

## Fazit

Agentic RAG stellt eine natürliche Weiterentwicklung dar, wie KI-Systeme komplexe, datenintensive Aufgaben bewältigen. Durch die Übernahme eines Schleifeninteraktionsmusters, die autonome Auswahl von Werkzeugen und die Verfeinerung von Abfragen bis zur Erzielung eines hochwertigen Ergebnisses geht das System über statisches Prompt-Following hinaus und wird zu einem anpassungsfähigeren, kontextbewussteren Entscheidungsträger. Trotz der durch menschlich definierte Infrastrukturen und ethische Richtlinien gesetzten Grenzen ermöglichen diese agentischen Fähigkeiten reichhaltigere, dynamischere und letztlich nützlichere KI-Interaktionen für Unternehmen und Endanwender.

### Haben Sie weitere Fragen zu Agentic RAG?

Treten Sie dem [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) bei, um andere Lernende zu treffen, an Sprechstunden teilzunehmen und Ihre Fragen zu AI Agents beantwortet zu bekommen.

## Zusätzliche Ressourcen
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementierung von Retrieval Augmented Generation (RAG) mit dem Azure OpenAI Service: Erfahren Sie, wie Sie Ihre eigenen Daten mit dem Azure OpenAI Service verwenden können. Dieses Microsoft Learn-Modul bietet eine umfassende Anleitung zur Implementierung von RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Bewertung generativer KI-Anwendungen mit Microsoft Foundry: Dieser Artikel behandelt die Bewertung und den Vergleich von Modellen anhand öffentlich verfügbarer Datensätze, einschließlich agentischer KI-Anwendungen und RAG-Architekturen</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Was ist Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Ein vollständiger Leitfaden zur agentenbasierten Retrieval Augmented Generation – Neuigkeiten aus Generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: Beschleunigen Sie Ihr RAG mit Anfragen-Umformulierung und Selbstabfrage! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Hinzufügen agentenbasierter Schichten zu RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Die Zukunft der Wissensassistenten: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Wie man agentenbasierte RAG-Systeme baut</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Verwendung des Microsoft Foundry Agent Service zur Skalierung Ihrer KI-Agenten</a>

### Wissenschaftliche Artikel

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iterative Verfeinerung mit Selbstfeedback</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Sprachagenten mit verbalem Reinforcement Learning</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Große Sprachmodelle können sich durch tool-interaktive Kritik selbst korrigieren</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Eine Übersicht zu Agentic RAG</a>

## Vorherige Lektion

[Tool Use Design Pattern](../04-tool-use/README.md)

## Nächste Lektion

[Vertrauenswürdige KI-Agenten bauen](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, möchten wir darauf hinweisen, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Originalsprache gilt als maßgebliche Quelle. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die sich aus der Verwendung dieser Übersetzung ergeben.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->