# Değişiklik Günlüğü: Yeni Başlayanlar için MCP Müfredatı

Bu belge, Model Context Protocol (MCP) için Yeni Başlayanlar müfredatında yapılan tüm önemli değişikliklerin kaydıdır. Değişiklikler ters kronolojik sırayla (en yeni değişiklikler önce) belgelenmiştir.

## 2 Temmuz 2026

### Yeni Ders: 2026-07-28 MCP Spesifikasyon Sürüm Adayı

Gelecek olan `2026-07-28` MCP spesifikasyon sürüm adayının (21 Mayıs 2026'da duyuruldu; nihai sürüm 28 Temmuz 2026'da planlandı) kapsaması eklendi, [resmi duyuru blog yazısından](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) özetlenmiştir. Müfredatın temel versiyonu yeni sürüm çıkana kadar **MCP Spesifikasyon 2025-11-25** olarak kalacaktır, bu nedenle mevcut derslerin yeniden yazımı yerine ileriye dönük rehberlik olarak sunulmaktadır.

- **Yeni**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — durumsuz protokol çekirdeği ( `initialize` el sıkışması ve `Mcp-Session-Id` kaldırılması), yeni `Mcp-Method`/`Mcp-Name` yönlendirme başlıkları, `ttlMs`/`cacheScope` önbellekleme meta verisi, `_meta` içindeki W3C Trace Context, resmi Extensions çerçevesi (MCP Uygulamaları ve yeni Görevler uzantısı), altı yetkilendirme sertleştirme SEP'si, Roots/Sampling/Logging'in kullanımdan kaldırılması ve araç şemaları için tam JSON Şeması 2020-12'ye geçiş konularını kapsayan tam bir ders.
- **Güncellendi** ileriye dönük çağrılarla yeni derse bağlantılar:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): protokol sürümü notu, Sampling/Roots/Logging/Tasks bölümleri ve "Sonraki Adımlar"
  - [02-Security/README.md](./02-Security/README.md): yetkilendirme sertleştirme çağrısı
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): durumsuz taşıma çağrısı
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Sampling kullanımdan kaldırma çağrısı
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Logging kullanımdan kaldırma ve Görevler uzantısı çağrısı
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): durumsuz/oturum yönlendirme çağrısı
  - [README.md](./README.md): özellik bölümünde "İleriye Bakış" notu ve müfredat modül tablosunda yeni `1.1` girişi
  - [study_guide.md](./study_guide.md): Core Concepts genel bakışı altında ileriye dönük madde ve tarihli ek not
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): durumsuz istek modeli öncesi `mcp-session-id` taşıma haritası çağrısı
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): Modül genel görünümünde Root Contexts/Sampling kullanımdan kaldırmaları ve Görevler uzantısı çağrısı
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): yetkilendirme sertleştirme çağrısı

## 24 Haziran 2026

### Yeni Ders: MCP Kullanarak Copilot uygulaması

- [Araç bölümü](./12-tooling/README.md) Araç bölümü eklendi.
- [Copilot uygulamasında MCP](./12-tooling/01-copilot-app/README.md)

## 16 Haziran 2026

### MCP Spesifikasyon Uyumu ve Örnek Doğrulaması

Müfredat, mevcut **MCP Spesifikasyon 2025-11-25** ve en güncel resmi SDK'lar ile doğrulandı, ardından kalan eski spesifikasyon referansları düzeltildi ve temel örneklerin hala derlenip çalıştığı onaylandı.

#### Spesifikasyon Versiyonu Düzeltmeleri (2025-06-18 / 2025-03-26 → 2025-11-25)

İngilizce içerikte hala eski bir spesifikasyon revizyonunun *mevcut/en yeni* standart olarak iddia edildiği yerler güncellendi, bağlantılar resmi `modelcontextprotocol.io` spesifikasyon yollarına yönlendirildi:
- **05-AdvancedTopics/mcp-security/README.md**: "Mevcut Standart" başlığı, giriş, temel güvenlik ilkeleri başlığı, zorunlu gereksinimler başlığı, Microsoft Entra ID bölümü, Referanslar & Kaynaklar bağlantıları ve kapanış güvenlik bildirimi (8 referans) 2025-11-25 olarak güncellendi
- **05-AdvancedTopics/mcp-transport/README.md**: Ek Kaynaklar spesifikasyon bağlantısı ve "Mevcut Standart" başlığı 2025-11-25 olarak güncellendi
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Güncel olmayan `2025-03-26` güvenlik-ve-güven linki, mevcut 2025-11-25 güvenlik en iyi uygulamalar sayfası ile değiştirildi
- **03-GettingStarted/14-sampling/README.md**: Resmi sampling doküman bağlantısı 2025-11-25 olarak güncellendi
- **03-GettingStarted/05-stdio-server/README.md**: Şimdiki zaman kipinde "mevcut MCP spesifikasyonu" referansı ve Ek Kaynaklar spesifikasyon bağlantısı 2025-11-25 olarak güncellendi (tarihsel SSE kullanım dışı bırakma notları doğruluk için korundu)

#### Mevcut SDK'lara Göre Örnek Doğrulaması

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install`, `@modelcontextprotocol/sdk@1.29.0` çözümlendi; `tsc --noEmit` tür hatası olmadan geçti — mevcut `McpServer`/`StdioServerTransport` API'leri geçerli
- **Python (03-GettingStarted/01-first-server/solution/python)**: İzole bir `.venv` içinde `mcp[cli]` (1.27.2) ile doğrulandı; `py_compile` geçti ve `FastMCP.list_tools()` doğru şekilde `add` ve `subtract` araçlarını döndürdü
- Tüm örneklerdeki `@modelcontextprotocol/sdk` sürüm aralıkları (`>=1.26.0` / `^1.26.0` / `^1.27.0`), mevcut `1.29.0`'a sorunsuz çözümlendi, kırıcı API değişikliği yok

#### Bağımlılık Sürüm Uyumu (versiyon boşlukları kapatıldı)

Tüm eski SDK pinleri, her örneğin mevcut MCP sürümünü izlemesi için repo genelinde kullanılan konvansiyona uygun olarak güncellendi:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` `^1.8.0` → `>=1.26.0` olarak güncellendi ve eski `"MCP 2025-06-18 için güncellendi"` paket açıklaması `"MCP Spesifikasyon 2025-11-25 ile uyumlu"` olarak değiştirildi
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ve **lab4/code/github_mcp_server/pyproject.toml**: `mcp==1.23.0` tam pin `mcp>=1.26.0` olarak güncellendi; her iki `uv.lock` dosyası (`uv lock`) yeniden oluşturuldu, kilit dosyaları mevcut `mcp 1.27.2` sürümüne çözümlendi ve manifestlerle senkron kaldı

#### Müfredat Boşluk Analizi — En Son Spec Özellik Kapsamı

Müfredatın MCP 2025-11-25'te tanıtılan/genişletilen tüm ilkel işlemleri zaten kapsadığı doğrulandı; içerik boşluğu yok:
- **Sampling**: 03-GettingStarted/14-sampling dersi ve 05-AdvancedTopics/mcp-sampling
- **Elicitation (URL modu dahil)**: 01-CoreConcepts ve 05-AdvancedTopics/mcp-protocol-features içinde belgelenmiş
- **Roots**: 00-Introduction, 01-CoreConcepts ve 05-AdvancedTopics/mcp-root-contexts içinde belgelenmiş
- **Tasks (deneysel, uzun süren işlemler)**: 01-CoreConcepts ve 05-AdvancedTopics/mcp-protocol-features içinde belgelenmiş
- **Araç Açıklamaları** (`readOnlyHint` / `destructiveHint`): 01-CoreConcepts ve 05-AdvancedTopics/mcp-protocol-features içinde belgelenmiş

### Güvenlik Sertleştirmesi & Bağımlılık Açığı Giderimi

