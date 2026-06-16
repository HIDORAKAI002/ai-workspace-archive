# Avanceret MCP-sikkerhed med Azure Content Safety

> **OWASP MCP-risiko adresseret**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety tilbyder flere kraftfulde værktøjer, der kan forbedre sikkerheden i dine MCP-implementeringer. For praktisk implementeringserfaring, se [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsofts AI Prompt Shields leverer robust beskyttelse mod både direkte og indirekte prompt-injektionsangreb gennem:

1. **Avanceret detektion**: Bruger maskinlæring til at identificere ondsindede instruktioner indlejret i indhold.
2. **Spotlighting**: Omformer inputtekst for at hjælpe AI-systemer med at skelne mellem gyldige instruktioner og eksterne input.
3. **Afgrænsere og datamarkering**: Marker grænser mellem betroede og utroværdige data.
4. **Integration med Content Safety**: Arbejder sammen med Azure AI Content Safety for at opdage jailbreak-forsøg og skadeligt indhold.
5. **Løbende opdateringer**: Microsoft opdaterer regelmæssigt beskyttelsesmekanismer mod nye trusler.

## Implementering af Azure Content Safety med MCP

Denne tilgang giver beskyttelse i flere lag:
- Scanning af input før behandling
- Validering af output før returnering
- Brug af blokeringslister for kendte skadelige mønstre
- Udnyttelse af Azures løbende opdaterede modeller for indholdssikkerhed

## Azure Content Safety-ressourcer

For at lære mere om implementering af Azure Content Safety med dine MCP-servere, konsulter disse officielle ressourcer:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Officiel dokumentation for Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Lær hvordan du forhindrer prompt-injektionsangreb.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detaljeret API-reference til implementering af Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Hurtig implementeringsvejledning ved brug af C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klientbiblioteker til forskellige programmeringssprog.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifik vejledning til at opdage og forhindre jailbreak-forsøg.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Bedste praksis for effektiv implementering af indholdssikkerhed.

For en mere dybdegående implementering, se vores [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Hvad er næste skridt

- Læs: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Tilbage til: [Security Module Overview](./README.md)
- Fortsæt til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->