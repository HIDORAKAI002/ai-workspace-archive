# Keselamatan MCP Lanjutan dengan Azure Content Safety

> **Risiko OWASP MCP yang Ditangani**: [MCP06 - Suntikan Prompt melalui Payload Kontekstual](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety menyediakan beberapa alat berkuasa yang dapat meningkatkan keselamatan pelaksanaan MCP anda. Untuk pengalaman pelaksanaan secara praktikal, lihat [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) Kem 3: Keselamatan I/O.

## Perisai Prompt

Perisai Prompt AI Microsoft menyediakan perlindungan kukuh terhadap serangan suntikan prompt secara langsung dan tidak langsung melalui:

1. **Pengesanan Lanjutan**: Menggunakan pembelajaran mesin untuk mengenal pasti arahan berniat jahat yang tersisip dalam kandungan.
2. **Penyorotan**: Mengubah teks input bagi membantu sistem AI membezakan antara arahan sah dan input luar.
3. **Pemisah dan Penandaan Data**: Menandakan sempadan antara data yang dipercayai dan yang tidak dipercayai.
4. **Integrasi Content Safety**: Berfungsi dengan Azure AI Content Safety untuk mengesan cubaan jailbreak dan kandungan berbahaya.
5. **Kemas Kini Berterusan**: Microsoft secara berkala mengemas kini mekanisme perlindungan terhadap ancaman yang muncul.

## Melaksanakan Azure Content Safety dengan MCP

Pendekatan ini menyediakan perlindungan berlapis:
- Mengimbas input sebelum diproses
- Mengesahkan output sebelum dikembalikan
- Menggunakan senarai blok untuk corak berbahaya yang diketahui
- Memanfaatkan model keselamatan kandungan Azure yang sentiasa dikemas kini

## Sumber Azure Content Safety

Untuk mengetahui lebih lanjut mengenai pelaksanaan Azure Content Safety dengan pelayan MCP anda, rujuk sumber rasmi berikut:

1. [Dokumentasi Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Dokumentasi rasmi bagi Azure Content Safety.
2. [Dokumentasi Perisai Prompt](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Pelajari cara mencegah serangan suntikan prompt.
3. [Rujukan API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Rujukan API terperinci untuk pelaksanaan Content Safety.
4. [Panduan Mula Pantas: Azure Content Safety dengan C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Panduan pelaksanaan cepat menggunakan C#.
5. [Perpustakaan Klien Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Perpustakaan klien untuk pelbagai bahasa pengaturcaraan.
6. [Mengesan Cubaan Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Panduan khusus untuk mengesan dan mencegah cubaan jailbreak.
7. [Amalan Terbaik untuk Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Amalan terbaik untuk melaksanakan keselamatan kandungan dengan berkesan.

Untuk pelaksanaan yang lebih mendalam, lihat [Panduan Pelaksanaan Azure Content Safety](./azure-content-safety-implementation.md) kami.

## Apa Seterusnya

- Baca: [Pelaksanaan Azure Content Safety](./azure-content-safety-implementation.md)
- Kembali ke: [Gambaran Keseluruhan Modul Keselamatan](./README.md)
- Teruskan ke: [Modul 3: Memulakan](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sah. Untuk maklumat kritikal, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->