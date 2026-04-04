[![Agentic RAG](../../../translated_images/zh-MO/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(點擊上方圖片觀看本課程影片)_

# Agentic RAG

本課程全面介紹了 Agentic 檢索增強生成（Agentic RAG），這是一種新興的 AI 範式，大型語言模型（LLM）能自主規劃下一步行動，同時從外部來源提取資訊。與靜態的「檢索後閱讀」模式不同，Agentic RAG 涉及對 LLM 的迭代調用，穿插工具或函數調用及結構化輸出。系統會評估結果、優化查詢、必要時調用更多工具，並持續此循環直到達到滿意的解決方案。

## 介紹

本課程涵蓋內容：

- **了解 Agentic RAG：** 認識 AI 中的新興範式，即大型語言模型（LLM）自主規劃下一步，同時從外部數據源提取資訊。
- **掌握迭代的 Maker-Checker 風格：** 理解對 LLM 反覆調用的循環，穿插工具或函數調用及結構化輸出，旨在提升正確性與處理不規範的查詢。
- **探索實際應用場景：** 辨識 Agentic RAG 擅長的場景，如以正確性為先的環境、複雜資料庫互動及延伸工作流程。

## 學習目標

完成本課程後，你將能了解/掌握：

- **理解 Agentic RAG：** 了解 AI 中的新興範式，即大型語言模型（LLM）自主規劃下一步，同時從外部數據源提取資訊。
- **迭代 Maker-Checker 風格：** 掌握對 LLM 反覆調用的循環概念，穿插工具或函數調用及結構化輸出，用以提升正確性及處理不規範查詢。
- **掌控推理過程：** 理解系統能自主管理推理流程，決定如何解決問題，而非依賴預先定義的路徑。
- **工作流程：** 了解代理模型如何獨立決定檢索市場趨勢報告、識別競爭者資料、關聯內部銷售指標、綜合結果並評估策略。
- **迭代循環、工具整合與記憶：** 瞭解系統依賴迴圈式互動模式，在步驟間維持狀態及記憶，避免重複循環並作明智決策。
- **處理失敗模式與自我修正：** 探索系統穩健的自我糾正機制，包括重複查詢、使用診斷工具及回歸人工監督。
- **代理範圍界限：** 理解 Agentic RAG 的限制，重點在於領域專屬自治、基礎設施依賴與尊重保護措施。
- **實際使用案例與價值：** 識別 Agentic RAG 的適用場景，如優先正確性環境、複雜資料庫互動與延伸工作流程。
- **治理、透明與信任：** 瞭解治理與透明的重要性，包括可解釋推理、偏見控制及人工監督。

## 甚麼是 Agentic RAG？

Agentic 檢索增強生成（Agentic RAG）是一種新興 AI 範式，大型語言模型（LLM）能自主規劃下一步行動，同時從外部來源提取資訊。與靜態的「檢索後閱讀」模式不同，Agentic RAG 涉及對 LLM 反覆調用，穿插工具或函數調用及結構化輸出。系統會評估結果、優化查詢、必要時調用更多工具，持續此循環直至達成滿意方案。這種迭代的「maker-checker」風格提升正確性、處理不規範查詢，並確保高品質結果。

系統積極掌控其推理流程，重寫失敗查詢、選擇不同的檢索方法，並整合多種工具，例如 Azure AI Search 中的向量搜尋、SQL 資料庫或自訂 API，然後才完成最終答案。Agentic 系統的辨識特質是其擁有推理過程的能力。傳統 RAG 實作依賴預定義路徑，Agentic 系統則自主判斷根據所獲資訊的品質決定步驟序列。

## 定義 Agentic 檢索增強生成 (Agentic RAG)

Agentic 檢索增強生成（Agentic RAG）是 AI 發展中新興的範式，LLM 不僅從外部數據源提取資訊，還自主規劃下一步行動。不同於靜態檢索後閱讀或精心編排的提示序列，Agentic RAG 涉及對 LLM 的迭代循環調用，穿插工具或函數調用及結構化輸出。每一步，系統都會評估所獲結果，決定是否優化查詢，必要時調用額外工具，持續此循環直到達成滿意方案。

這種迭代的「maker-checker」運作風格用於提升正確性、處理不規範的結構化資料庫查詢（如 NL2SQL），並確保均衡且高品質的結果。系統並非僅依賴精密設計的提示鏈，而是主動掌控推理流程。它能重寫失敗的查詢、選擇不同檢索方法，並整合多種工具（如 Azure AI Search 向量搜尋、SQL 資料庫或自訂 API）後再給出最終答案。這省卻複雜的協調框架，只需相對簡單的「LLM 呼叫 → 工具使用 → LLM 呼叫 → …」循環即可產出精準且有根據的結果。

![Agentic RAG Core Loop](../../../translated_images/zh-MO/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## 掌控推理過程

使系統成為「agentic」的關鍵特質是其擁有推理過程的能力。傳統 RAG 通常依賴人類預先定義模型路徑：一條描述何時檢索及檢索何物的思考鏈。
但當系統真正具有 agentic 性質時，它會在內部決定如何處理問題，而不是僅僅執行指令腳本；它自主判斷根據資訊品質決定步驟序列。
例如，當要求它制定產品發布策略時，系統不會僅依賴一個詳細說明整個研究與決策流程的提示語，而是 agentic 模型會自主決定：

1. 使用 Bing 網絡檢索取得當前市場趨勢報告
2. 利用 Azure AI Search 識別相關競爭者資料
3. 使用 Azure SQL 資料庫關聯歷史內部銷售指標
4. 透過 Azure OpenAI 服務將發現結果綜合為連貫策略
5. 評估策略中的漏洞或不一致性，必要時再次檢索

這些步驟—優化查詢、選擇來源、迭代直到對答案「滿意」—皆由模型決定，而非人類預先編寫。

## 迭代循環、工具整合與記憶

![Tool Integration Architecture](../../../translated_images/zh-MO/tool-integration.0f569710b5c17c10.webp)

Agentic 系統依賴循環的互動模式：

- **初始呼叫：** 使用者目標（即使用者提示詞）傳遞給 LLM。
- **工具調用：** 若模型判斷資訊不完整或指示模糊，它會選擇工具或檢索方法，例如向量資料庫查詢（如 Azure AI Search 混合檢索私有資料）或結構化 SQL 查詢，以獲取更多背景。
- **評估與優化：** 回顧返回資料後，模型決定資訊是否足夠。如不足，則優化查詢、嘗試其他工具或調整策略。
- **重複直到滿意：** 此循環持續，直到模型判斷擁有足夠清晰度和證據，能給出最終合理回答。
- **記憶與狀態：** 因系統於各步驟間維持狀態與記憶，能回顧先前嘗試及結果，避免重複循環，並能做出更明智決策。

隨著時間推移，系統能演化理解，幫助模型在複雜多步任務中導航，而無須人類不斷干預或重塑提示。

## 處理失敗模式與自我修正

Agentic RAG 的自治性同時包括健全的自我修正機制。當系統遇到困境——例如檢索出不相關文件或遭遇錯誤查詢時——它可以：

- **迭代與重查詢：** 不返回低價值回應，而是嘗試新搜尋策略、重寫資料庫查詢，或參考替代數據集。
- **使用診斷工具：** 系統可能引入額外函數，協助除錯推理流程或確認檢索資料的正確性。Azure AI Tracing 等工具對維持良好可觀察性及監控至關重要。
- **回歸人工監督：** 對於風險高或重複失敗情況，模型可標記不確定性並請求人類指導。收到人類修正反饋後，模型能吸收教訓並自動調整。

這種迭代且動態的策略讓模型持續改進，確保它不只是一次性系統，而是在同一回合中從失誤中學習。

![Self Correction Mechanism](../../../translated_images/zh-MO/self-correction.da87f3783b7f174b.webp)

## 代理範圍界限

儘管在任務中具有自治性，Agentic RAG 並不等同於通用人工智能。其「agentic」能力侷限於人類開發者提供的工具、資料源和政策。它無法自行創造工具或超越既定領域範圍，而是擅長動態協調現有資源。
與更高階 AI 的主要差異包括：

1. **領域專屬自治：** Agentic RAG 系統專注於在已知領域內達成用戶指定目標，運用查詢重寫或工具選擇策略以改善結果。
2. **基礎設施依賴：** 系統能力依賴開發者所整合的工具與資料，無法無人干預地突破這些限制。
3. **尊重保護措施：** 道德準則、合規規則與業務政策極為重要。代理自由度始終受限於安全與監督機制（這點仍充滿希望？）

## 實際使用案例與價值

Agentic RAG 擅長需要反覆優化與精確度的場景：

1. **優先正確性環境：** 在合規檢查、監管分析或法律研究中，代理模型可反覆驗證事實、諮詢多方資料源，並重寫查詢，直至產出全面核查的答案。
2. **複雜資料庫互動：** 面對結構化資料，查詢經常失敗或需調整，系統可自動優化 Azure SQL 或 Microsoft Fabric OneLake 查詢，確保最終檢索符合用戶需求。
3. **延伸工作流程：** 長時間會話可能因新資訊浮現而演進。Agentic RAG 可持續整合新資料，隨著對問題空間的理解深化而調整策略。

## 治理、透明與信任

隨著系統越來越能自主推理，治理與透明變得至關重要：

- **可解釋推理：** 模型能提供查詢軌跡、使用的來源和推理步驟的審計線索。Azure AI Content Safety 與 Azure AI Tracing / GenAIOps 等工具有助確保透明度並降低風險。
- **偏見控制與均衡檢索：** 開發者可調整檢索策略，確保採用均衡且具代表性的資料源，並定期審核輸出以偵測偏差或異常現象，利用專為高階資料科學組織設計的 Azure Machine Learning 自訂模型。
- **人工監督與合規：** 對於敏感任務，人工審核仍不可或缺。Agentic RAG 並不取代重要決策的人類判斷，而是提供更全面審核過的選項以輔助決策。

具備清晰操作紀錄的工具至關重要。缺乏此類工具時，除錯多步流程將非常困難。以下範例來自 Literal AI（Chainlit 背後公司）的代理執行示例：

![AgentRunExample](../../../translated_images/zh-MO/AgentRunExample.471a94bc40cbdc0c.webp)

## 結論

Agentic RAG 代表了 AI 處理複雜資料密集型任務的一種自然演進。透過採用迴圈式互動模式、自主選擇工具、優化查詢直至達成高品質成果，系統突破了靜態提示驅動的限制，成為更具適應性與情境感知的決策者。雖然仍受限於人類定義的基礎設施與道德規範，但這些 agentic 能力使 AI 與企業及最終用戶的互動更豐富、更動態，且更具實用價值。

### 對 Agentic RAG 有更多疑問？

加入 [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)，與其他學習者交流，參加辦公時間並解答你的 AI 代理問題。

## 額外資源
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">使用 Azure OpenAI 服務實現檢索增強生成 (RAG)：學習如何使用您自己的資料與 Azure OpenAI 服務。本 Microsoft Learn 模組提供實現 RAG 的全面指導</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">使用 Microsoft Foundry 評估生成式 AI 應用：本文涵蓋在公開資料集上對模型的評估和比較，包含 Agentic AI 應用與 RAG 架構</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">什麼是 Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG： 完整指南介紹基於代理的檢索增強生成 – Generation RAG 新聞</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG：通過查詢重構和自我查詢為您的 RAG 加速！Hugging Face 開源 AI 食譜</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">為 RAG 添加 Agentic 層</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">知識助理的未來：Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">如何構建 Agentic RAG 系統</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">使用 Microsoft Foundry Agent 服務擴展您的 AI 代理</a>

### 學術論文

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine：帶有自我反饋的迭代精煉</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion：帶有語言強化學習的語言代理</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC：大型語言模型可通過工具互動批評自我糾正</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic 檢索增強生成：Agentic RAG 調查報告</a>

## 前一課

[工具使用設計模式](../04-tool-use/README.md)

## 下一課

[構建可信賴的 AI 代理](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件乃使用人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保準確性，但請注意，自動翻譯可能存在錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議採用專業人工翻譯。本公司對因使用本翻譯而產生的任何誤解或誤譯不承擔任何責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->