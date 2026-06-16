# MCP Saugumas: Visapusiška AI Sistemų Apsauga

[![MCP Security Best Practices](../../../translated_images/lt/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Spustelėkite paveikslėlį aukščiau, kad peržiūrėtumėte šios pamokos vaizdo įrašą)_

Saugumas yra pagrindinis AI sistemų kūrimo elementas, todėl mes jam skiriame ypatingą dėmesį kaip antrajai temai. Tai atitinka „Microsoft“ principą **Saugumas iš dizaino** iš [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Modelio konteksto protokolas (MCP) suteikia galingas naujas galimybes AI valdytoms programoms, tačiau kartu kelia ir unikalius saugumo iššūkius, kurie viršija tradicines programinės įrangos rizikas. MCP sistemos susiduria tiek su įprastais saugumo rūpesčiais (saugus kodavimas, mažiausio privilegijų principas, tiekimo grandinės saugumas), tiek su naujais AI specifiniais grėsmėmis, tokiomis kaip užklausų injekcija, įrankių apsinuodijimas, sesijų pagrobimas, painaus pavaduotojo atakos, žetonų perėmimo pažeidžiamumai ir dinaminis gebėjimų keitimas.

Šioje pamokoje nagrinėjamos svarbiausios saugumo rizikos MCP įgyvendinimuose – aprėpiančios autentifikaciją, autorizaciją, perteklines teises, netiesioginę užklausų injekcija, sesijų saugumą, painaus pavaduotojo problemas, žetonų valdymą ir tiekimo grandinės pažeidžiamumus. Sužinosite veiksmingas valdymo priemones ir geriausias praktikas, kaip sumažinti šias rizikas, tuo pačiu panaudodami „Microsoft“ sprendimus, tokius kaip Prompt Shields, Azure Content Safety ir GitHub Advanced Security, stiprinti savo MCP diegimą.

## Mokymosi Tikslai

Pamokos pabaigoje galėsite:

- **Nustatyti MCP specifines grėsmes**: Atpažinti unikalias saugumo rizikas MCP sistemose, įskaitant užklausų injekciją, įrankių apsinuodijimą, perteklines teises, sesijų pagrobimą, painaus pavaduotojo problemas, žetonų perėmimo pažeidžiamumus ir tiekimo grandinės rizikas
- **Taikyti saugumo valdymo priemones**: Įgyvendinti efektyvias mažinimo priemones, įskaitant tvirtą autentifikaciją, mažiausio privilegijų prieigą, saugų žetonų valdymą, sesijų saugumo kontrolę ir tiekimo grandinės patikrinimą
- **Naudotis Microsoft saugumo sprendimais**: Suprasti ir taikyti Microsoft Prompt Shields, Azure Content Safety ir GitHub Advanced Security MCP darbo krūvių apsaugai
- **Patikrinti įrankių saugumą**: Suprasti įrankių metaduomenų tikrinimo, dinaminio pokyčių stebėjimo ir gynybos nuo netiesioginės užklausų injekcijos svarbą
- **Integruoti geriausias praktikas**: Derinti įprastus saugumo pagrindus (saugus kodavimas, serverio apsauga, nulinės pasitikėjimo principas) su MCP specifinėmis kontrolėmis visapusiškai apsaugai

# MCP saugumo architektūra ir kontrolės

Šiuolaikiniai MCP sprendimai reikalauja daugiasluoksnių saugumo priemonių, apimančių tiek tradicinį programinės įrangos saugumą, tiek AI specifines grėsmes. Sparčiai besivystanti MCP specifikacija toliau tobulina saugumo kontrolę, leidžiančią geriau integruotis į įmonių saugumo architektūras ir gerai įtvirtintas geriausias praktikas.

[Microsoft Digital Defense Report](https://aka.ms/mddr) tyrimai rodo, kad **98 % praneštų saugumo pažeidimų būtų užkirsti keliai tinkamai taikant saugumo higieną**. Efektyviausia apsaugos strategija sujungia pagrindines saugumo praktikas su MCP specifinėmis kontrolėmis – patikrinti baziniai saugumo metodai išlieka svarbiausi bendro saugumo rizikos mažinimo veiksniai.

## Dabartinė saugumo padėtis

> **Pastaba:** Ši informacija atspindi MCP saugumo standartus **2026 m. vasario 5 d.**, suderintus su **MCP Specifikacija 2025-11-25**. MCP protokolas sparčiai vystosi, o ateities įgyvendinimai gali pasiūlyti naujus autentifikacijos modelius ir patobulintas valdymo priemones. Visada kreipkitės į naujausią [MCP specifikaciją](https://spec.modelcontextprotocol.io/), [MCP GitHub saugyklą](https://github.com/modelcontextprotocol) ir [saugumo geriausių praktikų dokumentaciją](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) dėl naujausių nurodymų.

## 🏔️ MCP saugumo summit dirbtuvės (Sherpa)

Dėl **praktinio saugumo mokymo** rekomenduojame **MCP saugumo summit dirbtuves** (Sherpa) – išsamų gido vedamą žygį, skirtą MCP serverių saugumui Microsoft Azure aplinkoje užtikrinti.

### Dirbtuvių apžvalga

[MCP saugumo summit dirbtuvės](https://azure-samples.github.io/sherpa/) suteikia praktinį, veiksmingą saugumo mokymą per patikrintą „pažeidžiamumas → išnaudojimas → pataisymai → patvirtinimas“ metodiką. Jūs:

- **Mokysitės per pažeidžiamumų paiešką**: tiesiogiai išnagrinėsite silpnas vietas, išnaudodami tyčia nesaugias serverių versijas
- **Naudosite Azure natyvias saugumo priemones**: Azure Entra ID, Key Vault, API valdymą ir AI turinio saugumą
- **Vadovausitės gilios gynybos modeliu**: išnaudojate saugumo sluoksnius eidami nuo pagrindinių iki pažangių apsaugos priemonių
- **Taikysite OWASP standartus**: kiekviena technika atitinka [OWASP MCP Azure saugumo gido](https://microsoft.github.io/mcp-azure-security-guide/) reikalavimus
- **Gaunate gamybinius kodus**: išeinate su veikiančiais, išbandytais sprendimais

### Žygio maršrutas

| Stovyklavietė | Fokusas | Apimamos OWASP rizikos |
|---------------|---------|-----------------------|
| **Pagrindinė stovykla** | MCP pagrindai ir autentifikacijos silpnybės | MCP01, MCP07 |
| **1 stovykla: Tapatybės valdymas** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **2 stovykla: Vartai** | API valdymas, privatūs galiniai taškai, valdysena | MCP02, MCP06, MCP07, MCP09 |
| **3 stovykla: I/O saugumas** | Užklausų injekcija, PII apsauga, turinio saugumas | MCP03, MCP05, MCP06, MCP10 |
| **4 stovykla: Stebėsena** | Žurnalų analizė, informaciniai skydai, grėsmių aptikimas | MCP04, MCP08 |
| **Summitas** | Raudonosios / Mėlynosios komandos integracijos testas | Visi |

**Pradėkite**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 10 pagrindinių saugumo rizikų sąrašas

[OWASP MCP Azure saugumo gidas](https://microsoft.github.io/mcp-azure-security-guide/) aprašo dešimt svarbiausių saugumo rizikų MCP įgyvendinimuose:

| Rizika | Aprašymas | Azure mažinimo priemonės |
|--------|-----------|--------------------------|
| **MCP01** | Žetonų valdymo klaidos ir paslapčių nutekėjimas | Azure Key Vault, Managed Identity |
| **MCP02** | Privilegijų didėjimas per ribų išplitimą | RBAC, sąlyginė prieiga |
| **MCP03** | Įrankių apsinuodijimas | Įrankių validavimas, vientisumo patikra |
| **MCP04** | Programinės įrangos tiekimo grandinės atakos ir priklausomybių klastojimas | GitHub Advanced Security, priklausomybių skanavimas |
| **MCP05** | Komandų injekcija ir vykdymas | Įvesties patikra, smėlio dėžės naudojimas |
| **MCP06** | Ketinimų srauto perėmimas | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nepakankama autentifikacija ir autorizacija | Azure Entra ID, OAuth 2.1 su PKCE |
| **MCP08** | Trūksta auditų ir telemetrijos | Azure Monitor, Application Insights |
| **MCP09** | Šešėliniai MCP serveriai | API centro valdymas, tinklo izoliacija |
| **MCP10** | Konteksto injekcija ir per didelis duomenų dalijimasis | Duomenų klasifikacija, minimalus atskleidimas |

### MCP autentifikacijos raida

MCP specifikacija reikšmingai evoliucionavo autentifikacijos ir autorizacijos srityje:

- **Ankstyvas metodas**: ankstyvosios specifikacijos reikalavo kūrėjų statyti nestandartinius autentifikacijos serverius, o MCP serveriai veikė kaip OAuth 2.0 autorizacijos serveriai, tiesiogiai tvarkantys naudotojų autentifikaciją
- **Dabartinis standartas (2025-11-25)**: atnaujinta specifikacija leidžia MCP serveriams perduoti autentifikavimą išoriniams tapatybės tiekėjams (pvz., Microsoft Entra ID), gerinant saugumą ir mažinant diegimo sudėtingumą
- **Saugus transportas**: patobulinta palaikymas saugiems perdavimo mechanizmams su tinkamais autentifikacijos modeliais tiek vietiniams (STDIO), tiek nuotoliniams (Streamable HTTP) ryšiams

## Autentifikacija ir autorizacijos saugumas

### Dabartiniai saugumo iššūkiai

Šiuolaikiniai MCP sprendimai susiduria su keletu autentifikacijos ir autorizacijos iššūkių:

### Rizikos ir grėsmių šaltiniai

- **Neteisingai sukonfigūruota autorizacijos logika**: netinkamai įgyvendinta autorizacija MCP serveriuose gali atskleisti jautrius duomenis ir klaidingai taikyti prieigos kontrolę
- **OAuth žetonų kompromitavimas**: vietinio MCP serverio žetonų vagystė leidžia užpuolikams apsimesti serveriais ir pasiekti tolesnes paslaugas
- **Žetonų perėmimo pažeidžiamumai**: netinkamas žetonų tvarkymas sukelia saugumo kontrolės praleidimus ir atsakomybės spragas
- **Perteklinės teisės**: per didelės MCP serverių teisės pažeidžia mažiausio privilegijų principą ir padidina atakos paviršių

#### Žetonų perėmimas: kritinė antipatika

**Žetonų perėmimas griežtai draudžiamas** dabartinėje MCP autorizacijos specifikacijoje dėl rimtų saugumo pasekmių:

##### Saugojimo kontrolės apeinimas
- MCP serveriai ir galinių API įgyvendina svarbias saugumo priemones (vykdymo dažnio ribojimą, užklausų validavimą, eismo monitoringo priemones), kurios priklauso nuo teisingo žetonų tikrinimo
- Tiesioginis kliento žetono naudojimas apeina šiuos svarbius apsaugos sluoksnius, susilpnindamas saugumo architektūrą

##### Atsakomybės ir audito iššūkiai
- MCP serveriai negali atskirti klientų, naudojančių pradinius žetonus, pažeidžiant audito grandines
- Galinių resursų serverių žurnaluose užfiksuojamos klaidingos užklausų kilmės, o ne faktiniai MCP serveriai tarpininkai
- Incidentų tyrimas ir atitikties auditavimas tampa gerokai sudėtingesni

##### Duomenų nutekinimo rizikos  
- Netikrinamos žetonų teisės leidžia piktavaliams, turintiems pavogtus žetonus, naudoti MCP serverius kaip duomenų nutekinimo tarpininkus
- Pasitikėjimo ribų pažeidimai leidžia neautorizuotą prieigą apeinant numatytas apsaugos kontrolės priemones

##### Daugiaslankstės atakos
- Pažeisti žetonai, priimti keliose paslaugose, leidžia horizontaliai judėti tarp susijusių sistemų
- Paslaugų pasitikėjimo modeliai gali būti pažeisti, kai žetonų kilmė negali būti patvirtinta

### Saugumo kontrolės ir mažinimo priemonės

**Svarbiausi saugumo reikalavimai:**

> **PRIVALOMA**: MCP serveriai **NEGALI** priimti jokių žetonų, kurie nebuvo aiškiai išduoti MCP serveriui

#### Autentifikacijos ir autorizacijos kontrolės

- **Griežtas autorizacijos peržiūrėjimas**: atlikite išsamius MCP serverių autorizacijos logikos auditus, kad tik pageidaujami naudotojai ir klientai galėtų pasiekti jautrius išteklius
  - **Įgyvendinimo gidas**: [Azure API Management kaip autentiškumo vartai MCP serveriams](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Tapatybės integracija**: [Microsoft Entra ID naudojimas MCP serverio autentifikacijai](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Saugus žetonų valdymas**: taikykite [Microsoft žetonų validavimo ir gyvavimo kontrolės geriausias praktikas](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Tikrinkite, ar žetono auditorija atitinka MCP serverio tapatybę
  - Įgyvendinkite tinkamą žetonų sukimą ir galiojimo laikų politiką
  - Apsaugokite nuo žetonų pakartotinio naudojimo atakų ir neautorizuoto naudojimo

- **Apsaugotas žetonų saugojimas**: šifruokite žetonus tiek saugojime, tiek perdavimo metu
  - **Geriausios praktikos**: [Saugus žetonų saugojimas ir šifravimo gairės](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Prieigos kontrolės įgyvendinimas

- **Mažiausio privilegijų principas**: suteikite MCP serveriams tik minimalias teises, reikalingas numatytai funkcionalumui
  - Reguliarios teisių peržiūros ir atnaujinimai, siekiant užkirsti kelią privilegijų išplitimui
  - **Microsoft dokumentacija**: [Saugaus mažiausio privilegijų pritaikymo vadovas](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rolėmis pagrįsta prieigos kontrolė (RBAC)**: diegti smulkias rolės priskyrimo taisykles
  - Apriboti roles konkretiems ištekliams ir veiksmams
  - Vengti plačių ar nereikalingų teisių, kurios didina atakos paviršių

- **Nuolatinė teisių stebėsena**: diegti nuolatinį prieigos audito ir monitoringo procesą
  - Stebėti teisių naudojimo modelius dėl anomalijų
  - Greitai šalinti perteklines ar nenaudojamas teises

## AI specifinės saugumo grėsmės

### Užklausų injekcija ir įrankių manipuliavimo atakos

Šiuolaikiniai MCP įgyvendinimai susiduria su sudėtingais AI specifiniais atakų vektoriais, kurių tradicinės saugumo priemonės negali visiškai suvaldyti:

#### **Netiesioginė užklausų injekcija (tarpdomeninė užklausų injekcija)**

**Netiesioginė užklausų injekcija** yra viena svarbiausių pažeidžiamybių MCP palaikomose AI sistemose. Užpuolikai įterpia piktavališkas instrukcijas į išorinį turinį – dokumentus, tinklapius, el. laiškus ar duomenų šaltinius – kuriuos AI sistemos vėliau interpretuoja kaip teisėtas komandas.

**Atakų scenarijai:**
- **Dokumentų užklausų injekcija**: piktybinės instrukcijos paslėptos apdorojamuose dokumentuose, kurios inicijuoja nepageidaujamas AI veiklas
- **Tinklalapių turinio išnaudojimas**: sukompromituoti tinklapiai, kuriuose įterpti užklausų raginimai, keičiantys AI elgseną, kai juos nuskaitys sistema
- **El. laiškų atakos**: piktavališki raginimai laiškuose, priežastys AI padėjėjams atskleisti informaciją ar vykdyti neautorizuotas funkcijas
- **Duomenų šaltinių užteršimas**: sukompromituotos duomenų bazės ar API tiekia užterštą turinį AI sistemoms

**Reali įtaka**: šios atakos gali baigtis duomenų nutekinimu, privatumo pažeidimais, kenksmingo turinio generavimu ir naudotojų sąveikų manipuliavimu. Daugiau analizės žr. [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/lt/prompt-injection.ed9fbfde297ca877.webp)

#### **Įrankių apsinuodijimo atakos**

**Įrankių apsinuodijimas** taikosi į MCP įrankių metaduomenis, išnaudoja LLM modelių interpretaciją apie įrankių aprašymus ir parametrus vykdymo sprendimams priimti.

**Atakų mechanizmai:**
- **Metaduomenų manipuliavimas**: užpuolikai įterpia piktavališkas instrukcijas į įrankių aprašymus, parametrų apibrėžimus ar naudojimo pavyzdžius
- **Nematomos instrukcijos**: paslėpti raginimai tool metaduomenyse, apdorojami AI modelių, bet nematomi žmonėms
- **Dinaminiai įrankių pakeitimai („Rug Pulls“) :** vartotojų patvirtinti įrankiai vėliau keičiami vykdyti piktavališkas funkcijas be naudotojų žinios
- **Parametrų injekcija**: įrankių parametrų schemose įterptas kenkėjiškas turinys, paveikiantis modelio veikimą

**Nuotoliniai serveriai - pavojai**: nuotoliniai MCP serveriai kelia didesnę riziką, nes įrankių apibrėžimai gali būti keičiami po vartotojų patvirtinimo, sukuriant situacijas, kai anksčiau saugūs įrankiai tampa kenkėjiški. Išsamiau žr. [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/lt/tool-injection.3b0b4a6b24de6bef.webp)

#### **Papildomi AI atakos vektoriai**

- **Tarpdomeninė užklausų injekcija (XPIA)**: sudėtingos atakos, kurios naudoja turinį iš daugelio domenų siekiant apeiti saugumo priemones
- **Dinaminis galimybių keitimas**: Įrankių galimybių realaus laiko keitimai, kurie išvengia pradinių saugumo įvertinimų
- **Konteksto lango apsinuodijimas**: Atakos, kurios manipuliuoja dideliais konteksto langais, kad paslėptų kenksmingas instrukcijas
- **Modelio painiavos atakos**: Modelio apribojimų išnaudojimas kuriant nenuspėjamą ar nesaugų elgesį


### AI saugumo rizikos poveikis

**Didelio poveikio pasekmės:**
- **Duomenų nutekėjimas**: Neautorizuota prieiga ir jautrių įmonių ar asmeninių duomenų vagystė
- **Privatumo pažeidimai**: Asmens identifikuojamos informacijos (PII) ir konfidencialių verslo duomenų atskleidimas  
- **Sistemų manipuliacija**: Nenorimos kritinių sistemų ir darbinių procesų modifikacijos
- **Tapatybės duomenų vagystė**: Autentifikavimo žetonų ir paslaugų kredencialų kompromitavimas
- **Šoninis judėjimas**: Pažeistų AI sistemų naudojimas kaip taškų platesnėms tinklo atakoms

### Microsoft AI saugumo sprendimai

#### **AI Prašymo skydai: pažangi apsauga nuo injekcijos atakų**

Microsoft **AI Prašymo skydai** suteikia visapusišką apsaugą nuo tiek tiesioginių, tiek netiesioginių prašymų injekcijos atakų per daugelį saugumo sluoksnių:

##### **Pagrindiniai apsaugos mechanizmai:**

1. **Pažangus aptikimas ir filtravimas**
   - Mašininio mokymosi algoritmai ir NLP technikos aptinka kenksmingas instrukcijas išorinėje informacijoje
   - Dokumentų, tinklalapių, el. laiškų ir duomenų šaltinių realaus laiko analizė dėl įterptų grėsmių
   - Kontekstinis supratimas, kas yra teisėtas ir kas - kenksmingas prašymo šablonas

2. **Šviesinimo technikos**  
   - Skiria patikimas sistemos instrukcijas nuo galimai pažeistų išorinių įvesčių
   - Teksto transformavimo metodai, kurie gerina modelio aktualumą, izoliuodami kenksmingą turinį
   - Padeda AI sistemoms palaikyti tinkamą instrukcijų hierarchiją ir ignoruoti įsiskverbusias komandas

3. **Ribotuvas ir duomenų žymėjimo sistemos**
   - Aiškus ribų apibrėžimas tarp patikimų sisteminių pranešimų ir išorinės teksto įvesties
   - Specialūs žymekliai išryškina ribas tarp patikimų ir nepatikimų duomenų šaltinių
   - Aiškus atskyrimas neleidžia kilti instrukcijų painiavai ir neautorizuotam komandų vykdymui

4. **Nuolatinė grėsmių žvalgyba**
   - Microsoft nuolat stebi naujas atakų schemas ir atnaujina gynybą
   - Proaktyvus grėsmių paieškos naujoms injekcijos technikoms ir atakos vektoriams
   - Reguliarūs saugumo modelių atnaujinimai siekiant išlaikyti veiksmingumą prieš kintančias grėsmes

5. **Integracija su Azure Content Safety**
   - Dalis visapusiško Azure AI turinio saugumą užtikrinančių priemonių rinkinio
   - Papildomas užtaisų bandymų, žalingo turinio ir saugumo politikos pažeidimų aptikimas
   - Vieningos saugumo kontrolės visose AI programų dalyse

**Įgyvendinimo ištekliai**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/lt/prompt-shield.ff5b95be76e9c78c.webp)


## Pažangios MCP saugumo grėsmės

### Sesijos užgrobimo pažeidžiamumai

**Sesijos užgrobimas** yra kritinis atakos vektorius būseninių MCP įgyvendinimų atveju, kai neautorizuotos šalys įgyja ir piktnaudžiauja teisėtais sesijos identifikatoriais, prisidengdamos klientais ir atlikdamos neleistinas veiklas.

#### **Atakų scenarijai ir rizikos**

- **Sesijos užgrobimo prašymo injekcija**: Užpuolikai su pavogtais sesijos ID įterpia kenksmingas įvykių sekas į serverius, dalijusius sesijų būseną, galimai sukeldami žalingas operacijas arba prieigą prie jautrių duomenų
- **Tiesioginė imito pavogtų sesijos ID**: Pavogti sesijos ID leidžia tiesiogiai kreiptis į MCP serverį apeinant autentifikaciją, laikant užpuolikus teisėtais naudotojais
- **Pažeisti įmanoma atnaujinamų srautų tęstiniai prašymai**: Užpuolikai gali ankstyvai užbaigti užklausas, sukeldami teisėtus klientus tęsti ryšį su galimai kenksmingu turiniu

#### **Saugumo kontrolės sesijų valdymui**

**Svarbiausi reikalavimai:**
- **Autorizacijos patikrinimas**: MCP serveriai, įgyvendinantys autorizaciją, **PRIVALO** tikrinti VISUS gaunamus užklausimus ir **NEGALI** remtis sesijomis autentifikacijai
- **Saugaus sesijos kūrimas**: Naudoti kriptografiškai saugius, nedeterministinius sesijos ID, sugeneruotus su saugiais atsitiktiniais skaičių generatoriais
- **Naudotojų specifinis rišimas**: Rišti sesijos ID su vartotojo specifine informacija, pvz., formatu `<user_id>:<session_id>`, kad būtų išvengta sesijų pritaikymo kitiems vartotojams
- **Sesijos gyvavimo ciklo valdymas**: Užtikrinti tinkamą sesijos galiojimo laiką, rotaciją ir nebegaliojimo mechanizmus, mažinant pažeidžiamumo langus
- **Transporto saugumas**: Būtina naudoti HTTPS visiems ryšiams, užkertant kelią sesijos ID perėmimui

### Painiavo tarnautojo problema

**Painiavo tarnautojo problema** atsiranda, kai MCP serveriai veikia kaip autentifikacijos tarpininkai tarp klientų ir trečiųjų šalių paslaugų, sudarydami galimybes autorizacijos aplenkimui pasitelkiant statinius kliento ID.

#### **Atakos mechanika ir rizikos**

- **Sutarimo per slapukus aplenkimas**: Ankstesnė vartotojo autentifikacija sukuria sutikimo slapukus, kuriuos užpuolikai piktnaudžiauja kenksmingais autorizacijos prašymais su specialiai suformuotais peradresavimo URI
- **Autorizacijos kodo vagystė**: Esami sutikimo slapukai gali priversti autorizacijos serverius praleisti sutikimo langus, nukreipiant kodus į užpuoliko valdomus galinius taškus  
- **Neautorizuota API prieiga**: Pavogti autorizacijos kodai leidžia atlikti tokenų mainus ir naudotojo imitaciją be aiškaus patvirtinimo

#### **Sumažinimo strategijos**

**Privalomos kontrolės:**
- **Aiški sutikimo reikalingumo politika**: MCP tarpiniai serveriai, naudojantys statinius kliento ID, **PRIVALO** gauti vartotojo sutikimą kiekvienam dinamiškai registruotam klientui
- **OAuth 2.1 saugumo įgyvendinimas**: Laikytis dabartinių OAuth saugumo geriausių praktikų, įskaitant PKCE (Proof Key for Code Exchange) visiems autorizacijos prašymams
- **Griežtas kliento patvirtinimas**: Imtis nuodugnaus peradresavimo URI ir kliento identifikatoriaus tikrinimo, kad būtų užkirstas kelias piktnaudžiavimui

### Tokenų perdavimo pažeidžiamumai

**Tokenų perdavimas** yra aiškus anti-modelis, kai MCP serveriai priima kliento tokenus be tinkamos validacijos ir perduoda juos tolesnėms API, pažeisdami MCP autorizacijos specifikacijas.

#### **Saugumo pasekmės**

- **Valdymo aplenkimai**: Tiesioginis kliento ir API tokeno naudojimas apeina reikalingus ribojimus, patikrą ir stebėjimą
- **Auditavimo takų sugadinimas**: Aukštesnių sluoksnių išduoti tokenai neleidžia identifikuoti kliento, todėl tampa neįmanoma atlikti incidentų tyrimų
- **Duomenų nutekėjimas per proxy**: Nepatvirtinti tokenai leidžia piktavaliams naudoti serverius kaip tarpininkus neautorizuotai prieigai prie duomenų
- **Pasitikėjimo ribų pažeidimai**: Tolimesnių paslaugų pasitikėjimo prielaidos gali būti pažeistos, jei tokenų kilmė negali būti patvirtinta
- **Įvairiapusio atakų plėtimas**: Pažeisti tokenai, priimami daugelyje paslaugų, leidžia šoninei judėjimui tinkle

#### **Būtinos saugumo kontrolės**

**Nepakeičiami reikalavimai:**
- **Tokenų validacija**: MCP serveriai **NEGALI** priimti tokenų, kurie nėra išduoti tiesiogiai MCP serveriui
- **Auditorijos patikra**: Visada tikrinti, kad tokeno auditorija atitiktų MCP serverio identitetą
- **Tinkamas tokenų gyvavimo ciklas**: Naudoti trumpalaikius prieigos tokenus su saugia rotacija


## Tiekimo grandinės saugumas AI sistemoms

Tiekimo grandinės saugumas išsiplėtė už tradicinių programinės įrangos priklausomybių ribų ir apima visą AI ekosistemą. Modernūs MCP įgyvendinimai privalo griežtai tikrinti ir stebėti visus su AI susijusius komponentus, nes kiekvienas gali sukelti pažeidžiamumus, kompromituojančius sistemos vientisumą.

### Išplėstiniai AI tiekimo grandinės komponentai

**Tradicinės programinės įrangos priklausomybės:**
- Atvirojo kodo bibliotekos ir karkasai
- Konteinerių atvaizdai ir bazinės sistemos  
- Kūrimo įrankiai ir surinkimo vamzdynai
- Infrastrukturiniai komponentai ir paslaugos

**AI specifiniai tiekimo grandinės elementai:**
- **Pagrindiniai modeliai**: Iš anksto apmokyti modeliai iš įvairių tiekėjų, kuriems reikia patikrinti kilmę
- **Įterpimo paslaugos**: Išorinės vektorizavimo ir semantinio paieškos paslaugos
- **Konteksto tiekėjai**: Duomenų šaltiniai, žinių bazės ir dokumentų saugyklos  
- **Trečiųjų šalių API**: Išorinės AI paslaugos, ML vamzdynai ir duomenų apdorojimo galiniai taškai
- **Modelio artefaktai**: Svoriai, konfigūracijos ir modelių variantai su fine-tuning’u
- **Mokymo duomenų šaltiniai**: Duomenų rinkiniai, naudojami modeliui apmokyti ir tobulinti

### Visapusiška tiekimo grandinės saugumo strategija

#### **Komponentų tikrinimas ir pasitikėjimas**
- **Kilmės patikrinimas**: Patikrinti visų AI komponentų kilmę, licencijavimą ir vientisumą prieš integraciją
- **Saugumo vertinimas**: Vykdyti pažeidžiamumo nuskaitymus ir saugumo peržiūras modeliams, duomenų šaltiniams ir AI paslaugoms
- **Reputacijos analizė**: Įvertinti AI paslaugų tiekėjų saugumo istoriją ir praktiką
- **Atitikties patikra**: Užtikrinti, kad visi komponentai atitinka organizacijos saugumo ir reguliavimo reikalavimus

#### **Saugūs diegimo vamzdynai**  
- **Automatizuota CI/CD sauga**: Integruoti saugumo nuskaitymus per visą automatizuotą diegimo vamzdyną
- **Artefaktų vientisumas**: Įgyvendinti kriptografinį patikrinimą visiems diegiamiems artefaktams (kodas, modeliai, konfigūracijos)
- **Etapuotas diegimas**: Naudoti progresinio diegimo strategijas su saugumo patikrinimu kiekviename etape
- **Patikimos artefaktų saugyklos**: Diegti tik iš patikrintų, saugių registrų ir saugyklų

#### **Nuolatinis stebėjimas ir reagavimas**
- **Priklausomybių nuskaitymas**: Nuolatinė programinės įrangos ir AI komponentų priklausomybių pažeidžiamumo stebėsena
- **Modelių stebėjimas**: Nuolatinis modelių elgesio, našumo svyravimų ir saugumo anomalijų vertinimas
- **Paslaugų būklės sekimas**: Stebėti išorines AI paslaugas dėl prieinamumo, saugumo incidentų ir politikos pokyčių
- **Grėsmių žvalgybos integracija**: Įtraukti specifinius AI ir ML saugumo grėsmių informacijos srautus

#### **Prieigos kontrolė ir mažiausio privilegijų principas**
- **Komponentų lygmens teisės**: Riboti prieigą prie modelių, duomenų ir paslaugų pagal verslo poreikį
- **Paslaugų paskyrų valdymas**: Įdiegti specializuotas paslaugų paskyras su minimaliai reikalingomis teisėmis
- **Tinklų segmentacija**: Izoliuoti AI komponentus ir riboti tinklo prieigą tarp paslaugų
- **API vartų kontrolė**: Naudoti centralizuotus API vartus prieigos kontrolei ir stebėjimui prie išorinių AI paslaugų

#### **Incidentų reagavimas ir atkūrimas**
- **Greito reagavimo procedūros**: Sukurtos taisyklės pažeistiems AI komponentams pataisyti arba pakeisti
- **Kredencialų rotacija**: Automatizuotos sistemos slaptažodžiams, API raktams ir paslaugų kredencialams keisti
- **Grąžinimo galimybės**: Greitas grįžimas prie ankstesnių, žinomai gerų AI komponentų versijų
- **Tiekimo grandinės pažeidimų atkūrimas**: Specifinės procedūros reagavimui į aukščiau esančių AI paslaugų kompromitavimus

### Microsoft saugumo įrankiai ir integracija

**GitHub Advanced Security** suteikia visapusišką tiekimo grandinės apsaugą, įskaitant:
- **Slaptažodžių nuskaitymas**: Automatizuotas kredencialų, API raktų ir tokenų aptikimas saugyklose
- **Priklausomybių nuskaitymas**: Pažeidžiamumo vertinimas atvirojo kodo priklausomybių ir bibliotekų srityje
- **CodeQL analizė**: Statinė kodo analizė siekiant aptikti saugumo pažeidžiamumus ir programavimo klaidas
- **Tiekimo grandinės įžvalgos**: Matomumas priklausomybių saugumui ir būklei

**Azure DevOps ir Azure Repos integracija:**
- Sklandus saugumo nuskaitymo integravimas visose Microsoft kūrimo platformose
- Automatinės saugumo patikros Azure vamzdynuose AI darbiniams krūviams
- Politikos vykdymas užtikrinant saugų AI komponentų diegimą

**Microsoft vidaus praktikos:**
Microsoft taiko išsamias tiekimo grandinės saugumo praktikas visuose produktuose. Sužinokite apie patvirtintus metodus [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Pagrindinės saugumo praktikos

MCP įgyvendinimai paveldi ir plečia jūsų organizacijos esamą saugumo poziciją. Tvirtinant pagrindines saugumo praktikas ženkliai pagerėja bendras AI sistemų ir MCP diegimų saugumas.

### Pagrindiniai saugumo pagrindai

#### **Saugūs vystymo procesai**
- **OWASP atitikimas**: Apsauga nuo [OWASP Top 10](https://owasp.org/www-project-top-ten/) žiniatinklio programų pažeidžiamumų
- **AI specifinė apsauga**: Kontrolės, skirtos [OWASP Top 10 LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559) pažeidžiamumams
- **Saugus slaptažodžių valdymas**: Naudoti specialias saugyklas tokenams, API raktams ir jautriai konfigūracijai
- **Galutinės prieigos šifravimas**: Įgyvendinti saugius ryšius visuose programų komponentuose ir duomenų srautuose
- **Įvesčių validacija**: Griežtas visų vartotojo įvesčių, API parametrų ir duomenų šaltinių tikrinimas

#### **Infrastruktūros tvirtinimas**
- **Daugiaveiksmė autentifikacija**: Privaloma MFA visoms administravimo ir paslaugų paskyroms
- **Pataisų valdymas**: Automatizuotas ir savalaikis operacinių sistemų, karkasų ir priklausomybių pataisymas  
- **Tapatybės tiekėjo integracija**: Centralizuotas tapatybės valdymas per įmonės tiekėjus (Microsoft Entra ID, Active Directory)
- **Tinklų segmentacija**: Logiškai izoliuoti MCP komponentus, ribojant šoninį judėjimą
- **Mažiausių privilegijų principas**: Minimalus reikalingų teisių suteikimas visiems sistemos komponentams ir paskyroms

#### **Saugumo stebėjimas ir aptikimas**
- **Išsamus žurnalas**: Detalus AI programų veiklų ir MCP kliento-serverio sąveikų registravimas
- **SIEM integracija**: Centralizuota saugumo informacijos ir įvykių valdymo sistema anomalijų aptikimui
- **Elgesio analizė**: AI pagrindu veikiantis stebėjimas neįprastų sistemos ir vartotojų elgsenos modelių aptikimui
- **Grėsmių žvalgyba**: Išorinių grėsmių duomenų ir kompromitavimo indikatorių (IOC) integracija
- **Incidentų valdymas**: Gerai apibrėžtos procedūros saugumo incidentų aptikimui, reagavimui ir atkūrimui

#### **Nulinės pasitikėjimo architektūra**
- **Niekada nepasitikėk, visada tikrink**: Nuolatinis naudotojų, įrenginių ir tinklo ryšių patvirtinimas
- **Mikrosegmentacija**: Smulkios tinklo valdymo priemonės, izoliuojančios atskirus darbo krūvius ir paslaugas
- **Tapatybe pagrįstas saugumas**: Politikos, grindžiamos patvirtintomis tapatybėmis, o ne tinklo vieta
- **Nuolatinė rizikos vertinimas**: Dinaminis saugumo pozicijos įvertinimas pagal dabartinį kontekstą ir elgesį
- **Sąlyginė prieiga**: Prieigos kontrolė, adaptuojama pagal rizikos veiksnius, vietą ir įrenginio patikimumą

### Įmonių integracijos modeliai

#### **Microsoft saugumo ekosistemos integracija**
- **Microsoft Defender for Cloud**: Visapusiška debesų saugumo pozicijos valdymas
- **Azure Sentinel**: Debesų gimtoji SIEM ir SOAR galimybės AI darbo krūvių apsaugai
- **Microsoft Entra ID**: Įmonių tapatybės ir prieigos valdymas su sąlyginės prieigos politikomis
- **Azure Key Vault**: Centralizuotas slaptažodžių valdymas su aparatine saugumo moduliu (HSM)
- **Microsoft Purview**: Duomenų valdymas ir atitiktis AI duomenų šaltiniams ir darbiniams procesams

#### **Atitiktis ir valdymas**
- **Reguliacinis įsipareigojimas**: Užtikrinti MCP diegimų atitiktį pramonės reguliavimo reikalavimams (GDPR, HIPAA, SOC 2)
- **Duomenų klasifikavimas**: Tinkama jautrių AI sistemų apdorojamų duomenų kategorizacija ir tvarkymas
- **Audito takai**: Visapusiškas žurnalavimas reguliavimo atitikties ir teisėsaugos tyrimams
- **Privatumo kontrolės**: Privatumo pagal dizainą principų įgyvendinimas AI sistemos architektūroje
- **Pokyčių valdymas**: Formalūs procesai saugumo peržiūroms AI sistemos pakeitimams

Šios pagrindinės praktikos sukuria tvirtą saugumo pagrindą, kuris gerokai pagerina MCP specifinių saugumo kontrolės priemonių veiksmingumą ir suteikia visapusišką apsaugą AI pagrįstoms programoms.

## Pagrindinės saugumo išvados
- **Sluoksniuota saugumo strategija**: Derinkite pagrindines saugumo praktikas (saugų kodavimą, mažiausių teisių principą, tiekimo grandinės patikrinimą, nuolatinį stebėjimą) su dirbtinio intelekto specifinėmis kontrolėmis, siekiant išsamios apsaugos

- **Dirbtinio intelekto specifinė grėsmių aplinka**: MCP sistemos susiduria su unikaliomis rizikomis, tokiomis kaip užklausų injekcija, įrankių užnuodijimas, sesijų užgrobimas, klaidinančių tarpininkų problemos, žetonų perleidimo pažeidžiamumai ir perteklinės teisės, kurioms reikalingos specializuotos priemonės

- **Autentifikacijos ir autorizacijos tobulinimas**: Įgyvendinkite patikimą autentifikaciją naudodami išorinius identiteto tiekėjus (Microsoft Entra ID), užtikrinkite tinkamą žetonų patvirtinimą ir niekada nepriimkite žetonų, kurie nėra aiškiai išduoti jūsų MCP serveriui

- **Apsauga nuo DI atakų**: Diegkite Microsoft Prompt Shields ir Azure Content Safety, kad apsisaugotumėte nuo netiesioginės užklausų injekcijos ir įrankių užnuodijimo atakų, tuo pačiu tikrinkite įrankių metaduomenis ir stebėkite dinamiškus pokyčius

- **Sesijos ir transporto saugumas**: Naudokite kriptografiškai saugius, nedeterministinius sesijos ID, susietus su vartotojo tapatybe, įgyvendinkite tinkamą sesijų gyvavimo ciklo valdymą ir niekada nenaudokite sesijų autentifikacijai

- **OAuth saugumo gerosios praktikos**: Užkirsti kelią klaidinančių tarpininkų atakoms per aiškų vartotojo sutikimą dinamiškai registruotiems klientams, teisingą OAuth 2.1 įgyvendinimą su PKCE ir griežtą persiuntimo URI patikrinimą  

- **Žetonų saugumo principai**: Venkite žetonų perleidimo antišablonų, tikrinkite žetonų auditorijos teiginius, naudokite trumpalaikius žetonus su saugiu rotavimu ir palaikykite aiškias pasitikėjimo ribas

- **Išsami tiekimo grandinės sauga**: Visus DI ekosistemos komponentus (modelius, įdėjimus, konteksto tiekėjus, išorinius API) vertinkite su tokiu pačiu saugumo rimtumu kaip ir tradicines programinės įrangos priklausomybes

- **Nuolatinė evoliucija**: Sekite sparčiai kintančius MCP specifikacijų pokyčius, prisidėkite prie saugumo bendruomenės standartų ir palaikykite adaptacinį saugumo požiūrį, kai protokolas bręsta

- **Microsoft saugumo integracija**: Pasinaudokite Microsoft išsamia saugumo ekosistema (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID), kad sustiprintumėte MCP diegimo apsaugą

## Išsamūs ištekliai

### **Oficiali MCP saugumo dokumentacija**
- [MCP specifikacija (dabartinė: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP saugumo gerosios praktikos](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autorizacijos specifikacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub saugykla](https://github.com/modelcontextprotocol)

### **OWASP MCP saugumo ištekliai**
- [OWASP MCP Azure saugumo vadovas](https://microsoft.github.io/mcp-azure-security-guide/) – Išsamus OWASP MCP Top 10 su Azure įgyvendinimo gairėmis
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Oficiali OWASP MCP saugumo rizikų apžvalga
- [MCP Saugumo viršūnių renginio dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktinis saugumo mokymas MCP Azure platformoje

### **Saugumo standartai ir gerosios praktikos**
- [OAuth 2.0 saugumo gerosios praktikos (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 internetinių programų sauga](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 dideliems kalbos modeliams](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft skaitmeninės gynybos ataskaita](https://aka.ms/mddr)

### **Dirbtinio intelekto saugumo tyrimai ir analizė**
- [Užklausų injekcija MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Įrankių užnuodijimo atakos (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP saugumo tyrimų apžvalga (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft saugumo sprendimai**
- [Microsoft Prompt Shields dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety paslauga](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID saugumas](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure žetonų valdymo gerosios praktikos](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub pažangus saugumas](https://github.com/security/advanced-security)

### **Įgyvendinimo vadovai ir pamokos**
- [Azure API valdymas kaip MCP autentifikacijos vartai](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentifikacija MCP serveriams](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Saugaus žetonų saugojimo ir šifravimo vaizdo įrašas](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps ir tiekimo grandinės saugumas**
- [Azure DevOps saugumas](https://azure.microsoft.com/products/devops)
- [Azure Repos saugumas](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft tiekimo grandinės saugumo kelionė](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Papildoma saugumo dokumentacija**

Išsamiai saugumo informacijai žr. šiuos specializuotus dokumentus šioje skiltyje:

- **[MCP saugumo gerosios praktikos 2025](./mcp-security-best-practices-2025.md)** – Išsamios MCP įgyvendinimo saugumo gerosios praktikos
- **[Azure Content Safety įgyvendinimas](./azure-content-safety-implementation.md)** – Praktiniai Azure Content Safety integracijos pavyzdžiai  
- **[MCP saugumo kontrolės 2025](./mcp-security-controls-2025.md)** – Naujausios saugumo kontrolės ir technikos MCP diegimams
- **[MCP gerosios praktikos trumpas vadovas](./mcp-best-practices.md)** – Greita būtinos MCP saugumo praktikos santrauka
- **[BlueHat 2026: DI ateities saugumas: gilių gynybos modelių taikymas MCP](https://www.youtube.com/watch?v=cVWB58kEt-Y)** – Gilių gynybos modeliai iš Microsoft saugumo reagavimo centro (MSRC)

### **Praktiniai saugumo mokymai**

- **[MCP saugumo viršūnių renginio dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/)** – Išsamios praktinės dirbtuvės MCP serverių saugumui Azure, su pažangiais etapais nuo Bazinio stovyklos iki Viršūnės
- **[OWASP MCP Azure saugumo vadovas](https://microsoft.github.io/mcp-azure-security-guide/)** – Standartinė architektūra ir įgyvendinimo gairės visoms OWASP MCP Top 10 rizikoms

---

## Kas toliau

Toliau: [3 skyrius: Pradžia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->