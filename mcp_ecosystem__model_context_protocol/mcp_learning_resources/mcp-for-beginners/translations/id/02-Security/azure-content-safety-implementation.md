# Implementasi Azure Content Safety dengan MCP

> **OWASP MCP Risiko yang Ditangani**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Untuk memperkuat keamanan MCP terhadap prompt injection, tool poisoning, dan kerentanan khusus AI lainnya, sangat disarankan untuk mengintegrasikan Azure Content Safety. Panduan implementasi ini selaras dengan [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Keamanan I/O.

## Integrasi dengan Server MCP

Untuk mengintegrasikan Azure Content Safety dengan server MCP Anda, tambahkan filter content safety sebagai middleware dalam pipeline pemrosesan permintaan Anda:

1. Inisialisasi filter saat server mulai berjalan
2. Validasi semua permintaan tool yang masuk sebelum diproses
3. Periksa semua respons yang keluar sebelum dikembalikan ke klien
4. Catat dan beri peringatan atas pelanggaran keamanan
5. Terapkan penanganan kesalahan yang tepat untuk pemeriksaan content safety yang gagal

Ini menyediakan pertahanan kuat terhadap:
- Serangan prompt injection
- Upaya tool poisoning
- Ekfiltrasi data melalui input berbahaya
- Pembuatan konten berbahaya

## Praktik Terbaik untuk Integrasi Azure Content Safety

1. **Daftar Blokir Khusus**: Buat daftar blokir khusus khusus untuk pola injeksi MCP
2. **Penyesuaian Tingkat Keparahan**: Sesuaikan ambang batas keparahan berdasarkan kasus penggunaan dan toleransi risiko Anda
3. **Cakupan Menyeluruh**: Terapkan pemeriksaan content safety pada semua input dan output
4. **Optimasi Kinerja**: Pertimbangkan penerapan caching untuk pemeriksaan content safety yang berulang
5. **Mekanisme Cadangan**: Tetapkan perilaku fallback yang jelas saat layanan content safety tidak tersedia
6. **Umpan Balik Pengguna**: Berikan umpan balik yang jelas kepada pengguna ketika konten diblokir karena masalah keamanan
7. **Perbaikan Berkelanjutan**: Perbarui secara berkala daftar blokir dan pola berdasarkan ancaman yang muncul

## Sumber Daya Tambahan

### Panduan Keamanan OWASP MCP
- [Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Daftar Top 10 OWASP MCP komprehensif dengan implementasi Azure
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Pola mitigasi prompt injection secara detail
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Camp 3: Keamanan I/O yang bersifat praktik langsung membahas content safety

### Dokumentasi Azure
- [Gambaran Umum Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentasi Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Awal Cepat Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Selanjutnya

- Kembali ke: [Ikhtisar Modul Keamanan](./README.md)
- Lanjut ke: [Modul 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->