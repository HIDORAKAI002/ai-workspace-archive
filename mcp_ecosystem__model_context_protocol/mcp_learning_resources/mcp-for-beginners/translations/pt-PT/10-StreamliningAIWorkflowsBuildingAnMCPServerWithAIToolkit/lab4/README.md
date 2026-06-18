# 🐙 Módulo 4: Desenvolvimento Prático MCP - Servidor Personalizado de Clone GitHub

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Arranque Rápido:** Construa um servidor MCP pronto para produção que automatiza o clone de repositórios GitHub e a integração com VS Code em apenas 30 minutos!

## 🎯 Objetivos de Aprendizagem

No final deste laboratório, será capaz de:

- ✅ Criar um servidor MCP personalizado para fluxos de trabalho de desenvolvimento do mundo real
- ✅ Implementar a funcionalidade de clone de repositórios GitHub via MCP
- ✅ Integrar servidores MCP personalizados com VS Code e Agent Builder
- ✅ Usar o modo Agent do GitHub Copilot com ferramentas MCP personalizadas
- ✅ Testar e implementar servidores MCP personalizados em ambientes de produção

## 📋 Pré-Requisitos

- Conclusão dos Laboratórios 1-3 (fundamentos MCP e desenvolvimento avançado)
- Subscrição do GitHub Copilot ([inscrição gratuita disponível](https://github.com/github-copilot/signup))
- VS Code com as extensões Microsoft Foundry Toolkit e GitHub Copilot instaladas
- CLI Git instalada e configurada

## 🏗️ Visão Geral do Projeto

### **Desafio de Desenvolvimento do Mundo Real**
Como desenvolvedores, frequentemente usamos o GitHub para clonar repositórios e abri-los no VS Code ou VS Code Insiders. Este processo manual envolve:
1. Abrir terminal/prompt de comando
2. Navegar até ao diretório desejado
3. Executar o comando `git clone`
4. Abrir o VS Code no diretório clonado

**A nossa solução MCP simplifica isto num único comando inteligente!**

### **O Que Vai Construir**
Um **Servidor MCP Clone GitHub** (`git_mcp_server`) que fornece:

| Funcionalidade | Descrição | Benefício |
|---------|-------------|---------|
| 🔄 **Clone Inteligente de Repositórios** | Clonar repositórios GitHub com validação | Verificação automática de erros |
| 📁 **Gestão Inteligente de Diretórios** | Verifica e cria diretórios com segurança | Evita sobregravação |
| 🚀 **Integração Cross-Platform VS Code** | Abrir projetos no VS Code/Insiders | Transição de fluxo de trabalho fluida |
| 🛡️ **Gestão Robusta de Erros** | Lida com problemas de rede, permissões e caminhos | Confiabilidade pronta para produção |

---

## 📖 Implementação Passo a Passo

### Passo 1: Criar Agente GitHub no Agent Builder

1. **Inicie o Agent Builder** através da extensão Microsoft Foundry Toolkit
2. **Crie um novo agente** com a seguinte configuração:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inicialize o servidor MCP personalizado:**
   - Navegue até **Tools** → **Add Tool** → **MCP Server**
   - Selecione **"Create A new MCP Server"**
   - Escolha o **template Python** para máxima flexibilidade
   - **Nome do Servidor:** `git_mcp_server`

### Passo 2: Configurar o Modo Agent do GitHub Copilot

1. **Abra o GitHub Copilot** no VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Selecione o Modelo de Agente** na interface do Copilot
3. **Escolha o modelo Claude 3.7** para capacidades de raciocínio melhoradas
4. **Ative a integração MCP** para acesso a ferramentas

> **💡 Dica Profissional:** O Claude 3.7 oferece uma melhor compreensão dos fluxos de trabalho de desenvolvimento e padrões de gestão de erros.

### Passo 3: Implementar Funcionalidade Principal do Servidor MCP

**Use o seguinte prompt detalhado com o modo Agent do GitHub Copilot:**

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

### Passo 4: Testar o seu Servidor MCP

#### 4a. Testar no Agent Builder

1. **Inicie a configuração de debug** para o Agent Builder
2. **Configure o seu agente com este prompt de sistema:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Teste com cenários realistas de utilizador:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/pt-PT/DebugAgent.81d152370c503241.webp)

**Resultados Esperados:**
- ✅ Clone bem-sucedido com confirmação do caminho
- ✅ Lançamento automático do VS Code
- ✅ Mensagens claras de erro para cenários inválidos
- ✅ Gestão adequada de casos limites

#### 4b. Testar no MCP Inspector


![MCP Inspector Testing](../../../../translated_images/pt-PT/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Parabéns!** Criou com sucesso um servidor MCP prático e pronto para produção que resolve desafios reais de fluxo de trabalho de desenvolvimento. O seu servidor personalizado de clone GitHub demonstra o poder do MCP para automatizar e melhorar a produtividade dos desenvolvedores.

### 🏆 Conquistas Desbloqueadas:
- ✅ **Desenvolvedor MCP** - Criou servidor MCP personalizado
- ✅ **Automatizador de Fluxos** - Otimizou processos de desenvolvimento  
- ✅ **Expert em Integração** - Conectou múltiplas ferramentas de desenvolvimento
- ✅ **Pronto para Produção** - Construiu soluções implementáveis

---

## 🎓 Conclusão do Workshop: A Sua Jornada com o Model Context Protocol

**Caro Participante do Workshop,**

Parabéns por completar os quatro módulos do workshop Model Context Protocol! Fez um grande percurso desde a compreensão dos conceitos básicos do Microsoft Foundry Toolkit até à construção de servidores MCP prontos para produção que resolvem desafios reais de desenvolvimento.

### 🚀 Recapitulação do Seu Caminho de Aprendizagem:

**[Módulo 1](../lab1/README.md)**: Começou explorando os fundamentos do Microsoft Foundry Toolkit, testes de modelos e criou o seu primeiro agente de IA.

**[Módulo 2](../lab2/README.md)**: Aprendeu a arquitetura MCP, integrou o Playwright MCP e construiu o seu primeiro agente de automação de browser.

**[Módulo 3](../lab3/README.md)**: Avançou para o desenvolvimento personalizado de servidores MCP com o Weather MCP server e dominou as ferramentas de debug.

**[Módulo 4](../lab4/README.md)**: Aplicou tudo para criar uma ferramenta prática de automatização de fluxos de trabalho de repositórios GitHub.

### 🌟 O Que Dominou:

- ✅ **Ecossistema Microsoft Foundry Toolkit**: Modelos, agentes e padrões de integração
- ✅ **Arquitetura MCP**: Design cliente-servidor, protocolos de transporte e segurança
- ✅ **Ferramentas para Desenvolvedores**: Desde o Playground ao Inspector até à implementação em produção
- ✅ **Desenvolvimento Personalizado**: Construção, teste e implementação dos seus próprios servidores MCP
- ✅ **Aplicações Práticas**: Resolver desafios reais de fluxo de trabalho com IA

### 🔮 Os Seus Próximos Passos:

1. **Construa o Seu Próprio Servidor MCP**: Aplique estas competências para automatizar os seus fluxos de trabalho únicos
2. **Junte-se à Comunidade MCP**: Partilhe as suas criações e aprenda com outros
3. **Explore Integrações Avançadas**: Conecte servidores MCP a sistemas empresariais
4. **Contribua para Open Source**: Ajude a melhorar as ferramentas e documentação MCP

Lembre-se, este workshop é apenas o começo. O ecossistema Model Context Protocol está a evoluir rapidamente, e agora está equipado para estar na vanguarda das ferramentas de desenvolvimento potenciadas por IA.

**Obrigado pela sua participação e dedicação ao aprendizado!**

Esperamos que este workshop tenha inspirado ideias que transformarão a forma como constrói e interage com ferramentas de IA na sua jornada de desenvolvimento.

**Boa codificação!**

---

## O Que Segue

Parabéns por completar todos os laboratórios do Módulo 10!

- Voltar para: [Visão Geral do Módulo 10](../README.md)
- Continuar para: [Módulo 11: Laboratórios Práticos de Servidor MCP](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->