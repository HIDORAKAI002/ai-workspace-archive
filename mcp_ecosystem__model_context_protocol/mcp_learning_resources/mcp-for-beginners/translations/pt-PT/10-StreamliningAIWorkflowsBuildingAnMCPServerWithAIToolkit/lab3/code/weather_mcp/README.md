# Weather MCP Server

Este é um exemplo de MCP Server em Python que implementa ferramentas meteorológicas com respostas simuladas. Pode ser utilizado como um modelo para o seu próprio MCP Server. Inclui as seguintes funcionalidades:

- **Weather Tool**: Uma ferramenta que fornece informações meteorológicas simuladas com base na localização fornecida.
- **Conectar ao Agent Builder**: Uma funcionalidade que permite conectar o MCP server ao Agent Builder para testes e depuração.
- **Depurar no [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Uma funcionalidade que permite depurar o MCP Server usando o MCP Inspector.

## Começar com o template Weather MCP Server

> **Pré-requisitos**
>
> Para executar o MCP Server na sua máquina de desenvolvimento local, será necessário:
>
> - [Python](https://www.python.org/)
> - (*Opcional - se preferir uv*) [uv](https://github.com/astral-sh/uv)
> - [Extensão Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Preparar ambiente

Existem duas abordagens para configurar o ambiente para este projeto. Pode escolher uma delas conforme a sua preferência.

> Nota: Reinicie o VSCode ou terminal para garantir que o python do ambiente virtual é usado após a criação do ambiente virtual.

| Abordagem | Passos |
| --------- | ------ |
| Usar `uv` | 1. Criar ambiente virtual: `uv venv` <br>2. Executar o comando do VSCode "***Python: Select Interpreter***" e selecionar o python do ambiente virtual criado <br>3. Instalar dependências (incluindo dependências de desenvolvimento): `uv pip install -r pyproject.toml --extra dev` |
| Usar `pip` | 1. Criar ambiente virtual: `python -m venv .venv` <br>2. Executar o comando do VSCode "***Python: Select Interpreter***" e selecionar o python do ambiente virtual criado<br>3. Instalar dependências (incluindo dependências de desenvolvimento): `pip install -e .[dev]` |

Após configurar o ambiente, pode executar o servidor na sua máquina de desenvolvimento local via Agent Builder como MCP Client para começar:
1. Abra o painel de Debug do VS Code. Selecione `Debug in Agent Builder` ou pressione `F5` para iniciar a depuração do MCP server.
2. Use o Microsoft Foundry Toolkit Agent Builder para testar o servidor com [este prompt](../../../../../../../../../../../open_prompt_builder). O servidor será automaticamente conectado ao Agent Builder.
3. Clique em `Run` para testar o servidor com o prompt.

**Parabéns**! Conseguiu executar com sucesso o Weather MCP Server na sua máquina de desenvolvimento local via Agent Builder como MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## O que está incluído no template

| Pasta / Ficheiro | Conteúdos                                  |
| ---------------- | ----------------------------------------- |
| `.vscode`        | Ficheiros do VSCode para depuração        |
| `.aitk`          | Configurações para Microsoft Foundry Toolkit |
| `src`            | Código fonte do servidor weather mcp     |

## Como depurar o Weather MCP Server

> Notas:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) é uma ferramenta visual para programadores testarem e depurarem MCP servers.
> - Todos os modos de depuração suportam breakpoints, pelo que pode adicionar breakpoints no código da implementação da ferramenta.

| Modo de Depuração | Descrição | Passos para depurar |
| ----------------- | --------- | ------------------- |
| Agent Builder | Depure o MCP server no Agent Builder via Microsoft Foundry Toolkit. | 1. Abra o painel de Debug do VS Code. Selecione `Debug in Agent Builder` e pressione `F5` para iniciar a depuração do MCP server.<br>2. Use o Microsoft Foundry Toolkit Agent Builder para testar o servidor com [este prompt](../../../../../../../../../../../open_prompt_builder). O servidor será automaticamente conectado ao Agent Builder.<br>3. Clique `Run` para testar o servidor com o prompt. |
| MCP Inspector | Depure o MCP server usando o MCP Inspector. | 1. Instale o [Node.js](https://nodejs.org/)<br> 2. Configure o Inspector: `cd inspector` && `npm install` <br> 3. Abra o painel de Debug do VS Code. Selecione `Debug SSE in Inspector (Edge)` ou `Debug SSE in Inspector (Chrome)`. Pressione F5 para iniciar a depuração.<br> 4. Quando o MCP Inspector arrancar no navegador, clique no botão `Connect` para ligar este MCP server.<br> 5. Pode então `List Tools`, selecionar uma ferramenta, inserir parâmetros, e `Run Tool` para depurar o código do servidor.<br> |

## Portas padrão e personalizações

| Modo de Depuração | Portas | Definições | Personalizações | Nota |
| ----------------- | ------ | ---------- | --------------- | ----- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) para alterar as portas acima. | N/D |
| MCP Inspector | 3001 (Servidor); 5173 e 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) para alterar as portas acima.| N/D |

## Feedback

Se tiver algum feedback ou sugestões para este template, por favor abra uma issue no [repositório GitHub do Microsoft Foundry Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->