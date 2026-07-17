# Penggunaan server tingkat lanjut

Ada dua jenis server yang tersedia di MCP SDK, server biasa dan server tingkat rendah. Biasanya, Anda menggunakan server biasa untuk menambahkan fitur. Namun dalam beberapa kasus, Anda ingin mengandalkan server tingkat rendah seperti:

- Arsitektur yang lebih baik. Mungkin membuat arsitektur yang bersih dengan server biasa dan server tingkat rendah, tapi bisa dibilang sedikit lebih mudah dengan server tingkat rendah.
- Ketersediaan fitur. Beberapa fitur canggih hanya bisa digunakan dengan server tingkat rendah. Anda akan melihat ini di bab selanjutnya saat kita menambahkan sampling (deprecated dalam rilis kandidat `2026-07-28`) dan elicitation.

## Server biasa vs server tingkat rendah

Berikut tampilan pembuatan MCP Server menggunakan server biasa

**Python**

```python
mcp = FastMCP("Demo")

# Tambahkan alat penjumlahan
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

// Tambahkan alat penambahan
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

Intinya adalah Anda secara eksplisit menambahkan setiap alat, sumber daya, atau prompt yang ingin server miliki. Tidak ada yang salah dengan itu.  

### Pendekatan server tingkat rendah

Namun, saat menggunakan pendekatan server tingkat rendah Anda harus memikirkannya berbeda. Alih-alih mendaftarkan setiap alat, Anda membuat dua handler per tipe fitur (alat, sumber daya, atau prompt). Misalnya alat hanya memiliki dua fungsi seperti ini:

- Mendaftar semua alat. Satu fungsi bertanggung jawab untuk semua upaya mendaftar alat.
- Menangani pemanggilan semua alat. Di sini juga, hanya ada satu fungsi yang menangani pemanggilan alat

Terdengar seperti pekerjaan yang lebih sedikit kan? Jadi alih-alih mendaftarkan alat, saya hanya perlu memastikan alat tersebut tercantum saat saya mendaftar semua alat dan dipanggil ketika ada permintaan masuk untuk memanggil alat tersebut. 

Mari lihat bagaimana kode sekarang:

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
  // Kembalikan daftar alat yang terdaftar
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

Di sini sekarang ada fungsi yang mengembalikan daftar fitur. Setiap entri di daftar alat sekarang memiliki field seperti `name`, `description` dan `inputSchema` sesuai tipe pengembalian. Ini memungkinkan kita menyimpan definisi alat dan fitur di tempat lain. Kita sekarang bisa membuat semua alat di folder tools dan begitu juga fitur lainnya agar proyek kita terorganisir seperti ini:

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

Bagus, arsitektur kita bisa dibuat cukup bersih.

Bagaimana dengan pemanggilan alat, apakah idenya sama, satu handler untuk memanggil alat, alat mana saja? Ya, persis, ini kodenya:

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

Dari kode di atas, kita perlu mem-parsing alat yang akan dipanggil, dengan argumen apa, lalu melanjutkan memanggil alat tersebut.

## Memperbaiki pendekatan dengan validasi

Sejauh ini, Anda telah melihat bagaimana semua pendaftaran untuk menambah alat, sumber daya, dan prompt bisa diganti dengan dua handler per tipe fitur ini. Apa lagi yang perlu dilakukan? Kita harus menambahkan validasi untuk memastikan alat dipanggil dengan argumen yang benar. Setiap runtime punya solusi sendiri untuk ini, misalnya Python menggunakan Pydantic dan TypeScript menggunakan Zod. Idemnya adalah:

- Memindahkan logika pembuatan fitur (alat, sumber daya, atau prompt) ke folder khusus.
- Menambahkan cara untuk memvalidasi permintaan masuk, misalnya untuk pemanggilan alat.

### Membuat fitur

Untuk membuat fitur, kita perlu membuat file untuk fitur tersebut dan memastikan memiliki field wajib yang diperlukan fitur itu. Field yang wajib berbeda sedikit antara alat, sumber daya, dan prompt.

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
        # Validasi input menggunakan model Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: tambahkan Pydantic, sehingga kita dapat membuat AddInputModel dan memvalidasi args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Di sini Anda bisa lihat kita melakukan:

- Membuat schema menggunakan Pydantic `AddInputModel` dengan field `a` dan `b` dalam file *schema.py*.
- Mencoba mem-parsing permintaan masuk menjadi `AddInputModel`, jika parameter tidak cocok maka akan error:

   ```python
   # add.py
    try:
        # Memvalidasi input menggunakan model Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Anda bisa memilih meletakkan logika parsing ini di pemanggilan alat itu sendiri atau di fungsi handler.

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

// tambah.ts
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

- Di handler yang menangani semua pemanggilan alat, sekarang kita coba parsing permintaan masuk ke dalam schema alat yang ditentukan:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    Jika berhasil maka kita lanjut memanggil alat sebenarnya:

    ```typescript
    const result = await tool.callback(input);
    ```

Seperti Anda lihat, pendekatan ini menciptakan arsitektur bagus karena semuanya punya tempat, *server.ts* adalah file kecil yang hanya menghubungkan handler dan setiap fitur ada di folder masing-masing seperti tools/, resources/ atau /prompts.

