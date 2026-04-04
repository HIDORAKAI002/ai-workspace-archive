[![Multi-Agent Design](../../../translated_images/vi/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Nhấp vào hình ảnh trên để xem video bài học này)_
# Siêu nhận thức trong các tác nhân AI

## Giới thiệu

Chào mừng bạn đến với bài học về siêu nhận thức trong các tác nhân AI! Chương này được thiết kế dành cho người mới bắt đầu, những ai tò mò về cách các tác nhân AI có thể suy nghĩ về quá trình suy nghĩ của chính mình. Vào cuối bài học này, bạn sẽ hiểu các khái niệm chính và được trang bị các ví dụ thực tiễn để áp dụng siêu nhận thức trong thiết kế tác nhân AI.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

1. Hiểu về những hệ quả của các vòng lặp suy luận trong định nghĩa tác nhân.
2. Sử dụng kỹ thuật lập kế hoạch và đánh giá để giúp các tác nhân tự điều chỉnh.
3. Tạo ra các tác nhân của riêng bạn có khả năng thao tác mã để hoàn thành nhiệm vụ.

## Giới thiệu về Siêu nhận thức

Siêu nhận thức đề cập đến các quá trình nhận thức bậc cao liên quan đến việc suy nghĩ về chính suy nghĩ của một người. Đối với các tác nhân AI, điều này có nghĩa là có thể đánh giá và điều chỉnh hành động của họ dựa trên ý thức về bản thân và kinh nghiệm trong quá khứ. Siêu nhận thức, hay "suy nghĩ về suy nghĩ," là một khái niệm quan trọng trong phát triển các hệ thống AI có tính tác nhân. Nó liên quan đến việc các hệ thống AI nhận thức được các quá trình nội bộ của chính họ và có thể giám sát, điều phối, và thích nghi hành vi của mình tương ứng. Giống như cách chúng ta hiểu tình huống hoặc xem xét một vấn đề. Ý thức về bản thân này có thể giúp các hệ thống AI đưa ra quyết định tốt hơn, nhận diện sai sót và cải thiện hiệu suất theo thời gian - một lần nữa liên quan trở lại với bài kiểm tra Turing và cuộc tranh luận về việc liệu AI có sẽ chiếm lĩnh thế giới hay không.

Trong bối cảnh các hệ thống AI có tính tác nhân, siêu nhận thức có thể giúp giải quyết một số thách thức, chẳng hạn như:
- Minh bạch: Đảm bảo rằng các hệ thống AI có thể giải thích được quá trình suy luận và quyết định của mình.
- Suy luận: Nâng cao khả năng tổng hợp thông tin và đưa ra quyết định đúng đắn của các hệ thống AI.
- Thích nghi: Cho phép các hệ thống AI điều chỉnh theo môi trường mới và điều kiện thay đổi.
- Nhận thức: Cải thiện độ chính xác của các hệ thống AI trong việc nhận biết và diễn giải dữ liệu từ môi trường.

### Siêu nhận thức là gì?

Siêu nhận thức, hay "suy nghĩ về suy nghĩ," là một quá trình nhận thức bậc cao bao gồm ý thức và tự điều chỉnh các quá trình nhận thức của bản thân. Trong lĩnh vực AI, siêu nhận thức giúp các tác nhân đánh giá và thích nghi các chiến lược, hành động của mình, dẫn đến khả năng giải quyết vấn đề và đưa ra quyết định tốt hơn. Bằng cách hiểu siêu nhận thức, bạn có thể thiết kế các tác nhân AI không chỉ thông minh hơn mà còn linh hoạt và hiệu quả hơn. Trong siêu nhận thức thực thụ, bạn sẽ thấy AI suy luận rõ ràng về chính quá trình suy luận của nó.

Ví dụ: "Tôi ưu tiên các chuyến bay giá rẻ vì… Tôi có thể đang bỏ lỡ các chuyến bay trực tiếp, nên hãy kiểm tra lại.".
Theo dõi cách hoặc lý do nó chọn một hành trình cụ thể.
- Ghi nhận rằng nó mắc sai lầm vì quá tin tưởng vào sở thích người dùng lần trước, nên nó điều chỉnh chiến lược ra quyết định chứ không chỉ là khuyến nghị cuối cùng.
- Chẩn đoán các mẫu như: "Mỗi khi tôi thấy người dùng nhắc đến 'quá đông', tôi sẽ không chỉ loại bỏ một số điểm tham quan mà còn phản ánh rằng phương pháp chọn 'điểm hấp dẫn hàng đầu' của tôi có vấn đề nếu tôi luôn xếp hạng theo độ phổ biến."

### Tầm quan trọng của Siêu nhận thức trong các tác nhân AI

Siêu nhận thức đóng một vai trò quan trọng trong thiết kế các tác nhân AI vì nhiều lý do:

![Importance of Metacognition](../../../translated_images/vi/importance-of-metacognition.b381afe9aae352f7.webp)

- Tự phản hồi: Các tác nhân có thể đánh giá hiệu suất của mình và xác định những điểm cần cải thiện.
- Linh hoạt: Các tác nhân có thể điều chỉnh chiến lược căn cứ vào kinh nghiệm quá khứ và môi trường thay đổi.
- Sửa lỗi: Các tác nhân có thể phát hiện và sửa lỗi một cách tự động, dẫn đến kết quả chính xác hơn.
- Quản lý tài nguyên: Các tác nhân có thể tối ưu sử dụng tài nguyên như thời gian và năng lực tính toán thông qua lập kế hoạch và đánh giá hành động.

## Các thành phần của một tác nhân AI

Trước khi đi sâu vào các quá trình siêu nhận thức, cần hiểu các thành phần cơ bản của một tác nhân AI. Một tác nhân AI thường bao gồm:

- Persona: Tính cách và đặc điểm của tác nhân, xác định cách nó tương tác với người dùng.
- Công cụ: Các khả năng và chức năng mà tác nhân có thể thực hiện.
- Kỹ năng: Kiến thức và chuyên môn mà tác nhân sở hữu.

Những thành phần này làm việc cùng nhau để tạo ra một "đơn vị chuyên môn" có thể thực hiện các nhiệm vụ cụ thể.

**Ví dụ**:
Hãy nghĩ đến một đại lý du lịch, dịch vụ tác nhân không chỉ lên kế hoạch kỳ nghỉ mà còn điều chỉnh hành trình dựa trên dữ liệu thời gian thực và trải nghiệm hành trình khách hàng trước đó.

### Ví dụ: Siêu nhận thức trong dịch vụ đại lý du lịch

Hãy tưởng tượng bạn thiết kế một dịch vụ đại lý du lịch được hỗ trợ bởi AI. Tác nhân này, "Travel Agent," hỗ trợ người dùng lập kế hoạch kỳ nghỉ. Để tích hợp siêu nhận thức, Travel Agent cần đánh giá và điều chỉnh hành động dựa trên ý thức về bản thân và kinh nghiệm trước đó. Đây là cách siêu nhận thức có thể đóng vai trò:

#### Nhiệm vụ hiện tại

Nhiệm vụ hiện tại là giúp người dùng lập kế hoạch cho chuyến đi đến Paris.

#### Các bước thực hiện nhiệm vụ

1. **Thu thập sở thích người dùng**: Hỏi về ngày đi, ngân sách, sở thích (ví dụ: bảo tàng, ẩm thực, mua sắm) và các yêu cầu cụ thể khác.
2. **Tìm kiếm thông tin**: Tìm các lựa chọn chuyến bay, chỗ ở, điểm tham quan và nhà hàng phù hợp với sở thích người dùng.
3. **Tạo đề xuất**: Cung cấp lịch trình cá nhân hóa với thông tin chi tiết về chuyến bay, đặt phòng khách sạn và các hoạt động gợi ý.
4. **Điều chỉnh dựa trên phản hồi**: Hỏi người dùng về phản hồi đối với các đề xuất và thực hiện các điều chỉnh cần thiết.

#### Tài nguyên cần thiết

- Truy cập vào cơ sở dữ liệu đặt chuyến bay và khách sạn.
- Thông tin về các điểm tham quan và nhà hàng tại Paris.
- Dữ liệu phản hồi người dùng từ các lần tương tác trước.

#### Kinh nghiệm và Tự phản hồi

Travel Agent sử dụng siêu nhận thức để đánh giá hiệu suất và học hỏi từ kinh nghiệm trước đó. Ví dụ:

1. **Phân tích phản hồi người dùng**: Travel Agent xem lại phản hồi để xác định đề xuất nào được đón nhận tốt và đề xuất nào không phù hợp. Nó sẽ điều chỉnh gợi ý trong tương lai tương ứng.
2. **Khả năng thích nghi**: Nếu người dùng từng nói không thích nơi đông đúc, Travel Agent sẽ tránh gợi ý các điểm du lịch phổ biến vào giờ cao điểm trong tương lai.
3. **Sửa lỗi**: Nếu Travel Agent từng mắc lỗi trong đặt phòng, như đề xuất khách sạn đã kín chỗ, nó học cách kiểm tra kỹ hơn trước khi đề xuất.

#### Ví dụ thực tế cho nhà phát triển

Dưới đây là ví dụ đơn giản về mã Travel Agent khi tích hợp siêu nhận thức:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Tìm kiếm chuyến bay, khách sạn và điểm tham quan dựa trên sở thích
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
        # Phân tích phản hồi và điều chỉnh các đề xuất trong tương lai
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Ví dụ sử dụng
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

#### Tại sao Siêu nhận thức quan trọng

- **Tự phản hồi**: Tác nhân có thể phân tích hiệu suất và xác định điểm cần cải thiện.
- **Linh hoạt**: Tác nhân có thể điều chỉnh chiến lược dựa trên phản hồi và điều kiện thay đổi.
- **Sửa lỗi**: Tác nhân có thể tự động phát hiện và sửa các lỗi.
- **Quản lý tài nguyên**: Tác nhân có thể tối ưu sử dụng tài nguyên như thời gian và năng lực tính toán.

Bằng cách tích hợp siêu nhận thức, Travel Agent có thể cung cấp các đề xuất du lịch cá nhân hóa và chính xác hơn, nâng cao trải nghiệm người dùng tổng thể.

---

## 2. Lập kế hoạch trong các tác nhân

Lập kế hoạch là thành phần quan trọng trong hành vi của tác nhân AI. Nó liên quan đến việc xác định các bước cần thực hiện để đạt được mục tiêu, xem xét trạng thái hiện tại, tài nguyên và những trở ngại có thể có.

### Các yếu tố trong lập kế hoạch

- **Nhiệm vụ hiện tại**: Xác định rõ nhiệm vụ.
- **Các bước hoàn thành nhiệm vụ**: Phân chia nhiệm vụ thành các bước dễ quản lý.
- **Tài nguyên cần thiết**: Xác định các tài nguyên cần dùng.
- **Kinh nghiệm**: Sử dụng kinh nghiệm trước để hỗ trợ lập kế hoạch.

**Ví dụ**:
Dưới đây là các bước Travel Agent cần thực hiện để giúp người dùng lập kế hoạch chuyến đi hiệu quả:

### Các bước cho Travel Agent

1. **Thu thập sở thích người dùng**
   - Hỏi người dùng về ngày đi, ngân sách, sở thích và yêu cầu cụ thể.
   - Ví dụ: "Bạn dự định đi du lịch khi nào?" "Ngân sách của bạn khoảng bao nhiêu?" "Bạn thích hoạt động gì trong kỳ nghỉ?"

2. **Tìm kiếm thông tin**
   - Tìm các lựa chọn du lịch phù hợp dựa trên sở thích người dùng.
   - **Chuyến bay**: Tìm các chuyến bay trong ngân sách và ngày đi được chọn.
   - **Chỗ ở**: Tìm khách sạn hoặc chỗ thuê phù hợp về vị trí, giá cả và tiện nghi.
   - **Điểm tham quan và nhà hàng**: Xác định các điểm tham quan, hoạt động và nhà hàng phù hợp sở thích.

3. **Tạo đề xuất**
   - Tổng hợp thông tin tìm được thành một lịch trình cá nhân hóa.
   - Cung cấp chi tiết chuyến bay, đặt phòng khách sạn và các hoạt động gợi ý, đảm bảo phù hợp với sở thích người dùng.

4. **Trình bày lịch trình cho người dùng**
   - Chia sẻ lịch trình dự kiến để người dùng xem xét.
   - Ví dụ: "Đây là lịch trình gợi ý cho chuyến đi Paris của bạn. Bao gồm chi tiết chuyến bay, đặt phòng khách sạn và danh sách hoạt động, nhà hàng gợi ý. Bạn có ý kiến gì không?"

5. **Thu thập phản hồi**
   - Hỏi người dùng về phản hồi đối với lịch trình đề xuất.
   - Ví dụ: "Bạn thích các lựa chọn chuyến bay không?" "Khách sạn có phù hợp với nhu cầu của bạn không?" "Bạn có muốn thêm hay bớt hoạt động nào không?"

6. **Điều chỉnh dựa trên phản hồi**
   - Thay đổi lịch trình dựa trên phản hồi của người dùng.
   - Thực hiện các điều chỉnh về chuyến bay, chỗ ở và hoạt động để phù hợp hơn với ý thích.

7. **Xác nhận cuối cùng**
   - Trình bày lịch trình cập nhật để người dùng xác nhận.
   - Ví dụ: "Tôi đã điều chỉnh theo ý kiến của bạn. Đây là lịch trình mới. Mọi thứ có ổn không?"

8. **Đặt và xác nhận đặt chỗ**
   - Khi người dùng đồng ý, tiến hành đặt chuyến bay, chỗ ở và các hoạt động.
   - Gửi chi tiết xác nhận cho người dùng.

9. **Hỗ trợ liên tục**
   - Luôn sẵn sàng hỗ trợ người dùng về các thay đổi hoặc yêu cầu thêm trong suốt chuyến đi.
   - Ví dụ: "Nếu bạn cần hỗ trợ thêm trong chuyến đi, cứ liên hệ với tôi bất cứ lúc nào!"

### Ví dụ tương tác

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

# Ví dụ sử dụng trong yêu cầu booing
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

## 3. Hệ thống RAG sửa lỗi

Trước tiên, hãy bắt đầu với việc hiểu sự khác biệt giữa Công cụ RAG và Tải ngữ cảnh dự phòng

![RAG vs Context Loading](../../../translated_images/vi/rag-vs-context.9eae588520c00921.webp)

### Thuật toán Phát sinh tăng cường truy xuất (RAG)

RAG kết hợp một hệ thống truy xuất với một mô hình sinh. Khi có truy vấn, hệ thống truy xuất sẽ lấy các tài liệu hoặc dữ liệu liên quan từ nguồn bên ngoài, và thông tin thu thập này được sử dụng để hỗ trợ đầu vào cho mô hình sinh. Điều này giúp mô hình tạo ra các phản hồi chính xác và phù hợp ngữ cảnh hơn.

Trong hệ thống RAG, tác nhân truy xuất thông tin liên quan từ kho tri thức rồi dùng nó để tạo phản hồi hoặc hành động phù hợp.

### Phương pháp RAG sửa lỗi

Phương pháp RAG sửa lỗi tập trung vào việc sử dụng kỹ thuật RAG để sửa các lỗi và nâng cao độ chính xác của tác nhân AI. Điều này bao gồm:

1. **Kỹ thuật nhắc lệnh**: Sử dụng các nhắc lệnh đặc thù để hướng dẫn tác nhân truy xuất thông tin liên quan.
2. **Công cụ**: Triển khai các thuật toán và cơ chế cho phép tác nhân đánh giá mức độ liên quan của thông tin truy xuất và tạo phản hồi chính xác.
3. **Đánh giá**: Liên tục đánh giá hiệu suất tác nhân và điều chỉnh để cải thiện độ chính xác và hiệu quả.

#### Ví dụ: RAG sửa lỗi trong tác nhân tìm kiếm

Xem xét một tác nhân tìm kiếm lấy thông tin từ web để trả lời câu hỏi người dùng. Phương pháp RAG sửa lỗi có thể bao gồm:

1. **Kỹ thuật nhắc lệnh**: Xây dựng truy vấn tìm kiếm dựa trên đầu vào của người dùng.
2. **Công cụ**: Sử dụng xử lý ngôn ngữ tự nhiên và thuật toán máy học để xếp hạng và lọc kết quả tìm kiếm.
3. **Đánh giá**: Phân tích phản hồi người dùng để phát hiện và sửa các thông tin sai lệch.

### RAG sửa lỗi trong Travel Agent

RAG sửa lỗi (Retrieval-Augmented Generation) nâng cao khả năng truy xuất và tạo thông tin đồng thời sửa các sai lệch. Hãy xem Travel Agent có thể sử dụng phương pháp RAG sửa lỗi để cung cấp đề xuất du lịch chính xác và phù hợp hơn như thế nào.

Điều này bao gồm:

- **Kỹ thuật nhắc lệnh:** Sử dụng các nhắc lệnh cụ thể để hướng dẫn tác nhân truy xuất thông tin liên quan.
- **Công cụ:** Triển khai thuật toán và cơ chế để tác nhân đánh giá mức độ liên quan của thông tin và tạo phản hồi chính xác.
- **Đánh giá:** Liên tục đánh giá hiệu suất tác nhân và điều chỉnh để nâng cao độ chính xác và hiệu quả.

#### Các bước triển khai RAG sửa lỗi trong Travel Agent

1. **Tương tác ban đầu với người dùng**
   - Travel Agent thu thập sở thích ban đầu như điểm đến, ngày đi, ngân sách và sở thích của người dùng.
   - Ví dụ:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Truy xuất thông tin**
   - Travel Agent lấy thông tin về chuyến bay, chỗ ở, điểm tham quan, nhà hàng dựa trên sở thích người dùng.
   - Ví dụ:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Tạo đề xuất ban đầu**
   - Travel Agent sử dụng thông tin truy xuất để tạo lịch trình cá nhân hóa.
   - Ví dụ:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Thu thập phản hồi người dùng**
   - Travel Agent hỏi người dùng về phản hồi đối với đề xuất ban đầu.
   - Ví dụ:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Quy trình RAG sửa lỗi**
   - **Kỹ thuật nhắc lệnh**: Travel Agent xây dựng các truy vấn tìm kiếm mới dựa trên phản hồi.
     - Ví dụ:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Công cụ**: Travel Agent sử dụng thuật toán để xếp hạng và lọc kết quả tìm kiếm mới, nhấn mạnh sự liên quan dựa trên phản hồi người dùng.
     - Ví dụ:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Đánh giá**: Travel Agent liên tục đánh giá mức độ liên quan và chính xác của đề xuất bằng cách phân tích phản hồi và thực hiện điều chỉnh cần thiết.
     - Ví dụ:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Ví dụ thực tiễn

Dưới đây là ví dụ mã Python đơn giản tích hợp phương pháp RAG sửa lỗi trong Travel Agent:

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

# Ví dụ sử dụng
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

### Tải ngữ cảnh dự phòng
Tải Trước Ngữ Cảnh (Pre-emptive Context Load) liên quan đến việc tải trước thông tin ngữ cảnh hoặc thông tin nền liên quan vào mô hình trước khi xử lý truy vấn. Điều này có nghĩa là mô hình có quyền truy cập vào thông tin này ngay từ đầu, giúp nó tạo ra các phản hồi có hiểu biết hơn mà không cần phải truy xuất thêm dữ liệu trong quá trình xử lý.

Dưới đây là một ví dụ đơn giản về cách một tải trước ngữ cảnh có thể trông như thế nào cho ứng dụng đại lý du lịch trong Python:

```python
class TravelAgent:
    def __init__(self):
        # Tải trước các điểm đến phổ biến và thông tin của chúng
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Lấy thông tin điểm đến từ ngữ cảnh đã tải trước
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Ví dụ sử dụng
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Giải thích

1. **Khởi tạo (phương thức `__init__`)**: Lớp `TravelAgent` tiền tải một từ điển chứa thông tin về các điểm đến phổ biến như Paris, Tokyo, New York và Sydney. Từ điển này bao gồm các chi tiết như quốc gia, tiền tệ, ngôn ngữ và các điểm tham quan chính cho mỗi điểm đến.

2. **Truy xuất Thông tin (phương thức `get_destination_info`)**: Khi người dùng hỏi về một điểm đến cụ thể, phương thức `get_destination_info` sẽ lấy thông tin liên quan từ từ điển ngữ cảnh đã được tải trước.

Bằng cách tải trước ngữ cảnh, ứng dụng đại lý du lịch có thể phản hồi nhanh các truy vấn của người dùng mà không cần phải lấy thông tin này từ nguồn bên ngoài trong thời gian thực. Điều này làm cho ứng dụng trở nên hiệu quả và phản hồi nhanh hơn.

### Khởi tạo Kế hoạch với Mục tiêu Trước Khi Lặp

Khởi tạo một kế hoạch với một mục tiêu là bắt đầu với một mục đích rõ ràng hoặc kết quả mong muốn trong đầu. Bằng cách xác định mục tiêu này ngay từ đầu, mô hình có thể sử dụng nó làm nguyên tắc dẫn đường trong suốt quá trình lặp. Điều này giúp đảm bảo mỗi vòng lặp tiến gần hơn đến việc đạt được kết quả mong muốn, làm cho quá trình hiệu quả và tập trung hơn.

Dưới đây là một ví dụ về cách bạn có thể khởi tạo một kế hoạch du lịch với một mục tiêu trước khi lặp cho đại lý du lịch trong Python:

### Kịch bản

Một đại lý du lịch muốn lên kế hoạch nghỉ dưỡng được cá nhân hóa cho khách hàng. Mục tiêu là tạo một lịch trình du lịch tối ưu hóa sự hài lòng của khách dựa trên sở thích và ngân sách của họ.

### Các bước

1. Định nghĩa sở thích và ngân sách của khách.
2. Khởi tạo kế hoạch ban đầu dựa trên các sở thích này.
3. Lặp để tinh chỉnh kế hoạch, tối ưu hóa sự hài lòng của khách.

#### Mã Python

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

# Ví dụ sử dụng
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

#### Giải thích Mã

1. **Khởi tạo (phương thức `__init__`)**: Lớp `TravelAgent` được khởi tạo với danh sách các điểm đến tiềm năng, mỗi điểm đến có các thuộc tính như tên, chi phí và loại hoạt động.

2. **Khởi tạo Kế hoạch (`bootstrap_plan` phương thức)**: Phương thức này tạo ra một kế hoạch du lịch ban đầu dựa trên sở thích và ngân sách của khách. Nó duyệt qua danh sách các điểm đến và thêm chúng vào kế hoạch nếu phù hợp với sở thích của khách và nằm trong ngân sách.

3. **So khớp Sở thích (`match_preferences` phương thức)**: Phương thức này kiểm tra xem một điểm đến có phù hợp với sở thích của khách không.

4. **Lặp Kế hoạch (`iterate_plan` phương thức)**: Phương thức này tinh chỉnh kế hoạch ban đầu bằng cách thử thay thế từng điểm đến trong kế hoạch bằng một điểm đến phù hợp hơn, xét đến sở thích và giới hạn ngân sách của khách.

5. **Tính Toán Chi phí (`calculate_cost` phương thức)**: Phương thức này tính tổng chi phí của kế hoạch hiện tại, bao gồm cả điểm đến mới tiềm năng.

#### Ví dụ Sử dụng

- **Kế hoạch ban đầu**: Đại lý du lịch tạo kế hoạch ban đầu dựa trên sở thích của khách về tham quan và ngân sách 2000 đô la.
- **Kế hoạch được tinh chỉnh**: Đại lý lặp lại kế hoạch, tối ưu hóa dựa trên sở thích và ngân sách của khách.

Bằng cách khởi tạo kế hoạch với một mục tiêu rõ ràng (ví dụ, tối đa hóa sự hài lòng của khách) và lặp để tinh chỉnh kế hoạch, đại lý du lịch có thể tạo ra một lịch trình du lịch được cá nhân hóa và tối ưu cho khách. Cách tiếp cận này đảm bảo kế hoạch du lịch phù hợp với sở thích và ngân sách của khách ngay từ đầu và ngày càng hoàn thiện qua từng vòng lặp.

### Tận dụng Mô hình Ngôn ngữ Lớn (LLM) cho Việc Sắp xếp và Chấm điểm

Các Mô hình Ngôn ngữ Lớn (LLM) có thể được sử dụng cho việc sắp xếp lại và chấm điểm bằng cách đánh giá mức độ liên quan và chất lượng của các tài liệu truy xuất hoặc các phản hồi tạo ra. Dưới đây là cách nó hoạt động:

**Truy xuất:** Bước truy xuất ban đầu lấy một tập hợp các tài liệu hoặc câu trả lời ứng viên dựa trên truy vấn.

**Sắp xếp lại:** LLM đánh giá các ứng viên này và sắp xếp lại chúng dựa trên độ liên quan và chất lượng. Bước này đảm bảo thông tin liên quan và chất lượng nhất được trình bày trước.

**Chấm điểm:** LLM gán điểm số cho mỗi ứng viên, phản ánh mức độ liên quan và chất lượng của chúng. Điều này giúp chọn ra câu trả lời hoặc tài liệu tốt nhất cho người dùng.

Bằng cách tận dụng LLM cho việc sắp xếp lại và chấm điểm, hệ thống có thể cung cấp thông tin chính xác và phù hợp ngữ cảnh hơn, nâng cao trải nghiệm người dùng tổng thể.

Dưới đây là một ví dụ về cách đại lý du lịch có thể sử dụng Mô hình Ngôn ngữ Lớn (LLM) để sắp xếp lại và chấm điểm các điểm đến dựa trên sở thích của người dùng trong Python:

#### Kịch bản - Du lịch dựa trên Sở thích

Một đại lý du lịch muốn đề xuất các điểm đến tốt nhất cho khách dựa trên sở thích của họ. LLM sẽ giúp sắp xếp lại và chấm điểm các điểm đến để đảm bảo các lựa chọn phù hợp nhất được hiện ra.

#### Các bước:

1. Thu thập sở thích người dùng.
2. Truy xuất danh sách các điểm đến tiềm năng.
3. Sử dụng LLM để sắp xếp lại và chấm điểm các điểm đến dựa trên sở thích người dùng.

Dưới đây là cách bạn có thể cập nhật ví dụ trước để sử dụng Azure OpenAI Services:

#### Yêu cầu

1. Bạn cần có một tài khoản Azure.
2. Tạo một tài nguyên Azure OpenAI và lấy khóa API của bạn.

#### Ví dụ Mã Python

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Tạo một prompt cho Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Định nghĩa headers và payload cho yêu cầu
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Gọi API Azure OpenAI để lấy các điểm đến đã được tái xếp hạng và chấm điểm
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Trích xuất và trả về các đề xuất
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

# Ví dụ sử dụng
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

#### Giải thích Mã - Người đặt sở thích

1. **Khởi tạo**: Lớp `TravelAgent` được khởi tạo với danh sách các điểm đến du lịch tiềm năng, mỗi điểm có thuộc tính như tên và mô tả.

2. **Lấy đề xuất (`get_recommendations` phương thức)**: Phương thức này tạo một prompt cho dịch vụ Azure OpenAI dựa trên sở thích của người dùng và gửi yêu cầu POST HTTP đến API Azure OpenAI để lấy các điểm đến được sắp xếp lại và chấm điểm.

3. **Tạo Prompt (`generate_prompt` phương thức)**: Phương thức này xây dựng một prompt cho Azure OpenAI, bao gồm sở thích người dùng và danh sách các điểm đến. Prompt này hướng dẫn mô hình sắp xếp lại và chấm điểm các điểm đến dựa trên sở thích được cung cấp.

4. **Gọi API**: Thư viện `requests` được sử dụng để gửi yêu cầu POST HTTP tới endpoint API Azure OpenAI. Phản hồi chứa các điểm đến đã được sắp xếp lại và chấm điểm.

5. **Ví dụ Sử dụng**: Đại lý du lịch thu thập sở thích người dùng (ví dụ: quan tâm tới tham quan và văn hóa đa dạng) và sử dụng dịch vụ Azure OpenAI để nhận đề xuất được sắp xếp lại và chấm điểm cho các điểm đến.

Hãy đảm bảo thay thế `your_azure_openai_api_key` bằng khóa API Azure OpenAI thực tế của bạn và `https://your-endpoint.com/...` bằng URL endpoint thực tế của triển khai Azure OpenAI của bạn.

Bằng cách sử dụng LLM cho việc sắp xếp lại và chấm điểm, đại lý du lịch có thể cung cấp các đề xuất cá nhân hóa và phù hợp hơn với khách hàng, nâng cao trải nghiệm tổng thể của họ.

### RAG: Kỹ Thuật Gợi ý so với Công Cụ

Retrieval-Augmented Generation (RAG) có thể vừa là một kỹ thuật gợi ý vừa là một công cụ trong phát triển các tác nhân AI. Hiểu được sự khác biệt giữa chúng có thể giúp bạn tận dụng RAG hiệu quả hơn trong các dự án của mình.

#### RAG như một Kỹ Thuật Gợi ý

**Là gì?**

- Như một kỹ thuật gợi ý, RAG liên quan đến việc xây dựng các truy vấn hoặc prompt cụ thể để hướng dẫn việc truy xuất thông tin liên quan từ một tập dữ liệu lớn hoặc cơ sở dữ liệu. Thông tin này sau đó được sử dụng để tạo câu trả lời hoặc hành động.

**Cách hoạt động:**

1. **Xây dựng Prompt**: Tạo các prompt hoặc truy vấn có cấu trúc tốt dựa trên nhiệm vụ hoặc đầu vào của người dùng.
2. **Truy xuất Thông tin**: Sử dụng các prompt để tìm kiếm dữ liệu liên quan từ cơ sở tri thức hoặc tập dữ liệu có sẵn.
3. **Tạo Phản hồi**: Kết hợp thông tin truy xuất được với các mô hình AI sinh văn bản để tạo ra phản hồi toàn diện và mạch lạc.

**Ví dụ trong Đại lý Du lịch**:

- Đầu vào người dùng: "Tôi muốn ghé thăm các bảo tàng tại Paris."
- Prompt: "Tìm các bảo tàng hàng đầu tại Paris."
- Thông tin truy xuất: Chi tiết về Bảo tàng Louvre, Musée d'Orsay, v.v.
- Phản hồi tạo ra: "Dưới đây là một số bảo tàng hàng đầu tại Paris: Bảo tàng Louvre, Musée d'Orsay và Centre Pompidou."

#### RAG như một Công Cụ

**Là gì?**

- Như một công cụ, RAG là một hệ thống tích hợp tự động hóa quá trình truy xuất và tạo phản hồi, giúp các nhà phát triển dễ dàng triển khai các chức năng AI phức tạp mà không cần thủ công tạo prompt cho từng truy vấn.

**Cách hoạt động:**

1. **Tích hợp**: Nhúng RAG vào kiến trúc của tác nhân AI, cho phép nó tự động xử lý nhiệm vụ truy xuất và tạo phản hồi.
2. **Tự động hóa**: Công cụ quản lý toàn bộ quá trình, từ nhận đầu vào người dùng đến tạo phản hồi cuối cùng, mà không cần prompt rõ ràng cho từng bước.
3. **Hiệu quả**: Cải thiện hiệu suất của tác nhân nhờ đơn giản hóa quy trình truy xuất và tạo phản hồi, mang lại phản hồi nhanh và chính xác hơn.

**Ví dụ trong Đại lý Du lịch**:

- Đầu vào người dùng: "Tôi muốn ghé thăm các bảo tàng tại Paris."
- Công cụ RAG: Tự động truy xuất thông tin về các bảo tàng và tạo phản hồi.
- Phản hồi tạo ra: "Dưới đây là một số bảo tàng hàng đầu tại Paris: Bảo tàng Louvre, Musée d'Orsay và Centre Pompidou."

### So sánh

| Khía cạnh               | Kỹ Thuật Gợi ý                                       | Công Cụ                                                  |
|------------------------|------------------------------------------------------|----------------------------------------------------------|
| **Thủ công vs Tự động**| Tạo prompt thủ công cho từng truy vấn.               | Quá trình truy xuất và tạo phản hồi tự động.             |
| **Kiểm soát**           | Kiểm soát nhiều hơn quá trình truy xuất.              | Đơn giản hóa và tự động hóa truy xuất và tạo phản hồi.    |
| **Linh hoạt**           | Cho phép tùy chỉnh prompt dựa trên nhu cầu cụ thể.    | Hiệu quả hơn cho triển khai quy mô lớn.                   |
| **Độ phức tạp**         | Yêu cầu xây dựng và điều chỉnh prompt.                | Dễ tích hợp vào kiến trúc tác nhân AI.                    |

### Ví dụ Thực tế

**Ví dụ Kỹ thuật Gợi ý:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Ví dụ Công cụ:**

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

### Đánh giá Mức độ Liên quan

Đánh giá mức độ liên quan là một khía cạnh quan trọng trong hiệu suất của tác nhân AI. Nó đảm bảo thông tin được truy xuất và tạo ra bởi tác nhân phù hợp, chính xác và hữu ích cho người dùng. Hãy cùng khám phá cách đánh giá mức độ liên quan trong các tác nhân AI, bao gồm các ví dụ thực tiễn và kỹ thuật.

#### Các Khái niệm Chính trong Đánh giá Mức độ Liên quan

1. **Nhận thức Ngữ cảnh**:
   - Tác nhân phải hiểu ngữ cảnh của truy vấn người dùng để truy xuất và tạo thông tin phù hợp.
   - Ví dụ: Nếu người dùng hỏi về "nhà hàng tốt nhất ở Paris", tác nhân nên xem xét sở thích của người dùng như loại ẩm thực và ngân sách.

2. **Độ chính xác**:
   - Thông tin do tác nhân cung cấp phải chính xác theo thực tế và cập nhật.
   - Ví dụ: Đề xuất những nhà hàng đang mở và có đánh giá tốt thay vì những nơi đã đóng cửa hoặc lỗi thời.

3. **Ý định của Người dùng**:
   - Tác nhân nên suy luận ý định đằng sau truy vấn để cung cấp thông tin phù hợp nhất.
   - Ví dụ: Nếu người dùng hỏi về "khách sạn tiết kiệm", tác nhân nên ưu tiên các lựa chọn hợp túi tiền.

4. **Vòng Phản hồi**:
   - Liên tục thu thập và phân tích phản hồi của người dùng giúp tác nhân tinh chỉnh quy trình đánh giá mức độ liên quan.
   - Ví dụ: Tích hợp đánh giá người dùng và phản hồi về các đề xuất trước đó để cải thiện các phản hồi sau.

#### Kỹ thuật Thực tiễn để Đánh giá Mức độ Liên quan

1. **Chấm điểm Mức độ Liên quan**:
   - Gán điểm liên quan cho mỗi mục truy xuất dựa trên mức độ phù hợp với truy vấn và sở thích người dùng.
   - Ví dụ:

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

2. **Lọc và Xếp hạng**:
   - Lọc bỏ các mục không liên quan và xếp hạng các mục còn lại dựa trên điểm mức độ liên quan.
   - Ví dụ:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Trả về 10 mục phù hợp hàng đầu
     ```

3. **Xử lý Ngôn ngữ Tự nhiên (NLP)**:
   - Sử dụng kỹ thuật NLP để hiểu truy vấn của người dùng và truy xuất thông tin phù hợp.
   - Ví dụ:

     ```python
     def process_query(query):
         # Sử dụng NLP để trích xuất thông tin chính từ truy vấn của người dùng
         processed_query = nlp(query)
         return processed_query
     ```

4. **Tích hợp Phản hồi Người dùng**:
   - Thu thập phản hồi của người dùng về các đề xuất được cung cấp và dùng nó để điều chỉnh đánh giá mức độ liên quan trong tương lai.
   - Ví dụ:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Ví dụ: Đánh giá Mức độ Liên quan trong Đại lý Du lịch

Dưới đây là một ví dụ thực tế cách Travel Agent có thể đánh giá mức độ liên quan của các đề xuất du lịch:

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
        return ranked_items[:10]  # Trả về 10 mục liên quan hàng đầu

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

# Ví dụ về cách sử dụng
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

### Tìm kiếm với Ý định

Tìm kiếm với ý định liên quan đến việc hiểu và giải thích mục đích hoặc mục tiêu cơ bản đằng sau truy vấn của người dùng để truy xuất và tạo thông tin phù hợp và hữu ích nhất. Cách tiếp cận này vượt lên trên việc chỉ khớp từ khóa và tập trung vào việc nắm bắt nhu cầu thực sự và ngữ cảnh của người dùng.

#### Các Khái niệm Chính trong Tìm kiếm với Ý định

1. **Hiểu Ý định Người dùng**:
   - Ý định người dùng có thể được phân loại thành ba loại chính: thông tin, định hướng và giao dịch.
     - **Ý định Thông tin**: Người dùng tìm kiếm thông tin về một chủ đề (ví dụ: "Các bảo tàng tốt nhất ở Paris là gì?").
     - **Ý định Định hướng**: Người dùng muốn điều hướng đến một trang web hoặc trang cụ thể (ví dụ: "Trang web chính thức của Bảo tàng Louvre").
     - **Ý định Giao dịch**: Người dùng muốn thực hiện một giao dịch, chẳng hạn như đặt vé bay hoặc mua hàng (ví dụ: "Đặt vé bay đến Paris").

2. **Nhận thức Ngữ cảnh**:
   - Phân tích ngữ cảnh truy vấn của người dùng để xác định chính xác ý định của họ. Điều này bao gồm xem xét các tương tác trước đó, sở thích người dùng và các chi tiết cụ thể của truy vấn hiện tại.

3. **Xử lý Ngôn ngữ Tự nhiên (NLP)**:
   - Kỹ thuật NLP được áp dụng để hiểu và giải thích các truy vấn ngôn ngữ tự nhiên do người dùng cung cấp. Điều này bao gồm các nhiệm vụ như nhận diện thực thể, phân tích cảm xúc và phân tích truy vấn.

4. **Cá nhân hóa**:
   - Cá nhân hóa kết quả tìm kiếm dựa trên lịch sử, sở thích và phản hồi của người dùng giúp tăng tính phù hợp của thông tin được truy xuất.

#### Ví dụ Thực tế: Tìm kiếm với Ý định trong Đại lý Du lịch

Hãy lấy Travel Agent làm ví dụ để xem cách tìm kiếm với ý định có thể được triển khai.

1. **Thu thập Sở thích Người dùng**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Hiểu Ý định Người dùng**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Nhận thức Ngữ cảnh**
   ```python
   def analyze_context(query, user_history):
       # Kết hợp truy vấn hiện tại với lịch sử người dùng để hiểu ngữ cảnh
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Tìm kiếm và Cá nhân hóa Kết quả**

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
       # Ví dụ về logic tìm kiếm cho mục đích thông tin
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Ví dụ về logic tìm kiếm cho mục đích điều hướng
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Ví dụ về logic tìm kiếm cho mục đích giao dịch
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Ví dụ về logic cá nhân hóa
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Trả về 10 kết quả cá nhân hóa hàng đầu
   ```

5. **Ví dụ Sử dụng**

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

## 4. Tạo Mã như một Công cụ

Đại lý tạo mã sử dụng các mô hình AI để viết và thực thi mã, giải quyết các vấn đề phức tạp và tự động hóa các tác vụ.

### Đại lý Tạo Mã

Đại lý tạo mã sử dụng các mô hình AI sinh để viết và thực thi mã. Các đại lý này có thể giải quyết các vấn đề phức tạp, tự động hóa các tác vụ và cung cấp những hiểu biết giá trị bằng cách tạo ra và chạy mã trong nhiều ngôn ngữ lập trình khác nhau.

#### Ứng dụng Thực tiễn

1. **Tạo Mã Tự động**: Tạo các đoạn mã cho các tác vụ cụ thể, như phân tích dữ liệu, thu thập dữ liệu web hoặc học máy.
2. **SQL như một RAG**: Sử dụng các truy vấn SQL để truy xuất và thao tác dữ liệu từ cơ sở dữ liệu.
3. **Giải quyết Vấn đề**: Tạo và chạy mã để giải quyết các vấn đề cụ thể, như tối ưu hóa thuật toán hoặc phân tích dữ liệu.

#### Ví dụ: Đại lý Tạo Mã cho Phân tích Dữ liệu

Hãy tưởng tượng bạn đang thiết kế một đại lý tạo mã. Dưới đây là cách nó có thể hoạt động:

1. **Nhiệm vụ**: Phân tích một bộ dữ liệu để nhận diện xu hướng và mẫu.
2. **Các bước**:
   - Tải bộ dữ liệu vào công cụ phân tích dữ liệu.
   - Tạo các truy vấn SQL để lọc và tổng hợp dữ liệu.
   - Thực thi các truy vấn và lấy kết quả.
   - Sử dụng kết quả để tạo các biểu đồ và hiểu biết.
3. **Nguồn lực cần thiết**: Truy cập vào bộ dữ liệu, công cụ phân tích dữ liệu và khả năng SQL.
4. **Kinh nghiệm**: Sử dụng kết quả phân tích trước để cải thiện độ chính xác và tính liên quan của các phân tích trong tương lai.

### Ví dụ: Đại lý Tạo Mã cho Đại lý Du lịch

Trong ví dụ này, chúng ta sẽ thiết kế một đại lý tạo mã, Đại lý Du lịch, để hỗ trợ người dùng lên kế hoạch chuyến đi bằng cách tạo và thực thi mã. Đại lý này có thể xử lý các tác vụ như lấy các lựa chọn du lịch, lọc kết quả và tổng hợp lịch trình bằng AI sinh.

#### Tổng quan về Đại lý Tạo Mã

1. **Thu thập Ưu tiên của Người dùng**: Thu thập đầu vào của người dùng như điểm đến, ngày đi, ngân sách và sở thích.
2. **Tạo Mã để Lấy Dữ liệu**: Tạo các đoạn mã để truy xuất dữ liệu về chuyến bay, khách sạn và điểm tham quan.
3. **Chạy Mã đã Tạo**: Chạy mã để lấy thông tin thời gian thực.
4. **Tạo Lịch trình**: Tổng hợp dữ liệu thu thập được thành một kế hoạch du lịch cá nhân hóa.
5. **Điều chỉnh dựa trên Phản hồi**: Nhận phản hồi từ người dùng và tạo lại mã nếu cần để tinh chỉnh kết quả.

#### Triển khai Từng Bước

1. **Thu thập Ưu tiên của Người dùng**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Tạo Mã để Lấy Dữ liệu**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Ví dụ: Tạo mã để tìm kiếm chuyến bay dựa trên sở thích của người dùng
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Ví dụ: Tạo mã để tìm kiếm khách sạn
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Chạy Mã đã Tạo**

   ```python
   def execute_code(code):
       # Thực thi mã đã tạo bằng exec
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

4. **Tạo Lịch trình**

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

5. **Điều chỉnh dựa trên Phản hồi**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Điều chỉnh tùy chọn dựa trên phản hồi của người dùng
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Tạo lại và thực thi mã với các tùy chọn đã cập nhật
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Tận dụng nhận thức môi trường và suy luận

Dựa trên sơ đồ của bảng có thể nâng cao quá trình tạo truy vấn bằng cách tận dụng nhận thức và suy luận về môi trường.

Dưới đây là một ví dụ về cách thực hiện điều này:

1. **Hiểu Sơ đồ**: Hệ thống sẽ hiểu sơ đồ của bảng và sử dụng thông tin này để làm nền tảng tạo truy vấn.
2. **Điều chỉnh dựa trên Phản hồi**: Hệ thống sẽ điều chỉnh ưu tiên người dùng dựa trên phản hồi và suy luận về các trường trong sơ đồ cần cập nhật.
3. **Tạo và Thực thi Truy vấn**: Hệ thống sẽ tạo và thực thi truy vấn để lấy dữ liệu chuyến bay và khách sạn cập nhật dựa trên các ưu tiên mới.

Dưới đây là một ví dụ mã Python cập nhật bao gồm các khái niệm này:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Điều chỉnh sở thích dựa trên phản hồi của người dùng
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Lập luận dựa trên sơ đồ để điều chỉnh các sở thích liên quan khác
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Logic tùy chỉnh để điều chỉnh sở thích dựa trên sơ đồ và phản hồi
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Tạo mã để lấy dữ liệu chuyến bay dựa trên sở thích đã cập nhật
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Tạo mã để lấy dữ liệu khách sạn dựa trên sở thích đã cập nhật
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Mô phỏng thực thi mã và trả về dữ liệu giả lập
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Tạo lịch trình dựa trên chuyến bay, khách sạn và điểm tham quan
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Ví dụ về sơ đồ
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Ví dụ sử dụng
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Tạo lại và thực thi mã với sở thích đã cập nhật
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Giải thích - Đặt chỗ dựa trên Phản hồi

1. **Nhận thức sơ đồ**: Từ điển `schema` định nghĩa cách ưu tiên nên được điều chỉnh dựa trên phản hồi. Nó bao gồm các trường như `favorites` và `avoid`, với các điều chỉnh tương ứng.
2. **Điều chỉnh Ưu tiên (phương thức `adjust_based_on_feedback`)**: Phương thức này điều chỉnh ưu tiên dựa trên phản hồi của người dùng và sơ đồ.
3. **Điều chỉnh dựa trên Môi trường (phương thức `adjust_based_on_environment`)**: Phương thức này tùy chỉnh các điều chỉnh dựa trên sơ đồ và phản hồi.
4. **Tạo và Thực thi Truy vấn**: Hệ thống tạo mã để lấy dữ liệu chuyến bay và khách sạn cập nhật dựa trên ưu tiên đã điều chỉnh và mô phỏng việc thực thi các truy vấn này.
5. **Tạo Lịch trình**: Hệ thống tạo lịch trình cập nhật dựa trên dữ liệu chuyến bay, khách sạn và điểm tham quan mới.

Bằng cách làm cho hệ thống nhận thức môi trường và suy luận dựa trên sơ đồ, nó có thể tạo ra các truy vấn chính xác và phù hợp hơn, dẫn đến các đề xuất du lịch tốt hơn và trải nghiệm người dùng cá nhân hóa hơn.

### Sử dụng SQL như Kỹ thuật Tạo Thế hệ tăng cường Truy xuất (RAG)

SQL (Ngôn ngữ Truy vấn Cấu trúc) là một công cụ mạnh để tương tác với các cơ sở dữ liệu. Khi sử dụng như một phần của phương pháp Tạo thế hệ tăng cường Truy xuất (RAG), SQL có thể truy xuất dữ liệu liên quan từ cơ sở dữ liệu để hỗ trợ và tạo phản hồi hoặc hành động trong các đại lý AI. Hãy cùng khám phá cách SQL có thể dùng làm kỹ thuật RAG trong ngữ cảnh của Đại lý Du lịch.

#### Khái niệm chính

1. **Tương tác với Cơ sở dữ liệu**:
   - SQL được dùng để truy vấn cơ sở dữ liệu, truy xuất thông tin liên quan và thao tác dữ liệu.
   - Ví dụ: Lấy thông tin chuyến bay, khách sạn và điểm tham quan từ cơ sở dữ liệu du lịch.

2. **Tích hợp với RAG**:
   - Các truy vấn SQL được tạo dựa trên đầu vào và ưu tiên của người dùng.
   - Dữ liệu truy xuất được dùng để tạo các đề xuất hoặc hành động cá nhân hóa.

3. **Tạo Truy vấn Động**:
   - Đại lý AI tạo các truy vấn SQL động dựa trên ngữ cảnh và nhu cầu người dùng.
   - Ví dụ: Tùy chỉnh truy vấn SQL để lọc kết quả dựa trên ngân sách, ngày tháng và sở thích.

#### Ứng dụng

- **Tạo Mã Tự động**: Tạo các đoạn mã cho các tác vụ cụ thể.
- **SQL như một RAG**: Sử dụng các truy vấn SQL để thao tác dữ liệu.
- **Giải quyết Vấn đề**: Tạo và chạy mã để giải quyết vấn đề.

**Ví dụ**: Đại lý phân tích dữ liệu:

1. **Nhiệm vụ**: Phân tích bộ dữ liệu để tìm xu hướng.
2. **Các bước**:
   - Tải bộ dữ liệu.
   - Tạo truy vấn SQL để lọc dữ liệu.
   - Thực thi truy vấn và lấy kết quả.
   - Tạo biểu đồ và hiểu biết.
3. **Nguồn lực**: Truy cập bộ dữ liệu, khả năng SQL.
4. **Kinh nghiệm**: Sử dụng kết quả trước để cải thiện phân tích sau.

#### Ví dụ Thực tiễn: Sử dụng SQL trong Đại lý Du lịch

1. **Thu thập Ưu tiên của Người dùng**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Tạo Truy vấn SQL**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Thực thi Truy vấn SQL**

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

4. **Tạo Đề xuất**

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

#### Ví dụ Truy vấn SQL

1. **Truy vấn Chuyến bay**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Truy vấn Khách sạn**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Truy vấn Điểm tham quan**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Bằng cách tận dụng SQL như một phần của kỹ thuật Tạo thế hệ tăng cường Truy xuất (RAG), các đại lý AI như Đại lý Du lịch có thể truy xuất và sử dụng dữ liệu liên quan một cách động để cung cấp các đề xuất chính xác và cá nhân hóa.

### Ví dụ về Metacognition

Để minh họa việc triển khai metacognition, hãy tạo một đại lý đơn giản *.phản chiếu quá trình ra quyết định của nó* trong khi giải quyết một vấn đề. Trong ví dụ này, chúng ta sẽ xây dựng một hệ thống, nơi đại lý cố gắng tối ưu hóa việc chọn khách sạn, nhưng sau đó đánh giá lại lý luận của chính nó và điều chỉnh chiến lược khi đại lý mắc lỗi hoặc lựa chọn chưa tối ưu.

Chúng ta sẽ mô phỏng điều này qua ví dụ cơ bản, nơi đại lý chọn khách sạn dựa trên kết hợp giữa giá cả và chất lượng, nhưng nó sẽ "phản chiếu" các quyết định và điều chỉnh tương ứng.

#### Cách minh hoạ metacognition này:

1. **Quyết định ban đầu**: Đại lý sẽ chọn khách sạn rẻ nhất, mà không hiểu tác động về chất lượng.
2. **Phản chiếu và Đánh giá**: Sau khi lựa chọn ban đầu, đại lý sẽ kiểm tra xem khách sạn có phải là lựa chọn "kém" bằng phản hồi của người dùng. Nếu thấy chất lượng khách sạn quá thấp, nó sẽ phản chiếu lý luận của mình.
3. **Điều chỉnh Chiến lược**: Đại lý điều chỉnh chiến lược dựa trên sự phản chiếu bằng cách chuyển từ "rẻ nhất" sang "chất lượng cao nhất", cải thiện quá trình ra quyết định trong các lần lặp tiếp theo.

Dưới đây là một ví dụ:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Lưu trữ các khách sạn đã chọn trước đó
        self.corrected_choices = []  # Lưu trữ các lựa chọn được chỉnh sửa
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Các chiến lược có sẵn

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
        # Giả sử chúng ta có một số phản hồi từ người dùng nói cho chúng ta biết lựa chọn cuối cùng có tốt hay không
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Điều chỉnh chiến lược nếu lựa chọn trước đó không hài lòng
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

# Mô phỏng một danh sách các khách sạn (giá và chất lượng)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Tạo một đại lý
agent = HotelRecommendationAgent()

# Bước 1: Đại lý đề xuất một khách sạn sử dụng chiến lược "rẻ nhất"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Bước 2: Đại lý suy ngẫm về lựa chọn và điều chỉnh chiến lược nếu cần thiết
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Bước 3: Đại lý đề xuất lại, lần này sử dụng chiến lược đã điều chỉnh
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Khả năng Metacognition của Đại lý

Điều quan trọng là khả năng của đại lý:
- Đánh giá những lựa chọn và quá trình ra quyết định trước đó.
- Điều chỉnh chiến lược dựa trên sự phản chiếu đó, tức là metacognition đang được áp dụng.

Đây là một hình thức metacognition đơn giản, nơi hệ thống có khả năng điều chỉnh quá trình suy luận dựa trên phản hồi nội bộ.

### Kết luận

Metacognition là một công cụ mạnh mẽ có thể tăng cường đáng kể khả năng của các đại lý AI. Bằng cách tích hợp các quy trình metacognitive, bạn có thể thiết kế đại lý thông minh hơn, thích ứng nhanh hơn và hiệu quả hơn. Hãy sử dụng các tài nguyên bổ sung để khám phá sâu hơn thế giới hấp dẫn của metacognition trong các đại lý AI.

### Bạn có thêm câu hỏi về Mẫu Thiết kế Metacognition?

Tham gia [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) để gặp gỡ những người học khác, tham dự giờ làm việc và được giải đáp các câu hỏi về AI Agents.

## Bài học Trước

[Multi-Agent Design Pattern](../08-multi-agent/README.md)

## Bài học Tiếp theo

[AI Agents in Production](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc sự không chính xác. Tài liệu gốc bằng ngôn ngữ gốc của nó nên được xem là nguồn tham khảo chính xác nhất. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->