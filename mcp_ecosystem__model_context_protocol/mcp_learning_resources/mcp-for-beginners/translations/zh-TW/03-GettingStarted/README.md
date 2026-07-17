## 入門指南  

[![建立您的第一個 MCP 伺服器](../../../translated_images/zh-TW/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(點擊上方圖片觀看本課程的影片)_

本章節包含以下幾個課程：

- **1 您的第一個伺服器**，在這第一課中，您將學會如何建立您的第一個伺服器並使用檢查工具檢查它，這是一個測試和除錯伺服器的寶貴方法， [到課程](01-first-server/README.md)

- **2 客戶端**，在這課中，您將學會如何撰寫一個可以連接到您的伺服器的客戶端， [到課程](02-client/README.md)

- **3 帶 LLM 的客戶端**，更好的撰寫客戶端方式是加入一個 LLM，讓它可以與您的伺服器「協商」如何操作， [到課程](03-llm-client/README.md)

- **4 在 Visual Studio Code 中使用 GitHub Copilot Agent 模式消費伺服器**。這裡我們將看到如何從 Visual Studio Code 執行 MCP 伺服器， [到課程](04-vscode/README.md)

- **5 stdio 傳輸伺服器** stdio 傳輸是本地 MCP 伺服器與客戶端間通信的推薦標準，提供以子程序為基礎的安全通信，並具備內建的程序隔離 [到課程](05-stdio-server/README.md)

- **6 MCP 的 HTTP 串流（可串流 HTTP）**。了解現代 HTTP 串流傳輸（根據 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)為遠端 MCP 伺服器推薦方案）、進度通知，以及如何使用可串流 HTTP 實現可擴展的即時 MCP 伺服器與客戶端。 [到課程](06-http-streaming/README.md)

- **7 使用 AI 工具包於 VSCode** 以消費與測試您的 MCP 客戶端與伺服器 [到課程](07-aitk/README.md)

- **8 測試**。此處特別著重於不同方式測試伺服器與客戶端， [到課程](08-testing/README.md)

- **9 部署**。本章將探討部署 MCP 解決方案的不同方式， [到課程](09-deployment/README.md)

- **10 進階伺服器使用**。本章涵蓋進階伺服器的使用方式， [到課程](./10-advanced/README.md)

- **11 身份驗證**。本章涵蓋如何新增簡易身份驗證，從基本驗證到使用 JWT 與 RBAC。建議您從這裡開始，然後查看第 5 章進階主題，並依第 2 章的建議進行額外安全強化， [到課程](./11-simple-auth/README.md)

- **12 MCP Host**。配置與使用熱門 MCP Host 客戶端，包括 Claude Desktop、Cursor、Cline 和 Windsurf。了解傳輸類型與故障排除， [到課程](./12-mcp-hosts/README.md)

- **13 MCP 檢查器**。使用 MCP 檢查器工具以互動方式調試與測試您的 MCP 伺服器。學習故障排除工具、資源與協議訊息， [到課程](./13-mcp-inspector/README.md)

- **14 範例**。建立 MCP 伺服器，用於與 MCP 客戶端協作處理與 LLM 有關的任務（在 `2026-07-28` 發行候選版中已棄用；對 `2025-11-25` 版本仍有效）。 [到課程](./14-sampling/README.md)

- **15 MCP 應用程式**。建立也會回應 UI 指令的 MCP 伺服器， [到課程](./15-mcp-apps/README.md)

Model Context Protocol (MCP) 是一個開放協議，標準化應用程式如何為 LLM 提供上下文。將 MCP 想像成人工智慧應用的一個 USB-C 連接埠——它提供一種標準化方式，將 AI 模型連結到不同資料來源與工具。

## 學習目標

完成本課後，您將能：

- 設置 C#, Java, Python, TypeScript 及 JavaScript 的 MCP 開發環境
- 建立並部署具自訂功能（資源、提示與工具）的基本 MCP 伺服器
- 建立能連接 MCP 伺服器的 Host 應用程式
- 測試與除錯 MCP 實作
- 理解常見設定挑戰及其解決方案
- 連接您的 MCP 實作到熱門 LLM 服務

## 設定您的 MCP 環境

在開始使用 MCP 之前，準備您的開發環境並理解基本工作流程非常重要。本節將引導您完成初始設定步驟，確保您能順利開始使用 MCP。

### 先備條件

在進入 MCP 開發前，請確保您已具備：

- <strong>開發環境</strong>：適用於您選擇的語言（C#, Java, Python, TypeScript 或 JavaScript）
- **IDE/編輯器**：Visual Studio、Visual Studio Code、IntelliJ、Eclipse、PyCharm，或任何現代程式碼編輯器
- <strong>套件管理器</strong>：NuGet、Maven/Gradle、pip，或 npm/yarn
- **API 金鑰**：用於您計劃在 Host 應用程式中使用的 AI 服務


### 官方 SDK

在接下來的章節中，您將看到使用 Python、TypeScript、Java 及 .NET 建構的解決方案。以下是所有官方支援的 SDK。

MCP 提供多種語言的官方 SDK（與 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 對齊）：
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - 與微軟合作維護
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - 與 Spring AI 合作維護
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - 官方 TypeScript 實作
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - 官方 Python 實作（FastMCP）
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - 官方 Kotlin 實作
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - 與 Loopwork AI 合作維護
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - 官方 Rust 實作
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - 官方 Go 實作

## 重要重點

- 利用特定語言的 SDK 建立 MCP 開發環境簡單直觀
- 建構 MCP 伺服器需要創建並註冊具有明確模式的工具
- MCP 客戶端可連接伺服器與模型，以利用擴充功能
- 測試與除錯是可靠 MCP 實作的關鍵
- 部署選項涵蓋從本地開發到雲端解決方案

## 實作練習

我們有一組範例，與本節所有章節的練習互補。此外，每章節也有各自的練習與作業。

- [Java 計算機](./samples/java/calculator/README.md)
- [.Net 計算機](../../../03-GettingStarted/samples/csharp)
- [JavaScript 計算機](./samples/javascript/README.md)
- [TypeScript 計算機](./samples/typescript/README.md)
- [Python 計算機](../../../03-GettingStarted/samples/python)

## 額外資源

- [使用 Model Context Protocol 在 Azure 上建構 Agent](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [使用 Azure Container Apps 遠端 MCP（Node.js/TypeScript/JavaScript）](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## 下一步

從第一課開始：[建立您的第一個 MCP 伺服器](01-first-server/README.md)

完成本模組後，繼續進行：[模組 4：實務應用](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->