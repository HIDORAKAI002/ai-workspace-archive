---
name: testing-course-samples
---
# Testar os Exemplos do Curso

Valide que os cadernos de aulas e os exemplos de código funcionam com uma configuração em direto do
Microsoft Foundry / Azure OpenAI. O repositório inclui um executor em
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) que
executa cada caderno Python sem interface gráfica e imprime uma matriz de SUCESSO/FALHA.

## Quando usar
- "Validar todos os cadernos / exemplos contra a minha subscrição Azure."
- "Teste básico do curso após atualizar pacotes ou alterar modelos."
- "Quais aulas ainda passam / falham em direto?"

Não use isto para o AI Smoke Test GitHub Action (que valida agentes *implantados*
– veja [`tests/README.md`](../../../tests/README.md)). Esta ferramenta
executa os cadernos localmente.

## Pré-requisitos (verificar primeiro)
1. **Python 3.12+** com as dependências do curso: `python -m pip install -r requirements.txt`
   mais o executor: `python -m pip install nbconvert ipykernel`.
2. **`.env` na raiz do repositório** (copie de [`.env.example`](../../../../../.env.example)) com pelo menos:
   - `AZURE_AI_PROJECT_ENDPOINT` — endpoint do projeto Foundry
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — uma implantação não descontinuada (ex.: `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) e `AZURE_OPENAI_DEPLOYMENT`
     para aulas que usam Azure OpenAI diretamente (Aula 06, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** realizado — os exemplos autenticam com `AzureCliCredential` (Entra ID, sem chave).
4. Verifique se a implantação do modelo existe:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Executar a validação
```powershell
# Todos os notebooks Python (exclui .NET, .venv, site-packages, traduções, ativos de competências)
pwsh scripts/validate-notebooks.ps1

# Uma única lição, com um tempo limite por célula mais longo
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Apenas listar o que seria executado (sem execução)
pwsh scripts/validate-notebooks.ps1 -List

# Interpretador explícito (se `python` não estiver no PATH, por ex. alias da Windows Store)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
O script grava cópias executadas, registos por caderno e `results.json` em
`$env:TEMP\aiab-nbval` e sai com o número de falhas.

## Interpretar os resultados
- `PASS` — o caderno correu de ponta a ponta sem erro numa célula.
- `FAIL` — a primeira linha `*Error` / `*Exception` é mostrada; abra o
  `log_*.txt` correspondente na pasta de saída para a stack trace completa.
- A falha de um só caderno está limitada por `-Timeout` (por célula), assim uma
  célula humana em espera aparece como `StdinNotImplementedError` em vez de ficar bloqueada.

## Aulas que precisam de recursos extra (espera-se falharem sem eles)
| Aula | Requisito extra |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, chave) — tem um caminho alternativo em memória |
| 11 MCP / GitHub | Servidor GitHub MCP + PAT |
| 13 memória (cognee) | `cognee` configurado com um fornecedor de modelo |
| 15 uso no browser | Browsers Playwright instalados (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 agente local | Runtime Foundry Local + modelo Qwen descarregado (no dispositivo, sem cloud) |
| cadernos `*-dotnet-*` | Kernel .NET Interactive (excluído por padrão; use `-IncludeDotnet`) |

## Relatar os resultados
Resuma numa tabela SUCESSO/FALHA agrupada por aula. Separe regressões genuínas
(bugs de código/configuração a corrigir) de lacunas do ambiente (Search/Foundry Local/PAT em falta),
e indique o `log_*.txt` das falhas reais.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->