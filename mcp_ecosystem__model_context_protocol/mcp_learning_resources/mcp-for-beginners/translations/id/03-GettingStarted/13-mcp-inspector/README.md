# Debugging dengan MCP Inspector

**MCP Inspector** adalah alat debugging penting yang memungkinkan Anda menguji dan memecahkan masalah server MCP Anda secara interaktif tanpa perlu aplikasi host AI penuh. Anggap saja seperti "Postman untuk MCP" - ini menyediakan antarmuka visual untuk mengirim permintaan, melihat respons, dan memahami bagaimana server Anda berperilaku.

## Mengapa Menggunakan MCP Inspector?

Saat membangun server MCP, Anda sering menghadapi tantangan ini:

- **"Apakah server saya berjalan?"** - Inspector menunjukkan status koneksi
- **"Apakah alat saya terdaftar dengan benar?"** - Inspector menampilkan semua alat yang tersedia
- **"Bagaimana format responsnya?"** - Inspector menampilkan respons JSON lengkap
- **"Mengapa alat ini tidak berfungsi?"** - Inspector menunjukkan pesan kesalahan detail

## Prasyarat

- Node.js 18+ terpasang
- npm (termasuk dengan Node.js)
- Server MCP untuk diuji (lihat [Modul 3.1 - Server Pertama](../01-first-server/README.md))

## Instalasi

### Opsi 1: Jalankan dengan npx (Direkomendasikan untuk Pengujian Cepat)

```bash
npx @modelcontextprotocol/inspector
```

### Opsi 2: Pasang Secara Global

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Opsi 3: Tambahkan ke Proyek Anda

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Tambahkan ke `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Menghubungkan ke Server Anda

### Server stdio (Proses Lokal)

Untuk server yang berkomunikasi melalui input/output standar:

```bash
# Server Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Server Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# Dengan variabel lingkungan
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### Server SSE/HTTP (Jaringan)

Untuk server yang dijalankan sebagai layanan HTTP:

1. Mulai server Anda terlebih dahulu:
   ```bash
   python server.py  # Server berjalan di http://localhost:8080
   ```

2. Jalankan Inspector dan hubungkan:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Tampilan Antarmuka Inspector

Saat Inspector diluncurkan, Anda akan melihat antarmuka web (biasanya di `http://localhost:5173`):

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

## Menguji Alat

### Melihat Daftar Alat yang Tersedia

1. Klik tab **Tools**
2. Inspector secara otomatis memanggil `tools/list`
3. Anda akan melihat semua alat yang terdaftar dengan:
   - Nama alat
   - Deskripsi
   - Skema input (parameter)

### Memanggil Sebuah Alat

1. Pilih alat dari daftar
2. Isi parameter yang diperlukan dalam formulir
3. Klik **Run Tool**
4. Lihat respons di panel hasil

**Contoh: Menguji alat kalkulator**

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

### Debugging Kesalahan Alat

Ketika sebuah alat gagal, Inspector menampilkan:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Kode kesalahan umum:
| Kode | Arti |
|------|---------|
| -32700 | Kesalahan parse (JSON tidak valid) |
| -32600 | Permintaan tidak valid |
| -32601 | Metode tidak ditemukan |
| -32602 | Parameter tidak valid |
| -32603 | Kesalahan internal |

---

## Menguji Sumber Daya

### Melihat Daftar Sumber Daya

1. Klik tab **Resources**
2. Inspector memanggil `resources/list`
3. Anda akan melihat:
   - URI sumber daya
   - Nama dan deskripsi
   - Tipe MIME

### Membaca Sumber Daya

1. Pilih sumber daya
2. Klik **Read Resource**
3. Lihat isi yang dikembalikan

**Contoh output:**

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

## Menguji Prompt

### Melihat Daftar Prompt

1. Klik tab **Prompts**
2. Inspector memanggil `prompts/list`
3. Lihat template prompt yang tersedia

### Mendapatkan Prompt

1. Pilih sebuah prompt
2. Isi argumen yang diperlukan jika ada
3. Klik **Get Prompt**
4. Lihat pesan prompt yang dihasilkan

