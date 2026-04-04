[![Agentic RAG](../../../translated_images/id/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Klik gambar di atas untuk melihat video pelajaran ini)_

# Agentic RAG

Pelajaran ini memberikan gambaran komprehensif tentang Agentic Retrieval-Augmented Generation (Agentic RAG), sebuah paradigma AI yang sedang berkembang di mana model bahasa besar (LLM) secara mandiri merencanakan langkah berikutnya sambil menarik informasi dari sumber eksternal. Berbeda dengan pola statis retrieval-then-read, Agentic RAG melibatkan panggilan berulang ke LLM, diselingi dengan panggilan alat atau fungsi dan output terstruktur. Sistem mengevaluasi hasil, memperbaiki kueri, memanggil alat tambahan jika diperlukan, dan terus melanjutkan siklus ini hingga solusi yang memuaskan tercapai.

## Pengenalan

Pelajaran ini akan membahas

- **Memahami Agentic RAG:** Pelajari tentang paradigma baru di AI di mana model bahasa besar (LLM) secara mandiri merencanakan langkah berikutnya sambil mengambil informasi dari sumber data eksternal.
- **Memahami Gaya Iteratif Maker-Checker:** Memahami siklus panggilan berulang ke LLM, diselingi dengan panggilan alat atau fungsi dan output terstruktur, yang dirancang untuk meningkatkan ketepatan dan menangani kueri yang salah bentuk.
- **Menjelajahi Aplikasi Praktis:** Identifikasi skenario di mana Agentic RAG unggul, seperti lingkungan dengan prioritas kebenaran, interaksi database kompleks, dan alur kerja yang diperpanjang.

## Tujuan Pembelajaran

Setelah menyelesaikan pelajaran ini, Anda akan mengetahui/memahami:

- **Memahami Agentic RAG:** Pelajari tentang paradigma baru di AI di mana model bahasa besar (LLM) secara mandiri merencanakan langkah berikutnya sambil menarik informasi dari sumber data eksternal.
- **Gaya Iteratif Maker-Checker:** Memahami konsep siklus panggilan berulang ke LLM, diselingi dengan panggilan alat atau fungsi dan output terstruktur, yang dirancang untuk meningkatkan ketepatan dan menangani kueri yang salah bentuk.
- **Menguasai Proses Penalaran:** Memahami kemampuan sistem untuk menguasai proses penalarannya, membuat keputusan tentang bagaimana mendekati masalah tanpa bergantung pada jalur yang sudah ditentukan.
- **Alur Kerja:** Memahami bagaimana model agentic secara mandiri memutuskan untuk mengambil laporan tren pasar, mengidentifikasi data pesaing, mengkorelasikan metrik penjualan internal, mensintesis temuan, dan mengevaluasi strategi.
- **Siklus Iteratif, Integrasi Alat, dan Memori:** Pelajari tentang ketergantungan sistem pada pola interaksi berulang, mempertahankan status dan memori di setiap langkah untuk menghindari siklus berulang dan membuat keputusan berdasarkan informasi.
- **Menangani Mode Kegagalan dan Koreksi Diri:** Jelajahi mekanisme koreksi diri yang kuat dari sistem, termasuk iterasi dan pengulangan kueri, penggunaan alat diagnostik, dan kembali kepada pengawasan manusia.
- **Batas-batas Agensi:** Memahami keterbatasan Agentic RAG, fokus pada otonomi domain-spesifik, ketergantungan infrastruktur, dan penghormatan terhadap pembatas.
- **Kasus Penggunaan Praktis dan Nilai:** Identifikasi skenario di mana Agentic RAG unggul, seperti lingkungan dengan prioritas kebenaran, interaksi database kompleks, dan alur kerja yang diperpanjang.
- **Tata Kelola, Transparansi, dan Kepercayaan:** Pelajari pentingnya tata kelola dan transparansi, termasuk penalaran yang bisa dijelaskan, kontrol bias, dan pengawasan manusia.

## Apa itu Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) adalah paradigma AI yang muncul di mana model bahasa besar (LLM) secara mandiri merencanakan langkah berikutnya sambil mengambil informasi dari sumber eksternal. Berbeda dengan pola statis retrieval-then-read, Agentic RAG melibatkan panggilan berulang ke LLM, diselingi dengan panggilan alat atau fungsi dan output terstruktur. Sistem mengevaluasi hasil, memperbaiki kueri, memanggil alat tambahan jika perlu, dan terus melakukan siklus ini hingga solusi yang memuaskan tercapai. Gaya iteratif “maker-checker” ini meningkatkan ketepatan, menangani kueri yang salah bentuk, dan memastikan hasil berkualitas tinggi.

Sistem secara aktif menguasai proses penalarannya, menulis ulang kueri yang gagal, memilih metode pengambilan berbeda, dan mengintegrasikan berbagai alat—seperti pencarian vektor di Azure AI Search, database SQL, atau API khusus—sebelum menyelesaikan jawabannya. Kualitas pembeda sistem agentic adalah kemampuannya untuk menguasai proses penalarannya sendiri. Implementasi RAG tradisional bergantung pada jalur yang sudah ditentukan, tetapi sistem agentic secara mandiri menentukan urutan langkah berdasarkan kualitas informasi yang ditemukannya.

## Mendefinisikan Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) adalah paradigma yang sedang berkembang dalam pengembangan AI di mana LLM tidak hanya mengambil informasi dari sumber data eksternal tetapi juga secara mandiri merencanakan langkah berikutnya. Berbeda dengan pola statis retrieval-then-read atau urutan prompt yang disusun hati-hati, Agentic RAG melibatkan siklus panggilan berulang ke LLM, diselingi dengan panggilan alat atau fungsi dan output terstruktur. Pada setiap langkah, sistem mengevaluasi hasil yang diperoleh, memutuskan apakah akan memperbaiki kueri, memanggil alat tambahan bila diperlukan, dan terus melakukan siklus ini sampai mencapai solusi yang memuaskan.

Gaya operasional “maker-checker” yang iteratif ini dirancang untuk meningkatkan ketepatan, menangani kueri yang salah bentuk ke database terstruktur (misalnya NL2SQL), dan memastikan hasil yang seimbang dan berkualitas tinggi. Alih-alih hanya mengandalkan rantai prompt yang dirancang dengan cermat, sistem secara aktif menguasai proses penalarannya. Ia dapat menulis ulang kueri yang gagal, memilih metode pengambilan berbeda, dan mengintegrasikan beberapa alat—seperti pencarian vektor di Azure AI Search, database SQL, atau API khusus—sebelum menyelesaikan jawabannya. Ini menghilangkan kebutuhan untuk kerangka orkestrasi yang sangat kompleks. Sebagai gantinya, siklus sederhana “panggilan LLM → penggunaan alat → panggilan LLM → …” dapat menghasilkan output yang canggih dan berbasis dasar yang kuat.

![Agentic RAG Core Loop](../../../translated_images/id/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Menguasai Proses Penalaran

Kualitas pembeda yang membuat sebuah sistem “agentic” adalah kemampuannya untuk menguasai proses penalarannya. Implementasi RAG tradisional sering bergantung pada manusia untuk menentukan jalur bagi model: rantai berpikir yang menjelaskan apa yang harus diambil dan kapan.
Tetapi ketika sebuah sistem benar-benar agentic, ia memutuskan secara internal bagaimana mendekati masalah. Ia tidak hanya menjalankan skrip; ia secara mandiri menentukan urutan langkah berdasarkan kualitas informasi yang ditemukannya.
Misalnya, jika diminta membuat strategi peluncuran produk, ia tidak hanya bergantung pada prompt yang menguraikan seluruh alur kerja riset dan pengambilan keputusan. Sebaliknya, model agentic secara mandiri memutuskan untuk:

1. Mengambil laporan tren pasar terkini menggunakan Bing Web Grounding  
2. Mengidentifikasi data pesaing relevan menggunakan Azure AI Search.  
3. Mengkorelasikan metrik penjualan internal historis menggunakan Azure SQL Database.  
4. Mensintesis temuan menjadi strategi koheren yang diorkestrasi melalui Azure OpenAI Service.  
5. Mengevaluasi strategi untuk mencari kekurangan atau ketidaksesuaian, dan memicu pengambilan data lagi jika perlu.  
Semua langkah ini—memperbaiki kueri, memilih sumber, mengulangi sampai “puas” dengan jawaban—diputuskan oleh model, bukan diprogram sebelumnya oleh manusia.

## Siklus Iteratif, Integrasi Alat, dan Memori

![Tool Integration Architecture](../../../translated_images/id/tool-integration.0f569710b5c17c10.webp)

Sistem agentic mengandalkan pola interaksi berulang:

- **Panggilan Awal:** Tujuan pengguna (alias prompt pengguna) disajikan ke LLM.  
- **Pemanggilan Alat:** Jika model mengidentifikasi informasi yang hilang atau instruksi ambigu, ia memilih alat atau metode pengambilan—seperti kueri database vektor (misalnya Azure AI Search Hybrid search atas data privat) atau panggilan SQL terstruktur—untuk mengumpulkan lebih banyak konteks.  
- **Penilaian & Perbaikan:** Setelah meninjau data yang dikembalikan, model memutuskan apakah informasi sudah cukup. Jika belum, ia memperbaiki kueri, mencoba alat berbeda, atau menyesuaikan pendekatannya.  
- **Ulangi Sampai Puas:** Siklus ini berlanjut hingga model menentukan bahwa ia memiliki kejelasan dan bukti yang cukup untuk memberikan jawaban akhir yang bernalar baik.  
- **Memori & Status:** Karena sistem mempertahankan status dan memori di setiap langkah, ia dapat mengingat upaya sebelumnya dan hasilnya, menghindari siklus berulang serta membuat keputusan yang lebih terinformasi saat melanjutkan.

Seiring waktu, ini menciptakan perasaan pemahaman yang berkembang, memungkinkan model untuk menavigasi tugas kompleks multi-langkah tanpa perlu intervensi manusia secara konstan atau mengubah prompt.

## Menangani Mode Kegagalan dan Koreksi Diri

Otonomi Agentic RAG juga melibatkan mekanisme koreksi diri yang kuat. Ketika sistem menemui jalan buntu—seperti mengambil dokumen tak relevan atau menghadapi kueri yang salah bentuk—ia dapat:

- **Mengulangi dan Mengulang Kueri:** Alih-alih mengembalikan respons dengan nilai rendah, model mencoba strategi pencarian baru, menulis ulang kueri database, atau melihat set data alternatif.  
- **Menggunakan Alat Diagnostik:** Sistem dapat memanggil fungsi tambahan yang dirancang untuk membantunya men-debug langkah penalarannya atau mengonfirmasi ketepatan data yang diambil. Alat seperti Azure AI Tracing akan penting untuk memungkinkan observabilitas dan pemantauan yang kuat.  
- **Mengandalkan Pengawasan Manusia:** Untuk skenario berisiko tinggi atau yang terus gagal, model mungkin menandai ketidakpastian dan meminta panduan manusia. Setelah manusia memberikan umpan balik korektif, model dapat mengintegrasikan pelajaran itu ke depan.

Pendekatan iteratif dan dinamis ini memungkinkan model terus berkembang, memastikan ia bukan hanya sistem satu kali pakai tetapi belajar dari kesalahan selama sesi berjalan.

![Self Correction Mechanism](../../../translated_images/id/self-correction.da87f3783b7f174b.webp)

## Batas-batas Agensi

Meskipun otonom dalam suatu tugas, Agentic RAG tidak sama dengan Kecerdasan Umum Buatan (Artificial General Intelligence). Kemampuan “agentic”nya terbatas pada alat, sumber data, dan kebijakan yang disediakan oleh pengembang manusia. Ia tidak bisa menciptakan alat sendiri atau melangkah di luar batas domain yang telah ditetapkan. Sebaliknya, ia unggul dalam mengorkestrasi sumber daya yang ada secara dinamis.
Perbedaan utama dari bentuk AI yang lebih maju meliputi:

1. **Otonomi Domain-Spesifik:** Sistem Agentic RAG fokus mencapai tujuan yang ditetapkan pengguna dalam domain yang diketahui, menggunakan strategi seperti penulisan ulang kueri atau pemilihan alat untuk meningkatkan hasil.  
2. **Ketergantungan Infrastruktur:** Kapasitas sistem bergantung pada alat dan data yang diintegrasikan oleh pengembang. Ia tidak dapat melampaui batas ini tanpa intervensi manusia.  
3. **Penghormatan terhadap Pembatas:** Pedoman etika, aturan kepatuhan, dan kebijakan bisnis tetap sangat penting. Kebebasan agen selalu dibatasi oleh langkah-langkah keselamatan dan mekanisme pengawasan (semoga saja).

## Kasus Penggunaan Praktis dan Nilai

Agentic RAG unggul dalam skenario yang memerlukan penyempurnaan dan presisi iteratif:

1. **Lingkungan Prioritas Kebenaran:** Dalam pemeriksaan kepatuhan, analisis regulasi, atau penelitian hukum, model agentic dapat berulang kali memverifikasi fakta, berkonsultasi dengan banyak sumber, dan menulis ulang kueri hingga menghasilkan jawaban yang benar-benar tervalidasi.  
2. **Interaksi Database Kompleks:** Saat bekerja dengan data terstruktur di mana kueri sering gagal atau perlu disesuaikan, sistem dapat secara mandiri memperbaiki kueri menggunakan Azure SQL atau Microsoft Fabric OneLake, memastikan pengambilan akhir sesuai dengan niat pengguna.  
3. **Alur Kerja yang Diperpanjang:** Sesi yang berjalan lebih lama mungkin berkembang seiring informasi baru muncul. Agentic RAG dapat terus memasukkan data baru, mengubah strategi saat mempelajari lebih banyak tentang ruang masalah.

## Tata Kelola, Transparansi, dan Kepercayaan

Seiring sistem ini menjadi lebih otonom dalam penalarannya, tata kelola dan transparansi menjadi penting:

- **Penalaran yang Bisa Dijelaskan:** Model dapat menyediakan jejak audit kueri yang dibuat, sumber yang dikonsultasi, dan langkah penalaran yang diambil untuk mencapai kesimpulan. Alat seperti Azure AI Content Safety dan Azure AI Tracing / GenAIOps dapat membantu menjaga transparansi dan mengurangi risiko.  
- **Kontrol Bias dan Pengambilan Seimbang:** Pengembang dapat mengatur strategi pengambilan untuk memastikan sumber data yang seimbang dan representatif dipertimbangkan, serta secara berkala mengaudit output untuk mendeteksi bias atau pola menyimpang dengan menggunakan model khusus untuk organisasi sains data tingkat lanjut yang menggunakan Azure Machine Learning.  
- **Pengawasan Manusia dan Kepatuhan:** Untuk tugas kritis, ulasan manusia tetap esensial. Agentic RAG tidak menggantikan penilaian manusia dalam keputusan berisiko tinggi—melainkan memperkuatnya dengan memberikan opsi yang telah divalidasi dengan matang.

Memiliki alat yang menyediakan catatan tindakan yang jelas sangat penting. Tanpa itu, debugging proses multi-langkah dapat sangat sulit. Lihat contoh berikut dari Literal AI (perusahaan di balik Chainlit) untuk sebuah Agent run:

![AgentRunExample](../../../translated_images/id/AgentRunExample.471a94bc40cbdc0c.webp)

## Kesimpulan

Agentic RAG merupakan evolusi alami dalam cara sistem AI menangani tugas kompleks yang intensif data. Dengan mengadopsi pola interaksi berulang, secara mandiri memilih alat, dan menyempurnakan kueri hingga mencapai hasil berkualitas tinggi, sistem ini bergerak melampaui sekadar mengikuti prompt statis menjadi pengambil keputusan yang adaptif dan sadar konteks. Meskipun masih terbatas oleh infrastruktur dan pedoman etika yang ditetapkan manusia, kemampuan agentic ini memungkinkan interaksi AI yang lebih kaya, dinamis, dan pada akhirnya lebih berguna untuk perusahaan maupun pengguna akhir.

### Ada Pertanyaan Lebih Lanjut tentang Agentic RAG?

Gabung ke [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) untuk bertemu dengan pembelajar lain, menghadiri jam kantor, dan dapatkan jawaban atas pertanyaan tentang AI Agents Anda.

## Sumber Tambahan
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementasi Retrieval Augmented Generation (RAG) dengan Layanan Azure OpenAI: Pelajari cara menggunakan data Anda sendiri dengan Layanan Azure OpenAI. Modul Microsoft Learn ini menyediakan panduan komprehensif tentang implementasi RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Evaluasi aplikasi AI generatif dengan Microsoft Foundry: Artikel ini membahas evaluasi dan perbandingan model pada dataset yang tersedia secara publik, termasuk aplikasi AI Agentic dan arsitektur RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Apa itu Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Panduan Lengkap untuk Retrieval Augmented Generation Berbasis Agen – Berita dari generasi RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: tingkatkan RAG Anda dengan reformulasi kueri dan self-query! Buku Masak AI Open-Source Hugging Face</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Menambahkan Lapisan Agentic ke RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Masa Depan Asisten Pengetahuan: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Cara Membangun Sistem Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Menggunakan Layanan Agen Microsoft Foundry untuk meningkatkan skala agen AI Anda</a>

### Makalah Akademik

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Penyempurnaan Iteratif dengan Umpan Balik Diri</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Agen Bahasa dengan Pembelajaran Penguatan Verbal</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Model Bahasa Besar Dapat Memperbaiki Diri dengan Kritik Interaktif Berbasis Alat</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Survei tentang Agentic RAG</a>

## Pelajaran Sebelumnya

[Tool Use Design Pattern](../04-tool-use/README.md)

## Pelajaran Berikutnya

[Membangun Agen AI yang Terpercaya](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk memberikan hasil yang akurat, harap diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang otoritatif. Untuk informasi yang penting, disarankan menggunakan terjemahan profesional oleh penerjemah manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau salah tafsir yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->