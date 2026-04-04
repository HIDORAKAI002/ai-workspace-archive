# Implementazione di Azure Content Safety con MCP

> **Rischio MCP OWASP affrontato**: [MCP06 - Injection di Prompt tramite Payload Contestuali](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Per rafforzare la sicurezza MCP contro injection di prompt, avvelenamento di strumenti e altre vulnerabilità specifiche dell'IA, si raccomanda vivamente di integrare Azure Content Safety. Questa guida all'implementazione è allineata con il [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Campo 3: Sicurezza I/O.

## Integrazione con MCP Server

Per integrare Azure Content Safety con il tuo server MCP, aggiungi il filtro di content safety come middleware nella pipeline di elaborazione delle richieste:

1. Inizializza il filtro durante l'avvio del server
2. Valida tutte le richieste in ingresso agli strumenti prima dell'elaborazione
3. Controlla tutte le risposte in uscita prima di restituirle ai client
4. Registra e segnala le violazioni di sicurezza
5. Implementa la gestione degli errori appropriata per i controlli di content safety non riusciti

Questo fornisce una difesa robusta contro:
- Attacchi di injection di prompt
- Tentativi di avvelenamento degli strumenti
- Esfiltrazione di dati tramite input malevoli
- Generazione di contenuti dannosi

## Best Practice per l'Integrazione di Azure Content Safety

1. **Liste di blocco personalizzate**: Crea liste di blocco personalizzate specifiche per i pattern di injection MCP
2. **Taratura della gravità**: Regola le soglie di gravità in base al tuo caso d'uso specifico e alla tolleranza al rischio
3. **Copertura completa**: Applica i controlli di content safety a tutti gli input e output
4. **Ottimizzazione delle prestazioni**: Considera di implementare caching per i controlli di content safety ripetuti
5. **Meccanismi di fallback**: Definisci comportamenti di fallback chiari quando i servizi di content safety non sono disponibili
6. **Feedback agli utenti**: Fornisci un feedback chiaro agli utenti quando il contenuto è bloccato per motivi di sicurezza
7. **Miglioramento continuo**: Aggiorna regolarmente liste di blocco e pattern basandoti sulle minacce emergenti

## Risorse Aggiuntive

### Guida alla Sicurezza MCP OWASP
- [Guida alla Sicurezza MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 completo con implementazione Azure
- [MCP06 - Injection di Prompt](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Pattern dettagliati per la mitigazione dell'injection di prompt
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Approccio pratico Campo 3: Sicurezza I/O copre content safety

### Documentazione Azure
- [Panoramica di Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Documentazione Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Avvio rapido di Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Cosa fare dopo

- Torna a: [Panoramica Modulo Sicurezza](./README.md)
- Continua a: [Modulo 3: Per Iniziare](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica AI [Co-op Translator](https://github.com/Azure/co-op-translator). Pur impegnandoci per garantire l’accuratezza, si prega di considerare che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche si raccomanda una traduzione professionale umana. Non siamo responsabili per eventuali fraintendimenti o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->