---
name: "cs-arquiteto"
description: "/cs:arquiteto — Constrói uma empresa do zero como bundle OKF (árvore de .md com type + grafo de links). Conduz a entrevista de 12 fases, uma de cada vez, e gera os conceitos markdown conformantes. Em português do Brasil."
---

# /cs:arquiteto — Arquiteto de Empresa

**Comando:** `/cs:arquiteto`

## Quando rodar

- Quer criar/estruturar/documentar uma empresa inteira como pastas e arquivos `.md`.
- Quer uma base de conhecimento da empresa que humanos e agentes de IA leiam sem tradução.
- Está começando um negócio do zero e quer a "planta" antes da operação.

## O que você recebe

Um **bundle OKF** conformante: árvore de pastas das 12 fases, cada conceito como `.md` com frontmatter `type`, ligados por links markdown, mais `index.md` (painel) e `log.md` (decisões).

## Gatilhos (auto-invocação sem digitar /cs:)

- "quero montar minha empresa do zero"
- "cria a empresa em formato de pastas"
- "documenta meu negócio como código"
- "base de conhecimento da empresa para os agentes lerem"
- "empresa como wiki para IA", "OKF", "bundle de conhecimento"

## Disciplina

- Entrevista antes de construir; uma fase por vez; 3-5 perguntas por bloco.
- Confirma a lista de arquivos (+ `type`) antes de escrever.
- Atualiza `index.md` raiz e `log.md` a cada fase.

## Fluxo

1. Pergunta o nome do bundle (empresa/pasta raiz).
2. Roda `scaffold_bundle.py "<nome>" --out ./<slug>` (ou monta as pastas à mão).
3. Inicia a **FASE 0** (descoberta) — só as perguntas dela; para e aguarda.
4. A cada fase: confirma → escreve conceitos → roda `okf_linter.py` + `index_generator.py --write` → mostra o "próximo passo sugerido".

Detalhes em `skills/arquiteto-de-empresa/SKILL.md` e `references/phase_playbook.md`.
