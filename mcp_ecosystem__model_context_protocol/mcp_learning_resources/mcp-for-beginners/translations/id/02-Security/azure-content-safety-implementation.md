# Menerapkan Azure Content Safety dengan MCP

> **Risiko OWASP MCP yang Ditangani**: [MCP06 - Prompt Injection melalui Payload Kontekstual](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Untuk memperkuat keamanan MCP terhadap prompt injection, peracunan alat, dan kerentanan spesifik AI lainnya, sangat disarankan untuk mengintegrasikan Azure Content Safety. Panduan implementasi ini sejalan dengan [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Keamanan I/O.

## Integrasi dengan Server MCP

Untuk mengintegrasikan Azure Content Safety dengan server MCP Anda, tambahkan filter content safety sebagai middleware dalam pipeline pemrosesan permintaan Anda:

1. Inisialisasi filter selama startup server
2. Validasi semua permintaan alat yang masuk sebelum diproses
3. Periksa semua respons keluar sebelum mengembalikannya ke klien
4. Catat dan berikan peringatan pada pelanggaran keamanan
5. Terapkan penanganan kesalahan yang tepat untuk pemeriksaan content safety yang gagal

Ini menyediakan pertahanan yang kuat terhadap:
- Serangan prompt injection
- Upaya peracunan alat
- Eksfiltrasi data melalui input berbahaya
- Pembuatan konten berbahaya

## Praktik Terbaik untuk Integrasi Azure Content Safety

1. **Daftar Blokir Kustom**: Buat daftar blokir kustom khusus untuk pola injeksi MCP
2. **Penyesuaian Tingkat Keparahan**: Sesuaikan ambang tingkat keparahan berdasarkan kasus penggunaan dan toleransi risiko Anda
3. **Cakupan Komprehensif**: Terapkan pemeriksaan content safety pada semua input dan output
4. **Optimasi Performa**: Pertimbangkan penerapan caching untuk pemeriksaan content safety yang berulang
5. **Mekanisme Cadangan**: Definisikan perilaku cadangan yang jelas ketika layanan content safety tidak tersedia
6. **Umpan Balik Pengguna**: Berikan umpan balik yang jelas kepada pengguna saat konten diblokir karena alasan keamanan
7. **Peningkatan Berkelanjutan**: Perbarui secara rutin daftar blokir dan pola berdasarkan ancaman yang muncul

## Sumber Daya Tambahan

### Panduan Keamanan OWASP MCP
- [Panduan Keamanan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Daftar Top 10 OWASP MCP lengkap dengan implementasi Azure
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Pola mitigasi prompt injection secara rinci
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Camp 3: Keamanan I/O secara praktik membahas content safety

### Dokumentasi Azure
- [Ikhtisar Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentasi Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Quickstart Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Selanjutnya

- Kembali ke: [Ikhtisar Modul Keamanan](./README.md)
- Lanjut ke: [Modul 3: Memulai](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diingat bahwa terjemahan otomatis dapat mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah dan utama. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->