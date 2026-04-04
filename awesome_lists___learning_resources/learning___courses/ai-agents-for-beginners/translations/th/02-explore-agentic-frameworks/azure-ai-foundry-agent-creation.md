# การพัฒนา Azure AI Agent Service

ในแบบฝึกหัดนี้ คุณจะใช้เครื่องมือบริการ Azure AI Agent ใน [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) เพื่อสร้างเอเจนต์สำหรับการจองเที่ยวบิน เอเจนต์จะสามารถโต้ตอบกับผู้ใช้และให้ข้อมูลเกี่ยวกับเที่ยวบินได้

## ข้อกำหนดเบื้องต้น

ในการทำแบบฝึกหัดนี้ให้เสร็จ คุณต้องมีสิ่งต่อไปนี้:
1. บัญชี Azure ที่มีการสมัครใช้งานที่ยังใช้งานอยู่ [สร้างบัญชีฟรี](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)
2. คุณต้องมีสิทธิ์ในการสร้าง Microsoft Foundry hub หรือมีการสร้างให้เรียบร้อย
    - หากบทบาทของคุณเป็น Contributor หรือ Owner คุณสามารถทำตามขั้นตอนในบทช่วยสอนนี้ได้

## สร้าง Microsoft Foundry hub

> **หมายเหตุ:** Microsoft Foundry เคยมีชื่อว่า Azure AI Studio

1. ทำตามแนวทางจากบล็อกโพสต์ของ [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) สำหรับการสร้าง Microsoft Foundry hub
2. เมื่อโครงการของคุณถูกสร้าง ปิดคำแนะนำใด ๆ ที่แสดงขึ้นและตรวจสอบหน้าจอโปรเจกต์ในพอร์ทัล Microsoft Foundry ซึ่งควรมีลักษณะคล้ายกับภาพต่อไปนี้:

    ![โครงการ Microsoft Foundry](../../../translated_images/th/azure-ai-foundry.88d0c35298348c2f.webp)

## ปรับใช้โมเดล

1. ในแผงด้านซ้ายของโปรเจกต์ของคุณ ในส่วน **My assets** ให้เลือกหน้าของ **Models + endpoints**
2. ในหน้าของ **Models + endpoints** ในแท็บ **Model deployments** ในเมนู **+ Deploy model** ให้เลือก **Deploy base model**
3. ค้นหาโมเดล `gpt-4o-mini` ในรายการ แล้วทำการเลือกและยืนยันการเลือก

    > **หมายเหตุ**: การลด TPM ช่วยหลีกเลี่ยงการใช้งานโควต้ามากเกินไปในการสมัครที่คุณกำลังใช้

    ![โมเดลที่ปรับใช้](../../../translated_images/th/model-deployment.3749c53fb81e18fd.webp)

## สร้างเอเจนต์

เมื่อคุณได้ปรับใช้โมเดลแล้ว คุณสามารถสร้างเอเจนต์ได้ เอเจนต์คือโมเดลการสนทนาที่ใช้โต้ตอบกับผู้ใช้ได้

