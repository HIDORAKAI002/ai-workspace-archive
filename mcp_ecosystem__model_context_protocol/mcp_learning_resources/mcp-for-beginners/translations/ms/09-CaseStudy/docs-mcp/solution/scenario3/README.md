# Senario 3: Dokumentasi Dalam Editor dengan Pelayan MCP dalam VS Code

## Gambaran Keseluruhan

Dalam senario ini, anda akan belajar bagaimana membawa Microsoft Learn Docs terus ke dalam persekitaran Visual Studio Code anda menggunakan pelayan MCP. Daripada sentiasa menukar tab pelayar untuk mencari dokumentasi, anda boleh mengakses, mencari, dan merujuk dokumen rasmi terus di dalam editor anda. Pendekatan ini memudahkan aliran kerja anda, menjaga fokus anda, dan membolehkan integrasi lancar dengan alat seperti GitHub Copilot.

- Cari dan baca dokumen di dalam VS Code tanpa meninggalkan persekitaran pengaturcaraan anda.
- Rujuk dokumentasi dan masukkan pautan terus ke dalam fail README atau fail kursus anda.
- Gunakan GitHub Copilot dan MCP bersama-sama untuk aliran kerja dokumentasi berkuasa AI yang lancar.

## Objektif Pembelajaran

Menjelang akhir bab ini, anda akan memahami cara untuk menyediakan dan menggunakan pelayan MCP dalam VS Code bagi meningkatkan dokumentasi dan aliran kerja pembangunan anda. Anda akan dapat:

- Mengkonfigurasi ruang kerja anda untuk menggunakan pelayan MCP bagi pencarian dokumentasi.
- Mencari dan menyisipkan dokumentasi secara langsung dari dalam VS Code.
- Menggabungkan kuasa GitHub Copilot dan MCP untuk aliran kerja yang lebih produktif dan dipertingkatkan AI.

Kemahiran ini akan membantu anda mengekalkan fokus, memperbaiki kualiti dokumentasi, dan meningkatkan produktiviti sebagai pembangun atau penulis teknikal.

## Penyelesaian

Untuk mencapai akses dokumentasi dalam editor, anda akan mengikuti beberapa langkah yang mengintegrasikan pelayan MCP dengan VS Code dan GitHub Copilot. Penyelesaian ini sesuai untuk pengarang kursus, penulis dokumentasi, dan pembangun yang ingin mengekalkan fokus dalam editor sambil bekerja dengan dokumen dan Copilot.

- Tambah pautan rujukan dengan cepat ke README semasa menulis dokumentasi kursus atau projek.
- Gunakan Copilot untuk menghasilkan kod dan MCP untuk mencari serta menyitir dokumen yang relevan dengan serta-merta.
- Kekal fokus dalam editor anda dan tingkatkan produktiviti.

### Panduan Langkah demi Langkah

Untuk memulakan, ikut langkah-langkah berikut. Untuk setiap langkah, anda boleh menambah tangkapan skrin dari folder aset untuk menggambarkan proses secara visual.

1. **Tambah konfigurasi MCP:**
   Dalam akar projek anda, cipta fail `.vscode/mcp.json` dan tambahkan konfigurasi berikut:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Konfigurasi ini memberitahu VS Code cara untuk menyambung ke [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Langkah 1: Tambahkan mcp.json ke folder .vscode](../../../../../../translated_images/ms/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Buka panel Sembang GitHub Copilot:**
   Jika anda belum memasang sambungan GitHub Copilot, pergi ke paparan Sambungan di VS Code dan pasangkannya. Anda boleh memuat turunnya terus dari [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Kemudian, buka panel Sembang Copilot dari bar sisi.

   ![Langkah 2: Buka panel Sembang Copilot](../../../../../../translated_images/ms/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Aktifkan mod ejen dan sahkan alat:**
   Dalam panel Sembang Copilot, aktifkan mod ejen.

   ![Langkah 3: Aktifkan mod ejen dan sahkan alat](../../../../../../translated_images/ms/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Selepas mengaktifkan mod ejen, sahkan bahawa pelayan MCP disenaraikan sebagai salah satu alat yang tersedia. Ini memastikan bahawa ejen Copilot boleh mengakses pelayan dokumentasi untuk mendapatkan maklumat yang relevan.
   
   ![Langkah 3: Sahkan alat pelayan MCP](../../../../../../translated_images/ms/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Mula sembang baru dan beri arahan kepada ejen:**
   Buka sembang baru dalam panel Sembang Copilot. Anda kini boleh memberi arahan kepada ejen dengan pertanyaan dokumentasi anda. Ejen akan menggunakan pelayan MCP untuk mendapatkan dan memaparkan dokumentasi Microsoft Learn yang relevan terus dalam editor anda.

   - *"Saya sedang cuba menulis pelan pembelajaran untuk topik X. Saya akan mempelajarinya selama 8 minggu, untuk setiap minggu, cadangkan kandungan yang patut saya ambil."*

   ![Langkah 4: Beri arahan kepada ejen dalam sembang](../../../../../../translated_images/ms/step4-prompt-chat.12187bb001605efc.webp)

5. **Pertanyaan Langsung:**

   > Mari kita ambil pertanyaan langsung dari bahagian [#get-help](https://discord.gg/D6cRhjHWSC) dalam Microsoft Foundry Discord ([lihat mesej asal](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Saya sedang mencari jawapan untuk cara melaksanakan penyelesaian multi-ejen dengan ejen AI yang dibangunkan di Azure AI Foundry. Saya lihat tiada kaedah pelaksanaan terus, seperti saluran Copilot Studio. Jadi, apakah cara berbeza untuk melakukan pelaksanaan ini bagi pengguna perusahaan untuk berinteraksi dan menyelesaikan kerja?
Terdapat banyak artikel/blog yang mengatakan kita boleh menggunakan perkhidmatan Azure Bot untuk melakukan kerja ini yang boleh bertindak sebagai jambatan antara MS Teams dan Ejen Azure AI Foundry, adakah ini akan berfungsi jika saya menyediakan bot Azure yang disambungkan ke Ejen Orchestrator di Azure AI Foundry melalui fungsi Azure untuk menjalankan orkestrasi atau saya perlu mencipta fungsi Azure untuk setiap ejen AI sebagai sebahagian penyelesaian multi-ejen untuk menjalankan orkestrasi di rangka kerja Bot? Cadangan lain dialu-alukan."*

   ![Langkah 5: Pertanyaan langsung](../../../../../../translated_images/ms/step5-live-queries.49db3e4a50bea273.webp)

   Ejen akan memberi respons dengan pautan dan ringkasan dokumentasi yang relevan, yang kemudiannya boleh anda masukkan terus ke dalam fail markdown anda atau gunakan sebagai rujukan dalam kod anda.
   
### Contoh Pertanyaan

Berikut adalah beberapa contoh pertanyaan yang boleh anda cuba. Pertanyaan ini akan menunjukkan bagaimana pelayan MCP dan Copilot boleh bekerjasama untuk menyediakan dokumentasi dan rujukan berkesan serta-merta tanpa meninggalkan VS Code:

- "Tunjukkan cara menggunakan pencetus Azure Functions."
- "Sisipkan pautan ke dokumentasi rasmi untuk Azure Key Vault."
- "Apakah amalan terbaik untuk mengamankan sumber Azure?"
- "Cari cepat mula untuk perkhidmatan Azure AI."

Pertanyaan ini akan menunjukkan bagaimana pelayan MCP dan Copilot boleh bekerjasama untuk menyediakan dokumentasi dan rujukan berkesan serta-merta tanpa meninggalkan VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->