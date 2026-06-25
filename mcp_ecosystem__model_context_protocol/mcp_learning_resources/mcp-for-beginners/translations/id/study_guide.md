# Model Context Protocol (MCP) untuk Pemula - Panduan Belajar

Panduan belajar ini memberikan gambaran tentang struktur dan isi repositori untuk kurikulum "Model Context Protocol (MCP) untuk Pemula". Gunakan panduan ini untuk menavigasi repositori secara efisien dan memanfaatkan sumber daya yang tersedia sebaik mungkin.

## Gambaran Umum Repositori

Model Context Protocol (MCP) adalah kerangka kerja standar untuk interaksi antara model AI dan aplikasi klien. Awalnya dibuat oleh Anthropic, MCP kini dikelola oleh komunitas MCP yang lebih luas melalui organisasi GitHub resmi. Repositori ini menyediakan kurikulum komprehensif dengan contoh kode langsung dalam C#, Java, JavaScript, Python, dan TypeScript, yang dirancang untuk pengembang AI, arsitek sistem, dan insinyur perangkat lunak.

## Peta Kurikulum Visual

```mermaid
mindmap
  root((MCP untuk Pemula))
    00. Pengenalan
      ::icon(fa fa-book)
      (Gambaran Protokol)
      (Manfaat Standarisasi)
      (Kasus Penggunaan Dunia Nyata)
      (Fundamental Integrasi AI)
    01. Konsep Inti
      ::icon(fa fa-puzzle-piece)
      (Arsitektur Klien-Server)
      (Komponen Protokol)
      (Pola Pesan)
      (Mekanisme Transportasi)
      (Tugas - Eksperimental)
      (Anotasi Alat)
    02. Keamanan
      ::icon(fa fa-shield)
      (Ancaman Khusus AI)
      (Praktik Terbaik 2025)
      (Keamanan Konten Azure)
      (Otentikasi & Otorisasi)
      (Perlindungan Prompt Microsoft)
      (OWASP MCP Top 10)
      (Workshop Keamanan Sherpa)
    03. Memulai
      ::icon(fa fa-rocket)
      (Implementasi Server Pertama)
      (Pengembangan Klien)
      (Integrasi Klien LLM)
      (Ekstensi VS Code)
      (Pengaturan Server SSE)
      (Streaming HTTP)
      (Integrasi Toolkit AI)
      (Kerangka Pengujian)
      (Penggunaan Server Lanjutan)
      (Otentikasi Sederhana)
      (Strategi Penyebaran)
      (Pengaturan Host MCP)
      (Inspektur MCP)
    04. Implementasi Praktis
      ::icon(fa fa-code)
      (SDK Multi-Bahasa)
      (Pengujian & Debugging)
      (Template Prompt)
      (Proyek Contoh)
      (Pola Produksi)
      (Strategi Paginasi)
    05. Topik Lanjutan
      ::icon(fa fa-graduation-cap)
      (Rekayasa Konteks)
      (Integrasi Agen Foundry)
      (Alur Kerja AI Multi-modal)
      (Otentikasi OAuth2)
      (Pencarian Waktu Nyata)
      (Protokol Streaming)
      (Konteks Akar)
      (Strategi Routing)
      (Teknik Sampling)
      (Solusi Skala)
      (Penguatan Keamanan)
      (Integrasi Entra ID)
      (Pencarian Web MCP)
      (Pendalaman Fitur Protokol)
      (Penalaran Multi-Agen Adversarial)
      
    06. Komunitas
      ::icon(fa fa-users)
      (Kontribusi Kode)
      (Dokumentasi)
      (Ekosistem Klien MCP)
      (Registri Server MCP)
      (Alat Pembuat Gambar)
      (Kolaborasi GitHub)
    07. Adopsi Awal
      ::icon(fa fa-lightbulb)
      (Penyebaran Produksi)
      (Server MCP Microsoft)
      (Layanan MCP Azure)
      (Studi Kasus Perusahaan)
      (Peta Jalan Masa Depan)
    08. Praktik Terbaik
      ::icon(fa fa-check)
      (Optimasi Kinerja)
      (Toleransi Kesalahan)
      (Ketahanan Sistem)
      (Pemantauan & Observabilitas)
    09. Studi Kasus
      ::icon(fa fa-file-text)
      (Manajemen API Azure)
      (Agen Perjalanan AI)
      (Integrasi Azure DevOps)
      (Dokumentasi MCP)
      (Registri MCP GitHub)
      (Integrasi VS Code)
      (Implementasi Dunia Nyata)
    10. Workshop Praktis
      ::icon(fa fa-laptop)
      (Dasar-dasar Server MCP)
      (Pengembangan Lanjutan)
      (Integrasi Toolkit AI)
      (Penyebaran Produksi)
      (Struktur 4-Lab)
    11. Lab Integrasi Database
      ::icon(fa fa-database)
      (Integrasi PostgreSQL)
      (Kasus Penggunaan Analitik Ritel)
      (Keamanan Tingkat Baris)
      (Pencarian Semantik)
      (Penyebaran Produksi)
      (Struktur 13-Lab)
      (Pembelajaran Praktis)
    12. Peralatan
      ::icon(fa fa-wrench)
      (MCP di aplikasi Copilot)
```

