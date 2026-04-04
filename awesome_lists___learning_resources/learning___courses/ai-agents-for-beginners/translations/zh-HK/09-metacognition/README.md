[![多代理設計](../../../translated_images/zh-HK/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(點擊上方圖片觀看本課程的影片)_
# AI 代理中的元認知

## 介紹

歡迎來到關於 AI 代理元認知的課程！本章為初學者設計，適合好奇 AI 代理如何思考自身思維過程的人。完成本課後，你將理解關鍵概念，並掌握可應用於 AI 代理設計的實務範例。

## 學習目標

完成本課程後，你將能夠：

1. 了解在代理定義中推理迴圈的影響。
2. 使用規劃與評估技術來幫助自我修正的代理。
3. 建立能夠操作程式碼以完成任務的代理。

## 元認知導論

元認知指的是關於自己思考的高階認知過程。對於 AI 代理而言，這意味著能夠根據自我覺察與過去經驗評估並調整其行為。元認知，或稱「思考自己的思考」，是在設計具代理能力的 AI 系統時的一個重要概念。它涉及 AI 系統能夠察覺自身的內部過程，並能夠監控、調節與適應其行為。就像我們在判斷現場氣氛或檢視問題時所做的那樣。這種自我覺察可以幫助 AI 系統做出更好的決策、識別錯誤，並隨時間提升其表現——再次連回圖靈測試以及關於 AI 是否會接管的爭論。

在具代理能力的 AI 系統情境中，元認知可以協助解決若干挑戰，例如：
- 透明性：確保 AI 系統可以解釋其推理與決策。
- 推理：增強 AI 系統綜合資訊並做出合理決策的能力。
- 適應性：允許 AI 系統調整以適應新環境與變化條件。
- 感知：提升 AI 系統識別與解釋環境中資料的準確性。

### 什麼是元認知？

元認知，或稱「思考自己的思考」，是一種高階認知過程，涉及對自身認知過程的自我覺察與自我調節。在 AI 領域，元認知讓代理能夠評估並調整其策略與行動，從而改進問題解決與決策能力。理解元認知後，你可以設計出不僅更聰明，而且更具適應性與效率的 AI 代理。在真正的元認知中，你會看到 AI 明確地對其自身的推理進行推理。

範例：「我優先選擇更便宜的航班，因為…我可能錯過直飛航班，所以讓我再檢查一次。」  
追蹤它如何或為何選擇某條路徑。  
- 注意到它犯錯是因為過度依賴上次使用者偏好，所以它改變的是決策策略，而不僅是最終推薦。  
- 診斷出模式，例如：「每當我看到使用者提到『太擠』，我不僅應該移除某些景點，還應該反思如果我總是以人氣排序『熱門景點』的方法是有缺陷的。」

### 元認知在 AI 代理的重要性

元認知在 AI 代理設計中扮演關鍵角色，原因包括：

![重要性的元認知](../../../translated_images/zh-HK/importance-of-metacognition.b381afe9aae352f7.webp)

- 自我反思：代理可以評估自身表現並找出需改進的地方。
- 適應性：代理可以根據過去經驗與變化的環境調整其策略。
- 錯誤修正：代理能夠自主偵測並修正錯誤，導致更準確的結果。
- 資源管理：代理可以透過規劃與評估其動作來優化資源使用，例如時間與計算能力。

## AI 代理的組成要素

在深入元認知過程前，了解 AI 代理的基本組成要素是必要的。AI 代理通常由以下幾個部分組成：

- 角色（Persona）：代理的人格與特性，定義其與使用者互動的方式。
- 工具（Tools）：代理可以執行的功能與能力。
- 技能（Skills）：代理所擁有的知識與專業能力。

這些組件協同運作，創造出可以執行特定任務的「專業單元」。

**範例**：
想像一個旅遊代理（travel agent）服務，不僅為你規劃假期，還能根據實時資料與過去客戶旅程經驗調整路徑。

### 範例：旅遊代理服務中的元認知

想像你在設計一個由 AI 驅動的旅遊代理服務。這個代理「旅遊代理」協助使用者規劃假期。為了加入元認知，旅遊代理需要根據自我覺察與過去經驗評估並調整其行為。以下是元認知可能發揮作用的方式：

#### 當前任務

當前任務是幫助使用者規劃前往巴黎的旅程。

#### 完成任務的步驟

1. **收集使用者偏好**：詢問使用者有關旅遊日期、預算、興趣（例如博物館、美食、購物）以及任何特定需求。
2. **檢索資訊**：搜尋符合使用者偏好的航班選項、住宿、景點與餐廳。
3. **產生建議**：提供包含航班細節、飯店預訂與建議活動的個人化行程。
4. **根據回饋調整**：詢問使用者對建議的意見並作出必要的調整。

#### 所需資源

- 存取航班與飯店預訂資料庫。
- 有關巴黎景點與餐廳的資訊。
- 以往互動中的使用者回饋資料。

#### 經驗與自我反思

旅遊代理利用元認知評估其表現並從過往經驗中學習。例如：

1. **分析使用者回饋**：旅遊代理會檢視使用者回饋，以判斷哪些建議受到好評、哪些未達標，並相應調整未來建議。
2. **適應性**：如果使用者之前提到不喜歡擁擠的地方，旅遊代理將在未來避免在高峰時段推薦熱門觀光點。
3. **錯誤修正**：如果旅遊代理在過去的預訂中犯了錯誤，例如建議已客滿的飯店，它會學會在推薦前更嚴格地檢查可用性。

#### 開發者實務範例

以下是一個簡化的旅遊代理程式碼範例，展示如何加入元認知：

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # 根據偏好搜尋航班、酒店及景點
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
        # 分析反饋並調整未來的推薦
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

#### 為何元認知很重要

- **自我反思**：代理可以分析其表現並找出改進空間。
- **適應性**：代理可以根據回饋與變化條件修改策略。
- **錯誤修正**：代理能自主偵測並修正錯誤。
- **資源管理**：代理可以優化資源使用，例如時間與計算能力。

透過加入元認知，旅遊代理可以提供更個人化且準確的旅遊建議，提升整體使用者體驗。

---

## 2. 代理中的規劃

規劃是 AI 代理行為的關鍵組成部分。它涉及概述達成目標所需的步驟，考量當前狀態、資源與可能的障礙。

### 規劃要素

- **當前任務**：明確定義任務。
- **完成任務的步驟**：將任務拆分為可管理的步驟。
- **所需資源**：辨識必要資源。
- **經驗**：利用過去經驗來指導規劃。

**範例**：
以下是旅遊代理為有效協助使用者規劃行程所需採取的步驟：

### 旅遊代理的步驟

1. **收集使用者偏好**
   - 詢問使用者有關旅遊日期、預算、興趣與任何特定需求的詳細資訊。
   - 範例：「你計劃何時出發？」 「你的預算範圍是？」 「你在假期喜歡哪些活動？」

2. **檢索資訊**
   - 根據使用者偏好搜尋相關旅遊選項。
   - **航班**：尋找符合使用者預算與偏好旅遊日期的可用航班。
   - **住宿**：尋找符合使用者對位置、價格與設施偏好的飯店或租屋。
   - **景點與餐廳**：辨識與使用者興趣相符的熱門景點、活動與餐飲選項。

3. **產生建議**
   - 將檢索到的資訊彙整成個人化行程。
   - 提供如航班選項、飯店預訂與建議活動等細節，並確保建議依使用者偏好量身打造。

4. **向使用者呈現行程**
   - 將提議行程分享給使用者審閱。
   - 範例：「這是我為你安排的巴黎行程建議，包含航班細節、飯店預訂，以及推薦的活動與餐廳。請告訴我你的看法！」

5. **蒐集回饋**
   - 詢問使用者對提議行程的回饋。
   - 範例：「你覺得這些航班選項如何？」 「這間飯店符合你的需求嗎？」 「有沒有想要新增或移除的活動？」

6. **根據回饋調整**
   - 根據使用者回饋修改行程。
   - 對航班、住宿與活動建議進行必要變更，以更符合使用者偏好。

7. **最終確認**
   - 向使用者呈現更新後的行程以供最終確認。
   - 範例：「我已根據你的回饋做出調整。這是更新後的行程。所有內容看起來都沒問題嗎？」

8. **預訂並確認**
   - 一旦使用者核准行程，進行航班、住宿與任何預先安排活動的預訂。
   - 將確認細節發送給使用者。

9. **提供持續支援**
   - 在出發前及旅途中，隨時協助使用者處理變更或其他請求。
   - 範例：「如果你在旅途中需要任何協助，隨時都可以聯絡我！」

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

# 在一個要求噓聲的請求中的範例用法
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

## 3. 修正 RAG 系統

首先讓我們從了解 RAG 工具與預先上下文載入之間的差異開始

![RAG 與上下文載入](../../../translated_images/zh-HK/rag-vs-context.9eae588520c00921.webp)

### 檢索增強生成（RAG）

RAG 將檢索系統與生成模型結合。當提出查詢時，檢索系統會從外部來源抓取相關文件或資料，並將這些檢索到的資訊用來增強提供給生成模型的輸入。這有助於模型產生更準確且具情境相關性的回應。

在 RAG 系統中，代理會從知識庫中檢索相關資訊，並用它來生成適當的回應或行動。

### 修正性 RAG 方法

修正性 RAG 方法專注於使用 RAG 技術來修正錯誤並提升 AI 代理的準確性。這包括：

1. **提示技巧**：使用特定提示來引導代理檢索相關資訊。
2. **工具**：實作能讓代理評估檢索資訊相關性並生成準確回應的演算法與機制。
3. **評估**：持續評估代理的表現並做出調整以提升其準確性與效率。

#### 範例：搜尋代理中的修正性 RAG

以一個從網路檢索資訊以回答使用者查詢的搜尋代理為例。修正性 RAG 方法可能包含：

1. **提示技巧**：根據使用者輸入形成搜尋查詢。
2. **工具**：使用自然語言處理和機器學習演算法來為搜尋結果排名與過濾。
3. **評估**：分析使用者回饋以辨識並修正檢索資訊中的不準確之處。

### 修正性 RAG 在旅遊代理中的應用

修正性 RAG（Retrieval-Augmented Generation）提升 AI 在檢索與生成資訊時的能力，同時修正任何不準確之處。讓我們看看旅遊代理如何使用修正性 RAG 方法來提供更準確且相關的旅遊建議。

這包括：

- **提示技巧：** 使用特定提示來引導代理檢索相關資訊。
- **工具：** 實作能讓代理評估檢索資訊相關性並生成準確回應的演算法與機制。
- **評估：** 持續評估代理的表現並做出調整以提升其準確性與效率。

#### 在旅遊代理中實作修正性 RAG 的步驟

1. **初步使用者互動**
   - 旅遊代理蒐集使用者的初步偏好，例如目的地、旅遊日期、預算與興趣。
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
   - 旅遊代理根據使用者偏好檢索有關航班、住宿、景點與餐廳的資訊。
   - 範例：

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **產生初步建議**
   - 旅遊代理使用檢索到的資訊來生成個人化行程。
   - 範例：

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **蒐集使用者回饋**
   - 旅遊代理詢問使用者對初步建議的回饋。
   - 範例：

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **修正性 RAG 流程**
   - **提示技巧**：旅遊代理根據使用者回饋制定新的搜尋查詢。
     - 範例：

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **工具**：旅遊代理使用演算法對新的搜尋結果進行排名與過濾，並根據使用者回饋強調相關性。
     - 範例：

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **評估**：旅遊代理透過分析使用者回饋並做出必要調整，持續評估建議的相關性與準確性。
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

#### 實務範例

以下是一個簡化的 Python 程式範例，說明如何在旅遊代理中整合修正性 RAG 方法：

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

# 範例用法
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

### 預先上下文載入
預先載入上下文係指喺處理查詢之前，將相關嘅背景資訊或上下文載入模型。呢個做法表示模型一開始就可以使用呢啲資訊，幫助佢產生更有依據嘅回應，而無需喺處理過程中再檢索額外資料。

Here's a simplified example of how a pre-emptive context load might look for a travel agent application in Python:

```python
class TravelAgent:
    def __init__(self):
        # 預先載入熱門目的地及其資訊
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # 從預先載入的上下文擷取目的地資訊
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

#### 解釋

1. **初始化（`__init__` method）**：`TravelAgent` 類別預先載入一個字典，包含受歡迎旅遊目的地（例如 巴黎、東京、紐約、雪梨）嘅資訊。呢個字典為每個目的地提供國家、貨幣、語言同主要景點等細節。

2. **擷取資訊（`get_destination_info` method）**：當用戶查詢某個特定目的地時，`get_destination_info` 方法會從預先載入嘅上下文字典中擷取相關資訊。

透過預先載入上下文，旅遊代理應用程式可以快速回應用戶查詢，而毋須即時從外部來源檢索呢啲資訊。咁樣令應用程式更有效率同更具回應性。

### 在迭代前以目標引導啟動計劃

以目標引導啟動計劃係指喺開始時就設定清晰嘅目標或期望結果。透過事先定義呢個目標，模型可以喺整個迭代過程中以此作為指引。呢個方法有助確保每一次迭代都更接近達成所需結果，令流程更有效率同有焦點。

Here's an example of how you might bootstrap a travel plan with a goal before iterating for a travel agent in Python:

### Scenario

一位旅遊代理想為客戶規劃一個度身訂造嘅假期。目標係根據客戶嘅偏好同預算，建立一個最大化客戶滿意度嘅旅行行程。

### Steps

1. 定義客戶嘅偏好同預算。
2. 根據呢啲偏好啟動初始計劃。
3. 透過迭代去精煉計劃，優化以提升客戶滿意度。

#### Python Code

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

#### 程式碼說明

1. **初始化（`__init__` method）**：`TravelAgent` 類別會以一個潛在目的地嘅清單作初始化，清單中每個目的地都有屬性，例如 name、cost 同 activity type。

2. **啟動計劃（`bootstrap_plan` method）**：呢個方法會根據客戶嘅偏好同預算建立初始旅行計劃。佢會遍歷目的地清單，若目的地符合客戶偏好且符合預算，就會加入計劃。

3. **匹配偏好（`match_preferences` method）**：呢個方法會檢查某個目的地是否符合客戶嘅偏好。

4. **迭代計劃（`iterate_plan` method）**：呢個方法會通過嘗試用更合適嘅目的地替換計劃中嘅每個目的地，喺考慮客戶偏好同預算約束下，精煉初始計劃。

5. **計算成本（`calculate_cost` method）**：呢個方法會計算目前計劃嘅總成本，包括可能嘅新目的地。

#### 範例用法

- **初始計劃**：旅遊代理根據客戶偏好（例如喜歡觀光）同 $2000 嘅預算建立初始計劃。
- **精煉後嘅計劃**：旅遊代理會迭代該計劃，喺符合客戶偏好同預算下進行優化。

透過以明確目標（例如最大化客戶滿意度）啟動計劃，並透過迭代去精煉，旅遊代理可以為客戶建立一個度身訂造且經過優化嘅行程。呢個方法確保旅行計劃從一開始就與客戶嘅偏好同預算對齊，並喺每次迭代中持續改善。

### 利用 LLM 作重排及評分

大型語言模型（LLMs）可用於對檢索到嘅文件或生成嘅回應進行重排同評分，透過評估候選項嘅相關性同質量嚟排序。運作方式如下：

**檢索：** 初始檢索步驟會根據查詢擷取一組候選文件或回應。

**重排：** LLM 會評估呢啲候選項，並根據相關性同質量重新排序。呢一步確保最相關同高質量嘅資訊會最先呈現。

**評分：** LLM 會為每個候選項指派分數，反映佢哋嘅相關性同質量。呢啲分數有助於揀選最合適嘅回應或文件畀用戶。

透過利用 LLM 進行重排同評分，系統可以提供更準確、更符合上下文嘅資訊，提升整體用戶體驗。

Here's an example of how a travel agent might use a Large Language Model (LLM) for re-ranking and scoring travel destinations based on user preferences in Python:

#### Scenario - Travel based on Preferences

旅遊代理想根據客戶偏好推薦最佳旅遊目的地。LLM 會幫手對目的地進行重排同評分，確保最相關嘅選項會被呈現。

#### Steps:

1. 收集用戶偏好。
2. 擷取一個潛在旅遊目的地嘅清單。
3. 使用 LLM 根據用戶偏好對目的地進行重排同評分。

Here’s how you can update the previous example to use Azure OpenAI Services:

#### Requirements

1. 你需要有一個 Azure 訂閱。
2. 建立一個 Azure OpenAI 資源並取得你嘅 API key。

#### Example Python Code

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # 為 Azure OpenAI 產生提示
        prompt = self.generate_prompt(preferences)
        
        # 為請求定義標頭和載荷
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # 呼叫 Azure OpenAI API 以取得重新排序及評分過的目的地
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # 擷取並回傳建議
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

# 範例用法
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

#### 程式碼說明 - 偏好推薦器

1. **初始化**：`TravelAgent` 類別會以一個潛在旅遊目的地清單作初始化，清單中每個目的地都有屬性，例如 name 同 description。

2. **獲取推薦（`get_recommendations` method）**：呢個方法會根據用戶偏好為 Azure OpenAI 構建一個 prompt，然後向 Azure OpenAI API 發出 HTTP POST 請求去獲取重排同評分後嘅目的地。

3. **生成 Prompt（`generate_prompt` method）**：呢個方法會為 Azure OpenAI 構造一個 prompt，當中包含用戶偏好同目的地清單。呢個 prompt 會指引模型根據提供嘅偏好進行重排同評分。

4. **API 呼叫**：使用 `requests` 函式庫向 Azure OpenAI API 端點發出 HTTP POST 請求。回應會包含重排同評分後嘅目的地。

5. **範例用法**：旅遊代理收集用戶偏好（例如對觀光同多元文化感興趣），並使用 Azure OpenAI 服務獲取重排同評分後嘅旅遊目的地推薦。

請務必將 `your_azure_openai_api_key` 替換成你實際嘅 Azure OpenAI API key，並將 `https://your-endpoint.com/...` 替換成你嘅 Azure OpenAI 部署嘅實際端點 URL。

透過利用 LLM 進行重排同評分，旅遊代理可以為客戶提供更個人化同更相關嘅旅遊推薦，提升整體體驗。

### RAG：提示技術 vs 工具

Retrieval-Augmented Generation（RAG）可以同時作為提示技術（prompting technique）或作為工具喺 AI 代理開發中使用。了解兩者之間嘅分別可以幫助你更有效地運用 RAG 喺項目中。

#### 作為提示技術的 RAG

**係咩嚟？**

- 作為提示技術時，RAG 涉及制定具體嘅查詢或提示，以引導從大型語料庫或資料庫中檢索相關資訊。然後使用呢啲資訊去生成回應或採取行動。

**點樣運作：**

1. **制定提示**：根據手頭任務或用戶嘅輸入建立結構良好嘅提示或查詢。
2. **檢索資訊**：使用呢啲提示去搜尋現有知識庫或數據集中的相關資料。
3. **生成回應**：將檢索到嘅資訊與生成型 AI 模型結合，產生完整且連貫嘅回應。

**Travel Agent 中嘅例子：**

- 用戶輸入：「我想去巴黎睇博物館。」  
- 提示：「搵巴黎嘅頂級博物館。」  
- 檢索到嘅資訊：有關 Louvre Museum、Musée d'Orsay 等嘅詳情。  
- 生成回應：「Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou.」

#### 作為工具的 RAG

**係咩嚟？**

- 作為工具時，RAG 係一個整合系統，能自動化檢索同生成流程，令開發者毋須為每個查詢手動撰寫提示，就可以實現複雜嘅 AI 功能。

**點樣運作：**

1. **整合**：將 RAG 嵌入 AI 代理嘅架構中，允許佢自動處理檢索同生成任務。
2. **自動化**：該工具管理整個流程，由接收用戶輸入到生成最終回應，毋須為每一步提供明確提示。
3. **效率**：透過精簡檢索同生成流程，提高代理嘅表現，令回應更快更準確。

**Travel Agent 中嘅例子：**

- 用戶輸入：「我想去巴黎睇博物館。」  
- RAG 工具：自動檢索關於博物館嘅資訊並生成回應。  
- 生成回應：「Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou.」

### Comparison

| Aspect                 | Prompting Technique                                        | Tool                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Manual vs Automatic**| 手動為每個查詢制定提示。                                    | 自動化嘅檢索與生成流程。                               |
| **Control**            | 對檢索過程提供更多控制。                                    | 精簡並自動化檢索與生成流程。                           |
| **Flexibility**        | 允許根據具體需要自訂提示。                                  | 對大規模實施更為高效。                                 |
| **Complexity**         | 需要撰寫同調整提示。                                        | 更容易整合到 AI 代理嘅架構中。                         |

### 實際範例

**提示技術例子：**

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

評估相關性係 AI 代理效能嘅關鍵一環。佢確保代理所檢索同生成嘅資訊對用戶嚟講係合適、準確同有用。以下介紹如何喺 AI 代理中評估相關性，包括實際例子同技術。

#### 評估相關性嘅關鍵概念

1. **上下文感知**：
   - 代理必須理解用戶查詢嘅上下文，先至能檢索同生成相關資訊。
   - 例子：如果用戶問「巴黎最好嘅餐廳係邊啲？」，代理應該考慮用戶嘅偏好，例如菜式類型同預算。

2. **準確性**：
   - 代理提供嘅資訊應該係事實上正確同最新嘅。
   - 例子：應該推薦目前仍然營業且評價良好嘅餐廳，而唔係過時或已關閉嘅選項。

3. **用戶意圖**：
   - 代理應該推斷用戶查詢背後嘅意圖，以提供最相關嘅資訊。
   - 例子：如果用戶問「平價酒店」，代理應優先考慮價格實惠嘅選項。

4. **反饋迴圈**：
   - 持續收集同分析用戶反饋有助代理改善其相關性評估流程。
   - 例子：將用戶對之前推薦嘅評分同反饋納入考量，以改進未來回應。

#### 評估相關性嘅實用技術

1. **相關性評分**：
   - 根據檢索項目與用戶查詢同偏配度，為每個檢索項目指派相關性分數。
   - 例子：

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

2. **過濾與排序**：
   - 過濾掉無關項目，並根據相關性分數對其餘項目進行排序。
   - 例子：

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # 返回最相關的前10個項目
     ```

3. **自然語言處理（NLP）**：
   - 使用 NLP 技術去理解用戶查詢並檢索相關資訊。
   - 例子：

     ```python
     def process_query(query):
         # 使用 NLP 從使用者的查詢中擷取關鍵資訊
         processed_query = nlp(query)
         return processed_query
     ```

4. **用戶反饋整合**：
   - 收集用戶對所提供建議嘅反饋，並用嚟調整未來嘅相關性評估。
   - 例子：

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### 範例：在旅遊代理中評估相關性

呢度係一個實際範例，示範 Travel Agent 點樣評估旅遊推薦嘅相關性：

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
        return ranked_items[:10]  # 返回前10個最相關的項目

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

### 按意圖搜尋

按意圖搜尋係指理解同解析用戶查詢背後嘅目的或目標，從而檢索並生成最相關同最有用嘅資訊。呢種方法唔止係簡單匹配關鍵字，而係著重掌握用戶實際嘅需要同上下文。

#### 按意圖搜尋嘅關鍵概念

1. **理解用戶意圖**：
   - 用戶意圖可分為三大類：資訊型、導向型同交易型。
     - **資訊型意圖**：用戶想獲取某個主題嘅資訊（例如：「巴黎最好嘅博物館係邊啲？」）。
     - **導向型意圖**：用戶想導航到特定網站或頁面（例如：「Louvre Museum 官方網站」）。
     - **交易型意圖**：用戶想進行交易，例如訂機票或購買（例如：「訂去巴黎嘅機票」）。

2. **上下文感知**：
   - 分析用戶查詢嘅上下文有助準確識別佢哋嘅意圖。呢啲包括考慮先前嘅互動、用戶偏好同當前查詢嘅具體細節。

3. **自然語言處理（NLP）**：
   - 使用 NLP 技術去理解同解析用戶提供嘅自然語言查詢。呢啲任務包括實體辨識、情感分析同查詢解析等。

4. **個人化**：
   - 根據用戶歷史、偏好同反饋對搜尋結果進行個人化，可以提升檢索資訊嘅相關性。

#### 實際例子：在旅遊代理中按意圖搜尋

以 Travel Agent 為例，睇下點樣實現按意圖搜尋。

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
       # 將目前查詢與使用者歷史結合以理解上下文
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
       # 資訊性意圖的範例搜尋邏輯
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # 導向意圖的範例搜尋邏輯
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # 交易型意圖的範例搜尋邏輯
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # 個人化的範例邏輯
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # 回傳前10個個人化結果
   ```

5. **範例用法**

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

## 4. 生成程式碼作為工具

程式碼生成代理使用 AI 模型來撰寫並執行程式碼，解決複雜問題並自動化任務。

### 程式碼生成代理

程式碼生成代理使用生成式 AI 模型來撰寫並執行程式碼。這些代理可以透過生成並執行各種程式語言的程式碼來解決複雜問題、自動化任務，並提供有價值的見解。

#### 實際應用

1. **自動化程式碼生成**：為特定任務生成程式碼片段，例如資料分析、網頁爬蟲或機器學習。
2. **以 SQL 作為 RAG**：使用 SQL 查詢從資料庫擷取和操作資料。
3. **問題解決**：創建並執行程式碼以解決特定問題，例如優化演算法或分析資料。

#### 範例：用於資料分析的程式碼生成代理

假設你正在設計一個程式碼生成代理。它的運作方式可能如下：

1. **任務**：分析資料集以識別趨勢和模式。
2. **步驟**：
   - 將資料集載入資料分析工具。
   - 生成 SQL 查詢以過濾和聚合資料。
   - 執行查詢並擷取結果。
   - 使用結果生成視覺化和見解。
3. **所需資源**：可取得的資料集、資料分析工具和 SQL 能力。
4. **經驗**：使用過去的分析結果來提升未來分析的準確性和相關性。

### 範例：用於旅遊代理（Travel Agent）的程式碼生成代理

在此範例中，我們將設計一個程式碼生成代理 Travel Agent，協助使用者規劃旅程，透過生成並執行程式碼來處理任務。此代理可以處理例如擷取旅遊選項、過濾結果並使用生成式 AI 編排行程等任務。

#### 程式碼生成代理概述

1. **收集用戶偏好**：收集使用者輸入，例如目的地、旅遊日期、預算和興趣。
2. **生成擷取資料的程式碼**：生成程式碼片段以擷取航班、飯店和景點的資料。
3. **執行所生成的程式碼**：執行生成的程式碼以擷取即時資訊。
4. **生成行程**：將擷取到的資料整理成個人化旅遊計畫。
5. **根據反饋調整**：接收使用者反饋，必要時重新生成程式碼以優化結果。

#### 逐步實作

1. **收集用戶偏好**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **生成擷取資料的程式碼**

   ```python
   def generate_code_to_fetch_data(preferences):
       # 範例：產生根據使用者偏好搜尋航班的程式碼
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # 範例：產生搜尋酒店的程式碼
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **執行所生成的程式碼**

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
   
   # 使用更新後的偏好設定重新生成並執行程式碼
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### 利用環境覺察與推理

根據資料表結構（schema）確實可以透過利用環境覺察與推理來增強查詢生成流程。

以下示範如何實作：

1. **了解結構**：系統將了解資料表的結構，並使用該資訊來使查詢生成更具依據。
2. **根據反饋調整**：系統會根據反饋調整使用者偏好，並推理出結構中哪些欄位需要更新。
3. **生成並執行查詢**：系統會生成並執行查詢，以根據新的偏好擷取更新的航班和飯店資料。

這裡有一個更新的 Python 程式碼範例，將這些概念納入：

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # 根據用戶反饋調整偏好
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # 基於 schema 的推理以調整其他相關偏好
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # 根據 schema 與用戶反饋的自訂邏輯來調整偏好
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # 生成程式碼以根據更新後的偏好擷取航班資料
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # 生成程式碼以根據更新後的偏好擷取酒店資料
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # 模擬執行程式碼並回傳模擬資料
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # 根據航班、酒店和景點生成行程
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# 範例 schema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# 範例用法
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# 使用更新後的偏好重新生成並執行程式碼
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### 解釋 — 根據反饋的預訂

1. **Schema 覺察**：`schema` dictionary 定義了應如何根據反饋調整偏好。它包含像是 `favorites` 與 `avoid` 等欄位，以及對應的調整方式。
2. **調整偏好（`adjust_based_on_feedback` method）**：此方法根據使用者反饋與 `schema` 調整偏好。
3. **基於環境的調整（`adjust_based_on_environment` method）**：此方法會根據 `schema` 與反饋自訂調整內容。
4. **生成並執行查詢**：系統會生成程式碼以擷取根據調整後偏好更新的航班與飯店資料，並模擬執行這些查詢。
5. **生成行程**：系統會根據新的航班、飯店與景點資料建立更新的行程。

透過讓系統具備環境覺察並基於結構進行推理，它能生成更準確且更相關的查詢，進而提供更好的旅遊建議與更個人化的使用者體驗。

### 將 SQL 作為檢索增強生成（RAG）技術

SQL（結構化查詢語言）是與資料庫互動的強大工具。當它作為檢索增強生成（Retrieval-Augmented Generation，RAG）方法的一部分使用時，SQL 可以從資料庫中擷取相關資料來為 AI 代理的回應或動作提供資訊。讓我們探討在 Travel Agent 的情境中，如何將 SQL 用作 RAG 技術。

#### 關鍵概念

1. **資料庫互動**：
   - 使用 SQL 查詢資料庫、擷取相關資訊並操作資料。
   - 範例：從旅遊資料庫擷取航班細節、飯店資訊和景點資料。

2. **與 RAG 的整合**：
   - SQL 查詢根據使用者輸入與偏好生成。
   - 擷取到的資料再用來生成個人化建議或動作。

3. **動態查詢生成**：
   - AI 代理根據情境與使用者需求生成動態的 SQL 查詢。
   - 範例：根據預算、日期與興趣自訂化 SQL 查詢以過濾結果。

#### 應用

- **自動化程式碼生成**：為特定任務生成程式碼片段。
- **以 SQL 作為 RAG**：使用 SQL 查詢來操作資料。
- **問題解決**：創建並執行程式碼以解決問題。

**範例**：
一個資料分析代理：

1. **任務**：分析資料集以發現趨勢。
2. **步驟**：
   - 載入資料集。
   - 生成 SQL 查詢以過濾資料。
   - 執行查詢並擷取結果。
   - 生成視覺化和見解。
3. **資源**：資料集存取、SQL 能力。
4. **經驗**：利用過去結果改進未來分析。

#### 實際範例：在旅行代理中使用 SQL

1. **收集用戶偏好**

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

透過將 SQL 作為檢索增強生成（RAG）技術的一部分，像 Travel Agent 這樣的 AI 代理可以動態擷取並利用相關資料，以提供準確且個人化的建議。

### 元認知示例

為了示範元認知的實作，讓我們建立一個簡單的代理，在解決問題時 *反思其決策過程*。在此範例中，我們將構建一個系統，該代理嘗試優化飯店選擇，然後在發現錯誤或次優選擇時評估自身的推理並調整策略。

我們會用一個基本範例來模擬：代理會根據價格與品質的組合選擇飯店，然後它會「反思」其決策並作出調整。

#### 這如何說明元認知：

1. **初始決策**：代理會選擇最便宜的飯店，未考慮品質的影響。
2. **反思與評估**：在初次選擇後，代理會使用使用者反饋檢查飯店是否為「不良」選擇。若發現飯店品質過低，代理會反思其推理。
3. **調整策略**：代理根據反思調整策略，從「最便宜」轉為「最高品質」，從而在未來迭代中改進決策過程。

下面是一個範例：

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # 儲存先前選擇的酒店
        self.corrected_choices = []  # 儲存修正後的選擇
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
        # 假設我們有一些用戶反饋，告訴我們上一次的選擇是否令人滿意
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # 如果之前的選擇不令人滿意，調整策略
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

# 模擬一個酒店列表（價格與品質）
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# 建立一個代理人
agent = HotelRecommendationAgent()

# 步驟 1：代理人使用「最便宜」策略推薦酒店
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# 步驟 2：代理人反思該選擇，並在必要時調整策略
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# 步驟 3：代理人再次推薦，這次使用已調整的策略
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### 代理的元認知能力

重點在於代理能夠：
- 評估其先前的選擇與決策過程。
- 根據該反思調整其策略，也就是元認知的實際運作。

這是一種簡單形式的元認知，系統能夠根據內部反饋調整其推理過程。

### 結論

元認知是一個強大的工具，可以顯著提升 AI 代理的能力。透過納入元認知流程，你可以設計出更智慧、適應性更強且更有效率的代理。使用額外資源進一步探索在 AI 代理中實作元認知的精彩世界。

### 對元認知設計模式有更多問題嗎？

加入 [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)，與其他學習者交流、參加辦公時間並讓你的 AI 代理問題得到解答。

## 上一課

[多代理設計模式](../08-multi-agent/README.md)

## 下一課

[生產環境的 AI 代理](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
免責聲明：
本文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們會盡力確保準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始語言的文件應視為具權威性的版本。若牽涉重要資訊，建議採用專業人工翻譯。我們不對因使用此翻譯而產生的任何誤解或曲解承擔任何責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->