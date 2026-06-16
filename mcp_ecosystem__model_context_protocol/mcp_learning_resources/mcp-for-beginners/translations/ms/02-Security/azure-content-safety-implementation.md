# Pelaksanaan Azure Content Safety dengan MCP

> **Risiko OWASP MCP Ditangani**: [MCP06 - Subversi Aliran Niat](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Untuk mengukuhkan keselamatan MCP daripada suntikan prompt, keracunan alat, dan kerentanan khusus AI yang lain, integrasi Azure Content Safety sangat disyorkan. Panduan pelaksanaan ini sejajar dengan [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Kem 3: Keselamatan I/O.

## Integrasi dengan Pelayan MCP

Untuk mengintegrasikan Azure Content Safety dengan pelayan MCP anda, tambahkan penapis keselamatan kandungan sebagai middleware dalam saluran pemprosesan permintaan anda:

1. Inisialisasi penapis semasa permulaan pelayan  
2. Sahkan semua permintaan alat yang masuk sebelum diproses  
3. Periksa semua respons keluar sebelum dikembalikan ke pelanggan  
4. Log dan beri amaran mengenai pelanggaran keselamatan  
5. Laksanakan pengendalian ralat yang sesuai untuk pemeriksaan keselamatan kandungan yang gagal  

Ini menyediakan pertahanan teguh terhadap:  
- Serangan suntikan prompt  
- Cubaan keracunan alat  
- Pengeksfiltrasi data melalui input berniat jahat  
- Penjanaan kandungan berbahaya  

## Amalan Terbaik untuk Integrasi Azure Content Safety

1. **Senarai Sekat Tersuai**: Cipta senarai sekat khusus untuk corak suntikan MCP  
2. **Pelarasan Keterukan**: Laraskan ambang keterukan berdasarkan kes penggunaan dan toleransi risiko anda  
3. **Liputan Komprehensif**: Terapkan pemeriksaan keselamatan kandungan pada semua input dan output  
4. **Pengoptimuman Prestasi**: Pertimbangkan pelaksanaan caching untuk pemeriksaan keselamatan kandungan yang berulang  
5. **Mekanisme Sandaran**: Tetapkan tingkah laku sandaran yang jelas apabila perkhidmatan keselamatan kandungan tidak tersedia  
6. **Maklum Balas Pengguna**: Berikan maklum balas jelas kepada pengguna apabila kandungan disekat kerana kebimbangan keselamatan  
7. **Penambahbaikan Berterusan**: Kemas kini secara berkala senarai sekat dan corak berdasarkan ancaman yang muncul  

## Sumber Tambahan

### Panduan Keselamatan OWASP MCP
- [Panduan Keselamatan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP komprehensif dengan pelaksanaan Azure  
- [MCP06 - Suntikan Prompt](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Corak mitigasi suntikan prompt yang terperinci  
- [Bengkel MCP Security Summit](https://azure-samples.github.io/sherpa/) - Kem tangan 3: Keselamatan I/O merangkumi keselamatan kandungan  

### Dokumentasi Azure
- [Gambaran Keselamatan Kandungan Azure](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Dokumentasi Perisai Prompt](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Permulaan Pantas Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Langkah Seterusnya

- Kembali ke: [Gambaran Keselamatan Modul](./README.md)  
- Teruskan ke: [Modul 3: Bermula](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->