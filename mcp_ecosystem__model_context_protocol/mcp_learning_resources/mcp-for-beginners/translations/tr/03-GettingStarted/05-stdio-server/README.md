# stdio Taşımacılığı ile MCP Sunucusu

> **⚠️ Önemli Güncelleme**: MCP Şartnamesi 2025-06-18 itibarıyla, bağımsız SSE (Sunucu Gönderimli Olaylar) taşımacılığı **kullanımdan kaldırılmış** ve yerine "Streamable HTTP" taşımacılığı getirilmiştir. Mevcut MCP şartnamesi iki ana taşımacılık mekanizmasını tanımlar:
> 1. **stdio** - Standart giriş/çıkış (yerel sunucular için önerilir)
> 2. **Streamable HTTP** - Dahili olarak SSE kullanılabilecek uzak sunucular için
>
> Bu ders, çoğu MCP sunucu uygulaması için önerilen yöntem olan **stdio taşımacılığı** üzerine güncellenmiştir.

stdio taşımacılığı, MCP sunucularının standart giriş ve çıkış akışları üzerinden istemcilerle iletişim kurmasını sağlar. Bu, mevcut MCP şartnamesinde en yaygın ve önerilen taşımacılık mekanizmasıdır ve çeşitli istemci uygulamalarıyla kolayca entegre edilebilen basit ve verimli MCP sunucuları oluşturmanın yolunu sunar.

## Genel Bakış

Bu ders, stdio taşımacılığı kullanarak MCP Sunucuları oluşturmayı ve tüketmeyi kapsar.

## Öğrenme Hedefleri

Bu dersin sonunda şunları yapabileceksiniz:

- stdio taşımacılığı kullanarak MCP Sunucusu oluşturmak.
- Inspector ile bir MCP Sunucusunu hata ayıklamak.
- Visual Studio Code kullanarak bir MCP Sunucusunu tüketmek.
- Mevcut MCP taşımacılık mekanizmalarını anlamak ve stdio’nun neden önerildiğini kavramak.

## stdio Taşımacılığı - Nasıl Çalışır

stdio taşımacılığı, mevcut MCP şartnamesindeki (2025-11-25) desteklenen iki taşımacılık türünden biridir. İşte nasıl çalıştığı:

- **Basit İletişim**: Sunucu JSON-RPC mesajlarını standart girişten (`stdin`) okur ve mesajları standart çıkışa (`stdout`) gönderir.
- **Süreç-tabanlı**: İstemci MCP sunucusunu bir alt süreç olarak başlatır.
- **Mesaj Formatı**: Mesajlar, yeni satırlarla ayrılmış bireysel JSON-RPC istekleri, bildirimleri veya yanıtlarıdır.
- **Kayıt Tutma**: Sunucu, kayıt amacıyla standart hata akışına (`stderr`) UTF-8 metinler yazabilir.

### Temel Gereksinimler:
- Mesajlar yeni satırlarla ayrılmalı ve gömülü yeni satırlar içermemelidir.
- Sunucu `stdout`’a geçerli olmayan MCP mesajı yazmamalıdır.
- İstemci, sunucunun `stdin`’ine geçerli olmayan MCP mesajı yazmamalıdır.

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

Yukarıdaki kodda:

- MCP SDK’dan `Server` sınıfı ve `StdioServerTransport` içe aktarılır.
- Temel yapılandırma ve yeteneklerle bir sunucu örneği oluşturulur.
- Bir `StdioServerTransport` örneği yaratılır ve sunucu buna bağlanarak stdin/stdout üzerinden iletişim sağlanır.

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Sunucu örneği oluştur
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

Yukarıdaki kodda:

- MCP SDK kullanılarak sunucu örneği oluşturulur.
- Dekoratörlerle araçlar tanımlanır.
- Taşımacılığı yönetmek için stdio_server bağlam yöneticisi kullanılır.

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

SSE’den farkı olan stdio sunucuları:

- Web sunucusu kurulumu veya HTTP uç noktaları gerektirmez.
- İstemci tarafından alt süreç olarak başlatılır.
- stdin/stdout akışları üzerinden iletişim kurar.
- Daha basit uygulanır ve hata ayıklaması kolaydır.

## Alıştırma: Bir stdio Sunucusu Oluşturma

Sunucumuzu oluştururken iki şeyi göz önünde bulundurmamız gerekir:

- Bağlantı ve mesajlar için uç noktaları açmak üzere bir web sunucusu kullanmalıyız.

## Lab: Basit Bir MCP stdio Sunucusu Oluşturma

Bu laboratuvarda, önerilen stdio taşımacılığını kullanarak basit bir MCP sunucusu oluşturacağız. Bu sunucu, istemcilerin standart Model Context Protocol kullanarak çağırabileceği araçları sunacaktır.

### Ön Koşullar

- Python 3.8 veya üzeri
- MCP Python SDK: `pip install mcp`
- Asenkron programlama hakkında temel bilgi

İlk MCP stdio sunucumuzu oluşturarak başlayalım:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Günlük kaydını yapılandır
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sunucuyu oluştur
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # stdio taşıma yöntemini kullan
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Kaldırılan SSE yaklaşımından temel farklar

