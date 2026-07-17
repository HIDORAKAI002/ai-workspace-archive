## Memulai  

[![Membangun Server MCP Pertamamu](../../../translated_images/id/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Klik gambar di atas untuk melihat video pelajaran ini)_

Bagian ini terdiri dari beberapa pelajaran:

- **1 Server pertamamu**, dalam pelajaran pertama ini, kamu akan belajar bagaimana membuat server pertamamu dan memeriksanya dengan alat inspeksi, sebuah cara berharga untuk menguji dan debug servermu, [ke pelajaran](01-first-server/README.md)

- **2 Klien**, dalam pelajaran ini, kamu akan belajar cara menulis klien yang dapat terhubung ke servermu, [ke pelajaran](02-client/README.md)

- **3 Klien dengan LLM**, cara menulis klien yang lebih baik adalah dengan menambahkan LLM agar dapat "bernegosiasi" dengan server tentang apa yang harus dilakukan, [ke pelajaran](03-llm-client/README.md)

- **4 Menggunakan mode Agen GitHub Copilot server dalam Visual Studio Code**. Di sini, kita melihat menjalankan Server MCP kami dari dalam Visual Studio Code, [ke pelajaran](04-vscode/README.md)

- **5 Server Transport stdio** transport stdio adalah standar yang direkomendasikan untuk komunikasi MCP server-ke-klien lokal, menyediakan komunikasi subprocess yang aman dengan isolasi proses bawaan [ke pelajaran](05-stdio-server/README.md)

- **6 Streaming HTTP dengan MCP (Streamable HTTP)**. Pelajari tentang transport streaming HTTP modern (pendekatan yang direkomendasikan untuk server MCP jarak jauh menurut [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), notifikasi progres, dan cara mengimplementasikan server dan klien MCP real-time yang skalabel menggunakan Streamable HTTP. [ke pelajaran](06-http-streaming/README.md)

- **7 Memanfaatkan Toolkit AI untuk VSCode** untuk menggunakan dan menguji Klien dan Server MCP kamu [ke pelajaran](07-aitk/README.md)

- **8 Pengujian**. Di sini kita akan fokus khususnya pada cara kita dapat menguji server dan klien kita dengan berbagai cara, [ke pelajaran](08-testing/README.md)

- **9 Penyebaran**. Bab ini akan melihat berbagai cara penyebaran solusi MCP kamu, [ke pelajaran](09-deployment/README.md)

- **10 Penggunaan server lanjutan**. Bab ini membahas penggunaan server lanjutan, [ke pelajaran](./10-advanced/README.md)

- **11 Autentikasi**. Bab ini membahas cara menambahkan autentikasi sederhana, dari Basic Auth hingga menggunakan JWT dan RBAC. Kamu dianjurkan memulai di sini lalu melihat topik lanjutan di Bab 5 dan melakukan pengamanan tambahan melalui rekomendasi di Bab 2, [ke pelajaran](./11-simple-auth/README.md)

- **12 Host MCP**. Konfigurasikan dan gunakan klien host MCP populer termasuk Claude Desktop, Cursor, Cline, dan Windsurf. Pelajari jenis transport dan pemecahan masalah, [ke pelajaran](./12-mcp-hosts/README.md)

- **13 Inspector MCP**. Debug dan uji server MCP kamu secara interaktif menggunakan alat Inspector MCP. Pelajari cara pemecahan masalah alat, sumber daya, dan pesan protokol, [ke pelajaran](./13-mcp-inspector/README.md)

- **14 Sampling**. Buat Server MCP yang berkolaborasi dengan klien MCP pada tugas terkait LLM (dihapus di rilis kandidat `2026-07-28`; masih berlaku untuk `2025-11-25`). [ke pelajaran](./14-sampling/README.md)

- **15 Aplikasi MCP**. Bangun Server MCP yang juga membalas dengan instruksi UI, [ke pelajaran](./15-mcp-apps/README.md)

Model Context Protocol (MCP) adalah protokol terbuka yang menstandarisasi bagaimana aplikasi menyediakan konteks untuk LLM. Anggap MCP seperti port USB-C untuk aplikasi AI - menyediakan cara standar untuk menghubungkan model AI ke berbagai sumber data dan alat.

## Tujuan Pembelajaran

Pada akhir pelajaran ini, kamu akan mampu:

- Menyiapkan lingkungan pengembangan untuk MCP dalam C#, Java, Python, TypeScript, dan JavaScript
- Membangun dan menyebarkan server MCP dasar dengan fitur kustom (sumber daya, prompt, dan alat)
- Membuat aplikasi host yang terhubung ke server MCP
- Menguji dan debug implementasi MCP
- Memahami tantangan pengaturan umum beserta solusinya
- Menghubungkan implementasi MCP kamu ke layanan LLM populer

## Menyiapkan Lingkungan MCP Kamu

Sebelum mulai bekerja dengan MCP, penting untuk menyiapkan lingkungan pengembangan dan memahami alur kerja dasar. Bagian ini akan membimbing kamu melalui langkah-langkah awal setup agar kamu dapat memulai dengan MCP secara lancar.

### Prasyarat

Sebelum masuk ke pengembangan MCP, pastikan kamu memiliki:

- **Lingkungan Pengembangan**: untuk bahasa yang kamu pilih (C#, Java, Python, TypeScript, atau JavaScript)
- **IDE/Editor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm, atau editor kode modern lain
- **Pengelola Paket**: NuGet, Maven/Gradle, pip, atau npm/yarn
- **Kunci API**: untuk layanan AI apa pun yang kamu rencanakan gunakan dalam aplikasi host kamu


### SDK Resmi

Di bab-bab berikutnya kamu akan melihat solusi yang dibangun menggunakan Python, TypeScript, Java, dan .NET. Berikut semua SDK yang secara resmi didukung.

MCP menyediakan SDK resmi untuk beberapa bahasa (sesuai dengan [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [SDK C#](https://github.com/modelcontextprotocol/csharp-sdk) - Dipelihara bekerja sama dengan Microsoft
- [SDK Java](https://github.com/modelcontextprotocol/java-sdk) - Dipelihara bekerja sama dengan Spring AI
- [SDK TypeScript](https://github.com/modelcontextprotocol/typescript-sdk) - Implementasi resmi TypeScript
- [SDK Python](https://github.com/modelcontextprotocol/python-sdk) - Implementasi resmi Python (FastMCP)
- [SDK Kotlin](https://github.com/modelcontextprotocol/kotlin-sdk) - Implementasi resmi Kotlin
- [SDK Swift](https://github.com/modelcontextprotocol/swift-sdk) - Dipelihara bekerja sama dengan Loopwork AI
- [SDK Rust](https://github.com/modelcontextprotocol/rust-sdk) - Implementasi resmi Rust
- [SDK Go](https://github.com/modelcontextprotocol/go-sdk) - Implementasi resmi Go

## Poin Penting

- Menyiapkan lingkungan pengembangan MCP cukup mudah dengan SDK spesifik bahasa
- Membangun server MCP melibatkan pembuatan dan pendaftaran alat dengan skema jelas
- Klien MCP menghubungkan ke server dan model untuk memanfaatkan kemampuan tambahan
- Pengujian dan debugging penting untuk implementasi MCP yang andal
- Pilihan penyebaran bervariasi dari pengembangan lokal hingga solusi berbasis cloud

## Praktik

Kami memiliki serangkaian contoh yang melengkapi latihan yang akan kamu lihat di semua bab dalam bagian ini. Selain itu setiap bab juga memiliki latihan dan tugasnya sendiri

- [Kalkulator Java](./samples/java/calculator/README.md)
- [Kalkulator .Net](../../../03-GettingStarted/samples/csharp)
- [Kalkulator JavaScript](./samples/javascript/README.md)
- [Kalkulator TypeScript](./samples/typescript/README.md)
- [Kalkulator Python](../../../03-GettingStarted/samples/python)

## Sumber Daya Tambahan

- [Membangun Agen menggunakan Model Context Protocol di Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [MCP Jarak Jauh dengan Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [Agen MCP OpenAI .NET](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Selanjutnya

Mulailah dengan pelajaran pertama: [Membuat Server MCP Pertamamu](01-first-server/README.md)

Setelah menyelesaikan modul ini, lanjutkan ke: [Modul 4: Implementasi Praktis](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->