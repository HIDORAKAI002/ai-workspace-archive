# MCP Saugumas: Išsamus AI Sistemų Apsaugos Vadovas

[![MCP Security Best Practices](../../../translated_images/lt/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Spustelėkite aukščiau esančią nuotrauką, kad peržiūrėtumėte šio mokymo vaizdo įrašą)_

Saugumas yra pagrindinis AI sistemų dizaino elementas, todėl mes skiriame jam ypatingą dėmesį kaip antrajai skyriui. Tai atitinka Microsoft **Secure by Design** principą iš [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Modelio Konteksto Protokolas (MCP) suteikia galingas naujas galimybes AI varomoms programoms, tuo pačiu iškilus unikaliems saugumo iššūkiams, kurie viršija tradicinių programinės įrangos rizikų ribas. MCP sistemos susiduria tiek su įprastomis saugumo problemomis (saugus kodavimas, mažiausių privilegijų principas, tiekimo grandinės saugumas), tiek su naujomis AI specifinėmis grėsmėmis, įskaitant promptų injekciją, įrankių nuodijimą, sesijų grobimą, sumaišytų atstovų atakas, žetonų persiuntimo pažeidžiamumus bei dinaminį galimybių keitimą.

Ši pamoka nagrinėja svarbiausias saugumo rizikas MCP įgyvendinimuose – apimant autentifikaciją, autorizaciją, pernelyg plačias teises, netiesioginę promptų injekciją, sesijų saugumą, sumaišytų atstovų problemas, žetonų valdymą ir tiekimo grandinės pažeidžiamumus. Sužinosite praktiškus valdymo metodus ir geriausias praktikas, kaip sumažinti šias rizikas, pasitelkdami Microsoft sprendimus kaip Prompt Shields, Azure Content Safety ir GitHub Advanced Security, kad sustiprintumėte savo MCP diegimą.

## Mokymosi Tikslai

Pamokos pabaigoje galėsite:

- **Atpažinti MCP specifines grėsmes**: Atpažinti unalias MCP sistemų saugumo rizikas, įskaitant promptų injekciją, įrankių nuodijimą, pernelyg dideles teises, sesijų grobimą, sumaišytų atstovų problemas, žetonų persiuntimo pažeidžiamumus ir tiekimo grandinės rizikas
- **Taikyti saugumo priemones**: Įgyvendinti veiksmingas rizikų mažinimo priemones, įskaitant robustinę autentifikaciją, mažiausių privilegijų prieigą, saugų žetonų valdymą, sesijų saugumo valdymą ir tiekimo grandinės patikrinimą
- **Pasinaudoti Microsoft saugumo sprendimais**: Suprasti ir naudoti Microsoft Prompt Shields, Azure Content Safety ir GitHub Advanced Security MCP darbo krūvio apsaugai
- **Patvirtinti įrankių saugumą**: Suprasti įrankių metaduomenų validacijos svarbą, stebėti dinaminius pakeitimus ir apsisaugoti nuo netiesioginės promptų injekcijos atakų
- **Integruoti geriausias praktikas**: Suderinti patvirtintas saugumo pagrindus (saugus kodavimas, serverių standinimas, zerotrust) su MCP specifinėmis kontrolėmis išsamiai apsaugai

# MCP saugumo architektūra ir kontrolės

Šiuolaikiniai MCP įgyvendinimai reikalauja sluoksniuotų saugumo priemonių, kurios sprendžia tiek tradicines programinės įrangos saugumo problemas, tiek AI specifines grėsmes. Greitai tobulėjanti MCP specifikacija nuolat gerina saugumo kontrolės priemones, leidžiančias geriau integruotis į įmonių saugumo architektūras ir patvirtintas geriausias praktikas.

[Microsoft Digital Defense Report](https://aka.ms/mddr) tyrimai rodo, kad **98% praneštų pažeidimų būtų išvengti laikantis patikimos saugumo higienos**. Efektyviausia apsaugos strategija jungia pagrindines saugumo praktikas su MCP specifinėmis kontrolėmis – patikrintos saugumo bazinės priemonės išlieka didžiausiu bendros rizikos mažinimo veiksniu.

## Dabartinė saugumo situacija

> **Pastaba:** ši informacija atspindi MCP saugumo standartus **2026 m. vasario 5 d.**, suderintus su **MCP Specification 2025-11-25**. MCP protokolas nuolat greitai tobulėja, ir ateities įgyvendinimai gali pristatyti naujus autentifikacijos modelius ir patobulintas kontrolės priemones. Visada remkitės dabartine [MCP specifikacija](https://spec.modelcontextprotocol.io/), [MCP GitHub saugykla](https://github.com/modelcontextprotocol) ir [saugumo geriausių praktikų dokumentacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) norėdami gauti naujausią informaciją.

## 🏔️ MCP Saugumo Viršūnių Dirbtuvės (Sherpa)

Norėdami **praktinio saugumo mokymo**, rekomenduojame **MCP Saugumo Viršūnių Dirbtuves** (Sherpa) – išsamų vedamą žygį MCP serverių apsaugai Microsoft Azure aplinkoje.

### Dirbtuvių apžvalga

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) suteikia praktišką ir veiksmingą saugumo mokymą per patikrintą "trūkumas → išnaudojimas → taisymas → patvirtinimas" metodiką. Jūs:

- **Mokysitės mėtydami sistemos trūkumus**: tiesiogiai patirsite saugumo spragas išnaudodami tyčia nesaugias serverių dalis
- **Naudosite Azure gimtąją apsaugą**: Azure Entra ID, Key Vault, API valdymą ir AI Content Safety
- **Vadovausitės gilios gynybos principu**: žygiuosite per kampus, kuriant išsamias saugumo sluoksnius
- **Taikysite OWASP standartus**: kiekviena technika atitinka [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Gaunate gamybinius kodus**: išeinate su veiksniais, išbandytais sprendimais

### Žygio maršrutas

| Stovyklavietė | Pagrindinė tema | Apimtos OWASP rizikos |
|---------------|-----------------|----------------------|
| **Pagrindinė stovykla** | MCP pagrindai ir autentifikacijos spragos | MCP01, MCP07 |
| **1 stovykla: Tapatybė** | OAuth 2.1, Azure valdomos tapatybės, Key Vault | MCP01, MCP02, MCP07 |
| **2 stovykla: Vartai** | API valdymas, privatūs taškai, valdymas | MCP02, MCP07, MCP09 |
| **3 stovykla: I/O Saugumas** | Promptų injekcija, PII apsauga, turinio saugumas | MCP03, MCP05, MCP06 |
| **4 stovykla: Stebėsena** | Logų analizė, prietaisų skydeliai, grėsmių aptikimas | MCP08 |
| **Viršūnė** | Raudonosios / Mėlynosios komandos integraciniai testai | Visi |

**Pradėti:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 saugumo rizikos

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) pateikia dešimt svarbiausių MCP įgyvendinimų saugumo rizikų:

| Rizika | Aprašymas | Azure prevencijos priemonės |
|--------|-----------|-----------------------------|
| **MCP01** | Žetonų netinkamas valdymas ir slaptų duomenų nutekėjimas | Azure Key Vault, valdomos tapatybės |
| **MCP02** | Privilegijų kilimas per per daug plačius nustatymus | RBAC, sąlyginė prieiga |
| **MCP03** | Įrankių nuodijimas | Įrankių validacija ir vientisumo patikra |
| **MCP04** | Tiekimo grandinės atakos | GitHub Advanced Security, priklausomybių skanavimas |
| **MCP05** | Komandų injekcija ir vykdymas | Duomenų validacija, sandbox’as |
| **MCP06** | Promptų injekcija per kontekstines užduotis | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nepakankama autentifikacija ir autorizacija | Azure Entra ID, OAuth 2.1 su PKCE |
| **MCP08** | Sekimo ir telemetrijos trūkumas | Azure Monitor, Application Insights |
| **MCP09** | Slapti MCP serveriai | API centro valdymas, tinklo atskyrimas |
| **MCP10** | Konteksto injekcija ir per didelis dalijimasis | Duomenų klasifikacija, minimalus duomenų viešinimas |

### MCP autentifikacijos evoliucija

MCP specifikacija smarkiai evoliucionavo autentifikacijos ir autorizacijos požiūriu:

- **Pradinis požiūris**: ankstyvose specifikacijose kūrėjai turėjo įgyvendinti savarankiškus autentifikacijos serverius, o MCP serveriai veikė kaip OAuth 2.0 autorizacijos serveriai, tiesiogiai valdantys vartotojų autentifikaciją
- **Dabartinis standartas (2025-11-25)**: atnaujinta specifikacija leidžia MCP serveriams deleguoti autentifikaciją išoriniams tapatybės teikėjams (pvz., Microsoft Entra ID), gerinant saugumo būklę ir mažinant įgyvendinimų sudėtingumą
- **Transporto sluoksnio sauga**: patobulinta sauga transporto mechanizmams, su tinkamais autentifikacijos modeliais tiek vietinėms (STDIO), tiek nuotolinėms (Streamable HTTP) jungtims

## Autentifikacijos ir autorizacijos saugumas

### Dabartiniai saugumo iššūkiai

Šiuolaikiniai MCP įgyvendinimai susiduria su keliomis autentifikacijos ir autorizacijos problemomis:

### Rizikos ir atakų vektoriai

- **Neteisingai sukonfigūruota autorizacijos logika**: klaidinga autorizacijos įgyvendinimo MCP serveriuose gali atskleisti jautrius duomenis ir neteisingai taikyti prieigos kontrolę
- **OAuth žetonų kompromitavimas**: vietinio MCP serverio žetonų vagystė leidžia atakutojui apsimesti serveriu ir pasiekti tolimas paslaugas
- **Žetonų persiuntimo pažeidžiamumai**: netinkamas žetonų valdymas sukuria saugumo kontrolės apeigas ir atsakingumo spragas
- **Pernelyg plačios teisės**: per daug privilegijuoti MCP serveriai pažeidžia mažiausių privilegijų principą ir plečia atakos paviršių

#### Žetonų persiuntimas: kritinis anti-patternas

**Žetonų persiuntimas yra aiškiai draudžiamas** dabartinėje MCP autorizacijos specifikacijoje dėl sunkių saugumo pasekmių:

##### Saugumo kontrolės apeigos  
- MCP serveriai ir žemiau esantys API įgyvendina svarbias saugumo kontrolės priemones (pvz., greičio ribojimą, užklausų validaciją, srauto stebėseną), kurios priklauso nuo tinkamos žetonų validacijos  
- Tiesioginis kliento žetonų panaudojimas API apeina šias apsaugas ir silpnina saugumo architektūrą  

##### Atsakingumo ir audito iššūkiai  
- MCP serveriai negali atskirti klientų, naudojančių išduotus žetonus, todėl sulaužomos audito grandinės  
- Žemiau esančių resursų serverių žurnaluose rodomi klaidinantys užklausų šaltiniai, o ne faktiniai MCP serveriai  
- Incidentų tyrimas ir atitikties auditas ženkliai apsunkinamas  

##### Duomenų nutekinimo rizikos  
- Netinkamai validuoti žetonų teiginiai leidžia kenkėjams, turintiems pavogtus žetonus, naudoti MCP serverius kaip tarpininkus duomenų nutekinimui  
- Pasitikėjimo ribų pažeidimai leidžia neautorizuotą prieigos schemą, apeinant numatytas apsaugas  

##### Daugialypės paslaugų atakos vektoriai  
- Kompromituoti žetonai, priimami keliuose serveriuose, leidžia plisti per tarpusavyje sujungtas sistemas  
- Pasitikėjimo modeliai tarp paslaugų gali būti pažeisti, kai žetonų kilmė nepatvirtinama  

### Saugumo valdikliai ir mažinimo priemonės

**Kritiniai saugumo reikalavimai:**

> **PRIVALOMA**: MCP serveriai **NETURI** priimti jokių žetonų, kurie nebuvo aiškiai išduoti MCP serveriui

#### Autentifikacijos ir autorizacijos kontrolės

- **Griežtas autorizacijos auditas**: atlikti išsamius MCP serverių autorizacijos logikos patikrinimus, kad tik numatyti vartotojai ir klientai galėtų pasiekti jautrius resursus  
  - **Įgyvendinimo vadovas**: [Azure API Management kaip MCP serverių autentifikacijos vartai](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Tapatybės integracija**: [Microsoft Entra ID naudojimas MCP serverio autentifikacijai](https://den.dev/blog/mcp-server-auth-entra-id-session/)  

- **Saugus žetonų valdymas**: įgyvendinti [Microsoft žetonų validacijos ir gyvenimo ciklo geriausias praktikas](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Validuoti, kad tokeno auditorijos teiginys atitiktų MCP serverio tapatybę  
  - Vykdyti taisyklingą žetonų sukimą ir galiojimo terminų tvarką  
  - Užkirsti kelią žetonų pakartotiniam panaudojimui ir neautorizuotam naudojimui  

- **Apsaugotas žetonų saugojimas**: šifruoti žetonus tiek saugojimo metu, tiek perdavimo metu  
  - **Geriausios praktikos**: [Saugus žetonų saugojimas ir šifravimas](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

#### Prieigos kontrolės įgyvendinimas

- **Mažiausių privilegijų principas**: suteikti MCP serveriams tik minimalią reikalingą prieigą funkcionalumui užtikrinti  
  - Reguliarūs teisių peržiūrėjimai ir atnaujinimai privilegijų kilimui išvengti  
  - **Microsoft dokumentacija**: [Saugus mažiausių privilegijų prieigos valdymas](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  

- **Role-based Access Control (RBAC)**: įgyvendinti detalias vaidmenų priskyrimo valdymo priemones  
  - Griežtai apriboti vaidmenis konkretiems resursams ir veiksmams  
  - Vengti plačių arba nereikalingų teisių, plėsiančių atakos paviršių  

- **Nuolatinė teisių monitoringas**: vykdyti tęstinį prieigos audito stebėjimą  
  - Stebėti teisių naudojimo modelius anomalijų atpažinimui  
  - Greitai pašalinti perteklines ar nenaudojamas teises  

## AI specifinės saugumo grėsmės

### Promptų injekcija ir įrankių manipuliavimo atakos

Šiuolaikiniai MCP įgyvendinimai susiduria su sudėtingais AI specifiniais atakų vektoriais, kurių tradicinės saugumo priemonės negali pilnai užkirsti kelio:

#### **Netiesioginė Promptų Injekcija (Cross-Domain Prompt Injection)**

**Netiesioginė Promptų Injekcija** yra viena iš kritiškiausių pažeidžiamybių MCP valdomose AI sistemose. Atakutojai įterpia kenkėjiškas instrukcijas į išorinį turinį – dokumentus, interneto puslapius, laiškus ar duomenų šaltinius, kuriuos AI sistemos vėliau apdoroja kaip teisėtas komandas.

**Atakų scenarijai:**  
- **Dokumentų bazuota injekcija**: paslėptos kenkėjiškos instrukcijos documentuose, kurios sukelia netikėtus AI veiksmus  
- **Interneto turinio išnaudojimas**: užkrėsti interneto puslapiai su įterptais promptais, kurie manipuliuoja AI elgesiu nuskaitymo metu  
- **El. pašto atakos**: kenkėjiški promptai laiškuose, verčiantys AI asistentus nutekinti informaciją arba atlikti neleistinus veiksmus  
- **Duomenų šaltinių užteršimas**: kompromituotos duomenų bazės ar API, tiekiantys užterštą turinį AI sistemoms  

**Reali pasekmė**: šios atakos gali sukelti duomenų nutekinimą, privatumo pažeidimus, žalingo turinio generavimą ir naudotojų sąveikos manipuliavimą. Detalią analizę rasite [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/lt/prompt-injection.ed9fbfde297ca877.webp)

#### **Įrankių nuodijimo atakos**

**Įrankių nuodijimas** taikosi į metaduomenis, apibrėžiančius MCP įrankius, išnaudodamas kaip LLM interpretuoja įrankių aprašymus ir parametrus vykdymo sprendimams.

**Atakų mechanizmai:**  
- **Metaduomenų manipuliacija**: atakutojai įterpia kenkėjiškas instrukcijas į įrankių aprašymus, parametrų apibrėžimus ar naudojimo pavyzdžius  
- **Nematomos instrukcijos**: paslėpti promptai įrankių metaduomenyse, kurie apdorojami AI modelių, bet nematomi žmogaus vartotojams  
- **Dinaminis įrankių modifikavimas („Rug Pulls“) **: vartotojų patvirtinti įrankiai vėliau keičiami vykdyti pavojingus veiksmus be jų žinios  
- **Parametrų injekcija**: kenkėjiškas turinys įterpiamas į įrankių parametrų schemas, kurios veikia modelio elgesį  

**Nuotolinių serverių rizikos**: nuotoliniai MCP serveriai kelia didesnę riziką, nes įrankių apibrėžimai gali būti atnaujinami po vartotojo patvirtinimo, sukuriant situacijas, kur saugūs įrankiai tampa kenkėjiški. Išsamų analizę rasite [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/lt/tool-injection.3b0b4a6b24de6bef.webp)

#### **Kiti AI atakų vektoriai**

- **Cross-Domain Prompt Injection (XPIA)**: sudėtingos atakos, naudojančios turinį iš kelių domenų saugumo kontrolėms apeiti
- **Dinaminis galimybių keitimas**: Priemonių galimybių realaus laiko pakeitimai, kurių nepastebi pradiniai saugumo vertinimai  
- **Konteksto lango užnuodijimas**: Atakos, kurios manipuliuoja dideliu konteksto langu, siekdamos nuslėpti kenksmingas instrukcijas  
- **Modelio sumišimo atakos**: Modelio apribojimų išnaudojimas, siekiant sukelti nenuspėjamą arba nesaugų elgesį  


### Dirbtinio intelekto saugumo rizikos poveikis

**Didelės įtakos pasekmės:**  
- **Duomenų nutekėjimas**: Nepageidaujamas prieinamumas ir jautrių įmonių ar asmeninių duomenų vagystė  
- **Privatumo pažeidimai**: Asmeniškai identifikuojamos informacijos (PII) ir konfidencialių verslo duomenų iššifravimas  
- **Sistemos manipuliavimas**: Netinkami kritinių sistemų ir darbo eigų pakeitimai  
- **Prisijungimo duomenų vagystė**: Autentifikacijos žetonų ir paslaugų prisijungimo duomenų pažeidimas  
- **Šoninis judėjimas**: Kompromituotų DI sistemų naudojimas kaip taškų platesnėms tinklo atakoms  


### Microsoft DI saugumo sprendimai

#### **DI užklausų skydai: pažangi apsauga nuo injekcinių atakų**

Microsoft **DI užklausų skydai** suteikia visapusišką apsaugą nuo tiesioginių ir netiesioginių užklausų injekcijos atakų, taikydami kelis saugumo sluoksnius:

##### **Pagrindiniai apsaugos mechanizmai:**

1. **Pažangus aptikimas ir filtravimas**  
   - Mašininio mokymosi algoritmai ir NLP technikos aptinka kenksmingas instrukcijas išoriniame turinyje  
   - Realiojo laiko analizė dokumentų, tinklalapių, el. laiškų ir duomenų šaltinių, siekiant rasti įterptų grėsmių  
   - Kontekstinis supratimas apie teisėtas ir kenksmingas užklausų schemas  

2. **Išryškinimo technikos**  
   - Skiria patikimas sistemos instrukcijas nuo galimai kompromituotų išorinių įvesties duomenų  
   - Teksto transformavimo metodai, gerinantys modelio aktualumą ir izoliuojantys kenksmingą turinį  
   - Padeda DI sistemoms išlaikyti tinkamą instrukcijų hierarchiją ir ignoruoti įterptas komandas  

3. **Skirtukų ir duomenų ženklinimo sistemos**  
   - Aiškus ribų apibrėžimas tarp patikimų sistemos pranešimų ir išorinės įvesties teksto  
   - Specialūs žymekliai paryškina ribas tarp patikimų ir nepatikimų duomenų šaltinių  
   - Aiški atskirtis užkerta kelią instrukcijų painiojimui ir neleistinam komandų vykdymui  

4. **Nuolatinė grėsmių žvalgyba**  
   - Microsoft nuolat stebi naujus atakų modelius ir atnaujina gynybas  
   - Proaktyvus naujų injekcijos technikų ir atakų vektorių paieškos darbas  
   - Reguliarūs saugumo modelių atnaujinimai, siekiant išlaikyti veiksmingumą prieš kintančias grėsmes  

5. **Azure turinio saugos integracija**  
   - Dalis išsamios Azure DI turinio saugos rinkinio  
   - Papildomas aptikimas, skirtas „jailbreak“ bandymams, kenksmingam turiniui ir saugumo politikos pažeidimams  
   - Vieningos saugumo kontrolės per visus DI programų komponentus  

**Įgyvendinimo ištekliai**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/lt/prompt-shield.ff5b95be76e9c78c.webp)


## Pažangios MCP saugumo grėsmės

### Seansų užgrobimo pažeidžiamumai

**Seansų užgrobimas** yra kritinis atakos vektorius būsenų MCP įgyvendinimuose, kur neįgaliotos šalys įgyja ir piktnaudžiauja teisėtais seansų identifikatoriais, apsimesdamos klientais ir vykdydamos neleistinas operacijas.

#### **Atakų scenarijai ir rizikos**

- **Seanso užgrobimo užklausų injekcija**: Atakotojai su vogtais seansų ID įterpia kenksmingus įvykius į serverius, dalijamus seanso būseną, kas gali sukelti žalingas operacijas arba prieiti prie jautrių duomenų  
- **Tiesioginė apsimetimo ataka**: Vogti seansų ID leidžia tiesioginius MCP serverio skambučius, praleidžiant autentifikaciją ir traktuojant užpuolikus kaip teisėtus naudotojus  
- **Kompromituoti pratęsiami srautai**: Atakotojai gali nutraukti užklausas anksčiau laiko, priverčiant teisėtus klientus tęsti su galimai kenksmingu turiniu  

#### **Seansų valdymo saugumo kontrolės**

**Kritiniai reikalavimai:**  
- **Įgaliojimų patikra**: MCP serveriai, įgyvendinantys įgaliojimus, **PRIVALO** tikrinti VISUS gaunamus užklausimus ir **NETURI** remtis seansais autentifikavimui  
- **Saugaus seanso sukūrimas**: Naudoti kriptografiškai saugius, nedeterministinius seansų ID, sugeneruotus saugiu atsitiktinių skaičių generatoriumi  
- **Vartotojų specifinis ryšys**: Susieti seansų ID su vartotojo informacija naudojant formatus, pvz., `<user_id>:<session_id>`, kad būtų užkirstas kelias seansų piktnaudžiavimui tarp vartotojų  
- **Seanso gyvavimo ciklo valdymas**: Tinkamas galiojimo laiko nustatymas, pasikeitimas ir nebegaliojimo įgyvendinimas, siekiant sumažinti pažeidžiamumą  
- **Transporto saugumas**: Privalomas HTTPS visai komunikacijai, kad būtų užkirstas kelias seanso ID perėmimui  

### Sumišusio tarpininko problema

**Sumišusio tarpininko problema** įvyksta, kai MCP serveriai veikia kaip autentifikacijos tarpininkai tarp klientų ir trečiųjų šalių paslaugų, sukurdama galimybes apeiti įgaliojimus, išnaudojant statinius kliento ID.

#### **Atakų mechanizmai ir rizikos**

- **Slapukų pagrindu veikiantis sutikimo apeidimas**: Ankstesnė vartotojo autentifikacija sukuria sutikimo slapukus, kuriuos atakotojai išnaudoja siunčiant kenksmingus įgaliojimo užklausimus su paruoštais peradresavimo URI  
- **Įgaliojimo kodo vagystė**: Esami sutikimo slapukai gali priversti įgaliojimo serverius praleisti sutikimo ekranus ir nukreipti kodus prie atakotojų kontroliuojamų taškų  
- **Neteisėta API prieiga**: Vogti įgaliojimo kodai leidžia keistis žetonais ir apsimesti vartotoju be aiškaus patvirtinimo  

#### **Sumažinimo strategijos**

**Privalomos kontrolės:**  
- **Aiškių sutikimų reikalavimai**: MCP tarpiniai serveriai, naudojantys statinius kliento ID, **PRIVALO** gauti vartotojo sutikimą kiekvienam dinamiškai registruotam klientui  
- **OAuth 2.1 saugumo įgyvendinimas**: Laikytis dabartinių OAuth saugumo praktikų, įskaitant PKCE (Proof Key for Code Exchange) visoms įgaliojimo užklausoms  
- **Griežta kliento patikra**: Įgyvendinti kruopščią peradresavimo URI ir kliento identifikatorių patikrą, kad būtų užkirstas kelias išnaudojimui  

### Žetonų tiesioginio perdavimo pažeidžiamumai  

**Žetonų tiesioginis perdavimas** yra aiškiai nerekomenduojamas modelis, kai MCP serveriai priima kliento žetonus be tinkamos patikros ir juos perduoda žemyn srovėje veikiančioms API, pažeisdami MCP įgaliojimų specifikacijas.

#### **Saugumo pasekmės**

- **Kontrolės apeidimas**: Tiesioginis kliento ir API žetonų naudojimas praleidžia svarbias ribojimo, patikros ir stebėjimo kontrolės  
- **Revizijos pėdsakų sugadinimas**: Aukštesnio lygio išduoti žetonai neleidžia identifikuoti kliento, kas trukdo incidentų tyrimams  
- **Duomenų nutekėjimas per tarpininką**: Nevaliduoti žetonai leidžia kenksmingoms šalims naudoti serverius kaip tarpininkus neteisėtai prieigai prie duomenų  
- **Pasitikėjimo ribų pažeidimai**: Žemyn srovių paslaugų pasitikėjimo prielaidos gali būti pažeistos, kai žetonų kilmė nėra patvirtinama  
- **Daugiapakopė atakų plėtra**: Kompromituoti žetonai, priimami keliuose paslaugų taškuose, leidžia šoninį judėjimą  

#### **Reikalingos saugumo kontrolės**

**Neatidėliotini reikalavimai:**  
- **Žetonų patikra**: MCP serveriai **NETURI** priimti žetonų, kurie nėra aiškiai išduoti konkrečiai MCP serveriui  
- **Auditorijos patikra**: Visada tikrinkite, ar žetono auditorijos deklaracijos atitinka MCP serverio identitetą  
- **Tinkamas žetonų gyvavimo ciklas**: Įgyvendinkite trumpalaikių prieigos žetonų naudojimą su saugiu pasikeitimu  


## Tiekimo grandinės saugumas DI sistemoms

Tiekimo grandinės saugumas išsivystė nuo tradicinių programinės įrangos priklausomybių iki visos DI ekosistemos apimties. Šiuolaikiniai MCP įgyvendinimai privalo griežtai tikrinti ir stebėti visus DI susijusius komponentus, kad kiekvienas iš jų būtų patikimas ir nekeltų galimų saugumo spragų.

### Išplėsti DI tiekimo grandinės komponentai

**Tradicinės programinės įrangos priklausomybės:**  
- Atviro kodo bibliotekos ir karkasai  
- Konteinerių vaizdai ir bazinės sistemos  
- Kūrimo įrankiai ir kūrimo vamzdynai  
- Infrastruktūros komponentai ir paslaugos  

**DI specifiniai tiekimo grandinės elementai:**  
- **Pamatai modeliai**: Iš anksto apmokyti modeliai iš įvairių tiekėjų, reikalaujantys kilmės patikrinimo  
- **Įterpimo paslaugos**: Išorinės vektorizavimo ir semantinės paieškos paslaugos  
- **Konteksto teikėjai**: Duomenų šaltiniai, žinių bazės ir dokumentų saugyklos  
- **Tretiesiems asmenims skirtos API**: Išorinės DI paslaugos, ML vamzdynai ir duomenų apdorojimo taškai  
- **Modelio artefaktai**: Svoriai, konfigūracijos ir modelio pritaikyti variantai  
- **Mokymo duomenų šaltiniai**: Rinkinių, naudojamų modeliui treniruoti ir peržiūrai, šaltiniai  

### Visapusiška tiekimo grandinės saugumo strategija

#### **Komponentų patikra ir pasitikėjimas**  
- **Kilmės patvirtinimas**: Patikrinkite visų DI komponentų kilmę, licencijas ir vientisumą prieš integruojant  
- **Saugumo vertinimas**: Atlikite pažeidžiamumo nuskaitymus ir saugumo peržiūras modeliams, duomenų šaltiniams ir DI paslaugoms  
- **Reputacijos analizė**: Įvertinkite DI paslaugų tiekėjų saugumo istoriją ir praktiką  
- **Atitikties patikra**: Užtikrinkite, kad visi komponentai atitiktų organizacijos saugumo ir reguliacinės atitikties reikalavimus  

#### **Saugūs diegimo vamzdynai**  
- **Automatizuota CI/CD sauga**: Integruokite saugumo skenavimą visame automatizuotame diegimo vamzdyne  
- **Artefaktų vientisumas**: Įgyvendinkite kriptografinį patikrinimą visiems diegiamiems artefaktams (kodas, modeliai, konfigūracijos)  
- **Ešeloninis diegimas**: Naudokite progresyvius diegimo metodus su saugumo patikrinimais kiekviename žingsnyje  
- **Patikimi artefaktų saugyklos**: Diegti tik iš patikrintų, saugių artefaktų registrų ir saugyklų  

#### **Nuolatinis stebėjimas ir reakcija**  
- **Priklausomybių nuskaitymas**: Nuolatinis pažeidžiamumo stebėjimas visų programinės įrangos ir DI komponentų priklausomybių atžvilgiu  
- **Modelio stebėjimas**: Nuolatinis modelio elgesio, našumo pokyčių ir saugumo anomalijų vertinimas  
- **Paslaugų sveikatos sekimas**: Stebėkite išorines DI paslaugas dėl prieinamumo, saugumo incidentų ir politikos pokyčių  
- **Grėsmių žvalgybos integracija**: Įtraukite grėsmių informacijos srautus, specifinius DI ir ML saugumo rizikoms  

#### **Prieigos valdymas ir mažiausios prieigos teisės**  
- **Komponentų lygmens leidimai**: Ribokite prieigą prie modelių, duomenų ir paslaugų pagal verslo poreikius  
- **Paslaugų paskyrų valdymas**: Įgyvendinkite specialias paslaugų paskyras su minimaliais reikalingais leidimais  
- **Tinklo segmentavimas**: Izoliuokite DI komponentus ir ribokite tinklo prieigą tarp paslaugų  
- **API vartų kontrolė**: Naudokite centralizuotus API vartus valdyti ir stebėti prieigą prie išorinių DI paslaugų  

#### **Incidentų valdymas ir atkūrimas**  
- **Greitos reakcijos procedūros**: Nustatytos procedūros pataisymams ar kompromituotų DI komponentų pakeitimui  
- **Prisijungimų rotacija**: Automatizuotos sistemos slaptumo, API raktų ir paslaugų prisijungimų rotacijai  
- **Atstatymo galimybės**: Greitas grįžimas prie ankstesnių patvirtintų versijų DI komponentams  
- **Tiekimo grandinės pažeidimų atkūrimas**: Specifinės procedūros reagavimui į išorinių DI paslaugų kompromitavimą  

### Microsoft saugumo įrankiai ir integracija

**GitHub Advanced Security** suteikia išsamią tiekimo grandinės apsaugą, įskaitant:  
- **Slaptumų nuskaitymas**: Automatizuotas kredencialų, API raktų ir žetonų aptikimas saugyklose  
- **Priklausomybių nuskaitymas**: Pažeidžiamumo vertinimas atviro kodo priklausomybėms ir bibliotekoms  
- **CodeQL analizė**: Statinė kodo analizė dėl saugumo spragų ir programavimo klaidų  
- **Tiekimo grandinės įžvalgos**: Matomumas apie priklausomybių būklę ir saugumo statusą  

**Azure DevOps ir Azure Repos integracija:**  
- Sklandi saugumo skenavimo integracija visose Microsoft kūrimo platformose  
- Automatizuoti saugumo patikrinimai Azure vamzdynuose DI apkrovoms  
- Politikos vykdymas saugiam DI komponentų diegimui  

**Microsoft vidinės praktikos:**  
Microsoft taiko išsamias tiekimo grandinės saugumo praktikas visuose produktuose. Sužinokite apie patvirtintas metodikas [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Pamatinės saugumo gerosios praktikos

MCP įgyvendinimai paveldi ir papildo jūsų organizacijos esamą saugumo situaciją. Pagrindinių saugumo praktikų stiprinimas žymiai pagerina bendrą DI sistemų ir MCP diegimų saugumą.

### Pagrindiniai saugumo principai

#### **Saugus vystymas**  
- **Atitiktis OWASP**: Apsauga nuo [OWASP Top 10](https://owasp.org/www-project-top-ten/) žiniatinklio programų pažeidžiamumų  
- **DI specifinės apsaugos**: Kontrolės diegimas pagal [OWASP Top 10 LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Saugus slaptumų valdymas**: Naudoti specialius saugyklas žetonams, API raktams ir konfidencialiems konfigūracijos duomenims  
- **Pilno kelio šifravimas**: Užtikrinti saugų komunikavimą visuose programos komponentuose ir duomenų srautose  
- **Įvesties patikra**: Griežta visų vartotojų įvesties, API parametrų ir duomenų šaltinių validacija  

#### **Infrastruktūros sukietinimas**  
- **Daugiafaktorinė autentifikacija**: Privaloma MFA visoms administravimo ir paslaugų paskyroms  
- **Pataisų valdymas**: Automatizuotas ir laiku diegiamas pataisų taikymas operacinėms sistemoms, karkasams ir priklausomybėms  
- **Tapatybės tiekėjų integracija**: Centralizuotas tapatybės valdymas per įmoninius tiekėjus (Microsoft Entra ID, Active Directory)  
- **Tinklo segmentavimas**: Logiška MCP komponentų izoliacija, ribojanti šoninį judėjimą  
- **Mažiausių leidimų principas**: Minimalūs reikalingi leidimai visiems sistemų komponentams ir paskyroms  

#### **Saugumo stebėjimas ir aptikimas**  
- **Išsamus registravimas**: Detalus DI programų veiklos žurnalas, įskaitant MCP klientų-serverio sąveikas  
- **SIEM integracija**: Centralizuotas saugumo informacijos ir įvykių valdymas anomalijoms aptikti  
- **Elgsenos analizė**: DI palaikomas stebėjimas, siekiant aptikti neįprastą sistemų ir vartotojų elgseną  
- **Grėsmių žvalgyba**: Išorinių grėsmių srautų ir kompromitavimo požymių (IOC) integracija  
- **Incidentų valdymas**: Aiškiai apibrėžtos procedūros saugumo incidentų aptikimui, reagavimui ir atkūrimui  

#### **Nulinės pasitikėjimo architektūra**  
- **Niekada nepasitikėk, visada tikrink**: Nuolatinė vartotojų, įrenginių ir tinklo ryšių patikra  
- **Mikrosegmentavimas**: Smulkios tinklo kontrolės, izoliuojančios atskirus darbo krūvius ir paslaugas  
- **Tapatybės centrinis saugumas**: Saugojimo politikos, pagrįstos patvirtintomis tapatybėmis, o ne tinklo vieta  
- **Nuolatinė rizikos analizė**: Dinaminis saugumo būklės vertinimas pagal esamą kontekstą ir elgesį  
- **Sąlyginė prieiga**: Prieigos kontrolė, prisitaikanti prie rizikos veiksnių, vietos ir įrenginio patikimumo  

### Įmonių integracijos modeliai

#### **Microsoft saugumo ekosistemos integracija**  
- **Microsoft Defender for Cloud**: Išsamus debesų saugumo būklės valdymas  
- **Azure Sentinel**: Debesų gimtoji SIEM ir SOAR funkcijos DI apkrovų apsaugai  
- **Microsoft Entra ID**: Įmonių tapatybės ir prieigos valdymas su sąlyginių prieigos politikomis  
- **Azure Key Vault**: Centralizuotas slaptumų valdymas su aparatūros saugumo moduliu (HSM) palaikymu  
- **Microsoft Purview**: Duomenų valdymas ir atitiktis DI duomenų šaltiniams bei darbo eigoms  

#### **Atitiktis ir valdymas**  
- **Reguliacinė atitiktis**: Užtikrinkite, kad MCP įgyvendinimai atitiktų konkrečios pramonės reikalavimus (GDPR, HIPAA, SOC 2)  
- **Duomenų klasifikavimas**: Teisingas jautrių DI apdorojamų duomenų kategorijavimas ir tvarkymas  
- **Auditų žurnalai**: Išsamus žurnalavimas reguliacinei atitikties kontrolei ir teisės tyrimams  
- **Privatumo kontrolės**: Privatumo pagal dizainą principų įgyvendinimas DI sistemų architektūroje  
- **Pokyčių valdymas**: Formalios saugumo peržiūros procedūros DI sistemos pakeitimams  

Šios pamatinės praktikos sukuria tvirtą saugumo pagrindą, kuris pagerina MCP specifinių saugumo kontrolės veiksmingumą ir užtikrina visapusišką apsaugą DI pagrįstoms programoms.
## Pagrindinės saugumo išvados

- **Sluoksniuotos saugumo strategijos taikymas**: Derinkite pagrindines saugumo praktikas (saugų kodavimą, mažiausių teisių principą, tiekimo grandinės patikrinimą, nuolatinį stebėjimą) su dirbtinio intelekto specifinėmis kontrolėmis, kad užtikrintumėte visapusišką apsaugą

- **Dirbtinio intelekto specifinė grėsmių aplinka**: MCP sistemos susiduria su unikaliomis rizikomis, įskaitant užklausų injekciją, įrankių užnuodijimą, sesijų užgrobimą, painiavos problema, tokenų perleidimo pažeidžiamumus ir per dideles teises, kurios reikalauja specializuotų sprendimų

- **Autentifikacijos ir autorizacijos tobulumas**: Įgyvendinkite patikimą autentifikaciją naudodami išorinius tapatybės tiekėjus (Microsoft Entra ID), užtikrinkite tinkamą tokenų validaciją ir niekada nepriimkite tokenų, kurie nėra aiškiai išduoti jūsų MCP serveriui

- **DI puolimų prevencija**: Naudokite Microsoft Prompt Shields ir Azure Content Safety, kad apsisaugotumėte nuo netiesioginės užklausų injekcijos ir įrankių užnuodijimo atakų, tikrinkite įrankių metaduomenis ir stebėkite dinamiškus pokyčius

- **Sesijų ir transporto saugumas**: Naudokite kriptografiškai saugius, nedeterministinius sesijos ID, susietus su vartotojo tapatybe, įgyvendinkite tinkamą sesijų gyvavimo ciklo valdymą ir niekada nenaudokite sesijų autentifikacijai

- **OAuth saugumo geriausios praktikos**: Užkirsti kelią painiavos atakoms aiškiai gaunant vartotojo sutikimą dinaminiuose registruotose klientuose, tinkamai įgyvendinti OAuth 2.1 su PKCE ir griežtai tikrinti persiuntimo URI

- **Tokenų saugumo principai**: Venkite tokenų perleidimo antišablonų, tikrinkite tokenų auditorijos teiginius, naudokite trumpalaikius tokenus su saugiu rotavimu ir palaikykite aiškias pasitikėjimo ribas

- **Visapusiškas tiekimo grandinės saugumas**: Visus DI ekosistemos komponentus (modelius, įterpimus, konteksto tiekėjus, išorinius API) vertinkite su tuo pačiu saugumo griežtumu kaip ir tradicinius programinės įrangos priklausomybes

- **Nuolatinė evoliucija**: Sekite sparčiai besikeičiančius MCP specifikacijų pokyčius, prisidėkite prie saugumo bendruomenės standartų ir palaikykite adaptuojamą saugumo požiūrį, kai protokolas tobulėja

- **Microsoft saugumo integracija**: Naudokitės Microsoft visapusiška saugumo ekosistema (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID), kad sustiprintumėte MCP diegimų apsaugą

## Visapusiški ištekliai

### **Oficiali MCP saugumo dokumentacija**
- [MCP specifikacija (dabartinė: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP saugumo geriausios praktikos](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autorizacijos specifikacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub saugykla](https://github.com/modelcontextprotocol)

### **OWASP MCP saugumo ištekliai**
- [OWASP MCP Azure saugumo vadovas](https://microsoft.github.io/mcp-azure-security-guide/) - Išsamus OWASP MCP Top 10 su Azure diegimo gairėmis
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficialios OWASP MCP saugumo rizikos
- [MCP saugumo susitikimo dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktiniai saugumo mokymai MCP Azure aplinkoje

### **Saugumo standartai ir geriausios praktikos**
- [OAuth 2.0 saugumo geriausios praktikos (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 žiniatinklio programų saugumui](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 dideliems kalbos modeliams](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft skaitmeninės gynybos ataskaita](https://aka.ms/mddr)

### **DI saugumo tyrimai ir analizė**
- [Užklausų injekcija MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Įrankių užnuodijimo atakos (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP saugumo tyrimų santrauka (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft saugumo sprendimai**
- [Microsoft Prompt Shields dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety paslauga](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID saugumas](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure tokenų valdymo geriausios praktikos](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Įgyvendinimo vadovai ir mokymai**
- [Azure API Management kaip MCP autentifikacijos vartai](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentifikacija MCP serveriams](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Saugaus tokenų saugojimo ir šifravimo video](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps ir tiekimo grandinės saugumas**
- [Azure DevOps saugumas](https://azure.microsoft.com/products/devops)
- [Azure Repos saugumas](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft tiekimo grandinės saugumo kelionė](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Papildoma saugumo dokumentacija**

Norėdami gauti visapusiškas saugumo gaires, žiūrėkite šiuos specializuotus dokumentus šioje skiltyje:

- **[MCP saugumo geriausios praktikos 2025](./mcp-security-best-practices-2025.md)** - Pilnas MCP diegimų saugumo geriausių praktikų rinkinys
- **[Azure Content Safety įgyvendinimas](./azure-content-safety-implementation.md)** - Praktiniai Azure Content Safety integravimo pavyzdžiai  
- **[MCP saugumo kontrolės 2025](./mcp-security-controls-2025.md)** - Naujausios MCP diegimų saugumo kontrolės ir metodikos
- **[MCP geriausių praktikų greita nuoroda](./mcp-best-practices.md)** - Greitoji svarbiausių MCP saugumo praktikų atmintinė

### **Praktiniai saugumo mokymai**

- **[MCP saugumo susitikimo dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/)** - Išsamios praktinės dirbtuvės MCP serverių saugumui Azure su pažangiais etapais nuo Base Camp iki Summit
- **[OWASP MCP Azure saugumo vadovas](https://microsoft.github.io/mcp-azure-security-guide/)** - Referencinė architektūra ir diegimo gairės visoms OWASP MCP Top 10 rizikoms

---

## Kas toliau

Toliau: [3 skyrius: Pradžia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:  
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas gimtąja kalba laikomas autoritetingu šaltiniu. Norint gauti svarbią informaciją, rekomenduojama kreiptis į profesionalius vertėjus. Mes neprisiimame atsakomybės už galimus nesusipratimus ar neteisingus interpretavimus, kylantys iš šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->