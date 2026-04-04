# Nghiên cứu trường hợp: Phơi bày REST API trong API Management dưới dạng MCP server

Azure API Management là một dịch vụ cung cấp một Gateway trên đỉnh các API Endpoints của bạn. Cách nó hoạt động là Azure API Management đóng vai trò như một proxy phía trước các API của bạn và có thể quyết định làm gì với các yêu cầu đến.

Bằng cách sử dụng nó, bạn sẽ có một loạt các tính năng như:

- **Bảo mật**, bạn có thể sử dụng mọi thứ từ API keys, JWT đến managed identity.
- **Giới hạn tỷ lệ**, một tính năng tuyệt vời là có thể quyết định số cuộc gọi được phép qua trong một đơn vị thời gian nhất định. Điều này giúp đảm bảo tất cả người dùng đều có trải nghiệm tốt và dịch vụ của bạn không bị quá tải với các yêu cầu.
- **Mở rộng & Cân bằng tải**. Bạn có thể thiết lập một số endpoints để cân bằng tải và cũng có thể quyết định cách "cân bằng tải".
- **Tính năng AI như semantic caching**, giới hạn token và theo dõi token và nhiều hơn nữa. Đây là các tính năng tuyệt vời giúp cải thiện khả năng phản hồi cũng như giúp bạn kiểm soát chi tiêu token. [Đọc thêm tại đây](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities). 

## Tại sao lại dùng MCP + Azure API Management?

Model Context Protocol đang nhanh chóng trở thành tiêu chuẩn cho các ứng dụng AI agentic và cách phơi bày công cụ cũng như dữ liệu một cách nhất quán. Azure API Management là lựa chọn tự nhiên khi bạn cần "quản lý" các API. MCP Servers thường tích hợp với các API khác để giải quyết các yêu cầu đến một công cụ chẳng hạn. Do đó, kết hợp Azure API Management và MCP rất hợp lý.

## Tổng quan

Trong trường hợp sử dụng cụ thể này, chúng ta sẽ học cách phơi bày các API endpoints dưới dạng MCP Server. Bằng cách này, chúng ta có thể dễ dàng làm cho các điểm cuối này trở thành một phần của ứng dụng agentic đồng thời tận dụng các tính năng từ Azure API Management.

## Tính năng chính

- Bạn chọn các phương thức endpoint muốn phơi bày dưới dạng công cụ.
- Các tính năng bổ sung bạn nhận được phụ thuộc vào những gì bạn cấu hình trong phần chính sách cho API của mình. Nhưng ở đây chúng tôi sẽ chỉ bạn cách thêm giới hạn tỷ lệ.

## Bước chuẩn bị: nhập API

