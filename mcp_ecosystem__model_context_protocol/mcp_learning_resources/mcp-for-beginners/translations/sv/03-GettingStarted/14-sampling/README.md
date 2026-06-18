# Sampling - delegera funktioner till Klienten

Ibland behöver MCP Client och MCP Server samarbeta för att uppnå ett gemensamt mål. Du kan ha ett fall där Servern behöver hjälp av en LLM som finns på klienten. För denna situation är sampling vad du bör använda.

Låt oss utforska några användningsområden och hur man bygger en lösning som involverar sampling.

## Översikt

I denna lektion fokuserar vi på att förklara när och var man använder Sampling och hur man konfigurerar det.

## Lärandemål

I detta kapitel kommer vi att:

- Förklara vad Sampling är och när man använder det.
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

    User->>MCP Client: Författa blogginlägg
    MCP Client->>MCP Server: Verktygsanrop (utkast till blogginlägg)
    MCP Server->>MCP Client: Samplingförfrågan (skapa sammanfattning)
    MCP Client->>LLM: Generera sammanfattning av blogginlägg
    LLM->>MCP Client: Sammanfattningsresultat
    MCP Client->>MCP Server: Samplingrespons (sammanfattning)
    MCP Server->>MCP Client: Komplett blogginlägg (utkast + sammanfattning)
    MCP Client->>User: Blogginlägg klart
```

### Samplingförfrågan

Okej, nu har vi en övergripande bild av ett trovärdigt scenario, låt oss prata om den samplingförfrågan som servern skickar tillbaka till klienten. Så här kan en sådan förfrågan se ut i JSON-RPC-format:

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

- Prompt, under content -> text, är vår prompt som är en instruktion för LLM att sammanfatta en bloggpost.

- **modelPreferences**. Denna sektion är just det, en preferens, en rekommendation om vilken konfiguration som ska användas med LLM:en. Användaren kan välja att följa dessa rekommendationer eller ändra dem. I detta fall finns rekommendationer om modell att använda samt prioritet mellan hastighet och intelligens.
- **systemPrompt**, detta är din vanliga system-prompt som ger din LLM en personlighet och innehåller vägledande instruktioner.
- **maxTokens**, detta är en annan egenskap som används för att ange hur många tokens som rekommenderas att användas för denna uppgift.

### Sampling-svar

Detta svar är vad MCP Client slutligen skickar tillbaka till MCP Server och är resultatet av att klienten anropar LLM, väntar på det svaret och sedan konstruerar detta meddelande. Så här kan det se ut i JSON-RPC:

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

Notera hur svaret är en sammanfattning av bloggposten precis som vi bad om. Notera även hur den använda `model` inte är den vi bad om utan "gpt-5" över "claude-3-sonnet". Detta för att illustrera att användaren kan ändra sig angående vad som ska användas och att din samplingförfrågan är en rekommendation.

Okej, nu när vi förstår huvudflödet och en användbar uppgift att använda det för "skapa bloggpost + sammanfattning", låt oss se vad vi behöver göra för att få det att fungera.

### Meddelandetyper

Sampling-meddelanden är inte begränsade till bara text utan du kan också skicka bilder och ljud. Så här ser JSON-RPC annorlunda ut:

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

> NOTE: för mer detaljerad information om Sampling, kolla in [de officiella dokumenten](https://modelcontextprotocol.io/specification/2025-11-25/client/sampling)

## Hur konfigurerar man Sampling i Klienten

> Notera: om du bara bygger en server behöver du inte göra så mycket här.

I en klient behöver du ange följande funktion så här:

```json
{
  "capabilities": {
    "sampling": {}
  }
}
```

Detta kommer sedan att plockas upp när din valda klient initialiseras med servern.

## Exempel på Sampling i praktiken - Skapa en bloggpost

Låt oss koda en samplingserver tillsammans, vi behöver göra följande:

1. Skapa ett verktyg på Servern.
1. Detta verktyg ska skapa en samplingförfrågan.
1. Verktyget ska vänta på att klientens samplingförfrågan besvaras.
1. Sedan ska verktygets resultat produceras.

Låt oss se koden steg för steg:

### -1- Skapa verktyget

**python**

```python
@mcp.tool()
async def create_blog(title: str, content: str, ctx: Context[ServerSession, None]) -> str:
    """Create a blog post and generate a summary"""

```

### -2- Skapa en samplingförfrågan

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

### -4- Fullständig kod

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

### -5- Testa i Visual Studio Code

För att testa detta i Visual Studio Code, gör följande:

1. Starta server i terminalen
1. Lägg till den i *mcp.json* (och se till att den är startad) till exempel så här:

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

1. Tillåt sampling att ske. Första gången du testar detta kommer en extra dialogruta att visas som du behöver acceptera, sedan kommer du att se den normala dialogen för att be dig köra ett verktyg.

1. Inspektera resultat. Du kommer att se resultaten både snyggt renderade i GitHub Copilot Chat men du kan också inspektera det råa JSON-svaret.

**Bonus**. Visual Studio Code-verktygen har bra stöd för sampling. Du kan konfigurera Sampling-åtkomst på din installerade server genom att navigera så här:

1. Gå till extensions-sektionen.
1. Välj kugghjulsikonen för din installerade server i avsnittet "MCP SERVERS - INSTALLED".
1. Välj "Configure Model Access", här kan du välja vilka modeller GitHub Copilot får använda när den utför sampling. Du kan även se alla samplingförfrågningar som hänt nyligen genom att välja "Show Sampling requests".

## Uppgift

I denna uppgift ska du bygga en något annorlunda Sampling, nämligen en samplingintegration som stödjer att generera en produktbeskrivning. Här är ditt scenario:

**Scenario**: Kontorsanställd på en e-handel behöver hjälp, det tar alldeles för lång tid att generera produktbeskrivningar. Därför ska du bygga en lösning där du kan anropa ett verktyg "create_product" med "title" och "keywords" som argument och det ska producera en komplett produkt inklusive ett "description"-fält som ska fyllas i av klientens LLM.

TIPS: använd vad du lärde dig tidigare för att konstruera denna server och dess verktyg med hjälp av en samplingförfrågan.

## Lösning

[Lösning](./solution/README.md)

## Viktiga insikter

Sampling är en kraftfull funktion som tillåter servern att delegera uppgifter till klienten när den behöver hjälp av en LLM.

## Vad är nästa steg

- [Kapitel 4 - Praktisk implementering](../../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->