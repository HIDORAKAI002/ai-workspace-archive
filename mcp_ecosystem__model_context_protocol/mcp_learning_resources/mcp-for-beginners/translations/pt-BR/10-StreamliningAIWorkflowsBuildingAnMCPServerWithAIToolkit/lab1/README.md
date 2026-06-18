# 🚀 Módulo 1: Fundamentos do Microsoft Foundry Toolkit

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Objetivos de Aprendizagem

Ao final deste módulo, você será capaz de:
- ✅ Instalar e configurar a extensão Microsoft Foundry Toolkit para VS Code
- ✅ Navegar pelo Catálogo de Modelos e entender diferentes fontes de modelos
- ✅ Usar o Playground para testes e experimentação de modelos
- ✅ Criar agentes de IA personalizados usando o Agent Builder
- ✅ Comparar desempenho de modelos entre diferentes provedores
- ✅ Aplicar melhores práticas em prompt engineering

## 🧠 Introdução ao Microsoft Foundry Toolkit

A **extensão Microsoft Foundry Toolkit para VS Code** é a principal extensão da Microsoft que transforma o VS Code em um ambiente completo de desenvolvimento de IA. Ela conecta a pesquisa em IA ao desenvolvimento prático de aplicações, tornando a IA generativa acessível para desenvolvedores de todos os níveis.

### 🌟 Capacidades Principais

| Recurso | Descrição | Caso de Uso |
|---------|-----------|-------------|
| **🗂️ Catálogo de Modelos** | Acesso a mais de 100 modelos do GitHub, ONNX, OpenAI, Anthropic, Google | Descoberta e seleção de modelos |
| **🔌 Suporte BYOM (Traga Seu Próprio Modelo)** | Integre seus próprios modelos (locais/remotos) | Implantação personalizada de modelos |
| **🎮 Playground Interativo** | Testes em tempo real com interface de chat | Prototipagem e testes rápidos |
| **📎 Suporte Multi-Modal** | Manipulação de texto, imagens e anexos | Aplicações complexas de IA |
| **⚡ Processamento em Lote** | Execute múltiplos prompts simultaneamente | Fluxos de trabalho de testes eficientes |
| **📊 Avaliação de Modelos** | Métricas integradas (F1, relevância, similaridade, coerência) | Avaliação de desempenho |

### 🎯 Por Que o Microsoft Foundry Toolkit é Importante

- **🚀 Desenvolvimento Acelerado**: Da ideia ao protótipo em minutos
- **🔄 Fluxo de Trabalho Unificado**: Uma interface para múltiplos provedores de IA
- **🧪 Experimentação Fácil**: Compare modelos sem configurações complexas
- **📈 Pronto para Produção**: Transição suave do protótipo para o deployment

## 🛠️ Pré-requisitos & Configuração

### 📦 Instalar a Extensão Microsoft Foundry Toolkit

**Passo 1: Acessar o Marketplace de Extensões**
1. Abra o Visual Studio Code
2. Navegue até a visão de Extensões (`Ctrl+Shift+X` ou `Cmd+Shift+X`)
3. Procure por "Microsoft Foundry Toolkit"

**Passo 2: Escolha Sua Versão**
- **🟢 Release**: Recomendado para uso em produção
- **🔶 Pré-release**: Acesso antecipado a recursos avançados

**Passo 3: Instale e Ative**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/pt-BR/aitkext.d28945a03eed003c.webp)

### ✅ Lista de Verificação para Verificação
- [ ] Ícone do Microsoft Foundry Toolkit aparece na barra lateral do VS Code
- [ ] Extensão está habilitada e ativada
- [ ] Sem erros de instalação no painel de saída

## 🧪 Exercício Prático 1: Explorando Modelos do GitHub

**🎯 Objetivo**: Dominar o Catálogo de Modelos e testar seu primeiro modelo de IA

### 📊 Passo 1: Navegar pelo Catálogo de Modelos

