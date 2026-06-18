# 🚀 Modul 1: Asas Microsoft Foundry Toolkit

[![Durasi](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Kesukaran](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prasyarat](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Objektif Pembelajaran

Menjelang akhir modul ini, anda akan dapat:
- ✅ Pasang dan konfigurasikan Sambungan Microsoft Foundry Toolkit untuk VS Code
- ✅ Navigasi Katalog Model dan fahami pelbagai sumber model
- ✅ Gunakan Playground untuk ujian model dan eksperimen
- ✅ Cipta ejen AI tersuai menggunakan Agent Builder
- ✅ Bandingkan prestasi model antara penyedia berbeza
- ✅ Gunakan amalan terbaik untuk kejuruteraan prompt

## 🧠 Pengenalan kepada Microsoft Foundry Toolkit

**Sambungan Microsoft Foundry Toolkit untuk VS Code** adalah sambungan utama Microsoft yang mengubah VS Code menjadi persekitaran pembangunan AI yang menyeluruh. Ia merapatkan jurang antara penyelidikan AI dan pembangunan aplikasi praktikal, menjadikan AI generatif mudah dicapai oleh pembangun pada semua tahap kemahiran.

### 🌟 Keupayaan Utama

| Ciri | Penerangan | Kes Penggunaan |
|---------|-------------|----------|
| **🗂️ Katalog Model** | Akses 100+ model dari GitHub, ONNX, OpenAI, Anthropic, Google | Penemuan dan pemilihan model |
| **🔌 Sokongan BYOM** | Integrasi model anda sendiri (tempatan/jauh) | Penyebaran model tersuai |
| **🎮 Playground Interaktif** | Ujian model masa nyata dengan antara muka sembang | Prototip cepat dan ujian |
| **📎 Sokongan Pelbagai Mod** | Mengendalikan teks, imej, dan lampiran | Aplikasi AI kompleks |
| **⚡ Pemprosesan Berkumpulan** | Jalankan pelbagai prompt serentak | Aliran kerja ujian berkesan |
| **📊 Penilaian Model** | Metrik terbina dalam (F1, kepentingan, kesamaan, koheren) | Penilaian prestasi |

### 🎯 Mengapa Microsoft Foundry Toolkit Penting

- **🚀 Pembangunan Dipercepatkan**: Dari idea ke prototaip dalam beberapa minit
- **🔄 Aliran Kerja Bersepadu**: Satu antara muka untuk pelbagai penyedia AI
- **🧪 Eksperimen Mudah**: Bandingkan model tanpa persediaan rumit
- **📈 Sedia Untuk Pengeluaran**: Peralihan lancar dari prototaip ke penyebaran

## 🛠️ Prasyarat & Persediaan

### 📦 Pasang Sambungan Microsoft Foundry Toolkit

**Langkah 1: Akses Pasar Sambungan**
1. Buka Visual Studio Code
2. Navigasi ke paparan Sambungan (`Ctrl+Shift+X` atau `Cmd+Shift+X`)
3. Cari "Microsoft Foundry Toolkit"

**Langkah 2: Pilih Versi Anda**
- **🟢 Versi Stabil**: Disyorkan untuk penggunaan pengeluaran
- **🔶 Pra-rilisan**: Akses awal untuk ciri termaju

**Langkah 3: Pasang dan Aktifkan**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/ms/aitkext.d28945a03eed003c.webp)

### ✅ Senarai Semak Pengesahan
- [ ] Ikon Microsoft Foundry Toolkit muncul di bar sisi VS Code
- [ ] Sambungan diaktifkan dan berfungsi
- [ ] Tiada ralat pemasangan dalam panel output

## 🧪 Latihan Praktikal 1: Meneroka Model GitHub

**🎯 Objektif**: Kuasai Katalog Model dan uji model AI pertama anda

### 📊 Langkah 1: Navigasi Katalog Model

Katalog Model adalah pintu masuk anda ke ekosistem AI. Ia mengumpulkan model dari pelbagai penyedia, memudahkan penemuan dan perbandingan pilihan.

**🔍 Panduan Navigasi:**

Klik pada **MODELS - Catalog** di bar sisi Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/ms/aimodel.263ed2be013d8fb0.webp)

