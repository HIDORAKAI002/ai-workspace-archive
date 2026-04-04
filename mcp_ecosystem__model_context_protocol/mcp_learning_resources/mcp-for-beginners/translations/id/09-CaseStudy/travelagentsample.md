# Studi Kasus: Azure AI Travel Agents – Implementasi Referensi

## Ikhtisar

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) adalah solusi referensi komprehensif yang dikembangkan oleh Microsoft yang menunjukkan cara membangun aplikasi perencanaan perjalanan bertenaga AI multi-agen menggunakan Model Context Protocol (MCP), Azure OpenAI, dan Azure AI Search. Proyek ini menampilkan praktik terbaik untuk mengorkestrasi beberapa agen AI, mengintegrasikan data perusahaan, dan menyediakan platform yang aman serta dapat diperluas untuk skenario dunia nyata.

## Fitur Utama
- **Orkestrasi Multi-Agen:** Memanfaatkan MCP untuk mengoordinasikan agen khusus (misalnya, agen penerbangan, hotel, dan rencana perjalanan) yang bekerja sama untuk memenuhi tugas perencanaan perjalanan yang kompleks.
- **Integrasi Data Perusahaan:** Terhubung ke Azure AI Search dan sumber data perusahaan lainnya untuk menyediakan informasi terbaru dan relevan untuk rekomendasi perjalanan.
- **Arsitektur Aman dan Skalabel:** Memanfaatkan layanan Azure untuk otentikasi, otorisasi, dan penerapan yang dapat diskalakan, mengikuti praktik terbaik keamanan perusahaan.
- **Alat yang Dapat Diperluas:** Menerapkan alat MCP yang dapat digunakan kembali dan template prompt, memungkinkan adaptasi cepat ke domain atau kebutuhan bisnis baru.
- **Pengalaman Pengguna:** Menyediakan antarmuka percakapan bagi pengguna untuk berinteraksi dengan agen perjalanan, didukung oleh Azure OpenAI dan MCP.

## Arsitektur
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Deskripsi Diagram Arsitektur

Solusi Azure AI Travel Agents dirancang untuk modularitas, skalabilitas, dan integrasi aman dari beberapa agen AI dan sumber data perusahaan. Komponen utama dan aliran data adalah sebagai berikut:

- **Antarmuka Pengguna:** Pengguna berinteraksi dengan sistem melalui UI percakapan (seperti chat web atau bot Teams), yang mengirimkan kueri pengguna dan menerima rekomendasi perjalanan.
- **Server MCP:** Berfungsi sebagai pengatur pusat, menerima input pengguna, mengelola konteks, dan mengoordinasikan tindakan agen khusus (misalnya FlightAgent, HotelAgent, ItineraryAgent) melalui Model Context Protocol.
- **Agen AI:** Setiap agen bertanggung jawab atas domain spesifik (penerbangan, hotel, rencana perjalanan) dan diimplementasikan sebagai alat MCP. Agen menggunakan template prompt dan logika untuk memproses permintaan dan menghasilkan respons.
- **Layanan Azure OpenAI:** Menyediakan pemahaman dan generasi bahasa alami canggih, memungkinkan agen untuk menginterpretasikan maksud pengguna dan menghasilkan respons percakapan.
- **Azure AI Search & Data Perusahaan:** Agen menanyakan Azure AI Search dan sumber data perusahaan lainnya untuk mengambil informasi terbaru tentang penerbangan, hotel, dan opsi perjalanan.
- **Otentikasi & Keamanan:** Terintegrasi dengan Microsoft Entra ID untuk otentikasi aman dan menerapkan kontrol akses hak istimewa paling sedikit ke semua sumber daya.
- **Penerapan:** Dirancang untuk penerapan pada Azure Container Apps, menjamin skalabilitas, pemantauan, dan efisiensi operasional.

Arsitektur ini memungkinkan orkestrasi mulus dari beberapa agen AI, integrasi aman dengan data perusahaan, dan platform yang kuat serta dapat diperluas untuk membangun solusi AI spesifik domain.

## Penjelasan Langkah demi Langkah Diagram Arsitektur
Bayangkan merencanakan perjalanan besar dan memiliki tim asisten ahli yang membantu Anda dengan setiap detail. Sistem Azure AI Travel Agents bekerja dengan cara serupa, menggunakan bagian-bagian berbeda (seperti anggota tim) yang masing-masing memiliki tugas khusus. Berikut cara semuanya terhubung:

