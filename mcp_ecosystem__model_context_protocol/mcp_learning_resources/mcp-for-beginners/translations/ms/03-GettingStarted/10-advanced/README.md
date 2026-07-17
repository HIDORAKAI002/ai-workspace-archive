# Penggunaan pelayan lanjutan

Terdapat dua jenis pelayan yang dipamerkan dalam MCP SDK, pelayan biasa anda dan pelayan tahap rendah. Biasanya, anda akan menggunakan pelayan biasa untuk menambah ciri kepadanya. Namun untuk beberapa kes, anda mahu bergantung pada pelayan tahap rendah seperti:

- Seni bina yang lebih baik. Adalah mungkin untuk mencipta seni bina yang bersih dengan kedua-dua pelayan biasa dan pelayan tahap rendah tetapi ia boleh dipertikaikan bahawa ia sedikit lebih mudah dengan pelayan tahap rendah.
- Ketersediaan ciri. Sesetengah ciri lanjutan hanya boleh digunakan dengan pelayan tahap rendah. Anda akan melihat ini dalam bab kemudian semasa kami menambah pensampelan (dihentikan dalam calon pelepasan `2026-07-28`) dan elicitation.

## Pelayan biasa vs pelayan tahap rendah

Inilah rupa penciptaan Pelayan MCP dengan pelayan biasa

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

// Tambah alat penambahan
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

Intinya adalah anda secara eksplisit menambah setiap alat, sumber atau prompt yang anda mahu pelayan miliki. Tiada apa yang salah dengan itu.  

### Pendekatan pelayan tahap rendah

Walau bagaimanapun, apabila anda menggunakan pendekatan pelayan tahap rendah anda perlu memikirkannya secara berbeza. Daripada mendaftarkan setiap alat, anda sebaliknya mencipta dua pengendali bagi setiap jenis ciri (alat, sumber atau prompt). Jadi sebagai contoh alat hanya mempunyai dua fungsi seperti berikut:

- Menyenaraikan semua alat. Satu fungsi akan bertanggungjawab untuk semua percubaan menyenaraikan alat.
- mengendalikan panggilan ke semua alat. Di sini juga, hanya ada satu fungsi yang mengendalikan panggilan ke alat

Kedengaran seperti mungkin kerja yang lebih sedikit bukan? Jadi daripada mendaftarkan alat, saya hanya perlu memastikan alat disenaraikan apabila saya menyenaraikan semua alat dan ia dipanggil apabila ada permintaan masuk untuk memanggil alat. 

Mari lihat bagaimana kod itu sekarang:

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
  // Pulangkan senarai alat yang berdaftar
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

Di sini kita sekarang mempunyai fungsi yang mengembalikan senarai ciri. Setiap entri dalam senarai alat kini mempunyai medan seperti `name`, `description` dan `inputSchema` untuk mematuhi jenis pengembalian. Ini membolehkan kita meletakkan alat dan definisi ciri kita di tempat lain. Kita kini boleh mencipta semua alat kita dalam folder alat dan perkara yang sama berlaku untuk semua ciri anda supaya projek anda boleh diatur seperti berikut:

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

Ini hebat, seni bina kita boleh dibuat kelihatan agak bersih.

Bagaimana pula dengan memanggil alat, adakah ia idea yang sama kemudian, satu pengendali untuk memanggil satu alat, mana-mana alat? Ya, tepat sekali, ini kod untuk itu:

**Python**

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
    // TODO panggil alatan,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Seperti yang anda lihat dari kod di atas, kita perlu memproses alat untuk dipanggil, dan dengan argumen apa, kemudian kita perlu meneruskan memanggil alat itu.

## Memperbaiki pendekatan dengan pengesahan

