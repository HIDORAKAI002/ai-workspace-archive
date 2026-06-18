# Değişiklik Günlüğü: Yeni Başlayanlar için MCP Müfredatı

Bu doküman, Model Context Protocol (MCP) for Beginners müfredatında yapılan tüm önemli değişikliklerin kaydı olarak hizmet vermektedir. Değişiklikler ters kronolojik sırayla (en yeni değişiklikler önce) belgelenmiştir.

## 16 Haziran 2026

### MCP Spesifikasyon Uyumu ve Örnek Doğrulama

Müfredat, mevcut **MCP Specification 2025-11-25** ve en son resmi SDK'lar temel alınarak doğrulandı, kalan eski spesifikasyon referansları düzeltildi ve temel örneklerin hâlâ derlenip çalıştığı teyit edildi.

#### Spesifikasyon Sürüm Düzeltmeleri (2025-06-18 / 2025-03-26 → 2025-11-25)

İngilizce içerikte halen eski bir spesifikasyon revizyonunun *mevcut/en yeni* standart olduğu iddia edilen yerler güncellendi ve bağlantılar canonical `modelcontextprotocol.io` spesifikasyon yollarına yönlendirildi:
- **05-AdvancedTopics/mcp-security/README.md**: "Mevcut Standart" banner’ı, giriş, temel güvenlik ilkeleri başlığı, zorunlu gereksinimler başlığı, Microsoft Entra ID bölümü, Referanslar & Kaynaklar bağlantıları ve kapanış güvenlik bildirimi (8 referans) 2025-11-25 olarak güncellendi
- **05-AdvancedTopics/mcp-transport/README.md**: Ek Kaynaklar spesifikasyon bağlantısı ve "Mevcut Standart" banner’ı 2025-11-25 olarak güncellendi
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Güncel olmayan `2025-03-26` security-and-trust bağlantısı, güncel 2025-11-25 güvenlik en iyi uygulamaları sayfasıyla değiştirildi
- **03-GettingStarted/14-sampling/README.md**: Resmi örnekleme dokümanlarının bağlantısı 2025-11-25 olarak güncellendi
- **03-GettingStarted/05-stdio-server/README.md**: Şimdiki zamanlı "mevcut MCP spesifikasyonu" referansı ve Ek Kaynaklar spesifikasyon bağlantısı 2025-11-25 olarak güncellendi (tarihsel SSE-kullanımdan kaldırma notları doğruluk için korunmuştur)

#### Mevcut SDK’lara Karşı Örnek Doğrulaması

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ile `@modelcontextprotocol/sdk@1.29.0` çözüldü; `tsc --noEmit` herhangi bir tür hatası olmadan geçti — mevcut `McpServer`/`StdioServerTransport` API'leri geçerliliğini koruyor
- **Python (03-GettingStarted/01-first-server/solution/python)**: İzole bir `.venv` içinde `mcp[cli]` (1.27.2) ile doğrulandı; `py_compile` başarılı oldu ve `FastMCP.list_tools()` doğru şekilde `add` ve `subtract` araçlarını döndürdü
- Tüm `@modelcontextprotocol/sdk` sürüm aralıklarının (`>=1.26.0` / `^1.26.0` / `^1.27.0`) mevcut `1.29.0`'a sorunsuz bir şekilde çözüldüğü ve kırıcı API değişiklikleri olmadığı teyit edildi

#### Bağımlılık Sürüm Uyumunun Sağlanması (sürüm boşluklarının kapatılması)

Eski SDK pinleri yükseltildi, böylece her örnek mevcut MCP sürümünü takip ediyor ve depo genelindeki konvansiyon ile uyumlu hale geldi:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` `^1.8.0` → `>=1.26.0` olarak yükseltildi ve eski `"updated for MCP 2025-06-18"` paket açıklaması `"aligned with MCP Specification 2025-11-25"` olarak güncellendi
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ve **lab4/code/github_mcp_server/pyproject.toml**: Kesin `mcp==1.23.0` pimi `mcp>=1.26.0` olarak yükseltildi; her iki `uv.lock` dosyası (`uv lock`) yeniden oluşturuldu, böylece kilit dosyaları mevcut `mcp 1.27.2` sürümüne çözülüyor ve manifestlerle uyumlu kalıyor

#### Müfredat Boşluk Analizi — En Son Spesifikasyon Özellik Kapsamı

Müfredatın MCP 2025-11-25 ile tanıtılan/genişletilen tüm ilkelere zaten sahip olduğu doğrulandı, böylece içerik boşluğu kalmadı:
- **Örnekleme**: 03-GettingStarted/14-sampling artı 05-AdvancedTopics/mcp-sampling
- **Elicitation (URL modu dahil)**: 01-CoreConcepts ve 05-AdvancedTopics/mcp-protocol-features içinde belgelenmiş
- **Kökler**: 00-Introduction, 01-CoreConcepts ve 05-AdvancedTopics/mcp-root-contexts içinde belgelenmiş
- **Görevler (deneysel, uzun süreli işlemler)**: 01-CoreConcepts ve 05-AdvancedTopics/mcp-protocol-features içinde belgelenmiş
- **Araç Açıklamaları** (`readOnlyHint` / `destructiveHint`): 01-CoreConcepts ve 05-AdvancedTopics/mcp-protocol-features içinde belgelenmiş

### Güvenlik Sertleştirmesi ve Bağımlılık Güvenlik Açıklarının Çözümü

Her bağımlılık manifestosu ve örnek kaynak kodu üzerinden tam bir güvenlik taraması yapıldı, sonra bildirilen tüm npm uyarıları ve bir kod seviyesi bulgusu giderildi. Giderimden sonra `npm audit` tüm denetlenen dizinlerde **0 güvenlik açığı** raporladı.

#### npm Bağımlılık Güvenlik Açıkları (dolaylı) — Düzeltildi

Tüm 15 gönderilmiş `package-lock.json` dosyası denetlendi. Açıklar MCP Inspector geliştirici aracı, OpenAI istemcisi ve MCP SDK’nın dolaylı bağımlılıklarında sınırlıydı; hepsi şimdi örnekleri bozmayacak şekilde çözüldü:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ve **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` `0.16.6` / `0.14.1` → `0.22.0` olarak yükseltildi, bu sayede paketlenmiş `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ve `ws` uyarıları kaldırıldı. Kalan kritik uyarısı olan `concurrently` için yamalı `shell-quote@1.8.4` zorlayan npm `overrides` girdisi eklendi; her iki kilit dosyası yeniden oluşturuldu (artık 0 açık)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ile dolaylı `qs` (orta seviye) yamalı sürüme güncellendi
- **03-GettingStarted/samples/javascript**: `npm audit fix` ile dolaylı `hono` (orta seviye) yamalı sürüme güncellendi
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ile dolaylı `form-data` (yüksek) yamalı sürüme güncellendi
- **03-GettingStarted/11-simple-auth/solution/typescript**: Projenin tekrarlanabilir ve denetlenebilir olması için eksik olan `package-lock.json` oluşturuldu (0 açık)

#### Kod Seviyesi Güvenlik Düzeltmesi (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `open_in_vscode` aracından `shell=True` kaldırıldı. Önceki `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` komutu, klasör yolundaki kabuk metakarakterlerinin `cmd.exe` tarafından yorumlanmasına izin veriyordu (komut enjeksiyon vektörü). Artık kabuk olmadan klasör argümanı ile doğrudan çözümlenen `Code.exe` başlatılıyor — işlevsel olarak eşdeğer ve güvenli

#### Python Bağımlılık Denetimi

- Tüm Python gereksinim setleri `pip-audit` ile denetlendi. `05-AdvancedTopics` ve `03-GettingStarted/samples/python` **bilinen açık bildirmedi** (`mcp` / `httpx` / `pydantic` / `python-dotenv` aralıkları güncel yamalı sürümlere çözülüyor)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` dolaylı bağımlılık olarak **`werkzeug` 3.1.1** için üç `safe_join` Windows aygıt-adı DoS uyarısı bildirdi — `CVE-2025-66221`, `CVE-2026-21860` ve `CVE-2026-27199` (hepsi 3.1.6’da düzeltildi). Güvenlik pimi olarak explicit `werkzeug>=3.1.6` eklendi, böylece yamalı sürüm çözülüyor; kısıtlamanın `chainlit` / `mcp` / `semantic-kernel` yığınıyla sorunsuz çözümü doğrulandı

