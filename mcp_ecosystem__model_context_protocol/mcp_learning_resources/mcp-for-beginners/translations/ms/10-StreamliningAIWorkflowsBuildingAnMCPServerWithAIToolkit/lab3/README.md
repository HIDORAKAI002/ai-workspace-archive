# 🔧 Modul 3: Pembangunan MCP Lanjutan dengan Microsoft Foundry Toolkit

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Objektif Pembelajaran

Menjelang akhir makmal ini, anda akan dapat:

- ✅ Mewujudkan pelayan MCP tersuai menggunakan Microsoft Foundry Toolkit
- ✅ Mengkonfigurasi dan menggunakan SDK Python MCP terkini (v1.9.3)
- ✅ Menyediakan dan menggunakan MCP Inspector untuk penyahpepijatan
- ✅ Menyahpepijat pelayan MCP dalam persekitaran Agent Builder dan Inspector
- ✅ Memahami aliran kerja pembangunan pelayan MCP lanjutan

## 📋 Prasyarat

- Menyelesaikan Makmal 2 (Asas MCP)
- VS Code dengan sambungan Microsoft Foundry Toolkit dipasang
- Persekitaran Python 3.10+
- Node.js dan npm untuk penyediaan Inspector

## 🏗️ Apa yang Anda Akan Bina

Dalam makmal ini, anda akan mencipta **Pelayan MCP Cuaca** yang menunjukkan:
- Pelaksanaan pelayan MCP tersuai
- Integrasi dengan Microsoft Foundry Toolkit Agent Builder
- Aliran kerja penyahpepijatan profesional
- Pola penggunaan SDK MCP moden

---

## 🔧 Gambaran Keseluruhan Komponen Teras

### 🐍 SDK Python MCP
Model Context Protocol Python SDK menyediakan asas untuk membina pelayan MCP tersuai. Anda akan menggunakan versi 1.9.3 dengan keupayaan penyahpepijatan yang dipertingkatkan.

### 🔍 MCP Inspector
Alat penyahpepijatan berkuasa yang menyediakan:
- Pemantauan pelayan masa nyata
- Visualisasi pelaksanaan alat
- Pemeriksaan permintaan/respon rangkaian
- Persekitaran ujian interaktif

---

## 📖 Pelaksanaan Langkah demi Langkah

### Langkah 1: Cipta WeatherAgent dalam Agent Builder

1. **Lancarkan Agent Builder** di VS Code melalui sambungan Microsoft Foundry Toolkit
2. **Cipta ejen baru** dengan konfigurasi berikut:
   - Nama Ejen: `WeatherAgent`

![Agent Creation](../../../../translated_images/ms/Agent.c9c33f6a412b4cde.webp)

### Langkah 2: Mulakan Projek Pelayan MCP

1. **Navigasi ke Tools** → **Add Tool** dalam Agent Builder
2. **Pilih "MCP Server"** dari pilihan yang tersedia
3. **Pilih "Create A new MCP Server"**
4. **Pilih templat `python-weather`**
5. **Namakan pelayan anda:** `weather_mcp`

![Python Template Selection](../../../../translated_images/ms/Pythontemplate.9d0a2913c6491500.webp)

### Langkah 3: Buka dan Periksa Projek

1. **Buka projek yang dijanakan** di VS Code
2. **Semak struktur projek:**
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

### Langkah 4: Tingkatkan kepada SDK MCP Terkini

> **🔍 Mengapa Tingkatkan?** Kami mahu menggunakan SDK MCP terkini (v1.9.3) dan perkhidmatan Inspector (0.14.0) untuk ciri dipertingkatkan dan keupayaan penyahpepijatan yang lebih baik.

#### 4a. Kemas Kini Kebergantungan Python

