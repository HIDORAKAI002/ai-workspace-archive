# MCP ಭದ್ರತಾ ನಿಯಂತ್ರಣಗಳು - ಫೆಬ್ರವರಿ 2026 ನವೀಕರಣ

> **ಪ್ರಸ್ತುತ ಮಾನಕ**: ಈ ದಾಖಲೆಯು [MCP ನಿರ್ದಿಷ್ಟೀಕರಣ 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) ಭದ್ರತಾ ಅವಶ್ಯಕತೆಗಳು ಮತ್ತು ಅಧಿಕೃತ [MCP ಭದ್ರತಾ ಅತ್ಯುತ್ತಮ ಅಭ್ಯಾಸಗಳು](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) ಅನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ.

ಮಾದರಿ ಸಂಧರ್ಭ ಪ್ರೋಟೋಕಾಲ್ (MCP) ಪರಂಪರাগত ಸಾಫ್ಟ್‌ವೇರ್ ಭದ್ರತೆ ಮತ್ತು ಎಐ-ವೈಶಿಷ್ಟ್ಯಮಯ ಅಪಾಯಗಳನ್ನು ಉದ್ದೇಶಿಸುತ್ತಿರುವ ಸುಧಾರಿತ ಭದ್ರತಾ ನಿಯಂತ್ರಣಗಳೊಂದಿಗೆ ಮಹತ್ವದ ಮಟ್ಟಿಗೆ ಮಚುನಾಗಿದೆ. ಈ ದಾಖಲೆ, OWASP MCP ಟಾಪ್ 10 ಫ್ರೇಮ್‌워크ಗೆ ಹೊಂದಿಕೆಯಾಗಿರುವ ಸುರಕ್ಷಿತ MCP ಜಾರುಗಳುಗಾಗಿ ಸಮಗ್ರ ಭದ್ರತಾ ನಿಯಂತ್ರಣಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.

## 🏔️ ಪ್ರಾಯೋಗಿಕ ಭದ್ರತಾ ತರಬೇತಿ

ಪ್ರಾಯೋಗಿಕ, ಕೈಗಳ ಮೇಲೆ ಭದ್ರತಾ ಜಾರಿಗೆ ಅನುಭವಕ್ಕಾಗಿ, ನಾವು **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** ಅನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ - ಇದು "ದೌರ್ಜನ್ಯ → ಶೋಷಣೆ → ಸರಿಪಡಿಸು → ಮಾನ್ಯತೆ" ವಿಧಾನಶಾಸ್ತ್ರವನ್ನು ಬಳಸಿ ಅಜೂರ್‌ನಲ್ಲಿ MCP ಸರ್ವರ್‌ಗಳನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸುವ комплекс ಮಾರ್ಗದರ್ಶಿತ ಪ್ರವಾಸ.

ಈ ದಾಖಲೆಗಿನ ಎಲ್ಲಾ ಭದ್ರತಾ ನಿಯಂತ್ರಣಗಳು **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** ಗೆ ಹೊಂದಿಕೆಯಾಗಿವೆ, ಇದು OWASP MCP Top 10 ಅಪಾಯಗಳಿಗೆ ಆಧಾರಿತ ಸಂರಚನೆಗಳು ಮತ್ತು ಅಜೂರ್-ವೈಶಿಷ್ಟ್ಯಮಯ ಜಾರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.

## **ಅಗತ್ಯಭೂತ ಭದ್ರತಾ ಅವಶ್ಯಕತೆಗಳು**

### **MCP ನಿರ್ದಿಷ್ಟೀಕರಣದಿಂದ ಗಂಭೀರ ನಿರ್ಬಂಧಗಳು:**

> **ನಿಷೇಧಿತ**: MCP ಸರ್ವರ್‌ಗಳು **MCP ಸರ್ವರ್‌ಗೆ ಸ್ಪಷ್ಟವಾಗಿ ನೀಡದ ಯಾವುದೇ ಟೋಕನ್ ಅನ್ನು ಸ್ವೀಕರಿಸುವಂತಿಲ್ಲ**
>
> **ನಿಷಿದ್ಧ**: MCP ಸರ್ವರ್‌ಗಳು ಜನಪ್ರಮಾಣೀಕರಣಕ್ಕಾಗಿ ಸೆಶನ್‌ಗಳನ್ನು ಬಳಸದಿರಬೇಕು  
>
> **ಅವಶ್ಯಕ**: ಅನುಮೋದನೆ ಜಾರಿಗೆ ತೆಗೆಯುವ MCP ಸರ್ವರ್‌ಗಳು ಎಲ್ಲಾ ಬಲುಪಟ್ಟಿ ವಿನಂತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಬೇಕು
>
> **ಕಡ್ಡಾಯ**: ಸ್ಥಿರ ಕ್ಲೈಂಟ್ IDಗಳನ್ನು ಬಳಸಿ MCP ಪ್ರಾಕ್ಸಿ ಸರ್ವರ್‌ಗಳು ಪ್ರತಿ ಸಕ್ರಿಯವಾಗಿ ನೋಂದಾಯಿತ ಕ್ಲೈಂಟ್‌ಗಾಗಿ ಬಳಕೆದಾರರ ಅನುಮತಿಯನ್ನು ಪಡೆಯಬೇಕು

---

## 1. **ಜನಪ್ರಮಾಣೀಕರಣ ಮತ್ತು ಅನುಮೋದನೆ ನಿಯಂತ್ರಣಗಳು**

