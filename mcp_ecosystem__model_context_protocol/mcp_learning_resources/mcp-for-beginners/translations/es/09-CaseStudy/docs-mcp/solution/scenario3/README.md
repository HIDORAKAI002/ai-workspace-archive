# Escenario 3: Documentación dentro del editor con el servidor MCP en VS Code

## Visión general

En este escenario, aprenderás cómo integrar Microsoft Learn Docs directamente en tu entorno de Visual Studio Code usando el servidor MCP. En lugar de estar cambiando constantemente entre pestañas del navegador para buscar documentación, puedes acceder, buscar y consultar la documentación oficial justo dentro de tu editor. Este enfoque agiliza tu flujo de trabajo, te mantiene enfocado y permite una integración perfecta con herramientas como GitHub Copilot.

- Busca y lee documentación dentro de VS Code sin salir de tu entorno de codificación.
- Consulta documentación e inserta enlaces directamente en tu README o archivos del curso.
- Usa GitHub Copilot y MCP juntos para un flujo de trabajo continuo potenciado por IA.

## Objetivos de aprendizaje

Al final de este capítulo, comprenderás cómo configurar y usar el servidor MCP dentro de VS Code para mejorar tu flujo de trabajo de documentación y desarrollo. Podrás:

- Configurar tu espacio de trabajo para usar el servidor MCP para búsqueda de documentación.
- Buscar e insertar documentación directamente desde VS Code.
- Combinar el poder de GitHub Copilot y MCP para un flujo de trabajo más productivo y potenciado por IA.

Estas habilidades te ayudarán a mantener el enfoque, mejorar la calidad de la documentación y aumentar tu productividad como desarrollador o redactor técnico.

## Solución

Para lograr el acceso a la documentación dentro del editor, seguirás una serie de pasos que integran el servidor MCP con VS Code y GitHub Copilot. Esta solución es ideal para autores de cursos, redactores técnicos y desarrolladores que desean mantenerse enfocados en el editor mientras trabajan con documentación y Copilot.

- Añade rápidamente enlaces de referencia a un README mientras escribes un curso o documentación de proyecto.
- Usa Copilot para generar código y MCP para encontrar y citar instantáneamente documentación relevante.
- Mantente concentrado en tu editor y mejora tu productividad.

### Guía paso a paso

Para comenzar, sigue estos pasos. Para cada paso, puedes añadir una captura de pantalla de la carpeta de recursos para ilustrar visualmente el proceso.

1. **Añade la configuración MCP:**
   En la raíz de tu proyecto, crea un archivo `.vscode/mcp.json` y añade la siguiente configuración:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Esta configuración indica a VS Code cómo conectarse al [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Paso 1: Añadir mcp.json a la carpeta .vscode](../../../../../../translated_images/es/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Abre el panel de GitHub Copilot Chat:**
   Si aún no tienes instalada la extensión de GitHub Copilot, ve a la vista de Extensiones en VS Code e instálala. Puedes descargarla directamente desde el [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Luego, abre el panel de Copilot Chat desde la barra lateral.

   ![Paso 2: Abrir panel de Copilot Chat](../../../../../../translated_images/es/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Habilita el modo agente y verifica las herramientas:**
   En el panel de Copilot Chat, activa el modo agente.

   ![Paso 3: Habilitar modo agente y verificar herramientas](../../../../../../translated_images/es/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Después de activar el modo agente, verifica que el servidor MCP esté listado como una de las herramientas disponibles. Esto asegura que el agente Copilot pueda acceder al servidor de documentación para obtener información relevante.
   
   ![Paso 3: Verificar herramienta del servidor MCP](../../../../../../translated_images/es/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Inicia una nueva charla y consulta al agente:**
   Abre un chat nuevo en el panel de Copilot Chat. Ahora puedes hacer preguntas al agente sobre documentación. El agente usará el servidor MCP para obtener y mostrar documentación relevante de Microsoft Learn directamente en tu editor.

   - *"Estoy tratando de escribir un plan de estudio para el tema X. Lo estudiaré por 8 semanas, para cada semana, sugiere el contenido que debería tomar."*

   ![Paso 4: Preguntar al agente en el chat](../../../../../../translated_images/es/step4-prompt-chat.12187bb001605efc.webp)

5. **Consulta en vivo:**

   > Tomemos una consulta en vivo de la sección [#get-help](https://discord.gg/D6cRhjHWSC) en Microsoft Foundry Discord ([ver mensaje original](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Estoy buscando respuestas sobre cómo desplegar una solución multiagente con agentes de IA desarrollados en Azure AI Foundry. Veo que no hay un método de despliegue directo, como canales de Copilot Studio. Entonces, ¿cuáles son las diferentes formas de hacer este despliegue para que los usuarios empresariales interactúen y realicen el trabajo? Hay numerosos artículos/blogs que dicen que podemos usar el servicio Azure Bot para hacer este trabajo, el cual podría actuar como puente entre MS Teams y los agentes de Azure AI Foundry. ¿Funcionaría esto si configuro un bot de Azure que se conecte al agente Orchestrator en Azure AI Foundry vía función Azure para realizar la orquestación, o necesito crear una función Azure para cada agente IA que forma parte de la solución multiagente para hacer la orquestación en el marco Bot? Cualquier otra sugerencia es muy bienvenida."*

   ![Paso 5: Consultas en vivo](../../../../../../translated_images/es/step5-live-queries.49db3e4a50bea273.webp)

   El agente responderá con enlaces a documentación relevante y resúmenes, que luego podrás insertar directamente en tus archivos markdown o usar como referencias en tu código.
   
### Consultas de ejemplo

Aquí tienes algunos ejemplos de consultas que puedes probar. Estas consultas mostrarán cómo el servidor MCP y Copilot pueden trabajar juntos para proporcionar documentación y referencias instantáneas y contextuales sin salir de VS Code:

- "Muéstrame cómo usar los triggers de Azure Functions."
- "Inserta un enlace a la documentación oficial de Azure Key Vault."
- "¿Cuáles son las mejores prácticas para asegurar recursos de Azure?"
- "Encuentra un rápido inicio para servicios de Azure AI."

Estas consultas demostrarán cómo el servidor MCP y Copilot pueden trabajar juntos para proporcionar documentación y referencias instantáneas y contextuales sin salir de VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->