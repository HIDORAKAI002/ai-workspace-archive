# Menjalankan contoh

Di sini kami anggap anda sudah mempunyai kod pelayan yang berfungsi. Sila cari pelayan dari salah satu bab terdahulu.

## Sediakan mcp.json

Berikut adalah fail yang anda gunakan sebagai rujukan, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Tukar entri pelayan mengikut keperluan untuk menunjuk jalan mutlak ke pelayan anda termasuk arahan penuh yang diperlukan untuk menjalankan.

Dalam contoh fail yang dirujuk di atas, entri pelayan kelihatan seperti ini:

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

Anda mungkin perlu memasukkan akar repositori GitHub, yang boleh diperoleh dari arahan, `git rev-parse --show-toplevel`.

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

Ini sepadan dengan menjalankan arahan seperti ini: `node build/index.js`.

- Tukar entri pelayan ini agar sesuai dengan lokasi fail pelayan anda atau apa yang diperlukan untuk memulakan pelayan bergantung pada runtime dan lokasi pelayan yang dipilih.

## Gunakan ciri dalam pelayan

- Klik ikon `play`, setelah anda menambah *mcp.json* ke folder *./vscode*,

    Perhatikan ikon peralatan berubah untuk meningkatkan bilangan alat yang tersedia. Ikon peralatan terletak tepat di atas medan chat di GitHub Copilot.

## Jalankan alat

- Taip arahan dalam tetingkap chat anda yang sepadan dengan deskripsi alat anda. Contohnya untuk mengaktifkan alat `add` taip sesuatu seperti "add 3 to 20".

    Anda harus melihat alat dipersembahkan di atas kotak teks chat menunjukkan supaya anda memilih untuk menjalankan alat seperti dalam visual ini:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/ms/vscode-agent.d5a0e0b897331060.webp)

    Memilih alat itu seharusnya menghasilkan keputusan angka mengatakan "23" jika arahan anda seperti yang kami nyatakan sebelum ini.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->