O Catálogo de Modelos é sua porta de entrada para o ecossistema de IA. Ele agrega modelos de múltiplos provedores, facilitando descobrir e comparar opções.

**🔍 Guia de Navegação:**

Clique em **MODELS - Catalog** na barra lateral do Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/pt-BR/aimodel.263ed2be013d8fb0.webp)

**💡 Dica Profissional**: Procure por modelos com capacidades específicas que correspondam ao seu caso de uso (ex: geração de código, escrita criativa, análise).

**⚠️ Nota**: Modelos hospedados no GitHub (ou seja, Modelos GitHub) são gratuitos, mas sujeitos a limites de taxa para requisições e tokens. Para acessar modelos externos não hospedados no GitHub (por exemplo, via Azure AI ou outros endpoints), será necessário fornecer a chave de API ou autenticação adequada.

### 🚀 Passo 2: Adicionar e Configurar Seu Primeiro Modelo

**Estratégia de Seleção do Modelo:**
- **GPT-4.1**: Melhor para raciocínios complexos e análises
- **Phi-4-mini**: Leve, respostas rápidas para tarefas simples

**🔧 Processo de Configuração:**
1. Selecione **OpenAI GPT-4.1** no catálogo
2. Clique em **Add to My Models** – isto registra o modelo para uso
3. Escolha **Try in Playground** para abrir o ambiente de testes
4. Aguarde a inicialização do modelo (a configuração inicial pode demorar um pouco)

![Playground Setup](../../../../translated_images/pt-BR/playground.dd6f5141344878ca.webp)

**⚙️ Entendendo os Parâmetros do Modelo:**
- **Temperature**: Controla a criatividade (0 = determinístico, 1 = criativo)
- **Max Tokens**: Máximo comprimento da resposta
- **Top-p**: Amostragem núcleo para diversidade na resposta

### 🎯 Passo 3: Dominar a Interface do Playground

O Playground é seu laboratório para experimentação de IA. Veja como maximizar seu potencial:

**🎨 Melhores Práticas em Prompt Engineering:**
1. **Seja Específico**: Instruções claras e detalhadas trazem melhores resultados
2. **Forneça Contexto**: Inclua informações relevantes de fundo
3. **Use Exemplos**: Mostre ao modelo o que você quer com exemplos
4. **Itere**: Refine os prompts com base nos resultados iniciais

**🧪 Cenários de Teste:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/pt-BR/result.1dfcf211fb359cf6.webp)

### 🏆 Exercício Desafio: Comparação de Desempenho dos Modelos

**🎯 Meta**: Compare diferentes modelos usando os mesmos prompts para entender seus pontos fortes

**📋 Instruções:**
1. Adicione **Phi-4-mini** ao seu espaço de trabalho
2. Use o mesmo prompt para GPT-4.1 e Phi-4-mini

![set](../../../../translated_images/pt-BR/set.88132df189ecde2c.webp)

3. Compare qualidade, velocidade e precisão das respostas
4. Documente suas descobertas na seção de resultados

![Model Comparison](../../../../translated_images/pt-BR/compare.97746cd0f9074955.webp)

**💡 Insights Importantes para Descobrir:**
- Quando usar LLM vs SLM
- Compensações entre custo e desempenho
- Capacidades especializadas de diferentes modelos

## 🤖 Exercício Prático 2: Construindo Agentes Personalizados com Agent Builder

**🎯 Objetivo**: Criar agentes de IA especializados para tarefas e fluxos de trabalho específicos

### 🏗️ Passo 1: Entendendo o Agent Builder

O Agent Builder é onde o Microsoft Foundry Toolkit realmente se destaca. Ele permite criar assistentes de IA sob medida que combinam o poder de grandes modelos de linguagem com instruções personalizadas, parâmetros específicos e conhecimento especializado.

