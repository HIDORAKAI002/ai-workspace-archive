# Playbook das 12 fases

Roteiro da entrevista. Conduza **na ordem**. Em cada fase: (a) diga o objetivo em 1 linha, (b) faça as perguntas (3-5 por bloco, numeradas), (c) monte os conceitos, (d) confirme e escreva, (e) atualize `index.md` raiz e `log.md`. Os `type` de cada arquivo estão em [`type_vocabulary.md`](type_vocabulary.md).

---

## FASE 0 — Descoberta (briefing inicial)
**Objetivo:** entender que empresa é essa antes de criar qualquer arquivo.
**Perguntas:**
1. O que a empresa faz (ou vai fazer)?
2. Em que estágio está (ideia / MVP / operando / escalando)?
3. Modelo (serviço, produto, SaaS, marketplace, infoproduto, híbrido)?
4. Setor e jurisdição (país/estado, tipo de PJ se já houver)?
5. Já tem nome e marca?
**Gera:** o esqueleto de pastas (`scaffold_bundle.py`), o `index.md` raiz preenchido e a 1ª entrada no `log.md`.

## FASE 1 — Fundação (`00-fundacao`)
**Objetivo:** ancorar identidade e o problema.
**Perguntas:** Por que a empresa existe (propósito além do lucro)? Que dor específica resolve e para quem? Como é o "mundo melhor" que ela cria? Quais 3–5 valores inegociáveis?
**Gera:** `identidade.md`, `problema-solucao.md`, `manifesto.md`.

## FASE 2 — Estratégia & Modelo de Negócio (`01-estrategia`)
**Objetivo:** desenhar como a empresa cria, entrega e captura valor.
**Perguntas:** Proposta de valor central (o "antes vs depois" do cliente)? Como entra receita (única, recorrência, comissão, ticket)? Estrutura de custos principal? Vantagem que dificulta cópia (dados, marca, rede, processo, custo)?
**Gera:** `business-model-canvas.md`, `proposta-de-valor.md`, `posicionamento.md`, `vantagem-competitiva.md`.

## FASE 3 — Mercado & Inteligência (`02-mercado`)
**Objetivo:** dimensionar oportunidade e mapear o terreno.
**Perguntas:** 3–5 concorrentes/alternativas reais (inclui "não fazer nada")? Tamanho aproximado do mercado e fatia atingível? Cliente ideal (ICP) em uma frase? Tendências a favor/contra?
**Gera:** `analise-mercado.md` (TAM/SAM/SOM), `concorrentes.md`, `icp-personas.md`, `swot.md`.
> Se autorizado e houver busca, valide tamanho de mercado, concorrentes e tendências; cite fontes no corpo e registre URLs em `resource`.

## FASE 4 — Financeiro (`03-financeiro`)
**Objetivo:** transformar o modelo em números.
**Perguntas:** Preço (ou faixa) por produto/serviço e margem estimada? Custos fixos e variáveis mensais? Meta de faturamento nos 12 primeiros meses? Precisa de capital inicial — quanto e de onde?
**Gera:** `modelo-receita.md`, `estrutura-custos.md`, `precificacao.md`, `unit-economics.md` (CAC, LTV, payback, margem), `projecoes.md` (conservador / base / agressivo + break-even).

## FASE 5 — Go-to-Market & Comercial (`04-comercial`)
**Objetivo:** definir como a empresa adquire e fecha clientes.
**Perguntas:** Como o cliente descobre você? Caminho do primeiro contato até o pagamento? Quem vende (você, time, autoatendimento)? Meta de novos clientes/mês?
**Gera:** `funil-vendas.md`, `processo-comercial.md`, `playbook-vendas.md`, `metas-comerciais.md`.

## FASE 6 — Marketing & Marca (`05-marketing`)
**Objetivo:** dar voz, narrativa e canais à empresa.
**Perguntas:** Como a marca deve "soar" (técnico, próximo, premium, irreverente)? 3 pilares de conteúdo? Em que canais o cliente já está? Oferta de entrada (isca/lead magnet)?
**Gera:** `branding.md`, `estrategia-conteudo.md`, `canais.md`, `calendario-editorial.md`.

## FASE 7 — Produto (`06-produto`) — _pular se serviço puro_
**Objetivo:** especificar o que se entrega como produto.
**Perguntas:** Produto/feature núcleo do MVP? O que fica fora da v1? Como o cliente usa no dia a dia? Como medir que está funcionando?
**Gera:** `prd.md`, `roadmap.md`, `features.md`.

## FASE 8 — Operações & Processos (`07-operacoes`)
**Objetivo:** garantir que a empresa funcione sem depender só do fundador.
**Perguntas:** 3–5 processos que não podem falhar (entrega, atendimento, cobrança…)? Ferramentas que sustentam a operação? Quem faz o quê? Gargalos atuais?
**Gera:** `processos.md`, `stack-ferramentas.md`, `fornecedores.md` e `sops/SOP-XX-*.md` dos processos críticos.

## FASE 9 — Tech & Infra (`08-tech`) — _só se houver infra digital_
**Objetivo:** desenhar a base técnica.
**Perguntas:** Stack atual ou desejada? Construir vs contratar? Onde roda (cloud/VPS) e qual escala esperada? Integrações obrigatórias?
**Gera:** `arquitetura.md`, `stack.md`, `infraestrutura.md`.

## FASE 10 — Pessoas & Cultura (`09-pessoas`)
**Objetivo:** estruturar quem toca a empresa.
**Perguntas:** Quem está hoje e qual papel ocupa? 3 próximas contratações por prioridade? Como vocês trabalham (modelo, cadência)? Comportamentos que definem a cultura?
**Gera:** `organograma.md`, `funcoes-responsabilidades.md` (RACI), `cultura.md`, `plano-contratacao.md`.

## FASE 11 — Jurídico & Compliance (`10-juridico`)
**Objetivo:** dar lastro legal à operação.
**Perguntas:** Tipo de PJ e divisão societária (sócios e %)? Sócios/parceiros com contrato a formalizar? Que dados de clientes você trata (LGPD)? Precisa de licença/regulação do setor?
**Gera:** `estrutura-societaria.md`, `compliance.md`, modelos em `contratos/`.
> Inclua sempre no corpo: *"documentos-base, não substituem revisão de advogado".*

## FASE 12 — Governança & OKRs (`11-governanca`)
**Objetivo:** instalar o sistema de pilotagem.
**Perguntas:** Métrica-norte (a única que melhor mede valor entregue)? 3 objetivos do próximo trimestre? Rituais de acompanhamento? Dashboards essenciais?
**Gera:** `okrs.md`, `rituais.md`, `metricas.md` (north star + por área) e fecha o ciclo no `log.md`.

---

## Painel de progresso (manter no `index.md` raiz)

| Fase | Área | Status |
|---|---|---|
| 0 | Descoberta | ⬜ |
| 1 | Fundação | ⬜ |
| 2 | Estratégia | ⬜ |
| 3 | Mercado | ⬜ |
| 4 | Financeiro | ⬜ |
| 5 | Comercial | ⬜ |
| 6 | Marketing | ⬜ |
| 7 | Produto | ⬜ |
| 8 | Operações | ⬜ |
| 9 | Tech | ⬜ |
| 10 | Pessoas | ⬜ |
| 11 | Jurídico | ⬜ |
| 12 | Governança | ⬜ |

Legenda: ✅ feito · 🚧 em andamento · ⬜ pendente. O `index_generator.py` regenera esta tabela a partir do que existe em disco.
