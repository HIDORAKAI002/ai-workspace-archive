# Örneği çalıştır

## Sanal ortam oluştur

```sh
python -m venv venv
source ./venv/bin/activate
```

## Bağımlılıkları yükle

```sh
pip install "mcp[cli]"
```

## Sunucuyu çalıştır

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot ve VS Code ile sunucuyu test et

mcp.json dosyasına şu şekilde giriş ekleyin:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Sunucuda "başlat" düğmesine tıkladığınızdan emin olun.

GitHub Copilot içinde aşağıdaki komutu yapıştırın:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

İlk seferinde Sampling eylemini kabul edip etmeyeceğiniz sorulacak, ardından "create_blog" aracının çalıştırılmasını kabul etmeniz istenecek. Benzer bir yanıt görmelisiniz:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstersek de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayın. Orijinal belge, kendi ana dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucunda ortaya çıkabilecek yanlış anlamalar veya yanlış yorumlamalar nedeniyle sorumluluk kabul edilmemektedir.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->