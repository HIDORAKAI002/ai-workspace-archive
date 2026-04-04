[![Agentic RAG](../../../translated_images/es/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Haz clic en la imagen de arriba para ver el video de esta lección)_

# Agentic RAG

Esta lección proporciona una visión general completa de Agentic Retrieval-Augmented Generation (Agentic RAG), un paradigma emergente de IA donde los grandes modelos de lenguaje (LLMs) planifican autónomamente sus próximos pasos mientras extraen información de fuentes externas. A diferencia de los patrones estáticos de recuperación y luego lectura, Agentic RAG implica llamadas iterativas al LLM, intercaladas con llamadas a herramientas o funciones y salidas estructuradas. El sistema evalúa resultados, refina consultas, invoca herramientas adicionales si es necesario y continúa este ciclo hasta que se logra una solución satisfactoria.

## Introducción

Esta lección cubrirá

- **Entender Agentic RAG:** Aprende sobre el paradigma emergente en IA donde los grandes modelos de lenguaje (LLMs) planifican autónomamente sus próximos pasos mientras extraen información de fuentes de datos externas.
- **Comprender el estilo iterativo Maker-Checker:** Comprende el ciclo de llamadas iterativas al LLM, intercaladas con llamadas a herramientas o funciones y salidas estructuradas, diseñadas para mejorar la corrección y manejar consultas malformadas.
- **Explorar aplicaciones prácticas:** Identifica escenarios donde Agentic RAG destaca, como entornos de corrección primero, interacciones complejas con bases de datos y flujos de trabajo extendidos.

## Objetivos de Aprendizaje

Después de completar esta lección, sabrás cómo / entenderás:

- **Entendiendo Agentic RAG:** Aprende sobre el paradigma emergente en IA donde los grandes modelos de lenguaje (LLMs) planifican autónomamente sus próximos pasos mientras extraen información de fuentes de datos externas.
- **Estilo iterativo Maker-Checker:** Comprende el concepto de un ciclo de llamadas iterativas al LLM, intercaladas con llamadas a herramientas o funciones y salidas estructuradas, diseñadas para mejorar la corrección y manejar consultas malformadas.
- **Dominio del proceso de razonamiento:** Comprende la capacidad del sistema para asumir su proceso de razonamiento, tomando decisiones sobre cómo abordar problemas sin depender de caminos predefinidos.
- **Flujo de trabajo:** Entiende cómo un modelo agentic decide independientemente recuperar informes de tendencias de mercado, identificar datos de competidores, correlacionar métricas internas de ventas, sintetizar hallazgos y evaluar la estrategia.
- **Bucles iterativos, integración de herramientas y memoria:** Aprende sobre la dependencia del sistema en un patrón de interacción en bucle, manteniendo estado y memoria a través de los pasos para evitar bucles repetitivos y tomar decisiones informadas.
- **Manejo de modos de falla y autocorrección:** Explora los mecanismos robustos de autocorrección del sistema, incluyendo iterar y volver a consultar, usar herramientas de diagnóstico y recurrir a la supervisión humana.
- **Límites de la agencia:** Entiende las limitaciones de Agentic RAG, enfocándose en autonomía específica del dominio, dependencia de infraestructura y respeto por las reglas.
- **Casos de uso prácticos y valor:** Identifica escenarios donde Agentic RAG destaca, como entornos con prioridad en la corrección, interacciones complejas con bases de datos y flujos de trabajo extendidos.
- **Gobernanza, transparencia y confianza:** Aprende sobre la importancia de la gobernanza y la transparencia, incluyendo razonamiento explicable, control de sesgos y supervisión humana.

## ¿Qué es Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) es un paradigma emergente de IA donde los grandes modelos de lenguaje (LLMs) planifican autónomamente sus próximos pasos mientras extraen información de fuentes externas. A diferencia de los patrones estáticos de recuperación y lectura, Agentic RAG implica llamadas iterativas al LLM, intercaladas con llamadas a herramientas o funciones y salidas estructuradas. El sistema evalúa resultados, refina consultas, invoca herramientas adicionales si es necesario y continúa este ciclo hasta lograr una solución satisfactoria. Este estilo iterativo de "maker-checker" mejora la corrección, maneja consultas malformadas y asegura resultados de alta calidad.

El sistema asume activamente su proceso de razonamiento, reescribiendo consultas fallidas, eligiendo diferentes métodos de recuperación e integrando múltiples herramientas —como búsquedas vectoriales en Azure AI Search, bases de datos SQL o APIs personalizadas— antes de finalizar su respuesta. La cualidad distintiva de un sistema agentic es su capacidad para asumir su propio proceso de razonamiento. Las implementaciones tradicionales de RAG dependen de caminos predefinidos, pero un sistema agentic determina autónomamente la secuencia de pasos basada en la calidad de la información que encuentra.

## Definición de Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) es un paradigma emergente en el desarrollo de IA donde los LLM no solo extraen información de fuentes externas, sino que además planifican autónomamente sus próximos pasos. A diferencia de los patrones estáticos de recuperación y lectura o secuencias de prompts cuidadosamente guionizadas, Agentic RAG implica un ciclo de llamadas iterativas al LLM, intercaladas con llamadas a herramientas o funciones y salidas estructuradas. En cada paso, el sistema evalúa los resultados obtenidos, decide si debe refinar sus consultas, invoca herramientas adicionales si es necesario y continúa este ciclo hasta alcanzar una solución satisfactoria.

Este estilo de operación iterativo de "maker-checker" está diseñado para mejorar la corrección, manejar consultas malformadas a bases de datos estructuradas (ej. NL2SQL) y asegurar resultados equilibrados y de alta calidad. En lugar de depender solo de cadenas de prompts cuidadosamente diseñadas, el sistema asume activamente su proceso de razonamiento. Puede reescribir consultas que fallen, elegir diferentes métodos de recuperación e integrar múltiples herramientas —como búsquedas vectoriales en Azure AI Search, bases de datos SQL o APIs personalizadas— antes de finalizar su respuesta. Esto elimina la necesidad de marcos de orquestación excesivamente complejos. En cambio, un ciclo relativamente simple de “llamada LLM → uso de herramienta → llamada LLM → …” puede generar salidas sofisticadas y bien fundamentadas.

![Agentic RAG Core Loop](../../../translated_images/es/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Asumiendo el Proceso de Razonamiento

La cualidad distintiva que hace que un sistema sea "agentic" es su capacidad para asumir su proceso de razonamiento. Las implementaciones tradicionales de RAG a menudo dependen de que los humanos definan previamente un camino para el modelo: una cadena de pensamiento que indica qué recuperar y cuándo.

Pero cuando un sistema es verdaderamente agentic, decide internamente cómo abordar el problema. No solo ejecuta un guion; determina autónomamente la secuencia de pasos basándose en la calidad de la información que encuentra.

Por ejemplo, si se le pide crear una estrategia de lanzamiento de producto, no se basa únicamente en un prompt que describa todo el flujo de trabajo de investigación y toma de decisiones. En cambio, el modelo agentic decide independientemente:

1. Recuperar informes actuales de tendencias de mercado usando Bing Web Grounding
2. Identificar datos relevantes de competidores usando Azure AI Search.
3. Correlacionar métricas históricas internas de ventas usando Azure SQL Database.
4. Sintetizar los hallazgos en una estrategia cohesiva orquestada vía Azure OpenAI Service.
5. Evaluar la estrategia para detectar brechas o inconsistencias, solicitando otra ronda de recuperación si es necesario.
Todos estos pasos —refinar consultas, elegir fuentes, iterar hasta estar "satisfecho" con la respuesta— son decididos por el modelo, no guionizados previamente por un humano.

## Bucles Iterativos, Integración de Herramientas y Memoria

![Tool Integration Architecture](../../../translated_images/es/tool-integration.0f569710b5c17c10.webp)

Un sistema agentic se basa en un patrón de interacción en bucle:

- **Llamada Inicial:** Se presenta el objetivo del usuario (también llamado prompt de usuario) al LLM.
- **Invocación de Herramienta:** Si el modelo identifica información faltante o instrucciones ambiguas, selecciona una herramienta o método de recuperación —como una consulta en base de datos vectorial (ejemplo: búsqueda híbrida Azure AI Search sobre datos privados) o una llamada SQL estructurada— para obtener más contexto.
- **Evaluación y Refinamiento:** Tras revisar los datos retornados, el modelo decide si la información es suficiente. Si no, refina la consulta, prueba otra herramienta o ajusta su enfoque.
- **Repetir Hasta Estar Satisfecho:** Este ciclo continúa hasta que el modelo determina que tiene la claridad y evidencia suficientes para entregar una respuesta final bien razonada.
- **Memoria y Estado:** Debido a que el sistema mantiene el estado y la memoria a lo largo de los pasos, puede recordar intentos previos y sus resultados, evitando bucles repetitivos y tomando decisiones más informadas mientras avanza.

Con el tiempo, esto crea una sensación de entendimiento en evolución, permitiendo al modelo navegar tareas complejas y de múltiples pasos sin requerir intervención humana constante o reformulación del prompt.

## Manejo de Modos de Fallo y Autocorrección

La autonomía de Agentic RAG también implica mecanismos robustos de autocorrección. Cuando el sistema se encuentra con callejones sin salida —como recuperar documentos irrelevantes o enfrentar consultas malformadas— puede:

- **Iterar y Re-Consultar:** En lugar de devolver respuestas de bajo valor, el modelo intenta nuevas estrategias de búsqueda, reescribe consultas a bases de datos o revisa conjuntos de datos alternativos.
- **Usar Herramientas de Diagnóstico:** El sistema puede invocar funciones adicionales diseñadas para ayudar a depurar sus pasos de razonamiento o confirmar la corrección de los datos recuperados. Herramientas como Azure AI Tracing serán importantes para habilitar una observabilidad y monitoreo robustos.
- **Recurre a Supervisión Humana:** Para escenarios de alto riesgo o repetidamente fallidos, el modelo puede señalar incertidumbre y solicitar guía humana. Una vez que el humano provee retroalimentación correctiva, el modelo puede incorporar esa lección en adelante.

Este enfoque iterativo y dinámico permite que el modelo mejore continuamente, asegurando que no sea solo un sistema de un solo disparo, sino uno que aprende de sus errores durante una sesión dada.

![Self Correction Mechanism](../../../translated_images/es/self-correction.da87f3783b7f174b.webp)

## Límites de la Agencia

A pesar de su autonomía dentro de una tarea, Agentic RAG no es análogo a la Inteligencia Artificial General. Sus capacidades "agentic" están confinadas a las herramientas, fuentes de datos y políticas proporcionadas por desarrolladores humanos. No puede inventar sus propias herramientas ni salirse de los límites del dominio establecidos. En cambio, sobresale en orquestar dinámicamente los recursos disponibles.

Las diferencias clave con formas más avanzadas de IA incluyen:

1. **Autonomía Específica de Dominio:** Los sistemas Agentic RAG están enfocados en alcanzar objetivos definidos por el usuario dentro de un dominio conocido, empleando estrategias como reescritura de consultas o selección de herramientas para mejorar resultados.
2. **Dependencia de Infraestructura:** Las capacidades del sistema dependen de las herramientas y datos integrados por los desarrolladores. No puede superar estos límites sin intervención humana.
3. **Respeto por las Reglas:** Las pautas éticas, reglas de cumplimiento y políticas de negocio siguen siendo muy importantes. La libertad del agente siempre está restringida por medidas de seguridad y mecanismos de supervisión (¿con suerte?).

## Casos Prácticos y Valor

Agentic RAG brilla en escenarios que requieren refinamiento iterativo y precisión:

1. **Entornos con Prioridad de Corrección:** En controles de cumplimiento, análisis regulatorios o investigación legal, el modelo agentic puede verificar hechos repetidamente, consultar múltiples fuentes y reescribir consultas hasta producir una respuesta minuciosamente verificada.
2. **Interacciones Complejas con Bases de Datos:** En el manejo de datos estructurados donde las consultas pueden fallar o necesitar ajustes, el sistema puede refinar sus consultas autónomamente usando Azure SQL o Microsoft Fabric OneLake, asegurando que la recuperación final se alinee con la intención del usuario.
3. **Flujos de Trabajo Extendidos:** Las sesiones de larga duración pueden evolucionar conforme surge nueva información. Agentic RAG puede incorporar datos continuamente, cambiando estrategias a medida que aprende más sobre el espacio del problema.

## Gobernanza, Transparencia y Confianza

A medida que estos sistemas se vuelven más autónomos en su razonamiento, la gobernanza y transparencia son cruciales:

- **Razonamiento Explicable:** El modelo puede proveer una pista de auditoría de las consultas que realizó, las fuentes consultadas y los pasos de razonamiento que tomó para llegar a su conclusión. Herramientas como Azure AI Content Safety y Azure AI Tracing / GenAIOps pueden ayudar a mantener la transparencia y mitigar riesgos.
- **Control de Sesgos y Recuperación Balanceada:** Los desarrolladores pueden ajustar estrategias de recuperación para asegurar que se consideren fuentes de datos equilibradas y representativas, y auditar regularmente las salidas para detectar sesgos o patrones sesgados usando modelos personalizados para organizaciones avanzadas de ciencia de datos con Azure Machine Learning.
- **Supervisión Humana y Cumplimiento:** Para tareas sensibles, la revisión humana sigue siendo esencial. Agentic RAG no reemplaza el juicio humano en decisiones críticas sino que lo complementa entregando opciones más minuciosamente verificadas.

Tener herramientas que provean un registro claro de acciones es esencial. Sin ellas, depurar un proceso de múltiples pasos puede ser muy difícil. Véase el siguiente ejemplo de Literal AI (empresa detrás de Chainlit) para una ejecución de agente:

![AgentRunExample](../../../translated_images/es/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusión

Agentic RAG representa una evolución natural en cómo los sistemas de IA manejan tareas complejas e intensivas en datos. Al adoptar un patrón de interacción en bucle, seleccionar herramientas autónomamente y refinar consultas hasta lograr un resultado de alta calidad, el sistema va más allá del seguimiento estático de prompts hacia un tomador de decisiones más adaptativo y consciente del contexto. Aunque aún está limitado por infraestructuras definidas por humanos y pautas éticas, estas capacidades agentic permiten interacciones de IA más ricas, dinámicas y, en última instancia, más útiles tanto para empresas como para usuarios finales.

### ¿Tienes más preguntas sobre Agentic RAG?

Únete al [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) para reunirte con otros aprendices, asistir a horas de oficina y obtener respuestas a tus preguntas sobre agentes de IA.

## Recursos Adicionales
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementar Generación Aumentada por Recuperación (RAG) con Azure OpenAI Service: Aprende cómo usar tus propios datos con Azure OpenAI Service. Este módulo de Microsoft Learn ofrece una guía completa sobre la implementación de RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Evaluación de aplicaciones de IA generativa con Microsoft Foundry: Este artículo cubre la evaluación y comparación de modelos en conjuntos de datos públicos, incluyendo aplicaciones de IA Agente y arquitecturas RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Qué es Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Una guía completa sobre la generación aumentada por recuperación basada en agentes – Noticias de generación RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: potencia tu RAG con reformulación de consultas y auto-consulta! Recetario de IA de código abierto de Hugging Face</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Añadiendo capas Agentes a RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">El futuro de los asistentes de conocimiento: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Cómo construir sistemas Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Usar Microsoft Foundry Agent Service para escalar tus agentes de IA</a>

### Artículos Académicos

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Refinamiento iterativo con auto-retroalimentación</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Agentes de lenguaje con aprendizaje por refuerzo verbal</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Los modelos de lenguaje grande pueden autocorregirse con crítica interactiva de herramientas</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Generación aumentada por recuperación Agente: Una encuesta sobre Agentic RAG</a>

## Lección anterior

[Patrón de diseño de uso de herramientas](../04-tool-use/README.md)

## Lección siguiente

[Construcción de agentes de IA confiables](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda la traducción profesional realizada por humanos. No nos hacemos responsables de cualquier malentendido o interpretación errónea que pueda surgir del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->