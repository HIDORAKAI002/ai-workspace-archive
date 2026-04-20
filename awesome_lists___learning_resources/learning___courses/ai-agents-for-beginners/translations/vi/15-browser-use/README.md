# Xây dựng Đại lý Sử dụng Máy tính (CUA)

Các đại lý sử dụng máy tính có thể tương tác với các trang web giống như một người dùng: bằng cách mở trình duyệt, kiểm tra trang và thực hiện hành động tốt nhất tiếp theo dựa trên những gì họ thấy. Trong bài học này, bạn sẽ xây dựng một đại lý tự động trình duyệt tìm kiếm Airbnb, trích xuất dữ liệu danh sách có cấu trúc và xác định chỗ ở rẻ nhất ở Stockholm.

Bài học kết hợp Browser-Use để điều hướng dựa trên AI, Playwright và Chrome DevTools Protocol (CDP) để điều khiển trình duyệt, Azure OpenAI cho khả năng suy luận dựa trên thị giác, và Pydantic để trích xuất có cấu trúc.

## Giới thiệu

Bài học này sẽ bao gồm:

- Hiểu khi nào đại lý sử dụng máy tính phù hợp hơn tự động hóa chỉ bằng API
- Kết hợp Browser-Use với Playwright và CDP để quản lý vòng đời trình duyệt đáng tin cậy
- Sử dụng Azure OpenAI có khả năng thị giác và đầu ra Pydantic có cấu trúc để trích xuất dữ liệu danh sách từ các trang web động
- Quyết định khi nào nên dùng quy trình tự động trình duyệt ưu tiên đại lý, ưu tiên tác nhân, hoặc kết hợp

## Mục tiêu học tập

Sau khi hoàn thành bài học, bạn sẽ biết cách:

- Cấu hình Browser-Use với Azure OpenAI và Playwright
- Xây dựng quy trình tự động trình duyệt điều hướng trang web thực và xử lý các phần tử UI động
- Trích xuất kết quả được gõ kiểu từ nội dung trang hiển thị và chuyển thành logic nghiệp vụ tiếp theo
- Lựa chọn giữa mẫu đại lý hoặc tác nhân dựa trên độ dự đoán của nhiệm vụ trình duyệt

## Mẫu mã

Bài học này bao gồm một hướng dẫn trong notebook:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Khởi chạy phiên Chrome qua CDP, tìm kiếm danh sách Stockholm trên Airbnb, trích xuất giá với Browser-Use vision, và trả về lựa chọn rẻ nhất dưới dạng dữ liệu có cấu trúc.

## Yêu cầu trước

- Python 3.12+
- Triển khai Azure OpenAI được cấu hình trong môi trường của bạn
- Chrome hoặc Chromium được cài đặt cục bộ
- Các phụ thuộc Playwright đã được cài đặt
- Hiểu biết cơ bản về Python bất đồng bộ (async)

## Cài đặt

Cài đặt các gói dùng trong notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Cài đặt các biến môi trường Azure OpenAI được notebook sử dụng:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Tùy chọn: mặc định là phiên bản API mới nhất khi bỏ qua
AZURE_OPENAI_API_VERSION=...
```

## Tổng quan Kiến trúc

Notebook trình bày quy trình tự động trình duyệt kết hợp:

1. Chrome khởi chạy với CDP được bật để cả Playwright và Browser-Use có thể chia sẻ cùng phiên trình duyệt.
2. Một đại lý Browser-Use xử lý các tác vụ điều hướng mở như mở Airbnb, đóng các cửa sổ bật lên, và tìm kiếm Stockholm.
3. Trang đang hoạt động được kiểm tra với sơ đồ Pydantic có cấu trúc để trích xuất tiêu đề danh sách, giá theo đêm, đánh giá và URL.
4. Logic Python so sánh các danh sách trích xuất và tô đậm kết quả rẻ nhất.

Cách tiếp cận này giữ được khả năng suy luận dựa trên thị giác linh hoạt mà Browser-Use mạnh, đồng thời cung cấp cho bạn quyền kiểm soát trình duyệt xác định khi cần.

## Những điểm chính và Thực hành tốt nhất

### Khi Nào Dùng Đại lý và Khi Nào Dùng Tác nhân

| Tình huống | Dùng Đại lý | Dùng Tác nhân |
|------------|-------------|---------------|
| Bố cục động | Có, AI thích nghi với thay đổi trang | Không, bộ chọn dễ bị lỗi |
| Cấu trúc đã biết | Không, đại lý chậm hơn điều khiển trực tiếp | Có, nhanh và chính xác |
| Tìm phần tử | Có, ngôn ngữ tự nhiên hiệu quả | Không, cần bộ chọn chính xác |
| Kiểm soát thời gian | Không, kém dự đoán | Có, kiểm soát hoàn toàn chờ và thử lại |
| Quy trình phức tạp | Có, xử lý trạng thái UI bất ngờ | Không, cần nhánh rõ ràng |

### Thực hành tốt nhất với Browser-Use

1. Bắt đầu với đại lý cho khám phá và điều hướng động.
2. Chuyển sang điều khiển trang trực tiếp khi tương tác trở nên dự đoán được.
3. Sử dụng mô hình đầu ra có cấu trúc để dữ liệu trích xuất được xác thực và an toàn kiểu.
4. Thêm độ trễ chiến lược sau các hành động kích hoạt thay đổi UI hiển thị.
5. Chụp ảnh màn hình khi lặp lại để dễ gỡ lỗi khi thất bại.
6. Mong đợi các trang web thay đổi và thiết kế các chiến lược dự phòng cho hộp bật lên và chuyển đổi bố cục.
7. Kết hợp mẫu đại lý và tác nhân để có cả tính linh hoạt và chính xác.

### Ứng dụng Thực tế

- Đặt và theo dõi giá du lịch
- So sánh giá và kiểm tra tồn kho thương mại điện tử
- Trích xuất có cấu trúc từ các trang web động
- Kiểm thử UI nhận biết thị giác và xác minh
- Giám sát trang web và cảnh báo
- Tự động điền biểu mẫu thông minh qua các luồng đa bước

## Tài nguyên bổ sung

- [Mẫu tích hợp Browser-Use Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Tham số tác nhân và trích xuất nội dung của Browser-Use](https://docs.browser-use.com/customize/actor/all-parameters)
- [Thiết lập Khóa học](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi nỗ lực để đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn chính xác nhất. Đối với thông tin quan trọng, chúng tôi khuyến nghị sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->