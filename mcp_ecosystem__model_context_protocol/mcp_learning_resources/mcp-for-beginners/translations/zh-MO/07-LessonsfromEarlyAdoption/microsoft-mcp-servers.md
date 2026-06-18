# 🚀 10 個正在改變開發人員生產力的 Microsoft MCP 伺服器

## 🎯 你將在本指南學到什麼

本實用指南介紹了十個 Microsoft MCP 伺服器，這些伺服器正積極改變開發人員與 AI 助手的工作方式。我們不只是說明 MCP 伺服器「能做什麼」，而是展示那些已經在微軟及其他地方日常開發工作流程中產生真正影響的伺服器。

本指南中每個伺服器都是根據真實世界的使用情況和開發者回饋精選的。你將不僅會了解每個伺服器的功能，還會知道它的重要性以及如何在自己的項目中充分利用它。不論你是 MCP 新手還是想擴展現有設置，這些伺服器代表了微軟生態系中一些最實用且具有影響力的工具。

> **💡 快速入門小技巧**
> 
> 是 MCP 新手嗎？別擔心！本指南特別為初學者設計。我們會隨時解釋概念，你也可以隨時參考我們的[入門 MCP](../00-Introduction/README.md)和[核心概念](../01-CoreConcepts/README.md)模組以獲得更深入的背景知識。

## 概述

本綜合指南探討了 10 個正在革新開發人員與 AI 助手及外部工具互動方式的 Microsoft MCP 伺服器。從 Azure 資源管理到文件處理，這些伺服器展現了 Model Context Protocol 在創建無縫、富生產力的開發工作流程方面的強大力量。

## 學習目標

閱讀本指南後，你將能夠：
- 了解 MCP 伺服器如何提升開發人員的生產力
- 認識微軟最具影響力的 MCP 伺服器實作
- 發掘每個伺服器的實用應用案例
- 知道如何在 VS Code 和 Visual Studio 中設置及配置這些伺服器
- 探索更廣泛的 MCP 生態系統與未來發展方向

## 🔧 了解 MCP 伺服器：初學者指南

### 什麼是 MCP 伺服器？

作為 Model Context Protocol (MCP) 的新手，你可能會想：「MCP 伺服器到底是什麼？為什麼我需要關心？」我們先用一個簡單的比喻開始。

想像 MCP 伺服器是專門的助手，幫助你的 AI 編碼夥伴（例如 GitHub Copilot）連接至外部工具和服務。就像你會用不同的手機應用程式處理不同的任務——一個查天氣，一個導航，一個銀行理財——MCP 伺服器能賦予你的 AI 助手與各種開發工具和服務互動的能力。

### MCP 伺服器解決了什麼問題？

在 MCP 伺服器出現前，如果你想要：
- 檢查 Azure 資源
- 建立 GitHub 問題
- 查詢資料庫
- 搜尋文件

你必須停止編碼，開啟瀏覽器，前往相應網站，並手動執行這些任務。這種不斷切換工作上下文會打斷你的思路，降低生產力。

### MCP 伺服器如何改變你的開發體驗

有了 MCP 伺服器，你可以留在開發環境（VS Code、Visual Studio 等）中，只需向 AI 助手提出請求即可處理這些任務。例如：

**傳統工作流程是這樣的：**
1. 停止編碼
2. 開啟瀏覽器
3. 前往 Azure 入口網站
4. 查找儲存體帳戶詳細資訊
5. 返回 VS Code
6. 繼續編碼

**現在你可以這樣做：**
1. 問 AI：「我的 Azure 儲存體帳戶狀態如何？」
2. 根據回饋繼續編碼

### 初學者的主要優點

#### 1. 🔄 <strong>保持專注狀態</strong>
- 不再需要在多個應用間切換
- 集中注意力在你正在編寫的代碼上
- 降低管理不同工具的心理負擔

#### 2. 🤖 <strong>用自然語言替代複雜指令</strong>
- 不必背誦 SQL 語法，描述你需要的資料就好
- 不必記 Azure CLI 命令，只需說明目標
- 讓 AI 負責技術細節，你專注邏輯

#### 3. 🔗 <strong>把多種工具連接起來</strong>
- 合併不同服務創建強大工作流程
- 舉例：「取得所有最近的 GitHub issue，然後在 Azure DevOps 中建立相應工作項目」
- 建立自動化流程，不需撰寫繁複腳本

