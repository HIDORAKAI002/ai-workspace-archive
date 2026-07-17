# Gelişmiş sunucu kullanımı

MCP SDK'da iki farklı sunucu türü vardır: normal sunucunuz ve düşük seviyeli sunucu. Normalde, özellik eklemek için normal sunucuyu kullanırsınız. Ancak bazı durumlarda, şu gibi nedenlerle düşük seviyeli sunucuya güvenmek istersiniz:

- Daha iyi mimari. Hem normal sunucu hem de düşük seviyeli sunucu ile temiz bir mimari oluşturmak mümkündür ancak düşük seviyeli sunucu ile biraz daha kolay olduğu iddia edilebilir.
- Özellik kullanılabilirliği. Bazı gelişmiş özellikler yalnızca düşük seviyeli sunucuyla kullanılabilir. Örneğin örnekleme eklerken ( `2026-07-28` sürüm adayında kullanımdan kaldırılmıştır) ve çıkarım yaparken bunu göreceksiniz.

## Normal sunucu vs düşük seviyeli sunucu

MCP Sunucusu oluşturmanın normal sunucu ile nasıl göründüğüne bakalım

**Python**

```python
mcp = FastMCP("Demo")

# Bir toplama aracı ekleyin
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

Önemli olan, sunucunun sahip olmasını istediğiniz her araç, kaynak veya istemi açıkça eklemenizdir. Bu konuda yanlış bir şey yok.

### Düşük seviyeli sunucu yaklaşımı

Ancak düşük seviyeli sunucu yaklaşımını kullandığınızda farklı düşünmeniz gerekir. Her aracı kaydetmek yerine, özellik türü başına (araçlar, kaynaklar veya istemler) iki işleyici oluşturursunuz. Örneğin araçlar için sadece şu iki fonksiyon vardır:

- Tüm araçları listeleme. Bir fonksiyon tüm araç listeleme girişimlerinden sorumludur.
- Tüm araç çağrılarını yönetme. Burada da bir fonksiyon tekil olarak bir araca çağrı yapma işlemini yönetir.

Bu, potansiyel olarak daha az iş gibi görünüyor değil mi? Yani bir aracı kaydetmek yerine, sadece tüm araçları listelerken aracın listede olmasını ve araca çağrı yapılacak isteğin geldiğinde çağrılmasını sağlamam gerekiyor.

Şimdi koda nasıl göründüğüne bakalım:

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
  // Kayıtlı araçların listesini döndürür
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

Burada, bir özellik listesi döndüren bir fonksiyonumuz var. Araç listesindeki her giriş artık `name`, `description` ve `inputSchema` gibi alanlara sahip, bu dönüş tipiyle uyumluluk sağlar. Bu sayede araçlarımızı ve özellik tanımlarımızı başka yerde tutabiliriz. Artık tüm araçlarımızı bir tools klasöründe, tüm özelliklerinizi de ayrı klasörlerde tutabiliriz ve projeniz aniden şöyle organize olabilir:

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

Bu harika, mimarimiz oldukça temiz görünebilir.

Araçları çağırmaya gelince, aynı fikir mi? Yani herhangi bir araca çağrı için tek bir işleyici mi? Evet tam olarak, işte bunun kodu:

**Python**

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

Yukarıdaki koda baktığınızda, hangi aracın çağrılacağını ve hangi argümanlarla çağrılacağını ayrıştırmamız gerektiğini ve ardından aracı çağırmamız gerektiğini görebilirsiniz.

## Yaklaşımı doğrulama ile geliştirmek

Şimdiye kadar, araçlar, kaynaklar ve istemleri eklemeye yönelik tüm kayıtlarınızın her özellik türü başına iki işleyiciyle nasıl değiştirilebileceğini gördünüz. Başka ne yapmamız gerekiyor? Araçların doğru argümanlarla çağrıldığından emin olmak için bir tür doğrulama eklemeliyiz. Her çalışma zamanı bunun için kendi çözümünü kullanır; örneğin Python Pydantic, TypeScript ise Zod kullanır. Amaç şu:

- Bir özelliği (araç, kaynak veya istem) oluşturma mantığını ilgili klasöre taşımak.
- Örneğin bir aracı çağırmak isteyen gelen isteği doğrulamak için bir yöntem eklemek.

### Bir özellik oluşturmak

Bir özellik oluşturmak için ilgili özellik adına bir dosya oluşturmanız ve bu özelliğin ihtiyaç duyduğu zorunlu alanların olduğundan emin olmanız gerekir. Hangi alanların olduğu araçlar, kaynaklar ve istemler arasında biraz farklıdır.

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
        # Girişi Pydantic modeli kullanarak doğrula
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # YAPILACAK: Pydantic ekle, böylece bir AddInputModel oluşturabilir ve argümanları doğrulayabiliriz

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Burada şunları yapıyoruz:

- *schema.py* dosyasında `a` ve `b` alanlarıyla Pydantic kullanarak `AddInputModel` şeması oluşturuyoruz.
- Gelen isteği `AddInputModel` tipi olarak ayrıştırmaya çalışıyoruz, parametre uyumsuzsa bu hata verecektir:

   ```python
   # add.py
    try:
        # Pydantic modeli kullanarak girişi doğrula
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Bu ayrıştırma mantığını doğrudan araç çağrısının içinde veya işleyici fonksiyonunda yapabilirsiniz.

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

