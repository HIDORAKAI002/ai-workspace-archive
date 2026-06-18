# AGENTS.md

## Visão Geral do Projeto

**MCP para Iniciantes** é um currículo educativo de código aberto para aprender o Model Context Protocol (MCP) - uma estrutura padronizada para interações entre modelos de IA e aplicações cliente. Este repositório fornece materiais de aprendizagem abrangentes com exemplos práticos de código em várias linguagens de programação.

### Tecnologias Principais

- **Linguagens de Programação**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworks & SDKs**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Bases de Dados**: PostgreSQL com extensão pgvector
- **Plataformas Cloud**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Ferramentas de Build**: npm, Maven, pip, Cargo
- **Documentação**: Markdown com tradução automática multilíngue (48+ línguas)

### Arquitetura

- **11 Módulos Centrais (00-11)**: Trajeto de aprendizagem sequencial desde fundamentos a tópicos avançados
- **Laboratórios Práticos**: Exercícios práticos com código de solução completo em várias linguagens
- **Projetos de Exemplo**: Implementações de servidores e clientes MCP funcionais
- **Sistema de Tradução**: Workflow automatizado GitHub Actions para suporte multilíngue
- **Recursos Gráficos**: Diretório centralizado de imagens com versões traduzidas

## Comandos de Configuração

Este é um repositório focado em documentação. A maior parte da configuração ocorre dentro dos projetos de exemplo e laboratórios individuais.

### Configuração do Repositório

```bash
# Clone o repositório
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Trabalhar com Projetos de Exemplo

Os projetos de exemplo estão localizados em:
- `03-GettingStarted/samples/` - Exemplos específicos por linguagem
- `03-GettingStarted/01-first-server/solution/` - Implementações do primeiro servidor
- `03-GettingStarted/02-client/solution/` - Implementações do cliente
- `11-MCPServerHandsOnLabs/` - Laboratórios abrangentes de integração com base de dados

Cada projeto de exemplo contém as suas próprias instruções de configuração:

#### Projetos TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Projetos Python
```bash
cd <project-directory>
pip install -r requirements.txt
# ou
pip install -e .
python main.py
```

#### Projetos Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Fluxo de Desenvolvimento

### Estrutura da Documentação

- **Módulos 00-11**: Conteúdo central do currículo em ordem sequencial
- **translations/**: Versões específicas por língua (geradas automaticamente, não editar diretamente)
- **translated_images/**: Versões localizadas das imagens (geradas automaticamente)
- **images/**: Imagens e diagramas-fonte

### Realizar Alterações na Documentação

1. Edite apenas os ficheiros markdown em inglês nas diretórias principais dos módulos (00-11)
2. Atualize imagens na diretória `images/` se necessário
3. O GitHub Action co-op-translator gera automaticamente as traduções
4. As traduções são regeneradas quando se realiza push para a branch main

### Trabalhar com Traduções

- **Tradução Automatizada**: Workflow GitHub Actions gere todas as traduções
- **Não EDITE manualmente** ficheiros na diretória `translations/`
- Metadados de tradução estão embutidos em cada ficheiro traduzido
- Línguas suportadas: 48+ línguas incluindo Árabe, Chinês, Francês, Alemão, Hindi, Japonês, Coreano, Português, Russo, Espanhol, entre outras

## Instruções para Testes

### Validação da Documentação

Como este é principalmente um repositório de documentação, o foco dos testes é:

1. **Validação de Links**: Garantir que todos os links internos funcionam
```bash
# Verificar links markdown quebrados
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validação de Exemplos de Código**: Testar que os exemplos de código compilam/executam
```bash
# Navegar para uma amostra específica e executar os seus testes
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Linting Markdown**: Verificar consistência da formatação
```bash
# Use markdownlint se necessário
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testes em Projetos de Exemplo

Cada exemplo específico por linguagem inclui a sua própria abordagem de teste:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Diretrizes de Estilo de Código

### Estilo de Documentação

- Utilize linguagem clara e acessível para iniciantes
- Inclua exemplos de código em várias linguagens onde aplicável
- Siga boas práticas em markdown:
  - Use cabeçalhos estilo ATX (`#` syntax)
  - Use blocos de código delimitados com identificadores de linguagem
  - Inclua texto alternativo descritivo para imagens
  - Mantenha o comprimento das linhas razoável (sem limite rígido, mas sensato)

### Estilo dos Exemplos de Código

#### TypeScript/JavaScript
- Use módulos ES (`import`/`export`)
- Siga as convenções do modo estrito do TypeScript
- Inclua anotações de tipo
- Target ES2022

#### Python
- Siga as diretrizes de estilo PEP 8
- Use anotações de tipo quando apropriado
- Inclua docstrings para funções e classes
- Utilize funcionalidades modernas do Python (3.8+)

#### Java
- Siga as convenções do Spring Boot
- Use funcionalidades do Java 21
- Siga a estrutura padrão de projetos Maven
- Inclua comentários Javadoc

