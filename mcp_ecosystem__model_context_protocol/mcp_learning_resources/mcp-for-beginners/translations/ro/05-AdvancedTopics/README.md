# Subiecte Avansate în MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/ro/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Faceți clic pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_

Acest capitol acoperă o serie de subiecte avansate în implementarea Protocolului Contextului Modelului (MCP), inclusiv integrarea multi-modală, scalabilitatea, cele mai bune practici de securitate și integrarea la nivel de întreprindere. Aceste subiecte sunt cruciale pentru construirea unor aplicații MCP robuste și pregătite pentru producție, care pot satisface cerințele sistemelor moderne de inteligență artificială.

## Prezentare generală

Această lecție explorează concepte avansate în implementarea Protocolului Contextului Modelului, concentrându-se pe integrarea multi-modală, scalabilitate, cele mai bune practici de securitate și integrarea la nivel de întreprindere. Aceste subiecte sunt esențiale pentru construirea de aplicații MCP de nivel producție care pot gestiona cerințe complexe în medii enterprise.

> **Privind înainte:** mai multe subiecte de mai jos sunt afectate de candidatul pentru lansarea specificației MCP `2026-07-28` — Contexturile rădăcină (5.4) și Eșantionarea (5.6) se bazează pe primitive pe care candidatul pentru lansare le marchează ca fiind învechite, iar caracteristica experimentală Tasks menționată în Caracteristicile Protocolului (5.16) se mută într-o extensie dedicată Tasks. Consultați [Ce se schimbă în MCP: candidatul pentru lansarea 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pentru detalii.

## Obiective de învățare

Până la sfârșitul acestei lecții veți putea:

- Implementa capabilități multi-modale în cadrul MCP
- Proiecta arhitecturi scalabile MCP pentru scenarii cu cerințe ridicate
- Aplica cele mai bune practici de securitate aliniate cu principiile de securitate MCP
- Integra MCP cu sisteme și cadre AI de tip enterprise
- Optimiza performanța și fiabilitatea în medii de producție

## Lecții și proiecte exemplu

| Link | Titlu | Descriere |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrare cu Azure | Învață cum să integrezi MCP Server pe Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Exemple MCP Multi modal  | Exemple pentru răspuns audio, imagine și multi-modal |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Aplicație minimalistă Spring Boot care arată OAuth2 cu MCP, atât ca server de autorizare cât și ca server de resurse. Demonstrează emiterea securizată a token-urilor, endpoint-urile protejate, implementarea în Azure Container Apps și integrarea cu API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Contexturi rădăcină  | Află mai multe despre contextul rădăcină și cum să le implementezi (învățat ca învechit în candidatul de lansare `2026-07-28`; încă valabil pentru `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Rutare | Învață diferite tipuri de rutare |
| [5.6 Sampling](./mcp-sampling/README.md) | Eșantionare | Învață cum să folosești eșantionarea (învățat ca învechit în candidatul de lansare `2026-07-28`; încă valabil pentru `2025-11-25`) |
| [5.7 Scaling](./mcp-scaling/README.md) | Scalare  | Învață despre scalare |
| [5.8 Security](./mcp-security/README.md) | Securitate  | Securizează-ți MCP Server-ul |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Căutare web MCP | Server și client MCP în Python care se integrează cu SerpAPI pentru căutare în timp real pe web, știri, produse și întrebări și răspunsuri. Demonstrează orchestrarea multi-instrument, integrarea API extern și gestionarea robustă a erorilor. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Streaming-ul de date în timp real a devenit esențial în lumea orientată pe date de astăzi, unde afacerile și aplicațiile necesită acces imediat la informații pentru a lua decizii rapide.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Căutare web | Căutarea web în timp real: cum MCP transformă căutarea web în timp real oferind o abordare standardizată a managementului contextului între modelele AI, motoarele de căutare și aplicații.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Autentificare Entra ID | Microsoft Entra ID oferă o soluție robustă bazată pe cloud pentru gestionarea identității și accesului, ajutând să se asigure că doar utilizatorii și aplicațiile autorizate pot interacționa cu serverul MCP.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integrare Microsoft Foundry | Învață cum să integrezi serverele Protocolului Contextului Modelului cu agenții Microsoft Foundry, activând orchestrarea puternică a instrumentelor și capabilități AI enterprise cu conexiuni standardizate la surse externe de date.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Inginerie a Contextului | Oportunitățile viitoare în tehnicile de inginerie a contextului pentru serverele MCP, incluzând optimizarea contextului, managementul dinamic al contextului și strategii pentru ingineria eficientă a prompturilor în cadrul MCP.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Transport personalizat | Învață cum să implementezi mecanisme de transport personalizate pentru scenarii de comunicare specialize MCP.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Caracteristici ale Protocolului | Stăpânește caracteristici avansate ale protocolului, inclusiv notificări de progres, anulări de cereri, șabloane de resurse și modele de gestionare a erorilor.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agenți Adversariale | Folosește doi agenți cu poziții opuse, împărtășind un singur set de instrumente MCP, pentru a detecta halucinații, a evidenția cazuri-limită și a produce rezultate mai bine calibrate prin dezbatere structurată.|

> **Noutăți în Specificația MCP 2025-11-25**: Specificația include acum suport experimental pentru **Tasks** (operațiuni de durată cu urmărire a progresului), **Anotări ale Instrumentelor** (metadata despre comportamentul instrumentului pentru siguranță), **URL Mode Elicitation** (cerere de conținut URL specific din partea clienților) și **Roots** îmbunătățite (pentru managementul contextului spațiului de lucru). Consultați [jurnalul de modificări MCP Specification](https://spec.modelcontextprotocol.io/) pentru detalii complete.

## Referințe suplimentare

Pentru cele mai actualizate informații despre subiectele avansate MCP, consultați:
- [Documentația MCP](https://modelcontextprotocol.io/)
- [Specificația MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repozitoriu GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riscuri de securitate și metode de atenuare
- [Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Curs practic de securitate

## Aspecte esențiale de reținut

- Implementările MCP multi-modale extind capabilitățile AI dincolo de procesarea textului
- Scalabilitatea este esențială pentru implementările enterprise și poate fi realizată prin scalare orizontală și verticală
- Măsurile cuprinzătoare de securitate protejează datele și asigură controlul adecvat al accesului
- Integrarea enterprise cu platforme ca Azure OpenAI și Microsoft AI Foundry îmbunătățește capabilitățile MCP
- Implementările MCP avansate beneficiază de arhitecturi optimizate și gestionarea atentă a resurselor

## Exercițiu

Proiectați o implementare MCP de nivel enterprise pentru un caz de utilizare specific:

1. Identificați cerințele multi-modale pentru cazul dvs. de utilizare
2. Schițați controalele de securitate necesare pentru protejarea datelor sensibile
3. Proiectați o arhitectură scalabilă care poate gestiona sarcini variabile
4. Planificați punctele de integrare cu sistemele AI de tip enterprise
5. Documentați potențialele blocaje de performanță și strategiile de atenuare

## Resurse suplimentare

- [Documentația Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentația Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Ce urmează

Explorați lecțiile din acest modul începând cu: [5.1 Integrare MCP](./mcp-integration/README.md)

După ce ați finalizat acest modul, continuați cu: [Modulul 6: Contribuții din Comunitate](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->