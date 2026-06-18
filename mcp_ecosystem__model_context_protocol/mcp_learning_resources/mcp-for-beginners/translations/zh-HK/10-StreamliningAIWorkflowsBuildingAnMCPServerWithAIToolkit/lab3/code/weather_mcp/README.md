# Weather MCP Server

這是一個用 Python 實作帶有模擬回應的天氣工具的示範 MCP Server。它可以作為您自行開發 MCP Server 的骨架。它包含以下功能：

- **Weather Tool**：根據提供的位置，提供模擬天氣資訊的工具。
- **連接 Agent Builder**：可將 MCP 伺服器連接至 Agent Builder，方便測試與除錯。
- **在 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 中除錯**：可使用 MCP Inspector 除錯 MCP Server 的功能。

## 使用 Weather MCP Server 範本開始

> <strong>先決條件</strong>
>
> 要在您的本地開發機執行 MCP Server，您需要：
>
> - [Python](https://www.python.org/)
> - （*選擇性 - 若偏好 uv*）[uv](https://github.com/astral-sh/uv)
> - [Python 除錯擴充套件](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 準備環境

有兩種方式可用來設定本專案的環境。您可依個人偏好選擇其中一種。

> 注意：建立虛擬環境後，請重新載入 VSCode 或終端機，以確保使用虛擬環境的 Python。

| 方式        | 步驟                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------- |
| 使用 `uv`   | 1. 建立虛擬環境：`uv venv` <br>2. 執行 VSCode 命令 "***Python: Select Interpreter***"，並選取所建立的虛擬環境 Python <br>3. 安裝依賴（含開發依賴）：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip`  | 1. 建立虛擬環境：`python -m venv .venv` <br>2. 執行 VSCode 命令 "***Python: Select Interpreter***"，並選取所建立的虛擬環境 Python <br>3. 安裝依賴（含開發依賴）：`pip install -e .[dev]` |

設定環境後，即可透過 Agent Builder 當作 MCP Client 在本地開發機執行伺服器開始：
1. 開啟 VS Code 除錯面板。選擇 `Debug in Agent Builder` 或按 `F5` 開始除錯 MCP 伺服器。
2. 使用 Microsoft Foundry Toolkit Agent Builder 搭配[此提示](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連線至 Agent Builder。
3. 按下 `Run` 使用提示測試伺服器。

<strong>恭喜</strong>！您已成功透過 Agent Builder（作為 MCP Client）在本地開發機執行 Weather MCP Server。
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 範本包含內容

| 資料夾 / 檔案 | 內容                                      |
| ------------- | ----------------------------------------- |
| `.vscode`     | 用於除錯的 VSCode 設定檔                  |
| `.aitk`       | Microsoft Foundry Toolkit 的設定檔       |
| `src`         | weather mcp server 的原始程式碼           |

## 如何除錯 Weather MCP Server

> 注意：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是一款用於測試及除錯 MCP 伺服器的視覺化開發工具。
> - 所有除錯模式均支援斷點，因此您可在工具實作程式中新增斷點。

| 除錯模式        | 說明                                      | 除錯步驟 |
| --------------- | ----------------------------------------- | -------- |
| Agent Builder   | 透過 Microsoft Foundry Toolkit 在 Agent Builder 中除錯 MCP 伺服器。 | 1. 開啟 VS Code 除錯面板。選擇 `Debug in Agent Builder` 並按 `F5` 開始除錯 MCP 伺服器。<br>2. 使用 Microsoft Foundry Toolkit Agent Builder 搭配[此提示](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連線至 Agent Builder。<br>3. 按下 `Run` 使用提示測試伺服器。 |
| MCP Inspector  | 使用 MCP Inspector 除錯 MCP 伺服器。    | 1. 安裝 [Node.js](https://nodejs.org/)<br>2. 設定 Inspector：`cd inspector` && `npm install` <br>3. 開啟 VS Code 除錯面板。選擇 `Debug SSE in Inspector (Edge)` 或 `Debug SSE in Inspector (Chrome)`，按 F5 開始除錯。<br>4. 當 MCP Inspector 瀏覽器啟動時，按 `Connect` 按鈕以連線至本 MCP 伺服器。<br>5. 接著可使用 `List Tools`，選擇工具、輸入參數並按 `Run Tool` 來除錯伺服器程式碼。<br> |

## 預設埠號與自訂

| 除錯模式       | 埠號                | 定義                                  | 自訂                                | 備註 |
| -------------- | ------------------- | ----------------------------------- | --------------------------------- | ---- |
| Agent Builder  | 3001                | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)    | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 以修改上述埠號。 | 無   |
| MCP Inspector | 3001（伺服器）；5173 與 3000（Inspector） | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)    | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 以修改上述埠號。| 無   |

## 反饋

如果您對本範本有任何反饋或建議，請在 [Microsoft Foundry Toolkit GitHub 儲存庫](https://github.com/microsoft/vscode-ai-toolkit/issues) 開啟 issue。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->