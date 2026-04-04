# Context Engineering for AI Agents

[![Konteksto inžinerija](../../../translated_images/lt/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Spustelėkite aukščiau esančią nuotrauką, kad peržiūrėtumėte šio pamokos vaizdo įrašą)_

Svarbu suprasti sudėtingumą programos, kuriai kuriate AI agentą, kad sukurtumėte patikimą agentą. Turime kurti AI agentus, kurie efektyviai valdo informaciją, kad spręstų sudėtingus poreikius už užklausų inžinerijos ribų.

Šioje pamokoje pažiūrėsime, kas yra konteksto inžinerija ir koks jos vaidmuo kuriant AI agentus.

## Introduction

Ši pamoka apims:

• **Kas yra konteksto inžinerija** ir kodėl ji skiriasi nuo užklausų (prompt) inžinerijos.

• **Strategijos efektyviai konteksto inžinerijai**, įskaitant kaip rašyti, atrinkti, suspausti ir izoliuoti informaciją.

• **Bendros konteksto klaidos**, kurios gali sugadinti jūsų AI agentą, ir kaip jas ištaisyti.

## Learning Goals

Baigę šią pamoką, jūs žinosite ir suprasite, kaip:

• **Apibrėžti konteksto inžineriją** ir atskirti ją nuo užklausų inžinerijos.

• **Nustatyti pagrindines konteksto sudedamąsias dalis** Didelių kalbos modelių (LLM) programose.

• **Taikyti strategijas rašant, atrenkant, suspaudžiant ir izoliuojant kontekstą**, siekiant pagerinti agento veikimą.

• **Atpažinti dažnias konteksto klaidas**, tokias kaip užteršimas, nukreipimas, painiava ir konfliktai, bei įgyvendinti mažinimo technikas.

## What is Context Engineering?

AI agentams kontekstas yra tas, kas skatina agentą planuoti atlikti tam tikrus veiksmus. Konteksto inžinerija yra praktika, užtikrinanti, kad AI agentas turi reikiamą informaciją, kad užbaigtų kitą užduoties žingsnį. Konteksto langelis yra riboto dydžio, todėl kaip agentų kūrėjai turime kurti sistemas ir procesus, skirtus valdyti informacijos įtraukimą, pašalinimą ir kondensavimą konteksto lange.

### Prompt Engineering vs Context Engineering

Užklausų inžinerija koncentruojasi į vieną statinį instrukcijų rinkinį, kad efektyviai nukreiptų AI agentus su taisyklių rinkiniu. Konteksto inžinerija yra dinaminio informacijos rinkinio valdymas, įskaitant pradinę užklausą, kad užtikrintų, jog AI agentas ilgainiui turi tai, ko jam reikia. Pagrindinė idėja apie konteksto inžineriją yra padaryti šį procesą kartojamu ir patikimu.

### Types of Context

[![Konteksto tipai](../../../translated_images/lt/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Svarbu prisiminti, kad kontekstas nėra tik viena išraiška. Informacija, kurios AI agentui reikia, gali kilti iš įvairių šaltinių, ir mūsų pareiga užtikrinti, kad agentas turėtų prieigą prie šių šaltinių:

Konteksto tipai, kuriuos AI agentas gali prireikti valdyti, apima:

• **Instrukcijos:** Tai yra tarsi agente “taisykles” – užklausos, sistemos pranešimai, few-shot pavyzdžiai (parodantys AI, kaip kažką daryti) ir įrankių aprašymai, kuriuos jis gali naudoti. Čia susijungia užklausų inžinerijos ir konteksto inžinerijos dėmesys.

• **Žinios:** Tai apima faktus, iš duomenų bazių gautą informaciją arba ilgalaikę atmintį, kurią agentas sukaupė. Tai apima Retrieval Augmented Generation (RAG) sistemos integraciją, jei agentui reikia prieigos prie skirtingų žinių saugyklų ir duomenų bazių.

• **Įrankiai:** Tai yra išorinių funkcijų, API ir MCP serverių apibrėžimai, kuriuos agentas gali iškviesti, kartu su grįžtamuoju ryšiu (rezultatais), kuriuos jis gauna juos naudodamas.

• **Poklausimo istorija:** Nuolatinis dialogas su vartotoju. Kintant laikui šios diskusijos tampa ilgesnės ir sudėtingesnės, o tai reiškia, kad jos užima vietos konteksto lange.

• **Vartotojo nuostatos:** Informacija apie vartotojo pomėgius ar nepatikimus dalykus, sužinota laikui bėgant. Tai gali būti saugoma ir iškviečiama priimant svarbius sprendimus, siekiant padėti vartotojui.

## Strategies for Effective Context Engineering

### Planning Strategies

[![Konteksto inžinerijos gerosios praktikos](../../../translated_images/lt/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Gera konteksto inžinerija prasideda nuo gero planavimo. Štai požiūris, kuris padės pradėti galvoti apie tai, kaip taikyti konteksto inžinerijos koncepciją:

1. **Apibrėžkite aiškius rezultatus** - užduočių, kurias AI agentai vykdys, rezultatai turėtų būti aiškiai apibrėžti. Atsakykite į klausimą – „Kaip atrodys pasaulis, kai AI agentas baigs savo užduotį?“ Kitaip tariant, koks pokytis, informacija ar atsakymas vartotojo lauks po sąveikos su AI agentu.
2. **Mapuokite kontekstą** - kai apibrėžėte AI agento rezultatus, turite atsakyti į klausimą „Kokios informacijos AI agentui reikia, kad užbaigtų šią užduotį?“. Taip galite pradėti žemėlapiuoti, kur ta informacija gali būti rasta.
3. **Sukurkite konteksto vamzdynus** - dabar, kai žinote, kur informacija yra, turite atsakyti į klausimą „Kaip agentas gaus šią informaciją?“. Tai galima padaryti įvairiais būdais, įskaitant RAG, MCP serverių naudojimą ir kitus įrankius.

### Practical Strategies

Planavimas yra svarbus, tačiau kai informacija pradeda patekti į mūsų agento konteksto langą, turime praktinių strategijų, kaip ją valdyti:

#### Managing Context

Nors dalis informacijos bus automatiškai įtraukta į konteksto langą, konteksto inžinerija reiškia aktyvesnį vaidmenį šios informacijos valdyme, kuriuo galima pasinaudoti keliais būdais:

 1. **Agentų užrašinė**
 Tai leidžia AI agentui daryti pastabas apie aktualią informaciją apie dabartines užduotis ir vartotojo sąveikas vienos sesijos metu. Tai turėtų būti saugoma už konteksto lango, faile arba vykdymo objekte, kurį agentas gali vėliau atkurti šios sesijos metu, jei reikia.

 2. **Atmintys**
 Užrašinės gerai tinka informacijos valdymui už vienos sesijos konteksto lango ribų. Atmintys leidžia agentams saugoti ir atkurti svarbią informaciją per kelias sesijas. Tai gali apimti santraukas, vartotojo nuostatas ir atsiliepimus dėl būsimų patobulinimų.

 3. **Konteksto suspaudimas**
 Kai konteksto langas auga ir artėja prie ribos, galima naudoti tokias technikas kaip santrumpinimas ir apkarpymas. Tai apima arba tik svarbiausios informacijos išlaikymą, arba senesnių pranešimų pašalinimą.
  
 4. **Daugiagentės sistemos**
 Kuriant daugiagentę sistemą tai yra konteksto inžinerijos forma, nes kiekvienas agentas turi savo konteksto langą. Kaip tas kontekstas dalijamas ir perduodamas skirtingiems agentams — dar viena dalykas, kurį reikia suplanuoti kuriant šias sistemas.
  
 5. **Smėlio dėžės aplinkos**
 Jei agentui reikia paleisti tam tikrą kodą arba apdoroti didelius dokumento kiekius, tai gali užimti daug tokenų rezultatams apdoroti. Vietoj to, kad visa tai būtų saugoma konteksto lange, agentas gali naudoti smėlio dėžės aplinką, kuri gali paleisti kodą ir tik perskaityti rezultatus bei kitą aktualią informaciją.
  
 6. **Vykdymo būsenos objektai**
 Tai atliekama sukuriant informacijos konteinerius, skirtus valdyti situacijas, kai agentui reikia prieigos prie tam tikros informacijos. Sudėtingai užduočiai tai leistų agentui išsaugoti kiekvieno subužduoties rezultatus žingsnis po žingsnio, leidžiant kontekstui likti susietam tik su tuo konkrečiu subuždaviniu.
  
### Example of Context Engineering

Tarkime, kad norime, jog AI agentas **„Užsisakytų man kelionę į Paryžių.“**

• Paprastas agentas, naudojantis tik užklausų inžineriją, gali tiesiog atsakyti: **„Gerai, kada norėtum nuvykti į Paryžių?“**. Jis tik apdorotų jūsų tiesioginį klausimą tuo metu, kai vartotojas jo paprašė.

• Agentas, taikantis aukščiau aptartas konteksto inžinerijos strategijas, padarys daug daugiau. Net prieš atsakydamas, jo sistema gali:

  ◦ **Patikrinti jūsų kalendorių** dėl laisvų datų (gaunant realaus laiko duomenis).

  ◦ **Prisijungti prie ankstesnių kelionės nuostatų** (iš ilgalaikės atminties), pvz., jūsų pageidaujamos oro linijos, biudžeto ar ar mėgstate tiesioginius skrydžius.

  ◦ **Nustatyti prieinamus įrankius** skrydžių ir viešbučių rezervacijai.

- Tada pavyzdinis atsakymas galėtų būti: "Sveiki [Jūsų vardas]! Matau, kad pirmąją spalio savaitę esate laisvas. Ieškoti tiesioginių skrydžių į Paryžių su [Preferred Airline] per jūsų įprastinį biudžetą [Budget]?" Šis turtingesnis, kontekstą atsižvelgiantis atsakymas iliustruoja konteksto inžinerijos galią.

## Common Context Failures

### Context Poisoning

**Kas tai yra:** Kai į kontekstą patenka haliucinacija (klaidinga LLM generuota informacija) arba klaida ir ji nuolat minima, dėl ko agentas siekia neįmanomų tikslų arba kuria nesąmoningas strategijas.

**Ką daryti:** Įdiekite **konteksto validaciją** ir **izoliavimą (karantinavimą)**. Patikrinkite informaciją prieš ją pridedant prie ilgalaikės atminties. Jei aptinkamas galimas užteršimas, pradėkite naujus konteksto gijas, kad bloga informacija neplistų.

**Kelionių rezervavimo pavyzdys:** Jūsų agentas sukuria **haliucinaciją apie tiesioginį skrydį iš mažo vietinio oro uosto į tolimą tarptautinį miestą**, kuris iš tikrųjų neteikia tarptautinių skrydžių. Šis neegzistuojantis skrydžio duomuo įrašomas į kontekstą. Vėliau, kai prašote agento užsakyti, jis nuolat bando rasti bilietus šiai neįmanomai maršrutai, kas lemia pasikartojančias klaidas.

**Sprendimas:** Įdiekite žingsnį, kuris **patikrina skrydžio egzistavimą ir maršrutus per realaus laiko API** _prieš_ pridėdamas skrydžio duomenis prie agento darbo konteksto. Jei validacija nepavyksta, neteisinga informacija yra „karantinuojama“ ir nebetaikoma toliau.

### Context Distraction

**Kas tai yra:** Kai kontekstas tampa toks didelis, kad modelis per daug susitelkia į sukauptą istoriją vietoje to, ką išmoko mokymo metu, ir pradeda imti kartotis arba daryti nenaudingus veiksmus. Modeliai gali pradėti klaidžioti net prieš konteksto langui pilnai užsipildant.

**Ką daryti:** Naudokite **konteksto santrumpinimą**. Periodiškai suspauskite sukauptą informaciją į trumpesnes santraukas, išlaikydami svarbias detales ir pašalindami perteklinę istoriją. Tai padeda „atnaujinti“ dėmesį.

**Kelionių rezervavimo pavyzdys:** Jūs ilgai aptarinėjote įvairias svajonių kelionių vietas, įskaitant detalią jūsų dviejų metų senumo kelionės per kuprinę aprašymą. Kai pagaliau prašote **„surasti man pigų skrydį kitam mėnesiui“**, agentas įstringa seno, nereikšmingo turinio gausoje ir nuolat klausinėja apie jūsų kuprinės įrangą ar ankstesnius maršrutus, apleisdamas jūsų dabartinį prašymą.

**Sprendimas:** Po tam tikro pokalbio posūkių skaičiaus arba kai kontekstas perauga, agentas turėtų **santraukuoti naujausias ir aktualiausias pokalbio dalis** – susitelkti į jūsų esamas kelionės datas ir tikslą – ir naudoti šią suspaustą santrauką kitam LLM kvietimui, atsisakydamas mažiau svarbios istorijos.

### Context Confusion

**Kas tai yra:** Kai nereikalingas kontekstas, dažnai per daug turimų įrankių pavidalu, verčia modelį generuoti blogus atsakymus arba iškviesti neaktualius įrankius. Mažesni modeliai ypač tam linkę.

**Ką daryti:** Įgyvendinkite **įrankių komplektų valdymą** naudodami RAG technikas. Laikykite įrankių aprašymus vektorinėje duomenų bazėje ir rinkitės _tik_ aktualiausius įrankius konkrečiai užduočiai. Tyrimai rodo, kad verta riboti įrankių pasirinkimą iki mažiau nei 30.

**Kelionių rezervavimo pavyzdys:** Jūsų agentas turi prieigą prie dešimčių įrankių: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations` ir kt. Jūs paklausiate, **„Koks geriausias būdas keliauti Paryžiuje?“**. Dėl didelio įrankių skaičiaus agentas supainiojamas ir bando iškviesti `book_flight` Paryžiaus viduje arba `rent_car`, nors jūs teikiate pirmenybę viešajam transportui, nes įrankių aprašymai gali sutapti arba jis paprasčiausiai negali nuspręsti geriausio.

**Sprendimas:** Naudokite **RAG prieš įrankių aprašymus**. Kai klausiate apie keliavimą Paryžiuje, sistema dinamiškai ištraukia _tik_ aktualiausius įrankius, pvz., `rent_car` arba `public_transport_info`, remiantis jūsų užklausa, pateikdama koncentruotą įrankių „paketą“ LLM.

### Context Clash

**Kas tai yra:** Kai kontekste egzistuoja prieštaringa informacija, tai sukelia nenuoseklų samprotavimą arba blogą galutinį atsakymą. Tai dažnai nutinka, kai informacija atkeliauja etapais ir ankstyvos, neteisingos prielaidos lieka kontekste.

**Ką daryti:** Naudokite **konteksto apkarpymą** ir **iškrovimą**. Apkarpymas reiškia pasenusios ar prieštaringos informacijos pašalinimą, kai atsiranda naujų detalių. Iškrovimas suteikia modeliui atskirą „užrašų“ darbo sritį, kurioje galima apdoroti informaciją nesitašant pagrindinio konteksto.

**Kelionių rezervavimo pavyzdys:** Iš pradžių sakote savo agentui, **„Noriu skristi ekonomine klase.“** Vėliau pokalbio metu pakeičiate nuomonę ir sakote, **„Iš tikrųjų šiai kelionei rinkimės verslo klasę.“** Jei abu nurodymai lieka kontekste, agentas gali gauti prieštaringus paieškos rezultatus arba supainioti, kurią prioritetą seçti.

**Sprendimas:** Įdiekite **konteksto apkarpymą**. Kai nauja instrukcija prieštarauja senajai, sena instrukcija pašalinama arba aiškiai perrašoma kontekste. Arba agentas gali naudoti **užrašinę**, kad suderintų prieštaringas nuostatas prieš priimant sprendimą, užtikrindamas, kad tik galutinė, nuosekli instrukcija nulems jo veiksmus.

## Got More Questions About Context Engineering?

Join the [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet with other learners, attend office hours and get your AI Agents questions answered.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Atsakomybės apribojimas:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame užtikrinti tikslumą, atkreipkite dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Pirminį dokumentą jo originalia kalba reikėtų laikyti autoritetingu šaltiniu. Svarbios informacijos atveju rekomenduojame naudotis profesionalių vertėjų paslaugomis. Mes neatsakome už jokių nesusipratimų ar neteisingų interpretacijų, kilusių dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->