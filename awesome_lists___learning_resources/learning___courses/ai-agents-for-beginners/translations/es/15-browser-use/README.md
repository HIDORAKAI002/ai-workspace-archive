# Construcción de Agentes de Uso de Computadora (CUA)

Los agentes de uso de computadora pueden interactuar con sitios web de la misma manera que lo haría una persona: abriendo un navegador, inspeccionando la página y tomando la mejor acción siguiente según lo que ven. En esta lección, construirás un agente de automatización de navegador que busca en Airbnb, extrae datos estructurados de listados e identifica la estadía más barata en Estocolmo.

La lección combina Browser-Use para navegación guiada por IA, Playwright y el Protocolo de Herramientas para Desarrolladores de Chrome (CDP) para el control del navegador, Azure OpenAI para razonamiento habilitado por visión y Pydantic para extracción estructurada.

## Introducción

Esta lección cubrirá:

- Entender cuándo los agentes de uso de computadora son una mejor opción que la automatización solo por API
- Combinar Browser-Use con Playwright y CDP para una gestión confiable del ciclo de vida del navegador
- Usar visión de Azure OpenAI y salida estructurada con Pydantic para extraer datos de listados desde páginas web dinámicas
- Decidir cuándo usar un flujo de trabajo de automatización de navegador primero agente, primero actor, o híbrido

## Objetivos de Aprendizaje

Después de completar esta lección, sabrás cómo:

- Configurar Browser-Use con Azure OpenAI y Playwright
- Construir un flujo de automatización de navegador que navegue en un sitio real y maneje elementos UI dinámicos
- Extraer resultados tipados desde contenido visible en la página y convertirlos en lógica de negocio posterior
- Elegir entre los patrones de agente y actor según qué tan predecible sea la tarea en el navegador

## Ejemplo de Código

Esta lección incluye un tutorial en notebook:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Lanza una sesión de Chrome sobre CDP, busca listados en Airbnb para Estocolmo, extrae precios con visión de Browser-Use y devuelve la opción más barata como datos estructurados.

## Requisitos Previos

- Python 3.12+
- Despliegue de Azure OpenAI configurado en tu entorno
- Chrome o Chromium instalado localmente
- Dependencias de Playwright instaladas
- Familiaridad básica con Python asíncrono

## Configuración

Instala los paquetes usados en el notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Configura las variables de entorno de Azure OpenAI usadas por el notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Opcional: por defecto usa la versión más reciente de la API cuando se omite
AZURE_OPENAI_API_VERSION=...
```

## Vista General de la Arquitectura

El notebook demuestra un flujo de trabajo de automatización de navegador híbrido:

1. Chrome se inicia con CDP habilitado para que tanto Playwright como Browser-Use compartan la misma sesión de navegador.
2. Un agente Browser-Use maneja tareas de navegación abiertas como abrir Airbnb, descartar ventanas emergentes y buscar Estocolmo.
3. La página activa se inspecciona con un esquema estructurado de Pydantic para extraer títulos de listados, precios por noche, valoraciones y URLs.
4. La lógica Python compara los listados extraídos y resalta el resultado más barato.

Este enfoque mantiene el razonamiento flexible basado en visión que Browser-Use domina mientras te permite un control determinista del navegador cuando lo necesitas.

## Puntos Clave y Buenas Prácticas

### Cuándo Usar Agente vs Actor

| Escenario | Usar Agente | Usar Actor |
|----------|-------------|------------|
| Layouts dinámicos | Sí, la IA puede adaptarse a cambios en la página | No, selectores frágiles pueden romperse |
| Estructura conocida | No, un agente es más lento que control directo | Sí, rápido y preciso |
| Encontrar elementos | Sí, el lenguaje natural funciona bien | No, se requieren selectores exactos |
| Control de tiempo | No, menos predecible | Sí, control total sobre esperas y reintentos |
| Flujo de trabajo complejo | Sí, maneja estados UI inesperados | No, requiere ramificación explícita |

### Buenas Prácticas con Browser-Use

1. Comienza con un agente para exploración y navegación dinámica.
2. Cambia a control directo de página cuando la interacción sea predecible.
3. Usa modelos de salida estructurada para validar y tipar los datos extraídos.
4. Añade retardos estratégicamente después de acciones que desencadenen cambios visibles en la UI.
5. Captura pantallazos durante la iteración para facilitar la depuración en caso de fallos.
6. Espera que los sitios web cambien y diseña estrategias de respaldo para ventanas emergentes y cambios de layout.
7. Mezcla los patrones agente y actor para obtener tanto flexibilidad como precisión.

### Aplicaciones en el Mundo Real

- Reservas de viaje y monitoreo de precios
- Comparación de precios y disponibilidad en comercio electrónico
- Extracción estructurada desde sitios web dinámicos
- Pruebas de UI conscientes de la visión y verificación
- Monitoreo y alertas de sitios web
- Rellenado inteligente de formularios en flujos con múltiples pasos

## Recursos Adicionales

- [Plantilla de integración Browser-Use Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parámetros de actor de Browser-Use y extracción de contenido](https://docs.browser-use.com/customize/actor/all-parameters)
- [Configuración del Curso](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la exactitud, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por un humano. No somos responsables por ningún malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->