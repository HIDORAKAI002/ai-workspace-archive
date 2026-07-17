# Model Context Protocol (MCP) ဖြင့် HTTPS Streaming

ဒီခန်းတွင် HTTPS ကို အသုံးပြု၍ Model Context Protocol (MCP) ဖြင့် ဘေးကင်းလုံခြုံ၊ အတိုက်အခံနိုင်ပြီး အချိန်နာရီတို Real-time Streaming ကို အကောင်အထည်ဖော်နည်းများကို ဖော်ပြထားသည်။ Streaming ၏ အဓိကအကြောင်းရင်း၊ အသုံးပြုနိုင်သော ပို့ဆောင်နည်းများ၊ MCP တွင် Streamable HTTP ကို အသုံးပြု၍ Streamable ပြုလုပ်ခြင်းနည်းလမ်း၊ လုံခြုံရေးအကောင်းဆုံးလေ့ကျင့်မှုများ၊ SSE ကနေ ရွှေ့ပြောင်းခြင်းနည်းလမ်းများ၊ မိမိ၏ Streaming MCP application များ တည်ဆောက်ခြင်းအတွက် လက်တွေ့လမ်းညွှန်ချက်များ ပါဝင်သည်။

> **နိဂုံးချုပ်:** ဒီသင်ခန်းသည် **MCP Specification 2025-11-25** အောက်ရှိ Streamable HTTP ကို ဖော်ပြထားပြီး `initialize` အတွက် session တစ်ခုကို တည်ဆောက်ပြီး `Mcp-Session-Id` header ဖြင့် ပေါင်းစပ်သည်။ `2026-07-28` လာမည့် မိတ္တူဖြန့်ချိမှု Candidate တွင် handshake နှင့် session ID များအားလုံး ဖယ်ရှားပြီး၊ တစ်ခုချင်းစီ ဝန်ဆောင်မှုတောင်းဆိုမှုကို ပုဂ္ဂလိကထားပြီး၊ sticky session မလိုအပ်ဘဲ server instance များသို့ လမ်းညွှန်နိုင်သောပုံစံတွင် ပြောင်းလဲသွားမည်ဖြစ်သည်။ အသေးစိတ်အချက်အလက်များအတွက် [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) ကို ကြည့်ပါ။

## MCP တွင် ပို့ဆောင်နည်းများနှင့် Streaming

ဒီအပိုင်းတွင် MCP တွင် ရရှိနိုင်သော ပို့ဆောင်နည်းအမျိုးအစားများနှင့် Client နှင့် Server များအကြား ပုံမှန်အချိန်တွင် ဆက်သွယ်ရေးအတွက် streaming စွမ်းရည်ပေးရာ၌ ၎င်းတို့၏ အရေးပါမှုကို လေ့လာသည်။

### ပို့ဆောင်နည်းဆိုတာ ဘာလဲ?

ပို့ဆောင်နည်းဆိုသည်မှာ Client နှင့် Server အကြား ဒေတာ ပြန်လည်လဲလှယ်မှုကြောင်းကို သတ်မှတ်ပေးသည်။ MCP က သဘာဝပတ်ဝန်းကျင်နှင့် လိုအပ်ချက်အမျိုးမျိုး အတွက် သင့်လျော်သော ပို့ဆောင်နည်းအမျိုးအစားများကို ထောက်ခံပေးသည်။

- **stdio**: အဆင့်မီ input/output များ၊ ဒေသိယနှင့် CLI ကိရိယာများအတွက် သင့်တော်သည်။ ရိုးရှင်းသော်လည်း web သို့မဟုတ် cloud များအတွက် မသင့်တော်ပါ။
- **SSE (Server-Sent Events)**: Server များမှ HTTP ပေါ်တွင် Client များသို့ အချိန်နာရီတို အစီရင်ခံချက်များ ပေးပို့ခွင့်ပြုသည်။ web UI များအတွက် ကောင်းမွန်သော်လည်း အတိုက်အခံနိုင်မှုနှင့် ယေဘုယျမယုံကြည်မှုတွင် ကန့်သတ်ချက်ရှိသည်။ MCP Specification 2025-06-18 အရ တစ်ခုတည်းသော SSE ပို့ဆောင်နည်းကို ရပ်ဆိုင်းပြီး "Streamable HTTP" ပို့ဆောင်နည်းဖြင့် အစားထိုးခဲ့သည်။
- **Streamable HTTP**: ပိုမိုခေတ်မီသော HTTP အခြေခံ streaming ပို့ဆောင်နည်းဖြစ်ပြီး အသိပေးချက်များနှင့် ပိုမိုတိုးတက်သော အတိုးအကျယ်ကို ထောက်ပံ့သည်။ ပိုမိုမြင့်မားသော ထုတ်လုပ်မှုနှင့် cloud ပတ်ဝန်းကျင်များအတွက် အကြံပြုသည်။

### နှိုင်းယှဉ် အခန်းဇယား

ဒီအောက်တွင် ပို့ဆောင်နည်းအမျိုးအစားများ၏ ကွာခြားချက်များကို နားလည်နိုင်ရန် နှိုင်းယှဉ် အခန်းဇယားကို မြင်ရနိုင်ပါသည်။

