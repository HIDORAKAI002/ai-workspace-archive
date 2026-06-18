# 🚀 Módulo 1: Fundamentos de Microsoft Foundry Toolkit

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Objetivos de Aprendizaje

Al final de este módulo, podrás:
- ✅ Instalar y configurar la extensión Microsoft Foundry Toolkit para VS Code
- ✅ Navegar por el Catálogo de Modelos y comprender las diferentes fuentes de modelos
- ✅ Usar el Playground para pruebas y experimentación de modelos
- ✅ Crear agentes de IA personalizados usando Agent Builder
- ✅ Comparar el rendimiento de modelos entre diferentes proveedores
- ✅ Aplicar las mejores prácticas en ingeniería de prompts

## 🧠 Introducción a Microsoft Foundry Toolkit

La **extensión Microsoft Foundry Toolkit para VS Code** es la extensión insignia de Microsoft que transforma VS Code en un entorno completo para el desarrollo de IA. Conecta la investigación en IA con el desarrollo práctico de aplicaciones, haciendo la IA generativa accesible para desarrolladores de todos los niveles.

### 🌟 Capacidades Clave

| Característica | Descripción | Caso de Uso |
|---------|-------------|----------|
| **🗂️ Catálogo de Modelos** | Accede a más de 100 modelos desde GitHub, ONNX, OpenAI, Anthropic, Google | Descubrimiento y selección de modelos |
| **🔌 Soporte BYOM** | Integra tus propios modelos (locales/remotos) | Despliegue de modelos personalizados |
| **🎮 Playground Interactivo** | Pruebas en tiempo real con interfaz de chat | Prototipado y pruebas rápidas |
| **📎 Soporte Multi-Modal** | Maneja texto, imágenes y archivos adjuntos | Aplicaciones complejas de IA |
| **⚡ Procesamiento por Lotes** | Ejecuta múltiples prompts simultáneamente | Flujos de trabajo de pruebas eficientes |
| **📊 Evaluación de Modelos** | Métricas integradas (F1, relevancia, similitud, coherencia) | Evaluación del rendimiento |

### 🎯 Por Qué Importa Microsoft Foundry Toolkit

- **🚀 Desarrollo Acelerado**: De la idea al prototipo en minutos
- **🔄 Flujo de Trabajo Unificado**: Una interfaz para múltiples proveedores de IA
- **🧪 Fácil Experimentación**: Compara modelos sin configuraciones complejas
- **📈 Preparado para Producción**: Transición fluida de prototipo a despliegue

## 🛠️ Prerrequisitos y Configuración

### 📦 Instalar la Extensión Microsoft Foundry Toolkit

**Paso 1: Accede al Marketplace de Extensiones**
1. Abre Visual Studio Code
2. Navega a la vista de Extensiones (`Ctrl+Shift+X` o `Cmd+Shift+X`)
3. Busca "Microsoft Foundry Toolkit"

**Paso 2: Elige tu Versión**
- **🟢 Versión Estable**: Recomendado para uso en producción
- **🔶 Pre-lanzamiento**: Acceso anticipado a funciones innovadoras

**Paso 3: Instalar y Activar**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/es/aitkext.d28945a03eed003c.webp)

### ✅ Lista de Verificación para Verificación
- [ ] El icono de Microsoft Foundry Toolkit aparece en la barra lateral de VS Code
- [ ] La extensión está habilitada y activada
- [ ] No hay errores de instalación en el panel de salida

## 🧪 Ejercicio Práctico 1: Explorando Modelos de GitHub

**🎯 Objetivo**: Dominar el Catálogo de Modelos y probar tu primer modelo de IA

### 📊 Paso 1: Navegar por el Catálogo de Modelos

El Catálogo de Modelos es tu puerta al ecosistema de IA. Agrega modelos de múltiples proveedores, facilitando el descubrimiento y comparación.

**🔍 Guía de Navegación:**

Haz clic en **MODELOS - Catálogo** en la barra lateral de Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/es/aimodel.263ed2be013d8fb0.webp)

**💡 Consejo Profesional**: Busca modelos con capacidades específicas que se ajusten a tu caso de uso (por ejemplo, generación de código, escritura creativa, análisis).

**⚠️ Nota**: Los modelos alojados en GitHub (es decir, Modelos de GitHub) son gratuitos pero están sujetos a límites de tasa para solicitudes y tokens. Si deseas acceder a modelos no alojados en GitHub (es decir, modelos externos hospedados vía Azure AI u otros endpoints), necesitarás proporcionar la clave API o autenticación correspondiente.

### 🚀 Paso 2: Agregar y Configurar Tu Primer Modelo

**Estrategia de Selección de Modelo:**
- **GPT-4.1**: Mejor para razonamiento complejo y análisis
- **Phi-4-mini**: Ligero, respuestas rápidas para tareas simples

**🔧 Proceso de Configuración:**
1. Selecciona **OpenAI GPT-4.1** del catálogo
2. Haz clic en **Agregar a Mis Modelos** - esto registra el modelo para uso
3. Elige **Probar en Playground** para abrir el entorno de pruebas
4. Espera la inicialización del modelo (la configuración inicial puede tardar)

![Playground Setup](../../../../translated_images/es/playground.dd6f5141344878ca.webp)

**⚙️ Entendiendo los Parámetros del Modelo:**
- **Temperature**: Controla la creatividad (0 = determinista, 1 = creativo)
- **Max Tokens**: Longitud máxima de respuesta
- **Top-p**: Muestreo núcleo para diversidad de respuestas

### 🎯 Paso 3: Dominar la Interfaz del Playground

El Playground es tu laboratorio de experimentación con IA. Aquí cómo maximizar su potencial:

**🎨 Mejores Prácticas en Ingeniería de Prompts:**
1. **Sé Específico**: Instrucciones claras y detalladas generan mejores resultados
2. **Proporciona Contexto**: Incluye información de fondo relevante
3. **Usa Ejemplos**: Muestra al modelo lo que quieres con ejemplos
4. **Itera**: Refina los prompts basándote en resultados iniciales

**🧪 Escenarios de Prueba:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/es/result.1dfcf211fb359cf6.webp)

### 🏆 Ejercicio Desafío: Comparación de Rendimiento de Modelos

**🎯 Meta**: Compara diferentes modelos usando prompts idénticos para entender sus fortalezas

**📋 Instrucciones:**
1. Agrega **Phi-4-mini** a tu espacio de trabajo
2. Usa el mismo prompt para GPT-4.1 y Phi-4-mini

![set](../../../../translated_images/es/set.88132df189ecde2c.webp)

3. Compara la calidad, velocidad y precisión de las respuestas
4. Documenta tus hallazgos en la sección de resultados

![Model Comparison](../../../../translated_images/es/compare.97746cd0f9074955.webp)

**💡 Ideas Clave a Descubrir:**
- Cuándo usar LLM vs SLM
- Trade-offs entre costo y rendimiento
- Capacidades especializadas de diferentes modelos

## 🤖 Ejercicio Práctico 2: Creando Agentes Personalizados con Agent Builder

**🎯 Objetivo**: Crear agentes de IA especializados adaptados a tareas y flujos de trabajo específicos

### 🏗️ Paso 1: Entendiendo Agent Builder

Agent Builder es donde Microsoft Foundry Toolkit realmente brilla. Te permite crear asistentes de IA a medida que combinan el poder de modelos de lenguaje grandes con instrucciones personalizadas, parámetros específicos y conocimiento especializado.

**🧠 Componentes de la Arquitectura del Agente:**
- **Modelo Central**: LLM base (GPT-4, Groks, Phi, etc.)
- **Prompt del Sistema**: Define la personalidad y comportamiento del agente
- **Parámetros**: Ajustes finos para rendimiento óptimo
- **Integración de Herramientas**: Conexión con APIs externas y servicios MCP
- **Memoria**: Contexto de conversación y persistencia de sesión

![Agent Builder Interface](../../../../translated_images/es/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Paso 2: Profundización en Configuración de Agentes

**🎨 Creando Prompts de Sistema Efectivos:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Por supuesto, también puedes usar Generar Prompt de Sistema para que la IA te ayude a crear y optimizar prompts*

**🔧 Optimización de Parámetros:**
| Parámetro | Rango Recomendado | Caso de Uso |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Respuestas técnicas/factuales |
| **Temperature** | 0.7-0.9 | Tareas creativas/de lluvia de ideas |
| **Max Tokens** | 500-1000 | Respuestas concisas |
| **Max Tokens** | 2000-4000 | Explicaciones detalladas |

### 🐍 Paso 3: Ejercicio Práctico - Agente de Programación en Python

**🎯 Misión**: Crear un asistente especializado en codificación Python

**📋 Pasos de Configuración:**

1. **Selección de Modelo**: Elige **Claude 3.5 Sonnet** (excelente para código)

2. **Diseño del Prompt del Sistema**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Configuración de Parámetros**:
   - Temperature: 0.2 (para código consistente y confiable)
   - Max Tokens: 2000 (explicaciones detalladas)
   - Top-p: 0.9 (creatividad balanceada)

![Python Agent Configuration](../../../../translated_images/es/pythonagent.5e51b406401c165f.webp)

### 🧪 Paso 4: Prueba de tu Agente Python

**Escenarios de Prueba:**
1. **Función Básica**: "Crea una función para encontrar números primos"
2. **Algoritmo Complejo**: "Implementa un árbol de búsqueda binaria con métodos insertar, eliminar y buscar"
3. **Problema del Mundo Real**: "Crea un scraper web que maneje limitación de tasa y reintentos"
4. **Depuración**: "Arregla este código [pega código con errores]"

**🏆 Criterios de Éxito:**
- ✅ El código se ejecuta sin errores
- ✅ Incluye documentación adecuada
- ✅ Sigue las mejores prácticas de Python
- ✅ Proporciona explicaciones claras
- ✅ Sugiere mejoras

## 🎓 Cierre del Módulo 1 y Próximos Pasos

### 📊 Verificación de Conocimientos

Pon a prueba tu comprensión:
- [ ] ¿Puedes explicar la diferencia entre los modelos en el catálogo?
- [ ] ¿Has creado y probado con éxito un agente personalizado?
- [ ] ¿Entiendes cómo optimizar parámetros para diferentes casos de uso?
- [ ] ¿Puedes diseñar prompts de sistema efectivos?

### 📚 Recursos Adicionales

- **Documentación de Microsoft Foundry Toolkit**: [Documentos Oficiales de Microsoft](https://github.com/microsoft/vscode-ai-toolkit)
- **Guía de Ingeniería de Prompts**: [Mejores Prácticas](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modelos en Microsoft Foundry Toolkit**: [Modelos en Desarrollo](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 ¡Felicidades!** Has dominado los fundamentos de Microsoft Foundry Toolkit y estás listo para crear aplicaciones de IA más avanzadas.

### 🔜 Continúa al Próximo Módulo

¿Listo para capacidades más avanzadas? Continúa al **[Módulo 2: MCP con Fundamentos de Microsoft Foundry Toolkit](../lab2/README.md)** donde aprenderás a:
- Conectar tus agentes con herramientas externas usando Model Context Protocol (MCP)
- Construir agentes de automatización de navegador con Playwright
- Integrar servidores MCP con tus agentes de Microsoft Foundry Toolkit
- Potenciar tus agentes con datos y capacidades externas

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->