Tüm bağımlılık manifestleri ve örnek kaynak kod üzerinde tam bir güvenlik taraması yapıldı, bildirilen tüm npm uyarıları ve bir kod düzeyi bulgusu giderildi. Düzenlemeler sonrası, `npm audit` her denetlenen dizinde **0 açık** raporladı.

#### npm Bağımlılık Açıkları (geçişli) — Düzeltildi

15 gönderilen `package-lock.json` dosyasının tümü denetlendi. Açıklar, MCP Inspector geliştirici aracı, OpenAI istemcisi ve MCP SDK tarafından çekilen geçişli bağımlılıklarda sınırlıydı; tümü örnekleri bozmadan çözüldü:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ve **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`) yükseltildi, bu paket içi `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ve `ws` uyarılarını çözdü. `concurrently` tarafından taşınan kritik uyarıyı silmek için yamalı `shell-quote@1.8.4` zorlanan bir npm `overrides` girdisi eklendi; her iki kilit dosyası yeniden oluşturuldu (artık 0 açık)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ile geçişli `qs` (orta) yamalı sürüme güncellendi
- **03-GettingStarted/samples/javascript**: `npm audit fix` ile geçişli `hono` (orta) yamalı sürüme güncellendi
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ile geçişli `form-data` (yüksek) yamalı sürüme güncellendi
- **03-GettingStarted/11-simple-auth/solution/typescript**: Eksik `package-lock.json` dosyası üretildi, proje çoğaltılabilir ve denetlenebilir hale getirildi (0 açık)

#### Kod Düzeyi Güvenlik Düzeltmesi (OWASP A03: Enjeksiyon)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `open_in_vscode` aracından `shell=True` kaldırıldı. Önceki `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` komutu, bir klasör yolundaki kabuk metakarakterlerinin `cmd.exe` tarafından yorumlanmasına izin veriyordu (komut enjeksiyonu vektörü). Artık çözülmüş `Code.exe` doğrudan klasör argümanı ile başlatılıyor — kabuk yok — işlevsel olarak eşdeğer ve güvenli

#### Python Bağımlılık Denetimi

- Her Python gereksinim seti `pip-audit` ile denetlendi. `05-AdvancedTopics` ve `03-GettingStarted/samples/python` **bilinen açık bildirmedi** (onların `mcp` / `httpx` / `pydantic` / `python-dotenv` aralıkları mevcut yamalı sürümlere çözülüyor)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit`, geçişli bağımlılık **`werkzeug` 3.1.1** için üç `safe_join` Windows cihaz-adı DoS uyarısı bildirdi — `CVE-2025-66221`, `CVE-2026-21860`, ve `CVE-2026-27199` (hepsi 3.1.6'da düzeltildi). Yamalı sürümün çözülmesi için açıkça `werkzeug>=3.1.6` güvenlik pimi eklendi; kısıtlamanın `chainlit` / `mcp` / `semantic-kernel` yığınıyla sorunsuz çözüldüğü doğrulandı

### Ürün Adı Yeniden Markalaşması

Microsoft'un ürün yeniden markalaşmasına uyum sağlamak için tüm müfredat içeriği güncellendi:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord topluluğu bağlantısı güncellendi
- **AGENTS.md**: Discord sunucu referansı güncellendi
- **README.md**: teknoloji ekosistemi referansları güncellendi
- **study_guide.md**: vaka çalışması referansları güncellendi
- **05-AdvancedTopics/README.md**: Modül 5.13 başlığı ve açıklaması güncellendi
- **05-AdvancedTopics/mcp-integration/README.md**: bölüm başlığı ve açıklaması güncellendi
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: tam modül başlığı ve içerik güncellendi
- **05-AdvancedTopics/mcp-security-entra/README.md**: çapraz referans bağlantısı güncellendi
- **07-LessonsfromEarlyAdoption/README.md**: vaka çalışması referansları güncellendi
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Bölüm 9 başlığı, rozetler ve yetenekler güncellendi
- **08-BestPractices/README.md**: Discord topluluğu bağlantısı güncellendi
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord kanal referansı güncellendi
- **09-CaseStudy/docs-mcp/solution/python/README.md**: model dağıtım referansı güncellendi
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI Hizmetleri tablosu güncellendi
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: kaynak referansları güncellendi

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Ana müfredat referansları güncellendi  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Modül başlığı, genel bakış ve tüm modül başlıkları güncellendi  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Başlık, öğrenme hedefleri, kurulum talimatları ve kaynaklar güncellendi  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Başlık, öğrenme hedefleri, MCP host tablosu ve çapraz referanslar güncellendi  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Başlık, rozetler, ön koşullar ve kaynaklar güncellendi  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Agent Builder referansları ve geri bildirim linki güncellendi  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Ön koşullar ve eklenti referansları güncellendi  

---

## 11 Nisan 2026

### Yeni Ders, Dokümantasyon Düzeltmeleri ve Bağımlılık Güncellemeleri

#### Yeni Müfredat İçeriği Eklendi

**Modül 05 - İleri Konular**  
- **Ders 5.17: MCP ile Çekişmeli Çoklu Ajan Muhakemesi** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Çoklu ajan sistemleri için çekişmeli tartışma modelini kapsayan yeni kapsamlı rehber  
  - Mermaid mimari diyagramı: iki ajan → paylaşılan MCP sunucusu → tartışma transkripti → hakem → karar  
  - Python ve TypeScript ile uygulanmış paylaşılan MCP araç sunucusu (`web_search` + `run_python`)  
  - Açık araç kullanımı gereksinimli karşıt sistem istemleri (FOR / AGAINST / Hakem)  
  - Turları yöneten ve argümanları yönlendiren Python, TypeScript ve C# tartışma düzenleyicisi  
  - Gerçek araç çağrılarına yönlendirmek için MCP `ClientSession` bağlantısı  
  - Kullanım tablosu (halüsinasyon tespiti, tehdit modelleme, API tasarım incelemesi, gerçek doğrulama, teknoloji seçimi)  
  - Güvenlik önlemleri: izole yürütme, araç çağrısı doğrulaması, hız sınırlandırma, denetlme günlüğü  
  - Kod incelemesi, mimari karar ve içerik moderasyonu içeren üç pratik senaryolu yapılandırılmış egzersiz  

#### Dokümantasyon Düzeltmeleri  

**Modül 03 - Başlarken**  
- **05-stdio-server/README.md**: Eksik TypeScript stdio sunucu örneği düzeltildi — Python ve .NET örneklerine paralel olarak eksik olan taşıma örneklemesi (`new StdioServerTransport()`) ve `server.connect(transport)` çağrısı eklendi  
- **14-sampling/README.md**: Yazım hatası düzeltildi — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`  

#### Müfredat Güncellemeleri  

**Ana README.md**  
- Yeni derse doğrudan bağlantı içeren 5.17 (MCP ile Çekişmeli Çoklu Ajan Muhakemesi) girdisi eklendi  

**05-AdvancedTopics/README.md**  
- Ders tablosuna Ders 5.17 satırı eklendi  

**study_guide.md**  
- İleri Konular mind-map ve açıklamasına Çekişmeli Çoklu Ajan Muhakemesi eklenmiştir  

#### Kod ve Güvenlik Düzeltmeleri  

**Modül 05 - Çekişmeli Ajanlar (`mcp-adversarial-agents`)**  
- **Güvenlik Düzeltmesi — komut enjeksiyonu**: TypeScript `run_python` aracındaki `execSync` kabuk içi interpolasyon yerine `execFile` + `promisify` kullanıldı, komut enjeksiyonu yüzeyi kaldırıldı (LLM tarafından kontrol edilen kod, shell olmadan literal argv öğesi olarak iletiliyor)  
- **MCP araç döngüsü bağlantısı**: Python tartışma düzenleyicisi `AsyncAnthropic` istemcisi ile güncellendi (engelleyen senkron `Anthropic` yerine), her ajan turuna canlı `ClientSession` doğrudan iletildi, her turda `session.list_tools()` ile araç tanımları çekildi ve modeli son metin yanıtı verene kadar `session.call_tool()` döngüye eklendi  

