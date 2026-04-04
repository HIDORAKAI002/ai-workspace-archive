# Weather MCP Server

這是一個以 Python 實作的 Weather MCP Server 範例，內含天氣工具與模擬回應，可作為您自己的 MCP Server 建置骨架。特色包含：

- **天氣工具**：依指定地點回傳模擬氣象資訊的工具。
- **Git Clone 工具**：可將 git 倉庫複製到指定資料夾的工具。
- **VS Code 開啟工具**：可於 VS Code 或 VS Code Insiders 中開啟資料夾的工具。
- **連接 Agent Builder**：允許您將 MCP server 連接至 Agent Builder 以便測試和偵錯。
- **在 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 中偵錯**：允許您利用 MCP Inspector 來偵錯 MCP Server 的功能。

## 使用 Weather MCP Server 範本快速上手

> **前置需求**
>
> 若要於本機開發環境運行 MCP Server，需準備：
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/)（git_clone_repo 工具所需）
> - [VS Code](https://code.visualstudio.com/) 或 [VS Code Insiders](https://code.visualstudio.com/insiders/)（open_in_vscode 工具所需）
> - （*可選 - 如果偏好 uv*）[uv](https://github.com/astral-sh/uv)
> - [Python 偵錯擴充套件](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 環境準備

本專案環境設置有兩種方式，請依個人偏好選擇：

> 備註：建立虛擬環境後，請重新啟動 VSCode 或終端機，確保使用虛擬環境中的 Python。

| 方式 | 步驟 |
| -------- | ----- |
| 使用 `uv` | 1. 建立虛擬環境：`uv venv` <br>2. 執行 VSCode 指令 "***Python: Select Interpreter***" 選擇剛建立的虛擬環境 Python <br>3. 安裝依賴（含開發套件）：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip` | 1. 建立虛擬環境：`python -m venv .venv` <br>2. 執行 VSCode 指令 "***Python: Select Interpreter***" 選擇剛建立的虛擬環境 Python<br>3. 安裝依賴（含開發套件）：`pip install -e .[dev]` | 

環境準備完成後，可於本機開發環境透過 Agent Builder 當作 MCP Client 運行伺服器開始使用：
1. 開啟 VS Code 偵錯面板，選擇 `Debug in Agent Builder` 或按下 `F5` 啟動 MCP server 偵錯。
2. 利用 AI Toolkit Agent Builder 搭配[此提示語](../../../../../../../../../../../open_prompt_builder)測試伺服器，伺服器將自動連線至 Agent Builder。
3. 點擊 `Run` 執行提示語測試伺服器。

**恭喜**！您已成功於本機開發環境透過 Agent Builder 以 MCP Client 身份執行 Weather MCP Server。
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 範本包含內容

| 資料夾 / 檔案| 內容                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | 用於偵錯的 VSCode 檔案                     |
| `.aitk`      | AI Toolkit 設定檔                           |
| `src`        | Weather MCP Server 原始碼                     |

## 如何偵錯 Weather MCP Server

> 備註：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是個視覺化的開發者工具，可用來測試和偵錯 MCP 伺服器。
> - 各個偵錯模式均支援斷點設置，您可以於工具實作程式碼中加入斷點。

## 可用工具介紹

### 天氣工具
`get_weather` 工具會回傳指定地點的模擬氣象資訊。

| 參數 | 類型 | 說明 |
| --------- | ---- | ----------- |
| `location` | string | 要查詢天氣的地點（例如：城市名稱、州、省或座標） |

### Git Clone 工具
`git_clone_repo` 工具會將 git 倉庫複製到指定資料夾。

| 參數 | 類型 | 說明 |
| --------- | ---- | ----------- |
| `repo_url` | string | 要 clone 的 git 倉庫 URL |
| `target_folder` | string | 複製倉庫的目標資料夾路徑 |

工具回傳 JSON 物件包含：
- `success`：表示操作是否成功的布林值
- `target_folder` 或 `error`：複製倉庫的路徑或錯誤訊息

### VS Code 開啟工具
`open_in_vscode` 工具會在 VS Code 或 VS Code Insiders 應用程式中開啟資料夾。

| 參數 | 類型 | 說明 |
| --------- | ---- | ----------- |
| `folder_path` | string | 要開啟的資料夾路徑 |
| `use_insiders` | boolean（選填） | 是否使用 VS Code Insiders 取代一般 VS Code |

工具回傳 JSON 物件包含：
- `success`：表示操作是否成功的布林值
- `message` 或 `error`：成功訊息或錯誤訊息

| 偵錯模式 | 說明 | 偵錯步驟 |
| ---------- | ----------- | --------------- |
| Agent Builder | 透過 AI Toolkit 在 Agent Builder 中偵錯 MCP 伺服器。 | 1. 開啟 VS Code 偵錯面板，選擇 `Debug in Agent Builder` 並按 `F5` 啟動 MCP 伺服器偵錯。<br>2. 利用 AI Toolkit Agent Builder 搭配[此提示語](../../../../../../../../../../../open_prompt_builder)測試伺服器，伺服器將自動連線至 Agent Builder。<br>3. 點擊 `Run` 執行提示語測試伺服器。 |
| MCP Inspector | 利用 MCP Inspector 偵錯 MCP 伺服器。 | 1. 安裝 [Node.js](https://nodejs.org/)<br> 2. 設定 Inspector：`cd inspector` 並執行 `npm install` <br> 3. 開啟 VS Code 偵錯面板，選擇 `Debug SSE in Inspector (Edge)` 或 `Debug SSE in Inspector (Chrome)`，按 F5 開始偵錯。<br> 4. MCP Inspector 在瀏覽器啟動後，點擊 `Connect` 按鈕連接此 MCP server。<br> 5. 即可使用 `List Tools`，選擇工具，輸入參數，並執行 `Run Tool` 來偵錯伺服器程式碼。<br> |

## 預設連接埠及自訂設定

| 偵錯模式 | 連接埠 | 定義 | 自訂修改 | 備註 |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | 編輯 [.vscode/launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [src/__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [.aitk/mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) 以變更上述連接埠。 | N/A |
| MCP Inspector | 3001（伺服器）；5173 與 3000（Inspector） | [.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | 編輯 [.vscode/launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [src/__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [.aitk/mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) 以變更上述連接埠。 | N/A |

## 回饋建議

若您對此範本有任何回饋或建議，請於 [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) 開啟 issue。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。儘管我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用此翻譯而產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->