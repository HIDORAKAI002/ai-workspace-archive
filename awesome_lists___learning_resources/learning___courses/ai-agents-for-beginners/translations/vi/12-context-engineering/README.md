# Kỹ thuật ngữ cảnh cho Tác nhân AI

[![Kỹ thuật ngữ cảnh](../../../translated_images/vi/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Nhấp vào hình ảnh ở trên để xem video của bài học này)_

Hiểu được mức độ phức tạp của ứng dụng mà bạn đang xây dựng cho một tác nhân AI là điều quan trọng để tạo ra một tác nhân đáng tin cậy. Chúng ta cần xây dựng các Tác nhân AI biết quản lý thông tin hiệu quả để giải quyết các nhu cầu phức tạp vượt ra ngoài việc thiết kế prompt.

Trong bài học này, chúng ta sẽ xem xét ngữ cảnh kỹ thuật (context engineering) là gì và vai trò của nó trong việc xây dựng các tác nhân AI.

## Giới thiệu

Bài học này sẽ bao gồm:

• **Kỹ thuật ngữ cảnh là gì** và tại sao nó khác với thiết kế prompt.

• **Các chiến lược để thực hiện Kỹ thuật ngữ cảnh hiệu quả**, bao gồm cách viết, chọn lọc, nén và cô lập thông tin.

• **Các lỗi ngữ cảnh thường gặp** có thể làm trật hướng tác nhân AI của bạn và cách khắc phục chúng.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ hiểu được cách:

• **Định nghĩa kỹ thuật ngữ cảnh** và phân biệt nó với thiết kế prompt.

• **Xác định các thành phần chính của ngữ cảnh** trong các ứng dụng Mô hình Ngôn ngữ Lớn (LLM).

• **Áp dụng các chiến lược để viết, chọn lọc, nén và cô lập ngữ cảnh** nhằm cải thiện hiệu suất tác nhân.

• **Nhận biết các lỗi ngữ cảnh phổ biến** như nhiễm độc, phân tâm, nhầm lẫn và mâu thuẫn, và triển khai các kỹ thuật giảm thiểu.

## Kỹ thuật ngữ cảnh là gì?

Đối với Tác nhân AI, ngữ cảnh là thứ thúc đẩy việc lập kế hoạch để Tác nhân AI thực hiện các hành động nhất định. Kỹ thuật ngữ cảnh là thực hành đảm bảo rằng Tác nhân AI có thông tin phù hợp để hoàn thành bước tiếp theo của nhiệm vụ. Cửa sổ ngữ cảnh có kích thước giới hạn, vì vậy với tư cách là người xây dựng tác nhân, chúng ta cần xây dựng hệ thống và quy trình để quản lý việc thêm, xóa và cô đọng thông tin trong cửa sổ ngữ cảnh.

### Thiết kế Prompt so với Kỹ thuật Ngữ cảnh

Thiết kế prompt tập trung vào một bộ hướng dẫn tĩnh duy nhất để hướng dẫn Tác nhân AI hiệu quả với một bộ quy tắc. Kỹ thuật ngữ cảnh là cách quản lý một bộ thông tin động, bao gồm prompt ban đầu, để đảm bảo Tác nhân AI có những gì nó cần theo thời gian. Ý tưởng chính quanh kỹ thuật ngữ cảnh là làm cho quy trình này lặp lại được và đáng tin cậy.

### Các loại Ngữ cảnh

[![Các loại ngữ cảnh](../../../translated_images/vi/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Điều quan trọng cần nhớ là ngữ cảnh không chỉ là một thứ duy nhất. Thông tin mà Tác nhân AI cần có thể đến từ nhiều nguồn khác nhau và trách nhiệm của chúng ta là đảm bảo tác nhân có quyền truy cập vào những nguồn này:

Các loại ngữ cảnh mà một tác nhân AI có thể cần quản lý bao gồm:

• **Hướng dẫn:** Đây giống như "quy tắc" của tác nhân – các prompt, tin nhắn hệ thống, few-shot examples (ví dụ cho AI biết cách thực hiện một việc), và mô tả các công cụ mà nó có thể sử dụng. Đây là nơi trọng tâm của thiết kế prompt kết hợp với kỹ thuật ngữ cảnh.

• **Kiến thức:** Bao gồm các sự thật, thông tin truy xuất từ cơ sở dữ liệu, hoặc bộ nhớ dài hạn mà tác nhân đã tích lũy. Điều này bao gồm việc tích hợp một hệ thống Retrieval Augmented Generation (RAG) nếu một tác nhân cần truy cập vào các kho tri thức và cơ sở dữ liệu khác nhau.

• **Công cụ:** Đây là định nghĩa về các hàm bên ngoài, API và MCP Servers mà tác nhân có thể gọi, cùng với phản hồi (kết quả) mà nó nhận được khi sử dụng chúng.

• **Lịch sử cuộc trò chuyện:** Đối thoại đang diễn ra với người dùng. Khi thời gian trôi qua, các cuộc trò chuyện này trở nên dài hơn và phức tạp hơn, điều này có nghĩa là chúng chiếm không gian trong cửa sổ ngữ cảnh.

• **Sở thích người dùng:** Thông tin học được về sở thích hay không thích của người dùng theo thời gian. Chúng có thể được lưu trữ và gọi ra khi ra quyết định quan trọng để hỗ trợ người dùng.

## Các chiến lược cho Kỹ thuật Ngữ cảnh hiệu quả

### Chiến lược lập kế hoạch

[![Thực hành tốt Kỹ thuật Ngữ cảnh](../../../translated_images/vi/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Kỹ thuật ngữ cảnh tốt bắt đầu từ việc lập kế hoạch tốt. Đây là một cách tiếp cận sẽ giúp bạn bắt đầu suy nghĩ về cách áp dụng khái niệm kỹ thuật ngữ cảnh:

1. **Xác định Kết quả Rõ ràng** - Kết quả của các nhiệm vụ mà Tác nhân AI sẽ được giao nên được định nghĩa rõ ràng. Trả lời câu hỏi - "Thế giới sẽ trông như thế nào khi Tác nhân AI hoàn thành nhiệm vụ của nó?" Nói cách khác, thay đổi, thông tin, hoặc phản hồi nào người dùng sẽ nhận được sau khi tương tác với Tác nhân AI.

2. **Lập bản đồ Ngữ cảnh** - Khi bạn đã xác định được kết quả của Tác nhân AI, bạn cần trả lời câu hỏi "Tác nhân AI cần thông tin gì để hoàn thành nhiệm vụ này?". Bằng cách này bạn có thể bắt đầu lập bản đồ nơi thông tin đó có thể được tìm thấy.

3. **Tạo các đường ống Ngữ cảnh (Context Pipelines)** - Bây giờ bạn đã biết nơi có thông tin, bạn cần trả lời câu hỏi "Tác nhân sẽ lấy thông tin này như thế nào?". Điều này có thể được thực hiện bằng nhiều cách khác nhau bao gồm RAG, sử dụng MCP servers và các công cụ khác.

### Chiến lược thực tiễn

Lập kế hoạch là quan trọng nhưng khi thông tin bắt đầu chảy vào cửa sổ ngữ cảnh của tác nhân, chúng ta cần có các chiến lược thực tiễn để quản lý nó:

#### Quản lý Ngữ cảnh

Trong khi một số thông tin sẽ được thêm vào cửa sổ ngữ cảnh tự động, kỹ thuật ngữ cảnh là về việc đảm nhận vai trò tích cực hơn với thông tin này, điều này có thể thực hiện bằng một vài chiến lược:

 1. **Ghi chú của Tác nhân (Agent Scratchpad)**
 Công cụ này cho phép một Tác nhân AI ghi lại các ghi chú về thông tin liên quan đến nhiệm vụ hiện tại và tương tác với người dùng trong một phiên duy nhất. Điều này nên tồn tại bên ngoài cửa sổ ngữ cảnh trong một tệp hoặc đối tượng runtime mà tác nhân có thể truy xuất lại trong phiên này nếu cần.

 2. **Bộ nhớ**
 Scratchpad tốt để quản lý thông tin bên ngoài cửa sổ ngữ cảnh của một phiên đơn lẻ. Bộ nhớ cho phép các tác nhân lưu trữ và truy xuất thông tin liên quan qua nhiều phiên. Điều này có thể bao gồm tóm tắt, sở thích người dùng và phản hồi để cải thiện trong tương lai.

 3. **Nén Ngữ cảnh**
 Khi cửa sổ ngữ cảnh tăng lên và gần tới giới hạn, các kỹ thuật như tóm tắt và cắt bớt có thể được sử dụng. Điều này bao gồm giữ lại chỉ những thông tin có liên quan nhất hoặc loại bỏ các tin nhắn cũ hơn.
  
 4. **Hệ thống đa tác nhân**
 Phát triển hệ thống đa tác nhân là một dạng kỹ thuật ngữ cảnh vì mỗi tác nhân có cửa sổ ngữ cảnh riêng. Cách ngữ cảnh đó được chia sẻ và truyền cho các tác nhân khác nhau là một điều cần lên kế hoạch khi xây dựng những hệ thống này.
  
 5. **Môi trường Sandbox**
 Nếu một tác nhân cần chạy mã hoặc xử lý một lượng lớn thông tin trong một tài liệu, điều này có thể tiêu tốn nhiều token để xử lý kết quả. Thay vì lưu tất cả vào cửa sổ ngữ cảnh, tác nhân có thể sử dụng một môi trường sandbox có khả năng chạy mã này và chỉ đọc kết quả cùng những thông tin có liên quan.
  
 6. **Đối tượng trạng thái thời chạy (Runtime State Objects)**
   Điều này được thực hiện bằng cách tạo các container thông tin để quản lý những tình huống khi Tác nhân cần truy cập vào một số thông tin nhất định. Đối với một nhiệm vụ phức tạp, điều này cho phép Tác nhân lưu kết quả của mỗi bước phụ nhiệm vụ theo từng bước, cho phép ngữ cảnh vẫn gắn kết chỉ với phụ nhiệm vụ cụ thể đó.
  
### Ví dụ về Kỹ thuật Ngữ cảnh

Giả sử chúng ta muốn một tác nhân AI **"Đặt chuyến đi đến Paris cho tôi."**

• Một tác nhân đơn giản chỉ sử dụng thiết kế prompt có thể chỉ trả lời: **"Được rồi, bạn muốn đi Paris khi nào?"**. Nó chỉ xử lý câu hỏi trực tiếp của bạn vào thời điểm người dùng hỏi.

• Một tác nhân sử dụng các chiến lược kỹ thuật ngữ cảnh đã đề cập sẽ làm nhiều hơn thế. Trước khi phản hồi, hệ thống của nó có thể:

  ◦ **Kiểm tra lịch của bạn** để tìm ngày trống (truy xuất dữ liệu thời gian thực).

  ◦ **Nhớ lại sở thích du lịch trước đây** (từ bộ nhớ dài hạn) như hãng hàng không ưa thích, ngân sách, hoặc bạn có thích chuyến bay thẳng hay không.

  ◦ **Xác định các công cụ có sẵn** cho việc đặt vé máy bay và khách sạn.

- Sau đó, một phản hồi ví dụ có thể là:  "Chào [Your Name]! Tôi thấy bạn rảnh tuần đầu tháng Mười. Tôi có nên tìm chuyến bay thẳng đến Paris trên [Preferred Airline] trong ngân sách thường lệ của bạn là [Budget] không?". Phản hồi giàu ngữ cảnh này cho thấy sức mạnh của kỹ thuật ngữ cảnh.

## Các lỗi ngữ cảnh thường gặp

### Nhiễm độc Ngữ cảnh (Context Poisoning)

**Đó là gì:** Khi một ảo tưởng (thông tin sai do LLM tạo ra) hoặc một lỗi xâm nhập vào ngữ cảnh và bị tham chiếu lặp lại, khiến tác nhân theo đuổi các mục tiêu không thể hoặc phát triển các chiến lược vô nghĩa.

**Cần làm gì:** Triển khai **xác thực ngữ cảnh** và **cách ly**. Xác thực thông tin trước khi nó được thêm vào bộ nhớ dài hạn. Nếu phát hiện khả năng nhiễm độc, bắt đầu các luồng ngữ cảnh mới để ngăn thông tin xấu lan rộng.

**Ví dụ Đặt chuyến:** Tác nhân của bạn ảo tưởng về một **chuyến bay thẳng từ một sân bay địa phương nhỏ đến một thành phố quốc tế xa xôi** mà thực tế không có chuyến quốc tế. Chi tiết chuyến bay không tồn tại này được lưu vào ngữ cảnh. Sau này, khi bạn yêu cầu tác nhân đặt vé, nó cứ cố gắng tìm vé cho tuyến đường không thể này, dẫn đến lỗi lặp lại.

**Giải pháp:** Thực hiện một bước **xác thực sự tồn tại của chuyến bay và các tuyến đường với một API thời gian thực** _trước khi_ thêm chi tiết chuyến bay vào ngữ cảnh làm việc của tác nhân. Nếu xác thực thất bại, thông tin sai sẽ bị "cách ly" và không được sử dụng tiếp.

### Phân tâm Ngữ cảnh (Context Distraction)

**Đó là gì:** Khi ngữ cảnh trở nên quá lớn khiến mô hình tập trung quá nhiều vào lịch sử tích lũy thay vì sử dụng những gì nó đã học trong quá trình huấn luyện, dẫn đến hành động lặp lại hoặc không hữu ích. Mô hình có thể bắt đầu mắc lỗi ngay cả trước khi cửa sổ ngữ cảnh đầy.

**Cần làm gì:** Sử dụng **tóm tắt ngữ cảnh**. Định kỳ nén thông tin tích lũy thành các tóm tắt ngắn hơn, giữ lại các chi tiết quan trọng trong khi loại bỏ lịch sử thừa. Điều này giúp "đặt lại" trọng tâm.

**Ví dụ Đặt chuyến:** Bạn đã thảo luận về nhiều điểm đến mơ ước trong một thời gian dài, bao gồm kể chi tiết chuyến đi bụi của bạn từ hai năm trước. Khi bạn cuối cùng yêu cầu **"tìm cho tôi một chuyến bay rẻ cho tháng tới"**, tác nhân bị sa lầy vào những chi tiết cũ, không liên quan và liên tục hỏi về đồ đạc đi bụi hoặc lộ trình cũ, bỏ qua yêu cầu hiện tại của bạn.

**Giải pháp:** Sau một số lượt nhất định hoặc khi ngữ cảnh trở nên quá lớn, tác nhân nên **tóm tắt những phần gần đây và liên quan nhất của cuộc trò chuyện** – tập trung vào ngày đi và điểm đến hiện tại của bạn – và sử dụng bản tóm tắt cô đọng đó cho lần gọi LLM tiếp theo, loại bỏ phần trò chuyện lịch sử ít liên quan hơn.

### Nhầm lẫn Ngữ cảnh (Context Confusion)

**Đó là gì:** Khi ngữ cảnh không cần thiết, thường dưới dạng quá nhiều công cụ có sẵn, khiến mô hình tạo ra phản hồi xấu hoặc gọi các công cụ không liên quan. Các mô hình nhỏ hơn đặc biệt dễ bị điều này.

**Cần làm gì:** Thực hiện **quản lý tải công cụ (tool loadout management)** bằng kỹ thuật RAG. Lưu mô tả công cụ trong cơ sở dữ liệu vector và chỉ chọn _những_ công cụ liên quan nhất cho từng nhiệm vụ cụ thể. Nghiên cứu cho thấy giới hạn lựa chọn công cụ dưới 30 là hợp lý.

**Ví dụ Đặt chuyến:** Tác nhân của bạn có quyền truy cập vào hàng chục công cụ: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations`, v.v. Bạn hỏi, **"Cách tốt nhất để di chuyển ở Paris là gì?"** Do số lượng lớn công cụ, tác nhân bị nhầm lẫn và cố gọi `book_flight` _trong nội bộ_ Paris, hoặc `rent_car` mặc dù bạn ưa thích phương tiện công cộng, vì mô tả công cụ có thể chồng chéo hoặc nó đơn giản không phân biệt được công cụ nào là tốt nhất.

**Giải pháp:** Sử dụng **RAG trên mô tả công cụ**. Khi bạn hỏi về việc di chuyển ở Paris, hệ thống sẽ truy xuất động _chỉ_ những công cụ liên quan nhất như `rent_car` hoặc `public_transport_info` dựa trên truy vấn của bạn, trình bày một "loadout" tập trung các công cụ cho LLM.

### Mâu thuẫn Ngữ cảnh (Context Clash)

**Đó là gì:** Khi tồn tại thông tin mâu thuẫn trong ngữ cảnh, dẫn đến suy luận không nhất quán hoặc phản hồi cuối cùng kém. Điều này thường xảy ra khi thông tin đến theo từng giai đoạn, và các giả định sai ban đầu vẫn còn trong ngữ cảnh.

**Cần làm gì:** Sử dụng **cắt tỉa ngữ cảnh (context pruning)** và **chuyển tải (offloading)**. Cắt tỉa có nghĩa là loại bỏ thông tin lỗi thời hoặc mâu thuẫn khi có chi tiết mới. Chuyển tải cung cấp cho mô hình một không gian làm việc "scratchpad" riêng để xử lý thông tin mà không làm lộn xộn ngữ cảnh chính.

**Ví dụ Đặt chuyến:** Ban đầu bạn nói với tác nhân, **"Tôi muốn bay hạng phổ thông."** Sau đó trong cuộc trò chuyện, bạn thay đổi ý và nói, **"Thực ra, cho chuyến này, chúng ta đi hạng thương gia."** Nếu cả hai chỉ dẫn đều còn lại trong ngữ cảnh, tác nhân có thể nhận kết quả tìm kiếm mâu thuẫn hoặc bối rối về ưu tiên nên chọn hướng nào.

**Giải pháp:** Triển khai **cắt tỉa ngữ cảnh**. Khi một hướng dẫn mới mâu thuẫn với hướng dẫn cũ, hướng dẫn cũ sẽ bị xóa hoặc bị ghi đè rõ ràng trong ngữ cảnh. Ngoài ra, tác nhân có thể sử dụng một **scratchpad** để giải quyết các sở thích mâu thuẫn trước khi quyết định, đảm bảo chỉ có hướng dẫn cuối cùng, nhất quán dẫn dắt hành động của nó.

## Còn câu hỏi gì về Kỹ thuật Ngữ cảnh không?

Tham gia [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) để gặp gỡ những người học khác, tham dự giờ hỗ trợ và nhận câu trả lời cho các câu hỏi về Tác nhân AI của bạn.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Miễn trừ trách nhiệm:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI Co-op Translator (https://github.com/Azure/co-op-translator). Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ ban đầu nên được coi là nguồn có thẩm quyền. Đối với những thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hoặc diễn giải sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->