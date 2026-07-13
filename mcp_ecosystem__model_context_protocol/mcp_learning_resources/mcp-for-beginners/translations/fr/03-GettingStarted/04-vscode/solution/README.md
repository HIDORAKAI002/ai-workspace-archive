# Exécuter l'exemple

Ici, nous supposons que vous avez déjà un code serveur fonctionnel. Veuillez localiser un serveur dans l'un des chapitres précédents.

## Configurez mcp.json

Voici un fichier que vous utilisez comme référence, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Modifiez l'entrée du serveur selon les besoins pour indiquer le chemin absolu vers votre serveur, y compris la commande complète nécessaire pour le lancer.

Dans l'exemple de fichier mentionné ci-dessus, l'entrée du serveur ressemble à ceci :

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

Vous devrez peut-être indiquer la racine du dépôt GitHub, que vous pouvez obtenir avec la commande `git rev-parse --show-toplevel`.

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

Cela correspond à l'exécution d'une commande comme : `node build/index.js`.

- Modifiez cette entrée de serveur pour correspondre à l'emplacement de votre fichier serveur ou à ce qui est nécessaire pour démarrer votre serveur selon le runtime et l'emplacement que vous avez choisis.

## Utiliser les fonctionnalités du serveur

- Cliquez sur l'icône `play`, une fois que vous avez ajouté *mcp.json* dans le dossier *./vscode*,

    Observez le changement de l'icône des outils qui augmente le nombre d'outils disponibles. L'icône des outils est située juste au-dessus du champ de chat dans GitHub Copilot.

## Exécuter un outil

- Tapez une invite dans votre fenêtre de chat correspondant à la description de votre outil. Par exemple, pour déclencher l'outil `add`, tapez quelque chose comme "add 3 to 20".

    Vous devriez voir un outil s'afficher au-dessus de la zone de texte du chat vous invitant à sélectionner l'outil à exécuter, comme dans ce visuel :

    ![VS Code indiquant qu'il veut exécuter un outil](../../../../../translated_images/fr/vscode-agent.d5a0e0b897331060.webp)

    Sélectionner l'outil devrait produire un résultat numérique affichant "23" si votre invite était comme nous l'avons mentionné précédemment.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->