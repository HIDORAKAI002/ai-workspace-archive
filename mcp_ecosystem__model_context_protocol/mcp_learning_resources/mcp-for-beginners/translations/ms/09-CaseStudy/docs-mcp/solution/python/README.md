# Penjana Pelan Kajian dengan Chainlit & Microsoft Learn Docs MCP

## Prasyarat

- Python 3.8 atau lebih tinggi
- pip (pengurus pakej Python)
- Akses internet untuk menyambung ke server Microsoft Learn Docs MCP

## Pemasangan

1. Klon repositori ini atau muat turun fail projek.
2. Pasang kebergantungan yang diperlukan:

   ```bash
   pip install -r requirements.txt
   ```

## Penggunaan

### Senario 1: Pertanyaan Mudah ke Docs MCP
Klien baris perintah yang menyambung ke server Docs MCP, menghantar pertanyaan, dan mencetak hasilnya.

1. Jalankan skrip:
   ```bash
   python scenario1.py
   ```
2. Masukkan soalan dokumentasi anda pada arahan.

### Senario 2: Penjana Pelan Kajian (Aplikasi Web Chainlit)
Antara muka berasaskan web (menggunakan Chainlit) yang membolehkan pengguna menghasilkan pelan kajian peribadi secara minggu-ke-minggu untuk mana-mana topik teknikal.

1. Mulakan aplikasi Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Buka URL tempatan yang diberikan dalam terminal anda (contohnya, http://localhost:8000) dalam pelayar anda.
3. Dalam tetingkap sembang, masukkan topik kajian anda dan bilangan minggu yang anda ingin belajar (contohnya, "pensijilan AI-900, 8 minggu").
4. Aplikasi akan memberi respons dengan pelan kajian minggu-ke-minggu, termasuk pautan ke dokumentasi Microsoft Learn yang berkaitan.

**Pembolehubah Persekitaran Diperlukan:**

Untuk menggunakan Senario 2 (aplikasi web Chainlit dengan Azure OpenAI), anda mesti menetapkan pembolehubah persekitaran berikut dalam fail `.env` di direktori `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Isikan nilai-nilai ini dengan butiran sumber Azure OpenAI anda sebelum menjalankan aplikasi.

> [!TIP]
> Anda boleh dengan mudah melancarkan model anda sendiri menggunakan [Microsoft Foundry](https://ai.azure.com/).

### Senario 3: Docs Dalam Penyunting dengan Server MCP di VS Code

Daripada bertukar tab pelayar untuk mencari dokumentasi, anda boleh membawa Microsoft Learn Docs terus ke dalam VS Code anda menggunakan server MCP. Ini membolehkan anda untuk:
- Mencari dan membaca dokumen dalam VS Code tanpa meninggalkan persekitaran pengkodan anda.
- Merujuk dokumentasi dan memasukkan pautan terus ke dalam fail README atau kursus anda.
- Menggunakan GitHub Copilot dan MCP bersama untuk aliran kerja dokumentasi bertenaga AI yang lancar.

**Kes Penggunaan Contoh:**
- Tambah pautan rujukan dengan cepat ke README semasa menulis dokumentasi kursus atau projek.
- Gunakan Copilot untuk menjana kod dan MCP untuk mencari serta memetik dokumen yang relevan dengan segera.
- Tetap fokus dalam penyunting anda dan tingkatkan produktiviti.

> [!IMPORTANT]
> Pastikan anda mempunyai konfigurasi [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) yang sah dalam ruang kerja anda (lokasi adalah `.vscode/mcp.json`).

## Kenapa Chainlit untuk Senario 2?

Chainlit adalah rangka kerja sumber terbuka moden untuk membina aplikasi web perbualan. Ia memudahkan penciptaan antara muka pengguna berasaskan sembang yang menyambung ke perkhidmatan backend seperti server Microsoft Learn Docs MCP. Projek ini menggunakan Chainlit untuk menyediakan cara yang mudah dan interaktif bagi menghasilkan pelan kajian peribadi secara masa nyata. Dengan menggunakan Chainlit, anda boleh dengan cepat membina dan melancarkan alat berasaskan sembang yang meningkatkan produktiviti dan pembelajaran.

## Apa Yang Dilakukan Ini

Aplikasi ini membolehkan pengguna membuat pelan kajian peribadi dengan hanya memasukkan topik dan tempoh. Aplikasi akan mengurai input anda, membuat pertanyaan ke server Microsoft Learn Docs MCP untuk kandungan yang relevan, dan mengatur hasil menjadi pelan berstruktur minggu-ke-minggu. Cadangan setiap minggu dipaparkan dalam sembang, memudahkan anda mengikut dan menjejaki kemajuan. Integrasi ini memastikan anda sentiasa mendapat sumber pembelajaran terkini dan paling relevan.

## Pertanyaan Contoh

Cuba pertanyaan ini dalam tetingkap sembang untuk melihat bagaimana aplikasi membalas:

- `pensijilan AI-900, 8 minggu`
- `Belajar Azure Functions, 4 minggu`
- `Azure DevOps, 6 minggu`
- `Kejuruteraan data di Azure, 10 minggu`
- `Asas keselamatan Microsoft, 5 minggu`
- `Power Platform, 7 minggu`
- `Perkhidmatan AI Azure, 12 minggu`
- `Seni bina awan, 9 minggu`

Contoh-contoh ini menunjukkan fleksibiliti aplikasi untuk pelbagai matlamat pembelajaran dan jangka masa.

## Rujukan

- [Dokumentasi Chainlit](https://docs.chainlit.io/)
- [Dokumentasi MCP](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->