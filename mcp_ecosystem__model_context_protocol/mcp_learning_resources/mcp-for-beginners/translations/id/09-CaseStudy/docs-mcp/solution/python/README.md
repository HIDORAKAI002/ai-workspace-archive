# Generator Rencana Studi dengan Chainlit & Microsoft Learn Docs MCP

## Prasyarat

- Python 3.8 atau lebih tinggi
- pip (manajer paket Python)
- Akses internet untuk terhubung ke server Microsoft Learn Docs MCP

## Instalasi

1. Kloning repositori ini atau unduh file proyek.
2. Pasang dependensi yang dibutuhkan:

   ```bash
   pip install -r requirements.txt
   ```

## Penggunaan

### Skenario 1: Kuery Sederhana ke Docs MCP
Klien baris perintah yang terhubung ke server Docs MCP, mengirimkan kuery, dan menampilkan hasilnya.

1. Jalankan skrip:
   ```bash
   python scenario1.py
   ```
2. Masukkan pertanyaan dokumentasi Anda pada prompt.

### Skenario 2: Generator Rencana Studi (Aplikasi Web Chainlit)
Antarmuka berbasis web (menggunakan Chainlit) yang memungkinkan pengguna membuat rencana studi pribadi, mingguan, untuk topik teknis apa pun.

1. Mulai aplikasi Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Buka URL lokal yang diberikan di terminal Anda (misalnya, http://localhost:8000) di browser Anda.
3. Di jendela obrolan, masukkan topik studi dan jumlah minggu yang ingin Anda pelajari (misal, "sertifikasi AI-900, 8 minggu").
4. Aplikasi akan merespons dengan rencana studi mingguan, termasuk tautan ke dokumentasi Microsoft Learn yang relevan.

**Variabel Lingkungan yang Diperlukan:**

Untuk menggunakan Skenario 2 (aplikasi web Chainlit dengan Azure OpenAI), Anda harus mengatur variabel lingkungan berikut di file `.env` dalam direktori `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Isikan nilai-nilai ini dengan detail sumber daya Azure OpenAI Anda sebelum menjalankan aplikasi.

> [!TIP]
> Anda dapat dengan mudah menerapkan model Anda sendiri menggunakan [Microsoft Foundry](https://ai.azure.com/).

### Skenario 3: Docs Dalam Editor dengan Server MCP di VS Code

Alih-alih berganti tab browser untuk mencari dokumentasi, Anda bisa membawa Microsoft Learn Docs langsung ke dalam VS Code menggunakan server MCP. Ini memungkinkan Anda untuk:
- Mencari dan membaca dokumentasi di dalam VS Code tanpa meninggalkan lingkungan pengkodean Anda.
- Mengutip dokumentasi dan memasukkan tautan langsung ke file README atau kursus Anda.
- Menggunakan GitHub Copilot dan MCP secara bersamaan untuk alur kerja dokumentasi berbasis AI yang mulus.

**Contoh Kasus Penggunaan:**
- Menambahkan tautan referensi dengan cepat ke README saat menulis dokumentasi kursus atau proyek.
- Menggunakan Copilot untuk menghasilkan kode dan MCP untuk segera menemukan serta mengutip dokumen yang relevan.
- Tetap fokus dalam editor dan tingkatkan produktivitas.

> [!IMPORTANT]
> Pastikan Anda memiliki konfigurasi [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) yang valid di ruang kerja Anda (lokasi adalah `.vscode/mcp.json`).

## Mengapa Chainlit untuk Skenario 2?

Chainlit adalah kerangka kerja sumber terbuka modern untuk membangun aplikasi web percakapan. Ini memudahkan pembuatan antarmuka pengguna berbasis obrolan yang terhubung ke layanan backend seperti server Microsoft Learn Docs MCP. Proyek ini menggunakan Chainlit untuk menyediakan cara yang sederhana dan interaktif dalam menghasilkan rencana studi pribadi secara real-time. Dengan memanfaatkan Chainlit, Anda dapat dengan cepat membangun dan menerapkan alat berbasis chat yang meningkatkan produktivitas dan pembelajaran.

## Apa yang Dilakukan Ini

Aplikasi ini memungkinkan pengguna membuat rencana studi pribadi hanya dengan memasukkan topik dan durasi. Aplikasi memproses input Anda, mengkuery server Microsoft Learn Docs MCP untuk konten yang relevan, dan mengorganisasi hasilnya menjadi rencana terstruktur mingguan. Rekomendasi setiap minggu ditampilkan di obrolan, sehingga mudah diikuti dan melacak kemajuan Anda. Integrasi ini memastikan Anda selalu mendapatkan sumber belajar terbaru dan paling relevan.

## Contoh Kuery

Cobalah kueri berikut di jendela obrolan untuk melihat bagaimana aplikasi merespons:

- `sertifikasi AI-900, 8 minggu`
- `Belajar Azure Functions, 4 minggu`
- `Azure DevOps, 6 minggu`
- `Rekayasa data di Azure, 10 minggu`
- `Dasar keamanan Microsoft, 5 minggu`
- `Power Platform, 7 minggu`
- `Layanan AI Azure, 12 minggu`
- `Arsitektur cloud, 9 minggu`

Contoh-contoh ini menunjukkan fleksibilitas aplikasi untuk berbagai tujuan dan jangka waktu pembelajaran.

## Referensi

- [Dokumentasi Chainlit](https://docs.chainlit.io/)
- [Dokumentasi MCP](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->