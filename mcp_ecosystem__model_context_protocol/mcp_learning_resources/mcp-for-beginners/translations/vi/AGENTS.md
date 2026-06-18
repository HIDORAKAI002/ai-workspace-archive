# AGENTS.md

## Tổng Quan Dự Án

**MCP for Beginners** là một chương trình giáo dục mã nguồn mở để học Model Context Protocol (MCP) - một khuôn khổ tiêu chuẩn cho các tương tác giữa các mô hình AI và các ứng dụng khách. Kho lưu trữ này cung cấp tài liệu học tập toàn diện với các ví dụ mã thực hành trên nhiều ngôn ngữ lập trình.

### Công Nghệ Chính

- **Ngôn ngữ lập trình**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Framework & SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Cơ sở dữ liệu**: PostgreSQL với tiện ích mở rộng pgvector
- **Nền tảng đám mây**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Công cụ xây dựng**: npm, Maven, pip, Cargo
- **Tài liệu**: Markdown với dịch thuật đa ngôn ngữ tự động (hơn 48 ngôn ngữ)

### Kiến Trúc

- **11 Mô-đun chính (00-11)**: Lộ trình học tuần tự từ cơ bản đến nâng cao
- **Phòng thí nghiệm thực hành**: Bài tập thực tế với mã giải pháp hoàn chỉnh đa ngôn ngữ
- **Dự án mẫu**: Triển khai máy chủ và khách MCP hoạt động
- **Hệ thống dịch**: Quy trình GitHub Actions tự động hỗ trợ đa ngôn ngữ
- **Tài nguyên hình ảnh**: Thư mục hình ảnh tập trung với các phiên bản dịch

## Lệnh Cài Đặt

Đây là kho lưu trữ tập trung vào tài liệu. Phần lớn thiết lập diễn ra trong các dự án mẫu và phòng thí nghiệm riêng.

### Thiết Lập Kho Lưu Trữ

```bash
# Sao chép kho lưu trữ
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Làm Việc Với Dự Án Mẫu

Các dự án mẫu nằm tại:
- `03-GettingStarted/samples/` - Ví dụ theo từng ngôn ngữ
- `03-GettingStarted/01-first-server/solution/` - Các triển khai máy chủ đầu tiên
- `03-GettingStarted/02-client/solution/` - Các triển khai khách hàng
- `11-MCPServerHandsOnLabs/` - Phòng thí nghiệm tích hợp cơ sở dữ liệu toàn diện

Mỗi dự án mẫu có hướng dẫn thiết lập riêng:

#### Dự Án TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Dự Án Python
```bash
cd <project-directory>
pip install -r requirements.txt
# hoặc
pip install -e .
python main.py
```

#### Dự Án Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Quy Trình Phát Triển

### Cấu Trúc Tài Liệu

- **Mô-đun 00-11**: Nội dung chương trình học cốt lõi theo trình tự
- **translations/**: Phiên bản theo từng ngôn ngữ (tự động tạo, không chỉnh sửa trực tiếp)
- **translated_images/**: Phiên bản hình ảnh đã được bản địa hóa (tự động)
- **images/**: Hình ảnh và sơ đồ gốc

### Thay Đổi Tài Liệu

1. Chỉ chỉnh sửa các tệp markdown tiếng Anh trong các thư mục mô-đun gốc (00-11)
2. Cập nhật hình ảnh trong thư mục `images/` nếu cần
3. Quy trình co-op-translator GitHub Action sẽ tự động tạo bản dịch
4. Bản dịch được tái tạo mỗi khi có push lên nhánh chính

### Làm Việc Với Bản Dịch

- **Dịch tự động**: Quy trình GitHub Actions xử lý toàn bộ bản dịch
- **KHÔNG** chỉnh sửa thủ công các tệp trong thư mục `translations/`
- Metadata bản dịch được nhúng trong mỗi tệp dịch
- Hỗ trợ hơn 48 ngôn ngữ bao gồm Ả Rập, Trung Quốc, Pháp, Đức, Hindi, Nhật, Hàn, Bồ Đào Nha, Nga, Tây Ban Nha và nhiều hơn nữa

## Hướng Dẫn Kiểm Tra

### Xác Thực Tài Liệu

Vì đây chủ yếu là kho tài liệu, việc kiểm tra tập trung vào:

1. **Xác minh liên kết**: Đảm bảo tất cả liên kết nội bộ hoạt động
```bash
# Kiểm tra các liên kết markdown bị hỏng
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Kiểm tra ví dụ mã**: Đảm bảo các ví dụ mã biên dịch/chạy được
```bash
# Điều hướng đến mẫu cụ thể và chạy các bài kiểm tra của nó
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Kiểm tra định dạng markdown**: Kiểm tra sự nhất quán định dạng
```bash
# Sử dụng markdownlint nếu cần thiết
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Kiểm Tra Dự Án Mẫu

