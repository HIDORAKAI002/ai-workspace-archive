# Weather MCP 伺服器

這是一個使用 Python 實作的 Weather MCP 伺服器範例，包含天氣工具的模擬回應。可用作您自行建置 MCP 伺服器的腳手架。其功能包含：

- **天氣工具**：根據提供的位置回傳模擬的天氣資訊。
- **Git Clone 工具**：將 git 倉庫複製到指定資料夾的工具。
- **VS Code 開啟工具**：用來開啟資料夾於 VS Code 或 VS Code Insiders。
- **連接 Agent Builder**：允許將 MCP 伺服器連接至 Agent Builder 進行測試與除錯。
- **在 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 中除錯**：允許您透過 MCP Inspector 除錯 MCP 伺服器。

## 開始使用 Weather MCP 伺服器範本

> **先決條件**
>
> 要在本機開發環境執行 MCP 伺服器，您將需要：
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/)（git_clone_repo 工具需要）
> - [VS Code](https://code.visualstudio.com/) 或 [VS Code Insiders](https://code.visualstudio.com/insiders/)（open_in_vscode 工具需要）
> - （*選用 - 若偏好 uv*）[uv](https://github.com/astral-sh/uv)
> - [Python 除錯擴展](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 環境準備

本專案有兩種設定環境方式，請依喜好選擇任一。

> 注意：建立虛擬環境後，請重新載入 VSCode 或終端機，以確保使用虛擬環境的 Python。

| 方式 | 步驟 |
| -------- | ----- |
| 使用 `uv` | 1. 建立虛擬環境：`uv venv` <br>2. 執行 VSCode 指令「***Python: Select Interpreter***」並選擇剛建立的虛擬環境 Python <br>3. 安裝依賴（含開發依賴）：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip` | 1. 建立虛擬環境：`python -m venv .venv` <br>2. 執行 VSCode 指令「***Python: Select Interpreter***」並選擇剛建立的虛擬環境 Python <br>3. 安裝依賴（含開發依賴）：`pip install -e .[dev]` |

完成環境設定後，您可以在本機用 Agent Builder 當作 MCP Client 運行伺服器開始開發：
1. 開啟 VS Code 除錯面板。選擇 `Debug in Agent Builder` 或按 `F5` 啟動 MCP 伺服器除錯。
2. 使用 AI Toolkit Agent Builder 以 [此提示](../../../../../../../../../../../open_prompt_builder) 測試伺服器。伺服器會自動連線到 Agent Builder。
3. 點擊「執行」測試伺服器與提示互動。

**恭喜！** 您已成功在本機透過 Agent Builder 作為 MCP Client 運行 Weather MCP 伺服器。
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 範本包含內容

| 資料夾 / 檔案| 內容                                      |
| ------------ | ----------------------------------------- |
| `.vscode`    | 用於除錯的 VSCode 設定檔                  |
| `.aitk`      | AI Toolkit 的配置                          |
| `src`        | weather mcp 伺服器的原始程式碼             |

## 如何除錯 Weather MCP 伺服器

> 注意：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是一款視覺化開發工具，用於測試與除錯 MCP 伺服器。
> - 所有除錯模式皆支援斷點，您可以在工具實作程式碼中加入斷點。

## 可用工具

### 天氣工具
`get_weather` 工具提供指定地點的模擬天氣資訊。

| 參數 | 型別 | 描述 |
| --------- | ---- | ----------- |
| `location` | string | 要查詢天氣的位置（例如：城市名、州、省或座標） |

### Git Clone 工具
`git_clone_repo` 工具將 git 倉庫複製到指定資料夾。

| 參數 | 型別 | 描述 |
| --------- | ---- | ----------- |
| `repo_url` | string | 要複製的 git 倉庫 URL |
| `target_folder` | string | 複製倉庫目的資料夾路徑 |

工具回傳 JSON 物件：
- `success`：布林值，操作是否成功
- `target_folder` 或 `error`：複製倉庫的資料夾路徑或錯誤訊息

### VS Code 開啟工具
`open_in_vscode` 工具用於在 VS Code 或 VS Code Insiders 應用程式中開啟資料夾。

| 參數 | 型別 | 描述 |
| --------- | ---- | ----------- |
| `folder_path` | string | 要開啟的資料夾路徑 |
| `use_insiders` | boolean (選用) | 是否使用 VS Code Insiders 取代一般 VS Code |

工具回傳 JSON 物件：
- `success`：布林值，操作是否成功
- `message` 或 `error`：成功訊息或錯誤訊息

| 除錯模式 | 描述 | 除錯步驟 |
| ---------- | ----------- | --------------- |
| Agent Builder | 透過 AI Toolkit 在 Agent Builder 中除錯 MCP 伺服器。 | 1. 開啟 VS Code 除錯面板。選擇 `Debug in Agent Builder` 並按 `F5` 啟動 MCP 伺服器除錯。<br>2. 使用 AI Toolkit Agent Builder 以 [此提示](../../../../../../../../../../../open_prompt_builder) 測試伺服器。伺服器會自動連接至 Agent Builder。<br>3. 點擊「執行」測試伺服器。 |
| MCP Inspector | 使用 MCP Inspector 來除錯 MCP 伺服器。 | 1. 安裝 [Node.js](https://nodejs.org/)<br>2. 設定 Inspector：`cd inspector` && `npm install` <br>3. 開啟 VS Code 除錯面板。選擇 `Debug SSE in Inspector (Edge)` 或 `Debug SSE in Inspector (Chrome)` 並按 F5 開始除錯。<br>4. MCP Inspector 在瀏覽器啟動後，點擊「Connect」按鈕以連接此 MCP 伺服器。<br>5. 接著您可以「列出工具」、選擇工具、輸入參數，並「執行工具」以除錯伺服器程式碼。<br> |

## 預設通訊埠及自定義設定

| 除錯模式 | 通訊埠 | 定義位置 | 自訂位置 | 備註 |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) 以更改上述通訊埠。 | 無 |
| MCP Inspector | 3001（伺服器）；5173 和 3000（Inspector） | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) 以更改上述通訊埠。 | 無 |

## 回饋

如果您對此範本有任何回饋或建議，請在 [AI Toolkit GitHub 倉庫](https://github.com/microsoft/vscode-ai-toolkit/issues) 開啟 issue。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件乃使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意自動翻譯可能包含錯誤或不準確之處。原文檔案以其原始語言版本為權威來源。對於重要資訊，建議使用專業人工翻譯。對於因使用本翻譯而引起的任何誤解或誤讀，我們概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->