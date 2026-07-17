# Pažangios temos MCP

[![Pažangus MCP: Saugūs, plečiami ir daugiamodaliai AI agentai](../../../translated_images/lt/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Spustelėkite aukščiau esantį paveikslėlį, kad peržiūrėtumėte šio pamokos vaizdo įrašą)_

Šiame skyriuje nagrinėjamos pažangios temos Modelio konteksto protokolo (MCP) įgyvendinime, įskaitant daugiamodį integravimą, plečiamumą, geriausias saugumo praktikas ir įmonių integraciją. Šios temos yra svarbios kuriant tvirtas ir gamybai paruoštas MCP programas, galinčias atsakyti į šiuolaikinių AI sistemų reikalavimus.

## Apžvalga

Ši pamoka nagrinėja pažangias Modelio konteksto protokolo įgyvendinimo koncepcijas, koncentruodamasi į daugiamodį integravimą, plečiamumą, geriausias saugumo praktikas ir įmonių integraciją. Šios temos yra būtinos kuriant gamybos kokybės MCP programas, kurios gali valdyti sudėtingus reikalavimus įmonių aplinkose.

> **Žvilgsnis į priekį:** keletas žemiau išvardytų temų yra paveiktos `2026-07-28` MCP specifikacijos kandidato į leidimą — Pagrindiniai kontekstai (5.4) ir Atrankos (5.6) remiasi priedais, kuriuos šis kandidatas laiko pasenusiais, o eksperimentinė Užduočių funkcija, minima Protokolo funkcijose (5.16), pereina į atskirą Užduočių plėtinį. Daugiau informacijos žr. [Kas keičiasi MCP: 2026-07-28 kandidatas į leidimą](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Mokymosi tikslai

Šios pamokos pabaigoje galėsite:

- Įgyvendinti daugiamodes galimybes MCP sistemose
- Kurti plečiamas MCP architektūras aukšto poreikio scenarijams
- Taikyti saugumo geriausias praktikas pagal MCP saugumo principus
- Integruoti MCP su įmonių AI sistemomis ir platformomis
- Optimizuoti našumą ir patikimumą gamybos aplinkose

## Pamokos ir pavyzdiniai projektai

| Nuoroda | Pavadinimas | Aprašymas |
|------|-------|-------------|
| [5.1 Integracija su Azure](./mcp-integration/README.md) | Integracija su Azure | Sužinokite, kaip integruoti savo MCP serverį „Azure“ aplinkoje |
| [5.2 Daugiamodis pavyzdys](./mcp-multi-modality/README.md) | MCP daugiamodžiai pavyzdžiai | Pavyzdžiai su garso, vaizdo ir daugiamodžiais atsakymais |
| [5.3 MCP OAuth2 pavyzdys](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demonstracija | Minimalistinis Spring Boot programėlė, rodanti OAuth2 su MCP, tiek kaip autorizacijos, tiek kaip išteklių serveris. Demonstruoja saugų žetonų išdavimą, apsaugotus galinius taškus, „Azure Container Apps“ diegimą ir API valdymo integraciją. |
| [5.4 Pagrindiniai kontekstai](./mcp-root-contexts/README.md) | Pagrindiniai kontekstai | Sužinokite daugiau apie pagrindinį kontekstą ir kaip jį įgyvendinti (pasenę `2026-07-28` kandidato į leidimą; vis dar galioja `2025-11-25`) |
| [5.5 Maršrutizavimas](./mcp-routing/README.md) | Maršrutizavimas | Sužinokite apie įvairias maršrutizavimo rūšis |
| [5.6 Atranka](./mcp-sampling/README.md) | Atranka | Sužinokite, kaip dirbti su atrankomis (pasenę `2026-07-28` kandidato į leidimą; vis dar galioja `2025-11-25`) |
| [5.7 Skalavimas](./mcp-scaling/README.md) | Skalavimas | Sužinokite apie skalavimo principus |
| [5.8 Saugumas](./mcp-security/README.md) | Saugumas | Užtikrinkite savo MCP serverio saugumą |
| [5.9 Tinklo paieškos pavyzdys MCP](./web-search-mcp/README.md) | Tinklo paieška MCP | Python MCP serveris ir klientas, integruojantis su SerpAPI realaus laiko tinklo, naujienų, produktų paieškai ir klausimų-atsakymų užduotims. Demonstruoja daugialypį įrankių koordinavimą, išorinių API integraciją ir tvirtą klaidų tvarkymą. |
| [5.10 Tiesioginio srauto perdavimas](./mcp-realtimestreaming/README.md) | Srautinė transliacija | Tiesioginio duomenų srauto perdavimas tapo būtinas šiandieninėje duomenimis pagrįstoje aplinkoje, kur verslai ir programos reikalauja skubios informacijos priimti sprendimus laiku.|
| [5.11 Tiesioginė tinklo paieška](./mcp-realtimesearch/README.md) | Tinklo paieška | Kaip MCP transformuoja realaus laiko tinklo paiešką, suteikdamas standartizuotą konteksto valdymo požiūrį AI modeliams, paieškos sistemoms ir programoms.|
| [5.12 Entra ID autentifikacija Modelio konteksto protokolui](./mcp-security-entra/README.md) | Entra ID autentifikacija | Microsoft Entra ID suteikia tvirtą debesų pagrindu veikiantį tapatybės ir prieigos valdymo sprendimą, padedant užtikrinti, kad tik autorizuoti vartotojai ir programos galėtų bendrauti su jūsų MCP serveriu.|
| [5.13 Microsoft Foundry agentų integracija](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integracija | Sužinokite, kaip integruoti Modelio konteksto protokolo serverius su Microsoft Foundry agentais, suteikiant galingą įrankių koordinavimą ir įmonių AI galimybes su standartizuotais išorinių duomenų šaltinių ryšiais.|
| [5.14 Konteksto inžinerija](./mcp-contextengineering/README.md) | Konteksto inžinerija | Ateities galimybės konteksto inžinerijos technikoms MCP serveriams, įskaitant konteksto optimizavimą, dinaminį konteksto valdymą ir efektyvios prašymo inžinerijos strategijas MCP sistemose.|
| [5.15 MCP pasirinktinė perdavimo sistema](./mcp-transport/README.md) | Pasirinktinė perdavimo sistema | Sužinokite, kaip įgyvendinti pasirinktinį perdavimo mechanizmą specializuotoms MCP komunikacijoms.|
| [5.16 Protokolo funkcijų giluminis apžvalga](./mcp-protocol-features/README.md) | Protokolo funkcijos | Išmokite pažangias protokolo funkcijas, įskaitant progreso pranešimus, užklausų atšaukimą, išteklių šablonus ir klaidų tvarkymo modelius.|
| [5.17 Adversarinių daugialypių agentų argumentacija](./mcp-adversarial-agents/README.md) | Adversariniai agentai | Naudokite du agentus su priešingomis pozicijomis, dalijančius bendrą MCP įrankių rinkinį, kad aptiktumėte haliucinacijas, išryškintumėte kraštutines situacijas ir pagamintumėte geriau kalibruotus rezultatus struktūruotos diskusijos metu.|

> **Nauja MCP specifikacijoje 2025-11-25**: specifikacija dabar apima eksperimentinę **Užduočių** palaikymą (ilgalaikės operacijos su progreso stebėjimu), **Įrankių anotacijas** (metaduomenys apie įrankio elgseną saugumui užtikrinti), **URL režimo iškvietimą** (prašo konkretaus URL turinio iš klientų) ir patobulintus **Šaknius** (darbo vietos konteksto valdymui). Visą informaciją rasite [MCP specifikacijos pakeitimų žurnale](https://spec.modelcontextprotocol.io/).

## Papildomos nuorodos

Naujausia informacija apie pažangias MCP temas:
- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub saugykla](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Saugumo rizikos ir jų mažinimo būdai
- [MCP saugumo konferencijos dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktiniai saugumo mokymai

## Pagrindinės mintys

- Daugiamodės MCP realizacijos išplečia AI galimybes už teksto apdorojimo ribų
- Plečiamumas yra būtinas įmonių diegimams ir gali būti sprendžiamas horizontaliu bei vertikaliu skalavimu
- Išsamios saugumo priemonės saugo duomenis ir užtikrina tinkamą prieigos kontrolę
- Įmonių integracija su platformomis, tokiomis kaip Azure OpenAI ir Microsoft AI Foundry, pagerina MCP galimybes
- Pažangios MCP realizacijos naudosis optimizuotomis architektūromis ir atsargiu išteklių valdymu

## Užduotis

Sukurkite įmonių klasės MCP įgyvendinimą konkrečiai panaudojimo situacijai:

1. Nustatykite daugiamodžius reikalavimus savo panaudojimo atvejui
2. Apibrėžkite saugumo valdymo priemones jautriems duomenims apsaugoti
3. Suplanuokite skalauojamą architektūrą, galinčią tvarkyti kintantį apkrovimą
4. Suplanuokite integracijos taškus su įmonių AI sistemomis
5. Dokumentuokite galimus našumo siaurinius ir jų mažinimo strategijas

## Papildomi ištekliai

- [Azure OpenAI dokumentacija](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentacija](https://learn.microsoft.com/en-us/ai-services/)

---

## Kas toliau

Tyrinėkite šio modulio pamokas, pradedant nuo: [5.1 MCP integracija](./mcp-integration/README.md)

Baigę šį modulį, tęskite: [6 modulis: Bendruomenės indėliai](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->