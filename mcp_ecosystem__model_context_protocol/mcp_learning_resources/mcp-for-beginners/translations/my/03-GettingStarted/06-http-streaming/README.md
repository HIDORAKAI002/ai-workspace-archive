# Model Context Protocol (MCP) နှင့် HTTPS Streaming

ဤအခန်းတွင် Model Context Protocol (MCP) ကိုအသုံးပြု၍ HTTPS ဖြင့်လုံခြုံပြီး၊ ကျယ်ပြန့်နိုင်ပြီး၊ အချိန်နှင့်တပြေးညီဖြင့် Stream လုပ်နိုင်မှုကို တည်ဆောက်ခြင်းအတွက် အသေးစိတ်လမ်းညွှန်ချက်များပေးထားသည်။ Streaming ၏ ရည်ရွယ်ချက်၊အသုံးပြုနိုင်သော သယ်ယူပို့ဆောင်မှုနည်းလမ်းများ၊ MCP အတွင်း Streamable HTTP ကို ဘယ်လိုတည်ဆောက်မည်၊ လုံခြုံရေးထိရောက်မှုများ၊ SSE မှ ပြောင်းရွှေ့ခြင်းနှင့် သင်၏မြုပ်ကွင်း Streaming MCP Applications များကိုတည်ဆောက်ရန် လက်တွေ့လမ်းညွှန်ချက်များကိုဖော်ပြသည်။

> **ရှေ့ဆက်ကြည့်ရန်:** ဤစာသင်ခန်းသည် **MCP Specification 2025-11-25** အောက်ပါ Streamable HTTP ကို ဖော်ပြပါသည်၊ session တစ်ခုကို `initialize` အချိန်တွင် တည်ထောင်ပြီး `Mcp-Session-Id` header ဖြင့် ချိတ်ဆက်သည်။ `2026-07-28` ထုတ်ပိုးမည့် candidate ဗားရှင်းတွင် handshake နှင့် session ID ကို မရှိတော့ဘဲ၊ မည်သည့် server instance သို့မဆို sticky sessions မလိုအပ်ဘဲ request တစ်ခုလုံးကို ကိုယ်ပိုင်ဖြစ်စေသည်။ အသေးစိတ်များအတွက် [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) ကို ကြည့်ရှုပါ။

## MCP အတွင်း သယ်ယူပို့ဆောင်မှုနည်းလမ်းများနှင့် Streaming

ဤပိုင်းတွင် MCP တွင် ရရှိနိုင်သော သယ်ယူပို့ဆောင်မှုနည်းလမ်းများကို ရှာဖွေပြီး Streaming ချိတ်ဆက်မှုများအတွက် ၎င်းတို့၏အခန်းကဏ္ဍကို ရှင်းပြထားသည်။

### သယ်ယူပို့ဆောင်မှုနည်းလမ်း란ဘာလဲ?

သယ်ယူပို့ဆောင်မှုနည်းလမ်းတစ်ခုသည် client နှင့် server အကြား ဒေတာပြောင်းလဲခြင်းကို သတ်မှတ်ပေးသည်။ MCP သည် မတူညီသောပတ်ဝန်းကျင်များနှင့် လိုအပ်ချက်များအတွက် သယ်ယူပို့ဆောင်မှုအမျိုးအစားများစွာကို ပံ့ပိုးသည်။

- **stdio**: မည်သည့် local နှင့် CLI အခြေပြုကိရိယာများအတွက် အသင့်တော်ပြီး၊ ရိုးရှင်းသော်လည်း web သို့မဟုတ် cloud အတွက် သင့်တော်မှုမရှိပါ။
- **SSE (Server-Sent Events)**: servers မှ client မ်ားဆီသို့ HTTP ပေါ်မှ တပြိုင်နက် real-time update များကို ထုတ်ပေးနိုင်သည်။ web UI များတွင်ကောင်းသော်လည်း ကျယ်ပြန့်မြင့်မားမှုနှင့် အလွယ်တကူရေးဆွဲမှုမှာ ကန့်သတ်ချက်ရှိသည်။ MCP Specification 2025-06-18 အရ မတူညီသော SSE သယ်ယူပို့ဆောင်မှုကို ပယ်ဖျက်ပြီး "Streamable HTTP" သယ်ယူပို့ဆောင်မှုဖြင့် အစားထိုးထားသည်။
- **Streamable HTTP**: ခေတ်မီသော HTTP အခြေပြု streaming သယ်ယူပို့ဆောင်မှုဖြစ်ပြီး notification များနှင့် ကျယ်ပြန့်မှုကောင်းမွန်မှုကို ပံ့ပိုးသည်။ ထုတ်လုပ်မှုနှင့် cloud ပတ်ဝန်းကျင်များအတွက် အကြံပြုသည်။

### နှိုင်းယှဉ်ဇယား

ဤနေရာတွင် သယ်ယူပို့ဆောင်မှုနည်းလမ်းများ အကြားကွာခြားချက်များကို နားလည်နိုင်ရန် နှိုင်းယှဉ်ဇယားကို ကြည့်ရှုပါ။

