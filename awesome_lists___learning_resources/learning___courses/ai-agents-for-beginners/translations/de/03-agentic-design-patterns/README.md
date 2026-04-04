[![Wie man gute KI-Agenten entwirft](../../../translated_images/de/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Klicken Sie auf das Bild oben, um das Video dieser Lektion anzusehen)_
# Designprinzipien für agentische KI

## Einführung

Es gibt viele Möglichkeiten, über den Aufbau agentischer KI-Systeme nachzudenken. Da Mehrdeutigkeit ein Merkmal und kein Fehler im Design Generativer KI ist, ist es manchmal schwierig für Ingenieure, überhaupt zu wissen, wo sie anfangen sollen. Wir haben eine Reihe von menschzentrierten UX-Designprinzipien erstellt, um Entwicklern zu ermöglichen, kundenzentrierte agentische Systeme zu bauen, die ihre geschäftlichen Anforderungen lösen. Diese Designprinzipien sind keine vorschreibende Architektur, sondern vielmehr ein Ausgangspunkt für Teams, die Agent-Erlebnisse definieren und entwickeln.

Im Allgemeinen sollten Agenten:

- menschliche Fähigkeiten erweitern und skalieren (Brainstorming, Problemlösung, Automatisierung usw.)
- Wissenslücken schließen (mich in Wissensdomänen auf den neuesten Stand bringen, Übersetzung usw.)
- Zusammenarbeit erleichtern und in der Weise unterstützen, wie wir als Einzelne bevorzugt mit anderen arbeiten
- uns zu besseren Versionen unserer selbst machen (z. B. Lebenscoach/Aufgabenleiter, uns helfen, emotionale Regulation und Achtsamkeitsfähigkeiten zu erlernen, Resilienz aufzubauen usw.)

## Diese Lektion behandelt

- Was die Agentischen Designprinzipien sind
- Welche Richtlinien bei der Implementierung dieser Designprinzipien zu befolgen sind
- Einige Beispiele für die Verwendung der Designprinzipien

## Lernziele

Nach Abschluss dieser Lektion sind Sie in der Lage:

1. Zu erklären, was die Agentischen Designprinzipien sind
2. Die Richtlinien für die Verwendung der Agentischen Designprinzipien zu erklären
3. Zu verstehen, wie man einen Agenten unter Verwendung der Agentischen Designprinzipien erstellt

## Die Agentischen Designprinzipien

![Agentische Designprinzipien](../../../translated_images/de/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Umgebung)

Dies ist die Umgebung, in der der Agent operiert. Diese Prinzipien informieren darüber, wie wir Agenten für den Einsatz in physischen und digitalen Welten entwerfen.

- **Verbinden, nicht verdrängen** – helfen, Menschen mit anderen Menschen, Ereignissen und handlungsrelevantem Wissen zu verbinden, um Zusammenarbeit und Verbindung zu ermöglichen.
- Agenten helfen, Ereignisse, Wissen und Menschen zu verbinden.
- Agenten bringen Menschen näher zusammen. Sie sind nicht dazu gedacht, Menschen zu ersetzen oder herabzusetzen.
- **Leicht zugänglich, aber gelegentlich unsichtbar** – der Agent agiert weitgehend im Hintergrund und lenkt uns nur, wenn es relevant und angemessen ist.
  - Der Agent ist für autorisierte Benutzer auf jedem Gerät oder jeder Plattform leicht auffindbar und zugänglich.
  - Der Agent unterstützt multimodale Eingaben und Ausgaben (Ton, Sprache, Text usw.).
  - Der Agent kann nahtlos zwischen Vorder- und Hintergrund wechseln; zwischen proaktiv und reaktiv, abhängig von seiner Wahrnehmung der Bedürfnisse des Nutzers.
  - Der Agent kann unsichtbar im Hintergrund arbeiten, doch seine Hintergrundprozesse und die Zusammenarbeit mit anderen Agenten sind für den Nutzer transparent und steuerbar.

### Agent (Zeit)

Dies ist, wie der Agent über die Zeit operiert. Diese Prinzipien informieren darüber, wie wir Agenten gestalten, die über Vergangenheit, Gegenwart und Zukunft hinweg interagieren.

- **Vergangenheit**: Reflexion über die Geschichte, die sowohl Zustand als auch Kontext umfasst.
  - Der Agent liefert relevantere Ergebnisse auf Basis der Analyse umfassenderer historischer Daten, die über das einzelne Ereignis, Personen oder Zustände hinausgehen.
  - Der Agent zieht Verbindungen aus vergangenen Ereignissen und reflektiert aktiv Erinnerungen, um sich mit aktuellen Situationen auseinanderzusetzen.
- **Gegenwart**: Anstoßen mehr als Benachrichtigen.
  - Der Agent verkörpert einen umfassenden Ansatz zur Interaktion mit Menschen. Wenn ein Ereignis eintritt, geht der Agent über statische Benachrichtigungen oder andere statische Formalitäten hinaus. Der Agent kann Abläufe vereinfachen oder dynamisch Hinweise erzeugen, um die Aufmerksamkeit des Nutzers im richtigen Moment zu lenken.
  - Der Agent liefert Informationen basierend auf dem Kontext der Umgebung, sozialen und kulturellen Veränderungen und zugeschnitten auf die Absicht des Nutzers.
  - Die Interaktion mit dem Agenten kann schrittweise erfolgen und sich entwickelnd bzw. an Komplexität wachsend gestalten, um Nutzer langfristig zu befähigen.
- **Zukunft**: Anpassen und Weiterentwickeln.
  - Der Agent passt sich verschiedenen Geräten, Plattformen und Modalitäten an.
  - Der Agent passt sich dem Nutzerverhalten und den Barrierefreiheitsanforderungen an und ist frei anpassbar.
  - Der Agent wird durch kontinuierliche Nutzerinteraktion geformt und entwickelt sich weiter.

### Agent (Kern)

Dies sind die Schlüsselelemente im Kern des Agentendesigns.

- **Unsicherheit annehmen, aber Vertrauen aufbauen**.
  - Ein gewisses Maß an Unsicherheit beim Agenten ist zu erwarten. Unsicherheit ist ein Schlüsselelement im Agenten-Design.
  - Vertrauen und Transparenz sind grundlegende Schichten des Agentendesigns.
  - Menschen haben die Kontrolle darüber, wann der Agent ein/aus ist, und der Status des Agenten ist jederzeit klar sichtbar.

## Richtlinien zur Umsetzung dieser Prinzipien

Wenn Sie die oben genannten Designprinzipien verwenden, beachten Sie die folgenden Richtlinien:

1. **Transparenz**: Informieren Sie den Nutzer, dass KI beteiligt ist, wie sie funktioniert (einschließlich vergangener Aktionen) und wie man Feedback gibt und das System ändert.
2. **Kontrolle**: Ermöglichen Sie dem Nutzer, anzupassen, Präferenzen festzulegen und zu personalisieren und Kontrolle über das System und seine Eigenschaften zu haben (einschließlich der Möglichkeit, Daten zu löschen).
3. **Konsistenz**: Streben Sie konsistente, multimodale Erfahrungen über Geräte und Endpunkte hinweg an. Verwenden Sie nach Möglichkeit vertraute UI/UX-Elemente (z. B. Mikrofon-Symbol für Sprachinteraktion) und reduzieren Sie die kognitive Belastung der Kundinnen und Kunden so weit wie möglich (z. B. durch prägnante Antworten, visuelle Hilfen und 'Mehr erfahren'-Inhalte).

## Wie man einen Reiseagenten mit diesen Prinzipien und Richtlinien entwirft

Stellen Sie sich vor, Sie entwerfen einen Reiseagenten. So könnten Sie bei der Anwendung der Designprinzipien und Richtlinien vorgehen:

1. **Transparenz** – Lassen Sie den Nutzer wissen, dass der Reiseagent ein KI-gestützter Agent ist. Geben Sie einige grundlegende Anweisungen, wie man beginnt (z. B. eine „Hallo“-Nachricht, Beispielprompts). Dokumentieren Sie dies deutlich auf der Produktseite. Zeigen Sie die Liste der Prompts, die ein Nutzer in der Vergangenheit gestellt hat. Machen Sie deutlich, wie man Feedback gibt (Daumen hoch und runter, Schaltfläche 'Feedback senden' usw.). Legen Sie klar dar, ob der Agent Nutzungs- oder Themenbeschränkungen hat.
2. **Kontrolle** – Stellen Sie sicher, dass klar ist, wie der Nutzer den Agenten nach seiner Erstellung mit Dingen wie dem System Prompt ändern kann. Ermöglichen Sie dem Nutzer, festzulegen, wie ausführlich der Agent sein soll, welchen Schreibstil er verwendet und welche Einschränkungen bestehen, worüber der Agent nicht sprechen darf. Ermöglichen Sie dem Nutzer, alle zugehörigen Dateien oder Daten, Prompts und vergangenen Unterhaltungen einzusehen und zu löschen.
3. **Konsistenz** – Stellen Sie sicher, dass die Symbole für Share Prompt, Datei oder Foto hinzufügen und jemanden oder etwas taggen standardisiert und leicht erkennbar sind. Verwenden Sie das Büroklammer-Symbol, um Datei-Upload/Freigabe mit dem Agenten anzuzeigen, und ein Bildsymbol, um Grafik-Uploads zu kennzeichnen.

## Beispielcode

- Python: [Agenten-Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agenten-Framework](./code_samples/03-dotnet-agent-framework.md)


## Haben Sie weitere Fragen zu agentischen KI-Designmustern?

Treten Sie dem [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) bei, um andere Lernende zu treffen, an Sprechstunden teilzunehmen und Antworten auf Ihre Fragen zu KI-Agenten zu erhalten.

## Weitere Ressourcen

- <a href="https://openai.com" target="_blank">Praktiken zur Steuerung agentischer KI‑Systeme | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Das HAX Toolkit‑Projekt - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Toolbox für verantwortungsvolle KI</a>

## Vorherige Lektion

[Agentische Frameworks erkunden](../02-explore-agentic-frameworks/README.md)

## Nächste Lektion

[Designmuster für Tool-Nutzung](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ausgangssprache ist als maßgebliche Quelle zu betrachten. Für kritische Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir haften nicht für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->