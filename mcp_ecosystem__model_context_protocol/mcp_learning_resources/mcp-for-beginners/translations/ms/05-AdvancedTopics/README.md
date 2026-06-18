# Topik Lanjutan dalam MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/ms/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klik imej di atas untuk menonton video pelajaran ini)_

Bab ini merangkumi beberapa topik lanjutan dalam pelaksanaan Model Context Protocol (MCP), termasuk integrasi multi-modal, skalabiliti, amalan keselamatan terbaik, dan integrasi perusahaan. Topik-topik ini penting untuk membina aplikasi MCP yang kukuh dan sedia produksi yang boleh memenuhi kehendak sistem AI moden.

## Gambaran Keseluruhan

Pelajaran ini meneroka konsep lanjutan dalam pelaksanaan Model Context Protocol, dengan fokus pada integrasi multi-modal, skalabiliti, amalan keselamatan terbaik, dan integrasi perusahaan. Topik-topik ini penting untuk membina aplikasi MCP bertaraf produksi yang dapat menangani keperluan kompleks dalam persekitaran perusahaan.

## Objektif Pembelajaran

Pada akhir pelajaran ini, anda akan dapat:

- Melaksanakan keupayaan multi-modal dalam rangka kerja MCP
- Mereka bentuk seni bina MCP yang skalabel untuk senario permintaan tinggi
- Mengaplikasi amalan keselamatan terbaik selaras dengan prinsip keselamatan MCP
- Mengintegrasi MCP dengan sistem dan rangka kerja AI perusahaan
- Mengoptimumkan prestasi dan kebolehpercayaan dalam persekitaran produksi

## Pelajaran dan Projek contoh

| Pautan | Tajuk | Penerangan |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrasi dengan Azure | Pelajari cara mengintegrasi MCP Server anda di Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Contoh Multi modal MCP  | Contoh untuk audio, imej dan respons multi modal |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Aplikasi Spring Boot minimal yang menunjukkan OAuth2 dengan MCP, kedua-duanya sebagai Authorization dan Resource Server. Memperagakan penerbitan token selamat, titik akhir terlindung, penyebaran Azure Container Apps, dan integrasi Pengurusan API. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Konteks Root  | Ketahui lebih lanjut tentang konteks root dan cara melaksanakannya |
| [5.5 Routing](./mcp-routing/README.md) | Penghalaan | Pelajari pelbagai jenis penghalaan |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Pelajari cara bekerja dengan sampling |
| [5.7 Scaling](./mcp-scaling/README.md) | Skalabiliti | Pelajari tentang skalabiliti |
| [5.8 Security](./mcp-security/README.md) | Keselamatan  | Amankan MCP Server anda |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Pelayan dan klien MCP Python yang mengintegrasi dengan SerpAPI untuk carian web masa nyata, berita, produk, dan Q&A. Memperagakan orkestrasi multi-alat, integrasi API luaran, dan pengendalian ralat yang kukuh. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Penstriman  | Penstriman data masa nyata telah menjadi penting dalam dunia berpandukan data hari ini, di mana perniagaan dan aplikasi memerlukan akses segera kepada maklumat untuk membuat keputusan tepat pada masanya.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Carian Web | Carian web masa nyata bagaimana MCP mengubah carian web masa nyata dengan menyediakan pendekatan standard untuk pengurusan konteks merentasi model AI, enjin carian, dan aplikasi.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Pengesahan Entra ID | Microsoft Entra ID menyediakan penyelesaian pengurusan identiti dan akses awan yang kukuh, membantu memastikan hanya pengguna dan aplikasi yang dibenarkan dapat berinteraksi dengan pelayan MCP anda.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integrasi Microsoft Foundry | Pelajari cara mengintegrasi pelayan Model Context Protocol dengan agen Microsoft Foundry, membolehkan orkestrasi alat yang mantap dan keupayaan AI perusahaan dengan sambungan sumber data luaran berstandard.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Kejuruteraan Konteks | Peluang masa depan teknik kejuruteraan konteks untuk pelayan MCP, termasuk pengoptimuman konteks, pengurusan konteks dinamik, dan strategi untuk kejuruteraan prompt yang berkesan dalam rangka kerja MCP.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Pengangkutan Khusus | Pelajari cara melaksanakan mekanisme pengangkutan khusus untuk senario komunikasi MCP yang khusus.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Ciri Protokol | Menguasai ciri protokol lanjutan termasuk notifikasi kemajuan, pembatalan permintaan, template sumber, dan pola pengendalian ralat.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Ejen Adversarial | Gunakan dua ejen dengan pendirian bertentangan, berkongsi satu set alat MCP, untuk menangkap halusinasi, memaparkan kes tepi, dan menghasilkan output yang lebih dikalibrasi melalui perbahasan berstruktur.|

> **Baru dalam Spesifikasi MCP 2025-11-25**: Spesifikasi kini merangkumi sokongan eksperimen untuk **Tugas** (operasi jangka panjang dengan penjejakan kemajuan), **Anotasi Alat** (metadata tentang tingkah laku alat untuk keselamatan), **Pemanggilan Mod URL** (meminta kandungan URL tertentu dari klien), dan **Akar** yang dipertingkatkan (untuk pengurusan konteks ruang kerja). Lihat [log perubahan Spesifikasi MCP](https://spec.modelcontextprotocol.io/) untuk maklumat penuh.

## Rujukan Tambahan

Untuk maklumat terkini mengenai topik MCP lanjutan, rujuk:
- [Dokumentasi MCP](https://modelcontextprotocol.io/)
- [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositori GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Risiko keselamatan dan mitigasi
- [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Latihan keselamatan secara praktikal

## Intipati Utama

- Pelaksanaan MCP multi-modal meluaskan keupayaan AI melampaui pemprosesan teks
- Skalabiliti penting untuk penyebaran perusahaan dan boleh diatasi melalui penskalaan mendatar dan menegak
- Langkah keselamatan menyeluruh melindungi data dan memastikan kawalan akses yang betul
- Integrasi perusahaan dengan platform seperti Azure OpenAI dan Microsoft AI Foundry meningkatkan keupayaan MCP
- Pelaksanaan MCP lanjutan mendapat manfaat daripada seni bina yang dioptimumkan dan pengurusan sumber yang teliti

## Latihan

Reka pelaksanaan MCP bertaraf perusahaan untuk kes penggunaan tertentu:

1. Kenal pasti keperluan multi-modal untuk kes penggunaan anda
2. Gariskan kawalan keselamatan yang diperlukan untuk melindungi data sensitif
3. Reka seni bina skalabel yang dapat menangani beban yang berubah-ubah
4. Rancang titik integrasi dengan sistem AI perusahaan
5. Dokumenkan potensi kesesakan prestasi dan strategi mitigasinya

## Sumber Tambahan

- [Dokumentasi Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentasi Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Apa seterusnya

Terokai pelajaran dalam modul ini bermula dengan: [5.1 MCP Integration](./mcp-integration/README.md)

Setelah anda menamatkan modul ini, teruskan ke: [Modul 6: Sumbangan Komuniti](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->