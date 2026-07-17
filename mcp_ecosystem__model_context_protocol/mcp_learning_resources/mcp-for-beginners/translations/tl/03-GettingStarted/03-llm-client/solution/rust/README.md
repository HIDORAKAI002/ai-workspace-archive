# Pagpapatakbo ng halimbawang ito

Ito ang solusyon sa Rust para sa sample ng LLM client. Kailangan mo ng Rust toolchain na naka-install; tingnan ang [opisyal na gabay sa pag-install](https://www.rust-lang.org/tools/install).

Tinatawagan ng kliyente ang isang modelo sa pamamagitan ng GitHub Models inference endpoint (`https://models.github.ai/inference/chat`) at binabasa ang iyong personal access token (PAT) ng GitHub mula sa `OPENAI_API_KEY` na environment variable.

> [!NOTE]
> Ang ibang mga solusyon sa repo na ito ay gumagamit ng `GITHUB_TOKEN`. Para sa Rust, itakda ang `OPENAI_API_KEY` sa parehong halaga para tumugma sa OpenAI client configuration.

## -0- Itakda ang iyong GitHub token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- I-build ang sample

```bash
cargo build
```

## -2- Patakbuhin ang sample

```bash
cargo run
```

Sinisimulan ng client ang calculator MCP server, kinukuha ang listahan ng mga kasangkapan nito, at ginagamit ang modelo (`openai/gpt-5-mini`) upang tawagan ang tool na `add`. Makikita mo dapat ang output na nagpapahiwatig ng tawag sa tool (halimbawa, "Calling tool: add") at ang resulta ng tawag na iyon.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->