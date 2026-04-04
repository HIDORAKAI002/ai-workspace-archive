# Weather MCP Server

這是一個使用 Python 實作天氣工具並提供模擬回應的 MCP Server 範例。它可以作為您自己的 MCP Server 的框架。這個範例包含以下功能：

- **天氣工具**：根據指定地點提供模擬的天氣資訊。
- **連接至 Agent Builder**：允許您將 MCP 伺服器連接至 Agent Builder 以進行測試與除錯。
- **在 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 中除錯**：使用 MCP Inspector 來除錯 MCP Server 的功能。

## 開始使用 Weather MCP Server 範本

> **先決條件**
>
> 想在本地開發機執行 MCP Server，您將需要：
>
> - [Python](https://www.python.org/)
> - （*可選 - 若您偏好使用 uv*）[uv](https://github.com/astral-sh/uv)
> - [Python 除錯擴充套件](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 準備環境

本專案的環境設定有兩種方法，您可以依照偏好選擇其中一種。

> 注意：建立虛擬環境後，請重新載入 VSCode 或終端機以確保使用虛擬環境中的 Python。

| 方法       | 步驟                                             |
| ---------- | ------------------------------------------------ |
| 使用 `uv`  | 1. 建立虛擬環境：`uv venv` <br>2. 執行 VSCode 指令「***Python: Select Interpreter***」，並選取剛建立的虛擬環境中的 Python<br>3. 安裝相依套件（含開發相依套件）：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip` | 1. 建立虛擬環境：`python -m venv .venv` <br>2. 執行 VSCode 指令「***Python: Select Interpreter***」，並選取剛建立的虛擬環境中的 Python<br>3. 安裝相依套件（含開發相依套件）：`pip install -e .[dev]` | 

設定好環境後，您可以透過 Agent Builder 以 MCP Client 身份在本地開發機執行伺服器開始開發：
1. 開啟 VS Code 除錯面板。選擇「Debug in Agent Builder」或按 `F5` 開始除錯 MCP Server。
2. 使用 AI Toolkit Agent Builder 搭配[此提詞](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連接到 Agent Builder。
3. 按下「Run」用此提詞測試伺服器。

**恭喜您**！您已成功透過 Agent Builder 以 MCP Client 身份在本地機器執行 Weather MCP Server。
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 範本包含的內容

| 資料夾 / 檔案 | 內容                              |
| -------------- | ---------------------------------- |
| `.vscode`      | VSCode 的除錯設定檔案             |
| `.aitk`        | AI Toolkit 的設定                 |
| `src`          | 天氣 MCP Server 的原始程式碼       |

## 如何除錯 Weather MCP Server

> 注意：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是一個視覺化開發工具，用於測試與除錯 MCP 伺服器。
> - 所有除錯模式皆支援斷點，可將斷點加入工具實作程式碼中。

| 除錯模式       | 說明                               | 除錯步驟 |
| -------------- | ---------------------------------- | -------- |
| Agent Builder  | 透過 AI Toolkit 在 Agent Builder 中除錯 MCP Server。| 1. 開啟 VS Code 除錯面板。選擇「Debug in Agent Builder」並按 `F5` 開始除錯 MCP 伺服器。<br>2. 使用 AI Toolkit Agent Builder 搭配[此提詞](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連接到 Agent Builder。<br>3. 點選「Run」以該提詞測試伺服器。 |
| MCP Inspector | 使用 MCP Inspector 除錯 MCP Server。 | 1. 安裝 [Node.js](https://nodejs.org/)<br>2. 設定 Inspector：`cd inspector` 並執行 `npm install` <br>3. 開啟 VS Code 除錯面板。選擇「Debug SSE in Inspector (Edge)」或「Debug SSE in Inspector (Chrome)」，按 `F5` 開始除錯。<br>4. MCP Inspector 在瀏覽器開啟時，點擊「Connect」按鈕連接此 MCP Server。<br>5. 接著可「List Tools」、選擇工具、輸入參數並「Run Tool」以除錯伺服器程式碼。<br> |

## 預設埠號與客製化設定

| 除錯模式      | 埠號              | 定義檔                             | 客製化方式                                                         | 備註 |
| --------------| ------------------| ---------------------------------- | ------------------------------------------------------------------ | ---- |
| Agent Builder | 3001              | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)   | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 更改上述埠號 | 無   |
| MCP Inspector | 3001 (伺服器端)；5173及3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)   | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 更改上述埠號 | 無   |

## 反饋

如果您有任何關於此範本的回饋或建議，請於 [AI Toolkit GitHub 儲存庫](https://github.com/microsoft/vscode-ai-toolkit/issues) 開啟議題。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於翻譯準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->