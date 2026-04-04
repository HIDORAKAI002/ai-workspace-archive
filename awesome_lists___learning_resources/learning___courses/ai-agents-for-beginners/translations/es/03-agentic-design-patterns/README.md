[![Cómo diseñar buenos agentes de IA](../../../translated_images/es/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Haz clic en la imagen de arriba para ver el video de esta lección)_
# Principios de Diseño de Agentes de IA

## Introducción

Hay muchas formas de pensar sobre la construcción de Sistemas Agénticos de IA. Dado que la ambigüedad es una característica y no un error en el diseño de IA generativa, a veces es difícil para los ingenieros saber por dónde empezar. Hemos creado un conjunto de Principios de Diseño centrados en el ser humano para permitir a los desarrolladores construir sistemas agénticos centrados en el cliente que resuelvan sus necesidades empresariales. Estos principios de diseño no son una arquitectura prescriptiva sino más bien un punto de partida para los equipos que están definiendo y construyendo experiencias de agentes.

En general, los agentes deberían:

- Ampliar y escalar las capacidades humanas (lluvia de ideas, resolución de problemas, automatización, etc.)
- Rellenar lagunas de conocimiento (ponme al día en dominios de conocimiento, traducción, etc.)
- Facilitar y apoyar la colaboración de la forma en que preferimos trabajar con otros
- Hacernos mejores versiones de nosotros mismos (por ejemplo, coach de vida/encargado de tareas, ayudándonos a aprender regulación emocional y habilidades de mindfulness, construir resiliencia, etc.)

## Esta Lección Cubrirá

- Qué son los Principios de Diseño de Agentes
- Cuáles son algunas pautas a seguir al implementar estos principios de diseño
- Algunos ejemplos de uso de los principios de diseño

## Objetivos de aprendizaje

Al completar esta lección, podrás:

1. Explicar qué son los Principios de Diseño de Agentes
2. Explicar las pautas para usar los Principios de Diseño de Agentes
3. Entender cómo construir un agente usando los Principios de Diseño de Agentes

## Los Principios de Diseño de Agentes

![Principios de Diseño de Agentes](../../../translated_images/es/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agente (Espacio)

Este es el entorno en el que opera el agente. Estos principios informan cómo diseñamos agentes para interactuar en mundos físicos y digitales.

- **Conectar, no sustituir** – ayudar a conectar a las personas con otras personas, eventos y conocimientos accionables para posibilitar la colaboración y la conexión.
- Los agentes ayudan a conectar eventos, conocimiento y personas.
- Los agentes acercan a las personas. No están diseñados para reemplazar ni menospreciar a las personas.
- **Fácilmente accesible pero ocasionalmente invisible** – el agente funciona en gran medida en segundo plano y solo nos impulsa cuando es relevante y apropiado.
  - El agente es fácilmente descubrible y accesible para usuarios autorizados en cualquier dispositivo o plataforma.
  - El agente soporta entradas y salidas multimodales (sonido, voz, texto, etc.).
  - El agente puede transicionar sin problemas entre primer plano y segundo plano; entre proactivo y reactivo, dependiendo de su detección de las necesidades del usuario.
  - El agente puede operar de forma invisible, pero su proceso en segundo plano y la colaboración con otros agentes son transparentes y controlables por el usuario.

### Agente (Tiempo)

Así es como el agente opera a lo largo del tiempo. Estos principios informan cómo diseñamos agentes que interactúan a través del pasado, el presente y el futuro.

- **Pasado**: Reflexionando sobre la historia que incluye tanto estado como contexto.
  - El agente proporciona resultados más relevantes basados en el análisis de datos históricos más ricos más allá del evento, las personas o los estados.
  - El agente crea conexiones a partir de eventos pasados y reflexiona activamente sobre la memoria para interactuar con situaciones actuales.
- **Ahora**: Sugerir más que notificar.
  - El agente encarna un enfoque integral para interactuar con las personas. Cuando ocurre un evento, el agente va más allá de una notificación estática u otra formalidad estática. El agente puede simplificar flujos o generar dinámicamente indicios para dirigir la atención del usuario en el momento adecuado.
  - El agente entrega información basada en el entorno contextual, cambios sociales y culturales, y adaptada a la intención del usuario.
  - La interacción con el agente puede ser gradual, evolucionando/aumentando en complejidad para empoderar a los usuarios a largo plazo.
- **Futuro**: Adaptándose y evolucionando.
  - El agente se adapta a varios dispositivos, plataformas y modalidades.
  - El agente se adapta al comportamiento del usuario, a las necesidades de accesibilidad y es libremente personalizable.
  - El agente se moldea y evoluciona mediante la interacción continua con el usuario.

### Agente (Núcleo)

Estos son los elementos clave en el núcleo del diseño de un agente.

- **Aceptar la incertidumbre pero establecer confianza**.
  - Se espera un cierto nivel de incertidumbre del agente. La incertidumbre es un elemento clave del diseño del agente.
  - La confianza y la transparencia son capas fundamentales del diseño del agente.
  - Los humanos tienen el control de cuándo el agente está encendido/apagado y el estado del agente es claramente visible en todo momento.

## Las Directrices para Implementar Estos Principios

Cuando estés utilizando los principios de diseño anteriores, utiliza las siguientes directrices:

1. **Transparencia**: Informar al usuario que la IA está involucrada, cómo funciona (incluyendo acciones pasadas), y cómo dar retroalimentación y modificar el sistema.
2. **Control**: Permitir al usuario personalizar, especificar preferencias y tener control sobre el sistema y sus atributos (incluida la capacidad de olvidar).
3. **Consistencia**: Apuntar a experiencias coherentes y multimodales en dispositivos y puntos finales. Usar elementos de UI/UX familiares cuando sea posible (por ejemplo, icono de micrófono para interacción por voz) y reducir la carga cognitiva del cliente tanto como sea posible (por ejemplo, optar por respuestas concisas, ayudas visuales y contenido de ‘Más información’).

## Cómo diseñar un Agente de Viajes usando estos Principios y Directrices

Imagina que estás diseñando un Agente de Viajes, aquí tienes cómo podrías pensar en usar los Principios de Diseño y las Directrices:

1. **Transparencia** – Haz saber al usuario que el Agente de Viajes es un agente habilitado con IA. Proporciona algunas instrucciones básicas sobre cómo empezar (por ejemplo, un mensaje “Hola”, prompts de ejemplo). Documenta esto claramente en la página del producto. Muestra la lista de prompts que un usuario ha solicitado en el pasado. Deja claro cómo dar retroalimentación (pulgares arriba y abajo, botón "Enviar comentarios", etc.). Articula claramente si el agente tiene restricciones de uso o de temas.
2. **Control** – Asegúrate de que esté claro cómo el usuario puede modificar el agente después de haberlo creado con cosas como el Mensaje del sistema. Permite al usuario elegir cuán verboso es el agente, su estilo de escritura y cualquier salvedad sobre de qué no debe hablar el agente. Permite al usuario ver y eliminar cualquier archivo o dato asociado, prompts y conversaciones pasadas.
3. **Consistencia** – Asegúrate de que los iconos para Compartir Prompt, agregar un archivo o foto y etiquetar a alguien o algo sean estándar y reconocibles. Usa el icono de clip para indicar carga/compartir de archivos con el agente, y un icono de imagen para indicar la subida de gráficos.

## Ejemplos de código

- Python: [Framework de Agentes](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Framework de Agentes](./code_samples/03-dotnet-agent-framework.md)


## ¿Tienes más preguntas sobre los patrones de diseño de agentes de IA?

Únete al [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) para encontrarte con otros aprendices, asistir a horas de oficina y obtener respuestas a tus preguntas sobre Agentes de IA.

## Recursos adicionales

- <a href="https://openai.com" target="_blank">Prácticas para gobernar sistemas de IA orientados a agentes | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">El proyecto HAX Toolkit - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Kit de herramientas de IA responsable</a>

## Lección anterior

[Explorando marcos de agentes](../02-explore-agentic-frameworks/README.md)

## Próxima lección

[Patrón de diseño de uso de herramientas](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Descargo de responsabilidad:
Este documento ha sido traducido mediante el servicio de traducción por IA Co-op Translator (https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por un traductor humano. No nos hacemos responsables de ningún malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->