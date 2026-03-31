# 🚀 Server MCP cu PostgreSQL - Ghid complet de învățare

## 🧠 Prezentare generală a traseului de învățare pentru integrarea bazei de date MCP

Acest ghid de învățare cuprinzător vă învață cum să construiți servere **Model Context Protocol (MCP)** pregătite pentru producție, care se integrează cu baze de date printr-o implementare practică de analiză retail. Veți învăța modele de nivel enterprise, inclusiv **Row Level Security (RLS)**, **căutare semantică**, **integrare Azure AI** și **acces multi-chiriaș la date**.

Indiferent dacă sunteți dezvoltator backend, inginer AI sau arhitect de date, acest ghid oferă învățare structurată cu exemple din lumea reală și exerciții practice care vă ghidează prin următorul server MCP https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Resurse oficiale MCP

- 📘 [Documentația MCP](https://modelcontextprotocol.io/) – Tutoriale detaliate și ghiduri pentru utilizatori  
- 📜 [Specificația MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Arhitectura protocolului și referințe tehnice  
- 🧑‍💻 [Depozitul GitHub MCP](https://github.com/modelcontextprotocol) – SDK-uri open-source, unelte și exemple de cod  
- 🌐 [Comunitatea MCP](https://github.com/orgs/modelcontextprotocol/discussions) – Alăturați-vă discuțiilor și contribuiți la comunitate  
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Practici de securitate și mitigări de risc  

## 🧭 Traseul de învățare pentru integrarea bazei de date MCP

### 📚 Structura completă de învățare pentru https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Laborator | Subiect | Descriere | Link |
|--------|-------|-------------|------|
| **Laboratoarele 1-3: Fundamente** | | | |
| 00 | [Introducere în integrarea bazei de date MCP](./00-Introduction/README.md) | Prezentare generală MCP cu integrarea bazei de date și caz de utilizare analiză retail | [Începeți aici](./00-Introduction/README.md) |
| 01 | [Concepte de bază ale arhitecturii](./01-Architecture/README.md) | Înțelegerea arhitecturii serverului MCP, straturi de bază de date și modele de securitate | [Învățați](./01-Architecture/README.md) |
| 02 | [Securitate și multi-chiriaș](./02-Security/README.md) | Row Level Security, autentificare și acces multi-chiriaș la date | [Învățați](./02-Security/README.md) |
| 03 | [Configurare mediu](./03-Setup/README.md) | Setarea mediului de dezvoltare, Docker, resurse Azure | [Configurare](./03-Setup/README.md) |
| **Laboratoarele 4-6: Construirea serverului MCP** | | | |
| 04 | [Designul bazei de date și schema](./04-Database/README.md) | Configurare PostgreSQL, design schema retail și date exemplu | [Construiește](./04-Database/README.md) |
| 05 | [Implementarea serverului MCP](./05-MCP-Server/README.md) | Construirea serverului FastMCP cu integrare bazei de date | [Construiește](./05-MCP-Server/README.md) |
| 06 | [Dezvoltarea uneltelor](./06-Tools/README.md) | Crearea de unelte pentru interogări baze de date și introspecție schemă | [Construiește](./06-Tools/README.md) |
| **Laboratoarele 7-9: Funcționalități avansate** | | | |
| 07 | [Integrare căutare semantică](./07-Semantic-Search/README.md) | Implementarea vector embeddings cu Azure OpenAI și pgvector | [Avansați](./07-Semantic-Search/README.md) |
| 08 | [Testare și depanare](./08-Testing/README.md) | Strategii de testare, unelte de depanare și metode de validare | [Testează](./08-Testing/README.md) |
| 09 | [Integrare VS Code](./09-VS-Code/README.md) | Configurare integrare MCP și utilizare chat AI în VS Code | [Integrare](./09-VS-Code/README.md) |
| **Laboratoarele 10-12: Producție și bune practici** | | | |
| 10 | [Strategii de implementare](./10-Deployment/README.md) | Implementare cu Docker, Azure Container Apps și considerente de scalare | [Implementare](./10-Deployment/README.md) |
| 11 | [Monitorizare și observabilitate](./11-Monitoring/README.md) | Application Insights, jurnalizare, monitorizarea performanței | [Monitorizează](./11-Monitoring/README.md) |
| 12 | [Bune practici și optimizare](./12-Best-Practices/README.md) | Optimizarea performanței, hardening securitate și sfaturi pentru producție | [Optimizează](./12-Best-Practices/README.md) |

### 💻 Ce vei construi

La finalul acestui traseu de învățare, vei fi construit un server complet **Zava Retail Analytics MCP Server** care include:

- **Bază de date retail multi-tabel** cu comenzi clienți, produse și inventar  
- **Row Level Security** pentru izolare date pe bază de magazin  
- **Căutare semantică a produselor** folosind embeddings Azure OpenAI  
- **Integrare chat AI în VS Code** pentru interogări în limbaj natural  
- **Implementare pregătită pentru producție** cu Docker și Azure  
- **Monitorizare cuprinzătoare** prin Application Insights  

## 🎯 Cerințe prealabile pentru învățare

Pentru a profita la maximum de acest traseu de învățare, ar trebui să ai:

- **Experiență în programare**: Familiaritate cu Python (preferat) sau limbaje similare  
- **Cunoștințe de baze de date**: Înțelegere de bază a SQL și baze de date relaționale  
- **Concepte API**: Cunoștințe de bază despre API-uri REST și concepte HTTP  
- **Unelte de dezvoltare**: Experiență cu linia de comandă, Git și editoare de cod  
- **Bazele cloud-ului**: (Opțional) Cunoștințe de bază despre Azure sau platforme similare  
- **Familiaritate cu Docker**: (Opțional) Înțelegerea conceptelor de containerizare  

### Unelte necesare

- **Docker Desktop** - Pentru rularea PostgreSQL și server MCP  
- **Azure CLI** - Pentru implementarea resurselor cloud  
- **VS Code** - Pentru dezvoltare și integrare MCP  
- **Git** - Pentru controlul versiunilor  
- **Python 3.8+** - Pentru dezvoltarea serverului MCP  

## 📚 Ghid de studiu & Resurse

Acest traseu de învățare include resurse cuprinzătoare pentru a vă ajuta să navigați eficient:

### Ghid de studiu

Fiecare laborator include:  
- **Obiective clare de învățare** - Ce vei realiza  
- **Instrucțiuni pas cu pas** - Ghiduri detaliate de implementare  
- **Exemple de cod** - Mostre funcționale cu explicații  
- **Exerciții** - Oportunități practice  
- **Ghiduri de depanare** - Probleme comune și soluții  
- **Resurse adiționale** - Lecturi suplimentare și explorare  

### Verificare cerințe prealabile

Înainte de fiecare laborator vei găsi:  
- **Cunoștințe necesare** - Ce trebuie să știi înainte  
- **Validare configurare** - Cum să verifici mediul  
- **Estimări de timp** - Durata aproximativă de finalizare  
- **Rezultate de învățare** - Ce vei ști după finalizare  

### Trasee recomandate de învățare

Alege traseul potrivit nivelului tău de experiență:

#### 🟢 **Traseu pentru începători** (Nou în MCP)  
1. Asigură-te că ai finalizat mai întâi 0-10 din [MCP pentru Începători](https://aka.ms/mcp-for-beginners)  
2. Parcurge laboratoarele 00-03 pentru a-ți consolida fundamentele  
3. Urmează laboratoarele 04-06 pentru construire practică  
4. Încearcă laboratoarele 07-09 pentru utilizare practică  

#### 🟡 **Traseu intermediar** (Cu experiență MCP)  
1. Recapitulează laboratoarele 00-01 pentru concepte specifice bazei de date  
2. Concentrează-te pe laboratoarele 02-06 pentru implementare  
3. Aprofundează laboratoarele 07-12 pentru funcționalități avansate  

#### 🔴 **Traseu avansat** (Experimentat MCP)  
1. Parcurge sumar laboratoarele 00-03 pentru context  
2. Concentrează-te pe laboratoarele 04-09 pentru integrare bază de date  
3. Dedica-te laboratoarelor 10-12 pentru implementare în producție  

## 🛠️ Cum să folosești eficient acest traseu de învățare

### Învățare secvențială (recomandată)

Parcurge laboratoarele în ordine pentru o înțelegere completă:

1. **Citește prezentarea generală** - Înțelege ce vei învăța  
2. **Verifică cerințele prealabile** - Asigură-te că ai cunoștințele necesare  
3. **Urmează ghidurile pas cu pas** - Implementează pe măsură ce înveți  
4. **Finalizează exercițiile** - Consolidează-ți înțelegerea  
5. **Revizuiește punctele cheie** - Solidifică rezultatele învățării  

### Învățare țintită

Dacă ai nevoie de abilități specifice:

- **Integrare bază de date**: Concentrează-te pe laboratoarele 04-06  
- **Implementare securitate**: Acordă atenție laboratoarelor 02, 08, 12  
- **AI / Căutare semantică**: Aprofundează laboratorul 07  
- **Implementare în producție**: Studiază laboratoarele 10-12  

### Practică hands-on

Fiecare laborator include:  
- **Exemple funcționale de cod** - Copiază, modifică și experimentează  
- **Scenarii reale** - Cazuri practice de analiză retail  
- **Complexitate progresivă** - Construire de la simplu la avansat  
- **Pași de validare** - Verifică dacă implementarea funcționează  

## 🌟 Comunitate și suport

### Obține ajutor

- **Azure AI Discord**: [Alătură-te pentru suport expert](https://discord.com/invite/ByRwuEEgH4)  
- **Repo GitHub și exemplu implementare**: [Exemplu implementare și resurse](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)  
- **Comunitatea MCP**: [Alătură-te discuțiilor MCP mai largi](https://github.com/orgs/modelcontextprotocol/discussions)  

## 🚀 Gata de început?

Începe-ți călătoria cu **[Laborator 00: Introducere în integrarea bazei de date MCP](./00-Introduction/README.md)**

---

*Stăpânește construirea serverelor MCP pregătite pentru producție cu integrarea bazelor de date prin această experiență completă, practică de învățare.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:  
Acest document a fost tradus utilizând serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să fiți conștienți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de oameni. Nu ne asumăm responsabilitatea pentru orice neînțelegeri sau interpretări greșite care pot apărea în urma utilizării acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->