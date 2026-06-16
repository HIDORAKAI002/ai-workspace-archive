# MCP ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ - ਫਰਵਰੀ 2026 ਅਪਡੇਟ

> **ਮੌਜੂਦਾ ਮਿਆਰ**: ਇਹ ਦਸਤਾਵੇਜ਼ [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) ਦੀ ਸੁਰੱਖਿਆ ਜ਼ਰੂਰਤਾਂ ਅਤੇ ਸਰਕਾਰੀ [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।

ਮਾਡਲ ਕਾਂਟੈਕਸਟ ਪ੍ਰੋਟੋਕੋਲ (MCP) ਨੇ ਕਾਫੀ ਪ੍ਰਗਟਿ ਕੀਤੀ ਹੈ ਜਿਸ ਨਾਲ ਰਵਾਇਤੀ ਸਾਫਟਵੇਅਰ ਸੁਰੱਖਿਆ ਅਤੇ AI-ਵਿਸ਼ੇਸ਼ ਖ਼ਤਰਿਆਂ ਦੇ ਲਈ ਵਧੀਆਂ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਹੁੰਦੇ ਹਨ। ਇਹ ਦਸਤਾਵੇਜ਼ MCP ਦੀਆਂ ਸੁਰੱਖਿਅਤ ਲਾਗੂਆੰਦਾਂ ਲਈ ਵਿਸਤ੍ਰਿਤ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ ਜੋ OWASP MCP Top 10 ਫਰੇਮਵਰਕ ਦੇ ਅਨੁਕੂਲ ਹਨ।

## 🏔️ ਪ੍ਰਯੋਗਾਤਮਕ ਸੁਰੱਖਿਆ ਟ੍ਰੇਨਿੰਗ

ਵਿਆਵਹਾਰਿਕ, ਪ੍ਰਯੋਗਾਤਮਕ ਸੁਰੱਖਿਆ ਲਾਗੂ ਕਰਨ ਦੇ ਅਨੁਭਵ ਲਈ, ਅਸੀਂ **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** ਸਿਫਾਰਸ਼ ਕਰਦੇ ਹਾਂ - ਇਹ MCP ਸਰਵਰਾਂ ਨੂੰ Azure ਵਿੱਚ "ਨਾਜ਼ੁਕ → ਸ਼ੋਧ → ਸੁਧਾਰ → ਪ੍ਰਮਾਣਿਤ ਕਰੋ" ਢੰਗ ਨਾਲ ਸੁਰੱਖਿਅਤ ਕਰਨ ਲਈ ਇੱਕ ਵਿਸਤ੍ਰਿਤ ਮਾਡ়ੀ ਗਾਈਡਡ ਯਾਤਰਾ ਹੈ।

ਇਸ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਸਾਰੇ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** ਦੇ ਨਾਲ ਅਨੁਕੂਲ ਹਨ, ਜੋ OWASP MCP Top 10 ਖਤਰੇ ਲਈ ਸੰਦਰਭ ਆਰਕੀਟੈਕਚਰ ਅਤੇ Azure ਵਿਸ਼ੇਸ਼ ਲਾਗੂਆੰਦੀ ਮਦਦ ਮੁਹੱਈਆ ਕਰਦਾ ਹੈ।

## **ਲਾਜ਼ਮੀ ਸੁਰੱਖਿਆ ਲੋੜਾਂ**

### **MCP Specification ਤੋਂ ਜ਼ਰੂਰੀ ਮਨਾਹੀਆਂ:**

> **ਮਨਾਹੀ ਹੈ**: MCP ਸਰਵਰਾਂ ਨੂੰ ਉਹਨਾਂ ਟੋਕਨਜ਼ ਕਬੂਲ ਨਹੀਂ ਕਰਨੇ ਜੋ ਸਾਫ MCP ਸਰਵਰ ਲਈ ਜਾਰੀ ਨਾ ਕੀਤੇ ਗਏ ਹੋਣ  
>
> **ਪਾਬੰਦੀ ਹੈ**: MCP ਸਰਵਰਾਂ ਨੂੰ ਪ੍ਰਮਾਣਿਕਤਾ ਲਈ ਸੈਸ਼ਨਜ਼ ਦਾ ਇਸਤੇਮਾਲ ਨਹੀਂ ਕਰਨਾ ਚਾਹੀਦਾ  
>
> **ਜਰੂਰੀ ਹੈ**: ਪ੍ਰਮਾਣਿਕਤਾ ਲਾਗੂ ਕਰਨ ਵਾਲੇ MCP ਸਰਵਰਾਂ ਨੂੰ ਸਾਰੇ ਆਉਣ ਵਾਲੇ ਬਿਨਤੀਆਂ ਦੀ ਜਾਂਚ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ  
>
> **ਲਾਜ਼ਮੀ ਹੈ**: ਸਟੈਟਿਕ ਕਲਾਇੰਟ ID ਵਰਤਣ ਵਾਲੇ MCP ਪ੍ਰਾਕਸੀ ਸਰਵਰਾਂ ਨੂੰ ਹਰ ਗਤੀਸ਼ੀਲ ਰਜਿਸਟਰਡ ਕਲਾਇੰਟ ਲਈ ਉਪਭੋਗਤਾ ਦੀ ਸਹਿਮਤੀ ਲੈਣੀ ਚਾਹੀਦੀ ਹੈ

---

## 1. **ਪ੍ਰਮਾਣਿਕਤਾ ਅਤੇ ਅਧਿਕਾਰ ਨਿਯੰਤਰਣ**

### **ਬਾਹਰੀ شناخت ਪੂਰਵਪੱਖੀ ਇੰਟੀਗ੍ਰੇਸ਼ਨ**

**ਮੌਜੂਦਾ MCP ਮਿਆਰ (2025-11-25)** MCP ਸਰਵਰਾਂ ਨੂੰ ਪ੍ਰਮਾਣਿਕਤਾ ਲਈ ਬਾਹਰੀ ਪਹਚਾਣ ਪ੍ਰਦਾਤਾਵਾਂ ਨੂੰ ਸੁਪੁਰਦ ਕਰਨ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ, ਜੋ ਸੁਰੱਖਿਆ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਸੁਧਾਰ ਹੈ:

**OWASP MCP ਖ਼ਤਰਾ ਹੱਲ ਕੀਤਾ ਗਿਆ**: [MCP07 - ਅਪੁਰਣ ਪ੍ਰਮਾਣਿਕਤਾ ਅਤੇ ਅਧਿਕਾਰ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**ਸੁਰੱਖਿਆ ਲਾਭ:**
1. **ਕਸਟਮ ਪ੍ਰਮਾਣਿਕਤਾ ਖਤਰਿਆਂ ਨੂੰ ਖਤਮ ਕਰਦਾ ਹੈ**: ਕਸਟਮ ਪ੍ਰਮਾਣਿਕਤਾ ਲਾਗੂਆੰਦੀ ਤੋਂ ਬਚ ਕੇ ਜ਼ਿੰਦਗੀ ਖੇਤਰ ਘਟਾਉਂਦਾ ਹੈ  
2. **ਕਾਰੋਬਾਰੀ ਦਰਜੇ ਦੀ ਸੁਰੱਖਿਆ**: ਬਲੀਏ ਬਹੁਤ ਸੁਰੱਖਿਅਤ ਫੀਚਰਾਂ ਨਾਲ ਮਾਇਕਰੋਸਾਫਟ ਏੰਟਰਾ ID ਵਰਗੇ ਪਹਚਾਣ ਪ੍ਰਦਾਤਾਵਾਂ ਨੂੰ ਲੈਵਰਜ ਕਰਦਾ ਹੈ  
3. **ਕੇਂਦਰੀ ਪਹਚਾਣ ਪ੍ਰਬੰਧਨ**: ਉਪਭੋਗਤਾ ਜੀਵਨਚੱਕਰ, ਦਾਖਲਾ ਨਿਯੰਤਰਣ, ਅਤੇ ਅਨੁਕੂਲਤਾ নিরীক্ষਾ ਸੌਖੀ ਬਣਾਉਂਦਾ ਹੈ  
4. **ਮਲਟੀ-ਫੈਕਟਰ ਪ੍ਰਮਾਣਿਕਤਾ**: ਕਾਰੋਬਾਰੀ ਪਹਚਾਣ ਪ੍ਰਦਾਤਾਵਾਂ ਤੋਂ MFA ਸਮਰੱਥਾ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ  
5. **ਸ਼ਰਤ ਵਾਲੀ ਡਾਕੂਮੈਂਟ ਪਾਲੀਸੀਆਂ**: ਖ਼ਤਰੇ-ਅਧਾਰਿਤ ਦਾਖਲਾ ਨਿਯੰਤਰਣਾਂ ਅਤੇ ਅਨੁਕੂਲ ਪ੍ਰਮਾਣਿਕਤਾ ਦਾ ਫਾਇਦਾ ਲੈਂਦਾ ਹੈ

**ਲਾਗੂਆੰਦੀ ਦੀਆਂ ਲੋੜਾਂ:**
- **ਟੋਕਨ ਦਰਸ਼ਕ ਵੈਧਤਾ**: ਸਾਰੇ ਟੋਕਨ ਨੂੰ ਸਾਫ MCP ਸਰਵਰ ਲਈ ਖਾਸ ਤੌਰ 'ਤੇ ਜਾਰੀ ਕੀਤਾ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ  
- **ਜਾਰੀ ਕਰਨ ਵਾਲੇ ਦੀ ਜਾਂਚ**: ਟੋਕਨ ਜਾਰੀ ਕਰਨ ਵਾਲੇ ਨੂੰ ਉਮੀਦ ਕੀਤੇ ਪਹਚਾਣ ਪ੍ਰਦਾਤਾ ਨਾਲ ਮਿਲਾਉਣਾ   
- **ਦਸਤਖ਼ਤ ਦੀ ਜਾਂਚ**: ਟੋਕਨ ਦੀ ਅਖੰਡਤਾ ਦੀ ਜ਼ਰੀਨ ਸਾਂਕੀਯਕ ਜਾਂਚ  
- **ਮਿਆਦ ਪੁਸ਼ਟੀਕਰਨ**: ਟੋਕਨ ਦੀ ਉਮਰ ਦੀ ਕਟੋਟੀ ਮਿਆਦ ਦੀ ਕਾਨੂੰਨੀ ਪਾਲਣਾ  
- **ਸਕੋਪ ਜਾਂਚ**: ਟੋਕਨ ਵਿੱਚ ਮੰਗੀ ਗਈ ਕਾਰਵਾਈਆਂ ਲਈ ਯੋਗ ਅਧਿਕਾਰ ਪਾਇਆ ਜਾਣਾ

### **ਅਧਿਕਾਰ ਲਾਜਿਕ ਸੁਰੱਖਿਆ**

**ਅਹਮ ਨਿਯੰਤਰਣ:**
- **ਵਿਆਪਕ ਅਧਿਕਾਰ ਨਿਰੀਖਣ**: ਸਾਰੇ ਅਧਿਕਾਰ ਫੈਸਲੇ ਦੀ ਸੁਰੱਖਿਆ ਸਮੀਖਿਆ ਮਿਆਮੀ ਤੌਰ ਤੇ  
- **ਫੇਲ-ਸੁਰੱਖਿਅਤ ਡਿਫ਼ਾਲਟ**: ਜਦੋਂ ਅਧਿਕਾਰ ਲਾਜਿਕ ਨਿਰਣੇ ਵਿੱਚ ਅਸਫ਼ਲ ਹੋਵੇ, ਦਾਖਲਾ ਰੱਦ ਕਰੋ  
- **ਅਧਿਕਾਰ ਸਰਹੱਦਾਂ**: ਵੱਖ-ਵੱਖ ਆਧਿਕਾਰ ਸੀਮਾਵਾਂ ਅਤੇ ਸਰੋਤ ਦਾਖਲਾ ਵਿਚ ਸਾਫ ਅੰਤਰ  
- **ਨਿਰੀਖਣ ਲਾਗਿੰਗ**: ਸਾਰੇ ਅਧਿਕਾਰ ਫੈਸਲੇ ਦੀ ਪੂਰੀ ਲਾਗਿੰਗ ਸੁਰੱਖਿਆ ਦੀ ਨਿਗਰਾਨੀ ਲਈ  
- **ਨਿਯਮਤ ਦਾਖਲਾ ਸਮੀਖਿਆ**: ਉਪਭੋਗਤਾ ਅਧਿਕਾਰ ਅਤੇ ਅਧਿਕਾਰਾਂ ਦੀ ਨਿਯਮਤ ਪੁਸ਼ਟੀ

## 2. **ਟੋਕਨ ਸੁਰੱਖਿਆ ਅਤੇ ਐਂਟੀ-ਪਾਸਥਰੂ ਨਿਯੰਤਰਣ**

**OWASP MCP ਖ਼ਤਰਾ ਹੱਲ ਕੀਤਾ ਗਿਆ**: [MCP01 - ਟੋਕਨ ਮਿਸਮੈਨੇਜਮੈਂਟ ਅਤੇ ਗੁਪਤ ਖੁਲਾਸਾ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **ਟੋਕਨ ਪਾਸਥਰੂ ਰੋਕਥਾਮ**

MCP ਅਧਿਕਾਰ ਨਿਰਦੇਸ਼ਾਂ ਵਿੱਚ ਟੋਕਨ ਪਾਸਥਰੂ ਖਾਸ ਤੌਰ 'ਤੇ ਮਨਾਂ ਹੈ ਕਿਉਂਕਿ ਇਹ ਗੰਭੀਰ ਸੁਰੱਖਿਆ ਖ਼ਤਰਿਆਂ ਨੂੰ ਜਨਮ ਦਿੰਦਾ ਹੈ:

**ਸੁਰੱਖਿਆ ਖ਼ਤਰਿਆਂ:**
- **ਨਿਯੰਤਰਣ ਛਲ**: ਅਹੰਕਾਰ ਵੱਧਣ, ਬੇਨਤੀ ਪੁਸ਼ਟੀ, ਅਤੇ ਟ੍ਰੈਫਿਕ ਨਿਗਰਾਨੀ ਵਰਗੇ ਜ਼ਰੂਰੀ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣਾਂ ਨੂੰ ਪਾਸ ਕਰ ਜਾਂਦਾ ਹੈ  
- **ਜਵਾਬਦੇਹੀ ਦਾ ਖ਼ਰਾਬ ਹੋਣਾ**: ਕਲਾਇੰਟ ਦੀ ਪਹਚਾਣ ਅਸੰਭਵ ਬਣਾਉਂਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਨਿਰੀਖਣ ਟਰੇਲ ਅਤੇ ਘਟਨਾ ਜਾਂਚ ਤੋੜ ਜਾਂਦੀ ਹੈ  
- **ਪ੍ਰਾਕਸੀ ਨਾਲ ਡਾਟਾ ਚੋਰੀ**: ਬਦਮਾਸ਼ ਅਦਾਕਾਰਾਂ ਨੂੰ ਸਰਵਰਾਂ ਨੂੰ ਪ੍ਰਾਕਸੀ ਵਜੋਂ ਵਰਤਣ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ  
- **ਭਰੋਸਾ ਸਰਹੱਦ ਉਲੰਘਣਾ**: ਟੋਕਨ ਦੀ ਮੂਲ ਸਰੋਤ ਬਾਰੇ ਅਗਲੇ ਸੇਵਾ ਭਰੋਸਾ ਅੰਦਾਜ਼ਾਂ ਨੂੰ ਡਿਗਾਉਂਦਾ ਹੈ  
- **ਉਲਟਾਂ-ਫੇਰਾਂ ਦੀ ਚਾਲ**: ਕਈ ਸੇਵਾਵਾਂ 'ਚ ਟੋਕਨਾਂ ਦੀ ਸੁਰੱਖਿਆ ਤੋਂ ਬਿਨਾਂ ਵੱਡੀਆਂ ਹਮਲਾਵਾਰੀ ਵਿਸਥਾਰਾਂ ਨੂੰ ਸੁਚਾਰੂ ਬਣਾਉਂਦਾ ਹੈ

**ਲਾਗੂਆੰਦੀ ਨਿਯੰਤਰਣ:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **ਸੁਰੱਖਿਅਤ ਟੋਕਨ ਪ੍ਰਬੰਧਨ ਪੈਟਰਨ**

**ਸਰੋਤ ਸਰਵੋਤਮ ਮਿਤੀਆਂ:**
- **ਛੋਟੇ ਸਮੇਂ ਲਈ ਟੋਕਨ**: ਮੁੜ ਮੁੜ ਟੋਕਨ ਘੁੰਮਾਉਣ ਨਾਲ ਪ੍ਰਕਾਸ਼ ਦੇ ਸਮੇਂ ਨੂੰ ਘਟਾਓ  
- **ਜਸਟ-ਇਨ-ਟਾਈਮ ਜਾਰੀਅਤ**: ਖਾਸ ਕਾਰਵਾਈਆਂ ਲਈ ਹੀ ਟੋਕਨ ਜਾਰੀ ਕਰੋ  
- **ਸੁਰੱਖਿਅਤ ਸਟੋਰੇਜ਼**: ਹਾਰਡਵੇਅਰ ਸੁਰੱਖਿਆ ਮਾਡਿਊਲ (HSM) ਜਾਂ ਸੁਰੱਖਿਅਤ ਕੀ ਵੌਲਟਾਂ ਵਰਤੋ  
- **ਟੋਕਨ ਬਾਈਂਡਿੰਗ**: ਸੰਭਵ ਹੋਵੇ ਤਾਂ ਟੋਕਨ ਨੂੰ ਖਾਸ ਕਲਾਇੰਟਾਂ, ਸੈਸ਼ਨਾਂ ਜਾਂ ਕਾਰਵਾਈਆਂ ਨਾਲ ਬੰਨ੍ਹੋ  
- **ਨਿਗਰਾਨੀ ਅਤੇ ਚੇਤਾਵਨੀ**: ਟੋਕਨ ਦੀ ਗੈਰਕਾਨੂੰਨੀ ਵਰਤੋਂ ਜਾਂ ਬਿਨਾਂ ਆਗਿਆ ਦੇ ਦਾਖਲਾ ਪੈਟਰਨ ਦੇ ਵਿਚਾਰ ਨਾਲ ਤੁਰੰਤ ਪਤਾ ਲਗਾਓ

## 3. **ਸੈਸ਼ਨ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ**

### **ਸੈਸ਼ਨ ਹਾਈਜੈਕਿੰਗ ਰੋਕਥਾਮ**

**ਹਮਲਿਆਂ ਦੇ ਤਰੀਕੇ:**
- **ਸੈਸ਼ਨ ਹਾਈਜੈਕ ਪ੍ਰੋਮਪਟ ਇੰਜੈਕਸ਼ਨ**: ਸਾਂਝੇ ਸੈਸ਼ਨ ਸੂਚਨਾ ਵਿੱਚ ਮਾਲੀਸ਼ਿਯਸ ਇਵੈਂਟਾਂ ਦਾ ਇੰਜੈਕਸ਼ਨ  
- **ਸੈਸ਼ਨ ਨਕਬਜ਼ੰਦੀ**: ਚੋਰੀ ਹੋਏ ਸੈਸ਼ਨ ID ਦੀ ਅਨੁਚਿਤ ਵਰਤੋਂ ਨਾਲ ਪ੍ਰਮਾਣਿਕਤਾ ਤੋਂ ਬਚਾਓ  
- **ਪੁਨਰਾਰੰਭ ਕਰਨ ਯੋਗ ਸਟ੍ਰੀਮ ਹਮਲੇ**: ਸਰਵਰ ਭੇਜੇ ਇਵੈਂਟ ਰੀਜ਼ਿਊਮਪਸ਼ਨ ਦੀ ਬਦਨیتی ਨਾਲ ਵਰਤੋਂ

**ਲਾਜ਼ਮੀ ਸੈਸ਼ਨ ਨਿਯੰਤਰਣ:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**ਟ੍ਰਾਂਸਪੋਰਟ ਸੁਰੱਖਿਆ:**
- **HTTPS ਲਾਗੂਆੰਦੀ**: ਸਾਰੇ ਸੈਸ਼ਨ ਸੰਚਾਰ TLS 1.3 ਤੇ ਹੋਣ  
- **ਸੁਰੱਖਿਅਤ ਕੁਕੀ ਗੁਣ**: HttpOnly, Secure, SameSite=Strict  
- **ਸਰਟੀਫਿਕੇਟ ਪਿਨਿੰਗ**: MITM ਹਮਲਿਆਂ ਤੋਂ ਬਚਾਉਣ ਲਈ ਮਹੱਤਵਪੂਰਨ ਕਨੈਕਸ਼ਨਾਂ ਲਈ

### **Stateful ਅਤੇ Stateless ਵਿਚਾਰ**

**Stateful ਲਾਗੂਆੰਦੀ ਲਈ:**
- ਸਾਂਝਾ ਸੈਸ਼ਨ ਸੂਚਨਾ ਨੂੰ ਇੰਜੈਕਸ਼ਨ ਹਮਲਿਆਂ ਤੋਂ ਵਾਧੂ ਸੁਰੱਖਿਆ ਦੀ ਲੋੜ  
- ਕਿਊ-ਆਧਾਰਿਤ ਸੈਸ਼ਨ ਪ੍ਰਬੰਧਨ ਨੂੰ ਪੂਰੀ ਅਖੰਡਤਾ ਦੀ ਪੁਸ਼ਟੀਣ  
- ਕਈ ਸਰਵਰ ਇੰਸਟੈਂਸ ਲਈ ਸੁਰੱਖਿਅਤ ਸੈਸ਼ਨ ਸੂਚਨਾ ਸਿੰਕ੍ਰੋਨਾਈਜ਼ੇਸ਼ਨ

**Stateless ਲਾਗੂਆੰਦੀ ਲਈ:**
- JWT ਜਾਂ ਸਮਾਨ ਟੋਕਨ-ਆਧਾਰਿਤ ਸੈਸ਼ਨ ਪ੍ਰਬੰਧਨ  
- ਸੈਸ਼ਨ ਸੂਚਨਾ ਦੀ ਸਾਂਕੀਯਕ ਜਾਂਚ  
- ਹਮਲਿਆਂ ਦਾ ਖੇਤਰ ਘੱਟ ਹੁੰਦਾ ਹੈ ਪਰ ਮਜ਼ਬੂਤ ਟੋਕਨ ਵੈਧਤਾ ਦੀ ਲੋੜ

## 4. **AI-ਵਿਸ਼ੇਸ਼ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ**

**OWASP MCP ਖ਼ਤਰਿਆਂ ਨੂੰ ਹੱਲ ਕੀਤਾ:**
- [MCP06 - ਇਰਾਦਾ ਫਲੋ	subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - ਟੂਲ ਜ਼ਹਿਰਲੀਕਰਨ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - ਆਦੇਸ਼ ਇੰਜੈਕਸ਼ਨ ਅਤੇ ਕਾਰਗੁਜ਼ਾਰੀ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **ਪ੍ਰੋਮਪਟ ਇੰਜੈਕਸ਼ਨ ਰੋਕਥਾਮ**

**Microsoft Prompt Shields ਇੰਟੀਗ੍ਰੇਸ਼ਨ:**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**ਲਾਗੂਆੰਦੀ ਨਿਯੰਤਰਣ:**
- **ਇੰਪੁਟ ਸੈਨਿਟਾਈਜ਼ੇਸ਼ਨ**: ਸਾਰੇ ਉਪਭੋਗਤਾ ਇੰਪੁਟਾਂ ਦਾ ਵਿਸਤ੍ਰਿਤ ਪੁਸ਼ਟੀ ਅਤੇ ਫਿਲਟਰੇਸ਼ਨ  
- **ਸਮੱਗਰੀ ਸਹਿਮਿਤ ਸਰਹੱਦ**: ਸਿਸਟਮ ਨਿਰਦੇਸ਼ਾਂ ਅਤੇ ਉਪਭੋਗਤਾ ਸਮੱਗਰੀ ਵਿਚ ਸਾਫ ਵੱਖਰਾ  
- **ਨਿਰਦੇਸ਼ ਲੜੀਵਾਰਤਾ**: ਟਕਰਾਉਂਦੇ ਨਿਰਦੇਸ਼ਾਂ ਲਈ ਸਹੀ ਪ੍ਰਾਥਮਿਕਤਾ ਨਿਯਮ  
- **ਆਉਟਪੁੱਟ ਨਿਗਰਾਨੀ**: ਸੰਭਾਵਿਤ ਨੁਕਸਾਨਦਾਇਕ ਜਾਂ ਬਦਲੀ ਗਈ ਆਉਟਪੁੱਟ ਦੀ ਪਹਚਾਣ

### **ਟੂਲ ਜ਼ਹਿਰਲੀਕਰਨ ਰੋਕਥਾਮ**

**ਟੂਲ ਸੁਰੱਖਿਆ ਫਰੇਮਵਰਕ:**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**ਡਾਇਨਾਮਿਕ ਟੂਲ ਪ੍ਰਬੰਧਨ:**
- **ਮਨਜ਼ੂਰੀ ਕੰਮ ਪ੍ਰਵਾਹ**: ਟੂਲ ਬਦਲਾਵਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਉਪਭੋਗਤਾ ਸਹਿਮਤੀ  
- **ਰੋਲਬੈਕ ਸਮਰੱਥਾ**: ਪਿਛਲੇ ਟੂਲ ਸੰਸਕਰਣਾਂ ਵਿੱਚ ਵਾਪਸ ਜਾਣ ਦੀ ਸਮਰੱਥਾ  
- **ਬਦਲਾਵ ਨਿਰੀਖਣ**: ਟੂਲ ਪਰਿਭਾਸ਼ਾ ਬਦਲਾਵਾਂ ਦਾ ਪੂਰਾ ਇਤਿਹਾਸ  
- **ਖ਼ਤਰਾ ਮੁਲਾਂਕਣ**: ਟੂਲ ਸੁਰੱਖਿਆ ਸਥਿਤੀ ਦੀ ਸਵੈਚਾਲਿਤ ਮੁਲਾਂਕਣ

## 5. **Confused Deputy ਹਮਲੇ ਦੀ ਰੋਕਥਾਮ**

### **OAuth ਪ੍ਰਾਕਸੀ ਸੁਰੱਖਿਆ**

**ਹਮਲਿਆਂ ਦੀ ਰੋਕਥਾਮ ਨਿਯੰਤਰਣ:**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**ਲਾਗੂਆੰਦੀ ਲੋੜਾਂ:**
- **ਉਪਭੋਗਤਾ ਸਹਿਮਤੀ ਜਾਂਚ**: ਗਤੀਸ਼ੀਲ ਕਲਾਇੰਟ ਰਜਿਸਟਰੇਸ਼ਨ ਲਈ ਸਹਿਮਤੀ ਸਕਰੀਨ ਨਾ ਛੱਡੋ  
- **ਰੀਡਾਇਰੈਕਟ URI ਦੀ ਪੁਸ਼ਟੀ**: ਰੀਡਾਇਰੈਕਸ਼ਨ ਮੰਜ਼ਿਲਾਂ ਦੀ ਕਠੋਰ ਵ੍ਹਾਈਟਲਿਸਟ ਜਾਂਚ  
- **ਅਧਿਕਾਰ ਕੋਡ ਸੁਰੱਖਿਆ**: ਛੋਟੇ ਸਮੇਂ ਵਾਲੇ ਕੋਡ ਅਤੇ ਇਕ-ਵਾਰ ਵਰਤੋਂ ਦੀ ਲਾਗੂਆੰਦੀ  
- **ਕਲਾਇੰਟ ਪਹਚਾਣ ਪੁਸ਼ਟੀ**: ਕਲਾਇੰਟ ਪ੍ਰਮਾਣਪੱਤਰਾਂ ਅਤੇ ਮੈਟਾਡੇਟਾ ਦੀ ਮਜ਼ਬੂਤ ਜਾਂਚ

## 6. **ਟੂਲ ਏਗਜ਼ੀਕਿੂਸ਼ਨ ਸੁਰੱਖਿਆ**

### **ਸੈਂਡਬਾਕਸਿੰਗ ਅਤੇ ਵੱਖਰੇਪਣ**

**ਕੰਟੇਨਰ-ਆਧਾਰਿਤ ਵੱਖਰੇਪਣ:**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**ਪ੍ਰਕਿਰਿਆ ਵੱਖਰੇਪਣ:**
- **ਅਲੱਗ ਅਲੱਗ ਪ੍ਰਕਿਰਿਆ ਪਰਿਦ੍ਰਿਸ਼**: ਹਰ ਇੱਕ ਟੂਲ ਚਲਾਉਣ ਦਾ ਅਲੱਗ ਪ੍ਰਕਿਰਿਆ ਖੇਤਰ  
- **ਇੰਟਰ-ਪ੍ਰਕਿਰਿਆ ਸੰਚਾਰ**: ਪੁਸ਼ਟੀ ਨਾਲ ਸੁਰੱਖਿਅਤ IPC ਮਕੈਨਿਜ਼ਮ  
- **ਪ੍ਰਕਿਰਿਆ ਨਿਗਰਾਨੀ**: ਚਲਣ ਸਮੇਂ ਦੇ ਵਰਤਾਲ ਅਤੇ ਅਸਧਾਰਨ ਪਛਾਣ  
- **ਸੰਸਾਧਨ ਲਾਗੂਆੰਦੀ**: CPU, ਮੈਮੋਰੀ ਤੇ I/O ਕਾਰਵਾਈਆਂ 'ਤੇ ਕਠੋਰ ਸੀਮਤਾਂ

### **ਘੱਟੋ-ਘੱਟ ਅਧਿਕਾਰ ਲਾਗੂਆੰਦੀ**

**ਅਧਿਕਾਰ ਪ੍ਰਬੰਧਨ:**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. **ਸਪਲਾਈ ਚੇਨ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ**

**OWASP MCP ਖ਼ਤਰਾ ਹੱਲ ਕੀਤਾ ਗਿਆ**: [MCP04 - ਸਾਫਟਵੇਅਰ ਸਪਲਾਈ ਚੇਨ ਹਮਲੇ ਅਤੇ ਨਿਰਭਰਤਾ ਹਥਿਆਰਬੰਦੀ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **ਨਿਰਭਰਤਾ ਜਾਂਚ**

**ਵਿਸਤ੍ਰਿਤ ਘਟਕਾ ਸੁਰੱਖਿਆ:**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **ਲਗਾਤਾਰ ਨਿਗਰਾਨੀ**

**ਸਪਲਾਈ ਚੇਨ ਖ਼ਤਰੇ ਦੀ ਪਹਚਾਣ:**
- **ਨਿਰਭਰਤਾ ਸਿਹਤ ਨਿਗਰਾਨੀ**: ਸਾਰੇ ਨਿਰਭਰਤਿਆਂ ਦੀ ਸੁਰੱਖਿਆ ਮੁੱਦਿਆਂ ਲਈ ਲਗਾਤਾਰ ਮੁਲਾਂਕਣ  
- **ਖ਼ਤਰੇ ਬੁੱਧਿਮਤਾ ਇੰਟੀਗ੍ਰੇਸ਼ਨ**: ਉਗ ਰਹੇ ਸਪਲਾਈ ਚੇਨ ਧਮਕੀਆਂ ਲਈ ਤੁਰੰਤ ਅੱਪਡੇਟ  
- **ਵਿਹਾਰਕ ਵਿਸ਼ਲੇਸ਼ਣ**: ਬਾਹਰੀ ਘਟਕਿਆਂ ਵਿੱਚ ਅਸਧਾਰਨ ਵਿਹਾਰ ਦੀ ਪਛਾਣ  
- **ਸਵੈਚਾਲਿਤ ਕਾਰਵਾਈ**: ਸੰਕਟਗ੍ਰਸਤ ਘਟਕਿਆਂ ਦੀ ਤੁਰੰਤ ਰੋਕਥਾਮ

## 8. **ਨਿਗਰਾਨੀ ਅਤੇ ਪਹਚਾਣ ਨਿਯੰਤਰਣ**

**OWASP MCP ਖ਼ਤਰਾ ਹੱਲ ਕੀਤਾ ਗਿਆ**: [MCP08 - ਨਿਰੀਖਣ ਅਤੇ ਟੈਲੀਮੇਟਰੀ ਦੀ ਘਾਟ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **ਸੁਰੱਖਿਆ ਜਾਣਕਾਰੀ ਅਤੇ ਘਟਨਾ ਪ੍ਰਬੰਧਨ (SIEM)**

**ਵਿਆਪਕ ਲਾਗਿੰਗ ਰਣਨੀਤੀ:**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **ਤੁਰੰਤ ਖ਼ਤਰਾ ਪਹਚਾਣ**

**ਵਿਹਾਰਕ ਵਿਸ਼ਲੇਸ਼ਣ:**
- **ਉਪਭੋਗਤਾ ਵਿਹਾਰ ਵਿਸ਼ਲੇਸ਼ਣ (UBA)**: ਅਸਧਾਰਨ ਉਪਭੋਗਤਾ ਦਾਖਲਾ ਪੈਟਰਨ ਦੀ ਪਛਾਣ  
- **ਐਂਟਿਟੀ ਵਿਹਾਰ ਵਿਸ਼ਲੇਸ਼ਣ (EBA)**: MCP ਸਰਵਰ ਅਤੇ ਟੂਲ ਵਿਹਾਰ ਦੀ ਨਿਗਰਾਨੀ  
- **ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਅਸਧਾਰਨ ਪਹਚਾਣ**: AI-ਚਲਿਤ ਸੁਰੱਖਿਆ ਧਮਕੀਆਂ ਦੀ ਪਛਾਣ  
- **ਖ਼ਤਰਾ ਬੁੱਧਿਮਤਾ ਸੰਬੰਧ**: ਜਾਣੇ ਮਾਣੇ ਹਮਲੇ ਦੇ ਪੈਟਰਨਾਂ ਵਿਰੁੱਧ ਮੌਜੂਦਾ ਗਤਿਵਿਧੀਆਂ ਦੀ ਤੁਲਨਾ

## 9. **ਘਟਨਾ ਪ੍ਰਤੀਕਿਰਿਆ ਅਤੇ ਪੂਨਰ ਕਵਰੇਜ**

### **ਆਪੋ-ਆਪ ਖ਼ਤਰਾ ਪ੍ਰਤੀਕਿਰਿਆ ਸਮਰੱਥਾ**

**ਤੁਰੰਤ ਪ੍ਰਤੀਕਿਰਿਆ ਕਾਰਵਾਈ:**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **ਫੋਰੈਂਜ਼ਿਕ ਸਮਰੱਥਾ**

**ਜਾਂਚ ਸਹਾਇਤਾ:**
- **ਨਿਰੀਖਣ ਟਰੇਲ ਸੁਰੱਖਿਆ**: ਅਟੁੱਟ ਲਾਗਿੰਗ ਸਾਂਕੀਯਕ ਅਖੰਡਤਾ ਨਾਲ  
- **ਸਬੂਤ ਸੰਕਲਨ**: ਸਬੰਧਤ ਸੁਰੱਖਿਆ ਦਸਤਾਅਵੇਜ਼ਾਂ ਦਾ ਸਵੈਚਾਲਿਤ ਸੰਕਲਨ  
- **ਘਟਨਾ ਕ੍ਰਮਬੱਧ ਰੀਕੰਸਟ੍ਰਕਸ਼ਨ**: ਸੁਰੱਖਿਆ ਘਟਨਾਵਾਂ ਤੱਕ ਲੀਡ ਕਰਨ ਵਾਲੀ ਵਿਸਥਾਰਿਤ ਘਟਨਾ ਲੜੀ  
- **ਪ੍ਰਭਾਵ ਅਨੁਮਾਨ**: ਸਮਾਂਝੌਤ-ਪ੍ਰਭਾਵ ਅਤੇ ਡਾਟਾ ਪਰਦਰਸ਼ਨ ਦਾ ਮੁਲਾਂਕਣ

## **ਮੁੱਖ ਸੁਰੱਖਿਆ ਆਰਕੀਟੈਕਚਰ ਨੀਤੀਆਂ**

### **ਗਹਿਰਾਈ ਵਿੱਚ ਰੱਖਿਆ**
- **ਕਈ ਸੁਰੱਖਿਆ ਪਰਤਾਂ**: ਸੁਰੱਖਿਆ ਆਰਕੀਟੈਕਚਰ ਵਿੱਚ ਕੋਈ ਇਕਲੌਤਾ ਨੁਕਸਾਨ ਬਿੰਦੂ ਨਹੀਂ  
- **ਅਤਿਰਿਕਤ ਨਿਯੰਤਰਣ**: ਅਹੰਕਾਰ ਕਾਰਜਾਂ ਲਈ ਓਵਰਲੈਪ ਕਰਦੇ ਸੁਰੱਖਿਆ ਉਪਾਅ  
- **ਫੇਲ-ਸੇਫ ਮੇਕੈਨਿਜ਼ਮ**: ਜਦੋਂ ਸਿਸਟਮ ਵਿੱਚ ਗਲਤੀ ਜਾਂ ਹਮਲਾ ਹੁੰਦਾ ਹੈ ਤਾਂ ਸੁਰੱਖਿਅਤ ਡਿਫ਼ਾਲਟ

### **ਜ਼ੀਰੋ ਟ੍ਰਸਟ ਲਾਗੂਆੰਦੀ**
- **ਕਦੇ ਨਾ ਭਰੋਸਾ ਕਰੋ, ਸਦਾ ਜੱਚੋ**: ਸਾਰੇ ਇਕਾਈਆਂ ਅਤੇ ਬਿਨਤੀਆਂ ਦੀ ਲਗਾਤਾਰ ਪੁਸ਼ਟੀ  
- **ਘੱਟੋ-ਘੱਟ ਅਧਿਕਾਰ ਦਾ ਸਿਧਾਂਤ**: ਸਾਰੇ ਹਿੱਸਿਆਂ ਲਈ ਘੱਟੋ-ਘੱਟ ਦਾਖਲਾ ਅਧਿਕਾਰ  
- **ਮਾਈਕ੍ਰੋ-ਸੈਗਮੈਂਟੇਸ਼ਨ**: ਵਿਸਥਾਰਵਿੱਚਲੀ ਨੈੱਟਵਰਕ ਅਤੇ ਦਾਖਲਾ ਨਿਯੰਤਰਣ

### **ਲਗਾਤਾਰ ਸੁਰੱਖਿਆ ਵਿਕਾਸ**
- **ਧਮਕੀ ਪਰਿਦ੍ਰਿਸ਼ ਦਾ ਪ੍ਰਭਾਵ**: ਉਭਰ ਰਹੀਆਂ ਧਮਕੀਆਂ ਨੂੰ منهن ਦੇਣ ਲਈ ਨਿਯਮਤ ਅੱਪਡੇਟ  
- **ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਕਾਰਗੁਜ਼ਾਰੀ**: ਨਿਯੰਤਰਣਾਂ ਦੀ ਲਗਾਤਾਰ ਮੁਲਾਂਕਣ ਅਤੇ ਸੁਧਾਰ  
- **ਵਿਸ਼ੇਸ਼ਤਾ ਆਧਾਰਿਤ ਅਨੁਕੂਲਤਾ**: ਵਿਕਸਤ ਹੋ ਰਹੇ MCP ਸੁਰੱਖਿਆ ਮਿਆਰਾਂ ਨਾਲ ਸਹਿਮਤ

---

## **ਲਾਗੂਆੰਦੀ ਸੰਸਾਧਨ**

### **ਸਰਕਾਰੀ MCP ਦਸਤਾਵੇਜ਼**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP ਸੁਰੱਖਿਆ ਸੰਸਾਧਨ**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - ਵਿਸਤ੍ਰਿਤ OWASP MCP Top 10 ਅਤੇ Azure ਲਾਗੂਆੰਦੀ  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - ਸਰਕਾਰੀ OWASP MCP ਸੁਰੱਖਿਆ ਖ਼ਤਰਿਆ  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure 'ਤੇ MCP ਲਈ ਪ੍ਰਯੋਗਾਤਮਕ ਸੁਰੱਖਿਆ ਟ੍ਰੇਨਿੰਗ

### **ਮਾਇਕਰੋਸਾਫਟ ਸੁਰੱਖਿਆ ਹੱਲ**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **ਸੁਰੱਖਿਆ ਮਿਆਰ**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **ਜ਼ਰੂਰੀ**: ਇਹ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਮੌਜੂਦਾ MCP ਨਿਰਦੇਸ਼ (2025-11-25) ਨੂੰ ਦਰਸਾਉਂਦੇ ਹਨ। ਹਰ ਵੇਲੇ [ਸਰਕਾਰੀ ਦਸਤਾਵੇਜ਼](https://spec.modelcontextprotocol.io/) ਨਾਲ ਮੁਕਾਬਲਾ ਕਰੋ ਕਿਉਂਕਿ ਮਿਆਰ ਤੇਜ਼ੀ ਨਾਲ ਵਿਕਾਸ ਕਰ ਰਹੇ ਹਨ।

## ਅੱਗੇ ਕੀ ਹੈ

- ਵਾਪਸ ਜਾਓ: [ਸੁਰੱਖਿਆ ਮੋਡੀਊਲ ਓਵਰਵਿਊ](./README.md)
- ਜਾਰੀ ਰੱਖੋ: [ਮੋਡੀਊਲ 3: ਸ਼ੁਰੂਆਤ](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->