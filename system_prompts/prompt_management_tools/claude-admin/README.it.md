🌍 [English](README.md) | [Deutsch](README.de.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | **Italiano** | [日本語](README.ja.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [Polski](README.pl.md) | [Türkçe](README.tr.md)

# ClaudeAdmin

Una console di amministrazione web per gestire la configurazione di [Claude Code](https://claude.com/claude-code).

Quando si lavora con più di una manciata di progetti, tenere traccia di skill, regole, file di memoria, server MCP e impostazioni all'interno di `~/.claude/` diventa complicato. ClaudeAdmin offre un'unica interfaccia per gestire tutto — senza più modificare manualmente JSON e YAML.

> **Nota:** Questo è un progetto comunitario indipendente. Non è affiliato né approvato da Anthropic.

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## Funzionalità

- **Dashboard** — Panoramica con statistiche, modifiche recenti e accesso rapido ai progetti
- **Progetti** — Sfoglia i progetti, modifica CLAUDE.md, gestisci regole, skill, memoria e permessi per progetto
- **Consulente di progetto** — Analisi basata sull'IA con azioni a un clic (crea CLAUDE.md, inizializza memoria, aggiungi regole)
- **Skill** — Crea, modifica e sfoglia le skill globali (YAML frontmatter + markdown)
- **Browser delle Skill** — Scopri e installa skill della community con un clic
- **Regole** — Gestisci regole globali e a livello di progetto con rilevamento conflitti
- **Memoria** — Visualizza e modifica i file di memoria per progetto (MEMORY.md + file per argomento)
- **Server MCP** — Gestione completa con modulo strutturato (comando/args/env) o JSON grezzo, controlli di salute ed esploratore di strumenti
- **Browser MCP** — Scopri e installa server MCP popolari da un catalogo curato
- **Agenti** — Definisci agenti Claude personalizzati con prompt e configurazioni di strumenti specifiche
- **Plugin** — Gestisci i plugin Claude Code installati
- **Profili di avvio** — Configurazioni CLI riutilizzabili (modello, impegno, strumenti, budget)
- **Prompt di sistema** — Crea e gestisci prompt di sistema riutilizzabili
- **Timeline** — Cronologia delle versioni basata su Git della configurazione `~/.claude/` con visualizzatore diff e ripristino
- **Impostazioni** — Modifica impostazioni globali, hook, chiave API, panoramica dello storage
- **Permessi** — Esamina permessi degli strumenti, avvisi di sicurezza e stato della configurazione
- **Piani** — Gestisci i file di piano
- **Sessioni** — Sfoglia la cronologia delle sessioni con ricerca
- **Analisi** — Metriche di utilizzo, approfondimenti per progetto ed esportazione CSV/JSON
- **Worktree** — Visualizza e gestisci i worktree Git tra i progetti
- **Ricerca** — Ricerca full-text su skill, regole e configurazione
- **Chat di aiuto** — Assistente IA contestuale con memoria delle conversazioni
- **Backup** — Sfoglia, confronta e ripristina i backup automatici
- **12 lingue** — Internazionalizzazione completa: inglese, tedesco, spagnolo, francese, italiano, giapponese, coreano, cinese, olandese, polacco, portoghese, turco

## Architettura

```
┌─────────────────────┐     ┌──────────────────────┐
│  claude-admin-       │     │  claude-admin-        │
│  backend             │◄────│  frontend             │
│  Rust + Axum 0.7     │     │  Leptos 0.6 CSR/WASM  │
│  Port 9022           │     │  Port 9023 (dev)       │
└──────────┬──────────┘     └──────────────────────┘
           │                         │
           │    claude-admin-shared  │
           │    (tipi condivisi)     │
           │                         │
           ▼                         │
   ~/.claude/  (filesystem)          │
                                     │
   In produzione, il frontend WASM   │
   è incorporato nel binario del     │
   backend tramite rust-embed.       │
```

- **Nessun database** — legge e scrive nel filesystem (`~/.claude/`)
- **Backup automatici** — creati in `~/.claude/backups/` prima di ogni operazione di scrittura, con timestamp per file
- **Claude API opzionale** — funziona completamente senza `ANTHROPIC_API_KEY`
- **Binario unico** — la build di produzione incorpora il frontend tramite `rust-embed`

## Sicurezza

ClaudeAdmin viene eseguito **localmente sul tuo computer**. È progettato per l'uso da parte di un singolo utente su una workstation di sviluppo.

- Legge e scrive esclusivamente sotto `~/.claude/` e `~/.claude.json`
- Nessuna telemetria, nessuna analisi, nessuna chiamata remota (eccetto l'API Anthropic opzionale, se configurata)
- **Autenticazione opzionale** — imposta `CLAUDE_ADMIN_TOKEN` per abilitare l'autenticazione con token Bearer e gestione delle sessioni
- **RBAC** — Controllo degli accessi basato sui ruoli opzionale tramite `~/.claude/users.json` (Admin, Editor, Viewer)
- Header di sicurezza: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff
- Rate limiting su tutti gli endpoint API
- Protezione contro il path traversal

## Per Iniziare

### Prerequisiti

- [Rust](https://rustup.rs/) (stabile)
- [Trunk](https://trunkrs.dev/) per le build WASM: `cargo install trunk`
- Target WASM: `rustup target add wasm32-unknown-unknown`

### Sviluppo

```bash
# Clona e accedi al progetto
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# Avvia il backend
cargo run -p claude-admin-backend

# In un terminale separato: avvia il frontend con hot-reload
cd claude-admin-frontend && trunk serve --port 9023
```

Backend: `http://localhost:9022` — Frontend: `http://localhost:9023`

### Build di Produzione

```bash
# Compila il frontend WASM
cd claude-admin-frontend && trunk build --release && cd ..

# Compila il backend (incorpora il frontend)
cargo build --release -p claude-admin-backend

# Esegui il binario unico
./target/release/claude-admin-backend
```

I binari precompilati per Linux, macOS e Windows sono disponibili nella pagina [Releases](https://github.com/conradBruchmann/claude-admin/releases).

### Installazione su macOS

Scarica il file `.dmg` dall'ultima release, aprilo e trascina **ClaudeAdmin.app** in `/Applications`.

Poiché l'app non è firmata con un certificato Apple Developer, macOS Gatekeeper la bloccherà al primo avvio. Per consentirne l'esecuzione, esegui:

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

Quindi fai doppio clic sull'app — avvia il server e apre `http://localhost:9022` nel browser. Il DMG contiene un Universal Binary che funziona nativamente sia su Mac Intel che su Apple Silicon.

### Installazione su Windows

Scarica il file `ClaudeAdmin-*-Setup.exe` dall'ultima release ed esegui il programma di installazione. Si installa nel profilo utente (senza necessità di diritti amministrativi), crea collegamenti nel menu Start e sul desktop, e si registra in "App e funzionalità" per una disinstallazione pulita.

Dopo l'installazione, avvia ClaudeAdmin dal menu Start o dal desktop — avvia il server e apre `http://localhost:9022` nel browser.

## Percorsi di Configurazione

ClaudeAdmin legge e scrive la configurazione standard di Claude Code:

| Percorso                               | Descrizione                          |
| -------------------------------------- | ------------------------------------ |
| `~/.claude.json`                       | Registro dei progetti, server MCP    |
| `~/.claude/settings.json`              | Impostazioni globali, hook           |
| `~/.claude/skills/`                    | Skill globali                        |
| `~/.claude/rules/`                     | Regole globali                       |
| `~/.claude/plans/`                     | File di piano                        |
| `~/.claude/projects/<encoded>/memory/` | Memoria per progetto                 |
| `~/.claude/projects/<encoded>/rules/`  | Regole per progetto                  |
| `~/.claude/system-prompts/`            | Prompt di sistema riutilizzabili     |
| `~/.claude/agents/`                    | Definizioni di agenti personalizzati |
| `~/.claude/launch-profiles/`           | Profili di avvio CLI                 |
| `~/.claude/backups/`                   | Backup automatici (con timestamp)    |
| `~/.claude/users.json`                 | Ruoli utente RBAC (opzionale)        |

## Licenza

[MIT](LICENSE) — Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