Nếu bạn đã có một API trong Azure API Management thì tuyệt, bạn có thể bỏ qua bước này. Nếu chưa, hãy xem liên kết này, [nhập API vào Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Phơi bày API dưới dạng MCP Server

Để phơi bày các API endpoints, hãy làm theo các bước sau:

1. Truy cập vào Azure Portal qua địa chỉ <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
Đi đến instance API Management của bạn.

1. Trong menu bên trái, chọn APIs > MCP Servers > + Create new MCP Server.

1. Trong API, chọn một REST API để phơi bày dưới dạng MCP server.

1. Chọn một hoặc nhiều API Operations để phơi bày làm công cụ. Bạn có thể chọn tất cả các thao tác hoặc chỉ những thao tác cụ thể.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Chọn **Create**.

1. Truy cập vào tùy chọn menu **APIs** và **MCP Servers**, bạn sẽ thấy như sau:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP server đã được tạo và các thao tác API được phơi bày như công cụ. MCP server được liệt kê trong bảng MCP Servers. Cột URL hiển thị điểm cuối của MCP server mà bạn có thể gọi để thử nghiệm hoặc trong ứng dụng client.

## Tùy chọn: Cấu hình chính sách

Azure API Management có khái niệm cốt lõi là các chính sách, nơi bạn thiết lập các quy tắc khác nhau cho các endpoint của mình như giới hạn tỷ lệ hoặc semantic caching. Các chính sách này được viết bằng XML.

Dưới đây là cách bạn có thể thiết lập một chính sách để giới hạn tỷ lệ cho MCP Server của bạn:

1. Trong portal, dưới APIs, chọn **MCP Servers**.

1. Chọn MCP server bạn đã tạo.

1. Trong menu bên trái, dưới MCP, chọn **Policies**.

1. Trong trình chỉnh sửa chính sách, thêm hoặc chỉnh sửa các chính sách bạn muốn áp dụng cho các công cụ của MCP server. Các chính sách được định nghĩa theo định dạng XML. Ví dụ, bạn có thể thêm một chính sách để giới hạn cuộc gọi tới các công cụ của MCP server (trong ví dụ này, 5 cuộc gọi mỗi 30 giây cho mỗi địa chỉ IP client). Dưới đây là XML sẽ gây ra giới hạn tỷ lệ:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Đây là hình ảnh của trình chỉnh sửa chính sách:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Thử nghiệm

Hãy đảm bảo MCP Server của chúng ta hoạt động như dự kiến.

Cho việc này, chúng ta sẽ dùng Visual Studio Code và GitHub Copilot trong chế độ Agent. Chúng ta sẽ thêm MCP server vào một *mcp.json*. Bằng cách làm vậy, Visual Studio Code sẽ đóng vai trò như một client có khả năng agentic và người dùng cuối sẽ có thể nhập lệnh và tương tác với server đó.

Hãy xem cách thêm MCP server trong Visual Studio Code:

1. Sử dụng lệnh MCP: **Add Server command from the Command Palette**.

1. Khi được nhắc, chọn loại server: **HTTP (HTTP hoặc Server Sent Events)**.

1. Nhập URL của MCP server trong API Management. Ví dụ: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (cho endpoint SSE) hoặc **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (cho endpoint MCP), chú ý dấu hiệu khác biệt giữa các giao thức là `/sse` hoặc `/mcp`.

1. Nhập một server ID theo ý bạn. Đây không phải giá trị quan trọng nhưng sẽ giúp bạn nhớ instance server này là gì.

1. Chọn lưu cấu hình vào workspace settings hoặc user settings.

  - **Workspace settings** - Cấu hình server được lưu vào file .vscode/mcp.json chỉ có trong workspace hiện tại.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    hoặc nếu bạn chọn streaming HTTP làm giao thức sẽ hơi khác một chút:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - Cấu hình server được thêm vào file *settings.json* toàn cục của bạn và có thể dùng trong mọi workspace. Cấu hình trông như sau:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Bạn cũng cần thêm cấu hình, một header để xác thực đúng với Azure API Management. Nó dùng header gọi là **Ocp-Apim-Subscription-Key**.

    - Dưới đây là cách thêm header vào settings:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), điều này sẽ gây ra một lời nhắc hỏi bạn giá trị khóa API mà bạn có thể tìm thấy trong Azure Portal cho instance Azure API Management của bạn.

   - Để thêm nó vào *mcp.json* thay thế, bạn có thể thêm như sau:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Sử dụng chế độ Agent

Bây giờ chúng ta đã thiết lập xong trong settings hoặc trong *.vscode/mcp.json*. Hãy thử nó.

Sẽ có một biểu tượng Tools như thế này, nơi các công cụ được phơi bày từ server của bạn được liệt kê:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Nhấn biểu tượng tools và bạn sẽ thấy danh sách các công cụ như sau:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Nhập một lệnh nhắc trong chat để gọi công cụ. Ví dụ, nếu bạn đã chọn một công cụ để lấy thông tin về một đơn hàng, bạn có thể hỏi agent về đơn hàng đó. Đây là ví dụ về lệnh nhắc:

    ```text
    get information from order 2
    ```

    Bây giờ bạn sẽ thấy biểu tượng công cụ hỏi bạn có muốn tiếp tục gọi công cụ hay không. Chọn để chạy công cụ, bạn sẽ thấy kết quả đầu ra như sau:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **những gì bạn thấy ở trên phụ thuộc vào công cụ bạn đã thiết lập, nhưng ý tưởng là bạn nhận được phản hồi dạng văn bản như trên**


## Tài liệu tham khảo

Dưới đây là cách bạn có thể tìm hiểu thêm:

- [Hướng dẫn về Azure API Management và MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Ví dụ Python: Bảo mật các MCP server từ xa sử dụng Azure API Management (thử nghiệm)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Phòng lab ủy quyền client MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Sử dụng phần mở rộng Azure API Management cho VS Code để nhập và quản lý APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Đăng ký và khám phá MCP servers từ xa trong Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Repo tuyệt vời trình bày nhiều khả năng AI với Azure API Management
- [Các workshop AI Gateway](https://azure-samples.github.io/AI-Gateway/) Chứa các workshop sử dụng Azure Portal, là cách tuyệt vời để bắt đầu đánh giá khả năng AI.

## Tiếp theo

- Quay lại: [Tổng quan các nghiên cứu trường hợp](./README.md)
- Tiếp theo: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ mẹ đẻ nên được coi là nguồn thông tin chính thống. Đối với các thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu nhầm hoặc diễn giải sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->