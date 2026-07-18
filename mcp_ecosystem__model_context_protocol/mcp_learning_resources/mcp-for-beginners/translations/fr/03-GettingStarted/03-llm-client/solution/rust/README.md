# Exécuter cet exemple

Voici la solution Rust pour l'exemple de client LLM. Vous devez avoir une chaîne d'outils Rust installée ; voir le [guide d'installation officiel](https://www.rust-lang.org/tools/install).

Le client appelle un modèle via le point d'entrée d'inférence des modèles GitHub (`https://models.github.ai/inference/chat`) et lit votre jeton d'accès personnel GitHub (PAT) depuis la variable d'environnement `OPENAI_API_KEY`.

> [!NOTE]
> D'autres solutions dans ce dépôt utilisent `GITHUB_TOKEN`. Pour Rust, définissez `OPENAI_API_KEY` avec la même valeur pour correspondre à la configuration du client OpenAI.

## -0- Définissez votre jeton GitHub

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Construisez l'exemple

```bash
cargo build
```

## -2- Exécutez l'exemple

```bash
cargo run
```

Le client démarre le serveur MCP du calculateur, récupère sa liste d'outils et utilise le modèle (`openai/gpt-5-mini`) pour appeler l'outil `add`. Vous devriez voir une sortie indiquant l'appel de l'outil (par exemple, "Calling tool: add") et le résultat de cet appel.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->