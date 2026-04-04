# Weather MCP Server

這是一個使用 Python 實作的範例 MCP Server，具有天氣工具與模擬回應。可以作為您自有 MCP Server 的骨架。包含以下功能：

- **天氣工具**：根據給定地點提供模擬的天氣資訊工具。
- **連接至 Agent Builder**：能將 MCP Server 連接至 Agent Builder 以便測試與除錯。
- **在 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 中除錯**：能使用 MCP Inspector 進行 MCP Server 除錯。

## 使用 Weather MCP Server 範本快速開始

> **先決條件**
>
> 在您的本機開發環境執行 MCP Server，您需要：
>
> - [Python](https://www.python.org/)
> - （*可選 - 若偏好使用 uv*）[uv](https://github.com/astral-sh/uv)
> - [Python 除錯器擴充套件](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 準備環境

您可以選擇以下兩種方式設置本專案的開發環境，依自己喜好選擇。

> 注意：建立虛擬環境後，請重新載入 VSCode 或終端機，確保使用虛擬環境的 Python。

| 方 式 | 步 驟 |
| -------- | ----- |
| 使用 `uv` | 1. 建立虛擬環境：`uv venv` <br>2. 在 VSCode 執行命令 "***Python: Select Interpreter***"，選擇剛建立好的虛擬環境 Python <br>3. 安裝依賴（包含開發依賴）：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip` | 1. 建立虛擬環境：`python -m venv .venv` <br>2. 在 VSCode 執行命令 "***Python: Select Interpreter***"，選擇剛建立好的虛擬環境 Python<br>3. 安裝依賴（包含開發依賴）：`pip install -e .[dev]` | 

完成環境設置後，可以透過 Agent Builder（作為 MCP Client）在本機啟動伺服器以開始使用：
1. 開啟 VS Code 除錯面板，選擇 `Debug in Agent Builder`，或按 `F5` 開始除錯 MCP Server。
2. 利用 AI Toolkit Agent Builder 以[此提示語](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連接到 Agent Builder。
3. 點擊 `Run`，以該提示語測試伺服器。

**恭喜您**！已成功在您的本機透過 Agent Builder 作為 MCP Client 執行 Weather MCP Server。
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 範本內容

| 資料夾 / 檔案 | 內容                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | 用於除錯的 VSCode 設定檔                 |
| `.aitk`      | AI Toolkit 的設定                         |
| `src`        | weather mcp server 的原始程式碼           |

## 如何除錯 Weather MCP Server

> 注意事項：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是視覺化的開發工具，用於測試與除錯 MCP 伺服器。
> - 所有除錯模式皆支援斷點，您可在工具實作程式碼中新增斷點。

| 除錯模式 | 說明 | 除錯步驟 |
| ---------- | ----------- | --------------- |
| Agent Builder | 在 AI Toolkit 的 Agent Builder 中除錯 MCP 伺服器。 | 1. 開啟 VS Code 除錯面板，選擇 `Debug in Agent Builder`，按下 `F5` 開始除錯 MCP Server。<br>2. 利用 AI Toolkit Agent Builder 以[此提示語](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連接到 Agent Builder。<br>3. 點擊 `Run` 以該提示語測試伺服器。 |
| MCP Inspector | 使用 MCP Inspector 來除錯 MCP 伺服器。 | 1. 安裝 [Node.js](https://nodejs.org/)<br> 2. 設定 Inspector：`cd inspector` 並執行 `npm install` <br> 3. 開啟 VS Code 除錯面板，選擇 `Debug SSE in Inspector (Edge)` 或 `Debug SSE in Inspector (Chrome)`，按下 F5 開始除錯。<br> 4. 當 MCP Inspector 在瀏覽器開啟時，點擊 `Connect` 按鈕連接此 MCP 伺服器。<br> 5. 接著可以 `List Tools`，選擇工具，輸入參數，並 `Run Tool` 以除錯您的伺服器程式碼。<br> |

## 預設埠號與自訂配置

| 除錯模式 | 埠號 | 定義位置 | 可自訂項目 | 備註 |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 修改上述埠號。 | 無 |
| MCP Inspector | 3001（伺服器）；5173 和 3000（Inspector） | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 修改上述埠號。| 無 |

## 反饋意見

如果您對此範本有任何反饋或建議，請在 [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) 開啟議題。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原文之母語版本應視為權威資料來源。對於重要資訊，建議採用專業人工翻譯。因使用本翻譯內容所導致之任何誤解或誤釋，我們概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->