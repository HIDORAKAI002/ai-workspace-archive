---
name: testing-course-samples
---
# Kurs Örneklerini Test Etme

Ders not defterlerinin ve kod örneklerinin canlı bir
Microsoft Foundry / Azure OpenAI kurulumu üzerinde çalıştığını doğrulayın. Repo,
her bir Python not defterini başlıksız olarak çalıştıran ve bir GEÇTİ/KALDI matrisi yazdıran
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) adında bir çalıştırıcı sağlar.

## Ne zaman kullanılmalı
- "Tüm not defterlerini / örnekleri Azure aboneliğime karşı doğrula."
- "Paketleri güncelledikten veya modelleri değiştirdikten sonra kursu hızlıca test et."
- "Hangi dersler hala canlı olarak geçiyor / kalıyor?"

Bu aracı, AI Smoke Test GitHub Action için **kullanmayın** (bu eylem *kullanıma alınmış*
barındırılan ajanları doğrular — bkz. [`tests/README.md`](../../../tests/README.md)). Bu beceri
not defterlerini yerel olarak çalıştırır.

## Önkoşullar (önce kontrol edin)
1. Kurs bağımlılıkları ile **Python 3.12+**: `python -m pip install -r requirements.txt`
   ve ayrıca yürütücü: `python -m pip install nbconvert ipykernel`.
2. Repo kökünde **`.env` dosyası** ( [`.env.example`](../../../../../.env.example) dosyasından kopyalayın) en azından şunları içermeli:
   - `AZURE_AI_PROJECT_ENDPOINT` — Foundry proje uç noktası
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — kullanımdan kalkmamış bir dağıtım (örn. `gpt-4.1-mini`)
   - Azure OpenAI'yi doğrudan çağıran dersler için `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) ve `AZURE_OPENAI_DEPLOYMENT`
     (Ders 06, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** tamamlanmış — örnekler `AzureCliCredential` ile kimlik doğrular (Entra ID, anahtarsız).
4. Model dağıtımının mevcut olduğunu doğrulayın:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Doğrulamayı Çalıştırma
```powershell
# Tüm Python defterleri (.NET, .venv, site-packages, çeviriler, yetenek varlıkları atlanır)
pwsh scripts/validate-notebooks.ps1

# Hücre başına daha uzun zamanaşımıyla tek bir ders
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Sadece çalışacakları listele (çalıştırma yok)
pwsh scripts/validate-notebooks.ps1 -List

# Açıkça yorumlayıcı (örneğin `python` PATH'ta değilse, Windows Store takma adı gibi)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Betik, yürütülen kopyaları, not-defterine özel günlükleri ve `results.json` dosyasını
`$env:TEMP\aiab-nbval` yoluna yazar ve başarısızlık sayısı ile çıkar.

## Sonuçların Yorumlanması
- `GEÇTİ` — not defteri baştan sona herhangi bir hücre hatası olmadan çalıştı.
- `KALDI` — ilk `*Error` / `*Exception` satırı gösterilir; tam geri izleme için
  çıktı dizinindeki eşleşen `log_*.txt` dosyasını açın.
- Tek bir not defteri başarısızlığı, `-Timeout` tarafından sınırlandırılır (her hücre için), böylece takılan
  insan-dahil hücre asılı kalmak yerine `StdinNotImplementedError` olarak görünür.

## Ek kaynak gerektiren dersler (bunlar olmadan başarısız olmaları beklenir)
| Ders | Ek gereksinim |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, anahtar) — bellekte bir yedek yolu var |
| 11 MCP / GitHub | GitHub MCP sunucusu + PAT |
| 13 memory (cognee) | `cognee` model sağlayıcı ile yapılandırıldı |
| 15 browser-use | Playwright tarayıcıları yüklü (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 local agent | Foundry Local çalışma zamanı + indirilmiş bir Qwen modeli (cihaz üzerinde, bulut yok) |
| `*-dotnet-*` not defterleri | .NET Interactive çekirdeği (varsayılan olarak hariç tutulur; `-IncludeDotnet` kullanın) |

## Geri Bildirim
Dersi baz alarak gruplandırılmış bir GEÇTİ/KALDI tablosu olarak özetleyin. Gerçek regresyonları
(düzeltilmesi gereken kod/konfigürasyon hataları) ortam eksikliklerinden (Eksik Search/Foundry Local/PAT)
ayırın ve her gerçek hata için başarısız olan `log_*.txt` dosyasını belirtin.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->