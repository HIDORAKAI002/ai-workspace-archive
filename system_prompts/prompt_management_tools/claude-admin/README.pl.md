🌍 [English](README.md) | [Deutsch](README.de.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [中文](README.zh.md) | **Polski** | [Türkçe](README.tr.md)

# ClaudeAdmin

Webowa konsola administracyjna do zarządzania konfiguracją [Claude Code](https://claude.com/claude-code).

Gdy pracujesz z więcej niż kilkoma projektami, śledzenie umiejętności, reguł, plików pamięci, serwerów MCP i ustawień w katalogu `~/.claude/` staje się uciążliwe. ClaudeAdmin daje Ci jeden interfejs do zarządzania tym wszystkim — koniec z ręcznym edytowaniem JSON i YAML.

> **Uwaga:** To niezależny projekt społecznościowy. Nie jest powiązany z Anthropic ani przez nie popierany.

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## Funkcje

- **Dashboard** — Przegląd ze statystykami, ostatnimi zmianami i szybkim dostępem do projektów
- **Projekty** — Przeglądaj projekty, edytuj CLAUDE.md, zarządzaj regułami, umiejętnościami, pamięcią i uprawnieniami per projekt
- **Doradca projektowy** — Analiza wspomagana przez AI z akcjami jednym kliknięciem (tworzenie CLAUDE.md, inicjalizacja pamięci, dodawanie reguł)
- **Umiejętności** — Twórz, edytuj i przeglądaj globalne umiejętności (YAML frontmatter + markdown)
- **Przeglądarka umiejętności** — Odkrywaj i instaluj umiejętności społecznościowe jednym kliknięciem
- **Reguły** — Zarządzaj globalnymi i projektowymi regułami z wykrywaniem konfliktów
- **Pamięć** — Przeglądaj i edytuj pliki pamięci per projekt (MEMORY.md + pliki tematyczne)
- **Serwery MCP** — Pełne zarządzanie z formularzem strukturalnym (command/args/env) lub surowym JSON, kontrole stanu i eksplorator narzędzi
- **Przeglądarka MCP** — Odkrywaj i instaluj popularne serwery MCP z wyselekcjonowanego katalogu
- **Agenci** — Definiuj niestandardowych agentów Claude ze specyficznymi promptami i konfiguracjami narzędzi
- **Wtyczki** — Zarządzaj zainstalowanymi wtyczkami Claude Code
- **Profile uruchomieniowe** — Wielokrotnego użytku konfiguracje CLI (model, nakład pracy, narzędzia, budżet)
- **Prompty systemowe** — Twórz i zarządzaj promptami systemowymi wielokrotnego użytku
- **Oś czasu** — Oparta na Git historia wersji konfiguracji `~/.claude/` z przeglądarką różnic i przywracaniem
- **Ustawienia** — Edytuj globalne ustawienia, hooki, klucz API, przegląd pamięci masowej
- **Uprawnienia** — Przeglądaj uprawnienia narzędzi, ostrzeżenia bezpieczeństwa i stan konfiguracji
- **Plany** — Zarządzaj plikami planów
- **Sesje** — Przeglądaj historię sesji z wyszukiwaniem
- **Analityka** — Metryki użycia, spostrzeżenia per projekt i eksport CSV/JSON
- **Worktree** — Przeglądaj i zarządzaj worktree'ami Git w ramach projektów
- **Wyszukiwanie** — Pełnotekstowe wyszukiwanie w umiejętnościach, regułach i konfiguracji
- **Czat pomocy** — Kontekstowy asystent AI z pamięcią rozmów
- **Kopie zapasowe** — Przeglądaj, porównuj i przywracaj automatyczne kopie zapasowe
- **12 języków** — Pełna internacjonalizacja: angielski, niemiecki, hiszpański, francuski, włoski, japoński, koreański, chiński, niderlandzki, polski, portugalski, turecki

## Architektura

```
┌─────────────────────┐     ┌──────────────────────┐
│  claude-admin-       │     │  claude-admin-        │
│  backend             │◄────│  frontend             │
│  Rust + Axum 0.7     │     │  Leptos 0.6 CSR/WASM  │
│  Port 9022           │     │  Port 9023 (dev)       │
└──────────┬──────────┘     └──────────────────────┘
           │                         │
           │    claude-admin-shared  │
           │    (współdzielone typy) │
           │                         │
           ▼                         │
   ~/.claude/  (system plików)       │
                                     │
   W produkcji frontend WASM         │
   jest wbudowany w binarkę backendu │
   za pomocą rust-embed.             │
```

- **Brak bazy danych** — odczytuje i zapisuje dane w systemie plików (`~/.claude/`)
- **Automatyczne kopie zapasowe** — tworzone w `~/.claude/backups/` przed każdą operacją zapisu, z sygnaturą czasową per plik
- **Claude API opcjonalne** — działa w pełni bez `ANTHROPIC_API_KEY`
- **Pojedyncza binarka** — kompilacja produkcyjna osadza frontend za pomocą `rust-embed`

## Bezpieczeństwo

ClaudeAdmin działa **lokalnie na Twoim komputerze**. Jest zaprojektowany do użytku jednoosobowego na stacji roboczej deweloperskiej.

- Odczytuje i zapisuje dane wyłącznie w `~/.claude/` i `~/.claude.json`
- Brak telemetrii, analityki i zdalnych wywołań (poza opcjonalnym Anthropic API, jeśli skonfigurowane)
- **Opcjonalne uwierzytelnianie** — ustaw `CLAUDE_ADMIN_TOKEN`, aby włączyć uwierzytelnianie tokenem Bearer z zarządzaniem sesjami
- **RBAC** — Opcjonalna kontrola dostępu oparta na rolach przez `~/.claude/users.json` (Admin, Edytor, Czytelnik)
- Nagłówki bezpieczeństwa: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff
- Ograniczanie szybkości na wszystkich punktach końcowych API
- Ochrona przed atakami path traversal

## Pierwsze kroki

### Wymagania wstępne

- [Rust](https://rustup.rs/) (stable)
- [Trunk](https://trunkrs.dev/) do kompilacji WASM: `cargo install trunk`
- Cel WASM: `rustup target add wasm32-unknown-unknown`

### Środowisko deweloperskie

```bash
# Sklonuj i wejdź do projektu
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# Uruchom backend
cargo run -p claude-admin-backend

# W osobnym terminalu: uruchom frontend z hot-reload
cd claude-admin-frontend && trunk serve --port 9023
```

Backend: `http://localhost:9022` — Frontend: `http://localhost:9023`

### Kompilacja produkcyjna

```bash
# Skompiluj frontend WASM
cd claude-admin-frontend && trunk build --release && cd ..

# Skompiluj backend (osadza frontend)
cargo build --release -p claude-admin-backend

# Uruchom pojedynczą binarkę
./target/release/claude-admin-backend
```

Gotowe binarki dla systemu Linux, macOS i Windows są dostępne na stronie [Releases](https://github.com/conradBruchmann/claude-admin/releases).

### Instalacja na macOS

Pobierz plik `.dmg` z najnowszego wydania, otwórz go i przeciągnij **ClaudeAdmin.app** do `/Applications`.

Ponieważ aplikacja nie jest podpisana certyfikatem Apple Developer, macOS Gatekeeper zablokuje ją przy pierwszym uruchomieniu. Aby to zmienić, uruchom:

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

Następnie kliknij dwukrotnie aplikację — uruchomi serwer i otworzy `http://localhost:9022` w przeglądarce. DMG zawiera Universal Binary, który działa natywnie zarówno na Makach z procesorami Intel, jak i Apple Silicon.

### Instalacja na Windows

Pobierz plik `ClaudeAdmin-*-Setup.exe` z najnowszego wydania i uruchom instalator. Instaluje się w profilu użytkownika (bez uprawnień administratora), tworzy skróty w menu Start i na pulpicie oraz rejestruje się w sekcji „Aplikacje i funkcje" umożliwiając czyste odinstalowanie.

Po instalacji uruchom ClaudeAdmin z menu Start lub pulpitu — uruchomi serwer i otworzy `http://localhost:9022` w przeglądarce.

## Ścieżki konfiguracji

ClaudeAdmin odczytuje i zapisuje standardową konfigurację Claude Code:

| Ścieżka                                | Opis                                              |
| -------------------------------------- | ------------------------------------------------- |
| `~/.claude.json`                       | Rejestr projektów, serwery MCP                    |
| `~/.claude/settings.json`              | Globalne ustawienia, hooki                        |
| `~/.claude/skills/`                    | Globalne umiejętności                             |
| `~/.claude/rules/`                     | Globalne reguły                                   |
| `~/.claude/plans/`                     | Pliki planów                                      |
| `~/.claude/projects/<encoded>/memory/` | Pamięć per projekt                                |
| `~/.claude/projects/<encoded>/rules/`  | Reguły per projekt                                |
| `~/.claude/system-prompts/`            | Prompty systemowe wielokrotnego użytku            |
| `~/.claude/agents/`                    | Definicje niestandardowych agentów                |
| `~/.claude/launch-profiles/`           | Profile uruchomieniowe CLI                        |
| `~/.claude/backups/`                   | Automatyczne kopie zapasowe (z sygnaturą czasową) |
| `~/.claude/users.json`                 | Role użytkowników RBAC (opcjonalne)               |

## Licencja

[MIT](LICENSE) — Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
