# 🚀 10 Microsoft MCP serverių, kurie keičia kūrėjų produktyvumą

## 🎯 Ką išmoksite šiame vadove

Šis praktinis vadovas pristato dešimt Microsoft MCP serverių, kurie aktyviai keičia kūrėjų darbą su AI asistentais. Vietoje to, kad tiesiog paaiškintume, ką MCP serveriai *gali* daryti, parodysime serverius, kurie jau daro realų poveikį kasdieniuose kūrimo procesuose tiek Microsoft, tiek kitur.

Kiekvienas šio vadovo serveris pasirinktas remiantis realiu naudojimu ir kūrėjų atsiliepimais. Sužinosite ne tik ką kiekvienas serveris daro, bet ir kodėl tai svarbu bei kaip maksimaliai išnaudoti juos savo projektuose. Nesvarbu, ar esate visiškai naujas MCP, ar norite išplėsti esamą sistemą — šie serveriai atstovauja vienus praktiškiausių ir veiksmingiausių įrankių Microsoft ekosistemoje.

> **💡 Greitas patarimas**
> 
> Naujas MCP? Nesijaudinkite! Šis vadovas skirtas pradedantiesiems. Paaiškinsime sąvokas kelyje, o visada galite grįžti prie mūsų [Įvado į MCP](../00-Introduction/README.md) ir [Pagrindinių sąvokų](../01-CoreConcepts/README.md) modulių gilinti žinias.

## Apžvalga

Šis išsamus vadovas tiria dešimt Microsoft MCP serverių, kurie revoliucionizuoja kūrėjų sąveiką su AI asistentais ir išorinėmis priemonėmis. Nuo Azure išteklių valdymo iki dokumentų apdorojimo, šie serveriai demonstruoja Model Context Protocol galią kuriant sklandžius ir našius kūrimo darbo procesus.

## Mokymosi tikslai

Vadovo pabaigoje Jūs:
- Suprasite, kaip MCP serveriai didina kūrėjų produktyvumą
- Išmoksite apie svarbiausius Microsoft MCP serverių įgyvendinimus
- Atraskite praktiškus naudojimo atvejus kiekvienam serveriui
- Sužinosite, kaip nustatyti ir konfigūruoti šiuos serverius VS Code ir Visual Studio aplinkoje
- Ištirsite platesnę MCP ekosistemą ir ateities kryptis

## 🔧 Supratimas apie MCP serverius: pradedančiojo vadovas

### Kas yra MCP serveriai?

Kaip naujokui Model Context Protocol (MCP), gali kilti klausimas: „Kas iš tikrųjų yra MCP serveris ir kodėl man tai svarbu?“ Pradėkime nuo paprasto palyginimo.

Įsivaizduokite MCP serverius kaip specializuotus asistentus, kurie padeda jūsų AI kodo rašymo pagalbininkui (pvz., GitHub Copilot) jungtis su išorinėmis priemonėmis ir paslaugomis. Kaip telefone naudojate skirtingas programėles skirtingoms užduotims — viena orui, kita navigacijai, dar kita bankiniams reikalams — taip MCP serveriai suteikia jūsų AI padėjėjui galimybę bendrauti su įvairiomis kūrimo priemonėmis ir paslaugomis.

### Kokią problemą sprendžia MCP serveriai

Prieš atsirandant MCP serveriams, jei norėjote:
- Patikrinti savo Azure išteklius
- Sukurti GitHub problemą
- Užklausti savo duomenų bazę
- Ieškoti dokumentacijoje

Turėjote nutraukti kodavimo darbą, atidaryti naršyklę, eiti į tinkamą svetainę ir rankiniu būdu atlikti šiuos veiksmus. Nuolatinis konteksto keitimas trikdo jūsų darbą ir mažina produktyvumą.

### Kaip MCP serveriai keičia jūsų kūrimo patirtį

Su MCP serveriais galite likti savo kūrimo aplinkoje (VS Code, Visual Studio ir pan.) ir tiesiog paprašyti savo AI padėjėjo atlikti šias užduotis. Pavyzdžiui:

**Vietoje tradicinio proceso:**
1. Nutraukti kodavimą
2. Atidaryti naršyklę
3. Eiti į Azure portalą
4. Pažiūrėti saugyklos paskyros informaciją
5. Grįžti į VS Code
6. Tęsti kodavimą

**Dabar galite:**
1. Paklausti AI: „Kokia mano Azure saugyklos paskyrų būklė?“
2. Tęsti kodavimą naudodami pateiktą informaciją

### Svarbiausi privalumai pradedantiesiems

#### 1. 🔄 **Išlikite savo darbo būsenoje**
- Nebereikia nuolat keisti programėlių
- Sutelkite dėmesį į rašomą kodą
- Mažinkite psichinį krūvį valdant skirtingas priemones

#### 2. 🤖 **Naudokite natūralią kalbą vietoje sudėtingų komandų**
- Vietoje SQL sintaksės laikymo atsiminkite, kokius duomenis norite gauti
- Vietoje Azure CLI komandų atsiminti, paaiškinkite, ko siekiate
- Leiskite AI tvarkyti techninius niuansus, o jūs susitelkite į logiką

#### 3. 🔗 **Jungite kelias priemones tarpusavyje**
- Kurkite galingus darbo procesus sujungdami įvairias paslaugas
- Pavyzdys: „Gauk visas naujausias GitHub problemas ir sukurk atitinkamus Azure DevOps darbo elementus“
- Automatikai kurkite procesus be sudėtingų skriptų rašymo

#### 4. 🌐 **Prieiga prie augančios ekosistemos**
- Gaukite naudą iš Microsoft, GitHub ir kitų kompanijų sukurtų serverių
- Sklandžiai derinkite įrankius iš skirtingų tiekėjų
- Prisijunkite prie standartizuotos ekosistemos, veikiančios su skirtingais AI asistentais

