# Pokretanje primjera

Ovdje pretpostavljamo da već imate radni server kod. Molimo pronađite server iz nekog od ranijih poglavlja.

## Postavljanje mcp.json

Evo datoteke koju koristite kao referencu, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Promijenite unos za server prema potrebi kako biste naveli apsolutnu putanju do vašeg servera uključujući potrebnu kompletnu naredbu za pokretanje.

U primjeru datoteke navedenom gore unos za server izgleda ovako:

<details>
<summary>node.js</summary>
```json
"hello-mcp": {
    "command": "node",
    "args": [
        "build/index.js"
    ]
}
```
</details>

<details>
<summary>.NET</summary>

Možda ćete morati unijeti korijen GitHub repozitorija, koji se može dohvatiti naredbom `git rev-parse --show-toplevel`.

```jsonc
{
  "inputs": [
    {
      "type": "promptString",
      "id": "repository-root",
      "description": "The absolute path to the repository root"
    }
  ],
  "servers": {
    "calculator-mcp-dotnet": {
      "type": "stdio",
      "command": "dotnet",
      "args": [
        "run",
        "--project",
        "${input:repository-root}/03-GettingStarted/02-client/solution/server/server.csproj"
      ]
    }
  }
}
```

</details>

Ovo odgovara pokretanju naredbe poput: `node build/index.js`.

- Promijenite ovaj unos za server da odgovara lokaciji vaše server datoteke ili onome što je potrebno za pokretanje vašeg servera, ovisno o odabranom runtimeu i lokaciji servera.

## Iskoristite značajke na serveru

- Kliknite ikonu `play` nakon što ste dodali *mcp.json* u mapu *./vscode*,

    Primijetite da se ikona alata promijenila povećavajući broj dostupnih alata. Ikona alata nalazi se odmah iznad polja za chat u GitHub Copilot-u.

## Pokrenite alat

- Upišite upit u vaš chat prozor koji odgovara opisu vašeg alata. Na primjer, za pokretanje alata `add` upišite nešto poput "add 3 to 20".

    Trebali biste vidjeti da alat bude prikazan iznad okvira za unos teksta čavrljanja, upućujući vas da odaberete pokretanje alata kao na ovom prikazu:

    ![VS Code pokazuje da želi pokrenuti alat](../../../../../translated_images/hr/vscode-agent.d5a0e0b897331060.webp)

    Odabirom alata trebali biste dobiti numerički rezultat "23" ako je vaš upit bio kao što smo ranije spomenuli.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->