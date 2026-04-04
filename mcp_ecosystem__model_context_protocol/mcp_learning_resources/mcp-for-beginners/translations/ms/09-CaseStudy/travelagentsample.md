# Kajian Kes: Ejen Perjalanan Azure AI – Pelaksanaan Rujukan

## Gambaran Keseluruhan

[Ejen Perjalanan Azure AI](https://github.com/Azure-Samples/azure-ai-travel-agents) adalah penyelesaian rujukan yang komprehensif dibangunkan oleh Microsoft yang menunjukkan cara membina aplikasi perancangan perjalanan berbilang ejen bertenaga AI menggunakan Protokol Konteks Model (MCP), Azure OpenAI, dan Azure AI Search. Projek ini mempamerkan amalan terbaik untuk mengatur pelbagai ejen AI, mengintegrasikan data perusahaan, dan menyediakan platform yang selamat dan boleh dikembangkan untuk senario dunia sebenar.

## Ciri-ciri Utama
- **Pengurusan Berbilang Ejen:** Menggunakan MCP untuk menyelaraskan ejen khusus (contohnya, ejen penerbangan, hotel, dan jadual perjalanan) yang bekerjasama untuk memenuhi tugas perancangan perjalanan yang kompleks.
- **Integrasi Data Perusahaan:** Berhubung dengan Azure AI Search dan sumber data perusahaan lain untuk menyediakan maklumat terkini dan relevan bagi cadangan perjalanan.
- **Seni Bina Selamat dan Boleh Skala:** Memanfaatkan perkhidmatan Azure untuk pengesahan, kebenaran, dan pengurusan pelaksanaan yang boleh diskalakan, mengikut amalan keselamatan perusahaan terbaik.
- **Peralatan Boleh Dikembangkan:** Melaksanakan alat MCP yang boleh digunakan semula dan templat arahan, membolehkan penyesuaian pantas kepada domain baru atau keperluan perniagaan.
- **Pengalaman Pengguna:** Menyediakan antara muka perbualan untuk pengguna berinteraksi dengan ejen perjalanan, dikuasakan oleh Azure OpenAI dan MCP.

## Seni Bina
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Penerangan Rajah Seni Bina

Penyelesaian Ejen Perjalanan Azure AI direka bagi modulariti, kebolehsuaian, dan integrasi selamat pelbagai ejen AI dan sumber data perusahaan. Komponen utama dan aliran data adalah seperti berikut:

- **Antara Muka Pengguna:** Pengguna berinteraksi dengan sistem melalui UI perbualan (seperti sembang web atau bot Teams), yang menghantar pertanyaan pengguna dan menerima cadangan perjalanan.
- **Pelayan MCP:** Berfungsi sebagai penyelaras utama, menerima input pengguna, mengurus konteks, dan menyelaraskan tindakan ejen khusus (contohnya, FlightAgent, HotelAgent, ItineraryAgent) melalui Protokol Konteks Model.
- **Ejen AI:** Setiap ejen bertanggungjawab untuk domain tertentu (penerbangan, hotel, jadual perjalanan) dan dilaksanakan sebagai alat MCP. Ejen menggunakan templat arahan dan logik untuk memproses permintaan dan menjana respons.
- **Perkhidmatan Azure OpenAI:** Menyediakan pemahaman dan penjanaan bahasa semulajadi yang canggih, membolehkan ejen mentafsir niat pengguna dan menjana respons perbualan.
- **Azure AI Search & Data Perusahaan:** Ejen membuat pertanyaan ke Azure AI Search dan sumber data perusahaan lain untuk mendapatkan maklumat terkini mengenai penerbangan, hotel, dan pilihan perjalanan.
- **Pengesahan & Keselamatan:** Berintegrasi dengan Microsoft Entra ID untuk pengesahan selamat dan menggunakan kawalan akses keutamaan terendah untuk semua sumber.
- **Penggubahan:** Direka untuk penggubahan pada Azure Container Apps, memastikan kebolehsuaian, pemantauan, dan kecekapan operasi.

Seni bina ini membolehkan penyelarasan lancar pelbagai ejen AI, integrasi selamat dengan data perusahaan, dan platform yang kukuh dan boleh dikembangkan untuk membina penyelesaian AI khusus domain.

## Penjelasan Langkah demi Langkah Rajah Seni Bina
Bayangkan merancang satu perjalanan besar dan mempunyai satu pasukan pembantu pakar yang membantu anda dengan setiap butiran. Sistem Ejen Perjalanan Azure AI berfungsi secara yang serupa, menggunakan bahagian yang berbeza (seperti ahli pasukan) yang masing-masing mempunyai tugas khusus. Berikut cara semuanya bersatu:

### Antara Muka Pengguna (UI):
Fikirkan ini sebagai meja hadapan ejen perjalanan anda. Di sinilah anda (pengguna) bertanya soalan atau membuat permintaan, seperti “Cari penerbangan ke Paris.” Ini boleh menjadi tetingkap sembang di laman web atau aplikasi mesej.

### Pelayan MCP (Penyelaras):
Pelayan MCP seperti pengurus yang mendengar permintaan anda di meja hadapan dan memutuskan pakar mana yang harus mengendalikan setiap bahagian. Ia mengawasi perbualan anda dan memastikan semuanya berjalan lancar.

### Ejen AI (Pembantu Pakar):
Setiap ejen adalah pakar dalam bidang tertentu—salah seorang tahu tentang penerbangan, seorang lagi tentang hotel, dan seorang lagi tentang merancang jadual perjalanan anda. Bila anda membuat permintaan, Pelayan MCP menghantar permintaan anda ke ejen yang betul. Ejen ini menggunakan pengetahuan dan alat mereka untuk mencari pilihan terbaik untuk anda.

### Perkhidmatan Azure OpenAI (Pakar Bahasa):
Ini seperti mempunyai seorang pakar bahasa yang memahami tepat apa yang anda minta, tidak kira bagaimana cara anda mengatakannya. Ia membantu ejen memahami permintaan anda dan membalas menggunakan bahasa perbualan semulajadi.

### Azure AI Search & Data Perusahaan (Perpustakaan Maklumat):
Bayangkan sebuah perpustakaan besar yang sentiasa dikemas kini dengan semua maklumat perjalanan terkini—jadual penerbangan, ketersediaan hotel, dan lain-lain. Ejen mencari perpustakaan ini untuk mendapatkan jawapan yang paling tepat untuk anda.

### Pengesahan & Keselamatan (Pengawal Keselamatan):
Seperti pengawal keselamatan yang memeriksa siapa yang boleh masuk ke kawasan tertentu, bahagian ini memastikan hanya orang dan ejen yang diberi kuasa boleh mengakses maklumat sensitif. Ia menjaga data anda selamat dan peribadi.

### Penggubahan pada Azure Container Apps (Bangunan):
Semua pembantu dan alat ini bekerja bersama dalam sebuah bangunan yang selamat dan boleh diskalakan (awan). Ini bermakna sistem boleh mengendalikan ramai pengguna serentak dan sentiasa tersedia bila anda memerlukannya.

## Cara semuanya berfungsi bersama:

Anda mula dengan bertanya soalan di meja hadapan (UI).  
Pengurus (Pelayan MCP) menentukan pakar (ejen) yang patut membantu anda.  
Pakar menggunakan pakar bahasa (OpenAI) untuk memahami permintaan anda dan perpustakaan (AI Search) untuk mencari jawapan terbaik.  
Pengawal keselamatan (Pengesahan) memastikan semuanya selamat.  
Semua ini berlaku di dalam bangunan yang boleh dipercayai dan boleh diskalakan (Azure Container Apps), supaya pengalaman anda lancar dan selamat.  
Kerjasama ini membolehkan sistem dengan cepat dan selamat membantu anda merancang perjalanan, seperti satu pasukan ejen perjalanan pakar yang bekerjasama dalam pejabat moden!

## Pelaksanaan Teknikal
- **Pelayan MCP:** Mengehoskan logik pengurusan teras, mendedahkan alat ejen, dan mengurus konteks untuk aliran kerja perancangan perjalanan multi-langkah.
- **Ejen:** Setiap ejen (contohnya FlightAgent, HotelAgent) dilaksanakan sebagai alat MCP dengan templat arahan dan logiknya sendiri.
- **Integrasi Azure:** Menggunakan Azure OpenAI untuk pemahaman bahasa semulajadi dan Azure AI Search untuk pengambilan data.
- **Keselamatan:** Berintegrasi dengan Microsoft Entra ID untuk pengesahan dan menggunakan kawalan akses keutamaan terendah untuk semua sumber.
- **Penggubahan:** Menyokong penggubahan ke Azure Container Apps untuk kebolehsuaian dan kecekapan operasi.

## Keputusan dan Impak
- Menunjukkan bagaimana MCP boleh digunakan untuk mengatur pelbagai ejen AI dalam senario dunia sebenar yang berskala pengeluaran.
- Mempercepat pembangunan penyelesaian dengan menyediakan corak boleh guna semula untuk penyelarasan ejen, integrasi data, dan penggubahan selamat.
- Berfungsi sebagai cetak biru untuk membina aplikasi bertenaga AI khusus domain menggunakan MCP dan perkhidmatan Azure.

## Rujukan
- [Repositori GitHub Ejen Perjalanan Azure AI](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Perkhidmatan Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Protokol Konteks Model (MCP)](https://modelcontextprotocol.io/)

## Apa Seterusnya

- Kembali ke: [Gambaran Kes Kajian](./README.md)  
- Seterusnya: [Mengemaskini Item ADO dari YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha mencapai ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->