# 🚀 10 個改變開發者生產力的 Microsoft MCP 伺服器

## 🎯 本指南你將學到什麼

這份實用指南展現了十個正在積極改變開發者使用 AI 助理方式的 Microsoft MCP 伺服器。我們不只是解釋 MCP 伺服器<em>能</em>做什麼，而是展示那些已經在 Microsoft 及其以外的日常開發流程中產生實際影響的伺服器。

本指南中的每個伺服器都是基於真實使用情境及開發者反饋精挑細選。你將不僅了解每個伺服器的功能，更會明白它的重要性，以及如何在自己的專案中最大化其效用。無論你是 MCP 完全新手，還是想擴充已有系統，這些伺服器代表了 Microsoft 生態中一些最實用且具影響力的工具。

> **💡 快速入門小貼士**
> 
> 初次接觸 MCP？別擔心！本指南專為初學者設計，我們會逐步解釋概念，你也可以隨時參考我們的[ MCP 介紹](../00-Introduction/README.md)及[ 核心概念](../01-CoreConcepts/README.md)模組，獲得更深入的背景知識。

## 概覽

本綜合指南深入探討十個正在革命化開發者互動 AI 助理及外部工具方式的 Microsoft MCP 伺服器。從 Azure 資源管理到文件處理，這些伺服器展示了 Model Context Protocol 如何打造無縫且高效的開發工作流程。

## 學習目標

完成本指南後，你將能：
- 理解 MCP 伺服器如何提升開發者生產力
- 了解 Microsoft 最有影響力的 MCP 伺服器實現
- 發掘每個伺服器的實際應用情境
- 知道如何在 VS Code 和 Visual Studio 中設定與配置這些伺服器
- 探索更廣泛的 MCP 生態系及未來發展方向

## 🔧 了解 MCP 伺服器：初學者指南

### 什麼是 MCP 伺服器？

作為 Model Context Protocol（MCP）新手，你可能會問：「MCP 伺服器到底是什麼？為什麼我需要關心？」讓我們從簡單的比喻開始。

把 MCP 伺服器想像成專門助理，幫你的 AI 編碼夥伴（如 GitHub Copilot）連接外部工具和服務。就像你手機用不同的應用程式完成不同工作—一個用看天氣，一個用導航，一個用銀行服務—MCP 伺服器給你的 AI 助理交流各種開發工具與服務的能力。

### MCP 伺服器解決的問題

在 MCP 伺服器出現之前，如果你想要：
- 檢查 Azure 資源
- 建立 GitHub 問題單
- 查詢資料庫
- 搜索文件

你得暫停寫碼，打開瀏覽器，前往相關網站，然後手動執行這些任務。這種頻繁切換上下文打斷了你的工作流程，降低生產力。

### MCP 伺服器如何改變你的開發體驗

利用 MCP 伺服器，你可以留在開發環境（VS Code、Visual Studio 等），只需請求 AI 助理處理這些任務。例如：

**傳統流程：**  
1. 停止寫碼  
2. 開啟瀏覽器  
3. 前往 Azure 入口網站  
4. 查詢儲存帳戶細節  
5. 返回 VS Code  
6. 繼續編碼  

**現在這樣做：**  
1. 問 AI：「我的 Azure 儲存帳戶狀態如何？」  
2. 利用得到的資訊繼續寫碼  

### 初學者的核心好處

#### 1. 🔄 <strong>保持專注狀態</strong>  
- 不需在多個應用間切換  
- 專注於你正在編寫的程式碼  
- 減少管理工具切換的心理負擔  

#### 2. 🤖 <strong>用自然語言代替複雜指令</strong>  
- 不需記憶 SQL 語法，直接描述想要的資料  
- 不用背 Azure CLI 指令，只要講出你的目標  
- AI 負責技術細節，你專注邏輯  

#### 3. 🔗 <strong>連接多個工具</strong>  
- 結合不同服務打造強大工作流程  
- 例如：「抓取所有最近 GitHub 問題並建立對應的 Azure DevOps 工作項目」  
- 不用寫繁複自動化腳本  

#### 4. 🌐 <strong>存取不斷成長的生態系</strong>  
- 利用 Microsoft、GitHub 及其他公司的伺服器  
- 輕鬆混合與搭配不同供應商的工具  
- 加入標準化生態，跨不同 AI 助理使用  