### Ürün İsmi Yeniden Markalaşması

Müfredattaki tüm içerikler Microsoft’un ürün yeniden markalaşmasına göre güncellendi:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord topluluk bağlantısı güncellendi
- **AGENTS.md**: Discord sunucu referansı güncellendi
- **README.md**: Teknoloji ekosistemi referansları güncellendi
- **study_guide.md**: Vaka çalışması referansları güncellendi
- **05-AdvancedTopics/README.md**: Modül 5.13 başlık ve açıklaması güncellendi
- **05-AdvancedTopics/mcp-integration/README.md**: Bölüm başlığı ve açıklaması güncellendi
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Modül başlığı ve içerik tamamen güncellendi
- **05-AdvancedTopics/mcp-security-entra/README.md**: Çapraz referans bağlantısı güncellendi
- **07-LessonsfromEarlyAdoption/README.md**: Vaka çalışması referansları güncellendi
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Bölüm 9 başlığı, rozetler ve yetenekler güncellendi
- **08-BestPractices/README.md**: Discord topluluk bağlantısı güncellendi
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord kanal referansı güncellendi
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Model dağıtımı referansı güncellendi
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI Servisleri tablosu güncellendi
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Kaynak referansları güncellendi

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Ana müfredat referansları güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Modül başlığı, genel bakış ve tüm modül başlıkları güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Başlık, öğrenme hedefleri, kurulum talimatları ve kaynaklar güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Başlık, öğrenme hedefleri, MCP hostlar tablosu ve çapraz referanslar güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Başlık, rozetler, önkoşullar ve kaynaklar güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Agent Builder referansları ve geri bildirim bağlantısı güncellendi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Önkoşullar ve eklenti referansları güncellendi

---

## 11 Nisan 2026

### Yeni Ders, Belge Düzeltmeleri ve Bağımlılık Güncellemeleri

#### Yeni Müfredat İçeriği Eklendi

**Modül 05 - İleri Konular**
- **Ders 5.17: MCP ile Rekabetçi Çoklu-Ajan Muhakemesi** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Çoklu ajan sistemleri için rekabetçi tartışma desenini kapsayan kapsamlı yeni rehber
  - Mermaid mimari diyagramı: iki ajan → ortak MCP sunucusu → tartışma dökümü → hakem → karar
  - Paylaşılan MCP araç sunucusu (`web_search` + `run_python`) Python ve TypeScript ile uygulandı
  - Zıt sistem istemleri (LEHTARINDA / ALEYHİNDE / Hakem) açık araç kullanımı gereklilikleriyle
  - Tur yönetici tartışma düzenleyicisi Python, TypeScript ve C# içinde; argümanları yönlendiriyor
  - MCP `ClientSession` ile düzenleyicinin gerçek araç çağrılarına bağlanması
  - Kullanım durumu tablosu (halüsinasyon tespiti, tehdit modelleme, API tasarım incelemesi, gerçek doğrulaması, teknoloji seçimi)
  - Güvenlik hususları: sandbox'lı çalıştırma, araç çağrısı doğrulama, hız limitleme, denetim kaydı
  - Üç pratik senaryolu yapılandırılmış egzersiz (kod inceleme, mimari karar, içerik denetimi)

#### Belge Düzeltmeleri

**Modül 03 - Başlarken**
- **05-stdio-server/README.md**: Eksik TypeScript stdio sunucu örneği düzeltildi — eksik taşıyıcı oluşumu (`new StdioServerTransport()`) ve `server.connect(transport)` çağrısı Python ve .NET örnekleri ile uyumlu hale getirildi
- **14-sampling/README.md**: Yazım hatası düzeltildi — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Müfredat Güncellemeleri

**Ana README.md**
- Ders 5.17 (MCP ile Rekabetçi Çoklu-Ajan Muhakemesi) doğrudan yeni derse bağlantılı olarak müfredat tablosuna eklendi

**05-AdvancedTopics/README.md**
- Ders 5.17 satırı dersler tablosuna eklendi

**study_guide.md**
- Rekabetçi Çoklu-Ajan Muhakemesi konusu Zengin Konuların zihin haritası ve metin açıklamasına eklendi

#### Kod ve Güvenlik Düzeltmeleri

**Modül 05 - Rekabetçi Ajanlar (`mcp-adversarial-agents`)**
- **Güvenlik düzeltmesi — komut enjeksiyonu**: TypeScript `run_python` aracında `execSync` kabuk enterpolasyonu, komut enjeksiyonu yüzey alanını ortadan kaldırmak için `execFile` + `promisify` ile değiştirildi (LLM kontrollü kod artık kabuk olmaksızın literal argv öğesi olarak geçiyor)
- **MCP araç döngüsü tesisatı**: Python tartışma düzenleyicisi, engelleyen senkron `Anthropic` yerine `AsyncAnthropic` istemcisini kullanacak şekilde güncellendi, her ajanın turuna doğrudan canlı bir `ClientSession` geçirildi, her turda araç tanımları `session.list_tools()` ile alındı ve model son bir metin yanıtı verene kadar döngü içinde `tool_use` blokları `session.call_tool()` ile yönlendirildi

#### Bağımlılık Güncellemeleri

- `hono` birçok pakette (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows) 4.12.12 sürümüne yükseltildi
- TypeScript paketlerinde `@hono/node-server` 1.19.11'dan 1.19.13'e yükseltildi
- Python paketlerinde (10-StreamliningAIWorkflows laboratuvarlar 3 ve 4) `cryptography` 46.0.5'ten 46.0.7'ye yükseltildi
- 10-StreamliningAIWorkflows muayenecide `lodash` 4.17.23'ten 4.18.1'e yükseltildi

#### Çeviriler

- 48+ dil için çeviriler en son kaynak değişiklikleriyle senkronize edildi (i18n güncellemesi)

---

## 5 Şubat 2026

### Depo Genelinde Doğrulama ve Navigasyon İyileştirmeleri

#### Yeni Müfredat İçeriği Eklendi

**Modül 03 - Başlarken**
- **12-mcp-hosts/README.md**: MCP barındırıcılarının kurulumu için yeni kapsamlı kılavuz
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf yapılandırma örnekleri
  - Tüm ana barındırıcılar için JSON yapılandırma şablonları
  - Taşıma türleri karşılaştırma tablosu (stdio, SSE/HTTP, WebSocket)
  - Yaygın bağlantı sorunları giderme
  - Barındırıcı yapılandırması için güvenlik en iyi uygulamaları

- **13-mcp-inspector/README.md**: MCP Inspector için yeni hata ayıklama kılavuzu
  - Kurulum yöntemleri (npx, npm global, kaynaktan)
  - Sunuculara stdio ve HTTP/SSE ile bağlanma
  - Araçlar, kaynaklar ve istemler iş akışlarını test etme
  - MCP Inspector ile VS Code entegrasyonu
  - Yaygın hata ayıklama senaryoları ve çözümleri

