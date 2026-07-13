![MCP-for-beginners](../../translated_images/th/mcp-beginners.2ce2b317996369ff.webp) 

[![GitHub contributors](https://img.shields.io/github/contributors/microsoft/mcp-for-beginners.svg)](https://GitHub.com/microsoft/mcp-for-beginners/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/microsoft/mcp-for-beginners.svg)](https://GitHub.com/microsoft/mcp-for-beginners/issues)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/microsoft/mcp-for-beginners.svg)](https://GitHub.com/microsoft/mcp-for-beginners/pulls)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![GitHub watchers](https://img.shields.io/github/watchers/microsoft/mcp-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/mcp-for-beginners/watchers)
[![GitHub forks](https://img.shields.io/github/forks/microsoft/mcp-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/mcp-for-beginners/fork)
[![GitHub stars](https://img.shields.io/github/stars/microsoft/mcp-for-beginners?style=social&label=Star)](https://GitHub.com/microsoft/mcp-for-beginners/stargazers)


[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)

ทำตามขั้นตอนเหล่านี้เพื่อเริ่มต้นใช้ทรัพยากรเหล่านี้:
1. **Fork the Repository**: คลิก [![GitHub forks](https://img.shields.io/github/forks/microsoft/mcp-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/mcp-for-beginners/fork)
2. **Clone the Repository**:   `git clone https://github.com/microsoft/mcp-for-beginners.git`
3. **เข้าร่วม** [![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


### 🌐 การรองรับหลายภาษา

#### รองรับผ่าน GitHub Action (อัตโนมัติและอัปเดตเสมอ)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[Arabic](../ar/README.md) | [Bengali](../bn/README.md) | [Bulgarian](../bg/README.md) | [Burmese (Myanmar)](../my/README.md) | [Chinese (Simplified)](../zh-CN/README.md) | [Chinese (Traditional, Hong Kong)](../zh-HK/README.md) | [Chinese (Traditional, Macau)](../zh-MO/README.md) | [Chinese (Traditional, Taiwan)](../zh-TW/README.md) | [Croatian](../hr/README.md) | [Czech](../cs/README.md) | [Danish](../da/README.md) | [Dutch](../nl/README.md) | [Estonian](../et/README.md) | [Finnish](../fi/README.md) | [French](../fr/README.md) | [German](../de/README.md) | [Greek](../el/README.md) | [Hebrew](../he/README.md) | [Hindi](../hi/README.md) | [Hungarian](../hu/README.md) | [Indonesian](../id/README.md) | [Italian](../it/README.md) | [Japanese](../ja/README.md) | [Kannada](../kn/README.md) | [Khmer](../km/README.md) | [Korean](../ko/README.md) | [Lithuanian](../lt/README.md) | [Malay](../ms/README.md) | [Malayalam](../ml/README.md) | [Marathi](../mr/README.md) | [Nepali](../ne/README.md) | [Nigerian Pidgin](../pcm/README.md) | [Norwegian](../no/README.md) | [Persian (Farsi)](../fa/README.md) | [Polish](../pl/README.md) | [Portuguese (Brazil)](../pt-BR/README.md) | [Portuguese (Portugal)](../pt-PT/README.md) | [Punjabi (Gurmukhi)](../pa/README.md) | [Romanian](../ro/README.md) | [Russian](../ru/README.md) | [Serbian (Cyrillic)](../sr/README.md) | [Slovak](../sk/README.md) | [Slovenian](../sl/README.md) | [Spanish](../es/README.md) | [Swahili](../sw/README.md) | [Swedish](../sv/README.md) | [Tagalog (Filipino)](../tl/README.md) | [Tamil](../ta/README.md) | [Telugu](../te/README.md) | [Thai](./README.md) | [Turkish](../tr/README.md) | [Ukrainian](../uk/README.md) | [Urdu](../ur/README.md) | [Vietnamese](../vi/README.md)

> **ต้องการโคลนแบบท้องถิ่น?**
>
> ที่เก็บนี้รวมการแปลภาษา 50+ ภาษาซึ่งเพิ่มขนาดการดาวน์โหลดอย่างมาก เพื่อโคลนโดยไม่มีการแปล ให้ใช้ sparse checkout:
>
> **Bash / macOS / Linux:**
> ```bash
> git clone --filter=blob:none --sparse https://github.com/microsoft/mcp-for-beginners.git
> cd mcp-for-beginners
> git sparse-checkout set --no-cone '/*' '!translations' '!translated_images'
> ```
>
> **CMD (Windows):**
> ```cmd
> git clone --filter=blob:none --sparse https://github.com/microsoft/mcp-for-beginners.git
> cd mcp-for-beginners
> git sparse-checkout set --no-cone "/*" "!translations" "!translated_images"
> ```
>
> สิ่งนี้จะให้ทุกสิ่งที่คุณต้องการเพื่อทำหลักสูตรให้เสร็จด้วยการดาวน์โหลดที่เร็วขึ้นมาก
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

# 🚀 หลักสูตร Model Context Protocol (MCP) สำหรับผู้เริ่มต้น

## **เรียน MCP ด้วยตัวอย่างโค้ดปฏิบัติใน C#, Java, JavaScript, Rust, Python และ TypeScript**

## 🧠 ภาพรวมของหลักสูตร Model Context Protocol
ยินดีต้อนรับสู่การผจญภัยใน Model Context Protocol! หากคุณเคยสงสัยว่าแอปพลิเคชัน AI ติดต่อกับเครื่องมือและบริการต่าง ๆ อย่างไร ตอนนี้คุณกำลังจะค้นพบวิธีแก้ไขที่เรียบง่ายซึ่งกำลังก่อรูปแบบการสร้างระบบอัจฉริยะของนักพัฒนา

ให้คิดว่า MCP เป็นล่ามสากลสำหรับแอป AI - เหมือนกับที่พอร์ต USB ช่วยให้คุณเชื่อมต่ออุปกรณ์ใดก็ได้กับคอมพิวเตอร์ MCP ช่วยให้โมเดล AI เชื่อมต่อกับเครื่องมือหรือบริการใดก็ได้ในรูปแบบมาตรฐาน ไม่ว่าคุณจะสร้างแชทบอทแรกของคุณหรือทำงานกับเวิร์กโฟลว์ AI ที่ซับซ้อน การเข้าใจ MCP จะช่วยให้คุณสร้างแอปที่ทรงพลังและยืดหยุ่นมากขึ้น

หลักสูตรนี้ออกแบบด้วยความอดทนและดูแลเพื่อการเรียนรู้ของคุณ เราจะเริ่มต้นด้วยแนวคิดง่าย ๆ ที่คุณเข้าใจอยู่แล้วและค่อย ๆ สร้างทักษะของคุณผ่านการฝึกปฏิบัติในภาษาการเขียนโปรแกรมที่คุณชอบ ทุกขั้นตอนมีคำอธิบายชัดเจน ตัวอย่างใช้งานจริง และกำลังใจมากมายตลอดทาง

เมื่อคุณจบการเรียนรู้ครั้งนี้ คุณจะมั่นใจในการสร้างเซิร์ฟเวอร์ MCP ของคุณเอง การรวมเข้ากับแพลตฟอร์ม AI ที่ได้รับความนิยม และเข้าใจว่าเทคโนโลยีนี้กำลังเปลี่ยนแปลงอนาคตของการพัฒนา AI อย่างไร มาเริ่มการผจญภัยที่น่าตื่นเต้นนี้ด้วยกันเลย!

### เอกสารและข้อกำหนดอย่างเป็นทางการ

หลักสูตรนี้สอดคล้องกับ **ข้อกำหนด MCP ประจำวันที่ 2025-11-25** (รุ่นเสถียรล่าสุด) ข้อกำหนด MCP ใช้การกำหนดรุ่นตามวันที่ (รูปแบบ YYYY-MM-DD) เพื่อให้ติดตามเวอร์ชันโปรโตคอลได้อย่างชัดเจน

> **มองไปข้างหน้า:** ตัวอย่างรุ่นสำหรับเวอร์ชันข้อกำหนดถัดไป **2026-07-28** มีกำหนดออกในวันที่ 28 กรกฎาคม 2026 โดยทำให้โปรโตคอลไม่ขึ้นกับสถานะที่ชั้นขนส่ง กำหนดกรอบการขยาย (MCP Apps, Tasks) เพิ่มความเข้มแข็งด้านการอนุญาต และเลิกใช้ Roots, Sampling, และ Logging ดูที่ [มีอะไรเปลี่ยนแปลงใน MCP: ตัวอย่างรุ่น 2026-07-28](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) สำหรับรายละเอียดทั้งหมด

แหล่งข้อมูลเหล่านี้จะมีค่ามากขึ้นเมื่อความเข้าใจของคุณเติบโต แต่ไม่ต้องกังวลว่าต้องอ่านทุกอย่างทันที เริ่มจากส่วนที่คุณสนใจมากที่สุด!
- 📘 [เอกสาร MCP](https://modelcontextprotocol.io/) – นี่คือแหล่งข้อมูลสำหรับบทช่วยสอนและคู่มือผู้ใช้ทีละขั้นตอน เอกสารถูกเขียนให้ง่ายสำหรับผู้เริ่มต้นโดยมีตัวอย่างชัดเจนที่คุณสามารถติดตามได้ในจังหวะของตัวเอง
- 📜 [ข้อกำหนด MCP](https://modelcontextprotocol.io/specification/2025-11-25) – นึกว่านี่คือคู่มืออ้างอิงที่ครอบคลุม เมื่อคุณเรียนหลักสูตรนี้ คุณจะกลับมาดูรายละเอียดเฉพาะและสำรวจฟีเจอร์ขั้นสูงที่นี่
- 📜 [การกำหนดเวอร์ชันข้อกำหนด MCP](https://modelcontextprotocol.io/specification/versioning) – ประกอบด้วยข้อมูลเกี่ยวกับประวัติเวอร์ชันโปรโตคอลและวิธีที่ MCP ใช้การกำหนดเวอร์ชันตามวันที่ (รูปแบบ YYYY-MM-DD)
- 🧑‍💻 [ที่เก็บ MCP บน GitHub](https://github.com/modelcontextprotocol) – ที่นี่คุณจะพบ SDK เครื่องมือ และตัวอย่างโค้ดในหลายภาษาโปรแกรม เหมือนกับคลังสมบัติของตัวอย่างใช้งานจริงและคอมโพเนนต์พร้อมใช้
- 🌐 [ชุมชน MCP](https://github.com/orgs/modelcontextprotocol/discussions) – เข้าร่วมกับผู้เรียนและนักพัฒนามืออาชีพในการสนทนาเกี่ยวกับ MCP นี่คือชุมชนที่สนับสนุนซึ่งยินดีต้อนรับคำถามและแบ่งปันความรู้ได้อย่างเสรี
  
## วัตถุประสงค์การเรียนรู้

เมื่อสิ้นสุดหลักสูตรนี้ คุณจะรู้สึกมั่นใจและตื่นเต้นกับทักษะใหม่ของคุณ นี่คือสิ่งที่คุณจะได้:

• **เข้าใจพื้นฐานของ MCP**: คุณจะเข้าใจว่า Model Context Protocol คืออะไรและทำไมมันจึงปฏิวัติวิธีที่แอปพลิเคชัน AI ทำงานร่วมกัน โดยใช้การเปรียบเทียบและตัวอย่างที่เข้าใจง่าย

• **สร้างเซิร์ฟเวอร์ MCP แรกของคุณ**: คุณจะสร้างเซิร์ฟเวอร์ MCP ที่ทำงานได้จริงในภาษาการเขียนโปรแกรมที่คุณเลือก เริ่มจากตัวอย่างง่าย ๆ และพัฒนาทักษะทีละขั้น

• **เชื่อมต่อโมเดล AI กับเครื่องมือจริง**: คุณจะเรียนรู้วิธีเชื่อมช่องว่างระหว่างโมเดล AI กับบริการจริง เพื่อให้งานของคุณมีความสามารถใหม่ที่ทรงพลัง

• **นำแนวปฏิบัติด้านความปลอดภัยมาใช้**: คุณจะเข้าใจวิธีรักษาความปลอดภัยในการใช้งาน MCP ของคุณ ปกป้องทั้งแอปพลิเคชันและผู้ใช้ของคุณ

• **นำเสนอด้วยความมั่นใจ**: คุณจะรู้วิธีนำโครงการ MCP ของคุณจากการพัฒนาไปสู่การผลิตด้วยกลยุทธ์การติดตั้งที่ใช้ได้จริงในโลกจริง

• **เข้าร่วมชุมชน MCP**: คุณจะกลายเป็นส่วนหนึ่งของชุมชนผู้พัฒนาที่กำลังกำหนดอนาคตของการพัฒนาแอป AI

## พื้นฐานที่จำเป็น

ก่อนที่เราจะเจาะลึก MCP ขอให้แน่ใจว่าคุณรู้สึกสบายใจกับแนวคิดพื้นฐานบางอย่าง อย่ากังวลหากคุณไม่เชี่ยวชาญในด้านเหล่านี้ – เราจะอธิบายทุกสิ่งที่คุณต้องรู้ไปพร้อมกัน!

### ความเข้าใจเกี่ยวกับโปรโตคอล (รากฐาน)

ให้คิดว่าโปรโตคอลเป็นกฎสำหรับการสนทนา เมื่อคุณโทรหาเพื่อน คุณทั้งสองรู้ว่าจะพูดว่า "สวัสดี" เมื่อรับสาย ผลัดกันพูด และพูดว่า "ลาก่อน" เมื่อจบ โปรแกรมคอมพิวเตอร์ก็ต้องมีกฎแบบนี้เช่นกันเพื่อสื่อสารกันได้ดี

MCP คือโปรโตคอล – ชุดกฎที่ตกลงร่วมกันซึ่งช่วยให้โมเดล AI และแอปพลิเคชันสื่อสารกันอย่างมีประสิทธิภาพเหมือนการสนทนา แบบเดียวกับที่กฎของการสนทนาทำให้มนุษย์พูดคุยกันได้ลื่นไหล MCP ทำให้การสื่อสารของแอป AI น่าเชื่อถือและทรงพลังยิ่งขึ้น

### ความสัมพันธ์ระหว่างไคลเอนต์และเซิร์ฟเวอร์ (โปรแกรมทำงานร่วมกันอย่างไร)

คุณใช้ความสัมพันธ์ไคลเอนต์-เซิร์ฟเวอร์ทุกวัน! เมื่อคุณใช้เว็บเบราว์เซอร์ (ไคลเอนต์) เข้าเว็บไซต์ คุณเชื่อมต่อกับเว็บเซิร์ฟเวอร์ที่ส่งเนื้อหาของหน้าให้ เบราว์เซอร์รู้วิธีขอข้อมูล และเซิร์ฟเวอร์รู้วิธีตอบกลับ

ใน MCP มีความสัมพันธ์คล้ายกัน: โมเดล AI ทำหน้าที่เป็นไคลเอนต์ที่ร้องขอข้อมูลหรือคำสั่ง ในขณะที่เซิร์ฟเวอร์ MCP ให้ความสามารถเหล่านั้น มันเหมือนมีผู้ช่วยที่ให้คำสั่งเพื่อทำงานเฉพาะอย่างกับ AI

### ทำไมมาตรฐานจึงสำคัญ (ทำให้สิ่งต่าง ๆ ทำงานร่วมกันได้)

ลองจินตนาการว่าผู้ผลิตรถแต่ละรายใช้หัวจ่ายน้ำมันที่มีรูปทรงต่างกัน – คุณจะต้องใช้อะแดปเตอร์แตกต่างกันสำหรับทุกคัน! มาตรฐานหมายถึงการตกลงร่วมกันในแนวทางทั่วไปเพื่อให้ทุกอย่างทำงานร่วมกันได้อย่างไร้รอยต่อ

MCP เป็นมาตรฐานนี้สำหรับแอป AI แทนที่โมเดล AI แต่ละตัวจะต้องมีโค้ดเฉพาะสำหรับทุกเครื่องมือ MCP สร้างวิธีสื่อสารสากลที่ทำให้เครื่องมือที่สร้างครั้งเดียวใช้ได้กับระบบ AI ต่าง ๆ ได้มากมาย

## 🧭 ภาพรวมเส้นทางการเรียนรู้ของคุณ

การเดินทาง MCP ของคุณถูกวางโครงสร้างอย่างระมัดระวังเพื่อเพิ่มความมั่นใจและทักษะของคุณอย่างค่อยเป็นค่อยไป ทุกช่วงเวลาจะแนะนำแนวคิดใหม่โดยเสริมความเข้าใจในสิ่งที่เรียนไปแล้ว

### 🌱 ระยะพื้นฐาน: เข้าใจเบื้องต้น (โมดูล 0-2)

นี่คือจุดเริ่มต้นของการผจญภัยของคุณ! เราจะแนะนำคุณสู่องค์ความรู้ MCP โดยใช้การเปรียบเทียบที่คุ้นเคยและตัวอย่างง่าย ๆ คุณจะเข้าใจว่า MCP คืออะไร ทำไมถึงมี และมันไปอยู่ตรงไหนในโลกกว้างของการพัฒนา AI

• **โมดูล 0 - แนะนำ MCP**: เราจะเริ่มต้นด้วยการสำรวจว่า MCP คืออะไรและทำไมมันจึงสำคัญสำหรับแอป AI รุ่นใหม่ คุณจะได้เห็นตัวอย่าง MCP ในโลกจริงและเข้าใจวิธีแก้ปัญหาที่นักพัฒนามักเผชิญ


• **โมดูล 1 - อธิบายแนวคิดหลัก**: ที่นี่คุณจะได้เรียนรู้โครงสร้างพื้นฐานที่สำคัญของ MCP เราจะใช้การเปรียบเทียบและตัวอย่างภาพประกอบมากมายเพื่อให้แนวคิดเหล่านี้รู้สึกเป็นธรรมชาติและเข้าใจง่าย

• **โมดูล 2 - ความปลอดภัยใน MCP**: ความปลอดภัยอาจฟังดูน่ากลัว แต่เราจะแสดงให้คุณเห็นว่า MCP มีฟีเจอร์ความปลอดภัยในตัวอย่างไรและสอนแนวปฏิบัติที่ดีที่สุดที่จะปกป้องแอปพลิเคชันของคุณตั้งแต่เริ่มต้น

### 🔨 ขั้นตอนการสร้าง: การสร้างการใช้งานแรกของคุณ (โมดูล 3)

ตอนนี้ความสนุกที่แท้จริงเริ่มต้นขึ้น! คุณจะได้ลงมือสร้างเซิร์ฟเวอร์และไคลเอนต์ MCP แท้จริง อย่ากังวล - เราจะเริ่มต้นอย่างง่ายและนำทางคุณผ่านทุกขั้นตอน

โมดูลนี้ประกอบด้วยคู่มือปฏิบัติหลายบทที่ให้คุณฝึกในภาษาการเขียนโปรแกรมที่คุณชอบ คุณจะสร้างเซิร์ฟเวอร์ตัวแรก สร้างไคลเอนต์เพื่อเชื่อมต่อกับเซิร์ฟเวอร์ และแม้แต่รวมกับเครื่องมือพัฒนาที่ได้รับความนิยมเช่น VS Code

แต่ละคู่มือมีตัวอย่างโค้ดครบถ้วน เคล็ดลับการแก้ไขปัญหา และคำอธิบายว่าทำไมเราถึงเลือกออกแบบแบบนี้ ในตอนท้ายของขั้นตอนนี้ คุณจะมีการใช้งาน MCP ที่ใช้งานได้จริงที่คุณภาคภูมิใจ!

### 🚀 ขั้นตอนการเติบโต: แนวคิดขั้นสูงและการประยุกต์ในโลกจริง (โมดูล 4-5)

หลังจากที่เข้าใจพื้นฐานแล้ว คุณก็พร้อมที่จะสำรวจฟีเจอร์ MCP ที่ซับซ้อนมากขึ้น เราจะพูดถึงกลยุทธ์การใช้งานในทางปฏิบัติ เทคนิคการดีบัก และหัวข้อขั้นสูงเช่นการรวม AI แบบหลายโหมด

คุณยังจะได้เรียนรู้วิธีการขยายการใช้งาน MCP สำหรับใช้งานในระดับการผลิตและการรวมกับแพลตฟอร์มคลาวด์อย่าง Azure โมดูลเหล่านี้เตรียมคุณให้สามารถสร้างโซลูชัน MCP ที่รองรับความต้องการในโลกจริงได้

### 🌟 ขั้นตอนความเชี่ยวชาญ: ชุมชนและการเชี่ยวชาญเฉพาะด้าน (โมดูล 6-11)

ขั้นตอนสุดท้ายเน้นที่การเข้าร่วมชุมชน MCP และการเชี่ยวชาญในด้านที่คุณสนใจที่สุด คุณจะได้เรียนรู้วิธีการมีส่วนร่วมกับโปรเจค MCP แบบโอเพ่นซอร์ส การใช้งานรูปแบบการยืนยันตัวตนขั้นสูง และการสร้างโซลูชันที่ผสานฐานข้อมูลอย่างครบถ้วน

โมดูล 11 นั้นควรได้การกล่าวถึงเป็นพิเศษ - เป็นเส้นทางการเรียนรู้แบบฝึกปฏิบัติในห้องทดลองมากถึง 13 ห้องที่สอนให้คุณสร้างเซิร์ฟเวอร์ MCP ที่พร้อมใช้งานจริงพร้อมการผสานกับ PostgreSQL มันเหมือนโปรเจคสุดท้ายที่รวมทุกสิ่งที่คุณได้เรียนรู้เข้าด้วยกัน!

### 📚 โครงสร้างหลักสูตรครบถ้วน

| โมดูล | หัวข้อ | รายละเอียด | ลิงก์ |
|--------|-------|-------------|------|
| **โมดูล 0-3: พื้นฐาน** | | | |
| 00 | แนะนำ MCP | ภาพรวมของ Model Context Protocol และความสำคัญในสายงาน AI | [อ่านเพิ่มเติม](./00-Introduction/README.md) |
| 01 | อธิบายแนวคิดหลัก | การสำรวจแนวคิดหลักใน MCP อย่างลึกซึ้ง | [อ่านเพิ่มเติม](./01-CoreConcepts/README.md) |
| 1.1 | สิ่งที่เปลี่ยนแปลงใน MCP (2026-07-28 RC) | โปรโตคอลไม่โต้ตอบ, กรอบงาน Extensions, และการเลิกใช้ฟีเจอร์ในเวอร์ชัน ต่อไป | [คู่มือ](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) |
| 02 | ความปลอดภัยใน MCP | ภัยคุกคามด้านความปลอดภัยและแนวปฏิบัติที่ดีที่สุด | [อ่านเพิ่มเติม](./02-Security/README.md) |
| 03 | เริ่มต้นกับ MCP | การตั้งค่าสภาพแวดล้อม, เซิร์ฟเวอร์/ไคลเอนต์ เบื้องต้น, การผสานรวม | [อ่านเพิ่มเติม](./03-GettingStarted/README.md) |
| **โมดูล 3: สร้างเซิร์ฟเวอร์และไคลเอนต์แรกของคุณ** | | | |
| 3.1 | เซิร์ฟเวอร์แรก | สร้างเซิร์ฟเวอร์ MCP ตัวแรกของคุณ | [คู่มือ](./03-GettingStarted/01-first-server/README.md) |
| 3.2 | ไคลเอนต์แรก | พัฒนาไคลเอนต์ MCP เบื้องต้น | [คู่มือ](./03-GettingStarted/02-client/README.md) |
| 3.3 | ไคลเอนต์กับ LLM | รวมโมเดลภาษาขนาดใหญ่ | [คู่มือ](./03-GettingStarted/03-llm-client/README.md) |
| 3.4 | การผสานรวม VS Code | ใช้เซิร์ฟเวอร์ MCP ใน VS Code | [คู่มือ](./03-GettingStarted/04-vscode/README.md) |
| 3.5 | เซิร์ฟเวอร์ stdio | สร้างเซิร์ฟเวอร์โดยใช้การส่งข้อมูลผ่าน stdio | [คู่มือ](./03-GettingStarted/05-stdio-server/README.md) |
| 3.6 | HTTP Streaming | การใช้งาน HTTP streaming ใน MCP | [คู่มือ](./03-GettingStarted/06-http-streaming/README.md) |
| 3.7 | Microsoft Foundry Toolkit | ใช้ Microsoft Foundry Toolkit กับ MCP | [คู่มือ](./03-GettingStarted/07-aitk/README.md) |
| 3.8 | การทดสอบ | ทดสอบการใช้งานเซิร์ฟเวอร์ MCP ของคุณ | [คู่มือ](./03-GettingStarted/08-testing/README.md) |
| 3.9 | การปรับใช้ | ปรับใช้เซิร์ฟเวอร์ MCP สู่การผลิต | [คู่มือ](./03-GettingStarted/09-deployment/README.md) |
| 3.10 | การใช้งานเซิร์ฟเวอร์ขั้นสูง | ใช้เซิร์ฟเวอร์ขั้นสูงสำหรับการใช้งานฟีเจอร์และสถาปัตยกรรมที่ดีขึ้น | [คู่มือ](./03-GettingStarted/10-advanced/README.md) |
| 3.11 | การยืนยันตัวตนแบบง่าย | บทที่แสดงการยืนยันตัวตนตั้งแต่เริ่มต้นและ RBAC | [คู่มือ](./03-GettingStarted/11-simple-auth/README.md) |
| 3.12 | โฮสต์ MCP | ตั้งค่า Claude Desktop, Cursor, Cline และโฮสต์ MCP อื่น ๆ | [คู่มือ](./03-GettingStarted/12-mcp-hosts/README.md) |
| 3.13 | MCP Inspector | ดีบักและทดสอบเซิร์ฟเวอร์ MCP ด้วยเครื่องมือ Inspector | [คู่มือ](./03-GettingStarted/13-mcp-inspector/README.md) |
| 3.14 | การสุ่มตัวอย่าง | ใช้การสุ่มตัวอย่างเพื่อทำงานร่วมกับไคลเอนต์ | [คู่มือ](./03-GettingStarted/14-sampling/README.md) |
| 3.15 | แอป MCP | สร้างแอป MCP | [คู่มือ](./03-GettingStarted/15-mcp-apps/README.md) |
| **โมดูล 4-5: การใช้งานและขั้นสูง** | | | |
| 04 | การใช้งานในทางปฏิบัติ | SDK, การดีบัก, การทดสอบ, เทมเพลตคิวพรอมต์ซ้ำได้ | [อ่านเพิ่มเติม](./04-PracticalImplementation/README.md) |
| 4.1 | การแบ่งหน้า | จัดการชุดผลลัพธ์ขนาดใหญ่ด้วยการแบ่งหน้าด้วยเคอร์เซอร์ | [คู่มือ](./04-PracticalImplementation/pagination/README.md) |
| 05 | หัวข้อขั้นสูงใน MCP | AI หลายโหมด, การขยายตัว, การใช้งานในองค์กร | [อ่านเพิ่มเติม](./05-AdvancedTopics/README.md) |
| 5.1 | การผสานรวม Azure | การรวม MCP กับ Azure | [คู่มือ](./05-AdvancedTopics/mcp-integration/README.md) |
| 5.2 | หลายโหมด | การทำงานกับหลายโมดัลลิตี้ | [คู่มือ](./05-AdvancedTopics/mcp-multi-modality/README.md) |
| 5.3 | ตัวอย่าง OAuth2 | การใช้งานการยืนยันตัวตน OAuth2 | [คู่มือ](./05-AdvancedTopics/mcp-oauth2-demo/README.md) |
| 5.4 | บริบทรากฐาน | เข้าใจและใช้งานบริบทรากฐาน | [คู่มือ](./05-AdvancedTopics/mcp-root-contexts/README.md) |
| 5.5 | การจัดเส้นทาง | กลยุทธ์การจัดเส้นทางใน MCP | [คู่มือ](./05-AdvancedTopics/mcp-routing/README.md) |
| 5.6 | การสุ่มตัวอย่าง | เทคนิคการสุ่มตัวอย่างใน MCP | [คู่มือ](./05-AdvancedTopics/mcp-sampling/README.md) |
| 5.7 | การขยายตัว | การขยายการใช้งาน MCP | [คู่มือ](./05-AdvancedTopics/mcp-scaling/README.md) |
| 5.8 | ความปลอดภัย | การพิจารณาด้านความปลอดภัยขั้นสูง | [คู่มือ](./05-AdvancedTopics/mcp-security/README.md) |
| 5.9 | การค้นหาเว็บ | การใช้งานความสามารถค้นหาเว็บ | [คู่มือ](./05-AdvancedTopics/web-search-mcp/README.md) |
| 5.10 | การสตรีมแบบเรียลไทม์ | สร้างฟังก์ชันการสตรีมแบบเรียลไทม์ | [คู่มือ](./05-AdvancedTopics/mcp-realtimestreaming/README.md) |
| 5.11 | การค้นหาแบบเรียลไทม์ | การใช้งานการค้นหาแบบเรียลไทม์ | [คู่มือ](./05-AdvancedTopics/mcp-realtimesearch/README.md) |
| 5.12 | การยืนยันตัวตน Entra ID | การยืนยันตัวตนด้วย Microsoft Entra ID | [คู่มือ](./05-AdvancedTopics/mcp-security-entra/README.md) |
| 5.13 | การผสานรวม Foundry | รวมกับ Microsoft Foundry | [คู่มือ](./05-AdvancedTopics/mcp-foundry-agent-integration/README.md) |
| 5.14 | วิศวกรรมบริบท | เทคนิคการสร้างบริบทอย่างมีประสิทธิภาพ | [คู่มือ](./05-AdvancedTopics/mcp-contextengineering/README.md) |
| 5.15 | การขนส่งแบบกำหนดเองของ MCP | การใช้งานการขนส่งที่กำหนดเอง | [คู่มือ](./05-AdvancedTopics/mcp-transport/README.md) |
| 5.16 | ฟีเจอร์โปรโตคอล | การแจ้งความคืบหน้า, การยกเลิก, เทมเพลตทรัพยากร | [คู่มือ](./05-AdvancedTopics/mcp-protocol-features/README.md) |
| 5.17 | การวางแผนแบบโต้ตอบของตัวแทนหลายตัว | ตัวแทนสองฝ่ายโต้แย้งในมุมตรงข้ามโดยใช้เครื่องมือ MCP ร่วมกัน โดยมีตัวแทนผู้ตัดสินประเมิน | [คู่มือ](./05-AdvancedTopics/mcp-adversarial-agents/README.md) |
| **โมดูล 6-10: ชุมชนและแนวปฏิบัติที่ดีที่สุด** | | | |
| 06 | การมีส่วนร่วมของชุมชน | วิธีการมีส่วนร่วมในระบบนิเวศ MCP | [คู่มือ](./06-CommunityContributions/README.md) |
| 07 | บทเรียนจากการนำไปใช้แรกเริ่ม | เรื่องราวการใช้งานจริงในโลกจริง | [คู่มือ](./07-LessonsfromEarlyAdoption/README.md) |
| 08 | แนวปฏิบัติที่ดีที่สุดสำหรับ MCP | ประสิทธิภาพ, ความทนทานต่อความผิดพลาด, ความยืดหยุ่น | [คู่มือ](./08-BestPractices/README.md) |
| 09 | กรณีศึกษาของ MCP | ตัวอย่างการใช้งานจริง | [คู่มือ](./09-CaseStudy/README.md) |
| 10 | การประชุมเชิงปฏิบัติการ | การสร้างเซิร์ฟเวอร์ MCP ด้วย Microsoft Foundry Toolkit | [ห้องปฏิบัติการ](./10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) |
| **โมดูล 11: ห้องปฏิบัติการจริงของเซิร์ฟเวอร์ MCP** | | | |
| 11 | การผสานฐานข้อมูลของเซิร์ฟเวอร์ MCP | เส้นทางการเรียนรู้แบบฝึกหัดเชิงปฏิบัติ 13 ห้องสำหรับการผสานกับ PostgreSQL | [ห้องปฏิบัติการ](./11-MCPServerHandsOnLabs/README.md) |
| 11.1 | แนะนำ | ภาพรวมของ MCP พร้อมการผสานฐานข้อมูลและกรณีใช้งานวิเคราะห์ค้าปลีก | [ห้องปฏิบัติการ 00](./11-MCPServerHandsOnLabs/00-Introduction/README.md) |
| 11.2 | สถาปัตยกรรมหลัก | การเข้าใจสถาปัตยกรรมเซิร์ฟเวอร์ MCP ชั้นฐานข้อมูล และรูปแบบความปลอดภัย | [ห้องปฏิบัติการ 01](./11-MCPServerHandsOnLabs/01-Architecture/README.md) |
| 11.3 | ความปลอดภัย & การใช้งานแบ่งหลายผู้เช่า | ความปลอดภัยระดับแถว, การยืนยันตัวตน และการเข้าถึงข้อมูลหลายผู้เช่า | [ห้องปฏิบัติการ 02](./11-MCPServerHandsOnLabs/02-Security/README.md) |
| 11.4 | การตั้งค่าสภาพแวดล้อม | การตั้งค่าสภาพแวดล้อมการพัฒนา, Docker, ทรัพยากร Azure | [ห้องปฏิบัติการ 03](./11-MCPServerHandsOnLabs/03-Setup/README.md) |
| 11.5 | การออกแบบฐานข้อมูล | การตั้งค่า PostgreSQL, การออกแบบโครงร่างค้าปลีก, และข้อมูลตัวอย่าง | [ห้องปฏิบัติการ 04](./11-MCPServerHandsOnLabs/04-Database/README.md) |
| 11.6 | การใช้งานเซิร์ฟเวอร์ MCP | สร้างเซิร์ฟเวอร์ FastMCP พร้อมการผสานฐานข้อมูล | [ห้องปฏิบัติการ 05](./11-MCPServerHandsOnLabs/05-MCP-Server/README.md) |
| 11.7 | การพัฒนาเครื่องมือ | สร้างเครื่องมือค้นหาฐานข้อมูลและตรวจสอบโครงร่าง | [ห้องปฏิบัติการ 06](./11-MCPServerHandsOnLabs/06-Tools/README.md) |
| 11.8 | การค้นหาเชิงความหมาย | การใช้งานเวกเตอร์ฝังตัวด้วย Azure OpenAI และ pgvector | [ห้องปฏิบัติการ 07](./11-MCPServerHandsOnLabs/07-Semantic-Search/README.md) |
| 11.9 | การทดสอบ & การดีบัก | กลยุทธ์การทดสอบ, เครื่องมือดีบัก, และวิธีการตรวจสอบ | [ห้องปฏิบัติการ 08](./11-MCPServerHandsOnLabs/08-Testing/README.md) |
| 11.10 | การผสานรวม VS Code | การตั้งค่าการผสานรวม MCP ใน VS Code และการใช้งาน AI Chat | [ห้องปฏิบัติการ 09](./11-MCPServerHandsOnLabs/09-VS-Code/README.md) |
| 11.11 | กลยุทธ์การปรับใช้ | การปรับใช้ด้วย Docker, Azure Container Apps, และการพิจารณาการขยายตัว | [ห้องปฏิบัติการ 10](./11-MCPServerHandsOnLabs/10-Deployment/README.md) |
| 11.12 | การตรวจสอบ | Application Insights, การบันทึก, การตรวจสอบประสิทธิภาพ | [ห้องปฏิบัติการ 11](./11-MCPServerHandsOnLabs/11-Monitoring/README.md) |
| 11.13 | แนวปฏิบัติที่ดีที่สุด | การปรับแต่งประสิทธิภาพ, การเสริมความปลอดภัย, และเคล็ดลับการผลิต | [ห้องปฏิบัติการ 12](./11-MCPServerHandsOnLabs/12-Best-Practices/README.md) |
| **โมดูล 12: เครื่องมือ MCP** | | | |
| 12.1 | เครื่องมือ | การใช้งาน MCP ในแอป Copilot | [ คู่มือ ](./12-tooling/README.md) |

### 💻 ตัวอย่างโปรเจกต์โค้ด

หนึ่งในส่วนที่น่าตื่นเต้นที่สุดของการเรียนรู้ MCP คือการได้เห็นทักษะการเขียนโค้ดของคุณพัฒนาไปอย่างต่อเนื่อง เราออกแบบตัวอย่างโค้ดของเราให้เริ่มจากง่ายไปซับซ้อนขึ้นตามความเข้าใจของคุณ ยกตัวอย่างวิธีการแนะนำแนวคิด - ด้วยโค้ดที่เข้าใจง่ายแต่แสดงหลักการ MCP จริงๆ คุณจะเข้าใจไม่เพียงแค่โค้ดนี้ทำงานอย่างไร แต่ทำไมมันถึงถูกออกแบบบนโครงสร้างนี้และมันเข้ากับแอปพลิเคชัน MCP ใหญ่ๆ อย่างไร

#### ตัวอย่างเครื่องคิดเลข MCP เบื้องต้น

| ภาษา | รายละเอียด | ลิงก์ |
|----------|-------------|------|
| C# | ตัวอย่างเซิร์ฟเวอร์ MCP | [ดูโค้ด](./03-GettingStarted/samples/csharp/README.md) |
| Java | เครื่องคิดเลข MCP | [ดูโค้ด](./03-GettingStarted/samples/java/calculator/README.md) |

| JavaScript | ตัวอย่าง MCP | [ดูโค้ด](./03-GettingStarted/samples/javascript/README.md) |
| Python | MCP Server | [ดูโค้ด](../../03-GettingStarted/samples/python/mcp_calculator_server.py) |
| TypeScript | ตัวอย่าง MCP | [ดูโค้ด](./03-GettingStarted/samples/typescript/README.md) |
| Rust | ตัวอย่าง MCP | [ดูโค้ด](./03-GettingStarted/samples/rust/README.md) |

#### ตัวอย่างประยุกต์ MCP ขั้นสูง

| ภาษา | คำอธิบาย | ลิงก์ |
|----------|-------------|------|
| C# | ตัวอย่างขั้นสูง | [ดูโค้ด](./04-PracticalImplementation/samples/csharp/README.md) |
| Java with Spring | ตัวอย่างแอปคอนเทนเนอร์ | [ดูโค้ด](./04-PracticalImplementation/samples/java/containerapp/README.md) |
| JavaScript | ตัวอย่างขั้นสูง | [ดูโค้ด](./04-PracticalImplementation/samples/javascript/README.md) |
| Python | การประยุกต์ซับซ้อน | [ดูโค้ด](./04-PracticalImplementation/samples/python/README.md) |
| TypeScript | ตัวอย่างคอนเทนเนอร์ | [ดูโค้ด](./04-PracticalImplementation/samples/typescript/README.md) |


## 🎯 ความรู้พื้นฐานสำหรับการเรียน MCP

เพื่อให้ได้รับประโยชน์สูงสุดจากหลักสูตรนี้ คุณควรมี:

- ความรู้พื้นฐานในการเขียนโปรแกรมอย่างน้อยหนึ่งภาษาต่อไปนี้: C#, Java, JavaScript, Python หรือ TypeScript
- ความเข้าใจในโมเดลไคลเอนต์-เซิร์ฟเวอร์และ API
- คุ้นเคยกับแนวคิด REST และ HTTP
- (ถ้ามี) ความรู้พื้นฐานด้าน AI/ML

- เข้าร่วมการสนทนาในชุมชนของเราเพื่อรับการสนับสนุน

## 📚 คู่มือการศึกษาและแหล่งข้อมูล

ที่เก็บนี้มีแหล่งข้อมูลหลายอย่างเพื่อช่วยให้คุณสามารถเรียนรู้อย่างมีประสิทธิภาพ:

### คู่มือการศึกษา

มี [คู่มือการศึกษา](./study_guide.md) ที่ครอบคลุมเพื่อช่วยให้คุณใช้งานที่เก็บนี้ได้อย่างมีประสิทธิภาพ แผนที่หลักสูตรแบบภาพนี้แสดงให้เห็นว่าส่วนต่าง ๆ เชื่อมโยงกันอย่างไร และให้คำแนะนำเกี่ยวกับการใช้ตัวอย่างโปรเจกต์อย่างถูกต้อง เหมาะสำหรับผู้เรียนที่ชอบเห็นภาพรวมใหญ่

คู่มือรวมถึง:
- แผนที่หลักสูตรแบบภาพที่แสดงทุกหัวข้อที่ครอบคลุม
- การแยกย่อยรายละเอียดของแต่ละส่วนในที่เก็บนี้
- คำแนะนำในการใช้ตัวอย่างโปรเจกต์
- เส้นทางการเรียนรู้ที่แนะนำสำหรับระดับทักษะต่าง ๆ
- แหล่งข้อมูลเพิ่มเติมเพื่อเสริมการเรียนรู้ของคุณ

### ประวัติการเปลี่ยนแปลง

เรารักษา [ประวัติการเปลี่ยนแปลง](./changelog.md) ที่ละเอียด ซึ่งติดตามการอัปเดตสำคัญ ๆ ทั้งหมดของวัสดุหลักสูตร เพื่อให้คุณสามารถติดตามการปรับปรุงและการเพิ่มเติมล่าสุดได้อย่างต่อเนื่อง
- เพิ่มเนื้อหาใหม่
- การเปลี่ยนแปลงโครงสร้าง
- ปรับปรุงคุณสมบัติ
- ปรับปรุงเอกสาร

## 🛠️ วิธีใช้หลักสูตรนี้อย่างมีประสิทธิภาพ

แต่ละบทเรียนในคู่มือนี้รวมถึง:

1. คำอธิบายแนวคิด MCP อย่างชัดเจน  
2. ตัวอย่างโค้ดแบบสดในหลายภาษา  
3. แบบฝึกหัดเพื่อสร้างแอป MCP จริง  
4. แหล่งข้อมูลเพิ่มเติมสำหรับผู้เรียนขั้นสูง

### มาเรียนรู้ MCP กับ C# - ซีรีส์สอน
มาทำความรู้จักกับ Model Context Protocol (MCP) ซึ่งเป็นกรอบงานล้ำสมัยที่ออกแบบมาเพื่อมาตรฐานการสื่อสารระหว่างโมเดล AI และแอปพลิเคชันไคลเอนต์ ผ่านเซสชันสำหรับผู้เริ่มต้นนี้ เราจะแนะนำคุณเกี่ยวกับ MCP และนำทางคุณผ่านการสร้างเซิร์ฟเวอร์ MCP แรกของคุณ
#### C#: [https://aka.ms/letslearnmcp-csharp](https://aka.ms/letslearnmcp-csharp)
#### Java: [https://aka.ms/letslearnmcp-java](https://aka.ms/letslearnmcp-java)
#### JavaScript: [https://aka.ms/letslearnmcp-javascript](https://aka.ms/letslearnmcp-javascript)
#### Python: [https://aka.ms/letslearnmcp-python](https://aka.ms/letslearnmcp-python)

## 🎓 การเดินทางในการเรียน MCP ของคุณเริ่มต้นแล้ว

ขอแสดงความยินดี! คุณได้ก้าวแรกในเส้นทางที่น่าตื่นเต้นที่จะขยายความสามารถด้านโปรแกรมมิ่งของคุณและเชื่อมต่อคุณกับแนวหน้าของการพัฒนา AI

### สิ่งที่คุณทำได้แล้ว

โดยการอ่านบทนำนี้ คุณได้เริ่มสร้างฐานความรู้ MCP ของคุณแล้ว คุณเข้าใจว่า MCP คืออะไร ทำไมจึงสำคัญ และหลักสูตรนี้จะสนับสนุนการเรียนรู้ของคุณอย่างไร นั่นคือความสำเร็จอย่างมากและเป็นจุดเริ่มต้นของความเชี่ยวชาญในเทคโนโลยีที่สำคัญนี้

### การผจญภัยที่รออยู่ข้างหน้า

ขณะที่คุณก้าวหน้าไปในแต่ละโมดูล จำไว้ว่า ทุกผู้เชี่ยวชาญเคยเป็นมือใหม่ แนวคิดที่ดูซับซ้อนในตอนนี้จะกลายเป็นเรื่องธรรมดาเมื่อคุณฝึกฝนและนำไปใช้ ทุกก้าวเล็ก ๆ จะสร้างความสามารถที่ทรงพลังที่จะช่วยคุณตลอดสายอาชีพการพัฒนาของคุณ

### เครือข่ายสนับสนุนของคุณ

คุณกำลังเข้าร่วมชุมชนของผู้เรียนและผู้เชี่ยวชาญที่มีความกระตือรือร้นกับ MCP และพร้อมช่วยเหลือผู้อื่นให้ประสบความสำเร็จ ไม่ว่าคุณจะติดขัดในการแก้ปริศนาโค้ดหรืออยากแบ่งปันความก้าวหน้า ชุมชนอยู่ที่นี่เพื่อสนับสนุนการเดินทางของคุณ

หากคุณติดขัดหรือมีคำถามเกี่ยวกับการสร้างแอป AI ร่วมสนทนากับผู้เรียนและนักพัฒนาประสบการณ์สูงคนอื่น ๆ เกี่ยวกับ MCP นี่คือชุมชนที่สนับสนุนซึ่งเปิดรับคำถามและแบ่งปันความรู้กันอย่างเสรี

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)

หากคุณมีข้อเสนอแนะเกี่ยวกับผลิตภัณฑ์หรือพบข้อผิดพลาดขณะพัฒนาโปรดเยี่ยมชม:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Microsoft_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

### พร้อมเริ่มกันหรือยัง?

การผจญภัยกับ MCP ของคุณเริ่มตอนนี้! เริ่มด้วยโมดูล 0 เพื่อดำดิ่งสู่ประสบการณ์ MCP แรกของคุณ หรือสำรวจตัวอย่างโปรเจกต์เพื่อดูสิ่งที่คุณจะได้สร้าง จำไว้ว่า - ทุกผู้เชี่ยวชาญเริ่มจากจุดเดียวกับคุณ และด้วยความอดทนและการฝึกฝน คุณจะประหลาดใจกับสิ่งที่คุณสามารถทำได้

ยินดีต้อนรับสู่โลกของการพัฒนา Model Context Protocol มาสร้างสิ่งที่น่าทึ่งไปด้วยกัน!

## 🤝 การมีส่วนร่วมในชุมชนการเรียนรู้

หลักสูตรนี้จะเข้มแข็งขึ้นด้วยการมีส่วนร่วมจากผู้เรียนอย่างคุณ! ไม่ว่าคุณจะแก้ไขคำผิด เสนอคำอธิบายที่ชัดเจนขึ้น หรือเพิ่มตัวอย่างใหม่ การมีส่วนร่วมของคุณจะช่วยให้ผู้เริ่มต้นอื่น ๆ ประสบความสำเร็จ

ขอบคุณ Microsoft Valued Professional [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) สำหรับการมีส่วนร่วมตัวอย่างโค้ด

กระบวนการมีส่วนร่วมถูกออกแบบให้เป็นมิตรและสนับสนุน การมีส่วนร่วมส่วนใหญ่ต้องมี Contributor License Agreement (CLA) แต่เครื่องมืออัตโนมัติจะนำทางคุณในกระบวนการได้อย่างราบรื่น

## 📜 การเรียนรู้แบบโอเพ่นซอร์ส

หลักสูตรทั้งหมดนี้มีให้ภายใต้ MIT [LICENSE](../../LICENSE) หมายความว่าคุณสามารถใช้ แก้ไข และแชร์ได้อย่างอิสระ นี่สนับสนุนภารกิจของเราในการทำให้ความรู้ MCP เข้าถึงได้สำหรับนักพัฒนาทุกคน
## 🤝 แนวทางการมีส่วนร่วม

โปรเจกต์นี้ยินดีรับการมีส่วนร่วมและข้อเสนอแนะ ส่วนใหญ่การมีส่วนร่วมจะต้องให้คุณยอมรับข้อกำหนด
Contributor License Agreement (CLA) ที่ระบุว่าคุณมีสิทธิและได้มอบสิทธิ์แก่เรา
ในการใช้ผลงานของคุณ สำหรับรายละเอียด โปรดดูที่ <https://cla.opensource.microsoft.com>

เมื่อคุณส่ง pull request บ็อต CLA จะตรวจสอบโดยอัตโนมัติว่าคุณต้องการส่ง
CLA หรือไม่ และตกแต่ง PR อย่างเหมาะสม (เช่น การตรวจสอบสถานะ คอมเมนต์) เพียงทำตามคำแนะนำ
ที่บ็อตให้ คุณจะต้องทำขั้นตอนนี้เพียงครั้งเดียวสำหรับที่เก็บทั้งหมดที่ใช้ CLA ของเรา

โปรเจกต์นี้ได้นำ [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) มาใช้
สำหรับข้อมูลเพิ่มเติมดูที่ [คำถามที่พบบ่อยเกี่ยวกับ Code of Conduct](https://opensource.microsoft.com/codeofconduct/faq/) หรือ
ติดต่อ [opencode@microsoft.com](mailto:opencode@microsoft.com) หากมีคำถามหรือข้อแนะนำเพิ่มเติม

---

*พร้อมเริ่มการเดินทางกับ MCP แล้วหรือยัง? เริ่มด้วย [โมดูล 00 - แนะนำ MCP](./00-Introduction/README.md) และก้าวเข้าสู่โลกของการพัฒนา Model Context Protocol!*



## 🎒 หลักสูตรอื่น ๆ
ทีมงานของเรามีหลักสูตรอื่น ๆ ด้วย! ดูได้ที่:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### LangChain
[![LangChain4j for Beginners](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js for Beginners](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain for Beginners](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### Azure / Edge / MCP / Agents
[![AZD for Beginners](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Edge AI for Beginners](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP for Beginners](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![AI Agents for Beginners](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### ชุดซีรีส์ AI สร้างสรรค์
[![Generative AI for Beginners](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Generative AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![Generative AI (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![Generative AI (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### การเรียนรู้แกนกลาง
[![ML for Beginners](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![Data Science for Beginners](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI for Beginners](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![Cybersecurity for Beginners](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)

[![Web Dev for Beginners](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![IoT for Beginners](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![XR Development for Beginners](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### ชุดบทเรียน Copilot
[![Copilot for AI Paired Programming](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![Copilot for C#/.NET](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![Copilot Adventure](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->