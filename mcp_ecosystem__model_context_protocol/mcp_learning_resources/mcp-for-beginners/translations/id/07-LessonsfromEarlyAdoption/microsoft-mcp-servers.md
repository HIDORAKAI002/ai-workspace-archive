# 🚀 10 Server MCP Microsoft yang Mengubah Produktivitas Pengembang

## 🎯 Apa yang Akan Anda Pelajari di Panduan Ini

Panduan praktis ini menampilkan sepuluh server MCP Microsoft yang secara aktif mengubah cara pengembang bekerja dengan asisten AI. Alih-alih hanya menjelaskan apa yang server MCP *dapat* lakukan, kami akan menunjukkan server yang sudah membuat perbedaan nyata dalam alur kerja pengembangan sehari-hari di Microsoft dan di luar itu.

Setiap server dalam panduan ini dipilih berdasarkan penggunaan dunia nyata dan umpan balik pengembang. Anda akan menemukan tidak hanya apa yang dilakukan setiap server, tetapi mengapa itu penting dan bagaimana memanfaatkannya secara maksimal dalam proyek Anda sendiri. Baik Anda benar-benar baru dengan MCP atau ingin memperluas pengaturan yang sudah ada, server ini mewakili beberapa alat yang paling praktis dan berdampak tersedia dalam ekosistem Microsoft.

> **💡 Tips Memulai Cepat**
> 
> Baru dengan MCP? Jangan khawatir! Panduan ini dirancang ramah pemula. Kami akan menjelaskan konsep saat kita berjalan, dan Anda selalu dapat merujuk kembali ke [Pengantar MCP](../00-Introduction/README.md) dan modul [Konsep Inti](../01-CoreConcepts/README.md) untuk latar belakang yang lebih dalam.

## Ikhtisar

Panduan komprehensif ini mengeksplorasi sepuluh server MCP Microsoft yang merevolusi cara pengembang berinteraksi dengan asisten AI dan alat eksternal. Dari pengelolaan sumber daya Azure hingga pemrosesan dokumen, server-server ini menunjukkan kekuatan Protokol Konteks Model dalam menciptakan alur kerja pengembangan yang mulus dan produktif.

## Tujuan Pembelajaran

Pada akhir panduan ini, Anda akan:
- Memahami bagaimana server MCP meningkatkan produktivitas pengembang
- Mempelajari implementasi server MCP paling berdampak dari Microsoft
- Menemukan kasus penggunaan praktis untuk setiap server
- Mengetahui cara mengatur dan mengonfigurasi server ini di VS Code dan Visual Studio
- Mengeksplorasi ekosistem MCP yang lebih luas dan arah masa depan

## 🔧 Memahami Server MCP: Panduan untuk Pemula

### Apa Itu Server MCP?

Sebagai pemula pada Protokol Konteks Model (MCP), Anda mungkin bertanya: "Apa sebenarnya server MCP, dan mengapa saya harus peduli?" Mari mulai dengan analogi sederhana.

Anggap server MCP seperti asisten khusus yang membantu pendamping AI pengkodean Anda (seperti GitHub Copilot) tersambung ke alat dan layanan eksternal. Sama seperti Anda menggunakan aplikasi berbeda di ponsel untuk tugas yang berbeda—satu untuk cuaca, satu untuk navigasi, satu untuk perbankan—server MCP memberikan kemampuan kepada asisten AI Anda untuk berinteraksi dengan berbagai alat dan layanan pengembangan.

### Masalah yang Dipecahkan Server MCP

Sebelum ada server MCP, jika Anda ingin:
- Memeriksa sumber daya Azure Anda
- Membuat isu GitHub
- Menanyakan database Anda
- Mencari melalui dokumentasi

Anda harus berhenti mengkode, membuka browser, menuju situs yang sesuai, dan melakukan tugas-tugas tersebut secara manual. Pergantian konteks yang terus menerus ini mengganggu alur kerja dan menurunkan produktivitas.

### Bagaimana Server MCP Mengubah Pengalaman Pengembangan Anda

Dengan server MCP, Anda dapat tetap berada di lingkungan pengembangan Anda (VS Code, Visual Studio, dll.) dan cukup meminta asisten AI Anda menangani tugas-tugas tersebut. Misalnya:

**Daripada alur kerja tradisional ini:**
1. Berhenti mengkode
2. Buka browser
3. Arahkan ke portal Azure
4. Cari detail akun penyimpanan
5. Kembali ke VS Code
6. Lanjutkan mengkode

**Sekarang Anda dapat melakukan ini:**
1. Tanyakan pada AI: "Apa status akun penyimpanan Azure saya?"
2. Lanjutkan mengkode dengan informasi yang diberikan

### Manfaat Utama untuk Pemula

#### 1. 🔄 **Tetap dalam Keadaan Mengalir**
- Tidak perlu berpindah antar beberapa aplikasi
- Fokus tetap pada kode yang Anda tulis
- Mengurangi beban mental mengelola alat yang berbeda

#### 2. 🤖 **Gunakan Bahasa Alami Alih-alih Perintah Kompleks**
- Daripada menghafal sintaks SQL, jelaskan data apa yang Anda butuhkan
- Daripada mengingat perintah Azure CLI, jelaskan apa yang ingin Anda capai
- Biarkan AI menangani detail teknis sementara Anda fokus pada logika

