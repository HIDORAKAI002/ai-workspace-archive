[![Agentic RAG](../../../translated_images/no/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Klikk bildet ovenfor for å se videoen til denne leksjonen)_

# Agentic RAG

Denne leksjonen gir en omfattende oversikt over Agentic Retrieval-Augmented Generation (Agentic RAG), et fremvoksende AI-paradigme hvor store språkmodeller (LLMer) autonomt planlegger sine neste steg samtidig som de henter informasjon fra eksterne kilder. I motsetning til statiske mønstre for "hent-deretter-les", involverer Agentic RAG iterative kall til LLM-en, avbrutt av verktøy- eller funksjonskall og strukturerte utdata. Systemet evaluerer resultater, forbedrer forespørsler, kaller opp flere verktøy ved behov, og fortsetter denne syklusen til en tilfredsstillende løsning er oppnådd.

## Introduction

Denne leksjonen vil dekke

- **Understand Agentic RAG:** Lær om det fremvoksende paradigmet i AI hvor store språkmodeller (LLMer) autonomt planlegger sine neste steg samtidig som de henter informasjon fra eksterne datakilder.
- **Grasp Iterative Maker-Checker Style:** Forstå sløyfen med iterative kall til LLM-en, avbrutt av verktøy- eller funksjonskall og strukturerte utdata, designet for å forbedre korrekthet og håndtere dårlige forespørsler.
- **Explore Practical Applications:** Identifisere scenarier hvor Agentic RAG utmerker seg, som korrekthets-først-miljøer, komplekse databaseinteraksjoner og utvidede arbeidsflyter.

## Learning Goals

Etter å ha fullført denne leksjonen, vil du vite hvordan/forstå:

- **Understanding Agentic RAG:** Lær om det fremvoksende paradigmet i AI hvor store språkmodeller (LLMer) autonomt planlegger sine neste steg samtidig som de henter informasjon fra eksterne datakilder.
- **Iterative Maker-Checker Style:** Få grep om konseptet med en sløyfe av iterative kall til LLM-en, avbrutt av verktøy- eller funksjonskall og strukturerte utdata, designet for å forbedre korrekthet og håndtere dårlige forespørsler.
- **Owning the Reasoning Process:** Forstå systemets evne til å eie sin resonnementprosess, ta beslutninger om hvordan man nærmer seg problemer uten å være avhengig av forhåndsdefinerte stier.
- **Workflow:** Forstå hvordan en agentisk modell selvstendig bestemmer seg for å hente markedsrapportene, identifisere konkurrentdata, korrelere interne salgsmetrikk, syntetisere funn og evaluere strategien.
- **Iterative Loops, Tool Integration, and Memory:** Lær om systemets avhengighet av et sløyfeinteraksjonsmønster, vedlikehold av tilstand og minne på tvers av steg for å unngå repeterende sløyfer og ta informerte beslutninger.
- **Handling Failure Modes and Self-Correction:** Utforsk systemets robuste selvkorrigeringsmekanismer, inkludert iterering og nyforespørsling, bruk av diagnostiske verktøy og å falle tilbake på menneskelig tilsyn.
- **Boundaries of Agency:** Forstå begrensningene til Agentic RAG, med fokus på domene-spesifikk autonomi, infrastrukturavhengighet og respekt for styringsregler.
- **Practical Use Cases and Value:** Identifiser scenarier hvor Agentic RAG utmerker seg, som korrekthets-først-miljøer, komplekse databaseinteraksjoner og utvidede arbeidsflyter.
- **Governance, Transparency, and Trust:** Lær om viktigheten av styring og transparens, inkludert forklarbart resonnement, kontroll av skjevhet og menneskelig tilsyn.

## What is Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) er et fremvoksende AI-paradigme hvor store språkmodeller (LLMer) autonomt planlegger sine neste steg samtidig som de henter informasjon fra eksterne kilder. I motsetning til statiske mønstre for "hent-deretter-les", involverer Agentic RAG iterative kall til LLM-en, avbrutt av verktøy- eller funksjonskall og strukturerte utdata. Systemet evaluerer resultater, forbedrer forespørsler, kaller opp flere verktøy ved behov, og fortsetter denne syklusen til en tilfredsstillende løsning er oppnådd. Denne iterative "maker-checker"-stilen forbedrer korrekthet, håndterer dårlige forespørsler og sikrer resultater av høy kvalitet.

Systemet eier aktivt sin resonnementprosess, omskriver feilede forespørsler, velger ulike innhentingsmetoder, og integrerer flere verktøy—slik som vektorsøk i Azure AI Search, SQL-databaser eller tilpassede API-er—før det ferdigstiller svaret. Det som skiller et agentisk system er dets evne til å eie resonnementprosessen. Tradisjonelle RAG-implementasjoner er avhengige av forhåndsdefinerte stier, men et agentisk system bestemmer autonomt rekkefølgen av steg basert på kvaliteten på informasjonen det finner.

## Defining Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) er et fremvoksende paradigme i AI-utvikling hvor LLM-er ikke bare henter informasjon fra eksterne datakilder, men også autonomt planlegger sine neste steg. I motsetning til statiske mønstre for "hent-deretter-les" eller nøye skriptede promptsekvenser, involverer Agentic RAG en sløyfe av iterative kall til LLM-en, avbrutt av verktøy- eller funksjonskall og strukturerte utdata. Ved hver vending evaluerer systemet resultatene det har oppnådd, avgjør om det skal forbedre forespørslene, kaller opp ekstra verktøy hvis nødvendig, og fortsetter denne syklusen til det oppnår en tilfredsstillende løsning.

Denne iterative "maker-checker"-driftsstilen er utformet for å forbedre korrekthet, håndtere dårlige forespørsler til strukturerte databaser (f.eks. NL2SQL) og sikre balanserte, høykvalitetsresultater. I stedet for å stole utelukkende på nøye utformede promptkjeder, eier systemet aktivt sin resonnementprosess. Det kan omskrive forespørsler som feiler, velge forskjellige innhentingsmetoder og integrere flere verktøy—slik som vektorsøk i Azure AI Search, SQL-databaser eller tilpassede API-er—før det ferdigstiller svaret. Dette fjerner behovet for altfor komplekse orkestreringsrammeverk. I stedet kan en relativt enkel sløyfe av "LLM-kall → verktøysbruk → LLM-kall → …" gi sofistikerte og godt funderte utdata.

![Agentic RAG Core Loop](../../../translated_images/no/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Owning the Reasoning Process

Den kjennende egenskapen som gjør et system "agentisk" er dets evne til å eie sin resonnementprosess. Tradisjonelle RAG-implementasjoner er ofte avhengige av at mennesker forhåndsdefinerer en sti for modellen: en chain-of-thought som skisserer hva som skal hentes og når.
Men når et system virkelig er agentisk, bestemmer det internt hvordan det skal nærme seg problemet. Det utfører ikke bare et skript; det avgjør autonomt rekkefølgen av steg basert på kvaliteten på informasjonen det finner.
For eksempel, hvis det blir bedt om å lage en produktlanseringsstrategi, stoler det ikke bare på en prompt som beskriver hele forsknings- og beslutningsarbeidsflyten. I stedet bestemmer den agentiske modellen selvstendig å:

1. Retrieve current market trend reports using Bing Web Grounding
2. Identify relevant competitor data using Azure AI Search.
3.	Correlate historical internal sales metrics using Azure SQL Database.
4. Synthesize the findings into a cohesive strategy orchestrated via Azure OpenAI Service.
5.	Evaluate the strategy for gaps or inconsistencies, prompting another round of retrieval if necessary.
Alle disse stegene—forbedring av forespørsler, valg av kilder, iterering til den er "fornøyd" med svaret—avgjøres av modellen, ikke forhåndsprogrammert av et menneske.

## Iterative Loops, Tool Integration, and Memory

![Tool Integration Architecture](../../../translated_images/no/tool-integration.0f569710b5c17c10.webp)

Et agentisk system er avhengig av et sløyfeinteraksjonsmønster:

- **Initial Call:** Brukerens mål (aka. brukerprompten) presenteres for LLM-en.
- **Tool Invocation:** Hvis modellen identifiserer manglende informasjon eller tvetydige instrukser, velger den et verktøy eller en innhentingsmetode—som en vektor-databaseforespørsel (f.eks. Azure AI Search Hybrid search over private data) eller et strukturert SQL-kall—for å samle mer kontekst.
- **Assessment & Refinement:** Etter å ha gjennomgått de returnerte dataene, avgjør modellen om informasjonen er tilstrekkelig. Hvis ikke, forbedrer den forespørselen, prøver et annet verktøy eller justerer tilnærmingen.
- **Repeat Until Satisfied:** Denne syklusen fortsetter til modellen bestemmer at den har nok klarhet og bevis til å levere et endelig, velbegrunnet svar.
- **Memory & State:** Fordi systemet opprettholder tilstand og minne på tvers av steg, kan det huske tidligere forsøk og deres resultater, unngå repeterende sløyfer og ta mer informerte beslutninger etter hvert som det går fram.

Over tid skaper dette en følelse av utviklende forståelse, som gjør modellen i stand til å navigere komplekse, flerstegsoppgaver uten at et menneske stadig må gripe inn eller omforme prompten.

## Handling Failure Modes and Self-Correction

Agentic RAGs autonomi innebærer også robuste selvkorrigeringsmekanismer. Når systemet treffer blindveier—som å hente irrelevante dokumenter eller støte på dårlige forespørsler—kan det:

- **Iterate and Re-Query:** I stedet for å returnere svar med lav verdi, forsøker modellen nye søkestrategier, omskriver databaseforespørsler eller ser på alternative datasett.
- **Use Diagnostic Tools:** Systemet kan kalle opp tilleggfunksjoner designet for å hjelpe det å feilsøke sine resonnementstrinn eller bekrefte korrektheten av hentede data. Verktøy som Azure AI Tracing vil være viktige for å muliggjøre robust observerbarhet og overvåking.
- **Fallback on Human Oversight:** For høyrisiko- eller gjentatte feilsituasjoner kan modellen merke usikkerhet og be om menneskelig veiledning. Når mennesket gir korrigerende tilbakemelding, kan modellen innlemme den lærdommen fremover.

Denne iterative og dynamiske tilnærmingen gjør at modellen kan forbedre seg kontinuerlig, og sikrer at den ikke bare er et engangssystem, men en som lærer av sine feil i løpet av en gitt økt.

![Self Correction Mechanism](../../../translated_images/no/self-correction.da87f3783b7f174b.webp)

## Boundaries of Agency

Til tross for sin autonomi innen en oppgave, er Agentic RAG ikke analogt med Artificial General Intelligence. Dets "agentiske" kapasiteter er begrenset til verktøyene, datakildene og policyene som er levert av menneskelige utviklere. Det kan ikke oppfinne sine egne verktøy eller gå utenfor de domenegrensene som er satt. Snarere utmerker det seg i å dynamisk orkestrere ressursene som er tilgjengelige.
Nøkkelforskjeller fra mer avanserte AI-former inkluderer:

1. **Domain-Specific Autonomy:** Agentic RAG-systemer er fokusert på å oppnå brukerdefinerte mål innen et kjent domene, og benytter strategier som omskriving av forespørsler eller valg av verktøy for å forbedre resultater.
2. **Infrastructure-Dependent:** Systemets kapasiteter avhenger av verktøyene og dataene som er integrert av utviklere. Det kan ikke overstige disse grensene uten menneskelig inngripen.
3. **Respect for Guardrails:** Etiske retningslinjer, samsvarsregler og forretningspolicies forblir svært viktige. Agentens frihet er alltid begrenset av sikkerhetstiltak og tilsynsmekanismer (forhåpentligvis).

## Practical Use Cases and Value

Agentic RAG skinner i scenarier som krever iterativ forbedring og presisjon:

1. **Correctness-First Environments:** I samsvarskontroller, regulatorisk analyse eller juridisk forskning kan den agentiske modellen gjentatte ganger verifisere fakta, konsultere flere kilder og omskrive forespørsler til den leverer et grundig gjennomgått svar.
2. **Complex Database Interactions:** Når man arbeider med strukturerte data der forespørsler ofte kan feile eller trenge justering, kan systemet autonomt forbedre sine spørringer ved hjelp av Azure SQL eller Microsoft Fabric OneLake, og sikre at den endelige innhentingen samsvarer med brukerens intensjon.
3. **Extended Workflows:** Lengre økter kan utvikle seg etter hvert som ny informasjon dukker opp. Agentic RAG kan kontinuerlig innlemme nye data og endre strategier etter hvert som den lærer mer om problemområdet.

## Governance, Transparency, and Trust

Ettersom disse systemene blir mer autonome i sitt resonnement, er styring og transparens avgjørende:

- **Explainable Reasoning:** Modellen kan gi en revisjonsspor av forespørslene den gjorde, kildene den konsulterte, og resonnementstrinnene den tok for å nå sin konklusjon. Verktøy som Azure AI Content Safety og Azure AI Tracing / GenAIOps kan hjelpe med å opprettholde transparens og redusere risiko.
- **Bias Control and Balanced Retrieval:** Utviklere kan finjustere innhentingsstrategier for å sikre at balanserte, representative datakilder vurderes, og regelmessig revidere utdata for å oppdage skjevhet eller skjeve mønstre ved bruk av tilpassede modeller for avanserte data science-organisasjoner som bruker Azure Machine Learning.
- **Human Oversight and Compliance:** For sensitive oppgaver forblir menneskelig gjennomgang essensiell. Agentic RAG erstatter ikke menneskelig skjønn i høyrisikoavgjørelser—det forsterker det ved å levere mer grundig gjennomgåtte alternativer.

Å ha verktøy som gir en klar oversikt over handlinger er essensielt. Uten dem kan feilsøking av en flertrinnsprosess være svært vanskelig. Se følgende eksempel fra Literal AI (selskapet bak Chainlit) for en Agent-run:

![AgentRunExample](../../../translated_images/no/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusion

Agentic RAG representerer en naturlig evolusjon i hvordan AI-systemer håndterer komplekse, dataintensive oppgaver. Ved å ta i bruk et sløyfeinteraksjonsmønster, autonomt velge verktøy og forbedre forespørsler til det oppnår et høykvalitetsresultat, går systemet utover statisk prompt-utførelse til en mer adaptiv, kontekstbevisst beslutningstaker. Selv om det fortsatt er bundet av menneskedefinerte infrastrukturer og etiske retningslinjer, gjør disse agentiske evnene AI-interaksjoner rikere, mer dynamiske og i siste instans mer nyttige for både bedrifter og sluttbrukere.

### Got More Questions about Agentic RAG?

Join the [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet with other learners, attend office hours and get your AI Agents questions answered.

## Additional Resources
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementer Retrieval Augmented Generation (RAG) med Azure OpenAI Service: Lær hvordan du bruker dine egne data med Azure OpenAI Service. Dette Microsoft Learn-modulet gir en omfattende veiledning om implementering av RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Evaluering av generative AI-applikasjoner med Microsoft Foundry: Denne artikkelen dekker evaluering og sammenligning av modeller på offentlig tilgjengelige datasett, inkludert agentiske AI-applikasjoner og RAG-arkitekturer</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Hva er Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: En komplett guide til agentbasert Retrieval Augmented Generation – Nyheter fra generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: gi RAG-en din et løft med spørringsreformulering og selvspørring! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Legge til agentiske lag i RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Fremtiden for kunnskapsassistenter: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Hvordan bygge agentiske RAG-systemer</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Bruke Microsoft Foundry Agent Service for å skalere AI-agentene dine</a>

### Akademiske artikler

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iterativ forbedring med selvtilbakemelding</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Språkagenter med verbal forsterkningslæring</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Store språkmodeller kan selvkorrigere med verktøy-interaktiv kritikk</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: En oversikt over agentisk RAG</a>

## Forrige leksjon

[Designmønster for verktøybruk](../04-tool-use/README.md)

## Neste leksjon

[Bygge pålitelige AI-agenter](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Ansvarsfraskrivelse:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten Co-op Translator (https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, må du være oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på sitt originale språk bør betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell, menneskelig oversettelse. Vi påtar oss ikke ansvar for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->