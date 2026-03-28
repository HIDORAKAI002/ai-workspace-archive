# AI API Providers — Quick Comparison

> Auto-generated reference guide. Last updated: 2026-03-28

## 📊 Statistics
| | |
|---|---|
| Total Providers | 12 |
| Total Models | 50 |
| Cheapest Model | Cohere Command R7B ($0.0375/M) |
| Largest Context | xAI Grok (2M tokens) |
| Best Free Tier | DeepSeek (5M tokens) |
| Fastest Inference | Groq (1,000+ tokens/sec) |

## 🏆 Category Winners
| Category | Winner | Details | Runner-Up |
|---|---|---|---|
| Cheapest Entry | **DeepSeek V4** | $0.30/M input | Gemini 2.5 Flash-Lite ($0.10/M) |
| Best Free Tier | **DeepSeek** | 5M free tokens | Google Gemini (1,500 RPD) |
| Largest Context | **xAI Grok 4 / 4.1 Fast** | 2M tokens | GPT-4.1 / Claude 4.6 / Gemini 2.5 (1M) |
| Fastest Inference | **Groq** | 400-1,000+ tokens/sec | Together AI / Fireworks |
| Best Reasoning | **Claude Opus 4.6** | $5/M input | OpenAI o3 ($2/M) |
| Best for EU/GDPR | **Mistral AI** | EU data residency | Google Gemini (EU regions) |
| Best Embeddings | **Cohere Embed 4** | $0.12/M tokens | OpenAI text-embedding-3-small ($0.02/M) |
| Best for Self-Hosting | **Meta Llama** | FREE | Mistral (open-weight) |

## 💡 Cost Optimization Tips
| Tip | Description | Savings |
|---|---|---|
| **Use Model Routing** | Route simple tasks to cheaper models (GPT-4.1 Nano $0.10/M, DeepSeek V4 $0.30/M) | 50-80% |
| **Leverage Prompt Caching** | Anthropic: 90% off cached, OpenAI: 50-90% off | 50-90% |
| **Batch Processing** | OpenAI & Anthropic Batch API for async workloads | 50% |
| **Off-Peak Discounts** | DeepSeek: 50-75% off (16:30-00:30 GMT) | 50-75% |
| **Consider Open-Source** | Self-host Llama or Mistral for predictable costs | 100% (no per-token fees) |
| **Use Unified APIs** | OpenRouter/Together AI for easy model switching | Variable |

## 💰 Real-World Monthly Cost Examples
| Use Case | Model | Monthly Cost | Notes |
|---|---|---|---|
| Customer Support Bot | GPT-5 Mini | ~$10/mo | 10K conversations |
| Content Generation | GPT-5 | ~$15-25/mo | 500 articles |
| Document Analysis | GPT-4.1 | ~$100-150/mo | 1K documents |
| High-Volume Chatbot | DeepSeek V4 | ~$5-10/mo | 50K messages |
| Enterprise RAG | Claude Sonnet 4.6 | ~$200-500/mo | 5K complex queries |
| Embedding Pipeline | Cohere Embed 4 | ~$50-100/mo | 10M tokens |
| Research/Reasoning | Claude Opus 4.6 | ~$500-1000/mo | 10K complex tasks |
| Budget Startup | DeepSeek V4 | ~$3-5/mo | 10K general queries |

## ⚡ Quick Code Snippets
### Openai
```bash
pip install openai
```
```python
from openai import OpenAI

client = OpenAI(api_key='your-api-key')

response = client.chat.completions.create(
    model='gpt-4o-mini',
    messages=[{'role': 'user', 'content': 'Hello!'}]
)

print(response.choices[0].message.content)
```

### Anthropic
```bash
pip install anthropic
```
```python
from anthropic import Anthropic

client = Anthropic(api_key='your-api-key')

response = client.messages.create(
    model='claude-3-5-sonnet-20241022',
    max_tokens=1024,
    messages=[{'role': 'user', 'content': 'Hello!'}]
)

print(response.content[0].text)
```

### Deepseek
```bash
pip install openai
```
```python
from openai import OpenAI

client = OpenAI(
    api_key='your-api-key',
    base_url='https://api.deepseek.com/v1'
)

response = client.chat.completions.create(
    model='deepseek-chat',
    messages=[{'role': 'user', 'content': 'Hello!'}]
)

print(response.choices[0].message.content)
```
