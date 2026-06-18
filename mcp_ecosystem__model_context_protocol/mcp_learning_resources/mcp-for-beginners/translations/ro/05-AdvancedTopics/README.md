# Subiecte Avansate în MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/ro/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Faceți clic pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_

Acest capitol acoperă o serie de subiecte avansate în implementarea Model Context Protocol (MCP), inclusiv integrarea multi-modală, scalabilitatea, cele mai bune practici de securitate și integrarea în mediul enterprise. Aceste subiecte sunt esențiale pentru construirea de aplicații MCP robuste și pregătite pentru producție, care pot răspunde cerințelor sistemelor AI moderne.

## Prezentare generală

Această lecție explorează concepte avansate în implementarea Model Context Protocol, concentrându-se pe integrarea multi-modală, scalabilitatea, cele mai bune practici de securitate și integrarea în medii enterprise. Aceste subiecte sunt esențiale pentru construirea de aplicații MCP de nivel producție care pot gestiona cerințe complexe în mediile enterprise.

## Obiective de învățare

La finalul acestei lecții, veți putea:

- Implementa capabilități multi-modale în cadrul cadrelor MCP
- Proiecta arhitecturi MCP scalabile pentru scenarii cu cerere mare
- Aplica cele mai bune practici de securitate aliniate cu principiile de securitate MCP
- Integra MCP cu sisteme și cadre AI enterprise
- Optimiza performanța și fiabilitatea în mediile de producție

## Lecții și proiecte exemplu

| Link | Titlu | Descriere |
|------|-------|-----------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrarea cu Azure | Învață cum să integrezi Serverul MCP pe Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Exemple MCP Multi modal | Exemple pentru răspuns audio, imagine și multi modal |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Aplicație minimală Spring Boot care arată OAuth2 cu MCP, atât ca Server de Autorizare, cât și ca Server de Resurse. Demonstrează emiterea securizată de tokenuri, endpoint-uri protejate, implementarea pe Azure Container Apps și integrarea cu API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Contexte root | Află mai multe despre contextul root și cum să le implementezi |
| [5.5 Routing](./mcp-routing/README.md) | Rutare | Învață diferite tipuri de rutare |
| [5.6 Sampling](./mcp-sampling/README.md) | Eșantionare | Învață cum să lucrezi cu eșantionarea |
| [5.7 Scaling](./mcp-scaling/README.md) | Scalare | Învață despre scalare |
| [5.8 Security](./mcp-security/README.md) | Securitate | Asigură-ți Serverul MCP |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Căutare Web MCP | Server și client MCP în Python, integrându-se cu SerpAPI pentru căutări web, de știri, produse și Q&A în timp real. Demonstrează orchestrare multi-tool, integrare API extern și tratamentul robust al erorilor. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Streaming de date în timp real a devenit esențial în lumea condusă de date de astăzi, unde afacerile și aplicațiile necesită acces imediat la informații pentru a lua decizii în timp util. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Căutare Web | Căutarea web în timp real și modul în care MCP transformă căutarea web oferind o abordare standardizată pentru gestionarea contextului între modele AI, motoare de căutare și aplicații. | 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Autentificare Entra ID | Microsoft Entra ID oferă o soluție robustă de gestionare a identității și accesului bazată pe cloud, ajutând la asigurarea faptului că doar utilizatorii și aplicațiile autorizate pot interacționa cu serverul MCP. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integrare Microsoft Foundry | Învață cum să integrezi serverele Model Context Protocol cu agenții Microsoft Foundry, permițând o orchestrare puternică de unelte și capabilități AI enterprise cu conexiuni standardizate către surse externe de date. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Ingineria Contextului | Oportunitatea viitoare a tehnicilor de inginerie a contextului pentru serverele MCP, inclusiv optimizarea contextului, gestionarea dinamică a contextului și strategii pentru prompt engineering eficient în cadrul MCP. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Transport Personalizat | Învață cum să implementezi mecanisme de transport personalizate pentru scenarii specializate de comunicare MCP. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Funcționalități Protocol | Stăpânește funcționalități avansate de protocol, inclusiv notificări de progres, anularea cererilor, șabloane de resurse și modele de tratare a erorilor. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agenți Adversarili | Folosește doi agenți cu poziții opuse, care împart un singur set de unelte MCP, pentru a detecta halucinații, a evidenția cazuri limită și a produce rezultate mai bine calibrate prin dezbatere structurată. |

> **Nou în Specificația MCP 2025-11-25**: Specificația include acum suport experimental pentru **Tasks** (operațiuni de lungă durată cu urmărire a progresului), **Tool Annotations** (metadata despre comportamentul uneltelor pentru siguranță), **URL Mode Elicitation** (solicitarea conținutului URL specific de la clienți) și **Roots** îmbunătățite (pentru gestionarea contextului în spațiul de lucru). Vezi [changelog-ul specificației MCP](https://spec.modelcontextprotocol.io/) pentru detalii complete.

## Referințe suplimentare

Pentru cele mai actualizate informații despre subiectele avansate MCP, consultă:
- [Documentația MCP](https://modelcontextprotocol.io/)
- [Specificația MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repository-ul GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riscuri de securitate și măsuri de protecție
- [Atelierul MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Curs practic de securitate

## Aspecte cheie de reținut

- Implementările MCP multi-modale extind capabilitățile AI dincolo de procesarea textului
- Scalabilitatea este esențială pentru implementările enterprise și poate fi abordată prin scalare orizontală și verticală
- Măsurile comprehensive de securitate protejează datele și asigură controlul corect al accesului
- Integrarea enterprise cu platforme precum Azure OpenAI și Microsoft AI Foundry îmbunătățește capabilitățile MCP
- Implementările avansate MCP beneficiază de arhitecturi optimizate și gestionare atentă a resurselor

## Exercițiu

Proiectează o implementare MCP de nivel enterprise pentru un caz de utilizare specific:

1. Identifică cerințele multi-modale pentru cazul tău de utilizare
2. Defineste controalele de securitate necesare pentru protejarea datelor sensibile
3. Proiectează o arhitectură scalabilă care să poată gestiona încărcări variabile
4. Planifică puncte de integrare cu sistemele AI enterprise
5. Documentează potențialele blocaje de performanță și strategiile de atenuare

## Resurse suplimentare

- [Documentația Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentația Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Ce urmează

Explorează lecțiile din acest modul începând cu: [5.1 MCP Integration](./mcp-integration/README.md)

După ce ai terminat acest modul, continuă cu: [Modulul 6: Contribuții din Comunitate](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->