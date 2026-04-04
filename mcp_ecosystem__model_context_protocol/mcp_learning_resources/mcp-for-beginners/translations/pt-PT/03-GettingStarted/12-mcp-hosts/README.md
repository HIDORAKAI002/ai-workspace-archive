# Configuração dos Clientes MCP Host Populares

Este guia explica como configurar e utilizar servidores MCP com aplicações host de IA populares. Cada host tem a sua própria abordagem de configuração, mas uma vez configurados, todos comunicam com servidores MCP usando o protocolo padronizado.

## O que é um MCP Host?

Um **MCP Host** é uma aplicação de IA que pode conectar-se a servidores MCP para expandir as suas capacidades. Pense nele como a "interface" com que os utilizadores interagem, enquanto os servidores MCP fornecem as ferramentas e dados do "back end".

```mermaid
flowchart LR
    User[👤 Utilizador] --> Host[🖥️ Host MCP]
    Host --> S1[Servidor MCP A]
    Host --> S2[Servidor MCP B]
    Host --> S3[Servidor MCP C]
    
    subgraph "Hosts Populares"
        H1[Claude Ambiente de Trabalho]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Pré-requisitos

- Um servidor MCP para ligar (ver [Módulo 3.1 - Primeiro Servidor](../01-first-server/README.md))
- A aplicação host instalada no seu sistema
- Familiaridade básica com ficheiros de configuração JSON

---

## 1. Claude Desktop

**Claude Desktop** é a aplicação oficial de ambiente de trabalho da Anthropic que suporta nativamente MCP.

### Instalação

1. Descarregue o Claude Desktop em [claude.ai/download](https://claude.ai/download)
2. Instale e inicie sessão com a sua conta Anthropic

### Configuração

O Claude Desktop utiliza um ficheiro de configuração JSON para definir os servidores MCP.

**Localização do ficheiro de configuração:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Exemplo de configuração:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Opções de Configuração

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `command` | O executável a executar | `"python"`, `"node"`, `"npx"` |
| `args` | Argumentos da linha de comandos | `["-m", "my_server"]` |
| `env` | Variáveis de ambiente | `{"API_KEY": "xxx"}` |
| `cwd` | Diretório de trabalho | `"/path/to/server"` |

### Testar a sua configuração

1. Guarde o ficheiro de configuração
2. Reinicie completamente o Claude Desktop (feche e abra novamente)
3. Abra uma nova conversa
4. Verifique o ícone 🔌 indicando servidores conectados
5. Tente pedir ao Claude para usar uma das suas ferramentas

### Resolução de problemas no Claude Desktop

**Servidor não aparece:**
- Verifique a sintaxe do ficheiro de configuração com um validador JSON
- Assegure que o caminho do comando está correto
- Verifique os logs do Claude Desktop: Ajuda → Mostrar Logs

**Servidor falha ao iniciar:**
- Teste o seu servidor manualmente no terminal primeiro
- Verifique se as variáveis de ambiente estão corretamente definidas
- Assegure que todas as dependências estão instaladas

---

## 2. VS Code com GitHub Copilot

O VS Code suporta MCP através das extensões GitHub Copilot Chat.

### Pré-requisitos

1. VS Code 1.99+ instalado
2. Extensão GitHub Copilot instalada
3. Extensão GitHub Copilot Chat instalada

### Configuração

O VS Code usa `.vscode/mcp.json` no seu espaço de trabalho ou configurações de utilizador.

**Configuração de espaço de trabalho** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**Configuração do utilizador** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### Utilizar MCP no VS Code

1. Abra o painel Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Digite `@` para ver as ferramentas MCP disponíveis
3. Utilize linguagem natural para invocar ferramentas: "Calcular 25 * 48 usando a calculadora"

### Resolução de problemas no VS Code

**Servidores MCP não carregam:**
- Verifique o painel de Output → "MCP" para logs de erro
- Recarregue a janela: Ctrl+Shift+P → "Developer: Reload Window"
- Verifique se o servidor funciona normalmente standalone primeiro

---

## 3. Cursor

**Cursor** é um editor de código com IA com suporte integrado para MCP.

### Instalação

1. Descarregue o Cursor em [cursor.sh](https://cursor.sh)
2. Instale e inicie sessão

### Configuração

O Cursor utiliza um formato de configuração semelhante ao Claude Desktop.

**Localização do ficheiro de configuração:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Exemplo de configuração:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Utilizar MCP no Cursor

1. Abra o chat IA do Cursor (Ctrl+L / Cmd+L)
2. As ferramentas MCP aparecem automaticamente nas sugestões
3. Peça à IA para executar tarefas usando os servidores conectados

---

## 4. Cline (Baseado em Terminal)

**Cline** é um cliente MCP baseado em terminal, ideal para fluxos de trabalho em linha de comandos.

### Instalação

```bash
npm install -g @anthropic/cline
```

### Configuração

O Cline usa variáveis de ambiente e argumentos de linha de comandos.

**Usando variáveis de ambiente:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Usando argumentos de linha de comandos:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Ficheiro de configuração** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Utilizar o Cline

```bash
# Iniciar uma sessão interativa
cline

