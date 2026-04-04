# กรณีศึกษา: เปิดเผย REST API ใน API Management เป็น MCP server

Azure API Management เป็นบริการที่ให้เกตเวย์บน API Endpoints ของคุณ วิธีการทำงานคือ Azure API Management ทำหน้าที่เหมือนพร็อกซีที่อยู่หน้าของ API ของคุณและสามารถตัดสินใจว่าจะทำอย่างไรกับคำขอที่เข้ามา

โดยการใช้มัน คุณจะได้เพิ่มฟีเจอร์มากมาย เช่น

- **ความปลอดภัย** คุณสามารถใช้ตั้งแต่ API keys, JWT ไปจนถึง managed identity
- **การจำกัดอัตรา (Rate limiting)** ฟีเจอร์ที่ยอดเยี่ยมคือสามารถกำหนดจำนวนการเรียกที่ผ่านได้ในหนึ่งหน่วยเวลาที่กำหนด ซึ่งช่วยให้ผู้ใช้ทุกคนได้รับประสบการณ์ที่ดีและยังทำให้บริการของคุณไม่ถูกคำขอท่วมท้นเกินไป
- **การปรับขนาดและการบาลานซ์โหลด (Scaling & Load balancing)** คุณสามารถตั้งค่าจุดสิ้นสุดจำนวนหนึ่งเพื่อบาลานซ์โหลด และยังสามารถเลือกวิธี "บาลานซ์โหลด" ได้
- **ฟีเจอร์ AI เช่น semantic caching** จำกัดจำนวนโทเค็นและการตรวจสอบโทเค็นและอื่น ๆ ซึ่งเป็นฟีเจอร์ที่ยอดเยี่ยมที่ช่วยเพิ่มประสิทธิภาพการตอบสนองและช่วยให้คุณควบคุมการใช้โทเค็นได้ดีขึ้น [อ่านเพิ่มเติมที่นี่](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)

## ทำไมต้อง MCP + Azure API Management?

Model Context Protocol กำลังกลายเป็นมาตรฐานสำหรับแอป AI เชิงตัวแทนและวิธีเปิดเผยเครื่องมือและข้อมูลอย่างสม่ำเสมอ Azure API Management เป็นตัวเลือกธรรมชาติเมื่อคุณจำเป็นต้อง "จัดการ" API โดย MCP Servers มักจะผสานรวมกับ API อื่น ๆ เพื่อตอบคำขอไปยังเครื่องมือบางอย่าง ดังนั้นการรวม Azure API Management และ MCP จึงมีเหตุผลมาก

## ภาพรวม

ในกรณีการใช้งานนี้ เราจะเรียนรู้การเปิดเผย API endpoints เป็น MCP Server ด้วยการทำเช่นนี้ เราสามารถทำให้ endpoints เหล่านี้เป็นส่วนหนึ่งของแอปเชิงตัวแทนอย่างง่ายดายและยังสามารถใช้ฟีเจอร์จาก Azure API Management ได้

## คุณสมบัติหลัก

- คุณเลือกวิธี endpoint ที่ต้องการเปิดเผยในฐานะเครื่องมือ
- ฟีเจอร์เพิ่มเติมที่คุณจะได้รับขึ้นอยู่กับสิ่งที่คุณกำหนดในส่วน policy สำหรับ API ของคุณ แต่ที่นี่เราจะแสดงวิธีเพิ่มการจำกัดอัตรา

## ขั้นตอนก่อนหน้า: นำเข้า API

ถ้าคุณมี API ใน Azure API Management อยู่แล้ว ยอดมาก คุณสามารถข้ามขั้นตอนนี้ ถ้าไม่เช่นนั้น ตรวจสอบลิงก์นี้ [นำเข้า API เข้า Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)

## เปิดเผย API เป็น MCP Server

เพื่อเปิดเผย API endpoints ให้ทำตามขั้นตอนนี้:

1. ไปที่ Azure Portal และที่อยู่ต่อไปนี้ <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
ไปยังอินสแตนซ์ API Management ของคุณ

1. ในเมนูซ้าย เลือก APIs > MCP Servers > + Create new MCP Server