| သယ်ယူပို့ဆောင်မှု | Real-time Updates | Streaming | ကျယ်ပြန့်မှု | အသုံးပြုမှုအတိုင်းအတာ             |
|-------------------|------------------|-----------|-------------|-----------------------------|
| stdio             | မဟုတ်ပါ           | မဟုတ်ပါ     | နိမ့်ပါသည်  | ဒေသခံ CLI ကိရိယာများ           |
| SSE               | ဟုတ်ပါသည်        | ဟုတ်ပါသည်   | အလယ်အလတ်      | Web၊ real-time update များ      |
| Streamable HTTP   | ဟုတ်ပါသည်        | ဟုတ်ပါသည်   | မြင့်မားသည်   | Cloud၊ multi-client သုံးမှု   |

> **အကြံပြုချက်:** သယ်ယူပို့ဆောင်မှုမှန်ကန်စွာရွေးချယ်ခြင်းသည် လုပ်ဆောင်မှု၊ ကျယ်ပြန့်မှုနှင့် အသုံးပြုသူအတွေ့အကြုံကို ထိခိုက်သည်။ **Streamable HTTP** သည် ခေတ်မီ၊ ကျယ်ပြန့်နိုင်ပြီး cloud အသင့်လျော်သော applications များအတွက် အကြံပြုသည်။

ယခင်အခန်းများတွင်မြင်တွေ့ခဲ့သော stdio နှင့် SSE သယ်ယူပို့ဆောင်မှုများအား မှတ်သားပြီး ဤအခန်းအတွက် Streamable HTTP သယ်ယူပို့ဆောင်မှုဖြစ်သည်ကို သိထားပါ။

## Streaming: အကြောင်းအရာနှင့် ရည်ရွယ်ချက်

Streaming ၏ အခြေခံ အယူအဆနှင့် ရည်ရွယ်ချက်များကို နားလည်ရခြင်းသည် အချိန်နှင့်တပြေးညီ ဆက်သွယ်မှုစနစ်များ တည်ဆောက်ရာတွင် အရေးကြီးပါသည်။

**Streaming** သည် network programming တွင် ဒေတာကို သေးငယ်၍ လွယ်ကူစွာ စီမံနိုင်သော အပိုင်းများသို့မဟုတ် ဖြစ်ရပ်များစဉ်အနေဖြင့် တစ်ခုချင်းစီ ပို့ဆောင်ခြင်းနည်းဖြစ်ပြီး မပြည့်စုံသော တုံ့ပြန်ချက်တစ်ခုပြင် ဆောင်ရွက်ရန်ကို ခဲယဉ့်စေသည်။ ၎င်းသည် အထူးသဖြင့်အတွက် အသုံးဝင်ပါသည် -

- ကြီးမားသော ဖိုင်များ သို့မဟုတ် ဒေတာစုဆောင်းမှုများအတွက်။
- အချိန်နှင့်တပြေးညီ ပြောင်းလဲအပ်ဒိတ်များ (ဥပမာ - စကားပြော၊ တိုးတက်မှုအစီရင်ခံချက်များ) မှုတွင်။
- ရှည်လျားသော တွက်ချက်နည်းများအတွက် အသုံးပြုသူအား သတင်းအချက်အလက်ပေးနိုင်ရန်။

Streaming ၏ အဓိက သိရန်အချက်များမှာ -

- ဒေတာများကို တပြိုင်နက်ဖြင့် မပို့ဘဲ တစ်စိတ်တစ်ပိုင်းစီ တင်ပို့သည်။
- client သည် ထွက်ရှိလာသည့် ဒေတာကို ချက်ချင်း စစ်ဆေးနိုင်သည်။
- စောင့်ဆိုင်းရာအချိန်ကို လျှော့ချပြီး အသုံးပြုသူအတွေ့အကြုံကို တိုးတက်စေသည်။

### Streaming ကို ဘာကြောင့် အသုံးပြုသနည်း?

Streaming အသုံးပြုရန် အကြောင်းအရင်းများမှာ အောက်ပါအတိုင်းဖြစ်သည် -

- အသုံးပြုသူများ အချက်အလက်များကို ချက်ချင်း ရယူနိုင်သည့်အတွက်၊ အဆုံးမို့်သာမဟုတ်။
- အချိန်နှင့်တပြေးညီ အပလီကေးရှင်းများနှင့် တုံ့ပြန်နိုင်သော UI များကိုEnable လုပ်သည်။
- ကွန်ရက်နှင့် ကွန်ပျူတာအရင်းအမြစ်များ အသုံးပြုမှု ထိရောက်စေသည်။

### ရိုးရှင်းသောဥပမာ: HTTP Streaming Server & Client

Streaming ကို မည်သို့ တည်ဆောက်နိုင်သည့် ရိုးရှင်းသော ဥပမာတစ်ခု

#### Python

**Server (Python၊ FastAPI နှင့် StreamingResponse ကိုအသုံးပြု၍):**

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

**Client (Python၊ requests ကိုသုံး၍):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

