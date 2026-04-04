# Geavanceerde MCP-beveiliging met Azure Content Safety

> **OWASP MCP-risico aangepakt**: [MCP06 - Promptinjectie via contextuele payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety biedt verschillende krachtige hulpmiddelen die de beveiliging van uw MCP-implementaties kunnen verbeteren. Voor praktische implementatie-ervaring, zie [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsoft's AI Prompt Shields bieden robuuste bescherming tegen zowel directe als indirecte promptinjectieaanvallen door:

1. **Geavanceerde detectie**: Gebruikt machine learning om kwaadaardige instructies die in content zijn ingebed te identificeren.
2. **Spotlighting**: Zet invoertekst om om AI-systemen te helpen onderscheid te maken tussen geldige instructies en externe invoer.
3. **Afgrenzers en datamarkering**: Markeert grenzen tussen vertrouwde en niet-vertrouwde gegevens.
4. **Integratie met Content Safety**: Werkt samen met Azure AI Content Safety om jailbreakpogingen en schadelijke inhoud te detecteren.
5. **Continue updates**: Microsoft werkt regelmatig de beschermingsmechanismen bij tegen opkomende bedreigingen.

## Implementatie van Azure Content Safety met MCP

Deze aanpak biedt meervoudige lagen van bescherming:
- Invoer scannen vóór verwerking
- Uitvoer valideren vóór terugkeer
- Gebruik van blokkadelijsten voor bekende schadelijke patronen
- Gebruik maken van Azure's continu bijgewerkte content safety modellen

## Azure Content Safety bronnen

Om meer te leren over het implementeren van Azure Content Safety met uw MCP-servers, raadpleegt u deze officiële bronnen:

1. [Azure AI Content Safety Documentatie](https://learn.microsoft.com/azure/ai-services/content-safety/) - Officiële documentatie voor Azure Content Safety.
2. [Prompt Shield Documentatie](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Leer hoe promptinjectieaanvallen te voorkomen.
3. [Content Safety API Referentie](https://learn.microsoft.com/rest/api/contentsafety/) - Gedetailleerde API-referentie voor het implementeren van Content Safety.
4. [Quickstart: Azure Content Safety met C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Snelle implementatiehandleiding met C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Clientbibliotheken voor diverse programmeertalen.
6. [Detecteren van jailbreakpogingen](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifieke richtlijnen voor het detecteren en voorkomen van jailbreakpogingen.
7. [Best practices voor Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Best practices voor het effectief implementeren van content safety.

Voor een diepgaandere implementatie, zie onze [Azure Content Safety Implementatiegids](./azure-content-safety-implementation.md).

## Wat nu?

- Lees: [Azure Content Safety Implementatie](./azure-content-safety-implementation.md)
- Terug naar: [Overzicht beveiligingsmodule](./README.md)
- Ga verder met: [Module 3: Aan de slag](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, kan het voorkomen dat automatische vertalingen fouten of onnauwkeurigheden bevatten. Het oorspronkelijke document in de originele taal dient als de gezaghebbende bron te worden beschouwd. Voor cruciale informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->