# Sicurezza Avanzata MCP con Azure Content Safety

> **Rischio OWASP MCP affrontato**: [MCP06 - Prompt Injection via Payload Contestuali](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety offre diversi strumenti potenti che possono migliorare la sicurezza delle tue implementazioni MCP. Per un'esperienza pratica di implementazione, consulta [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Campo 3: Sicurezza I/O.

## Scudi per i Prompt

Gli AI Prompt Shields di Microsoft forniscono una protezione robusta sia contro attacchi di prompt injection diretti che indiretti attraverso:

1. **Rilevamento Avanzato**: Utilizza il machine learning per identificare istruzioni dannose incorporate nel contenuto.
2. **Illuminazione**: Trasforma il testo di input per aiutare i sistemi AI a distinguere tra istruzioni valide e input esterni.
3. **Delimitatori e Datamarking**: Segna i confini tra dati affidabili e non affidabili.
4. **Integrazione con Content Safety**: Lavora con Azure AI Content Safety per rilevare tentativi di jailbreak e contenuti dannosi.
5. **Aggiornamenti Continui**: Microsoft aggiorna regolarmente i meccanismi di protezione contro minacce emergenti.

## Implementazione di Azure Content Safety con MCP

Questo approccio fornisce una protezione multilivello:
- Scansione degli input prima dell'elaborazione
- Validazione degli output prima della restituzione
- Utilizzo di blocklist per pattern dannosi conosciuti
- Sfruttamento dei modelli di sicurezza dei contenuti di Azure costantemente aggiornati

## Risorse di Azure Content Safety

Per saperne di più sull'implementazione di Azure Content Safety con i tuoi server MCP, consulta queste risorse ufficiali:

1. [Documentazione Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentazione ufficiale per Azure Content Safety.
2. [Documentazione Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Scopri come prevenire attacchi di prompt injection.
3. [Riferimento API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Riferimento API dettagliato per l'implementazione di Content Safety.
4. [Avvio rapido: Azure Content Safety con C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Guida rapida all'implementazione con C#.
5. [Librerie Client Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Librerie client per vari linguaggi di programmazione.
6. [Rilevamento dei Tentativi di Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Indicazioni specifiche per rilevare e prevenire tentativi di jailbreak.
7. [Best Practices per Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Best practice per implementare efficacemente la sicurezza dei contenuti.

Per un'implementazione più dettagliata, consulta la nostra [guida all'implementazione di Azure Content Safety](./azure-content-safety-implementation.md).

## Cosa c'è dopo

- Leggi: [Implementazione di Azure Content Safety](./azure-content-safety-implementation.md)
- Torna a: [Panoramica del modulo di sicurezza](./README.md)
- Continua a: [Modulo 3: Introduzione](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avvertenza**:  
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Pur impegnandoci per garantire accuratezza, si prega di notare che le traduzioni automatiche possono contenere errori o inesattezze. Il documento originale nella lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, è consigliata una traduzione professionale umana. Non ci assumiamo responsabilità per eventuali incomprensioni o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->