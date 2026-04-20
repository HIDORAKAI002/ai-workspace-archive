# Computer Use Agents (CUA) Bouwen

Computer use agents kunnen op websites reageren zoals een persoon dat zou doen: door een browser te openen, de pagina te inspecteren en de beste volgende actie te ondernemen op basis van wat ze zien. In deze les bouw je een browserautomatiseringsagent die zoekt op Airbnb, gestructureerde listinggegevens extraheert en de goedkoopste verblijfplaats in Stockholm identificeert.

De les combineert Browser-Use voor AI-gedreven navigatie, Playwright en Chrome DevTools Protocol (CDP) voor browsercontrole, Azure OpenAI voor visueel ondersteund redeneren en Pydantic voor gestructureerde extractie.

## Introductie

Deze les behandelt:

- Begrijpen wanneer computer use agents beter zijn dan alleen API-automatisering
- Browser-Use combineren met Playwright en CDP voor betrouwbare browser lifecycle management
- Azure OpenAI vision en gestructureerde Pydantic-output gebruiken om listingdata van dynamische webpagina's te extraheren
- Beslissen wanneer je een agent-first, actor-first of hybride browserautomatiseringsworkflow gebruikt

## Leerdoelen

Na het voltooien van deze les weet je hoe je:

- Browser-Use configureert met Azure OpenAI en Playwright
- Een browserautomatiseringsworkflow bouwt die een echte website navigeert en dynamische UI-elementen afhandelt
- Getypte resultaten uit zichtbare paginainhoud extraheert en omzet in downstream business logic
- Kiest tussen agent- en actorpatronen op basis van hoe voorspelbaar de browsertaken zijn

## Voorbeeldcode

Deze les bevat één notebook tutorial:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Start een Chrome-sessie via CDP, zoekt Airbnb listings in Stockholm, extraheert prijzen met Browser-Use vision en geeft de goedkoopste optie terug als gestructureerde data.

## Vereisten

- Python 3.12+
- Azure OpenAI deployment geconfigureerd in je omgeving
- Chrome of Chromium lokaal geïnstalleerd
- Playwright dependencies geïnstalleerd
- Basiskennis van async Python

## Setup

Installeer de pakketten die in de notebook gebruikt worden:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Stel de Azure OpenAI omgevingsvariabelen in die de notebook gebruikt:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Optioneel: standaard wordt de nieuwste API-versie gebruikt als deze wordt weggelaten
AZURE_OPENAI_API_VERSION=...
```

## Architectuuroverzicht

De notebook demonstreert een hybride browserautomatiseringsworkflow:

1. Chrome start met CDP ingeschakeld zodat zowel Playwright als Browser-Use dezelfde browsersessie kunnen delen.
2. Een Browser-Use agent handelt open navigatietaken af zoals Airbnb openen, pop-ups sluiten en zoeken naar Stockholm.
3. De actieve pagina wordt geïnspecteerd met een gestructureerd Pydantic-schema om listingtitels, nachtelijke prijzen, beoordelingen en URL's te extraheren.
4. Pythonlogica vergelijkt de geëxtraheerde listings en markeert het goedkoopste resultaat.

Deze aanpak behoudt het flexibele, op visie gebaseerde redeneren waar Browser-Use sterk in is, terwijl je toch deterministische browsercontrole hebt wanneer nodig.

## Belangrijkste Leerpunten en Best Practices

### Wanneer Agent versus Actor gebruiken

| Scenario | Agent gebruiken | Actor gebruiken |
|----------|-----------------|-----------------|
| Dynamische lay-outs | Ja, AI kan zich aanpassen aan pagina-aanpassingen | Nee, fragiele selectors kunnen breken |
| Bekende structuur | Nee, een agent is trager dan directe controle | Ja, snel en nauwkeurig |
| Elementen vinden | Ja, natuurlijke taal werkt goed | Nee, exacte selectors zijn vereist |
| Timing controle | Nee, minder voorspelbaar | Ja, volledige controle over wachten en herhaling |
| Complexe workflows | Ja, kan onverwachte UI-staten verwerken | Nee, vereist expliciete vertakkingen |

### Browser-Use Best Practices

1. Begin met een agent voor verkenning en dynamische navigatie.
2. Schakel over naar directe paginacontrole zodra de interactie voorspelbaar wordt.
3. Gebruik gestructureerde outputmodellen zodat geëxtraheerde data gevalideerd en type-safe is.
4. Voeg strategisch vertragingen toe na acties die zichtbare UI-veranderingen triggeren.
5. Maak screenshots tijdens iteraties zodat fouten makkelijker te debuggen zijn.
6. Verwacht dat websites veranderen en ontwerp fallbackstrategieën voor pop-ups en layoutverschuivingen.
7. Combineer agent- en actorpatronen voor zowel flexibiliteit als precisie.

### Praktische Toepassingen

- Reisboekingen en prijsmonitoring
- E-commerce prijsvergelijking en beschikbaarheidscontroles
- Gestructureerde extractie van dynamische websites
- Visie-gebaseerde UI testen en verificatie
- Website monitoring en waarschuwingen
- Intelligente formulierinvoer in meerstapsprocessen

## Aanvullende Bronnen

- [Browser-Use Playwright integratietemplate](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use actor parameters en content extractie](https://docs.browser-use.com/customize/actor/all-parameters)
- [Cursus Setup](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel wij streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het oorspronkelijke document in de oorspronkelijke taal moet als de gezaghebbende bron worden beschouwd. Voor kritieke informatie wordt een professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties voortvloeiend uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->