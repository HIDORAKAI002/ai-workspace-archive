# Depuração com MCP Inspector

O **MCP Inspector** é uma ferramenta essencial de depuração que permite testar e solucionar problemas interativamente em seus servidores MCP sem a necessidade de um aplicativo host de IA completo. Pense nele como o "Postman para MCP" - ele fornece uma interface visual para enviar solicitações, visualizar respostas e entender como seu servidor se comporta.

## Por que Usar o MCP Inspector?

Ao desenvolver servidores MCP, você frequentemente enfrentará esses desafios:

- **"Meu servidor está realmente rodando?"** - O Inspector mostra o status da conexão
- **"Minhas ferramentas estão registradas corretamente?"** - O Inspector lista todas as ferramentas disponíveis
- **"Qual é o formato da resposta?"** - O Inspector exibe as respostas JSON completas
- **"Por que esta ferramenta não está funcionando?"** - O Inspector mostra mensagens de erro detalhadas

## Pré-requisitos

- Node.js 18+ instalado
- npm (vem com o Node.js)
- Um servidor MCP para testar (veja [Módulo 3.1 - Primeiro Servidor](../01-first-server/README.md))

## Instalação

### Opção 1: Rodar com npx (Recomendado para Testes Rápidos)

```bash
npx @modelcontextprotocol/inspector
```

### Opção 2: Instalar Globalmente

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Opção 3: Adicionar ao Seu Projeto

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Adicione ao `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Conectando-se ao Seu Servidor

### Servidores stdio (Processo Local)

Para servidores que se comunicam via entrada/saída padrão:

```bash
# Servidor Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Servidor Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# Com variáveis de ambiente
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### Servidores SSE/HTTP (Rede)

Para servidores rodando como serviços HTTP:

1. Inicie seu servidor primeiro:
   ```bash
   python server.py  # Servidor rodando em http://localhost:8080
   ```

2. Lance o Inspector e conecte-se:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Visão Geral da Interface do Inspector

Quando o Inspector é iniciado, você verá uma interface web (normalmente em `http://localhost:5173`):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Testando Ferramentas

### Listando Ferramentas Disponíveis

1. Clique na aba **Ferramentas**
2. O Inspector chama automaticamente `tools/list`
3. Você verá todas as ferramentas registradas com:
   - Nome da ferramenta
   - Descrição
   - Esquema de entrada (parâmetros)

### Invocando uma Ferramenta

1. Selecione uma ferramenta da lista
2. Preencha os parâmetros necessários no formulário
3. Clique em **Executar Ferramenta**
4. Veja a resposta no painel de resultados

**Exemplo: Testando uma ferramenta de calculadora**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### Depurando Erros de Ferramentas

Quando uma ferramenta falha, o Inspector mostra:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Códigos de erro comuns:
| Código | Significado |
|------|---------|
| -32700 | Erro de análise (JSON inválido) |
| -32600 | Requisição inválida |
| -32601 | Método não encontrado |
| -32602 | Parâmetros inválidos |
| -32603 | Erro interno |

---

## Testando Recursos

### Listando Recursos

1. Clique na aba **Recursos**
2. O Inspector chama `resources/list`
3. Você verá:
   - URIs dos recursos
   - Nomes e descrições
   - Tipos MIME

### Lendo um Recurso

1. Selecione um recurso
2. Clique em **Ler Recurso**
3. Veja o conteúdo retornado

**Exemplo de saída:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## Testando Prompts

### Listando Prompts

1. Clique na aba **Prompts**
2. O Inspector chama `prompts/list`
3. Visualize os templates de prompt disponíveis

### Obtendo um Prompt

1. Selecione um prompt
2. Preencha quaisquer argumentos necessários
3. Clique em **Obter Prompt**
4. Veja as mensagens de prompt renderizadas

---

## Análise do Registro de Mensagens

O registro de mensagens mostra todas as mensagens do protocolo MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### O Que Observar