ဤဥပမာတွင် server သည် မျက်နှာပြင်တွင် စတင်ရရှိလာသည့် မက်ဆေ့ချ်များကို client ကိုပို့သည်၊ တစ်ခြားမက်ဆေ့ချ်များ ကြိုတင်စောင့်ဆိုင်းခြင်းမရှိဘဲဖြစ်သည်။

**သဘောတရား:**

- server သည် မက်ဆေ့ချ်တစ်ခုစီ မှီတည်ပေးသည်။
- client သည် လာရောက်သည့် chunk တစ်ခုစီကို လက်ခံပြီး မျက်နှာပြင်တွင် ပြသသည်။

**လိုအပ်ချက်များ:**

- server က streaming response (ဥပမာ - FastAPI ရဲ့ `StreamingResponse`) ကို သုံးရပါမည်။
- client သည် response ကို stream အဖြစ် ကိုင်တွယ်ရမည် (`stream=True` requests ထဲတွင်)။
- Content-Type သည် ပုံမှန်အားဖြင့် `text/event-stream` သို့မဟုတ် `application/octet-stream` ဖြစ်နိုင်သည်။

#### Java

**Server (Java၊ Spring Boot နှင့် Server-Sent Events ကိုသုံး၍):**

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

**Client (Java၊ Spring WebFlux WebClient ကိုသုံး၍):**

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

**Java Implementation မှတ်ချက်များ:**

- Spring Boot ရဲ့ reactive stack ကို `Flux` ဖြင့် streaming အတွက်အသုံးပြုသည်။
- `ServerSentEvent` သည် အခြေခံတည့်မြောက်သော event types နှင့်အတူ event streaming ပေးသည်။
- `WebClient` နှင့် `bodyToFlux()` သည် reactive streaming ကိုအသုံးပြုခြင်း ကို ခွင့်ပြုသည်။
- `delayElements()` သည် event များအကြား လုပ်ဆောင်ချိန်ကို လိုက်ဖက်စေနိုင်သည်။
- event များကို စစ်တမ်းရရှိခြင်းအတွက် type များ (`info`, `result`) သတ်မှတ်နိုင်သည်။

### နှိုင်းယှဉ်ခြင်း: ရိုးရာ Streaming နှင့် MCP Streaming

Streaming မှာ "ရိုးရာ" နည်းပြနည်းနှင့် MCP ၏ streaming လုပ်ငန်းစဉ်များ သဘောတရားကွာခြားချက်များကို အောက်ပါပုံစံအတိုင်း ဖော်ပြနိုင်သည်။

| လက္ခဏာ                | ရိုးရာ HTTP Streaming           | MCP Streaming (Notifications)     |
|------------------------|-------------------------------|----------------------------------|
| အဓိကတုံ့ပြန်ချက်      | chunked                       | တစ်ခါတည်း၊ အဆုံးတွင်          |
| တိုးတက်မှု update      | ဒေတာ chunk များအဖြစ် ပေးပို့ | notification များအဖြစ် ပေးပို့   |
| client လိုအပ်ချက်    | stream ကို အဆင်ပြေတာ ဖြစ်ရမည် | message handler ကို တည်ဆောက်ရမည် |
| သုံးစွဲမှုအပေါ်        | ကြီးမားသော ဖိုင်များ၊ AI token streams | တိုးတက်မှု၊ မှတ်တမ်းများ၊ အချိန်နဲ့တပြေးညီ တုံ့ပြန်ချက် |

### ဖော်ပြထားသော အောက်တိုဘာအချက်များ

ထပ်ပြီး မူလကွာခြားချက်များ အချို့မှာ အောက်ပါအတိုင်းဖြစ်သည်-

- **ဆက်သွယ်မှု ပုံစံ:**
  - ရိုးရာ HTTP streaming: ဒေတာ chunk များကို ရိုးရှင်းသော chunked transfer encoding ဖြင့် ပို့ဆောင်သည်။
  - MCP streaming: JSON-RPC protocol ဖြင့် ဖွဲ့စည်းထားသော notification စနစ်ကို အသုံးပြုသည်။

- **မက်ဆေ့ချ် ပုံစံ:**
  - ရိုးရာ HTTP: စာသား chunks များနှင့် newlines ရှိသည်။
  - MCP: metadata ပါရှိသော LoggingMessageNotification ဖွဲ့စည်းမှုရှိသည်။

- **Client တည်ဆောက်မှု:**
  - ရိုးရာ HTTP: Streaming responses ကို လွယ်ကူစွာ ကုန်ကျစရိတ်နည်း client ဂရမ်တစ်ခု။
  - MCP: မက်ဆေ့ခ်် handler တည်ဆောက်ထားပြီး မက်ဆေ့ချ်များအမျိုးမျိုးကို ချဉ်းကပ်ထားတတ်သည်။

- **တိုးတက်မှု update များ:**
  - ရိုးရာ HTTP: တိုး တက်မှုသည် အဓိက response stream အတွင်း ဖြစ်သည်။
  - MCP: တိုးတက်မှုနှင့်ပြီးဆုံးမှုကို notification မက်ဆေ့ချ်များ ခွဲခြားပေးသည်။

