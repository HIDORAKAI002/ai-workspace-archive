# Täiustatud MCP turvalisus Azure Content Safety abil

> **OWASP MCP riski lahendus**: [MCP06 - kavatsusvoolu ümbersuunamine](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety pakub mitmeid võimsaid tööriistu, mis võivad parandada teie MCP rakenduste turvalisust. Praktilise rakenduskogemuse saamiseks vaadake [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Käsuvarjud

Microsofti AI käsuvarjud pakuvad tugevat kaitset nii otseste kui ka kaudsete käsusüsti rünnakute vastu läbi:

1. **Täpsem tuvastamine**: Kasutab masinõpet pahatahtlike juhiste äratundmiseks sisus.
2. **Sädelev valgus**: Muudab sisestatud teksti, et aidata tehisintellektil eristada kehtivaid juhiseid välisest sisendist.
3. **Piiritlejad ja andmemärgendid**: Märgistab usaldatud ja mitteusaldatud andmete vahet.
4. **Sisuturve integreerimine**: Töötleb koos Azure AI Content Safety-ga jailbreak katsed ja kahjuliku sisu tuvastamiseks.
5. **Jätkuvad uuendused**: Microsoft uuendab regulaarselt kaitsemehhanisme tekkivate ohtude vastu.

## Azure Content Safety rakendamine MCP-ga

See lähenemine pakub mitmekihilist kaitset:
- Sisendite skannimine enne töötlemist
- Väljundite valideerimine enne tagastamist
- Blokeerimisnimekirjade kasutamine tuntud kahjuliku mustri puhul
- Azure pidevalt uuendatavate sisuturve mudelite kasutamine

## Azure Content Safety ressursid

Azure Content Safety MCP serveritega rakendamise kohta lisateabe saamiseks vaadake järgmisi ametlikke ressursse:

1. [Azure AI Content Safety dokumentatsioon](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety ametlik dokumentatsioon.
2. [Käsuvarju dokumentatsioon](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Õppige, kuidas vältida käsusüsti rünnakuid.
3. [Content Safety API viide](https://learn.microsoft.com/rest/api/contentsafety/) - Põhjalik API viide Content Safety rakendamiseks.
4. [Kiiralgus: Azure Content Safety C#-ga](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Kiire rakendusjuhend C# kasutamiseks.
5. [Content Safety klienditeegid](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klienditeegid erinevates programmeerimiskeeltes.
6. [Jailbreak katsete tuvastamine](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Spetsiifilised juhised jailbreak katsete tuvastamiseks ja ennetamiseks.
7. [Parimad tavad sisuturve rakendamiseks](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Parimad tavad sisuturve tõhusaks rakendamiseks.

Põhjalikuma rakenduse jaoks vaadake meie [Azure Content Safety rakendusjuhendit](./azure-content-safety-implementation.md).

## Mis järgmiseks

- Loe: [Azure Content Safety rakendus](./azure-content-safety-implementation.md)
- Naase: [Turvamooduli ülevaade](./README.md)
- Jätka: [Moodul 3: Alustamine](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->