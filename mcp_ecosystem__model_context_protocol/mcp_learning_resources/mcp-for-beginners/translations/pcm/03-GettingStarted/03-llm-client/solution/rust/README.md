# Di way to run dis sample

Dis na di Rust solution for di LLM client sample. You need get Rust toolchain wey don install for your machine; check di [official install guide](https://www.rust-lang.org/tools/install).

Di client dey call model through di GitHub Models inference endpoint (`https://models.github.ai/inference/chat`) and e go read your GitHub personal access token (PAT) from di `OPENAI_API_KEY` environment variable.

> [!NOTE]
> Other solutions for dis repo dey use `GITHUB_TOKEN`. For Rust, make you set `OPENAI_API_KEY` to di same value so dat e go match di OpenAI client configuration.

## -0- Set your GitHub token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Build di sample

```bash
cargo build
```

## -2- Run di sample

```bash
cargo run
```

Di client go start di calculator MCP server, go fetch di tool list, and e go use di model (`openai/gpt-5-mini`) to call di `add` tool. You go see output wey dey show say dem dey call di tool (for example, "Calling tool: add") plus di result of dat call.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->