# 🚀 10 Microsofti MCP-serverit, mis muudavad arendajate tootlikkust

## 🎯 Mida sa selles juhendis õpid

See praktiline juhend tutvustab kümmet Microsofti MCP-serverit, mis muudavad aktiivselt seda, kuidas arendajad koos tehisintellekti assistentidega töötavad. Selle asemel, et lihtsalt seletada, mida MCP-serverid *võivad* teha, näitame servereid, mis juba tegelikult muudavad igapäevaseid arendustöid Microsoftis ja mujal.

Iga selles juhendis olev server on valitud päriselu kasutusjuhtude ja arendajate tagasiside põhjal. Sa avastad mitte ainult seda, mida iga server teeb, vaid miks see on oluline ja kuidas sellest oma projektides maksimaalselt kasu saada. Kas sa oled MCP-ga täiesti uus või soovid oma olemasolevat seadistust laiendada — need serverid esindavad mõned kõige praktilisemad ja mõjusamad tööriistad Microsofti ökosüsteemis.

> **💡 Kiiralgusnipp**
> 
> Uus MCP-s? Ära muretse! See juhend on loodud algajasõbralikuks. Selgitame kontseptsioone jooksvalt ja saad alati tagasi pöörduda meie [Sissejuhatuse MCP-sse](../00-Introduction/README.md) ja [Põhikontseptsioonide](../01-CoreConcepts/README.md) moodulite juurde sügavama tausta jaoks.

## Ülevaade

See ulatuslik juhend uurib kümmet Microsofti MCP-serverit, mis revolutsioneerivad seda, kuidas arendajad suhtlevad tehisintellekti assistentide ja väliste tööriistadega. Alates Azure ressursihaldusest kuni dokumentide töötlemiseni demonstreerivad need serverid Model Context Protokolli jõudu sujuvate ja tootlike arendustöövoogude loomisel.

## Õpieesmärgid

Selle juhendi lõpus oskad sa:
- Mõista, kuidas MCP-serverid parandavad arendajate tootlikkust
- Tutvuda Microsofti mõjukamate MCP-serverite rakendustega
- Avastada iga serveri praktilisi kasutusjuhtumeid
- Teada, kuidas neid servereid VS Code’is ja Visual Studios seadistada ja konfigureerida
- Uurida laiemat MCP-ökosüsteemi ja tuleviku suundi

## 🔧 MCP-serverite mõistmine: algaja juhend

### Mis on MCP-serverid?

Kui oled Model Context Protokolli (MCP) suhtes algaja, võid mõelda: "Mis täpselt on MCP-server ja miks see mind peaks huvitama?" Alustame lihtsast võrdlusest.

Mõtle MCP-serveritele kui spetsialiseerunud assistentidele, kes aitavad su tehisintellekti koodiabilistel (näiteks GitHub Copilotil) ühenduda väliste tööriistade ja teenustega. Nagu sa kasutad telefoni erinevaid äppe eri ülesannete jaoks — üks ilmaennustuseks, teine navigeerimiseks, kolmas panganduseks — annavad MCP-serverid su AI abiliseks võime suhelda erinevate arendustööriistade ja teenustega.

### Probleem, mida MCP-serverid lahendavad

Enne MCP-serverite tulekut, kui sa tahtsid:
- Kontrollida oma Azure ressursse
- Luua GitHubi probleemi
- Teha andmebaasipäringut
- Otsida dokumentatsiooni läbi

pidid sa koodimise katkestama, brauseri avama, sobivale veebilehele minema ja manualselt neid tegevusi tegema. See pidev konteksti vahetamine rikub su töövoo ja vähendab tootlikkust.

### Kuidas MCP-serverid muudavad sinu arenduskogemust

MCP-serveritega saad jääda oma arenduskeskkonda (VS Code, Visual Studio jms) ja paluda lihtsalt AI assistendil need ülesanded ära teha. Näiteks:

**Selle traditsioonilise töövoo asemel:**
1. Lõpeta koodimine
2. Ava brauser
3. Mine Azure portaalile
4. Otsi üles salvestuskonto andmed
5. Tule tagasi VS Code’i
6. Jätka koodimist

**Sa saad nüüd teha nii:**
1. Küsi AI-ilt: "Mis seis on minu Azure salvestuskontodega?"
2. Jätka koodimist info põhjal

### Peamised eelised algajatele

#### 1. 🔄 **Jää oma töövoogu**
- Pole enam vaja liikuda mitmete rakenduste vahel
- Keskendu kirjutatavale koodile
- Vähenda vaimset koormust erinevate tööriistade haldamisel

#### 2. 🤖 **Kasuta loomulikku keelt keerukate käskude asemel**
- Märksüntaksi õppimise asemel kirjelda, milliseid andmeid sul vaja on
- Azure CLI käskude meelespidamise asemel selgita, mida soovid saavutada
- Lase AI-l tehnilised detailid ära lahendada, samal ajal kui sina keskendud loogikale

#### 3. 🔗 **Ühenda erinevad tööriistad omavahel**
- Loo võimsaid töövooge, kombineerides erinevaid teenuseid
- Näide: "Hangi kõik hiljutised GitHubi probleemid ja loo neile vastavad Azure DevOpsi tööüksused"
- Ehita automatiseerimisi ilma keerulisi skripte kirjutamata

#### 4. 🌐 **Juurdepääs kasvavale ökosüsteemile**
- Kasuta Microsofti, GitHubi ja teiste ettevõtete poolt loodud servereid
- Sega ja sobita erinevate pakkujate tööriistu sujuvalt
- Liitu standardiseeritud ökosüsteemiga, mis töötab mitme erineva AI assistendiga

