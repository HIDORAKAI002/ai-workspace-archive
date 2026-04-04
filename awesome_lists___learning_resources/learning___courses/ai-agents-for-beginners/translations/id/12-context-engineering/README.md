# Rekayasa Konteks untuk Agen AI

[![Rekayasa Konteks](../../../translated_images/id/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Klik gambar di atas untuk menonton video pelajaran ini)_

Memahami kompleksitas aplikasi yang Anda bangun agen AI untuk sangat penting agar menghasilkan agen yang andal. Kita perlu membangun Agen AI yang secara efektif mengelola informasi untuk memenuhi kebutuhan kompleks di luar rekayasa prompt.

Dalam pelajaran ini, kita akan melihat apa itu rekayasa konteks dan perannya dalam membangun agen AI.

## Pendahuluan

Pelajaran ini akan membahas:

• **Apa itu Rekayasa Konteks** dan mengapa itu berbeda dari rekayasa prompt.

• **Strategi untuk Rekayasa Konteks yang efektif**, termasuk cara menulis, memilih, mengompresi, dan mengisolasi informasi.

• **Kegagalan Konteks Umum** yang dapat menggagalkan agen AI Anda dan cara memperbaikinya.

## Tujuan Pembelajaran

Setelah menyelesaikan pelajaran ini, Anda akan mengetahui cara untuk:

• **Mendefinisikan rekayasa konteks** dan membedakannya dari rekayasa prompt.

• **Mengidentifikasi komponen kunci dari konteks** dalam aplikasi Model Bahasa Besar (LLM).

• **Menerapkan strategi untuk menulis, memilih, mengompresi, dan mengisolasi konteks** untuk meningkatkan kinerja agen.

• **Mengenali kegagalan konteks umum** seperti keracunan, keteralihan, kebingungan, dan benturan, serta menerapkan teknik mitigasi.

## Apa itu Rekayasa Konteks?

Untuk Agen AI, konteks adalah apa yang mengarahkan perencanaan agen AI untuk mengambil tindakan tertentu. Rekayasa Konteks adalah praktik memastikan Agen AI memiliki informasi yang tepat untuk menyelesaikan langkah berikutnya dari tugas. Jendela konteks memiliki batasan ukuran, jadi sebagai pembuat agen kita perlu membangun sistem dan proses untuk mengelola penambahan, penghapusan, dan pemadatan informasi dalam jendela konteks.

### Rekayasa Prompt vs Rekayasa Konteks

Rekayasa prompt berfokus pada satu set instruksi statis untuk secara efektif membimbing Agen AI dengan seperangkat aturan. Rekayasa konteks adalah cara mengelola kumpulan informasi yang dinamis, termasuk prompt awal, untuk memastikan Agen AI memiliki apa yang dibutuhkannya dari waktu ke waktu. Ide utama dalam rekayasa konteks adalah membuat proses ini dapat diulang dan dapat diandalkan.

### Jenis Konteks

[![Jenis Konteks](../../../translated_images/id/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Penting untuk diingat bahwa konteks bukan hanya satu hal. Informasi  yang dibutuhkan Agen AI dapat berasal dari berbagai sumber yang berbeda dan terserah kita untuk memastikan agen memiliki akses ke sumber-sumber ini:

Jenis-jenis konteks yang mungkin perlu dikelola oleh agen AI meliputi:

• **Instruksi:** Ini seperti "aturan" agen – prompt, pesan sistem, few-shot examples (menunjukkan kepada AI bagaimana melakukan sesuatu), dan deskripsi alat yang dapat digunakannya. Di sinilah fokus rekayasa prompt bergabung dengan rekayasa konteks.

• **Pengetahuan:** Ini mencakup fakta, informasi yang diambil dari basis data, atau memori jangka panjang yang telah dikumpulkan agen. Ini termasuk integrasi sistem Retrieval Augmented Generation (RAG) jika agen perlu mengakses berbagai penyimpanan pengetahuan dan basis data.

• **Alat:** Ini adalah definisi fungsi eksternal, API dan MCP Servers yang dapat dipanggil agen, beserta umpan balik (hasil) yang diperoleh dari penggunaannya.

• **Riwayat Percakapan:** Dialog yang sedang berlangsung dengan pengguna. Seiring berjalannya waktu, percakapan ini menjadi lebih panjang dan lebih kompleks yang berarti mengambil ruang dalam jendela konteks.

• **Preferensi Pengguna:** Informasi yang dipelajari tentang kesukaan atau ketidaksukaan pengguna dari waktu ke waktu. Ini dapat disimpan dan dipanggil saat membuat keputusan kunci untuk membantu pengguna.

## Strategi untuk Rekayasa Konteks yang Efektif

### Strategi Perencanaan

[![Praktik Terbaik Rekayasa Konteks](../../../translated_images/id/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Rekayasa konteks yang baik dimulai dengan perencanaan yang baik. Berikut adalah pendekatan yang akan membantu Anda mulai memikirkan bagaimana menerapkan konsep rekayasa konteks:

1. **Tentukan Hasil yang Jelas** - Hasil dari tugas yang akan diberikan kepada Agen AI harus didefinisikan dengan jelas. Jawab pertanyaan - "Seperti apa dunia ketika Agen AI selesai dengan tugasnya?" Dengan kata lain, perubahan, informasi, atau respons apa yang harus dimiliki pengguna setelah berinteraksi dengan Agen AI.
2. **Peta Konteks** - Setelah Anda mendefinisikan hasil Agen AI, Anda perlu menjawab pertanyaan "Informasi apa yang diperlukan Agen AI agar dapat menyelesaikan tugas ini?". Dengan cara ini Anda dapat mulai memetakan konteks di mana informasi itu dapat ditemukan.
3. **Buat Pipeline Konteks** - Sekarang Anda tahu di mana informasi berada, Anda perlu menjawab pertanyaan "Bagaimana Agen akan mendapatkan informasi ini?". Ini dapat dilakukan dengan berbagai cara termasuk RAG, penggunaan MCP servers dan alat lainnya.

### Strategi Praktis

Perencanaan itu penting tetapi begitu informasi mulai mengalir ke jendela konteks agen kita, kita perlu memiliki strategi praktis untuk mengelolanya:

#### Mengelola Konteks

Sementara beberapa informasi akan ditambahkan ke jendela konteks secara otomatis, rekayasa konteks adalah tentang mengambil peran yang lebih aktif terhadap informasi ini yang dapat dilakukan dengan beberapa strategi:

 1. **Scratchpad Agen**
 Ini memungkinkan Agen AI mencatat informasi relevan tentang tugas saat ini dan interaksi pengguna selama satu sesi. Ini sebaiknya ada di luar jendela konteks dalam sebuah file atau objek runtime yang dapat diambil kembali oleh agen selama sesi ini jika diperlukan.

 2. **Memori**
 Scratchpad baik untuk mengelola informasi di luar jendela konteks sesi tunggal. Memori memungkinkan agen menyimpan dan mengambil informasi relevan lintas beberapa sesi. Ini bisa mencakup ringkasan, preferensi pengguna, dan umpan balik untuk perbaikan di masa depan.

 3. **Memampatkan Konteks**
  Setelah jendela konteks tumbuh dan mendekati batasnya, teknik seperti pembuatan ringkasan dan pemangkasan dapat digunakan. Ini termasuk hanya menyimpan informasi yang paling relevan atau menghapus pesan yang lebih lama.
  
 4. **Sistem Multi-Agen**
  Mengembangkan sistem multi-agen adalah bentuk rekayasa konteks karena setiap agen memiliki jendela konteksnya sendiri. Bagaimana konteks itu dibagikan dan diteruskan ke agen yang berbeda adalah hal lain yang perlu direncanakan saat membangun sistem ini.
  
 5. **Lingkungan Sandbox**
  Jika agen perlu menjalankan beberapa kode atau memproses banyak informasi dalam sebuah dokumen, ini dapat memakan banyak token untuk memproses hasilnya. Alih-alih menyimpan semua ini di jendela konteks, agen dapat menggunakan lingkungan sandbox yang dapat menjalankan kode ini dan hanya membaca hasil serta informasi relevan lainnya.
  
 6. **Objek Status Runtime**
   Ini dilakukan dengan membuat kontainer informasi untuk mengelola situasi ketika Agen perlu mengakses informasi tertentu. Untuk tugas yang kompleks, ini akan memungkinkan Agen menyimpan hasil setiap subtask langkah demi langkah, sehingga konteks tetap terhubung hanya dengan subtask tertentu tersebut.
  
### Contoh Rekayasa Konteks

Misalkan kita ingin agen AI **"Pesankan saya perjalanan ke Paris."**

• Agen sederhana yang hanya menggunakan rekayasa prompt mungkin hanya akan merespons: **"Oke, kapan Anda ingin pergi ke Paris?"**. Ia hanya memproses pertanyaan langsung Anda pada saat itu.

• Agen yang menggunakan strategi rekayasa konteks yang dibahas akan melakukan lebih banyak hal. Sebelum merespons, sistemnya mungkin:

  ◦ **Memeriksa kalender Anda** untuk tanggal yang tersedia (mengambil data waktu nyata).

  ◦ **Mengingat preferensi perjalanan masa lalu** (dari memori jangka panjang) seperti maskapai yang Anda sukai, anggaran, atau apakah Anda lebih memilih penerbangan langsung.

  ◦ **Mengidentifikasi alat yang tersedia** untuk pemesanan penerbangan dan hotel.

-  Kemudian, contoh responsnya bisa menjadi: "Halo [Your Name]! Saya lihat Anda bebas pada minggu pertama bulan Oktober. Haruskah saya mencari penerbangan langsung ke Paris dengan [Preferred Airline] dalam anggaran biasa Anda [Budget]?" Respons yang lebih kaya dan sadar konteks ini menunjukkan kekuatan rekayasa konteks.

## Kegagalan Konteks Umum

### Keracunan Konteks

**Apa itu:** Ketika sebuah halusinasi (informasi palsu yang dihasilkan oleh LLM) atau kesalahan masuk ke dalam konteks dan terus direferensikan, menyebabkan agen mengejar tujuan yang mustahil atau mengembangkan strategi yang tidak masuk akal.

**Apa yang harus dilakukan:** Terapkan **validasi konteks** dan **karantina**. Validasi informasi sebelum ditambahkan ke memori jangka panjang. Jika potensi keracunan terdeteksi, mulai thread konteks baru untuk mencegah informasi buruk menyebar.

**Contoh Pemesanan Perjalanan:** Agen Anda berhalusinasi tentang **penerbangan langsung dari bandara lokal kecil ke kota internasional yang jauh** yang sebenarnya tidak menawarkan penerbangan internasional. Rincian penerbangan yang tidak ada ini tersimpan dalam konteks. Kemudian, ketika Anda meminta agen untuk memesan, agen terus mencoba menemukan tiket untuk rute yang mustahil ini, menyebabkan kesalahan berulang.

**Solusi:** Terapkan langkah yang **memvalidasi keberadaan penerbangan dan rute dengan API waktu nyata** _sebelum_ menambahkan rincian penerbangan ke konteks kerja agen. Jika validasi gagal, informasi keliru tersebut "dikuarantinakan" dan tidak digunakan lebih lanjut.

### Keteralihan Konteks

**Apa itu:** Ketika konteks menjadi begitu besar sehingga model terlalu fokus pada riwayat yang terkumpul daripada menggunakan apa yang dipelajari selama pelatihan, yang mengarah pada tindakan yang berulang atau tidak membantu. Model mungkin mulai membuat kesalahan bahkan sebelum jendela konteks penuh.

**Apa yang harus dilakukan:** Gunakan **pembuatan ringkasan konteks**. Secara berkala memampatkan informasi yang terkumpul menjadi ringkasan yang lebih pendek, menyimpan detail penting sambil menghapus riwayat yang berulang. Ini membantu "mengatur ulang" fokus.

**Contoh Pemesanan Perjalanan:** Anda telah mendiskusikan berbagai tujuan impian untuk waktu yang lama, termasuk cerita rinci tentang perjalanan backpacking Anda dua tahun lalu. Ketika Anda akhirnya meminta **"cari penerbangan murah untuk bulan depan,"** agen terjebak dalam detail lama yang tidak relevan dan terus bertanya tentang peralatan backpacking atau rencana perjalanan masa lalu Anda, mengabaikan permintaan Anda saat ini.

**Solusi:** Setelah jumlah giliran tertentu atau ketika konteks tumbuh terlalu besar, agen harus **meringkas bagian percakapan yang paling baru dan relevan** – memfokuskan pada tanggal perjalanan dan tujuan Anda saat ini – dan menggunakan ringkasan terkondensasi itu untuk panggilan LLM berikutnya, membuang chat historis yang kurang relevan.

### Kebingungan Konteks

**Apa itu:** Ketika konteks yang tidak perlu, sering kali dalam bentuk terlalu banyak alat yang tersedia, menyebabkan model menghasilkan respons buruk atau memanggil alat yang tidak relevan. Model yang lebih kecil sangat rentan terhadap ini.

**Apa yang harus dilakukan:** Terapkan **manajemen loadout alat** menggunakan teknik RAG. Simpan deskripsi alat dalam basis data vektor dan pilih _hanya_ alat yang paling relevan untuk setiap tugas spesifik. Penelitian menunjukkan membatasi pilihan alat hingga kurang dari 30.

**Contoh Pemesanan Perjalanan:** Agen Anda memiliki akses ke puluhan alat: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations`, dll. Anda bertanya, **"Apa cara terbaik untuk berkeliling Paris?"** Karena jumlah alat yang banyak, agen bingung dan mencoba memanggil `book_flight` _di dalam_ Paris, atau `rent_car` meskipun Anda lebih memilih transportasi umum, karena deskripsi alat mungkin tumpang tindih atau agen tidak dapat membedakan mana yang terbaik.

**Solusi:** Gunakan **RAG atas deskripsi alat**. Ketika Anda bertanya tentang cara berkeliling Paris, sistem secara dinamis mengambil hanya alat yang paling relevan seperti `rent_car` atau `public_transport_info` berdasarkan kueri Anda, menyajikan "loadout" alat yang terfokus kepada LLM.

### Benturan Konteks

**Apa itu:** Ketika informasi yang saling bertentangan ada dalam konteks, yang mengarah pada penalaran yang tidak konsisten atau respons akhir yang buruk. Ini sering terjadi ketika informasi tiba secara bertahap, dan asumsi awal yang salah tetap ada dalam konteks.

**Apa yang harus dilakukan:** Gunakan **pemangkasan konteks** dan **offloading**. Pemangkasan berarti menghapus informasi yang kedaluwarsa atau bertentangan saat detail baru datang. Offloading memberi model ruang kerja "scratchpad" terpisah untuk memproses informasi tanpa mengacaukan konteks utama.

**Contoh Pemesanan Perjalanan:** Anda awalnya memberi tahu agen Anda, **"Saya ingin terbang kelas ekonomi."** Kemudian dalam percakapan, Anda berubah pikiran dan berkata, **"Sebenarnya, untuk perjalanan ini, mari kita pilih kelas bisnis."** Jika kedua instruksi tetap ada dalam konteks, agen mungkin menerima hasil pencarian yang bertentangan atau bingung tentang preferensi mana yang harus diprioritaskan.

**Solusi:** Terapkan **pemangkasan konteks**. Ketika instruksi baru bertentangan dengan yang lama, instruksi lama dihapus atau secara eksplisit digantikan dalam konteks. Alternatifnya, agen dapat menggunakan **scratchpad** untuk merekonsiliasi preferensi yang bertentangan sebelum memutuskan, memastikan hanya instruksi akhir yang konsisten yang membimbing tindakannya.

## Punya Pertanyaan Lebih Lanjut tentang Rekayasa Konteks?

Bergabunglah dengan [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) untuk bertemu dengan pelajar lain, menghadiri jam konsultasi dan mendapatkan jawaban atas pertanyaan tentang Agen AI Anda.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Penafian:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya mencapai ketepatan, harap diperhatikan bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang otoritatif. Untuk informasi yang bersifat krusial, disarankan menggunakan terjemahan profesional oleh penerjemah manusia. Kami tidak bertanggung jawab atas setiap kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->