| ပို့ဆောင်နည်း     | အချိန်နာရီတို အပ်ဒိတ်များ | Streaming | အတိုက်အခံ  | အသုံးပြုမှုအခြေအနေ      |
|-------------------|------------------|-----------|-------------|---------------------------|
| stdio             | မဟုတ်ပါ           | မဟုတ်ပါ    | နိမ့်ပါသော   | ဒေသိယ CLI ကိရိယာများ   |
| SSE               | ဟုတ်ပါတယ်         | ဟုတ်ပါတယ်  | အလယ်အလတ်    | web, အချိန်နာရီတို အပ်ဒိတ်များ |
| Streamable HTTP   | ဟုတ်ပါတယ်         | ဟုတ်ပါတယ်  | မြင့်မားသည်  | cloud, multi-client      |

> **အကြံပြုချက်:** သင့်တော်သော ပို့ဆောင်နည်းရွေးချယ်ခြင်းသည် စွမ်းဆောင်ရည်၊ အတိုက်အခံမှုနှင့် အသုံးပြုသူ အတွေ့အကြုံကို သက်ရောက်စေပါသည်။ **Streamable HTTP** ကို ခေတ်မီ၊ အတိုက်အခံမှုမြင့်မားပြီး cloud သင့် application များအတွက် အကြံပြုပါသည်။

အရင်ခန်းများတွင် သင်ကြည့်ရှုခဲ့သော stdio နှင့် SSE ပို့ဆောင်နည်းများနှင့် ဒီခန်းတွင် ဖော်ပြသည့် Streamable HTTP ပို့ဆောင်နည်းများကို မှတ်သားပါ။

## Streaming: အတွေးအမြင်နှင့် အကြောင်းရင်း

Streaming ၏ အခြေခံအယူအဆများနှင့် အကြောင်းရင်းများကို နားလည်ခြင်းသည် ထိရောက်သော အချိန်နာရီတို ဆက်သွယ်ရေးစနစ်များတည်ဆောက်ရာတွင် အရေးပါသည်။

**Streaming** သည် ကွန်ယက် programming တွင် data ကို တစ်ပြိုင်တည်း တစ်ကြိမ်လုံး စောင့်ဆိုင်းမီ စွန့်ပစ်ခြင်းမလုပ်ဘဲ ကွီးသေးသေး သင့်ကြောင်း အပိုင်းအစ သို့မဟုတ် ဖြစ်ရပ်အစဉ်အဆက်အဖြစ် လွှဲပေး/လက်ခံနိုင်ရန် နည်းလမ်းဖြစ်သည်။ ၎င်းသည် အထူးသဖြင့် အသုံးဝင်သည် -

- ကြီးမားသောဖိုင်များ သို့မဟုတ် ဒေတာစုစည်းမှုများအတွက်။
- အချိန်နာရီတို အပ်ဒိတ်များ (ဥပမာ - စကားပြောခြင်း၊ တိုးတက်မှု အတန်းများ)။
- အချိန်ကြာရှည်တည်ဆဲ ကွန်ပျူတာစစ်ဆင်ခန်းများတွင် အသုံးပြုသူကို ဆက်လက် သတိပေးလိုသောအခါ။

Streaming အကြောင်းတွေးရမည့် အချက်များမှာ -

- Data ကို တစ်ပြိုင်နက် တစ်စိတ်တစ်ပိုင်း များပို့ပေးသည်။
- Client သည် data လာသည်နှင့်အမျှ ပြုလုပ်နိုင်သည်။
- အချိန်နာရီတို လိုက်ဖက်မှု ဖြင့် စောင့်ကြည့်ခြင်း ပြုလုပ်ရလဒ် တိုးတက်သည်။

### Streaming တွေ ဘာကြောင့် အသုံးပြုသလဲ?

Streaming အသုံးပြုသော အကြောင်းရင်းများမှာ -

- အသုံးပြုသူများ အဆုံးတွင် မဟုတ်ဘဲ ချက်ချင်း တုံ့ပြန်ချက် ရရှိသည်။
- အချိန်နာရီတို အက်ပလီကေးရှင်းများနှင့် တုံ့ပြန်မှုမီ UI များ ဖန်တီးနိုင်စေသည်။
- ကွန်ယက်နှင့် ကွန်ပျူတာအရင်းအမြစ် အသုံးပြုမှု ပိုထိရောက်စေသည်။

### ရိုးရှင်းတဲ့ ဥပမာ: HTTP Streaming Server နှင့် Client

Streaming နည်းလမ်းကို ကျင့်သုံးရန် ရိုးရှင်းသော နမူနာတစ်ခုမှာ -

#### Python

**Server (Python, FastAPI နှင့် StreamingResponse အသုံးပြု):**

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

**Client (Python, requests အသုံးပြု):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

ဒီနမူနာသည် Server မှ Message များကို အစဉ်လိုက် Client ကို ပို့နေသည်ကို ဖော်ပြသည်၊ စာသားများ အစုံကို စောင့်ဆိုင်းခြင်းမလုပ်ဘဲ။

**လုပ်ဆောင်ပုံ:**

- Server သည် အစီအစဉ်တိုင်း Message ကို တစ်ချက်ချင်း ထုတ်ပေးသည်။
- Client သည် လက်လှမ်းမီသည့် အပိုင်းအစများကို လက်ခံသည့်အပြင် မျက်နှာပြင်တွင် ပုံဖော်ပြသသည်။

**လိုအပ်ချက်များ:**