Mỗi dự án mẫu theo ngôn ngữ có phương pháp kiểm tra riêng:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Hướng Dẫn Phong Cách Mã

### Phong Cách Tài Liệu

- Sử dụng ngôn ngữ rõ ràng, dễ hiểu cho người mới
- Bao gồm ví dụ mã đa ngôn ngữ khi có thể
- Theo đúng thực hành markdown:
  - Sử dụng tiêu đề kiểu ATX (`#`)
  - Sử dụng khối mã có chỉ định ngôn ngữ
  - Bao gồm mô tả alt cho hình ảnh
  - Giữ độ dài dòng hợp lý (không quá nghiêm ngặt, nhưng hợp lý)

### Phong Cách Ví Dụ Mã

#### TypeScript/JavaScript
- Sử dụng mô-đun ES (`import`/`export`)
- Tuân thủ kiểu strict của TypeScript
- Có chú thích kiểu
- Mục tiêu ES2022

#### Python
- Tuân thủ chuẩn PEP 8
- Sử dụng chú thích kiểu khi thích hợp
- Bao gồm docstring cho hàm và lớp
- Dùng tính năng Python hiện đại (3.8+)

#### Java
- Tuân thủ chuẩn Spring Boot
- Sử dụng tính năng Java 21
- Tuân thủ cấu trúc dự án Maven tiêu chuẩn
- Bao gồm comment Javadoc

### Tổ Chức Tệp Tin

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Xây Dựng và Triển Khai

### Triển Khai Tài Liệu

Kho sử dụng GitHub Pages hoặc tương tự để lưu trữ tài liệu (nếu có). Thay đổi nhánh chính kích hoạt:

1. Quy trình dịch thuật (`.github/workflows/co-op-translator.yml`)
2. Dịch tự động tất cả tệp markdown tiếng Anh
3. Bản địa hóa hình ảnh khi cần

### Không Cần Quy Trình Xây Dựng

Kho chủ yếu chứa tài liệu markdown. Không cần bước biên dịch hay xây dựng cho nội dung chương trình chính.

### Triển Khai Dự Án Mẫu

Các dự án mẫu có thể có hướng dẫn triển khai:
- Xem `03-GettingStarted/09-deployment/` để hướng dẫn triển khai máy chủ MCP
- Ví dụ triển khai Azure Container Apps trong `11-MCPServerHandsOnLabs/`

## Hướng Dẫn Đóng Góp

### Quy Trình Pull Request

1. **Fork và Clone**: Fork kho rồi clone về máy cá nhân
2. **Tạo nhánh mới**: Đặt tên nhánh mô tả rõ ràng (ví dụ: `fix/typo-module-3`, `add/python-example`)
3. **Chỉnh sửa**: Chỉ chỉnh sửa tệp markdown tiếng Anh (không phải bản dịch)
4. **Kiểm tra cục bộ**: Đảm bảo markdown hiển thị đúng
5. **Gửi PR**: Tiêu đề và mô tả PR rõ ràng
6. **CLA**: Ký Thỏa thuận Cộng tác Viên Microsoft khi được yêu cầu

### Định Dạng Tiêu Đề PR

Sử dụng tiêu đề rõ ràng, mô tả:
- `[Module XX] Mô tả ngắn` cho thay đổi theo mô-đun
- `[Samples] Mô tả` cho thay đổi ví dụ mã
- `[Docs] Mô tả` cho cập nhật tài liệu chung

