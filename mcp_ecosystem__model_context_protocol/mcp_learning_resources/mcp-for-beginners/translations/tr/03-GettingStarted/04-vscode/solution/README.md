# Örnek Çalıştırma

Burada zaten çalışan bir sunucu kodunuzun olduğunu varsayıyoruz. Lütfen önceki bölümlerdeki sunuculardan birini bulun.

## mcp.json Dosyasını Ayarlama

Referans olarak kullanabileceğiniz bir dosya var, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Sunucu girdisini, sunucunuzu çalıştırmak için gereken tam komutu içeren mutlak yol gösterecek şekilde gerektiği gibi değiştirin.

Yukarıda bahsedilen örnek dosyada sunucu girdisi şu şekildedir:

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

GitHub depo kökünü girmeniz gerekebilir, bu `git rev-parse --show-toplevel` komutuyla elde edilebilir.

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

Bu, şu şekilde bir komut çalıştırmaya karşılık gelir: `node build/index.js`.

- Sunucu dosyanızın bulunduğu yeri veya seçtiğiniz çalışma zamanı ile sunucu konumuna bağlı olarak sunucunuzu başlatmak için gerekenleri karşılayacak şekilde bu sunucu girdisini değiştirin.

## Sunucudaki Özellikleri Kullanma

- *mcp.json* dosyasını *./vscode* klasörüne ekledikten sonra `play` simgesine tıklayın,

    Araç simgesinin değişerek mevcut araç sayısının arttığını gözlemleyin. Araç simgesi, GitHub Copilot'ta sohbet alanının hemen üstünde bulunur.

## Bir Aracı Çalıştırma

- Sohbet penceresine aracınızın açıklamasına uygun bir komut yazın. Örneğin `add` aracını tetiklemek için "add 3 to 20" gibi bir şey yazın.

    Sohbet metin kutusunun üzerinde, aracı çalıştırmak üzere seçim yapmanızı isteyen bir araç gösterildiğini görmelisiniz, şöyle bir görselde olduğu gibi:

    ![VS Code aracın çalıştırılmasını istediğini gösteriyor](../../../../../translated_images/tr/vscode-agent.d5a0e0b897331060.webp)

    Aracı seçmek, eğer komutumuz önceki gibi ise "23" sayısal sonucunu üretmelidir.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->