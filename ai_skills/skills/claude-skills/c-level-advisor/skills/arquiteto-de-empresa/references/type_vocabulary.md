# Vocabulário de `type` e estrutura do bundle

Vocabulário **controlado** do campo `type` do frontmatter. Use exatamente estes valores para que agentes possam filtrar conceitos por tipo de forma consistente. As regras de frontmatter estão em [`okf_conformance.md`](okf_conformance.md).

## Tabela pasta → conceito → `type`

| Pasta | Conceitos (arquivos) | `type` |
|---|---|---|
| `00-fundacao` | `identidade`, `manifesto` | `Fundação` |
| `00-fundacao` | `problema-solucao` | `Problema-Solução` |
| `01-estrategia` | `business-model-canvas`, `proposta-de-valor`, `posicionamento`, `vantagem-competitiva` | `Estratégia` |
| `02-mercado` | `analise-mercado`, `concorrentes`, `swot` | `Análise de Mercado` |
| `02-mercado` | `icp-personas` | `Persona` |
| `03-financeiro` | `modelo-receita`, `estrutura-custos`, `precificacao`, `unit-economics`, `projecoes` | `Modelo Financeiro` |
| `04-comercial` | `funil-vendas`, `processo-comercial`, `metas-comerciais` | `Processo Comercial` |
| `04-comercial` | `playbook-vendas` | `Playbook` |
| `05-marketing` | `branding` | `Marca` |
| `05-marketing` | `estrategia-conteudo`, `canais`, `calendario-editorial` | `Estratégia de Conteúdo` |
| `06-produto` | `prd`, `roadmap`, `features` | `Documento de Produto` |
| `07-operacoes` | `processos` | `Processo` |
| `07-operacoes` | `sops/SOP-XX-*` | `Runbook` |
| `07-operacoes` | `stack-ferramentas`, `fornecedores` | `Recurso Operacional` |
| `08-tech` | `arquitetura`, `stack`, `infraestrutura` | `Arquitetura` |
| `09-pessoas` | `organograma`, `funcoes-responsabilidades`, `cultura`, `plano-contratacao` | `Organização` |
| `10-juridico` | `estrutura-societaria`, `compliance`, `contratos/*` | `Documento Jurídico` |
| `11-governanca` | `okrs` | `OKR` |
| `11-governanca` | `metricas` | `Métrica` |
| `11-governanca` | `rituais` | `Ritual` |

> Os scripts `okf_linter.py` e `scaffold_bundle.py` carregam exatamente este mapa pasta→type. Ao adicionar um conceito novo, ou ele cai num `type` existente, ou você estende o vocabulário aqui **e** nos scripts.

## Template de frontmatter (todo conceito)

```yaml
---
type: <um valor da tabela acima>   # OBRIGATÓRIO
title: <Nome de exibição>
description: <Resumo em 1 linha>
tags: [<tag>, <tag>]
timestamp: 2026-06-19T10:00:00Z     # ISO 8601
resource: <URI canônica, se houver — planilha, doc, repo, dashboard>
status: rascunho                    # rascunho | em-revisao | aprovado
versao: 0.1
---
```

## Árvore de referência do bundle

```
{nome-empresa}/
├── index.md            # painel + listagem raiz (reservado, sem type)
├── log.md              # histórico de decisões (reservado, sem type)
├── 00-fundacao/        # identidade, problema-solucao, manifesto
├── 01-estrategia/      # business-model-canvas, proposta-de-valor, posicionamento, vantagem-competitiva
├── 02-mercado/         # analise-mercado, concorrentes, icp-personas, swot
├── 03-financeiro/      # modelo-receita, estrutura-custos, precificacao, unit-economics, projecoes
├── 04-comercial/       # funil-vendas, processo-comercial, playbook-vendas, metas-comerciais
├── 05-marketing/       # branding, estrategia-conteudo, canais, calendario-editorial
├── 06-produto/         # prd, roadmap, features   (pular se serviço puro)
├── 07-operacoes/       # processos, stack-ferramentas, fornecedores, sops/SOP-XX-*
├── 08-tech/            # arquitetura, stack, infraestrutura   (só se houver infra digital)
├── 09-pessoas/         # organograma, funcoes-responsabilidades, cultura, plano-contratacao
├── 10-juridico/        # estrutura-societaria, compliance, contratos/*
└── 11-governanca/      # okrs, rituais, metricas
```

Cada pasta tem o seu `index.md`. As pastas `06-produto` e `08-tech` são condicionais (produto/infra digital).

## Nomenclatura (resumo)

- Minúsculas, sem acento, hífen no lugar de espaço (`unit-economics.md`).
- SOPs: `SOP-01-nome-do-processo.md` (`type: Runbook`).
- Contratos: arquivos sob `10-juridico/contratos/` (`type: Documento Jurídico`); incluir sempre no corpo: *"documentos-base, não substituem revisão de advogado".*
