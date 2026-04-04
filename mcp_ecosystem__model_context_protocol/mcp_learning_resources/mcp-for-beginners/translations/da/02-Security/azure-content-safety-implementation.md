# Implementering af Azure Content Safety med MCP

> **OWASP MCP Risiko Håndteret**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

For at styrke MCP-sikkerheden mod prompt injection, tool forgiftning og andre AI-specifikke sårbarheder anbefales det stærkt at integrere Azure Content Safety. Denne implementeringsguide er i overensstemmelse med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integration med MCP Server

For at integrere Azure Content Safety med din MCP-server, tilføj content safety-filteret som middleware i din forespørgselsbehandlingspipeline:

1. Initialiser filteret under serverstart
2. Valider alle indkommende tool-forespørgsler før behandling
3. Kontroller alle udgående svar før de returneres til klienter
4. Log og alarmer ved sikkerhedsbrud
5. Implementer passende fejlhåndtering for mislykkede content safety-kontroller

Dette skaber et robust forsvar mod:
- Prompt injection-angreb
- Forsøg på tool forgiftning
- Dataudtræk via skadelige input
- Generering af skadeligt indhold

## Bedste Praksis for Azure Content Safety Integration

1. **Brugerdefinerede Bloklister**: Opret brugerdefinerede bloklister specifikt til MCP injection-mønstre
2. **Sværhedsgrad Justering**: Juster sværhedsgrænser baseret på din specifikke brugssag og risikotolerance
3. **Omfattende Dækning**: Anvend content safety-kontroller på alle input og output
4. **Ydelsesoptimering**: Overvej implementering af caching for gentagne content safety-kontroller
5. **Fallback Mekanismer**: Definer klare fallback-adfærd når content safety-tjenester ikke er tilgængelige
6. **Brugerfeedback**: Giv klar feedback til brugere, når indhold blokeres på grund af sikkerhedsbekymringer
7. **Løbende Forbedring**: Opdater regelmæssigt bloklister og mønstre baseret på nye trusler

## Yderligere Ressourcer

### OWASP MCP Sikkerhedsguidance
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure-implementering
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detaljerede mønstre for mitigering af prompt injection
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktisk Camp 3: I/O Security dækker content safety

### Azure Dokumentation
- [Azure Content Safety Oversigt](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Hvad er Næste Skridt

- Gå tilbage til: [Security Module Overview](./README.md)
- Fortsæt til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på originalsproget bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der måtte opstå ved brug af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->