# Executando o exemplo

Aqui assumimos que você já possui um código de servidor funcional. Por favor, localize um servidor de um dos capítulos anteriores.

## Configurar o mcp.json

Aqui está um arquivo que você usa como referência, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Altere a entrada do servidor conforme necessário para apontar o caminho absoluto para o seu servidor, incluindo o comando completo necessário para executá-lo.

No arquivo de exemplo mencionado acima, a entrada do servidor é assim:

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

Você pode precisar inserir o diretório raiz do repositório GitHub, que pode ser obtido com o comando `git rev-parse --show-toplevel`.

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

Isso corresponde a executar um comando assim: `node build/index.js`.

- Altere esta entrada do servidor para corresponder aonde seu arquivo de servidor está localizado ou conforme o necessário para iniciar seu servidor, dependendo do runtime escolhido e da localização do servidor.

## Consumir as funcionalidades no servidor

- Clique no ícone `play`, uma vez que você tenha adicionado *mcp.json* na pasta *./vscode*,

    Observe que o ícone da ferramenta muda para aumentar o número de ferramentas disponíveis. O ícone da ferramenta está localizado logo acima do campo de chat no GitHub Copilot.

## Executar uma ferramenta

- Digite um comando na janela de chat que corresponda à descrição da sua ferramenta. Por exemplo, para ativar a ferramenta `add`, digite algo como "add 3 to 20".

    Você deve ver uma ferramenta sendo apresentada acima da caixa de texto do chat indicando para que você selecione e execute a ferramenta, como neste exemplo visual:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/pt-BR/vscode-agent.d5a0e0b897331060.webp)

    Selecionar a ferramenta deve produzir um resultado numérico dizendo "23" se seu comando foi como mencionamos anteriormente.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->