# Menjalankan contoh ini

Ini adalah solusi Rust untuk contoh klien LLM. Anda perlu memasang toolchain Rust; lihat [panduan instal resmi](https://www.rust-lang.org/tools/install).

Klien memanggil model melalui endpoint inferensi Model GitHub (`https://models.github.ai/inference/chat`) dan membaca token akses personal GitHub (PAT) Anda dari variabel lingkungan `OPENAI_API_KEY`.

> [!NOTE]
> Solusi lain dalam repo ini menggunakan `GITHUB_TOKEN`. Untuk Rust, setel `OPENAI_API_KEY` ke nilai yang sama agar sesuai dengan konfigurasi klien OpenAI.

## -0- Setel token GitHub Anda

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Bangun contoh

```bash
cargo build
```

## -2- Jalankan contoh

```bash
cargo run
```

Klien memulai server MCP kalkulator, mengambil daftar alatnya, dan menggunakan model (`openai/gpt-5-mini`) untuk memanggil alat `add`. Anda harus melihat keluaran yang menunjukkan panggilan alat (misalnya, "Calling tool: add") dan hasil dari panggilan tersebut.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->