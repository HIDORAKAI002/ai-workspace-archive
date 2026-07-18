# Registo de Alterações

Todas as alterações notórias ao curso **Agentes de IA para Iniciantes** estão documentadas neste ficheiro.

## [Lançado] — 2026-07-13

Esta versão adiciona duas novas aulas que completam o arco de implementação — escalando agentes para Microsoft Foundry e reduzindo para uma estação de trabalho — além de uma pipeline de teste rápido, navegação do curso atualizada, novas competências para os aprendizes e marca atualizada.

### Adicionado

- **Aula 16 — Implementação de Agentes Escaláveis com Microsoft Foundry.** Nova aula [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) e notebook executável [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) que constrói um agente de suporte ao cliente em produção (ferramentas, RAG, memória, roteamento de modelos, cache de respostas, aprovação humana, portão de avaliação e rastreamento OpenTelemetry), com diagramas Mermaid de desenvolvimento/implementação/tempo de execução, verificação de conhecimentos, um trabalho e um desafio.
- **Aula 17 — Criação de Agentes de IA Locais com Foundry Local e Qwen.** Nova aula [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) e notebook [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) construindo um assistente de engenharia totalmente no dispositivo (chamada de função Qwen via Foundry Local, ferramentas de ficheiros sandboxed, RAG local com Chroma, MCP local opcional), com diagramas apenas local / RAG local / chamada de ferramentas, verificação de conhecimentos, trabalho e desafio.
- **Pipeline de teste rápido.** Novo fluxo de trabalho [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) mais catálogos por aula em [tests/](./tests/README.md) para os agentes implementáveis nas Aulas 01, 04, 05 e 16, com um README índice que associa cada catálogo à sua aula e nome do agente alojado. A Aula 16 obtém uma secção "Validar um Agente Implementado com Testes Rápidos"; as Aulas 01/04/05 obtêm uma indicação opcional para teste rápido.
- **Competências para aprendizes.** Novas Competências de Agente sob `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (agregando a orientação das Aulas 16 e 17), e [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (como validar os exemplos dos notebooks contra um setup ativo Microsoft Foundry / Azure OpenAI).
- **Executador de validação de notebooks.** Novo [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) que executa cada notebook Python em modo headless com `nbconvert` e imprime uma matriz PASS/FAIL (mais `results.json`). Detecta automaticamente a raíz do repositório e o Python, exclui por padrão notebooks fora do curso (`.venv`, `site-packages`, `translations`, ativos do template de competências) e notebooks `.NET`, e suporta `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, e `-Python`.
- **Navegação do curso.** Adicionados links Anterior/Seguinte às aulas 11–15 (antes ausentes) para que o curso completo encadeie 00 → 18 em ambas as direções.
- **Novas miniaturas.** Miniaturas para as Aulas 16 e 17, mais uma imagem social de repositório atualizada [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (agora a promover as duas novas aulas e a URL `aka.ms/ai-agents-beginners`).
- **Dependências** ([requirements.txt](../../requirements.txt)): adicionados `foundry-local-sdk` e `chromadb` para a Aula 17.

### Alterado

- **Tabela principal do [README.md](./README.md)**: Aulas 16 e 17 agora linkam para o seu conteúdo (antes "Em Breve"); imagem do repositório atualizada para `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: adicionadas as Aulas 16 e 17 ao guia aula a aula e percursos de aprendizagem, e uma secção "Validar Agentes Implementados com Testes Rápidos".
- **[AGENTS.md](./AGENTS.md)**: atualização da contagem/descrição das aulas (00–18), adição de secção de validação por teste rápido, e exemplos de nomenclatura das amostras das Aulas 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Aula Anterior" agora aponta para a Aula 17 (antes Aula 15), fechando o ciclo.
- **Referências padronizadas a modelos não descontinuados.** Substituídas todas as referências a `gpt-4o` / `gpt-4o-mini` no curso (docs, `.env.example`, notebooks e exemplos Python/.NET) por `gpt-4.1-mini` — `gpt-4o` (todas as versões) será descontinuado em 2026. O exemplo de roteamento de modelos da Aula 16 mantém um contraste pequeno/grande usando `gpt-4.1-mini` (pequeno) e `gpt-4.1` (grande). Notebooks Python agora selecionam o modelo a partir de variáveis de ambiente (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) em vez de codificar um nome de modelo.

### Notas e limitações conhecidas

- **Não executado contra Azure ao vivo.** Os novos notebooks das aulas são amostras educativas; execute e valide-os contra o seu próprio setup Microsoft Foundry / Foundry Local. O fluxo de trabalho de testes rápidos requer que implemente o agente da aula e configure os segredos Azure OIDC (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) com a função **Azure AI User** ao nível do projeto Foundry.
- **Aula 17 é apenas local.** Não tem endpoint Foundry Responses, pelo que a ação de teste rápido não se aplica; valide-a executando o notebook na sua estação de trabalho.

## [Lançado] — 2026-07-06

Esta versão migra o curso para a **Azure OpenAI Responses API**, padroniza a nomenclatura do produto para **Microsoft Foundry** e **Microsoft Agent Framework (MAF)**, descontinua os Modelos GitHub, atualiza versões SDK e adiciona conteúdo novo sobre modelos locais e alojamento de outros frameworks no Foundry.

### Adicionado

- **Competência de migração** — Instalou a Competência de Agente [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (a partir de [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) sob `.agents/skills/`, incluindo suas referências e script de scanner.
- **Foundry Local (execute modelos no dispositivo)** — Nova secção "Fornecedor Alternativo: Foundry Local" em [00-course-setup/README.md](./00-course-setup/README.md) que cobre instalação (`winget` / `brew`), `foundry model run`, o `foundry-local-sdk`, e ligar `FoundryLocalManager` ao Microsoft Agent Framework via `OpenAIChatClient`.
- **Alojamento de agentes LangChain / LangGraph no Microsoft Foundry** — Nova secção em [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) mais um exemplo executável [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) usando `langchain-azure-ai[hosting]` e `ResponsesHostServer` (o protocolo `/responses`), baseado em [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Nova secção "Exemplo do Mundo Real: Microsoft Project Opal" em [15-browser-use/README.md](./15-browser-use/README.md) que enquadra o Opal como agente empresarial para uso de computador e o mapeia para conceitos do curso (humano no ciclo, confiança/segurança, planeamento, Competências).
- **Segundo exemplo Python da Aula 02** — Adicionado [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (ver "Alterado" — migrado do antigo notebook Semantic Kernel) e linkhado no README da aula.
- Adicionada secção Modelos e Fornecedores ao [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Alterado

- **Chat Completions → Responses API (Python).** Exemplos que chamavam o modelo diretamente migraram de Chat Completions para a Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), usando o cliente `OpenAI` contra o endpoint estável Azure OpenAI `/openai/v1/` (sem `api_version`). Exemplos afetados incluem:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — o walkthrough completo de chamada de função (esquema da ferramenta achatado para o formato Responses, resultados da ferramenta retornados como `function_call_output`, `max_output_tokens`, etc.).
- **GitHub Models → Azure OpenAI.** A funcionalidade GitHub Models está descontinuada (a terminar em **julho de 2026**) e não suporta a Responses API. Todos os caminhos de código de GitHub Models foram convertidos para Azure OpenAI / Microsoft Foundry nos exemplos Python e .NET:
  - Python: Workflow notebooks da Aula 08 (`01`–`03`), Aula 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + docs acompanhantes `.md`, e os notebooks/`.md` do workflow Aula 08 dotNET (`01`–`03`) usam agora `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` com `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** O antigo `02-semantic-kernel.ipynb` foi reescrito para usar o Microsoft Agent Framework com Azure OpenAI (Responses API) e renomeado para `02-python-agent-framework-azure-openai.ipynb`.
- **Padronizado em `FoundryChatClient` + `as_agent`.** Código README e nos notebooks que referenciava `AzureAIProjectAgentProvider` foi padronizado segundo o padrão canónico usado pela Aula 01 e exemplos próprios do framework:`FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` com `provider.as_agent(...)`. Atualizado em READMEs e notebooks da Aula 02–14 (e.g. memória da Aula 13, todos os notebooks da Aula 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Nomenclatura dos produtos.** Renomeado no conteúdo em inglês:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Sem alterações: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", e nomes de variáveis de ambiente.)
- **Dependências** ([requirements.txt](../../requirements.txt)):
  - Fixo `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Fixo `openai>=1.108.1` (mínimo para a Responses API).
  - Removido `azure-ai-inference` (usado apenas pelos exemplos migrados de GitHub Models).
- **Configuração do ambiente** ([.env.example](../../.env.example)): removidas variáveis GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); adicionados `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` e opcional `AZURE_OPENAI_API_KEY`; atualização de nomes para Microsoft Foundry.
- **Documentação** — Atualizados [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), e [STUDY_GUIDE.md](./STUDY_GUIDE.md) para o acima (configuração de env vars, trecho de verificação, orientação do fornecedor, nomenclatura).

### Removido

- Passos de introdução e variáveis de ambiente do GitHub Models na documentação de configuração (substituídos por Azure OpenAI / Microsoft Foundry).

### Segurança / Privacidade (limpeza para partilha pública)

- Removidos outputs de execução de notebooks Jupyter que expuseram um verdadeiro **ID de subscrição Azure**, nomes de grupos de recursos / recursos, ID de ligação Bing, e ainda **caminhos locais de ficheiros e nomes de utilizador dos desenvolvedores**, em:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Verificado que não permanecem chaves API, tokens, IDs de subscrição ou caminhos pessoais no conteúdo em inglês rastreado (as referências `GITHUB_TOKEN` que permanecem são o token do GitHub Actions nos fluxos de trabalho e o PAT do servidor GitHub MCP na configuração da Aula 11 — ambos legítimos e não relacionados com os Modelos GitHub).

### Notas e limitações conhecidas

- **Não executados/compilados.** Estes são exemplos educativos atualizados para a correção da API/nomenclatura; não foram executados contra recursos Azure em produção, e os exemplos .NET não foram compilados neste ambiente. Valide com a sua própria implantação Microsoft Foundry / Azure OpenAI.
- **A implantação do modelo deve suportar a API de Respostas.** Use uma implantação como `gpt-4.1-mini`, `gpt-4.1` ou um modelo `gpt-5.x`. Modelos mais antigos suportam funcionalidades básicas das Respostas, mas não todas as funcionalidades.
- **Versão do framework do agente.** Os exemplos destinam-se à versão mais recente do MAF (`>=1.10.0`). A chamada canónica para criação de agentes é `client.as_agent(...)`; as APIs foram validadas contra a documentação publicada do framework e uma build instalada. Se usar uma versão diferente, confirme a disponibilidade dos métodos (`as_agent` vs `create_agent`).
- **Caderno do fluxo de trabalho da Aula 08, nota 04** mantém intencionalmente o `AzureAIAgentClient` (de `agent-framework-azure-ai`) porque usa ferramentas do Serviço de Agente Microsoft Foundry hospedadas (fundamentação Bing, interpretador de código); já é baseado em Respostas.
- **Implantação padrão .NET.** Dois exemplos do fluxo de trabalho dotNET da Aula 08 anteriormente fixavam um modelo específico; agora utilizam como predefinição o `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Se um exemplo depender de entrada multimodal/visão, defina o `AZURE_OPENAI_DEPLOYMENT` para um modelo adequado.
- **Foundry Local** expõe um endpoint compatível com OpenAI **Chat Completions** e destina-se a desenvolvimento local; utilize o Azure OpenAI / Microsoft Foundry para o conjunto completo de funcionalidades da API Respostas.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->