#### 5. 🛠️ **Mokykitės praktikuodamiesi**
- Pradėkite nuo iš anksto paruoštų serverių, kad suprastumėte pagrindus
- Palaipsniui kurkite savo serverius, kai tapsite drąsesni
- Pasinaudokite esamais SDK ir dokumentacija mokymuisi

### Realus pavyzdys pradedantiesiems

Tarkime, kad esate naujokas svetainių kūrime ir dirbate prie pirmojo projekto. Štai kaip MCP serveriai gali padėti:

**Tradicinis būdas:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**Su MCP serveriais:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### Įmonės standarto privalumas

MCP tampa pramonės standartu, reiškiančiu:
- **Nuoseklumą**: panaši patirtis įvairiose priemonėse ir įmonėse
- **Suderinamumą**: skirtingų tiekėjų serveriai dirba kartu
- **Ateities garantavimą**: įgūdžiai ir nustatymai yra perkeliamūs tarp skirtingų AI asistentų
- **Bendruomenę**: didelė dalinimosi žiniomis ir ištekliais ekosistema

### Pradžia: ką išmoksite

Šiame vadove nagrinėsime 10 Microsoft MCP serverių, ypač naudingų kūrėjams visais lygiais. Kiekvienas serveris skirtas:
- Spręsti dažnas kūrimo problemas
- Mažinti pasikartojančias užduotis
- Gerinti kodo kokybę
- Pagerinti mokymosi galimybes

> **💡 Mokymosi patarimas**
> 
> Jei esate visiškai naujas MCP, pradėkite nuo mūsų [Įvado į MCP](../00-Introduction/README.md) ir [Pagrindinių sąvokų](../01-CoreConcepts/README.md) modulių. Tada grįžkite čia ir pažiūrėkite, kaip šios sąvokos veikia su tikrais Microsoft įrankiais.
>
> Didesniam MCP svarbos kontekstui pažiūrėkite Maria Naggaga įrašą: [Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).

## Pradėkite naudotis MCP VS Code ir Visual Studio aplinkose 🚀

Jei naudojate Visual Studio Code arba Visual Studio 2022 su GitHub Copilot, šių MCP serverių sąranka yra paprasta.

### VS Code sąranka

Pagrindinis procesas VS Code:

1. **Įgalinkite Agent režimą**: VS Code perjunkite į Agent režimą Copilot Chat lange
2. **Konfigūruokite MCP serverius**: pridėkite serverių konfigūracijas prie VS Code settings.json failo
3. **Paleiskite serverius**: spauskite „Start“ mygtuką kiekvienam norimam serveriui
4. **Pasirinkite priemones**: pasirinkite MCP serverius, kuriuos norite naudoti dabartinėje sesijoje

