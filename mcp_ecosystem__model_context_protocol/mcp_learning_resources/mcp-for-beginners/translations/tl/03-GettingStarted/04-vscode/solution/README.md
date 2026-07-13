# Pagpapatakbo ng halimbawa

Dito ay ipinapalagay namin na mayroon ka nang gumaganang server code. Mangyaring hanapin ang isang server mula sa isa sa mga mas naunang kabanata.

## I-set up ang mcp.json

Narito ang isang file na maaari mong gamitin bilang sanggunian, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Baguhin ang server entry ayon sa kailangan upang ituro ang absolutong path sa iyong server kabilang ang kinakailangang buong command para patakbuhin ito.

Sa halimbawa ng file na tinutukoy sa itaas, ang server entry ay ganito ang anyo:

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

Maaaring kailanganin mong ilagay ang root ng GitHub repository, na maaaring makuha gamit ang command na `git rev-parse --show-toplevel`.

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

Ito ay tumutukoy sa pagpapatakbo ng command na katulad nito: `node build/index.js`.

- Baguhin ang server entry na ito upang umangkop kung saan matatagpuan ang iyong server file o ayon sa kinakailangan para sa pagsisimula ng iyong server depende sa napili mong runtime at lokasyon ng server.

## Gamitin ang mga tampok sa server

- I-click ang `play` icon, kapag naidagdag mo na ang *mcp.json* sa *./vscode* folder,

    Pansinin ang pagbabago sa tooling icon upang tumaas ang bilang ng mga magagamit na tools. Ang tooling icon ay matatagpuan agad sa itaas ng chat field sa GitHub Copilot.

## Patakbuhin ang isang tool

- Mag-type ng prompt sa iyong chat window na tumutugma sa paglalarawan ng iyong tool. Halimbawa, upang paganahin ang tool `add` mag-type ng katulad ng "add 3 to 20".

    Makikita mong ipinapakita ang isang tool sa itaas ng chat text box na nagpapahiwatig na maaari mong piliin para patakbuhin ang tool gaya ng nasa visual na ito:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/tl/vscode-agent.d5a0e0b897331060.webp)

    Ang pagpili sa tool ay dapat maglabas ng numerong resulta na nagsasabing "23" kung ang prompt mo ay katulad ng nabanggit namin kanina.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->