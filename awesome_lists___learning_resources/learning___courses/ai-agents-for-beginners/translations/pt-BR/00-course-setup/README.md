# Configuração do Curso

## Introdução

Esta lição abordará como executar os exemplos de código deste curso.

## Junte-se a Outros Alunos e Obtenha Ajuda

Antes de começar a clonar seu repositório, entre no [canal do Discord AI Agents For Beginners](https://aka.ms/ai-agents/discord) para obter ajuda com a configuração, tirar dúvidas sobre o curso ou para se conectar com outros alunos.

## Clone ou Faça Fork deste Repositório

Para começar, por favor clone ou faça fork do Repositório GitHub. Isso criará sua própria versão do material do curso para que você possa executar, testar e ajustar o código!

Isso pode ser feito clicando no link para <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fazer fork do repositório</a>

Agora você deverá ter sua própria versão forkada deste curso no link abaixo:

![Forked Repo](../../../translated_images/pt-BR/forked-repo.33f27ca1901baa6a.webp)

### Clone Raso (recomendado para workshop / Codespaces)

  >O repositório completo pode ser grande (~3 GB) quando você baixa o histórico completo e todos os arquivos. Se você estiver apenas participando do workshop ou precisar apenas de algumas pastas das lições, um clone raso (ou clone esparso) evita a maior parte desse download truncando o histórico e/ou pulando blobs.

#### Clone raso rápido — histórico mínimo, todos os arquivos

Substitua `<your-username>` nos comandos abaixo pela URL do seu fork (ou pela URL upstream se preferir).

Para clonar apenas o histórico do último commit (download pequeno):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Para clonar um branch específico:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Clone parcial (esparso) — blobs mínimos + apenas pastas selecionadas

Isso usa clone parcial e sparse-checkout (requer Git 2.25+ e recomenda-se Git moderno com suporte a clone parcial):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Entre na pasta do repositório:

```bash|powershell
cd ai-agents-for-beginners
```

Então especifique quais pastas você quer (exemplo abaixo mostra duas pastas):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Após clonar e verificar os arquivos, se você precisar apenas dos arquivos e quiser liberar espaço (sem histórico git), por favor delete os metadados do repositório (💀irreversível — você perderá toda a funcionalidade do Git: sem commits, pulls, pushes ou acesso ao histórico).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Usando GitHub Codespaces (recomendado para evitar downloads locais grandes)

- Crie um novo Codespace para este repositório via o [GitHub UI](https://github.com/codespaces).  

- No terminal do codespace recém-criado, execute um dos comandos de clone raso/esparso acima para trazer apenas as pastas das lições que você precisa para o workspace do Codespace.
- Opcional: após clonar dentro do Codespaces, remova .git para recuperar espaço extra (veja os comandos de remoção acima).
- Nota: Se preferir abrir o repositório diretamente no Codespaces (sem um clone extra), esteja ciente de que o Codespaces construirá o ambiente devcontainer e ainda poderá provisionar mais do que você precisa. Clonar uma cópia rasa dentro de um Codespace limpo dá mais controle sobre o uso de disco.

#### Dicas

- Sempre substitua a URL do clone pelo seu fork se quiser editar/commitar.
- Se depois precisar de mais histórico ou arquivos, você pode buscá-los ou ajustar sparse-checkout para incluir pastas adicionais.

## Executando o Código

Este curso oferece uma série de Jupyter Notebooks que você pode executar para obter experiência prática construindo Agentes de IA.

Os exemplos de código usam **Microsoft Agent Framework (MAF)** com o `FoundryChatClient`, que conecta ao **Microsoft Foundry Agent Service V2** (a API de Respostas) através do **Microsoft Foundry**.

Todos os notebooks Python são identificados como `*-python-agent-framework.ipynb`.

## Requisitos

- Python 3.12+
  - **NOTA**: Se você não tem Python 3.12 instalado, certifique-se de instalá-lo. Depois crie seu venv usando python3.12 para garantir que as versões corretas sejam instaladas do arquivo requirements.txt.
  
    >Exemplo

    Crie o diretório Python venv:

    ```bash|powershell
    python -m venv venv
    ```

    Então ative o ambiente venv para:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Para os códigos de exemplo usando .NET, certifique-se de instalar [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ou superior. Depois, verifique a versão do SDK .NET instalada:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Necessário para autenticação. Instale a partir de [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Assinatura Azure** — Para acesso ao Microsoft Foundry e ao Microsoft Foundry Agent Service.
- **Projeto Microsoft Foundry** — Um projeto com um modelo implantado (ex., `gpt-4.1-mini`). Veja [Passo 1](#passo-1-crie-um-projeto-microsoft-foundry) abaixo.

Incluímos um arquivo `requirements.txt` na raiz deste repositório contendo todos os pacotes Python necessários para executar os exemplos de código.

Você pode instalá-los executando o seguinte comando no terminal na raiz do repositório:

```bash|powershell
pip install -r requirements.txt
```

Recomendamos criar um ambiente virtual Python para evitar qualquer conflito e problema.

## Configurar VSCode

Certifique-se de que você está usando a versão correta do Python no VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Configure o Microsoft Foundry e o Microsoft Foundry Agent Service

### Passo 1: Crie um Projeto Microsoft Foundry

Você precisa de um **hub** e **projeto** no Microsoft Foundry com um modelo implantado para executar os notebooks.

1. Vá para [ai.azure.com](https://ai.azure.com) e entre com sua conta Azure.
2. Crie um **hub** (ou use um existente). Veja: [Visão geral dos recursos do Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Dentro do hub, crie um **projeto**.
4. Implemente um modelo (ex., `gpt-4.1-mini`) em **Modelos + Endpoints** → **Implantar modelo**.

### Passo 2: Recupere o Endpoint do Projeto e o Nome da Implantação do Modelo

No seu projeto no portal Microsoft Foundry:

- **Endpoint do Projeto** — Vá para a página **Visão Geral** e copie a URL do endpoint.

![Project Connection String](../../../translated_images/pt-BR/project-endpoint.8cf04c9975bbfbf1.webp)

- **Nome da Implantação do Modelo** — Vá para **Modelos + Endpoints**, selecione o modelo implantado e anote o **Nome da implantação** (ex., `gpt-4.1-mini`).

### Passo 3: Entre na Azure com `az login`

Todos os notebooks usam **`AzureCliCredential`** para autenticação — sem necessidade de gerenciar chaves API. Isso exige que você esteja logado via Azure CLI.

1. **Instale o Azure CLI** se ainda não o fez: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Entre** executando:

    ```bash|powershell
    az login
    ```

    Ou se você estiver em um ambiente remoto/Codespace sem navegador:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Selecione sua assinatura** se for solicitado — escolha aquela que contém seu projeto Foundry.

4. **Verifique** se está logado:

    ```bash|powershell
    az account show
    ```

> **Por que `az login`?** Os notebooks autenticam usando `AzureCliCredential` do pacote `azure-identity`. Isso significa que sua sessão do Azure CLI fornece as credenciais — sem chaves API ou segredos no arquivo `.env`. Esta é uma [boa prática de segurança](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Passo 4: Crie seu arquivo `.env`

Copie o arquivo de exemplo:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Abra `.env` e preencha estes dois valores:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Variável | Onde encontrá-la |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Portal Foundry → seu projeto → página **Visão Geral** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Portal Foundry → **Modelos + Endpoints** → nome do modelo implantado |

Isso é tudo para a maioria das lições! Os notebooks autenticarão automaticamente através da sua sessão `az login`.

### Passo 5: Instale as Dependências Python

```bash|powershell
pip install -r requirements.txt
```

Recomendamos executar isso dentro do ambiente virtual que você criou anteriormente.

## Configuração Adicional para a Lição 5 (Agentic RAG)

A Lição 5 usa **Azure AI Search** para geração aumentada por recuperação. Se você planeja executar essa lição, adicione essas variáveis ao seu arquivo `.env`:

| Variável | Onde encontrá-la |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Portal Azure → seu recurso **Azure AI Search** → **Visão Geral** → URL |
| `AZURE_SEARCH_API_KEY` | Portal Azure → seu recurso **Azure AI Search** → **Configurações** → **Chaves** → chave administrativa primária |

## Configuração Adicional para Lições que Chamam Azure OpenAI Diretamente (Lições 6 e 8)

Alguns notebooks nas lições 6 e 8 chamam diretamente o **Azure OpenAI** (usando a **API de Respostas**) em vez de passar por um projeto Microsoft Foundry. Esses exemplos antes usavam Modelos GitHub, que estão depreciados (serão descontinuados em julho de 2026) e não suportam a API de Respostas. Se planeja executar esses exemplos, adicione essas variáveis ao seu arquivo `.env`:

| Variável | Onde encontrá-la |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Portal Azure → seu recurso **Azure OpenAI** → **Chaves e Endpoint** → Endpoint (ex. `https://<seu-recurso>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Nome do seu modelo implantado (ex. `gpt-4.1-mini`) que suporta a API de Respostas |
| `AZURE_OPENAI_API_KEY` | Opcional — somente se usar autenticação baseada em chave em vez de `az login` / Entra ID |

> A API de Respostas usa o endpoint estável `/openai/v1/`, então não é necessário `api-version`. Entre com `az login` para usar autenticação Entra ID sem chave.

## Provedor Alternativo: MiniMax (Compatível com OpenAI)

[MiniMax](https://platform.minimaxi.com/) fornece modelos de contexto extenso (até 204K tokens) por meio de uma API compatível com OpenAI. Como o `OpenAIChatClient` do Microsoft Agent Framework funciona com qualquer endpoint compatível com OpenAI, você pode usar o MiniMax como alternativa plug-and-play ao Azure OpenAI ou OpenAI.

Adicione essas variáveis ao seu arquivo `.env`:

| Variável | Onde encontrá-la |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → Chaves de API |
| `MINIMAX_BASE_URL` | Use `https://api.minimax.io/v1` (valor padrão) |
| `MINIMAX_MODEL_ID` | Nome do modelo a usar (ex., `MiniMax-M3`) |

**Modelos de exemplo**: `MiniMax-M3` (recomendado), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (respostas mais rápidas). Os nomes e disponibilidade dos modelos podem mudar com o tempo, e o acesso a um modelo pode depender da sua conta ou região — verifique o [MiniMax Platform](https://platform.minimaxi.com/) para a lista atual. Se `MiniMax-M3` não estiver disponível para sua conta, configure `MINIMAX_MODEL_ID` para um modelo ao qual você tem acesso (ex. `MiniMax-M2.7`).

Os exemplos de código que usam `OpenAIChatClient` (ex., o fluxo de reserva de hotel da Lição 14) detectarão e usarão automaticamente sua configuração MiniMax quando `MINIMAX_API_KEY` estiver configurada.

## Provedor Alternativo: Foundry Local (Execute Modelos Localmente)

[Foundry Local](https://foundrylocal.ai) é um runtime leve que baixa, gerencia e serve modelos de linguagem **inteiramente na sua própria máquina** por meio de uma API compatível com OpenAI — sem nuvem, sem assinatura Azure e sem chaves API. É uma ótima opção para desenvolvimento offline, experimentação sem custos em nuvem, ou para manter dados localmente no dispositivo.

Como o `OpenAIChatClient` do Microsoft Agent Framework funciona com qualquer endpoint compatível com OpenAI, Foundry Local é uma alternativa local plug-and-play ao Azure OpenAI.

**1. Instale o Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Baixe e execute um modelo** (isso também inicia o serviço local):

```bash
foundry model list          # veja os modelos disponíveis
foundry model run phi-4-mini
```

**3. Instale o SDK Python** usado para descobrir o endpoint local:

```bash
pip install foundry-local-sdk
```

**4. Aponte o Microsoft Agent Framework para o seu modelo local:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Faz o download (se necessário) e serve o modelo localmente, depois descobre o endpoint/porta.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # ex. http://localhost:<port>/v1
    api_key=manager.api_key,        # sempre "não necessário" para Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Nota:** Foundry Local expõe um endpoint OpenAI-compatible **Chat Completions**. Use para desenvolvimento local e cenários offline. Para o conjunto completo de recursos da **API de Respostas** (conversas com estado, orquestração profunda de ferramentas, desenvolvimento estilo agente), use **Azure OpenAI** ou um projeto **Microsoft Foundry** como mostrado nas lições. Veja a [documentação Foundry Local](https://foundrylocal.ai) para o catálogo atual de modelos e suporte à plataforma.


## Configuração Adicional para a Lição 8 (Fluxo de Trabalho Bing Grounding)

O notebook do fluxo de trabalho condicional na lição 8 usa **Bing grounding** via Microsoft Foundry. Se você planeja executar esse exemplo, adicione esta variável ao seu arquivo `.env`:

| Variable | Onde encontrá-la |
|----------|-----------------|
| `BING_CONNECTION_ID` | Portal Microsoft Foundry → seu projeto → **Management** → **Connected resources** → sua conexão Bing → copie o ID da conexão |

## Solução de Problemas

### Erros de Verificação do Certificado SSL no macOS

Se você estiver no macOS e encontrar um erro como:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Este é um problema conhecido com Python no macOS, onde os certificados SSL do sistema não são automaticamente confiáveis. Tente as seguintes soluções na ordem:

**Opção 1: Execute o script de Instalação de Certificados do Python (recomendado)**

```bash
# Substitua 3.XX pela sua versão instalada do Python (por exemplo, 3.12 ou 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Opção 2: Use `connection_verify=False` no seu notebook (apenas para notebooks GitHub Models)**

No notebook da Lição 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), uma solução alternativa comentada já está incluída. Descomente `connection_verify=False` ao criar o cliente:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Desative a verificação SSL se você encontrar erros de certificado
)
```

> **⚠️ Aviso:** Desabilitar a verificação SSL (`connection_verify=False`) reduz a segurança ao pular a validação do certificado. Use isso apenas como uma solução temporária em ambientes de desenvolvimento, nunca em produção.

**Opção 3: Instale e use `truststore`**

```bash
pip install truststore
```

Em seguida, adicione o seguinte no topo do seu notebook ou script antes de fazer quaisquer chamadas de rede:

```python
import truststore
truststore.inject_into_ssl()
```

## Travou em Algum Lugar?

Se você tiver algum problema ao executar esta configuração, entre em nosso <a href="https://discord.gg/kzRShWzttr" target="_blank">Discord da Comunidade Azure AI</a> ou <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">crie uma issue</a>.

## Próxima Lição

Agora você está pronto para executar o código deste curso. Feliz aprendizado sobre o mundo dos Agentes de IA!

[Introdução aos Agentes de IA e Casos de Uso de Agentes](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->