1. ใน API เลือก REST API ที่ต้องการเปิดเป็น MCP server

1. เลือกหนึ่งหรือมากกว่าหนึ่ง API Operations ที่จะเปิดเผยเป็นเครื่องมือ คุณสามารถเลือกทั้งหมดหรือเฉพาะบาง operations

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. เลือก **Create**

1. ไปที่เมนู **APIs** และ **MCP Servers** คุณควรเห็นดังต่อไปนี้:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP server ถูกสร้างและ API operations ถูกเปิดเผยในรูปแบบเครื่องมือ MCP server จะแสดงในแผง MCP Servers คอลัมน์ URL แสดง endpoint ของ MCP server ที่คุณสามารถเรียกเพื่อทดสอบหรือใช้ในแอปพลิเคชันลูกค้าได้

## ตัวเลือก: กำหนดค่า policies

Azure API Management มีแนวคิดหลักคือ policies ซึ่งคุณตั้งกฎต่าง ๆ สำหรับ endpoints เช่น การจำกัดอัตราหรือ semantic caching นโยบายเหล่านี้ถูกเขียนในรูปแบบ XML

นี่คือวิธีตั้งค่านโยบายเพื่อจำกัดอัตราสำหรับ MCP Server ของคุณ:

1. ในพอร์ทัล ภายใต้ APIs ให้เลือก **MCP Servers**

1. เลือก MCP server ที่คุณสร้าง

1. ในเมนูซ้าย ภายใต้ MCP เลือก **Policies**

1. ในตัวแก้ไขนโยบาย เพิ่มหรือแก้ไขนโยบายที่คุณต้องการใช้กับเครื่องมือของ MCP server นโยบายถูกกำหนดในรูปแบบ XML ตัวอย่างเช่น คุณสามารถเพิ่มนโยบายจำกัดการเรียกใช้เครื่องมือ MCP server (เช่น 5 การเรียกต่อ 30 วินาทีต่อไอพีไคลเอนต์) นี่คือตัวอย่าง XML ที่จะทำให้เกิดการจำกัด:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    นี่คือรูปภาพตัวแก้ไขนโยบาย:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)

## ทดลองใช้งาน

มาตรวจสอบให้แน่ใจว่า MCP Server ของเราทำงานตามที่ตั้งใจไว้

สำหรับการนี้ เราจะใช้ Visual Studio Code และ GitHub Copilot พร้อมโหมด Agent เราจะเพิ่ม MCP server ลงใน *mcp.json* ด้วยการทำเช่นนี้ Visual Studio Code จะทำงานเป็นไคลเอนต์ที่มีความสามารถเชิงตัวแทนและผู้ใช้สุดท้ายจะสามารถพิมพ์พรอมต์และโต้ตอบกับเซิร์ฟเวอร์นั้นได้

มาดูวิธีเพิ่ม MCP server ใน Visual Studio Code:

1. ใช้คำสั่ง MCP: **Add Server จาก Command Palette**

1. เมื่อได้รับการแจ้งให้เลือกประเภทเซิร์ฟเวอร์: **HTTP (HTTP หรือ Server Sent Events)**

1. ป้อน URL ของ MCP server ใน API Management ตัวอย่าง: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (สำหรับจุดสิ้นสุด SSE) หรือ **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (สำหรับจุดสิ้นสุด MCP) สังเกตความแตกต่างของ transport จะเป็น `/sse` หรือ `/mcp`

1. ป้อน ID ของเซิร์ฟเวอร์ที่คุณเลือก นี่ไม่ใช่ค่าที่สำคัญแต่จะช่วยคุณจำได้ว่าอินสแตนซ์เซิร์ฟเวอร์นี้คืออะไร

