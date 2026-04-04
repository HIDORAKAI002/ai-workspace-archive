# เรียกใช้ตัวอย่าง

## สร้างสภาพแวดล้อมเสมือน

```sh
python -m venv venv
source ./venv/bin/activate
```

## ติดตั้ง dependencies

```sh
pip install "mcp[cli]"
```

## เรียกใช้เซิร์ฟเวอร์

```sh
uvicorn server:app --port 8000
```

## ทดสอบเซิร์ฟเวอร์ด้วย GitHub Copilot และ VS Code

เพิ่มรายการลงใน mcp.json ดังนี้:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

ตรวจสอบให้แน่ใจว่าคลิก "start" บนเซิร์ฟเวอร์แล้ว

ใน GitHub Copilot วาง prompt ต่อไปนี้:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

ครั้งแรกคุณจะถูกถามว่าจะยอมรับการดำเนินการ Sampling หรือไม่ จากนั้นคุณจะถูกถามใหัรับเครื่องมือในการรัน "create_blog" คุณควรเห็นการตอบสนองคล้ายกับ:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ข้อจำกัดความรับผิดชอบ**:  
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) แม้เราจะพยายามให้มีความถูกต้อง แต่โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความคลาดเคลื่อน เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลสำคัญ ควรใช้การแปลโดยนักแปลมืออาชีพเท่านั้น เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดอันเกิดจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->