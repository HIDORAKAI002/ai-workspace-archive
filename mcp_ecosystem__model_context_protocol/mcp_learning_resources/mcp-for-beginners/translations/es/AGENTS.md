# AGENTS.md

## Visión general del proyecto

**MCP para principiantes** es un plan de estudios educativo de código abierto para aprender el Protocolo de Contexto de Modelo (MCP), un marco estandarizado para las interacciones entre modelos de IA y aplicaciones cliente. Este repositorio ofrece materiales completos de aprendizaje con ejemplos prácticos de código en varios lenguajes de programación.

### Tecnologías clave

- **Lenguajes de programación**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworks y SDKs**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Bases de datos**: PostgreSQL con extensión pgvector
- **Plataformas en la nube**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Herramientas de compilación**: npm, Maven, pip, Cargo
- **Documentación**: Markdown con traducción automática multilingüe (más de 48 idiomas)

### Arquitectura

- **11 módulos principales (00-11)**: Ruta de aprendizaje secuencial desde fundamentos hasta temas avanzados
- **Laboratorios prácticos**: Ejercicios prácticos con código de solución completo en varios lenguajes
- **Proyectos de ejemplo**: Implementaciones funcionales de servidor y cliente MCP
- **Sistema de traducción**: Flujo de trabajo automatizado en GitHub Actions para soporte multilingüe
- **Recursos de imagen**: Directorio centralizado de imágenes con versiones traducidas

## Comandos de configuración

Este es un repositorio enfocado en documentación. La mayoría de la configuración ocurre dentro de proyectos y laboratorios de ejemplo individuales.

### Configuración del repositorio

```bash
# Clona el repositorio
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Trabajando con proyectos de ejemplo

Los proyectos de ejemplo se encuentran en:
- `03-GettingStarted/samples/` - Ejemplos específicos por lenguaje
- `03-GettingStarted/01-first-server/solution/` - Primeras implementaciones de servidor
- `03-GettingStarted/02-client/solution/` - Implementaciones de cliente
- `11-MCPServerHandsOnLabs/` - Laboratorios de integración completa con base de datos

Cada proyecto de ejemplo contiene sus propias instrucciones de configuración:

#### Proyectos TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Proyectos Python
```bash
cd <project-directory>
pip install -r requirements.txt
# o
pip install -e .
python main.py
```

#### Proyectos Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Flujo de trabajo de desarrollo

### Estructura de la documentación

- **Módulos 00-11**: Contenido principal del plan de estudios en orden secuencial
- **translations/**: Versiones específicas por idioma (generadas automáticamente, no editar directamente)
- **translated_images/**: Versiones localizadas de imágenes (generadas automáticamente)
- **images/**: Imágenes y diagramas fuente

### Realizando cambios en la documentación

1. Editar solo los archivos markdown en inglés en los directorios raíz de los módulos (00-11)
2. Actualizar imágenes en el directorio `images/` si es necesario
3. La acción co-op-translator de GitHub generará automáticamente las traducciones
4. Las traducciones se regeneran al hacer push en la rama principal

### Trabajando con traducciones

- **Traducción automática**: Flujo de trabajo GitHub Actions gestiona todas las traducciones
- **No editar manualmente** archivos en el directorio `translations/`
- Los metadatos de traducción están integrados en cada archivo traducido
- Idiomas soportados: más de 48 idiomas incluyendo árabe, chino, francés, alemán, hindi, japonés, coreano, portugués, ruso, español y muchos más

## Instrucciones de pruebas

### Validación de la documentación

Dado que este es principalmente un repositorio de documentación, las pruebas se enfocan en:

1. **Validación de enlaces**: Asegurar que todos los enlaces internos funcionen
```bash
# Verificar enlaces markdown rotos
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validación de ejemplos de código**: Verificar que los ejemplos de código compilen/ejecuten
```bash
# Navegar a una muestra específica y ejecutar sus pruebas
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Linting de Markdown**: Comprobar la consistencia del formato
```bash
# Usa markdownlint si es necesario
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Prueba de proyectos de ejemplo

Cada ejemplo específico por lenguaje incluye su propio enfoque de prueba:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Directrices de estilo de código

### Estilo de documentación

- Usar un lenguaje claro y adecuado para principiantes
- Incluir ejemplos de código en varios lenguajes cuando sea pertinente
- Seguir las mejores prácticas de markdown:
  - Usar encabezados en estilo ATX (sintaxis `#`)
  - Usar bloques de código con identificadores de lenguaje
  - Incluir texto alternativo descriptivo para las imágenes
  - Mantener líneas de longitud razonable (sin límite estricto, pero con sentido)

### Estilo de ejemplos de código

#### TypeScript/JavaScript
- Usar módulos ES (`import`/`export`)
- Seguir las convenciones de modo estricto de TypeScript
- Incluir anotaciones de tipo
- Destinar a ES2022

#### Python
- Seguir las guías de estilo PEP 8
- Usar anotaciones de tipo cuando corresponda
- Incluir docstrings para funciones y clases
- Usar características modernas de Python (3.8+)

#### Java
- Seguir las convenciones de Spring Boot
- Usar características de Java 21
- Seguir la estructura estándar de proyectos Maven
- Incluir comentarios Javadoc