#### Bağımlılık Güncellemeleri  

- `hono` 4.12.12 sürümü çoklu paketlerde güncellendi (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)  
- `@hono/node-server` TypeScript paketlerinde 1.19.11’den 1.19.13’e yükseltildi  
- `cryptography` Python paketlerinde 46.0.5’ten 46.0.7’ye güncellendi (10-StreamliningAIWorkflows laboratuvarlar 3 ve 4)  
- `lodash` 10-StreamliningAIWorkflows denetleyicide 4.17.23’ten 4.18.1’e yükseltildi  

#### Çeviriler  

- 48+ dil için en güncel kaynak değişiklikleri ile çeviri senkronizasyonu sağlandı (i18n güncellemesi)  

---

## 5 Şubat 2026

### Depo Genelinde Doğrulama ve Navigasyon İyileştirmeleri

#### Yeni Müfredat İçeriği Eklendi

**Modül 03 - Başlarken**  
- **12-mcp-hosts/README.md**: MCP host kurulumu için kapsamlı yeni rehber  
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigürasyon örnekleri  
  - Tüm önemli hostlar için JSON yapılandırma şablonları  
  - Taşıma türleri karşılaştırma tablosu (stdio, SSE/HTTP, WebSocket)  
  - Yaygın bağlantı sorunlarının giderilmesi  
  - Host konfigürasyonunda güvenlik en iyi uygulamaları  

- **13-mcp-inspector/README.md**: MCP Inspector için yeni hata ayıklama rehberi  
  - Kurulum yöntemleri (npx, npm global, kaynak)  
  - Stdio ve HTTP/SSE ile sunuculara bağlantı  
  - Test araçları, kaynaklar ve istem iş akışları  
  - VS Code entegrasyonu ile MCP Inspector  
  - Yaygın hata ayıklama senaryoları ve çözümleri  

**Modül 04 - Pratik Uygulama**  
- **pagination/README.md**: Yeni sayfalama uygulama rehberi  
  - Python, TypeScript, Java’da imleç-temelli sayfalama desenleri  
  - İstemci tarafı sayfalama işlemleri  
  - Opak ve yapılandırılmış imleç tasarım stratejileri  
  - Performans optimizasyonu önerileri  

**Modül 05 - İleri Konular**  
- **mcp-protocol-features/README.md**: Yeni protokol özellikleri derinlemesine inceleme  
  - İlerleme bildirimleri uygulaması  
  - İstek iptal desenleri  
  - Kaynak şablonları ve URI desenleri  
  - Sunucu yaşam döngüsü yönetimi  
  - Günlük seviyesi kontrolü  
  - JSON-RPC kodlarıyla hata işleme desenleri  

#### Navigasyon Düzeltmeleri (24+ dosya güncellendi)

**Ana Modül README’leri**  
 İlk derse ve sonraki modüle bağlantılar eklendi  

**02-Güvenlik Alt-dosyaları**  
 Beş ek güvenlik dokümanı için "Sonraki Neler" navigasyonu eklendi  

**09-VakaÇalışması Dosyaları**  
 Tüm vaka çalışması dosyalarına ardışık gezinti eklendi  

**10-StreamliningAI Laboratuvarları**  
 Modül 10 genel bakış ve Modül 11’e "Sonraki Neler" bölümü eklendi  

#### Kod ve İçerik Düzeltmeleri

**SDK ve Bağımlılık Güncellemeleri**  
 Boş openai sürümü `^4.95.0` olarak düzeltildi  
 SDK `^1.8.0`’den `>=1.26.0`’a güncellendi  
 mcp sürüm pinleri `>=1.26.0` olarak güncellendi  

**Kod Düzeltmeleri**  
 Geçersiz model `gpt-4o-mini` `gpt-4.1-mini` olarak düzeltildi  

**İçerik Düzeltmeleri**  
 Bozuk link `READMEmd` → `README.md`, müfredat başlığı `Module 1-3` → `Module 0-3` olarak düzeltildi, büyük/küçük harf duyarlı dosya yolu düzeltildi  
 Bozuk çiftlenmiş Vaka Çalışması 5 içeriği kaldırıldı  

**Başlangıç Rehberi İyileştirmeleri**  
 Yeni başlayanlar için uygun giriş, öğrenme hedefleri ve ön koşullar eklendi  

#### Müfredat Güncellemeleri

**Ana README.md**  
 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Sayfalama), 5.16 (Protokol Özellikleri) girdileri müfredat tablosuna eklendi  

**Modül README’leri**  
 Ders listesine 12 ve 13 numaralı dersler eklendi  
 Pratik Kılavuzlar bölümüne sayfalama bağlantısı eklendi  
 5.15 (Özel Taşıma) ve 5.16 (Protokol Özellikleri) dersleri eklendi  

**study_guide.md**  
 MCP Hosts Kurulumu, MCP Inspector, Sayfalama Stratejileri, Protokol Özellikleri Derinlemesine dahil tüm yeni konularla mindmap güncellendi  

## 28 Ocak 2026

### MCP Spesifikasyonu 2025-11-25 Uyum İncelemesi

#### Temel Kavramlar Genişletmesi (01-CoreConcepts/)  
- **Yeni İstemci Primitive – Roots**: Sunucuların dosya sistemi sınırlarını ve erişim izinlerini anlamasını sağlayan kapsamlı belge eklendi  
- **Araç Açıklamaları**: Araç yürütme kararları için davranış açıklaması (`readOnlyHint`, `destructiveHint`) dökümantasyonu eklendi  
- **Sampling’de Araç Çağrısı**: Model tabanlı araç çağrısını desteklemek için Sampling dokümantasyonu `tools` ve `toolChoice` parametreleri ile güncellendi  
- **URL Modu Uyarısı**: Sunucu kaynaklı dış web etkileşimleri için URL tabanlı uyarı metodu belgelendi  
- **Görevler (Deneysel)**: Kalıcı yürütme sarmalayıcıları ve ertelenmiş sonuç alma için deneysel Tasks özelliği belgeye eklendi  
- **Simge Desteği**: Artık araçlar, kaynaklar, kaynak şablonları ve istemlerde simgeler metadata olarak desteklenmekte  

#### Dokümantasyon Güncellemeleri  
- **README.md**: MCP Spesifikasyon 2025-11-25 sürüm referansı ve tarih bazlı sürüm açıklaması eklendi  
- **study_guide.md**: Müfredat haritası Core Concepts bölümüne Görevler ve Araç Açıklamaları dahil edildi; belge zaman damgası güncellendi  

#### Spesifikasyon Uygunluk Doğrulaması  
- **Protokol Versiyonu**: Tüm dokümantasyonların güncel MCP Spesifikasyon 2025-11-25 referansı doğrulandı  
- **Mimari Uyumu**: İki katmanlı mimari (Veri Katmanı + Taşıma Katmanı) dokümantasyonu onaylandı  
- **Primitive Belgeleri**: Sunucu peşinde (Kaynaklar, İstemler, Araçlar) ve istemci peşinde (Sampling, Uyarı, Günlükleme, Roots) belgeler doğrulandı  
- **Taşıma Mekanizmaları**: STDIO ve Streamable HTTP taşıma açıklamalarının doğruluğu teyit edildi  
- **Güvenlik Rehberi**: Mevcut MCP Güvenlik En İyi Uygulamaları dokümantasyonuyla uyum doğrulandı  

#### Ana MCP 2025-11-25 Özellikleri Belgelendi  
- **OpenID Connect Keşfi**: OIDC üzerinden kimlik doğrulama sunucu keşfi  
- **OAuth İstemci ID Meta Belgeleri**: Önerilen istemci kayıt mekanizması  
- **JSON Şema 2020-12**: MCP şema tanımları için varsayılan lehçe  
- **SDK Katman Sistemi**: SDK özellik desteği ve bakım için resmi gereksinimler  
- **Yönetişim Yapısı**: MCP yönetişiminde Çalışma ve İlgi Grupları resmileştirildi  

