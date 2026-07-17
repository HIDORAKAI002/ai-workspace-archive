## Memulakan  

[![Bina Pelayan MCP Pertama Anda](../../../translated_images/ms/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Klik imej di atas untuk menonton video pelajaran ini)_

Bahagian ini terdiri daripada beberapa pelajaran:

- **1 Pelayan pertama anda**, dalam pelajaran pertama ini, anda akan belajar cara mencipta pelayan pertama anda dan memeriksanya dengan alat pemeriksa, satu cara yang berharga untuk menguji dan membaiki pelayan anda, [ke pelajaran](01-first-server/README.md)

- **2 Klien**, dalam pelajaran ini, anda akan belajar cara menulis klien yang boleh menyambung ke pelayan anda, [ke pelajaran](02-client/README.md)

- **3 Klien dengan LLM**, cara yang lebih baik menulis klien adalah dengan menambah LLM supaya ia boleh "berunding" dengan pelayan anda tentang apa yang perlu dilakukan, [ke pelajaran](03-llm-client/README.md)

- **4 Menggunakan mod Agent GitHub Copilot pelayan dalam Visual Studio Code**. Di sini, kita melihat menjalankan Pelayan MCP kita dari dalam Visual Studio Code, [ke pelajaran](04-vscode/README.md)

- **5 Pelayan Pengangkutan stdio** stdio adalah standard yang disyorkan untuk komunikasi antara pelayan-ke-klien MCP tempatan, menyediakan komunikasi subprocess yang selamat dengan pengasingan proses terbina dalam [ke pelajaran](05-stdio-server/README.md)

- **6 Penstriman HTTP dengan MCP (HTTP Boleh Ditstrim)**. Pelajari tentang pengangkutan penstriman HTTP moden (pendekatan yang disyorkan untuk pelayan MCP jauh menurut [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), pemberitahuan kemajuan, dan cara melaksanakan pelayan dan klien MCP masa nyata yang boleh diskalakan menggunakan HTTP Boleh Ditstrim. [ke pelajaran](06-http-streaming/README.md)

- **7 Menggunakan AI Toolkit untuk VSCode** untuk menggunakan dan menguji Klien dan Pelayan MCP anda [ke pelajaran](07-aitk/README.md)

- **8 Pengujian**. Di sini kita akan memberi fokus khusus bagaimana kita boleh menguji pelayan dan klien kita dengan pelbagai cara, [ke pelajaran](08-testing/README.md)

- **9 Penggubahan**. Bab ini akan melihat pelbagai cara mengembangkan penyelesaian MCP anda, [ke pelajaran](09-deployment/README.md)

- **10 Penggunaan pelayan lanjutan**. Bab ini meliputi penggunaan pelayan lanjutan, [ke pelajaran](./10-advanced/README.md)

- **11 Pengesahan**. Bab ini merangkumi cara menambah pengesahan mudah, dari Pengesahan Asas ke penggunaan JWT dan RBAC. Anda digalakkan untuk bermula di sini dan kemudian lihat Topik Lanjutan di Bab 5 serta melakukan pengukuhan keselamatan tambahan melalui cadangan dalam Bab 2, [ke pelajaran](./11-simple-auth/README.md)

- **12 Hos MCP**. Konfigurasikan dan gunakan klien hos MCP popular termasuk Claude Desktop, Cursor, Cline, dan Windsurf. Pelajari jenis pengangkutan dan penyelesaian masalah, [ke pelajaran](./12-mcp-hosts/README.md)

- **13 Pemeriksa MCP**. Memerois dan menguji pelayan MCP anda secara interaktif menggunakan alat Pemeriksa MCP. Pelajari cara menyelesaikan masalah alat, sumber, dan mesej protokol, [ke pelajaran](./13-mcp-inspector/README.md)

- **14 Pengambilan Sampel**. Cipta Pelayan MCP yang bekerjasama dengan klien MCP pada tugasan berkaitan LLM (ditandai sebagai lapuk dalam calon pelepasan `2026-07-28`; masih sah untuk `2025-11-25`). [ke pelajaran](./14-sampling/README.md)

- **15 Apl MCP**. Bina Pelayan MCP yang juga membalas dengan arahan UI, [ke pelajaran](./15-mcp-apps/README.md)

Protokol Konteks Model (MCP) adalah protokol terbuka yang menstandardkan bagaimana aplikasi menyediakan konteks kepada LLM. Fikirkan MCP seperti port USB-C untuk aplikasi AI - ia menyediakan cara standard untuk menyambungkan model AI ke pelbagai sumber data dan alat.

## Objektif Pembelajaran

Pada akhir pelajaran ini, anda akan mampu:

- Menyediakan persekitaran pembangunan untuk MCP dalam C#, Java, Python, TypeScript, dan JavaScript
- Membina dan mengedar pelayan MCP asas dengan ciri tersuai (sumber, kata arahan, dan alat)
- Mencipta aplikasi hos yang menyambung ke pelayan MCP
- Menguji dan membaiki pelaksanaan MCP
- Memahami cabaran penyediaan biasa dan penyelesaiannya
- Menyambungkan pelaksanaan MCP anda ke perkhidmatan LLM popular

## Menyediakan Persekitaran MCP Anda

Sebelum anda mula bekerja dengan MCP, penting untuk menyediakan persekitaran pembangunan anda dan memahami aliran kerja asas. Bahagian ini akan membimbing anda melalui langkah-langkah penyediaan awal untuk memastikan permulaan yang lancar dengan MCP.

### Prasyarat

Sebelum mendalami pembangunan MCP, pastikan anda mempunyai:

- **Persekitaran Pembangunan**: Untuk bahasa pilihan anda (C#, Java, Python, TypeScript, atau JavaScript)
- **IDE/Penyunting**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm, atau mana-mana penyunting kod moden
- **Pengurus Pakej**: NuGet, Maven/Gradle, pip, atau npm/yarn
- **Kunci API**: Untuk mana-mana perkhidmatan AI yang anda rancangkan untuk digunakan dalam aplikasi hos anda


### SDK Rasmi

Dalam bab seterusnya anda akan melihat penyelesaian dibina menggunakan Python, TypeScript, Java dan .NET. Berikut adalah semua SDK rasmi yang disokong.

MCP menyediakan SDK rasmi untuk pelbagai bahasa (selaras dengan [Spesifikasi MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Diselenggara dengan kerjasama Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Diselenggara dengan kerjasama Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Pelaksanaan TypeScript rasmi
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Pelaksanaan Python rasmi (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Pelaksanaan Kotlin rasmi
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Diselenggara dengan kerjasama Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Pelaksanaan Rust rasmi
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Pelaksanaan Go rasmi

## Perkara Penting

- Menyediakan persekitaran pembangunan MCP adalah mudah dengan SDK khusus bahasa
- Membina pelayan MCP melibatkan penciptaan dan pendaftaran alat dengan skema jelas
- Klien MCP menyambung ke pelayan dan model untuk memanfaatkan kebolehan lanjutan
- Ujian dan pembaikan adalah penting untuk pelaksanaan MCP yang boleh dipercayai
- Pilihan penggubahan merangkumi pembangunan tempatan hingga penyelesaian berasaskan awan

## Amalan

Kami mempunyai set sampel yang melengkapkan latihan yang anda akan lihat di semua bab dalam bahagian ini. Selain itu, setiap bab juga mempunyai latihan dan tugasan mereka sendiri

- [Kalkulator Java](./samples/java/calculator/README.md)
- [Kalkulator .Net](../../../03-GettingStarted/samples/csharp)
- [Kalkulator JavaScript](./samples/javascript/README.md)
- [Kalkulator TypeScript](./samples/typescript/README.md)
- [Kalkulator Python](../../../03-GettingStarted/samples/python)

## Sumber Tambahan

- [Membina Agen menggunakan Model Context Protocol di Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [MCP Jauh dengan Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [Agen MCP OpenAI .NET](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Apa seterusnya

Mulakan dengan pelajaran pertama: [Mencipta Pelayan MCP pertama anda](01-first-server/README.md)

Setelah anda selesai modul ini, teruskan ke: [Modul 4: Pelaksanaan Praktikal](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->