# Täiustatud MCP turvalisus Azure Content Safety abil

> **OWASP MCP riski lahendus**: [MCP06 – Prompt Injection kontekstuaalsete koormiste kaudu](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety pakub mitmeid võimsaid tööriistu, mis võivad tõsta teie MCP lahenduste turvalisust. Praktilise rakenduskogemuse saamiseks vaadake [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) laager 3: I/O turvalisus.

## Prompt Shields (Käsuvarjud)

Microsofti AI Prompt Shields pakuvad tugevat kaitset nii otseste kui ka kaudsete käsu süstimise rünnakute vastu, kasutades:

1. **Täiustatud tuvastamist**: Masinõppe abil tuvastab kuritahtlikud juhised sisus.
2. **Esiletõstmist**: Muutmine sisestusest, aidates AI süsteemidel eristada kehtivaid juhiseid välistest sisenditest.
3. **Piiritlejaid ja andmemärgistust**: Märgib usaldusväärse ja mitteilustatava andmepiire.
4. **Content Safety integreerimist**: Töötab koos Azure AI Content Safetyga, et tuvastada jailbreak'i katsed ja kahjulik sisu.
5. **Jätkuvaid uuendusi**: Microsoft uuendab kaitsemehhanisme regulaarselt tekkivate ohtude vastu.

## Azure Content Safety kasutuselevõtt MCP-ga

See lähenemine pakub mitmekihilist kaitset:
- Sisendite skannimine enne töötlemist
- Väljundite valideerimine enne tagastamist
- Mustade nimekirjade kasutamine tuntud kahjulike mustrite puhul
- Azure pidevalt uuenevate sisuturvalisuse mudelite rakendamine

## Azure Content Safety ressursid

Azure Content Safety MCP serverite juurutamisest lisateabe saamiseks vaadake neid ametlikke ressursse:

1. [Azure AI Content Safety dokumentatsioon](https://learn.microsoft.com/azure/ai-services/content-safety/) – Azure Content Safety ametlik dokumentatsioon.
2. [Prompt Shield dokumentatsioon](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) – Õppige, kuidas takistada prompt süstimise rünnakuid.
3. [Content Safety API viide](https://learn.microsoft.com/rest/api/contentsafety/) – Üksikasjalik API viide Content Safety rakendamiseks.
4. [Kiirjuhend: Azure Content Safety C# abil](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) – Kiire rakendusjuhend C# kasutamiseks.
5. [Content Safety klienditeegid](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) – Klienditeegid erinevates programmeerimiskeeltes.
6. [Jailbreak'i katsete tuvastamine](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) – Spetsiifilised juhised jailbreak'i katsete tuvastamiseks ja takistamiseks.
7. [Parimad praktikad Content Safety jaoks](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) – Parimad praktikad tõhusaks sisuturvalisuseks.

Põhjalikuma rakenduse jaoks vaadake meie [Azure Content Safety rakendamise juhendit](./azure-content-safety-implementation.md).

## Mis järgmiseks

- Loe: [Azure Content Safety rakendamine](./azure-content-safety-implementation.md)
- Naase: [Turvalisuse mooduli ülevaade](./README.md)
- Jätka: [Moodul 3: Alustamine](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud tehisintellekti tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi me püüdleme täpsuse poole, palun arvestage, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Kriitilise informatsiooni puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tingitud arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->