**Stdio Taşımacılığı (Mevcut Standart):**
- Basit alt süreç modeli - istemci sunucuyu çocuk süreç olarak başlatır
- JSON-RPC mesajları ile stdin/stdout üzerinden iletişim
- HTTP sunucu kurulumu gerektirmez
- Daha iyi performans ve güvenlik
- Daha kolay hata ayıklama ve geliştirme

**SSE Taşımacılığı (MCP 2025-06-18 itibarıyla kullanımdan kaldırıldı):**
- SSE uç noktaları olan bir HTTP sunucusu gerektiriyordu
- Web sunucusu altyapısıyla daha karmaşık kurulum
- HTTP uç noktaları için ek güvenlik önlemleri
- Web tabanlı senaryolar için Streamable HTTP ile değiştirildi

### stdio taşımacılığı ile sunucu oluşturma

stdio sunucumuzu oluşturmak için:

1. **Gerekli kütüphaneleri içe aktarın** - MCP sunucu bileşenleri ve stdio taşımacılığı gereklidir
2. **Bir sunucu örneği oluşturun** - Sunucunun yeteneklerini tanımlayın
3. **Araçları tanımlayın** - Sunulacak işlevselliği ekleyin
4. **Taşımacılığı ayarlayın** - stdio iletişimini yapılandırın
5. **Sunucuyu çalıştırın** - Sunucuyu başlatın ve mesajları yönetin

Adım adım inşa edelim:

### Adım 1: Temel bir stdio sunucusu oluşturma

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Günlük kaydını yapılandır
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sunucuyu oluştur
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Adım 2: Daha fazla araç ekleyin

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Adım 3: Sunucuyu çalıştırma

Kodu `server.py` olarak kaydedin ve komut satırından çalıştırın:

```bash
python server.py
```

Sunucu başlayacak ve stdin’den giriş bekleyecektir. stdio taşımacılığı üzerinden JSON-RPC mesajları ile iletişim kurar.

### Adım 4: Inspector ile test etme

Sunucunuzu MCP Inspector kullanarak test edebilirsiniz:

1. Inspector’ı yükleyin: `npx @modelcontextprotocol/inspector`
2. Inspector’ı çalıştırın ve sunucunuza yönlendirin
3. Oluşturduğunuz araçları test edin

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## stdio sunucunuzu hata ayıklama

### MCP Inspector kullanımı

MCP Inspector, MCP sunucularınızı hata ayıklamak ve test etmek için kullanışlı bir araçtır. stdio sunucunuzla nasıl kullanılacağı:

1. **Inspector’ı yükleyin**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Inspector’ı çalıştırın**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Sunucunuzu test edin**: Inspector, şu özellikleri sağlar:
   - Sunucu yeteneklerini görüntüleyin
   - Farklı parametrelerle araçları test edin
   - JSON-RPC mesajlarını izleyin
   - Bağlantı sorunlarını debug edin

### VS Code Kullanımı

MCP sunucunuzu doğrudan VS Code’da da hata ayıklayabilirsiniz:

1. `.vscode/launch.json` içinde bir başlatma yapılandırması oluşturun:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Sunucu kodunuzda kesme noktaları ayarlayın
3. Hata ayıklayıcıyı çalıştırın ve Inspector ile test edin

### Yaygın hata ayıklama ipuçları

- Kaydınız için `stderr` kullanın - `stdout`a asla yazmayın, MCP mesajları için ayrılmıştır
- Tüm JSON-RPC mesajlarının yeni satırla ayrıldığından emin olun
- Öncelikle basit araçlarla test edin, sonra karmaşık işlevsellik ekleyin
- Mesaj formatlarını doğrulamak için Inspector’ı kullanın

## stdio sunucunuzu VS Code’da kullanmak

MCP stdio sunucunuzu oluşturduktan sonra, onu Claude veya diğer MCP uyumlu istemcilerle kullanmak için VS Code ile entegre edebilirsiniz.

### Yapılandırma

1. Windows için `%APPDATA%\Claude\claude_desktop_config.json` veya Mac için `~/Library/Application Support/Claude/claude_desktop_config.json` adresinde bir MCP yapılandırma dosyası oluşturun:

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Claude’u yeniden başlatın**: Yeni sunucu yapılandırmasını yüklemek için Claude’u kapatıp açın.

3. **Bağlantıyı test edin**: Claude ile bir konuşma başlatıp sunucunuzun araçlarını deneyin:
   - "Selamlama aracıyla bana selam verebilir misin?"
   - "15 ve 27 sayılarının toplamını hesapla"
   - "Sunucu bilgisi nedir?"

### TypeScript stdio sunucu örneği

Referans için tam bir TypeScript örneği:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Araçlar ekle
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### .NET stdio sunucu örneği

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Özet

Bu güncellenmiş derste, şunları öğrendiniz:

- Mevcut **stdio taşımacılığı** ile MCP sunucuları oluşturmayı (önerilen yöntem)
- SSE taşımacılığının neden stdio ve Streamable HTTP lehine kullanımdan kaldırıldığını anlamayı
- MCP istemcilerinin çağırabileceği araçlar geliştirmeyi
- MCP Inspector kullanarak sunucunuzu hata ayıklamayı
- stdio sunucunuzu VS Code ve Claude ile entegre etmeyi

