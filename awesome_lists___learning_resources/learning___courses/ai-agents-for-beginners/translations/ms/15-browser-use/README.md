# Membina Ejen Penggunaan Komputer (CUA)

Ejen penggunaan komputer boleh berinteraksi dengan laman web sama seperti seorang manusia: dengan membuka pelayar, memeriksa halaman, dan mengambil tindakan terbaik seterusnya berdasarkan apa yang mereka lihat. Dalam pelajaran ini, anda akan membina ejen automasi pelayar yang mencari Airbnb, mengekstrak data penyenaraian berstruktur, dan mengenal pasti penginapan termurah di Stockholm.

Pelajaran ini menggabungkan Browser-Use untuk navigasi dipacu AI, Playwright dan Protokol DevTools Chrome (CDP) untuk kawalan pelayar, Azure OpenAI untuk penalaran berkeupayaan visi, dan Pydantic untuk ekstraksi berstruktur.

## Pengenalan

Pelajaran ini akan merangkumi:

- Memahami bila ejen penggunaan komputer lebih sesuai daripada automasi hanya API
- Menggabungkan Browser-Use dengan Playwright dan CDP untuk pengurusan kitar hayat pelayar yang boleh dipercayai
- Menggunakan Azure OpenAI visi dan output berstruktur Pydantic untuk mengekstrak data penyenaraian daripada halaman web dinamik
- Memutuskan bila menggunakan aliran kerja automasi pelayar berorientasikan ejen, pelakon, atau hibrid

## Matlamat Pembelajaran

Selepas menyelesaikan pelajaran ini, anda akan tahu bagaimana untuk:

- Mengkonfigurasi Browser-Use dengan Azure OpenAI dan Playwright
- Membina aliran kerja automasi pelayar yang melayari laman web sebenar dan mengendalikan elemen UI dinamik
- Mengekstrak keputusan bertipe daripada kandungan halaman yang kelihatan dan menukarnya kepada logik perniagaan hiliran
- Memilih antara corak ejen dan pelakon berdasarkan betapa boleh jangka tugas pelayar tersebut

## Contoh Kod

Pelajaran ini termasuk satu tutorial notebook:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Melancarkan sesi Chrome melalui CDP, mencari penyenaraian Stockholm di Airbnb, mengekstrak harga dengan visi Browser-Use, dan mengembalikan pilihan termurah sebagai data berstruktur.

## Prasyarat

- Python 3.12+
- Penyediaan Azure OpenAI dikonfigurasi dalam persekitaran anda
- Chrome atau Chromium dipasang secara tempatan
- Kebergantungan Playwright dipasang
- Kefahaman asas tentang Python asynchronous

## Persediaan

Pasang pakej yang digunakan dalam notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Tetapkan pembolehubah persekitaran Azure OpenAI yang digunakan oleh notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Pilihan: secara lalai menggunakan versi API terkini apabila diabaikan
AZURE_OPENAI_API_VERSION=...
```

## Gambaran Keseluruhan Seni Bina

Notebook ini menunjukkan aliran kerja automasi pelayar hibrid:

1. Chrome bermula dengan CDP diaktifkan supaya Playwright dan Browser-Use boleh berkongsi sesi pelayar yang sama.
2. Ejen Browser-Use mengendalikan tugas navigasi terbuka seperti membuka Airbnb, menutup pop-up, dan mencari Stockholm.
3. Halaman aktif diperiksa dengan skema Pydantic berstruktur untuk mengekstrak tajuk penyenaraian, harga malam, penilaian, dan URL.
4. Logik Python membandingkan penyenaraian yang diekstrak dan menonjolkan keputusan termurah.

Pendekatan ini mengekalkan penalaran berasaskan visi yang fleksibel yang Browser-Use mahir sambil masih memberi anda kawalan pelayar deterministik apabila anda memerlukannya.

## Perkara Penting dan Amalan Terbaik

### Bila Menggunakan Ejen vs Pelakon

| Senario | Gunakan Ejen | Gunakan Pelakon |
|----------|-----------|-----------|
| Susun atur dinamik | Ya, AI boleh sesuaikan dengan perubahan halaman | Tidak, pemilih yang rapuh mungkin rosak |
| Struktur diketahui | Tidak, ejen lebih perlahan daripada kawalan langsung | Ya, pantas dan tepat |
| Mencari elemen | Ya, bahasa semula jadi berkesan | Tidak, pemilih tepat diperlukan |
| Kawalan masa | Tidak, kurang boleh diramalkan | Ya, kawalan penuh ke atas menunggu dan cubaan semula |
| Aliran kerja kompleks | Ya, mengendalikan keadaan UI yang tidak dijangka | Tidak, memerlukan cabang eksplisit |

### Amalan Terbaik Browser-Use

1. Mulakan dengan ejen untuk eksplorasi dan navigasi dinamik.
2. Beralih ke kawalan halaman langsung apabila interaksi menjadi boleh dijangka.
3. Gunakan model output berstruktur supaya data yang diekstrak disahkan dan selamat jenis.
4. Tambah kelewatan secara strategik selepas tindakan yang mencetuskan perubahan UI yang kelihatan.
5. Tangkap tangkapan skrin semasa iterasi supaya kegagalan lebih mudah untuk debug.
6. Jangka laman web berubah dan reka strategi fallback untuk pop-up dan peralihan susun atur.
7. Gabungkan corak ejen dan pelakon untuk mendapatkan fleksibiliti dan ketepatan.

### Aplikasi Dunia Sebenar

- Tempahan perjalanan dan pemantauan harga
- Perbandingan harga e-dagang dan semakan ketersediaan
- Ekstraksi berstruktur daripada laman web dinamik
- Ujian dan pengesahan UI berasaskan visi
- Pemantauan laman web dan pemberitahuan
- Pengisian borang pintar merentasi aliran berbilang langkah

## Sumber Tambahan

- [Templat integrasi Playwright Browser-Use](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parameter pelakon Browser-Use dan ekstraksi kandungan](https://docs.browser-use.com/customize/actor/all-parameters)
- [Persediaan Kursus](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha mencapai ketepatan, sila maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sah. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->