# 建立電腦使用代理程式（CUA）

電腦使用代理程式可以以與人類相同的方式與網站互動：透過開啟瀏覽器、檢查網頁，並根據所見採取下一個最佳行動。在本課程中，您將建立一個瀏覽器自動化代理程式，用於搜尋 Airbnb，提取結構化的房源資料，並確定斯德哥爾摩最便宜的住宿。

本課程結合了利用 AI 進行導航的 Browser-Use、Playwright 與 Chrome DevTools Protocol（CDP）來控制瀏覽器、具備視覺推理能力的 Azure OpenAI，以及用來結構化提取的 Pydantic。

## 簡介

本課程將涵蓋：

- 了解何時電腦使用代理程式比僅使用 API 的自動化更適合
- 結合 Browser-Use 與 Playwright 及 CDP 以可靠地管理瀏覽器生命週期
- 利用 Azure OpenAI 視覺和結構化 Pydantic 輸出，從動態網頁中抽取房源資料
- 決定何時使用以代理為先、以執行者為先，或混合瀏覽器自動化工作流程

## 學習目標

完成本課程後，您將能夠：

- 設定 Browser-Use 並結合 Azure OpenAI 及 Playwright
- 建立一個瀏覽器自動化工作流程，可瀏覽真實網站並處理動態 UI 元素
- 從可見頁面內容提取型別化結果，並轉化為下游商業邏輯
- 根據瀏覽器任務的可預測性，選擇代理或執行者模式

## 程式碼範例

本課程包含一個Notebook教學：

- [15-browser-user.ipynb](./15-browser-user.ipynb)：啟動 CDP 連接的 Chrome 會話，在 Airbnb 搜尋斯德哥爾摩房源，使用 Browser-Use 視覺抽取價格，最後以結構化資料回傳最便宜方案。

## 先決條件

- Python 3.12+
- 已在環境中配置 Azure OpenAI 部署
- 本機安裝 Chrome 或 Chromium
- 已安裝 Playwright 相關依賴
- 對異步 Python 有基本認識

## 安裝設定

安裝 Notebook 中使用的套件：

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```


設定 Notebook 使用的 Azure OpenAI 環境變數：

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# 可選：省略時默認為最新的 API 版本
AZURE_OPENAI_API_VERSION=...
```

## 架構概覽

Notebook 演示混合瀏覽器自動化工作流程：

1. 開啟啟用 CDP 的 Chrome，Playwright 和 Browser-Use 可共享同一瀏覽器會話。
2. Browser-Use 代理處理開放式導航任務，如開啟 Airbnb、關閉彈出視窗及搜尋斯德哥爾摩。
3. 以結構化的 Pydantic schema 檢視當前頁面，抽取房源標題、每晚價格、評分與網址。
4. Python 邏輯比較抽取到的房源並標示最便宜的結果。

此方法保留了 Browser-Use 擅長的靈活視覺推理，同時在需要時提供確定性的瀏覽器控制。

## 主要重點與最佳實務

### 何時使用代理或執行者

| 情境 | 使用代理 | 使用執行者 |
|----------|-----------|-----------|
| 動態布局 | 是，AI 能適應頁面變化 | 否，脆弱的選擇器容易損壞 |
| 已知結構 | 否，代理較執行者慢 | 是，快速且精確 |
| 尋找元素 | 是，自然語言表達效果佳 | 否，需要精確選擇器 |
| 時間控制 | 否，不易預測 | 是，完全掌控等待及重試 |
| 複雜工作流程 | 是，能處理意外 UI 狀況 | 否，需要明確分支 |

### Browser-Use 最佳實務

1. 初期使用代理探索及動態導航。
2. 互動變得可預測時，轉為直接控制頁面。
3. 使用結構化輸出模型，確保提取資料驗證及型別安全。
4. 在觸發可見 UI 變化後策略性加入延遲。
5. 迭代過程中拍攝螢幕截圖，方便除錯。
6. 預期網站會變動，設計備援策略應對彈窗與佈局變動。
7. 混合使用代理與執行者模式，兼顧靈活性與精確度。

### 實際應用場景

- 旅遊預訂與價格監控
- 電子商務價格比較及庫存檢查
- 動態網站的結構化資訊擷取
- 具視覺感知的 UI 測試與驗證
- 網站監控與警報系統
- 多步驟表單的智慧填寫

## 其他資源

- [Browser-Use Playwright 整合範本](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use 執行者參數與內容擷取](https://docs.browser-use.com/customize/actor/all-parameters)
- [課程設定](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，請注意自動翻譯可能包含錯誤或不準確之處。原文文件應被視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯導致的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->