# Menjalankan contoh ini

Ini adalah penyelesaian Rust untuk contoh klien LLM. Anda memerlukan rantai alat Rust yang dipasang; lihat [panduan pemasangan rasmi](https://www.rust-lang.org/tools/install).

Klien memanggil model melalui titik akhir inferens Model GitHub (`https://models.github.ai/inference/chat`) dan membaca token akses peribadi GitHub (PAT) anda dari pembolehubah persekitaran `OPENAI_API_KEY`.

> [!NOTE]
> Penyelesaian lain dalam repo ini menggunakan `GITHUB_TOKEN`. Untuk Rust, tetapkan `OPENAI_API_KEY` ke nilai yang sama untuk memadankan konfigurasi klien OpenAI.

## -0- Tetapkan token GitHub anda

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Bina contoh ini

```bash
cargo build
```

## -2- Jalankan contoh ini

```bash
cargo run
```

Klien memulakan pelayan MCP kalkulator, mengambil senarai alatnya, dan menggunakan model (`openai/gpt-5-mini`) untuk memanggil alat `add`. Anda akan melihat keluaran yang menunjukkan panggilan alat (contohnya, "Memanggil alat: add") dan hasil panggilan itu.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->