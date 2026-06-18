# AGENTS.md

## Proje Genel Bakışı

**Yeni Başlayanlar için MCP**, Model Context Protocol (MCP) - yapay zeka modelleri ile istemci uygulamalar arasındaki etkileşimler için standartlaştırılmış bir çerçeve - öğrenmek için açık kaynaklı eğitim müfredatıdır. Bu depo, birden çok programlama dilinde uygulamalı kod örnekleri ile kapsamlı öğrenme materyalleri sağlar.

### Ana Teknolojiler

- **Programlama Dilleri**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Çerçeveler ve SDK'lar**:  
  - MCP SDK (`@modelcontextprotocol/sdk`)  
  - Spring Boot (Java)  
  - FastMCP (Python)  
  - LangChain4j (Java)
- **Veritabanları**: pgvector uzantılı PostgreSQL
- **Bulut Platformları**: Azure (Container Apps, OpenAI, İçerik Güvenliği, Application Insights)
- **Derleme Araçları**: npm, Maven, pip, Cargo
- **Dokümantasyon**: Otomatik çok dilli çeviri destekli Markdown (48+ dil)

### Mimari

- **11 Temel Modül (00-11)**: Temelden ileri konulara sıralı öğrenme yolu
- **Uygulamalı Laboratuvarlar**: Birden çok dilde tam çözüm kodu ile pratik egzersizler
- **Örnek Projeler**: Çalışan MCP sunucu ve istemci uygulamaları
- **Çeviri Sistemi**: Çok dilli destek için otomatik GitHub Actions iş akışı
- **Görsel Varlıklar**: Çevirilmiş versiyonlarıyla merkezi resimler dizini

## Kurulum Komutları

Bu depo belge odaklıdır. Çoğu kurulum bireysel örnek projeler ve laboratuvarlarda gerçekleşir.

### Depo Kurulumu

```bash
# Depoyu klonla
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Örnek Projeler ile Çalışma

Örnek projeler şu dizinlerde yer alır:  
- `03-GettingStarted/samples/` - Dil bazlı örnekler  
- `03-GettingStarted/01-first-server/solution/` - İlk sunucu uygulamaları  
- `03-GettingStarted/02-client/solution/` - İstemci uygulamaları  
- `11-MCPServerHandsOnLabs/` - Kapsamlı veritabanı entegrasyon laboratuvarları

Her örnek proje kendi kurulum talimatlarını içerir:

#### TypeScript/JavaScript Projeleri  
```bash
cd <project-directory>
npm install
npm start
```
  
#### Python Projeleri  
```bash
cd <project-directory>
pip install -r requirements.txt
# veya
pip install -e .
python main.py
```
  
#### Java Projeleri  
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```
  
## Geliştirme İş Akışı

### Dokümantasyon Yapısı