1. เลือกว่าจะบันทึกการตั้งค่าไปยังการตั้งค่า workspace หรือ user

  - **Workspace settings** - การตั้งค่าเซิร์ฟเวอร์จะถูกบันทึกไปยังไฟล์ .vscode/mcp.json ใช้ได้เฉพาะใน workspace ปัจจุบัน

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    หรือถ้าคุณเลือก streaming HTTP เป็น transport มันจะต่างกันเล็กน้อย:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - การตั้งค่าเซิร์ฟเวอร์จะถูกเพิ่มในไฟล์ *settings.json* ทั่วโลกของคุณและใช้ได้ในทุก workspace การตั้งค่าจะมีลักษณะคล้ายดังนี้:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. คุณยังต้องเพิ่มการตั้งค่า header เพื่อให้แน่ใจว่าการตรวจสอบสิทธิ์กับ Azure API Management ทำได้ถูกต้อง มันใช้ header ชื่อ **Ocp-Apim-Subscription-Key**

    - นี่คือวิธีการเพิ่มลงใน settings:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png) ซึ่งจะทำให้มี prompt ขอให้ป้อนค่า API key ซึ่งคุณสามารถหาได้ใน Azure Portal สำหรับอินสแตนซ์ Azure API Management ของคุณ

   - หากต้องการเพิ่มใน *mcp.json* แทน คุณสามารถเพิ่มได้ดังนี้:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### ใช้โหมด Agent

ตอนนี้เราตั้งค่าทั้งใน settings หรือใน *.vscode/mcp.json* เรียบร้อยแล้ว มาลองใช้งานกัน

จะมีไอคอน Tools ดังนี้ ที่จะแสดงเครื่องมือที่เปิดเผยจากเซิร์ฟเวอร์ของคุณ:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. คลิกไอคอนเครื่องมือและคุณจะเห็นรายชื่อเครื่องมือดังนี้:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. ป้อนพรอมต์ในแชทเพื่อเรียกใช้เครื่องมือ ตัวอย่างเช่นถ้าคุณเลือกเครื่องมือเพื่อรับข้อมูลเกี่ยวกับคำสั่ง คุณสามารถถามตัวแทนเกี่ยวกับคำสั่งนั้น นี่คือตัวอย่างพรอมต์:

    ```text
    get information from order 2
    ```

    ตอนนี้คุณจะเห็นไอคอนเครื่องมือถามว่าต้องการเรียกใช้เครื่องมือหรือไม่ เลือกเพื่อดำเนินการเครื่องมือต่อไป คุณจะเห็นผลลัพธ์เป็นข้อความดังนี้:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **สิ่งที่คุณเห็นด้านบนขึ้นอยู่กับเครื่องมือที่ตั้งค่าไว้ แต่แนวคิดคือคุณจะได้รับการตอบกลับเป็นข้อความเหมือนตัวอย่างข้างต้น**

## เอกสารอ้างอิง

นี่คือแหล่งข้อมูลเพิ่มเติม:

- [บทแนะนำเกี่ยวกับ Azure API Management และ MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [ตัวอย่าง Python: การรักษาความปลอดภัย MCP servers ระยะไกลโดยใช้ Azure API Management (ทดลอง)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [ห้องปฏิบัติการการอนุญาตลูกค้า MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [ใช้ส่วนขยาย Azure API Management สำหรับ VS Code ในการนำเข้าและจัดการ APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [ลงทะเบียนและค้นหา MCP servers ระยะไกลใน Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) รีโพที่ยอดเยี่ยมที่แสดงความสามารถ AI หลายอย่างกับ Azure API Management
- [เวิร์กช็อป AI Gateway](https://azure-samples.github.io/AI-Gateway/) ประกอบด้วยเวิร์กช็อปที่ใช้ Azure Portal ซึ่งเป็นวิธีที่ดีในการเริ่มประเมินความสามารถ AI

## ขั้นตอนถัดไป

- กลับไปที่: [ภาพรวมกรณีศึกษา](./README.md)
- ต่อไป: [ตัวแทนท่องเที่ยว Azure AI](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ข้อจำกัดความรับผิดชอบ**:  
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษาด้วยปัญญาประดิษฐ์ [Co-op Translator](https://github.com/Azure/co-op-translator) แม้ว่าพวกเราจะพยายามให้มีความถูกต้อง แต่โปรดทราบว่าการแปลอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่แม่นยำ เอกสารต้นฉบับในภาษาดั้งเดิมควรถือเป็นแหล่งข้อมูลที่น่าเชื่อถือ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้บริการแปลโดยมนุษย์มืออาชีพ พวกเราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความผิดใด ๆ ที่เกิดจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->