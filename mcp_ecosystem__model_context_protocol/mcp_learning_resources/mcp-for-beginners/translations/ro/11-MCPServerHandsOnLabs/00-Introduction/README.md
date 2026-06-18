# Introducere în Integrarea Bazei de Date MCP

## 🎯 Ce Acoperă Acest Laborator

Acest laborator introductiv oferă o prezentare cuprinzătoare a construirii serverelor Model Context Protocol (MCP) cu integrare în baze de date. Vei înțelege cazul de afaceri, arhitectura tehnică și aplicațiile din lumea reală prin cazul de utilizare Zava Retail analytics la https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Prezentare Generală

**Model Context Protocol (MCP)** permite asistenților AI să acceseze și să interacționeze în siguranță cu surse externe de date în timp real. Când este combinat cu integrarea bazei de date, MCP deblochează capacități puternice pentru aplicații AI bazate pe date.

Acest parcurs de învățare te învață să construiești servere MCP pregătite pentru producție care conectează asistenții AI la datele de vânzări din retail prin PostgreSQL, implementând modele enterprise precum Row Level Security, căutare semantică și acces multi-chiriaș la date.

## Obiective de Învățare

La finalul acestui laborator, vei putea să:

- **Definești** Model Context Protocol și beneficiile sale esențiale pentru integrarea bazelor de date
- **Identifici** componentele cheie ale unei arhitecturi de server MCP cu baze de date
- **Înțelegi** cazul de utilizare Zava Retail și cerințele sale de business
- **Recunoști** modele enterprise pentru acces securizat și scalabil la baze de date
- **Listezi** uneltele și tehnologiile folosite pe parcursul acestui parcurs de învățare

## 🧭 Provocarea: AI Întâlnește Date din Lumea Reală

### Limitările AI Tradițional

Asistenții AI moderni sunt extrem de puternici, dar se confruntă cu limitări semnificative când lucrează cu date reale de business:

| **Provocare** | **Descriere** | **Impact asupra Afacerii** |
|---------------|---------------|----------------------------|
| **Cunoștințe Statice** | Modelele AI antrenate pe seturi fixe de date nu pot accesa datele curente de business | Informații învechite, oportunități ratate |
| **Silo-uri de Date** | Informații blocate în baze de date, API-uri și sisteme inaccesibile AI | Analiză incompletă, fluxuri de lucru fragmentate |
| **Constrângeri de Securitate** | Accesul direct la baze de date ridică probleme de securitate și conformitate | Implementări limitate, pregătire manuală a datelor |
| **Interogări Complexe** | Utilizatorii de business au nevoie de cunoștințe tehnice pentru extragerea informațiilor | Adoptare redusă, procese ineficiente |

### Soluția MCP

Model Context Protocol abordează aceste provocări oferind:

- **Acces la Date în Timp Real**: Asistenții AI interoghează baze de date și API-uri live
- **Integrare Securizată**: Acces controlat cu autentificare și permisiuni
- **Interfață în Limbaj Natural**: Utilizatorii de business pun întrebări în limbaj obișnuit
- **Protocol Standardizat**: Funcționează pe diverse platforme și unelte AI

## 🏪 Cunoaște Zava Retail: Studiul Nostru de Caz https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Pe parcursul acestui parcurs de învățare, vom construi un server MCP pentru **Zava Retail**, un lanț imaginar de retail DIY cu mai multe locații de magazine. Acest scenariu realist demonstrează implementarea MCP la nivel enterprise.

### Contextul Afacerii

**Zava Retail** operează:
- **8 magazine fizice** în statul Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)
- **1 magazin online** pentru vânzări e-commerce
- **Catalog diversificat de produse** incluzând scule, materiale, produse de grădinărit și materiale de construcție
- **Management pe mai multe niveluri** cu manageri de magazine, manageri regionali și executivi

### Cerințe de Business

Managerii de magazin și executivii au nevoie de analize asistate AI pentru a:

1. **Analiza performanței vânzărilor** pe magazine și perioade de timp
2. **Monitoriza nivelurile de stoc** și identifica nevoile de reaprovizionare
3. **Înțelege comportamentul clienților** și tiparele de cumpărare
4. **Descoperi informații despre produse** prin căutare semantică
5. **Genera rapoarte** cu interogări în limbaj natural
6. **Menține securitatea datelor** prin controlul accesului bazat pe roluri

### Cerințe Tehnice