### Güvenlik Dokümantasyonu Büyük Güncellemesi (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Entegrasyonu  
- **Yeni Uygulamalı Eğitim Kaynağı**: [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ile tüm güvenlik dokümantasyonunda kapsamlı entegrasyon eklendi  
- **Sefer Rotası Kapsamı**: Base Camp’den Summit’e kamp-kamp ilerleme adımları belgelendi  
- **OWASP Uyumu**: Tüm güvenlik rehberliği OWASP MCP Azure Security Guide riskleri ile eşlendi  

#### OWASP MCP Top 10 Entegrasyonu  
- **Yeni Bölüm**: Ana Güvenlik README’sine OWASP MCP Top 10 Güvenlik Riskleri tablosu ve Azure hafifletmeleri eklendi  
- **Risk Bazlı Dokümantasyon**: mcp-security-controls-2025.md dosyası OWASP MCP risk referansları (MCP01-MCP08) ile güncellendi  
- **Referans Mimari**: OWASP MCP Azure Security Guide referans mimarisi ve uygulama desenlerine bağlantılar eklendi  

#### Güncellenen Güvenlik Dosyaları  
- **README.md**: Sherpa Workshop genel bakışı, sefer rotası tablosu, OWASP MCP Top 10 risk özeti ve uygulamalı eğitim bölümü eklendi  
- **mcp-security-controls-2025.md**: Şubat 2026 tarihli başlık; OWASP risk referansları (MCP01-MCP08) eklendi, sürüm tutarsızlığı düzeltildi  
- **mcp-security-best-practices-2025.md**: Sherpa ve OWASP kaynakları bölümü eklendi, zaman damgası güncellendi  
- **mcp-best-practices.md**: Sherpa ve OWASP bağlantıları içeren uygulamalı eğitim bölümü eklendi  
- **azure-content-safety-implementation.md**: OWASP MCP06 referansı, Sherpa Kamp 3 uyumu ve ek kaynaklar bölümü eklendi  

#### Yeni Kaynak Linkleri Eklendi  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Bireysel OWASP MCP risk sayfaları (MCP01-MCP10)  

### Müfredat Genelinde MCP Spesifikasyon 2025-11-25 Uyum

#### Modül 03 - Başlarken  
- **SDK Dokümantasyonu**: Resmi SDK listesine Go SDK eklendi; tüm SDK referansları MCP Spesifikasyon 2025-11-25 ile uyumlu hale getirildi  
- **Taşıma Açıklaması**: STDIO ve HTTP Streaming taşıma açıklamaları açık spesifikasyon referansları ile güncellendi  

#### Modül 04 - Pratik Uygulama  
- **SDK Güncellemeleri**: Go SDK eklendi; SDK listesi spesifikasyon versiyon referansı ile güncellendi  
- **Yetkilendirme Şeması**: MCP Yetkilendirme spesifikasyon bağlantısı güncel 2025-11-25 sürümüne çekildi  

#### Modül 05 - İleri Konular  
- **Yeni Özellikler**: MCP Spesifikasyon 2025-11-25’deki yeni özellikler (Görevler, Araç Açıklamaları, URL Modu Uyarısı, Roots) not olarak eklendi  
- **Güvenlik Kaynakları**: OWASP MCP Top 10 ve Sherpa atölyesi bağlantıları ek kaynaklar arasına eklendi  

#### Modül 06 - Topluluk Katkıları  
- **SDK Listesi**: Swift ve Rust SDK’lar eklendi; spesifikasyon bağlantısı 2025-11-25 versiyonuna güncellendi  
- **Spesifikasyon Referansı**: MCP Spesifikasyon bağlantısı doğrudan resmi URL’ye güncellendi  

#### Modül 07 - Erken Benimsemeden Dersler
- **Kaynak Güncellemeleri**: MCP Spesifikasyonu 2025-11-25 bağlantısı ve OWASP MCP Top 10 ek kaynaklara eklendi

#### Modül 08 - En İyi Uygulamalar
- **Spesifikasyon Sürümü**: MCP Spesifikasyonu referansı 2025-11-25 olarak güncellendi
- **Güvenlik Kaynakları**: OWASP MCP Top 10 ve Sherpa atölyesi ek referanslara eklendi

#### Modül 10 - Yapay Zeka İş Akışlarının Basitleştirilmesi
- **Rozet Güncellemesi**: MCP versiyon rozeti SDK versiyonundan (1.9.3) spesifikasyon versiyonuna (2025-11-25) değiştirildi
- **Kaynak Bağlantıları**: MCP Spesifikasyonu bağlantısı güncellendi; OWASP MCP Top 10 eklendi

#### Modül 11 - MCP Sunucu Uygulamalı Laboratuvarlar
- **Spesifikasyon Referansı**: MCP Spesifikasyonu bağlantısı 2025-11-25 sürümüne güncellendi
- **Güvenlik Kaynakları**: Resmi kaynaklara OWASP MCP Top 10 eklendi

## 18 Aralık 2025

### Güvenlik Dokümantasyonu Güncellemesi - MCP Spesifikasyonu 2025-11-25

#### MCP Güvenlik En İyi Uygulamaları (02-Security/mcp-best-practices.md) - Spesifikasyon Versiyon Güncellemesi
- **Protokol Versiyon Güncellemesi**: En son MCP Spesifikasyonu 2025-11-25 (25 Kasım 2025 yayınlandı) referansı güncellendi
  - Tüm spesifikasyon sürüm referansları 2025-06-18’den 2025-11-25’e güncellendi
  - Belge tarih referansları 18 Ağustos 2025’ten 18 Aralık 2025’e değiştirildi
  - Tüm spesifikasyon URL’lerinin güncel dokümantasyona işaret ettiği doğrulandı
- **İçerik Doğrulama**: Güvenlik en iyi uygulamalarının güncel standartlara kapsamlı uygunluğu kontrol edildi
  - **Microsoft Güvenlik Çözümleri**: Prompt Shields (eski adıyla "Jailbreak risk tespiti"), Azure Content Safety, Microsoft Entra ID ve Azure Key Vault için mevcut terimler ve bağlantılar doğrulandı
  - **OAuth 2.1 Güvenliği**: En son OAuth güvenlik en iyi uygulamaları ile uyum kontrolü yapıldı
  - **OWASP Standartları**: LLM’ler için OWASP Top 10 referanslarının güncel olduğu doğrulandı
  - **Azure Servisleri**: Tüm Microsoft Azure dokümantasyon bağlantıları ve en iyi uygulamalar doğrulandı
- **Standartlarla Uyumluluk**: Tüm referans verilen güvenlik standartları güncel olarak onaylandı
  - NIST AI Risk Yönetimi Çerçevesi
  - ISO 27001:2022
  - OAuth 2.1 Güvenlik En İyi Uygulamaları
  - Azure güvenlik ve uyumluluk çerçeveleri
- **Uygulama Kaynakları**: Tüm uygulama rehberi bağlantıları ve kaynakları doğrulandı
  - Azure API Yönetimi kimlik doğrulama kalıpları
  - Microsoft Entra ID entegrasyon kılavuzları
  - Azure Key Vault gizli yönetimi
  - DevSecOps boru hatları ve izleme çözümleri

### Dokümantasyon Kalite Güvencesi
- **Spesifikasyon Uyumu**: Tüm zorunlu MCP güvenlik gereksinimlerinin (MUST/MUST NOT) en son spesifikasyona uygunluğu sağlandı
- **Kaynak Güncelliği**: Microsoft dokümantasyonu, güvenlik standartları ve uygulama kılavuzlarına dış bağlantıların doğruluğu kontrol edildi
- **En İyi Uygulamalar Kapsamı**: Kimlik doğrulama, yetkilendirme, yapay zekaya özgü tehditler, tedarik zinciri güvenliği ve kurumsal kalıpların kapsamlı şekilde ele alındığı doğrulandı

## 6 Ekim 2025

### Başlangıç Bölümü Genişletmesi – Gelişmiş Sunucu Kullanımı & Basit Kimlik Doğrulama

#### Gelişmiş Sunucu Kullanımı (03-GettingStarted/10-advanced)
- **Yeni Bölüm Eklendi**: Hem normal hem düşük seviye sunucu mimarilerini kapsayan kapsamlı gelişmiş MCP sunucu kullanımı rehberi sunuldu.
  - **Normal ve Düşük Seviyeli Sunucu**: Her iki yaklaşım için Python ve TypeScript kod örnekleriyle ayrıntılı karşılaştırma.
  - **Handler Tabanlı Tasarım**: Ölçeklenebilir, esnek sunucu uygulamaları için araç/kaynak/prompt yönetimi açıklaması.
  - **Pratik Kalıplar**: Gelişmiş özellikler ve mimari için düşük seviye sunucu kalıplarının yararlı olduğu gerçek dünya senaryoları.

#### Basit Kimlik Doğrulama (03-GettingStarted/11-simple-auth)
- **Yeni Bölüm Eklendi**: MCP sunucularında basit kimlik doğrulama uygulaması için adım adım rehber.
  - **Kimlik Doğrulama Kavramları**: Kimlik doğrulama ve yetkilendirme farkı ile kimlik bilgisi yönetimi açıklaması.
  - **Temel Kimlik Doğrulama Uygulaması**: Python (Starlette) ve TypeScript (Express) için aracı tabanlı kimlik doğrulama kalıpları ve kod örnekleri.
  - **Gelişmiş Güvenliğe Geçiş**: Basit kimlik doğrulamadan başlayıp OAuth 2.1 ve RBAC’e ilerleme rehberi; gelişmiş güvenlik modüllerine referanslar.

Bu eklemeler, temel kavramlar ile gelişmiş üretim kalıplarını birleştirerek, daha sağlam, güvenli ve esnek MCP sunucu uygulamaları geliştirmek için pratik, uygulamalı rehberlik sağlamaktadır.

## 29 Eylül 2025

### MCP Sunucu Veritabanı Entegrasyon Laboratuvarları - Kapsamlı Uygulamalı Öğrenme Yolu

#### 11-MCPServerHandsOnLabs - Yeni Tam Veritabanı Entegrasyon Müfredatı
- **Tam 13 Laboratuvarlık Öğrenme Yolu**: PostgreSQL veritabanı entegrasyonu ile üretim hazır MCP sunucuları oluşturmak için kapsamlı uygulamalı müfredat eklendi
  - **Gerçek Dünya Uygulaması**: Kurumsal düzeyde kalıplar içeren Zava Retail analiz vaka çalışması
  - **Yapılandırılmış Öğrenme İlerleyişi**:
    - **Lab 00-03: Temeller** - Giriş, Temel Mimari, Güvenlik & Çoklu Kiracı, Ortam Kurulumu
    - **Lab 04-06: MCP Sunucu İnşası** - Veritabanı Tasarımı & Şema, MCP Sunucu Uygulaması, Araç Geliştirme  
    - **Lab 07-09: Gelişmiş Özellikler** - Anlamsal Arama Entegrasyonu, Test & Hata Ayıklama, VS Code Entegrasyonu
    - **Lab 10-12: Üretim & En İyi Uygulamalar** - Dağıtım Stratejileri, İzleme & Gözlemlenebilirlik, En İyi Uygulamalar & Optimizasyon
  - **Kurumsal Teknolojiler**: FastMCP çerçevesi, pgvector ile PostgreSQL, Azure OpenAI gömülüleri, Azure Container Apps, Application Insights
  - **Gelişmiş Özellikler**: Satır Seviyesi Güvenlik (RLS), anlamsal arama, çok kiracılı veri erişimi, vektör gömülüleri, gerçek zamanlı izleme

#### Terminoloji Standardizasyonu - Modül’den Laboratuvara Dönüşüm
- **Kapsamlı Dokümantasyon Güncellemesi**: 11-MCPServerHandsOnLabs’deki tüm README dosyaları sistematik olarak "Modül" yerine "Laboratuvar" terimini kullanacak şekilde güncellendi
  - **Bölüm Başlıkları**: Tüm 13 laboratuvarda "Bu Modül Neleri Kapsar" ifadesi "Bu Laboratuvar Neleri Kapsar" olarak değiştirildi
  - **İçerik Açıklaması**: Dokümantasyonda "Bu modül sağlar..." ifadesi "Bu laboratuvar sağlar..." olarak değiştirildi
  - **Öğrenme Hedefleri**: "Bu modülün sonunda..." ifadesi "Bu laboratuvarın sonunda..." olarak güncellendi
  - **Gezinme Bağlantıları**: Tüm çapraz referans ve navigasyonda "Modül XX:" kullanımları "Laboratuvar XX:" olarak değiştirildi
  - **Tamamlama Takibi**: "Bu modülü tamamladıktan sonra..." ifadesi "Bu laboratuvarı tamamladıktan sonra..." olarak güncellendi
  - **Teknik Referanslar Korundu**: Konfigürasyon dosyalarındaki Python modül referansları (örneğin `"module": "mcp_server.main"`) korundu

#### Çalışma Rehberi Geliştirmesi (study_guide.md)
- **Görsel Müfredat Haritası**: "11. Veritabanı Entegrasyon Laboratuvarları" bölümü ve kapsamlı laboratuvar yapısı görselleştirmesi eklendi
- **Depo Yapısı**: On bölümden on bir ana bölüme çıkarılarak 11-MCPServerHandsOnLabs ayrıntılı şekilde güncellendi
- **Öğrenme Yolu Rehberi**: 00-11 arasındaki bölümleri kapsayan gezinme talimatları geliştirildi
- **Teknoloji Kapsamı**: FastMCP, PostgreSQL, Azure servis entegrasyon detayları eklendi
- **Öğrenme Çıktıları**: Üretim hazır sunucu geliştirme, veritabanı entegrasyon kalıpları ve kurumsal güvenlik vurgulandı

#### Ana README Yapılandırma Geliştirmesi
- **Laboratuvar Tabanlı Terminoloji**: 11-MCPServerHandsOnLabs ana README.md dosyası "Laboratuvar" yapısını tutarlı şekilde kullanacak biçimde güncellendi
- **Öğrenme Yolu Organizasyonu**: Temel kavramlardan gelişmiş uygulama ve üretim dağıtımına net ilerleyiş
- **Gerçek Dünya Odaklı**: Kurumsal düzeyde kalıplar ve teknolojilerle pratik, uygulamalı öğrenme vurgusu

### Dokümantasyon Kalite & Tutarlılık İyileştirmeleri
- **Uygulamalı Öğrenme Vurgusu**: Dokümantasyonda uygulamalı, laboratuvar tabanlı yaklaşıma güçlendirildi
- **Kurumsal Kalıplar Odak**: Üretim hazır uygulamalar ve kurumsal güvenlik vurgusu yapıldı
- **Teknoloji Entegrasyonu**: Modern Azure servisleri ve yapay zeka entegrasyon kalıpları kapsamlı işlendi
- **Öğrenme İlerleyişi**: Temel kavramlardan üretim dağıtımına net ve yapılandırılmış yol

## 26 Eylül 2025

### Vaka Çalışmaları Geliştirmesi - GitHub MCP Kaydı Entegrasyonu

#### Vaka Çalışmaları (09-CaseStudy/) - Ekosistem Geliştirme Odaklı
- **README.md**: Kapsamlı GitHub MCP Kaydı vaka çalışması ile büyük genişletme
  - **GitHub MCP Kaydı Vaka Çalışması**: Eylül 2025’te GitHub'ın MCP Kaydı lansmanını detaylı şekilde inceleyen yeni vaka çalışması
    - **Sorun Analizi**: Parçalanmış MCP sunucu keşfi ve dağıtım zorluklarının detaylı incelemesi
    - **Çözüm Mimarisi**: GitHub’ın merkezi kayıt yaklaşımı ve tek tıkla VS Code kurulumu
    - **İş Etkisi**: Geliştirici onboarding ve üretkenlikte ölçülebilir iyileşmeler
    - **Stratejik Değer**: Modüler ajan dağıtımı ve araçlar arası etkileşim odaklı
    - **Ekosistem Gelişim**: Ajan tabanlı entegrasyon için temel platform konumlandırması
  - **Geliştirilmiş Vaka Çalışması Yapısı**: Tüm yedi vaka çalışmasının tutarlı formatta ve kapsamlı açıklamalarla güncellenmesi
    - Azure AI Seyahat Ajanları: Çoklu ajan orkestrasyon vurgusu
    - Azure DevOps Entegrasyonu: İş akışı otomasyonu odaklı
    - Gerçek Zamanlı Dokümantasyon Getirme: Python konsol istemcisi uygulaması
    - Etkileşimli Çalışma Planı Üreticisi: Chainlit sohbet tabanlı web uygulaması
    - Editör İçi Dokümantasyon: VS Code ve GitHub Copilot entegrasyonu
    - Azure API Yönetimi: Kurumsal API entegrasyon kalıpları
    - GitHub MCP Kaydı: Ekosistem geliştirme ve topluluk platformu
  - **Kapsamlı Sonuç**: Çok boyutlu MCP uygulamalarını içeren yedi vaka çalışmasını vurgulayan yeniden yazılmış sonuç bölümü
    - Kurumsal Entegrasyon, Çoklu Ajan Orkestrasyonu, Geliştirici Üretkenliği
    - Ekosistem Geliştirme, Eğitim Uygulamaları kategorilendirmesi
    - Mimari kalıplar, uygulama stratejileri ve en iyi uygulamalarda geliştirilen içgörüler
    - MCP’nin olgun, üretim hazır protokol olarak vurgulanması

#### Çalışma Rehberi Güncellemeleri (study_guide.md)
- **Görsel Müfredat Haritası**: Vaka Çalışmaları bölümünde GitHub MCP Kaydı eklendi
- **Vaka Çalışmaları Açıklaması**: Genel açıklamalardan yedi kapsamlı vaka çalışmasının ayrıntılı dökümüne güncellendi
- **Depo Yapısı**: Bölüm 10, kapsamlı vaka çalışması içeriğini yansıtacak şekilde güncellendi
- **Değişiklik Günlüğü Entegrasyonu**: 26 Eylül 2025 girdisi eklendi, GitHub MCP Kaydı ve vaka çalışması iyileştirmeleri dokümante edildi
- **Tarih Güncellemeleri**: Alt bilgi zaman damgası en son revizyona göre (26 Eylül 2025) güncellendi

### Dokümantasyon Kalite İyileştirmeleri
- **Tutarlılık Geliştirmesi**: Tüm yedi örnekte vaka çalışması biçimlendirmesi ve yapısı standart hale getirildi
- **Kapsamlı Gösterim**: Vaka çalışmaları şimdi kurumsal, geliştirici üretkenliği ve ekosistem geliştirme senaryolarını kapsıyor
- **Stratejik Konumlandırma**: MCP’nin ajan tabanlı sistem dağıtımı için temel platform olarak güçlendirilmesi
- **Kaynak Entegrasyonu**: Ek kaynaklara GitHub MCP Kaydı bağlantısı eklendi

## 15 Eylül 2025

### Gelişmiş Konular Genişletmesi - Özel Taşıyıcılar & Bağlam Mühendisliği

#### MCP Özel Taşıyıcılar (05-AdvancedTopics/mcp-transport/) - Yeni Gelişmiş Uygulama Rehberi
- **README.md**: Özel MCP taşıyıcı mekanizmaları için tam uygulama kılavuzu
  - **Azure Event Grid Taşıyıcısı**: Sunucusuz olay tetiklemeli taşıyıcı uygulaması
    - C#, TypeScript ve Python örnekleri ile Azure Functions entegrasyonu
    - Ölçeklenebilir MCP çözümleri için olay tabanlı mimari kalıplar
    - Webhook alıcıları ve push tabanlı mesaj yönetimi
  - **Azure Event Hubs Taşıyıcısı**: Yüksek verimli akış taşıyıcı uygulaması
    - Düşük gecikmeli senaryolar için gerçek zamanlı akış özellikleri
    - Partitioning stratejileri ve checkpoint yönetimi
    - Mesaj gruplama ve performans optimizasyonu
  - **Kurumsal Entegrasyon Kalıpları**: Üretim hazır mimari örnekler
    - Çoklu Azure Functions aracılığıyla dağıtık MCP işleme
    - Birden fazla taşıyıcı tipini birleştiren hibrit taşıyıcı mimarileri
    - Mesaj dayanıklılığı, güvenilirlik ve hata yönetimi stratejileri
  - **Güvenlik & İzleme**: Azure Key Vault entegrasyonu ve gözlemlenebilirlik kalıpları
    - Yönetilen kimlik doğrulama ve en az ayrıcalık erişimi
    - Application Insights telemetri ve performans izleme
    - Devre kesiciler ve hata toleransı kalıpları
  - **Test Çerçeveleri**: Özel taşıyıcılar için kapsamlı test stratejileri
    - Birim testi için test doubleri ve mock framework’leri
    - Azure Test Containers ile entegrasyon testi
    - Performans ve yük testi değerlendirmeleri

#### Bağlam Mühendisliği (05-AdvancedTopics/mcp-contextengineering/) - Yeni Gelişen AI Disiplini
- **README.md**: Bağlam mühendisliği alanının kapsamlı keşfi
  - **Temel İlkeler**: Tam bağlam paylaşımı, aksiyon karar farkındalığı ve bağlam pencere yönetimi
  - **MCP Protokol Uyum**: MCP tasarımının bağlam mühendisliği zorluklarını nasıl ele aldığı
    - Bağlam pencere sınırları ve ilerleyici yükleme stratejileri
    - Alaka belirleme ve dinamik bağlam getirme
    - Çok modlu bağlam yönetimi ve güvenlik hususları
  - **Uygulama Yaklaşımları**: Tek iş parçacıklı ve çok ajanlı mimariler
    - Bağlam parçalama ve önceliklendirme teknikleri
    - İlerleyici bağlam yükleme ve sıkıştırma stratejileri
    - Katmanlı bağlam yaklaşımları ve getirme optimizasyonu
  - **Ölçüm Çerçevesi**: Bağlam etkinliği değerlendirme için gelişmekte olan metrikler
    - Girdi verimliliği, performans, kalite ve kullanıcı deneyimi unsurları
    - Bağlam optimizasyonu için deneysel yaklaşımlar
    - Başarısızlık analizi ve iyileştirme metodolojileri

#### Müfredat Navigasyonu Güncellemeleri (README.md)
- **Gelişmiş Modül Yapısı**: Müfredat tablosu yeni gelişmiş konuları içerecek şekilde güncellendi
  - Bağlam Mühendisliği (5.14) ve Özel Taşıyıcı (5.15) girdileri eklendi
  - Tüm modüllerde tutarlı biçimlendirme ve gezinme bağlantıları sağlandı
  - Güncel içerik kapsamına göre açıklamalar güncellendi

### Dizin Yapısı İyileştirmeleri
- **Adlandırma Standartlaştırması**: "mcp transport" klasörü diğer gelişmiş konu klasörleriyle tutarlılık için "mcp-transport" olarak yeniden adlandırıldı
- **İçerik Organizasyonu**: Tüm 05-AdvancedTopics klasörleri tutarlı adlandırma kalıbını takip edecek şekilde düzenlendi (mcp-[konu])

### Dokümantasyon Kalite İyileştirmeleri
- **MCP Spesifikasyonu Uyumu**: Yeni tüm içerik MCP Spesifikasyonu 2025-06-18 referanslarına uygun
- **Çok Dilli Örnekler**: C#, TypeScript ve Python’da kapsamlı kod örnekleri sunuldu
- **Kurumsal Odak**: Üretime hazır kalıplar ve Azure bulut entegrasyonu genelinde  
- **Görsel Dokümantasyon**: Mimari ve akış görselleştirme için Mermaid diyagramları

## 18 Ağustos 2025

### Dokümantasyon Kapsamlı Güncelleme - MCP 2025-06-18 Standartları

#### MCP Güvenlik En İyi Uygulamaları (02-Security/) - Tam Modernizasyon
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP Spesifikasyonu 2025-06-18 ile uyumlu tam yeniden yazım  
  - **Zorunlu Gereksinimler**: Resmi spesifikasyondan açıkça belirtilen GEREKİR/GEREKMEZ gereksinimleri ve net görsel göstergeler eklendi  
  - **12 Temel Güvenlik Uygulaması**: 15 maddelik listeden kapsamlı güvenlik alanlarına yeniden yapılandırıldı  
    - Dış kimlik sağlayıcı entegrasyonlu Token Güvenliği ve Kimlik Doğrulama  
    - Kriptografik gereksinimlerle Oturum Yönetimi ve Taşıma Güvenliği  
    - Microsoft Prompt Shields entegrasyonlu AI Özel Tehdit Koruması  
    - En az ayrıcalık prensibiyle Erişim Kontrolü ve İzinler  
    - Azure Content Safety entegrasyonlu İçerik Güvenliği ve İzleme  
    - Kapsamlı bileşen doğrulamasıyla Tedarik Zinciri Güvenliği  
    - PKCE uygulamalı OAuth Güvenliği ve Karışık Vekil Engelleme  
    - Otomatik yeteneklerle Olay Müdahalesi ve Kurtarma  
    - Düzenleyici uyumlulukla Uyumluluk ve Yönetişim  
    - Sıfır güven mimarisiyle Gelişmiş Güvenlik Kontrolleri  
    - Kapsamlı çözümlerle Microsoft Güvenlik Ekosistemi Entegrasyonu  
    - Uyarlanabilir uygulamalarla Sürekli Güvenlik Evrimi  
  - **Microsoft Güvenlik Çözümleri**: Prompt Shields, Azure Content Safety, Entra ID ve GitHub Advanced Security için geliştirilmiş entegrasyon rehberi  
  - **Uygulama Kaynakları**: Resmi MCP Dokümantasyonu, Microsoft Güvenlik Çözümleri, Güvenlik Standartları ve Uygulama Kılavuzları şeklinde kategorize edilmiş kapsamlı kaynak bağlantıları

#### Gelişmiş Güvenlik Kontrolleri (02-Security/) - Kurumsal Uygulama  
- **MCP-SECURITY-CONTROLS-2025.md**: Kurumsal sınıf güvenlik çerçevesiyle tam revizyon  
  - **9 Kapsamlı Güvenlik Alanı**: Temel kontrollerden detaylı kurumsal çerçeveye genişletildi  
    - Microsoft Entra ID entegrasyonlu Gelişmiş Kimlik Doğrulama ve Yetkilendirme  
    - Kapsamlı doğrulama ile Token Güvenliği ve Geçiş Engelleyici Kontroller  
    - Ele geçirme önleyici Oturum Güvenliği Kontrolleri  
    - Prompt enjeksiyonu ve araç zehirlenmesi önleyici AI Özel Güvenlik Kontrolleri  
    - OAuth proxy güvenliğiyle Karışık Vekil Saldırısı Önleme  
    - Kum havuzu ve izolasyonlu Araç Çalıştırma Güvenliği  
    - Bağımlılık doğrulamalı Tedarik Zinciri Güvenlik Kontrolleri  
    - SIEM entegrasyonlu İzleme ve Algılama Kontrolleri  
    - Otomatik yeteneklerle Olay Müdahalesi ve Kurtarma  
  - **Uygulama Örnekleri**: Detaylı YAML konfigürasyon blokları ve kod örnekleri eklendi  
  - **Microsoft Çözümleri Entegrasyonu**: Azure güvenlik servisleri, GitHub Advanced Security ve kurumsal kimlik yönetiminin kapsamlı yer alması

#### Gelişmiş Konular Güvenliği (05-AdvancedTopics/mcp-security/) - Üretime Hazır Uygulama
- **README.md**: Kurumsal güvenlik uygulaması için tam yeniden yazım  
  - **Mevcut Spesifikasyon Uyumu**: MCP Spesifikasyonu 2025-06-18’e göre güncelleme ve zorunlu güvenlik gereksinimleri  
  - **Gelişmiş Kimlik Doğrulama**: Detaylı .NET ve Java Spring Security örnekleriyle Microsoft Entra ID entegrasyonu  
  - **AI Güvenlik Entegrasyonu**: Microsoft Prompt Shields ve Azure Content Safety uygulaması, detaylı Python örnekleri ile  
  - **Gelişmiş Tehdit Hafifletme**:  
    - PKCE ve kullanıcı onayı doğrulamalı Karışık Vekil Saldırısı Önleme  
    - Hedef doğrulamalı ve güvenli token yönetimli Token Geçiş Engelleme  
    - Kriptografik bağlama ve davranış analizli Oturum Ele Geçirme Önleme  
  - **Kurumsal Güvenlik Entegrasyonu**: Azure Application Insights izleme, tehdit algılama hatları ve tedarik zinciri güvenliği  
  - **Uygulama Kontrol Listesi**: Zorunlu ile önerilen güvenlik kontrollerinin net ayrımı ve Microsoft güvenlik ekosistemi avantajları

### Dokümantasyon Kalitesi ve Standart Uyumu
- **Spesifikasyon Referansları**: Tüm referanslar mevcut MCP Spesifikasyonu 2025-06-18’e güncellendi  
- **Microsoft Güvenlik Ekosistemi**: Tüm güvenlik dokümantasyonunda geliştirilmiş entegrasyon rehberi  
- **Pratik Uygulama**: .NET, Java ve Python’da kurumsal kalıplarla detaylı kod örnekleri eklendi  
- **Kaynak Organizasyonu**: Resmi dokümantasyon, güvenlik standartları ve uygulama rehberlerinin kapsamlı kategorizasyonu  
- **Görsel Göstergeler**: Zorunlu gereksinimler ile önerilen uygulamalar net olarak işaretlendi

#### Temel Kavramlar (01-CoreConcepts/) - Tam Modernizasyon
- **Protokol Sürüm Güncellemesi**: Mevcut MCP Spesifikasyonu 2025-06-18 referanslı tarih bazlı sürümleme (YYYY-MM-DD formatı)  
- **Mimari İyileştirme**: Host, İstemci ve Sunucuların mevcut MCP mimari kalıplarına göre geliştirilmiş tanımları  
  - Host’lar artık birden fazla MCP istemci bağlantısını koordine eden AI uygulamaları olarak net tanımlandı  
  - İstemciler protokol bağlayıcıları olarak tanımlandı, bire bir sunucu ilişkisi sürdürür  
  - Sunucular yerel vs. uzak dağıtım senaryolarıyla geliştirildi  
- **Primitive Yeniden Yapılandırması**: Sunucu ve istemci primitive’lerinin tam yenilenmesi  
  - Sunucu Primitive’leri: Kaynaklar (veri kaynakları), İstekler (şablonlar), Araçlar (çalıştırılabilir fonksiyonlar) detaylı açıklamalar ve örneklerle  
  - İstemci Primitive’leri: Örnekleme (LLM tamamlamaları), Sorgulama (kullanıcı girdisi), Kayıt Tutma (hata ayıklama/izleme)  
  - Mevcut keşif (`*/list`), alma (`*/get`), yürütme (`*/call`) yöntem kalıplarıyla güncellendi  
- **Protokol Mimarisi**: İki katmanlı mimari modeli tanıtıldı  
  - Veri Katmanı: Yaşam döngüsü yönetimi ve primitive’leri ile JSON-RPC 2.0 temeli  
  - Taşıma Katmanı: STDIO (yerel) ve SSE destekli Streamable HTTP (uzak) taşıma mekanizmaları  
- **Güvenlik Çerçevesi**: Açık kullanıcı onayı, veri gizliliği koruması, araç çalıştırma güvenliği ve taşıma katmanı güvenliği dahil kapsamlı ilkeler  
- **İletişim Kalıpları**: Başlatma, keşif, yürütme ve bildirim akışlarını gösteren güncellenmiş protokol mesajları  
- **Kod Örnekleri**: Mevcut MCP SDK kalıplarını yansıtan çok dilli (.NET, Java, Python, JavaScript) güncellenmiş örnekler

#### Güvenlik (02-Security/) - Kapsamlı Güvenlik Yenilemesi  
- **Standart Uyumu**: MCP Spesifikasyonu 2025-06-18 güvenlik gereksinimleriyle tam uyum  
- **Kimlik Doğrulama Evrimi**: Özel OAuth sunucularından dış kimlik sağlayıcı delege sistemine (Microsoft Entra ID) geçiş belgelenmesi  
- **AI Özel Tehdit Analizi**: Modern AI saldırı vektörlerinin geliştirilmiş kapsamı  
  - Gerçek örneklerle detaylı prompt enjeksiyonu saldırı senaryoları  
  - Araç zehirlenmesi mekanizmaları ve "rug pull" saldırı kalıpları  
  - Bağlam penceresi zehirlenmesi ve model karışıklığı saldırıları  
- **Microsoft AI Güvenlik Çözümleri**: Microsoft güvenlik ekosistemine kapsamlı bakış  
  - Gelişmiş algılama, vurgulama ve ayırıcı tekniklerle AI Prompt Shields  
  - Azure Content Safety entegrasyon kalıpları  
  - Tedarik zinciri koruması için GitHub Advanced Security  
- **Gelişmiş Tehdit Hafifletme**:  
  - MCP özel oturum ele geçirme saldırı senaryoları ve kriptografik oturum kimliği gereksinimleri  
  - MCP proxy senaryolarında karışık vekil problemleri ve açık onay gereksinimleri  
  - Zorunlu doğrulama kontrolleriyle token geçiş açıklıkları  
- **Tedarik Zinciri Güvenliği**: Temel modeller, gömme servisleri, bağlam sağlayıcılar ve üçüncü taraf API’ler dahil genişletilmiş AI tedarik zinciri kapsamı  
- **Temel Güvenlik**: Sıfır güven mimarisi ve Microsoft güvenlik ekosistemi ile geliştirilmiş entegrasyon  
- **Kaynak Organizasyonu**: Resmi dokümanlar, standartlar, araştırmalar, Microsoft çözümleri ve uygulama rehberlerine göre kategorize edilmiş kapsamlı kaynaklar

### Dokümantasyon Kalite İyileştirmeleri
- **Yapılandırılmış Öğrenme Hedefleri**: Spesifik, uygulanabilir çıktılarla zenginleştirildi  
- **Çapraz Referanslar**: İlgili güvenlik ve temel kavramlar arasında bağlantılar eklendi  
- **Güncel Bilgi**: Tüm tarih referansları ve spesifikasyon bağlantıları mevcut standartlara güncellendi  
- **Uygulama Rehberi**: Her iki bölümde de özel, uygulanabilir uygulama yönergeleri eklendi

## 16 Temmuz 2025

### README ve Navigasyon İyileştirmeleri
- README.md’de müfredat navigasyonu tamamen yeniden tasarlandı  
- `<details>` etiketleri, daha erişilebilir tablo tabanlı formata dönüştürüldü  
- "alternative_layouts" klasöründe alternatif düzen seçenekleri oluşturuldu  
- Kart tabanlı, sekmeli ve akordeon tarzı navigasyon örnekleri eklendi  
- Depo yapı bölümüne en son dosyalar eklendi  
- "Bu Müfredatı Nasıl Kullanılır" bölümü net önerilerle geliştirildi  
- MCP spesifikasyon bağlantıları doğru URL’lere güncellendi  
- Müfredat yapısına Context Engineering bölümü (5.14) eklendi

### Çalışma Rehberi Güncellemeleri
- Çalışma rehberi depo yapısına uygun şekilde tamamen revize edildi  
- MCP İstemcileri ve Araçları ile Popüler MCP Sunucuları için yeni bölümler eklendi  
- Görsel Müfredat Haritası tüm konuları doğru şekilde yansıtacak biçimde güncellendi  
- Gelişmiş Konular tanımları tüm uzmanlık alanlarını kapsayacak şekilde güçlendirildi  
- Vaka Çalışmaları bölümü gerçek örneklerle güncellendi  
- Bu kapsamlı değişiklik günlüğü eklendi

### Topluluk Katkıları (06-CommunityContributions/)
- Görüntü oluşturma için MCP sunucuları hakkında detaylı bilgiler eklendi  
- VSCode’da Claude kullanımı için kapsamlı bölüm eklendi  
- Cline terminal istemcisi kurulum ve kullanım talimatları eklendi  
- MCP istemci bölümüne tüm popüler istemci seçenekleri eklendi  
- Katkı örnekleri daha doğru kod örnekleri ile güçlendirildi

### Gelişmiş Konular (05-AdvancedTopics/)
- Tüm uzmanlık konu klasörleri tutarlı isimlendirme ile düzenlendi  
- Context engineering materyalleri ve örnekleri eklendi  
- Foundry ajan entegrasyon dokümantasyonu eklendi  
- Entra ID güvenlik entegrasyon dokümantasyonu geliştirildi

## 11 Haziran 2025

### İlk Oluşturma
- MCP for Beginners müfredatının ilk versiyonu yayınlandı  
- 10 ana bölümün temel yapısı oluşturuldu  
- Navigasyon için Görsel Müfredat Haritası uygulandı  
- Çoklu programlama dillerinde başlangıç projeleri eklendi

### Başlangıç (03-GettingStarted/)
- İlk sunucu uygulama örnekleri oluşturuldu  
- İstemci geliştirme rehberi eklendi  
- LLM istemci entegrasyon talimatları dahil edildi  
- VS Code entegrasyon dokümantasyonu eklendi  
- Server-Sent Events (SSE) sunucu örnekleri uygulandı

### Temel Kavramlar (01-CoreConcepts/)
- İstemci-sunucu mimarisinin detaylı açıklaması eklendi  
- Ana protokol bileşenleri dokümante edildi  
- MCP’de mesajlaşma kalıpları kaydedildi

## 23 Mayıs 2025

### Depo Yapısı
- Temel klasör yapısı ile depo başlatıldı  
- Her ana bölüm için README dosyaları oluşturuldu  
- Çeviri altyapısı kuruldu  
- Görsel ve diyagram varlıkları eklendi

### Dokümantasyon
- Müfredat genel bakışını içeren ilk README.md oluşturuldu  
- CODE_OF_CONDUCT.md ve SECURITY.md eklendi  
- Destek almak için SUPPORT.md oluşturuldu  
- Ön çalışma rehberi yapısı oluşturuldu

## 15 Nisan 2025

### Planlama ve Çerçeve
- MCP for Beginners müfredatı için ilk planlama yapıldı  
- Öğrenme hedefleri ve hedef kitle tanımlandı  
- Müfredatın 10 bölüm yapısı tasarlandı  
- Örnekler ve vaka çalışmaları için kavramsal çerçeve geliştirildi  
- Anahtar kavramlar için başlangıç prototip örnekleri oluşturuldu

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->