#### 5. 🛠️ <strong>邊做邊學</strong>  
- 先從預置伺服器開始理解概念  
- 慢慢打造自己的伺服器  
- 拿現有 SDK 與文件輔助學習  

### 初學者的實際例子

假如你是網頁開發新手，正著手第一個專案。MCP 伺服器如何幫助你：

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
  
**使用 MCP 伺服器：**  
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```
  

### 企業標準的優勢

MCP 正逐步成為業界標準，這意味著：  
- <strong>一致性</strong>：不同工具與公司有類似體驗  
- <strong>互通性</strong>：不同供應商的伺服器可協同運作  
- <strong>未來保障</strong>：技能與設定可在不同 AI 助理間轉移  
- <strong>社群</strong>：龐大生態共享知識與資源  

### 開始學習：你將會學到什麼

這份指南會介紹 10 個對各層次開發者特別有用的 Microsoft MCP 伺服器。每個伺服器都設計來：  
- 解決常見開發問題  
- 減少重複任務  
- 提升程式碼品質  
- 增加學習機會  

> **💡 學習小貼士**  
> 
> 如果你完全沒接觸過 MCP，先看我們的[ MCP 介紹](../00-Introduction/README.md)與[ 核心概念](../01-CoreConcepts/README.md)模組，然後回來瞭解這些概念如何於 Microsoft 實際工具中應用。  
>  
> 想進一步了解 MCP 的重要性，可參考 Maria Naggaga 的文章：[Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps)。

## 在 VS Code 和 Visual Studio 使用 MCP 🚀

如果使用 Visual Studio Code 或 Visual Studio 2022 搭配 GitHub Copilot，設定這些 MCP 伺服器非常簡單。

### VS Code 設定

VS Code 的基本流程如下：

1. <strong>啟用代理模式</strong>：在 VS Code 的 Copilot Chat 視窗切換到代理模式  
2. **配置 MCP 伺服器**：將伺服器設定新增到你的 VS Code settings.json 檔案  
3. <strong>啟動伺服器</strong>：點選你想使用的每個伺服器的「啟動」按鈕  
4. <strong>選擇工具</strong>：挑選要在當前工作階段啟用的 MCP 伺服器  

詳細設定說明請參考[VS Code MCP 文件](https://code.visualstudio.com/docs/copilot/copilot-mcp)。

> **💡 專業小提示：專業管理 MCP 伺服器！**  
> 
> VS Code 擴充視圖現在有[方便的新介面管理已安裝的 MCP 伺服器](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)！你可以用簡潔明瞭的介面快速啟動、停止和管理任何 MCP 伺服器，趕快試試看！

### Visual Studio 2022 設定

Visual Studio 2022 (版本 17.14 或以上) 設定步驟：

1. <strong>啟用代理模式</strong>：在 GitHub Copilot Chat 視窗點選「提問」下拉，選擇「代理」  
2. <strong>建立配置檔</strong>：在解決方案目錄中建立 `.mcp.json` 檔案（建議位置：`<SOLUTIONDIR>\.mcp.json`）  
3. <strong>配置伺服器</strong>：使用標準 MCP 格式新增伺服器設定  
4. <strong>工具批准</strong>：出現提示時，允許工具使用適當範圍的權限  

詳細 Visual Studio 設定指引參考[Visual Studio MCP 文件](https://learn.microsoft.com/visualstudio/ide/mcp-servers)。

每個 MCP 伺服器都有自己的配置需求（連線字串、驗證等），但兩個 IDE 的設定模式是一致的。

## 從 Microsoft MCP 伺服器學到的經驗 🛠️

### 1. 📚 Microsoft Learn Docs MCP 伺服器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>功能說明</strong>：Microsoft Learn Docs MCP 伺服器是一個雲端服務，透過 Model Context Protocol 為 AI 助理提供即時存取官方 Microsoft 文件的能力。它連接至 `https://learn.microsoft.com/api/mcp`，啟用對 Microsoft Learn、Azure 文件、Microsoft 365 文件及其他官方 Microsoft 資源的語義搜尋。

