# AGENTS.md

## Tổng Quan Dự Án

Kho lưu trữ này chứa "Các Tác Nhân AI cho Người Mới Bắt Đầu" - một khóa học giáo dục toàn diện dạy mọi thứ cần thiết để xây dựng các Tác Nhân AI. Khóa học bao gồm 18 bài học (đánh số từ 00-18) bao gồm các kiến thức cơ bản, mẫu thiết kế, framework, triển khai sản xuất, tác nhân cục bộ/trên thiết bị và bảo mật cho các tác nhân AI.

**Công nghệ chính:**
- Python 3.12+
- Jupyter Notebooks để học tương tác
- Các Framework AI: Microsoft Agent Framework (MAF)
- Dịch vụ AI Azure: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Kiến trúc:**
- Cấu trúc dựa trên bài học (các thư mục từ 00-15+)
- Mỗi bài học bao gồm: tài liệu README, ví dụ mã nguồn (Jupyter notebooks), và hình ảnh
- Hỗ trợ đa ngôn ngữ qua hệ thống dịch tự động
- Mỗi bài học có một notebook Python sử dụng Microsoft Agent Framework

## Lệnh Cài Đặt

### Yêu Cầu Trước
- Python 3.12 trở lên
- Tài khoản Azure (để dùng Microsoft Foundry)
- Azure CLI được cài và đã xác thực (`az login`)

### Thiết Lập Ban Đầu

