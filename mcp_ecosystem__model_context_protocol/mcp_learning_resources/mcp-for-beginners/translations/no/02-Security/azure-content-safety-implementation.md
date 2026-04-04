# Implementering av Azure Content Safety med MCP

> **OWASP MCP Risiko Adresse**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

For å styrke MCP-sikkerheten mot prompt-injeksjon, verktøyforgiftning og andre AI-spesifikke sårbarheter, anbefales det sterkt å integrere Azure Content Safety. Denne implementeringsveiledningen samsvarer med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integrasjon med MCP-server

For å integrere Azure Content Safety med MCP-serveren din, legg til content safety-filteret som middleware i forespørselsbehandlingsrøret:

1. Initialiser filteret under serveroppstart
2. Valider alle innkommende verktøyforespørsler før behandling
3. Sjekk alle utgående svar før de returneres til klienter
4. Loggfør og varsle om sikkerhetsbrudd
5. Implementer passende feilbehandling for mislykkede content safety-sjekker

Dette gir et robust forsvar mot:
- Prompt-injeksjonsangrep
- Forsøk på verktøyforgiftning
- Datautslipp via ondsinnede input
- Generering av skadelig innhold

## Beste praksis for integrering av Azure Content Safety

1. **Egendefinerte blokkeringlister**: Lag egendefinerte blokkeringlister spesielt for MCP-injeksjonsmønstre
2. **Alvorlighetsjustering**: Juster alvorlighetsgrenser basert på ditt spesifikke bruksområde og risikotoleranse
3. **Omfattende dekning**: Bruk content safety-sjekker på alle input og output
4. **Ytelsesoptimalisering**: Vurder å implementere caching for gjentatte content safety-sjekker
5. **Fallback-mekanismer**: Definer klare fallback-adferder når content safety-tjenester ikke er tilgjengelige
6. **Brukerfeedback**: Gi tydelig tilbakemelding til brukere når innhold blokkeres av sikkerhetsgrunner
7. **Kontinuerlig forbedring**: Oppdater regelmessig blokkeringlister og mønstre basert på nye trusler

## Ekstra ressurser

### OWASP MCP sikkerhetsveiledning
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure-implementering
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detaljerte mønstre for mitigering av prompt-injeksjon
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktisk Camp 3: I/O Security dekker content safety

### Azure dokumentasjon
- [Oversikt over Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentasjon for Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Hva skjer videre

- Gå tilbake til: [Security Module Overview](./README.md)
- Fortsett til: [Modul 3: Komme i gang](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->