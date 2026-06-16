# Avansert MCP-sikkerhet med Azure Content Safety

> **OWASP MCP-risiko adressert**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety tilbyr flere kraftige verktøy som kan forbedre sikkerheten i dine MCP-implementeringer. For praktisk implementeringserfaring, se [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsofts AI Prompt Shields gir robust beskyttelse mot både direkte og indirekte prompt-injeksjonsangrep gjennom:

1. **Avansert deteksjon**: Bruker maskinlæring for å identifisere ondsinnede instruksjoner innebygd i innhold.
2. **Spotlighting**: Transformerer inndata for å hjelpe AI-systemer å skille mellom gyldige instruksjoner og eksterne input.
3. **Avgrensere og datamerking**: Marker grenser mellom pålitelig og upålitelig data.
4. **Integrering med Content Safety**: Samarbeider med Azure AI Content Safety for å oppdage jailbreak-forsøk og skadelig innhold.
5. **Kontinuerlige oppdateringer**: Microsoft oppdaterer regelmessig beskyttelsesmekanismer mot nye trusler.

## Implementering av Azure Content Safety med MCP

Denne metoden gir flerlaget beskyttelse:
- Skanning av inndata før behandling
- Validering av utdata før retur
- Bruk av blokkeringslister for kjente skadelige mønstre
- Utnyttelse av Azures kontinuerlig oppdaterte innholdssikkerhetsmodeller

## Azure Content Safety-ressurser

For å lære mer om implementering av Azure Content Safety med dine MCP-servere, se disse offisielle ressursene:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Offisiell dokumentasjon for Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Lær hvordan du kan forhindre prompt-injeksjonsangrep.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detaljert API-referanse for implementering av Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Rask implementeringsveiledning ved bruk av C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klientbiblioteker for ulike programmeringsspråk.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Spesifikke retningslinjer for å oppdage og forhindre jailbreak-forsøk.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Beste praksis for effektiv implementering av innholdssikkerhet.

For en mer inngående implementering, se vår [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Hva er neste

- Les: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Gå tilbake til: [Security Module Overview](./README.md)
- Fortsett til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->