🌍 [English](README.md) | [Deutsch](README.de.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [日本語](README.ja.md) | **한국어** | [中文](README.zh.md) | [Polski](README.pl.md) | [Türkçe](README.tr.md)

# ClaudeAdmin

[Claude Code](https://claude.com/claude-code) 설정을 관리하기 위한 웹 기반 관리 콘솔입니다.

프로젝트가 일정 수를 넘어서면 `~/.claude/` 전반에 걸친 스킬, 규칙, 메모리 파일, MCP 서버, 설정을 추적하는 것이 번거로워집니다. ClaudeAdmin은 이 모든 것을 관리할 수 있는 단일 UI를 제공합니다 — JSON과 YAML을 직접 편집할 필요가 없습니다.

> **참고:** 이 프로젝트는 독립적인 커뮤니티 프로젝트입니다. Anthropic과 무관하며 Anthropic의 공식 지원을 받지 않습니다.

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## 기능

- **대시보드** — 통계, 최근 변경 사항, 프로젝트 빠른 접근이 포함된 개요
- **프로젝트** — 프로젝트 탐색, CLAUDE.md 편집, 프로젝트별 규칙·스킬·메모리·권한 관리
- **프로젝트 어드바이저** — 원클릭 액션이 포함된 AI 기반 분석 (CLAUDE.md 생성, 메모리 초기화, 규칙 추가)
- **스킬** — 전역 스킬 생성, 편집, 탐색 (YAML 전문 + 마크다운)
- **스킬 브라우저** — 커뮤니티 스킬 검색 및 원클릭 설치
- **규칙** — 충돌 감지 기능이 포함된 전역 및 프로젝트 수준 규칙 관리
- **메모리** — 프로젝트별 메모리 파일 조회 및 편집 (MEMORY.md + 주제 파일)
- **MCP 서버** — 구조화된 폼(command/args/env) 또는 원시 JSON을 통한 전체 관리, 상태 확인 및 도구 탐색기
- **MCP 브라우저** — 큐레이션된 카탈로그에서 인기 MCP 서버 검색 및 설치
- **에이전트** — 특정 프롬프트와 도구 설정으로 커스텀 Claude 에이전트 정의
- **플러그인** — 설치된 Claude Code 플러그인 관리
- **실행 프로필** — 재사용 가능한 CLI 설정 (모델, 노력, 도구, 예산)
- **시스템 프롬프트** — 재사용 가능한 시스템 프롬프트 생성 및 관리
- **타임라인** — Git 기반 `~/.claude/` 설정 버전 이력 (diff 뷰어 및 복원 기능)
- **설정** — 전역 설정, 훅, API 키, 스토리지 개요 편집
- **권한** — 도구 권한, 보안 경고 및 설정 상태 검토
- **플랜** — 플랜 파일 관리
- **세션** — 검색 기능이 포함된 세션 기록 탐색
- **분석** — 사용량 지표, 프로젝트별 인사이트 및 CSV/JSON 내보내기
- **워크트리** — 프로젝트 전반에 걸쳐 Git 워크트리 조회 및 관리
- **검색** — 스킬, 규칙, 설정 전체에 대한 전문 검색
- **도움말 채팅** — 대화 메모리가 포함된 상황 인식 AI 어시스턴트
- **백업** — 자동 백업 탐색, 비교 및 복원
- **12개 언어** — 완전한 i18n: 영어, 독일어, 스페인어, 프랑스어, 이탈리아어, 일본어, 한국어, 중국어, 네덜란드어, 폴란드어, 포르투갈어, 터키어

## 아키텍처

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

- **데이터베이스 없음** — 파일 시스템(`~/.claude/`)에서 읽기 및 쓰기
- **자동 백업** — 모든 쓰기 작업 전 `~/.claude/backups/`에 파일별 타임스탬프와 함께 생성
- **Claude API 선택 사항** — `ANTHROPIC_API_KEY` 없이도 완전하게 작동
- **단일 바이너리** — 프로덕션 빌드 시 `rust-embed`를 통해 프론트엔드가 내장됨

## 보안

ClaudeAdmin은 **로컬 머신에서** 실행됩니다. 개발 워크스테이션의 단일 사용자 환경을 위해 설계되었습니다.

- `~/.claude/` 및 `~/.claude.json` 범위 내에서만 읽기·쓰기 수행
- 텔레메트리, 분석, 원격 호출 없음 (설정된 경우 선택적 Anthropic API 제외)
- **선택적 인증** — `CLAUDE_ADMIN_TOKEN`을 설정하여 Bearer 토큰 인증 및 세션 관리 활성화
- **RBAC** — `~/.claude/users.json`을 통한 선택적 역할 기반 접근 제어 (Admin, Editor, Viewer)
- 보안 헤더: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff
- 모든 API 엔드포인트에 속도 제한 적용
- 경로 순회 공격 보호

## 시작하기

### 사전 요구 사항

- [Rust](https://rustup.rs/) (stable)
- WASM 빌드용 [Trunk](https://trunkrs.dev/): `cargo install trunk`
- WASM 타겟: `rustup target add wasm32-unknown-unknown`

### 개발

```bash
# 프로젝트 클론 및 진입
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# 백엔드 시작
cargo run -p claude-admin-backend

# 별도 터미널에서: 핫 리로드로 프론트엔드 시작
cd claude-admin-frontend && trunk serve --port 9023
```

백엔드: `http://localhost:9022` — 프론트엔드: `http://localhost:9023`

### 프로덕션 빌드

```bash
# WASM 프론트엔드 빌드
cd claude-admin-frontend && trunk build --release && cd ..

# 백엔드 빌드 (프론트엔드 내장)
cargo build --release -p claude-admin-backend

# 단일 바이너리 실행
./target/release/claude-admin-backend
```

Linux, macOS, Windows용 사전 빌드 바이너리는 [Releases](https://github.com/conradBruchmann/claude-admin/releases) 페이지에서 제공됩니다.

### macOS 설치

최신 릴리스에서 `.dmg` 파일을 다운로드하고, 열어서 **ClaudeAdmin.app**을 `/Applications`으로 드래그합니다.

앱이 Apple Developer 인증서로 서명되지 않았기 때문에, macOS Gatekeeper가 첫 실행 시 차단합니다. 허용하려면 다음을 실행하십시오:

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

그런 다음 앱을 더블 클릭하면 서버가 시작되고 브라우저에서 `http://localhost:9022`가 열립니다. DMG에는 Intel 및 Apple Silicon Mac 모두에서 네이티브로 실행되는 유니버설 바이너리가 포함되어 있습니다.

### Windows 설치

최신 릴리스에서 `ClaudeAdmin-*-Setup.exe`를 다운로드하고 설치 프로그램을 실행합니다. 사용자 프로필에 설치되므로 관리자 권한이 필요 없으며, 시작 메뉴 및 바탕 화면 바로 가기를 생성하고 "앱 및 기능"에 등록되어 깔끔하게 제거할 수 있습니다.

설치 후 시작 메뉴 또는 바탕 화면에서 ClaudeAdmin을 실행하면 서버가 시작되고 브라우저에서 `http://localhost:9022`가 열립니다.

## 설정 경로

ClaudeAdmin은 표준 Claude Code 설정을 읽고 씁니다:

| 경로                                   | 설명                          |
| -------------------------------------- | ----------------------------- |
| `~/.claude.json`                       | 프로젝트 레지스트리, MCP 서버 |
| `~/.claude/settings.json`              | 전역 설정, 훅                 |
| `~/.claude/skills/`                    | 전역 스킬                     |
| `~/.claude/rules/`                     | 전역 규칙                     |
| `~/.claude/plans/`                     | 플랜 파일                     |
| `~/.claude/projects/<encoded>/memory/` | 프로젝트별 메모리             |
| `~/.claude/projects/<encoded>/rules/`  | 프로젝트별 규칙               |
| `~/.claude/system-prompts/`            | 재사용 가능한 시스템 프롬프트 |
| `~/.claude/agents/`                    | 커스텀 에이전트 정의          |
| `~/.claude/launch-profiles/`           | CLI 실행 프로필               |
| `~/.claude/backups/`                   | 자동 백업 (타임스탬프)        |
| `~/.claude/users.json`                 | RBAC 사용자 역할 (선택 사항)  |

## 라이선스

[MIT](LICENSE) — Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
