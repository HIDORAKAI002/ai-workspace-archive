# Gerador de Plano de Estudo com Chainlit & Microsoft Learn Docs MCP

## Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- Acesso à internet para conectar ao servidor Microsoft Learn Docs MCP

## Instalação

1. Clone este repositório ou baixe os arquivos do projeto.
2. Instale as dependências necessárias:

   ```bash
   pip install -r requirements.txt
   ```

## Uso

### Cenário 1: Consulta Simples ao Docs MCP
Um cliente de linha de comando que se conecta ao servidor Docs MCP, envia uma consulta e exibe o resultado.

1. Execute o script:
   ```bash
   python scenario1.py
   ```
2. Digite sua pergunta sobre a documentação no prompt.

### Cenário 2: Gerador de Plano de Estudo (Aplicativo Web Chainlit)
Uma interface web (usando Chainlit) que permite aos usuários gerar um plano de estudo personalizado, semana a semana, para qualquer tópico técnico.

1. Inicie o app Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Abra a URL local fornecida no seu terminal (por exemplo, http://localhost:8000) no seu navegador.
3. Na janela de chat, insira seu tópico de estudo e o número de semanas que deseja estudar (por exemplo, "certificação AI-900, 8 semanas").
4. O app responderá com um plano de estudo semana a semana, incluindo links para a documentação relevante da Microsoft Learn.

**Variáveis de Ambiente Necessárias:**

Para utilizar o Cenário 2 (o app web Chainlit com Azure OpenAI), você deve configurar as seguintes variáveis de ambiente em um arquivo `.env` no diretório `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Preencha esses valores com os detalhes do seu recurso Azure OpenAI antes de executar o app.

> [!TIP]
> Você pode facilmente implantar seus próprios modelos usando o [Microsoft Foundry](https://ai.azure.com/).

### Cenário 3: Documentação no Editor com Servidor MCP no VS Code

Em vez de alternar entre abas do navegador para buscar documentação, você pode trazer o Microsoft Learn Docs diretamente para seu VS Code usando o servidor MCP. Isso permite que você:
- Pesquise e leia a documentação dentro do VS Code sem sair do seu ambiente de codificação.
- Referencie a documentação e insira links diretamente em seus arquivos README ou cursos.
- Use o GitHub Copilot e MCP juntos para um fluxo de trabalho de documentação com inteligência artificial integrado.

**Exemplos de Uso:**
- Adicione links de referência rapidamente a um README enquanto escreve a documentação de um curso ou projeto.
- Use o Copilot para gerar código e o MCP para encontrar e citar documentos relevantes instantaneamente.
- Mantenha o foco no seu editor e aumente a produtividade.

> [!IMPORTANT]
> Certifique-se de ter uma configuração válida [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) no seu espaço de trabalho (localizado em `.vscode/mcp.json`).

## Por que Chainlit para o Cenário 2?

Chainlit é um framework moderno e open-source para construir aplicações web conversacionais. Ele facilita a criação de interfaces de chat que se conectam a serviços backend como o servidor Microsoft Learn Docs MCP. Este projeto usa Chainlit para fornecer uma maneira simples e interativa de gerar planos de estudo personalizados em tempo real. Aproveitando o Chainlit, você pode construir e implantar rapidamente ferramentas baseadas em chat que aumentam a produtividade e o aprendizado.

## O Que Isso Faz

Este app permite que usuários criem um plano de estudo personalizado simplesmente inserindo um tópico e uma duração. O app interpreta sua entrada, consulta o servidor Microsoft Learn Docs MCP por conteúdo relevante e organiza os resultados em um plano estruturado, semana a semana. As recomendações de cada semana são exibidas no chat, facilitando o acompanhamento e o progresso. A integração garante que você sempre tenha os recursos de aprendizado mais recentes e relevantes.

## Exemplos de Consultas

Experimente estas consultas na janela de chat para ver como o app responde:

- `certificação AI-900, 8 semanas`
- `Aprender Azure Functions, 4 semanas`
- `Azure DevOps, 6 semanas`
- `Engenharia de dados no Azure, 10 semanas`
- `Fundamentos de segurança Microsoft, 5 semanas`
- `Power Platform, 7 semanas`
- `Serviços de IA no Azure, 12 semanas`
- `Arquitetura de nuvem, 9 semanas`

Estes exemplos demonstram a flexibilidade do app para diferentes objetivos de aprendizado e prazos.

## Referências

- [Documentação do Chainlit](https://docs.chainlit.io/)
- [Documentação MCP](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->