# Studieplan Generator met Chainlit & Microsoft Learn Docs MCP

## Vereisten

- Python 3.8 of hoger
- pip (Python package manager)
- Internettoegang om verbinding te maken met de Microsoft Learn Docs MCP-server

## Installatie

1. Clone deze repository of download de projectbestanden.
2. Installeer de benodigde afhankelijkheden:

   ```bash
   pip install -r requirements.txt
   ```

## Gebruik

### Scenario 1: Simpele Query naar Docs MCP
Een commandoregelclient die verbinding maakt met de Docs MCP-server, een query verstuurt en het resultaat afdrukt.

1. Voer het script uit:
   ```bash
   python scenario1.py
   ```
2. Voer je documentatievraag in bij de prompt.

### Scenario 2: Studieplan Generator (Chainlit Web App)
Een web-gebaseerde interface (met Chainlit) waarmee gebruikers een gepersonaliseerd studieplan per week kunnen genereren voor elk technisch onderwerp.

1. Start de Chainlit app:
   ```bash
   chainlit run scenario2.py
   ```
2. Open de lokale URL die in je terminal wordt weergegeven (bijv. http://localhost:8000) in je browser.
3. Voer in het chatvenster je studiethema en het aantal weken dat je wilt studeren in (bijv. "AI-900 certificering, 8 weken").
4. De app reageert met een per week gestructureerd studieplan, inclusief links naar relevante Microsoft Learn documentatie.

**Vereiste Omgevingsvariabelen:**

Om Scenario 2 te gebruiken (de Chainlit web app met Azure OpenAI), moet je de volgende omgevingsvariabelen instellen in een `.env` bestand in de `python` map:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Vul deze waarden in met je Azure OpenAI resource gegevens voordat je de app start.

> [!TIP]
> Je kunt eenvoudig je eigen modellen deployen met [Microsoft Foundry](https://ai.azure.com/).

### Scenario 3: Documentatie in Editor met MCP Server in VS Code

In plaats van van browser-tabblad te wisselen om documentatie te zoeken, kun je Microsoft Learn Docs direct in VS Code gebruiken met de MCP-server. Dit maakt het mogelijk om:
- Documentatie te zoeken en lezen binnen VS Code zonder de programmeeromgeving te verlaten.
- Documentatie verwijzingen toevoegen en links invoegen rechtstreeks in je README of cursusbestanden.
- GitHub Copilot en MCP samen gebruiken voor een naadloze, AI-gestuurde documentatieworkflow.

**Voorbeeldtoepassingen:**
- Snel referentielinks toevoegen aan een README tijdens het schrijven van cursus- of projectdocumentatie.
- Copilot gebruiken om code te genereren en MCP om direct relevante documentatie te vinden en aan te halen.
- Gefocust blijven in je editor en de productiviteit verhogen.

> [!BELANGRIJK]
> Zorg dat je een geldige [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) configuratie in je werkruimte hebt (locatie is `.vscode/mcp.json`).

## Waarom Chainlit voor Scenario 2?

Chainlit is een modern open-source framework voor het bouwen van conversationele webapplicaties. Het maakt het gemakkelijk om chat-gebaseerde gebruikersinterfaces te creëren die verbinding maken met backend services zoals de Microsoft Learn Docs MCP server. Dit project gebruikt Chainlit om een eenvoudige, interactieve manier te bieden om gepersonaliseerde studieplannen in real-time te genereren. Door Chainlit te gebruiken, kun je snel chat-gebaseerde tools bouwen en implementeren die productiviteit en leren verbeteren.

## Wat Dit Doet

Deze app laat gebruikers een gepersonaliseerd studieplan maken door eenvoudig een onderwerp en duur in te voeren. De app verwerkt je invoer, vraagt het Microsoft Learn Docs MCP server om relevante content en organiseert de resultaten in een gestructureerd, per week gesplitst plan. De aanbevelingen per week worden in de chat weergegeven, wat het gemakkelijk maakt om te volgen en je voortgang bij te houden. De integratie zorgt ervoor dat je altijd de nieuwste, meest relevante leermaterialen krijgt.

## Voorbeeldvragen

Probeer deze queries in het chatvenster om te zien hoe de app reageert:

- `AI-900 certificering, 8 weken`
- `Leer Azure Functions, 4 weken`
- `Azure DevOps, 6 weken`
- `Data engineering op Azure, 10 weken`
- `Microsoft security fundamentals, 5 weken`
- `Power Platform, 7 weken`
- `Azure AI services, 12 weken`
- `Cloud architectuur, 9 weken`

Deze voorbeelden tonen de flexibiliteit van de app voor verschillende leerdoelen en tijdsbestekken.

## Referenties

- [Chainlit Documentatie](https://docs.chainlit.io/)
- [MCP Documentatie](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->