- Server သည် StreamingResponse ကဲ့သို့သော streaming response ကို သုံးရမည်။
- Client သည် requests မှာ `stream=True` ဖြင့် stream ကို လက်ခံ ရမည်။
- Content-Type သည် ပုံမှန်အားဖြင့် `text/event-stream` သို့မဟုတ် `application/octet-stream` ဖြစ်သည်။

#### Java

**Server (Java, Spring Boot နှင့် Server-Sent Events အသုံးပြု):**

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

**Client (Java, Spring WebFlux WebClient အသုံးပြု):**

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

**Java Implementation အကြောင်းအရာ:**

- Spring Boot reactive stack ကို `Flux` ဖြင့် အသုံးပြုခြင်း
- `ServerSentEvent` သည် အကြောင်းအရာတိကျသော event streaming နှင့် event type များ ပါဝင်သည်
- `WebClient` တွင် `bodyToFlux()` ဖြင့် reactive streaming ကို စားသုံးသည်
- `delayElements()` သည် event များအကြား တုံ့ပြန်ချိန် ကို အတုယူထားသည်
- Event များသည် Client ကောင်းစွာ ကိုင်တွယ်နိုင်ရန် `info`, `result` စသည့် type များ ပါရှိနိုင်သည်

### နှိုင်းယှဉ်ခြင်း: Classic Streaming နှင့် MCP Streaming

Streaming ဖြတ်သန်းမှု အပြင်အသက်မှတ်ချက်များကို "classical" နည်းနှင့် MCP နည်းအနေဖြင့် အောက်ပါ အတိုင်းဖော်ပြနိုင်သည် -

| လက္ခဏာ                | Classic HTTP Streaming         | MCP Streaming (အသိပေးချက်များ)      |
|------------------------|-------------------------------|-------------------------------------|
| အဓိက တုံ့ပြန်မှု          | အပိုင်းအဆက်ဖြင့်ပေးပို့          | တစ်ခုတည်း၊ အဆုံးတွင်ပေးပို့            |
| တိုးတက်မှု အပ်ဒိတ်များ          | ဒေတာအပိုင်းအခြားအနေဖြင့် ပို့         | အသိပေးချက်အဖြစ် ပေးပို့               |
| Client ၏ လိုအပ်ချက်များ       | stream ကို လုပ်ဆောင်ရန် လို           | message handler ကို တင်းကြပ်ပါစေ         |
| အသုံးပြုမှု နယ်ပယ်           | ကြီးမားသောဖိုင်များ၊ AI token streams | တိုးတက်မှု၊ log များ၊ အချိန်နာရီတို တုံ့ပြန်မှု |

### မှတ်ချက် အဓိကကွာခြားချက်များ

ထို့အပြင် အဓိကကွာခြားချက်များမှာ -

- **ဆက်သွယ်ရေး ပုံစံ:**
  - Classic HTTP streaming: data ကို chunked transfer encoding ဖြင့် ပို့သည်
  - MCP streaming: JSON-RPC ပရိုတိုကောနှင့် ဖွဲ့စည်းထားသော အသိပေးစနစ်ကို အသုံးပြုသည်

- **Message ပုံစံ:**
  - Classic HTTP: စာသား ရိုးရှင်းသော chunk များ
  - MCP: ဖွဲ့စည်းထားသော LoggingMessageNotification object များ metadata ပါသည်

- **Client အကောင်အထည်ဖော်ခြင်း:**
  - Classic HTTP: Streaming response များကို ရိုးရှင်းစွာ ပြုလုပ်
  - MCP: message handler ဖြင့် ပိုမို ရှုပ်ထွေးသော client၊ message များအမျိုးမျိုးကို ကောင်းစွာ ကိုင်တွယ်သည်

- **တိုးတက်မှု အပ်ဒိတ်များ:**
  - Classic HTTP: တိုးတက်မှုသည် အဓိက streaming ထဲ၌ ပါဝင်သည်
  - MCP: တိုးတက်မှု message များကို အသိပေးချက်အဖြစ် ထားပြီး အဓိက တုံ့ပြန်မှုကို အဆုံးတွင် ပေးပို့သည်

### အကြံပြုချက်များ

classical streaming ကို `/stream` အသုံးပြုနေစဉ်တွင် MCP ကို အသုံးပြု streaming နှိုင်းယှဉ်ခြင်း အသေးစိတ် သတ်မှတ်ချက်များကို အောက်ပါအတိုင်း ပြောနိုင်ပါသည်။

- **ရိုးရှင်းသော streaming လိုအပ်ချက်များအတွက်:** Classic HTTP streaming ကို ရိုးရှင်းစွာ အသုံးပြုနိုင်ပြီး ရိုးရှင်းသော streaming အတွက် လုံလောက်သည်။

- **ရှုပ်ထွေးသော၊ အပြန်အလှန် ဆက်သွယ်မှုရှိသော application များအတွက်:** MCP streaming သည် ပိုမို ဖွဲ့စည်းထားသော နည်းလမ်း၊ ကြွယ်ဝသော metadata နှင့် အသိပေးချက်နှင့် နောက်ဆုံးရလဒ်ကို ခွဲခြားထားသည်။

- **AI အက်ပလီကေးရှင်းများအတွက်:** MCP ၏ အသိပေးထားသောစနစ်သည် အသုံးပြုသူများကို တိုးတက်မှုအခြေအနေကို အချိန်နာရီတို သတင်းပေးရန် အသုံးပြုနိုင်သည်။ 

