# Edistynyt palvelimen käyttö

MCP SDK:ssa on kaksi eri palvelintyyppiä, tavallinen palvelin ja matalan tason palvelin. Tavallisesti käytät tavallista palvelinta lisätäksesi ominaisuuksia siihen. Joissain tapauksissa haluat kuitenkin turvautua matalan tason palvelimeen, kuten esimerkiksi:

- Parempi arkkitehtuuri. On mahdollista luoda puhdas arkkitehtuuri sekä tavallisella palvelimella että matalan tason palvelimella, mutta voidaan väittää, että se on hieman helpompaa matalan tason palvelimella.
- Ominaisuuksien saatavuus. Jotkin edistyneet ominaisuudet ovat käytettävissä vain matalan tason palvelimen kanssa. Tähän törmää myöhemmissä luvuissa, kun lisäämme otantaa ja eliksointia.

## Tavallinen palvelin vs matalan tason palvelin

Näin MCP-palvelimen luominen näyttää tavallisen palvelimen kanssa

**Python**

```python
mcp = FastMCP("Demo")

# Lisää yhteenlaskutyökalu
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b
```

**TypeScript**

```typescript
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Lisää lisäysväline
server.registerTool("add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);
```

Pointti on siinä, että lisäät eksplisiittisesti jokaisen työkalun, resurssin tai kehotteen, jonka haluat palvelimen omaavan. Ei siinä ole mitään väärää.  

### Matalan tason palvelimen lähestymistapa

Kun käytät matalan tason palvelimen lähestymistapaa, sinun tulee ajatella sitä eri tavalla. Sen sijaan, että rekisteröisit jokaisen työkalun erikseen, luot kaksi käsittelijää kullekin ominaisuustyypille (työkalut, resurssit tai kehotteet). Esimerkiksi työkaluilla on tällöin vain kaksi funktiota:

- Kaikkien työkalujen listaaminen. Yksi funktio vastaa kaikista yrityksistä listata työkaluja.
- Kaikkien työkalujen kutsujen käsittely. Tässä on vain yksi funktio, joka käsittelee työkalukutsuja.

Se kuulostaa mahdollisesti vähemmän työtä aiheuttavalta, eikö? Joten sen sijaan, että rekisteröisit työkalun, sinun tarvitsee vain varmistaa, että työkalu listataan, kun listaamme kaikki työkalut, ja että se kutsutaan, kun saapuu työkalukutsu.

Katsotaan miltä koodi nyt näyttää:

**Python**

```python
@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available tools."""
    return [
        types.Tool(
            name="add",
            description="Add two numbers",
            inputSchema={
                "type": "object",
                "properties": {
                    "a": {"type": "number", "description": "number to add"}, 
                    "b": {"type": "number", "description": "number to add"}
                },
                "required": ["query"],
            },
        )
    ]
```

**TypeScript**

```typescript
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Palauta rekisteröityjen työkalujen luettelo
  return {
    tools: [{
        name="add",
        description="Add two numbers",
        inputSchema={
            "type": "object",
            "properties": {
                "a": {"type": "number", "description": "number to add"}, 
                "b": {"type": "number", "description": "number to add"}
            },
            "required": ["query"],
        }
    }]
  };
});
```

Tässä meillä on nyt funktio, joka palauttaa ominaisuuslistan. Jokaisella työkalulistauksen alkioilla on kenttiä kuten `name`, `description` ja `inputSchema` vastaamaan palautustyyppiä. Tämä mahdollistaa työkalujen ja ominaisuusmääritelmien sijoittamisen muualle. Voimme nyt luoda kaikki työkalut työkaluhakemistoon, samoin kaikkien ominaisuuksiesi kanssa, jolloin projektisi järjestäytyy esimerkiksi näin:

```text
app
--| tools
----| add
----| substract
--| resources
----| products
----| schemas
--| prompts
----| product-description
```

Hienoa, arkkitehtuuristamme voi tulla varsin selkeä.

Entä työkalujen kutsuminen, onko se sama idea, yksi käsittelijä kutsumaan työkalua, mistä tahansa työkalusta? Kyllä, juuri niin, tässä on koodi siihen:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools on sanakirja, jossa työkalujen nimet ovat avaimina
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

**TypeScript**

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if(!tool) {
        return {
            error: {
                code: "tool_not_found",
                message: `Tool ${name} not found.`
            }
       };
    }
    
    // args: request.params.arguments
    // TODO kutsu työkalua,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Kuten yllä olevasta koodista näet, meidän täytyy jäsentää, mikä työkalu kutsutaan ja millä argumenteilla, ja sitten jatkaa työkalun kutsumiseen.

## Lähestymistavan parantaminen validoinnilla

