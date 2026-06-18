# 天氣 MCP 伺服器

這是一個以 Python 實作的天氣工具範例 MCP 伺服器，提供模擬回應。您可以將它當作自己 MCP 伺服器的骨架。它包含以下功能：

- <strong>天氣工具</strong>：根據給定地點提供模擬天氣資訊的工具。
- **連接至 Agent Builder**：允許將 MCP 伺服器連接到 Agent Builder 以進行測試與除錯的功能。
- **於 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 進行除錯**：使用 MCP Inspector 除錯 MCP 伺服器的功能。

## 使用天氣 MCP 伺服器範本開始

> <strong>先決條件</strong>
>
> 要在本機開發機器上執行 MCP 伺服器，您需要：
>
> - [Python](https://www.python.org/)
> - （*選擇性 - 若偏好 uv*）[uv](https://github.com/astral-sh/uv)
> - [Python 除錯擴充套件](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 環境準備

有兩種方法來為本專案設定環境，您可以依喜好選擇其中一種。

> 注意：建立虛擬環境後，請重新載入 VSCode 或終端機，以確保使用虛擬環境的 Python。

| 方法 | 步驟 |
| -------- | ----- |
| 使用 `uv` | 1. 建立虛擬環境：`uv venv` <br>2. 執行 VSCode 指令「***Python: Select Interpreter***」，並選擇剛建立虛擬環境的 Python <br>3. 安裝相依套件（含開發相依）：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip` | 1. 建立虛擬環境：`python -m venv .venv` <br>2. 執行 VSCode 指令「***Python: Select Interpreter***」，並選擇剛建立虛擬環境的 Python<br>3. 安裝相依套件（含開發相依）：`pip install -e .[dev]` |

設定環境後，您可以透過 Agent Builder 作為 MCP 客戶端在本機開發機器上執行伺服器開始使用：
1. 開啟 VS Code 除錯面板。選擇「Debug in Agent Builder」或按 `F5` 開始除錯 MCP 伺服器。
2. 使用 Microsoft Foundry Toolkit Agent Builder 搭配[此提示詞](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器將自動連接至 Agent Builder。
3. 點擊「Run」用該提示詞測試伺服器。

**恭喜！** 您已成功在本機開發機器透過 Agent Builder 作為 MCP 客戶端運行天氣 MCP 伺服器。
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 範本包含的內容

| 資料夾 / 檔案 | 內容                                  |
| -------------- | ----------------------------------- |
| `.vscode`      | 用於除錯的 VSCode 設定檔             |
| `.aitk`        | Microsoft Foundry Toolkit 配置相關檔案 |
| `src`          | 天氣 MCP 伺服器的原始程式碼         |

## 如何除錯天氣 MCP 伺服器

> 注意：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是一個用於測試和除錯 MCP 伺服器的視覺化開發工具。
> - 所有除錯模式都支援斷點，因此您可以在工具實作程式碼中加入斷點。

| 除錯模式       | 說明                               | 除錯步驟                                                                                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent Builder  | 透過 Microsoft Foundry Toolkit 在 Agent Builder 中除錯 MCP 伺服器。 | 1. 開啟 VS Code 除錯面板。選擇「Debug in Agent Builder」並按 `F5` 開始除錯 MCP 伺服器。<br>2. 使用 Microsoft Foundry Toolkit Agent Builder 搭配[此提示詞](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連接至 Agent Builder。<br>3. 點擊「Run」根據提示詞測試伺服器。 |
| MCP Inspector | 使用 MCP Inspector 除錯 MCP 伺服器。 | 1. 安裝 [Node.js](https://nodejs.org/)<br>2. 設定 Inspector：`cd inspector` && `npm install` <br>3. 開啟 VS Code 除錯面板。選擇 `Debug SSE in Inspector (Edge)` 或 `Debug SSE in Inspector (Chrome)`，並按 F5 開始除錯。<br>4. MCP Inspector 在瀏覽器開啟後，點擊「Connect」按鈕連接此 MCP 伺服器。<br>5. 您即可進行「List Tools」、選擇工具、輸入參數與「Run Tool」來除錯伺服器程式碼。<br> |

## 預設埠口及自訂設定

| 除錯模式       | 埠口                        | 定義檔案                      | 自訂說明                                                         | 備註  |
| -------------- | --------------------------- | ------------------------------ | ---------------------------------------------------------------- | ----- |
| Agent Builder  | 3001                        | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 來修改以上埠口。 | 無    |
| MCP Inspector | 3001 (伺服器端)；5173 與 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 來修改以上埠口。 | 無    |

## 回饋

若您對此範本有任何回饋或建議，請至 [Microsoft Foundry Toolkit GitHub 儲存庫](https://github.com/microsoft/vscode-ai-toolkit/issues) 開啟 issue。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->