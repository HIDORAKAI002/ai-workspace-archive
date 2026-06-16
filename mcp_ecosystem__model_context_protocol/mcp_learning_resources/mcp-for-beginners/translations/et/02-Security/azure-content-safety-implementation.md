# Azure Content Safety kasutuselevõtt MCP-ga

> **OWASP MCP risk lahendatud**: [MCP06 - Päringu süstimise altkäemaks](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

MCP turvalisuse tugevdamiseks päringu süstimise, tööriista mürgitamise ja teiste tehisintellektile spetsiifiliste haavatavuste vastu on tugevalt soovitatav integreerida Azure Content Safety. See kasutuselevõtu juhend on kooskõlas [MCP turvasümpoosion töötoaga (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O turvalisus.

## Integratsioon MCP serveriga

Azure Content Safety integreerimiseks MCP serveriga lisa sisuturvalisuse filter kui vahendaja (middleware) oma päringute töötlemise voogu:

1. Algata filter serveri käivitamisel
2. Kontrolli kõiki saabuvaid tööriistapäringuid enne töötlemist
3. Kontrolli kõiki väljuvaid vastuseid enne nende tagastamist klientidele
4. Logi ja teavita turvarikkumistest
5. Rakenda sobiv veahaldus ebaõnnestunud sisuturvalisuse kontrollide korral

See tagab tugeva kaitse vastu:
- Päringu süstimise rünnakud
- Tööriistade mürgitamise katsed
- Andmete väljaviimine pahatahtlike sisendite kaudu
- Kahjuliku sisu genereerimine

## Parimad tavad Azure Content Safety integreerimiseks

1. **Kohandatud blokeerimisnimekirjad**: Loo MCP süstimise mustrite jaoks spetsiifilised kohandatud blokeerimisnimekirjad
2. **Tõsiduse häälestamine**: Kohanda tõsiduse lävendi väärtusi vastavalt oma konkreetsusele ja riski taluvusele
3. **Terviklik katvus**: Rakenda sisuturvalisuse kontrollid kõigile sisenditele ja väljunditele
4. **Tulemuste optimeerimine**: Kaalu vahemällu salvestamist korduvate sisuturvalisuse kontrollide puhul
5. **Tagasipõrke mehhanismid**: Määra selged tagasipõrke käitumised sisuturvalisuse teenuste kättesaamatusel
6. **Kasutajate tagasiside**: Anna kasutajatele selget tagasisidet, kui sisu blokeeritakse turvakaalutlustel
7. **Jätkuv täiustamine**: Uuenda regulaarselt blokeerimisnimekirju ja mustreid tekkivate ohtude põhjal

## Täiendavad ressursid

### OWASP MCP turvajuhised
- [OWASP MCP Azure turvajuhend](https://microsoft.github.io/mcp-azure-security-guide/) - Kõikehõlmav OWASP MCP Top 10 koos Azure rakendusega
- [MCP06 - Päringu süstimine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detailne päringu süstimise leevendamise mustrite kirjeldus
- [MCP turvasümpoosion töötoa](https://azure-samples.github.io/sherpa/) - Käed-külge Camp 3: I/O turvalisus sisaldab sisuturvalisust

### Azure dokumentatsioon
- [Azure Content Safety ülevaade](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields dokumentatsioon](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety kiire algus](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Mis järgmiseks

- Tagasi: [Turvamooduli ülevaade](./README.md)
- Jätka: [Moodul 3: Algus](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->