# 建立電腦使用代理程式 (CUA)

電腦使用代理程式可以像人類一樣與網站互動：透過開啟瀏覽器、檢視頁面，然後根據看到的情況採取下一個最佳行動。在本課程中，你將建立一個瀏覽器自動化代理程式，該代理會搜尋 Airbnb、擷取結構化的房源資料，並找出斯德哥爾摩最便宜的住宿選項。

本課程結合了以 AI 驅動導航的 Browser-Use、Playwright 與 Chrome DevTools Protocol (CDP) 來控制瀏覽器、Azure OpenAI 用於具備視覺能力的推理，還有用於結構化擷取的 Pydantic。

## 簡介

本課程涵蓋：

- 了解什麼時候電腦使用代理程式相比純 API 自動化更適合
- 結合 Browser-Use、Playwright 和 CDP 以獲得可靠的瀏覽器生命週期管理
- 使用 Azure OpenAI 視覺功能與結構化 Pydantic 輸出從動態網頁擷取房源資料
- 判斷何時使用代理優先、行為者優先或混合型瀏覽器自動化工作流程

## 學習目標

完成本課程後，你將會知道如何：

- 使用 Azure OpenAI 與 Playwright 配置 Browser-Use
- 建立導航實際網站並處理動態 UI 元素的瀏覽器自動化工作流程
- 從可見的頁面內容擷取有型別的結果，並將其轉換為下游的業務邏輯
- 根據瀏覽器任務的可預測性，在代理與行為者模式之間做選擇

## 程式碼範例

本課程包含一個筆記本教學：

- [15-browser-user.ipynb](./15-browser-user.ipynb)：透過 CDP 啟動 Chrome 會話，搜尋 Airbnb 斯德哥爾摩房源，使用 Browser-Use 視覺擷取價格，並以結構化資料返回最便宜的選項。

## 先決條件

- Python 3.12+
- 已於你的環境中配置 Azure OpenAI 部署
- 本地安裝 Chrome 或 Chromium
- 已安裝 Playwright 依賴項
- 具備 Python 非同步基礎知識

## 設定

安裝筆記本中所使用的套件：

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

設定筆記本使用的 Azure OpenAI 環境變數：

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# 可選：省略時預設為最新的 API 版本
AZURE_OPENAI_API_VERSION=...
```

## 架構概覽

筆記本展示了一種混合型瀏覽器自動化工作流程：

1. 以啟用 CDP 的方式啟動 Chrome，使 Playwright 和 Browser-Use 可以共用同一個瀏覽器會話。
2. Browser-Use 代理程式負責執行開放式導航任務，例如開啟 Airbnb、關閉彈出視窗，以及搜尋斯德哥爾摩。
3. 使用結構化的 Pydantic 架構檢視目前頁面，擷取房源標題、每晚價格、評分及網址。
4. 以 Python 程式邏輯比較擷取的房源，並突顯最便宜的結果。

此方法保有 Browser-Use 擅長的靈活視覺推理，同時在需要時仍然提供決定性的瀏覽器控制。

## 主要重點與最佳實踐

### 何時使用代理程式 vs 行為者

| 情境 | 使用代理程式 | 使用行為者 |
|----------|-----------|-----------|
| 動態布局 | 是，AI 可適應頁面變動 | 否，選擇器易斷裂 |
| 結構已知 | 否，代理程式較慢 | 是，快速且精準 |
| 尋找元素 | 是，自然語言很有效 | 否，需要精確選擇器 |
| 時間控管 | 否，較不可預測 | 是，完全掌控等待和重試 |
| 複雜流程 | 是，可處理意外 UI 狀況 | 否，需明確分支流程 |

### Browser-Use 最佳實踐

1. 初期以代理程式進行探索與動態導航。
2. 控制互動趨於可預測時，切換至直接操作頁面。
3. 使用結構化輸出模型，確保擷取的資料有型別安全與驗證。
4. 在觸發可見 UI 變化的操作後，策略性加入延遲。
5. 迭代期間截圖，方便偵錯失敗原因。
6. 預期網站會變動，設計對付彈出視窗與布局變化的備援策略。
7. 混用代理及行為者模式，以兼具靈活性與精確度。

### 實際應用範例

- 旅遊訂房與價格監控
- 電商價格比價及庫存檢查
- 從動態網站擷取結構化資料
- 具視覺感知的 UI 測試與驗證
- 網站監控與警報
- 多步驟流程中的智慧表單填寫

## 額外資源

- [Browser-Use Playwright 整合範本](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use 行為者參數與內容擷取](https://docs.browser-use.com/customize/actor/all-parameters)
- [課程設定](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件是使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於關鍵資訊，建議使用專業人工翻譯。我們不對因使用此翻譯而引起的任何誤解或錯誤詮釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->