- **Modüller 00-11**: Sıralı temel müfredat içeriği  
- **translations/**: Dil bazlı versiyonlar (otomatik oluşturulur, doğrudan düzenlemeyin)  
- **translated_images/**: Yerelleştirilmiş görsel versiyonları (otomatik oluşturulur)  
- **images/**: Kaynak resimler ve diyagramlar

### Dokümantasyon Değişiklikleri Yapma

1. Yalnızca kök modül dizinlerindeki (00-11) İngilizce markdown dosyalarını düzenleyin  
2. Gerekirse `images/` dizinindeki resimleri güncelleyin  
3. co-op-translator GitHub Action çevirileri otomatik oluşturacaktır  
4. Çeviriler main dalına push yapıldığında yeniden oluşturulur

### Çevirilerle Çalışma

- **Otomatik Çeviri**: Tüm çeviriler GitHub Actions iş akışı tarafından yönetilir  
- **Manuel olarak `translations/` klasöründeki dosyaları düzenlemeyin**  
- Çeviri meta verisi her çevrilmiş dosyada gömülüdür  
- Desteklenen diller: Arapça, Çince, Fransızca, Almanca, Hintçe, Japonca, Korece, Portekizce, Rusça, İspanyolca ve daha fazla (48+ dil)

## Test Talimatları

### Dokümantasyon Doğrulaması

Bu depo öncelikle belge odaklı olduğundan testler şunlara odaklanır:

1. **Bağlantı Doğrulama**: Tüm dahili bağlantıların çalıştığından emin olun  
```bash
# Kırık markdown bağlantılarını kontrol edin
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```
  
2. **Kod Örneği Doğrulama**: Kod örneklerinin derlenip/çalıştırıldığı test edilir  
```bash
# Belirli bir örneğe git ve testlerini çalıştır
cd 03-GettingStarted/samples/typescript
npm install && npm test
```
  
3. **Markdown Linting**: Formatlama tutarlılığı kontrol edilir  
```bash
# Gerekirse markdownlint kullanın
npx markdownlint-cli2 "**/*.md" "#node_modules"
```
  
### Örnek Proje Testi

Her dil spesifik örnek kendi test yaklaşımına sahiptir:

#### TypeScript/JavaScript  
```bash
npm test
npm run build
```
  
#### Python  
```bash
pytest
python -m pytest tests/
```
  
#### Java  
```bash
mvn test
mvn verify
```
  
## Kod Stili Rehberi

### Dokümantasyon Stili

- Açık, yeni başlayan dostu bir dil kullanın  
- İlgili yerlerde birden çok dilde kod örneklerine yer verin  
- Markdown en iyi uygulamalarını takip edin:  
  - ATX tarzı başlıklar (`#` sözdizimi) kullanın  
  - Dil tanımlı çitli kod blokları kullanın  
  - Görseller için açıklayıcı alt metin ekleyin  
  - Satır uzunluklarını makul tutun (katı sınır yok, ama akıllıca olun)

### Kod Örneği Stili

#### TypeScript/JavaScript  
- ES modülleri (`import`/`export`) kullanın  
- TypeScript katı mod kurallarına uyun  
- Tür açıklamaları ekleyin  
- Hedef: ES2022

#### Python  
- PEP 8 stil kurallarını takip edin  
- Uygun yerlerde tip ipuçları kullanın  
- Fonksiyonlar ve sınıflar için docstring ekleyin  
- Modern Python özelliklerini kullanın (3.8+)

#### Java  
- Spring Boot standartlarına uyun  
- Java 21 özelliklerini kullanın  
- Standart Maven proje yapısını takip edin  
- Javadoc yorumları ekleyin

