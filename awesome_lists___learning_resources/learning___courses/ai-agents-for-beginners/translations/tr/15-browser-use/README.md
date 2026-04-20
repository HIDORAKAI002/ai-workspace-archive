# Bilgisayar Kullanım Ajanları (CUA) Oluşturma

Bilgisayar kullanım ajanları, bir kişinin yapacağı gibi bir tarayıcı açarak, sayfayı inceleyerek ve gördüklerinden sonraki en iyi adımı atarak web siteleriyle etkileşim kurabilir. Bu derste, Airbnb'de arama yapan, yapılandırılmış liste verileri çıkaran ve Stockholm'deki en ucuz konaklamayı belirleyen bir tarayıcı otomasyon ajanı oluşturacaksınız.

Ders, AI destekli gezinme için Browser-Use, tarayıcı kontrolü için Playwright ve Chrome DevTools Protokolü (CDP), görsel destekli mantık için Azure OpenAI ve yapılandırılmış çıkarım için Pydantic'i bir araya getirir.

## Giriş

Bu ders şunları kapsayacak:

- Bilgisayar kullanım ajanlarının API-tabanlı otomasyondan ne zaman daha uygun olduğunu anlama
- Güvenilir tarayıcı yaşam döngüsü yönetimi için Browser-Use'un Playwright ve CDP ile birleştirilmesi
- Dinamik web sayfalarından liste verilerini çıkarmak için Azure OpenAI görme ve yapılandırılmış Pydantic çıktısını kullanma
- Ajan öncelikli, aktör öncelikli veya hibrit tarayıcı otomasyon iş akışını ne zaman kullanacağınıza karar verme

## Öğrenme Hedefleri

Bu dersi tamamladıktan sonra şunları bileceksiniz:

- Browser-Use'u Azure OpenAI ve Playwright ile yapılandırmak
- Gerçek bir web sitesinde gezinme yapabilen ve dinamik UI öğeleriyle başa çıkan bir tarayıcı otomasyon iş akışı oluşturmak
- Görünen sayfa içeriğinden türlendirilmiş sonuçlar çıkarıp bunları sonraki iş mantığına dönüştürmek
- Tarayıcı görevinin ne kadar öngörülebilir olduğuna bağlı olarak ajan ve aktör kalıpları arasında seçim yapmak

## Kod Örneği

Bu ders bir defter öğreticisi içerir:

- [15-browser-user.ipynb](./15-browser-user.ipynb): CDP üzerinden bir Chrome oturumu başlatır, Airbnb'de Stockholm listelerini arar, Browser-Use görme ile fiyatları çıkarır ve en ucuz seçeneği yapılandırılmış veri olarak döndürür.

## Ön Koşullar

- Python 3.12+
- Ortamınızda yapılandırılmış Azure OpenAI dağıtımı
- Yerel olarak kurulu Chrome veya Chromium
- Kurulu Playwright bağımlılıkları
- Async Python hakkında temel bilgi

## Kurulum

Defterde kullanılan paketleri yükleyin:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Defterde kullanılan Azure OpenAI ortam değişkenlerini ayarlayın:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# İsteğe bağlı: Atlandığında varsayılan en son API sürümüdür
AZURE_OPENAI_API_VERSION=...
```

## Mimari Genel Bakış

Defter hibrit bir tarayıcı otomasyon iş akışını gösterir:

1. Chrome, Playwright ve Browser-Use'un aynı tarayıcı oturumunu paylaşabilmesi için CDP etkin olarak başlar.
2. Browser-Use ajanı, Airbnb'yi açmak, açılır pencereleri kapatmak ve Stockholm araması yapmak gibi açık uçlu gezinme görevlerini yönetir.
3. Aktif sayfa, liste başlıkları, gecelik fiyatlar, değerlendirmeler ve URL'leri çıkarmak için yapılandırılmış bir Pydantic şeması ile incelenir.
4. Python mantığı, çıkarılan listeyi karşılaştırır ve en ucuz sonucu vurgular.

Bu yaklaşım, Browser-Use'un iyi olduğu esnek, görsel tabanlı mantığı korurken ihtiyacınız olduğunda size belirleyici tarayıcı kontrolü sağlar.

## Temel Çıkarımlar ve En İyi Uygulamalar

### Ajan mı Aktör mü Kullanmalı?

| Senaryo | Ajan Kullan | Aktör Kullan |
|----------|-------------|--------------|
| Dinamik düzenler | Evet, AI sayfa değişikliklerine uyum sağlar | Hayır, hassas seçiciler kırılabilir |
| Bilinen yapı | Hayır, ajan doğrudan kontrolden daha yavaştır | Evet, hızlı ve hassas |
| Öğeleri bulma | Evet, doğal dil iyi çalışır | Hayır, kesin seçiciler gereklidir |
| Zamanlama kontrolü | Hayır, daha az öngörülebilir | Evet, beklemeler ve denemeler tam kontrol altında |
| Karmaşık iş akışları | Evet, beklenmedik UI durumlarını yönetir | Hayır, açık dallanma gerekir |

### Browser-Use En İyi Uygulamaları

1. Keşif ve dinamik gezinme için bir ajanla başlayın.
2. Etkileşim öngörülebilir hale geldiğinde doğrudan sayfa kontrolüne geçin.
3. Çıkarılan verilerin doğrulanması ve tip güvenliği için yapılandırılmış çıktı modelleri kullanın.
4. Görünür UI değişikliklerini tetikleyen eylemlerden sonra gecikmeleri stratejik olarak ekleyin.
5. Hata ayıklamayı kolaylaştırmak için yineleme sırasında ekran görüntüleri alın.
6. Web sitelerinin değişmesini bekleyin ve açılır pencereler ve düzen kaymaları için yedek stratejiler tasarlayın.
7. Hem esneklik hem de hassasiyet elde etmek için ajan ve aktör kalıplarını harmanlayın.

### Gerçek Dünya Uygulamaları

- Seyahat rezervasyonu ve fiyat takibi
- E-ticaret fiyat karşılaştırması ve stok kontrolü
- Dinamik sitelerden yapılandırılmış veri çıkarımı
- Görme duyarlı UI testi ve doğrulama
- Web sitesi izleme ve uyarı
- Çok adımlı formlarda akıllı doldurma

## Ek Kaynaklar

- [Browser-Use Playwright entegrasyon şablonu](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use aktör parametreleri ve içerik çıkarımı](https://docs.browser-use.com/customize/actor/all-parameters)
- [Kurs Kurulumu](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstersek de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayın. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanılması sonucu ortaya çıkan yanlış anlamalar veya yanlış yorumlamalar için sorumluluk kabul edilmemektedir.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->