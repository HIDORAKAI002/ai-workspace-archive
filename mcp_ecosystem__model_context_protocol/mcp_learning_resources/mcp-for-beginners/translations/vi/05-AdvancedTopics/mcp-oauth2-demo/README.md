# MCP OAuth2 Demo

## Giới thiệu

OAuth2 là giao thức tiêu chuẩn công nghiệp dành cho phân quyền, cho phép truy cập tài nguyên một cách an toàn mà không cần chia sẻ thông tin đăng nhập. Trong các triển khai MCP (Model Context Protocol), OAuth2 cung cấp một cách mạnh mẽ để xác thực và cấp quyền cho các client (chẳng hạn như các tác nhân AI) truy cập các máy chủ MCP và công cụ của chúng.

Bài học này trình bày cách triển khai xác thực OAuth2 cho các máy chủ MCP sử dụng Spring Boot, một mẫu phổ biến cho các triển khai doanh nghiệp và môi trường sản xuất.

## Mục tiêu học tập

Đến cuối bài học, bạn sẽ:
- Hiểu cách OAuth2 tích hợp với các máy chủ MCP
- Triển khai một máy chủ ủy quyền Spring để cấp token
- Bảo vệ các endpoint MCP bằng xác thực dựa trên JWT
- Cấu hình luồng client credentials cho giao tiếp giữa máy với máy

## Điều kiện tiên quyết

- Hiểu biết cơ bản về Java và Spring Boot
- Quen thuộc với các khái niệm MCP từ các module trước
- Đã cài đặt Maven hoặc Gradle

---

## Tổng quan dự án

Dự án này là một **ứng dụng Spring Boot tối giản** hoạt động đồng thời như:

* một **Spring Authorization Server** (cấp token truy cập JWT thông qua luồng `client_credentials`), và  
* một **Resource Server** (bảo vệ endpoint `/hello` của chính nó).

Nó mô phỏng thiết lập được trình bày trong [bài viết trên blog Spring (02 Tháng 4, 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Bắt đầu nhanh (cục bộ)

```bash
# xây dựng & chạy
./mvnw spring-boot:run

# lấy một token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# gọi endpoint được bảo vệ
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Kiểm thử cấu hình OAuth2

Bạn có thể kiểm thử cấu hình bảo mật OAuth2 với các bước sau:

### 1. Xác minh server đang chạy và đã được bảo vệ

```bash
# Điều này nên trả về 401 Unauthorized, xác nhận rằng bảo mật OAuth2 đang hoạt động
curl -v http://localhost:8081/
```

### 2. Lấy token truy cập sử dụng client credentials

```bash
# Lấy và trích xuất toàn bộ phản hồi token
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Hoặc chỉ trích xuất token (cần jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Lưu ý: Header Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) là mã hóa Base64 của `mcp-client:secret`.

### 3. Truy cập endpoint được bảo vệ sử dụng token

```bash
# Sử dụng token đã lưu
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Hoặc trực tiếp với giá trị token
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Phản hồi thành công với "Hello from MCP OAuth2 Demo!" xác nhận cấu hình OAuth2 hoạt động chính xác.

---

## Xây dựng container

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Triển khai lên **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

FQDN ingress trở thành **issuer** của bạn (`https://<fqdn>`).  
Azure tự động cung cấp chứng chỉ TLS tin cậy cho `*.azurecontainerapps.io`.

---

## Kết nối vào **Azure API Management**

Thêm chính sách inbound này vào API của bạn:

```xml
<inbound>
  <validate-jwt header-name="Authorization">
    <openid-config url="https://<fqdn>/.well-known/openid-configuration"/>
    <audiences>
      <audience>mcp-client</audience>
    </audiences>
  </validate-jwt>
  <base/>
</inbound>
```

APIM sẽ lấy JWKS và xác thực mọi yêu cầu.

---

## Phần tiếp theo

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc không chính xác. Văn bản gốc bằng ngôn ngữ gốc của tài liệu nên được coi là nguồn tham khảo chính thức. Đối với các thông tin quan trọng, chúng tôi khuyến nghị sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm đối với bất kỳ hiểu lầm hoặc diễn giải sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->