# Ejecutando el ejemplo

Aquí asumimos que ya tienes un código de servidor funcionando. Por favor, localiza un servidor de uno de los capítulos anteriores.

## Configurar mcp.json

Aquí tienes un archivo que usas como referencia, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

Cambia la entrada del servidor según sea necesario para indicar la ruta absoluta a tu servidor incluyendo el comando completo necesario para ejecutarlo.

En el archivo de ejemplo mencionado arriba, la entrada del servidor se ve así:

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

Puede que tengas que ingresar la raíz del repositorio de GitHub, que puede obtenerse con el comando, `git rev-parse --show-toplevel`.

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

Esto corresponde a ejecutar un comando como: `node build/index.js`.

- Cambia esta entrada del servidor para que se ajuste a dónde está ubicado el archivo de tu servidor o a lo que sea necesario para iniciar tu servidor dependiendo del entorno de ejecución elegido y la ubicación del servidor.

## Consumir las funciones en el servidor

- Haz clic en el ícono de `play`, una vez que hayas agregado *mcp.json* a la carpeta *./vscode*,

    Observa cómo el ícono de herramientas cambia para aumentar el número de herramientas disponibles. El ícono de herramientas está ubicado justo encima del campo de chat en GitHub Copilot.

## Ejecutar una herramienta

- Escribe un mensaje en tu ventana de chat que coincida con la descripción de tu herramienta. Por ejemplo, para activar la herramienta `add` escribe algo como "add 3 to 20".

    Deberías ver que una herramienta se presenta encima del cuadro de texto del chat indicando que selecciones para ejecutar la herramienta como en esta imagen:

    ![VS Code indicando que quiere ejecutar una herramienta](../../../../../translated_images/es/vscode-agent.d5a0e0b897331060.webp)

    Seleccionar la herramienta debería producir un resultado numérico diciendo "23" si tu mensaje fue como mencionamos anteriormente.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->