🌍 [English](README.md) | [Deutsch](README.de.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [Polski](README.pl.md) | **Türkçe**

# ClaudeAdmin

[Claude Code](https://claude.com/claude-code) yapılandırmanızı yönetmek için web tabanlı bir yönetici konsolu.

Birkaçtan fazla projeyle çalışmaya başladığınızda, `~/.claude/` genelinde beceri, kural, bellek dosyaları, MCP sunucuları ve ayarları takip etmek zahmetli hale gelir. ClaudeAdmin, tümünü tek bir arayüzden yönetmenizi sağlar — artık JSON ve YAML dosyalarını elle düzenlemenize gerek yok.

> **Not:** Bu bağımsız bir topluluk projesidir. Anthropic ile herhangi bir bağlantısı veya onayı yoktur.

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## Özellikler

- **Dashboard** — İstatistikler, son değişiklikler ve projelere hızlı erişim içeren genel bakış
- **Projeler** — Projelere göz atın, CLAUDE.md'yi düzenleyin, proje bazında kuralları, becerileri, belleği ve izinleri yönetin
- **Proje Danışmanı** — Tek tıkla eylemler içeren yapay zeka destekli analiz (CLAUDE.md oluşturma, bellek başlatma, kural ekleme)
- **Beceriler** — Küresel becerileri oluşturun, düzenleyin ve göz atın (YAML ön yüzü + markdown)
- **Beceri Tarayıcısı** — Topluluk becerilerini keşfedin ve tek tıkla yükleyin
- **Kurallar** — Çakışma algılama ile küresel ve proje düzeyindeki kuralları yönetin
- **Bellek** — Projeye özgü bellek dosyalarını görüntüleyin ve düzenleyin (MEMORY.md + konu dosyaları)
- **MCP Sunucuları** — Yapılandırılmış form (command/args/env) veya ham JSON ile tam yönetim, sağlık kontrolleri ve araç gezgini
- **MCP Tarayıcısı** — Seçilmiş bir katalogdan popüler MCP sunucularını keşfedin ve yükleyin
- **Ajanlar** — Belirli istemler ve araç yapılandırmalarıyla özel Claude ajanları tanımlayın
- **Eklentiler** — Yüklü Claude Code eklentilerini yönetin
- **Başlatma Profilleri** — Yeniden kullanılabilir CLI yapılandırmaları (model, çaba, araçlar, bütçe)
- **Sistem İstemleri** — Yeniden kullanılabilir sistem istemleri oluşturun ve yönetin
- **Zaman Çizelgesi** — `~/.claude/` yapılandırmanızın Git tabanlı sürüm geçmişi, fark görüntüleyici ve geri yükleme
- **Ayarlar** — Küresel ayarları, kancaları, API anahtarını, depolama genel bakışını düzenleyin
- **İzinler** — Araç izinlerini, güvenlik uyarılarını ve yapılandırma sağlığını inceleyin
- **Planlar** — Plan dosyalarını yönetin
- **Oturumlar** — Arama özellikli oturum geçmişine göz atın
- **Analitik** — Kullanım metrikleri, proje bazında içgörüler ve CSV/JSON dışa aktarma
- **Worktree'ler** — Projeler genelinde git worktree'lerini görüntüleyin ve yönetin
- **Arama** — Beceriler, kurallar ve yapılandırma genelinde tam metin araması
- **Yardım Sohbeti** — Konuşma belleği olan bağlam duyarlı yapay zeka asistanı
- **Yedeklemeler** — Otomatik yedeklemelere göz atın, karşılaştırın ve geri yükleyin
- **12 Dil** — Tam i18n: İngilizce, Almanca, İspanyolca, Fransızca, İtalyanca, Japonca, Korece, Çince, Felemenkçe, Lehçe, Portekizce, Türkçe

## Mimari

```
┌─────────────────────┐     ┌──────────────────────┐
│  claude-admin-       │     │  claude-admin-        │
│  backend             │◄────│  frontend             │
│  Rust + Axum 0.7     │     │  Leptos 0.6 CSR/WASM  │
│  Port 9022           │     │  Port 9023 (dev)       │
└──────────┬──────────┘     └──────────────────────┘
           │                         │
           │    claude-admin-shared  │
           │    (shared types)       │
           │                         │
           ▼                         │
   ~/.claude/  (filesystem)          │
                                     │
   In production, the WASM frontend  │
   is embedded into the backend      │
   binary via rust-embed.            │
```

- **Veritabanı yok** — dosya sisteminden okur ve yazar (`~/.claude/`)
- **Otomatik yedeklemeler** — her yazma işleminden önce `~/.claude/backups/` klasöründe, dosya başına zaman damgalı olarak oluşturulur
- **Claude API isteğe bağlı** — `ANTHROPIC_API_KEY` olmadan tam işlevli çalışır
- **Tek ikili dosya** — production derlemesi, frontend'i `rust-embed` aracılığıyla gömülü olarak içerir

## Güvenlik

ClaudeAdmin **yerel makinenizde** çalışır. Geliştirme iş istasyonunda tek kullanıcılı kullanım için tasarlanmıştır.

- Yalnızca `~/.claude/` ve `~/.claude.json` altında okuma ve yazma yapar
- Telemetri yok, analitik yok, uzak çağrı yok (yapılandırılmışsa isteğe bağlı Anthropic API hariç)
- **İsteğe bağlı kimlik doğrulama** — Oturum yönetimi ile Bearer token kimlik doğrulamasını etkinleştirmek için `CLAUDE_ADMIN_TOKEN` ayarlayın
- **RBAC** — `~/.claude/users.json` aracılığıyla isteğe bağlı rol tabanlı erişim kontrolü (Admin, Editör, Görüntüleyici)
- Güvenlik başlıkları: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff
- Tüm API uç noktalarında hız sınırlaması
- Yol geçişi (path traversal) koruması

## Başlarken

### Ön Koşullar

- [Rust](https://rustup.rs/) (kararlı)
- WASM derlemeleri için [Trunk](https://trunkrs.dev/): `cargo install trunk`
- WASM hedefi: `rustup target add wasm32-unknown-unknown`

### Geliştirme

```bash
# Projeyi klonlayın ve içine girin
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# Backend'i başlatın
cargo run -p claude-admin-backend

# Ayrı bir terminalde: hot-reload ile frontend'i başlatın
cd claude-admin-frontend && trunk serve --port 9023
```

Backend: `http://localhost:9022` — Frontend: `http://localhost:9023`

### Production Derlemesi

```bash
# WASM frontend'i derleyin
cd claude-admin-frontend && trunk build --release && cd ..

# Backend'i derleyin (frontend'i gömer)
cargo build --release -p claude-admin-backend

# Tek ikili dosyayı çalıştırın
./target/release/claude-admin-backend
```

Linux, macOS ve Windows için önceden derlenmiş ikili dosyalar [Releases](https://github.com/conradBruchmann/claude-admin/releases) sayfasında mevcuttur.

### macOS Kurulumu

En son sürümden `.dmg` dosyasını indirin, açın ve **ClaudeAdmin.app** uygulamasını `/Applications` klasörüne sürükleyin.

Uygulama bir Apple Developer sertifikasıyla imzalanmadığından, macOS Gatekeeper ilk başlatmada engeller. İzin vermek için şunu çalıştırın:

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

Ardından uygulamaya çift tıklayın — sunucuyu başlatır ve tarayıcınızda `http://localhost:9022` adresini açar. DMG, hem Intel hem de Apple Silicon Mac'lerde yerel olarak çalışan bir Evrensel İkili içerir.

### Windows Kurulumu

En son sürümden `ClaudeAdmin-*-Setup.exe` dosyasını indirin ve yükleyiciyi çalıştırın. Kullanıcı profilinize kurulur (yönetici hakları gerekmez), Başlat Menüsü ve Masaüstü kısayolları oluşturur ve temiz kaldırma için "Uygulamalar ve Özellikler" bölümüne kaydeder.

Kurulumun ardından ClaudeAdmin'i Başlat Menüsü'nden veya Masaüstü'nden başlatın — sunucuyu başlatır ve tarayıcınızda `http://localhost:9022` adresini açar.

## Yapılandırma Yolları

ClaudeAdmin, standart Claude Code yapılandırmasını okur ve yazar:

| Yol                                    | Açıklama                                |
| -------------------------------------- | --------------------------------------- |
| `~/.claude.json`                       | Proje kayıt defteri, MCP sunucuları     |
| `~/.claude/settings.json`              | Küresel ayarlar, kancalar               |
| `~/.claude/skills/`                    | Küresel beceriler                       |
| `~/.claude/rules/`                     | Küresel kurallar                        |
| `~/.claude/plans/`                     | Plan dosyaları                          |
| `~/.claude/projects/<encoded>/memory/` | Projeye özgü bellek                     |
| `~/.claude/projects/<encoded>/rules/`  | Projeye özgü kurallar                   |
| `~/.claude/system-prompts/`            | Yeniden kullanılabilir sistem istemleri |
| `~/.claude/agents/`                    | Özel ajan tanımları                     |
| `~/.claude/launch-profiles/`           | CLI başlatma profilleri                 |
| `~/.claude/backups/`                   | Otomatik yedeklemeler (zaman damgalı)   |
| `~/.claude/users.json`                 | RBAC kullanıcı rolleri (isteğe bağlı)   |

## Lisans

[MIT](LICENSE) — Telif hakkı (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
