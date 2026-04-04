# Menyiapkan Klien Host MCP Populer

Panduan ini membahas cara mengonfigurasi dan menggunakan server MCP dengan aplikasi host AI populer. Setiap host memiliki pendekatan konfigurasi sendiri, tetapi setelah diatur, semuanya berkomunikasi dengan server MCP menggunakan protokol standar.

## Apa itu Host MCP?

**Host MCP** adalah aplikasi AI yang dapat terhubung ke server MCP untuk memperluas kemampuannya. Anggap saja sebagai "antarmuka depan" yang digunakan pengguna, sementara server MCP menyediakan alat dan data "antarmuka belakang".

```mermaid
flowchart LR
    User[👤 Pengguna] --> Host[🖥️ Host MCP]
    Host --> S1[Server MCP A]
    Host --> S2[Server MCP B]
    Host --> S3[Server MCP C]
    
    subgraph "Host Populer"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Prasyarat

- Sebuah server MCP untuk dihubungkan (lihat [Modul 3.1 - Server Pertama](../01-first-server/README.md))
- Aplikasi host terpasang di sistem Anda
- Pemahaman dasar tentang berkas konfigurasi JSON

---

## 1. Claude Desktop

**Claude Desktop** adalah aplikasi desktop resmi dari Anthropic yang secara native mendukung MCP.

### Instalasi

1. Unduh Claude Desktop dari [claude.ai/download](https://claude.ai/download)
2. Instal dan masuk dengan akun Anthropic Anda

### Konfigurasi

Claude Desktop menggunakan berkas konfigurasi JSON untuk mendefinisikan server MCP.

**Lokasi berkas konfigurasi:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Contoh konfigurasi:**

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

### Opsi Konfigurasi

| Field | Deskripsi | Contoh |
|-------|-----------|--------|
| `command` | Executable yang dijalankan | `"python"`, `"node"`, `"npx"` |
| `args` | Argumen baris perintah | `["-m", "my_server"]` |
| `env` | Variabel lingkungan | `{"API_KEY": "xxx"}` |
| `cwd` | Direktori kerja | `"/path/to/server"` |

### Menguji Pengaturan Anda

1. Simpan berkas konfigurasi
2. Restart Claude Desktop sepenuhnya (keluar dan buka kembali)
3. Buka percakapan baru
4. Cari ikon 🔌 yang menandakan server terhubung
5. Coba minta Claude menggunakan salah satu alat Anda

### Pemecahan Masalah Claude Desktop

**Server tidak muncul:**
- Periksa sintaks berkas konfigurasi dengan validator JSON
- Pastikan jalur perintah benar
- Periksa log Claude Desktop: Bantuan → Tampilkan Log

**Server crash saat mulai:**
- Uji server Anda secara manual di terminal terlebih dahulu
- Periksa variabel lingkungan sudah diatur dengan benar
- Pastikan semua dependensi terinstal

---

## 2. VS Code dengan GitHub Copilot

VS Code mendukung MCP melalui ekstensi GitHub Copilot Chat.

### Prasyarat

1. VS Code versi 1.99+ terinstal
2. Ekstensi GitHub Copilot terpasang
3. Ekstensi GitHub Copilot Chat terpasang

### Konfigurasi

VS Code menggunakan `.vscode/mcp.json` di workspace atau pengaturan pengguna.

**Konfigurasi Workspace** (`.vscode/mcp.json`):

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

**Pengaturan pengguna** (`settings.json`):

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

### Menggunakan MCP di VS Code

1. Buka panel Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Ketik `@` untuk melihat alat MCP yang tersedia
3. Gunakan bahasa alami untuk memanggil alat: "Hitung 25 * 48 menggunakan kalkulator"

### Pemecahan Masalah VS Code

**Server MCP tidak dimuat:**
- Periksa panel Output → "MCP" untuk log error
- Reload window: Ctrl+Shift+P → "Developer: Reload Window"
- Pastikan server berjalan secara mandiri terlebih dahulu

---

## 3. Cursor

**Cursor** adalah editor kode dengan dukungan MCP bawaan dan fokus pada AI.

### Instalasi

1. Unduh Cursor dari [cursor.sh](https://cursor.sh)
2. Instal dan masuk

### Konfigurasi

Cursor menggunakan format konfigurasi serupa dengan Claude Desktop.

**Lokasi berkas konfigurasi:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Contoh konfigurasi:**

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

### Menggunakan MCP di Cursor

1. Buka chat AI Cursor (Ctrl+L / Cmd+L)
2. Alat MCP otomatis muncul dalam saran
3. Minta AI untuk menjalankan tugas menggunakan server terhubung

---

## 4. Cline (Berbasis Terminal)

**Cline** adalah klien MCP berbasis terminal, ideal untuk alur kerja baris perintah.

### Instalasi

```bash
npm install -g @anthropic/cline
```

### Konfigurasi

Cline menggunakan variabel lingkungan dan argumen baris perintah.

**Menggunakan variabel lingkungan:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Menggunakan argumen baris perintah:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Berkas konfigurasi** (`~/.clinerc`):

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

### Menggunakan Cline

```bash
# Mulai sesi interaktif
cline

