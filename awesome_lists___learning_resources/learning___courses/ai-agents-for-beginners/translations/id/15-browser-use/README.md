# Membangun Agen Penggunaan Komputer (CUA)

Agen penggunaan komputer dapat berinteraksi dengan situs web dengan cara yang sama seperti manusia: dengan membuka browser, memeriksa halaman, dan mengambil tindakan terbaik selanjutnya dari apa yang mereka lihat. Dalam pelajaran ini, Anda akan membangun agen otomasi browser yang mencari Airbnb, mengekstrak data listing terstruktur, dan mengidentifikasi penginapan termurah di Stockholm.

Pelajaran ini menggabungkan Browser-Use untuk navigasi yang digerakkan AI, Playwright dan Protokol DevTools Chrome (CDP) untuk kontrol browser, Azure OpenAI untuk penalaran yang diaktifkan oleh visi, dan Pydantic untuk ekstraksi terstruktur.

## Pengantar

Pelajaran ini akan membahas:

- Memahami kapan agen penggunaan komputer lebih cocok dibandingkan otomasi hanya dengan API
- Menggabungkan Browser-Use dengan Playwright dan CDP untuk manajemen siklus hidup browser yang andal
- Menggunakan Azure OpenAI vision dan output terstruktur Pydantic untuk mengekstrak data listing dari halaman web dinamis
- Memutuskan kapan menggunakan alur kerja otomasi browser agen-pertama, aktor-pertama, atau hibrida

## Tujuan Pembelajaran

Setelah menyelesaikan pelajaran ini, Anda akan tahu bagaimana:

- Mengonfigurasi Browser-Use dengan Azure OpenAI dan Playwright
- Membangun alur kerja otomasi browser yang menavigasi situs web nyata dan menangani elemen UI dinamis
- Mengekstrak hasil bertipe dari konten halaman yang terlihat dan mengubahnya menjadi logika bisnis hilir
- Memilih antara pola agen dan aktor berdasarkan seberapa dapat diprediksi tugas browser

## Contoh Kode

Pelajaran ini mencakup satu tutorial notebook:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Meluncurkan sesi Chrome melalui CDP, mencari listing Stockholm di Airbnb, mengekstrak harga dengan vision Browser-Use, dan mengembalikan opsi termurah sebagai data terstruktur.

## Prasyarat

- Python 3.12+
- Penempatan Azure OpenAI dikonfigurasi di lingkungan Anda
- Chrome atau Chromium terinstal secara lokal
- Dependensi Playwright terpasang
- Familiaritas dasar dengan Python async

## Pengaturan

Instal paket-paket yang digunakan dalam notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Atur variabel lingkungan Azure OpenAI yang digunakan oleh notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Opsional: menggunakan versi API terbaru secara default jika tidak disertakan
AZURE_OPENAI_API_VERSION=...
```

## Gambaran Arsitektur

Notebook ini menunjukkan alur kerja otomasi browser hibrida:

1. Chrome mulai dengan CDP diaktifkan sehingga Playwright dan Browser-Use dapat berbagi sesi browser yang sama.
2. Agen Browser-Use menangani tugas navigasi terbuka seperti membuka Airbnb, menutup pop-up, dan mencari Stockholm.
3. Halaman aktif diperiksa dengan skema Pydantic terstruktur untuk mengekstrak judul listing, harga per malam, rating, dan URL.
4. Logika Python membandingkan listing yang diekstrak dan menyoroti hasil termurah.

Pendekatan ini mempertahankan penalaran berbasis visi yang fleksibel yang dikuasai Browser-Use sekaligus memberi kendali browser yang deterministik saat Anda membutuhkannya.

## Poin Penting dan Praktik Terbaik

### Kapan Menggunakan Agen vs Aktor

| Skenario | Gunakan Agen | Gunakan Aktor |
|----------|--------------|---------------|
| Tata letak dinamis | Ya, AI dapat menyesuaikan perubahan halaman | Tidak, pemilih yang rapuh bisa gagal |
| Struktur diketahui | Tidak, agen lebih lambat daripada kontrol langsung | Ya, cepat dan tepat |
| Mencari elemen | Ya, bahasa alami berjalan dengan baik | Tidak, pengenal tepat diperlukan |
| Kontrol waktu | Tidak, kurang dapat diprediksi | Ya, kontrol penuh atas tunggu dan percobaan ulang |
| Alur kerja kompleks | Ya, menangani keadaan UI tak terduga | Tidak, memerlukan cabang eksplisit |

### Praktik Terbaik Browser-Use

1. Mulai dengan agen untuk eksplorasi dan navigasi dinamis.
2. Beralih ke kontrol halaman langsung ketika interaksi menjadi dapat diprediksi.
3. Gunakan model output terstruktur agar data yang diekstrak tervalidasi dan bertipe aman.
4. Tambahkan penundaan secara strategis setelah aksi yang memicu perubahan UI terlihat.
5. Ambil tangkapan layar selama iterasi agar kegagalan lebih mudah didebug.
6. Harapkan situs web berubah dan rancang strategi cadangan untuk pop-up dan perubahan tata letak.
7. Gabungkan pola agen dan aktor untuk mendapatkan fleksibilitas sekaligus presisi.

### Aplikasi di Dunia Nyata

- Pemesanan perjalanan dan pemantauan harga
- Perbandingan harga e-commerce dan pengecekan ketersediaan
- Ekstraksi terstruktur dari situs web dinamis
- Pengujian dan verifikasi UI yang sadar visi
- Pemantauan dan pemberitahuan situs web
- Pengisian formulir cerdas di alur multi-langkah

## Sumber Tambahan

- [Template integrasi Browser-Use Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parameter aktor Browser-Use dan ekstraksi konten](https://docs.browser-use.com/customize/actor/all-parameters)
- [Pengaturan Kursus](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk memberikan terjemahan yang akurat, harap diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidaktepatan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas segala kesalahpahaman atau salah tafsir yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->