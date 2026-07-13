# Topik Lanjutan dalam MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/id/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klik gambar di atas untuk melihat video pelajaran ini)_

Bab ini membahas serangkaian topik lanjutan dalam implementasi Model Context Protocol (MCP), termasuk integrasi multi-modal, skalabilitas, praktik terbaik keamanan, dan integrasi perusahaan. Topik-topik ini penting untuk membangun aplikasi MCP yang tangguh dan siap produksi yang dapat memenuhi tuntutan sistem AI modern.

## Ikhtisar

Pelajaran ini mengeksplorasi konsep lanjutan dalam implementasi Model Context Protocol, dengan fokus pada integrasi multi-modal, skalabilitas, praktik terbaik keamanan, dan integrasi perusahaan. Topik-topik ini esensial untuk membangun aplikasi MCP tingkat produksi yang mampu menangani kebutuhan kompleks dalam lingkungan perusahaan.

> **Melihat ke depan:** beberapa topik di bawah dipengaruhi oleh kandidat rilis spesifikasi MCP `2026-07-28` — Root Contexts (5.4) dan Sampling (5.6) dibangun di atas primitif yang ditandai sebagai deprecated oleh kandidat rilis, dan fitur eksperimental Tasks yang dirujuk dalam Protocol Features (5.16) dipindahkan ke ekstensi Tasks khusus. Lihat [Apa yang Berubah di MCP: Kandidat Rilis 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) untuk detailnya.

## Tujuan Pembelajaran

Pada akhir pelajaran ini, Anda akan dapat:

- Menerapkan kemampuan multi-modal dalam kerangka kerja MCP
- Merancang arsitektur MCP yang skalabel untuk skenario permintaan tinggi
- Menerapkan praktik terbaik keamanan yang selaras dengan prinsip keamanan MCP
- Mengintegrasikan MCP dengan sistem dan kerangka kerja AI perusahaan
- Mengoptimalkan kinerja dan keandalan di lingkungan produksi

## Pelajaran dan Proyek Contoh

| Link | Judul | Deskripsi |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrasi dengan Azure | Pelajari cara mengintegrasikan Server MCP Anda di Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Contoh Multi modal MCP | Contoh untuk audio, gambar, dan respons multi modal |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Aplikasi Spring Boot minimal yang menunjukkan OAuth2 dengan MCP, baik sebagai Server Otorisasi dan Resource Server. Menunjukkan penerbitan token yang aman, endpoint terlindungi, deployment Azure Container Apps, dan integrasi Manajemen API. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts | Pelajari lebih lanjut tentang root context dan cara mengimplementasikannya |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Pelajari berbagai jenis routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Pelajari cara bekerja dengan sampling |
| [5.7 Scaling](./mcp-scaling/README.md) | Skalabilitas | Pelajari tentang skalabilitas |
| [5.8 Security](./mcp-security/README.md) | Keamanan | Amankan Server MCP Anda |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Pencarian Web MCP | Server dan klien MCP Python yang mengintegrasikan dengan SerpAPI untuk pencarian web, berita, produk, dan tanya jawab secara real-time. Menunjukkan orkestrasi multi-tool, integrasi API eksternal, dan penanganan kesalahan yang tangguh. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Streaming data real-time telah menjadi sangat penting di dunia yang didorong oleh data saat ini, di mana bisnis dan aplikasi membutuhkan akses langsung ke informasi untuk membuat keputusan tepat waktu. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Pencarian Web | Pencarian web real-time bagaimana MCP mengubah pencarian web real-time dengan menyediakan pendekatan standar untuk manajemen konteks di seluruh model AI, mesin pencari, dan aplikasi. | 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Autentikasi Entra ID | Microsoft Entra ID menyediakan solusi manajemen identitas dan akses cloud yang kuat, membantu memastikan hanya pengguna dan aplikasi yang berwenang dapat berinteraksi dengan server MCP Anda. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integrasi Microsoft Foundry | Pelajari cara mengintegrasikan server Model Context Protocol dengan agen Microsoft Foundry, memungkinkan orkestrasi alat yang kuat dan kemampuan AI perusahaan dengan koneksi sumber data eksternal yang standar. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Rekayasa Konteks | Peluang masa depan teknik rekayasa konteks untuk server MCP, termasuk optimisasi konteks, manajemen konteks dinamis, dan strategi rekayasa prompt yang efektif dalam kerangka kerja MCP. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Transportasi Kustom | Pelajari cara mengimplementasikan mekanisme transportasi kustom untuk skenario komunikasi MCP yang khusus. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Fitur Protokol | Kuasai fitur protokol lanjutan termasuk notifikasi kemajuan, pembatalan permintaan, template sumber daya, dan pola penanganan kesalahan. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agen Adversarial | Gunakan dua agen dengan posisi berlawanan, berbagi satu set alat MCP, untuk menangkap halusinasi, menampilkan kasus batas, dan menghasilkan keluaran yang lebih terkalibrasi melalui debat terstruktur. |

> **Baru di Spesifikasi MCP 2025-11-25**: Spesifikasi sekarang mencakup dukungan eksperimental untuk **Tasks** (operasi jangka panjang dengan pelacakan kemajuan), **Tool Annotations** (metadata tentang perilaku alat untuk keamanan), **URL Mode Elicitation** (meminta konten URL tertentu dari klien), dan **Roots** yang ditingkatkan (untuk manajemen konteks workspace). Lihat [catatan perubahan Spesifikasi MCP](https://spec.modelcontextprotocol.io/) untuk detail lengkap.

## Referensi Tambahan

Untuk informasi terbaru tentang topik MCP lanjutan, rujuk ke:
- [Dokumentasi MCP](https://modelcontextprotocol.io/)
- [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositori GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Risiko keamanan dan mitigasinya
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Pelatihan keamanan langsung

## Ringkasan Penting

- Implementasi MCP multi-modal memperluas kemampuan AI di luar pemrosesan teks
- Skalabilitas sangat penting untuk deployment perusahaan dan dapat diatasi melalui skalabilitas horizontal dan vertikal
- Langkah keamanan komprehensif melindungi data dan memastikan kontrol akses yang tepat
- Integrasi perusahaan dengan platform seperti Azure OpenAI dan Microsoft AI Foundry meningkatkan kemampuan MCP
- Implementasi MCP lanjutan mendapatkan manfaat dari arsitektur yang dioptimalkan dan manajemen sumber daya yang hati-hati

## Latihan

Rancang implementasi MCP tingkat perusahaan untuk kasus penggunaan tertentu:

1. Identifikasi kebutuhan multi-modal untuk kasus penggunaan Anda
2. Garis besar kontrol keamanan yang diperlukan untuk melindungi data sensitif
3. Rancang arsitektur yang skalabel yang dapat menangani beban yang bervariasi
4. Rencanakan titik integrasi dengan sistem AI perusahaan
5. Dokumentasikan potensi hambatan kinerja dan strategi mitigasinya

## Sumber Daya Tambahan

- [Dokumentasi Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentasi Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Selanjutnya

Jelajahi pelajaran dalam modul ini mulai dari: [5.1 MCP Integration](./mcp-integration/README.md)

Setelah Anda menyelesaikan modul ini, lanjutkan ke: [Modul 6: Kontribusi Komunitas](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->