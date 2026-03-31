# MCP OAuth2 Demo

## บทนำ

OAuth2 คือโปรโตคอลมาตรฐานอุตสาหกรรมสำหรับการอนุญาตการเข้าถึง ช่วยให้การเข้าถึงทรัพยากรเป็นไปอย่างปลอดภัยโดยไม่ต้องแชร์ข้อมูลรับรอง ในการใช้งาน MCP (Model Context Protocol) OAuth2 ให้วิธีที่มั่นคงในการยืนยันตัวตนและอนุญาตให้ไคลเอนต์ (เช่น ตัวแทน AI) เข้าถึงเซิร์ฟเวอร์ MCP และเครื่องมือต่างๆ

บทเรียนนี้แสดงให้เห็นถึงวิธีการใช้งานการยืนยันตัวตน OAuth2 สำหรับเซิร์ฟเวอร์ MCP ด้วย Spring Boot ซึ่งเป็นรูปแบบที่ใช้กันทั่วไปสำหรับการนำไปใช้งานในองค์กรและการผลิต

## วัตถุประสงค์ในการเรียนรู้

เมื่อจบบทเรียนนี้ คุณจะสามารถ:
- เข้าใจว่าการทำงานร่วมกันระหว่าง OAuth2 กับเซิร์ฟเวอร์ MCP เป็นอย่างไร
- สร้าง Spring Authorization Server สำหรับการออกโทเค็น
- ปกป้องจุดเข้าใช้งาน MCP ด้วยการยืนยันตัวตนด้วย JWT
- กำหนดค่า client credentials flow สำหรับการสื่อสารระหว่างเครื่องจักรกับเครื่องจักร

## สิ่งที่ต้องมีพื้นฐาน

- ความเข้าใจพื้นฐานใน Java และ Spring Boot
- ความคุ้นเคยกับแนวคิด MCP จากโมดูลก่อนหน้า
- ติดตั้ง Maven หรือ Gradle แล้ว

---

## ภาพรวมโปรเจกต์

โปรเจกต์นี้เป็น **แอปพลิเคชัน Spring Boot ขั้นพื้นฐาน** ที่ทำหน้าที่ทั้ง:

* **Spring Authorization Server** (ออก access token แบบ JWT ผ่าน `client_credentials` flow) และ  
* **Resource Server** (ปกป้องจุดเข้าใช้งาน `/hello` ของตัวเอง)

โครงสร้างนี้เหมือนกับที่แสดงใน [บล็อกโพสต์ Spring (2 เม.ย. 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2)

---

## เริ่มต้นอย่างรวดเร็ว (แบบ local)

```bash
# สร้างและรัน
./mvnw spring-boot:run

# รับโทเค็น
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# เรียกใช้งานจุดสิ้นสุดที่ได้รับการป้องกัน
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## การทดสอบการกำหนดค่า OAuth2

คุณสามารถทดสอบการตั้งค่าความปลอดภัย OAuth2 ด้วยขั้นตอนดังนี้:

### 1. ตรวจสอบว่าเซิร์ฟเวอร์ทำงานและถูกป้องกันเรียบร้อยแล้ว

```bash
# สิ่งนี้ควรส่งกลับ 401 Unauthorized เพื่อยืนยันว่า OAuth2 security ทำงานอยู่
curl -v http://localhost:8081/
```

### 2. รับ access token โดยใช้ client credentials

```bash
# ดึงและแยกข้อมูลคำตอบโทเค็นเต็มรูปแบบ
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# หรือแยกเฉพาะโทเค็น (ต้องใช้ jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

หมายเหตุ: ส่วน header Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) คือการเข้ารหัส Base64 ของ `mcp-client:secret`

### 3. เข้าถึงจุดเข้าใช้งานที่ถูกป้องกันโดยใช้โทเค็น

```bash
# ใช้โทเค็นที่บันทึกไว้
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# หรือโดยตรงด้วยค่าของโทเค็น
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

หากได้รับการตอบสนองที่สำเร็จพร้อมข้อความ "Hello from MCP OAuth2 Demo!" หมายความว่าการตั้งค่า OAuth2 ทำงานอย่างถูกต้อง

---

## การสร้างคอนเทนเนอร์

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## การนำไปใช้งานบน **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

FQDN ของ ingress จะกลายเป็น **issuer** ของคุณ (`https://<fqdn>`)  
Azure จะจัดเตรียมใบรับรอง TLS ที่เชื่อถือได้ให้อัตโนมัติสำหรับ `*.azurecontainerapps.io`

---

## การเชื่อมต่อเข้ากับ **Azure API Management**

เพิ่มนโยบาย inbound นี้ให้กับ API ของคุณ:

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

APIM จะดึง JWKS และตรวจสอบความถูกต้องของทุกคำขอ

---

## ขั้นตอนถัดไป

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**คำปฏิเสธความรับผิดชอบ**:
เอกสารฉบับนี้ได้ถูกแปลโดยใช้บริการแปลภาษาอัตโนมัติ [Co-op Translator](https://github.com/Azure/co-op-translator) แม้เราจะพยายามให้ความถูกต้องสูงสุด โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความคลาดเคลื่อน เอกสารต้นฉบับในภาษาต้นทางถือเป็นแหล่งข้อมูลที่เป็นทางการ สำหรับข้อมูลที่มีความสำคัญ แนะนำให้ใช้บริการแปลโดยผู้เชี่ยวชาญด้านมนุษย์ เราจะไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความผิดที่เกิดขึ้นจากการใช้การแปลฉบับนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->