**💡 Petua Pakar**: Cari model dengan keupayaan spesifik yang sesuai dengan kes penggunaan anda (contoh, penjanaan kod, penulisan kreatif, analisis).

**⚠️ Nota**: Model-hosted GitHub (iaitu Model GitHub) adalah percuma untuk digunakan tetapi tertakluk kepada had kadar permintaan dan token. Jika anda mahu akses model bukan GitHub (iaitu model luaran yang dihoskan melalui Azure AI atau titik akhir lain), anda perlu menyediakan kunci API atau pengesahan yang sesuai.

### 🚀 Langkah 2: Tambah dan Konfigurasikan Model Pertama Anda

**Strategi Pemilihan Model:**
- **GPT-4.1**: Terbaik untuk pemikiran kompleks dan analisis
- **Phi-4-mini**: Ringan, pantas untuk tugasan mudah

**🔧 Proses Konfigurasi:**
1. Pilih **OpenAI GPT-4.1** dari katalog
2. Klik **Add to My Models** - ini mendaftar model untuk kegunaan
3. Pilih **Try in Playground** untuk melancarkan persekitaran ujian
4. Tunggu inisialisasi model (persediaan kali pertama mungkin mengambil masa)

![Playground Setup](../../../../translated_images/ms/playground.dd6f5141344878ca.webp)

**⚙️ Memahami Parameter Model:**
- **Temperature**: Kawal tahap kreativiti (0 = deterministik, 1 = kreatif)
- **Max Tokens**: Panjang maksimum jawapan
- **Top-p**: Pensampelan nukleus untuk kepelbagaian jawapan

### 🎯 Langkah 3: Kuasai Antara Muka Playground

Playground adalah makmal eksperimen AI anda. Berikut cara memaksimumkan potensinya:

**🎨 Amalan Terbaik Kejuruteraan Prompt:**
1. **Spesifik**: Arahan jelas dan terperinci memberikan hasil lebih baik
2. **Sertakan Konteks**: Masukkan maklumat latar belakang yang relevan
3. **Gunakan Contoh**: Tunjukkan model apa yang anda mahu dengan contoh
4. **Ulang**: Perbaiki prompt berdasarkan keputusan awal

**🧪 Senario Pengujian:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/ms/result.1dfcf211fb359cf6.webp)

### 🏆 Latihan Cabaran: Perbandingan Prestasi Model

**🎯 Matlamat**: Bandingkan pelbagai model menggunakan prompt sama untuk memahami kekuatan mereka

**📋 Arahan:**
1. Tambah **Phi-4-mini** ke ruang kerja anda
2. Gunakan prompt yang sama bagi GPT-4.1 dan Phi-4-mini

![set](../../../../translated_images/ms/set.88132df189ecde2c.webp)

3. Bandingkan kualiti jawapan, kelajuan, dan ketepatan
4. Dokumenkan penemuan anda dalam bahagian keputusan

![Model Comparison](../../../../translated_images/ms/compare.97746cd0f9074955.webp)

**💡 Wawasan Utama untuk Dikenal Pasti:**
- Bila menggunakan LLM vs SLM
- Perbandingan kos dan prestasi
- Keupayaan khusus model berbeza

## 🤖 Latihan Praktikal 2: Membina Ejen Tersuai dengan Agent Builder

**🎯 Objektif**: Cipta ejen AI khusus yang disesuaikan untuk tugasan dan aliran kerja spesifik

### 🏗️ Langkah 1: Memahami Agent Builder

Agent Builder adalah tempat Microsoft Foundry Toolkit benar-benar menonjol. Ia membolehkan anda mencipta pembantu AI tujuan khusus yang menggabungkan kuasa model bahasa besar dengan arahan tersuai, parameter khusus, dan pengetahuan pakar.

**🧠 Komponen Seni Bina Ejen:**
- **Model Teras**: LLM asas (GPT-4, Groks, Phi, dll)
- **System Prompt**: Menentukan personaliti dan tingkah laku ejen
- **Parameter**: Tetapan halus untuk prestasi optimum
- **Integrasi Alat**: Sambungkan ke API luaran dan perkhidmatan MCP
- **Memori**: Konteks perbualan dan pengekalan sesi

