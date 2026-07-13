# Chạy mẫu

Ở đây chúng tôi giả định bạn đã có mã máy chủ hoạt động. Vui lòng tìm một máy chủ từ một trong những chương trước.

## Thiết lập mcp.json

Đây là một tệp bạn dùng để tham khảo, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Thay đổi mục server khi cần để chỉ ra đường dẫn tuyệt đối đến máy chủ của bạn bao gồm lệnh đầy đủ cần thiết để chạy.

Trong tệp ví dụ được đề cập ở trên mục server trông như sau:

<details>
<summary>node.js</summary>
```json
"hello-mcp": {
    "command": "node",
    "args": [
        "build/index.js"
    ]
}
```
</details>

<details>
<summary>.NET</summary>

Bạn có thể phải nhập thư mục gốc kho GitHub, có thể lấy bằng lệnh, `git rev-parse --show-toplevel`.

```jsonc
{
  "inputs": [
    {
      "type": "promptString",
      "id": "repository-root",
      "description": "The absolute path to the repository root"
    }
  ],
  "servers": {
    "calculator-mcp-dotnet": {
      "type": "stdio",
      "command": "dotnet",
      "args": [
        "run",
        "--project",
        "${input:repository-root}/03-GettingStarted/02-client/solution/server/server.csproj"
      ]
    }
  }
}
```

</details>

Điều này tương ứng với chạy một lệnh như sau: `node build/index.js`.

- Thay đổi mục server này sao cho phù hợp với vị trí tệp máy chủ của bạn hoặc cần thiết để khởi động máy chủ tùy theo runtime và vị trí máy chủ mà bạn chọn.

## Sử dụng các tính năng trên máy chủ

- Nhấn biểu tượng `play`, khi bạn đã thêm *mcp.json* vào thư mục *./vscode*,

    Quan sát biểu tượng công cụ thay đổi để tăng số lượng công cụ có sẵn. Biểu tượng công cụ nằm ngay trên trường chat trong GitHub Copilot.

## Chạy một công cụ

- Gõ một câu lệnh trong cửa sổ chat của bạn khớp với mô tả của công cụ. Ví dụ để kích hoạt công cụ `add` gõ điều gì đó như "add 3 to 20".

    Bạn sẽ thấy một công cụ được hiển thị phía trên hộp văn bản chat cho bạn chọn để chạy công cụ như hình dưới đây:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/vi/vscode-agent.d5a0e0b897331060.webp)

    Chọn công cụ sẽ tạo ra kết quả số nói "23" nếu câu lệnh của bạn giống như ví dụ chúng tôi đã đề cập trước đó.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->