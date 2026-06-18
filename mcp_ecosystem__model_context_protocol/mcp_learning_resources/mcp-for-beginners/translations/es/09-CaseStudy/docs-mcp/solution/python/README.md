# Generador de Plan de Estudio con Chainlit y Microsoft Learn Docs MCP

## Requisitos previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Acceso a Internet para conectarse al servidor Microsoft Learn Docs MCP

## Instalación

1. Clona este repositorio o descarga los archivos del proyecto.
2. Instala las dependencias requeridas:

   ```bash
   pip install -r requirements.txt
   ```

## Uso

### Escenario 1: Consulta simple a Docs MCP
Un cliente de línea de comandos que se conecta al servidor Docs MCP, envía una consulta y muestra el resultado.

1. Ejecuta el script:
   ```bash
   python scenario1.py
   ```
2. Introduce tu pregunta sobre documentación en el indicador.

### Escenario 2: Generador de Plan de Estudio (Aplicación Web Chainlit)
Una interfaz web (usando Chainlit) que permite a los usuarios generar un plan de estudio personalizado, semana a semana, para cualquier tema técnico.

1. Inicia la aplicación Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Abre la URL local proporcionada en tu terminal (por ejemplo, http://localhost:8000) en tu navegador.
3. En la ventana del chat, introduce tu tema de estudio y el número de semanas que deseas estudiar (por ejemplo, "certificación AI-900, 8 semanas").
4. La aplicación responderá con un plan de estudio semana a semana, incluyendo enlaces a la documentación relevante de Microsoft Learn.

**Variables de Entorno Requeridas:**

Para usar el Escenario 2 (la aplicación web Chainlit con Azure OpenAI), debes configurar las siguientes variables de entorno en un archivo `.env` dentro del directorio `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Rellena estos valores con los detalles de tu recurso Azure OpenAI antes de ejecutar la aplicación.

> [!TIP]
> Puedes desplegar fácilmente tus propios modelos usando [Microsoft Foundry](https://ai.azure.com/).

### Escenario 3: Documentación en el Editor con MCP Server en VS Code

En lugar de cambiar de pestañas en el navegador para buscar documentación, puedes traer Microsoft Learn Docs directamente a tu VS Code usando el servidor MCP. Esto te permite:
- Buscar y leer documentación dentro de VS Code sin salir de tu entorno de codificación.
- Referenciar documentación e insertar enlaces directamente en tus archivos README o de curso.
- Usar GitHub Copilot y MCP juntos para un flujo de trabajo de documentación asistido por IA sin interrupciones.

**Casos de Uso Ejemplares:**
- Agregar rápidamente enlaces de referencia a un README mientras escribes documentación de curso o proyecto.
- Usar Copilot para generar código y MCP para encontrar y citar documentos relevantes al instante.
- Mantenerte concentrado en tu editor y aumentar la productividad.

> [!IMPORTANT]
> Asegúrate de tener una configuración válida de [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) en tu espacio de trabajo (la ubicación es `.vscode/mcp.json`).

## ¿Por qué Chainlit para el Escenario 2?

Chainlit es un framework moderno y de código abierto para construir aplicaciones web conversacionales. Facilita la creación de interfaces de usuario basadas en chat que se conectan a servicios backend como el servidor Microsoft Learn Docs MCP. Este proyecto usa Chainlit para proporcionar una manera simple e interactiva de generar planes de estudio personalizados en tiempo real. Al aprovechar Chainlit, puedes construir y desplegar rápidamente herramientas basadas en chat que mejoran la productividad y el aprendizaje.

## Qué Hace Esto

Esta aplicación permite a los usuarios crear un plan de estudio personalizado simplemente introduciendo un tema y una duración. La aplicación analiza tu entrada, consulta el servidor Microsoft Learn Docs MCP en busca de contenido relevante y organiza los resultados en un plan estructurado, semana a semana. Las recomendaciones de cada semana se muestran en el chat, facilitando seguir y registrar tu progreso. La integración asegura que siempre obtengas los recursos de aprendizaje más actuales y relevantes.

## Consultas de Ejemplo

Prueba estas consultas en la ventana del chat para ver cómo responde la aplicación:

- `certificación AI-900, 8 semanas`
- `Aprender Azure Functions, 4 semanas`
- `Azure DevOps, 6 semanas`
- `Ingeniería de datos en Azure, 10 semanas`
- `Fundamentos de seguridad de Microsoft, 5 semanas`
- `Power Platform, 7 semanas`
- `Servicios de IA de Azure, 12 semanas`
- `Arquitectura en la nube, 9 semanas`

Estos ejemplos demuestran la flexibilidad de la aplicación para diferentes objetivos y plazos de aprendizaje.

## Referencias

- [Documentación de Chainlit](https://docs.chainlit.io/)
- [Documentación MCP](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->