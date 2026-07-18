---
name: testing-course-samples
---
# Testando os Exemplos do Curso

Valide se os notebooks das lições e os exemplos de código funcionam com uma configuração Microsoft Foundry / Azure OpenAI ao vivo.
O repositório disponibiliza um executor em
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) que
executa cada notebook Python em modo headless e imprime uma matriz PASS/FAIL.

## Quando usar
- "Validar todos os notebooks / exemplos contra minha assinatura Azure."
- "Fazer um teste rápido do curso após atualizar pacotes ou mudar modelos."
- "Quais lições ainda passam / falham ao vivo?"

Não use este para o AI Smoke Test GitHub Action (que valida agentes *implantados*
hospedados — veja [`tests/README.md`](../../../tests/README.md)). Esta ferramenta
executa os notebooks localmente.

## Pré-requisitos (verificar primeiro)
1. **Python 3.12+** com dependências do curso: `python -m pip install -r requirements.txt`
   além do executor: `python -m pip install nbconvert ipykernel`.
2. **`.env` na raiz do repositório** (copie de [`.env.example`](../../../../../.env.example)) com pelo menos:
   - `AZURE_AI_PROJECT_ENDPOINT` — endpoint do projeto Foundry
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — um deployment não depreciado (ex. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) e `AZURE_OPENAI_DEPLOYMENT`
     para lições que usam Azure OpenAI diretamente (Lição 06, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** concluído — os exemplos usam autenticação `AzureCliCredential` (Entra ID, sem chave).
4. Verifique se o deployment do modelo existe:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Executando a validação
```powershell
# Todos os notebooks Python (ignora .NET, .venv, site-packages, traduções, recursos de habilidade)
pwsh scripts/validate-notebooks.ps1

# Uma única lição, com um tempo limite maior por célula
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Apenas lista o que seria executado (sem execução)
pwsh scripts/validate-notebooks.ps1 -List

# Interpretador explícito (se `python` não estiver no PATH, por exemplo, alias da Windows Store)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
O script grava cópias executadas, logs por notebook e `results.json` em
`$env:TEMP\aiab-nbval` e encerra com o número de falhas.

## Interpretando resultados
- `PASS` — o notebook executou completamente sem erro em nenhuma célula.
- `FAIL` — a primeira linha de `*Error` / `*Exception` é exibida; abra o arquivo
  `log_*.txt` correspondente na pasta de saída para ver o rastreamento completo.
- Uma falha individual do notebook está limitada por `-Timeout` (por célula), então uma célula
  que requer participação humana pendurada aparece como `StdinNotImplementedError` em vez de travar.

## Lições que precisam de recursos extras (espera-se falha sem eles)
| Lição | Requisito extra |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, chave) — tem um caminho de fallback na memória |
| 11 MCP / GitHub | Servidor GitHub MCP + PAT |
| 13 memória (cognee) | `cognee` configurado com um provedor de modelo |
| 15 uso do navegador | Navegadores Playwright instalados (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 agente local | Runtime Local do Foundry + um modelo Qwen baixado (na máquina, sem nuvem) |
| notebooks `*-dotnet-*` | kernel interativo .NET (excluído por padrão; usar `-IncludeDotnet`) |

## Reportando
Resuma em uma tabela PASS/FAIL agrupada por lição. Separe regressões genuínas
(bugs de código/configuração a corrigir) de lacunas no ambiente (falta Search/Foundry Local/PAT),
e cite os arquivos `log_*.txt` que falharam para cada falha real.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->