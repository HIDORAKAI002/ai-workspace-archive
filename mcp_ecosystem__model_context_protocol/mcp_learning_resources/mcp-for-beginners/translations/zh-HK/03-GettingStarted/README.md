## 快速開始  

[![建立您第一個 MCP 伺服器](../../../translated_images/zh-HK/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(點擊上方圖片觀看本課程影片)_

本部分包含多個課程：

- **1 您的第一個伺服器**，在此第一課中，您將學習如何建立您的第一個伺服器並使用檢視器工具進行檢查，這是測試和調試伺服器的寶貴方法，[前往課程](01-first-server/README.md)

- **2 客戶端**，在此課程中，您將學習如何撰寫可連接至您的伺服器的客戶端，[前往課程](02-client/README.md)

- **3 帶有 LLM 的客戶端**，撰寫客戶端更好的方法是加入 LLM，使其能與您的伺服器「協商」如何操作，[前往課程](03-llm-client/README.md)

- **4 在 Visual Studio Code 中使用 GitHub Copilot Agent 模式消費伺服器**。這裡我們探討如何從 Visual Studio Code 內執行 MCP 伺服器，[前往課程](04-vscode/README.md)

- **5 stdio 傳輸伺服器** stdio 傳輸是推薦的本地 MCP 伺服器到客戶端通訊標準，提供安全的子程序通訊以及內建的程序隔離 [前往課程](05-stdio-server/README.md)

- **6 MCP 的 HTTP 串流（可串流的 HTTP）**。了解現代 HTTP 串流傳輸（根據 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http) 是對遠程 MCP 伺服器的推薦方法）、進度通知以及如何使用可串流 HTTP 實現可擴展的即時 MCP 伺服器與客戶端。[前往課程](06-http-streaming/README.md)

- **7 利用 VSCode 的 AI 工具包** 來消費與測試您的 MCP 客戶端和伺服器 [前往課程](07-aitk/README.md)

- **8 測試**。此處特別聚焦如何以不同方式測試我們的伺服器和客戶端，[前往課程](08-testing/README.md)

- **9 部署**。本章將探討部署 MCP 解決方案的不同方式，[前往課程](09-deployment/README.md)

- **10 進階伺服器使用**。本章涵蓋進階伺服器使用，[前往課程](./10-advanced/README.md)

- **11 認證**。本章說明如何新增簡易認證，從 Basic Auth 到使用 JWT 和 RBAC。建議您從本章開始，然後查看第五章的進階主題，並根據第二章的建議進行額外安全強化，[前往課程](./11-simple-auth/README.md)

- **12 MCP 主機**。配置及使用熱門的 MCP 主機客戶端，包括 Claude Desktop、Cursor、Cline 及 Windsurf。了解傳輸類型和疑難排解，[前往課程](./12-mcp-hosts/README.md)

- **13 MCP 檢視器**。使用 MCP 檢視器工具互動式地調試和測試您的 MCP 伺服器。學習如何排解工具、資源及協議訊息，[前往課程](./13-mcp-inspector/README.md)

- **14 採樣**。建立 MCP 伺服器與 MCP 客戶端在 LLM 相關任務上的協作（已於 `2026-07-28` 發行候選版本中廢棄；仍適用於 `2025-11-25`）。[前往課程](./14-sampling/README.md)

- **15 MCP 應用程式**。建立同時可回覆 UI 指令的 MCP 伺服器，[前往課程](./15-mcp-apps/README.md)

模型上下文協定（MCP）是一個開放協定，標準化了應用程式如何向 LLM 提供上下文。可以把 MCP 想像成 AI 應用程式的 USB-C 介面 — 它提供一種標準化方式，讓 AI 模型連接到不同的資料來源與工具。

## 學習目標

完成本課後，您將能夠：

- 為 C#、Java、Python、TypeScript 和 JavaScript 設定 MCP 開發環境
- 建立並部署具自定義功能（資源、提示和工具）的基本 MCP 伺服器
- 建立可連接 MCP 伺服器的主機應用程式
- 測試與調試 MCP 實作
- 了解常見設定挑戰和其解決方案
- 將您的 MCP 實作連接至熱門的 LLM 服務

## 設定您的 MCP 環境

在開始使用 MCP 前，重要的是先準備好開發環境並了解基本工作流程。本節將引導您進行初步設定步驟，確保 MCP 使用順利開始。

### 前置需求

在進入 MCP 開發前，請確保您已具備：

- <strong>開發環境</strong>：針對您選擇的語言（C#、Java、Python、TypeScript 或 JavaScript）
- **IDE/編輯器**：Visual Studio、Visual Studio Code、IntelliJ、Eclipse、PyCharm，或任何現代程式碼編輯器
- <strong>套件管理器</strong>：NuGet、Maven/Gradle、pip，或 npm/yarn
- **API 金鑰**：用於您計劃在主機應用程式中使用的任何 AI 服務


### 官方 SDK

在接下來的章節中，您將看見使用 Python、TypeScript、Java 和 .NET 建立的解決方案。以下是所有官方支援的 SDK。

MCP 提供多語言的官方 SDK（與 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 對齊）：
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - 與 Microsoft 合作維護
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - 與 Spring AI 合作維護
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - 官方 TypeScript 實作
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - 官方 Python 實作（FastMCP）
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - 官方 Kotlin 實作
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - 與 Loopwork AI 合作維護
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - 官方 Rust 實作
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - 官方 Go 實作

## 重要重點

- 設定 MCP 開發環境簡單，具備語言專屬 SDK
- 建立 MCP 伺服器涉及建立與註冊具明確結構的工具
- MCP 客戶端連接伺服器與模型以擴展功能
- 測試與除錯對穩定 MCP 實作不可或缺
- 部署選項包含從本地開發至雲端解決方案

## 練習

我們提供一系列範例，補充本部分所有章節中的練習。此外，每個章節也有各自的練習與作業。

- [Java 計算機](./samples/java/calculator/README.md)
- [.Net 計算機](../../../03-GettingStarted/samples/csharp)
- [JavaScript 計算機](./samples/javascript/README.md)
- [TypeScript 計算機](./samples/typescript/README.md)
- [Python 計算機](../../../03-GettingStarted/samples/python)

## 額外資源

- [使用 Model Context Protocol 在 Azure 上建置代理](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [利用 Azure Container Apps 遠程 MCP (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP 代理](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## 接下來

從第一課開始：[建立您的第一個 MCP 伺服器](01-first-server/README.md)

完成本模組後，接著開始：[模組 4：實務實作](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->