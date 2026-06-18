# Uvod u MCP integraciju baze podataka

## 🎯 Što ovaj laboratorij obuhvaća

Ovaj uvodni laboratorij pruža sveobuhvatan pregled izgradnje Model Context Protocol (MCP) poslužitelja s integracijom baze podataka. Razumjet ćete poslovni slučaj, tehničku arhitekturu i primjere iz stvarnog svijeta kroz Zava Retail analitički slučaj na https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Pregled

**Model Context Protocol (MCP)** omogućuje AI asistentima siguran pristup i interakciju s vanjskim izvorima podataka u stvarnom vremenu. U kombinaciji s integracijom baze podataka, MCP otključava moćne mogućnosti za AI aplikacije vođene podacima.

Ovaj put učenja vas uči kako izgraditi MCP poslužitelje spremne za produkciju koji povezuju AI asistente s maloprodajnim prodajnim podacima putem PostgreSQL-a, implementirajući enterprise obrasce poput Row Level Security, semantičko pretraživanje i višekorisnički pristup podacima.

## Ciljevi učenja

Na kraju ovog laboratorija moći ćete:

- **Definirati** Model Context Protocol i njegove ključne prednosti za integraciju baza podataka  
- **Prepoznati** ključne komponente MCP poslužiteljske arhitekture s bazama podataka  
- **Razumjeti** Zava Retail slučaj uporabe i njegove poslovne zahtjeve  
- **Priznati** enterprise obrasce za siguran, skalabilan pristup bazama podataka  
- **Nabrojati** alate i tehnologije korištene tijekom ovog puta učenja  

## 🧭 Izazov: AI susreće podatke iz stvarnog svijeta

### Ograničenja tradicionalnog AI-ja

Moderni AI asistenti su iznimno moćni, ali se suočavaju sa značajnim ograničenjima kada rade sa stvarnim poslovnim podacima:

| **Izazov** | **Opis** | **Poslovni utjecaj** |
|------------|----------|---------------------|
| **Statistično znanje** | AI modeli trenirani na fiksnim skupovima podataka nemaju pristup aktualnim poslovnim podacima | Zastarjeli uvidi, propuštene prilike |
| **Podatkovni silosi** | Informacije zaključane u bazama, API-ima i sustavima do kojih AI ne može doći | Nepotpune analize, fragmentirani radni tijekovi |
| **Sigurnosna ograničenja** | Izravni pristup bazama podataka izaziva sigurnosne i usklađenosne zabrinutosti | Ograničena primjena, ručna priprema podataka |
| **Složeni upiti** | Poslovni korisnici trebaju tehničko znanje za izvlačenje podataka i uvida | Smanjena primjena, neučinkoviti procesi |

### MCP rješenje

Model Context Protocol rješava ove izazove pružajući:

- **Pristup podacima u stvarnom vremenu**: AI asistenti izvještavaju uživo iz baza podataka i API-ja  
- **Sigurna integracija**: Kontrolirani pristup s autentifikacijom i dopuštenjima  
- **Sučelje prirodnog jezika**: Poslovni korisnici postavljaju pitanja na običnom engleskom  
- **Standardizirani protokol**: Radi preko različitih AI platformi i alata  

## 🏪 Upoznajte Zava Retail: Naš studijski slučaj na https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Tijekom ovog puta učenja gradit ćemo MCP poslužitelj za **Zava Retail**, izmišljenu maloprodajnu DIY lanac s više prodajnih mjesta. Ovaj realističan scenarij demonstrira implementaciju MCP-ja na razini poduzeća.

### Poslovni kontekst

**Zava Retail** pokreće:  
- **8 fizičkih trgovina** širom države Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 online trgovinu** za e-trgovinu  
- **Raznoliki katalog proizvoda** uključujući alate, hardver, vrtne potrepštine i građevinski materijal  
- **Višerazinsko upravljanje** s voditeljima trgovina, regionalnim menadžerima i izvršnim direktorima  

### Poslovni zahtjevi

Voditelji trgovina i izvršni direktori trebaju AI-pokretanu analitiku za:

1. **Analizu prodajnih performansi** kroz trgovine i vremenska razdoblja  
2. **Praćenje razina zaliha** i identifikaciju potreba za dopunom  
3. **Razumijevanje ponašanja kupaca** i uzoraka kupnje  
4. **Otkrivanje uvida u proizvode** putem semantičkog pretraživanja  
5. **Generiranje izvještaja** pomoću upita prirodnog jezika  
6. **Očuvanje sigurnosti podataka** uz kontrolu pristupa na temelju uloga  

### Tehnički zahtjevi

MCP poslužitelj mora pružiti:

- **Višekorisnički pristup podacima** gdje voditelji trgovina vide samo podatke svoje trgovine  
- **Fleksibilno upitavanje** podržavajuće složene SQL operacije  
- **Semantičko pretraživanje** za otkrivanje proizvoda i preporuke  
- **Podatke u stvarnom vremenu** koji odražavaju trenutačno stanje poslovanja  
- **Sigurnu autentifikaciju** s row-level security (RLS)  
- **Skalabilnu arhitekturu** koja podržava više istovremenih korisnika  

## 🏗️ Pregled arhitekture MCP poslužitelja

Naš MCP poslužitelj implementira slojevitu arhitekturu optimiziranu za integraciju baza podataka:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Ključne komponente

#### **1. MCP sloj poslužitelja**
- **FastMCP Framework**: Moderna Python implementacija MCP poslužitelja  
- **Registracija alata**: Deklarativne definicije alata s tipnom sigurnošću  
- **Kontekst zahtjeva**: Upravljanje identitetom korisnika i sesijom  
- **Rukovanje pogreškama**: Robusno upravljanje greškama i zapisivanje  

#### **2. Sloj integracije baze podataka**
- **Pooling veza**: Efikasno upravljanje asyncpg vezama  
- **Provider sheme**: Dinamičko otkrivanje sheme tablica  
- **Izvršitelj upita**: Sigurno izvršavanje SQL-a s RLS kontekstom  
- **Upravljanje transakcijama**: ACID usklađenost i rukovanje povratom  

#### **3. Sigurnosni sloj**
- **Row Level Security**: PostgreSQL RLS za izolaciju višekorisničkih podataka  
- **Identitet korisnika**: Autentifikacija i autorizacija voditelja trgovine  
- **Kontrola pristupa**: Precizna dopuštenja i revizijske evidencije  
- **Validacija unosa**: Prevencija SQL injekcija i validacija upita  

#### **4. AI sloj poboljšanja**
- **Semantičko pretraživanje**: Vektorska ugradnja za otkrivanje proizvoda  
- **Integracija Azure OpenAI**: Generiranje tekstualnih ugradnji  
- **Algoritmi sličnosti**: pgvector pretraživanje kosinusne sličnosti  
- **Optimizacija pretraživanja**: Indeksiranje i podešavanje performansi  

## 🔧 Tehnološki paket

### Temeljne tehnologije

| **Komponenta** | **Tehnologija** | **Namjena** |
|----------------|-----------------|-------------|
| **MCP Framework** | FastMCP (Python) | Moderna implementacija MCP poslužitelja |
| **Baza podataka** | PostgreSQL 17 + pgvector | Relacijski podaci s vektorskim pretraživanjem |
| **AI usluge** | Azure OpenAI | Tekstualne ugradnje i jezični modeli |
| **Kontejnerizacija** | Docker + Docker Compose | Razvojno okruženje |
| **Cloud platforma** | Microsoft Azure | Produkcijsko postavljanje |
| **Integracija IDE-a** | VS Code | AI chat i razvojni tijek |

### Alati za razvoj

| **Alat** | **Namjena** |
|----------|-------------|
| **asyncpg** | Visokoučinkoviti PostgreSQL upravljač |
| **Pydantic** | Validacija i serijalizacija podataka |
| **Azure SDK** | Integracija cloud usluga |
| **pytest** | Okvir za testiranje |
| **Docker** | Kontejnerizacija i postavljanje |

### Produkcijski paket

| **Usluga** | **Azure resurs** | **Namjena** |
|------------|------------------|-------------|
| **Baza podataka** | Azure Database for PostgreSQL | Upravljana usluga baza podataka |
| **Kontejner** | Azure Container Apps | Serverless hosting kontejnera |
| **AI usluge** | Microsoft Foundry | OpenAI modeli i endpointi |
| **Nadzor** | Application Insights | Promatranje i dijagnostika |
| **Sigurnost** | Azure Key Vault | Upravljanje tajnama i konfiguracijom |

## 🎬 Scenariji korištenja iz stvarnog svijeta

Pogledajmo kako različiti korisnici komuniciraju s našim MCP poslužiteljem:

### Scenarij 1: Pregled performansi voditelja trgovine

**Korisnik**: Sarah, voditeljica trgovine Seattle  
**Cilj**: Analizirati prodajne performanse prošlog kvartala

**Upit prirodnim jezikom**:  
> "Pokaži mi top 10 proizvoda po prihodu za moju trgovinu u Q4 2024"

**Što se događa**:  
1. VS Code AI Chat šalje upit MCP poslužitelju  
2. MCP poslužitelj prepoznaje Sarahin kontekst trgovine (Seattle)  
3. RLS pravila filtriraju podatke samo za trgovinu Seattle  
4. SQL upit se generira i izvršava  
5. Rezultati se formatiraju i vraćaju AI Chatu  
6. AI daje analizu i uvide  

