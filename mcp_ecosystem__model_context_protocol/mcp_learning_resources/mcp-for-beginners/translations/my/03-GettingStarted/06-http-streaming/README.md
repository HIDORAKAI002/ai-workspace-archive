# Model Context Protocol (MCP) နှင့် HTTPS Streaming

ဤမူဝါဒတွင် HTTPS ကို အသုံးပြု၍ Model Context Protocol (MCP) ဖြင့် လုံခြုံပြီး၊ အတိုင်းအတာရှည်ရှိသော၊ real-time streaming ကို ပြုလုပ်နည်း စနစ်တကျ လမ်းညွှန်ချက် ပေးထားသည်။ Streaming ရဲ့ အကြောင်းရင်း၊ ရရှိနိုင်သော ယာဉ်ပို့မည့်နည်းလမ်းများ၊ MCP တွင် streamable HTTP ကို မည်သို့ အကောင်အထည်ဖော်မည်၊ လုံခြုံရေး အကောင်းဆုံးလေ့လာမှုပုံသိမ်းချက်များ၊ SSE မှ ပြောင်းရွှေ့ခြင်းနှင့် သင်၏ မိမိရဲ့ streaming MCP အက်ပ်များ ဆောက်လုပ်ရန် လက်တွေ့ လမ်းညွှန်ချက်များ ပါဝင်သည်။

## MCP တွင် ယာဉ်ပို့ခြင်းနည်းလမ်းများနှင့် Streaming

ဤအပိုင်းတွင် MCP တွင် ရရှိနိုင်သော မတူညီသော ယာဉ်ပို့ခြင်းနည်းလမ်းများနှင့် client နှင့် server အကြား real-time ကွန်ယက်ဆက်သွယ်မှု ထောက်ပံ့ရန် streaming အား အခန်းကဏ္ဍအဖြစ် ယေဘုယျအချက်များကို လေ့လာသည်။

### ယာဉ်ပို့ခြင်းနည်းလမ်း ဆိုသည်မှာ?

ယာဉ်ပို့ခြင်းနည်းလမ်း ဆိုသည်မှာ client နှင့် server အကြား ဒေတာ အပြန်အလှန် လွှဲပြောင်းမှု ဘယ်လို ဖြစ်ပွားမည်ကို ဖေါ်ပြသည်။ MCP သည် ကွဲပြားသော ပတ်ဝန်းကျင်များနှင့် လိုအပ်ချက်များကို အထောက်အပံ့ပေးရန် မတူညီသော ယာဉ်ပို့ခြင်းအမျိုးအစားများကို ထောက်ခံသည်-

- **stdio**: Standard input/output၊ ဒေသတွင်းနှင့် CLI အခြေပြု ကိရိယာများအတွက် သင့်တော်သည်။ ရိုးရှင်းပြီး web သို့ cloud များအတွက် သင့်တော်မှု မရှိ။
- **SSE (Server-Sent Events)**: Server များမှ HTTP ဖောက်သည်အတွက် real-time အချက်အလက်များကို ထပ်တိုးပေးသည်။ web UI များအတွက် ကောင်းပြီး scalability နှင့် flexibility တွင် ကန့်သတ်ချက်ရှိသည်။ MCP Specification 2025-06-18 အရ standalone SSE (Server-Sent Events) transport ကို ပယ်ဖျက်ပြီး "Streamable HTTP" transport ဖြင့် အစားထိုးထားသည်။
- **Streamable HTTP**: ခေတ်မှီ HTTP အခြေစိုက် streaming transport ဖြစ်ပြီး အကြောင်းကြားမှု နှင့် ပိုမိုတိုးတက်သော scalability ကို ထောက်ခံသည်။ ပိုမိုတိုးတက်သော ထုတ်လုပ်မှုနှင့် cloud ပတ်ဝန်းကျင်များအတွက် အကြံပြုသည်။

### နှိုင်းယှဉ်စာရင်း အလာ

သူတို့ ယာဉ်ပို့သူစနစ်များအကြား ကြားခြားချက်များကို နားလည်ရန် အောက်ပါ စာရင်းကို ကြည့်ပါ-

| ယာဉ်ပို့ခြင်း      | Real-time အချက်ပြုမှု | Streaming | စိတ်ခံစားမှုများ | အသုံးပြုမှု              |
|---------------------|------------------------|-----------|-----------------|-------------------------|
| stdio               | မဟုတ်ပါ               | မဟုတ်ပါ  | နည်းပါး         | ဒေသခံ CLI ကိရိယာများ   |
| SSE                 | ဟုတ်ပါ                 | ဟုတ်ပါ    | အလယ်အလတ်       | web၊ real-time အချက်ပြုမှု |
| Streamable HTTP     | ဟုတ်ပါ                 | ဟုတ်ပါ    | မြင့်မား         | cloud၊ multi-client     |

> **အကြံပြုချက်:** သင့်လျော်သော ယာဉ်ပို့ခြင်းကို ရွေးချယ်ခြင်းဖြင့် လုပ်ဆောင်ရမှုပမာဏ၊ စိတ်ခံစားမှုနှင့် အသုံးပြုသူ အတွေ့အကြုံ တိုးတက်စေသည်။ **Streamable HTTP** ကို ခေတ်မှီ၊ စိတ်တော်ပြည့် စနစ်များနှင့် cloud အသုံးပြုမှုများအတွက် အကြံပြုသည်။

