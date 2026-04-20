# Construir Agentes de Utilização de Computador (CUA)

Os agentes de utilização de computador podem interagir com sites da mesma forma que uma pessoa faria: abrindo um navegador, inspecionando a página e tomando a próxima melhor ação com base no que veem. Nesta lição, irá construir um agente de automação de navegador que pesquisa no Airbnb, extrai dados estruturados das listagens e identifica a estadia mais barata em Estocolmo.

A lição combina Browser-Use para navegação orientada por IA, Playwright e o Protocolo Chrome DevTools (CDP) para controlo do navegador, Azure OpenAI para raciocínio com visão integrada, e Pydantic para extração estruturada.

## Introdução

Esta lição cobrirá:

- Compreender quando os agentes de utilização de computador são mais adequados do que a automação só via API
- Combinar Browser-Use com Playwright e CDP para uma gestão fiável do ciclo de vida do navegador
- Utilizar a visão Azure OpenAI e a saída estruturada Pydantic para extrair dados de listagens de páginas web dinâmicas
- Decidir quando usar um fluxo de trabalho de automação de navegador orientado ao agente, ao ator, ou híbrido

## Objetivos de Aprendizagem

Após concluir esta lição, saberá como:

- Configurar Browser-Use com Azure OpenAI e Playwright
- Construir um fluxo de trabalho de automação de navegador que navega num site real e lida com elementos UI dinâmicos
- Extrair resultados tipados do conteúdo visível da página e transformá-los em lógica de negócio subsequente
- Escolher entre padrões de agente e ator com base na previsibilidade da tarefa no navegador

## Exemplo de Código

Esta lição inclui um tutorial em notebook:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Lança uma sessão Chrome via CDP, pesquisa listagens em Estocolmo no Airbnb, extrai preços com a visão Browser-Use e devolve a opção mais barata como dados estruturados.

## Requisitos

- Python 3.12+
- Implementação Azure OpenAI configurada no seu ambiente
- Chrome ou Chromium instalado localmente
- Dependências do Playwright instaladas
- Familiaridade básica com Python assíncrono

## Configuração

Instale os pacotes usados no notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Defina as variáveis de ambiente Azure OpenAI usadas pelo notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Opcional: utiliza a versão mais recente da API por omissão quando omitido
AZURE_OPENAI_API_VERSION=...
```

## Visão Geral da Arquitetura

O notebook demonstra um fluxo de trabalho híbrido de automação de navegador:

1. O Chrome inicia com CDP ativado para que tanto Playwright como Browser-Use possam partilhar a mesma sessão do navegador.
2. Um agente Browser-Use gere tarefas de navegação abertas como abrir o Airbnb, dispensar pop-ups e pesquisar por Estocolmo.
3. A página ativa é inspecionada com um esquema estruturado Pydantic para extrair títulos das listagens, preços por noite, classificações e URLs.
4. A lógica Python compara as listagens extraídas e destaca a opção mais barata.

Esta abordagem mantém o raciocínio flexível baseado em visão que o Browser-Use domina, ao mesmo tempo que oferece controlo determinístico do navegador quando necessário.

## Principais Lições e Melhores Práticas

### Quando Usar Agente vs Ator

| Cenário | Usar Agente | Usar Ator |
|----------|-------------|-----------|
| Layouts dinâmicos | Sim, IA pode adaptar-se a mudanças na página | Não, seletores frágeis podem falhar |
| Estrutura conhecida | Não, um agente é mais lento do que controlo direto | Sim, rápido e preciso |
| Encontrar elementos | Sim, linguagem natural funciona bem | Não, seletores exatos são necessários |
| Controlo de tempo | Não, menos previsível | Sim, controlo total sobre esperas e tentativas |
| Fluxos de trabalho complexos | Sim, lida com estados UI inesperados | Não, requer ramificações explícitas |

### Melhores Práticas Browser-Use

1. Comece com um agente para exploração e navegação dinâmica.
2. Mude para controlo direto da página quando a interação se tornar previsível.
3. Use modelos de saída estruturada para que os dados extraídos sejam validados e com tipos seguros.
4. Adicione atrasos estrategicamente após ações que desencadeiem alterações visíveis na UI.
5. Capture capturas de ecrã durante iterações para facilitar a depuração de falhas.
6. Espere que os sites mudem e planeie estratégias de fallback para pop-ups e alterações de layout.
7. Combine padrões de agente e ator para obter flexibilidade e precisão.

### Aplicações no Mundo Real

- Reservas de viagens e monitorização de preços
- Comparação de preços em comércio eletrónico e verificação de disponibilidade
- Extração estruturada de websites dinâmicos
- Testes UI conscientes da visão e verificação
- Monitorização e alerta de websites
- Preenchimento inteligente de formulários em fluxos multi-etapa

## Recursos Adicionais

- [Template de integração Browser-Use Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parâmetros do ator Browser-Use e extração de conteúdo](https://docs.browser-use.com/customize/actor/all-parameters)
- [Configuração do Curso](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original, na sua língua nativa, deve ser considerado a fonte oficial. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->