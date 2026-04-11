# Penggunaan server lanjutan

Terdapat dua jenis server yang didedahkan dalam MCP SDK, server biasa anda dan server peringkat rendah. Biasanya, anda akan menggunakan server biasa untuk menambah ciri kepadanya. Walau bagaimanapun, dalam beberapa kes, anda mahu bergantung pada server peringkat rendah seperti:

- Seni bina yang lebih baik. Adalah mungkin untuk mencipta seni bina yang kemas dengan kedua-dua server biasa dan server peringkat rendah tetapi boleh diperdebatkan bahawa ia sedikit lebih mudah dengan server peringkat rendah.
- Ketersediaan ciri. Sesetengah ciri canggih hanya boleh digunakan dengan server peringkat rendah. Anda akan melihat ini dalam bab-bab berikut apabila kami menambah pensampelan dan elicitation.

## Server biasa vs server peringkat rendah

Berikut adalah bagaimana penciptaan MCP Server kelihatan dengan server biasa

**Python**

```python
mcp = FastMCP("Demo")

# Tambah alat penambahan
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

// Tambah alat tambah
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

Tujuannya adalah bahawa anda secara eksplisit menambah setiap alat, sumber atau prompt yang anda mahu server miliki. Tiada apa yang salah dengan itu.  

### Pendekatan server peringkat rendah

Walau bagaimanapun, apabila anda menggunakan pendekatan server peringkat rendah anda perlu memikirkannya dengan cara yang berbeza. Daripada mendaftarkan setiap alat, anda sebaliknya mencipta dua pengendali bagi setiap jenis ciri (alat, sumber atau prompt). Jadi sebagai contoh alat hanya mempunyai dua fungsi seperti berikut:

- Menyenaraikan semua alat. Satu fungsi akan bertanggungjawab untuk semua percubaan untuk menyenaraikan alat.
- mengendalikan panggilan semua alat. Di sini juga, hanya ada satu fungsi yang mengendalikan panggilan ke alat

Kedengaran seperti kerja yang lebih mudah bukan? Jadi, daripada mendaftarkan alat, saya hanya perlu memastikan alat disenaraikan apabila saya menyenaraikan semua alat dan ia dipanggil apabila terdapat permintaan yang masuk untuk memanggil alat. 

Mari kita lihat bagaimana kod itu sekarang kelihatan:

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
  // Kembalikan senarai alat yang didaftarkan
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

Di sini kami kini mempunyai fungsi yang mengembalikan senarai ciri. Setiap entri dalam senarai alat kini mempunyai medan seperti `name`, `description` dan `inputSchema` untuk mematuhi jenis yang dikembalikan. Ini membolehkan kami meletakkan alat dan definisi ciri kami di tempat lain. Kami kini boleh mencipta semua alat kami dalam folder alat dan perkara yang sama berlaku untuk semua ciri anda supaya projek anda tiba-tiba boleh diatur seperti berikut:

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

Itu hebat, seni bina kita boleh dibuat menjadi sangat kemas.

Bagaimana pula dengan memanggil alat, adakah ia idea yang sama iaitu satu pengendali untuk memanggil alat, mana-mana alat? Ya, tepat, ini kodnya:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools adalah sebuah kamus dengan nama alat sebagai kunci
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
    // TODO panggil alat,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Seperti yang anda lihat daripada kod di atas, kita perlu mengurai alat yang akan dipanggil, dan dengan hujah apa, dan kemudian kita perlu terus memanggil alat itu.

## Meningkatkan pendekatan dengan pengesahan

Setakat ini, anda telah melihat bagaimana semua pendaftaran anda untuk menambah alat, sumber dan prompt boleh digantikan dengan dua pengendali ini bagi setiap jenis ciri. Apa lagi yang perlu kita lakukan? Baik, kita harus menambah beberapa bentuk pengesahan untuk memastikan bahawa alat dipanggil dengan hujah yang betul. Setiap runtime mempunyai penyelesaian mereka sendiri untuk ini, contohnya Python menggunakan Pydantic dan TypeScript menggunakan Zod. Idenya adalah bahawa kita melakukan perkara berikut:

- Memindahkan logik untuk mencipta ciri (alat, sumber atau prompt) ke folder khususnya.
- Menambah cara untuk mengesahkan permintaan yang masuk yang meminta contohnya memanggil alat.

### Mencipta ciri

Untuk mencipta ciri, kita perlu mencipta fail untuk ciri itu dan memastikan ia mempunyai medan mandatori yang diperlukan oleh ciri itu. Medan yang berbeza sedikit antara alat, sumber dan prompt.

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
        # Sahkan input menggunakan model Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: tambah Pydantic, supaya kita boleh cipta AddInputModel dan sahkan args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

di sini anda boleh lihat bagaimana kami melakukan perkara berikut:

- Mencipta skema menggunakan Pydantic `AddInputModel` dengan medan `a` dan `b` dalam fail *schema.py*.
- Cuba untuk mengurai permintaan yang masuk menjadi jenis `AddInputModel`, jika terdapat ketidakpadanan dalam parameter ini akan menyebabkan kemalangan:

   ```python
   # add.py
    try:
        # Sahkan input menggunakan model Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Anda boleh memilih sama ada untuk meletakkan logik penguraian ini dalam panggilan alat itu sendiri atau dalam fungsi pengendali.

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