### အကြံပြုချက်များ

ရိုးရာ streaming (ဥပမာ `/stream` endpoints ကို ကျွန်ုပ်တို့ပြသခဲ့သော) နှင့် MCP streaming ၏ မတူမှုများအပေါ် အောက်ပါအကြံပြုချက်များ ရှိပါသည်။

- **ရိုးရှင်းသော streaming လိုအပ်ချက်များအတွက်:** ရိုးရာ HTTP streaming သည် ရိုးရှင်းပြီး အခြေခံ streaming လိုအပ်ချက်များအတွက် လုံလောက်သည်။

- **ရှုပ်ထွေးပြီး မျက်နှာပြင်နှင့် interactive အပလီကေးရှင်းများအတွက်:** MCP streaming သည် ဗဟုဂ္ဂ နှင့် ပို၍ ဖွဲ့စည်းတည်ဆောက်နိုင်စိတ်တိုင်းကျ ဥပမာများကို ပေးသည်။

- **AI လုပ်ဆောင်ချက်များအတွက်:** MCP ၏ notification စနစ်သည် ရှည်လျားသော AI စီမံခြင်းများအတွက် အသုံးဝင်ပြီး၊ အသုံးပြုသူများကို တိုးတက်မှုများကို ထာဝရအသိပေးနိုင်သည်။

## MCP အတွင်း Streaming

အခုထိ အကြံပြုချက်များနှင့် နှိုင်းယှဉ်ချက်များကို ကြည့်ခဲ့သည့်အချိန်၊ MCP အတွင်း Streaming ကို ကြည့်ပါမည်။

Streaming ကို MCP framework အတွင်း မည်သို့ လုပ်ဆောင်ကြောင်း နားလည်ခြင်းသည် ရှည်လျားသော လုပ်ငန်းစဉ်များအတွင်း အသုံးပြုသူများအား အချိန်နှင့်တပြေးညီ တုံ့ပြန်ချက်ပေးနိုင်သည့် တုံ့ပြန်မှုရှိသော application များ တည်ဆောက်ရန် အရေးကြီးပါသည်။

MCP တွင် streaming သည် အဓိက တုံ့ပြန်ချက်ကို chunk များအဖြစ် မပို့ပဲ၊ တခုခုကိရိယာတစ်ခုသည် request ကို ဆောင်ရွက်နေစဉ် client ဆီသို့ **notification များ** ပို့ခြင်းဖြစ်သည်။ ဤ notification များတွင် တိုးတက်မှု update များ၊ log များ သို့မဟုတ် အခြားဖြစ်ရပ်များ ပါဝင်နိုင်သည်။

### လုပ်ဆောင်ပုံ

နောက်ဆုံးရလဒ်သည် ထပ်မံတစ်ခုသော ပြန်လည်တုံ့ပြန်ချက်အဖြစ် ပေးပို့သည်။ သို့သော် notification များကို လုပ်ငန်းစဉ်မှောက်တွင် အမြဲတမ်း ပေးပို့နိုင်ပြီး client ကို အချိန်နှင့်တပြေးညီ အသိပေးသွားနိုင်သည်။ client သည် ဤ notification များကို ကိုင်တွယ် ပြသနိုင်ရမည်။

## Notification란ဘာလဲ?

"Notification" ဟုခေါ်ဆိုသည်မှာ MCP context တွင်သည်သို့ ဆိုလိုသည်။

Notification သည် တစ်စဉ်ဆက်မပြတ် လုပ်ငန်းစဉ်အတွင်း တိုးတက်မှု၊ အနေအထား သို့မဟုတ် အခြားဖြစ်ရပ်များ အကြောင်း အသိပေးရန် server က client ဆီသို့ပို့သော မက်ဆေ့ချ်တစ်ခုဖြစ်သည်။ Notification များသည် ပြတ်သားမှုနှင့် အသုံးပြုသူအတွေ့အကြုံ တိုးတက်စေသည်။

ဥပမာအားဖြင့် client က server နှင့် အစပြု handshake ပြုလုပ်ပြီးနောက် တစ်ကြိမ် notification ပို့ပေးရမည်။

Notification သည် JSON မက်ဆေ့ချ်အနေဖြင့် အောက်ပါအတိုင်း ဖြစ်သည် -

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifications သည် MCP တွင် ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) ဟုခေါ်သော topic ထဲသို့ ဆက်စပ်သည်။

Logging ကို အလုပ်လုပ်စေရန် server သည် အောက်ပါအတိုင်း feature/capability ဖြင့် လုပ်ဆောင်ရသည် -

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> သုံးထားသော SDK အလိုက် logging သည် ပုံမှန်အားဖြင့် ဖွင့်ထားနိုင်ပြီး၊ သို့မဟုတ် သင်၏ server configuration တွင် သေချာစွာ ဖွင့်ထားရနိုင်သည်။

Notification များအမျိုးအစား များစွာ ရှိသည်-