ဒါ့အပြင် ယာဉ်ပို့မှုများ stdio နှင့် SSE များကို ယခင်ပိုင်း ကဏ္ဍများတွင်မြင်ဖူးပြီး မော်ကွန်း HTTP သည် ဤအခန်းတွင်ဖော်ပြထားသည်။

## Streaming: မှတ်ယူချက်များနှင့် အကြောင်းရင်း

Streaming ၏ အခြေခံ မှတ်ယူချက်များနှင့် အကြောင်းရင်းများကို နားလည်ခြင်းသည် အချိန်နောက်ခံ real-time ဆက်သွယ်ရေးစနစ်များကို ထိရောက်စွာ တည်ဆောက်ရာတွင် အဓိကဖြစ်သည်။

**Streaming** ဆိုသည်မှာ network programming တွင် တစ်နည်းအားဖြင့် ဒေတာကို အားလုံး ပြီးစီးရန်စာ မစောင့်ဘဲ နှုတ်ယူလွယ်ကူသော အပိုင်းအစအဖြစ် သို့မဟုတ် ဖြစ်သည့် အဖြစ်များစဉ်လိုက် ချိန်ခွင်လန်းစွာ ပို့ပေးလက်ခံခိုင်းခြင်းနည်းဖြစ်သည်။ ဒါဟာ အသုံးဝင်သည့်အခါများမှာ-

- ဖိုင်များသို့မဟုတ် ဒေတာတစ်စုကြီးများ။
- real-time အချက်ပြုမှုများ (ဥပမာ၊ chat၊ progress bar)။
- အသုံးပြုသူကို ဆက်လက်သိအောင် ရှုမြင်နိုင်သည့် ကြာရှည်တည်ဆောက်မှုများ။

Streaming အကြောင်းအရာအထူးသဖြင့်-

- ဒေတာကို တင်ပို့မှုသည် တစိတ်တပိုင်းစီ ဖြန့်ချိသည်၊ တပြိုင်တည်းအားလုံး မပေးပါ။
- client သည် ဒေတာ လက်ခံရရှိသလို ပြုလုပ်နိုင်ပါသည်။
- ကြာမြင့်သည့် အချိန်ကြာမှု ထင်မိမှု လျော့နည်းကာ အသုံးပြုသူ အတွေ့အကြုံ တိုးတက်စေသည်။

### Streaming ကို မည်သို့သုံးသင့်သနည်း?

Streaming ကို အသုံးပြုရခြင်း အကြောင်းအရင်းများမှာ-

- အသုံးပြုသူ လျင်မြန်သော ပြန်လည်တုံ့ပြန်မှု ရရှိသည်၊ မပြီးဆုံးမှန်း မစောင့်ဆိုင်းရ။
- real-time အက်ပ်များ သို့မဟုတ် တုံ့ပြန်မှုရှိသော UI များ တည်ဆောက်ရန်။
- ကွန်ယက်နှင့် ကွန်ပျူတာ အရင်းအမြစ်များကို ထိရောက်စွာ အသုံးပြုခြင်း။

### ဥပမာရိုးရိုး: HTTP Streaming Server & Client

Streaming ကို ပြုလုပ်သည့် နည်းလမ်း တစ်ခု လက်တွေ့ဖော်ပြထားသည်-

#### Python

**Server (Python, FastAPI နှင့် StreamingResponse အသုံးပြုမှု):**

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time

app = FastAPI()

async def event_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)

@app.get("/stream")
def stream():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```
  
**Client (Python, requests အသုံးပြုမှု):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```
  
ဤဥပမာတွင် server သည် တစ်စိတ်တစ်ပိုင်း မက်ဆေ့ကို client ထံ ပေးပို့သည်၊ အားလုံး ပြီးကြောင်း မစောင့်ဘဲ။

**အစီအစဉ်သည်အလုပ်လုပ်ပုံ:**

- Server သည် မက်ဆေ့အသီးသီးကို ရရှိသလို ပေးပို့သည်။
- Client သည် ရောက်ရှိသည့် ဒေတာများကို လက်ခံပြီး ထုတ်ပြသည်။

**လိုအပ်ချက်များ:**

- Server သည် streaming response အသုံးပြုရမည် (ဥပမာ `StreamingResponse` in FastAPI)။
- Client သည် response ကို stream အဖြစ် မှတ်ယူရမည် (`stream=True` in requests)။
- Content-Type သည် ပုံမှန်အားဖြင့် `text/event-stream` သို့မဟုတ် `application/octet-stream` ဖြစ်သည်။

#### Java

**Server (Java, Spring Boot နှင့် Server-Sent Events ကို အသုံးပြုမှု):**

```java
@RestController
public class CalculatorController {

    @GetMapping(value = "/calculate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> calculate(@RequestParam double a,
                                                   @RequestParam double b,
                                                   @RequestParam String op) {
        
        double result;
        switch (op) {
            case "add": result = a + b; break;
            case "sub": result = a - b; break;
            case "mul": result = a * b; break;
            case "div": result = b != 0 ? a / b : Double.NaN; break;
            default: result = Double.NaN;
        }

        return Flux.<ServerSentEvent<String>>just(
                    ServerSentEvent.<String>builder()
                        .event("info")
                        .data("Calculating: " + a + " " + op + " " + b)
                        .build(),
                    ServerSentEvent.<String>builder()
                        .event("result")
                        .data(String.valueOf(result))
                        .build()
                )
                .delayElements(Duration.ofSeconds(1));
    }
}
```
  
