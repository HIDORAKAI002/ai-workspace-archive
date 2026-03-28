# Google AI (Gemini)

> **Category:** Major Cloud Providers

- 🌐 **Homepage:** [https://ai.google.dev](https://ai.google.dev)
- 📖 **Docs:** [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)
- 🔑 **Sign Up:** [https://aistudio.google.com](https://aistudio.google.com)

## API Endpoint
```
https://generativelanguage.googleapis.com/v1beta/models
```

## Access & Limits
| | |
|---|---|
| **Free Tier** | 1,500 RPD (Gemini 2.5 Pro: 100/day, Flash: 250/day) |
| **Rate Limits** | Free: 15 RPM → Paid: 3,600 RPM |

## Key Features
- Native multimodal
- Google Search grounding
- Google Maps integration
- Context caching
- 1M context
- Function calling
- Batch processing

## SDKs & Installation
**Python:**
```bash
pip install google-generativeai
```
**Node.js:**
```bash
npm install @google/generative-ai
```

## Models & Pricing (per 1M tokens)
| Model | Input | Output | Cached | Context | Best For |
|---|---|---|---|---|---|
| Gemini 2.5 Flash-Lite | $0.10 | $0.40 | — | 1M | High-volume tasks |
| Gemini 2.5 Flash | $0.30 | $2.50 | — | 1M | General tasks, multimodal |
| Gemini 2.5 Pro | $1.25 | $10.00 | — | 1M | Complex reasoning |