### Antarmuka Pengguna (UI):
Anggap ini sebagai meja depan agen perjalanan Anda. Di sinilah Anda (pengguna) mengajukan pertanyaan atau permintaan, seperti “Cari penerbangan ke Paris.” Ini bisa berupa jendela chat di situs web atau aplikasi pesan.

### Server MCP (Koordinator):
Server MCP seperti manajer yang mendengarkan permintaan Anda di meja depan dan memutuskan spesialis mana yang harus menangani setiap bagian. Ia melacak percakapan Anda dan memastikan semuanya berjalan lancar.

### Agen AI (Asisten Spesialis):
Setiap agen adalah ahli di bidang tertentu—satu tahu segalanya tentang penerbangan, satu lagi tentang hotel, dan satu lagi tentang merencanakan rencana perjalanan Anda. Ketika Anda meminta perjalanan, Server MCP mengirimkan permintaan Anda ke agen yang tepat. Agen-agen ini menggunakan pengetahuan dan alat mereka untuk menemukan pilihan terbaik untuk Anda.

### Layanan Azure OpenAI (Ahli Bahasa):
Ini seperti memiliki ahli bahasa yang mengerti persis apa yang Anda minta, tidak peduli bagaimana cara Anda mengungkapkannya. Ini membantu agen memahami permintaan Anda dan merespons dengan bahasa percakapan alami.

### Azure AI Search & Data Perusahaan (Perpustakaan Informasi):
Bayangkan sebuah perpustakaan besar, terkini dengan semua info perjalanan terbaru—jadwal penerbangan, ketersediaan hotel, dan lainnya. Agen mencari perpustakaan ini untuk mendapatkan jawaban paling akurat untuk Anda.

### Otentikasi & Keamanan (Penjaga Keamanan):
Sama seperti penjaga keamanan memeriksa siapa yang boleh masuk ke area tertentu, bagian ini memastikan hanya orang dan agen yang berwenang yang dapat mengakses informasi sensitif. Ini menjaga data Anda aman dan pribadi.

### Penerapan di Azure Container Apps (Gedung):
Semua asisten dan alat ini bekerja bersama di dalam sebuah gedung yang aman dan skalabel (cloud). Ini berarti sistem dapat menangani banyak pengguna sekaligus dan selalu tersedia saat Anda membutuhkannya.

## Cara Semua Bekerja Bersama:

Anda memulai dengan mengajukan pertanyaan di meja depan (UI).
Manajer (Server MCP) menentukan spesialis (agen) mana yang harus membantu Anda.
Spesialis menggunakan ahli bahasa (OpenAI) untuk memahami permintaan Anda dan perpustakaan (AI Search) untuk menemukan jawaban terbaik.
Penjaga keamanan (Otentikasi) memastikan semuanya aman.
Semua ini terjadi di dalam gedung yang dapat diandalkan dan skalabel (Azure Container Apps), sehingga pengalaman Anda lancar dan aman.
Kerja tim ini memungkinkan sistem dengan cepat dan aman membantu Anda merencanakan perjalanan, persis seperti tim agen perjalanan ahli yang bekerja sama di kantor modern!

## Implementasi Teknis
- **Server MCP:** Menampung logika orkestrasi inti, mengekspos alat agen, dan mengelola konteks untuk alur kerja perencanaan perjalanan multi-langkah.
- **Agen:** Setiap agen (misalnya FlightAgent, HotelAgent) diimplementasikan sebagai alat MCP dengan template prompt dan logika sendiri.
- **Integrasi Azure:** Menggunakan Azure OpenAI untuk pemahaman bahasa alami dan Azure AI Search untuk pengambilan data.
- **Keamanan:** Terintegrasi dengan Microsoft Entra ID untuk otentikasi dan menerapkan kontrol akses hak istimewa paling rendah ke semua sumber daya.
- **Penerapan:** Mendukung penerapan ke Azure Container Apps untuk skalabilitas dan efisiensi operasional.

## Hasil dan Dampak
- Menunjukkan bagaimana MCP dapat digunakan untuk mengorkestrasi beberapa agen AI dalam skenario dunia nyata dengan kualitas produksi.
- Mempercepat pengembangan solusi dengan menyediakan pola yang dapat digunakan kembali untuk koordinasi agen, integrasi data, dan penerapan yang aman.
- Berfungsi sebagai cetak biru untuk membangun aplikasi bertenaga AI spesifik domain menggunakan MCP dan layanan Azure.

## Referensi
- [Repositori GitHub Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Layanan Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Selanjutnya

- Kembali ke: [Ikhtisar Studi Kasus](./README.md)
- Berikutnya: [Memperbarui Item ADO dari YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berusaha untuk akurasi, harap diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau salah tafsir yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->