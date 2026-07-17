> [FÖRÅLDRAT: 2026-07-28 RELEASE KANDIDAT](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)

# Sampling - delegera funktioner till klienten

> **Avvecklingsmeddelande:** MCP-specifikationskandidaten `2026-07-28` markerar Sampling som föråldrat till förmån för direkt integration med LLM-leverantörers API:er. Sampling fortsätter fungera i `2025-11-25` och minst ett år efter eventuell formell avveckling, så allt i denna lektion är fortfarande giltigt — men nya serverdesigner bör utvärdera ersättningsmönstret. Se [Vad som ändras i MCP: Release-kandidat 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Ibland behöver MCP-klienten och MCP-servern samarbeta för att nå ett gemensamt mål. Du kan hamna i ett scenario där servern behöver hjälp från en LLM som finns hos klienten. I detta fall är Sampling vad du bör använda.

Låt oss utforska några användningsfall och hur man bygger en lösning som involverar sampling.

## Översikt

I denna lektion fokuserar vi på att förklara när och var Sampling bör användas samt hur man konfigurerar det.

## Läromål

I detta kapitel kommer vi att:

- Förklara vad Sampling är och när det ska användas.
- Visa hur Sampling konfigureras i MCP.
- Ge exempel på Sampling i praktiken.

## Vad är Sampling och varför använda det?

Sampling är en avancerad funktion som fungerar på följande sätt:

```mermaid
sequenceDiagram
    participant User
    participant MCP Client
    participant LLM
    participant MCP Server

    User->>MCP Client: Författares blogginlägg
    MCP Client->>MCP Server: Verktygsanrop (utkast till blogginlägg)
    MCP Server->>MCP Client: Samplingsförfrågan (skapa sammanfattning)
    MCP Client->>LLM: Generera sammanfattning av blogginlägget
    LLM->>MCP Client: Sammanfattningsresultat
    MCP Client->>MCP Server: Samplingssvar (sammanfattning)
    MCP Server->>MCP Client: Fullständigt blogginlägg (utkast + sammanfattning)
    MCP Client->>User: Blogginlägg klart
```

### Sampling-förfrågan

Okej, nu när vi har en översikt av ett trovärdigt scenario, låt oss prata om den sampling-förfrågan som servern skickar tillbaka till klienten. Så här kan en sådan förfrågan se ut i JSON-RPC-format:

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

Det finns några saker här värda att lyfta fram:

- Prompt, under content -> text, är vår instruktion som ber LLM att sammanfatta innehållet i ett blogginlägg.

- **modelPreferences**. Denna sektion är just det, en preferens, en rekommendation om vilken konfiguration som ska användas med LLM. Användaren kan välja att följa dessa rekommendationer eller ändra dem. I detta fall finns det rekommendationer kring vilken modell som ska användas samt prioritering mellan hastighet och intelligens.
- **systemPrompt**, detta är din vanliga system-prompt som ger din LLM en personlighet och innehåller vägledande instruktioner.
- **maxTokens**, detta är en annan egenskap som anger hur många tokens som rekommenderas användas för denna uppgift.

### Sampling-svar

Detta svar är vad MCP-klienten slutligen skickar tillbaka till MCP-servern och är resultatet av att klienten anropar LLM, väntar på svaret och sedan konstruerar meddelandet. Så här kan det se ut i JSON-RPC:

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

Observera hur svaret är en sammanfattning av blogginlägget, precis som vi bad om. Lägg också märke till att den använda `model` inte är vad vi bad om utan "gpt-5" istället för "claude-3-sonnet". Detta illustrerar att användaren kan ändra sig om vad som ska användas och att din sampling-förfrågan är en rekommendation.

Okej, nu när vi förstår huvudflödet och den användbara uppgiften att använda det för "skapande av blogginlägg + sammanfattning", låt oss se vad vi behöver göra för att få det att fungera.

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

> NOTERA: för mer detaljerad information om Sampling, se [de officiella dokumenten](https://modelcontextprotocol.io/specification/2025-11-25/client/sampling)

## Hur man konfigurerar Sampling i klienten

> Observera: om du bara bygger en server behöver du inte göra mycket här.

I en klient måste du specificera följande funktion så här:

```json
{
  "capabilities": {
    "sampling": {}
  }
}
```

Detta kommer sedan att plockas upp när din valda klient initialiserar med servern.

## Exempel på Sampling i praktiken - Skapa ett blogginlägg

Låt oss koda en sampling-server tillsammans, vi behöver göra följande:

1. Skapa ett verktyg på servern.
1. Detta verktyg ska skapa en sampling-förfrågan
1. Verktyget bör vänta på att klientens sampling-förfrågan ska besvaras.
1. Sedan ska verktygets resultat produceras.

Låt oss se på koden steg för steg:

### -1- Skapa verktyget

**python**

```python
@mcp.tool()
async def create_blog(title: str, content: str, ctx: Context[ServerSession, None]) -> str:
    """Create a blog post and generate a summary"""

```

### -2- Skapa en sampling-förfrågan

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

# kör app med: python server.py
```

### -5- Testa i Visual Studio Code

För att testa detta i Visual Studio Code, gör följande:

1. Starta servern i terminalen
1. Lägg till den i *mcp.json* (och se till att den är startad), exempelvis så här:

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

1. Tillåt sampling att ske. Första gången du testar detta får du en extra dialogruta som du måste acceptera, sedan ser du den vanliga dialogrutan som ber dig köra ett verktyg.

1. Granska resultaten. Du kommer att se resultaten både snyggt återgivna i GitHub Copilot Chat men du kan även inspektera den råa JSON-responsen.

**Bonus**. Visual Studio Code-verktygen har bra stöd för sampling. Du kan konfigurera sampling-åtkomst på din installerade server genom att navigera så här:

1. Gå till avsnittet för tillägg.
1. Välj kugghjulsikonen för din installerade server i sektionen "MCP SERVERS - INSTALLED".
1 Välj "Configure Model Access", här kan du välja vilka modeller GitHub Copilot får använda vid sampling. Du kan också se alla sampling-förfrågningar som gjorts nyligen genom att välja "Show Sampling requests".

## Uppgift

I denna uppgift ska du bygga en något annorlunda Sampling, nämligen en sampling-integration som stödjer generering av en produktbeskrivning. Här är ditt scenario:

**Scenario**: En back office-arbetare på en e-handel behöver hjälp, det tar alldeles för lång tid att generera produktbeskrivningar. Därför ska du bygga en lösning där du kan anropa ett verktyg "create_product" med "title" och "keywords" som argument och det ska producera en komplett produkt inklusive ett "description"-fält som ska fyllas i av en klients LLM.

TIPS: använd det du lärde dig tidigare för att konstruera denna server och dess verktyg med en sampling-förfrågan.

## Lösning

[Lösning](./solution/README.md)

## Viktiga lärdomar

Sampling är en kraftfull funktion som tillåter servern att delegera uppgifter till klienten när den behöver hjälp av en LLM.

## Vad som kommer härnäst

- [Kapitel 4 - Praktisk implementering](../../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->