### Dosya Organizasyonu

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```
  
## Derleme ve Dağıtım

### Dokümantasyon Dağıtımı

Depo, dokümantasyon barındırmak için GitHub Pages veya benzeri servisler kullanır (varsa). Ana dalda yapılan değişiklikler tetikler:

1. Çeviri iş akışı (`.github/workflows/co-op-translator.yml`)  
2. Tüm İngilizce markdown dosyalarının otomatik çevirisi  
3. Gerekirse görsel yerelleştirme

### Derleme İşlemine Gerek Yok

Bu depo öncelikle markdown dokümantasyonu içerir. Temel müfredat içeriği için derleme veya build adımı gerekmez.

### Örnek Proje Dağıtımı

Bireysel örnek projelerin dağıtım talimatları olabilir:  
- MCP sunucu dağıtımı için `03-GettingStarted/09-deployment/` dizinine bakın  
- Azure Container Apps dağıtım örnekleri için `11-MCPServerHandsOnLabs/` dizinine bakın

## Katkıda Bulunma Kuralları

### Pull Request Süreci

1. **Fork ve Kopyala:** Depoyu çatalla ve kopyanı yerelde klonla  
2. **Bir Dal Oluştur:** Açıklayıcı dal isimleri kullan (ör. `fix/typo-module-3`, `add/python-example`)  
3. **Değişiklik Yap:** Yalnızca İngilizce markdown dosyalarını düzenle (çeviriler değil)  
4. **Yerelde Test Et:** Markdown'un doğru render edildiğini doğrula  
5. **PR Gönder:** Açık PR başlıkları ve açıklamalar kullan  
6. **CLA:** İstendiğinde Microsoft Katkı Lisans Sözleşmesi'ni imzala

### PR Başlık Formatı

Açık ve açıklayıcı başlıklar kullan:  
- `[Modül XX] Kısa açıklama` modül spesifik değişiklikler için  
- `[Örnekler] Açıklama` örnek kod değişiklikleri için  
- `[Belgeler] Açıklama` genel dokümantasyon güncellemeleri için

### Ne Katkıda Bulunmalı

- Dokümantasyon veya kod örneklerinde hata düzeltmeleri  
- Yeni programlama dillerinde kod örnekleri  
- Mevcut içeriğe açıklama ve iyileştirmeler  
- Yeni vaka çalışmaları veya pratik örnekler  
- Anlaşılmaz veya hatalı içerik için sorun bildirimleri

### Ne Yapmamalı

- `translations/` klasöründeki dosyaları doğrudan düzenlemeyin  
- `translated_images/` klasörünü düzenlemeyin  
- Tartışmadan büyük ikili dosya eklemeyin  
- Koordinasyon olmadan çeviri iş akışı dosyalarını değiştirmeyin

## Ek Notlar

### Depo Bakımı

- **Değişiklik Günlüğü:** Tüm önemli değişiklikler `changelog.md` içinde dökümante edilir  
- **Çalışma Rehberi:** Müfredat navigasyonu için `study_guide.md` kullanın  
- **Sorun Şablonları:** GitHub sorun şablonları hata bildirimi ve özellik talepleri için  
- **Davranış Kuralları:** Tüm katkıda bulunanlar Microsoft Açık Kaynak Davranış Kuralları’na uymalıdır

### Öğrenme Yolu

En iyi öğrenme için modülleri sıralı takip edin (00-11):  
1. **00-02**: Temeller (Giriş, Temel Kavramlar, Güvenlik)  
2. **03**: Uygulamalı başlangıç  
3. **04-05**: Pratik uygulamalar ve ileri konular  
4. **06-10**: Topluluk, en iyi uygulamalar ve gerçek dünya uygulamaları  
5. **11**: Kapsamlı veritabanı entegrasyon laboratuvarları (13 sıralı laboratuvar)

### Destek Kaynakları

- **Dokümantasyon**: https://modelcontextprotocol.io/  
- **Spesifikasyon**: https://spec.modelcontextprotocol.io/  
- **Topluluk**: https://github.com/orgs/modelcontextprotocol/discussions  
- **Discord**: Microsoft Foundry Discord sunucusu  
- **İlgili Kurslar**: Diğer Microsoft öğrenme yolları için README.md’ye bakınız

### Yaygın Sorun Giderme

**S: PR’im çeviri kontrolünü geçemiyor**  
C: Yalnızca kök modül dizinlerindeki İngilizce markdown dosyalarını düzenlediğinizden emin olun, çeviri dosyalarını değil.

**S: Yeni bir dil nasıl eklerim?**  
C: Dil desteği co-op-translator iş akışı ile yönetilir. Yeni diller için tartışma başlatmak üzere bir sorun açın.

**S: Kod örnekleri çalışmıyor**  
C: Özel örneğin README'sindeki kurulum talimatlarını uyguladığınızdan emin olun. Gerekli bağımlılıkların doğru sürümlerini kontrol edin.

**S: Görseller görüntülenmiyor**  
C: Görsel yollarının görece ve ileri eğik çizgi ile yazıldığını doğrulayın. Görseller `images/` veya yerelleştirilmiş için `translated_images/` dizininde olmalıdır.

### Performans Hususları

- Çeviri iş akışı tamamlanması birkaç dakika sürebilir  
- Büyük görselleri commitlemeden önce optimize edin  
- Bireysel markdown dosyalarını odaklı ve makul boyutta tutun  
- Daha iyi taşınabilirlik için görece bağlantılar kullanın

### Proje Yönetimi

Bu proje Microsoft açık kaynak uygulamalarını uygular:  
- Kod ve dokümantasyon için MIT Lisansı  
- Microsoft Açık Kaynak Davranış Kuralları  
- Katkılar için CLA gereklidir  
- Güvenlik sorunları için SECURITY.md yönergelerini takip edin  
- Destek için SUPPORT.md dosyasına bakın

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->