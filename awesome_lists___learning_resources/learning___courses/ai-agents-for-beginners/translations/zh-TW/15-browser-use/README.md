# 建立電腦使用代理人（CUA）

電腦使用代理人可以像人類一樣與網站互動：透過開啟瀏覽器、檢查頁面，並從所見中採取最佳後續行動。在本課程中，您將建立一個瀏覽器自動化代理，搜尋 Airbnb，擷取結構化的房源資料，並找出斯德哥爾摩最便宜的住宿選項。

本課程結合了基於 AI 導航的 Browser-Use、用於瀏覽器控制的 Playwright 和 Chrome DevTools 協定（CDP）、支援視覺推理的 Azure OpenAI，以及用於結構化擷取的 Pydantic。

## 介紹

本課程將涵蓋：

- 理解在何種情況下電腦使用代理比僅用 API 自動化更合適
- 結合 Browser-Use 與 Playwright 及 CDP，以實現可靠的瀏覽器生命週期管理
- 使用 Azure OpenAI 影像辨識與結構化的 Pydantic 輸出，從動態網頁擷取房源資料
- 判斷何時採用代理人優先、角色優先或混合的瀏覽器自動化流程

## 學習目標

完成本課程後，您將能夠：

- 配置 Browser-Use 與 Azure OpenAI 及 Playwright
- 建立一套瀏覽器自動化流程，導航真實網站並處理動態使用者介面元素
- 從可見頁面內容擷取具型別的結果，轉化為後續的商業邏輯
- 根據瀏覽器任務的可預測性，選擇代理人或角色模式

## 範例程式碼

本課程包含一個筆記本教學：

- [15-browser-user.ipynb](./15-browser-user.ipynb)：透過 CDP 啟動 Chrome 瀏覽器，搜尋 Airbnb 斯德哥爾摩房源，使用 Browser-Use 視覺擷取價格，並以結構化資料回傳最便宜選項。

## 前置需求

- Python 3.12+
- 環境中已設定 Azure OpenAI 部署
- 本地安裝 Chrome 或 Chromium
- 已安裝 Playwright 相依套件
- 對非同步 Python 有基本認識

## 環境設定

安裝筆記本中使用的套件：

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

設定筆記本使用的 Azure OpenAI 環境變數：

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# 選用：省略時預設為最新的 API 版本
AZURE_OPENAI_API_VERSION=...
```

## 架構概述

筆記本示範一個混合型的瀏覽器自動化流程：

1. 啟用 CDP 的 Chrome 開啟，讓 Playwright 與 Browser-Use 共用相同的瀏覽器工作階段。
2. Browser-Use 代理人處理開放式導航任務，如開啟 Airbnb、關閉彈跳視窗、搜尋斯德哥爾摩。
3. 以結構化的 Pydantic 架構檢視目前頁面，擷取房源標題、每晚價格、評分和網址。
4. 透過 Python 邏輯比較擷取的房源，突出顯示最便宜的結果。

此方法結合了 Browser-Use 擅長的彈性、視覺推理能力，同時在需要時提供確定性的瀏覽器控制。

## 主要重點與最佳實踐

### 何時使用代理人 vs 角色

| 情境 | 使用代理人 | 使用角色 |
|----------|-----------|-----------|
| 動態版面配置 | 是，AI 可適應頁面變動 | 否，脆弱的選擇器可能失效 |
| 已知結構 | 否，代理人比直接控制慢 | 是，快速且精準 |
| 尋找元素 | 是，自然語言適用 | 否，要求精確選擇器 |
| 時序控制 | 否，較難預測 | 是，完全控制等待和重試 |
| 複雜工作流程 | 是，處理不可預期的 UI 狀態 | 否，需要明確分支 |

### Browser-Use 最佳實踐

1. 初期採用代理人進行探索與動態導航。
2. 互動穩定後，轉為直接頁面控制。
3. 使用結構化輸出模型，確保擷取資料經過驗證且型別安全。
4. 在觸發可見 UI 變化的操作後，有策略地加入延遲。
5. 迭代時拍攝截圖，方便除錯失敗原因。
6. 預期網站會變動，設計因應彈跳視窗與版面變動的備援策略。
7. 混合使用代理人與角色模式，兼具彈性與精準。

### 真實世界應用

- 旅遊訂房與價格監控
- 電商價格比對與庫存檢查
- 從動態網站結構化擷取資料
- 具備視覺感知的 UI 測試與驗證
- 網站監測與警示
- 跨多步驟流程的智能填寫表單

## 其他資源

- [Browser-Use Playwright 整合範本](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use 角色參數與內容擷取](https://docs.browser-use.com/customize/actor/all-parameters)
- [課程設定](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們努力追求準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件之母語版本應被視為權威依據。對於關鍵資訊，建議使用專業人工翻譯。對於因使用此翻譯而產生的任何誤解或誤譯，我們不承擔任何責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->