1. **Sao chép hoặc fork kho lưu trữ:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # HOẶC
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Tạo và kích hoạt môi trường ảo Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Trên Windows: venv\Scripts\activate
   ```

3. **Cài đặt các phụ thuộc:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Thiết lập biến môi trường:**
   ```bash
   cp .env.example .env
   # Chỉnh sửa .env với các khóa API và điểm cuối của bạn
   ```

### Biến Môi Trường Cần Thiết

Đối với **Microsoft Foundry** (bắt buộc):
- `AZURE_AI_PROJECT_ENDPOINT` - endpoint dự án Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - tên triển khai mô hình (ví dụ, gpt-4.1-mini)

Đối với **Azure AI Search** (Bài học 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - endpoint Azure AI Search
- `AZURE_SEARCH_API_KEY` - khóa API Azure AI Search

Xác thực: Chạy `az login` trước khi chạy notebooks (dùng `AzureCliCredential`).

## Quy Trình Phát Triển

### Chạy Jupyter Notebooks

Mỗi bài học chứa nhiều notebook Jupyter cho các framework khác nhau:

1. **Khởi động Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Đi đến thư mục bài học** (ví dụ, `01-intro-to-ai-agents/code_samples/`)

3. **Mở và chạy notebooks:**
   - `*-python-agent-framework.ipynb` - Sử dụng Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Sử dụng Microsoft Agent Framework (.NET)

### Làm việc với Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Yêu cầu tài khoản Azure
- Sử dụng `FoundryChatClient` cho Agent Service V2 (tác nhân hiển thị trên portal Foundry)
- Sẵn sàng sử dụng trong sản xuất với khả năng giám sát tích hợp
- Mẫu tệp: `*-python-agent-framework.ipynb`

## Hướng Dẫn Kiểm Tra

Đây là kho lưu trữ giáo dục với mã ví dụ chứ không phải mã sản xuất có kiểm thử tự động. Để kiểm tra thiết lập và thay đổi của bạn:

### Kiểm Tra Thủ Công

1. **Kiểm tra môi trường Python:**
   ```bash
   python --version  # Nên là 3.12 trở lên
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Kiểm tra thực thi notebook:**
   ```bash
   # Chuyển đổi sổ tay thành kịch bản và chạy (kiểm tra các import)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Xác minh biến môi trường:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Chạy Từng Notebook Riêng Lẻ

Mở notebooks trong Jupyter và thực thi các cell theo thứ tự. Mỗi notebook là độc lập và bao gồm:
- Các câu lệnh import
- Tải cấu hình
- Các ví dụ về triển khai tác nhân
- Kết quả dự kiến trong các ô markdown

### Kiểm Tra Nhanh Các Tác Nhân Đã Triển Khai

Đối với các bài học có tác nhân được triển khai dưới dạng tác nhân được lưu trữ Microsoft Foundry (01, 04, 05, 16), repo cung cấp các catalog kiểm thử nhanh trong thư mục `tests/` được chạy bởi workflow `.github/workflows/smoke-test.yml` qua hành động [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test). Đây là bước kiểm tra nhẹ sau triển khai (đánh giá xem tác nhân có truy cập được và đáp ứng yêu cầu cơ bản trên prompt?), bổ trợ cho pipeline đánh giá trong các Bài học 10 và 16. Xem [tests/README.md](./tests/README.md) để biết sơ đồ ánh xạ catalog sang bài học và tác nhân. Bài học 17 chạy cục bộ với Foundry Local và không có endpoint lưu trữ, nên được kiểm tra bằng cách chạy trực tiếp notebook.

## Phong Cách Mã Nguồn

### Quy Ước Python

- **Phiên bản Python**: 3.12+
- **Phong cách mã**: Tuân theo tiêu chuẩn Python PEP 8
- **Notebooks**: Dùng ô markdown rõ ràng để giải thích các khái niệm
- **Imports**: Nhóm theo thư viện chuẩn, bên thứ ba, thư viện cục bộ

### Quy Ước Jupyter Notebook

- Bao gồm các ô markdown mô tả trước các ô mã
- Thêm ví dụ đầu ra trong notebooks để tham khảo
- Sử dụng tên biến rõ ràng phù hợp với khái niệm bài học
- Giữ thứ tự thực thi notebook tuyến tính (cell 1 → 2 → 3...)

### Tổ Chức Tệp Tin

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Xây Dựng và Triển Khai

### Xây Dựng Tài Liệu

Kho lưu trữ sử dụng Markdown cho tài liệu:
- Các tệp README.md trong từng thư mục bài học
- Tệp README.md chính tại thư mục gốc kho lưu trữ
- Hệ thống dịch tự động qua GitHub Actions

### CI/CD Pipeline

Nằm trong `.github/workflows/`:

1. **co-op-translator.yml** - Dịch tự động sang hơn 50 ngôn ngữ
2. **welcome-issue.yml** - Chào mừng người tạo issue mới
3. **welcome-pr.yml** - Chào mừng người đóng góp pull request mới

### Triển Khai

Đây là kho lưu trữ giáo dục - không có quy trình triển khai. Người dùng:
1. Fork hoặc sao chép kho lưu trữ
2. Chạy notebooks cục bộ hoặc trong GitHub Codespaces
3. Học bằng cách sửa đổi và thử nghiệm các ví dụ

## Hướng Dẫn Pull Request

### Trước Khi Gửi

1. **Kiểm tra thay đổi của bạn:**
   - Chạy hoàn toàn các notebook có liên quan
   - Đảm bảo tất cả cell chạy không lỗi
   - Kiểm tra kết quả đầu ra phù hợp

2. **Cập nhật tài liệu:**
   - Cập nhật README.md nếu thêm khái niệm mới
   - Thêm chú thích trong notebooks cho mã phức tạp
   - Đảm bảo ô markdown giải thích mục đích

3. **Thay đổi tệp tin:**
   - Tránh commit các tệp `.env` (dùng `.env.example`)
   - Không commit thư mục `venv/` hoặc `__pycache__/`
   - Giữ lại đầu ra notebook nếu nó minh họa khái niệm
   - Xóa tệp tạm thời và notebook bản sao lưu (`*-backup.ipynb`)

### Định Dạng Tiêu Đề PR

Sử dụng tiêu đề mô tả:
- `[Lesson-XX] Thêm ví dụ mới cho <khái niệm>`
- `[Fix] Sửa lỗi chính tả trong README bài-XX`
- `[Update] Cải thiện ví dụ mã trong bài-XX`
- `[Docs] Cập nhật hướng dẫn thiết lập`

### Các Kiểm Tra Bắt Buộc

- Notebooks cần chạy không lỗi
- Các tệp README phải rõ ràng và chính xác
- Tuân theo mẫu mã hiện có trong kho lưu trữ
- Giữ nhất quán với các bài học khác

## Ghi Chú Thêm

### Các Lưu Ý Phổ Biến

1. **Sai phiên bản Python:**
   - Đảm bảo sử dụng Python 3.12+
   - Một số gói có thể không hoạt động trên phiên bản cũ
   - Dùng `python3 -m venv` để chỉ rõ phiên bản Python

2. **Biến môi trường:**
   - Luôn tạo `.env` từ `.env.example`
   - Không commit tệp `.env` (đã có trong `.gitignore`)
   - Đăng nhập bằng `az login` để xác thực Entra ID không cần khóa

3. **Xung đột gói:**
   - Dùng môi trường ảo mới
   - Cài đặt từ `requirements.txt` thay vì từng gói riêng lẻ
   - Một số notebook có thể cần các gói bổ sung được ghi trong ô markdown của chúng

4. **Dịch vụ Azure:**
   - Dịch vụ Azure AI yêu cầu tài khoản đăng ký hoạt động
   - Một số tính năng bị giới hạn theo vùng
   - Đảm bảo triển khai mô hình Azure OpenAI hỗ trợ API Responses

### Lộ Trình Học Tập

Khuyến nghị học theo thứ tự các bài:
1. **00-course-setup** - Bắt đầu tại đây để thiết lập môi trường
2. **01-intro-to-ai-agents** - Hiểu các kiến thức cơ bản về tác nhân AI
3. **02-explore-agentic-frameworks** - Tìm hiểu các framework khác nhau
4. **03-agentic-design-patterns** - Các mẫu thiết kế cốt lõi
5. Tiếp tục lần lượt theo số bài học

### Chọn Framework

Chọn framework phù hợp với mục tiêu của bạn:
- **Tất cả bài học**: Microsoft Agent Framework (MAF) với `FoundryChatClient`
- **Tác nhân đăng ký phía server** trong Microsoft Foundry Agent Service V2 và hiện thị trên portal Foundry

### Nhận Trợ Giúp

- Tham gia [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Xem các tệp README của bài học để có hướng dẫn cụ thể
- Kiểm tra [README.md](./README.md) chính để biết tổng quan khóa học
- Tham khảo [Course Setup](./00-course-setup/README.md) để biết hướng dẫn thiết lập chi tiết

### Đóng Góp

Đây là dự án giáo dục mở. Hoan nghênh đóng góp:
- Cải thiện ví dụ mã
- Sửa lỗi chính tả hoặc lỗi khác
- Thêm nhận xét làm rõ
- Đề xuất chủ đề bài học mới
- Dịch sang thêm nhiều ngôn ngữ

Xem [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) để biết nhu cầu hiện tại.

## Bối Cảnh Cụ Thể Dự Án

### Hỗ Trợ Đa Ngôn Ngữ

Repository này sử dụng hệ thống dịch tự động:
- Hỗ trợ hơn 50 ngôn ngữ
- Bản dịch nằm trong thư mục `/translations/<lang-code>/`
- Workflow GitHub Actions xử lý cập nhật bản dịch
- Tệp nguồn tiếng Anh nằm ở thư mục gốc kho lưu trữ

### Cấu Trúc Bài Học

Mỗi bài học theo mẫu nhất quán:
1. Hình thumbnail video có liên kết
2. Nội dung bài học viết (README.md)
3. Ví dụ mã nguồn qua các framework khác nhau
4. Mục tiêu học tập và yêu cầu trước
5. Liên kết tài nguyên học tập bổ sung

### Đặt Tên Ví Dụ Mã

Định dạng: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Bài học 1, MAF Python
- `14-sequential.ipynb` - Bài học 14, các mẫu nâng cao MAF
- `16-python-agent-framework.ipynb` - Bài học 16, tác nhân hỗ trợ khách hàng sản xuất
- `17-local-agent-foundry-local.ipynb` - Bài học 17, tác nhân cục bộ với Foundry Local + Qwen

### Thư Mục Đặc Biệt

- `translated_images/` - Hình ảnh địa phương hóa cho các bản dịch
- `images/` - Hình ảnh gốc cho nội dung tiếng Anh
- `.devcontainer/` - cấu hình container phát triển VS Code
- `.github/` - workflow và mẫu GitHub Actions

### Phụ Thuộc

Các gói chính từ `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - hỗ trợ giao thức Agent-to-Agent
- `azure-ai-inference`, `azure-ai-projects` - dịch vụ Azure AI
- `azure-identity` - xác thực Azure (AzureCliCredential)
- `azure-search-documents` - tích hợp Azure AI Search
- `mcp[cli]` - hỗ trợ Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->