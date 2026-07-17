# Tämän esimerkin suorittaminen

Tämä on Rust-ratkaisu LLM-asiakasnäytteelle. Sinulla tulee olla Rust-työkaluketju asennettuna; katso [virallinen asennusopas](https://www.rust-lang.org/tools/install).

Asiakas kutsuu mallia GitHub Models -päättelyn kautta (`https://models.github.ai/inference/chat`) ja lukee GitHub-henkilökohtaisen käyttöoikeustunnuksesi (PAT) `OPENAI_API_KEY`-ympäristömuuttujasta.

> [!NOTE]
> Muut tässä repossa olevat ratkaisut käyttävät `GITHUB_TOKEN`-arvoa. Rustille aseta `OPENAI_API_KEY` samaan arvoon, jotta se vastaa OpenAI-asiakkaan asetuksia.

## -0- Aseta GitHub-tokenisi

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Käännä esimerkkiohjelma

```bash
cargo build
```

## -2- Suorita esimerkkiohjelma

```bash
cargo run
```

Asiakas käynnistää laskin-MCP-palvelimen, hakee sen työkalulistan ja käyttää mallia (`openai/gpt-5-mini`) kutsuakseen `add`-työkalua. Näet todennäköisesti tulosteessa työkalukutsun (esim. "Calling tool: add") ja sen kutsun tuloksen.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->