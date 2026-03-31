# Juhtumiuuring: Azure AI Reisibürood – viiterealisatsioon

## Ülevaade

[Azure AI Reisibürood](https://github.com/Azure-Samples/azure-ai-travel-agents) on Microsofti välja töötatud terviklik viiterealisatsioon, mis demonstreerib, kuidas luua mitmeagendi- ja AI-tugevusega reisiplaani rakendus, kasutades Model Context Protocol (MCP), Azure OpenAI ja Azure AI Search teenuseid. See projekt näitab parimaid praktikaid mitme AI-agendi õigeaegseks koordineerimiseks, ettevõtteandmete integreerimiseks ning turvalise ja laiendatava platvormi pakkumiseks reaalseteks stsenaariumiteks.

## Peamised omadused
- **Mitmeagendi orkestreerimine:** Kasutab MCP-d spetsialiseeritud agentide (nt lennu-, hotelli- ja marsruudiagentide) koordineerimiseks, kes teevad koostööd keerukate reisiplaanide täitmiseks.
- **Ettevõtteandmete integratsioon:** Ühendub Azure AI Search ja teiste ettevõtteandmeallikatega, et pakkuda ajakohast ja asjakohast teavet reisinõuannete jaoks.
- **Turvaline, skaleeritav arhitektuur:** Kasutab Azure teenuseid autentimiseks, autoriseerimiseks ja skaleeritavaks juurutamiseks, järgides ettevõtte turvalisuse parimaid tavasid.
- **Laiendatavad tööriistad:** Rakendab taaskasutatavaid MCP tööriistu ja käsupõhiseid malle, mis võimaldavad kiiresti kohaneda uute valdkondade või ärivajadustega.
- **Kasutajakogemus:** Pakub vestlusliidest, mille kaudu kasutajad saavad suhelda reisibüroo agentidega, mida juhib Azure OpenAI ja MCP.

## Arhitektuur
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Arhitektuuri skeemi kirjeldus

Azure AI Reisibürood on arhitektuursed moodulipõhiseks, skaleeritavaks ja turvaliseks integratsiooniks mitme AI agendi ja ettevõtteandmeallikaga. Peamised komponendid ja andmevoog on järgmised:

- **Kasutajaliides:** Kasutajad suhtlevad süsteemiga vestlusliidese kaudu (nt veebi vestlus või Teamsi robot), esitades päringuid ja saades reisisoovitusi.
- **MCP server:** Teenib keskse orkestreerijana, vastu võtab kasutajasisendi, haldab konteksti ja koordineerib spetsialiseeritud agentide (nt FlightAgent, HotelAgent, ItineraryAgent) tegevusi Model Context Protocoli abil.
- **AI agendid:** Igal agendil on konkreetne valdkond (lennud, hotellid, marsruudid), neid rakendatakse MCP tööriistadena. Agendid kasutavad käsumalle ja loogikat, et töödelda päringuid ja genereerida vastuseid.
- **Azure OpenAI teenus:** Pakub täiustatud loodusteaduslikku keele mõistmist ja teksti genereerimist, aidates agentidel tõlgendada kasutaja kavatsust ja luua vestluslikke vastuseid.
- **Azure AI Search & ettevõtteandmed:** Agendid pärivad Azure AI Search ja teistest ettevõtteandmeallikatest ajakohast teavet lendude, hotellide ja reisi võimaluste kohta.
- **Autentimine ja turvalisus:** Integreerib Microsoft Entra ID-ga turvaliseks autentimiseks ning rakendab vähima privileegiga juurdepääsukontrolli kõigile ressurssidele.
- **Juurutamine:** Mõeldud juurutamiseks Azure Container Apps keskkonnas, tagades skaleeritavuse, jälgitavuse ja operatiivse efektiivsuse.

See arhitektuur võimaldab sujuvat mitme AI-agendi koordineerimist, turvalist ühendust ettevõtteandmetega ning tõhusat ja laiendatavat platvormi valdkonnaspetsiifiliste AI lahenduste loomiseks.

## Samm-sammuline arhitektuuri skeemi selgitus
Kujuta ette, et kavandad suurt reisi ja sul on meeskond ekspertabistajaid, kes aitavad kõigis detailides. Azure AI Reisibürood töötavad sarnaselt, kasutades erinevaid osi (nagu meeskonnaliikmed), kellel on oma erialane ülesanne. Siin on, kuidas see kõik koos toimib:

### Kasutajaliides (UI):
Mõtle sellele kui sinu reisibüroo vastuvõtule. Siin esitad sa (kasutaja) küsimusi või soove, näiteks: „Leia mulle lend Pariisi.“ See võib olla veebist vestlusaken või sõnumirakendus.

### MCP Server (koordinaator):
MCP Server on nagu juhataja, kes kuulab sinu soovi vastuvõtulauas ja otsustab, milline spetsialist peaks iga osa lahendama. Ta haldab sinu vestlust ja tagab, et kõik sujub sujuvalt.

### AI Agendid (spetsialistassistendid):
Iga agent on oma ala ekspert—üks teab kõike lendudest, teine hotellidest ja kolmas marsruudi planeerimisest. Kui küsid reisi kohta, saadab MCP Server su päringu õigetele agentidele. Need agendid kasutavad oma teadmisi ja tööriistu, et leida parimad valikud.

### Azure OpenAI teenus (keeleekspert):
See on nagu keeleekspert, kes mõistab täpselt, mida sa küsid, ükskõik kuidas sõnastatud. Ta aitab agentidel mõista sinu soove ja vastata loomulikus, vestluslikus keeles.

### Azure AI Search & ettevõtteandmed (infokogu):
Kujuta ette tohutut ja ajakohastatud raamatukogu, kus on kogu uusim reisiteave—lendude ajakavad, hotellide saadavus ja palju muud. Agendid otsivad sellest raamatukogust täpsemaid vastuseid sinu jaoks.

### Autentimine & turvalisus (valvur):
Nii nagu valvur kontrollib, kes tohib teatud aladesse siseneda, tagab see osa, et ainult volitatud isikud ja agendid pääsevad tundlikele andmetele ligi. Samuti hoiab see sinu andmed turvalisena ja konfidentsiaalsena.

### Juurutamine Azure Container Apps keskkonnas (hoone):
Kõik need assistendid ja tööriistad töötavad koos turvalises ja skaleeritavas hoones (pilves). See tähendab, et süsteem saab korraga teenindada palju kasutajaid ja on alati valmis sind aitama.

## Kuidas see kõik koos toimib:

Sa alustad, esitades küsimuse vastuvõtulauas (UI).
Juhataja (MCP Server) otsustab, milline spetsialist (agent) sind aitab.
Spetsialist kasutab keeleeksperti (OpenAI), et sinu päringut mõista ja raamatukogu (AI Search), et parima vastuse leida.
Valvur (autentimine) tagab, et kõik on turvaline.
Kõik see toimub usaldusväärses ja skaleeritavas hoones (Azure Container Apps), tagades sujuva ja turvalise kogemuse.
See meeskonnatöö võimaldab süsteemil kiiresti ja turvaliselt sind reisi planeerimisel aidata, nagu meeskond reisieksperte kaasaegses kontoris!

## Tehniline rakendus
- **MCP Server:** Majutab põhiorganiseerimise loogikat, avaldab agentide tööriistu ja haldab konteksti mitmeetapiliste reisiplaanide töövoogude jaoks.
- **Agendid:** Igal agendil (nt FlightAgent, HotelAgent) on oma MCP tööriist koos käsupõhiste mallide ja loogikaga.
- **Azure integratsioon:** Kasutab Azure OpenAI keelemõistmiseks ja Azure AI Searchi andmete pärimiseks.
- **Turvalisus:** Integreerib Microsoft Entra ID-ga autentimiseks ja rakendab vähima privileegiga juurdepääsukontrolli.
- **Juurutamine:** Toetab juurutamist Azure Container Apps keskkonnas skaleeritavuse ja operatiivse efektiivsuse tagamiseks.

## Tulemused ja mõju
- Demonstreerib, kuidas MCP-d saab kasutada mitme AI-agendi orkestreerimiseks päristootmises.
- Kiirendab lahenduse arendust, pakkudes taaskasutatavaid mustreid agentide koordineerimiseks, andmete integreerimiseks ja turvaliseks juurutamiseks.
- Teenib plaanina valdkonnaspetsiifiliste, AI-tugevate rakenduste loomiseks, kasutades MCP-d ja Azure teenuseid.

## Viited
- [Azure AI Travel Agents GitHub Repo](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI teenus](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Mis edasi

- Tagasi: [Juhtumiuuringute ülevaade](./README.md)
- Järgmine: [ADO üksuste uuendamine YouTube'i abil](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:  
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüame täpsust, palun arvestage, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Algne dokument selle emakeeles tuleks lugeda autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tingitud arusaamatuste ega valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->