# Running this sample

This is the Rust solution for the LLM client sample. You need a Rust toolchain installed; see the [official install guide](https://www.rust-lang.org/tools/install).

The client calls a model through the GitHub Models inference endpoint (`https://models.github.ai/inference/chat`) and reads your GitHub personal access token (PAT) from the `OPENAI_API_KEY` environment variable.

> [!NOTE]
> Other solutions in this repo use `GITHUB_TOKEN`. For Rust, set `OPENAI_API_KEY` to the same value to match the OpenAI client configuration.

## -0- Set your GitHub token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Build the sample

```bash
cargo build
```

## -2- Run the sample

```bash
cargo run
```

The client starts the calculator MCP server, fetches its tool list, and uses the model (`openai/gpt-5-mini`) to call the `add` tool. You should see output indicating the tool call (for example, "Calling tool: add") and the result of that call.
