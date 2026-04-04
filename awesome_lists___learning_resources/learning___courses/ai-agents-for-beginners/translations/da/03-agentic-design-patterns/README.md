[![Hvordan man designer gode AI-agenter](../../../translated_images/da/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Klik på billedet ovenfor for at se video af denne lektion)_
# Principper for agentisk AI-design

## Introduktion

Der er mange måder at tænke på opbygning af agentiske AI-systemer. I betragtning af at tvetydighed er en egenskab og ikke en fejl i design af generativ AI, kan det nogle gange være svært for ingeniører at finde ud af, hvor de overhovedet skal begynde. Vi har skabt et sæt menneskecentrerede UX-designprincipper for at gøre det muligt for udviklere at bygge kundecentrerede agentiske systemer, der løser deres forretningsbehov. Disse designprincipper er ikke en forskriftsmæssig arkitektur, men snarere et udgangspunkt for teams, der definerer og bygger agentoplevelser.

Generelt bør agenter:

- Udvide og skalere menneskelige kapaciteter (brainstorming, problemløsning, automatisering osv.)
- Udfylde videnshuller (sætte mig ind i vidensdomæner, oversættelse osv.)
- Fremme og understøtte samarbejde på de måder, vi som individer foretrækker at arbejde med andre
- Gøre os til bedre udgaver af os selv (fx livscoach/opgavemester, hjælpe os med at lære følelsesregulering og mindfulness-færdigheder, opbygge robusthed osv.)

## Denne lektion vil dække

- Hvad de agentiske designprincipper er
- Hvad nogle retningslinjer er at følge, mens man implementerer disse designprincipper
- Nogle eksempler på brug af designprincipperne

## Læringsmål

Efter at have gennemført denne lektion vil du være i stand til:

1. Forklare hvad de agentiske designprincipper er
2. Forklare retningslinjerne for brug af de agentiske designprincipper
3. Forstå hvordan man bygger en agent ved hjælp af de agentiske designprincipper

## De agentiske designprincipper

![Agentiske designprincipper](../../../translated_images/da/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Rum)

Dette er miljøet, hvor agenten opererer. Disse principper informerer, hvordan vi designer agenter til at engagere sig i fysiske og digitale verdener.

- **Forbinder, ikke erstatter** – hjælp med at forbinde mennesker til andre mennesker, begivenheder og handlingsrettet viden for at muliggøre samarbejde og forbindelse.
- Agenter hjælper med at forbinde begivenheder, viden og mennesker.
- Agenter bringer mennesker tættere sammen. De er ikke designet til at erstatte eller nedgøre mennesker.
- **Let tilgængelig, men lejlighedsvis usynlig** – agenten fungerer i høj grad i baggrunden og skubber kun til os, når det er relevant og passende.
  - Agenten er let at opdage og tilgængelig for autoriserede brugere på alle enheder eller platforme.
  - Agenten understøtter multimodale input og output (lyd, stemme, tekst osv.).
  - Agenten kan sømløst skifte mellem forgrund og baggrund; mellem proaktiv og reaktiv, afhængigt af dens opfattelse af brugerens behov.
  - Agenten kan fungere i usynlig form, men dens baggrundsprocessti og samarbejde med andre Agenter er gennemsigtige for og kan kontrolleres af brugeren.

### Agent (Tid)

Dette er, hvordan agenten opererer over tid. Disse principper informerer, hvordan vi designer agenter, der interagerer på tværs af fortid, nutid og fremtid.

- **Fortid**: Reflektere over historie, der inkluderer både tilstand og kontekst.
  - Agenten leverer mere relevante resultater baseret på analyse af rigere historiske data ud over kun begivenheden, personer eller tilstande.
  - Agenten skaber forbindelser fra tidligere begivenheder og reflekterer aktivt over hukommelse for at engagere sig i nuværende situationer.
- **Nu**: Skubbe til mere end blot at underrette.
  - Agenten personificerer en omfattende tilgang til interaktion med mennesker. Når en begivenhed sker, går Agenten ud over statisk underretning eller anden statisk formalitet. Agenten kan forenkle flows eller dynamisk generere cues for at rette brugerens opmærksomhed på det rette tidspunkt.
  - Agenten leverer information baseret på den kontekstuelle kontekst, sociale og kulturelle ændringer og skræddersyet til brugerens intention.
  - Agentinteraktion kan være gradvis og vokse i kompleksitet for at styrke brugerne på lang sigt.
- **Fremtid**: Tilpasse og udvikle sig.
  - Agenten tilpasser sig forskellige enheder, platforme og modaliteter.
  - Agenten tilpasser sig brugeradfærd, tilgængelighedsbehov og er frit tilpasselig.
  - Agenten formes af og udvikler sig gennem kontinuerlig brugerinteraktion.

### Agent (Kerne)

Dette er nøgleelementerne i kernen af en agents design.

- **Omfavn usikkerhed men etabler tillid**.
  - Et vist niveau af usikkerhed hos Agenten forventes. Usikkerhed er et nøgleelement i agentdesign.
  - Tillid og gennemsigtighed er grundlæggende lag i agentdesign.
  - Mennesker har kontrol over, hvornår Agenten er tændt/slukket, og Agentens status er tydeligt synlig til enhver tid.

## Retningslinjer til implementering af disse principper

Når du bruger de tidligere designprincipper, brug følgende retningslinjer:

1. **Gennemsigtighed**: Informer brugeren om, at AI er involveret, hvordan det fungerer (herunder tidligere handlinger), og hvordan man giver feedback og ændrer systemet.
2. **Kontrol**: Giv brugeren mulighed for at tilpasse, angive præferencer og personliggøre, samt have kontrol over systemet og dets egenskaber (inklusive muligheden for at glemme).
3. **Konsistens**: Stræb efter konsistente, multimodale oplevelser på tværs af enheder og endepunkter. Brug velkendte UI/UX-elementer hvor muligt (fx mikrofonikon til stemmeinteraktion) og reducer kundens kognitive belastning så meget som muligt (fx sigt efter korte svar, visuelle hjælpemidler og 'Lær mere'-indhold).

## Hvordan man designer en rejseagent ved hjælp af disse principper og retningslinjer

Forestil dig, at du designer en rejseagent; her er, hvordan du kan tænke på at bruge designprincipperne og retningslinjerne:

1. **Gennemsigtighed** – Lad brugeren vide, at rejseagenten er en AI-aktiveret agent. Giv nogle grundlæggende instruktioner om, hvordan man kommer i gang (fx en “Hej”-besked, eksempelprompter). Dokumenter dette tydeligt på produktsiden. Vis listen over prompts, en bruger har stillet tidligere. Gør det klart, hvordan man giver feedback (tommel op og tommel ned, knappen Send feedback osv.). Angiv tydeligt, hvis Agenten har brugs- eller emnerestriktioner.
2. **Kontrol** – Sørg for, at det er klart, hvordan brugeren kan ændre Agenten, efter den er blevet oprettet, med ting som System Prompt. Giv brugeren mulighed for at vælge, hvor ordrig Agenten er, dens skrivestil og eventuelle forbehold for, hvad Agenten ikke bør tale om. Tillad brugeren at se og slette tilknyttede filer eller data, prompts og tidligere samtaler.
3. **Konsistens** – Sørg for, at ikonerne for Share Prompt, tilføj en fil eller foto og tag nogen eller noget er standard og genkendelige. Brug papirclipsikonet til at indikere filupload/deling med Agenten, og et billedikon til at indikere grafikupload.

## Eksempelkoder

- Python: [Agent-rammeværk](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent-rammeværk](./code_samples/03-dotnet-agent-framework.md)


## Har du flere spørgsmål om agentiske AI-designmønstre?

Deltag i [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) for at møde andre lærende, deltage i kontortimer og få dine spørgsmål om AI-agenter besvaret.

## Yderligere ressourcer

- <a href="https://openai.com" target="_blank">Praksisser for styring af agentiske AI-systemer | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">HAX Toolkit-projektet - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Ansvarlig AI-værktøjskasse</a>

## Forrige lektion

[Udforskning af agentiske rammeværk](../02-explore-agentic-frameworks/README.md)

## Næste lektion

[Designmønster for værktøjsbrug](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiske oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på originalsproget bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi kan ikke holdes ansvarlige for eventuelle misforståelser eller fejltolkninger, der måtte opstå som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->