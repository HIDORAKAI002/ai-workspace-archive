# 🐙 Modulo 4: Sviluppo Pratico MCP - Server Personalizzato per Clonare GitHub

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Avvio Rapido:** Costruisci un server MCP pronto per la produzione che automatizza il cloning di repository GitHub e l’integrazione con VS Code in soli 30 minuti!

## 🎯 Obiettivi di Apprendimento

Al termine di questo laboratorio, sarai in grado di:

- ✅ Creare un server MCP personalizzato per flussi di lavoro di sviluppo reali
- ✅ Implementare la funzionalità di clonazione di repository GitHub tramite MCP
- ✅ Integrare server MCP personalizzati con VS Code e Agent Builder
- ✅ Usare GitHub Copilot Agent Mode con strumenti MCP personalizzati
- ✅ Testare e distribuire server MCP personalizzati in ambienti di produzione

## 📋 Prerequisiti

- Completamento dei Laboratori 1-3 (fondamenti MCP e sviluppo avanzato)
- Abbonamento a GitHub Copilot ([iscrizione gratuita disponibile](https://github.com/github-copilot/signup))
- VS Code con le estensioni Microsoft Foundry Toolkit e GitHub Copilot
- Git CLI installato e configurato

## 🏗️ Panoramica del Progetto

### **Sfida di Sviluppo Reale**
Noi sviluppatori utilizziamo frequentemente GitHub per clonare repository e aprirli in VS Code o VS Code Insiders. Questo processo manuale prevede:
1. Aprire il terminale/command prompt
2. Navigare nella directory desiderata
3. Eseguire il comando `git clone`
4. Aprire VS Code nella directory clonata

**La nostra soluzione MCP semplifica tutto questo in un unico comando intelligente!**

### **Cosa Costruirai**
Un **GitHub Clone MCP Server** (`git_mcp_server`) che offre:

| Funzionalità | Descrizione | Vantaggio |
|--------------|-------------|-----------|
| 🔄 **Clonazione Intelligente di Repository** | Clona repository GitHub con validazione | Controllo errori automatico |
| 📁 **Gestione Intelligente delle Directory** | Verifica e crea directory in modo sicuro | Evita sovrascritture |
| 🚀 **Integrazione VS Code multipiattaforma** | Apri progetti in VS Code/Insiders | Transizione fluida del flusso di lavoro |
| 🛡️ **Gestione Robusta degli Errori** | Gestisci problemi di rete, permessi e percorsi | Affidabilità pronta per la produzione |

---

## 📖 Implementazione Passo per Passo

### Passo 1: Crea un Agent GitHub in Agent Builder

1. **Avvia Agent Builder** tramite l’estensione Microsoft Foundry Toolkit
2. **Crea un nuovo agent** con la seguente configurazione:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inizializza il server MCP personalizzato:**
   - Vai su **Tools** → **Add Tool** → **MCP Server**
   - Seleziona **"Create A new MCP Server"**
   - Scegli il modello **Python** per la massima flessibilità
   - **Nome Server:** `git_mcp_server`

### Passo 2: Configura GitHub Copilot Agent Mode

1. **Apri GitHub Copilot** in VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Seleziona Agent Model** nell’interfaccia Copilot
3. **Scegli il modello Claude 3.7** per capacità di ragionamento avanzate
4. **Abilita l’integrazione MCP** per l’accesso agli strumenti

> **💡 Consiglio Pro:** Claude 3.7 offre una comprensione superiore dei flussi di lavoro di sviluppo e dei modelli di gestione degli errori.

### Passo 3: Implementa la Funzionalità Core del Server MCP

**Usa il seguente prompt dettagliato con GitHub Copilot Agent Mode:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Passo 4: Testa il Tuo Server MCP

#### 4a. Test in Agent Builder

1. **Avvia la configurazione di debug** per Agent Builder
2. **Configura il tuo agent con questo prompt di sistema:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testa con scenari utente realistici:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/it/DebugAgent.81d152370c503241.webp)

**Risultati Attesi:**
- ✅ Clonazione riuscita con conferma del percorso
- ✅ Avvio automatico di VS Code
- ✅ Messaggi di errore chiari per scenari non validi
- ✅ Gestione corretta dei casi limite

#### 4b. Test in MCP Inspector


![MCP Inspector Testing](../../../../translated_images/it/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Congratulazioni!** Hai creato con successo un server MCP pratico e pronto per la produzione che risolve sfide reali di flussi di lavoro di sviluppo. Il tuo server personalizzato per il cloning GitHub dimostra la potenza di MCP per automatizzare e potenziare la produttività degli sviluppatori.

### 🏆 Obiettivi Raggiunti:
- ✅ **Sviluppatore MCP** - Creato server MCP personalizzato
- ✅ **Automazione Flussi di Lavoro** - Snellito processi di sviluppo  
- ✅ **Esperto di Integrazione** - Collegato più strumenti di sviluppo
- ✅ **Pronto per la Produzione** - Costruito soluzioni distribuibili

---

## 🎓 Conclusione del Workshop: Il Tuo Percorso con il Model Context Protocol

**Caro Partecipante al Workshop,**

Congratulazioni per aver completato tutti e quattro i moduli del workshop sul Model Context Protocol! Hai percorso molta strada, dalla comprensione dei concetti base del Microsoft Foundry Toolkit alla creazione di server MCP pronti per la produzione che risolvono sfide reali di sviluppo.

### 🚀 Riepilogo del Tuo Percorso di Apprendimento:

**[Modulo 1](../lab1/README.md)**: Hai iniziato esplorando i fondamenti del Microsoft Foundry Toolkit, i test dei modelli e creando il tuo primo AI agent.

**[Modulo 2](../lab2/README.md)**: Hai imparato l’architettura MCP, integrato Playwright MCP e costruito il tuo primo agent per l'automazione del browser.

**[Modulo 3](../lab3/README.md)**: Sei passato allo sviluppo di server MCP personalizzati con il Weather MCP server e hai padroneggiato gli strumenti di debugging.

**[Modulo 4](../lab4/README.md)**: Ora hai applicato tutto creando uno strumento pratico di automazione dei flussi di lavoro per i repository GitHub.

### 🌟 Cosa Hai Padroneggiato:

- ✅ **Ecosistema Microsoft Foundry Toolkit**: Modelli, agenti e pattern di integrazione
- ✅ **Architettura MCP**: Design client-server, protocolli di trasporto e sicurezza
- ✅ **Strumenti per Sviluppatori**: Da Playground a Inspector fino al deployment in produzione
- ✅ **Sviluppo Personalizzato**: Costruire, testare e distribuire i propri server MCP
- ✅ **Applicazioni Pratiche**: Risolvere sfide reali di flussi di lavoro con AI

### 🔮 Passi Successivi:

1. **Costruisci il Tuo Server MCP**: Applica queste competenze per automatizzare i tuoi flussi di lavoro unici
2. **Entra nella Comunità MCP**: Condividi le tue creazioni e impara dagli altri
3. **Esplora Integrazioni Avanzate**: Collega server MCP a sistemi enterprise
4. **Contribuisci all’Open Source**: Aiuta a migliorare gli strumenti e la documentazione MCP

Ricorda, questo workshop è solo l’inizio. L’ecosistema Model Context Protocol evolve rapidamente e ora sei pronto per essere all’avanguardia negli strumenti di sviluppo potenziati dall’AI.

**Grazie per la partecipazione e l’impegno nell’apprendimento!**

Speriamo che questo workshop abbia acceso idee che trasformeranno il modo in cui costruisci e interagisci con strumenti AI nel tuo percorso di sviluppo.

**Buona programmazione!**

---

## Cosa Fare Dopo

Congratulazioni per aver completato tutti i laboratori del Modulo 10!

- Torna a: [Panoramica Modulo 10](../README.md)
- Continua a: [Modulo 11: Laboratori Pratici MCP Server](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->