# Edistynyt palvelimen käyttö

MCP SDK:ssa on kaksi erilaista palvelintyppiä: tavallinen palvelin ja matalan tason palvelin. Tavallisesti käytät tavallista palvelinta lisätäksesi siihen ominaisuuksia. Joissakin tapauksissa kuitenkin haluat hyödyntää matalan tason palvelinta, kuten:

- Parempi arkkitehtuuri. On mahdollista luoda selkeä arkkitehtuuri yhdistämällä tavallinen palvelin ja matalan tason palvelin, mutta voidaan väittää, että se on hieman helpompaa matalan tason palvelimella.
- Ominaisuuksien saatavuus. Jotkut edistyneet ominaisuudet ovat käytettävissä vain matalan tason palvelimella. Näet tämän myöhemmissä luvuissa, kun lisäämme otantaa (poistettu käytöstä `2026-07-28` julkaisuehdokkaassa) ja herättelyä.

## Tavallinen palvelin vs. matalan tason palvelin

Tässä esimerkki MCP-palvelimen luomisesta tavallisen palvelimen avulla:

**Python**

```python
mcp = FastMCP("Demo")

# Lisää lisäystyökalu
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

// Lisää lisäämistyökalu
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

Tärkein pointti on, että sinun pitää nimenomaisesti lisätä jokainen työkalu, resurssi tai kehotus, jonka haluat palvelimen sisältävän. Tämä ei ole väärin.  

### Matalan tason palvelimen lähestymistapa

Kun kuitenkin käytät matalan tason palvelinta, sinun täytyy ajatella asiaa eri tavalla. Sen sijaan, että rekisteröisit jokaisen työkalun erikseen, luot kaksi käsittelijää kullekin ominaisuustyypille (työkalut, resurssit tai kehotukset). Esimerkiksi työkaluilla on siis vain kaksi funktiota seuraavasti:

- Listaa kaikki työkalut. Yksi funktio vastaa kaikkien työkalujen listaamisyrityksistä.
- Käsittele työkalun kutsumiset. Tässäkin on vain yksi funktio, joka hoitaa kutsut työkalulle.

Kuulostaa mahdollisesti vähemmän työläältä, eikö? Eli sen sijaan, että rekisteröisit työkalun, sinun pitää varmistaa vain, että työkalu listataan kaikissa työkaluja listattaessa ja että se kutsutaan, kun saapuu pyyntö kutsua työkalua.

Katsotaan, miltä koodi näyttää nyt:

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
  // Palauta rekisteröityjen työkalujen lista
  return {
    tools: [{
        name: "add",
        description: "Add two numbers",
        inputSchema: {
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

Tässä meillä on funktio, joka palauttaa listan ominaisuuksista. Jokaisessa työkalun listauksessa on kenttiä kuten `name`, `description` ja `inputSchema` vastaamaan palautetyyppiä. Tämä mahdollistaa työkalujen ja ominaisuuksien määrittelyn muualla. Voimme nyt luoda kaikki työkalut tools-kansioon ja samoin kaikki ominaisuudet, jolloin projektisi voidaan järjestää esimerkiksi näin:

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

Tämä on loistavaa, arkkitehtuurimme voi näyttää varsin siistiltä.

Entä työkalujen kutsuminen, onko se sama idea, että yksi käsittelijä kutsuu minkä tahansa työkalun? Kyllä, juuri näin, tässä koodi siihen:

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

Kuten yllä olevasta koodista näkyy, meidän täytyy purkaa, mikä työkalu kutsutaan ja millä argumenteilla, ja sitten jatkaa työkalun kutsumista.

## Lähestymistavan parantaminen validoinnilla

Tähän asti olet nähnyt, kuinka kaikki rekisteröinnit työkalujen, resurssien ja kehotusten lisäämiseksi voidaan korvata näillä kahdella käsittelijällä kullekin ominaisuustyypille. Mitä muuta meidän täytyy tehdä? Meidän tulisi lisätä jonkinlainen validointi varmistaaksemme, että työkalua kutsutaan oikeilla argumenteilla. Jokaisella ajonaikaisella ympäristöllä on oma ratkaisunsa tähän, esimerkiksi Python käyttää Pydanticia ja TypeScript Zodia. Ajatuksena on tehdä seuraavaa:

- Siirtää logiikka ominaisuuden (työkalun, resurssin tai kehotuksen) luomiseksi omaan kansioonsa.
- Lisätä tapa validoida saapuva pyyntö, joka esimerkiksi kutsuu työkalua.

### Luo ominaisuus

Luodaksesi ominaisuuden, sinun pitää tehdä tiedosto kyseiselle ominaisuudelle ja varmistaa, että siinä on ominaisuudelle pakolliset kentät. Kentät vaihtelevat hieman työkalujen, resurssien ja kehotusten välillä.

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
        # Validoi syöte Pydantic-mallilla
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

Tässä näet, kuinka me teemme seuraavaa:

- Luomme skeeman Pydanticilla `AddInputModel`, jossa on kentät `a` ja `b` tiedostossa *schema.py*.
- Yritämme purkaa saapuvan pyynnön tyypiksi `AddInputModel`, jos parametrit eivät täsmää, tämä kaatuu:

   ```python
   # add.py
    try:
        # Vahvista syöte Pydantic-mallin avulla
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Voit valita, laitetaanko tämä purkulogiikka työkalukutsuun itseensä vai käsittelijäfunktioon.

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

