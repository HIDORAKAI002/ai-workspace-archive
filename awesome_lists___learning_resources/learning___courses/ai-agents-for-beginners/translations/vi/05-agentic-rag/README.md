[![Agentic RAG](../../../translated_images/vi/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Nhấp vào hình ảnh trên để xem video bài học này)_

# Agentic RAG

Bài học này cung cấp tổng quan toàn diện về Agentic Retrieval-Augmented Generation (Agentic RAG), một mô hình AI mới nổi mà tại đó các mô hình ngôn ngữ lớn (LLMs) tự động lập kế hoạch các bước tiếp theo trong khi truy xuất thông tin từ các nguồn bên ngoài. Khác với mô hình tĩnh “truy xuất rồi đọc”, Agentic RAG liên quan đến các lần gọi lặp lại tới LLM, xen kẽ với các cuộc gọi công cụ hoặc hàm và các đầu ra có cấu trúc. Hệ thống đánh giá kết quả, tinh chỉnh truy vấn, sử dụng thêm công cụ nếu cần và tiếp tục chu trình này cho tới khi đạt được giải pháp thỏa đáng.

## Giới thiệu

Bài học này sẽ đề cập đến

- **Hiểu về Agentic RAG:** Tìm hiểu về mô hình mới nổi trong AI, nơi các mô hình ngôn ngữ lớn (LLMs) tự động lập kế hoạch bước tiếp theo trong khi truy xuất thông tin từ các nguồn dữ liệu bên ngoài.
- **Nắm bắt phong cách Maker-Checker lặp lại:** Hiểu vòng gọi lặp tới LLM, xen kẽ với các cuộc gọi công cụ hoặc hàm và đầu ra có cấu trúc, được thiết kế nhằm cải thiện tính chính xác và xử lý các truy vấn không hợp lệ.
- **Khám phá các ứng dụng thực tế:** Nhận biết các kịch bản mà Agentic RAG thể hiện thế mạnh, chẳng hạn như môi trường ưu tiên tính chính xác, tương tác cơ sở dữ liệu phức tạp, và các quy trình công việc mở rộng.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ biết cách/hiểu được:

- **Hiểu về Agentic RAG:** Tìm hiểu về mô hình mới nổi trong AI, nơi các mô hình ngôn ngữ lớn (LLMs) tự động lập kế hoạch bước tiếp theo khi truy xuất thông tin từ các nguồn dữ liệu bên ngoài.
- **Phong cách Maker-Checker lặp lại:** Nắm bắt khái niệm vòng gọi lặp tới LLM, xen kẽ với các cuộc gọi công cụ hoặc hàm và đầu ra có cấu trúc, nhằm cải thiện độ chính xác và xử lý truy vấn sai lệch.
- **Sở hữu quá trình suy luận:** Hiểu khả năng của hệ thống tự làm chủ quá trình suy luận, quyết định cách tiếp cận vấn đề mà không phụ thuộc vào các đường dẫn đã được định trước.
- **Quy trình làm việc:** Hiểu cách một mô hình agentic tự quyết định truy xuất báo cáo xu hướng thị trường, xác định dữ liệu đối thủ cạnh tranh, tương quan các chỉ số bán hàng nội bộ, tổng hợp kết quả và đánh giá chiến lược.
- **Vòng lặp lặp lại, tích hợp công cụ và bộ nhớ:** Tìm hiểu về việc hệ thống dựa trên mô hình tương tác vòng lặp, duy trì trạng thái và bộ nhớ qua các bước để tránh lặp lại và đưa ra quyết định thông minh hơn.
- **Xử lý các chế độ thất bại và tự sửa lỗi:** Khám phá cơ chế tự sửa lỗi mạnh mẽ của hệ thống, bao gồm lặp lại và truy vấn lại, sử dụng công cụ chẩn đoán và dựa vào giám sát của con người.
- **Giới hạn của quyền tự chủ:** Hiểu những giới hạn của Agentic RAG, tập trung vào tự chủ trong phạm vi lĩnh vực, phụ thuộc hạ tầng và tôn trọng các rào chắn an toàn.
- **Trường hợp sử dụng thực tế và giá trị:** Nhận diện các kịch bản mà Agentic RAG nổi bật, chẳng hạn môi trường ưu tiên tính đúng đắn, tương tác cơ sở dữ liệu phức tạp, và quy trình công việc kéo dài.
- **Quản trị, minh bạch và niềm tin:** Tìm hiểu về tầm quan trọng của quản trị và minh bạch, bao gồm lý giải được quá trình suy luận, kiểm soát thiên lệch và giám sát con người.

## Agentic RAG là gì?

Agentic Retrieval-Augmented Generation (Agentic RAG) là một mô hình AI mới nổi, trong đó các mô hình ngôn ngữ lớn (LLMs) tự động lập kế hoạch các bước tiếp theo trong khi truy xuất thông tin từ các nguồn bên ngoài. Khác với mô hình tĩnh “truy xuất rồi đọc”, Agentic RAG liên quan đến các lần gọi lặp lại tới LLM, xen kẽ với các cuộc gọi công cụ hoặc hàm và đầu ra có cấu trúc. Hệ thống đánh giá kết quả, tinh chỉnh truy vấn, sử dụng thêm công cụ nếu cần và tiếp tục chu trình cho tới khi đạt giải pháp thỏa đáng. Phong cách lặp lại kiểu “maker-checker” này cải thiện tính chính xác, xử lý các truy vấn sai lệch và đảm bảo kết quả chất lượng cao.

Hệ thống chủ động tự làm chủ quá trình suy luận, viết lại các truy vấn không thành công, lựa chọn các phương pháp truy xuất khác nhau và tích hợp nhiều công cụ — như tìm kiếm vector trong Azure AI Search, cơ sở dữ liệu SQL hoặc API tùy chỉnh — trước khi hoàn thiện câu trả lời cuối cùng. Đặc điểm phân biệt của hệ thống agentic là khả năng làm chủ quá trình suy luận của chính nó. Các triển khai RAG truyền thống dựa vào các đường dẫn được định sẵn, nhưng hệ thống agentic tự động xác định chuỗi các bước dựa trên chất lượng thông tin thu thập được.

## Định nghĩa Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) là một mô hình mới nổi trong phát triển AI, trong đó LLM không chỉ truy xuất thông tin từ các nguồn dữ liệu bên ngoài mà còn tự động lập kế hoạch các bước tiếp theo. Khác với mô hình tĩnh “truy xuất rồi đọc” hoặc các chuỗi lệnh nhắc rất cẩn thận, Agentic RAG bao gồm một vòng các cuộc gọi lặp lại tới LLM, xen kẽ các cuộc gọi công cụ hoặc hàm và đầu ra có cấu trúc. Ở mỗi bước, hệ thống đánh giá kết quả thu được, quyết định có nên chỉnh sửa truy vấn, sử dụng thêm công cụ nếu cần và tiếp tục chu trình cho tới khi đạt được giải pháp thỏa mãn.

Phương thức vận hành theo kiểu “maker-checker” lặp lại này được thiết kế để tăng độ chính xác, xử lý các truy vấn sai lệch khi làm việc với cơ sở dữ liệu có cấu trúc (ví dụ NL2SQL), và đảm bảo kết quả cân bằng, chất lượng cao. Thay vì chỉ dựa vào chuỗi lệnh nhắc được thiết kế tỉ mỉ, hệ thống chủ động làm chủ quá trình suy luận của mình. Nó có thể viết lại truy vấn thất bại, chọn phương pháp truy xuất khác, và tích hợp nhiều công cụ — như tìm kiếm vector trong Azure AI Search, cơ sở dữ liệu SQL hoặc API tùy chỉnh — trước khi hoàn thiện câu trả lời. Điều này loại bỏ nhu cầu những khung điều phối phức tạp. Thay vào đó, một vòng lặp đơn giản “Gọi LLM → sử dụng công cụ → Gọi LLM → …” cũng có thể tạo ra đầu ra tinh vi và có cơ sở tốt.

![Agentic RAG Core Loop](../../../translated_images/vi/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Làm chủ quá trình suy luận

Điểm đặc biệt làm cho một hệ thống trở nên “agentic” là khả năng làm chủ quá trình suy luận của chính nó. Các triển khai RAG truyền thống thường phụ thuộc vào con người định nghĩa trước đường đi cho mô hình: một chuỗi suy nghĩ phác thảo điều gì cần truy xuất và khi nào.

Nhưng khi hệ thống thật sự agentic, nó quyết định nội bộ cách tiếp cận vấn đề. Nó không chỉ đơn thuần thực thi một kịch bản; nó tự động xác định chuỗi các bước dựa trên chất lượng thông tin mà nó thu thập.

Ví dụ, nếu được yêu cầu tạo chiến lược ra mắt sản phẩm, nó không chỉ dựa vào lời nhắc giải thích toàn bộ quy trình nghiên cứu và quyết định. Thay vào đó, mô hình agentic tự quyết định:

1. Truy xuất các báo cáo xu hướng thị trường hiện tại sử dụng Bing Web Grounding  
2. Xác định dữ liệu đối thủ cạnh tranh liên quan bằng Azure AI Search  
3. Tương quan các chỉ số bán hàng nội bộ trong quá khứ bằng Azure SQL Database  
4. Tổng hợp các phát hiện thành chiến lược thống nhất được điều phối qua Azure OpenAI Service  
5. Đánh giá chiến lược để phát hiện lỗ hổng hay sự không nhất quán, kích hoạt vòng truy xuất tiếp theo nếu cần  

Tất cả các bước này — chỉnh sửa truy vấn, lựa chọn nguồn, lặp lại cho đến khi “hài lòng” với câu trả lời — đều được mô hình quyết định chứ không phải do con người viết trước kịch bản.

## Vòng lặp lặp lại, tích hợp công cụ và bộ nhớ

![Tool Integration Architecture](../../../translated_images/vi/tool-integration.0f569710b5c17c10.webp)

Một hệ thống agentic dựa trên mô hình tương tác vòng lặp:

- **Cuộc gọi ban đầu:** Mục tiêu của người dùng (hay lời nhắc người dùng) được gửi tới LLM.  
- **Triệu hồi công cụ:** Nếu mô hình phát hiện thông tin thiếu hoặc chỉ dẫn mơ hồ, nó chọn một công cụ hoặc phương pháp truy xuất—như truy vấn cơ sở dữ liệu vector (ví dụ Azure AI Search Hybrid search trên dữ liệu riêng tư) hoặc gọi SQL có cấu trúc—để thu thập thêm ngữ cảnh.  
- **Đánh giá & Tinh chỉnh:** Sau khi xem xét dữ liệu trả về, mô hình quyết định liệu thông tin đã đủ chưa. Nếu không, nó chỉnh sửa truy vấn, thử công cụ khác hoặc điều chỉnh cách tiếp cận.  
- **Lặp lại cho đến khi hài lòng:** Chu trình này tiếp tục cho tới khi mô hình xác định đã có đủ sự rõ ràng và bằng chứng để cung cấp câu trả lời cuối cùng, có lý luận chặt chẽ.  
- **Bộ nhớ & Trạng thái:** Vì hệ thống duy trì trạng thái và bộ nhớ qua các bước, nó có thể nhớ lại các lần thử trước và kết quả của chúng, tránh lặp đi lặp lại và đưa ra quyết định thông minh hơn khi tiến hành.

Theo thời gian, điều này tạo ra cảm giác hiểu biết tiến triển, cho phép mô hình điều hướng các nhiệm vụ phức tạp, đa bước mà không cần con người can thiệp hay chỉnh sửa lời nhắc liên tục.

## Xử lý các chế độ thất bại và tự sửa lỗi

Sự tự chủ của Agentic RAG cũng đi kèm với cơ chế tự sửa lỗi mạnh mẽ. Khi hệ thống đối mặt với ngõ cụt — chẳng hạn truy xuất tài liệu không liên quan hoặc truy vấn sai lệch — nó có thể:

- **Lặp lại và truy vấn lại:** Thay vì trả về kết quả kém giá trị, mô hình thử các chiến lược tìm kiếm mới, viết lại các truy vấn cơ sở dữ liệu hoặc xem xét các bộ dữ liệu thay thế.  
- **Sử dụng công cụ chẩn đoán:** Hệ thống có thể kích hoạt thêm các chức năng giúp gỡ lỗi quá trình suy luận hoặc xác nhận tính chính xác của dữ liệu thu thập được. Các công cụ như Azure AI Tracing sẽ quan trọng để đảm bảo khả năng quan sát và giám sát mạnh mẽ.  
- **Dựa vào giám sát của con người:** Ở các tình huống quan trọng hoặc khi thất bại liên tục, mô hình có thể đánh dấu sự không chắc chắn và yêu cầu sự chỉ dẫn của con người. Khi con người cung cấp phản hồi chỉnh sửa, mô hình có thể học và áp dụng bài học đó trong các lần sau.

Cách tiếp cận lặp lại và động này cho phép mô hình cải tiến liên tục, đảm bảo nó không chỉ là hệ thống một lần mà là hệ thống học hỏi từ sai sót trong phiên làm việc hiện tại.

![Self Correction Mechanism](../../../translated_images/vi/self-correction.da87f3783b7f174b.webp)

## Giới hạn của quyền tự chủ

Mặc dù tự chủ trong một nhiệm vụ nhất định, Agentic RAG không tương đương với Trí tuệ Nhân tạo Tổng quát (AGI). Khả năng “agentic” bị giới hạn ở các công cụ, nguồn dữ liệu và chính sách do con người phát triển cung cấp. Nó không thể tự tạo ra công cụ riêng hay bước ra ngoài các giới hạn lĩnh vực đã thiết lập. Thay vào đó, nó xuất sắc trong việc điều phối linh hoạt các tài nguyên hiện có.

Các điểm khác biệt chính so với các dạng AI tiên tiến hơn bao gồm:

1. **Tự chủ đặc thù lĩnh vực:** Hệ thống Agentic RAG tập trung đạt các mục tiêu do người dùng định nghĩa trong phạm vi lĩnh vực đã biết, sử dụng các chiến lược như viết lại truy vấn hoặc chọn công cụ để cải thiện kết quả.  
2. **Phụ thuộc hạ tầng:** Khả năng hệ thống dựa vào công cụ và dữ liệu được nhà phát triển tích hợp. Nó không thể vượt ra ngoài giới hạn này nếu không có sự can thiệp của con người.  
3. **Tôn trọng các rào chắn an toàn:** Các hướng dẫn đạo đức, quy định tuân thủ và chính sách kinh doanh vẫn rất quan trọng. Quyền tự do của agent luôn bị kiểm soát bởi các biện pháp an toàn và cơ chế giám sát (hy vọng là như vậy).

## Các trường hợp sử dụng thực tế và giá trị

Agentic RAG tỏa sáng trong các kịch bản yêu cầu tinh chỉnh lặp lại và độ chính xác cao:

1. **Môi trường ưu tiên tính đúng đắn:** Trong kiểm tra tuân thủ, phân tích quy định hoặc nghiên cứu pháp lý, mô hình agentic có thể liên tục xác minh sự thật, tham khảo nhiều nguồn và viết lại truy vấn cho đến khi tạo ra câu trả lời được kiểm chứng kỹ lưỡng.  
2. **Tương tác cơ sở dữ liệu phức tạp:** Khi làm việc với dữ liệu có cấu trúc, nơi các truy vấn thường thất bại hoặc cần điều chỉnh, hệ thống có thể tự động tinh chỉnh truy vấn bằng Azure SQL hoặc Microsoft Fabric OneLake, đảm bảo kết quả cuối cùng phù hợp ý định người dùng.  
3. **Quy trình công việc kéo dài:** Các phiên làm việc lâu có thể tiến triển khi thông tin mới xuất hiện. Agentic RAG có thể liên tục cập nhật dữ liệu, điều chỉnh chiến lược khi học thêm về không gian vấn đề.

## Quản trị, minh bạch và niềm tin

Khi những hệ thống này trở nên tự chủ hơn trong suy luận, quản trị và minh bạch trở nên cực kỳ quan trọng:

- **Giải thích được suy luận:** Mô hình có thể cung cấp dấu vết kiểm toán các truy vấn đã thực hiện, nguồn đã tra cứu và các bước suy luận đã áp dụng để đạt kết luận. Các công cụ như Azure AI Content Safety và Azure AI Tracing / GenAIOps giúp duy trì tính minh bạch và giảm thiểu rủi ro.  
- **Kiểm soát thiên lệch và cân bằng dữ liệu:** Nhà phát triển có thể điều chỉnh chiến lược truy xuất để đảm bảo nguồn dữ liệu cân bằng, đại diện, và thường xuyên kiểm tra đầu ra để phát hiện thiên lệch hoặc mô hình lệch lạc bằng các mô hình tùy chỉnh cho các tổ chức khoa học dữ liệu nâng cao sử dụng Azure Machine Learning.  
- **Giám sát của con người và tuân thủ:** Đối với các nhiệm vụ nhạy cảm, đánh giá của con người vẫn là bắt buộc. Agentic RAG không thay thế quyết định của con người trong các quyết định quan trọng mà hỗ trợ bằng cách cung cấp các lựa chọn đã kiểm tra kỹ càng hơn.

Việc có các công cụ cung cấp hồ sơ rõ ràng về hành động là rất cần thiết. Nếu không có, việc gỡ lỗi một quy trình đa bước sẽ rất khó khăn. Xem ví dụ sau đây từ Literal AI (công ty đứng sau Chainlit) về một lần chạy Agent:

![AgentRunExample](../../../translated_images/vi/AgentRunExample.471a94bc40cbdc0c.webp)

## Kết luận

Agentic RAG đại diện cho sự tiến hóa tự nhiên trong cách hệ thống AI xử lý các nhiệm vụ phức tạp, dữ liệu lớn. Bằng cách áp dụng mô hình tương tác vòng lặp, tự động chọn công cụ và tinh chỉnh truy vấn cho đến khi đạt được kết quả chất lượng cao, hệ thống vượt qua kiểu làm theo lời nhắc tĩnh sang thành người ra quyết định thích ứng, nhận biết bối cảnh hơn. Dù vẫn bị giới hạn bởi hạ tầng và quy tắc đạo đức do con người định nghĩa, các năng lực agentic này cho phép tương tác AI phong phú, linh hoạt và hữu ích hơn cho cả doanh nghiệp và người dùng cuối.

### Có thêm câu hỏi về Agentic RAG?

Tham gia [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) để gặp gỡ các học viên khác, tham dự giờ làm việc và được giải đáp các câu hỏi về AI Agents.

## Tài nguyên bổ sung
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Triển khai Tạo sinh Tăng cường Tìm kiếm (RAG) với Dịch vụ Azure OpenAI: Tìm hiểu cách sử dụng dữ liệu của riêng bạn với Dịch vụ Azure OpenAI. Mô-đun Microsoft Learn này cung cấp hướng dẫn toàn diện về việc triển khai RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Đánh giá các ứng dụng AI tạo sinh với Microsoft Foundry: Bài viết này đề cập đến việc đánh giá và so sánh các mô hình trên các bộ dữ liệu công khai, bao gồm các ứng dụng AI tác nhân và kiến trúc RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Agentic RAG là gì | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Hướng Dẫn Toàn Diện về Tạo sinh Tăng cường Tìm kiếm Dựa trên Tác nhân – Tin tức từ thế hệ RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: tăng cường RAG của bạn với tái cấu trúc truy vấn và tự truy vấn! Sách Nấu ăn AI Mã nguồn mở của Hugging Face</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Thêm Các Lớp Agentic vào RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Tương Lai của Trợ Lý Kiến Thức: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Cách Xây dựng Hệ Thống Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Sử dụng Dịch vụ Tác nhân Microsoft Foundry để mở rộng các tác nhân AI của bạn</a>

### Bài Báo Học Thuật

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Tự Cải Thiện: Cải Thiện Lặp đi lặp lại với Phản hồi Tự Động</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Các Tác nhân Ngôn ngữ với Học Củng cố Bằng Lời Nói</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Các Mô Hình Ngôn ngữ Lớn Có Thể Tự Sửa Lỗi với Đánh Giá Tương Tác Công Cụ</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Tạo sinh Tăng cường Tìm kiếm dựa trên Tác nhân: Khảo sát về Agentic RAG</a>

## Bài Học Trước

[Kiểu Thiết Kế Sử Dụng Công Cụ](../04-tool-use/README.md)

## Bài Học Tiếp Theo

[Xây dựng Các Tác nhân AI Đáng Tin Cậy](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ gốc của nó nên được coi là nguồn chính xác và đáng tin cậy. Đối với các thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hoặc diễn giải sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->