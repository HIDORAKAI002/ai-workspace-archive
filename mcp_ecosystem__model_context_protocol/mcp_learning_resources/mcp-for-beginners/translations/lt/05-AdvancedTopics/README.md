# Pažangios Temos MCP

[![Pažangus MCP: Saugūs, Skalabilūs ir Daugiarūšiai AI Agentai](../../../translated_images/lt/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Spustelėkite aukščiau esantį vaizdą, kad peržiūrėtumėte pamokos vaizdo įrašą)_

Šiame skyriuje aptariama pažangi Model Context Protocol (MCP) įgyvendinimo temų seka, įskaitant daugiarūšių integraciją, skalabilumą, saugos gerąsias praktikas ir įmonių integraciją. Šios temos yra svarbios kuriant patikimas ir gamybai paruoštas MCP programas, kurios gali atitikti šiuolaikinių DI sistemų reikalavimus.

## Apžvalga

Šioje pamokoje nagrinėjami pažangūs Model Context Protocol įgyvendinimo konceptai, akcentuojant daugiarūšę integraciją, skalabilumą, saugos gerąsias praktikas ir įmonių integraciją. Šios temos yra būtinos kuriant gamybos kokybės MCP programas, kurios gali tvarkyti sudėtingus reikalavimus įmonių aplinkose.

> **Pažvelgus į priekį:** keletas žemiau paminėtų temų yra paveiktos `2026-07-28` MCP specifikacijos leidimo kandidato — Šaknies Kontekstai (5.4) ir Mėginimas (5.6) remiasi primityvais, kuriuos leidimo kandidatas pažymi kaip pasenusius, o eksperimentinė Užduočių funkcija, nurodyta Protokolo Funkcijose (5.16), pereina į atskirą Užduočių plėtinį. Daugiau informacijos žr. [Kas keičiasi MCP: 2026-07-28 leidimo kandidatas](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Mokymosi Tikslai

Iki šios pamokos pabaigos galėsite:

- Įgyvendinti daugiarūšes galimybes MCP sistemose
- Kurti skalabilias MCP architektūras didelės apkrovos scenarijams
- Taikyti saugos gerąsias praktikas, atitinkančias MCP saugumo principus
- Integruoti MCP su įmonių DI sistemomis ir platformomis
- Optimizuoti našumą ir patikimumą gamybos aplinkose

## Pamokos ir pavyzdiniai projektai

| Nuoroda | Pavadinimas | Aprašymas |
|------|-------|-------------|
| [5.1 Integracija su Azure](./mcp-integration/README.md) | Integracija su Azure | Sužinokite, kaip integruoti savo MCP serverį Azure platformoje |
| [5.2 Daugiarūšis pavyzdys](./mcp-multi-modality/README.md) | MCP Daugiarūšiai pavyzdžiai | Pavyzdžiai garsui, vaizdui ir daugiarūšiams atsakams |
| [5.3 MCP OAuth2 pavyzdys](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demonstracija | Minimalus Spring Boot programėlė, rodanti OAuth2 naudojimą MCP, tiek kaip Autorizacijos, tiek kaip Išteklių serverį. Demonstruoja saugų žetonų išdavimą, apsaugotus galinius taškus, Azure konteinerių programų diegimą ir API valdymo integraciją. |
| [5.4 Šaknies kontekstai](./mcp-root-contexts/README.md) | Šaknies kontekstai | Sužinokite daugiau apie šaknies kontekstą ir kaip juos įgyvendinti |
| [5.5 Maršrutizavimas](./mcp-routing/README.md) | Maršrutizavimas | Sužinokite apie skirtingų tipų maršrutizavimą |
| [5.6 Mėginimas](./mcp-sampling/README.md) | Mėginimas | Sužinokite, kaip dirbti su mėginimu |
| [5.7 Skalavimas](./mcp-scaling/README.md) | Skalavimas | Sužinokite apie skalavimą |
| [5.8 Saugumas](./mcp-security/README.md) | Saugumas | Užtikrinkite savo MCP serverio saugumą |
| [5.9 Tinklalapių paieškos pavyzdys](./web-search-mcp/README.md) | Tinklalapių paieška MCP | Python MCP serveris ir klientas, integruojantys SerpAPI realaus laiko tinklalapių, naujienų, produktų paieškai ir klausimų-atsakymų sistemai. Demonstruoja daugiainstrumentų koordinavimą, išorinę API integraciją ir patikimą klaidų valdymą. |
| [5.10 Realiojo laiko transliacija](./mcp-realtimestreaming/README.md) | Transliacija | Realiojo laiko duomenų transliacija tapo būtina šiandienos duomenų valdomame pasaulyje, kur verslai ir programos reikalauja nedelsiant prieigos prie informacijos, kad galėtų priimti laiku pagrįstus sprendimus. |
| [5.11 Realiojo laiko tinklalapių paieška](./mcp-realtimesearch/README.md) | Tinklalapių paieška | Realiojo laiko tinklalapių paieška – kaip MCP transformuoja realaus laiko tinklalapių paiešką, teikdama standartizuotą konteksto valdymo požiūrį dirbtinio intelekto modeliams, paieškos varikliams ir programoms. |
| [5.12 Entra ID autentifikacija Model Context Protocol serveriams](./mcp-security-entra/README.md) | Entra ID autentifikacija | Microsoft Entra ID suteikia patikimą debesijos pagrindu veikiančią tapatybės ir prieigos valdymo sprendimą, padėdama užtikrinti, kad prie jūsų MCP serverio prieigą turėtų tik autorizuoti vartotojai ir programos. |
| [5.13 Microsoft Foundry agentų integracija](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integracija | Sužinokite, kaip integruoti Model Context Protocol serverius su Microsoft Foundry agentais, suteikiant galimybę pažangiai įrankių koordinacijai ir įmonių DI galimybėms su standartizuotais išorinių duomenų šaltinių ryšiais. |
| [5.14 Konteksto inžinerija](./mcp-contextengineering/README.md) | Konteksto inžinerija | Ateities galimybės konteksto inžinerijos metodams MCP serveriuose, įskaitant konteksto optimizavimą, dinaminį konteksto valdymą ir efektyvių promptų kūrimo strategijas MCP sistemose. |
| [5.15 MCP pasirinktinis transportas](./mcp-transport/README.md) | Pasirinktinis transportas | Sužinokite, kaip įgyvendinti pasirinktinius transporto mechanizmus specializuotiems MCP komunikacijos scenarijams. |
| [5.16 Protokolo funkcijų gilus pažinimas](./mcp-protocol-features/README.md) | Protokolo funkcijos | Įvaldykite pažangias protokolo funkcijas, įskaitant pažangos pranešimus, užklausų atšaukimą, išteklių šablonus ir klaidų tvarkymo šablonus. |
| [5.17 Adversarial daugiagentinis mąstymas](./mcp-adversarial-agents/README.md) | Adversarial agentai | Naudokite du agentus su priešingomis pozicijomis, dalijantis vienu MCP įrankių rinkiniu, kad būtų aptikti halucinacijos, išryškinti ribiniai atvejai ir sukuriami geriau sukalibruoti rezultatai struktūrinės diskusijos būdu. |

> **Nauja MCP specifikacijoje 2025-11-25:** specifikacija dabar apima eksperimentinę **Užduočių** palaikymą (ilgai trunkančių operacijų su pažangos sekimu), **Įrankių anotacijas** (metadata apie įrankių elgseną saugumui), **URL režimo iškvietimą** (konkretaus URL turinio paprašymas iš klientų) ir patobulintas **Šaknis** (darbo vietos konteksto valdymui). Daugiau žr. [MCP specifikacijos atnaujinimų žurnalą](https://spec.modelcontextprotocol.io/).

## Papildomi Šaltiniai

Naujausia informacija apie pažangias MCP temas rasite:
- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub saugykla](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Saugumo rizikos ir jų mažinimas
- [MCP saugumo viršūnių dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktiniai saugumo mokymai

## Pagrindinės mintys

- Daugiarūšiai MCP įgyvendinimai plečia DI galimybes už teksto apdorojimo ribų
- Skalabilumas yra gyvybiškai svarbus įmonių diegimams ir gali būti pasiektas horizontaliu ir vertikaliu skalavimu
- Visapusiškos saugumo priemonės apsaugo duomenis ir užtikrina tinkamą prieigos kontrolę
- Įmonių integracija su platformomis, tokiomis kaip Azure OpenAI ir Microsoft AI Foundry, pagerina MCP galimybes
- Pažangūs MCP įgyvendinimai naudosi optimizuotomis architektūromis ir kruopščiu išteklių valdymu

## Užduotis

Sukurkite įmonių lygio MCP įgyvendinimą konkrečiam naudojimo atvejui:

1. Nustatykite daugiarūšius reikalavimus savo naudojimo atvejui
2. Apibrėžkite reikalingas saugumo priemones jautriems duomenims apsaugoti
3. Sukurkite skalabilias architektūras, galinčias tvarkyti kintančias apkrovas
4. Suplanuokite integracijos taškus su įmonių DI sistemomis
5. Dokumentuokite galimas našumo kliūtis ir jų mažinimo strategijas

## Papildomi Ištekliai

- [Azure OpenAI dokumentacija](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentacija](https://learn.microsoft.com/en-us/ai-services/)

---

## Kas toliau

Naršykite pamokas šiame modulyje pradėdami nuo: [5.1 MCP integracija](./mcp-integration/README.md)

Baigę šį modulį tęskite: [Modulis 6: Bendruomenės Indėliai](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->