- Dalam pengendali yang mengendalikan semua panggilan alat, kami kini cuba mengurai permintaan yang masuk ke dalam skema yang ditakrifkan oleh alat itu:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    jika itu berjaya maka kami terus memanggil alat sebenar:

    ```typescript
    const result = await tool.callback(input);
    ```

Seperti yang anda lihat, pendekatan ini mencipta seni bina yang hebat kerana segala-galanya ada tempatnya, *server.ts* adalah fail yang sangat kecil yang hanya menyambungkan pengendali permintaan dan setiap ciri berada dalam folder masing-masing iaitu tools/, resources/ atau /prompts.

Hebat, mari kita cuba bina ini seterusnya. 

## Latihan: Mencipta server peringkat rendah

Dalam latihan ini, kami akan melakukan perkara berikut:

1. Mencipta server peringkat rendah yang mengendalikan penyenaraian alat dan pemanggilan alat.
1. Melaksanakan seni bina yang anda boleh bina di atasnya.
1. Menambah pengesahan untuk memastikan panggilan alat anda disahkan dengan betul.

### -1- Cipta seni bina

Perkara pertama yang perlu kita atasi ialah seni bina yang membantu kita skala apabila kita menambah lebih banyak ciri, berikut adalah bagaimana ia kelihatan:

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

Kini kita telah menyediakan seni bina yang memastikan kita boleh menambah alat baru dengan mudah dalam folder tools. Jangan ragu untuk mengikuti ini untuk menambah subdirektori untuk sumber dan prompt.

### -2- Mencipta alat

Mari kita lihat bagaimana penciptaan alat kelihatan seterusnya. Pertama, ia perlu dicipta dalam subdirektori *tool* seperti berikut:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Sahkan input menggunakan model Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: tambah Pydantic, supaya kita boleh buat AddInputModel dan sahkan args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Apa yang kita lihat di sini adalah bagaimana kita mentakrifkan nama, deskripsi, dan skema input menggunakan Pydantic dan pengendali yang akan dipanggil apabila alat ini dipanggil. Akhir sekali, kita dedahkan `tool_add` yang merupakan kamus yang memegang semua sifat ini.

Terdapat juga *schema.py* yang digunakan untuk mentakrifkan skema input yang digunakan oleh alat kita:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Kita juga perlu mengisi *__init__.py* untuk memastikan direktori tools dilayan sebagai modul. Selain itu, kita perlu mendedahkan modul di dalamnya seperti berikut:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Kita boleh terus menambah ke fail ini apabila kita menambah lebih banyak alat.

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

Di sini kami mencipta kamus yang terdiri daripada sifat:

