[![Agentic RAG](../../../translated_images/zh-TW/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(點擊上方圖片觀看本課程影片)_

# Agentic RAG

本課程全面介紹了 Agentic 以檢索為增強的生成（Agentic RAG），這是一種新興的 AI 範式，大型語言模型（LLM）在從外部資源提取資訊的同時，能自主規劃下一步。與靜態的先檢索後閱讀模式不同，Agentic RAG 涉及迭代調用 LLM，穿插工具或函數調用與結構化輸出。系統會評估結果，完善查詢，必要時調用更多工具，並持續該循環直至獲得令人滿意的解決方案。

## 介紹

本課程將涵蓋

- **理解 Agentic RAG：** 了解在 AI 中的新興範式，LLM 自主計劃接下來步驟的同時，從外部資料來源撈取資訊。
- **掌握迭代製作者-核查者風格：** 理解對 LLM 的迭代調用循環，穿插工具或函數調用及結構化輸出，旨在提升正確率並處理格式錯誤的查詢。
- **探討實務應用：** 識別 Agentic RAG 發揮優勢的情境，例如以正確性為優先的環境、複雜資料庫交互與長時工作流程。

## 學習目標

完成本課程後，您將能了解/掌握：

- **理解 Agentic RAG：** 了解 AI 中新興範式，LLM 在從外部資料來源撈取資訊時，自主規劃下一步。
- **迭代製作者-核查者風格：** 掌握 LLM 的迭代調用循環，穿插工具或函數調用及結構化輸出，設計用來提升正確率與處理格式錯誤的查詢。
- **掌握推理過程：** 理解系統擁有自身推理過程的能力，能自主決定如何解決問題，不依賴預先定義的路徑。
- **工作流程：** 了解 Agentic 模型如何自主決定檢索市場趨勢報告、識別競爭者資料、關聯內部銷售指標、綜合分析並評估策略。
- **迭代循環、工具整合與記憶：** 了解系統依靠迴圈互動模式，在多步驟間維持狀態與記憶，以避免重複循環並做出明智決策。
- **處理失敗模式與自我修正：** 探索系統健全的自我修正機制，包括反覆迭代和重新查詢，使用診斷工具，並依賴人工監督作為後援。
- **行動邊界：** 理解 Agentic RAG 的限制：專注領域自治、基礎設施依賴性與尊重守則。
- **實務案例與價值：** 辨識 Agentic RAG 發揮優勢的場景，如首重正確性的環境、複雜資料庫操作及長期工作流程。
- **治理、透明度與信任：** 了解治理和透明度的重要性，包括可解釋的推理、偏見控制及人工監督。

## 什麼是 Agentic RAG？

Agentic Retrieval-Augmented Generation（Agentic RAG）是一種新興 AI 範式，大型語言模型（LLM）可在從外部資料源提取資訊時，自主規劃下一步。與靜態的先檢索再閱讀模式不同，Agentic RAG 涉及對 LLM 的迭代調用，中間穿插工具或函數調用並產生結構化輸出。系統會評估結果，精煉查詢，必要時呼叫更多工具，反覆執行該循環直到達到滿意的解決方案。這種迭代的「製作者-核查者」風格提升了正確性，能處理錯誤格式查詢並確保成果品質優良。

系統積極掌控它的推理流程，重寫失敗的查詢，選擇不同的檢索方法，整合多種工具——如 Azure AI Search 中的向量搜尋、SQL 資料庫或自訂 API——然後才給出最終答案。agentic 系統的顯著特質是能自主擁有推理過程。傳統 RAG 實現依賴預先定義的路徑，但 agentic 系統會基於找到資訊的品質，自主決定步驟次序。

## 定義 Agentic Retrieval-Augmented Generation（Agentic RAG）

Agentic Retrieval-Augmented Generation（Agentic RAG）是 AI 發展中的新興範式，LLM 不僅從外部資料源撈取資訊，還能自主安排下一步。不同於靜態的先檢索再閱讀模式或精心設計的提示序列，Agentic RAG 包含一個迭代調用 LLM 的循環，穿插工具或函數調用和結構化輸出。每一步系統都會評估獲得的結果，決定是否完善查詢，有需要時調用其他工具，並持續這個循環直到達成滿意方案。

這種迭代的「製作者-核查者」操作風格，旨在提升正確率，處理結構化資料庫（如 NL2SQL）裡格式錯誤的查詢，並確保平衡且高品質的結果。系統不再僅靠精心設計的提示鏈，而是積極擁有推理過程。它可以重寫失敗的查詢，選擇不同的檢索方法，整合多種工具——例如 Azure AI Search 的向量搜尋、SQL 資料庫或自訂 API——最後產出答案。這樣就不必依賴過於複雜的調度框架，而是以相對簡單的「LLM 調用 → 工具使用 → LLM 調用 → …」循環，產生複雜且基礎堅實的輸出。

![Agentic RAG Core Loop](../../../translated_images/zh-TW/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## 掌握推理過程

使系統具備「agentic」特質的關鍵，是它擁有自身推理過程的能力。傳統 RAG 往往依賴人類預先定義模型路徑：思維鏈（chain-of-thought）說明何時檢索什麼。

然而真正 agentic 的系統會自主決定如何處理問題。它不是執行腳本，而是根據找到資訊的品質自主規劃步驟順序。

例如，被要求制定產品上市策略時，它不僅依靠將整個研究和決策流程寫入提示，而是 agentic 模型會獨立決定：

1. 利用 Bing 網路基礎檢索當前的市場趨勢報告。
2. 使用 Azure AI Search 確定相關競爭者資料。
3. 透過 Azure SQL Database 將歷史內部銷售指標進行關聯分析。
4. 藉由 Azure OpenAI 服務協調，綜合這些發現形成一套策略。
5. 評估策略是否存在缺口或不一致，必要時觸發另一輪檢索。

所有這些步驟——完善查詢、選擇資料來源、反覆迭代直到滿意回覆——都由模型決定，而非人類預先腳本化。

## 迭代循環、工具整合與記憶

![Tool Integration Architecture](../../../translated_images/zh-TW/tool-integration.0f569710b5c17c10.webp)

agentic 系統依賴迴圈互動模式：

- **初始調用：** 將使用者目標（即用戶提示）呈現給 LLM。
- **工具調用：** 若模型發現資訊不足或指令含糊，便選擇工具或檢索方法——例如向量資料庫查詢（如 Azure AI Search 私有資料的混合搜索）或結構化 SQL 呼叫——以蒐集更多上下文。
- **評估與優化：** 查看回傳數據後，模型決定資訊是否充足。不足時會優化查詢、更換工具或調整策略。
- **反覆直至滿意：** 循環重複，直到模型判斷已具足夠明確且有理據的回覆。
- **記憶與狀態：** 系統維持跨步驟記憶與狀態，能回憶先前嘗試及結果，避免重複循環並作出更明智決策。

隨著時間推移，這產生持續演進的理解力，使模型能順利處理複雜多步任務，無需人為頻繁介入或重新調整提示。

## 處理失敗模式與自我修正

Agentic RAG 的自主性還包括強健的自我修正機制。當系統遇到死胡同——例如檢索到無關文件或遭遇格式錯誤查詢時——它能：

- **反覆迭代與重新查詢：** 模型不會輕易回傳低價值回應，而是嘗試新搜尋策略、重寫資料庫查詢或觀察不同資料集。
- **使用診斷工具：** 系統可能會呼叫設計用來協助調試推理步驟或驗證檢索資料正確性的附加功能。像 Azure AI Tracing 是促成健全可觀察性與監控的關鍵工具。
- **依賴人工監督：** 在高風險或多次失敗情況下，模型可標記不確定性並請求人類指導。人類提供糾正反饋後，模型能將經驗納入未來推理。

此迭代且動態的方式讓模型能持續改進，保證它非一次性機制，而是在會話中從誤差中學習。

![Self Correction Mechanism](../../../translated_images/zh-TW/self-correction.da87f3783b7f174b.webp)

## 行動邊界

儘管在任務內具自主性，Agentic RAG 並不等同於通用人工智慧。它的「agentic」能力限於人類開發者提供的工具、資料來源與政策。它無法自行創造工具或超越既定領域邊界。它擅長的是動態調度現有資源。

與更高階 AI 型態的主要差異包括：

1. **特定領域自治：** Agentic RAG 系統專注於在已知領域內達成使用者定義目標，通過查詢重寫或工具選擇來優化結果。
2. **基礎架構依賴：** 系統能力依賴開發者整合的工具與資料。無人為介入無法突破這些限制。
3. **遵循守則：** 倫理指導、合規規則和商業政策仍然非常重要。Agent 的自由度永遠被安全措施與監管機制所限制（希望如此？）。

## 實務用例與價值

Agentic RAG 在需迭代精進且精確的場景中表現出色：

1. **以正確性為先的環境：** 在合規審查、法規分析或法律研究中，agentic 模型可反覆驗證事實、查閱多個來源、重寫查詢直到產出徹底審核過的答案。
2. **複雜資料庫操作：** 處理結構化資料時，查詢經常失敗或需調整，系統可自主優化查詢，利用 Azure SQL 或 Microsoft Fabric OneLake，確保最終檢索符合使用者意圖。
3. **長時間工作流程：** 長度較長的會話可能隨著新資訊浮現而演變。Agentic RAG 能持續吸收新資料，隨著對問題空間了解加深調整策略。

## 治理、透明度與信任

隨著系統推理越來越自主，治理與透明度成為關鍵：

- **可解釋的推理：** 模型能提供其執行的查詢、使用的來源及推理步驟的審計軌跡。工具如 Azure AI Content Safety 與 Azure AI Tracing / GenAIOps 有助維持透明度並降低風險。
- **偏見控制與平衡檢索：** 開發者可調整檢索策略，確保考慮資料來源平衡且具代表性，並定期審核輸出以偵測偏見或偏斜狀況，利用 Azure Machine Learning 針對高階資料科學組織設計的自訂模型。
- **人工監督與合規：** 對敏感任務仍需人工審查。Agentic RAG 並不取代高風險決策中的人工判斷，而是透過提供更嚴謹審核的方案加以增強。

具備可明確記錄行動的工具至關重要。缺乏此類工具，調試多階段過程將非常困難。以下為 Literal AI（Chainlit 背後公司）提供的一個 Agent 執行範例：

![AgentRunExample](../../../translated_images/zh-TW/AgentRunExample.471a94bc40cbdc0c.webp)

## 結論

Agentic RAG 代表 AI 系統處理複雜且資料密集任務的自然演進。採用迭代互動模式，自主選擇工具，並精煉查詢直到獲得高品質結果，使系統超越靜態提示跟隨者，進入更具適應性且具情境感知的決策者階段。雖仍受限於人類定義的基礎設施與倫理準則，但這些 agentic 能力為企業與終端用戶帶來更豐富、更動態且更實用的 AI 互動體驗。

### 想了解更多 Agentic RAG？

加入 [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)，與其他學習者交流，參加辦公時間並解決您的 AI Agents 問題。

## 附加資源
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">使用 Azure OpenAI 服務實作檢索增強生成 (RAG)：學習如何使用您自己的資料與 Azure OpenAI 服務。此 Microsoft Learn 模組提供關於實作 RAG 的完整指南</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">使用 Microsoft Foundry 評估生成式 AI 應用程式：本文涵蓋在公開可用資料集上對模型的評估與比較，包括能動 AI 應用程式及 RAG 架構</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">什麼是能動 RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">能動 RAG：基於代理的檢索增強生成完整指南 – generation RAG 新聞</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">能動 RAG：使用查詢重構與自我查詢加速您的 RAG！Hugging Face 開源 AI 食譜</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">為 RAG 增加能動層</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">知識助手的未來：Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">如何建構能動 RAG 系統</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">使用 Microsoft Foundry Agent 服務擴展您的 AI 代理</a>

### 學術論文

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine：帶有自我反饋的迭代精煉</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion：具備口頭強化學習的語言代理</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC：大型語言模型可透過工具互動式批評自我修正</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 能動檢索增強生成：能動 RAG 調查</a>

## 上一課

[工具使用設計模式](../04-tool-use/README.md)

## 下一課

[建立值得信賴的 AI 代理](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保翻譯的準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於重要資訊，建議聘請專業人工翻譯。我們不對因使用此翻譯而產生的任何誤解或誤譯負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->