- **Pares Requisição/Resposta**: Cada `→` deve ter um `←` correspondente
- **Mensagens de erro**: Procure por `"error"` nas respostas
- **Temporização**: Grandes intervalos podem indicar problemas de desempenho
- **Versão do protocolo**: Confirme que servidor e cliente concordam na versão

---

## Integração com VS Code

Você pode rodar o Inspector diretamente do VS Code:

### Usando launch.json

Adicione em `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### Usando Tasks

Adicione em `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## Cenários Comuns de Depuração

### Cenário 1: Servidor Não Conecta

**Sintomas:** Inspector mostra "Desconectado" ou trava em "Conectando..."

**Checklist:**
1. ✅ O comando do servidor está correto?
2. ✅ Todas as dependências estão instaladas?
3. ✅ O caminho do servidor é absoluto ou relativo ao diretório atual?
4. ✅ Variáveis de ambiente necessárias estão definidas?

**Passos para depurar:**
```bash
# Teste o servidor manualmente primeiro
python -c "import your_server_module; print('OK')"

# Verifique se há erros de importação
python -m your_server_module 2>&1 | head -20

# Verifique se o MCP SDK está instalado
pip show mcp
```

### Cenário 2: Ferramentas Não Aparecem

**Sintomas:** Aba de ferramentas exibe lista vazia

**Causas possíveis:**
1. Ferramentas não registradas durante a inicialização do servidor
2. Servidor travou após iniciar
3. Manipulador `tools/list` retorna array vazio

**Passos para depurar:**
1. Verifique o registro de mensagens para a resposta `tools/list`
2. Adicione logs no código de registro das ferramentas
3. Verifique se decoradores `@mcp.tool()` estão presentes (Python)

### Cenário 3: Ferramenta Retorna Erro

**Sintomas:** Chamada da ferramenta retorna resposta de erro

**Abordagem de depuração:**
1. Leia cuidadosamente a mensagem de erro
2. Verifique se os tipos de parâmetros correspondem ao esquema
3. Adicione try/catch com mensagens detalhadas de erro
4. Verifique logs do servidor para rastreamentos de pilha

**Exemplo de tratamento de erro melhorado:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Lógica da ferramenta aqui
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Cenário 4: Conteúdo do Recurso Vazio

**Sintomas:** Recurso retorna, mas o conteúdo está vazio ou nulo

**Checklist:**
1. ✅ Caminho do arquivo ou URI está correto
2. ✅ O servidor tem permissão para ler o recurso
3. ✅ O conteúdo do recurso está sendo retornado corretamente

---

## Recursos Avançados do Inspector

### Cabeçalhos Personalizados (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Registro Verbose

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Gravação de Sessões

O Inspector pode exportar registros de mensagens para análises futuras:
1. Clique em **Exportar Registro** no painel de mensagens
2. Salve o arquivo JSON
3. Compartilhe com membros da equipe para depuração

---

## Melhores Práticas

1. **Teste cedo e frequentemente** - Use o Inspector durante o desenvolvimento, não só quando algo quebrar
2. **Comece simples** - Teste a conectividade básica antes de chamadas complexas de ferramentas
3. **Cheque o esquema** - Muitos erros vêm de incompatibilidade de tipos de parâmetro
4. **Leia as mensagens de erro** - Erros MCP geralmente são descritivos
5. **Mantenha o Inspector aberto** - Ele ajuda a identificar problemas enquanto você desenvolve

---

## O Que Vem a Seguir

Você completou o Módulo 3: Começando! Continue seu aprendizado:

- [Módulo 4: Implementação Prática](../../04-PracticalImplementation/README.md)

---

## Recursos Adicionais

- [Repositório MCP Inspector no GitHub](https://github.com/modelcontextprotocol/inspector)
- [Especificação MCP - Mensagens do Protocolo](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Especificação JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional realizada por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações errôneas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->