# 🎯 Planeamento e Padrões de Design com Azure OpenAI (Responses API) (.NET)

## 📋 Objetivos de Aprendizagem

Este notebook demonstra padrões de planeamento e design ao nível empresarial para criar agentes inteligentes utilizando o Microsoft Agent Framework em .NET com Azure OpenAI (Responses API). Aprenderá a criar agentes que podem decompor problemas complexos, planear soluções multi-etapas e executar fluxos de trabalho sofisticados com as funcionalidades empresariais do .NET.

## ⚙️ Pré-requisitos e Configuração

**Ambiente de Desenvolvimento:**
- SDK .NET 9.0 ou superior
- Visual Studio 2022 ou VS Code com a extensão C#
- Uma subscrição Azure com um recurso Azure OpenAI e um deployment de modelo
- O Azure CLI — inicie sessão com `az login`

**Dependências Necessárias:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Configuração do Ambiente (ficheiro .env):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Executar o Código

Esta lição inclui uma implementação de uma Aplicação Single File em .NET. Para a executar:

```bash
# Torne o ficheiro executável (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Execute a aplicação
./07-dotnet-agent-framework.cs
```

Ou utilize o comando dotnet run:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Implementação do Código

A implementação completa está disponível em `07-dotnet-agent-framework.cs`, que demonstra:

- Carregar a configuração do ambiente com DotNetEnv
- Configurar o cliente Azure OpenAI e criar um agente AI usando `GetChatClient().AsAIAgent()`
- Definir modelos de dados estruturados (Plan e TravelPlan) com serialização JSON
- Criar um agente AI com saída estruturada usando esquema JSON
- Executar pedidos de planeamento com respostas tipadas de forma segura

## Conceitos-Chave

### Planeamento Estruturado com Modelos Tipados

O agente usa classes C# para definir a estrutura das saídas de planeamento:

```csharp
public class Plan
{
    [JsonPropertyName("assigned_agent")]
    public string? Assigned_agent { get; set; }

    [JsonPropertyName("task_details")]
    public string? Task_details { get; set; }
}

public class TravelPlan
{
    [JsonPropertyName("main_task")]
    public string? Main_task { get; set; }

    [JsonPropertyName("subtasks")]
    public IList<Plan> Subtasks { get; set; }
}
```

### Esquema JSON para Saídas Estruturadas

O agente está configurado para retornar respostas que correspondem ao esquema TravelPlan:

```csharp
ChatClientAgentOptions agentOptions = new()
{
    Name = AGENT_NAME,
    Description = AGENT_INSTRUCTIONS,
    ChatOptions = new()
    {
        ResponseFormat = ChatResponseFormatJson.ForJsonSchema(
            schema: AIJsonUtilities.CreateJsonSchema(typeof(TravelPlan)),
            schemaName: "TravelPlan",
            schemaDescription: "Travel Plan with main_task and subtasks")
    }
};
```

### Instruções do Agente de Planeamento

O agente atua como coordenador, delegando tarefas a sub-agentes especializados:

- FlightBooking: Para reservas de voos e fornecimento de informações sobre voos
- HotelBooking: Para reservas de hotéis e fornecimento de informações sobre hotéis
- CarRental: Para reservas de carros e fornecimento de informações sobre aluguer de carros
- ActivitiesBooking: Para reservas de atividades e fornecimento de informações sobre atividades
- DestinationInfo: Para fornecer informações sobre destinos
- DefaultAgent: Para tratar pedidos gerais

## Saída Esperada

Quando executar o agente com um pedido de planeamento de viagem, ele irá analisar o pedido e gerar um plano estruturado com atribuições adequadas de tarefas a agentes especializados, formatado como JSON conforme o esquema TravelPlan.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->