- name, ini adalah nama alat.
- rawSchema, ini adalah skema Zod, ia akan digunakan untuk mengesahkan permintaan yang masuk untuk memanggil alat ini.
- inputSchema, skema ini akan digunakan oleh pengendali.
- callback, ini digunakan untuk memanggil alat.

Terdapat juga `Tool` yang digunakan untuk menukar kamus ini menjadi jenis yang pengendali mcp server boleh terima dan ia kelihatan seperti berikut:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Dan terdapat *schema.ts* di mana kami menyimpan skema input untuk setiap alat yang kelihatan seperti berikut dengan hanya satu skema pada masa ini tetapi apabila kita menambah alat kita boleh menambah lebih banyak entri:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Hebat, mari kita teruskan untuk mengendalikan penyenaraian alat kita seterusnya.

### -3- Mengendalikan penyenaraian alat

Seterusnya, untuk mengendalikan penyenaraian alat kita, kita perlu menyediakan pengendali permintaan untuk itu. Berikut adalah apa yang perlu kita tambah ke fail server kita:

**Python**

```python
# kod dipotong untuk ringkasan
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

Di sini, kami menambah dekorator `@server.list_tools` dan fungsi pelaksana `handle_list_tools`. Dalam fungsi terakhir ini, kita perlu menghasilkan senarai alat. Perhatikan bagaimana setiap alat perlu mempunyai nama, deskripsi dan inputSchema.   

**TypeScript**

Untuk menyediakan pengendali permintaan untuk menyenaraikan alat, kita perlu memanggil `setRequestHandler` pada server dengan skema yang sesuai dengan apa yang cuba kita lakukan, dalam kes ini `ListToolsRequestSchema`. 

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
// kod diabaikan untuk ringkasan
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Kembalikan senarai alat yang didaftarkan
  return {
    tools: tools
  };
});
```

Hebat, kini kita telah menyelesaikan bahagian penyenaraian alat, mari kita lihat bagaimana kita boleh memanggil alat seterusnya.

### -4- Mengendalikan panggilan alat

Untuk memanggil alat, kita perlu menyediakan satu lagi pengendali permintaan, kali ini memfokuskan pada mengendalikan permintaan yang menentukan ciri mana untuk dipanggil dan dengan hujah apa.

**Python**

Mari gunakan dekorator `@server.call_tool` dan melakukannya dengan fungsi seperti `handle_call_tool`. Dalam fungsi itu, kita perlu mengurai nama alat, argumennya dan memastikan hujah itu sah untuk alat yang dimaksudkan. Kita boleh mengesahkan hujah dalam fungsi ini atau kemudian dalam alat sebenar.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools adalah kamus dengan nama alat sebagai kunci
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # panggil alat tersebut
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Ini yang berlaku:

- Nama alat kita sudah ada sebagai parameter input `name` yang betul untuk argumen kita dalam bentuk kamus `arguments`.

- Alat itu dipanggil dengan `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Pengesahan hujah berlaku dalam sifat `handler` yang menunjuk ke fungsi, jika itu gagal ia akan mengangkat pengecualian.

Itu sahaja, kini kita mempunyai pemahaman penuh tentang penyenaraian dan pemanggilan alat menggunakan server peringkat rendah.

Lihat [contoh penuh](./code/README.md) di sini

## Tugasan

Perluaskan kod yang telah diberikan dengan beberapa alat, sumber dan prompt dan renungkan bagaimana anda perasan bahawa anda hanya perlu menambah fail dalam direktori tools dan tiada tempat lain. 

*Tiada penyelesaian diberikan*

## Ringkasan

Dalam bab ini, kita telah melihat bagaimana pendekatan server peringkat rendah berfungsi dan bagaimana ia boleh membantu kita mencipta seni bina yang baik yang kita boleh terus bina. Kita juga membincangkan pengesahan dan anda ditunjukkan bagaimana bekerja dengan perpustakaan pengesahan untuk mencipta skema bagi pengesahan input.

## Apa Seterusnya

- Seterusnya: [Pengesahan Mudah](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->