## Struktur Repositori

Repositori ini diorganisasikan ke dalam dua belas bagian utama, masing-masing fokus pada aspek MCP yang berbeda:

1. **Pendahuluan (00-Introduction/)**
   - Gambaran Model Context Protocol
   - Mengapa standarisasi penting dalam pipeline AI
   - Kasus penggunaan praktis dan manfaatnya

2. **Konsep Inti (01-CoreConcepts/)**
   - Arsitektur klien-server
   - Komponen utama protokol
   - Pola pesan dalam MCP

3. **Keamanan (02-Security/)**
   - Ancaman keamanan dalam sistem berbasis MCP
   - Praktik terbaik untuk mengamankan implementasi
   - Strategi autentikasi dan otorisasi
   - **Dokumentasi Keamanan Komprehensif**:
     - Praktik Terbaik Keamanan MCP 2025
     - Panduan Implementasi Azure Content Safety
     - Kontrol dan Teknik Keamanan MCP
     - Referensi Cepat Praktik Terbaik MCP
   - **Topik Keamanan Utama**:
     - Serangan injection prompt dan poisoning alat
     - Pembajakan sesi dan masalah confused deputy
     - Kerentanan token passthrough
     - Izin berlebihan dan kontrol akses
     - Keamanan rantai pasok untuk komponen AI
     - Integrasi Microsoft Prompt Shields

4. **Memulai (03-GettingStarted/)**
   - Pengaturan dan konfigurasi lingkungan
   - Membuat server dan klien MCP dasar
   - Integrasi dengan aplikasi yang sudah ada
   - Mencakup bagian-bagian untuk:
     - Implementasi server pertama
     - Pengembangan klien
     - Integrasi klien LLM
     - Integrasi VS Code
     - Server-Sent Events (SSE) server
     - Penggunaan server lanjutan
     - Streaming HTTP
     - Integrasi AI Toolkit
     - Strategi pengujian
     - Panduan deployment

5. **Implementasi Praktis (04-PracticalImplementation/)**
   - Menggunakan SDK di berbagai bahasa pemrograman
   - Teknik debugging, pengujian, dan validasi
   - Membuat template prompt dan alur kerja yang dapat digunakan ulang
   - Proyek contoh dengan contoh implementasi

6. **Topik Lanjutan (05-AdvancedTopics/)**
   - Teknik rekayasa konteks
   - Integrasi agen Foundry
   - Alur kerja AI multi-modal
   - Demo autentikasi OAuth2
   - Kemampuan pencarian real-time
   - Streaming real-time
   - Implementasi root contexts
   - Strategi routing
   - Teknik sampling
   - Pendekatan scaling
   - Pertimbangan keamanan
   - Integrasi keamanan Entra ID
   - Integrasi pencarian web
   - Penalaran multi-agen advesarial (pola debat)

