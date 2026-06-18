# Weather MCP Server

Questo è un esempio di MCP Server in Python che implementa strumenti meteo con risposte simulate. Può essere usato come base per il tuo MCP Server. Include le seguenti funzionalità:

- **Strumento Meteo**: Uno strumento che fornisce informazioni meteorologiche simulate basate sulla posizione fornita.
- **Connessione a Agent Builder**: Una funzione che ti permette di collegare il server MCP ad Agent Builder per test e debug.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Una funzione che ti permette di eseguire il debug del MCP Server usando MCP Inspector.

## Inizia con il template Weather MCP Server

> **Prerequisiti**
>
> Per eseguire il MCP Server sulla tua macchina di sviluppo locale, avrai bisogno di:
>
> - [Python](https://www.python.org/)
> - (*Opzionale - se preferisci uv*) [uv](https://github.com/astral-sh/uv)
> - [Estensione Debugger Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Preparare l'ambiente

Ci sono due approcci per configurare l'ambiente per questo progetto. Puoi scegliere quello che preferisci.

> Nota: Ricarica VSCode o il terminale per assicurarti che venga usato il python dell'ambiente virtuale dopo aver creato l'ambiente virtuale.

| Approccio | Passaggi |
| --------- | -------- |
| Usando `uv` | 1. Crea ambiente virtuale: `uv venv` <br>2. Esegui il comando di VSCode "***Python: Select Interpreter***" e seleziona il python dall'ambiente virtuale creato <br>3. Installa le dipendenze (incluso le dipendenze di sviluppo): `uv pip install -r pyproject.toml --extra dev` |
| Usando `pip` | 1. Crea ambiente virtuale: `python -m venv .venv` <br>2. Esegui il comando di VSCode "***Python: Select Interpreter***" e seleziona il python dall'ambiente virtuale creato<br>3. Installa le dipendenze (incluso le dipendenze di sviluppo): `pip install -e .[dev]` |

Dopo aver configurato l'ambiente, puoi eseguire il server sulla tua macchina locale tramite Agent Builder come MCP Client per iniziare:
1. Apri il pannello Debug di VS Code. Seleziona `Debug in Agent Builder` oppure premi `F5` per iniziare a fare il debug del MCP server.
2. Usa Microsoft Foundry Toolkit Agent Builder per testare il server con [questo prompt](../../../../../../../../../../../open_prompt_builder). Il server si connetterà automaticamente ad Agent Builder.
3. Clicca su `Run` per testare il server con il prompt.

**Congratulazioni**! Hai eseguito con successo il Weather MCP Server sulla tua macchina locale tramite Agent Builder come MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Cosa è incluso nel template

| Cartella / File | Contenuti                                     |
| --------------- | -------------------------------------------- |
| `.vscode`       | File VSCode per il debug                      |
| `.aitk`         | Configurazioni per Microsoft Foundry Toolkit |
| `src`           | Codice sorgente del server weather mcp       |

## Come fare il debug del Weather MCP Server

> Note:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) è uno strumento visivo per sviluppatori per testare e fare debug dei server MCP.
> - Tutti i metodi di debug supportano breakpoints, quindi puoi aggiungere breakpoints nel codice di implementazione dello strumento.

| Modalità di Debug | Descrizione | Passaggi per il debug |
| ----------------- | ----------- | --------------------- |
| Agent Builder     | Debug del MCP server in Agent Builder tramite Microsoft Foundry Toolkit. | 1. Apri il pannello Debug di VS Code. Seleziona `Debug in Agent Builder` e premi `F5` per iniziare il debug del MCP server.<br>2. Usa Microsoft Foundry Toolkit Agent Builder per testare il server con [questo prompt](../../../../../../../../../../../open_prompt_builder). Il server si connetterà automaticamente ad Agent Builder.<br>3. Clicca su `Run` per testare il server con il prompt. |
| MCP Inspector    | Debug del MCP server usando MCP Inspector. | 1. Installa [Node.js](https://nodejs.org/)<br>2. Configura Inspector: `cd inspector` && `npm install` <br>3. Apri il pannello Debug di VS Code. Seleziona `Debug SSE in Inspector (Edge)` o `Debug SSE in Inspector (Chrome)`. Premi F5 per iniziare il debug.<br>4. Quando MCP Inspector si avvierà nel browser, clicca il pulsante `Connect` per connettere questo MCP server.<br>5. Poi puoi `List Tools`, selezionare uno strumento, inserire parametri e `Run Tool` per fare il debug del tuo codice server.<br> |

## Porte Predefinite e personalizzazioni

| Modalità di Debug | Porte | Definizioni | Personalizzazioni | Nota |
| ----------------- | ----- | ----------- | ----------------- | ---- |
| Agent Builder     | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Modifica [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) per cambiare le porte sopra. | N/A |
| MCP Inspector    | 3001 (Server); 5173 e 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Modifica [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) per cambiare le porte sopra. | N/A |

## Feedback

Se hai commenti o suggerimenti per questo template, apri un issue nel [repository GitHub Microsoft Foundry Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->