stdio taşımacılığı, kullanımdan kaldırılan SSE yaklaşımına kıyasla MCP sunucuları oluşturmak için daha basit, daha güvenli ve performanslı bir yol sunar. Bu, 2025-06-18 şartnamesinden itibaren çoğu MCP sunucu uygulaması için önerilen taşımacılıktır.

### .NET

1. Öncelikle bazı araçlar oluşturalım, bunun için *Tools.cs* adlı bir dosya oluşturup aşağıdaki içeriği ekleyeceğiz:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Alıştırma: stdio sunucunuzu test etmek

stdio sunucunuzu oluşturduğunuza göre, doğru çalıştığından emin olmak için test edelim.

### Ön Koşullar

1. MCP Inspector’un yüklü olduğundan emin olun:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Sunucu kodunuz kaydedilmiş olmalı (örneğin `server.py` olarak)

### Inspector ile Test

1. **Sunucunuz ile Inspector’ı başlatın**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Web arayüzünü açın**: Inspector, tarayıcıda sunucunuzun yeteneklerini gösterir.

3. **Araçları test edin**:
   - `get_greeting` aracını farklı isimlerle deneyin
   - `calculate_sum` aracını çeşitli sayılarla test edin
   - `get_server_info` aracını sunucu meta verisi için çağırın

4. **İletişimi izleyin**: Inspector, istemci ile sunucu arasındaki JSON-RPC mesaj alışverişini gösterir.

### Görmeniz gerekenler

Sunucunuz doğru başladığında görecekleriniz:

- Inspector’da sunucu yetenekleri listesi
- Test edilebilir araçlar
- Başarılı JSON-RPC mesaj alışverişi
- Arayüzde araç yanıtları

### Yaygın sorunlar ve çözümleri

**Sunucu başlamıyor:**
- Tüm bağımlılıkların yüklü olduğunu kontrol edin: `pip install mcp`
- Python sözdizimi ve girintileme hatalarını kontrol edin
- Konsoldaki hata mesajlarını inceleyin

**Araçlar görünmüyor:**
- `@server.tool()` dekoratörlerinin varlığını kontrol edin
- Araç fonksiyonlarının `main()` öncesinde tanımlandığından emin olun
- Sunucunun doğru yapılandırıldığını doğrulayın

**Bağlantı sorunları:**
- Sunucunun stdio taşımacılığını doğru kullandığından emin olun
- Başka süreçlerin engellemediğini kontrol edin
- Inspector komut sözdizimini doğrulayın

## Ödev

Sunucunuzu daha fazla yetenekle geliştirmeyi deneyin. Örneğin, [bu sayfa](https://api.chucknorris.io/) üzerinden bir API çağrısı yapan bir araç ekleyebilirsiniz. Sunucunuzun nasıl görünmesi gerektiğine siz karar verin. İyi eğlenceler :)

## Çözüm

[Çözüm](./solution/README.md) İşleyen kodlu olası bir çözüm burada.

## Temel Noktalar

Bu bölümün temel noktaları şunlardır:

- stdio taşımacılığı yerel MCP sunucuları için önerilen mekanizmadır.
- stdio taşımacılığı, MCP sunucuları ile istemciler arasında standart giriş ve çıkış akışları kullanarak kesintisiz iletişim sağlar.
- Hem Inspector hem de Visual Studio Code, stdio sunucularını doğrudan tüketmek için kullanılabilir, bu da hata ayıklama ve entegrasyonu kolaylaştırır.

## Örnekler

- [Java Hesap Makinesi](../samples/java/calculator/README.md)
- [.Net Hesap Makinesi](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Hesap Makinesi](../samples/javascript/README.md)
- [TypeScript Hesap Makinesi](../samples/typescript/README.md)
- [Python Hesap Makinesi](../../../../03-GettingStarted/samples/python)

## Ek Kaynaklar

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Sonraki Konular

## Sonraki Adımlar

stdio taşımacılığı ile MCP sunucuları oluşturmayı öğrendiğinize göre, daha gelişmiş konuları keşfedebilirsiniz:

- **Sonraki**: [MCP ile HTTP Akışı (Streamable HTTP)](../06-http-streaming/README.md) - Uzak sunucular için desteklenen diğer taşımacılık mekanizmasını öğrenin
- **İleri Düzey**: [MCP Güvenlik En İyi Uygulamaları](../../02-Security/README.md) - MCP sunucularınızda güvenlik uygulayın
- **Üretim**: [Dağıtım Stratejileri](../09-deployment/README.md) - Sunucularınızı üretim ortamında dağıtın

## Ek Kaynaklar

- [MCP Şartnamesi 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Resmi şartname
- [MCP SDK Dokümantasyonu](https://github.com/modelcontextprotocol/sdk) - Tüm diller için SDK referansları
- [Topluluk Örnekleri](../../06-CommunityContributions/README.md) - Topluluktan daha fazla sunucu örneği

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->