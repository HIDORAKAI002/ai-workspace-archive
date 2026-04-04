# Jalankan contoh

## Buat lingkungan virtual

```sh
python -m venv venv
source ./venv/bin/activate
```

## Pasang dependensi

```sh
pip install "mcp[cli]"
```

## Jalankan server

```sh
uvicorn server:app --port 8000
```

## Uji server dengan GitHub Copilot dan VS Code

Tambahkan entri ke mcp.json seperti berikut:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Pastikan Anda mengklik "start" pada server.

Di GitHub Copilot tempelkan prompt berikut:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Pada kali pertama Anda akan diminta apakah menerima tindakan Sampling, kemudian Anda akan diminta untuk menerima alat yang menjalankan "create_blog". Anda akan melihat respons yang mirip dengan:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber otoritatif. Untuk informasi yang penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang salah yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->