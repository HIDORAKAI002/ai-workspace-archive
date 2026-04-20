# Bygga datoranvändaragent (CUA)

Datoranvändaragenter kan interagera med webbplatser på samma sätt som en person skulle göra: genom att öppna en webbläsare, inspektera sidan och ta nästa bästa åtgärd baserat på vad de ser. I denna lektion ska du bygga en webbläsarautomationsagent som söker på Airbnb, extraherar strukturerad lista data och identifierar det billigaste boendet i Stockholm.

Lektion kombinerar Browser-Use för AI-driven navigering, Playwright och Chrome DevTools Protocol (CDP) för webbläsarkontroll, Azure OpenAI för synbaserad resonemang, och Pydantic för strukturerad extraktion.

## Introduktion

Denna lektion täcker:

- Förstå när datoranvändaragenter är ett bättre val än API-endast automation
- Kombinera Browser-Use med Playwright och CDP för pålitlig hantering av webbläsarlivscykeln
- Använda Azure OpenAI vision och strukturerad Pydantic-output för att extrahera lista data från dynamiska webbsidor
- Besluta när man ska använda agent-först, actor-först eller hybrid arbetsflöde för webbläsarautomation

## Lärandemål

Efter att ha slutfört denna lektion kommer du att veta hur man:

- Konfigurerar Browser-Use med Azure OpenAI och Playwright
- Bygger ett arbetsflöde för webbläsarautomation som navigerar på en riktig webbplats och hanterar dynamiska UI-element
- Extraherar typade resultat från synligt sidinnehåll och förvandlar dem till nedströms affärslogik
- Väljer mellan agent- och actor-mönster baserat på hur förutsägbar webbläsaruppgiften är

## Kodexempel

Denna lektion inkluderar en notebook-handledning:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Startar en Chrome-session över CDP, söker Airbnb efter listor i Stockholm, extraherar priser med Browser-Use vision och returnerar det billigaste alternativet som strukturerad data.

## Förutsättningar

- Python 3.12+
- Azure OpenAI-distribution konfigurerad i din miljö
- Chrome eller Chromium installerat lokalt
- Playwright-beroenden installerade
- Grundläggande kännedom om asynkron Python

## Installation

Installera paketen som används i notebooken:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Ange Azure OpenAI-miljövariablerna som notebooken använder:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Valfritt: standardvärde är den senaste API-versionen om det utelämnas
AZURE_OPENAI_API_VERSION=...
```

## Arkitekturöversikt

Notebooken visar ett hybrid arbetsflöde för webbläsarautomation:

1. Chrome startas med CDP aktiverat så att både Playwright och Browser-Use kan dela samma webbläsarsession.
2. En Browser-Use-agent hanterar öppna navigeringsuppgifter som att öppna Airbnb, avvisa pop-ups och söka efter Stockholm.
3. Den aktiva sidan inspekteras med ett strukturerat Pydantic-schema för att extrahera listtitlar, nattliga priser, betyg och URL:er.
4. Python-logik jämför de extraherade listorna och markerar det billigaste resultatet.

Detta tillvägagångssätt behåller den flexibla, synbaserade resonemangsförmågan som Browser-Use är bra på samtidigt som det ger dig deterministisk webbläsarkontroll när du behöver det.

## Viktiga insikter och bästa praxis

### När ska man använda Agent vs Actor

| Scenario | Använd Agent | Använd Actor |
|----------|--------------|--------------|
| Dynamiska layouter | Ja, AI kan anpassa sig till sidförändringar | Nej, sköra selektorer kan gå sönder |
| Känd struktur | Nej, en agent är långsammare än direktkontroll | Ja, snabbt och exakt |
| Hitta element | Ja, naturligt språk fungerar bra | Nej, exakta selektorer krävs |
| Tidskontroll | Nej, mindre förutsägbart | Ja, full kontroll över väntetider och försök |
| Komplexa arbetsflöden | Ja, hanterar oväntade UI-tillstånd | Nej, kräver explicit förgrening |

### Browser-Use bästa praxis

1. Börja med en agent för utforskning och dynamisk navigering.
2. Växla till direkt sidkontroll när interaktionen blir förutsägbar.
3. Använd strukturerade output-modeller så att extraherad data valideras och är typ-säker.
4. Lägg till fördröjningar strategiskt efter åtgärder som triggar synliga UI-förändringar.
5. Ta skärmdumpar under iterationer så att fel är enklare att felsöka.
6. Förvänta dig att webbplatser ändras och designa reservstrategier för pop-ups och layoutförskjutningar.
7. Blanda agent- och actor-mönster för att få både flexibilitet och precision.

### Verkliga tillämpningar

- Resebokning och prisövervakning
- Jämförelse av priser och tillgänglighet inom e-handel
- Strukturerad extraktion från dynamiska webbplatser
- Synmedveten UI-testning och verifiering
- Webbplatsövervakning och varning
- Intelligens fyllda formulär genom flera steg

## Ytterligare resurser

- [Browser-Use Playwright integrationsmall](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use actor paramterar och innehållsextraktion](https://docs.browser-use.com/customize/actor/all-parameters)
- [Kursinställning](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:  
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, vänligen var medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör anses vara den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår från användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->