| အဆင့်      | ဖော်ပြချက်                      | ဥပမာအသုံးပြုမှု                  |
|------------|-------------------------------|-----------------------------------|
| debug      | အသေးစိတ် debugging အချက်အလက်များ | function ဝင်/ထွက်အချက်များ        |
| info       | သာလွန်သော အသိပေးမက်ဆေ့ချ်များ     | လုပ်ငန်းစဉ် တိုးတက်မှုပြုချက်များ  |
| notice     | ပုံမှန် ဖြစ်ရပ် အရေးကြီးများ      | configuration ပြောင်းလဲမှုများ     |
| warning    | သတိပေးမှုအခြေအနေများ             | အသုံးမပြုသင့် feature များ      |
| error      | အမှားအခြေအနေများ                  | လုပ်ငန်းခွင် ပျက်ကွက်မှုများ       |
| critical   | အရေးကြီး အခြေအနေများ              | စနစ် အစိတ်အပိုင်း မအောင်မြင်မှုများ  |
| alert      | ချက်ချက် လုပ်ဆောင်ရန်လိုအပ်မှု        | ဒေတာ ပျက်စီးမှု ရှိနေသည်         |
| emergency  | စနစ်အသုံးမပြုနိုင်နေခြင်း             | စနစ်မှ ပျက်ကွက်မှု အပြည့်အစုံ     |

## MCP တွင် Notification များ တည်ဆောက်ခြင်း

MCP တွင် notification များ လုပ်ဆောင်ရန် server နှင့် client နှစ်ဖက်လုံးကို real-time update များကို ကိုင်တွယ်ပေးရန် ပြင်ဆင်လိုသည်။ ၎င်းသည် သင်၏ application မှ အသုံးပြုသူများအား ရောင့်ရဲသော feedback များပေးနိုင်စေသည်။

### Server ဘက်: Notification ပို့ခြင်း

Server ဘက်မှ စတင်ပါမည်။ MCP တွင် tool များကို request များကို ဆောင်ရွက်နေစဉ် notification များ ပို့နိုင်ရန် သတ်မှတ်ထားသည်။ server သည် context object (`ctx`) ကို အသုံးပြုပြီး client သို့ မက်ဆေ့ချ်များပို့သည်။

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

ဤဥပမာတွင် `process_files` tool သည် ဖိုင်တစ်ခုစီကို ဆက်လက်ဆောင်ရွက်စဉ် client သို့ notification သုံးခု ပို့သည်။ `ctx.info()` method ကို သတင်းအချက်အလက် မက်ဆေ့ချ်ပို့ရန် အသုံးပြုသည်။

ထို့အပြင်၊ notification များ အကျိုးရှိရန် server အနေဖြင့် streaming transport (ဥပမာ `streamable-http`) ကို အသုံးပြုရမည်၊ client သည် notification များကို ကုန်ကျစရိတ်နည်း message handler ဖြင့် ကိုင်တွယ်ရမည်။ ၎င်း server ကို `streamable-http` transport သုံးစေဖို့ ဘယ်လိုပြင်ဆင်မည်ဆိုတာ အောက်ပါအတိုင်းဖြစ်ပါသည် -

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

ဤ .NET ဥပမာတွင် `ProcessFiles` tool ကို `Tool` attribute ဖြင့် အလှဆင်ထားပြီး ခေါ်ဆိုချက်ပြုသည့် ဖိုင်တစ်ခုစီအတွက် notification သုံးခု client ဆီပို့သည်။ `ctx.Info()` method ကို သတင်းအချက်အလက် မက်ဆေ့ချ်ပို့ရန် အသုံးပြုသည်။

.NET MCP server တွင် notification များ enable လုပ်ရန် streaming transport ကို သုံးနေကြောင်း သေချာစေပါ။

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Client ဘက်: Notification လက်ခံခြင်း

client သည် လာရောက်သော notification မက်ဆေ့ချ်များကို process ပြုလုပ်ၿပီး ပြသရန် message handler တည်ဆောက်ထားရမည်။

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

အထက်ဖော်ပြထားသော code တွင် `message_handler` function သည် မက်ဆေ့ချ်သည် notification ဖြစ်ပါက ပြသပြီး မဟုတ်ပါက ကွဲပြားသော server message အဖြစ် ကိုင်တွယ်သည်။ `ClientSession` ကို notification များ ကိုင်တွယ်ရန် `message_handler` ဖြင့် စတင်သည်ကို သတိပြုပါ။

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

ဤ .NET ဥပမာတွင်, `MessageHandler` function သည် မက်ဆေ့ချ်သည် notification ဖြစ်ပါက ပြသပြီး မဟုတ်ပါက server message အဖြစ် ကုန်ကျစရိတ်နေသည်။ `ClientSessionOptions` ဖြင့် `ClientSession` ကို message handler ဖြင့် initialize ပြုလုပ်သည်။

Notification သုံးနိုင်ရန် server သည် streaming transport ကို အသုံးပြုမည်၊ client သည် notification မက်ဆေ့ချ်များ ကိုင်တွယ်ရန် message handler တည်ဆောက်ထားရမည်။

## တိုးတက်မှု Notification များ နှင့် အခြေအနေများ

