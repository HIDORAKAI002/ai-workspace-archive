# arquiteto-de-empresa

Plugin standalone do **Arquiteto de Empresa** — constrói um negócio do zero como um **bundle OKF** (Open Knowledge Format): uma árvore de arquivos `.md` versionáveis, com frontmatter `type`, links formando grafo, e `index.md`/`log.md` reservados — legível por humanos e por agentes de IA.

**Dual-published:** também empacotado dentro de `c-level-skills` (`./c-level-advisor`). O conteúdo em `./skills/arquiteto-de-empresa/` espelha `../skills/arquiteto-de-empresa/`; `scripts/sync_skill_bundles.py` mantém os dois em sincronia.

Veja `./skills/arquiteto-de-empresa/SKILL.md` para a documentação completa.

## O que faz

Conduz o fundador por uma **entrevista de 12 fases** (fundação → estratégia → mercado → financeiro → comercial → marketing → produto → operações → tech → pessoas → jurídico → governança), uma fase por vez, e materializa cada resposta como conceitos markdown conformantes ao OKF.

## Ferramentas (stdlib, sem LLM)

- `scaffold_bundle.py` — cria a árvore de pastas OKF + `index.md`/`log.md`.
- `okf_linter.py` — valida `type` nos conceitos, arquivos reservados e links.
- `index_generator.py` — (re)gera as tabelas dos `index.md`.

Idioma: **português do Brasil**.
