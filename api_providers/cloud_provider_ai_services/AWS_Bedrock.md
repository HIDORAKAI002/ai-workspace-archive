# AWS Bedrock

> **Category:** Cloud Provider AI Services

- 🌐 **Homepage:** [https://aws.amazon.com/bedrock](https://aws.amazon.com/bedrock)
- 📖 **Docs:** [https://docs.aws.amazon.com/bedrock](https://docs.aws.amazon.com/bedrock)
- 🔑 **Sign Up:** [https://aws.amazon.com/free](https://aws.amazon.com/free)

## API Endpoint
```
https://bedrock-runtime.{region}.amazonaws.com
```

## Access & Limits
| | |
|---|---|
| **Free Tier** | AWS Free Tier includes some Bedrock requests for 12 months |
| **Rate Limits** | Configurable. Default: 200 requests/min per model |

## Key Features
- Multiple providers
- Serverless
- AWS IAM
- VPC support
- Guardrails
- Knowledge Bases for RAG
- Agents
- Fine-tuning

## SDKs & Installation
**Python:**
```bash
pip install boto3
```
**Node.js:**
```bash
npm install @aws-sdk/client-bedrock-runtime
```

## Models & Pricing (per 1M tokens)
| Model | Input | Output | Cached | Context | Best For |
|---|---|---|---|---|---|
| Claude 3.5 Sonnet | $3.00 | $15.00 | — | 200K | AWS-native deployments |
| Claude 3 Haiku | $0.25 | $1.25 | — | 200K | High-volume AWS apps |
| Llama 3 | $0.40 | $0.60 | — | 8K | Open-source on AWS |
| Amazon Nova | $0.03 | $0.12 | — | 128K | Ultra-low-cost AWS |
