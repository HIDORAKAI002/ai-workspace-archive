> [เลิกใช้: ตัวอย่างพร้อมปล่อย 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# การสุ่มตัวอย่างใน Model Context Protocol

> **ประกาศเลิกใช้:** ตัวอย่างพร้อมปล่อยสเปค MCP ประจำ `2026-07-28` ทำเครื่องหมายว่าการสุ่มตัวอย่างเป็นฟีเจอร์ที่เลิกใช้ เพื่อให้ผสานรวมโดยตรงกับ API ผู้ให้บริการ LLM การสุ่มตัวอย่างยังคงใช้งานได้ใน `2025-11-25` และอย่างน้อย 1 ปีหลังจากเลิกใช้เป็นทางการ ดังนั้นเนื้อหาในบทเรียนนี้ยังคงใช้ได้ - แต่การออกแบบเซิร์ฟเวอร์ใหม่ควรประเมินรูปแบบทดแทน ดูได้ที่ [มีอะไรเปลี่ยนแปลงใน MCP: ตัวอย่างพร้อมปล่อย 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

การสุ่มตัวอย่างเป็นฟีเจอร์ทรงพลังของ MCP ที่ช่วยให้เซิร์ฟเวอร์ร้องขอการเติมข้อความจาก LLM ผ่านไคลเอนต์ ทำให้เกิดพฤติกรรมผู้แทนที่ซับซ้อนในขณะรักษาความปลอดภัยและความเป็นส่วนตัว การตั้งค่าการสุ่มตัวอย่างที่เหมาะสมสามารถปรับปรุงคุณภาพและประสิทธิภาพของการตอบสนองได้อย่างมาก MCP มอบวิธีมาตรฐานในการควบคุมการสร้างข้อความของโมเดลด้วยพารามิเตอร์เฉพาะที่มีผลต่อความสุ่ม ความคิดสร้างสรรค์ และความสอดคล้อง

## บทนำ

ในบทเรียนนี้ เราจะสำรวจวิธีการตั้งค่าพารามิเตอร์การสุ่มตัวอย่างในการร้องขอ MCP และทำความเข้าใจกลไกโปรโตคอลพื้นฐานของการสุ่มตัวอย่าง

## วัตถุประสงค์การเรียนรู้

เมื่อจบบทเรียนนี้ คุณจะสามารถ:

- เข้าใจพารามิเตอร์การสุ่มตัวอย่างหลักที่มีใน MCP
- ตั้งค่าพารามิเตอร์การสุ่มตัวอย่างสำหรับกรณีใช้งานต่าง ๆ
- นำการสุ่มตัวอย่างแบบกำหนดผลลัพธ์แน่นอนมาใช้เพื่อให้ได้ผลลัพธ์ที่ทำซ้ำได้
- ปรับพารามิเตอร์การสุ่มตัวอย่างแบบไดนามิกตามบริบทและความชอบของผู้ใช้
- ใช้กลยุทธ์การสุ่มตัวอย่างเพื่อเพิ่มประสิทธิภาพโมเดลในสถานการณ์ต่าง ๆ
- เข้าใจการทำงานของการสุ่มตัวอย่างในโฟลว์ไคลเอนต์-เซิร์ฟเวอร์ของ MCP

## การทำงานของการสุ่มตัวอย่างใน MCP

โฟลว์การสุ่มตัวอย่างใน MCP มีขั้นตอนดังนี้:

1. เซิร์ฟเวอร์ส่งคำขอ `sampling/createMessage` ถึงไคลเอนต์
2. ไคลเอนต์ตรวจสอบคำขอและสามารถแก้ไขได้
3. ไคลเอนต์สุ่มตัวอย่างจาก LLM
4. ไคลเอนต์ตรวจสอบการเติมข้อความ
5. ไคลเอนต์ส่งผลลัพธ์กลับไปยังเซิร์ฟเวอร์

การออกแบบดังกล่าวที่มีมนุษย์อยู่ในวงจรนี้รับประกันว่าผู้ใช้ยังคงควบคุมสิ่งที่ LLM เห็นและสร้างขึ้นได้

## ภาพรวมพารามิเตอร์การสุ่มตัวอย่าง

MCP กำหนดพารามิเตอร์การสุ่มตัวอย่างดังต่อไปนี้ซึ่งสามารถตั้งค่าได้ในการร้องขอของไคลเอนต์:

| พารามิเตอร์ | คำอธิบาย | ช่วงปกติ |
|-----------|-------------|---------------|
| `temperature` | ควบคุมความสุ่มในการเลือกโทเคน | 0.0 - 1.0 |
| `maxTokens` | จำนวนโทเคนสูงสุดที่จะสร้าง | ค่าจำนวนเต็ม |
| `stopSequences` | ลำดับกำหนดที่หยุดการสร้างเมื่อพบ | อาร์เรย์ของสตริง |
| `metadata` | พารามิเตอร์เฉพาะของผู้ให้บริการเพิ่มเติม | วัตถุ JSON |

ผู้ให้บริการ LLM หลายรายสนับสนุนพารามิเตอร์เพิ่มเติมผ่านฟิลด์ `metadata` ซึ่งอาจรวมถึง:

| พารามิเตอร์ขยายทั่วไป | คำอธิบาย | ช่วงปกติ |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling - จำกัดโทเคนตามความน่าจะเป็นสะสมสูงสุด | 0.0 - 1.0 |
| `top_k` | จำกัดการเลือกโทเคนให้เฉพาะตัวเลือกสูงสุด K ตัว | 1 - 100 |
| `presence_penalty` | ลงโทษโทเคนตามการปรากฏตัวในข้อความจนถึงปัจจุบัน | -2.0 - 2.0 |
| `frequency_penalty` | ลงโทษโทเคนตามความถี่ในข้อความจนถึงปัจจุบัน | -2.0 - 2.0 |
| `seed` | ค่าเมล็ดสุ่มเฉพาะเพื่อให้ผลลัพธ์ทำซ้ำได้ | ค่าจำนวนเต็ม |

## ตัวอย่างรูปแบบคำขอ

นี่คือตัวอย่างการร้องขอการสุ่มตัวอย่างจากไคลเอนต์ใน MCP:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## รูปแบบการตอบกลับ

ไคลเอนต์ส่งผลลัพธ์การเติมข้อความกลับมา:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## การควบคุมมนุษย์ในวงจร

การสุ่มตัวอย่าง MCP ถูกออกแบบโดยคำนึงถึงการควบคุมดูแลของมนุษย์:

- **สำหรับคำกระตุ้น**:
  - ไคลเอนต์ควรแสดงคำกระตุ้นที่เสนอให้ผู้ใช้
  - ผู้ใช้ควรสามารถแก้ไขหรือปฏิเสธคำกระตุ้นได้
  - คำกระตุ้นระบบสามารถถูกคัดกรองหรือแก้ไขได้
  - การรวมบริบทถูกควบคุมโดยไคลเอนต์

- **สำหรับการเติมข้อความ**:
  - ไคลเอนต์ควรแสดงการเติมข้อความให้ผู้ใช้เห็น
  - ผู้ใช้ควรสามารถแก้ไขหรือปฏิเสธการเติมข้อความได้
  - ไคลเอนต์สามารถคัดกรองหรือแก้ไขการเติมข้อความได้
  - ผู้ใช้ควบคุมโมเดลที่จะใช้งาน

โดยยึดหลักการเหล่านี้ไว้ มาเรียนรู้วิธีการนำการสุ่มตัวอย่างไปใช้งานในภาษาโปรแกรมต่าง ๆ โดยเน้นพารามิเตอร์ที่สนับสนุนโดยผู้ให้บริการ LLM ส่วนใหญ่

## ข้อควรพิจารณาด้านความปลอดภัย

เมื่อใช้การสุ่มตัวอย่างใน MCP ให้พิจารณาปฏิบัติตามแนวทางความปลอดภัยที่ดีที่สุดเหล่านี้:

- **ตรวจสอบความถูกต้องของเนื้อหาข้อความทั้งหมด** ก่อนส่งถึงไคลเอนต์
- **ล้างข้อมูลที่อ่อนไหว** ออกจากคำกระตุ้นและการเติมข้อความ
- **ตั้งขีดจำกัดอัตราการใช้งาน** เพื่อป้องกันการใช้ในทางที่ผิด
- **ติดตามการใช้งานการสุ่มตัวอย่าง** เพื่อหาลักษณะที่ผิดปกติ
- **เข้ารหัสข้อมูลระหว่างส่ง** โดยใช้โปรโตคอลที่ปลอดภัย
- **จัดการข้อมูลส่วนตัวของผู้ใช้** ตามข้อกำหนดข้อบังคับที่เกี่ยวข้อง
- **ตรวจสอบคำขอการสุ่มตัวอย่าง** เพื่อความเป็นไปตามข้อกำหนดและความปลอดภัย
- **ควบคุมการเปิดเผยค่าใช้จ่าย** ด้วยขีดจำกัดที่เหมาะสม
- **ตั้งเวลาหน่วง** สำหรับคำขอการสุ่มตัวอย่าง
- **จัดการข้อผิดพลาดของโมเดลอย่างเหมาะสม** โดยมีการสำรองที่เหมาะสม

พารามิเตอร์การสุ่มตัวอย่างช่วยปรับแต่งพฤติกรรมของโมเดลภาษาให้สมดุลระหว่างผลลัพธ์ที่กำหนดได้และมีความคิดสร้างสรรค์ตามต้องการ

มาดูวิธีตั้งค่าพารามิเตอร์เหล่านี้ในภาษาโปรแกรมต่าง ๆ กัน

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

ในโค้ดก่อนหน้านี้เราได้:

- สร้างไคลเอนต์ MCP ด้วย URL เซิร์ฟเวอร์เฉพาะ
- ตั้งค่าคำขอด้วยพารามิเตอร์การสุ่มตัวอย่างเช่น `temperature`, `top_p`, และ `top_k`
- ส่งคำขอและแสดงข้อความที่ถูกสร้างขึ้น
- ใช้งาน:
    - `allowedTools` เพื่อระบุเครื่องมือที่โมเดลสามารถใช้ระหว่างการสร้าง ในกรณีนี้อนุญาตให้ใช้เครื่องมือ `ideaGenerator` และ `marketAnalyzer` เพื่อช่วยสร้างไอเดียแอปที่สร้างสรรค์
    - `frequencyPenalty` และ `presencePenalty` เพื่อควบคุมการซ้ำซ้อนและความหลากหลายในผลลัพธ์
    - `temperature` เพื่อควบคุมความสุ่มของผลลัพธ์ ซึ่งค่าสูงกว่าจะทำให้เกิดการตอบสนองที่สร้างสรรค์มากขึ้น
    - `top_p` เพื่อจำกัดการเลือกโทเคนในกลุ่มที่มีมวลความน่าจะเป็นสะสมสูงสุด ช่วยเพิ่มคุณภาพข้อความที่สร้าง
    - `top_k` เพื่อจำกัดโมเดลให้เลือกโทเคนที่น่าจะเป็นไปได้สูงสุดอันดับ K ซึ่งช่วยให้เกิดการตอบสนองที่สอดคล้องมากขึ้น
    - `frequencyPenalty` และ `presencePenalty` เพื่อลดความซ้ำซ้อนและส่งเสริมความหลากหลายในข้อความที่สร้างขึ้น

# [JavaScript](#tab/javascript)

```javascript
// ตัวอย่าง JavaScript: การตั้งค่าอุณหภูมิและการสุ่ม Top-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // เริ่มต้นไคลเอนต์ MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // กำหนดค่าคำขอด้วยพารามิเตอร์การสุ่มที่แตกต่างกัน
  const creativeSampling = {
    temperature: 0.9,    // อุณหภูมิสูงขึ้น = ความสุ่ม/ความคิดสร้างสรรค์มากขึ้น
    topP: 0.92,          // พิจารณาโทเค็นที่มีมวลความน่าจะเป็น Top 92%
    frequencyPenalty: 0.6, // ลดการซ้ำของลำดับโทเค็น
    presencePenalty: 0.4   // ลงโทษโทเค็นที่ปรากฏในข้อความจนถึงตอนนี้
  };
  
  const factualSampling = {
    temperature: 0.2,    // อุณหภูมิต่ำ = มีความแน่นอน/ตามข้อเท็จจริงมากขึ้น
    topP: 0.85,          // การเลือกโทเค็นที่เน้นมากขึ้นเล็กน้อย
    frequencyPenalty: 0.2, // โทษการซ้ำต่ำสุด
    presencePenalty: 0.1   // โทษการปรากฏตัวต่ำสุด
  };
  
  try {
    // ส่งคำขอสองรายการด้วยการกำหนดค่าการสุ่มต่างกัน
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

ในโค้ดก่อนหน้านี้เราได้:

- เริ่มต้นไคลเอนต์ MCP ด้วย URL เซิร์ฟเวอร์และคีย์ API
- ตั้งค่าชุดพารามิเตอร์การสุ่มตัวอย่างสองชุด: หนึ่งสำหรับงานสร้างสรรค์และอีกชุดสำหรับงานเชิงข้อเท็จจริง
- ส่งคำขอพร้อมการตั้งค่าพารามิเตอร์เหล่านี้ โดยอนุญาตให้โมเดลใช้เครื่องมือเฉพาะสำหรับแต่ละงาน
- แสดงผลลัพธ์ที่สร้างเพื่อแสดงผลกระทบของพารามิเตอร์การสุ่มต่าง ๆ
- ใช้ `allowedTools` เพื่อระบุเครื่องมือที่โมเดลสามารถใช้ระหว่างการสร้าง ในกรณีนี้อนุญาตเครื่องมือ `ideaGenerator` และ `environmentalImpactTool` สำหรับงานสร้างสรรค์ และ `factChecker` กับ `dataAnalysisTool` สำหรับงานเชิงข้อเท็จจริง
- ใช้ `temperature` เพื่อควบคุมความสุ่มของผลลัพธ์ ซึ่งค่าสูงกว่าจะทำให้เกิดการตอบสนองที่สร้างสรรค์มากขึ้น
- ใช้ `top_p` เพื่อจำกัดการเลือกโทเคนในกลุ่มที่มีมวลความน่าจะเป็นสะสมสูงสุด ช่วยเพิ่มคุณภาพข้อความที่สร้าง
- ใช้ `frequencyPenalty` และ `presencePenalty` เพื่อลดความซ้ำซ้อนและส่งเสริมความหลากหลายในผลลัพธ์
- ใช้ `top_k` เพื่อจำกัดโมเดลให้เลือกโทเคนที่น่าจะเป็นไปได้สูงสุดอันดับ K ซึ่งช่วยให้เกิดการตอบสนองที่สอดคล้องมากขึ้น

---

## การสุ่มตัวอย่างแบบกำหนดผลลัพธ์แน่นอน

สำหรับแอปพลิเคชันที่ต้องการผลลัพธ์ที่สม่ำเสมอ การสุ่มตัวอย่างแบบกำหนดผลลัพธ์แน่นอนช่วยให้ผลลัพธ์ทำซ้ำได้ วิธีการคือการใช้เมล็ดสุ่มแบบคงที่และตั้งค่า temperature เป็นศูนย์

มาดูตัวอย่างการใช้งานด้านล่างเพื่อแสดงการสุ่มแบบกำหนดผลลัพธ์แน่นอนในภาษาโปรแกรมต่าง ๆ

# [Java](#tab/java)

```java
// ตัวอย่าง Java: ตอบสนองแบบกำหนดได้ด้วยเมล็ดที่กำหนดไว้
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // ใช้เมล็ดที่กำหนดไว้สำหรับผลลัพธ์ที่กำหนดได้
        
        // คำขอแรกด้วยเมล็ดที่กำหนดไว้
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // อุณหภูมิศูนย์เพื่อความกำหนดได้สูงสุด
            .build();
            
        // คำขอที่สองด้วยเมล็ดเดียวกัน
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // ดำเนินการคำขอทั้งสอง
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // คำตอบควรเหมือนกันเนื่องจากใช้เมล็ดและอุณหภูมิ=0 เดียวกัน
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

ในโค้ดก่อนหน้านี้เราได้:

- สร้างไคลเอนต์ MCP ด้วย URL เซิร์ฟเวอร์ที่ระบุ
- ตั้งค่าคำขอสองคำขอโดยใช้คำกระตุ้นเดียวกัน เมล็ดสุ่มคงที่ และ temperature เป็นศูนย์
- ส่งคำขอทั้งสองและแสดงข้อความที่สร้างขึ้น
- แสดงให้เห็นว่าการตอบสนองเหมือนกันเนื่องจากธรรมชาติของการสุ่มแบบกำหนดผลลัพธ์แน่นอน (เมล็ดและ temperature เดียวกัน)
- ใช้ `setSeed` เพื่อระบุเมล็ดสุ่มคงที่ ทำให้โมเดลสร้างผลลัพธ์เหมือนกันทุกครั้งสำหรับอินพุตเดียวกัน
- ตั้งค่า `temperature` เป็นศูนย์เพื่อให้มั่นใจในความแน่นอนสูงสุด หมายความว่าโมเดลจะเลือกโทเคนถัดไปที่น่าจะเป็นไปได้มากที่สุดโดยไม่มีความสุ่ม

# [JavaScript](#tab/javascript-deterministic)

```javascript
// ตัวอย่าง JavaScript: การตอบสนองที่ตายตัวด้วยการควบคุม seed
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // คำขอครั้งแรกด้วย seed ที่กำหนดตายตัว
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // อุณหภูมิศูนย์เพื่อความตายตัวสูงสุด
    });
    
    // คำขอครั้งที่สองด้วย seed และอุณหภูมิเดียวกัน
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // คำขอครั้งที่สามด้วย seed ที่แตกต่างแต่ใช้อุณหภูมิเดียวกัน
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

ในโค้ดก่อนหน้านี้เราได้:

- เริ่มต้นไคลเอนต์ MCP ด้วย URL เซิร์ฟเวอร์
- ตั้งค่าคำขอสองคำขอโดยใช้คำกระตุ้นเดียวกัน เมล็ดสุ่มคงที่ และ temperature เป็นศูนย์
- ส่งคำขอทั้งสองและแสดงข้อความที่สร้างขึ้น
- แสดงให้เห็นว่าการตอบสนองเหมือนกันเนื่องจากธรรมชาติของการสุ่มแบบกำหนดผลลัพธ์แน่นอน (เมล็ดและ temperature เดียวกัน)
- ใช้ `seed` เพื่อระบุเมล็ดสุ่มคงที่ ทำให้โมเดลสร้างผลลัพธ์เหมือนกันทุกครั้งสำหรับอินพุตเดียวกัน
- ตั้งค่า `temperature` เป็นศูนย์เพื่อให้มั่นใจในความแน่นอนสูงสุด หมายความว่าโมเดลจะเลือกโทเคนถัดไปที่น่าจะเป็นไปได้มากที่สุดโดยไม่มีความสุ่ม
- ใช้เมล็ดต่างกันสำหรับคำขอที่สามเพื่อแสดงว่าการเปลี่ยนเมล็ดจะส่งผลลัพธ์ที่แตกต่าง แม้จะใช้คำกระตุ้นและ temperature เดียวกัน

---

## การตั้งค่าการสุ่มตัวอย่างแบบไดนามิก

การสุ่มตัวอย่างอัจฉริยะปรับพารามิเตอร์ตามบริบทและความต้องการของแต่ละคำขอ หมายความว่าปรับพารามิเตอร์ เช่น temperature, top_p, และ penalties ตามประเภทงาน ความชอบผู้ใช้ หรือประสิทธิภาพในอดีต

มาดูวิธีใช้งานการสุ่มตัวอย่างแบบไดนามิกในภาษาโปรแกรมต่าง ๆ กัน

# [Python](#tab/python)

```python
# ตัวอย่าง Python: การสุ่มตัวอย่างแบบไดนามิกตามบริบทของคำขอ
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # กำหนดค่าตัวอย่างล่วงหน้าสำหรับประเภทงานต่างๆ
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # เลือกค่าพรีเซ็ตฐาน
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # ปรับตามความชอบของผู้ใช้หากมีการให้มา
        if user_preferences:
            if "creativity_level" in user_preferences:
                # ปรับอุณหภูมิตามความชอบในการสร้างสรรค์ (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # ปรับ top_p ตามความหลากหลายของการตอบสนองที่ต้องการ
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # สร้างและส่งคำขอพร้อมพารามิเตอร์การสุ่มตัวอย่างแบบกำหนดเอง
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # ส่งคืนการตอบสนองพร้อมข้อมูลเมตาการสุ่มตัวอย่างเพื่อความโปร่งใส
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

ในโค้ดก่อนหน้านี้เราได้:

- สร้างคลาส `DynamicSamplingService` ที่จัดการการสุ่มตัวอย่างแบบปรับตัว
- กำหนดการตั้งค่าการสุ่มตัวอย่างสำหรับประเภทงานต่าง ๆ (สร้างสรรค์, ข้อเท็จจริง, โค้ด, วิเคราะห์)
- เลือกตั้งค่าพื้นฐานตามประเภทงาน
- ปรับพารามิเตอร์ตามความชอบของผู้ใช้ เช่น ระดับความคิดสร้างสรรค์และความหลากหลาย
- ส่งคำขอพร้อมพารามิเตอร์สุ่มตัวอย่างที่ถูกตั้งค่าแบบไดนามิก
- ส่งคืนข้อความที่สร้างขึ้นพร้อมพารามิเตอร์สุ่มตัวอย่างและประเภทงานเพื่อความโปร่งใส
- ใช้ `temperature` เพื่อควบคุมความสุ่มของผลลัพธ์ โดยค่าสูงกว่าจะทำให้เกิดการตอบสนองที่สร้างสรรค์มากขึ้น
- ใช้ `top_p` เพื่อจำกัดการเลือกโทเคนในกลุ่มที่มีมวลความน่าจะเป็นสะสมสูงสุด ช่วยเพิ่มคุณภาพข้อความที่สร้าง
- ใช้ `frequency_penalty` เพื่อลดความซ้ำซ้อนและส่งเสริมความหลากหลายในผลลัพธ์
- ใช้ `user_preferences` เพื่ออนุญาตการปรับแต่งพารามิเตอร์การสุ่มตัวอย่างตามระดับความคิดสร้างสรรค์และความหลากหลายที่ผู้ใช้กำหนด
- ใช้ `task_type` เพื่อกำหนดกลยุทธ์การสุ่มตัวอย่างที่เหมาะสมกับคำขอ เพื่อให้ตอบสนองได้เฉพาะเจาะจงมากขึ้นตามลักษณะงาน
- ใช้วิธี `send_request` เพื่อส่งคำกระตุ้นพร้อมพารามิเตอร์สุ่มตัวอย่างที่ตั้งค่าแล้ว เพื่อให้โมเดลสร้างข้อความตามข้อกำหนดที่ระบุ
- ใช้ `generated_text` เพื่อดึงคำตอบจากโมเดล ซึ่งจะส่งคืนพร้อมกับพารามิเตอร์สุ่มและประเภทงานเพื่อการวิเคราะห์หรือแสดงผลต่อไป
- ใช้ฟังก์ชัน `min` และ `max` เพื่อให้แน่ใจว่าความชอบของผู้ใช้ถูกจำกัดในช่วงที่ถูกต้อง ป้องกันการตั้งค่าที่ไม่ถูกต้อง

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// ตัวอย่าง JavaScript: การกำหนดค่าการสุ่มตัวอย่างแบบไดนามิกโดยขึ้นอยู่กับบริบทของผู้ใช้
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // กำหนดโปรไฟล์ฐานสำหรับการสุ่มตัวอย่าง
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ติดตามประสิทธิภาพในอดีต
    this.performanceHistory = [];
  }
  
  // ตรวจจับประเภทงานจากพรอมต์
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // การตรวจจับแบบง่าย - สามารถพัฒนาเพิ่มเติมด้วยการจำแนกประเภทด้วย ML
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // กำหนดค่าปริยายเป็นการสนทนา ถ้าไม่พบประเภทชัดเจน
    return 'conversational';
  }
  
  // คำนวณพารามิเตอร์การสุ่มตัวอย่างตามบริบทและความชอบของผู้ใช้
  getSamplingParameters(prompt, context = {}) {
    // ตรวจจับประเภทงาน
    const taskType = this.detectTaskType(prompt, context);
    
    // ดึงโปรไฟล์ฐาน
    let params = {...this.samplingProfiles[taskType]};
    
    // ปรับเปลี่ยนตามความชอบของผู้ใช้
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // แปลงมาตราส่วนจาก 1-10 เป็นช่วงอุณหภูมิที่เหมาะสม
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // ความแม่นยำสูงหมายถึง topP ต่ำกว่า (การเลือกที่เน้นมากขึ้น)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // ความสม่ำเสมอสูงหมายถึงการลดโทษลง
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // ใช้การปรับแต่งที่เรียนรู้จากประวัติประสิทธิภาพ
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // ตรรกะการปรับตัวแบบง่าย - สามารถพัฒนาเพิ่มเติมด้วยอัลกอริทึมที่ซับซ้อนมากขึ้น
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // พิจารณาเฉพาะประวัติช่วงล่าสุด
    
    if (relevantHistory.length > 0) {
      // คำนวณคะแนนเฉลี่ยของประสิทธิภาพ
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // หากประสิทธิภาพต่ำกว่าค่าเกณฑ์ ให้ปรับพารามิเตอร์
      if (avgScore < 0.7) {
        // ปรับเล็กน้อยเข้าสู่ค่าที่ปลอดภัยกว่า
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // บันทึกประสิทธิภาพเพื่อการปรับแต่งในอนาคต
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // การให้คะแนนคุณภาพการตอบสนองในช่วง 0-1
    });
    
    // จำกัดขนาดของประวัติ
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ดึงพารามิเตอร์การสุ่มตัวอย่างที่ได้รับการปรับให้เหมาะสม
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ส่งคำขอพร้อมพารามิเตอร์ที่ได้รับการปรับให้เหมาะสมแล้ว
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // หากผู้ใช้ให้ข้อเสนอแนะ ให้บันทึกเพื่อการปรับปรุงในอนาคต
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// ตัวอย่างการใช้งาน
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // งานสร้างสรรค์ด้วยความชอบของผู้ใช้ที่กำหนดเอง
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // ความคิดสร้างสรรค์สูง (1-10)
          consistency: 3  // ความสม่ำเสมอต่ำ (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // งานสร้างโค้ด
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // ความคิดสร้างสรรค์ต่ำ
          precision: 8,   // ความแม่นยำสูง
          consistency: 9  // ความสม่ำเสมอสูง
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

ในโค้ดก่อนหน้านี้เราได้:

- สร้างคลาส `AdaptiveSamplingManager` ที่จัดการการสุ่มตัวอย่างแบบไดนามิกตามประเภทงานและความชอบของผู้ใช้
- กำหนดโปรไฟล์การสุ่มตัวอย่างสำหรับประเภทงานต่าง ๆ (สร้างสรรค์, ข้อเท็จจริง, โค้ด, สนทนา)
- นำวิธีตรวจจับประเภทงานจากคำกระตุ้นโดยใช้เฮียริสติกง่าย ๆ
- คำนวณพารามิเตอร์การสุ่มตัวอย่างตามประเภทงานที่ตรวจจับได้และความชอบของผู้ใช้
- นำการปรับปรุงที่เรียนรู้จากประสิทธิภาพในอดีตมาปรับใช้เพื่อเพิ่มประสิทธิภาพพารามิเตอร์สุ่ม
- บันทึกประสิทธิภาพเพื่อการปรับปรุงในอนาคต ให้ระบบเรียนรู้จากการโต้ตอบในอดีต
- ส่งคำขอพร้อมพารามิเตอร์สุ่มตัวอย่างที่ตั้งค่าแบบไดนามิกและส่งคืนข้อความที่สร้างพร้อมพารามิเตอร์ที่ใช้และประเภทงานที่ตรวจจับได้
- ใช้งาน:
    - `userPreferences` เพื่ออนุญาตการปรับแต่งพารามิเตอร์สุ่มตัวอย่างโดยพิจารณาจากระดับความคิดสร้างสรรค์ ความแม่นยำ และความสม่ำเสมอที่ผู้ใช้กำหนด
    - `detectTaskType` เพื่อกำหนดลักษณะงานจากคำกระตุ้น เพื่อให้ตอบสนองได้ตรงกับลักษณะงานมากขึ้น
    - `recordPerformance` เพื่อบันทึกประสิทธิภาพของคำตอบที่สร้าง ทำให้ระบบสามารถปรับตัวและพัฒนาได้ตามเวลา
    - `applyLearnedAdjustments` เพื่อแก้ไขพารามิเตอร์สุ่มตัวอย่างตามประสิทธิภาพที่ผ่านมา ช่วยเพิ่มความสามารถของโมเดลในการสร้างคำตอบคุณภาพสูง
    - `generateResponse` เพื่อรวบรวมทั้งกระบวนการสร้างคำตอบด้วยการสุ่มแบบปรับตัว ทำให้ง่ายต่อการเรียกใช้กับคำกระตุ้นและบริบทต่าง ๆ
    - `allowedTools` เพื่อระบุเครื่องมือที่โมเดลสามารถใช้ในระหว่างการสร้างข้อความ ให้ตอบสนองได้ตามบริบทมากขึ้น
    - `feedbackScore` เพื่อให้ผู้ใช้สามารถให้คะแนนคุณภาพของคำตอบที่สร้างขึ้น ซึ่งใช้ในการปรับปรุงประสิทธิภาพของโมเดลต่อไป
    - `performanceHistory` เพื่อเก็บบันทึกการโต้ตอบที่ผ่านมา ให้ระบบเรียนรู้จากความสำเร็จและความล้มเหลวก่อนหน้า
    - `getSamplingParameters` เพื่อปรับพารามิเตอร์การสุ่มอย่างไดนามิกตามบริบทของคำขอ ให้โมเดลมีพฤติกรรมที่ยืดหยุ่นและตอบสนองได้ดีขึ้น
    - `detectTaskType` เพื่อจัดประเภทงานจากคำกระตุ้น ช่วยให้ระบบใช้กลยุทธ์การสุ่มตัวอย่างที่เหมาะสมกับแต่ละประเภทคำขอ
    - `samplingProfiles` เพื่อกำหนดการตั้งค่าพื้นฐานการสุ่มตัวอย่างสำหรับประเภทงานต่าง ๆ ช่วยให้ปรับค่าได้รวดเร็วตามลักษณะของคำขอ

---

## ขั้นต่อไป

- [5.7 การปรับขนาด](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->