Išsamesnes sąrankos instrukcijas rasite [VS Code MCP dokumentacijoje](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 Profesionalus patarimas: valdykite MCP serverius kaip profesionalas!**
> 
> VS Code Extensions peržiūroje dabar yra [patogi nauja vartotojo sąsaja MCP serverių valdymui](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! Turite greitą prieigą paleisti, sustabdyti ir valdyti bet kuriuos įdiegtus MCP serverius aiškia ir paprasta sąsaja. Išbandykite!

### Visual Studio 2022 sąranka

Visual Studio 2022 (versija 17.14 arba naujesnė):

1. **Įgalinkite Agent režimą**: spauskite „Ask“ išskleidžiamąjį meniu GitHub Copilot Chat lange ir pasirinkite „Agent“
2. **Sukurkite konfigūracijos failą**: sukurkite `.mcp.json` failą savo sprendinio direktorijoje (rekomenduojama vieta: `<SOLUTIONDIR>\.mcp.json`)
3. **Konfigūruokite serverius**: pridėkite MCP serverių konfigūracijas naudodami standartinį MCP formatą
4. **Sutikimas naudoti priemones**: kai bus prašoma, patvirtinkite priemones su tinkamomis prieigos teisėmis

Išsamias Visual Studio sąrankos instrukcijas rasite [Visual Studio MCP dokumentacijoje](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

Kiekvienam MCP serveriui reikia specifinių konfigūracijos parametrų (prisijungimo eilutės, autentifikavimas ir kt.), tačiau nustatymo principas yra panašus abiejose IDE.

## Pamokos iš Microsoft MCP serverių 🛠️

### 1. 📚 Microsoft Learn Docs MCP serveris

[![Įdiegti VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Įdiegti VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Ką daro**: Microsoft Learn Docs MCP serveris yra debesyje veikianti paslauga, kuri suteikia AI asistentams tiesioginę prieigą prie oficialios Microsoft dokumentacijos per Model Context Protocol. Jis jungiasi prie `https://learn.microsoft.com/api/mcp` ir leidžia semantinę paiešką tarp Microsoft Learn, Azure dokumentacijos, Microsoft 365 dokumentacijos ir kitų oficialių Microsoft šaltinių.

**Kodėl tai naudinga**: Nors gali pasirodyti, kad tai „tik dokumentacija“, šis serveris iš tiesų yra svarbus kiekvienam Microsoft technologijų naudotojui. Viena didžiausių .NET kūrėjų nusiskundimų apie AI kodo asistentus yra, kad jie nėra nuolat atnaujinami apie naujausias .NET ir C# versijas. Microsoft Learn Docs MCP serveris išsprendžia šią problemą, suteikdamas realaus laiko prieigą prie pačios naujausios dokumentacijos, API nuorodų ir geriausių praktikų. Nesvarbu ar dirbate su naujausiais Azure SDK, tyrinėjate naujas C# 13 funkcijas, ar įgyvendinate pažangius .NET Aspire šablonus, šis serveris užtikrina, kad jūsų AI padėjėjas turi prieigą prie autoritetingos ir atnaujintos informacijos, reikalingos tiksliai ir moderniai kodo generacijai.

**Realaus panaudojimo atvejis**: „Kokios yra az cli komandos Azure konteinerių programos sukūrimui pagal oficialią Microsoft Learn dokumentaciją?“ arba „Kaip konfigūruoti Entity Framework su priklausomybių injekcija ASP.NET Core?“ Arba „Peržiūrėk šį kodą, kad įsitikintum, jog jis atitinka Microsoft Learn dokumentacijoje pateiktas našumo rekomendacijas.“ Serveris suteikia išsamų aprėptį tarp Microsoft Learn, Azure ir Microsoft 365 dokumentacijos naudodamas pažangią semantinę paiešką, ieškodamas kontekstui aktualiausios informacijos. Grąžina iki 10 aukštos kokybės turinio dalių su straipsnių pavadinimais ir URL, visada pasiekiant naujausią dokumentaciją, kai ji išleidžiama.

**Pavyzdys**: Serveris atskleidžia įrankį `microsoft_docs_search`, kuris atlieka semantinę paiešką Microsoft oficialioje techninėje dokumentacijoje. Vieną kartą sukonfigūravus, galite klausti klausimų, pvz., „Kaip implementuoti JWT autentifikaciją ASP.NET Core?“ ir gauti detalius, oficialius atsakymus su šaltinių nuorodomis. Paieškos kokybė ypatinga, nes ji supranta kontekstą – klausimas apie „konteinerius“ Azure kontekste grąžins Azure Container Instances dokumentaciją, o tas pats terminas .NET kontekste grąžins atitinkamą C# kolekcijų informaciją.

Tai ypač naudinga sparčiai kintančioms ar neseniai atnaujintoms bibliotekoms ir naudojimo atvejams. Pavyzdžiui, neseniai programavimo projektuose norėjau panaudoti funkcijas iš naujausių .NET Aspire ir Microsoft.Extensions.AI versijų. Įtraukęs Microsoft Learn Docs MCP serverį galėjau pasinaudoti ne tik API dokumentais, bet ir vedliais bei gairėmis, kurios ką tik buvo paskelbtos.

> **💡 Profesionalus patarimas**
> 
> Net ir modeliui, draugiškam įrankiams, reikia paskatų naudoti MCP įrankius! Apsvarstykite galimybę pridėti sisteminį promptą arba [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot), pvz.: „Jūs turite prieigą prie `microsoft.docs.mcp` – naudokite šį įrankį ieškodami naujausios oficialios Microsoft dokumentacijos klausimams apie Microsoft technologijas, kaip C#, Azure, ASP.NET Core ar Entity Framework aptarti.“
>
> Puikų šio metodo pavyzdį rasite [C# .NET Janitor pokalbio režime](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md) Awesome GitHub Copilot saugykloje. Šis režimas specialiai naudoja Microsoft Learn Docs MCP serverį, kad padėtų sutvarkyti ir modernizuoti C# kodą pagal naujausius šablonus ir geriausias praktikas.
### 2. ☁️ Azure MCP serveris
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Ką jis daro**: Azure MCP Server yra išsami daugiau nei 15 specializuotų Azure paslaugų jungčių kolekcija, kuri įtraukia visą Azure ekosistemą į jūsų DI darbo eigą. Tai nėra paprastas serveris – tai galinga kolekcija, apimanti išteklių valdymą, duomenų bazės prijungimą (PostgreSQL, SQL Server), Azure Monitor žurnalų analizę su KQL, Cosmos DB integraciją ir dar daugiau.

**Kodėl tai naudinga**: Be to, kad valdo Azure išteklius, šis serveris žymiai pagerina kodo kokybę dirbant su Azure SDK. Kai naudojate Azure MCP Agent režimu, jis ne tik padeda jums rašyti kodą – jis padeda rašyti *geresnį* Azure kodą, atitinkantį dabartinius autentifikacijos modelius, klaidų tvarkymo gerąsias praktikas ir išnaudojantį naujausias SDK funkcijas. Vietoje bendro kodo, kuris galbūt veikia, gaunate kodą, kuris laikosi Azure rekomenduojamų gamybinių darbo krūvių modelių.

**Pagrindiniai moduliai apima**:
- **🗄️ Duomenų bazės jungtys**: Tiesioginis natūralios kalbos prieigos prie Azure Database for PostgreSQL ir SQL Server
- **📊 Azure Monitor**: Žurnalų analizė ir operacinės įžvalgos su KQL
- **🌐 Išteklių valdymas**: Pilnas Azure išteklių gyvavimo ciklo valdymas
- **🔐 Autentifikacija**: DefaultAzureCredential ir valdomos tapatybės modeliai
- **📦 Saugyklų paslaugos**: Blob Storage, Queue Storage ir Table Storage operacijos
- **🚀 Konteinerių paslaugos**: Azure Container Apps, Container Instances ir AKS valdymas
- **Ir daug daugiau specializuotų jungčių**

**Realiame gyvenime**: "Surašyk mano Azure saugojimo paskyras", "Ieškok mano Log Analytics darbo vietoje klaidų per paskutinę valandą" arba "Padėk man sukurti Azure programą naudojant Node.js su tinkama autentifikacija"

**Pilnas demonstracinis scenarijus**: Čia yra pilnas vedlys, kuris parodo, kaip gali veikti Azure MCP kartu su GitHub Copilot for Azure plėtiniu VS Code. Kai abu yra įdiegti ir įvesite:

> "Sukurk Python skriptą, kuris įkelia failą į Azure Blob Storage naudojant DefaultAzureCredential autentifikaciją. Skriptas turi prisijungti prie mano Azure saugojimo paskyros pavadinimu 'mycompanystorage', įkelti į konteinerį pavadinimu 'documents', sukurti testinį failą su dabartiniu laiko žymekliu įkėlimui, tvarkyti klaidas sklandžiai ir pateikti informatyvią išvestį, laikytis Azure geriausių praktikų autentifikacijoje ir klaidų valdyme, įtraukti komentarus paaiškinančius DefaultAzureCredential autentifikacijos veikimą ir padaryti skriptą gerai struktūruotą su tinkamomis funkcijomis ir dokumentacija."

Azure MCP Server sugeneruos pilną, gamybinės kokybės Python skriptą, kuris:
- Naudoja naujausią Azure Blob Storage SDK su tinkamais asinchroniniais modeliais
- Įgyvendina DefaultAzureCredential su išsamiu nukrypimų grandinės paaiškinimu
- Apima patikimą klaidų tvarkymą su specifiniais Azure išimtimių tipais
- Laikosi Azure SDK geriausių praktikų išteklių valdyme ir ryšio tvarkyme
- Teikia detalią žurnalo informaciją ir informatyvią konsolės išvestį
- Sukuria tinkamai struktūruotą skriptą su funkcijomis, dokumentacija ir tipų patarimais

Tai išskirtina tuo, kad be Azure MCP jūs galėtumėte gauti bendrą blob saugyklos kodą, kuris veikia, bet nesilaiko dabartinių Azure modelių. Su Azure MCP gaunate kodą, kuris naudoja naujausius autentifikacijos metodus, tvarko Azure specifines klaidų situacijas ir laikosi Microsoft rekomenduojamų gamybinių programų praktikų.

**Pavyzdys**: Man sunku prisiminti konkrečias `az` ir `azd` CLI komandas ad hoc naudojimui. Visada tai yra dviejų žingsnių procesas: pirmiausia pažiūrėti sintaksę, paskui paleisti komandą. Dažnai įeinu į portalą ir rankiniu būdu spusteliu, kad atlikčiau darbą, nes nenoriu prisipažinti, kad negaliu atsiminti CLI sintaksės. Galimybė tiesiog aprašyti, ko noriu, yra nuostabi, o dar geriau tai padaryti neišeinant iš IDE!

[Azure MCP saugykloje](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server) yra puikus naudojimo atvejų sąrašas, kuris padės pradėti. Išsamios diegimo instrukcijos ir pažangios konfigūracijos parinktys yra oficialioje [Azure MCP dokumentacijoje](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**Ką jis daro**: Oficiali GitHub MCP Server integracija užtikrina sklandų visos GitHub ekosistemos įtraukimą, siūlydama tiek nuotolinio prieglobos, tiek vietinio Docker diegimo galimybes. Tai ne tik pagrindinės saugyklų operacijos – tai visa įrankių rinkinys, įtraukiantis GitHub Actions valdymą, pull request darbo eigas, problemų sekimą, saugumo skenavimą, pranešimus ir pažangias automatizavimo funkcijas.

**Kodėl tai naudinga**: Šis serveris keičia jūsų sąveiką su GitHub, atnešdamas visą platformos patirtį tiesiai į jūsų kūrimo aplinką. Vietoje nuolatinio perjungimo tarp VS Code ir GitHub.com projektų valdymui, kodo peržiūroms ir CI/CD stebėjimui, galite viską valdyti naudodami natūralių kalbos komandų pagalbą, išlikdami susitelkę į kodą.

> **ℹ️ Pastaba: Skirtingi 'Agentų' tipai**
> 
> Nesupainiokite šio GitHub MCP Server su GitHub Coding Agent (AI agentu, kuriam galite priskirti problemų automatizuotiems kodavimo užduotims). GitHub MCP Server veikia VS Code Agent režime, užtikrindamas GitHub API integraciją, o GitHub Coding Agent yra atskira funkcija, kuri kuria pull request'us, kai priskiriama prie GitHub problemų.

**Pagrindinės galimybės**:
- **⚙️ GitHub Actions**: Viso CI/CD proceso valdymas, darbo eigų stebėjimas ir artefaktų tvarkymas
- **🔀 Pull request'ai**: Kurkite, peržiūrėkite, sujunkite ir valdykite PR su išsamia būsenos informacija
- **🐛 Problemos**: Pilnas problemų gyvavimo ciklas, komentarai, žymėjimas ir priskyrimas
- **🔒 Saugumas**: Kodo skanavimo įspėjimai, slaptumo aptikimas ir Dependabot integracija
- **🔔 Pranešimai**: Išmanus pranešimų valdymas ir saugyklų prenumeratos kontrolė
- **📁 Saugyklų valdymas**: Failų operacijos, šakų valdymas ir saugyklos administravimas
- **👥 Bendradarbiavimas**: Vartotojų ir organizacijų paieška, komandų valdymas ir prieigos kontrolė

**Realiame gyvenime**: "Sukurk pull request iš mano funkcijų šakos", "Rodyk visas šią savaitę nesėkmingas CI paleidimo atvejus", "Surašyk atvirus saugumo įspėjimus mano saugyklose" arba "Rask visas man priskirtas problemas mano organizacijose"

**Pilnas demonstracinis scenarijus**: Čia yra galinga darbo eiga, kuri parodo GitHub MCP Server galimybes:

> "Turiu pasiruošti mūsų sprinto peržiūrai. Rodyk visas šią savaitę sukurtas pull request'us, patikrink mūsų CI/CD procesų būseną, sukurk santrauką apie saugumo įspėjimus, kuriuos turime spręsti, ir padėk man sukurti išleidimo pastabas remiantis sujungtais 'feature' žyma pažymėtais PR."

GitHub MCP Server atliks:
- Užklausą apie jūsų neseniai sukurtus pull request'us su detalia būsena
- Analizuos darbo eigų paleidimus ir išskirs bet kokias klaidas ar veiklos problemas
- Sujungs saugumo skanavimo rezultatus ir iškels svarbiausius įspėjimus
- Parengs išsamias išleidimo pastabas ištraukiant informaciją iš sujungtų PR
- Pateiks veiksmus tolesniam sprinto planavimui ir išleidimo pasiruošimui

**Pavyzdys**: Mėgstu naudoti šį įrankį kodo peržiūrų darbo eigoms. Vietoje šokinėjimo tarp VS Code, GitHub pranešimų ir pull request puslapių, galiu pasakyti "Rodyk man visus PR, laukiančius mano peržiūros", o paskui "Pridėk komentarą prie PR #123 klausdama apie klaidų tvarkymą autentifikacijos metode." Serveris tvarko GitHub API iškvietimus, palaiko diskusijos kontekstą ir net padeda man sukurti konstruktyvesnius peržiūros komentarus.

**Autentifikacijos parinktys**: Serveris palaiko tiek OAuth (sklandžiai ir VS Code), tiek asmeninius prieigos raktus, su konfigūruojamais įrankių komplektais, leidžiančiais įjungti tik reikiamas GitHub funkcijas. Jį galima paleisti kaip nuotolinę paslaugą greitam diegimui arba vietoje naudojant Docker, kad turėtumėte visišką kontrolę.

> **💡 Profesionalus patarimas**
> 
> Įjunkite tik reikiamus įrankių komplektus, konfigūruodami `--toolsets` parametrą savo MCP serverio nustatymuose, kad sumažintumėte konteksto dydį ir pagerintumėte DI įrankių pasirinkimą. Pavyzdžiui, pridėkite `"--toolsets", "repos,issues,pull_requests,actions"` savo MCP konfigūracijos argumentuose pagrindinėms kūrimo veikloms arba naudokite `"--toolsets", "notifications, security"`, jei daugiausia norite GitHub stebėjimo galimybių.

### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**Ką jis daro**: Jis jungiasi prie Azure DevOps paslaugų, kad užtikrintų išsamų projektų valdymą, darbo elementų sekimą, kūrimo procesų valdymą ir saugyklų operacijas.

**Kodėl tai naudinga**: Komandoms, kurios naudoja Azure DevOps kaip pagrindinę DevOps platformą, šis MCP serveris panaikina nuolatinį perjungimą tarp kūrimo aplinkos ir Azure DevOps interneto sąsajos. Galite valdyti darbo elementus, tikrinti kūrimo būsenas, užklausti saugyklas ir vykdyti projektų valdymo užduotis tiesiogiai iš savo DI asistento.

**Realiame gyvenime**: "Rodyk man visus aktyvius darbo elementus dabartiniame sprinto cikle WebApp projektui", "Sukurk klaidos ataskaitą dėl ką tik rastos prisijungimo problemos" arba "Patikrink mūsų kūrimo ciklų būseną ir parodyk neseniai įvykusias klaidas"

**Pavyzdys**: Lengvai galite patikrinti savo komandos dabartinio sprinto būseną su paprasta užklausa, kaip "Rodyk man visus aktyvius darbo elementus dabartiniame sprinto cikle WebApp projektui" arba "Sukurk klaidos ataskaitą dėl ką tik rastos prisijungimo problemos" neišeidami iš kūrimo aplinkos.

### 5. 📝 MarkItDown MCP Server
[![Įdiegti VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Įdiegti VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**Ką jis daro**: MarkItDown yra išsamus dokumentų konvertavimo serveris, kuris transformuoja įvairius failų formatus į aukštos kokybės Markdown, optimizuotą LLM apdorojimui ir teksto analizės srautams.

**Kodėl tai naudinga**: Neatsiejama šiuolaikinių dokumentacijos srautų dalis! MarkItDown palaiko įspūdingą failų formatų įvairovę, išlaikydamas svarbią dokumento struktūrą, tokią kaip antraštės, sąrašai, lentelės ir nuorodos. Skirtingai nuo paprastų teksto ištraukimo įrankių, jis orientuojasi į semantinės reikšmės ir formatavimo išsaugojimą, kuris naudingas tiek AI apdorojimui, tiek žmogaus skaitomumui.

**Palaikomi failų formatai**:
- **Office dokumentai**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **Medijos failai**: Nuotraukos (su EXIF metaduomenimis ir OCR), garsas (su EXIF metaduomenimis ir balso transkripcija)
- **Interneto turinys**: HTML, RSS srautai, YouTube URL, Wikipedia puslapiai
- **Duomenų formatai**: CSV, JSON, XML, ZIP failai (rekursyviai apdoroja turinį)
- **Leidybos formatai**: EPub, Jupyter užrašų knygelės (.ipynb)
- **El. paštas**: Outlook žinutės (.msg)
- **Išplėstinė**: Azure Document Intelligence integracija pažangiam PDF apdorojimui

**Išplėstinės galimybės**: MarkItDown palaiko LLM pagrįstas vaizdų aprašymus (kai suteikiamas OpenAI klientas), Azure Document Intelligence pažangiam PDF apdorojimui, garso transkripciją kalbos turiniui ir papildinių sistemą papildomiems failų formatams išplėsti.

**Realaus pasaulio panaudojimas**: „Konvertuokite šią PowerPoint prezentaciją į Markdown mūsų dokumentacijos svetainei“, „Ištraukite tekstą iš šio PDF su tinkama antraščių struktūra“ arba „Transformuokite šią Excel lentelę į skaitomą lentelės formatą“.

**Pavyzdys**: Cituojant [MarkItDown dokumentaciją](https://github.com/microsoft/markitdown#why-markdown):

> Markdown yra itin artimas paprastam tekstui, su minimaliu žymėjimu ar formatavimu, bet vis tiek suteikia būdą atvaizduoti svarbią dokumento struktūrą. Pagrindiniai LLM, tokie kaip OpenAI GPT-4o, natūraliai „kalba“ Markdown kalba ir dažnai nepageidaujamai įtraukia Markdown į savo atsakymus. Tai rodo, kad jie buvo apmokyti su didžiuliais kiekiais Markdown suformatuoto teksto ir jį gerai supranta. Papildomas privalumas – Markdown konvencijos taip pat yra labai efektyvios žetonų prasme.

MarkItDown puikiai išlaiko dokumento struktūrą, kas labai svarbu AI srautams. Pavyzdžiui, konvertuojant PowerPoint prezentaciją, jis išsaugo skaidrių organizavimą su tinkamomis antraštėmis, ištraukia lenteles kaip Markdown lenteles, įtraukia alternatyvų tekstą vaizdams ir net apdoroja pranešėjo pastabas. Diagramas paverčia skaitomomis duomenų lentelėmis, o galutinis Markdown išlaiko originalios prezentacijos loginę seką. Tai puikiai tinka pristatymo turinio tiekimui į AI sistemas ar dokumentacijos kūrimui iš esamų skaidrių.

### 6. 🗃️ SQL Server MCP Server

[![Įdiegti VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Įdiegti VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Ką jis daro**: Teikia pokalbių sąsają į SQL Server duomenų bazes (vietines, Azure SQL arba Fabric)

**Kodėl tai naudinga**: Panašus į PostgreSQL serverį, bet skirtas Microsoft SQL ekosistemai. Prisijunkite naudodami paprastą ryšio eilutę ir pradėkite užklausas natūralia kalba – jokio konteksto perjungimo!

**Realaus pasaulio panaudojimas**: „Rasti visus užsakymus, kurie per paskutines 30 dienų nebuvo įvykdyti“ yra verčiama į tinkamas SQL užklausas ir grąžina suformatuotus rezultatus.

**Pavyzdys**: Prijungus duomenų bazę, galite iš karto pradėti pokalbius su savo duomenimis. Tinklaraščio įraše tai demonstruojama paprastu klausimu: „Prie kokios duomenų bazės esate prijungti?“ MCP serveris atsako iškviesdamas atitinkamą duomenų bazės įrankį, prisijungdamas prie jūsų SQL Server instancijos ir grąžindamas duomenis apie dabartinį jungties statusą – visa tai be jokio SQL rašymo. Serveris palaiko išsamias duomenų bazės operacijas nuo schemų valdymo iki duomenų manipuliacijos, visas per natūralios kalbos užklausas. Išsamias diegimo instrukcijas ir konfigūracijos pavyzdžius su VS Code ir Claude Desktop rasite: [Introducing MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).

### 7. 🎭 Playwright MCP Server

[![Įdiegti VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Įdiegti VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**Ką jis daro**: Leidžia AI agentams sąveikauti su tinklalapiais testavimo ir automatizavimo tikslams

> **ℹ️ Maitina GitHub Copilot**
> 
> Playwright MCP Server valdo GitHub Copilot programavimo agentą, suteikdamas jam žiniatinklio naršyklės galimybes! [Sužinokite daugiau apie šią funkciją](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**Kodėl tai naudinga**: Puikiai tinka automatiniam testavimui, pagrįstam natūralios kalbos aprašymais. AI gali naršyti tinklalapius, pildyti formas ir išgauti duomenis per struktūrizuotus prieinamumo momentinius vaizdus – tai nepaprastai galinga!

**Realaus pasaulio panaudojimas**: „Ištestuoti prisijungimo eigą ir patikrinti, ar teisingai įkėlė informacijos suvestinė“ arba „Sugeneruoti testą, kuris ieškotų produktų ir patvirtintų rezultatų puslapį“ – visa tai be poreikio turėti programos šaltinio kodą.

**Pavyzdys**: Mano komandos narė Debbie O’Brien neseniai nuostabiai dirbo su Playwright MCP Server! Pavyzdžiui, ji parodė, kaip galima sugeneruoti pilnus Playwright testus net neturint prieigos prie programos šaltinio kodo. Jos scenarijuje ji paprašė Copilot sukurti testą filmų paieškos programėlei: nueiti į svetainę, ieškoti „Garfield“ ir patikrinti, ar filmas atsiranda rezultatuose. MCP pradėjo naršyklės sesiją, naršė puslapio struktūrą naudodamas DOM momentinius vaizdus, surado tinkamus selektorius ir sugeneravo pilnai veikiančią TypeScript testą, kuris sėkmingai praėjo iškart.

Tai labai galinga, nes sujungia natūralios kalbos instrukcijas su vykdomu testų kodu. Tradiciniai metodai reikalauja rankinio testų rašymo ar prieigos prie kodo bazės kontekstui. Su Playwright MCP galite testuoti išorines svetaines, kliento programas arba dirbti juodos dėžės testavimo scenarijose, kur kodo prieiga nėra prieinama.

### 8. 💻 Dev Box MCP Server

[![Įdiegti VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Įdiegti VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Ką jis daro**: Valdo Microsoft Dev Box aplinkas natūralia kalba

**Kodėl tai naudinga**: Labai supaprastina kūrimo aplinkų valdymą! Kurkite, konfigūruokite ir valdykite kūrimo aplinkas be būtinybės atsiminti konkrečias komandas.

**Realaus pasaulio panaudojimas**: „Sukurk naują Dev Box su naujausiu .NET SDK ir sukonfigūruok jį mūsų projektui“, „Patikrink visų mano kūrimo aplinkų būseną“ arba „Sukurk standartizuotą demo aplinką mūsų komandos pristatymams“.

**Pavyzdys**: Esu didelis Dev Box asmeninio kūrimo gerbėjas. Šviesos blyksnis man buvo, kai James Montemagno paaiškino, kaip puikiai Dev Box tinka konferencijų demonstracijoms, nes jis turi ypatingai greitą Ethernet jungtį, nepriklausomai nuo konferencijos, viešbučio ar lėktuvo WiFi, kurį tuo metu naudoju. Iš tiesų, neseniai dariau konferencijos demonstracijos praktiką, kol mano nešiojamas kompiuteris buvo prijungtas prie telefono interneto taško važiuojant autobusu iš Briugės į Antverpeną! Kitas mano žingsnis – gilintis į komandos valdymą daugeliui kūrimo aplinkų ir standartizuotų demo aplinkų kūrimą. Taip pat didelis naudojimo atvejis, kurio girdėjau iš klientų ir kolegų, yra Dev Box naudojimas iš anksto sukonfigūruotoms kūrimo aplinkoms. Abu atvejai leidžia per MCP konfigūruoti ir valdyti Dev Box naudojant natūralios kalbos sąveiką, išlikdami pačioje kūrimo aplinkoje.

### 9. 🤖 Microsoft Foundry MCP Server
[![Įdiegti VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Įdiegti VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**Ką jis daro**: Microsoft Foundry MCP Server suteikia kūrėjams visapusišką prieigą prie Azure DI ekosistemos, įtraukiant modelių katalogus, diegimo valdymą, žinių indeksavimą su Azure AI Search ir vertinimo įrankius. Šis eksperimentinis serveris sujungia DI kūrimą su Azure galinga DI infrastruktūra, palengvindamas DI programų kūrimą, diegimą ir vertinimą.

**Kodėl tai naudinga**: Šis serveris keičia jūsų darbą su Azure DI paslaugomis, pateikdamas įmonės lygio DI galimybes tiesiogiai į jūsų kūrimo darbo eigą. Vietoj perjunginėjimo tarp Azure portalo, dokumentacijos ir jūsų IDE, galite atrasti modelius, diegti paslaugas, valdyti žinių bazes ir vertinti DI veikimą naudodami natūralios kalbos komandas. Tai ypač naudinga kūrėjams, kurie kuria RAG (Retrieval-Augmented Generation) programas, valdo daugialypius modelių diegimus arba įgyvendina visapusiškus DI vertinimo procesus.

**Pagrindinės kūrėjo galimybės**:
- **🔍 Modelių atranka ir diegimas**: Naršykite Microsoft Foundry modelių katalogą, gaukite išsamią modelio informaciją su kodo pavyzdžiais ir diegkite modelius į Azure DI paslaugas
- **📚 Žinių valdymas**: Kurkite ir valdykite Azure AI Search indeksus, pridėkite dokumentus, konfigūruokite indeksuotojus ir kurkite pažangias RAG sistemas
- **⚡ DI agentų integracija**: Prisijunkite prie Azure DI agentų, užduokite klausimus esamiems agentams ir vertinkite agentų veikimą gamybos scenarijuose
- **📊 Vertinimo sistema**: Vykdykite išsamų teksto ir agentų vertinimą, generuokite markdown ataskaitas ir įgyvendinkite kokybės užtikrinimą DI programoms
- **🚀 Prototipų įrankiai**: Gaukite nustatymo instrukcijas GitHub pagrindu kuriamiems prototipams ir prieigą prie Microsoft Foundry Labs pažangiems tyrimų modeliams

**Tikrasis kūrėjo panaudojimas**: „Diegti Phi-4 modelį į Azure DI paslaugas mano programai“, „Sukurti naują paieškos indeksą mano dokumentacijos RAG sistemai“, „Įvertinti mano agente pateiktus atsakymus pagal kokybės rodiklius“ arba „Rasti geriausią sprendimų modelį mano sudėtingoms analizės užduotims“

**Pilnas demonstracinis scenarijus**: Štai galinga DI kūrimo darbo eiga:

> „Aš kuriu klientų aptarnavimo agentą. Padėkite rasti gerą sprendimų modelį iš katalogo, jį įdiegti Azure DI paslaugose, sukurti žinių bazę iš mūsų dokumentacijos, sukonfigūruoti vertinimo sistemą atsakymų kokybės tikrinimui, o tada padėti sukurti integracijos prototipą su GitHub žetonu testavimui.“

Microsoft Foundry MCP Server:
- Nustatys modelių katalogą ir rekomenduos geriausius sprendimų modelius pagal jūsų reikalavimus
- Pateiks diegimo komandas ir kvotų informaciją jūsų pageidaujamam Azure regionui
- Sukurs Azure AI Search indeksus su tinkamu schemos aprašymu jūsų dokumentacijai
- Sukonfiguruos vertinimo procesus su kokybės rodikliais ir saugumo patikrinimais
- Generuos prototipinio kodo fragmentus su GitHub autentifikacija skubiam testavimui
- Suteiks išsamius nustatymo gaires, pritaikytas jūsų specifiniam technologiniam rinkiniui

**Parodytas pavyzdys**: Kaip kūrėjas, ilgai nervinausi, kad negaliu suspėti su įvairiais LLM modeliais. Žinau kelis pagrindinius, bet jaučiau, kad praleidžiu produktyvumo ir efektyvumo galimybes. Žetonai ir kvotos man kelia stresą ir sunkiai valdomi – nežinau, ar pasirinkau tinkamą modelį konkrečiai užduočiai arba ar nešvaistau biudžeto neefektyviai. Neseniai išgirdau apie šį MCP serverį iš James Montemagno, kalbėdamasis su komandos nariais apie MCP serverių rekomendacijas šiam įrašui ir labai norėjau jį išbandyti! Modelių atrankos galimybės atrodo ypač įspūdingos man – žmogui, kuris nori tyrinėti daugiau nei įprastus variantus ir rasti specializuotus modelius konkrečioms užduotims. Vertinimo sistema turėtų padėti įsitikinti, kad iš tikrųjų gaunu geresnius rezultatus, o ne tiesiog kažką naujo bandom dėl naujumo.

> **ℹ️ Eksperimentinis statusas**
> 
> Šis MCP serveris yra eksperimentinis ir intensyviai kuriamas. Funkcijos ir API gali keistis. Puikus tyrinėjant Azure DI galimybes ir kuriant prototipus, bet gamybinėms reikmėms reikia įvertinti stabilumo reikalavimus.
### 10. 🏢 Microsoft 365 Agentų įrankių rinkinys MCP Serveris

[![Įdiegti VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Įdiegti VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**Ką jis daro**: Suteikia kūrėjams būtinus įrankius kuriant DI agentus ir programas, integruojamas su Microsoft 365 ir Microsoft 365 Copilot, įskaitant schemų patvirtinimą, pavyzdinių kodo fragmentų gavimą ir trikčių diagnostiką.

**Kodėl tai naudinga**: Kuriant Microsoft 365 ir Copilot reikia sudėtingų manifesto schemų ir specifinių kūrimo modelių. Šis MCP serveris pateikia būtinus kūrimo išteklius tiesiai į jūsų kodavimo aplinką, padėdamas patvirtinti schemas, rasti pavyzdinį kodą ir spręsti dažnas problemas be nuolatinio dokumentacijos tikrinimo.

**Tikrasis panaudojimas**: „Patvirtink mano deklaratyvaus agento manifestą ir ištaisyk schemos klaidas“, „Pateik pavyzdinį kodą Microsoft Graph API įskiepiui“, arba „Padėk išspręsti mano Teams programos autentifikacijos problemas“

**Parodytas pavyzdys**: Po pokalbio su draugu John Miller, kai kalbėjomės apie M365 agentus Build renginyje, jis rekomendavo šį MCP. Tai puiku naujiems M365 agentų kūrėjams, nes pateikia šablonus, pavyzdinį kodą ir karkasą pradžiai be dokumentacijos gausos. Schemų patvirtinimo funkcijos atrodo ypač naudingos, kad būtų išvengta manifesto struktūros klaidų, kurios gali sukelti valandų trukmės derinimą.

> **💡 Patarimas**
> 
> Naudokite šį serverį kartu su Microsoft Learn Docs MCP Serveriu, kad gautumėte visapusišką M365 kūrimo palaikymą – vienas suteikia oficialią dokumentaciją, o kitas – praktinius kūrimo įrankius ir trikčių diagnostiką.


## Kas toliau? 🔮

## 📋 Išvados

Model Context Protocol (MCP) keičia kūrėjų sąveiką su DI asistentais ir išoriniais įrankiais. Šie 10 Microsoft MCP serverių parodo standartizuotos DI integracijos galingumą, leidžiantį sklandžiai dirbti ir išlaikyti kūrėjų produktyvumo srautą, tuo pačiu pasiekiant galingas išorines galimybes.

Nuo plataus Azure ekosistemos integracijos iki specializuotų įrankių, tokių kaip Playwright naršyklių automatizavimui ir MarkItDown dokumentų apdorojimui, šie serveriai demonstruoja, kaip MCP gali padidinti produktyvumą įvairiose kūrimo situacijose. Standartizuotas protokolas užtikrina, kad šie įrankiai veiktų kartu sklandžiai, sukuriant vientisą kūrėjo patirtį.

MCP ekosistemos toliau vystantis, svarbu palaikyti ryšį su bendruomene, tyrinėti naujus serverius ir kurti pritaikytus sprendimus, kad maksimaliai padidintumėte kūrimo produktyvumą. Atviras MCP standarto pobūdis leidžia derinti įrankius iš skirtingų tiekėjų ir kurti idealią darbo eigą pagal jūsų specifinius poreikius.

## 🔗 Papildomi ištekliai

- [Oficialus Microsoft MCP repozitorijus](https://github.com/microsoft/mcp)
- [MCP bendruomenė ir dokumentacija](https://modelcontextprotocol.io/introduction)
- [VS Code MCP dokumentacija](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP dokumentacija](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP dokumentacija](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP renginiai](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot modifikacijos](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days Live liepos 29-30 d. arba žiūrėti įrašą](https://aka.ms/mcpdevdays)

## 🎯 Pratimai

1. **Įdiegimas ir konfigūravimas**: Įdiekite vieną MCP serverį savo VS Code aplinkoje ir patikrinkite pagrindines funkcijas.
2. **Darbo eigos integracija**: Sukurkite kūrimo darbo eigą, apjungiančią bent tris skirtingus MCP serverius.
3. **Vartotojiško serverio planavimas**: Nustatykite užduotį savo kasdienėje kūrimo praktikoje, kuriai būtų naudinga vartotojiško MCP serverio kūrimas, ir paruoškite jos specifikaciją.
4. **Veikimo analizė**: Palyginkite MCP serverių naudojimo efektyvumą su tradiciniais metodais dažnėse kūrimo užduotyse.
5. **Saugumo vertinimas**: Įvertinkite MCP serverių naudojimo saugumo aspektus savo kūrimo aplinkoje ir pasiūlykite geriausias praktikas.


Kitas:[Gerųjų praktikų vadovas](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->