# Rularea acestui exemplu

Aceasta este soluția Rust pentru exemplul client LLM. Trebuie să ai instalat un lanț de unelte Rust; vezi [ghidul oficial de instalare](https://www.rust-lang.org/tools/install).

Clientul apelează un model prin endpoint-ul de inferență GitHub Models (`https://models.github.ai/inference/chat`) și citește token-ul tău de acces personal GitHub (PAT) din variabila de mediu `OPENAI_API_KEY`.

> [!NOTE]
> Alte soluții din acest depozit folosesc `GITHUB_TOKEN`. Pentru Rust, setează `OPENAI_API_KEY` cu aceeași valoare pentru a corespunde configurației clientului OpenAI.

## -0- Setează token-ul GitHub

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Compilează exemplul

```bash
cargo build
```

## -2- Rulează exemplul

```bash
cargo run
```

Clientul pornește serverul MCP calculator, preia lista sa de unelte și folosește modelul (`openai/gpt-5-mini`) pentru a apela unealta `add`. Ar trebui să vezi un output care indică apelul uneltei (de exemplu, „Calling tool: add”) și rezultatul acelui apel.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->