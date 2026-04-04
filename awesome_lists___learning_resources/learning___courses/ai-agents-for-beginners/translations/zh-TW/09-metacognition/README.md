[![多代理設計](../../../translated_images/zh-TW/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(點擊上方圖片觀看本課程影片)_
# AI 代理中的後設認知

## 介紹

歡迎來到AI代理後設認知課程！本章節專為好奇AI代理如何思考自身思考過程的初學者設計。完成本課後，您將理解核心概念，並具備實際範例，將後設認知應用於AI代理設計中。

## 學習目標

完成本課後，您將能夠：

1. 理解代理定義中推理迴圈的意涵。
2. 使用規劃與評估技術協助自我修正代理。
3. 建立能操作程式碼以完成任務的自製代理。

## 後設認知介紹

後設認知指涉涉及思考自身思考的高階認知過程。對AI代理而言，這表示能夠根據自我覺察和過去經驗評估與調整行動。後設認知，或稱「思考思考」，是代理AI系統開發中的重要概念。它使AI系統意識自身內部流程，並能監控、調節與適應其行為。就像我們在察言觀色或分析問題時所做的自我覺察一樣。這種自覺能協助AI系統做出更佳決策、識別錯誤，並隨著時間提升表現—也再次連結到圖靈測試以及AI是否會接管的爭論。

在代理AI系統的脈絡中，後設認知有助於面對多項挑戰，例如：
- 透明性：確保AI系統能解釋其推理與決策。
- 推理：增強AI系統綜合資訊並做出合理決策的能力。
- 適應性：允許AI系統調整以應對新環境與變化條件。
- 知覺：提升AI系統辨識與解讀環境數據的準確性。

### 什麼是後設認知？

後設認知，或稱「思考思考」，是一種高階認知過程，包含自我覺察及自我調節認知流程。在AI領域中，後設認知使代理能評估並調整策略與行動，提升問題解決與決策能力。理解後設認知，即能設計出不僅更聰明，且更適應且高效的AI代理。真正的後設認知中，您會看到AI明確推理其自身的推理過程。

範例：「我優先考慮較廉價的航班，因為… 但可能錯過直飛，讓我再確認一次。」  
追蹤其選擇某路線的理由或方式。  
- 注意曾因過度依賴上次用戶偏好而犯錯，於是修正決策策略而非僅更改最終建議。  
- 診斷模式，例如「每當我看到用戶提‘太擁擠’時，我不只刪除某些景點，也反思若總依人氣排序‘熱門景點’的選法有缺陷。」

### 後設認知於AI代理的重要性

後設認知在AI代理設計中扮演關鍵角色，理由包括：

![後設認知的重要性](../../../translated_images/zh-TW/importance-of-metacognition.b381afe9aae352f7.webp)

- 自我反思：代理能評估自身表現並找出改進空間。
- 適應力：代理能根據過往經驗與變化環境調整策略。
- 錯誤修正：代理能自主偵測並更正錯誤，提升結果準確度。
- 資源管理：代理能透過規劃與評估行動，優化時間與運算資源使用。

## AI代理的組成元件

深入後設認知流程前，理解AI代理的基本組成元件相當重要。一般AI代理包含：

- 個性（Persona）：代理的個性與特質，決定其與使用者的互動方式。
- 工具（Tools）：代理能執行的功能與能力。
- 技能（Skills）：代理擁有的知識與專長。

這些元件攜手打造一個能執行特定任務的「專業單元」。

**範例**：  
設想一個旅行代理，不僅規劃假期，還能根據即時資料與過去顧客旅程經驗調整路線。

### 範例：旅行代理服務中的後設認知

想像您在設計一個由AI驅動的旅行代理服務。此代理「旅行顧問」協助用戶規劃假期。為納入後設認知，旅行顧問須根據自我覺察與過往經驗評估與調整行動。後設認知的作用如下：

#### 當前任務

協助用戶規劃巴黎之旅。

#### 任務完成步驟

1. **收集使用者偏好**：詢問旅行時間、預算、興趣（如博物館、美食、購物）以及特別需求。
2. **檢索資訊**：搜尋符合使用者偏好的航班、住宿、景點與餐廳。
3. **生成建議**：提供個人化行程，包括航班細節、飯店預訂與推薦活動。
4. **根據回饋調整**：詢問使用者意見並做必要調整。

#### 所需資源

- 航班及飯店訂房資料庫存取。
- 巴黎景點與餐廳資訊。
- 先前互動的用戶反饋資料。

#### 經驗與自我反思

旅行顧問利用後設認知來評估表現並學習過去經驗，例如：

1. **分析用戶回饋**：檢視哪些建議受歡迎、哪些不受歡迎，並調整未來建議。
2. **適應力**：若用戶曾提過不喜歡擁擠場所，旅行顧問會避免在尖峰時間推介熱門觀光點。
3. **錯誤修正**：若曾發生過訂錯已額滿飯店，旅行顧問會學會預先更嚴謹地檢查可用性。

#### 開發者實務範例

以下是一個簡化版後設認知整合的旅行顧問程式碼範例：

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # 根據偏好搜尋航班、飯店和景點
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
        # 分析回饋並調整未來推薦
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

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
travel_agent.adjust_based_on_feedback(feedback)
```

#### 為何後設認知重要

- **自我反思**：代理能分析自身表現並找出改進處。
- **適應力**：代理能根據回饋與變化調整策略。
- **錯誤修正**：代理能自主偵測並修正常見錯誤。
- **資源管理**：代理能優化時間和運算資源使用。

透過後設認知，旅行顧問能提供更貼心且準確的旅遊建議，提升整體用戶體驗。

---

## 2. 代理中的規劃

規劃為AI代理行為中的關鍵元件。它涉及列出達成目標的步驟並考量當前狀態、資源及可能障礙。

### 規劃元素

- **當前任務**：明確定義任務。
- **完成任務步驟**：將任務拆解為可管理步驟。
- **所需資源**：辨識必要資源。
- **經驗**：運用過往經驗指導規劃。

**範例**：  
以下為旅行顧問協助用戶有效規劃旅程的步驟：

### 旅行顧問的步驟

1. **收集使用者偏好**  
   - 詢問用戶旅行日期、預算、興趣及特殊需求。  
   - 範例：「你計畫何時出發？」、「你的預算範圍是？」、「假期中喜歡做什麼活動？」

2. **資訊檢索**  
   - 根據用戶偏好搜尋相關旅遊選項。  
   - **航班**：尋找符合預算及日期的航班。  
   - **住宿**：尋找符合位置、價格及設施偏好的飯店或出租物件。  
   - **景點與餐廳**：找出符合興趣的熱門景點、活動與餐飲選項。

3. **生成建議**  
   - 將檢索到的資訊彙整為個人化行程。  
   - 提供航班選項、飯店預訂與特色活動，確保建議符合用戶喜好。

4. **向用戶呈現行程**  
   - 與用戶分享擬訂行程供其審閱。  
   - 範例：「這是您巴黎之旅的建議行程，包括航班細節、飯店預訂及推薦活動和餐廳。告訴我您的想法！」

5. **收集回饋**  
   - 詢問用戶對建議行程的意見。  
   - 範例：「您喜歡這些航班嗎？」、「飯店合您的需求嗎？」、「有沒有想新增或刪除的活動？」

6. **根據回饋調整**  
   - 根據用戶回饋修改行程。  
   - 調整航班、住宿及活動建議，更符合用戶需求。

7. **最終確認**  
   - 向用戶呈現更新後行程供最後確認。  
   - 範例：「我依您的意見調整了行程，請確認是否合適？」

8. **預訂與確認**  
   - 獲得用戶批准後，進行航班、住宿與預先安排活動的預訂。  
   - 將確認資訊發送給用戶。

9. **持續支援**  
   - 旅行全程提供協助，應對任何變更或額外需求。  
   - 範例：「旅途中若需幫助，隨時聯繫我！」

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

# 在預訂請求中的範例用法
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

## 3. 修正型RAG系統

首先，讓我們理解RAG工具與先置情境載入的差異

![RAG vs Context Loading](../../../translated_images/zh-TW/rag-vs-context.9eae588520c00921.webp)

### 檢索增強生成（RAG）

RAG結合檢索系統與生成模型。當有查詢時，檢索系統從外部來源取得相關文件或資料，並用這些資訊增強生成模型的輸入。這有助模型產生更精確且符合語境的回應。

在RAG系統中，代理會從知識庫檢索相關資訊並用以生成適合的回應或行動。

### 修正型RAG方法

修正型RAG方法聚焦於運用RAG技術修正錯誤並提升AI代理的準確度。包含：

1. **提示技術**：使用特定提示引導代理檢索相關資訊。  
2. **工具**：實作演算法與機制，使代理能評估檢索資訊的相關性並產生精確回應。  
3. **評估**：持續評估代理表現並調整以提升準確度與效率。

#### 範例：搜尋代理中的修正型RAG

假設一個搜尋代理從網路取得資訊以回應用戶查詢。修正型RAG方法可能包含：

1. **提示技術**：根據用戶輸入擬定搜尋查詢。  
2. **工具**：運用自然語言處理與機器學習演算法排定與篩選搜尋結果。  
3. **評估**：分析用戶回饋以識別並修正檢索資訊中的錯誤。

### 旅行顧問中的修正型RAG

修正型RAG（檢索增強生成）提升AI的檢索與生成資訊能力，同時修正錯誤。讓我們看看旅行顧問如何利用修正型RAG方法提供更準確且符合需求的旅遊建議。

內容包含：

- **提示技術**：用特定提示引導代理取得相關資訊。  
- **工具**：實作演算法與機制，評估檢索資訊的相關性並產生精確回應。  
- **評估**：持續評估並調整代理表現以提升準確度與效率。

#### 旅行顧問實施修正型RAG步驟

1. **初始用戶互動**  
   - 旅行顧問收集用戶初始偏好，如目的地、旅行日期、預算與興趣。  
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
   - 旅行顧問根據用戶偏好取得航班、住宿、景點和餐廳資訊。  
   - 範例：

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **產生初步建議**  
   - 旅行顧問利用檢索資訊生成個人化行程。  
   - 範例：

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **蒐集用戶回饋**  
   - 旅行顧問請用戶針對初步建議給予意見。  
   - 範例：

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **修正型RAG流程**  
   - **提示技術**：旅行顧問依據用戶回饋擬定新搜尋查詢。  
     - 範例：

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **工具**：旅行顧問運用演算法排序及篩選新搜尋結果，強調與用戶回饋的相關性。  
     - 範例：

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **評估**：旅行顧問持續分析用戶回饋，評估建議準確並作必要調整。  
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

以下為結合修正型RAG方法的旅行顧問Python簡化範例：

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

### 先置情境載入
預先載入上下文涉及在處理查詢之前，將相關的上下文或背景資訊加載到模型中。這表示模型從一開始就能存取這些資訊，有助於它生成更有根據的回應，而無需在過程中檢索額外資料。

以下是一個簡化的範例，展示預先載入上下文在 Python 中為旅遊代理應用程式的實作方式：

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
        # 從預先載入的上下文中取得目的地資訊
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# 範例用法
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### 說明

1. **初始化（`__init__` 方法）**：`TravelAgent` 類別預先載入一個字典，內含關於巴黎、東京、紐約和雪梨等熱門旅遊地點的資訊。這個字典包含每個目的地的國家、貨幣、語言及主要景點等細節。

2. **取得旅遊資訊（`get_destination_info` 方法）**：當使用者查詢特定目的地時，`get_destination_info` 方法會從預先載入的上下文字典中取得相關資訊。

透過預先載入上下文，旅遊代理應用可以快速回應使用者查詢，而無需在即時情況下額外從外部來源取得資訊。這使得應用程式更高效且反應更靈敏。

### 在迭代前設定目標以啟動計畫

以目標啟動計畫是指從一開始就設定明確的目標或預期結果。透過事先定義這個目標，模型可將其作為引導原則，貫穿整個迭代過程。這有助確保每次迭代都朝向達成期望結果的方向前進，使過程更有效率、聚焦。

以下是一個範例，說明如何在旅遊代理用 Python 程式碼中，以設定目標啟動旅遊計畫後，再進行迭代：

### 情境

一名旅遊代理想為客戶規劃一趟客製化假期。目標是根據客戶偏好與預算，建立一個能最大化客戶滿意度的旅遊行程。

### 步驟

1. 定義客戶的偏好及預算。
2. 根據這些偏好啟動初步計畫。
3. 迭代修正計畫，優化客戶滿意度。

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

#### 程式碼說明

1. **初始化（`__init__` 方法）**：`TravelAgent` 類別以潛在旅遊目的地的清單初始化，每個目的地有名稱、花費及活動類型等屬性。

2. **啟動計畫（`bootstrap_plan` 方法）**：此方法根據客戶偏好與預算建立初步旅遊計畫。它會遍歷目的地列表，若目的地符合客戶偏好且在預算內，則加入計畫中。

3. **匹配偏好（`match_preferences` 方法）**：檢查目的地是否符合客戶的偏好。

4. **計畫迭代（`iterate_plan` 方法）**：此方法透過嘗試以更合適的目的地替換計畫中的每個目的地來優化計畫，並考量客戶偏好和預算限制。

5. **計算花費（`calculate_cost` 方法）**：計算目前計畫的總花費，包括加入新目的地的情況。

#### 範例使用

- **初步計畫**：旅遊代理根據客戶喜好觀光和 2000 美元預算建立初步計畫。
- **修正後計畫**：旅遊代理迭代計畫，優化客戶偏好和預算。

透過以明確目標（例如最大化客戶滿意度）啟動計畫，並繼續迭代修正，旅遊代理能為客戶打造客製化且最佳化的旅遊行程。此方法確保行程從一開始即符合客戶偏好及預算，並隨著每次迭代持續改善。

### 利用大型語言模型（LLM）進行重排與評分

大型語言模型（LLM）可用於重排與評分，方法是評估檢索到的文件或生成的回應的相關性與品質。流程如下：

**檢索：** 初始檢索階段根據查詢抓取一組候選文件或回應。

**重排：** LLM 評估這些候選項，依據其相關性與品質進行重排。此步驟保證最相關且高品質的資訊優先呈現。

**評分：** LLM 為每個候選項賦予分數，反映其相關性和品質。有助選出對使用者最佳的回應或文件。

透過利用 LLM 進行重排與評分，系統能提供更準確且符合語境的資訊，提升整體用戶體驗。

以下示範旅遊代理如何使用大型語言模型（LLM）依據使用者偏好，對旅遊目的地進行重排與評分的 Python 範例：

#### 情境 - 依偏好旅遊

旅遊代理希望根據客戶偏好，推薦最佳旅遊目的地。LLM 將協助重排並評分目的地，確保呈現最相關選項。

#### 步驟：

1. 收集用戶偏好。
2. 擷取潛在旅遊目的地清單。
3. 利用 LLM 依用戶偏好重排與評分目的地。

以下示範如何更新先前範例，使用 Azure OpenAI 服務：

#### 前置條件

1. 需要擁有 Azure 訂閱。
2. 創建 Azure OpenAI 資源並取得 API 金鑰。

#### Python 範例程式碼

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # 產生 Azure OpenAI 的提示語
        prompt = self.generate_prompt(preferences)
        
        # 定義請求的標頭和有效載荷
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # 呼叫 Azure OpenAI API 以取得重新排名和評分的目的地
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # 擷取並回傳推薦結果
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

#### 程式碼說明 - 偏好預訂

1. **初始化**：`TravelAgent` 類別以潛在旅遊目的地清單初始化，每個目的地具有名稱和描述等屬性。

2. **取得推薦（`get_recommendations` 方法）**：此方法根據使用者偏好產生 Azure OpenAI 服務的提示詞，並向 Azure OpenAI API 發送 HTTP POST 請求，取得重排與評分後的目的地清單。

3. **產生提示詞（`generate_prompt` 方法）**：構造傳給 Azure OpenAI 的提示詞，包含使用者偏好和目的地列表。該提示詞指導模型依據提供的偏好重排並評分目的地。

4. **API 呼叫**：使用 `requests` 函式庫向 Azure OpenAI API 端點發起 HTTP POST 請求。回應中包含重排及評分後的目的地。

5. **範例使用**：旅遊代理收集使用者偏好（例如喜歡觀光和多元文化），並利用 Azure OpenAI 服務獲取重排與評分過的旅遊目的地推薦。

請務必將 `your_azure_openai_api_key` 換成真實的 Azure OpenAI API 金鑰，`https://your-endpoint.com/...` 替換為實際 Azure OpenAI 部署的端點 URL。

透過 LLM 的重排與評分，旅遊代理能提供更個人化且符合需求的旅遊推薦，提升整體服務體驗。

### RAG：提示技術與工具

檢索增強生成（Retrieval-Augmented Generation，RAG）既可視為一種提示技術，也可視為工具，用於 AI 代理開發。理解兩者差異，有助您更有效利用 RAG。

#### RAG 作為提示技術

**定義**

- 作為提示技術時，RAG 包含制定特定查詢或提示，以引導從大型資料庫或語料中檢索相關資訊，並用以生成回應或執行操作。

**流程**

1. **制定提示**：根據任務或用戶輸入，創造結構良好的提示或查詢。
2. **檢索資訊**：用提示搜尋預先存在的知識庫或資料集，取得相關資料。
3. **生成回應**：將檢索到的資訊與生成式 AI 模型結合，產出完整且連貫的回答。

**旅遊代理範例**：

- 使用者輸入：「我想參觀巴黎的博物館。」
- 提示詞：「找出巴黎的頂級博物館。」
- 檢索資訊：羅浮宮、奧塞美術館等資訊。
- 生成回應：「巴黎的熱門博物館包括羅浮宮、奧塞美術館和龐畢度中心。」

#### RAG 作為工具

**定義**

- 作為工具，RAG 是一套整合系統，自動化檢索與生成流程，讓開發者無需為每個查詢手動製作提示，即可實作複雜 AI 功能。

**流程**

1. **整合**：將 RAG 嵌入 AI 代理架構，自動處理檢索與生成任務。
2. **自動化**：系統自動接收用戶輸入，產出最終回應，無須每步驟人工提示。
3. **效率**：簡化流程，提升代理效能，提供更快速且準確的回答。

**旅遊代理範例**：

- 使用者輸入：「我想參觀巴黎的博物館。」
- RAG 工具：自動檢索博物館資訊並產生回應。
- 生成回應：「巴黎的熱門博物館包括羅浮宮、奧塞美術館和龐畢度中心。」

### 比較

| 項目                   | 提示技術                                                  | 工具                                                    |
|------------------------|---------------------------------------------------------|-------------------------------------------------------|
| **手動與自動**          | 需為每個查詢手動制定提示詞。                              | 全自動化檢索與生成流程。                               |
| **控制力**              | 對檢索流程有較高控制權。                                  | 簡化並自動化檢索生成過程。                             |
| **彈性**                | 可根據特定需求自訂提示詞。                                | 適合大規模實作，更具效率。                             |
| **複雜度**              | 需要撰寫及調整提示詞。                                    | 易於整合於 AI 代理架構中。                             |

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

評估相關性是 AI 代理性能的重要面向，確保代理檢索及產出的資訊對使用者是適當、正確且有用的。以下探討如何評估 AI 代理的相關性，包含實務範例與技巧。

#### 評估相關性的關鍵概念

1. **上下文意識**：
   - 代理必須理解使用者查詢的上下文，才能檢索並生成相關資訊。
   - 範例：若用戶要求「巴黎最好餐廳」，代理需考慮用戶偏好，如料理種類及預算。

2. **正確性**：
   - 代理提供的資訊應該要事實正確且最新。
   - 範例：推薦目前營業、評價良好的餐廳，而非過時或已歇業選項。

3. **使用者意圖**：
   - 代理需推斷用戶查詢背後的意圖，提供最貼近需求的資訊。
   - 範例：若用戶問「經濟型飯店」，代理應優先提供價格合理住宿。

4. **回饋循環**：
   - 持續收集並分析用戶回饋，有助代理優化其相關性評估流程。
   - 範例：納入用戶對先前推薦的評分與回饋，以改善未來回應。

#### 評估相關性的實務技巧

1. **相關性打分**：
   - 依據項目與用戶查詢和偏好的匹配程度，為每個檢索項目分配相關性分數。
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

2. **過濾與排序**：
   - 過濾掉不相關項目，依相關性分數對剩餘項目排序。
   - 範例：

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # 返回前 10 個相關項目
     ```

3. **自然語言處理（NLP）**：
   - 利用 NLP 技術理解使用者查詢，檢索相關資訊。
   - 範例：

     ```python
     def process_query(query):
         # 使用自然語言處理從使用者的查詢中提取關鍵資訊
         processed_query = nlp(query)
         return processed_query
     ```

4. **使用者回饋整合**：
   - 收集用戶對推薦的回饋，調整未來的相關性評估。
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

#### 範例：在旅遊代理中評估相關性

以下為旅遊代理評估旅遊建議相關性的實務範例：

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
        return ranked_items[:10]  # 回傳前10個相關項目

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
updated_items = travel_agent.adjust_based_on_feedback(feedback, itinerary['hotels'])
print("Updated Itinerary with Feedback:", updated_items)
```

### 帶著意圖的搜尋

帶著意圖的搜尋涉及理解並解讀使用者查詢背後的目的或目標，以檢索並生成最相關且有用的資訊。此方法超越單純字詞匹配，著重於捕捉使用者的真實需求與上下文。

#### 帶著意圖的搜尋關鍵概念

1. **理解使用者意圖**：
   - 使用者意圖可分為三大類：資訊型、導航型及交易型。
     - **資訊型意圖**：使用者尋求特定主題資訊（如「巴黎最好的博物館是哪些？」）。
     - **導航型意圖**：使用者想前往特定網站或頁面（如「羅浮宮官方網站」）。
     - **交易型意圖**：使用者欲執行交易，如訂票或購物（如「訂購飛往巴黎的機票」）。

2. **上下文意識**：
   - 分析使用者查詢上下文，有助準確判斷意圖。包含先前互動、偏好及當前查詢詳細資訊。

3. **自然語言處理（NLP）**：
   - 利用 NLP 技術理解並詮釋自然語言查詢，包含實體辨識、情感分析與查詢拆解。

4. **個人化**：
   - 根據使用者歷史、偏好與回饋，個人化搜尋結果，提高相關性。

#### 實務範例：旅遊代理中帶著意圖的搜尋

以旅遊代理為例，說明如何實作帶著意圖的搜尋。

1. **收集使用者偏好**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **理解使用者意圖**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **上下文意識**
   ```python
   def analyze_context(query, user_history):
       # 將當前查詢與使用者歷史結合以理解上下文
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **搜尋並個人化結果**

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
       return personalized[:10]  # 回傳前 10 個個人化結果
   ```

5. **使用範例**

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

## 4. 以工具方式生成程式碼

程式碼生成代理使用 AI 模型撰寫並執行程式碼，以解決複雜問題並自動化任務。

### 程式碼生成代理

程式碼生成代理使用生成式 AI 模型來撰寫並執行程式碼。這些代理可以透過生成並運行各種程式語言的程式碼，解決複雜問題、自動化任務並提供有價值的見解。

#### 實務應用

1. **自動化程式碼生成**：為特定任務生成程式碼片段，例如資料分析、網頁爬取或機器學習。
2. **SQL 作為 RAG**：使用 SQL 查詢從資料庫擷取並操作資料。
3. **問題解決**：撰寫並執行程式碼以解決特定問題，例如優化演算法或分析資料。

#### 範例：用於資料分析的程式碼生成代理

假設你正在設計一個程式碼生成代理。它的工作流程如下：

1. **任務**：分析資料集以識別趨勢和模式。
2. **步驟**：
   - 將資料集載入資料分析工具。
   - 生成 SQL 查詢以過濾和彙總資料。
   - 執行查詢並擷取結果。
   - 使用結果生成視覺化和見解。
3. **所需資源**：存取資料集、資料分析工具和 SQL 功能。
4. **經驗**：利用過去的分析結果提升未來分析的準確性及相關性。

### 範例：用於旅行規劃的程式碼生成代理

在此示範中，我們將設計一個程式碼生成代理「旅行代理」，協助使用者規劃旅行，透過生成並執行程式碼處理任務，如擷取旅行選項、過濾結果及編輯行程，運用生成式 AI 技術。

#### 程式碼生成代理概覽

1. **收集使用者偏好**：蒐集目的地、旅行日期、預算及興趣等使用者輸入。
2. **生成擷取資料的程式碼**：產生程式碼片段，取得航班、飯店及景點的相關資訊。
3. **執行生成程式碼**：執行程式碼以獲取即時資訊。
4. **生成行程**：將擷取的資料整合成個人化旅行計畫。
5. **根據回饋調整**：接收使用者回饋，必要時重新生成程式碼以優化結果。

#### 逐步實作

1. **收集使用者偏好**

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
       # 範例：根據使用者偏好生成搜索航班的程式碼
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # 範例：生成搜索飯店的程式碼
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **執行生成程式碼**

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

5. **根據回饋調整**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # 根據使用者反饋調整偏好設定
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # 重新產生並執行具有更新偏好設定的程式碼
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### 利用環境感知與推理能力

基於表格結構 (schema) 的了解，確實能提升查詢生成過程，藉由環境感知與推理來進行。

以下示範如何執行：

1. **理解結構**：系統會理解資料表結構 (schema)，並用此資訊來定位查詢生成。
2. **根據回饋調整**：系統根據回饋調整使用者偏好，並推理出應該更新結構中哪些欄位。
3. **生成並執行查詢**：系統會基於新的偏好設定生成並執行查詢，擷取更新後的航班和飯店資料。

下面是一個結合這些概念的 Python 範例：

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # 根據用戶反饋調整偏好設定
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # 根據架構推理調整其他相關偏好設定
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # 根據架構和反饋自訂邏輯調整偏好設定
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # 生成根據更新後偏好設定取得航班資料的程式碼
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # 生成根據更新後偏好設定取得飯店資料的程式碼
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # 模擬程式碼執行並返回模擬資料
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # 根據航班、飯店與景點生成行程
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# 範例架構
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# 範例使用說明
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# 使用更新後偏好設定重新生成並執行程式碼
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### 說明 - 基於回饋的訂位

1. **結構意識**：`schema` 字典定義了如何根據回饋調整偏好，包含像 `favorites` 與 `avoid` 等欄位及對應的調整方式。
2. **調整偏好（`adjust_based_on_feedback` 方法）**：此方法會根據使用者回饋和結構調整偏好。
3. **基於環境的調整（`adjust_based_on_environment` 方法）**：此方法依據結構及回饋定制調整流程。
4. **生成並執行查詢**：系統針對調整後的偏好生成程式碼以擷取更新的航班和飯店資料，並模擬執行這些查詢。
5. **生成行程**：系統根據新的航班、飯店與景點資料製作更新後的行程。

透過使系統具環境感知能力並基於結構推理，可生成更精確且相關的查詢，提供更佳的旅行推薦與更個人化的使用者體驗。

### 使用 SQL 作為檢索輔助生成 (RAG) 技術

SQL（結構化查詢語言）是與資料庫互動的強大工具。在檢索輔助生成（RAG）方法中，SQL 可用來從資料庫擷取相關資料，輔助 AI 代理生成回應或執行操作。以下介紹 SQL 怎样作為 RAG 技術在旅行代理中的應用。

#### 主要概念

1. **資料庫互動**：
   - SQL 用於查詢資料庫，取得相關資訊並操作資料。
   - 範例：擷取航班細節、飯店資料及景點資訊。

2. **與 RAG 整合**：
   - 根據使用者輸入與偏好生成 SQL 查詢。
   - 擷取到的資料用來生成個人化推薦或操作。

3. **動態查詢生成**：
   - AI 代理根據上下文與需求生成動態 SQL 查詢。
   - 例如：依預算、日期及興趣自訂 SQL 過濾條件。

#### 應用

- **自動化程式碼生成**：產生特定任務的程式碼片段。
- **SQL 作為 RAG**：使用 SQL 查詢操控資料。
- **問題解決**：撰寫並執行程式碼解決問題。

**範例**：
資料分析代理：

1. **任務**：分析資料集尋找趨勢。
2. **步驟**：
   - 載入資料集。
   - 生成 SQL 查詢以過濾資料。
   - 執行查詢並取得結果。
   - 產生視覺化與見解。
3. **資源**：資料集存取權限、SQL 功能。
4. **經驗**：利用過去結果提升未來分析。

#### 實務範例：在旅行代理中使用 SQL

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

4. **生成推薦**

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

透過將 SQL 作為檢索輔助生成 (RAG) 技術一部分，像旅行代理這樣的 AI 代理可以動態擷取並加以利用相關資料，提供精準且個人化的推薦。

### 元認知 (Metacognition) 範例

為展示元認知的實作，讓我們創建一個簡單的代理，在解決問題時*反思其決策過程*。在此案例中，我們建立一個系統，代理會試圖優化飯店選擇，並在出現錯誤或次佳選擇時自行評估並調整策略。

我們將以簡單範例模擬：代理基於價格與品質組合選擇飯店，但會「反思」其決策，並適時調整。

#### 如何說明元認知：

1. **初始決策**：代理選擇最便宜的飯店，尚未考慮品質影響。
2. **反思與評估**：初步選擇後，代理根據使用者回饋判斷該飯店是否為「不良」選擇。如品質太低，則反思其決策。
3. **調整策略**：代理根據反思調整策略，從「最便宜」轉為「最高品質」，進而優化未來的決策。

範例如下：

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # 儲存先前選擇的飯店
        self.corrected_choices = []  # 儲存更正後的選擇
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # 可用的策略

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
        # 假設我們有一些使用者回饋，告訴我們最後的選擇是否良好
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # 如果先前的選擇不令人滿意，調整策略
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

# 模擬一個飯店清單（價格和品質）
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# 創建一個代理人
agent = HotelRecommendationAgent()

# 步驟1：代理人使用「最便宜」策略推薦飯店
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# 步驟2：代理人反思選擇，並在必要時調整策略
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# 步驟3：代理人再次推薦，這次使用調整後的策略
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### 代理的元認知能力

關鍵在於代理能夠：
- 評估先前的選擇與決策過程。
- 根據評估結果調整策略，即實現元認知。

這是元認知的簡易形式，系統能基於內部反饋調整其推理過程。

### 結論

元認知是強大的工具，可顯著提升 AI 代理的能力。透過整合元認知流程，你可以設計更智慧、靈活且高效的代理。請利用附加資源深入探索 AI 代理中的元認知奧妙。

### 對元認知設計模式有更多問題？

加入 [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)，與其他學習者交流，參與辦公時間，並獲得 AI 代理相關問題的解答。

## 先前課程

[多智能體設計模式](../08-multi-agent/README.md)

## 下一課程

[生產環境中的 AI 代理](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們盡力確保準確性，請注意自動翻譯可能包含錯誤或不準確之處。原始文件以其母語版本為權威依據。對於重要資訊，建議採用專業人工翻譯。我們不對使用本翻譯所產生之任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->