#### 4. 🌐 <strong>接入日益壯大的生態系</strong>
- 利用微軟、GitHub 及其他公司建立的伺服器
- 輕鬆整合不同廠商的工具
- 加入標準化生態，適用於不同 AI 助手

#### 5. 🛠️ <strong>實做中學習</strong>
- 從預建伺服器開始理解基本概念
- 逐步建立自己的伺服器，在學習中成長
- 利用現有 SDK 和文檔指引學習

### 初學者的實際範例

假設你是網頁開發新手，正在做第一個項目。MCP 伺服器如何幫助你：

**傳統做法：**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**有了 MCP 伺服器：**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```


### 企業標準優勢

MCP 正成為行業標準，這意味著：
- <strong>一致性</strong>：不同工具和公司之間擁有相似體驗
- <strong>互通性</strong>：不同供應商的伺服器可以協同工作
- <strong>未來保障</strong>：技能和設置在不同 AI 助手間可轉移
- <strong>社群生態</strong>：龐大的共享知識和資源社群

### 入門指南：你將學到什麼

在本指南中，我們將探索 10 個對各級開發人員都特別實用的 Microsoft MCP 伺服器。每個伺服器旨在：
- 解決常見開發挑戰
- 減少重複性任務
- 改善代碼品質
- 增加學習機會

> **💡 學習小貼士**
> 
> 如果你完全是 MCP 新手，請先從我們的[入門 MCP](../00-Introduction/README.md)和[核心概念](../01-CoreConcepts/README.md)模組開始學習。然後再回來看看這些概念如何透過微軟的真實工具付諸實踐。
>
> 想了解 MCP 重要性的更多背景，請參閱 Maria Naggaga 的文章：[Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps)。

## 在 VS Code 和 Visual Studio 中開始使用 MCP 🚀

如果你使用 Visual Studio Code 或 Visual Studio 2022 搭配 GitHub Copilot，設置這些 MCP 伺服器非常簡單。

### VS Code 設置

以下是在 VS Code 中的基本流程：

1. <strong>啟用代理模式</strong>：在 VS Code 的 Copilot Chat 視窗中切換到代理（Agent）模式
2. **配置 MCP 伺服器**：將伺服器配置添加至 VS Code 的 settings.json 檔案
3. <strong>啟動伺服器</strong>：點擊你想使用的各伺服器旁的「啟動」按鈕
4. <strong>選擇工具</strong>：選擇本次工作階段要啟用哪些 MCP 伺服器

詳細設置說明請見 [VS Code MCP 文件](https://code.visualstudio.com/docs/copilot/copilot-mcp)。

> **💡 專家提示：專業管理 MCP 伺服器！**
> 
> VS Code 擴充視圖現在包含了一個[方便的新介面用於管理已安裝的 MCP 伺服器](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)！你可以快速存取並啟動、停止或管理任何 MCP 伺服器，介面簡潔清晰。不妨試試看！

### Visual Studio 2022 設置

適用於 Visual Studio 2022（版本 17.14 或以後）：

1. <strong>啟用代理模式</strong>：點擊 GitHub Copilot Chat 視窗中的「詢問」下拉選單並選擇「代理」
2. <strong>建立配置檔</strong>：在你的解決方案目錄下建立 `.mcp.json` 檔案（推薦位置：`<SOLUTIONDIR>\.mcp.json`）
3. <strong>配置伺服器</strong>：使用標準 MCP 格式添加你的 MCP 伺服器配置
4. <strong>工具授權</strong>：系統提示時，批准你想使用的工具和相應的作用範圍權限

詳細 Visual Studio 設置說明請參考 [Visual Studio MCP 文件](https://learn.microsoft.com/visualstudio/ide/mcp-servers)。

每個 MCP 伺服器都有自己的配置要求（連接字串、認證等），但兩個 IDE 的設置流程一致。

## 從 Microsoft MCP 伺服器學到的課程 🛠️

### 1. 📚 Microsoft Learn Docs MCP 伺服器

[![在 VS Code 安裝](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![在 VS Code Insiders 安裝](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>功能說明</strong>：Microsoft Learn Docs MCP 伺服器是一個雲端托管服務，通過 Model Context Protocol 向 AI 助手提供對官方 Microsoft 文件的即時存取。它連接至 `https://learn.microsoft.com/api/mcp`，並支援對 Microsoft Learn、Azure 文件、Microsoft 365 文件及其他官方微軟資源的語意搜尋。

