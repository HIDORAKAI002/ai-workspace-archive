# Penggunaan server tingkat lanjut

Ada dua jenis server yang diekspos dalam MCP SDK, server biasa Anda dan server tingkat rendah. Biasanya, Anda akan menggunakan server biasa untuk menambahkan fitur ke dalamnya. Namun, dalam beberapa kasus, Anda ingin mengandalkan server tingkat rendah seperti:

- Arsitektur yang lebih baik. Memungkinkan untuk membuat arsitektur yang bersih dengan server biasa dan server tingkat rendah tetapi dapat dikatakan sedikit lebih mudah dengan server tingkat rendah.
- Ketersediaan fitur. Beberapa fitur lanjutan hanya dapat digunakan dengan server tingkat rendah. Anda akan melihat ini di bab selanjutnya saat kami menambahkan sampling dan elicitation.

## Server biasa vs server tingkat rendah

Berikut tampilan pembuatan MCP Server dengan server biasa

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

// Tambahkan alat penjumlahan
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

Intinya adalah Anda secara eksplisit menambahkan setiap alat, sumber daya, atau prompt yang Anda inginkan server miliki. Tidak ada yang salah dengan itu.

### Pendekatan server tingkat rendah

Namun, saat Anda menggunakan pendekatan server tingkat rendah Anda perlu memikirkannya secara berbeda. Alih-alih mendaftarkan setiap alat, Anda malah membuat dua handler per tipe fitur (alat, sumber daya, atau prompt). Jadi misalnya alat hanya memiliki dua fungsi seperti berikut:

- Mendaftar semua alat. Satu fungsi bertanggung jawab untuk semua upaya daftar alat.
- Menangani pemanggilan semua alat. Di sini juga, hanya ada satu fungsi yang menangani pemanggilan alat.

Kedengarannya seperti pekerjaan yang potensial lebih sedikit, bukan? Jadi alih-alih mendaftarkan alat, saya hanya perlu memastikan alat tersebut tercantum saat saya mendaftar semua alat dan dipanggil saat ada permintaan masuk untuk memanggil alat tersebut.

Mari kita lihat sekarang seperti apa kodenya:

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

Sekarang kita memiliki fungsi yang mengembalikan daftar fitur. Setiap entri dalam daftar alat sekarang memiliki bidang seperti `name`, `description` dan `inputSchema` agar sesuai dengan tipe pengembalian. Ini memungkinkan kami untuk menempatkan alat dan definisi fitur di tempat lain. Sekarang kita dapat membuat semua alat kita di folder tools dan hal yang sama berlaku untuk semua fitur Anda sehingga proyek Anda bisa diorganisir seperti ini:

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

Bagus, arsitektur kita bisa dibuat terlihat cukup bersih.

Bagaimana dengan memanggil alat, apakah ide yang sama, satu handler untuk memanggil alat, alat mana pun? Ya, tepat sekali, berikut kodenya:

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

Seperti yang Anda lihat dari kode di atas, kita perlu mem-parsing alat untuk dipanggil, dan dengan argumen apa, lalu kita perlu melanjutkan memanggil alat tersebut.

## Meningkatkan pendekatan dengan validasi

Sejauh ini, Anda telah melihat bagaimana semua pendaftaran Anda untuk menambahkan alat, sumber daya, dan prompt dapat digantikan dengan dua handler ini per tipe fitur. Apa lagi yang perlu kita lakukan? Nah, kita harus menambahkan beberapa bentuk validasi untuk memastikan alat dipanggil dengan argumen yang tepat. Setiap runtime memiliki solusi sendiri untuk ini, misalnya Python menggunakan Pydantic dan TypeScript menggunakan Zod. Ide dasarnya adalah kita melakukan hal berikut:

- Memindahkan logika untuk membuat fitur (alat, sumber daya, atau prompt) ke folder khususnya.
- Menambahkan cara untuk memvalidasi permintaan masuk yang misalnya meminta pemanggilan alat.

### Membuat fitur

Untuk membuat fitur, kita perlu membuat file untuk fitur itu dan memastikan memiliki bidang wajib yang diperlukan fitur tersebut. Bidang mana yang berbeda sedikit antara alat, sumber daya dan prompt.

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

    # TODO: tambahkan Pydantic, sehingga kita bisa membuat AddInputModel dan memvalidasi args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

di sini Anda bisa melihat bagaimana kami melakukan hal berikut:

- Membuat skema menggunakan Pydantic `AddInputModel` dengan bidang `a` dan `b` pada file *schema.py*.
- Mencoba mem-parsing permintaan masuk agar sesuai tipe `AddInputModel`, jika ada ketidaksesuaian parameter program akan gagal:

   ```python
   # add.py
    try:
        # Validasi input menggunakan model Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Anda dapat memilih untuk meletakkan logika parsing ini baik di pemanggilan alat itu sendiri atau dalam fungsi handler.

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

- Dalam handler yang menangani semua pemanggilan alat, kita sekarang mencoba mem-parsing permintaan masuk ke skema yang didefinisikan alat:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    jika berhasil kita lanjutkan untuk memanggil alat tersebut:

    ```typescript
    const result = await tool.callback(input);
    ```

Seperti yang Anda lihat, pendekatan ini menciptakan arsitektur yang bagus karena semuanya memiliki tempatnya, *server.ts* adalah file sangat kecil yang hanya menghubungkan handler permintaan dan setiap fitur berada di foldernya masing-masing yaitu tools/, resources/ atau /prompts.

Bagus, mari kita coba membangun ini selanjutnya.

## Latihan: Membuat server tingkat rendah

Dalam latihan ini, kita akan melakukan hal berikut:

1. Membuat server tingkat rendah yang menangani daftar alat dan pemanggilan alat.
1. Mengimplementasikan arsitektur yang dapat Anda bangun.
1. Menambahkan validasi untuk memastikan panggilan alat Anda tervalidasi dengan baik.

### -1- Membuat arsitektur

Hal pertama yang perlu kita atasi adalah arsitektur yang membantu kita skala saat kita menambahkan lebih banyak fitur, ini bentuknya:

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

Sekarang kita sudah menyiapkan arsitektur yang memastikan kita dapat dengan mudah menambahkan alat baru di folder tools. Silakan ikuti ini untuk menambahkan subdirektori untuk resources dan prompts.

### -2- Membuat alat

Mari kita lihat seperti apa membuat alat berikutnya. Pertama, alat harus dibuat dalam subdirektori *tool* seperti berikut:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validasi input menggunakan model Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: tambahkan Pydantic, sehingga kita dapat membuat AddInputModel dan memvalidasi argumen

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Yang kita lihat di sini adalah bagaimana kita mendefinisikan nama, deskripsi, dan skema input menggunakan Pydantic dan handler yang akan dipanggil setelah alat ini dipanggil. Terakhir, kita mengekspos `tool_add` yang merupakan dictionary yang menyimpan semua properti ini.

Ada juga *schema.py* yang digunakan untuk mendefinisikan skema input yang dipakai alat kita:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Kita juga perlu mengisi *__init__.py* agar direktori tools diperlakukan sebagai modul. Selain itu, kita perlu mengekspos modul-modul di dalamnya seperti ini:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Kita bisa terus menambah di file ini saat menambahkan lebih banyak alat.

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

Di sini kita membuat dictionary yang terdiri dari properti:

- name, ini adalah nama alat.
- rawSchema, ini adalah skema Zod, akan digunakan untuk memvalidasi permintaan masuk untuk memanggil alat ini.
- inputSchema, skema ini akan digunakan oleh handler.
- callback, ini digunakan untuk memanggil alat.

Ada juga `Tool` yang digunakan untuk mengonversi dictionary ini menjadi tipe yang bisa diterima handler server mcp dan bentuknya seperti ini:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Dan ada *schema.ts* tempat kita menyimpan skema input untuk setiap alat yang tampak seperti ini dengan hanya satu skema untuk saat ini tetapi saat kita menambah alat kita bisa menambah entry lain:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Bagus, mari lanjutkan ke penanganan daftar alat berikutnya.

### -3- Menangani daftar alat

Selanjutnya, untuk menangani daftar alat, kita perlu menyiapkan handler permintaan untuk itu. Berikut yang perlu kita tambahkan di file server:

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

Di sini, kita menambahkan dekorator `@server.list_tools` dan fungsi implementasi `handle_list_tools`. Di fungsi tersebut, kita perlu menghasilkan daftar alat. Perhatikan bagaimana setiap alat perlu memiliki nama, deskripsi dan inputSchema.

**TypeScript**

Untuk menyiapkan handler permintaan untuk daftar alat, kita perlu memanggil `setRequestHandler` pada server dengan skema yang cocok dengan apa yang ingin kita lakukan, dalam hal ini `ListToolsRequestSchema`.

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
// kode dihilangkan untuk ringkasan
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Kembalikan daftar alat yang terdaftar
  return {
    tools: tools
  };
});
```

Bagus, sekarang kita sudah menyelesaikan bagian daftar alat, mari kita lihat bagaimana kita bisa memanggil alat selanjutnya.

### -4- Menangani pemanggilan alat

Untuk memanggil alat, kita perlu menyiapkan handler permintaan lain, kali ini fokus pada menangani permintaan yang menentukan fitur mana yang akan dipanggil dan dengan argumen apa.

**Python**

Mari gunakan dekorator `@server.call_tool` dan implementasikan dengan fungsi seperti `handle_call_tool`. Dalam fungsi tersebut, kita perlu mem-parsing nama alat, argumennya dan memastikan argumen valid untuk alat yang dimaksud. Kita bisa memvalidasi argumen di fungsi ini atau di alat sebenarnya.

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

Berikut yang terjadi:

- Nama alat sudah tersedia sebagai parameter input `name` yang sesuai untuk argumen kita dalam bentuk dictionary `arguments`.

- Alat dipanggil dengan `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Validasi argumen terjadi di properti `handler` yang menunjuk ke fungsi, jika gagal maka akan menimbulkan pengecualian.

Nah, sekarang kita sudah punya pemahaman lengkap tentang daftar dan pemanggilan alat menggunakan server tingkat rendah.

Lihat [contoh lengkap](./code/README.md) di sini

## Tugas

Perluas kode yang telah diberikan dengan sejumlah alat, sumber daya, dan prompt dan refleksikan bagaimana Anda menyadari bahwa Anda hanya perlu menambahkan file di direktori tools dan tidak di tempat lain.

*Tidak ada solusi diberikan*

## Ringkasan

Dalam bab ini, kita melihat bagaimana pendekatan server tingkat rendah bekerja dan bagaimana hal itu bisa membantu kita membuat arsitektur yang bagus untuk terus dibangun. Kita juga membahas validasi dan Anda diperlihatkan cara menggunakan library validasi untuk membuat skema validasi input.

## Selanjutnya

- Selanjutnya: [Autentikasi Sederhana](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berusaha untuk akurasi, harap diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau salah tafsir yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->