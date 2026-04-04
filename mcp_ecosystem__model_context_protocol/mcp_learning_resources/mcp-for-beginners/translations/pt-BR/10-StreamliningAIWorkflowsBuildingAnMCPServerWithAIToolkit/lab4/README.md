# 🐙 Módulo 4: Desenvolvimento Prático MCP - Servidor Clone GitHub Personalizado

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Início Rápido:** Construa um servidor MCP pronto para produção que automatiza o clone de repositórios GitHub e a integração com VS Code em apenas 30 minutos!

## 🎯 Objetivos de Aprendizagem

Ao final deste laboratório, você será capaz de:

- ✅ Criar um servidor MCP personalizado para fluxos de trabalho de desenvolvimento do mundo real
- ✅ Implementar funcionalidade de clonagem de repositórios GitHub via MCP
- ✅ Integrar servidores MCP personalizados com VS Code e Agent Builder
- ✅ Usar o GitHub Copilot Agent Mode com ferramentas MCP personalizadas
- ✅ Testar e implantar servidores MCP personalizados em ambientes de produção

## 📋 Pré-requisitos

- Conclusão dos Laboratórios 1-3 (fundamentos e desenvolvimento avançado MCP)
- Assinatura GitHub Copilot ([cadastro gratuito disponível](https://github.com/github-copilot/signup))
- VS Code com as extensões AI Toolkit e GitHub Copilot
- CLI Git instalado e configurado

## 🏗️ Visão Geral do Projeto

### **Desafio de Desenvolvimento do Mundo Real**
Como desenvolvedores, frequentemente usamos o GitHub para clonar repositórios e abri-los no VS Code ou VS Code Insiders. Esse processo manual envolve:
1. Abrir terminal/prompt de comando
2. Navegar até o diretório desejado
3. Executar o comando `git clone`
4. Abrir o VS Code no diretório clonado

**Nossa solução MCP simplifica isso em um único comando inteligente!**

### **O Que Você Irá Construir**
Um **Servidor MCP Clone GitHub** (`git_mcp_server`) que fornece:

| Recurso | Descrição | Benefício |
|---------|-------------|---------|
| 🔄 **Clonagem Inteligente de Repositórios** | Clona repositórios GitHub com validação | Verificação automática de erros |
| 📁 **Gerenciamento Inteligente de Diretórios** | Verifica e cria diretórios com segurança | Evita sobreposição de arquivos |
| 🚀 **Integração Cross-Platform com VS Code** | Abre projetos no VS Code/Insiders | Transição fluida no fluxo de trabalho |
| 🛡️ **Tratamento Robusto de Erros** | Gerencia problemas de rede, permissões e caminhos | Confiabilidade pronta para produção |

---

## 📖 Implementação Passo a Passo

### Passo 1: Criar Agente GitHub no Agent Builder

1. **Inicie o Agent Builder** através da extensão AI Toolkit
2. **Crie um novo agente** com a configuração a seguir:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inicialize o servidor MCP personalizado:**
   - Navegue até **Tools** → **Add Tool** → **MCP Server**
   - Selecione **"Create A new MCP Server"**
   - Escolha o **modelo Python** para máxima flexibilidade
   - **Nome do Servidor:** `git_mcp_server`

### Passo 2: Configurar o GitHub Copilot Agent Mode

1. **Abra o GitHub Copilot** no VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Selecione o Modelo de Agente** na interface do Copilot
3. **Escolha o modelo Claude 3.7** para capacidades aprimoradas de raciocínio
4. **Ative a integração MCP** para acesso às ferramentas

> **💡 Dica Profissional:** Claude 3.7 oferece entendimento superior dos fluxos de desenvolvimento e padrões de tratamento de erros.

### Passo 3: Implementar Funcionalidade Principal do Servidor MCP

**Use o seguinte prompt detalhado com o GitHub Copilot Agent Mode:**

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

### Passo 4: Testar Seu Servidor MCP

#### 4a. Testar no Agent Builder

1. **Inicie a configuração de depuração** no Agent Builder
2. **Configure seu agente com este prompt de sistema:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Teste com cenários realistas de usuário:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/pt-BR/DebugAgent.81d152370c503241.webp)

**Resultados Esperados:**
- ✅ Clonagem bem-sucedida com confirmação do caminho
- ✅ Lançamento automático do VS Code
- ✅ Mensagens de erro claras para cenários inválidos
- ✅ Tratamento adequado de casos de borda

#### 4b. Testar no MCP Inspector


![MCP Inspector Testing](../../../../translated_images/pt-BR/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Parabéns!** Você criou com sucesso um servidor MCP prático e pronto para produção que resolve desafios reais do fluxo de trabalho de desenvolvimento. Seu servidor clone GitHub personalizado demonstra o poder do MCP para automatizar e aprimorar a produtividade do desenvolvedor.

### 🏆 Conquistas Desbloqueadas:
- ✅ **Desenvolvedor MCP** - Criou servidor MCP personalizado
- ✅ **Automatizador de Fluxo de Trabalho** - Otimizou processos de desenvolvimento  
- ✅ **Especialista em Integração** - Conectou múltiplas ferramentas de desenvolvimento
- ✅ **Pronto para Produção** - Construiu soluções implantáveis

---

## 🎓 Conclusão do Workshop: Sua Jornada com Model Context Protocol

**Caro Participante do Workshop,**

Parabéns por concluir todos os quatro módulos do workshop Model Context Protocol! Você percorreu um longo caminho, desde a compreensão dos conceitos básicos do AI Toolkit até a construção de servidores MCP prontos para produção que resolvem desafios reais de desenvolvimento.

### 🚀 Recapitulação do Seu Caminho de Aprendizagem:

**[Módulo 1](../lab1/README.md)**: Você começou explorando fundamentos do AI Toolkit, testes de modelos e criou seu primeiro agente de IA.

**[Módulo 2](../lab2/README.md)**: Aprendeu a arquitetura MCP, integrou o Playwright MCP e criou seu primeiro agente de automação de navegador.

**[Módulo 3](../lab3/README.md)**: Avançou para o desenvolvimento de servidores MCP personalizados com o servidor Weather MCP e dominou ferramentas de depuração.

**[Módulo 4](../lab4/README.md)**: Agora aplicou tudo para criar uma ferramenta prática de automação de workflow de repositórios GitHub.

### 🌟 O Que Você Dominou:

- ✅ **Ecossistema AI Toolkit**: Modelos, agentes e padrões de integração
- ✅ **Arquitetura MCP**: Design cliente-servidor, protocolos de transporte e segurança
- ✅ **Ferramentas de Desenvolvimento**: Do Playground ao Inspector até a implantação em produção
- ✅ **Desenvolvimento Personalizado**: Construção, teste e implantação dos seus próprios servidores MCP
- ✅ **Aplicações Práticas**: Resolução de desafios reais de fluxo de trabalho com IA

### 🔮 Seus Próximos Passos:

1. **Construa Seu Próprio Servidor MCP**: Aplique essas habilidades para automatizar seus fluxos únicos
2. **Junte-se à Comunidade MCP**: Compartilhe suas criações e aprenda com outros
3. **Explore Integração Avançada**: Conecte servidores MCP a sistemas empresariais
4. **Contribua para Open Source**: Ajude a melhorar as ferramentas e a documentação MCP

Lembre-se, este workshop é apenas o começo. O ecossistema Model Context Protocol está evoluindo rapidamente, e você agora está preparado para estar à frente com ferramentas de desenvolvimento impulsionadas por IA.

**Obrigado pela sua participação e dedicação ao aprendizado!**

Esperamos que este workshop tenha inspirado ideias que transformarão como você constrói e interage com ferramentas de IA na sua jornada de desenvolvimento.

**Boas codificações!**

---

## O Que Vem a Seguir

Parabéns por concluir todos os laboratórios do Módulo 10!

- Voltar para: [Visão Geral do Módulo 10](../README.md)
- Continuar para: [Módulo 11: Laboratórios Práticos de Servidor MCP](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, pedimos que esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional feita por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações equivocadas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->