Tähän asti olet nähnyt, miten kaikki työkalujen, resurssien ja kehotteiden rekisteröinnit voidaan korvata näillä kahdella käsittelijällä per ominaisuustyyppi. Mitä muuta tarvitsemme? Meidän pitäisi lisätä jonkinlainen validointi varmistamaan, että työkalu kutsutaan oikeilla argumenteilla. Jokaisella ajonaikaisella ympäristöllä on oma ratkaisunsa tähän, esimerkiksi Python käyttää Pydantic:iä ja TypeScript Zodia. Ajatuksena on tehdä seuraavaa:

- Siirtää logiikka ominaisuuden (työkalu, resurssi tai kehotte) luomiseksi omalle hakemistolleen.
- Lisätä tapa validoida tuleva pyyntö, jossa pyydetään esimerkiksi kutsumaan työkalua.

### Luo ominaisuus

Ominaisuuden luomiseksi meidän täytyy luoda tiedosto kyseiselle ominaisuudelle ja varmistaa, että siinä on ominaisuudelle pakolliset kentät. Kentät eroavat hieman työkalujen, resurssien ja kehotteiden välillä.

**Python**

```python
# schema.py
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float

# add.py

from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Vahvista syöte käyttämällä Pydantic-mallia
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: lisää Pydantic, jotta voimme luoda AddInputModelin ja validoida argumentit

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

tässä näet miten teemme seuraavaa:

- Luo skeema Pydantic:llä `AddInputModel` kentillä `a` ja `b` tiedostossa *schema.py*.
- Yritä jäsentää saapuva pyyntö tyypiksi `AddInputModel`, jos parametrit eivät täsmää, tämä kaatuu:

   ```python
   # add.py
    try:
        # Vahvista syöte käyttämällä Pydantic-mallia
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Voit valita, laitatko tämän jäsentämislogiikan työkalukutsun sisälle tai käsittelijäfunktioon.

**TypeScript**

```typescript
// server.ts
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if (!tool) {
       return {
        error: {
            code: "tool_not_found",
            message: `Tool ${name} not found.`
        }
       };
    }
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);

       // @ts-ignore
       const result = await tool.callback(input);

       return {
          content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
      };
    } catch (error) {
       return {
          error: {
             code: "invalid_arguments",
             message: `Invalid arguments for tool ${name}: ${error instanceof Error ? error.message : String(error)}`
          }
    };
   }

});

// schema.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// add.ts
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

- Käsittelijässä, joka käsittelee kaikkia työkalukutsuja, yritämme nyt jäsentää saapuvan pyynnön työkalun määrittelemään skeemaan:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    jos se onnistuu, jatkamme itse työkalun kutsumiseen:

    ```typescript
    const result = await tool.callback(input);
    ```

Kuten näet, tämä lähestymistapa luo hyvän arkkitehtuurin, koska kaikella on oma paikkansa, *server.ts* on erittäin pieni tiedosto, joka vain yhdistää pyyntökäsittelijät, ja jokainen ominaisuus on omassa hakemistossaan eli tools/, resources/ tai /prompts.

Hienoa, kokeillaan seuraavaksi tämän rakentamista.

## Harjoitus: matalan tason palvelimen luominen

Tässä harjoituksessa teemme seuraavaa:

1. Luomme matalan tason palvelimen, joka käsittelee työkalujen listaamista ja työkalukutsuja.
1. Toteutamme arkkitehtuurin, jonka päälle voi rakentaa.
1. Lisäämme validoinnin varmistaaksemme, että työkalukutsut validoidaan oikein.

### -1- Luo arkkitehtuuri

Ensimmäinen asia on luoda arkkitehtuuri, joka auttaa meitä skaalaamaan, kun lisäämme ominaisuuksia, tältä se näyttää:

**Python**

```text
server.py
--| tools
----| __init__.py
----| add.py
----| schema.py
client.py
```

**TypeScript**

```text
server.ts
--| tools
----| add.ts
----| schema.ts
client.ts
```

Nyt olemme perustaneet arkkitehtuurin, joka varmistaa, että uudet työkalut on helppo lisätä tools-hakemistoon. Voit vapaasti lisätä myös ali hakemistoja resursseille ja kehotteille.

### -2- Työkalun luominen

Katsotaan seuraavaksi, miltä työkalun luominen näyttää. Ensiksi se täytyy luoda omaan *tool*-alakansioonsa näin:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Vahvista syöte Pydantic-mallin avulla
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: lisää Pydantic, jotta voimme luoda AddInputModelin ja validoida argumentit

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Tässä näemme, miten määrittelemme nimen, kuvauksen ja syöteskeeman Pydantic:llä sekä käsittelijän, jota kutsutaan, kun tätä työkalua kutsutaan. Lopuksi altistamme `tool_add`, joka on sanakirja, joka sisältää nämä ominaisuudet.

On myös *schema.py*, jota käytetään määrittämään työkalun käyttämä syöteskeema:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Meidän pitää myös täyttää *__init__.py*, jotta tools-kansio käsitellään moduulina. Lisäksi meidän pitää altistaa siinä olevat moduulit näin:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Voimme jatkaa tämän tiedoston täydentämistä, kun lisäämme työkaluja.

**TypeScript**

```typescript
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