## MCP တွင် Streaming

အခုထိ classical streaming နှင့် MCP Streaming အတွေးအမြင်နှင့် အကြံပြုချက်များကို မြင်ရန် အခွင့်ရပြီးပါပြီ။ MCP ၌ streaming ကို တေ့လက်တွေ့ ဘယ်လို အသုံးချမလဲဆိုတာကို အောက်မှာထပ်မံ မိတ်ဆက်ပါမည်။

MCP ဖရိမ်ဝတ်၌ streaming ကို နားလည်ခြင်းသည် အချိန်ကြာရှည် တည်ဆဲ လုပ်ငန်းများအတွင်း အသုံးပြုသူများကို တုံ့ပြန်မှုအလျင်အမြန် ပြုလုပ်နိုင်သော application များ တည်ဆောက်ရာတွင် အဓိကဖြစ်သည်။

MCP တွင် streaming ဆိုသည်မှာ အဓိက တုံ့ပြန်ချက်ကို အပိုင်းအခြား ပို့ပေးခြင်း မဟုတ်ဘဲ tool တစ်ခုသည် request ကို ကြားနာပြီး ညွှန်ကြားချက်၊ တိုးတက်မှု သတင်းပေးမှုများ သို့မဟုတ် ဖြစ်ရပ်များကို Client သို့ ပေးပို့ခြင်း ဖြစ်ပါသည်။

### စနစ် အသုံးပြုမှု

အဓိက ရလဒ်စာသားကို တစ်ခါတည်း အဖြေအပေါ်ပေးပို့ပါသည်။ သို့သော် တိုးတက်မှု message များကို အခြား messages အဖြစ် ပုံစံကွဲကွဲ ထံမှ ပို့ပေး၍ Client ကို အချိန်နာရီတို အသိပေးနိုင်သည်။

## အသိပေးမှု (Notification) ဆိုတာ ဘာလဲ?

MCP context တွင် "Notification" ဟူသည်မှာ ဘာကြောင့်လဲဆိုသည်မှာ?

Notification ဆိုသည်မှာ အချိန်ကြာရှည်တည်ဆဲ လုပ်ငန်းများအတွင်း တိုးတက်မှု၊ အခြေအနေ သို့မဟုတ် ဖြစ်ရပ်များအကြောင်း Server မှ Client သို့ ပေးပို့သည့် message ဖြစ်ပြီး စွမ်းဆောင်ရည်မြှင့်တင်မှုနှင့် အသုံးပြုသူ အတွေ့အကြုံ တိုးတက်စေပါသည်။

ဥပမာအားဖြင့် Client သည် server နှင့် စတင် handshake ပြုလုပ်ပြီးနောက် အသိပေးမှုတစ်ခု ပို့ပေးသင့်ပါသည်။

Notification ၏ JSON ပုံစံသည် အောက်ပါကဲ့သို့ ဖြစ်သည် -

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifications များသည် MCP တွင် ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) ဟု ခေါ်သော ခေါင်းစဉ် အောက်တွင် ပါဝင်သည်။

> **ရပ်ဆိုင်းကြေညာချက်:** `2026-07-28` MCP specification release candidate တွင် Logging primitive ကို stdio ပို့ဆောင်မှုများအတွက် `stderr` နှင့် ဖွဲ့စည်းစောင့်ကြည့်ခွင့် OpenTelemetry ကို သတိပေးခြင်းအားဖြင့် ရပ်ဆိုင်းထားသည်။ Logging သည် `2025-11-25` နှင့် ရပ်ဆိုင်းခြင်း ကြေညာသည့် အချိန်မှ တစ်နှစ်အထိ ဆက်လက် အသုံးပြုနိုင်ပါသည်။ အသေးစိတ်အတွက် [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) ကို ကြည့်ပါ။

Logging ကို လုပ်ဆောင်ရန် Server သည် feature/capability အဖြစ် အောက်ပါအတိုင်း ဖွင့်လှစ်ရမည် -

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> အသုံးပြုသော SDK အလိုက် logging ကို ပုံမှန်အသုံးပြုဖို့ ဖွင့်ထားရှိနိုင်သည်၊ မဟုတ်လျှင် Server configuration တွင် ပြင်ပ ဖွင့်ရပါမည်။

အသိပေးမှုပုံစံများ အမျိုးအစားများမှာ -

| အဆင့်      | ဖော်ပြချက်                    | အသုံးပြုမှု ဥပမာ               |
|-----------|-----------------------------|-------------------------------|
| debug     | အသေးစိတ် debug အချက်အလက်     | Function ဝင်ပြန်ရာ                |
| info      | ယေဘုယျ သတင်းအချက်အလက်များ | လုပ်ငန်းတိုးတက်မှု အပ်ဒိတ်များ  |
| notice    | ပုံမှန်ပြီး အရေးကြီးသော ဖြစ်ရပ်များ | ဖွဲ့စည်းတည်ဆောက်မှု ပြောင်းလဲမှုများ|
| warning   | သတိပေးခြင်း တင်ဆက်မှုများ      | ရပ်ဆိုင်းထားသော function အသုံးပြုမှု|
| error     | အမှား အခြေအနေများ              | လုပ်ငန်းဖြေရှင်းမှု မအောင်မြင်ခြင်း|
| critical  | အရေးကြီး အခြေအနေများ         | စနစ်တစ်စိတ်တစ်ပိုင်း ပျက်ကွက်ခြင်း|
| alert     | ချက်ချင်း လုပ်ဆောင်ရန်လိုအပ်ခြင်း | ဒေတာပျက်စီးမှု တွေ့ရှိခြင်း     |
| emergency | စနစ် အသုံးပြု၍မရနိုင်ခြင်း    | စနစ်အပြည့်အဝ ညစ်ညမ်းမှု          |

