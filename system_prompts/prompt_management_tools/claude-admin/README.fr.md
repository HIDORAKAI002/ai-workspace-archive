🌍 [English](README.md) | [Deutsch](README.de.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Español](README.es.md) | **Français** | [Italiano](README.it.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [Polski](README.pl.md) | [Türkçe](README.tr.md)

# ClaudeAdmin

Une console d'administration web pour gérer votre configuration [Claude Code](https://claude.com/claude-code).

Dès que vous travaillez sur plus d'une poignée de projets, suivre les compétences, les règles, les fichiers mémoire, les serveurs MCP et les paramètres dans `~/.claude/` devient fastidieux. ClaudeAdmin vous offre une interface unique pour tout gérer — plus besoin d'éditer manuellement des fichiers JSON et YAML.

> **Remarque :** Il s'agit d'un projet communautaire indépendant. Non affilié à Anthropic ni approuvé par Anthropic.

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## Fonctionnalités

- **Tableau de bord** — Vue d'ensemble avec statistiques, changements récents et accès rapide aux projets
- **Projets** — Parcourir les projets, éditer CLAUDE.md, gérer les règles, compétences, mémoire et permissions par projet
- **Conseiller de projet** — Analyse assistée par IA avec actions en un clic (créer CLAUDE.md, initialiser la mémoire, ajouter des règles)
- **Compétences** — Créer, éditer et parcourir les compétences globales (YAML frontmatter + markdown)
- **Navigateur de compétences** — Découvrir et installer des compétences communautaires en un clic
- **Règles** — Gérer les règles globales et par projet avec détection de conflits
- **Mémoire** — Consulter et éditer les fichiers mémoire par projet (MEMORY.md + fichiers thématiques)
- **Serveurs MCP** — Gestion complète avec formulaire structuré (commande/args/env) ou JSON brut, vérifications de santé et explorateur d'outils
- **Navigateur MCP** — Découvrir et installer des serveurs MCP populaires depuis un catalogue organisé
- **Agents** — Définir des agents Claude personnalisés avec des prompts et configurations d'outils spécifiques
- **Plugins** — Gérer les plugins Claude Code installés
- **Profils de lancement** — Configurations CLI réutilisables (modèle, effort, outils, budget)
- **Prompts système** — Créer et gérer des prompts système réutilisables
- **Chronologie** — Historique des versions basé sur Git de votre configuration `~/.claude/` avec visualiseur de différences et restauration
- **Paramètres** — Éditer les paramètres globaux, hooks, clé API, aperçu du stockage
- **Permissions** — Consulter les permissions des outils, avertissements de sécurité et état de la configuration
- **Plans** — Gérer les fichiers de plans
- **Sessions** — Parcourir l'historique des sessions avec recherche
- **Analytiques** — Métriques d'utilisation, aperçus par projet et export CSV/JSON
- **Worktrees** — Afficher et gérer les worktrees Git à travers les projets
- **Recherche** — Recherche plein texte dans les compétences, règles et configuration
- **Chat d'aide** — Assistant IA contextuel avec mémoire de conversation
- **Sauvegardes** — Parcourir, comparer et restaurer les sauvegardes automatiques
- **12 langues** — Internationalisation complète : anglais, allemand, espagnol, français, italien, japonais, coréen, chinois, néerlandais, polonais, portugais, turc

## Architecture

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

- **Pas de base de données** — lecture et écriture directement sur le système de fichiers (`~/.claude/`)
- **Sauvegardes automatiques** — créées dans `~/.claude/backups/` avant chaque opération d'écriture, horodatées par fichier
- **API Claude optionnelle** — fonctionne entièrement sans `ANTHROPIC_API_KEY`
- **Binaire unique** — la version de production embarque le frontend via `rust-embed`

## Sécurité

ClaudeAdmin s'exécute **localement sur votre machine**. Il est conçu pour un usage mono-utilisateur sur un poste de travail de développement.

- Lecture et écriture uniquement sous `~/.claude/` et `~/.claude.json`
- Aucune télémétrie, aucune analytique, aucun appel distant (sauf l'API Anthropic optionnelle si configurée)
- **Authentification optionnelle** — définissez `CLAUDE_ADMIN_TOKEN` pour activer l'authentification par jeton Bearer avec gestion de session
- **RBAC** — Contrôle d'accès basé sur les rôles optionnel via `~/.claude/users.json` (Admin, Éditeur, Lecteur)
- En-têtes de sécurité : CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff
- Limitation de débit sur tous les points de terminaison de l'API
- Protection contre le parcours de chemin (path traversal)

## Démarrage

### Prérequis

- [Rust](https://rustup.rs/) (stable)
- [Trunk](https://trunkrs.dev/) pour les compilations WASM : `cargo install trunk`
- Cible WASM : `rustup target add wasm32-unknown-unknown`

### Développement

```bash
# Cloner et entrer dans le projet
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# Démarrer le backend
cargo run -p claude-admin-backend

# Dans un terminal séparé : démarrer le frontend avec rechargement à chaud
cd claude-admin-frontend && trunk serve --port 9023
```

Backend : `http://localhost:9022` — Frontend : `http://localhost:9023`

### Version de production

```bash
# Compiler le frontend WASM
cd claude-admin-frontend && trunk build --release && cd ..

# Compiler le backend (embarque le frontend)
cargo build --release -p claude-admin-backend

# Lancer le binaire unique
./target/release/claude-admin-backend
```

Des binaires pré-compilés pour Linux, macOS et Windows sont disponibles sur la page [Releases](https://github.com/conradBruchmann/claude-admin/releases).

### Installation sur macOS

Téléchargez le fichier `.dmg` depuis la dernière version, ouvrez-le et faites glisser **ClaudeAdmin.app** dans `/Applications`.

L'application n'étant pas signée avec un certificat Apple Developer, macOS Gatekeeper la bloquera au premier lancement. Pour l'autoriser, exécutez :

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

Double-cliquez ensuite sur l'application — elle démarre le serveur et ouvre `http://localhost:9022` dans votre navigateur. Le DMG contient un Universal Binary qui s'exécute nativement sur les Mac Intel et Apple Silicon.

### Installation sur Windows

Téléchargez le fichier `ClaudeAdmin-*-Setup.exe` depuis la dernière version et lancez l'installateur. Il s'installe dans votre profil utilisateur (aucun droit d'administrateur requis), crée des raccourcis dans le menu Démarrer et sur le Bureau, et s'enregistre dans « Applications et fonctionnalités » pour une désinstallation propre.

Après l'installation, lancez ClaudeAdmin depuis le menu Démarrer ou le Bureau — il démarre le serveur et ouvre `http://localhost:9022` dans votre navigateur.

## Chemins de configuration

ClaudeAdmin lit et écrit la configuration standard de Claude Code :

| Chemin                                 | Description                           |
| -------------------------------------- | ------------------------------------- |
| `~/.claude.json`                       | Registre des projets, serveurs MCP    |
| `~/.claude/settings.json`              | Paramètres globaux, hooks             |
| `~/.claude/skills/`                    | Compétences globales                  |
| `~/.claude/rules/`                     | Règles globales                       |
| `~/.claude/plans/`                     | Fichiers de plans                     |
| `~/.claude/projects/<encoded>/memory/` | Mémoire par projet                    |
| `~/.claude/projects/<encoded>/rules/`  | Règles par projet                     |
| `~/.claude/system-prompts/`            | Prompts système réutilisables         |
| `~/.claude/agents/`                    | Définitions d'agents personnalisés    |
| `~/.claude/launch-profiles/`           | Profils de lancement CLI              |
| `~/.claude/backups/`                   | Sauvegardes automatiques (horodatées) |
| `~/.claude/users.json`                 | Rôles utilisateur RBAC (optionnel)    |

## Licence

[MIT](LICENSE) — Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