---

## Analisis Log Pesan

Log pesan menampilkan semua pesan protokol MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Yang Perlu Diperhatikan

- **Pasangan Request/Response**: Setiap `→` harus memiliki `←` yang cocok
- **Pesan kesalahan**: Cari `"error"` dalam respons
- **Waktu**: Jeda panjang mungkin menandakan masalah performa
- **Versi protokol**: Pastikan server dan klien setuju pada versi

---

## Integrasi VS Code

Anda dapat menjalankan Inspector langsung dari VS Code:

### Menggunakan launch.json

Tambahkan ke `.vscode/launch.json`:

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

### Menggunakan Tasks

Tambahkan ke `.vscode/tasks.json`:

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

## Skenario Debugging Umum

### Skenario 1: Server Tidak Bisa Terhubung

**Gejala:** Inspector menunjukkan "Disconnected" atau macet pada "Connecting..."

**Daftar periksa:**
1. ✅ Apakah perintah server benar?
2. ✅ Apakah semua dependensi terpasang?
3. ✅ Apakah path server absolut atau relatif terhadap direktori saat ini?
4. ✅ Apakah variabel lingkungan yang diperlukan sudah disetel?

**Langkah debug:**
```bash
# Uji server secara manual terlebih dahulu
python -c "import your_server_module; print('OK')"

# Periksa kesalahan impor
python -m your_server_module 2>&1 | head -20

# Verifikasi MCP SDK telah terpasang
pip show mcp
```

### Skenario 2: Alat Tidak Muncul

**Gejala:** Tab Tools menampilkan daftar kosong

**Kemungkinan penyebab:**
1. Alat tidak terdaftar selama inisialisasi server
2. Server crash setelah startup
3. Handler `tools/list` mengembalikan array kosong

**Langkah debug:**
1. Periksa log pesan untuk respons `tools/list`
2. Tambahkan logging pada kode pendaftaran alat Anda
3. Verifikasi dekorator `@mcp.tool()` ada (Python)

### Skenario 3: Alat Mengembalikan Kesalahan

**Gejala:** Pemanggilan alat mengembalikan respons kesalahan

**Pendekatan debug:**
1. Baca pesan kesalahan dengan cermat
2. Periksa tipe parameter sesuai skema
3. Tambahkan try/catch dengan pesan kesalahan detail
4. Periksa log server untuk jejak stack

**Contoh penanganan kesalahan yang diperbaiki:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Logika alat di sini
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Skenario 4: Isi Sumber Daya Kosong

**Gejala:** Sumber daya mengembalikan tetapi isi kosong atau null

**Daftar periksa:**
1. ✅ Path file atau URI benar
2. ✅ Server memiliki izin membaca sumber daya
3. ✅ Isi sumber daya dikembalikan dengan benar

---

## Fitur Lanjutan Inspector

### Header Kustom (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Logging Verbose

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Merekam Sesi

Inspector dapat mengekspor log pesan untuk analisis nanti:
1. Klik **Export Log** di panel pesan
2. Simpan file JSON
3. Bagikan dengan anggota tim untuk debugging

---

## Praktik Terbaik

1. **Uji segera dan sering** - Gunakan Inspector selama pengembangan, bukan hanya saat terjadi masalah
2. **Mulai dengan sederhana** - Uji konektivitas dasar sebelum panggilan alat yang kompleks
3. **Periksa skema** - Banyak kesalahan berasal dari ketidaksesuaian tipe parameter
4. **Baca pesan kesalahan** - Kesalahan MCP biasanya deskriptif
5. **Jaga Inspector tetap terbuka** - Membantu menangkap masalah saat Anda mengembangkan

---

## Apa Selanjutnya

Anda telah menyelesaikan Modul 3: Memulai! Lanjutkan pembelajaran Anda:

- [Modul 4: Implementasi Praktis](../../04-PracticalImplementation/README.md)

---

## Sumber Daya Tambahan

- [Repositori GitHub MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Spesifikasi MCP - Pesan Protokol](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Spesifikasi JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->