**🧠 Componentes da Arquitetura do Agente:**
- **Modelo Core**: A base LLM (GPT-4, Groks, Phi, etc.)
- **Prompt do Sistema**: Define a personalidade e comportamento do agente
- **Parâmetros**: Ajustes finos para desempenho ideal
- **Integração de Ferramentas**: Conexão com APIs externas e serviços MCP
- **Memória**: Contexto da conversa e persistência da sessão

![Agent Builder Interface](../../../../translated_images/pt-BR/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Passo 2: Mergulho na Configuração do Agente

**🎨 Criando Prompts de Sistema Eficazes:**
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

*Claro, você também pode usar Generate System Prompt para que a IA ajude a gerar e otimizar prompts*

**🔧 Otimização de Parâmetros:**
| Parâmetro | Faixa Recomendada | Caso de Uso |
|-----------|-------------------|-------------|
| **Temperature** | 0.1-0.3 | Respostas técnicas/fatuais |
| **Temperature** | 0.7-0.9 | Tarefas criativas/de brainstorming |
| **Max Tokens** | 500-1000 | Respostas concisas |
| **Max Tokens** | 2000-4000 | Explicações detalhadas |

### 🐍 Passo 3: Exercício Prático - Agente Programador Python

**🎯 Missão**: Criar um assistente especializado em programação Python

**📋 Passos para Configuração:**

1. **Seleção do Modelo**: Escolha **Claude 3.5 Sonnet** (excelente para código)

2. **Design do Prompt do Sistema**:
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

3. **Configuração de Parâmetros**:
   - Temperature: 0.2 (para código consistente e confiável)
   - Max Tokens: 2000 (explicações detalhadas)
   - Top-p: 0.9 (criatividade equilibrada)

![Python Agent Configuration](../../../../translated_images/pt-BR/pythonagent.5e51b406401c165f.webp)

### 🧪 Passo 4: Testando Seu Agente Python

**Cenários de Teste:**
1. **Função Básica**: "Crie uma função para encontrar números primos"
2. **Algoritmo Complexo**: "Implemente uma árvore binária de busca com métodos inserir, deletar e buscar"
3. **Problema do Mundo Real**: "Construa um web scraper que lide com limitação de taxas e tentativas"
4. **Depuração**: "Corrija este código [cole código com erro]"

**🏆 Critérios de Sucesso:**
- ✅ Código executa sem erros
- ✅ Inclui documentação adequada
- ✅ Segue melhores práticas de Python
- ✅ Fornece explicações claras
- ✅ Sugere melhorias

## 🎓 Conclusão do Módulo 1 & Próximos Passos

### 📊 Verificação de Conhecimento

Teste seu entendimento:
- [ ] Você pode explicar a diferença entre os modelos no catálogo?
- [ ] Você criou e testou com sucesso um agente personalizado?
- [ ] Você entende como otimizar parâmetros para diferentes casos de uso?
- [ ] Você pode criar prompts de sistema eficazes?

### 📚 Recursos Adicionais

- **Documentação Microsoft Foundry Toolkit**: [Microsoft Docs Oficiais](https://github.com/microsoft/vscode-ai-toolkit)
- **Guia de Prompt Engineering**: [Melhores Práticas](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modelos no Microsoft Foundry Toolkit**: [Modelos em Desenvolvimento](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Parabéns!** Você dominou os fundamentos do Microsoft Foundry Toolkit e está pronto para criar aplicações avançadas de IA!

### 🔜 Continue para o Próximo Módulo

Pronto para capacidades mais avançadas? Continue para **[Módulo 2: MCP com Fundamentos do Microsoft Foundry Toolkit](../lab2/README.md)** onde você aprenderá a:
- Conectar seus agentes a ferramentas externas usando o Model Context Protocol (MCP)
- Construir agentes de automação de navegadores com Playwright
- Integrar servidores MCP aos seus agentes Microsoft Foundry Toolkit
- Potencializar seus agentes com dados e capacidades externas

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->