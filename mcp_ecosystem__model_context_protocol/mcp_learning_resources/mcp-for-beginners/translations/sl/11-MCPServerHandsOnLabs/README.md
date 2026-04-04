# 🚀 MCP strežnik z PostgreSQL - Celovit učni vodič

## 🧠 Pregled učne poti integracije MCP z bazo podatkov

Ta obsežen učni vodič vas uči, kako zgraditi proizvodne **Model Context Protocol (MCP) strežnike**, ki se integrirajo z bazami podatkov skozi praktično implementacijo analitike na drobno. Spoznali boste vzorce podjetniške ravni, vključno z **Row Level Security (RLS)**, **semantičnim iskanjem**, **integracijo Azure AI** in **večnajemniškim dostopom do podatkov**.

Ne glede na to, ali ste backend razvijalec, AI inženir ali podatkovni arhitekt, vam ta vodič zagotavlja strukturirano učenje z resničnimi primeri in praktičnimi vajami, ki vas popeljejo skozi naslednji MCP strežnik https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Uradni viri MCP

- 📘 [MCP dokumentacija](https://modelcontextprotocol.io/) – Podrobni vodiči in uporabniški priročniki
- 📜 [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Arhitektura protokola in tehnične reference
- 🧑‍💻 [MCP GitHub repozitorij](https://github.com/modelcontextprotocol) – Odprtokodni SDK-ji, orodja in primerni primeri kode
- 🌐 [Skupnost MCP](https://github.com/orgs/modelcontextprotocol/discussions) – Pridružite se razpravam in prispevajte skupnosti
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Najboljše varnostne prakse in zmanjševanje tveganj

## 🧭 Učna pot integracije MCP z bazo podatkov

### 📚 Celotna učna struktura za https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Laboratorij | Tema | Opis | Povezava |
|--------|-------|-------------|------|
| **Lab 1-3: Osnove** | | | |
| 00 | [Uvod v integracijo MCP z bazo podatkov](./00-Introduction/README.md) | Pregled MCP z integracijo baze podatkov in primer uporabe maloprodajne analitike | [Začni tukaj](./00-Introduction/README.md) |
| 01 | [Glavni arhitekturni koncepti](./01-Architecture/README.md) | Razumevanje arhitekture MCP strežnika, plasti baze podatkov in varnostnih vzorcev | [Uči se](./01-Architecture/README.md) |
| 02 | [Varnost in večnajemništvo](./02-Security/README.md) | Row Level Security, avtentikacija in večnajemniški dostop do podatkov | [Uči se](./02-Security/README.md) |
| 03 | [Nastavitev okolja](./03-Setup/README.md) | Nastavitev razvojnega okolja, Docker, Azure viri | [Nastavi](./03-Setup/README.md) |
| **Lab 4-6: Gradnja MCP strežnika** | | | |
| 04 | [Oblikovanje baze podatkov in sheme](./04-Database/README.md) | Nastavitev PostgreSQL, oblikovanje maloprodajne sheme in vzorčni podatki | [Zgradi](./04-Database/README.md) |
| 05 | [Implementacija MCP strežnika](./05-MCP-Server/README.md) | Izgradnja FastMCP strežnika z integracijo baze podatkov | [Zgradi](./05-MCP-Server/README.md) |
| 06 | [Razvoj orodij](./06-Tools/README.md) | Ustvarjanje orodij za poizvedbe po bazi podatkov in pregled sheme | [Zgradi](./06-Tools/README.md) |
| **Lab 7-9: Napredne funkcije** | | | |
| 07 | [Integracija semantičnega iskanja](./07-Semantic-Search/README.md) | Implementacija vektorskih vdelav z Azure OpenAI in pgvector | [Napredovati](./07-Semantic-Search/README.md) |
| 08 | [Testiranje in odpravljanje napak](./08-Testing/README.md) | Strategije testiranja, orodja za odpravljanje napak in pristopi za validacijo | [Testiraj](./08-Testing/README.md) |
| 09 | [Integracija z VS Code](./09-VS-Code/README.md) | Konfiguracija integracije MCP v VS Code in uporaba AI klepeta | [Integriraj](./09-VS-Code/README.md) |
| **Lab 10-12: Proizvodnja in najboljše prakse** | | | |
| 10 | [Strategije nameščanja](./10-Deployment/README.md) | Nameščanje z Dockerjem, Azure Container Apps in razmisleki o skaliranju | [Namesti](./10-Deployment/README.md) |
| 11 | [Nadzor in opazovanje](./11-Monitoring/README.md) | Application Insights, beleženje in spremljanje zmogljivosti | [Nadzoruj](./11-Monitoring/README.md) |
| 12 | [Najboljše prakse in optimizacija](./12-Best-Practices/README.md) | Optimizacija zmogljivosti, utrjevanje varnosti in nasveti za produkcijo | [Optimiziraj](./12-Best-Practices/README.md) |

### 💻 Kaj boste zgradili

Ob zaključku te učne poti boste zgradili celovit **Zava Retail Analytics MCP strežnik**, ki vsebuje:

- **Večtabelno maloprodajno bazo podatkov** s strankinimi naročili, izdelki in inventarjem
- **Row Level Security** za izolacijo podatkov po posameznih trgovinah
- **Semantično iskanje izdelkov** z uporabo Azure OpenAI vdelav
- **Integracijo AI klepeta v VS Code** za poizvedbe v naravnem jeziku
- **Proizvodno pripravljeno nameščanje** z Dockerjem in Azure
- **Celovito spremljanje** z Application Insights

## 🎯 Predpogoji za učenje

Da boste iz te učne poti potegnili največ, morate imeti:

- **Izkušnje s programiranjem**: Poznavanje Pythona (priporočeno) ali sorodnih jezikov
- **Znanje o bazah podatkov**: Osnovno razumevanje SQL in relacijskih baz podatkov
- **Koncepti API-jev**: Razumevanje REST API-jev in HTTP konceptov
- **Orodja za razvoj**: Izkušnje z ukazno vrstico, Git in urejevalniki kode
- **Osnove oblačnih platform**: (neobvezno) Osnovno poznavanje Azure ali sorodnih platform
- **Poznavanje Dockerja**: (neobvezno) Razumevanje konceptov kontejnerizacije

### Zahtevana orodja

- **Docker Desktop** - Za poganjanje PostgreSQL in MCP strežnika
- **Azure CLI** - Za nameščanje oblačnih virov
- **VS Code** - Za razvoj in integracijo MCP
- **Git** - Za nadzor različic
- **Python 3.8+** - Za razvoj MCP strežnika

## 📚 Učni vodič in viri

Ta učna pot vključuje obsežne vire, ki vam pomagajo učinkovito napredovati:

### Učni vodič

Vsak laboratorij vsebuje:
- **Jasne učne cilje** - Kaj boste dosegli
- **Navodila korak za korakom** - Podrobni vodiči za implementacijo
- **Primeri kode** - Delujoči primeri z razlagami
- **Vaje** - Priložnosti za praktično delo
- **Vodiče za odpravljanje težav** - Pogoste težave in rešitve
- **Dodatne vire** - Nadaljnje branje in raziskovanje

### Preverjanje predpogojev

Pred začetkom vsakega laboratorija boste našli:
- **Potrebno znanje** - Kaj morate vedeti vnaprej
- **Preverjanje nastavitev** - Kako potrditi okolje
- **Časovne ocene** - Predviden čas zaključka
- **Učni rezultati** - Kaj boste znali po zaključku

### Priporočene učne poti

Izberite pot glede na vašo ravnijo znanja:

#### 🟢 **Začetniška pot** (nov na MCP)
1. Najprej dokončajte 0-10 [MCP za začetnike](https://aka.ms/mcp-for-beginners)
2. Dokončajte laboratorije 00-03 za utrditev osnov
3. Sledite laboratorijem 04-06 za praktično gradnjo
4. Poskusite laboratorije 07-09 za praktično uporabo

#### 🟡 **Srednje napredna pot** (nekaj znanja MCP)
1. Preglejte laboratorije 00-01 za koncepte specifične baze podatkov
2. Osredotočite se na laboratorije 02-06 za implementacijo
3. Globoko se potopite v laboratorije 07-12 za napredne funkcije

#### 🔴 **Napredna pot** (izkušen s MCP)
1. Na hitro preglejte laboratorije 00-03 za kontekst
2. Osredotočite se na laboratorije 04-09 za integracijo baze podatkov
3. Koncentrirajte se na laboratorije 10-12 za proizvodno nameščanje

## 🛠️ Kako učinkovito uporabljati to učno pot

### Zaporedno učenje (priporočeno)

Delajte laboratorije po vrsti za celovito razumevanje:

1. **Preberite pregled** - Razumite, kaj boste spoznali
2. **Preverite predpogoje** - Zagotovite, da imate potrebno znanje
3. **Sledite navodilom korak za korakom** - Implementirajte med učenjem
4. **Dokončajte vaje** - Utrdite svoje razumevanje
5. **Preglejte ključne ugotovitve** - Utrdite učne rezultate

### Ciljno učenje

Če potrebujete specifične veščine:

- **Integracija baze podatkov**: Osredotočite se na laboratorije 04-06
- **Varnostna implementacija**: Osredotočite se na laboratorije 02, 08, 12
- **AI/Semantično iskanje**: Poglobite se v laboratorij 07
- **Proizvodno nameščanje**: Študirajte laboratorije 10-12

### Praktične vaje

Vsak laboratorij vsebuje:
- **Delujoče primere kode** - Kopirajte, spreminjajte in preizkušajte
- **Resnične scenarije** - Praktične primere maloprodajne analitike
- **Postopna kompleksnost** - Gradnja od preprostega do naprednega
- **Korake za validacijo** - Preverite, da vaša implementacija deluje

## 🌟 Skupnost in podpora

### Poiščite pomoč

- **Azure AI Discord**: [Pridružite se strokovni podpori](https://discord.com/invite/ByRwuEEgH4)
- **GitHub repozitorij in vzorčni primer**: [Nameščanje in viri](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **Skupnost MCP**: [Pridružite se širšim razpravam MCP](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Ste pripravljeni začeti?

Začnite svojo pot z **[Laboratorij 00: Uvod v integracijo MCP z bazo podatkov](./00-Introduction/README.md)**

---

*Obvladajte gradnjo proizvodnih MCP strežnikov z integracijo baz podatkov preko tega obsežnega in praktičnega učnega procesa.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o omejitvi odgovornosti**:
Ta dokument je bil preveden z uporabo storitve za avtomatski prevod AI [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovi izvorni jezikovni različici velja za dokončen in zavezujoč vir. Za pomembne informacije priporočamo strokoven človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki bi lahko nastale zaradi uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->