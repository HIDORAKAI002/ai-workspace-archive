# Implementacija Azure Content Safety z MCP

> **Naslovljeno tveganje OWASP MCP**: [MCP06 - Vbrizgavanje poziva prek kontekstualnih vsebin](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Za krepitev varnosti MCP pred vbrizgavanjem pozivov, zastrupljanjem orodij in drugimi specifičnimi ranljivostmi AI, je močno priporočena integracija Azure Content Safety. Ta vodnik za implementacijo je usklajen z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Kamp 3: Varnost I/O.

## Integracija z MCP strežnikom

Za integracijo Azure Content Safety z vašim MCP strežnikom, dodajte filter varnosti vsebin kot vmesnik v vašem toku obdelave zahtev:

1. Inicializirajte filter ob zagonu strežnika
2. Preverite vse vhodne zahteve orodij pred obdelavo
3. Preverite vse odhodne odgovore pred vračanjem strankam
4. Beležite in opozarjajte o kršitvah varnosti
5. Implementirajte ustrezno obravnavo napak pri neuspešnih preverjanjih varnosti vsebin

To zagotavlja močno zaščito pred:
- Napadi z vbrizgavanjem pozivov
- Poskusi zastrupljanja orodij
- Izvlečkom podatkov preko zlonamernih vnosov
- Generiranjem škodljive vsebine

## Najboljše prakse za integracijo Azure Content Safety

1. **Prilagojeni seznami blokad**: Ustvarite prilagojene sezname blokad posebej za vzorce vbrizgavanja MCP
2. **Prilagoditev resnosti**: Prilagodite pragove resnosti glede na vaš specifični primer uporabe in toleranco tveganja
3. **Celovita pokritost**: Uporabite preverjanje varnosti vsebine za vse vnose in izhode
4. **Optimizacija zmogljivosti**: Razmislite o implementaciji predpomnjenja za ponavljajoče se preglede vsebine
5. **Mehanizmi nadomestnega delovanja**: Določite jasna ravnanja ob nedostopnosti storitev varnosti vsebin
6. **Povratne informacije uporabnikom**: Uporabnikom zagotovite jasne povratne informacije, ko je vsebina blokirana zaradi varnostnih razlogov
7. **Stalno izboljševanje**: Redno posodabljajte sezname blokad in vzorce glede na nastajajoče grožnje

## Dodatni viri

### Vodila za varnost OWASP MCP
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Celovit OWASP MCP Top 10 z implementacijo Azure
- [MCP06 - Vbrizgavanje pozivov](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Podrobni vzorci za ublažitev vbrizgavanja pozivov
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktični Kamp 3: Varnost I/O zajema varnost vsebine

### Dokumentacija Azure
- [Pregled Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentacija Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Hitri začetek z Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Kaj sledi

- Nazaj na: [Pregled varnostnega modula](./README.md)
- Nadaljuj na: [Modul 3: Začetek](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:  
Ta dokument je bil preveden z uporabo storitve za prevajanje z umetno inteligenco [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za pravilnost, upoštevajte, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvor­nem jeziku velja za avtoritativni vir. Za pomembne informacije priporočamo strokovni človeški prevod. Nismo odgovorni za morebitne nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->