**Client (Java, Spring WebFlux WebClient အသုံးပြုမှု):**

```java
@SpringBootApplication
public class CalculatorClientApplication implements CommandLineRunner {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:8080")
            .build();

    @Override
    public void run(String... args) {
        client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/calculate")
                        .queryParam("a", 7)
                        .queryParam("b", 5)
                        .queryParam("op", "mul")
                        .build())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(System.out::println)
                .blockLast();
    }
}
```
  
**Java Implementation မှတ်စုများ:**

- Spring Boot ၏ reactive stack ကို `Flux` ဖြင့် streaming အသုံးပြု
- `ServerSentEvent` သည် အဖြစ်အပျက် အမျိုးအစား ဖြင့် ဖွဲ့စည်းထားသော event streaming ပေးသည်
- `WebClient` ၏ `bodyToFlux()` နှင့် reactive streaming ကောက်ယူမှု
- `delayElements()` စနစ်ဖြင့် အဖြစ်အပျက်များ အကြား အချိန်နှောင့်နှေးမှုကို လှုံ့ဆော်မှု
- event များ အမျိုးအစား (`info`, `result`) ပါဝင်၍ client ကို ကောင်းမွန်စွာ အမြင်ပေး

### နှိုင်းယှဉ်ခြင်း: Classic Streaming နှင့် MCP Streaming

Streaming ရဲ့ "ရိုးရာ" နည်းပညာ နှင့် MCP အတွင်း streaming ၏ ကွဲပြားချက်များကို အောက်ပါ ဂဏန်းဇယားကဲ့သို့ ဖော်ပြနိုင်သည်-

| အင်္ဂါရပ်                 | Classic HTTP Streaming          | MCP Streaming (Notification)           |
|---------------------------|--------------------------------|----------------------------------------|
| အဓိက ရလဒ်              | အစိတ်အပိုင်းဖြင့် ပို့           | တစ်ခုတည်း၊ နောက်ဆုံးတွင်ပေး             |
| ကြေညာချက်များ            | ဒေတာ ချပ်အဖြစ် ပေးပို့          | အကြောင်းကြားမှု အနေဖြင့် ပေးပို့           |
| Client လိုအပ်ချက်များ    | stream ကို ပြုလုပ်နိုင်ရန်လိုအပ် | စာတိုက် (message handler) လိုအပ်         |
| အသုံးပြုမှု               | ကြီးမားသော ဖိုင်များ၊ AI token stream | စတိတ်ပေါ်တင်မှု၊ မှတ်တမ်း၊ real-time တုံ့ပြန်မှု |

### တွေ့ရှိချက် အဓိက ကွဲပြားချက်များ

ထပ်တိုး အဓိက ကွဲပြားချက်များမှာ-

- **ဆက်သွယ်မှုပုံစံ:**
  - Classic HTTP streaming: မူလကျသော chunked transfer encoding ဖြင့် ဒေတာ ကို ခုတင်ပို့သည်
  - MCP streaming: JSON-RPC protocol ဖြင့် ဖွဲ့စည်းထားသော notification စနစ်ကို အသုံးပြုသည်

- **မက်ဆေ့ဖော်မတ်:**
  - Classic HTTP: ရိုးရှင်းသောစာသားချပ်များ newline ပါသည့်ပုံစံ
  - MCP: metadata ပါရှိသည့် LoggingMessageNotification ဖော်မတ်ဖြင့် ဖွဲ့စည်းသည်

- **Client အကောင်အထည်ဖော်မှု:**
  - Classic HTTP: streaming responses ကို ပြုလုပ်နိုင်သည့် ရိုးရှင်း client
  - MCP: မတူညီသော မက်ဆေ့ အမျိုးအစားများကို ဖတ်ရှုနိုင်ရန် message handler ပါရှိသော client

- **တိုးတက်မှု အချက်ပြမှုများ:**
  - Classic HTTP: အဓိက response stream အပိုင်းအဖြစ် ပေးပို့သည်
  - MCP: တိုးတက်မှုများကို သီးခြား notification မက်ဆေ့များဖြင့် ပေးပို့ပြီး အဓိက response ကို နောက်ဆုံးတွင် ပေးသည်

### အကြံပြုချက်များ

ရိုးရာ streaming (အထက်ပါ `/stream` endpoint ဖြင့် ဖော်ပြသည့်) နှင့် MCP streaming ပြုလုပ်မှုအကြား ရွေးချယ်ရာတွင် အချက်အလက်ဖြစ်နိုင်သည့် အကြံပြုချက်များ-

