# Weather MCP Server

這是一個使用 Python 實作的天氣工具樣本 MCP Server，提供模擬回應。可作為您自行建立 MCP Server 的骨架。包含以下功能：

- <strong>天氣工具</strong>：根據給定地點提供模擬天氣資訊的工具。
- **連接至 Agent Builder**：允許您將 MCP Server 連接到 Agent Builder 以便測試和除錯。
- **在 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 中除錯**：允許您使用 MCP Inspector 來除錯 MCP Server 的功能。

## 使用 Weather MCP Server 範本快速開始

> <strong>前置條件</strong>
>
> 若要在您的本地開發機器執行 MCP Server，您需要：
>
> - [Python](https://www.python.org/)
> - （選擇性 - 若偏好 uv）[uv](https://github.com/astral-sh/uv)
> - [Python 除錯擴充套件](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 環境準備

有兩種方法可設定本專案的環境。您可依照喜好選擇其中一種。

> 注意：建立虛擬環境後，請重新載入 VSCode 或終端機以確保使用虛擬環境的 Python。

| 方式         | 步驟                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| 使用 `uv`    | 1. 建立虛擬環境：`uv venv` <br>2. 執行 VSCode 指令 "***Python: Select Interpreter***" 並選擇剛建立的虛擬環境中的 Python <br>3. 安裝相依套件（含開發相依）：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip`   | 1. 建立虛擬環境：`python -m venv .venv` <br>2. 執行 VSCode 指令 "***Python: Select Interpreter***" 並選擇剛建立的虛擬環境中的 Python <br>3. 安裝相依套件（含開發相依）：`pip install -e .[dev]`                   |

環境設定完成後，即可透過 Agent Builder 作為 MCP Client 在您的本地開發機執行伺服器開始使用：
1. 開啟 VS Code 除錯面板，選擇 `Debug in Agent Builder` 或按 `F5` 啟動 MCP Server 除錯。
2. 使用 Microsoft Foundry Toolkit Agent Builder 以[此提示](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連接至 Agent Builder。
3. 點選 `Run` 以用提示測試伺服器。

**恭喜！** 您已成功透過 Agent Builder 作為 MCP Client 在本地開發機執行 Weather MCP Server。
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 範本包含內容

| 資料夾 / 檔案 | 內容                           |
| ------------- | ------------------------------ |
| `.vscode`     | VSCode 除錯相關檔案            |
| `.aitk`       | Microsoft Foundry Toolkit 配置 |
| `src`         | weather mcp server 的原始碼    |

## 如何除錯 Weather MCP Server

> 注意：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是用於測試和除錯 MCP Server 的視覺化開發者工具。
> - 所有除錯模式均支援斷點，您可以在工具實作程式碼中增加斷點。

| 除錯模式       | 說明                                    | 除錯步驟                                                                                                                                        |
| -------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent Builder  | 使用 Microsoft Foundry Toolkit 在 Agent Builder 中除錯 MCP Server。 | 1. 開啟 VS Code 除錯面板，選擇 `Debug in Agent Builder` 並按 `F5` 來啟動 MCP Server 除錯。<br>2. 使用 Microsoft Foundry Toolkit Agent Builder 依[此提示](../../../../../../../../../../../open_prompt_builder)測試伺服器。伺服器會自動連接至 Agent Builder。<br>3. 點選 `Run` 以用提示測試伺服器。 |
| MCP Inspector | 使用 MCP Inspector 除錯 MCP Server。      | 1. 安裝 [Node.js](https://nodejs.org/)<br>2. 設定 Inspector：`cd inspector` 並執行 `npm install` <br>3. 開啟 VS Code 除錯面板，選擇 `Debug SSE in Inspector (Edge)` 或 `Debug SSE in Inspector (Chrome)`，按 F5 來啟動除錯。<br>4. MCP Inspector 啟動瀏覽器時，點選 `Connect` 按鈕以連接本 MCP Server。<br>5. 接著可用 `List Tools` 選擇工具，輸入參數，並點 `Run Tool` 來除錯您的伺服器程式碼。<br> |

## 預設連接埠與自訂設定

| 除錯模式     | 連接埠           | 定義檔                    | 自訂方式                                                        | 備註 |
| ------------ | ---------------- | ------------------------- | --------------------------------------------------------------- | ---- |
| Agent Builder | 3001             | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 更改連接埠。 | 無   |
| MCP Inspector | 3001 (伺服器)；5173 與 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 編輯 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 更改連接埠。 | 無   |

## 回饋

若您對此範本有任何回饋或建議，請在 [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) 開啟問題。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->