## MCP တွင် အသိပေးမှု အကောင်အထည်ဖော်ခြင်း

MCP တွင် အသိပေးမှုကို အကောင်အထည်ဖော်ရန် Server နှင့် Client ဘက်ကို နှစ်ဖက်လုံး တည်ဆောက်ရမည်ဖြစ်ပြီး အချိန်နာရီတို အပ်ဒိတ်များကို ပြသနိုင်စေပါသည်။

### Server ဘက်: အသိပေးမှုပို့ခြင်း

Server ဘက်ကနေ စတင်ကြည့်ရအောင်။ MCP ၌ tool များသည် လုပ်ငန်းများ လုပ်ဆောင်နေစဉ် အသိပေးချက်များ ပို့နိုင်သည်။ Server သည် context object (ပုံမှန်အားဖြင့် `ctx`) ကိုသုံး၍ Client သို့ မက်ဆေ့ခ်ျများ ပို့သည်။

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

နမူနာအရ `process_files` tool သည် ဖိုင်အမျိုးမျိုး လုပ်ဆောင်သည့်အချိန် ဘဲ Client ကို အသိပေးမက်ဆေ့ခ်ျ သုံးခု ပေးပို့သည်။ `ctx.info()` ဟာ သတင်းအချက်အလက် မက်ဆေ့ခ်ျ ပို့ရန်အသုံးပြုသည်။

ထပ်မံ၍ အသိပေးချက်များ အလုပ်လုပ်စေလိုပါက Server သည် streaming transport (ဥပမာ `streamable-http`) ကို သုံးရမည်၊ Client ကလည်း အသိပေးချက် မက်ဆေ့ခ်ျများကို ယူဆောင်နိုင်မည့် message handler တစ်ခု ဖော်ဆောင်ရမည် ဖြစ်သည်။ Server ကို `streamable-http` transport ဖြင့် အသုံးပြုစေလိုပါက အောက်ပါအတိုင်းပြုလုပ်နိုင်သည် -

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

ဒီ .NET နမူနာတွင် `ProcessFiles` tool ကို `Tool` attribute ဖြင့် အမှတ်အသားပေးကာ ဖိုင်တစ်ခုချင်းစီ သွားကြည့်စဉ် Client သို့ အသိပေးချက် သုံးခု ပေးပို့သည်။ `ctx.Info()` သည် သတင်းအချက်အလက်မက်ဆေ့ခ်ျ ပို့ရန် အသုံးပြုသည်။

.NET MCP Server ၌ အသိပေးချက်များ ဖွင့်ရန် streaming transport ကို သုံးနေကြောင်း သေချာစေပါ -

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Client ဘက်: အသိပေးချက် လက်ခံခြင်း

Client သည် မက်ဆေ့ခ်ျ handler တစ်ခု ဖန်တီးပြီး လာရှိသည့် အသိပေးချက်များကို လက်ခံ ဆောင်ရွက်ရန် လိုအပ်သည်။

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

အထက်ပါ Code တွင် `message_handler` function သည် လာရောက်သော message သည် notification ဖြစ်/မဖြစ် စစ်ဆေးကာ notification ဖြစ်ပါက ပါရှိသည်ကို ပုံဖော်ပြသပြီး မဟုတ်ပါက ကျန် Server ချိတ်ဆက်ထားသော message အဖြစ် ဆက်လုပ်သည်။ ထို့ပြင် `ClientSession` ကို `message_handler` ဖြင့် initialize ပြုလုပ်သည်။

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

ဒီ .NET နမူနာတွင် `MessageHandler` function သည် လာရောက် message ကို အသိပေးချက် ဖြစ်ပါက ပုံဖော်ပြသပြီး မဟုတ်ပါက Server message အဖြစ် ဆက်လုပ်သည်။ `ClientSession` ကို `ClientSessionOptions` ကနေ message handler ဖြင့် initialize ပြုလုပ်ထားသည်။

အသိပေးချက်များကို ဖွင့်လှစ်ရန် Server သည် streaming transport (ဥပမာ - `streamable-http`) အသုံးပြုရမည်၊ Client ကလည်း message handler ဖြင့် အသိပေးချက်များကို ထိန်းသိမ်းရမည်။

## တိုးတက်မှု အသိပေးချက်များနှင့် နမူနာများ

MCP ၌ တိုးတက်မှု အသိပေးချက် ဆိုသည်မှာ မည်သည်နှင့် မည်နည်းကို ဖော်ပြသည်၊ မည်သို့ streamable HTTP အသုံးပြု၍ အသုံးချရမည်ဆိုသည့် လမ်းညွှန်ချက်နှင့် လက်တွေ့ စိစစ်ချက်များ ပါဝင်ပါသည်။

