# 🐙 Modul 4: Pembangunan MCP Praktikal - Pelayan Klon GitHub Custom

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Mula Cepat:** Bina pelayan MCP yang sedia produksi yang mengautomasikan pengklonan repositori GitHub dan integrasi VS Code dalam hanya 30 minit!

## 🎯 Objektif Pembelajaran

Menjelang akhir makmal ini, anda akan dapat:

- ✅ Membuat pelayan MCP custom untuk aliran kerja pembangunan sebenar
- ✅ Melaksanakan fungsi pengklonan repositori GitHub melalui MCP
- ✅ Mengintegrasikan pelayan MCP custom dengan VS Code dan Pembina Agen
- ✅ Menggunakan Mod Agen GitHub Copilot dengan alat MCP custom
- ✅ Menguji dan menerapkan pelayan MCP custom di persekitaran produksi

## 📋 Prasyarat

- Menyelesaikan Makmal 1-3 (asas MCP dan pembangunan lanjutan)
- Langganan GitHub Copilot ([pendaftaran percuma tersedia](https://github.com/github-copilot/signup))
- VS Code dengan peluasan Microsoft Foundry Toolkit dan GitHub Copilot
- CLI Git dipasang dan dikonfigurasi

## 🏗️ Gambaran Projek

### **Cabaran Pembangunan Dunia Sebenar**
Sebagai pembangun, kami sering menggunakan GitHub untuk mengklon repositori dan membukanya di VS Code atau VS Code Insiders. Proses manual ini melibatkan:
1. Membuka terminal/command prompt
2. Navigasi ke direktori yang diinginkan
3. Menjalankan arahan `git clone`
4. Membuka VS Code di direktori yang diklon

**Penyelesaian MCP kami memudahkan ini menjadi satu arahan pintar!**

### **Apa Yang Anda Akan Bina**
Sebuah **Pelayan MCP Klon GitHub** (`git_mcp_server`) yang menyediakan:

| Ciri | Penerangan | Manfaat |
|---------|-------------|---------|
| 🔄 **Pengklonan Repositori Pintar** | Klon repo GitHub dengan pengesahan | Pemeriksaan ralat automatik |
| 📁 **Pengurusan Direktori Pintar** | Semak dan cipta direktori dengan selamat | Mengelakkan penindihan |
| 🚀 **Integrasi VS Code Merentas Platform** | Buka projek dalam VS Code/Insiders | Peralihan aliran kerja lancar |
| 🛡️ **Pengendalian Ralat Tahan Lasak** | Tangani isu rangkaian, kebenaran dan laluan | Kebolehpercayaan sedia produksi |

---

## 📖 Pelaksanaan Langkah Demi Langkah

### Langkah 1: Cipta Agen GitHub dalam Pembina Agen

1. **Lancarkan Pembina Agen** melalui peluasan Microsoft Foundry Toolkit
2. **Cipta agen baru** dengan konfigurasi berikut:
   ```
   Agent Name: GitHubAgent
   ```

3. **Mulakan pelayan MCP custom:**
   - Navigasi ke **Alat** → **Tambah Alat** → **Pelayan MCP**
   - Pilih **"Cipta Pelayan MCP baru"**
   - Pilih **templat Python** untuk fleksibiliti maksimum
   - **Nama Pelayan:** `git_mcp_server`

### Langkah 2: Konfigurasi Mod Agen GitHub Copilot

1. **Buka GitHub Copilot** dalam VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Pilih Model Agen** dalam antaramuka Copilot
3. **Pilih model Claude 3.7** untuk kemampuan penaakulan dipertingkat
4. **Aktifkan integrasi MCP** untuk akses alat

> **💡 Petua Pro:** Claude 3.7 memberikan pemahaman unggul tentang aliran kerja pembangunan dan corak pengendalian ralat.

### Langkah 3: Laksanakan Fungsi Teras Pelayan MCP

**Gunakan arahan terperinci berikut dengan Mod Agen GitHub Copilot:**

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

### Langkah 4: Uji Pelayan MCP Anda

#### 4a. Ujian dalam Pembina Agen

1. **Lancarkan konfigurasi debug** untuk Pembina Agen
2. **Konfigurasikan agen anda dengan arahan sistem ini:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Uji dengan senario pengguna realistik:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/ms/DebugAgent.81d152370c503241.webp)

**Hasil Dijangka:**
- ✅ Pengklonan berjaya dengan pengesahan laluan
- ✅ Pelancaran VS Code automatik
- ✅ Mesej ralat jelas untuk senario tidak sah
- ✅ Pengendalian kes tepi dengan betul

#### 4b. Ujian dalam Pemeriksa MCP


![MCP Inspector Testing](../../../../translated_images/ms/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Tahniah!** Anda telah berjaya mencipta pelayan MCP praktikal, sedia produksi yang menyelesaikan cabaran aliran kerja pembangunan sebenar. Pelayan klon GitHub custom anda membuktikan kuasa MCP untuk mengautomasikan dan meningkatkan produktiviti pembangun.

### 🏆 Pencapaian Dibuka:
- ✅ **Pembangun MCP** - Mencipta pelayan MCP custom
- ✅ **Pengautomasian Aliran Kerja** - Memperkemas proses pembangunan  
- ✅ **Pakar Integrasi** - Menghubungkan pelbagai alat pembangunan
- ✅ **Sedia Produksi** - Membina penyelesaian boleh dikerahkan

---

## 🎓 Penyempurnaan Bengkel: Perjalanan Anda dengan Protokol Konteks Model

**Peserta Bengkel yang dihormati,**

Tahniah kerana telah menyelesaikan semua empat modul bengkel Protokol Konteks Model! Anda telah melangkah jauh dari memahami konsep asas Microsoft Foundry Toolkit kepada membina pelayan MCP sedia produksi yang menyelesaikan cabaran pembangunan dunia sebenar.

### 🚀 Rumusan Laluan Pembelajaran Anda:

**[Modul 1](../lab1/README.md)**: Anda bermula dengan meneroka asas Microsoft Foundry Toolkit, ujian model, dan mencipta agen AI pertama anda.

**[Modul 2](../lab2/README.md)**: Anda mempelajari seni bina MCP, mengintegrasikan Playwright MCP, dan membina agen automasi pelayar pertama anda.

**[Modul 3](../lab3/README.md)**: Anda maju ke pembangunan pelayan MCP custom dengan pelayan Weather MCP dan menguasai alat debugging.

**[Modul 4](../lab4/README.md)**: Kini anda telah menggunakan semua untuk mencipta alat automasi aliran kerja repositori GitHub praktikal.

### 🌟 Apa Yang Anda Kuasai:

- ✅ **Ekosistem Microsoft Foundry Toolkit**: Model, agen, dan corak integrasi
- ✅ **Seni Bina MCP**: Reka bentuk klien-pelayan, protokol pengangkutan, dan keselamatan
- ✅ **Alat Pembangun**: Dari Playground ke Pemeriksa ke penerapan produksi
- ✅ **Pembangunan Custom**: Membina, menguji, dan menerapkan pelayan MCP anda sendiri
- ✅ **Aplikasi Praktikal**: Menyelesaikan cabaran aliran kerja dunia sebenar dengan AI

### 🔮 Langkah Seterusnya Anda:

1. **Bina Pelayan MCP Anda Sendiri**: Gunakan kemahiran ini untuk mengautomasikan aliran kerja unik anda
2. **Sertai Komuniti MCP**: Kongsi ciptaan anda dan belajar daripada yang lain
3. **Terokai Integrasi Lanjutan**: Sambungkan pelayan MCP ke sistem perusahaan
4. **Sumbang kepada Sumber Terbuka**: Bantu meningkatkan alat dan dokumentasi MCP

Ingat, bengkel ini hanyalah permulaan. Ekosistem Protokol Konteks Model berkembang pesat, dan anda kini bersedia berada di barisan hadapan alat pembangunan berkuasa AI.

**Terima kasih atas penyertaan dan dedikasi anda untuk belajar!**

Kami berharap bengkel ini telah mencetuskan idea yang akan mengubah cara anda membina dan berinteraksi dengan alat AI dalam perjalanan pembangunan anda.

**Selamat mengekod!**

---

## Apa Seterusnya

Tahniah kerana telah menyelesaikan semua makmal dalam Modul 10!

- Kembali ke: [Gambaran Modul 10](../README.md)
- Teruskan ke: [Modul 11: Makmal Praktikal Pelayan MCP](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->