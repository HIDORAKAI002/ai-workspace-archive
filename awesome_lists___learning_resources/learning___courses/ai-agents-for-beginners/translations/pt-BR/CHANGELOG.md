# Registro de alterações

Todas as alterações notáveis do curso **Agentes de IA para Iniciantes** estão documentadas neste arquivo.

## [Lançado] — 2026-07-13

Esta versão adiciona duas novas aulas que completam o arco de implantação — escalando agentes para o Microsoft Foundry e reduzindo para uma única estação de trabalho — além de um pipeline de teste rápido, navegação do curso atualizada, novas habilidades para aprendizes e branding atualizado.

### Adicionado

- **Aula 16 — Implantando Agentes Escaláveis com Microsoft Foundry.** Nova aula [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) e notebook executável [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) construindo um agente de suporte ao cliente em produção (ferramentas, RAG, memória, roteamento de modelo, cache de resposta, aprovação humana, portão de avaliação e rastreamento OpenTelemetry), com diagramas Mermaid de desenvolvimento/implantação/execução, verificação de conhecimento, tarefa e desafio.
- **Aula 17 — Criando Agentes de IA Locais com Foundry Local e Qwen.** Nova aula [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) e notebook [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) desenvolvendo um assistente de engenharia completamente local (chamada de função Qwen via Foundry Local, ferramentas de arquivo em sandbox, RAG local com Chroma, MCP local opcional), com diagramas somente local / RAG local / chamada de ferramentas, verificação de conhecimento, tarefa e desafio.
- **Pipeline de teste rápido.** Novo fluxo de trabalho [Teste Rápido de IA](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) e catálogos por aula em [tests/](./tests/README.md) para os agentes implantáveis das Aulas 01, 04, 05 e 16, com README de índice mapeando cada catálogo para sua aula e nome do agente hospedado. A Aula 16 recebe uma seção "Validando um Agente Implantado com Testes Rápidos"; as Aulas 01/04/05 ganham um indicativo opcional de teste rápido.
- **Habilidades dos aprendizes.** Novas Habilidades de Agente em `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (que reúnem as orientações das Aulas 16 e 17), e [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (como validar os exemplos do notebook contra uma configuração ativa do Microsoft Foundry / Azure OpenAI).
- **Executador de validação de notebooks.** Novo [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) que executa todos os notebooks Python sem interface usando `nbconvert` e imprime uma matriz PASS/FAIL (mais `results.json`). Detecta automaticamente a raiz do repositório e Python, exclui por padrão notebooks fora do curso (`.venv`, `site-packages`, `translations`, recursos do template de habilidade) e notebooks `.NET`, e suporta `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` e `-Python`.
- **Navegação do curso.** Adicionados links de aula Anterior/Próxima para as Aulas 11–15 (antes ausentes) para que o curso completo encadeie 00 → 18 em ambas as direções.
- **Novas miniaturas.** Miniaturas das aulas 16 e 17, além de imagem social do repositório renovada [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (agora divulgando as duas novas aulas e a URL `aka.ms/ai-agents-beginners`).
- **Dependências** ([requirements.txt](../../requirements.txt)): adicionados `foundry-local-sdk` e `chromadb` para a Aula 17.

### Alterado

- **Tabela principal do [README.md](./README.md)**: As Aulas 16 e 17 agora linkam para seus conteúdos (antes “Em Breve”); imagem do repositório atualizada para `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: adicionadas Aulas 16 e 17 ao guia aula-a-aula e aos caminhos de aprendizado, e seção "Validando Agentes Implantados com Testes Rápidos".
- **[AGENTS.md](./AGENTS.md)**: atualizada contagem e descrição das aulas (00–18), adicionada seção de validação por teste rápido e exemplos de nomeação de amostras das Aulas 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: link "Aula Anterior" agora aponta para Aula 17 (antes Aula 15), fechando o encadeamento.
- **Referências modelares padronizadas para modelos não obsoletos.** Todas as referências `gpt-4o` / `gpt-4o-mini` no curso (docs, `.env.example`, notebooks e amostras Python/.NET) foram substituídas por `gpt-4.1-mini` — `gpt-4o` (todas as versões) será aposentado em 2026. O exemplo de roteamento de modelo da Aula 16 mantém contraste pequeno/grande usando `gpt-4.1-mini` (pequeno) e `gpt-4.1` (grande). Notebooks Python agora selecionam o modelo a partir de variáveis de ambiente (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) em vez de codificar o nome do modelo.

