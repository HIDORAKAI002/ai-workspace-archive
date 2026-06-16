# Azure turinio saugos įgyvendinimas MCP

> **OWASP MCP sprendžiamas rizikos veiksnys**: [MCP06 - Ketinimų srauto pakeitimas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Siekiant sustiprinti MCP saugumą nuo užklausų įpurškimo, įrankių užnuodijimo ir kitų dirbtinio intelekto specifinių pažeidžiamumų, labai rekomenduojama integruoti Azure turinio saugą. Šis įgyvendinimo vadovas suderintas su [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 3-iąja stovykla: I/O saugumu.

## Integracija su MCP serveriu

Norint integruoti Azure turinio saugą su savo MCP serveriu, pridėkite turinio saugos filtrą kaip tarpinę programinę įrangą savo užklausų apdorojimo pipeleinyje:

1. Inicializuokite filtrą serverio paleidimo metu
2. Patikrinkite visas gaunamas įrankių užklausas prieš jas apdorojant
3. Patikrinkite visas išeinančias atsakymus prieš juos grąžinant klientams
4. Registruokite ir signalizuokite apie saugumo pažeidimus
5. Įgyvendinkite tinkamą klaidų valdymą nesėkmingų turinio saugos patikrinimų atveju

Tai suteikia tvirtą gynybą nuo:
- Užklausų įpurškimo atakų
- Įrankių užnuodijimo mėginimų
- Duomenų nutekėjimo per kenksmingas įvestis
- Žalingo turinio generavimo

## Geros praktikos Azure turinio saugos integracijoje

1. **Individualios užblokuotų elementų sąrašai**: Kurkite specialius užblokuotų elementų sąrašus, skirtus MCP įpurškimo modeliams
2. **Sunkumo lygio reguliavimas**: Koreguokite sunkumo slenksčius pagal savo specifinį naudojimo atvejį ir rizikos toleranciją
3. **Visapusiška aprėptis**: Taikykite turinio saugos patikrinimus visoms įvestims ir išvestims
4. **Veikimo optimizavimas**: Apsvarstykite įgyvendinti talpyklą pasikartojantiems turinio saugos patikrinimams
5. **Atsarginiai mechanizmai**: Apibrėžkite aiškias atsargines elgsenas, kai turinio saugos paslaugos yra neprieinamos
6. **Vartotojo atsiliepimai**: Suteikite aiškią atsiliepimų vartotojams apie turinio blokavimą dėl saugumo priežasčių
7. **Nuolatinis tobulinimas**: Reguliariai atnaujinkite užblokuotų elementų sąrašus ir modelius, remdamiesi atsirandančiomis grėsmėmis

## Papildomi šaltiniai

### OWASP MCP saugumo gairės
- [OWASP MCP Azure saugumo gidas](https://microsoft.github.io/mcp-azure-security-guide/) - Išsamus OWASP MCP Top 10 su Azure įgyvendinimu
- [MCP06 - Užklausų įpurškimas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Išsamūs užklausų įpurškimo mažinimo modeliai
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktinė 3-i kampo stovykla: I/O saugumas apima turinio saugą

### Azure dokumentacija
- [Azure turinio saugos apžvalga](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Užklausų apsaugos dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI turinio saugos greita pradžia](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Kas toliau

- Grįžti prie: [Saugumo modulio apžvalga](./README.md)
- Tęsti prie: [Modulis 3: Pirmieji žingsniai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->