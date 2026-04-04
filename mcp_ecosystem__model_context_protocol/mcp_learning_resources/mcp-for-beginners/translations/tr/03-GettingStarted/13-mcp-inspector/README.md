# MCP Inspector ile Hata Ayıklama

**MCP Inspector**, tam bir yapay zeka ana bilgisayar uygulamasına ihtiyaç duymadan MCP sunucularınızı etkileşimli olarak test etmenizi ve sorun gidermenizi sağlayan temel bir hata ayıklama aracıdır. "MCP için Postman" gibi düşünebilirsiniz - istek göndermek, yanıtları görüntülemek ve sunucunuzun nasıl davrandığını anlamak için görsel bir arayüz sağlar.

## Neden MCP Inspector Kullanmalısınız?

MCP sunucuları oluştururken genellikle şu zorluklarla karşılaşırsınız:

- **"Sunucum çalışıyor mu?"** - Inspector bağlantı durumunu gösterir
- **"Araçlarım doğru kayıtlı mı?"** - Inspector tüm mevcut araçları listeler
- **"Yanıt formatı nedir?"** - Inspector tam JSON yanıtlarını gösterir
- **"Bu araç neden çalışmıyor?"** - Inspector ayrıntılı hata mesajları gösterir

## Ön Gereksinimler

- Node.js 18+ yüklü
- npm (Node.js ile birlikte gelir)
- Test etmek için bir MCP sunucusu (bkz. [Modül 3.1 - İlk Sunucu](../01-first-server/README.md))

## Kurulum

### Seçenek 1: npx ile Çalıştırma (Hızlı Test için Önerilir)

```bash
npx @modelcontextprotocol/inspector
```

### Seçenek 2: Global Olarak Kurulum

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Seçenek 3: Projenize Ekleyin

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

`package.json` dosyasına ekleyin:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Sunucunuza Bağlanma

### stdio Sunucuları (Yerel İşlem)

Standart girdi/çıktı üzerinden iletişim kuran sunucular için:

```bash
# Python sunucusu
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js sunucusu
npx @modelcontextprotocol/inspector node ./build/index.js

# Ortam değişkenleri ile
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP Sunucuları (Ağ)

HTTP hizmeti olarak çalışan sunucular için:

1. Önce sunucunuzu başlatın:
   ```bash
   python server.py  # Sunucu http://localhost:8080 üzerinde çalışıyor
   ```

2. Inspector'u başlatın ve bağlanın:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspector Arayüzü Genel Bakış

Inspector açıldığında, bir web arayüzü görürsünüz (genellikle `http://localhost:5173` adresinde):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Araçları Test Etme

### Mevcut Araçları Listeleme

1. **Araçlar** sekmesine tıklayın
2. Inspector otomatik olarak `tools/list` çağrısı yapar
3. Tüm kayıtlı araçları şunlarla birlikte görürsünüz:
   - Araç adı
   - Açıklama
   - Girdi şeması (parametreler)

### Bir Aracı Çağırma

1. Listeden bir araç seçin
2. Formda gerekli parametreleri doldurun
3. **Araç Çalıştır** düğmesine tıklayın
4. Yanıt sonuç panelinde görüntülenir

**Örnek: Bir hesap makinesi aracını test etme**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### Araç Hatalarını Hata Ayıklama

Bir araç başarısız olduğunda, Inspector şunları gösterir:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Yaygın hata kodları:
| Kod | Anlamı |
|------|---------|
| -32700 | Ayrıştırma hatası (geçersiz JSON) |
| -32600 | Geçersiz istek |
| -32601 | Metot bulunamadı |
| -32602 | Geçersiz parametreler |
| -32603 | Dahili hata |

---

## Kaynakları Test Etme

### Kaynakları Listeleme

1. **Kaynaklar** sekmesine tıklayın
2. Inspector `resources/list` çağrısı yapar
3. Şunları görürsünüz:
   - Kaynak URI'ları
   - İsimler ve açıklamalar
   - MIME türleri

### Bir Kaynağı Okuma

1. Bir kaynak seçin
2. **Kaynağı Oku** düğmesine tıklayın
3. Dönen içeriği görüntüleyin

**Örnek çıktı:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## Mesajların Test Edilmesi

### Promptları Listeleme

1. **Promptlar** sekmesine tıklayın
2. Inspector `prompts/list` çağrısı yapar
3. Mevcut prompt şablonlarını görüntüleyin

### Bir Prompt Alma

1. Bir prompt seçin
2. Gerekli argümanları doldurun
3. **Prompt Al** düğmesine tıklayın
4. Oluşturulan prompt mesajlarını görün

---

## Mesaj Günlüğü Analizi

Mesaj günlüğü tüm MCP protokol mesajlarını gösterir:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Nelere Dikkat Etmeli