Tässä luomme sanakirjan, joka koostuu seuraavista ominaisuuksista:

- name, työkalu nimi.
- rawSchema, Zod-skeema, jota käytetään validoimaan saapuvat työkalukutsupyynnöt.
- inputSchema, tätä skeemaa käyttää käsittelijä.
- callback, tätä käytetään kutsumaan työkalua.

On myös `Tool`, jota käytetään muuttamaan tämä sanakirja tyypiksi, jonka MCP-palvelimen käsittelijä hyväksyy, ja se näyttää tältä:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Ja on *schema.ts*, jossa säilytämme syöteskeemat kullekin työkalulle, se näyttää tältä nyt, kun siinä on vain yksi skeema, mutta työkaluja lisätessä voimme lisätä lisää merkintöjä:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Hienoa, jatketaan seuraavaksi työkalulistauksen käsittelyyn.

### -3- Työkalulistauksen käsittely

Seuraavaksi asettelemme pyyntökäsittelijän työkalujen listaamista varten. Tässä, mitä lisäämme palvelintiedostoomme:

**Python**

```python
# koodi jätetty lyhennetyksi
from tools import tools

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    tool_list = []
    print(tools)

    for tool in tools.values():
        tool_list.append(
            types.Tool(
                name=tool["name"],
                description=tool["description"],
                inputSchema=pydantic_to_json(tool["input_schema"]),
            )
        )
    return tool_list
```

Tässä lisäämme dekorointimerkin `@server.list_tools` ja toteutamme sen funktiolla `handle_list_tools`. Jälkimmäisessä tuotamme listauksen työkaluista. Huomaa, että jokaisella työkalulla täytyy olla nimi, kuvaus ja inputSchema.   

**TypeScript**

Työkalujen listaamista varten asetamme palvelimelle pyyntökäsittelijän kutsumalla `setRequestHandler` skeeman kanssa, joka täsmää tarkoitukseemme, tässä tapauksessa `ListToolsRequestSchema`.

```typescript
// index.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// server.ts
// koodi jätetty lyhentämisen vuoksi
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Palauta rekisteröityjen työkalujen lista
  return {
    tools: tools
  };
});
```

Hienoa, olemme ratkaisseet työkalujen listauksen, katsotaan seuraavaksi, miten voisimme kutsua työkaluja.

### -4- Työkalun kutsun käsittely

Työkalun kutsumiseksi asetamme toisen pyyntökäsittelijän, tällä kertaa käsittelemään pyyntöjä, joissa määritellään, mitä ominaisuutta kutsutaan ja millä argumenteilla.

**Python**

Käytetään dekorointia `@server.call_tool` ja toteutetaan se funktiolla, kuten `handle_call_tool`. Tässä funktiossa meidän täytyy jäsentää työkalun nimi, sen argumentit ja varmistaa, että argumentit ovat kelvollisia kyseiselle työkalulle. Voimme validoida argumentit tässä funktion sisällä tai alavirtaan itse työkalussa.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools on sanakirja, jossa avaimina ovat työkalujen nimet
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # kutsu työkalua
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Näin se toimii:

- Työkalun nimi on jo syöteparametrina `name`, ja argumentit ovat `arguments`-sanakirjan muodossa.

- Työkalu kutsutaan `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`-kutsulla. Argumenttien validointi tapahtuu `handler`-ominaisuudessa, joka osoittaa funktioon; jos validointi epäonnistuu, se heittää poikkeuksen.

Siinä nyt on täydellinen käsitys matalan tason palvelimen työkalujen listaamisesta ja kutsumisesta.

Katso [täysi esimerkki](./code/README.md) täältä

## Tehtävä

Laajenna saamaasi koodia lisäämällä useita työkaluja, resursseja ja kehotteita ja pohdi, kuinka huomaat, että sinun tarvitsee lisätä tiedostoja vain tools-hakemistoon eikä muualle.

*Ratkaisua ei anneta*

## Yhteenveto

Tässä luvussa näimme, miten matalan tason palvelimen lähestymistapa toimii ja miten se auttaa meitä luomaan hyvän arkkitehtuurin, johon voimme jatkuvasti rakentaa. Keskustelimme myös validoinnista, ja sinulle näytettiin, miten käytetään validointikirjastoja syötteiden validointiskaemojen luomiseen.

## Mitä seuraavaksi

- Seuraavaksi: [Yksinkertainen todennus](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:  
Tämä asiakirja on käännetty käyttäen tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta ole hyvä ja huomioi, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on katsottava ensisijaiseksi lähteeksi. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ota vastuuta tämän käännöksen käytöstä johtuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->