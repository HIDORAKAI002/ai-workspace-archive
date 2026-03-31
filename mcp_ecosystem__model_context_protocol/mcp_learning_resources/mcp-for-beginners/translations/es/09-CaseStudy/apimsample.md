# Estudio de caso: Exponer REST API en API Management como un servidor MCP

Azure API Management es un servicio que proporciona una puerta de enlace sobre sus puntos de conexión API. Su funcionamiento consiste en que Azure API Management actúa como un proxy delante de sus API y puede decidir qué hacer con las solicitudes entrantes.

Al utilizarlo, añade una gran variedad de características como:

- **Seguridad**, puede usar desde claves API, JWT hasta identidad gestionada.
- **Limitación de frecuencia**, una gran característica es poder decidir cuántas llamadas se permiten por una determinada unidad de tiempo. Esto ayuda a asegurar que todos los usuarios tengan una excelente experiencia y que su servicio no se vea abrumado por las solicitudes.
- **Escalado y balanceo de carga**. Puede configurar varios puntos de conexión para distribuir la carga y también puede decidir cómo "balancear la carga".
- **Funciones de IA como caching semántico**, límite de tokens y monitoreo de tokens, entre otros. Son excelentes funciones que mejoran la capacidad de respuesta y también le ayudan a controlar el gasto en tokens. [Lea más aquí](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## ¿Por qué MCP + Azure API Management?

Model Context Protocol se está convirtiendo rápidamente en un estándar para aplicaciones de IA agentica y la forma de exponer herramientas y datos de manera consistente. Azure API Management es una elección natural cuando necesita "administrar" APIs. Los servidores MCP a menudo se integran con otras APIs para resolver solicitudes a una herramienta, por ejemplo. Por lo tanto, combinar Azure API Management y MCP tiene mucho sentido.

## Resumen

En este caso de uso específico aprenderemos a exponer puntos de conexión API como un servidor MCP. Al hacer esto, podemos integrar fácilmente estos puntos de conexión en una aplicación agentica mientras aprovechamos las funciones de Azure API Management.

## Características clave

- Selecciona los métodos del endpoint que desea exponer como herramientas.
- Las características adicionales que obtiene dependen de lo que configure en la sección de políticas para su API. Pero aquí le mostraremos cómo puede agregar limitación de frecuencia.

## Paso previo: importar una API

Si ya tiene una API en Azure API Management, genial, entonces puede omitir este paso. Si no, consulte este enlace, [importar una API en Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Exponer API como servidor MCP

Para exponer los puntos de conexión de la API, sigamos estos pasos:

1. Navegue al Portal de Azure y a la siguiente dirección <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Navegue a su instancia de API Management.

1. En el menú izquierdo, seleccione APIs > MCP Servers > + Crear nuevo MCP Server.

1. En API, seleccione una API REST para exponer como servidor MCP.

1. Seleccione una o más operaciones API para exponer como herramientas. Puede seleccionar todas las operaciones o sólo operaciones específicas.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Seleccione **Crear**.

1. Navegue a la opción de menú **APIs** y **MCP Servers**, debería ver lo siguiente:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    El servidor MCP está creado y las operaciones API están expuestas como herramientas. El servidor MCP figura en el panel MCP Servers. La columna URL muestra el endpoint del servidor MCP que puede llamar para pruebas o dentro de una aplicación cliente.

## Opcional: Configurar políticas

Azure API Management tiene el concepto central de políticas donde configura diferentes reglas para sus endpoints como por ejemplo limitación de frecuencia o caching semántico. Estas políticas se redactan en XML.

Así es como puede configurar una política para limitar la frecuencia en su servidor MCP:

1. En el portal, bajo APIs, seleccione **MCP Servers**.

1. Seleccione el servidor MCP que creó.

1. En el menú izquierdo, bajo MCP, seleccione **Políticas**.

1. En el editor de políticas, agregue o edite las políticas que desea aplicar a las herramientas del servidor MCP. Las políticas están definidas en formato XML. Por ejemplo, puede agregar una política para limitar las llamadas a las herramientas del servidor MCP (en este ejemplo, 5 llamadas cada 30 segundos por dirección IP de cliente). Aquí está el XML que provoca la limitación de frecuencia:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Aquí una imagen del editor de políticas:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Pruébelo

Asegurémonos de que nuestro servidor MCP funciona como se espera.

Para esto, usaremos Visual Studio Code y GitHub Copilot en modo Agente. Agregaremos el servidor MCP a un *mcp.json*. Al hacer esto, Visual Studio Code actuará como un cliente con capacidades agenticas y los usuarios finales podrán escribir un prompt e interactuar con dicho servidor.

Veamos cómo, para agregar el servidor MCP en Visual Studio Code:

1. Use el comando MCP: **Agregar servidor desde la Paleta de comandos**.

1. Cuando se le solicite, seleccione el tipo de servidor: **HTTP (HTTP o Server Sent Events)**.

1. Ingrese la URL del servidor MCP en API Management. Ejemplo: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (para endpoint SSE) o **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (para endpoint MCP), observe cómo la diferencia entre los transportes es `/sse` o `/mcp`.

1. Ingrese un ID de servidor de su preferencia. No es un valor importante pero le ayudará a recordar qué instancia de servidor es.

1. Seleccione si desea guardar la configuración en la configuración del espacio de trabajo o en la configuración de usuario.

  - **Configuración del espacio de trabajo** - La configuración del servidor se guarda en un archivo .vscode/mcp.json sólo disponible en el espacio de trabajo actual.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    o si elige HTTP en modo streaming como transporte sería ligeramente diferente:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Configuración de usuario** - La configuración del servidor se añade a su archivo global *settings.json* y está disponible en todos los espacios de trabajo. La configuración se ve similar a la siguiente:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. También necesitará agregar configuración, un encabezado para asegurarse de que se autentica correctamente con Azure API Management. Utiliza un encabezado llamado **Ocp-Apim-Subscription-Key**.

    - Así es como puede añadirlo a configuración:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), esto hará que se muestre un prompt pidiendo el valor de la clave API, la cual puede encontrar en el Portal de Azure para su instancia de Azure API Management.

   - Para añadirlo a *mcp.json* en su lugar, puede añadirlo así:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Usar el modo Agente

Ahora todo está configurado ya sea en settings o en *.vscode/mcp.json*. Probémoslo.

Debería haber un icono de Herramientas como este, donde las herramientas expuestas por su servidor están listadas:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Haga clic en el icono de herramientas y debería ver una lista de herramientas como esta:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Escriba un prompt en el chat para invocar la herramienta. Por ejemplo, si seleccionó una herramienta para obtener información sobre un pedido, puede preguntar al agente acerca de un pedido. Aquí un ejemplo de prompt:

    ```text
    get information from order 2
    ```

    Ahora se le mostrará un icono de herramientas pidiéndole proceder a llamar a una herramienta. Seleccione continuar ejecutando la herramienta, ahora debería ver una salida como esta:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **lo que vea arriba depende de las herramientas que haya configurado, pero la idea es que obtenga una respuesta textual como la mostrada**


## Referencias

Así es como puede aprender más:

- [Tutorial sobre Azure API Management y MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Ejemplo Python: Servidores MCP remotos seguros usando Azure API Management (experimental)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Laboratorio de autorización de clientes MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Use la extensión de Azure API Management para VS Code para importar y administrar APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registrar y descubrir servidores MCP remotos en Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Gran repositorio que muestra muchas capacidades de IA con Azure API Management
- [Talleres AI Gateway](https://azure-samples.github.io/AI-Gateway/) Contiene talleres usando el Portal de Azure, que es una excelente manera de comenzar a evaluar capacidades de IA.

## Qué sigue

- Volver a: [Resumen de estudios de caso](./README.md)
- Siguiente: [Agentes de viaje con Azure AI](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por mantener la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda la traducción profesional realizada por humanos. No nos hacemos responsables por cualquier malentendido o interpretación errónea que pueda surgir del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->