ဤပိုင်းတွင် MCP တွင် တိုးတက်မှု notification သဘောတရား၊ ၎င်း၏ အရေးပါမှုနှင့် Streamable HTTP ဖြင့် လုပ်ဆောင်နည်းကို ရှင်းပြကာ မိမိနားလည်မှုအား ပိုမိုမြှင့်တင်ရန် လက်တွေ့လေ့ကျင့်မှုအစီအစဉ်တစ်ခုလည်း ပါဝင်သည်။

တိုးတက်မှု notification များသည် ရှည်လျားသော လုပ်ငန်းစဉ်များအတွင်း server က client ဆီသို့ အချိန်နှင့်တပြေးညီ ပို့သည့် မက်ဆေ့ချ်များဖြစ်သည်။ လုပ်ငန်းစဉ်ပြီးဆုံးမချင်း ကန့်သတ်မထားဘဲ client ကို လက်ရှိအခြေအနေများအကြောင်း အမြဲတမ်းသိရှိစေသည်။ ၎င်းသည် အပြတ်သားမှု၊ အသုံးပြုသူအတွေ့အကြုံ တိုးတက်မှုနှင့် debugging လွယ်ကူမှုများ ဖြစ်စေသည်။

**ဥပမာ:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### တိုးတက်မှု Notification များ ဘာကြောင့် အသုံးပြုသနည်း?

တိုးတက်မှု notification များ လိုအပ်ခြင်းများမှာ အောက်ပါအတိုင်း ဖြစ်သည် -

- **အသုံးပြုသူအတွေ့အကြုံ တိုးတက်မှု:** လုပ်ငန်းစဉ် တိုးတက်မှု အချိန်တိုင်း အချက်အလက် ပေးသည်။
- **အချိန်နှင့်တပြေးညီ အမြန်တုံ့ပြန်မှု:** Clients များသည် တိုးတက်မှုကြောင်း ကို ကြည့်နိုင်လိုက်သည်။
- **debugging နှင့် စောင့်ကြည့်မှု လွယ်ကူမှု:** Developer များနှင့် အသုံးပြုသူများသည် လုပ်ငန်းနှေးကွေးသည့်နေရာကို ကြည့်နိုင်သည်။

### တိုးတက်မှု Notification များ မည်သို့ တည်ဆောက်မည်

MCP တွင် တိုးတက်မှု notification များကို အောက်ပါအတိုင်း တည်ဆောက်နိုင်သည် -

- **Server ပေါ်တွင်:** `ctx.info()` သို့မဟုတ် `ctx.log()` ကို အသုံးပြု၍ တစ်ခုချင်း ဥစ္စရာကို process လုပ်စဉ် notification ပို့သည်။ ဤနည်းဖြင့် အဓိကရလဒ် ပြီးရန် အရှေ့တွင် client သို့ မက်ဆေ့ချ်ပို့နိုင်သည်။
- **Client ပေါ်တွင်:** notification များထွက်လာတိုင်း နားဆင်အသိပေး ပြသရန် message handler တည်ဆောက်ထားသည်။ handler သည် notification နှင့် နောက်ဆုံးရလဒ်ကို ခွဲခြားကူညီသည်။

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

## လုံခြုံရေး ထည့်သွင်းစဉ်းစားချက်များ

MCP ရဲ့ HTTP အခြေပြု သယ်ယူပို့ဆောင်မှုများ အသုံးပြုရာတွင် လုံခြုံရေးသည် အလွန်အရေးကြီးပြီး အကာအကွယ်စနစ်အမျိုးမျိုးနှင့် လုံခြုံရေးအန္တရာယ်များကို ဂရုစိုက်ရမည်ဖြစ်သည်။

### မျက်နှာဖုံးအမြင်

MCP server များကို HTTP တက်ပြု လျှင် လုံခြုံရေးသည် အရေးပါသည်။ Streamable HTTP သည် အန္တရာယ်များ အသစ်ကို ဖန်တီးပြီး သေချာစွာ ပြင်ဆင်သင့်သည်။

### အချက်အလက်များ


- **Origin Header အတည်ပြုခြင်း**: DNS rebinding တိုက်ခိုက်မှုများကိုကာကွယ်ရန် `Origin` header ကို အမြဲတမ်း အတည်ပြုပါ။
- **Localhost Binding**: ဒေသတွင်းဖန်တီးမှုအတွက် server များကို `localhost` တွင် binding လုပ်ကာ အများပြည်သူအင်တာနက်သို့ ဖော်ပြခြင်းမှ ကာကွယ်ပါ။
- **Authentication**: ထုတ်လုပ်မှုအတွက် authentication (ဥပမာ - API key များ၊ OAuth) ကို အသုံးပြုပါ။
- **CORS**: လက်လှမ်းမမြှောက်နိုင်ရေးအတွက် Cross-Origin Resource Sharing (CORS) ကို configure လုပ်ပါ။
- **HTTPS**: ထုတ်လုပ်မှုတွင် HTTPS ကို အသုံးပြုကာ အချက်အလက်များကို စာချုပ်ရေးပါ။