- **ရိုးရိုး streaming လိုအပ်ချက်များအတွက်:** Classic HTTP streaming သည် ပြုလုပ်ရလွယ်ကူပြီး စံစွမ်းမှုအတွက် အ suffisient ဖြစ်သည်။
- **ရှုပ်ထွေးပြီး အပြန်အလှန်ဆက်ဆံမှု ရှိသော အက်ပ်များအတွက်:** MCP streaming သည် ပိုမို ဖွဲ့စည်းထားသည့် metadata နှင့် notification နှင့် နောက်ဆုံးရလဒ် ခွဲခြားမှုကို ပေးသည်။
- **AI အက်ပ်များအတွက်:** MCP ၏ notification စနစ်သည် ကြာရှည် တည်ဆောက်သော AI အလုပ်ရုံများကို အသုံးပြုသူ သတင်းအချက်အလက် ပြုပြင်ပေးရာတွင် အထူးအသုံးဝင်သည်။

## MCP တွင် Streaming

အပေါ်ပါ နှိုင်းယှဉ်ချက်များနှင့် အကြံပြုချက်များကို ကြည့်ပြီးနောက် MCP တွင် streaming ကို တိတိကျကျ အကောင်အထည်ဖော်နည်းကို ဆွေးနွေးကြမည်။

MCP စနစ်အတွင်း streaming ၏ အလုပ်လုပ်ပုံကို နားလည်ခြင်းဖြင့် ကြာရှည်ပြေးကြာညီလှုပ်ရှားမှုများရေတွင် အသုံးပြုသူများအား real-time တုံ့ပြန်မှု ပေးသော အက်ပ်များကို တည်ဆောက်နိုင်သည်။

MCP တွင် streaming သည် အဓိက ပြန်လည်သွင်းကြားမှုကို ချပ်ချပ် မပို့ဘဲ ကိရိယာတစ်ခုတည်း တုံ့ပြန်မှု ဆောင်ရွက်နေစဉ် client ကို notification မက်ဆေ့များ ပို့ပေးခြင်း ဖြစ်သည်။ ထို notification များတွင် တိုးတက်မှု အချက်ပြမှုများ၊ မှတ်တမ်းများ သို့မဟုတ် အခြားဖြစ်စဉ်များ ပါဝင်နိုင်သည်။

### အလုပ်လုပ်ပုံ

အဓိက ရလဒ်ကို တစ်ခုတည်း ဖော်ပြသော်လည်း အလုပ်လုပ်စဉ်တွင် သီးခြား မက်ဆေ့များ အဖြစ် notification များ ပို့ပေးပြီး client ကို real time လူစီးမှုအသိပေးသည်။ client သည် ဤ notification များကို လက်ခံ ပြသနိုင်ရန် လိုအပ်သည်။

## Notification ဆိုသည်မှာ အဘယ်နည်း?

"Notification" ဟူ၍ ဆိုသည်မှာ MCP context တွင် ဘာအဓိပ္ပာယ်ရှိသနည်း?

Notification ဆိုသည်မှာ server မှ client သို့ ကြာရှည်ပြေးသော လုပ်ငန်းများအတွင်း တိုးတက်မှု၊ အခြေအနေ သို့မဟုတ် ဖြစ်စဉ်အခြားများကို အသိပေးရန် ပေးပို့သော မက်ဆေ့တစ်မျိုးဖြစ်သည်။ Notification များသည် သမားရိုးတမ်း transparency နှင့် အသုံးပြုသူအတွေ့အကြုံ တိုးတက်စေသည်။

ဥပမာအားဖြင့် client သည် server နှင့် အစောပိုင်း handshake ပြီးဆုံးသည်နှင့်တစ်ပြိုင်နက် notification တစ်ခု ပေးပို့ရန် အာမခံသည်။

Notification တစ်ခုသည် JSON မက်ဆေ့ပုံစံအဖြစ် အောက်ပါအတိုင်း ဖြစ်သည်-

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```
  
Notification များသည် MCP တွင် ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) ဟူသော ခေါင်းစဉ်၌ ပါဝင်သည်။

logging ကို အသုံးပြုရန် server သည် အောက်ပါအတိုင်း feature/capability အနေနဲ့ ဖွင့်ထားရမည်-

```json
{
  "capabilities": {
    "logging": {}
  }
}
```
  
> [!NOTE]  
> အသုံးပြုသော SDK အလိုက်, logging သည် ပုံမှန်အားဖြင့် ဖွင့်ပေးထားနိုင်ပြီး သင့် server စီစဉ်မှုတွင် တိတိကျကျ ဖွင့်ရန်လိုအပ်နိုင်သည်။

notification မျိုးအမျိုးအစား များမှာ-

| အဆင့် level | ဖော်ပြချက်                         | အသုံးပြုမှုဥပမာ                    |
|-------------|---------------------------------|-------------------------------------|
| debug       | အသေးစိတ် debug အချက်အလက်များ      | function ဝင်ထွက် အဆင့်များ            |
| info        | အထွေထွေ သတင်းအချက်အလက်များ       | လုပ်ငန်းတိုးတက်မှု အချက်ပြခြင်း        |
| notice      | သာမန်ပုံစံဖြစ်သော်လည်း အရေးကြီးသောဖြစ်စဉ်များ | configuration ပြောင်းလဲမှုများ        |
| warning     | သတိပေးခြင်း အခြေအနေများ             | deprecated feature အသုံးပြုမှု           |
| error       | မှားယွင်းမှု အခြေအနေများ              | လုပ်ငန်းပြဿနာများ                   |
| critical    | အရေးပေါ် အခြေအနေများ                 | စနစ်အစိတ်အပိုင်း ပြတ်တောက်မှုများ       |
| alert       | လျင်မြန်စွာ အရေးယူရန်                   | ဒေတာ ပျက်စီးမှု ရှိခြင်း             |
| emergency   | စနစ်အသုံးမပြုနိုင်သောအခြေအနေ            | စနစ် စုံလုံး မအောင်မြင်မှု              |

## MCP တွင် Notification အကောင်အထည်ဖော်ခြင်း

MCP တွင် notification များကို အကောင်အထည်ဖော်ရန် server နှင့် client တို့အား တဖြည်းဖြည်း real-time update ကို ကိုင်တွယ်နိုင်ရန် အသင့်ပြုလုပ်ရမည်။

### Server ဘက်: Notification ပို့ခြင်း

Server ဘက်မှ စတင်လိုက်ပါ။ MCP တွင် request များကို လုပ်ဆောင်စဉ် notification ပို့နိုင်မည့် tool များကို သတ်မှတ်သည်။ Server သည် context object (အများအားဖြင့် `ctx`) ကို အသုံးပြု၍ client ထံ မက်ဆေ့ ပေးပို့သည်။

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```
  
