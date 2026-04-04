# Estudo de Caso: Expor REST API no Azure API Management como um servidor MCP

O Azure API Management é um serviço que fornece uma Gateway por cima dos seus Endpoints de API. O funcionamento é que o Azure API Management atua como um proxy à frente das suas APIs e pode decidir o que fazer com os pedidos recebidos.

Ao usá-lo, adiciona uma série de funcionalidades como:

- **Segurança**, pode utilizar tudo desde chaves de API, JWT a identidade gerida.
- **Limitador de taxa**, uma ótima funcionalidade é poder decidir quantas chamadas passam por unidade de tempo. Isto ajuda a garantir que todos os utilizadores têm uma boa experiência e também que o seu serviço não fica sobrecarregado com pedidos.
- **Escalabilidade & balanceamento de carga**. Pode configurar vários endpoints para distribuir a carga e também pode decidir como "balancear a carga".
- **Funcionalidades de IA como cache semântico**, limite de tokens e monitorização de tokens e mais. Estas são funcionalidades excelentes que melhoram a reatividade e ajudam-no a controlar o consumo de tokens. [Leia mais aqui](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Porque MCP + Azure API Management?

O Model Context Protocol está rapidamente a tornar-se um standard para apps AI agentes e para expor ferramentas e dados de forma consistente. Azure API Management é uma escolha natural quando precisa de "gerir" APIs. Servidores MCP frequentemente integram com outras APIs para resolver pedidos a uma ferramenta, por exemplo. Portanto, combinar Azure API Management com MCP faz muito sentido.

## Visão Geral

Neste caso específico vamos aprender a expor endpoints API como um Servidor MCP. Ao fazer isto, podemos facilmente tornar estes endpoints parte de uma app agent e ao mesmo tempo aproveitar as funcionalidades do Azure API Management.

## Funcionalidades Chave

- Seleciona os métodos do endpoint que quer expor como ferramentas.
- As funcionalidades adicionais dependem do que configurar na secção de políticas para a sua API. Mas aqui mostramos como pode adicionar limitador de taxa.

## Passo prévio: importar uma API

Se já tem uma API no Azure API Management, ótimo, pode ignorar este passo. Caso contrário, veja este link, [importar uma API para Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Expor API como Servidor MCP

Para expor os endpoints API, siga estes passos:

1. Navegue até ao Azure Portal e depois ao endereço <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
Navegue até à sua instância de API Management.

1. No menu da esquerda, selecione APIs > MCP Servers > + Criar novo MCP Server.

1. Em API, selecione uma REST API para expor como servidor MCP.

1. Selecione uma ou mais operações API para expor como ferramentas. Pode selecionar todas as operações ou apenas operações específicas.

    ![Selecione métodos para expor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Selecione **Criar**.

1. Navegue para a opção de menu **APIs** e depois **MCP Servers**, deverá ver o seguinte:

    ![Veja o Servidor MCP no painel principal](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    O servidor MCP está criado e as operações API estão expostas como ferramentas. O servidor MCP está listado no painel MCP Servers. A coluna URL mostra o endpoint do servidor MCP que pode chamar para testes ou numa aplicação cliente.

## Opcional: Configurar políticas

O Azure API Management tem o conceito base de políticas onde pode definir regras diferentes para os seus endpoints como por exemplo limitador de taxa ou cache semântico. Estas políticas são configuradas em XML.

Veja como pode definir uma política para limitar taxa no seu Servidor MCP:

1. No portal, em APIs, selecione **MCP Servers**.

1. Selecione o servidor MCP que criou.

1. No menu da esquerda, em MCP, selecione **Policies**.

1. No editor de políticas, adicione ou edite as políticas que quer aplicar às ferramentas do servidor MCP. As políticas são definidas em formato XML. Por exemplo, pode adicionar uma política para limitar as chamadas às ferramentas do servidor MCP (neste exemplo, 5 chamadas por 30 segundos por endereço IP cliente). Este é o XML que limita a taxa:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Aqui está uma imagem do editor de políticas:

    ![Editor de políticas](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Experimente

Vamos garantir que o nosso Servidor MCP funciona como previsto.

Para isto, vamos usar Visual Studio Code e GitHub Copilot no modo Agent. Vamos adicionar o servidor MCP a um *mcp.json*. Dessa forma, o Visual Studio Code atuará como cliente com capacidades agent e os utilizadores finais poderão escrever um prompt e interagir com esse servidor.

Vamos ver como, para adicionar o servidor MCP no Visual Studio Code:

1. Use o comando MCP: **Add Server a partir da Command Palette**.

1. Quando for solicitado, selecione o tipo de servidor: **HTTP (HTTP ou Server Sent Events)**.

1. Introduza o URL do servidor MCP no API Management. Exemplo: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (para endpoint SSE) ou **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (para endpoint MCP), note que a diferença entre os transportes é `/sse` ou `/mcp`.

1. Introduza um ID de servidor à sua escolha. Este valor não é importante mas ajuda a lembrar qual é esta instância do servidor.

1. Selecione se quer guardar a configuração nas definições do workspace ou nas definições de utilizador.

  - **Definições do workspace** - A configuração do servidor é guardada num ficheiro .vscode/mcp.json disponível apenas no workspace atual.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    ou se escolher HTTP streaming como transporte seria ligeiramente diferente:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Definições de utilizador** - A configuração do servidor é adicionada ao seu ficheiro global *settings.json* e está disponível em todos os workspaces. A configuração parece-se com o seguinte:

    ![Definição de utilizador](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Também precisa de adicionar configuração, um header para garantir autenticação adequada com o Azure API Management. Usa um header chamado **Ocp-Apim-Subscription-Key**.

    - Aqui está como pode adicioná-lo às definições:

    ![Adicionar header para autenticação](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), isto fará com que apareça um prompt para pedir o valor da chave API, que pode encontrar no Azure Portal na sua instância de Azure API Management.

   - Para adicionar ao *mcp.json* em vez disso, pode adicioná-lo assim:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Usar modo Agent

Agora estamos todos configurados, quer nas definições quer em *.vscode/mcp.json*. Vamos experimentar.

Deve existir um ícone de Ferramentas assim, onde as ferramentas expostas do seu servidor estão listadas:

![Ferramentas do servidor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Clique no ícone de ferramentas e deve ver uma lista de ferramentas assim:

    ![Ferramentas](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Escreva um prompt na conversa para invocar a ferramenta. Por exemplo, se selecionou uma ferramenta para obter informação sobre um pedido, pode perguntar ao agente sobre um pedido. Eis um exemplo de prompt:

    ```text
    get information from order 2
    ```

    Será agora apresentado com um ícone de ferramentas para prosseguir a chamada a uma ferramenta. Selecione para continuar a executar a ferramenta, agora deverá ver uma saída assim:

    ![Resultado do prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **o que vê acima depende das ferramentas que configurou, mas a ideia é que obtenha uma resposta textual como acima**


## Referências

Aqui está como pode aprender mais:

- [Tutorial sobre Azure API Management e MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Exemplo Python: Servidores MCP remotos seguros usando Azure API Management (experimental)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Laboratório de autorização de cliente MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Use a extensão Azure API Management para VS Code para importar e gerir APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registar e descobrir servidores MCP remotos no Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Excelente repositório que mostra várias capacidades de IA com Azure API Management
- [Workshops AI Gateway](https://azure-samples.github.io/AI-Gateway/) Contém workshops usando o Azure Portal, que é uma ótima forma de começar a avaliar capacidades de IA.

## O que vem a seguir

- Voltar para: [Visão Geral dos Estudos de Caso](./README.md)
- Seguinte: [Agentes de Viagem Azure AI](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, por favor, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte oficial. Para informações críticas, recomenda-se a tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações erradas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->