<strong>為何有用</strong>：雖然看起來只是「文件」，但這個伺服器對每位使用微軟技術的開發者都至關重要。許多 .NET 開發者對 AI 編碼助手的最大抱怨之一是它們未能及時更新最新的 .NET 和 C# 發布資訊。Microsoft Learn Docs MCP 伺服器通過提供對最新文件、API 參考和最佳實踐的即時存取來解決這個問題。無論你是使用最新的 Azure SDK、探索新推出的 C# 13 功能，還是實作前沿的 .NET Aspire 模式，這個伺服器都能確保你的 AI 助手獲得權威且最新的資訊，以生成準確且現代的代碼。

<strong>實際應用</strong>：「根據官方 Microsoft Learn 文件，az cli 建立 Azure container app 的命令是什麼？」或「如何在 ASP.NET Core 中使用依賴注入配置 Entity Framework？」又或者「檢查這段程式碼，看它是否符合 Microsoft Learn 文件中的效能建議。」此伺服器利用先進的語意搜尋涵蓋 Microsoft Learn、Azure 文件和 Microsoft 365 文件，找出最具上下文關聯性的資訊，返還最多 10 條高品質內容片段，含文章標題及 URL，並隨時存取最新發布的微軟文件。

<strong>特色範例</strong>：伺服器公開了 `microsoft_docs_search` 工具，可對微軟官方技術文件執行語意搜尋。配置完成後，你可以問：「如何在 ASP.NET Core 中實現 JWT 認證？」並獲得詳細且官方的回覆及來源鏈結。搜尋品質極佳，因為它能理解上下文 — 例如在 Azure 情境下查詢「containers」會返回 Azure Container Instances 文件，而同一詞在 .NET 情境下則返回相關的 C# 集合資訊。

這對於快速變動或近期更新的函式庫和使用案例尤其有用。例如，在最近的編碼專案中，我想利用最新版本的 .NET Aspire 和 Microsoft.Extensions.AI 的新功能。藉由包含 Microsoft Learn Docs MCP 伺服器，不僅能使用 API 文檔，還能獲得剛發布的操作指引和範例。

