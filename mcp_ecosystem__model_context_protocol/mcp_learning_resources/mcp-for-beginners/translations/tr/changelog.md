# Değişiklik Günlüğü: MCP Yeni Başlayanlar Müfredatı

Bu belge, Model Context Protocol (MCP) Yeni Başlayanlar müfredatında yapılan tüm önemli değişikliklerin kaydı olarak hizmet vermektedir. Değişiklikler kronolojik ters sırayla (en yeni değişiklikler önce) belgelenmiştir.

## 24 Haziran 2026

### Yeni Ders: MCP'nin Copilot uygulamasında kullanımı

- [Araç bölümü](./12-tooling/README.md) Araç bölümü eklendi.
- [Copilot uygulamasında MCP](./12-tooling/01-copilot-app/README.md)

## 16 Haziran 2026

### MCP Spesifikasyon Hizalaması ve Örnek Doğrulaması

Müfredat, mevcut **MCP Spesifikasyon 2025-11-25** ve en son resmi SDK’lar ile karşılaştırıldı, kalan eski spesifikasyon referansları düzeltildi ve temel örneklerin hala derlenip çalıştığı doğrulandı.

#### Spesifikasyon Sürümü Düzeltmeleri (2025-06-18 / 2025-03-26 → 2025-11-25)

İngilizce içerikte hâlâ eski bir spesifikasyon revizyonu *mevcut/en son* standart olarak belirtilen yerler güncellendi ve bağlantılar canonical `modelcontextprotocol.io` spesifikasyon yollarına yönlendirildi:
- **05-AdvancedTopics/mcp-security/README.md**: "Mevcut Standart" başlığı, giriş, temel güvenlik ilkeleri başlığı, zorunlu gereksinimler başlığı, Microsoft Entra ID bölümü, Referanslar ve Kaynaklar bağlantıları ve kapanış güvenlik bildirimi (8 referans) 2025-11-25 olarak güncellendi
- **05-AdvancedTopics/mcp-transport/README.md**: Ek Kaynaklar spesifikasyon bağlantısı ve "Mevcut Standart" başlığı 2025-11-25 olarak güncellendi
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Güncel olmayan `2025-03-26` güvenlik-ve-güven bağlantısı, güncel 2025-11-25 güvenlik en iyi uygulamaları sayfası ile değiştirildi
- **03-GettingStarted/14-sampling/README.md**: Resmi örnekleme dokümanları bağlantısı 2025-11-25 olarak güncellendi
- **03-GettingStarted/05-stdio-server/README.md**: Şimdiki zamanda "mevcut MCP spesifikasyonu" referansı ve Ek Kaynaklar spesifikasyon bağlantısı 2025-11-25 olarak güncellendi (tarihsel SSE-eski-notları doğruluk için saklandı)

#### Mevcut SDK’lara Karşı Örnek Doğrulaması

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ile `@modelcontextprotocol/sdk@1.29.0` çözüldü; `tsc --noEmit` tür hatası olmadan geçti — mevcut `McpServer`/`StdioServerTransport` API’leri geçerli kaldı
- **Python (03-GettingStarted/01-first-server/solution/python)**: İzole bir `.venv` ortamında `mcp[cli]` (1.27.2) ile doğrulandı; `py_compile` başarılı oldu ve `FastMCP.list_tools()` doğru şekilde `add` ve `subtract` araçlarını döndürdü
- Tüm örnek `@modelcontextprotocol/sdk` sürüm aralıklarının (`>=1.26.0` / `^1.26.0` / `^1.27.0`) mevcut `1.29.0` sürümüne sorunsuz çözüldüğü ve API uyumluluğunun korunduğu doğrulandı

#### Bağımlılık Sürüm Uyumu (versiyon boşluklarının kapanması)

Güncel MCP sürümünü takip etmeleri için eski SDK sürümleri yükseltildi, depo genelindeki konvansiyona uyuldu:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` `^1.8.0`’den `>=1.26.0`’a yükseltildi ve eskimiş `"updated for MCP 2025-06-18"` paket açıklaması `"aligned with MCP Specification 2025-11-25"` olarak değiştirildi
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ve **lab4/code/github_mcp_server/pyproject.toml**: Kesin pin `mcp==1.23.0` → `mcp>=1.26.0` olarak yükseltildi; her iki `uv.lock` dosyası (`uv lock`) yeniden oluşturuldu, kilitleme dosyaları mevcut `mcp 1.27.2` sürümüne çözüldü ve manifestolarla uyumlu kaldı

#### Müfredat Boşluk Analizi — En Son Spesifikasyon Özellik Kapsamı

Müfredatın MCP 2025-11-25 ile eklenen/genişletilen tüm temel öğeleri kapsadığı doğrulandı, içerik boşlukları kalmadı:
- **Örnekleme**: 03-GettingStarted/14-sampling dersi ve 05-AdvancedTopics/mcp-sampling
- **Bilgi Toplama (URL modu dahil)**: 01-CoreConcepts ve 05-AdvancedTopics/mcp-protocol-features belgelerinde
- **Kökler**: 00-Introduction, 01-CoreConcepts ve 05-AdvancedTopics/mcp-root-contexts içinde
- **Görevler (deneysel, uzun süreli işlemler)**: 01-CoreConcepts ve 05-AdvancedTopics/mcp-protocol-features belgelerinde
- **Araç Açıklamaları** (`readOnlyHint` / `destructiveHint`): 01-CoreConcepts ve 05-AdvancedTopics/mcp-protocol-features belgelerinde

### Güvenlik Sertleştirme & Bağımlılık Zayıflıklarının Giderilmesi

Tüm bağımlılık manifestoları ve örnek kaynak kodu üzerinde tam bir güvenlik taraması yapıldı, bildirilen tüm npm uyarıları ve bir kod seviyesi bulgu giderildi. Düzeltmeler sonrası `npm audit` her denetlenen klasörde **0 zayıflık** bildiriyor.

#### npm Bağımlılık Zayıflıkları (geçişli) — Giderildi

15 adet gönderilmiş `package-lock.json` dosyası denetlendi. Zayıflıklar MCP Inspector geliştirme aracı, OpenAI istemcisi ve MCP SDK tarafından çekilen geçişli bağımlılıklarda sınırlıydı; tümü örnekleri bozmadan çözüldü:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ve **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`) sürümü yükseltildi; bağlı `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ve `ws` uyarıları temizlendi. Kalan kritik `concurrently` aracının `shell-quote@1.8.4` yamalı sürümünün kullanılmasını zorlayan bir npm `overrides` girdisi eklendi; kilitleme dosyaları yeniden oluşturuldu (artık 0 zayıflık)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ile geçişli `qs` (orta şiddette) yamalı sürüme güncellendi
- **03-GettingStarted/samples/javascript**: `npm audit fix` ile geçişli `hono` (orta şiddette) yamalı sürüme güncellendi
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ile geçişli `form-data` (yüksek şiddette) yamalı sürüme güncellendi
- **03-GettingStarted/11-simple-auth/solution/typescript**: Eksik `package-lock.json` dosyası oluşturuldu, böylece proje üretilebilir ve denetlenebilir oldu (0 zayıflık)

#### Kod Seviyesi Güvenlik Düzeltmesi (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `open_in_vscode` aracından `shell=True` kaldırıldı. Önceki `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` komutu, klasör yolundaki kabuk meta karakterlerinin `cmd.exe` tarafından yorumlanmasına izin veriyordu (komut enjeksiyonu vektörü). Artık `Code.exe` doğrudan klasör argümanıyla başlatılıyor — kabuk yok — fonksiyonel olarak eşdeğer ve güvenli

#### Python Bağımlılık Denetimi

- Tüm Python gereksinimleri `pip-audit` ile denetlendi. `05-AdvancedTopics` ve `03-GettingStarted/samples/python` **bilinen zayıflık bildirmedi** (`mcp` / `httpx` / `pydantic` / `python-dotenv` sürüm aralıkları mevcut yamalı sürümlere çözülüyor)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit`, üç `safe_join` Windows cihaz ismi DoS uyarısı ile geçişli bağımlılık **`werkzeug` 3.1.1** (CVE-2025-66221, CVE-2026-21860, CVE-2026-27199; hepsi 3.1.6’da düzeltildi) tespit etti. Yamalı sürümün çözülmesi için açık bir güvenlik sabitleme `werkzeug>=3.1.6` eklendi; kısıtlamanın `chainlit` / `mcp` / `semantic-kernel` yığını ile sorunsuz çözüldüğü doğrulandı

