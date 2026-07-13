# Subiecte Avansate în MCP

[![MCP Avansat: Agenți AI Securizați, Scalabili și Multi-modali](../../../translated_images/ro/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Faceți click pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_

Acest capitol acoperă o serie de subiecte avansate în implementarea Model Context Protocol (MCP), inclusiv integrarea multi-modală, scalabilitatea, bune practici de securitate și integrarea în mediul enterprise. Aceste subiecte sunt esențiale pentru construirea unor aplicații MCP robuste și pregătite pentru producție, care să poată satisface cerințele sistemelor AI moderne.

## Prezentare Generală

Această lecție explorează concepte avansate în implementarea Model Context Protocol, concentrându-se pe integrarea multi-modală, scalabilitate, bune practici de securitate și integrarea în mediul enterprise. Aceste subiecte sunt esențiale pentru construirea unor aplicații MCP de nivel producție care pot gestiona cerințe complexe în mediile enterprise.

> **Privind înainte:** mai multe subiecte de mai jos sunt afectate de candidatul de versiune pentru specificația MCP `2026-07-28` — Contexturile Rădăcină (5.4) și Eșantionarea (5.6) se bazează pe primitive pe care candidatul de lansare le marchează ca fiind depreciate, iar funcția experimentală Tasks menționată în Caracteristicile Protocolului (5.16) trece la o extensie dedicată Tasks. Consultați [Ce se schimbă în MCP: Candidatul de lansare 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pentru detalii.

## Obiective de Învățare

La finalul acestei lecții, veți fi capabil să:

- Implementați capabilități multi-modale în cadrul MCP
- Proiectați arhitecturi scalabile MCP pentru scenarii cu cereri ridicate
- Aplicați bune practici de securitate aliniate cu principiile de securitate MCP
- Integrați MCP cu sisteme și cadre AI enterprise
- Optimizarea performanței și fiabilității în medii de producție

## Lecții și Proiecte Exemplu

| Link | Titlu | Descriere |
|------|-------|-------------|
| [5.1 Integrarea cu Azure](./mcp-integration/README.md) | Integrare cu Azure | Aflați cum să integrați serverul MCP pe Azure |
| [5.2 Exemplu multi-modal](./mcp-multi-modality/README.md) | Exemple Multi-modal MCP | Exemple pentru răspuns audio, imagine și multi-modal |
| [5.3 Exemplu MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demos MCP OAuth2 | Aplicație minimală Spring Boot care arată OAuth2 cu MCP, atât ca server de autorizare, cât și server de resurse. Demonstrează emiterea securizată a token-urilor, endpoint-uri protejate, implementarea în Azure Container Apps și integrarea cu API Management. |
| [5.4 Contexturi Rădăcină](./mcp-root-contexts/README.md) | Contexturi rădăcină | Aflați mai multe despre contextul rădăcină și cum să îl implementați |
| [5.5 Rutare](./mcp-routing/README.md) | Rutare | Aflați diferite tipuri de rutare |
| [5.6 Eșantionare](./mcp-sampling/README.md) | Eșantionare | Aflați cum să lucrați cu eșantionarea |
| [5.7 Scalare](./mcp-scaling/README.md) | Scalare | Aflați despre scalare |
| [5.8 Securitate](./mcp-security/README.md) | Securitate | Asigurați serverul MCP |
| [5.9 Exemplu Căutare Web](./web-search-mcp/README.md) | Căutare Web MCP | Server și client MCP Python integrând cu SerpAPI pentru căutare web, știri, produse și Q&A în timp real. Demonstrează orchestrarea multi-tool, integrarea API extern și gestionarea robustă a erorilor. |
| [5.10 Streaming în timp real](./mcp-realtimestreaming/README.md) | Streaming | Streaming-ul de date în timp real a devenit esențial în lumea modernă orientată spre date, unde afacerile și aplicațiile necesită acces imediat la informații pentru a lua decizii în timp util. |
| [5.11 Căutare Web în timp real](./mcp-realtimesearch/README.md) | Căutare Web | Căutarea web în timp real și modul în care MCP transformă această căutare prin furnizarea unei abordări standardizate pentru gestionarea contextului între modele AI, motoare de căutare și aplicații. | 
| [5.12 Autentificare Entra ID pentru Servere Model Context Protocol](./mcp-security-entra/README.md) | Autentificare Entra ID | Microsoft Entra ID oferă o soluție robustă în cloud pentru gestionarea identității și accesului, ajutând la asigurarea că doar utilizatorii și aplicațiile autorizate pot interacționa cu serverul MCP. |
| [5.13 Integrare Agent Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Integrarea Microsoft Foundry | Aflați cum să integrați serverele Model Context Protocol cu agenții Microsoft Foundry, permițând o orchestrare puternică a instrumentelor și capabilități AI enterprise cu conexiuni standardizate la surse externe de date. |
| [5.14 Inginerie Contextuală](./mcp-contextengineering/README.md) | Inginerie Contextuală | Oportunitățile viitoare ale tehnicilor de inginerie a contextului pentru serverele MCP, inclusiv optimizarea contextului, gestionarea dinamică a contextului și strategii pentru ingineria prompt-urilor eficiente în cadrul MCP. |
| [5.15 Transport Personalizat MCP](./mcp-transport/README.md) | Transport Personalizat | Aflați cum să implementați mecanisme de transport personalizate pentru scenarii specializate de comunicare MCP. |
| [5.16 Explorarea Caracteristicilor Protocolului](./mcp-protocol-features/README.md) | Caracteristici Protocol | Stăpâniți caracteristici avansate ale protocolului, inclusiv notificări de progres, anularea cererilor, șabloane de resurse și modele de gestionare a erorilor. |
| [5.17 Raționament Multi-Agent Adversarial](./mcp-adversarial-agents/README.md) | Agenți Adversar | Folosiți doi agenți cu poziții opuse, partajând un singur set de unelte MCP, pentru a detecta halucinații, a evidenția cazuri-limită și a produce rezultate mai bine calibrate prin dezbatere structurată. |

> **Noutăți în Specificația MCP 2025-11-25**: Specificația include acum suport experimental pentru **Tasks** (operații pe durată lungă cu urmărirea progresului), **Anotări ale Instrumentelor** (metadate despre comportamentul uneltelor pentru siguranță), **Elicitarea Modului URL** (solicitarea conținutului URL specific de la clienți) și **Roots** îmbunătățite (pentru gestionarea contextului în spațiul de lucru). Consultați [jurnalul de modificări MCP](https://spec.modelcontextprotocol.io/) pentru detalii complete.

## Referințe Suplimentare

Pentru cele mai recente informații despre subiecte avansate MCP, consultați:
- [Documentația MCP](https://modelcontextprotocol.io/)
- [Specificația MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repository GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riscuri de securitate și măsuri de atenuare
- [Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Curs practic de securitate

## Concluzii Cheie

- Implementările MCP multi-modale extind capabilitățile AI dincolo de procesarea textului
- Scalabilitatea este esențială pentru implementările enterprise și poate fi abordată prin scalarea orizontală și verticală
- Măsurile cuprinzătoare de securitate protejează datele și asigură un control adecvat al accesului
- Integrarea enterprise cu platforme precum Azure OpenAI și Microsoft AI Foundry îmbunătățește capabilitățile MCP
- Implementările avansate MCP beneficiază de arhitecturi optimizate și gestionare atentă a resurselor

## Exercițiu

Proiectați o implementare MCP de nivel enterprise pentru un caz de utilizare specific:

1. Identificați cerințele multi-modale pentru cazul dumneavoastră de utilizare
2. Conturați controalele de securitate necesare pentru protejarea datelor sensibile
3. Proiectați o arhitectură scalabilă care să poată gestiona încărcări variabile
4. Planificați punctele de integrare cu sistemele AI enterprise
5. Documentați potențialele blocaje de performanță și strategiile de atenuare

## Resurse Suplimentare

- [Documentația Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentația Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Ce urmează

Explorați lecțiile din acest modul începând cu: [5.1 Integrare MCP](./mcp-integration/README.md)

După ce finalizați acest modul, continuați cu: [Modulul 6: Contribuții Comunitare](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->