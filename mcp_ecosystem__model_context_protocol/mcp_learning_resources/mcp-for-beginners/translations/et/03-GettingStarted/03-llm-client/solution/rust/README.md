# Selle näidise käivitamine

See on Rusti lahendus LLM kliendi näidise jaoks. Sul peab olema installitud Rusti tööriistakomplekt; vaata [ametlikku installijuhendit](https://www.rust-lang.org/tools/install).

Klient kutsub mudelit läbi GitHubi Mudelite inference lõpp-punkti (`https://models.github.ai/inference/chat`) ja loeb sinu GitHubi isikliku juurdepääsu märgi (PAT) keskkonnamuutujast `OPENAI_API_KEY`.

> [!NOTE]
> Teised selles hoidlas olevad lahendused kasutavad `GITHUB_TOKEN`. Rusti puhul seadista `OPENAI_API_KEY` samaks väärtuseks, et see vastaks OpenAI kliendi konfiguratsioonile.

## -0- Määra oma GitHubi token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Koosta näidis

```bash
cargo build
```

## -2- Käivita näidis

```bash
cargo run
```

Klient käivitab kalkulaatori MCP serveri, hangib selle tööriistade nimekirja ja kasutab mudelit (`openai/gpt-5-mini`), et kutsuda tööriista `add`. Sa peaksid nägema väljundit, mis näitab tööriista kutset (näiteks "Calling tool: add") ja selle kutse tulemust.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->