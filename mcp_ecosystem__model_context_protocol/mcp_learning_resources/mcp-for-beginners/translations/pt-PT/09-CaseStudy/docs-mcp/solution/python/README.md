# Gerador de Plano de Estudo com Chainlit & Microsoft Learn Docs MCP

## Pré-requisitos

- Python 3.8 ou superior
- pip (gestor de pacotes Python)
- Acesso à Internet para ligar ao servidor Microsoft Learn Docs MCP

## Instalação

1. Clone este repositório ou descarregue os ficheiros do projeto.
2. Instale as dependências necessárias:

   ```bash
   pip install -r requirements.txt
   ```

## Utilização

### Cenário 1: Consulta Simples ao Docs MCP
Um cliente de linha de comandos que se liga ao servidor Docs MCP, envia uma consulta e imprime o resultado.

1. Execute o script:
   ```bash
   python scenario1.py
   ```
2. Insira a sua questão sobre documentação no prompt.

### Cenário 2: Gerador de Plano de Estudo (App Web Chainlit)
Uma interface web (usando Chainlit) que permite aos utilizadores gerar um plano de estudo personalizado, semana a semana, para qualquer tópico técnico.

1. Inicie a aplicação Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Abra a URL local fornecida no seu terminal (exemplo: http://localhost:8000) no seu navegador.
3. Na janela do chat, insira o tópico de estudo e o número de semanas que deseja estudar (ex.: "certificação AI-900, 8 semanas").
4. A aplicação responderá com um plano de estudo semana a semana, incluindo links para documentação Microsoft Learn relevante.

**Variáveis de Ambiente Necessárias:**

Para usar o Cenário 2 (a app web Chainlit com Azure OpenAI), deve definir as seguintes variáveis de ambiente num ficheiro `.env` na diretoria `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Preencha estes valores com os detalhes do seu recurso Azure OpenAI antes de executar a aplicação.

> [!TIP]
> Pode facilmente implementar os seus próprios modelos usando o [Microsoft Foundry](https://ai.azure.com/).

### Cenário 3: Docs no Editor com Servidor MCP no VS Code

Em vez de mudar de separador no navegador para pesquisar documentação, pode trazer o Microsoft Learn Docs diretamente para o seu VS Code usando o servidor MCP. Isto permite-lhe:
- Pesquisar e ler documentação dentro do VS Code sem sair do ambiente de codificação.
- Referenciar documentação e inserir links diretamente nos seus ficheiros README ou cursos.
- Usar GitHub Copilot e MCP em conjunto para um fluxo de trabalho de documentação potenciado por IA sem interrupções.

**Exemplos de Utilização:**
- Adicionar rapidamente links de referência a um README enquanto escreve documentação de um curso ou projeto.
- Usar o Copilot para gerar código e o MCP para encontrar e citar imediatamente documentação relevante.
- Manter-se focado no editor e aumentar a produtividade.

> [!IMPORTANT]
> Certifique-se de que tem uma configuração válida de [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) no seu espaço de trabalho (localização: `.vscode/mcp.json`).

## Porquê Chainlit para o Cenário 2?

Chainlit é um framework moderno de código aberto para construir aplicações web conversacionais. Facilita a criação de interfaces de utilizador baseadas em chat que se ligam a serviços backend como o servidor Microsoft Learn Docs MCP. Este projeto usa o Chainlit para proporcionar uma forma simples e interativa de gerar planos de estudo personalizados em tempo real. Ao aproveitar o Chainlit, pode construir e implementar rapidamente ferramentas baseadas em chat que melhoram a produtividade e o aprendizado.

## O Que Isto Faz

Esta aplicação permite aos utilizadores criar um plano de estudo personalizado simplesmente inserindo um tema e uma duração. A aplicação analisa a sua entrada, pesquisa no servidor Microsoft Learn Docs MCP conteúdo relevante e organiza os resultados num plano estruturado, semana a semana. As recomendações de cada semana são exibidas no chat, tornando fácil seguir e acompanhar o seu progresso. A integração garante que obtém sempre os recursos de aprendizagem mais recentes e relevantes.

## Exemplos de Consultas

Experimente estas consultas na janela do chat para ver como a aplicação responde:

- `certificação AI-900, 8 semanas`
- `Aprender Azure Functions, 4 semanas`
- `Azure DevOps, 6 semanas`
- `Engenharia de dados no Azure, 10 semanas`
- `Fundamentos de segurança Microsoft, 5 semanas`
- `Power Platform, 7 semanas`
- `Serviços AI do Azure, 12 semanas`
- `Arquitetura cloud, 9 semanas`

Estes exemplos demonstram a flexibilidade da aplicação para diferentes objetivos de aprendizagem e prazos.

## Referências

- [Documentação Chainlit](https://docs.chainlit.io/)
- [Documentação MCP](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->