#### 3. 🔗 **Hubungkan Berbagai Alat Bersama-sama**
- Buat alur kerja yang kuat dengan menggabungkan layanan yang berbeda
- Contoh: "Dapatkan semua isu GitHub terbaru dan buat kerja item Azure DevOps yang sesuai"
- Bangun otomatisasi tanpa menulis skrip kompleks

#### 4. 🌐 **Akses Ekosistem yang Berkembang**
- Manfaatkan server yang dibuat oleh Microsoft, GitHub, dan perusahaan lain
- Gabungkan alat dari berbagai vendor dengan mulus
- Bergabung dengan ekosistem standar yang bekerja di berbagai asisten AI

#### 5. 🛠️ **Belajar dengan Cara Praktik**
- Mulai dengan server yang sudah dibuat untuk memahami konsepnya
- Secara bertahap bangun server Anda sendiri saat semakin nyaman
- Gunakan SDK dan dokumentasi yang tersedia sebagai panduan belajar

### Contoh Dunia Nyata untuk Pemula

Misalkan Anda baru dalam pengembangan web dan mengerjakan proyek pertama Anda. Begini bagaimana server MCP dapat membantu:

**Pendekatan tradisional:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**Dengan server MCP:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### Keunggulan Standar Perusahaan

MCP menjadi standar industri yang luas, yang berarti:
- **Konsistensi**: Pengalaman serupa di berbagai alat dan perusahaan
- **Interoperabilitas**: Server dari vendor berbeda bekerja bersama
- **Masa depan terjamin**: Keterampilan dan pengaturan dapat dipindahkan antar asisten AI
- **Komunitas**: Ekosistem besar dengan pengetahuan dan sumber daya yang dibagikan

### Memulai: Apa yang Akan Anda Pelajari

Dalam panduan ini, kami akan mengeksplorasi 10 server MCP Microsoft yang sangat berguna untuk pengembang dari semua level. Setiap server dirancang untuk:
- Memecahkan tantangan pengembangan umum
- Mengurangi tugas berulang
- Meningkatkan kualitas kode
- Memperluas peluang pembelajaran

> **💡 Tips Belajar**
> 
> Jika Anda benar-benar baru dengan MCP, mulai dengan modul [Pengantar MCP](../00-Introduction/README.md) dan [Konsep Inti](../01-CoreConcepts/README.md) terlebih dahulu. Kemudian kembali ke sini untuk melihat konsep tersebut beraksi dengan alat Microsoft nyata.
>
> Untuk konteks tambahan tentang pentingnya MCP, lihat posting Maria Naggaga: [Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).

## Memulai dengan MCP di VS Code dan Visual Studio 🚀

Mengatur server MCP ini mudah jika Anda menggunakan Visual Studio Code atau Visual Studio 2022 dengan GitHub Copilot.

### Pengaturan VS Code

Berikut proses dasar untuk VS Code:

1. **Aktifkan Mode Agen**: Di VS Code, beralih ke mode Agen pada jendela Copilot Chat
2. **Konfigurasikan Server MCP**: Tambahkan konfigurasi server ke file settings.json VS Code Anda
3. **Mulai Server**: Klik tombol "Start" untuk setiap server yang ingin Anda pakai
4. **Pilih Alat**: Pilih server MCP mana yang diaktifkan untuk sesi Anda saat ini

