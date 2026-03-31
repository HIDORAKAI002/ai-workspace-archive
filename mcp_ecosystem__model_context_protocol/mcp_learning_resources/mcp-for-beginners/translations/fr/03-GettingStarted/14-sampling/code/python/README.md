# Exécuter l'exemple

## Créer un environnement virtuel

```sh
python -m venv venv
source ./venv/bin/activate
```

## Installer les dépendances

```sh
pip install "mcp[cli]"
```

## Lancer le serveur

```sh
uvicorn server:app --port 8000
```

## Tester le serveur avec GitHub Copilot et VS Code

Ajoutez l'entrée dans mcp.json comme suit :

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Assurez-vous de cliquer sur "start" sur le serveur.

Dans GitHub Copilot, collez l'invite suivante :

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

La première fois, on vous demandera si vous acceptez une action de Sampling, puis on vous demandera d'accepter que l'outil exécute "create_blog". Vous devriez voir une réponse similaire à :

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçons d’assurer l’exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source officielle. Pour les informations critiques, une traduction professionnelle humaine est recommandée. Nous déclinons toute responsabilité en cas de malentendus ou d’interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->