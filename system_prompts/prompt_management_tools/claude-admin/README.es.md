🌍 [English](README.md) | [Deutsch](README.de.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | **Español** | [Français](README.fr.md) | [Italiano](README.it.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [Polski](README.pl.md) | [Türkçe](README.tr.md)

# ClaudeAdmin

Una consola de administración web para gestionar tu configuración de [Claude Code](https://claude.com/claude-code).

Cuando trabajas con más de unos pocos proyectos, llevar el control de habilidades, reglas, archivos de memoria, servidores MCP y configuraciones en `~/.claude/` se vuelve tedioso. ClaudeAdmin te ofrece una única interfaz para gestionarlo todo — sin necesidad de editar JSON y YAML a mano.

> **Nota:** Este es un proyecto comunitario independiente. No está afiliado ni respaldado por Anthropic.

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## Funcionalidades

- **Panel de control** — Resumen con estadísticas, cambios recientes y acceso rápido a proyectos
- **Proyectos** — Explora proyectos, edita CLAUDE.md, gestiona reglas, habilidades, memoria y permisos por proyecto
- **Asesor de proyectos** — Análisis impulsado por IA con acciones de un clic (crear CLAUDE.md, iniciar memoria, agregar reglas)
- **Habilidades** — Crea, edita y explora habilidades globales (YAML frontmatter + markdown)
- **Explorador de habilidades** — Descubre e instala habilidades de la comunidad con un solo clic
- **Reglas** — Gestiona reglas globales y por proyecto con detección de conflictos
- **Memoria** — Visualiza y edita archivos de memoria por proyecto (MEMORY.md + archivos de temas)
- **Servidores MCP** — Gestión completa con formulario estructurado (command/args/env) o JSON crudo, verificaciones de salud y explorador de herramientas
- **Explorador MCP** — Descubre e instala servidores MCP populares desde un catálogo curado
- **Agentes** — Define agentes Claude personalizados con prompts y configuraciones de herramientas específicas
- **Plugins** — Gestiona los plugins de Claude Code instalados
- **Perfiles de lanzamiento** — Configuraciones CLI reutilizables (modelo, esfuerzo, herramientas, presupuesto)
- **Prompts de sistema** — Crea y gestiona prompts de sistema reutilizables
- **Línea de tiempo** — Historial de versiones basado en Git de tu configuración `~/.claude/` con visor de diferencias y restauración
- **Configuración** — Edita configuración global, hooks, clave API, resumen de almacenamiento
- **Permisos** — Revisa permisos de herramientas, advertencias de seguridad y salud de la configuración
- **Planes** — Gestiona archivos de planes
- **Sesiones** — Explora el historial de sesiones con búsqueda
- **Analíticas** — Métricas de uso, información por proyecto y exportación CSV/JSON
- **Worktrees** — Visualiza y gestiona git worktrees a través de proyectos
- **Búsqueda** — Búsqueda de texto completo en habilidades, reglas y configuración
- **Chat de ayuda** — Asistente IA contextual con memoria de conversación
- **Copias de seguridad** — Explora, compara y restaura copias de seguridad automáticas
- **12 idiomas** — Internacionalización completa: inglés, alemán, español, francés, italiano, japonés, coreano, chino, neerlandés, polaco, portugués, turco

## Arquitectura

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

- **Sin base de datos** — lee y escribe directamente en el sistema de archivos (`~/.claude/`)
- **Copias de seguridad automáticas** — creadas en `~/.claude/backups/` antes de cada operación de escritura, con marca de tiempo por archivo
- **API de Claude opcional** — funciona completamente sin `ANTHROPIC_API_KEY`
- **Binario único** — la compilación de producción integra el frontend mediante `rust-embed`

## Seguridad

ClaudeAdmin se ejecuta **localmente en tu máquina**. Está diseñado para uso de un solo usuario en una estación de trabajo de desarrollo.

- Lee y escribe únicamente en `~/.claude/` y `~/.claude.json`
- Sin telemetría, sin analíticas, sin llamadas remotas (excepto la API de Anthropic opcional si está configurada)
- **Autenticación opcional** — establece `CLAUDE_ADMIN_TOKEN` para habilitar autenticación con token Bearer y gestión de sesiones
- **RBAC** — Control de acceso basado en roles opcional mediante `~/.claude/users.json` (Admin, Editor, Viewer)
- Encabezados de seguridad: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff
- Limitación de tasa en todos los endpoints de la API
- Protección contra path traversal

## Primeros pasos

### Requisitos previos

- [Rust](https://rustup.rs/) (estable)
- [Trunk](https://trunkrs.dev/) para compilaciones WASM: `cargo install trunk`
- Objetivo WASM: `rustup target add wasm32-unknown-unknown`

### Desarrollo

```bash
# Clonar y entrar al proyecto
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# Iniciar el backend
cargo run -p claude-admin-backend

# En una terminal separada: iniciar el frontend con recarga en caliente
cd claude-admin-frontend && trunk serve --port 9023
```

Backend: `http://localhost:9022` — Frontend: `http://localhost:9023`

### Compilación de producción

```bash
# Compilar el frontend WASM
cd claude-admin-frontend && trunk build --release && cd ..

# Compilar el backend (integra el frontend)
cargo build --release -p claude-admin-backend

# Ejecutar el binario único
./target/release/claude-admin-backend
```

Los binarios precompilados para Linux, macOS y Windows están disponibles en la página de [Releases](https://github.com/conradBruchmann/claude-admin/releases).

### Instalación en macOS

Descarga el archivo `.dmg` de la última versión, ábrelo y arrastra **ClaudeAdmin.app** a `/Applications`.

Como la aplicación no está firmada con un certificado de Apple Developer, macOS Gatekeeper la bloqueará en el primer inicio. Para permitir su ejecución, ejecuta:

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

Luego haz doble clic en la aplicación — inicia el servidor y abre `http://localhost:9022` en tu navegador. El DMG contiene un Binario Universal que se ejecuta de forma nativa tanto en Macs con Intel como con Apple Silicon.

### Instalación en Windows

Descarga el archivo `ClaudeAdmin-*-Setup.exe` de la última versión y ejecuta el instalador. Se instala en tu perfil de usuario (sin necesidad de permisos de administrador), crea accesos directos en el Menú Inicio y en el Escritorio, y se registra en "Aplicaciones y características" para una desinstalación limpia.

Tras la instalación, inicia ClaudeAdmin desde el Menú Inicio o el Escritorio — inicia el servidor y abre `http://localhost:9022` en tu navegador.

## Rutas de configuración

ClaudeAdmin lee y escribe la configuración estándar de Claude Code:

| Ruta                                   | Descripción                                           |
| -------------------------------------- | ----------------------------------------------------- |
| `~/.claude.json`                       | Registro de proyectos, servidores MCP                 |
| `~/.claude/settings.json`              | Configuración global, hooks                           |
| `~/.claude/skills/`                    | Habilidades globales                                  |
| `~/.claude/rules/`                     | Reglas globales                                       |
| `~/.claude/plans/`                     | Archivos de planes                                    |
| `~/.claude/projects/<encoded>/memory/` | Memoria por proyecto                                  |
| `~/.claude/projects/<encoded>/rules/`  | Reglas por proyecto                                   |
| `~/.claude/system-prompts/`            | Prompts de sistema reutilizables                      |
| `~/.claude/agents/`                    | Definiciones de agentes personalizados                |
| `~/.claude/launch-profiles/`           | Perfiles de lanzamiento CLI                           |
| `~/.claude/backups/`                   | Copias de seguridad automáticas (con marca de tiempo) |
| `~/.claude/users.json`                 | Roles de usuario RBAC (opcional)                      |

## Licencia

[MIT](LICENSE) — Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