- Käsittelijässä, joka vastaa kaikista työkalukutsuista, yritämme nyt purkaa saapuvan pyynnön työkalun määriteltyyn skeemaan:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    jos se onnistuu, jatkamme varsinaisen työkalun kutsuun:

    ```typescript
    const result = await tool.callback(input);
    ```

Kuten näet, tämä lähestymistapa luo erinomaisen arkkitehtuurin, koska kaikella on paikkansa, *server.ts* on hyvin pieni tiedosto, joka vain yhdistää pyyntökäsittelijät ja jokainen ominaisuus on omassa kansiossaan, eli tools/, resources/ tai /prompts.

Hienoa, kokeillaan seuraavaksi tämän rakentamista. 

## Harjoitus: Matalan tason palvelimen luominen

Tässä harjoituksessa teemme seuraavaa:

1. Luo matalan tason palvelin, joka käsittelee työkalujen listaamisen ja kutsumisen.
1. Toteuta arkkitehtuuri, johon voit rakentaa lisää.
1. Lisää validointi varmistaaksesi, että työkalukutsut validoidaan oikein.

### -1- Luo arkkitehtuuri

Ensimmäinen asia, joka meidän täytyy ratkaista, on arkkitehtuuri, joka auttaa meitä skaalaamaan, kun lisäämme ominaisuuksia. Tässä miltä se näyttää:

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

Nyt olemme perustaneet arkkitehtuurin, joka varmistaa, että voimme helposti lisätä uusia työkaluja tools-kansioon. Voit mielestäsi lisätä vastaavia alikansioita resursseille ja kehotuksille.

### -2- Työkalun luominen

Katsotaan, miltä työkalun luominen näyttää seuraavaksi. Ensin se täytyy luoda sen *tool*-alikansioon näin:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Vahvista syöte käyttämällä Pydantic-mallia
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TEHTÄVÄ: lisää Pydantic, jotta voimme luoda AddInputModelin ja vahvistaa argumentit

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Tässä näet, kuinka määrittelemme nimen, kuvauksen ja sisäänsyötteen skeeman Pydanticilla sekä käsittelijän, joka kutsutaan, kun tätä työkalua kutsutaan. Lopuksi paljastamme `tool_add` -sanan, joka on sanakirja, joka sisältää nämä ominaisuudet.

On myös *schema.py*, jota käytetään määrittelemään työkalun käyttämä sisäänsyötteen skeema:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Meidän on myös täytettävä *__init__.py* varmistaaksemme, että tools-kansio käsitellään moduulina. Lisäksi meidän pitää paljastaa sen sisällä olevat moduulit näin:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Voimme jatkaa tämän tiedoston täydentämistä lisäämällä uusia työkaluja.

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

