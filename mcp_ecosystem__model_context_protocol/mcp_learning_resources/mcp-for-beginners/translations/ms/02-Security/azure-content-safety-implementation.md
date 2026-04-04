# Melaksanakan Keselamatan Kandungan Azure dengan MCP

> **Risiko OWASP MCP yang Ditangani**: [MCP06 - Suntikan Prompt melalui Payload Kontekstual](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Untuk menguatkan keselamatan MCP terhadap suntikan prompt, pencemaran alat, dan kerentanan khusus AI lain, pengintegrasian Azure Content Safety sangat disyorkan. Panduan pelaksanaan ini selaras dengan [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) Kem 3: Keselamatan I/O.

## Pengintegrasian dengan Pelayan MCP

Untuk mengintegrasikan Azure Content Safety dengan pelayan MCP anda, tambahkan penapis keselamatan kandungan sebagai middleware dalam saluran pemprosesan permintaan anda:

1. Inisialisasi penapis semasa permulaan pelayan
2. Sahkan semua permintaan alat yang masuk sebelum pemprosesan
3. Periksa semua respons yang keluar sebelum mengembalikannya ke klien
4. Log dan beri amaran mengenai pelanggaran keselamatan
5. Laksanakan pengendalian ralat yang sesuai untuk kegagalan pemeriksaan keselamatan kandungan

Ini menyediakan pertahanan kukuh terhadap:
- Serangan suntikan prompt
- Percubaan pencemaran alat
- Eksfiltrasi data melalui input berbahaya
- Penjanaan kandungan berbahaya

## Amalan Terbaik untuk Pengintegrasian Azure Content Safety

1. **Senarai Hitam Tersuai**: Cipta senarai hitam tersuai khusus untuk corak suntikan MCP
2. **Pelarasan Keseriusan**: Laraskan ambang keseriusan berdasarkan kes penggunaan dan toleransi risiko anda
3. **Liputan Menyeluruh**: Gunakan pemeriksaan keselamatan kandungan untuk semua input dan output
4. **Pengoptimuman Prestasi**: Pertimbangkan pelaksanaan penimbanan untuk pemeriksaan keselamatan kandungan berulang
5. **Mekanisme Sandaran**: Tetapkan tingkah laku sandaran yang jelas apabila perkhidmatan keselamatan kandungan tidak tersedia
6. **Maklum Balas Pengguna**: Berikan maklum balas yang jelas kepada pengguna apabila kandungan disekat disebabkan kebimbangan keselamatan
7. **Penambahbaikan Berterusan**: Kemas kini secara berkala senarai hitam dan corak berdasarkan ancaman terkini

## Sumber Tambahan

### Panduan Keselamatan OWASP MCP
- [Panduan Keselamatan OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 komprehensif dengan pelaksanaan Azure
- [MCP06 - Suntikan Prompt](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Corak mitigasi suntikan prompt terperinci
- [Bengkel Sidang Kemuncak Keselamatan MCP](https://azure-samples.github.io/sherpa/) - Kem Hands-on 3: Keselamatan I/O merangkumi keselamatan kandungan

### Dokumentasi Azure
- [Gambaran Keselamatan Kandungan Azure](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentasi Pelindung Prompt](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Permulaan Pantas Keselamatan Kandungan Azure AI](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Apa Seterusnya

- Kembali ke: [Gambaran Keselamatan Modul](./README.md)
- Teruskan ke: [Modul 3: Memulakan](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->