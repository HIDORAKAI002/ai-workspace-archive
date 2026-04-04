# Azure turinio saugumo įgyvendinimas su MCP

> **OWASP MCP rizikos sprendimas**: [MCP06 - Prompt injekcija per kontekstualias apkrovas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Siekiant sustiprinti MCP saugumą nuo prompt injekcijos, įrankių užnuodijimo ir kitų AI specifinių pažeidžiamumų, labai rekomenduojama integruoti Azure turinio saugumą. Šis įgyvendinimo vadovas suderintas su [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 3 stovykla: I/O saugumas.

## Integracija su MCP serveriu

Norėdami integruoti Azure turinio saugumą su savo MCP serveriu, pridėkite turinio saugumo filtrą kaip tarpinę programinę įrangą užklausų apdorojimo grandinėje:

1. Inicializuokite filtrą serverio paleidimo metu
2. Patikrinkite visas įeinančias įrankio užklausas prieš apdorojant
3. Patikrinkite visas išeinančias atsakymus prieš grąžinant klientams
4. Registruokite ir įspėkite apie saugumo pažeidimus
5. Įgyvendinkite tinkamą klaidų tvarkymą nepavykus patikrinti turinio saugumo

Tai suteikia patikimą gynybą nuo:
- Prompt injekcijos atakų
- Įrankių užnuodijimo bandymų
- Duomenų išpylimo per kenksmingas įvestis
- Žalingo turinio generavimo

## Geriausios praktikos Azure turinio saugumo integracijai

1. **Pasirinktini blokavimo sąrašai**: Kurkite pasirinktinius blokavimo sąrašus konkrečiai MCP injekcijos modeliams
2. **Rimties reguliavimas**: Koreguokite rimties slenksčius pagal savo specifinį naudojimo atvejį ir rizikos toleranciją
3. **Išsamus aprėptis**: Taikykite turinio saugumo patikras visoms įvestims ir išvestims
4. **Veikimo optimizavimas**: Apsvarstykite galimybę įgyvendinti talpinimą dažnai kartojamoms turinio saugumo patikroms
5. **Atsarginių mechanizmų įdiegimas**: Apibrėžkite aiškų atsarginį elgesį, kai turinio saugumo paslaugos yra neprieinamos
6. **Vartotojo atsiliepimai**: Teikite aiškią informaciją vartotojams, kai turinys blokuojamas dėl saugumo priežasčių
7. **Nuolatinis tobulinimas**: Reguliariai atnaujinkite blokavimo sąrašus ir modelius pagal kylančias grėsmes

## Papildomi ištekliai

### OWASP MCP saugumo gairės
- [OWASP MCP Azure saugumo vadovas](https://microsoft.github.io/mcp-azure-security-guide/) - Išsamus OWASP MCP Top 10 su Azure įgyvendinimu
- [MCP06 - Prompt injekcija](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Išsamūs prompt injekcijos mažinimo modeliai
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktinė 3 stovykla: I/O saugumas apima turinio saugumą

### Azure dokumentacija
- [Azure turinio saugumo apžvalga](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI turinio saugumo greitasis startas](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Kas toliau

- Grįžti į: [Saugumo modulio apžvalga](./README.md)
- Tęsti į: [Modulis 3: Pradžia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba turi būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojamas profesionalus žmogaus vertimas. Mes neatsakome už bet kokius nesusipratimus ar klaidingas interpretacijas, kylančias naudojant šį vertimą.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->