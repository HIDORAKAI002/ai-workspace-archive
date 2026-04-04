# Debugging com MCP Inspector

O **MCP Inspector** é uma ferramenta essencial de debugging que permite testar e resolver problemas dos seus servidores MCP de forma interativa, sem precisar de uma aplicação host de IA completa. Pense nele como o "Postman para MCP" - fornece uma interface visual para enviar pedidos, ver respostas e compreender como o seu servidor se comporta.

## Porque Usar o MCP Inspector?

Ao construir servidores MCP, irá frequentemente encontrar estes desafios:

- **"O meu servidor está sequer a funcionar?"** - O Inspector mostra o estado da ligação
- **"As minhas ferramentas estão registadas corretamente?"** - O Inspector lista todas as ferramentas disponíveis
- **"Qual é o formato da resposta?"** - O Inspector exibe respostas JSON completas
- **"Porque é que esta ferramenta não está a funcionar?"** - O Inspector mostra mensagens de erro detalhadas

## Pré-requisitos

- Node.js 18+ instalado
- npm (vem com o Node.js)
- Um servidor MCP para testar (ver [Módulo 3.1 - Primeiro Servidor](../01-first-server/README.md))

## Instalação

### Opção 1: Executar com npx (Recomendado para Testes Rápidos)

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

Adicionar a `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Ligação ao Seu Servidor

### Servidores stdio (Processo Local)

Para servidores que comunicam via entrada/saída padrão:

```bash
# Servidor Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Servidor Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# Com variáveis de ambiente
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### Servidores SSE/HTTP (Rede)

Para servidores a correr como serviços HTTP:

1. Inicie o seu servidor primeiro:
   ```bash
   python server.py  # Servidor a correr em http://localhost:8080
   ```

2. Lance o Inspector e ligue-se:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Visão Geral da Interface do Inspector

Quando o Inspector inicia, verá uma interface web (tipicamente em `http://localhost:5173`):

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

## Testar Ferramentas

### Listar Ferramentas Disponíveis

1. Clique no separador **Tools**
2. O Inspector chama automaticamente `tools/list`
3. Verá todas as ferramentas registadas com:
   - Nome da ferramenta
   - Descrição
   - Esquema de entrada (parâmetros)

### Invocar uma Ferramenta

1. Selecione uma ferramenta da lista
2. Preencha os parâmetros obrigatórios no formulário
3. Clique em **Run Tool**
4. Veja a resposta no painel de resultados

**Exemplo: Testar uma ferramenta calculadora**

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

### Depurar Erros de Ferramentas

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
|--------|------------|
| -32700 | Erro de parsing (JSON inválido) |
| -32600 | Pedido inválido |
| -32601 | Método não encontrado |
| -32602 | Parâmetros inválidos |
| -32603 | Erro interno |

---

## Testar Recursos

### Listar Recursos

1. Clique no separador **Resources**
2. O Inspector chama `resources/list`
3. Verá:
   - URIs dos recursos
   - Nomes e descrições
   - Tipos MIME

### Ler um Recurso

1. Selecione um recurso
2. Clique em **Read Resource**
3. Veja o conteúdo devolvido

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

## Testar Prompts

### Listar Prompts

1. Clique no separador **Prompts**
2. O Inspector chama `prompts/list`
3. Veja os templates de prompt disponíveis

### Obter um Prompt

1. Selecione um prompt
2. Preencha quaisquer argumentos requeridos
3. Clique em **Get Prompt**
4. Veja as mensagens do prompt renderizadas

---

## Análise do Registo de Mensagens

O registo de mensagens mostra todas as mensagens do protocolo MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### O Que Observar

- **Pares Pedido/Resposta**: Cada `→` deve ter uma correspondente `←`
- **Mensagens de erro**: Procure `"error"` nas respostas
- **Tempos**: Grandes intervalos podem indicar problemas de desempenho
- **Versão do protocolo**: Certifique-se que servidor e cliente concordam na versão

---

## Integração com VS Code

Pode executar o Inspector diretamente do VS Code:

### Usando launch.json

Adicionar a `.vscode/launch.json`:

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

Adicionar a `.vscode/tasks.json`:

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

## Cenários Comuns de Debugging

### Cenário 1: O Servidor Não Liga

**Sintomas:** O Inspector mostra "Disconnected" ou fica preso em "Connecting..."

**Lista de verificação:**
1. ✅ O comando do servidor está correto?
2. ✅ Estão todas as dependências instaladas?
3. ✅ O caminho do servidor é absoluto ou relativo ao diretório atual?
4. ✅ As variáveis de ambiente necessárias estão definidas?

**Passos para debug:**
```bash
# Testar o servidor manualmente primeiro
python -c "import your_server_module; print('OK')"

# Verificar se há erros de importação
python -m your_server_module 2>&1 | head -20

# Verificar se o MCP SDK está instalado
pip show mcp
```

### Cenário 2: Ferramentas Não Aparecem

**Sintomas:** O separador Tools mostra lista vazia

**Possíveis causas:**
1. Ferramentas não registadas durante a inicialização do servidor
2. O servidor caiu após iniciar
3. O handler `tools/list` retorna array vazio

**Passos para debug:**
1. Verifique o registo de mensagens para a resposta a `tools/list`
2. Adicione logging ao código de registo das ferramentas
3. Verifique se os decoradores `@mcp.tool()` estão presentes (Python)

### Cenário 3: A Ferramenta Retorna Erro

**Sintomas:** A chamada da ferramenta retorna resposta de erro

**Abordagem de debug:**
1. Leia a mensagem de erro cuidadosamente
2. Verifique se os tipos dos parâmetros correspondem ao esquema
3. Adicione try/catch com mensagens de erro detalhadas
4. Verifique os logs do servidor para stack traces

**Exemplo de tratamento melhorado de erros:**

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

**Sintomas:** O recurso é devolvido mas o conteúdo está vazio ou nulo

**Lista de verificação:**
1. ✅ O caminho do ficheiro ou URI está correto
2. ✅ O servidor tem permissões para ler o recurso
3. ✅ O conteúdo do recurso está a ser devolvido corretamente

---

## Funcionalidades Avançadas do Inspector

### Cabeçalhos Personalizados (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Log Verboso

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Gravação de Sessões

O Inspector pode exportar registos de mensagens para análise posterior:
1. Clique em **Export Log** no painel de mensagens
2. Guarde o ficheiro JSON
3. Partilhe com a equipa para debugging

---

## Boas Práticas

1. **Teste cedo e frequentemente** - Use o Inspector durante o desenvolvimento, não apenas quando algo falha
2. **Comece simples** - Teste a conectividade básica antes de chamadas complexas de ferramentas
3. **Verifique o esquema** - Muitos erros resultam de incompatibilidade de tipos de parâmetros
4. **Leia as mensagens de erro** - Os erros MCP são normalmente descritivos
5. **Mantenha o Inspector aberto** - Ajuda a identificar problemas enquanto desenvolve

---

## O Que Segue

Concluiu o Módulo 3: Começar! Continue a sua aprendizagem:

- [Módulo 4: Implementação Prática](../../04-PracticalImplementation/README.md)

---

## Recursos Adicionais

- [Repositório GitHub do MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Especificação MCP - Mensagens de Protocolo](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Especificação JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, por favor tenha em conta que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução humana profissional. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->