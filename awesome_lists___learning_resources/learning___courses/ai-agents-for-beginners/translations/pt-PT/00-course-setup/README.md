# Configuração do Curso

## Introdução

Esta lição irá abordar como executar os exemplos de código deste curso.

## Junte-se a Outros Estudantes e Obtenha Ajuda

Antes de começar a clonar o seu repositório, junte-se ao [canal Discord AI Agents For Beginners](https://aka.ms/ai-agents/discord) para obter ajuda com a configuração, dúvidas sobre o curso ou para conectar-se com outros estudantes.

## Clone ou Faça Fork deste Repositório

Para começar, por favor clone ou faça fork do Repositório GitHub. Isto irá criar a sua própria versão do material do curso para que possa executar, testar e ajustar o código!

Isto pode ser feito clicando no link para <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fazer fork do repositório</a>

Agora deve ter a sua própria versão fork deste curso no link seguinte:

![Forked Repo](../../../translated_images/pt-PT/forked-repo.33f27ca1901baa6a.webp)

### Clone Raso (recomendado para workshops / Codespaces)

  > O repositório completo pode ser grande (~3 GB) quando faz o download de todo o histórico e todos os ficheiros. Se apenas vai participar no workshop ou precisa só de algumas pastas das lições, um clone raso (ou clone esparso) evita a maior parte desse download ao truncar o histórico e/ou ignorar blobs.

#### Clone raso rápido — histórico mínimo, todos os ficheiros

Substitua `<your-username>` nos comandos abaixo pelo URL do seu fork (ou o URL upstream se preferir).

Para clonar apenas o histórico do último commit (download pequeno):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Para clonar um ramo específico:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Clone Parcial (esparso) — blobs mínimos + apenas pastas selecionadas

Isto usa clone parcial e sparse-checkout (requer Git 2.25+ e Git moderno recomendado com suporte a clone parcial):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Entre na pasta do repositório:

```bash|powershell
cd ai-agents-for-beginners
```

Depois especifique quais pastas quer (exemplo abaixo mostra duas pastas):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Após clonar e verificar os ficheiros, se precisar apenas dos ficheiros e quiser libertar espaço (sem histórico git), apague os metadados do repositório (💀 irreversível — vai perder toda a funcionalidade Git: nenhum commit, pull, push ou acesso ao histórico).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Usar GitHub Codespaces (recomendado para evitar downloads locais grandes)

- Crie um novo Codespace para este repositório via a [interface GitHub](https://github.com/codespaces).  

- No terminal do novo codespace criado, execute um dos comandos de clone raso/esparso acima para trazer apenas as pastas das lições que precisa para o espaço de trabalho do Codespace.
- Opcional: depois de clonar dentro dos Codespaces, remova .git para recuperar espaço extra (veja os comandos de remoção acima).
- Nota: Se preferir abrir o repositório diretamente nos Codespaces (sem um clone extra), tenha em atenção que o Codespaces irá construir o ambiente devcontainer e pode ainda assim provisionar mais do que precisa. Clonar uma cópia rasa dentro de um Codespace novo dá-lhe mais controlo sobre o uso do disco.

#### Dicas

- Substitua sempre a URL do clone pelo seu fork se quiser editar/commitar.
- Se precisar de mais histórico ou ficheiros mais tarde, pode buscá-los ou ajustar o sparse-checkout para incluir pastas adicionais.

## Executar o Código

Este curso oferece uma série de Jupyter Notebooks que pode executar para obter experiência prática a construir Agentes de IA.

Os exemplos de código usam o **Microsoft Agent Framework (MAF)** com o `FoundryChatClient`, que se conecta ao **Microsoft Foundry Agent Service V2** (a API Responses) via **Microsoft Foundry**.

Todos os notebooks Python estão etiquetados como `*-python-agent-framework.ipynb`.

## Requisitos

- Python 3.12+
  - **NOTA**: Se não tem Python3.12 instalado, certifique-se que o instala. Depois crie o seu venv usando python3.12 para garantir que as versões corretas são instaladas a partir do ficheiro requirements.txt.
  
    >Exemplo

    Criar diretório Python venv:

    ```bash|powershell
    python -m venv venv
    ```

    Depois ative o ambiente venv para:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Para os códigos de exemplo usando .NET, certifique-se que instala o [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ou superior. Depois, verifique a versão do .NET SDK instalado:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Necessário para autenticação. Instale a partir de [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Assinatura Azure** — Para acesso ao Microsoft Foundry e Microsoft Foundry Agent Service.
- **Projeto Microsoft Foundry** — Um projeto com modelo implementado (ex: `gpt-4.1-mini`). Veja [Passo 1](#passo-1-criar-um-projeto-microsoft-foundry) abaixo.

Incluímos um ficheiro `requirements.txt` na raiz deste repositório que contém todos os pacotes Python necessários para executar os exemplos de código.

Pode instalá-los executando o seguinte comando no seu terminal na raiz do repositório:

```bash|powershell
pip install -r requirements.txt
```

Recomendamos criar um ambiente virtual Python para evitar conflitos e problemas.

## Configurar VSCode

Certifique-se que está a usar a versão certa do Python no VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Configure Microsoft Foundry e Microsoft Foundry Agent Service

### Passo 1: Criar um Projeto Microsoft Foundry

Precisa de um **hub** e um **projeto** Microsoft Foundry com um modelo implementado para executar os notebooks.

1. Vá a [ai.azure.com](https://ai.azure.com) e inicie sessão com a sua conta Azure.
2. Crie um **hub** (ou use um já existente). Veja: [Visão geral dos recursos Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Dentro do hub, crie um **projeto**.
4. Implemente um modelo (ex: `gpt-4.1-mini`) em **Models + Endpoints** → **Deploy model**.

### Passo 2: Obter o Endpoint do Projeto e Nome da Implementação do Modelo

No seu projeto no portal Microsoft Foundry:

- **Endpoint do Projeto** — Vá à página **Overview** e copie o URL do endpoint.

![Project Connection String](../../../translated_images/pt-PT/project-endpoint.8cf04c9975bbfbf1.webp)

- **Nome da Implementação do Modelo** — Vá a **Models + Endpoints**, selecione o seu modelo implementado e anote o **Deployment name** (ex: `gpt-4.1-mini`).

### Passo 3: Iniciar sessão no Azure com `az login`

Todos os notebooks usam **`AzureCliCredential`** para autenticação — não há chaves API para gerir. Isto requer que esteja autenticado via Azure CLI.

1. **Instale a Azure CLI** se ainda não o fez: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Inicie sessão** executando:

    ```bash|powershell
    az login
    ```

    Ou se estiver num ambiente remoto/Codespace sem browser:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Selecione a sua assinatura** se solicitado — escolha a que contém o seu projeto Foundry.

4. **Verifique** que está autenticado:

    ```bash|powershell
    az account show
    ```

> **Porquê `az login`?** Os notebooks autenticam-se usando `AzureCliCredential` do pacote `azure-identity`. Isto significa que a sua sessão Azure CLI fornece as credenciais — sem chaves API ou segredos no seu ficheiro `.env`. Esta é uma [boa prática de segurança](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Passo 4: Criar o seu ficheiro `.env`

Copie o ficheiro de exemplo:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Abra o `.env` e preencha estes dois valores:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Variável | Onde encontrar |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Portal Foundry → o seu projeto → página **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Portal Foundry → **Models + Endpoints** → nome do seu modelo implementado |

É tudo para a maior parte das lições! Os notebooks irão autenticar automaticamente pela sua sessão `az login`.

### Passo 5: Instalar Dependências Python

```bash|powershell
pip install -r requirements.txt
```

Recomendamos executar isto dentro do ambiente virtual que criou anteriormente.

## Configuração Adicional para a Lição 5 (Agentic RAG)

A Lição 5 usa **Azure AI Search** para geração aumentada por recuperação. Se pretende executar essa lição, adicione estas variáveis ao seu ficheiro `.env`:

| Variável | Onde encontrar |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Portal Azure → recurso **Azure AI Search** → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Portal Azure → recurso **Azure AI Search** → **Configurações** → **Chaves** → chave administrativa principal |

## Configuração Adicional para Lições que Chamam Azure OpenAI Diretamente (Lições 6 e 8)

Alguns notebooks das lições 6 e 8 chamam o **Azure OpenAI** diretamente (usando a **Responses API**) em vez de passar por um projeto Microsoft Foundry. Estes exemplos usavam anteriormente Modelos GitHub, que está depreciado (a aposentar em julho 2026) e não suporta a Responses API. Se pretende executar esses exemplos, adicione estas variáveis ao seu ficheiro `.env`:

| Variável | Onde encontrar |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Portal Azure → recurso **Azure OpenAI** → **Chaves e Endpoint** → Endpoint (ex: `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Nome do seu modelo implementado (ex: `gpt-4.1-mini`) que suporta a Responses API |
| `AZURE_OPENAI_API_KEY` | Opcional — só se usar autenticação por chave em vez de `az login` / Entra ID |

> A Responses API usa o endpoint estável `/openai/v1/`, por isso não é necessário `api-version`. Inicie sessão com `az login` para usar autenticação sem chave Entra ID.

## Provedor Alternativo: MiniMax (Compatível com OpenAI)

[MiniMax](https://platform.minimaxi.com/) fornece modelos de contexto largo (até 204K tokens) através de uma API compatível com OpenAI. Como o `OpenAIChatClient` do Microsoft Agent Framework funciona com qualquer endpoint compatível com OpenAI, pode usar o MiniMax como alternativa direta ao Azure OpenAI ou OpenAI.

Adicione estas variáveis ao seu ficheiro `.env`:

| Variável | Onde encontrar |
|----------|-----------------|
| `MINIMAX_API_KEY` | [Plataforma MiniMax](https://platform.minimaxi.com/) → Chaves API |
| `MINIMAX_BASE_URL` | Use `https://api.minimax.io/v1` (valor padrão) |
| `MINIMAX_MODEL_ID` | Nome do modelo a usar (ex: `MiniMax-M3`) |

**Modelos exemplo**: `MiniMax-M3` (recomendado), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (respostas mais rápidas). Os nomes e a disponibilidade dos modelos podem mudar ao longo do tempo, e o acesso a um determinado modelo pode depender da sua conta ou região — consulte a [Plataforma MiniMax](https://platform.minimaxi.com/) para a lista atual. Se `MiniMax-M3` não estiver disponível para a sua conta, defina `MINIMAX_MODEL_ID` para um modelo que tenha acesso (ex: `MiniMax-M2.7`).

Os exemplos de código que usam `OpenAIChatClient` (ex: o workflow de reserva de hotel da Lição 14) irão detetar automaticamente e usar a sua configuração MiniMax quando `MINIMAX_API_KEY` estiver definido.

## Provedor Alternativo: Foundry Local (Executar Modelos no Dispositivo)

[Foundry Local](https://foundrylocal.ai) é um runtime leve que descarrega, gere e serve modelos linguísticos **totalmente na sua própria máquina** através de uma API compatível com OpenAI — sem cloud, sem subscrição Azure, e sem chaves API. É uma ótima opção para desenvolvimento offline, experimentar sem custos cloud, ou manter os dados no dispositivo.

Como o `OpenAIChatClient` do Microsoft Agent Framework funciona com qualquer endpoint compatível com OpenAI, o Foundry Local é uma alternativa local plug-and-play ao Azure OpenAI.

**1. Instalar Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Descarregar e executar um modelo** (isto também inicia o serviço local):

```bash
foundry model list          # ver modelos disponíveis
foundry model run phi-4-mini
```

**3. Instalar o SDK Python** usado para descobrir o endpoint local:

```bash
pip install foundry-local-sdk
```

**4. Aponte o Microsoft Agent Framework para o seu modelo local:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Descarrega (se necessário) e serve o modelo localmente, depois descobre o endpoint/porta.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # por exemplo http://localhost:<port>/v1
    api_key=manager.api_key,        # sempre "não obrigatório" para Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Nota:** O Foundry Local expõe um endpoint compatível com OpenAI **Chat Completions**. Use-o para desenvolvimento local e cenários offline. Para o conjunto completo de funcionalidades da **Responses API** (conversas com estado, orquestração profunda de ferramentas e desenvolvimento ao estilo agente), aponte para **Azure OpenAI** ou um projeto **Microsoft Foundry** conforme mostrado nas lições. Veja a [documentação Foundry Local](https://foundrylocal.ai) para o catálogo atual de modelos e suporte da plataforma.


## Configuração Adicional para a Aula 8 (Fluxo de trabalho de Fundamentação Bing)

O notebook do fluxo condicional na aula 8 utiliza **fundamentação Bing** via Microsoft Foundry. Se planeia executar esse exemplo, adicione esta variável ao seu ficheiro `.env`:

| Variável | Onde encontrá-la |
|----------|-----------------|
| `BING_CONNECTION_ID` | Portal Microsoft Foundry → o seu projeto → **Management** → **Connected resources** → a sua ligação Bing → copie o ID da ligação |

## Resolução de Problemas

### Erros de Verificação de Certificado SSL no macOS

Se estiver no macOS e encontrar um erro como:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Este é um problema conhecido com o Python no macOS, onde os certificados SSL do sistema não são automaticamente confiáveis. Experimente as seguintes soluções pela ordem:

**Opção 1: Execute o script Install Certificates do Python (recomendado)**

```bash
# Substitua 3.XX pela versão do Python que tem instalada (por exemplo, 3.12 ou 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Opção 2: Use `connection_verify=False` no seu notebook (apenas para notebooks GitHub Models)**

No notebook da Aula 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), uma solução alternativa comentada já está incluída. Descomente `connection_verify=False` ao criar o cliente:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Desativar a verificação SSL se encontrar erros de certificado
)
```

> **⚠️ Aviso:** Desativar a verificação SSL (`connection_verify=False`) reduz a segurança ao ignorar a validação do certificado. Use isto apenas como uma solução temporária em ambientes de desenvolvimento, nunca em produção.

**Opção 3: Instale e use `truststore`**

```bash
pip install truststore
```

Depois adicione o seguinte no topo do seu notebook ou script antes de fazer chamadas de rede:

```python
import truststore
truststore.inject_into_ssl()
```

## Preso em Algum Lugar?

Se tiver algum problema a executar esta configuração, entre na nossa <a href="https://discord.gg/kzRShWzttr" target="_blank">Comunidade Azure AI no Discord</a> ou <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">crie uma issue</a>.

## Próxima Aula

Já está pronto para executar o código deste curso. Bom aprendizado sobre o mundo dos Agentes de IA!

[Introdução aos Agentes de IA e Casos de Uso de Agentes](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->