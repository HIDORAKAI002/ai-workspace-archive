# Pažangios temos MCP

[![Pažangus MCP: Saugūs, mastelį keičiantys ir multimodaliniai DI agentai](../../../translated_images/lt/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Spustelėkite aukščiau esantį paveikslėlį norėdami peržiūrėti šios pamokos vaizdo įrašą)_

Šis skyrius apima pažangias Modelio konteksto protokolo (MCP) įgyvendinimo temas, įskaitant multimodalinę integraciją, mastelio keitimą, saugumo geriausias praktikas ir įmonių integraciją. Šios temos yra kritinės kuriant tvirtas ir gamybinės kokybės MCP programas, kurios gali atitikti šiuolaikinių DI sistemų reikalavimus.

## Apžvalga

Šioje pamokoje nagrinėjamos pažangios Modelio konteksto protokolo įgyvendinimo koncepcijos, sutelkiant dėmesį į multimodalinę integraciją, mastelio keitimą, saugumo geriausias praktikas ir įmonių integraciją. Šios temos yra būtinos, kad būtų sukurtos gamybinės kokybės MCP programos, galinčios tvarkyti sudėtingus reikalavimus įmonių aplinkose.

## Mokymosi tikslai

Pamokos pabaigoje galėsite:

- Įgyvendinti multimodalinius pajėgumus MCP sistemose
- Kurti mastelį keičiantį MCP architektūrą didelio paklausos scenarijams
- Taikyti saugumo geriausias praktikas, atitinkančias MCP saugumo principus
- Integruoti MCP su įmonių DI sistemomis ir pagrindais
- Optimizuoti veikimą ir patikimumą gamybinėse aplinkose

## Pamokos ir pavyzdiniai projektai

| Nuoroda | Pavadinimas | Aprašymas |
|------|-------|-------------|
| [5.1 Integracija su Azure](./mcp-integration/README.md) | Integracija su Azure | Sužinokite, kaip integruoti savo MCP serverį su Azure |
| [5.2 Multimodalinis pavyzdys](./mcp-multi-modality/README.md) | MCP multimodaliniai pavyzdžiai  | Garso, vaizdo ir multimodalinių atsakymų pavyzdžiai |
| [5.3 MCP OAuth2 pavyzdys](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demonstracija | Minimalistiška Spring Boot programa, rodanti OAuth2 su MCP, tiek kaip autorizacijos, tiek kaip resursų serveris. Demonstruoja saugų žetonų išdavimo procesą, apsaugotus endpoint'us, Azure Container Apps diegimą ir API valdymo integraciją. |
| [5.4 Pagrindiniai kontekstai](./mcp-root-contexts/README.md) | Pagrindiniai kontekstai  | Sužinokite daugiau apie pagrindinius kontekstus ir jų įgyvendinimą |
| [5.5 Maršrutizavimas](./mcp-routing/README.md) | Maršrutizavimas | Sužinokite apie skirtingus maršrutizavimo tipus |
| [5.6 Atranka](./mcp-sampling/README.md) | Atranka | Sužinokite, kaip dirbti su atranka |
| [5.7 Mastelio keitimas](./mcp-scaling/README.md) | Mastelio keitimas  | Sužinokite apie mastelio keitimą |
| [5.8 Saugumas](./mcp-security/README.md) | Saugumas  | Apsaugokite savo MCP serverį |
| [5.9 Interneto paieškos pavyzdys](./web-search-mcp/README.md) | Interneto paieškos MCP | Python MCP serveris ir klientas, integruojantys SerpAPI realaus laiko interneto, naujienų, produktų paieškai ir DUK. Demonstruoja daugialypį įrankių orkestravimą, išorinių API integraciją ir patikimą klaidų valdymą. |
| [5.10 Realaus laiko srautas](./mcp-realtimestreaming/README.md) | Srautas  | Realaus laiko duomenų srautas tapo būtinas šiandienos duomenimis grindžiamame pasaulyje, kur verslai ir programos reikalauja greito prieigos prie informacijos, kad galėtų priimti laiku apsisprendimus.|
| [5.11 Realaus laiko interneto paieška](./mcp-realtimesearch/README.md) | Interneto paieška | Realaus laiko interneto paieška: kaip MCP pertvarko realaus laiko interneto paiešką, suteikdama standartizuotą požiūrį į konteksto valdymą tarp DI modelių, paieškos variklių ir programų.| 
| [5.12 Entra ID autentifikavimas Model Context Protocol serveriams](./mcp-security-entra/README.md) | Entra ID autentifikavimas | Microsoft Entra ID teikia tvirtą debesų pagrindu veikiantį tapatybės ir prieigos valdymo sprendimą, užtikrinantį, kad su jūsų MCP serveriu bendrautų tik įgalioti vartotojai ir programos.|
| [5.13 Microsoft Foundry agentų integracija](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integracija | Sužinokite, kaip integruoti Model Context Protocol serverius su Microsoft Foundry agentais, leidžiant galingą įrankių orkestravimą ir įmonių DI galimybes su standartizuotais išorinių duomenų šaltinių ryšiais.|
| [5.14 Konteksto inžinerija](./mcp-contextengineering/README.md) | Konteksto inžinerija | Ateities galimybės naudojant konteksto inžinerijos metodus MCP serveriams, įskaitant konteksto optimizavimą, dinaminį konteksto valdymą ir efektyvesnių užklausų inžinerijos strategijų taikymą MCP sistemose.|
| [5.15 MCP pasirinktinė transporto priemonė](./mcp-transport/README.md) | Pasirinktinis transportas | Sužinokite, kaip įgyvendinti pasirinktinius transporto mechanizmus specializuotiems MCP komunikacijos scenarijams.|
| [5.16 Protokolo funkcijų giluminis nagrinėjimas](./mcp-protocol-features/README.md) | Protokolo funkcijos | Išmokite pažangias protokolo funkcijas, įskaitant pažangos pranešimus, užklausų atšaukimą, išteklių šablonus ir klaidų valdymo šablonus.|
| [5.17 Konkurencinis daugiagentinis mąstymas](./mcp-adversarial-agents/README.md) | Konkurenciniai agentai | Naudokite du agentus su priešingomis pozicijomis, dalijantis vienu MCP įrankių rinkiniu, siekdami aptikti haliucinacijas, atskleisti kraštutinius atvejus ir kurti geriau kalibruotus rezultatus struktūrizuoto ginčo būdu.|

> **Nauja MCP specifikacijoje 2025-11-25**: specifikacija dabar apima eksperimentinę paramą **Užduotims** (ilgai trunkančioms operacijoms su pažangos stebėjimu), **Įrankių anotacijoms** (metadomenims apie įrankių elgesį saugumui), **URL režimo išvedimui** (klientų prašymas konkretaus URL turinio) ir patobulintiems **Šaknims** (darbo srities konteksto valdymui). Visą informaciją rasite [MCP specifikacijos pakeitimų žurnale](https://spec.modelcontextprotocol.io/).

## Papildomi šaltiniai

Norėdami gauti naujausią informaciją apie pažangias MCP temas, žiūrėkite:
- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub saugykla](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Saugumo rizikos ir jų šalinimo būdai
- [MCP saugumo viršūnių dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktiniai saugumo mokymai

## Pagrindinės mintys

- Multimodaliniai MCP įgyvendinimai plečia DI galimybes už teksto apdorojimo ribų
- Mastelio keitimas yra būtinas įmonių diegimams ir gali būti sprendžiamas naudojant horizontalų ir vertikalų mastelį
- Išsamios saugumo priemonės saugo duomenis ir užtikrina tinkamą prieigos kontrolę
- Įmonių integracija su platformomis, tokiomis kaip Azure OpenAI ir Microsoft AI Foundry, papildo MCP galimybes
- Pažangūs MCP įgyvendinimai pasipelno iš optimizuotų architektūrų ir atidaus išteklių valdymo

## Užduotis

Sukurkite įmonės lygio MCP įgyvendinimą konkrečiam naudojimo atvejui:

1. Nustatykite multimodalinius reikalavimus savo naudojimo atvejui
2. Apibrėžkite saugumo kontrolės priemones jautrių duomenų apsaugai
3. Suplanuokite mastelį keičiantį architektūros modelį, galintį tvarkyti kintamą apkrovą
4. Numatyti integracijos taškus su įmonių DI sistemomis
5. Aprašykite galimus našumo apribojimus ir jų sprendimo strategijas

## Papildomi ištekliai

- [Azure OpenAI dokumentacija](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentacija](https://learn.microsoft.com/en-us/ai-services/)

---

## Kas toliau

Susipažinkite su šio modulio pamokomis pradėdami nuo: [5.1 MCP integracija](./mcp-integration/README.md)

Baigę šį modulį tęskite: [6 modulis: Bendruomenės indėliai](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->