# Išplėstinė MCP sauga su Azure Content Safety

> **OWASP MCP rizikos sprendimas**: [MCP06 - Ketinimų srauto pervertinimas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety suteikia kelis galingus įrankius, kurie gali sustiprinti jūsų MCP įgyvendinimų saugumą. Dėl praktinės įgyvendinimo patirties žr. [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 3 stovyklą: I/O sauga.

## Užklausų skydai

„Microsoft“ AI užklausų skydai suteikia tvirtą apsaugą tiek nuo tiesioginių, tiek nuo netiesioginių užklausų įpurškimo atakų:

1. **Išplėstinė aptikimas**: naudoja mašininį mokymąsi, kad atpažintų kenksmingas instrukcijas, įterptas į turinį.
2. **Ryškus žymėjimas**: transformuoja įvesties tekstą, kad AI sistemos galėtų atskirti galiojančias instrukcijas nuo išorinių įvedimų.
3. **Ribos žymėjimas ir duomenų žymėjimas**: žymi ribas tarp patikimų ir nepatikimų duomenų.
4. **Content Safety integracija**: bendradarbiauja su Azure AI Content Safety, kad aptiktų pabėgimo iš sistemos bandymus ir kenksmingą turinį.
5. **Nuolatiniai atnaujinimai**: „Microsoft“ reguliariai atnaujina apsaugos mechanizmus prieš naujai atsirandančias grėsmes.

## Azure Content Safety įgyvendinimas su MCP

Šis požiūris suteikia daugiasluoksnę apsaugą:
- Įėjimų nuskaitymas prieš apdorojimą
- Išėjimų patvirtinimas prieš grąžinimą
- Blokavimo sąrašų naudojimas žinomiems kenksmingiems modeliams
- Naudojimasis Azure nuolat atnaujinamais turinio saugumo modeliais

## Azure Content Safety ištekliai

Norėdami sužinoti daugiau apie Azure Content Safety įgyvendinimą su jūsų MCP serveriais, kreipkitės į šiuos oficialius išteklius:

1. [Azure AI Content Safety dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/) - Oficialioji Azure Content Safety dokumentacija.
2. [Prompt Shield dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Sužinokite, kaip apsisaugoti nuo užklausų įpurškimo atakų.
3. [Content Safety API nuoroda](https://learn.microsoft.com/rest/api/contentsafety/) - Išsami API nuoroda Content Safety įgyvendinimui.
4. [Greitas pradėjimas: Azure Content Safety su C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Greitas įgyvendinimo vadovas naudojant C#.
5. [Content Safety klientų bibliotekos](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klientų bibliotekos įvairioms programavimo kalboms.
6. [Pabėgimo iš sistemos bandymų aptikimas](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifinės gairės, kaip aptikti ir užkirsti kelią pabėgimo bandymams.
7. [Geriausios praktikos turinio saugumui](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Geriausios praktikos efektyviam turinio saugumo įgyvendinimui.

Dėl išsamesnio įgyvendinimo žr. mūsų [Azure Content Safety įgyvendinimo vadovas](./azure-content-safety-implementation.md).

## Kas toliau

- Skaityti: [Azure Content Safety įgyvendinimas](./azure-content-safety-implementation.md)
- Grįžti į: [Saugumo modulio apžvalga](./README.md)
- Tęsti į: [3 modulis: Pradžia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->