# Kejuruteraan Konteks untuk Ejen AI

[![Kejuruteraan Konteks](../../../translated_images/ms/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Klik imej di atas untuk menonton video pelajaran ini)_

Memahami kerumitan aplikasi yang anda bina agen AI adalah penting untuk menghasilkan agen yang boleh dipercayai. Kita perlu membina Ejen AI yang mengurus maklumat dengan berkesan untuk memenuhi keperluan kompleks yang melebihi kejuruteraan arahan.

Dalam pelajaran ini, kita akan melihat apa itu kejuruteraan konteks dan peranannya dalam membina ejen AI.

## Pengenalan

Pelajaran ini akan merangkumi:

• **Apa itu Kejuruteraan Konteks** dan mengapa ia berbeza dengan kejuruteraan arahan.

• **Strategi Kejuruteraan Konteks yang berkesan**, termasuk bagaimana menulis, memilih, memampatkan, dan mengasingkan maklumat.

• **Kegagalan Konteks Biasa** yang boleh menggagalkan ejen AI anda dan cara untuk membaikinya.

## Matlamat Pembelajaran

Selepas menamatkan pelajaran ini, anda akan memahami cara untuk:

• **Mentakrifkan kejuruteraan konteks** dan membezakannya daripada kejuruteraan arahan.

• **Mengenal pasti komponen utama konteks** dalam aplikasi Model Bahasa Besar (LLM).

• **Mengaplikasikan strategi untuk menulis, memilih, memampatkan, dan mengasingkan konteks** untuk meningkatkan prestasi ejen.

• **Mengenal pasti kegagalan konteks biasa** seperti pencemaran, gangguan, kekeliruan, dan pertembungan, serta melaksanakan teknik mitigasi.

## Apa itu Kejuruteraan Konteks?

Bagi Ejen AI, konteks adalah yang menggerakkan perancangan Ejen AI untuk mengambil tindakan tertentu. Kejuruteraan Konteks adalah amalan memastikan Ejen AI mempunyai maklumat yang betul untuk melengkapkan langkah seterusnya dalam tugasan. Tetingkap konteks adalah terhad saiznya, jadi sebagai pembina ejen kita perlu membina sistem dan proses untuk mengurus penambahan, penghapusan, dan pemampatan maklumat dalam tetingkap konteks.

### Kejuruteraan Arahan vs Kejuruteraan Konteks

Kejuruteraan arahan memfokuskan pada satu set arahan statik untuk membimbing Ejen AI secara efektif dengan satu set peraturan. Kejuruteraan konteks adalah bagaimana mengurus set maklumat dinamik, termasuk arahan awal, untuk memastikan Ejen AI mempunyai apa yang diperlukan dari masa ke masa. Idea utama kejuruteraan konteks adalah menjadikan proses ini berulang dan boleh dipercayai.

### Jenis-Jenis Konteks

[![Jenis-Jenis Konteks](../../../translated_images/ms/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Adalah penting untuk diingat bahawa konteks bukan hanya satu perkara. Maklumat yang diperlukan oleh Ejen AI boleh datang daripada pelbagai sumber yang berbeza dan ia terpulang kepada kita untuk memastikan ejen mempunyai akses kepada sumber-sumber ini:

Jenis-jenis konteks yang perlu diuruskan oleh ejen AI termasuk:

• **Arahan:** Ini seperti "peraturan" ejen – arahan, mesej sistem, contoh sedikit-sedikit (menunjukkan cara AI melakukan sesuatu), dan keterangan alat yang boleh digunakannya. Di sinilah fokus kejuruteraan arahan bergabung dengan kejuruteraan konteks.

• **Pengetahuan:** Meliputi fakta, maklumat yang diperoleh dari pangkalan data, atau memori jangka panjang yang telah dikumpulkan oleh ejen. Ini termasuk pengintegrasian sistem Retrieval Augmented Generation (RAG) jika ejen perlu mengakses pelbagai stor pengetahuan dan pangkalan data.

• **Alat:** Ini adalah definisi fungsi luaran, API dan MCP Server yang boleh dipanggil oleh ejen, bersama maklum balas (hasil) yang diperolehi daripada penggunaannya.

• **Sejarah Perbualan:** Dialog yang sedang berlangsung dengan pengguna. Apabila masa berlalu, perbualan ini menjadi lebih panjang dan kompleks yang bermakna ia mengambil ruang dalam tetingkap konteks.

• **Keutamaan Pengguna:** Maklumat yang dipelajari tentang kesukaan atau ketidaksukaan pengguna dari masa ke masa. Ini boleh disimpan dan dipanggil semula semasa membuat keputusan utama untuk membantu pengguna.

## Strategi untuk Kejuruteraan Konteks yang Berkesan

### Strategi Perancangan

[![Amalan Terbaik Kejuruteraan Konteks](../../../translated_images/ms/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Kejuruteraan konteks yang baik bermula dengan perancangan yang baik. Berikut adalah pendekatan yang akan membantu anda mula berfikir tentang bagaimana mengaplikasikan konsep kejuruteraan konteks:

1. **Definisikan Keputusan yang Jelas** - Keputusan tugasan yang akan diberikan kepada Ejen AI harus jelas. Jawab soalan - "Bagaimanakah dunia akan kelihatan apabila Ejen AI selesai dengan tugasan?" Dalam erti kata lain, perubahan, maklumat, atau tindak balas apa yang pengguna patut terima selepas berinteraksi dengan Ejen AI.
2. **Peta Konteks** - Setelah anda mendefinisikan keputusan Ejen AI, anda perlu menjawab soalan "Maklumat apa yang Ejen AI perlukan untuk menyelesaikan tugasan ini?". Dengan cara ini anda boleh mula memetakan konteks lokasi maklumat tersebut.
3. **Cipta Saluran Konteks** - Kini anda tahu di mana maklumat berada, anda perlu menjawab soalan "Bagaimanakah Ejen akan mendapatkan maklumat ini?". Ini boleh dilakukan dengan pelbagai cara termasuk RAG, penggunaan server MCP dan alat lain.

### Strategi Praktikal

Perancangan penting tetapi sekali maklumat mula mengalir ke dalam tetingkap konteks ejen kita, kita perlu ada strategi praktikal untuk mengurusnya:

#### Mengurus Konteks

Walaupun sesetengah maklumat akan ditambah secara automatik ke tetingkap konteks, kejuruteraan konteks adalah tentang mengambil peranan lebih aktif terhadap maklumat ini yang boleh dilakukan melalui beberapa strategi:

 1. **Pad Kerja Ejen**  
 Ini membenarkan Ejen AI mengambil nota maklumat yang relevan tentang tugasan semasa dan interaksi pengguna sepanjang satu sesi. Pad kerja ini harus wujud di luar tetingkap konteks dalam fail atau objek runtime yang boleh diperoleh semula oleh ejen pada sesi tersebut jika perlu.

 2. **Memori**  
 Pad kerja bagus untuk mengurus maklumat di luar tetingkap konteks bagi satu sesi. Memori membolehkan ejen menyimpan dan mendapatkan semula maklumat relevan merentas pelbagai sesi. Ini boleh termasuk ringkasan, keutamaan pengguna dan maklum balas untuk penambahbaikan masa hadapan.

 3. **Memampatkan Konteks**  
  Apabila tetingkap konteks membesar dan hampir mencapai had, teknik seperti penyederhanaan dan pemangkasan boleh digunakan. Ini termasuk sama ada menyimpan hanya maklumat paling relevan atau mengeluarkan mesej lama.
  
 4. **Sistem Berbilang Ejen**  
  Membangunkan sistem berbilang ejen adalah satu bentuk kejuruteraan konteks kerana setiap ejen mempunyai tetingkap konteksnya sendiri. Bagaimana konteks itu dikongsi dan dipindahkan kepada ejen yang berbeza adalah satu lagi perkara untuk dirancang semasa membina sistem ini.
  
 5. **Persekitaran Pasir**  
  Jika ejen perlu menjalankan beberapa kod atau memproses sejumlah besar maklumat dalam dokumen, ini boleh mengambil sejumlah besar token untuk memproses hasil. Daripada menyimpan semua ini dalam tetingkap konteks, ejen boleh menggunakan persekitaran pasir yang dapat menjalankan kod ini dan hanya membaca keputusan dan maklumat relevan lain.
  
 6. **Objek Keadaan Runtime**  
   Ini dilakukan dengan mencipta bekas maklumat untuk mengurus situasi apabila Ejen perlu mengakses maklumat tertentu. Untuk tugasan kompleks, ini membolehkan Ejen menyimpan hasil setiap sub-tugasan langkah demi langkah, membolehkan konteks kekal hanya terhubung kepada sub-tugasan tersebut.
  
### Contoh Kejuruteraan Konteks

Katakan kita mahu ejen AI untuk **"Tempahkan saya perjalanan ke Paris."**

• Ejen mudah yang hanya menggunakan kejuruteraan arahan mungkin hanya membalas: **"Baik, bila anda mahu pergi ke Paris?"**. Ia hanya memproses soalan langsung anda pada masa pengguna bertanya.

• Ejen yang menggunakan strategi kejuruteraan konteks yang dibincangkan akan melakukan lebih dari itu. Sebelum memberi respons, sistemnya mungkin:

  ◦ **Semak kalendar anda** untuk tarikh yang tersedia (mengambil data masa nyata).

 ◦ **Kenang keutamaan perjalanan lepas** (dari memori jangka panjang) seperti syarikat penerbangan pilihan anda, bajet, atau sama ada anda lebih suka penerbangan terus.

 ◦ **Kenal pasti alat yang ada** untuk tempahan penerbangan dan hotel.

- Kemudian, contoh respons boleh jadi: "Hai [Nama Anda]! Saya lihat anda lapang pada minggu pertama Oktober. Adakah saya perlu cari penerbangan terus ke Paris dengan [Syarikat Penerbangan Pilihan] dalam bajet biasa anda [Bajet]?" Respons yang lebih kaya dan sedar konteks ini menunjukkan kehebatan kejuruteraan konteks.

## Kegagalan Konteks Biasa

### Pencemaran Konteks

**Apa itu:** Apabila halusinasi (maklumat palsu yang dihasilkan oleh LLM) atau ralat masuk ke dalam konteks dan dirujuk berulang kali, menyebabkan ejen mengejar matlamat yang mustahil atau membangunkan strategi yang tidak masuk akal.

**Apa yang perlu dibuat:** Laksanakan **pengesahan konteks** dan **kuarantin**. Sahkan maklumat sebelum ditambah ke memori jangka panjang. Jika pencemaran dikesan, mulakan benang konteks baharu untuk menghalang maklumat buruk merebak.

**Contoh Tempahan Perjalanan:** Ejen anda berhalusinasi ada **penerbangan terus dari lapangan terbang tempatan kecil ke bandar antarabangsa yang jauh** yang sebenarnya tidak menawarkan penerbangan antarabangsa. Maklumat penerbangan yang tidak wujud ini disimpan dalam konteks. Kemudian, apabila anda minta ejen untuk menempah, ia terus mencari tiket untuk laluan mustahil ini, menyebabkan ralat berulang.

**Penyelesaian:** Laksanakan langkah yang **mengesahkan kewujudan penerbangan dan laluan dengan API masa nyata** _sebelum_ menambah maklumat penerbangan ke konteks kerja ejen. Jika pengesahan gagal, maklumat salah "dikuarantin" dan tidak digunakan selanjutnya.

### Gangguan Konteks

**Apa itu:** Apabila konteks menjadi sangat besar sehingga model terlalu fokus pada sejarah terkumpul dan bukan menggunakan apa yang dipelajari semasa latihan, menyebabkan tindakan berulang atau tidak membantu. Model mungkin mula membuat kesilapan walaupun sebelum tetingkap konteks penuh.

**Apa yang perlu dibuat:** Gunakan **penyederhanaan konteks**. Berkala mampatkan maklumat terkumpul ke dalam ringkasan lebih pendek, mengekalkan butiran penting sambil membuang sejarah berlebihan. Ini membantu "menetapkan semula" fokus.

**Contoh Tempahan Perjalanan:** Anda telah berbincang mengenai pelbagai destinasi impian untuk masa yang lama, termasuk kisah terperinci tentang perjalanan backpack anda dari dua tahun lalu. Apabila akhirnya anda minta **"cari saya penerbangan murah untuk bulan depan,"** ejen terbeban dengan butiran lama yang tidak relevan dan terus bertanya mengenai peralatan backpack anda atau itinerary lama, mengabaikan permintaan terkini anda.

**Penyelesaian:** Selepas beberapa pusingan atau apabila konteks menjadi terlalu besar, ejen perlu **meringkaskan bahagian perbualan yang paling baru dan relevan** – menumpu pada tarikh perjalanan dan destinasi terkini – dan menggunakan ringkasan padat itu untuk panggilan LLM seterusnya, membuang sembang sejarah kurang relevan.

### Kekeliruan Konteks

**Apa itu:** Apabila konteks yang tidak perlu, selalunya dalam bentuk terlalu banyak alat tersedia, menyebabkan model menghasilkan respons buruk atau memanggil alat yang tidak relevan. Model lebih kecil amat cenderung mengalami ini.

**Apa yang perlu dibuat:** Laksanakan **pengurusan alat** menggunakan teknik RAG. Simpan keterangan alat dalam pangkalan data vektor dan pilih _hanya_ alat yang paling relevan untuk setiap tugasan khusus. Kajian menunjukkan had pemilihan alat kurang dari 30.

**Contoh Tempahan Perjalanan:** Ejen anda mempunyai akses kepada berpuluh-puluh alat: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations`, dan lain-lain. Anda bertanya, **"Apakah cara terbaik untuk bergerak di Paris?"** Kerana terlalu banyak alat, ejen keliru dan cuba memanggil `book_flight` _dalam_ Paris, atau `rent_car` walaupun anda lebih suka pengangkutan awam, kerana keterangan alat mungkin bertindih atau ia tidak dapat membezakan yang terbaik.

**Penyelesaian:** Gunakan **RAG ke atas keterangan alat**. Apabila anda bertanya tentang bergerak di Paris, sistem akan dapatkan secara dinamik _hanya_ alat paling relevan seperti `rent_car` atau `public_transport_info` berdasarkan pertanyaan anda, mempersembahkan "loadout" alat fokus kepada LLM.

### Pertembungan Konteks

**Apa itu:** Apabila maklumat bertentangan wujud dalam konteks, menyebabkan penalaran tidak konsisten atau respons akhir yang buruk. Ini selalunya berlaku apabila maklumat tiba secara berperingkat, dan anggapan awal yang salah kekal dalam konteks.

**Apa yang perlu dibuat:** Gunakan **pemangkasan konteks** dan **pemindahan keluar**. Pemangkasan bermakna mengeluarkan maklumat lama atau bertentangan apabila butiran baru tiba. Pemindahan keluar memberi model ruang kerja "pad kerja" berasingan untuk memproses maklumat tanpa menyusahkan konteks utama.

**Contoh Tempahan Perjalanan:** Anda mula-mula memberitahu ejen anda, **"Saya mahu terbang kelas ekonomi."** Kemudian dalam perbualan, anda tukar fikiran dan berkata, **"Sebenarnya, untuk perjalanan ini, mari kita guna kelas perniagaan."** Jika kedua-dua arahan kekal dalam konteks, ejen mungkin menerima hasil carian bertentangan atau keliru mana satu keutamaan yang patut diutamakan.

**Penyelesaian:** Laksanakan **pemangkasan konteks**. Apabila arahan baru bertentangan dengan yang lama, arahan lama dikeluarkan atau secara eksplisit ditulis ganti dalam konteks. Sebagai alternatif, ejen boleh menggunakan **pad kerja** untuk memadankan keutamaan bertentangan sebelum membuat keputusan, memastikan hanya arahan akhir yang konsisten membimbing tindakannya.

## Ada Soalan Lagi Mengenai Kejuruteraan Konteks?

Sertai [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) untuk berjumpa dengan pelajar lain, hadir waktu pejabat dan dapatkan soalan Ejen AI anda dijawab.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat yang penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->