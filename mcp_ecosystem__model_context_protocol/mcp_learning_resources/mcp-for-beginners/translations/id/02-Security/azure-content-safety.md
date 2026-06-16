# Keamanan MCP Tingkat Lanjut dengan Azure Content Safety

> **Risiko OWASP MCP yang Ditangani**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety menyediakan beberapa alat kuat yang dapat meningkatkan keamanan implementasi MCP Anda. Untuk pengalaman implementasi langsung, lihat [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Keamanan I/O.

## Perisai Prompt

Perisai Prompt AI Microsoft menyediakan perlindungan yang kuat terhadap serangan injeksi prompt baik langsung maupun tidak langsung melalui:

1. **Deteksi Lanjutan**: Menggunakan pembelajaran mesin untuk mengidentifikasi instruksi berbahaya yang tertanam dalam konten.
2. **Spotlighting**: Mengubah teks input untuk membantu sistem AI membedakan antara instruksi yang valid dan input eksternal.
3. **Pembatas dan Penandaan Data**: Menandai batas antara data yang dipercaya dan tidak dipercaya.
4. **Integrasi Content Safety**: Bekerja dengan Azure AI Content Safety untuk mendeteksi upaya jailbreak dan konten berbahaya.
5. **Pembaruan Berkelanjutan**: Microsoft secara rutin memperbarui mekanisme perlindungan terhadap ancaman yang muncul.

## Mengimplementasikan Azure Content Safety dengan MCP

Pendekatan ini menyediakan perlindungan berlapis:
- Memindai input sebelum diproses
- Memvalidasi output sebelum dikembalikan
- Menggunakan daftar blokir untuk pola berbahaya yang diketahui
- Memanfaatkan model content safety Azure yang diperbarui secara terus menerus

## Sumber Daya Azure Content Safety

Untuk mempelajari lebih lanjut tentang mengimplementasikan Azure Content Safety dengan server MCP Anda, konsultasikan sumber resmi berikut:

1. [Dokumentasi Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Dokumentasi resmi untuk Azure Content Safety.
2. [Dokumentasi Perisai Prompt](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Pelajari cara mencegah serangan injeksi prompt.
3. [Referensi API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Referensi API terperinci untuk mengimplementasikan Content Safety.
4. [Panduan Cepat: Azure Content Safety dengan C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Panduan implementasi cepat menggunakan C#.
5. [Perpustakaan Klien Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Perpustakaan klien untuk berbagai bahasa pemrograman.
6. [Mendeteksi Upaya Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Panduan khusus untuk mendeteksi dan mencegah upaya jailbreak.
7. [Praktik Terbaik untuk Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Praktik terbaik untuk mengimplementasikan content safety secara efektif.

Untuk implementasi yang lebih mendalam, lihat [Panduan Implementasi Azure Content Safety](./azure-content-safety-implementation.md).

## Apa Selanjutnya

- Baca: [Implementasi Azure Content Safety](./azure-content-safety-implementation.md)
- Kembali ke: [Tinjauan Modul Keamanan](./README.md)
- Lanjut ke: [Modul 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->