- Tüm araç çağrılarıyla ilgilenen işleyicide, gelen isteği aracın tanımlı şemasına ayrıştırmaya çalışıyoruz:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    Eğer bu başarılı olursa gerçek aracı çağırıyoruz:

    ```typescript
    const result = await tool.callback(input);
    ```

Bu yaklaşımın harika bir mimari oluşturduğunu görebilirsiniz: *server.ts* sadece istek işleyicileri birbirine bağlayan çok küçük bir dosya ve her özellik kendi klasöründe yani tools/, resources/ veya /prompts dizinlerinde.

Güzel, şimdi bunu yapmaya çalışalım.

## Egzersiz: Düşük seviyeli bir sunucu oluşturma

Bu egzersizde şunları yapacağız:

1. Araçları listeleme ve çağırma işlemlerini yöneten düşük seviyeli bir sunucu oluşturun.
1. Üzerine inşa edebileceğiniz bir mimari uygulayın.
1. Araç çağrılarınızın doğru şekilde doğrulandığından emin olmak için doğrulama ekleyin.

### -1- Bir mimari oluşturmak

İlk ele almamız gereken şey, daha fazla özellik ekledikçe ölçeklemeye yardımcı olacak bir mimari, şöyle görünür:

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

Şimdi, araçları tools klasöründe kolayca ekleyebileceğimiz bir mimari kurduk. İsterseniz resources ve prompts için de alt dizinler ekleyebilirsiniz.

### -2- Bir araç oluşturmak

Bir aracın nasıl oluşturulduğuna bakalım. Öncelikle, bunu *tool* alt dizininde oluşturmanız gerekir, şöyle:

**Python**