Serverul MCP trebuie să ofere:

- **Acces multi-chiriaș** unde managerii de magazin văd doar datele propriului magazin
- **Interogări flexibile** cu suport pentru operații SQL complexe
- **Căutare semantică** pentru descoperirea produselor și recomandări
- **Date în timp real** care reflectă starea curentă a afacerii
- **Autentificare securizată** cu row-level security
- **Arhitectură scalabilă** care susține utilizatori concurenți multipli

## 🏗️ Prezentare Generală Arhitectură Server MCP

Serverul nostru MCP implementează o arhitectură stratificată optimizată pentru integrarea bazelor de date:

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

### Componente Cheie

#### **1. Strat Server MCP**
- **FastMCP Framework**: Implementare modernă a serverului MCP în Python
- **Înregistrare Unelte**: Definirea declarativă a uneltelor cu siguranță de tipuri
- **Context Cerere**: Identitate utilizator și gestionare sesiune
- **Gestionare Erori**: Management robust al erorilor și jurnalizare

#### **2. Strat de Integrare Bază de Date**
- **Pooling Conexiuni**: Management eficient asyncpg al conexiunilor
- **Furnizor Schema**: Descoperire dinamică a schemelor tabelelor
- **Executor Interogări**: Executare securizată SQL cu context RLS
- **Management Tranzacții**: Conformitate ACID și gestionare rollback

#### **3. Strat de Securitate**
- **Row Level Security**: PostgreSQL RLS pentru izolarea datelor multi-chiriaș
- **Identitate Utilizator**: Autentificare și autorizare manager magazin
- **Control Acces**: Permisiuni fine-grained și auditare acces
- **Validare Input**: Prevenție SQL injection și validare interogări

#### **4. Strat de Îmbunătățire AI**
- **Căutare Semantică**: Embeddings vectoriale pentru descoperire produse
- **Integrare Azure OpenAI**: Generare embeddings text
- **Algoritmi Similaritate**: Căutare similaritate cosine cu pgvector
- **Optimizare Căutare**: Indexare și tuning performanță

## 🔧 Stiva Tehnologică

### Tehnologii de Bază

| **Componentă** | **Tehnologie** | **Scop** |
|----------------|----------------|----------|
| **Framework MCP** | FastMCP (Python) | Implementare modernă server MCP |
| **Bază de Date** | PostgreSQL 17 + pgvector | Date relaționale cu căutare vectorială |
| **Servicii AI** | Azure OpenAI | Embeddings text și modele lingvistice |
| **Containerizare** | Docker + Docker Compose | Mediu de dezvoltare |
| **Platformă Cloud** | Microsoft Azure | Deploy în producție |
| **Integrare IDE** | VS Code | Chat AI și workflow dezvoltare |

### Unelte de Dezvoltare

| **Unealtă** | **Scop** |
|-------------|-----------|
| **asyncpg** | Driver performant PostgreSQL |
| **Pydantic** | Validare și serializare date |
| **Azure SDK** | Integrare servicii cloud |
| **pytest** | Framework testare |
| **Docker** | Containerizare și deploy |

### Stiva de Producție

| **Serviciu** | **Resursă Azure** | **Scop** |
|--------------|-------------------|----------|
| **Bază de Date** | Azure Database for PostgreSQL | Serviciu gestionat de baze de date |
| **Container** | Azure Container Apps | Hosting container serverless |
| **Servicii AI** | Microsoft Foundry | Modele și endpoint-uri OpenAI |
| **Monitorizare** | Application Insights | Observabilitate și diagnosticare |
| **Securitate** | Azure Key Vault | Management secrete și configurare |

## 🎬 Scenarii de Utilizare din Lumea Reală

Să explorăm cum interacționează diferiți utilizatori cu serverul nostru MCP:

### Scenariul 1: Evaluare Performanță Manager Magazin

**Utilizator**: Sarah, Manager Magazin Seattle  
**Scop**: Analiza performanței vânzărilor din ultimul trimestru

**Interogare în Limbaj Natural**:
> "Arată-mi top 10 produse după venit pentru magazinul meu în T4 2024"

**Ce se Întâmplă**:
1. VS Code AI Chat trimite interogarea către server MCP
2. Server MCP identifică contextul magazinului Sarah (Seattle)
3. Politicile RLS filtrează datele doar pentru magazinul Seattle
4. Interogare SQL generată și executată
5. Rezultatele formatate și trimise către AI Chat
6. AI oferă analiză și perspective

