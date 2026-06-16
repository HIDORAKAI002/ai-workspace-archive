# Napredna MCP sigurnost s Azure Content Safety

> **OWASP MCP Risiko kojeg se rješava**: [MCP06 - Namjenska manipulacija toka](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety pruža nekoliko moćnih alata koji mogu poboljšati sigurnost vaših MCP implementacija. Za praktično iskustvo implementacije, pogledajte [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Kamp 3: I/O sigurnost.

## Prompt Shields

Microsoftovi AI Prompt Shieldsi pružaju snažnu zaštitu od izravnih i neizravnih napada ubacivanja prompta kroz:

1. **Napredno otkrivanje**: Koristi strojno učenje za prepoznavanje zlonamjernih uputa ugrađenih u sadržaj.
2. **Isticanje**: Transformira ulazni tekst kako bi AI sustavi lakše razlikovali valjane upute od vanjskih unosa.
3. **Ograničivači i označavanje podataka**: Označava granice između pouzdanih i nepouzdanih podataka.
4. **Integracija s Content Safety**: Radi s Azure AI Content Safety kako bi otkrio pokušaje zaobilaženja i štetni sadržaj.
5. **Kontinuirana ažuriranja**: Microsoft redovito ažurira mehanizme zaštite od novih prijetnji.

## Implementacija Azure Content Safety s MCP

Ovaj pristup pruža višeslojnu zaštitu:
- Skeniranje unosa prije obrade
- Validacija izlaza prije vraćanja
- Korištenje blok-lista za poznate štetne obrasce
- Iskorištavanje stalno ažuriranih modela sadržajne sigurnosti Azurea

## Resursi za Azure Content Safety

Za više informacija o implementaciji Azure Content Safety s vašim MCP serverima, pogledajte ove službene izvore:

1. [Azure AI Content Safety Dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/) - Službena dokumentacija za Azure Content Safety.
2. [Prompt Shield Dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Naučite kako spriječiti napade ubacivanja prompta.
3. [Content Safety API Referenca](https://learn.microsoft.com/rest/api/contentsafety/) - Detaljna API referenca za implementaciju Content Safety.
4. [Brzi početak: Azure Content Safety s C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Brzi vodič za implementaciju koristeći C#.
5. [Content Safety Klijentske biblioteke](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klijentske biblioteke za različite programske jezike.
6. [Otkrivanje pokušaja zaobilaženja](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Posebne upute za otkrivanje i sprječavanje pokušaja zaobilaženja.
7. [Najbolje prakse za Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Najbolje prakse za učinkovitu implementaciju sadržajne sigurnosti.

Za detaljniju implementaciju, pogledajte naš [Vodič za implementaciju Azure Content Safety](./azure-content-safety-implementation.md).

## Što slijedi

- Pročitajte: [Azure Content Safety Implementacija](./azure-content-safety-implementation.md)
- Povratak na: [Pregled sigurnosnog modula](./README.md)
- Nastavite na: [Modul 3: Početak rada](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->