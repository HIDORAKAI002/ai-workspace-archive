# Gelişmiş sunucu kullanımı

MCP SDK'da iki farklı sunucu türü vardır: normal sunucunuz ve düşük seviye sunucu. Normalde, ona özellik eklemek için düzenli sunucuyu kullanırsınız. Ancak bazı durumlarda, şu gibi durumlarda düşük seviye sunucuya güvenmek istersiniz:

- Daha iyi mimari. Hem düzenli sunucu hem de düşük seviyeli sunucu ile temiz bir mimari oluşturmak mümkündür ancak düşük seviyeli sunucuyla bunun biraz daha kolay olduğu iddia edilebilir.
- Özellik kullanılabilirliği. Bazı gelişmiş özellikler yalnızca düşük seviye sunucu ile kullanılabilir. Bunları örnekleme ve tetikleme eklediğimiz sonraki bölümlerde göreceksiniz.

## Düzenli sunucu vs düşük seviye sunucu

Bir MCP Sunucusu yaratmanın düzenli sunucu ile nasıl göründüğüne bakalım

**Python**

```python
mcp = FastMCP("Demo")

# Bir toplama aracı ekle
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

// Bir toplama aracı ekle
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

Önemli olan nokta, sunucunun sahip olmasını istediğiniz her araç, kaynak veya istemi açıkça eklemenizdir. Bununla ilgili bir sorun yoktur.  

### Düşük seviye sunucu yaklaşımı

Ancak, düşük seviye sunucu yaklaşımını kullanırken bunu farklı düşünmeniz gerekir. Her aracı kaydetmek yerine, her özellik türü için iki işleyici oluşturursunuz (araçlar, kaynaklar veya istemler). Örneğin araçlar için sadece iki fonksiyon olur şunlar gibi:

- Tüm araçları listelemek. Bir fonksiyon tüm araç listeleme denemelerinden sorumlu olur.
- Tüm araç çağrılarını işlemek. Burada da, araç çağrılarını ele alan tek bir fonksiyon vardır.

Potansiyel olarak daha az iş gibi görünüyor değil mi? Yani bir aracı kaydetmek yerine, sadece tüm araçları listelediğimde aracın listede olduğundan ve bir araç çağrısı geldiğinde çağrıldığından emin olmam gerekiyor. 

Koda şimdi nasıl göründüğüne bakalım:

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
  // Kayıtlı araçların listesini döndür
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

Burada artık özelliklerin listesini döndüren bir fonksiyonumuz var. Araçlar listesindeki her giriş şimdi `name`, `description` ve `inputSchema` gibi alanlara sahip, dönüş türüne uymak için. Bu, araçlarımızı ve özellik tanımlarımızı başka bir yere koymamıza olanak sağlıyor. Artık tüm araçlarımızı bir tools klasöründe oluşturabiliriz ve aynı şey tüm özellikleriniz için geçerli olur; böylece projeniz aniden şu şekilde düzenlenebilir:

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

Harika, mimarimiz oldukça temiz görünebilir.

Araç çağırmak ne durumda, aynı fikir mi, hangi araç olursa olsun bir arabirim, araç çağırmak için? Evet, tam olarak, işte bunun kodu:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools, anahtarları araç adları olan bir sözlüktür
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
    // TODO aracı çağır,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Yukarıdaki koddaki gibi, çağrılacak aracı ve hangi argümanlarla çağrılacağını ayrıştırmamız gerekiyor, ardından aracı çağırmaya devam etmeliyiz.

## Yaklaşımı doğrulama ile geliştirme

Şimdiye kadar, araçlar, kaynaklar ve istemler eklemek için yaptığınız tüm kayıtların bu iki işleyici ile nasıl değiştirilebileceğini gördünüz. Başka ne yapmamız gerekiyor? Araçların doğru argümanlarla çağrıldığından emin olmak için bir tür doğrulama eklemeliyiz. Her çalışma zamanı bunun için kendi çözümünü kullanır, örneğin Python Pydantic, TypeScript Zod kullanır. Fikir şudur:

- Bir özelliği (araç, kaynak veya istem) oluşturma mantığını kendi ayrılmış klasörüne taşımak.
- Örneğin bir aracı çağırmak isteyen gelen isteği doğrulamanın bir yolunu eklemek.

### Bir özellik oluştur

Bir özellik oluşturmak için, o özellik için bir dosya oluşturmamız ve o özellik için gerekli zorunlu alanlara sahip olduğundan emin olmamız gerekir. Hangi alanların araçlar, kaynaklar ve istemler arasında biraz farklılık gösterdiği.

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
        # Girdiyi Pydantic modeli kullanarak doğrula
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ekle, böylece bir AddInputModel oluşturabilir ve argümanları doğrulayabiliriz

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Burada şunları nasıl yaptığımızı görebilirsiniz:

- *schema.py* dosyasında Pydantic kullanarak `AddInputModel` şemasını, `a` ve `b` alanlarıyla oluşturuyoruz.
- Gelen isteği `AddInputModel` türüne ayrıştırmaya çalışıyoruz, parametrelerde tutarsızlık varsa burada hata alınır:

   ```python
   # add.py
    try:
        # Girişi Pydantic modeli kullanarak doğrula
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Bu ayrıştırma mantığını araç çağrısının kendisine veya işleyici fonksiyona koymayı seçebilirsiniz.

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

