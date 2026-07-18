# Nhật ký thay đổi

Tất cả các thay đổi đáng chú ý đối với khóa học **AI Agents for Beginners** đều được ghi lại trong tệp này.

## [Phát hành] — 2026-07-13

Phiên bản này bổ sung hai bài học mới hoàn thiện vòng triển khai — mở rộng các đại lý đến Microsoft Foundry và thu nhỏ xuống một máy trạm duy nhất — cùng một pipeline kiểm thử nhanh, điều hướng khóa học được làm mới, kỹ năng người học mới và cập nhật thương hiệu.

### Thêm mới

- **Bài học 16 — Triển khai các đại lý có thể mở rộng với Microsoft Foundry.** Bài học mới [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) và sổ tay chạy được [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) xây dựng một đại lý hỗ trợ khách hàng sản xuất (công cụ, RAG, bộ nhớ, định tuyến mô hình, bộ nhớ đệm phản hồi, phê duyệt con người, cổng đánh giá, và truy dấu OpenTelemetry), với các sơ đồ Mermaid phát triển/triển khai/chạy, kiểm tra kiến thức, bài tập và thử thách.
- **Bài học 17 — Tạo các đại lý AI tại chỗ với Foundry Local và Qwen.** Bài học mới [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) và sổ tay [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) xây dựng một trợ lý kỹ thuật hoàn toàn trên thiết bị (gọi hàm Qwen qua Foundry Local, công cụ tệp trong vùng cách ly, RAG tại chỗ với Chroma, MCP tùy chọn tại chỗ), với sơ đồ local-only / local-RAG / gọi công cụ, kiểm tra kiến thức, bài tập và thử thách.
- **Pipeline kiểm thử nhanh.** Workflow mới [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) cùng danh mục riêng cho từng bài học dưới [tests/](./tests/README.md) với các đại lý có thể triển khai trong các Bài 01, 04, 05 và 16, kèm README chỉ mục ánh xạ mỗi danh mục tới bài học và tên đại lý được lưu trữ. Bài 16 có thêm phần "Xác thực một Đại lý đã Triển khai với Kiểm thử Nhanh"; Bài 01/04/05 có thêm chỉ dẫn kiểm thử nhanh tùy chọn.
- **Kỹ năng người học.** Kỹ năng Đại lý mới dưới `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (bao gồm hướng dẫn Bài 16 và 17), và [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (cách xác thực các mẫu sổ tay so với môi trường Microsoft Foundry / Azure OpenAI hoạt động).
- **Trình chạy xác thực sổ tay.** Tập lệnh mới [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) chạy không giao diện tất cả các sổ tay Python bằng `nbconvert` và in ra bảng kết quả ĐẬU/THẤT BẠI (cùng `results.json`). Nó tự nhận diện thư mục gốc repo và Python, loại trừ các sổ tay không thuộc khóa học (`.venv`, `site-packages`, `translations`, tài nguyên mẫu kỹ năng) và sổ tay `.NET` theo mặc định, hỗ trợ `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, và `-Python`.
- **Định hướng khóa học.** Thêm liên kết Bài trước/Bài sau cho các Bài 11–15 (trước đây thiếu) để chuỗi toàn khóa học nối từ 00 → 18 theo cả hai chiều.
- **Ảnh thu nhỏ mới.** Ảnh đại diện cho Bài 16 và 17, cùng ảnh xã hội repo làm mới [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (giờ quảng bá hai bài mới và địa chỉ `aka.ms/ai-agents-beginners`).
- **Phụ thuộc** ([requirements.txt](../../requirements.txt)): thêm `foundry-local-sdk` và `chromadb` cho Bài 17.

### Thay đổi

- **Bảng bài học chính tại [README.md](./README.md)**: Bài 16 và 17 giờ đã liên kết đến nội dung (trước là "Sắp ra mắt"); nâng cấp ảnh repo lên `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: thêm Bài 16 và 17 vào hướng dẫn từng bài và lộ trình học, cũng như phần "Xác thực Đại lý đã Triển khai với Kiểm thử Nhanh".
- **[AGENTS.md](./AGENTS.md)**: cập nhật số lượng/mô tả bài học (00–18), thêm phần xác thực kiểm thử nhanh, và ví dụ đặt tên mẫu Bài 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Bài Học Trước" giờ trỏ đến Bài 17 (trước là Bài 15), đóng chuỗi học.
- **Chuẩn hóa tham chiếu mô hình trên các mô hình không bị loại bỏ.** Thay hết tham chiếu `gpt-4o` / `gpt-4o-mini` trong tất cả nội dung khóa học (tài liệu, `.env.example`, sổ tay Python/.NET và mẫu) thành `gpt-4.1-mini` — `gpt-4o` (tất cả phiên bản) sẽ nghỉ vào năm 2026. Ví dụ định tuyến mô hình bài 16 giữ độ tương phản nhỏ/lớn dùng `gpt-4.1-mini` (nhỏ) và `gpt-4.1` (lớn). Sổ tay Python bây giờ chọn mô hình từ biến môi trường (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) thay vì cứng mã tên mô hình.

### Ghi chú và hạn chế đã biết

- **Không chạy trực tiếp trên Azure thực tế.** Các sổ tay bài học mới là mẫu giáo dục; bạn hãy chạy và xác thực chúng với môi trường Microsoft Foundry / Foundry Local của riêng bạn. Workflow kiểm thử nhanh yêu cầu bạn triển khai đại lý bài học và cấu hình bí mật Azure OIDC (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) với vai trò **Azure AI User** trong phạm vi dự án Foundry.
- **Bài 17 chỉ áp dụng tại chỗ.** Nó không có điểm cuối Foundry Responses nên hành động kiểm thử nhanh không áp dụng; hãy xác thực bằng cách chạy sổ tay trên máy trạm của bạn.

## [Phát hành] — 2026-07-06

Phiên bản này di chuyển khóa học sang **Azure OpenAI Responses API**, chuẩn hóa tên sản phẩm trên **Microsoft Foundry** và **Microsoft Agent Framework (MAF)**, ngừng sử dụng GitHub Models, cập nhật phiên bản SDK, và thêm nội dung mới về mô hình tại chỗ và lưu trữ các framework khác trên Foundry.

### Thêm mới

- **Kỹ năng di chuyển** — Cài đặt Kỹ năng Đại lý [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (từ [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) dưới `.agents/skills/`, gồm tham chiếu và tập lệnh quét.
- **Foundry Local (chạy mô hình trên thiết bị)** — Mục mới "Nhà cung cấp thay thế: Foundry Local" trong [00-course-setup/README.md](./00-course-setup/README.md) bao gồm cài đặt (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, và kết nối `FoundryLocalManager` với Microsoft Agent Framework qua `OpenAIChatClient`.
- **Lưu trữ các đại lý LangChain / LangGraph trên Microsoft Foundry** — Mục mới trong [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) cùng mẫu chạy được [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) dùng `langchain-azure-ai[hosting]` và `ResponsesHostServer` (giao thức `/responses`), dựa trên [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Mục "Ví dụ thực tế: Microsoft Project Opal" mới trong [15-browser-use/README.md](./15-browser-use/README.md) khung Opal như đại lý sử dụng máy tính doanh nghiệp và gắn kết với khái niệm khóa học (con người trong vòng lặp, tin cậy/bảo mật, lập kế hoạch, Kỹ năng).
- **Mẫu Python Bài 02 thứ hai** — Thêm [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (xem phần "Thay đổi" — di chuyển từ sổ tay Semantic Kernel cũ) và liên kết trong README bài học.
- Thêm phần "Mô hình và Nhà cung cấp" vào [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Thay đổi

- **Chat Completions → Responses API (Python).** Các mẫu gọi mô hình trực tiếp được chuyển đổi từ Chat Completions sang Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), dùng client `OpenAI` trên endpoint ổn định Azure OpenAI `/openai/v1/` (không có `api_version`). Mẫu bị ảnh hưởng gồm:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — quá trình gọi hàm đầy đủ (định dạng lược đồ công cụ phù hợp Responses, kết quả công cụ trả về dưới dạng `function_call_output`, `max_output_tokens`, v.v.).
- **GitHub Models → Azure OpenAI.** GitHub Models đã bị ngừng phát triển (nghỉ hưu **tháng 7 năm 2026**) và không hỗ trợ Responses API. Tất cả các đoạn mã GitHub Models được chuyển sang Azure OpenAI / Microsoft Foundry trên mẫu Python và .NET:
  - Python: sổ tay workflow Bài 08 (`01`–`03`), Bài 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` các file `*-dotnet-agent-framework.cs` + tài liệu `.md` kèm theo, và sổ tay workflow dotNET Bài 08/`.md` (`01`–`03`) hiện dùng `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` với `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Sổ tay cũ `02-semantic-kernel.ipynb` được viết lại sử dụng Microsoft Agent Framework với Azure OpenAI (Responses API) và đổi tên thành `02-python-agent-framework-azure-openai.ipynb`.
- **Chuẩn hóa dùng `FoundryChatClient` + `as_agent`.** README và mã sổ tay tham chiếu `AzureAIProjectAgentProvider` được chuẩn hóa theo mẫu chuẩn dùng trong Bài 01 và các mẫu framework: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` với `provider.as_agent(...)`. Cập nhật trên các README và sổ tay Bài 02–14 (ví dụ: bộ nhớ Bài 13, tất cả sổ tay Bài 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Đổi tên sản phẩm.** Đổi tên trong toàn bộ nội dung tiếng Anh:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Không đổi: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", và các tên biến môi trường.)
- **Phụ thuộc** ([requirements.txt](../../requirements.txt)):
  - Cố định `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Cố định `openai>=1.108.1` (tối thiểu cho Responses API).
  - Loại bỏ `azure-ai-inference` (chỉ dùng trong các mẫu GitHub Models được di chuyển).
- **Cấu hình môi trường** ([.env.example](../../.env.example)): loại bỏ biến GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); thêm `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, và `AZURE_OPENAI_API_KEY` tùy chọn; cập nhật tên dùng Microsoft Foundry.
- **Tài liệu** — Cập nhật [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), và [STUDY_GUIDE.md](./STUDY_GUIDE.md) cho các mục trên (cài đặt biến môi trường, đoạn kiểm tra, hướng dẫn nhà cung cấp, đổi tên).

### Loại bỏ

- Các bước khởi tạo GitHub Models và biến môi trường trong tài liệu cài đặt (đã bị thay thế bởi Azure OpenAI / Microsoft Foundry).

### Bảo mật / Riêng tư (dọn dẹp chia sẻ công khai)

- Đã xóa dữ liệu đầu ra thực thi notebook Jupyter rò rỉ ID **Đăng ký Azure** thực, tên nhóm tài nguyên / tài nguyên, và ID kết nối Bing, cùng **đường dẫn tệp cục bộ và tên người dùng của nhà phát triển**, trong:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Đã kiểm tra và không còn khóa API, token, ID đăng ký, hoặc đường dẫn cá nhân trong nội dung tiếng Anh được theo dõi (các tham chiếu `GITHUB_TOKEN` còn lại là token GitHub Actions trong các workflow và PAT máy chủ GitHub MCP trong cài đặt Bài học 11 — đều hợp pháp và không liên quan đến GitHub Models).

### Ghi chú và những hạn chế đã biết

- **Chưa chạy/biên dịch.** Đây là các mẫu giáo dục được cập nhật về tính chính xác của API/tên gọi; chúng chưa được chạy trên tài nguyên Azure thực tế, và các mẫu .NET chưa được biên dịch trong môi trường này. Vui lòng xác thực với triển khai Microsoft Foundry / Azure OpenAI riêng của bạn.
- **Triển khai mô hình phải hỗ trợ API Responses.** Sử dụng triển khai như `gpt-4.1-mini`, `gpt-4.1`, hoặc mô hình `gpt-5.x`. Các mô hình cũ hơn hỗ trợ chức năng cốt lõi của Responses nhưng không phải tất cả tính năng.
- **Phiên bản agent-framework.** Các mẫu hướng tới MAF mới nhất (`>=1.10.0`). Lệnh gọi tạo agent chuẩn là `client.as_agent(...)`; API đã được xác thực đối chiếu với tài liệu của framework và bản build cài đặt. Nếu bạn cố định phiên bản khác, hãy xác nhận phương thức có sẵn (`as_agent` hoặc `create_agent`).
- **Sổ tay workflow Bài 08 ghi chú 04** giữ nguyên `AzureAIAgentClient` (từ `agent-framework-azure-ai`) vì sử dụng công cụ dịch vụ Agent Microsoft Foundry được lưu trữ (dựa trên Bing, trình thông dịch mã); nó đã dựa trên Responses.
- **Triển khai mặc định .NET.** Hai mẫu workflow dotNET của Bài 08 trước đây mã hóa cứng mô hình cụ thể; giờ mặc định dùng `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Nếu mẫu yêu cầu đầu vào đa phương thức/nhìn, thiết lập `AZURE_OPENAI_DEPLOYMENT` cho mô hình phù hợp.
- **Foundry Local** cung cấp điểm cuối OpenAI tương thích **Chat Completions** và dành cho phát triển cục bộ; dùng Azure OpenAI / Microsoft Foundry để có đầy đủ tính năng API Responses.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->