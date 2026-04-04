[![Kaip projektuoti gerus DI agentus](../../../translated_images/lt/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Paspauskite aukščiau esantį paveikslėlį, kad peržiūrėtumėte šios pamokos vaizdo įrašą)_
# AI agentinių projektavimo principai

## Įvadas

Yra daug būdų mąstyti apie AI agentinių sistemų kūrimą. Kadangi neaiškumas yra savybė, o ne klaida generatyvaus DI dizaino srityje, inžinieriams kartais sunku suprasti, nuo ko net pradėti. Mes sukūrėme žmonėms orientuotų UX projektavimo principų rinkinį, kad leistume kūrėjams kurti klientams orientuotas agentines sistemas, skirtas spręsti jų verslo poreikius. Šie projektavimo principai nėra privaloma architektūra, o pradinis taškas komandoms, kurios apibrėžia ir kuria agentų patirtis.

Apskritai agentai turėtų:

- Išplėsti ir didinti žmonių gebėjimus (idėjų generavimas, problemų sprendimas, automatizavimas ir kt.)
- Užpildyti žinių spragas (greitai supažindinti su žinių sritimis, vertimas ir kt.)
- Palengvinti ir remti bendradarbiavimą taip, kaip mes, kaip individai, norime dirbti su kitais
- Padaryti mus geresnėmis savo versijomis (pvz., gyvenimo treneris/užduočių valdytojas, padedantis išmokti emocinio reguliavimo ir dėmesingumo įgūdžių, stiprinantis atsparumą ir kt.)

## Ši pamoka apims

- Kas yra agentiniai projektavimo principai
- Kokios gairės turėtų būti taikomos įgyvendinant šiuos projektavimo principus
- Keletas pavyzdžių, kaip naudoti šiuos principus

## Mokymosi tikslai

Baigę šią pamoką, sugebėsite:

1. Paaiškinti, kas yra agentiniai projektavimo principai
2. Paaiškinti gaires, kaip naudoti agentinius projektavimo principus
3. Suprasti, kaip sukurti agentą, naudojant agentinius projektavimo principus

## Agentiniai projektavimo principai

![Agentiniai projektavimo principai](../../../translated_images/lt/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agentas (erdvė)

Tai aplinka, kurioje agentas veikia. Šie principai nurodo, kaip projektuoti agentus, veikiančius fiziniame ir skaitmeniniame pasauliuose.

- **Sujungimas, o ne susiliejimas** – padėti sujungti žmones su kitais žmonėmis, įvykiais ir veiksnėmis žiniomis, kad būtų skatinamas bendradarbiavimas ir ryšiai.
- Agentai padeda sujungti įvykius, žinias ir žmones.
- Agentai priartina žmones. Jie neskirti pakeisti ar sumenkinti žmones.
- **Lengvai pasiekiamas, tačiau kartais nematomas** – agentas daugiausia veikia fone ir tik paragina mus, kai tai yra aktualu ir tinkama.
  - Agentas yra lengvai randamas ir pasiekiamas įgaliotiems vartotojams bet kuriame įrenginyje ar platformoje.
  - Agentas palaiko multimodalią įvestį ir išvestį (garsas, balsas, tekstas ir kt.).
  - Agentas gali sklandžiai pereiti tarp pirmojo plano ir fono; tarp proaktyvaus ir reaguojančio režimų, priklausomai nuo to, kaip jis suvokia vartotojo poreikius.
  - Agentas gali veikti nematomu pavidalu, tačiau jo fono procesai ir bendradarbiavimas su kitais agentais yra skaidrūs ir valdomi vartotojo.

### Agentas (laikas)

Tai, kaip agentas veikia per laiką. Šie principai nurodo, kaip projektuoti agentus, sąveikaujančius su praeitimi, dabartimi ir ateitimi.

- **Praeitis**: Reflektuojant istoriją, kuri apima tiek būseną, tiek kontekstą.
  - Agentas pateikia aktualesnius rezultatus, remdamasis išsamesne istorinės informacijos analize, neapsiribodamas vien tik įvykiu, asmenimis ar būsenomis.
  - Agentas kuria ryšius iš praeities įvykių ir aktyviai remiasi atmintimi, kad įsitrauktų į esamas situacijas.
- **Dabar**: Skatinimas, ne tik informavimas.
  - Agentas įkūnija visapusišką požiūrį į sąveiką su žmonėmis. Kai įvyksta įvykis, agentas eina už statinio pranešimo ar kitos formalios informacijos ribų. Agentas gali supaprastinti procesus arba dinamiškai generuoti signalus, nukreipiančius vartotojo dėmesį tinkamu momentu.
  - Agentas pateikia informaciją remdamasis kontekstine aplinka, socialiniais ir kultūriniais pokyčiais bei pritaikytą vartotojo ketinimams.
  - Agento sąveika gali būti palaipsninė, vystytis ir didėti sudėtingumu, kad ilgalaikėje perspektyvoje suteiktų vartotojams daugiau galimybių.
- **Ateitis**: Prisitaikymas ir evoliucija.
  - Agentas prisitaiko prie įvairių įrenginių, platformų ir modalumų.
  - Agentas prisitaiko prie vartotojo elgesio, prieinamumo poreikių ir jį galima laisvai pritaikyti.
  - Agentas formuojamas ir vystosi per nuolatinę vartotojo sąveiką.

### Agentas (branduolys)

Tai pagrindiniai elementai agento dizaino branduolyje.

- **Priimti netikrumą, bet užtikrinti pasitikėjimą**.
  - Tikimasi tam tikro agento netikrumo lygio. Netikrumas yra pagrindinis agento dizaino elementas.
  - Pasitikėjimas ir skaidrumas yra pagrindinės agento dizaino sluoksniai.
  - Žmonės kontroliuoja, kada agentas yra įjungtas/išjungtas, o agento būsena visada aiškiai matoma.

## Gairės, kaip įgyvendinti šiuos principus

Kai naudojate ankstesnius projektavimo principus, vadovaukitės šiais nurodymais:

1. **Skaidrumas**: Informuokite vartotoją, kad DI dalyvauja, kaip jis veikia (įskaitant ankstesnius veiksmus) ir kaip pateikti atsiliepimą bei modifikuoti sistemą.
2. **Valdymas**: Leiskite vartotojui tinkinti, nurodyti pageidavimus ir personalizuoti, bei turėti kontrolę sistemos ir jos atributų atžvilgiu (įskaitant galimybę pamiršti).
3. **Nuoseklumas**: Siekite nuoseklios, multimodalinės patirties įvairiuose įrenginiuose ir taškuose. Naudokite pažįstamus UI/UX elementus, kai įmanoma (pvz., mikrofono piktogramą balso sąveikai) ir kiek įmanoma sumažinkite kliento pažintinę apkrovą (pvz., siekite glaustų atsakymų, vaizdinių priemonių ir „Learn More“ turinio).

## Kaip suprojektuoti kelionių agentą naudojant šiuos principus ir gaires

Įsivaizduokite, kad kuriate kelionių agentą, štai kaip galėtumėte mąstyti apie šių projektavimo principų ir gairių taikymą:

1. **Skaidrumas** – Informuokite vartotoją, kad kelionių agentas yra DI palaikomas agentas. Pateikite keletą pagrindinių nurodymų, kaip pradėti (pvz., „Sveiki“ žinutė, pavyzdiniai užklausimai). Aiškiai užfiksuokite tai produkto puslapyje. Rodykite sąrašą užklausimų, kuriuos vartotojas yra uždavęs anksčiau. Aiškiai nurodykite, kaip pateikti atsiliepimą (nykščiai aukštyn/žemyn, mygtukas „Siųsti atsiliepimą“ ir kt.). Aiškiai apibrėžkite, ar agentui taikomi naudojimo ar temų apribojimai.
2. **Valdymas** – Įsitikinkite, kad aišku, kaip vartotojas gali modifikuoti agentą po jo sukūrimo, pvz., naudojant System Prompt. Leiskite vartotojui pasirinkti, kiek detalus turi būti agentas, jo rašymo stilių ir bet kokius apribojimus, apie ką agentas neturėtų kalbėti. Leiskite vartotojui peržiūrėti ir ištrinti susijusius failus ar duomenis, užklausimus ir ankstesnius pokalbius.
3. **Nuoseklumas** – Įsitikinkite, kad piktogramos „Share Prompt“, pridėti failą ar nuotrauką ir pažymėti ką nors yra standartinės ir atpažįstamos. Naudokite segiklio piktogramą, kad nurodytumėte failo įkėlimą / bendrinimą su agentu, ir paveikslėlio piktogramą, kad nurodytumėte grafikos įkėlimą.

## Pavyzdiniai kodai

- Python: [Agentų karkasas](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agentų karkasas](./code_samples/03-dotnet-agent-framework.md)


## Ar turite daugiau klausimų apie AI agentinius projektavimo šablonus?

Prisijunkite prie [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), susitikite su kitais besimokančiais, dalyvaukite konsultacijose ir gaukite atsakymus į savo AI agentų klausimus.

## Papildomi ištekliai

- <a href="https://openai.com" target="_blank">Agentinių DI sistemų valdymo praktikos | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">HAX įrankių rinkinio projektas - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Atsakingo DI įrankių rinkinys</a>

## Ankstesnė pamoka

[Agentinių karkasų tyrinėjimas](../02-explore-agentic-frameworks/README.md)

## Kita pamoka

[Įrankių naudojimo dizaino šablonas](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas pasitelkus dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, atkreipkite dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Kritinei informacijai rekomenduojamas profesionalus, žmogaus atliktas vertimas. Mes neatsakome už jokius nesusipratimus ar klaidingą aiškinimą, kilusius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->