### Những Gì Nên Đóng Góp

- Sửa lỗi trong tài liệu hoặc ví dụ mã
- Thêm ví dụ mới bằng các ngôn ngữ khác
- Làm rõ và cải tiến nội dung hiện có
- Thêm nghiên cứu trường hợp hoặc ví dụ thực tế
- Báo cáo lỗi nội dung không rõ ràng hoặc sai

### Những Gì KHÔNG NÊN Làm

- Không chỉnh sửa trực tiếp các tệp trong `translations/`
- Không chỉnh sửa thư mục `translated_images/`
- Không thêm tệp nhị phân lớn mà không thảo luận trước
- Không thay đổi quy trình dịch thuật mà không có sự phối hợp

## Ghi Chú Bổ Sung

### Bảo Trì Kho Lưu Trữ

- **Changelog**: Tất cả thay đổi quan trọng được ghi trong `changelog.md`
- **Hướng dẫn học tập**: Sử dụng `study_guide.md` để điều hướng chương trình
- **Mẫu vấn đề**: Sử dụng mẫu issue GitHub cho báo lỗi và yêu cầu tính năng
- **Quy tắc ứng xử**: Tất cả cộng tác viên phải tuân thủ Bộ Quy Tắc Ứng Xử Mã Nguồn Mở của Microsoft

### Lộ Trình Học

Theo trình tự các mô-đun (00-11) để học hiệu quả:
1. **00-02**: Cơ bản (Giới thiệu, Khái niệm cốt lõi, Bảo mật)
2. **03**: Bắt đầu với thực hành
3. **04-05**: Triển khai thực tế và chủ đề nâng cao
4. **06-10**: Cộng đồng, thực hành tốt nhất, ứng dụng thực tế
5. **11**: Phòng thí nghiệm tích hợp cơ sở dữ liệu toàn diện (13 bài theo thứ tự)

### Tài Nguyên Hỗ Trợ

- **Tài liệu**: https://modelcontextprotocol.io/
- **Đặc tả**: https://spec.modelcontextprotocol.io/
- **Cộng đồng**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Máy chủ Discord Microsoft Foundry
- **Khóa học liên quan**: Xem README.md cho các lộ trình học Microsoft khác

### Vấn Đề Thường Gặp

**Q: PR của tôi không qua được kiểm tra dịch thuật**  
A: Đảm bảo bạn chỉ chỉnh sửa các tệp markdown tiếng Anh ở thư mục mô-đun gốc, không phải bản dịch.

**Q: Làm sao để thêm ngôn ngữ mới?**  
A: Hỗ trợ ngôn ngữ được quản lý qua quy trình co-op-translator. Mở issue để thảo luận thêm ngôn ngữ mới.

**Q: Ví dụ mã không chạy được**  
A: Đảm bảo bạn đã làm theo hướng dẫn thiết lập trong README của từng ví dụ. Kiểm tra các phiên bản phụ thuộc đúng.

**Q: Hình ảnh không hiển thị**  
A: Xác minh đường dẫn hình ảnh là tương đối và sử dụng dấu gạch chéo (/). Hình ảnh phải nằm trong `images/` hoặc `translated_images/` cho các phiên bản bản địa hóa.

### Cân Nhắc Hiệu Suất

- Quy trình dịch thuật có thể mất vài phút để hoàn thành
- Hình ảnh lớn nên được tối ưu hóa trước khi đẩy lên
- Giữ các tệp markdown riêng lẻ tập trung và có kích thước hợp lý
- Dùng liên kết tương đối để dễ di chuyển

### Quản Trị Dự Án

Dự án tuân thủ các thực hành mã nguồn mở của Microsoft:  
- Giấy phép MIT cho mã và tài liệu  
- Bộ Quy Tắc Ứng Xử Mã Nguồn Mở Microsoft  
- Yêu cầu ký CLA cho đóng góp  
- Vấn đề bảo mật: Tuân theo hướng dẫn trong SECURITY.md  
- Hỗ trợ: Xem SUPPORT.md để lấy các tài nguyên giúp đỡ

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->