# Satu kueri dengan MCP
cline "Calculate the square root of 144 using the calculator"

# Daftar alat yang tersedia
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** adalah editor kode bertenaga AI lain dengan dukungan MCP.

### Instalasi

1. Unduh Windsurf dari [codeium.com/windsurf](https://codeium.com/windsurf)
2. Instal dan buat akun

### Konfigurasi

Konfigurasi Windsurf dikelola melalui UI pengaturan:

1. Buka Pengaturan (Ctrl+, / Cmd+,)
2. Cari "MCP"
3. Klik "Edit in settings.json"

**Contoh konfigurasi:**

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

## Perbandingan Tipe Transportasi

Host yang berbeda mendukung mekanisme transportasi berbeda:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standard input/output): Terbaik untuk server lokal yang dijalankan oleh host  
**SSE/HTTP**: Terbaik untuk server jarak jauh atau server yang dibagikan antara beberapa klien

---

## Pemecahan Masalah Umum

### Server tidak mau mulai

1. **Uji server secara manual terlebih dahulu:**
   ```bash
   # Untuk Python
   python -m your_server_module
   
   # Untuk Node.js
   node /path/to/server/index.js
   ```

2. **Periksa jalur perintah:**
   - Gunakan jalur absolut jika memungkinkan
   - Pastikan executable ada di PATH Anda

3. **Verifikasi dependensi:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Server terhubung tetapi alat tidak berfungsi

1. **Periksa log server** - Kebanyakan host memiliki opsi logging  
2. **Verifikasi pendaftaran alat** - Gunakan MCP Inspector untuk pengujian  
3. **Periksa izin** - Beberapa alat memerlukan akses file/jaringan

### Variabel lingkungan tidak diteruskan

- Beberapa host menyaring variabel lingkungan  
- Gunakan bidang `env` secara eksplisit dalam konfigurasi  
- Hindari data sensitif di berkas konfigurasi (gunakan manajemen rahasia)

---

## Praktik Keamanan Terbaik

1. **Jangan pernah commit kunci API** ke berkas konfigurasi  
2. **Gunakan variabel lingkungan** untuk data sensitif  
3. **Batasi izin server** hanya untuk yang dibutuhkan  
4. **Tinjau kode server** sebelum memberikan akses ke sistem Anda  
5. **Gunakan allowlist** untuk akses sistem file dan jaringan

---

## Selanjutnya

- [3.13 - Debugging dengan MCP Inspector](../13-mcp-inspector/README.md)  
- [3.1 - Buat server MCP pertama Anda](../01-first-server/README.md)  
- [Modul 5 - Topik Lanjutan](../../05-AdvancedTopics/README.md)

---

## Sumber Daya Tambahan

- [Dokumentasi Claude Desktop MCP](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [Ekstensi VS Code MCP](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [Spesifikasi MCP - Transport](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [Registri Server MCP Resmi](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk akurasi, mohon diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau salah tafsir yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->