# 🔧 Modül 3: Microsoft Foundry Toolkit ile Gelişmiş MCP Geliştirme

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Öğrenme Hedefleri

Bu laboratuvarın sonunda şunları yapabileceksiniz:

- ✅ Microsoft Foundry Toolkit kullanarak özel MCP sunucuları oluşturmak
- ✅ En son MCP Python SDK'sını (v1.9.3) yapılandırmak ve kullanmak
- ✅ Hata ayıklama için MCP Inspector'ı kurmak ve kullanmak
- ✅ MCP sunucularını hem Agent Builder hem de Inspector ortamlarında hata ayıklamak
- ✅ Gelişmiş MCP sunucu geliştirme iş akışlarını anlamak

## 📋 Ön Koşullar

- Laboratuvar 2'nin (MCP Temelleri) tamamlanması
- Microsoft Foundry Toolkit uzantısının yüklü olduğu VS Code
- Python 3.10+ ortamı
- Inspector kurulumu için Node.js ve npm

## 🏗️ İnşa Edeceğiniz Şey

Bu laboratuvarda, şu özellikleri gösteren bir **Hava Durumu MCP Sunucusu** oluşturacaksınız:
- Özel MCP sunucu implementasyonu
- Microsoft Foundry Toolkit Agent Builder ile entegrasyon
- Profesyonel hata ayıklama iş akışları
- Modern MCP SDK kullanım desenleri

---

## 🔧 Temel Bileşenler Genel Bakış

### 🐍 MCP Python SDK
Model Context Protocol Python SDK, özel MCP sunucuları geliştirmek için temel sağlar. Gelişmiş hata ayıklama yeteneklerine sahip 1.9.3 sürümünü kullanacaksınız.

### 🔍 MCP Inspector
Şunları sağlayan güçlü bir hata ayıklama aracı:
- Gerçek zamanlı sunucu izleme
- Araç çalıştırma görselleştirmesi
- Ağ istek/yanıt incelemesi
- Etkileşimli test ortamı

---

## 📖 Adım Adım Uygulama

### 1. Adım: Agent Builder'da WeatherAgent Oluşturun

1. **VS Code'da Microsoft Foundry Toolkit uzantısı aracılığıyla Agent Builder'ı başlatın**
2. **Aşağıdaki yapılandırmayla yeni bir ajan oluşturun:**
   - Ajan Adı: `WeatherAgent`

![Agent Creation](../../../../translated_images/tr/Agent.c9c33f6a412b4cde.webp)

### 2. Adım: MCP Sunucu Projesini Başlatın

1. **Agent Builder'da Tools → Add Tool menüsüne gidin**
2. **Mevcut seçeneklerden "MCP Server"ı seçin**
3. **"Create A new MCP Server" seçeneğini seçin**
4. **`python-weather` şablonunu seçin**
5. **Sunucunuzu adlandırın:** `weather_mcp`

![Python Template Selection](../../../../translated_images/tr/Pythontemplate.9d0a2913c6491500.webp)

### 3. Adım: Projeyi Açın ve İnceleyin

1. **Oluşturulan projeyi VS Code'da açın**
2. **Proje yapısını inceleyin:**
   ```
   weather_mcp/
   ├── src/
   │   ├── __init__.py
   │   └── server.py
   ├── inspector/
   │   ├── package.json
   │   └── package-lock.json
   ├── .vscode/
   │   ├── launch.json
   │   └── tasks.json
   ├── pyproject.toml
   └── README.md
   ```

### 4. Adım: En Son MCP SDK'ya Yükseltme

> **🔍 Neden Yükseltmeliyiz?** Gelişmiş özellikler ve daha iyi hata ayıklama için en son MCP SDK (v1.9.3) ve Inspector servisini (0.14.0) kullanmak istiyoruz.

#### 4a. Python Bağımlılıklarını Güncelleyin

**`pyproject.toml` dosyasını düzenleyin:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) dosyasını güncelleyin


#### 4b. Inspector Yapılandırmasını Güncelleyin

**`inspector/package.json` dosyasını düzenleyin:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) dosyasını güncelleyin

#### 4c. Inspector Bağımlılıklarını Güncelleyin

**`inspector/package-lock.json` dosyasını düzenleyin:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) dosyasını güncelleyin

> **📝 Not:** Bu dosya kapsamlı bağımlılık tanımları içerir. Aşağıda temel yapı gösterilmiştir - tam içerik, doğru bağımlılık çözümlemesini sağlar.


> **⚡ Tam Paket Kilidi:** Tam package-lock.json dosyası yaklaşık 3000 satır bağımlılık tanımı içerir. Yukarıda temel yapı gösterilmiştir - tam bağımlılık çözümlemesi için verilen dosyayı kullanın.

### 5. Adım: VS Code Hata Ayıklamayı Yapılandırma

*Not: Lütfen belirtilen yolu takip ederek dosyayı yerel dosya ile değiştirin*

#### 5a. Başlatma Yapılandırmasını Güncelleme

