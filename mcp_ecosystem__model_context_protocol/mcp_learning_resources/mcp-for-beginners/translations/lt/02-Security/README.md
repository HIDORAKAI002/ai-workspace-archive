# MCP Saugumas: Visapusiška apsauga AI sistemoms

[![MCP Saugumo Geriausios Praktikos](../../../translated_images/lt/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Paspauskite aukščiau esančią nuotrauką, kad peržiūrėtumėte šios pamokos vaizdo įrašą)_

Saugumas yra esminis AI sistemų projektavimo aspektas, todėl tai yra mūsų antroji svarbi tema. Tai sutampa su Microsoft principu **Saugus pagal dizainą** iš [Saugios Ateities Iniciatyvos](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Modelio konteksto protokolas (MCP) suteikia galingas naujas galimybes AI pagrįstoms programoms, tačiau kartu kelia ir unikalius saugumo iššūkius, kurie viršija tradicinius programinės įrangos rizikos veiksnius. MCP sistemos susiduria tiek su įprastomis saugumo problemomis (saugus kodavimas, mažiausių privilegijų principas, tiekimo grandinės saugumas), tiek su naujomis AI specifinėmis grėsmėmis, įskaitant promptų injekcijas, priemonių užnuodijimą, sesijos pagrobimą, supainioto tarpininko atakas, žetonų perpaietimo pažeidžiamumus ir dinaminį galimybių modifikavimą.

Šioje pamokoje nagrinėjame svarbiausias saugumo rizikas MCP diegimuose — apžvelgiame autentifikaciją, autorizaciją, pernelyg dideles prieigas, netiesioginę promptų injekciją, sesijų saugumą, supainioto tarpininko problemas, žetonų valdymą ir tiekimo grandinės pažeidžiamumus. Išmoksite praktinių valdymo priemonių ir geriausių praktikų, kaip mažinti šias rizikas, naudodamiesi Microsoft sprendimais, tokiais kaip Prompt Shields, Azure Content Safety ir GitHub Advanced Security, kad sustiprintumėte savo MCP diegimą.

## Mokymosi tikslai

Pamokos pabaigoje galėsite:

- **Identifikuoti MCP specifines grėsmes**: Atpažinti unikalius MCP sistemų saugumo pavojus, tokius kaip promptų injekcija, priemonių užnuodijimas, pernelyg didelės teisės, sesijos pagrobimas, supainioto tarpininko problemos, žetonų perpaietimo pažeidžiamumai ir tiekimo grandinės rizikos
- **Taikyti saugumo valdymus**: Įgyvendinti veiksmingas apsaugos priemones, įskaitant tvirtą autentifikaciją, mažiausių privilegijų prieigą, saugų žetonų valdymą, sesijų saugumo kontrolę ir tiekimo grandinės patikrinimą
- **Naudoti Microsoft saugumo sprendimus**: Suprasti ir pritaikyti Microsoft Prompt Shields, Azure Content Safety ir GitHub Advanced Security MCP apkrovos apsaugai
- **Patikrinti priemonių saugumą**: Suprasti priemonių metaduomenų validacijos svarbą, stebėti dinamiškus pokyčius ir ginti nuo netiesioginės promptų injekcijos atakų
- **Integruoti geriausias praktikas**: Derinti įdiegtus saugumo pagrindus (saugus kodavimas, serverio sustiprinimas, nulinės pasitikėjimo politika) su MCP specifiniais valdymais visapusiškai apsaugai

# MCP saugumo architektūra ir valdymas

Šiuolaikiniai MCP diegimai reikalauja sluoksniuotų saugumo požiūrių, kurie sprendžia tiek tradicines programinės įrangos saugumo problemas, tiek AI specifines grėsmes. Greitai besikeičianti MCP specifikacija toliau tobulina saugumo valdymus, leidžiančius geriau integruotis su įmonių saugumo architektūromis ir įdiegtomis geriausiomis praktikomis.

[Microsoft skaitmeninės gynybos ataskaita](https://aka.ms/mddr) rodo, kad **98 % praneštų pažeidimų būtų užkardyti tvirtos saugumo higienos dėka**. Veiksmingiausia apsaugos strategija derina pamatines saugumo praktikas su MCP specifiniais valdymais — patvirtintos bazinės saugumo priemonės išlieka svarbiausios bendrai rizikos mažinimui.

## Dabartinė saugumo situacija

> **Pastaba:** Ši informacija atspindi MCP saugumo standartus nuo **2026 m. vasario 5 d.**, suderintus su **MCP specifikacija 2025-11-25**. MCP protokolas sparčiai tobulėja ir ateities diegimai gali pristatyti naujus autentifikacijos modelius bei patobulintus valdymus. Visada nuolat konsultuokitės su naujausia [MCP specifikacija](https://spec.modelcontextprotocol.io/), [MCP GitHub saugykla](https://github.com/modelcontextprotocol) ir [saugumo geriausių praktikų dokumentacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

> **Žvelgiant į priekį:** `2026-07-28` leidimo kandidatas dar labiau sustiprina autorizaciją — klientai privalo patikrinti `iss` parametrą autorizacijos atsakymuose (RFC 9207), nurodyti OpenID Connect `application_type` dinaminės kliento registracijos metu ir susieti registruotus kredencialus su išduodančiu autorizacijos serveriu. Pilną autorizacijos SEP sąrašą žr. [Kas keičiasi MCP: 2026-07-28 leidimo kandidatas](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## 🏔️ MCP saugumo viršūnių dirbtuvės (Sherpa)

Rekomenduojame praktines saugumo mokymosi dirbtuves **MCP Security Summit Workshop** (Sherpa) — išsamų vadovaujamą žygį, kaip apsaugoti MCP serverius Microsoft Azure aplinkoje.

### Dirbtuvių apžvalga

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) suteikia praktišką, veiksmingą saugumo mokymą, naudojant patikrintą metodiką „pažeidžiamumas → išnaudojimas → taisymas → patikrinimas“. Jūs:

- **Mokysitės per klaidų paiešką**: Susipažinsite su pažeidžiamumais, naudodamiesi tyčia nesaugiomis aplinkomis
- **Naudosite native Azure saugumą**: Pasinaudosite Azure Entra ID, Key Vault, API Management ir AI Content Safety
- **Seksite gilesnio apsaugos principą**: Žygiuosite per stovyklais, sukurdami išsamius saugumo sluoksnius
- **Taikysite OWASP standartus**: Kiekviena technika susieta su [OWASP MCP Azure Saugumo Vadovu](https://microsoft.github.io/mcp-azure-security-guide/)
- **Gausite gamybinius kodus**: Išeisite su veikiantimis, ištestuotais įgyvendinimais

### Ekspedicijos maršrutas

| Stovykla | Fokusas | Aprėpti OWASP rizikos |
|------|-------|---------------------|
| **Pagrindinė stovykla** | MCP pagrindai ir autentifikacijos pažeidžiamumai | MCP01, MCP07 |
| **1 stovykla: Tapatybė** | OAuth 2.1, Azure valdomos tapatybės, Key Vault | MCP01, MCP02, MCP07 |
| **2 stovykla: Tarpinis vartai** | API valdymas, privatūs galutiniai taškai, valdymas | MCP02, MCP06, MCP07, MCP09 |
| **3 stovykla: I/O saugumas** | Promptų injekcija, PII apsauga, turinio saugumas | MCP03, MCP05, MCP06, MCP10 |
| **4 stovykla: Stebėsena** | Log analizė, prietaisų skydeliai, grėsmių aptikimas | MCP04, MCP08 |
| **Viršūnė** | Raudonosios komandos / Mėlynosios komandos integracijos testas | Visi |

**Pradėti:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 saugumo rizikos

[OWASP MCP Azure Saugumo Vadove](https://microsoft.github.io/mcp-azure-security-guide/) išdėstytos dešimt svarbiausių MCP įgyvendinimo saugumo rizikų:

| Rizika | Aprašymas | Azure mažinimo priemonės |
|------|-------------|------------------|
| **MCP01** | Žetonų valdymo klaidos ir slaptumo atskleidimas | Azure Key Vault, valdomos tapatybės |
| **MCP02** | Privilegijų augimas per pernelyg platų apimtį | RBAC, sąlyginė prieiga |
| **MCP03** | Priemonių užnuodijimas | Priemonių validacija, integralumo patikra |
| **MCP04** | Programinės įrangos tiekimo grandinės atakos ir priklausomybių klastojimas | GitHub Advanced Security, priklausomybių skanavimas |
| **MCP05** | Komandų injekcija ir vykdymas | Įėjimo validacija, izoliuotos aplinkos naudojimas |
| **MCP06** | Ketinimų srauto subversija | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nepakankama autentifikacija ir autorizacija | Azure Entra ID, OAuth 2.1 su PKCE |
| **MCP08** | Trūksta audito ir telemetrijos | Azure Monitor, Application Insights |
| **MCP09** | Šešėliniai MCP serveriai | API centro valdymas, tinklo izoliacija |
| **MCP10** | Konteksto injekcija ir per didelis dalinimasis | Duomenų klasifikavimas, minimalus atskleidimas |

### MCP autentifikacijos raida

MCP specifikacija gerokai patobulėjo autentifikacijos ir autorizacijos srityje:

- **Pradinė tvarka**: Ankstyvosios specifikacijos reikalavo kurti individualius autentifikacijos serverius, MCP serveriai veikiantys kaip OAuth 2.0 autorizacijos serveriai, tiesiogiai valdantys vartotojų autentifikaciją
- **Dabartinis standartas (2025-11-25)**: atnaujinta specifikacija leidžia MCP serveriams perduoti autentifikaciją išoriniams tapatybės teikėjams (pvz., Microsoft Entra ID), gerinant saugumą ir mažinant diegimo sudėtingumą
- **Transporto sluoksnio saugumas**: pagerintas palaikymas saugiems transporto mechanizmams su tinkamais autentifikacijos modeliais tiek vietinėms (STDIO), tiek nuotolinėms (Streamable HTTP) jungtims

## Autentifikacija ir Autorizacijos saugumas

### Dabartiniai saugumo iššūkiai

Šiuolaikiniai MCP diegimai susiduria su keletu autentifikacijos ir autorizacijos iššūkių:

### Rizikos ir grėsmių vektoriai

- **Neteisingai sukonfigūruota autorizacijos logika**: Klaidingos autorizacijos realizacijos MCP serveriuose gali iššifruoti konfidencialius duomenis ir neteisingai taikyti prieigos kontrolę
- **OAuth žetono kompromitavimas**: Vietinio MCP serverio žetono vagystė leidžia užpuolikams apsimesti serveriais ir pasiekti žemyninę paslaugą
- **Žetonų perpaietimo pažeidžiamumai**: Netinkamas žetonų tvarkymas sukuria saugumo valdymo apeigas ir atsakomybės spragas
- **Pernelyg didelės teisės**: Per daug privilegijuoti MCP serveriai pažeidžia mažiausių privilegijų principą ir plečia atakos paviršius

#### Žetonų perpaietimas: kritinis neigiamas pavyzdys

**Žetonų perpaietimas yra aiškiai draudžiamas** dabartinėje MCP autorizacijos specifikacijoje dėl rimtų saugumo pasekmių:

##### Saugumo valdymo apeigos
- MCP serveriai ir žemyninės API įgyvendina kritinius saugumo valdymus (pvz., užklausų ribojimą, patikrinimą, eismo stebėseną), kurie priklauso nuo teisingos žetonų validacijos
- Tiesioginis kliento naudotojo žetonų perdavimas į API apeina šias būtinai apsaugas ir silpnina saugumo architektūrą

##### Atsakomybės ir audito iššūkiai  
- MCP serveriai negali atskirti klientų, naudojančių aukštyn srautu išduotus žetonus, todėl nutrūksta audito takeliai
- Žemyninės išteklių serveriai registruoja klaidingas užklausų kilmės vietas, o ne faktinius tarpininkus MCP serverius
- Incidentų tyrimas ir atitikties auditai tampa daug sudėtingesni

##### Duomenų nutekėjimo rizikos
- Nekuvaliduotos žetonų teiginių dėka pavogti žetonai leidžia piktavaliams naudoti MCP serverius kaip proxy duomenų nutekinimui
- Pasitikėjimo zonavimo pažeidimai leidžia neautorizuotą prieigos modelių naudojimą, apeinant numatytus saugumo valdymus

##### Daugiau paslaugų atakos vektoriai
- Kompromituoti žetonai, priimami keliuose servisuose, leidžia judėti lateraline kryptimi per sujungtas sistemas
- Pasitikėjimo prielaidos tarp paslaugų gali būti pažeistos, kai neįmanoma patvirtinti žetono kilmės

### Saugumo valdymai ir mitigacijos

**Svarbiausi saugumo reikalavimai:**

> **PRIVALOMA**: MCP serveriai **NETURI** priimti jokių žetonų, kurie nebuvo aiškiai išduoti konkrečiai tam MCP serveriui

#### Autentifikacijos ir autorizacijos valdymas

- **Griežtas autorizacijos peržiūrėjimas**: Atlikti išsamius MCP serverių autorizacijos auditus, kad prieigą prie konfidencialių išteklių turėtų tik numatytieji vartotojai ir klientai
  - **Įgyvendinimo vadovas**: [Azure API Management kaip autentifikacijos vartai MCP serveriams](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Tapatybės integracija**: [Microsoft Entra ID naudojimas MCP serverio autentifikacijai](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Saugus žetonų valdymas**: Įgyvendinti [Microsoft žetonų validacijos ir gyvavimo ciklo geriausias praktikas](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Patikrinti, ar žetonų auditorijos teiginiai atitinka MCP serverio tapatybę
  - Įgyvendinti tinkamas žetonų pasikeitimo ir galiojimo pabaigos taisykles
  - Užkirsti kelią žetonų pakartotinam panaudojimui ir neautorizuotam naudojimui

- **Apsaugotas žetonų saugojimas**: Užtikrinti žetonų saugojimą su šifravimu tiek ramybėje, tiek perdavimo metu
  - **Geriausios praktikos**: [Saugus žetonų saugojimas ir šifravimo gairės](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Prieigos valdymo įgyvendinimas

- **Mažiausių privilegijų principas**: Suteikti MCP serveriams tik minimalią prieigą, reikalingą numatytai funkcijai atlikti
  - Reguliarūs leidimų peržiūrėjimai ir atnaujinimai, kad būtų išvengta privilegijų išplėtimo
  - **Microsoft dokumentacija**: [Saugus mažiausių privilegijų prieigos įgyvendinimas](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Prieigos kontrolė pagal vaidmenis (RBAC)**: Įgyvendinti smulkiai reguliuojamus vaidmenų priskyrimus
  - Griežtai apibrėžti vaidmenis konkretiems ištekliams ir veiksmams
  - Vengti plačių ar nereikalingų leidimų, kurie didina atakos paviršių

- **Nuolatinė leidimų stebėsena**: įgyvendinti nuolatinį prieigos audito ir stebėsenos procesą
  - Stebėti leidimų naudojimosi modelius dėl anomalijų
  - Greitai šalinti perteklinius ar nenaudojamus leidimus

## AI specifinės saugumo grėsmės

### Promptų injekcijos ir priemonių manipuliavimo atakos

Šiuolaikiniai MCP diegimai susiduria su pažangiais AI specifiniais atakų vektoriais, kurių tradicinės saugumo priemonės negali visiškai pašalinti:

#### **Netiesioginė promptų injekcija (kryžminė domenų promptų injekcija)**

**Netiesioginė promptų injekcija** yra viena svarbiausių pažeidžiamumo rūšių MCP aktyvuotose AI sistemose. Užpuolikai įterpia piktybines instrukcijas išoriniame turinyje — dokumentuose, interneto puslapiuose, el. laiškuose ar duomenų šaltiniuose, kurias AI sistema vėliau interpretuoja kaip teisėtas komandas.

**Atakos scenarijai:**
- **Dokumentų injekcija**: Piktybinės instrukcijos slepiamos apdorotuose dokumentuose, sukeliančios netyčines AI veiksmus
- **Interneto turinio išnaudojimas**: Užkrėsti interneto puslapiai su įterptais promptais, kurie paveikia AI elgesį nuskaitymo metu
- **El. laiškų atakos**: Piktybiniai promptai el. laiškuose, verčiantys AI padėjėjus nutekinti informaciją ar atlikti neautorizuotus veiksmus
- **Duomenų šaltinių užteršimas**: Užkrėsti duomenų bazės ar API tiekia užkrėstą turinį AI sistemoms

**Realios pasekmės**: Šios atakos gali lemti duomenų nutekėjimą, privatumo pažeidimus, žalingo turinio generavimą ir vartotojų sąveikų manipuliavimą. Daugiau analizės žr. [Promptų injekcija MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Promptų injekcijos atakos schema](../../../translated_images/lt/prompt-injection.ed9fbfde297ca877.webp)

#### **Priemonių užnuodijimo atakos**

**Priemonių užnuodijimas** taikosi į MCP įrankių metaduomenis, išnaudojant LLM mode­lių interpretaciją apie įrankio aprašymus ir parametrus vykdymo sprendimams priimti.

**Atakos mechanizmai:**
- **Metaduomenų manipuliacija**: Užpuolikai įterpia piktybines instrukcijas į įrankių aprašymus, parametrų apibrėžimus ar naudojimo pavyzdžius
- **Nematomos instrukcijos**: Paslėpti promptai įrankių metaduomenyse, kuriuos apdoroja AI modeliai, bet žmonėms nematomi
- **Dinaminis įrankių modifikavimas („Rug Pull“) atvejai**: Vartotojų patvirtinti įrankiai vėliau modifikuojami vykdyti piktybinius veiksmus be vartotojo žinios
- **Parametrų injekcija**: Piktybinis turinys įterpiamas į įrankio parametrų schemas, paveikiantis modelio elgesį


**Patarnaujantys serveriai – rizikos**: Nuotoliniai MCP serveriai kelia didesnes rizikas, nes įrankių apibrėžimai gali būti atnaujinami po pradinio naudotojo patvirtinimo, sukurdami scenarijus, kai anksčiau saugūs įrankiai tampa kenksmingais. Išsamaus analizės ieškokite [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/lt/tool-injection.3b0b4a6b24de6bef.webp)

#### **Papildomi AI atakų vektoriai**

- **Kryžmiško domeno raginimo įpurškimas (XPIA)**: Sudėtingos atakos, kurios naudojasi kelių domenų turiniu, kad apeitų saugumo kontrolę
- **Dinaminis gebėjimų keitimas**: Laiko realybės įrankių gebėjimų pakeitimai, kurie išvengia pradinės saugumo įvertinimo
- **Konteksto lango užnuodijimas**: Atakos, kurios manipuliuoja dideliais konteksto langais, kad paslėptų kenksmingas instrukcijas
- **Modelio sumaišties atakos**: Modelio ribotumų išnaudojimas kuriant nenuspėjamą arba nesaugų elgesį


### AI saugumo rizikos poveikis

**Didelės įtakos pasekmės:**
- **Duomenų nutekėjimas**: Nepageidaujama prieiga ir jautrių įmonių ar asmeninių duomenų vagystė
- **Privatumo pažeidimai**: Asmeninės identifikuojamos informacijos (PII) ir konfidencialių verslo duomenų atskleidimas  
- **Sistemų manipuliacija**: Netinkami kritinių sistemų ir darbo procesų pakeitimai
- **Prisijungimo duomenų vagystė**: Autentifikavimo žetonų ir paslaugų prisijungimo duomenų kompromitavimas
- **Šoninė judėjimas**: Kompromituotų AI sistemų naudojimas kaip atskaitos taškai platesnėms tinklo atakoms

### Microsoft AI saugumo sprendimai

#### **AI Raginimo Skydai: Pažangus apsaugos nuo įpurškimo atakų mechanizmas**

Microsoft **AI Raginimo Skydai** užtikrina visapusišką apsaugą nuo tiesioginių ir netiesioginių raginimo įpurškimo atakų keliomis saugumo sluoksniais:

##### **Pagrindinės apsaugos priemonės:**

1. **Pažangus aptikimas ir filtravimas**
   - Mašininio mokymosi algoritmai ir NLP metodai aptinka kenksmingas instrukcijas išoriniame turinyje
   - Dokumentų, tinklalapių, el. laiškų ir duomenų šaltinių realaus laiko analizė dėl įterptų grėsmių
   - Kontekstinis supratimas apie teisėtas ir kenksmingas raginimo schemas

2. **Išryškinimo technologijos**  
   - Skiria patikimas sistemos instrukcijas nuo galimai kompromituotų išorinių įvesties duomenų
   - Teksto transformavimo metodai, kurie pagerina modelio aktualumą, izoliuodami kenksmingą turinį
   - Padeda AI sistemoms išlaikyti tinkamą instrukcijų hierarchiją ir ignoruoti įpurškimo komandas

3. **Skiriamųjų ženklų ir duomenų žymėjimo sistemos**
   - Aiškus ribų apibrėžimas tarp patikimų sistemos žinučių ir išorinio įvesties teksto
   - Specialūs žymekliai pabrėžia ribas tarp patikimų ir nepatikimų duomenų šaltinių
   - Aiški atskirtis neleidžia sumaišyti instrukcijų ir neleistino komandų vykdymo

4. **Nuolatinė grėsmių inteligenija**
   - Microsoft nuolat stebi kylančias atakos schemas ir atnaujina gynybą
   - Proaktyvus grėsmių ieškojimas naujiems įpurškimo metodams ir atakų vektoriams
   - Reguliarūs saugumo modelių atnaujinimai, siekiant išlaikyti efektyvumą prieš besikeičiančias grėsmes

5. **Azure turinio saugumo integracija**
   - Dalis išsamaus Azure AI turinio saugumo komplekso
   - Papildomi aptikimai dėl jailbreiko bandymų, žalingo turinio ir saugumo politikos pažeidimų
   - Vieningos saugumo valdymo priemonės visiems AI programos komponentams

**Įgyvendinimo šaltiniai**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/lt/prompt-shield.ff5b95be76e9c78c.webp)


## Pažangios MCP saugumo grėsmės

### Sesijos pagrobimo pažeidžiamumai

**Sesijos pagrobimas** yra kritinis atakos vektorius būsenos MCP įgyvendinimuose, kai neautorizuotos šalys gauna ir piktnaudžiauja teisėtais sesijos identifikatoriais, apsimesdamos klientais ir vykdydamos neleistinas operacijas.

#### **Atakų scenarijai ir rizikos**

- **Sesijos pagrobimo raginimo įpurškimas**: Užpuolikai su pavogtais sesijos ID įterpia kenksmingus įvykius į serverius, kurie dalinasi sesijos būsena, galimai sukeldami žalingas pasekmes arba pasiekiantys jautrią informaciją
- **Tiesioginis apsimetimas**: Pavogti sesijos ID leidžia tiesioginius MCP serverio skambučius, apeinant autentifikaciją, laikant užpuolikus teisėtais vartotojais
- **Kompromituoti tęstiniai duomenų srautai**: Užpuolikai gali netikėtai nutraukti užklausas, dėl ko teisėti klientai atnaujina reikalavimus su galimai kenksmingu turiniu

#### **Saugumo kontrolės sesijų valdyme**

**Kritiniai reikalavimai:**
- **Autorizacijos tikrinimas**: MCP serveriai, įgyvendinantys autorizaciją, **PRIVALO** patikrinti VISUS įeinančius užklausimus ir **NETURI** pasikliauti sesijomis autentifikacijai
- **Saugus sesijos generavimas**: Naudoti kriptografiškai saugius, nedeterministinius sesijos identifikatorius, sugeneruotus naudojant saugius atsitiktinių skaičių generatorius
- **Vartotojui pritaikytas rišimas**: Susieti sesijos ID su vartotojo informacija, naudojant formatus kaip `<user_id>:<session_id>`, kad būtų išvengta sesijų piktnaudžiavimo tarp vartotojų
- **Sesijos gyvavimo ciklo valdymas**: Įgyvendinti tinkamą galiojimo pabaigą, rotaciją ir neatgaliojimą, kad būtų sumažintos pažeidžiamumo galimybės
- **Transporto saugumas**: Privaloma naudoti HTTPS visai komunikacijai, siekiant užkirsti kelią sesijos ID perėmimui

### Sumaišyto delegato problematika

**Sumaišyto delegato problema** atsiranda, kai MCP serveriai veikia kaip autentifikacijos tarpininkai tarp klientų ir trečiųjų šalių paslaugų, sukurdami galimybes apeiti autorizaciją pasinaudojant statiniais kliento ID.

#### **Atakos mechanizmai ir rizikos**

- **Slapukų pagrindu sutarties apeinimas**: Ankstesnė vartotojo autentifikacija sukuria sutikimo slapukus, kuriuos užpuolikai išnaudoja per kenksmingus autorizacijos užklausimus su sukurtomis peradresavimo URI
- **Autorizacijos kodo vagystė**: Esami sutikimo slapukai gali leisti autorizacijos serveriams praleisti sutikimo ekranus, peradresuojant kodus į užpuolikų kontroliuojamus galinius taškus  
- **Neautorizuota API prieiga**: Pavogti autorizacijos kodai leidžia keistis žetonais ir apsimesti vartotojais be aiškaus sutikimo

#### **Mažinimo strategijos**

**Būtinos kontrolės:**
- **Aiškūs sutikimo reikalavimai**: MCP tarpiniai serveriai, naudojantys statinius klientų ID, **PRIVALO** gauti vartotojo sutikimą kiekvienam dinamiškai registruotam klientui
- **OAuth 2.1 saugumo įgyvendinimas**: Laikytis dabartinių OAuth saugumo geriausių praktikų, įskaitant PKCE (Proof Key for Code Exchange) visoms autorizacijos užklausoms
- **Griežta kliento tikrinimas**: Įgyvendinti griežtą peradresavimo URI ir kliento identifikatorių validaciją, siekiant apsisaugoti nuo išnaudojimų

### Žetonų perdavimo pažeidžiamumai  

**Žetonų perdavimas** yra aiškus anti-pattern, kai MCP serveriai priima klientų žetonus be tinkamo patikrinimo ir juos perduoda API sluoksniams, taip pažeisdami MCP autorizacijos specifikacijas.

#### **Saugumo pasekmės**

- **Kontrolės apeinimas**: Tiesioginis klientas-API žetonų naudojimas apeina svarbias ribojimo, validacijos ir stebėjimo priemones
- **Auditavimo grandinės sugadinimas**: Iš viršaus gauti žetonai neleidžia identifikuoti kliento, todėl vyksta incidentų tyrimų trukdžiai
- **Perdavimo serverių piktnaudžiavimas**: Netikrinti žetonai leidžia kenksmingoms šalims naudoti serverius kaip peradresavimo taškus neautorizuotam duomenų prieigai
- **Pasitikėjimo ribų pažeidimai**: Galutinių paslaugų pasitikėjimo prielaidos gali būti pažeistos, kai žetonų kilmė negali būti patvirtinta
- **Daugiapakopės atakos plėtra**: Kompromituoti žetonai, priimami keliuose servisuose, leidžia šoninį judėjimą

#### **Reikalaujamos saugumo kontrolės**

**Nesuderinami reikalavimai:**
- **Žetonų validacija**: MCP serveriai **NETURI** priimti žetonų, kurie nėra aiškiai išduoti MCP serveriui
- **Audiencijos patikra**: Visada tikrinti, ar žetono auditorijos pareiškimai atitinka MCP serverio identitetą
- **Tinkamas žetonų gyvavimo ciklas**: Įgyvendinti trumpalaikius prieigos žetonus su saugiu rotacijos mechanizmu


## Tiekimo grandinės saugumas AI sistemoms

Tiekimo grandinės saugumas išsiplėtė nuo tradicinių programinės įrangos priklausomybių ir apima visą AI ekosistemą. Modernūs MCP įgyvendinimai privalo griežtai tikrinti ir stebėti visus su AI susijusius komponentus, nes kiekvienas iš jų įveda potencialias spragas, galinčias kompromituoti sistemos vientisumą.

### Išplėstiniai AI tiekimo grandinės komponentai

**Tradicinės programinės įrangos priklausomybės:**
- Atviro kodo bibliotekos ir karkasai
- Konteinerių atvaizdai ir pagrindinės sistemos  
- Kūrimo įrankiai ir statybos pipeline'ai
- Infrastruktūros komponentai ir paslaugos

**AI specifiniai tiekimo grandinės elementai:**
- **Pagrindiniai modeliai**: Iš anksto apmokyti modeliai iš įvairių teikėjų, kuriems reikia kilmės patikros
- **Įterpimo paslaugos**: Išorinės vektorizacijos ir semantinio paieškos paslaugos
- **Konteksto tiekėjai**: Duomenų šaltiniai, žinių bazės ir dokumentų archyvai  
- **Trečiųjų šalių API**: Išorinės AI paslaugos, ML pipeline'ai ir duomenų apdorojimo galiniai taškai
- **Modelių artefaktai**: Svoriai, konfigūracijos ir tikslintų modelių variantai
- **Mokymosi duomenų šaltiniai**: Duomenų rinkiniai, naudojami modelių mokymui ir tikslinimui

### Išsamios tiekimo grandinės saugumo strategija

#### **Komponentų patikrinimas ir pasitikėjimas**
- **Kilmės validacija**: Patikrinkite visų AI komponentų kilmę, licencijavimą ir vientisumą prieš integruojant
- **Saugumo vertinimas**: Vykdykite pažeidžiamumo skenavimus ir saugumo peržiūras modeliams, duomenų šaltiniams ir AI paslaugoms
- **Reputacijos analizė**: Įvertinkite AI paslaugų teikėjų saugumo patirtį ir praktikas
- **Atitikties patikra**: Užtikrinkite, kad visi komponentai atitiktų organizacijos saugumo ir reglamentavimo reikalavimus

#### **Saugūs diegimo pipeline'ai**  
- **Automatizuotas CI/CD saugumas**: Integruokite saugumo skenavimą per visus automatizuotus diegimo pipeline'us
- **Artefaktų vientisumas**: Įgyvendinkite kriptografinį patikrinimą visiems diegiamiems artefaktams (kodas, modeliai, konfigūracijos)
- **Laipsniškas diegimas**: Naudokite palaipsnio diegimo strategijas su saugumo patikrinimu kiekviename etape
- **Patikimos artefaktų saugyklos**: Diegti tik iš patikrintų, saugių artefaktų registrų ir saugyklų

#### **Nuolatinis stebėjimas ir reagavimas**
- **Priklausomybių skenavimas**: Nuolatinis pažeidžiamumo stebėjimas visoms programinės įrangos ir AI komponentų priklausomybėms
- **Modelių stebėjimas**: Nuolatinė modelių elgesio, našumo pokyčių ir saugumo anomalijų analizė
- **Paslaugų sveikatos stebėsena**: Stebėti išorines AI paslaugas dėl prieinamumo, saugumo incidentų ir politikos pokyčių
- **Grėsmių informacijos integracija**: Įtraukti specifinius AI ir ML saugumo rizikų signalus

#### **Prieigos kontrolė ir mažiausios privilegijos principas**
- **Komponentų lygmens leidimai**: Riboti prieigą prie modelių, duomenų ir paslaugų, remiantis verslo poreikiais
- **Paslaugų paskyrų valdymas**: Įgyvendinti dedikuotas paslaugų paskyras su minimaliomis reikalingomis teisėmis
- **Tinklo segmentacija**: Izoliuoti AI komponentus ir apriboti tinklo prieigą tarp paslaugų
- **API vartų kontrolė**: Naudoti centralizuotus API vartus prieigos prie išorinės AI paslaugų kontrolei ir stebėsenai

#### **Incidentų valdymas ir atkūrimas**
- **Greito reagavimo procedūros**: Nustatytos procedūros pažeistiems AI komponentams taisyti arba keisti
- **Prisijungimo duomenų rotacija**: Automatizuotos sistemos slaptųjų raktų, API raktų ir paslaugų prisijungimo duomenų rotacijai
- **Atstatymo galimybės**: Gebėjimas greitai grąžinti ankstesnes patikrintas AI komponentų versijas
- **Tiekimo grandinės pažeidimų atkūrimas**: Specifinės procedūros reaguoti į aukštesnės grandies AI paslaugų kompromitavimus

### Microsoft saugumo įrankiai ir integracija

**GitHub Advanced Security** užtikrina visapusišką tiekimo grandinės apsaugą, įskaitant:
- **Slaptųjų duomenų skenavimas**: Automatizuotas kredencialų, API raktų ir žetonų aptikimas saugyklose
- **Priklausomybių skenavimas**: Pažeidžiamumo vertinimas atviro kodo priklausomybėms ir bibliotekomis
- **CodeQL analizė**: Statinė kodo analizė saugumo spragoms ir programavimo klaidoms
- **Tiekimo grandinės įžvalgos**: Matomumas priklausomybių būklei ir saugumo statusui

**Azure DevOps ir Azure Repos integracija:**
- Sklandus saugumo skenavimo integravimas Microsoft kūrimo platformose
- Automatizuoti saugumo patikrinimai Azure Pipelines AI darbo krūviams
- Politikos vykdymas saugiam AI komponentų diegimui

**Microsoft vidinės praktikos:**
Microsoft vykdo išplėtotas tiekimo grandinės saugumo praktikas visuose produktuose. Sužinokite apie patikrintus metodus [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Pagrindinės saugumo gerosios praktikos

MCP įgyvendinimai paveldi ir plečia jūsų organizacijos esamą saugumo poziciją. Sustiprinant pagrindines saugumo praktikas, žymiai pagerėja bendras AI sistemų ir MCP diegimų saugumas.

### Saugumo pagrindai

#### **Saugios kūrimo praktikos**
- **OWASP atitiktis**: Apsauga nuo [OWASP Top 10](https://owasp.org/www-project-top-ten/) žiniatinklio programų pažeidžiamumų
- **AI specifinė apsauga**: Įgyvendinkite kontrolę pagal [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Saugus slaptųjų duomenų valdymas**: Naudokite atskiras saugyklas tokenams, API raktams ir jautriems konfigūracijos duomenims
- **Galutinis šifravimas**: Užtikrinkite saugų ryšį visuose programos komponentuose ir duomenų srautuose
- **Įvesties validacija**: Griežtas visų naudotojų įvesties duomenų, API parametrų ir duomenų šaltinių tikrinimas

#### **Infrastruktūros sukietinimas**
- **Daugiafaktorinė autentifikacija**: Privaloma MFA visoms administravimo ir paslaugų paskyroms
- **Aplikacijų atnaujinimai**: Automatizuoti, laiku atliekami operacinių sistemų, karkasų ir priklausomybių atnaujinimai  
- **Tapatybės tiekėjo integracija**: Centralizuotas identiteto valdymas per įmonės identiteto tiekėjus (Microsoft Entra ID, Active Directory)
- **Tinklo segmentacija**: Loginė MCP komponentų izoliacija, siekiant riboti šoninį judėjimą
- **Mažiausios privilegijos principas**: Minimalios reikalingos teisės visiems sistemos komponentams ir paskyroms

#### **Saugumo stebėjimas ir aptikimas**
- **Išsamus žurnalas**: Išsamus AI programos veiklų, įskaitant MCP klientų-serverių sąveiką, fiksavimas
- **SIEM integracija**: Centralizuotas saugumo informacijos ir įvykių valdymas anomalijų aptikimui
- **Elgesio analizė**: AI pagrįstas sistemos ir vartotojų elgesio neįprastų modelių stebėjimas
- **Grėsmių žinios**: Išorinių grėsmių srautų ir kompromitacijos ženklų (IOC) integracija
- **Incidentų valdymas**: Aiškiai apibrėžtos procedūros saugumo incidentų aptikimui, reagavimui ir atkūrimui

#### **Nulinės pasitikėjimo architektūra**
- **Niekada nepasitikėkite, visada tikrinkite**: Nuolatinis vartotojų, įrenginių ir tinklo ryšių tikrinimas
- **Mikro segmentacija**: Smulkios tinklo kontrolės, izoliuojančios atskirus darbo krūvius ir paslaugas
- **Tapatybės orientuotas saugumas**: Saugumo politikos pagrįstos patikrintomis tapatybėmis, o ne tinklo vieta
- **Nuolatinė rizikos analizė**: Dinaminis saugumo pozicijos vertinimas, remiantis dabartiniu kontekstu ir elgesiu
- **Sąlyginė prieiga**: Prieigos kontrolės, kurios prisitaiko pagal rizikos veiksnius, vietą ir įrenginio pasitikėjimą

### Įmonės integracijos modeliai

#### **Microsoft saugumo ekosistemos integracija**
- **Microsoft Defender for Cloud**: Išsamus debesijos saugumo pozicijos valdymas
- **Azure Sentinel**: Debesijos SIEM ir SOAR galimybės AI darbo krūvių apsaugai
- **Microsoft Entra ID**: Įmonių identiteto ir prieigos valdymas su sąlygine prieiga
- **Azure Key Vault**: Centralizuotas slaptųjų duomenų valdymas su aparatine saugumo modulių parama (HSM)
- **Microsoft Purview**: Duomenų valdymas ir atitiktis AI duomenų šaltiniams ir darbo procesams

#### **Atitiktis ir valdymas**
- **Reglamentinis suderinamumas**: Užtikrinkite, kad MCP įgyvendinimai atitiktų pramonės specifinius atitikties reikalavimus (GDPR, HIPAA, SOC 2)

- **Duomenų klasifikacija**: Tinkamas svarbių duomenų, kuriuos apdoroja DI sistemos, kategorizavimas ir tvarkymas
- **Auditavimo įrašai**: Išsamus žurnalavimas atitikties reguliavimui ir teismo tyrimams
- **Privatumo valdymas**: Privatumo pagal dizainą principų įgyvendinimas DI sistemos architektūroje
- **Pakeitimų valdymas**: Formalūs saugumo peržiūros procesai DI sistemos modifikacijoms

Šios esminės praktikos sukuria tvirtą saugumo pagrindą, kuris pagerina MCP specifinių saugumo priemonių veiksmingumą ir užtikrina visapusišką apsaugą DI pagrindu veikiančioms programoms.

## Pagrindinės saugumo išvados

- **Sluoksniuota saugumo strategija**: Apjungti pamatines saugumo praktikas (saugus programavimas, mažiausios privilegijos, tiekimo grandinės patikra, nuolatinis stebėjimas) su DI specifinėmis priemonėmis visapusiškai apsaugai

- **DI specifinė grėsmių aplinka**: MCP sistemos susiduria su unikaliomis rizikomis, tokiomis kaip promptų injekcija, įrankių apsinuodijimas, sesijų užgrobimas, klystančio tarpininko problemos, tokenų perpylimo pažeidžiamumai ir perteklinės teisės, kurioms reikalingos specializuotos priemonės

- **Autentifikacijos ir autorizacijos meistriškumas**: Naudoti stiprią autentifikaciją su išoriniais tapatybės teikėjais (Microsoft Entra ID), užtikrinti teisingą tokenų patvirtinimą ir niekada nepriimti tokenų, kurie nėra aiškiai išduoti jūsų MCP serveriui

- **DI atakų prevencija**: Naudoti Microsoft Prompt Shields ir Azure Content Safety, kad apsaugotumėte nuo netiesioginių promptų injekcijų ir įrankių apsinuodijimo atakų, kartu tikrinti įrankių metaduomenis ir stebėti dinamiškus pokyčius

- **Sesijos ir transporto saugumas**: Naudoti kriptografiškai saugius, nedeterministinius sesijos ID, susietus su vartotojo tapatybe, įgyvendinti tinkamą sesijos gyvavimo valdymą ir niekada nenaudoti sesijų autentifikacijai

- **OAuth saugumo gerosios praktikos**: Apsaugoti nuo klystančio tarpininko atakų per aiškų vartotojo sutikimą dinamiškai registruotiems klientams, tinkamai įgyvendinti OAuth 2.1 su PKCE ir griežtai verifikuoti persiuntimo URI  

- **Tokenų saugumo principai**: Vengti tokenų perpylimo antišablonų, tikrinti tokenų auditorijų teiginius, naudoti trumpalaikius tokenus su saugiu jų keitimu ir palaikyti aiškias pasitikėjimo ribas

- **Visapusiškas tiekimo grandinės saugumas**: Visus DI ekosistemos komponentus (modelius, įterpinius, konteksto tiekėjus, išorinius API) vertinti su tokia pačia saugumo rimtimi kaip tradicines programinės įrangos priklausomybes

- **Nuolatinė evoliucija**: Būti nuolat informuotam apie greitai besikeičiančias MCP specifikacijas, prisidėti prie saugumo bendruomenės standartų ir palaikyti adaptuojamą saugumo poziciją, kai protokolas tobulėja

- **„Microsoft“ saugumo integracija**: Išnaudoti „Microsoft“ išsamų saugumo ekosistemą (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) geresnei MCP diegimo apsaugai

## Visapusiški ištekliai

### **Oficiali MCP saugumo dokumentacija**
- [MCP specifikacija (dabartinė: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP saugumo gerosios praktikos](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autorizacijos specifikacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub saugykla](https://github.com/modelcontextprotocol)

### **OWASP MCP saugumo ištekliai**
- [OWASP MCP Azure saugumo vadovas](https://microsoft.github.io/mcp-azure-security-guide/) - Išsamus OWASP MCP Top 10 su Azure įgyvendinimo gairėmis
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficialios OWASP MCP saugumo grėsmės
- [MCP saugumo suvažiavimo dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktinis MCP saugumo mokymas Azure aplinkoje

### **Saugumo standartai ir geriausios praktikos**
- [OAuth 2.0 saugumo geriausios praktikos (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 tinklapių programėlių saugumas](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 didelių kalbų modeliams](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft skaitmeninės gynybos ataskaita](https://aka.ms/mddr)

### **DI saugumo tyrimai ir analizė**
- [Promptų injekcija MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Įrankių apsinuodijimo atakos (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP saugumo tyrimų apžvalga (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft saugumo sprendimai**
- [Microsoft Prompt Shields dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety paslauga](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID saugumas](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure tokenų valdymo geriausios praktikos](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Įgyvendinimo vadovai ir pamokos**
- [Azure API valdymas kaip MCP autentifikacijos vartai](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentifikacija MCP serveriams](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Saugus tokenų saugojimas ir šifravimas (vaizdo įrašas)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps ir tiekimo grandinės saugumas**
- [Azure DevOps saugumas](https://azure.microsoft.com/products/devops)
- [Azure Repos saugumas](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft tiekimo grandinės saugumo kelionė](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Papildoma saugumo dokumentacija**

Išsamioms saugumo gairėms žr. šiuos specializuotus dokumentus šiame skirsnyje:

- **[MCP saugumo gerosios praktikos 2025](./mcp-security-best-practices-2025.md)** - Pilnas MCP įgyvendinimų saugumo rekomendacijų rinkinys
- **[Azure Content Safety įgyvendinimas](./azure-content-safety-implementation.md)** - Praktiniai Azure Content Safety integracijos pavyzdžiai  
- **[MCP saugumo valdikliai 2025](./mcp-security-controls-2025.md)** - Naujausi saugumo valdikliai ir metodikos MCP diegimams
- **[MCP geriausių praktikų greitoji nuoroda](./mcp-best-practices.md)** - Greitoji nuoroda esminėms MCP saugumo praktikoms
- **[BlueHat 2026: DI ateities saugumas: MCP saugumas gynyba sluoksnyje](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Gynybos sluoksniu modeliai iš Microsoft Security Response Center (MSRC)

### **Praktiniai saugumo mokymai**

- **[MCP saugumo suvažiavimo dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/)** - Išsamios praktinės dirbtuvės MCP serverių saugumui Azure su progresinėmis stovyklomis nuo Bazinės stovyklos iki aukščiausio lygio
- **[OWASP MCP Azure saugumo vadovas](https://microsoft.github.io/mcp-azure-security-guide/)** - Nuorodų architektūra ir įgyvendinimo gairės visoms OWASP MCP Top 10 grėsmėms

---

## Kas toliau

Toliau: [3 skyrius: Pradžia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->