# Napredna MCP sigurnost s Azure Content Safety

> **OWASP MCP rizik koji se rješava**: [MCP06 - Prompt injekcija putem kontekstualnih podataka](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety pruža nekoliko moćnih alata koji mogu poboljšati sigurnost vaših MCP implementacija. Za praktično iskustvo implementacije, pogledajte [MCP Security Summit radionicu (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O sigurnost.

## Prompt Shields

Microsoftovi AI Prompt Shields pružaju snažnu zaštitu protiv izravnih i neizravnih prompt injekcijskih napada kroz:

1. **Napredno otkrivanje**: Koristi strojno učenje za identificiranje zlonamjernih uputa ugrađenih u sadržaj.
2. **Isticanje**: Transformira ulazni tekst kako bi AI sustavi razlikovali važeće upute od vanjskih unosa.
3. **Razdjelnici i označavanje podataka**: Označava granice između pouzdanih i nepouzdanih podataka.
4. **Integracija s Content Safety**: Radi s Azure AI Content Safety za otkrivanje pokušaja jailbreaka i štetnog sadržaja.
5. **Kontinuirana ažuriranja**: Microsoft redovito ažurira mehanizme zaštite protiv novih prijetnji.

## Implementacija Azure Content Safety s MCP

Ovaj pristup pruža višeslojnu zaštitu:
- Skeniranje unosa prije obrade
- Validacija izlaza prije vraćanja
- Korištenje bloklista za poznate štetne obrasce
- Iskorištavanje kontinuirano ažuriranih modela za sigurnost sadržaja iz Azurea

## Resursi za Azure Content Safety

Za više informacija o implementaciji Azure Content Safety s vašim MCP serverima, konzultirajte ove službene izvore:

1. [Dokumentacija za Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Službena dokumentacija za Azure Content Safety.
2. [Dokumentacija za Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Naučite kako spriječiti napade prompt injekcije.
3. [Content Safety API referenca](https://learn.microsoft.com/rest/api/contentsafety/) - Detaljna API referenca za implementaciju Content Safety.
4. [Brzi početak: Azure Content Safety s C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Brzi vodič za implementaciju koristeći C#.
5. [Content Safety klijentske biblioteke](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klijentske biblioteke za različite programske jezike.
6. [Otkrivanje pokušaja jailbreaka](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifične upute za otkrivanje i sprječavanje pokušaja jailbreaka.
7. [Najbolje prakse za Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Najbolje prakse za učinkovitu implementaciju sigurnosti sadržaja.

Za detaljniju implementaciju pogledajte naš [Vodič za implementaciju Azure Content Safety](./azure-content-safety-implementation.md).

## Što dalje

- Pročitajte: [Implementacija Azure Content Safety](./azure-content-safety-implementation.md)
- Povratak na: [Pregled sigurnosnog modula](./README.md)
- Nastavite na: [Modul 3: Početak rada](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument je preveden korištenjem AI usluge prijevoda [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na njegovom izvornom jeziku treba smatrati službenim i autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni prijevod od strane ljudskog prevoditelja. Ne snosimo odgovornost za bilo kakve nesporazume ili kriva tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->