Bagus, mari kita coba buat ini selanjutnya. 

## Latihan: Membuat server tingkat rendah

Dalam latihan ini, kita akan melakukan:

1. Membuat server tingkat rendah yang menangani daftar alat dan pemanggilan alat.
1. Menerapkan arsitektur yang dapat Anda kembangkan.
1. Menambahkan validasi agar pemanggilan alat tervalidasi dengan benar.

### -1- Membuat arsitektur

Yang pertama harus kita atasi adalah arsitektur yang membantu kita skala saat menambah fitur, ini tampaknya seperti:

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

Sekarang kita sudah atur arsitektur yang memastikan kita bisa mudah menambah alat baru di folder tools. Silakan buat subdirektori untuk resources dan prompts.

### -2- Membuat alat

Mari lihat apa itu membuat alat. Pertama, alat harus dibuat di subdirektori *tool* seperti ini:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validasi input menggunakan model Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: tambahkan Pydantic, supaya kita bisa membuat AddInputModel dan memvalidasi argumen

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Yang kita lihat di sini adalah bagaimana kita mendefinisikan name, description, dan input schema menggunakan Pydantic dan handler yang akan dipanggil saat alat ini dipanggil. Terakhir, kita expose `tool_add` yang merupakan dictionary yang menampung properti tersebut.

Ada juga *schema.py* yang digunakan untuk definisi schema input alat kita:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Kita juga harus isi *__init__.py* agar folder tools dianggap modul. Selain itu kita expose modul di dalamnya seperti ini:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Kita bisa terus menambah di file ini saat menambah alat lagi.

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

Di sini kita membuat dictionary berisi properti:

- name, ini nama alat.
- rawSchema, schema Zod yang digunakan untuk validasi permintaan masuk memanggil alat ini.
- inputSchema, schema ini digunakan handler.
- callback, digunakan untuk memanggil alat.

Ada juga `Tool` yang digunakan untuk mengubah dictionary menjadi tipe yang diterima handler mcp server dan tampilannya seperti ini:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Dan ada *schema.ts* tempat menyimpan schema input tiap alat yang terlihat seperti ini dengan satu schema sekarang tapi bisa tambah saat alat bertambah:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Bagus, mari kita lanjut tangani pendaftaran alat kita selanjutnya.

### -3- Menangani daftar alat

Selanjutnya, untuk menangani daftar alat, kita perlu buat handler permintaan untuk itu. Berikut yang perlu ditambahkan ke file server:

**Python**

```python
# kode dihilangkan untuk singkatnya
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

Di sini kita tambahkan dekorator `@server.list_tools` dan fungsi implementasi `handle_list_tools`. Dalam fungsi ini, kita harus membuat daftar alat. Perhatikan bahwa setiap alat harus punya name, description dan inputSchema.   

**TypeScript**

Untuk membuat handler permintaan daftar alat, kita panggil `setRequestHandler` pada server dengan schema yang cocok dengan yang kita lakukan, dalam hal ini `ListToolsRequestSchema`. 

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
// kode dihilangkan untuk singkatnya
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Mengembalikan daftar alat yang terdaftar
  return {
    tools: tools
  };
});
```

Bagus, sekarang kita sudah selesaikan bagian daftar alat, mari lihat bagaimana cara memanggil alat.

### -4- Menangani pemanggilan alat

Untuk memanggil alat, kita perlu buat handler permintaan lain, kali ini fokus pada permintaan yang menentukan fitur mana yang dipanggil dan dengan argumen apa.

**Python**

Kita gunakan dekorator `@server.call_tool` dan implementasikan dengan fungsi seperti `handle_call_tool`. Dalam fungsi ini, kita harus mem-parsing nama alat, argumennya dan memastikan argumen valid untuk alat tersebut. Validasi bisa dilakukan di fungsi ini atau di alat sebenarnya.

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
        # panggil alat tersebut
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Berikut yang terjadi:

- Nama alat kita sudah ada sebagai parameter input `name`, yang benar untuk argumen kita dalam bentuk dictionary `arguments`.

- Alat dipanggil dengan `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validasi argumen terjadi di properti `handler` yang menunjuk ke fungsi, jika gagal akan melempar exception. 

Nah, sekarang kita paham penuh cara daftar dan panggil alat menggunakan server tingkat rendah.

Lihat [contoh lengkap](./code/README.md) di sini

## Tugas

Tambahkan kode yang sudah ada dengan beberapa alat, sumber daya, dan prompt dan renungkan bagaimana Anda hanya perlu menambah file di direktori tools dan tidak perlu ke tempat lain. 

*Tidak ada solusi disediakan*

## Ringkasan

Dalam bab ini, kita melihat bagaimana pendekatan server tingkat rendah bekerja dan bagaimana membantu menciptakan arsitektur yang bagus untuk terus dikembangkan. Kita juga membahas validasi dan Anda diperlihatkan cara menggunakan perpustakaan validasi untuk membuat schema validasi input.

## Selanjutnya

- Selanjutnya: [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->