- Tüm araç çağrılarını ele alan işleyicide, gelen isteği aracın tanımlı şemasına ayrıştırmaya çalışıyoruz:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    Bu olursa gerçek aracı çağırmaya devam ediyoruz:

    ```typescript
    const result = await tool.callback(input);
    ```

Gördüğünüz gibi, bu yaklaşım harika bir mimari oluşturur çünkü her şey yerli yerindedir, *server.ts* sadece istek işleyicileri birbirine bağlayan çok küçük bir dosyadır ve her özellik ilgili klasöründedir yani tools/, resources/ veya /prompts.

Harika, şimdi bunu oluşturmaya çalışalım.

## Alıştırma: Düşük seviye sunucu oluşturma

Bu alıştırmada şunları yapacağız:

1. Araçların listelenmesini ve çağrılmasını yöneten düşük seviye bir sunucu oluşturun.
1. Üzerine inşa edebileceğiniz bir mimari uygulayın.
1. Araç çağrılarınızın doğru doğrulanmasını sağlamak için doğrulama ekleyin.

### -1- Bir mimari oluştur

İlk ele almamız gereken, daha fazla özellik ekledikçe ölçeklenebilen bir mimari, şöyle görünüyor:

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

Artık bir tools klasörüne kolayca yeni araçlar eklememizi sağlayan bir mimari kurduk. Kaynaklar ve istemler için alt dizinler eklemek isterseniz bunu takip edebilirsiniz.

### -2- Bir araç oluşturma

Bir aracın nasıl oluşturulduğunu görelim. Öncelikle, *tool* alt dizininde şöyle oluşturulmalıdır:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Girişi Pydantic modeli kullanarak doğrula
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ekle, böylece bir AddInputModel oluşturabilir ve argümanları doğrulayabiliriz

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Burada adını, açıklamasını ve giriş şemasını Pydantic kullanarak tanımladığımızı ve araç çağrıldığında tetiklenecek bir işleyici olduğunu görüyoruz. Son olarak, tüm bu özellikleri tutan bir sözlük olan `tool_add` 'i dışa açıyoruz.

Ayrıca aracımızın kullandığı giriş şemasını tanımlamak için kullanılan *schema.py* dosyası vardır:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Araçlar dizininin bir modül olarak tanınması için *__init__.py* dosyasını da doldurmamız gerekir. Ayrıca içindeki modülleri şu şekilde dışa açarız:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Daha fazla araç ekledikçe bu dosyaya eklemeye devam edebiliriz.

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

Burada aşağıdaki özelliklerden oluşan bir sözlük oluşturuyoruz:

- name, bu aracın adı.
- rawSchema, bu Zod şeması, bu araç çağrılarına gelen istekleri doğrulamak için kullanılır.
- inputSchema, bu şema işleyici tarafından kullanılır.
- callback, araç çağırmak için kullanılır.

Ayrıca bu sözlüğü mcp sunucu işleyicisinin kabul edebileceği bir tipe dönüştürmek için `Tool` vardır ve şöyle görünür:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Ve her aracın giriş şemasını depoladığımız *schema.ts* dosyası vardır, şimdilik sadece biri var ama araç ekledikçe daha fazla girdi ekleyebiliriz:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Harika, şimdi araçlarımızın listesini ele almaya geçelim.

### -3- Araç listesini işle

Araçlarımızı listelemek için bir istek işleyici ayarlamamız gerekir. Sunucu dosyamıza şunları eklemeliyiz:

**Python**

```python
# kısaltma için kod atlandı
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

Burada `@server.list_tools` dekoratörünü ekliyoruz ve uygulayan `handle_list_tools` fonksiyonunu oluşturuyoruz. Fonksiyonda, bir araç listesi üretmemiz gerekir. Her aracın bir adı, açıklaması ve inputSchema'sı olması gerektiğine dikkat edin.   

**TypeScript**

Araçları listelemek için istek işleyicisi ayarlamak adına, sunucuda yapmak istediğimize uygun bir şema ile `setRequestHandler` çağırmamız gerekiyor, burada `ListToolsRequestSchema`.

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
// kısaltma için kod atlandı
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Kayıtlı araçların listesini döndürür
  return {
    tools: tools
  };
});
```

Harika, şimdi araç listeleme kısmını hallettik, şimdi araçları nasıl çağırabileceğimize bakalım.

### -4- Bir araç çağrısını işle

Bir aracı çağırmak için, hangi özelliğin çağrılacağını ve argümanlarının ne olduğunu belirten isteği ele alacak başka bir istek işleyici kurmamız gerekiyor.

**Python**

`@server.call_tool` dekoratörünü kullanalım ve `handle_call_tool` gibi bir fonksiyonla uygulanalım. Bu fonksiyon içinde araç adını, argümanlarını ayrıştırmamız ve argümanların geçerli olduğundan emin olmamız gerekiyor. Argümanları burada doğrulayabiliriz ya da araçta sonraki aşamada doğrulama yapılabilir.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools, anahtarları araç isimleri olan bir sözlüktür
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # aracı çağır
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Şu şeyler oluyor:

- Araç adımız zaten `name` input parametresi olarak mevcut, `arguments` sözlüğünde argümanlarımız mevcut.

- Araç `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` ile çağrılır. Argümanların doğrulanması `handler` özelliğinde, bir fonksiyona işaret eder; başarısız olursa bir istisna fırlatır.

İşte böyle, düşük seviye sunucu kullanarak araç listeleme ve çağırmayı tamamen anladık.

[Tam örneği buradan inceleyin](./code/README.md)

## Ödev

Size verilen koda bir takım araçlar, kaynaklar ve istemler ekleyin ve sadece tools klasörüne dosya ekleyerek başka yerlere dosya eklemenize gerek kalmadığını nasıl fark ettiğinizi değerlendirin. 

*Çözüm verilmemiştir*

## Özet

Bu bölümde, düşük seviye sunucu yaklaşımının nasıl çalıştığını ve bunu kullanarak üzerinde inşa edebileceğimiz hoş bir mimari oluşturabileceğimizi gördük. Ayrıca doğrulamayı tartıştık ve doğrulama kitaplıkları ile girdi doğrulama şemaları oluşturmanın nasıl yapıldığını gösterdik.

## Sonraki Bölüm

- Sonraki: [Basit Kimlik Doğrulama](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çabalasak da, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, ana dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çeviri kullanımı sonucu ortaya çıkabilecek yanlış anlamalar veya yorum hatalarından sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->