- **İstek / Yanıt çiftleri**: Her `→` için eşleşen bir `←` olmalı
- **Hata mesajları**: Yanıtlarda `"error"` arayın
- **Zamanlama**: Büyük boşluklar performans sorunlarını gösterebilir
- **Protokol sürümü**: Sunucu ve istemcinin sürümde anlaşması gerekir

---

## VS Code Entegrasyonu

Inspector'u doğrudan VS Code'dan çalıştırabilirsiniz:

### launch.json Kullanımı

`.vscode/launch.json` dosyasına ekleyin:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### Tasks Kullanımı

`.vscode/tasks.json` dosyasına ekleyin:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## Yaygın Hata Ayıklama Senaryoları

### Senaryo 1: Sunucu Bağlanmıyor

**Belirtiler:** Inspector "Disconnected" gösteriyor veya "Connecting..." kısmında takılıyor

**Kontrol Listesi:**
1. ✅ Sunucu komutu doğru mu?
2. ✅ Tüm bağımlılıklar yüklü mü?
3. ✅ Sunucu yolu mutlak mı yoksa mevcut dizine göre mi?
4. ✅ Gerekli ortam değişkenleri ayarlandı mı?

**Hata ayıklama adımları:**
```bash
# Önce testi sunucusunu manuel olarak yapın
python -c "import your_server_module; print('OK')"

# İçe aktarma hatalarını kontrol edin
python -m your_server_module 2>&1 | head -20

# MCP SDK'nın kurulu olduğunu doğrulayın
pip show mcp
```

### Senaryo 2: Araçlar Görünmüyor

**Belirtiler:** Araçlar sekmesinde liste boş

**Olası nedenler:**
1. Sunucu başlatılırken araçlar kayıt edilmedi
2. Sunucu başlatıldıktan sonra çöktü
3. `tools/list` işleyicisi boş dizi döndürüyor

**Hata ayıklama adımları:**
1. Mesaj günlüğünde `tools/list` yanıtını kontrol edin
2. Araç kayıt kodunuza logging ekleyin
3. `@mcp.tool()` dekoratörlerinin varlığını doğrulayın (Python)

### Senaryo 3: Araç Hata Döndürüyor

**Belirtiler:** Araç çağrısı hata yanıtı alıyor

**Hata ayıklama yaklaşımı:**
1. Hata mesajını dikkatle okuyun
2. Parametre türlerinin şemayla uyumlu olduğundan emin olun
3. Ayrıntılı hata mesajları için try/catch ekleyin
4. Sunucu günlüklerinde yığın izlerini kontrol edin

**Geliştirilmiş hata yönetimi örneği:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Araç mantığı burada
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Senaryo 4: Kaynak İçeriği Boş

**Belirtiler:** Kaynak döndürüyor ama içerik boş veya null

**Kontrol Listesi:**
1. ✅ Dosya yolu veya URI doğru mu?
2. ✅ Sunucunun kaynağı okuma izni var mı?
3. ✅ Kaynak içeriği doğru şekilde dönüyor mu?

---

## Gelişmiş Inspector Özellikleri

### Özel Başlıklar (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Ayrıntılı Günlükleme

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Oturum Kaydı

Inspector mesaj günlüklerini daha sonra analiz için dışa aktarabilir:
1. Mesaj panelinde **Günlüğü Dışa Aktar**'a tıklayın
2. JSON dosyasını kaydedin
3. Sorun gidermek için ekip üyeleriyle paylaşın

---

## En İyi Uygulamalar

1. **Erken ve sık test edin** - Sadece sorun çıktığında değil, geliştirme sırasında Inspector'u kullanın
2. **Basitten başlayın** - Karmaşık araç çağrılarından önce temel bağlantıyı test edin
3. **Şemayı kontrol edin** - Birçok hata parametre türü uyumsuzluğundan kaynaklanır
4. **Hata mesajlarını okuyun** - MCP hataları genellikle açıklayıcıdır
5. **Inspector'u açık tutun** - Geliştirirken sorunları yakalamaya yardımcı olur

---

## Sonraki Adım

Modül 3: Başlarken bölümü tamamladınız! Öğrenmeye devam edin:

- [Modül 4: Pratik Uygulama](../../04-PracticalImplementation/README.md)

---

## Ek Kaynaklar

- [MCP Inspector GitHub Deposu](https://github.com/modelcontextprotocol/inspector)
- [MCP Spesifikasyonu - Protokol Mesajları](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Spesifikasyonu](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragat**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstermemize rağmen, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayın. Orijinal belge, kendi dilinde yetkili kaynak olarak değerlendirilmelidir. Önemli bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu oluşabilecek yanlış anlamalar veya yanlış yorumlardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->