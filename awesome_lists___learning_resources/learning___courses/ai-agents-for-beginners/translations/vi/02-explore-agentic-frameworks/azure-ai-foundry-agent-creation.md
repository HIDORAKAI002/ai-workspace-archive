# Phát triển dịch vụ tác nhân AI Azure

Trong bài tập này, bạn sẽ sử dụng các công cụ của dịch vụ Azure AI Agent trong [cổng Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) để tạo một tác nhân cho Đặt vé máy bay. Tác nhân sẽ có khả năng tương tác với người dùng và cung cấp thông tin về chuyến bay.

## Yêu cầu tiên quyết

Để hoàn thành bài tập này, bạn cần những thứ sau:
1. Một tài khoản Azure với đăng ký đang hoạt động. [Tạo tài khoản miễn phí](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Bạn cần có quyền tạo một trung tâm Microsoft Foundry hoặc có người tạo sẵn cho bạn.
    - Nếu vai trò của bạn là Contributor hoặc Owner, bạn có thể làm theo các bước trong hướng dẫn này.

## Tạo một trung tâm Microsoft Foundry

> **Lưu ý:** Microsoft Foundry trước đây được gọi là Azure AI Studio.

1. Làm theo các hướng dẫn từ bài đăng trên blog [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) để tạo một trung tâm Microsoft Foundry.
2. Khi dự án của bạn được tạo, đóng mọi mẹo hiển thị và xem lại trang dự án trong cổng Microsoft Foundry, trang này sẽ có giao diện tương tự hình ảnh sau:

    ![Microsoft Foundry Project](../../../translated_images/vi/azure-ai-foundry.88d0c35298348c2f.webp)

## Triển khai mô hình

1. Ở khung bên trái cho dự án của bạn, trong phần **My assets**, chọn trang **Models + endpoints**.
2. Ở trang **Models + endpoints**, trong tab **Model deployments**, trong menu **+ Deploy model**, chọn **Deploy base model**.
3. Tìm kiếm mô hình `gpt-4o-mini` trong danh sách, sau đó chọn và xác nhận.

    > **Lưu ý**: Giảm TPM giúp tránh sử dụng quá mức hạn ngạch trong đăng ký bạn đang sử dụng.

    ![Model Deployed](../../../translated_images/vi/model-deployment.3749c53fb81e18fd.webp)

## Tạo một tác nhân

Bây giờ bạn đã triển khai mô hình, bạn có thể tạo một tác nhân. Tác nhân là một mô hình AI hội thoại có thể dùng để tương tác với người dùng.

1. Ở khung bên trái cho dự án của bạn, trong phần **Build & Customize**, chọn trang **Agents**.
2. Nhấp **+ Create agent** để tạo một tác nhân mới. Trong hộp thoại **Agent Setup**:
    - Nhập tên cho tác nhân, ví dụ `FlightAgent`.
    - Đảm bảo mô hình triển khai `gpt-4o-mini` bạn đã tạo trước đó được chọn.
    - Thiết lập **Instructions** theo lời nhắc mà bạn muốn tác nhân thực hiện. Đây là một ví dụ:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> Để có lời nhắc chi tiết, bạn có thể tham khảo [kho lưu trữ này](https://github.com/ShivamGoyal03/RoamMind) để biết thêm thông tin.
    
> Hơn nữa, bạn có thể thêm **Knowledge Base** và **Actions** để tăng cường khả năng của tác nhân trong việc cung cấp thêm thông tin và thực hiện các tác vụ tự động dựa trên yêu cầu của người dùng. Trong bài tập này, bạn có thể bỏ qua các bước này.
    
![Agent Setup](../../../translated_images/vi/agent-setup.9bbb8755bf5df672.webp)

3. Để tạo một tác nhân đa AI mới, chỉ cần nhấn **New Agent**. Tác nhân mới tạo sẽ được hiển thị trên trang Agents.


## Kiểm tra tác nhân

Sau khi tạo tác nhân, bạn có thể kiểm tra xem nó phản hồi ra sao với các truy vấn của người dùng trong khu vui chơi (playground) của cổng Microsoft Foundry.

1. Ở đầu khung **Setup** cho tác nhân của bạn, chọn **Try in playground**.
2. Trong khung **Playground**, bạn có thể tương tác với tác nhân bằng cách nhập câu hỏi trong cửa sổ chat. Ví dụ, bạn có thể yêu cầu tác nhân tìm chuyến bay từ Seattle đến New York vào ngày 28.

    > **Lưu ý**: Tác nhân có thể không đưa ra các câu trả lời chính xác, vì không có dữ liệu thời gian thực nào được sử dụng trong bài tập này. Mục đích là để kiểm tra khả năng của tác nhân trong việc hiểu và phản hồi các truy vấn dựa trên hướng dẫn đã cung cấp.

    ![Agent Playground](../../../translated_images/vi/agent-playground.dc146586de715010.webp)

3. Sau khi kiểm tra tác nhân, bạn có thể tùy chỉnh thêm bằng cách thêm nhiều ý định, dữ liệu đào tạo và hành động để nâng cao năng lực của nó.

## Dọn dẹp tài nguyên

Khi bạn đã hoàn thành việc kiểm tra tác nhân, bạn có thể xóa nó để tránh phát sinh chi phí không mong muốn.
1. Mở [Azure portal](https://portal.azure.com) và xem nội dung của nhóm tài nguyên nơi bạn đã triển khai các tài nguyên trung tâm sử dụng trong bài tập này.
2. Trên thanh công cụ, chọn **Delete resource group**.
3. Nhập tên nhóm tài nguyên và xác nhận bạn muốn xóa nó.

## Tài nguyên

- [Tài liệu Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Cổng Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Bắt đầu với Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Khái niệm cơ bản về các tác nhân AI trên Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sự không chính xác. Tài liệu gốc bằng ngôn ngữ bản địa nên được coi là nguồn tham khảo chính xác nhất. Đối với các thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->