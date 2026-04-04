[![Hoe je goede AI-agents ontwerpt](../../../translated_images/nl/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Klik op de afbeelding hierboven om de video van deze les te bekijken)_
# AI Agentische Ontwerpprincipes

## Inleiding

Er zijn veel manieren om na te denken over het bouwen van AI-agentische systemen. Aangezien ambiguïteit een kenmerk en geen fout is in Generative AI-ontwerp, is het soms moeilijk voor engineers om te bepalen waar ze überhaupt moeten beginnen. We hebben een reeks mensgerichte UX-ontwerpprincipes gemaakt om ontwikkelaars in staat te stellen klantgerichte agentische systemen te bouwen die zakelijke behoeften oplossen. Deze ontwerpprincipes zijn geen voorschrijvende architectuur maar eerder een beginpunt voor teams die agent-ervaringen definiëren en uitbouwen.

Over het algemeen zouden agents moeten:

- Menselijke capaciteiten verbreden en opschalen (brainstormen, probleemoplossing, automatisering, enz.)
- Kennisleemtes opvullen (breng me op snelheid in kennisdomeinen, vertalingen, enz.)
- Samenwerking faciliteren en ondersteunen op de manieren waarop wij als individuen het liefst met anderen samenwerken
- Ons betere versies van onszelf maken (bijv. life coach/taakmeester, ons helpen emotionele regulatie en mindfulnessvaardigheden te leren, veerkracht opbouwen, enz.)

## Deze les behandelt

- Wat de Agentische Ontwerpprincipes zijn
- Welke richtlijnen te volgen bij het implementeren van deze ontwerpprincipes
- Wat voorbeelden zijn van het gebruik van de ontwerpprincipes

## Leerdoelen

Na het voltooien van deze les kun je:

1. Uitleggen wat de Agentische Ontwerpprincipes zijn
2. De richtlijnen voor het gebruik van de Agentische Ontwerpprincipes uitleggen
3. Begrijpen hoe je een agent bouwt met behulp van de Agentische Ontwerpprincipes

## De Agentische Ontwerpprincipes

![Agentische Ontwerpprincipes](../../../translated_images/nl/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Space)

Dit is de omgeving waarin de agent opereert. Deze principes geven richting aan hoe we agents ontwerpen voor interactie in fysieke en digitale werelden.

- **Verbinding maken, niet samenvoegen** – help mensen verbinden met andere mensen, gebeurtenissen en bruikbare kennis om samenwerking en verbinding mogelijk te maken.
- Agents helpen gebeurtenissen, kennis en mensen met elkaar te verbinden.
- Agents brengen mensen dichter bij elkaar. Ze zijn niet bedoeld om mensen te vervangen of te kleineren.
- **Gemakkelijk toegankelijk maar af en toe onzichtbaar** – de agent werkt grotendeels op de achtergrond en stimuleert ons alleen wanneer dat relevant en gepast is.
  - De agent is gemakkelijk te vinden en toegankelijk voor geautoriseerde gebruikers op elk apparaat of platform.
  - De agent ondersteunt multimodale invoer en uitvoer (geluid, spraak, tekst, enz.).
  - De agent kan naadloos schakelen tussen voorgrond en achtergrond; tussen proactief en reactief, afhankelijk van de waarneming van de behoeften van de gebruiker.
  - De agent kan in onzichtbare vorm werken, maar het achtergrondproces en de samenwerking met andere agents zijn transparant en bestuurbaar door de gebruiker.

### Agent (Time)

Dit is hoe de agent over de tijd heen opereert. Deze principes informeren hoe we agents ontwerpen die interacteren met verleden, heden en toekomst.

- **Verleden**: Reflecteren op geschiedenis die zowel toestand als context omvat.
  - De agent levert relevantere resultaten op basis van analyse van rijkere historische gegevens, verdergaand dan alleen het evenement, de betrokken personen of toestanden.
  - De agent legt verbindingen met gebeurtenissen uit het verleden en reflecteert actief op geheugen om met actuele situaties om te gaan.
- **Nu**: Aansporen meer dan alleen informeren.
  - De agent belichaamt een allesomvattende benadering van interactie met mensen. Wanneer er een gebeurtenis plaatsvindt, gaat de agent verder dan een statische melding of andere formele statische vorm. De agent kan processen vereenvoudigen of dynamisch cues genereren om de aandacht van de gebruiker op het juiste moment te richten.
  - De agent levert informatie op basis van de contextuele omgeving, sociale en culturele veranderingen en afgestemd op de intentie van de gebruiker.
  - De interactie met de agent kan geleidelijk zijn, evoluerend/toenemend in complexiteit om gebruikers op de lange termijn te versterken.
- **Toekomst**: Aanpassen en evolueren.
  - De agent past zich aan verschillende apparaten, platforms en modaliteiten aan.
  - De agent past zich aan het gebruikersgedrag en toegankelijkheidsbehoeften aan en is vrij aanpasbaar.
  - De agent wordt gevormd en evolueert door voortdurende gebruikersinteractie.

### Agent (Core)

Dit zijn de belangrijkste elementen in de kern van het ontwerp van een agent.

- **Omarm onzekerheid maar bouw vertrouwen op**.
  - Een bepaald niveau van onzekerheid van de agent wordt verwacht. Onzekerheid is een sleutelelement in het ontwerp van agents.
  - Vertrouwen en transparantie zijn fundamentele lagen van agentontwerp.
  - Mensen hebben controle over wanneer de agent aan/uit staat en de status van de agent is te allen tijde duidelijk zichtbaar.

## De richtlijnen om deze principes te implementeren

Wanneer je de vorige ontwerpprincipes gebruikt, gebruik de volgende richtlijnen:

1. **Transparantie**: Informeer de gebruiker dat AI betrokken is, hoe het functioneert (inclusief eerdere acties), en hoe feedback gegeven kan worden en het systeem aangepast kan worden.
2. **Controle**: Maak het mogelijk voor de gebruiker om aan te passen, voorkeuren op te geven en te personaliseren, en controle te hebben over het systeem en zijn eigenschappen (inclusief de mogelijkheid om te vergeten).
3. **Consistentie**: Streef naar consistente, multimodale ervaringen over apparaten en eindpunten. Gebruik waar mogelijk vertrouwde UI/UX-elementen (bijv. microfoonpictogram voor spraakinteractie) en verlaag de cognitieve belasting van de klant zoveel mogelijk (bijv. streef naar beknopte antwoorden, visuele hulpmiddelen en ‘Meer weten’-inhoud).

## Hoe een reisagent te ontwerpen met deze principes en richtlijnen

Stel je voor dat je een reisagent ontwerpt; zo kun je nadenken over het gebruik van de ontwerpprincipes en richtlijnen:

1. **Transparantie** – Laat de gebruiker weten dat de reisagent een AI-gestuurde agent is. Bied enkele basisinstructies om aan de slag te gaan (bijv. een “Hallo”-bericht, voorbeeldprompts). Documenteer dit duidelijk op de productpagina. Toon de lijst met prompts die een gebruiker in het verleden heeft gevraagd. Maak duidelijk hoe feedback kan worden gegeven (duim omhoog en omlaag, 'Feedback verzenden'-knop, enz.). Geef duidelijk aan of de agent gebruiks- of onderwerpbeperkingen heeft.
2. **Controle** – Zorg dat het duidelijk is hoe de gebruiker de agent kan aanpassen nadat deze is aangemaakt met zaken zoals de systeemprompt. Maak het mogelijk voor de gebruiker om te kiezen hoe uitgebreid de agent is, zijn schrijfstijl en eventuele beperkingen over waar de agent niet over mag praten. Sta de gebruiker toe om gekoppelde bestanden of gegevens, prompts en eerdere gesprekken te bekijken en te verwijderen.
3. **Consistentie** – Zorg dat de pictogrammen voor 'Prompts delen', 'een bestand of foto toevoegen' en 'iemand of iets taggen' standaard en herkenbaar zijn. Gebruik het paperclip-pictogram om bestandsupload/delen met de agent aan te geven, en een afbeeldingspictogram om het uploaden van afbeeldingen aan te geven.

## Voorbeeldcode

- Python: [Agent-framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent-framework](./code_samples/03-dotnet-agent-framework.md)


## Nog meer vragen over AI-agentische ontwerppatronen?

Sluit je aan bij de [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) om andere deelnemers te ontmoeten, deel te nemen aan spreekuren en antwoorden te krijgen op je vragen over AI-agents.

## Aanvullende bronnen

- <a href="https://openai.com" target="_blank">Praktijken voor het Besturen van Agentische AI-systemen | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Het HAX Toolkit-project - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Verantwoorde AI-toolbox</a>

## Vorige les

[Agentische kaders verkennen](../02-explore-agentic-frameworks/README.md)

## Volgende les

[Ontwerppatroon voor toolgebruik](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Disclaimer:
Dit document is vertaald met behulp van de AI-vertalingsdienst Co-op Translator (https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, houd er rekening mee dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het oorspronkelijke document in de oorspronkelijke taal dient als de gezaghebbende bron te worden beschouwd. Voor kritieke informatie wordt een professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor enige misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->