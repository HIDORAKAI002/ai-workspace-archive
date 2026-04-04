# Konteksti inseneritehnika tehisintellekti agentidele

[![Context Engineering](../../../translated_images/et/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Vaata selle õppetunni videot, klõpsates ülaltoodud pildil)_

On oluline mõista selle rakenduse keerukust, mille jaoks ehitad tehisintellekti agenti, et luua usaldusväärne agent. Me peame ehitama tehisintellekti agente, kes haldavad teavet tõhusalt, et lahendada keerukaid vajadusi, mis ületavad ainult promptide inseneritehnika.

Selles õppetunnis vaatleme, mis on konteksti inseneritehnika ja milline on selle roll tehisintellekti agentide loomisel.

## Sissejuhatus

See õppetund käsitleb:

• **Mis on konteksti inseneritehnika** ja miks see erineb promptide inseneritehnikast.

• **Tõhusad strateegiad konteksti inseneritehnikaks**, sealhulgas kuidas kirjutada, valida, tihendada ja eraldada teavet.

• **Levinud kontekstid puudused**, mis võivad sinu tehisintellekti agenti häirida, ning kuidas neid parandada.

## Õpieesmärgid

Pärast selle õppetunni läbimist tead, kuidas:

• **Määratleda konteksti inseneritehnika** ja eristada seda promptide inseneritehnikast.

• **Tuvastada kontekstis olulised komponendid** suurte keelemudelite (LLM) rakendustes.

• **Rakendada strateegiaid konteksti kirjutamiseks, valimiseks, tihendamiseks ja eraldamiseks**, et parandada agendi toimivust.

• **Tunnustada levinud konteksti ebaõnnestumisi** nagu mürgitamine, tähelepanu hajumine, segadus ja konflikt ning rakendada leevendusmeetmeid.

## Mis on konteksti inseneritehnika?

Tehisintellekti agentide jaoks juhib kontekst agendi planeerimist teatud tegevuste elluviimiseks. Konteksti inseneritehnika on tava tagada, et tehisintellekti agendil oleks järgmise ülesande sammu tegemiseks õige teave. Kontekstiaken on piiratud suurusega, seega peame agendi ehitajatena looma süsteemid ja protsessid, mis haldavad teabe lisamist, eemaldamist ja kokkusurumist kontekstiaknas.

### Promptide inseneritehnika vs konteksti inseneritehnika

Promptide inseneritehnika keskendub ühele staatilisele juhiste komplektile, mis juhib tehisintellekti agente tõhusalt reeglite komplektiga. Konteksti inseneritehnika käsitleb dünaamilise teabehaldusega tegelemist, sealhulgas algset prompti, et tagada tehisintellekti agendi pidev vajaliku teabe olemasolu. Peamine idee konteksti inseneritehnika juures on muuta see protsess korduvaks ja usaldusväärseks.

### Konteksti tüübid

[![Types of Context](../../../translated_images/et/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Oluline on meeles pidada, et kontekst ei ole lihtsalt üks asi. Teave, mida tehisintellekti agent vajab, võib pärineda erinevatest allikatest ja meie ülesanne on tagada agendi juurdepääs neile allikatele:

Konteksti tüübid, mida tehisintellekti agent võib hallata, hõlmavad:

• **Juhised:** Need on nagu agendi "reeglid" – promptid, süsteemiteated, mõned näited (mis näitavad tehisintellektile, kuidas midagi teha) ja tööriistade kirjeldused, mida agent saab kasutada. Siin põimub promptide inseneritehnika fookus konteksti inseneritehnikaga.

• **Teadmised:** See hõlmab fakte, andmebaasidest pärinevat teavet või agendi kogutud pikaajalisi mälestusi. See hõlmab ka Retrieval Augmented Generation (RAG) süsteemi integreerimist, kui agendil on vaja juurdepääsu erinevatele teadmisteallikatele ja andmebaasidele.

• **Tööriistad:** Need on väliste funktsioonide, API-de ja MCP serverite definitsioonid, mida agent saab kutsuda koos tagasisidega (tulemustega), mida ta nende kasutamisel saab.

• **Vestluse ajalugu:** Kasutajaga käiv järjepidev dialoog. Aja jooksul muutuvad need vestlused pikemaks ja keerukamaks, mis tähendab, et need võtavad kontekstiaknas ruumi.

• **Kasutaja eelistused:** Teave, mida on aja jooksul õpitud kasutaja eelistuste või mitte-eelistuste kohta. Neid võib salvestada ja kasutada oluliste otsuste tegemisel, et kasutajat aidata.

## Tõhusad strateegiad konteksti inseneritehnikaks

### Planeerimisstrateegiad

[![Context Engineering Best Practices](../../../translated_images/et/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Hea konteksti inseneritehnika algab heast planeerimisest. Siin on lähenemine, mis aitab sul hakata mõtlema, kuidas rakendada konteksti inseneritehnika mõistet:

1. **Määra selged tulemused** – ülesannete tulemused, mida tehisintellekti agentidele määratakse, peaksid olema selgelt määratletud. Vastake küsimusele – "Milline näeb maailm välja pärast seda, kui tehisintellekti agent on oma ülesandega lõpetanud?" Teisisõnu, millist muutust, teavet või vastust kasutaja pärast agendiga suhtlemist saab.

2. **Kaardista kontekst** – kui oled määratlenud tehisintellekti agendi tulemused, pead vastama küsimusele "Millist teavet tehisintellekti agent vajab selle ülesande täitmiseks?". Nii saad hakata konteksti kaardistama ja otsima, kust seda teavet leida võib.

3. **Loo kontekstitorud** – nüüd, kui tead, kust teavet saada, on vaja vastata küsimusele "Kuidas agent selle teabe saab?". Seda saab teha mitmel viisil, sealhulgas RAG, MCP serverite ja teiste tööriistade kasutamise kaudu.

### Praktilised strateegiad

Planeerimine on oluline, kuid kui teave hakkab voolama meie agendi kontekstiakna kaudu, peame rakendama praktilisi strateegiaid selle haldamiseks:

#### Konteksti haldamine

Kuigi osa teabest lisatakse kontekstiaknasse automaatselt, seisneb konteksti inseneritehnika selles, et võtta selles teabes aktiivsem roll, mida saab teha mitme strateegia abil:

1. **Agendi märkmeleht (Agent Scratchpad)**  
See võimaldab tehisintellekti agendil teha märkmeid olulise teabe kohta praeguste ülesannete ja kasutajaga suhtlemise kohta ühe seansi jooksul. See peaks asuma kontekstiaknast väljaspool failis või jooksva objekti sees, mida agent saab hiljem selles seansis vajadusel tagasi otsida.

2. **Mälestused**  
Märkmelehed sobivad ühe seansi konteksti aknast väljaspool teabe haldamiseks. Mälestused võimaldavad agentidel salvestada ja taastada olulist teavet mitmete seansside vahel. See võib hõlmata kokkuvõtteid, kasutaja eelistusi ja tagasisidet tulevaste parenduste jaoks.

3. **Konteksti tihendamine**  
Kui kontekstiaken suureneb ja läheneb oma piirile, saab kasutada selliseid tehnikaid nagu kokkuvõtete tegemine ja kärpimine. See tähendab kas ainult kõige olulisema teabe hoidmist või vanemate teadete eemaldamist.

4. **Mitme agendi süsteemid**  
Mitme agendi süsteemi arendamine on konteksti inseneritehnika vorm, sest iga agent omab oma kontekstiakent. Kuidas seda konteksti jagatakse ja edastatakse eri agentidele, on veel üks aspekt, mida nende süsteemide loomisel planeerida.

5. **Harkukeskkonnad (Sandbox Environments)**  
Kui agent peab jooksutama mõnda koodi või töötlema suures koguses teavet dokumendis, võib see nõuda palju tokeneid tulemuste töötlemiseks. Selle asemel, et see kõik salvestada kontekstiaknas, saab agent kasutada harkukeskkonda, mis võimaldab käivitada koodi ja lugeda ainult tulemusi ning muud asjakohast teavet.

6. **Jooksva oleku objektid (Runtime State Objects)**  
Selleks luuakse infot sisaldavad konteinerid, et hallata olukordi, kus agent peab pääsema ligi kindlale teabele. Keeruka ülesande puhul võimaldab see agentidel salvestada iga alamosa tulemid samm-sammult, võimaldades kontekstist jääda ainult sellele konkreetsele alamosale seotud.

### Näide konteksti inseneritehnikast

Oletame, et tahame, et tehisintellekti agent **"broneeriks mulle reisi Pariisi."**

• Lihtne agent, kes kasutab ainult promptide inseneritehnikat, võiks lihtsalt vastata: **"Olgu, millal sa sooviksid Pariisi minna?"** See töötles vaid kasutaja otsest küsimust sel hetkel.

• Agent, kes kasutab siinmainitud konteksti inseneritehnika strateegiaid, teeks palju rohkem. Enne vastamist võiks tema süsteem:

  ◦ **Kontrollida su kalendrit** saadavate kuupäevade jaoks (reaalajas andmete päring).

  ◦ **Märgata varasemaid reisipreferentse** (pikaajaline mälu), näiteks eelistatud lennufirma, eelarve või otse lendude eelistuse kohta.

  ◦ **Tuvastada saadavalolevaid tööriistu** lendude ja hotellide broneerimiseks.

- Seejärel võiks vastus olla näiteks: "Hei [Sinu nimi]! Näen, et oled vaba oktoobri esimesel nädalal. Kas otsin otse lende Pariisi [Eelistatud lennufirma] ning tavapärase eelarve [Eelarve] piires?" See rikkalik, kontekstiteadlik vastus demonstreerib konteksti inseneritehnika võimsust.

## Levinud konteksti ebaõnnestumised

### Konteksti mürgitamine

**Mis see on:** Kui LLM genereeritud hallutsinatsioon (valeteave) või viga satub konteksti ja sellele viidatakse korduvalt, põhjustades agendi võimatute eesmärkide püüdlemist või jaburates strateegiates kinni jäämist.

**Mida teha:** Rakendada **konteksti valideerimist** ja **karantiini**. Kontrolli teavet enne, kui see lisatakse pikaajalisse mällu. Kui võimalik mürgitus tuvastatakse, alusta uut konteksti ahelat, et takistada halva info levikut.

**Reisibroneerimise näide:** Sinu agent hallutsineerib **otse lennu väikestelt kohalikelt lennujaamadelt kaugele rahvusvahelisse linna**, mis tegelikult rahvusvahelisi lende ei paku. See olemasolemata lennuinfo salvestatakse konteksti. Hiljem, kui palud agenti broneerida, otsib ta pidevalt pileteid sellele võimatule marsruudile, põhjustades korduvaid vigu.

**Lahendus:** Rakenda samm, mis **valideerib lennu olemasolu ja marsruute reaalajas API abil** _enne_ lennu detailide lisamist agendi töökonteksti. Kui valideerimine ebaõnnestub, paigutatakse valeinfo "karantiini" ega kasutata edaspidi.

### Konteksti tähelepanu hajumine

**Mis see on:** Kui kontekst muutub nii suureks, et mudel keskendub liiga palju kogunenud ajaloo peale, mitte enam koolitusandmetest õpitule, põhjustades korduvaid või kasutu tegevuse. Mudelid võivad hakata vigu tegema ennegi, kui kontekstiaken on täielik.

**Mida teha:** Kasuta **konteksti kokkuvõtete tegemist**. Aeg-ajalt kokkusuru kogutud teave lühemateks kokkuvõteteks, säilitades olulisi detaile ja eemaldades liigse ajaloo. See aitab "fookust lähtestada".

**Reisibroneerimise näide:** Oled pikka aega arutanud unistuste sihtkohti, sealhulgas põhjalikke kirjeldusi oma kahe aasta tagusest matkareisist. Kui lõpuks palud **"leiada mulle odav lend järgmiseks kuuks"**, takerdub agent vanadesse, ebaolulistesse detailidesse ja küsib pidevalt sinu matkavarustuse või mineviku marsruutide kohta, unustades su praeguse soovi.

**Lahendus:** Pärast kindlat arvu vestlusvahetusi või kui kontekst liiga suur, peaks agent **kokku võtma vestluse viimasemad ja olulisemad osad** – keskendudes su praegustele reisikuupäevadele ja sihtkohale – ja kasutama seda kokkusurutud kokkuvõtet järgmises LLM kõnes, visates välja vähemolulise ajaloolise vestluse.

### Konteksti segadus

**Mis see on:** Kui kontekstis on liiga palju mittevajalikke elemente, sageli liiga palju saadavalolevaid tööriistu, siis genereerib mudel halbu vastuseid või kutsub valesid tööriistu. Väiksemad mudelid on eriti sellest haaratud.

**Mida teha:** Rakendada **tööriistade valiku haldamist** RAG tehnikate abil. Säilita tööriistade kirjeldused vektori andmebaasis ja vali _ainult_ kõige olulisemad tööriistad konkreetse ülesande jaoks. Uuringud näitavad, et tööriistade valik tuleks piirata alla 30.

**Reisibroneerimise näide:** Sinu agendil on ligipääs tosinatele tööriistadele: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations` jne. Küsimusele **"Mis on parim viis Pariisis ringi liikumiseks?"** segadusse ajab paljude tööriistade olemasolu; agent üritab kutsuda `book_flight` Pariisi sees või `rent_car`, kuigi eelistad ühistransporti, sest tööriistade kirjeldused võivad kattuda või ta lihtsalt ei oska parimat valida.

**Lahendus:** Kasuta **RAG lähenemist tööriistakirjelduste üle**. Kui pärid Pariisis liikumist, käivitab süsteem dünaamiliselt ainult kõige asjakohasemad tööriistad nagu `rent_car` või `public_transport_info` vastavalt su päringule, esitades LLM-ile keskse tööriistakogumi.

### Konteksti konflikt

**Mis see on:** Kui kontekstis esineb vastuolulist teavet, mis viib ebaühtlase mõtlemise või halbade lõppvastusteni. See tekib tihti, kui info saabub etappide kaupa ja varasemad valed oletused jäävad konteksti.

**Mida teha:** Kasutada **konteksti kärpimist** ja **andmete väljaviimist**. Kärpimine tähendab vananenud või vastuolulise teabe eemaldamist uusi detaile saabudes. Andmete väljaviimine annab mudelile eraldi "märkmiku", kus töödelda infot ilma peamist konteksti segamata.

**Reisibroneerimise näide:** Alguses ütled agentile: **"Soovin lennata turista klassis."** Vestluse käigus muutub meeleolu ja ütled: **"Aga tegelikult läheme sel reisil äriklassis."** Kui mõlemad juhised on kontekstis, võib agent saada vastuolulisi otsingutulemusi või segadusse sattuda, kumba eelistust järgida.

**Lahendus:** Rakenda **konteksti kärpimist**. Kui uus juhis on vana vastuolus, eemaldatakse vana juhis või selgelt asendatakse kontekstis. Alternatiivselt võib agent kasutada **märkmikku**, et ühitada vastuolulised eelistused enne otsuse tegemist, tagades, et ainult lõplik ja järjepidev juhis juhib tema tegevust.

## Kas sul on veel küsimusi konteksti inseneritehnika kohta?

Liitu [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) serveriga, et kohtuda teiste õppijatega, osaleda kontorite tundides ja saada vastuseid oma tehisintellekti agentide küsimustele.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest vabastamine**:
See dokument on tõlgitud kasutades tehisintellekti tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, tuleb arvestada, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul on soovitatav kasutada professionaalset inimtõlget. Me ei vastuta ühegi arusaamatuse või valesti mõistmise eest, mis võib tekkida selle tõlke kasutamisest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->