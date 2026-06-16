# Sicurezza Avanzata MCP con Azure Content Safety

> **Rischio OWASP MCP Indirizzato**: [MCP06 - Sottversione del Flusso di Intenti](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety offre diversi strumenti potenti che possono migliorare la sicurezza delle tue implementazioni MCP. Per un'esperienza pratica di implementazione, consulta il [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Campo 3: I/O Security.

## Prompt Shields

I Prompt Shields di Microsoft per l'AI forniscono una protezione solida sia contro attacchi diretti che indiretti di prompt injection tramite:

1. **Rilevamento Avanzato**: Utilizza il machine learning per identificare istruzioni malevole incorporate nel contenuto.
2. **Spotlighting**: Trasforma il testo di input per aiutare i sistemi AI a distinguere tra istruzioni valide e input esterni.
3. **Delimitatori e Datamarking**: Segna i confini tra dati affidabili e non affidabili.
4. **Integrazione con Content Safety**: Funziona con Azure AI Content Safety per rilevare tentativi di jailbreak e contenuti dannosi.
5. **Aggiornamenti Continui**: Microsoft aggiorna regolarmente i meccanismi di protezione contro minacce emergenti.

## Implementazione di Azure Content Safety con MCP

Questo approccio offre una protezione a più livelli:
- Scansione degli input prima dell'elaborazione
- Validazione degli output prima della restituzione
- Utilizzo di blocklist per pattern dannosi noti
- Sfruttamento dei modelli di sicurezza contenuti di Azure continuamente aggiornati

## Risorse di Azure Content Safety

Per saperne di più su come implementare Azure Content Safety con i tuoi server MCP, consulta queste risorse ufficiali:

1. [Documentazione Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentazione ufficiale per Azure Content Safety.
2. [Documentazione Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Scopri come prevenire attacchi di prompt injection.
3. [Riferimento API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Riferimento API dettagliato per l'implementazione di Content Safety.
4. [Quickstart: Azure Content Safety con C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Guida rapida all'implementazione con C#.
5. [Librerie Client Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Librerie client per vari linguaggi di programmazione.
6. [Rilevamento di Tentativi di Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Indicazioni specifiche per rilevare e prevenire tentativi di jailbreak.
7. [Best Practices per Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Best practice per implementare efficacemente la sicurezza dei contenuti.

Per un’implementazione più approfondita, consulta la nostra [guida all’implementazione di Azure Content Safety](./azure-content-safety-implementation.md).

## Cosa Fare Dopo

- Leggi: [Implementazione di Azure Content Safety](./azure-content-safety-implementation.md)
- Torna a: [Panoramica del Modulo di Sicurezza](./README.md)
- Continua a: [Modulo 3: Per Iniziare](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->