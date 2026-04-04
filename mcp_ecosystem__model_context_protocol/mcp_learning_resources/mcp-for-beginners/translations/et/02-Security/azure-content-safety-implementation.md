# Azure sisu turvalisuse rakendamine MCP-ga

> **OWASP MCP käsitletud risk**: [MCP06 - Käsu sisestamine kontekstuaalsete sisudega](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

MCP turvalisuse tugevdamiseks käsu sisestamise, tööriistade mürgitamise ja muude AI-spetsiifiliste haavatavuste vastu soovitatakse tungivalt rakendada Azure Content Safety teenust. See rakendusjuhend vastab [MCP turvasuuna tippsündmuse töötuba (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security juhistele.

## Integratsioon MCP serveriga

Azure Content Safety integreerimiseks oma MCP serverisse lisage sisu turvalisuse filter vahendajana oma päringute töötlemise ahelasse:

1. Algatage filter serveri käivitamisel
2. Kontrollige kõiki sissetulevaid tööriistapäringuid enne töötlemist
3. Kontrollige kõiki väljaminevaid vastuseid enne nende tagastamist klientidele
4. Logige ja teavitage turvalisuse rikkumistest
5. Rakendage sobivad veahaldusmehhanismid sisu turvalisuse kontrollide läbikukkumisel

See tagab kindla kaitse:
- Käsu sisestamise rünnakute vastu
- Tööriistade mürgitamise katsete vastu
- Andmete väljapressimise eest pahatahtlike sisendite kaudu
- Kahjuliku sisu genereerimise vältimiseks

## Parimad tavad Azure Content Safety integreerimiseks

1. **Kohandatud blokeerimisloendid**: Looge MCP süsti mustrite jaoks kohandatud blokeerimisloendid
2. **Tõsiduse häälestamine**: Reguleerige tõsiduse lävi vastavalt konkreetsele kasutusjuhtumile ja riskitaluvusele
3. **Põhjalik katvus**: Rakendage sisu turvalisuse kontrollid kõigile sisenditele ja väljunditele
4. **Jõudluse optimeerimine**: Kaaluge korduvate sisu turvalisuse kontrollide jaoks vahemällu salvestamist
5. **Varuplaanid**: Määratlege selged varuplaanid, kui sisu turvalisuse teenused pole kättesaadavad
6. **Kasutajate tagasiside**: Esitage kasutajatele selged tagasisided, kui sisu blokeeritakse turvapõhjustel
7. **Jätkuv täiustamine**: Uuendage regulaarselt blokeerimisloendeid ja mustreid vastavalt tekkivatele ohtudele

## Täiendavad ressursid

### OWASP MCP turvalehed
- [OWASP MCP Azure turvajuhend](https://microsoft.github.io/mcp-azure-security-guide/) – Ülevaade OWASP MCP Top 10-st Azure rakendusega
- [MCP06 - Käsu sisestamine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) – Põhjalikud käsu sisestamise leevendamise mustrid
- [MCP turvasuuna töötuba](https://azure-samples.github.io/sherpa/) – Käed-küljes Camp 3: I/O Security sisaldab sisu turvalisust

### Azure dokumentatsioon
- [Azure Content Safety ülevaade](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields dokumentatsioon](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety kiire algus](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Mis järgmiseks

- Tagasi: [Turvamooduli ülevaade](./README.md)
- Jätka: [Moodul 3: Alustamine](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vabandus**:
See dokument on tõlgitud AI tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi püüame täpsust, võib automaatsetes tõlgetes esineda vigu või ebatäpsusi. Algne dokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tingitud arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->