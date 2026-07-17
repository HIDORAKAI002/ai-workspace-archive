# Executar este exemplo

Esta é a solução Rust para o exemplo do cliente LLM. Precisa de ter a toolchain Rust instalada; consulte o [guia oficial de instalação](https://www.rust-lang.org/tools/install).

O cliente chama um modelo através do endpoint de inferência dos Modelos GitHub (`https://models.github.ai/inference/chat`) e lê o seu token de acesso pessoal do GitHub (PAT) a partir da variável de ambiente `OPENAI_API_KEY`.

> [!NOTE]
> Outras soluções neste repositório usam `GITHUB_TOKEN`. Para Rust, defina `OPENAI_API_KEY` com o mesmo valor para corresponder à configuração do cliente OpenAI.

## -0- Defina o seu token GitHub

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Construa o exemplo

```bash
cargo build
```

## -2- Execute o exemplo

```bash
cargo run
```

O cliente inicia o servidor MCP da calculadora, obtém a lista de ferramentas e usa o modelo (`openai/gpt-5-mini`) para chamar a ferramenta `add`. Deve ver uma saída que indica a chamada da ferramenta (por exemplo, "Calling tool: add") e o resultado dessa chamada.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->