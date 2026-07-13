# Kuendesha sampuli

Hapa tunadhani tayari una msimbo wa seva unaofanya kazi. Tafadhali tafuta seva kutoka moja ya sura za awali.

## Weka mcp.json

Hapa kuna faili unayotumia kama rejea, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Badilisha kipengee cha seva inavyohitajika kuonyesha njia kamili ya seva yako pamoja na amri kamili inayohitajika kuendesha.

Katika mfano wa faili ulioitaja hapo juu kipengee cha seva kinaonekana kama hivi:

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

Huenda unahitaji kuingiza mzizi wa hifadhi ya GitHub, ambayo inaweza kupatikana kwa amri, `git rev-parse --show-toplevel`.

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

Hii inaendana na kuendesha amri kama ifuatavyo: `node build/index.js`.

- Badilisha kipengee hiki cha seva ili kiendane na mahali faili yako ya seva iko au kile kinachohitajika kuanzisha seva yako kulingana na mazingira na mahali pa seva ulivyochagua.

## Tumia vipengele katika seva

- Bonyeza ikoni ya `play`, mara baada ya kuongeza *mcp.json* kwenye folda *./vscode*,

    Angalia ikoni ya zana kubadilika kuongeza idadi ya zana zinazopatikana. Ikoni ya zana iko juu kwa kidogo ya uwanja wa mazungumzo katika GitHub Copilot.

## Endesha chombo

- Andika maelekezo katika dirisha la mazungumzo ambalo linafanana na maelezo ya chombo chako. Kwa mfano ili kuanzisha chombo `add` andika kitu kama "add 3 to 20".

    Unapaswa kuona chombo kikiwa kimeonyeshwa juu ya kisanduku cha maandishi ya mazungumzo kinachoonyesha chaguo la kuendesha chombo kama katika picha hii:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/sw/vscode-agent.d5a0e0b897331060.webp)

    Kuchagua chombo kinapaswa kutoa matokeo ya nambari akisema "23" ikiwa maelekezo yako yalikuwa kama tulivyotaja awali.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->