Setakat ini, anda telah melihat bagaimana semua pendaftaran anda untuk menambah alat, sumber dan prompt boleh digantikan dengan dua pengendali bagi setiap jenis ciri ini. Apa lagi yang kita perlu buat? Baiklah, kita harus menambah beberapa bentuk pengesahan untuk memastikan bahawa alat dipanggil dengan argumen yang betul. Setiap runtime mempunyai penyelesaian sendiri untuk ini, contohnya Python menggunakan Pydantic dan TypeScript menggunakan Zod. Idea adalah kita melakukan perkara berikut:

- Memindahkan logik untuk mencipta ciri (alat, sumber atau prompt) ke folder dikhaskan.
- Menambah cara untuk mengesahkan permintaan masuk yang meminta contohnya untuk memanggil alat.

### Mencipta ciri

Untuk mencipta ciri, kita perlu mencipta fail untuk ciri itu dan pastikan ia mempunyai medan mandatori yang diperlukan bagi ciri itu. Medan yang berbeza sedikit antara alat, sumber dan prompt.

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

    # TODO: tambah Pydantic, supaya kita boleh mencipta AddInputModel dan mengesahkan args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

di sini anda boleh lihat bagaimana kita melakukan perkara berikut:

- Membuat skema menggunakan Pydantic `AddInputModel` dengan medan `a` dan `b` dalam fail *schema.py*.
- Mencuba untuk memproses permintaan masuk menjadi jenis `AddInputModel`, jika ada ketidakpadanan dalam parameter ia akan menyebabkan ralat:

   ```python
   # add.py
    try:
        # Sahkan input menggunakan model Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Anda boleh memilih sama ada meletakkan logik pemprosesan ini dalam panggilan alat itu sendiri atau dalam fungsi pengendali.

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

- Dalam pengendali yang menangani semua panggilan alat, kita kini cuba memproses permintaan masuk ke dalam skema yang ditakrifkan alat:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    jika itu berjaya maka kita teruskan memanggil alat sebenar:

    ```typescript
    const result = await tool.callback(input);
    ```

Seperti yang anda lihat, pendekatan ini mencipta seni bina yang hebat kerana semuanya ada tempatnya, *server.ts* adalah fail yang sangat kecil yang hanya menyambungkan pengendali permintaan dan setiap ciri berada dalam folder masing-masing iaitu tools/, resources/ atau /prompts.

Hebat, mari kita cuba bina ini seterusnya. 

## Latihan: Mencipta pelayan tahap rendah

Dalam latihan ini, kita akan melakukan perkara berikut:

1. Mencipta pelayan tahap rendah yang mengendalikan senarai alat dan panggilan alat.
1. Melaksanakan seni bina yang anda boleh bina atasnya.
1. Menambah pengesahan untuk memastikan panggilan alat anda disahkan dengan betul.

### -1- Mencipta seni bina

Perkara pertama yang perlu kita atasi adalah seni bina yang membantu kita skala apabila kita menambah lebih banyak ciri, inilah rupanya:

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

Kini kita telah menetapkan seni bina yang memastikan kita boleh menambah alat baru dengan mudah dalam folder alat. Sila ikut ini untuk menambah subdirektori untuk sumber dan prompt.

### -2- Mencipta alat

Mari lihat bagaimana rupa mencipta alat seterusnya. Pertama, ia perlu dicipta dalam subdirektori *tool* seperti berikut:

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

Apa yang kita lihat di sini adalah bagaimana kita mentakrifkan nama, keterangan, dan skema input menggunakan Pydantic dan pengendali yang akan dipanggil apabila alat ini dipanggil. Akhir sekali, kita dedahkan `tool_add` yang merupakan kamus yang memegang semua harta ini.

Terdapat juga *schema.py* yang digunakan untuk mentakrifkan skema input yang digunakan oleh alat kita:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Kita juga perlu mengisi *__init__.py* untuk memastikan direktori alat dilayan sebagai modul. Selain itu, kita perlu dedahkan modul di dalamnya seperti berikut:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Kita boleh terus menambah pada fail ini semasa menambah lebih banyak alat.

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

Di sini kita mencipta kamus yang terdiri daripada harta:

- name, ini adalah nama alat.
- rawSchema, ini adalah skema Zod, ia akan digunakan untuk mengesahkan permintaan yang masuk untuk memanggil alat ini.
- inputSchema, skema ini akan digunakan oleh pengendali.
- callback, ini digunakan untuk memanggil alat.

Terdapat juga `Tool` yang digunakan untuk menukar kamus ini menjadi jenis yang boleh diterima oleh pengendali pelayan mcp dan ia kelihatan seperti berikut:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Dan terdapat *schema.ts* di mana kita menyimpan skema input untuk setiap alat yang kelihatan seperti ini dengan hanya satu skema buat masa ini tetapi apabila kita menambah alat kita boleh tambah lebih banyak entri:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Hebat, mari kita teruskan mengendalikan senarai alat kita seterusnya.

### -3- Mengendalikan senarai alat

Seterusnya, untuk mengendalikan penyenaraian alat kita, kita perlu menyediakan pengendali permintaan untuk itu. Inilah yang perlu kita tambah pada fail pelayan kita:

**Python**

```python
# kod dikurangkan untuk menjimatkan ruang
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

