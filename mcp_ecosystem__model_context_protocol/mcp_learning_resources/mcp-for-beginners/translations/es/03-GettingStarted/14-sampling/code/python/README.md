# Ejecutar el ejemplo

## Crear entorno virtual

```sh
python -m venv venv
source ./venv/bin/activate
```

## Instalar dependencias

```sh
pip install "mcp[cli]"
```

## Ejecutar el servidor

```sh
uvicorn server:app --port 8000
```

## Probar el servidor con GitHub Copilot y VS Code

Agrega la entrada a mcp.json de la siguiente manera:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Asegúrate de hacer clic en "start" en el servidor.

En GitHub Copilot pega el siguiente prompt:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

La primera vez se te preguntará si aceptas una acción de Sampling, luego se te pedirá aceptar que la herramienta ejecute "create_blog". Deberías ver una respuesta similar a:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso legal**:  
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Si bien nos esforzamos por la exactitud, tenga en cuenta que las traducciones automáticas pueden contener errores o imprecisiones. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por humanos. No somos responsables de ningún malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->