**`.vscode/launch.json` dosyasını düzenleyin:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Local MCP",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen",
      "postDebugTask": "Terminate All Tasks"
    },
    {
      "name": "Launch Inspector (Edge)",
      "type": "msedge",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Launch Inspector (Chrome)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    }
  ],
  "compounds": [
    {
      "name": "Debug in Agent Builder",
      "configurations": [
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Open Agent Builder",
    },
    {
      "name": "Debug in Inspector (Edge)",
      "configurations": [
        "Launch Inspector (Edge)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    },
    {
      "name": "Debug in Inspector (Chrome)",
      "configurations": [
        "Launch Inspector (Chrome)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    }
  ]
}
```

**`.vscode/tasks.json` dosyasını düzenleyin:**

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Server",
      "type": "shell",
      "command": "python -m debugpy --listen 127.0.0.1:5678 src/__init__.py sse",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}",
        "env": {
          "PORT": "3001"
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".*",
          "endsPattern": "Application startup complete|running"
        }
      }
    },
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npm run dev:inspector",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}/inspector",
        "env": {
          "CLIENT_PORT": "6274",
          "SERVER_PORT": "6277",
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Starting MCP inspector",
          "endsPattern": "Proxy server listening on port"
        }
      },
      "dependsOn": [
        "Start MCP Server"
      ]
    },
    {
      "label": "Open Agent Builder",
      "type": "shell",
      "command": "echo ${input:openAgentBuilder}",
      "presentation": {
        "reveal": "never"
      },
      "dependsOn": [
        "Start MCP Server"
      ],
    },
    {
      "label": "Terminate All Tasks",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "openAgentBuilder",
      "type": "command",
      "command": "ai-mlstudio.agentBuilder",
      "args": {
        "initialMCPs": [ "local-server-weather_mcp" ],
        "triggeredFrom": "vsc-tasks"
      }
    },
    {
      "id": "terminate",
      "type": "command",
      "command": "workbench.action.tasks.terminate",
      "args": "terminateAll"
    }
  ]
}
```


---

## 🚀 MCP Sunucunuzu Çalıştırma ve Test Etme

### 6. Adım: Bağımlılıkları Yükleyin

Yapılandırma değişikliklerini uyguladıktan sonra aşağıdaki komutları çalıştırın:

**Python bağımlılıklarını yükleyin:**
```bash
uv sync
```

**Inspector bağımlılıklarını yükleyin:**
```bash
cd inspector
npm install
```

### 7. Adım: Agent Builder ile Hata Ayıklama

1. **F5 tuşuna basın** veya **"Debug in Agent Builder"** yapılandırmasını seçin
2. **Hata ayıklama panelinden birleşik yapılandırmayı seçin**
3. **Sunucunun başlamasını ve Agent Builder'ın açılmasını bekleyin**
4. **Hava durumu MCP sunucunuzu doğal dil sorgularıyla test edin**

Aşağıdaki şekilde giriş yapın

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/tr/Result.6ac570f7d2b1d538.webp)

### 8. Adım: MCP Inspector ile Hata Ayıklama

1. **"Debug in Inspector"** yapılandırmasını kullanın (Edge veya Chrome)
2. **`http://localhost:6274` adresinden Inspector arayüzünü açın**
3. **Etkileşimli test ortamını keşfedin:**
   - Mevcut araçları görüntüleyin
   - Araç çalıştırmayı test edin
   - Ağ isteklerini izleyin
   - Sunucu yanıtlarını hata ayıklayın

![MCP Inspector Interface](../../../../translated_images/tr/Inspector.5672415cd02fe873.webp)

---

## 🎯 Temel Öğrenme Çıktıları

Bu laboratuvarı tamamlayarak şunları yaptınız:

- [x] **Microsoft Foundry Toolkit şablonlarını kullanarak özel bir MCP sunucusu oluşturdunuz**
- [x] **Gelişmiş işlevsellik için en son MCP SDK'sına (v1.9.3) yükselttiniz**
- [x] **Hem Agent Builder hem de Inspector için profesyonel hata ayıklama iş akışları yapılandırdınız**
- [x] **Etkileşimli sunucu testi için MCP Inspector'ı kurdunuz**
- [x] **MCP geliştirme için VS Code hata ayıklama yapılandırmalarını ustaca yönettiniz**

## 🔧 Keşfedilen Gelişmiş Özellikler

| Özellik | Açıklama | Kullanım Senaryosu |
|---------|----------|--------------------|
| **MCP Python SDK v1.9.3** | En son protokol uygulaması | Modern sunucu geliştirme |
| **MCP Inspector 0.14.0** | Etkileşimli hata ayıklama aracı | Gerçek zamanlı sunucu testi |
| **VS Code Hata Ayıklama** | Entegre geliştirme ortamı | Profesyonel hata ayıklama iş akışı |
| **Agent Builder Entegrasyonu** | Doğrudan Microsoft Foundry Toolkit bağlantısı | Uçtan uca ajan testi |

## 📚 Ek Kaynaklar

- [MCP Python SDK Dokümantasyonu](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit Uzantı Rehberi](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code Hata Ayıklama Dokümantasyonu](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol Spesifikasyonu](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Tebrikler!** Laboratuvar 3'ü başarıyla tamamladınız ve artık profesyonel geliştirme iş akışları kullanarak özel MCP sunucuları oluşturabilir, hata ayıklayabilir ve dağıtabilirsiniz.

### 🔜 Sonraki Modüle Devam Edin

MCP becerilerinizi gerçek dünya geliştirme iş akışına uygulamaya hazır mısınız? **[Modül 4: Pratik MCP Geliştirme - Özel GitHub Klon Sunucusu](../lab4/README.md)** sayfasına devam edin; burada:
- GitHub depo işlemlerini otomatikleştiren üretim hazır bir MCP sunucusu oluşturacaksınız
- MCP aracılığıyla GitHub depo klonlama fonksiyonelliği uygulayacaksınız
- Özel MCP sunucularını VS Code ve GitHub Copilot Agent Mode ile entegre edeceksiniz
- Özel MCP sunucularını üretim ortamlarında test edip dağıtacaksınız
- Geliştiriciler için pratik iş akışı otomasyonlarını öğreneceksiniz

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->