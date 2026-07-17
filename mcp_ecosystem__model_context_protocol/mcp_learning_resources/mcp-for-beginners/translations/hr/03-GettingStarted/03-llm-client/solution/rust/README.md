# Pokretanje ovog primjera

Ovo je Rust rješenje za LLM klijenta primjera. Potrebno je imati instaliran Rust alatni lanac; pogledajte [službeni vodič za instalaciju](https://www.rust-lang.org/tools/install).

Klijent poziva model putem GitHub Models inference endpointa (`https://models.github.ai/inference/chat`) i čita vaš GitHub osobni pristupni token (PAT) iz varijable okoline `OPENAI_API_KEY`.

> [!NOTE]
> Druga rješenja u ovom repozitoriju koriste `GITHUB_TOKEN`. Za Rust, postavite `OPENAI_API_KEY` na istu vrijednost da odgovara konfiguraciji OpenAI klijenta.

## -0- Postavite svoj GitHub token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Izgradite primjer

```bash
cargo build
```

## -2- Pokrenite primjer

```bash
cargo run
```

Klijent pokreće MCP server za kalkulator, dohvaća njegov popis alata i koristi model (`openai/gpt-5-mini`) za poziv alata `add`. Trebali biste vidjeti ispis koji pokazuje poziv alata (na primjer, "Pozivanje alata: add") i rezultat tog poziva.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->