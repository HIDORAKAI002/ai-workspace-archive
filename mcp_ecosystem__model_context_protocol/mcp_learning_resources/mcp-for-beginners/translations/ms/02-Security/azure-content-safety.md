# Keselamatan MCP Lanjutan dengan Azure Content Safety

> **Risiko OWASP MCP Ditangani**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety menyediakan beberapa alat berkuasa yang dapat meningkatkan keselamatan pelaksanaan MCP anda. Untuk pengalaman pelaksanaan secara langsung, lihat [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Kem 3: Keselamatan I/O.

## Pelindung Prompt

Pelindung Prompt AI Microsoft menyediakan perlindungan kukuh terhadap serangan suntikan prompt secara langsung dan tidak langsung melalui:

1. **Pengesanan Lanjutan**: Menggunakan pembelajaran mesin untuk mengenal pasti arahan berniat jahat yang tertanam dalam kandungan.
2. **Penyinaran**: Mengubah teks input untuk membantu sistem AI membezakan antara arahan yang sah dan input luaran.
3. **Penanda Sempadan dan Penandaan Data**: Menanda sempadan antara data yang dipercayai dan tidak dipercayai.
4. **Integrasi Content Safety**: Bekerjasama dengan Azure AI Content Safety untuk mengesan cubaan jailbreak dan kandungan berbahaya.
5. **Kemas Kini Berterusan**: Microsoft secara berkala mengemas kini mekanisme perlindungan terhadap ancaman yang muncul.

## Melaksanakan Azure Content Safety dengan MCP

Pendekatan ini menyediakan perlindungan berlapis-lapis:
- Mengimbas input sebelum diproses
- Mengesahkan output sebelum dipulangkan
- Menggunakan senarai blok untuk corak yang diketahui berbahaya
- Memanfaatkan model keselamatan kandungan Azure yang dikemas kini secara berterusan

## Sumber Azure Content Safety

Untuk mengetahui lebih lanjut tentang pelaksanaan Azure Content Safety dengan pelayan MCP anda, rujuk sumber rasmi berikut:

1. [Dokumentasi Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Dokumentasi rasmi untuk Azure Content Safety.
2. [Dokumentasi Pelindung Prompt](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Pelajari cara mencegah serangan suntikan prompt.
3. [Rujukan API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Rujukan API terperinci untuk melaksanakan Content Safety.
4. [Permulaan Pantas: Azure Content Safety dengan C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Panduan pelaksanaan cepat menggunakan C#.
5. [Perpustakaan Klien Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Perpustakaan klien untuk pelbagai bahasa pengaturcaraan.
6. [Mengesan Cubaan Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Panduan khusus untuk mengesan dan mencegah cubaan jailbreak.
7. [Amalan Terbaik untuk Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Amalan terbaik untuk melaksanakan keselamatan kandungan dengan berkesan.

Untuk pelaksanaan yang lebih mendalam, lihat [panduan Pelaksanaan Azure Content Safety](./azure-content-safety-implementation.md).

## Apa Seterusnya

- Baca: [Pelaksanaan Azure Content Safety](./azure-content-safety-implementation.md)
- Kembali ke: [Gambaran Keseluruhan Modul Keselamatan](./README.md)
- Teruskan ke: [Modul 3: Memulakan](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->