အထက်ဖော်ပြပါ ဥပမာတွင် `process_files` tool သည် ဖိုင်တစ်ခုချင်းစီကို လုပ်ဆောင်စဉ် client ထံသို့ သုံးကြိမ် ကြေညာချက် ပေးပို့သည်။ `ctx.info()` method ကို သတင်းအချက်အလက် မက်ဆေ့ပို့ရန် အသုံးပြုသည်။

အထူးသဖြင့် notification enable ပြုရန် server သည် streaming transport (ဥပမာ၊ `streamable-http`) ကို အသုံးပြုရမည်၊ client သည် notification များကို ကောက်ယူရန် message handler ကို တည်ဆောက်ထားရမည် ဖြစ်သည်။ server ကို `streamable-http` transport ဖြင့် အသုံးပြုနိုင်ရန် နမူနာအတိုင်း ဆက်လုပ်နိုင်သည်-

```python
mcp.run(transport="streamable-http")
```
  
#### .NET

```csharp
[Tool("A tool that sends progress notifications")]
public async Task<TextContent> ProcessFiles(string message, ToolContext ctx)
{
    await ctx.Info("Processing file 1/3...");
    await ctx.Info("Processing file 2/3...");
    await ctx.Info("Processing file 3/3...");
    return new TextContent
    {
        Type = "text",
        Text = $"Done: {message}"
    };
}
```
  
ဤ .NET ဥပမာတွင် `ProcessFiles` tool ကို `Tool` attribute ဖြင့် ဖန်တီးပြီး ဖိုင်များကို လုပ်ဆောင်စဉ် သုံးကြိမ် notification ပို့သည်။ `ctx.Info()` method ကို သတင်းအချက်အလက် မက်ဆေ့ ပို့ရန် အသုံးပြုသည်။

.NET MCP server တွင် notification ကို အကောင်အထည်ဖော်ရန် streaming transport ကို သုံးထားရမည်-

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```
  
### Client ဘက်: Notification လက်ခံခြင်း

Client သည် notification မက်ဆေ့များ လက်ခံ၍ ပြသရန် message handler ကို တည်ဆောက်ထားရမည်။

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)

async with ClientSession(
   read_stream, 
   write_stream,
   logging_callback=logging_collector,
   message_handler=message_handler,
) as session:
```
  
အထက်ဖော်ပြထားသည့် code တွင် `message_handler` function သည် လက်ရှိ ပြုလုပ်နေသော message ကို notification ဖြစ်/မဖြစ်စစ်ဆေးပြီး notification ဖြစ်လျှင် ထုတ်ပြသည်။ မဟုတ်လျှင် ရိုးရိုး server message အဖြစ် ချမှတ်သည်။ `ClientSession` သည် `message_handler` ဖြင့် စတင်ဆောင်ရွက်သည်။

#### .NET

```csharp
// Define a message handler
void MessageHandler(IJsonRpcMessage message)
{
    if (message is ServerNotification notification)
    {
        Console.WriteLine($"NOTIFICATION: {notification}");
    }
    else
    {
        Console.WriteLine($"SERVER MESSAGE: {message}");
    }
}

// Create and use a client session with the message handler
var clientOptions = new ClientSessionOptions
{
    MessageHandler = MessageHandler,
    LoggingCallback = (level, message) => Console.WriteLine($"[{level}] {message}")
};

using var client = new ClientSession(readStream, writeStream, clientOptions);
await client.InitializeAsync();

// Now the client will process notifications through the MessageHandler
```
  
.NET ဤနမူနာတွင် `MessageHandler` function သည် notification ဖြစ်ပါက ထုတ်ပြစေပြီး မဖြစ်ပါက server message အဖြစ် တွက်ချက်သည်။ `ClientSession` ကို `ClientSessionOptions` ဖြင့် message handler နှင့် initialize ပြုလုပ်သည်။

Notification enable ပြုရန် server သည် streaming transport (ဥပမာ၊ `streamable-http`) ကို အသုံးပြုရမည်၊ client သည် notification မက်ဆေ့များကို ဆက်ခံရန် message handler တစ်ခု ရှိရမည် ဖြစ်သည်။

## တိုးတက်မှု Notification များနှင့် ကြားဖြတ်ဖြစ်စဉ်များ

