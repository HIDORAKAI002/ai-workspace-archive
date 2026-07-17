# Argomenti Avanzati in MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/it/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Clicca sull'immagine sopra per guardare il video di questa lezione)_

Questo capitolo tratta una serie di argomenti avanzati nell'implementazione del Model Context Protocol (MCP), inclusa l'integrazione multimodale, la scalabilità, le migliori pratiche di sicurezza e l'integrazione aziendale. Questi temi sono fondamentali per costruire applicazioni MCP robuste e pronte per la produzione, in grado di soddisfare le esigenze dei sistemi AI moderni.

## Panoramica

Questa lezione esplora concetti avanzati nell'implementazione del Model Context Protocol, concentrandosi su integrazione multimodale, scalabilità, migliori pratiche di sicurezza e integrazione aziendale. Questi argomenti sono essenziali per costruire applicazioni MCP di livello produttivo in grado di gestire requisiti complessi in ambienti aziendali.

> **Uno sguardo al futuro:** diversi argomenti sottostanti sono influenzati dal candidato alla versione finale della specifica MCP del `2026-07-28` — Root Contexts (5.4) e Sampling (5.6) si basano su primitivì che il candidato alla versione segna come deprecati, e la funzione sperimentale Tasks menzionata nelle Protocol Features (5.16) si sposta in un'estensione dedicata Tasks. Vedi [What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) per i dettagli.

## Obiettivi di Apprendimento

Alla fine di questa lezione, sarai in grado di:

- Implementare capacità multimodali all'interno di framework MCP
- Progettare architetture MCP scalabili per scenari ad alta domanda
- Applicare le migliori pratiche di sicurezza in linea con i principi di sicurezza MCP
- Integrare MCP con sistemi e framework AI aziendali
- Ottimizzare le prestazioni e l'affidabilità in ambienti di produzione

## Lezioni e Progetti di esempio

| Link | Titolo | Descrizione |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrazione con Azure | Impara come integrare il tuo server MCP su Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Esempi MCP multimodali | Esempi per audio, immagini e risposte multimodali |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Applicazione Spring Boot minimale che mostra OAuth2 con MCP, sia come Authorization sia come Resource Server. Dimostra il rilascio sicuro di token, endpoint protetti, deployment su Azure Container Apps e integrazione con API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts | Scopri di più su root context e su come implementarli (deprecati nel candidato alla release `2026-07-28`; ancora validi per `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Apprendi diversi tipi di routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Impara come lavorare con il sampling (deprecato nel candidato alla release `2026-07-28`; ancora valido per `2025-11-25`) |
| [5.7 Scaling](./mcp-scaling/README.md) | Scaling | Scopri la scalabilità |
| [5.8 Security](./mcp-security/README.md) | Sicurezza | Metti in sicurezza il tuo server MCP |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Server e client MCP Python che si integrano con SerpAPI per ricerche web, notizie, prodotti e Q&A in tempo reale. Dimostra l'orchestrazione multi-tool, integrazione API esterne e gestione robusta degli errori. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Lo streaming dati in tempo reale è diventato essenziale nel mondo odierno guidato dai dati, dove aziende e applicazioni richiedono accesso immediato alle informazioni per prendere decisioni tempestive. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Ricerca Web in tempo reale | Come MCP trasforma la ricerca web in tempo reale offrendo un approccio standardizzato alla gestione del contesto tra modelli AI, motori di ricerca e applicazioni. |
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Autenticazione Entra ID | Microsoft Entra ID offre una robusta soluzione cloud per gestione di identità e accessi, aiutando a garantire che solo utenti e applicazioni autorizzati possano interagire con il server MCP. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integrazione Microsoft Foundry | Scopri come integrare i server Model Context Protocol con gli agenti Microsoft Foundry, abilitando potente orchestrazione di strumenti e capacità AI aziendali con connessioni standardizzate a fonti di dati esterne. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Ingegneria del Contesto | Opportunità future nelle tecniche di ingegneria del contesto per server MCP, incluse ottimizzazione del contesto, gestione dinamica del contesto e strategie per un efficace prompt engineering nei framework MCP. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Trasporto Personalizzato | Impara come implementare meccanismi di trasporto personalizzati per scenari di comunicazione MCP specializzati. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Funzionalità Protocollo | Padroneggia funzionalità avanzate del protocollo tra cui notifiche di progresso, cancellazione di richieste, template di risorse e pattern di gestione degli errori. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agenti Avversari | Usa due agenti con posizioni opposte, condividendo un unico set di strumenti MCP, per individuare allucinazioni, evidenziare casi limite e produrre output meglio calibrati tramite dibattito strutturato. |

> **Novità nella specifica MCP 2025-11-25**: La specifica ora include supporto sperimentale per **Tasks** (operazioni di lunga durata con monitoraggio del progresso), **Annotazioni per Strumenti** (metadata sul comportamento degli strumenti per la sicurezza), **Elicitazione in Modalità URL** (richiedere contenuti URL specifici dai client), e potenziamenti alle **Roots** (per la gestione del contesto workspace). Vedi il [changelog della specifica MCP](https://spec.modelcontextprotocol.io/) per i dettagli completi.

## Riferimenti Aggiuntivi

Per le informazioni più aggiornate sugli argomenti avanzati MCP, consulta:
- [Documentazione MCP](https://modelcontextprotocol.io/)
- [Specifiche MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repository GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Rischi di sicurezza e mitigazioni
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Formazione pratica sulla sicurezza

## Punti Chiave

- Le implementazioni multimodali MCP estendono le capacità AI oltre l'elaborazione del testo
- La scalabilità è essenziale per i deployment aziendali e può essere affrontata tramite scalabilità orizzontale e verticale
- Misure di sicurezza complete proteggono i dati e garantiscono il controllo degli accessi appropriato
- L'integrazione aziendale con piattaforme come Azure OpenAI e Microsoft AI Foundry potenzia le capacità MCP
- Le implementazioni avanzate MCP beneficiano di architetture ottimizzate e gestione attenta delle risorse

## Esercizio

Progetta un'implementazione MCP di livello aziendale per uno specifico caso d'uso:

1. Identifica i requisiti multimodali per il tuo caso d'uso
2. Definisci i controlli di sicurezza necessari per proteggere i dati sensibili
3. Progetta un'architettura scalabile in grado di gestire carichi variabili
4. Pianifica i punti di integrazione con i sistemi AI aziendali
5. Documenta i potenziali colli di bottiglia in termini di prestazioni e strategie di mitigazione

## Risorse Aggiuntive

- [Documentazione Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentazione Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Cosa segue

Esplora le lezioni in questo modulo iniziando da: [5.1 MCP Integration](./mcp-integration/README.md)

Una volta completato questo modulo, continua con: [Modulo 6: Contributi della Comunità](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->