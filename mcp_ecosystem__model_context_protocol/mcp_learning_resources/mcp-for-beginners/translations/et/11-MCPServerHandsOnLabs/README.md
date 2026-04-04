# 🚀 MCP server koos PostgreSQL-iga – täielik õppematerjal

## 🧠 Ülevaade MCP andmebaasi integratsiooni õppimisteest

See põhjalik õppematerjal õpetab, kuidas ehitada tootmiskõlblikke **Model Context Protocol (MCP) servereid**, mis integreeruvad andmebaasidega praktilise jaemüügi analüüsi näite kaudu. Õpid ettevõtte tasemel mustreid, sealhulgas **reaalset juurdepääsuturvalisust (Row Level Security, RLS)**, **semantilist otsingut**, **Azure AI integratsiooni** ja **mitme rentnikuga andmete juurdepääsu**.

Oled sa siis backend arendaja, AI insener või andmearhitekt, see juhend pakub struktureeritud õppimist reaalse elu näidete ja praktiliste harjutustega, mis juhatavad sind läbi MCP serveri https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Ametlikud MCP ressursid

- 📘 [MCP dokumentatsioon](https://modelcontextprotocol.io/) – üksikasjalikud juhendid ja kasutajajuhised
- 📜 [MCP spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – protokolli arhitektuur ja tehnilised viited
- 🧑‍💻 [MCP GitHub hoidla](https://github.com/modelcontextprotocol) – avatud lähtekoodiga SDK-d, tööriistad ja koodinäited
- 🌐 [MCP kogukond](https://github.com/orgs/modelcontextprotocol/discussions) – liitu aruteludega ja panusta kogukonda
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – turvalisuse parimad tavad ja riskimaandamine

## 🧭 MCP andmebaasi integratsiooni õppimistee

### 📚 Täielik õppematerjalide struktuur aadressil https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Labor | Teema | Kirjeldus | Link |
|--------|-------|-------------|------|
| **Laborid 1-3: Alused** | | | |
| 00 | [Sissejuhatus MCP andmebaasi integratsiooni](./00-Introduction/README.md) | Ülevaade MCP-st koos andmebaasi integratsiooni ja jaemüügi analüüsi kasutusjuhuga | [Alusta siit](./00-Introduction/README.md) |
| 01 | [Põhiarhitektuuri kontseptsioonid](./01-Architecture/README.md) | MCP serveri arhitektuuri, andmebaasi kihistuse ja turvamustrite mõistmine | [Õpi](./01-Architecture/README.md) |
| 02 | [Turvalisus ja mitu rentnikku](./02-Security/README.md) | Rea tase turvalisus, autentimine ja mitme rentnikuga andmete juurdepääs | [Õpi](./02-Security/README.md) |
| 03 | [Keskkonna seadistamine](./03-Setup/README.md) | Arenduskeskkonna häälestus, Docker, Azure ressursid | [Seadista](./03-Setup/README.md) |
| **Laborid 4-6: MCP serveri ehitamine** | | | |
| 04 | [Andmebaasi disain ja skeem](./04-Database/README.md) | PostgreSQL seadistamine, jaemüügi skeemi kavandamine ja näidisandmed | [Ehita](./04-Database/README.md) |
| 05 | [MCP serveri rakendus](./05-MCP-Server/README.md) | FastMCP serveri loomine andmebaasi integratsiooniga | [Ehita](./05-MCP-Server/README.md) |
| 06 | [Tööriistade arendus](./06-Tools/README.md) | Andmebaasi päringutööriistade ja skeemi introspektsiooni loomine | [Ehita](./06-Tools/README.md) |
| **Laborid 7-9: Täiustatud funktsioonid** | | | |
| 07 | [Semantilise otsingu integratsioon](./07-Semantic-Search/README.md) | Vektorite manustamise kasutamine Azure OpenAI ja pgvector abil | [Täitma](./07-Semantic-Search/README.md) |
| 08 | [Testimine ja silumine](./08-Testing/README.md) | Testimise strateegiad, silumise tööriistad ja valideerimisvõtted | [Testi](./08-Testing/README.md) |
| 09 | [VS Code integratsioon](./09-VS-Code/README.md) | VS Code MCP integratsiooni ja AI vestluse seadistamine | [Integreeri](./09-VS-Code/README.md) |
| **Laborid 10-12: Tootmine ja parimad tavad** | | | |
| 10 | [Väljalaskmisstrateegiad](./10-Deployment/README.md) | Docker'i väljalaskmine, Azure Container Apps ja skaleerimine | [Väljalase](./10-Deployment/README.md) |
| 11 | [Jälgimine ja jälgitavus](./11-Monitoring/README.md) | Application Insights, logimine ja jõudlusmonitooring | [Jälgi](./11-Monitoring/README.md) |
| 12 | [Parimad tavad ja optimeerimine](./12-Best-Practices/README.md) | Jõudluse optimeerimine, turvasoojenemine ja tootmise näpunäited | [Optimeeri](./12-Best-Practices/README.md) |

### 💻 Mida sa ehitad

Selle õppimistee lõpuks oled loonud täieliku **Zava Retail Analytics MCP serveri**, mis sisaldab:

- **Mitme tabeliga jaemüügi andmebaas** klienditellimuste, toodete ja laoseisuga
- **Rea taseme turvalisus** poodipõhise andmete eraldatuse jaoks
- **Semantiline tooteloenduse otsing** kasutades Azure OpenAI manustusi
- **VS Code AI vestluse integratsioon** loomuliku keelepäringute jaoks
- **Tootmiskõlblik juurutamine** Docker ja Azure abil
- **Põhjalik jälgimine** Application Insightsiga

## 🎯 Õppimise eeltingimused

Parima tulemuse saamiseks peaksid omama:

- **Programmeerimiskogemus**: Python'i (soovitavalt) või sarnaste keelte tundmine
- **Andmebaasi teadmised**: Põhiline SQL ja relatsioonandmebaaside arusaam
- **API kontseptsioonid**: REST API-de ja HTTP mõistmine
- **Arendusvahendid**: Käsurea, Git'i ja koodiredaktorite kasutamise kogemus
- **Pilve põhialused**: (valikuline) teadmised Azure või sarnastest pilveplatvormidest
- **Dockeri tundmine**: (valikuline) konteinerite kontseptsioonide mõistmine

### Nõutavad tööriistad

- **Docker Desktop** – PostgreSQL ja MCP serveri käivitamiseks
- **Azure CLI** – pilveressursside juurutamiseks
- **VS Code** – arendamiseks ja MCP integratsiooniks
- **Git** – versioonihalduseks
- **Python 3.8+** – MCP serveri arendamiseks

## 📚 Õppejuhend ja ressursid

See õppeteekond sisaldab põhjalikke ressursse efektiivseks orienteerumiseks:

### Õppejuhend

Igas laboris on:
- **Selged õppesmärgid** – mida saavutad
- **Samm-sammult juhised** – detailne rakendustegevus
- **Koodinäited** – toimivad näited koos selgitustega
- **Harjutused** – praktilised õpivõimalused
- **Veaotsingu juhendid** – levinumad probleemid ja lahendused
- **Lisaressursid** – täiendav lugemine ja süvenemine

### Eeltingimuste kontroll

Enne iga laborit leiad:
- **Nõutavad teadmised** – mida peaksid oskama
- **Seadistuse valideerimine** – kuidas kontrollida oma keskkonda
- **Ajalised hinnangud** – eeldatav lõpetamise aeg
- **Õpitulemused** – mida tead pärast lõpetamist

### Soovitatud õppeteed

Vali tee oma kogemuse põhjal:

#### 🟢 **Algajate tee** (Uus MCP-s)
1. Veendu, et oled lõpetanud esmalt 0-10 osa [MCP algajatele](https://aka.ms/mcp-for-beginners)
2. Täida laborid 00-03, et kinnistada põhialused
3. Järgi laboreid 04-06 praktiliseks ehitamiseks
4. Proovi laboreid 07-09 praktiliseks kasutamiseks

#### 🟡 **Kesktaseme tee** (Mõningase MCP kogemusega)
1. Vaata üle laborid 00-01 andmebaasile orienteeritud kontseptsioonide jaoks
2. Keskendu laboritele 02-06 rakenduseks
3. Süvene laboritesse 07-12 täiendavate funktsioonide jaoks

#### 🔴 **Edasijõudnute tee** (Kogenud MCP kasutajale)
1. Tutvu kiiresti laboritega 00-03 konteksti saamiseks
2. Keskendu laboritele 04-09 andmebaasi integratsiooniks
3. Keskendu laboritele 10-12 tootmisse juurutamiseks

## 🛠️ Kuidas seda õppimisteed tõhusalt kasutada

### Järjestikune õppimine (Soovitatav)

Läbi töötamine laboris järjekorras terviklikuks arusaamiseks:

1. **Loe ülevaadet** – mõista, mida õpid
2. **Kontrolli eeltingimusi** – kindlusta teadmised
3. **Järgi samm-sammult juhiseid** – rakenda õppides
4. **Lõpeta harjutused** – kinnista teadmisi
5. **Vaata üle põhivõtted** – süvenda õpitut

### Sihtotstarbeline õppimine

Kui vajad spetsiifilisi oskusi:

- **Andmebaasi integratsioon**: Keskendu laboritele 04-06
- **Turva rakendamine**: Keskendu laboritele 02, 08, 12
- **AI / semantiline otsing**: Süvene laboris 07
- **Tootmisse juurutamine**: Uuri laborite 10-12 materjali

### Praktiline harjutamine

Igas laboris:
- **Toimivad koodinäited** – kopeeri, muuda ja eksperimenteeri
- **Reaalelu stsenaariumid** – praktilised jaemüügi analüüsi kasutusjuhud
- **Samm-sammult keerukuse kasv** – ehitus lihtsast keerukani
- **Valideerimise sammud** – kontrolli, et su rakendus töötab

## 🌟 Kogukond ja tugi

### Abi saamine

- **Azure AI Discord**: [Liitu ekspertide toe jaoks](https://discord.com/invite/ByRwuEEgH4)
- **GitHub hoidla ja rakenduse näidis**: [Juurutamise näidis ja ressursid](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **MCP kogukond**: [Liitu MCP aruteludega](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Valmis alustama?

Alusta oma teekonda **[Labor 00: MCP andmebaasi integratsiooni sissejuhatus](./00-Introduction/README.md)**

---

*Valmista tootmiskõlblikku MCP serverit, mis ühendub andmebaasidega, selle põhjaliku ja praktilise õppimise kaudu.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:  
See dokument on tõlgitud kasutades tehisintellekti tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüame täpsust, palun pange tähele, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Kriitilise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta üheseltmõistmuste ega valesti tõlgendamise eest, mis võivad tuleneda selle tõlke kasutamisest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->