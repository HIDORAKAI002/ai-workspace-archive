# Implementacija Azure Content Safety s MCP

> **OWASP MCP Rizični Problem**: [MCP06 - Namjerno preusmjeravanje toka](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Kako bi se ojačala sigurnost MCP-a protiv prompt injection napada, trovanja alata i drugih AI-specifičnih ranjivosti, preporučuje se integracija Azure Content Safety. Ovaj vodič za implementaciju usklađen je s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Kampom 3: I/O sigurnost.

## Integracija s MCP Serverom

Za integraciju Azure Content Safety sa svojim MCP serverom, dodajte content safety filter kao middleware u vaš pipeline obrade zahtjeva:

1. Inicijalizirajte filter prilikom pokretanja servera  
2. Validirajte sve dolazne zahtjeve alata prije obrade  
3. Provjerite sve odlazne odgovore prije nego ih vratite klijentima  
4. Zabilježite i upozorite na prekršaje sigurnosti  
5. Implementirajte prikladno rukovanje greškama za neuspjele provjere content safety

Ovo pruža snažnu zaštitu protiv:  
- Prompt injection napada  
- Pokušaja trovanja alata  
- Izlaza podataka putem zlonamjernih unosa  
- Generiranja štetnog sadržaja

## Najbolje prakse za integraciju Azure Content Safety

1. **Prilagođeni bloklisti**: Kreirajte prilagođene blokliste specifično za MCP obrasce injektiranja  
2. **Podešavanje ozbiljnosti**: Prilagodite pragove ozbiljnosti temeljem vašeg specifičnog slučaja i tolerancije rizika  
3. **Sveobuhvatna pokrivenost**: Primijenite provjere content safety na sve unose i izlaze  
4. **Optimizacija performansi**: Razmotrite implementaciju predmemoriranja za ponovljene provjere content safety  
5. **Mehanizmi povratka**: Definirajte jasna ponašanja u slučaju nedostupnosti content safety servisa  
6. **Povratna informacija korisniku**: Osigurajte jasnu povratnu informaciju korisnicima kada je sadržaj blokiran zbog sigurnosnih razloga  
7. **Kontinuirano poboljšanje**: Redovito ažurirajte blokliste i obrasce temeljem novonastalih prijetnji

## Dodatni resursi

### OWASP MCP sigurnosne smjernice
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Opsežan OWASP MCP Top 10 s Azure implementacijom  
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detaljni obrasci ublažavanja prompt injectiona  
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktični Kamp 3: I/O sigurnost pokriva content safety

### Azure dokumentacija
- [Pregled Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Prompt Shields dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Brzi početak s Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Što slijedi

- Povratak na: [Pregled sigurnosnog modula](./README.md)  
- Nastavite na: [Modul 3: Početak rada](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->