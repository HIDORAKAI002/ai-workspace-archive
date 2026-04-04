# Popüler MCP Ana Bilgisayar İstemcilerinin Kurulumu

Bu rehber, popüler yapay zeka ana bilgisayar uygulamalarıyla MCP sunucularını nasıl yapılandıracağınızı ve kullanacağınızı kapsar. Her ana bilgisayarın kendi yapılandırma yaklaşımı vardır, ancak kurulduktan sonra hepsi MCP sunucularıyla standart bir protokol kullanarak iletişim kurar.

## MCP Ana Bilgisayarı Nedir?

**MCP Ana Bilgisayarı**, yeteneklerini genişletmek için MCP sunucularına bağlanabilen bir yapay zeka uygulamasıdır. Bunu, kullanıcıların etkileşimde bulunduğu "ön uç" olarak düşünün; MCP sunucuları ise "arka uç" araçları ve verileri sağlar.

```mermaid
flowchart LR
    User[👤 Kullanıcı] --> Host[🖥️ MCP Sunucusu]
    Host --> S1[MCP Sunucu A]
    Host --> S2[MCP Sunucu B]
    Host --> S3[MCP Sunucu C]
    
    subgraph "Popüler Sunucular"
        H1[Claude Masaüstü]
        H2[VS Code]
        H3[İmleç]
        H4[Cline]
        H5[Windsurf]
    end
```
## Ön Koşullar

- Bağlanılacak bir MCP sunucusu (bkz. [Modül 3.1 - İlk Sunucu](../01-first-server/README.md))
- Sisteminize yüklü ana bilgisayar uygulaması
- JSON yapılandırma dosyalarına temel aşinalık

---

## 1. Claude Desktop

**Claude Desktop**, Anthropic'in MCP'yi yerel olarak destekleyen resmi masaüstü uygulamasıdır.

### Kurulum

1. Claude Desktop'u [claude.ai/download](https://claude.ai/download) adresinden indirin
2. Yükleyin ve Anthropic hesabınızla giriş yapın

### Yapılandırma

Claude Desktop, MCP sunucularını tanımlamak için bir JSON yapılandırma dosyası kullanır.

**Yapılandırma dosyası konumu:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Örnek yapılandırma:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Yapılandırma Seçenekleri

| Alan | Açıklama | Örnek |
|-------|-------------|---------|
| `command` | Çalıştırılacak yürütülebilir dosya | `"python"`, `"node"`, `"npx"` |
| `args` | Komut satırı argümanları | `["-m", "my_server"]` |
| `env` | Ortam değişkenleri | `{"API_KEY": "xxx"}` |
| `cwd` | Çalışma dizini | `"/path/to/server"` |

### Kurulumunuzu Test Etme

1. Yapılandırma dosyasını kaydedin
2. Claude Desktop'u tamamen yeniden başlatın (kapatıp tekrar açın)
3. Yeni bir sohbet başlatın
4. Bağlı sunucuları gösteren 🔌 simgesini arayın
5. Claude'dan araçlarınızı kullanmasını isteyin

### Claude Desktop Sorun Giderme

**Sunucu görünmüyor:**
- Yapılandırma dosyası sözdizimini bir JSON doğrulayıcı ile kontrol edin
- Komut yolunun doğru olduğundan emin olun
- Claude Desktop günlüklerini kontrol edin: Yardım → Günlükleri Göster

**Sunucu başlatılırken çöküyor:**
- Önce terminalde sunucunuzu manuel olarak test edin
- Ortam değişkenlerinin doğru ayarlandığını kontrol edin
- Tüm bağımlılıkların kurulu olduğundan emin olun

---

## 2. GitHub Copilot ile VS Code

VS Code, GitHub Copilot Chat uzantıları aracılığıyla MCP'yi destekler.

### Ön Koşullar

1. VS Code 1.99+ yüklü olmalı
2. GitHub Copilot uzantısı yüklü olmalı
3. GitHub Copilot Chat uzantısı yüklü olmalı

### Yapılandırma

VS Code, çalışma alanınızda veya kullanıcı ayarlarında `.vscode/mcp.json` dosyasını kullanır.

**Çalışma alanı yapılandırması** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**Kullanıcı ayarları** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### VS Code'da MCP Kullanımı

1. Copilot Chat panelini açın (Ctrl+Shift+I / Cmd+Shift+I)
2. Kullanılabilir MCP araçlarını görmek için `@` yazın
3. Araçları doğal dil ile çağırın: "Hesap makinesi ile 25 * 48 hesapla"

### VS Code Sorun Giderme

**MCP sunucuları yüklenmiyor:**
- Çıkış panelinde → "MCP" hata günlüklerini kontrol edin
- Pencereyi yenileyin: Ctrl+Shift+P → "Geliştirici: Pencereyi Yenile"
- Önce sunucunun bağımsız olarak çalıştığını doğrulayın