ဤအပိုင်းတွင် MCP တွင် တိုးတက်မှု notification ၏ အဓိပ္ပါယ်၊ အရေးပါမှုနှင့် Streamable HTTP အသုံးပြု၍ မည်သို့ implement ပြုလုပ်မည်ကို နားလည်စေမည့် လမ်းညွှန်ချက်များ ပါဝင်သည်။ သင့်နားလည်မှုကို ထိထိရောက်ရောက် ပြုစုပြီးစီမံခန့်ခွဲရန် လက်တွေ့ အစီအစဉ်အနည်းငယ်လည်း ပါဝင်သည်။

တိုးတက်မှု notification များ သည် server မှ client သို့ ကြာရှည်တည်ဆောက်နေစဉ် real-time message များဖြစ်သည်။ လိုအပ်သော အလုပ် ဖြေရှင်းပြီးစောင့်ဆိုင်းရသည့်အစား၊ server ထံမှ လက်ရှိ အခြေအနေများကို client ကို မျှဝေသွားသည်။ အဆိုပါဖြစ်စဉ်သည် transparency၊ အသုံးပြုသူအတွေ့အကြုံကို တိုးတက်စေပြီး ပြသနာရှာဖွေမှုလည်း ပိုမိုလွယ်ကူစေသည်။

**ဥပမာ:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```
  
### တိုးတက်မှု Notification ကို ဘာကြောင့်အသုံးပြုသနည်း?

တိုးတက်မှု notification များသည် အကြောင်းအချက်အရ အဓိက္ပါယ်ရှိသည်-

- **အသုံးပြုသူအတွေ့အကြုံ ကောင်းမွန်စေခြင်း:** အသုံးပြုသူသည် အလုပ်လုပ်ငန်း ပြေးဆင်းမှုကို တစ်ဖြည်းဖြည်း မြင်ရသည်၊ မပြီးဆုံးမှတ်မေ့။
- **real-time တုံ့ပြန်မှု:** client များသည် progress bar သို့မဟုတ် မှတ်တမ်းများ ပြသနိုင်ပြီး app ကို စိတ်ဖြင့် ခံစားနိုင်သည်။
- **ပြသနာရှာဖွေရသည့်အခါ ပိုမိုလွယ်ကူခြင်း:** ဖွံ့ဖြိုးသူများနှင့် အသုံးပြုသူများသည် လုပ်ငန်း မည်သည့်အဆင့်တွင် နှေးကွေးမှုရှိသည်ကို မြင်နိုင်သည်။

### တိုးတက်မှု Notification လုပ်ငန်းစဉ်ကို မည်သို့ အကောင်အထည်ဖော်မည်

MCP တွင် တိုးတက်မှု notification များ implement ပြုလုပ်နည်း-

- **Server ဘက်:** အရာရာ တစ်ခုချင်းလုပ်ဆောင်သည့်အခါ `ctx.info()` သို့မဟုတ် `ctx.log()` ဖြင့် notification မက်ဆေ့ ပေးပို့သည်။ ၎င်းသည် အဓိကရလဒ် မပြင်ဆင်မှီ client ထံ သတင်းပေးလာခြင်းဖြစ်သည်။
- **Client ဘက်:** notification မက်ဆေ့များ listen ပြီး ပြသရန် message handler တည်ဆောက်ရမည်။ handler သည် notification နှင့် နောက်ဆုံး ရလဒ် ခွဲခြား ဖတ်ရှုနိုင်သငြိ။

**Server ဥပမာ:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```
  
