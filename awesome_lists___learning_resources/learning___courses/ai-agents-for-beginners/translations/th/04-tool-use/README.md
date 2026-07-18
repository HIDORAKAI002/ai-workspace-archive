[![วิธีออกแบบเอเจนต์ AI ที่ดี](../../../translated_images/th/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(คลิกที่ภาพด้านบนเพื่อดูวิดีโอบทเรียนนี้)_

# รูปแบบการออกแบบการใช้เครื่องมือ

เครื่องมือเป็นสิ่งที่น่าสนใจเพราะช่วยให้เอเจนต์ AI มีความสามารถที่กว้างขึ้น แทนที่เอเจนต์จะมีชุดคำสั่งจำกัดที่สามารถทำได้ ด้วยการเพิ่มเครื่องมือ เอเจนต์ก็สามารถทำงานได้หลากหลายมากขึ้น ในบทนี้ เราจะมาดูรูปแบบการออกแบบการใช้เครื่องมือ ซึ่งอธิบายว่าเอเจนต์ AI สามารถใช้เครื่องมือเฉพาะเพื่อบรรลุเป้าหมายได้อย่างไร

## บทนำ

ในบทเรียนนี้ เราต้องการตอบคำถามดังต่อไปนี้:

- รูปแบบการออกแบบการใช้เครื่องมือคืออะไร?
- มีกรณีการใช้งานใดบ้างที่สามารถนำไปใช้ได้?
- องค์ประกอบหรือบล็อกพื้นฐานที่จำเป็นในการนำรูปแบบการออกแบบไปใช้มีอะไรบ้าง?
- มีข้อควรพิเศษใดบ้างสำหรับการใช้รูปแบบการออกแบบการใช้เครื่องมือเพื่อสร้างเอเจนต์ AI ที่น่าเชื่อถือ?

## เป้าหมายการเรียนรู้

หลังจากทำบทเรียนนี้เสร็จ คุณจะสามารถ:

- นิยามรูปแบบการออกแบบการใช้เครื่องมือและวัตถุประสงค์ของมัน
- ระบุกรณีการใช้งานที่สามารถใช้รูปแบบการออกแบบการใช้เครื่องมือได้
- เข้าใจองค์ประกอบสำคัญที่จำเป็นสำหรับการนำรูปแบบการออกแบบไปใช้
- รับรู้ข้อพิจารณาเพื่อให้มั่นใจว่าเอเจนต์ AI ที่ใช้รูปแบบนี้มีความน่าเชื่อถือ

## รูปแบบการออกแบบการใช้เครื่องมือคืออะไร?

**รูปแบบการออกแบบการใช้เครื่องมือ** มุ่งเน้นให้ LLMs มีความสามารถในการโต้ตอบกับเครื่องมือภายนอกเพื่อบรรลุเป้าหมายเฉพาะ เครื่องมือคือโค้ดที่เอเจนต์สามารถเรียกใช้เพื่อดำเนินการต่าง ๆ เครื่องมืออาจเป็นฟังก์ชันง่าย ๆ เช่นเครื่องคิดเลข หรือการเรียก API ไปยังบริการภายนอก เช่นการดูราคาหุ้นหรือพยากรณ์อากาศ ในบริบทของเอเจนต์ AI เครื่องมือถูกออกแบบให้เอเจนต์ใช้ผ่าน **การเรียกฟังก์ชันที่สร้างโดยโมเดล**

## มีกรณีการใช้งานใดบ้างที่สามารถนำไปใช้ได้?

เอเจนต์ AI สามารถใช้เครื่องมือเพื่อทำงานที่ซับซ้อน ดึงข้อมูล หรือทำการตัดสินใจ รูปแบบการออกแบบการใช้เครื่องมือมักใช้ในสถานการณ์ที่ต้องมีการโต้ตอบแบบไดนามิกกับระบบภายนอก เช่นฐานข้อมูล บริการเว็บ หรือการแปลความหมายโค้ด ความสามารถนี้มีประโยชน์ในหลายกรณี เช่น:

- **การดึงข้อมูลแบบไดนามิก:** เอเจนต์สามารถสอบถาม API ภายนอกหรือฐานข้อมูลเพื่อดึงข้อมูลอัปเดต (เช่น การสอบถามฐานข้อมูล SQLite สำหรับการวิเคราะห์ข้อมูล ดึงราคาหุ้นหรือข้อมูลสภาพอากาศ)
- **การประมวลผลและแปลความหมายโค้ด:** เอเจนต์สามารถรันโค้ดหรือสคริปต์เพื่อแก้ปัญหาทางคณิตศาสตร์ สร้างรายงาน หรือทำการจำลองสถานการณ์
- **ระบบอัตโนมัติของเวิร์กโฟลว์:** การอัตโนมัติงานซ้ำหรือเวิร์กโฟลว์หลายขั้นตอนด้วยการผสานเครื่องมือ เช่นตัวจัดตารางงาน บริการอีเมล หรือสายข้อมูล
- **การสนับสนุนลูกค้า:** เอเจนต์สามารถโต้ตอบกับระบบ CRM แพลตฟอร์มตั๋ว หรือต้นความรู้เพื่อแก้ไขคำถามของผู้ใช้
- **การสร้างและแก้ไขเนื้อหา:** เอเจนต์สามารถใช้เครื่องมือตรวจสอบไวยากรณ์ สรุปข้อความ หรือการประเมินความปลอดภัยเนื้อหาเพื่อช่วยงานสร้างสรรค์เนื้อหา

## องค์ประกอบ/บล็อกพื้นฐานที่จำเป็นสำหรับการนำรูปแบบการใช้เครื่องมือไปใช้มีอะไรบ้าง?

บล็อกพื้นฐานเหล่านี้ช่วยให้นายหน้าของ AI สามารถทำงานได้หลากหลาย มาดูองค์ประกอบสำคัญที่จำเป็นสำหรับการนำรูปแบบการออกแบบการใช้เครื่องมือไปใช้กัน:

- **Schema ฟังก์ชัน/เครื่องมือ**: การกำหนดรายละเอียดเครื่องมือที่มีอยู่ รวมถึงชื่อฟังก์ชัน วัตถุประสงค์ พารามิเตอร์ที่ต้องการ และผลลัพธ์ที่คาดหวัง Schema เหล่านี้ช่วยให้ LLM เข้าใจว่าเครื่องมือใดบ้างที่มี และวิธีการสร้างคำขอที่ถูกต้อง

- **ตรรกะการเรียกใช้ฟังก์ชัน**: กำหนดวิธีและเวลาที่เครื่องมือถูกเรียกใช้ตามเจตนาของผู้ใช้และบริบทการสนทนา อาจรวมโมดูลวางแผน กลไกการกำหนดเส้นทาง หรือการไหลแบบมีเงื่อนไขที่กำหนดการใช้เครื่องมือแบบไดนามิก

- **ระบบจัดการข้อความ**: องค์ประกอบที่จัดการการไหลของการสนทนาระหว่างอินพุตของผู้ใช้ ตอบกลับจาก LLM การเรียกเครื่องมือ และผลลัพธ์จากเครื่องมือ

- **กรอบการรวมเครื่องมือ**: โครงสร้างพื้นฐานที่เชื่อมต่อเอเจนต์กับเครื่องมือต่าง ๆ ไม่ว่าจะเป็นฟังก์ชันง่าย ๆ หรือบริการภายนอกที่ซับซ้อน

- **การจัดการข้อผิดพลาดและการตรวจสอบความถูกต้อง**: กลไกจัดการความล้มเหลวในการเรียกใช้เครื่องมือ ตรวจสอบพารามิเตอร์ และจัดการกับผลลัพธ์ที่ไม่คาดคิด

- **การจัดการสถานะ**: ติดตามบริบทการสนทนา การโต้ตอบกับเครื่องมือก่อนหน้า และข้อมูลที่เก็บถาวร เพื่อให้มั่นใจในความสอดคล้องผ่านหลายรอบของการสนทนา

ต่อไป มาดูรายละเอียดเพิ่มเติมเกี่ยวกับการเรียกฟังก์ชัน/เครื่องมือกัน
 
### การเรียกฟังก์ชัน/เครื่องมือ

การเรียกฟังก์ชันเป็นวิธีหลักที่เราเปิดให้โมเดลภาษาขนาดใหญ่ (LLMs) สามารถโต้ตอบกับเครื่องมือได้ คุณมักจะเห็นคำว่า 'ฟังก์ชัน' และ 'เครื่องมือ' ใช้แทนกันเพราะ 'ฟังก์ชัน' (บล็อกโค้ดที่ใช้ซ้ำได้) คือ 'เครื่องมือ' ที่เอเจนต์ใช้ทำงาน เพื่อให้สามารถเรียกใช้โค้ดของฟังก์ชันได้ LLM ต้องเปรียบเทียบคำขอของผู้ใช้กับคำอธิบายของฟังก์ชัน เพื่อทำเช่นนี้ เราจะส่ง schema ที่ประกอบด้วยคำอธิบายของฟังก์ชันทั้งหมดที่มีให้กับ LLM จากนั้น LLM จะเลือกฟังก์ชันที่เหมาะสมที่สุดสำหรับงานและส่งชื่อฟังก์ชันและอาร์กิวเมนต์กลับมา ฟังก์ชันที่ถูกเลือกจะถูกเรียกใช้ และการตอบกลับจะถูกส่งกลับไปยัง LLM ซึ่งจะใช้ข้อมูลนั้นเพื่อตอบสนองคำขอของผู้ใช้

สำหรับนักพัฒนาที่ต้องการนำการเรียกฟังก์ชันมาใช้สำหรับเอเจนต์ คุณจะต้องมี:

1. โมเดล LLM ที่รองรับการเรียกฟังก์ชัน
2. Schema ที่ประกอบด้วยคำบรรยายฟังก์ชัน
3. โค้ดสำหรับแต่ละฟังก์ชันที่ได้อธิบายไว้

มาดูตัวอย่างการดึงเวลาปัจจุบันในเมืองเพื่ออธิบายกัน:

1. **เริ่มต้นโมเดล LLM ที่รองรับการเรียกฟังก์ชัน:**

    โมเดลไม่ใช่ทุกตัวที่รองรับการเรียกฟังก์ชัน ดังนั้นจึงสำคัญที่ต้องตรวจสอบว่า LLM ที่คุณใช้งานรองรับไหม <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> รองรับการเรียกฟังก์ชันได้ เราสามารถเริ่มต้นโดยการสร้างไคลเอนต์ OpenAI กับ Azure OpenAI **Responses API** (เป็น endpoint `/openai/v1/` ที่เสถียร — ไม่ต้องใช้ `api_version`) 

    ```python
    # เริ่มต้นไคลเอ็นต์ OpenAI สำหรับ Azure OpenAI (Responses API, จุดสิ้นสุด v1)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **สร้าง Schema ฟังก์ชัน:**

    ต่อไปเราจะกำหนด schema JSON ที่ประกอบด้วยชื่อฟังก์ชัน คำอธิบายว่า ฟังก์ชันทำอะไร และชื่อพร้อมคำอธิบายของพารามิเตอร์ฟังก์ชัน
    จากนั้นเราจะนำ schema นี้ส่งไปยังไคลเอนต์ที่สร้างไว้ก่อนหน้า พร้อมกับคำขอของผู้ใช้เพื่อหาช่วงเวลาในซานฟรานซิสโก สิ่งที่สำคัญคือ **การเรียกเครื่องมือ** คือสิ่งที่ถูกส่งกลับมา **ไม่ใช่** คำตอบสุดท้ายของคำถามตามที่ได้กล่าวไว้ข้างต้น LLM จะคืนชื่อฟังก์ชันที่เลือกสำหรับงานและอาร์กิวเมนต์ที่จะส่งไปให้

    ```python
    # คำอธิบายฟังก์ชันสำหรับโมเดลอ่าน (รูปแบบเครื่องมือแบน API ตอบสนอง)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # ข้อความผู้ใช้เบื้องต้น
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # การเรียก API ครั้งแรก: ขอให้โมเดลใช้ฟังก์ชัน
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # API การตอบกลับส่งคืนการเรียกใช้งานเครื่องมือในรูปแบบฟังก์ชัน_call ใน response.output
    # เพิ่มพวกมันลงในบทสนทนาเพื่อให้โมเดลมีบริบทเต็มที่ในการตอบครั้งถัดไป
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **โค้ดฟังก์ชันที่ต้องใช้ดำเนินงาน:**

    ตอนนี้ที่ LLM เลือกฟังก์ชันที่ต้องรัน โค้ดที่ดำเนินงานจำเป็นต้องถูกนำไปใช้งานและรันจริง
    เราสามารถเขียนโค้ดเพื่อรับเวลาปัจจุบันใน Python ได้ นอกจากนี้เรายังต้องเขียนโค้ดเพื่อดึงชื่อฟังก์ชันและอาร์กิวเมนต์จาก response_message เพื่อรับผลลัพธ์สุดท้าย

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # จัดการการเรียกฟังก์ชัน
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # ส่งคืนผลลัพธ์เครื่องมือเป็นรายการ function_call_output
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # การเรียก API ครั้งที่สอง: รับคำตอบสุดท้ายจากโมเดล
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

การเรียกฟังก์ชันเป็นหัวใจของรูปแบบการใช้งานเครื่องมือของเอเจนต์ส่วนใหญ่ แม้อาจไม่ใช่ทั้งหมด แต่การสร้างมันขึ้นมาจากศูนย์บางครั้งก็ท้าทาย
ดังที่เราเรียนรู้ใน [บทเรียน 2](../../../02-explore-agentic-frameworks) เฟรมเวิร์กแบบเอเจนต์ิกจัดเตรียมบล็อกพื้นฐานที่สร้างไว้ล่วงหน้าให้เราใช้สำหรับการนำเครื่องมือมาใช้
 
## ตัวอย่างการใช้เครื่องมือกับเฟรมเวิร์กแบบเอเจนต์ิก

นี่คือตัวอย่างบางส่วนของวิธีการนำรูปแบบการออกแบบการใช้เครื่องมือไปใช้โดยใช้เฟรมเวิร์กต่าง ๆ แบบเอเจนต์ิก:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> เป็นเฟรมเวิร์ก AI แบบโอเพนซอร์สสำหรับสร้างเอเจนต์ AI ที่ช่วยให้การใช้การเรียกฟังก์ชันง่ายขึ้น โดยอนุญาตให้คุณกำหนดเครื่องมือเป็นฟังก์ชัน Python พร้อม `@tool` decorator เฟรมเวิร์กจัดการการสื่อสารต่อเนื่องระหว่างโมเดลและโค้ดของคุณ นอกจากนี้ยังให้การเข้าถึงเครื่องมือที่สร้างไว้ล่วงหน้า เช่น File Search และ Code Interpreter ผ่าน `FoundryChatClient`

แผนภาพต่อไปนี้แสดงกระบวนการเรียกฟังก์ชันกับ Microsoft Agent Framework:

![function calling](../../../translated_images/th/functioncalling-diagram.a84006fc287f6014.webp)

ใน Microsoft Agent Framework เครื่องมือถูกนิยามเป็นฟังก์ชันที่ตกแต่ง เราสามารถเปลี่ยนฟังก์ชัน `get_current_time` ที่เห็นมาก่อนหน้านี้ให้เป็นเครื่องมือโดยใช้ `@tool` decorator เฟรมเวิร์กจะทำการซีเรียลไลซ์ฟังก์ชันและพารามิเตอร์โดยอัตโนมัติ สร้าง schema เพื่อส่งให้ LLM

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# สร้างไคลเอนต์
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# สร้างตัวแทนและรันด้วยเครื่องมือ
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> เป็นเฟรมเวิร์กเอเจนต์ิกรุ่นใหม่ที่ออกแบบมาเพื่อช่วยให้นักพัฒนาสร้าง ติดตั้ง และขยายเอเจนต์ AI คุณภาพสูงและขยายได้อย่างปลอดภัย โดยไม่ต้องจัดการกับทรัพยากรคอมพิวเตอร์และการจัดเก็บเบื้องหลัง มีประโยชน์โดยเฉพาะสำหรับแอปพลิเคชันในองค์กร เพราะเป็นบริการที่จัดการเต็มรูปแบบพร้อมความปลอดภัยระดับองค์กร

เมื่อเทียบกับการพัฒนาด้วย API LLM โดยตรง Microsoft Foundry Agent Service มีข้อได้เปรียบหลายประการ รวมถึง:

- การเรียกเครื่องมืออัตโนมัติ – ไม่ต้องแยกวิเคราะห์การเรียกเครื่องมือ เรียกใช้งานเครื่องมือ และจัดการกับผลลัพธ์ ทั้งหมดนี้ทำงานที่ฝั่งเซิร์ฟเวอร์
- การจัดการข้อมูลอย่างปลอดภัย – แทนที่จะจัดการสถานะการสนทนาของตัวเอง คุณสามารถใช้ threads เพื่อเก็บข้อมูลทั้งหมดที่ต้องการ
- เครื่องมือพร้อมใช้งานทันที – เครื่องมือที่ใช้สำหรับโต้ตอบกับแหล่งข้อมูลของคุณ เช่น Bing, Azure AI Search และ Azure Functions

เครื่องมือที่มีใน Microsoft Foundry Agent Service แบ่งออกเป็นสองประเภท:

1. เครื่องมือความรู้:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">การฐานด้วย Bing Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">การค้นหาไฟล์</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. เครื่องมือดำเนินการ:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">การเรียกฟังก์ชัน</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">ตัวแปลโค้ด</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">เครื่องมือที่กำหนดด้วย OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

บริการเอเจนต์ช่วยให้เราใช้เครื่องมือเหล่านี้ร่วมกันในฐานะ `toolset` นอกจากนี้ยังใช้ `threads` ซึ่งคอยติดตามประวัติข้อความจากการสนทนาหนึ่งๆ

สมมติว่าคุณเป็นเอเจนต์ฝ่ายขายที่บริษัทชื่อ Contoso คุณต้องการพัฒนาเอเจนต์สนทนาที่สามารถตอบคำถามเกี่ยวกับข้อมูลการขายของคุณได้

ภาพต่อไปนี้แสดงวิธีที่คุณสามารถใช้ Microsoft Foundry Agent Service เพื่อวิเคราะห์ข้อมูลการขายของคุณ:

![Agentic Service In Action](../../../translated_images/th/agent-service-in-action.34fb465c9a84659e.webp)

เพื่อใช้เครื่องมือใด ๆ กับบริการนี้ เราสามารถสร้างไคลเอนต์และกำหนดเครื่องมือหรือชุดเครื่องมือ สำหรับการใช้งานจริง เราสามารถใช้โค้ด Python ดังต่อไปนี้ LLM จะสามารถดู toolset และตัดสินใจว่าควรใช้ฟังก์ชันที่ผู้ใช้สร้างขึ้น `fetch_sales_data_using_sqlite_query` หรือ Code Interpreter ที่สร้างไว้แล้ว ขึ้นอยู่กับคำขอของผู้ใช้

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # ฟังก์ชัน fetch_sales_data_using_sqlite_query ซึ่งสามารถพบได้ในไฟล์ fetch_sales_data_functions.py
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# เริ่มต้นชุดเครื่องมือ
toolset = ToolSet()

# เริ่มต้นเอเจนต์เรียกฟังก์ชันด้วยฟังก์ชัน fetch_sales_data_using_sqlite_query และเพิ่มเข้าไปในชุดเครื่องมือ
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# เริ่มต้นเครื่องมือการแปลโค้ดและเพิ่มเข้าไปในชุดเครื่องมือ
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## ข้อควรพิเศษสำหรับการใช้รูปแบบการออกแบบการใช้เครื่องมือเพื่อสร้างเอเจนต์ AI ที่น่าเชื่อถือคืออะไร?

ความกังวลทั่วไปเกี่ยวกับ SQL ที่ถูกสร้างขึ้นแบบไดนามิกโดย LLM คือความปลอดภัย โดยเฉพาะความเสี่ยงของการโจมตีแบบ SQL injection หรือการกระทำที่เป็นอันตราย เช่น การลบหรือแก้ไขฐานข้อมูล แม้จะเป็นความกังวลที่สำคัญ แต่สามารถบรรเทาได้อย่างมีประสิทธิภาพโดยการกำหนดสิทธิ์การเข้าถึงฐานข้อมูลอย่างเหมาะสม สำหรับฐานข้อมูลส่วนใหญ่จะตั้งค่าให้เป็นแบบอ่านอย่างเดียว (read-only) สำหรับบริการฐานข้อมูลเช่น PostgreSQL หรือ Azure SQL แอปควรถูกกำหนดให้มีบทบาทแบบอ่านอย่างเดียว (SELECT)

การรันแอปในสภาพแวดล้อมที่ปลอดภัยช่วยเพิ่มการป้องกันอีกขั้น ในกรณีขององค์กร ข้อมูลมักจะถูกสกัดและแปลงจากระบบปฏิบัติการไปยังฐานข้อมูลอ่านอย่างเดียวหรือคลังข้อมูลที่มี schema ที่ใช้งานง่าย วิธีนี้ช่วยให้ข้อมูลปลอดภัย มีประสิทธิภาพ และเข้าถึงได้สะดวก และทำให้แอปมีสิทธิ์การเข้าถึงจำกัดเฉพาะอ่านอย่างเดียว

## ตัวอย่างโค้ด

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## มีคำถามเพิ่มเติมเกี่ยวกับรูปแบบการออกแบบการใช้เครื่องมือไหม?

เข้าร่วม [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) เพื่อพบปะกับผู้เรียนคนอื่น ๆ เข้าร่วมชั่วโมงพบปะและรับคำตอบสำหรับคำถามเกี่ยวกับเอเจนต์ AI ของคุณ

## แหล่งข้อมูลเพิ่มเติม

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service Workshop</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Multi-Agent Workshop</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">ภาพรวม Microsoft Agent Framework</a>


## การทดสอบ Agents อย่างง่าย (ไม่บังคับ)

หลังจากที่คุณเรียนรู้การปรับใช้ agent ใน [บทที่ 16](../16-deploying-scalable-agents/README.md) แล้ว คุณสามารถทำการทดสอบเบื้องต้นกับ `TravelToolAgent` ของบทเรียนนี้ (ว่ามันยังเรียกใช้งานเครื่องมือและตอบคำถามได้หรือไม่) โดยใช้ [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) ดูที่ [`tests/README.md`](../tests/README.md) สำหรับวิธีการรัน

## บทเรียนก่อนหน้า

[การทำความเข้าใจรูปแบบการออกแบบ Agentic](../03-agentic-design-patterns/README.md)

## บทเรียนถัดไป

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->