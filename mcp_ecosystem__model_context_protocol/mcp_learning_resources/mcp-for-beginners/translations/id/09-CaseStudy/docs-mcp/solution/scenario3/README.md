# Skenario 3: Dokumen Dalam Editor dengan Server MCP di VS Code

## Ikhtisar

Dalam skenario ini, Anda akan belajar bagaimana membawa Microsoft Learn Docs langsung ke dalam lingkungan Visual Studio Code Anda menggunakan server MCP. Alih-alih terus-menerus beralih tab browser untuk mencari dokumentasi, Anda dapat mengakses, mencari, dan merujuk dokumen resmi langsung di dalam editor Anda. Pendekatan ini memperlancar alur kerja Anda, menjaga fokus Anda, dan memungkinkan integrasi mulus dengan alat seperti GitHub Copilot.

- Cari dan baca dokumen di dalam VS Code tanpa meninggalkan lingkungan pengkodean Anda.
- Referensikan dokumentasi dan sisipkan tautan langsung ke README atau file kursus Anda.
- Gunakan GitHub Copilot dan MCP bersama-sama untuk alur kerja dokumentasi bertenaga AI yang mulus.

## Tujuan Pembelajaran

Pada akhir bab ini, Anda akan memahami cara mengatur dan menggunakan server MCP dalam VS Code untuk meningkatkan alur kerja dokumentasi dan pengembangan Anda. Anda akan dapat:

- Mengonfigurasi ruang kerja Anda untuk menggunakan server MCP untuk pencarian dokumentasi.
- Mencari dan memasukkan dokumentasi langsung dari dalam VS Code.
- Menggabungkan kekuatan GitHub Copilot dan MCP untuk alur kerja yang lebih produktif dan didukung AI.

Keterampilan ini akan membantu Anda tetap fokus, meningkatkan kualitas dokumentasi, dan meningkatkan produktivitas Anda sebagai pengembang atau penulis teknis.

## Solusi

Untuk mencapai akses dokumentasi dalam editor, Anda akan mengikuti serangkaian langkah yang mengintegrasikan server MCP dengan VS Code dan GitHub Copilot. Solusi ini ideal untuk penulis kursus, penulis dokumentasi, dan pengembang yang ingin tetap fokus di editor saat bekerja dengan dokumen dan Copilot.

- Tambahkan tautan referensi dengan cepat ke README saat menulis kursus atau dokumentasi proyek.
- Gunakan Copilot untuk menghasilkan kode dan MCP untuk segera menemukan serta mengutip dokumen yang relevan.
- Tetap fokus di editor Anda dan tingkatkan produktivitas.

### Panduan Langkah demi Langkah

Untuk memulai, ikuti langkah-langkah ini. Untuk setiap langkah, Anda dapat menambahkan tangkapan layar dari folder aset untuk menggambarkan proses secara visual.

1. **Tambahkan konfigurasi MCP:**
   Di root proyek Anda, buat file `.vscode/mcp.json` dan tambahkan konfigurasi berikut:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Konfigurasi ini memberi tahu VS Code bagaimana menghubungkan ke [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Langkah 1: Tambahkan mcp.json ke folder .vscode](../../../../../../translated_images/id/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Buka panel GitHub Copilot Chat:**
   Jika Anda belum memasang ekstensi GitHub Copilot, buka tampilan Ekstensi di VS Code dan pasang ekstensi tersebut. Anda dapat mengunduhnya langsung dari [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Setelah itu, buka panel Copilot Chat dari sidebar.

   ![Langkah 2: Buka panel Copilot Chat](../../../../../../translated_images/id/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Aktifkan mode agen dan verifikasi alat:**
   Dalam panel Copilot Chat, aktifkan mode agen.

   ![Langkah 3: Aktifkan mode agen dan verifikasi alat](../../../../../../translated_images/id/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Setelah mengaktifkan mode agen, pastikan bahwa server MCP tercantum sebagai salah satu alat yang tersedia. Ini memastikan agen Copilot dapat mengakses server dokumentasi untuk mengambil informasi yang relevan.
   
   ![Langkah 3: Verifikasi alat server MCP](../../../../../../translated_images/id/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Mulai percakapan baru dan beri perintah ke agen:**
   Buka obrolan baru di panel Copilot Chat. Sekarang Anda dapat memberi perintah ke agen dengan pertanyaan dokumentasi Anda. Agen akan menggunakan server MCP untuk mengambil dan menampilkan dokumentasi Microsoft Learn yang relevan langsung di editor Anda.

   - *"Saya sedang mencoba menulis rencana belajar untuk topik X. Saya akan mempelajarinya selama 8 minggu, untuk setiap minggu, sarankan konten yang harus saya pelajari."*

   ![Langkah 4: Beri perintah ke agen di obrolan](../../../../../../translated_images/id/step4-prompt-chat.12187bb001605efc.webp)

5. **Query Langsung:**

   > Mari kita ambil query langsung dari bagian [#get-help](https://discord.gg/D6cRhjHWSC) di Microsoft Foundry Discord ([lihat pesan asli](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Saya mencari jawaban tentang cara menerapkan solusi multi-agen dengan agen AI yang dikembangkan di Azure AI Foundry. Saya melihat tidak ada metode penerapan langsung, seperti saluran Copilot Studio. Jadi, apa cara berbeda untuk melakukan penerapan ini agar pengguna korporat bisa berinteraksi dan menyelesaikan pekerjaan?
Terdapat banyak artikel/blog yang mengatakan kita bisa menggunakan layanan Azure Bot untuk melakukan pekerjaan ini yang dapat bertindak sebagai jembatan antara MS teams dan Azure AI Foundry Agents, apakah ini akan berhasil jika saya mengatur bot Azure yang terhubung ke Agen Orchestrator di Azure AI foundry melalui Azure function untuk melakukan orkestrasi atau saya perlu membuat Azure function untuk setiap agen AI yang merupakan bagian dari solusi multi agen untuk melakukan orkestrasi di Bot framework? Saran lain sangat diterima."*

   ![Langkah 5: Query langsung](../../../../../../translated_images/id/step5-live-queries.49db3e4a50bea273.webp)

   Agen akan merespons dengan tautan dokumentasi relevan dan ringkasan, yang kemudian dapat Anda masukkan langsung ke file markdown Anda atau gunakan sebagai referensi dalam kode Anda.
   
### Contoh Pertanyaan

Berikut beberapa contoh pertanyaan yang bisa Anda coba. Pertanyaan-pertanyaan ini akan menunjukkan bagaimana server MCP dan Copilot dapat bekerja sama menyediakan dokumentasi dan referensi yang instan dan kontekstual tanpa meninggalkan VS Code:

- "Tunjukkan cara menggunakan trigger Azure Functions."
- "Masukkan tautan ke dokumentasi resmi untuk Azure Key Vault."
- "Apa praktik terbaik untuk mengamankan sumber daya Azure?"
- "Temukan quickstart untuk layanan Azure AI."

Pertanyaan-pertanyaan ini akan menunjukkan bagaimana server MCP dan Copilot dapat bekerja sama menyediakan dokumentasi dan referensi yang instan dan kontekstual tanpa meninggalkan VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->