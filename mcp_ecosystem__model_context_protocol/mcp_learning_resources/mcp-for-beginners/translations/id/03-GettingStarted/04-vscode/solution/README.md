# Menjalankan contoh

Di sini kami mengasumsikan Anda sudah memiliki kode server yang berfungsi. Silakan temukan server dari salah satu bab sebelumnya.

## Atur mcp.json

Berikut adalah file yang Anda gunakan sebagai referensi, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Ubah entri server sesuai kebutuhan untuk menunjukkan path absolut ke server Anda termasuk perintah lengkap yang diperlukan untuk menjalankannya.

Dalam contoh file yang disebutkan di atas, entri server terlihat seperti ini:

<details>
<summary>node.js</summary>
```json
"hello-mcp": {
    "command": "node",
    "args": [
        "build/index.js"
    ]
}
```
</details>

<details>
<summary>.NET</summary>

Anda mungkin harus memasukkan root repositori GitHub, yang dapat diambil dari perintah, `git rev-parse --show-toplevel`.

```jsonc
{
  "inputs": [
    {
      "type": "promptString",
      "id": "repository-root",
      "description": "The absolute path to the repository root"
    }
  ],
  "servers": {
    "calculator-mcp-dotnet": {
      "type": "stdio",
      "command": "dotnet",
      "args": [
        "run",
        "--project",
        "${input:repository-root}/03-GettingStarted/02-client/solution/server/server.csproj"
      ]
    }
  }
}
```

</details>

Ini sesuai dengan menjalankan perintah seperti: `node build/index.js`.

- Ubah entri server ini agar sesuai dengan lokasi file server Anda atau sesuai dengan apa yang diperlukan untuk memulai server Anda tergantung pada runtime dan lokasi server yang Anda pilih.

## Gunakan fitur di server

- Klik ikon `play`, setelah Anda menambahkan *mcp.json* ke folder *./vscode*,

    Amati ikon tooling berubah untuk menambah jumlah alat yang tersedia. Ikon tooling terletak tepat di atas bidang chat di GitHub Copilot.

## Jalankan alat

- Ketik prompt di jendela chat Anda yang sesuai dengan deskripsi alat Anda. Misalnya untuk menjalankan alat `add` ketik sesuatu seperti "add 3 to 20".

    Anda akan melihat sebuah alat yang ditampilkan di atas kotak teks chat yang menandakan untuk Anda memilih menjalankan alat tersebut seperti pada visual ini:

    ![VS Code menunjukkan ingin menjalankan alat](../../../../../translated_images/id/vscode-agent.d5a0e0b897331060.webp)

    Memilih alat tersebut harus menghasilkan hasil numerik yang mengatakan "23" jika prompt Anda seperti yang kami sebutkan sebelumnya.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->