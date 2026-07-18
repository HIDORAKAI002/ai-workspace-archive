---
name: testing-course-samples
description: ਜਦੋਂ ਮੰਗ ਕੀਤੀ ਜਾਵੇ ਤਦ ਵੈਲਿਡੇਟ ਕਰਨ ਲਈ, ਟੈਸਟ ਕਰਨ ਲਈ, ਸਮੋਕ-ਟੈਸਟ ਕਰਨ ਲਈ,
  ਜਾਂ ਕੋਰਸ ਦੇ ਨੋਟਬੁੱਕ ਅਤੇ ਕੋਡ ਸੈਂਪਲਾਂ ਨੂੰ live Microsoft Foundry / Azure OpenAI ਕਨਫਿਗਰੇਸ਼ਨ
  ਖਿਲਾਫ ਚਲਾਉਣ ਲਈ ਵਰਤੋਂ ਕਰੋ। ਇਹ ਮਾਹੌਲ ਸੈਟਅੱਪ (.env, az login, ਪੈਕੇਜਜ਼), ਸਕ੍ਰਿਪਟਸ/validate-notebooks.ps1
  ਰੱਨਰ, PASS/FAIL ਨਤੀਜੇ ਬੁਝਣ ਅਤੇ ਕਿਹੜੇ ਪਾਠਾਂ ਨੂੰ ਵਾਧੂ ਸਾਧਨਾਂ ਦੀ ਲੋੜ ਹੈ (Azure AI Search,
  GitHub MCP, Foundry Local, Playwright) ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ।
---
# ਕੋਰਸ ਨਮੂਨੇ ਟੈਸਟ ਕਰਨਾ

ਇਹ ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਪਾਠ ਨੋਟਬੁੱਕ ਅਤੇ ਕੋਡ ਨਮੂਨੇ ਇੱਕ जीवਤ
Microsoft Foundry / Azure OpenAI ਸੈਟਅੱਪ ਦੇ ਖਿਲਾਫ ਚੱਲਦੇ ਹਨ। ਰਿਪੋ ਵਿੱਚ ਇੱਕ ਰਨਰ ਹੈ
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) ਜੋ
ਹਰ ਪਾਇਥਨ ਨੋਟਬੁੱਕ ਨੂੰ ਬਿਨਾਂ ਸਕਰੀਨ ਦੇ ਚਲਾਉਂਦਾ ਹੈ ਅਤੇ PASS/FAIL ਮੈਟਰਿਕਸ ਦਿਖਾਉਂਦਾ ਹੈ।

## ਕਦੋਂ ਵਰਤਣਾ ਹੈ
- "ਮੇਰੇ Azure ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਖਿਲਾਫ ਸਾਰੇ ਨੋਟਬੁੱਕ / ਨਮੂਨੇ ਸਹੀ ਹਨ ਜਾਂ ਨਹੀਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।"
- "ਪੈਕੇਜ ਅਪਗ੍ਰੇਡ ਕਰਨ ਜਾਂ ਮਾਡਲ ਬਦਲਣ ਤੋਂ ਬਾਦ ਕੋਰਸ ਨੂੰ Smoke-test ਕਰੋ।"
- "ਕਿਹੜੇ ਪਾਠ ਅਜੇ ਵੀ ਜੀਵਤ ਰੂਪ ਵਿੱਚ ਪਾਸ ਜਾਂ ਫੇਲ ਹੁੰਦੇ ਹਨ?"

ਇਸ ਨੂੰ AI Smoke Test GitHub ਕਾਰਵਾਈ ਲਈ ਵਰਤੋਂ ਨਾ ਕਰੋ (ਜੋ *ਤੈਨਾਤ* ਹੋਏ
ਏਜੰਟਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦੀ ਹੈ — ਵੇਖੋ [`tests/README.md`](../../../tests/README.md))। ਇਹ ਸਲਾਈਲ
ਨੋਟਬੁੱਕਾਂ ਨੂੰ ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਚਲਾਉਂਦੀ ਹੈ।