### Organización de archivos

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Construcción y despliegue

### Despliegue de documentación

El repositorio usa GitHub Pages o similar para alojar la documentación (si aplica). Los cambios en la rama principal activan:

1. Flujo de trabajo de traducción (`.github/workflows/co-op-translator.yml`)
2. Traducción automática de todos los archivos markdown en inglés
3. Localización de imágenes según sea necesario

### No se requiere proceso de compilación

Este repositorio contiene principalmente documentación en markdown. No se necesita ningún paso de compilación o build para el contenido principal del plan de estudios.

### Despliegue de proyectos de ejemplo

Los proyectos de ejemplo individuales pueden tener instrucciones de despliegue:
- Ver `03-GettingStarted/09-deployment/` para guía de despliegue del servidor MCP
- Ejemplos de despliegue en Azure Container Apps en `11-MCPServerHandsOnLabs/`

## Directrices para contribuir

### Proceso de Pull Request

1. **Fork y clona**: Realiza un fork del repositorio y clona tu fork localmente
2. **Crea una rama**: Usa nombres descriptivos para la rama (ej., `fix/typo-module-3`, `add/python-example`)
3. **Realiza los cambios**: Edita solo archivos markdown en inglés (no las traducciones)
4. **Prueba localmente**: Verifica que el markdown se renderice correctamente
5. **Envía el PR**: Usa títulos y descripciones claras para el Pull Request
6. **CLA**: Firma el Acuerdo de Licencia de Contribuidor de Microsoft cuando se te solicite

### Formato del título del PR

Usa títulos claros y descriptivos:
- `[Module XX] Breve descripción` para cambios específicos de módulos
- `[Samples] Descripción` para cambios en ejemplos de código
- `[Docs] Descripción` para actualizaciones generales de documentación

### Qué contribuir

- Correcciones de errores en la documentación o ejemplos de código
- Nuevos ejemplos de código en lenguajes adicionales
- Aclaraciones y mejoras del contenido existente
- Nuevos estudios de caso o ejemplos prácticos
- Reportes de problemas de contenido poco claro o incorrecto

### Qué NO hacer

- No editar archivos directamente en el directorio `translations/`
- No editar el directorio `translated_images/`
- No agregar archivos binarios grandes sin discutirlo antes
- No modificar archivos del flujo de trabajo de traducción sin coordinación

## Notas adicionales

### Mantenimiento del repositorio

- **Historial de cambios**: Todos los cambios significativos se documentan en `changelog.md`
- **Guía de estudio**: Usa `study_guide.md` para una visión general de la navegación del plan de estudios
- **Plantillas de issues**: Usa las plantillas de issues de GitHub para reportes de errores y solicitudes de funciones
- **Código de conducta**: Todos los colaboradores deben seguir el Código de Conducta de código abierto de Microsoft

### Ruta de aprendizaje

Sigue los módulos en orden secuencial (00-11) para un aprendizaje óptimo:
1. **00-02**: Fundamentos (Introducción, conceptos centrales, seguridad)
2. **03**: Primeros pasos con implementación práctica
3. **04-05**: Implementación práctica y temas avanzados
4. **06-10**: Comunidad, mejores prácticas y aplicaciones reales
5. **11**: Laboratorios integrales de base de datos (13 laboratorios secuenciales)

### Recursos de soporte

- **Documentación**: https://modelcontextprotocol.io/
- **Especificación**: https://spec.modelcontextprotocol.io/
- **Comunidad**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Servidor Discord Microsoft Foundry
- **Cursos relacionados**: Ver README.md para otras rutas de aprendizaje de Microsoft

### Solución de problemas comunes

**P: Mi PR falla en la verificación de traducción**  
R: Asegúrate de haber editado solo archivos markdown en inglés en los directorios raíz de los módulos, no las versiones traducidas.

**P: ¿Cómo agrego un nuevo idioma?**  
R: El soporte de idiomas se gestiona a través del flujo de trabajo co-op-translator. Abre un issue para discutir la adición de nuevos idiomas.

**P: Los ejemplos de código no funcionan**  
R: Asegúrate de haber seguido las instrucciones de configuración en el README del ejemplo específico. Verifica que las versiones de las dependencias sean correctas.

**P: Las imágenes no se muestran**  
R: Verifica que las rutas de imágenes sean relativas y usen barras diagonales (/). Las imágenes deben estar en el directorio `images/` o en `translated_images/` para versiones localizadas.

### Consideraciones de rendimiento

- El flujo de trabajo de traducción puede tardar varios minutos en completarse  
- Las imágenes grandes deben optimizarse antes de hacer commit  
- Mantén los archivos markdown individuales enfocados y con tamaño razonable  
- Usa enlaces relativos para mejor portabilidad  

### Gobernanza del proyecto

Este proyecto sigue las prácticas de código abierto de Microsoft:  
- Licencia MIT para código y documentación  
- Código de Conducta de Código Abierto de Microsoft  
- CLA requerida para contribuciones  
- Problemas de seguridad: Sigue las pautas de SECURITY.md  
- Soporte: Consulta SUPPORT.md para recursos de ayuda

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->