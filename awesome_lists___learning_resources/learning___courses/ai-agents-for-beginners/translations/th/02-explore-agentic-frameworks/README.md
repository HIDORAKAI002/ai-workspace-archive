[![การสำรวจกรอบงานเอเจนต์ AI](../../../translated_images/th/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(คลิกที่ภาพด้านบนเพื่อดูวิดีโอของบทเรียนนี้)_

# สำรวจกรอบงานเอเจนต์ AI

กรอบงานเอเจนต์ AI คือแพลตฟอร์มซอฟต์แวร์ที่ออกแบบมาเพื่อช่วยให้ง่ายต่อการสร้าง การนำไปใช้ และการจัดการเอเจนต์ AI กรอบงานเหล่านี้จัดหาชิ้นส่วนที่สร้างไว้ล่วงหน้า นามธรรม และเครื่องมือที่ช่วยลดความซับซ้อนในการพัฒนาระบบ AI ที่ซับซ้อน

กรอบงานเหล่านี้ช่วยให้นักพัฒนาสามารถมุ่งเน้นไปที่ส่วนที่เป็นเอกลักษณ์ของแอปพลิเคชันของตน โดยให้แนวทางมาตรฐานเพื่อแก้ไขความท้าทายทั่วไปในการพัฒนาเอเจนต์ AI พวกเขาช่วยเพิ่มความสามารถในการปรับขนาด การเข้าถึง และประสิทธิภาพในการสร้างระบบ AI

## บทนำ

บทเรียนนี้จะครอบคลุม:

- กรอบงานเอเจนต์ AI คืออะไรและช่วยให้นักพัฒนาทำอะไรได้บ้าง?
- ทีมงานสามารถใช้เพื่อออกแบบต้นแบบอย่างรวดเร็ว ทำซ้ำ และปรับปรุงความสามารถของเอเจนต์ได้อย่างไร?
- ความแตกต่างระหว่างกรอบงานและเครื่องมือที่ Microsoft สร้าง ( <a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> และ <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a> ) เป็นอย่างไร?
- ฉันสามารถผนวกรวมเครื่องมือในระบบนิเวศ Azure ที่มีอยู่โดยตรงได้หรือไม่ หรือจำเป็นต้องใช้โซลูชันแบบสแตนด์อโลน?
- Microsoft Foundry Agent Service คืออะไร และช่วยฉันอย่างไร?

## เป้าหมายการเรียนรู้

เป้าหมายของบทเรียนนี้คือช่วยให้คุณเข้าใจ:

- บทบาทของกรอบงานเอเจนต์ AI ในการพัฒนา AI
- วิธีการใช้กรอบงานเอเจนต์ AI เพื่อสร้างเอเจนต์อัจฉริยะ
- ความสามารถสำคัญที่กรอบงานเอเจนต์ AI ช่วยเปิดใช้งาน
- ความแตกต่างระหว่าง Microsoft Agent Framework และ Microsoft Foundry Agent Service

## กรอบงานเอเจนต์ AI คืออะไรและช่วยให้นักพัฒนาทำอะไรได้บ้าง?

กรอบงาน AI แบบเดิมสามารถช่วยรวม AI เข้ากับแอปของคุณและทำให้แอปเหล่านี้ดีขึ้นในด้านต่างๆ ดังนี้:

- **การปรับแต่งตามบุคคล**: AI สามารถวิเคราะห์พฤติกรรมและความชอบของผู้ใช้ เพื่อเสนอคำแนะนำ เนื้อหา และประสบการณ์ที่เหมาะกับแต่ละบุคคล
ตัวอย่าง: บริการสตรีมมิ่งเช่น Netflix ใช้ AI ในการแนะนำภาพยนตร์และรายการตามประวัติการรับชม ช่วยเพิ่มการมีส่วนร่วมและความพึงพอใจของผู้ใช้
- **การทำงานอัตโนมัติและประสิทธิภาพ**: AI สามารถทำงานซ้ำๆ โดยอัตโนมัติ ปรับปรุงกระบวนการทำงาน และเพิ่มประสิทธิภาพในการดำเนินงาน
ตัวอย่าง: แอปบริการลูกค้าใช้แชทบอทที่ขับเคลื่อนด้วย AI เพื่อจัดการกับคำถามทั่วไป ลดเวลาการตอบกลับและปล่อยให้เอเจนต์มนุษย์จัดการกับปัญหาที่ซับซ้อนมากขึ้น
- **ประสบการณ์ผู้ใช้ที่ดีขึ้น**: AI ช่วยปรับปรุงประสบการณ์โดยรวมของผู้ใช้ โดยให้ฟีเจอร์อัจฉริยะ เช่น การรู้จำเสียง การประมวลผลภาษาธรรมชาติ และการเติมข้อความอัตโนมัติ
ตัวอย่าง: ผู้ช่วยเสมือนอย่าง Siri และ Google Assistant ใช้ AI เพื่อเข้าใจและตอบสนองคำสั่งเสียง ทำให้ง่ายต่อการโต้ตอบกับอุปกรณ์

### ฟังดูดีใช่ไหม แล้วทำไมเราจึงต้องการกรอบงานเอเจนต์ AI?

กรอบงานเอเจนต์ AI คือมากกว่ากรอบงาน AI ธรรมดา มันถูกออกแบบมาเพื่อสร้างเอเจนต์อัจฉริยะที่สามารถโต้ตอบกับผู้ใช้ เอเจนต์อื่น และสภาพแวดล้อม เพื่อบรรลุเป้าหมายเฉพาะ เอเจนต์เหล่านี้สามารถมีพฤติกรรมอิสระ ตัดสินใจ และปรับตัวตามสถานการณ์ที่เปลี่ยนแปลงได้ เรามาดูความสามารถสำคัญที่กรอบงานเอเจนต์ AI เปิดใช้งาน:

- **การทำงานร่วมและการประสานงานของเอเจนต์**: ช่วยสร้างเอเจนต์ AI หลายตัวที่สามารถทำงานร่วมกัน สื่อสาร และประสานงานเพื่อแก้ไขงานที่ซับซ้อนได้
- **การทำงานอัตโนมัติและการจัดการงาน**: มีกลไกสำหรับการทำงานหลายขั้นตอนโดยอัตโนมัติ การมอบหมายงาน และการจัดการงานที่ยืดหยุ่นระหว่างเอเจนต์
- **ความเข้าใจบริบทและการปรับตัว**: ให้เอเจนต์สามารถเข้าใจบริบท ปรับตัวตามสภาพแวดล้อมที่เปลี่ยนแปลง และตัดสินใจตามข้อมูลแบบเรียลไทม์

สรุปก็คือ เอเจนต์ช่วยให้คุณทำอะไรได้มากขึ้น ยกระดับการทำงานอัตโนมัติ สร้างระบบที่อัจฉริยะยิ่งขึ้นและสามารถเรียนรู้จากสภาพแวดล้อมได้

## วิธีการออกแบบต้นแบบอย่างรวดเร็ว ทำซ้ำ และปรับปรุงความสามารถของเอเจนต์?

พื้นที่นี้มีการเปลี่ยนแปลงอย่างรวดเร็ว แต่มีสิ่งที่พบบ่อยในกรอบงานเอเจนต์ AI ส่วนใหญ่ที่ช่วยคุณออกแบบต้นแบบและทำซ้ำได้อย่างรวดเร็ว เช่น ส่วนประกอบแบบโมดูล เครื่องมือสำหรับทำงานร่วมกัน และการเรียนรู้แบบเรียลไทม์ มาดูรายละเอียดเหล่านี้กัน:

- **ใช้ส่วนประกอบแบบโมดูล**: SDK AI มีส่วนประกอบที่สร้างไว้ล่วงหน้า เช่น ตัวเชื่อมต่อ AI และหน่วยความจำ การเรียกฟังก์ชันด้วยภาษาธรรมชาติหรือปลั๊กอินโค้ด แบบฟอร์มคำสั่ง และอื่นๆ
- **ใช้เครื่องมือสำหรับทำงานร่วมกัน**: ออกแบบเอเจนต์ด้วยบทบาทและงานเฉพาะ เพื่อให้สามารถทดสอบและปรับปรุงกระบวนการทำงานร่วมกันได้
- **เรียนรู้แบบเรียลไทม์**: ใช้วงจรตอบกลับที่เอเจนต์เรียนรู้จากการโต้ตอบและปรับพฤติกรรมแบบไดนามิก

### ใช้ส่วนประกอบแบบโมดูล

SDK เช่น Microsoft Agent Framework มีส่วนประกอบที่สร้างไว้ล่วงหน้า เช่น ตัวเชื่อมต่อ AI คำจำกัดความของเครื่องมือ และการจัดการเอเจนต์

**ทีมงานสามารถใช้สิ่งเหล่านี้อย่างไร**: ทีมสามารถรวบรวมส่วนประกอบเหล่านี้อย่างรวดเร็วเพื่อสร้างต้นแบบที่ใช้งานได้โดยไม่ต้องเริ่มจากศูนย์ ช่วยให้ทดลองและปรับปรุงได้เร็ว

**วิธีใช้ในทางปฏิบัติ**: คุณสามารถใช้ parser ที่สร้างไว้ล่วงหน้าเพื่อดึงข้อมูลจากคำสั่งผู้ใช้ หน่วยความจำเพื่อจัดเก็บและค้นคืนข้อมูล และตัวสร้างคำสั่งเพื่อโต้ตอบกับผู้ใช้ โดยไม่ต้องสร้างทั้งหมดจากศูนย์

**ตัวอย่างโค้ด** มาดูตัวอย่างการใช้ Microsoft Agent Framework กับ `FoundryChatClient` เพื่อให้โมเดลตอบสนองกับคำสั่งผู้ใช้พร้อมการเรียกเครื่องมือ:

``` python
# ตัวอย่าง Microsoft Agent Framework Python

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# กำหนดฟังก์ชันเครื่องมือตัวอย่างสำหรับจองการเดินทาง
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # ตัวอย่างผลลัพธ์: เที่ยวบินของคุณไปยังนิวยอร์กในวันที่ 1 มกราคม 2025 ได้ถูกจองเรียบร้อยแล้ว ขอให้เดินทางปลอดภัย! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

สิ่งที่คุณเห็นจากตัวอย่างนี้คือวิธีที่คุณสามารถใช้ parser ที่สร้างไว้ล่วงหน้าเพื่อดึงข้อมูลสำคัญจากคำสั่งผู้ใช้ เช่น ต้นทาง ปลายทาง และวันที่ของคำขอบิน วิธีการแบบโมดูลนี้ช่วยให้คุณมุ่งเน้นที่ตรรกะระดับสูง

### ใช้เครื่องมือสำหรับทำงานร่วมกัน

กรอบงานอย่าง Microsoft Agent Framework ช่วยให้สร้างเอเจนต์หลายตัวที่ทำงานร่วมกันได้

**ทีมงานสามารถใช้สิ่งเหล่านี้อย่างไร**: ทีมสามารถออกแบบเอเจนต์ด้วยบทบาทและงานเฉพาะ เพื่อทดสอบและปรับปรุงกระบวนการทำงานร่วมกัน ช่วยเพิ่มประสิทธิภาพโดยรวมของระบบ

**วิธีใช้ในทางปฏิบัติ**: คุณสามารถสร้างทีมเอเจนต์ซึ่งแต่ละตัวมีหน้าที่เฉพาะ เช่น การเรียกข้อมูล การวิเคราะห์ หรือการตัดสินใจ เอเจนต์เหล่านี้สามารถสื่อสารและแบ่งปันข้อมูลเพื่อบรรลุเป้าหมายร่วมกัน เช่น ตอบคำถามผู้ใช้หรือทำงานให้เสร็จ

**ตัวอย่างโค้ด (Microsoft Agent Framework)**:

```python
# การสร้างตัวแทนหลายตัวที่ทำงานร่วมกันโดยใช้ Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# ตัวแทนการดึงข้อมูล
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# ตัวแทนวิเคราะห์ข้อมูล
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# รันตัวแทนตามลำดับในงานหนึ่งงาน
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

สิ่งที่คุณเห็นในโค้ดก่อนหน้านี้คือวิธีสร้างงานที่รวมเอเจนต์หลายตัวทำงานร่วมกันเพื่อวิเคราะห์ข้อมูล แต่ละเอเจนต์ทำหน้าที่เฉพาะ และงานจะถูกดำเนินการโดยการประสานงานเอเจนต์เพื่อให้ได้ผลลัพธ์ที่ต้องการ ด้วยการสร้างเอเจนต์ที่มีบทบาทเฉพาะ คุณสามารถเพิ่มประสิทธิภาพและสมรรถนะของงาน

### เรียนรู้แบบเรียลไทม์

กรอบงานขั้นสูงมอบความสามารถในการเข้าใจบริบทแบบเรียลไทม์และปรับตัว

**ทีมงานสามารถใช้สิ่งเหล่านี้อย่างไร**: ทีมสามารถใช้วงจรตอบกลับที่เอเจนต์เรียนรู้จากการโต้ตอบและปรับพฤติกรรมแบบไดนามิก ทำให้เกิดการพัฒนาและปรับปรุงความสามารถอย่างต่อเนื่อง

**วิธีใช้ในทางปฏิบัติ**: เอเจนต์สามารถวิเคราะห์ข้อเสนอแนะของผู้ใช้ ข้อมูลสภาพแวดล้อม และผลลัพธ์ของงานเพื่ออัปเดตฐานความรู้ ปรับแต่งอัลกอริทึมการตัดสินใจ และปรับปรุงประสิทธิภาพเมื่อเวลาผ่านไป กระบวนการเรียนรู้แบบทำซ้ำนี้ช่วยให้เอเจนต์ปรับตัวตามสถานการณ์ที่เปลี่ยนแปลงและความชอบของผู้ใช้ เพิ่มประสิทธิภาพของระบบโดยรวม

## ความแตกต่างระหว่าง Microsoft Agent Framework กับ Microsoft Foundry Agent Service คืออะไร?

มีหลายวิธีในการเปรียบเทียบแนวทางเหล่านี้ แต่เรามาดูความแตกต่างหลักๆ ในแง่ของการออกแบบ ความสามารถ และกรณีการใช้งานเป้าหมาย:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework เป็น SDK ที่ใช้งานง่ายสำหรับสร้างเอเจนต์ AI โดยใช้ `FoundryChatClient` ช่วยให้นักพัฒนาสร้างเอเจนต์ที่ใช้โมเดล Azure OpenAI พร้อมฟีเจอร์เรียกใช้เครื่องมือในตัว การจัดการการสนทนา และความปลอดภัยระดับองค์กรผ่าน Azure identity

**กรณีการใช้งาน**: การสร้างเอเจนต์ AI พร้อมใช้งานจริงที่รองรับการใช้เครื่องมือ กระบวนการทำงานหลายขั้นตอน และการผนวกรวมกับองค์กร

นี่คือแนวคิดหลักที่สำคัญของ Microsoft Agent Framework:

- **เอเจนต์**: เอเจนต์ถูกสร้างผ่าน `FoundryChatClient` และตั้งค่าด้วยชื่อ คำแนะนำ และเครื่องมือ เอเจนต์สามารถ:
  - **ประมวลผลข้อความผู้ใช้** และสร้างการตอบสนองโดยใช้โมเดล Azure OpenAI
  - **เรียกใช้เครื่องมือ** อัตโนมัติตามบริบทการสนทนา
  - **รักษาสถานะการสนทนา** ในหลายการโต้ตอบ

  นี่คือโค้ดตัวอย่างแสดงวิธีสร้างเอเจนต์:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **เครื่องมือ**: กรอบงานรองรับการกำหนดเครื่องมือเป็นฟังก์ชัน Python ที่เอเจนต์สามารถเรียกใช้โดยอัตโนมัติ โดยเครื่องมือจะถูกลงทะเบียนเมื่อสร้างเอเจนต์:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **การประสานงานหลายเอเจนต์**: คุณสามารถสร้างเอเจนต์หลายตัวที่มีความเชี่ยวชาญต่างกัน และประสานงานการทำงานของพวกเขา:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **การผนวกรวม Azure Identity**: กรอบงานใช้ `AzureCliCredential` (หรือ `DefaultAzureCredential`) เพื่อการยืนยันตัวตนที่ปลอดภัยโดยไม่ต้องจัดการคีย์ API โดยตรง

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service เป็นบริการใหม่ที่เปิดตัวใน Microsoft Ignite 2024 ช่วยในการพัฒนาและนำเอเจนต์ AI ไปใช้โดยมีโมเดลที่ยืดหยุ่นมากขึ้น เช่น การเรียกใช้ LLM โอเพนซอร์สโดยตรงอย่าง Llama 3, Mistral และ Cohere

Microsoft Foundry Agent Service มีระบบรักษาความปลอดภัยระดับองค์กรที่แข็งแกร่งและวิธีเก็บข้อมูลที่ปลอดภัย เหมาะสำหรับแอปพลิเคชันองค์กร

มันสามารถทำงานร่วมกับ Microsoft Agent Framework ได้อย่างราบรื่นเพื่อสร้างและนำเอเจนต์ไปใช้

บริการนี้อยู่ในสถานะ Public Preview และรองรับการสร้างเอเจนต์ด้วย Python และ C#

โดยใช้ Microsoft Foundry Agent Service Python SDK เราสามารถสร้างเอเจนต์พร้อมเครื่องมือที่กำหนดโดยผู้ใช้ได้:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# กำหนดฟังก์ชันของเครื่องมือ
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### แนวคิดหลัก

Microsoft Foundry Agent Service มีแนวคิดหลักดังนี้:

- **เอเจนต์**: Microsoft Foundry Agent Service ผสานรวมกับ Microsoft Foundry ภายใน Foundry, เอเจนต์ AI ทำหน้าที่เป็นไมโครเซอร์วิส "อัจฉริยะ" ที่สามารถตอบคำถาม (RAG) ดำเนินการต่างๆ หรือทำงานโดยอัตโนมัติแบบเต็มรูปแบบ โดยรวมกำลังของโมเดล AI สร้างสรรค์กับเครื่องมือที่ช่วยให้เข้าถึงและโต้ตอบกับแหล่งข้อมูลโลกจริงได้ นี่คือตัวอย่างเอเจนต์:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    ในตัวอย่างนี้ เอเจนต์ถูกสร้างด้วยโมเดล `gpt-4.1-mini` ชื่อว่า `my-agent` และคำแนะนำ `You are helpful agent` เอเจนต์นี้ติดตั้งด้วยเครื่องมือและทรัพยากรเพื่อทำงานตีความโค้ด

- **เธรดและข้อความ**: เธรดเป็นแนวคิดสำคัญอีกอย่าง มันแสดงถึงการสนทนาหรือการโต้ตอบระหว่างเอเจนต์และผู้ใช้ เธรดช่วยติดตามความก้าวหน้าของการสนทนา เก็บข้อมูลบริบท และจัดการสถานะการโต้ตอบ นี่คือตัวอย่างเธรด:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # ขอให้ตัวแทนดำเนินงานในเธรด
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # ดึงและบันทึกข้อความทั้งหมดเพื่อตรวจสอบการตอบสนองของตัวแทน
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    ในโค้ดก่อนหน้า เธรดถูกสร้างขึ้น หลังจากนั้นมีการส่งข้อความไปยังเธรด โดยเรียก `create_and_process_run` เพื่อขอให้เอเจนต์ทำงานในเธรด สุดท้ายข้อความถูกดึงและบันทึกเพื่อตรวจสอบการตอบสนองของเอเจนต์ ข้อความบ่งบอกความก้าวหน้าของการสนทนาระหว่างผู้ใช้และเอเจนต์ สำคัญคือข้อความสามารถมีหลายประเภท เช่น ข้อความ รูปภาพ หรือไฟล์ ซึ่งเป็นผลลัพธ์ของงานเอเจนต์ เช่น ภาพหรือข้อความตอบกลับ ในฐานะนักพัฒนา คุณสามารถใช้ข้อมูลนี้เพื่อต่อยอดการประมวลผลหรือแสดงให้ผู้ใช้เห็น

- **ผสานรวมกับ Microsoft Agent Framework**: Microsoft Foundry Agent Service ทำงานร่วมกับ Microsoft Agent Framework ได้อย่างลงตัว หมายความว่าคุณสามารถสร้างเอเจนต์ด้วย `FoundryChatClient` และนำไปใช้ผ่าน Agent Service สำหรับสถานการณ์การผลิต

**กรณีการใช้งาน**: Microsoft Foundry Agent Service ถูกออกแบบสำหรับแอปพลิเคชันองค์กรที่ต้องการการนำเอเจนต์ AI ไปใช้ที่ปลอดภัย ปรับขนาดได้ และยืดหยุ่น

## ความแตกต่างระหว่างแนวทางเหล่านี้คืออะไร?
 
แม้จะดูเหมือนซ้อนทับกัน แต่มีความแตกต่างหลักๆ ในแง่ของการออกแบบ ความสามารถ และกรณีการใช้งานเป้าหมาย:
 
- **Microsoft Agent Framework (MAF)**: เป็น SDK สำหรับสร้างเอเจนต์ AI พร้อมใช้งานจริง ให้ API ที่ใช้งานง่ายสำหรับสร้างเอเจนต์ที่รองรับการเรียกใช้เครื่องมือ การจัดการสนทนา และการผสานรวม Azure identity
- **Microsoft Foundry Agent Service**: เป็นแพลตฟอร์มและบริการนำไปใช้ใน Microsoft Foundry สำหรับเอเจนต์ มีการเชื่อมต่อในตัวกับบริการต่างๆ เช่น Azure OpenAI, Azure AI Search, Bing Search และการรันโค้ด
 
ยังไม่แน่ใจว่าจะเลือกใช้ตัวใด?

### กรณีการใช้งาน
 
มาดูกรณีการใช้งานทั่วไปเพื่อช่วยคุณเลือก:
 
> คำถาม: ฉันกำลังสร้างแอปเอเจนต์ AI สำหรับใช้งานจริงและต้องการเริ่มต้นอย่างรวดเร็ว
>

>คำตอบ: Microsoft Agent Framework เป็นตัวเลือกที่ยอดเยี่ยม มันให้ API แบบ Pythonic ผ่าน `FoundryChatClient` ที่ช่วยให้คุณกำหนดเอเจนต์ด้วยเครื่องมือและคำแนะนำได้ในไม่กี่บรรทัดของโค้ด

>คำถาม: ฉันต้องการการนำไปใช้ระดับองค์กรที่ผนวกรวมกับ Azure เช่น Search และการรันโค้ด
>
> คำตอบ: Microsoft Foundry Agent Service คือคำตอบที่ดีที่สุด เป็นบริการแพลตฟอร์มที่ให้ความสามารถในตัวสำหรับโมเดลหลากหลาย Azure AI Search, Bing Search และ Azure Functions ช่วยให้สร้างเอเจนต์ใน Foundry Portal และนำไปใช้ในระดับขนาดใหญ่ได้ง่าย
 
> คำถาม: ฉันยังสับสน ขอคำตอบแค่ตัวเดียว
>
> คำตอบ: เริ่มต้นด้วย Microsoft Agent Framework เพื่อสร้างเอเจนต์ของคุณ จากนั้นใช้ Microsoft Foundry Agent Service เมื่อต้องการนำไปใช้และขยายขนาดในสภาพแวดล้อมการผลิต วิธีนี้ช่วยให้คุณสามารถทำซ้ำตรรกะของเอเจนต์ได้เร็วพร้อมกับมีเส้นทางที่ชัดเจนสู่การใช้งานในองค์กร
 
มาสรุปความแตกต่างหลักในตาราง:

| กรอบงาน | จุดเน้น | แนวคิดหลัก | กรณีการใช้งาน |
| --- | --- | --- | --- |
| Microsoft Agent Framework | SDK สร้างเอเจนต์ที่เรียบง่ายพร้อมเรียกใช้เครื่องมือ | เอเจนต์, เครื่องมือ, Azure Identity | สร้างเอเจนต์ AI, ใช้เครื่องมือ, กระบวนการทำงานหลายขั้นตอน |
| Microsoft Foundry Agent Service | โมเดลยืดหยุ่น, ความปลอดภัยองค์กร, การสร้างโค้ด, การเรียกใช้เครื่องมือ | โมดูลาร์, การทำงานร่วมกัน, การควบคุมกระบวนการ | การนำเอเจนต์ AI ไปใช้ที่ปลอดภัย สามารถขยายและยืดหยุ่นได้ |

## ฉันสามารถผนวกรวมเครื่องมือในระบบนิเวศ Azure ที่มีอยู่โดยตรงได้หรือไม่ หรือจำเป็นต้องใช้โซลูชันแบบสแตนด์อโลน?


คำตอบคือใช่ คุณสามารถรวมเครื่องมือในระบบนิเวศ Azure ที่มีอยู่ของคุณเข้ากับบริการ Microsoft Foundry Agent ได้โดยตรงโดยเฉพาะอย่างยิ่ง เนื่องจากได้รับการออกแบบให้ทำงานร่วมกับบริการ Azure อื่นๆ ได้อย่างราบรื่น คุณอาจรวม Bing, Azure AI Search และ Azure Functions ตัวอย่างเช่น นอกจากนี้ยังมีการรวมลึกกับ Microsoft Foundry

กรอบงาน Microsoft Agent ยังรวมเข้ากับบริการ Azure ผ่าน `FoundryChatClient` และ Azure identity ทำให้คุณเรียกใช้บริการ Azure ได้โดยตรงจากเครื่องมือเอเจนต์ของคุณ

## ตัวอย่างโค้ด

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## มีคำถามเพิ่มเติมเกี่ยวกับ AI Agent Framework ไหม?

เข้าร่วม [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) เพื่อพบกับผู้เรียนคนอื่นๆ เข้าร่วมชั่วโมงทำงานและรับคำตอบสำหรับคำถามเกี่ยวกับ AI Agents ของคุณ

## เอกสารอ้างอิง

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## บทเรียนก่อนหน้า

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

## บทเรียนถัดไป

[Understanding Agentic Design Patterns](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->