Tässä luomme sanakirjan, joka koostuu ominaisuuksista:

- nimi, eli työkalun nimi.
- rawSchema, Zod-skeema, jota käytetään validoimaan työkalun kutsut.
- inputSchema, tätä skeemaa käyttää käsittelijä.
- callback, tätä käytetään työkalun kutsumiseen.

On myös `Tool`, jota käytetään muuttamaan tämä sanakirja tyypiksi, jonka mcp-palvelimen käsittelijä voi hyväksyä, ja se näyttää tältä:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Ja on *schema.ts*, johon tallennamme kunkin työkalun syöteskeemat, ja se näyttää tältä, tällä hetkellä vain yksi skeema, mutta uusia voi lisätä vapauttaessa työkaluja:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Hienoa, jatketaan nyt työkalujen listaamisen käsittelyyn.

### -3- Työkalujen listaamisen käsittely

Seuraavaksi, jotta voimme käsitellä työkalujen listaamista, meidän täytyy määrittää pyyntökäsittelijä sille. Tässä mitä meidän pitää lisätä palvelintiedostoomme:

**Python**

```python
# koodi jätetty pois tiiviyden vuoksi
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

Tässä lisäämme `@server.list_tools` -koristelijan ja toteutamme funktion `handle_list_tools`. Jälkimmäisessä meidän pitää tuottaa lista työkaluista. Huomaa, että jokaisella työkalulla tarvitsee olla nimi, kuvaus ja inputSchema.   

**TypeScript**

Työkalujen listauksen pyyntökäsittelijän asettamiseksi tarvitsemme kutsua `setRequestHandler` palvelimella sopivalla skeemalla, tässä tapauksessa `ListToolsRequestSchema`. 

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
// koodi on jätetty pois lyhyyden vuoksi
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Palauta rekisteröityjen työkalujen lista
  return {
    tools: tools
  };
});
```

Hienoa, olemme ratkaisseet työkalujen listaamisen osan, katsotaanpa, miten voisimme kutsua työkaluja seuraavaksi.

### -4- Työkalun kutsun käsittely

Työkalun kutsumiseksi meidän täytyy määrittää toinen pyyntökäsittelijä, joka keskittyy pyynnön käsittelyyn, jossa määritellään, mikä ominaisuus kutsutaan ja millä argumenteilla.

**Python**

Käytetään koristelevaa funktiota `@server.call_tool` ja toteutetaan se funktiolla `handle_call_tool`. Sen sisällä meidän pitää purkaa työkalun nimi, sen argumentti ja varmistaa, että argumentit ovat voimassa kyseiselle työkalulle. Voimme validoida argumentit joko tässä funktiossa tai myöhemmin itse työkalussa.

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
        # kutsu työkalu
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Tässä tapahtuu seuraavaa:

- Työkalun nimi on jo syötekentässä `name`, ja argumentit ovat `arguments`-sanakirjassa.

- Työkalu kutsutaan `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`-rivin kautta. Argumenttien validointi tapahtuu `handler`-ominaisuudessa, joka osoittaa funktioon; jos validointi epäonnistuu, poikkeus heitetään.

Siinä, nyt meillä on täysi ymmärrys siitä, miten työkaluja listataan ja kutsutaan matalan tason palvelimen avulla.

Katso kokonaista esimerkkiä [tästä](./code/README.md)

## Tehtävä

Laajenna annettua koodia useilla työkaluilla, resursseilla ja kehotuksilla ja pohdi, kuinka huomaat, että sinun tarvitsee vain lisätä tiedostoja tools-kansioon eikä minnekään muualle. 

*Ei ratkaisua annettu*

## Yhteenveto

Tässä luvussa näimme, miten matalan tason palvelin toimii ja miten se auttaa meitä luomaan siistin arkkitehtuurin, johon voimme rakentaa lisää. Keskustelimme myös validoinnista ja sinulle näytettiin, miten työskennellä validointikirjastojen kanssa input-skeemojen luomiseksi.

## Mitä seuraavaksi

- Seuraavaksi: [Yksinkertainen todennus](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->