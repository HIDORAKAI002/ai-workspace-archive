[![Agentic RAG](../../../translated_images/nl/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

# Agentic RAG

Deze les biedt een uitgebreid overzicht van Agentic Retrieval-Augmented Generation (Agentic RAG), een opkomend AI-paradigma waarbij grote taalmodellen (LLM's) autonoom hun volgende stappen plannen terwijl ze informatie uit externe bronnen halen. In tegenstelling tot statische retrieval-then-read patronen omvat Agentic RAG iteratieve oproepen naar de LLM, afgewisseld met tool- of functie-aanroepen en gestructureerde outputs. Het systeem evalueert resultaten, verfijnt zoekopdrachten, roept indien nodig extra tools aan en zet deze cyclus voort totdat een bevredigende oplossing is bereikt.

## Introductie

Deze les behandelt

- **Begrijp Agentic RAG:** Leer over het opkomende paradigma in AI waarbij grote taalmodellen (LLM's) autonoom hun volgende stappen plannen terwijl ze informatie uit externe gegevensbronnen halen.
- **Begrijp Iteratieve Maker-Checkerstijl:** Vat de lus van iteratieve oproepen naar de LLM, afgewisseld met tool- of functie-aanroepen en gestructureerde outputs, bedoeld om juistheid te verbeteren en met malformed queries om te gaan.
- **Verken Praktische Toepassingen:** Identificeer scenario's waar Agentic RAG uitblinkt, zoals omgevingen die juistheid vooropstellen, complexe database-interacties en uitgebreide workflows.

## Leerdoelen

Na het voltooien van deze les weet je hoe je/begrijp je:

- **Begrip van Agentic RAG:** Leer over het opkomende paradigma in AI waarbij grote taalmodellen (LLM's) autonoom hun volgende stappen plannen terwijl ze informatie uit externe gegevensbronnen halen.
- **Iteratieve Maker-Checkerstijl:** Begrijp het concept van een lus van iteratieve oproepen naar de LLM, afgewisseld met tool- of functie-aanroepen en gestructureerde outputs, bedoeld om juistheid te verbeteren en met malformed queries om te gaan.
- **Beheersing van het Redeneringsproces:** Begrijp het vermogen van het systeem om zijn redeneringsproces te bezitten, waarbij het beslissingen neemt over hoe het problemen aanpakt zonder te vertrouwen op vooraf gedefinieerde paden.
- **Workflow:** Begrijp hoe een agent-model zelfstandig beslist om marktrendrapporten op te halen, gegevens van concurrenten te identificeren, interne verkoopstatistieken te correleren, bevindingen te synthetiseren en de strategie te evalueren.
- **Iteratieve Lussen, Toolintegratie en Geheugen:** Leer over het vertrouwen van het systeem op een gelust interactiepatroon, waarbij staat en geheugen over stappen worden onderhouden om repetitieve lussen te vermijden en geïnformeerde beslissingen te nemen.
- **Omgaan met Faalmodi en Zelfcorrectie:** Verken de robuuste zelfcorrectiemechanismen van het systeem, waaronder itereren en opnieuw opvragen, gebruik van diagnostische tools en terugvallen op menselijke supervisie.
- **Beperkingen van Agentie:** Begrijp de beperkingen van Agentic RAG, met focus op domeinspecifieke autonomie, afhankelijkheid van infrastructuur en respect voor richtlijnen.
- **Praktische Toepassingen en Waarde:** Identificeer scenario's waar Agentic RAG uitblinkt, zoals omgevingen die juistheid vooropstellen, complexe database-interacties en uitgebreide workflows.
- **Bestuur, Transparantie en Vertrouwen:** Leer over het belang van bestuur en transparantie, inclusief uitlegbaar redeneren, biasbeheersing en menselijke supervisie.

## Wat is Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) is een opkomend AI-paradigma waarbij grote taalmodellen (LLM's) autonoom hun volgende stappen plannen terwijl ze informatie uit externe bronnen halen. In tegenstelling tot statische retrieval-then-read patronen omvat Agentic RAG iteratieve oproepen naar de LLM, afgewisseld met tool- of functie-aanroepen en gestructureerde outputs. Het systeem evalueert resultaten, verfijnt zoekopdrachten, roept indien nodig extra tools aan en zet deze cyclus voort totdat een bevredigende oplossing is bereikt. Deze iteratieve “maker-checker”-stijl verbetert de juistheid, behandelt malformed queries en zorgt voor hoogwaardige resultaten.

Het systeem beheert actief zijn redeneringsproces, herschrijft mislukte zoekopdrachten, kiest verschillende retrieval-methoden en integreert meerdere tools — zoals vectoraanzoeken in Azure AI Search, SQL-databases, of aangepaste API’s — voordat het antwoord wordt afgerond. De onderscheidende eigenschap van een agentic systeem is zijn vermogen om zijn redeneringsproces te bezitten. Traditionele RAG-implementaties vertrouwen op vooraf gedefinieerde paden, maar een agentic systeem bepaalt autonoom de volgorde van stappen op basis van de kwaliteit van de gevonden informatie.

## Het definiëren van Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) is een opkomend paradigma in AI-ontwikkeling waarbij LLM's niet alleen informatie uit externe gegevensbronnen halen, maar ook autonoom hun volgende stappen plannen. In tegenstelling tot statische retrieval-then-read patronen of zorgvuldig gescripte promptsequenties, omvat Agentic RAG een lus van iteratieve oproepen naar de LLM, afgewisseld met tool- of functie-aanroepen en gestructureerde outputs. Bij elke stap evalueert het systeem de verkregen resultaten, beslist of het zijn zoekopdrachten moet verfijnen, roept extra tools aan indien nodig en zet dit proces voort totdat een bevredigende oplossing is bereikt.

Deze iteratieve “maker-checker”-stijl is ontworpen om juistheid te verbeteren, malformed queries naar gestructureerde databases (bijv. NL2SQL) te verwerken en gebalanceerde, hoogwaardige resultaten te garanderen. In plaats van uitsluitend te vertrouwen op zorgvuldig ontworpen promptketens, beheert het systeem actief zijn redeneringsproces. Het kan zoekopdrachten herschrijven die mislukken, verschillende retrieval-methodes kiezen, en meerdere tools integreren — zoals vectoraanzoeken in Azure AI Search, SQL-databases of aangepaste API’s — voordat het antwoord wordt afgerond. Dit maakt het gebruik van overmatig complexe orkestratiekaders overbodig. In plaats daarvan kan een relatief eenvoudige lus van “LLM-oproep → toolgebruik → LLM-oproep → …” geavanceerde en goed onderbouwde outputs opleveren.

![Agentic RAG Core Loop](../../../translated_images/nl/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Het Redeneringsproces Bezitten

De onderscheidende kwaliteit die een systeem “agentic” maakt, is het vermogen om zijn redeneringsproces te bezitten. Traditionele RAG-implementaties zijn vaak afhankelijk van mensen die een pad voor het model vooraf definiëren: een chain-of-thought die beschrijft wat opgehaald moet worden en wanneer.
Maar wanneer een systeem echt agentic is, beslist het intern hoe het het probleem benadert. Het volgt niet slechts een script; het bepaalt autonoom de volgorde van stappen op basis van de kwaliteit van de gevonden informatie.
Bijvoorbeeld, als het wordt gevraagd een productlanceringsstrategie op te stellen, vertrouwt het niet alleen op een prompt die de hele onderzoeks- en besluitvormingsworkflow uitspelt. In plaats daarvan beslist het agentic model zelfstandig om:

1. Recente markttrendrapporten op te halen met Bing Web Grounding
2. Relevante concurrentgegevens te identificeren met Azure AI Search.
3. Historische interne verkoopstatistieken te correleren met Azure SQL Database.
4. De bevindingen samen te vatten in een samenhangende strategie gecoördineerd via Azure OpenAI Service.
5. De strategie te evalueren op hiaten of inconsistenties, en indien nodig een nieuwe ronde van informatie-ophaling te starten.
Al deze stappen — het verfijnen van zoekopdrachten, het kiezen van bronnen, itereren totdat het “tevreden” is met het antwoord — worden door het model besloten, niet vooraf door een mens gescripte.

## Iteratieve Lussen, Toolintegratie en Geheugen

![Tool Integration Architecture](../../../translated_images/nl/tool-integration.0f569710b5c17c10.webp)

Een agentic systeem vertrouwt op een gelust interactiepatroon:

- **Initiële Oproep:** Het doel van de gebruiker (ook wel gebruikersprompt genoemd) wordt gepresenteerd aan de LLM.
- **Toolaanroep:** Als het model ontbrekende informatie of onduidelijke instructies detecteert, selecteert het een tool of retrieval-methode — zoals een vectordatabasequery (bijv. Azure AI Search Hybrid search over privédata) of een gestructureerde SQL-aanroep — om meer context te verzamelen.
- **Beoordeling & Verfijning:** Na het bestuderen van de geretourneerde data beslist het model of de informatie voldoende is. Zo niet, dan verfijnt het de zoekopdracht, probeert een andere tool of past zijn aanpak aan.
- **Herhalen tot Tevreden:** Deze cyclus gaat door totdat het model bepaalt dat het genoeg helderheid en bewijs heeft om een definitief, weloverwogen antwoord te geven.
- **Geheugen & Staat:** Omdat het systeem staat en geheugen over de stappen heen onderhoudt, kan het eerdere pogingen en uitkomsten herinneren, waardoor het repetitieve lussen vermijdt en betere beslissingen neemt tijdens het proces.

In de loop van de tijd creëert dit een gevoel van evoluerend begrip, waarmee het model complexe, meerstaps taken kan navigeren zonder dat een mens constant hoeft in te grijpen of de prompt hoeft te herschikken.

## Omgaan met Faalmodi en Zelfcorrectie

De autonomie van Agentic RAG omvat ook robuuste zelfcorrectiemechanismen. Wanneer het systeem vastloopt — bijvoorbeeld door het ophalen van irrelevante documenten of het tegenkomen van malformed queries — kan het:

- **Itereren en Opnieuw Opvragen:** In plaats van laagwaardige reacties te geven, probeert het model nieuwe zoekstrategieën, herschrijft databasequery’s of bekijkt alternatieve datasets.
- **Diagnostische Tools Gebruiken:** Het systeem kan extra functies aanroepen die helpen bij het debuggen van zijn redeneringsstappen of het bevestigen van de juistheid van opgehaalde data. Tools zoals Azure AI Tracing zijn belangrijk voor robuuste observeerbaarheid en monitoring.
- **Terugvallen op Menselijke Toezicht:** Voor scenario’s met hoge impact of herhaald falen kan het model onzekerheid signaleren en om menselijke begeleiding vragen. Zodra de mens correctieve feedback geeft, kan het model deze les meenemen voor de toekomst.

Deze iteratieve en dynamische aanpak maakt het mogelijk dat het model continu verbetert, zodat het niet slechts een eenmalig systeem is, maar een dat leert van zijn fouten binnen een sessie.

![Self Correction Mechanism](../../../translated_images/nl/self-correction.da87f3783b7f174b.webp)

## Grenzen van Agentie

Ondanks zijn autonomie binnen een taak is Agentic RAG niet vergelijkbaar met Artificial General Intelligence. Zijn “agentic” capaciteiten zijn beperkt tot de tools, datapunten en beleidslijnen die door menselijke ontwikkelaars worden geleverd. Het kan zijn eigen tools niet uitvinden of buiten de domeingrenzen treden die zijn gesteld. In plaats daarvan blinkt het uit in het dynamisch orkestreren van de beschikbare middelen.
Belangrijke verschillen met meer geavanceerde AI-vormen zijn:

1. **Domeinspecifieke Autonomie:** Agentic RAG-systemen richten zich op het behalen van door gebruikers gedefinieerde doelen binnen een bekend domein, waarbij strategieën als herschrijven van zoekopdrachten of toolselectie worden gebruikt om resultaten te verbeteren.
2. **Infrastructuur-afhankelijk:** De capaciteiten van het systeem zijn afhankelijk van de tools en data die door ontwikkelaars zijn geïntegreerd. Het kan deze grenzen niet overschrijden zonder menselijke tussenkomst.
3. **Respect voor Richtlijnen:** Ethische richtlijnen, compliance-regels en bedrijfsbeleid blijven zeer belangrijk. De vrijheid van de agent is altijd beperkt door veiligheidsmaatregelen en toezichtmechanismen (hopelijk?).

## Praktische Toepassingen en Waarde

Agentic RAG blinkt uit in scenario's die iteratieve verfijning en precisie vereisen:

1. **Omgevingen Waar Juistheid Vooropstaat:** Bij compliance-controles, regelgevingsanalyses of juridisch onderzoek kan het agentic model feiten herhaaldelijk verifiëren, meerdere bronnen raadplegen en zoekopdrachten herschrijven totdat het een grondig gecontroleerd antwoord geeft.
2. **Complexe Database-Interactie:** Bij gestructureerde data waar zoekopdrachten vaak falen of aanpassing behoeven, kan het systeem autonoom zijn zoekopdrachten verfijnen met Azure SQL of Microsoft Fabric OneLake, en zo zorgen dat het eindresultaat aansluit bij de intentie van de gebruiker.
3. **Uitgebreide Workflows:** Langere sessies kunnen evolueren naarmate nieuwe informatie beschikbaar komt. Agentic RAG kan continu nieuwe data opnemen en strategieën aanpassen naarmate het meer leert over het probleemgebied.

## Bestuur, Transparantie en Vertrouwen

Naarmate deze systemen autonomer worden in hun redenering, zijn bestuur en transparantie cruciaal:

- **Uitlegbaar Redeneren:** Het model kan een audit trail bieden van de zoekopdrachten die het uitvoerde, de geraadpleegde bronnen en de redeneringsstappen die het nam om tot zijn conclusie te komen. Tools zoals Azure AI Content Safety en Azure AI Tracing / GenAIOps kunnen helpen de transparantie te waarborgen en risico’s te beperken.
- **Biasbeheersing en Gebalanceerde Retrieval:** Ontwikkelaars kunnen retrievalstrategieën afstemmen om te zorgen dat evenwichtige, representatieve databronnen worden meegenomen en outputs regelmatig auditen om bias of scheve patronen te detecteren, bijvoorbeeld met aangepaste modellen voor geavanceerde datawetenschappelijke organisaties met Azure Machine Learning.
- **Menselijke Toezicht en Compliance:** Voor gevoelige taken blijft menselijke review essentieel. Agentic RAG vervangt menselijk oordeel in belangrijke beslissingen niet — het versterkt dit door beter gecontroleerde opties te leveren.

Het hebben van tools die een duidelijke registratie van acties bieden is essentieel. Zonder deze is het debuggen van een meerstapsproces erg lastig. Zie het volgende voorbeeld van Literal AI (bedrijf achter Chainlit) voor een Agent-run:

![AgentRunExample](../../../translated_images/nl/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusie

Agentic RAG vertegenwoordigt een natuurlijke evolutie in hoe AI-systemen omgaan met complexe, data-intensieve taken. Door een gelust interactiepatroon te adopteren, autonoom tools te selecteren en zoekopdrachten te verfijnen tot een hoogwaardig resultaat is bereikt, gaat het systeem verder dan statisch promptvolgen naar een adaptievere, contextbewuste besluitvormer. Hoewel het nog steeds beperkt is door door mensen gedefinieerde infrastructuren en ethische richtlijnen, maken deze agentic capaciteiten rijkere, dynamischere en uiteindelijk nuttigere AI-interacties mogelijk voor zowel bedrijven als eindgebruikers.

### Nog meer vragen over Agentic RAG?

Word lid van de [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) om andere studenten te ontmoeten, kantoortuinen bij te wonen en je AI Agents-vragen beantwoord te krijgen.

## Aanvullende bronnen
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementeer Retrieval Augmented Generation (RAG) met Azure OpenAI Service: Leer hoe u uw eigen gegevens kunt gebruiken met de Azure OpenAI Service. Deze Microsoft Learn-module biedt een uitgebreide gids voor het implementeren van RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Evaluatie van generatieve AI-toepassingen met Microsoft Foundry: Dit artikel behandelt de evaluatie en vergelijking van modellen op openbaar beschikbare datasets, inclusief Agentic AI-toepassingen en RAG-architecturen</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Wat is Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Een complete gids voor agent-gebaseerde Retrieval Augmented Generation – Nieuws van generatie RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: versnel je RAG met query-herstelformulering en zelf-query! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Agentic lagen toevoegen aan RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">De toekomst van kennisassistenten: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Hoe bouw je agentic RAG-systemen</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Microsoft Foundry Agent Service gebruiken om je AI-agenten op te schalen</a>

### Wetenschappelijke Artikelen

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iteratieve verfijning met zelffeedback</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Taalagenten met verbaal versterkend leren</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Grote taalmodellen kunnen zichzelf corrigeren met tool-interactieve kritieken</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Een overzicht van Agentic RAG</a>

## Vorige Les

[Tool Use Design Pattern](../04-tool-use/README.md)

## Volgende Les

[Betrouwbare AI-agenten bouwen](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, verzoeken wij u ervan bewust te zijn dat geautomatiseerde vertalingen fouten of onjuistheden kunnen bevatten. Het originele document in de oorspronkelijke taal dient als de gezaghebbende bron te worden beschouwd. Voor cruciale informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor misverstanden of verkeerd uitgelegde informatie die voortkomen uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->