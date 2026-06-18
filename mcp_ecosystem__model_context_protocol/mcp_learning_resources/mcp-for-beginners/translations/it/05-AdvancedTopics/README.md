# Argomenti Avanzati in MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/it/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Clicca sull'immagine sopra per vedere il video di questa lezione)_

Questo capitolo copre una serie di argomenti avanzati nell'implementazione del Model Context Protocol (MCP), inclusa l'integrazione multimodale, la scalabilità, le migliori pratiche di sicurezza e l'integrazione aziendale. Questi argomenti sono fondamentali per costruire applicazioni MCP robuste e pronte per la produzione che possano soddisfare le esigenze dei sistemi AI moderni.

## Panoramica

Questa lezione esplora concetti avanzati nell'implementazione del Model Context Protocol, concentrandosi su integrazione multimodale, scalabilità, migliori pratiche di sicurezza e integrazione aziendale. Questi argomenti sono essenziali per costruire applicazioni MCP di qualità produttiva in grado di gestire requisiti complessi in ambienti aziendali.

## Obiettivi di apprendimento

Al termine di questa lezione, sarai in grado di:

- Implementare capacità multimodali all'interno dei framework MCP
- Progettare architetture MCP scalabili per scenari ad alta richiesta
- Applicare le migliori pratiche di sicurezza allineate ai principi di sicurezza di MCP
- Integrare MCP con sistemi e framework AI aziendali
- Ottimizzare prestazioni e affidabilità in ambienti di produzione

## Lezioni e progetti di esempio

| Link | Titolo | Descrizione |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrazione con Azure | Impara come integrare il tuo server MCP su Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Esempi MCP multimodali  | Esempi per risposte audio, immagini e multimodali |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Applicazione minima Spring Boot che mostra OAuth2 con MCP, sia come Authorization che Resource Server. Dimostra l’emissione sicura di token, endpoint protetti, deployment su Azure Container Apps e integrazione con API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Contesti principali  | Approfondisci i contesti principali e come implementarli |
| [5.5 Routing](./mcp-routing/README.md) | Instradamento | Impara i diversi tipi di instradamento |
| [5.6 Sampling](./mcp-sampling/README.md) | Campionamento | Impara come lavorare con il campionamento |
| [5.7 Scaling](./mcp-scaling/README.md) | Scalabilità  | Scopri la scalabilità |
| [5.8 Security](./mcp-security/README.md) | Sicurezza  | Metti in sicurezza il tuo server MCP |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Ricerca Web MCP | Server e client Python MCP che integrano SerpAPI per ricerca web, notizie, prodotti e domande in tempo reale. Dimostra orchestrazione multi-tool, integrazione API esterna e robusta gestione degli errori. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Lo streaming dati in tempo reale è diventato essenziale nel mondo odierno guidato dai dati, dove aziende e applicazioni richiedono accesso immediato alle informazioni per prendere decisioni tempestive.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Ricerca Web | Come MCP trasforma la ricerca web in tempo reale fornendo un approccio standardizzato alla gestione del contesto tra modelli AI, motori di ricerca e applicazioni.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Autenticazione Entra ID | Microsoft Entra ID fornisce una soluzione robusta di gestione delle identità e accessi basata su cloud, aiutando a garantire che solo utenti e applicazioni autorizzati possano interagire con il tuo server MCP.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integrazione Microsoft Foundry | Scopri come integrare i server Model Context Protocol con agenti Microsoft Foundry, abilitando una potente orchestrazione di tool e capacità AI aziendali con connessioni standardizzate a fonti di dati esterne.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Ingegneria del contesto | Le opportunità future delle tecniche di ingegneria del contesto per server MCP, inclusi ottimizzazione del contesto, gestione dinamica del contesto e strategie per ingegneria efficace dei prompt all’interno dei framework MCP.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Trasporto personalizzato | Impara come implementare meccanismi di trasporto personalizzati per scenari di comunicazione MCP specializzati.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Funzionalità del protocollo | Approfondisci funzionalità avanzate del protocollo incluse notifiche di progresso, cancellazione richieste, modelli di risorse e gestione degli errori.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agenti avversari | Usa due agenti con posizioni opposte, condividendo un unico set di tool MCP, per individuare allucinazioni, evidenziare casi limite e produrre output meglio calibrati attraverso dibattiti strutturati.|

> **Novità nella Specifica MCP 2025-11-25**: La specifica ora include supporto sperimentale per **Tasks** (operazioni di lunga durata con tracciamento del progresso), **Annotazioni degli Strumenti** (metadata sul comportamento degli strumenti per sicurezza), **Elicitation in Modalità URL** (richiesta di contenuti URL specifici dai client) e miglioramenti nelle **Radici** (per la gestione del contesto di workspace). Consulta il [registro delle modifiche della Specifica MCP](https://spec.modelcontextprotocol.io/) per i dettagli completi.

## Riferimenti aggiuntivi

Per le informazioni più aggiornate sugli argomenti avanzati MCP, consulta:
- [Documentazione MCP](https://modelcontextprotocol.io/)
- [Specifiche MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repository GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Rischi di sicurezza e mitigazioni
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formazione pratica sulla sicurezza

## Punti chiave

- Le implementazioni MCP multimodali estendono le capacità AI oltre l'elaborazione del testo
- La scalabilità è essenziale per le distribuzioni aziendali e può essere affrontata tramite scaling orizzontale e verticale
- Misure di sicurezza complete proteggono i dati e garantiscono un controllo appropriato degli accessi
- L'integrazione aziendale con piattaforme come Azure OpenAI e Microsoft AI Foundry potenzia le capacità MCP
- Le implementazioni MCP avanzate beneficiano di architetture ottimizzate e accurata gestione delle risorse

## Esercizio

Progetta un'implementazione MCP di livello aziendale per un caso d’uso specifico:

1. Identifica i requisiti multimodali per il tuo caso d’uso
2. Delinea i controlli di sicurezza necessari per proteggere i dati sensibili
3. Progetta un'architettura scalabile in grado di gestire carichi variabili
4. Pianifica i punti di integrazione con sistemi AI aziendali
5. Documenta eventuali colli di bottiglia di prestazioni e strategie di mitigazione

## Risorse aggiuntive

- [Documentazione Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentazione Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Cosa c’è dopo

Esplora le lezioni di questo modulo a partire da: [5.1 MCP Integration](./mcp-integration/README.md)

Una volta completato questo modulo, continua con: [Modulo 6: Contributi della Comunità](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->