<strong>為何有用</strong>：看似「只是文件」，但這伺服器對於所有使用 Microsoft 技術的開發者至關重要。許多 .NET 開發者對 AI 編碼助理的最大抱怨是它們未更新到最新的 .NET 與 C# 發布版本。Microsoft Learn Docs MCP 伺服器通過提供最新文件、API 參考與最佳實踐的即時存取，解決了這個問題。無論你在使用最前沿的 Azure SDK、探索新的 C# 13 功能，還是實作尖端的 .NET Aspire 模式，都能確保 AI 助理獲得權威且即時的資訊以產出準確、現代的程式碼。

<strong>實務運用</strong>：「根據官方 Microsoft Learn 文件，建立 Azure 容器應用的 az cli 指令是什麼？」或「如何在 ASP.NET Core 中使用依賴注入配置 Entity Framework？」又或者是「幫我檢視這段程式碼是否符合 Microsoft Learn 文件中的效能建議。」此伺服器運用先進語義搜尋，全方位涵蓋 Microsoft Learn、Azure 文件與 Microsoft 365 文件，找到最相關的內容。它最多回傳 10 段高品質內容區塊，包括文章標題與 URL，且始終存取最新文件。

<strong>代表範例</strong>：此伺服器提供 `microsoft_docs_search` 工具，可對 Microsoft 官方技術文件執行語義搜尋。配置後，你可以問類似「如何在 ASP.NET Core 實作 JWT 認證？」的問題，得到詳細官方答覆與來源連結。搜尋品質優秀，因為它理解上下文—在 Azure 相關語境下問「containers」，會回傳 Azure 容器實例文件；同一詞在 .NET 語境下，則回傳相關 C# 集合資訊。

這對快速變動或新近更新的函式庫與用例特別有用。例如，我近期開發專案想利用最新釋出的 .NET Aspire 與 Microsoft.Extensions.AI 功能，藉由引入 Microsoft Learn Docs MCP 伺服器，不只用到 API 文件，還有剛發布的操作指引與教學。

