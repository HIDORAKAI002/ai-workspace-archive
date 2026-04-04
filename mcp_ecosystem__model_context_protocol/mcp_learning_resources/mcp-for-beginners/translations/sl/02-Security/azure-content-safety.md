# Napredno varovanje MCP z Azure Content Safety

> **Razrešen OWASP MCP tveganje**: [MCP06 - Vbrizgavanje ukazov preko kontekstualnih vsebin](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety ponuja več zmogljivih orodij, ki lahko izboljšajo varnost vaših implementacij MCP. Za praktične izkušnje z implementacijo si oglejte [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Kamp 3: Varnost I/O.

## Ščiti pred ukaznimi vbrizganji (Prompt Shields)

Microsoftovi AI Prompt Shields zagotavljajo močno zaščito pred neposrednimi in posrednimi napadi z vbrizgavanjem ukazov s pomočjo:

1. **Naprednega zaznavanja**: Uporablja strojno učenje za prepoznavanje zlonamernih navodil, vgrajenih v vsebino.
2. **Osvetlitve**: Transformira vhodno besedilo, da AI sistemi lažje ločijo veljavna navodila od zunanjih vhodov.
3. **Omejevalnikov in označevanja podatkov**: Označuje meje med zaupanja vrednimi in nezaupanja vrednimi podatki.
4. **Integracije s Content Safety**: Sodeluje z Azure AI Content Safety za zaznavanje poskusov preloma in škodljive vsebine.
5. **Nenehnih posodobitev**: Microsoft redno posodablja zaščitne mehanizme proti novim grožnjam.

## Implementacija Azure Content Safety z MCP

Ta pristop nudi večplastno zaščito:
- Pregled vhodnih podatkov pred procesiranjem
- Preverjanje izhodnih podatkov pred vrnitvijo
- Uporaba seznamov blokad za znane škodljive vzorce
- Izkoriščanje neprestanih posodobitev modelov Azure Content Safety

## Viri za Azure Content Safety

Za več informacij o implementaciji Azure Content Safety s vašimi MCP strežniki uporabite te uradne vire:

1. [Dokumentacija Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Uradna dokumentacija za Azure Content Safety.
2. [Dokumentacija Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Naučite se, kako preprečiti napade z vbrizgavanjem ukazov.
3. [Vzorčni API za Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Podrobna API referenca za implementacijo Content Safety.
4. [Hiter začetek: Azure Content Safety s C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Hiter vodič za implementacijo z uporabo C#.
5. [Knjižnice odjemalcev Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Knjižnice za različne programske jezike.
6. [Zaznavanje poskusov preloma](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Posebna navodila za zaznavanje in preprečevanje poskusov preloma.
7. [Priporočene prakse za Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Priporočila za učinkovito implementacijo varovanja vsebine.

Za poglobljeno implementacijo si oglejte naš [vodnik za implementacijo Azure Content Safety](./azure-content-safety-implementation.md).

## Kaj sledi

- Preberi: [Implementacija Azure Content Safety](./azure-content-safety-implementation.md)
- Vrni se: [Pregled varnostnega modula](./README.md)
- Nadaljuj na: [Modul 3: Začetek](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da avtomatski prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku velja za avtoritativni vir. Za ključne informacije priporočamo strokovni človeški prevod. Nismo odgovorni za morebitna napačna razumevanja ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->