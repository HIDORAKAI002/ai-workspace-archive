# Bylos studija: Azure AI kelionių agentai – atskaitos įgyvendinimas

## Apžvalga

[Azure AI kelionių agentai](https://github.com/Azure-Samples/azure-ai-travel-agents) yra išsamus „Microsoft“ sukurtas atskaitos sprendimas, kuris demonstruoja, kaip sukurti daugialypį, dirbtinio intelekto palaikomą kelionių planavimo programą, naudojant Modelio konteksto protokolą (MCP), Azure OpenAI ir Azure AI Search. Šis projektas pristato geriausias praktikas, kaip koordinuoti kelis DI agentus, integruoti įmonių duomenis ir suteikti saugią, išplečiamą platformą realiems scenarijams.

## Pagrindinės savybės
- **Daugialypė agentų orkestra:** Naudoja MCP kelių specializuotų agentų (pvz., skrydžių, viešbučių ir maršrutų agentų) koordinavimui, kurie bendradarbiauja vykdydami sudėtingas kelionių planavimo užduotis.
- **Įmonių duomenų integracija:** Prisijungia prie Azure AI Search ir kitų įmonių duomenų šaltinių, teikdama naujausią ir aktualią informaciją kelionių rekomendacijoms.
- **Saugumo ir mastelio architektūra:** Pasinaudoja Azure paslaugomis autentifikacijai, autorizacijai ir masteliui užtikrinti, laikydamasi geriausių įmonių saugumo praktikų.
- **Išplečiami įrankiai:** Įgyvendina pakartotinai naudojamus MCP įrankius ir skatinimo šablonus, leidžiančius greitai prisitaikyti prie naujų sričių ar verslo reikalavimų.
- **Vartotojo patirtis:** Pateikia pokalbių sąsają vartotojams bendrauti su kelionių agentais, kurią palaiko Azure OpenAI ir MCP.

## Architektūra
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Architektūros diagramos aprašymas

Azure AI kelionių agentų sprendimas yra sukurtas moduliu, galintis masteliuotis ir saugiai integruoti kelis DI agentus bei įmonių duomenų šaltinius. Pagrindiniai komponentai ir duomenų srautas yra šie:

- **Vartotojo sąsaja:** Vartotojai sąveikauja su sistema per pokalbių UI (pvz., interneto pokalbį ar Teams botą), kuris siunčia vartotojo užklausas ir gauna kelionių rekomendacijas.
- **MCP serveris:** Veikia kaip centrinis koordinatorius, priimantis vartotojo įvestį, valdančius kontekstą ir koordinuojantis specializuotų agentų (pvz., FlightAgent, HotelAgent, ItineraryAgent) veiksmus naudojant Modelio konteksto protokolą.
- **DI agentai:** Kiekvienas agentas atsakingas už konkrečią sritį (skrydžiai, viešbučiai, maršrutai) ir įgyvendinamas kaip MCP įrankis. Agentai naudoja skatinimo šablonus ir logiką užklausoms apdoroti ir atsakymams generuoti.
- **Azure OpenAI paslauga:** Teikia pažangų natūralios kalbos supratimą ir generavimą, leidžiantį agentams interpretuoti vartotojo ketinimus ir generuoti pokalbių atsakymus.
- **Azure AI Search ir įmonių duomenys:** Agentai užklausia Azure AI Search ir kitus įmonių duomenų šaltinius, kad gautų naujausią informaciją apie skrydžius, viešbučius ir kelionių galimybes.
- **Autentifikacija ir saugumas:** Integruojasi su Microsoft Entra ID, kad užtikrintų saugią autentifikaciją ir taiko mažiausių teisių prieigos kontrolę visiems ištekliams.
- **Diegimas:** Sukurtas diegimui Azure Container Apps, užtikrinant mastelį, stebėjimą ir veiklos efektyvumą.

Ši architektūra leidžia sklandžiai koordinuoti kelis DI agentus, saugiai integruoti įmonių duomenis ir sukurti tvirtą, išplečiamą platformą domeno specifinėms DI programoms.

## Išsamus architektūros diagramos paaiškinimas
Įsivaizduokite, kad planuojate didelę kelionę ir turite komandą ekspertų asistentų, kurie padeda jums su kiekviena detale. Azure AI kelionių agentų sistema veikia panašiai, naudodama skirtingas dalis (kaip komandos narius), kurių kiekvienas turi specialią užduotį. Štai kaip visa tai dera:

### Vartotojo sąsaja (UI):
Galvokite apie tai kaip jūsų kelionių agente priekinę registratūrą. Čia jūs (vartotojas) užduodate klausimus ar darote užklausas, pvz., „Rask man skrydį į Paryžių.“ Tai gali būti pokalbių langas svetainėje arba žinučių programėlėje.

### MCP serveris (Koordinatorius):
MCP serveris yra kaip vadybininkas, kuris klausosi jūsų užklausos prie registratūros ir nusprendžia, kuris specialistas turi susitvarkyti su kiekviena dalimi. Jis seka jūsų pokalbį ir užtikrina, kad viskas veiktų sklandžiai.

### DI agentai (specialistų asistentai):
Kiekvienas agentas yra ekspertas tam tikroje srityje – vienas žino viską apie skrydžius, kitas apie viešbučius, dar kitas apie jūsų maršruto planavimą. Kai klausi apie kelionę, MCP serveris siunčia jūsų užklausą tinkamam agentui (-ams). Šie agentai naudoja savo žinias ir įrankius, kad rastų jums geriausias galimybes.

### Azure OpenAI paslauga (kalbos ekspertas):
Tai kaip turėti kalbos ekspertą, kuris tiksliai supranta, ką jūs klausiate, nesvarbu, kaip tą išreiškiate. Ji padeda agentams suprasti jūsų užklausas ir atsakyti natūralia, pokalbių kalba.

### Azure AI Search ir įmonių duomenys (informacijos biblioteka):
Įsivaizduokite milžinišką, nuolat atnaujinamą biblioteką su visa naujausia kelionių informacija – skrydžių tvarkaraščiai, viešbučių prieinamumas ir kt. Agentai ieško šioje bibliotekoje, kad gautų kuo tikslesnius atsakymus jums.

### Autentifikacija ir saugumas (saugumo sargas):
Kaip saugumiečiai tikrina, kas gali patekti į tam tikras teritorijas, taip ši dalis užtikrina, kad tik įgalioti asmenys ir agentai gali pasiekti jautrią informaciją. Jis saugo jūsų duomenis ir privatumo nepaliestumą.

### Diegimas Azure Container Apps platformoje (pastatas):
Visi šie asistentai ir įrankiai veikia kartu saugiame, mastelio galimybę turinčiame „pastate“ (debesyje). Tai reiškia, kad sistema vienu metu gali aptarnauti daug vartotojų ir būtų visada pasiekiama, kai jos reikia.

## Kaip visa tai veikia kartu:

Jūs pradedate užklausdami prie registratūros (UI).
Vadybininkas (MCP serveris) nustato, kuris specialistas (agentas) turi jums padėti.
Specialistas naudoja kalbos ekspertą (OpenAI), kad suprastų jūsų užklausą, ir biblioteką (AI Search), kad rastų geriausią atsakymą.
Saugumo sargas (autentifikacija) užtikrina, kad viskas būtų saugu.
Visa tai vyksta patikimame, masteliuotame pastate (Azure Container Apps), todėl jūsų patirtis yra sklandi ir saugi.
Šis komandinis darbas leidžia sistemai greitai ir saugiai padėti jums planuoti kelionę, lyg komanda ekspertų kelionių agentų, kurie kartu dirba moderniame biure!

## Techninis įgyvendinimas
- **MCP serveris:** Laiko pagrindinę orkestracijos logiką, teikia agentų įrankius ir valdo kontekstą daugiažingsnių kelionių planavimo darbo srautams.
- **Agentai:** Kiekvienas agentas (pvz., FlightAgent, HotelAgent) įgyvendintas kaip MCP įrankis su savo skatinimo šablonais ir logika.
- **Azure integracija:** Naudoja Azure OpenAI natūralios kalbos supratimui ir Azure AI Search duomenų paieškai.
- **Saugumas:** Integruojamas su Microsoft Entra ID autentifikacijai ir taiko mažiausių teisių prieigos kontrolę visiems ištekliams.
- **Diegimas:** Palaiko diegimą Azure Container Apps dėl mastelio ir veiklos efektyvumo.

## Rezultatai ir poveikis
- Demonstruoja, kaip MCP galima naudoti kelių DI agentų orkestravimui realiame, gamybiniame scenarijuje.
- Paspartina sprendimų kūrimą, teikdama pakartotinai naudojamus modelius agentų koordinavimui, duomenų integracijai ir saugiam diegimui.
- Tarnauja kaip šablonas kuriant srities specifines, dirbtiniu intelektu paremtas programas naudojant MCP ir Azure paslaugas.

## Nuorodos
- [Azure AI Travel Agents GitHub saugykla](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI paslauga](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Modelio konteksto protokolas (MCP)](https://modelcontextprotocol.io/)

## Kas toliau

- Atgal į: [Bylų studijų apžvalga](./README.md)
- Toliau: [ADO elementų atnaujinimas iš YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atšaukimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų arba netikslumų. Pirminis dokumentas gimtąja kalba turi būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama pasitelkti profesionalų žmonių vertimą. Mes neatsakome už jokių nesusipratimų ar klaidingų interpretacijų pasekmes, kilusias dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->