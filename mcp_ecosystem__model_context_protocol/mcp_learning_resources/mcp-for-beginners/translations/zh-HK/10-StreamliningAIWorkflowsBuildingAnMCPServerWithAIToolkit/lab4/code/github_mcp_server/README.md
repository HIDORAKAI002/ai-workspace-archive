# Weather MCP Server

這是一個用 Python 實作的範例 MCP Server，提供天氣工具的模擬響應。它可用作您自己 MCP Server 的架構範本。包含以下功能：

- **天氣工具**：根據指定地點提供模擬的天氣資訊。
- **Git Clone 工具**：將 git 儲存庫複製到指定資料夾的工具。
- **VS Code 開啟工具**：可在 VS Code 或 VS Code Insiders 中打開資料夾的工具。
- **連接至 Agent Builder**：可以將 MCP Server 連接至 Agent Builder 以進行測試和除錯的功能。
- **在 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 中除錯**：使用 MCP Inspector 除錯 MCP Server 的功能。

## 使用 Weather MCP Server 範本快速開始

> **先決條件**
>
> 要在本機開發機器上執行 MCP Server，您需要：
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/)（git_clone_repo 工具所需）
> - [VS Code](https://code.visualstudio.com/) 或 [VS Code Insiders](https://code.visualstudio.com/insiders/)（open_in_vscode 工具所需）
> - （*可選 - 如果您偏好 uv*）[uv](https://github.com/astral-sh/uv)
> - [Python 除錯器擴充](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 準備環境

設定此專案環境有兩種方式，您可根據偏好選擇其中一種。

> 注意：建立虛擬環境後，請重新載入 VSCode 或終端機，以確保使用虛擬環境的 Python。

| 方法 | 步驟 |
| -------- | ----- |
| 使用 `uv` | 1. 建立虛擬環境：`uv venv` <br>2. 執行 VSCode 指令 "***Python: 選擇解譯器***" 並選擇剛建立的虛擬環境的 Python <br>3. 安裝依賴（含開發依賴）：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip` | 1. 建立虛擬環境：`python -m venv .venv` <br>2. 執行 VSCode 指令 "***Python: 選擇解譯器***" 並選擇剛建立的虛擬環境的 Python<br>3. 安裝依賴（含開發依賴）：`pip install -e .[dev]` |

完成環境設定後，您可以透過 Agent Builder 作為 MCP Client，在本機開發機器上啟動伺服器開始：

1. 開啟 VS Code 的除錯面板。選擇 `Debug in Agent Builder` 或按 `F5` 開始除錯 MCP Server。
2. 使用 AI Toolkit Agent Builder，並用[此提示詞](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連接到 Agent Builder。
3. 點擊 `Run` 以使用提示詞測試伺服器。

**恭喜您**！您已成功在本地開發機器透過 Agent Builder 作為 MCP Client 執行 Weather MCP Server。  
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 範本內含項目

| 資料夾 / 檔案 | 內容                                   |
| ------------ | -------------------------------------- |
| `.vscode`    | 用於除錯的 VSCode 設定檔              |
| `.aitk`      | AI Toolkit 配置                       |
| `src`        | 天氣 MCP Server 的原始碼              |

## 如何除錯 Weather MCP Server

> 注意事項：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是一款用於測試和除錯 MCP Server 的視覺化開發工具。
> - 所有除錯模式皆支持斷點，您可以在工具實作程式碼中新增斷點。

## 可用工具

### 天氣工具
`get_weather` 工具可提供指定地點的模擬天氣資訊。

| 參數       | 型別   | 說明                      |
| --------- | ------ | ------------------------- |
| `location` | string | 要查詢天氣的地點（例如城市名、州、省或座標） |

### Git Clone 工具
`git_clone_repo` 工具可將 git 儲存庫克隆到指定資料夾。

| 參數           | 型別   | 說明                        |
| -------------- | ------- | --------------------------- |
| `repo_url`     | string  | 要克隆的 git 儲存庫 URL      |
| `target_folder` | string  | 要克隆儲存庫的資料夾路徑    |

工具回傳 JSON 物件包含：
- `success`：布林值，表示操作是否成功
- `target_folder` 或 `error`：被克隆儲存庫的路徑或錯誤訊息

### VS Code 開啟工具
`open_in_vscode` 工具可在 VS Code 或 VS Code Insiders 中打開資料夾。

| 參數           | 型別         | 說明                         |
| -------------- | ------------ | ---------------------------- |
| `folder_path`  | string       | 要開啟的資料夾路徑            |
| `use_insiders` | boolean（可選） | 是否使用 VS Code Insiders 代替普通 VS Code |

工具回傳 JSON 物件包含：
- `success`：布林值，表示操作是否成功
- `message` 或 `error`：確認訊息或錯誤訊息

| 除錯模式       | 說明                                               | 除錯步驟                                                                                                                         |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Agent Builder | 在 Agent Builder 中透過 AI Toolkit 除錯 MCP Server | 1. 開啟 VS Code 除錯面板。選擇 `Debug in Agent Builder` 並按 `F5` 開始除錯 MCP Server。<br>2. 用 AI Toolkit Agent Builder 及[此提示詞](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連接 Agent Builder。<br>3. 點擊 `Run` 以用提示詞測試伺服器。 |
| MCP Inspector | 使用 MCP Inspector 除錯 MCP Server                   | 1. 安裝 [Node.js](https://nodejs.org/)<br>2. 設定 Inspector：`cd inspector` 並執行 `npm install`<br>3. 打開 VS Code 除錯面板。選擇 `Debug SSE in Inspector (Edge)` 或 `Debug SSE in Inspector (Chrome)`，按 F5 開始除錯。<br>4. MCP Inspector 在瀏覽器啟動後，點擊 `Connect` 按鈕連接此 MCP Server。<br>5. 之後即可使用 `List Tools`，選擇工具、輸入參數並 `Run Tool` 除錯您的伺服器程式碼。<br>|

## 預設埠號與自訂設定

| 除錯模式       | 埠號             | 定義檔案                            | 自訂說明                                           | 備註      |
| ------------- | ---------------- | ---------------------------------- | -------------------------------------------------- | --------- |
| Agent Builder | 3001             | [.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)、[__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) 來更改以上埠號 | 無        |
| MCP Inspector | 3001 (伺服器); 5173 與 3000 (Inspector) | [.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)、[__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) 來更改以上埠號 | 無        |

## 反饋

如果您對此範本有任何反饋或建議，請前往 [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) 開啟 issue。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件乃使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保翻譯的準確性，但請注意自動翻譯可能存在錯誤或不準確之處。原始文件之母語版本應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或誤讀承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->