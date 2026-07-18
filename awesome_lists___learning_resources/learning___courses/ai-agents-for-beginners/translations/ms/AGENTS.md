# AGENTS.md

## Gambaran Projek

Repositori ini mengandungi "Ejen AI untuk Pemula" - satu kursus pendidikan komprehensif yang mengajar segala yang diperlukan untuk membina Ejen AI. Kursus ini terdiri daripada 18 pelajaran (bernombor 00-18) yang merangkumi asas, corak reka bentuk, rangka kerja, pelaksanaan pengeluaran, ejen setempat/pada peranti, dan keselamatan ejen AI.

**Teknologi Utama:**
- Python 3.12+
- Jupyter Notebooks untuk pembelajaran interaktif
- Rangka Kerja AI: Microsoft Agent Framework (MAF)
- Perkhidmatan AI Azure: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Senibina:**
- Struktur berasaskan pelajaran (direktori 00-15+)
- Setiap pelajaran mengandungi: dokumentasi README, contoh kod (Jupyter notebooks), dan imej
- Sokongan pelbagai bahasa melalui sistem terjemahan automatik
- Satu notebook Python setiap pelajaran menggunakan Microsoft Agent Framework

## Arahan Persediaan

### Prasyarat
- Python 3.12 atau lebih tinggi
- Langganan Azure (untuk Microsoft Foundry)
- Azure CLI dipasang dan diautentikasi (`az login`)

### Persediaan Awal

