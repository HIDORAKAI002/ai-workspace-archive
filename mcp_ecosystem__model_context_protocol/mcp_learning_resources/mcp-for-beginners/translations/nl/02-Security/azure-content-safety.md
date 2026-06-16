# Geavanceerde MCP-beveiliging met Azure Content Safety

> **OWASP MCP-risico aangepakt**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety biedt verschillende krachtige tools die de beveiliging van uw MCP-implementaties kunnen verbeteren. Voor praktische implementatie-ervaring, zie [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsoft's AI Prompt Shields bieden robuuste bescherming tegen zowel directe als indirecte prompt injection-aanvallen door:

1. **Geavanceerde detectie**: Maakt gebruik van machine learning om kwaadaardige instructies in content te identificeren.
2. **Spotlighting**: Transformeert invoertekst om AI-systemen te helpen onderscheid te maken tussen geldige instructies en externe invoer.
3. **Afscheidingstekens en datamerking**: Markeert grenzen tussen vertrouwde en niet-vertrouwde gegevens.
4. **Integratie van Content Safety**: Werkt samen met Azure AI Content Safety om jailbreakpogingen en schadelijke inhoud te detecteren.
5. **Continue updates**: Microsoft werkt beschermingsmechanismen regelmatig bij tegen opkomende bedreigingen.

## Implementatie van Azure Content Safety met MCP

Deze aanpak biedt meervoudige lagen van bescherming:
- Scannen van invoer voordat verwerking plaatsvindt
- Valideren van uitvoer voordat deze wordt geretourneerd
- Gebruik van blokkadelijsten voor bekende schadelijke patronen
- Gebruik van Azure’s continu bijgewerkte content safety-modellen

## Azure Content Safety-bronnen

Om meer te leren over het implementeren van Azure Content Safety met uw MCP-servers, raadpleeg deze officiële bronnen:

1. [Azure AI Content Safety-documentatie](https://learn.microsoft.com/azure/ai-services/content-safety/) - Officiële documentatie voor Azure Content Safety.
2. [Prompt Shield-documentatie](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Leer hoe u prompt injection-aanvallen kunt voorkomen.
3. [Content Safety API-referentie](https://learn.microsoft.com/rest/api/contentsafety/) - Gedetailleerde API-referentie voor het implementeren van Content Safety.
4. [Quickstart: Azure Content Safety met C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Snelle implementatiehandleiding met C#.
5. [Content Safety-clientbibliotheken](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Clientbibliotheken voor diverse programmeertalen.
6. [Detectie van jailbreakpogingen](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifieke richtlijnen voor het detecteren en voorkomen van jailbreakpogingen.
7. [Best practices voor Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Beste praktijken voor een effectieve implementatie van content safety.

Voor een meer diepgaande implementatie, zie onze [Azure Content Safety-implementatiehandleiding](./azure-content-safety-implementation.md).

## Wat is de volgende stap

- Lees: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Terug naar: [Overzicht Beveiligingsmodule](./README.md)
- Ga verder naar: [Module 3: Aan de slag](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->