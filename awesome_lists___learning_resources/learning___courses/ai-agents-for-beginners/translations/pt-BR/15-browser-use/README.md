# Construindo Agentes de Uso de Computador (CUA)

Agentes de uso de computador podem interagir com sites da mesma forma que uma pessoa: abrindo um navegador, inspecionando a página e tomando a melhor ação seguinte com base no que veem. Nesta lição, você construirá um agente de automação de navegador que pesquisa no Airbnb, extrai dados estruturados de anúncios e identifica a estadia mais barata em Estocolmo.

A lição combina Browser-Use para navegação guiada por IA, Playwright e Chrome DevTools Protocol (CDP) para controle do navegador, Azure OpenAI para raciocínio habilitado por visão, e Pydantic para extração estruturada.

## Introdução

Esta lição abordará:

- Entender quando agentes de uso de computador são mais adequados do que automação apenas via API
- Combinar Browser-Use com Playwright e CDP para gerenciamento confiável do ciclo de vida do navegador
- Usar Azure OpenAI vision e saída estruturada Pydantic para extrair dados de anúncios de páginas web dinâmicas
- Decidir quando usar um fluxo de trabalho de automação de navegador centrado em agente, ator ou híbrido

## Objetivos de Aprendizagem

Após completar esta lição, você saberá como:

- Configurar Browser-Use com Azure OpenAI e Playwright
- Construir um fluxo de trabalho de automação de navegador que navega por um site real e lida com elementos dinâmicos da interface
- Extrair resultados tipados do conteúdo visível da página e transformá-los em lógica de negócio a jusante
- Escolher entre os padrões agente e ator baseado na previsibilidade da tarefa no navegador

## Exemplo de Código

Esta lição inclui um tutorial em notebook:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Inicializa uma sessão Chrome via CDP, pesquisa anúncios no Airbnb para Estocolmo, extrai preços com a visão do Browser-Use e retorna a opção mais barata como dados estruturados.

## Pré-requisitos

- Python 3.12+
- Implantação do Azure OpenAI configurada em seu ambiente
- Chrome ou Chromium instalado localmente
- Dependências do Playwright instaladas
- Familiaridade básica com Python assíncrono

## Configuração

Instale os pacotes usados no notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Configure as variáveis de ambiente do Azure OpenAI usadas pelo notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Opcional: padrão para a versão mais recente da API quando omitido
AZURE_OPENAI_API_VERSION=...
```

## Visão Geral da Arquitetura

O notebook demonstra um fluxo de trabalho híbrido de automação de navegador:

1. O Chrome inicia com CDP habilitado para que tanto Playwright quanto Browser-Use possam compartilhar a mesma sessão do navegador.
2. Um agente Browser-Use lida com tarefas de navegação abertas como abrir Airbnb, fechar pop-ups e buscar Estocolmo.
3. A página ativa é inspecionada com um esquema Pydantic estruturado para extrair títulos de anúncios, preços noturnos, avaliações e URLs.
4. A lógica Python compara os anúncios extraídos e destaca o resultado mais barato.

Esta abordagem mantém o raciocínio flexível baseado em visão que o Browser-Use oferece ao mesmo tempo que lhe dá controle determinístico do navegador quando necessário.

## Principais Lições e Boas Práticas

### Quando Usar Agente vs Ator

| Cenário | Usar Agente | Usar Ator |
|----------|-------------|-----------|
| Layouts dinâmicos | Sim, IA pode se adaptar a mudanças de página | Não, seletores frágeis podem quebrar |
| Estrutura conhecida | Não, agente é mais lento que controle direto | Sim, rápido e preciso |
| Encontrar elementos | Sim, linguagem natural funciona bem | Não, seletores exatos são necessários |
| Controle de tempo | Não, menos previsível | Sim, controle total sobre waits e retries |
| Fluxos complexos | Sim, lida com estados inesperados da UI | Não, requer ramificação explícita |

### Boas Práticas do Browser-Use

1. Comece com um agente para exploração e navegação dinâmica.
2. Troque para controle direto da página quando a interação ficar previsível.
3. Use modelos de saída estruturada para que os dados extraídos sejam validados e tipados.
4. Adicione atrasos estrategicamente após ações que disparam mudanças visíveis na UI.
5. Capture capturas de tela enquanto itera para facilitar a depuração de falhas.
6. Espere que sites mudem e projete estratégias de contingência para pop-ups e mudanças no layout.
7. Misture padrões agente e ator para obter tanto flexibilidade quanto precisão.

### Aplicações do Mundo Real

- Reserva de viagens e monitoramento de preços
- Comparação de preços e checagem de disponibilidade em e-commerce
- Extração estruturada de sites dinâmicos
- Testes e verificação de UI habilitados por visão
- Monitoramento de sites e alertas
- Preenchimento inteligente de formulários em fluxos multi-etapas

## Recursos Adicionais

- [Template de integração Browser-Use Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parâmetros do ator Browser-Use e extração de conteúdo](https://docs.browser-use.com/customize/actor/all-parameters)
- [Configuração do Curso](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, por favor, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional realizada por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->