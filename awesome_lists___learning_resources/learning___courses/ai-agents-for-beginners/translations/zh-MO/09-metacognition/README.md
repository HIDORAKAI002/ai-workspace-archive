[![Multi-Agent Design](../../../translated_images/zh-MO/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(點擊上方圖片觀看本課程視頻)_
# AI代理中的後設認知

## 介紹

歡迎來到 AI代理中的後設認知課程！本章設計給對 AI代理如何思考自身思考過程感到好奇的初學者。完成本課程後，您將理解關鍵概念，並具備實作範例，應用後設認知於 AI代理設計中。

## 學習目標

完成本課程後，您將能夠：

1. 理解代理定義中推理迴圈的影響。
2. 使用規劃和評估技術來協助自我修正的代理。
3. 創建能操作程式碼以完成任務的代理。

## 後設認知簡介

後設認知指的是涉及對自身思考進行思考的高階認知過程。對 AI代理來說，這意味著能根據自我意識和過去經驗評估並調整其行動。後設認知，或稱「思考的思考」，是代理型 AI系統開發中的重要概念。它涉及 AI系統對自身內部過程的認知，並能監控、調節及適應其行為。如同我們在人群中察言觀色或解決問題時所做的自我覺察。這種自我覺察能幫助 AI 系統做出更佳決策，識別錯誤，並隨時間提升表現——這又回到了圖靈測試和 AI是否將取代人類的辯論議題。

在代理型 AI系統中，後設認知可幫助解決多項挑戰，例如：
- 透明度：確保 AI系統能解釋其推理和決策。
- 推理能力：增強 AI系統整合資訊及做出合理決策的能力。
- 適應性：允許 AI系統調整以應對新環境和變化條件。
- 感知力：提升 AI系統在辨識及解讀來自環境資料的精確度。

### 什麼是後設認知？

後設認知，或稱「思考的思考」，是涉及自我覺察及自我調節自我認知過程的高階認知過程。在 AI 領域中，後設認知使代理能評估並調整其策略及行動，進而提升解決問題和決策的能力。理解後設認知，可設計出不僅更智能，且更具適應性和效率的 AI代理。在真正的後設認知中，你會看到 AI 明確地對其自身推理進行推理。

範例：「我優先選擇更便宜的航班，因為⋯⋯但我可能錯過直飛航班，讓我重新檢查一下。」
記錄它如何或為何選擇特定路線。
- 注意它犯錯是因為過度依賴上次使用者喜好，因此它不僅修改最後的建議，也調整決策策略。
- 診斷模式，例如「每當看到使用者提到『太擠』時，我不僅刪除某些景點，也反思如果總按熱度排名，我選擇『人氣景點』的方法是有問題的。」

### 後設認知在 AI代理中的重要性

後設認知在 AI代理設計中扮演關鍵角色，原因如下：

![Importance of Metacognition](../../../translated_images/zh-MO/importance-of-metacognition.b381afe9aae352f7.webp)

- 自我反思：代理能評估自身表現並找出改進空間。
- 適應性：代理能基於過往經驗及環境變化調整策略。
- 錯誤修正：代理能自動偵測並修正錯誤，帶來更精確結果。
- 資源管理：代理能透過規劃和評估行動，優化時間及計算資源使用。

## AI代理的組成要素

在深入後設認知過程前，理解 AI代理的基本組成非常重要。AI代理通常包括：

- 角色：代理的個性和特徵，決定其與使用者互動的方式。
- 工具：代理能執行的功能及能力。
- 技能：代理所擁有的知識和專業。

這些組件協同運作，創造出能執行特定任務的「專業單元」。

**範例**：
想像一個旅遊代理，能不僅規劃您的假期，還能根據即時資料及以往顧客的旅程經驗調整行程。

### 範例：旅遊代理服務中的後設認知

想像你正在設計一個由 AI 驅動的旅遊代理服務。這個「旅遊代理」協助使用者規劃假期。為了加入後設認知，旅遊代理需要根據自我覺察和過往經驗評估並調整行動。後設認知可能扮演的角色如下：

#### 當前任務

協助使用者規劃前往巴黎的旅程。

#### 任務完成步驟

1. **收集使用者喜好**：詢問旅行日期、預算、興趣（如博物館、美食、購物）及其他特別需求。
2. **檢索資訊**：搜尋符合使用者喜好的航班、住宿、景點及餐廳。
3. **生成推薦**：提供包含航班細節、酒店預定和建議活動的個人化行程。
4. **根據回饋調整**：詢問使用者對建議的反饋並作出必要調整。

#### 所需資源

- 航班與酒店預定資料庫存取。
- 巴黎景點及餐廳資訊。
- 以往互動的使用者回饋資料。

#### 經驗與自我反思

旅遊代理利用後設認知評估表現並從過去經驗學習。例如：

1. **分析使用者回饋**：檢視回饋以判斷哪些建議受歡迎，哪些不受歡迎，並相應調整未來建議。
2. **適應性**：若使用者曾提過不喜歡擁擠的地方，未來會避免在尖峰時段推薦熱門景點。
3. **錯誤修正**：若之前建議的酒店客滿，會學到要更嚴格檢查可用房源再做推薦。

#### 實用開發者範例

以下是簡化版旅遊代理代碼範例，展示後設認知的實作方式：

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # 根據偏好搜尋航班、酒店和景點
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        # 分析反饋並調整未來推薦
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# 使用範例
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

#### 後設認知的重要性

- **自我反思**：代理能分析表現並找出改進點。
- **適應性**：根據回饋及條件變化調整策略。
- **錯誤修正**：能自動偵錯並修正錯誤。
- **資源管理**：優化時間及計算資源使用。

透過加入後設認知，旅遊代理能提供更個人化、準確的旅遊建議，提升整體使用者體驗。

---

## 2. 代理中的規劃

規劃是 AI代理行為的核心部分。它涉及描述為達成目標所需的步驟，考量當前狀態、資源和可能的障礙。

### 規劃元素

- **當前任務**：明確定義任務。
- **完成任務步驟**：將任務分解成可管理步驟。
- **所需資源**：識別必要資源。
- **經驗**：利用過往經驗指導規劃。

**範例**：
以下是旅遊代理協助使用者有效規劃旅程所需的步驟：

### 旅遊代理的步驟

1. **收集使用者喜好**
   - 詢問旅行日期、預算、興趣及任何特別需求。
   - 範例：「您什麼時候計劃出行？」「您的預算範圍是多少？」「假期喜歡參加哪些活動？」

2. **檢索資訊**
   - 根據使用者喜好搜尋相關旅遊選項。
   - **航班**：查詢符合預算與出行日期的航班。
   - **住宿**：尋找地點、價格及設施符合需求的飯店或出租屋。
   - **景點與餐廳**：找出符合興趣的熱門景點、活動和餐飲選擇。

3. **生成推薦**
   - 匯整檢索資訊形成個人化行程。
   - 提供航班細節、酒店預定和建議活動，確保符合使用者喜好。

4. **向使用者展示行程**
   - 與使用者分享擬定行程，供其審閱。
   - 範例：「這是您的巴黎旅程建議，包含航班、飯店預訂及建議的活動與餐廳，請您參考並告訴我您的想法！」

5. **收集回饋**
   - 詢問使用者對擬定行程的回饋。
   - 範例：「您喜歡這些航班選擇嗎？」「飯店符合您的需求嗎？」「有哪些活動想要添加或刪除？」

6. **根據回饋調整**
   - 根據回饋修改行程，調整航班、住宿及活動安排以更符合使用者喜好。

7. **最終確認**
   - 呈現更新後的行程供使用者最終確認。
   - 範例：「我已依據您的回饋做出調整，這是更新後的行程。您覺得一切都符合期待嗎？」

8. **預訂與確認**
   - 使用者確認後，進行航班、住宿及預定活動。
   - 發送確認資訊給使用者。

9. **持續支援**
   - 旅途中及之前隨時協助使用者做出變更或額外需求。
   - 範例：「旅途中如果需要任何協助，隨時找我！」

### 範例互動

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# 在預訂請求中的示例用法
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

## 3. 矯正型 RAG 系統

首先，讓我們先理解 RAG 工具與預先上下文加載的差異

![RAG vs Context Loading](../../../translated_images/zh-MO/rag-vs-context.9eae588520c00921.webp)

### 檢索增強生成（RAG）

RAG 結合檢索系統與生成模型。當發出查詢時，檢索系統會從外部來源擷取相關文件或資料，並將這些資訊用於輔助生成模型的輸入。這有助於模型產生更精確和符合上下文的回應。

在 RAG 系統中，代理會從知識庫檢索相關資訊，並用以生成適當的回答或行動。

### 矯正型 RAG 方法

矯正型 RAG 方法著重於使用 RAG 技術來修正錯誤並提升 AI代理的準確性。這包括：

1. **提示技術**：使用特定提示引導代理擷取相關資訊。
2. **工具**：實作算法和機制，使代理能評估擷取資訊的相關性並生成精確回應。
3. **評估**：持續評估代理表現並調整以提升準確度和效率。

#### 範例：搜索代理中的矯正型 RAG

想像一個從網路檢索資訊回答使用者查詢的搜索代理，矯正型 RAG 方法可能包括：

1. **提示技術**：根據使用者輸入形成搜尋查詢。
2. **工具**：利用自然語言處理和機器學習算法對搜尋結果排序及過濾。
3. **評估**：分析使用者回饋來識別並修正擷取資訊的不準確性。

### 旅遊代理中的矯正型 RAG

矯正型 RAG（檢索增強生成）增強 AI 的檢索與生成能力，同時修正任何不準確的資訊。讓我們看看旅遊代理如何利用矯正型 RAG 方法提供更準確且相關的旅遊建議。

此方法涉及：

- **提示技術**：運用特定提示引導代理擷取相關資訊。
- **工具**：實作算法和機制，使代理能評估擷取資訊的相關性並生成正確回應。
- **評估**：持續評估代理表現，並作出調整提升準確性和效率。

#### 在旅遊代理中實施矯正型 RAG 的步驟

1. **初次使用者互動**
   - 旅遊代理收集使用者初步偏好，如目的地、日期、預算及興趣。
   - 範例：

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **資訊檢索**
   - 旅遊代理根據使用者偏好檢索關於航班、住宿、景點和餐廳的資訊。
   - 範例：

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **生成初步建議**
   - 旅遊代理利用擷取資訊生成個人化行程。
   - 範例：

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **收集使用者回饋**
   - 旅遊代理詢問使用者對初步建議的意見。
   - 範例：

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **矯正型 RAG 過程**
   - **提示技術**：旅遊代理根據使用者回饋形成新搜尋查詢。
     - 範例：

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **工具**：旅遊代理使用算法對新搜尋結果排序與過濾，強調基於回饋的重要性。
     - 範例：

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **評估**：旅遊代理持續分析使用者回饋，評估建議的相關性和準確性，並作必要調整。
     - 範例：

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### 實用範例

以下是整合矯正型 RAG 方法的旅遊代理 Python 簡化代碼範例：

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)
        new_itinerary = self.generate_recommendations()
        return new_itinerary

# 使用範例
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
new_itinerary = travel_agent.adjust_based_on_feedback(feedback)
print("Updated Itinerary:", new_itinerary)
```

### 預先上下文加載
預先載入上下文涉及在處理查詢之前將相關的上下文或背景資訊載入模型。這意味著模型從一開始就能存取這些資訊，有助於它產生更具訊息性的回應，而無需在處理過程中額外擷取資料。

下面是一個簡化的範例，展示如何在 Python 的旅遊代理應用中執行預先載入上下文：

```python
class TravelAgent:
    def __init__(self):
        # 預先加載熱門目的地及其資訊
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # 從預先加載的上下文中擷取目的地資訊
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# 使用範例
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### 解說

1. **初始化（`__init__` 方法）**：`TravelAgent` 類預先載入一個字典，包含諸如巴黎、東京、紐約和悉尼等熱門旅遊地點的資訊。此字典包括每個地點的國家、貨幣、語言及主要景點等細節。

2. **擷取資訊（`get_destination_info` 方法）**：當用戶查詢特定旅遊地點時，`get_destination_info` 方法會從預先載入的上下文字典中取得相關資訊。

藉由預先載入上下文，旅遊代理應用能快速回應使用者查詢，無需即時從外部來源擷取資料。這使得應用更有效率且反應更快。

### 在迭代前以目標啟動計劃

以目標啟動計劃意指從明確的目標或期望結果開始。透過事先定義此目標，模型可以將其作為整個迭代過程中的指導原則。這有助於確保每次迭代都逐步接近期望結果，使過程更聚焦且高效。

以下展示如何在 Python 中為旅遊代理在迭代前以目標啟動旅遊計劃的範例：

### 情境

旅遊代理想為客戶規劃客製化假期。目標是根據客戶的偏好與預算，制定最大化滿意度的旅遊行程。

### 步驟

1. 定義客戶的偏好與預算。
2. 根據這些偏好啟動初步行程。
3. 迭代以優化行程，提升客戶滿意度。

#### Python 程式碼

```python
class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def bootstrap_plan(self, preferences, budget):
        plan = []
        total_cost = 0

        for destination in self.destinations:
            if total_cost + destination['cost'] <= budget and self.match_preferences(destination, preferences):
                plan.append(destination)
                total_cost += destination['cost']

        return plan

    def match_preferences(self, destination, preferences):
        for key, value in preferences.items():
            if destination.get(key) != value:
                return False
        return True

    def iterate_plan(self, plan, preferences, budget):
        for i in range(len(plan)):
            for destination in self.destinations:
                if destination not in plan and self.match_preferences(destination, preferences) and self.calculate_cost(plan, destination) <= budget:
                    plan[i] = destination
                    break
        return plan

    def calculate_cost(self, plan, new_destination):
        return sum(destination['cost'] for destination in plan) + new_destination['cost']

# 範例用法
destinations = [
    {"name": "Paris", "cost": 1000, "activity": "sightseeing"},
    {"name": "Tokyo", "cost": 1200, "activity": "shopping"},
    {"name": "New York", "cost": 900, "activity": "sightseeing"},
    {"name": "Sydney", "cost": 1100, "activity": "beach"},
]

preferences = {"activity": "sightseeing"}
budget = 2000

travel_agent = TravelAgent(destinations)
initial_plan = travel_agent.bootstrap_plan(preferences, budget)
print("Initial Plan:", initial_plan)

refined_plan = travel_agent.iterate_plan(initial_plan, preferences, budget)
print("Refined Plan:", refined_plan)
```

#### 程式碼解說

1. **初始化（`__init__` 方法）**：`TravelAgent` 類別初始化時帶入一份潛在旅遊地點清單，每個地點包含名稱、費用與活動類型等屬性。

2. **啟動計劃（`bootstrap_plan` 方法）**：此方法根據客戶的偏好與預算建立初步旅遊計劃。透過遍歷旅遊地點列表，若符合偏好且符合預算則加入計劃中。

3. **匹配偏好（`match_preferences` 方法）**：此方法檢查地點是否符合客戶偏好。

4. **迭代計劃（`iterate_plan` 方法）**：此方法改進初步計劃，嘗試以更符合偏好與預算限制的地點替代現有行程中的地點。

5. **計算費用（`calculate_cost` 方法）**：此方法計算目前行程的總費用，包括可能新增的地點。

#### 範例使用

- **初始計劃**：旅遊代理根據客戶的觀光偏好與 2000 美元預算建立初步旅遊計劃。
- **優化計劃**：旅遊代理透過迭代優化行程，提升符合客戶偏好與預算。

以明確目標（例如最大化客戶滿意度）啟動計劃並透過迭代優化，旅遊代理能為客戶制定客製化且優化的旅遊行程。此方法確保旅遊計劃從一開始就符合客戶偏好與預算，並隨著每次迭代不斷改進。

### 利用大型語言模型（LLM）進行重新排序與評分

大型語言模型（LLM）可用於重新排序與評分，藉由評估擷取的文件或產生回應的相關性與品質。運作如下：

**擷取**：初步擷取階段根據查詢取得一組候選文件或回應。

**重新排序**：LLM 評估這些候選項並根據相關性與品質進行重新排序，確保最相關且高品質的資訊優先呈現。

**評分**：LLM 為每個候選項分配評分，反映其相關性及品質，有助選出最佳回應或文件給用戶。

透過利用 LLM 進行重新排序與評分，系統能提供更準確、具上下文相關性的資訊，提升整體用戶體驗。

以下展示如何在 Python 中讓旅遊代理利用大型語言模型（LLM）依照使用者偏好重新排序並評分旅遊地點的範例：

#### 情境 - 根據偏好規劃旅遊

旅遊代理想根據客戶偏好推薦最佳旅遊地點。LLM 將協助重新排序與評分，確保呈現最相關的選項。

#### 步驟：

1. 收集用戶偏好。
2. 擷取潛在旅遊地點清單。
3. 使用 LLM 根據用戶偏好重新排序並評分旅遊地點。

以下示範如何將先前範例更新以使用 Azure OpenAI 服務：

#### 要求

1. 需擁有 Azure 訂閱。
2. 建立 Azure OpenAI 資源並取得 API 金鑰。

#### Python 範例程式碼

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # 為 Azure OpenAI 產生提示
        prompt = self.generate_prompt(preferences)
        
        # 定義請求的標頭和負載
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # 呼叫 Azure OpenAI API 以取得重新排序及評分的目的地
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # 擷取並返回建議結果
        recommendations = response_data['choices'][0]['text'].strip().split('\n')
        return recommendations

    def generate_prompt(self, preferences):
        prompt = "Here are the travel destinations ranked and scored based on the following user preferences:\n"
        for key, value in preferences.items():
            prompt += f"{key}: {value}\n"
        prompt += "\nDestinations:\n"
        for destination in self.destinations:
            prompt += f"- {destination['name']}: {destination['description']}\n"
        return prompt

# 使用範例
destinations = [
    {"name": "Paris", "description": "City of lights, known for its art, fashion, and culture."},
    {"name": "Tokyo", "description": "Vibrant city, famous for its modernity and traditional temples."},
    {"name": "New York", "description": "The city that never sleeps, with iconic landmarks and diverse culture."},
    {"name": "Sydney", "description": "Beautiful harbour city, known for its opera house and stunning beaches."},
]

preferences = {"activity": "sightseeing", "culture": "diverse"}
api_key = 'your_azure_openai_api_key'
endpoint = 'https://your-endpoint.com/openai/deployments/your-deployment-name/completions?api-version=2022-12-01'

travel_agent = TravelAgent(destinations)
recommendations = travel_agent.get_recommendations(preferences, api_key, endpoint)
print("Recommended Destinations:")
for rec in recommendations:
    print(rec)
```

#### 程式碼解說 - 偏好訂房者

1. **初始化**：`TravelAgent` 類別初始化時帶入潛在旅遊地點清單，每個地點包含名稱與描述等屬性。

2. **取得推薦（`get_recommendations` 方法）**：此方法依據用戶偏好產生提示字串，並對 Azure OpenAI API 進行 HTTP POST 請求，以取得重新排序和評分的旅遊地點。

3. **產生提示字串（`generate_prompt` 方法）**：此方法為 Azure OpenAI 組建提示字串，包含用戶偏好與地點清單。提示指引模型根據偏好重新排序與評分地點。

4. **API 呼叫**：使用 `requests` 函式庫對 Azure OpenAI API 端點進行 HTTP POST 請求，回應包含重新排序和評分後的地點。

5. **範例使用**：旅遊代理收集用戶偏好（例如對觀光和多元文化感興趣），並利用 Azure OpenAI 服務獲得重新排序和評分的旅遊推薦。

請務必將 `your_azure_openai_api_key` 替換為實際的 Azure OpenAI API 金鑰，並將 `https://your-endpoint.com/...` 替換為 Azure OpenAI 部署的實際端點 URL。

藉由利用 LLM 進行重新排序與評分，旅遊代理能為客戶提供更個人化且相關的旅遊建議，提升整體體驗。

### RAG：提示技術 vs 工具

檢索增強生成（RAG）既可視為提示技術，也可視為 AI 代理開發中的工具。理解兩者差異，有助於更有效利用 RAG 於專案中。

#### 作為提示技術的 RAG

**是什麼？**

- 作為提示技術，RAG 涉及設計特定查詢或提示，以引導從大型語料庫或資料庫檢索相關資訊，然後用於生成回應或行動。

**運作方式：**

1. **製作提示**：根據任務或用戶輸入建立結構良好的提示或查詢。
2. **擷取資訊**：使用提示從既有知識庫或資料集中搜尋相關資料。
3. **生成回應**：將擷取的資料與生成式 AI 模型結合，產出完整且連貫的回應。

**旅遊代理例子：**

- 用戶輸入：「我想參觀巴黎的博物館。」
- 提示：「尋找巴黎的頂尖博物館。」
- 擷取資訊：關於羅浮宮、奧賽博物館等細節。
- 生成回應：「這裡有一些巴黎的頂尖博物館：羅浮宮、奧賽博物館和龐畢度中心。」

#### 作為工具的 RAG

**是什麼？**

- 作為工具，RAG 是整合系統，自動化完成擷取與生成流程，方便開發者無需手動為每個查詢撰寫提示。

**運作方式：**

1. **整合**：將 RAG 嵌入 AI 代理架構，讓其自動處理擷取與生成任務。
2. **自動化**：工具管理整個流程，從接收用戶輸入到生成最終回應，無需為每步驟明確提示。
3. **效率**：通過簡化擷取與生成流程，提升代理表現，實現更快速、準確的回應。

**旅遊代理例子：**

- 用戶輸入：「我想參觀巴黎的博物館。」
- RAG 工具：自動擷取有關博物館的資訊並生成回應。
- 生成回應：「這裡有一些巴黎的頂尖博物館：羅浮宮、奧賽博物館和龐畢度中心。」

### 比較

| 方面                   | 提示技術                                                    | 工具                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **手動 vs 自動**       | 為每個查詢手動設計提示。                                  | 自動化擷取與生成流程。                               |
| **控制**               | 對擷取流程掌控度較高。                                    | 簡化並自動化擷取與生成流程。                         |
| **彈性**               | 允許根據特定需求自訂提示。                                | 大規模實作更有效率。                                 |
| **複雜度**             | 需撰寫並調整提示。                                        | 容易整合至 AI 代理架構。                             |

### 實務範例

**提示技術範例：**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**工具範例：**

```python
class Travel_Agent:
    def __init__(self):
        self.rag_tool = RAGTool()

    def get_museums_in_paris(self):
        user_input = "I want to visit museums in Paris."
        response = self.rag_tool.retrieve_and_generate(user_input)
        return response

travel_agent = Travel_Agent()
museums = travel_agent.get_museums_in_paris()
print("Top Museums in Paris:", museums)
```

### 評估相關性

評估相關性是 AI 代理性能的關鍵面向。它確保代理擷取和生成的資訊對用戶適當、準確且有用。我們來探討如何評估 AI 代理的相關性，包含實務範例與技術。

#### 評估相關性的關鍵概念

1. **上下文感知**：
   - 代理必須理解用戶查詢的上下文，以擷取及生成相關資訊。
   - 範例：若用戶詢問「巴黎最佳餐廳」，代理應考慮用戶偏好如料理類型與預算。

2. **準確性**：
   - 代理提供的資訊應為事實正確且最新。
   - 範例：推薦目前營業且有好評的餐廳，而非過時或已關閉的選項。

3. **用戶意圖**：
   - 代理應推敲用戶查詢背後的意圖，提供最相關資訊。
   - 範例：若用戶問「經濟型飯店」，代理應優先推介實惠選項。

4. **反饋迴圈**：
   - 持續收集並分析用戶反饋，幫助代理精進相關性評估。
   - 範例：整合用戶對先前推薦的評分與回饋，優化後續回應。

#### 評估相關性的實務技術

1. **相關性評分**：
   - 根據項目與用戶查詢及偏好的匹配度，為每個擷取項目分派相關性分數。
   - 範例：

     ```python
     def relevance_score(item, query):
         score = 0
         if item['category'] in query['interests']:
             score += 1
         if item['price'] <= query['budget']:
             score += 1
         if item['location'] == query['destination']:
             score += 1
         return score
     ```

2. **篩選與排序**：
   - 篩除不相關項目，根據相關性分數排序剩餘項目。
   - 範例：

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # 返回前10個相關項目
     ```

3. **自然語言處理（NLP）**：
   - 使用 NLP 技術理解用戶查詢並擷取相關資訊。
   - 範例：

     ```python
     def process_query(query):
         # 使用自然語言處理從用戶查詢中提取關鍵資訊
         processed_query = nlp(query)
         return processed_query
     ```

4. **用戶反饋整合**：
   - 收集用戶對提供推薦的反饋，並用以調整未來的相關性評估。
   - 範例：

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### 範例：旅遊代理的相關性評估

以下是一個旅遊代理如何評估旅遊推薦相關性的實務範例：

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        ranked_hotels = self.filter_and_rank(hotels, self.user_preferences)
        itinerary = create_itinerary(flights, ranked_hotels, attractions)
        return itinerary

    def filter_and_rank(self, items, query):
        ranked_items = sorted(items, key=lambda item: self.relevance_score(item, query), reverse=True)
        return ranked_items[:10]  # 返回前10個相關項目

    def relevance_score(self, item, query):
        score = 0
        if item['category'] in query['interests']:
            score += 1
        if item['price'] <= query['budget']:
            score += 1
        if item['location'] == query['destination']:
            score += 1
        return score

    def adjust_based_on_feedback(self, feedback, items):
        for item in items:
            if item['name'] in feedback['liked']:
                item['relevance'] += 1
            if item['name'] in feedback['disliked']:
                item['relevance'] -= 1
        return items

# 使用範例
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_items = travel_agent.adjust_based_on_feedback(feedback, itinerary['hotels'])
print("Updated Itinerary with Feedback:", updated_items)
```

### 以意圖進行搜尋

以意圖進行搜尋意味著理解並解析用戶查詢背後的目的或目標，以擷取並生成最相關且實用的資訊。此方式超越僅匹配關鍵字，著重於掌握用戶的實際需求與上下文。

#### 以意圖搜尋的關鍵概念

1. **理解用戶意圖**：
   - 用戶意圖可分為三大類：資訊性、導航性及交易性。
     - **資訊性意圖**：用戶尋找某主題的資訊（例如：「巴黎有哪些最佳博物館？」）。
     - **導航性意圖**：用戶想前往特定網站或頁面（例如：「羅浮宮官方網站」）。
     - **交易性意圖**：用戶想進行交易，如訂機票或購物（例如：「訂一張飛往巴黎的機票」）。

2. **上下文感知**：
   - 分析用戶查詢的上下文有助於精確識別意圖，包括先前互動、用戶偏好及當前查詢的詳情。

3. **自然語言處理（NLP）**：
   - 運用 NLP 技術理解並解析用戶提供的自然語言查詢，包含實體辨識、情感分析及查詢解析等任務。

4. **個人化**：
   - 根據用戶歷史、偏好和回饋來個人化搜尋結果，提升擷取資訊的相關性。

#### 實務範例：旅遊代理中的以意圖搜尋

以旅遊代理為例，演示如何實作以意圖搜尋。

1. **收集用戶偏好**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **理解用戶意圖**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **上下文感知**
   ```python
   def analyze_context(query, user_history):
       # 將目前查詢與用戶歷史結合以了解上下文
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **搜尋及個人化結果**

   ```python
   def search_with_intent(query, preferences, user_history):
       intent = identify_intent(query)
       context = analyze_context(query, user_history)
       if intent == "informational":
           search_results = search_information(query, preferences)
       elif intent == "navigational":
           search_results = search_navigation(query)
       elif intent == "transactional":
           search_results = search_transaction(query, preferences)
       personalized_results = personalize_results(search_results, user_history)
       return personalized_results

   def search_information(query, preferences):
       # 資訊意圖的範例搜尋邏輯
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # 導航意圖的範例搜尋邏輯
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # 交易意圖的範例搜尋邏輯
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # 範例個人化邏輯
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # 返回前10個個人化結果
   ```

5. **示範用法**

   ```python
   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   user_history = ["Louvre Museum website", "Book flight to Paris"]
   query = "best museums in Paris"
   results = search_with_intent(query, preferences, user_history)
   print("Search Results:", results)
   ```

---

## 4. 將程式碼生成功能作為工具

程式碼生成代理人使用 AI 模型來撰寫和執行程式碼，解決複雜問題並自動化任務。

### 程式碼生成代理人

程式碼生成代理人利用生成式 AI 模型撰寫和執行程式碼。這些代理人可透過在各種程式語言中生成並運行程式碼來解決複雜問題、自動化任務，並提供寶貴的見解。

#### 實用應用

1. **自動化程式碼生成**：針對特定任務生成程式碼片段，例如資料分析、網頁擷取或機器學習。
2. **SQL 作為 RAG**：使用 SQL 查詢來從資料庫檢索及操作數據。
3. **問題解決**：建立並執行程式碼以解決特定問題，例如優化演算法或分析數據。

#### 示例：用於資料分析的程式碼生成代理人

假設你正在設計一個程式碼生成代理人。其運作方式如下：

1. **任務**：分析資料集以識別趨勢和模式。
2. **步驟**：
   - 將資料集載入資料分析工具。
   - 生成 SQL 查詢以篩選和彙總資料。
   - 執行查詢並檢索結果。
   - 利用結果生成視覺化和見解。
3. **所需資源**：訪問資料集、資料分析工具及 SQL 功能。
4. **經驗**：利用過去的分析結果來提升未來分析的準確度和相關性。

### 示例：用於旅行代理的程式碼生成代理人

此示例中，我們將設計一個名為 Travel Agent 的程式碼生成代理人，協助使用者透過生成並執行程式碼來計劃旅程。此代理人能處理如取得旅遊選項、篩選結果及使用生成式 AI 編輯行程等任務。

#### 程式碼生成代理人概覽

1. **收集使用者偏好**：蒐集使用者輸入的目的地、旅遊日期、預算及興趣。
2. **生成獲取資料的程式碼**：生成程式碼片段以取得航班、飯店和景點資料。
3. **執行生成的程式碼**：執行程式碼以抓取即時資訊。
4. **生成行程**：將抓取的資料彙整為個人化旅遊計劃。
5. **根據反饋調整**：接收使用者反饋，必要時重新生成程式碼以優化結果。

#### 詳細步驟實作

1. **收集使用者偏好**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **生成獲取資料的程式碼**

   ```python
   def generate_code_to_fetch_data(preferences):
       # 例子：產生代碼以根據用戶偏好搜尋航班
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # 例子：產生代碼以搜尋酒店
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **執行生成的程式碼**

   ```python
   def execute_code(code):
       # 使用 exec 執行產生的程式碼
       exec(code)
       result = locals()
       return result

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   
   flight_code = generate_code_to_fetch_data(preferences)
   hotel_code = generate_code_to_fetch_hotels(preferences)
   
   flights = execute_code(flight_code)
   hotels = execute_code(hotel_code)

   print("Flight Options:", flights)
   print("Hotel Options:", hotels)
   ```

4. **生成行程**

   ```python
   def generate_itinerary(flights, hotels, attractions):
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   attractions = search_attractions(preferences)
   itinerary = generate_itinerary(flights, hotels, attractions)
   print("Suggested Itinerary:", itinerary)
   ```

5. **根據反饋調整**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # 根據用戶反饋調整偏好設定
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # 使用更新的偏好設定重新生成並執行代碼
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### 利用環境感知和推理

基於資料表結構能夠強化查詢生成過程，利用環境感知及推理。

以下是示範做法：

1. **了解結構**：系統會理解資料表的架構，並利用此資訊作為生成查詢的依據。
2. **根據反饋調整**：系統將依據回饋調整使用者偏好，並推理哪些欄位需更新。
3. **生成並執行查詢**：系統根據新的偏好，生成並執行查詢來取得更新的航班及飯店資料。

以下是融入這些概念的更新版 Python 範例程式碼：

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # 根據用戶反饋調整偏好設定
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # 根據結構推理以調整其他相關偏好設定
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # 根據結構及反饋自訂邏輯來調整偏好設定
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # 生成代碼以根據更新的偏好設定獲取航班資料
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # 生成代碼以根據更新的偏好設定獲取酒店資料
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # 模擬執行代碼並返回模擬數據
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # 根據航班、酒店及景點生成行程
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# 範例結構
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# 使用範例
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# 重新生成並執行代碼以符合更新的偏好設定
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### 說明 - 根據反饋進行預訂

1. **結構感知**：`schema` 字典定義了如何基於反饋調整偏好，包含像 `favorites` 和 `avoid` 等欄位及其調整方式。
2. **調整偏好 (`adjust_based_on_feedback` 方法)**：此方法根據使用者反饋與結構調整偏好。
3. **基於環境調整 (`adjust_based_on_environment` 方法)**：此方法根據結構與反饋自訂調整內容。
4. **生成並執行查詢**：系統根據調整後的偏好生成程式碼，以取得更新的航班及飯店資料，並模擬執行這些查詢。
5. **生成行程**：系統基於新的航班、飯店與景點資料製作更新行程。

透過使系統具備環境感知並基於結構推理，能生成更精準且相關的查詢，帶來更佳的旅遊建議和更個人化的使用者體驗。

### 將 SQL 作為檢索增強生成（RAG）技術

SQL（結構化查詢語言）是與資料庫互動的強大工具。在作為檢索增強生成（RAG）方式的一部分時，SQL 可用來從資料庫檢索相關資料，支援 AI 代理生成回答或執行動作。讓我們探討在 Travel Agent 案例中如何利用 SQL 作為 RAG 技術。

#### 主要概念

1. **資料庫交互**：
   - 使用 SQL 查詢資料庫，取得相關資訊並操作數據。
   - 例如：從旅遊資料庫抓取航班資料、飯店資訊及景點資料。

2. **與 RAG 整合**：
   - 根據使用者輸入和偏好生成 SQL 查詢。
   - 抓取的資料將用於生成個人化建議或行動。

3. **動態查詢生成**：
   - AI 代理根據情境與使用者需求動態生成 SQL 查詢。
   - 例如：依預算、日期和興趣客製化 SQL 查詢篩選結果。

#### 應用

- **自動化程式碼生成**：針對特定任務生成程式碼片段。
- **SQL 作為 RAG**：運用 SQL 查詢操控數據。
- **問題解決**：撰寫與執行程式碼以解決問題。

**範例**：
資料分析代理：

1. **任務**：分析資料集找出趨勢。
2. **步驟**：
   - 載入資料集。
   - 生成 SQL 查詢以篩選資料。
   - 執行查詢並取得結果。
   - 產生視覺化與見解。
3. **資源**：資料集訪問，SQL 能力。
4. **經驗**：利用過往結果提升未來分析。

#### 實務例子：在 Travel Agent 中使用 SQL

1. **收集使用者偏好**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **生成 SQL 查詢**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **執行 SQL 查詢**

   ```python
   import sqlite3

   def execute_sql_query(query, database="travel.db"):
       connection = sqlite3.connect(database)
       cursor = connection.cursor()
       cursor.execute(query)
       results = cursor.fetchall()
       connection.close()
       return results
   ```

4. **生成建議**

   ```python
   def generate_recommendations(preferences):
       flight_query = generate_sql_query("flights", preferences)
       hotel_query = generate_sql_query("hotels", preferences)
       attraction_query = generate_sql_query("attractions", preferences)
       
       flights = execute_sql_query(flight_query)
       hotels = execute_sql_query(hotel_query)
       attractions = execute_sql_query(attraction_query)
       
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   itinerary = generate_recommendations(preferences)
   print("Suggested Itinerary:", itinerary)
   ```

#### 範例 SQL 查詢

1. **航班查詢**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **飯店查詢**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **景點查詢**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

藉由將 SQL 作為檢索增強生成（RAG）技術，像 Travel Agent 這類 AI 代理能夠動態地檢索並運用相關資料，提供精確且個人化的建議。

### 元認知示例

為了展示元認知的實作，我們建立一個簡單代理，*在解決問題時反思其決策過程*。範例中，代理會嘗試優化飯店選擇，然後根據評估自己的推理過程並在出錯或選擇不佳時調整策略。

我們模擬一個基礎例子，代理根據價格和品質組合進行飯店選擇，但會「反思」決定並相應調整。

#### 如何展現元認知：

1. **初始決策**：代理會選擇最便宜的飯店，無視品質影響。
2. **反思及評估**：初選後，代理透過使用者反饋判斷飯店是否為「差」選擇，如果品質太低，便反思其推理。
3. **調整策略**：代理根據反思調整策略，從以「最便宜」為主轉為「最高品質」，從而改善後續決策。

範例如下：

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # 儲存之前選擇的酒店
        self.corrected_choices = []  # 儲存已修正的選擇
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # 可用策略

    def recommend_hotel(self, hotels, strategy):
        """
        Recommend a hotel based on the chosen strategy.
        The strategy can either be 'cheapest' or 'highest_quality'.
        """
        if strategy == 'cheapest':
            recommended = min(hotels, key=lambda x: x['price'])
        elif strategy == 'highest_quality':
            recommended = max(hotels, key=lambda x: x['quality'])
        else:
            recommended = None
        self.previous_choices.append((strategy, recommended))
        return recommended

    def reflect_on_choice(self):
        """
        Reflect on the last choice made and decide if the agent should adjust its strategy.
        The agent considers if the previous choice led to a poor outcome.
        """
        if not self.previous_choices:
            return "No choices made yet."

        last_choice_strategy, last_choice = self.previous_choices[-1]
        # 假設我們有一些用戶反饋，告訴我們上一次選擇是否好
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # 如果之前的選擇不理想，調整策略
            new_strategy = 'highest_quality' if last_choice_strategy == 'cheapest' else 'cheapest'
            self.corrected_choices.append((new_strategy, last_choice))
            return f"Reflecting on choice. Adjusting strategy to {new_strategy}."
        else:
            return "The choice was good. No need to adjust."

    def get_user_feedback(self, hotel):
        """
        Simulate user feedback based on hotel attributes.
        For simplicity, assume if the hotel is too cheap, the feedback is "bad".
        If the hotel has quality less than 7, feedback is "bad".
        """
        if hotel['price'] < 100 or hotel['quality'] < 7:
            return "bad"
        return "good"

# 模擬一個酒店列表（價格和質素）
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# 建立一個代理人
agent = HotelRecommendationAgent()

# 第1步：代理人使用「最平」策略推薦酒店
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# 第2步：代理人反思選擇並在必要時調整策略
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# 第3步：代理人再次推薦，這次使用調整後的策略
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### 代理的元認知能力

關鍵在於代理能夠：
- 評估先前的選擇與決策過程。
- 根據反思調整策略，即元認知的實踐。

這是元認知的一種簡單形式，系統可根據內部反饋調整其推理歷程。

### 結論

元認知是加強 AI 代理能力的強大工具。藉由整合元認知過程，您可以設計出更智慧、適應性強且效率更高的代理人。利用額外資源進一步探索 AI 代理中的元認知精彩世界。

### 對元認知設計模式還有更多疑問嗎？

加入 [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)，與其他學習者交流、參加辦公時間並獲得 AI 代理相關問題的解答。

## 上一課

[多代理設計模式](../08-multi-agent/README.md)

## 下一課

[生產環境中的 AI 代理](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件已使用人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。儘管我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用此翻譯而引起的任何誤解或誤釋負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->