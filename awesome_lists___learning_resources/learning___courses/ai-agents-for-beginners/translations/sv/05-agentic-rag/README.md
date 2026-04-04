[![Agentic RAG](../../../translated_images/sv/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Klicka på bilden ovan för att se videon av denna lektion)_

# Agentic RAG

Denna lektion ger en omfattande översikt över Agentic Retrieval-Augmented Generation (Agentic RAG), ett framväxande AI-paradigm där stora språkmodeller (LLM:er) självständigt planerar sina nästa steg samtidigt som de hämtar information från externa källor. Till skillnad från statiska mönster med först hämtning och sedan läsning, inkluderar Agentic RAG iterativa anrop till LLM, varvat med verktygs- eller funktionsanrop och strukturerade utdata. Systemet utvärderar resultat, förfinar frågor, anropar ytterligare verktyg vid behov och fortsätter denna cykel tills en tillfredsställande lösning uppnås.

## Introduktion

Denna lektion kommer att täcka

- **Förstå Agentic RAG:** Lär dig om det framväxande paradigmet inom AI där stora språkmodeller (LLM) självständigt planerar sina nästa steg samtidigt som de hämtar information från externa datakällor.
- **Begreppet iterativ Maker-Checker-stil:** Förstå loopen med iterativa anrop till LLM, varvat med verktygs- eller funktionsanrop och strukturerade utdata, utformade för att förbättra korrekthet och hantera felaktiga frågor.
- **Utforska praktiska tillämpningar:** Identifiera scenarier där Agentic RAG utmärker sig, såsom miljöer med fokus på korrekthet, komplexa databasinteraktioner och utökade arbetsflöden.

## Lärandemål

Efter att ha slutfört denna lektion kommer du att kunna/förstå:

- **Förståelse för Agentic RAG:** Lära dig om det framväxande paradigmet inom AI där stora språkmodeller (LLM) självständigt planerar sina nästa steg medan de hämtar information från externa datakällor.
- **Iterativ Maker-Checker-stil:** Få grepp om konceptet med en loop av iterativa anrop till LLM, varvat med verktygs- eller funktionsanrop och strukturerade utdata, avsedd att förbättra korrekthet och hantera felaktiga frågor.
- **Äga resonemangsprocessen:** Förstå systemets förmåga att äga sitt resonemang, fatta beslut om hur problem ska angripas utan att förlita sig på fördefinierade vägar.
- **Arbetsflöde:** Förstå hur en agentisk modell självständigt beslutar att hämta marknadstrendrapporter, identifiera konkurrentdata, korrelera interna försäljningsmått, syntetisera slutsatser och utvärdera strategin.
- **Iterativa loopar, verktygsintegration och minne:** Lära dig om systemets beroende av ett loopat interaktionsmönster, som bibehåller tillstånd och minne över steg för att undvika repetitiva loopar och fatta välgrundade beslut.
- **Hantering av fel och självkorrigering:** Utforska systemets robusta mekanismer för självkorrigering, inklusive iteration och nyfrågning, användning av diagnostiska verktyg och att falla tillbaka på mänsklig tillsyn.
- **Gränser för agency:** Förstå begränsningarna hos Agentic RAG, med fokus på domänspecifik autonomi, beroende av infrastruktur och respekt för styrregler.
- **Praktiska användningsfall och värde:** Identifiera scenarier där Agentic RAG är bäst, såsom i miljöer med fokus på korrekthet, komplexa databasinteraktioner och förlängda arbetsflöden.
- **Styrning, transparens och förtroende:** Lära dig om vikten av styrning och transparens, inklusive förklarbart resonemang, kontroll av partiskhet och mänsklig tillsyn.

## Vad är Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) är ett framväxande AI-paradigm där stora språkmodeller (LLM) självständigt planerar sina nästa steg samtidigt som de hämtar information från externa källor. Till skillnad från statiska mönster med först hämtning och sedan läsning, involverar Agentic RAG iterativa anrop till LLM, varvat med verktygs- eller funktionsanrop och strukturerade utdata. Systemet utvärderar resultaten, förfinar frågor, anropar ytterligare verktyg vid behov och fortsätter denna cykel tills en tillfredsställande lösning uppnås. Denna iterativa ”maker-checker”-stil förbättrar korrekthet, hanterar felaktiga frågor och säkerställer högkvalitativa resultat.

Systemet äger aktivt sitt resonemangsprocess, skriver om misslyckade frågor, väljer olika återvinningsmetoder och integrerar flera verktyg — som vektorsökning i Azure AI Search, SQL-databaser eller anpassade API:er — innan det slutför sitt svar. Den utmärkande egenskapen hos ett agentiskt system är dess förmåga att äga sin resonemangsprocess. Traditionella RAG-implementeringar förlitar sig på fördefinierade vägar, men ett agentiskt system avgör självständigt sekvensen av steg baserat på kvaliteten på den information det hittar.

## Definiera Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) är ett framväxande paradigm inom AI-utveckling där LLM inte bara hämtar information från externa datakällor utan också självständigt planerar sina nästa steg. Till skillnad från statiska mönster med först hämtning och sedan läsning eller noggrant skriptade promptsekvenser involverar Agentic RAG en loop av iterativa anrop till LLM, varvat med verktygs- eller funktionsanrop och strukturerade utdata. Vid varje steg utvärderar systemet de resultat det fått, beslutar om det ska förfina sina frågor, anropar ytterligare verktyg vid behov och fortsätter denna cykel tills det uppnår en tillfredsställande lösning.

Denna iterativa ”maker-checker”-stil av drift är utformad för att förbättra korrekthet, hantera felaktiga frågor till strukturerade databaser (t.ex. NL2SQL) och säkerställa balanserade, högkvalitativa resultat. Istället för att enbart förlita sig på noggrant konstruerade promptkedjor äger systemet aktivt sitt resonemang. Det kan skriva om misslyckade frågor, välja olika återvinningsmetoder och integrera flera verktyg — såsom vektorsökning i Azure AI Search, SQL-databaser eller anpassade API:er — innan det slutför sitt svar. Detta eliminerar behovet av alltför komplexa orkestreringsramverk. Istället kan en relativt enkel loop av ”LLM-anrop → verktygsanvändning → LLM-anrop → …” ge sofistikerade och välgrundade utdata.

![Agentic RAG Core Loop](../../../translated_images/sv/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Äga resonemangsprocessen

Den utmärkande egenskapen som gör ett system ”agentiskt” är dess förmåga att äga sitt resonemang. Traditionella RAG-implementeringar är ofta beroende av att människor fördefinierar en väg för modellen: en kedja av tankar som skisserar vad som ska hämtas och när.
Men när ett system är verkligt agentiskt bestämmer det internt hur problemet ska angripas. Det utför inte bara ett skript; det avgör helt själv sekvensen av steg baserat på kvaliteten på den information det hittar.
Till exempel, om det får i uppdrag att skapa en produktlanseringsstrategi förlitar det sig inte bara på en prompt som redogör för hela forsknings- och beslutsprocessen. Istället bestämmer den agentiska modellen självständigt att:

1. Hämta aktuella marknadstrendrapporter med Bing Web Grounding
2. Identifiera relevant konkurrentdata med Azure AI Search
3. Korrelera historiska interna försäljningsmått med Azure SQL Database
4. Syntetisera resultaten till en sammanhängande strategi orkestrerad via Azure OpenAI Service
5. Utvärdera strategin för luckor eller inkonsekvenser och initiera ytterligare hämtning vid behov
Alla dessa steg — att förfina frågor, välja källor, iterera tills den är ”nöjd” med svaret — beslutas av modellen, inte förskrivet av en människa.

## Iterativa loopar, verktygsintegration och minne

![Tool Integration Architecture](../../../translated_images/sv/tool-integration.0f569710b5c17c10.webp)

Ett agentiskt system förlitar sig på ett loopat interaktionsmönster:

- **Initialt anrop:** Användarens mål (dvs. användarprompt) presenteras för LLM.
- **Verktygsanrop:** Om modellen identifierar saknad information eller otydliga instruktioner väljer den ett verktyg eller en återvinningsmetod — som en vektordatabasförfrågan (t.ex. Azure AI Search Hybrid Search över privat data) eller ett strukturerat SQL-anrop — för att samla mer kontext.
- **Utvärdering och förfining:** Efter att ha granskat den returnerade datan avgör modellen om informationen är tillräcklig. Om inte, förfinar den frågan, provar ett annat verktyg eller justerar sin metod.
- **Upprepa tills nöjd:** Denna cykel fortsätter tills modellen avgör att den har tillräcklig klarhet och bevis för att leverera ett slutligt, välmotiverat svar.
- **Minne och tillstånd:** Eftersom systemet bibehåller tillstånd och minne över stegen kan det komma ihåg tidigare försök och resultat, undvika repetitiva loopar och fatta mer informerade beslut under processen.

Med tiden skapar detta en känsla av utvecklande förståelse som gör det möjligt för modellen att navigera i komplexa, flerstegsuppgifter utan att en människa behöver ingripa eller omforma prompten kontinuerligt.

## Hantering av fel och självkorrigering

Agentic RAG:s autonomi innefattar också robusta mekanismer för självkorrigering. När systemet stöter på återvändsgränder — såsom att hämta irrelevanta dokument eller stöta på felaktiga frågor — kan det:

- **Iterera och göra nya förfrågningar:** Istället för att returnera svar med lågt värde försöker modellen nya sökstrategier, skriver om databasfrågor eller granskar alternativa datamängder.
- **Använda diagnostiska verktyg:** Systemet kan anropa ytterligare funktioner utformade för att hjälpa till att felsöka dess resonemang eller bekräfta korrektheten i hämtad data. Verktyg som Azure AI Tracing kommer vara viktiga för att möjliggöra robust observerbarhet och övervakning.
- **Falla tillbaka på mänsklig tillsyn:** För kritiska eller upprepade misslyckanden kan modellen markera osäkerhet och begära mänsklig vägledning. När människan ger korrigerande feedback kan modellen använda den lärdomen framöver.

Denna iterativa och dynamiska metod låter modellen förbättras kontinuerligt och säkerställer att det inte bara är ett engångssystem utan ett som lär sig av sina misstag under en given session.

![Self Correction Mechanism](../../../translated_images/sv/self-correction.da87f3783b7f174b.webp)

## Gränser för agency

Trots sin autonomi inom en uppgift är Agentic RAG inte liktydigt med artificiell generell intelligens. Dess ”agentiska” kapabiliteter är begränsade till verktygen, datakällorna och policys som tillhandahålls av mänskliga utvecklare. Den kan inte skapa egna verktyg eller gå utanför de domänbegränsningar som satts. Den utmärker sig istället i att dynamiskt orkestrera tillgängliga resurser.
Viktiga skillnader från mer avancerade AI-former inkluderar:

1. **Domänspecifik autonomi:** Agentic RAG-system fokuserar på att uppnå användardefinierade mål inom en känd domän, med strategier som omskrivning av frågor eller verktygsval för att förbättra resultat.
2. **Infrastrukturberoende:** Systemets kapaciteter är beroende av de verktyg och data som integrerats av utvecklarna. Den kan inte överskrida dessa gränser utan mänsklig inblandning.
3. **Respekt för styrregler:** Etiska riktlinjer, compliance-regler och affärspolicys förblir mycket viktiga. Agentens frihet är alltid begränsad av säkerhetsåtgärder och tillsynsmekanismer (förhoppningsvis?)

## Praktiska användningsfall och värde

Agentic RAG utmärker sig i scenarier som kräver iterativ förfining och precision:

1. **Miljöer med fokus på korrekthet:** Vid regelefterlevnadskontroller, regulatorisk analys eller juridisk forskning kan den agentiska modellen upprepade gånger verifiera fakta, konsultera flera källor och skriva om frågor tills den producerar ett noggrant granskat svar.
2. **Komplexa databasinteraktioner:** Vid hantering av strukturerad data där frågor ofta kan misslyckas eller behöva justeras kan systemet självständigt förfina sina frågor med Azure SQL eller Microsoft Fabric OneLake, vilket säkerställer att slutresultatet överensstämmer med användarens avsikt.
3. **Förlängda arbetsflöden:** Längre sessioner kan utvecklas när ny information framkommer. Agentic RAG kan kontinuerligt inkorporera ny data och ändra strategier allteftersom den lär sig mer om problemområdet.

## Styrning, transparens och förtroende

När dessa system blir självgående i sitt resonemang blir styrning och transparens avgörande:

- **Förklarbart resonemang:** Modellen kan tillhandahålla en revisionskedja över de frågor den ställt, källorna den konsulterat och resonemangssteget som ledde till slutsatsen. Verktyg som Azure AI Content Safety och Azure AI Tracing / GenAIOps kan hjälpa till att bibehålla transparens och minska risker.
- **Kontroll av partiskhet och balanserad återvinning:** Utvecklare kan finjustera återvinningsstrategier för att säkerställa att balanserade och representativa datakällor beaktas, och regelbundet granska utdata för att upptäcka partiskhet eller snedvridna mönster med hjälp av anpassade modeller för avancerade data science-organisationer som använder Azure Machine Learning.
- **Mänsklig tillsyn och compliance:** För känsliga uppgifter är mänsklig granskning fortfarande nödvändig. Agentic RAG ersätter inte mänskligt omdöme i kritiska beslut — det förstärker det genom att leverera mer noggrant granskade alternativ.

Att ha verktyg som ger en klar redovisning av åtgärder är väsentligt. Utan dessa kan felsökning av en flerstegsprocess vara mycket svår. Se följande exempel från Literal AI (företaget bakom Chainlit) för en agentkörning:

![AgentRunExample](../../../translated_images/sv/AgentRunExample.471a94bc40cbdc0c.webp)

## Slutsats

Agentic RAG representerar en naturlig utveckling i hur AI-system hanterar komplexa, dataintensiva uppgifter. Genom att anta ett loopat interaktionsmönster, autonomt välja verktyg och förfina frågor tills ett högkvalitativt resultat uppnås, rör sig systemet bortom statiskt promptföljande till en mer adaptiv, kontextmedveten beslutsfattare. Trots att det fortfarande är begränsat av mänskligt definierad infrastruktur och etiska riktlinjer, möjliggör dessa agentiska kapabiliteter rikare, mer dynamiska och slutligen mer användbara AI-interaktioner för både företag och användare.

### Har du fler frågor om Agentic RAG?

Gå med i [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) för att träffa andra elever, delta i kontorstider och få svar på dina frågor om AI-agenter.

## Ytterligare resurser
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementera Retrieval Augmented Generation (RAG) med Azure OpenAI-tjänsten: Lär dig hur du använder dina egna data med Azure OpenAI-tjänsten. Denna Microsoft Learn-modul ger en omfattande guide för att implementera RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Utvärdering av generativa AI-applikationer med Microsoft Foundry: Denna artikel täcker utvärdering och jämförelse av modeller på offentligt tillgängliga datamängder, inklusive Agentic AI-applikationer och RAG-arkitekturer</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Vad är Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: En komplett guide till agentbaserad Retrieval Augmented Generation – Nyheter från generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: ge din RAG extra kraft med omformulering av frågor och självfrågeställning! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Lägga till Agentic-lager till RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Framtiden för kunskapshjälpare: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Hur man bygger Agentic RAG-system</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Använda Microsoft Foundry Agent Service för att skala dina AI-agenter</a>

### Akademiska artiklar

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iterativ förbättring med självfeedback</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Språkliga agenter med verbal förstärkningsinlärning</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Stora språkmodeller kan självkorrigera med verktygsinteraktiv granskning</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: En översikt över Agentic RAG</a>

## Föregående lektion

[Tool Use Design Pattern](../04-tool-use/README.md)

## Nästa lektion

[Building Trustworthy AI Agents](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:  
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Vi strävar efter noggrannhet, men var vänlig observera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess originalspråk bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->