7. **Kontribusi Komunitas (06-CommunityContributions/)**
   - Cara berkontribusi kode dan dokumentasi
   - Kolaborasi melalui GitHub
   - Peningkatan yang digerakkan komunitas dan umpan balik
   - Menggunakan berbagai klien MCP (Claude Desktop, Cline, VSCode)
   - Bekerja dengan server MCP populer termasuk generasi gambar

8. **Pembelajaran dari Adopsi Dini (07-LessonsfromEarlyAdoption/)**
   - Implementasi dunia nyata dan kisah sukses
   - Membangun dan menerapkan solusi berbasis MCP
   - Tren dan roadmap masa depan
   - **Panduan Server MCP Microsoft**: Panduan komprehensif untuk 10 server MCP Microsoft siap produksi termasuk:
     - Microsoft Learn Docs MCP Server
     - Azure MCP Server (15+ konektor khusus)
     - GitHub MCP Server
     - Azure DevOps MCP Server
     - MarkItDown MCP Server
     - SQL Server MCP Server
     - Playwright MCP Server
     - Dev Box MCP Server
     - Microsoft Foundry MCP Server
     - Microsoft 365 Agents Toolkit MCP Server

9. **Praktik Terbaik (08-BestPractices/)**
   - Penyetelan performa dan optimasi
   - Merancang sistem MCP tahan kesalahan
   - Strategi pengujian dan ketahanan

10. **Studi Kasus (09-CaseStudy/)**
    - **Tujuh studi kasus komprehensif** yang menunjukkan fleksibilitas MCP di berbagai skenario:
    - **Azure AI Travel Agents**: Orkestrasi multi-agen dengan Azure OpenAI dan AI Search
    - **Integrasi Azure DevOps**: Otomasi proses alur kerja dengan pembaruan data YouTube
    - **Pengambilan Dokumentasi Real-Time**: Klien konsol Python dengan streaming HTTP
    - **Generator Rencana Studi Interaktif**: Aplikasi web Chainlit dengan AI percakapan
    - **Dokumentasi Dalam Editor**: Integrasi VS Code dengan alur kerja GitHub Copilot
    - **Manajemen API Azure**: Integrasi API perusahaan dengan pembuatan server MCP
    - **Registri MCP GitHub**: Pengembangan ekosistem dan platform integrasi agensik
    - Contoh implementasi mencakup integrasi perusahaan, produktivitas pengembang, dan pengembangan ekosistem

11. **Workshop Praktis (10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/)**
    - Workshop praktis komprehensif yang menggabungkan MCP dengan AI Toolkit
    - Membangun aplikasi cerdas yang menjembatani model AI dengan alat dunia nyata
    - Modul praktis yang mencakup dasar-dasar, pengembangan server khusus, dan strategi deployment produksi
    - **Struktur Lab**:
      - Lab 1: Dasar-dasar Server MCP
      - Lab 2: Pengembangan Server MCP Lanjutan
      - Lab 3: Integrasi AI Toolkit
      - Lab 4: Deployment Produksi dan Scaling
    - Pendekatan pembelajaran berbasis lab dengan instruksi langkah demi langkah

12. **Laboratorium Integrasi Database Server MCP (11-MCPServerHandsOnLabs/)**
    - **Jalur pembelajaran lengkap 13 lab** untuk membangun server MCP siap produksi dengan integrasi PostgreSQL
    - **Implementasi analitik ritel dunia nyata** menggunakan kasus penggunaan Zava Retail
    - **Pola kelas enterprise** termasuk Row Level Security (RLS), pencarian semantik, dan akses data multi-tenant
    - **Struktur Lab Lengkap**:
      - **Lab 00-03: Dasar** - Pendahuluan, Arsitektur, Keamanan, Pengaturan Lingkungan
      - **Lab 04-06: Membangun Server MCP** - Desain Database, Implementasi Server MCP, Pengembangan Alat
      - **Lab 07-09: Fitur Lanjutan** - Pencarian Semantik, Pengujian & Debugging, Integrasi VS Code
      - **Lab 10-12: Produksi & Praktik Terbaik** - Deployment, Monitoring, Optimasi
    - **Teknologi yang Dibahas**: Kerangka kerja FastMCP, PostgreSQL, Azure OpenAI, Azure Container Apps, Application Insights
    - **Hasil Pembelajaran**: Server MCP siap produksi, pola integrasi database, analitik berbasis AI, keamanan tingkat perusahaan