#### 5. 🛠️ **Õpi praktiliselt tegutsedes**
- Alusta valmis serveritega, et mõista kontseptsioone
- Ehita oma servereid järk-järgult, kui tunned end mugavamalt
- Kasuta SDK-sid ja dokumentatsiooni oma õppejuhiseks

### Reaalne näide algajale

Oletame, et oled uus veebi arenduses ja teed oma esimest projekti. Siin on, kuidas MCP-serverid võivad aidata:

**Traditsiooniline lähenemine:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**MCP-serveritega:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### Ettevõtte standardi eelis

MCP on muutumas tööstusharu laiapõhjaliseks standardiks, mis tähendas:
- **Järjepidevus**: Sarnane kasutajakogemus erinevates tööriistades ja ettevõtetes
- **Ühilduvus**: Erinevate pakkujate serverid töötavad koos
- **Tulevikukindlus**: Oskused ja seadistused kantakse üle eri AI assistentide vahel
- **Kogukond**: Suur teadmiste ja ressursside jagamise ökosüsteem

### Alustamine: mida sa õpid

Selles juhendis vaatleme 10 Microsofti MCP-serverit, mis on eriti kasulikud igal tasemel arendajatele. Iga server on loodud:
- Lahendama sagedasi arendaja probleeme
- Vähendama korduvaid ülesandeid
- Parandama koodi kvaliteeti
- Parendama õppimisvõimalusi

> **💡 Õpinipp**
> 
> Kui oled MCP-ga täiesti uus, alusta meie [Sissejuhatusest MCP-sse](../00-Introduction/README.md) ja [Põhikontseptsioonidest](../01-CoreConcepts/README.md). Seejärel tule tagasi siia, et näha neid kontseptsioone reaalses kasutuses Microsofti tööriistadega.
>
> Lisateksti MCP tähtsuse kohta leiad Maria Naggaga postitusest: [Ühenda kord, integreeri kõikjal MCP-ga](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).

## MCP-ga alustamine VS Code’is ja Visual Studios 🚀

Nende MCP-serverite seadistamine on lihtne, kui kasutad Visual Studio Code’i või Visual Studio 2022 koos GitHub Copilotiga.

### VS Code seadistus

Siin on põhietapid VS Code’i jaoks:

1. **Lülita sisse agentrežiim**: VS Code’is vaheta Copilot Chat aknas agentrežiimile
2. **Konfigureeri MCP-serverid**: Lisa serveri konfiguratsioonid VS Code’i settings.json faili
3. **Käivita serverid**: Vajuta igale soovitud serverile „Start“
4. **Vali tööriistad**: Määra, milliseid MCP-servereid praeguses sessioonis lubada