### Organização dos Ficheiros

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Construção e Deployment

### Deploy da Documentação

O repositório utiliza GitHub Pages ou similar para alojamento da documentação (se aplicável). Alterações na branch main disparam:

1. Workflow de tradução (`.github/workflows/co-op-translator.yml`)
2. Tradução automática de todos os ficheiros markdown em inglês
3. Localização de imagens conforme necessário

### Nenhum Processo de Build Necessário

Este repositório contém principalmente documentação markdown. Não é necessário nenhum passo de compilação ou build para o conteúdo central do currículo.

### Deployment de Projetos de Exemplo

Projetos de exemplo individuais podem ter instruções de deployment:
- Ver `03-GettingStarted/09-deployment/` para orientação sobre deployment do servidor MCP
- Exemplos de deployment em Azure Container Apps em `11-MCPServerHandsOnLabs/`

## Diretrizes para Contribuições

### Processo de Pull Request

1. **Fork e Clone**: Faça fork do repositório e clone localmente o seu fork
2. **Criar Branch**: Use nomes descritivos para a branch (ex.: `fix/typo-module-3`, `add/python-example`)
3. **Fazer Alterações**: Edite apenas ficheiros markdown em inglês (não traduções)
4. **Testar Localmente**: Verifique se o markdown é renderizado corretamente
5. **Submeter PR**: Use títulos e descrições claras no PR
6. **CLA**: Assine a Microsoft Contributor License Agreement quando solicitado

### Formato dos Títulos dos PR

Use títulos claros e descritivos:
- `[Module XX] Breve descrição` para mudanças específicas de módulo
- `[Samples] Descrição` para alterações em exemplos de código
- `[Docs] Descrição` para atualizações gerais na documentação

### O Que Contribuir

- Correções de bugs na documentação ou exemplos de código
- Novos exemplos de código em línguas adicionais
- Esclarecimentos e melhorias no conteúdo existente
- Novos estudos de caso ou exemplos práticos
- Relatórios de issues para conteúdo incorreto ou pouco claro

### O Que NÃO Fazer

- Não edite diretamente ficheiros na diretória `translations/`
- Não edite a diretória `translated_images/`
- Não adicione ficheiros binários grandes sem prévia discussão
- Não altere ficheiros do workflow de tradução sem coordenação

## Notas Adicionais

### Manutenção do Repositório

- **Changelog**: Todas as alterações significativas estão documentadas em `changelog.md`
- **Guia de Estudo**: Use `study_guide.md` para uma visão geral da navegação do currículo
- **Templates de Issues**: Use os templates GitHub para reportar bugs e pedidos de funcionalidades
- **Código de Conduta**: Todos os colaboradores devem seguir o Microsoft Open Source Code of Conduct

### Trajeto de Aprendizagem

Siga os módulos em ordem sequencial (00-11) para melhor aprendizagem:
1. **00-02**: Fundamentos (Introdução, Conceitos Centrais, Segurança)
2. **03**: Início prático com implementação hands-on
3. **04-05**: Implementação prática e tópicos avançados
4. **06-10**: Comunidade, boas práticas e aplicações reais
5. **11**: Laboratórios completos de integração com base de dados (13 laboratórios sequenciais)

### Recursos de Suporte

- **Documentação**: https://modelcontextprotocol.io/
- **Especificação**: https://spec.modelcontextprotocol.io/
- **Comunidade**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Servidor Discord Microsoft Foundry
- **Cursos Relacionados**: Ver README.md para outras trilhas de aprendizagem Microsoft

### Problemas Comuns

**Q: O meu PR está a falhar no teste de tradução**  
A: Certifique-se de que editou apenas ficheiros markdown em inglês nas diretórias principais dos módulos, não as versões traduzidas.

**Q: Como adiciono uma nova língua?**  
A: O suporte a línguas é gerido pelo workflow co-op-translator. Abra uma issue para discutir a adição de novas línguas.

**Q: Os exemplos de código não funcionam**  
A: Verifique se seguiu as instruções de configuração no README do exemplo específico. Confirme que tem as versões corretas das dependências instaladas.

**Q: As imagens não aparecem**  
A: Verifique se os caminhos das imagens são relativos e usam barras normais. As imagens devem estar na diretória `images/` ou em `translated_images/` para versões localizadas.

### Considerações sobre Performance

- O workflow de tradução pode levar alguns minutos a completar
- Imagens grandes devem ser otimizadas antes de commits
- Mantenha ficheiros markdown focados e com tamanho razoável
- Use links relativos para melhor portabilidade

### Governação do Projeto

Este projeto segue as práticas open source da Microsoft:  
- Licença MIT para código e documentação  
- Microsoft Open Source Code of Conduct  
- CLA requerida para contribuições  
- Questões de segurança: Siga diretrizes do SECURITY.md  
- Suporte: Veja SUPPORT.md para recursos de ajuda

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->