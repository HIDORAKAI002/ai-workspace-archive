# Avancerad MCP-säkerhet med Azure Content Safety

> **OWASP MCP Risk Addressed**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety erbjuder flera kraftfulla verktyg som kan förbättra säkerheten i dina MCP-implementationer. För praktisk erfarenhet av implementation, se [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsofts AI Prompt Shields ger robust skydd mot både direkta och indirekta attacker med promptinjektion genom:

1. **Avancerad Detektion**: Använder maskininlärning för att identifiera skadliga instruktioner inbäddade i innehåll.
2. **Spotlighting**: Omvandlar inmatad text för att hjälpa AI-system att skilja mellan giltiga instruktioner och externa indata.
3. **Avgränsare och Datamarkering**: Markerar gränser mellan betrodd och obetrodd data.
4. **Integration med Content Safety**: Samarbetar med Azure AI Content Safety för att upptäcka jailbreak-försök och skadligt innehåll.
5. **Kontinuerliga Uppdateringar**: Microsoft uppdaterar regelbundet skyddsmekanismer mot framväxande hot.

## Implementera Azure Content Safety med MCP

Denna metod ger flerskiktat skydd:
- Skanning av indata innan bearbetning
- Validering av utdata innan återlämning
- Användning av blocklistor för kända skadliga mönster
- Utnyttjande av Azures kontinuerligt uppdaterade innehållssäkerhetsmodeller

## Resurser för Azure Content Safety

För att lära dig mer om att implementera Azure Content Safety med dina MCP-servrar, konsultera dessa officiella resurser:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Officiell dokumentation för Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Lär dig hur du förhindrar attacker med promptinjektion.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detaljerad API-referens för implementering av Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Snabbstartsguide för implementation med C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klientbibliotek för olika programspråk.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifik vägledning för att upptäcka och förhindra jailbreak-försök.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Bästa praxis för att effektivt implementera innehållssäkerhet.

För en mer djupgående implementation, se vår [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Vad är nästa steg

- Läs: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Gå tillbaka till: [Security Module Overview](./README.md)
- Fortsätt till: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig observera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för missförstånd eller feltolkningar som uppstår vid användning av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->