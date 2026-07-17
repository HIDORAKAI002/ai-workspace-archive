# Bu örneği çalıştırmak

Bu, LLM istemci örneği için Rust çözümüdür. Bir Rust araç zinciri kurulu olmalıdır; bkz. [resmi kurulum kılavuzu](https://www.rust-lang.org/tools/install).

İstemci, GitHub Modelleri çıkarım uç noktası (`https://models.github.ai/inference/chat`) üzerinden bir modeli çağırır ve GitHub kişisel erişim belirtecinizi (PAT) `OPENAI_API_KEY` ortam değişkeninden okur.

> [!NOTE]
> Bu depodaki diğer çözümler `GITHUB_TOKEN` kullanır. Rust için, OpenAI istemci yapılandırmasına uyması amacıyla `OPENAI_API_KEY` değerini aynı değere ayarlayın.

## -0- GitHub belirtecinizi ayarlayın

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Örneği derleyin

```bash
cargo build
```

## -2- Örneği çalıştırın

```bash
cargo run
```

İstemci, hesap makinesi MCP sunucusunu başlatır, araç listesini alır ve aracı çağırmak için modeli (`openai/gpt-5-mini`) kullanır (`add` aracı). Araç çağrısını gösteren çıktı (örneğin, "Calling tool: add") ve çağrının sonucu görünmelidir.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->