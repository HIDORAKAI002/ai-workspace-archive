# Avanceret MCP-sikkerhed med Azure Content Safety

> **OWASP MCP-risiko adresseret**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety tilbyder flere kraftfulde værktøjer, der kan forbedre sikkerheden i dine MCP-implementeringer. For praktisk implementeringserfaring, se [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsofts AI Prompt Shields giver robust beskyttelse mod både direkte og indirekte prompt injection-angreb gennem:

1. **Avanceret detektion**: Bruger maskinlæring til at identificere ondsindede instruktioner indlejret i indhold.
2. **Spotlighting**: Transformerer inputtekst for at hjælpe AI-systemer med at skelne mellem gyldige instruktioner og eksterne input.
3. **Afgrænsere og datamarkering**: Marker grænser mellem betroede og ikke-betroede data.
4. **Integration med Content Safety**: Arbejder sammen med Azure AI Content Safety for at opdage jailbreak-forsøg og skadeligt indhold.
5. **Løbende opdateringer**: Microsoft opdaterer regelmæssigt beskyttelsesmekanismer mod nye trusler.

## Implementering af Azure Content Safety med MCP

Denne tilgang giver flerlagsbeskyttelse:
- Scanning af input før behandling
- Validering af output før returnering
- Brug af blokeringslister for kendte skadelige mønstre
- Udnyttelse af Azures kontinuerligt opdaterede content safety-modeller

## Azure Content Safety-ressourcer

For at lære mere om implementering af Azure Content Safety med dine MCP-servere, se disse officielle ressourcer:

1. [Azure AI Content Safety-dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Officiel dokumentation for Azure Content Safety.
2. [Prompt Shield-dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Lær, hvordan man forhindrer prompt injection-angreb.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detaljeret API-reference til implementering af Content Safety.
4. [Quickstart: Azure Content Safety med C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Hurtig implementeringsvejledning med C#.
5. [Content Safety-klientbiblioteker](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klientbiblioteker til forskellige programmeringssprog.
6. [Detektion af jailbreak-forsøg](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifik vejledning i at opdage og forhindre jailbreak-forsøg.
7. [Bedste praksis for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Bedste praksis for effektiv implementering af content safety.

For en mere dybdegående implementering, se vores [Azure Content Safety-implementeringsguide](./azure-content-safety-implementation.md).

## Hvad er næste skridt

- Læs: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Vend tilbage til: [Security Module Overview](./README.md)
- Fortsæt til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der måtte opstå som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->