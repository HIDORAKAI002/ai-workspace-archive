# Menyediakan Klien Host MCP Popular

Panduan ini merangkumi cara mengkonfigurasi dan menggunakan pelayan MCP dengan aplikasi host AI popular. Setiap host mempunyai pendekatan konfigurasi tersendiri, tetapi setelah disediakan, mereka semua berkomunikasi dengan pelayan MCP menggunakan protokol piawai.

## Apakah itu Host MCP?

**Host MCP** adalah aplikasi AI yang boleh disambungkan ke pelayan MCP untuk memperluaskan keupayaannya. Anggap ia sebagai "hadapan" yang berinteraksi dengan pengguna, manakala pelayan MCP menyediakan alat dan data "belakang".

```mermaid
flowchart LR
    User[👤 Pengguna] --> Host[🖥️ Hos MCP]
    Host --> S1[Pelayan MCP A]
    Host --> S2[Pelayan MCP B]
    Host --> S3[Pelayan MCP C]
    
    subgraph "Hos Popular"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Prasyarat

- Pelayan MCP untuk disambungkan (lihat [Modul 3.1 - Pelayan Pertama](../01-first-server/README.md))
- Aplikasi host dipasang pada sistem anda
- Kefahaman asas tentang fail konfigurasi JSON

---

## 1. Claude Desktop

**Claude Desktop** adalah aplikasi desktop rasmi Anthropic yang menyokong MCP secara asli.

### Pemasangan

1. Muat turun Claude Desktop daripada [claude.ai/download](https://claude.ai/download)
2. Pasang dan daftar masuk dengan akaun Anthropic anda

### Konfigurasi

Claude Desktop menggunakan fail konfigurasi JSON untuk mentakrifkan pelayan MCP.

**Lokasi fail konfigurasi:**
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

### Pilihan Konfigurasi

| Medan | Penerangan | Contoh |
|-------|------------|--------|
| `command` | Boleh laku yang hendak dijalankan | `"python"`, `"node"`, `"npx"` |
| `args` | Argumen baris arahan | `["-m", "my_server"]` |
| `env` | Pembolehubah persekitaran | `{"API_KEY": "xxx"}` |
| `cwd` | Direktori kerja | `"/path/to/server"` |

### Uji Persediaan Anda

1. Simpan fail konfigurasi
2. Mulakan semula Claude Desktop sepenuhnya (tutup dan buka semula)
3. Buka perbualan baru
4. Cari ikon 🔌 yang menunjukkan pelayan disambung
5. Cuba minta Claude gunakan salah satu alat anda

### Penyelesaian Masalah Claude Desktop

**Pelayan tidak muncul:**
- Semak sintaks fail konfigurasi menggunakan pengesah JSON
- Pastikan laluan command betul
- Semak log Claude Desktop: Bantuan → Papar Log

**Pelayan rosak ketika mula:**
- Uji pelayan anda secara manual di terminal terlebih dahulu
- Pastikan pembolehubah persekitaran diset dengan betul
- Pastikan semua pergantungan dipasang

---

## 2. VS Code dengan GitHub Copilot

VS Code menyokong MCP melalui sambungan GitHub Copilot Chat.

### Prasyarat

1. VS Code 1.99+ dipasang
2. Sambungan GitHub Copilot dipasang
3. Sambungan GitHub Copilot Chat dipasang

### Konfigurasi

VS Code menggunakan `.vscode/mcp.json` dalam workspace atau tetapan pengguna anda.

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

**Tetapan Pengguna** (`settings.json`):

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
2. Taip `@` untuk melihat alat MCP yang tersedia
3. Gunakan bahasa semula jadi untuk memanggil alat: "Calculate 25 * 48 using the calculator"

### Penyelesaian Masalah VS Code

**Pelayan MCP tidak dimuat:**
- Semak panel Output → "MCP" untuk log ralat
- Muat semula tetingkap: Ctrl+Shift+P → "Developer: Reload Window"
- Sahkan pelayan berfungsi sendiri dahulu

---

## 3. Cursor

**Cursor** adalah penyunting kod berasaskan AI pertama dengan sokongan MCP terbina dalam.

### Pemasangan

1. Muat turun Cursor daripada [cursor.sh](https://cursor.sh)
2. Pasang dan daftar masuk

### Konfigurasi

Cursor menggunakan format konfigurasi yang serupa dengan Claude Desktop.

**Lokasi fail konfigurasi:**
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
2. Alat MCP muncul secara automatik dalam cadangan
3. Minta AI melakukan tugasan menggunakan pelayan yang disambung

---

## 4. Cline (Berasaskan Terminal)

**Cline** adalah klien MCP berbasis terminal, sesuai untuk aliran kerja baris arahan.

### Pemasangan

```bash
npm install -g @anthropic/cline
```

### Konfigurasi

Cline menggunakan pembolehubah persekitaran dan argumen baris arahan.

**Menggunakan pembolehubah persekitaran:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Menggunakan argumen baris arahan:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Fail konfigurasi** (`~/.clinerc`):

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
# Mula sesi interaktif
cline

# Pertanyaan tunggal dengan MCP
cline "Calculate the square root of 144 using the calculator"

# Senaraikan alat yang tersedia
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** adalah penyunting kod lain berkuasa AI dengan sokongan MCP.

### Pemasangan

1. Muat turun Windsurf daripada [codeium.com/windsurf](https://codeium.com/windsurf)
2. Pasang dan buat akaun

### Konfigurasi

Konfigurasi Windsurf dikendalikan melalui UI tetapan:

1. Buka Tetapan (Ctrl+, / Cmd+,)
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

## Perbandingan Jenis Pengangkutan

Host yang berbeza menyokong mekanisme pengangkutan yang berbeza:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (input/output standard): Terbaik untuk pelayan tempatan yang dimulakan oleh host  
**SSE/HTTP**: Terbaik untuk pelayan jauh atau pelayan dikongsi antara beberapa klien

---

## Penyelesaian Masalah Lazim

### Pelayan tidak akan mula

1. **Uji pelayan secara manual terlebih dahulu:**
   ```bash
   # Untuk Python
   python -m your_server_module
   
   # Untuk Node.js
   node /path/to/server/index.js
   ```

2. **Semak laluan perintah:**
   - Gunakan laluan mutlak jika boleh
   - Pastikan boleh laku ada dalam PATH anda

3. **Sahkan pergantungan:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Pelayan disambung tetapi alat tidak berfungsi

1. **Semak log pelayan** - Kebanyakan host ada pilihan logging  
2. **Sahkan pendaftaran alat** - Guna MCP Inspector untuk menguji  
3. **Semak kebenaran** - Sesetengah alat perlukan akses fail/rangkaian

### Pembolehubah persekitaran tidak dihantar

- Sesetengah host membersihkan pembolehubah persekitaran  
- Gunakan medan `env` dalam konfigurasi secara eksplisit  
- Elak data sensitif dalam fail konfigurasi (gunakan pengurusan rahsia)

---

## Amalan Keselamatan Terbaik

1. **Jangan pernah komit kunci API** ke dalam fail konfigurasi  
2. **Gunakan pembolehubah persekitaran** untuk data sensitif  
3. **Hadkan kebenaran pelayan** hanya kepada yang diperlukan  
4. **Semak kod pelayan** sebelum memberikan akses kepada sistem anda  
5. **Gunakan senarai putih** untuk akses sistem fail dan rangkaian

---

## Apa Seterusnya

- [3.13 - Debugging dengan MCP Inspector](../13-mcp-inspector/README.md)  
- [3.1 - Cipta pelayan MCP pertama anda](../01-first-server/README.md)  
- [Modul 5 - Topik Lanjutan](../../05-AdvancedTopics/README.md)  

---

## Sumber Tambahan

- [Dokumentasi MCP Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [Sambungan MCP VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [Spesifikasi MCP - Pengangkutan](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [Daftar Rasmi Pelayan MCP](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk mendapatkan ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->