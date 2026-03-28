# Azure OpenAI

> **Category:** Cloud Provider AI Services

- 🌐 **Homepage:** [https://azure.microsoft.com/en-us/products/ai-services/openai-service](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- 📖 **Docs:** [https://learn.microsoft.com/en-us/azure/ai-services/openai](https://learn.microsoft.com/en-us/azure/ai-services/openai)
- 🔑 **Sign Up:** [https://azure.microsoft.com/en-us/free](https://azure.microsoft.com/en-us/free)

## API Endpoint
```
https://{resource}.openai.azure.com/openai/deployments/{deployment}/chat/completions
```

## Access & Limits
| | |
|---|---|
| **Free Tier** | $200 Azure credit (30 days for new customers) |
| **Rate Limits** | Configurable based on provisioned throughput (PTU) |

## Key Features
- Enterprise SLA
- Regional data residency
- Private endpoints
- VPC integration
- Compliance (HIPAA, SOC2)
- Azure AD auth
- Content filtering
- PTU pricing

## SDKs & Installation
**Python:**
```bash
pip install azure-ai-openai
```
**Node.js:**
```bash
npm install @azure/openai
```

## Models & Pricing (per 1M tokens)
| Model | Input | Output | Cached | Context | Best For |
|---|---|---|---|---|---|
| GPT-4o | $2.50 | $10.00 | — | 128K | Enterprise deployments |
| GPT-4o mini | $0.15 | $0.60 | — | 128K | Cost-effective enterprise |
| o1-preview | $15.00 | $60.00 | — | 128K | Complex enterprise reasoning |
