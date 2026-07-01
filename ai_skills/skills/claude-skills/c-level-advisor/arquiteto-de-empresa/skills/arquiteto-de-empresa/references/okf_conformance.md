# Conformância OKF (Open Knowledge Format v0.1)

Referência das regras que tornam a saída do Arquiteto de Empresa um **bundle OKF conformante** — uma base de conhecimento legível por humanos e por agentes, sem camada de tradução.

## O que é um bundle OKF

Um **bundle** é um diretório de arquivos Markdown (`.md`). Cada arquivo representa **um conceito**. A identidade canônica do conceito é o seu **caminho relativo sem a extensão**:

```
03-financeiro/unit-economics.md   →  conceito "03-financeiro/unit-economics"
```

A hierarquia de pastas é só organização física. A estrutura **semântica** real emerge dos **links** entre conceitos (o grafo), que costuma ser mais rica que a árvore de pastas.

## Regra 1 — Cada arquivo é um conceito

Um arquivo, um conceito. Não junte "estratégia + financeiro" num só `.md`. Se um conceito fica grande demais, quebre em conceitos menores e ligue-os por links. Isso mantém o grafo navegável e os diffs legíveis em versionamento (git).

## Regra 2 — Frontmatter YAML com `type` obrigatório

Todo arquivo **de conceito** abre com um bloco `---` de frontmatter YAML contendo, no mínimo, o campo `type`. Os demais campos são opcionais e chaves extras são toleradas.

```yaml
---
type: Modelo Financeiro          # OBRIGATÓRIO — ver type_vocabulary.md
title: Unit Economics
description: CAC, LTV, payback e margem de contribuição
tags: [financeiro, metricas]
timestamp: 2026-06-19T10:00:00Z  # ISO 8601, último update significativo
resource: https://docs.google.com/spreadsheets/d/...   # URI canônica, se houver
status: rascunho                  # extra tolerado: rascunho | em-revisao | aprovado
versao: 0.1                       # extra tolerado
---
```

O valor de `type` vem de um vocabulário controlado e consistente — ver [`type_vocabulary.md`](type_vocabulary.md). É o `type` que permite a um agente filtrar "todos os conceitos do tipo `Persona`" sem ler o corpo.

## Regra 3 — Relações são links markdown no corpo

Conceitos se ligam com **links markdown normais** dentro do texto:

```markdown
A precificação deriva da [Proposta de Valor](../01-estrategia/proposta-de-valor.md)
e alimenta as [Projeções](projecoes.md).
```

Esses links formam o **grafo de conhecimento**. **Não** declare dependências como arrays no frontmatter — o grafo vive no corpo, onde o link tem contexto. Prefira caminhos relativos (resilientes a mover o bundle).

## Regra 4 — `index.md` e `log.md` são reservados

Dois nomes têm semântica especial e **não** carregam `type`:

- **`index.md`** — listagem/sumário do conteúdo da pasta (progressive disclosure). Cada pasta tem o seu; o `index.md` raiz é o painel do bundle inteiro.
- **`log.md`** — histórico append-only de mudanças e decisões. Normalmente só na raiz.

Um linter conformante trata como erro um `index.md`/`log.md` que tenha `type`, e como erro um conceito que **não** tenha.

## Regra 5 — Legível por humano e máquina

Markdown puro. Sem runtime, sem SDK, sem banco. Um humano lê no editor; um agente lê o mesmo arquivo e o frontmatter dá a ele a estrutura. Essa é a tese do formato: **a documentação é a interface**, igual para os dois.

## Convenções de nomenclatura

- Minúsculas, sem acento, hífen no lugar de espaço: `unit-economics.md`, `proposta-de-valor.md`.
- SOPs no formato `SOP-01-nome-do-processo.md`.
- Pastas numeradas por fase: `00-fundacao`, `01-estrategia`, … `11-governanca`.
- Toda pasta tem um `index.md`.

## Conteúdo dos arquivos reservados

- **`index.md` de pasta:** 1 parágrafo de propósito da área + tabela `| Conceito | O que é | type | status |` com link para cada arquivo.
- **`log.md` raiz:** entradas cronológicas `## 2026-06-19T10:00:00Z — <título>` com: o que mudou, decisão tomada, alternativas descartadas, motivo.

## Checklist de conformância (o que o linter verifica)

- [ ] Todo conceito (`.md` que não seja `index.md`/`log.md`) tem frontmatter com `type` não vazio.
- [ ] `type` pertence ao vocabulário de [`type_vocabulary.md`](type_vocabulary.md).
- [ ] `index.md` e `log.md` **não** têm `type`.
- [ ] Links markdown relativos resolvem para arquivos existentes.
- [ ] Nomes em kebab-case, sem acento/espaço.
- [ ] Toda pasta tem `index.md`.

## Fontes

1. **Open Knowledge Format (OKF) v0.1** — especificação aberta para empacotar conhecimento como Markdown + YAML frontmatter, originada no contexto Google Cloud / agentes de IA.
2. **agentskills.io — SKILL.md standard** — convenção de `SKILL.md` com frontmatter YAML adotada por Claude Code, Codex, Gemini CLI e Hermes Agent (mesmo contrato deste repositório).
3. **CommonMark Spec** (https://spec.commonmark.org/) — base de Markdown portável usada nos corpos dos conceitos.
4. **YAML 1.2 Spec** (https://yaml.org/spec/1.2.2/) — sintaxe do frontmatter.
5. **ISO 8601** — formato de `timestamp` (`2026-06-19T10:00:00Z`).
6. **Zettelkasten / Niklas Luhmann** — princípio de "uma nota = um conceito" e conhecimento como grafo de links, fundamento conceitual do bundle.
7. **Docs-as-Code** (Anne Gentle, *Docs Like Code*) — documentação versionada, revisada e construída como software; justifica o bundle em git.