### Ürün Adı Yeniden Markalaşması

Tüm müfredat içeriği Microsoft’un ürün yeniden markalaşmasını yansıtacak şekilde güncellendi:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord topluluk bağlantısı güncellendi
- **AGENTS.md**: Discord sunucu referansı güncellendi
- **README.md**: Teknoloji ekosistemi referansları güncellendi
- **study_guide.md**: Vaka çalışması referansları güncellendi
- **05-AdvancedTopics/README.md**: Modül 5.13 başlığı ve açıklaması güncellendi
- **05-AdvancedTopics/mcp-integration/README.md**: Bölüm başlığı ve açıklama güncellendi
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Tam modül başlığı ve içerik güncellemesi
- **05-AdvancedTopics/mcp-security-entra/README.md**: Çapraz referans bağlantısı güncellendi
- **07-LessonsfromEarlyAdoption/README.md**: Vaka çalışması referansları güncellendi
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Bölüm 9 başlığı, rozetler ve yetenekler güncellendi
- **08-BestPractices/README.md**: Discord topluluk bağlantısı güncellendi
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord kanal referansı güncellendi
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Model dağıtım referansı güncellendi
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI Servisleri tablosu güncellendi
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Kaynak referansları güncellendi

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Ana müfredat referansları güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Modül başlığı, genel bakış ve tüm modül başlıkları güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Başlık, öğrenme hedefleri, kurulum talimatları ve kaynaklar güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Başlık, öğrenme hedefleri, MCP host tablosu ve çapraz referanslar güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Başlık, rozetler, ön koşullar ve kaynaklar güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Agent Builder referansları ve geri bildirim bağlantısı güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Ön koşullar ve eklenti referansları güncellendi

---

## 11 Nisan 2026

### Yeni Ders, Dokümantasyon Düzeltmeleri ve Bağımlılık Güncellemeleri

#### Yeni Müfredat İçeriği Eklendi

**Modül 05 - İleri Konular**
- **Ders 5.17: MCP ile Rekabetçi Çoklu Ajan Akıl Yürütme** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Çoklu ajan sistemleri için rekabetçi tartışma modelini kapsayan yeni kapsamlı rehber
  - Mermaid mimari diyagramı: iki ajan → paylaşılan MCP sunucusu → tartışma transkripti → yargıç → karar
  - Python ve TypeScript’te uygulanmış paylaşılan MCP araç sunucusu (`web_search` + `run_python`)
  - Karşıt sistem istemleri (LEHÇE / KARŞI / Yargıç) ve açık araç kullanımı gereksinimleri
  - Turların yönetimi ve argümanların yönlendirilmesini yapan Python, TypeScript ve C#’da tartışma düzenleyici
  - Gerçek araç çağrılarına gerçek MCP `ClientSession` bağlantısı
  - Kullanım tablosu (halüsinasyon tespiti, tehdit modelleme, API tasarım incelemesi, gerçek doğrulama, teknoloji seçimi)
  - Güvenlik hususları: sandbox’lu yürütme, araç çağrısı doğrulaması, hız sınırlama, denetim kaydı
  - Üç pratik senaryo içeren yapısal egzersiz (kod incelemesi, mimari karar, içerik moderasyonu)

#### Dokümantasyon Düzeltmeleri

**Modül 03 - Başlangıç**
- **05-stdio-server/README.md**: Eksik TypeScript stdio sunucu örneği düzeltildi — Python ve .NET örnekleriyle uyumlu olmak için eksik transport örneklendirmesi (`new StdioServerTransport()`) ve `server.connect(transport)` çağrısı eklendi
- **14-sampling/README.md**: Yazım hatası düzeltildi — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Müfredat Güncellemeleri

**Ana README.md**
- Yeni derse doğrudan bağlantı ile kapsam tablosuna 5.17 (MCP ile Rekabetçi Çoklu Ajan Akıl Yürütme) eklendi

**05-AdvancedTopics/README.md**
- Dersler tablosuna Ders 5.17 satırı eklendi

**study_guide.md**
- Gelişmiş Konuların zihin haritasına ve açıklamasına Rekabetçi Çoklu Ajan Akıl Yürütme konusu eklendi

#### Kod ve Güvenlik Düzeltmeleri

**Modül 05 - Rekabetçi Ajanlar (`mcp-adversarial-agents`)**
- **Güvenlik düzeltmesi — komut enjeksiyonu**: TypeScript `run_python` aracında `execSync` kabuk enterpolasyonunu `execFile` + `promisify` ile değiştirerek komut enjeksiyonu yüzeyini ortadan kaldırdık (Artık LLM kontrolündeki kod, kabuk işlemi olmadan literal bir argv öğesi olarak iletiliyor)
- **MCP aracı döngü bağlantısı**: Python tartışma düzenleyicisi, engelleyen senkron `Anthropic` yerine `AsyncAnthropic` istemcisini kullanacak şekilde güncellendi, her ajan dönüşüne canlı bir `ClientSession` doğrudan geçildi, her dönüşte araç tanımları `session.list_tools()` ile çekiliyor ve `tool_use` blokları model nihai metin yanıtını verene kadar `session.call_tool()` ile döngüde yürütülüyor

#### Bağımlılık Güncellemeleri

- Birçok pakette (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows) `hono` 4.12.12 sürümüne yükseltildi
- TypeScript paketlerinde `@hono/node-server` 1.19.11'den 1.19.13'e yükseltildi
- Python paketlerinde (10-StreamliningAIWorkflows laboratuvarları 3 ve 4) `cryptography` 46.0.5'ten 46.0.7'ye yükseltildi
- 10-StreamliningAIWorkflows denetleyicide `lodash` 4.17.23'ten 4.18.1'e yükseltildi

#### Çeviriler

- 48+ dil için en son kaynak değişiklikleriyle çeviriler senkronize edildi (i18n güncellemesi)

---

## 5 Şubat 2026

### Depo Genelinde Doğrulama ve Navigasyon İyileştirmeleri

#### Yeni Müfredat İçeriği Eklendi

**Modül 03 - Başlarken**
- **12-mcp-hosts/README.md**: MCP hostlarının kurulumu için kapsamlı yeni rehber
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf yapılandırma örnekleri
  - Tüm önemli hostlar için JSON yapılandırma şablonları
  - Taşıma türleri karşılaştırma tablosu (stdio, SSE/HTTP, WebSocket)
  - Yaygın bağlantı sorunlarını giderme
  - Host yapılandırması için güvenlik en iyi uygulamaları

