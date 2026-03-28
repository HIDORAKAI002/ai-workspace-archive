🌍 [English](README.md) | [Deutsch](README.de.md) | **Nederlands** | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [Polski](README.pl.md) | [Türkçe](README.tr.md)

# ClaudeAdmin

Een webgebaseerde beheerconsole voor het beheren van uw [Claude Code](https://claude.com/claude-code)-configuratie.

Zodra u met meer dan een handvol projecten werkt, wordt het bijhouden van skills, regels, geheugenbestanden, MCP-servers en instellingen verspreid over `~/.claude/` een lastige klus. ClaudeAdmin biedt u één interface om alles te beheren — geen handmatig bewerken van JSON en YAML meer.

> **Opmerking:** Dit is een onafhankelijk communityproject. Niet gelieerd aan of onderschreven door Anthropic.

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## Functies

- **Dashboard** — Overzicht met statistieken, recente wijzigingen en snelle toegang tot projecten
- **Projecten** — Blader door projecten, bewerk CLAUDE.md, beheer regels, skills, geheugen en machtigingen per project
- **Projectadviseur** — AI-gestuurde analyse met één-klik-acties (CLAUDE.md aanmaken, geheugen initialiseren, regels toevoegen)
- **Skills** — Maak globale skills aan, bewerk en blader erdoor (YAML frontmatter + markdown)
- **Skill Browser** — Ontdek en installeer community-skills met één klik
- **Regels** — Beheer globale en projectspecifieke regels met conflictdetectie
- **Geheugen** — Bekijk en bewerk per-project geheugenbestanden (MEMORY.md + onderwerpbestanden)
- **MCP-servers** — Volledig beheer met gestructureerd formulier (command/args/env) of ruwe JSON, statuscontroles en tool-verkenner
- **MCP Browser** — Ontdek en installeer populaire MCP-servers vanuit een samengestelde catalogus
- **Agenten** — Definieer aangepaste Claude-agenten met specifieke prompts en toolconfiguraties
- **Plugins** — Beheer geïnstalleerde Claude Code-plugins
- **Startprofielen** — Herbruikbare CLI-configuraties (model, inspanning, tools, budget)
- **Systeemprompts** — Maak herbruikbare systeemprompts aan en beheer ze
- **Tijdlijn** — Git-gebaseerde versiegeschiedenis van uw `~/.claude/`-configuratie met diff-viewer en herstel
- **Instellingen** — Bewerk globale instellingen, hooks, API-sleutel, opslagoverzicht
- **Machtigingen** — Bekijk toolmachtigingen, beveiligingswaarschuwingen en configuratiestatus
- **Plannen** — Beheer planbestanden
- **Sessies** — Blader door sessiegeschiedenis met zoekfunctie
- **Analyse** — Gebruiksstatistieken, inzichten per project en CSV/JSON-export
- **Worktrees** — Bekijk en beheer git-worktrees over projecten heen
- **Zoeken** — Volledige tekstzoekopdracht over skills, regels en configuratie
- **Helpchat** — Contextbewuste AI-assistent met gespreksgeheugen
- **Back-ups** — Blader door, vergelijk en herstel automatische back-ups
- **12 talen** — Volledige i18n: Engels, Duits, Spaans, Frans, Italiaans, Japans, Koreaans, Chinees, Nederlands, Pools, Portugees, Turks

## Architectuur

```
┌─────────────────────┐     ┌──────────────────────┐
│  claude-admin-       │     │  claude-admin-        │
│  backend             │◄────│  frontend             │
│  Rust + Axum 0.7     │     │  Leptos 0.6 CSR/WASM  │
│  Port 9022           │     │  Port 9023 (dev)       │
└──────────┬──────────┘     └──────────────────────┘
           │                         │
           │    claude-admin-shared  │
           │    (gedeelde typen)     │
           │                         │
           ▼                         │
   ~/.claude/  (bestandssysteem)     │
                                     │
   In productie wordt de WASM-       │
   frontend ingebed in de backend-   │
   binary via rust-embed.            │
```

- **Geen database** — leest van en schrijft naar het bestandssysteem (`~/.claude/`)
- **Automatische back-ups** — aangemaakt in `~/.claude/backups/` vóór elke schrijfbewerking, per bestand voorzien van een tijdstempel
- **Claude API optioneel** — werkt volledig zonder `ANTHROPIC_API_KEY`
- **Enkelvoudige binary** — productiebuild integreert de frontend via `rust-embed`

## Beveiliging

ClaudeAdmin draait **lokaal op uw machine**. Het is ontworpen voor gebruik door één gebruiker op een ontwikkelwerkstation.

- Leest en schrijft uitsluitend onder `~/.claude/` en `~/.claude.json`
- Geen telemetrie, geen analytics, geen externe aanroepen (behalve de optionele Anthropic API indien geconfigureerd)
- **Optionele authenticatie** — stel `CLAUDE_ADMIN_TOKEN` in om Bearer-tokenauthenticatie met sessiebeheer in te schakelen
- **RBAC** — Optionele op rollen gebaseerde toegangscontrole via `~/.claude/users.json` (Admin, Editor, Viewer)
- Beveiligingsheaders: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff
- Snelheidsbeperking op alle API-eindpunten
- Bescherming tegen padtraversie

## Aan de slag

### Vereisten

- [Rust](https://rustup.rs/) (stable)
- [Trunk](https://trunkrs.dev/) voor WASM-builds: `cargo install trunk`
- WASM-target: `rustup target add wasm32-unknown-unknown`

### Ontwikkeling

```bash
# Kloon en ga naar het project
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# Start de backend
cargo run -p claude-admin-backend

# In een apart terminalvenster: start de frontend met hot-reload
cd claude-admin-frontend && trunk serve --port 9023
```

Backend: `http://localhost:9022` — Frontend: `http://localhost:9023`

### Productiebuild

```bash
# Bouw de WASM-frontend
cd claude-admin-frontend && trunk build --release && cd ..

# Bouw de backend (integreert de frontend)
cargo build --release -p claude-admin-backend

# Voer de enkelvoudige binary uit
./target/release/claude-admin-backend
```

Vooraf gebouwde binaries voor Linux, macOS en Windows zijn beschikbaar op de pagina [Releases](https://github.com/conradBruchmann/claude-admin/releases).

### Installatie op macOS

Download het `.dmg`-bestand uit de nieuwste release, open het en sleep **ClaudeAdmin.app** naar `/Applications`.

Omdat de app niet is ondertekend met een Apple Developer-certificaat, blokkeert macOS Gatekeeper de app bij de eerste start. Voer het volgende uit om de app toe te staan:

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

Dubbelklik daarna op de app — de server wordt gestart en `http://localhost:9022` wordt geopend in uw browser. Het DMG-bestand bevat een Universal Binary die zowel op Intel- als Apple Silicon-Macs native draait.

### Installatie op Windows

Download `ClaudeAdmin-*-Setup.exe` uit de nieuwste release en voer het installatieprogramma uit. Het installeert in uw gebruikersprofiel (geen beheerdersrechten vereist), maakt snelkoppelingen in het Startmenu en op het bureaublad aan, en registreert zich in "Apps en onderdelen" voor een schone verwijdering.

Start ClaudeAdmin na de installatie via het Startmenu of het bureaublad — de server wordt gestart en `http://localhost:9022` wordt geopend in uw browser.

## Configuratiepaden

ClaudeAdmin leest en schrijft de standaard Claude Code-configuratie:

| Pad                                    | Beschrijving                            |
| -------------------------------------- | --------------------------------------- |
| `~/.claude.json`                       | Projectregister, MCP-servers            |
| `~/.claude/settings.json`              | Globale instellingen, hooks             |
| `~/.claude/skills/`                    | Globale skills                          |
| `~/.claude/rules/`                     | Globale regels                          |
| `~/.claude/plans/`                     | Planbestanden                           |
| `~/.claude/projects/<encoded>/memory/` | Per-project geheugen                    |
| `~/.claude/projects/<encoded>/rules/`  | Per-project regels                      |
| `~/.claude/system-prompts/`            | Herbruikbare systeemprompts             |
| `~/.claude/agents/`                    | Aangepaste agentdefinities              |
| `~/.claude/launch-profiles/`           | CLI-startprofielen                      |
| `~/.claude/backups/`                   | Automatische back-ups (met tijdstempel) |
| `~/.claude/users.json`                 | RBAC-gebruikersrollen (optioneel)       |

## Licentie

[MIT](LICENSE) — Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
