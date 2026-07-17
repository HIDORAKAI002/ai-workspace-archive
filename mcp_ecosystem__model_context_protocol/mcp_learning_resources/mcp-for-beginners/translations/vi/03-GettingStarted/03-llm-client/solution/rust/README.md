# Chạy ví dụ này

Đây là giải pháp Rust cho ví dụ client LLM. Bạn cần cài đặt bộ công cụ Rust; xem [hướng dẫn cài đặt chính thức](https://www.rust-lang.org/tools/install).

Client gọi một mô hình qua endpoint suy luận Models của GitHub (`https://models.github.ai/inference/chat`) và đọc token truy cập cá nhân GitHub (PAT) của bạn từ biến môi trường `OPENAI_API_KEY`.

> [!NOTE]
> Các giải pháp khác trong kho này sử dụng `GITHUB_TOKEN`. Đối với Rust, hãy đặt `OPENAI_API_KEY` thành cùng một giá trị để phù hợp với cấu hình client OpenAI.

## -0- Thiết lập token GitHub của bạn

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Biên dịch ví dụ

```bash
cargo build
```

## -2- Chạy ví dụ

```bash
cargo run
```

Client khởi động máy chủ MCP calculator, lấy danh sách công cụ của nó, và sử dụng mô hình (`openai/gpt-5-mini`) để gọi công cụ `add`. Bạn sẽ thấy kết quả hiển thị việc gọi công cụ (ví dụ, "Calling tool: add") và kết quả của lần gọi đó.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->