## ਲੋੜੀਂਦੇ ਚੀਜ਼ਾਂ (ਪਹਿਲਾਂ ਚੈੱਕ ਕਰੋ)
1. **Python 3.12+** ਕੋਰਸ ਡਿਪੈਂਡੈਂਸੀਜ਼ ਨਾਲ: `python -m pip install -r requirements.txt`
   ਨਾਲ ਨਾਲ ਐਗਜ਼ੀਕਿਊਟਰ: `python -m pip install nbconvert ipykernel`।
2. **ਰਿਪੋ ਰੂਟ 'ਤੇ `.env`** ([`.env.example`](../../../../../.env.example) ਤੋਂ ਕਾਪੀ) ਲੋੜੀਂਦੇ ਘੱਟੋ ਘੱਟ:
   - `AZURE_AI_PROJECT_ENDPOINT` — Foundry ਪ੍ਰੋਜੈਕਟ ਐਂਡਪੌਇੰਟ
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — ਇੱਕ ਗੈਰ-ਡਿਪ੍ਰੀਕੇਟਡ ਡਿਪਲੌਇਮੈਂਟ (ਜਿਵੇਂ `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) ਅਤੇ `AZURE_OPENAI_DEPLOYMENT`
     ਉਹਨਾਂ ਪਾਠਾਂ ਲਈ ਜੋ ਸਿੱਧਾ Azure OpenAI ਨੂੰ ਕਾਲ ਕਰਦੇ ਹਨ (ਪਾਠ 06, 02-azure-openai, 14 ਹ್ಯಾಂਡਆਫ਼/ਹਿਊਮਨ-ਲੂਪ).
3. **`az login`** ਨੂੰ ਪੂਰਾ ਕਰੋ — ਨਮੂਨੇ `AzureCliCredential` ਨਾਲ ਪ੍ਰਮਾਣਿਤ ਹੁੰਦੇ ਹਨ (Entra ID, ਕੀਲੈਸ).
4. ਮਾਡਲ ਡਿਪਲੌਇਮੈਂਟ ਮੌਜੂਦ ਹੈ ਇਹ ਪੁਸ਼ਟੀ ਕਰੋ:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`।

## ਵੈਰਿਫਿਕੇਸ਼ਨ ਚਲਾਉਣਾ
```powershell
# ਸਾਰੇ Python ਨੋਟਬੁੱਕ (ਛੱਡਦਾ ਹੈ .NET, .venv, site-packages, translations, skill assets)
pwsh scripts/validate-notebooks.ps1

# ਇੱਕੋ ਇੱਕ ਪਾਠ, ਲੰਮਾ ਪ੍ਰਤੀ-ਸੈੱਲ ਸਮਾਂ ਸੀਮਾ ਨਾਲ
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# ਸਿਰਫ਼ ਦੱਸੋ ਕਿ ਕੀ ਚਲਾਇਆ ਜਾਵੇਗਾ (ਕੋਈ ਚਾਲੂਈ ਨਹੀਂ)
pwsh scripts/validate-notebooks.ps1 -List

# ਸਪਸ਼ਟ interpreter (ਜੇ `python` PATH ਤੇ ਨਾ ਹੋਵੇ, ਜਿਵੇਂ ਕਿ Windows Store ਦਾ ਉਪਨਾਮ)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
ਸਕ੍ਰਿਪਟ ਚਲਾਈ ਗਈਆਂ ਕਾਪੀਆਂ, ਪ੍ਰਤੀ-ਨੋਟਬੁੱਕ ਲੌਗ, ਅਤੇ `results.json` ਨੂੰ
`$env:TEMP\aiab-nbval` ਵਿੱਚ ਲਿਖਦੀ ਹੈ ਅਤੇ ਫੇਲ੍ਹਰਾਂ ਦੀ ਗਿਣਤੀ ਨਾਲ ਬਾਹਰ ਨਿਕਲਦੀ ਹੈ।

## ਨਤੀਜੇ ਸਮਝਣਾ
- `PASS` — ਨੋਟਬੁੱਕ ਸਾਰੇ ਸੈਲ ਗਲਤੀ ਬਿਨਾਂ ਸਫਲਤਾਪੂਰਕ ਚੱਲਿਆ।
- `FAIL` — ਪਹਿਲੀ `*Error` / `*Exception` ਸਤਰ ਦਿਖਾਈ ਜਾਂਦੀ ਹੈ; ਪੂਰੀ ਟਰੇਸਬੈਕ ਲਈ
  ਨਤੀਜੇ ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਮੈਚਿੰਗ `log_*.txt` ਖੋਲ੍ਹੋ।
- ਇੱਕ ਨੋਟਬੁੱਕ ਦੀ ਇੱਕਲਾ ਫੇਲ੍ਹਰ `-Timeout` ਨਾਲ ਸੀਮਿਤ ਹੁੰਦਾ ਹੈ (ਪ੍ਰਤੀ ਸੈਲ), ਇਸ ਲਈ ਲਟਕੀ ਹੋਈ
  human-in-the-loop ਸੈਲ `StdinNotImplementedError` ਵਜੋਂ ਸਾਹਮਣੇ ਆਉਂਦੀ ਹੈ ਨਾ ਕਿ ਲਟਕਣ ਵਾਂਗ।

## ਉਹ ਪਾਠ ਜਿਨ੍ਹਾਂ ਨੂੰ ਵਾਧੂ ਸਰੋਤਾਂ ਦੀ ਲੋੜ ਹੈ (ਇਨ੍ਹਾਂ ਦੇ ਬਿਨਾਂ ਫੇਲ੍ਹ ਹੋਣ ਦੀ ਉਮੀਦ ਹੈ)
| ਪਾਠ | ਵਾਧੂ ਲੋੜ |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, ਕੁੰਜੀ) — ਇੱਕ ਮੈਮੋਰੀ ਵਿੱਚ ਬੈਕਅੱਪ ਮਾਰਗ ਹੈ |
| 11 MCP / GitHub | GitHub MCP ਸਰਵਰ + PAT |
| 13 memory (cognee) | `cognee` ਇੱਕ ਮਾਡਲ ਪ੍ਰਦਾਇਕ ਨਾਲ ਸੰਰਚਿਤ |
| 15 browser-use | Playwright ਬ੍ਰਾਊਜ਼ਰਾਂ ਇੰਸਟਾਲ ਕੀਤੇ (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 local agent | Foundry ਲੋਕਲ ਰੰਨਟਾਈਮ + ਡਾਊਨਲੋਡ ਕੀਤਾ Qwen ਮਾਡਲ (ਡਿਵਾਈਸ 'ਤੇ, ਕਲਾਉਡ ਨਹੀਂ) |
| `*-dotnet-*` ਨੋਟਬੁੱਕ | .NET ਇੰਟਰਐਕਟਿਵ ਕਰਨਲ (ਮੂਲ ਰੂਪ ਵਿੱਚ ਬਾਹਰ; ਵਰਤੋ `-IncludeDotnet`) |

## ਵਾਪਸ ਰਿਪੋਰਟ ਕਰਨਾ
ਪਾਠ ਦੇ ਅਨੁਸਾਰ ਗਰੁੱਪ ਕੀਤਾ ਇੱਕ PASS/FAIL ਟੇਬਲ ਬਣਾਓ। ਅਸਲੀ ਰਿਗ੍ਰੈਸ਼ਨਾਂ
(ਮੁਰੰਮਤ ਕਰਨ ਵਾਲੇ ਕੋਡ / ਸੰਰਚਨਾ ਬੱਗ) ਨੂੰ ਵਾਤਾਵਰਨ ਦੀਆਂ ਘਟਾਂ (ਗੁੰਮ ਚੁੱਕੀ Search/Foundry Local/PAT) ਤੋਂ ਵੱਖਰਾ ਕਰੋ,
ਅਤੇ ਹਰ ਅਸਲੀ ਫੇਲ੍ਹ ਲਈ ਫੇਲ ਹੋਏ `log_*.txt` ਹਵਾਲਾ ਦਿਓ।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->