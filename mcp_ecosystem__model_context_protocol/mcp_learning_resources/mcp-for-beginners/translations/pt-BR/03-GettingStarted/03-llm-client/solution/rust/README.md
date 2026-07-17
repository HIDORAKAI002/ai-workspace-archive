# Executando este exemplo

Esta é a solução em Rust para o exemplo do cliente LLM. Você precisa ter a ferramenta Rust instalada; veja o [guia oficial de instalação](https://www.rust-lang.org/tools/install).

O cliente chama um modelo através do endpoint de inferência dos Modelos do GitHub (`https://models.github.ai/inference/chat`) e lê o seu token de acesso pessoal do GitHub (PAT) da variável de ambiente `OPENAI_API_KEY`.

> [!NOTE]
> Outras soluções neste repositório usam `GITHUB_TOKEN`. Para Rust, defina `OPENAI_API_KEY` com o mesmo valor para corresponder à configuração do cliente OpenAI.

## -0- Defina seu token GitHub

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Compile o exemplo

```bash
cargo build
```

## -2- Execute o exemplo

```bash
cargo run
```

O cliente inicia o servidor calculadora MCP, busca sua lista de ferramentas e usa o modelo (`openai/gpt-5-mini`) para chamar a ferramenta `add`. Você deve ver a saída indicando a chamada da ferramenta (por exemplo, "Calling tool: add") e o resultado dessa chamada.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->