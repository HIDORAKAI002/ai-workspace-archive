# Argomenti Avanzati in MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/it/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Clicca sull'immagine sopra per visualizzare il video di questa lezione)_

Questo capitolo tratta una serie di argomenti avanzati nell'implementazione del Model Context Protocol (MCP), inclusa l'integrazione multi-modale, la scalabilità, le migliori pratiche di sicurezza e l'integrazione enterprise. Questi argomenti sono cruciali per costruire applicazioni MCP robuste e pronte per la produzione in grado di soddisfare le esigenze dei moderni sistemi di intelligenza artificiale.

## Panoramica

Questa lezione esplora concetti avanzati nell'implementazione del Model Context Protocol, concentrandosi su integrazione multi-modale, scalabilità, migliori pratiche di sicurezza e integrazione enterprise. Questi argomenti sono essenziali per costruire applicazioni MCP di livello produttivo in grado di gestire requisiti complessi in ambienti aziendali.

> **Sguardo al futuro:** diversi argomenti di seguito sono influenzati dal candidato alla release della specifica MCP `2026-07-28` — i Root Contexts (5.4) e il Sampling (5.6) si basano su primitive che il candidato alla release indica come deprecate, e la funzionalità sperimentale Tasks citata in Protocol Features (5.16) si sposta su un'estensione dedicata Tasks. Vedi [What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) per i dettagli.

## Obiettivi di Apprendimento

Al termine di questa lezione, sarai in grado di:

- Implementare capacità multi-modali all'interno dei framework MCP
- Progettare architetture MCP scalabili per scenari ad alta richiesta
- Applicare le migliori pratiche di sicurezza allineate ai principi di sicurezza di MCP
- Integrare MCP con sistemi e framework di intelligenza artificiale enterprise
- Ottimizzare performance e affidabilità in ambienti di produzione

## Lezioni e Progetti di esempio

| Link | Titolo | Descrizione |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrazione con Azure | Impara come integrare il tuo MCP Server su Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Esempi MCP Multi modale | Esempi per risposte audio, immagine e multi-modale |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Applicazione Spring Boot minimale che mostra OAuth2 con MCP, sia come Authorization che Resource Server. Dimostra emissione sicura di token, endpoint protetti, deployment su Azure Container Apps e integrazione con API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts | Scopri di più sui root context e come implementarli |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Impara i diversi tipi di routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Impara come lavorare con il sampling |
| [5.7 Scaling](./mcp-scaling/README.md) | Scaling | Approfondisci lo scaling |
| [5.8 Security](./mcp-security/README.md) | Sicurezza | Metti al sicuro il tuo MCP Server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Server e client MCP in Python che integrano SerpAPI per ricerche web, news, prodotti e Q&A in tempo reale. Dimostra orchestrazione multi-tool, integrazione API esterne e gestione robusta degli errori. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Lo streaming dati in tempo reale è diventato essenziale nel mondo guidato dai dati di oggi, dove aziende e applicazioni necessitano di accesso immediato alle informazioni per prendere decisioni tempestive. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Ricerca Web | Ricerca web in tempo reale: come MCP trasforma la ricerca web in tempo reale fornendo un approccio standardizzato alla gestione del contesto tra modelli AI, motori di ricerca e applicazioni. | 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Autenticazione Entra ID | Microsoft Entra ID fornisce una soluzione robusta di gestione delle identità e degli accessi basata su cloud, assicurando che solo utenti e applicazioni autorizzati possano interagire con il tuo server MCP. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integrazione Microsoft Foundry | Impara come integrare i server Model Context Protocol con gli agent Microsoft Foundry, abilitando potenti orchestrazioni di tool e capacità AI enterprise con connessioni standardizzate a fonti di dati esterne. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Opportunità futura delle tecniche di ingegneria del contesto per server MCP, inclusa l’ottimizzazione del contesto, la gestione dinamica del contesto e strategie per un efficace prompt engineering all’interno dei framework MCP. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Trasporto Personalizzato | Impara a implementare meccanismi di trasporto personalizzati per scenari di comunicazione MCP specializzati. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Funzionalità del Protocollo | Padroneggia le funzionalità avanzate del protocollo inclusi notifiche di progresso, cancellazione delle richieste, template di risorse e modelli di gestione errori. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agenti Avversari | Usa due agenti con posizioni opposte, condividendo un singolo set di strumenti MCP, per rilevare allucinazioni, evidenziare casi limite e produrre output meglio calibrati attraverso un dibattito strutturato. |

> **Novità nella specifica MCP 2025-11-25**: La specifica ora include supporto sperimentale per **Tasks** (operazioni a lungo termine con tracciamento del progresso), **Annotazioni per gli strumenti** (metadata sul comportamento degli strumenti per sicurezza), **URL Mode Elicitation** (richiesta di contenuti URL specifici dai client) e radici migliorate (**Roots**) per la gestione del contesto di workspace. Consulta il [registro delle modifiche della specifica MCP](https://spec.modelcontextprotocol.io/) per tutti i dettagli.

## Riferimenti Aggiuntivi

Per le informazioni più aggiornate sugli argomenti avanzati MCP, consulta:
- [Documentazione MCP](https://modelcontextprotocol.io/)
- [Specifiche MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repository GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Rischi di sicurezza e mitigazioni
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formazione pratica sulla sicurezza

## Punti chiave

- Le implementazioni MCP multi-modali estendono le capacità AI oltre il semplice processamento di testo
- La scalabilità è essenziale per il deployment enterprise ed è affrontabile tramite scaling orizzontale e verticale
- Misure di sicurezza complete proteggono i dati e garantiscono un corretto controllo degli accessi
- L’integrazione enterprise con piattaforme come Azure OpenAI e Microsoft AI Foundry potenzia le capacità MCP
- Le implementazioni avanzate MCP beneficiano di architetture ottimizzate e attenta gestione delle risorse

## Esercizio

Progetta un'implementazione MCP di livello enterprise per un caso d'uso specifico:

1. Identifica i requisiti multi-modali per il tuo caso d'uso
2. Delinea i controlli di sicurezza necessari per proteggere dati sensibili
3. Progetta un'architettura scalabile capace di gestire carichi variabili
4. Pianifica i punti di integrazione con sistemi di intelligenza artificiale enterprise
5. Documenta i potenziali colli di bottiglia nelle performance e strategie di mitigazione

## Risorse Aggiuntive

- [Documentazione Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentazione Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Cosa c'è dopo

Esplora le lezioni in questo modulo iniziando con: [5.1 MCP Integration](./mcp-integration/README.md)

Una volta completato questo modulo, continua con: [Modulo 6: Contributi dalla Community](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->