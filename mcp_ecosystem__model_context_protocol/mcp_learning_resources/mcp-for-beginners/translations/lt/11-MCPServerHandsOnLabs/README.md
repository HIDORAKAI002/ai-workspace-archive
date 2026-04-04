# 🚀 MCP serveris su PostgreSQL – Išsamus mokymosi gidas

## 🧠 MCP duomenų bazės integracijos mokymosi kelio apžvalga

Šis išsamus mokymosi gidas moko, kaip kurti gamybai paruoštus **Model Context Protocol (MCP) serverius**, integruotus su duomenų bazėmis, remiantis praktiniu mažmeninės prekybos analitikos pavyzdžiu. Išmoksite įmonių lygio modelių, įskaitant **eilutės lygio saugumą (Row Level Security, RLS)**, **semantinę paiešką**, **Azure AI integraciją** ir **daugiamačio duomenų prieigą**.

Nesvarbu, ar esate backend programuotojas, AI inžinierius ar duomenų architektas, šis gidas suteikia struktūruotą mokymą su realių pasaulio pavyzdžiais ir praktinėmis užduotimis, kurios veda per šį MCP serverį https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Oficialūs MCP šaltiniai

- 📘 [MCP dokumentacija](https://modelcontextprotocol.io/) – Išsamūs vadovai ir naudotojų gidas
- 📜 [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Protokolo architektūra ir techniniai aprašymai
- 🧑‍💻 [MCP GitHub saugykla](https://github.com/modelcontextprotocol) – Atvirojo kodo SDK, įrankiai ir pavyzdžių kodas
- 🌐 [MCP bendruomenė](https://github.com/orgs/modelcontextprotocol/discussions) – Prisijunkite prie diskusijų ir bendruomenės
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Saugumo geriausios praktikos ir rizikų mažinimas

## 🧭 MCP duomenų bazės integracijos mokymosi kelias

### 📚 Pilnas mokymosi struktūros planas https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Laboratorija | Tema | Aprašymas | Nuoroda |
|--------|-------|-------------|------|
| **Laboratorijos 1-3: Pagrindai** | | | |
| 00 | [Įvadas į MCP duomenų bazės integraciją](./00-Introduction/README.md) | MCP su duomenų baze integracijos ir mažmeninės prekybos analizės apžvalga | [Pradėti čia](./00-Introduction/README.md) |
| 01 | [Pagrindinės architektūros sąvokos](./01-Architecture/README.md) | MCP serverio architektūros, duomenų bazės sluoksnių ir saugumo modelių supratimas | [Mokytis](./01-Architecture/README.md) |
| 02 | [Saugumas ir daugiamačiškumas](./02-Security/README.md) | Eilutės lygio saugumas, autentifikacija ir daugiamačio duomenų priėjimas | [Mokytis](./02-Security/README.md) |
| 03 | [Aplinkos paruošimas](./03-Setup/README.md) | Kūrimo aplinkos, Docker, Azure išteklių paruošimas | [Paruošimas](./03-Setup/README.md) |
| **Laboratorijos 4-6: MCP serverio kūrimas** | | | |
| 04 | [Duomenų bazės dizainas ir schema](./04-Database/README.md) | PostgreSQL paruošimas, mažmeninės prekybos schemos kūrimas ir pavyzdiniai duomenys | [Kurkite](./04-Database/README.md) |
| 05 | [MCP serverio įgyvendinimas](./05-MCP-Server/README.md) | FastMCP serverio kūrimas su duomenų bazės integracija | [Kurkite](./05-MCP-Server/README.md) |
| 06 | [Įrankių kūrimas](./06-Tools/README.md) | Duomenų užklausų įrankių ir schemos introspekcijos kūrimas | [Kurkite](./06-Tools/README.md) |
| **Laboratorijos 7-9: Pažangios funkcijos** | | | |
| 07 | [Semantinės paieškos integracija](./07-Semantic-Search/README.md) | Vektorių įterpimų įgyvendinimas su Azure OpenAI ir pgvector | [Pažangūs](./07-Semantic-Search/README.md) |
| 08 | [Testavimas ir derinimas](./08-Testing/README.md) | Testavimo strategijos, derinimo įrankiai ir validavimo metodai | [Testuokite](./08-Testing/README.md) |
| 09 | [VS Code integracija](./09-VS-Code/README.md) | VS Code MCP integracijos ir AI pokalbių naudojimo konfigūravimas | [Integruoti](./09-VS-Code/README.md) |
| **Laboratorijos 10-12: Gamyba ir geriausios praktikos** | | | |
| 10 | [Diegimo strategijos](./10-Deployment/README.md) | Docker diegimas, Azure konteinerių programos ir skalavimo aspektai | [Diegti](./10-Deployment/README.md) |
| 11 | [Stebėjimas ir matomumas](./11-Monitoring/README.md) | Application Insights, žurnalavimas, našumo stebėjimas | [Stebėti](./11-Monitoring/README.md) |
| 12 | [Geriausios praktikos ir optimizavimas](./12-Best-Practices/README.md) | Našumo optimizavimas, saugumo stiprinimas ir gamybos rekomendacijos | [Optimizuoti](./12-Best-Practices/README.md) |

### 💻 Ką sukursite

Baigę šį mokymosi kelią turėsite pilnai veikiančią **Zava Retail Analytics MCP serverio** versiją, kurioje yra:

- **Daugi lentelių mažmeninės prekybos duomenų bazė** su klientų užsakymais, produktais ir atsargomis
- **Eilutės lygio saugumas** duomenų izoliacijai pagal parduotuvę
- **Semantinė produktų paieška** naudojant Azure OpenAI įterpimus
- **VS Code AI pokalbių integracija** natūralių kalbų užklausoms
- **Gamybai paruoštas diegimas** su Docker ir Azure
- **Išsamus stebėjimas** su Application Insights

## 🎯 Mokymo prieš sąlygos

Norint maksimaliai išnaudoti šį mokymosi kelią, turėtumėte turėti:

- **Programavimo patirtį**: pažintis su Python (pageidautina) arba panašiomis kalbomis
- **Duomenų bazių žinias**: pagrindinis SQL ir reliacinių duomenų bazių supratimas
- **API sąvokas**: supratimą apie REST API ir HTTP koncepcijas
- **Kūrimo įrankius**: patirtį dirbant su komandine eilute, Gitu ir kodo redaktoriais
- **Debesijos pagrindus**: (nebūtina) bazinės žinios apie Azure ar panašias debesų platformas
- **Docker pažintį**: (nebūtina) supratimas apie konteinerizacijos sąvokas

### Reikalingi įrankiai

- **Docker Desktop** – PostgreSQL ir MCP serverio paleidimui
- **Azure CLI** – debesų išteklių diegimui
- **VS Code** – kūrimui ir MCP integracijai
- **Git** – versijų valdymui
- **Python 3.8+** – MCP serverio kūrimui

## 📚 Studijų vadovas ir ištekliai

Šis mokymosi kelias apima išsamius išteklius, kurie padės jums efektyviai orientuotis:

### Studijų vadovas

Kiekviena laboratorija apima:
- **Aiškius mokymosi tikslus** – ką pasieksite
- **Žingsnis po žingsnio instrukcijas** – detalius įgyvendinimo vadovus
- **Kodo pavyzdžius** – veikiančius pavyzdžius su paaiškinimais
- **Praktines užduotis** – galimybes praktiškai patikrinti žinias
- **Trikčių šalinimo gaires** – dažniausiai pasitaikančias problemas ir sprendimus
- **Papildomus išteklius** – rekomenduojamą literatūrą ir tyrinėjimą

### Prieš sąlygų patikra

Prieš pradedant kiekvieną laboratoriją rasite:
- **Būtinas žinias** – ką turėtumėte žinoti iš anksto
- **Aplinkos paruošimo patvirtinimą** – kaip patikrinti aplinką
- **Laiko įvertinimus** – numatomas užduoties atlikimo laiką
- **Mokymosi rezultatus** – ką žinosite po užduoties įvykdymo

### Rekomenduojami mokymosi keliai

Pasirinkite kelią pagal savo patirties lygį:

#### 🟢 **Pradedančiųjų kelias** (nauji MCP vartotojai)
1. Įsitikinkite, kad iš pradžių baigėte 0-10 skyrių iš [MCP pradedantiesiems](https://aka.ms/mcp-for-beginners)
2. Užbaikite laboratorijas 00-03, kad sustiprintumėte pagrindus
3. Sekite laboratorijas 04-06 praktiniam kūrimui
4. Išbandykite laboratorijas 07-09 praktiniam naudojimui

#### 🟡 **Vidutinio lygio kelias** (turintiems šiek tiek MCP patirties)
1. Peržiūrėkite laboratorijas 00-01 duomenų bazės specifinėms sąvokoms
2. Susitelkite į laboratorijas 02-06 įgyvendinimui
3. Pasinerkite į laboratorijas 07-12 pažangioms funkcijoms

#### 🔴 **Pažengusiųjų kelias** (patyrusiems MCP vartotojams)
1. Greitai peržvelkite laboratorijas 00-03 konteksto supratimui
2. Susikoncentruokite į laboratorijas 04-09 duomenų bazės integracijai
3. Skirkite dėmesį laboratorijoms 10-12 gamybos diegimui

## 🛠️ Kaip efektyviai naudoti šį mokymosi kelią

### Sekantis mokymasis (rekomenduojama)

Dirbkite laboratorijas iš eilės, kad gautumėte visapusišką supratimą:

1. **Skaitykite apžvalgą** – supraskite, ko išmoksite
2. **Patikrinkite prieš sąlygas** – įsitikinkite, kad turite reikalingas žinias
3. **Sekite žingsnis po žingsnio vadovus** – įgyvendinkite mokydamiesi
4. **Atlikite užduotis** – stiprinkite supratimą
5. **Peržiūrėkite svarbiausius dalykus** – įtvirtinkite mokymosi rezultatus

### Tikslinis mokymasis

Jei jums reikia konkrečių įgūdžių:

- **Duomenų bazės integracija**: dėmesys laboratorijoms 04-06
- **Saugumo įgyvendinimas**: dėmesys laboratorijoms 02, 08, 12
- **Dirbtinis intelektas / semantinė paieška**: gilinkitės į laboratoriją 07
- **Gamybos diegimas**: studijuokite laboratorijas 10-12

### Praktinės užduotys

Kiekviena laboratorija apima:
- **Veikiančių kodo pavyzdžių** – kopijuokite, modifikuokite ir eksperimentuokite
- **Realių pasaulio scenarijų** – praktiškos mažmeninės prekybos analizės situacijos
- **Progresuojančio sudėtingumo** – nuo paprastų iki pažangių
- **Validacijos žingsnių** – patikrinkite, ar jūsų įgyvendinimas veikia

## 🌟 Bendruomenė ir palaikymas

### Gaukite pagalbą

- **Azure AI Discord**: [Prisijunkite dėl ekspertų pagalbos](https://discord.com/invite/ByRwuEEgH4)
- **GitHub saugykla ir įgyvendinimo pavyzdys**: [Diegimo pavyzdys ir ištekliai](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **MCP bendruomenė**: [Prisijunkite prie MCP diskusijų](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Pasiruošę pradėti?

Pradėkite savo kelionę su **[Laboratorija 00: Įvadas į MCP duomenų bazės integraciją](./00-Introduction/README.md)**

---

*Išmokite kurti gamybai paruoštus MCP serverius su duomenų bazės integracija per šią išsamią, praktinę mokymosi patirtį.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės atsisakymas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, atkreipkite dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas gimtąja kalba laikomas autoritetingu šaltiniu. Kritinei informacijai rekomenduojamas profesionalus žmogaus atliktas vertimas. Mes neatsakome už bet kokius nesusipratimus ar klaidingus aiškinimus, kilusius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->