```python
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

Burada ad, açıklama ve Pydantic kullanılarak input şeması tanımlanır ve araç çağrıldığı zaman tetiklenecek işleyici bulunur. Son olarak, tüm bu özellikleri tutan bir sözlük olan `tool_add` dışa aktarılır.

Ayrıca aracımızın kullandığı input şemasını tanımlamak için kullanılan *schema.py* dosyası vardır:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Araçlar dizininin bir modül olarak görülmesini sağlamak için *__init__.py* dosyasını da doldurmamız gerekiyor. Ayrıca içindeki modülleri şöyle dışa açık hale getiriyoruz:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Daha fazla araç ekledikçe bu dosyayı genişletebiliriz.

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

Burada araç sözlüğünü aşağıdaki özelliklerle oluşturuyoruz:

- name, bu aracın adıdır.
- rawSchema, Zod şemasıdır, bu araç çağrılarının doğrulanması için kullanılır.
- inputSchema, işleyici tarafından kullanılan şemadır.
- callback, aracı çağırmak için kullanılır.

Ayrıca bu sözlüğü mcp sunucu işleyicisinin kabul edebileceği tipe dönüştürmek için `Tool` tanımı vardır, şöyle görünür:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Ayrıca, her araç için input şemalarını sakladığımız *schema.ts* dosyası vardır, şimdilik sadece bir şema var ama araç ekledikçe buraya yeni girdiler ekleyebiliriz:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Harika, şimdi araçlarımızın listesini ele almaya geçelim.

### -3- Araç listesini işlemek

Sonra, araçlarımızı listelemek için bir istek işleyici kurmamız gerekiyor. Sunucu dosyamıza eklememiz gerekenler şöyle:

**Python**

```python
# kod kısaltma için çıkarıldı
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

Burada `@server.list_tools` dekoratörü ve uygulayan `handle_list_tools` fonksiyonunu ekliyoruz. Bu fonksiyon, araç listesi üretmelidir. Her araç için bir isim, açıklama ve inputSchema alanlarının olması gerektiğine dikkat edin.

**TypeScript**

Araç listelemesi için istek işleyicisini ayarlamak için sunucuya `setRequestHandler` çağrısı yapmamız gerekiyor, burada amaçladığımız şemaya uygun olarak `ListToolsRequestSchema` kullanıyoruz.

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
// Sadelik için kod atlandı
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Kayıtlı araçların listesini döndür
  return {
    tools: tools
  };
});
```

Harika, şimdi araç listeleme bölümünü çözdük, şimdi araçların nasıl çağrılabileceğine bakalım.

### -4- Bir aracı çağırmayı işleme

Bir aracı çağırmak için başka bir istek işleyici ayarlamamız gerekiyor, bu sefer hangi özelliğin çağrılacağını ve hangi argümanlarla çağrılacağını belirten isteği ele alan.

**Python**

`@server.call_tool` dekoratörünü kullanalım ve `handle_call_tool` adlı fonksiyonla uygulayalım. Bu fonksiyon içinde, araç adını ve argümanlarını ayrıştırmamız, ayrıca argümanların geçerli olup olmadığını sağlamamız gerekiyor. Doğrulamayı bu fonksiyonda veya gerçek araçta daha sonra yapabiliriz.

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
        # aracı çağırın
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Burada olanlar:

- Araç adımız halihazırda girdi parametresi `name` olarak mevcut, argümanlarımız ise `arguments` sözlüğü şeklindedir.

- Araç `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` ile çağrılır. Argümanların doğrulanması `handler` özelliğinde yani fonksiyonda yapılır, başarısız olursa istisna fırlatılır.

Artık düşük seviyeli bir sunucu kullanarak araçları listelemek ve çağırmak konusunu tam olarak anladık.

Tüm örneğe şu adresten bakabilirsiniz: [full example](./code/README.md)

## Ödev

Size verilen kodu birkaç araç, kaynak ve istem ekleyerek genişletin ve sadece tools dizinine dosya eklemeniz gerektiğini nasıl fark ettiğinizi değerlendirin.

*Çözüm verilmemiştir*

## Özet

Bu bölümde düşük seviyeli sunucu yaklaşımının nasıl çalıştığını ve bunun üzerine inşa edilebilecek güzel bir mimari oluşturmayı gördük. Ayrıca doğrulamadan bahsettik ve giriş doğrulaması için şemalar oluşturmak üzere doğrulama kütüphaneleriyle nasıl çalışılacağını gösterdik.

## Sonraki Bölüm

- Sonraki: [Basit Kimlik Doğrulama](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->