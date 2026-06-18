# 🌟 Bài học từ những Người áp dụng sớm

[![Lessons from MCP Early Adopters](../../../translated_images/vi/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Nhấp vào hình trên để xem video bài học này)_

## 🎯 Những gì Module này bao phủ

Module này khám phá cách các tổ chức và nhà phát triển thực tế đang tận dụng Model Context Protocol (MCP) để giải quyết các thách thức thực tế và thúc đẩy đổi mới. Thông qua các nghiên cứu trường hợp chi tiết, dự án thực hành và ví dụ thực tế, bạn sẽ khám phá cách MCP cho phép tích hợp AI an toàn, có thể mở rộng kết nối các mô hình ngôn ngữ, công cụ và dữ liệu doanh nghiệp.

### 📚 Xem MCP trong Thực tế

Muốn xem các nguyên tắc này được áp dụng vào các công cụ sẵn sàng sản xuất? Hãy xem [**10 Máy chủ MCP Microsoft Đang Thay đổi Năng suất Nhà phát triển**](microsoft-mcp-servers.md), trình bày các máy chủ MCP Microsoft thực tế bạn có thể sử dụng ngay hôm nay.

## Tổng quan

Bài học này khám phá cách các người áp dụng sớm đã tận dụng Model Context Protocol (MCP) để giải quyết các thách thức trong thế giới thực và thúc đẩy đổi mới trong các ngành công nghiệp. Thông qua các nghiên cứu trường hợp chi tiết và dự án thực hành, bạn sẽ thấy MCP cho phép tích hợp AI tiêu chuẩn hóa, an toàn và có thể mở rộng — kết nối các mô hình ngôn ngữ lớn, công cụ và dữ liệu doanh nghiệp trong một khuôn khổ thống nhất. Bạn sẽ có kinh nghiệm thực tế trong việc thiết kế và xây dựng giải pháp dựa trên MCP, học hỏi từ các mẫu triển khai đã chứng minh và khám phá các thực tiễn tốt nhất khi triển khai MCP trong môi trường sản xuất. Bài học cũng làm nổi bật các xu hướng mới nổi, hướng đi tương lai và các tài nguyên mã nguồn mở giúp bạn duy trì vị thế dẫn đầu công nghệ MCP và hệ sinh thái đang phát triển của nó.

## Mục tiêu học tập

- Phân tích các triển khai MCP thực tế trong các ngành khác nhau
- Thiết kế và xây dựng các ứng dụng hoàn chỉnh dựa trên MCP
- Khám phá các xu hướng mới nổi và hướng phát triển tương lai của công nghệ MCP
- Áp dụng các thực tiễn tốt nhất trong các kịch bản phát triển thực tế

## Các triển khai MCP trong thực tế

### Nghiên cứu trường hợp 1: Tự động hóa Hỗ trợ Khách hàng Doanh nghiệp

Một tập đoàn đa quốc gia đã triển khai giải pháp dựa trên MCP để tiêu chuẩn hóa các tương tác AI trên các hệ thống hỗ trợ khách hàng của họ. Điều này cho phép họ:

- Tạo giao diện thống nhất cho nhiều nhà cung cấp LLM
- Duy trì quản lý yêu cầu nhất quán trên các phòng ban
- Triển khai các kiểm soát an ninh và tuân thủ mạnh mẽ
- Dễ dàng chuyển đổi giữa các mô hình AI khác nhau dựa trên nhu cầu cụ thể

**Triển khai kỹ thuật:**

```python
# Triển khai máy chủ MCP Python cho hỗ trợ khách hàng
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Cấu hình ghi nhật ký
logging.basicConfig(level=logging.INFO)

async def main():
    # Tạo cấu hình máy chủ
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Khởi tạo máy chủ MCP
    server = create_server(config)
    
    # Đăng ký tài nguyên cơ sở tri thức
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Đăng ký mẫu lệnh nhắc
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Đăng ký công cụ hỗ trợ
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Khởi động máy chủ với giao thức HTTP
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```

**Kết quả:** Giảm 30% chi phí mô hình, cải thiện 45% độ nhất quán phản hồi, và nâng cao tuân thủ trong hoạt động toàn cầu.

### Nghiên cứu trường hợp 2: Trợ lý Chẩn đoán Y tế

Một nhà cung cấp dịch vụ y tế phát triển hạ tầng MCP để tích hợp nhiều mô hình AI y tế chuyên biệt đồng thời đảm bảo dữ liệu bệnh nhân nhạy cảm được bảo vệ:

- Chuyển đổi liền mạch giữa mô hình y tế tổng quát và chuyên gia
- Kiểm soát quyền riêng tư nghiêm ngặt và ghi chép kiểm toán
- Tích hợp với các hệ thống Hồ sơ Sức khỏe Điện tử (EHR) hiện có
- Quản lý yêu cầu nhất quán cho thuật ngữ y học

**Triển khai kỹ thuật:**

```csharp
// C# MCP host application implementation in healthcare application
using Microsoft.Extensions.DependencyInjection;
using ModelContextProtocol.SDK.Client;
using ModelContextProtocol.SDK.Security;
using ModelContextProtocol.SDK.Resources;

public class DiagnosticAssistant
{
    private readonly MCPHostClient _mcpClient;
    private readonly PatientContext _patientContext;
    
    public DiagnosticAssistant(PatientContext patientContext)
    {
        _patientContext = patientContext;
        
        // Configure MCP client with healthcare-specific settings
        var clientOptions = new ClientOptions
        {
            Name = "Healthcare Diagnostic Assistant",
            Version = "1.0.0",
            Security = new SecurityOptions
            {
                Encryption = EncryptionLevel.Medical,
                AuditEnabled = true
            }
        };
        
        _mcpClient = new MCPHostClientBuilder()
            .WithOptions(clientOptions)
            .WithTransport(new HttpTransport("https://healthcare-mcp.example.org"))
            .WithAuthentication(new HIPAACompliantAuthProvider())
            .Build();
    }
    
    public async Task<DiagnosticSuggestion> GetDiagnosticAssistance(
        string symptoms, string patientHistory)
    {
        // Create request with appropriate resources and tool access
        var resourceRequest = new ResourceRequest
        {
            Name = "patient_records",
            Parameters = new Dictionary<string, object>
            {
                ["patientId"] = _patientContext.PatientId,
                ["requestingProvider"] = _patientContext.ProviderId
            }
        };
        
        // Request diagnostic assistance using appropriate prompt
        var response = await _mcpClient.SendPromptRequestAsync(
            promptName: "diagnostic_assistance",
            parameters: new Dictionary<string, object>
            {
                ["symptoms"] = symptoms,
                patientHistory = patientHistory,
                relevantGuidelines = _patientContext.GetRelevantGuidelines()
            });
            
        return DiagnosticSuggestion.FromMCPResponse(response);
    }
}
```

**Kết quả:** Cải thiện gợi ý chẩn đoán cho bác sĩ đồng thời duy trì tuân thủ HIPAA đầy đủ và giảm đáng kể việc chuyển đổi bối cảnh giữa các hệ thống.

### Nghiên cứu trường hợp 3: Phân tích Rủi ro Dịch vụ Tài chính

Một tổ chức tài chính đã sử dụng MCP để tiêu chuẩn hóa các quy trình phân tích rủi ro qua các phòng ban khác nhau:

- Tạo giao diện thống nhất cho các mô hình rủi ro tín dụng, phát hiện gian lận và rủi ro đầu tư
- Áp dụng các kiểm soát truy cập nghiêm ngặt và quản lý phiên bản mô hình
- Đảm bảo có thể kiểm tra tất cả các khuyến nghị AI
- Duy trì định dạng dữ liệu nhất quán trên các hệ thống đa dạng

**Triển khai kỹ thuật:**

```java
// Máy chủ MCP Java cho đánh giá rủi ro tài chính
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Tạo máy chủ MCP với các tính năng tuân thủ tài chính
        MCPServer server = new MCPServerBuilder()
            .withModelProviders(
                new ModelProvider("risk-assessment-primary", new AzureOpenAIProvider()),
                new ModelProvider("risk-assessment-audit", new LocalLlamaProvider())
            )
            .withPromptTemplateDirectory("./compliance/templates")
            .withAccessControls(new SOCCompliantAccessControl())
            .withDataEncryption(EncryptionStandard.FINANCIAL_GRADE)
            .withVersionControl(true)
            .withAuditLogging(new DatabaseAuditLogger())
            .build();
            
        server.addRequestValidator(new FinancialDataValidator());
        server.addResponseFilter(new PII_RedactionFilter());
        
        server.start(9000);
        
        System.out.println("Financial Risk MCP Server running on port 9000");
    }
}
```

**Kết quả:** Nâng cao tuân thủ quy định, đẩy nhanh 40% chu kỳ triển khai mô hình, và cải thiện độ nhất quán đánh giá rủi ro trong các phòng ban.

### Nghiên cứu trường hợp 4: Máy chủ MCP Microsoft Playwright cho Tự động hóa Trình duyệt

Microsoft phát triển [máy chủ MCP Playwright](https://github.com/microsoft/playwright-mcp) để cho phép tự động hóa trình duyệt an toàn, tiêu chuẩn qua Model Context Protocol. Máy chủ sẵn sàng sản xuất này cho phép các tác nhân AI và LLM tương tác với trình duyệt web một cách có kiểm soát, ghi chép được và có khả năng mở rộng — hỗ trợ các trường hợp sử dụng như kiểm thử web tự động, trích xuất dữ liệu và quy trình công việc toàn diện.

> **🎯 Công cụ Sẵn sàng Sản xuất**
> 
> Nghiên cứu trường hợp này trình bày một máy chủ MCP thực tế bạn có thể sử dụng ngay hôm nay! Tìm hiểu thêm về Máy chủ Playwright MCP và 9 máy chủ MCP Microsoft sẵn sàng sản xuất khác trong [**Hướng dẫn Máy chủ MCP Microsoft**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Tính năng chính:**
- Cung cấp khả năng tự động hóa trình duyệt (điều hướng, điền biểu mẫu, chụp ảnh màn hình, v.v.) như các công cụ MCP
- Triển khai kiểm soát truy cập nghiêm ngặt và phân vùng sandbox để ngăn chặn hành động trái phép
- Cung cấp nhật ký kiểm toán chi tiết cho mọi tương tác trình duyệt
- Hỗ trợ tích hợp với Azure OpenAI và các nhà cung cấp LLM khác cho tự động hóa do tác nhân điều khiển
- Cung cấp sức mạnh cho Tác nhân Lập trình GitHub Copilot với khả năng duyệt web

**Triển khai kỹ thuật:**

```typescript
// TypeScript: Đăng ký công cụ tự động hóa trình duyệt Playwright trong máy chủ MCP
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Đăng ký một công cụ để điều hướng đến URL và chụp ảnh màn hình
server.tools.register(
  new ToolDefinition({
    name: 'navigate_and_screenshot',
    description: 'Navigate to a URL and capture a screenshot',
    parameters: {
      url: { type: 'string', description: 'The URL to visit' }
    }
  }),
  async ({ url }) => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    return { screenshot };
  }
);

// Khởi động máy chủ MCP
server.listen(8080);
```

**Kết quả:**

- Cho phép tự động hóa trình duyệt an toàn, có lập trình cho các tác nhân AI và LLM
- Giảm nỗ lực kiểm thử thủ công và nâng cao độ bao phủ kiểm thử cho ứng dụng web
- Cung cấp một khuôn khổ tái sử dụng, có thể mở rộng cho tích hợp công cụ dựa trên trình duyệt trong môi trường doanh nghiệp
- Cung cấp sức mạnh cho khả năng duyệt web của GitHub Copilot

**Tham khảo:**

- [Kho lưu trữ GitHub Máy chủ Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Giải pháp AI và Tự động hóa của Microsoft](https://azure.microsoft.com/en-us/products/ai-services/)

### Nghiên cứu trường hợp 5: Azure MCP – Model Context Protocol cấp Doanh nghiệp dưới dạng Dịch vụ

Máy chủ Azure MCP ([https://aka.ms/azmcp](https://aka.ms/azmcp)) là triển khai MCP cấp doanh nghiệp do Microsoft quản lý, được thiết kế để cung cấp khả năng máy chủ MCP có khả năng mở rộng, an toàn và tuân thủ như một dịch vụ đám mây. Azure MCP cho phép các tổ chức nhanh chóng triển khai, quản lý và tích hợp các máy chủ MCP với Azure AI, dịch vụ dữ liệu và bảo mật, giảm gánh nặng vận hành và thúc đẩy việc áp dụng AI.

> **🎯 Công cụ Sẵn sàng Sản xuất**
> 
> Đây là một máy chủ MCP thực tế bạn có thể sử dụng ngay hôm nay! Tìm hiểu thêm về Máy chủ Microsoft Foundry MCP trong [**Hướng dẫn Máy chủ MCP Microsoft**](microsoft-mcp-servers.md).

- Máy chủ MCP được quản lý đầy đủ với khả năng mở rộng, theo dõi và bảo mật tích hợp sẵn
- Tích hợp gốc với Azure OpenAI, Azure AI Search, và các dịch vụ Azure khác
- Xác thực và phân quyền doanh nghiệp qua Microsoft Entra ID
- Hỗ trợ công cụ tùy chỉnh, mẫu yêu cầu và bộ nối tài nguyên
- Tuân thủ các yêu cầu bảo mật và quy định doanh nghiệp

**Triển khai kỹ thuật:**

```yaml
# Example: Azure MCP server deployment configuration (YAML)
apiVersion: mcp.microsoft.com/v1
kind: McpServer
metadata:
  name: enterprise-mcp-server
spec:
  modelProviders:
    - name: azure-openai
      type: AzureOpenAI
      endpoint: https://<your-openai-resource>.openai.azure.com/
      apiKeySecret: <your-azure-keyvault-secret>
  tools:
    - name: document_search
      type: AzureAISearch
      endpoint: https://<your-search-resource>.search.windows.net/
      apiKeySecret: <your-azure-keyvault-secret>
  authentication:
    type: EntraID
    tenantId: <your-tenant-id>
  monitoring:
    enabled: true
    logAnalyticsWorkspace: <your-log-analytics-id>
```

**Kết quả:**  
- Rút ngắn thời gian đưa giá trị cho các dự án AI doanh nghiệp bằng cách cung cấp nền tảng máy chủ MCP sẵn sàng sử dụng, tuân thủ
- Đơn giản hóa tích hợp các LLM, công cụ và nguồn dữ liệu doanh nghiệp
- Tăng cường bảo mật, quan sát và hiệu quả vận hành cho các khối lượng công việc MCP
- Cải thiện chất lượng mã với các thực tiễn tốt nhất từ Azure SDK và các mẫu xác thực hiện hành

**Tham khảo:**  
- [Tài liệu Azure MCP](https://aka.ms/azmcp)
- [Kho lưu trữ GitHub Máy chủ Azure MCP](https://github.com/Azure/azure-mcp)
- [Dịch vụ AI Azure](https://azure.microsoft.com/en-us/products/ai-services/)
- [Trung tâm MCP Microsoft](https://mcp.azure.com)

## Nghiên cứu trường hợp 6: NLWeb  
MCP (Model Context Protocol) là một giao thức mới nổi cho Chatbot và trợ lý AI tương tác với công cụ. Mỗi phiên bản NLWeb cũng là một máy chủ MCP, hỗ trợ một phương thức cốt lõi, ask, được dùng để hỏi một trang web một câu hỏi bằng ngôn ngữ tự nhiên. Phản hồi trả về sử dụng schema.org, một bộ từ vựng phổ biến để mô tả dữ liệu web. Nói một cách đơn giản, MCP là NLWeb cũng như HTTP là với HTML. NLWeb kết hợp giao thức, định dạng Schema.org và mã mẫu để giúp các trang web nhanh chóng tạo các điểm cuối này, mang lại lợi ích cho con người qua giao diện đàm thoại và cho máy qua tương tác tác nhân-tác nhân tự nhiên.

NLWeb có hai thành phần riêng biệt.  
- Một giao thức, rất đơn giản để bắt đầu, để giao diện với trang web bằng ngôn ngữ tự nhiên và một định dạng, sử dụng json và schema.org cho câu trả lời trả về. Xem tài liệu về REST API để biết thêm chi tiết.  
- Một triển khai đơn giản của (1) tận dụng đánh dấu hiện có, cho các trang có thể được trừu tượng như danh sách các mặt hàng (sản phẩm, công thức, điểm tham quan, đánh giá, v.v.). Cùng với bộ công cụ giao diện người dùng, các trang có thể dễ dàng cung cấp giao diện đàm thoại cho nội dung của họ. Xem tài liệu về Life of a chat query để biết thêm chi tiết về cách hoạt động này.

**Tham khảo:**  
- [Tài liệu Azure MCP](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Nghiên cứu trường hợp 7: Máy chủ Microsoft Foundry MCP – Tích hợp Tác nhân AI Doanh nghiệp

Các máy chủ Microsoft Foundry MCP thể hiện cách MCP có thể được sử dụng để điều phối và quản lý tác nhân AI và quy trình công việc trong môi trường doanh nghiệp. Bằng cách tích hợp MCP với Microsoft Foundry, các tổ chức có thể tiêu chuẩn hóa tương tác tác nhân, tận dụng quản lý quy trình của Foundry và đảm bảo triển khai an toàn, có khả năng mở rộng.

> **🎯 Công cụ Sẵn sàng Sản xuất**
> 
> Đây là một máy chủ MCP thực tế bạn có thể sử dụng ngay hôm nay! Tìm hiểu thêm về Máy chủ Microsoft Foundry MCP trong [**Hướng dẫn Máy chủ MCP Microsoft**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Tính năng chính:**
- Truy cập toàn diện vào hệ sinh thái AI của Azure, bao gồm danh mục mô hình và quản lý triển khai
- Lập chỉ mục kiến thức với Azure AI Search cho ứng dụng RAG
- Công cụ đánh giá hiệu suất mô hình AI và đảm bảo chất lượng
- Tích hợp với Microsoft Foundry Catalog và Labs cho các mô hình nghiên cứu tiên tiến
- Quản lý và đánh giá tác nhân cho các kịch bản sản xuất

**Kết quả:**
- Phát triển nhanh nguyên mẫu và giám sát chặt chẽ quy trình làm việc của tác nhân AI
- Tích hợp liền mạch với các dịch vụ AI Azure cho các kịch bản nâng cao
- Giao diện thống nhất để xây dựng, triển khai và theo dõi pipeline tác nhân
- Cải thiện bảo mật, tuân thủ và hiệu quả vận hành cho doanh nghiệp
- Thúc đẩy việc áp dụng AI đồng thời duy trì kiểm soát các quy trình phức tạp do tác nhân điều khiển

**Tham khảo:**
- [Kho lưu trữ GitHub Máy chủ Microsoft Foundry MCP](https://github.com/azure-ai-foundry/mcp-foundry)
- [Tích hợp Tác nhân Azure AI với MCP (Blog Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Nghiên cứu trường hợp 8: Foundry MCP Playground – Thử nghiệm và Nguyên mẫu

Foundry MCP Playground cung cấp môi trường sẵn sàng sử dụng để thử nghiệm với các máy chủ MCP và tích hợp Microsoft Foundry. Các nhà phát triển có thể nhanh chóng tạo nguyên mẫu, kiểm thử và đánh giá các mô hình AI và quy trình tác nhân sử dụng tài nguyên từ Microsoft Foundry Catalog và Labs. Playground đơn giản hóa việc thiết lập, cung cấp các dự án mẫu và hỗ trợ phát triển cộng tác, giúp dễ dàng khám phá các thực tiễn tốt nhất và các kịch bản mới với độ phức tạp tối thiểu. Nó đặc biệt hữu ích cho các nhóm muốn xác thực ý tưởng, chia sẻ thử nghiệm và tăng tốc học tập mà không cần hạ tầng phức tạp. Bằng cách hạ thấp rào cản tiếp cận, playground giúp thúc đẩy đổi mới và đóng góp cộng đồng trong hệ sinh thái MCP và Microsoft Foundry.

**Tham khảo:**

- [Kho lưu trữ GitHub Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Nghiên cứu trường hợp 9: Máy chủ Microsoft Learn Docs MCP – Truy cập Tài liệu Hỗ trợ AI

Máy chủ Microsoft Learn Docs MCP là dịch vụ đám mây cung cấp trợ lý AI truy cập thời gian thực tới tài liệu chính thức của Microsoft thông qua Model Context Protocol. Máy chủ sản xuất này kết nối với hệ sinh thái Microsoft Learn toàn diện và cho phép tìm kiếm ngữ nghĩa trên tất cả nguồn chính thức của Microsoft.

> **🎯 Công cụ Sẵn sàng Sản xuất**
> 
> Đây là một máy chủ MCP thực tế bạn có thể sử dụng ngay hôm nay! Tìm hiểu thêm về Máy chủ Microsoft Learn Docs MCP trong [**Hướng dẫn Máy chủ MCP Microsoft**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Tính năng chính:**
- Truy cập thời gian thực tới tài liệu chính thức của Microsoft, tài liệu Azure và Microsoft 365
- Khả năng tìm kiếm ngữ nghĩa nâng cao hiểu ngữ cảnh và ý định
- Luôn cập nhật thông tin khi nội dung Microsoft Learn được xuất bản
- Bao phủ toàn diện trên Microsoft Learn, tài liệu Azure và nguồn Microsoft 365
- Trả về tối đa 10 đoạn nội dung chất lượng cao với tiêu đề bài viết và URL

**Tại sao nó quan trọng:**
- Giải quyết vấn đề "kiến thức AI lỗi thời" cho công nghệ Microsoft
- Đảm bảo trợ lý AI truy cập các tính năng mới nhất của .NET, C#, Azure và Microsoft 365
- Cung cấp thông tin chính thống, chính hãng cho việc tạo mã chính xác
- Thiết yếu cho nhà phát triển làm việc với công nghệ Microsoft phát triển nhanh

**Kết quả:**
- Cải thiện đáng kể độ chính xác mã do AI tạo ra cho công nghệ Microsoft
- Giảm thời gian tìm kiếm tài liệu và thực tiễn tốt nhất hiện hành
- Nâng cao năng suất nhà phát triển với truy xuất tài liệu có ngữ cảnh
- Tích hợp mượt mà vào quy trình phát triển mà không cần rời khỏi IDE

**Tham khảo:**
- [Kho lưu trữ GitHub Máy chủ Microsoft Learn Docs MCP](https://github.com/MicrosoftDocs/mcp)
- [Tài liệu Microsoft Learn](https://learn.microsoft.com/)

## Dự án thực hành

### Dự án 1: Xây dựng Máy chủ MCP đa Nhà cung cấp

**Mục tiêu:** Tạo một máy chủ MCP có khả năng định tuyến yêu cầu tới nhiều nhà cung cấp mô hình AI dựa trên tiêu chí cụ thể.

**Yêu cầu:**

- Hỗ trợ ít nhất ba nhà cung cấp mô hình khác nhau (ví dụ: OpenAI, Anthropic, mô hình nội bộ)
- Triển khai cơ chế định tuyến dựa trên metadata của yêu cầu
- Tạo hệ thống cấu hình để quản lý thông tin xác thực nhà cung cấp
- Thêm bộ nhớ đệm để tối ưu hiệu năng và chi phí
- Xây dựng bảng điều khiển đơn giản để theo dõi sử dụng

**Các bước triển khai:**

1. Thiết lập hạ tầng máy chủ MCP cơ bản  
2. Triển khai bộ chuyển đổi nhà cung cấp cho từng dịch vụ mô hình AI  
3. Tạo logic định tuyến dựa trên thuộc tính yêu cầu  
4. Thêm cơ chế bộ nhớ đệm cho các yêu cầu thường xuyên  
5. Phát triển bảng điều khiển giám sát  
6. Kiểm thử với các mẫu yêu cầu khác nhau  

**Công nghệ:** Chọn từ Python (.NET/Java/Python tùy thích), Redis cho bộ nhớ đệm và một framework web đơn giản cho bảng điều khiển.

### Dự án 2: Hệ thống Quản lý Mẫu Yêu cầu Doanh nghiệp

**Mục tiêu:** Phát triển hệ thống dựa trên MCP để quản lý, phiên bản và triển khai các mẫu yêu cầu trên toàn tổ chức.

**Yêu cầu:**
- Tạo một kho lưu trữ tập trung cho các mẫu prompt  
- Triển khai hệ thống phiên bản và quy trình phê duyệt  
- Xây dựng khả năng kiểm tra mẫu với các đầu vào mẫu  
- Phát triển kiểm soát truy cập dựa trên vai trò  
- Tạo một API để truy xuất và triển khai mẫu

**Các bước triển khai:**

1. Thiết kế sơ đồ cơ sở dữ liệu để lưu trữ mẫu  
2. Tạo API cốt lõi để thực hiện các thao tác CRUD với mẫu  
3. Triển khai hệ thống quản lý phiên bản  
4. Xây dựng quy trình phê duyệt  
5. Phát triển khung kiểm tra  
6. Tạo giao diện web đơn giản cho quản lý  
7. Tích hợp với máy chủ MCP

**Công nghệ:** Lựa chọn framework backend, cơ sở dữ liệu SQL hoặc NoSQL, và framework frontend cho giao diện quản lý theo ý bạn.

### Dự án 3: Nền Tảng Tạo Nội Dung Dựa trên MCP

**Mục tiêu:** Xây dựng nền tảng tạo nội dung tận dụng MCP để cung cấp kết quả nhất quán cho các loại nội dung khác nhau.

**Yêu cầu:**

- Hỗ trợ nhiều định dạng nội dung (bài viết blog, mạng xã hội, copy marketing)  
- Triển khai tạo nội dung dựa trên mẫu với các tùy chọn tùy chỉnh  
- Tạo hệ thống đánh giá và phản hồi nội dung  
- Theo dõi các chỉ số hiệu suất nội dung  
- Hỗ trợ quản lý phiên bản và lặp lại nội dung

**Các bước triển khai:**

1. Thiết lập hạ tầng client MCP  
2. Tạo các mẫu cho các loại nội dung khác nhau  
3. Xây dựng quy trình tạo nội dung  
4. Triển khai hệ thống đánh giá  
5. Phát triển hệ thống theo dõi chỉ số  
6. Tạo giao diện người dùng cho quản lý mẫu và tạo nội dung

**Công nghệ:** Ngôn ngữ lập trình, framework web và hệ quản trị cơ sở dữ liệu yêu thích của bạn.

## Hướng Phát Triển Tương Lai cho Công Nghệ MCP

### Xu Hướng Nổi Bật

1. **MCP Đa phương thức**  
   - Mở rộng MCP để chuẩn hóa tương tác với các mô hình hình ảnh, âm thanh và video  
   - Phát triển khả năng suy luận đa phương thức  
   - Định dạng prompt chuẩn hóa cho các kiểu phương thức khác nhau

2. **Hạ tầng MCP Liên kết**  
   - Mạng lưới MCP phân tán có thể chia sẻ tài nguyên giữa các tổ chức  
   - Giao thức chuẩn hóa cho việc chia sẻ mô hình an toàn  
   - Kỹ thuật tính toán bảo vệ quyền riêng tư

3. **Chợ MCP**  
   - Hệ sinh thái chia sẻ và kiếm tiền từ các mẫu và plugin MCP  
   - Quy trình đảm bảo chất lượng và chứng nhận  
   - Tích hợp với các chợ mô hình

4. **MCP dành cho Điện toán Biên**  
   - Điều chỉnh tiêu chuẩn MCP cho các thiết bị biên có hạn chế tài nguyên  
   - Giao thức tối ưu cho môi trường băng thông thấp  
   - Triển khai MCP chuyên biệt cho hệ sinh thái IoT

5. **Khung Pháp Lý**  
   - Phát triển phần mở rộng MCP để tuân thủ quy định pháp luật  
   - Đường dẫn kiểm toán tiêu chuẩn và giao diện giải thích minh bạch  
   - Tích hợp với các khung quản trị AI mới nổi

### Giải Pháp MCP từ Microsoft

Microsoft và Azure đã phát triển một số kho lưu trữ mã nguồn mở để hỗ trợ các nhà phát triển triển khai MCP trong nhiều kịch bản khác nhau:

#### Tổ chức Microsoft

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Máy chủ MCP Playwright cho tự động hóa và kiểm thử trình duyệt  
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - Triển khai máy chủ MCP OneDrive để thử nghiệm cục bộ và đóng góp cộng đồng  
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb là bộ sưu tập các giao thức mở và công cụ mã nguồn mở liên quan. Tập trung chính là thiết lập lớp nền tảng cho Web AI

#### Tổ chức Azure-Samples

1. [mcp](https://github.com/Azure-Samples/mcp) - Liên kết các mẫu, công cụ và tài nguyên để xây dựng và tích hợp máy chủ MCP trên Azure dùng nhiều ngôn ngữ khác nhau  
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Ví dụ máy chủ MCP minh họa xác thực theo đặc tả Model Context Protocol hiện tại  
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Trang đích của các triển khai Máy chủ MCP Từ xa trên Azure Functions với liên kết tới kho riêng theo ngôn ngữ  
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Mẫu khởi động nhanh để xây dựng và triển khai máy chủ MCP Từ xa tùy chỉnh bằng Python trên Azure Functions  
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Mẫu khởi động nhanh để xây dựng và triển khai máy chủ MCP Từ xa tùy chỉnh bằng .NET/C# trên Azure Functions  
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Mẫu khởi động nhanh để xây dựng và triển khai máy chủ MCP Từ xa tùy chỉnh bằng TypeScript trên Azure Functions  
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Quản lý API Azure làm Cổng AI cho các máy chủ MCP Từ xa sử dụng Python  
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - Các thí nghiệm APIM ❤️ AI bao gồm khả năng MCP, tích hợp với Azure OpenAI và AI Foundry

Những kho này cung cấp nhiều triển khai, mẫu và tài nguyên để làm việc với Model Context Protocol qua các ngôn ngữ lập trình và dịch vụ Azure khác nhau. Chúng bao phủ các trường hợp sử dụng từ triển khai máy chủ cơ bản đến xác thực, triển khai đám mây, và tích hợp doanh nghiệp.

#### Thư mục Tài nguyên MCP

Thư mục [MCP Resources](https://github.com/microsoft/mcp/tree/main/Resources) trong kho MCP chính thức của Microsoft cung cấp một bộ sưu tập tài nguyên mẫu được tuyển chọn, các mẫu prompt và định nghĩa công cụ dùng với máy chủ Model Context Protocol. Thư mục này được thiết kế để giúp các nhà phát triển bắt đầu nhanh với MCP bằng cách cung cấp các khối xây dựng tái sử dụng và ví dụ thực hành tốt nhất cho:

- **Mẫu Prompt:** Các mẫu prompt sẵn sàng dùng cho các nhiệm vụ và kịch bản AI phổ biến, có thể điều chỉnh cho các triển khai máy chủ MCP của bạn.  
- **Định Nghĩa Công Cụ:** Mẫu sơ đồ và metadata công cụ để chuẩn hóa việc tích hợp và gọi công cụ trên các máy chủ MCP khác nhau.  
- **Mẫu Tài Nguyên:** Định nghĩa tài nguyên mẫu để kết nối với các nguồn dữ liệu, API, và dịch vụ bên ngoài trong khuôn khổ MCP.  
- **Triển khai Tham Khảo:** Mẫu thực tế minh họa cách cấu trúc và tổ chức tài nguyên, prompt và công cụ trong các dự án MCP thực tiễn.

Các tài nguyên này tăng tốc phát triển, thúc đẩy chuẩn hóa và giúp đảm bảo các thực hành tốt nhất khi xây dựng và triển khai giải pháp dựa trên MCP.

#### Thư mục Tài nguyên MCP

- [MCP Resources (Mẫu Prompt, Công cụ và Định nghĩa Tài nguyên)](https://github.com/microsoft/mcp/tree/main/Resources)

### Cơ Hội Nghiên Cứu

- Kỹ thuật tối ưu prompt hiệu quả trong các khung MCP  
- Mô hình bảo mật cho triển khai MCP đa người thuê  
- Đo hiệu năng trên các triển khai MCP khác nhau  
- Phương pháp xác minh chính thức cho các máy chủ MCP

## Kết Luận

Model Context Protocol (MCP) đang nhanh chóng định hình tương lai của việc tích hợp AI chuẩn hóa, an toàn và tương tác xuyên ngành. Qua các bài học thực tiễn và dự án này, bạn đã thấy cách các nhà tiên phong—bao gồm Microsoft và Azure—đang tận dụng MCP để giải quyết các thách thức thực tế, tăng tốc áp dụng AI, đồng thời đảm bảo tuân thủ, bảo mật và mở rộng quy mô. Phương pháp mô-đun của MCP cho phép các tổ chức kết nối các mô hình ngôn ngữ lớn, công cụ và dữ liệu doanh nghiệp trong một khung thống nhất, có thể kiểm tra. Khi MCP tiếp tục phát triển, việc gắn kết với cộng đồng, khám phá các tài nguyên mã nguồn mở, và áp dụng các thực hành tốt nhất sẽ là chìa khóa để xây dựng các giải pháp AI mạnh mẽ, sẵn sàng cho tương lai.

## Tài Nguyên Bổ Sung

- [Kho MCP Foundry trên GitHub](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)  
- [Tích hợp các đại lý AI Azure với MCP (Blog Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  
- [Kho MCP GitHub (Microsoft)](https://github.com/microsoft/mcp)  
- [Thư mục Tài nguyên MCP (Mẫu Prompt, Công cụ và Định nghĩa Tài nguyên)](https://github.com/microsoft/mcp/tree/main/Resources)  
- [Cộng đồng & Tài liệu MCP](https://modelcontextprotocol.io/introduction)  
- [Đặc tả MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Tài liệu Azure MCP](https://aka.ms/azmcp)  
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Thực hành bảo mật tốt nhất  
- [Kho Máy chủ Playwright MCP trên GitHub](https://github.com/microsoft/playwright-mcp)  
- [Máy chủ Files MCP (OneDrive)](https://github.com/microsoft/files-mcp-server)  
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)  
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)  
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)  
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)  
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)  
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)  
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)  
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)  
- [Giải pháp AI và Tự động hóa Microsoft](https://azure.microsoft.com/en-us/products/ai-services/)

## Bài Tập

1. Phân tích một trong các nghiên cứu điển hình và đề xuất một cách tiếp cận triển khai thay thế.  
2. Chọn một ý tưởng dự án và tạo một đặc tả kỹ thuật chi tiết.  
3. Nghiên cứu một ngành không được đề cập trong các nghiên cứu điển hình và phác họa cách MCP có thể giải quyết các thách thức cụ thể của ngành đó.  
4. Khám phá một hướng phát triển trong tương lai và tạo một khái niệm mở rộng MCP mới hỗ trợ nó.

## Tiếp Theo

Khám phá thêm: [Máy chủ MCP của Microsoft](./microsoft-mcp-servers.md)

Tiếp tục đến: [Module 8: Thực hành tốt nhất](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->