# การพัฒนาบริการ Microsoft Foundry Agent

ในแบบฝึกหัดนี้ คุณจะใช้เครื่องมือ Microsoft Foundry Agent Service ใน [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) เพื่อสร้างเอเย่นต์สำหรับการจองเที่ยวบิน เอเย่นต์จะสามารถโต้ตอบกับผู้ใช้และให้ข้อมูลเกี่ยวกับเที่ยวบินได้

## สิ่งที่ต้องเตรียม

เพื่อทำแบบฝึกหัดนี้ให้เสร็จสิ้น คุณต้องมีสิ่งต่อไปนี้:
1. บัญชี Azure พร้อมการสมัครใช้งานที่ใช้งานอยู่ [สร้างบัญชีฟรี](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)
2. คุณต้องมีสิทธิ์ในการสร้าง Microsoft Foundry hub หรือต้องให้มีการสร้างไว้ให้คุณ
    - หากบทบาทของคุณคือ Contributor หรือ Owner คุณสามารถทำตามขั้นตอนในบทเรียนนี้ได้

## สร้าง Microsoft Foundry hub

> **หมายเหตุ:** Microsoft Foundry เคยรู้จักกันในชื่อ Azure AI Studio

1. ทำตามแนวทางจากโพสต์บล็อกของ [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) สำหรับการสร้าง Microsoft Foundry hub
2. เมื่อโครงการของคุณถูกสร้างขึ้นแล้ว ให้ปิดคำแนะนำที่แสดงและตรวจสอบหน้าของโครงการใน Microsoft Foundry portal ซึ่งควรมีลักษณะคล้ายภาพด้านล่างนี้:

    ![Microsoft Foundry Project](../../../translated_images/th/azure-ai-foundry.88d0c35298348c2f.webp)

## นำโมเดลมาใช้

1. ในแถบด้านซ้ายของโครงการของคุณ ในส่วน **My assets** ให้เลือกหน้าของ **Models + endpoints**
2. ในหน้าของ **Models + endpoints** ในแท็บ **Model deployments** ในเมนู **+ Deploy model** ให้เลือก **Deploy base model**
3. ค้นหาโมเดล `gpt-4.1-mini` ในรายการ จากนั้นเลือกและยืนยัน

    > **หมายเหตุ**: การลด TPM จะช่วยหลีกเลี่ยงการใช้โควต้าที่มีในสมัครใช้งานของคุณมากเกินไป

    ![Model Deployed](../../../translated_images/th/model-deployment.3749c53fb81e18fd.webp)

## สร้างเอเย่นต์

ตอนนี้คุณได้นำโมเดลมาใช้แล้ว คุณสามารถสร้างเอเย่นต์ได้ เอเย่นต์คือโมเดลปัญญาประดิษฐ์สนทนาที่สามารถใช้โต้ตอบกับผู้ใช้ได้

1. ในแถบด้านซ้ายของโครงการของคุณ ในส่วน **Build & Customize** ให้เลือกหน้าของ **Agents**
2. คลิก **+ Create agent** เพื่อสร้างเอเย่นต์ใหม่ ในกล่องโต้ตอบ **Agent Setup**:
    - ป้อนชื่อสำหรับเอเย่นต์ เช่น `FlightAgent`
    - ตรวจสอบให้แน่ใจว่าได้เลือกการนำโมเดล `gpt-4.1-mini` ที่คุณได้สร้างไว้ก่อนหน้านี้แล้ว
    - ตั้งค่า **คำแนะนำ** ตามพรอมต์ที่คุณต้องการให้เอเย่นต์ปฏิบัติตาม ตัวอย่างเช่น:
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
> สำหรับพรอมต์ที่ละเอียด คุณสามารถดูที่ [ที่เก็บนี้](https://github.com/ShivamGoyal03/RoamMind) เพื่อข้อมูลเพิ่มเติม
    
> นอกจากนี้ คุณสามารถเพิ่ม **Knowledge Base** และ **Actions** เพื่อเสริมความสามารถของเอเย่นต์ในการให้ข้อมูลเพิ่มเติมและดำเนินการงานอัตโนมัติตามคำขอของผู้ใช้ สำหรับแบบฝึกหัดนี้ คุณสามารถข้ามขั้นตอนเหล่านี้ได้
    
![Agent Setup](../../../translated_images/th/agent-setup.9bbb8755bf5df672.webp)

3. เพื่อสร้างเอเย่นต์ AI หลายตัวใหม่ ให้คลิก **New Agent** เอเย่นต์ที่สร้างขึ้นใหม่จะแสดงบนหน้าของ Agents


## ทดสอบเอเย่นต์

หลังจากสร้างเอเย่นต์แล้ว คุณสามารถทดสอบเพื่อดูว่ามันตอบสนองต่อคำถามของผู้ใช้อย่างไรใน Microsoft Foundry portal playground

1. ที่ด้านบนของแผง **Setup** สำหรับเอเย่นต์ของคุณ ให้เลือก **Try in playground**
2. ในแผง **Playground** คุณสามารถโต้ตอบกับเอเย่นต์โดยพิมพ์คำถามในหน้าต่างแชท เช่น คุณสามารถขอให้เอเย่นต์ค้นหาเที่ยวบินจากซีแอตเทิลไปนิวยอร์กในวันที่ 28

    > **หมายเหตุ**: เอเย่นต์อาจไม่ให้คำตอบที่ถูกต้อง เพราะไม่มีการใช้ข้อมูลเรียลไทม์ในแบบฝึกหัดนี้ จุดประสงค์เพื่อทดสอบความสามารถของเอเย่นต์ในการเข้าใจและตอบคำถามของผู้ใช้ตามคำแนะนำที่มอบให้

    ![Agent Playground](../../../translated_images/th/agent-playground.dc146586de715010.webp)

3. หลังจากทดสอบเอเย่นต์แล้ว คุณสามารถปรับแต่งเพิ่มเติมโดยการเพิ่มเจตนา ข้อมูลฝึก และการกระทำเพิ่มเติมเพื่อเสริมความสามารถ

## ล้างทรัพยากร

เมื่อคุณทดสอบเอเย่นต์เสร็จแล้ว คุณสามารถลบเอเย่นต์เพื่อหลีกเลี่ยงค่าใช้จ่ายเพิ่มเติม
1. เปิด [Azure portal](https://portal.azure.com) แล้วดูเนื้อหาของกลุ่มทรัพยากรที่คุณได้ใช้นำทรัพยากร hub สำหรับแบบฝึกหัดนี้ไปใช้
2. บนแถบเครื่องมือ ให้เลือก **Delete resource group**
3. ป้อนชื่อกลุ่มทรัพยากรและยืนยันว่าคุณต้องการลบ

## ทรัพยากร

- [เอกสาร Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [พอร์ท Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [เริ่มต้นใช้งาน Microsoft Foundry](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [พื้นฐานของ AI agents บน Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->