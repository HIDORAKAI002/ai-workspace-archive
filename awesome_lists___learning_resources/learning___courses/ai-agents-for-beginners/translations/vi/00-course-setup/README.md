# Cài Đặt Khóa Học

## Giới Thiệu

Bài học này sẽ hướng dẫn cách chạy các ví dụ mã nguồn của khóa học này.

## Tham Gia Cùng Các Học Viên Khác và Nhận Trợ Giúp

Trước khi bạn bắt đầu sao chép kho mã của mình, hãy tham gia vào [kênh Discord AI Agents For Beginners](https://aka.ms/ai-agents/discord) để nhận được sự trợ giúp về cài đặt, các câu hỏi về khóa học, hoặc kết nối với các học viên khác.

## Sao Chép hoặc Tạo Fork Repo Này

Để bắt đầu, vui lòng sao chép hoặc tạo fork Kho Lưu Trữ GitHub. Việc này giúp bạn có phiên bản riêng của tài liệu khóa học để có thể chạy, kiểm thử, và chỉnh sửa mã nguồn!

Việc này có thể thực hiện bằng cách nhấp vào liên kết <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">tạo fork repo</a>

Bạn bây giờ nên có phiên bản fork riêng của khóa học này tại liên kết dưới đây:

![Forked Repo](../../../translated_images/vi/forked-repo.33f27ca1901baa6a.webp)

### Sao Chép Nông (được khuyên dùng cho workshop / Codespaces)

  >Kho lưu trữ đầy đủ có thể rất lớn (~3 GB) khi bạn tải xuống toàn bộ lịch sử và tất cả các tập tin. Nếu bạn chỉ tham gia workshop hoặc chỉ cần một vài thư mục bài học, sao chép nông (hoặc sao chép thưa thớt) tránh tải xuống phần lớn bằng cách cắt bớt lịch sử và/hoặc bỏ qua các blob.

#### Sao chép nông nhanh — lịch sử tối thiểu, tất cả các tệp

Thay thế `<your-username>` trong các lệnh dưới đây bằng URL fork của bạn (hoặc URL upstream nếu bạn muốn).

Để sao chép chỉ lịch sử commit mới nhất (tải xuống nhỏ):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Để sao chép một nhánh cụ thể:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Sao chép một phần (sparse) — tối thiểu các blob + chỉ thư mục chọn lọc

Điều này sử dụng sao chép một phần và sparse-checkout (yêu cầu Git 2.25+ và Git hiện đại được khuyên dùng có hỗ trợ sao chép một phần):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Điều hướng vào thư mục repo:

```bash|powershell
cd ai-agents-for-beginners
```

Sau đó chỉ định thư mục bạn muốn (ví dụ dưới đây cho thấy hai thư mục):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Sau khi sao chép và xác nhận các tệp, nếu bạn chỉ cần các tệp và muốn giải phóng không gian (không lịch sử git), vui lòng xóa dữ liệu meta của repository (💀không thể phục hồi — bạn sẽ mất toàn bộ chức năng Git: không có commit, pull, push hay truy cập lịch sử).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Sử dụng GitHub Codespaces (được khuyên để tránh tải xuống lớn trên máy)

- Tạo một Codespace mới cho repo này qua giao diện [GitHub UI](https://github.com/codespaces).  

- Trong terminal của codespace mới tạo, chạy một trong các lệnh sao chép nông/thưa thớt ở trên để chỉ mang các thư mục bài học bạn cần vào workspace Codespace.
- Tùy chọn: sau khi sao chép trong Codespaces, xóa .git để lấy lại không gian (xem lệnh xóa ở trên).
- Lưu ý: Nếu bạn muốn mở repo trực tiếp trong Codespaces (không cần sao chép thêm), hãy biết rằng Codespaces sẽ tạo môi trường devcontainer và vẫn có thể cấp phát nhiều hơn bạn cần. Sao chép bản nông trong Codespace mới cho bạn kiểm soát dung lượng đĩa tốt hơn.

#### Mẹo

- Luôn thay thế URL sao chép bằng fork của bạn nếu muốn chỉnh sửa/commit.
- Nếu sau này bạn cần thêm lịch sử hoặc tệp, có thể fetch hoặc điều chỉnh sparse-checkout để bao gồm thêm thư mục.

## Chạy Mã Nguồn

Khóa học này cung cấp một loạt Jupyter Notebooks mà bạn có thể chạy để có trải nghiệm thực hành xây dựng AI Agents.

Các ví dụ mã sử dụng **Microsoft Agent Framework (MAF)** với `FoundryChatClient`, kết nối với **Microsoft Foundry Agent Service V2** (API Responses) qua **Microsoft Foundry**.

Tất cả các notebook Python đều được gắn nhãn `*-python-agent-framework.ipynb`.

## Yêu Cầu

- Python 3.12+
  - **LƯU Ý**: Nếu bạn chưa cài Python3.12, hãy chắc chắn cài đặt nó. Sau đó tạo venv sử dụng python3.12 để đảm bảo các phiên bản đúng được cài từ file requirements.txt.
  
    >Ví dụ

    Tạo thư mục venv Python:

    ```bash|powershell
    python -m venv venv
    ```

    Sau đó kích hoạt môi trường venv cho:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Với mã mẫu sử dụng .NET, đảm bảo cài đặt [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) hoặc mới hơn. Sau đó kiểm tra phiên bản SDK .NET đã cài:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Cần thiết cho xác thực. Cài đặt từ [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure Subscription** — Để truy cập Microsoft Foundry và Microsoft Foundry Agent Service.
- **Dự án Microsoft Foundry** — Một dự án có mô hình đã được triển khai (ví dụ: `gpt-4.1-mini`). Xem [Bước 1](#bước-1-tạo-dự-án-microsoft-foundry) bên dưới.

Chúng tôi đã bao gồm file `requirements.txt` trong thư mục gốc của repo này chứa tất cả các gói Python cần thiết để chạy ví dụ mã.

Bạn có thể cài đặt chúng bằng cách chạy lệnh sau trong terminal tại thư mục gốc của repo:

```bash|powershell
pip install -r requirements.txt
```

Chúng tôi khuyên bạn nên tạo môi trường ảo Python để tránh xung đột và sự cố.

## Cài Đặt VSCode

Đảm bảo bạn sử dụng phiên bản Python đúng trong VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Cài Đặt Microsoft Foundry và Microsoft Foundry Agent Service

### Bước 1: Tạo Dự Án Microsoft Foundry

Bạn cần có một **hub** Microsoft Foundry và **dự án** với mô hình đã triển khai để chạy các notebook.

1. Truy cập [ai.azure.com](https://ai.azure.com) và đăng nhập bằng tài khoản Azure của bạn.
2. Tạo một **hub** (hoặc sử dụng hub có sẵn). Xem: [Tổng quan tài nguyên Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Trong hub, tạo một **dự án**.
4. Triển khai một mô hình (ví dụ: `gpt-4.1-mini`) từ **Models + Endpoints** → **Deploy model**.

### Bước 2: Lấy Đầu Mối Dự Án và Tên Triển Khai Mô Hình

Từ dự án trong cổng Microsoft Foundry:

- **Project Endpoint** — Vào trang **Overview** và sao chép URL endpoint.

![Project Connection String](../../../translated_images/vi/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — Vào phần **Models + Endpoints**, chọn mô hình đã triển khai của bạn, và ghi lại **Deployment name** (ví dụ: `gpt-4.1-mini`).

### Bước 3: Đăng Nhập Azure với `az login`

Tất cả notebook sử dụng **`AzureCliCredential`** để xác thực — không cần quản lý khóa API. Điều này yêu cầu bạn đăng nhập qua Azure CLI.

1. **Cài đặt Azure CLI** nếu bạn chưa có: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Đăng nhập** bằng cách chạy:

    ```bash|powershell
    az login
    ```

    Hoặc nếu bạn đang ở môi trường remote/Codespace không có trình duyệt:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Chọn subscription** nếu được hỏi — chọn subscription chứa dự án Foundry của bạn.

4. **Xác nhận** bạn đã đăng nhập:

    ```bash|powershell
    az account show
    ```

> **Tại sao dùng `az login`?** Các notebook xác thực dùng `AzureCliCredential` từ gói `azure-identity`. Điều này có nghĩa phiên làm việc Azure CLI của bạn cung cấp thông tin xác thực — không có khóa API hay bí mật nào trong file `.env`. Đây là một [thực hành bảo mật tốt nhất](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Bước 4: Tạo File `.env` Của Bạn

Sao chép file mẫu:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Mở `.env` và điền hai giá trị sau:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Biến | Nơi tìm thấy |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Cổng Foundry → dự án của bạn → trang **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Cổng Foundry → **Models + Endpoints** → tên mô hình đã triển khai của bạn |

Đó là xong với hầu hết các bài học! Các notebook sẽ xác thực tự động qua phiên `az login` của bạn.

### Bước 5: Cài Đặt Các Thư Viện Python

```bash|powershell
pip install -r requirements.txt
```

Chúng tôi khuyên bạn chạy lệnh này trong môi trường ảo bạn đã tạo trước đó.

## Cài Đặt Thêm Cho Bài 5 (Agentic RAG)

Bài 5 sử dụng **Azure AI Search** để sinh tạo tăng cường truy xuất. Nếu bạn dự định chạy bài này, thêm các biến này vào file `.env`:

| Biến | Nơi tìm thấy |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Cổng Azure → tài nguyên **Azure AI Search** của bạn → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Cổng Azure → tài nguyên **Azure AI Search** của bạn → **Settings** → **Keys** → khóa quản trị chính |

## Cài Đặt Thêm Cho Các Bài Gọi Azure OpenAI Trực Tiếp (Bài 6 và 8)

Một số notebook ở bài 6 và 8 gọi thẳng **Azure OpenAI** (dùng **Responses API**) thay vì đi qua dự án Microsoft Foundry. Các ví dụ này trước đây dùng GitHub Models, vốn đã bị ngừng (sẽ nghỉ hưu vào Tháng 7 năm 2026) và không hỗ trợ Responses API. Nếu bạn dự định chạy những ví dụ này, thêm các biến sau vào file `.env`:

| Biến | Nơi tìm thấy |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Cổng Azure → tài nguyên **Azure OpenAI** của bạn → **Keys and Endpoint** → Endpoint (ví dụ `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Tên mô hình bạn triển khai (ví dụ `gpt-4.1-mini`) hỗ trợ Responses API |
| `AZURE_OPENAI_API_KEY` | Tùy chọn — chỉ dùng nếu bạn dùng xác thực bằng khóa thay vì `az login` / Entra ID |

> Responses API dùng endpoint ổn định `/openai/v1/`, nên không cần `api-version`. Đăng nhập bằng `az login` để dùng xác thực Entra ID không khóa.

## Nhà Cung Cấp Thay Thế: MiniMax (Tương Thích OpenAI)

[MiniMax](https://platform.minimaxi.com/) cung cấp các mô hình ngữ cảnh lớn (lên đến 204K tokens) qua API tương thích OpenAI. Vì Microsoft Agent Framework `OpenAIChatClient` hoạt động với mọi endpoint tương thích OpenAI, bạn có thể dùng MiniMax làm lựa chọn thay thế cho Azure OpenAI hoặc OpenAI.

Thêm các biến này vào file `.env` của bạn:

| Biến | Nơi tìm thấy |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | Dùng `https://api.minimax.io/v1` (giá trị mặc định) |
| `MINIMAX_MODEL_ID` | Tên mô hình dùng (ví dụ `MiniMax-M3`) |

**Ví dụ mô hình**: `MiniMax-M3` (được khuyên dùng), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (phản hồi nhanh hơn). Tên và khả dụng mô hình có thể thay đổi theo thời gian, và truy cập mô hình nào có thể tùy vào tài khoản hoặc vùng của bạn — kiểm tra [MiniMax Platform](https://platform.minimaxi.com/) để biết danh sách hiện tại. Nếu `MiniMax-M3` không có cho tài khoản bạn, đặt `MINIMAX_MODEL_ID` thành mô hình bạn có quyền truy cập (ví dụ `MiniMax-M2.7`).

Các ví dụ dùng `OpenAIChatClient` (ví dụ Bài 14 quy trình đặt phòng khách sạn) sẽ tự phát hiện và dùng cấu hình MiniMax của bạn khi `MINIMAX_API_KEY` được thiết lập.

## Nhà Cung Cấp Thay Thế: Foundry Local (Chạy Mô Hình Trên Thiết Bị)

[Foundry Local](https://foundrylocal.ai) là môi trường runtime nhẹ tải xuống, quản lý và phục vụ các mô hình ngôn ngữ **hoàn toàn trên máy của bạn** bằng API tương thích OpenAI — không cần đám mây, không cần đăng ký Azure, và không cần khóa API. Đây là lựa chọn tuyệt vời để phát triển offline, thử nghiệm mà không phát sinh chi phí đám mây, hoặc giữ dữ liệu trên thiết bị.

Vì Microsoft Agent Framework `OpenAIChatClient` làm việc với mọi endpoint tương thích OpenAI, Foundry Local là lựa chọn thay thế tại chỗ thay cho Azure OpenAI.

**1. Cài Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Tải xuống và chạy một mô hình** (điều này cũng khởi động dịch vụ tại chỗ):

```bash
foundry model list          # xem các mẫu có sẵn
foundry model run phi-4-mini
```

**3. Cài SDK Python** được dùng để tìm endpoint tại chỗ:

```bash
pip install foundry-local-sdk
```

**4. Trỏ Microsoft Agent Framework tới mô hình của bạn tại chỗ:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Tải xuống (nếu cần) và phục vụ mô hình cục bộ, sau đó phát hiện điểm cuối/cổng.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # ví dụ http://localhost:<port>/v1
    api_key=manager.api_key,        # luôn luôn là "không cần thiết" cho Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Lưu ý:** Foundry Local cung cấp endpoint **Chat Completions** tương thích OpenAI. Sử dụng nó cho phát triển tại chỗ và các kịch bản offline. Để dùng đầy đủ chức năng **Responses API** (đàm thoại trạng thái, điều phối công cụ sâu, và phát triển kiểu agent), hãy chọn **Azure OpenAI** hoặc dự án **Microsoft Foundry** như hướng dẫn trong các bài học. Xem [tài liệu Foundry Local](https://foundrylocal.ai) để biết danh mục mô hình và hỗ trợ nền tảng hiện tại.


## Cài Đặt Bổ Sung cho Bài Học 8 (Quy Trình Bing Grounding)

Notebook quy trình điều kiện trong bài học 8 sử dụng **Bing grounding** thông qua Microsoft Foundry. Nếu bạn muốn chạy mẫu đó, hãy thêm biến này vào file `.env` của bạn:

| Biến | Nơi tìm thấy |
|----------|-----------------|
| `BING_CONNECTION_ID` | Cổng Microsoft Foundry → dự án của bạn → **Management** → **Connected resources** → kết nối Bing của bạn → sao chép ID kết nối |

## Khắc Phục Sự Cố

### Lỗi Xác Thực Chứng Chỉ SSL trên macOS

Nếu bạn đang dùng macOS và gặp lỗi như:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Đây là một vấn đề đã biết với Python trên macOS khi các chứng chỉ SSL của hệ thống không được tin cậy tự động. Hãy thử các giải pháp sau theo thứ tự:

**Lựa chọn 1: Chạy script Cài Đặt Chứng Chỉ của Python (khuyến nghị)**

```bash
# Thay thế 3.XX bằng phiên bản Python bạn đã cài đặt (ví dụ: 3.12 hoặc 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Lựa chọn 2: Sử dụng `connection_verify=False` trong notebook của bạn (chỉ cho notebook GitHub Models)**

Trong notebook Bài Học 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), một giải pháp tạm thời đã được chú thích. Bỏ chú thích `connection_verify=False` khi tạo client:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Vô hiệu hóa xác minh SSL nếu bạn gặp lỗi chứng chỉ
)
```

> **⚠️ Cảnh báo:** Vô hiệu hóa xác thực SSL (`connection_verify=False`) làm giảm bảo mật vì bỏ qua việc xác thực chứng chỉ. Chỉ sử dụng đây như một giải pháp tạm thời trong môi trường phát triển, không bao giờ dùng trong sản xuất.

**Lựa chọn 3: Cài đặt và sử dụng `truststore`**

```bash
pip install truststore
```

Sau đó thêm đoạn sau ở đầu notebook hoặc script trước khi gọi mạng:

```python
import truststore
truststore.inject_into_ssl()
```

## Bị Kẹt Ở Đâu?

Nếu bạn gặp bất kỳ vấn đề nào khi chạy cài đặt này, hãy tham gia vào <a href="https://discord.gg/kzRShWzttr" target="_blank">Discord Cộng Đồng Azure AI</a> hoặc <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">tạo một vấn đề</a>.

## Bài Học Tiếp Theo

Bây giờ bạn đã sẵn sàng chạy mã cho khóa học này. Chúc bạn học vui về thế giới AI Agents!

[Giới thiệu về AI Agents và Các Trường Hợp Sử Dụng Agent](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->