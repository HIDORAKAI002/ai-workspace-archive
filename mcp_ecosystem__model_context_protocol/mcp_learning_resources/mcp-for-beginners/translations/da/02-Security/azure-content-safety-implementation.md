# Implementering af Azure Content Safety med MCP

> **OWASP MCP Risiko Adresseret**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

For at styrke MCP-sikkerheden mod prompt-injektion, værktøjsforgiftning og andre AI-specifikke sårbarheder anbefales det kraftigt at integrere Azure Content Safety. Denne implementeringsguide er i overensstemmelse med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integration med MCP Server

For at integrere Azure Content Safety med din MCP-server skal du tilføje content safety-filteret som middleware i din anmodningsbehandlingspipeline:

1. Initialiser filteret under serverens opstart
2. Valider alle indkommende værktøjsanmodninger før behandling
3. Tjek alle udgående svar, før de returneres til klienter
4. Log og alarmer ved sikkerhedsbrud
5. Implementer passende fejlhåndtering for mislykkede content safety-tjek

Dette giver et robust forsvar mod:
- Prompt-injektionsangreb
- Forsøg på værktøjsforgiftning
- Dataudtræk via ondsindede input
- Produktion af skadeligt indhold

## Bedste praksis for Azure Content Safety-integration

1. **Brugerdefinerede blokeringslister**: Opret brugerdefinerede blokeringslister specifikt til MCP-injektionsmønstre
2. **Justering af alvorlighed**: Tilpas alvorlighedstærskler baseret på din specifikke anvendelse og risikotolerance
3. **Omfattende dækning**: Anvend content safety-kontroller på alle input og output
4. **Ydelsesoptimering**: Overvej at implementere caching for gentagne content safety-tjek
5. **Fallback-mekanismer**: Definér klare fallback-adfærd, når content safety-tjenester ikke er tilgængelige
6. **Brugerfeedback**: Giv klar feedback til brugere, når indhold blokeres på grund af sikkerhedsbekymringer
7. **Løbende forbedring**: Opdater regelmæssigt blokeringslister og mønstre baseret på nye trusler

## Yderligere ressourcer

### OWASP MCP sikkerhedsguidance
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure-implementering
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detaljerede mønstre til at afbøde prompt-injektion
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktisk Camp 3: I/O Security dækker content safety

### Azure Dokumentation
- [Azure Content Safety Oversigt](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Hvad er næste skridt

- Gå tilbage til: [Security Module Overview](./README.md)
- Fortsæt til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->