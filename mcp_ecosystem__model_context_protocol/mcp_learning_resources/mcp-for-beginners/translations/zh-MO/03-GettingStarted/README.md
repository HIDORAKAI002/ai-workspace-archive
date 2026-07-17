## 入門指南  

[![建立你的第一個 MCP 伺服器](../../../translated_images/zh-MO/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(點擊上方圖片觀看本課程影片)_

本節包含數個課程：

- **1 你的第一個伺服器**，在這個第一課中，您將學習如何創建您的第一個伺服器並使用檢查工具檢查它，這是測試和除錯伺服器的寶貴方法，[前往課程](01-first-server/README.md)

- **2 用戶端**，本課中您將學習如何編寫可連接至伺服器的用戶端，[前往課程](02-client/README.md)

- **3 帶有 LLM 的用戶端**，編寫用戶端更佳的方法是添加 LLM，使其能與伺服器「協商」要執行的操作，[前往課程](03-llm-client/README.md)

- **4 在 Visual Studio Code 中使用 GitHub Copilot 代理模式消費伺服器**。這裡我們將探討如何從 Visual Studio Code 運行 MCP 伺服器，[前往課程](04-vscode/README.md)

- **5 stdio 傳輸伺服器** stdio 傳輸是本地 MCP 伺服器與用戶端通信的推薦標準，提供安全的子程序通信與內建的進程隔離 [前往課程](05-stdio-server/README.md)

- **6 MCP 的 HTTP 串流（可串流 HTTP）**。學習現代 HTTP 串流傳輸（根據 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http) 推薦用於遠端 MCP 伺服器）、進度通知，以及如何使用可串流 HTTP 實現可擴展、即時的 MCP 伺服器和用戶端。[前往課程](06-http-streaming/README.md)

- **7 利用 AI 工具包於 VSCode** 來消費及測試您的 MCP 用戶端與伺服器 [前往課程](07-aitk/README.md)

- **8 測試**。此課將特別著重於不同方法測試伺服器與用戶端，[前往課程](08-testing/README.md)

- **9 部署**。本章將探討多種部署 MCP 解決方案的方法，[前往課程](09-deployment/README.md)

- **10 進階伺服器使用**。本章涵蓋進階伺服器使用技巧，[前往課程](./10-advanced/README.md)

- **11 認證**。本章涵蓋如何添加簡易認證，從基本認證到使用 JWT 和 RBAC。建議您從這章開始，再查看第 5 章的進階主題，並依第 2 章建議進行額外安全強化，[前往課程](./11-simple-auth/README.md)

- **12 MCP 主機**。配置並使用熱門 MCP 主機用戶端，包括 Claude Desktop、Cursor、Cline 和 Windsurf。學習傳輸類型及故障排除，[前往課程](./12-mcp-hosts/README.md)

- **13 MCP 檢查器**。使用 MCP 檢查器工具互動式除錯和測試您的 MCP 伺服器。學習故障排除工具、資源及協議訊息，[前往課程](./13-mcp-inspector/README.md)

- **14 取樣**。建立 MCP 伺服器，與 MCP 用戶端合作完成 LLM 相關任務（於 `2026-07-28` 發行候選版中已棄用；仍適用於 `2025-11-25`），[前往課程](./14-sampling/README.md)

- **15 MCP 應用程式**。建立同時回應 UI 指令的 MCP 伺服器，[前往課程](./15-mcp-apps/README.md)

Model Context Protocol (MCP) 是一種開放協定，標準化應用程式如何向 LLM 提供上下文。可將 MCP 視為 AI 應用的 USB-C 端口——提供一種標準方式將 AI 模型連接到不同數據源和工具。

## 學習目標

完成本課後，您將能：

- 設置 MCP 的 C#、Java、Python、TypeScript 和 JavaScript 開發環境
- 建立並部署具自訂功能（資源、提示、工具）的基本 MCP 伺服器
- 建立連接 MCP 伺服器的主機應用程式
- 測試與除錯 MCP 實作
- 了解常見的設定挑戰及其解決方法
- 將您的 MCP 實作連接到熱門 LLM 服務

## 設定您的 MCP 環境

在開始使用 MCP 前，準備好開發環境並理解基本工作流程非常重要。本節將指引您完成初始設定步驟，確保 MCP 使用順利。

### 先決條件

在投入 MCP 開發前，請確保您具備：

- <strong>開發環境</strong>：針對您選用的語言（C#、Java、Python、TypeScript 或 JavaScript）
- **IDE/編輯器**：Visual Studio、Visual Studio Code、IntelliJ、Eclipse、PyCharm 或任一現代程式碼編輯器
- <strong>套件管理工具</strong>：NuGet、Maven/Gradle、pip 或 npm/yarn
- **API 金鑰**：用於您計劃在主機應用中使用的任何 AI 服務


### 官方 SDK

未來章節會展示用 Python、TypeScript、Java 和 .NET 構建的解決方案。以下為所有官方支援的 SDK。

MCP 提供多語言官方 SDK（符合 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)）：
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - 與微軟合作維護
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - 與 Spring AI 合作維護
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - 官方 TypeScript 實作
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - 官方 Python 實作（FastMCP）
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - 官方 Kotlin 實作
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - 與 Loopwork AI 合作維護
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - 官方 Rust 實作
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - 官方 Go 實作

## 主要重點

- 使用語言專屬的 SDK 設置 MCP 開發環境相當簡單
- 建立 MCP 伺服器涉及創建並註冊具明確架構的工具
- MCP 用戶端連接伺服器與模型，以利用其擴充功能
- 測試與除錯對可靠 MCP 實作至關重要
- 部署方案涵蓋從本地開發到雲端解決方案

## 練習

我們提供一組範例與本節所有章節的練習互為補充。此外，每章皆附有專屬練習和作業

- [Java 計算器](./samples/java/calculator/README.md)
- [.Net 計算器](../../../03-GettingStarted/samples/csharp)
- [JavaScript 計算器](./samples/javascript/README.md)
- [TypeScript 計算器](./samples/typescript/README.md)
- [Python 計算器](../../../03-GettingStarted/samples/python)

## 額外資源

- [使用 Model Context Protocol 在 Azure 上建立代理](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Azure Container Apps 中的遠端 MCP (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP 代理](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## 接下來

從第一課開始：[建立你的第一個 MCP 伺服器](01-first-server/README.md)

完成本模組後，繼續進入：[模組 4：實務實作](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->