### အကောင်းဆုံး လုပ်ထုံးလုပ်နည်းများ

- လာရောက်တဲ့ 요청 များကို အတည်ပြုမှုမရှိရင် မယုံကြည်ပါနှင့်။
- ဝင်ရောက်မှုနှင့် အမှားများအားလုံးကို မှတ်တမ်းတင်ပြီး မျက်မြင်ရေးဆွဲပါ။
- လုံခြုံရေးအန္တရာယ်များကို ပြောင်းလဲကာကွယ်ရန် အချိန်နှင့်တပြေးညီ dependencies များအား update လုပ်ပါ။

### စိန်ခေါ်မှုများ

- လုံခြုံရေးနှင့် ဖွံ့ဖြိုးတိုးတတ်မှု လွယ်ကူမှုတို့ကို စပ်ဆိုင်ညှိနှိုင်းရခြင်း
- မတူညီသော client ပတ်ဝန်းကျင်များနှင့် ကိုက်ညီမှု သေချာစေရန်

## SSE မှ Streamable HTTP သို့ အဆင့်မြှင့်တင်ခြင်း

ယခုအချိန်တွင် Server-Sent Events (SSE) ကို အသုံးပြုနေသည့် application များအတွက် Streamable HTTP သို့ ပြောင်းရွှေ့ခြင်းဖြင့် ပိုမိုတိုးတက်သော စွမ်းဆောင်ရည်များ နှင့် MCP ဂျီသည်ဖြစ်စေမှုအတွက် ပိုမိုကြာရှည်ခံနိုင်မှုရရှိစေပါသည်။

### အဆင့်မြှင့်တင်ရခြင်းအကြောင်းရင်း

SSE မှ Streamable HTTP သို့ အဆင့်မြှင့်ရန် အကြောင်းရင်း အနည်းငယ်ရှိသည်။

- Streamable HTTP သည် SSE ထက် ပိုမိုချဲ့ထွင်နိုင်မှု၊ ကိုက်ညီမှုနှင့် အသိပေးမှုများ ပိုမိုအောင်မြင်စေသည်။
- အသစ် MCP application များအတွက် အကြံပြုသည့် ပို့ဆောင်ရေးနည်းလမ်းဖြစ်သည်။

### အဆင့်မြှင့်တင်ခြင်း လုပ်ထုံးလုပ်နည်း

MCP application များတွင် SSE မှ Streamable HTTP သို့ ပြောင်းရွှေ့ရန် နည်းလမ်းများမှာ -

- `mcp.run()` တွင် `transport="streamable-http"` အသုံးပြုရန် server code ကို update လုပ်ပါ။
- SSE client အစား `streamablehttp_client` ကို client code တွင် အသုံးပြုရန် update လုပ်ပါ။
- အသိပေးမှုများကို ကြားနာရန် client တွင် message handler တစ်ခု ဆောင်ရွက်ပါ။
- ရှိပြီးသား tool များနှင့် workflow များနှင့် ကိုက်ညီမှု ရှိသည်ကို စစ်ဆေးပါ။

### ကိုက်ညီမှု ကာကွယ်ထိန်းသိမ်းခြင်း

ပြောင်းရွှေ့နေစဉ် တာဝန်ယူ clients များ၏ ကိုက်ညီမှုကို ထိန်းသိမ်းရန် အကြံပြုပါသည်။ နည်းလမ်းအချို့မှာ -

- SSE နှင့် Streamable HTTP နှစ်ခုလုံးကို endpoint မတူကွဲပြားသောနေရာများတွင် လုပ်ဆောင်နိုင်စေရန်ပံ့ပိုးနိုင်သည်။
- clients များကို သင့်သင့်သတ်မှတ်ထားသော transport သို့ ဆက်ရှိစွာ ပြောင်းရွှေ့ပါ။

### စိန်ခေါ်မှုများ

ပြောင်းရွှေ့မှုကာလတွင် အောက်ပါ စိန်ခေါ်မှုများကို ဖြေရှင်းရမည် -

- clients အားလုံး update လုပ်ပြီး သေချာစေရန်
- အသိပေးမှု ပို့ဆောင်မှု ကွာခြားချက်များကို ကိုင်တွယ်ရမည်

## လုံခြုံရေး စဥ်းစားချက်များ

MCP အတွက် server များကို ရေးဆွဲရာတွင်၊ အထူးသဖြင့် Streamable HTTP ကဲ့သို့ HTTP ပေါ်တွင် transport များ အသုံးပြုတဲ့အခါ လုံခြုံရေးအရေးကြီးသည်။

MCP server များကို HTTP အခြေခံ transport များဖြင့် ထည့်သွင်းရာတွင် လုံခြုံရေးသည် အရေးကြီးပြီး တစ်နည်းတစ်ဖက်တိုက်ခိုက်မှုများနှင့် ကာကွယ်နည်းများအား ဂရုပြုစောင့်ကြည့် ဖို့လိုတယ်။

### အကျဉ်းချုပ်

