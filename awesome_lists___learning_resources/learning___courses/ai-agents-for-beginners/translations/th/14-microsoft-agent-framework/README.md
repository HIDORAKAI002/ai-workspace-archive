# การสำรวจ Microsoft Agent Framework

![Agent Framework](../../../translated_images/th/lesson-14-thumbnail.90df0065b9d234ee.webp)

### บทนำ

บทเรียนนี้จะครอบคลุม:

- การเข้าใจ Microsoft Agent Framework: คุณสมบัติหลักและคุณค่า  
- การสำรวจแนวคิดหลักของ Microsoft Agent Framework
- รูปแบบ MAF ขั้นสูง: Workflows, Middleware, และ Memory

## เป้าหมายการเรียนรู้

หลังจากจบบทเรียนนี้ คุณจะรู้วิธี:

- สร้าง AI Agents ที่พร้อมใช้งานในผลิตภัณฑ์โดยใช้ Microsoft Agent Framework
- นำฟีเจอร์หลักของ Microsoft Agent Framework ไปใช้กับกรณีการใช้ Agentic ของคุณ
- ใช้รูปแบบขั้นสูงรวมถึง workflows, middleware และความสามารถในการสังเกตการณ์

## ตัวอย่างโค้ด

ตัวอย่างโค้ดสำหรับ [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) สามารถพบได้ใน repository นี้ภายใต้ไฟล์ `xx-python-agent-framework` และ `xx-dotnet-agent-framework`

## การทำความเข้าใจ Microsoft Agent Framework

![Framework Intro](../../../translated_images/th/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) คือเฟรมเวิร์กแบบรวมศูนย์ของ Microsoft สำหรับการสร้าง AI agents ซึ่งนำเสนอความยืดหยุ่นเพื่อรองรับกรณีการใช้ agentic ที่หลากหลายในทั้งสภาพแวดล้อมการผลิตและการวิจัย รวมถึง:

- **การจัดลำดับ Agent แบบต่อเนื่อง** ในสถานการณ์ที่ต้องการ workflows ทีละขั้นตอน
- **การจัดลำดับพร้อมกัน** ในสถานการณ์ที่ agent ต้องทำงานให้เสร็จพร้อมกัน
- **การจัดลำดับกลุ่มแชท** ในสถานการณ์ที่ agent สามารถทำงานร่วมกันในงานเดียวกัน
- **การจัดลำดับการส่งงาน** ในสถานการณ์ที่ agent ส่งต่อหน้าที่กันเมื่อแต่ละงานย่อยเสร็จสิ้น
- **การจัดลำดับแบบแม่เหล็ก** ในสถานการณ์ที่ agent ผู้จัดการสร้างและปรับเปลี่ยนรายการงานและดูแลการประสานงานของ subagents เพื่อให้งานสำเร็จ

เพื่อส่งมอบ AI Agents ในการผลิต MAF ยังมีฟีเจอร์สำหรับ:

- **ความสามารถในการสังเกตการณ์** โดยใช้ OpenTelemetry ซึ่งบันทึกทุกการกระทำของ AI Agent รวมถึงการเรียกใช้เครื่องมือ ขั้นตอนการจัดลำดับ กระบวนการเหตุผล และการติดตามประสิทธิภาพผ่านแดชบอร์ด Microsoft Foundry
- **ความปลอดภัย** โดยโฮสต์ agent โดยตรงบน Microsoft Foundry ซึ่งรวมถึงการควบคุมความปลอดภัย เช่น การเข้าถึงตามบทบาท การจัดการข้อมูลส่วนตัว และความปลอดภัยของเนื้อหาที่ฝังมาในระบบ
- **ความทนทาน** เนื่องจากกระบวนการและ workflows ของ agent สามารถหยุดชั่วคราว ดำเนินต่อ และกู้คืนจากข้อผิดพลาดได้ ซึ่งสนับสนุนการทำงานที่ใช้เวลานานขึ้น
- **การควบคุม** เนื่องจากรองรับ workflows ที่มีมนุษย์เป็นส่วนหนึ่งของวงจร ซึ่งงานจะถูกทำเครื่องหมายว่าต้องการการอนุมัติจากมนุษย์

Microsoft Agent Framework ยังเน้นการทำงานร่วมกันโดย:

- **อิสระจากคลาวด์** - Agent สามารถรันในคอนเทนเนอร์ บนเครื่องในองค์กร และบนคลาวด์หลายแห่งต่างๆ
- **อิสระจากผู้ให้บริการ** - Agent สามารถสร้างได้ผ่าน SDK ที่คุณชื่นชอบ รวมถึง Azure OpenAI และ OpenAI
- **การรวมมาตรฐานเปิด** - Agent สามารถใช้โปรโตคอลเช่น Agent-to-Agent (A2A) และ Model Context Protocol (MCP) เพื่อค้นหาและใช้ agent และเครื่องมืออื่นๆ
- **ปลั๊กอินและตัวเชื่อมต่อ** - สามารถเชื่อมต่อกับบริการข้อมูลและหน่วยความจำ เช่น Microsoft Fabric, SharePoint, Pinecone และ Qdrant

มาเรียนรู้กันว่าฟีเจอร์เหล่านี้ถูกนำไปใช้กับแนวคิดหลักของ Microsoft Agent Framework อย่างไร

## แนวคิดหลักของ Microsoft Agent Framework

### Agents

![Agent Framework](../../../translated_images/th/agent-components.410a06daf87b4fef.webp)

**การสร้าง Agents**

การสร้าง agent ทำโดยการกำหนด inference service (LLM Provider), 
ชุดคำสั่งสำหรับ AI Agent ให้ปฏิบัติตาม และ `name` ที่กำหนด:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

ด้านบนนี้ใช้ `Azure OpenAI` แต่ agent สามารถสร้างโดยใช้บริการต่างๆ รวมถึง `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` APIs

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

