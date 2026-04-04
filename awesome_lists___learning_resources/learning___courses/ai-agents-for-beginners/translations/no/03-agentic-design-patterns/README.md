[![Hvordan designe gode AI-agenter](../../../translated_images/no/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Klikk på bildet over for å se videoen av denne leksjonen)_
# Prinsipper for AI-agentisk design

## Introduksjon

Det finnes mange måter å tenke på bygging av AI-agentiske systemer på. Gitt at tvetydighet er en egenskap og ikke en feil i design av generativ AI, kan det noen ganger være vanskelig for ingeniører å finne ut hvor de i det hele tatt skal begynne. Vi har laget et sett med menneskesentrerte UX-designprinsipper for å gjøre det mulig for utviklere å bygge kundesentrerte agentiske systemer som løser deres forretningsbehov. Disse designprinsippene er ikke en forskriftsmessig arkitektur, men heller et utgangspunkt for team som definerer og bygger agentopplevelser.

Generelt bør agenter:

- Utvide og skalere menneskelige evner (idémyldring, problemløsning, automatisering, osv.)
- Fylle kunnskapshull (gjøre meg oppdatert på kunnskapsområder, oversettelse, osv.)
- Legge til rette for og støtte samarbeid på de måtene vi som individer foretrekker å jobbe sammen med andre
- Gjøre oss til bedre versjoner av oss selv (f.eks. livscoach/oppgaveleder, hjelpe oss å lære emosjonell regulering og mindfulness-ferdigheter, bygge resiliens, osv.)

## Denne leksjonen vil dekke

- Hva de agentiske designprinsippene er
- Hvilke retningslinjer man bør følge under implementering av disse designprinsippene
- Eksempler på bruk av designprinsippene

## Læringsmål

Etter å ha fullført denne leksjonen vil du kunne:

1. Forklare hva de agentiske designprinsippene er
2. Forklare retningslinjene for bruk av de agentiske designprinsippene
3. Forstå hvordan man bygger en agent ved bruk av de agentiske designprinsippene

## De agentiske designprinsippene

![Agentiske designprinsipper](../../../translated_images/no/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Rom)

Dette er miljøet der agenten opererer. Disse prinsippene informerer hvordan vi designer agenter for samhandling i fysiske og digitale verdener.

- **Forbinder, ikke kollapser** – hjelp til med å koble mennesker til andre mennesker, hendelser og handlingsrettet kunnskap for å muliggjøre samarbeid og tilknytning.
- Agenter bidrar til å koble sammen hendelser, kunnskap og mennesker.
- Agenter bringer mennesker nærmere hverandre. De er ikke designet for å erstatte eller nedvurdere mennesker.
- **Lett tilgjengelig, men av og til usynlig** – agenten opererer stort sett i bakgrunnen og gir oss kun et puff når det er relevant og hensiktsmessig.
  - Agenten er lett å oppdage og tilgjengelig for autoriserte brukere på hvilken som helst enhet eller plattform.
  - Agenten støtter multimodale input og output (lyd, tale, tekst, osv.).
  - Agenten kan sømløst skifte mellom forgrunn og bakgrunn; mellom proaktiv og reaktiv, avhengig av oppfattelsen av brukerens behov.
  - Agenten kan operere i usynlig form, men dens bakgrunnsprosess og samarbeid med andre agenter er transparent og kontrollerbart av brukeren.

### Agent (Tid)

Dette er hvordan agenten opererer over tid. Disse prinsippene informerer hvordan vi designer agenter som samhandler på tvers av fortid, nåtid og framtid.

- **Fortid**: Reflektere over historien som inkluderer både tilstand og kontekst.
  - Agenten gir mer relevante resultater basert på analyse av rikere historiske data utover selve hendelsen, menneskene eller tilstandene.
  - Agenten skaper koblinger fra tidligere hendelser og reflekterer aktivt over minner for å engasjere seg i nåværende situasjoner.
- **Nåtid**: Pushe mer enn å varsle.
  - Agenten legemliggjør en helhetlig tilnærming til samhandling med mennesker. Når en hendelse skjer, går agenten utover statisk varsling eller annen formell statisk form. Agenten kan forenkle prosesser eller dynamisk generere signaler for å rette brukerens oppmerksomhet på rett tidspunkt.
  - Agenten leverer informasjon basert på kontekstuell miljø, sosiale og kulturelle endringer, og tilpasset brukerens intensjon.
  - Agentens samhandling kan være gradvis, utvikle/øke i kompleksitet for å gi brukerne styrke over tid.
- **Framtid**: Tilpasse og utvikle seg.
  - Agenten tilpasser seg ulike enheter, plattformer og modaliteter.
  - Agenten tilpasser seg brukerens atferd, tilgjengelighetsbehov, og kan fritt tilpasses.
  - Agenten formes av og utvikler seg gjennom kontinuerlig brukerinteraksjon.

### Agent (Kjerne)

Dette er nøkkelelementene i kjernen av en agents design.

- **Omfavn usikkerhet, men etabler tillit**.
  - Et visst nivå av usikkerhet i agenten forventes. Usikkerhet er et nøkkel-element i agentdesign.
  - Tillit og åpenhet er grunnleggende lag i agentdesign.
  - Mennesker har kontroll over når agenten er på/av, og agentens status er alltid tydelig synlig.

## Retningslinjer for implementering av disse prinsippene

Når du bruker de forannevnte designprinsippene, benytt følgende retningslinjer:

1. **Åpenhet**: Informer brukeren om at AI er involvert, hvordan det fungerer (inkludert tidligere handlinger), og hvordan man gir tilbakemeldinger og modifiserer systemet.
2. **Kontroll**: Gi brukeren mulighet til å tilpasse, spesifisere preferanser og personalisere, samt ha kontroll over systemet og dets attributter (inkludert mulighet til å glemme).
3. **Konsistens**: Sikre konsistente, multimodale opplevelser på tvers av enheter og endepunkter. Bruk kjente UI/UX-elementer der det er mulig (f.eks. mikrofonikon for taleinteraksjon) og reduser brukerens kognitive belastning så mye som mulig (f.eks. streb etter konsise svar, visuelle hjelpemidler og "Lær mer"-innhold).

## Hvordan designe en reiseagent ved bruk av disse prinsippene og retningslinjene

Tenk deg at du designer en reiseagent, her er hvordan du kan tenke omkring bruk av designprinsippene og retningslinjene:

1. **Åpenhet** – La brukeren vite at Reiseagenten er en AI-aktivert agent. Gi noen grunnleggende instruksjoner om hvordan man kommer i gang (f.eks. en "Hei"-melding, eksempelspørsmål). Dokumenter dette tydelig på produktsiden. Vis listen over spørsmål brukeren har stilt tidligere. Gjør det klart hvordan man gir tilbakemelding (tommel opp/ned, knapp for Send tilbakemelding, osv.). Tydeliggjør eventuelle bruks- eller emnebegrensninger for agenten.
2. **Kontroll** – Sørg for at det er klart hvordan brukeren kan endre agenten etter at den er opprettet via for eksempel System Prompt. La brukeren velge hvor detaljert agenten skal være, agentens skrivestil, og eventuelle forbehold om hva agenten ikke skal ta opp. Gi mulighet til å se og slette tilknyttede filer eller data, spørsmål og tidligere samtaler.
3. **Konsistens** – Sørg for at ikonene for Del prompt, legg til fil eller bilde og merk noen eller noe er standard og gjenkjennelige. Bruk bindersikon for å indikere filopplasting/deling med agenten, og et bildeikon for opplasting av grafikk.

## Eksempelkoder

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Har du flere spørsmål om AI-agentiske designmønstre?

Bli med i [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) for å møte andre lærende, delta på kontortid og få svar på dine spørsmål om AI-agenter.

## Tilleggsressurser

- <a href="https://openai.com" target="_blank">Praksis for styring av agentiske AI-systemer | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">HAX Toolkit-prosjektet - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Responsible AI Toolbox</a>

## Forrige leksjon

[Utforske agentiske rammeverk](../02-explore-agentic-frameworks/README.md)

## Neste leksjon

[Designmønster for verktøybruk](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det originale dokumentet på dets opprinnelige språk skal anses som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->