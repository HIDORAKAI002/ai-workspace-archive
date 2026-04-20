# Bygge Computer Use Agents (CUA)

Computer use agents kan samhandle med nettsteder på samme måte som en person ville gjort: ved å åpne en nettleser, inspisere siden, og ta den neste beste handlingen basert på hva de ser. I denne leksjonen skal du bygge en nettleserautomatiseringsagent som søker på Airbnb, trekker ut strukturert listeinformasjon, og identifiserer det billigste oppholdet i Stockholm.

Leksjonen kombinerer Browser-Use for AI-drevet navigasjon, Playwright og Chrome DevTools Protocol (CDP) for nettleserkontroll, Azure OpenAI for visjonsbasert resonnement, og Pydantic for strukturert uttrekk.

## Introduksjon

Denne leksjonen vil dekke:

- Forståelse av når computer use agents er et bedre valg enn kun API-automatisering
- Kombinere Browser-Use med Playwright og CDP for pålitelig styring av nettleserens livssyklus
- Bruke Azure OpenAI visjon og strukturert Pydantic output for å trekke ut listeinformasjon fra dynamiske nettsider
- Å avgjøre når man skal bruke agent-først, aktør-først eller en hybrid nettleserautomatiseringsflyt

## Læringsmål

Etter å ha fullført denne leksjonen vil du kunne:

- Konfigurere Browser-Use med Azure OpenAI og Playwright
- Bygge en nettleserautomatiseringsflyt som navigerer på et ekte nettsted og håndterer dynamiske UI-elementer
- Trekke ut typede resultater fra synlig innhold på sida og bruke dem i videre forretningslogikk
- Velge mellom agent- og aktørmønstre basert på hvor forutsigbar nettleseroppgaven er

## Kodetips

Denne leksjonen inkluderer ett notatbokkurs:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Starter en Chrome-økt over CDP, søker Airbnb etter oppføringer i Stockholm, trekker ut priser med Browser-Use visjon, og returnerer det billigste alternativet som strukturert data.

## Forutsetninger

- Python 3.12+
- Azure OpenAI distribusjon konfigurert i ditt miljø
- Chrome eller Chromium installert lokalt
- Playwright-avhengigheter installert
- Grunnleggende kjennskap til asynkron Python

## Oppsett

Installer pakkene som brukes i notatboken:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Sett Azure OpenAI miljøvariabler som brukes av notatboken:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Valgfritt: bruker som standard den nyeste API-versjonen når den utelates
AZURE_OPENAI_API_VERSION=...
```

## Arkitekturoversikt

Notatboken demonstrerer en hybrid nettleserautomatiseringsflyt:

1. Chrome starter med CDP aktivert slik at både Playwright og Browser-Use kan dele samme nettleserøkt.
2. En Browser-Use agent håndterer åpne navigasjonsoppgaver som å åpne Airbnb, lukke popup-vinduer, og søke etter Stockholm.
3. Den aktive siden inspiseres med et strukturert Pydantic-skjema for å trekke ut tittler, pris per natt, vurderinger og URL-er til oppføringer.
4. Pythonlogikk sammenligner de uttrukne oppføringene og fremhever det billigste resultatet.

Denne tilnærmingen beholder den fleksible, visjonsbaserte resonnementet som Browser-Use er god på, samtidig som du får deterministisk nettleserkontroll når det trengs.

## Viktige punkter og beste praksis

### Når man bør bruke Agent vs Aktør

| Scenario          | Bruk Agent              | Bruk Aktør                      |
|-------------------|------------------------|--------------------------------|
| Dynamiske oppsett  | Ja, AI kan tilpasse seg sideendringer | Nei, skjøre selektorer kan feile |
| Kjent struktur    | Nei, en agent er tregere enn direkte kontroll | Ja, raskt og presist           |
| Finne elementer   | Ja, naturlig språk fungerer godt        | Nei, eksakte selektorer kreves  |
| Tidsstyring      | Nei, mindre forutsigbart                 | Ja, full kontroll over venting og forsøk |
| Komplekse arbeidsflyter | Ja, håndterer uventede UI-tilstander | Nei, krever eksplisitt branching |

### Browser-Use beste praksis

1. Start med en agent for utforskning og dynamisk navigasjon.
2. Bytt til direkte sidestyring når interaksjonen blir forutsigbar.
3. Bruk strukturerte output-modeller slik at dataene som hentes ut valideres og er typtrygge.
4. Legg til forsinkelser strategisk etter handlinger som utløser synlige UI-endringer.
5. Ta skjermbilder underveis slik at feil er enklere å feilsøke.
6. Forvent at nettsteder endres, og design reserveplaner for popup-vinduer og layoutendringer.
7. Bland agent- og aktørmønstre for å oppnå både fleksibilitet og presisjon.

### Virkelige bruksområder

- Reisebestilling og prisovervåkning
- Pris sammenligning og lagerkontroll i netthandel
- Strukturert uttrekk fra dynamiske nettsider
- Visjonsbasert UI-testing og verifisering
- Nettstedsovervåkning og varsling
- Intelligente skjemautfyllinger på tvers av flertrinns prosesser

## Ytterligere ressurser

- [Browser-Use Playwright integrasjon mal](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use aktørparametere og innholdsuttrekk](https://docs.browser-use.com/customize/actor/all-parameters)
- [Kursoppsett](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:  
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->