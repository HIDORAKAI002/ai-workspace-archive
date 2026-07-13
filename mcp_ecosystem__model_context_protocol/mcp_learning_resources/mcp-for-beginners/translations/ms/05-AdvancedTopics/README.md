# Topik Lanjutan dalam MCP

[![MCP Lanjutan: Ejen AI Amali, Boleh Skala, dan Multi-modal](../../../translated_images/ms/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klik gambar di atas untuk menonton video pelajaran ini)_

Bab ini merangkumi satu siri topik lanjutan dalam pelaksanaan Protokol Konteks Model (MCP), termasuk integrasi multi-modal, kebolehskalaan, amalan keselamatan terbaik, dan integrasi perusahaan. Topik-topik ini penting untuk membina aplikasi MCP yang kukuh dan sedia produksi yang dapat memenuhi tuntutan sistem AI moden.

## Gambaran Keseluruhan

Pelajaran ini meneroka konsep lanjutan dalam pelaksanaan Protokol Konteks Model, memberi tumpuan kepada integrasi multi-modal, kebolehskalaan, amalan keselamatan terbaik, dan integrasi perusahaan. Topik-topik ini penting untuk membina aplikasi MCP yang setaraf produksi yang mampu menangani keperluan kompleks dalam persekitaran perusahaan.

> **Melihat ke hadapan:** beberapa topik di bawah terjejas oleh calon keluaran spesifikasi MCP `2026-07-28` — Konteks Root (5.4) dan Pensampelan (5.6) dibina atas primitif yang ditandakan sebagai usang oleh calon keluaran, dan ciri Eksperimen Tugas yang dirujuk dalam Ciri Protokol (5.16) dipindahkan ke sambungan Tugas yang khusus. Lihat [Apa yang Berubah dalam MCP: Calon Keluaran 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) untuk maklumat lanjut.

## Objektif Pembelajaran

Pada akhir pelajaran ini, anda akan dapat:

- Melaksanakan keupayaan multi-modal dalam rangka kerja MCP
- Mereka bentuk seni bina MCP yang boleh diskala untuk senario permintaan tinggi
- Mengaplikasikan amalan terbaik keselamatan selaras dengan prinsip keselamatan MCP
- Mengintegrasi MCP dengan sistem dan rangka kerja AI perusahaan
- Mengoptimumkan prestasi dan kebolehpercayaan dalam persekitaran produksi

## Pelajaran dan Projek contoh

| Pautan | Tajuk | Penerangan |
|------|-------|-------------|
| [5.1 Integrasi dengan Azure](./mcp-integration/README.md) | Integrasi dengan Azure | Pelajari cara mengintegrasi Server MCP anda di Azure |
| [5.2 Contoh Multi modal](./mcp-multi-modality/README.md) | Contoh MCP Multi modal | Contoh untuk audio, imej dan respons multi modal |
| [5.3 Contoh MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Aplikasi Spring Boot minimal menunjukkan OAuth2 dengan MCP, kedua-duanya sebagai Pelayan Kebenaran dan Sumber. Menunjukkan penerbitan token yang selamat, titik akhir dilindungi, penyebaran Azure Container Apps, dan integrasi Pengurusan API. |
| [5.4 Konteks Root](./mcp-root-contexts/README.md) | Konteks root | Ketahui lebih lanjut tentang konteks root dan cara pelaksanaannya |
| [5.5 Penghalaan](./mcp-routing/README.md) | Penghalaan | Pelajari pelbagai jenis penghalaan |
| [5.6 Pensampelan](./mcp-sampling/README.md) | Pensampelan | Pelajari cara bekerja dengan pensampelan |
| [5.7 Kebolehskalaan](./mcp-scaling/README.md) | Kebolehskalaan | Pelajari tentang kebolehskalaan |
| [5.8 Keselamatan](./mcp-security/README.md) | Keselamatan | Amankan Server MCP anda |
| [5.9 Contoh Carian Web](./web-search-mcp/README.md) | Carian Web MCP | Pelayan dan klien MCP Python yang mengintegrasi dengan SerpAPI untuk carian web, berita, produk masa nyata, dan soal jawab. Menunjukkan orkestra pelbagai alat, integrasi API luaran, dan pengendalian ralat yang kukuh. |
| [5.10 Penstriman Masa Nyata](./mcp-realtimestreaming/README.md) | Penstriman | Penstriman data masa nyata telah menjadi penting dalam dunia yang dipacu data hari ini, di mana perniagaan dan aplikasi memerlukan akses segera ke maklumat untuk membuat keputusan tepat pada masanya.|
| [5.11 Carian Web Masa Nyata](./mcp-realtimesearch/README.md) | Carian Web | Carian web masa nyata bagaimana MCP mengubah carian web masa nyata dengan menyediakan pendekatan piawai untuk pengurusan konteks merentasi model AI, enjin carian, dan aplikasi.| 
| [5.12 Pengesahan Entra ID untuk Pelayan Protokol Konteks Model](./mcp-security-entra/README.md) | Pengesahan Entra ID | Microsoft Entra ID menyediakan penyelesaian pengurusan identiti dan akses berasaskan awan yang kukuh, membantu memastikan hanya pengguna dan aplikasi yang dibenarkan boleh berinteraksi dengan server MCP anda.|
| [5.13 Integrasi Ejen Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Integrasi Microsoft Foundry | Pelajari cara mengintegrasi pelayan Protokol Konteks Model dengan ejen Microsoft Foundry, membolehkan orkestra alat yang berkuasa dan keupayaan AI perusahaan dengan sambungan sumber data luaran yang piawai.|
| [5.14 Kejuruteraan Konteks](./mcp-contextengineering/README.md) | Kejuruteraan Konteks | Peluang masa depan teknik kejuruteraan konteks untuk pelayan MCP, termasuk pengoptimuman konteks, pengurusan konteks dinamik, dan strategi untuk kejuruteraan prompt yang berkesan dalam rangka kerja MCP.|
| [5.15 Pengangkutan Khusus MCP](./mcp-transport/README.md) | Pengangkutan Khusus | Pelajari cara melaksanakan mekanisme pengangkutan khusus untuk senario komunikasi MCP yang khusus.|
| [5.16 Penyelaman Ciri-ciri Protokol](./mcp-protocol-features/README.md) | Ciri-ciri Protokol | Kuasai ciri-ciri protokol lanjutan termasuk pemberitahuan kemajuan, pembatalan permintaan, templat sumber, dan corak pengendalian ralat.|
| [5.17 Penalaran Multi-Ejen Berlawanan](./mcp-adversarial-agents/README.md) | Ejen Berlawanan | Guna dua ejen dengan posisi bertentangan, berkongsi set alat MCP tunggal, untuk menangkap halusinasi, menonjolkan kes pinggir, dan menghasilkan output yang lebih terkalibrasi melalui perbahasan berstruktur.|

> **Baru dalam Spesifikasi MCP 2025-11-25**: Spesifikasi kini merangkumi sokongan eksperimen untuk **Tugas** (operasi panjang dengan penjejakan kemajuan), **Anotasi Alat** (metadata mengenai perlakuan alat untuk keselamatan), **Pemacuan Mod URL** (meminta kandungan URL tertentu daripada klien), dan **Akar** yang dipertingkatkan (untuk pengurusan konteks ruang kerja). Lihat [carta perubahan Spesifikasi MCP](https://spec.modelcontextprotocol.io/) untuk maklumat penuh.

## Rujukan Tambahan

Untuk maklumat terkini tentang topik MCP lanjutan, rujuk kepada:
- [Dokumentasi MCP](https://modelcontextprotocol.io/)
- [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositori GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Risiko keselamatan dan mitigasi
- [Bengkel Sidang Kemuncak Keselamatan MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Latihan keselamatan secara praktikal

## Perkara Penting

- Pelaksanaan MCP multi-modal meluaskan keupayaan AI melebihi pemprosesan teks
- Kebolehskalaan penting untuk penyebaran perusahaan dan boleh ditangani melalui skala mendatar dan menegak
- Langkah keselamatan menyeluruh melindungi data dan memastikan kawalan akses yang betul
- Integrasi perusahaan dengan platform seperti Azure OpenAI dan Microsoft AI Foundry meningkatkan keupayaan MCP
- Pelaksanaan MCP lanjutan mendapat manfaat daripada seni bina yang dioptimumkan dan pengurusan sumber yang berhati-hati

## Latihan

Reka sebuah pelaksanaan MCP setaraf perusahaan untuk kes penggunaan tertentu:

1. Kenal pasti keperluan multi-modal untuk kes penggunaan anda
2. Gariskan kawalan keselamatan yang diperlukan untuk melindungi data sensitif
3. Reka seni bina yang boleh diskala yang mampu mengendalikan beban yang berubah-ubah
4. Rancang titik integrasi dengan sistem AI perusahaan
5. Dokumenkan potensi sekatan prestasi dan strategi mitigasi

## Sumber Tambahan

- [Dokumentasi Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentasi Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Apa seterusnya

Terokai pelajaran dalam modul ini bermula dengan: [5.1 Integrasi MCP](./mcp-integration/README.md)

Setelah anda tamat modul ini, teruskan ke: [Modul 6: Sumbangan Komuniti](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->