**Modül 04 - Pratik Uygulama**
- **pagination/README.md**: Yeni sayfalama uygulama kılavuzu
  - Python, TypeScript, Java'da imleç tabanlı sayfalama desenleri
  - İstemci tarafı sayfalama yönetimi
  - İmleç tasarım stratejileri (opak vs. yapılandırılmış)
  - Performans optimizasyon önerileri

**Modül 05 - Gelişmiş Konular**
- **mcp-protocol-features/README.md**: Yeni protokol özellikleri derinlemesine inceleme
  - İlerleme bildirimleri uygulaması
  - İstek iptal desenleri
  - URI desenli kaynak şablonları
  - Sunucu yaşam döngüsü yönetimi
  - Günlük seviyesi kontrolü
  - JSON-RPC kodlarıyla hata işleme desenleri

#### Navigasyon Düzeltmeleri (24+ dosya güncellendi)

**Ana Modül README'leri**
 Artık hem ilk derse hem de sonraki modüle bağlantı veriyor

**02-Security Alt Dosyaları**
- Tüm 5 ek güvenlik belgesi artık "Sonraki Ne?" navigasyonuna sahip:

**09-CaseStudy Dosyaları**
- Tüm vaka çalışması dosyalarında sıra ile gezinti eklendi:

**10-StreamliningAI Laboratuvarları**
Modül 10 genel görünüm ve Modül 11'e Sonraki Ne bölümü eklendi

#### Kod ve İçerik Düzeltmeleri

**SDK ve Bağımlılık Güncellemeleri**
Boş openai sürümünü `^4.95.0` olarak düzeltti
SDK'yı `^1.8.0`'den `>=1.26.0`'a güncelledi
mcp sürüm pinlerini `>=1.26.0` olarak güncelledi

**Kod Düzeltmeleri**
Geçersiz model `gpt-4o-mini`'yi `gpt-4.1-mini` olarak düzeltti

**İçerik Düzeltmeleri**
Kırık bağlantıyı `READMEmd` → `README.md` olarak düzeltti, müfredat başlığını `Module 1-3` → `Module 0-3` olarak düzeltti, büyük/küçük harf duyarlı yolu düzeltti
Bozuk çoğaltılmış Vaka Çalışması 5 içeriği kaldırıldı

**Yeni Başlayanlar İçin Yol Gösterici İyileştirmeleri**
Başlangıç için uygun giriş, öğrenme hedefleri ve ön koşullar eklendi

#### Müfredat Güncellemeleri

**Ana README.md**
- Müfredat tablosuna 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Sayfalama), 5.16 (Protokol Özellikleri) girişleri eklendi

**Modül README'leri**
Ders listesine 12 ve 13 dersleri eklendi
Pratik Kılavuzlar bölümüne sayfalama bağlantısı eklendi
5.15 (Özel Taşıma) ve 5.16 (Protokol Özellikleri) dersleri eklendi

**study_guide.md**
- Yeni tüm konuları içeren zihin haritası güncellendi: MCP Barındırıcı Kurulumu, MCP Inspector, Sayfalama Stratejileri, Protokol Özellikleri Derinlemesine

## 28 Ocak 2026

### MCP Spesifikasyonu 2025-11-25 Uyumluluk İncelemesi

#### Temel Kavramlar Geliştirmesi (01-CoreConcepts/)
- **Yeni İstemci Primitifi - Roots**: Dosya sistemi sınırlarını ve erişim izinlerini anlamak için kök istemci primitifiyle ilgili kapsamlı dokümantasyon eklendi
- **Araç Açıklamaları**: Araç yürütme kararları için araç davranış açıklamaları (`readOnlyHint`, `destructiveHint`) hakkında dokümantasyon eklendi
- **Örneklemde Araç Çağrısı**: Örnekleme belgeleri, model odaklı araç çağrısı için `tools` ve `toolChoice` parametrelerini içerecek şekilde güncellendi
- **URL Modu Tetikleme**: Sunucu kaynaklı dış web etkileşimleri için URL tabanlı tetikleme hakkında dokümantasyon eklendi
- **Görevler (Deneysel)**: Dayanıklı yürütme sarmalayıcıları ve ertelenmiş sonuç alma için deneysel Görevler özelliği yeni bölüm olarak eklendi
- **Simge Desteği**: Artık araçlar, kaynaklar, kaynak şablonları ve istemler simgeleri ilave meta veri olarak destekliyor

#### Dokümantasyon Güncellemeleri
- **README.md**: MCP Spesifikasyonu 2025-11-25 sürümü ve tarihe dayalı sürümleme açıklaması eklendi
- **study_guide.md**: Temel Kavramlar bölümüne Görevler ve Araç Açıklamaları eklendi; belge zaman damgası güncellendi

#### Spesifikasyon Uyumluluk Doğrulaması
- **Protokol Sürümü**: Tüm dokümantasyonun mevcut MCP Spesifikasyonu 2025-11-25'i referans verdiği doğrulandı
- **Mimari Uyum**: İki katmanlı mimari (Veri Katmanı + Taşıma Katmanı) dokümantasyon doğruluğu onaylandı
- **Primitifler Dokümantasyonu**: Sunucu primitifleri (Kaynaklar, İstemler, Araçlar) ve istemci primitifi (Örnekleme, Tetikleme, Günlükleme, Roots) doğrulandı
- **Taşıma Mekanizmaları**: STDIO ve Akışlı HTTP taşıma dokümantasyonu doğruluğu teyit edildi
- **Güvenlik Kılavuzu**: Güncel MCP Güvenlik En İyi Uygulamaları dokümantasyonuyla uyumluluk onaylandı

#### Başlıca MCP 2025-11-25 Özellikleri Dokümante Edildi
- **OpenID Connect Keşfi**: Yetkilendirme sunucusu keşfi için OIDC
- **OAuth İstemci Kimlik Meta Belgeleri**: İstemci kayıt mekanizması önerisi
- **JSON Şema 2020-12**: MCP şema tanımları için varsayılan lehçe
- **SDK Katmanlama Sistemi**: SDK özellik desteği ve bakımı için resmileştirilmiş gereksinimler
- **Yönetim Yapısı**: MCP yönetiminde Çalışma Grupları ve İlgi Gruplarının resmileştirilmesi

### Güvenlik Dokümantasyonu Büyük Güncelleme (02-Security/)

