# Sampling - delegera funktioner till Klienten

> **Nedtrappningsmeddelande:** MCP-specifikationskandidatversionen `2026-07-28` markerar Sampling som nedgraderat till förmån för direkt integration med LLM-leverantörers API:er. Sampling fortsätter fungera i versionen `2025-11-25` och åtminstone ett år efter eventuell formell nedtrappning, så allt i den här lektionen förblir giltigt — men nya serverdesigner bör utvärdera ersättningsmönstret. Se [Vad som ändras i MCP: Release Candidate 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Ibland behöver MCP-klienten och MCP-servern samarbeta för att uppnå ett gemensamt mål. Du kan ha ett fall där servern behöver hjälp av en LLM som finns på klienten. För detta scenario är Sampling det du bör använda.

Låt oss utforska några användningsfall och hur man bygger en lösning som involverar sampling.

## Översikt

I den här lektionen fokuserar vi på att förklara när och var Sampling ska användas och hur man konfigurerar det.

## Lärandemål

I detta kapitel kommer vi att:

- Förklara vad Sampling är och när det ska användas.
- Visa hur man konfigurerar Sampling i MCP.
- Ge exempel på Sampling i praktiken.

## Vad är Sampling och varför använda det?

Sampling är en avancerad funktion som fungerar på följande sätt:

```mermaid
sequenceDiagram
    participant User
    participant MCP Client
    participant LLM
    participant MCP Server

    User->>MCP Client: Författarblogginlägg
    MCP Client->>MCP Server: Verktygsanrop (utkast till blogginlägg)
    MCP Server->>MCP Client: Urvalsforespörgan (skapa sammanfattning)
    MCP Client->>LLM: Generera sammanfattning av blogginlägg
    LLM->>MCP Client: Sammanfattningsresultat
    MCP Client->>MCP Server: Urvalsrespons (sammanfattning)
    MCP Server->>MCP Client: Komplett blogginlägg (utkast + sammanfattning)
    MCP Client->>User: Blogginlägg klart
```

### Sampling-begäran

Okej, nu när vi har en övergripande bild av ett trovärdigt scenario, låt oss prata om sampling-begäran som servern skickar tillbaka till klienten. Så här kan en sådan begäran se ut i JSON-RPC-format:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "Create a blog post summary of the following blog post: <BLOG POST>"
        }
      }
    ],
    "modelPreferences": {
      "hints": [
        {
          "name": "claude-3-sonnet"
        }
      ],
      "intelligencePriority": 0.8,
      "speedPriority": 0.5
    },
    "systemPrompt": "You are a helpful assistant.",
    "maxTokens": 100
  }
}
```

Det finns några saker här som är värda att lyfta fram:

- Prompt, under content -> text, är vår prompt som är en instruktion till LLM att sammanfatta blogginnehåll.

- **modelPreferences**. Denna sektion är just det, en preferens, en rekommendation om vilken konfiguration som ska användas med LLM. Användaren kan välja att följa dessa rekommendationer eller ändra dem. I detta fall finns rekommendationer om vilken modell som ska användas samt prioritet för hastighet och intelligens.
- **systemPrompt**, detta är din vanliga systemprompt som ger din LLM en personlighet och innehåller vägledande instruktioner.
- **maxTokens**, detta är en annan egenskap som används för att ange hur många tokens som rekommenderas för denna uppgift.

### Sampling-svar

Detta svar är vad MCP-klienten slutligen skickar tillbaka till MCP-servern och är resultatet av att klienten anropar LLM, väntar på svaret och sedan konstruerar detta meddelande. Så här kan det se ut i JSON-RPC:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "role": "assistant",
    "content": {
      "type": "text",
      "text": "Here's your abstract <ABSTRACT>"
    },
    "model": "gpt-5",
    "stopReason": "endTurn"
  }
}
```

Notera hur svaret är en abstrakt sammanfattning av blogginlägget precis som vi bad om. Notera också att den använd modell som använts inte är den vi bad om utan "gpt-5" istället för "claude-3-sonnet". Detta för att illustrera att användaren kan ändra sig angående vad som ska användas och att din sampling-begäran är en rekommendation.

Okej, nu när vi förstår huvudflödet, och den användbara uppgiften att använda det för "blogginläggsskapande + abstrakt", låt oss se vad vi behöver göra för att få det att fungera.

### Meddelandetyper

Sampling-meddelanden är inte begränsade till bara text utan du kan också skicka bilder och ljud. Så här ser JSON-RPC ut annorlunda:

**Text**

```json
{
  "type": "text",
  "text": "The message content"
}
```

**Bildinnehåll**

```json
{
  "type": "image",
  "data": "base64-encoded-image-data",
  "mimeType": "image/jpeg"
}
```

**Ljudinnehåll**

```json
{
  "type": "audio",
  "data": "base64-encoded-audio-data",
  "mimeType": "audio/wav"
}
```