1. **Clone atau fork repositori:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # ATAU
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Buat dan aktifkan persekitaran maya Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Pada Windows: venv\Scripts\activate
   ```

3. **Pasang kebergantungan:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Tetapkan pemboleh ubah persekitaran:**
   ```bash
   cp .env.example .env
   # Sunting .env dengan kunci API dan titik hujung anda
   ```

### Pemboleh Ubah Persekitaran Diperlukan

Untuk **Microsoft Foundry** (Diperlukan):
- `AZURE_AI_PROJECT_ENDPOINT` - titik hujung projek Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - nama penyebaran model (contoh, gpt-4.1-mini)

Untuk **Azure AI Search** (Pelajaran 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - titik hujung Azure AI Search
- `AZURE_SEARCH_API_KEY` - kunci API Azure AI Search

Pengesahan: Jalankan `az login` sebelum menjalankan notebook (menggunakan `AzureCliCredential`).

## Aliran Kerja Pembangunan

### Menjalankan Jupyter Notebooks

Setiap pelajaran mengandungi pelbagai Jupyter notebook untuk rangka kerja berbeza:

1. **Mula Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Navigasi ke direktori pelajaran** (contoh, `01-intro-to-ai-agents/code_samples/`)

3. **Buka dan jalankan notebook:**
   - `*-python-agent-framework.ipynb` - Menggunakan Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Menggunakan Microsoft Agent Framework (.NET)

### Bekerja dengan Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Memerlukan langganan Azure
- Menggunakan `FoundryChatClient` untuk Agent Service V2 (ejen nampak dalam portal Foundry)
- Sedia untuk pengeluaran dengan keterlihatan terbina dalam
- Pola fail: `*-python-agent-framework.ipynb`

## Arahan Ujian

Ini adalah repositori pendidikan dengan contoh kod dan bukan kod pengeluaran dengan ujian automatik. Untuk mengesahkan persediaan dan perubahan anda:

### Ujian Manual

1. **Uji persekitaran Python:**
   ```bash
   python --version  # Perlu 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Uji pelaksanaan notebook:**
   ```bash
   # Tukar buku nota kepada skrip dan jalankan (mengujian import)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Sahkan pemboleh ubah persekitaran:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Menjalankan Notebook Individu

Buka notebook dalam Jupyter dan jalankan sel secara berurutan. Setiap notebook berdikari dan merangkumi:
- Pernyataan import
- Memuat konfigurasi
- Implementasi contoh agen
- Output yang dijangka dalam sel markdown

### Ujian Asas Ejen Terpasang

Untuk pelajaran di mana agen dipasang sebagai agen hos Microsoft Foundry (01, 04, 05, 16), repo menyediakan katalog ujian asap di bawah `tests/` yang dijalankan oleh aliran kerja `.github/workflows/smoke-test.yml` melalui tindakan [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test). Ini adalah gerbang selepas-pelaksanaan ringan (adakah agen boleh dicapai dan mengikuti jangkaan arahan asas?), melengkapkan saluran penilaian dalam Pelajaran 10 dan 16. Lihat [tests/README.md](./tests/README.md) untuk pemetaan katalog-ke-pelajaran-ke-agen. Pelajaran 17 dijalankan secara tempatan dengan Foundry Local dan tidak mempunyai titik hujung hos, jadi ia disahkan dengan menjalankan notebooknya secara langsung.

## Gaya Kod

### Konvensyen Python

- **Versi Python**: 3.12+
- **Gaya Kod**: Ikuti konvensyen Python PEP 8 standard
- **Notebook**: Gunakan sel markdown yang jelas untuk menerangkan konsep
- **Import**: Kumpul mengikut perpustakaan standard, pihak ketiga, import tempatan

### Konvensyen Jupyter Notebook

- Sertakan sel markdown penerangan sebelum sel kod
- Tambah contoh output dalam notebook sebagai rujukan
- Gunakan nama pemboleh ubah yang jelas yang sepadan dengan konsep pelajaran
- Kekalkan urutan pelaksanaan notebook secara linear (sel 1 → 2 → 3...)

### Pengurusan Fail

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Binaan dan Pelaksanaan

### Membina Dokumentasi

Repositori ini menggunakan Markdown untuk dokumentasi:
- Fail README.md dalam setiap folder pelajaran
- README.md utama di akar repositori
- Sistem terjemahan automatik melalui GitHub Actions

### Saluran CI/CD

Terletak dalam `.github/workflows/`:

1. **co-op-translator.yml** - Terjemahan automatik ke 50+ bahasa
2. **welcome-issue.yml** - Menyambut pencipta isu baru
3. **welcome-pr.yml** - Menyambut penyumbang pull request baru

### Pelaksanaan

Ini adalah repositori pendidikan - tiada proses pelaksanaan. Pengguna:
1. Fork atau clone repositori
2. Jalankan notebook secara tempatan atau dalam GitHub Codespaces
3. Belajar dengan mengubah suai dan mencuba contoh

## Garis Panduan Pull Request

### Sebelum Menghantar

1. **Uji perubahan anda:**
   - Jalankan notebook yang terjejas sepenuhnya
   - Sahkan semua sel dilaksanakan tanpa ralat
   - Periksa output yang sesuai

2. **Kemas kini dokumentasi:**
   - Kemas kini README.md jika menambah konsep baru
   - Tambah komen dalam notebook untuk kod kompleks
   - Pastikan sel markdown menerangkan tujuan

3. **Perubahan fail:**
   - Elakkan komit fail `.env` (guna `.env.example`)
   - Jangan komit direktori `venv/` atau `__pycache__/`
   - Simpan output notebook jika ia menerangkan konsep
   - Buang fail sementara dan backup notebook (`*-backup.ipynb`)

### Format Tajuk PR

Gunakan tajuk yang jelas:
- `[Lesson-XX] Tambah contoh baru untuk <konsep>`
- `[Fix] Betulkan kesilapan ejaan dalam README pelajaran-XX`
- `[Update] Perbaiki contoh kod dalam pelajaran-XX`
- `[Docs] Kemas kini arahan persediaan`

### Semakan Diperlukan

- Notebook harus dijalankan tanpa ralat
- Fail README harus jelas dan tepat
- Ikuti corak kod sedia ada dalam repositori
- Kekalkan konsistensi dengan pelajaran lain

## Nota Tambahan

### Kesilapan Umum

1. **Versi Python tidak sepadan:**
   - Pastikan Python 3.12+ digunakan
   - Beberapa pakej mungkin tidak berfungsi dengan versi lama
   - Gunakan `python3 -m venv` untuk spesifikasikan versi Python secara eksplisit

2. **Pemboleh ubah persekitaran:**
   - Sentiasa buat `.env` dari `.env.example`
   - Jangan komit fail `.env` (ia di dalam `.gitignore`)
   - Log masuk dengan `az login` untuk pengesahan Entra ID tanpa kunci

3. **Konflik pakej:**
   - Gunakan persekitaran maya baru
   - Pasang dari `requirements.txt` dan bukannya pakej individu
   - Sesetengah notebook mungkin memerlukan pakej tambahan yang dinyatakan dalam sel markdown mereka

4. **Perkhidmatan Azure:**
   - Perkhidmatan Azure AI memerlukan langganan aktif
   - Beberapa ciri adalah khusus kepada wilayah
   - Pastikan penyebaran model Azure OpenAI anda menyokong Responses API

### Laluan Pembelajaran

Cadangan susunan pelajaran:
1. **00-course-setup** - Mulakan di sini untuk persediaan persekitaran
2. **01-intro-to-ai-agents** - Fahami asas ejen AI
3. **02-explore-agentic-frameworks** - Pelajari tentang rangka kerja berbeza
4. **03-agentic-design-patterns** - Corak reka bentuk teras
5. Teruskan dengan pelajaran bernombor secara berurutan

### Pemilihan Rangka Kerja

Pilih rangka kerja berdasarkan matlamat anda:
- **Semua pelajaran**: Microsoft Agent Framework (MAF) dengan `FoundryChatClient`
- **Ejen didaftar pelayan** dalam Microsoft Foundry Agent Service V2 dan boleh dilihat dalam portal Foundry

### Mendapatkan Bantuan

- Sertai [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Semak fail README pelajaran untuk panduan khusus
- Rujuk [README.md](./README.md) utama untuk gambaran kursus
- Rujuk [Persediaan Kursus](./00-course-setup/README.md) untuk arahan terperinci

### Menyumbang

Ini adalah projek pendidikan terbuka. Sumbangan dialu-alukan:
- Perbaiki contoh kod
- Betulkan kesilapan ejaan atau ralat
- Tambah komen penjelasan
- Cadangkan topik pelajaran baru
- Terjemah ke bahasa tambahan

Lihat [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) untuk keperluan semasa.

## Konteks Khusus Projek

### Sokongan Pelbagai Bahasa

Repositori ini menggunakan sistem terjemahan automatik:
- Menyokong 50+ bahasa
- Terjemahan dalam direktori `/translations/<kod-bahasa>/`
- Aliran kerja GitHub Actions mengendalikan kemas kini terjemahan
- Fail sumber dalam Bahasa Inggeris di akar repositori

### Struktur Pelajaran

Setiap pelajaran mengikuti pola konsisten:
1. Gambar kecil video dengan pautan
2. Kandungan pelajaran bertulis (README.md)
3. Contoh kod dalam pelbagai rangka kerja
4. Objektif pembelajaran dan prasyarat
5. Sumber pembelajaran tambahan dipautkan

### Penamaan Contoh Kod

Format: `<nombor-pelajaran>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Pelajaran 1, MAF Python
- `14-sequential.ipynb` - Pelajaran 14, corak lanjutan MAF
- `16-python-agent-framework.ipynb` - Pelajaran 16, agen sokongan pelanggan pengeluaran
- `17-local-agent-foundry-local.ipynb` - Pelajaran 17, agen setempat dengan Foundry Local + Qwen

### Direktori Khas

- `translated_images/` - Imej yang dilokalkan untuk terjemahan
- `images/` - Imej asal untuk kandungan Bahasa Inggeris
- `.devcontainer/` - Konfigurasi kontena pembangunan VS Code
- `.github/` - Aliran kerja dan templat GitHub Actions

### Kebergantungan

Pakej utama dari `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Sokongan protokol Agent-to-Agent
- `azure-ai-inference`, `azure-ai-projects` - Perkhidmatan Azure AI
- `azure-identity` - Pengesahan Azure (AzureCliCredential)
- `azure-search-documents` - Integrasi Azure AI Search
- `mcp[cli]` - Sokongan Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->