# Implementazione di Azure Content Safety con MCP

> **Rischio OWASP MCP affrontato**: [MCP06 - Sottversione del flusso di intento](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Per rafforzare la sicurezza MCP contro l'iniezione di prompt, l'avvelenamento degli strumenti e altre vulnerabilità specifiche dell'IA, è fortemente consigliata l'integrazione di Azure Content Safety. Questa guida all'implementazione è allineata con il [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Sicurezza I/O.

## Integrazione con il server MCP

Per integrare Azure Content Safety con il tuo server MCP, aggiungi il filtro content safety come middleware nella pipeline di elaborazione delle richieste:

1. Inizializza il filtro durante l'avvio del server
2. Valida tutte le richieste in ingresso degli strumenti prima di elaborarle
3. Controlla tutte le risposte in uscita prima di restituirle ai client
4. Registra e genera allarmi sulle violazioni della sicurezza
5. Implementa una gestione degli errori appropriata per i controlli di sicurezza dei contenuti non superati

Questo fornisce una difesa robusta contro:
- Attacchi di iniezione di prompt
- Tentativi di avvelenamento degli strumenti
- Esfiltrazione di dati tramite input dannosi
- Generazione di contenuti dannosi

## Best practice per l'integrazione di Azure Content Safety

1. **Liste di blocco personalizzate**: Crea liste di blocco personalizzate specifiche per i pattern di iniezione MCP
2. **Regolazione della severità**: Adatta le soglie di severità in base al tuo caso d'uso specifico e alla tolleranza al rischio
3. **Copertura completa**: Applica i controlli di content safety a tutti gli input e output
4. **Ottimizzazione delle prestazioni**: Considera l'implementazione di caching per controlli di content safety ripetuti
5. **Meccanismi di fallback**: Definisci comportamenti di fallback chiari quando i servizi di content safety non sono disponibili
6. **Feedback agli utenti**: Fornisci feedback chiari agli utenti quando il contenuto è bloccato per motivi di sicurezza
7. **Miglioramento continuo**: Aggiorna regolarmente liste di blocco e pattern basati sulle minacce emergenti

## Risorse aggiuntive

### Guida alla sicurezza OWASP MCP
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Guida completa OWASP MCP Top 10 con implementazione Azure
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Pattern dettagliati di mitigazione dell'iniezione di prompt
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Camp 3 pratico: Sicurezza I/O copre content safety

### Documentazione Azure
- [Panoramica Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Documentazione Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Prossimi passi

- Torna a: [Panoramica Modulo Sicurezza](./README.md)
- Continua a: [Modulo 3: Introduzione](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->