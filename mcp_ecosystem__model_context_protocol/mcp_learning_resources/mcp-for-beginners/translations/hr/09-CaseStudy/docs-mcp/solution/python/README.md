# Generator plana učenja s Chainlit i Microsoft Learn Docs MCP

## Preduvjeti

- Python 3.8 ili noviji
- pip (Python upravitelj paketa)
- Internetska veza za povezivanje na Microsoft Learn Docs MCP poslužitelj

## Instalacija

1. Klonirajte ovaj repozitorij ili preuzmite datoteke projekta.  
2. Instalirajte potrebne ovisnosti:

   ```bash
   pip install -r requirements.txt
   ```

## Korištenje

### Scenarij 1: Jednostavan upit na Docs MCP  
Klijent naredbenog retka koji se povezuje na Docs MCP poslužitelj, šalje upit i ispisuje rezultat.

1. Pokrenite skriptu:  
   ```bash
   python scenario1.py
   ```
2. Unesite svoje pitanje o dokumentaciji na upitniku.

### Scenarij 2: Generator plana učenja (Chainlit web aplikacija)  
Web sučelje (koristeći Chainlit) koje korisnicima omogućuje generiranje personaliziranog plana učenja tjedan po tjedan za bilo koju tehničku temu.

1. Pokrenite Chainlit aplikaciju:  
   ```bash
   chainlit run scenario2.py
   ```
2. Otvorite lokalnu URL adresu prikazanu u vašem terminalu (npr. http://localhost:8000) u pregledniku.  
3. U prozoru za chat unesite svoju temu učenja i broj tjedana koje želite učiti (npr. "AI-900 certifikacija, 8 tjedana").  
4. Aplikacija će odgovoriti s planom učenja tjedan po tjedan, uključujući poveznice na relevantnu Microsoft Learn dokumentaciju.

**Potrebne varijable okoline:**

Za korištenje Scenarija 2 (Chainlit web aplikacija s Azure OpenAI), morate postaviti sljedeće varijable okoline u datoteci `.env` u mapi `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```
  
Ispunite ove vrijednosti detaljima vašeg Azure OpenAI resursa prije pokretanja aplikacije.

> [!TIP]  
> Model možete lako postaviti koristeći [Microsoft Foundry](https://ai.azure.com/).

### Scenarij 3: Dokumentacija u uređivaču s MCP poslužiteljem u VS Codeu

Umjesto da prebacujete kartice preglednika za pretraživanje dokumentacije, možete dovesti Microsoft Learn Docs izravno u VS Code koristeći MCP poslužitelj. Ovo vam omogućuje da:  
- Pretražujete i čitate dokumentaciju unutar VS Codea bez napuštanja okruženja za kodiranje.  
- Referencirate dokumentaciju i umećete poveznice izravno u svoje README ili datoteke tečaja.  
- Koristite GitHub Copilot i MCP zajedno za neprimjetan AI-vođen tijek rada s dokumentacijom.

**Primjeri upotrebe:**  
- Brzo dodajte referentne poveznice u README dok pišete dokumentaciju tečaja ili projekta.  
- Koristite Copilot za generiranje koda, a MCP za trenutno pronalaženje i citiranje relevantne dokumentacije.  
- Ostanite usredotočeni u uređivaču i povećajte produktivnost.

> [!IMPORTANT]  
> Provjerite imate li valjanu [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) konfiguraciju u svom radnom prostoru (lokacija je `.vscode/mcp.json`).

## Zašto Chainlit za Scenarij 2?

Chainlit je moderan open-source okvir za izgradnju konverzacijskih web aplikacija. Omogućuje jednostavno stvaranje chat korisničkih sučelja koja se povezuju na pozadinske usluge poput Microsoft Learn Docs MCP poslužitelja. Ovaj projekt koristi Chainlit kako bi pružio jednostavan, interaktivni način generiranja personaliziranih planova učenja u stvarnom vremenu. Korištenjem Chainlit-a možete brzo izgraditi i implementirati chat alate koji poboljšavaju produktivnost i učenje.

## Što ova aplikacija radi

Ova aplikacija omogućuje korisnicima stvaranje personaliziranog plana učenja jednostavnim unosom teme i trajanja. Aplikacija analizira vaš unos, šalje upit Microsoft Learn Docs MCP poslužitelju za relevantni sadržaj i organizira rezultate u strukturirani, tjedan po tjedan plan. Preporuke za svaki tjedan prikazuju se u chatu, što olakšava praćenje i napredak. Integracija osigurava da uvijek dobijete najnovije i najrelevantnije izvore za učenje.

## Primjeri upita

Isprobajte ove upite u chat prozoru da vidite kako aplikacija odgovara:

- `AI-900 certifikacija, 8 tjedana`  
- `Nauči Azure Functions, 4 tjedna`  
- `Azure DevOps, 6 tjedana`  
- `Data engineering na Azureu, 10 tjedana`  
- `Microsoft sigurnosni temelji, 5 tjedana`  
- `Power Platform, 7 tjedana`  
- `Azure AI servisi, 12 tjedana`  
- `Cloud arhitektura, 9 tjedana`

Ovi primjeri pokazuju fleksibilnost aplikacije za različite ciljeve učenja i vremenske okvire.

## Reference

- [Chainlit dokumentacija](https://docs.chainlit.io/)  
- [MCP dokumentacija](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->