#### MCP Güvenlik Zirvesi Atölyesi (Sherpa) Entegrasyonu
- **Yeni Uygulamalı Eğitim Kaynağı**: MCP Güvenlik Zirvesi Atölyesi (Sherpa) [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ile güvenlik dokümantasyonunun tümüne kapsamlı entegrasyon eklendi
- **Sefer Yolu Kapsamı**: Temel kamp ile zirve arasındaki tam kamp kamp ilerlemesi dokümante edildi
- **OWASP Uyum**: Tüm güvenlik rehberliği şimdi OWASP MCP Azure Güvenlik Kılavuzu risklerine karşılık geliyor

#### OWASP MCP En Çok Riskli 10 Entegrasyonu
- **Yeni Bölüm**: Ana Güvenlik README'sine OWASP MCP En Çok Riskli 10 Güvenlik Riskleri tablosu ve Azure yumuşatmaları eklendi
- **Risk Tabanlı Dokümantasyon**: mcp-security-controls-2025.md dosyasına her güvenlik alanı için OWASP MCP risk referansları eklendi
- **Referans Mimari**: OWASP MCP Azure Güvenlik Kılavuzu referans mimarisi ve uygulama desenlerine bağlantılar eklendi

#### Güncellenen Güvenlik Dosyaları
- **README.md**: Sherpa Atölyesi genel görünümü, sefer yolu tablosu, OWASP MCP En Çok Riskli 10 risk özeti ve uygulamalı eğitim bölümü eklendi
- **mcp-security-controls-2025.md**: Başlık Şubat 2026 olarak güncellendi, OWASP risk referansları (MCP01-MCP08) eklendi, spesifikasyon sürüm tutarsızlığı düzeltildi
- **mcp-security-best-practices-2025.md**: Sherpa ve OWASP kaynakları bölümü eklendi, zaman damgası güncellendi
- **mcp-best-practices.md**: Uygulamalı eğitim bölümü Sherpa ve OWASP bağlantıları ile eklendi
- **azure-content-safety-implementation.md**: OWASP MCP06 referansı, Sherpa Kamp 3 uyumu ve ek kaynaklar bölümü eklendi

#### Yeni Kaynak Bağlantıları Eklendi
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Bireysel OWASP MCP risk sayfaları (MCP01-MCP10)

### Müfredat Genelinde MCP Spesifikasyonu 2025-11-25 Uyumu

#### Modül 03 - Başlarken
- **SDK Dokümantasyonu**: Go SDK resmi SDK listesine eklendi; tüm SDK referansları MCP Spesifikasyonu 2025-11-25 ile uyumlu olarak güncellendi
- **Taşıma Açıklaması**: STDIO ve HTTP Akış taşıma tanımlamaları açık spesifikasyon referanslarıyla güncellendi

#### Modül 04 - Pratik Uygulama
- **SDK Güncellemeleri**: Go SDK eklendi; SDK listesi spesifikasyon sürüm referansıyla güncellendi
- **Yetkilendirme Spesifikasyonu**: MCP Yetkilendirme spesifikasyonu bağlantısı güncel 2025-11-25 sürümüne ayarlandı

#### Modül 05 - Gelişmiş Konular
- **Yeni Özellikler**: MCP Spesifikasyonu 2025-11-25 özellikleri (Görevler, Araç Açıklamaları, URL Modu Tetikleme, Roots) hakkında not eklendi
- **Güvenlik Kaynakları**: OWASP MCP Top 10 ve Sherpa atölyesi bağlantıları ek referanslara eklendi

#### Modül 06 - Topluluk Katkıları
- **SDK Listesi**: Swift ve Rust SDK'ları eklendi; spesifikasyon bağlantısı 2025-11-25 sürümüne göre güncellendi
- **Spesifikasyon Referansı**: MCP Spesifikasyonu bağlantısı doğrudan spesifikasyon URL’si ile güncellendi

#### Modül 07 - Erken Benimsemeden Dersler
- **Kaynak Güncellemeleri**: MCP Spesifikasyonu 2025-11-25 bağlantısı ve OWASP MCP Top 10 ek referanslar olarak eklendi

#### Modül 08 - En İyi Uygulamalar
- **Spesifikasyon Sürümü**: MCP Spesifikasyonu 2025-11-25 referansı güncellendi
- **Güvenlik Kaynakları**: OWASP MCP Top 10 ve Sherpa atölyesi ek referanslara eklendi

#### Modül 10 - Yapay Zeka İş Akışlarının Kolaylaştırılması
- **Rozet Güncellemesi**: MCP sürüm rozeti SDK sürümünden (1.9.3) spesifikasyon sürümüne (2025-11-25) değiştirildi
- **Kaynak Bağlantıları**: MCP Spesifikasyonu bağlantısı güncellendi; OWASP MCP Top 10 eklendi

#### Modül 11 - MCP Sunucu Uygulamalı Laboratuvarlar
- **Spesifikasyon Referansı**: MCP Spesifikasyonu 2025-11-25 sürümü güncellendi
- **Güvenlik Kaynakları**: Resmi kaynaklara OWASP MCP Top 10 eklendi

## 18 Aralık 2025

### Güvenlik Dokümantasyonu Güncellemesi - MCP Spesifikasyonu 2025-11-25

#### MCP Güvenlik En İyi Uygulamaları (02-Security/mcp-best-practices.md) - Spesifikasyon Sürümü Güncellemesi
- **Protokol Sürümü Güncellemesi**: En son MCP Spesifikasyonu 2025-11-25 (25 Kasım 2025'te yayınlandı) referansına güncellendi
  - Tüm spesifikasyon sürüm referansları 2025-06-18'dan 2025-11-25'e değiştirildi
  - Belge tarih referansları 18 Ağustos 2025'ten 18 Aralık 2025'e güncellendi
  - Tüm spesifikasyon URL'lerinin güncel dokümantasyona işaret ettiği doğrulandı
- **İçerik Doğrulaması**: En son standartlara göre güvenlik en iyi uygulamaları kapsamlı doğrulandı
  - **Microsoft Güvenlik Çözümleri**: Prompt Shields (önceden "Jailbreak risk tespiti"), Azure İçerik Güvenliği, Microsoft Entra ID ve Azure Key Vault için güncel terimler ve bağlantılar doğrulandı
  - **OAuth 2.1 Güvenliği**: En son OAuth güvenlik en iyi uygulamaları ile uyum sağlandı
  - **OWASP Standartları**: LLM'ler için OWASP Top 10 referanslarının güncel olduğu doğrulandı
  - **Azure Hizmetleri**: Tüm Microsoft Azure dokümantasyon bağlantıları ve en iyi uygulamalar kontrol edildi
- **Standartlara Uyum**: Referans verilen tüm güvenlik standartlarının güncel olduğu onaylandı
  - NIST Yapay Zeka Risk Yönetimi Çerçevesi
  - ISO 27001:2022
  - OAuth 2.1 Güvenlik En İyi Uygulamaları
  - Azure güvenlik ve uyumluluk çerçeveleri
- **Uygulama Kaynakları**: Tüm uygulama kılavuzu bağlantıları ve kaynaklar doğrulandı
  - Azure API Yönetimi kimlik doğrulama desenleri
  - Microsoft Entra ID entegrasyon kılavuzları
  - Azure Key Vault gizli yönetimi
  - DevSecOps pipeline'ları ve izleme çözümleri

### Dokümantasyon Kalite Güvencesi
- **Spesifikasyon Uyumluluğu**: Tüm zorunlu MCP güvenlik gereksinimlerinin (GEREKLİ/GEREKMEZ) en son spesifikasyonla uyumlu olduğu garanti edildi
- **Kaynak Güncelliği**: Microsoft dokümantasyon, güvenlik standartları ve uygulama kılavuzlarına dış bağlantıların geçerliliği doğrulandı
- **En İyi Uygulama Kapsamı**: Kimlik doğrulama, yetkilendirme, yapay zekaya özgü tehditler, tedarik zinciri güvenliği ve kurumsal desenlerin kapsamlı şekilde ele alındığı doğrulandı

## 6 Ekim 2025

### Başlarken Bölümünün Genişletilmesi – Gelişmiş Sunucu Kullanımı & Basit Kimlik Doğrulama

#### Gelişmiş Sunucu Kullanımı (03-GettingStarted/10-advanced)
- **Yeni Bölüm Eklendi**: Hem normal hem de düşük seviyeli sunucu mimarilerini kapsayan kapsamlı gelişmiş MCP sunucu kullanımı kılavuzu sunuldu.
  - **Normal ve Düşük Seviye Sunucu**: Her iki yaklaşım için Python ve TypeScript örnekleriyle ayrıntılı karşılaştırma.
  - **Yönetici Tabanlı Tasarım**: Ölçeklenebilir ve esnek sunucu uygulamaları için araç/kaynak/istem yönetimi üzerinde yönetici tabanlı açıklama.
  - **Pratik Desenler**: Gelişmiş özellikler ve mimari için düşük seviyeli sunucu desenlerinin faydalı olduğu gerçek dünya senaryoları.
#### Basit Kimlik Doğrulama (03-GettingStarted/11-simple-auth)
- **Yeni Bölüm Eklendi**: MCP sunucularında basit kimlik doğrulamanın adım adım uygulanması rehberi.
  - **Kimlik Doğrulama Kavramları**: Kimlik doğrulama ve yetkilendirme ile kimlik bilgilerinin işlenmesi üzerine net açıklamalar.
  - **Temel Kimlik Doğrulama Uygulaması**: Python (Starlette) ve TypeScript (Express) üzerinde ara katman tabanlı kimlik doğrulama örnekleri, kod örnekleriyle birlikte.
  - **Gelişmiş Güvenliğe İlerleme**: Basit kimlik doğrulama ile başlayıp OAuth 2.1 ve RBAC’ye ilerleme rehberi, gelişmiş güvenlik modüllerine referanslar.

Bu eklemeler, temel kavramlarla gelişmiş üretim desenlerini harmanlayarak daha sağlam, güvenli ve esnek MCP sunucu uygulamaları oluşturmak için pratik ve uygulamalı rehberlik sağlar.

## 29 Eylül 2025

### MCP Sunucu Veritabanı Entegrasyon Laboratuvarları - Kapsamlı Uygulamalı Öğrenme Yolu

#### 11-MCPServerHandsOnLabs - Yeni Tam Veritabanı Entegrasyon Müfredatı
- **Tam 13-Lab Öğrenme Yolu**: PostgreSQL veritabanı entegrasyonuyla üretime hazır MCP sunucular oluşturmak için kapsamlı uygulamalı müfredat eklendi
  - **Gerçek Dünya Uygulaması**: Kurumsal düzey desenleri gösteren Zava Retail analiz kullanımı
  - **Yapılandırılmış Öğrenme İlerleyişi**:
    - **Lab 00-03: Temeller** - Giriş, Temel Mimari, Güvenlik ve Çoklu Kiracı, Ortam Kurulumu
    - **Lab 04-06: MCP Sunucusu İnşası** - Veritabanı Tasarımı ve Şema, MCP Sunucu Uygulaması, Araç Geliştirme  
    - **Lab 07-09: Gelişmiş Özellikler** - Anlamsal Arama Entegrasyonu, Test ve Hata Ayıklama, VS Code Entegrasyonu
    - **Lab 10-12: Üretim ve En İyi Uygulamalar** - Dağıtım Stratejileri, İzleme ve Gözlemlenebilirlik, En İyi Uygulamalar ve Optimizasyon
  - **Kurumsal Teknolojiler**: FastMCP framework, pgvector destekli PostgreSQL, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Gelişmiş Özellikler**: Satır Düzeyi Güvenlik (RLS), anlamsal arama, çoklu kiracı veri erişimi, vektör gömme, gerçek zamanlı izleme

#### Terminoloji Standardizasyonu - Modülden Lab’a Dönüşüm
- **Kapsamlı Dokümantasyon Güncellemesi**: 11-MCPServerHandsOnLabs içindeki tüm README dosyaları sistematik olarak "Modül" yerine "Lab" terminolojisi ile güncellendi
  - **Bölüm Başlıkları**: Tüm 13 labda "Bu modül şunları kapsar" başlıkları "Bu lab şunları kapsar" olarak değiştirildi
  - **İçerik Tanımlaması**: Dokümantasyonda "Bu modül sağlar..." ifadesi "Bu lab sağlar..." olarak değiştirildi
  - **Öğrenme Hedefleri**: "Bu modülün sonunda..." ifadesi "Bu labın sonunda..." şeklinde güncellendi
  - **Navigasyon Bağlantıları**: Tüm "Modül XX:" referansları çapraz referanslarda ve navigasyonda "Lab XX:" olarak dönüştürüldü
  - **Tamamlama Takibi**: "Bu modül tamamlandıktan sonra..." ifadesi "Bu lab tamamlandıktan sonra..." olarak değiştirildi
  - **Teknik Referanslar Korundu**: Konfigürasyon dosyalarında Python modül referansları (örn. `"module": "mcp_server.main"`) korundu

#### Çalışma Rehberi Geliştirmesi (study_guide.md)
- **Görsel Müfredat Haritası**: Kapsamlı lab yapısı görselleştirmesi ile yeni "11. Veritabanı Entegrasyon Laboratuvarları" bölümü eklendi
- **Depo Yapısı**: On bölümden on bir ana bölüme güncellendi, detaylı 11-MCPServerHandsOnLabs açıklaması eklendi
- **Öğrenme Yolu Rehberi**: 00-11 arası bölümleri kapsayacak şekilde gezinme talimatları geliştirildi
- **Teknoloji Kapsamı**: FastMCP, PostgreSQL, Azure servisleri entegrasyon detayı eklendi
- **Öğrenme Çıktıları**: Üretime hazır sunucu geliştirme, veritabanı entegrasyon desenleri ve kurumsal güvenlik vurgulandı

#### Ana README Yapısında İyileştirmeler
- **Lab Tabanlı Terminoloji**: 11-MCPServerHandsOnLabs içindeki ana README.md, “Lab” yapısını tutarlı şekilde kullanacak şekilde güncellendi
- **Öğrenme Yolu Organizasyonu**: Temel kavramlardan gelişmiş uygulama ve üretime dağıtıma açık net ilerleyiş sağlandı
- **Gerçek Dünya Odaklılık**: Kurumsal düzey desenler ve teknolojilerle pratik, uygulamalı öğrenim vurgulandı

### Dokümantasyon Kalite ve Tutarlılık İyileştirmeleri
- **Uygulamalı Öğrenim Vurgusu**: Dokümantasyonda uygulamalı, lab tabanlı yaklaşım pekiştirildi
- **Kurumsal Desenlere Odaklanma**: Üretime hazır uygulamalar ve kurumsal güvenlik hususları öne çıkarıldı
- **Teknoloji Entegrasyonu**: Modern Azure servisleri ve yapay zeka entegrasyon desenlerinin kapsamlı ele alınması
- **Öğrenme İlerlemesi**: Temel kavramlardan üretime dağıtıma şeffaf, yapılandırılmış yol gösterimi

## 26 Eylül 2025

### Vaka İncelemeleri Geliştirmesi - GitHub MCP Registry Entegrasyonu

#### Vaka İncelemeleri (09-CaseStudy/) - Ekosistem Geliştirme Odaklılık
- **README.md**: Kapsamlı GitHub MCP Registry vaka incelemesi ile büyük genişleme
  - **GitHub MCP Registry Vaka İncelemesi**: Eylül 2025’te GitHub’ın MCP Registry lansmanını detaylı şekilde inceleyen kapsamlı yeni vaka analizi
    - **Sorun Analizi**: Parçalanmış MCP sunucu keşfi ve dağıtım zorluklarının ayrıntılı incelenmesi
    - **Çözüm Mimarisi**: Tek tıklamayla VS Code kurulumu sunan GitHub’ın merkezi kayıt yaklaşımı
    - **İş Etkisi**: Geliştirici onboarding ve üretkenlikte ölçülebilir iyileşmeler
    - **Stratejik Değer**: Modüler ajan dağıtımı ve araçlar arası birlikte çalışabilirlik ön planda
    - **Ekosistem Geliştirme**: Ajan tabanlı entegrasyon için temel platform olarak konumlandırma
  - **Geliştirilmiş Vaka İncelemesi Yapısı**: Tüm yedi vaka incelemesi tutarlı format ve kapsamlı açıklamalarla güncellendi
    - Azure AI Seyahat Ajanları: Çoklu ajan orkestrasyonuna vurgu
    - Azure DevOps Entegrasyonu: İş akışı otomasyonu odaklı
    - Gerçek Zamanlı Dokümantasyon Alma: Python konsol istemcisi uygulaması
    - Etkileşimli Çalışma Planı Üreticisi: Chainlit sohbet web uygulaması
    - Editör İçi Dokümantasyon: VS Code ve GitHub Copilot entegrasyonu
    - Azure API Yönetimi: Kurumsal API entegrasyon desenleri
    - GitHub MCP Registry: Ekosistem geliştirme ve topluluk platformu
  - **Kapsamlı Sonuç Bölümü**: Çok boyutlu MCP uygulamalarını kapsayan yedi vaka incelemesini vurgulayacak şekilde yeniden yazıldı
    - Kurumsal Entegrasyon, Çoklu Ajan Orkestrasyonu, Geliştirici Üretkenliği
    - Ekosistem Geliştirme, Eğitim Uygulamaları sınıflaması
    - Mimari desenler, uygulama stratejileri ve en iyi uygulamalar üzerine gelişmiş bilgiler
    - MCP protokolünün olgun, üretime hazır konumunda olduğunu vurgulama

#### Çalışma Rehberi Güncellemeleri (study_guide.md)
- **Görsel Müfredat Haritası**: GitHub MCP Registry vaka incelemeleri bölümüne eklendi
- **Vaka İncelemeleri Açıklaması**: Genel tanımlardan kapsamlı yedi vaka incelemesinin ayrıntılı dökümüne yükseltildi
- **Depo Yapısı**: Bölüm 10, belirli uygulama detaylarını yansıtacak şekilde kapsamlı vaka incelemesi kapsamına güncellendi
- **Değişiklik Günlüğü Entegrasyonu**: 26 Eylül 2025 girdisi, GitHub MCP Registry eklemesi ve vaka geliştirmelerini belgeliyor
- **Tarih Güncellemeleri**: Altbilgi zaman damgası en son revizyonu yansıtacak şekilde güncellendi (26 Eylül 2025)

### Dokümantasyon Kalite İyileştirmeleri
- **Tutarlılık Artırımı**: Tüm yedi örnekte vaka incelemesi formatı ve yapısı standartlaştırıldı
- **Kapsamlı Kapsam**: Vaka incelemeleri artık kurumsal, geliştirici üretkenliği ve ekosistem geliştirme senaryolarını kapsıyor
- **Stratejik Konumlandırma**: MCP’nin ajan bazlı sistem dağıtımı için temel platform olarak önemi güçlendirildi
- **Kaynak Entegrasyonu**: Ek kaynaklar arasında GitHub MCP Registry bağlantısı güncellendi

## 15 Eylül 2025

### İleri Konular Genişlemesi - Özel Taşıyıcılar & Bağlam Mühendisliği

#### MCP Özel Taşıyıcılar (05-AdvancedTopics/mcp-transport/) - Yeni İleri Düzey Uygulama Rehberi
- **README.md**: Özel MCP taşıyıcı mekanizmaları için tam uygulama rehberi
  - **Azure Event Grid Taşıyıcısı**: Kapsamlı sunucusuz olay odaklı taşıyıcı uygulaması
    - C#, TypeScript ve Python örnekleri ile Azure Functions entegrasyonu
    - Ölçeklenebilir MCP çözümleri için olay odaklı mimari desenleri
    - Webhook alıcıları ve push tabanlı mesaj işleme
  - **Azure Event Hubs Taşıyıcısı**: Yüksek verimli akış taşıyıcı uygulaması
    - Düşük gecikmeli gerçek zamanlı akış yetenekleri
    - Bölümlendirme stratejileri ve checkpoint yönetimi
    - Mesaj toplama ve performans optimizasyonu
  - **Kurumsal Entegrasyon Desenleri**: Üretime hazır mimari örnekler
    - Birden çok Azure Functions arasında dağıtılmış MCP işleme
    - Birden çok taşıyıcı tipini birleştiren hibrit taşıyıcı mimarileri
    - Mesaj dayanıklılığı, güvenilirlik ve hata işleme stratejileri
  - **Güvenlik & İzleme**: Azure Key Vault entegrasyonu ve gözlemlenebilirlik desenleri
    - Yönetilen kimlik doğrulaması ve en az ayrıcalık erişimi
    - Application Insights telemetri ve performans izleme
    - Devre kesiciler ve hata toleransı desenleri
  - **Test Çerçeveleri**: Özel taşıyıcılar için kapsamlı test stratejileri
    - Test çiftleri ve mocking çerçeveleri ile birim testi
    - Azure Test Containers ile entegrasyon testi
    - Performans ve yük testi değerlendirmeleri

#### Bağlam Mühendisliği (05-AdvancedTopics/mcp-contextengineering/) - Yükselen AI Disiplini
- **README.md**: Bağlam mühendisliği alanının kapsamlı keşfi
  - **Temel Prensipler**: Tam bağlam paylaşımı, eylem karar farkındalığı ve bağlam penceresi yönetimi
  - **MCP Protokol Hizalaması**: MCP dizaynının bağlam mühendisliği zorluklarını nasıl çözdüğü
    - Bağlam pencere sınırlamaları ve aşamalı yükleme stratejileri
    - İlgi tayini ve dinamik bağlam getirimi
    - Çok-modlu bağlam yönetimi ve güvenlik hususları
  - **Uygulama Yaklaşımları**: Tek iş parçacıklı ve çok ajanlı mimariler
    - Bağlam parçalama ve önceliklendirme teknikleri
    - Aşamalı bağlam yükleme ve sıkıştırma stratejileri
    - Katmanlı bağlam yaklaşımları ve getirimi optimizasyonu
  - **Ölçüm Çerçevesi**: Bağlam etkinliğini değerlendiren yükselen metrikler
    - Girdi verimliliği, performans, kalite ve kullanıcı deneyimi değerlendirmeleri
    - Bağlam optimizasyonu için deneysel yaklaşımlar
    - Başarısızlık analizleri ve iyileştirme metodolojileri

#### Müfredat Navigasyon Güncellemeleri (README.md)
- **Gelişmiş Modül Yapısı**: Yeni ileri konuların dahil edildiği müfredat tablosu güncellendi
  - Bağlam Mühendisliği (5.14) ve Özel Taşıyıcı (5.15) girişleri eklendi
  - Tüm modüllerde tutarlı biçimlendirme ve navigasyon bağlantıları
  - Güncel içerik kapsamını yansıtan açıklamalar eklendi

### Dizin Yapısı İyileştirmeleri
- **Adlandırma Standardizasyonu**: "mcp transport" klasörü diğer ileri konu klasörleriyle tutarlılık için "mcp-transport" olarak yeniden adlandırıldı
- **İçerik Organizasyonu**: Tüm 05-AdvancedTopics klasörleri artık tutarlı adlandırma kalıbı (mcp-[konu]) kullanıyor

### Dokümantasyon Kalite Geliştirmeleri
- **MCP Spesifikasyon Hizalaması**: Tüm yeni içerikler MCP Spesifikasyon 2025-06-18’e referans veriyor
- **Çok Dilli Örnekler**: C#, TypeScript ve Python’da kapsamlı kod örnekleri
- **Kurumsal Odak**: Üretime hazır desenler ve Azure bulut entegrasyonları ağırlıklı
- **Görsel Dokümantasyon**: Mimari ve akış görselleştirmesi için Mermaid diyagramları

## 18 Ağustos 2025

### Dokümantasyon Kapsamlı Güncellemesi - MCP 2025-06-18 Standartları

#### MCP Güvenlik En İyi Uygulamaları (02-Security/) - Tam Modernizasyon
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP Spesifikasyon 2025-06-18 uyumlu tam yeniden yazım
  - **Zorunlu Gereksinimler**: Resmi spesifikasyondan açıkça belirtilmiş GEREKLİ/GEREKLİ DEĞİL kuralları, net görsel işaretlerle
  - **12 Temel Güvenlik Uygulaması**: 15 maddelik listeden kapsamlı güvenlik alanlarına yapılandırıldı
    - Dış kimlik sağlayıcı entegrasyonlu Token Güvenliği & Kimlik Doğrulama
    - Kriptografik gereksinimli Oturum Yönetimi & Taşıma Güvenliği
    - Microsoft Prompt Shields entegrasyonlu AI-Spesifik Tehdit Koruması
    - En az ayrıcalık prensipli Erişim Kontrolü & İzinler
    - Azure Content Safety ile İçerik Güvenliği & İzleme
    - Kapsamlı bileşen doğrulamalı Tedarik Zinciri Güvenliği
    - PKCE uygulamalı OAuth Güvenliği & Karışık Görev Engelleme
    - Otomatikleştirilmiş Olay Müdahalesi & Kurtarma
    - Düzenleyici uyumluluk odaklı Uyumluluk & Yönetişim
    - Sıfır güven mimarili Gelişmiş Güvenlik Kontrolleri
    - Microsoft Güvenlik Ekosistemi entegrasyonu (Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security)
    - Sürekli Güvenlik Evrimi ve uyarlamalı uygulamalar
  - **Microsoft Güvenlik Çözümleri**: Prompt Shields, Azure Content Safety, Entra ID ve GitHub Advanced Security için gelişmiş entegrasyon rehberi
  - **Uygulama Kaynakları**: Resmi MCP dokümanları, Microsoft güvenlik çözümleri, güvenlik standartları ve uygulama kılavuzları kategorilerinde kapsamlı kaynak bağlantıları

#### İleri Düzey Güvenlik Kontrolleri (02-Security/) - Kurumsal Uygulama
- **MCP-SECURITY-CONTROLS-2025.md**: Kurumsal düzey güvenlik çerçevesi ile tam kapsamlı revizyon
  - **9 Kapsamlı Güvenlik Alanı**: Temel kontrollerden detaylı kurumsal çerçeveye genişletildi
    - Microsoft Entra ID entegrasyonlu İleri Kimlik Doğrulama & Yetkilendirme
    - Kapsamlı doğrulamalı Token Güvenliği & Geçiş Engelleme Kontrolleri
    - Kaçırma önleyici Oturum Güvenlik Kontrolleri
    - Prompt enjeksiyonu ve araç zehirlenmesini engelleyen AI-Spesifik Güvenlik Kontrolleri
    - OAuth proxy güvenliği ile Karışık Görev Saldırısı Engelleme
    - Sandboxing ve izolasyon odaklı Araç Çalıştırma Güvenliği
    - Bağımlılık doğrulamalı Tedarik Zinciri Güvenlik Kontrolleri
    - SIEM entegrasyonlu İzleme & Tespit Kontrolleri
    - Otomatikleştirilen Olay Müdahalesi ve Kurtarma Mekanizmaları
  - **Uygulama Örnekleri**: Detaylı YAML konfigürasyon blokları ve kod örnekleri eklendi
  - **Microsoft Çözümleri Entegrasyonu**: Azure güvenlik servisleri, GitHub Advanced Security ve kurumsal kimlik yönetimi kapsamlı işlendi

#### İleri Konular Güvenliği (05-AdvancedTopics/mcp-security/) - Üretime Hazır Uygulama
- **README.md**: Kurumsal güvenlik uygulaması için tam yeniden yazım
  - **Mevcut Spesifikasyon Uyumu**: MCP Spesifikasyon 2025-06-18’e uygun zorunlu güvenlik gereksinimleri güncellendi
  - **Gelişmiş Kimlik Doğrulama**: Microsoft Entra ID entegrasyonu, kapsamlı .NET ve Java Spring Security örnekleri ile
  - **AI Güvenliği Entegrasyonu**: Microsoft Prompt Shields ve Azure Content Safety Python örnekleri ile uygulama
  - **Gelişmiş Tehdit Hafifletme**: 
    - PKCE ve kullanıcı onay doğrulaması ile Karışık Görev Saldırısı Önleme
    - Hedef kitle doğrulaması ve güvenli token yönetimi ile Token Geçişinin Engellenmesi
    - Kriptografik bağlama ve davranışsel analiz ile Oturum Kaçırma Koruması
  - **Kurumsal Güvenlik Entegrasyonu**: Azure Application Insights izleme, tehdit tespit boru hatları ve tedarik zinciri güvenliği
  - **Uygulama Kontrol Listesi**: Zorunlu ve önerilen güvenlik kontrolleri ile Microsoft güvenlik ekosistemi avantajları

### Dokümantasyon Kalite ve Standart Hizalaması
- **Spesifikasyon Referansları**: Tüm referanslar güncel MCP Spesifikasyonu 2025-06-18 olarak güncellendi  
- **Microsoft Güvenlik Ekosistemi**: Tüm güvenlik dokümantasyonunda entegrasyon rehberliği geliştirildi  
- **Pratik Uygulama**: Kurumsal desenlerle .NET, Java ve Python’da detaylı kod örnekleri eklendi  
- **Kaynak Organizasyonu**: Resmi dokümantasyon, güvenlik standartları ve uygulama rehberlerinin kapsamlı kategorilendirilmesi  
- **Görsel Göstergeler**: Zorunlu gereksinimler ile önerilen uygulamaların net işaretlenmesi  


#### Temel Kavramlar (01-CoreConcepts/) - Tam Modernizasyon  
- **Protokol Versiyon Güncellemesi**: Güncel MCP Spesifikasyonu 2025-06-18 referans alınarak tarih tabanlı versiyonlama (YYYY-AA-GG formatı)  
- **Mimari İyileştirme**: MCP mimari desenlerine uygun olarak Hosts, Clients ve Servers tanımlamalarının geliştirilmesi  
  - Hosts artık birden fazla MCP istemci bağlantısını yöneten AI uygulamaları olarak net olarak tanımlandı  
  - Clients tek sunucu ilişkisini sürdüren protokol bağlantıları olarak tanımlandı  
  - Servers yerel ve uzak dağıtım senaryolarıyla geliştirildi  
- **Primitiflerin Yeniden Yapılandırılması**: Sunucu ve istemci primitiflerinde kapsamlı yenileme  
  - Sunucu Primitifleri: Kaynaklar (veri kaynakları), İstekler (şablonlar), Araçlar (çalıştırılabilir fonksiyonlar) detaylı açıklamalar ve örneklerle  
  - İstemci Primitifleri: Örnekleme (LLM tamamlama), Bilgi toplama (kullanıcı girdisi), Kayıt tutma (hata ayıklama/izleme)  
  - Güncel keşif (`*/list`), erişim (`*/get`) ve yürütme (`*/call`) yöntemleriyle uyumlu  
- **Protokol Mimarisi**: İki katmanlı mimari modeli tanıtıldı  
  - Veri Katmanı: JSON-RPC 2.0 temelli, yaşam döngüsü yönetimi ve primitifler dahil  
  - Taşıma Katmanı: STDIO (yerel) ve SSE destekli Streamable HTTP (uzak) iletişim mekanizmaları  
- **Güvenlik Çerçevesi**: Açık kullanıcı onayı, veri gizliliği koruması, araç çalıştırma güvenliği ve taşıma katmanı güvenliği gibi kapsamlı güvenlik prensipleri  
- **İletişim Desenleri**: Protokol mesajları başlatma, keşif, yürütme ve bildirim akışları gösterilecek şekilde güncellendi  
- **Kod Örnekleri**: Güncel MCP SDK desenlerine uyarlanmış çoklu dil örnekleri (.NET, Java, Python, JavaScript) yenilendi  

#### Güvenlik (02-Security/) - Kapsamlı Güvenlik Yenilemesi  
- **Standartlarla Uyum**: MCP Spesifikasyonu 2025-06-18 güvenlik gereksinimleriyle tam uyum  
- **Kimlik Doğrulama Evrimi**: Özel OAuth sunucularından Microsoft Entra ID gibi harici kimlik sağlayıcısı yetkilendirmesine geçiş belgelenmiştir  
- **AI’ye Özgü Tehdit Analizi**: Modern AI saldırı vektörlerinin kapsamı genişletildi  
  - Gerçek dünya örnekleriyle detaylı prompt enjeksiyonu saldırı senaryoları  
  - Araç zehirlenmesi mekanizmaları ve "halı çekme" saldırı desenleri  
  - Bağlam pencere zehirlenmesi ve model karıştırma saldırıları  
- **Microsoft AI Güvenlik Çözümleri**: Microsoft güvenlik ekosistemi kapsamlı biçimde ele alındı  
  - Gelişmiş tespit, öne çıkarma ve sınırlayıcı teknikler kullanan AI Prompt Shields  
  - Azure İçerik Güvenliği entegrasyon desenleri  
  - Tedarik zinciri koruması için GitHub Gelişmiş Güvenlik  
- **Gelişmiş Tehdit Önleme**:  
  - MCP’ye özgü oturum kaçırma saldırı senaryoları ve kriptografik oturum kimliği gereklilikleri  
  - MCP proxy senaryolarındaki karışık vekil problemleri, açık onay gereksinimleriyle  
  - Zorunlu doğrulama kontrolleri ile token geçiş zaafiyetleri  
- **Tedarik Zinciri Güvenliği**: Temel modeller, gömme servisleri, bağlam sağlayıcılar ve üçüncü taraf API’ler dahil AI tedarik zinciri kapsamı genişletildi  
- **Temel Güvenlik**: Kurumsal güvenlik desenleri, sıfır güven mimarisi ve Microsoft güvenlik ekosistemi entegrasyonu geliştirildi  
- **Kaynak Organizasyonu**: Kaynaklar (Resmi Dokümanlar, Standartlar, Araştırmalar, Microsoft Çözümleri, Uygulama Kılavuzları) türlerine göre kategorize edildi  

### Dokümantasyon Kalite İyileştirmeleri  
- **Yapılandırılmış Öğrenme Hedefleri**: Belirgin, uygulanabilir öğrenme hedefleriyle geliştirildi  
- **Çapraz Referanslar**: İlgili güvenlik ve temel kavram konularında bağlantılar eklendi  
- **Güncel Bilgi**: Tüm tarih referansları ve spesifikasyon bağlantıları güncel standartlarla değiştirildi  
- **Uygulama Rehberliği**: Her iki bölümde de spesifik, uygulanabilir uygulama önerileri eklendi  

## 16 Temmuz 2025  

### README ve Navigasyon İyileştirmeleri  
- README.md dosyasındaki müfredat navigasyonu tamamen yeniden tasarlandı  
- `<details>` etiketleri erişilebilir tablo tabanlı formata dönüştürüldü  
- "alternative_layouts" klasöründe alternatif yerleşim seçenekleri oluşturuldu  
- Kart tabanlı, sekmeli ve akordeon stili navigasyon örnekleri eklendi  
- Depo yapısı bölümü tüm son dosyaları içerecek şekilde güncellendi  
- "Bu Müfredatı Nasıl Kullanılır" bölümü net önerilerle geliştirdi  
- MCP spesifikasyon bağlantıları doğru URL’lere yönlendirilecek şekilde güncellendi  
- Müfredat yapısına Bağlam Mühendisliği bölümü (5.14) eklendi  

### Çalışma Rehberi Güncellemeleri  
- Çalışma rehberi mevcut depo yapısına uyumlu şekilde tamamen revize edildi  
- MCP İstemciler ve Araçlar ile Popüler MCP Sunucuları için yeni bölümler eklendi  
- Görsel Müfredat Haritası tüm konuları doğru şekilde yansıtacak biçimde güncellendi  
- İleri Düzey Konuların açıklamaları tüm uzmanlık alanlarını kapsayacak şekilde geliştirildi  
- Vaka Çalışmaları bölümü güncel örneklerle yenilendi  
- Bu kapsamlı değişiklik günlüğü eklendi  

### Topluluk Katkıları (06-CommunityContributions/)  
- Görüntü oluşturma için MCP sunucularına dair detaylı bilgiler eklendi  
- VSCode içinde Claude kullanımı hakkında kapsamlı bölüm eklendi  
- Cline terminal istemcisi kurulumu ve kullanım talimatları eklendi  
- MCP istemci bölümü popüler tüm istemci seçeneklerini içerecek şekilde güncellendi  
- Katkı örnekleri daha doğru kod örnekleriyle zenginleştirildi  

### İleri Düzey Konular (05-AdvancedTopics/)  
- Tüm uzmanlık konu klasörleri tutarlı isimlendirme ile düzenlendi  
- Bağlam mühendisliği materyalleri ve örnekleri eklendi  
- Foundry ajan entegrasyon dokümantasyonu eklendi  
- Entra ID güvenlik entegrasyon dokümantasyonu geliştirildi  

## 11 Haziran 2025  

### İlk Oluşturma  
- MCP Başlangıç Müfredatı ilk sürümü yayımlandı  
- 10 ana bölüm için temel yapı oluşturuldu  
- Navigasyon için Görsel Müfredat Haritası uygulandı  
- Çoklu programlama dili örnek projeleri eklendi  

### Başlangıç (03-GettingStarted/)  
- İlk sunucu uygulama örnekleri oluşturuldu  
- İstemci geliştirme rehberliği eklendi  
- LLM istemci entegrasyon talimatları dahil edildi  
- VS Code entegrasyon dokümantasyonu eklendi  
- Server-Sent Events (SSE) sunucu örnekleri uygulandı  

### Temel Kavramlar (01-CoreConcepts/)  
- İstemci-sunucu mimarisi detaylı biçimde açıklandı  
- Ana protokol bileşenleri hakkında dokümantasyon oluşturuldu  
- MCP’de mesajlaşma desenleri belgeledi  

## 23 Mayıs 2025  

### Depo Yapısı  
- Temel klasör yapısı ile depo başlatıldı  
- Her ana bölüm için README dosyaları oluşturuldu  
- Çeviri altyapısı kuruldu  
- Görseller ve diyagramlar eklendi  

### Dokümantasyon  
- Müfredat genel bakış ile README.md oluşturuldu  
- CODE_OF_CONDUCT.md ve SECURITY.md dosyaları eklendi  
- Destek almak için SUPPORT.md hazırlandı  
- İlk çalışma rehberi yapısı oluşturuldu  

## 15 Nisan 2025  

### Planlama ve Çerçeve  
- MCP Başlangıç müfredatı için ilk planlama yapıldı  
- Öğrenme hedefleri ve hedef kitle tanımlandı  
- Müfredatın 10 bölümlük yapısı tasarlandı  
- Örnekler ve vaka çalışmaları için kavramsal çerçeve geliştirildi  
- Anahtar kavramlar için ilk prototip örnekleri oluşturuldu  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->