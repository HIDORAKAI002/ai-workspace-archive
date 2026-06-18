# Generator študijskega načrta s Chainlit & Microsoft Learn Docs MCP

## Predpogoji

- Python 3.8 ali novejši
- pip (upravljalnik paketov za Python)
- Povezava z internetom za dostop do strežnika Microsoft Learn Docs MCP

## Namestitev

1. Klonirajte to repozitorij ali prenesite datoteke projekta.
2. Namestite potrebne odvisnosti:

   ```bash
   pip install -r requirements.txt
   ```

## Uporaba

### Scenarij 1: Preprost poizvedba do Docs MCP
Ukazna vrstica, ki se poveže na strežnik Docs MCP, pošlje poizvedbo in izpiše rezultat.

1. Zaženite skripto:
   ```bash
   python scenario1.py
   ```
2. Vnesite svoje vprašanje o dokumentaciji na poziv.

### Scenarij 2: Generator študijskega načrta (Chainlit spletna aplikacija)
Spletni vmesnik (uporabljajoč Chainlit), ki omogoča uporabnikom, da ustvarijo osebni tedenski študijski načrt za katerokoli tehnično temo.

1. Zaženite aplikacijo Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Odprite lokalni URL, prikazan v terminalu (npr. http://localhost:8000) v vašem brskalniku.
3. V oknu klepeta vnesite svojo temo za študij in število tednov, kolikor želite študirati (npr. "AI-900 certifikat, 8 tednov").
4. Aplikacija bo odgovorila z tedenskim študijskim načrtom, vključno s povezavami do ustrezne Microsoft Learn dokumentacije.

**Zahtevane okoljske spremenljivke:**

Če želite uporabljati Scenarij 2 (Chainlit spletna aplikacija z Azure OpenAI), morate v datoteki `.env` v mapi `python` nastaviti naslednje okoljske spremenljivke:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Izpolnite te vrednosti z vašimi podrobnostmi o Azure OpenAI virih pred zagonom aplikacije.

> [!TIP]
> Enostavno lahko namestite svoje modele z uporabo [Microsoft Foundry](https://ai.azure.com/).

### Scenarij 3: Dokumenti znotraj urejevalnika z MCP strežnikom v VS Code

Namesto da bi prestavljali zavihke brskalnika za iskanje dokumentacije, lahko Microsoft Learn Docs prenesete neposredno v VS Code z uporabo MCP strežnika. To omogoča:
- Iskanje in branje dokumentov znotraj VS Code brez zapuščanja programerskega okolja.
- Vstavljanje referenčnih povezav neposredno v vaše datoteke README ali tečaje.
- Uporabo GitHub Copilot in MCP skupaj za nemoten, AI-podprt delovni potek z dokumentacijo.

**Primeri uporabe:**
- Hitro dodajanje referenčnih povezav v README med pisanjem dokumentacije tečaja ali projekta.
- Uporaba Copilota za generiranje kode in MCP za takojšnje iskanje in citiranje ustrezne dokumentacije.
- Ostanite osredotočeni v urejevalniku in povečajte produktivnost.

> [!IMPORTANT]
> Prepričajte se, da imate veljavno konfiguracijo [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) v svoji delovni mapi (lokacija je `.vscode/mcp.json`).

## Zakaj Chainlit za Scenarij 2?

Chainlit je sodoben odprtokodni okvir za gradnjo pogovornih spletnih aplikacij. Omogoča enostavno ustvarjanje klepetalnih uporabniških vmesnikov, ki se povežejo s strežniki, kot je Microsoft Learn Docs MCP strežnik. Ta projekt uporablja Chainlit za enostavno, interaktivno generiranje personaliziranih študijskih načrtov v realnem času. Z uporabo Chainlit lahko hitro zgradite in zaženete klepetalne pripomočke, ki izboljšujejo produktivnost in učenje.

## Kaj ta aplikacija počne

Ta aplikacija omogoča uporabnikom ustvarjanje osebnega študijskega načrta zgolj z vnosom teme in trajanja. Aplikacija analizira vaš vnos, poizveduje Microsoft Learn Docs MCP strežnik za relevantno vsebino in rezultate organizira v strukturiran, tedenski načrt. Priporočila za vsak teden so prikazana v klepetu, kar olajša sledenje in napredek. Integracija zagotavlja, da vedno dobite najnovejše in najbolj relevantne učne vire.

## Primeri poizvedb

Preizkusite te poizvedbe v oknu klepeta, da vidite odziv aplikacije:

- `AI-900 certifikat, 8 tednov`
- `Učenje Azure Functions, 4 tedni`
- `Azure DevOps, 6 tednov`
- `Inženiring podatkov na Azure, 10 tednov`
- `Microsoftovi varnostni temelji, 5 tednov`
- `Power Platform, 7 tednov`
- `Azure AI storitve, 12 tednov`
- `Oblačna arhitektura, 9 tednov`

Ti primeri prikazujejo prilagodljivost aplikacije za različne učne cilje in časovne okvire.

## Viri

- [Chainlit dokumentacija](https://docs.chainlit.io/)
- [MCP dokumentacija](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->