**Client ဥပမာ:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```
  
## လုံခြုံရေး ဆိုင်ရာ သဘောတူညီချက်များ

HTTP အခြေပြု ယာဉ်ပို့မှုများနှင့် MCP server များ implement ပြုလုပ်သည့်အခါ လုံခြုံရေးသည် အရေးတကြီး ဆောင်ရွက်ရမည့် အချက်ဖြစ်ကာ အကြမ်းဖက် တိုက်ခိုက်မှုများနှင့် ကာကွယ်ရေးနည်းလမ်းများကို ဂရုစိုက်ခြင်း လိုအပ်သည်။

### အနှစ်ချုပ်

HTTP ဖြင့် MCP server များ exposed ပြုလုပ်သည့်အခါ လုံခြုံရေး အရေးကြီးသည်။ Streamable HTTP သည် အသစ်သောတိုက်ခိုက်မှု အစီအစဉ်များဖြစ်ပေါ်စေသည်၊ စနစ် configuration တွင် အထူးဂရုစိုက်ချက်လိုအပ်သည်။

### အဓိကအချက်များ

- **Origin Header စစ်ဆေးမှု**: DNS rebinding တိုက်ခိုက်မှုများကို ကာကွယ်ရန် `Origin` header ကို အမြဲစစ်ဆေးသင့်သည်။
- **Localhost Binding**: ဒေသတွင်း ဖွံ့ဖြိုးရေးအတွက် server များကို `localhost` တွင် တင်ဆက်ပါ၊ 公開 Internet တွင် မဖော်ပြရ။
- **Authentication**: ထုတ်လုပ်မှု deployment များအတွက် authentication (ဥပမာ API key, OAuth) ကို ပြုလုပ်ပါ။
- **CORS**: Cross-Origin Resource Sharing မူဝါဒများကို သတ်မှတ်၍ ဝင်ရောက်မှုကို ကန့်သတ်သည်။
- **HTTPS**: ထုတ်လုပ်ရေးတွင် HTTPS ကို အသုံးပြု၍ traffic ကို ကာကွယ်တားဆီးပါ။

### အကောင်းဆုံး လေ့လာမှုများ

- မစ်လျော်သော request များကို မယုံကြည်ရ။
- ဝင်ရောက်မှုနှင့် အမှားများအားလုံးကို မှတ်တမ်းတင် စောင့်ကြည့်ပါ။
- အန္တရာယ်ကင်းရှင်းရေး မရှိမဖြစ် ကုသရာတွင် dependencies များ အလိုတော်မူ နေ့စဉ် အပ်ဒိတ် လုပ်ပါ။

### စိန်ခေါ်မှုများ
- လုံခြုံမှုနှင့် ဖွံ့ဖြိုးရေးလွယ်ကူမှုကို ညီမှန်းစေခြင်း  
- ဖောက်သည်အခြေအနေမျိုးစုံနှင့် ကိုက်ညီမှုရှိစေရန်  

## SSE မှ Streamable HTTP သို့ အဆင့်မြှင့်တင်ခြင်း  

Server-Sent Events (SSE) ကို အသုံးပြုနေသော လျှောက်လွှာများအတွက် Streamable HTTP သို့ ပြောင်းလဲခြင်းက MCP အကောင်အထည်ဖော်မှုများအတွက် ပိုမိုတိုးတက်သောစွမ်းဆောင်ရည်နှင့် ရေရှည်ထိရောက်မှုကို ပေးစွမ်းပါသည်။  

### အဆင့်မြှင့်တင်ရသောအကြောင်း  

SSE မှ Streamable HTTP သို့ အဆင့်မြှင့်တင်ရသည့် အကြောင်းရင်း ၂ ချက်ရှိသည်။  

- Streamable HTTP သည် SSE ထက် ပိုမိုအဆင့်မြင့်သော စွမ်းဆောင်ရည်၊ ကိုက်ညီမှုနှင့် အသိပေးမှုများကို ပိုမိုကောင်းမွန်စွာ ထောက်ပံ့ပေးသည်။  
- MCP အသစ်များအတွက် အကြံပြုထားသည့် ပို့ဆောင်မည့်နည်းဖြစ်သည်။  

### ပြောင်းလဲခြင်းအဆင့်များ  

MCP လျှောက်လွှာများတွင် SSE မှ Streamable HTTP သို့ ပြောင်းလဲလိုလျှင် အောက်ပါအတိုင်း ဆောင်ရွက်နိုင်ပါသည်။  

- **server ကုဒ်ကို** `mcp.run()` တွင် `transport="streamable-http"` အသုံးပြုရန် ပြင်ဆင်ပါ။  
- **client ကုဒ်ကို** SSE client မှ `streamablehttp_client` ဖြင့် အစားထိုးပါ။  
- **အသိပေးချက်များကို ထိန်းချုပ်ရန် message handler ကို** client တွင် အောက်ခံပြုလုပ်ပါ။  
- ရှိပြီးသား ကိရိယာများနှင့် လုပ်ငန်းစဉ်များနှင့် ကိုက်ညီမှု စစ်ဆေးပါ။  

### ကိုက်ညီမှုထိန်းသိမ်းခြင်း  

ပြောင်းလဲခြင်းကာလအတွင်း ရှိပြီးသား SSE clients များနှင့် ကိုက်ညီမှု ရှိစေရန် အကြံပြုပါသည်။ အောက်ပါနည်းလမ်းများရှိပါသည်။  

- SSE နှင့် Streamable HTTP နှစ်မျိုးလုံးကို မတူညီသော endpoint များတွင် တစ်ပြိုင်နက်တည်း ဆောင်ရွက်နိုင်ပါသည်။  
- Gradually client များကို အသစ်သော transport သို့ ပြောင်းလဲပေးပါ။  

### စိန်ခေါ်မှုများ  

ပြောင်းလဲခြင်းအတွင်း လိုက်နာရမည့် စိန်ခေါ်မှုများမှာ-  

- client အားလုံးကို အဆင့်မြှင့်ဖို့ စောင့်ကြည့်ခြင်း  
- အသိပေးချက်တင်သွင်းမှုတို့တွင် ကွာခြားချက်များကို ကောင်းစွာ စီမံခြင်း  

## လုံခြုံရေးစဉ်းစားချက်များ  

မည်သည့် server ကိုမဆို MCP တွင် Streamable HTTP ကဲ့သို့သော HTTP-based transport များအသုံးပြုပြီး ဆောင်ရွက်သောအခါ လုံခြုံရေးကို အထူးထားရှိရပါမည်။  

HTTP-based transport များဖြင့် MCP servers ထုတ်လုပ်ရာတွင် လုံခြုံရေးသည် အရေးကြီးပြီး တိုက်ခိုက်မှု နယ်မြေများစွာနဲ့ ကာကွယ်ရေးစနစ်ကောင်းများ တာဝန်ယူစဉ်းစားရသူဖြစ်သည်။  

### အနှစ်ချုပ်  

MCP 서버များကို HTTP ဖြင့် exposed လုပ်ရာတွင် လုံခြုံရေးက အဓိကဖြစ်သည်။ Streamable HTTP သည် အသစ်သော တိုက်ခိုက်မှုနယ်မြေများကို မိတ်ဆက်ပြီး သေချာစွာ အပြင်အဆင် ရှိစေရန် လိုအပ်သည်။  

အောက်ပါ လုံခြုံရေးအချက်များကို သတိထားရမည်-  

- **Origin Header အတည်ပြုခြင်း**: DNS rebinding တိုက်ခိုက်မှုလျှော့ချရန်အတွက် Origin header ကို အမြဲစစ်ဆေးပါ။  
- **Localhost Binding**: နေရာဒေသဆိုင်ရာ ဖွံ့ဖြိုးရေးအတွက် server ကို localhost တွင်သာ ထိန်းသိမ်းခြင်းဖြင့် ပြည်သူသုံး အင်တာနက်မှ ကာကွယ်ပါ။  
- **အတည်ပြုမှု**: ထုတ်လုပ်ရာတွင် Authentication (API keys, OAuth စသည်) ထည့်သွင်းပါ။  
- **CORS**: Cross-Origin Resource Sharing (CORS) မူဝါဒများ သတ်မှတ်ပါ။  
- **HTTPS**: ထုတ်လုပ်မှုဆိုင်ရာတွင် HTTPS ကို အသုံးပြု၍ Traffic များကို ကင်းလုံသည် ဖြစ်အောင် ထိန်းသိမ်းပါ။  

### ထိပ်တန်းလမ်းညွှန်ချက်များ  

MCP streaming сервер ကို လုံခြုံစေရန် ယခုအောက်ပါ အကောင်းဆုံးလေ့လာမှုများကို လိုက်နာပါ။  

- စစ်ဆေးမှုမရှိသော လာရောက်လေ့လာမှုများကို ယုံကြည်မထားပါနှင့်။  
- အသုံးပြုပြီးရှောင်လျှော်မှုများနှင့် လုပ်ဆောင်ချက်များအား မှတ်တမ်းတင်၍ ကြည့်ရှုပါ။  
- လုံခြုံရေး ချို့ယွင်းမှုများကို ဖြေရှင်းရန် စနစ်တကျ dependency များကို အကြိမ်ကြိမ် update လုပ်ပါ။  

### စိန်ခေါ်မှုများ  

MCP streaming servers တွင် လုံခြုံရေး ဆောင်ရွက်ရာတွင် တွေ့ကြုံရမည့် စိန်ခေါ်မှုများ-  

- ဖွံ့ဖြိုးရေးလွယ်ကူမှုနှင့် လုံခြုံမှုကို ညီမွန်းစေခြင်း  
- မတူညီသော client ပတ်ဝန်းကျင်များနှင့် ကိုက်ညီမှု ရှိစေရန်  

### လုပ်ငန်းတာဝန်- ကိုယ်ပိုင် Streaming MCP App ဆောက်လုပ်ခြင်း  

**အခြေအနေ**  
Server သည် စာရင်းတစ်ခု (ဥပမာ၊ ဖိုင်များ သို့မဟုတ် စာရွက်စာတမ်းများ) ကို 처리ပြီး item တစ်ခုစီအတွက် အသိပေးချက် ပေးပို့ရမည်။ Client သည် ထိုအသိပေးချက်အား လာရောက်တိုင်း ပြသရမည်။  

**လုပ်ဆောင်ရန် အဆင့်များ**  

1. စာရင်းကို 처리၍ item တစ်ခုချင်းစီအတွက် အသိပေးချက် ပို့ပေးသည့် server tool ကို ဖန်တီးပါ။  
2. အသိပေးချက်များအား တိုက်ရိုက် ပြသနိုင်ရန် message handler ပါသော client ကို ဆောက်လုပ်ပါ။  
3. Server နှင့် client နှစ်ခုလုံး run ပြီး အသိပေးချက်များကို စစ်ဆေး စမ်းသပ်ပါ။  

[Solution](./solution/README.md)  

## နောက်ထပ်ဖတ်ရှုရန်နှင့် နောက်တစ်ဆင့်အတွက် အကြံပြုချက်များ  

MCP streaming နှင့် ပတ်သက်၍ သင်၏ နည်းပညာခရီးကို ဆက်လက်တိုးတက်စေရန်အတွက် အောက်ပါ အရင်းအမြစ်များနှင့် နောက်တစ်ဆင့် လုပ်ဆောင်ရန်အကြံပြုချက်များပါရှိသည်။  

### နောက်ထပ်ဖတ်ရှုရန်  

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)  
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)  

### နောက်တစ်ဆင့်  

- ရောက်ရှိနေသော MCP tools များကို အသုံးပြု၍ စမ်းသပ်မည့် real-time analytics၊ chat သို့မဟုတ် ပူးပေါင်းပြီး တည်းဖြတ်ခြင်းများ အတွက် ပိုမိုရှုပ်ထွေးသော tools များကို ဖန်တီးကြည့်ပါ။  
- Frontend framework (React, Vue စသည်ဖြင့်) များနှင့် MCP streaming ကို ပူးပေါင်း ထည့်သွင်းကာ အသစ်သော UI updates များကို ချက်ချင်း ပြသနိုင်ပါ။  
- နောက်တစ်ဆင့်- [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->