### Scenarij 2: Otkrivanje proizvoda putem semantičkog pretraživanja

**Korisnik**: Mike, voditelj zaliha  
**Cilj**: Pronaći proizvode slične zahtjevu kupca

**Upit prirodnim jezikom**:  
> "Koje proizvode prodajemo koji su slični 'vodootpornim električnim konektorima za vanjsku upotrebu'?"

**Što se događa**:  
1. Upit obrađuje alat za semantičko pretraživanje  
2. Azure OpenAI generira vektorsku ugradnju  
3. pgvector provodi pretraživanje po sličnosti  
4. Povezani proizvodi rangirani po relevantnosti  
5. Rezultati uključuju detalje o proizvodima i dostupnost  
6. AI predlaže alternative i mogućnosti pakiranja  

### Scenarij 3: Analize između trgovina

**Korisnik**: Jennifer, regionalna menadžerica  
**Cilj**: Usporediti performanse svih trgovina

**Upit prirodnim jezikom**:  
> "Usporedi prodaju po kategorijama za sve trgovine u zadnjih 6 mjeseci"

**Što se događa**:  
1. RLS kontekst postavljen za regionalni pristup  
2. Generira se složen upit za više trgovina  
3. Podaci se agregiraju preko lokacija trgovina  
4. Rezultati uključuju trendove i usporedbe  
5. AI identificira uvide i preporuke  

## 🔒 Sigurnost i detaljno višekorisničko okruženje

Naša implementacija stavlja prioritet na sigurnost na razini enterprise-a:

### Row Level Security (RLS)

PostgreSQL RLS osigurava izolaciju podataka:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Upravljanje korisničkim identitetom

Svaka MCP veza uključuje:  
- **ID voditelja trgovine**: Jedinstveni identifikator za RLS kontekst  
- **Dodjela uloga**: Dopuštenja i razine pristupa  
- **Upravljanje sesijom**: Sigurni autentikacijski tokeni  
- **Revizijsko zapisivanje**: Potpuna evidencija pristupa  

### Zaštita podataka

Višeslojna sigurnost:  
- **Šifriranje veza**: TLS za sve veze prema bazi podataka  
- **Prevencija SQL injekcija**: Samo parametarizirani upiti  
- **Validacija unosa**: Sveobuhvatno validiranje zahtjeva  
- **Rukovanje greškama**: Bez prikaza osjetljivih podataka u porukama greške  

## 🎯 Ključni zaključci

Nakon dovršetka ovog uvoda trebali biste razumjeti:

✅ **Vrijednost MCP-a**: Kako MCP povezuje AI asistente i podatke iz stvarnog svijeta  
✅ **Poslovni kontekst**: Zahtjeve i izazove Zava Retaila  
✅ **Pregled arhitekture**: Ključne komponente i njihove interakcije  
✅ **Tehnološki paket**: Alate i okvire korištene tijekom puta  
✅ **Sigurnosni model**: Višekorisnički pristup i zaštitu podataka  
✅ **Obrasce uporabe**: Scenarije stvarnog upita i radne tokove  

## 🚀 Što slijedi

Spremni za dublje uranjanje? Nastavite s:

**[Lab 01: Osnovni koncepti arhitekture](../01-Architecture/README.md)**

Saznajte više o MCP arhitektonskim obrascima, principima dizajna baza podataka i detaljnoj tehničkoj implementaciji koja pokreće naše rješenje za maloprodajnu analitiku.

## 📚 Dodatni izvori

### MCP dokumentacija
- [MCP specifikacija](https://modelcontextprotocol.io/docs/) - Službena dokumentacija protokola  
- [MCP za početnike](https://aka.ms/mcp-for-beginners) - Sveobuhvatan vodič za učenje MCP-a  
- [FastMCP dokumentacija](https://github.com/modelcontextprotocol/python-sdk) - Dokumentacija Python SDK-a  

### Integracija baza podataka
- [PostgreSQL dokumentacija](https://www.postgresql.org/docs/) - Kompletna PostgreSQL referenca  
- [pgvector vodič](https://github.com/pgvector/pgvector) - Dokumentacija proširenja vektora  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Vodič za PostgreSQL RLS  

### Azure usluge
- [Azure OpenAI dokumentacija](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integracija AI usluga  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Upravljana usluga baze podataka  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverless kontejneri  

---

**Odricanje**: Ovo je vježba učenja koristeći izmišljene maloprodajne podatke. Uvijek slijedite pravila upravljanja podacima i sigurnosne politike vaše organizacije pri implementaciji sličnih rješenja u produkcijskim okruženjima.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->