13. **Alat (12-tooling/)**
    - Pelajari cara menggunakan MCP dalam aplikasi Copilot dan alat lainnya

## Sumber Daya Tambahan

Repositori ini mencakup sumber daya pendukung:

- **Folder Gambar**: Berisi diagram dan ilustrasi yang digunakan dalam kurikulum
- **Terjemahan**: Dukungan multibahasa dengan terjemahan otomatis dokumentasi
- **Sumber MCP Resmi**:
  - [Dokumentasi MCP](https://modelcontextprotocol.io/)
  - [Spesifikasi MCP](https://spec.modelcontextprotocol.io/)
  - [Repositori MCP GitHub](https://github.com/modelcontextprotocol)

## Cara Menggunakan Repositori Ini

1. **Pembelajaran Berurutan**: Ikuti bab secara berurutan (00 sampai 11) untuk pengalaman belajar yang terstruktur.
2. **Fokus Bahasa Spesifik**: Jika Anda tertarik pada bahasa pemrograman tertentu, jelajahi direktori contoh untuk implementasi dalam bahasa pilihan Anda.
3. **Implementasi Praktis**: Mulailah dengan bagian "Memulai" untuk menyiapkan lingkungan Anda dan membuat server serta klien MCP pertama Anda.
4. **Eksplorasi Lanjutan**: Setelah nyaman dengan dasar, dalami topik lanjutan untuk memperluas pengetahuan.
5. **Keterlibatan Komunitas**: Bergabunglah dengan komunitas MCP melalui diskusi GitHub dan saluran Discord untuk terhubung dengan pakar dan sesama pengembang.

## Klien dan Alat MCP

Kurikulum mencakup berbagai klien dan alat MCP:

1. **Klien Resmi**:
   - Visual Studio Code
   - MCP di Visual Studio Code
   - Claude Desktop
   - Claude di VSCode
   - Claude API

2. **Klien Komunitas**:
   - Cline (berbasis terminal)
   - Cursor (editor kode)
   - ChatMCP
   - Windsurf

3. **Alat Manajemen MCP**:
   - MCP CLI
   - MCP Manager
   - MCP Linker
   - MCP Router

## Server MCP Populer

Repositori ini memperkenalkan berbagai server MCP, termasuk:

1. **Server MCP Microsoft Resmi**:
   - Microsoft Learn Docs MCP Server
   - Azure MCP Server (15+ konektor khusus)
   - GitHub MCP Server
   - Azure DevOps MCP Server
   - MarkItDown MCP Server
   - SQL Server MCP Server
   - Playwright MCP Server
   - Dev Box MCP Server
   - Microsoft Foundry MCP Server
   - Microsoft 365 Agents Toolkit MCP Server

2. **Server Referensi Resmi**:
   - Filesystem
   - Fetch
   - Memory
   - Sequential Thinking

3. **Generasi Gambar**:
   - Azure OpenAI DALL-E 3
   - Stable Diffusion WebUI
   - Replicate

4. **Alat Pengembangan**:
   - Git MCP
   - Terminal Control
   - Code Assistant

5. **Server Spesialisasi**:
   - Salesforce
   - Microsoft Teams
   - Jira & Confluence

## Kontribusi

Repositori ini menerima kontribusi dari komunitas. Lihat bagian Kontribusi Komunitas untuk panduan tentang cara berkontribusi secara efektif ke ekosistem MCP.

----

*Panduan belajar ini terakhir diperbarui pada 5 Februari 2026, mencerminkan Spesifikasi MCP terbaru 2025-11-25 dan memberikan gambaran tentang repositori pada tanggal tersebut. Isi repositori mungkin diperbarui setelah tanggal ini.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->