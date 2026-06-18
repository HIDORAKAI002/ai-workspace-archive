# 🐙 Módulo 4: Desarrollo Práctico MCP - Servidor Personalizado para Clonar GitHub

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Inicio Rápido:** ¡Construye un servidor MCP listo para producción que automatiza la clonación de repositorios GitHub e integración con VS Code en solo 30 minutos!

## 🎯 Objetivos de Aprendizaje

Al final de este laboratorio, podrás:

- ✅ Crear un servidor MCP personalizado para flujos de trabajo de desarrollo en el mundo real
- ✅ Implementar la funcionalidad de clonación de repositorios GitHub vía MCP
- ✅ Integrar servidores MCP personalizados con VS Code y Agent Builder
- ✅ Usar GitHub Copilot Agent Mode con herramientas MCP personalizadas
- ✅ Probar y desplegar servidores MCP personalizados en entornos de producción

## 📋 Prerrequisitos

- Haber completado los Laboratorios 1-3 (fundamentos MCP y desarrollo avanzado)
- Suscripción a GitHub Copilot ([registro gratuito disponible](https://github.com/github-copilot/signup))
- VS Code con Microsoft Foundry Toolkit y extensiones de GitHub Copilot
- CLI de Git instalado y configurado

## 🏗️ Resumen del Proyecto

### **Desafío de Desarrollo en el Mundo Real**
Como desarrolladores, frecuentemente usamos GitHub para clonar repositorios y abrirlos en VS Code o VS Code Insiders. Este proceso manual involucra:
1. Abrir terminal/command prompt
2. Navegar al directorio deseado
3. Ejecutar el comando `git clone`
4. Abrir VS Code en el directorio clonado

**¡Nuestra solución MCP lo simplifica a un solo comando inteligente!**

### **Qué Construirás**
Un **Servidor GitHub Clone MCP** (`git_mcp_server`) que ofrece:

| Función | Descripción | Beneficio |
|---------|-------------|-----------|
| 🔄 **Clonación Inteligente de Repositorios** | Clona repos GitHub con validación | Comprobación automatizada de errores |
| 📁 **Gestión Inteligente de Directorios** | Verifica y crea directorios de forma segura | Evita sobreescrituras |
| 🚀 **Integración Multiplataforma con VS Code** | Abre proyectos en VS Code/Insiders | Transición fluida en el flujo de trabajo |
| 🛡️ **Manejo Robusto de Errores** | Gestiona problemas de red, permisos y rutas | Confiabilidad lista para producción |

---

## 📖 Implementación Paso a Paso

### Paso 1: Crear Agente GitHub en Agent Builder

1. **Lanza Agent Builder** a través de la extensión Microsoft Foundry Toolkit
2. **Crea un nuevo agente** con la siguiente configuración:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inicializa servidor MCP personalizado:**
   - Navega a **Herramientas** → **Agregar herramienta** → **Servidor MCP**
   - Selecciona **"Crear un nuevo servidor MCP"**
   - Escoge la **plantilla Python** para máxima flexibilidad
   - **Nombre del servidor:** `git_mcp_server`

### Paso 2: Configurar GitHub Copilot Agent Mode

1. **Abre GitHub Copilot** en VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Selecciona modelo de agente** en la interfaz de Copilot
3. **Elige modelo Claude 3.7** para capacidades avanzadas de razonamiento
4. **Activa integración MCP** para acceso a herramientas

> **💡 Consejo Profesional:** Claude 3.7 ofrece una comprensión superior de flujos de trabajo de desarrollo y patrones de manejo de errores.

### Paso 3: Implementa la Funcionalidad Central del Servidor MCP

**Usa el siguiente prompt detallado con GitHub Copilot Agent Mode:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Paso 4: Prueba tu Servidor MCP

#### 4a. Prueba en Agent Builder

1. **Ejecuta la configuración de depuración** para Agent Builder
2. **Configura tu agente con este prompt del sistema:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Prueba con escenarios reales de usuario:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/es/DebugAgent.81d152370c503241.webp)

**Resultados Esperados:**
- ✅ Clonación exitosa con confirmación de ruta
- ✅ Lanzamiento automático de VS Code
- ✅ Mensajes claros de error en escenarios inválidos
- ✅ Manejo adecuado de casos límite

#### 4b. Prueba en MCP Inspector


![MCP Inspector Testing](../../../../translated_images/es/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 ¡Felicidades!** Has creado con éxito un servidor MCP práctico y listo para producción que resuelve desafíos reales de flujos de trabajo de desarrollo. Tu servidor personalizado para clonar GitHub demuestra el poder de MCP para automatizar y mejorar la productividad del desarrollador.

### 🏆 Logros Desbloqueados:
- ✅ **Desarrollador MCP** - Creó servidor MCP personalizado  
- ✅ **Automatizador de Flujo de Trabajo** - Optimizó procesos de desarrollo  
- ✅ **Experto en Integración** - Conectó múltiples herramientas de desarrollo  
- ✅ **Listo para Producción** - Construyó soluciones desplegables

---

## 🎓 Finalización del Taller: Tu Trayectoria con Model Context Protocol

**Estimado Participante del Taller,**

¡Felicitaciones por completar los cuatro módulos del taller Model Context Protocol! Has recorrido un largo camino desde entender conceptos básicos del Microsoft Foundry Toolkit hasta construir servidores MCP listos para producción que resuelven desafíos reales de desarrollo.

### 🚀 Recapitulación de tu Ruta de Aprendizaje:

**[Módulo 1](../lab1/README.md)**: Comenzaste explorando fundamentos de Microsoft Foundry Toolkit, pruebas de modelos y creando tu primer agente IA.

**[Módulo 2](../lab2/README.md)**: Aprendiste arquitectura MCP, integraste Playwright MCP y construiste tu primer agente de automatización de navegador.

**[Módulo 3](../lab3/README.md)**: Avanzaste al desarrollo de servidores MCP personalizados con el servidor Weather MCP y dominaste las herramientas de depuración.

**[Módulo 4](../lab4/README.md)**: Ahora aplicaste todo para crear una herramienta práctica de automatización del flujo de trabajo de repositorio GitHub.

### 🌟 Lo que has dominado:

- ✅ **Ecosistema Microsoft Foundry Toolkit**: Modelos, agentes y patrones de integración  
- ✅ **Arquitectura MCP**: Diseño cliente-servidor, protocolos de transporte y seguridad  
- ✅ **Herramientas para Desarrolladores**: Desde Playground a Inspector y despliegue en producción  
- ✅ **Desarrollo Personalizado**: Construcción, pruebas y despliegue de tus propios servidores MCP  
- ✅ **Aplicaciones Prácticas**: Resolver desafíos reales de flujo de trabajo con IA

### 🔮 Tus Próximos Pasos:

1. **Construye tu Propio Servidor MCP**: Aplica estas habilidades para automatizar tus flujos personalizados  
2. **Únete a la Comunidad MCP**: Comparte tus creaciones y aprende de otros  
3. **Explora Integración Avanzada**: Conecta servidores MCP con sistemas empresariales  
4. **Contribuye al Código Abierto**: Ayuda a mejorar las herramientas y documentación MCP

Recuerda, este taller es solo el comienzo. El ecosistema Model Context Protocol evoluciona rápidamente, y ahora estás equipado para estar a la vanguardia de herramientas de desarrollo impulsadas por IA.

**¡Gracias por tu participación y dedicación al aprendizaje!**

Esperamos que este taller haya despertado ideas que transformarán cómo construyes e interactúas con herramientas IA en tu trayectoria de desarrollo.

**¡Feliz codificación!**

---

## Qué Sigue

¡Felicidades por completar todos los laboratorios en el Módulo 10!

- Volver a: [Visión general del Módulo 10](../README.md)
- Continuar a: [Módulo 11: Laboratorios prácticos del servidor MCP](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->