Detailse seadistuse juhised leiad [VS Code MCP dokumentatsioonist](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 Professionaalnipp: halda MCP-servereid nagu proff!**
> 
> VS Code Extensions vaates on nüüd olemas [kasulik uus kasutajaliides MCP-serverite haldamiseks](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! Sul on kiire ligipääs serverite käivitamiseks, peatamiseks ja haldamiseks lihtsa ning selge liidese kaudu. Proovi järgi!

### Visual Studio 2022 seadistus

Visual Studio 2022 (versioon 17.14 või uuem) puhul:

1. **Lülita sisse agentrežiim**: GitHub Copiloti Chat aknas klõpsa "Ask" rippmenüüs „Agent“ valikut
2. **Loo konfiguratsioonifail**: Loo lahenduse kataloogi `.mcp.json` fail (soovitatav asukoht: `<SOLUTIONDIR>\.mcp.json`)
3. **Sea serverid üles**: Lisa oma MCP-serverite konfiguratsioonid standardse MCP formaadis
4. **Hea tööriistadele**: Kui küsitakse, kinnita või luba vajalikud tööriistad sobivate õigustega

Detailse Visual Studio seadistuse juhised on [Visual Studio MCP dokumentatsioonis](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

Iga MCP-server nõuab oma konfiguratsiooniparameetreid (ühendusestruktuurid, autentimine jms), kuid seadistusprotsess on mõlemas IDEs ühtne.

## Õppetunnid Microsofti MCP-serveritelt 🛠️

### 1. 📚 Microsoft Learn Docs MCP-server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Mida see teeb**: Microsoft Learn Docs MCP-server on pilves majutatud teenus, mis annab tehisintellekti assistentidele reaalajas ligipääsu ametlikule Microsofti dokumentatsioonile Model Context Protokolli kaudu. See ühendub aadressiga `https://learn.microsoft.com/api/mcp` ja võimaldab semantilist otsingut üle Microsoft Learni, Azure’i dokumentatsiooni, Microsoft 365 dokumentatsiooni ja teiste ametlike Microsofti allikate.

**Miks see on kasulik**: Kuigi see võib tunduda kui „lihtsalt dokumentatsioon,“ on see server tegelikult iga Microsofti tehnoloogiat kasutava arendaja jaoks ülioluline. Üks suurimaid kaebusi .NET arendajate seas AI koodiassistente kasutades on see, et nad ei ole kursis uusimate .NET ja C# väljalasetega. Microsoft Learn Docs MCP-server lahendab selle, pakkudes reaalajas ligipääsu kõige uuemale dokumentatsioonile, API viidetele ja parimatele praktikatele. Kas sa töötad uusimate Azure SDK-dega, uurid värskeid C# 13 funktsioone või rakendad tipptasemel .NET Aspire mustreid, see server tagab, et su AI assistendil on ligipääs autoriteetsele ja ajakohasele infole, mis võimaldab genereerida täpset ja moodsat koodi.

**Tegelik kasutus**: "Millised on az cli käsud Azure konteinerapliku loomiseks vastavalt ametlikule Microsoft Learn dokumentatsioonile?" või "Kuidas konfigureerida Entity Framework’i sõltuvussüsti ASP.NET Core’is?" Või näiteks "Kontrolli seda koodi, kas see vastab Microsoft Learn dokumentatsiooni jõudlussoovitustele." Server pakub kõikehõlmavat katvust Microsoft Learni, Azure’i ja Microsoft 365 dokumentatsiooni seas, kasutades kõrgklassi semantilist otsingut kõige kontekstuaalselt sobivama info leidmiseks. See tagastab kuni 10 kvaliteetset sisutükki artiklite pealkirjade ja URL-idega, alati pääsedes ligi kõige värskemale Microsofti dokumentatsioonile, niipea kui see avaldatakse.

**Näidiskasutus**: Server eksponeerib tööriista `microsoft_docs_search`, mis teostab semantilist otsingut Microsofti ametliku tehnilise dokumentatsiooni vastu. Kui see on seadistatud, saad küsida näiteks: "Kuidas rakendada JWT autentimist ASP.NET Core’is?" ja saada üksikasjalikud ametlikud vastused koos allikate linkidega. Otsingu kvaliteet on erakordne, sest see mõistab konteksti – kui küsida „konteinerite“ kohta Azure’i kontekstis, tagastab see Azure Container Instances dokumentatsiooni, aga samas termin .NET kontekstis toob tagasi vastava C# kollektsiooniteabe.

See on eriti kasulik kiiresti muutuva või hiljuti uuendatud teekide ja kasutusjuhtude puhul. Näiteks mõnes hiljutises kodeerimisprojektis tahtsin kasutada uusimate .NET Aspire ja Microsoft.Extensions.AI versioonide funktsioone. Microsoft Learn Docs MCP-serveri kaasamisega sain kasutada mitte ainult API dokumente, vaid ka värskelt avaldatud juhiseid ja näiteid.

> **💡 Professionaalnipp**
> 
> Ka tööriistasõbralikud mudelid vajavad julgustust MCP tööriistu kasutada! Mõtle lisada süsteemi prompt või [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) stiilis juhendit: "Sul on ligipääs tööriistale `microsoft.docs.mcp` – kasuta seda tööriista, et otsida Microsofti uusimat ametlikku dokumentatsiooni seoses küsimustega Microsofti tehnoloogiate kohta nagu C#, Azure, ASP.NET Core või Entity Framework."
>
> Hea näide sellest on [C# .NET Janitori vestlusrežiim](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md) Awesome GitHub Copiloti repos. See režiim kasutab spetsiaalselt Microsoft Learn Docs MCP-serverit, et aidata koristada ja kaasaegsetada C# koodi, kasutades uusimaid mustreid ja parimaid praktikaid.
### 2. ☁️ Azure MCP-server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Mida see teeb**: Azure MCP Server on ulatuslik 15+ spetsialiseeritud Azure teenuse kontrollerite komplekt, mis toob kogu Azure ökosüsteemi sinu tehisintellekti töövoogu. See ei ole lihtsalt üks server – see on võimas kogu, mis hõlmab ressursihaldust, andmebaaside ühenduvust (PostgreSQL, SQL Server), Azure Monitori logianalüüsi KQL-iga, Cosmos DB integratsiooni ja palju muud.

**Miks see on kasulik**: Lisaks Azure ressursside haldamisele parandab see server oluliselt koodi kvaliteeti, kui töötad Azure SDK-dega. Kui kasutad Azure MCP-d Agent režiimis, ei aita see sul mitte ainult koodi kirjutada – see aitab sul kirjutada *paremat* Azure koodi, mis järgib praeguseid autentimismustreid, veahaldusparimaid tavasid ja kasutab uusimaid SDK funktsioone. Selle asemel, et saada üldist koodi, mis võib töötada, saad koodi, mis järgib Azure soovitatud mustreid tootlustöökoormuste jaoks.

**Põhimoodulid sisaldavad**:
- **🗄️ Andmebaasi kontrollerid**: Otsene loomuliku keele juurdepääs Azure Database for PostgreSQL ja SQL Serveri jaoks
- **📊 Azure Monitor**: KQL-põhine logianalüüs ja operatsiooniline ülevaade
- **🌐 Ressursside haldus**: Täielik Azure ressursside elutsükli haldus
- **🔐 Autentimine**: DefaultAzureCredential ja haldaja identiteedi mustrid
- **📦 Salvestusteenused**: Blob Storage, Queue Storage ja Table Storage toimingud
- **🚀 Konteineriteenused**: Azure Container Apps, Container Instances ja AKS haldus
- **Ja palju rohkem spetsialiseeritud kontrollerid**

**Reaalne kasutus**: "Nimeta minu Azure salvestuskontod", "Päringi Log Analytics tööruumi viimase tunni vigade kohta", või "Aita mul ehitada Azure rakendus Node.js-ga õige autentimisega"

**Täielik demo stsenaarium**: Siin on täielik läbikäik, mis näitab Azure MCP ja GitHub Copilot for Azure laienduse kombinatsiooni võimsust VS Code'is. Kui sul mõlemad on installitud ja sa esitad:

> "Loo Pythoni skript, mis laadib faili üles Azure Blob Storage'i, kasutades DefaultAzureCredential autentimist. Skript peaks ühenduma minu Azure salvestuskontoga nimega 'mycompanystorage', laadima üles konteinerisse nimega 'documents', looma testi faili praeguse ajatempli ja laadima selle üles, käsitlema vigu mõistlikult ning pakkuma informatiivset väljundit, järgima Azure parimaid tavasid autentimiseks ja veahalduseks, sisaldama kommentaare, mis selgitavad DefaultAzureCredential autentimise tööpõhimõtet, ning olema hästi struktureeritud, korralike funktsioonide ja dokumentatsiooniga."

Azure MCP Server genereerib täieliku, tootmiseks valmis Pythoni skripti, mis:
- Kasutab uusimat Azure Blob Storage SDK-d õige asünkroonse mustriga
- Rakendab DefaultAzureCredential koos põhjaliku varuplaani selgitusega
- Sisaldab tugevat vigade haldust spetsiifiliste Azure erinditüüpidega
- Järgib Azure SDK parimaid tavasid ressursside ja ühenduste haldamisel
- Pakub detailset logimist ja informatiivset konsooliväljundit
- Loob korrektselt struktureeritud skripti koos funktsioonide, dokumentatsiooni ja tüübi vihjetega

See teeb selle silmapaistvaks – ilma Azure MCP-ta võid saada üldist blob storage koodi, mis töötab, kuid ei järgi praeguseid Azure mustreid. Azure MCP-ga saad koodi, mis kasutab uusimaid autentimismeetodeid, lahendab Azure spetsiifilisi veastseene ja järgib Microsofti soovitatud parimaid tavasid tootmisrakenduste jaoks.

**Näidetena**: Mul on olnud raskusi `az` ja `azd` CLI-de spetsiifiliste käskude meelespidamisega ad-hoc kasutamiseks. Minu jaoks on see alati kaheastmeline protsess: esmalt vaadata süntaks üles, siis käsklus käivitada. Sageli astun lihtsalt portaali ja klõpsan ringi, et tööd teha, sest ei taha tunnistada, et ei mäleta CLI süntaksit. Võime lihtsalt kirjeldada, mida tahan, on suurepärane ning veel parem on seda teha ilma IDE-st lahkumata!

Hea nimekiri kasutusjuhtudest on olemas [Azure MCP hoidlas](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server), et alustada. Täielike seadistusjuhiste ja arenenud konfiguratsioonivõimaluste jaoks vaata [ametlikku Azure MCP dokumentatsiooni](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**Mida see teeb**: Ametlik GitHub MCP Server pakub sujuvat integratsiooni GitHubi kogu ökosüsteemiga, pakkudes nii hostitud kaugjuurdepääsu kui ka lokaalse Dockeri juurutamise võimalusi. See ei ole pelgalt põhiliste hoidlaoperatsioonide jaoks – see on ulatuslik tööriistakomplekt, mis hõlmab GitHub Actions haldust, pull request töövooge, probleemide jälgimist, turvakontrolle, teavitusi ja arenenud automatiseerimise võimalusi.

**Miks see on kasulik**: See server muudab GitHubiga suhtlemise viisi, tuues kogu platvormi kogemuse otse sinu arenduskeskkonda. Selle asemel, et pidevalt vahetada VS Code ja GitHub.com vahel projektihalduse, koodiläbivaatuse ja CI/CD jälgimise vahel, saad kõike teha loomuliku keele käskudega, olles samal ajal keskendunud oma koodile.

> **ℹ️ Märkus: Erinevad 'Agent' tüübid**
> 
> Ära sega seda GitHub MCP Serverit GitHubi Coding Agentiga (tehisintellekti agent, kellele saab määrata probleemide automatiseeritud kooditöid). GitHub MCP Server töötab VS Code Agent režiimis, pakkudes GitHub API integratsiooni, samas kui GitHub Coding Agent on eraldi funktsioon, mis loob pull requeste, kui talle on määratud GitHubi probleemid.

**Põhivõimed sisaldavad**:
- **⚙️ GitHub Actions**: Täielik CI/CD torujuhtme haldus, töövoogude jälgimine ja artefaktide haldus
- **🔀 Pull Requests**: PR-ide loomine, ülevaade, ühildamine ja haldus koos põhjaliku oleku jälgimisega
- **🐛 Probleemid**: Probleemide täisväärtuslik elutsükli haldus, kommenteerimine, sildistamine ja määramine
- **🔒 Turvalisus**: Koodi skannimise hoiatused, salajaste andmete avastamine ja Dependaboti integratsioon
- **🔔 Teavitused**: Nutikas teavituste haldus ja hoidla tellimuste kontroll
- **📁 Hoiu haldus**: Failitoimingud, harude haldus ja hoidlaadministreerimine
- **👥 Koostöö**: Kasutajate ja organisatsioonide otsing, meeskonna haldus ja juurdepääsu kontroll

**Reaalne kasutus**: "Loo pull request minu funktsiooniharust", "Näita mulle kõiki ebaõnnestunud CI töid sel nädalal", "Nimeta minu hoidlate avatud turvahoiatused" või "Leia kõik mulle määratud probleemid minu organisatsioonidest"

**Täielik demo stsenaarium**: Siin on võimas töövoog, mis demonstreerib GitHub MCP Serveri võimeid:

> "Pean valmistuma sprintide ülevaateks. Näita mulle kõiki minu sel nädalal loodud pull requeste, kontrolli meie CI/CD torujuhtmete olekut, koosta kokkuvõte kõigist turvahoiatustest, millega peame tegelema, ja aita mul koostada väljaandelõikud põhinedes ühendatud PR-idel, millel on 'feature' silt."

GitHub MCP Server:
- Pärib sinu hiljutised pull requestid detailse staatusega
- Analüüsib töövoo jooksusid ja toob esile kõik vead või jõudlusprobleemid
- Koondab turvakontrolli tulemused ja seab prioriteediks kriitilised hoiatused
- Genereerib põhjalikud väljaandetekstid ühendatud PR-idest teabe eraldamise kaudu
- Pakub tegevussoovitusi sprintide planeerimiseks ja väljaande ettevalmistamiseks

**Näidetena**: Mulle meeldib seda kasutada koodiläbivaatuste töövoogudes. Selle asemel, et hüpata VS Code'i, GitHubi teadete ja pull requesti lehtede vahel, saan öelda "Näita mulle kõiki PR-e, mis ootavad minu ülevaadet" ja siis "Lisa kommentaar PR #123-le, küsides autentimismeetodi veahaldusest." Server haldab GitHub API päringud, säilitab arutelu konteksti ja aitab mul isegi koostada konstruktiivsemaid ülevaatuse kommentaare.

**Autentimise võimalused**: Server toetab nii OAuth-i (sujuvalt VS Code'is) kui ka isiklikke juurdepääsutokenit, konfiguratsiooni tööriistakomplekte on võimalik lubada ainult vajaliku GitHubi funktsionaalsuse jaoks. Saad seda kasutada kaughostitud teenusena kiireks seadistuseks või lokaalselt Dockeriga täies kontrollis.

> **💡 Pro näpunäide**
> 
> Luba ainult vajalikud tööriistakomplektid, konfigureerides `--toolsets` parameetrit oma MCP serveri seadetes, et vähendada konteksti suurust ja parandada tehisintellekti tööriistade valikut. Näiteks lisa `"--toolsets", "repos,issues,pull_requests,actions"` oma MCP konfiguratsiooni argumentidesse põhiarendustöövoogude jaoks või kasuta `"--toolsets", "notifications, security"`, kui peamiselt soovid GitHubi jälgimise võimalusi.
### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**Mida see teeb**: Ühendub Azure DevOps teenustega ulatuslikuks projektihalduseks, tööülesannete jälgimiseks, build torujuhtme halduseks ja hoidlate operatsioonideks.

**Miks see on kasulik**: Meeskondadele, kes kasutavad Azure DevOpsi oma peamise DevOps platvormina, kõrvaldab see MCP server pideva vahelehtede vahel vahetamise arenduskeskkonna ja Azure DevOps veebiliidese vahel. Saad hallata tööülesandeid, kontrollida build-olekuid, pärida hoidlaid ja teostada projektihaldusega seotud ülesandeid otse oma AI abilise kaudu.

**Reaalne kasutus**: "Näita mulle kõiki aktiivseid tööülesandeid jooksval sprintidel WebApp projekti jaoks", "Loo bugiraport äsja avastatud sisselogimisprobleemi kohta" või "Kontrolli meie build torujuhtmete olekut ja näita mulle viimaseid ebaõnnestumisi"

**Näidetena**: Võid lihtsalt kontrollida oma meeskonna jooksva sprinti staatust lihtsa päringuga nagu "Näita mulle kõiki aktiivseid tööülesandeid jooksval sprintidel WebApp projekti jaoks" või "Loo bugiraport äsja avastatud sisselogimisprobleemi kohta" ilma oma arenduskeskkonnast lahkumata.

### 5. 📝 MarkItDown MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**Mida see teeb**: MarkItDown on võimas dokumendikonversiooniserver, mis teisendab erinevaid failiformaate kõrgekvaliteediliseks Markdown-iks, optimeeritud LLM-i tarbeks ja tekstianalüüsi töövoogude jaoks.

**Miks see on kasulik**: Hädavajalik kaasaegsetele dokumentatsiooni töövoogudele! MarkItDown toetab muljetavaldavat valikut failiformaate, säilitades samal ajal olulist dokumendi struktuuri nagu pealkirjad, nimekirjad, tabelid ja lingid. Erinevalt lihtsatest tekstiekstraktsiooni tööriistadest keskendub see semantilise tähenduse ja vormingu säilitamisele, mis on väärtuslik nii tehisintellekti töötlemiseks kui ka inimeste loetavuseks.

**Toetatavad failivormingud**:
- **Office'i dokumendid**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **Meediafailid**: Pildid (koos EXIF-metaandmete ja OCR-iga), Audio (koos EXIF-metaandmete ja kõnetuvastusega)
- **Veebisisu**: HTML, RSS-vood, YouTube'i URL-id, Vikipeedia lehed
- **Andmevormingud**: CSV, JSON, XML, ZIP-failid (sisu töödeldakse rekursiivselt)
- **Väljaandmise vormingud**: EPub, Jupyter märkmikud (.ipynb)
- **E-post**: Outlooki sõnumid (.msg)
- **Täpsemad**: Azure Document Intelligence integreerimine parandatud PDF-töötluseks

**Täiustatud võimekused**: MarkItDown toetab LLM-põhiseid pildi kirjeldusi (kui kasutada OpenAI klienti), Azure Document Intelligence’i täiustatud PDF-töötlust, heli transkriptsiooni kõnesisu jaoks ning pluginasüsteemi täiendavate failiformaatide lisamiseks.

**Reaalne kasutus**: „Teisenda see PowerPointi esitlus Markdown-iks meie dokumentatsioonisaidi jaoks“, „Eemalda tekst sellest PDF-ist koos korrektsel pealkirjastruktuuriga“ või „Muuda see Exceli tabel loetavaks tabeliks.“

**Näide**: Tsiteerides [MarkItDown dokumentatsiooni](https://github.com/microsoft/markitdown#why-markdown):

> Markdown on väga sarnane tavatekstile, minimaalsete märgistuste või vormindusega, kuid võimaldab siiski olulist dokumendi struktuuri esindada. Levinud LLM-id, nagu OpenAI GPT-4o, „räägivad“ loomulikult Markdown-keelt ja kasutavad seda sageli ka oma vastustes ilma käsuta. See viitab sellele, et neid on treenitud väga suurel hulgal Markdown-formaadis tekstidel ja nad mõistavad seda hästi. Lisaks on Markdown-i konventsioonid väga tokenite tõhusad.

MarkItDown säilitab dokumendi struktuuri väga hästi, mis on AI töövoogude jaoks oluline. Näiteks PowerPointi esitluse teisendamisel säilitab see slaidide korralduse õigete pealkirjadega, ekstraheerib tabelid Markdown-tabelitena, lisab piltidele alternatiivteksti ning töötleb ka kõnelejate märkmeid. Graafikud teisendatakse loetavateks andmetabeliteks ja tulemuseks olev Markdown hoiab originaalesitluse loogilist voogu. See teeb sellest ideaalse tööriista esitlussisu AI süsteemides kasutamiseks või olemasolevatest slaididest dokumentatsiooni loomiseks.

### 6. 🗃️ SQL Server MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Mida see teeb**: Pakub vestlussõbralikku juurdepääsu SQL Serveri andmebaasidele (kohapeal, Azure SQL või Fabric)

**Miks see on kasulik**: Sarnane PostgreSQL serverile, kuid Microsoft SQL ökosüsteemi jaoks. Ühenda lihtsa ühendusstringiga ja alusta päringute tegemist loomulikus keeles – konteksti vahetamisele on lõpp!

**Reaalne kasutus**: „Leia kõik tellimused, mida viimase 30 päeva jooksul pole täidetud“ tõlgitakse sobivateks SQL-päringuteks ja tagastatakse vormindatud tulemused

**Näide**: Kui oled oma andmebaasi ühenduse seadistanud, võid kohe alustada andmetega vestlemist. Blogipostitus demonstreerib seda lihtsa küsimusega: „millise andmebaasiga oled ühendatud?“ MCP-server vastab, käivitades sobiva andmebaasitööriista, ühendades su SQL Serveri instantsiga ja tagastades info sinu praeguse andmebaasi ühenduse kohta – ilma et oleks vaja SQL-ridu kirjutada. Server toetab põhjalikku andmebaasi haldust alates skeemi juhtimisest kuni andmete manipuleerimiseni, kõik loomuliku keele käskudega. Täielike seadistusjuhiste ja konfiguratsiooninäidete jaoks VS Code’i ja Claude Desktopiga vt: [Introducing MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).

### 7. 🎭 Playwright MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**Mida see teeb**: Võimaldab AI agentidel suhelda veebilehtedega testimiseks ja automatiseerimiseks

> **ℹ️ Toidab GitHub Copiloti**
> 
> Playwright MCP Server annab GitHub Copiloti kodeerimisagendile veebisirvimise võimekuse! [Loe selle funktsiooni kohta rohkem](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**Miks see on kasulik**: Täiustatud automatiseeritud testimiseks, mida juhib loomuliku keele kirjeldused. AI saab navigeerida veebilehtedel, täita vorme ja ekstraheerida andmeid struktureeritud ligipääsetavuse hetkepiltide kaudu – see on erakordselt võimas!

**Reaalne kasutus**: „Testi sisselogimise funktsiooni ja kontrolli, kas armatuurlaud laeb korrektselt“ või „Loo test, mis otsib tooteid ja kontrollib tulemuste lehte“ – kõik ilma rakenduse lähtekoodi vajamata

**Näide**: Minu meeskonnakaaslane Debbie O’Brien on hiljuti Playwright MCP Serveriga suurepäraselt töötanud! Näiteks demonstreeris ta hiljuti, kuidas täiesti toimivad Playwrighti testid saab genereerida isegi rakenduse lähtekoodi kättesaamatuses. Tema stsenaariumis palus ta Copilotil luua test filmiotsingu rakendusele: mine saidile, otsi „Garfieldit“ ja kontrolli, et film ilmub tulemustes. MCP avas brauserisessiooni, uuris DOM-hetkepilte, leidis õiged selektorid ja genereeris täieliku toimiva TypeScripti testi, mis läbis testi esimese korraga.

Selle võimsuse teeb võimalikuks see, et sõnumeid loomulikus keeles saab otse täitmiskõlblikuks testikoodiks muuta. Traditsioonilised meetodid vajavad kas käsitsi testikirjutamist või koodi ligipääsu konteksti tõttu. Playwright MCP võimaldab aga testida välist saidi, klientrakendust või töötada musta kasti testimisskeemidel, kus lähtekoodi ligipääs puudub.

### 8. 💻 Dev Box MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Mida see teeb**: Halda Microsoft Dev Box keskkondi loomulikus keeles

**Miks see on kasulik**: Lihtsustab arenduskeskkondade haldust märgatavalt! Loo, konfigureeri ja halda keskkondi ilma konkreetsete käskude meeldejätmiseta.

**Reaalne kasutus**: „Loo uus Dev Box uusima .NET SDK-ga ja seadista see meie projekti jaoks“, „Kontrolli kõigi minu arenduskeskkondade olekut“ või „Loo meeskonna esitluste jaoks standardiseeritud demo keskkond“

**Näide**: Olen suur fänn Dev Box kasutamisest isiklikuks arenduseks. Minu „ahatundmine“ oli siis, kui James Montemagno selgitas, kui suurepärane on Dev Box konverentsi demode jaoks, sest sellel on ülikiire Etherneti ühendus sõltumata konverentsi, hotelli või lennuki wifi-st. Tegelikult harjutasin hiljuti konverentsi demo tegemist, kui minu sülearvuti oli ühendatud telefoni hotspotiga bussis Bruggest Antwerpenisse sõites! Minu järgmine samm on hakata uurima, kuidas mitut arenduskeskkonda ja standardseid demo keskkondi meeskonnaga hallata. Üks suur kasutusjuhtum, mida olen kuulnud klientidelt ja kolleegidelt, on Dev Box kasutamine eelkonfigureeritud arenduskeskkondade jaoks. Mõlemas olukorras võimaldab MCP Dev Boxide seadistamist ja haldamist loomulikus keeles, olles samal ajal arenduskeskkonnas sees.

### 9. 🤖 Microsoft Foundry MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**Mida see teeb**: Microsoft Foundry MCP Server pakub arendajatele ulatuslikku ligipääsu Azure'i tehisintellekti ökosüsteemile, sealhulgas mudelite kataloogid, juurutuse haldus, teadmiste indekseerimine Azure AI Searchi abil ja hindamistööriistad. See eksperimentaalne server seob tehisintellekti arenduse ja Azure'i võimsa AI infrastruktuuri, hõlbustades AI rakenduste loomist, juurutamist ja hindamist.

**Miks see on kasulik**: See server muudab oluliselt teie tööd Azure'i AI teenustega, tuues ettevõtte tasemel AI funktsioonid otse teie arendustöövoogu. Azure'i portaali, dokumentatsiooni ja IDE vahel vahetamise asemel saate avastada mudeleid, juurutada teenuseid, hallata teadmistebaase ja hinnata tehisintellekti jõudlust loomuliku keele käsutega. See on eriti võimas arendajatele, kes loovad RAG (Retrieval-Augmented Generation) rakendusi, haldavad mitme mudeliga juurutusi või rakendavad põhjalikke AI hindamisprotsesse.

**Peamised arendaja võimalused**:
- **🔍 Mudeli avastamine ja juurutamine**: Avastage Microsoft Foundry mudelikataloogi, hankige üksikasjalikku mudeliteavet koos koodinäidistega ja juurutage mudeleid Azure AI teenustesse
- **📚 Teadmiste haldus**: Looge ja haldage Azure AI Search indekseid, lisage dokumente, konfigureerige indekseerijad ja ehitage keerukaid RAG süsteeme
- **⚡ AI agendi integreerimine**: Ühendage Azure AI Agentidega, pärige olemasolevaid agente ja hinnake agendi jõudlust tootmiskeskkonnas
- **📊 Hindamisraamistik**: Käivitage põhjalikke teksti- ja agendi hindamisi, genereerige markdown aruandeid ja rakendage kvaliteedi tagamist AI rakendustele
- **🚀 Prototüüpimise tööriistad**: Saage seadistamisjuhised GitHub-põhiseks prototüüpimiseks ja pääsete ligi Microsoft Foundry Labsile, mis pakub tipptasemel uurimusmudeleid

**Tegeliku elu arendaja kasutus**: "Juuruta Phi-4 mudel oma rakenduse jaoks Azure AI teenustesse", "Loo uus otsinguindeks oma dokumentatsiooni RAG süsteemi jaoks", "Hinda mu agendi vastuseid kvaliteedimõõdikute põhjal" või "Leia parim järeldusmudel minu keerukate analüüsitööde jaoks".

**Täielik demo stsenaarium**: Siin on võimas AI arendustöövoog:

> "Ma arendan klienditoe agenti. Aita mul leida kataloogist hea järeldusmudel, juuruta see Azure AI teenustesse, loo meie dokumentatsioonist teadmistebaas, seadista hindamisraamistik vastuste kvaliteedi testimiseks ja aita seejärel prototüüpida integratsioon koos GitHubi tokeniga testimiseks."

Microsoft Foundry MCP Server:
- Pärib mudelikataloogi ja soovitab teie nõuete põhjal optimaalseid järeldusmudeleid
- Pakub juurutamiskäske ja kvota teavet teie eelistatud Azure'i regiooni kohta
- Seadistab Azure AI Search indeksid õige skeemiga teie dokumentatsiooni jaoks
- Konfigureerib hindamisliinid koos kvaliteedimõõdikutega ja turvakontrollidega
- Genereerib prototüüpimiseks koodi GitHubi autentimisega koheseks testimiseks
- Pakub teie tehnoloogiapinu jaoks kohandatud põhjalikke seadistusjuhendeid

**Esiletõstetud näide**: Arendajana olen pidanud vaeva nägema, et jälgida erinevaid saadaolevaid LLM mudeleid. Tunnen mõnda peamist, kuid tunnen, et jään ilma tootlikkuse ja efektiivsuse võitudest. Tokenid ja kvotad on pingelised ja keerulised hallata – ma ei tea kunagi, kas valin õige mudeli õige ülesande jaoks või kulutan oma eelarvet ebaefektiivselt. Kuulsin sellest MCP Serverist James Montemagnolt, kui küsisin meeskonnakaaslaste seas nende soovitusi MCP Serveri kohta selle postituse jaoks, ja olen põnevil seda kasutusele võtta! Mudelite avastamise võimalused tunduvad eriti muljetavaldavad inimesele nagu mina, kes soovib tavapäraste kahtlusaluste kõrval uusi mudeleid avastada ja ülesanneteks optimeeritud mudeleid leida. Hindamisraamistik peaks aitama mul kinnitada, et saan tegelikult paremaid tulemusi, mitte lihtsalt proovin midagi uut omaette ilma põhjuseta.

> **ℹ️ Eksperimentaalne staatus**
> 
> See MCP server on eksperimentaalne ja aktiivses arendamises. Funktsioonid ja API-d võivad muutuda. Sobib suurepäraselt Azure AI võimaluste uurimiseks ja prototüüpide loomiseks, kuid tootmiskasutuseks tuleb stabiilsusnõudeid kinnitada.
### 10. 🏢 Microsoft 365 Agentide Tööriistakasti MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**Mida see teeb**: Pakub arendajatele olulisi tööriistu AI agentide ja rakenduste loomiseks, mis integreeruvad Microsoft 365 ja Microsoft 365 Copilotiga, sh skeemi valideerimine, näidiskoodi hankimine ning tõrkeotsingu abi.

**Miks see on kasulik**: Microsoft 365 ja Copiloti jaoks arendamine hõlmab keerukaid manifestiskeeme ja spetsiifilisi arendusmustreid. See MCP server toob olulised arendusressursid otse teie kodeerimiskeskkonda, aidates skeeme valideerida, leida näidiskoodi ja lahendada tavapäraseid probleeme, ilma pideva dokumentatsiooni lugemiseta.

**Tegeliku elu kasutus**: "Valideeri mu deklaratiivse agendi manifest ja paranda skeemi vead", "Näita mulle Microsoft Graph API plugin'i rakendamise näidiskoodi" või "Aita mul tõrkeotsida Teamsi rakenduse autentimise probleeme".

**Esiletõstetud näide**: Võtsin ühendust sõbra John Milleriga pärast vestlust tema juures Buildil M365 Agentide teemal ja ta soovitas seda MCP-d. See võib olla suurepärane M365 Agentide uutele arendajatele, sest pakub malle, näidiskoodi ja raamistikke, millele tuginedes saab alustada, ilma, et jääks dokumendimerkidesse kinni. Skeemi valideerimise funktsioonid tunduvad eriti kasulikud, et vältida manifesti struktuuri vigu, mis võivad põhjustada tunde veaparandust.

> **💡 Kasulikkuse näpunäide**
> 
> Kasutage seda serverit koos Microsoft Learn Docs MCP Serveriga terviklikuks M365 arenduse toeks – üks pakub ametlikku dokumentatsiooni, teine praktilisi arendustööriistu ja tõrkeotsingu abi.


## Mis järgmiseks? 🔮

## 📋 Kokkuvõte

Mudeli konteksti protokoll (MCP) muudab seda, kuidas arendajad suhtlevad tehisintellekti assistentide ja väliste tööriistadega. Need 10 Microsofti MCP serverit demonstreerivad standardiseeritud AI integratsiooni võimsust, võimaldades sujuvaid töövooge, mis hoiavad arendajad oma vooluolekus, pakkudes samal ajal võimsaid väliseid võimalusi.

Alates põhjalikust Azure'i ökosüsteemi integratsioonist kuni spetsiaalsete tööriistadeni nagu Playwright brauseriautomatiseerimiseks ja MarkItDown dokumentide töötlemiseks näitavad need serverid, kuidas MCP võib tõsta tootlikkust erinevates arendusstsenaariumides. Standardiseeritud protokoll tagab tööriistade sujuva koostöö, luues tervikliku arenduskogemuse.

Kuna MCP ökosüsteem areneb edasi, on oluline olla kogukonnaga aktiivselt seotud, uurida uusi servereid ja luua kohandatud lahendusi, et maksimeerida oma arendustootlikkust. MCP avatud standard tähendab, et saate kombineerida erinevate müüjate tööriistu, et luua täiuslik töövoog oma konkreetsetele vajadustele.

## 🔗 Täiendavad ressursid

- [Ametlik Microsoft MCP hoidla](https://github.com/microsoft/mcp)
- [MCP kogukond ja dokumentatsioon](https://modelcontextprotocol.io/introduction)
- [VS Code MCP dokumentatsioon](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP dokumentatsioon](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP dokumentatsioon](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP sündmused](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot kohandused](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days otseülekanne 29./30. juulil või järelvaatamine](https://aka.ms/mcpdevdays)

## 🎯 Harjutused

1. **Paigalda ja seadista**: Sea üks MCP serveritest üles oma VS Code keskkonnas ja testi põhilist funktsionaalsust.
2. **Töövoo integratsioon**: Kujunda arendustöövoog, mis ühendab vähemalt kolme erinevat MCP serverit.
3. **Kohandatud serveri planeerimine**: Tuvasta oma igapäevases arendusrutiinis ülesanne, mis võiks kasu saada kohandatud MCP serverist ja loo selle jaoks spetsifikatsioon.
4. **Tulemuste analüüs**: Võrdle MCP serverite kasutamise efektiivsust tavapäraste arendusmeetoditega.
5. **Turvalisuse hindamine**: Hinda MCP serverite kasutamise turvariske oma arenduskeskkonnas ja tee ettepanekud parimateks praktikateks.


Next:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->