# Pažangi MCP sauga su Azure Content Safety

> **OWASP MCP rizikos sprendimas**: [MCP06 - Užklausos injekcija per kontekstinius duomenis](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety siūlo kelis galingus įrankius, kurie gali pagerinti jūsų MCP įgyvendinimų saugumą. Norėdami praktinių įgyvendinimo žinių, žiūrėkite [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 3 stovyklą: I/O saugumas.

## Užklausų skydai

„Microsoft“ AI Užklausų skydai suteikia patikimą apsaugą nuo tiesioginių ir netiesioginių užklausų injekcijų atakų per:

1. **Pažangią aptikimą**: Naudoja mašininį mokymąsi, kad identifikuotų kenksmingas instrukcijas, įterptas į turinį.
2. **Išryškinimą**: Keičia įvesties tekstą, kad AI sistemos galėtų atskirti galiojančias instrukcijas nuo išorinių įvesties duomenų.
3. **Ribų ir duomenų žymėjimą**: Žymi ribas tarp patikimų ir nepatikimų duomenų.
4. **Content Safety integraciją**: Veikia kartu su Azure AI Content Safety, kad aptiktų atjungimo bandymus ir kenksmingą turinį.
5. **Nuolatinius atnaujinimus**: „Microsoft“ reguliariai atnaujina apsaugos mechanizmus prieš naujus grėsmes.

## Azure Content Safety įgyvendinimas su MCP

Šis metodas suteikia kelių sluoksnių apsaugą:
- Skenuoja įvestis prieš apdorojimą
- Tvirtina išvestis prieš grąžinimą
- Naudoja blokavimo sąrašus žinomiems kenksmingiems šablonams
- Pasinaudoja Azure nuolat atnaujinamais turinio saugumo modeliais

## Azure Content Safety ištekliai

Norėdami sužinoti daugiau apie Azure Content Safety įgyvendinimą su jūsų MCP serveriais, naudokitės šiomis oficialiomis nuorodomis:

1. [Azure AI Content Safety dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/) - Oficialioji Azure Content Safety dokumentacija.
2. [Užklausų skydų dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Sužinokite, kaip išvengti užklausų injekcijos atakų.
3. [Content Safety API nuoroda](https://learn.microsoft.com/rest/api/contentsafety/) - Išsami API nuoroda Content Safety įgyvendinimui.
4. [Greita pradžia: Azure Content Safety su C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Greitas įgyvendinimo vadovas naudojant C#.
5. [Content Safety klientų bibliotekos](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klientų bibliotekos įvairioms programavimo kalboms.
6. [Atjungimo bandymų aptikimas](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifinės gairės apie atjungimo bandymų aptikimą ir prevenciją.
7. [Geriausios turinio saugumo praktikos](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Geriausios praktikos veiksmingam turinio saugumo įgyvendinimui.

Išsamesniam įgyvendinimui žr. mūsų [Azure Content Safety įgyvendinimo vadovą](./azure-content-safety-implementation.md).

## Kas toliau

- Skaityti: [Azure Content Safety įgyvendinimas](./azure-content-safety-implementation.md)
- Grįžti į: [Saugumo modulio apžvalga](./README.md)
- Toliau į: [3 modulis: Pradžia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Svarbu**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Esant svarbiai informacijai, rekomenduojamas profesionalus žmonių vertimas. Mes neatsakome už bet kokius nesusipratimus ar neteisingus aiškinimus, kilusius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->