> **💡 專業小貼士**  
>  
> 即使是熟練工具的模型也需引導使用 MCP 工具！考慮加入系統提示或[ copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot)，例如：「你有權使用 `microsoft.docs.mcp`，在處理有關 C#、Azure、ASP.NET Core 或 Entity Framework 的 Microsoft 技術問題時，請利用本工具搜尋 Microsoft 最新官方文件。」  
>  
> 想看活用的好範例，可參考 Awesome GitHub Copilot 倉庫中的 [C# .NET 清潔模式 chatmode](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md)。此模式專門利用 Microsoft Learn Docs MCP 伺服器，協助使用最新模式和最佳實踐來清理和現代化 C# 程式碼。  

### 2. ☁️ Azure MCP 伺服器
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

<strong>它的功能</strong>：Azure MCP Server 是一套全面的 15+ 專門化 Azure 服務連接器，將整個 Azure 生態系統帶入你的 AI 工作流程。這不僅僅是一個單一伺服器——它是一個強大的集合，包含資源管理、資料庫連接（PostgreSQL、SQL Server）、使用 KQL 的 Azure Monitor 日誌分析、Cosmos DB 整合，還有更多功能。

<strong>它的用處</strong>：除了管理 Azure 資源之外，當你使用 Azure MCP 的 Agent 模式時，它能大幅提升使用 Azure SDK 時的程式碼質量。它不只是幫助你撰寫程式碼——而是幫你寫出符合當前認證模式、錯誤處理最佳做法且利用最新 SDK 功能的更優質 Azure 程式碼。你得到的不是一般可能可行的程式碼，而是符合 Azure 推薦生產工作負載模式的程式碼。

<strong>主要模組包括</strong>：
- **🗄️ 資料庫連接器**：用自然語言直接訪問 Azure Database for PostgreSQL 和 SQL Server
- **📊 Azure Monitor**：基於 KQL 的日誌分析與營運洞察
- **🌐 資源管理**：完整的 Azure 資源生命週期管理
- **🔐 認證**：DefaultAzureCredential 與管理身份模式
- **📦 儲存服務**：Blob 儲存、佇列儲存與表格儲存操作
- **🚀 容器服務**：Azure Container Apps、Container Instances 及 AKS 管理
- <strong>以及更多專門連接器</strong>

<strong>實際應用</strong>："列出我的 Azure 儲存帳戶"、"查詢我的 Log Analytics 工作區過去一小時內的錯誤"、或是 "幫我用 Node.js 建立一個具備正確認證的 Azure 應用程式"

<strong>完整示範情境</strong>：這裡有一個完整的演示，展示如何在 VS Code 中結合 Azure MCP 與 GitHub Copilot for Azure 擴充功能的強大功能。當你同時安裝並輸入提示：

> "建立一個 Python 腳本，使用 DefaultAzureCredential 認證將檔案上傳到 Azure Blob Storage。腳本應連接到我名為 'mycompanystorage' 的 Azure 儲存帳戶，上傳至名為 'documents' 的容器，建立一個帶有當前時間戳的測試檔案來上傳，優雅地處理錯誤並提供資訊輸出，遵循 Azure 認證及錯誤處理最佳實踐，並包含說明 DefaultAzureCredential 認證運作原理的註解，腳本結構良好，包含合適的函數與文件化。"

Azure MCP Server 將產生一個完整、可用於生產的 Python 腳本，該腳本：
- 使用最新的 Azure Blob Storage SDK 與正確的非同步模式
- 實作 DefaultAzureCredential，並詳盡說明完整的備援鏈
- 包含健壯的錯誤處理，涵蓋具體的 Azure 例外類型
- 遵循 Azure SDK 最佳實踐管理資源與連線
- 提供詳細日誌與清晰的終端機輸出
- 建立結構良好的腳本，含函式、文件與型別提示

這點非常突出，因為沒有 Azure MCP 你可能只得到可用但不符合現代 Azure 模式的泛泛 blob 儲存程式碼；有了 Azure MCP，你獲得的是利用最新認證方法、能處理 Azure 特定錯誤場景，並遵循 Microsoft 推薦的生產應用最佳實務的程式碼。

<strong>特色範例</strong>：我常常忘記 `az` 與 `azd` CLI 的特定命令，對我來說通常是兩步驟：先查語法，再執行命令。我經常直接開啟入口網站點點點完成工作，因為不想承認我記不住 CLI 語法。只要能用描述語言說出我想做什麼就很神奇，而且能夠不離開我的 IDE 就做到更棒！

在 [Azure MCP repository](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server) 有很多很棒的使用案例列表幫你起步。要完整設定指南與進階設定選項，請參考 [官方 Azure MCP 文件](https://learn.microsoft.com/azure/developer/azure-mcp-server/)。

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

<strong>它的功能</strong>：官方 GitHub MCP Server 提供與 GitHub 全生態系統順暢整合，支援托管遠端存取與本機 Docker 部署選項。它不僅限於基礎的儲存庫操作——包含 GitHub Actions 管理、Pull Request 工作流程、議題追蹤、安全掃描、通知以及進階自動化功能的完整工具組。

<strong>它的用處</strong>：該伺服器改變你與 GitHub 的互動方式，將完整平台體驗直接帶到你的開發環境。你不用再頻繁在 VS Code 和 GitHub.com 之間切換，管理專案、程式碼審查和 CI/CD 監控可直接透過自然語言指令，在專注程式碼的同時完成。

> **ℹ️ 注意：不同類型的「Agent」**
> 
> 不要把這個 GitHub MCP Server 和 GitHub 的 Coding Agent（你可分派議題去自動執行程式碼任務的 AI 代理人）搞混。GitHub MCP Server 在 VS Code 的 Agent 模式內工作，提供 GitHub API 整合，而 GitHub Coding Agent 是另一個獨立功能，負責被指派的 GitHub 議題建立 Pull Request。

<strong>主要功能包括</strong>：
- **⚙️ GitHub Actions**：完整的 CI/CD 管線管理、工作流程監控與工件處理
- **🔀 Pull Requests**：建立、審查、合併及管理 PR，含完整狀態追蹤
- **🐛 議題**：完整的議題生命週期管理、留言、標籤和指派
- **🔒 安全**：程式碼掃描警示、秘密偵測與 Dependabot 整合
- **🔔 通知**：智慧通知管理與儲存庫訂閱控制
- **📁 儲存庫管理**：檔案操作、分支管理與儲存庫管理
- **👥 協作**：使用者及組織搜尋、團隊管理與存取權控制

<strong>實際應用</strong>："從我的功能分支建立一個 Pull Request"、"顯示這週所有失敗的 CI 運行"、"列出我所有儲存庫的未解決安全警示"、或是 "查找所有分派給我的跨組織議題"

<strong>完整示範情境</strong>：這裡有個強大的流程展示 GitHub MCP Server 功能：

> "我要準備我們的短衝會議。顯示我本週建立的所有 Pull Requests，檢查我們 CI/CD 管線狀態，建立需處理的安全警示摘要，並協助根據帶 'feature' 標籤的合併 PR 撰寫釋出說明。"

GitHub MCP Server 將：
- 查詢你最近的 Pull Requests 及詳細狀態資訊
- 分析工作流程運行，並標示任何失敗或效能問題
- 編輯安全掃描結果，優先顯示關鍵警示
- 從已合併 PR 擷取資訊生成綜合釋出說明
- 提供短衝規劃及釋出準備的可行後續步驟

<strong>特色範例</strong>：我很喜歡用它來做程式碼審查工作流程。無需頻繁在 VS Code、GitHub 通知和 PR 頁面跳轉，我可以說「顯示所有我正在審查的 PR」，接著說「在 PR #123 加留言詢問認證方法的錯誤處理」。伺服器會處理 GitHub API 呼叫、維持討論上下文，甚至幫我撰寫更具建設性的審查評論。

<strong>認證選項</strong>：支援 OAuth（在 VS Code 內無縫）和個人存取權杖，且可設定只啟用所需 GitHub 功能模組。可作為遠端托管服務快速設定，或本機 Docker 部署以完全掌控。

> **💡 專業提示**
> 
> 只啟用你需要的工具集，透過在 MCP 伺服器設定內設定 `--toolsets` 參數來減少上下文大小並提升 AI 工具選擇效率。例如，對核心開發流程加上 `"--toolsets", "repos,issues,pull_requests,actions"`，或僅針對 GitHub 監控功能使用 `"--toolsets", "notifications, security"`。
### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

<strong>它的功能</strong>：連接到 Azure DevOps 服務，提供全面的專案管理、工作項目追蹤、建置管線管理與儲存庫操作。

<strong>它的用處</strong>：對於使用 Azure DevOps 作為主要 DevOps 平台的團隊，此 MCP 伺服器消除你在開發環境與 Azure DevOps 網頁介面間頻繁切換的麻煩。你可以直接從 AI 助手管理工作項目、檢查建置狀態、查詢儲存庫和處理專案管理任務。

<strong>實際應用</strong>："顯示 WebApp 專案當前短衝內所有活動的工作項目"、"建立我剛發現的登入問題的錯誤報告"、或是 "檢查我們建置管線狀態並顯示最近失敗的項目"

<strong>特色範例</strong>：你只需簡單查詢如「顯示 WebApp 專案當前短衝的所有活動工作項目」或「建立我剛找到的登入問題錯誤報告」，即可輕鬆檢查團隊近期短衝狀況，無需離開開發環境。

### 5. 📝 MarkItDown MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

<strong>它的功能</strong>：MarkItDown 是一個全面的文件轉換伺服器，可以將多種檔案格式轉換為高質量的 Markdown，針對大型語言模型（LLM）使用和文本分析工作流程進行最佳化。

<strong>它的用途</strong>：現代文件工作流程的必備工具！MarkItDown 支援廣泛的檔案格式，同時保留重要文件結構，如標題、清單、表格和連結。不同於簡單的文字擷取工具，它專注於維持語義意義和格式，對 AI 處理和人類可讀性都非常有價值。

<strong>支援的檔案格式</strong>：
- **Office 文件**：PDF、PowerPoint（PPTX）、Word（DOCX）、Excel（XLSX/XLS）
- <strong>媒體檔案</strong>：圖片（含 EXIF 元資料和 OCR）、音訊（含 EXIF 元資料和語音轉錄）
- <strong>網頁內容</strong>：HTML、RSS 訂閱、YouTube 連結、維基百科頁面
- <strong>資料格式</strong>：CSV、JSON、XML、ZIP 檔案（遞迴處理內容）
- <strong>出版格式</strong>：EPub、Jupyter 筆記本（.ipynb）
- <strong>電子郵件</strong>：Outlook 郵件（.msg）
- <strong>進階</strong>：整合 Azure Document Intelligence 強化 PDF 處理

<strong>進階功能</strong>：MarkItDown 支援大型語言模型驅動的影像描述（需提供 OpenAI 用戶端）、Azure Document Intelligence 增強 PDF 處理、音頻語音轉錄，以及可擴展的插件系統以支援更多檔案格式。

<strong>實際應用</strong>：「將這份 PowerPoint 簡報轉成我們文件網站使用的 Markdown」、「從這份 PDF 提取文字並保留正確的標題結構」，或「將 Excel 試算表轉換為可讀的表格格式」等。

<strong>特色範例</strong>：引用 [MarkItDown 文件](https://github.com/microsoft/markitdown#why-markdown) 中的說明：

> Markdown 非常接近純文字，使用最小的標記或格式，但仍能表示重要的文件結構。主流大型語言模型，如 OpenAI 的 GPT-4o，天生「會說」Markdown，且常常在回答中自動使用 Markdown。這顯示它們經過大量 Markdown 格式化文本的訓練，並且理解它。此外，Markdown 規範在標記效率上也非常節省資源。

MarkItDown 非常擅長保留文件結構，這對 AI 工作流程至關重要。例如，轉換 PowerPoint 簡報時，它保持幻燈片組織及適當標題，提取表格為 Markdown 表格，圖片包含替代文字，甚至處理講者筆記。圖表會轉成可讀的資料表格，而轉出的 Markdown 能保持原簡報的邏輯流程。這讓它非常適合將簡報內容輸入 AI 系統或從現有投影片建立文件。

### 6. 🗃️ SQL Server MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

<strong>它的功能</strong>：提供對 SQL Server 資料庫（本地部署、Azure SQL 或 Fabric）的對話式存取

<strong>它的用途</strong>：類似 PostgreSQL 伺服器，但針對 Microsoft SQL 生態系統。只需簡單連線字串即能開始用自然語言查詢，無需切換上下文！

<strong>實際應用</strong>：「找出過去 30 天未完成的所有訂單」會轉換成適當的 SQL 查詢並回傳格式化結果。

<strong>特色範例</strong>：建立資料庫連線後，即可立刻跟資料庫對話。部落格文章以簡單問題示範：「你連接的是哪個資料庫？」MCP 伺服器會呼叫相應資料庫工具，連接 SQL Server 執行個體，並回報目前資料庫連線資訊，且無需撰寫任何 SQL。伺服器支援從架構管理到資料操作的完整資料庫作業，全透過自然語言提示執行。欲了解完整設置說明及 VS Code 和 Claude Desktop 的配置範例，請參閱：[Introducing MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/)。

### 7. 🎭 Playwright MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

<strong>它的功能</strong>：使 AI 代理能與網頁互動，進行測試和自動化

> **ℹ️ 為 GitHub Copilot 提供動力**
> 
> Playwright MCP Server 為 GitHub Copilot 的編碼代理提供網頁瀏覽功能！[了解此功能詳情](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/)。

<strong>它的用途</strong>：非常適合用自然語言說明推動自動化測試。AI 能瀏覽網站、填寫表單，並透過結構化的無障礙快照擷取資料 — 這真的非常強大！

<strong>實際應用</strong>：「測試登入流程並驗證儀表板是否正確載入」或「產生一個測試用來搜尋產品並驗證結果頁」 — 全部無需應用程式的原始碼。

<strong>特色範例</strong>：我的同事 Debbie O'Brien 最近在 Playwright MCP Server 上做了驚人工作。例如，她展示了如何不接觸應用程式原始碼就能產生完整的 Playwright 測試。她的情境是請 Copilot 建立一個電影搜尋應用程式的測試：導航至網站、搜尋「Garfield」，並驗證電影是否出現在結果中。MCP 啟動瀏覽器會話，利用 DOM 快照探索頁面結構，找出合適的選取器，並產生一個可運作的 TypeScript 測試，且第一次執行就成功。

這非常強大的原因是它橋接了自然語言指令與可執行測試碼之間的差距。傳統方法需要手動撰寫測試或必須存取程式碼庫以了解上下文。但透過 Playwright MCP，你可以測試外部網站、客戶端應用程式，甚至在黑箱測試場景下，當無法存取程式碼時照樣測試。

### 8. 💻 Dev Box MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>它的功能</strong>：透過自然語言管理 Microsoft Dev Box 環境

<strong>它的用途</strong>：大幅簡化開發環境管理！無需記住特定指令，就能建立、配置和管理開發環境。

<strong>實際應用</strong>：「建立一個包含最新 .NET SDK 的新 Dev Box 並為我們的專案配置」、「檢查我所有開發環境的狀態」，或「為團隊演示建立一個標準化示範環境」。

<strong>特色範例</strong>：我個人非常喜歡用 Dev Box 進行開發。James Montemagno 說過 Dev Box 用來做會議示範很棒，因為不論是在會議、飯店或飛機上的 Wi-Fi 如何，它都有超快速的乙太網連線。事實上，我前陣子在布魯日到安特衛普的巴士上，透過手機熱點用筆電練習會議示範！接下來我要深入研究多人團隊如何管理多個開發環境和標準化示範環境。當然，我聽到客戶和同事說，另一大用例是利用 Dev Box 做預先配置的開發環境。這兩種情況都用 MCP 來配置和管理 Dev Box，讓你以自然語言互動，同時留在開發環境中。

### 9. 🤖 Microsoft Foundry MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

<strong>它的功能</strong>：Microsoft Foundry MCP Server 為開發者提供完整存取 Azure AI 生態系統的能力，包括模型目錄、部署管理、結合 Azure AI 搜尋的知識索引以及評估工具。這個實驗性服務器架起 AI 開發與 Azure 強大 AI 基礎設施之間的橋樑，使建置、部署和評估 AI 應用程式更加容易。

<strong>它的用途</strong>：此服務器改變了您使用 Azure AI 服務的方式，將企業級 AI 能力直接帶入您的開發流程。您無需在 Azure 入口網站、文件和 IDE 之間切換，即可透過自然語言指令探索模型、部署服務、管理知識庫和評估 AI 表現。它對於建置 RAG（檢索增強生成）應用程式、管理多模型部署或實施完整 AI 評估流程的開發者尤其強大。

<strong>主要開發功能</strong>：
- **🔍 模型探索與部署**：探索 Microsoft Foundry 的模型目錄，獲取帶有程式碼範例的詳細模型資訊，並部署模型到 Azure AI 服務
- **📚 知識管理**：建立與管理 Azure AI 搜尋索引，添加文件，配置索引器，並構建先進的 RAG 系統
- **⚡ AI 代理整合**：連接 Azure AI 代理，查詢現有代理，並評估生產環境中代理的效能
- **📊 評估框架**：執行全面的文字與代理評估，生成 Markdown 報告，實施 AI 應用程式的品質保證
- **🚀 原型工具**：取得基於 GitHub 的原型設置說明，並訪問 Microsoft Foundry Labs 的最先進研究模型

<strong>實際開發使用</strong>：“為我的應用程式將 Phi-4 模型部署到 Azure AI 服務”、“為我的文件 RAG 系統建立新的搜尋索引”、“根據品質指標評估我代理的回應” 或 “尋找最適合我複雜分析任務的推理模型”

<strong>完整示範場景</strong>：這是一個強大的 AI 開發流程：

> “我正在建置一個客戶支援代理。幫我從目錄中找一個好的推理模型，部署到 Azure AI 服務，從我們的文件建立知識庫，設定一個評估框架來測試回應品質，然後協助我利用 GitHub 令牌來原型整合與測試。”

Microsoft Foundry MCP Server 將會：
- 根據您的需求查詢模型目錄以推薦最佳推理模型
- 為您偏好的 Azure 區域提供部署指令和配額資訊
- 使用適當的結構為您的文件建立 Azure AI 搜尋索引
- 配置包含品質指標和安全檢查的評估流程
- 生成帶有 GitHub 認證的原型程式碼以供立即測試
- 提供專門針對您技術堆疊的完整設置指南

<strong>特色範例</strong>：作為開發者，我一直難以跟上各種 LLM 模型的變化。我知道幾個主要模型，但總覺得錯過了一些生產力和效率的提升。代幣和配額讓人緊張且難以管理——我永遠不知道自己是否挑對模型用於正確任務，或是不小心浪費預算。我剛從 James Montemagno 那裏聽說了這個 MCP Server，當時正與隊友討論 MCP Server 推薦，現在我很期待試用！對像我這樣想探索除常見模型外更優化特定任務模型的人來說，模型探索功能特別令人印象深刻。評估框架能幫助我驗證實際結果是否提升，而不僅僅是嘗試新東西。

> **ℹ️ 實驗性狀態**
> 
> 此 MCP 服務器仍在實驗及積極開發中，功能和 API 可能會變動。非常適合探索 Azure AI 功能和構建原型，但用於生產時請評估穩定性需求。
### 10. 🏢 Microsoft 365 代理工具包 MCP 服務器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

<strong>它的功能</strong>：為開發者提供建置與 Microsoft 365 及 Microsoft 365 Copilot 整合的 AI 代理與應用程式的基本工具，包括結構驗證、範例程式碼檢索與疑難排解協助。

<strong>它的用途</strong>：為 Microsoft 365 和 Copilot 建置涉及複雜的 manifest 結構以及特定的開發模式。此 MCP 服務器將必要的開發資源直接帶入您的編碼環境，幫助您驗證結構、尋找範例程式碼，並在無需頻繁查閱文件的情況下排查常見問題。

<strong>實際使用</strong>："驗證我的宣告式代理清單並修正結構錯誤"、"顯示我實作 Microsoft Graph API 插件的範例程式碼" 或 "協助我排查 Teams 應用程序認證問題"

<strong>特色範例</strong>：我在 Build 期間與我的朋友 John Miller 談到 M365 Agents 後，他推薦了這個 MCP。對於剛接觸 M365 Agents 的開發者而言，這很棒，因為它提供範本、範例程式碼和腳手架，讓您不必淹沒在文件裡便能快速上手。結構驗證功能特別實用，可避免 manifest 結構錯誤引發數小時的除錯。

> **💡 專業提示**
> 
> 建議將此伺服器與 Microsoft Learn Docs MCP 服務器一起使用，以達到全面的 M365 開發支援——一個提供官方文件，另一個則提供實用的開發工具與疑難排解協助。


## 接下來是什麼？ 🔮

## 📋 結論

Model Context Protocol (MCP) 正在改變開發者與 AI 助理及外部工具互動的方式。這 10 個 Microsoft MCP 伺服器展示了標準化 AI 整合的力量，使開發者能無縫地維持工作流程，同時存取強大的外部功能。

從全面整合 Azure 生態系統到 Playwright 用於瀏覽器自動化以及 MarkItDown 用於文件處理等專門工具，這些伺服器展示了 MCP 如何提升不同開發場景下的生產力。標準化協定確保這些工具無縫協作，打造出一個連貫的開發體驗。

隨著 MCP 生態系統持續發展，積極參與社群、探索新伺服器、建立自訂解決方案將是最大化開發效率的關鍵。MCP 作為開放標準，使您能從不同供應商混合搭配工具，打造符合您特定需求的完美工作流程。

## 🔗 其他資源

- [官方 Microsoft MCP 倉庫](https://github.com/microsoft/mcp)
- [MCP 社群與文件](https://modelcontextprotocol.io/introduction)
- [VS Code MCP 文件](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP 文件](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP 文件](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP 事件](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot 自訂](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP 開發日直播 7 月 29/30 日 或隨選觀看](https://aka.ms/mcpdevdays)

## 🎯 練習

1. <strong>安裝與設定</strong>：於您的 VS Code 環境中設置一個 MCP 服務器並測試基本功能。
2. <strong>工作流程整合</strong>：設計一個結合至少三個不同 MCP 服務器的開發工作流程。
3. <strong>自訂服務器規劃</strong>：找出您日常開發中可從自訂 MCP 服務器獲益的任務，並為該服務器制定規格。
4. <strong>效能分析</strong>：比較使用 MCP 服務器與傳統方法來執行常用開發任務的效率。
5. <strong>安全評估</strong>：評估在您的開發環境使用 MCP 服務器的安全影響，並提出最佳實踐。


Next:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->