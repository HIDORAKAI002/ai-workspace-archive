# 🐙 Modul 4: Pengembangan MCP Praktis - Server Klon GitHub Kustom

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Mulai Cepat:** Bangun server MCP siap produksi yang mengotomatisasi proses kloning repositori GitHub dan integrasi VS Code hanya dalam 30 menit!

## 🎯 Tujuan Pembelajaran

Pada akhir lab ini, Anda akan dapat:

- ✅ Membuat server MCP kustom untuk alur kerja pengembangan dunia nyata
- ✅ Mengimplementasikan fungsi kloning repositori GitHub melalui MCP
- ✅ Mengintegrasikan server MCP kustom dengan VS Code dan Agent Builder
- ✅ Menggunakan GitHub Copilot Agent Mode dengan alat MCP kustom
- ✅ Menguji dan menerapkan server MCP kustom di lingkungan produksi

## 📋 Prasyarat

- Menyelesaikan Labs 1-3 (fundamental MCP dan pengembangan lanjutan)
- Berlangganan GitHub Copilot ([daftar gratis tersedia](https://github.com/github-copilot/signup))
- VS Code dengan ekstensi Microsoft Foundry Toolkit dan GitHub Copilot
- Git CLI terpasang dan dikonfigurasi

## 🏗️ Gambaran Proyek

### **Tantangan Pengembangan Dunia Nyata**
Sebagai pengembang, kita sering menggunakan GitHub untuk mengkloning repositori dan membukanya di VS Code atau VS Code Insiders. Proses manual ini meliputi:
1. Membuka terminal/command prompt
2. Menavigasi ke direktori yang diinginkan
3. Menjalankan perintah `git clone`
4. Membuka VS Code di direktori yang dikloning

**Solusi MCP kami menyederhanakan ini menjadi satu perintah cerdas!**

### **Apa yang Akan Anda Bangun**
Sebuah **Server MCP Klon GitHub** (`git_mcp_server`) yang menyediakan:

| Fitur | Deskripsi | Manfaat |
|---------|-------------|---------|
| 🔄 **Kloning Repositori Cerdas** | Mengkloning repositori GitHub dengan validasi | Pemeriksaan kesalahan otomatis |
| 📁 **Manajemen Direktori Cerdas** | Memeriksa dan membuat direktori dengan aman | Mencegah penimpaan |
| 🚀 **Integrasi VS Code Lintas Platform** | Membuka proyek di VS Code/Insiders | Transisi alur kerja yang mulus |
| 🛡️ **Penanganan Kesalahan yang Kuat** | Menangani masalah jaringan, izin, dan jalur | Keandalan siap produksi |

---

## 📖 Implementasi Langkah demi Langkah

### Langkah 1: Membuat Agent GitHub di Agent Builder

1. **Luncurkan Agent Builder** melalui ekstensi Microsoft Foundry Toolkit
2. **Buat agent baru** dengan konfigurasi berikut:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inisialisasi server MCP kustom:**
   - Navigasi ke **Tools** → **Add Tool** → **MCP Server**
   - Pilih **"Create A new MCP Server"**
   - Pilih **template Python** untuk fleksibilitas maksimal
   - **Nama Server:** `git_mcp_server`

### Langkah 2: Konfigurasikan GitHub Copilot Agent Mode

1. **Buka GitHub Copilot** di VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Pilih Model Agent** di antarmuka Copilot
3. **Pilih model Claude 3.7** untuk kemampuan penalaran yang ditingkatkan
4. **Aktifkan integrasi MCP** untuk akses alat

> **💡 Tips Pro:** Claude 3.7 menyediakan pemahaman unggul tentang alur kerja pengembangan dan pola penanganan kesalahan.

### Langkah 3: Implementasikan Fungsi Inti Server MCP

**Gunakan prompt terperinci berikut dengan GitHub Copilot Agent Mode:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Langkah 4: Uji Server MCP Anda

#### 4a. Uji di Agent Builder

1. **Jalankan konfigurasi debug** untuk Agent Builder
2. **Konfigurasikan agent Anda dengan prompt sistem ini:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Uji dengan skenario pengguna realistis:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/id/DebugAgent.81d152370c503241.webp)

**Hasil yang Diharapkan:**
- ✅ Kloning berhasil dengan konfirmasi jalur
- ✅ Peluncuran VS Code otomatis
- ✅ Pesan kesalahan jelas untuk skenario tidak valid
- ✅ Penanganan yang tepat pada kasus tepi

#### 4b. Uji di MCP Inspector


![MCP Inspector Testing](../../../../translated_images/id/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Selamat!** Anda telah berhasil membuat server MCP praktis siap produksi yang memecahkan tantangan alur kerja pengembangan nyata. Server klon GitHub kustom Anda menunjukkan kekuatan MCP untuk mengotomatisasi dan meningkatkan produktivitas pengembang.

### 🏆 Pencapaian Dibuka:
- ✅ **Pengembang MCP** - Membuat server MCP kustom
- ✅ **Otomatisasi Alur Kerja** - Menyederhanakan proses pengembangan  
- ✅ **Ahli Integrasi** - Menghubungkan berbagai alat pengembangan
- ✅ **Siap Produksi** - Membangun solusi yang dapat diterapkan

---

## 🎓 Penyelesaian Workshop: Perjalanan Anda dengan Model Context Protocol

**Peserta Workshop yang Terhormat,**

Selamat telah menyelesaikan semua empat modul workshop Model Context Protocol! Anda telah menempuh perjalanan panjang dari memahami konsep dasar Microsoft Foundry Toolkit hingga membangun server MCP siap produksi yang memecahkan tantangan pengembangan dunia nyata.

### 🚀 Rekap Jalur Pembelajaran Anda:

**[Modul 1](../lab1/README.md)**: Anda mulai dengan menjelajahi fundamental Microsoft Foundry Toolkit, pengujian model, dan membuat agent AI pertama Anda.

**[Modul 2](../lab2/README.md)**: Anda mempelajari arsitektur MCP, mengintegrasikan Playwright MCP, dan membangun agent automasi browser pertama Anda.

**[Modul 3](../lab3/README.md)**: Anda maju ke pengembangan server MCP kustom dengan server Weather MCP dan menguasai alat debugging.

**[Modul 4](../lab4/README.md)**: Kini Anda menerapkan semua hal untuk membuat alat automasi alur kerja repositori GitHub yang praktis.

### 🌟 Apa yang Anda Kuasai:

- ✅ **Ekosistem Microsoft Foundry Toolkit**: Model, agent, dan pola integrasi
- ✅ **Arsitektur MCP**: Desain klien-server, protokol transport, dan keamanan
- ✅ **Alat Pengembang**: Dari Playground hingga Inspector hingga penerapan produksi
- ✅ **Pengembangan Kustom**: Membangun, menguji, dan menerapkan server MCP Anda sendiri
- ✅ **Aplikasi Praktis**: Memecahkan tantangan alur kerja dunia nyata dengan AI

### 🔮 Langkah Anda Selanjutnya:

1. **Bangun Server MCP Anda Sendiri**: Terapkan keterampilan ini untuk mengotomasi alur kerja unik Anda
2. **Bergabung dengan Komunitas MCP**: Bagikan karya dan belajar dari yang lain
3. **Jelajahi Integrasi Lanjutan**: Hubungkan server MCP ke sistem perusahaan
4. **Berkontribusi ke Open Source**: Bantu perbaiki alat dan dokumentasi MCP

Ingat, workshop ini hanyalah awal. Ekosistem Model Context Protocol berkembang cepat, dan Anda sekarang siap menjadi pelopor alat pengembangan bertenaga AI.

**Terima kasih atas partisipasi dan dedikasi Anda dalam belajar!**

Kami berharap workshop ini telah memicu ide yang akan mengubah cara Anda membangun dan berinteraksi dengan alat AI dalam perjalanan pengembangan Anda.

**Selamat berkoding!**

---

## Selanjutnya

Selamat telah menyelesaikan semua lab di Modul 10!

- Kembali ke: [Modul 10 Overview](../README.md)
- Lanjut ke: [Modul 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->