![Agent Builder Interface](../../../../translated_images/ms/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Langkah 2: Mendalami Konfigurasi Ejen

**🎨 Mencipta System Prompt Berkesan:**
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

*Sudah tentu, anda juga boleh gunakan Generate System Prompt untuk membolehkan AI membantu anda menghasilkan dan mengoptimumkan prompt*

**🔧 Pengoptimuman Parameter:**
| Parameter | Julat Disyorkan | Kes Penggunaan |
|-----------|-----------------|----------------|
| **Temperature** | 0.1-0.3 | Jawapan teknikal/faktual |
| **Temperature** | 0.7-0.9 | Tugasan kreatif/sesi brainstorm |
| **Max Tokens** | 500-1000 | Jawapan ringkas |
| **Max Tokens** | 2000-4000 | Penerangan terperinci |

### 🐍 Langkah 3: Latihan Praktikal - Ejen Pengaturcaraan Python

**🎯 Misi**: Cipta pembantu pengaturcaraan Python khusus

**📋 Langkah Konfigurasi:**

1. **Pemilihan Model**: Pilih **Claude 3.5 Sonnet** (terbaik untuk kod)

2. **Reka Bentuk System Prompt**:
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
   - Temperature: 0.2 (untuk kod yang konsisten dan boleh dipercayai)
   - Max Tokens: 2000 (penerangan terperinci)
   - Top-p: 0.9 (kreativiti seimbang)

![Python Agent Configuration](../../../../translated_images/ms/pythonagent.5e51b406401c165f.webp)

### 🧪 Langkah 4: Uji Ejen Python Anda

**Senario Ujian:**
1. **Fungsi Asas**: "Cipta fungsi untuk mencari nombor perdana"
2. **Algoritma Kompleks**: "Laksanakan pokok carian binari dengan kaedah insert, delete, dan search"
3. **Masalah Dunia Nyata**: "Bina web scraper yang mengendalikan had kadar dan cuba semula"
4. **Penggubalan**: "Betulkan kod ini [tampal kod bermasalah]"

**🏆 Kriteria Kejayaan:**
- ✅ Kod berjalan tanpa ralat
- ✅ Termasuk dokumentasi yang sesuai
- ✅ Mengikuti amalan terbaik Python
- ✅ Memberi penerangan jelas
- ✅ Mencadangkan penambahbaikan

## 🎓 Penutup Modul 1 & Langkah Seterusnya

### 📊 Pemeriksaan Pengetahuan

Uji pemahaman anda:
- [ ] Bolehkah anda menjelaskan perbezaan antara model dalam katalog?
- [ ] Adakah anda berjaya mencipta dan menguji ejen tersuai?
- [ ] Fahamkah anda cara mengoptimumkan parameter untuk pelbagai kes penggunaan?
- [ ] Bolehkah anda mereka bentuk prompt sistem berkesan?

### 📚 Sumber Tambahan

- **Dokumentasi Microsoft Foundry Toolkit**: [Dokumen Rasmi Microsoft](https://github.com/microsoft/vscode-ai-toolkit)
- **Panduan Kejuruteraan Prompt**: [Amalan Terbaik](https://platform.openai.com/docs/guides/prompt-engineering)
- **Model dalam Microsoft Foundry Toolkit**: [Model dalam Pembangunan](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Tahniah!** Anda telah menguasai asas Microsoft Foundry Toolkit dan bersedia membina aplikasi AI lebih maju!

### 🔜 Teruskan ke Modul Seterusnya

Bersedia untuk keupayaan lebih maju? Teruskan ke **[Modul 2: MCP dengan Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** di mana anda akan belajar:
- Sambungkan ejen anda kepada alat luaran menggunakan Model Context Protocol (MCP)
- Bina ejen automasi penyemak imbas dengan Playwright
- Integrasi pelayan MCP dengan ejen Microsoft Foundry Toolkit anda
- Perkasakan ejen anda dengan data dan keupayaan luaran

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->