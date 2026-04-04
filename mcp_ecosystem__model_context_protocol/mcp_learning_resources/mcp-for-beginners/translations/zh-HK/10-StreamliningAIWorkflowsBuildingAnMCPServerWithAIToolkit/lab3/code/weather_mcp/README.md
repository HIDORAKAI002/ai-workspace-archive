# Weather MCP 伺服器

這是一個用 Python 實作的範例 MCP 伺服器，具備天氣工具和模擬回應。它可作為你自己 MCP 伺服器的骨架。包含以下功能：

- **Weather Tool**：一個基於給定地點提供模擬天氣資訊的工具。
- **連接到 Agent Builder**：允許你將 MCP 伺服器連接到 Agent Builder 以便測試和除錯。
- **在 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 中除錯**：允許你用 MCP Inspector 來除錯 MCP 伺服器。

## 開始使用 Weather MCP 伺服器模板

> **先決條件**
>
> 若要在本地開發機器上執行 MCP 伺服器，你需要：
>
> - [Python](https://www.python.org/)
> - (*可選 - 若喜歡使用 uv*) [uv](https://github.com/astral-sh/uv)
> - [Python 除錯擴充功能](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 準備環境

設定本專案環境有兩種方法，你可以依照偏好任選其一。

> 注意：建立虛擬環境後，請重新載入 VSCode 或終端機以確保使用虛擬環境的 python。

| 方法 | 步驟 |
| -------- | ----- |
| 使用 `uv` | 1. 建立虛擬環境：`uv venv` <br>2. 執行 VSCode 指令 "***Python: Select Interpreter***" 並選擇剛建立虛擬環境的 python <br>3. 安裝依賴(包含開發依賴)：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip` | 1. 建立虛擬環境：`python -m venv .venv` <br>2. 執行 VSCode 指令 "***Python: Select Interpreter***" 並選擇剛建立虛擬環境的 python<br>3. 安裝依賴(包含開發依賴)：`pip install -e .[dev]` | 

設定好環境後，你可以透過 Agent Builder 作為 MCP 用戶端在本地開發機器執行伺服器開始：
1. 打開 VS Code 除錯面板。選擇 `Debug in Agent Builder` 或按 `F5` 開始除錯 MCP 伺服器。
2. 使用 AI Toolkit Agent Builder 以 [此提示語](../../../../../../../../../../../open_prompt_builder) 測試伺服器。伺服器會自動連線到 Agent Builder。
3. 點擊 `Run` 以該提示語測試伺服器。

**恭喜！** 你已成功在本地開發機器透過 Agent Builder 作為 MCP 用戶端執行 Weather MCP 伺服器。
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 模板包含內容

| 資料夾 / 檔案| 內容                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode 用於除錯的檔案                     |
| `.aitk`      | AI Toolkit 配置                          |
| `src`        | weather mcp 伺服器的原始碼               |

## 如何除錯 Weather MCP 伺服器

> 注意：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是一款用於測試和除錯 MCP 伺服器的視覺化開發工具。
> - 所有除錯模式均支援斷點，因此你可以對工具實作程式碼設置斷點。

| 除錯模式 | 描述 | 除錯步驟 |
| ---------- | ----------- | --------------- |
| Agent Builder | 利用 AI Toolkit 在 Agent Builder 中除錯 MCP 伺服器。 | 1. 打開 VS Code 除錯面板。選擇 `Debug in Agent Builder` 並按 `F5` 開始除錯 MCP 伺服器。<br>2. 使用 AI Toolkit Agent Builder，使用[此提示語](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連線到 Agent Builder。<br>3. 點擊 `Run` 以提示語測試伺服器。 |
| MCP Inspector | 使用 MCP Inspector 除錯 MCP 伺服器。 | 1. 安裝 [Node.js](https://nodejs.org/)<br> 2. 設置 Inspector：`cd inspector` 並執行 `npm install` <br> 3. 打開 VS Code 除錯面板。選擇 `Debug SSE in Inspector (Edge)` 或 `Debug SSE in Inspector (Chrome)`，按 F5 開始除錯。<br> 4. MCP Inspector 在瀏覽器啟動後，點擊 `Connect` 按鈕連接此 MCP 伺服器。<br> 5. 接著你可以 `List Tools`，選擇工具，輸入參數，並 `Run Tool` 來除錯伺服器程式碼。<br> |

## 預設連接埠與自訂

| 除錯模式 | 埠號 | 定義位置 | 自訂位置 | 備註 |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 可變更上述連接埠。 | 無 |
| MCP Inspector | 3001 (伺服器端)；5173 與 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 可變更上述連接埠。| 無 |

## 反饋

若你有任何反饋或建議，請在 [AI Toolkit GitHub 倉庫](https://github.com/microsoft/vscode-ai-toolkit/issues) 開啟 issue。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件乃使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。儘管我們致力於確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於重要資訊，建議採用專業人工翻譯。本公司不對因使用本翻譯而引起的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->