1. ในแผงด้านซ้ายของโปรเจกต์ของคุณ ในส่วน **Build & Customize** ให้เลือกหน้าของ **Agents**
2. คลิก **+ Create agent** เพื่อสร้างเอเจนต์ใหม่ ในกล่องโต้ตอบ **Agent Setup**:
    - ป้อนชื่อสำหรับเอเจนต์ เช่น `FlightAgent`
    - ตรวจสอบให้แน่ใจว่าได้เลือกการปรับใช้โมเดล `gpt-4o-mini` ที่คุณสร้างไว้ก่อนหน้านี้
    - ตั้งค่า **Instructions** ตามพรอมต์ที่คุณต้องการให้เอเจนต์ปฏิบัติตาม นี่คือตัวอย่าง:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> สำหรับพรอมต์โดยละเอียด คุณสามารถดูได้ที่ [คลังโค้ดนี้](https://github.com/ShivamGoyal03/RoamMind) เพื่อข้อมูลเพิ่มเติม。
    
> ยิ่งไปกว่านั้น คุณสามารถเพิ่ม **Knowledge Base** และ **Actions** เพื่อเพิ่มความสามารถของเอเจนต์ในการให้ข้อมูลเพิ่มเติมและทำงานอัตโนมัติตามคำขอของผู้ใช้ สำหรับแบบฝึกหัดนี้ คุณสามารถข้ามขั้นตอนเหล่านี้ได้
    
![การตั้งค่าเอเจนต์](../../../translated_images/th/agent-setup.9bbb8755bf5df672.webp)

3. ในการสร้างเอเจนต์แบบ multi-AI ใหม่ เพียงคลิก **New Agent** เอเจนต์ที่สร้างใหม่จะแสดงบนหน้าของ Agents

## ทดสอบเอเจนต์

หลังจากสร้างเอเจนต์แล้ว คุณสามารถทดสอบว่าจะตอบสนองต่อคำถามของผู้ใช้ใน Microsoft Foundry portal playground อย่างไร

1. ที่ด้านบนของแผง **Setup** สำหรับเอเจนต์ของคุณ ให้เลือก **Try in playground**
2. ในแผง **Playground** คุณสามารถโต้ตอบกับเอเจนต์โดยพิมพ์คำถามในหน้าต่างแชท ตัวอย่างเช่น คุณสามารถถามเอเจนต์ให้ค้นหาเที่ยวบินจาก Seattle ไปยัง New York ในวันที่ 28 ได้

    > **หมายเหตุ**: เอเจนต์อาจไม่ให้คำตอบที่ถูกต้องเสมอไป เนื่องจากไม่มีการใช้ข้อมูลเรียลไทม์ในแบบฝึกหัดนี้ จุดประสงค์คือการทดสอบความสามารถของเอเจนต์ในการเข้าใจและตอบสนองต่อคำถามของผู้ใช้ตามคำแนะนำที่ให้ไว้

    ![สนามทดสอบเอเจนต์](../../../translated_images/th/agent-playground.dc146586de715010.webp)

3. หลังจากทดสอบเอเจนต์แล้ว คุณสามารถปรับแต่งเพิ่มเติมโดยการเพิ่มเจตนา ข้อมูลการฝึก และการกระทำต่าง ๆ เพื่อเพิ่มความสามารถของเอเจนต์

## ลบทรัพยากร

เมื่อคุณทดสอบเอเจนต์เสร็จแล้ว คุณสามารถลบเอเจนต์เพื่อหลีกเลี่ยงค่าใช้จ่ายเพิ่มเติมได้
1. เปิด [Azure portal](https://portal.azure.com) แล้วดูเนื้อหาของ resource group ที่คุณได้ปรับใช้ทรัพยากร hub ในแบบฝึกหัดนี้
2. บนแถบเครื่องมือ ให้เลือก **Delete resource group**
3. ป้อนชื่อ resource group และยืนยันว่าคุณต้องการลบ

## แหล่งข้อมูล

- [เอกสาร Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [การเริ่มต้นใช้งาน Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [พื้นฐานของเอเจนต์ AI บน Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ข้อจำกัดความรับผิดชอบ**:
เอกสารฉบับนี้ได้รับการแปลโดยใช้บริการแปลภาษาด้วย AI [Co-op Translator](https://github.com/Azure/co-op-translator) แม้ว่าเราจะพยายามให้การแปลมีความถูกต้อง โปรดทราบว่าการแปลอัตโนมัติอาจมีข้อผิดพลาดหรือความคลาดเคลื่อน เอกสารต้นฉบับในภาษาต้นทางควรถือเป็นแหล่งข้อมูลที่เป็นทางการ สำหรับข้อมูลที่มีความสำคัญ ควรใช้การแปลโดยนักแปลมืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดอันเกิดจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->