### Scenariul 2: Descoperirea Produselor prin Căutare Semantică

**Utilizator**: Mike, Manager Inventar  
**Scop**: Găsirea produselor similare unei cereri client

**Interogare în Limbaj Natural**:
> "Ce produse vindem care sunt similare cu 'conectori electrici impermeabili pentru utilizare în exterior'?"

**Ce se Întâmplă**:
1. Interogarea este procesată de unealta de căutare semantică
2. Azure OpenAI generează vector embedding
3. pgvector efectuează căutarea de similaritate
4. Produsele relevante clasificate după relevanță
5. Rezultatele includ detalii produs și disponibilitate
6. AI sugerează alternative și posibilități de pachete

### Scenariul 3: Analize Cross-Store

**Utilizator**: Jennifer, Manager Regional  
**Scop**: Compararea performanței între toate magazinele

**Interogare în Limbaj Natural**:
> "Compară vânzările pe categorii pentru toate magazinele în ultimele 6 luni"

**Ce se Întâmplă**:
1. Context RLS setat pentru accesul managerului regional
2. Interogare complexă multi-magazin generată
3. Date agregate pe locațiile magazinelor
4. Rezultatele includ tendințe și comparații
5. AI identifică perspective și recomandări

## 🔒 Detaliu despre Securitate și Multi-Chiriaș

Implementarea noastră prioritizează securitatea de nivel enterprise:

### Row Level Security (RLS)

PostgreSQL RLS asigură izolarea datelor:

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

### Managementul Identității Utilizatorului

Fiecare conexiune MCP include:
- **ID Manager Magazin**: Identificator unic pentru contextul RLS
- **Atribuirea Rolului**: Permisiuni și niveluri de acces
- **Managementul Sesiunii**: Tokenuri securizate de autentificare
- **Auditarea Accesului**: Istoric complet al accesului

### Protecția Datelor

Straturi multiple de securitate:
- **Criptarea Conexiunilor**: TLS pentru toate conexiunile la bază de date
- **Prevenție SQL Injection**: Numai interogări parametrizate
- **Validarea Input**: Validare cuprinzătoare a cererilor
- **Gestionarea Erorilor**: Fără date sensibile în mesaje de eroare

## 🎯 Elemente Cheie de Reținut

După ce termini această introducere, ar trebui să înțelegi:

✅ **Propoziția de Valoare MCP**: Cum conectează MCP asistenții AI cu datele reale  
✅ **Contextul de Business**: Cerințele și provocările Zava Retail  
✅ **Prezentarea Arhitecturii**: Componentele cheie și interacțiunile lor  
✅ **Stiva Tehnologică**: Uneltele și framework-urile folosite  
✅ **Modelul de Securitate**: Accesul multi-chiriaș și protecția datelor  
✅ **Modele de Utilizare**: Scenarii reale de interogare și fluxuri de lucru  

## 🚀 Ce Urmează

Pregătit să mergi mai departe? Continuă cu:

**[Laborator 01: Concepte de Arhitectură de Bază](../01-Architecture/README.md)**

Află despre tiparele arhitecturale ale serverului MCP, principiile de design al bazei de date și implementarea tehnică detaliată care alimentează soluția noastră de analiză pentru retail.

## 📚 Resurse Suplimentare

### Documentație MCP
- [Specificația MCP](https://modelcontextprotocol.io/docs/) - Documentația oficială a protocolului  
- [MCP pentru Începători](https://aka.ms/mcp-for-beginners) - Ghid complet de învățare MCP  
- [Documentația FastMCP](https://github.com/modelcontextprotocol/python-sdk) - Documentația SDK Python

### Integrarea Bazei de Date
- [Documentația PostgreSQL](https://www.postgresql.org/docs/) - Referință completă PostgreSQL  
- [Ghid pgvector](https://github.com/pgvector/pgvector) - Documentație extensie vectorială  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Ghid PostgreSQL RLS

### Servicii Azure
- [Documentația Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integrare servicii AI  
- [Azure Database pentru PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Serviciu gestionat baze de date  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Containere serverless

---

**Disclaimer**: Acesta este un exercițiu de învățare folosind date fictive din retail. Urmează întotdeauna politicile de guvernanță și securitate a datelor din organizația ta atunci când implementezi soluții similare în medii de producție.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->