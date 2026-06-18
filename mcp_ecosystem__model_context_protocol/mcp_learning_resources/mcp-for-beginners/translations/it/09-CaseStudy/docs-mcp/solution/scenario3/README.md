# Scenario 3: Documentazione in-Editor con MCP Server in VS Code

## Panoramica

In questo scenario, imparerai come portare Microsoft Learn Docs direttamente nel tuo ambiente Visual Studio Code utilizzando il server MCP. Invece di passare continuamente da una scheda del browser all’altra per cercare documentazione, puoi accedere, cercare e fare riferimento ai documenti ufficiali direttamente all’interno del tuo editor. Questo approccio semplifica il tuo flusso di lavoro, ti mantiene concentrato e consente un’integrazione senza soluzione di continuità con strumenti come GitHub Copilot.

- Cerca e leggi la documentazione dentro VS Code senza uscire dall’ambiente di programmazione.
- Fai riferimento alla documentazione e inserisci link direttamente nei tuoi file README o dei corsi.
- Usa GitHub Copilot e MCP insieme per un flusso di lavoro documentativo fluido e potenziato dall’IA.

## Obiettivi di apprendimento

Alla fine di questo capitolo, capirai come configurare e utilizzare il server MCP all’interno di VS Code per migliorare il tuo flusso di lavoro di documentazione e sviluppo. Sarai in grado di:

- Configurare il tuo workspace per utilizzare il server MCP per la ricerca della documentazione.
- Cercare e inserire la documentazione direttamente da VS Code.
- Combinare la potenza di GitHub Copilot e MCP per un flusso di lavoro più produttivo e potenziato dall’IA.

Queste competenze ti aiuteranno a mantenere la concentrazione, migliorare la qualità della documentazione e aumentare la produttività come sviluppatore o redattore tecnico.

## Soluzione

Per ottenere l’accesso alla documentazione in-editor, seguirai una serie di passaggi che integrano il server MCP con VS Code e GitHub Copilot. Questa soluzione è ideale per autori di corsi, scrittori di documentazione e sviluppatori che vogliono mantenere la concentrazione nell’editor mentre lavorano con la documentazione e Copilot.

- Aggiungi rapidamente link di riferimento a un README mentre scrivi un corso o la documentazione di un progetto.
- Usa Copilot per generare codice e MCP per trovare all’istante e citare i documenti rilevanti.
- Rimani concentrato nel tuo editor e aumenta la produttività.

### Guida passo-passo

Per iniziare, segui questi passaggi. Per ciascun passaggio, puoi aggiungere uno screenshot dalla cartella assets per illustrare visivamente il processo.

1. **Aggiungi la configurazione MCP:**  
   Nella radice del progetto, crea un file `.vscode/mcp.json` e aggiungi la seguente configurazione:  
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
  
   Questa configurazione indica a VS Code come connettersi al [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Passo 1: Aggiungi mcp.json alla cartella .vscode](../../../../../../translated_images/it/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Apri il pannello GitHub Copilot Chat:**  
   Se non hai già installato l’estensione GitHub Copilot, vai alla vista Estensioni in VS Code e installala. Puoi scaricarla direttamente dal [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Quindi, apri il pannello Copilot Chat dalla barra laterale.   

   ![Passo 2: Apri il pannello Copilot Chat](../../../../../../translated_images/it/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Abilita la modalità agente e verifica gli strumenti:**  
   Nel pannello Copilot Chat, abilita la modalità agente.

   ![Passo 3: Abilita la modalità agente e verifica gli strumenti](../../../../../../translated_images/it/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Dopo aver abilitato la modalità agente, verifica che il server MCP sia elencato tra gli strumenti disponibili. Questo garantisce che l’agente Copilot possa accedere al server di documentazione per recuperare informazioni rilevanti.
   
   ![Passo 3: Verifica lo strumento server MCP](../../../../../../translated_images/it/step3-verify-mcp-tool.76096a6329cbfecd.webp)

4. **Avvia una nuova chat e interroga l’agente:**  
   Apri una nuova chat nel pannello Copilot Chat. Ora puoi porre domande all’agente riguardo la documentazione. L’agente userà il server MCP per recuperare e mostrare la documentazione Microsoft Learn rilevante direttamente nel tuo editor.

   - *"Sto cercando di scrivere un piano di studio per l’argomento X. Lo studierò per 8 settimane, per ogni settimana suggeriscimi contenuti da seguire."*

   ![Passo 4: Interroga l’agente in chat](../../../../../../translated_images/it/step4-prompt-chat.12187bb001605efc.webp)

5. **Query in diretta:**

   > Prendiamo una query in diretta dalla sezione [#get-help](https://discord.gg/D6cRhjHWSC) nel Discord di Microsoft Foundry ([vedi messaggio originale](https://discord.com/channels/1113626258182504448/1385498306720829572)):  
   
   *"Cerco risposte su come distribuire una soluzione multi-agente con agenti AI sviluppati su Azure AI Foundry. Vedo che non esiste un metodo di distribuzione diretto, come i canali Copilot Studio. Quali sono quindi i diversi modi per effettuare questa distribuzione affinché gli utenti aziendali possano interagire e completare il lavoro?  
   Ci sono numerosi articoli/blog che dicono che si può usare il servizio Azure Bot per fare questo lavoro, che può fungere da ponte tra MS Teams e gli agenti Azure AI Foundry, ma funziona se configuro un bot Azure che si collega all’Agente Orchestratore su Azure AI Foundry tramite Azure Function per eseguire l’orchestrazione o devo creare una Azure Function per ciascuno degli agenti AI della soluzione multi-agente per fare l’orchestrazione nel Bot Framework? Altri suggerimenti sono ben accetti."*

   ![Passo 5: Query in diretta](../../../../../../translated_images/it/step5-live-queries.49db3e4a50bea273.webp)

   L’agente risponderà con link e riepiloghi della documentazione rilevante, che potrai poi inserire direttamente nei tuoi file markdown o usare come riferimenti nel codice.
   
### Query di esempio

Ecco alcune query di esempio che puoi provare. Queste dimostreranno come il server MCP e Copilot possono lavorare insieme per fornire documentazione e riferimenti contestuali istantanei senza uscire da VS Code:

- "Mostrami come usare i trigger di Azure Functions."
- "Inserisci un link alla documentazione ufficiale per Azure Key Vault."
- "Quali sono le migliori pratiche per la sicurezza delle risorse Azure?"
- "Trova un quickstart per i servizi Azure AI."

Queste query dimostreranno come il server MCP e Copilot possono lavorare insieme per fornire documentazione e riferimenti contestuali istantanei senza uscire da VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->