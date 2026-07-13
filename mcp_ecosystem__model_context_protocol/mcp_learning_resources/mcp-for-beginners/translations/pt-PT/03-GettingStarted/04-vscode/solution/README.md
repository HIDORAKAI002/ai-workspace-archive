# Executar o exemplo

Aqui assumimos que já tem um código de servidor funcional. Por favor, localize um servidor de um dos capítulos anteriores.

## Configurar o mcp.json

Aqui está um ficheiro que usa como referência, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Altere a entrada do servidor conforme necessário para indicar o caminho absoluto para o seu servidor, incluindo o comando completo necessário para executar.

No ficheiro de exemplo referido acima, a entrada do servidor é parecida com isto:

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

Poderá ter de indicar a raiz do repositório GitHub, que pode ser obtida com o comando `git rev-parse --show-toplevel`.

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

Isto corresponde a executar um comando como este: `node build/index.js`.

- Altere esta entrada do servidor para adequar-se à localização do seu ficheiro de servidor ou ao necessário para iniciar o seu servidor, dependendo do runtime escolhido e da localização do servidor.

## Utilizar as funcionalidades no servidor

- Clique no ícone `play`, assim que adicionar *mcp.json* na pasta *./vscode*,

    Observe a alteração do ícone da ferramenta para aumentar o número de ferramentas disponíveis. O ícone da ferramenta encontra-se logo acima do campo de chat no GitHub Copilot.

## Executar uma ferramenta

- Escreva um comando na sua janela de chat que corresponda à descrição da sua ferramenta. Por exemplo, para ativar a ferramenta `add`, escreva algo como "add 3 to 20".

    Deve ver uma ferramenta a ser apresentada acima da caixa de texto do chat, indicando para selecionar para executar a ferramenta, como neste visual:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/pt-PT/vscode-agent.d5a0e0b897331060.webp)

    Selecionar a ferramenta deverá produzir um resultado numérico dizendo "23" se o seu comando for como mencionámos anteriormente.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->