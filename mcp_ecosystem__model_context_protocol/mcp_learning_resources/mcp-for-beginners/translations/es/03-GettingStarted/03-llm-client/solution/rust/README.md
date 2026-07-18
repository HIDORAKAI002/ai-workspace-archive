# Ejecutar este ejemplo

Esta es la solución en Rust para el ejemplo del cliente LLM. Necesitas tener instalado un conjunto de herramientas de Rust; consulta la [guía oficial de instalación](https://www.rust-lang.org/tools/install).

El cliente llama a un modelo a través del endpoint de inferencia GitHub Models (`https://models.github.ai/inference/chat`) y lee tu token de acceso personal (PAT) de GitHub desde la variable de entorno `OPENAI_API_KEY`.

> [!NOTE]
> Otras soluciones en este repositorio usan `GITHUB_TOKEN`. Para Rust, configura `OPENAI_API_KEY` con el mismo valor para coincidir con la configuración del cliente OpenAI.

## -0- Establece tu token de GitHub

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Compila el ejemplo

```bash
cargo build
```

## -2- Ejecuta el ejemplo

```bash
cargo run
```

El cliente inicia el servidor calculadora MCP, obtiene su lista de herramientas y usa el modelo (`openai/gpt-5-mini`) para llamar a la herramienta `add`. Deberías ver una salida que indica la llamada a la herramienta (por ejemplo, "Calling tool: add") y el resultado de esa llamada.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->