- **13-mcp-inspector/README.md**: MCP Inspector için yeni hata ayıklama rehberi
  - Kurulum yöntemleri (npx, global npm, kaynak koddan)
  - Stdio ve HTTP/SSE yoluyla sunucuya bağlanma
  - Araçlar, kaynaklar ve istemler iş akışları testi
  - MCP Inspector ile VS Code entegrasyonu
  - Yaygın hata ayıklama senaryoları ve çözümleri

**Modül 04 - Pratik Uygulama**
- **pagination/README.md**: Yeni sayfalama uygulama rehberi
  - Python, TypeScript, Java’da imleç tabanlı sayfalama kalıpları
  - İstemci tarafı sayfalama yönetimi
  - İmleç tasarım stratejileri (opak ve yapılandırılmış)
  - Performans optimizasyon önerileri

**Modül 05 - İleri Konular**
- **mcp-protocol-features/README.md**: Yeni protokol özellikleri derinlemesine inceleme
  - İlerleme bildirimleri uygulaması
  - İstek iptali kalıpları
  - URI kalıplı kaynak şablonları
  - Sunucu yaşam döngüsü yönetimi
  - Günlükleme seviyesi kontrolü
  - JSON-RPC kodları ile hata işleme kalıpları

#### Navigasyon Düzeltmeleri (24+ dosya güncellendi)

**Ana Modül README Dosyaları**
 Artık hem ilk derse HEM de sonraki modüle bağlantı veriyor

**02-Security Alt Dosyaları**
- Tüm 5 tamamlayıcı güvenlik dokümanında artık "Sonraki Ne" navigasyonu var

**09-CaseStudy Dosyaları**
- Tüm vaka çalışması dosyalarında artık ardışık navigasyon mevcut

**10-StreamliningAI Laboratuvarları**
Modül 10 genel görünümü ve Modül 11’e Sonraki Ne bölümü eklendi

#### Kod ve İçerik Düzeltmeleri

**SDK ve Bağımlılık Güncellemeleri**
Boş openai sürümü `^4.95.0` olarak düzeltildi
SDK `^1.8.0`’den `>=1.26.0`'a güncellendi
mcp sürüm pinleri `>=1.26.0` yapıldı

**Kod Düzeltmeleri**
Geçersiz model `gpt-4o-mini` `gpt-4.1-mini` olarak düzeltildi

**İçerik Düzeltmeleri**
Bozuk bağlantı `READMEmd` → `README.md` olarak düzeltildi, müfredat başlığı `Module 1-3` → `Module 0-3` olarak düzeltildi, büyük/küçük harf duyarlı yol düzeltildi
Bozuk çoğaltılmış Case Study 5 içeriği kaldırıldı

**Yeni Başlayanlar İçin Rehberlik İyileştirmeleri**
Yeni başlayanlar için doğru giriş, öğrenme hedefleri ve önkoşullar eklendi

#### Müfredat Güncellemeleri

**Ana README.md**
- Müfredat tablosuna 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Sayfalama), 5.16 (Protokol Özellikleri) girişleri eklendi

**Modül README Dosyaları**
Ders listesine 12 ve 13 dersleri eklendi
Sayfalama bağlantısı olan Pratik Rehberler bölümü eklendi
5.15 (Özel Taşıma) ve 5.16 (Protokol Özellikleri) dersleri eklendi

**study_guide.md**
- MCP Hosts Kurulumu, MCP Inspector, Sayfalama Stratejileri, Protokol Özellikleri Derinlemesine dahil olmak üzere tüm yeni konularla zihin haritası güncellendi

## 28 Ocak 2026

### MCP Spesifikasyonu 2025-11-25 Uyum İncelemesi

#### Temel Kavramlar Geliştirmesi (01-CoreConcepts/)
- **Yeni İstemci İlkel - Roots**: Sunucuların dosya sistemi sınırlarını ve erişim izinlerini anlamasını sağlayan kapsamlı Roots istemci ilkel dokümantasyonu eklendi
- **Araç Açıklamaları**: Daha iyi araç yürütme kararları için `readOnlyHint`, `destructiveHint` gibi araç davranış açıklamalarına yönelik dokümantasyon eklendi
- **Örnekleme İçinde Araç Çağrımı**: Örnekleme istekleri sırasında modele dayalı araç çağrısı için `tools` ve `toolChoice` parametrelerini içeren Örnekleme dokümantasyonu güncellendi
- **URL Modu Tetiklemesi**: Sunucu kaynaklı dış web etkileşimleri için URL tabanlı tetikleme dokümantasyonu eklendi
- **Görevler (Deneysel)**: Dayanıklı yürütme sarmalayıcıları ve ertelenmiş sonuç alma için deneysel Görevler özelliğine dair yeni bölüm eklendi
- **Simge Desteği**: Artık araçlar, kaynaklar, kaynak şablonları ve istemlerin ek meta veri olarak simgeler içerebileceği belirtildi

#### Dokümantasyon Güncellemeleri
- **README.md**: MCP Spesifikasyonu 2025-11-25 sürüm referansı ve tarih bazlı sürüm açıklaması eklendi
- **study_guide.md**: Müfredat haritasına Görevler ve Araç Açıklamaları Core Concepts bölümüne eklendi; belge zaman damgası güncellendi

#### Spesifikasyon Uyum Doğrulaması
- **Protokol Sürümü**: Tüm dokümantasyonun güncel MCP Spesifikasyonu 2025-11-25’i referans aldığı doğrulandı
- **Mimari Uyumu**: İki katman mimarisi (Veri Katmanı + Taşıma Katmanı) dokümantasyon doğruluğu onaylandı
- **İlkel Dokümantasyonu**: Sunucu ilkeleleri (Kaynaklar, İstemler, Araçlar) ve istemci ilkeleri (Örnekleme, Tetikleme, Günlükleme, Roots) doğrulandı
- **Taşıma Mekanizmaları**: STDIO ve Akışa Uygun HTTP taşıma dokümantasyonu doğruluğu teyit edildi
- **Güvenlik Kılavuzu**: Mevcut MCP Güvenlik En İyi Uygulamalarıyla uyum doğrulandı

#### MCP 2025-11-25 Ana Özellikleri Dokümante Edildi
- **OpenID Connect Keşfi**: Doğrulama sunucusu keşfi OIDC yoluyla
- **OAuth İstemci Kimliği Meta Verisi Belgeleri**: Önerilen istemci kayıt mekanizması
- **JSON Şema 2020-12**: MCP şema tanımları için varsayılan lehçe
- **SDK Katmanlama Sistemi**: SDK özellik desteği ve bakım için resmileştirilmiş gereksinimler
- **Yönetim Yapısı**: MCP yönetişiminde Çalışma Grupları ve İlgi Grupları resmileştirildi

### Güvenlik Dokümantasyonu Büyük Güncellemesi (02-Security/)

#### MCP Güvenlik Zirvesi Atölyesi (Sherpa) Entegrasyonu
- **Yeni Uygulamalı Eğitim Kaynağı**: Tüm güvenlik dokümantasyonunda [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) kapsamlı entegrasyonu eklendi
- **Kamp-Kamp İlerleme Rotası**: Ana Kamp’tan Zirve’ye olan tam yolculuk belgelendi
- **OWASP Uyumu**: Tüm güvenlik rehberliği şimdi OWASP MCP Azure Güvenlik Kılavuzu risklerine göre hizalanmıştır

#### OWASP MCP Top 10 Entegrasyonu
- **Yeni Bölüm**: Ana Güvenlik README’sine Azure azaltmaları ile OWASP MCP Top 10 Güvenlik Riskleri tablosu eklendi
- **Risk Bazlı Dokümantasyon**: mcp-security-controls-2025.md her güvenlik alanı için OWASP MCP risk referanslarıyla güncellendi
- **Referans Mimari**: OWASP MCP Azure Güvenlik Kılavuzu referans mimarisi ve uygulama kalıplarına bağlantı verildi

