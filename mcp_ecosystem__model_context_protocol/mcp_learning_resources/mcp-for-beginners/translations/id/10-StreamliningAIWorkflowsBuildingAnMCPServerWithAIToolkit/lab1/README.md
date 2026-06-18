# 🚀 Modul 1: Dasar-dasar Microsoft Foundry Toolkit

[![Durasi](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Kesulitan](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prasyarat](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Tujuan Pembelajaran

Pada akhir modul ini, Anda akan dapat:
- ✅ Menginstal dan mengonfigurasi Ekstensi Microsoft Foundry Toolkit untuk VS Code
- ✅ Menavigasi Katalog Model dan memahami berbagai sumber model
- ✅ Menggunakan Playground untuk pengujian dan eksperimen model
- ✅ Membuat agen AI kustom menggunakan Agent Builder
- ✅ Membandingkan kinerja model dari berbagai penyedia
- ✅ Menerapkan praktik terbaik untuk rekayasa prompt

## 🧠 Pengantar Microsoft Foundry Toolkit

**Ekstensi Microsoft Foundry Toolkit untuk VS Code** adalah ekstensi utama Microsoft yang mengubah VS Code menjadi lingkungan pengembangan AI yang komprehensif. Ini menjembatani kesenjangan antara riset AI dan pengembangan aplikasi praktis, membuat AI generatif dapat diakses oleh pengembang dari semua tingkat keahlian.

### 🌟 Kapabilitas Utama

| Fitur | Deskripsi | Kasus Penggunaan |
|---------|-------------|----------|
| **🗂️ Katalog Model** | Akses 100+ model dari GitHub, ONNX, OpenAI, Anthropic, Google | Penemuan dan pemilihan model |
| **🔌 Dukungan BYOM** | Integrasikan model Anda sendiri (lokal/jauh) | Penerapan model kustom |
| **🎮 Playground Interaktif** | Pengujian model waktu nyata dengan antarmuka chat | Prototipe cepat dan pengujian |
| **📎 Dukungan Multi-Modal** | Menangani teks, gambar, dan lampiran | Aplikasi AI kompleks |
| **⚡ Proses Batch** | Menjalankan beberapa prompt secara bersamaan | Alur kerja pengujian efisien |
| **📊 Evaluasi Model** | Metrik bawaan (F1, relevansi, kesamaan, koherensi) | Penilaian kinerja |

### 🎯 Mengapa Microsoft Foundry Toolkit Penting

- **🚀 Percepatan Pengembangan**: Dari ide ke prototipe dalam hitungan menit
- **🔄 Alur Kerja Terpadu**: Satu antarmuka untuk berbagai penyedia AI
- **🧪 Eksperimen Mudah**: Membandingkan model tanpa pengaturan rumit
- **📈 Siap Produksi**: Transisi mulus dari prototipe ke penerapan

## 🛠️ Prasyarat & Pengaturan

### 📦 Instal Ekstensi Microsoft Foundry Toolkit

**Langkah 1: Akses Marketplace Ekstensi**
1. Buka Visual Studio Code
2. Buka tampilan Ekstensi (`Ctrl+Shift+X` atau `Cmd+Shift+X`)
3. Cari "Microsoft Foundry Toolkit"

**Langkah 2: Pilih Versi Anda**
- **🟢 Rilis**: Direkomendasikan untuk penggunaan produksi
- **🔶 Prarilis**: Akses awal ke fitur terbaru

**Langkah 3: Instal dan Aktifkan**

![Ekstensi Microsoft Foundry Toolkit](../../../../translated_images/id/aitkext.d28945a03eed003c.webp)

### ✅ Daftar Periksa Verifikasi
- [ ] Ikon Microsoft Foundry Toolkit muncul di sidebar VS Code
- [ ] Ekstensi diaktifkan dan aktif
- [ ] Tidak ada kesalahan instalasi di panel output

## 🧪 Latihan Praktik 1: Menjelajah Model GitHub

**🎯 Tujuan**: Menguasai Katalog Model dan menguji model AI pertama Anda

### 📊 Langkah 1: Menavigasi Katalog Model

Katalog Model adalah pintu gerbang Anda ke ekosistem AI. Ini menggabungkan model dari berbagai penyedia, memudahkan penemuan dan perbandingan opsi.

**🔍 Panduan Navigasi:**

Klik **MODELS - Catalog** di sidebar Microsoft Foundry Toolkit

![Katalog Model](../../../../translated_images/id/aimodel.263ed2be013d8fb0.webp)

**💡 Tips Profesional**: Cari model dengan kemampuan spesifik yang sesuai dengan kasus penggunaan Anda (misal, pembuatan kode, penulisan kreatif, analisis).

**⚠️ Catatan**: Model yang dihosting di GitHub (yaitu Model GitHub) gratis digunakan tetapi memiliki batasan jumlah permintaan dan token. Jika Anda ingin mengakses model non-GitHub (yaitu model eksternal yang dihosting melalui Azure AI atau endpoint lain), Anda harus menyediakan kunci API atau otentikasi yang sesuai.

### 🚀 Langkah 2: Tambahkan dan Konfigurasikan Model Pertama Anda

**Strategi Pemilihan Model:**
- **GPT-4.1**: Terbaik untuk penalaran dan analisis kompleks
- **Phi-4-mini**: Ringan, respons cepat untuk tugas sederhana

**🔧 Proses Konfigurasi:**
1. Pilih **OpenAI GPT-4.1** dari katalog
2. Klik **Add to My Models** - ini mendaftarkan model untuk digunakan
3. Pilih **Try in Playground** untuk membuka lingkungan pengujian
4. Tunggu inisialisasi model (pengaturan pertama kali mungkin butuh waktu)

![Pengaturan Playground](../../../../translated_images/id/playground.dd6f5141344878ca.webp)

**⚙️ Memahami Parameter Model:**
- **Temperature**: Mengontrol kreativitas (0 = deterministik, 1 = kreatif)
- **Max Tokens**: Panjang jawaban maksimum
- **Top-p**: Sampel nucleus untuk keberagaman jawaban

### 🎯 Langkah 3: Kuasai Antarmuka Playground

Playground adalah laboratorium eksperimen AI Anda. Berikut cara memaksimalkan potensinya:

**🎨 Praktik Terbaik Rekayasa Prompt:**
1. **Jelas dan Spesifik**: Instruksi jelas dan detail menghasilkan hasil lebih baik
2. **Berikan Konteks**: Sertakan informasi latar yang relevan
3. **Gunakan Contoh**: Tunjukkan model apa yang Anda inginkan dengan contoh
4. **Iterasi**: Perbaiki prompt berdasarkan hasil awal

**🧪 Skenario Pengujian:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Hasil Pengujian](../../../../translated_images/id/result.1dfcf211fb359cf6.webp)

### 🏆 Latihan Tantangan: Perbandingan Kinerja Model

**🎯 Tujuan**: Membandingkan berbagai model menggunakan prompt identik untuk memahami keunggulan mereka

**📋 Instruksi:**
1. Tambahkan **Phi-4-mini** ke ruang kerja Anda
2. Gunakan prompt yang sama untuk GPT-4.1 dan Phi-4-mini

![set](../../../../translated_images/id/set.88132df189ecde2c.webp)

3. Bandingkan kualitas respons, kecepatan, dan akurasi
4. Dokumentasikan temuan Anda di bagian hasil

![Perbandingan Model](../../../../translated_images/id/compare.97746cd0f9074955.webp)

**💡 Wawasan Utama untuk Ditemukan:**
- Kapan menggunakan LLM vs SLM
- Perbandingan biaya vs kinerja
- Kapabilitas khusus model berbeda

## 🤖 Latihan Praktik 2: Membangun Agen Kustom dengan Agent Builder

**🎯 Tujuan**: Membuat agen AI khusus yang dirancang untuk tugas dan alur kerja tertentu

### 🏗️ Langkah 1: Memahami Agent Builder

Agent Builder adalah tempat Microsoft Foundry Toolkit benar-benar bersinar. Ini memungkinkan Anda membuat asisten AI khusus yang menggabungkan kekuatan model bahasa besar dengan instruksi kustom, parameter spesifik, dan pengetahuan khusus.

**🧠 Komponen Arsitektur Agen:**
- **Model Inti**: LLM dasar (GPT-4, Groks, Phi, dll.)
- **System Prompt**: Mendefinisikan kepribadian dan perilaku agen
- **Parameter**: Pengaturan halus untuk kinerja optimal
- **Integrasi Alat**: Terhubung ke API eksternal dan layanan MCP
- **Memori**: Konteks percakapan dan persistensi sesi

![Antarmuka Agent Builder](../../../../translated_images/id/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Langkah 2: Pendalaman Konfigurasi Agen

**🎨 Membuat System Prompt yang Efektif:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Tentunya, Anda juga bisa menggunakan Generate System Prompt untuk menggunakan AI membantu Anda membuat dan mengoptimalkan prompt*

**🔧 Optimasi Parameter:**
| Parameter | Rentang yang Direkomendasikan | Kasus Penggunaan |
|-----------|------------------------------|------------------|
| **Temperature** | 0.1-0.3 | Respons teknis/faktual |
| **Temperature** | 0.7-0.9 | Tugas kreatif/brainstorming |
| **Max Tokens** | 500-1000 | Jawaban singkat |
| **Max Tokens** | 2000-4000 | Penjelasan detail |

### 🐍 Langkah 3: Latihan Praktis - Agen Pemrograman Python

**🎯 Misi**: Buat asisten coding Python yang khusus

**📋 Langkah Konfigurasi:**

1. **Pemilihan Model**: Pilih **Claude 3.5 Sonnet** (sangat baik untuk kode)

2. **Desain System Prompt**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Konfigurasi Parameter**:
   - Temperature: 0.2 (untuk kode yang konsisten dan dapat diandalkan)
   - Max Tokens: 2000 (penjelasan detail)
   - Top-p: 0.9 (kreativitas seimbang)

![Konfigurasi Agen Python](../../../../translated_images/id/pythonagent.5e51b406401c165f.webp)

### 🧪 Langkah 4: Menguji Agen Python Anda

**Skenario Pengujian:**
1. **Fungsi Dasar**: "Buat fungsi untuk mencari bilangan prima"
2. **Algoritma Kompleks**: "Implementasi pohon pencarian biner dengan metode insert, delete, dan search"
3. **Masalah Dunia Nyata**: "Bangun web scraper yang menangani pembatasan rate dan pengulangan"
4. **Debugging**: "Perbaiki kode ini [tempel kode bermasalah]"

**🏆 Kriteria Sukses:**
- ✅ Kode berjalan tanpa error
- ✅ Termasuk dokumentasi yang tepat
- ✅ Mengikuti praktik terbaik Python
- ✅ Memberikan penjelasan jelas
- ✅ Menyarankan perbaikan

## 🎓 Penutup Modul 1 & Langkah Berikutnya

### 📊 Pemeriksaan Pengetahuan

Uji pemahaman Anda:
- [ ] Bisakah Anda menjelaskan perbedaan model dalam katalog?
- [ ] Apakah Anda telah berhasil membuat dan menguji agen kustom?
- [ ] Apakah Anda mengerti cara mengoptimalkan parameter untuk berbagai kasus penggunaan?
- [ ] Bisakah Anda merancang system prompt yang efektif?

### 📚 Sumber Tambahan

- **Dokumentasi Microsoft Foundry Toolkit**: [Dokumen Resmi Microsoft](https://github.com/microsoft/vscode-ai-toolkit)
- **Panduan Rekayasa Prompt**: [Praktik Terbaik](https://platform.openai.com/docs/guides/prompt-engineering)
- **Model di Microsoft Foundry Toolkit**: [Model dalam Pengembangan](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Selamat!** Anda telah menguasai dasar-dasar Microsoft Foundry Toolkit dan siap membangun aplikasi AI yang lebih canggih!

### 🔜 Lanjut ke Modul Berikutnya

Siap untuk kapabilitas yang lebih maju? Lanjutkan ke **[Modul 2: MCP dengan Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** di mana Anda akan mempelajari cara:
- Menghubungkan agen Anda ke alat eksternal menggunakan Model Context Protocol (MCP)
- Membangun agen otomasi browser dengan Playwright
- Mengintegrasikan server MCP dengan agen Microsoft Foundry Toolkit Anda
- Memperkuat agen Anda dengan data dan kapabilitas eksternal

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->