# Implementacija Azure Content Safety s MCP-om

> **OWASP MCP Rizik koji se rješava**: [MCP06 - Prompt Injection preko kontekstualnih podataka](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Za jačanje sigurnosti MCP-a protiv prompt injection napada, trovanja alata i drugih ranjivosti specifičnih za AI, snažno se preporučuje integracija Azure Content Safety. Ovaj vodič za implementaciju usklađen je s [MCP Security Summit radionicom (Sherpa)](https://azure-samples.github.io/sherpa/) Kamp 3: I/O Sigurnost.

## Integracija s MCP serverom

Za integraciju Azure Content Safety s vašim MCP serverom, dodajte content safety filter kao middleware u vaš pipeline obrade zahtjeva:

1. Inicijalizirajte filter prilikom pokretanja servera
2. Validirajte sve dolazne zahtjeve prema alatima prije obrade
3. Provjerite sve izlazne odgovore prije nego ih vratite klijentima
4. Zabilježite i upozorite na kršenja sigurnosti
5. Implementirajte odgovarajuće rukovanje greškama za neuspjele provjere sadržaja

Ova implementacija pruža snažnu zaštitu protiv:
- Napada prompt injection
- Pokušaja trovanja alata
- Eksfiltracije podataka putem zlonamjernih unosa
- Generiranja štetnog sadržaja

## Najbolje prakse za integraciju Azure Content Safety

1. **Prilagođeni blocklistovi**: Kreirajte prilagođene blocklistove posebno za MCP obrasce injekcija
2. **Podešavanje težine**: Prilagodite pragove težine prema svojem specifičnom slučaju uporabe i toleranciji rizika
3. **Sveobuhvatna pokrivenost**: Primijenite provjere sigurnosti sadržaja na sve unose i izlaze
4. **Optimizacija performansi**: Razmotrite implementaciju keširanja za ponovljene provjere sadržaja
5. **Mehanizmi za rezervni scenarij**: Definirajte jasne postupke u slučaju nedostupnosti content safety servisa
6. **Povratna informacija korisnicima**: Pružite jasnu povratnu informaciju korisnicima kada je sadržaj blokiran zbog sigurnosnih razloga
7. **Kontinuirano poboljšanje**: Redovito ažurirajte blocklistove i obrasce prema novim prijetnjama

## Dodatni resursi

### OWASP MCP smjernice za sigurnost
- [OWASP MCP Azure vodič za sigurnost](https://microsoft.github.io/mcp-azure-security-guide/) - Sveobuhvatni OWASP MCP Top 10 s Azure implementacijom
- [MCP06 - Prompt injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detaljni obrasci ublažavanja prompt injectiona
- [MCP Security Summit radionica](https://azure-samples.github.io/sherpa/) - Praktični Kamp 3: I/O Sigurnost pokriva content safety

### Azure dokumentacija
- [Pregled Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentacija o Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Što slijedi

- Povratak na: [Pregled sigurnosnog modula](./README.md)
- Nastavak na: [Modul 3: Početak rada](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o odricanju odgovornosti**:
Ovaj dokument preveden je korištenjem AI usluge za prevođenje [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakva nesporazuma ili kriva tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->