တိုးတက်မှု အသိပေးချက်များ ဆိုသည်မှာ အချိန်ကြာရှည်တည်ဆဲ လုပ်ငန်းများအတွင်း Server မှ Client သို့ အချိန်ရက်အလိုက် စာများ ပေးပို့ခြင်းဖြစ်သည်။ လုပ်ငန်းပြီးမြောက်သည်ကို စောင့်ဆိုင်းမနေဘဲ လက်ရှိ အခြေအနေနှင့် သတင်းအချက်အလက်များ လက်ခံသည်။ ၎င်းသည် သာမာန် သိသာသာ မြင်သာမှု၊ အသုံးပြုသူ အတွေ့အကြုံနှင့် Debug လုပ်ခြင်း အလွယ်တကူမှု ပိုမို သက်သာစေသည်။

**ဥပမာ:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### တိုးတက်မှု အသိပေးချက်များ ဘာကြောင့် အသုံးပြုသလဲ?

တိုးတက်မှု အသိပေးချက်များ အရေးပါမှုများ -

- **အသုံးပြုသူ အတွေ့အကြုံ ပိုမိုကောင်းမွန်ခြင်း:** အသုံးပြုသူများသည် လုပ်ငန်း တိုးတက်မှုများကို အဆုံးမှ မဟုတ်ဘဲ ချက်ချင်းမြင်နိုင်သည်။
- **အချိန်နာရီတို တုံ့ပြန်ချက်:** Client များ progress bars သို့မဟုတ် log များ ပြသနိုင်ပြီး app က တုံ့ပြန်မှုရှိသလို ဖြစ်စေသည်။
- **Debug နှင့် စောင့်ကြည့်ခြင်း ပိုမို အဆင်ပြေခြင်း:** Developer နှင့် အသုံးပြုသူများသည် လုပ်ငန်း တားဆီးမှု သို့မဟုတ် နောက်ကျမည့်နေရာများကို ရှာဖွေနိုင်သည်။

### တိုးတက်မှု အသိပေးချက်များကို မည်သို့ အကောင်အထည်ဖော်မလဲ?

MCP တိုးတက်မှု အသိပေးချက် အကောင်အထည် ဖော်နည်း -

- **Server ပိုင်းတွင်:** တစ်စိတ်တစ်ပိုင်း လုပ်ဆောင်ရာတွင် `ctx.info()` သို့မဟုတ် `ctx.log()` ဖြင့် အသိပေးချက်များ ပို့သည်။ ဤသည် main result အသေးစိတ်မရနိုင်ခင် ပို့ခြင်းဖြစ်သည်။
- **Client ပိုင်းတွင်:** အသိပေးချက် လက်ခံ၍ ဖော်ပြရန် message handler တစ်ခု ထည့်သွင်းသည်။ Handler သည် အသိပေးချက်နှင့် အဓိကလုပ်ဆောင်မှု အဆုံးရလဒ် ကို ခွဲခြား ကြည့်ရှုပါသည်။

**Server နမူနာ:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Client Example:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## လုံခြုံရေးဆိုင်ရာ စဉ်းစားချက်များ

HTTP အခြေပြု သယ်ယူပို့ဆောင်မှုများဖြင့် MCP ဆာဗာများကို လက်တွေ့ ပြုလုပ်သောအခါ၊ လုံခြုံရေးသည် အရေးကြီးသည့်အချက် ဖြစ်လာပြီး မတည့်မှု အမျိုးမျိုးနှင့် ကာကွယ်ဆေးပညာများအား ဂရုစိုက်စီမံရမည် ဖြစ်သည်။

### ဖော်ပြချက်

MCP ဆာဗာများကို HTTP မှတဆင့် ထုတ်ဖော်ပြသသောအခါ လုံခြုံရေးသည် အရေးကြီးပါသည်။ Streamable HTTP သည် တခြားသတိထားရမည့် ချို့ယွင်းချက်ပေါင်းများစွာဖြစ်စေပြီး တိကျသေချာစွာ စီမံချက်တင်ရန်လိုအပ်ပါသည်။

### အဓိကအချက်များ

- **Origin Header စစ်စမ်းခြင်း**: DNS rebinding ပေါက်ကြားမှုများကာကွယ်ရန် `Origin` header ကို အမြဲစစ်ဆေးပါ။
- **Localhost ကို ချိတ်ဆက်ခြင်း**: ဒေသတွင်း ဖြံ့ဖြိုးမှုအတွက် ဆာဗာများကို `localhost` သို့ ချိတ်ဆက်ခြင်းဖြင့် အများပြည်သူ အင်တာနက်ထံ ထွက်ပေါက်မှု မဖြစ်စေရန်။
- **အတည်ပြုခြင်း**: ထုတ်လုပ်မှုအတွက် အတည်ပြုမှု (ဥပမာ - API key များ၊ OAuth) ကို အကောင်အထည်ဖော်ပါ။
- **CORS**: လက်ခံခွင့်ကို ကန့်သတ်ရန် Cross-Origin Resource Sharing (CORS) မူဝါဒများကို ဖန်တီးပါ။
- **HTTPS**: ထုတ်လုပ်မှုတွင် HTTPS ကို အသုံးပြုပါ၊ အချက်အလက်များကို 암호화 ပြုလုပ်ရန်။

### အကောင်းဆုံး လေ့လာသင့်သော နည်းလမ်းများ