**Edit `pyproject.toml`:** kemas kini [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Kemas Kini Konfigurasi Inspector

**Edit `inspector/package.json`:** kemas kini [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Kemas Kini Kebergantungan Inspector

**Edit `inspector/package-lock.json`:** kemas kini [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Nota:** Fail ini mengandungi definisi kebergantungan yang luas. Di bawah adalah struktur penting - kandungan penuh memastikan penyelesaian kebergantungan yang betul.


> **⚡ Kunci Pakej Penuh:** package-lock.json lengkap mengandungi ~3000 baris definisi kebergantungan. Di atas menunjukkan struktur utama - gunakan fail yang disediakan untuk penyelesaian kebergantungan penuh.

### Langkah 5: Konfigurasi Penyahpepijatan VS Code

*Nota: Sila salin fail dalam laluan yang dinyatakan untuk menggantikan fail tempatan yang sepadan*

#### 5a. Kemas Kini Konfigurasi Pelancaran

**Edit `.vscode/launch.json`:**

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

**Edit `.vscode/tasks.json`:**

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

## 🚀 Menjalankan dan Menguji Pelayan MCP Anda

### Langkah 6: Pasang Kebergantungan

Selepas membuat perubahan konfigurasi, jalankan arahan berikut:

**Pasang kebergantungan Python:**
```bash
uv sync
```

**Pasang kebergantungan Inspector:**
```bash
cd inspector
npm install
```

### Langkah 7: Nyahpepijat dengan Agent Builder

1. **Tekan F5** atau gunakan konfigurasi **"Debug in Agent Builder"**
2. **Pilih konfigurasi gabungan** dari panel nyahpepijat
3. **Tunggu pelayan bermula** dan Agent Builder dibuka
4. **Uji pelayan MCP cuaca anda** dengan pertanyaan bahasa semula jadi

Masukkan arahan seperti ini

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/ms/Result.6ac570f7d2b1d538.webp)

### Langkah 8: Nyahpepijat dengan MCP Inspector

1. **Gunakan konfigurasi "Debug in Inspector"** (Edge atau Chrome)
2. **Buka antara muka Inspector** di `http://localhost:6274`
3. **Terokai persekitaran ujian interaktif:**
   - Lihat alat yang tersedia
   - Uji pelaksanaan alat
   - Pantau permintaan rangkaian
   - Nyahpepijat tindak balas pelayan

![MCP Inspector Interface](../../../../translated_images/ms/Inspector.5672415cd02fe873.webp)

---

## 🎯 Hasil Pembelajaran Utama

Dengan menyelesaikan makmal ini, anda telah:

- [x] **Mencipta pelayan MCP tersuai** menggunakan templat Microsoft Foundry Toolkit
- [x] **Meningkatkan ke SDK MCP terkini** (v1.9.3) untuk fungsi dipertingkatkan
- [x] **Mengkonfigurasi aliran kerja penyahpepijatan profesional** untuk Agent Builder dan Inspector
- [x] **Menyediakan MCP Inspector** untuk ujian pelayan interaktif
- [x] **Menguasai konfigurasi penyahpepijatan VS Code** untuk pembangunan MCP

## 🔧 Ciri Lanjutan yang Diterokai

| Ciri | Penerangan | Kes Penggunaan |
|---------|-------------|----------|
| **SDK Python MCP v1.9.3** | Pelaksanaan protokol terkini | Pembangunan pelayan moden |
| **MCP Inspector 0.14.0** | Alat penyahpepijatan interaktif | Ujian pelayan masa nyata |
| **Penyahpepijatan VS Code** | Persekitaran pembangunan bersepadu | Aliran kerja penyahpepijatan profesional |
| **Integrasi Agent Builder** | Sambungan terus Microsoft Foundry Toolkit | Ujian ejen hujung-ke-hujung |

## 📚 Sumber Tambahan

- [Dokumentasi SDK Python MCP](https://modelcontextprotocol.io/docs/sdk/python)
- [Panduan Sambungan Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [Dokumentasi Penyahpepijatan VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [Spesifikasi Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Tahniah!** Anda telah berjaya menyelesaikan Makmal 3 dan kini boleh mencipta, menyahpepijat, dan melaksanakan pelayan MCP tersuai menggunakan aliran kerja pembangunan profesional.

### 🔜 Teruskan ke Modul Seterusnya

Bersedia untuk menggunakan kemahiran MCP anda dalam aliran kerja pembangunan dunia sebenar? Teruskan ke **[Modul 4: Pembangunan MCP Praktikal - Pelayan Klon GitHub Tersuai](../lab4/README.md)** di mana anda akan:
- Membina pelayan MCP sedia untuk penerbitan yang mengautomasi operasi repositori GitHub
- Melaksanakan fungsi klon repositori GitHub melalui MCP
- Mengintegrasikan pelayan MCP tersuai dengan VS Code dan Mod Ejen GitHub Copilot
- Menguji dan melaksanakan pelayan MCP tersuai dalam persekitaran pengeluaran
- Mempelajari automasi aliran kerja praktikal untuk pembangun

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->