MCP server များကို HTTP ဖြင့် ထုတ်ပြန်ရာ လုံခြုံရေး သေချာစေရန် မဖြစ်မနေ လိုအပ်သည်။ Streamable HTTP သည် ဂရုစိုက်ရမည့် ဟာတွေနေရာအသစ်များ ပေါ်ပါးစေပြီး သေချာစွာ configure လုပ်ရမည်။

အဓိက လုံခြုံရေး စဥ်းစားချက်များမှာ -

- **Origin Header အတည်ပြုခြင်း**: DNS rebinding တိုက်ခိုက်မှုတွေမှ ကာကွယ်ရန် `Origin` header ကို အမြဲစစ်ဆေးပါ။
- **Localhost Binding**: ဒေသတွင်းဖန်တီးမှုအတွက် server များကို `localhost` တွင် ဖြုတ်ချုပ်ကာ အများပြည်သူအင်တာနက်က မမြင်ရစေရန်။
- **Authentication**: ထုတ်လုပ်မှုတွင် authentication (ဥပမာ - API keys, OAuth) ကို အကောင်အထည်ဖော်ပါ။
- **CORS**: လက်လှမ်းမရနိုင်ရေးအတွက် Cross-Origin Resource Sharing (CORS) ကို ဉီးစားပေး configure လုပ်ပါ။
- **HTTPS**: ထုတ်လုပ်မှုတွင် HTTPS ကို အသုံးပြုကာ သတင်းအချက်အလက်များကို စာချုပ်ရေးပါ။

### အကောင်းဆုံး လုပ်ထုံးလုပ်နည်းများ

MCP streaming server တွင် လုံခြုံရေးဆောင်ရွက်ရာ၌ လိုက်နာသင့်သော အကောင်းဆုံး အကြံပြုချက်များမှာ -

- လာရောက်တောင်းဆိုမှုများအား အတည်ပြုချက်မရှိရင် ယုံကြည်ဘူး။
- ဝင်ရောက်ခြင်း နှင့် အမှားများအား စနက်စာတမ်းတင်ကာ စောင့်ကြည့်ပါ။
- လုံခြုံရေး အန္တရာယ်များ ပြုပြင်ဖို့ လေ့လာ၍ dependencies များအား အကြိမ်ကြိမ် update လုပ်ပါ။

### စိန်ခေါ်မှုများ

MCP streaming server များတွင် လုံခြုံရေး ဆောင်ရွက်စဉ် တွေ့ကြုံရမည့် စိန်ခေါ်မှုများမှာ -

- လုံခြုံရေး နှင့် ဖွံ့ဖြိုးတိုးတတ်မှု လွယ်ကူမှုတို့ကို လျှော့ချမှုပြုရန်။
- မတူညီသော client ပတ်ဝန်းကျင်များနှင့် ကိုက်ညီမှု သေချာစေရန်။

### တာဝန်ပေးချက် - သင့်ကိုယ်ပိုင် Streaming MCP app တည်ဆောက်ပါ

**အခြေအနေ:**
ပစ္စည်းစာရင်း တစ်ခုအား server ပိုင်းတွင် ဖြေရှင်းကာ item တစ်ခုချင်းစီအတွက် အသိပေးမှု ပို့ သည့် MCP server နှင့် client တစ်ခု တည်ဆောက်ပါ။ client သည် အသိပေးချက် တစ်ခုချင်းစီကို ရောက်ရှိလာသည့်အခါ ပြသရမည်။

**အဆင့်များ:**

1. ပစ္စည်းစာရင်းကို ဖြေရှင်းကာ item တစ်ခုချင်းစီအတွက် အသိပေးမှု ပို့သည့် server tool တည်ဆောက်ပါ။
2. အသိပေးချက်များကို real-time တွင် ပြသရန် message handler ပါရှိသော client ကို တည်ဆောက်ပါ။
3. server နှင့် client ကို နှစ်ဖက်လုံး စမ်းသပ်၍ အသိပေးချက်များကို ကြည့်ရှုပါ။

[Solution](./solution/README.md)

## နောက်ထပ်ဖတ်ရှုရန် & နောက်ဘာလုပ်မလဲ?

MCP streaming နှင့် ပက်သက်ပြီး သင်၏ knowledge ကို တိုးချဲ့ရန် နှင့် အသေးစိတ် တီထွင်မှုအတွက် ဤအပိုင်းတွင် နောက်ထပ် အရင်းအမြစ်များနှင့် အကြံပြုချက်များ ပါဝင်သည်။

### နောက်ထပ်ဖတ်ရှုရန်

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### နောက်တစ်ခုဘာလုပ်မလဲ?

- Streaming ကို အသုံးပြု၍ real-time analytics, chat, သို့မဟုတ် အတူတူ တည်းဖြတ်ခြင်းတို့အတွက် ပိုမိုအဆင့်မြှင့် MCP tools များ တည်ဆောက်ကြည့်ပါ။
- MCP streaming ကို frontend framework များ (React, Vue, စသည်) နှင့်ပိုမိုပေါင်းစည်းကာ live UI update များ ပြုလုပ်ပါ။
- နောက်တစ်ဆင့်: [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->