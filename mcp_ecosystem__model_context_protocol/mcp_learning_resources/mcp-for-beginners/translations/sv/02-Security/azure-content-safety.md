# Avancerad MCP-säkerhet med Azure Content Safety

> **OWASP MCP Risk som adresseras**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety erbjuder flera kraftfulla verktyg som kan förbättra säkerheten i dina MCP-implementationer. För praktisk implementationserfarenhet, se [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsofts AI Prompt Shields ger robust skydd mot både direkta och indirekta promptinjektionsattacker genom:

1. **Avancerad detektion**: Använder maskininlärning för att identifiera skadliga instruktioner inbäddade i innehåll.
2. **Spotlighting**: Omvandlar inmatningstext för att hjälpa AI-system att särskilja giltiga instruktioner från externa indata.
3. **Avgränsare och datamarkering**: Markerar gränser mellan betrodda och icke-betrodda data.
4. **Integration med Content Safety**: Samarbetar med Azure AI Content Safety för att upptäcka jailbreakförsök och skadligt innehåll.
5. **Kontinuerliga uppdateringar**: Microsoft uppdaterar regelbundet skyddsmekanismer mot nya hot.

## Implementering av Azure Content Safety med MCP

Denna metod ger ett flerskiktat skydd:
- Skanning av indata före bearbetning
- Validering av utdata innan de returneras
- Användning av blockeringslistor för kända skadliga mönster
- Utnyttja Azures kontinuerligt uppdaterade modeller för innehållssäkerhet

## Resurser för Azure Content Safety

För att lära dig mer om hur du implementerar Azure Content Safety med dina MCP-servrar, konsultera dessa officiella resurser:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Officiell dokumentation för Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Lär dig hur du förhindrar promptinjektionsattacker.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detaljerad API-referens för att implementera Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Snabbstartsguide för implementation med C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klientbibliotek för olika programmeringsspråk.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifik vägledning för att upptäcka och förhindra jailbreakförsök.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Bästa praxis för effektiv implementation av innehållssäkerhet.

För en mer fördjupad implementation, se vår [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Vad händer härnäst

- Läs: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Återvänd till: [Security Module Overview](./README.md)
- Fortsätt till: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->