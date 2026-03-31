# Weather MCP Server

Este é um exemplo de MCP Server em Python que implementa ferramentas meteorológicas com respostas simuladas. Pode ser usado como um esqueleto para o seu próprio MCP Server. Inclui as seguintes funcionalidades: 

- **Weather Tool**: Uma ferramenta que fornece informações meteorológicas simuladas com base na localização fornecida.
- **Conectar ao Agent Builder**: Uma funcionalidade que permite ligar o servidor MCP ao Agent Builder para testes e depuração.
- **Depurar no [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Uma funcionalidade que permite depurar o MCP Server usando o MCP Inspector.

## Começar com o template Weather MCP Server

> **Pré-requisitos**
>
> Para executar o MCP Server na sua máquina de desenvolvimento local, vai precisar de:
>
> - [Python](https://www.python.org/)
> - (*Opcional - se preferir uv*) [uv](https://github.com/astral-sh/uv)
> - [Extensão Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Preparar o ambiente

Existem duas abordagens para configurar o ambiente para este projeto. Pode escolher uma delas com base na sua preferência.

> Nota: Recarregue o VSCode ou terminal para garantir que o python do ambiente virtual está a ser usado após criar o ambiente virtual.

| Abordagem | Passos |
| -------- | ----- |
| Usar `uv` | 1. Criar ambiente virtual: `uv venv` <br>2. Execute o comando do VSCode "***Python: Select Interpreter***" e selecione o python do ambiente virtual criado <br>3. Instale as dependências (inclui dependências de desenvolvimento): `uv pip install -r pyproject.toml --extra dev` |
| Usar `pip` | 1. Criar ambiente virtual: `python -m venv .venv` <br>2. Execute o comando do VSCode "***Python: Select Interpreter***" e selecione o python do ambiente virtual criado<br>3. Instale as dependências (inclui dependências de desenvolvimento): `pip install -e .[dev]` | 

Após configurar o ambiente, pode executar o servidor na sua máquina local via Agent Builder como MCP Client para começar:
1. Abra o painel de Debug do VS Code. Selecione `Debug in Agent Builder` ou pressione `F5` para iniciar a depuração do MCP server.
2. Use o AI Toolkit Agent Builder para testar o servidor com [este prompt](../../../../../../../../../../../open_prompt_builder). O servidor será automaticamente ligado ao Agent Builder.
3. Clique em `Run` para testar o servidor com o prompt.

**Parabéns**! Executou com sucesso o Weather MCP Server na sua máquina local via Agent Builder como MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## O que está incluído no template

| Pasta / Ficheiro | Conteúdos                                    |
| ------------ | -------------------------------------------- |
| `.vscode`    | Ficheiros do VSCode para depuração           |
| `.aitk`      | Configurações para o AI Toolkit               |
| `src`        | O código fonte para o servidor weather mcp    |

## Como depurar o Weather MCP Server

> Notas:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) é uma ferramenta de desenvolvimento visual para testar e depurar MCP servers.
> - Todos os modos de depuração suportam breakpoints, para que possa adicionar breakpoints no código de implementação da ferramenta.

| Modo de Depuração | Descrição | Passos para depurar |
| ---------- | ----------- | ------------------ |
| Agent Builder | Depurar o MCP server no Agent Builder via AI Toolkit. | 1. Abra o painel de Debug do VS Code. Selecione `Debug in Agent Builder` e pressione `F5` para iniciar a depuração do MCP server.<br>2. Use o AI Toolkit Agent Builder para testar o servidor com [este prompt](../../../../../../../../../../../open_prompt_builder). O servidor será automaticamente ligado ao Agent Builder.<br>3. Clique em `Run` para testar o servidor com o prompt. |
| MCP Inspector | Depurar o MCP server usando o MCP Inspector. | 1. Instale o [Node.js](https://nodejs.org/)<br> 2. Configurar o Inspector: `cd inspector` && `npm install` <br> 3. Abra o painel de Debug do VS Code. Selecione `Debug SSE in Inspector (Edge)` ou `Debug SSE in Inspector (Chrome)`. Pressione F5 para começar a depurar.<br> 4. Quando o MCP Inspector abrir no browser, clique em `Connect` para ligar este MCP server.<br> 5. Depois pode `List Tools`, selecione uma ferramenta, insira parâmetros, e `Run Tool` para depurar o código do seu servidor.<br> |

## Portas predefinidas e personalizações

| Modo de Depuração | Portas | Definições | Personalizações | Nota |
| ---------- | ----- | ---------- | --------------- |----- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) para mudar as portas acima. | N/A |
| MCP Inspector | 3001 (Servidor); 5173 e 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edite [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) para mudar as portas acima.| N/A |

## Feedback

Se tiver algum feedback ou sugestões para este template, por favor abra uma issue no [repositório GitHub do AI Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos por garantir a precisão, por favor tenha em conta que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte oficial. Para informações críticas, recomenda-se a tradução profissional por um tradutor humano. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->