- လက်ခံရရှိသော မေးလ်များအား အတည်ပြုခြင်း မပြုမီ ယုံကြည်မထားပါနှင့်။
- လက်ဝင်မှုများနှင့် အချက်ပြ အမှားများအား မှတ်တမ်းပြုလုပ်၍ မျက်စောင်္းလေ့လာပါ။
- လုံခြုံရေး ချို့ယွင်းချက်များကို ပြင်ဆင်ရန် စနစ်အားသာယာပုံစံအား ပုံမှန်တိုးမြှင့်ပါ။

### စိန်ခေါ်မှုများ

- လုံခြုံရေးနှင့် ဖွံ့ဖြိုးမှု လွယ်ကူမှုကို ချိန်ညှိခြင်း
- မတူညီသော client ပတ်ဝန်းကျင်များနှင့် ကိုက်ညီမှုကို အာမခံခြင်း

## SSE မှ Streamable HTTP သို့ အဆင့်မြှင့်ခြင်း

Server-Sent Events (SSE) ကို အသုံးပြုနေသော app များအတွက် Streamable HTTP သို့ ပြောင်းလဲခြင်းသည် MCP အကောင်အထည်ဖော်မှုများအတွက် ပိုမိုကောင်းမွန်သော Literature နဲ့ ရေရှည်ခံနိုင်စွမ်း ပိုမိုကောင်းမွန်စေပါသည်။

### ဘာကြောင့် အဆင့်မြှင့်ရမလဲ?

SSE မှ Streamable HTTP သို့ အဆင့်မြှင့်ရန် အကြောင်းအချက် နှစ်ချက်ရှိသည်-

- Streamable HTTP သည် SSE ထက် ပိုမိုချဲ့ထွင်နိုင်မှု၊ ကိုက်ညီမှု၊ နှင့် သတိပေးချက်များ ပိုမိုပေါ်လွင်စေသည်။
- MCP အသစ်များအတွက် ထုတ်နှစ်သုံးသည့် သယ်ယူပို့ဆောင်မှု ဖြစ်သည်။

### ပြောင်းလဲခြင်း လုပ်ငန်းစဉ်များ

MCP အသုံးပြုမှုများတွင် SSE မှ Streamable HTTP သို့ ပြောင်းလဲနိုင်သည့် နည်းလမ်းများမှာ အောက်ပါအတိုင်းဖြစ်သည်-

- `mcp.run()` မှာ `transport="streamable-http"` ကို အသုံးပြုရန် Server ကို Update လုပ်ပါ။
- SSE Client အစား `streamablehttp_client` ကို Client ကို Update ပြုလုပ်ပါ။
- Client တွင် သတိပေးချက်များကို ကိုင်တွယ်ရန် message handler ကို အကောင်အထည်ဖော်ပါ။
- ရှိပြီးသား Tools နဲ့ Workflows တို့နှင့် ကိုက်ညီမှု စစ်ဆေးပါ။

### ကိုက်ညီမှု ထိန်းသိမ်းခြင်း

ပြောင်းလဲမှု လုပ်စဥ်တွင် ရှိပြီးသား SSE Client များနှင့် ကိုက်ညီမှု ထိန်းသိမ်းရန် အကြံပြုသည်။ အချက်အလက်အချို့မှာ-

- SSE နှင့် Streamable HTTP တို့ကို အခြား endpoint များ၌ မတူညီစွာ ဖြင့် ဆက်လက်ထောက်ပံ့နိုင်ပါသည်။
- Client များကို နောက်ဆုံး သယ်ယူပို့ဆောင်မှုသို့ တဖြည်းဖြည်း ပြောင်းလဲပါ။

### စိန်ခေါ်မှုများ

ပြောင်းလဲခြင်းအတွင်း အောက်ပါ စိန်ခေါ်မှုများအား ကိုင်တွယ်စေရန် လိုအပ်ပါသည်။

- Client အားလုံးကို ပြင်ဆင်ထားမှုကို အာမခံပါ။
- သတိပေးချက် ပို့ဆောင်မှု ကွာခြားချက်များကို ကောင်းစွာ ကိုင်တွယ်ပါ။

## လုံခြုံရေးဆိုင်ရာ စဉ်းစားချက်များ

MCP တွင် Server ဖန်တီးခြင်းအခါ လုံခြုံရေးသည် အမြဲ ဦးစားပေးရမည့် အချက်ဖြစ်ပြီး Streamable HTTP ကဲ့သို့သော HTTP အခြေပြု သယ်ယူပို့ဆောင်မှုများတွင် အထူးသတိထားရပါသည်။

HTTP အခြေပြု သယ်ယူပို့ဆောင်မှုများဖြင့် MCP ဆာဗာများ ဖန်တီးသော အခါ လုံခြုံရေးသည် အရေးကြီးသော သဘောတရားတစ်ခုဖြစ်၍ မတည့်မှု အမျိုးမျိုးနှင့် ကာကွယ် ဆေးပညာများကို ဂရုစိုက်စီမံရပါသည်။

### ဖော်ပြချက်

MCP ဆာဗာများကို HTTP မှတဆင့် ထုတ်ဖော်ပြသသောအခါ လုံခြုံရေးသည် အရေးကြီးပါသည်။ Streamable HTTP သည် အသစ်သော တိုက်ခိုက်မှု မျက်နှာကြပ်များကို ဖန်တီးပေးပြီး တိကျသေချာစွာ ပြင်ဆင်ရန် လိုအပ်ပါသည်။

