# Implementacija Azure Content Safety z MCP

> **Naslovljen OWASP MCP tveganje**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Za krepitev varnosti MCP proti vbrizgavanju pozivov, zastrupljanju orodij in drugim ranljivostim, specifičnim za AI, je močno priporočena integracija Azure Content Safety. Ta vodnik za implementacijo je usklajen z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O varnost.

## Integracija z MCP strežnikom

Za integracijo Azure Content Safety s svojim MCP strežnikom dodajte filter vsebinske varnosti kot vmesno programsko opremo v vašo obdelovalno verigo zahtev:

1. Inicializirajte filter med zagonom strežnika  
2. Validirajte vse dohodne zahteve orodij pred obdelavo  
3. Preverite vse odhodne odzive pred vrnitvijo strankam  
4. Beležite in opozarjajte o kršitvah varnosti  
5. Uvedite ustrezno ravnanje z napakami za neuspešne preglede vsebinske varnosti  

To zagotavlja močno obrambo proti:  
- Napadom z vbrizgavanjem pozivov  
- Poskusom zastrupljanja orodij  
- Izvlečku podatkov prek zlonamernih vhodov  
- Generiranju škodljive vsebine  

## Priporočene prakse za integracijo Azure Content Safety

1. **Lastni seznami blokad**: Ustvarite lastne sezname blokad, posebej za vzorce vbrizgavanja v MCP  
2. **Prilagoditev resnosti**: Prilagodite mejne vrednosti resnosti glede na vaš specifičen primer uporabe in toleranco tveganja  
3. **Celovito pokritje**: Uporabljajte preglede vsebinske varnosti za vse vhode in izhode  
4. **Optimizacija zmogljivosti**: Razmislite o uvedbi predpomnjenja za ponavljajoče se preglede vsebinske varnosti  
5. **Rezervni mehanizmi**: Določite jasna rezerva obnašanja, ko storitve vsebinske varnosti niso dosegljive  
6. **Povratne informacije uporabnikom**: Zagotovite jasno povratno informacijo uporabnikom, kadar je vsebina blokirana zaradi varnostnih razlogov  
7. **Neprestano izboljševanje**: Redno posodabljajte sezname blokad in vzorce glede na nastajajoče grožnje  

## Dodatni viri

### OWASP MCP varnostna navodila
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Celovit vodič OWASP MCP Top 10 z implementacijo Azure  
- [MCP06 - Vbrizgavanje poziva](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Podrobni vzorci mitigacije vbrizgavanja poziva  
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktičen Camp 3: I/O varnost pokriva vsebinsko varnost  

### Dokumentacija Azure  
- [Pregled Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Dokumentacija Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure AI Content Safety Hitri začetek](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Kaj sledi

- Nazaj na: [Pregled varnostnega modula](./README.md)  
- Nadaljujte na: [Modul 3: Začetek uporabe](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->