---

## 3. Cursor

**Cursor**, yerleşik MCP desteğine sahip yapay zekâ öncelikli bir kod editörüdür.

### Kurulum

1. Cursor'u [cursor.sh](https://cursor.sh) adresinden indirin
2. Yükleyin ve giriş yapın

### Yapılandırma

Cursor, Claude Desktop'a benzer bir yapılandırma formatı kullanır.

**Yapılandırma dosyası konumu:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Örnek yapılandırma:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Cursor'da MCP Kullanımı

1. Cursor'un yapay zeka sohbetini açın (Ctrl+L / Cmd+L)
2. MCP araçları otomatik olarak önerilerde görünür
3. Bağlı sunucuları kullanarak yapay zekadan görev yapmasını isteyin

---

## 4. Cline (Terminal Tabanlı)

**Cline**, komut satırı iş akışları için ideal olan terminal tabanlı bir MCP istemcisidir.

### Kurulum

```bash
npm install -g @anthropic/cline
```

### Yapılandırma

Cline, ortam değişkenleri ve komut satırı argümanları kullanır.

**Ortam değişkenleri kullanımı:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Komut satırı argümanları kullanımı:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Yapılandırma dosyası** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Cline Kullanımı

```bash
# Etkileşimli bir oturum başlat
cline

# MCP ile tek sorgu
cline "Calculate the square root of 144 using the calculator"

# Kullanılabilir araçları listele
cline --list-tools
```

---

## 5. Windsurf

**Windsurf**, MCP desteğine sahip bir diğer yapay zekâ destekli kod editörüdür.

### Kurulum

1. Windsurf'u [codeium.com/windsurf](https://codeium.com/windsurf) adresinden indirin
2. Yükleyin ve hesap oluşturun

### Yapılandırma

Windsurf yapılandırması ayarlar arayüzü üzerinden yönetilir:

1. Ayarları açın (Ctrl+, / Cmd+,)
2. "MCP" araması yapın
3. "settings.json içinde Düzenle"ye tıklayın

**Örnek yapılandırma:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## Taşıma Türleri Karşılaştırması

Farklı ana bilgisayarlar farklı taşıma mekanizmalarını destekler:

| Ana Bilgisayar | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standart giriş/çıkış): Ana bilgisayar tarafından başlatılan yerel sunucular için en iyisi  
**SSE/HTTP**: Uzaktaki sunucular veya birden fazla istemci arasında paylaşılan sunucular için en iyisi

---

## Yaygın Sorun Giderme

### Sunucu başlamıyor

1. **Önce sunucuyu manuel test edin:**
   ```bash
   # Python için
   python -m your_server_module
   
   # Node.js için
   node /path/to/server/index.js
   ```

2. **Komut yolunu kontrol edin:**
   - Mümkünse mutlak yollar kullanın
   - Yürütülebilir dosyanın PATH'te olduğundan emin olun

3. **Bağımlılıkları kontrol edin:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Sunucu bağlanıyor ama araçlar çalışmıyor

1. **Sunucu günlüklerini kontrol edin** - Çoğu ana bilgisayarda günlük tutma seçenekleri vardır  
2. **Araç kaydını doğrulayın** - MCP Inspector kullanarak test edin  
3. **İzinleri kontrol edin** - Bazı araçlar dosya/ağ erişimi gerektirir  

### Ortam değişkenleri geçmiyor

- Bazı ana bilgisayarlar ortam değişkenlerini temizler  
- `env` yapılandırma alanını açıkça kullanın  
- Yapılandırma dosyalarında hassas verilerden kaçının (gizli yönetimi kullanın)  

---

## Güvenlik En İyi Uygulamaları

1. API anahtarlarını yapılandırma dosyalarına asla eklemeyin  
2. Hassas veriler için ortam değişkenlerini kullanın  
3. Sunucu izinlerini yalnızca gerekli olanlarla sınırlandırın  
4. Sisteminize erişim vermeden önce sunucu kodunu inceleyin  
5. Dosya sistemi ve ağ erişimi için izin listeleri kullanın  

---

## Sonraki Adımlar

- [3.13 - MCP Inspector ile Hata Ayıklama](../13-mcp-inspector/README.md)  
- [3.1 - İlk MCP Sunucunuzu Oluşturun](../01-first-server/README.md)  
- [Modül 5 - İleri Konular](../../05-AdvancedTopics/README.md)  

---

## Ek Kaynaklar

- [Claude Desktop MCP Belgeleri](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [VS Code MCP Uzantısı](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [MCP Spesifikasyonu - Taşıma Yöntemleri](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [Resmi MCP Sunucuları Kaydı](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanılması sonucu oluşabilecek yanlış anlamalar veya yanlış yorumlamalardan dolayı sorumluluk kabul edilmemektedir.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->