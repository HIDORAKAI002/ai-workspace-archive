# Kuendesha mfano huu

Huu ni suluhisho la Rust kwa mfano wa mteja wa LLM. Unahitaji seti ya zana ya Rust imewekwa; tafadhali angalia [mwongozo rasmi wa ufungaji](https://www.rust-lang.org/tools/install).

Mteja huwaita modeli kupitia kiungo cha utafiti wa modeli za GitHub (`https://models.github.ai/inference/chat`) na husoma tokeni yako binafsi ya upatikanaji ya GitHub (PAT) kutoka kwa mazingira ya `OPENAI_API_KEY`.

> [!NOTE]
> Suluhisho zingine katika hifadhi hii hutumia `GITHUB_TOKEN`. Kwa Rust, weka `OPENAI_API_KEY` kwa thamani ile ile ili kuendana na usanidi wa mteja wa OpenAI.

## -0- Weka tokeni yako ya GitHub

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Tengeneza mfano

```bash
cargo build
```

## -2- Endesha mfano

```bash
cargo run
```

Mteja huanzisha seva ya calculator MCP, hupata orodha yake ya zana, na hutumia modeli (`openai/gpt-5-mini`) kuitisha zana ya `add`. Unapaswa kuona matokeo yanayoonyesha kuitisha zana (kwa mfano, "Calling tool: add") na matokeo ya hiyo onguzo.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->