Untuk instruksi pengaturan rinci, lihat [dokumentasi MCP VS Code](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 Tips Pro: Kelola Server MCP seperti Profesional!**
> 
> Tampilan Extensions VS Code kini menyertakan [antarmuka baru praktis untuk mengelola Server MCP yang terpasang](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! Anda memiliki akses cepat untuk memulai, menghentikan, dan mengelola semua Server MCP yang terpasang menggunakan antarmuka yang jelas dan sederhana. Coba sekarang!

### Pengaturan Visual Studio 2022

Untuk Visual Studio 2022 (versi 17.14 atau lebih baru):

1. **Aktifkan Mode Agen**: Klik dropdown "Ask" di jendela GitHub Copilot Chat dan pilih "Agent"
2. **Buat File Konfigurasi**: Buat file `.mcp.json` di direktori solusi Anda (lokasi yang disarankan: `<SOLUTIONDIR>\.mcp.json`)
3. **Konfigurasikan Server**: Tambahkan konfigurasi server MCP Anda menggunakan format MCP standar
4. **Persetujuan Alat**: Ketika diminta, setujui alat yang ingin Anda gunakan dengan izin lingkup yang sesuai

Untuk instruksi pengaturan Visual Studio lebih rinci, lihat [dokumentasi MCP Visual Studio](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

Setiap server MCP memiliki persyaratan konfigurasi sendiri (string koneksi, autentikasi, dll.), namun pola pengaturannya konsisten di kedua IDE.

## Pelajaran dari Server MCP Microsoft 🛠️

### 1. 📚 Server MCP Microsoft Learn Docs

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Apa yang dilakukannya**: Server MCP Microsoft Learn Docs adalah layanan berbasis cloud yang memberikan asisten AI akses waktu-nyata ke dokumentasi resmi Microsoft melalui Protokol Konteks Model. Ia tersambung ke `https://learn.microsoft.com/api/mcp` dan memungkinkan pencarian semantik di seluruh Microsoft Learn, dokumentasi Azure, dokumentasi Microsoft 365, dan sumber resmi Microsoft lainnya.

**Mengapa berguna**: Meskipun tampak seperti "hanya dokumentasi," server ini sebenarnya krusial bagi setiap pengembang yang menggunakan teknologi Microsoft. Salah satu keluhan terbesar dari pengembang .NET tentang asisten pengkodean AI adalah bahwa mereka tidak up to date dengan rilis .NET dan C# terbaru. Server MCP Microsoft Learn Docs mengatasi ini dengan menyediakan akses waktu-nyata ke dokumentasi terkini, referensi API, dan praktik terbaik. Baik Anda bekerja dengan SDK Azure terbaru, menjelajahi fitur-fitur C# 13 baru, atau mengimplementasikan pola .NET Aspire terbaru, server ini memastikan asisten AI Anda memiliki akses ke informasi otoritatif dan terbaru yang diperlukan untuk menghasilkan kode yang akurat dan modern.

**Penggunaan di dunia nyata**: "Apa perintah az cli untuk membuat aplikasi container Azure sesuai dokumentasi resmi Microsoft Learn?" atau "Bagaimana cara mengonfigurasi Entity Framework dengan dependency injection di ASP.NET Core?" Atau bagaimana dengan "Tinjau kode ini untuk memastikan sesuai dengan rekomendasi performa dalam Dokumentasi Microsoft Learn." Server ini menyediakan cakupan komprehensif di Microsoft Learn, dokumentasi Azure, dan dokumentasi Microsoft 365 menggunakan pencarian semantik tingkat lanjut untuk menemukan informasi paling relevan secara konteks. Server mengembalikan hingga 10 potongan konten berkualitas tinggi dengan judul artikel dan URL, selalu mengakses dokumentasi Microsoft terbaru saat dipublikasikan.

**Contoh unggulan**: Server ini mengekspos alat `microsoft_docs_search` yang melakukan pencarian semantik terhadap dokumentasi teknis resmi Microsoft. Setelah dikonfigurasi, Anda bisa mengajukan pertanyaan seperti "Bagaimana cara mengimplementasikan otentikasi JWT di ASP.NET Core?" dan mendapatkan jawaban resmi yang detail beserta tautan sumber. Kualitas pencarian luar biasa karena memahami konteks – bertanya tentang "containers" dalam konteks Azure akan mengembalikan dokumentasi Azure Container Instances, sementara istilah yang sama dalam konteks .NET akan mengembalikan informasi koleksi C# yang relevan.

Ini sangat berguna untuk pustaka dan kasus penggunaan yang cepat berubah atau baru diperbarui. Misalnya, dalam beberapa proyek pengkodean terbaru saya ingin memanfaatkan fitur di rilis terbaru .NET Aspire dan Microsoft.Extensions.AI. Dengan menyertakan server MCP Microsoft Learn Docs, saya dapat menggunakan tidak hanya dokumentasi API, tetapi juga panduan dan petunjuk yang baru diterbitkan.

> **💡 Tips Pro**
> 
> Bahkan model yang ramah alat perlu didorong untuk menggunakan alat MCP! Pertimbangkan menambahkan prompt sistem atau [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) seperti: "Anda memiliki akses ke `microsoft.docs.mcp` – gunakan alat ini untuk mencari dokumentasi resmi Microsoft terbaru saat menangani pertanyaan tentang teknologi Microsoft seperti C#, Azure, ASP.NET Core, atau Entity Framework."
>
> Untuk contoh bagus bagaimana ini bekerja, lihat [mode chat C# .NET Janitor](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md) dari repositori Awesome GitHub Copilot. Mode ini secara khusus memanfaatkan server MCP Microsoft Learn Docs untuk membantu membersihkan dan memodernisasi kode C# menggunakan pola dan praktik terbaik terbaru.
### 2. ☁️ Server MCP Azure
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Apa yang dilakukan**: Azure MCP Server adalah satu rangkaian lengkap dari lebih dari 15 konektor layanan Azure khusus yang membawa seluruh ekosistem Azure ke dalam alur kerja AI Anda. Ini bukan hanya sebuah server tunggal – ini adalah kumpulan kuat yang mencakup manajemen sumber daya, konektivitas database (PostgreSQL, SQL Server), analisis log Azure Monitor dengan KQL, integrasi Cosmos DB, dan banyak lagi.

**Mengapa ini berguna**: Selain hanya mengelola sumber daya Azure, server ini secara dramatis meningkatkan kualitas kode saat bekerja dengan Azure SDK. Ketika Anda menggunakan Azure MCP dalam mode Agen, itu tidak hanya membantu Anda menulis kode – tetapi membantu Anda menulis kode Azure yang *lebih baik* yang mengikuti pola otentikasi saat ini, praktik terbaik penanganan kesalahan, dan memanfaatkan fitur SDK terbaru. Alih-alih mendapat kode generik yang mungkin berhasil, Anda mendapatkan kode yang mengikuti pola yang direkomendasikan Azure untuk beban kerja produksi.

**Modul utama termasuk**:
- **🗄️ Penghubung Database**: Akses bahasa alami langsung ke Azure Database untuk PostgreSQL dan SQL Server
- **📊 Azure Monitor**: Analisis log dan wawasan operasional bertenaga KQL
- **🌐 Manajemen Sumber Daya**: Manajemen siklus hidup sumber daya Azure secara penuh
- **🔐 Otentikasi**: Pola DefaultAzureCredential dan managed identity
- **📦 Layanan Penyimpanan**: Operasi Blob Storage, Queue Storage, dan Table Storage
- **🚀 Layanan Kontainer**: Manajemen Azure Container Apps, Container Instances, dan AKS
- **Dan banyak konektor khusus lainnya**

**Penggunaan dunia nyata**: "Daftar akun penyimpanan Azure saya", "Kueri workspace Log Analytics saya untuk kesalahan dalam satu jam terakhir", atau "Bantu saya membangun aplikasi Azure menggunakan Node.js dengan otentikasi yang tepat".

**Skenario demo lengkap**: Berikut adalah walkthrough lengkap yang menunjukkan kekuatan menggabungkan Azure MCP dengan ekstensi GitHub Copilot for Azure di VS Code. Ketika Anda memiliki keduanya terpasang dan memberi prompt:

> "Buat skrip Python yang mengunggah file ke Azure Blob Storage menggunakan otentikasi DefaultAzureCredential. Skrip harus terhubung ke akun penyimpanan Azure saya yang bernama 'mycompanystorage', mengunggah ke kontainer bernama 'documents', membuat file uji dengan cap waktu saat ini untuk diunggah, menangani kesalahan dengan baik dan memberikan output informatif, mengikuti praktik terbaik Azure untuk otentikasi dan penanganan kesalahan, memasukkan komentar yang menjelaskan cara kerja otentikasi DefaultAzureCredential, serta membuat skrip terstruktur dengan fungsi dan dokumentasi yang tepat."

Azure MCP Server akan menghasilkan skrip Python lengkap siap produksi yang:
- Menggunakan SDK Azure Blob Storage terbaru dengan pola async yang tepat
- Menerapkan DefaultAzureCredential dengan penjelasan rantai fallback yang komprehensif
- Menyertakan penanganan kesalahan yang kuat dengan tipe pengecualian Azure spesifik
- Mengikuti praktik terbaik SDK Azure untuk manajemen sumber daya dan penanganan koneksi
- Menyediakan logging terperinci dan output konsol yang informatif
- Membuat skrip terstruktur dengan baik, dengan fungsi, dokumentasi, dan petunjuk tipe

Yang membuat ini luar biasa adalah tanpa Azure MCP, Anda mungkin mendapatkan kode blob storage generik yang berfungsi tetapi tidak mengikuti pola Azure terkini. Dengan Azure MCP, Anda mendapatkan kode yang memanfaatkan metode otentikasi terbaru, menangani skenario kesalahan spesifik Azure, dan mengikuti praktik yang direkomendasikan Microsoft untuk aplikasi produksi.

**Contoh unggulan**: Saya kesulitan mengingat perintah spesifik untuk CLI `az` dan `azd` untuk penggunaan ad-hoc. Selalu ada proses dua langkah bagi saya: pertama mencari sintaks, kemudian menjalankan perintah. Saya sering masuk ke portal dan mengklik di sana sini untuk menyelesaikan pekerjaan karena saya tidak mau mengakui saya tidak ingat sintaks CLI. Bisa hanya mendeskripsikan apa yang saya inginkan sangat luar biasa, dan lebih baik lagi bisa melakukannya tanpa meninggalkan IDE saya!

Ada daftar besar kasus penggunaan yang bagus di [repository Azure MCP](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server) untuk memulai Anda. Untuk panduan pengaturan komprehensif dan opsi konfigurasi lanjutan, lihat [dokumentasi resmi Azure MCP](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**Apa yang dilakukan**: GitHub MCP Server resmi menyediakan integrasi mulus dengan seluruh ekosistem GitHub, menawarkan akses jarak jauh yang di-host dan opsi deployment Docker lokal. Ini bukan hanya operasi repositori dasar – ini adalah toolkit lengkap yang mencakup manajemen GitHub Actions, alur kerja pull request, pelacakan isu, pemindaian keamanan, notifikasi, dan kemampuan otomatisasi canggih.

**Mengapa ini berguna**: Server ini mengubah cara Anda berinteraksi dengan GitHub dengan membawa pengalaman platform penuh langsung ke lingkungan pengembangan Anda. Alih-alih terus-menerus berpindah antara VS Code dan GitHub.com untuk manajemen proyek, tinjauan kode, dan pemantauan CI/CD, Anda dapat menangani semuanya melalui perintah bahasa alami sambil tetap fokus pada kode Anda.

> **ℹ️ Catatan: Jenis 'Agen' yang Berbeda**
> 
> Jangan bingung GitHub MCP Server ini dengan GitHub Coding Agent (agen AI yang dapat Anda tugaskan pada isu untuk tugas pengkodean otomatis). GitHub MCP Server bekerja dalam mode Agen VS Code untuk menyediakan integrasi API GitHub, sedangkan GitHub Coding Agent adalah fitur terpisah yang membuat pull request ketika ditugaskan ke isu GitHub.

**Kemampuan utama termasuk**:
- **⚙️ GitHub Actions**: Manajemen pipeline CI/CD lengkap, pemantauan alur kerja, dan pengelolaan artefak
- **🔀 Pull Requests**: Membuat, meninjau, menggabungkan, dan mengelola PR dengan pelacakan status komprehensif
- **🐛 Issues**: Manajemen siklus hidup isu penuh, komentar, pelabelan, dan penugasan
- **🔒 Keamanan**: Pemberitahuan pemindaian kode, deteksi rahasia, dan integrasi Dependabot
- **🔔 Notifikasi**: Manajemen notifikasi cerdas dan kontrol langganan repositori
- **📁 Manajemen Repositori**: Operasi file, manajemen cabang, dan administrasi repositori
- **👥 Kolaborasi**: Pencarian pengguna dan organisasi, manajemen tim, dan kontrol akses

**Penggunaan dunia nyata**: "Buat pull request dari cabang fitur saya", "Tunjukkan semua jalankan CI yang gagal minggu ini", "Daftar semua peringatan keamanan terbuka untuk repositori saya", atau "Temukan semua isu yang ditugaskan kepada saya di seluruh organisasi saya".

**Skenario demo lengkap**: Berikut alur kerja kuat yang mendemonstrasikan kemampuan GitHub MCP Server:

> "Saya perlu mempersiapkan review sprint kami. Tunjukkan semua pull request yang saya buat minggu ini, periksa status pipeline CI/CD kami, buat ringkasan peringatan keamanan yang perlu kami tangani, dan bantu saya membuat catatan rilis berdasarkan PR yang sudah digabung dengan label 'feature'."

GitHub MCP Server akan:
- Mengajukan kueri pull request terbaru Anda dengan informasi status terperinci
- Menganalisis jalannya alur kerja dan menyorot kegagalan atau masalah kinerja
- Mengompilasi hasil pemindaian keamanan dan memprioritaskan peringatan kritis
- Menghasilkan catatan rilis lengkap dengan mengambil informasi dari PR yang digabung
- Memberikan langkah selanjutnya yang dapat diambil untuk perencanaan sprint dan persiapan rilis

**Contoh unggulan**: Saya suka menggunakan ini untuk alur kerja tinjauan kode. Alih-alih melompat antara VS Code, notifikasi GitHub, dan halaman pull request, saya bisa mengatakan "Tunjukkan semua PR yang menunggu tinjauan saya" lalu "Tambahkan komentar ke PR #123 menanyakan tentang penanganan kesalahan di metode otentikasi." Server menangani panggilan API GitHub, menjaga konteks diskusi, dan bahkan membantu saya menyusun komentar tinjauan yang lebih konstruktif.

**Opsi otentikasi**: Server mendukung baik OAuth (mulus di VS Code) maupun Personal Access Tokens, dengan set alat yang dapat dikonfigurasi untuk mengaktifkan hanya fungsi GitHub yang Anda butuhkan. Anda dapat menjalankannya sebagai layanan jarak jauh yang di-host untuk pengaturan instan atau secara lokal via Docker untuk kontrol penuh.

> **💡 Tips Profesional**
> 
> Aktifkan hanya set alat yang Anda butuhkan dengan mengonfigurasi parameter `--toolsets` dalam pengaturan server MCP Anda untuk mengurangi ukuran konteks dan meningkatkan pemilihan alat AI. Misalnya, tambahkan `"--toolsets", "repos,issues,pull_requests,actions"` untuk alur kerja pengembangan inti, atau gunakan `"--toolsets", "notifications, security"` jika Anda terutama ingin kemampuan pemantauan GitHub.
### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**Apa yang dilakukan**: Terhubung ke layanan Azure DevOps untuk manajemen proyek komprehensif, pelacakan item kerja, manajemen pipeline build, dan operasi repositori.

**Mengapa ini berguna**: Untuk tim yang menggunakan Azure DevOps sebagai platform DevOps utama mereka, server MCP ini menghilangkan pergantian tab yang konstan antara lingkungan pengembangan Anda dan antarmuka web Azure DevOps. Anda dapat mengelola item kerja, memeriksa status build, mengkueri repositori, dan menangani tugas manajemen proyek langsung dari asisten AI Anda.

**Penggunaan dunia nyata**: "Tunjukkan semua item kerja aktif di sprint saat ini untuk proyek WebApp", "Buat laporan bug untuk masalah login yang baru saya temukan", atau "Periksa status pipeline build kami dan tunjukkan kegagalan terbaru".

**Contoh unggulan**: Anda dapat dengan mudah memeriksa status sprint tim Anda saat ini dengan kueri sederhana seperti "Tunjukkan semua item kerja aktif di sprint saat ini untuk proyek WebApp" atau "Buat laporan bug untuk masalah login yang baru saya temukan" tanpa meninggalkan lingkungan pengembangan Anda.

### 5. 📝 MarkItDown MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**Apa yang dilakukan**: MarkItDown adalah server konversi dokumen komprehensif yang mengubah berbagai format file menjadi Markdown berkualitas tinggi, dioptimalkan untuk konsumsi LLM dan alur kerja analisis teks.

**Mengapa ini berguna**: Penting untuk alur kerja dokumentasi modern! MarkItDown menangani berbagai format file yang mengesankan sambil mempertahankan struktur dokumen penting seperti heading, daftar, tabel, dan tautan. Berbeda dengan alat ekstraksi teks sederhana, ia fokus pada pemeliharaan makna semantik dan format yang bernilai baik untuk pemrosesan AI maupun keterbacaan manusia.

**Format file yang didukung**:
- **Dokumen Office**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **File Media**: Gambar (dengan metadata EXIF dan OCR), Audio (dengan metadata EXIF dan transkripsi suara)
- **Konten Web**: HTML, feed RSS, URL YouTube, halaman Wikipedia
- **Format Data**: CSV, JSON, XML, file ZIP (memproses isi secara rekursif)
- **Format Publikasi**: EPub, notebook Jupyter (.ipynb)
- **Email**: pesan Outlook (.msg)
- **Lanjutan**: Integrasi Azure Document Intelligence untuk pemrosesan PDF yang lebih baik

**Kemampuan lanjutan**: MarkItDown mendukung deskripsi gambar bertenaga LLM (jika diberikan klien OpenAI), Azure Document Intelligence untuk pemrosesan PDF yang ditingkatkan, transkripsi audio untuk konten suara, dan sistem plugin untuk memperluas ke format file lainnya.

**Penggunaan dunia nyata**: "Konversi presentasi PowerPoint ini ke Markdown untuk situs dokumentasi kami", "Ekstrak teks dari PDF ini dengan struktur heading yang benar", atau "Ubah spreadsheet Excel ini menjadi format tabel yang terbaca"

**Contoh unggulan**: Untuk mengutip [dokumentasi MarkItDown](https://github.com/microsoft/markitdown#why-markdown):

> Markdown sangat mendekati teks biasa, dengan markup atau format yang minimal, tetapi tetap menyediakan cara untuk mewakili struktur dokumen penting. LLM utama, seperti OpenAI GPT-4o, secara native "berbicara" Markdown, dan sering memasukkan Markdown ke dalam respons mereka tanpa diminta. Ini menunjukkan bahwa mereka telah dilatih pada sejumlah besar teks yang diformat Markdown, dan memahaminya dengan baik. Sebagai manfaat tambahan, konvensi Markdown juga sangat efisien dalam penggunaan token.

MarkItDown sangat bagus dalam mempertahankan struktur dokumen, yang penting untuk alur kerja AI. Misalnya, ketika mengonversi presentasi PowerPoint, ia menjaga organisasi slide dengan heading yang tepat, mengekstrak tabel sebagai tabel Markdown, menyertakan teks alt untuk gambar, dan bahkan memproses catatan pembicara. Grafik diubah menjadi tabel data yang dapat dibaca, dan Markdown yang dihasilkan mempertahankan alur logis dari presentasi asli. Ini membuatnya sempurna untuk memberi makan konten presentasi ke sistem AI atau membuat dokumentasi dari slide yang ada.
### 6. 🗃️ Server MCP SQL Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Apa yang dilakukan**: Menyediakan akses percakapan ke database SQL Server (on-premises, Azure SQL, atau Fabric)

**Mengapa ini berguna**: Mirip dengan server PostgreSQL tapi untuk ekosistem Microsoft SQL. Terhubung dengan string koneksi sederhana dan mulai bertanya dengan bahasa alami – tidak perlu lagi berganti konteks!

**Penggunaan dunia nyata**: "Temukan semua pesanan yang belum dipenuhi dalam 30 hari terakhir" diterjemahkan ke query SQL yang sesuai dan mengembalikan hasil terformat

**Contoh unggulan**: Setelah Anda mengatur koneksi database, Anda dapat mulai mengobrol dengan data Anda segera. Posting blog menampilkan ini dengan pertanyaan sederhana: "database mana yang Anda sambungkan?" Server MCP merespons dengan memanggil alat database yang tepat, menghubungkan ke instance SQL Server Anda, dan mengembalikan detail tentang koneksi database saat ini – semuanya tanpa menulis satu baris SQL pun. Server mendukung operasi database komprehensif dari manajemen skema hingga manipulasi data, semua melalui perintah bahasa alami. Untuk instruksi pengaturan lengkap dan contoh konfigurasi dengan VS Code dan Claude Desktop, lihat: [Memperkenalkan MSSQL MCP Server (Pratinjau)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).

### 7. 🎭 Server MCP Playwright

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**Apa yang dilakukan**: Memungkinkan agen AI untuk berinteraksi dengan halaman web untuk pengujian dan otomasi

> **ℹ️ Mendukung GitHub Copilot**
> 
> Server MCP Playwright mendukung Coding Agent GitHub Copilot, memberikannya kemampuan penelusuran web! [Pelajari lebih lanjut tentang fitur ini](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**Mengapa ini berguna**: Sempurna untuk pengujian otomatis yang didorong oleh deskripsi dalam bahasa alami. AI dapat menavigasi situs web, mengisi formulir, dan mengekstrak data melalui snapshot aksesibilitas terstruktur – ini sangat kuat!

**Penggunaan dunia nyata**: "Uji alur login dan verifikasi bahwa dashboard dimuat dengan benar" atau "Buat tes yang mencari produk dan memvalidasi halaman hasil" – semua tanpa perlu kode sumber aplikasi

**Contoh unggulan**: Rekan saya Debbie O'Brien telah melakukan pekerjaan luar biasa dengan Server MCP Playwright akhir-akhir ini! Misalnya, dia baru-baru ini menunjukkan bagaimana Anda bisa membuat tes Playwright lengkap tanpa harus mengakses kode sumber aplikasi. Dalam skenarionya, dia meminta Copilot membuat tes untuk aplikasi pencarian film: navigasi ke situs, cari "Garfield," dan verifikasi film muncul di hasil. MCP memulai sesi browser, menjelajahi struktur halaman menggunakan snapshot DOM, menemukan selektor yang tepat, dan menghasilkan tes TypeScript yang berfungsi penuh yang lolos pada percobaan pertama.

Yang membuat ini sangat kuat adalah menjembatani kesenjangan antara instruksi bahasa alami dan kode tes yang bisa dijalankan. Pendekatan tradisional membutuhkan penulisan tes manual atau akses kode untuk konteks. Tetapi dengan Playwright MCP, Anda dapat menguji situs eksternal, aplikasi klien, atau bekerja dalam skenario pengujian black-box di mana akses kode tidak tersedia.

### 8. 💻 Server MCP Dev Box

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Apa yang dilakukan**: Mengelola lingkungan Microsoft Dev Box melalui bahasa alami

**Mengapa ini berguna**: Menyederhanakan pengelolaan lingkungan pengembangan secara besar! Membuat, mengonfigurasi, dan mengelola lingkungan pengembangan tanpa harus mengingat perintah spesifik.

**Penggunaan dunia nyata**: "Siapkan Dev Box baru dengan SDK .NET terbaru dan konfigurasi untuk proyek kami", "Periksa status semua lingkungan pengembangan saya", atau "Buat lingkungan demo standar untuk presentasi tim kami"

**Contoh unggulan**: Saya penggemar berat menggunakan Dev Box untuk pengembangan pribadi. Momen pencerahan saya adalah ketika James Montemagno menjelaskan betapa hebatnya Dev Box untuk demo konferensi, karena ia memiliki koneksi ethernet super cepat terlepas dari wifi konferensi / hotel / pesawat yang saya gunakan saat itu. Bahkan, saya baru-baru ini berlatih demo konferensi sambil laptop saya terhubung ke hotspot ponsel saat naik bus dari Bruges ke Antwerp! Tetapi langkah saya berikutnya adalah mendalami pengelolaan tim dengan beberapa lingkungan pengembangan dan lingkungan demo standar. Dan salah satu penggunaan besar yang saya dengar dari pelanggan dan rekan kerja, tentu saja, adalah menggunakan Dev Box untuk lingkungan pengembangan yang telah dikonfigurasi sebelumnya. Dalam kedua kasus, menggunakan MCP untuk mengonfigurasi dan mengelola Dev Box memungkinkan Anda menggunakan interaksi bahasa alami, sambil tetap berada dalam lingkungan pengembangan Anda.

### 9. 🤖 Server MCP Microsoft Foundry
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**Apa yang dilakukannya**: Microsoft Foundry MCP Server menyediakan pengembang dengan akses komprehensif ke ekosistem AI Azure, termasuk katalog model, manajemen penerapan, pengindeksan pengetahuan dengan Azure AI Search, dan alat evaluasi. Server eksperimental ini menjembatani kesenjangan antara pengembangan AI dan infrastruktur AI Azure yang kuat, memudahkan pembangunan, penerapan, dan evaluasi aplikasi AI.

**Mengapa ini berguna**: Server ini mengubah cara Anda bekerja dengan layanan AI Azure dengan menghadirkan kemampuan AI tingkat perusahaan langsung ke alur kerja pengembangan Anda. Alih-alih beralih antar portal Azure, dokumentasi, dan IDE Anda, Anda dapat menemukan model, menerapkan layanan, mengelola basis pengetahuan, dan mengevaluasi kinerja AI melalui perintah bahasa alami. Ini sangat kuat untuk pengembang yang membangun aplikasi RAG (Retrieval-Augmented Generation), mengelola penerapan multi-model, atau mengimplementasikan pipeline evaluasi AI yang komprehensif.

**Kemampuan utama untuk pengembang**:
- **🔍 Penemuan & Penerapan Model**: Jelajahi katalog model Microsoft Foundry, dapatkan informasi model terperinci dengan contoh kode, dan terapkan model ke Azure AI Services
- **📚 Manajemen Pengetahuan**: Buat dan kelola indeks Azure AI Search, tambahkan dokumen, konfigurasikan pengindeks, dan bangun sistem RAG yang canggih
- **⚡ Integrasi Agen AI**: Hubungkan dengan Azure AI Agents, query agen yang ada, dan evaluasi kinerja agen dalam skenario produksi
- **📊 Kerangka Evaluasi**: Jalankan evaluasi teks dan agen yang komprehensif, hasilkan laporan markdown, dan terapkan jaminan kualitas untuk aplikasi AI
- **🚀 Alat Prototipe**: Dapatkan petunjuk pengaturan untuk prototipe berbasis GitHub dan akses Microsoft Foundry Labs untuk model riset mutakhir

**Penggunaan pengembang nyata**: "Terapkan model Phi-4 ke Azure AI Services untuk aplikasi saya", "Buat indeks pencarian baru untuk sistem RAG dokumentasi saya", "Evaluasi respons agen saya berdasarkan metrik kualitas", atau "Temukan model penalaran terbaik untuk tugas analisis kompleks saya"

**Skenario demo lengkap**: Berikut alur kerja pengembangan AI yang kuat:

> "Saya sedang membangun agen dukungan pelanggan. Bantu saya menemukan model penalaran yang baik dari katalog, terapkan ke Azure AI Services, buat basis pengetahuan dari dokumentasi kami, siapkan kerangka evaluasi untuk menguji kualitas respons, lalu bantu saya prototipe integrasi dengan token GitHub untuk pengujian."

Microsoft Foundry MCP Server akan:
- Query katalog model untuk merekomendasikan model penalaran optimal berdasarkan kebutuhan Anda
- Memberikan perintah penerapan dan informasi kuota untuk wilayah Azure pilihan Anda
- Menyiapkan indeks Azure AI Search dengan skema yang tepat untuk dokumentasi Anda
- Mengonfigurasi pipeline evaluasi dengan metrik kualitas dan pemeriksaan keselamatan
- Menghasilkan kode prototipe dengan otentikasi GitHub untuk pengujian langsung
- Menyediakan panduan pengaturan lengkap yang disesuaikan dengan tumpukan teknologi Anda

**Contoh unggulan**: Sebagai pengembang, saya kesulitan untuk mengikuti berbagai model LLM yang tersedia. Saya tahu beberapa model utama, tapi merasa ketinggalan dalam hal produktivitas dan efisiensi. Dan token serta kuota cukup menegangkan dan sulit dikelola – saya tidak pernah tahu apakah saya memilih model yang tepat untuk tugas yang tepat atau membakar anggaran saya secara tidak efisien. Saya baru saja mendengar tentang MCP Server ini dari James Montemagno saat berdiskusi dengan rekan untuk rekomendasi MCP Server untuk posting ini, dan saya sangat antusias untuk menggunakannya! Kemampuan penemuan model terlihat sangat mengesankan bagi saya yang ingin menjelajahi di luar yang biasa dan menemukan model yang dioptimalkan untuk tugas khusus. Kerangka evaluasi harus membantu saya memvalidasi bahwa saya benar-benar mendapatkan hasil lebih baik, bukan hanya mencoba hal anyar tanpa alasan.

> **ℹ️ Status Eksperimental**
> 
> MCP server ini bersifat eksperimental dan dalam pengembangan aktif. Fitur dan API mungkin berubah. Sempurna untuk menjelajahi kemampuan AI Azure dan membangun prototipe, tapi harap verifikasi kebutuhan stabilitas untuk penggunaan produksi.
### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**Apa yang dilakukannya**: Menyediakan pengembang dengan alat penting untuk membangun agen AI dan aplikasi yang terintegrasi dengan Microsoft 365 dan Microsoft 365 Copilot, termasuk validasi skema, pengambilan contoh kode, dan bantuan pemecahan masalah.

**Mengapa ini berguna**: Pengembangan untuk Microsoft 365 dan Copilot melibatkan skema manifes yang kompleks dan pola pengembangan khusus. MCP server ini menghadirkan sumber daya pengembangan penting langsung ke lingkungan pengkodean Anda, membantu memvalidasi skema, menemukan contoh kode, dan memecahkan masalah umum tanpa terus-menerus merujuk dokumentasi.

**Penggunaan nyata**: "Validasi manifes agen deklaratif saya dan perbaiki kesalahan skema apa pun", "Tunjukkan saya contoh kode untuk mengimplementasikan plugin Microsoft Graph API", atau "Bantu saya memecahkan masalah otentikasi aplikasi Teams saya"

**Contoh unggulan**: Saya menghubungi teman saya John Miller setelah ngobrol dengannya di Build tentang M365 Agents, dan dia merekomendasikan MCP ini. Ini bisa sangat baik untuk pengembang baru M365 Agents karena menyediakan template, contoh kode, dan kerangka kerja untuk memulai tanpa tenggelam dalam dokumentasi. Fitur validasi skema tampak sangat berguna untuk menghindari kesalahan struktur manifes yang bisa menyebabkan berjam-jam debugging.

> **💡 Tip Pro**
> 
> Gunakan server ini bersama dengan Microsoft Learn Docs MCP Server untuk dukungan pengembangan M365 yang komprehensif – satu menyediakan dokumentasi resmi sementara yang ini menawarkan alat pengembangan praktis dan bantuan pemecahan masalah.


## Apa Selanjutnya? 🔮

## 📋 Kesimpulan

Model Context Protocol (MCP) mengubah cara pengembang berinteraksi dengan asisten AI dan alat eksternal. 10 server MCP Microsoft ini menunjukkan kekuatan integrasi AI yang standar, memungkinkan alur kerja mulus yang menjaga pengembang tetap fokus sambil mengakses kemampuan eksternal yang kuat.

Mulai dari integrasi ekosistem Azure yang komprehensif hingga alat khusus seperti Playwright untuk otomasi browser dan MarkItDown untuk pemrosesan dokumen, server-server ini menunjukkan bagaimana MCP dapat meningkatkan produktivitas di berbagai skenario pengembangan. Protokol yang standar memastikan alat-alat ini bekerja sama dengan mulus, menciptakan pengalaman pengembangan yang kohesif.

Seiring ekosistem MCP terus berkembang, tetap terlibat dengan komunitas, menjelajahi server baru, dan membangun solusi kustom akan menjadi kunci untuk memaksimalkan produktivitas pengembangan Anda. Sifat standar terbuka MCP berarti Anda dapat mencampur dan mencocokkan alat dari vendor berbeda untuk membuat alur kerja yang sempurna sesuai kebutuhan spesifik Anda.

## 🔗 Sumber Daya Tambahan

- [Repositori Resmi Microsoft MCP](https://github.com/microsoft/mcp)
- [Komunitas & Dokumentasi MCP](https://modelcontextprotocol.io/introduction)
- [Dokumentasi MCP VS Code](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Dokumentasi MCP Visual Studio](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Dokumentasi MCP Azure](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP Events](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot Customizations](https://github.com/awesome-copilot)
- [SDK MCP C#](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days Live 29th/30th July atau tonton On Demand](https://aka.ms/mcpdevdays)

## 🎯 Latihan

1. **Instalasi dan Konfigurasi**: Pasang salah satu server MCP di lingkungan VS Code Anda dan uji fungsionalitas dasar.
2. **Integrasi Alur Kerja**: Rancang alur kerja pengembangan yang menggabungkan setidaknya tiga server MCP berbeda.
3. **Perencanaan Server Kustom**: Identifikasi tugas di rutinitas pengembangan harian Anda yang dapat diuntungkan dari server MCP kustom dan buat spesifikasinya.
4. **Analisis Kinerja**: Bandingkan efisiensi penggunaan server MCP versus pendekatan tradisional untuk tugas pengembangan umum.
5. **Penilaian Keamanan**: Evaluasi implikasi keamanan menggunakan server MCP di lingkungan pengembangan Anda dan usulkan praktik terbaik.


Next:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->