หรือ [MiniMax](https://platform.minimaxi.com/) ที่ให้ API ที่เข้ากันได้กับ OpenAI พร้อมหน้าต่างบริบทขนาดใหญ่ (สูงสุด 204K tokens):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

หรือ agent ระยะไกลโดยใช้โปรโตคอล A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**การรัน Agents**

Agent จะถูกรันโดยใช้วิธี `.run` หรือ `.run_stream` สำหรับการตอบกลับแบบไม่สตรีมหรือสตรีม

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

การรัน agent แต่ละครั้งสามารถมีตัวเลือกในการปรับแต่งพารามิเตอร์ เช่น `max_tokens` ที่ใช้โดย agent, `tools` ที่ agent สามารถเรียกใช้ และแม้แต่ `model` ที่ใช้สำหรับ agent นั้น

สิ่งนี้มีประโยชน์ในกรณีที่ต้องใช้โมเดลหรือเครื่องมือเฉพาะในการทำงานของผู้ใช้ให้เสร็จ

**เครื่องมือ (Tools)**

เครื่องมือสามารถกำหนดได้ทั้งตอนกำหนด agent:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# เมื่อสร้าง ChatAgent โดยตรง

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

และตอนรัน agent:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # เครื่องมือที่ให้มาใช้สำหรับการรันนี้เท่านั้น )
```

**Agent Threads**

Agent Threads ใช้จัดการบทสนทนาแบบหลายรอบ (multi-turn) โดย threads สามารถสร้างได้โดย:

- ใช้ `get_new_thread()` ซึ่งช่วยให้ thread นั้นถูกบันทึกไว้ตามเวลาที่ผ่านไป
- สร้าง thread อัตโนมัติเมื่อรัน agent และ thread นั้นจะมีอายุแค่ช่วงรันในปัจจุบันเท่านั้น

การสร้าง thread ดูตัวอย่างโค้ดดังนี้:

```python
# สร้างเธรดใหม่
thread = agent.get_new_thread() # รันเอเจนต์ด้วยเธรดนั้น
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

หลังจากนั้นคุณสามารถ serialize thread เพื่อเก็บไว้ใช้ภายหลังได้:

```python
# สร้างเธรดใหม่
thread = agent.get_new_thread() 

# รันเอเจนต์ด้วยเธรด

response = await agent.run("Hello, how are you?", thread=thread) 

# ทำการเรียงลำดับเธรดเพื่อจัดเก็บ

serialized_thread = await thread.serialize() 

# ทำการถอดลำดับสถานะเธรดหลังจากโหลดจากที่จัดเก็บ

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agent Middleware**

Agent มีปฏิสัมพันธ์กับเครื่องมือและ LLM เพื่อทำงานให้เสร็จ ในบางสถานการณ์ เราต้องการทำงานหรือบันทึกในระหว่างการปฏิสัมพันธ์เหล่านี้ Agent middleware ช่วยให้เราทำสิ่งนี้ได้ผ่าน:

*Function Middleware*

middleware นี้อนุญาตให้เราดำเนินการระหว่าง agent กับฟังก์ชัน/เครื่องมือที่จะเรียกใช้ ตัวอย่างเมื่อใช้คือเมื่อต้องการบันทึกข้อมูลเกี่ยวกับการเรียกฟังก์ชัน

ในโค้ดด้านล่าง `next` กำหนดว่าควรเรียก middleware ถัดไปหรือฟังก์ชันจริง

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # การประมวลผลเบื้องต้น: บันทึกก่อนการทำงานของฟังก์ชัน
    print(f"[Function] Calling {context.function.name}")

    # ดำเนินการต่อไปยังมิดเดิลแวร์ตัวถัดไปหรือการทำงานของฟังก์ชัน
    await next(context)

    # การประมวลผลหลัง: บันทึกหลังจากการทำงานของฟังก์ชัน
    print(f"[Function] {context.function.name} completed")
```

*Chat Middleware*

middleware นี้อนุญาตให้เราดำเนินการหรือบันทึกระหว่าง agent กับคำขอระหว่าง LLM

ซึ่งรวมถึงข้อมูลสำคัญ เช่น `messages` ที่ส่งไปยังบริการ AI

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # การประมวลผลล่วงหน้า: บันทึกก่อนเรียกใช้ AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # ดำเนินการไปยังมิดเดิลแวร์หรือบริการ AI ถัดไป
    await next(context)

    # การประมวลผลหลัง: บันทึกหลังจากได้รับการตอบกลับจาก AI
    print("[Chat] AI response received")

```

**Agent Memory**

อย่างที่ครอบคลุมในบทเรียน `Agentic Memory` หน่วยความจำเป็นองค์ประกอบสำคัญที่ทำให้ agent สามารถทำงานในบริบทต่างๆ ได้ MAF มีหน่วยความจำหลายประเภทให้เลือก:

*In-Memory Storage*

หน่วยความจำนี้เก็บไว้ใน threads ขณะรันแอปพลิเคชัน

```python
# สร้างเธรดใหม่
thread = agent.get_new_thread() # รันเอเจนต์ด้วยเธรดนั้น
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Persistent Messages*

หน่วยความจำนี้ใช้จัดเก็บประวัติการสนทนาข้ามเซสชันต่างๆ กำหนดโดยใช้ `chat_message_store_factory` :

```python
from agent_framework import ChatMessageStore

# สร้างที่เก็บข้อความแบบกำหนดเอง
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynamic Memory*

หน่วยความจำนี้จะถูกเพิ่มในบริบทก่อนที่ agent จะรัน สามารถเก็บไว้ในบริการภายนอก เช่น mem0:

```python
from agent_framework.mem0 import Mem0Provider

# ใช้ Mem0 สำหรับความสามารถหน่วยความจำขั้นสูง
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

**Agent Observability**

ความสามารถในการสังเกตการณ์เป็นสิ่งสำคัญสำหรับการสร้างระบบ agentic ที่น่าเชื่อถือและดูแลรักษาง่าย MAF ผนวกกับ OpenTelemetry เพื่อให้การติดตามและการวัดค่าที่ดีขึ้น

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # ทำบางอย่าง
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Workflows

MAF นำเสนอ workflows ที่เป็นขั้นตอนที่กำหนดล่วงหน้าเพื่อให้งานเสร็จสมบูรณ์ และมี AI agents เป็นส่วนประกอบในขั้นตอนเหล่านั้น

Workflows ประกอบด้วยส่วนต่างๆ ที่ช่วยให้การไหลของการควบคุมดีขึ้น และช่วยสนับสนุน **การจัดลำดับหลาย agent** และ **การบันทึกสถานะ (checkpointing)** เพื่อเก็บสถานะของ workflow

ส่วนประกอบหลักของ workflow คือ:

**Executors**

Executors รับข้อความเข้ามาทำงานที่ได้รับมอบหมาย จากนั้นสร้างข้อความผลลัพธ์ ซึ่งช่วยเคลื่อน workflow ไปข้างหน้าเพื่อให้งานใหญ่เสร็จสมบูรณ์ Executors อาจเป็น AI agent หรือ โค้ดลอจิกเฉพาะ

**Edges**

Edges ใช้กำหนดทิศทางของข้อความใน workflow ซึ่งอาจเป็น:

*Direct Edges* - การเชื่อมต่อแบบหนึ่งต่อหนึ่งระหว่าง executors:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Conditional Edges* - เปิดใช้งานเมื่อเงื่อนไขบางอย่างถูกต้อง เช่น เมื่อห้องพักโรงแรมไม่ว่าง executor สามารถแนะนำทางเลือกอื่นได้

*Switch-case Edges* - ส่งข้อความไปยัง executors ต่างๆ ตามเงื่อนไขที่กำหนด เช่น ถ้าลูกค้าการเดินทางมีสิทธิ์เข้าถึงลำดับความสำคัญ งานของเขาจะจัดการผ่าน workflow อื่น

*Fan-out Edges* - ส่งข้อความหนึ่งฉบับไปยังเป้าหมายหลายจุด

*Fan-in Edges* - รวบรวมข้อความหลายฉบับจาก executors ต่างๆ แล้วส่งไปยังเป้าหมายเดียว

**Events**

เพื่อสนับสนุนความสามารถในการสังเกตการณ์ใน workflows, MAF มีอีเวนต์ในตัวสำหรับการดำเนินการรวมถึง:

- `WorkflowStartedEvent` - เริ่มการทำงานของ workflow
- `WorkflowOutputEvent` - workflow ส่งผลลัพธ์ออกมา
- `WorkflowErrorEvent` - workflow ประสบข้อผิดพลาด
- `ExecutorInvokeEvent` - executor เริ่มประมวลผล
- `ExecutorCompleteEvent` - executor เสร็จสิ้นการประมวลผล
- `RequestInfoEvent` - มีการส่งคำขอ

## รูปแบบ MAF ขั้นสูง

ส่วนข้างต้นครอบคลุมแนวคิดหลักของ Microsoft Agent Framework เมื่อคุณสร้าง agent ที่ซับซ้อนขึ้น นี่คือรูปแบบขั้นสูงที่ควรพิจารณา:

- **การรวม Middleware**: เชนตัวจัดการ middleware หลายตัว (การบันทึก, การอนุญาต, การจำกัดอัตรา) โดยใช้ function และ chat middleware เพื่อควบคุมพฤติกรรม agent อย่างละเอียด
- **การบันทึกสถานะใน Workflow**: ใช้อีเวนต์ workflow และ serialization เพื่อบันทึกและดำเนินการกระบวนการ agent ที่ใช้เวลานานต่อ
- **การเลือกเครื่องมือแบบไดนามิก**: รวม RAG กับคำอธิบายเครื่องมือและการลงทะเบียนเครื่องมือของ MAF เพื่อแสดงเฉพาะเครื่องมือที่เกี่ยวข้องกับคำถาม
- **การส่งต่อแบบ Multi-Agent**: ใช้มุมของ workflow และการส่งเส้นทางตามเงื่อนไขเพื่อจัดการ handoff ระหว่าง agents ที่เชี่ยวชาญเฉพาะ

## โฮสต์ LangChain / LangGraph Agents บน Microsoft Foundry

Microsoft Agent Framework เป็น **framework-interoperable** — คุณไม่จำกัดเฉพาะ agent ที่เขียนด้วย MAF เท่านั้น หากคุณมี agent สร้างด้วย **LangChain** หรือ **LangGraph** แล้ว คุณสามารถรันมันเป็น **agent โฮสต์บน Microsoft Foundry** ซึ่ง Foundry จะจัดการ runtime, sessions, การขยายขนาด, ตัวตน, และจุดปลายโปรโตคอลให้คุณ ในขณะที่ตรรกะ agent ยังคงอยู่ใน LangGraph

สิ่งนี้ทำได้ด้วยแพ็กเกจ `langchain_azure_ai.agents.hosting` ที่เปิดเผยกราฟ LangGraph ที่คอมไพล์ผ่านโปรโตคอลเดียวกับที่ agent ที่โฮสต์บน Foundry ใช้

**1. ติดตั้ง hosting extra:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` extra ติดตั้งไลบรารีโปรโตคอล Foundry: `azure-ai-agentserver-responses` (จุดปลาย `/responses` ที่เข้ากันได้กับ OpenAI) และ `azure-ai-agentserver-invocations` (จุดปลาย `/invocations` ทั่วไป)

**2. เลือกโปรโตคอลโฮสต์:**

| Protocol | Host class | Endpoint | ใช้เมื่อ |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | คุณต้องการ chat แบบเข้ากันได้กับ OpenAI, สตรีมมิ่ง, ประวัติการตอบกลับ, และการจัดการบทสนทนา — ค่าดีฟอลต์ที่แนะนำสำหรับ agent แบบสนทนา |
| **Invocations** | `InvocationsHostServer` | `/invocations` | คุณต้องการ JSON รูปแบบกำหนดเอง, จุดปลายแบบ webhook, หรือประมวลผลที่ไม่ใช่สนทนา |

เนื่องจาก **Responses API เป็น API หลักสำหรับการพัฒนา agent-style ใน Foundry** ให้เริ่มต้นด้วย `ResponsesHostServer` สำหรับส่วนใหญ่ของ agent

**3. กำหนดค่าตัวแปรสภาพแวดล้อม** (`az login` ก่อนเพื่อให้ `DefaultAzureCredential` ตรวจสอบสิทธิ์):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

เมื่อ agent รันเป็น hosted agent ใน Foundry แพลตฟอร์มจะฉีดค่า `FOUNDRY_PROJECT_ENDPOINT` อัตโนมัติ

**4. เปิดเผย agent LangGraph ผ่านโปรโตคอล Responses:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # ChatOpenAI ที่นี่มุ่งเป้าไปที่จุดปลายทาง OpenAI-compatible (Responses) ของโครงการ Foundry.
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

รันในเครื่องด้วย `python main.py` จากนั้นส่งคำขอ Responses ไปยัง `http://localhost:8088/responses`

**พฤติกรรมหลัก:**

- **บทสนทนา**: ลูกค้าดำเนินการต่อบทสนทนาด้วยการส่ง `previous_response_id` หรือ ID ของ `conversation` ถ้ากราฟของคุณคอมไพล์ด้วย LangGraph checkpointer Foundry จะเก็บสถานะบทสนทนาไว้กับ checkpoint (ใช้ durable checkpointer สำหรับการผลิต; `MemorySaver` ใช้ได้สำหรับการทดสอบในเครื่อง)
- **มนุษย์ในวงจร**: ถ้ากราฟของคุณใช้ LangGraph `interrupt()`, `ResponsesHostServer` จะแสดง interrupt รอดำเนินการเป็นไอเท็ม Responses `function_call` / `mcp_approval_request` และลูกค้าจะดำเนินการต่อด้วย `function_call_output` / `mcp_approval_response` ที่ตรงกัน
- **ปรับใช้ใน Foundry**: ใช้ Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (ในเครื่อง ต้องใช้ Docker), จากนั้น `azd provision` และ `azd deploy` การปรับใช้ hosted-agent ต้องใช้บทบาท **Foundry Project Manager**

ตัวอย่างที่ใช้งานได้นี้อยู่ใน [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) สำหรับขั้นตอนเต็ม (โปรโตคอล Invocations, สคีมาคำขอกำหนดเอง และการแก้ปัญหา) ดูได้ที่ [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)

## ตัวอย่างโค้ด

ตัวอย่างโค้ดสำหรับ Microsoft Agent Framework สามารถพบได้ใน repository นี้ภายใต้ไฟล์ `xx-python-agent-framework` และ `xx-dotnet-agent-framework`

## มีคำถามเพิ่มเติมเกี่ยวกับ Microsoft Agent Framework หรือไม่?

เข้าร่วม [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) เพื่อพบปะผู้เรียนอื่นๆ เข้าร่วมชั่วโมงพบปะ และรับคำตอบสำหรับคำถามเกี่ยวกับ AI Agents ของคุณ
## บทเรียนก่อนหน้า

[Memory for AI Agents](../13-agent-memory/README.md)

## บทเรียนถัดไป

[Building Computer Use Agents (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->