### **ಬಾಹ್ಯ ಗುರುತಿನ ಪೂರೈಕೆದಾರರ ಏಕರೂಪತೆ**

**ಪ್ರಸ್ತುತ MCP ಮಾನಕ (2025-11-25)** MCP ಸರ್ವರ್‌ಗಳಿಗೆ ಹೊರಗಿನ ಗುರುತಿನ ಪೂರೈಕೆದಾರರಿಗೆ ಜನಪ್ರಮಾಣೀಕರಣವನ್ನು ನಿಯೋಜಿಸುವ ಅವಕಾಶವನ್ನು ಒದಗಿಸುತ್ತದೆ, ಇದು ಗಂಭೀರ ಭದ್ರತಾ ಸುಧಾರಣೆಯಾಗಿದೆ:

**OWASP MCP ಅಪಾಯವನ್ನು ಸರಿಪಡಿಸಲಾಗಿದೆ**: [MCP07 - ಅಪ್ರತಿಪಾದಿತ ಜನಪ್ರಮಾಣೀಕರಣ ಮತ್ತು ಅನುಮೋದನೆ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**ಭದ್ರತಾ ಲಾಭಗಳು:**
1. **ಕಸ್ಟಮ್ ಜನಪ್ರಮಾಣೀಕರಣ ಅಪಾಯಗಳ ನಿವಾರಣೆ**: ಕಸ್ಟಮ್ ಜನಪ್ರಮಾಣೀಕರಣ ಜಾರಿಗೆ ತೊಳಪಿಸುಗಳಿಂದ ಭದ್ರತಾ ಅಪಾಯವನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು
2. **ಎಂಟರ್‌ಪ್ರೈಸ್-ಮಟ್ಟದ ಭದ್ರತೆ**: ಅಭಿವೃದ್ಧಿಯಾದ ಭದ್ರತಾ ವೈಶಿಷ್ಟ್ಯಗಳೊಂದಿಗೆ ಮೈಕ್ರೋಸಾಫ್ಟ್ ಎಂಟ್ರಾ ID ಮುಂತಾದ ಸನಿಹ ಗುರುತಿನ ಪೂರೈಕೆದಾರರನ್ನು ಉಪಯೋಗಿಸುವುದು
3. **ಕೇಂದ್ರೀಕೃತ ಗುರುತು ನಿರ್ವಹಣೆ**: ಬಳಕೆದಾರರ ಜೀವನಚರಿತ್ರೆ ನಿರ್ವಹಣೆ, ಪ್ರವೇಶ ನಿಯಂತ್ರಣ ಮತ್ತು ಅನುಕೂಲಪಟ್ಟಿ ಪರಿಶೀಲನೆಯನ್ನು ಸುಗಮಗೊಳಿಸುವುದು
4. **ಬಹು-ಘಟಕ ಜನಪ್ರಮಾಣೀಕರಣ**: ಎಂಟರ್‌ಪ್ರೈಸ್ ಗುರುತಿನ ಪೂರೈಕೆದಾರರಿಂದ MFA ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಉತ್ತರೋತ್ತರವಾಗಿ ಪಡೆಯುವುದು
5. **ಶರತ್ತಿನ ಪ್ರವೇಶ ನೀತಿಗಳು**: ಅಪಾಯಾಧಾರಿತ ಪ್ರವೇಶ ನಿಯಂತ್ರಣಗಳು ಮತ್ತು ಅನುಗುಣ ಜನಪ್ರಮಾಣೀಕರಣಕ್ಕೆ ಪ್ರಯೋಜನಗಳು

**ಜಾರಿಗೆ ಸಂಬಂಧಿಸಿದ ಅವಶ್ಯಕತೆಗಳು:**
- **ಟೋಕನ್ ಪ್ರೇಕ್ಷಕ ವಿಲಕ್ಷಣೀಕರಣ**: ಎಲ್ಲಾ ಟೋಕನ್‌ಗಳು MCP ಸರ್ವರ್‌ಗೆ ಸ್ಪಷ್ಟವಾಗಿ ನೀಡಲಾದವು ಎಂದು ಪರಿಶೀಲಿಸಬೇಕು
- **ನೀಡುವವರ ಪರಿಶೀಲನೆ**: ಟೋಕನ್ ನೀಡುವವರ ಗುರುತಿನ ಪೂರೈಕೆದಾರ ಭರವಸೆ ಪರಿಶೀಲನೆ
- **ಹಸ್ತಾಕ್ಷರ ಪರಿಶೀಲನೆ**: ಟೋಕನ್ ಸಮಗ್ರತೆಯ ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಪರಿಶೀಲನೆ
- **ಕಾಲಪರಿಧಿ ಜಾರಿ**: ಟೋಕನ್ ಜೀವನಾವಧಿ ಮಿತಿ ಕಠಿಣ ಜಾರಿಗೆ
- **ವ್ಯಾಪ್ತಿಯ ಪರಿಶೀಲನೆ**: ಟೋಕನ್ಗಳು ವಿನಂತಿಸಿದ ಕಾರ್ಯಗಳಿಗೆ ಯೋಗ್ಯ ಅನುಮತಿಗಳನ್ನು ಹೊಂದಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ

### **ಅನುಮೋದನೆ ತರ್ಕ ಭದ್ರತೆ**

**ಮಹತ್ತರ ನಿಯಂತ್ರಣಗಳು:**
- **ಸಮಗ್ರ ಅನುಮೋದನೆ ಪರಿಶೀಲನೆಗಳು**: ಎಲ್ಲಾ ಅನುಮೋದನೆ ನಿರ್ಣಯ ಬಿಂದುಗಳ ನಿಯಮಿತ ಭದ್ರತಾ ವಿಮರ್ಶೆಗಳು
- **ವಿಫಲ-ಭದ್ರತಾ ಡೀಫಾಲ್ಟ್‌ಗಳು**: ಅನುಮೋದನೆ ತರ್ಕ ನಿರ್ಣಯ ಮಾಡಲು ಸಾಧ್ಯವಾಗದಾಗ ಪ್ರವೇಶ ನಿರಾಕರಿಸುವುದು
- **ಅನುಮತಿ ಗಡಿಗಳನ್ನು ಸ್ಪಷ್ಟಗೊಳಿಸುವುದು**: ವಿಭಿನ್ನ ಹಕ್ಕುಮಟ್ಟಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲ ಪ್ರವೇಶಗಳ ನಡುವಿನ ಸ್ಪಷ್ಟ ವಿಭಜನೆ
- **ಪರಿಶೀಲನೆ ಲಾಗಿಂಗ್**: ಭದ್ರತಾ ಮೇಲ್ವಿಚಾರಣೆಗೆ ಎಲ್ಲಾ ಅನುಮೋದನೆ ನಿರ್ಣಯಗಳ ಸಂಪೂರ್ಣ ಲಾಗಿಂಗ್
- **ನಿಯಮಿತ ಪ್ರವೇಶ ಪರಿಶೀಲನೆಗಳು**: ಬಳಕೆದಾರ ಹಕ್ಕುಗಳು ಮತ್ತು ಹಕ್ಕು ನಿಯೋಜನೆಗಳ ನಿಯಮಿತ ಪರಿಶೀಲನೆ

## 2. **ಟೋಕನ್ ಭದ್ರತೆ ಮತ್ತು ವಿರುದ್ಧ-ಪಾಸ್ಸ್‌ಥ್ರೂ ನಿಯಂತ್ರಣಗಳು**

**OWASP MCP ಅಪಾಯದ ಪರಿಹಾರ**: [MCP01 - ಟೋಕನ್ ನಿರ್ವಹಣೆ ತಪ್ಪು ಮತ್ತು ರಹಸ್ಯ ಬಿಚ್ಚು](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **ಟೋಕನ್ ಪಾಸ್ಸ್‌ಥ್ರೂ ತಡೆಯುವಿಕೆ**

**MCP ಅನುಮೋದನೆ ನಿರ್ದಿಷ್ಟೀಕರಣದಲ್ಲಿ ಟೋಕನ್ ಪಾಸ್ಸ್‌ಥ್ರೂ ಸ್ಪಷ್ಟವಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ** ಏಕೆಂದರೆ ಗಂಭೀರ ಭದ್ರತಾ ಅಪಾಯಗಳಿವೆ:

**ನಿರಾಕರಿಸಲಾದ ಭದ್ರತಾ ಅಪಾಯಗಳು:**
- **ನಿಯಂತ್ರಣಗಳು ತಿದ್ದಿಸುವಿಕೆ**: ದರ-ಮર્યಾದಿಸುವಿಕೆ, ಬಲಪರಿಶೀಲನೆ, ಮತ್ತು ಟ್ರಾಫಿಕ್ ಮೇಲ್ವಿಚಾರಣೆಯಂತಹ ನಿಯಂತ್ರಣಗಳನ್ನು ಪಾರಾಗುವುದು
- **ಲೇಖಾಚಾರ ಯತ್ನ ಬೀಳಿಕೆ**: ಕ್ಲೈಂಟ್ ಗುರುತಿಸುವಿಕೆ ಸಾಧ್ಯವಿಲ್ಲದ ನಿರೀಕ್ಷೆಗೆ ಕಾರಣವಾಗುವುದು, ಲಾಗ್ ಟ್ರೇಲ್ಗಳಿಗೆ ಹಾನಿ ಆಗುವುದು
- **ಪ್ರಾಕ್ಸಿ ಆಧಾರಿತ ಅಕ್ರಮ ಸಂಚಾರ**: ಅನಧಿಕೃತ ಡೇಟಾ ಪ್ರವೇಶಕ್ಕಾಗಿ ಸರ್ವರ್‌ಗಳನ್ನು ಪ್ರಾಕ್ಸಿಗಳಾಗಿ ದುರುದ್ದೇಶಿ ವ್ಯಕ್ತಿಗಳು ಉಪಯೋಗಿಸುವ ಸಾಧ್ಯತೆ
- **ವಿಶ್ವಾಸ ಗಡಿಯನ್ನು ಉಲ್ಲಂಘನೆ**: ಟೋಕನ್ ಮೂಲಗಳ ಕುರಿತು ಕೆಳಗಿನ ಸೇವೆಗಳ ವಿಶ್ವಾಸದ ಊಹೆಗಳನ್ನು ಮರೆಮಾಚುವುದು
- **ಪಕ್ಕ ಸಂಬಂಧ ಮೌಢ್ಯವಾಡು**: ತೊಂದರೆಗೊಳ್ಳುವ ಟೋಕನ್ಗಳು ಅನೇಕ ಸೇವೆಗಳ ಮೂಲಕ ದಾಳಿಯನ್ನು ವಿಸ್ತರಿಸಲು ಸಹಾಯಮಾಡುತ್ತವೆ

**ಜಾರಿಗೆ ನಿಯಂತ್ರಣಗಳು:**
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

### **ಭದ್ರ ಟೋಕನ್ ನಿರ್ವಹಣಾ ಮಾದರಿಗಳು**

**ಅತ್ಯುತ್ತಮ ಅಭ್ಯಾಸಗಳು:**
- **ಕೀಳು ಕಾಲಾವಧಿಯ ಟೋಕನ್ಗಳು**: ಟೋಕನ್ ತಿರುಗಾಟದ ಮೂಲಕ ಬಿಚ್ಚು ಕಿಟಕಿಯನ್ನು ಕಡಿಮೆಮಾಡಿ
- **ತಕ್ಷಣ ನೀಡುವಿಕೆ**: ನಿರ್ದಿಷ್ಟ ಕಾರ್ಯಗಳಿಗೆ ಮಾತ್ರ ಟೋಕನ್ಗಳನ್ನು ನೀಡುವುದು
- **ಭದ್ರ ಸಂಗ್ರಹಣೆ**: ಹಾರ್ಡ್‌ವೇರ್ ಭದ್ರತಾ ಘಟಕಗಳು (HSMs) ಅಥವಾ ಸುರಕ್ಷಿತ ಕೀ ವಾಲ್ಟ್‌ಗಳನ್ನು ಉಪಯೋಗಿಸಿ
- **ಟೋಕನ್ ಬಂಧನ**: ಸಾಧ್ಯವಾದಲ್ಲಿ ಟೋಕನ್‌ಗಳನ್ನು ನಿರ್ದಿಷ್ಟ ಕ್ಲೈಂಟ್, ಸೆಷನ್ ಅಥವಾ ಕಾರ್ಯಗಳಿಗೆ ಬಂಧಿಸಿ
- **ಮಾಡಿಟರಿಂಗ್ ಮತ್ತು ಎಚ್ಚರಿಕೆ**: ಟೋಕನ್ ದುರupyೋಗ ಅಥವಾ ಅನಧಿಕೃತ ಪ್ರವೇಶ ಮಾದರಿಗಳ实时 ಪತ್ತೆ

## 3. **ಸೆಶನ್ ಭದ್ರತೆ ನಿಯಂತ್ರಣಗಳು**

### **ಸೆಶನ್ ಹೈಜ್ಯಾಕಿಂಗ್ ತಡೆ**

**ದಾಳಿಗಳ ಮಾರ್ಗಗಳು:**
- **ಸೆಶನ್ ಹೈಜ್ಯಾಕ್ ಪ್ರಾಂಪ್ಟ್ ಇಂಜೆಕ್ಷನ್**: ಹಾನಿಕರ ಘಟನೆಯನ್ನು ಹಂಚಿಕೊಂಡ ಸೆಶನ್ ಸ್ಥಿತಿಯಲ್ಲಿ ಪ್ರಸಾರ ಮಾಡುವುದು
- **ಸೆಶನ್ ಹೋಲಿಕೆ**: ಮೊರೆಯಾದ ಸೆಶನ್ ID ಗಳನ್ನು ಅನಧಿಕೃತವಾಗಿ ಬಳಸಿ ಜನಪ್ರಮಾಣೀಕರಣವನ್ನು ತಾಗುವುದು
- **ಪುನರುತ್ಥಾನ ಸ್ತ್ರೀಮ್ ದಾಳಿಗಳು**: ಹಾನಿಕರ ವಿಷಯ ಪ್ರೀತಿಯನ್ನು ಈಡೇರಿಸಲು ಸರ್ವರ್-ನಿರ್ದಿಷ್ಟ ಘಟಕ ಪುನರುತ್ಥಾನವನ್ನು ದುರುದ್ದೇಶಿಸುವುದು

**ಕಡ್ಡಾಯ ಸೆಶನ್ ನಿಯಂತ್ರಣಗಳು:**
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

**ಪ್ರವಾಹ ಭದ್ರತೆ:**
- **HTTPS ಜಾರಿ**: ಎಲ್ಲಾ ಸೆಶನ್ ಸಂವಾದಗಳು TLS 1.3 ಮೂಲಕ
- **ಭದ್ರ ಕುಕೀ ಗುಣಲಕ್ಷಣಗಳು**: HttpOnly, Secure, SameSite=Strict
- **ಸಂಕೇತ ಪತ್ರ ಪಿನ್ನಿಂಗ್**: ಮುಖ್ಯ ಸಂಪರ್ಕಗಳಿಗೆ MITM ದಾಳಿಗಳನ್ನು ತಡೆಯಲು

### **ಸ್ಥಿತಿಯ ಟಂತೆ ಗೆರೆಸು ಮತ್ತು ಅವಸ್ಥಿತಿಯ ಪರಿಗಣನೆಗಳು**

**ಸ್ಥಿತಿಗೊಳ್ಳುವ ಜಾರಿಗೆ:**
- ಹಂಚಿಕೊಳ್ಳಲಾದ ಸೆಶನ್ ಸ್ಥಿತಿಗೆ ನಿರಾಕರಣೆ ದುರುದ್ದೇಶದ ವಿಚಾರಣೆಯಿಂದ ಹೆಚ್ಚುವರಿ ರಕ್ಷಣೆ ಅಗತ್ಯ
- ಕ್ಯೂ ಆಧಾರಿತ ಸೆಶನ್ ನಿರ್ವಹಣೆಗೆ ಅಖಂಡತೆ ಪರಿಶೀಲನೆ ಅಗತ್ಯ
- ಹಲವಾರು ಸರ್ವರ್ ಸಂಚಿಕೆಗಳಿಗೆ ಸುರಕ್ಷಿತ ಸೆಶನ್ ಸ್ಥಿತಿ ಸಮಕ್ರಿಯತೆ ಹೆಚ್ಚು ಅಗತ್ಯ

**ಸ್ಥಿತಿಗೊಳ್ಳದ ಜಾರಿಗೆ:**
- JWT ಅಥವಾ ಸಾಂಕೇತಿಕ ಆಧಾರಿತ ಸೆಶನ್ ನಿರ್ವಹಣೆ
- ಸೆಶನ್ ಸ್ಥಿತಿ ಅಖಂಡತೆಯ ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಪರಿಶೀಲನೆ
- ಕಡಿಮೆ ದಾಳಿನ ಸುತ್ತು ಆದರೆ ಬಲವಾದ ಟೋಕನ್ ಪರಿಶೀಲನೆ ಅಗತ್ಯ

## 4. **ಎಐ-ವೈಶಿಷ್ಟ್ಯಭದ್ರತಾ ನಿಯಂತ್ರಣಗಳು**

**OWASP MCP ಅಪಾಯಗಳನ್ನು ಸರಿಪಡಿಸುತ್ತದೆ**:
- [MCP06 - ಪ್ರಾಂಪ್ಟ್ ಫ್ಲೋ ಸಬರ್ವರ್ಜನ್](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - ಉಪಕರಣವಿಷಕಾರಣ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - ಕಮಾಂಡ್ ಇಂಜೆಕ್ಷನ್ ಮತ್ತು ನಿರ್ವಹಣೆ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **ಪ್ರಾಂಪ್ಟ್ ಇಂಜೆಕ್ಷನ್ ರಕ್ಷಣಾ ಕ್ರಮಗಳು**

**Microsoft Prompt Shields ಏಕರೂಪತೆ:**
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

**ಜಾರಿಗೆ ನಿಯಂತ್ರಣಗಳು:**
- **ಇನ್ಪುಟ್ ನಿಷ್ಕಳಂಕೀಕರಣ**: ಎಲ್ಲಾ ಬಳಕೆದಾರ ಇನ್‌ಪುಟ್‌ಗಳ ಸಮಗ್ರ ಪರಿಶೀಲನೆ ಮತ್ತು ಫಿಲ್ಟರಿಂಗ್
- **ವಿಷಯ ಗಡಿ ವ್ಯಾಖ್ಯಾನ**: ವ್ಯವಸ್ಥೆ ನಿರ್ದೇಶನಗಳ ಮತ್ತು ಬಳಕೆದಾರ ವಿಷಯದ ಸ್ಪಷ್ಟ ವಿಭಜನೆ
- **ನಿರ್ದೇಶನೆ ಶ್ರೇಣಿಬದ್ಧತೆ**: ವಿರೋಧಾತ್ಮಕ ನಿರ್ದೇಶನಗಳಿಗೆ ಯೋಗ್ಯ ಆದ್ಯತೆ नियमಗಳು
- **ಔಟ್‌ಪುಟ್ ಮೇಲ್ವಿಚಾರಣೆ**: ಹಾನಿಕರ ಅಥವಾ ತಿದ್ದುಪಡಿ ಮಾಡಲಾದ ಔಟ್‌ಪುಟ್‌ಗಳ ಪತ್ತೆ

### **ಉಪಕರಣ ವಿಷಪೂರಣೆ ತಡೆಯುವುದು**

**ಟೂಲ್ ಭದ್ರತಾ ಚಟುವಟಿಕೆ:**
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

** ಚಲನೆಯ ಟೂಲ್ ನಿರ್ವಹಣೆ:**
- **ಅನುಮೋದನಾ ವರ್ಕ್‌ಫ್ಲೋಗಳು**: ಟೂಲ್ ಬದಲಾವಣೆಗಳಿಗೆ ಸ್ಪಷ್ಟ ಬಳಕೆದಾರ ಅನುಮತಿ
- **ಹಿಂದೆಗೆ ಹೊರಳಿಸುವ ಸಾಮರ್ಥ್ಯ**: ಹಿಂದಿನ ಟೂಲ್ ಸಂಚಿಕೆಗಳಿಗೆ ಮರುಪಡೆಸಲು ಶಕ್ತಿ
- **ಬದಲಾವಣೆ ಲಾಗಿಂಗ್**: ಟೂಲ್ ವ್ಯಾಖ್ಯಾನ ಬದಲಾವಣೆಗಳ ಸಂಪೂರ್ಣ ಇತಿಹಾಸ
- **ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ**: ಟೂಲ್ ಭದ್ರತಾ ಸ್ಥಿತಿಗತಿ ಯಂತ್ರೀಕೃತ ಮೌಲ್ಯಮಾಪನ

## 5. **ಕಾನ್ಫ್ಯೂಸ್ಡ್ ಡೆಪ್ಯೂ d ದಾಳಿ ತಡೆ**

### **OAuth ಪ್ರಾಕ್ಸಿ ಭದ್ರತೆ**

**ದಾಳಿ ತಡೆ ನಿಯಂತ್ರಣಗಳು:**
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

**ಜಾರಿಗೆ ಅಗತ್ಯಗಳು:**
- **ಬಳಕೆದಾರ ಅನುಮತಿ ಪರಿಶೀಲನೆ**: ಚಲನೆಯ ಕ್ಲೈಂಟ್ ನೋಂದಣಿಗೆ ಅನುಮತಿ ಪರದೆಗಳನ್ನು ತಪ್ಪಿಸಬೇಡಿ
- **ರೀಡೈರೆಕ್ಟ್ URI ಪರಿಶೀಲನೆ**: ರೀಡೈರೆಕ್ಷನ್ ಗುರಿಗಳನ್ನು ಕಟ್ಟುನಿಟ್ಟಿನಿಂದ ಶ್ವೇತ ಪಟ್ಟಿ ಆಧಾರಿತ ಪರಿಶೀಲನೆ
- **ಅನುಮೋದನೆ ಕೋಡ್ ರಕ್ಷಣಾ ಕ್ರಮಗಳು**: ಕೂಡಲೇ ಬಳಕೆಯ ಕೋಡ್‌ಗಳು ಮತ್ತು ಏಕಬಾರಿ ಜಾರಿ
- **ಕ್ಲೈಂಟ್ ಗುರುತಿನ ಪರಿಶೀಲನೆ**: ಕ್ಲೈಂಟ್ ಗುರುತಿನ ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ಮೆಟಾಡೇಟಾದ robust ಪರಿಶೀಲನೆ

## 6. **ಉಪಕರಣ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ ಭದ್ರತೆ**

### **ಸಾಂಡ್‌ಬಾಕ್ಸಿಂಗ್ ಮತ್ತು ವಿಭಜನೆ**

**ಕಂಟೈನರ್ ಆಧಾರಿತ ವಿಭಜನೆ:**
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

**ಪ್ರಕ್ರಿಯೆ ವಿಭಜನೆ:**
- **ತಕ್ಕ ಪ್ರಕ್ರಿಯೆ ಸಂದರ್ಭಗಳು**: ಪ್ರತಿ ಉಪಕರಣ ಕಾರ್ಯ ನಿರ್ದಿಷ್ಟ ಪ್ರಕ್ರಿಯೆ ಸ್ಥಳದಲ್ಲಿ
- **ಅಂತರ-ಪ್ರಕ್ರಿಯೆ ಸಂವಹನ**: ಪರಿಶೀಲನೆಯೊಂದಿಗೆ ಸುರಕ್ಷಿತ IPC ವಿಧಾನಗಳು
- **ಪ್ರಕ್ರಿಯೆ ಮೇಲ್ವಿಚಾರಣೆ**: ಚಾಲನಾ ಪ್ರಶ್ನೆ ಪಾಲನೆಯ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಅಸಾಮಾನ್ಯತೆ ಪತ್ತೆ
- **ಸಂಪನ್ಮೂಲ ಜಾರಿ**: CPU, ಮೆಮರಿ ಮತ್ತು I/O ಕಾರ್ಯಗಳ ಮೇಲೆ ದಟ್ಟನಿಯಂತ್ರಣ

### **ಕನಿಷ್ಠ ಹಕ್ಕು ಜಾರಿಗೆ**

**ಅನುಮತಿ ನಿರ್ವಹಣೆ:**
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

## 7. **ಸಪ್ಲೈ ಚೆನ್ ಭದ್ರತೆ ನಿಯಂತ್ರಣಗಳು**

**OWASP MCP ಅಪಾಯ ಸರಿಪಡಿಸಿದೆ**: [MCP04 - ಸಾಫ್ಟ್‌ವೇರ್ ಸರಬರಾಜು ಸರಪಳಿ ದಾಳಿಗಳು ಮತ್ತು ಅವಲಂಬನೆಗಳ ದೂರು](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **ಆಧಾರ ಪರಿಶೀಲನೆ**

**ಸಮಗ್ರ ಘಟಕ ಭದ್ರತೆ:**
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

### **ನಿರಂತರ ಮೇಲ್ವಿಚಾರಣೆ**

**ಸಪ್ಲೈ ಚೆನ್ ಅಪಾಯ ಪತ್ತೆ:**
- **ಆಧಾರದ ಆರೋಗ್ಯ ಮೇಲ್ವಿಚಾರಣೆ**: ಎಲ್ಲಾ ಅವಲಂಬನೆಗಳ ಭದ್ರತಾ ಸಮಸ್ಯೆಗಳ ನಿರಂತರ ಮೌಲ್ಯಮಾಪನ
- **ಅಪಾಯ ಬುದ್ಧಿವಂತಿಕೆ ಏಕರೂಪತೆ**: ಉದಯೋನ್ಮುಖ ಸರಪಳಿ ಅಪಾಯಗಳ实时 ನವೀಕರಣಗಳು
- **ಆಚರಣಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ**: ಬಾಹ್ಯ ಘಟಕಗಳಲ್ಲಿ ಅಸಾಮಾನ್ಯ ವರ್ತನೆಯ ಪತ್ತೆ
- **ಸ್ವಯಂಚಾಲಿತ ಪ್ರತಿಕ್ರಿಯೆ**: ಹರಿವುಗೊಂಡ ಘಟಕಗಳ ತಕ್ಷಣದ ನಿಯಂತ್ರಣ

## 8. **ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಪತ್ತೆ ನಿಯಂತ್ರಣಗಳು**

**OWASP MCP ಅಪಾಯ ಸರಿಪಡಿಸಿದೆ**: [MCP08 - ಲಾಗಿಂಗ್ ಮತ್ತು ಟೆಲೆಮೆಟ್ರಿಯ ಕೊರತೆ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **ಭದ್ರತಾ ಮಾಹಿತಿ ಮತ್ತು ಘಟನೆ ನಿರ್ವಹಣೆ (SIEM)**

**ಸಮಗ್ರ ಲಾಗಿಂಗ್ ತಂತ್ರಶಾಸ್ತ್ರ:**
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

### **实时 ಅಪಾಯ ಪತ್ತೆ**

**ವರ್ತನೆ ವಿಶ್ಲೇಷಣೆ:**
- **ಬಳಕೆದಾರ ವರ್ತನೆ ವಿಶ್ಲೇಷಣೆ (UBA)**: ಅಸಾಮಾನ್ಯ ಬಳಕೆದಾರ ಪ್ರವೇಶ ಮಾದರಿಗಳ ಪತ್ತೆ
- **ಘಟಕ ವರ್ತನೆ ವಿಶ್ಲೇಷಣೆ (EBA)**: MCP ಸರ್ವರ್ ಮತ್ತು ಉಪಕರಣಗಳ ವರ್ತನೆ ಮೇಲ್ವಿಚಾರಣೆ
- **ಯಂತ್ರ ಕಲಿಕೆಯ ಅಸಾಮಾನ್ಯತೆ ಪತ್ತೆ**: ಭದ್ರತಾ ಅಪಾಯಗಳಿಗೆ ಎಐ ಚಾಲಿತ ಗುರುತು
- **ಅಪಾಯ ಬುದ್ಧಿವಂತಿಕೆ ಸಮನ್ವಯ**: ಕಂಡುಹಿಡಿದ ಚಟುವಟಿಕೆಗಳನ್ನು ಗುರುತಿಸಿದ ದಾಳಿ ಮಾದರಿಗಳೊಂದಿಗೆ ಹೊಂದಿಸುವಿಕೆ

## 9. **ಘಟನೆ ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ಪುನಃಪ್ರಾಪ್ತಿ**

### **ಸ್ವಯಂಚಾಲಿತ ಪ್ರತಿಕ್ರಿಯೆ ಸಾಮರ್ಥ್ಯಗಳು**

**ತಕ್ಷಣದ ಪ್ರತಿಕ್ರಿಯೆ ಕ್ರಿಯೆಗಳು:**
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

### **ಫೋರೆನ್ಸಿಕ್ ಸಾಮರ್ಥ್ಯಗಳು**

**ಇನ್ವೆಸ್ಟಿಗೇಶನ್ ಬೆಂಬಲ:**
- **ಲಾಗ್ ಟ್ರೈಲ್ ಸಂರಕ್ಷಣೆ**: ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಅಖಂಡತೆಯೊಂದಿಗೆ ಕಾರಕ ರಹಿತ ಲಾಗಿಂಗ್
- **ಸಾಕ್ಷ್ಯ ಸಂಕಲನ**: ಸಂಬಂಧಿತ ಭದ್ರತಾ ಪರಿಹಾರಗಳ ಸ್ವಯಂಚಾಲಿತ ಸಂಗ್ರಹಣೆ
- **ಕಾಲರೇಖೆ ಪುನರ್ ನಿರ್ಮಾಣ**: ಭದ್ರತಾ ಘಟನೆಗಳಿಗೆ ಕಾರಣವಾದ ಘಟನೆಗಳ ವಿವರಕಾರಿ ಕ್ರಮ
- **ಪ್ರಭಾವ ಮೌಲ್ಯಮಾಪನ**: ಹಾನಿ ವ್ಯಾಪ್ತಿಯ ಮತ್ತು ಡೇಟಾ ಬಿಚ್ಚಿನ ಮೌಲ್ಯಮಾಪನ

## **ಪ್ರಮುಖ ಭದ್ರತಾ ವಾಸ್ತುಶಿಲ್ಪ ತತ್ತ್ವಗಳು**

### **ಆಳದಿಂದ ರಕ್ಷಣಾ ಪದ್ಧತಿ**
- **ಬಹುಮಾನ ಭದ್ರತಾ ಪದರಗಳು**: ಭದ್ರತಾ ವಾಸ್ತುಶಿಲ್ಪದಲ್ಲಿ ಏಕಕ ಪಾಯಿಂಟ್ ವೈಫಲ್ಯ ಇಲ್ಲದೆ
- **ಪುನರಾವರ್ತಿತ ನಿಯಂತ್ರಣಗಳು**: ಮಹತ್ವಪೂರ್ಣ ಕಾರ್ಯಗಳಿಗೆ ಒಪ್ಪಿಸಿಕೊಂಡ ಭದ್ರತಾ ಕ್ರಮಗಳು
- **ವಿಫಲ-ಭದ್ರತಾ ಯಂತ್ರಗಳು**: ವ್ಯವಸ್ಥೆಗಳು ದೋಷ ಅಥವಾ ದಾಳಿಗಳನ್ನು ಎದುರಿಸುವಾಗ ಭದ್ರ ಡೀಫಾಲ್ಟ್‌ಗಳು

### **ಇರಡಿಲ್ಲದ ನಂಬಿಕೆ ಜಾರಿಗೆ**
- **ಕಡೇ ಬರುತ್ತದೆ, ಎಂದಿಗೂ ನಂಬಬೇಡಿ**: ಎಲ್ಲಾ ಘಟಕಗಳು ಮತ್ತು ವಿನಂತಿಗಳನ್ನು ನಿರಂತರ ಪರಿಶೀಲನೆ
- **ಕನಿಷ್ಠ ಹಕ್ಕು ಸಿದ್ಧಾಂತ**: ಎಲ್ಲಾ ಘಟಕಗಳಿಗೆ ಕನಿಷ್ಠ ಪ್ರವೇಶ ಹಕ್ಕುಗಳು
- **ಕ್ಷುದ್ರ ವಿಭಾಗೀಕರಣ**: ಸೂಕ್ಷ್ಮ ನೆಟ್ವರ್ಕ್ ಮತ್ತು ಪ್ರವೇಶ ನಿಯಂತ್ರಣಗಳು

### **ನಿರಂತರ ಭದ್ರತಾ ವಿಕಾಸ**
- **ಅಪಾಯಕಾರಿ ಪರಿಸರ ಅನುಕೂಲತೆ**: ಉದಯೋನ್ಮುಖ ಅಪಾಯಗಳ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ ನಿಯಮಿತ ನವೀಕರಣಗಳು
- **ಭದ್ರತಾ ನಿಯಂತ್ರಣ ಪರಿಣಾಮಕಾರಿತ್ವ**: ನಿಯಂತ್ರಣಗಳ ನಿರಂತರ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಸುಧಾರಣೆ
- **ನಿರ್ದಿಷ್ಟೀಕರಣ ಅನುಗುಣತೆ**: ಅಭಿವೃದ್ಧಿಪಡುತ್ತಿರುವ MCP ಭದ್ರತಾ ಮಾನದಂಡಗಳಿಗೆ ಹೊಂದಿಕೆ

---

## **ಜಾರಿಗೆ ಸಂಬಂಧಿಸಿದ ಸಂಪನ್ಮೂಲಗಳು**

### **ಅಧಿಕೃತ MCP ಡಾಕ್ಯುಮೆಂಟೇಶನ್**
- [MCP ನಿರ್ದಿಷ್ಟೀಕರಣ (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP ಭದ್ರತಾ ಅತ್ಯುತ್ತಮ ಅಭ್ಯಾಸಗಳು](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP ಅನುಮೋದನೆ ನಿರ್ದಿಷ್ಟೀಕರಣ](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP ಭದ್ರತಾ ಸಂಪನ್ಮೂಲಗಳು**
- [OWASP MCP ಅಜೂರ್ ಭದ್ರತಾ ಮಾರ್ಗದರ್ಶಿ](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP ಟಾಪ್ 10 ಆಯಾಮದೊಂದಿಗೆ ಅಜೂರ್ ಜಾರಿಗೆ ಸಂಪೂರ್ಣ ಮಾಹಿತಿಗಳು
- [OWASP MCP ಟಾಪ್ 10](https://owasp.org/www-project-mcp-top-10/) - ಅಧಿಕೃತ OWASP MCP ಭದ್ರತಾ ಅಪಾಯಗಳು
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - ಅಜೂರ್‌ನಲ್ಲಿ MCP ಗೆ ಕೈಪಿಡಿ ಭದ್ರತಾ ತರಬೇತಿ

### **ಮೈಕ್ರೋಸಾಫ್ಟ್ ಭದ್ರತಾ ಪರಿಹಾರಗಳು**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure ವಿಷಯ ಭದ್ರತೆ](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub ಅಡ್ವಾನ್ಸ್ಡ್ ಭದ್ರತೆ](https://github.com/security/advanced-security)
- [Azure ಕೀ ವಾಲ್ಟ್](https://learn.microsoft.com/azure/key-vault/)

### **ಭದ್ರತಾ ಮಾನದಂಡಗಳು**
- [OAuth 2.0 ಭದ್ರತಾ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [ದೊಡ್ಡ ಭಾಷಾ ಮಾದರಿಗಳಿಗೆ OWASP ಟಾಪ್ 10](https://genai.owasp.org/)
- [NIST ಸೈಬರ್ ಸೆಕ್ಯುರಿಟಿ ಫ್ರೇಮ್‌ವರ್ಕ್](https://www.nist.gov/cyberframework)

---

> **ಮುಖ್ಯ**: ಈ ಭದ್ರತಾ ನಿಯಂತ್ರಣಗಳು ಪ್ರಸ್ತುತ MCP ನಿರ್ದಿಷ್ಟೀಕರಣ (2025-11-25) ಅನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತವೆ. ಮಾನದಂಡಗಳು ವೇಗವಾಗಿ ಅಭಿವೃದ್ಧಿಯಾಗುತ್ತಿರುವುದರಿಂದ ಸದಾ ಇತ್ತೀಚಿನ [ಅಧಿಕೃತ ದಾಖಲೆ](https://spec.modelcontextprotocol.io/) ತಡೆಮಾಡಿ ಪರಿಶೀಲಿಸಿ.

## ಮುಂದಿನ ಶೀರ್ಷಿಕೆಗಳು

- ಹಿಂದಿರುಗಿ: [Security Module Overview](./README.md)
- ಮುಂದುವರಿಸಿ: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->