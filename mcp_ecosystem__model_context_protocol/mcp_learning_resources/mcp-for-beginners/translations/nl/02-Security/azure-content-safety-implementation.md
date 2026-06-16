# Implementatie van Azure Content Safety met MCP

> **OWASP MCP Risico Aangepakt**: [MCP06 - Intentiestroom Subversie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Om de beveiliging van MCP te versterken tegen promptinvoer, toolvergiftiging en andere AI-specifieke kwetsbaarheden, wordt het sterk aanbevolen om Azure Content Safety te integreren. Deze implementatiehandleiding is in lijn met het [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Kamp 3: I/O Security.

## Integratie met MCP Server

Om Azure Content Safety te integreren met je MCP-server, voeg de content safety-filter toe als middleware in je verzoekverwerkingspipeline:

1. Initialiseer de filter tijdens het opstarten van de server  
2. Valideer alle inkomende toolverzoeken voordat ze worden verwerkt  
3. Controleer alle uitgaande reacties voordat ze aan cliënten worden geretourneerd  
4. Log en waarschuw bij overtredingen van de veiligheid  
5. Implementeer passende foutafhandeling voor mislukte content safety-controles  

Dit biedt een robuuste verdediging tegen:  
- Promptinvoer-aanvallen  
- Pogingen tot toolvergiftiging  
- Exfiltratie van gegevens via kwaadaardige invoer  
- Generatie van schadelijke inhoud  

## Beste Praktijken voor Azure Content Safety Integratie

1. **Aangepaste Bloklijsten**: Maak aangepaste bloklijsten specifiek voor MCP-injectiepatronen  
2. **Gradering van Ernst**: Stel ernstgrenzen af op basis van je specifieke gebruiksscenario en risicotolerantie  
3. **Uitgebreide Dekking**: Pas content safety-controles toe op alle invoer en uitvoer  
4. **Prestatieoptimalisatie**: Overweeg caching voor herhaalde content safety-controles  
5. **Fallback-Mechanismen**: Definieer duidelijke fallback-gedragingen wanneer content safety-diensten niet beschikbaar zijn  
6. **Gebruikersfeedback**: Geef heldere feedback aan gebruikers wanneer inhoud wordt geblokkeerd vanwege veiligheidsredenen  
7. **Continue Verbetering**: Werk bloklijsten en patronen regelmatig bij op basis van opkomende bedreigingen  

## Aanvullende Bronnen

### OWASP MCP Beveiligingsrichtlijnen
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Uitgebreide OWASP MCP Top 10 met Azure-implementatie  
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Gedetailleerde mitigatiepatronen voor promptinvoer  
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktisch Kamp 3: I/O Security behandelt content safety  

### Azure Documentatie
- [Azure Content Safety Overzicht](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Prompt Shields Documentatie](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Wat Nu?

- Terug naar: [Security Module Overview](./README.md)  
- Ga verder naar: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->