Di sini, kita tambah dekorator `@server.list_tools` dan fungsi pelaksanaan `handle_list_tools`. Dalam yang kedua, kita perlu menghasilkan senarai alat. Perhatikan bagaimana setiap alat perlu mempunyai nama, keterangan dan inputSchema.   

**TypeScript**

Untuk menyediakan pengendali permintaan bagi penyenaraian alat, kita perlu memanggil `setRequestHandler` pada pelayan dengan skema yang sesuai dengan apa yang kita cuba lakukan, dalam kes ini `ListToolsRequestSchema`. 

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
  // Pulangkan senarai alat yang didaftarkan
  return {
    tools: tools
  };
});
```

Hebat, kini kita telah menyelesaikan bahagian penyenaraian alat, mari lihat bagaimana kita boleh memanggil alat seterusnya.

### -4- Mengendalikan panggilan alat

Untuk memanggil alat, kita perlu sediakan satu lagi pengendali permintaan, kali ini fokus kepada menangani permintaan yang menentukan ciri mana untuk dipanggil dan dengan argumen apa.

**Python**

Mari gunakan dekorator `@server.call_tool` dan laksanakan dengan fungsi seperti `handle_call_tool`. Dalam fungsi itu, kita perlu memproses nama alat, argumennya dan memastikan argumen adalah sah untuk alat yang dimaksudkan. Kita boleh mengesahkan argumen dalam fungsi ini atau di bawah aliran dalam alat sebenar.

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

Inilah yang berlaku:

- Nama alat kita sudah ada sebagai parameter input `name` yang sama untuk argumen kita dalam bentuk kamus `arguments`.

- Alat dipanggil dengan `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Pengesahan argumen berlaku di dalam sifat `handler` yang menunjuk kepada fungsi, jika gagal ia akan mengeluarkan pengecualian. 

Di sana, sekarang kita mempunyai pemahaman penuh tentang penyenaraian dan pemanggilan alat menggunakan pelayan tahap rendah.

Lihat [contoh penuh](./code/README.md) di sini

## Tugasan

Luaskan kod yang diberikan kepada anda dengan beberapa alat, sumber dan prompt dan renungkan bagaimana anda perasan yang anda hanya perlu menambah fail dalam direktori alat dan tiada tempat lain. 

*Tiada penyelesaian diberikan*

## Ringkasan

Dalam bab ini, kita melihat bagaimana pendekatan pelayan tahap rendah berfungsi dan bagaimana ia boleh membantu kita mencipta seni bina yang bagus yang boleh kita terus bina. Kita juga membincangkan pengesahan dan anda telah ditunjukkan bagaimana untuk bekerja dengan perpustakaan pengesahan untuk mencipta skema bagi pengesahan input.

## Apa seterusnya

- Seterusnya: [Pengesahan Mudah](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->