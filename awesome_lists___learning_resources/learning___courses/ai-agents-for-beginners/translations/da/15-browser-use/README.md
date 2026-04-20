# Bygning af Computer Use Agents (CUA)

Computer use agents kan interagere med websites på samme måde som en person: ved at åbne en browser, inspicere siden og tage den næste bedste handling ud fra det, de ser. I denne lektion vil du bygge en browser-automationsagent, der søger på Airbnb, udtrækker strukturerede listingsdata og identificerer det billigste ophold i Stockholm.

Lektionen kombinerer Browser-Use til AI-drevet navigation, Playwright og Chrome DevTools Protocol (CDP) til browserkontrol, Azure OpenAI til synsbaseret ræsonnering og Pydantic til struktureret udtrækning.

## Introduktion

Denne lektion dækker:

- Forståelse af hvornår computer use agents er en bedre løsning end kun API-automation
- Kombination af Browser-Use med Playwright og CDP til pålidelig browser-lifecycle management
- Brug af Azure OpenAI synsfunktion og struktureret Pydantic output til at udtrække listingsdata fra dynamiske websider
- Beslutning om hvornår man bruger en agent-først, actor-først eller hybrid browserautomationsworkflow

## Læringsmål

Efter at have gennemført denne lektion vil du vide, hvordan du:

- Konfigurerer Browser-Use med Azure OpenAI og Playwright
- Bygger en browserautomationsworkflow, der navigerer på et rigtigt website og håndterer dynamiske UI-elementer
- Udtrækker typede resultater fra synligt sideindhold og omsætter dem til efterfølgende forretningslogik
- Vælger mellem agent- og actor-mønstre baseret på hvor forudsigelig browseropgaven er

## Kodeeksempel

Denne lektion inkluderer én notebook-tutorial:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Starter en Chrome-session over CDP, søger Airbnb efter Stockholm-lister, udtrækker priser med Browser-Use vision og returnerer den billigste mulighed som strukturerede data.

## Forudsætninger

- Python 3.12+
- Azure OpenAI deployment konfigureret i dit miljø
- Chrome eller Chromium installeret lokalt
- Playwright-afhængigheder installeret
- Grundlæggende fortrolighed med asynkron Python

## Opsætning

Installer de pakker, der bruges i notebogen:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Sæt Azure OpenAI miljøvariablerne, der bruges af notebogen:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Valgfrit: standardværdien er den seneste API-version, hvis udeladt
AZURE_OPENAI_API_VERSION=...
```

## Arkitekturoversigt

Notebogen demonstrerer en hybrid browserautomationsworkflow:

1. Chrome startes med CDP aktiveret, så både Playwright og Browser-Use kan dele den samme browsersession.
2. En Browser-Use agent håndterer åbne navigationopgaver som at åbne Airbnb, afvise pop-ups og søge efter Stockholm.
3. Den aktive side inspiceres med et struktureret Pydantic-schema for at udtrække listingtitler, natlige priser, vurderinger og URLs.
4. Python-logik sammenligner de udtrukne listings og fremhæver det billigste resultat.

Denne tilgang bevarer den fleksible, vision-baserede ræsonnering, som Browser-Use er god til, samtidig med at du får deterministisk browserkontrol, når du har brug for det.

## Vigtige konklusioner og bedste praksis

### Hvornår bruges Agent vs Actor

| Scenario | Brug Agent | Brug Actor |
|----------|------------|------------|
| Dynamiske layouts | Ja, AI kan tilpasse sig sideskift | Nej, skrøbelige selektorer kan bryde |
| Kendt struktur | Nej, en agent er langsommere end direkte kontrol | Ja, hurtig og præcis |
| Find elementer | Ja, naturligt sprog fungerer godt | Nej, nøjagtige selektorer kræves |
| Tidsstyring | Nej, mindre forudsigelig | Ja, fuld kontrol over ventetider og retries |
| Komplekse workflows | Ja, håndterer uventede UI-tilstande | Nej, kræver eksplicit branching |

### Browser-Use bedste praksis

1. Start med en agent til udforskning og dynamisk navigation.
2. Skift til direkte sidekontrol når interaktionen bliver forudsigelig.
3. Brug strukturerede outputmodeller så udtrukne data valideres og er typesikre.
4. Tilføj forsinkelser strategisk efter handlinger, der udløser synlige UI-ændringer.
5. Tag skærmbilleder under iterationer for lettere fejlfinding.
6. Forvent, at websites ændrer sig og design fallback-strategier til pop-ups og layoutskift.
7. Bland agent- og actor-mønstre for at opnå både fleksibilitet og præcision.

### Anvendelser i virkeligheden

- Rejsebooking og prisovervågning
- E-handelsprissammenligning og tilgængelighedstjek
- Struktureret udtræk fra dynamiske websites
- Synsbaseret UI-test og verifikation
- Websiteovervågning og alarmering
- Intelligent udfyldning af formularer på tværs af fler-trins flows

## Yderligere ressourcer

- [Browser-Use Playwright integrationsskabelon](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use actor-parametre og indholdsudtræk](https://docs.browser-use.com/customize/actor/all-parameters)
- [Kursusopsætning](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:  
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi stræber efter nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets modersmål bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->