> NOTERING: för mer detaljerad information om Sampling, kolla in [officiell dokumentation](https://modelcontextprotocol.io/specification/2025-11-25/client/sampling)

## Hur man konfigurerar Sampling i klienten

> Notera: om du bara bygger en server behöver du inte göra mycket här.

I en klient måste du specificera följande funktion så här:

```json
{
  "capabilities": {
    "sampling": {}
  }
}
```

Detta kommer sedan att plockas upp när din valda klient initialiseras med servern.

## Exempel på Sampling i praktiken - Skapa ett blogginlägg

Låt oss koda en sampling-server tillsammans, vi behöver göra följande:

1. Skapa ett verktyg på servern.
1. Detta verktyg ska skapa en sampling-begäran
1. Verktyget ska vänta på att klientens sampling-begäran besvaras.
1. Sedan ska verktygets resultat produceras.

Låt oss se på koden steg för steg:

### -1- Skapa verktyget

**python**

```python
@mcp.tool()
async def create_blog(title: str, content: str, ctx: Context[ServerSession, None]) -> str:
    """Create a blog post and generate a summary"""

```

### -2- Skapa en sampling-begäran

Utöka ditt verktyg med följande kod:

**python**

```python
post = BlogPost(
        id=len(posts) + 1,
        title=title,
        content=content,
        abstract=""
    )

prompt = f"Create an abstract of the following blog post: title: {title} and draft: {content} "

result = await ctx.session.create_message(
        messages=[
            SamplingMessage(
                role="user",
                content=TextContent(type="text", text=prompt),
            )
        ],
        max_tokens=100,
)

```

### -3- Vänta på svaret och returnera svaret

**python**

```python
post.abstract = result.content.text

posts.append(post)

# returnera den kompletta produkten
return json.dumps({
    "id": post.title,
    "abstract": post.abstract
})
```

### -4- Komplett kod

**python**

```python
from starlette.applications import Starlette
from starlette.routing import Mount, Host

from mcp.server.fastmcp import Context, FastMCP

from mcp.server.session import ServerSession
from mcp.types import SamplingMessage, TextContent

import json


from uuid import uuid4
from typing import List
from pydantic import BaseModel


mcp = FastMCP("Blog post generator")

# app = FastAPI()

posts = []

class BlogPost(BaseModel):
    id: int
    title: str
    content: str
    abstract: str

posts: List[BlogPost] = []

@mcp.tool()
async def create_blog(title: str, content: str, ctx: Context[ServerSession, None]) -> str:
    """Create a blog post and generate a summary"""

    post = BlogPost(
        id=len(posts) + 1,
        title=title,
        content=content,
        abstract=""
    )

    prompt = f"Create an abstract of the following blog post: title: {title} and draft: {content} "

    result = await ctx.session.create_message(
        messages=[
            SamplingMessage(
                role="user",
                content=TextContent(type="text", text=prompt),
            )
        ],
        max_tokens=100,
    )

    post.abstract = result.content.text

    posts.append(post)

    # returnera hela blogginlägget
    return json.dumps({
        "id": post.title,
        "abstract": post.abstract
    })

if __name__ == "__main__":
    print("Starting server...")
    # mcp.run()
    mcp.run(transport="streamable-http")

# kör appen med: python server.py
```

### -5- Testa det i Visual Studio Code

För att testa detta i Visual Studio Code, gör följande:

1. Starta servern i terminalen
1. Lägg till den i *mcp.json* (och se till att den startas) t.ex. så här:

   ```json
   "servers": {
      "blog-server": {
        "type": "http",
        "url": "http://localhost:8000/mcp"
      }
   }
   ```

1. Skriv en prompt:

   ```text
   create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
   ```

1. Tillåt sampling. Första gången du testar detta kommer du att få en extra dialog som du måste acceptera, sedan ser du den normala dialogrutan som ber dig att köra ett verktyg

1. Inspektera resultaten. Du kommer att se resultaten både snyggt renderade i GitHub Copilot Chat men du kan också inspektera det råa JSON-svaret.

**Bonus**. Visual Studio Code-verktygen har bra stöd för sampling. Du kan konfigurera Sampling-åtkomst på din installerade server genom att navigera så här:

1. Navigera till avsnittet för tillägg.
1. Välj kugghjulsikonen för din installerade server i sektionen "MCP SERVERS - INSTALLED".
1 Välj "Configure Model Access", här kan du välja vilka modeller GitHub Copilot får använda vid sampling. Du kan också se alla sampling-begäran som nyligen gjorts genom att välja "Show Sampling requests".

## Uppgift

I denna uppgift ska du bygga en något annorlunda Sampling nämligen en sampling-integration som stödjer generering av produktbeskrivning. Här är ditt scenario:

**Scenario**: Backoffice-arbetaren på en e-handel behöver hjälp, det tar alldeles för lång tid att generera produktbeskrivningar. Därför ska du bygga en lösning där du kan anropa ett verktyg "create_product" med argumenten "title" och "keywords" och det ska producera en komplett produkt inklusive ett "description"-fält som ska fyllas i av en LLM på klienten.

TIPS: använd det du lärde dig tidigare för att konstruera denna server och dess verktyg med en sampling-begäran.

## Lösning

[Lösning](./solution/README.md)

## Nyckelinsikter

Sampling är en kraftfull funktion som låter servern delegera uppgifter till klienten när den behöver hjälp av en LLM.

## Vad är nästa

- [Kapitel 4 - Praktisk implementering](../../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->