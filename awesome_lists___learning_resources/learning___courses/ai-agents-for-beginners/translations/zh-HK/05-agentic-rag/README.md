[![Agentic RAG](../../../translated_images/zh-HK/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(按上方圖片觀看本課的影片)_

# Agentic RAG

本課提供有關 Agentic Retrieval-Augmented Generation（Agentic RAG） 的全面概述，這是一種新興的 AI 範式，當中大型語言模型（LLMs）會在從外部來源擷取資訊的同時，自主規劃下一步行動。與靜態的「先檢索再閱讀」模式不同，Agentic RAG 涉及對 LLM 的反覆呼叫，並穿插工具或函數呼叫以及結構化輸出。系統會評估結果、精煉查詢、在需要時調用額外工具，並持續此循環直到達成令人滿意的解決方案。

## Introduction

本課將涵蓋

- **了解 Agentic RAG：** 學習這種新興的 AI 範式，當中大型語言模型（LLMs）會在從外部資料來源擷取資訊的同時，自主規劃下一步行動。
- **掌握反覆的 Maker-Checker 風格：** 理解對 LLM 的反覆呼叫循環，穿插工具或函數呼叫以及結構化輸出，旨在提高正確性並處理格式錯誤的查詢。
- **探索實務應用：** 識別 Agentic RAG 擅長的場景，例如以正確性為優先的環境、複雜的資料庫互動與延伸工作流程。

## Learning Goals

完成本課後，您將知道/理解：

- **理解 Agentic RAG：** 學習這種新興的 AI 範式，當中大型語言模型（LLMs）會在從外部資料來源擷取資訊的同時，自主規劃下一步行動。
- **反覆的 Maker-Checker 風格：** 掌握對 LLM 的反覆呼叫循環概念，穿插工具或函數呼叫以及結構化輸出，旨在提高正確性並處理格式錯誤的查詢。
- **擁有推理流程：** 理解系統擁有其推理流程的能力，能在不依賴預先定義路徑的情況下做出如何處理問題的決策。
- **工作流程：** 了解一個 agentic 模型如何獨立決定擷取市場趨勢報告、識別競爭者資料、關聯內部銷售指標、綜合發現並評估策略。
- **反覆循環、工具整合與記憶：** 了解系統如何依賴迴圈互動模式，在步驟之間維持狀態與記憶以避免重複循環並作出更有依據的決策。
- **處理失敗模式與自我修正：** 探討系統強健的自我修正機制，包括反覆與重新查詢、使用診斷工具，並在必要時回退至人類監督。
- **代理性的界限：** 理解 Agentic RAG 的限制，專注於領域特定的自主性、對基礎設施的依賴，以及對護欄的尊重。
- **實務使用案例與價值：** 識別 Agentic RAG 擅長的場景，例如以正確性為優先的環境、複雜的資料庫互動以及延伸工作流程。
- **治理、透明度與信任：** 了解治理與透明度的重要性，包括可解釋的推理、偏差控制與人類監督。

## What is Agentic RAG?

Agentic Retrieval-Augmented Generation（Agentic RAG）是一種新興的 AI 範式，當中大型語言模型（LLMs）會在從外部來源擷取資訊的同時，自主規劃下一步行動。與靜態的「先檢索再閱讀」模式不同，Agentic RAG 涉及對 LLM 的反覆呼叫，並穿插工具或函數呼叫以及結構化輸出。系統會評估結果、精煉查詢、在需要時調用額外工具，並持續此循環直到達成令人滿意的解決方案。這種反覆的「maker-checker」風格能提高正確性、處理格式錯誤的查詢，並確保高品質結果。

系統積極掌握其推理流程，會重寫失敗的查詢、選擇不同的檢索方法，並整合多個工具（例如在 Azure AI Search 的向量搜尋、SQL 資料庫或自訂 API），然後才定稿答案。使系統具有代理性（agentic）的關鍵特質是它能夠掌握自己的推理流程。傳統的 RAG 實作依賴預先定義的路徑，但 agentic 系統會根據其找到的資訊品質自動決定步驟順序。

## Defining Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation（Agentic RAG）是在 AI 開發中一種新興範式，LLMs 不僅從外部資料來源擷取資訊，還能自主規劃下一步行動。不同於靜態的「先檢索再閱讀」模式或精心設計的提示序列，Agentic RAG 涉及對 LLM 的反覆呼叫循環，穿插工具或函數呼叫以及結構化輸出。在每一步，系統會評估已取得的結果，決定是否精煉查詢，必要時調用額外工具，並持續此循環直到達成令人滿意的解決方案。

這種反覆的「maker-checker」運作方式旨在提高正確性、處理結構化資料庫（例如 NL2SQL）中格式錯誤的查詢，並確保結果平衡且高品質。系統不是僅仰賴精心設計的提示鏈，而是積極掌握其推理流程。它可以重寫失敗的查詢、選擇不同的檢索方法，並整合多個工具—例如在 Azure AI Search 的向量搜尋、SQL 資料庫或自訂 API—然後才完成答案。這樣就不需要過於複雜的協調框架；相反地，一個相對簡單的「LLM 呼叫 → 使用工具 → LLM 呼叫 → …」循環就能產出複雜且有根據的輸出。

![Agentic RAG Core Loop](../../../translated_images/zh-HK/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Owning the Reasoning Process

使系統成為「agentic」的關鍵特質是它能掌握自己的推理流程。傳統的 RAG 實作常依賴人類預先定義模型的路徑：一個說明要檢索什麼以及何時檢索的思路鏈。但當系統真正具備代理性時，它會在內部決定如何處理問題。它不只是執行一個腳本；它會根據找到的資訊品質自主決定步驟順序。
例如，如果被要求制定產品發佈策略，它不會僅依賴一個將整個研究與決策工作流程寫明的提示。相反地，agentic 模型會獨立決定：

1. Retrieve current market trend reports using Bing Web Grounding
2. Identify relevant competitor data using Azure AI Search.
3.	Correlate historical internal sales metrics using Azure SQL Database.
4. Synthesize the findings into a cohesive strategy orchestrated via Azure OpenAI Service.
5.	Evaluate the strategy for gaps or inconsistencies, prompting another round of retrieval if necessary.
以上這些步驟——精煉查詢、選擇來源、反覆直到對答案「滿意」——都是由模型決定，而不是由人類事先編寫腳本。

## Iterative Loops, Tool Integration, and Memory

![Tool Integration Architecture](../../../translated_images/zh-HK/tool-integration.0f569710b5c17c10.webp)

一個 agentic 系統依賴一個循環互動模式：

- **Initial Call:** 用戶的目標（即用戶提示）被提交給 LLM。
- **Tool Invocation:** 如果模型識別出缺少資訊或指示模糊，它會選擇一個工具或檢索方法—例如向量資料庫查詢（如 Azure AI Search 在私人資料上的 Hybrid search）或結構化的 SQL 呼叫—以收集更多上下文。
- **Assessment & Refinement:** 在審查返回的資料後，模型會決定這些資訊是否足夠。如果不夠，它會精煉查詢、嘗試不同的工具或調整方法。
- **Repeat Until Satisfied:** 此循環會持續，直到模型判定它擁有足夠的清晰度與證據來提供最終且有理據的回應。
- **Memory & State:** 因為系統在各步驟之間維持狀態與記憶，它可以回想先前的嘗試及其結果，避免重複循環，並在前進時作出更有依據的決策。

隨著時間推移，這會形成一種逐步演化的理解，使模型能在不需要人類不斷介入或重塑提示的情況下，導航複雜的多步任務。

## Handling Failure Modes and Self-Correction

Agentic RAG 的自主性也包括強健的自我修正機制。當系統遇到死胡同—例如檢索到不相關的文件或遇到格式錯誤的查詢—它可以：

- **Iterate and Re-Query:** 系統不會回傳低價值的回應，而是嘗試新的搜尋策略、重寫資料庫查詢或檢視替代資料集。
- **Use Diagnostic Tools:** 系統可能會調用額外的函數以協助它偵錯其推理步驟或確認檢索資料的正確性。像 Azure AI Tracing 這類工具對於實現強健的可觀察性與監控將很重要。
- **Fallback on Human Oversight:** 對於高風險或持續失敗的情況，模型可能會標示不確定並請求人工指導。一旦人類提供修正性回饋，模型可以在之後的步驟中吸收該教訓。

這種反覆且動態的方法讓模型能持續改進，確保它不僅是一次性系統，而是會在給定會話中從錯誤中學習的系統。

![Self Correction Mechanism](../../../translated_images/zh-HK/self-correction.da87f3783b7f174b.webp)

## Boundaries of Agency

儘管在任務內具有自主性，Agentic RAG 並不等同於通用人工智能。它的「代理性」能力受限於由人類開發者提供的工具、資料來源與政策。它不能自行發明新的工具或跨越已設定的領域界限。相反地，它擅長於動態協調現有資源。
與更先進 AI 形式的主要差異包括：

1. **領域特定的自主性：** Agentic RAG 系統專注於在已知領域內達成使用者定義的目標，會採用例如查詢重寫或工具選擇等策略來改善結果。
2. **依賴基礎設施：** 系統的能力取決於開發者整合的工具與資料。沒有人工干預，它無法突破這些界限。
3. **尊重護欄：** 倫理準則、合規規則與商業政策仍然非常重要。代理的自由始終受限於安全措施與監督機制（希望如此？）

## Practical Use Cases and Value

Agentic RAG 在需要反覆精煉與精確度的場景中表現突出：

1. **以正確性為優先的環境：** 在合規檢查、法規分析或法律研究中，agentic 模型可以反覆驗證事實、查閱多個來源並重寫查詢，直到產出經徹底審核的答案。
2. **複雜的資料庫互動：** 處理結構化資料時，查詢常常會失敗或需要調整，系統可以自動精煉其查詢（例如使用 Azure SQL 或 Microsoft Fabric OneLake），確保最終檢索結果符合使用者意圖。
3. **延伸工作流程：** 長時間執行的會話可能隨著新資訊浮現而演變。Agentic RAG 可以持續整合新資料，並隨著對問題空間的瞭解增加而調整策略。

## Governance, Transparency, and Trust

隨著這些系統在推理上變得更自主，治理與透明度變得至關重要：

- **可解釋的推理：** 模型可以提供其所做查詢的稽核追蹤、所諮詢的來源以及達成結論時所採取的推理步驟。像 Azure AI Content Safety 和 Azure AI Tracing / GenAIOps 這類工具可以幫助維持透明度並降低風險。
- **偏差控制與平衡檢索：** 開發者可以調整檢索策略以確保考量到平衡且具代表性的資料來源，並使用 Azure Machine Learning 為進階資料科學組織定期稽核輸出以偵測偏差或傾斜模式。
- **人類監督與合規：** 對於敏感任務，人類審查仍然是不可或缺的。Agentic RAG 並不取代高風險決策中的人類判斷—它透過提供更經過徹底審核的選項來補強人類判斷。

擁有能提供清楚行動記錄的工具是必要的。沒有這些工具，偵錯一個多步流程會非常困難。以下為 Literal AI（Chainlit 背後的公司）的一個 Agent 執行範例：

![AgentRunExample](../../../translated_images/zh-HK/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusion

Agentic RAG 代表 AI 系統處理複雜且資料密集任務的一個自然演進。透過採用循環互動模式、自主選擇工具並精煉查詢直到達成高品質結果，系統從靜態的遵循提示進化為更具適應性且有情境意識的決策者。雖然仍受人類定義的基礎設施與倫理準則所約束，這些代理性能力使企業與最終使用者能享有更豐富、更動態且更有用的 AI 互動。

### Got More Questions about Agentic RAG?

Join the [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet with other learners, attend office hours and get your AI Agents questions answered.

## Additional Resources
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">使用 Azure OpenAI 服務實作 Retrieval Augmented Generation (RAG)：學習如何使用您自己的資料與 Azure OpenAI 服務。這個 Microsoft Learn 模組提供了實作 RAG 的完整指南</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">使用 Microsoft Foundry 評估生成式 AI 應用程式：這篇文章涵蓋了對公開可用資料集上模型的評估與比較，包括代理式 AI 應用與 RAG 架構</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">什麼是代理式 RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">代理式 RAG：基於代理的檢索增強生成完整指南 – 來自 generation RAG 的新聞</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">代理式 RAG：透過查詢重寫與自我查詢提升你的 RAG！Hugging Face 開源 AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">為 RAG 新增代理層</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">知識助理的未來：Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">如何建立代理式 RAG 系統</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">使用 Microsoft Foundry Agent Service 擴展你的 AI 代理人</a>

### 學術論文

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine：以自我回饋進行迭代精煉</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion：以語言強化學習的語言代理</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC：大型語言模型可透過工具互動式批評自行更正</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 代理式檢索擴充生成：關於代理式 RAG 的綜述</a>

## 上一課

[工具使用設計模式](../04-tool-use/README.md)

## 下一課

[建立值得信賴的 AI 代理](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
免責聲明：
本文件使用 AI 翻譯服務「Co-op Translator」(https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們盡力確保準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為具權威性的版本。對於重要資訊，建議採用專業人工翻譯。我們不會對因使用此翻譯而引致的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->