# Napredna varnost MCP z Azure Content Safety

> **OWASP MCP tveganje, ki ga naslovlja**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety ponuja več zmogljivih orodij, ki lahko izboljšajo varnost vaših implementacij MCP. Za praktične izkušnje z implementacijo glejte [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) tabor 3: Varnost I/O.

## Zaščite pred pozivi (Prompt Shields)

Microsoftove AI Prompt Shields zagotavljajo močno zaščito pred neposrednimi in posrednimi napadi vbrizgavanja pozivov z:

1. **Napredno zaznavanje**: Uporablja strojno učenje za prepoznavanje zlonamernih navodil, vgrajenih v vsebino.
2. **Osvetlitev (Spotlighting)**: Pretvori vhodno besedilo, da AI sistemi lažje ločijo veljavna navodila od zunanjih vhodov.
3. **Ločila in označevanje podatkov**: Označuje meje med zaupanja vrednimi in nezaupljivimi podatki.
4. **Integracija z Content Safety**: Deluje z Azure AI Content Safety za zaznavanje poizkusov jailbreaka in škodljive vsebine.
5. **Nenehne posodobitve**: Microsoft redno posodablja zaščitne mehanizme proti novim grožnjam.

## Implementacija Azure Content Safety z MCP

Ta pristop zagotavlja večplastno zaščito:
- Pregledovanje vhodov pred obdelavo
- Preverjanje izhodov pred vrnitvijo
- Uporaba blok seznamov za znane škodljive vzorce
- Izraba neprestano posodobljenih modelov varnosti vsebine Azure

## Viri za Azure Content Safety

Za več informacij o implementaciji Azure Content Safety z vašimi MCP strežniki uporabite te uradne vire:

1. [Dokumentacija Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Uradna dokumentacija za Azure Content Safety.
2. [Dokumentacija za Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Naučite se, kako preprečiti napade vbrizgavanja pozivov.
3. [Vzorčni API za Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Podroben API referenčni vodnik za implementacijo Content Safety.
4. [Hitri začetek: Azure Content Safety s C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Hitri vodič za implementacijo z uporabo C#.
5. [Knjižnice strank za Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Knjižnice za različne programske jezike.
6. [Zaznavanje poizkusov jailbreaka](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Posebna navodila za zaznavanje in preprečevanje poskusov jailbreaka.
7. [Najboljše prakse za Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Najboljše prakse za učinkovito implementacijo varnosti vsebine.

Za bolj poglobljeno implementacijo glejte naš [Vodnik za implementacijo Azure Content Safety](./azure-content-safety-implementation.md).

## Kaj sledi

- Preberite: [Implementacija Azure Content Safety](./azure-content-safety-implementation.md)
- Vrni se na: [Pregled varnostnega modula](./README.md)
- Nadaljujte z: [Modul 3: Začetek](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->