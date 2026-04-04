# Keamanan MCP Lanjutan dengan Azure Content Safety

> **Risiko OWASP MCP yang Ditangani**: [MCP06 - Penyuntikan Prompt melalui Payload Kontekstual](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety menyediakan beberapa alat canggih yang dapat meningkatkan keamanan implementasi MCP Anda. Untuk pengalaman implementasi langsung, lihat [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Keamanan I/O.

## Pelindung Prompt

Pelindung Prompt AI Microsoft memberikan perlindungan kuat terhadap serangan penyuntikan prompt langsung maupun tidak langsung melalui:

1. **Deteksi Lanjutan**: Menggunakan pembelajaran mesin untuk mengidentifikasi instruksi berbahaya yang tertanam dalam konten.
2. **Penyorotan**: Mengubah teks input untuk membantu sistem AI membedakan antara instruksi valid dan input eksternal.
3. **Delimiters dan Penandaan Data**: Menandai batas antara data yang dipercaya dan tidak dipercaya.
4. **Integrasi Content Safety**: Bekerja sama dengan Azure AI Content Safety untuk mendeteksi upaya jailbreak dan konten berbahaya.
5. **Pembaruan Berkala**: Microsoft secara rutin memperbarui mekanisme perlindungan terhadap ancaman yang muncul.

## Mengimplementasikan Azure Content Safety dengan MCP

Pendekatan ini menyediakan perlindungan berlapis-lapis:
- Memindai input sebelum diproses
- Memvalidasi output sebelum dikembalikan
- Menggunakan blokir daftar untuk pola berbahaya yang dikenal
- Memanfaatkan model content safety Azure yang diperbarui secara kontinu

## Sumber Daya Azure Content Safety

Untuk mempelajari lebih lanjut tentang implementasi Azure Content Safety dengan server MCP Anda, konsultasikan sumber resmi berikut:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Dokumentasi resmi untuk Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Pelajari cara mencegah serangan penyuntikan prompt.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Referensi API terperinci untuk mengimplementasikan Content Safety.
4. [Quickstart: Azure Content Safety dengan C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Panduan cepat implementasi menggunakan C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Perpustakaan klien untuk berbagai bahasa pemrograman.
6. [Mendeteksi Upaya Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Panduan khusus untuk mendeteksi dan mencegah upaya jailbreak.
7. [Praktik Terbaik untuk Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Praktik terbaik untuk mengimplementasikan content safety secara efektif.

Untuk implementasi yang lebih mendalam, lihat [panduan Implementasi Azure Content Safety](./azure-content-safety-implementation.md) kami.

## Langkah Selanjutnya

- Baca: [Implementasi Azure Content Safety](./azure-content-safety-implementation.md)
- Kembali ke: [Ikhtisar Modul Keamanan](./README.md)
- Lanjut ke: [Modul 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berusaha untuk mencapai akurasi, harap diperhatikan bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang otoritatif. Untuk informasi yang penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau salah tafsir yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->