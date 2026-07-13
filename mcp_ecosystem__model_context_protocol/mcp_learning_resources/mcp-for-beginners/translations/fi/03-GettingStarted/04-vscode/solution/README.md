# Näytteen suorittaminen

Tässä oletetaan, että sinulla on jo toimiva palvelinkoodi. Etsi palvelin jostain aikaisemmista luvuista.

## Aseta mcp.json

Tässä on tiedosto, jota käytät viitteenä, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Muuta palvelin-kohdetta tarpeen mukaan määrittämään absoluuttinen polku palvelimeesi mukaan lukien tarvittava täydellinen komento käynnistämiseen.

Esimerkkitiedostossa, johon viitattiin yllä, palvelin-kohde näyttää tältä:

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

Saatat joutua syöttämään GitHub-repositorion juuripolun, jonka saa komennolla `git rev-parse --show-toplevel`.

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

Tämä vastaa komennon ajamista seuraavasti: `node build/index.js`.

- Muuta tämä palvelin-kohta vastaamaan sitä, missä palvelintiedostosi sijaitsee tai mitä käynnistämiseen tarvitaan valitsemasi suoritusympäristön ja palvelimen sijainnin mukaan.

## Käytä palvelimen ominaisuuksia

- Klikkaa `play` kuvaketta, kun olet lisännyt *mcp.json*-tiedoston *./vscode*-kansioon,

    Huomaa, kuinka työkalun kuvake muuttuu ja saatavilla olevien työkalujen määrä kasvaa. Työkalun kuvake sijaitsee GitHub Copilotin keskustelukentän yläpuolella.

## Suorita työkalu

- Kirjoita kehotteeseesi jotain, joka vastaa työkalun kuvausta. Esimerkiksi käynnistääksesi työkalun `add` kirjoita jotain kuten "add 3 to 20".

    Näet työkalun esitettävän keskustelutekstikentän yläpuolella, joka kehottaa sinua valitsemaan työkalun sen suorittamiseksi, kuten tässä kuvassa:

    ![VS Code osoittaa haluavansa suorittaa työkalun](../../../../../translated_images/fi/vscode-agent.d5a0e0b897331060.webp)

    Työkalun valinta tuottaa numeerisen tuloksen, joka sanoo "23", jos kehotteesi oli kuten edellä mainittu.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->