> **💡 專家提示**
> 
> 即使是能使用工具的模型也需要誘導去使用 MCP 工具！可考慮添加系統提示或 [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot)，例如：「你有權限存取 `microsoft.docs.mcp` —— 處理關於 Microsoft 技術（如 C#、Azure、ASP.NET Core 或 Entity Framework）的問題時，請使用此工具搜尋最新的官方文件。」
>
> 欲參考此策略的優秀範例，請查看 Awesome GitHub Copilot 倉庫中的 [C# .NET Janitor 聊天模式](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md)。該模式特別利用 Microsoft Learn Docs MCP 伺服器協助清理和現代化 C# 代碼，採用最新模式和最佳實踐。

### 2. ☁️ Azure MCP 伺服器
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

<strong>它的功能</strong>：Azure MCP 伺服器是一套完整的 15+ 專業 Azure 服務連接器，將整個 Azure 生態系統帶入你的 AI 工作流程。這不只是單一伺服器——它是一個強大的集合，涵蓋資源管理、資料庫連接（PostgreSQL、SQL Server）、使用 KQL 的 Azure Monitor 日誌分析、Cosmos DB 整合，以及更多功能。

<strong>它的價值</strong>：除了管理 Azure 資源之外，這個伺服器在使用 Azure SDK 時能大幅提升程式碼品質。當你在代理模式下使用 Azure MCP，它不只是幫助你寫程式碼——更是幫你寫出符合最新驗證模式、錯誤處理最佳實務，以及利用最新 SDK 功能的 <em>更佳</em> Azure 程式碼。你不會得到僅僅能運作的通用程式碼，而是符合 Azure 生產負載推薦模式的程式碼。

<strong>主要模組包括</strong>：
- **🗄️ 資料庫連接器**：透過自然語言直接存取 Azure Database for PostgreSQL 和 SQL Server
- **📊 Azure Monitor**：以 KQL 驅動的日誌分析與營運洞察
- **🌐 資源管理**：完整 Azure 資源生命週期管理
- **🔐 驗證**：DefaultAzureCredential 與託管身份模式
- **📦 儲存服務**：Blob Storage、Queue Storage 及 Table Storage 操作
- **🚀 容器服務**：Azure Container Apps、Container Instances 和 AKS 管理
- <strong>以及更多專業連接器</strong>

<strong>實際應用情境</strong>：「列出我的 Azure 儲存帳戶」、「查詢我的 Log Analytics 工作區過去一小時的錯誤」，或者「幫我用 Node.js 搭配正確的驗證方式建置 Azure 應用程式」

<strong>完整示範情境</strong>：這裡有一個完整展示 Azure MCP 與 GitHub Copilot for Azure 擴充套件（於 VS Code）結合威力的步驟示範。當你同時安裝兩者並輸入：

> 「建立一個 Python 腳本，使用 DefaultAzureCredential 驗證上傳檔案到 Azure Blob Storage。腳本需連接我的名為 'mycompanystorage' 的 Azure 儲存帳戶，上傳至名為 'documents' 的容器，建立一個帶當前時間戳記的測試檔案用以上傳，優雅處理錯誤並提供訊息輸出，遵守 Azure 驗證及錯誤處理最佳實務，包含註解說明 DefaultAzureCredential 驗證如何運作，且腳本結構良好，含適當函式與文件說明。」

Azure MCP 伺服器將生成完整、適合生產的 Python 腳本，該腳本：
- 採用最新 Azure Blob Storage SDK 與正確的非同步模式
- 實作 DefaultAzureCredential，並完整說明備援流程
- 包含堅固的錯誤處理與特定 Azure 例外類型
- 遵循 Azure SDK 的資源管理及連接處理最佳實務
- 提供詳細紀錄及有用的主控台輸出
- 產生架構良好的腳本，包括函式、說明文件及型別提示

特別之處在於，若沒有 Azure MCP，你可能只能得到通用且未必符合當前 Azure 標準的 blob storage 程式碼。有了 Azure MCP，程式碼能善用最新的驗證方法，處理 Azure 專屬的錯誤場景，並符合微軟推薦的生產應用模式。

<strong>精彩示例</strong>：我經常忘記 `az` 與 `azd` CLI 的指令細節，通常是兩步驟：先查語法，再執行指令。平常我會直接登入入口網站點擊來完成工作，因為不想承認自己記不住 CLI 指令。能夠只用描述方式達成目的真是太棒了，更棒的是能在 IDE 裡完成這件事！

[Azure MCP repository](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server) 提供一份優秀的使用案例列表，幫助你快速入門。關於完整設置指南和進階設定選項，請參考[官方 Azure MCP 文件](https://learn.microsoft.com/azure/developer/azure-mcp-server/)。

### 3. 🐙 GitHub MCP 伺服器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

<strong>它的功能</strong>：官方 GitHub MCP 伺服器提供與 GitHub 全生態系的無縫整合，既支援遠端託管存取，也可本地透過 Docker 部署。這不僅是基本的程式庫操作——它是完整工具集，涵蓋 GitHub Actions 管理、拉取請求工作流程、問題追蹤、安全掃描、通知，以及進階自動化功能。

<strong>它的價值</strong>：這個伺服器改變你與 GitHub 互動的方式，將全平台體驗直接帶入你的開發環境。你不必頻繁切換 VS Code 與 GitHub.com 來管理專案、碼程審查及 CI/CD 監控，只需用自然語言指令即可處理所有工作，專注在你的程式碼。

> **ℹ️ 註：不同類型的「代理」**
> 
> 不要將此 GitHub MCP 伺服器與 GitHub 的 Coding Agent（可指派問題自動執行程式碼任務的 AI 代理）混淆。GitHub MCP 伺服器位於 VS Code 代理模式中，提供 GitHub API 整合，而 GitHub Coding Agent 則是獨立功能，會在被指派到 GitHub 問題時建立拉取請求。

<strong>主要功能包括</strong>：
- **⚙️ GitHub Actions**：完整 CI/CD 管線管理、工作流程監控及產物操作
- **🔀 拉取請求**：建立、審查、合併及管理 PR，具全面狀態追蹤
- **🐛 問題**：完整問題生命週期管理，留言、標籤及指派
- **🔒 安全**：程式碼掃描警示、秘密偵測與 Dependabot 整合
- **🔔 通知**：智能通知管理及庫訂閱控制
- **📁 程式庫管理**：檔案操作、分支管理及程式庫管理
- **👥 協作**：使用者與組織搜尋、團隊管理及存取控制

<strong>實際應用情境</strong>：「從功能分支建立拉取請求」、「顯示本週所有失敗的 CI 執行紀錄」、「列出我管理的所有程式庫的開啟安全警示」或「搜尋所有指派給我的跨組織問題」

<strong>完整示範情境</strong>：這是一個展示 GitHub MCP 伺服器功能的強大工作流程：

> 「我需要準備我們的短衝回顧。顯示本週我建立的所有拉取請求，檢查 CI/CD 管線狀態，建立我們需處理的安全警示摘要，並依據帶有 'feature' 標籤的合併 PR 幫我草擬發行說明。」

GitHub MCP 伺服器將會：
- 查詢你最近的拉取請求並提供詳細狀態資訊
- 分析工作流程執行並標示任何失敗或效能問題
- 彙整安全掃描結果並優先列出關鍵警示
- 從合併 PR 中擷取資訊，產生完整發行說明
- 提供短衝規劃和發行準備的可行後續步驟

<strong>精彩示例</strong>：我很喜歡用它來管理程式碼審查流程。取代在 VS Code、GitHub 通知與拉取請求頁面間跳來跳去，我可以說「顯示所有等我審查的 PR」，接著「在 PR #123 留言詢問驗證方法的錯誤處理」。伺服器會處理 GitHub API 呼叫，維持對話上下文，甚至幫我撰寫更具建設性的審查留言。

<strong>驗證選項</strong>：此伺服器支援 OAuth（在 VS Code 裡無縫）與個人存取權杖（PAT），並可透過設定只啟用你需要的 GitHub 功能模組。你可以選擇作為遠端託管服務快速部署，或本機透過 Docker 執行以獲得完全掌控。

> **💡 專業小技巧**
> 
> 透過設定 MCP 伺服器的 `--toolsets` 參數，僅啟用所需工具集，可減少上下文大小並提升 AI 工具選擇效率。例如，針對核心開發工作流程，添加 `"--toolsets", "repos,issues,pull_requests,actions"`；若主要想要 GitHub 監控功能，則可使用 `"--toolsets", "notifications, security"`。

### 4. 🔄 Azure DevOps MCP 伺服器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

<strong>它的功能</strong>：連接 Azure DevOps 服務，提供完整專案管理、工作項目追蹤、建置管線管理與程式庫操作。

<strong>它的價值</strong>：對於以 Azure DevOps 為主要 DevOps 平台的團隊，此 MCP 伺服器免去你必須不停在開發環境與 Azure DevOps 網頁介面間切換。你可以直接從 AI 助手管理工作項目、查詢建置狀態、查詢程式庫和處理專案管理工作。

<strong>實際應用情境</strong>：「顯示 WebApp 專案目前短衝中的所有活躍工作項目」、「為我剛發現的登入問題建立錯誤回報」，或者「檢查建置管線狀態並顯示任何最近失敗」

<strong>精彩示例</strong>：你可以輕鬆透過簡單查詢「顯示 WebApp 專案目前短衝中的所有活躍工作項目」或「為我剛發現的登入問題建立錯誤回報」，而無需離開你的開發環境。

### 5. 📝 MarkItDown MCP 伺服器
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

<strong>它的功能</strong>：MarkItDown 是一個全面的文件轉換伺服器，能將各種檔案格式轉換成高品質的 Markdown，並針對大型語言模型（LLM）消費及文字分析工作流程進行優化。

<strong>為什麼有用</strong>：現代文件工作流程不可或缺！MarkItDown 可處理令人印象深刻的多種檔案格式，同時保留關鍵的文件結構，如標題、列表、表格和連結。與簡單的文字擷取工具不同，它著重於維護語意意義與格式，對 AI 處理與人類可讀性都非常重要。

<strong>支援的檔案格式</strong>：
- **Office 文件**：PDF、PowerPoint (PPTX)、Word (DOCX)、Excel (XLSX/XLS)
- <strong>多媒體檔案</strong>：影像（具 EXIF 資料及 OCR）、音訊（具 EXIF 資料及語音轉錄）
- <strong>網頁內容</strong>：HTML、RSS 訂閱源、YouTube 連結、維基百科頁面
- <strong>資料格式</strong>：CSV、JSON、XML、ZIP 檔（遞迴處理內容）
- <strong>出版格式</strong>：EPub、Jupyter 筆記本 (.ipynb)
- <strong>電子郵件</strong>：Outlook 郵件 (.msg)
- <strong>進階</strong>：Azure 文件智能整合以強化 PDF 處理

<strong>先進能力</strong>：MarkItDown 支援 LLM 驅動的影像說明（需提供 OpenAI 用戶端）、Azure 文件智能加強PDF處理、語音內容轉錄，以及擴展至更多檔案格式的外掛系統。

<strong>實際應用</strong>：像是「將這份 PowerPoint 簡報轉成 Markdown，供我們的文件網站使用」、「從這份 PDF 擷取文字並保留適當的標題結構」或「把這個 Excel 試算表轉成可閱讀的表格格式」。

<strong>精選範例</strong>：引用 [MarkItDown 文件](https://github.com/microsoft/markitdown#why-markdown)：

> Markdown 非常接近純文字，僅有極少的標記或格式，但仍能呈現重要的文件結構。主流大型語言模型（如 OpenAI 的 GPT-4o）本身「使用」Markdown，且經常無需提示就在回應中嵌入 Markdown。這說明它們在訓練時接觸了大量 Markdown 格式的文本，並且很熟悉 Markdown。附帶好處是，Markdown 的慣例也相當節省字元數。

MarkItDown 非常擅長保存文件結構，對 AI 工作流程尤為重要。例如，在轉換 PowerPoint 簡報時，它會保留投影片組織並使用正確標題、將表格提取為 Markdown 表格、包含圖片的替代文本，甚至處理放映者筆記。圖表會轉成易讀的資料表格，最後輸出的 Markdown 保持原始簡報的邏輯流程。這使它非常適合將簡報內容餵給 AI 系統或從現有投影片建立文件。

### 6. 🗃️ SQL Server MCP 伺服器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

<strong>它的功能</strong>：提供對 SQL Server 資料庫（本地端、Azure SQL 或 Fabric）的對話式存取

<strong>為什麼有用</strong>：類似於 PostgreSQL 伺服器，但專為 Microsoft SQL 生態系打造。只需簡單的連線字串就能開始使用自然語言查詢，毋須切換上下文！

<strong>實際應用</strong>：「找出過去 30 天未完成的所有訂單」可轉換成適當的 SQL 查詢並返回格式化結果。

<strong>精選範例</strong>：設定好資料庫連線後，即可立即開始與資料對話。部落格示範一個簡單問題：「你連接的是哪個資料庫？」MCP 伺服器會調用適當資料工具，連接到你的 SQL Server 實例，並回傳當前資料庫連線的詳細資訊——整個過程不需撰寫一行 SQL。該伺服器支援從結構管理到資料操作的完整資料庫作業，全部透過自然語言提示完成。完整的設置說明及 VS Code 與 Claude Desktop 範例，請參考：[介紹 MSSQL MCP 伺服器（預覽版）](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/)。

### 7. 🎭 Playwright MCP 伺服器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

<strong>它的功能</strong>：讓 AI 代理能與網頁互動，進行測試與自動化

> **ℹ️ 支援 GitHub Copilot**
> 
> Playwright MCP 伺服器是 GitHub Copilot 編碼代理的動力源，讓它擁有網頁瀏覽功能！[了解這項功能](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/)。

<strong>為什麼有用</strong>：非常適合透過自然語言描述驅動的自動化測試。AI 可以瀏覽網站、填寫表單，並透過結構化無障礙快照擷取資料——這功能極為強大！

<strong>實際應用</strong>：「測試登入流程並確認儀表板是否正常載入」或「產生一個測試，在網站搜尋產品並驗證結果頁」——全部不需應用程式原始碼。

<strong>精選範例</strong>：我的隊友 Debbie O'Brien 最近在 Playwright MCP 伺服器做了非常出色的工作！舉例來說，她展示了如何完全不用存取應用程式原始碼，就能產生完整的 Playwright 測試。她的場景是請 Copilot 為電影搜尋應用程式產生測試：瀏覽至網站，搜尋「Garfield」，並驗證電影是否出現在結果中。MCP 啟動了一個瀏覽器會話，透過 DOM 快照探索頁面結構，找出正確的選取器，並生成一份能在第一次執行就通過的完整 TypeScript 測試。

這項技術的強大之處在於它架起自然語言指令與可執行測試代碼之間的橋樑。傳統方法需手動撰寫測試或取得原始碼上下文，但 Playwright MCP 允許你測試外部網站、客戶端應用程式，或在無法接觸代碼的黑盒測試場景中操作。

### 8. 💻 Dev Box MCP 伺服器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>它的功能</strong>：透過自然語言管理 Microsoft Dev Box 環境

<strong>為什麼有用</strong>：大幅簡化開發環境管理！建立、設定與管理開發環境，無需記憶複雜指令。

<strong>實際應用</strong>：「為我們的專案打造一個安裝了最新 .NET SDK 的新 Dev Box」、「檢查所有開發環境的狀態」或「為團隊簡報建立標準化的示範環境」

<strong>精選範例</strong>：我非常喜歡用 Dev Box 進行個人開發。讓我印象深刻的是 James Montemagno 說 Dev Box 非常適合會議示範，因為無論我在使用哪個會議、飯店或飛機 Wi-Fi，都有超快的乙太網路連線。事實上，我最近在從布魯日在搭公車到安特衛普時，手機熱點連線筆電練習示範！接下來我計劃深入研究多重團隊開發環境管理與標準化示範環境。當然，從客戶與同事聽到的另一個重要使用案例，是透過 Dev Box 製作預配置開發環境。兩種情境下，使用 MCP 設定與管理 Dev Box 都能以自然語言互動，且全部留在你的開發環境中。

### 9. 🤖 Microsoft Foundry MCP 伺服器
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

<strong>它的作用</strong>：Microsoft Foundry MCP Server 為開發者提供全面存取 Azure AI 生態系統的能力，包括模型目錄、部署管理、使用 Azure AI Search 的知識索引，以及評估工具。這個實驗性伺服器架起 AI 開發與 Azure 強大 AI 基礎設施之間的橋樑，使構建、部署及評估 AI 應用變得更加容易。

<strong>它的用處</strong>：此伺服器改變您與 Azure AI 服務的互動方式，將企業級 AI 能力直接帶入開發工作流程。您不必再在 Azure 入口網站、文件與 IDE 間切換，可以透過自然語言指令發掘模型、部署服務、管理知識庫、評估 AI 效果。對於構建 RAG（Retrieval-Augmented Generation）應用、管理多模型部署或實施全面 AI 評估流程的開發者尤其強大。

<strong>主要開發者功能</strong>：
- **🔍 模型發現與部署**：瀏覽 Microsoft Foundry 的模型目錄，取得帶程式碼示例的模型詳細資料，並部署模型至 Azure AI 服務
- **📚 知識管理**：建立與管理 Azure AI Search 索引，新增文件，配置索引器，構建複雜 RAG 系統
- **⚡ AI 仲裁整合**：連接 Azure AI Agents，查詢現有代理，評估代理在生產場景的表現
- **📊 評估框架**：執行全面的文字與代理評估，生成 Markdown 報告，實施 AI 應用的品質保證
- **🚀 原型工具**：提供基於 GitHub 的原型設置指南，並存取 Microsoft Foundry Labs 的尖端研究模型

<strong>實際開發者使用範例</strong>：「部署 Phi-4 模型至 Azure AI 服務供我的應用使用」、「為我的文檔 RAG 系統建立新的搜尋索引」、「依據品質指標評估我的代理回應」、「尋找最適合複雜分析任務的推理模型」

<strong>完整示範場景</strong>：這是一個強大的 AI 開發工作流程：

>「我正在建構一個客戶支援代理。幫我從目錄中找一個優秀的推理模型，部署到 Azure AI 服務，從我們的文檔建立知識庫，設置評估框架測試回應品質，再幫我用 GitHub 代幣做測試整合的原型。」

Microsoft Foundry MCP Server 將：
- 查詢模型目錄，根據需求推薦最佳推理模型
- 提供部署命令及您偏好 Azure 區域的配額資訊
- 為您的文檔建立正確結構的 Azure AI Search 索引
- 配置帶有品質指標和安全檢查的評估流程
- 生成支援 GitHub 驗證的原型代碼供即刻測試
- 提供針對您技術棧量身打造的完整設置指南

<strong>特色範例</strong>：作為開發者，我一直很難跟上不同大型語言模型（LLM）的發展。我知道幾個主要模型，但感覺沒能提升足夠的生產力和效率。代幣和配額的管理讓人壓力很大，不知道是否挑對合適模型或浪費預算。最近從 James Montemagno 那裡聽說這個 MCP Server，並向隊友詢問推薦，我很期待實際使用！特別是模型發現功能，對我這種想跳脫常見模型尋找專門優化任務的模型的人非常有幫助。評估框架能協助我驗證結果是否真正提升，而不僅是嘗試新東西。

> **ℹ️ 實驗性狀態**
> 
> 此 MCP 伺服器為實驗性且持續開發中。功能與 API 可能會變更。非常適合探索 Azure AI 能力及構建原型，使用於生產前請驗證穩定性要求。

### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

<strong>它的作用</strong>：為開發者提供建構整合 Microsoft 365 與 Microsoft 365 Copilot AI 代理與應用程序的核心工具，包括結構驗證、範例代碼檢索及故障排除協助。

<strong>它的用處</strong>：針對 Microsoft 365 和 Copilot 開發涉及複雜的宣告式結構與特定開發模式。這個 MCP 伺服器將重要的開發資源直接帶入您的編碼環境，協助您驗證結構、尋找範例代碼並排查常見問題，毋需不停查閱文件。

<strong>實際使用範例</strong>：「驗證我的宣告式代理清單並修正結構錯誤」、「展示實作 Microsoft Graph API 插件的範例代碼」、「協助排解 Teams 應用的認證問題」

<strong>特色範例</strong>：我在 Build 大會與朋友 John Miller 討論 M365 Agents，他推薦了這個 MCP。對於剛接觸 M365 Agents 的開發者特別有用，因為提供範本、示例代碼與構架搭建，能快速上手且免於淹沒於龐大文件。結構驗證功能對避免清單結構錯誤造成的數小時除錯非常實用。

> **💡 專家提示**
> 
> 建議同時利用此伺服器與 Microsoft Learn Docs MCP Server，提供完整的 M365 開發支援 — 前者提供官方文件，後者提供實用開發工具和排錯協助。

## 後續步驟？🔮

## 📋 結論

Model Context Protocol (MCP) 正在改變開發者如何與 AI 助手及外部工具互動。這 10 個 Microsoft MCP 伺服器展現了標準化 AI 整合的威力，使開發者保持高度工作流暢度，並輕鬆存取強大外部功能。

從完整的 Azure 生態系統整合，到專門工具如 Playwright 用於瀏覽器自動化及 MarkItDown 用於文檔處理，這些伺服器展現 MCP 如何提升各種開發場景的生產力。標準化協議確保這些工具無縫協作，打造連貫的開發體驗。

隨著 MCP 生態系統持續演進，積極參與社群、探索新伺服器及開發自訂解決方案，是提升開發效率的關鍵。MCP 的開放標準特性讓您可自由組合不同廠商的工具，打造符合您需求的完美工作流程。

## 🔗 額外資源

- [官方 Microsoft MCP 倉庫](https://github.com/microsoft/mcp)
- [MCP 社群與文件](https://modelcontextprotocol.io/introduction)
- [VS Code MCP 文件](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP 文件](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP 文件](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP 活動](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot 自訂](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days 線上直播 7 月 29/30 日，或隨選觀看](https://aka.ms/mcpdevdays)

## 🎯 練習

1. <strong>安裝與配置</strong>：在您的 VS Code 環境設置一個 MCP 伺服器並測試基本功能。
2. <strong>工作流程整合</strong>：設計一個結合至少三個不同 MCP 伺服器的開發工作流程。
3. <strong>自訂伺服器規劃</strong>：找出您日常開發中的一項任務，規劃製作一個自訂 MCP 伺服器的規範。
4. <strong>效能分析</strong>：比較使用 MCP 伺服器與傳統方法在常見開發任務中的效率差異。
5. <strong>安全評估</strong>：評估在開發環境中使用 MCP 伺服器的安全性問題，並提出最佳實踐建議。

Next:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->