### Notas e limitações conhecidas

- **Não executado contra Azure ao vivo.** Os notebooks das novas aulas são exemplos educativos; execute e valide-os contra sua própria instalação Microsoft Foundry / Foundry Local. O fluxo de trabalho de teste rápido exige implantar o agente da aula e configurar segredos Azure OIDC (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) com a função **Usuário Azure AI** no escopo do projeto Foundry.
- **Aula 17 é apenas local.** Não tem endpoint Foundry Responses, logo a ação de teste rápido não se aplica; valide executando o notebook na sua estação de trabalho.

## [Lançado] — 2026-07-06

Esta versão migra o curso para a **API Azure OpenAI Responses**, padroniza a nomenclatura do produto para **Microsoft Foundry** e o **Microsoft Agent Framework (MAF)**, aposenta GitHub Models, atualiza versões do SDK e adiciona conteúdos novos sobre modelos locais e hospedagem de outros frameworks no Foundry.

### Adicionado

- **Habilidade de migração** — Instalou a Habilidade de Agente [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (de [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) em `.agents/skills/`, incluindo suas referências e script de scanner.
- **Foundry Local (executar modelos localmente)** — Nova seção "Provedor Alternativo: Foundry Local" em [00-course-setup/README.md](./00-course-setup/README.md) cobrindo instalação (`winget` / `brew`), `foundry model run`, `foundry-local-sdk` e conexão do `FoundryLocalManager` ao Microsoft Agent Framework via `OpenAIChatClient`.
- **Hospedagem de agentes LangChain / LangGraph no Microsoft Foundry** — Nova seção em [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) com exemplo executável [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) usando `langchain-azure-ai[hosting]` e `ResponsesHostServer` (protocolo `/responses`), baseado em [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Nova seção "Exemplo do Mundo Real: Microsoft Project Opal" em [15-browser-use/README.md](./15-browser-use/README.md) enquadrando Opal como agente corporativo de uso de computador e relacionando a conceitos do curso (human-in-the-loop, confiança/segurança, planejamento, Habilidades).
- **Segundo exemplo Python na Aula 02** — Adicionado [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (veja "Alterado" — migrado do notebook antigo Semantic Kernel) e linkado no README da aula.
- Seção **Modelos e Provedores** adicionada ao [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Alterado

- **Chat Completions → API Responses (Python).** Amostras que chamavam o modelo diretamente foram migradas de Chat Completions para Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), usando o cliente `OpenAI` contra o endpoint estável Azure OpenAI `/openai/v1/` (sem `api_version`). Amostras afetadas incluem:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — o walkthrough completo de chamadas de função (esquema de ferramenta convertido para o formato Responses, resultados da ferramenta retornados como `function_call_output`, `max_output_tokens`, etc.).
- **GitHub Models → Azure OpenAI.** GitHub Models está depreciado (aposentado em **julho de 2026**) e não suporta Responses API. Todos os caminhos de código GitHub Models foram convertidos para Azure OpenAI / Microsoft Foundry em amostras Python e .NET:
  - Python: notebooks do fluxo de trabalho da Aula 08 (`01`–`03`), Aula 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + documentação `.md` acompanhante, e notebooks / `.md` do fluxo da Aula 08 .NET (`01`–`03`) agora usam `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` com `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** O antigo `02-semantic-kernel.ipynb` foi reescrito para usar o Microsoft Agent Framework com Azure OpenAI (Responses API) e renomeado para `02-python-agent-framework-azure-openai.ipynb`.
- **Padronização para `FoundryChatClient` + `as_agent`.** README e código dos notebooks que referenciavam `AzureAIProjectAgentProvider` foram padronizados para o padrão canônico usado pela Aula 01 e amostras do framework: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` com `provider.as_agent(...)`. Atualizado em READMEs e notebooks de Aula 02–14 (ex.: memória da Aula 13, todos os notebooks da Aula 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Nomeação do produto.** Renomeado em todo o conteúdo em inglês:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Inalterados: "Azure OpenAI", "Azure AI Search", "Azure AI Inference" e nomes de variáveis de ambiente.)
- **Dependências** ([requirements.txt](../../requirements.txt)):
  - Travadas `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Travada `openai>=1.108.1` (mínima para Responses API).
  - Removido `azure-ai-inference` (era usado apenas nas amostras migradas do GitHub Models).
- **Configuração do ambiente** ([.env.example](../../.env.example)): removidas variáveis do GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); adicionadas `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` e opcional `AZURE_OPENAI_API_KEY`; atualizada a nomenclatura para Microsoft Foundry.
- **Docs** — Atualizados [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), e [STUDY_GUIDE.md](./STUDY_GUIDE.md) para o descrito acima (variáveis de ambiente, trecho de verificação, orientação sobre provedores, nomenclatura).

### Removido

- Passos de integração e variáveis de ambiente do GitHub Models removidos da documentação de configuração (substituídos por Azure OpenAI / Microsoft Foundry).

### Segurança / Privacidade (limpeza de compartilhamento público)

- Removidos saídas de execução de Jupyter notebook que vazavam um verdadeiro **ID de assinatura Azure**, nomes de resource-group / recurso, e ID de conexão Bing, além de **caminhos de arquivo locais e nomes de usuário** dos desenvolvedores em:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Verificado que não restam chaves de API, tokens, IDs de assinatura ou caminhos pessoais no conteúdo em inglês rastreado (as referências `GITHUB_TOKEN` que permanecem são o token do GitHub Actions nos fluxos de trabalho e o PAT do servidor GitHub MCP na configuração da Lição 11 — ambos legítimos e não relacionados aos Modelos do GitHub).

### Notas e limitações conhecidas

- **Não executado/compilado.** Estes são exemplos educacionais atualizados para a correção de API/nomenclatura; não foram executados contra recursos ativos do Azure, e os exemplos em .NET não foram compilados neste ambiente. Valide contra seu próprio Microsoft Foundry / implantação Azure OpenAI.
- **A implantação do modelo deve suportar a API Responses.** Use uma implantação como `gpt-4.1-mini`, `gpt-4.1`, ou um modelo `gpt-5.x`. Modelos mais antigos suportam a funcionalidade central do Responses, mas não todos os recursos.
- **Versão do agent-framework.** Os exemplos visam o MAF mais recente (`>=1.10.0`). A chamada canônica para criação de agentes é `client.as_agent(...)`; as APIs foram validadas contra a documentação publicada do framework e uma build instalada. Se usar uma versão diferente, confirme a disponibilidade do método (`as_agent` vs `create_agent`).
- **Notebook do fluxo da Lição 08, exemplo 04** mantém intencionalmente `AzureAIAgentClient` (do `agent-framework-azure-ai`) porque utiliza ferramentas hospedadas do Microsoft Foundry Agent Service (fundamentação Bing, interpretador de código); já é baseado em Responses.
- **Implantação padrão .NET.** Dois exemplos do fluxo .NET da Lição 08 antes codificavam um modelo específico; agora usam por padrão `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Se um exemplo depender de entrada multimodal/visão, defina `AZURE_OPENAI_DEPLOYMENT` para um modelo apropriado.
- **Foundry Local** expõe um endpoint compatível com OpenAI **Chat Completions** e destina-se ao desenvolvimento local; use Azure OpenAI / Microsoft Foundry para o conjunto completo de recursos da API Responses.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->