အောက်ပါ လုံခြုံရေးဆိုင်ရာ အကြောင်းအရာများကို ဂရုစိုက်ကြပါစို့-

- **Origin Header စစ်ဆေးခြင်း**: DNS rebinding တိုက်ခိုက်မှုများ ကာကွယ်ရန် `Origin` header ကို အမြဲ စစ်ဆေးပါ။
- **Localhost ကို ချိတ်ဆက်ခြင်း**: ဒေသတွင်း ဖွံ့ဖြိုးမှုအတွက် `localhost` မှာ ဆာဗာများကို ချိတ်ဆက်ထားပြီး အများပြည်သူအင်တာနက်ထံ ရောက်သွားမှု မရှိစေရန်။
- **အတည်ပြုခြင်း**: ထုတ်လုပ်မှုတွင် API Keys, OAuth စတဲ့ အတည်ပြုမှုနည်းလမ်းများကို ရှိစေရန်။
- **CORS**: လက်ခံခွင့်ကို ကန့်သတ်ရန် CORS မူဝါဒများကို လိုအပ်သလို ပြင်ဆင်စစ်ဆေးပါ။
- **HTTPS**: သတင်းအချက်အလက်များကို 암호화 ပြုလုပ်ရန် ထုတ်လုပ်မှုတွင် HTTPS ကို အသုံးပြုပါ။

### အကောင်းဆုံး လေ့လာသင့်သော နည်းလမ်းများ

MCP Streaming ဆာဗာတွင် လုံခြုံရေး ပြုလုပ်ရာတွင် လိုက်နာသင့်သည့် အကောင်းဆုံး လေ့လာနည်းများမှာ-

- လက်ခံမည့် မေးလ်များအား အတည်ပြုခြင်း မပြုမီ ယုံကြည်မှု မထားရပါ။
- လက်ဝင်မှုများနှင့် အမှားများအား မှတ်တမ်းတင်၍ စောင့်ကြည့်ပါ။
- လုံခြုံရေး ချို့ယွင်းချက်များကို ပြေပုံမှန် အစဉ်အမြဲ ဆော့ဗ်ဝဲ ပြုပြင်ထည့်သွင်းပါ။

### စိန်ခေါ်မှုများ

MCP Streaming ဆာဗာများတွင် လုံခြုံရေးပြုလုပ်ရာ တွေ့ကြုံရမည့် စိန်ခေါ်မှုများမှာ-

- လုံခြုံရေးနှင့် ဖွံ့ဖြိုးရေး လွယ်ကူမှုကို ချိန်ညှိရခြင်း
- မတူညီသော client ပတ်ဝန်းကျင်များနှင့် ကိုက်ညီမှု အာမခံရခြင်း

### အလုပ်အပ်မှု: ကိုယ့်ရဲ့ Streaming MCP App ကို တည်ဆောက်ပါ

**ဖြစ်ရပ်:**
MCP Server နှင့် Client တစ်ခု ထားပြီး Server တွင် အချက်စာရင်းများ (ဥပမာ- ဖိုင်များ သို့မဟုတ် စာရွက်စာတမ်းများ) ကို ကိုင်တွယ်ပြီး ဘာသာချိုင်းတိုင်း အတွက် သတိပေးချက် ပို့ပေးပါမည်။ Client တွင် ထိုသတိပေးချက်များကို ရောက်လာသလို ပြသရမည်။

**ခြေလှမ်းများ:**

1. အချက်စာရင်းကို ကိုင်တွယ်ပြီး သတိပေးချက် ပို့သည့် Server tool ကို ဖန်တီးပါ။
2. သတိပေးချက်များကို အချိန်နဲ့တပြိုင်နက် ပြသနိုင်ရန် message handler ပါသော Client ကို ဖန်တီးပါ။
3. Server နှင့် Client တွေကို ပြေးပြီး သတိပေးချက်များကို ကြည့်ရှု စစ်ဆေးပါ။

[ဖြေရှင်းချက်](./solution/README.md)

## ဆက်လက်လေ့လာရန်နှင့် နောက်တစ်ဆင့်များ

MCP Streaming နှင့် ပိုမိုကျယ်ပြန့်သော အသိပညာ တိုးချဲ့မှုအတွက် ဤအပိုင်းတွင် နောက်ထပ် ရင်းမြစ်များနှင့် ဆောင်ရွက်ရန် အကြံပြုချက်များ ပါဝင်သည်။

### ဆက်လက်လေ့လာရန်

- [Microsoft: HTTP Streaming မိတ်ဆက်](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET Core တွင် CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### နောက်တစ်ဆင့်များ

- တိကျတုန်း real-time analytics, chat သို့မဟုတ် ပူးပေါင်းတည်းဖြတ်ခြင်းအတွက် streaming အသုံးပြုသော အဆင့်မြင့် MCP tools များ ဖန်တီးကြည့်ပါ။
- MCP streaming ကို Frontend Frameworks (React, Vue, စသည်) နှင့် ပေါင်းစပ်အသုံးပြု၍ live UI updates များ လေ့လာပါ။
- နောက်တစ်ဆင့်- [VSCode အတွက် AI Toolkit ကို အသုံးပြုခြင်း](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->