#### Güncellenen Güvenlik Dosyaları
- **README.md**: Sherpa Atölyesi genel görünümü, sefer rota tablosu, OWASP MCP Top 10 risk özeti ve uygulamalı eğitim bölümü eklendi
- **mcp-security-controls-2025.md**: Şubat 2026 tarih damgası ile güncellendi, OWASP risk referansları (MCP01-MCP08) eklendi, spesifikasyon sürüm uyumsuzluğu düzeltildi
- **mcp-security-best-practices-2025.md**: Sherpa ve OWASP kaynaklar bölümü eklendi, zaman damgası güncellendi
- **mcp-best-practices.md**: Sherpa ve OWASP bağlantıları ile uygulamalı eğitim bölümü eklendi
- **azure-content-safety-implementation.md**: OWASP MCP06 referansı, Sherpa Kamp 3 uyumu ve ek kaynaklar bölümü eklendi

#### Yeni Kaynak Bağlantıları Eklendi
- [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Bireysel OWASP MCP risk sayfaları (MCP01-MCP10)

### Müfredat Genelinde MCP Spesifikasyonu 2025-11-25 Uyum

#### Modül 03 - Başlarken
- **SDK Dokümantasyonu**: Go SDK resmi SDK listesine eklendi; tüm SDK referansları MCP Spesifikasyonu 2025-11-25 ile uyumlu hale getirildi
- **Taşıma Açıklaması**: STDIO ve HTTP Streaming taşıma tanımları açık spesifikasyon referanslarıyla güncellendi

#### Modül 04 - Pratik Uygulama
- **SDK Güncellemeleri**: Go SDK eklendi; SDK listesi spesifikasyon sürüm referansı ile güncellendi
- **Yetkilendirme Spesifikasyonu**: MCP Yetkilendirme spesifikasyonu güncel 2025-11-25 sürümüne güncellendi

#### Modül 05 - İleri Konular
- **Yeni Özellikler**: MCP Spesifikasyonu 2025-11-25 yeni özellikleri (Görevler, Araç Açıklamaları, URL Modu Tetiklemesi, Roots) hakkında notlar eklendi
- **Güvenlik Kaynakları**: OWASP MCP Top 10 ve Sherpa atölyesi bağlantıları ek referanslar kısmına eklendi

#### Modül 06 - Topluluk Katkıları
- **SDK Listesi**: Swift ve Rust SDK’ları eklendi; spesifikasyon bağlantısı 2025-11-25 sürümüne güncellendi
- **Spesifikasyon Referansı**: MCP Spesifikasyonu bağlantısı doğrudan spesifikasyon URL’sine güncellendi

#### Modül 07 - Erken Benimsemeden Dersler
- **Kaynak Güncellemeleri**: MCP Spesifikasyonu 2025-11-25 ve OWASP MCP Top 10 referansları eklenmiştir

#### Modül 08 - En İyi Uygulamalar
- **Spesifikasyon Sürümü**: MCP Spesifikasyonu referansı 2025-11-25 olarak güncellendi
- **Güvenlik Kaynakları**: OWASP MCP Top 10 ve Sherpa atölyesi ek referanslara eklendi

#### Modül 10 - Yapay Zeka İş Akışlarını Düzenleme
- **Rozet Güncellemesi**: MCP sürüm rozeti SDK sürümünden (1.9.3) spesifikasyon sürümüne (2025-11-25) değiştirildi
- **Kaynak Bağlantıları**: MCP Spesifikasyonu bağlantısı güncellendi; OWASP MCP Top 10 eklendi

#### Modül 11 - MCP Sunucu Uygulamalı Laboratuvarlar
- **Spesifikasyon Referansı**: MCP Spesifikasyonu bağlantısı 2025-11-25 sürümüne güncellendi
- **Güvenlik Kaynakları**: Resmi kaynaklara OWASP MCP Top 10 eklendi

## 18 Aralık 2025

### Güvenlik Dokümantasyonu Güncellemesi - MCP Spesifikasyonu 2025-11-25

#### MCP Güvenlik En İyi Uygulamaları (02-Security/mcp-best-practices.md) - Spesifikasyon Sürümü Güncellemesi
- **Protokol Sürümü Güncellemesi**: En son MCP Spesifikasyonu 2025-11-25'e (25 Kasım 2025 yayımlanmış) referanslar güncellendi
  - Tüm spesifikasyon sürüm referansları 2025-06-18'den 2025-11-25'e değiştirildi
  - Belge tarih referansları 18 Ağustos 2025'ten 18 Aralık 2025'e güncellendi
  - Tüm spesifikasyon URL'lerinin güncel dokümantasyona işaret ettiği doğrulandı
- **İçerik Doğrulaması**: Güncel standartlara karşı güvenlik en iyi uygulamalarının kapsamlı doğrulaması yapıldı
  - **Microsoft Güvenlik Çözümleri**: Prompt Shields ("Jailbreak risk tespiti" eski adıyla), Azure İçerik Güvenliği, Microsoft Entra ID ve Azure Key Vault için güncel terimler ve bağlantılar doğrulandı
  - **OAuth 2.1 Güvenliği**: En son OAuth güvenlik en iyi uygulamaları ile uyumluluk teyit edildi
  - **OWASP Standartları**: LLM'ler için OWASP Top 10 referanslarının güncel olduğu onaylandı
  - **Azure Servisleri**: Tüm Microsoft Azure dokümantasyon bağlantıları ve en iyi uygulamalar doğrulandı
- **Standart Uyum**: Kaynak gösterilen tüm güvenlik standartlarının güncel olduğu doğrulandı
  - NIST AI Risk Yönetimi Çerçevesi
  - ISO 27001:2022
  - OAuth 2.1 Güvenlik En İyi Uygulamaları
  - Azure güvenlik ve uyumluluk çerçeveleri
- **Uygulama Kaynakları**: Tüm uygulama rehberi bağlantıları ve kaynaklar doğrulandı
  - Azure API Management kimlik doğrulama düzenleri
  - Microsoft Entra ID entegrasyon rehberleri
  - Azure Key Vault gizli yönetimi
  - DevSecOps boru hatları ve izleme çözümleri

### Dokümantasyon Kalite Güvencesi
- **Spesifikasyon Uyumu**: Tüm zorunlu MCP güvenlik gereksinimlerinin (YAPILMALI/YAPILMAMALI) en son spesifikasyonla uyumu sağlandı
- **Kaynak Güncelliği**: Microsoft dokümantasyonu, güvenlik standartları ve uygulama rehberi bağlantılarının tümü doğrulandı
- **En İyi Uygulama Kapsamı**: Kimlik doğrulama, yetkilendirme, yapay zeka özel tehditleri, tedarik zinciri güvenliği ve kurumsal kalıpların kapsamlı şekilde ele alındığı onaylandı

## 6 Ekim 2025

### Başlarken Bölümü Genişlemesi – İleri Sunucu Kullanımı & Basit Kimlik Doğrulama

#### İleri Sunucu Kullanımı (03-GettingStarted/10-advanced)
- **Yeni Bölüm Eklendi**: Hem düzenli hem de düşük seviye sunucu mimarilerini kapsayan kapsamlı ileri MCP sunucu kullanımı rehberi sunuldu.
  - **Normal ve Düşük Seviyeli Sunucu Karşılaştırması**: Her iki yaklaşım için Python ve TypeScript ile detaylı karşılaştırma ve kod örnekleri.
  - **Handler Tabanlı Tasarım**: Ölçeklenebilir, esnek sunucu uygulamaları için handler tabanlı araç/kaynak/prompt yönetiminin açıklaması.
  - **Pratik Kalıplar**: Gelişmiş özellikler ve mimari için düşük seviyeli sunucu kalıplarının faydalı olduğu gerçek dünya senaryoları.

#### Basit Kimlik Doğrulama (03-GettingStarted/11-simple-auth)
- **Yeni Bölüm Eklendi**: MCP sunucularında basit kimlik doğrulamanın adım adım uygulanması rehberi.
  - **Kimlik Doğrulama Kavramları**: Kimlik doğrulama ve yetkilendirme ile kimlik bilgisi yönetiminin net açıklaması.
  - **Temel Kimlik Doğrulama Uygulaması**: Python (Starlette) ve TypeScript (Express) için middleware tabanlı kimlik doğrulama kalıpları, kod örnekleri ile.
  - **Gelişmiş Güvenliğe İlerlemesi**: Basit kimlik doğrulama ile başlayıp OAuth 2.1 ve RBAC’ye geçiş rehberliği, ileri güvenlik modüllerine referanslar.

Bu eklemeler, temel kavramlarla gelişmiş üretim kalıplarını köprüleyerek daha sağlam, güvenli ve esnek MCP sunucu uygulamaları geliştirmek için pratik, uygulamalı rehberlik sağlar.

## 29 Eylül 2025

### MCP Sunucu Veritabanı Entegrasyon Laboratuvarları - Kapsamlı Uygulamalı Öğrenme Yolu

#### 11-MCPServerHandsOnLabs - Yeni Tam Veritabanı Entegrasyon Müfredatı
- **Tam 13 Laboratuvarlık Öğrenme Yolu**: PostgreSQL veritabanı entegrasyonu ile üretime hazır MCP sunucular inşa etmek için kapsamlı uygulamalı müfredat eklendi
  - **Gerçek Dünya Uygulaması**: Kurumsal düzey kalıpları gösteren Zava Retail analitik kullanım durumu
  - **Yapılandırılmış Öğrenme İlerlemesi**:
    - **Laboratuvarlar 00-03: Temeller** - Giriş, Temel Mimari, Güvenlik & Çoklu Kiracı, Ortam Kurulumu
    - **Laboratuvarlar 04-06: MCP Sunucu İnşası** - Veritabanı Tasarımı & Şema, MCP Sunucu Uygulaması, Araç Geliştirimi  
    - **Laboratuvarlar 07-09: Gelişmiş Özellikler** - Anlamsal Arama Entegrasyonu, Test & Hata Ayıklama, VS Code Entegrasyonu
    - **Laboratuvarlar 10-12: Üretim & En İyi Uygulamalar** - Dağıtım Stratejileri, İzleme & Gözlemlenebilirlik, En İyi Uygulamalar & Optimizasyon
  - **Kurumsal Teknolojiler**: FastMCP framework, pgvector destekli PostgreSQL, Azure OpenAI gömme vektörleri, Azure Container Apps, Application Insights
  - **Gelişmiş Özellikler**: Satır Düzeyinde Güvenlik (RLS), anlamsal arama, çok kiracılı veri erişimi, vektör gömme, gerçek zamanlı izleme

#### Terminoloji Standardizasyonu - Modülden Laboratuvara Dönüşüm
- **Kapsamlı Dokümantasyon Güncellemesi**: 11-MCPServerHandsOnLabs içindeki tüm README dosyalarında “Modül” yerine sistematik olarak “Laboratuvar” terimi kullanımı
  - **Bölüm Başlıkları**: Tüm 13 laboratuvar için “Bu Modül Neleri Kapsar” başlığı “Bu Laboratuvar Neleri Kapsar” olarak güncellendi
  - **İçerik Tanımı**: “Bu modül sağlar...” ifadeleri “Bu laboratuvar sağlar...” olarak değiştirildi
  - **Öğrenme Hedefleri**: “Modülün sonunda...” ifadeleri “Laboratuvarın sonunda...” olarak güncellendi
  - **Geçiş Linkleri**: Tüm “Modül XX:” referansları “Laboratuvar XX:” olarak revize edildi
  - **Tamamlama Takibi**: “Bu modülü tamamladıktan sonra...” ifadeleri “Bu laboratuvarı tamamladıktan sonra...” olarak değiştirildi
  - **Teknik Referanslar Korundu**: Konfigürasyon dosyalarındaki Python modül referansları (örn. `"module": "mcp_server.main"`) korundu

#### Çalışma Rehberi Geliştirmesi (study_guide.md)
- **Görsel Müfredat Haritası**: Kapsamlı laboratuvar yapısı görselleştirmesi ile yeni “11. Veritabanı Entegrasyon Laboratuvarları” bölümü eklendi
- **Depo Yapısı**: On bölümden on bir ana bölüme güncellendi, 11-MCPServerHandsOnLabs ayrıntılı şekilde tanıtıldı
- **Öğrenme Yolu Yönlendirmesi**: 00-11 bölümlerini kapsayacak şekilde gezinme talimatları geliştirildi
- **Teknoloji Kapsamı**: FastMCP, PostgreSQL, Azure servisleri entegrasyon ayrıntıları eklendi
- **Öğrenme Sonuçları**: Üretime hazır sunucu geliştirme, veritabanı entegrasyon kalıpları ve kurumsal güvenlik vurgulandı

#### Ana README Yapılandırması Geliştirmesi
- **Laboratuvar Tabanlı Terminoloji**: 11-MCPServerHandsOnLabs içindeki ana README.md dosyasında tutarlı şekilde “Laboratuvar” yapısı kullanımı
- **Öğrenme Yolu Organizasyonu**: Temel kavramlardan gelişmiş uygulamaya ve üretim dağıtımına net ilerleme
- **Gerçek Dünya Odaklı**: Kurumsal düzey kalıplar ve teknolojilerle pratik, uygulamalı öğrenme vurgusu

### Dokümantasyon Kalite ve Tutarlılık İyileştirmeleri
- **Uygulamalı Öğrenme Vurgusu**: Dokümantasyon genelinde pratik, laboratuvar odaklı yaklaşım güçlendirildi
- **Kurumsal Kalıplar Odaklılık**: Üretime hazır uygulamalar ve kurumsal güvenlik hususları ön plana çıkarıldı
- **Teknoloji Entegrasyonu**: Modern Azure servisleri ve yapay zeka entegrasyon kalıpları kapsamlı şekilde ele alındı
- **Öğrenme İlerlemesi**: Temel kavramlardan üretim dağıtımına açık, yapılandırılmış yol haritası sağlandı

## 26 Eylül 2025

### Vaka Çalışmaları Geliştirmesi - GitHub MCP Registry Entegrasyonu

#### Vaka Çalışmaları (09-CaseStudy/) - Ekosistem Geliştirme Odaklı
- **README.md**: GitHub MCP Registry vaka çalışması ile büyük genişleme
  - **GitHub MCP Registry Vaka Çalışması**: Eylül 2025’te GitHub’ın MCP Registry lansmanını inceleyen kapsamlı vaka çalışması
    - **Sorun Analizi**: Dağınık MCP sunucu keşfi ve dağıtım zorluklarının ayrıntılı incelemesi
    - **Çözüm Mimarisi**: GitHub’ın merkezi registry yaklaşımı ve tek tıkla VS Code kurulumu
    - **İş Etkisi**: Geliştirici katılımı ve verimliliğinde ölçülebilir iyileştirmeler
    - **Stratejik Değer**: Modüler ajan dağıtımı ve araçlar arası birlikte çalışabilirlik vurgusu
    - **Ekosistem Gelişimi**: Ajanik entegrasyon için temel platform pozisyonu
  - **Geliştirilmiş Vaka Çalışması Yapısı**: Tüm yedi vaka çalışması güncellenerek tutarlı format ve kapsamlı açıklamalar
    - Azure AI Seyahat Ajanları: Çoklu ajan orkestrasyon vurgusu
    - Azure DevOps Entegrasyonu: İş akışı otomasyon odaklı
    - Gerçek Zamanlı Dokümantasyon Getirimi: Python konsol istemcisi uygulaması
    - Etkileşimli Çalışma Planı Oluşturucu: Chainlit konuşmalı web uygulaması
    - Editör İçi Dokümantasyon: VS Code ve GitHub Copilot entegrasyonu
    - Azure API Yönetimi: Kurumsal API entegrasyon kalıpları
    - GitHub MCP Registry: Ekosistem geliştirme ve topluluk platformu
  - **Kapsamlı Sonuç Bölümü**: Çoklu MCP uygulama boyutlarını kapsayan yedi vaka çalışması vurgusu ile yeniden yazıldı
    - Kurumsal Entegrasyon, Çoklu Ajan Orkestrasyonu, Geliştirici Verimliliği
    - Ekosistem Gelişimi, Eğitimsel Uygulamalar kategorilendirmesi
    - Mimari kalıplar, uygulama stratejileri ve en iyi uygulamalarda derinlemesine içgörüler
    - MCP’nin olgun, üretime hazır protokol olarak vurgulanması

#### Çalışma Rehberi Güncellemeleri (study_guide.md)
- **Görsel Müfredat Haritası**: Vaka Çalışmaları bölümünde GitHub MCP Registry dahil edilerek güncellendi
- **Vaka Çalışmaları Tanımı**: Genel açıklamalardan yedi kapsamlı vaka çalışmasının detaylı dökümüne yükseltildi
- **Depo Yapısı**: Bölüm 10, spesifik uygulama detayları ile kapsamlı vaka çalışması olarak güncellendi
- **Değişiklik Günlüğü Entegrasyonu**: 26 Eylül 2025 tarihiyle GitHub MCP Registry eklemesi ve vaka çalışması geliştirmeleri kaydedildi
- **Tarih Güncellemeleri**: En son revizyonu yansıtacak şekilde alt bilgi zaman damgası güncellendi (26 Eylül 2025)

### Dokümantasyon Kalite İyileştirmeleri
- **Tutarlılık Artışı**: Tüm yedi örnek için vaka çalışması formatı ve yapısı standart hale getirildi
- **Kapsamlı Kapsama**: Vaka çalışmaları artık kurumsal, geliştirici verimliliği ve ekosistem geliştirme senaryolarını kapsıyor
- **Stratejik Konumlandırma**: MCP’nin ajanik sistem dağıtımı için temel platform olarak önemi güçlendirildi
- **Kaynak Entegrasyonu**: İlave kaynaklar arasında GitHub MCP Registry bağlantısı eklendi

## 15 Eylül 2025

### İleri Konular Genişletmesi - Özel Taşıyıcılar ve Bağlam Mühendisliği

#### MCP Özel Taşıyıcılar (05-AdvancedTopics/mcp-transport/) - Yeni İleri Uygulama Kılavuzu
- **README.md**: Özel MCP taşıyıcı mekanizmalarının tam uygulama kılavuzu
  - **Azure Event Grid Taşıyıcısı**: Kapsamlı serverless olay tabanlı taşıyıcı uygulaması
    - Azure Functions entegrasyonu ile C#, TypeScript ve Python örnekleri
    - Ölçeklenebilir MCP çözümleri için olay tabanlı mimari kalıpları
    - Webhook alıcıları ve push tabanlı mesaj işleme
  - **Azure Event Hubs Taşıyıcısı**: Yüksek verimli akış taşıyıcı uygulaması
    - Düşük gecikmeli senaryolar için gerçek zamanlı akış yetenekleri
    - Bölümlendirme stratejileri ve kontrol noktası yönetimi
    - Mesaj toplu işleme ve performans optimizasyonu
  - **Kurumsal Entegrasyon Kalıpları**: Üretime hazır mimari örnekler
    - Çoklu Azure Functions arasında dağıtılmış MCP işleme
    - Birden fazla taşıyıcı tipi birleştiren hibrit taşıyıcı mimarileri
    - Mesaj dayanıklılığı, güvenilirlik ve hata yönetimi stratejileri
  - **Güvenlik & İzleme**: Azure Key Vault entegrasyonu ve gözlemlenebilirlik kalıpları
    - Yönetilen kimlik doğrulaması ve en az ayrıcalık erişimi
    - Application Insights telemetri ve performans izleme
    - Devre kesiciler ve hata toleransı kalıpları
  - **Test Çerçeveleri**: Özel taşıyıcılar için kapsamlı test stratejileri
    - Test double ve mock framework ile birim testi
    - Azure Test Containers ile entegrasyon testi
    - Performans ve yük testi değerlendirmeleri

#### Bağlam Mühendisliği (05-AdvancedTopics/mcp-contextengineering/) - Yükselen AI Disiplini
- **README.md**: Bağlam mühendisliği alanının kapsamlı keşfi
  - **Temel İlkeler**: Tam bağlam paylaşımı, eylem karar farkındalığı ve bağlam pencere yönetimi
  - **MCP Protokol Uyumlu**: MCP tasarımının bağlam mühendisliği sorunlarına çözümü
    - Bağlam pencere sınırları ve kademeli yükleme stratejileri
    - Alaka belirleme ve dinamik bağlam getirimi
    - Çok modlu bağlam işleme ve güvenlik hususları
  - **Uygulama Yaklaşımları**: Tek iş parçacıklı vs çoklu ajan mimarileri
    - Bağlam parçalaması ve önceliklendirme teknikleri
    - Kademeli bağlam yükleme ve sıkıştırma stratejileri
    - Katmanlı bağlam yaklaşımları ve getirim optimizasyonu
  - **Ölçüm Çerçevesi**: Bağlam etkinliğini değerlendiren yükselen metrikler
    - Girdi verimliliği, performans, kalite ve kullanıcı deneyimi hususları
    - Deneysel bağlam optimizasyonu yöntemleri
    - Hata analizi ve iyileştirme metodolojileri

#### Müfredat Gezinme Güncellemeleri (README.md)
- **Geliştirilmiş Modül Yapısı**: Yeni ileri konuları içerecek şekilde müfredat tablosu güncellendi
  - Bağlam Mühendisliği (5.14) ve Özel Taşıyıcı (5.15) kayıtları eklendi
  - Tüm modüller için tutarlı format ve gezinme linkleri
  - Mevcut içerik kapsamını yansıtan açıklamalar güncellendi

### Dizin Yapısı İyileştirmeleri
- **İsimlendirme Standardizasyonu**: “mcp transport” klasörü “mcp-transport” olarak yeniden adlandırıldı, diğer ileri konu klasörleriyle uyumlu
- **İçerik Organizasyonu**: Tüm 05-AdvancedTopics klasörleri standart “mcp-[konu]” isminde toplandı

### Dokümantasyon Kalite Geliştirmeleri
- **MCP Spesifikasyon Uyumlu**: Tüm yeni içerikler MCP Spesifikasyonu 2025-06-18 referanslı
- **Çok Dilli Kod Örnekleri**: C#, TypeScript ve Python’da kapsamlı kod örnekleri
- **Kurumsal Odaklı**: Üretime hazır kalıplar ve Azure bulut entegrasyonu genelinde
- **Görsel Dokümantasyon**: Mimari ve akış görselleştirmeleri için Mermaid diyagramları

## 18 Ağustos 2025

### Dokümantasyon Kapsamlı Güncelleme - MCP 2025-06-18 Standartları

#### MCP Güvenlik En İyi Uygulamaları (02-Security/) - Tam Modernizasyon
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP Spesifikasyonu 2025-06-18 ile tam yeniden yazım
  - **Zorunlu Gereksinimler**: Resmi spesifikasyondan açıkça belirtilen MUST/MUST NOT gereklilikleri ve net görsel göstergeler eklendi
  - **12 Temel Güvenlik Uygulaması**: 15 maddelik liste özelleştirilip kapsamlı güvenlik alanlarına dönüştürüldü
    - Dış kimlik sağlayıcı entegrasyonlu Token Güvenliği & Kimlik Doğrulama
    - Kriptografik gereksinimli Oturum Yönetimi & Taşıma Güvenliği
    - Microsoft Prompt Shields entegrasyonlu AI-Spesifik Tehdit Koruması
    - En az ayrıcalık ilkesiyle Erişim Kontrolü & İzinler
    - Azure Content Safety entegrasyonlu İçerik Güvenliği & İzleme
    - Kapsamlı bileşen doğrulama ile Tedarik Zinciri Güvenliği
    - PKCE uygulamalı OAuth Güvenliği & Confused Deputy Önleme
    - Otomatik kapasiteli Olay Müdahale & Kurtarma
    - Düzenleyici uyumlu Uyum & Yönetişim
    - Sıfır güven mimarili Gelişmiş Güvenlik Kontrolleri
    - Microsoft Güvenlik Ekosistemi entegrasyonu (Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security)
    - Sürekli gelişen Uyarlamalı Güvenlik
  - **Microsoft Güvenlik Çözümleri**: Prompt Shields, Azure Content Safety, Entra ID ve GitHub Advanced Security için geliştirilmiş entegrasyon rehberliği
  - **Uygulama Kaynakları**: Resmi MCP Dokümantasyonu, Microsoft Güvenlik Çözümleri, Güvenlik Standartları ve Uygulama Kılavuzları bazında kategorize edilmiş kapsamlı kaynak bağlantıları

#### Gelişmiş Güvenlik Kontrolleri (02-Security/) - Kurumsal Uygulama
- **MCP-SECURITY-CONTROLS-2025.md**: Kurumsal düzey güvenlik çerçevesi ile tam yenileme
  - **9 Kapsamlı Güvenlik Alanı**: Temel kontrollerden detaylı kurumsal çerçeveye genişletildi
    - Microsoft Entra ID entegrasyonlu Gelişmiş Kimlik Doğrulama & Yetkilendirme
    - Kapsamlı doğrulama ile Token Güvenliği & Anti-Passthrough Kontrolleri
    - Ele geçirme engellemeli Oturum Güvenlik Kontrolleri
    - Prompt injection ve araç zehirlenmesine karşı AI-Spesifik Güvenlik Kontrolleri
    - OAuth proxy güvenliği ile Confused Deputy Saldırısı Önleme
    - Sandbox ve izolasyonlu Araç Yürütme Güvenliği
    - Bağımlılık doğrulamalı Tedarik Zinciri Güvenliği Kontrolleri
    - SIEM entegrasyonlu İzleme & Tespit Kontrolleri
    - Otomatik kapasiteli Olay Müdahale & Kurtarma
  - **Uygulama Örnekleri**: Detaylı YAML yapılandırma blokları ve kod örnekleri eklendi
  - **Microsoft Çözümleri Entegrasyonu**: Azure güvenlik servisleri, GitHub Advanced Security ve kurumsal kimlik yönetimi kapsamlı şekilde anlatıldı

#### İleri Konular Güvenlik (05-AdvancedTopics/mcp-security/) - Üretime Hazır Uygulama
- **README.md**: Kurumsal güvenlik uygulaması için tam yeniden yazım
  - **Mevcut Spesifikasyon Uyumu**: MCP Spesifikasyonu 2025-06-18 baz alınarak güncellendi, zorunlu güvenlik gereksinimleri vurgulandı
  - **Gelişmiş Kimlik Doğrulama**: Microsoft Entra ID entegrasyonu, kapsamlı .NET ve Java Spring Security örnekleri
  - **AI Güvenliği Entegrasyonu**: Microsoft Prompt Shields ve Azure Content Safety uygulaması, detaylı Python örnekleriyle
  - **Gelişmiş Tehdit Hafifletmesi**: 
    - PKCE ve kullanıcı onayı doğrulaması ile Confused Deputy Saldırısı Önleme
    - Audience doğrulama ve güvenli token yönetimi ile Token Passthrough Önleme
    - Oturum Kaçırma Önleme: Kriptografik bağlama ve davranış analizi ile
  - **Kurumsal Güvenlik Entegrasyonu**: Azure Application Insights izlemesi, tehdit tespiti boru hatları ve tedarik zinciri güvenliği
  - **Uygulama Kontrol Listesi**: Microsoft güvenlik ekosistemi faydaları ile zorunlu ve önerilen güvenlik kontrollerinin net ayrımı

### Belgeleme Kalitesi ve Standartlarla Uyum
- **Spesifikasyon Referansları**: Tüm referanslar güncellenerek mevcut MCP Spesifikasyonu 2025-06-18'e göre yenilendi
- **Microsoft Güvenlik Ekosistemi**: Tüm güvenlik belgelerinde entegrasyon rehberliği geliştirildi
- **Pratik Uygulama**: Kurumsal desenlerle .NET, Java ve Python dillerinde detaylı kod örnekleri eklendi
- **Kaynak Organizasyonu**: Resmi belgeler, güvenlik standartları ve uygulama kılavuzlarının kapsamlı sınıflandırılması
- **Görsel Göstergeler**: Zorunlu gereksinimler ve önerilen uygulamalar net biçimde işaretlendi


#### Temel Kavramlar (01-CoreConcepts/) - Tam Modernizasyon
- **Protokol Sürüm Güncellemesi**: Mevcut MCP Spesifikasyonu 2025-06-18 referans alınarak tarih bazlı sürümleme (YYYY-AA-GG formatı) ile güncellendi
- **Mimari İyileştirmeleri**: Hostlar, İstemciler ve Sunucuların mevcut MCP mimari desenlerine uygun tanımları geliştirildi
  - Hostlar artık birden çok MCP istemci bağlantısını koordine eden AI uygulamaları olarak açıklandı
  - İstemciler birden bire sunucu ilişkilerini sürdüren protokol bağlayıcıları olarak tanımlandı
  - Sunucular yerel ve uzak dağıtım senaryoları ile zenginleştirildi
- **Primitive Yeniden Yapılandırması**: Sunucu ve istemci primitive yapılarında kapsamlı yenileme
  - Sunucu Primitifleri: Kaynaklar (veri kaynakları), İstemler (şablonlar), Araçlar (çalıştırılabilir fonksiyonlar) detaylı açıklamalar ve örneklerle
  - İstemci Primitifleri: Örnekleme (LLM tamamlama), Elicitation (kullanıcı girişi), Kayıt Tutma (hata ayıklama/izleme)
  - Güncel keşif (`*/list`), alma (`*/get`) ve çağrı (`*/call`) yöntem kalıpları ile yenilendi
- **Protokol Mimarisi**: İki katmanlı mimari modeli tanıtıldı
  - Veri Katmanı: JSON-RPC 2.0 temelli, yaşam döngüsü yönetimi ve primitiflerle
  - Taşıma Katmanı: STDIO (yerel) ve SSE ile Streamable HTTP (uzak) taşıma mekanizmaları
- **Güvenlik Çerçevesi**: Açık kullanıcı onayı, veri gizliliği koruması, araç çalıştırma güvenliği ve taşıma katmanı güvenliği dahil kapsamlı güvenlik ilkeleri
- **İletişim Desenleri**: Başlatma, keşif, yürütme ve bildirim akışlarını gösteren protokol mesajları güncellendi
- **Kod Örnekleri**: Mevcut MCP SDK desenlerini yansıtacak şekilde çok dilli örnekler (.NET, Java, Python, JavaScript) yenilendi

#### Güvenlik (02-Security/) - Kapsamlı Güvenlik Yenilemesi  
- **Standartlarla Uyum**: MCP Spesifikasyonu 2025-06-18 güvenlik gereksinimleri ile tam uyum sağlandı
- **Kimlik Doğrulama Evrimi**: Özel OAuth sunucularından dış kimlik sağlayıcı delege (Microsoft Entra ID) evrimi dokümante edildi
- **AI’ye Özgü Tehdit Analizi**: Modern yapay zeka saldırı vektörleri kapsamı geliştirildi
  - Gerçek dünyadan detaylı istem enjeksiyonu saldırı senaryoları
  - Araç zehirleme mekanizmaları ve "halı çekme" saldırı kalıpları
  - Bağlam penceresi zehirlenmesi ve model karıştırma saldırıları
- **Microsoft AI Güvenlik Çözümleri**: Microsoft güvenlik ekosistemi kapsamlı işlendi
  - Gelişmiş tespit, öne çıkarma ve ayırıcı teknikler içeren AI İstem Kalkanları
  - Azure İçerik Güvenliği entegrasyon desenleri
  - Tedarik zinciri koruması için GitHub İleri Düzey Güvenlik
- **Gelişmiş Tehdit Azaltma**: Detaylı güvenlik kontrolleri
  - MCP’ye özgü oturum kaçırma saldırı senaryoları ve kriptografik oturum ID gereksinimleri
  - MCP proxy senaryolarında karışmış vekil sorunları, açık onay gereksinimleriyle
  - Zorunlu doğrulama kontrollerine sahip belirteç geçiş açıkları
- **Tedarik Zinciri Güvenliği**: Temel modeller, embedding servisleri, bağlam sağlayıcılar ve üçüncü taraf API’ler dahil AI tedarik zinciri kapsamı genişletildi
- **Temel Güvenlik**: Kurumsal güvenlik desenleri ile entegrasyon geliştirildi, sıfır güven mimarisi ve Microsoft güvenlik ekosistemi vurgulandı
- **Kaynak Organizasyonu**: Kaynak bağlantıları tür bazında (Resmi Dokümanlar, Standartlar, Araştırma, Microsoft Çözümleri, Uygulama Rehberleri) kategorize edildi

### Dokümantasyon Kalite İyileştirmeleri
- **Yapılandırılmış Öğrenme Hedefleri**: Spesifik, uygulanabilir sonuçlarla öğrenme hedefleri geliştirildi 
- **Çapraz Referanslar**: İlgili güvenlik ve temel kavram konuları arasında bağlantılar eklendi
- **Güncel Bilgiler**: Tüm tarih referansları ve spesifikasyon bağlantıları güncel standartlara göre yenilendi
- **Uygulama Rehberliği**: Her iki bölümde de spesifik, uygulanabilir uygulama kılavuzları eklendi

## 16 Temmuz 2025

### README ve Navigasyon İyileştirmeleri
- README.md içinde müfredat navigasyonu tamamen yeniden tasarlandı
- `<details>` etiketleri daha erişilebilir tablo tabanlı biçimle değiştirildi
- Yeni "alternative_layouts" klasöründe alternatif düzen seçenekleri oluşturuldu
- Kart tabanlı, sekmeli ve akordeon stili navigasyon örnekleri eklendi
- Depo yapısı bölümü tüm en son dosyaları kapsayacak şekilde güncellendi
- "Bu Müfredat Nasıl Kullanılır" bölümü net önerilerle iyileştirildi
- MCP spesifikasyon bağlantıları doğru URL’lere güncellendi
- Müfredat yapısına Bağlam Mühendisliği bölümü (5.14) eklendi

### Çalışma Rehberi Güncellemeleri
- Çalışma rehberi mevcut depo yapısına uygun hâle tamamen revize edildi
- MCP İstemcileri ve Araçları, Popüler MCP Sunucuları için yeni bölümler eklendi
- Görsel Müfredat Haritası tüm konuları doğru şekilde yansıtacak biçimde güncellendi
- İleri Düzey Konular açıklaması tüm uzmanlaşmış alanları kapsayacak şekilde iyileştirildi
- Vaka Çalışmaları bölümü gerçek örnekleri yansıtacak biçimde güncellendi
- Bu kapsamlı değişiklik günlüğü eklendi

### Topluluk Katkıları (06-CommunityContributions/)
- Görüntü oluşturma için MCP sunucuları hakkında ayrıntılı bilgi eklendi
- VSCode’da Claude kullanımı için kapsamlı bölüm eklendi
- Cline terminal istemcisi kurulum ve kullanım talimatları eklendi
- MCP istemci bölümü tüm popüler istemci seçenekleri ile güncellendi
- Katkı örnekleri daha doğru kod örnekleriyle geliştirildi

### İleri Düzey Konular (05-AdvancedTopics/)
- Tüm uzmanlık konu klasörleri tutarlı isimlendirme ile organize edildi
- Bağlam mühendisliği materyalleri ve örnekler eklendi
- Foundry ajan entegrasyon dokümantasyonu eklendi
- Entra ID güvenlik entegrasyon dokümantasyonu geliştirildi

## 11 Haziran 2025

### İlk Oluşturma
- MCP for Beginners müfredatının ilk sürümü yayımlandı
- 10 ana bölümün temel yapısı oluşturuldu
- Navigasyon için Görsel Müfredat Haritası uygulandı
- Birden fazla programlama dilinde ilk örnek projeler eklendi

### Başlarken (03-GettingStarted/)
- İlk sunucu uygulama örnekleri oluşturuldu
- İstemci geliştirme rehberliği eklendi
- LLM istemci entegrasyonu talimatları dahil edildi
- VS Code entegrasyon dokümantasyonu eklendi
- Sunucu Gönderilen Olaylar (SSE) sunucu örnekleri uygulandı

### Temel Kavramlar (01-CoreConcepts/)
- İstemci-sunucu mimarisi detaylı açıklaması eklendi
- Ana protokol bileşenleri dokümante edildi
- MCP mesajlaşma desenleri açıklandı

## 23 Mayıs 2025

### Depo Yapısı
- Temel klasör yapısı ile depo başlatıldı
- Her ana bölüm için README dosyaları oluşturuldu
- Çeviri alt yapısı kuruldu
- Görsel varlıklar ve diyagramlar eklendi

### Dokümantasyon
- Müfredat genel bakışını içeren ilk README.md oluşturuldu
- CODE_OF_CONDUCT.md ve SECURITY.md eklendi
- Yardım alma rehberi olarak SUPPORT.md oluşturuldu
- Ön çalışma rehberi yapısı tasarlandı

## 15 Nisan 2025

### Planlama ve Çerçeve
- MCP for Beginners müfredatı için ilk planlama yapıldı
- Öğrenme hedefleri ve hedef kitle tanımlandı
- Müfredatın 10 bölümlük yapısı ana hatlarıyla belirtildi
- Örnekler ve vaka çalışmaları için kavramsal çerçeve geliştirildi
- Ana kavramlar için ilk prototip örnekler oluşturuldu

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->