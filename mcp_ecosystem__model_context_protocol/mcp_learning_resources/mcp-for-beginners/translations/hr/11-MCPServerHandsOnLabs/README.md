# 🚀 MCP Server s PostgreSQL - Potpuni vodič za učenje

## 🧠 Pregled MCP putanje za učenje integracije baze podataka

Ovaj sveobuhvatni vodič za učenje podučava vas kako izgraditi produkcijski spremne **Model Context Protocol (MCP) servere** koji se integriraju s bazama podataka kroz praktičnu implementaciju analitike maloprodaje. Naučit ćete uzorke razine poduzeća uključujući **Row Level Security (RLS)**, **semantičko pretraživanje**, **Azure AI integraciju** i **pristup podacima za više korisnika (multi-tenant)**.

Bilo da ste backend programer, AI inženjer ili arhitekt podataka, ovaj vodič pruža strukturirano učenje s primjerima iz stvarnog svijeta i praktičnim vježbama koje vas vode kroz sljedeći MCP server https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Službeni MCP resursi

- 📘 [MCP Dokumentacija](https://modelcontextprotocol.io/) – Detaljni tutorijali i korisnički vodiči  
- 📜 [MCP Specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Arhitektura protokola i tehničke reference  
- 🧑‍💻 [MCP GitHub Repozitorij](https://github.com/modelcontextprotocol) – Open-source SDK-ovi, alati i primjeri koda  
- 🌐 [MCP Zajednica](https://github.com/orgs/modelcontextprotocol/discussions) – Sudjelujte u raspravama i doprinesite zajednici  
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Najbolje sigurnosne prakse i ublažavanja rizika  

## 🧭 MCP putanja za učenje integracije baze podataka

### 📚 Potpuna struktura učenja za https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Lab | Tema | Opis | Link |
|--------|-------|-------------|------|
| **Lab 1-3: Osnove** | | | |
| 00 | [Uvod u MCP integraciju baza podataka](./00-Introduction/README.md) | Pregled MCP-a s integracijom baza podataka i slučajem korištenja analitike maloprodaje | [Započni ovdje](./00-Introduction/README.md) |
| 01 | [Temeljni koncepti arhitekture](./01-Architecture/README.md) | Razumijevanje arhitekture MCP servera, slojeva baze podataka i sigurnosnih uzoraka | [Nauči](./01-Architecture/README.md) |
| 02 | [Sigurnost i višekorisnički pristup](./02-Security/README.md) | Row Level Security, autentifikacija i višekorisnički pristup podacima | [Nauči](./02-Security/README.md) |
| 03 | [Postavljanje okruženja](./03-Setup/README.md) | Postavljanje razvojnog okruženja, Docker, Azure resursi | [Postavi](./03-Setup/README.md) |
| **Lab 4-6: Izgradnja MCP servera** | | | |
| 04 | [Dizajn baze podataka i shema](./04-Database/README.md) | Postavljanje PostgreSQL-a, dizajn sheme maloprodaje i uzorak podataka | [Izgradi](./04-Database/README.md) |
| 05 | [Implementacija MCP servera](./05-MCP-Server/README.md) | Izgradnja FastMCP servera s integracijom baze podataka | [Izgradi](./05-MCP-Server/README.md) |
| 06 | [Razvoj alata](./06-Tools/README.md) | Izrada alata za upite baze podataka i introspekcija sheme | [Izgradi](./06-Tools/README.md) |
| **Lab 7-9: Napredne mogućnosti** | | | |
| 07 | [Integracija semantičkog pretraživanja](./07-Semantic-Search/README.md) | Implementacija vektorskih ugrađivanja s Azure OpenAI i pgvector | [Napredno](./07-Semantic-Search/README.md) |
| 08 | [Testiranje i ispravljanje pogrešaka](./08-Testing/README.md) | Strategije testiranja, alati za otklanjanje pogrešaka i pristupi validaciji | [Testiraj](./08-Testing/README.md) |
| 09 | [Integracija u VS Code](./09-VS-Code/README.md) | Konfiguracija MCP integracije u VS Code i korištenje AI Chata | [Integriraj](./09-VS-Code/README.md) |
| **Lab 10-12: Produkcija i najbolje prakse** | | | |
| 10 | [Strategije implementacije](./10-Deployment/README.md) | Docker implementacija, Azure Container Apps i razmatranja skaliranja | [Implementiraj](./10-Deployment/README.md) |
| 11 | [Praćenje i opažanje](./11-Monitoring/README.md) | Application Insights, logiranje, nadzor performansi | [Prati](./11-Monitoring/README.md) |
| 12 | [Najbolje prakse i optimizacija](./12-Best-Practices/README.md) | Optimizacija performansi, učvršćivanje sigurnosti i savjeti za produkciju | [Optimiziraj](./12-Best-Practices/README.md) |

### 💻 Što ćete izgraditi

Do kraja ove putanje za učenje izgradit ćete potpun **Zava Retail Analytics MCP Server** koji uključuje:

- **Višestoljetnu maloprodajnu bazu podataka** s narudžbama kupaca, proizvodima i zalihama  
- **Row Level Security** za izolaciju podataka po trgovini  
- **Semantičko pretraživanje proizvoda** koristeći Azure OpenAI ugrađivanja  
- **VS Code AI Chat integraciju** za upite prirodnim jezikom  
- **Produkcijsku implementaciju** s Dockerom i Azureom  
- **Sveobuhvatno praćenje** s Application Insights  

## 🎯 Preduvjeti za učenje

Da biste izvukli najviše iz ove putanje, trebali biste imati:

- **Iskustvo u programiranju**: Poznavanje Pythona (poželjno) ili sličnih jezika  
- **Znanje o bazama podataka**: Osnovno razumijevanje SQL-a i relacijskih baza podataka  
- **Koncepti API-ja**: Razumijevanje REST API-ja i HTTP koncepata  
- **Razvojni alati**: Iskustvo s komandnom linijom, Gitom i uređivačima koda  
- **Osnove clouda**: (neobavezno) Osnovno znanje o Azureu ili sličnim cloud platformama  
- **Poznavanje Dockera**: (neobavezno) Razumijevanje kontejnerizacije  

### Potrebni alati

- **Docker Desktop** - Za pokretanje PostgreSQL i MCP servera  
- **Azure CLI** - Za implementaciju cloud resursa  
- **VS Code** - Za razvoj i MCP integraciju  
- **Git** - Za kontrolu verzija  
- **Python 3.8+** - Za razvoj MCP servera  

## 📚 Vodič za učenje i resursi

Ova putanja za učenje uključuje sveobuhvatne resurse kako biste se učinkovito kretali:

### Vodič za učenje

Svaki lab uključuje:  
- **Jasne ciljeve učenja** – Što ćete postići  
- **Upute korak po korak** – Detaljni vodiči za implementaciju  
- **Primjere koda** – Funkcionalni uzorci s objašnjenjima  
- **Vježbe** – Praktične prilike za vježbanje  
- **Vodiče za rješavanje problema** – Uobičajeni problemi i rješenja  
- **Dodatne resurse** – Daljnje čitanje i istraživanje  

### Provjera preduvjeta

Prije početka svakog lab-a naći ćete:  
- **Potrebno znanje** – Što trebate znati unaprijed  
- **Validaciju postavki** – Kako provjeriti okruženje  
- **Procjenu vremena** – Očekivano trajanje završetka  
- **Ishode učenja** – Što ćete znati nakon završetka  

### Preporučene putanje učenja

Izaberite putanju ovisno o vašoj razini iskustva:

#### 🟢 **Početnička putanja** (Novi u MCP-u)  
1. Provjerite da ste prvo završili 0-10 od [MCP za početnike](https://aka.ms/mcp-for-beginners)  
2. Završite labove 00-03 za ponovno učvršćivanje osnova  
3. Slijedite labove 04-06 za praktičnu izgradnju  
4. Isprobajte labove 07-09 za praktičnu upotrebu  

#### 🟡 **Srednja putanja** (Neka MCP iskustva)  
1. Pregledajte labove 00-01 za specifične koncepte baza podataka  
2. Fokusirajte se na labove 02-06 za implementaciju  
3. Duboko zaronite u labove 07-12 za napredne značajke  

#### 🔴 **Napredna putanja** (Iskustvo s MCP-om)  
1. Pregledajte labove 00-03 za kontekst  
2. Fokusirajte se na labove 04-09 za integraciju baza podataka  
3. Koncentrirajte se na labove 10-12 za produkcijsku implementaciju  

## 🛠️ Kako učinkovito koristiti ovu putanju za učenje

### Sekvencijsko učenje (preporučeno)

Prođite labove po redu za cjelovito razumijevanje:

1. **Pročitajte pregled** – Razumite što ćete naučiti  
2. **Provjerite preduvjete** – Osigurajte da imate potrebno znanje  
3. **Slijedite upute korak po korak** – Implementirajte kako učite  
4. **Završite vježbe** – Učvrstite svoje razumijevanje  
5. **Pregledajte ključne lekcije** – Učvrstite ishod učenja  

### Ciljano učenje

Ako trebate specifične vještine:

- **Integracija baze podataka**: Fokus na labove 04-06  
- **Implementacija sigurnosti**: Usredotočite se na labove 02, 08, 12  
- **AI/Semantičko pretraživanje**: Duboki zaron u lab 07  
- **Produkcijska implementacija**: Učite labove 10-12  

### Praktične vježbe

Svaki lab uključuje:  
- **Radne primjere koda** – Kopirajte, modificirajte i eksperimentišite  
- **Scenarije iz stvarnog svijeta** – Praktični slučajevi analitike maloprodaje  
- **Postupnu složenost** – Izgradnja od jednostavnog do naprednog  
- **Korake za validaciju** – Provjerite radi li implementacija  

## 🌟 Zajednica i podrška

### Dobijte pomoć

- **Azure AI Discord**: [Pridružite se za stručnu podršku](https://discord.com/invite/ByRwuEEgH4)  
- **GitHub repozitorij i primjer implementacije**: [Primjer implementacije i resursi](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)  
- **MCP zajednica**: [Pridružite se široj MCP zajednici](https://github.com/orgs/modelcontextprotocol/discussions)  

## 🚀 Spremni za početak?

Započnite svoje putovanje s **[Lab 00: Uvod u MCP integraciju baza podataka](./00-Introduction/README.md)**

---

*Savladajte izgradnju produkcijski spremnih MCP servera s integracijom baza podataka kroz ovaj sveobuhvatni i praktični vodič za učenje.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument preveden je pomoću AI servisa za prijevod [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatizirani prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku smatra se autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne odgovaramo za bilo kakva nesporazumevanja ili pogrešne interpretacije koje nastanu korištenjem ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->