# Consulta única com MCP
cline "Calculate the square root of 144 using the calculator"

# Listar ferramentas disponíveis
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** é outro editor de código com suporte MCP alimentado por IA.

### Instalação

1. Descarregue o Windsurf em [codeium.com/windsurf](https://codeium.com/windsurf)
2. Instale e crie uma conta

### Configuração

A configuração do Windsurf é gerida através da interface de definições:

1. Abra as Definições (Ctrl+, / Cmd+,)
2. Pesquise por "MCP"
3. Clique em "Editar em settings.json"

**Exemplo de configuração:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## Comparação dos Tipos de Transporte

Diferentes hosts suportam diferentes mecanismos de transporte:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (entrada/saída standard): Melhor para servidores locais iniciados pelo host  
**SSE/HTTP**: Melhor para servidores remotos ou servidores partilhados entre vários clientes

---

## Resolução de Problemas Comuns

### O servidor não inicia

1. **Teste o servidor manualmente primeiro:**  
   ```bash
   # Para Python
   python -m your_server_module
   
   # Para Node.js
   node /path/to/server/index.js
   ```

2. **Verifique o caminho do comando:**  
   - Use caminhos absolutos sempre que possível  
   - Assegure que o executável está no seu PATH

3. **Verifique as dependências:**  
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### O servidor conecta mas as ferramentas não funcionam

1. **Verificar logs do servidor** - A maioria dos hosts tem opções de logging  
2. **Verificar o registo das ferramentas** - Use o MCP Inspector para testar  
3. **Verificar permissões** - Algumas ferramentas precisam de acesso a ficheiros/rede

### Variáveis de ambiente não são passadas

- Alguns hosts sanitizam as variáveis de ambiente  
- Use explicitamente o campo `env` na configuração  
- Evite colocar dados sensíveis nos ficheiros de configuração (use gestão de segredos)

---

## Boas Práticas de Segurança

1. **Nunca faça commit de chaves API** nos ficheiros de configuração  
2. **Use variáveis de ambiente** para dados sensíveis  
3. **Limite as permissões do servidor** ao mínimo necessário  
4. **Revise o código do servidor** antes de conceder acesso ao seu sistema  
5. **Use listas permissivas** para acesso a ficheiros e rede

---

## O que vem a seguir

- [3.13 - Depuração com MCP Inspector](../13-mcp-inspector/README.md)  
- [3.1 - Crie o seu primeiro servidor MCP](../01-first-server/README.md)  
- [Módulo 5 - Tópicos Avançados](../../05-AdvancedTopics/README.md)

---

## Recursos Adicionais

- [Documentação MCP do Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [Extensão MCP para VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [Especificação MCP - Transportes](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [Registo Oficial de Servidores MCP](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos por garantir a precisão, por favor tenha em conta que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional feita por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações erradas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->